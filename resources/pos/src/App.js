import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, useLocation, Navigate, Routes, useNavigate } from "react-router-dom";
import "../../pos/src/assets/sass/style.react.scss";
import { useDispatch, useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import {
    apiBaseURL,
    languageActionType,
    settingsKey,
    Tokens,
    toastType,
} from "./constants";
import Toasts from "./shared/toast/Toasts";
import { fetchFrontSetting } from "./store/action/frontSettingAction";
import { fetchConfig } from "./store/action/configAction";
import {
    addRTLSupport,
    syncTranslationMessages,
    translateMessage,
} from "./shared/sharedMethod";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import AdminApp from "./AdminApp";
import { getFiles } from "./locales/index";
import { getDefaultRedirectRoute } from "./shared/permissionRoute";
import { setupPosPerformanceMonitoring } from "./shared/performance/posPerformance";
import apiConfig from "./config/apiConfig";
import { addToast } from "./store/action/toastAction";
import { logoutAction } from "./store/action/authAction";
import {
    consumeAuthBootstrapReady,
    consumeSessionExpiredReason,
    getAuthToken,
    getSessionExpiry,
    getSessionTimeoutMinutes,
    hasLocalSessionExpired,
    isAuthBootstrapPending,
    setSessionExpiry,
    SESSION_ACTIVITY_EVENTS,
    SESSION_TIMEOUT_REASON_INACTIVITY,
} from "./shared/authSession";

const isLocaleObject = (value) =>
    Boolean(value && typeof value === "object" && !Array.isArray(value));

const isPublicAuthPath = (path = "") =>
    path.includes("/login") ||
    path.includes("/forgot-password") ||
    path.includes("/reset-password");

function App() {
    //do not remove updateLanguag
    const dispatch = useDispatch();
    const { updateLanguage } = useSelector((state) => state);
    const location = useLocation();
    const storedToken = getAuthToken();
    const isSessionExpired = hasLocalSessionExpired();
    const token = isSessionExpired ? null : storedToken;
    const navigate = useNavigate();
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);
    const { selectedLanguage, config, language } = useSelector(
        (state) => state
    );
    const [allLocales, setAllLocales] = useState(() => getFiles());
    const [messages, setMessages] = useState(() => {
        const localeFiles = getFiles();
        return isLocaleObject(localeFiles?.en) ? localeFiles.en : {};
    });
    const redirectTo = getDefaultRedirectRoute(config);
    const lastFetchedTokenRef = useRef(null);
    const syncedLanguageRef = useRef(null);
    const inactivityLogoutTriggeredRef = useRef(false);
    const bootstrapRequestIdRef = useRef(0);
    const [isAdminBootstrapping, setIsAdminBootstrapping] = useState(() =>
        Boolean(token && !isPublicAuthPath(location.pathname))
    );

    useEffect(() => {
        const getData = getFiles();
        setAllLocales(getData);
    }, [language, updateLanguage?.lang_json_array]);

    // updated language hendling
    useEffect(() => {
        const activeLocale = updatedLanguage ? updatedLanguage : selectedLanguage;
        const selectedLocaleMessages = allLocales[activeLocale];
        const defaultMessages = isLocaleObject(allLocales?.en) ? allLocales.en : {};
        const baseMessages = isLocaleObject(selectedLocaleMessages)
            ? selectedLocaleMessages
            : defaultMessages;
        const userUpdatedMessages =
            updateLanguage?.iso_code === updatedLanguage &&
            isLocaleObject(updateLanguage?.lang_json_array)
                ? updateLanguage.lang_json_array
                : {};

        // Merge user-edited translations over locale defaults to avoid missing keys.
        setMessages({ ...baseMessages, ...userUpdatedMessages });
    }, [
        allLocales,
        selectedLanguage,
        updatedLanguage,
        updateLanguage?.iso_code,
        updateLanguage?.lang_json_array,
    ]);

    useLayoutEffect(() => {
        selectCSS();
    }, [updatedLanguage]);

    useEffect(() => {
        const expiredReason = consumeSessionExpiredReason();

        if (expiredReason !== SESSION_TIMEOUT_REASON_INACTIVITY) {
            return;
        }

        dispatch(
            addToast({
                text: translateMessage(
                    "session.expired.inactivity.message",
                    "Session closed due to inactivity (60 minutes)"
                ),
                type: toastType.ERROR,
            })
        );
    }, [dispatch, location.pathname]);

    useEffect(() => {
        if (token) {
            inactivityLogoutTriggeredRef.current = false;
        }
    }, [token]);

    useEffect(() => {
        const currentPath = location.pathname;
        const isPublicRoute = isPublicAuthPath(currentPath);

        if (isSessionExpired) {
            bootstrapRequestIdRef.current += 1;
            setIsAdminBootstrapping(false);
            lastFetchedTokenRef.current = null;

            if (storedToken && !inactivityLogoutTriggeredRef.current) {
                inactivityLogoutTriggeredRef.current = true;
                dispatch(
                    logoutAction(storedToken, navigate, {
                        skipSuccessToast: true,
                        sessionExpiredReason: SESSION_TIMEOUT_REASON_INACTIVITY,
                    })
                );
                return;
            }

            if (!isPublicRoute) {
                navigate("/login");
            }

            return;
        }

        if (token) {
            if (isPublicRoute) {
                if (isAuthBootstrapPending(token)) {
                    setIsAdminBootstrapping(false);
                    return;
                }

                bootstrapRequestIdRef.current += 1;
                setIsAdminBootstrapping(false);
                navigate(redirectTo || "/app/dashboard");
                return;
            }

            if (consumeAuthBootstrapReady(token)) {
                lastFetchedTokenRef.current = token;
                setIsAdminBootstrapping(false);
                return;
            }

            if (!isPublicRoute && lastFetchedTokenRef.current !== token) {
                lastFetchedTokenRef.current = token;
                const requestId = bootstrapRequestIdRef.current + 1;
                bootstrapRequestIdRef.current = requestId;
                setIsAdminBootstrapping(true);
                Promise.allSettled([
                    dispatch(fetchConfig()),
                    dispatch(fetchFrontSetting()),
                ]).finally(() => {
                    if (bootstrapRequestIdRef.current === requestId) {
                        setIsAdminBootstrapping(false);
                    }
                });
            }

            return;
        }

        lastFetchedTokenRef.current = null;
        bootstrapRequestIdRef.current += 1;
        setIsAdminBootstrapping(false);

        if (!isPublicRoute) {
            navigate("/login");
        }
    }, [dispatch, isSessionExpired, location.pathname, navigate, redirectTo, storedToken, token]);

    useEffect(() => {
        const currentPath = location.pathname;

        if (!token || isPublicAuthPath(currentPath)) {
            return undefined;
        }

        let logoutTimerId = null;

        const triggerInactivityLogout = () => {
            if (inactivityLogoutTriggeredRef.current) {
                return;
            }

            inactivityLogoutTriggeredRef.current = true;
            dispatch(
                logoutAction(token, navigate, {
                    skipSuccessToast: true,
                    sessionExpiredReason: SESSION_TIMEOUT_REASON_INACTIVITY,
                })
            );
        };

        const scheduleLogout = (expiresAt = null) => {
            const nextExpiry = expiresAt ?? getSessionExpiry() ?? setSessionExpiry();

            if (!nextExpiry) {
                return;
            }

            window.clearTimeout(logoutTimerId);
            logoutTimerId = window.setTimeout(
                triggerInactivityLogout,
                Math.max(nextExpiry - Date.now(), 0)
            );
        };

        let lastPersistedActivityAt = 0;
        const handleActivity = () => {
            const now = Date.now();
            let expiresAt = now + getSessionTimeoutMinutes() * 60 * 1000;

            if (now - lastPersistedActivityAt >= 1000) {
                lastPersistedActivityAt = now;
                expiresAt = setSessionExpiry() ?? expiresAt;
            }

            scheduleLogout(expiresAt);
        };

        scheduleLogout();
        SESSION_ACTIVITY_EVENTS.forEach((eventName) => {
            window.addEventListener(eventName, handleActivity);
        });

        return () => {
            window.clearTimeout(logoutTimerId);
            SESSION_ACTIVITY_EVENTS.forEach((eventName) => {
                window.removeEventListener(eventName, handleActivity);
            });
        };
    }, [dispatch, location.pathname, navigate, token]);

    useEffect(() => {
        const activeLocale = updatedLanguage || selectedLanguage;

        if (!token || !activeLocale || syncedLanguageRef.current === activeLocale) {
            return;
        }

        syncedLanguageRef.current = activeLocale;

        apiConfig
            .get("languages?page[size]=0")
            .then((languagesResponse) => {
                const languagesData = languagesResponse?.data?.data || [];
                const selectedLocaleRecord = languagesData.find(
                    (item) => item?.attributes?.iso_code === activeLocale
                );

                if (!selectedLocaleRecord?.id) {
                    return null;
                }

                return apiConfig.get(
                    `${apiBaseURL.LANGUAGES}/translation/${selectedLocaleRecord.id}`
                );
            })
            .then((translationResponse) => {
                const latestTranslation = translationResponse?.data?.data;

                if (!latestTranslation) {
                    return;
                }

                dispatch({
                    type: languageActionType.UPDATED_LANGUAGE,
                    payload: latestTranslation,
                });
            })
            .catch(() => {
                syncedLanguageRef.current = null;
            });
    }, [dispatch, selectedLanguage, token, updatedLanguage]);

    const selectCSS = () => {
        if (updatedLanguage === "ar") {
            require("./assets/css/custom.rtl.css");
            require("./assets/css/style.rtl.css");
            require("./assets/css/frontend.rtl.css");
            require("./assets/css/responsive.css");
            require("./assets/css/credits.css");
            require("./assets/css/product-batches.css");
        } else {
            require("./assets/css/custom.css");
            require("./assets/css/style.css");
            require("./assets/css/frontend.css");
            require("./assets/css/responsive.css");
            require("./assets/css/credits.css");
            require("./assets/css/product-batches.css");
        }

        require("./assets/css/pos-ui-overrides.css");
    };

    useEffect(() => {
        addRTLSupport(updatedLanguage ? updatedLanguage : selectedLanguage);
    }, [updatedLanguage, selectedLanguage]);

    useEffect(() => {
        setupPosPerformanceMonitoring();
    }, []);

    syncTranslationMessages(messages);

    return (
        <div className="d-flex flex-column flex-root">
            <IntlProvider
                locale={settingsKey.DEFAULT_LOCALE}
                messages={messages}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="reset-password/:token/:email"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="app/*"
                        element={
                            <AdminApp
                                config={config}
                                isBootstrapping={isAdminBootstrapping}
                            />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Navigate
                                replace
                                to={token ? redirectTo || "/app/dashboard" : "/login"}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate replace to={"/"} />} />
                </Routes>
                <Toasts
                    language={
                        updatedLanguage ? updatedLanguage : selectedLanguage
                    }
                />
            </IntlProvider>
        </div>
    );
}

export default App;
