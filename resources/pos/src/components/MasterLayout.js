import React, {
    Profiler,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { connect } from "react-redux";
import AsideDefault from "./sidebar/asideDefault";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AsideTopSubMenuItem from "./sidebar/asideTopSubMenuItem";
import { Tokens } from "../constants";
import asideConfig from "../config/asideConfig";
import { environment } from "../config/environment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { normalizePermissions } from "../shared/permissionRoute";
import { useLocation } from "react-router-dom";
import {
    createRenderProfiler,
    markNavigationReady,
} from "../shared/performance/posPerformance";

const SIDEBAR_COLLAPSE_STORAGE_KEY = "pos_sidebar_collapsed";

const MasterLayout = (props) => {
    const { children, frontSetting, config, allConfigData } = props;
    const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
    const [isMenuCollapse, setIsMenuCollapse] = useState(() => {
        try {
            return (
                typeof window !== "undefined" &&
                window.localStorage.getItem(SIDEBAR_COLLAPSE_STORAGE_KEY) ===
                    "1"
            );
        } catch (error) {
            return false;
        }
    });
    const newRoutes = useMemo(
        () => (config ? prepareRoutes(config) : []),
        [config]
    );
    const token = localStorage.getItem(Tokens.ADMIN);
    const location = useLocation();
    const isReportRoute = location.pathname.includes("/report");
    const sidebarRenderProfiler = useMemo(
        () => createRenderProfiler("sidebar/AsideMenu", 20),
        []
    );

    useEffect(() => {
        if (!token) {
            window.location.href = environment.URL + "#" + "/login";
        }
    }, [token]);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                SIDEBAR_COLLAPSE_STORAGE_KEY,
                isMenuCollapse ? "1" : "0"
            );
        } catch (error) {
            // Ignore storage failures and keep the current in-memory state.
        }
    }, [isMenuCollapse]);

    useEffect(() => {
        setIsResponsiveMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        const animationFrameId = window.requestAnimationFrame(() => {
            markNavigationReady(location.pathname, `route:${location.pathname}`);
        });

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [location.pathname]);

    const menuClick = useCallback(() => {
        setIsResponsiveMenu((currentValue) => !currentValue);
    }, []);

    const menuIconClick = useCallback(() => {
        setIsMenuCollapse((currentValue) => !currentValue);
    }, []);

    return (
        <div
            className={`d-flex flex-row flex-column-fluid app-shell${
                isMenuCollapse ? " app-shell--sidebar-collapsed" : ""
            }`}
        >
            <Profiler id="Sidebar" onRender={sidebarRenderProfiler}>
                <AsideDefault
                    asideConfig={newRoutes}
                    frontSetting={frontSetting}
                    isResponsiveMenu={isResponsiveMenu}
                    menuClick={menuClick}
                    menuIconClick={menuIconClick}
                    isMenuCollapse={isMenuCollapse}
                />
            </Profiler>
            <div
                className={`${
                    isMenuCollapse === true ? "wrapper-res" : "wrapper"
                } d-flex flex-column flex-row-fluid`}
            >
                <div
                    className={`d-flex align-items-stretch justify-content-between header${
                        isReportRoute ? " header--report" : ""
                    }`}
                >
                    <div className="container-fluid d-flex align-items-stretch justify-content-xxl-between flex-grow-1">
                        <button
                            type="button"
                            className="btn d-flex align-items-center d-xl-none px-0"
                            title="Show aside menu"
                            onClick={menuClick}
                        >
                            <FontAwesomeIcon icon={faBars} className="fs-1" />
                        </button>
                        <AsideTopSubMenuItem
                            asideConfig={asideConfig}
                            isMenuCollapse={isMenuCollapse}
                        />
                        <Header newRoutes={newRoutes} />
                    </div>
                </div>
                <div className="content d-flex flex-column flex-column-fluid pt-7">
                    <div className="d-flex flex-column-fluid">
                        <div className="container-fluid">{children}</div>
                    </div>
                </div>
                <div className="container-fluid">
                    <Footer
                        allConfigData={allConfigData}
                        frontSetting={frontSetting}
                    />
                </div>
            </div>
        </div>
    );
};

const getRouteWithSubMenu = (route, permissions) => {
    const subRoutes = route.subMenu
        ? route.subMenu.filter(
              (item) =>
                  permissions.indexOf(item.permission) !== -1 ||
                  item.permission === ""
          )
        : null;
    const newSubRoutes = subRoutes ? { ...route, newRoute: subRoutes } : route;
    return newSubRoutes;
};

const prepareRoutes = (config) => {
    const permissions = normalizePermissions(config || []);
    let filterRoutes = [];
    asideConfig.forEach((route) => {
        const permissionsRoute = getRouteWithSubMenu(route, permissions);
        if (
            (permissions && permissions.indexOf(route.permission) !== -1) ||
            route.permission === "" ||
            permissionsRoute.newRoute?.length
        ) {
            filterRoutes.push(permissionsRoute);
        }
    });
    return filterRoutes;
};

const mapStateToProps = (state) => {
    const { frontSetting, config, allConfigData } = state;
    return { frontSetting, config, allConfigData };
};

export default connect(mapStateToProps)(MasterLayout);
