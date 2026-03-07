import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Table } from 'react-bootstrap-v5';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import MasterLayout from '../MasterLayout';
import TabTitle from '../../shared/tab-title/TabTitle';
import { getFormattedMessage, placeholderText } from '../../shared/sharedMethod';
import ReactSelect from '../../shared/select/reactSelect';
import { fetchAllWarehouses } from '../../store/action/warehouseAction';
import PrintTable from './PrintTable';
import paperSize from '../../shared/option-lists/paperSize.json'
import { toastType } from '../../constants';
import { addToast } from '../../store/action/toastAction';
import BarcodeShow from './BarcodeShow';
import PrintButton from './PrintButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faWallet, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from "../../shared/components/product-cart/search/ProductSearch";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";

const PrintBarcode = () => {
    const { warehouses, frontSetting, allConfigData } = useSelector( state => state )
    const [ printBarcodeValue, setPrintBarcodeValue ] = useState( {
        warehouse_id: '',
        paperSizeValue: ''
    } );

    const printBarcodeQuantity = useSelector( ( state ) => state.printQuantity )
    const [ updateProducts, setUpdateProducts ] = useState( [] );
    const [ print, setPrint ] = useState( [] );
    const [ isPrintShow, setIsPrintShow ] = useState( false );
    const [ companyName, setCompanyName ] = useState( true )
    const [ productName, setProductName ] = useState( true )
    const [ price, setPrice ] = useState( true )
    const [ errors, setErrors ] = useState( {
        warehouse_id: '',
        paperSizeValue: ''
    } );
    const [ updated, setUpdated ] = useState( false );
    const componentRef = useRef();
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( fetchAllWarehouses() );
    }, [ dispatch ] );

    useEffect( () => {
        dispatch( fetchFrontSetting() )
    }, [ dispatch ] )

    useEffect( () => {
        if ( printBarcodeValue ) {
            if ( updateProducts.length ) {
                setPrint( preparePrint() )
            }
        }
    }, [ updateProducts, printBarcodeValue, printBarcodeQuantity ] )

    const onWarehouseChange = ( obj ) => {
        setPrintBarcodeValue( inputs => ( { ...inputs, warehouse_id: obj } ) )
    };

    const onPaperSizeChange = ( obj ) => {
        setPrintBarcodeValue( inputs => ( { ...inputs, paperSizeValue: obj } ) )
        setIsPrintShow( true );
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if ( !printBarcodeValue.warehouse_id ) {
            errorss[ 'warehouse_id' ] = getFormattedMessage( 'purchase.select.warehouse.validate.label' )
        } else if ( updateProducts.length === 0 ) {
            dispatch( addToast( {
                text: getFormattedMessage( 'purchase.product-list.validate.message' ),
                type: toastType.ERROR
            } ) )
        } else if ( !printBarcodeValue.paperSizeValue ) {
            errorss[ 'paperSizeValue' ] = getFormattedMessage( 'globally.paper.size.validate.label' )
        } else {
            isValid = true;
        }
        setErrors( errorss );
        return isValid;
    };

    const onResetClick = () => {
        setUpdateProducts( [] );
        setUpdated( false )
        setPrintBarcodeValue( {
            warehouse_id: '',
            paperSizeValue: ''
        } );
        setErrors( {
            warehouse_id: '',
            paperSizeValue: ''
        } )
    };

    const printPaymentReceiptPdf = ( event ) => {
        event.preventDefault();
        const valid = handleValidation();
        if ( isPrintShow === true && valid ) {
            document.getElementById( 'printReceipt' ).click();
        }
    };

    const handlePrint = useReactToPrint( {
        content: () => componentRef.current,
        pageStyle: `
            @page {
                margin: 8mm;
            }

            body {
                margin: 0 !important;
                background: #ffffff !important;
                color: #000000 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            .barcode-main,
            .barcode-main * {
                color: #000000 !important;
                background: #ffffff !important;
                opacity: 1 !important;
                text-shadow: none !important;
                box-shadow: none !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            .barcode-main__barcode-image,
            .barcode-main__barcode-style img {
                filter: none !important;
                opacity: 1 !important;
                background: #ffffff !important;
                image-rendering: crisp-edges !important;
                image-rendering: -webkit-optimize-contrast !important;
                mix-blend-mode: normal !important;
            }
        `,
    } );

    const preparePrint = () => {
        const formValue = {
            products: updateProducts,
            paperSize: printBarcodeValue.paperSizeValue,
            printBarcodeQuantity: printBarcodeQuantity
        }
        return formValue
    };

    //on update function
    const onUpdateClick = ( event ) => {
        event.preventDefault();
        const valid = handleValidation();
        if ( valid ) {
            setIsPrintShow( true );
            setUpdated( true );
        }
    };

    // print barcode
    const loadPrintBlock = () => {
        return (
            <div className='d-none'>
                <button id='printReceipt' onClick={handlePrint}>Print this out!</button>
                <PrintButton ref={componentRef} frontSetting={frontSetting} allConfigData={allConfigData} barcodeOptions={barcodeOptions} updateProducts={print} />
            </div>
        );
    };

    const handleChangedCompany = ( event, targetValue ) => {
        let checked = event.target.checked;
        if ( targetValue === 1 ) {
            setCompanyName( checked );
        }
        if ( targetValue === 2 ) {
            setProductName( checked )
        }
        if ( targetValue === 3 ) {
            setPrice( checked )
        }
    };

    const barcodeOptions = {
        companyName: companyName,
        productName: productName,
        price: price
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText( 'print.barcode.title' )} />
            {print.length !== 0 ? loadPrintBlock() : ''}
            <div className='card card-body'>
                <Col md={4} className='ml-auto mb-3 col-12'>
                    <ReactSelect name='warehouse_id' data={warehouses} onChange={onWarehouseChange}
                        title={getFormattedMessage( 'warehouse.title' )} errors={errors[ 'warehouse_id' ]}
                        defaultValue={printBarcodeValue.warehouse_id}
                        value={printBarcodeValue.warehouse_id}
                        placeholder={placeholderText( 'purchase.select.warehouse.placeholder.label' )} />
                </Col>
                <Col sm={12} className="mb-10">
                    <label className='form-label'>
                        {getFormattedMessage( 'dashboard.stockAlert.product.label' )}:
                    </label>
                    <ProductSearch values={printBarcodeValue} isAllProducts={true}
                        updateProducts={updateProducts} handleValidation={handleValidation}
                        setUpdateProducts={setUpdateProducts}
                        enableWarehouseFastSearch={true}
                        fastSearchMinChars={1}
                        fastSearchDebounceMs={250}
                        fastSearchLimit={30}
                        fastSearchIncludeNoStock={true}
                        resultDisplayMode="code-name-dash" />
                </Col>
                <div className='col-12 md-12'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>{getFormattedMessage( 'dashboard.stockAlert.product.label' )}</th>
                                <th>{getFormattedMessage( 'purchase.order-item.table.qty.column.label' )}</th>
                                <th>{getFormattedMessage( 'react-data-table.action.column.label' )}</th>
                            </tr>
                        </thead>
                        {<PrintTable printBarcodeValue={printBarcodeValue} updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts} />}
                    </Table>
                </div>
                <Row>
                    <Col className='ml-auto mb-5 col-6'>
                        <ReactSelect name='paperSizeValue' data={paperSize} onChange={onPaperSizeChange}
                            title={getFormattedMessage( 'paper.size.title' )} errors={errors[ 'paperSizeValue' ]}
                            defaultValue={printBarcodeValue.paperSizeValue}
                            value={printBarcodeValue.paperSizeValue}
                            placeholder={placeholderText( 'paper.size.placeholder.label' )} />
                    </Col>
                    <Col className="d-flex col-6" >
                        <div className='mt-3'>
                            {/*<div>{getFormattedMessage("currency.icon.right.side.lable")}</div>*/}
                            <div>{getFormattedMessage( "print-barcode.show-company.label" )}</div>
                            <div className="d-flex align-items-center mt-2">
                                <label className="form-check form-switch form-switch-sm">
                                    <input type='checkbox' checked={companyName}
                                        name='Currency_icon_Right_side'
                                        onChange={( event ) => handleChangedCompany( event, 1 )}
                                        className='me-3 form-check-input cursor-pointer' />
                                    <div className='control__indicator' />
                                </label>
                                <span className="switch-slider" data-checked="✓" data-unchecked="✕">
                                    {errors[ 'Currency_icon_Right_side' ] ? errors[ 'Currency_icon_Right_side' ] : null}
                                </span>

                            </div>
                        </div>
                        <div className='mt-3 ms-10 mb-5'>
                            <div>{getFormattedMessage( "print-barcode.show-product-name.label" )}</div>
                            <div className="align-items-center mt-2">
                                <label className="form-check form-switch form-switch-sm">
                                    <input type='checkbox' checked={productName}
                                        name='Currency_icon_Right_side'
                                        onChange={( event ) => handleChangedCompany( event, 2 )}
                                        className='me-3 form-check-input cursor-pointer' />
                                    <div className='control__indicator' />
                                </label>
                                <span className="switch-slider" data-checked="✓" data-unchecked="✕">
                                    {errors[ 'Currency_icon_Right_side' ] ? errors[ 'Currency_icon_Right_side' ] : null}
                                </span>

                            </div>
                        </div>
                        <div className='mt-3 ms-10'>
                            <div>{getFormattedMessage( "print-barcode.show-price.label" )}</div>
                            <div className="d-flex align-items-center mt-2">
                                <label className="form-check form-switch form-switch-sm">
                                    <input type='checkbox' checked={price}
                                        name='Currency_icon_Right_side'
                                        onChange={( event ) => handleChangedCompany( event, 3 )}
                                        className='me-3 form-check-input cursor-pointer' />
                                    <div className='control__indicator' />
                                </label>
                                <span className="switch-slider" data-checked="✓" data-unchecked="✕">
                                    {errors[ 'Currency_icon_Right_side' ] ? errors[ 'Currency_icon_Right_side' ] : null}
                                </span>

                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='d-xl-flex align-items-center justify-content-between'>
                    <div className='d-xl-flex align-items-center justify-content-between'>
                        <button type='button' className='btn btn-success me-5 text-white mb-2'
                            onClick={( event ) => onUpdateClick( event )}>
                            {getFormattedMessage( 'preview.title' )}<FontAwesomeIcon icon={faMoneyBill} className='ms-2' />
                        </button>
                        <button type='button' className='btn btn-danger me-5 mb-2'
                            onClick={() => onResetClick()}>
                            {getFormattedMessage( 'date-picker.filter.reset.label' )}
                            <FontAwesomeIcon icon={faCreditCard} className='ms-2' />
                        </button>
                        <Button type='button' variant='primary' className='btn btn-primary me-5 mb-2'
                            onClick={( e ) => printPaymentReceiptPdf( e )}>
                            {getFormattedMessage( 'print.title' )}
                            <FontAwesomeIcon icon={faWallet} className='ms-2' />
                        </Button>
                    </div>
                </div>
                {<BarcodeShow updateProducts={updateProducts} barcodeOptions={barcodeOptions} frontSetting={frontSetting} paperSize={printBarcodeValue.paperSizeValue}
                    updated={updated} allConfigData={allConfigData} />}
            </div>
        </MasterLayout>
    )
};

export default PrintBarcode;
