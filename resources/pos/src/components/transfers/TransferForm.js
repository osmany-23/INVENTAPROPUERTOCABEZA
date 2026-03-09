import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { InputGroup, Table } from 'react-bootstrap-v5';
import { editTransfer } from '../../store/action/transfersAction';
import TransfersTable from '../../shared/components/transfers/TransfersTable';
import { prepareTransferArray } from '../../shared/prepareArray/prepareTransferArray';
import {
    decimalValidate,
    getFormattedMessage,
    placeholderText,
    onFocusInput,
    getFormattedOptions,
    formatNumericInputOnBlur,
    normalizeNumericValue,
    parseNumber,
} from '../../shared/sharedMethod';
import { calculateCartTotalAmount, calculateCartTotalTaxAmount } from '../../shared/calculation/calculation';
import ModelFooter from '../../shared/components/modelFooter';
import ProductSearch from '../../shared/components/product-cart/search/ProductSearch';
import { addToast } from '../../store/action/toastAction';
import { toastType, transferCreatStatusOptions } from '../../constants';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import ProductMainCalculation from '../sales/ProductMainCalculation';
import ReactSelect from '../../shared/select/reactSelect';
import { fetchProductsByWarehouse } from "../../store/action/productAction";

const TransferForm = ( props ) => {
    const {
        addTtansferData,
        id,
        editTransfer,
        customProducts,
        singleTransfer,
        warehouses,
        fetchProductsByWarehouse,
        products, frontSetting, allConfigData
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ newCost, setNewCost ] = useState( '' );
    const [ newDiscount, setNewDiscount ] = useState( '' );
    const [ newTax, setNewTax ] = useState( '' );
    const [ newPurchaseUnit, setNewPurchaseUnit ] = useState( '' );
    const [ subTotal, setSubTotal ] = useState( '' );
    const [ updateProducts, setUpdateProducts ] = useState( [] );
    const [ quantity, setQuantity ] = useState( 0 );

    const [ transferValue, setTransferValue ] = useState( {
        date: singleTransfer ? moment( singleTransfer.date ).toDate() : new Date(),
        from_warehouse_id: singleTransfer ? singleTransfer.from_warehouse_id : '',
        to_warehouse_id: singleTransfer ? singleTransfer.to_warehouse_id : '',
        warehouse_id: undefined,
        supplier_id: singleTransfer ? singleTransfer.supplier_id : '',
        tax_rate: singleTransfer ? formatNumericInputOnBlur( singleTransfer.tax_rate, 2 ) : '0.00',
        tax_amount: singleTransfer ? formatNumericInputOnBlur( singleTransfer.tax_amount, 2 ) : '0.00',
        discount: singleTransfer ? formatNumericInputOnBlur( singleTransfer.discount, 2 ) : '0.00',
        shipping: singleTransfer ? formatNumericInputOnBlur( singleTransfer.shipping, 2 ) : '0.00',
        grand_total: singleTransfer ? singleTransfer.grand_total : '0.00',
        notes: singleTransfer ? singleTransfer.notes : '',
        status_id: singleTransfer ? singleTransfer.status_id : {
            label: getFormattedMessage( "status.filter.complated.label" ),
            value: 1
        },
    } );

    const [ errors, setErrors ] = useState( {
        date: '',
        from_warehouse_id: '',
        to_warehouse_id: '',
        supplier_id: '',
        details: '',
        tax_rate: '',
        discount: '',
        shipping: '',
        status_id: ''
    } );

    useEffect( () => {
        setUpdateProducts( updateProducts );
    }, [ updateProducts, quantity, newCost, newDiscount, newTax, subTotal, newPurchaseUnit ] );

    useEffect( () => {
        if ( singleTransfer ) {
            setUpdateProducts( singleTransfer.transfer_items );
        }
    }, [] );

    useEffect( () => {
        updateProducts.length >= 1 ? dispatch( { type: 'DISABLE_OPTION', payload: true } ) : dispatch( { type: 'DISABLE_OPTION', payload: false } )
    }, [ singleTransfer ] )

    useEffect( () => {
        transferValue.from_warehouse_id.value ? fetchProductsByWarehouse( transferValue.from_warehouse_id.value ) : null
        transferValue.from_warehouse_id.value ? setTransferValue( inputs => ( { ...inputs, warehouse_id: transferValue.from_warehouse_id } ) ) : null
    }, [ transferValue.from_warehouse_id ] )

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        const qtyCart = updateProducts.filter( ( a ) => a.quantity === 0 );
        if ( !transferValue.date ) {
            error[ 'date' ] = getFormattedMessage( 'globally.date.validate.label' );
        } else if ( !transferValue.from_warehouse_id ) {
            errorss[ 'from_warehouse_id' ] = getFormattedMessage( 'purchase.select.warehouse.validate.label' )
        } else if ( !transferValue.to_warehouse_id ) {
            errorss[ 'to_warehouse_id' ] = getFormattedMessage( 'purchase.select.warehouse.validate.label' )
        } else if ( transferValue.from_warehouse_id.value === transferValue.to_warehouse_id.value ) {
            errorss[ 'to_warehouse_id' ] = getFormattedMessage( "transfer.select.warehouse.validate.message" )
        } else if ( qtyCart.length > 0 ) {
            dispatch( addToast( {
                text: getFormattedMessage( 'globally.product-quantity.validate.message' ),
                type: toastType.ERROR
            } ) )
        } else if ( updateProducts.length < 1 ) {
            dispatch( addToast( {
                text: getFormattedMessage( 'purchase.product-list.validate.message' ),
                type: toastType.ERROR
            } ) )
        } else if ( !transferValue.status_id ) {
            errorss[ 'status_id' ] = getFormattedMessage( 'globally.status.validate.label' )
        } else {
            isValid = true;
        }
        setErrors( errorss );
        return isValid;
    };

    const onWarehouseChangeOne = ( obj ) => {
        setTransferValue( inputs => ( { ...inputs, from_warehouse_id: obj } ) )
        setErrors( '' )
    };

    const onWarehouseChangeTow = ( obj ) => {
        setTransferValue( inputs => ( { ...inputs, to_warehouse_id: obj } ) )
        setErrors( '' )
    };

    const onStatusChange = ( obj ) => {
        setTransferValue( inputs => ( { ...inputs, status_id: obj } ) )
    };

    const updateCost = ( item ) => {
        setNewCost( item );
    };

    const updateDiscount = ( item ) => {
        setNewDiscount( item );
    };

    const updateTax = ( item ) => {
        setNewTax( item );
    };

    const onChangeInput = ( e ) => {
        e.preventDefault();
        const value = normalizeNumericValue( e.target.value );
        // check if value includes a decimal point
        if ( value.match( /\./g ) ) {
            const [ , decimal ] = value.split( '.' );
            // restrict value to only 2 decimal places
            if ( decimal?.length > 2 ) {
                // do nothing
                return;
            }
        }
        setTransferValue( inputs => ( { ...inputs, [ e.target.name ]: value && value } ) )
    };

    const onNotesChangeInput = ( e ) => {
        e.preventDefault();
        setTransferValue( inputs => ( { ...inputs, notes: e.target.value } ) )
    }

    const handleCallback = ( date ) => {
        setTransferValue( previousState => {
            return { ...previousState, date: date }
        } );
        setErrors( '' )
    };

    const updatedQty = ( qty ) => {
        setQuantity( qty );
    };

    const updateSubTotal = ( item ) => {
        setSubTotal( item );
    };

    const updatePurchaseUnit = ( item ) => {
        setNewPurchaseUnit( item );
    };

    const transferStatusFilterOptions = getFormattedOptions( transferCreatStatusOptions )

    const prepareData = ( prepareData ) => {
        const formValue = {
            from_warehouse_id: prepareData.from_warehouse_id.value ? prepareData.from_warehouse_id.value : prepareData.from_warehouse_id,
            to_warehouse_id: prepareData.to_warehouse_id.value ? prepareData.to_warehouse_id.value : prepareData.to_warehouse_id,
            date: moment( prepareData.date ).toDate(),
            transfer_items: updateProducts,
            note: prepareData.notes,
            discount: parseNumber( prepareData.discount, 0 ).toFixed( 2 ),
            tax_rate: parseNumber( prepareData.tax_rate, 0 ).toFixed( 2 ),
            tax_amount: calculateCartTotalTaxAmount( updateProducts, transferValue ),
            shipping: parseNumber( prepareData.shipping, 0 ).toFixed( 2 ),
            grand_total: calculateCartTotalAmount( updateProducts, transferValue ),
            received_amount: 0,
            paid_amount: 0,
            status: prepareData.status_id.value ? prepareData.status_id.value : prepareData.status_id,
        }
        return formValue
    };

    const onSubmit = ( event ) => {
        event.preventDefault();
        const valid = handleValidation();
        if ( valid ) {
            if ( singleTransfer ) {
                editTransfer( id, prepareData( transferValue ), navigate );
            } else {
                addTtansferData( prepareData( transferValue ) );
                setTransferValue( transferValue );
            }
        }
    };

    const onBlurInput = ( el ) => {
        if ( [ "shipping", "discount", "tax_rate" ].includes( el.target.name ) ) {
            setTransferValue( ( prev ) => ( {
                ...prev,
                [ el.target.name ]: formatNumericInputOnBlur( prev[ el.target.name ], 2 ),
            } ) );
        }
    }

    return (
        <div className='card'>
            <div className='card-body'>
                {/*<Form>*/}
                <div className='row'>
                    <div className='col-md-4'>
                        <label className='form-label'>
                            {getFormattedMessage( 'react-data-table.date.column.label' )}:
                        </label>
                        <span className='required' />
                        <div className='position-relative'>
                            <ReactDatePicker onChangeDate={handleCallback} newStartDate={transferValue.date} />
                        </div>
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'date' ] ? errors[ 'date' ] : null}</span>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <ReactSelect data={warehouses} onChange={onWarehouseChangeOne}
                            defaultValue={transferValue.from_warehouse_id} addSearchItems={singleTransfer}
                            isWarehouseDisable={true}
                            title={getFormattedMessage( 'transfer.from-warehouse.title' )} errors={errors[ 'from_warehouse_id' ]}
                            placeholder={placeholderText( 'purchase.select.warehouse.placeholder.label' )} />
                    </div>
                    <div className='col-md-4 mb-3'>
                        <ReactSelect data={warehouses} onChange={onWarehouseChangeTow}
                            defaultValue={transferValue.to_warehouse_id} addSearchItems={singleTransfer}
                            isWarehouseDisable={true}
                            title={getFormattedMessage( 'transfer.to-warehouse.title' )} errors={errors[ 'to_warehouse_id' ]}
                            placeholder={placeholderText( 'purchase.select.warehouse.placeholder.label' )} />
                    </div>
                    <div className='col-md-12 mb-3'>
                        <label className='form-label'>
                            {getFormattedMessage( 'dashboard.stockAlert.product.label' )}:
                        </label>
                        <ProductSearch values={transferValue} products={products} isAllProducts={false}
                            handleValidation={handleValidation} updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts} customProducts={customProducts} />
                    </div>
                    <div className='col-12 md-12'>
                        <label
                            className='form-label'>
                            {getFormattedMessage( 'purchase.order-item.table.label' )}:
                        </label>
                        <span className='required ' />
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>{getFormattedMessage( 'dashboard.stockAlert.product.label' )}</th>
                                    <th>{getFormattedMessage( 'purchase.order-item.table.net-unit-cost.column.label' )}</th>
                                    <th>{getFormattedMessage( 'purchase.order-item.table.stock.column.label' )}</th>
                                    <th className='text-lg-start text-center'>{getFormattedMessage( 'purchase.order-item.table.qty.column.label' )}</th>
                                    <th>{getFormattedMessage( 'purchase.order-item.table.discount.column.label' )}</th>
                                    <th>{getFormattedMessage( 'purchase.order-item.table.tax.column.label' )}</th>
                                    <th>{getFormattedMessage( 'purchase.order-item.table.sub-total.column.label' )}</th>
                                    <th>{getFormattedMessage( 'react-data-table.action.column.label' )}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updateProducts && updateProducts.map( ( singleProduct, index ) => {
                                    return <TransfersTable singleProduct={singleProduct} index={index}
                                        updateQty={updatedQty}
                                        updateCost={updateCost} updateDiscount={updateDiscount}
                                        updateProducts={updateProducts}
                                        updateSubTotal={updateSubTotal} frontSetting={frontSetting}
                                        setUpdateProducts={setUpdateProducts} updateTax={updateTax}
                                        updatePurchaseUnit={updatePurchaseUnit}
                                        transferItem={singleTransfer && singleTransfer.purchase_items}
                                    />
                                } )}
                                {!updateProducts.length && <tr>
                                    <td colSpan={8} className='fs-5 px-3 py-6 custom-text-center'>
                                        {getFormattedMessage( 'sale.product.table.no-data.label' )}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className='col-12'>
                        <ProductMainCalculation inputValues={transferValue} updateProducts={updateProducts}
                            frontSetting={frontSetting} allConfigData={allConfigData} />
                    </div>
                    <div className='col-md-4 mb-5'>
                        <label className='form-label'>
                            {getFormattedMessage( 'purchase.input.order-tax.label' )}:
                        </label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)'
                                className='form-control'
                                onBlur={( event ) => onBlurInput( event )}
                                onFocus={( event ) => onFocusInput( event )}
                                value={transferValue.tax_rate} type='text' name='tax_rate'
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => {
                                    onChangeInput( e )
                                }} />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'orderTax' ] ? errors[ 'orderTax' ] : null}</span>
                    </div>
                    <div className='col-md-4 mb-5'>
                        <label className='form-label'>
                            {getFormattedMessage( 'purchase.order-item.table.discount.column.label' )}:
                        </label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)'
                                className='form-control'
                                onBlur={( event ) => onBlurInput( event )}
                                onFocus={( event ) => onFocusInput( event )}
                                value={transferValue.discount} type='text' name='discount'
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => onChangeInput( e )}
                            />
                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                        </InputGroup>
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'discount' ] ? errors[ 'discount' ] : null}</span>
                    </div>
                    <div className='col-md-4 mb-5'>
                        <label
                            className='form-label'>
                            {getFormattedMessage( 'purchase.input.shipping.label' )}:
                        </label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)'
                                className='form-control' value={transferValue.shipping}
                                type='text' name='shipping'
                                onBlur={( event ) => onBlurInput( event )}
                                onFocus={( event ) => onFocusInput( event )}
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => onChangeInput( e )}
                            />
                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                        </InputGroup>
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'shipping' ] ? errors[ 'shipping' ] : null}</span>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <ReactSelect multiLanguageOption={transferStatusFilterOptions}
                            name='status' onChange={onStatusChange}
                            title={getFormattedMessage( 'purchase.select.status.label' )}
                            defaultValue={transferValue.status_id} errors={errors[ 'status_id' ]}
                            placeholder={placeholderText( 'purchase.select.status.placeholder.label' )} />
                    </div>
                    <div className='col-md-12 mb-5'>
                        <label className='form-label'>
                            {getFormattedMessage( 'globally.input.notes.label' )}:
                        </label>
                        <textarea name='notes' className='form-control'
                            placeholder={placeholderText( 'purchase.placeholder.notes.input' )}
                            onChange={( e ) => onNotesChangeInput( e )}
                        //   value={purchaseValue.notes}
                        />
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'notes' ] ? errors[ 'notes' ] : null}</span>
                    </div>
                    <ModelFooter onEditRecord={singleTransfer} onSubmit={onSubmit} link='/app/transfers' />
                </div>
                {/*</Form>*/}
            </div>
        </div>
    )
};

const mapStateToProps = ( state ) => {
    const { products, frontSetting, allConfigData } = state;
    return { customProducts: prepareTransferArray( products ), products, frontSetting, allConfigData }
};

export default connect( mapStateToProps, { editTransfer, fetchProductsByWarehouse } )( TransferForm );
