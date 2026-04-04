import React, { Suspense, useEffect, useState } from "react";
import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import "../../pos/src/assets/sass/style.react.scss";
import { ProtectedRoute } from "./shared/sharedMethod";
import { route } from "./routes";
import { useSelector } from "react-redux";
import { normalizePermissions } from "./shared/permissionRoute";
import { getAuthToken, hasLocalSessionExpired } from "./shared/authSession";
import AppBootstrapLoader from "./shared/components/loaders/AppBootstrapLoader";

function AdminApp(props) {
    const { config, isBootstrapping = false } = props;
    const token = hasLocalSessionExpired() ? null : getAuthToken();
    const { allConfigData } = useSelector((state) => state);
    const normalizedConfig = normalizePermissions(config || []);
    const location = useLocation();
    const [isContentVisible, setIsContentVisible] = useState(false);
    const shouldShowBootstrapShell = token !== null && isBootstrapping;

    const prepareRoutes = (config) => {
        const permissions = config;
        let filterRoutes = [];
        route.forEach((route) => {
            if (
                (permissions && permissions.indexOf(route.permission) !== -1) ||
                route.permission === ""
            ) {
                filterRoutes.push(route);
            }
        });
        return filterRoutes;
    };

    useEffect(() => {
        setIsContentVisible(false);

        if (token === null || shouldShowBootstrapShell) {
            return undefined;
        }

        const animationFrameId = window.requestAnimationFrame(() => {
            setIsContentVisible(true);
        });

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [location.pathname, shouldShowBootstrapShell, token]);

    if (shouldShowBootstrapShell) {
        return <AppBootstrapLoader variant="shell" />;
    }

    const routes = prepareRoutes(normalizedConfig);

    return (
        <Suspense fallback={<AppBootstrapLoader variant="shell" />}>
            <div className={`pos-route-fade${isContentVisible ? " is-active" : ""}`}>
                <Routes>
                    {routes.map((route) => {
                        return route.ele ? (
                            <Route
                                key={route.path}
                                exact={true}
                                path={route.path}
                                element={
                                    token !== null ? (
                                        <ProtectedRoute
                                            allConfigData={allConfigData}
                                            route={route.path}
                                        >
                                            {route.ele}
                                        </ProtectedRoute>
                                    ) : (
                                        <Navigate replace to={"/login"} />
                                    )
                                }
                            />
                        ) : null;
                    })}
                    <Route path="*" element={<Navigate replace to={"/"} />} />
                </Routes>
            </div>
        </Suspense>
    );
}

export default AdminApp;
