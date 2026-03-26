import { buildCartRowId } from "../../shared/batchHelpers";

export const createCartProductTemplate = (product) => {
    const productId = Number(product?.id || 0);
    const batchContext = product?.attributes?.batch_context || null;
    const fefoContext = product?.attributes?.fefo_context || null;
    const batchId = Number(batchContext?.id || 0) || null;
    const batchAvailableQuantity = Number(
        batchContext?.available_quantity || product?.attributes?.stock?.quantity || 0
    );

    return {
        name: product.attributes.name,
        code: product.attributes.code,
        stock_alert: product.attributes.stock_alert,
        stock_quantity: batchId
            ? batchAvailableQuantity
            : Number(product?.attributes?.stock?.quantity || 0),
        product_id: productId,
        product_cost: product.attributes.product_cost,
        net_unit_cost: product.attributes.product_price,
        tax_type: product.attributes.tax_type.value
            ? Number(product.attributes.tax_type.value)
            : product.attributes.tax_type,
        product_price: product.attributes.product_price,
        tax_amount: 0,
        discount_type: 1,
        discount_value: 0,
        discount_amount: 0,
        product_unit: product.attributes.product_unit,
        sale_unit: product.attributes.sale_unit,
        quantity: 1,
        sub_total: 0,
        id: productId,
        cart_row_id: buildCartRowId(productId, batchId),
        sale_id: 1,
        tax_value: product.attributes.order_tax,
        hold_item_id: "",
        warehouse_id: Number(product?.attributes?.stock?.warehouse_id || 0),
        batch_id: batchId,
        batch_code: batchContext?.lot_code || null,
        batch_barcode: batchContext?.lot_barcode || null,
        batch_expires_at: batchContext?.expires_at || null,
        batch_available_quantity: batchId ? batchAvailableQuantity : null,
        batch_status: product?.attributes?.batch_status || null,
        batch_enabled: Boolean(product?.attributes?.batch_enabled),
        batch_selection_mode: product?.attributes?.batch_selection_mode || "fefo",
        fefo_priority_batch_id: Number(fefoContext?.recommended_batch_id || batchId || 0) || null,
        fefo_priority_batch_code:
            fefoContext?.recommended_lot_code || batchContext?.lot_code || null,
        fefo_priority_expires_at:
            fefoContext?.recommended_expires_at || batchContext?.expires_at || null,
        fefo_compliant:
            typeof fefoContext?.compliant === "boolean"
                ? fefoContext.compliant
                : true,
        fefo_forced: Boolean(fefoContext?.forced),
    };
};

export const prepareCartArray = (products) =>
    products.map((product) => createCartProductTemplate(product));
