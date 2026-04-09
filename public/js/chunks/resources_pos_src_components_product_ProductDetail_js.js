"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_product_ProductDetail_js"],{

/***/ "./resources/pos/src/components/product/CreateSubProductModal.js":
/*!***********************************************************************!*\
  !*** ./resources/pos/src/components/product/CreateSubProductModal.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/InputGroup.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap/Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/select/reactSelect */ "./resources/pos/src/shared/select/reactSelect.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var CreateSubProductModal = function CreateSubProductModal(props) {
  var _product$variation;

  var show = props.show,
      setShow = props.setShow,
      commonData = props.commonData;

  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state;
  }),
      frontSetting = _useSelector.frontSetting;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      product = _useState2[0],
      setProduct = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    product_price: "",
    product_cost: "",
    order_tax: "",
    stock_alert: "",
    tax_type: ""
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      formInput = _useState4[0],
      setFormInput = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      errors = _useState6[0],
      setErrors = _useState6[1];

  var taxTypeFilterOptions = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedOptions)(_constants__WEBPACK_IMPORTED_MODULE_3__.taxMethodOptions);
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (show) {
      setProduct(_objectSpread(_objectSpread({}, commonData), {}, {
        variationTypes: commonData.variationTypes.map(function (variationType) {
          return {
            value: variationType.id,
            label: variationType.name
          };
        })
      }));
    } else {
      setProduct({});
      setFormInput({
        product_price: "",
        product_cost: "",
        order_tax: "",
        stock_alert: "",
        tax_type: ""
      });
      setErrors({});
    }
  }, [show]);

  var onProductDataChange = function onProductDataChange(e) {
    setFormInput(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors({});
  };

  var onTaxTypeChange = function onTaxTypeChange(obj) {
    setFormInput(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        tax_type: obj
      });
    });
    setErrors({});
  };

  var onVariationTypeChange = function onVariationTypeChange(obj) {
    setFormInput(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        variation_type: obj
      });
    });
    setErrors({});
  };

  var handleValidation = function handleValidation() {
    var validationErrors = {};
    var isValid = false;

    if (!formInput["variation_type"]) {
      validationErrors["variation_type"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("variation.type.select.validate.error.message");
    } else if (!formInput['product_cost'].trim()) {
      validationErrors['product_cost'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.product-cost.validate.label');
    } else if (!formInput['product_price'].trim()) {
      validationErrors['product_price'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.product-price.validate.label');
    } else if (formInput['order_tax'] > 100) {
      validationErrors["order_tax"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.order-tax.valid.validate.label');
    } else if (!formInput['tax_type']) {
      validationErrors["tax_type"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.tax-type.validate.label');
    } else {
      isValid = true;
    }

    setErrors(validationErrors);
    return isValid;
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    var valid = handleValidation();

    if (valid) {
      dispatch((0,_store_action_productAction__WEBPACK_IMPORTED_MODULE_5__.addProduct)(prepareFormData(commonData, formInput), navigate));
      setShow(false);
    }
  };

  var prepareFormData = function prepareFormData(commonData, formInput) {
    var formData = new FormData();
    formData.append('name', commonData.name);
    formData.append('product_code', commonData.product_code);
    formData.append('product_category_id', commonData.product_category_id);
    formData.append('brand_id', commonData.brand_id);
    formData.append('barcode_symbol', commonData.barcode_symbol);
    formData.append('product_unit', commonData.product_unit);
    formData.append('sale_unit', commonData.sale_unit);
    formData.append('purchase_unit', commonData.purchase_unit);
    formData.append('quantity_limit', commonData.quantity_limit);
    formData.append('notes', commonData.notes);
    formData.append('variation_id', commonData.variation.id);
    formData.append('main_product_id', commonData.main_product_id);
    formData.append('code', commonData.product_code + '-' + (0,lodash__WEBPACK_IMPORTED_MODULE_6__.upperCase)(formInput.variation_type.label));
    formData.append('product_price', formInput.product_price);
    formData.append('product_cost', formInput.product_cost);
    formData.append('order_tax', formInput.order_tax);
    formData.append('stock_alert', formInput.stock_alert);
    formData.append('variation_type', formInput.variation_type.value);
    formData.append('tax_type', formInput.tax_type.value ? formInput.tax_type.value : 1);
    return formData;
  };

  var defaultTaxType = {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.exclusive.label")
  };

  var clearField = function clearField() {
    setShow(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
    show: show,
    size: "xl",
    onHide: clearField,
    keyboard: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"].Title, {
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.create.title')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_10__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"].Body, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "mt-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "col-md-6 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("variations.title"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                  type: "text",
                  className: "form-control",
                  value: product === null || product === void 0 ? void 0 : (_product$variation = product.variation) === null || _product$variation === void 0 ? void 0 : _product$variation.name,
                  disabled: true
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                className: "col-md-6 mb-3",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("variation.variation_types"),
                  data: product.variationTypes,
                  onChange: function onChange(data) {
                    return onVariationTypeChange(data);
                  },
                  errors: errors["variation_type"],
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("variation.type.input.name.placeholder.label")
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.product-cost.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                    type: "text",
                    name: "product_cost",
                    min: 0,
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.product-cost.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    value: formInput.product_cost
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["product_cost"] ? errors["product_cost"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.product-price.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                    type: "text",
                    name: "product_price",
                    min: 0,
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.product-price.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    value: formInput.product_price
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["product_price"] ? errors["product_price"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.stock-alert.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                  type: "number",
                  name: "stock_alert",
                  className: "form-control",
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.stock-alert.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onProductDataChange(e);
                  },
                  value: formInput.stock_alert,
                  min: 0
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.order-tax.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                    type: "text",
                    name: "order_tax",
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.order-tax.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    min: 0,
                    pattern: "[0-9]*",
                    value: formInput.order_tax
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Text, {
                    children: "%"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["order_tax"] ? errors["order_tax"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                className: "col-md-3 mb-3",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.tax-type.label"),
                  multiLanguageOption: taxTypeFilterOptions,
                  onChange: function onChange(data) {
                    return onTaxTypeChange(data);
                  },
                  errors: errors["tax_type"],
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.tax-type.placeholder.label")
                })
              })]
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"].Footer, _defineProperty({
        children: "justify-content-start",
        className: "pt-0"
      }, "children", [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        className: "btn btn-primary m-0",
        onClick: function onClick(event) {
          return onSubmit(event);
        },
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)('globally.save-btn')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        className: "btn btn-secondary my-0 ms-5 me-0",
        "data-bs-dismiss": "modal",
        onClick: clearField,
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('globally.cancel-btn')
      })]))]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateSubProductModal);

