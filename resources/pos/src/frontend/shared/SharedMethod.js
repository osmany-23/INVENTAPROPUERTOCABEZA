const parseNumericValue = (value) => {
    const numericValue = Number(String(value ?? "").replace(/,/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
};

//count discount on price
export const calculateDiscount = ( totalCost ) => {
    if ( totalCost.discount_value > 0 && totalCost.discount_type === '2' || totalCost.discount_type === 2 ) {
        totalCost = ( parseNumericValue( totalCost.net_unit_cost ) - parseNumericValue( totalCost.discount_value ) )
    } else if ( totalCost.discount_value > 0 && totalCost.discount_type === '1' || totalCost.discount_type === 1 ) {
        const percentDiscount = totalCost.discount_type === '1' || totalCost.discount_type === 1 ? parseNumericValue( totalCost.net_unit_cost ) * parseNumericValue( totalCost.discount_value ) / Number( 100 ) : 0;
        totalCost = ( parseNumericValue( totalCost.net_unit_cost ) - ( percentDiscount ) );
    }
    return totalCost;
};

//count tax on price
export const calculateTax = ( totalCost, finalCount ) => {
    if ( totalCost.tax_type === '2' || totalCost.tax_type === 2 ) {
        totalCost = parseNumericValue( finalCount )
    } else if ( totalCost.tax_type === '1' || totalCost.tax_type === 1 ) {
        let exclusiveTax = totalCost.tax_type === '1' || totalCost.tax_type === 1 ? parseNumericValue( finalCount ) * parseNumericValue( totalCost.tax_value ) / Number( 100 ) : 0;
        totalCost = ( parseNumericValue( finalCount ) + ( exclusiveTax ) );
    }
    return totalCost;
};

//cart price updated
export const calculateProductCost = ( product ) => {
    let finalCount = 0;
    finalCount = calculateDiscount( product );
    finalCount = calculateTax( product, finalCount );
    return parseNumericValue( finalCount );
};
