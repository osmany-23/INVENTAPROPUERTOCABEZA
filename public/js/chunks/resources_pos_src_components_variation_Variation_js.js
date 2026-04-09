"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_variation_Variation_js"],{

/***/ "./resources/pos/src/components/variation/CreateVariation.js":
/*!*******************************************************************!*\
  !*** ./resources/pos/src/components/variation/CreateVariation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_variationAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/variationAction */ "./resources/pos/src/store/action/variationAction.js");
/* harmony import */ var _VariationForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VariationForm */ "./resources/pos/src/components/variation/VariationForm.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var CreateVariation = function CreateVariation(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var handleClose = function handleClose() {
    return setShow(!show);
  };

  var addVariationData = function addVariationData(variation) {
    dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_2__.createVariation)(variation));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "text-end w-sm-auto w-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"], {
      variant: "primary mb-lg-0 mb-md-0 mb-4",
      onClick: handleClose,
      children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('variation.create.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_VariationForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
      addVariationData: addVariationData,
      handleClose: handleClose,
      show: show,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('variation.create.title')
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateVariation);

/***/ }),

/***/ "./resources/pos/src/components/variation/DeleteVariation.js":
/*!*******************************************************************!*\
  !*** ./resources/pos/src/components/variation/DeleteVariation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/action-buttons/DeleteModel */ "./resources/pos/src/shared/action-buttons/DeleteModel.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _store_action_variationAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/action/variationAction */ "./resources/pos/src/store/action/variationAction.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var DeleteVariation = function DeleteVariation(props) {
  var onDelete = props.onDelete,
      deleteModel = props.deleteModel,
      onClickDeleteModel = props.onClickDeleteModel;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var onClickDelete = function onClickDelete() {
    dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_4__.deleteVariation)(onDelete.id));
    onClickDeleteModel(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    children: deleteModel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      deleteUserClick: onClickDelete,
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)('variation.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteVariation);

/***/ }),

/***/ "./resources/pos/src/components/variation/EditVariation.js":
/*!*****************************************************************!*\
  !*** ./resources/pos/src/components/variation/EditVariation.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _VariationForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VariationForm */ "./resources/pos/src/components/variation/VariationForm.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var EditVariation = function EditVariation(props) {
  var handleClose = props.handleClose,
      show = props.show,
      variation = props.variation;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: variation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_VariationForm__WEBPACK_IMPORTED_MODULE_1__["default"], {
      handleClose: handleClose,
      show: show,
      singleVariation: variation,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)('variation.edit.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditVariation);

/***/ }),

/***/ "./resources/pos/src/components/variation/Variation.js":
/*!*************************************************************!*\
  !*** ./resources/pos/src/components/variation/Variation.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/table/ReactDataTable */ "./resources/pos/src/shared/table/ReactDataTable.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _CreateVariation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CreateVariation */ "./resources/pos/src/components/variation/CreateVariation.js");
/* harmony import */ var _store_action_variationAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/action/variationAction */ "./resources/pos/src/store/action/variationAction.js");
/* harmony import */ var _shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/action-buttons/ActionButton */ "./resources/pos/src/shared/action-buttons/ActionButton.js");
/* harmony import */ var _EditVariation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditVariation */ "./resources/pos/src/components/variation/EditVariation.js");
/* harmony import */ var _DeleteVariation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DeleteVariation */ "./resources/pos/src/components/variation/DeleteVariation.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var Variation = function Variation(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state;
  }),
      variations = _useSelector.variations,
      isLoading = _useSelector.isLoading,
      totalRecord = _useSelector.totalRecord;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      editModel = _useState2[0],
      setEditModel = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      deleteModel = _useState4[0],
      setDeleteModel = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      isDelete = _useState6[0],
      setIsDelete = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      variation = _useState8[0],
      setVariation = _useState8[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_8__.fetchVariations)());
  }, []);

  var handleClose = function handleClose(item) {
    setEditModel(!editModel);
    setVariation(item);
  };

  var onClickDeleteModel = function onClickDeleteModel() {
    var isDelete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setDeleteModel(!deleteModel);
    setIsDelete(isDelete);
  };

  var onChange = function onChange(filter) {
    dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_8__.fetchVariations)(filter, true));
  };

  var itemsValue = variations.length >= 0 && variations.map(function (variation) {
    return {
      name: variation.attributes.name,
      id: variation.id,
      variation_types: variation.attributes.variation_types
    };
  });
  var columns = [{
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.placeholderText)('variation.name'),
    selector: function selector(row) {
      return row.name;
    },
    sortField: 'name',
    sortable: true
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.placeholderText)('variation.variation_types'),
    selector: function selector(row) {
      return row.variation_types.map(function (type) {
        return type.name;
      }).join(' , ');
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)('react-data-table.action.column.label'),
    right: true,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: function cell(row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_9__["default"], {
        item: row,
        goToEditProduct: handleClose,
        isEditMode: true,
        onClickDeleteModel: onClickDeleteModel
      });
    }
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_3__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.placeholderText)('variations.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_5__["default"], {
      columns: columns,
      items: itemsValue,
      onChange: onChange,
      isLoading: isLoading,
      AddButton: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_CreateVariation__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
      totalRows: totalRecord
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_EditVariation__WEBPACK_IMPORTED_MODULE_10__["default"], {
      handleClose: handleClose,
      show: editModel,
      variation: variation
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_DeleteVariation__WEBPACK_IMPORTED_MODULE_11__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      onDelete: isDelete
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Variation);

/***/ }),

