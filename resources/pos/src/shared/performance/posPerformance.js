const PERF_STATE_KEY = "__POS_PERF_STATE__";
const LONG_TASK_WARN_MS = 50;
const NAVIGATION_WARN_MS = 100;

const canUsePerformanceApi = () =>
    typeof window !== "undefined" && typeof window.performance !== "undefined";

const getPerfState = () => {
    if (typeof window === "undefined") {
        return {
            navigationStarts: new Map(),
            warnedLabels: new Set(),
            longTaskObserverReady: false,
        };
    }

    if (!window[PERF_STATE_KEY]) {
        window[PERF_STATE_KEY] = {
            navigationStarts: new Map(),
            warnedLabels: new Set(),
            longTaskObserverReady: false,
        };
    }

    return window[PERF_STATE_KEY];
};

const warnOnce = (label, details = "") => {
    const state = getPerfState();
    if (state.warnedLabels.has(label)) {
        return;
    }

    state.warnedLabels.add(label);
    console.warn(
        `CUELLO DE BOTELLA DETECTADO EN: ${label}${details ? ` | ${details}` : ""}`
    );
};

const formatDuration = (value) => `${Number(value || 0).toFixed(1)}ms`;

export const setupPosPerformanceMonitoring = () => {
    if (
        !canUsePerformanceApi() ||
        typeof window.PerformanceObserver !== "function"
    ) {
        return;
    }

    const state = getPerfState();
    if (state.longTaskObserverReady) {
        return;
    }

    try {
        const observer = new window.PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const duration = Number(entry.duration || 0);
                console.info(
                    `[PERF] Main thread blocked: ${formatDuration(duration)}`
                );

                if (duration >= LONG_TASK_WARN_MS) {
                    warnOnce(
                        `Main thread long task`,
                        `duracion ${formatDuration(duration)}`
                    );
                }
            });
        });

        observer.observe({ entryTypes: ["longtask"] });
        state.longTaskObserverReady = true;
    } catch (error) {
        // Ignore unsupported observers and keep the app stable.
    }
};

export const markNavigationStart = (target) => {
    if (!canUsePerformanceApi()) {
        return;
    }

    const state = getPerfState();
    state.navigationStarts.set(String(target || "unknown"), performance.now());
};

export const markNavigationReady = (target, label = target) => {
    if (!canUsePerformanceApi()) {
        return null;
    }

    const normalizedTarget = String(target || "unknown");
    const state = getPerfState();
    const startedAt = state.navigationStarts.get(normalizedTarget);

    if (!startedAt) {
        return null;
    }

    const duration = performance.now() - startedAt;
    state.navigationStarts.delete(normalizedTarget);

    console.info(
        `[PERF] Click -> render (${label}): ${formatDuration(duration)}`
    );

    if (duration >= NAVIGATION_WARN_MS) {
        warnOnce(label, `click -> render ${formatDuration(duration)}`);
    }

    return duration;
};

export const logAsyncDuration = (label, startedAt, warnAt = NAVIGATION_WARN_MS) => {
    if (!canUsePerformanceApi()) {
        return null;
    }

    const duration = performance.now() - Number(startedAt || 0);
    console.info(`[PERF] ${label}: ${formatDuration(duration)}`);

    if (duration >= warnAt) {
        warnOnce(label, formatDuration(duration));
    }

    return duration;
};

export const createRenderProfiler =
    (label, warnAt = 16) =>
    (_id, phase, actualDuration) => {
        const duration = Number(actualDuration || 0);
        if (duration < 8) {
            return;
        }

        console.info(
            `[PERF] Render ${label} (${phase}): ${formatDuration(duration)}`
        );

        if (duration >= warnAt) {
            warnOnce(label, `render ${phase} ${formatDuration(duration)}`);
        }
    };

export const reportDetectedBottleneck = (label, details = "") => {
    warnOnce(label, details);
};