/***/ }),

/***/ "./resources/pos/src/components/product/DeleteProduct.js":
/*!***************************************************************!*\
  !*** ./resources/pos/src/components/product/DeleteProduct.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var _shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/action-buttons/DeleteModel */ "./resources/pos/src/shared/action-buttons/DeleteModel.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var DeleteProduct = function DeleteProduct(props) {
  var deleteProduct = props.deleteProduct,
      onDelete = props.onDelete,
      deleteModel = props.deleteModel,
      onClickDeleteModel = props.onClickDeleteModel;

  var deleteUserClick = function deleteUserClick() {
    deleteProduct(onDelete.id, onDelete.main_product_id);
    onClickDeleteModel(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    children: deleteModel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      deleteUserClick: deleteUserClick,
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('product.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  deleteProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_2__.deleteProduct
})(DeleteProduct));

/***/ }),

/***/ "./resources/pos/src/components/product/EditSubProductModal.js":
/*!*********************************************************************!*\
  !*** ./resources/pos/src/components/product/EditSubProductModal.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/InputGroup.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap/Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var _shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/select/reactSelect */ "./resources/pos/src/shared/select/reactSelect.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var EditSubProductModal = function EditSubProductModal(props) {
  var show = props.show,
      productData = props.productData,
      setShow = props.setShow;

  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state;
  }),
      frontSetting = _useSelector.frontSetting;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      product = _useState2[0],
      setProduct = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    product_price: "",
    product_cost: "",
    order_tax: "",
    stock_alert: "",
    tax_type: "",
    code: ""
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      formInput = _useState4[0],
      setFormInput = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      errors = _useState6[0],
      setErrors = _useState6[1];

  var taxTypeFilterOptions = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedOptions)(_constants__WEBPACK_IMPORTED_MODULE_3__.taxMethodOptions);
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (show) {
      setProduct(productData);
      setFormInput(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_price: productData.product_price,
          product_cost: productData.product_cost,
          order_tax: productData.order_tax ? productData.order_tax : "",
          stock_alert: productData.stock_alert,
          tax_type: productData.tax_type,
          code: productData.code
        });
      });
    } else {
      setProduct({});
      setFormInput({
        product_price: "",
        product_cost: "",
        order_tax: "",
        stock_alert: "",
        tax_type: "",
        code: ""
      });
      setErrors({});
    }
  }, [show]);

  var onProductDataChange = function onProductDataChange(e) {
    setFormInput(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors({});
  };

  var onTaxTypeChange = function onTaxTypeChange(obj) {
    setFormInput(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        tax_type: obj
      });
    });
    setErrors({});
  };

  var handleValidation = function handleValidation() {
    var validationErrors = {};
    var isValid = false;

    if (formInput['product_cost'] == '') {
      validationErrors['product_cost'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.product-cost.validate.label');
    } else if (formInput['product_price'] == '') {
      validationErrors['product_price'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.product-price.validate.label');
    } else if (formInput['code'] == '') {
      validationErrors['code'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.code.validate.label');
    } else if (formInput['order_tax'] > 100) {
      validationErrors["order_tax"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.input.order-tax.valid.validate.label');
    } else {
      isValid = true;
    }

    setErrors(validationErrors);
    return isValid;
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    var valid = handleValidation();

    if (valid) {
      setShow(false);
      dispatch((0,_store_action_productAction__WEBPACK_IMPORTED_MODULE_5__.editProduct)(product.id, prepareFormData(product, formInput), navigate));
    }
  };

  var prepareFormData = function prepareFormData(commonData, formInput) {
    var formData = new FormData();
    formData.append('name', commonData.name);
    formData.append('product_code', commonData.product_code);
    formData.append('product_category_id', commonData.product_category_id);
    formData.append('brand_id', commonData.brand_id);
    formData.append('barcode_symbol', commonData.barcode_symbol);
    formData.append('product_unit', commonData.product_unit);
    formData.append('sale_unit', commonData.sale_unit);
    formData.append('purchase_unit', commonData.purchase_unit);
    formData.append('quantity_limit', commonData.quantity_limit);
    formData.append('main_product_id', commonData.main_product_id);
    formData.append('notes', commonData.notes);
    formData.append('code', formInput.code);
    formData.append('product_price', formInput.product_price);
    formData.append('product_cost', formInput.product_cost);
    formData.append('order_tax', formInput.order_tax);
    formData.append('stock_alert', formInput.stock_alert);

    if (formInput.tax_type[0]) {
      formData.append('tax_type', formInput.tax_type[0].value ? formInput.tax_type[0].value : 1);
    } else {
      formData.append('tax_type', formInput.tax_type.value ? formInput.tax_type.value : 1);
    }

    return formData;
  };

  var defaultTaxType = productData ? productData.tax_type === "1" ? {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.exclusive.label")
  } : {
    value: 2,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.inclusive.label")
  } || productData.tax_type === "2" ? {
    value: 2,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.inclusive.label")
  } : {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.exclusive.label")
  } : {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("tax-type.filter.exclusive.label")
  };

  var clearField = function clearField() {
    setShow(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
    show: show,
    size: "xl",
    onHide: clearField,
    keyboard: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Title, {
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.edit.title")
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_9__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Body, {
        children: product && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "mt-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.product-cost.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "text",
                    name: "product_cost",
                    min: 0,
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.product-cost.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    value: formInput.product_cost
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["product_cost"] ? errors["product_cost"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.product-price.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "text",
                    name: "product_price",
                    min: 0,
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.product-price.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    value: formInput.product_price
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["product_price"] ? errors["product_price"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                  className: "form-label",
                  children: ["SKU (Barcode) :", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "text",
                  name: "code",
                  className: " form-control",
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.code.placeholder.label"),
                  onChange: function onChange(e) {
                    return onProductDataChange(e);
                  },
                  value: formInput.code
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["code"] ? errors["code"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.stock-alert.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "number",
                  name: "stock_alert",
                  className: "form-control",
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.stock-alert.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onProductDataChange(e);
                  },
                  value: formInput.stock_alert,
                  min: 0
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.order-tax.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "text",
                    name: "order_tax",
                    className: "form-control",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.order-tax.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onProductDataChange(e);
                    },
                    min: 0,
                    pattern: "[0-9]*",
                    value: formInput.order_tax
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"].Text, {
                    children: "%"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["order_tax"] ? errors["order_tax"] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-3 mb-3",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("product.input.tax-type.label"),
                  multiLanguageOption: taxTypeFilterOptions,
                  onChange: function onChange(data) {
                    return onTaxTypeChange(data);
                  },
                  errors: errors["tax_type"],
                  defaultValue: defaultTaxType,
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)("product.input.tax-type.placeholder.label")
                })
              })]
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Footer, _defineProperty({
        children: "justify-content-start",
        className: "pt-0"
      }, "children", [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        type: "button",
        className: "btn btn-primary m-0",
        onClick: function onClick(event) {
          return onSubmit(event);
        },
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.placeholderText)('globally.save-btn')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        type: "button",
        className: "btn btn-secondary my-0 ms-5 me-0",
        "data-bs-dismiss": "modal",
        onClick: clearField,
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('globally.cancel-btn')
      })]))]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditSubProductModal);

