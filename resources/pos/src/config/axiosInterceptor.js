import {Tokens, errorMessage} from '../constants';
import Cookies from 'js-cookie';

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

const clearAuthSession = () => {
    Cookies.remove('authToken');
    Cookies.remove('authToken', { path: '/' });
    localStorage.removeItem(Tokens.ADMIN);
    localStorage.removeItem(Tokens.USER);
    localStorage.removeItem(Tokens.GET_PERMISSIONS);
    localStorage.removeItem('user_time');
};

const redirectToLogin = () => {
    if (!isPublicAuthPath()) {
        window.location.hash = '/login';
    }
};

export default {
    setupInterceptors: (axios, skipAuth = false, isFormData = false) => {
        axios.interceptors.request.use((config) => {
                if (skipAuth) {
                    return config;
                }

                const authToken = getAuthToken();
                config.headers = config.headers || {};

                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                } else {
                    redirectToLogin();
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

            if (status === 401
                || message === errorMessage.TOKEN_NOT_PROVIDED
                || message === errorMessage.TOKEN_INVALID
                || message === errorMessage.TOKEN_INVALID_SIGNATURE
                || message === errorMessage.TOKEN_EXPIRED) {
                clearAuthSession();
                redirectToLogin();
            }

            return Promise.reject({ ...error });
        };
        const successHandler = (response) => {
            return response;
        };
    }
};
