"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_units_Units_js"],{

/***/ "./resources/pos/src/components/units/CreateUnits.js":
/*!***********************************************************!*\
  !*** ./resources/pos/src/components/units/CreateUnits.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _UnitsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UnitsForm */ "./resources/pos/src/components/units/UnitsForm.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var CreateUnits = function CreateUnits(props) {
  var addUnit = props.addUnit;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var handleClose = function handleClose() {
    return setShow(!show);
  };

  var addUnitsData = function addUnitsData(productValue) {
    addUnit(productValue);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "text-end w-sm-auto",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"], {
      variant: "primary mb-lg-0 mb-md-0 mb-4",
      onClick: handleClose,
      children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('unit.create.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_UnitsForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
      addProductData: addUnitsData,
      handleClose: handleClose,
      show: show,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('unit.create.title')
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  addUnit: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_2__.addUnit
})(CreateUnits));

/***/ }),

/***/ "./resources/pos/src/components/units/DeleteUnits.js":
/*!***********************************************************!*\
  !*** ./resources/pos/src/components/units/DeleteUnits.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/action-buttons/DeleteModel */ "./resources/pos/src/shared/action-buttons/DeleteModel.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var DeleteUnits = function DeleteUnits(props) {
  var deleteUnit = props.deleteUnit,
      onDelete = props.onDelete,
      deleteModel = props.deleteModel,
      onClickDeleteModel = props.onClickDeleteModel;

  var deleteUserClick = function deleteUserClick() {
    deleteUnit(onDelete.id);
    onClickDeleteModel(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    children: deleteModel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_shared_action_buttons_DeleteModel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      deleteUserClick: deleteUserClick,
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.getFormattedMessage)('unit.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  deleteUnit: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_2__.deleteUnit
})(DeleteUnits));

/***/ }),

/***/ "./resources/pos/src/components/units/EditUnits.js":
/*!*********************************************************!*\
  !*** ./resources/pos/src/components/units/EditUnits.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _UnitsForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UnitsForm */ "./resources/pos/src/components/units/UnitsForm.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var EditUnits = function EditUnits(props) {
  var handleClose = props.handleClose,
      show = props.show,
      unit = props.unit;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: unit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_UnitsForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
      handleClose: handleClose,
      show: show,
      singleUnit: unit,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)('unit.edit.title')
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null)(EditUnits));

/***/ }),

/***/ "./resources/pos/src/components/units/Units.js":
/*!*****************************************************!*\
  !*** ./resources/pos/src/components/units/Units.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/table/ReactDataTable */ "./resources/pos/src/shared/table/ReactDataTable.js");
/* harmony import */ var _DeleteUnits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DeleteUnits */ "./resources/pos/src/components/units/DeleteUnits.js");
/* harmony import */ var _CreateUnits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CreateUnits */ "./resources/pos/src/components/units/CreateUnits.js");
/* harmony import */ var _EditUnits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditUnits */ "./resources/pos/src/components/units/EditUnits.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/action-buttons/ActionButton */ "./resources/pos/src/shared/action-buttons/ActionButton.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

















