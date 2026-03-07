import React from "react";
import { Image } from "react-bootstrap-v5";
import {
    currencySymbolHandling,
    getFormattedMessage,
} from "../../shared/sharedMethod";

class PrintButton extends React.PureComponent {
    render() {
        const print = this.props.updateProducts;
        const paperSize = print.paperSize;
        const frontSetting = this.props.frontSetting;
        const allConfigData = this.props.allConfigData;
        const barcodeOptions = this.props.barcodeOptions;

        const companyName = frontSetting?.value?.company_name;
        const currencySymbol =
            frontSetting &&
            frontSetting.value &&
            frontSetting.value.currency_symbol;

        function printFunction(product, index) {
            let indents = [];
            for (let i = 0; i < product.quantity; i++) {
                indents.push(
                    <div
                        key={i}
                        className={`${
                            paperSize.value === 1
                                ? "print-main__print1"
                                : "" || paperSize.value === 2
                                ? "print-main__print2"
                                : "" || paperSize.value === 3
                                ? "print-main__print3"
                                : "" ||
                                  paperSize.value === 4 ||
                                  paperSize.value === 6
                                ? "print-main__print4"
                                : "" || paperSize.value === 5
                                ? "print-main__print5"
                                : "" || paperSize.value === 7
                                ? "print-main__print7"
                                : "" || paperSize.value === 8
                                ? "print-main__print8"
                                : ""
                        } barcode-main__barcode-item barcode-main__barcode-style`}
                    >
                        <div className="fw-bolder lh-1 barcode-main__text barcode-main__text--company">
                            {barcodeOptions.companyName && companyName}
                        </div>
                        {barcodeOptions.productName ? (
                            <div className="text-capitalize barcode-main__text barcode-main__text--name">
                                {product.name}
                            </div>
                        ) : null}
                        {barcodeOptions?.price && (
                            <div className="text-capitalize barcode-main__text barcode-main__text--price">
                                <span className="fw-bolder">
                                    {getFormattedMessage(
                                        "product.table.price.column.label"
                                    )}
                                    :
                                </span>{" "}
                                {currencySymbolHandling(
                                    allConfigData,
                                    currencySymbol,
                                    product.product_price
                                )}
                            </div>
                        )}
                        <Image
                            src={product && product.barcode_url}
                            alt={product?.code ? `Barcode ${product.code}` : "Barcode"}
                            className="barcode-main__barcode-image"
                        />
                        <div className="fw-bolder barcode-main__text barcode-main__text--code">
                            {product && product.code}
                        </div>
                    </div>
                );
            }
            return indents;
        }

        return (
            <div className="p-4">
                {print.products &&
                    print.products.map((product, index) => {
                        return printFunction(product, index);
                    })}
            </div>
        );
    }
}

export default PrintButton;
