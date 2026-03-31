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
} from "./constants";
import Toasts from "./shared/toast/Toasts";
import { fetchFrontSetting } from "./store/action/frontSettingAction";
import { fetchConfig } from "./store/action/configAction";
import {
    addRTLSupport,
    syncTranslationMessages,
} from "./shared/sharedMethod";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import AdminApp from "./AdminApp";
import { getFiles } from "./locales/index";
import Cookies from "js-cookie";
import { getDefaultRedirectRoute } from "./shared/permissionRoute";
import { setupPosPerformanceMonitoring } from "./shared/performance/posPerformance";
import apiConfig from "./config/apiConfig";

const isLocaleObject = (value) =>
    Boolean(value && typeof value === "object" && !Array.isArray(value));
const isPublicAuthPath = (path = "") =>
    path.includes("/login") ||
    path.includes("/forgot-password") ||
    path.includes("/reset-password");

const clearAuthSession = () => {
    Cookies.remove("authToken");
    Cookies.remove("authToken", { path: "/" });
    localStorage.removeItem(Tokens.ADMIN);
    localStorage.removeItem(Tokens.TOKEN_TTL);
    localStorage.removeItem(Tokens.GET_PERMISSIONS);
    localStorage.removeItem("user_time");
};

function App() {
    //do not remove updateLanguag
    const dispatch = useDispatch();
    const { updateLanguage } = useSelector((state) => state);
    const location = useLocation();
    const storedToken =
        Cookies.get("authToken") || localStorage.getItem(Tokens.ADMIN);
    const tokenExpiry = Number(localStorage.getItem("user_time"));
    const isSessionExpired =
        Number.isFinite(tokenExpiry) &&
        tokenExpiry > 0 &&
        Date.now() > tokenExpiry;
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
        const currentPath = location.pathname;
        const isPublicRoute = isPublicAuthPath(currentPath);

        if (isSessionExpired) {
            clearAuthSession();
            lastFetchedTokenRef.current = null;
            if (!isPublicRoute) {
                navigate("/login");
            }
            return;
        }

        if (token) {
            if (isPublicRoute) {
                navigate(redirectTo || "/app/dashboard");
                return;
            }

            if (!isPublicRoute) {
                if (lastFetchedTokenRef.current !== token) {
                    lastFetchedTokenRef.current = token;
                    dispatch(fetchConfig());
                    dispatch(fetchFrontSetting());
                }
            }
            return;
        }

        lastFetchedTokenRef.current = null;

        if (!isPublicRoute) {
            navigate("/login");
        }
    }, [dispatch, isSessionExpired, location.pathname, navigate, redirectTo, token]);

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
                        element={<AdminApp config={config} />}
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