var Units = function Units(props) {
  var fetchUnits = props.fetchUnits,
      units = props.units,
      totalRecord = props.totalRecord,
      isLoading = props.isLoading,
      allConfigData = props.allConfigData;

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
      editModel = _useState6[0],
      setEditModel = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      unit = _useState8[0],
      setUnit = _useState8[1];

  var handleClose = function handleClose(item) {
    setEditModel(!editModel);
    setUnit(item);
  };

  var onClickDeleteModel = function onClickDeleteModel() {
    var isDelete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setDeleteModel(!deleteModel);
    setIsDelete(isDelete);
  };

  var onChange = function onChange(filter) {
    fetchUnits(filter, true);
  };

  var itemsValue = units.length >= 0 && units.map(function (unit) {
    var _unit$attributes$base, _unit$attributes$base2;

    return {
      date: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedDate)(unit.attributes.created_at, allConfigData && allConfigData),
      time: moment__WEBPACK_IMPORTED_MODULE_2___default()(unit.attributes.created_at).format('LT'),
      name: unit.attributes.name,
      short_name: unit.attributes.short_name,
      base_unit: (_unit$attributes$base = unit.attributes.base_unit_name) !== null && _unit$attributes$base !== void 0 && _unit$attributes$base.name ? (_unit$attributes$base2 = unit.attributes.base_unit_name) === null || _unit$attributes$base2 === void 0 ? void 0 : _unit$attributes$base2.name : 'N/A',
      id: unit.id
    };
  });
  var columns = [{
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('globally.input.name.label'),
    selector: function selector(row) {
      return row.name;
    },
    sortField: 'name',
    sortable: true
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('unit.modal.input.short-name.label'),
    sortField: 'short_name',
    sortable: true,
    cell: function cell(row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
        className: "badge bg-light-info",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
          children: row.short_name
        })
      });
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('unit.modal.input.base-unit.label'),
    sortField: 'base_unit',
    sortable: true,
    cell: function cell(row) {
      return row.base_unit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
        className: "badge bg-light-success",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
          children: row.base_unit
        })
      });
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('globally.react-table.column.created-date.label'),
    selector: function selector(row) {
      return row.date;
    },
    sortField: 'created_at',
    sortable: true,
    cell: function cell(row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
        className: "badge bg-light-info",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          className: "mb-1",
          children: row.time
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          children: row.date
        })]
      });
    }
  }, {
    name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('react-data-table.action.column.label'),
    right: true,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: function cell(row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_11__["default"], {
        item: row,
        goToEditProduct: handleClose,
        isEditMode: true,
        onClickDeleteModel: onClickDeleteModel
      });
    }
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_12__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.placeholderText)('units.title')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_5__["default"], {
      columns: columns,
      items: itemsValue,
      onChange: onChange,
      isLoading: isLoading,
      AddButton: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_CreateUnits__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_10__.getFormattedMessage)('unit.modal.input.base-unit.label'),
      totalRows: totalRecord,
      isShowFilterField: true,
      isUnitFilter: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_EditUnits__WEBPACK_IMPORTED_MODULE_8__["default"], {
      handleClose: handleClose,
      show: editModel,
      unit: unit
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_DeleteUnits__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      onDelete: isDelete
    })]
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var units = state.units,
      totalRecord = state.totalRecord,
      isLoading = state.isLoading,
      allConfigData = state.allConfigData;
  return {
    units: units,
    totalRecord: totalRecord,
    isLoading: isLoading,
    allConfigData: allConfigData
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  fetchUnits: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_4__.fetchUnits
})(Units));

/***/ }),

/***/ "./resources/pos/src/components/units/UnitsForm.js":
/*!*********************************************************!*\
  !*** ./resources/pos/src/components/units/UnitsForm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/modelFooter */ "./resources/pos/src/shared/components/modelFooter.js");
/* harmony import */ var _shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/select/reactSelect */ "./resources/pos/src/shared/select/reactSelect.js");
/* harmony import */ var _store_action_baseUnitsAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/action/baseUnitsAction */ "./resources/pos/src/store/action/baseUnitsAction.js");
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












