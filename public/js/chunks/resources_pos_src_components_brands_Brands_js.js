"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_brands_Brands_js"],{

/***/ "./resources/pos/src/components/brands/Brands.js":
/*!*******************************************************!*\
  !*** ./resources/pos/src/components/brands/Brands.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/table/ReactDataTable */ "./resources/pos/src/shared/table/ReactDataTable.js");
/* harmony import */ var _shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/action-buttons/ActionButton */ "./resources/pos/src/shared/action-buttons/ActionButton.js");
/* harmony import */ var _DeleteBrands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DeleteBrands */ "./resources/pos/src/components/brands/DeleteBrands.js");
/* harmony import */ var _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/images/brand_logo.png */ "./resources/pos/src/assets/images/brand_logo.png");
/* harmony import */ var _CreateBrands_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CreateBrands.js */ "./resources/pos/src/components/brands/CreateBrands.js");
/* harmony import */ var _EditBrands__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EditBrands */ "./resources/pos/src/components/brands/EditBrands.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


















var Brands = function Brands() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state;
  }),
      brands = _useSelector.brands,
      totalRecord = _useSelector.totalRecord,
      isLoading = _useSelector.isLoading,
      isCallBrandApi = _useSelector.isCallBrandApi;

  var Dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      deleteModel = _useState2[0],
      setDeleteModel = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      isDelete = _useState4[0],
      setIsDelete = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      edit = _useState6[0],
      setEdit = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      brand = _useState8[0],
      setBrand = _useState8[1];

  var updatedLanguage = localStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_12__.Tokens.UPDATED_LANGUAGE);

  var handleClose = function handleClose(item) {
    setEdit(!edit);
    setBrand(item);
  };

  var onClickDeleteModel = function onClickDeleteModel() {
    var isDelete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setDeleteModel(!deleteModel);
    setIsDelete(isDelete);
  };

  var onChange = function onChange(filter) {
    Dispatch((0,_store_action_brandsAction__WEBPACK_IMPORTED_MODULE_3__.fetchBrands)(filter, true));
  };

  var itemsValue = brands.length >= 0 && brands.map(function (item) {
    return {
      name: item.attributes.name,
      image: item.attributes.image,
      product_count: item.attributes.product_count,
      id: item.id
    };
  });
  var columns = [{
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_11__.getFormattedMessage)('brand.table.brand-name.column.label'),
    selector: function selector(row) {
      return row.name;
    },
    sortable: true,
    sortField: 'name',
    cell: function cell(row) {
      var imageUrl = row.image ? row.image : _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_7__["default"];
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "me-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("img", {
            src: imageUrl,
            height: "50",
            width: "50",
            alt: "Brand Image",
            className: "image image-circle image-mini"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "d-flex flex-column",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
            children: row.name
          })
        })]
      });
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_11__.getFormattedMessage)('brand.table.product-count.column.label'),
    selector: function selector(row) {
      return row.product_count;
    },
    style: updatedLanguage === 'ar' ? {
      paddingRight: '87px'
    } : {
      paddingLeft: '130px'
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_11__.getFormattedMessage)('react-data-table.action.column.label'),
    right: true,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: function cell(row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
        item: row,
        goToEditProduct: handleClose,
        isEditMode: true,
        onClickDeleteModel: onClickDeleteModel
      });
    }
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_13__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_11__.placeholderText)('brands.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
      columns: columns,
      items: itemsValue,
      onChange: onChange,
      AddButton: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_CreateBrands_js__WEBPACK_IMPORTED_MODULE_8__["default"], {}),
      totalRows: totalRecord,
      isLoading: isLoading,
      isCallBrandApi: isCallBrandApi
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_EditBrands__WEBPACK_IMPORTED_MODULE_9__["default"], {
      handleClose: handleClose,
      show: edit,
      brand: brand
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_DeleteBrands__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      onDelete: isDelete
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Brands);

/***/ }),

/***/ "./resources/pos/src/components/brands/BrandsFrom.js":
/*!***********************************************************!*\
  !*** ./resources/pos/src/components/brands/BrandsFrom.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _shared_image_picker_ImagePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/image-picker/ImagePicker */ "./resources/pos/src/shared/image-picker/ImagePicker.js");
/* harmony import */ var _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/images/brand_logo.png */ "./resources/pos/src/assets/images/brand_logo.png");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/modelFooter */ "./resources/pos/src/shared/components/modelFooter.js");
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













