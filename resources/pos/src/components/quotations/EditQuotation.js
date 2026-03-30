import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuotationForm from './QuotationForm';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { fetchAllCustomer } from '../../store/action/customerAction';
import { fetchAllWarehouses } from '../../store/action/warehouseAction';
import Spinner from "../../shared/components/loaders/Spinner";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchQuotation, editQuotation } from '../../store/action/quotationAction';
import { getFormattedMessage, getFormattedOptions } from '../../shared/sharedMethod';
import { quotationStatusOptions } from '../../constants';
import { buildCartRowId } from '../../shared/batchHelpers';

const EditQuotation = ( props ) => {
    const { fetchQuotation, quotations, customers, fetchAllCustomer, warehouses, fetchAllWarehouses, isLoading } = props;
    const { id } = useParams();

    useEffect( () => {
        fetchAllCustomer();
        fetchAllWarehouses();
        fetchQuotation( id );
    }, [] );

    const quotationStatusFilterOptions = getFormattedOptions( quotationStatusOptions )
    const quotationStatusDefaultValue = quotations && quotations.attributes && quotations.attributes.status && quotationStatusFilterOptions.filter( ( item ) => item.id === quotations.attributes.status )

    const itemsValue = quotations && quotations.attributes && {
        date: quotations.attributes.date,
        warehouse_id: {
            value: quotations.attributes.warehouse_id,
            label: quotations.attributes.warehouse_name,
        },
        customer_id: {
            value: quotations.attributes.customer_id,
            label: quotations.attributes.customer_name,
        },
        tax_rate: quotations.attributes.tax_rate,
        tax_amount: quotations.attributes.tax_amount,
        discount: quotations.attributes.discount,
        shipping: quotations.attributes.shipping,
        grand_total: quotations.attributes.grand_total,
        amount: quotations.attributes.amount,
        quotation_items: quotations.attributes.quotation_items.map( ( item ) => {
            const batch = item.product_batch || null;
            const batchId = item.product_batch_id || batch?.id || null;
            const batchCode =
                batch?.codigo_lote_sistema ||
                batch?.lot_code ||
                batch?.lote_fabricante ||
                null;
            const batchStock = Number( batch?.available_quantity || 0 );

            return {
                code: item.product && item.product.code,
                name: item.product && item.product.name,
                product_unit: item.product.product_unit,
                product_id: item.product_id,
                short_name: item.sale_unit && item.sale_unit.short_name && item.sale_unit.short_name,
                stock_alert: item.product && item.product.stock_alert,
                product_price: item.product_price,
                fix_net_unit: item.product_price,
                net_unit_price: item.product_price,
                tax_type: item.tax_type,
                tax_value: item.tax_value,
                tax_amount: item.tax_amount,
                discount_type: item.discount_type,
                discount_value: item.discount_value,
                discount_amount: item.discount_amount,
                isEdit: true,
                stock: item.product && item.product.stocks.filter( stockItem => stockItem.warehouse_id === quotations.attributes.warehouse_id ),
                sub_total: item.sub_total,
                sale_unit: item.sale_unit && item.sale_unit.id && item.sale_unit.id,
                quantity: item.quantity,
                id: item.id,
                quotation_item_id: item.id,
                row_id: batchId ? buildCartRowId( item.product_id, batchId ) : `quotation-item-${item.id}`,
                cart_row_id: batchId ? buildCartRowId( item.product_id, batchId ) : `quotation-item-${item.id}`,
                product_batch_id: batchId,
                batch_id: batchId,
                lote_id: batchId,
                lote_codigo: batchCode,
                codigo_lote_sistema: batch?.codigo_lote_sistema || null,
                lote_fabricante: batch?.lote_fabricante || null,
                lot_code: batch?.lot_code || null,
                batch_code: batchCode,
                stock_lote: batchStock,
                batch_stock_quantity: batchStock,
                batch_available_quantity: batchStock,
                batch_status: batch?.status || null,
                batch_status_label: batch?.status_label || null,
                batch_expires_at: batch?.expires_at || null,
                batch_received_at: batch?.received_at || null,
                batch_enabled: Boolean( batchId ),
                is_batch_product: Boolean( batchId ),
                quantity_limit: batchId ? batchStock : item.product?.quantity_limit,
                newItem: '',
            };
        } ),
        id: quotations.id,
        notes: quotations.attributes.note,
        status_id: {
            label: quotationStatusDefaultValue && quotationStatusDefaultValue[ 0 ] && quotationStatusDefaultValue[ 0 ].name,
            value: quotationStatusDefaultValue && quotationStatusDefaultValue[ 0 ] && quotationStatusDefaultValue[ 0 ].id
        }
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title={getFormattedMessage( 'edit-quotation.title' )} to='/app/quotations' />
            {isLoading ? <Spinner /> :
                <QuotationForm singleQuotation={itemsValue} id={id} customers={customers} warehouses={warehouses} />}
        </MasterLayout>
    )
};

const mapStateToProps = ( state ) => {
    const { customers, warehouses, isLoading, quotations } = state;
    return { customers, warehouses, isLoading, quotations }
};

export default connect( mapStateToProps, { fetchQuotation, editQuotation, fetchAllCustomer, fetchAllWarehouses } )( EditQuotation );
