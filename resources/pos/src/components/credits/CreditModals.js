import React from "react";
import {
    Button,
    Col,
    Form,
    Modal,
    Row,
    Spinner,
    Table,
} from "react-bootstrap-v5";
import ReactSelect from "../../shared/select/reactSelect";
import { PAYMENT_METHOD_OPTIONS, StatusBadge } from "./creditHelpers";

const MODAL_PROPS = {
    centered: true,
    dialogClassName: "credits-modal-dialog",
    contentClassName: "credits-modal-content",
    backdropClassName: "credits-modal-backdrop",
};

const TableBox = ({ headers, rows, emptyText }) => (
    <div className="credits-table-wrapper">
        <div className="table-responsive">
            <Table hover className="align-middle credits-table">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>
                                <div className="credits-empty">{emptyText}</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    </div>
);

const ModalLoading = () => (
    <div className="text-center py-8">
        <Spinner animation="border" />
    </div>
);

export const ConfigModal = ({
    show,
    onHide,
    form,
    setForm,
    errors,
    customers,
    saving,
    onSubmit,
    existingCustomerIds,
}) => (
    <Modal show={show} onHide={onHide} size="lg" {...MODAL_PROPS}>
        <Modal.Header closeButton>
            <Modal.Title>Configurar credito de cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="credits-form-panel">
                <Row className="g-4">
                    <Col md={12}>
                        <ReactSelect
                            title="Cliente"
                            data={customers}
                            value={form.customer_id}
                            onChange={(value) =>
                                setForm((prev) => ({ ...prev, customer_id: value }))
                            }
                            errors={errors.customer_id}
                            customSelectProps={{
                                isDisabled: existingCustomerIds.includes(
                                    Number(form.customer_id?.value)
                                ),
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Limite de credito</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.credit_limit}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    credit_limit: event.target.value,
                                }))
                            }
                        />
                        {errors.credit_limit ? (
                            <div className="text-danger mt-2">
                                {errors.credit_limit}
                            </div>
                        ) : null}
                    </Col>
                    <Col md={6}>
                        <Form.Label>Interes (%)</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.interest_rate}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    interest_rate: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Maximo de cuotas</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="1"
                            step="1"
                            value={form.max_installments}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    max_installments: event.target.value,
                                }))
                            }
                        />
                        {errors.max_installments ? (
                            <div className="text-danger mt-2">
                                {errors.max_installments}
                            </div>
                        ) : null}
                    </Col>
                    <Col md={6}>
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            className="credits-form-control"
                            value={form.status}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    status: event.target.value,
                                }))
                            }
                        >
                            <option value="activo">Activo</option>
                            <option value="bloqueado">Bloqueado</option>
                        </Form.Select>
                    </Col>
                    <Col md={12}>
                        <div className="credits-check-field">
                            <Form.Check
                                label="Permitir exceder el limite"
                                checked={form.allow_exceed}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        allow_exceed: event.target.checked,
                                    }))
                                }
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={onHide}>
                Cancelar
            </Button>
            <Button onClick={onSubmit} disabled={saving}>
                {saving ? "Guardando..." : "Guardar"}
            </Button>
        </Modal.Footer>
    </Modal>
);

export const ManualCreditModal = ({
    show,
    onHide,
    form,
    setForm,
    errors,
    customers,
    saving,
    onSubmit,
}) => (
    <Modal show={show} onHide={onHide} size="lg" {...MODAL_PROPS}>
        <Modal.Header closeButton>
            <Modal.Title>Crear credito manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="credits-form-panel">
                <Row className="g-4">
                    <Col md={12}>
                        <ReactSelect
                            title="Cliente"
                            data={customers}
                            value={form.customer_id}
                            onChange={(value) =>
                                setForm((prev) => ({ ...prev, customer_id: value }))
                            }
                            errors={errors.customer_id}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.total_amount}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    total_amount: event.target.value,
                                }))
                            }
                        />
                        {errors.total_amount ? (
                            <div className="text-danger mt-2">
                                {errors.total_amount}
                            </div>
                        ) : null}
                    </Col>
                    <Col md={6}>
                        <Form.Label>Interes (%)</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.interest_rate}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    interest_rate: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Cuotas</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="1"
                            step="1"
                            value={form.installments}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    installments: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Fecha inicial</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="date"
                            value={form.start_date}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    start_date: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Fecha de vencimiento</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="date"
                            value={form.due_date}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    due_date: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <Form.Label>Nota</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className="credits-form-control"
                            value={form.note}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    note: event.target.value,
                                }))
                            }
                        />
                    </Col>
                </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={onHide}>
                Cancelar
            </Button>
            <Button onClick={onSubmit} disabled={saving}>
                {saving ? "Guardando..." : "Crear credito"}
            </Button>
        </Modal.Footer>
    </Modal>
);

