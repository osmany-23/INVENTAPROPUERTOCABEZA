import { errorMessage } from "../constants";
import {
    clearStoredAuthSession,
    getAuthToken,
    markSessionExpiredReason,
    SESSION_EXPIRED_STATUS_CODE,
    SESSION_TIMEOUT_REASON_INACTIVITY,
    setSessionExpiry,
    syncAuthTokenCookie,
} from "../shared/authSession";

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

const refreshAuthSessionExpiry = () => {
    const authToken = getAuthToken();
    if (!authToken) {
        return;
    }

    const expiresAt = setSessionExpiry();
    syncAuthTokenCookie(authToken, expiresAt);
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
            const statusCode = error?.response?.data?.code;
            const requestUrl = error?.config?.url || '';
            const requestPath = getRequestPath(requestUrl);
            const authToken = getAuthToken();
            const requestIsAuthHandled = isAuthHandledEndpoint(requestUrl);
            const isConfigRequest = hasEndpointSuffix(requestPath, 'config');
            const sessionExpired =
                Boolean(error?.response?.data?.session_expired) ||
                statusCode === SESSION_EXPIRED_STATUS_CODE;

            if (status === 401 && isConfigRequest && error?.config && !error.config._retryOn401) {
                error.config._retryOn401 = true;
                return axios.request(error.config);
            }

            if ((status === 401 || isTokenErrorMessage(message))
                && authToken
                && !requestIsAuthHandled) {
                if (sessionExpired) {
                    markSessionExpiredReason(SESSION_TIMEOUT_REASON_INACTIVITY);
                }
                clearStoredAuthSession(sessionExpired);
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
