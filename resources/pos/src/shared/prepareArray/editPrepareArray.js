import { decoratePurchaseRow } from "../purchaseLineHelpers";

export const editPrepareArray = (products, warehouse_id) => {
    let purchaseProductRowArray = [];
    products.forEach((product) => {
        const purchaseLots = Array.isArray(product.purchaseLots)
            ? product.purchaseLots
            : Array.isArray(product.purchase_lots)
              ? product.purchase_lots
              : [];
        const firstPurchaseLot = purchaseLots[0] || null;
        const batch =
            firstPurchaseLot?.batch ||
            product.batch_reference ||
            null;
        const purchaseLotSalePrice =
            firstPurchaseLot &&
            Object.prototype.hasOwnProperty.call(firstPurchaseLot, "precio_venta")
                ? firstPurchaseLot.precio_venta
                : undefined;
        purchaseProductRowArray.push(
            decoratePurchaseRow(
                {
                    name: product.name,
                    code: product.product.code,
                    product_unit: product.product.product_unit,
                    product_id: product.product_id,
                    short_name: product.purchase_unit.short_name,
                    stock_alert: product.product.stock_alert,
                    product_cost: firstPurchaseLot?.costo_unitario ?? product.product_cost,
                    product_price:
                        purchaseLotSalePrice !== undefined
                            ? purchaseLotSalePrice
                            : product.product?.product_price,
                    fix_net_unit: firstPurchaseLot?.costo_unitario ?? product.product_cost,
                    net_unit_cost: product.product_cost,
                    tax_type: product.tax_type,
                    tax_value: product.tax_value,
                    tax_amount: product.tax_amount,
                    discount_type: product.discount_type,
                    discount_value: product.discount_value,
                    discount_amount: product.discount_amount,
                    purchase_unit: product.purchase_unit.id,
                    quantity: firstPurchaseLot?.cantidad ?? product.quantity,
                    sub_total: Number(product.sub_total),
                    id: product.id,
                    purchase_item_id: product.id,
                    newItem: "",
                    isEdit: true,
                    stocks: product.product.stocks.filter(
                        (item) => item.warehouse_id === warehouse_id
                    ),
                    is_batch_purchase_line: purchaseLots.length > 0,
                    is_batch_purchase_locked: purchaseLots.length > 0,
                    purchase_lots: purchaseLots,
                    purchase_lot_id: firstPurchaseLot?.id || null,
                    product_batch_id: batch?.id || firstPurchaseLot?.lote_id || null,
                    codigo_lote_sistema: batch?.codigo_lote_sistema || "",
                    lote_fabricante: batch?.lote_fabricante || batch?.lot_code || "",
                    lot_barcode: batch?.lot_barcode || "",
                    ubicacion: batch?.ubicacion || "",
                    descripcion: batch?.descripcion || batch?.note || "",
                    fecha_fabricacion: batch?.fecha_fabricacion || "",
                    fecha_vencimiento:
                        batch?.fecha_vencimiento || batch?.expires_at || "",
                    impuesto_tipo: batch?.impuesto_tipo || "EXCLUSIVO",
                    impuesto_valor:
                        batch?.impuesto_valor === null ||
                        batch?.impuesto_valor === undefined
                            ? product.tax_value
                            : batch.impuesto_valor,
                    batch,
                },
                product.product || {}
            )
        );
    });
    return purchaseProductRowArray;
};