const DetailBody = ({ creditDetail, money }) => (
    <>
        <div className="credits-modal-hero">
            <div>
                <div className="credits-record-eyebrow">
                    Credito #{creditDetail.id}
                </div>
                <h3 className="credits-record-title mb-1">
                    {creditDetail.customer_name}
                </h3>
                <div className="credits-record-subtitle">
                    <span>{creditDetail.sale_reference_code || "Venta manual"}</span>
                    <span>Inicio {creditDetail.start_date || "-"}</span>
                </div>
            </div>
            <StatusBadge status={creditDetail.status} />
        </div>

        <div className="credits-detail-grid mb-5">
            <div className="credits-detail-item">
                <strong>Cliente</strong>
                <span>{creditDetail.customer_name}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Venta</strong>
                <span>{creditDetail.sale_reference_code || "-"}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Total</strong>
                <span>{money(creditDetail.total_with_interest)}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Saldo</strong>
                <span>{money(creditDetail.balance)}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Capital pendiente</strong>
                <span>{money(creditDetail.principal_balance)}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Estado</strong>
                <span>{creditDetail.status}</span>
            </div>
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Cuotas</h5>
            <TableBox
                headers={["#", "Monto", "Pagado", "Pendiente", "Vence", "Estado"]}
                rows={(creditDetail.installments || []).map((row) => (
                    <tr key={row.id}>
                        <td>{row.installment_number}</td>
                        <td>{money(row.amount)}</td>
                        <td>{money(row.paid_amount)}</td>
                        <td>{money(row.pending_amount)}</td>
                        <td>{row.due_date}</td>
                        <td>
                            <StatusBadge status={row.status} />
                        </td>
                    </tr>
                ))}
                emptyText="Sin cuotas registradas."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Historial de pagos</h5>
            <TableBox
                headers={["Fecha", "Monto", "Metodo", "Nota"]}
                rows={(creditDetail.payments || []).map((row) => (
                    <tr key={row.id}>
                        <td>{row.created_at}</td>
                        <td>{money(row.amount)}</td>
                        <td>
                            {PAYMENT_METHOD_OPTIONS.find(
                                (option) =>
                                    Number(option.value) === Number(row.payment_type)
                            )?.label || row.payment_method}
                        </td>
                        <td>{row.note || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito aun no registra pagos."
            />
        </div>
    </>
);

export const DetailModal = ({
    show,
    onHide,
    detailLoading,
    creditDetail,
    money,
}) => (
    <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
        <Modal.Header closeButton>
            <Modal.Title>Detalle de credito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {detailLoading || !creditDetail ? (
                <ModalLoading />
            ) : (
                <DetailBody creditDetail={creditDetail} money={money} />
            )}
        </Modal.Body>
    </Modal>
);

export const PaymentModal = ({
    show,
    onHide,
    detailLoading,
    creditDetail,
    money,
    form,
    setForm,
    errors,
    saving,
    onSubmit,
}) => (
    <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
        <Modal.Header closeButton>
            <Modal.Title>Registrar pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {detailLoading || !creditDetail ? (
                <ModalLoading />
            ) : (
                <>
                    <div className="credits-detail-grid mb-5">
                        <div className="credits-detail-item">
                            <strong>Cliente</strong>
                            <span>{creditDetail.customer_name}</span>
                        </div>
                        <div className="credits-detail-item">
                            <strong>Saldo actual</strong>
                            <span>{money(creditDetail.balance)}</span>
                        </div>
                        <div className="credits-detail-item">
                            <strong>Vencimiento</strong>
                            <span>{creditDetail.due_date}</span>
                        </div>
                    </div>

                    <div className="credits-form-panel mb-5">
                        <Row className="g-4">
                            <Col md={4}>
                                <Form.Label>Monto recibido</Form.Label>
                                <Form.Control
                                    className="credits-form-control"
                                    type="number"
                                    min="0"
                                    max={creditDetail.balance}
                                    step="0.01"
                                    value={form.amount}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            amount: event.target.value,
                                        }))
                                    }
                                />
                                {errors.amount ? (
                                    <div className="text-danger mt-2">
                                        {errors.amount}
                                    </div>
                                ) : null}
                            </Col>
                            <Col md={4}>
                                <Form.Label>Metodo de pago</Form.Label>
                                <Form.Select
                                    className="credits-form-control"
                                    value={form.payment_type}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            payment_type: event.target.value,
                                        }))
                                    }
                                >
                                    {PAYMENT_METHOD_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={12}>
                                <Form.Label>Nota</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="credits-form-control"
                                    value={form.note}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            note: event.target.value,
                                        }))
                                    }
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="credits-modal-section">
                        <h5 className="credits-modal-section-title">
                            Cuotas pendientes
                        </h5>
                        <TableBox
                            headers={[
                                "#",
                                "Monto",
                                "Pagado",
                                "Pendiente",
                                "Vence",
                                "Estado",
                            ]}
                            rows={(creditDetail.installments || [])
                                .filter((row) => Number(row.pending_amount) > 0)
                                .map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.installment_number}</td>
                                        <td>{money(row.amount)}</td>
                                        <td>{money(row.paid_amount)}</td>
                                        <td>{money(row.pending_amount)}</td>
                                        <td>{row.due_date}</td>
                                        <td>
                                            <StatusBadge status={row.status} />
                                        </td>
                                    </tr>
                                ))}
                            emptyText="No hay cuotas pendientes."
                        />
                    </div>
                </>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={onHide}>
                Cerrar
            </Button>
            <Button onClick={onSubmit} disabled={saving || !creditDetail}>
                {saving ? "Guardando..." : "Registrar pago"}
            </Button>
        </Modal.Footer>
    </Modal>
);
