import React, { useEffect, useRef } from 'react';
import {placeholderText} from '../sharedMethod';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FILTER_INPUT_DEBOUNCE_MS = 180;

const FilterComponent = (props) => {
    const {handleSearch} = props;
    const typingTimeoutRef = useRef(null);

    const sendToParent = (searchText) => {
        handleSearch(searchText);
    };

    const onChangeName = (event) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(
            () => sendToParent(event.target.value),
            FILTER_INPUT_DEBOUNCE_MS
        );
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    // justify-content-md-end
    return (
        <div className='d-flex position-relative col-12 col-xxl-4 col-md-3 col-lg-4 mb-lg-0 mb-md-0 mb-3 searchBox'>
            <div className='position-relative d-flex width-320'>
                <input className='form-control ps-8' type='search' id='search'
                       placeholder={placeholderText('react-data-table.searchbar.placeholder')} aria-label='Search'
                       onChange={(e) => onChangeName(e)}/>
                <span
                    className='position-absolute d-flex align-items-center top-0 bottom-0 left-0 text-gray-600 ms-3'>
               <FontAwesomeIcon icon={faSearch}/>
            </span>
            </div>
        </div>
    )
};

export default FilterComponent;