var UnitsForm = function UnitsForm(props) {
  var _unitValue$base_unit$, _newUnit$, _newUnit$$attributes, _newUnit$2;

  var handleClose = props.handleClose,
      base = props.base,
      fetchAllBaseUnits = props.fetchAllBaseUnits,
      show = props.show,
      title = props.title,
      addProductData = props.addProductData,
      editUnit = props.editUnit,
      singleUnit = props.singleUnit,
      hide = props.hide,
      product_unit = props.product_unit;
  var innerRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  var newUnit = singleUnit && base.filter(function (da) {
    return singleUnit.base_unit === da.attributes.name;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: singleUnit ? singleUnit.name : '',
    short_name: singleUnit ? singleUnit.short_name : '',
    base_unit: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      unitValue = _useState2[0],
      setUnitValue = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: '',
    short_name: '',
    base_unit: ''
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchAllBaseUnits();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (newUnit && (newUnit === null || newUnit === void 0 ? void 0 : newUnit.length) >= 1) {
      setUnitValue(function (unitValue) {
        return _objectSpread(_objectSpread({}, unitValue), {}, {
          base_unit: {
            value: newUnit[0].id,
            label: newUnit[0].attributes.name
          }
        });
      });
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (singleUnit) {
      var _data$, _data$$attributes;

      var data = base.filter(function (da) {
        return Number(singleUnit.base_unit) === da.id;
      });
      data.length && setUnitValue({
        name: singleUnit ? singleUnit.name : '',
        short_name: singleUnit ? singleUnit.short_name : '',
        base_unit: {
          label: (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : (_data$$attributes = _data$.attributes) === null || _data$$attributes === void 0 ? void 0 : _data$$attributes.name,
          value: singleUnit === null || singleUnit === void 0 ? void 0 : singleUnit.base_unit
        }
      });
    }
  }, [singleUnit]);
  var disabled = singleUnit && singleUnit.name === unitValue.name.trim() && (singleUnit === null || singleUnit === void 0 ? void 0 : singleUnit.short_name) === (unitValue === null || unitValue === void 0 ? void 0 : unitValue.short_name.trim()) && (unitValue === null || unitValue === void 0 ? void 0 : unitValue.base_unit[0]) && (unitValue === null || unitValue === void 0 ? void 0 : (_unitValue$base_unit$ = unitValue.base_unit[0]) === null || _unitValue$base_unit$ === void 0 ? void 0 : _unitValue$base_unit$.label) === (singleUnit === null || singleUnit === void 0 ? void 0 : singleUnit.base_unit);

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(newUnit ? [{
    label: (_newUnit$ = newUnit[0]) === null || _newUnit$ === void 0 ? void 0 : (_newUnit$$attributes = _newUnit$.attributes) === null || _newUnit$$attributes === void 0 ? void 0 : _newUnit$$attributes.name,
    value: (_newUnit$2 = newUnit[0]) === null || _newUnit$2 === void 0 ? void 0 : _newUnit$2.id
  }] : null),
      _useState6 = _slicedToArray(_useState5, 1),
      selectedBaseUnit = _useState6[0];

  var handleValidation = function handleValidation() {
    var errorss = {};
    var isValid = false;

    if (!unitValue['name'].trim()) {
      errorss['name'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("globally.input.name.validate.label");
    } else if (!unitValue['short_name'].trim()) {
      errorss['short_name'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("unit.modal.input.short-name.validate.label");
    } else if (unitValue['short_name'] && unitValue['short_name'].length > 50) {
      errorss['short_name'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("unit.modal.input.short-name.valid.validate.label");
    } else if (!unitValue['base_unit']) {
      errorss['base_unit'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("unit.modal.input.base-unit.validate.label");
    } else {
      isValid = true;
    }

    setErrors(errorss);
    return isValid;
  };

  var onChangeInput = function onChangeInput(e) {
    e.preventDefault();
    setUnitValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors('');
  };

  var onBaseUnitChange = function onBaseUnitChange(obj) {
    setUnitValue(function (unitValue) {
      return _objectSpread(_objectSpread({}, unitValue), {}, {
        base_unit: obj
      });
    });
  };

  var prepareFormData = function prepareFormData(data) {
    var params = new URLSearchParams();
    params.append('name', data.name);
    params.append('short_name', data.short_name);

    if (data.base_unit[0]) {
      params.append('base_unit', data.base_unit[0].value);
    } else {
      params.append('base_unit', data.base_unit.value);
    }

    return params;
  };

  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var valid = handleValidation();

    if (singleUnit && valid) {
      if (!disabled) {
        editUnit(singleUnit.id, prepareFormData(unitValue), handleClose);
        clearField(false);
      }
    } else {
      if (valid) {
        setUnitValue(unitValue);
        addProductData(prepareFormData(unitValue));
        clearField(false);
      }
    }
  };

  var clearField = function clearField() {
    setUnitValue({
      name: '',
      short_name: '',
      base_unit: ''
    });
    setErrors(''); // handleClose(false);

    handleClose ? handleClose(false) : hide(false);
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
            className: "col-md-12 mb-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
              className: "form-label",
              children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("globally.input.name.label"), ": "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "required"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              type: "text",
              name: "name",
              value: unitValue.name,
              placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("globally.input.name.placeholder.label"),
              className: "form-control",
              ref: innerRef,
              autoComplete: "off",
              onChange: function onChange(e) {
                return onChangeInput(e);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "text-danger d-block fw-400 fs-small mt-2",
              children: errors['name'] ? errors['name'] : null
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "col-md-12 mb-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
              className: "form-label",
              children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("unit.modal.input.short-name.label"), ": "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "required"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              type: "text",
              name: "short_name",
              className: "form-control",
              value: unitValue.short_name,
              placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("unit.modal.input.short-name.placeholder.label"),
              onChange: function onChange(e) {
                return onChangeInput(e);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "text-danger d-block fw-400 fs-small mt-2",
              children: errors['short_name'] ? errors['short_name'] : null
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "col-md-12 mb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_5__["default"], {
              title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("unit.modal.input.base-unit.label"),
              placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.placeholderText)("unit.modal.input.base-unit.placeholder.label") // defaultValue={selectedBaseUnit}
              ,
              defaultValue: unitValue.base_unit,
              value: unitValue.base_unit,
              data: base,
              onChange: onBaseUnitChange,
              errors: errors['base_unit']
            })
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_4__["default"], {
      onEditRecord: singleUnit,
      onSubmit: onSubmit,
      editDisabled: disabled,
      clearField: clearField,
      addDisabled: !unitValue.name.trim()
    })]
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var base = state.base;
  return {
    base: base
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  fetchAllBaseUnits: _store_action_baseUnitsAction__WEBPACK_IMPORTED_MODULE_6__.fetchAllBaseUnits,
  editUnit: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_3__.editUnit
})(UnitsForm));

/***/ }),

