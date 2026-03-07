import {Tokens, errorMessage} from '../constants';
import {environment} from './environment'
import Cookies from 'js-cookie';

export default {
    setupInterceptors: (axios, skipAuth = false, isFormData = false) => {
        axios.interceptors.request.use((config) => {
                if (skipAuth) {
                    return config;
                }
                const cookieToken = Cookies.get('authToken');
                const storageToken = localStorage.getItem(Tokens.ADMIN);
                const authToken = cookieToken || storageToken;
                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                }
                if (!authToken) {
                    if (!window.location.href.includes('login') && !window.location.href.includes('reset-password') && !window.location.href.includes('forgot-password')) {
                        window.location.href = environment.URL + '#/' + 'login';
                    }
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
                Cookies.remove('authToken');
                localStorage.removeItem(Tokens.ADMIN);
                localStorage.removeItem(Tokens.USER);
                localStorage.removeItem(Tokens.GET_PERMISSIONS);
                window.location.href = environment.URL + '#' + '/login';
            }

            return Promise.reject({ ...error });
        };
        const successHandler = (response) => {
            return response;
        };
    }
};
