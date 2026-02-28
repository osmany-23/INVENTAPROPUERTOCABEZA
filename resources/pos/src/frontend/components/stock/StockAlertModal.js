import React, {useEffect, useState} from 'react';
import {Modal, Button, Table, Form, Badge, InputGroup} from 'react-bootstrap-v5';
import {connect, useDispatch} from 'react-redux';
import {fetchStockAlert} from '../../../store/action/stockAlertAction';
import apiConfig from '../../../config/apiConfig';
import {getFormattedMessage} from '../../../shared/sharedMethod';
import { apiBaseURL, Tokens } from '../../../constants';
import { can } from "../../../shared/can";

const StockAlertModal = (props) => {
    const {show, onHide, stockAlertDetails, warehouse} = props;
    const [filterQty, setFilterQty] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState('');
    const [loadingExport, setLoadingExport] = useState(false);
    const dispatch = useDispatch();
    const canViewStockAlerts = can("view_stock_alerts", { strict: true });

    useEffect(() => {
        if (!show || !canViewStockAlerts) {
            return;
        }
        dispatch(fetchStockAlert());
    }, [dispatch, show, canViewStockAlerts]);

    if (!canViewStockAlerts) {
        return null;
    }

    useEffect(() => {
        setFiltered(stockAlertDetails || []);
    }, [stockAlertDetails]);

    const validateNumber = (value) => {
        if (value === '') return true;
        const re = /^\d+(\.\d+)?$/;
        return re.test(String(value).trim());
    };

    const onSearch = () => {
        setError('');
        if (filterQty === '') {
            setFiltered(stockAlertDetails || []);
            return;
        }
        if (!validateNumber(filterQty)) {
            setError('Ingrese solo valores numéricos');
            return;
        }
        const value = Number(filterQty);
        const result = (stockAlertDetails || []).filter((item) => Number(item.stock?.quantity) === value);
        setFiltered(result);
    };

    const onExport = async () => {
        setError('');
        if (filterQty !== '' && !validateNumber(filterQty)) {
            setError('Ingrese solo valores numéricos');
            return;
        }
        try {
            setLoadingExport(true);
            const params = {};
            if (warehouse) params.warehouse_id = warehouse;
            if (filterQty !== '') params.quantity = filterQty;
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await apiConfig.get(`${apiBaseURL.STOCK_ALERT}/export-download`, {
                params,
                responseType: 'blob',
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'AlertasStock.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Error al exportar.');
        } finally {
            setLoadingExport(false);
        }
    };

    return (
        <Modal size='lg' show={show} onHide={onHide} centered>
            <Modal.Header className='border-0' closeButton>
                    <div>
                        <h5 className='mb-0'>Alertas de existencias</h5>
                        <small className='text-muted'>Productos con stock igual o menor al nivel de alerta</small>
                    </div>
                </Modal.Header>
            <Modal.Body>
                    <div className='d-flex mb-3 align-items-center gap-2'>
                        <InputGroup className='flex-grow-1'>
                            <InputGroup.Text className='bg-white'>🔍</InputGroup.Text>
                            <Form.Control
                                placeholder={'Filtrar por cantidad exacta de stock'}
                                value={filterQty}
                                onChange={(e) => setFilterQty(e.target.value)}
                                type='text'
                                aria-label='Filtrar por cantidad'
                            />
                        </InputGroup>
                        <Button className='ms-2 btn-primary' onClick={onSearch}><span className='me-1'>🔎</span> Buscar</Button>
                        <Button variant='success' className='ms-auto' onClick={onExport} disabled={loadingExport}>{loadingExport ? 'Exportando...' : 'Exportar Excel'}</Button>
                    </div>
                    {error ? <div className='text-danger mb-2'>{error}</div> : null}
                {filtered && filtered.length ? (
                        <div style={{maxHeight: 420, overflowY: 'auto'}}>
                            <Table responsive hover className='align-middle'>
                                <thead className='table-secondary text-uppercase'>
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Depósito</th>
                                        <th className='text-end'>Stock actual</th>
                                        <th className='text-center'>Cantidad de alerta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.stock && item.stock.warehouse ? item.stock.warehouse.name : ''}</td>
                                            <td className='text-end fw-bold text-dark'>{item.stock ? item.stock.quantity : ''}</td>
                                            <td className='text-center'>
                                                <Badge bg='warning' text='dark' style={{borderRadius: 12, padding: '6px 10px'}}>
                                                    {item.product?.stock_alert ?? item.stock_alert ?? ''}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                ) : (
                        <div className='text-center py-4'>No hay productos con esa cantidad en stock.</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const {stockAlertDetails} = state;
    return {stockAlertDetails};
};

export default connect(mapStateToProps, {fetchStockAlert})(StockAlertModal);
