import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import ReactSelect from "../select/reactSelect";
import { getFormattedMessage, getFormattedOptions } from "../sharedMethod";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    baseUnitOptions,
    paymentStatusOptions,
    paymentTypeOptions,
    statusOptions,
    transferStatusOptions,
} from "../../constants";
import { fetchAllBaseUnits } from "../../store/action/baseUnitsAction";
import { Button } from "react-bootstrap-v5";
import { fetchAllBrands } from "../../store/action/brandsAction";
import { fetchAllProductCategories } from "../../store/action/productCategoryAction";
import { setProductUnitId } from "../../store/action/productUnitIdAction";
import "../../assets/css/product-filter-modal.css";

const FilterDropdown = (props) => {
    const {
        onExcelClick,
        goToImport,
        setPaymentStatusData,
        setStatusData,
        isUnitFilter,
        isStatus,
        isPaymentStatus,
        setProductUnitData,
        title,
        onResetClick,
        setPaymentTypeData,
        isPaymentType,
        isWarehouseType,
        onWarehouseChange,
        warehouseOptions,
        tableWarehouseValue,
        isTransferStatus,
        setTransferStatusData,
        fetchAllBaseUnits,
        base,
        isExportDropdown,
        isImportDropdown,
        isProductCategoryFilter,
        isBrandFilter,
        isModernFilterModal,
        brands,
        productCategories,
        setBrandData,
        setProductCategoryData,
        brandFilterTitle,
        productCategoryFilterTitle,
        fetchAllBrands,
        fetchAllProductCategories,
    } = props;

    const dispatch = useDispatch();
    const isReset = useSelector((state) => state.resetOption);
    const isShow = useSelector((state) => state.dropDownToggle);
    const menuRef = useRef(null);
    const baseUnitFilterOptions = getFormattedOptions(baseUnitOptions);
    const statusFilterOptions = getFormattedOptions(statusOptions);
    const paymentFilterOptions = getFormattedOptions(paymentStatusOptions);
    const paymentTypeFilterOptions = getFormattedOptions(paymentTypeOptions);
    const [productUnit, setProductUnit] = useState();
    const [brand, setBrand] = useState();
    const [productCategory, setProductCategory] = useState();
    const [status, setStatus] = useState();
    const [transferStatus, setTransferStatus] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const [paymentType, setPaymentType] = useState();
    const modalSelectProps = isModernFilterModal
        ? {
              classNamePrefix: "filter-modal-select",
              maxMenuHeight: 220,
              menuPlacement: "auto",
              menuPosition: "fixed",
              menuShouldScrollIntoView: false,
              menuPortalTarget:
                  typeof document !== "undefined" ? document.body : null,
              styles: {
                  menuPortal: (base) => ({
                      ...base,
                      zIndex: 1150,
                  }),
                  menu: (base) => ({
                      ...base,
                      width: "100%",
                      minWidth: "100%",
                      maxWidth: "100%",
                  }),
                  menuList: (base) => ({
                      ...base,
                      maxHeight: 220,
                      overflowY: "auto",
                  }),
              },
          }
        : undefined;

    useEffect(() => {
        fetchAllBaseUnits();
    }, [fetchAllBaseUnits]);

    useEffect(() => {
        if (!Array.isArray(brands) || brands.length === 0) {
            fetchAllBrands();
        }
    }, [brands, fetchAllBrands]);

    useEffect(() => {
        if (!Array.isArray(productCategories) || productCategories.length === 0) {
            fetchAllProductCategories();
        }
    }, [productCategories, fetchAllProductCategories]);

    const transferStatusFilterOptions = getFormattedOptions(
        transferStatusOptions
    );

    let unitDefaultValue = baseUnitFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    let baseOptions = [{ value: "0", label: "All" }, ...base];

    const statusDefaultValue = statusFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    const transferStatusDefaultValue = transferStatusFilterOptions.map(
        (option) => {
            return {
                value: option.id,
                label: option.name,
            };
        }
    );

    const paymentStatusDefaultValue = paymentFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    const paymentTypeDefaultValue = paymentTypeFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    const warehouseDefaultValue =
        warehouseOptions &&
        warehouseOptions.map((option) => {
            return {
                value: option.id,
                label: option.attributes.name,
            };
        });

    let brandDefaultValue =
        brands &&
        brands.map((option) => {
            return {
                value: option.id,
                label: option.attributes.name,
            };
        });

    brandDefaultValue = [{ value: "0", label: "All" }, ...brandDefaultValue];

    let productCategoryDefaultValue =
        productCategories &&
        productCategories.map((option) => {
            return {
                value: option.id,
                label: option.attributes.name,
            };
        });

    productCategoryDefaultValue = [
        { value: "0", label: "All" },
        ...productCategoryDefaultValue,
    ];

    const onReset = () => {
        dispatch({ type: "RESET_OPTION", payload: true });
        dispatch(setProductUnitId(0));
        setProductUnit({ label: "All", value: "0" });
        setProductUnitData({ label: "All", value: "0" });
        setBrand({ label: "All", value: "0" });
        setStatus({ label: "All", value: "0" });
        setProductCategory({ label: "All", value: "0" });
        setTransferStatus({ label: "All", value: "0" });
        setPaymentStatus({ label: "All", value: "0" });
        setPaymentType({ label: "All", value: "0" });
        onResetClick();
    };

    const closeDropdown = useCallback(() => {
        dispatch({ type: "ON_TOGGLE", payload: false });
    }, [dispatch]);

    const onToggle = () => {
        dispatch({ type: "ON_TOGGLE", payload: !isShow });
    };

    const closeDropdownOnSelect = useCallback(() => {
        if (!isModernFilterModal) {
            closeDropdown();
        }
    }, [closeDropdown, isModernFilterModal]);

    const onExportClick = () => {
        onExcelClick && onExcelClick();
        closeDropdown();
    };

    const onImportClick = () => {
        goToImport && goToImport();
        closeDropdown();
    };

    const escFunction = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                closeDropdown();
            }
        },
        [closeDropdown]
    );

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    useEffect(() => {
        if (isModernFilterModal) {
            return undefined;
        }

        const onClickOutside = (event) => {
            if (menuRef?.current?.contains(event.target)) {
                return;
            }
            closeDropdown();
        };

        document.body.addEventListener("click", onClickOutside);
        return () => {
            document.body.removeEventListener("click", onClickOutside);
        };
    }, [closeDropdown, isModernFilterModal]);

    useEffect(() => {
        if (!(isModernFilterModal && isShow)) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isModernFilterModal, isShow]);

    const onProductUnitChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        dispatch(setProductUnitId(obj.value));
        setProductUnit(obj);
        setProductUnitData(obj);
        closeDropdownOnSelect();
    };

    const onBrandChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setBrand(obj);
        setBrandData(obj);
        closeDropdownOnSelect();
    };

    const onProductCategoryChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setProductCategory(obj);
        setProductCategoryData(obj);
        closeDropdownOnSelect();
    };

    const onStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setStatus(obj);
        setStatusData(obj);
        closeDropdownOnSelect();
    };

    const onTransferStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setTransferStatus(obj);
        setTransferStatusData(obj);
        setStatus(obj);
        setStatusData(obj);
        closeDropdownOnSelect();
    };

    const onPaymentTypeChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setPaymentType(obj);
        setPaymentTypeData(obj);
        closeDropdownOnSelect();
    };

    const onPaymentStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setPaymentStatus(obj);
        setPaymentStatusData(obj);
        closeDropdownOnSelect();
    };

    const FieldWrapper = ({ children, eventKey }) => {
        if (isModernFilterModal) {
            return <div className="filter-field">{children}</div>;
        }

        return (
            <Dropdown.Header
                onClick={(e) => {
                    e.stopPropagation();
                }}
                eventKey={eventKey}
                className="mb-5 p-0"
            >
                {children}
            </Dropdown.Header>
        );
    };

    const renderFilterFields = () => (
        <>
            {isStatus ? (
                <FieldWrapper eventKey="1">
                    <ReactSelect
                        multiLanguageOption={statusFilterOptions}
                        onChange={onStatusChange}
                        name="status"
                        title={getFormattedMessage("purchase.select.status.label")}
                        value={isReset ? statusDefaultValue[0] : status}
                        isRequired
                        defaultValue={statusDefaultValue[0]}
                        placeholder={getFormattedMessage(
                            "purchase.select.status.label"
                        )}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isPaymentStatus ? (
                <FieldWrapper eventKey="2">
                    <ReactSelect
                        multiLanguageOption={paymentFilterOptions}
                        onChange={onPaymentStatusChange}
                        name="payment_status"
                        title={getFormattedMessage(
                            "dashboard.recentSales.paymentStatus.label"
                        )}
                        value={isReset ? paymentStatusDefaultValue[0] : paymentStatus}
                        isRequired
                        defaultValue={paymentStatusDefaultValue[0]}
                        placeholder={getFormattedMessage(
                            "dashboard.recentSales.paymentStatus.label"
                        )}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isUnitFilter ? (
                <FieldWrapper eventKey="3">
                    <ReactSelect
                        onChange={onProductUnitChange}
                        name="product_unit"
                        title={title}
                        value={isReset ? unitDefaultValue[0] : productUnit}
                        isRequired
                        defaultValue={unitDefaultValue[0]}
                        placeholder={title}
                        data={baseOptions}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isPaymentType ? (
                <FieldWrapper eventKey="4">
                    <ReactSelect
                        multiLanguageOption={paymentTypeFilterOptions}
                        onChange={onPaymentTypeChange}
                        name="payment_type"
                        title={getFormattedMessage("select.payment-type.label")}
                        value={isReset ? paymentTypeDefaultValue[0] : paymentType}
                        isRequired
                        defaultValue={paymentTypeDefaultValue[0]}
                        placeholder={getFormattedMessage("select.payment-type.label")}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isWarehouseType ? (
                <FieldWrapper eventKey="4">
                    <ReactSelect
                        data={warehouseOptions}
                        onChange={onWarehouseChange}
                        name="payment_type"
                        title={getFormattedMessage(
                            "dashboard.stockAlert.warehouse.label"
                        )}
                        value={
                            isReset ? warehouseDefaultValue[0] : tableWarehouseValue
                        }
                        isRequired
                        defaultValue={warehouseDefaultValue[0]}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isTransferStatus ? (
                <FieldWrapper eventKey="1">
                    <ReactSelect
                        multiLanguageOption={transferStatusFilterOptions}
                        onChange={onTransferStatusChange}
                        name="status"
                        title={getFormattedMessage("purchase.select.status.label")}
                        value={isReset ? transferStatusDefaultValue[0] : transferStatus}
                        isRequired
                        defaultValue={transferStatusDefaultValue[0]}
                        placeholder={getFormattedMessage(
                            "purchase.select.status.label"
                        )}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isBrandFilter ? (
                <FieldWrapper eventKey="3">
                    <ReactSelect
                        onChange={onBrandChange}
                        name="brand"
                        title={brandFilterTitle}
                        value={isReset ? unitDefaultValue[0] : brand}
                        isRequired
                        defaultValue={unitDefaultValue[0]}
                        placeholder={brandFilterTitle}
                        data={brandDefaultValue}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {isProductCategoryFilter ? (
                <FieldWrapper eventKey="3">
                    <ReactSelect
                        onChange={onProductCategoryChange}
                        name="product_category"
                        title={productCategoryFilterTitle}
                        value={isReset ? unitDefaultValue[0] : productCategory}
                        isRequired
                        defaultValue={unitDefaultValue[0]}
                        placeholder={productCategoryFilterTitle}
                        data={productCategoryDefaultValue}
                        customSelectProps={modalSelectProps}
                    />
                </FieldWrapper>
            ) : null}
            {!isModernFilterModal && isExportDropdown ? (
                <FieldWrapper eventKey="1">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onExportClick}
                        className="me-3 me-md-0 btn-light-primary w-100"
                    >
                        {getFormattedMessage("product.export.title")}
                    </Button>
                </FieldWrapper>
            ) : null}
            {!isModernFilterModal && isImportDropdown ? (
                <FieldWrapper eventKey="1">
                    <Button
                        variant="primary"
                        className="me-3 me-md-0 btn-light-primary w-100"
                        onClick={onImportClick}
                    >
                        {getFormattedMessage("product.import.title")}
                    </Button>
                </FieldWrapper>
            ) : null}
        </>
    );

    return (
        <Dropdown
            className="me-3 mb-2 filter-dropdown order-1 order-sm-0"
            show={isShow}
            ref={menuRef}
        >
            <Dropdown.Toggle
                variant="primary"
                className="text-white btn-icon hide-arrow"
                id="filterDropdown"
                onClick={() => onToggle()}
            >
                <FontAwesomeIcon icon={faFilter} />
            </Dropdown.Toggle>
            {isModernFilterModal ? (
                isShow ? (
                    <div
                        className="product-filter-modal-backdrop"
                        onClick={closeDropdown}
                    >
                        <div
                            className="product-filter-modal"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <button
                                type="button"
                                className="filter-modal-close"
                                onClick={closeDropdown}
                                aria-label="Cerrar filtros"
                            >
                                &times;
                            </button>

                            {renderFilterFields()}

                            <div className="filter-buttons">
                                <div className="filter-main-actions">
                                    {isExportDropdown ? (
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={onExportClick}
                                            className="btn-light-primary filter-action-btn filter-main-btn"
                                        >
                                            {getFormattedMessage("product.export.title")}
                                        </Button>
                                    ) : null}
                                    {isImportDropdown ? (
                                        <Button
                                            variant="primary"
                                            className="btn-light-primary filter-action-btn filter-main-btn"
                                            onClick={onImportClick}
                                        >
                                            {getFormattedMessage("product.import.title")}
                                        </Button>
                                    ) : null}
                                </div>
                                <div className="filter-reset-action">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-reset filter-action-btn"
                                        onClick={onReset}
                                    >
                                        {getFormattedMessage(
                                            "date-picker.filter.reset.label"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            ) : (
                <Dropdown.Menu className="px-7 py-5">
                    {renderFilterFields()}
                    <button
                        type="button"
                        className="btn btn-secondary me-5"
                        onClick={onReset}
                    >
                        {getFormattedMessage("date-picker.filter.reset.label")}
                    </button>
                </Dropdown.Menu>
            )}
        </Dropdown>
    );
};

const mapStateToProps = (state) => {
    const { base, brands, productCategories } = state;
    return { base, brands, productCategories };
};

export default connect(mapStateToProps, {
    fetchAllBaseUnits,
    fetchAllBrands,
    fetchAllProductCategories,
})(FilterDropdown);