/***/ }),

/***/ "./resources/pos/src/components/product/ProductDetail.js":
/*!***************************************************************!*\
  !*** ./resources/pos/src/components/product/ProductDetail.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Image.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Table.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header/HeaderTitle */ "./resources/pos/src/components/header/HeaderTitle.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/images/brand_logo.png */ "./resources/pos/src/assets/images/brand_logo.png");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var _WareHouseDetailsModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./WareHouseDetailsModal */ "./resources/pos/src/components/product/WareHouseDetailsModal.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _EditSubProductModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./EditSubProductModal */ "./resources/pos/src/components/product/EditSubProductModal.js");
/* harmony import */ var _DeleteProduct__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./DeleteProduct */ "./resources/pos/src/components/product/DeleteProduct.js");
/* harmony import */ var _CreateSubProductModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CreateSubProductModal */ "./resources/pos/src/components/product/CreateSubProductModal.js");
/* harmony import */ var _shared_can__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/can */ "./resources/pos/src/shared/can.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
























var ProductDetail = function ProductDetail(props) {
  var _product$attributes2, _product$attributes3, _product$attributes5, _selectedProduct$prod, _primaryProduct$produ, _ref, _selectedProduct$in_s, _selectedProduct$stoc, _product$attributes6, _primaryProduct$produ2, _product$attributes7, _product$attributes7$, _product$attributes7$2, _product$attributes9, _product$attributes10;

  var products = props.products,
      fetchMainProduct = props.fetchMainProduct,
      isLoading = props.isLoading,
      frontSetting = props.frontSetting,
      allConfigData = props.allConfigData;
  var intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_16__["default"])();
  var canCreateProduct = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("products.create", {
    strict: true
  });
  var canUpdateProduct = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("products.update", {
    strict: true
  });
  var canDeleteProduct = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("products.delete", {
    strict: true
  });
  var canManageBatches = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("ver_lotes", {
    strict: true
  }) || (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("products.view", {
    strict: true
  }) || (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("pos.view", {
    strict: true
  });

  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_17__.useParams)(),
      id = _useParams.id;

  var product = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var groupedProducts = products && products.reduce(function (obj, cur) {
      return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, cur.type, cur));
    }, {});
    return groupedProducts === null || groupedProducts === void 0 ? void 0 : groupedProducts.products;
  }, [products]);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showWarehouseModal = _useState2[0],
      setShowWarehouseModal = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showEditSubProductModal = _useState4[0],
      setShowEditSubProductModal = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showCreateSubProductModal = _useState6[0],
      setShowCreateSubProductModal = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      productData = _useState8[0],
      setProductData = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      deleteModel = _useState10[0],
      setDeleteModel = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      isDelete = _useState12[0],
      setIsDelete = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState14 = _slicedToArray(_useState13, 2),
      activeImageIndex = _useState14[0],
      setActiveImageIndex = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState16 = _slicedToArray(_useState15, 2),
      activeMobileProductId = _useState16[0],
      setActiveMobileProductId = _useState16[1];

  var productTitleLabel = intl.formatMessage({
    id: "product.title",
    defaultMessage: "Producto"
  });
  var productDetailsTitle = intl.formatMessage({
    id: "product.product-details.title"
  });
  var galleryTitle = intl.formatMessage({
    id: "product.gallery.title",
    defaultMessage: "Galeria"
  });
  var summaryTitleLabel = intl.formatMessage({
    id: "product.summary.title",
    defaultMessage: "Resumen del producto"
  });
  var priceStockTitle = intl.formatMessage({
    id: "product.price-and-stock.title",
    defaultMessage: "Precios y stock"
  });
  var notePanelTitle = intl.formatMessage({
    id: "globally.input.note.label",
    defaultMessage: "Nota"
  });
  var quickActionsTitle = intl.formatMessage({
    id: "product.quick-actions.title",
    defaultMessage: "Acciones rapidas"
  });
  var variantsTitle = intl.formatMessage({
    id: "variations.title",
    defaultMessage: "Variantes"
  });
  var variantsSubtitle = intl.formatMessage({
    id: "product.variants.selector.title",
    defaultMessage: "Selecciona la version activa"
  });
  var activeVariantLabel = intl.formatMessage({
    id: "product.active-variant.label",
    defaultMessage: "Version activa"
  });
  var backButtonLabel = intl.formatMessage({
    id: "globally.back-btn",
    defaultMessage: "Atras"
  });
  var codeLabel = intl.formatMessage({
    id: "product.product-details.code-product.label",
    defaultMessage: "Codigo"
  });
  var brandLabel = intl.formatMessage({
    id: "product.input.brand.label",
    defaultMessage: "Marca"
  });
  var stockLabel = intl.formatMessage({
    id: "product.product-in-stock.label",
    defaultMessage: "Stock"
  });
  var categoryLabel = intl.formatMessage({
    id: "product.product-details.category.label",
    defaultMessage: "Categoria"
  });
  var unitLabel = intl.formatMessage({
    id: "product.product-details.unit.label",
    defaultMessage: "Unidad"
  });
  var salePriceLabel = intl.formatMessage({
    id: "product.table.price.column.label",
    defaultMessage: "Precio venta"
  });
  var costPriceLabel = intl.formatMessage({
    id: "product.product-details.cost.label",
    defaultMessage: "Precio compra"
  });
  var taxLabel = intl.formatMessage({
    id: "product.product-details.tax.label",
    defaultMessage: "Impuesto"
  });
  var stockAlertLabel = intl.formatMessage({
    id: "product.input.stock-alert.label",
    defaultMessage: "Alerta"
  });
  var createVariationLabel = intl.formatMessage({
    id: "product.create.title",
    defaultMessage: "Crear"
  });
  var viewTooltipLabel = intl.formatMessage({
    id: "globally.view.tooltip.label"
  });
  var editTooltipLabel = intl.formatMessage({
    id: "globally.edit.tooltip.label"
  });
  var deleteTooltipLabel = intl.formatMessage({
    id: "globally.delete.tooltip.label"
  });
  var emptyNoteLabel = intl.formatMessage({
    id: "product.note.empty.label",
    defaultMessage: "Sin nota disponible"
  });
  var mobileViewStockLabel = intl.formatMessage({
    id: "product.action.view-stock.label",
    defaultMessage: "Ver stock"
  });
  var mobileManageBatchesLabel = intl.formatMessage({
    id: "product.action.manage-batches.label",
    defaultMessage: "Lotes"
  });
  var productTypeLabel = product && product.attributes ? Number(product.attributes.product_type) === 1 ? (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.getFormattedMessage)("products.type.single-type.label") : Number(product.attributes.product_type) === 2 ? (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.getFormattedMessage)("variation.title") : intl.formatMessage({
    id: "product.type.batch.label",
    defaultMessage: "Por lote"
  }) : "";
  var allProducts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _product$attributes, _product$attributes$p;

    return (product === null || product === void 0 ? void 0 : (_product$attributes = product.attributes) === null || _product$attributes === void 0 ? void 0 : (_product$attributes$p = _product$attributes.products) === null || _product$attributes$p === void 0 ? void 0 : _product$attributes$p.map(function (item) {
      return item;
    })) || [];
  }, [product]);
  var primaryProduct = allProducts[0] || null;
  var productName = (product === null || product === void 0 ? void 0 : (_product$attributes2 = product.attributes) === null || _product$attributes2 === void 0 ? void 0 : _product$attributes2.name) || "--";
  var isVariationProduct = Number(product === null || product === void 0 ? void 0 : (_product$attributes3 = product.attributes) === null || _product$attributes3 === void 0 ? void 0 : _product$attributes3.product_type) === 2;
  var hasProductRows = allProducts.length > 0;
  var hasMultipleVariants = isVariationProduct && allProducts.length > 1;
  var galleryImages = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _product$attributes4, _product$attributes4$, _product$attributes4$2;

    var imageUrls = (product === null || product === void 0 ? void 0 : (_product$attributes4 = product.attributes) === null || _product$attributes4 === void 0 ? void 0 : (_product$attributes4$ = _product$attributes4.images) === null || _product$attributes4$ === void 0 ? void 0 : (_product$attributes4$2 = _product$attributes4$.imageUrls) === null || _product$attributes4$2 === void 0 ? void 0 : _product$attributes4$2.filter(Boolean)) || [];
    return imageUrls.length > 0 ? imageUrls : [_assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_6__["default"]];
  }, [product]);
  var getVariationLabel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (item) {
    var _item$variation_produ, _item$variation_produ2;

    var variationName = (item === null || item === void 0 ? void 0 : (_item$variation_produ = item.variation_product) === null || _item$variation_produ === void 0 ? void 0 : _item$variation_produ.variation_name) || "";
    var variationTypeName = (item === null || item === void 0 ? void 0 : (_item$variation_produ2 = item.variation_product) === null || _item$variation_produ2 === void 0 ? void 0 : _item$variation_produ2.variation_type_name) || "";
    return "".concat(variationName).concat(variationName && variationTypeName ? " " : "").concat(variationTypeName).trim();
  }, []);
  var activeMobileProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!hasProductRows) {
      return null;
    }

    return allProducts.find(function (item) {
      return String(item === null || item === void 0 ? void 0 : item.id) === String(activeMobileProductId);
    }) || primaryProduct;
  }, [activeMobileProductId, allProducts, hasProductRows, primaryProduct]);
  var selectedProduct = activeMobileProduct || primaryProduct || null;
  var selectedVariationLabel = getVariationLabel(selectedProduct);
  var summaryProductName = selectedVariationLabel || productName;
  var summarySubtitle = selectedVariationLabel ? activeVariantLabel : productTypeLabel;
  var selectedProductCode = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.code) || (product === null || product === void 0 ? void 0 : (_product$attributes5 = product.attributes) === null || _product$attributes5 === void 0 ? void 0 : _product$attributes5.code) || "--";
  var selectedBrandName = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.brand_name) || (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.brand_name) || "--";
  var selectedCategoryName = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.product_category_name) || (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.product_category_name) || "--";
  var selectedUnitName = (selectedProduct === null || selectedProduct === void 0 ? void 0 : (_selectedProduct$prod = selectedProduct.product_unit_name) === null || _selectedProduct$prod === void 0 ? void 0 : _selectedProduct$prod.name) || (primaryProduct === null || primaryProduct === void 0 ? void 0 : (_primaryProduct$produ = primaryProduct.product_unit_name) === null || _primaryProduct$produ === void 0 ? void 0 : _primaryProduct$produ.name) || "--";
  var selectedStockValue = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.formatQuantityAuto)((_ref = (_selectedProduct$in_s = selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.in_stock) !== null && _selectedProduct$in_s !== void 0 ? _selectedProduct$in_s : selectedProduct === null || selectedProduct === void 0 ? void 0 : (_selectedProduct$stoc = selectedProduct.stock) === null || _selectedProduct$stoc === void 0 ? void 0 : _selectedProduct$stoc.quantity) !== null && _ref !== void 0 ? _ref : 0);
  var selectedTaxValue = "".concat((selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.order_tax) || 0, "%");
  var selectedAlertValue = selectedProduct !== null && selectedProduct !== void 0 && selectedProduct.stock_alert && (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.stock_alert) !== "null" ? (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.formatQuantityAuto)(selectedProduct.stock_alert) : (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.formatQuantityAuto)(0);
  var selectedSalePrice = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.currencySymbolHandling)(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.product_price) || 0);
  var selectedCostPrice = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.currencySymbolHandling)(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.product_cost) || 0);
  var productNote = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.notes) || (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.notes) || emptyNoteLabel;
  var desktopProductCode = (product === null || product === void 0 ? void 0 : (_product$attributes6 = product.attributes) === null || _product$attributes6 === void 0 ? void 0 : _product$attributes6.code) || "--";
  var desktopCategoryName = (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.product_category_name) || "--";
  var desktopBrandName = (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.brand_name) || "--";
  var desktopUnitName = (primaryProduct === null || primaryProduct === void 0 ? void 0 : (_primaryProduct$produ2 = primaryProduct.product_unit_name) === null || _primaryProduct$produ2 === void 0 ? void 0 : _primaryProduct$produ2.name) || "--";
  var desktopNote = (primaryProduct === null || primaryProduct === void 0 ? void 0 : primaryProduct.notes) || emptyNoteLabel;
  var priceStockFields = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [{
      key: "sale-price",
      label: salePriceLabel,
      value: selectedSalePrice,
      variant: "highlight"
    }, {
      key: "cost-price",
      label: costPriceLabel,
      value: selectedCostPrice
    }, {
      key: "tax",
      label: taxLabel,
      value: selectedTaxValue,
      variant: "muted"
    }, {
      key: "alert",
      label: stockAlertLabel,
      value: selectedAlertValue,
      variant: "muted"
    }, {
      key: "unit",
      label: unitLabel,
      value: selectedUnitName,
      variant: "badge",
      fullWidth: true
    }];
  }, [costPriceLabel, salePriceLabel, selectedAlertValue, selectedCostPrice, selectedSalePrice, selectedTaxValue, selectedUnitName, stockAlertLabel, taxLabel, unitLabel]);
  var productBaseData = primaryProduct || {};
  var availableVariationTypes = (product === null || product === void 0 ? void 0 : (_product$attributes7 = product.attributes) === null || _product$attributes7 === void 0 ? void 0 : (_product$attributes7$ = _product$attributes7.variation) === null || _product$attributes7$ === void 0 ? void 0 : (_product$attributes7$2 = _product$attributes7$.variation_types) === null || _product$attributes7$2 === void 0 ? void 0 : _product$attributes7$2.filter(function (variationType) {
    var _product$attributes8, _product$attributes8$;

    return !(product !== null && product !== void 0 && (_product$attributes8 = product.attributes) !== null && _product$attributes8 !== void 0 && (_product$attributes8$ = _product$attributes8.variation_types) !== null && _product$attributes8$ !== void 0 && _product$attributes8$.some(function (productVariationType) {
      return variationType.id === productVariationType.id && variationType.name === productVariationType.name;
    }));
  })) || [];
  var canCreateVariation = canCreateProduct && isVariationProduct && availableVariationTypes.length !== 0;
  var canDeleteVariant = canDeleteProduct && hasMultipleVariants;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchMainProduct(id);
  }, [fetchMainProduct, id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setActiveImageIndex(0);
  }, [galleryImages.length, product === null || product === void 0 ? void 0 : product.id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!hasProductRows) {
      setActiveMobileProductId(null);
      return;
    }

    var hasActiveProduct = allProducts.some(function (item) {
      return String(item === null || item === void 0 ? void 0 : item.id) === String(activeMobileProductId);
    });

    if (!hasActiveProduct) {
      var _allProducts$;

      setActiveMobileProductId(((_allProducts$ = allProducts[0]) === null || _allProducts$ === void 0 ? void 0 : _allProducts$.id) || null);
    }
  }, [activeMobileProductId, allProducts, hasProductRows]);
  var commonDataForNewProduct = {
    name: productBaseData.name,
    product_code: productBaseData.product_code,
    product_type: product === null || product === void 0 ? void 0 : (_product$attributes9 = product.attributes) === null || _product$attributes9 === void 0 ? void 0 : _product$attributes9.product_type,
    barcode_symbol: productBaseData.barcode_symbol,
    product_category_id: productBaseData.product_category_id,
    brand_id: productBaseData.brand_id,
    product_unit: productBaseData.product_unit,
    sale_unit: productBaseData.sale_unit,
    purchase_unit: productBaseData.purchase_unit,
    quantity_limit: productBaseData.quantity_limit,
    notes: productBaseData.notes,
    main_product_id: product && product.id,
    variation: product && (product === null || product === void 0 ? void 0 : (_product$attributes10 = product.attributes) === null || _product$attributes10 === void 0 ? void 0 : _product$attributes10.variation),
    variationTypes: availableVariationTypes
  };

  var openWareHouseDetailModal = function openWareHouseDetailModal(data) {
    setShowWarehouseModal(true);
    setProductData(data);
  };

  var onClickDeleteModel = function onClickDeleteModel() {
    var isDelete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setDeleteModel(!deleteModel);
    setIsDelete(isDelete);
  };

  var openEditSubProductModal = function openEditSubProductModal(data) {
    setProductData(data);
    setShowEditSubProductModal(true);
  };

  var openCreateSubProductModal = function openCreateSubProductModal() {
    setProductData(commonDataForNewProduct);
    setShowCreateSubProductModal(true);
  };

  var goToBatchManager = function goToBatchManager(productId) {
    window.location.href = "#/app/products/batches/".concat(productId);
  };

  var goToNextImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!galleryImages.length) {
      return;
    }

    setActiveImageIndex(function (currentImageIndex) {
      return (currentImageIndex + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);
  var goToPreviousImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!galleryImages.length) {
      return;
    }

    setActiveImageIndex(function (currentImageIndex) {
      return currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    });
  }, [galleryImages.length]);
  var selectImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (imageIndex) {
    setActiveImageIndex(imageIndex);
  }, []);
  var selectMobileProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    setActiveMobileProductId(productId);
  }, []);

  var renderLoadingSkeleton = function renderLoadingSkeleton() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "product-detail-skeleton",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "product-detail-skeleton-card product-detail-skeleton-card--header"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-skeleton-card product-detail-skeleton-card--gallery",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-skeleton-block product-detail-skeleton-block--title"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-skeleton-block product-detail-skeleton-block--image"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "product-detail-skeleton-dots",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            className: "product-detail-skeleton-dot"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            className: "product-detail-skeleton-dot"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            className: "product-detail-skeleton-dot"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-skeleton-card",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-skeleton-block product-detail-skeleton-block--title"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "product-detail-skeleton-grid",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--field"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--field"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--field"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--field"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--field product-detail-skeleton-block--field-wide"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-skeleton-block product-detail-skeleton-block--note"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "product-detail-skeleton-grid product-detail-skeleton-grid--actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--button"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--button"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "product-detail-skeleton-block product-detail-skeleton-block--button product-detail-skeleton-block--field-wide"
          })]
        })]
      })]
    });
  };

  var renderGallery = function renderGallery() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
      className: "product-detail-gallery-card",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-section-head product-detail-section-head--compact",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "product-detail-section-head__eyebrow",
            children: productDetailsTitle
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h2", {
            className: "product-detail-section-head__title",
            children: galleryTitle
          })]
        }), galleryImages.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
          className: "product-detail-gallery-card__counter",
          children: [activeImageIndex + 1, "/", galleryImages.length]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-gallery-shell",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
          type: "button",
          className: "product-detail-gallery-nav product-detail-gallery-nav--prev",
          onClick: goToPreviousImage,
          "aria-label": "Imagen anterior",
          disabled: galleryImages.length <= 1,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faChevronLeft
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-gallery-stage",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_19__["default"], {
            src: galleryImages[activeImageIndex],
            alt: summaryProductName || productTitleLabel,
            className: "product-detail-gallery-image",
            loading: "lazy",
            decoding: "async"
          }, "gallery-image-".concat(activeImageIndex))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
          type: "button",
          className: "product-detail-gallery-nav product-detail-gallery-nav--next",
          onClick: goToNextImage,
          "aria-label": "Imagen siguiente",
          disabled: galleryImages.length <= 1,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faChevronRight
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "product-detail-gallery-dots",
        "aria-label": "Indicadores de imagen",
        children: galleryImages.map(function (imageSrc, imageIndex) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
            type: "button",
            className: "product-detail-gallery-dot ".concat(imageIndex === activeImageIndex ? "product-detail-gallery-dot--active" : ""),
            "aria-label": "Ver imagen ".concat(imageIndex + 1),
            "aria-current": imageIndex === activeImageIndex,
            onClick: function onClick() {
              return selectImage(imageIndex);
            }
          }, "".concat(imageSrc, "-").concat(imageIndex));
        })
      })]
    });
  };

  var renderDesktopGallery = function renderDesktopGallery() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
      className: "product-detail-desktop-media",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-desktop-gallery-shell",
        children: [galleryImages.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
          type: "button",
          className: "product-detail-gallery-nav product-detail-gallery-nav--prev",
          onClick: goToPreviousImage,
          "aria-label": "Imagen anterior",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faChevronLeft
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "product-detail-desktop-gallery-stage",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_19__["default"], {
            src: galleryImages[activeImageIndex],
            alt: productName || productTitleLabel,
            className: "product-detail-desktop-gallery-image",
            loading: "eager",
            decoding: "sync"
          }, "desktop-gallery-image-".concat(activeImageIndex))
        }), galleryImages.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
          type: "button",
          className: "product-detail-gallery-nav product-detail-gallery-nav--next",
          onClick: goToNextImage,
          "aria-label": "Imagen siguiente",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faChevronRight
          })
        })]
      })
    });
  };

  var renderLegacyDesktopActions = function renderLegacyDesktopActions(data) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "text-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
        type: "button",
        title: viewTooltipLabel,
        className: "btn text-success px-2 fs-3 ps-0 border-0 shadow-none",
        onClick: function onClick(e) {
          e.stopPropagation();
          openWareHouseDetailModal(data);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faEye
        })
      }), canUpdateProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
        type: "button",
        title: editTooltipLabel,
        className: "btn text-primary px-2 fs-3 ps-0 border-0 shadow-none",
        onClick: function onClick(e) {
          e.stopPropagation();
          openEditSubProductModal(data);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faEdit
        })
      }), canManageBatches && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
        type: "button",
        title: mobileManageBatchesLabel,
        className: "btn px-2 fs-3 ps-0 border-0 shadow-none",
        style: {
          color: "#6571FF"
        },
        onClick: function onClick(e) {
          e.stopPropagation();
          goToBatchManager(data.id);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faBoxOpen
        })
      }), canDeleteVariant && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("button", {
        type: "button",
        title: deleteTooltipLabel,
        className: "btn text-danger px-2 fs-3 ps-0 border-0 shadow-none",
        onClick: function onClick(e) {
          e.stopPropagation();
          onClickDeleteModel(data);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faTrash
        })
      })]
    });
  };

  var renderQuickActions = function renderQuickActions(data) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
      className: "product-detail-actions-card",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "product-detail-section-head product-detail-section-head--compact",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "product-detail-section-head__eyebrow",
            children: productDetailsTitle
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
            className: "product-detail-section-head__title",
            children: quickActionsTitle
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-actions-grid",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("button", {
          type: "button",
          className: "btn product-detail-action-button product-detail-action-button--success",
          onClick: function onClick() {
            return openWareHouseDetailModal(data);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faEye
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            children: mobileViewStockLabel
          })]
        }), canUpdateProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("button", {
          type: "button",
          className: "btn product-detail-action-button product-detail-action-button--primary",
          onClick: function onClick() {
            return openEditSubProductModal(data);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faEdit
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            children: editTooltipLabel
          })]
        }), canManageBatches && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("button", {
          type: "button",
          className: "btn product-detail-action-button product-detail-action-button--indigo product-detail-action-button--span-full",
          onClick: function onClick() {
            return goToBatchManager(data.id);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faBoxOpen
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            children: mobileManageBatchesLabel
          })]
        }), canDeleteVariant && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("button", {
          type: "button",
          className: "btn product-detail-action-button product-detail-action-button--danger product-detail-action-button--span-full",
          onClick: function onClick() {
            return onClickDeleteModel(data);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faTrash
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            children: deleteTooltipLabel
          })]
        })]
      })]
    });
  };

  var renderVariantSelector = function renderVariantSelector() {
    if (!isVariationProduct || !hasMultipleVariants && !canCreateVariation) {
      return null;
    }

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
      className: "product-detail-variant-card d-md-none",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-section-head product-detail-section-head--compact",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "product-detail-section-head__eyebrow",
            children: variantsTitle
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
            className: "product-detail-section-head__title",
            children: variantsSubtitle
          })]
        }), hasMultipleVariants && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
          className: "product-detail-variant-card__count",
          children: allProducts.length
        })]
      }), hasMultipleVariants && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "product-detail-variant-list",
        children: allProducts.map(function (data, index) {
          var _ref2, _data$in_stock, _data$stock;

          var isActiveProduct = String(data === null || data === void 0 ? void 0 : data.id) === String(selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.id);
          var variantLabel = getVariationLabel(data) || productName;
          var variantPrice = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.currencySymbolHandling)(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, (data === null || data === void 0 ? void 0 : data.product_price) || 0);
          var variantStock = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.formatQuantityAuto)((_ref2 = (_data$in_stock = data === null || data === void 0 ? void 0 : data.in_stock) !== null && _data$in_stock !== void 0 ? _data$in_stock : data === null || data === void 0 ? void 0 : (_data$stock = data.stock) === null || _data$stock === void 0 ? void 0 : _data$stock.quantity) !== null && _ref2 !== void 0 ? _ref2 : 0);
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("button", {
            type: "button",
            className: "product-detail-variant-item ".concat(isActiveProduct ? "product-detail-variant-item--active" : ""),
            onClick: function onClick() {
              return selectMobileProduct(data === null || data === void 0 ? void 0 : data.id);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "product-detail-variant-item__copy",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                children: variantLabel
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                children: variantPrice
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
              className: "product-detail-variant-item__stock",
              children: [stockLabel, ": ", variantStock]
            })]
          }, (data === null || data === void 0 ? void 0 : data.id) || index);
        })
      }), canCreateVariation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__["default"], {
        type: "button",
        variant: "primary",
        onClick: openCreateSubProductModal,
        className: "product-detail-create-button",
        children: createVariationLabel
      })]
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_MasterLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "product-detail-page",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_8__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "d-none d-md-block product-detail-desktop-header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
          title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.getFormattedMessage)("product.product-details.title"),
          to: "/app/products"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: productDetailsTitle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "product-detail-topbar d-md-none",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "product-detail-topbar__copy",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "product-detail-topbar__eyebrow",
            children: productTitleLabel
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h1", {
            className: "product-detail-topbar__title",
            children: productDetailsTitle
          }), !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "product-detail-topbar__subtitle",
            children: productName
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Link, {
          to: "/app/products",
          className: "product-detail-back-button",
          "aria-label": backButtonLabel,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_18__.faChevronLeft
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            children: backButtonLabel
          })]
        })]
      }), isLoading ? renderLoadingSkeleton() : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "d-md-none",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "product-detail-overview-grid",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
              children: renderGallery()
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "product-detail-overview-stack",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "product-detail-summary-card",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "product-detail-section-head product-detail-section-head--compact",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                      className: "product-detail-section-head__eyebrow",
                      children: summaryTitleLabel
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h2", {
                      className: "product-detail-section-head__title",
                      children: summaryProductName
                    }), summarySubtitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                      className: "product-detail-section-head__description",
                      children: summarySubtitle
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "product-detail-summary-card__meta",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "product-detail-meta-chip",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                      className: "product-detail-meta-chip__label",
                      children: codeLabel
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                      children: selectedProductCode
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "product-detail-meta-chip",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                      className: "product-detail-meta-chip__label",
                      children: brandLabel
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                      children: selectedBrandName
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "product-detail-stock-badge",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                      className: "product-detail-stock-badge__label",
                      children: stockLabel
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                      children: selectedStockValue
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "product-detail-summary-card__tags",
                  children: [selectedCategoryName !== "--" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
                    className: "product-detail-tag",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                      className: "product-detail-tag__label",
                      children: categoryLabel
                    }), selectedCategoryName]
                  }), productTypeLabel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    className: "product-detail-tag product-detail-tag--muted",
                    children: productTypeLabel
                  })]
                })]
              }), renderVariantSelector(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "product-detail-metrics-card",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "product-detail-section-head product-detail-section-head--compact",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                      className: "product-detail-section-head__eyebrow",
                      children: priceStockTitle
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      className: "product-detail-section-head__title",
                      children: priceStockTitle
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "product-detail-metric-grid",
                  children: priceStockFields.map(function (field) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      className: "product-detail-metric-card ".concat(field.variant === "highlight" ? "product-detail-metric-card--highlight" : "", " ").concat(field.variant === "muted" ? "product-detail-metric-card--muted" : "", " ").concat(field.fullWidth ? "product-detail-metric-card--full" : ""),
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                        className: "product-detail-metric-card__label",
                        children: field.label
                      }), field.variant === "badge" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                        className: "product-detail-unit-badge",
                        children: field.value
                      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                        className: "product-detail-metric-card__value",
                        children: field.value
                      })]
                    }, field.key);
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "product-detail-note-card",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "product-detail-section-head product-detail-section-head--compact",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                      className: "product-detail-section-head__eyebrow",
                      children: productDetailsTitle
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      className: "product-detail-section-head__title",
                      children: notePanelTitle
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "product-detail-note-copy",
                  children: productNote
                })]
              }), selectedProduct && renderQuickActions(selectedProduct)]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "d-none d-md-block",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "card card-body product-detail-desktop-card",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "col-xxl-7",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("table", {
                  className: "table gy-7 main-product-details product-detail-desktop-main-table mb-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tbody", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: codeLabel
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: desktopProductCode
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: productTitleLabel
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: productName
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.getFormattedMessage)("product.type.label")
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: productTypeLabel || "--"
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: categoryLabel
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: desktopCategoryName
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: brandLabel
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: desktopBrandName
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: unitLabel
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: desktopUnitName !== "--" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                          className: "badge bg-light-success",
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                            children: desktopUnitName
                          })
                        }) : desktopUnitName
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                        className: "py-4",
                        scope: "row",
                        children: notePanelTitle
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                        className: "py-4",
                        children: desktopNote
                      })]
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "col-xxl-5 d-flex justify-content-center m-auto",
                children: renderDesktopGallery()
              })]
            })
          }), hasProductRows && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "card card-body mt-2 product-detail-desktop-table-card",
            children: [canCreateVariation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
              className: "text-end mb-2",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__["default"], {
                type: "button",
                variant: "primary",
                onClick: openCreateSubProductModal,
                className: "btn-light-primary",
                children: createVariationLabel
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__["default"], {
              responsive: "md",
              className: "product-detail-desktop-table",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("thead", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                  children: [isVariationProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    children: variantsTitle
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    children: costPriceLabel
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    children: salePriceLabel
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    children: taxLabel
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    children: stockAlertLabel
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
                    className: "text-center",
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.getFormattedMessage)("react-data-table.action.column.label")
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("tbody", {
                children: allProducts.map(function (data, index) {
                  var variantLabel = getVariationLabel(data) || productName;
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
                    children: [isVariationProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                      className: "py-4",
                      children: variantLabel
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                      className: "py-4",
                      children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.currencySymbolHandling)(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, (data === null || data === void 0 ? void 0 : data.product_cost) || 0)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                      className: "py-4",
                      children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_7__.currencySymbolHandling)(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, (data === null || data === void 0 ? void 0 : data.product_price) || 0)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("td", {
                      className: "py-4",
                      children: [(data === null || data === void 0 ? void 0 : data.order_tax) || 0, "%"]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                      className: "py-4",
                      children: data !== null && data !== void 0 && data.stock_alert && (data === null || data === void 0 ? void 0 : data.stock_alert) !== "null" ? data.stock_alert : 0
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
                      className: "py-4",
                      children: renderLegacyDesktopActions(data)
                    })]
                  }, (data === null || data === void 0 ? void 0 : data.id) || index);
                })
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_DeleteProduct__WEBPACK_IMPORTED_MODULE_12__["default"], {
          onClickDeleteModel: onClickDeleteModel,
          deleteModel: deleteModel,
          onDelete: isDelete
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_CreateSubProductModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
          show: showCreateSubProductModal,
          setShow: setShowCreateSubProductModal,
          commonData: commonDataForNewProduct
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_EditSubProductModal__WEBPACK_IMPORTED_MODULE_11__["default"], {
          show: showEditSubProductModal,
          setShow: setShowEditSubProductModal,
          productData: productData
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_WareHouseDetailsModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
          show: showWarehouseModal,
          productData: productData,
          setShow: setShowWarehouseModal
        })]
      })]
    })
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var products = state.products,
      isLoading = state.isLoading,
      frontSetting = state.frontSetting,
      allConfigData = state.allConfigData;
  return {
    products: products,
    isLoading: isLoading,
    frontSetting: frontSetting,
    allConfigData: allConfigData
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  fetchMainProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_5__.fetchMainProduct
})(ProductDetail));

