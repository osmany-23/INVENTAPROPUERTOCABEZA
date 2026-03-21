import React, {
    Suspense,
    lazy,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap-v5";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import TabTitle from "../../shared/tab-title/TabTitle";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
import {
    currencySymbolHandling,
    formatMoney,
    parseNumber,
} from "../../shared/sharedMethod";
import {
    CreditCard,
    CustomerCreditCard,
    DEFAULT_CONFIG_FORM,
    DEFAULT_MANUAL_FORM,
    DEFAULT_PAYMENT_FORM,
    EmptyStateCard,
    InterestCard,
    OverdueCustomerCard,
    SectionButtons,
    STATUS_FILTER_OPTIONS,
    SummaryCard,
    TooltipWrap,
} from "./creditHelpers";

const PAGE_SIZE = 8;

const loadCreditModal = (exportName) =>
    lazy(() =>
        import("./CreditModals").then((module) => ({
            default: module[exportName],
        }))
    );

const ConfigModal = loadCreditModal("ConfigModal");
const ManualCreditModal = loadCreditModal("ManualCreditModal");
const DetailModal = loadCreditModal("DetailModal");
const PaymentModal = loadCreditModal("PaymentModal");

const Credits = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const allConfigData = useSelector((state) => state.allConfigData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [activeSection, setActiveSection] = useState("credits");
    const [filters, setFilters] = useState({ search: "", status: "" });
    const [dashboard, setDashboard] = useState({
        summary: {},
        customer_configs: [],
        credits: [],
        overdue_customers: [],
        interest_report: [],
    });
    const [creditDetail, setCreditDetail] = useState(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [showManualModal, setShowManualModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [configForm, setConfigForm] = useState(DEFAULT_CONFIG_FORM);
    const [manualForm, setManualForm] = useState({
        ...DEFAULT_MANUAL_FORM,
        start_date: moment().format("YYYY-MM-DD"),
        due_date: moment().add(1, "month").format("YYYY-MM-DD"),
    });
    const [paymentForm, setPaymentForm] = useState(DEFAULT_PAYMENT_FORM);
    const [configErrors, setConfigErrors] = useState({});
    const [manualErrors, setManualErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});

    const toast = (text, type = toastType.SUCCESS) =>
        dispatch(addToast({ text, type }));

    const getErrorMessage = (error) =>
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo completar la operacion.";

    const money = (value) => {
        const safeNumber = parseNumber(value, 0);
        const safeCurrency = String(
            settings?.attributes?.currency_symbol || ""
        ).trim();

        if (!safeCurrency) {
            return formatMoney(safeNumber);
        }

        const formattedValue = currencySymbolHandling(
            allConfigData,
            safeCurrency,
            safeNumber
        );

        const cleanedValue = String(formattedValue || "")
            .replace(/\bundefined\b/gi, "")
            .replace(/\s+/g, " ")
            .trim();

        return cleanedValue || formatMoney(safeNumber);
    };

    const existingCustomerIds = useMemo(
        () =>
            (dashboard.customer_configs || []).map((row) =>
                Number(row.customer_id)
            ),
        [dashboard.customer_configs]
    );

    const activeRows = useMemo(() => {
        if (activeSection === "customers") {
            return dashboard.customer_configs || [];
        }

        if (activeSection === "overdue") {
            return dashboard.overdue_customers || [];
        }

        if (activeSection === "interest") {
            return dashboard.interest_report || [];
        }

        return dashboard.credits || [];
    }, [
        activeSection,
        dashboard.credits,
        dashboard.customer_configs,
        dashboard.overdue_customers,
        dashboard.interest_report,
    ]);

    const visibleRows = useMemo(
        () => activeRows.slice(0, visibleCount),
        [activeRows, visibleCount]
    );

    const hasMoreRows = visibleCount < activeRows.length;

    const fetchCustomers = async () => {
        try {
            const response = await apiConfig.get("/customers?page[size]=0");
            setCustomers(response?.data?.data || []);
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        }
    };

    const fetchDashboard = async (params = filters) => {
        try {
            setLoading(true);
            const response = await apiConfig.get("/credits/dashboard", {
                params: {
                    search: params.search || undefined,
                    status: params.status || undefined,
                },
            });
            setDashboard(response?.data?.data || {});
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setLoading(false);
        }
    };

    const fetchCreditDetail = async (creditId, modalSetter) => {
        try {
            setDetailLoading(true);
            const response = await apiConfig.get(`/credits/${creditId}`);
            setCreditDetail(response?.data?.data || null);
            modalSetter(true);
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setDetailLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchDashboard();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchDashboard(filters), 350);
        return () => clearTimeout(timer);
    }, [filters.search, filters.status]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeSection, filters.search, filters.status, activeRows.length]);

    const validateConfigForm = () => {
        const errors = {};
        if (!configForm.customer_id) errors.customer_id = "Seleccione un cliente.";
        if (Number(configForm.credit_limit) < 0) {
            errors.credit_limit = "Limite invalido.";
        }
        if (Number(configForm.max_installments) < 1) {
            errors.max_installments = "Ingrese al menos una cuota.";
        }
        setConfigErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateManualForm = () => {
        const errors = {};
        if (!manualForm.customer_id) errors.customer_id = "Seleccione un cliente.";
        if (Number(manualForm.total_amount) <= 0) {
            errors.total_amount = "Ingrese un monto valido.";
        }
        setManualErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePaymentForm = () => {
        const errors = {};
        if (Number(paymentForm.amount) <= 0) {
            errors.amount = "Ingrese un monto valido.";
        }
        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveConfig = async () => {
        if (!validateConfigForm()) return;
        try {
            setSaving(true);
            await apiConfig.post("/credits/customer-config", {
                customer_id: Number(configForm.customer_id.value),
                credit_limit: Number(configForm.credit_limit || 0),
                allow_exceed: Boolean(configForm.allow_exceed),
                interest_rate: Number(configForm.interest_rate || 0),
                max_installments: Number(configForm.max_installments || 1),
                status: configForm.status,
            });
            setShowConfigModal(false);
            setConfigForm(DEFAULT_CONFIG_FORM);
            await fetchDashboard();
            toast("Configuracion guardada.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const saveManualCredit = async () => {
        if (!validateManualForm()) return;
        try {
            setSaving(true);
            await apiConfig.post("/credits/manual", {
                customer_id: Number(manualForm.customer_id.value),
                total_amount: Number(manualForm.total_amount || 0),
                interest_rate: Number(manualForm.interest_rate || 0),
                installments: Number(manualForm.installments || 1),
                start_date: manualForm.start_date,
                due_date: manualForm.due_date,
                note: manualForm.note,
            });
            setShowManualModal(false);
            setManualForm({
                ...DEFAULT_MANUAL_FORM,
                start_date: moment().format("YYYY-MM-DD"),
                due_date: moment().add(1, "month").format("YYYY-MM-DD"),
            });
            await fetchDashboard();
            toast("Credito manual creado.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const savePayment = async () => {
        if (!creditDetail || !validatePaymentForm()) return;
        try {
            setSaving(true);
            const response = await apiConfig.post(
                `/credits/${creditDetail.id}/payments`,
                {
                    amount: Number(paymentForm.amount || 0),
                    payment_type: Number(paymentForm.payment_type || 1),
                    note: paymentForm.note,
                }
            );
            setCreditDetail(response?.data?.data || null);
            setPaymentForm(DEFAULT_PAYMENT_FORM);
            await fetchDashboard();
            toast("Pago registrado.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const openConfigModal = (row = null) => {
        setConfigErrors({});

        if (!row) {
            setConfigForm(DEFAULT_CONFIG_FORM);
        } else {
            setConfigForm({
                customer_id: {
                    value: row.customer_id,
                    label: row.customer_name,
                },
                credit_limit: String(row.credit_limit),
                allow_exceed: Boolean(row.allow_exceed),
                interest_rate: String(row.interest_rate),
                max_installments: String(row.max_installments),
                status: row.status,
            });
        }

        setShowConfigModal(true);
    };

    const openPaymentModal = (row) => {
        setPaymentErrors({});
        setPaymentForm({
            ...DEFAULT_PAYMENT_FORM,
            amount: String(row.balance),
        });
        fetchCreditDetail(row.id, setShowPaymentModal);
    };

    const renderCreditCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay creditos registrados." />;
        }

        return rows.map((row) => (
            <CreditCard
                key={row.id}
                row={row}
                money={money}
                onView={() => fetchCreditDetail(row.id, setShowDetailModal)}
                onPay={() => openPaymentModal(row)}
            />
        ));
    };

    const renderCustomerCards = (rows) => {
        if (!rows.length) {
            return (
                <EmptyStateCard text="No hay clientes configurados para credito." />
            );
        }

        return rows.map((row) => (
            <CustomerCreditCard
                key={row.id}
                row={row}
                money={money}
                onEdit={() => openConfigModal(row)}
            />
        ));
    };

    const renderOverdueCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay clientes morosos." />;
        }

        return rows.map((row) => (
            <OverdueCustomerCard
                key={row.customer_id}
                row={row}
                money={money}
            />
        ));
    };

    const renderInterestCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay datos de interes disponibles." />;
        }

        return rows.map((row) => (
            <InterestCard key={row.credit_id} row={row} money={money} />
        ));
    };

    const renderActiveSection = () => {
        if (activeSection === "customers") {
            return renderCustomerCards(visibleRows);
        }

        if (activeSection === "overdue") {
            return renderOverdueCards(visibleRows);
        }

        if (activeSection === "interest") {
            return renderInterestCards(visibleRows);
        }

        return renderCreditCards(visibleRows);
    };

    const summary = dashboard.summary || {};

    return (
        <MasterLayout>
            <div className="credits-page">
                <TabTitle title="Creditos" />
                <HeaderTitle title="Creditos" />

                <Row className="g-4 mb-5">
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Saldo pendiente"
                            value={money(summary.pending_balance)}
                            icon="balance"
                            tooltip="Monto total que los clientes aun deben pagar"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Capital usado"
                            value={money(summary.principal_in_use)}
                            icon="capital"
                            tooltip="Monto original otorgado en creditos, sin intereses"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Creditos vencidos"
                            value={String(summary.overdue_credits || 0)}
                            icon="overdue"
                            tooltip="Cantidad de creditos con fecha de vencimiento superada"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Interes cobrado"
                            value={money(summary.collected_interest)}
                            icon="interest"
                            tooltip="Interes efectivamente cobrado a los clientes"
                        />
                    </Col>
                </Row>

                <div className="card credits-surface-card">
                    <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-between align-items-center credits-toolbar mb-4">
                            <SectionButtons
                                activeSection={activeSection}
                                setActiveSection={setActiveSection}
                            />

                            <div className="d-flex flex-wrap credits-toolbar credits-toolbar-actions">
                                <TooltipWrap
                                    text="Buscar por cliente, numero de venta o credito"
                                    block
                                >
                                    <Form.Control
                                        className="credits-toolbar-field"
                                        placeholder="Buscar cliente, venta o credito"
                                        value={filters.search}
                                        onChange={(event) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                search: event.target.value,
                                            }))
                                        }
                                    />
                                </TooltipWrap>
                                <TooltipWrap
                                    text="Filtrar la lista de creditos por estado"
                                    block
                                >
                                    <Form.Select
                                        className="credits-toolbar-field"
                                        value={filters.status}
                                        onChange={(event) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                status: event.target.value,
                                            }))
                                        }
                                    >
                                        {STATUS_FILTER_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </TooltipWrap>
                                <TooltipWrap text="Definir limite de credito y condiciones del cliente">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => openConfigModal()}
                                    >
                                        Configurar cliente
                                    </Button>
                                </TooltipWrap>
                                <TooltipWrap text="Crear un credito sin necesidad de factura">
                                    <Button
                                        onClick={() => {
                                            setManualErrors({});
                                            setShowManualModal(true);
                                        }}
                                    >
                                        Credito manual
                                    </Button>
                                </TooltipWrap>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <Spinner animation="border" />
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`credits-card-grid${
                                        activeSection === "overdue"
                                            ? " credits-card-grid--compact"
                                            : ""
                                    }`}
                                >
                                    {renderActiveSection()}
                                </div>

                                {hasMoreRows ? (
                                    <div className="credits-load-more">
                                        <TooltipWrap text="Mostrar mas resultados sin recargar la pantalla">
                                            <Button
                                                variant="outline-primary"
                                                onClick={() =>
                                                    setVisibleCount(
                                                        (prev) => prev + PAGE_SIZE
                                                    )
                                                }
                                            >
                                                Mostrar mas
                                            </Button>
                                        </TooltipWrap>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Suspense fallback={null}>
                <ConfigModal
                    show={showConfigModal}
                    onHide={() => setShowConfigModal(false)}
                    form={configForm}
                    setForm={setConfigForm}
                    errors={configErrors}
                    customers={customers}
                    saving={saving}
                    onSubmit={saveConfig}
                    existingCustomerIds={existingCustomerIds.filter(
                        (id) => id !== Number(configForm.customer_id?.value)
                    )}
                />
                <ManualCreditModal
                    show={showManualModal}
                    onHide={() => setShowManualModal(false)}
                    form={manualForm}
                    setForm={setManualForm}
                    errors={manualErrors}
                    customers={customers}
                    saving={saving}
                    onSubmit={saveManualCredit}
                />
                <DetailModal
                    show={showDetailModal}
                    onHide={() => setShowDetailModal(false)}
                    detailLoading={detailLoading}
                    creditDetail={creditDetail}
                    money={money}
                />
                <PaymentModal
                    show={showPaymentModal}
                    onHide={() => setShowPaymentModal(false)}
                    detailLoading={detailLoading}
                    creditDetail={creditDetail}
                    money={money}
                    form={paymentForm}
                    setForm={setPaymentForm}
                    errors={paymentErrors}
                    saving={saving}
                    onSubmit={savePayment}
                />
            </Suspense>
        </MasterLayout>
    );
};

export default Credits;
