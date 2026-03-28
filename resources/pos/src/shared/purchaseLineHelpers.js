const PURCHASE_PRODUCT_KIND = {
    NORMAL: "NORMAL",
    VARIANT: "VARIANT",
    BATCH: "BATCH",
};

const toNumber = (value, fallback = 0) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
};

const todayString = () => new Date().toISOString().slice(0, 10);

export const createPurchaseRowId = (productId, prefix = "line") =>
    `${prefix}-${Number(productId || 0)}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

export const resolveBatchTaxTypeLabel = (value) =>
    String(value).toUpperCase() === "INCLUSIVO" || Number(value) === 2
        ? "INCLUSIVO"
        : "EXCLUSIVO";

export const resolveBatchTaxTypeValue = (value) =>
    resolveBatchTaxTypeLabel(value) === "INCLUSIVO" ? 2 : 1;

export const resolvePurchaseProductKind = (attributes = {}, row = {}) => {
    const mainProductType = Number(
        row.main_product_type ??
            row.product_type ??
            attributes.main_product_type ??
            attributes.product_type ??
            1
    );
    const batchEnabled = Boolean(
        row.is_batch_purchase_line ??
            row.is_batch_product ??
            row.batch_enabled ??
            attributes.is_batch_product ??
            attributes.batch_enabled
    );
    const variantProduct =
        row.variation_product ||
        row.variation_type_name ||
        attributes.variation_product ||
        null;

    if (batchEnabled || mainProductType === 3) {
        return PURCHASE_PRODUCT_KIND.BATCH;
    }

    if (variantProduct || mainProductType === 2) {
        return PURCHASE_PRODUCT_KIND.VARIANT;
    }

    return PURCHASE_PRODUCT_KIND.NORMAL;
};

export const decoratePurchaseRow = (row = {}, attributes = {}, options = {}) => {
    const productKind = resolvePurchaseProductKind(attributes, row);
    const isBatchLine =
        options.forceBatch === true ||
        row.is_batch_purchase_line === true ||
        productKind === PURCHASE_PRODUCT_KIND.BATCH;
    const rowPrefix = isBatchLine ? "batch" : "line";
    const rowId =
        options.rowId ||
        row.row_id ||
        (row.purchase_item_id
            ? `${rowPrefix}-purchase-item-${Number(row.purchase_item_id)}`
            : createPurchaseRowId(row.product_id ?? row.id, rowPrefix));
    const variationProduct = row.variation_product || attributes.variation_product || null;
    const variationTypeName =
        row.variation_type_name ||
        variationProduct?.variation_type_name ||
        variationProduct?.name ||
        "";
    const productCost = toNumber(
        row.product_cost ?? row.net_unit_cost ?? attributes.product_cost,
        0
    );
    const productPrice = toNumber(row.product_price ?? attributes.product_price, 0);
    const quantity = toNumber(row.quantity, 1);
    const taxType = resolveBatchTaxTypeValue(row.tax_type ?? attributes.tax_type);
    const taxValue = toNumber(
        row.tax_value ?? row.impuesto_valor ?? attributes.order_tax,
        0
    );

    const baseRow = {
        ...row,
        row_id: rowId,
        product_kind: productKind,
        main_product_type: Number(
            row.main_product_type ??
                row.product_type ??
                attributes.main_product_type ??
                attributes.product_type ??
                1
        ),
        is_batch_product: isBatchLine,
        is_variant_product:
            productKind === PURCHASE_PRODUCT_KIND.VARIANT ||
            Boolean(variationProduct),
        variation_product: variationProduct,
        variation_type_name: variationTypeName,
        product_cost: productCost,
        net_unit_cost: row.net_unit_cost ?? productCost,
        fix_net_unit: row.fix_net_unit ?? productCost,
        product_price: row.product_price ?? productPrice,
        quantity,
        tax_type: row.tax_type ?? taxType,
        tax_value: row.tax_value ?? taxValue,
        discount_type: row.discount_type ?? "2",
        discount_value: row.discount_value ?? 0,
        discount_amount: row.discount_amount ?? 0,
        tax_amount: row.tax_amount ?? 0,
        sub_total: row.sub_total ?? 0,
    };

    if (!isBatchLine) {
        return baseRow;
    }

    return {
        ...baseRow,
        is_batch_purchase_line: true,
        is_batch_purchase_locked: Boolean(row.is_batch_purchase_locked),
        batch_form_confirmed:
            row.batch_form_confirmed ??
            Boolean(row.is_batch_purchase_locked),
        batch_form_collapsed:
            row.batch_form_collapsed ??
            Boolean(row.is_batch_purchase_locked),
        codigo_lote_sistema:
            row.codigo_lote_sistema || row.batch?.codigo_lote_sistema || "",
        codigo_lote_sistema_preview:
            row.codigo_lote_sistema_preview || "Autogenerado al guardar",
        lote_fabricante:
            row.lote_fabricante || row.batch?.lote_fabricante || row.lot_code || "",
        lot_barcode:
            row.lot_barcode ||
            row.codigo_barra_lote ||
            row.batch?.lot_barcode ||
            "",
        codigo_barra_lote:
            row.codigo_barra_lote ||
            row.lot_barcode ||
            row.batch?.lot_barcode ||
            "",
        ubicacion: row.ubicacion || row.batch?.ubicacion || "",
        fecha_fabricacion:
            row.fecha_fabricacion || row.batch?.fecha_fabricacion || "",
        fecha_vencimiento:
            row.fecha_vencimiento ||
            row.batch?.fecha_vencimiento ||
            row.batch?.expires_at ||
            "",
        impuesto_tipo: row.impuesto_tipo || resolveBatchTaxTypeLabel(row.tax_type ?? taxType),
        impuesto_valor:
            row.impuesto_valor === undefined || row.impuesto_valor === null
                ? taxValue
                : row.impuesto_valor,
        descripcion: row.descripcion || row.batch?.descripcion || "",
        received_at: row.received_at || todayString(),
        purchase_lot_id:
            row.purchase_lot_id ||
            row.purchaseLot?.id ||
            row.purchase_lots?.[0]?.id ||
            null,
        product_batch_id:
            row.product_batch_id ||
            row.batch?.id ||
            row.purchase_lots?.[0]?.lote_id ||
            null,
    };
};

export { PURCHASE_PRODUCT_KIND };