/***/ "./resources/pos/src/store/action/unitsAction.js":
/*!*******************************************************!*\
  !*** ./resources/pos/src/store/action/unitsAction.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addUnit": () => (/* binding */ addUnit),
/* harmony export */   "deleteUnit": () => (/* binding */ deleteUnit),
/* harmony export */   "editUnit": () => (/* binding */ editUnit),
/* harmony export */   "fetchAllunits": () => (/* binding */ fetchAllunits),
/* harmony export */   "fetchUnit": () => (/* binding */ fetchUnit),
/* harmony export */   "fetchUnits": () => (/* binding */ fetchUnits)
/* harmony export */ });
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _shared_requestParam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/requestParam */ "./resources/pos/src/shared/requestParam.js");
/* harmony import */ var _toastAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _totalRecordAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./totalRecordAction */ "./resources/pos/src/store/action/totalRecordAction.js");
/* harmony import */ var _loadingAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadingAction */ "./resources/pos/src/store/action/loadingAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var fetchUnits = function fetchUnits() {
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
                dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_5__.setLoading)(true));
              }

              url = _constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.UNITS;

              if (!_.isEmpty(filter) && (filter.page || filter.pageSize || filter.search || filter.order_By || filter.created_at)) {
                url += (0,_shared_requestParam__WEBPACK_IMPORTED_MODULE_2__["default"])(filter, null, null, null, url);
              }

              _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get(url).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.unitsActionType.FETCH_UNITS,
                  payload: response.data.data
                });
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.setTotalRecord)(response.data.meta.total !== undefined && response.data.meta.total >= 0 ? response.data.meta.total : response.data.data.total));

                if (isLoading) {
                  dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_5__.setLoading)(false));
                }
              })["catch"](function (_ref2) {
                var response = _ref2.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
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
var fetchAllunits = function fetchAllunits() {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dispatch) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get("units?page[size]=0").then(function (response) {
                dispatch({
                  type: warehouseActionType.FETCH_UNITS,
                  payload: response.data.data
                });
              })["catch"](function (_ref4) {
                var response = _ref4.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
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
      return _ref3.apply(this, arguments);
    };
  }();
};
var fetchUnit = function fetchUnit(unitId, singleUnit) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dispatch) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.UNITS + "/" + unitId, singleUnit).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.unitsActionType.FETCH_UNIT,
                  payload: response.data.data
                });
              })["catch"](function (_ref6) {
                var response = _ref6.response;
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
      return _ref5.apply(this, arguments);
    };
  }();
};
var addUnit = function addUnit(units) {
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dispatch) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].post(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.UNITS, units).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.unitsActionType.ADD_UNIT,
                  payload: response.data.data
                });
                dispatch(fetchUnits(_constants__WEBPACK_IMPORTED_MODULE_1__.Filters.OBJ));
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)("unit.success.create.message")
                }));
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.addInToTotalRecord)(1));
              })["catch"](function (_ref8) {
                var response = _ref8.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
};
var editUnit = function editUnit(unitId, units, handleClose) {
  return /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dispatch) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].patch(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.UNITS + "/" + unitId, units).then(function (response) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.unitsActionType.EDIT_UNIT,
                  payload: response.data.data
                });
                handleClose(false);
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)("unit.success.edit.message")
                }));
              })["catch"](function (_ref10) {
                var response = _ref10.response;
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
      return _ref9.apply(this, arguments);
    };
  }();
};
var deleteUnit = function deleteUnit(unitId) {
  return /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(dispatch) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.UNITS + "/" + unitId).then(function (response) {
                dispatch((0,_totalRecordAction__WEBPACK_IMPORTED_MODULE_4__.removeFromTotalRecord)(1));
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.unitsActionType.DELETE_UNIT,
                  payload: unitId
                });
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_6__.getFormattedMessage)("unit.success.delete.message")
                }));
              })["catch"](function (_ref12) {
                var response = _ref12.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
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
      return _ref11.apply(this, arguments);
    };
  }();
};

/***/ })

}]);