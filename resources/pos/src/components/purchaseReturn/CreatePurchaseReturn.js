import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchPurchase} from '../../store/action/purchaseAction';
import PurchaseReturnForm from './PurchaseReturnForm';
import {addPurchaseReturn} from '../../store/action/purchaseReturnAction';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreatePurchaseReturn = (props) => {
    const {
        addPurchaseReturn,
        warehouses,
        fetchAllWarehouses,
        fetchAllSuppliers,
        suppliers,
        fetchPurchase,
        purchase,
        isLoading,
    } = props;
    const {id} = useParams();
    const navigate = useNavigate();
    const [hasRequestedPurchase, setHasRequestedPurchase] = useState(false);

    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();
    }, [fetchAllWarehouses, fetchAllSuppliers]);

    useEffect(() => {
        if (id) {
            setHasRequestedPurchase(true);
            fetchPurchase(id);
        }
    }, [id, fetchPurchase]);

    const addPurchaseReturnData = (formValue) => {
        addPurchaseReturn(formValue, navigate);
    };

    const purchaseData = useMemo(
        () =>
            purchase?.attributes ||
            purchase?.data?.attributes ||
            purchase?.data ||
            purchase ||
            null,
        [purchase]
    );

    if (id && hasRequestedPurchase && isLoading && !purchaseData) {
        return (
            <MasterLayout>
                <HeaderTitle
                    title={getFormattedMessage('purchase.return.create.title')}
                    to="/app/purchase-return"
                />
                <div style={{padding: 20}}>Cargando compra...</div>
            </MasterLayout>
        );
    }

    const purchaseItemsRaw =
        purchaseData?.purchase_items?.data ||
        purchaseData?.purchase_items ||
        [];
    const purchaseItems = Array.isArray(purchaseItemsRaw) ? purchaseItemsRaw : [];

    const singlePurchaseData = {
        purchase_id: purchaseData?.id || purchase?.id || null,
        date: purchaseData?.date || new Date(),
        warehouse_id: purchaseData?.warehouse_id
            ? {
                  value: purchaseData.warehouse_id,
                  label:
                      (warehouses.find((w) => w.id === purchaseData.warehouse_id)
                          ?.attributes?.name) || '',
              }
            : '',
        supplier_id: purchaseData?.supplier_id
            ? {
                  value: purchaseData.supplier_id,
                  label:
                      (suppliers.find((s) => s.id === purchaseData.supplier_id)
                          ?.attributes?.name) || '',
              }
            : '',
        discount: purchaseData?.discount || '0.00',
        orderTax: purchaseData?.tax_rate || '0.00',
        tax_amount: purchaseData?.tax_amount || '0.00',
        shipping: purchaseData?.shipping || '0.00',
        notes: purchaseData?.notes || '',
        purchase_return_items: purchaseItems.map((item) => ({
            name: item.product?.name,
            code: item.product?.code,
            product_unit: item.product?.product_unit,
            product_id: item.product_id,
            short_name: item.purchase_unit?.short_name,
            stock_alert: item.product?.stock_alert,
            product_cost: item.product_cost,
            fix_net_unit: item.product_cost,
            net_unit_cost: item.product_cost,
            tax_type: item.tax_type,
            tax_value: item.tax_value,
            tax_amount: item.tax_amount,
            discount_type: item.discount_type,
            discount_value: item.discount_value,
            discount_amount: item.discount_amount,
            purchase_unit: item.purchase_unit?.id || item.purchase_unit,
            quantity: item.quantity,
            purchased_quantity: Number(item.quantity || 0),
            max_return_quantity: Number(item.max_return_quantity ?? item.quantity ?? 0),
            returned_quantity: Number(item.returned_quantity || 0),
            sub_total: Number(item.sub_total),
            id: item.id,
            purchase_return_item_id: item.id,
            newItem: '',
            isEdit: true,
            stocks:
                item.product?.stocks?.filter(
                    (s) => s.warehouse_id === purchaseData?.warehouse_id
                ) || [],
        })),
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage('purchase.return.create.title')}
                to="/app/purchase-return"
            />
            <PurchaseReturnForm
                addPurchaseReturnData={addPurchaseReturnData}
                warehouses={warehouses}
                suppliers={suppliers}
                singlePurchase={singlePurchaseData}
                isEditMode={false}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => ({
    warehouses: state.warehouses,
    suppliers: state.suppliers,
    purchase: state.purchase.purchase,
    isLoading: state.isLoading,
});

export default connect(mapStateToProps, {
    addPurchaseReturn,
    fetchAllWarehouses,
    fetchAllSuppliers,
    fetchPurchase,
})(CreatePurchaseReturn);