/***/ }),

/***/ "./resources/pos/src/components/product/WareHouseDetailsModal.js":
/*!***********************************************************************!*\
  !*** ./resources/pos/src/components/product/WareHouseDetailsModal.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Image.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Table.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var WareHouseDetailsModal = function WareHouseDetailsModal(props) {
  var show = props.show,
      productData = props.productData,
      setShow = props.setShow;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      warehouse = _useState2[0],
      setWarehouse = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      product = _useState4[0],
      setProduct = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (show) {
      var _warehouse = productData && productData.warehouse && productData.warehouse.map(function (item) {
        return item;
      });

      setWarehouse(_warehouse);
      setProduct(productData);
    }
  }, [show]);

  var clearField = function clearField() {
    setShow(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__["default"], {
    show: show,
    size: "xl",
    onHide: clearField,
    keyboard: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__["default"].Title, {
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("products.warehouse.title")
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__["default"].Body, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "col-md-12",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "text-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"], {
            src: product && product.barcode_url,
            alt: product && product.name,
            className: "product_brcode"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "mt-3",
            children: product && product.code
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "mt-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_5__["default"], {
            responsive: "md",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("thead", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
                  children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("dashboard.stockAlert.warehouse.label")
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
                  children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("dashboard.stockAlert.quantity.label")
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("tbody", {
              children: warehouse && warehouse.length ? warehouse.map(function (item, index) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                    className: "py-4",
                    children: item.name
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                    className: "py-4",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                        className: "badge bg-light-info me-2",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                          children: item.total_quantity
                        })
                      }), product.product_unit === "1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                        className: "badge bg-light-success me-2",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                          children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("unit.filter.piece.label")
                        })
                      }) || product.product_unit === "2" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                        className: "badge bg-light-primary me-2",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                          children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("unit.filter.meter.label")
                        })
                      }) || product.product_unit === "3" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                        className: "badge bg-light-warning me-2",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                          children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("unit.filter.kilogram.label")
                        })
                      })]
                    })
                  })]
                }, index);
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("tr", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                  colSpan: "2",
                  className: "text-center",
                  children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)("react-data-table.no-record-found.label")
                })
              })
            })]
          })
        })
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WareHouseDetailsModal);

/***/ })

}]);