/***/ "./resources/pos/src/components/variation/VariationForm.js":
/*!*****************************************************************!*\
  !*** ./resources/pos/src/components/variation/VariationForm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/modelFooter */ "./resources/pos/src/shared/components/modelFooter.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _store_action_variationAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/action/variationAction */ "./resources/pos/src/store/action/variationAction.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var VariationForm = function VariationForm(props) {
  var _variationTypes$slice;

  var handleClose = props.handleClose,
      show = props.show,
      title = props.title,
      singleVariation = props.singleVariation;
  var innerRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    id: singleVariation ? singleVariation.id : "",
    name: singleVariation ? singleVariation.name : "",
    variation_types: singleVariation ? singleVariation.variation_types : []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      variationValue = _useState2[0],
      setVariationValue = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
    name: ""
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      variationTypes = _useState4[0],
      setVariationTypes = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      deletedVariationTypes = _useState6[0],
      setDeletedVariationTypes = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: "",
    variation_types: ""
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      errors = _useState8[0],
      setErrors = _useState8[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (singleVariation) {
      setVariationTypes(singleVariation.variation_types);
    }
  }, [singleVariation]);

  var handleValidation = function handleValidation() {
    var error = {};
    var isValid = false;

    if (!variationValue["name"].trim()) {
      error["name"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("globally.input.name.validate.label");
    } else if (variationTypes && variationTypes.filter(function (item) {
      return item.name.trim() == "";
    }).length) {
      error["variation_types"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("variation.type.input.name.validate.label");
    } else {
      isValid = true;
    }

    setErrors(error);
    return isValid;
  };

  var onChangeInput = function onChangeInput(e) {
    e.preventDefault();
    setVariationValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors("");
  };

  var prepareFormData = function prepareFormData(variationValue) {
    return _objectSpread(_objectSpread({}, variationValue), {}, {
      variation_types: variationTypes,
      deleted_variation_types: deletedVariationTypes
    });
  };

  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var valid = handleValidation();

    if (singleVariation && valid) {
      var updatedVariationTypes = [].concat(_toConsumableArray(variationTypes), _toConsumableArray(deletedVariationTypes));
      dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_5__.updateVariation)(singleVariation.id, prepareFormData(_objectSpread(_objectSpread({}, variationValue), {}, {
        variation_types: updatedVariationTypes
      })), clearField));
    } else {
      if (valid) {
        setVariationValue(variationValue);
        dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_5__.createVariation)(prepareFormData(_objectSpread(_objectSpread({}, variationValue), {}, {
          variation_types: variationTypes
        })), clearField));
      }
    }
  };

  var clearField = function clearField() {
    setVariationValue({
      name: "",
      variation_types: []
    });
    setVariationTypes([{
      name: ""
    }]);
    setErrors("");
    handleClose(false);
  };

  var addVariationType = function addVariationType() {
    setVariationTypes([].concat(_toConsumableArray(variationTypes), [{
      name: ""
    }]));
  };

  var removeVariationType = function removeVariationType() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var variationType = arguments.length > 1 ? arguments[1] : undefined;

    var list = _toConsumableArray(variationTypes);

    list.splice(index, 1);
    setVariationTypes(list);

    if (variationType.id) {
      setDeletedVariationTypes([].concat(_toConsumableArray(deletedVariationTypes), [{
        id: variationType.id,
        name: variationType.name
      }]));
    }
  };

  var onChangeVariationTypesInput = function onChangeVariationTypesInput(e, index) {
    e.preventDefault();
    setVariationTypes(function (variationTypes) {
      variationTypes[index].name = e.target.value;
      return _toConsumableArray(variationTypes);
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
    show: show,
    onHide: clearField,
    keyboard: true,
    onShow: function onShow() {
      return setTimeout(function () {
        if (innerRef.current) {
          innerRef.current.focus();
        }
      }, 1);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onKeyPress: function onKeyPress(e) {
        if (e.key === "Enter") {
          singleVariation ? onEdit(e) : onSubmit(e);
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"].Header, {
        closeButton: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"].Title, {
          children: title
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"].Body, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "row",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "col-md-12 ",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
              className: "form-label",
              children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("globally.input.name.label"), ":", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "required"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "text-danger d-block fw-400 fs-small mt-2",
              children: errors["name"] ? errors["name"] : null
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
              type: "text",
              name: "name",
              placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("globally.input.name.placeholder.label"),
              className: "form-control mb-3",
              ref: innerRef,
              autoComplete: "off",
              onChange: function onChange(e) {
                return onChangeInput(e);
              },
              value: variationValue.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("label", {
              className: "form-label mt-2 mb-0",
              children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("variation.types.title"), ":", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "required"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "text-danger d-block fw-400 fs-small my-2",
              children: errors["variation_types"] ? errors["variation_types"] : null
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-10",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                  type: "text",
                  name: "variation_types",
                  placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("variation.type.input.name.placeholder.label"),
                  className: "form-control",
                  ref: innerRef,
                  autoComplete: "off",
                  onChange: function onChange(e) {
                    return onChangeVariationTypesInput(e, 0);
                  },
                  value: variationTypes[0].name
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "col-md-2",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                  type: "button",
                  className: "btn btn-primary w-100 h-100 p-0 d-flex justify-content-center align-items-center",
                  onClick: addVariationType,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faPlus
                  })
                })
              })]
            }), (_variationTypes$slice = variationTypes.slice(1)) === null || _variationTypes$slice === void 0 ? void 0 : _variationTypes$slice.map(function (variationType, index) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "row mt-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "col-md-10",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
                    type: "text",
                    name: "variation_types",
                    placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("variation.type.input.name.placeholder.label"),
                    className: "form-control",
                    ref: innerRef,
                    autoComplete: "off",
                    onChange: function onChange(e) {
                      return onChangeVariationTypesInput(e, index + 1);
                    },
                    value: variationType.name
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "col-md-2",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                    type: "button",
                    className: "btn btn-danger w-100 h-100 p-0 d-flex justify-content-center align-items-center",
                    onClick: function onClick() {
                      return removeVariationType(index + 1, variationType);
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
                      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faTrash
                    })
                  })
                })]
              }, index + 1);
            })]
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onEditRecord: singleVariation,
      onSubmit: onSubmit,
      clearField: clearField,
      addDisabled: !variationValue.name.trim()
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VariationForm);

