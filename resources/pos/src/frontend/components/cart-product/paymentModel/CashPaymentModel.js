import React, { useEffect, useState } from "react";
import { Modal, Form, Table } from "react-bootstrap";
import {
    currencySymbolHandling,
    formatNumber,
    formatQuantityAuto,
    getFormattedMessage,
    getFormattedOptions,
    numFloatValidate,
    numValidate,
    parseNumber,
    placeholderText,
} from "../../../../shared/sharedMethod";
import ReactSelect from "../../../../shared/select/reactSelect";
import { useDispatch } from "react-redux";
import { addToast } from "../../../../store/action/toastAction";
import { salePaymentStatusOptions, toastType } from "../../../../constants";

const CashPaymentModel = (props) => {
    const {
        handleCashPayment,
        cashPaymentValue,
        onPaymentStatusChange,
        cashPayment,
        onChangeInput,
        onCashPayment,
        grandTotal,
        totalQty,
        cartItemValue,
        taxTotal,
        settings,
        subTotal,
        errors,
        onPaymentTypeChange,
        paymentTypeDefaultValue,
        paymentTypeFilterOptions,
        allConfigData,
        onChangeReturnChange,
        onCreditToggleChange,
        onUseCustomerCreditConfigChange,
        creditAvailability,
        isLoadingCreditAvailability,
        selectedCustomerName,
    } = props;

    const [summation, setSummation] = useState(0);
    const dispatch = useDispatch();
    const isPaidSale = cashPaymentValue?.payment_status?.value === 1;
    const maxInstallments = Math.max(
        Number(creditAvailability?.max_installments || 1),
        1
    );
    const creditEnabled =
        cashPaymentValue?.payment_status?.value === 2 &&
        cashPaymentValue?.credit_enabled;
    const creditBlocked =
        creditEnabled &&
        !isLoadingCreditAvailability &&
        !creditAvailability?.allowed;

    useEffect(() => {
        cashPaymentValue.received_amount !== undefined
            ? setSummation(cashPaymentValue.received_amount - grandTotal)
            : setSummation(summation);
    }, [cashPaymentValue.received_amount, grandTotal]);

    useEffect(() => {
        onChangeReturnChange(summation);
    }, [summation]);

    const paymentStatusFilterOptions = getFormattedOptions(
        salePaymentStatusOptions
    );
    const paymentStatusDefaultValue = paymentStatusFilterOptions.map(
        (option) => {
            return {
                value: option.id,
                label: option.name,
            };
        }
    );

    return (
        <Modal
            show={cashPayment}
            onHide={handleCashPayment}
            size="xl"
            className="pos-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {getFormattedMessage("pos-make-Payment.title")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <div className="row">
                            {isPaidSale && <Form.Group
                                className="mb-3 col-6"
                                controlId="formBasicReceived_amount"
                            >
                                <Form.Label>
                                    {getFormattedMessage(
                                        "pos-received-amount.title"
                                    )}
                                    :{" "}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    min={0}
                                    onKeyPress={(event) => numFloatValidate(event)}
                                    name="received_amount"
                                    autoComplete="off"
                                    className="form-control-solid"
                                    defaultValue={grandTotal}
                                    onChange={(e) => onChangeInput(e)}
                                />
                            </Form.Group>}
                            {isPaidSale && <Form.Group className="mb-3 col-6">
                                <Form.Label>
                                    {getFormattedMessage(
                                        "pos-paying-amount.title"
                                    )}
                                    :{" "}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="paying_amount"
                                    autoComplete="off"
                                    readOnly={true}
                                    className="form-control-solid"
                                    value={grandTotal}
                                />
                            </Form.Group>}
                            {isPaidSale && <Form.Group className="mb-3 col-6">
                                <Form.Label>
                                    {getFormattedMessage(
                                        "pos.change-return.label"
                                    )}{" "}
                                    :{" "}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    autoComplete="off"
                                    readOnly={true}
                                    className="form-control-solid"
                                    value={formatNumber(summation, 2)}
                                />
                            </Form.Group>}
                            {cashPaymentValue?.payment_status?.value === 1 &&<Form.Group
                                className="mb-3 col-6"
                                controlId="formBasicType"
                            >
                                <Form.Label>
                                    {getFormattedMessage(
                                        "globally.react-table.column.payment-type.label"
                                    )}
                                    :
                                </Form.Label>
                                <ReactSelect
                                    multiLanguageOption={
                                        paymentTypeFilterOptions
                                    }
                                    onChange={onPaymentTypeChange}
                                    name="payment_type"
                                    isRequired
                                    defaultValue={paymentTypeDefaultValue[0]}
                                    placeholder={getFormattedMessage(
                                        "select.payment-type.label"
                                    )}
                                />
                            </Form.Group>}
                            {cashPaymentValue?.payment_status?.value === 2 && (
                                <div className="col-12 mb-3">
                                    <div className="border rounded p-4 bg-light-primary">
                                        <Form.Check
                                            type="switch"
                                            id="posCreateCreditSwitch"
                                            className="mb-4"
                                            label="Crear crédito para esta venta"
                                            checked={cashPaymentValue?.credit_enabled}
                                            onChange={onCreditToggleChange}
                                        />
                                        {cashPaymentValue?.credit_enabled && (
                                            <>
                                                <Form.Check
                                                    type="switch"
                                                    id="posUseCustomerCreditConfigSwitch"
                                                    className="mb-3"
                                                    label="Usar configuracion del cliente"
                                                    checked={
                                                        cashPaymentValue?.use_customer_credit_config
                                                    }
                                                    onChange={
                                                        onUseCustomerCreditConfigChange
                                                    }
                                                />
                                                <div className="small text-muted mb-3">
                                                    Se autocompletan interes y cuotas desde la
                                                    linea de credito del cliente, pero puede
                                                    editarlos antes de guardar.
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-3 col-sm-6">
                                                        <div className="border rounded bg-white p-3 h-100">
                                                            <div className="text-muted small mb-1">
                                                                Limite
                                                            </div>
                                                            <strong>
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    settings.attributes &&
                                                                        settings.attributes
                                                                            .currency_symbol,
                                                                    Number(
                                                                        creditAvailability?.credit_limit || 0
                                                                    ).toFixed(2)
                                                                )}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <div className="border rounded bg-white p-3 h-100">
                                                            <div className="text-muted small mb-1">
                                                                Usado
                                                            </div>
                                                            <strong>
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    settings.attributes &&
                                                                        settings.attributes
                                                                            .currency_symbol,
                                                                    Number(
                                                                        creditAvailability?.used_credit || 0
                                                                    ).toFixed(2)
                                                                )}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <div className="border rounded bg-white p-3 h-100">
                                                            <div className="text-muted small mb-1">
                                                                Disponible
                                                            </div>
                                                            <strong className="text-success">
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    settings.attributes &&
                                                                        settings.attributes
                                                                            .currency_symbol,
                                                                    Number(
                                                                        creditAvailability?.available_credit || 0
                                                                    ).toFixed(2)
                                                                )}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-6">
                                                        <div className="border rounded bg-white p-3 h-100">
                                                            <div className="text-muted small mb-1">
                                                                Credito a crear
                                                            </div>
                                                            <strong>
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    settings.attributes &&
                                                                        settings.attributes
                                                                            .currency_symbol,
                                                                    Number(
                                                                        creditAvailability?.requested_amount || 0
                                                                    ).toFixed(2)
                                                                )}
                                                            </strong>
                                                            <div className="small text-muted mt-1">
                                                                Incluye interes proyectado de{" "}
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    settings.attributes &&
                                                                        settings.attributes
                                                                            .currency_symbol,
                                                                    Number(
                                                                        creditAvailability?.projected_interest_amount ||
                                                                            0
                                                                    ).toFixed(2)
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <Form.Group className="mb-3 col-md-4">
                                                        <Form.Label>Interes (%)</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            min={0}
                                                            step="0.01"
                                                            name="credit_interest_rate"
                                                            value={
                                                                cashPaymentValue?.credit_interest_rate
                                                            }
                                                            onChange={(e) => onChangeInput(e)}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3 col-md-4">
                                                        <Form.Label>Cuotas</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            min={1}
                                                            step="1"
                                                            name="credit_installments"
                                                            value={
                                                                cashPaymentValue?.credit_installments
                                                            }
                                                            onChange={(e) => onChangeInput(e)}
                                                        />
                                                        <span className="text-danger">
                                                            {errors["credit_installments"]
                                                                ? errors["credit_installments"]
                                                                : null}
                                                        </span>
                                                        <div className="small text-muted mt-1">
                                                            Maximo configurado: {maxInstallments}
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3 col-md-4">
                                                        <Form.Label>Vence el</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="credit_due_date"
                                                            value={
                                                                cashPaymentValue?.credit_due_date
                                                            }
                                                            onChange={(e) => onChangeInput(e)}
                                                        />
                                                        <span className="text-danger">
                                                            {errors["credit_due_date"]
                                                                ? errors["credit_due_date"]
                                                                : null}
                                                        </span>
                                                    </Form.Group>
                                                </div>
                                                <div
                                                    className={`alert mb-3 ${
                                                        creditBlocked
                                                            ? "alert-danger"
                                                            : "alert-success"
                                                    }`}
                                                >
                                                    <div className="fw-bold mb-1">
                                                        {selectedCustomerName ||
                                                            "Cliente no seleccionado"}
                                                    </div>
                                                    <div>
                                                        {isLoadingCreditAvailability
                                                            ? "Validando linea de credito en tiempo real..."
                                                            : creditAvailability?.message ||
                                                              "Credito disponible."}
                                                    </div>
                                                    {creditAvailability?.has_overdue_credits ? (
                                                        <div className="small mt-2">
                                                            El cliente tiene creditos vencidos y
                                                            no puede recibir nuevas ventas a
                                                            credito.
                                                        </div>
                                                    ) : null}
                                                </div>
                                                {false && <div className="row d-none">
                                                <Form.Group className="mb-3 col-md-4">
                                                    <Form.Label>Interés (%)</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        min={0}
                                                        step="0.01"
                                                        name="credit_interest_rate"
                                                        value={
                                                            cashPaymentValue?.credit_interest_rate
                                                        }
                                                        onChange={(e) => onChangeInput(e)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-md-4">
                                                    <Form.Label>Cuotas</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        min={1}
                                                        step="1"
                                                        name="credit_installments"
                                                        value={
                                                            cashPaymentValue?.credit_installments
                                                        }
                                                        onChange={(e) => onChangeInput(e)}
                                                    />
                                                    <span className="text-danger">
                                                        {errors["credit_installments"]
                                                            ? errors["credit_installments"]
                                                            : null}
                                                    </span>
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-md-4">
                                                    <Form.Label>Vence el</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="credit_due_date"
                                                        value={
                                                            cashPaymentValue?.credit_due_date
                                                        }
                                                        onChange={(e) => onChangeInput(e)}
                                                    />
                                                    <span className="text-danger">
                                                        {errors["credit_due_date"]
                                                            ? errors["credit_due_date"]
                                                            : null}
                                                    </span>
                                                </Form.Group>
                                            </div>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            <Form.Group
                                className="mb-3 col-12"
                                controlId="formBasicNotes"
                            >
                                <Form.Label>
                                    {getFormattedMessage(
                                        "globally.input.notes.label"
                                    )}
                                    :{" "}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="form-control-solid"
                                    name="notes"
                                    rows={3}
                                    onChange={(e) => onChangeInput(e)}
                                    placeholder={placeholderText(
                                        "globally.input.notes.placeholder.label"
                                    )}
                                    value={cashPaymentValue.notes}
                                />
                                <span className="text-danger">
                                    {errors["notes"] ? errors["notes"] : null}
                                </span>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 col-12"
                                controlId="formBasicPaymentStatus"
                            >
                                <ReactSelect
                                    multiLanguageOption={
                                        paymentStatusFilterOptions
                                    }
                                    onChange={onPaymentStatusChange}
                                    name="payment_status"
                                    title={getFormattedMessage(
                                        "dashboard.recentSales.paymentStatus.label"
                                    )}
                                    value={cashPaymentValue.payment_status}
                                    errors={errors["payment_status"]}
                                    defaultValue={paymentStatusDefaultValue[1]}
                                    placeholder={placeholderText(
                                        "sale.select.payment-status.placeholder"
                                    )}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="card custom-cash-card">
                            <div className="card-body p-6">
                                <Table
                                    striped
                                    bordered
                                    hover
                                    className="mb-0 text-nowrap"
                                >
                                    <tbody>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "dashboard.recentSales.total-product.label"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                <span className="btn btn-primary cursor-default rounded-circle total-qty-text d-flex align-items-center justify-content-center p-2">
                                                    {formatQuantityAuto(totalQty)}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "pos-total-amount.title"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    settings.attributes &&
                                                        settings.attributes
                                                            .currency_symbol,
                                                    subTotal ? subTotal : "0.00"
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "globally.detail.order.tax"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    settings.attributes &&
                                                        settings.attributes
                                                            .currency_symbol,
                                                    taxTotal ? taxTotal : "0.00"
                                                )}{" "}
                                                (
                                                {cartItemValue.tax
                                                    ? formatNumber(
                                                          parseNumber(
                                                              cartItemValue.tax,
                                                              0
                                                          ),
                                                          2
                                                      )
                                                    : "0.00"}{" "}
                                                %)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "purchase.order-item.table.discount.column.label"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    settings.attributes &&
                                                        settings.attributes
                                                            .currency_symbol,
                                                    cartItemValue.discount
                                                        ? cartItemValue.discount
                                                        : "0.00"
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "purchase.input.shipping.label"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    settings.attributes &&
                                                        settings.attributes
                                                            .currency_symbol,
                                                    cartItemValue.shipping
                                                        ? cartItemValue.shipping
                                                        : "0.00"
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="ps-3">
                                                {getFormattedMessage(
                                                    "purchase.grant-total.label"
                                                )}
                                            </td>
                                            <td className="px-3">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    settings.attributes &&
                                                        settings.attributes
                                                            .currency_symbol,
                                                    grandTotal
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="mt-0">
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={creditEnabled && (creditBlocked || isLoadingCreditAvailability)}
                    onClick={(event) => {
                        if (isPaidSale && cashPaymentValue.received_amount !== undefined) {
                            if (
                                parseNumber(cashPaymentValue.received_amount, 0) <
                                parseNumber(grandTotal, 0)
                            ) {
                                dispatch(
                                    addToast({
                                        text: getFormattedMessage(
                                            "purchase.less.recieving.ammout.error"
                                        ),
                                        type: toastType.ERROR,
                                    })
                                );
                            } else {
                                onCashPayment(event);
                            }
                        } else {
                            onCashPayment(event);
                        }
                    }}
                >
                    {getFormattedMessage("globally.submit-btn")}
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={creditEnabled && (creditBlocked || isLoadingCreditAvailability)}
                    onClick={(event) => {
                        if (isPaidSale && cashPaymentValue.received_amount !== undefined) {
                            if (
                                parseNumber(cashPaymentValue.received_amount, 0) <
                                parseNumber(grandTotal, 0)
                            ) {
                                dispatch(
                                    addToast({
                                        text: getFormattedMessage(
                                            "purchase.less.recieving.ammout.error"
                                        ),
                                        type: toastType.ERROR,
                                    })
                                );
                            } else {
                                onCashPayment(event,true);
                            }
                        } else {
                            onCashPayment(event,true);
                        }
                    }}
                >
                    {getFormattedMessage("globally.submit-and-print-button")}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary me-0"
                    onClick={handleCashPayment}
                >
                    {getFormattedMessage("globally.cancel-btn")}
                </button>
            </Modal.Footer>
        </Modal>
    );
};
export default CashPaymentModel;
