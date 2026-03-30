import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap-v5';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import ProductSearch from '../../shared/components/product-cart/search/ProductSearch';
import ProductRowTable from '../../shared/components/sales/ProductRowTable';
import {
    placeholderText,
    getFormattedMessage,
    decimalValidate,
    onFocusInput,
    getFormattedOptions,
    formatNumericInputOnBlur,
    normalizeNumericValue,
    parseNumber,
} from '../../shared/sharedMethod';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import ProductMainCalculation from './ProductMainCalculation';
import { calculateCartTotalAmount, calculateCartTotalTaxAmount } from '../../shared/calculation/calculation';
import ModelFooter from '../../shared/components/modelFooter';
import { addToast } from '../../store/action/toastAction';
import { quotationStatusOptions, toastType } from '../../constants';
import { fetchFrontSetting } from '../../store/action/frontSettingAction';
import ReactSelect from '../../shared/select/reactSelect';
import { editQuotation } from '../../store/action/quotationAction';
import apiConfig from '../../config/apiConfig';
import ProductBatchSelectionModal from '../../frontend/components/product/ProductBatchSelectionModal';
import FefoSaleValidationModal from '../../frontend/components/product/FefoSaleValidationModal';
import {
    buildCartRowId,
    getCartProductId,
    getCartRowId,
    sortBatchesByFefo,
} from '../../shared/batchHelpers';

const BATCH_SELECTION_MODE = {
    FEFO: 'fefo',
    SPECIFIC: 'specific',
};

const createEmptyFefoValidationState = () => ( {
    show: false,
    productName: '',
    selectedBatches: [],
    recommendedBatches: [],
} );

const roundBatchQuantity = ( value ) => Number( Number( value || 0 ).toFixed( 2 ) );

const resolveSelectedWarehouseId = ( warehouseValue ) =>
    Number( warehouseValue?.value ?? warehouseValue ?? 0 ) || 0;

const resolveBatchCode = ( batch = {} ) =>
    batch?.codigo_lote_sistema ||
    batch?.lot_code ||
    batch?.lote_fabricante ||
    batch?.batch_code ||
    null;

const buildQuotationRowId = ( productId, batchId = null, fallbackId = null ) => {
    if ( batchId ) {
        return buildCartRowId( productId, batchId );
    }

    if ( fallbackId ) {
        return `quotation-item-${fallbackId}`;
    }

    return `product-${Number( productId || 0 )}`;
};

const toFefoBatchDisplayItem = ( batch, quantity = 1 ) => ( {
    batch_id: Number( batch?.batch_id || batch?.id || 0 ) || null,
    lot_code: resolveBatchCode( batch ) || 'Sin lote',
    expires_at: batch?.expires_at || batch?.batch_expires_at || null,
    quantity: roundBatchQuantity( quantity ),
} );

