import Cookies from "js-cookie";
import { Tokens } from "../constants";

export const DEFAULT_SESSION_TIMEOUT_MINUTES = 60;
export const SESSION_TIMEOUT_REASON_INACTIVITY = "inactive";
export const SESSION_EXPIRED_STATUS_CODE = "SESSION_EXPIRED";
export const SESSION_ACTIVITY_EVENTS = [
    "mousemove",
    "keydown",
    "click",
    "scroll",
    "touchstart",
];

const AUTH_STORAGE_KEYS = [
    Tokens.ADMIN,
    Tokens.TOKEN_TTL,
    Tokens.USER,
    Tokens.IMAGE,
    Tokens.FIRST_NAME,
    Tokens.LAST_NAME,
    "loginUserArray",
    Tokens.UPDATED_EMAIL,
    Tokens.UPDATED_FIRST_NAME,
    Tokens.UPDATED_LAST_NAME,
    Tokens.USER_IMAGE_URL,
    Tokens.GET_PERMISSIONS,
];

const normalizeToken = (token) =>
    typeof token === "string" ? token.trim() : "";

const isValidToken = (token) => {
    if (!token) {
        return false;
    }

    const normalized = token.toLowerCase();
    return normalized !== "null" && normalized !== "undefined";
};

export const getAuthToken = () => {
    const storageToken = normalizeToken(localStorage.getItem(Tokens.ADMIN));
    if (isValidToken(storageToken)) {
        return storageToken;
    }

    const cookieToken = normalizeToken(Cookies.get("authToken"));
    if (isValidToken(cookieToken)) {
        return cookieToken;
    }

    return null;
};

export const getSessionTimeoutMinutes = () => {
    const ttlMinutes = Number(localStorage.getItem(Tokens.TOKEN_TTL));

    if (!Number.isFinite(ttlMinutes) || ttlMinutes <= 0) {
        return DEFAULT_SESSION_TIMEOUT_MINUTES;
    }

    return ttlMinutes;
};

export const getSessionExpiry = () => {
    const expiresAt = Number(localStorage.getItem(Tokens.SESSION_EXPIRES_AT));

    if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
        return null;
    }

    return expiresAt;
};

export const setSessionExpiry = (ttlMinutes = null) => {
    const numericTtl = Number(ttlMinutes);
    const timeoutMinutes =
        Number.isFinite(numericTtl) && numericTtl > 0
            ? numericTtl
            : getSessionTimeoutMinutes();

    if (!timeoutMinutes) {
        clearSessionExpiry();
        return null;
    }

    const expiresAt = Date.now() + timeoutMinutes * 60 * 1000;
    localStorage.setItem(Tokens.SESSION_EXPIRES_AT, String(expiresAt));

    return expiresAt;
};

export const syncAuthTokenCookie = (authToken, expiresAt = null) => {
    Cookies.remove("authToken");
    Cookies.remove("authToken", { path: "/" });

    if (!authToken) {
        return;
    }

    const cookieOptions = {
        path: "/",
        sameSite: "Lax",
    };

    if (expiresAt) {
        cookieOptions.expires = new Date(expiresAt);
    }

    Cookies.set("authToken", authToken, cookieOptions);
};

export const clearSessionExpiry = () => {
    localStorage.removeItem(Tokens.SESSION_EXPIRES_AT);
};

export const hasLocalSessionExpired = () => {
    const expiresAt = getSessionExpiry();

    return Boolean(expiresAt && Date.now() >= expiresAt);
};

export const markSessionExpiredReason = (
    reason = SESSION_TIMEOUT_REASON_INACTIVITY
) => {
    localStorage.setItem(Tokens.SESSION_EXPIRED_REASON, reason);
};

export const clearSessionExpiredReason = () => {
    localStorage.removeItem(Tokens.SESSION_EXPIRED_REASON);
};

export const consumeSessionExpiredReason = () => {
    const reason = localStorage.getItem(Tokens.SESSION_EXPIRED_REASON);

    if (reason) {
        clearSessionExpiredReason();
    }

    return reason;
};

export const clearStoredAuthSession = (preserveExpiredReason = false) => {
    Cookies.remove("authToken");
    Cookies.remove("authToken", { path: "/" });

    AUTH_STORAGE_KEYS.forEach((key) => {
        localStorage.removeItem(key);
    });

    clearSessionExpiry();

    if (!preserveExpiredReason) {
        clearSessionExpiredReason();
    }
};
