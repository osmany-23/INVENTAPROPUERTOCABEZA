import React from 'react';
import PropTypes from 'prop-types';
import {ToastContainer} from 'react-toastify';

const Toasts = props => {
    const {language} = props;

    return (
        <ToastContainer
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={language === 'ar'}
            draggable
            pauseOnHover
            pauseOnFocusLoss
        />
    );
};

Toasts.propTypes = {
    language: PropTypes.string,
};

export default Toasts;
