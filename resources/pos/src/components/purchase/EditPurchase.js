import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {useParams} from 'react-router-dom';
import HeaderTitle from '../header/HeaderTitle';
import MasterLayout from '../MasterLayout';
import PurchaseForm from './PurchaseForm';
import {fetchAllSuppliers} from '../../store/action/supplierAction';
import {fetchPurchase} from '../../store/action/purchaseAction';
import {editPrepareArray} from '../../shared/prepareArray/editPrepareArray';
import {getFormattedMessage, getFormattedOptions} from '../../shared/sharedMethod';
import Spinner from '../../shared/components/loaders/Spinner';
import TopProgressBar from '../../shared/components/loaders/TopProgressBar';
import {purchaseStatusOptions} from '../../constants';

const EditPurchase = (props) => {
    const {
        fetchPurchase,
        purchases,
        warehouses,
        fetchAllSuppliers,
        suppliers,
        fetchAllWarehouses,
        isLoading,
    } = props;
    const {id} = useParams();

    useEffect(() => {
        fetchAllWarehouses();
        fetchAllSuppliers();
        fetchPurchase(id);
    }, [fetchAllWarehouses, fetchAllSuppliers, fetchPurchase, id]);

    const purchaseData = useMemo(
        () =>
            purchases?.attributes ||
            purchases?.data?.attributes ||
            purchases?.data ||
            purchases ||
            null,
        [purchases]
    );

    const purchaseItemsRaw =
        purchaseData?.purchase_items?.data ||
        purchaseData?.purchase_items ||
        [];
    const purchaseItems = Array.isArray(purchaseItemsRaw) ? purchaseItemsRaw : [];

    const supplierId = purchaseData?.supplier_id;
    const warehouseId = purchaseData?.warehouse_id;
    const supplier = suppliers?.filter((item) => item.id === supplierId);
    const supplierName = supplier?.[0]?.attributes?.name;
    const warehouse = warehouses.filter((item) => item.id === warehouseId);
    const warehouseName = warehouse?.[0]?.attributes?.name;

    const preparedPurchaseItems = purchaseItems.map((item) => ({
        ...item,
        fix_net_unit: item.product_cost,
        stock_alert: item.product?.stock_alert,
        short_name: item.purchase_unit?.short_name || '',
        newItem: '',
        purchase_item_id: item.id,
        code: item.product?.code,
        name: item.product?.name,
    }));

    const statusFilterOptions = getFormattedOptions(purchaseStatusOptions);
    const statusDefaultValue =
        purchaseData?.status &&
        statusFilterOptions.filter((item) => item.id === purchaseData.status);
    const purchasesItemsId = preparedPurchaseItems.map((item) => item.id);

    const itemsValue = purchaseData && {
        date: purchaseData.date,
        warehouse_id: {
            value: purchaseData.warehouse_id,
            label: warehouseName,
        },
        supplier_id: {
            value: purchaseData.supplier_id,
            label: supplierName,
        },
        discount: purchaseData.discount,
        tax_rate: purchaseData.tax_rate,
        shipping: purchaseData.shipping,
        notes: purchaseData.notes,
        purchase_items: editPrepareArray(
            preparedPurchaseItems,
            purchaseData.warehouse_id
        ),
        newItem: '',
        purchase_item_id: purchasesItemsId[0] || '',
        id: purchases?.id || purchaseData?.id,
        status_id: {
            label: statusDefaultValue?.[0]?.name,
            value: statusDefaultValue?.[0]?.id,
        },
        tax_amount: purchaseData.tax_amount,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title={getFormattedMessage('purchase.edit.title')} to="/app/purchases" />
            {isLoading ? (
                <Spinner />
            ) : (
                <PurchaseForm
                    singlePurchase={itemsValue}
                    id={id}
                    warehouses={warehouses}
                    suppliers={suppliers}
                />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {warehouses, suppliers, isLoading} = state;
    return {
        purchases: (state.purchase && state.purchase.purchase) || null,
        warehouses,
        suppliers,
        isLoading,
    };
};

export default connect(mapStateToProps, {
    fetchPurchase,
    fetchAllSuppliers,
    fetchAllWarehouses,
})(EditPurchase);
