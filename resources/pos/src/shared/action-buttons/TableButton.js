import React from 'react';
import {Button} from 'react-bootstrap-v5';
import { canCrud } from "../can";

const TableButton = ({ButtonValue, to}) => {
    if (!canCrud("create", to)) {
        return null;
    }

    return(
        <div className='text-end order-2 mb-2'>
            <Button type='button' variant='primary' href={to}>{ButtonValue}</Button>
        </div>
    )
}

export default TableButton;
