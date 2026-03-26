
export const editPurchaseReturnArray = (products, warehouse_id) => {
    let purchaseProductRowArray = [];
    products.forEach(product => {
        const batch = product.batch || product.purchase_lot?.batch || null;
        purchaseProductRowArray.push({
            name: product.name,
            code: product.product.code,
            product_unit: product.product.product_unit,
            product_id: product.product_id,
            short_name: product.purchase_unit.short_name,
            stock_alert: product.product.stock_alert,
            product_cost: product.product_cost,
            fix_net_unit : product.product_cost,
            net_unit_cost: product.product_cost,
            tax_type: product.tax_type,
            tax_value: product.tax_value,
            tax_amount: product.tax_amount,
            discount_type: product.discount_type,
            discount_value: product.discount_value,
            discount_amount: product.discount_amount,
            purchase_unit:product.purchase_unit.id,
            quantity: product.quantity,
            sub_total: Number(product.sub_total),
            id: product.id,
            purchase_return_item_id: product.id,
            purchase_lot_id: product.purchase_lot_id || product.purchase_lot?.id || null,
            product_batch_id: product.product_batch_id || batch?.id || null,
            codigo_lote_sistema: product.codigo_lote_sistema || batch?.codigo_lote_sistema || null,
            lote_fabricante: product.lote_fabricante || batch?.lote_fabricante || batch?.lot_code || null,
            max_return_quantity: Number(product.max_return_quantity ?? product.quantity ?? 0),
            returned_quantity: Number(product.returned_quantity ?? 0),
            newItem: '',
            isEdit: true,
            stocks: product.product.stocks.filter(item => item.warehouse_id === warehouse_id)
        })
    });
    return purchaseProductRowArray;
};
