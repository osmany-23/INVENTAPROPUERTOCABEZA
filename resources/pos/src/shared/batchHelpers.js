export const BATCH_STATUS = {
    AVAILABLE: "available",
    EXPIRING: "expiring",
    EXPIRED: "expired",
    DEPLETED: "depleted",
};

export const getBatchStatusMeta = (status) => {
    switch (status) {
        case BATCH_STATUS.EXPIRED:
            return {
                label: "Vencido",
                tone: "danger",
                color: "#dc2626",
            };
        case BATCH_STATUS.EXPIRING:
            return {
                label: "Por vencer",
                tone: "warning",
                color: "#d97706",
            };
        case BATCH_STATUS.DEPLETED:
            return {
                label: "Agotado",
                tone: "muted",
                color: "#4b5563",
            };
        default:
            return {
                label: "Disponible",
                tone: "success",
                color: "#16a34a",
            };
    }
};

export const getCartProductId = (item) =>
    Number(item?.product_id ?? item?.id ?? 0);

export const buildCartRowId = (productId, batchId = null) =>
    batchId
        ? `product-${Number(productId)}-batch-${Number(batchId)}`
        : `product-${Number(productId)}`;

export const getCartRowId = (item) =>
    String(
        item?.cart_row_id ??
            buildCartRowId(getCartProductId(item), item?.batch_id ?? null)
    );

const FEFO_EMPTY_EXPIRY_TIME = Number.MAX_SAFE_INTEGER;

export const getBatchExpiryTimestamp = (batch) => {
    if (!batch?.expires_at) {
        return FEFO_EMPTY_EXPIRY_TIME;
    }

    const parsedTime = new Date(batch.expires_at).getTime();
    return Number.isFinite(parsedTime) ? parsedTime : FEFO_EMPTY_EXPIRY_TIME;
};

export const sortBatchesByFefo = (batches = []) =>
    [...batches].sort((leftBatch, rightBatch) => {
        const leftExpiry = getBatchExpiryTimestamp(leftBatch);
        const rightExpiry = getBatchExpiryTimestamp(rightBatch);

        if (leftExpiry !== rightExpiry) {
            return leftExpiry - rightExpiry;
        }

        const leftReceived = leftBatch?.received_at
            ? new Date(leftBatch.received_at).getTime()
            : FEFO_EMPTY_EXPIRY_TIME;
        const rightReceived = rightBatch?.received_at
            ? new Date(rightBatch.received_at).getTime()
            : FEFO_EMPTY_EXPIRY_TIME;

        if (leftReceived !== rightReceived) {
            return leftReceived - rightReceived;
        }

        return Number(leftBatch?.id || 0) - Number(rightBatch?.id || 0);
    });
