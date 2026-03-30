import React, { useEffect, useMemo, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import {
    taxAmountMultiply,
    discountAmountMultiply,
    subTotalCount,
    amountBeforeTax,
} from "../../calculation/calculation";
import ProductModal from "./ProductModal";
import { productSalesDropdown } from "../../../store/action/productSaleUnitAction";
import {
    currencySymbolHandling,
    decimalValidate,
    formatQuantityAuto,
    getFormattedMessage,
} from "../../sharedMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

const resolveRowKey = (item) => {
    if (item?.row_id) {
        return String(item.row_id);
    }

    if (item?.cart_row_id) {
        return String(item.cart_row_id);
    }

    if (item?.quotation_item_id) {
        return `quotation-${item.quotation_item_id}`;
    }

    if (item?.sale_item_id) {
        return `sale-${item.sale_item_id}`;
    }

    return String(item?.id ?? "");
};

const resolveBatchCode = (item) =>
    item?.lote_codigo ||
    item?.codigo_lote_sistema ||
    item?.lot_code ||
    item?.batch_code ||
    item?.lote_fabricante ||
    null;

const resolveBatchStock = (item) =>
    Number(
        item?.batch_stock_quantity ??
            item?.stock_lote ??
            item?.batch_available_quantity ??
            0
    );

const resolveQuantityLimit = (item) => {
    const batchStock = resolveBatchStock(item);
    const quantityLimit = Number(item?.quantity_limit || 0);

    if (batchStock > 0 && quantityLimit > 0) {
        return Math.min(batchStock, quantityLimit);
    }

    if (batchStock > 0) {
        return batchStock;
    }

    return quantityLimit > 0 ? quantityLimit : null;
};

const ProductTableBody = (props) => {
    const {
        singleProduct,
        index,
        updateProducts,
        setUpdateProducts,
        productSales,
        productSalesDropdown,
        updateCost,
        updateDiscount,
        updateTax,
        updateSubTotal,
        updateSaleUnit,
        frontSetting,
        allConfigData,
    } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const [updateProductData, setUpdateProductData] = useState([]);
    const dispatch = useDispatch();

    const rowKey = useMemo(() => resolveRowKey(singleProduct), [singleProduct]);
    const batchCode = useMemo(() => resolveBatchCode(singleProduct), [singleProduct]);
    const batchStock = useMemo(() => resolveBatchStock(singleProduct), [singleProduct]);
    const maxQuantity = useMemo(
        () => resolveQuantityLimit(singleProduct),
        [singleProduct]
    );
    const isBatchLine = useMemo(
        () =>
            Boolean(
                batchCode ||
                    Number(
                        singleProduct?.product_batch_id || singleProduct?.batch_id || 0
                    )
            ),
        [batchCode, singleProduct]
    );

    useEffect(() => {
        singleProduct.newItem !== "" &&
            productSalesDropdown(singleProduct.product_unit);
    }, [productSalesDropdown, singleProduct.product_unit, singleProduct.newItem, updateProductData]);

    useEffect(() => {
        singleProduct.sub_total = Number(subTotalCount(singleProduct));
    }, [singleProduct]);

    const onProductUpdateInCart = (item) => {
        setUpdateProductData(item);
    };

    const showStockLimitError = (message) => {
        dispatch(
            addToast({
                text: message,
                type: toastType.ERROR,
            })
        );
    };

    const onDeleteCartItem = (targetRowKey) => {
        const newProduct = updateProducts.filter(
            (item) => resolveRowKey(item) !== targetRowKey
        );
        setUpdateProducts(newProduct);
    };

    const handleIncrement = () => {
        singleProduct.isSaleReturn || singleProduct.isSaleReturnEdit
            ? setUpdateProducts((currentProducts) =>
                  currentProducts.map((item) => {
                      if (resolveRowKey(item) === rowKey) {
                          if (item.quantity >= item.sold_quantity) {
                              showStockLimitError(
                                  getFormattedMessage(
                                      "sale-return.product-qty.validate.message"
                                  )
                              );
                              return item;
                          }

                          return { ...item, quantity: Number(item.quantity || 0) + 1 };
                      }

                      return item;
                  })
              )
            : setUpdateProducts((currentProducts) =>
                  currentProducts.map((item) => {
                      if (resolveRowKey(item) !== rowKey) {
                          return item;
                      }

                      const newQuantity = Number(item.quantity || 0) + 1;
                      const itemMaxQuantity = resolveQuantityLimit(item);
                      const itemBatchStock = resolveBatchStock(item);
                      const isExpiredBatch = item?.batch_status === "expired";

                      if (isExpiredBatch) {
                          showStockLimitError("Este lote está vencido");
                          return item;
                      }

                      if (
                          Number(item?.product_batch_id || item?.batch_id || 0) > 0 &&
                          itemBatchStock <= 0
                      ) {
                          showStockLimitError("Stock insuficiente en este lote");
                          return item;
                      }

                      if (itemMaxQuantity && newQuantity > itemMaxQuantity) {
                          showStockLimitError(
                              isBatchLine
                                  ? "Stock insuficiente en este lote"
                                  : getFormattedMessage(
                                        "sale.product-qty.limit.validate.message"
                                    )
                          );
                          return item;
                      }

                      return { ...item, quantity: newQuantity };
                  })
              );
    };

    const handleDecrement = () => {
        if (singleProduct.quantity - 1 > 0) {
            setUpdateProducts((currentProducts) =>
                currentProducts.map((item) =>
                    resolveRowKey(item) === rowKey
                        ? { ...item, quantity: Number(item.quantity || 0) - 1 }
                        : item
                )
            );
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;

        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }

        const nextValue = Number(value);

        singleProduct.isSaleReturn || singleProduct.isSaleReturnEdit
            ? setUpdateProducts((currentProducts) =>
                  currentProducts.map((item) => {
                      if (resolveRowKey(item) !== rowKey) {
                          return item;
                      }

                      if (item.sold_quantity < nextValue) {
                          showStockLimitError(
                              getFormattedMessage(
                                  "sale-return.product-qty.validate.message"
                              )
                          );
                          return { ...item, quantity: item.sold_quantity };
                      }

                      return { ...item, quantity: nextValue };
                  })
              )
            : setUpdateProducts((currentProducts) =>
                  currentProducts.map((item) => {
                      if (resolveRowKey(item) !== rowKey) {
                          return item;
                      }

                      if (item?.batch_status === "expired") {
                          showStockLimitError("Este lote está vencido");
                          return item;
                      }

                      if (
                          Number(item?.product_batch_id || item?.batch_id || 0) > 0 &&
                          resolveBatchStock(item) <= 0
                      ) {
                          showStockLimitError("Stock insuficiente en este lote");
                          return item;
                      }

                      const itemMaxQuantity = resolveQuantityLimit(item);
                      if (itemMaxQuantity && nextValue > itemMaxQuantity) {
                          showStockLimitError(
                              isBatchLine
                                  ? "Stock insuficiente en este lote"
                                  : getFormattedMessage(
                                        "sale.product-qty.limit.validate.message"
                                    )
                          );
                          return { ...item, quantity: itemMaxQuantity };
                      }

                      return { ...item, quantity: nextValue };
                  })
              );
    };

    const onClickShowProductModal = () => {
        setIsShowModal(true);
        productSalesDropdown(singleProduct.product_unit);
    };

    const renderStockCell = () => {
        if (isBatchLine) {
            return (
                <span className="badge bg-light-warning">
                    <span>
                        {formatQuantityAuto(batchStock)}&nbsp;
                        {singleProduct?.short_name}
                    </span>
                </span>
            );
        }

        if (singleProduct.isEdit) {
            return singleProduct.stock.length >= 1 ? (
                singleProduct.stock.map((item) => {
                    return (
                        <span
                            key={`${singleProduct.id}-${item.id ?? item.warehouse_id ?? item.quantity}`}
                            className="badge bg-light-warning"
                        >
                            <span>
                                {formatQuantityAuto(item.quantity)}&nbsp;
                                {singleProduct?.short_name}
                            </span>
                        </span>
                    );
                })
            ) : singleProduct.stock === "" ? (
                <span className="badge bg-light-warning">
                    <span>
                        {formatQuantityAuto(singleProduct.sold_quantity)}&nbsp;
                        {singleProduct?.short_name}
                    </span>
                </span>
            ) : null;
        }

        return singleProduct.stock >= 0 ? (
            <span className="badge bg-light-warning">
                <span>
                    {formatQuantityAuto(singleProduct.stock)}&nbsp;
                    {singleProduct?.short_name}
                </span>
            </span>
        ) : null;
    };

    return (
        <>
            <tr key={rowKey || index} className="align-middle text-nowrap">
                <td>
                    <h4 className="product-name">{singleProduct.code}</h4>
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success">
                            <span>{singleProduct.name}</span>
                        </span>
                        {singleProduct.isSaleReturn === true ||
                        singleProduct.isSaleReturnEdit === true ? null : (
                            <span className="badge bg-light-primary p-1 ms-1">
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    onClick={(e) => onClickShowProductModal(e)}
                                    style={{ cursor: "pointer" }}
                                />
                            </span>
                        )}
                    </div>
                    {isBatchLine ? (
                        <div className="d-flex flex-wrap gap-1 mt-2">
                            {batchCode ? (
                                <span className="badge bg-light-primary">
                                    <span>Lote: {batchCode}</span>
                                </span>
                            ) : null}
                            <span className="badge bg-light-warning">
                                <span>Stock lote: {formatQuantityAuto(batchStock)}</span>
                            </span>
                        </div>
                    ) : null}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        amountBeforeTax(singleProduct)
                    )}
                </td>
                <td>{renderStockCell()}</td>
                <td>
                    <div className="custom-qty">
                        <InputGroup className="flex-nowrap">
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 px-4 pt-2"
                                onClick={handleDecrement}
                            >
                                -
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Product Quantity"
                                onKeyPress={(event) => decimalValidate(event)}
                                className="text-center px-0 py-2 rounded-0 hide-arrow"
                                value={singleProduct.quantity}
                                type="number"
                                step={0.01}
                                min={0.0}
                                onChange={handleChange}
                            />
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 px-4 pt-2"
                                onClick={handleIncrement}
                            >
                                +
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        discountAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        taxAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        subTotalCount(singleProduct)
                    )}
                </td>
                {singleProduct.isSaleReturn ||
                singleProduct.isSaleReturnEdit ? null : (
                    <td className="text-start">
                        <button className="btn px-2 text-danger fs-3">
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => onDeleteCartItem(rowKey)}
                            />
                        </button>
                    </td>
                )}
            </tr>
            {isShowModal && (
                <ProductModal
                    product={singleProduct}
                    isShowModal={isShowModal}
                    frontSetting={frontSetting}
                    updateSubTotal={updateSubTotal}
                    setIsShowModal={setIsShowModal}
                    updateCost={updateCost}
                    updateDiscount={updateDiscount}
                    updateTax={updateTax}
                    productSales={productSales}
                    updateSaleUnit={updateSaleUnit}
                    onProductUpdateInCart={onProductUpdateInCart}
                />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    const { productSales, allConfigData } = state;
    return { productSales, allConfigData };
};

export default connect(mapStateToProps, { productSalesDropdown })(
    ProductTableBody
);
