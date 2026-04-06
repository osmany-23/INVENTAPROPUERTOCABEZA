import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    ProSidebar,
    SidebarHeader,
    SidebarContent,
    MenuItem,
    Menu,
    SubMenu,
} from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-pro-sidebar/dist/css/styles.css";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { useIntl } from "react-intl";
import { Tokens } from "../../constants";
import { preloadRouteModule } from "../../shared/navigation/routePreload";
import { markNavigationStart } from "../../shared/performance/posPerformance";

const SIDEBAR_SEARCH_DEBOUNCE_MS = 180;
const SUBMENU_GROUP_PATH_KEYS = [
    "userSubPath",
    "customerSubPath",
    "suppliareSubPath",
    "productsSubPath",
    "categoriesSubPath",
    "brandsSubPath",
    "unitsSubPath",
    "baseUnitsSubPath",
    "barcodeSubPath",
    "purchasesSubPath",
    "purchaseReturnSubPath",
    "salesSubPath",
    "salesReturnSubPath",
    "expensesSubPath",
    "expenseCategoriesSubPath",
    "emailTemplateSubPath",
    "smsTemplateSubPath",
    "smsApiSubPath",
];

const getMenuItemKey = (item, fallbackPrefix = "menu-item") =>
    item?.to ||
    item?.path ||
    item?.title ||
    item?.permission ||
    `${fallbackPrefix}-${item?.subPath?.userSubPath || "default"}`;

const normalizeSearchValue = (value) => String(value || "").trim().toLowerCase();

const isExactPathMatch = (pathname, candidatePath) =>
    Boolean(candidatePath) && pathname === candidatePath;

const isPartialPathMatch = (pathname, candidatePath) =>
    Boolean(candidatePath) && pathname.includes(candidatePath);

const isSubMenuGroupActive = (pathname, subPath) =>
    SUBMENU_GROUP_PATH_KEYS.some((key) =>
        isExactPathMatch(pathname, subPath?.[key])
    );

const isSubMenuItemActive = (pathname, item, id) =>
    isExactPathMatch(pathname, item?.to) ||
    isExactPathMatch(pathname, item?.path) ||
    isPartialPathMatch(pathname, item?.to) ||
    isExactPathMatch(pathname, item?.stockPath) ||
    isExactPathMatch(pathname, item?.productPath) ||
    isExactPathMatch(pathname, item?.purchasePath) ||
    isExactPathMatch(pathname, item?.topSellingPath) ||
    isExactPathMatch(pathname, item?.productQuantityAlertPath) ||
    isExactPathMatch(pathname, `${item?.stockDetailPath || ""}/${id}`);

const isMenuItemActive = (pathname, item, id) =>
    isExactPathMatch(pathname, item?.to) ||
    isExactPathMatch(pathname, item?.path) ||
    isExactPathMatch(pathname, item?.mailSettingsPath) ||
    isExactPathMatch(pathname, item?.prefixesPath) ||
    isExactPathMatch(pathname, item?.receiptSettingsPath) ||
    isExactPathMatch(pathname, item?.profitLossReportPath) ||
    isPartialPathMatch(pathname, item?.to) ||
    isExactPathMatch(pathname, item?.stockPath) ||
    isExactPathMatch(pathname, item?.productPath) ||
    isExactPathMatch(pathname, item?.purchasePath) ||
    isExactPathMatch(pathname, item?.topSellingPath) ||
    isExactPathMatch(pathname, item?.productQuantityAlertPath) ||
    isExactPathMatch(pathname, item?.supplierReportPath) ||
    isExactPathMatch(pathname, item?.customerReportPath) ||
    isExactPathMatch(pathname, item?.bestCustomerReportPath) ||
    isExactPathMatch(pathname, item?.registerReportPath) ||
    isExactPathMatch(
        pathname,
        `${item?.supplierReportDetailsPath || ""}/${id}`
    ) ||
    isExactPathMatch(
        pathname,
        `${item?.customerReportDetailsPath || ""}/${id}`
    );