const QuotationForm = ( props ) => {
    const {
        addQuoationData,
        id,
        customers,
        warehouses,
        singleQuotation,
        products,
        fetchFrontSetting,
        frontSetting,
        editQuotation,
        allConfigData
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useFastQuotationSearch = true;
    const updateProductsRef = useRef( [] );
    const productBatchCacheRef = useRef( new Map() );
    const pendingFefoActionRef = useRef( null );
    const [ updateProducts, setUpdateProducts ] = useState( [] );
    const [ quantity, setQuantity ] = useState( 0 );
    const [ newCost, setNewCost ] = useState( '' );
    const [ newDiscount, setNewDiscount ] = useState( '' );
    const [ newTax, setNewTax ] = useState( '' );
    const [ subTotal, setSubTotal ] = useState( '' );
    const [ newSaleUnit, setNewSaleUnit ] = useState( '' );
    const [ batchSelectionContext, setBatchSelectionContext ] = useState( null );
    const [ showBatchSelectionModal, setShowBatchSelectionModal ] = useState( false );
    const [ fefoValidationState, setFefoValidationState ] = useState(
        createEmptyFefoValidationState()
    );

    const [ saleValue, setSaleValue ] = useState( {
        date: new Date(),
        customer_id: '',
        warehouse_id: '',
        tax_rate: "0.00",
        tax_amount: 0.00,
        discount: "0.00",
        shipping: "0.00",
        grand_total: 0.00,
        notes: singleQuotation ? singleQuotation.notes : '',
        received_amount: 0,
        paid_amount: 0,
        status_id: { label: getFormattedMessage( 'status.filter.sent.label' ), value: 1 }
    } );
    const [ errors, setErrors ] = useState( {
        date: '',
        customer_id: '',
        warehouse_id: '',
        status_id: ''
    } );

    const selectedWarehouseId = useMemo(
        () => resolveSelectedWarehouseId( saleValue.warehouse_id ),
        [ saleValue.warehouse_id ]
    );

    useEffect( () => {
        updateProductsRef.current = Array.isArray( updateProducts ) ? updateProducts : [];
    }, [ updateProducts, quantity, newCost, newDiscount, newTax, subTotal, newSaleUnit ] )

    useEffect( () => {
        updateProducts.length >= 1 ? dispatch( { type: 'DISABLE_OPTION', payload: true } ) : dispatch( { type: 'DISABLE_OPTION', payload: false } )
    }, [ dispatch, updateProducts ] )

    useEffect( () => {
        fetchFrontSetting();
    }, [ fetchFrontSetting ] );

    useEffect( () => {
        if ( singleQuotation ) {
            setSaleValue( {
                date: singleQuotation ? moment( singleQuotation.date ).toDate() : '',
                customer_id: singleQuotation ? singleQuotation.customer_id : '',
                warehouse_id: singleQuotation ? singleQuotation.warehouse_id : '',
                tax_rate: singleQuotation ? formatNumericInputOnBlur( singleQuotation.tax_rate, 2 ) : '0.00',
                tax_amount: singleQuotation ? formatNumericInputOnBlur( singleQuotation.tax_amount, 2 ) : '0.00',
                discount: singleQuotation ? formatNumericInputOnBlur( singleQuotation.discount, 2 ) : '0.00',
                shipping: singleQuotation ? formatNumericInputOnBlur( singleQuotation.shipping, 2 ) : '0.00',
                grand_total: singleQuotation ? singleQuotation.grand_total : '0.00',
                notes: singleQuotation ? singleQuotation.notes : '',
                status_id: singleQuotation ? singleQuotation.status_id : ''
            } )
        }
    }, [ singleQuotation ] );

    useEffect( () => {
        if ( singleQuotation?.quotation_items ) {
            setUpdateProducts( singleQuotation.quotation_items );
        }
    }, [ singleQuotation ] );

    const closeBatchSelectionModal = useCallback( () => {
        setShowBatchSelectionModal( false );
        setBatchSelectionContext( null );
    }, [] );

    const closeFefoValidationModal = useCallback( () => {
        pendingFefoActionRef.current = null;
        setFefoValidationState( createEmptyFefoValidationState() );
    }, [] );

    useEffect( () => {
        productBatchCacheRef.current.clear();
        closeBatchSelectionModal();
        closeFefoValidationModal();
    }, [ closeBatchSelectionModal, closeFefoValidationModal, selectedWarehouseId ] );

    const openFefoValidationModal = useCallback(
        ( { productName, selectedBatches, recommendedBatches, onConfirm } ) => {
            pendingFefoActionRef.current = onConfirm;
            setFefoValidationState( {
                show: true,
                productName: productName || 'Producto con lotes',
                selectedBatches,
                recommendedBatches,
            } );
        },
        []
    );

    const confirmFefoValidation = useCallback( () => {
        const pendingAction = pendingFefoActionRef.current;
        closeFefoValidationModal();

        if ( typeof pendingAction === 'function' ) {
            void Promise.resolve( pendingAction() );
        }
    }, [ closeFefoValidationModal ] );

    const buildReservedBatchQuantities = useCallback( ( cartItems, productId ) => {
        return cartItems.reduce( ( carry, cartItem ) => {
            if ( getCartProductId( cartItem ) !== Number( productId ) ) {
                return carry;
            }

            const batchId = Number(
                cartItem?.product_batch_id || cartItem?.batch_id || cartItem?.lote_id || 0
            );
            if ( !batchId ) {
                return carry;
            }

            carry.set(
                batchId,
                roundBatchQuantity(
                    Number( carry.get( batchId ) || 0 ) + Number( cartItem?.quantity || 0 )
                )
            );

            return carry;
        }, new Map() );
    }, [] );

    const fetchProductBatches = useCallback(
        async ( productId, { forceRefresh = false } = {} ) => {
            const normalizedProductId = Number( productId || 0 );

            if ( !normalizedProductId || !selectedWarehouseId ) {
                return [];
            }

            const cacheKey = `${selectedWarehouseId}:${normalizedProductId}`;
            if ( !forceRefresh && productBatchCacheRef.current.has( cacheKey ) ) {
                return productBatchCacheRef.current.get( cacheKey );
            }

            const response = await apiConfig.get(
                `/products/${normalizedProductId}/batches`
            );
            const batches = sortBatchesByFefo(
                ( response?.data?.data?.batches || [] ).filter(
                    ( batch ) =>
                        Number( batch.warehouse_id ) === Number( selectedWarehouseId )
                )
            );

            productBatchCacheRef.current.set( cacheKey, batches );

            return batches;
        },
        [ selectedWarehouseId ]
    );

    const resolveRecommendedBatch = useCallback(
        ( batches, productId, cartItems ) => {
            const reservedQuantities = buildReservedBatchQuantities(
                cartItems,
                productId
            );

            for ( const batch of sortBatchesByFefo( batches ) ) {
                const effectiveAvailableQuantity = roundBatchQuantity(
                    Number( batch.available_quantity || 0 ) -
                        Number( reservedQuantities.get( Number( batch.id ) ) || 0 )
                );

                if ( batch.status === 'expired' || effectiveAvailableQuantity <= 0 ) {
                    continue;
                }

                return {
                    ...batch,
                    effective_available_quantity: effectiveAvailableQuantity,
                };
            }

            return null;
        },
        [ buildReservedBatchQuantities ]
    );

    const buildBatchLine = useCallback(
        (
            decoratedProduct,
            batch,
            {
                selectionMode = BATCH_SELECTION_MODE.FEFO,
                recommendedBatch = batch,
                forced = false,
            } = {}
        ) => {
            const productId = Number(
                decoratedProduct?.product_id ??
                    decoratedProduct?.id ??
                    batch?.product_id ??
                    0
            );
            const batchId = Number( batch?.id || 0 ) || null;
            const batchCode = resolveBatchCode( batch );
            const batchStock = roundBatchQuantity( batch?.available_quantity || 0 );
            const batchPrice = Number( batch?.product_price );
            const resolvedPrice = Number.isFinite( batchPrice ) && batchPrice > 0
                ? batchPrice
                : Number( decoratedProduct?.product_price || 0 );
            const rowId = buildQuotationRowId( productId, batchId );

            return {
                ...decoratedProduct,
                id: productId,
                product_id: productId,
                quotation_item_id: decoratedProduct?.quotation_item_id || null,
                cart_row_id: rowId,
                row_id: rowId,
                quantity: roundBatchQuantity( decoratedProduct?.quantity || 1 ),
                product_price: resolvedPrice,
                net_unit_price: resolvedPrice,
                fix_net_unit: resolvedPrice,
                batch_enabled: true,
                is_batch_product: true,
                product_batch_id: batchId,
                batch_id: batchId,
                lote_id: batchId,
                lote_codigo: batchCode,
                codigo_lote_sistema: batch?.codigo_lote_sistema || null,
                lote_fabricante: batch?.lote_fabricante || null,
                lot_code: batch?.lot_code || null,
                batch_code: batchCode,
                batch_status: batch?.status || null,
                batch_status_label: batch?.status_label || null,
                batch_received_at: batch?.received_at || null,
                batch_expires_at:
                    batch?.expires_at || batch?.fecha_vencimiento || null,
                stock_lote: batchStock,
                batch_stock_quantity: batchStock,
                batch_available_quantity: batchStock,
                quantity_limit: batchStock > 0 ? batchStock : decoratedProduct?.quantity_limit,
                batch_selection_mode: selectionMode,
                fefo_priority_batch_id:
                    Number( recommendedBatch?.id || batchId || 0 ) || null,
                fefo_priority_batch_code: resolveBatchCode(
                    recommendedBatch || batch
                ),
                fefo_priority_expires_at:
                    recommendedBatch?.expires_at || batch?.expires_at || null,
                fefo_compliant:
                    Number( batchId ) === Number( recommendedBatch?.id || batchId || 0 ),
                fefo_forced: Boolean( forced ),
            };
        },
        []
    );

    const appendBatchLine = useCallback(
        ( lineItem ) => {
            let wasAdded = false;
            let errorMessage = '';

            setUpdateProducts( ( previousProducts ) => {
                const rowId = getCartRowId( lineItem );
                const existingLine = previousProducts.find(
                    ( cartItem ) => getCartRowId( cartItem ) === rowId
                );
                const lineStock = roundBatchQuantity(
                    lineItem?.batch_stock_quantity ||
                        lineItem?.stock_lote ||
                        lineItem?.batch_available_quantity ||
                        0
                );

                if ( existingLine ) {
                    const maxQuantity = roundBatchQuantity(
                        existingLine?.batch_stock_quantity ||
                            existingLine?.stock_lote ||
                            existingLine?.batch_available_quantity ||
                            lineStock
                    );
                    const nextQuantity = roundBatchQuantity(
                        Number( existingLine?.quantity || 0 ) + 1
                    );

                    if ( maxQuantity > 0 && nextQuantity > maxQuantity ) {
                        errorMessage = 'Stock insuficiente en este lote';

                        return previousProducts;
                    }

                    wasAdded = true;

                    return previousProducts.map( ( cartItem ) =>
                        getCartRowId( cartItem ) === rowId
                            ? {
                                ...cartItem,
                                ...lineItem,
                                quantity: nextQuantity,
                                stock_lote: maxQuantity,
                                batch_stock_quantity: maxQuantity,
                                batch_available_quantity: maxQuantity,
                            }
                            : cartItem
                    );
                }

                if ( lineStock <= 0 ) {
                    errorMessage = 'No hay stock disponible en ningún lote';

                    return previousProducts;
                }

                wasAdded = true;

                return [
                    ...previousProducts,
                    {
                        ...lineItem,
                        quantity: roundBatchQuantity( lineItem?.quantity || 1 ),
                    },
                ];
            } );

            if ( errorMessage ) {
                dispatch(
                    addToast( { text: errorMessage, type: toastType.ERROR } )
                );
            }

            return wasAdded;
        },
        [ dispatch ]
    );

    const useRecommendedBatch = useCallback(
        async ( context = batchSelectionContext ) => {
            if ( !context?.decoratedProduct ) {
                return false;
            }

            try {
                const productId = Number(
                    context?.decoratedProduct?.product_id || context?.product?.id || 0
                );
                const batches = await fetchProductBatches( productId, {
                    forceRefresh: true,
                } );
                const recommendedBatch = resolveRecommendedBatch(
                    batches,
                    productId,
                    updateProductsRef.current
                );

                if ( !recommendedBatch ) {
                    dispatch(
                        addToast( {
                            text: 'No hay stock disponible en ningún lote',
                            type: toastType.ERROR,
                        } )
                    );

                    return false;
                }

                const lineItem = buildBatchLine(
                    context.decoratedProduct,
                    recommendedBatch,
                    {
                        recommendedBatch,
                        selectionMode: BATCH_SELECTION_MODE.FEFO,
                        forced: false,
                    }
                );
                const wasAdded = appendBatchLine( lineItem );

                if ( wasAdded ) {
                    closeBatchSelectionModal();
                }

                return wasAdded;
            } catch ( error ) {
                dispatch(
                    addToast( {
                        text:
                            error?.response?.data?.message ||
                            'No se pudieron cargar los lotes del producto.',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }
        },
        [
            appendBatchLine,
            batchSelectionContext,
            buildBatchLine,
            closeBatchSelectionModal,
            dispatch,
            fetchProductBatches,
            resolveRecommendedBatch,
        ]
    );

    const handleSpecificBatchSelection = useCallback(
        async ( selectedBatch ) => {
            if ( !batchSelectionContext?.decoratedProduct || !selectedBatch?.id ) {
                return false;
            }

            try {
                const productId = Number(
                    batchSelectionContext?.decoratedProduct?.product_id ||
                        batchSelectionContext?.product?.id ||
                        0
                );
                const batches = await fetchProductBatches( productId, {
                    forceRefresh: true,
                } );
                const recommendedBatch = resolveRecommendedBatch(
                    batches,
                    productId,
                    updateProductsRef.current
                );

                if ( !recommendedBatch ) {
                    dispatch(
                        addToast( {
                            text: 'No hay stock disponible en ningún lote',
                            type: toastType.ERROR,
                        } )
                    );

                    return false;
                }

                const normalizedSelectedBatch =
                    batches.find(
                        ( batch ) => Number( batch.id ) === Number( selectedBatch.id )
                    ) || null;

                if ( !normalizedSelectedBatch ) {
                    dispatch(
                        addToast( {
                            text: 'El lote seleccionado ya no tiene stock disponible.',
                            type: toastType.ERROR,
                        } )
                    );

                    return false;
                }

                const reservedQuantities = buildReservedBatchQuantities(
                    updateProductsRef.current,
                    productId
                );
                const effectiveAvailableQuantity = roundBatchQuantity(
                    Number( normalizedSelectedBatch.available_quantity || 0 ) -
                        Number(
                            reservedQuantities.get( Number( normalizedSelectedBatch.id ) ) || 0
                        )
                );

                if ( normalizedSelectedBatch.status === 'expired' ) {
                    dispatch(
                        addToast( {
                            text: 'Este lote está vencido',
                            type: toastType.ERROR,
                        } )
                    );

                    return false;
                }

                if ( effectiveAvailableQuantity <= 0 ) {
                    dispatch(
                        addToast( {
                            text: 'Stock insuficiente en este lote',
                            type: toastType.ERROR,
                        } )
                    );

                    return false;
                }

                const confirmSelection = async ( forced = false ) => {
                    const lineItem = buildBatchLine(
                        batchSelectionContext.decoratedProduct,
                        normalizedSelectedBatch,
                        {
                            recommendedBatch,
                            selectionMode: BATCH_SELECTION_MODE.SPECIFIC,
                            forced,
                        }
                    );
                    const wasAdded = appendBatchLine( lineItem );

                    if ( wasAdded ) {
                        closeBatchSelectionModal();
                    }

                    return wasAdded;
                };

                if ( Number( normalizedSelectedBatch.id ) !== Number( recommendedBatch.id ) ) {
                    closeBatchSelectionModal();
                    openFefoValidationModal( {
                        productName:
                            batchSelectionContext?.product?.attributes?.name ||
                            batchSelectionContext?.decoratedProduct?.name,
                        selectedBatches: [
                            toFefoBatchDisplayItem( normalizedSelectedBatch, 1 ),
                        ],
                        recommendedBatches: [
                            toFefoBatchDisplayItem( recommendedBatch, 1 ),
                        ],
                        onConfirm: () => confirmSelection( true ),
                    } );

                    return false;
                }

                return confirmSelection( false );
            } catch ( error ) {
                dispatch(
                    addToast( {
                        text:
                            error?.response?.data?.message ||
                            'No se pudo validar el lote seleccionado.',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }
        },
        [
            appendBatchLine,
            batchSelectionContext,
            buildBatchLine,
            buildReservedBatchQuantities,
            closeBatchSelectionModal,
            dispatch,
            fetchProductBatches,
            openFefoValidationModal,
            resolveRecommendedBatch,
        ]
    );

    const handleResolveProductAdd = useCallback(
        async ( { product, decoratedProduct } ) => {
            const isBatchProduct = Boolean(
                product?.attributes?.batch_enabled ||
                    decoratedProduct?.batch_enabled ||
                    product?.attributes?.is_batch_product ||
                    decoratedProduct?.is_batch_product
            );

            if ( !isBatchProduct ) {
                return null;
            }

            const productId = Number( decoratedProduct?.product_id ?? product?.id ?? 0 );

            try {
                const batches = await fetchProductBatches( productId );
                const recommendedBatch = resolveRecommendedBatch(
                    batches,
                    productId,
                    updateProductsRef.current
                );

                if ( !recommendedBatch ) {
                    dispatch(
                        addToast( {
                            text: 'No hay stock disponible en ningún lote',
                            type: toastType.ERROR,
                        } )
                    );

                    return { handled: true };
                }

                const sellableBatches = batches.filter(
                    ( batch ) =>
                        batch.status !== 'expired' &&
                        roundBatchQuantity( batch.available_quantity || 0 ) > 0
                );

                if ( sellableBatches.length <= 1 ) {
                    appendBatchLine(
                        buildBatchLine( decoratedProduct, recommendedBatch, {
                            recommendedBatch,
                            selectionMode: BATCH_SELECTION_MODE.FEFO,
                            forced: false,
                        } )
                    );

                    return { handled: true };
                }

                setBatchSelectionContext( {
                    product,
                    decoratedProduct,
                } );
                setShowBatchSelectionModal( true );

                return { handled: true };
            } catch ( error ) {
                dispatch(
                    addToast( {
                        text:
                            error?.response?.data?.message ||
                            'No se pudieron cargar los lotes del producto.',
                        type: toastType.ERROR,
                    } )
                );

                return { handled: true };
            }
        },
        [
            appendBatchLine,
            buildBatchLine,
            dispatch,
            fetchProductBatches,
            resolveRecommendedBatch,
        ]
    );

    const validateTrackedBatchLines = useCallback( () => {
        for ( const cartItem of updateProducts ) {
            const batchEnabled = Boolean(
                cartItem?.batch_enabled || cartItem?.is_batch_product
            );
            const batchId = Number(
                cartItem?.product_batch_id || cartItem?.batch_id || cartItem?.lote_id || 0
            );
            const batchStock = roundBatchQuantity(
                cartItem?.batch_stock_quantity ||
                    cartItem?.stock_lote ||
                    cartItem?.batch_available_quantity ||
                    0
            );
            const requestedQuantity = roundBatchQuantity( cartItem?.quantity || 0 );

            if ( !batchEnabled ) {
                continue;
            }

            if ( !batchId ) {
                dispatch(
                    addToast( {
                        text: 'Debe seleccionar un lote',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }

            if ( cartItem?.batch_status === 'expired' ) {
                dispatch(
                    addToast( {
                        text: 'Este lote está vencido',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }

            if ( batchStock <= 0 ) {
                dispatch(
                    addToast( {
                        text: 'Stock insuficiente en este lote',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }

            if ( batchStock > 0 && requestedQuantity > batchStock ) {
                dispatch(
                    addToast( {
                        text: 'Stock insuficiente en este lote',
                        type: toastType.ERROR,
                    } )
                );

                return false;
            }
        }

        return true;
    }, [ dispatch, updateProducts ] );

    const handleValidation = () => {
        let error = {};
        let isValid = false;
        const qtyCart = updateProducts.filter( ( a ) => a.quantity === 0 );
        if ( !saleValue.date ) {
            error[ 'date' ] = getFormattedMessage( 'globally.date.validate.label' );
        } else if ( !saleValue.warehouse_id ) {
            error[ 'warehouse_id' ] = getFormattedMessage( 'product.input.warehouse.validate.label' );
        } else if ( !saleValue.customer_id ) {
            error[ 'customer_id' ] = getFormattedMessage( 'sale.select.customer.validate.label' );
        } else if ( qtyCart.length > 0 ) {
            dispatch( addToast( { text: getFormattedMessage( 'globally.product-quantity.validate.message' ), type: toastType.ERROR } ) )
        } else if ( updateProducts.length < 1 ) {
            dispatch( addToast( { text: getFormattedMessage( 'purchase.product-list.validate.message' ), type: toastType.ERROR } ) )
        } else if ( !validateTrackedBatchLines() ) {
            isValid = false;
        } else if ( !saleValue.status_id ) {
            error[ 'status_id' ] = getFormattedMessage( "globally.status.validate.label" )
        } else {
            isValid = true;
        }
        setErrors( error );
        return isValid;
    };

    const onWarehouseChange = ( obj ) => {
        setSaleValue( inputs => ( { ...inputs, warehouse_id: obj } ) );
        setErrors( '' );
    };

    const onCustomerChange = ( obj ) => {
        setSaleValue( inputs => ( { ...inputs, customer_id: obj } ) );
        setErrors( '' );
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
        setSaleValue( inputs => ( { ...inputs, [ e.target.name ]: value && value } ) );
    };

    const onNotesChangeInput = ( e ) => {
        e.preventDefault();
        setSaleValue( inputs => ( { ...inputs, notes: e.target.value } ) );
    };

    const onStatusChange = ( obj ) => {
        setSaleValue( inputs => ( { ...inputs, status_id: obj } ) );
    };

    const updatedQty = ( qty ) => {
        setQuantity( qty );
    };

    const updateCost = ( cost ) => {
        setNewCost( cost );
    };

    const updateDiscount = ( discount ) => {
        setNewDiscount( discount );
    };

    const updateTax = ( tax ) => {
        setNewTax( tax );
    };

    const updateSubTotal = ( subTotal ) => {
        setSubTotal( subTotal );
    };

    const updateSaleUnit = ( saleUnit ) => {
        setNewSaleUnit( saleUnit );
    };

    const handleCallback = ( date ) => {
        setSaleValue( previousState => {
            return { ...previousState, date: date }
        } );
        setErrors( '' );
    };

    const quotationStatusFilterOptions = getFormattedOptions( quotationStatusOptions )

    const prepareFormData = ( prepareData ) => {
        const formValue = {
            date: moment( prepareData.date ).toDate(),
            customer_id: prepareData.customer_id.value ? prepareData.customer_id.value : prepareData.customer_id,
            warehouse_id: prepareData.warehouse_id.value ? prepareData.warehouse_id.value : prepareData.warehouse_id,
            discount: parseNumber( prepareData.discount, 0 ).toFixed( 2 ),
            tax_rate: parseNumber( prepareData.tax_rate, 0 ).toFixed( 2 ),
            tax_amount: calculateCartTotalTaxAmount( updateProducts, saleValue ),
            quotation_items: updateProducts,
            shipping: parseNumber( prepareData.shipping, 0 ).toFixed( 2 ),
            grand_total: calculateCartTotalAmount( updateProducts, saleValue ),
            received_amount: 0,
            paid_amount: 0,
            note: prepareData.notes,
            status: prepareData.status_id.value ? prepareData.status_id.value : prepareData.status_id,
        }
        return formValue
    };

    const onSubmit = ( event ) => {
        event.preventDefault();
        const valid = handleValidation();
        if ( valid ) {
            if ( singleQuotation ) {
                editQuotation( id, prepareFormData( saleValue ), navigate );
            } else {
                addQuoationData( prepareFormData( saleValue ) );
                setSaleValue( saleValue );
            }
        }
    };

    const onBlurInput = ( el ) => {
        if ( [ "shipping", "discount", "tax_rate" ].includes( el.target.name ) ) {
            setSaleValue( ( prev ) => ( {
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
                            <ReactDatePicker onChangeDate={handleCallback} newStartDate={saleValue.date} />
                        </div>
                        <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'date' ] ? errors[ 'date' ] : null}</span>
                    </div>
                    <div className='col-md-4'>
                        <ReactSelect name='warehouse_id' data={warehouses} onChange={onWarehouseChange}
                            title={getFormattedMessage( 'warehouse.title' )} errors={errors[ 'warehouse_id' ]}
                            defaultValue={saleValue.warehouse_id} value={saleValue.warehouse_id} addSearchItems={singleQuotation}
                            isWarehouseDisable={true}
                            placeholder={placeholderText( 'purchase.select.warehouse.placeholder.label' )} />
                    </div>
                    <div className='col-md-4'>
                        <ReactSelect name='customer_id' data={customers} onChange={onCustomerChange}
                            title={getFormattedMessage( 'customer.title' )} errors={errors[ 'customer_id' ]}
                            defaultValue={saleValue.customer_id} value={saleValue.customer_id}
                            placeholder={placeholderText( 'sale.select.customer.placeholder.label' )} />
                    </div>
                    <div className='mb-5'>
                        <label className='form-label'>
                            {getFormattedMessage( 'product.title' )}:
                        </label>
                        <ProductSearch values={saleValue} products={products} handleValidation={handleValidation}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            incrementOnDuplicate={true}
                            enableWarehouseFastSearch={useFastQuotationSearch}
                            fastSearchMinChars={1}
                            fastSearchDebounceMs={120}
                            onResolveProductAdd={handleResolveProductAdd} />
                    </div>
                    <div>
                        <label className='form-label'>
                            {getFormattedMessage( 'purchase.order-item.table.label' )}:
                        </label>
                        <span className='required' />
                        <ProductRowTable updateProducts={updateProducts} setUpdateProducts={setUpdateProducts}
                            updatedQty={updatedQty} frontSetting={frontSetting}
                            updateCost={updateCost} updateDiscount={updateDiscount}
                            updateTax={updateTax} updateSubTotal={updateSubTotal}
                            updateSaleUnit={updateSaleUnit}
                        />
                    </div>
                    <div className='col-12'>
                        <ProductMainCalculation inputValues={saleValue} allConfigData={allConfigData} updateProducts={updateProducts} frontSetting={frontSetting} />
                    </div>
                    <div className='col-md-4 mb-3'>
                        <label
                            className='form-label'>{getFormattedMessage( 'purchase.input.order-tax.label' )}: </label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)'
                                className='form-control'
                                type='text' name='tax_rate' value={saleValue.tax_rate}
                                onBlur={( event ) => onBlurInput( event )} onFocus={( event ) => onFocusInput( event )}
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => {
                                    onChangeInput( e )
                                }} />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <Form.Label
                            className='form-label'>{getFormattedMessage( 'purchase.order-item.table.discount.column.label' )}: </Form.Label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)'
                                className='form-control'
                                type='text' name='discount' value={saleValue.discount}
                                onBlur={( event ) => onBlurInput( event )} onFocus={( event ) => onFocusInput( event )}
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => onChangeInput( e )}
                            />
                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className='col-md-4 mb-3'>
                        <label
                            className='form-label'>{getFormattedMessage( 'purchase.input.shipping.label' )}: </label>
                        <InputGroup>
                            <input aria-label='Dollar amount (with dot and two decimal places)' type='text'
                                className='form-control'
                                name='shipping' value={saleValue.shipping}
                                onBlur={( event ) => onBlurInput( event )} onFocus={( event ) => onFocusInput( event )}
                                onKeyPress={( event ) => decimalValidate( event )}
                                onChange={( e ) => onChangeInput( e )}
                            />
                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className='col-md-4'>
                        <ReactSelect multiLanguageOption={quotationStatusFilterOptions} name='status_id' onChange={onStatusChange}
                            title={getFormattedMessage( 'purchase.select.status.label' )}
                            value={saleValue.status_id} errors={errors[ 'status_id' ]}
                            placeholder={placeholderText( 'purchase.select.status.placeholder.label' )} />
                    </div>
                    <div className='mb-3 mt-2'>
                        <label className='form-label'>
                            {getFormattedMessage( 'globally.input.notes.label' )}: </label>
                        <textarea name='notes' className='form-control' value={saleValue.notes}
                            placeholder={placeholderText( 'globally.input.notes.placeholder.label' )}
                            onChange={( e ) => onNotesChangeInput( e )}
                        />
                    </div>
                    <ModelFooter onEditRecord={singleQuotation} onSubmit={onSubmit} link='/app/quotations' />
                </div>
            </div>
            <ProductBatchSelectionModal
                show={showBatchSelectionModal}
                product={batchSelectionContext?.product}
                warehouseId={selectedWarehouseId}
                cartProducts={updateProducts}
                onHide={closeBatchSelectionModal}
                onSelectBatch={handleSpecificBatchSelection}
                onUseFifo={() => useRecommendedBatch()}
            />
            <FefoSaleValidationModal
                show={fefoValidationState.show}
                productName={fefoValidationState.productName}
                selectedBatches={fefoValidationState.selectedBatches}
                recommendedBatches={fefoValidationState.recommendedBatches}
                onCancel={closeFefoValidationModal}
                onConfirm={confirmFefoValidation}
            />
        </div>
    )
}

const mapStateToProps = ( state ) => {
    const { purchaseProducts, products, frontSetting, allConfigData } = state;
    return { purchaseProducts, products, frontSetting, allConfigData }
}

export default connect( mapStateToProps, { editQuotation, fetchFrontSetting } )( QuotationForm )
