import {Tokens, errorMessage} from '../constants';
import Cookies from 'js-cookie';

const PUBLIC_API_ENDPOINTS = [
    'login',
    'register',
    'forgot-password',
    'reset-password',
    'front-setting',
    'validate-auth-token',
];

const AUTH_HANDLED_ENDPOINTS = [
    ...PUBLIC_API_ENDPOINTS,
    'logout',
];

const hasEndpointSuffix = (path, endpoint) =>
    Boolean(path && endpoint && (path === `/${endpoint}` || path.endsWith(`/${endpoint}`)));

const getRequestPath = (url = '') => {
    if (!url) {
        return '';
    }

    try {
        const parsedUrl = new URL(url, window.location.origin);
        return (parsedUrl.pathname || '').toLowerCase();
    } catch (e) {
        return String(url).split('?')[0].toLowerCase();
    }
};

const isPublicApiRequest = (url = '') => {
    const path = getRequestPath(url);
    return PUBLIC_API_ENDPOINTS.some((endpoint) => hasEndpointSuffix(path, endpoint));
};

const isAuthHandledEndpoint = (url = '') => {
    const path = getRequestPath(url);
    return AUTH_HANDLED_ENDPOINTS.some((endpoint) => hasEndpointSuffix(path, endpoint));
};

const createUnauthorizedError = (config) => ({
    config,
    response: {
        status: 401,
        data: { message: 'Unauthenticated.' },
    },
    isAuthMissing: true,
});

const isPublicAuthPath = () => {
    const href = window.location.href || '';
    const hash = window.location.hash || '';

    return (
        href.includes('login') ||
        href.includes('reset-password') ||
        href.includes('forgot-password') ||
        hash.includes('/login') ||
        hash.includes('/reset-password') ||
        hash.includes('/forgot-password')
    );
};

const normalizeToken = (token) =>
    typeof token === 'string' ? token.trim() : '';

const isValidToken = (token) => {
    if (!token) {
        return false;
    }

    const normalized = token.toLowerCase();
    return normalized !== 'null' && normalized !== 'undefined';
};

const getAuthToken = () => {
    // Prefer localStorage token to avoid stale cookie overriding valid sessions.
    const storageToken = normalizeToken(localStorage.getItem(Tokens.ADMIN));
    if (isValidToken(storageToken)) {
        return storageToken;
    }

    const cookieToken = normalizeToken(Cookies.get('authToken'));
    if (isValidToken(cookieToken)) {
        return cookieToken;
    }

    return null;
};

const getTokenTtlMinutes = () => {
    const ttlMinutes = Number(localStorage.getItem(Tokens.TOKEN_TTL));
    if (!Number.isFinite(ttlMinutes) || ttlMinutes <= 0) {
        return null;
    }
    return ttlMinutes;
};

const refreshAuthSessionExpiry = () => {
    const ttlMinutes = getTokenTtlMinutes();
    if (!ttlMinutes) {
        return;
    }

    const authToken = getAuthToken();
    if (!authToken) {
        return;
    }

    const now = Date.now();
    const expiresAt = now + ttlMinutes * 60 * 1000;

    localStorage.setItem("user_time", String(expiresAt));
    Cookies.set("authToken", authToken, {
        expires: new Date(expiresAt),
        path: "/",
        sameSite: "Lax",
    });
};

const clearAuthSession = () => {
    Cookies.remove('authToken');
    Cookies.remove('authToken', { path: '/' });
    localStorage.removeItem(Tokens.ADMIN);
    localStorage.removeItem(Tokens.TOKEN_TTL);
    localStorage.removeItem(Tokens.USER);
    localStorage.removeItem(Tokens.GET_PERMISSIONS);
    localStorage.removeItem('user_time');
};

const redirectToLogin = () => {
    if (!isPublicAuthPath()) {
        window.location.hash = '/login';
    }
};

const isTokenErrorMessage = (message) =>
    message === errorMessage.TOKEN_NOT_PROVIDED
    || message === errorMessage.TOKEN_INVALID
    || message === errorMessage.TOKEN_INVALID_SIGNATURE
    || message === errorMessage.TOKEN_EXPIRED;

export default {
    setupInterceptors: (axios, skipAuth = false, isFormData = false) => {
        axios.interceptors.request.use((config) => {
                if (skipAuth) {
                    return config;
                }

                const authToken = getAuthToken();
                config.headers = config.headers || {};
                const requestUrl = config?.url || '';
                const requestIsPublic = isPublicApiRequest(requestUrl);

                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                } else if (!requestIsPublic) {
                    redirectToLogin();
                    return Promise.reject(createUnauthorizedError(config));
                }

                if (isFormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error)
        );
        const errorHandler = (error) => {
            const status = error?.response?.status;
            const message = error?.response?.data?.message;
            const requestUrl = error?.config?.url || '';
            const requestPath = getRequestPath(requestUrl);
            const authToken = getAuthToken();
            const requestIsAuthHandled = isAuthHandledEndpoint(requestUrl);
            const isConfigRequest = hasEndpointSuffix(requestPath, 'config');

            if (status === 401 && isConfigRequest && error?.config && !error.config._retryOn401) {
                error.config._retryOn401 = true;
                return axios.request(error.config);
            }

            if ((status === 401 || isTokenErrorMessage(message))
                && authToken
                && !requestIsAuthHandled) {
                clearAuthSession();
                redirectToLogin();
            }

            return Promise.reject({ ...error });
        };
        const successHandler = (response) => {
            refreshAuthSessionExpiry();
            return response;
        };
    }
};