const AsideMenu = (props) => {
    const {
        asideConfig,
        frontSetting,
        isResponsiveMenu,
        menuClick,
        menuIconClick,
        isMenuCollapse,
    } = props;

    const location = useLocation();
    const intl = useIntl();
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [openSubMenus, setOpenSubMenus] = useState({});
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);
    const shouldShowCompanyName =
        frontSetting?.value?.show_app_name_in_sidebar === "1";

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            setDebouncedSearchTerm(searchTerm.trim());
        }, SIDEBAR_SEARCH_DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (!isMenuCollapse) {
            return;
        }

        setSearchTerm("");
        setDebouncedSearchTerm("");
    }, [isMenuCollapse]);

    const normalizedSearchTerm = useMemo(
        () => normalizeSearchValue(debouncedSearchTerm),
        [debouncedSearchTerm]
    );

    const doesMenuItemMatchSearch = useCallback(
        (title) =>
            normalizeSearchValue(
                intl.formatMessage({ id: `${title}` })
            ).includes(normalizedSearchTerm),
        [intl, normalizedSearchTerm]
    );

    const getVisibleSubMenuItems = useCallback(
        (menuItem) => {
            if (!Array.isArray(menuItem?.newRoute)) {
                return [];
            }

            if (!normalizedSearchTerm) {
                return menuItem.newRoute;
            }

            return menuItem.newRoute.filter((subMenuItem) =>
                doesMenuItemMatchSearch(subMenuItem?.title)
            );
        },
        [doesMenuItemMatchSearch, normalizedSearchTerm]
    );

    const filteredMenu = useMemo(
        () =>
            (asideConfig || []).filter((menuItem) => {
                if (!normalizedSearchTerm) {
                    return true;
                }

                if (Array.isArray(menuItem?.newRoute)) {
                    return getVisibleSubMenuItems(menuItem).length > 0;
                }

                if (Array.isArray(menuItem?.subTitles)) {
                    return menuItem.subTitles.some((subMenuItem) =>
                        doesMenuItemMatchSearch(subMenuItem?.title)
                    );
                }

                return doesMenuItemMatchSearch(menuItem?.title);
            }),
        [
            asideConfig,
            doesMenuItemMatchSearch,
            getVisibleSubMenuItems,
            normalizedSearchTerm,
        ]
    );

    const handleRouteIntent = useCallback((path) => {
        preloadRouteModule(path);
    }, []);

    const handleRouteClick = useCallback(
        (path) => {
            markNavigationStart(path);
            markNavigationStart(`${path}::data`);
            preloadRouteModule(path);

            if (isResponsiveMenu) {
                menuClick();
            }
        },
        [isResponsiveMenu, menuClick]
    );

    const handleSubMenuOpenChange = useCallback((menuKey, isClosed) => {
        const nextOpenValue = Boolean(isClosed);

        setOpenSubMenus((currentSubMenus) => {
            if (currentSubMenus?.[menuKey] === nextOpenValue) {
                return currentSubMenus;
            }

            return {
                ...currentSubMenus,
                [menuKey]: nextOpenValue,
            };
        });
    }, []);

    const isSubMenuOpen = useCallback(
        (menuKey, menuItem) => {
            if (normalizedSearchTerm) {
                return true;
            }

            if (isSubMenuGroupActive(location.pathname, menuItem?.subPath)) {
                return true;
            }

            return Boolean(openSubMenus?.[menuKey]);
        },
        [location.pathname, normalizedSearchTerm, openSubMenus]
    );

    return (
        <>
            <ProSidebar
                collapsed={isMenuCollapse}
                rtl={updatedLanguage === "ar"}
                className={`${
                    isResponsiveMenu === true ? "open-menu" : "hide-menu"
                } aside-menu-container`}
            >
                <SidebarHeader className="aside-menu-container__aside-logo flex-column-auto pb-2 pt-3">
                    <a
                        href="/"
                        className={`text-decoration-none sidebar-logo ${
                            shouldShowCompanyName
                                ? "sidebar-logo--with-name"
                                : "sidebar-logo--logo-only"
                        } text-gray-900 fs-4`}
                    >
                        <div
                            className={`${
                                isMenuCollapse ? "d-none" : "image image-mini me-3"
                            }`}
                        >
                            <img
                                src={frontSetting.value && frontSetting.value.logo}
                                className="img-fluid object-fit-contain"
                                alt="Company logo"
                            />
                        </div>

                        {isMenuCollapse ? null : shouldShowCompanyName ? (
                                <span className="sidebar-brand-name">
                                    {frontSetting.value.company_name}
                                </span>
                            )
                            : ""}
                    </a>
                    <button
                        type="button"
                        onClick={(event) => menuIconClick(event)}
                        className="btn p-0 fs-1 aside-menu-container__aside-menubar d-lg-block d-none sidebar-btn border-0"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            className="text-gray-600"
                        />
                    </button>
                </SidebarHeader>
                <SidebarContent className="sidebar-scrolling">
                    {!isMenuCollapse && (
                        <div className="d-flex position-relative aside-menu-container__aside-search search-control py-3 mt-1">
                            <div className="position-relative d-flex w-100">
                                <input
                                    className="form-control ps-8"
                                    type="search"
                                    id="search"
                                    placeholder={placeholderText(
                                        "react-data-table.searchbar.placeholder"
                                    )}
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                />
                                <span className="position-absolute d-flex align-items-center top-0 bottom-0 left-0 text-gray-600 ms-3">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                        </div>
                    )}
                    <Menu>
                        {filteredMenu.length ? (
                            filteredMenu.map((mainItems) => {
                                const menuItemKey = getMenuItemKey(mainItems);
                                const visibleSubMenuItems =
                                    getVisibleSubMenuItems(mainItems);
                                const isActiveSubMenu = isSubMenuGroupActive(
                                    location.pathname,
                                    mainItems?.subPath
                                );

                                return mainItems.newRoute ? (
                                    <SubMenu
                                        key={`${menuItemKey}-submenu`}
                                        open={isSubMenuOpen(
                                            menuItemKey,
                                            mainItems
                                        )}
                                        onOpenChange={(isClosed) =>
                                            handleSubMenuOpenChange(
                                                menuItemKey,
                                                isClosed
                                            )
                                        }
                                        title={intl.formatMessage({
                                            id: `${mainItems.title}`,
                                        })}
                                        onMouseEnter={() =>
                                            handleRouteIntent(mainItems.to)
                                        }
                                        onFocus={() =>
                                            handleRouteIntent(mainItems.to)
                                        }
                                        className={
                                            isActiveSubMenu
                                                ? "pro-active-sub sidebar-submenu"
                                                : "sidebar-submenu"
                                        }
                                        icon={mainItems.fontIcon}
                                    >
                                        {visibleSubMenuItems.map(
                                            (subMainItems) => (
                                                <MenuItem
                                                    key={`${menuItemKey}-${
                                                        subMainItems.to ||
                                                        subMainItems.path ||
                                                        subMainItems.title
                                                    }`}
                                                    icon={subMainItems.fontIcon}
                                                    className={`${
                                                        isMenuCollapse === false
                                                            ? subMainItems.class
                                                            : ""
                                                    } flex-column`}
                                                    active={isSubMenuItemActive(
                                                        location.pathname,
                                                        subMainItems,
                                                        id
                                                    )}
                                                >
                                                    <Link
                                                        to={subMainItems.to}
                                                        onMouseEnter={() =>
                                                            handleRouteIntent(
                                                                subMainItems.to
                                                            )
                                                        }
                                                        onFocus={() =>
                                                            handleRouteIntent(
                                                                subMainItems.to
                                                            )
                                                        }
                                                        onClick={() =>
                                                            handleRouteClick(
                                                                subMainItems.to
                                                            )
                                                        }
                                                    >
                                                        {intl.formatMessage({
                                                            id: `${subMainItems.title}`,
                                                        })}
                                                    </Link>
                                                </MenuItem>
                                            )
                                        )}
                                    </SubMenu>
                                ) : (
                                    mainItems.to !== "/app/pos" && (
                                        <MenuItem
                                            key={menuItemKey}
                                            icon={mainItems.fontIcon}
                                            className={`${
                                                isMenuCollapse === false
                                                    ? mainItems.class
                                                    : ""
                                            } flex-column`}
                                            active={isMenuItemActive(
                                                location.pathname,
                                                mainItems,
                                                id
                                            )}
                                        >
                                            <Link
                                                to={mainItems.to}
                                                onMouseEnter={() =>
                                                    handleRouteIntent(
                                                        mainItems.to
                                                    )
                                                }
                                                onFocus={() =>
                                                    handleRouteIntent(
                                                        mainItems.to
                                                    )
                                                }
                                                onClick={() =>
                                                    handleRouteClick(
                                                        mainItems.to
                                                    )
                                                }
                                            >
                                                {intl.formatMessage({
                                                    id: `${mainItems.title}`,
                                                })}
                                            </Link>
                                        </MenuItem>
                                    )
                                );
                            })
                        ) : (
                            <div className="text-center">
                                {getFormattedMessage("side-menu.empty.message")}
                            </div>
                        )}
                    </Menu>
                </SidebarContent>
            </ProSidebar>

            <div
                className={`${
                    isResponsiveMenu === true && "bg-overlay d-block"
                }`}
                onClick={menuClick}
            />
        </>
    );
};

export default memo(AsideMenu);