var BrandsFrom = function BrandsFrom(props) {
  var handleClose = props.handleClose,
      show = props.show,
      title = props.title,
      addBrandData = props.addBrandData,
      editBrand = props.editBrand,
      singleBrand = props.singleBrand;
  var innerRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: singleBrand ? singleBrand.name : '',
    image: singleBrand ? singleBrand.image : ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      formValue = _useState2[0],
      setFormValue = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: ''
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var editImg = singleBrand ? singleBrand.image : _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"];
  var newImg = formValue.image === false ? _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"] : editImg;

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(newImg),
      _useState6 = _slicedToArray(_useState5, 2),
      imagePreviewUrl = _useState6[0],
      setImagePreviewUrl = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      selectImg = _useState8[0],
      setSelectImg = _useState8[1];

  var disabled = selectImg ? false : singleBrand && singleBrand.name === formValue.name.trim();

  var handleImageChanges = function handleImageChanges(e) {
    e.preventDefault();

    if (e.target.files.length > 0) {
      var file = e.target.files[0];

      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setSelectImg(file);
        var fileReader = new FileReader();

        fileReader.onloadend = function () {
          setImagePreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(file);
        setErrors('');
      }
    }
  };

  var handleValidation = function handleValidation() {
    var errorss = {};
    var isValid = false;

    if (!formValue['name'].trim()) {
      errorss['name'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.getFormattedMessage)('globally.input.name.validate.label');
    } else if (formValue['name'] && formValue['name'].length > 50) {
      errorss['name'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.getFormattedMessage)('brand.input.name.valid.validate.label');
    } else {
      isValid = true;
    }

    setErrors(errorss);
    return isValid;
  };

  var onChangeInput = function onChangeInput(e) {
    e.preventDefault();
    setFormValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors('');
  };

  var prepareFormData = function prepareFormData(data) {
    var formData = new FormData();
    formData.append('name', data.name);

    if (selectImg) {
      formData.append('image', data.image);
    }

    return formData;
  };

  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var valid = handleValidation();
    formValue.image = selectImg;

    if (singleBrand && valid) {
      if (!disabled) {
        formValue.image = selectImg;
        editBrand(singleBrand.id, prepareFormData(formValue), handleClose);
        clearField(false);
      }
    } else {
      if (valid) {
        setFormValue(formValue);
        addBrandData(prepareFormData(formValue));
        clearField(false);
      }
    }

    setSelectImg(null);
  };

  var clearField = function clearField() {
    setFormValue({
      name: '',
      image: ''
    });
    setImagePreviewUrl(_assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
    setErrors('');
    handleClose(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
    show: show,
    onHide: clearField,
    keyboard: true,
    onShow: function onShow() {
      return setTimeout(function () {
        innerRef.current.focus();
      }, 1);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onKeyPress: function onKeyPress(e) {
        if (e.key === 'Enter') {
          onSubmit(e);
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Header, {
        closeButton: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Title, {
          children: title
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"].Body, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "col-md-12 mb-5",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
              className: "form-label",
              children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.getFormattedMessage)('globally.input.name.label'), ": "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "required"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              type: "text",
              name: "name",
              autoComplete: "off",
              placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.placeholderText)('globally.input.name.placeholder.label'),
              className: "form-control",
              ref: innerRef,
              value: formValue.name,
              onChange: function onChange(e) {
                return onChangeInput(e);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "text-danger d-block fw-400 fs-small mt-2",
              children: errors['name'] ? errors['name'] : null
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_image_picker_ImagePicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
            imagePreviewUrl: imagePreviewUrl,
            handleImageChange: handleImageChanges,
            user: _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_4__["default"],
            imageTitle: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.placeholderText)('globally.input.change-logo.tooltip')
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onEditRecord: singleBrand,
      onSubmit: onSubmit,
      editDisabled: disabled,
      clearField: clearField,
      addDisabled: !formValue.name.trim()
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  fetchBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.fetchBrand,
  editBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.editBrand
})(BrandsFrom));

/***/ }),

/***/ "./resources/pos/src/components/brands/CreateBrands.js":
/*!*************************************************************!*\
  !*** ./resources/pos/src/components/brands/CreateBrands.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _BrandsFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BrandsFrom */ "./resources/pos/src/components/brands/BrandsFrom.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var CreateBrands = function CreateBrands() {
  var Dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var handleClose = function handleClose() {
    return setShow(!show);
  };

  var addBrandData = function addBrandData(formValue) {
    Dispatch((0,_store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.addBrand)(formValue, _constants__WEBPACK_IMPORTED_MODULE_4__.Filters.OBJ));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "text-end w-sm-auto w-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
      variant: "primary mb-lg-0 mb-md-0 mb-4",
      onClick: handleClose,
      children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.getFormattedMessage)('brand.create.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_BrandsFrom__WEBPACK_IMPORTED_MODULE_3__["default"], {
      addBrandData: addBrandData,
      handleClose: handleClose,
      show: show,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_5__.getFormattedMessage)('brand.create.title')
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateBrands);

/***/ }),

/***/ "./resources/pos/src/components/brands/DeleteBrands.js":
/*!*************************************************************!*\
  !*** ./resources/pos/src/components/brands/DeleteBrands.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/action-buttons/DeleteModel */ "./resources/pos/src/shared/action-buttons/DeleteModel.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var DeleteBrands = function DeleteBrands(props) {
  var deleteBrand = props.deleteBrand,
      onDelete = props.onDelete,
      deleteModel = props.deleteModel,
      onClickDeleteModel = props.onClickDeleteModel;

  var deleteUserClick = function deleteUserClick() {
    deleteBrand(onDelete.id);
    onClickDeleteModel(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    children: deleteModel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      deleteUserClick: deleteUserClick,
      title: "Delete Brand",
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('brand.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  deleteBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.deleteBrand
})(DeleteBrands));

/***/ }),

/***/ "./resources/pos/src/components/brands/EditBrands.js":
/*!***********************************************************!*\
  !*** ./resources/pos/src/components/brands/EditBrands.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _BrandsFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BrandsFrom */ "./resources/pos/src/components/brands/BrandsFrom.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var EditBrands = function EditBrands(props) {
  var handleClose = props.handleClose,
      show = props.show,
      brand = props.brand;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: brand && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_BrandsFrom__WEBPACK_IMPORTED_MODULE_3__["default"], {
      handleClose: handleClose,
      show: show,
      singleBrand: brand,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('brand.edit.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  fetchBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.fetchBrand
})(EditBrands));

/***/ })

}]);