/***/ }),

/***/ "./resources/pos/src/store/action/variationAction.js":
/*!***********************************************************!*\
  !*** ./resources/pos/src/store/action/variationAction.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVariation": () => (/* binding */ createVariation),
/* harmony export */   "deleteVariation": () => (/* binding */ deleteVariation),
/* harmony export */   "fetchAllVariations": () => (/* binding */ fetchAllVariations),
/* harmony export */   "fetchVariation": () => (/* binding */ fetchVariation),
/* harmony export */   "fetchVariations": () => (/* binding */ fetchVariations),
/* harmony export */   "updateVariation": () => (/* binding */ updateVariation)
/* harmony export */ });
/* harmony import */ var _loadingAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadingAction */ "./resources/pos/src/store/action/loadingAction.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _toastAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _totalRecordAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./totalRecordAction */ "./resources/pos/src/store/action/totalRecordAction.js");
/* harmony import */ var _shared_requestParam__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/requestParam */ "./resources/pos/src/shared/requestParam.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var fetchVariations = function fetchVariations() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dispatch) {
      var url;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (isLoading) {
                dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_0__.setLoading)(true));
              }

              url = _constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS;

              if (!_.isEmpty(filter) && (filter.page || filter.pageSize || filter.search || filter.order_By || filter.created_at)) {
                url += (0,_shared_requestParam__WEBPACK_IMPORTED_MODULE_5__["default"])(filter, null, null, null, url);
              }

              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].get(url).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.FETCH_VARIATIONS,
                  payload: response.data.data
                });
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.setTotalRecord)(response.data.meta.total));

                if (isLoading) {
                  dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_0__.setLoading)(false));
                }
              })["catch"](function (response) {
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};
var fetchVariation = function fetchVariation(variationId) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dispatch) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].get(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS + "/" + variationId).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.FETCH_VARIATION,
                  payload: response.data.data
                });
              })["catch"](function (response) {
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var createVariation = function createVariation(variation, clearField) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dispatch) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].post(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS, variation).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.ADD_VARIATION,
                  payload: response.data.data
                });
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.addInToTotalRecord)(1));
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)("variation.success.create.message"),
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.SUCCESS
                }));
                clearField();
              })["catch"](function (_ref4) {
                var response = _ref4.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var updateVariation = function updateVariation(variationId, variation, clearField) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dispatch) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].put(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS + "/" + variationId, variation).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.EDIT_VARIATION,
                  payload: response.data.data
                });
                clearField();
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)("variation.success.edit.message"),
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.SUCCESS
                }));
              })["catch"](function (_ref6) {
                var response = _ref6.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }();
};
var deleteVariation = function deleteVariation(variationId) {
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dispatch) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"](_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS + "/" + variationId).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.DELETE_VARIATION,
                  payload: variationId
                });
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.removeFromTotalRecord)(1));
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.SUCCESS
                }));
              })["catch"](function (_ref8) {
                var response = _ref8.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref7.apply(this, arguments);
    };
  }();
};
var fetchAllVariations = function fetchAllVariations() {
  return /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(dispatch) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].get(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.VARIATIONS + "?page[size]=0").then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.variationActionType.FETCH_ALL_VARIATIONS,
                  payload: response.data.data
                });
              })["catch"](function (_ref10) {
                var _response$data;

                var response = _ref10.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref9.apply(this, arguments);
    };
  }();
};

/***/ })

}]);