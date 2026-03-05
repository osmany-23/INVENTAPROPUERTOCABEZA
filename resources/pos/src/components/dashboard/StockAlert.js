import React, { useEffect } from 'react';
import { Card, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFormattedMessage } from '../../shared/sharedMethod';
import { fetchStockAlert } from "../../store/action/stockAlertAction";
import { can } from "../../shared/can";

const StockAlert = ( props ) => {
    const { fetchStockAlert, stockAlertDetails } = props
    const canViewStockAlerts = can("view_stock_alerts", { strict: true });
    const alerts = Array.isArray(stockAlertDetails) ? stockAlertDetails : [];
    const hasAlerts = alerts.length > 0;
    const tableBodyStyle = {
        maxHeight: '360px',
        overflowY: 'auto',
    };
    const truncateStyle = {
        maxWidth: '280px',
    };
    const stickyHeaderStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#f8f9fa',
    };

    useEffect( () => {
        if (!canViewStockAlerts) {
            return;
        }

        fetchStockAlert();
    }, [canViewStockAlerts, fetchStockAlert] );

    if (!canViewStockAlerts) {
        return null;
    }

    return (
        <div className='pt-6'>
            <Row className='g-4'>
                <div className='col-12'>
                    <Card>
                        <Card.Header className='pb-0 px-10'>
                            <h5 className="mb-0">{getFormattedMessage( "dashboard.stockAlert.title" )}</h5>
                        </Card.Header>
                        <Card.Body className='pt-5 pb-2'>
                            <div className='d-flex justify-content-end mb-2 px-1'>
                                <small className='text-muted'>
                                    {alerts.length} registros
                                </small>
                            </div>
                            <div className='table-responsive' style={tableBodyStyle}>
                            <Table responsive className='table-sm align-middle mb-0'>
                                <thead>
                                    <tr>
                                        <th style={stickyHeaderStyle}>{getFormattedMessage( "dashboard.stockAlert.code.label" )}</th>
                                        <th style={stickyHeaderStyle}>{getFormattedMessage( "dashboard.stockAlert.product.label" )}</th>
                                        <th style={stickyHeaderStyle}>{getFormattedMessage( "dashboard.stockAlert.warehouse.label" )}</th>
                                        <th style={stickyHeaderStyle}>{getFormattedMessage( "dashboard.stockAlert.quantity.label" )}</th>
                                        <th style={stickyHeaderStyle}>{getFormattedMessage( "dashboard.stockAlert.alertQuantity.label" )}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hasAlerts && alerts.map( ( alert, index ) => {
                                        return (
                                            <tr key={index}>
                                                <td className='py-2 text-nowrap'>{alert.code}</td>
                                                <td className='py-2'>
                                                    <span
                                                        className='d-inline-block text-truncate'
                                                        style={truncateStyle}
                                                        title={alert.name}
                                                    >
                                                        {alert.name}
                                                    </span>
                                                </td>
                                                <td className='py-2 text-nowrap'>{alert?.stock?.warehouse?.name || '-'}</td>
                                                <td className='py-2 text-nowrap'>
                                                    <div>
                                                        <div className='badge bg-light-info me-2'><span>{alert?.stock?.quantity ?? 0}</span></div>
                                                        <span className='badge bg-light-success me-2'><span>{alert?.stock?.product_unit_name || '-'}</span></span>
                                                    </div>
                                                </td>
                                                <td className='py-2 text-nowrap'><div><div className="badge bg-light-danger me-2">{alert.stock_alert ?? 0}</div>
                                                    <span className='badge bg-light-success me-2'><span>{alert?.stock?.product_unit_name || '-'}</span></span>

                                                </div></td>
                                            </tr>
                                        )
                                    } )}
                                    {!hasAlerts && (
                                        <tr>
                                            <td className='py-3 text-center text-muted' colSpan={5}>
                                                Sin alertas de existencias.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    const { stockAlertDetails } = state;
    return { stockAlertDetails }
};

export default connect( mapStateToProps, { fetchStockAlert } )( StockAlert );
