import { decoratePurchaseRow } from "../purchaseLineHelpers";

export const preparePurchaseProductArray = (products, isBarcode) => {
    let purchaseProductRowArray = [];
    products.forEach((product) => {
        const attributes = product.attributes || {};
        purchaseProductRowArray.push(
            decoratePurchaseRow(
                {
                    name: attributes.name,
                    code: attributes.code,
                    barcode_url: attributes.barcode_url,
                    stock: attributes.stock ? attributes.stock.quantity : "",
                    short_name: attributes.purchase_unit_name?.short_name,
                    product_unit: attributes.product_unit,
                    product_id: product.id,
                    product_cost: attributes.product_cost,
                    net_unit_cost: attributes.product_cost,
                    fix_net_unit: attributes.product_cost,
                    tax_type: attributes.tax_type ? attributes.tax_type : 1,
                    tax_value: attributes.order_tax ? attributes.order_tax : 0.0,
                    tax_amount: 0.0,
                    discount_type: "2",
                    discount_value: 0.0,
                    discount_amount: 0.0,
                    purchase_unit: attributes.purchase_unit,
                    quantity: isBarcode ? 10 : 1,
                    sub_total: 0.0,
                    id: product.id,
                    purchase_item_id: "",
                    product_price: attributes.product_price,
                },
                attributes
            )
        );
    });
    return purchaseProductRowArray;
};
