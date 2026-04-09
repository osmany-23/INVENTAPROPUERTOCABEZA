"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_product_ProductBatchManager_js"],{

/***/ "./resources/pos/src/components/product/ProductBatchManager.js":
/*!*********************************************************************!*\
  !*** ./resources/pos/src/components/product/ProductBatchManager.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Spinner.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Alert.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Image.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Badge.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Row.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Col.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _header_HeaderTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header/HeaderTitle */ "./resources/pos/src/components/header/HeaderTitle.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _store_action_toastAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/action/toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _store_action_warehouseAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/action/warehouseAction */ "./resources/pos/src/store/action/warehouseAction.js");
/* harmony import */ var _store_action_supplierAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../store/action/supplierAction */ "./resources/pos/src/store/action/supplierAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_batchHelpers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/batchHelpers */ "./resources/pos/src/shared/batchHelpers.js");
/* harmony import */ var _shared_can__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/can */ "./resources/pos/src/shared/can.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




















var EMPTY_DASHBOARD = {
  product: null,
  settings: {
    track_batches: false,
    alert_days: 30,
    deny_expired_sale: true
  },
  draft: {
    next_codigo_lote_sistema: ""
  },
  summary: {
    total_stock: 0,
    batch_stock: 0,
    stock_difference: 0,
    active_batches: 0,
    expired_batches: 0,
    expiring_batches: 0
  },
  batches: []
};

var createInitialBatchForm = function createInitialBatchForm() {
  var previewCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    warehouse_id: "",
    purchase_supplier_id: "",
    codigo_lote_sistema: previewCode,
    lote_fabricante: "",
    lot_barcode: "",
    ubicacion: "",
    quantity: "",
    product_cost: "",
    product_price: "",
    received_at: moment__WEBPACK_IMPORTED_MODULE_1___default()().format("YYYY-MM-DD"),
    fecha_fabricacion: moment__WEBPACK_IMPORTED_MODULE_1___default()().format("YYYY-MM-DD"),
    fecha_vencimiento: "",
    impuesto_tipo: "EXCLUSIVO",
    impuesto_valor: "",
    descripcion: ""
  };
};

var createEditBatchForm = function createEditBatchForm(batch) {
  return {
    lote_fabricante: (batch === null || batch === void 0 ? void 0 : batch.lote_fabricante) || (batch === null || batch === void 0 ? void 0 : batch.lot_code) || "",
    ubicacion: (batch === null || batch === void 0 ? void 0 : batch.ubicacion) || "",
    descripcion: (batch === null || batch === void 0 ? void 0 : batch.descripcion) || (batch === null || batch === void 0 ? void 0 : batch.note) || "",
    fecha_fabricacion: (batch === null || batch === void 0 ? void 0 : batch.fecha_fabricacion) || "",
    fecha_vencimiento: (batch === null || batch === void 0 ? void 0 : batch.fecha_vencimiento) || (batch === null || batch === void 0 ? void 0 : batch.expires_at) || "",
    impuesto_tipo: (batch === null || batch === void 0 ? void 0 : batch.impuesto_tipo) || "EXCLUSIVO",
    impuesto_valor: (batch === null || batch === void 0 ? void 0 : batch.impuesto_valor) === null || (batch === null || batch === void 0 ? void 0 : batch.impuesto_valor) === undefined ? "" : String(batch.impuesto_valor),
    product_price: (batch === null || batch === void 0 ? void 0 : batch.product_price) === null || (batch === null || batch === void 0 ? void 0 : batch.product_price) === undefined ? "" : String(batch.product_price)
  };
};

var ProductBatchManager = function ProductBatchManager() {
  var _dashboard$product2, _dashboard$product3, _dashboard$product4, _dashboard$product5, _dashboard$product5$n, _dashboard$product6, _dashboard$product7, _dashboard$product8, _dashboard$product9, _dashboard$product10, _dashboard$product11, _dashboard$product12, _dashboard$draft, _dashboard$product13;

  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_16__.useParams)(),
      productId = _useParams.productId;

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_16__.useNavigate)();
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var warehouses = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state.warehouses;
  });
  var suppliers = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state.suppliers;
  });
  var settings = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state.settings;
  });
  var allConfigData = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
    return state.allConfigData;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      savingSettings = _useState4[0],
      setSavingSettings = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      savingBatch = _useState6[0],
      setSavingBatch = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      savingBatchUpdate = _useState8[0],
      setSavingBatchUpdate = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(EMPTY_DASHBOARD),
      _useState12 = _slicedToArray(_useState11, 2),
      dashboard = _useState12[0],
      setDashboard = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(EMPTY_DASHBOARD.settings),
      _useState14 = _slicedToArray(_useState13, 2),
      settingsForm = _useState14[0],
      setSettingsForm = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(createInitialBatchForm()),
      _useState16 = _slicedToArray(_useState15, 2),
      batchForm = _useState16[0],
      setBatchForm = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState18 = _slicedToArray(_useState17, 2),
      editingBatchId = _useState18[0],
      setEditingBatchId = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState20 = _slicedToArray(_useState19, 2),
      batchEditForm = _useState20[0],
      setBatchEditForm = _useState20[1];

  var toast = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (text, type) {
    if (!text) {
      return;
    }

    dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_9__.addToast)(_objectSpread({
      text: text
    }, type ? {
      type: type
    } : {})));
  }, [dispatch]);
  var money = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return function (value) {
      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.currencySymbolHandling)(allConfigData, (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getCurrencySymbol)(settings), Number(value || 0));
    };
  }, [allConfigData, settings]);
  var canViewBatches = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("ver_lotes", {
    strict: true
  }) || (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("ver_stock_lote", {
    strict: true
  });
  var canAssignBatchSettings = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("asignar_lotes", {
    strict: true
  });
  var canCreateBatches = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("crear_lotes", {
    strict: true
  });
  var canEditBatches = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("editar_lotes", {
    strict: true
  });
  var canViewBatchStock = (0,_shared_can__WEBPACK_IMPORTED_MODULE_14__.can)("ver_stock_lote", {
    strict: true
  });
  var warehouseOptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!Array.isArray(warehouses)) {
      return [];
    }

    return warehouses.map(function (warehouse) {
      var _warehouse$attributes;

      return {
        value: String(warehouse.id),
        label: (warehouse === null || warehouse === void 0 ? void 0 : (_warehouse$attributes = warehouse.attributes) === null || _warehouse$attributes === void 0 ? void 0 : _warehouse$attributes.name) || (warehouse === null || warehouse === void 0 ? void 0 : warehouse.name) || "Bodega ".concat(warehouse.id)
      };
    });
  }, [warehouses]);
  var supplierOptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!Array.isArray(suppliers)) {
      return [];
    }

    return suppliers.map(function (supplier) {
      var _supplier$attributes;

      return {
        value: String(supplier.id),
        label: (supplier === null || supplier === void 0 ? void 0 : (_supplier$attributes = supplier.attributes) === null || _supplier$attributes === void 0 ? void 0 : _supplier$attributes.name) || (supplier === null || supplier === void 0 ? void 0 : supplier.name) || "Proveedor ".concat(supplier.id)
      };
    });
  }, [suppliers]);
  var applyDashboard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (payload) {
    var _nextDashboard$draft, _nextDashboard$settin, _nextDashboard$settin2, _nextDashboard$settin3;

    var nextDashboard = payload || EMPTY_DASHBOARD;
    setDashboard(nextDashboard);
    var nextPreviewCode = (nextDashboard === null || nextDashboard === void 0 ? void 0 : (_nextDashboard$draft = nextDashboard.draft) === null || _nextDashboard$draft === void 0 ? void 0 : _nextDashboard$draft.next_codigo_lote_sistema) || "";
    setSettingsForm({
      track_batches: Boolean(nextDashboard === null || nextDashboard === void 0 ? void 0 : (_nextDashboard$settin = nextDashboard.settings) === null || _nextDashboard$settin === void 0 ? void 0 : _nextDashboard$settin.track_batches),
      alert_days: Number((nextDashboard === null || nextDashboard === void 0 ? void 0 : (_nextDashboard$settin2 = nextDashboard.settings) === null || _nextDashboard$settin2 === void 0 ? void 0 : _nextDashboard$settin2.alert_days) || 30),
      deny_expired_sale: Boolean(nextDashboard === null || nextDashboard === void 0 ? void 0 : (_nextDashboard$settin3 = nextDashboard.settings) === null || _nextDashboard$settin3 === void 0 ? void 0 : _nextDashboard$settin3.deny_expired_sale)
    });
    setBatchForm(function (previous) {
      var _warehouseOptions$;

      return _objectSpread(_objectSpread({}, createInitialBatchForm(nextPreviewCode)), {}, {
        warehouse_id: previous.warehouse_id || ((_warehouseOptions$ = warehouseOptions[0]) === null || _warehouseOptions$ === void 0 ? void 0 : _warehouseOptions$.value) || "",
        purchase_supplier_id: previous.purchase_supplier_id || "",
        received_at: previous.received_at || moment__WEBPACK_IMPORTED_MODULE_1___default()().format("YYYY-MM-DD"),
        fecha_fabricacion: previous.fecha_fabricacion || moment__WEBPACK_IMPORTED_MODULE_1___default()().format("YYYY-MM-DD")
      });
    });
  }, [warehouseOptions]);
  var loadDashboard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _response$data, response, _requestError$respons, _requestError$respons2;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (canViewBatches) {
              _context.next = 4;
              break;
            }

            setLoading(false);
            setError("No tiene permiso para consultar lotes.");
            return _context.abrupt("return");

          case 4:
            _context.prev = 4;
            setLoading(true);
            setError("");
            _context.next = 9;
            return _config_apiConfig__WEBPACK_IMPORTED_MODULE_3__["default"].get("/products/".concat(productId, "/batches"));

          case 9:
            response = _context.sent;
            applyDashboard((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || EMPTY_DASHBOARD);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);
            setError((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_requestError$respons = _context.t0.response) === null || _requestError$respons === void 0 ? void 0 : (_requestError$respons2 = _requestError$respons.data) === null || _requestError$respons2 === void 0 ? void 0 : _requestError$respons2.message) || "No se pudo cargar la gestion por lotes.");

          case 16:
            _context.prev = 16;
            setLoading(false);
            return _context.finish(16);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 13, 16, 19]]);
  })), [applyDashboard, canViewBatches, productId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    dispatch((0,_store_action_warehouseAction__WEBPACK_IMPORTED_MODULE_10__.fetchAllWarehouses)());
    dispatch((0,_store_action_supplierAction__WEBPACK_IMPORTED_MODULE_11__.fetchAllSuppliers)());
  }, [dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadDashboard();
  }, [loadDashboard]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _warehouseOptions$2;

    if (!batchForm.warehouse_id && (_warehouseOptions$2 = warehouseOptions[0]) !== null && _warehouseOptions$2 !== void 0 && _warehouseOptions$2.value) {
      setBatchForm(function (previous) {
        return _objectSpread(_objectSpread({}, previous), {}, {
          warehouse_id: warehouseOptions[0].value
        });
      });
    }
  }, [batchForm.warehouse_id, warehouseOptions]);

  var handleSettingsChange = function handleSettingsChange(event) {
    var _event$target = event.target,
        name = _event$target.name,
        type = _event$target.type,
        checked = _event$target.checked,
        value = _event$target.value;
    setSettingsForm(function (previous) {
      return _objectSpread(_objectSpread({}, previous), {}, _defineProperty({}, name, type === "checkbox" ? checked : value));
    });
  };

  var handleBatchInputChange = function handleBatchInputChange(event) {
    var _event$target2 = event.target,
        name = _event$target2.name,
        value = _event$target2.value;
    setBatchForm(function (previous) {
      return _objectSpread(_objectSpread({}, previous), {}, _defineProperty({}, name, value));
    });
  };

  var saveSettings = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
      var _response$data2, response, _requestError$respons3, _requestError$respons4, message;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              event.preventDefault();

              if (canAssignBatchSettings) {
                _context2.next = 4;
                break;
              }

              toast("No tiene permiso para configurar lotes.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context2.abrupt("return");

            case 4:
              _context2.prev = 4;
              setSavingSettings(true);
              setError("");
              _context2.next = 9;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_3__["default"].put("/products/".concat(productId, "/batch-settings"), {
                track_batches: settingsForm.track_batches,
                alert_days: Number(settingsForm.alert_days || 0),
                deny_expired_sale: settingsForm.deny_expired_sale
              });

            case 9:
              response = _context2.sent;
              applyDashboard((response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) || EMPTY_DASHBOARD);
              toast("Configuracion de lotes actualizada.");
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              message = (_context2.t0 === null || _context2.t0 === void 0 ? void 0 : (_requestError$respons3 = _context2.t0.response) === null || _requestError$respons3 === void 0 ? void 0 : (_requestError$respons4 = _requestError$respons3.data) === null || _requestError$respons4 === void 0 ? void 0 : _requestError$respons4.message) || "No se pudo guardar la configuracion del producto.";
              setError(message);
              toast(message, _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 19:
              _context2.prev = 19;
              setSavingSettings(false);
              return _context2.finish(19);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 14, 19, 22]]);
    }));

    return function saveSettings(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createBatch = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
      var _dashboard$product, _response$data3, response, _requestError$respons5, _requestError$respons6, message;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              event.preventDefault();

              if (canCreateBatches) {
                _context3.next = 4;
                break;
              }

              toast("No tiene permiso para crear lotes.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context3.abrupt("return");

            case 4:
              _context3.prev = 4;
              setSavingBatch(true);
              setError("");
              _context3.next = 9;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_3__["default"].post("/products/".concat(productId, "/batches"), {
                warehouse_id: Number(batchForm.warehouse_id || 0),
                purchase_supplier_id: Number(batchForm.purchase_supplier_id || 0),
                lote_fabricante: batchForm.lote_fabricante,
                lot_code: batchForm.lote_fabricante,
                lot_barcode: batchForm.lot_barcode,
                ubicacion: batchForm.ubicacion,
                quantity: Number(batchForm.quantity || 0),
                product_cost: Number(batchForm.product_cost || 0),
                product_price: batchForm.product_price === "" || batchForm.product_price === null ? Number((dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product = dashboard.product) === null || _dashboard$product === void 0 ? void 0 : _dashboard$product.product_price) || 0) || null : Number(batchForm.product_price || 0),
                received_at: batchForm.received_at,
                fecha_fabricacion: batchForm.fecha_fabricacion || null,
                fecha_vencimiento: batchForm.fecha_vencimiento || null,
                impuesto_tipo: batchForm.impuesto_tipo || "EXCLUSIVO",
                impuesto_valor: batchForm.impuesto_valor === "" || batchForm.impuesto_valor === null ? 0 : Number(batchForm.impuesto_valor || 0),
                descripcion: batchForm.descripcion
              });

            case 9:
              response = _context3.sent;
              applyDashboard((response === null || response === void 0 ? void 0 : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.data) || EMPTY_DASHBOARD);
              setBatchForm(function (previous) {
                var _response$data4, _response$data4$data, _response$data4$data$, _warehouseOptions$3;

                return _objectSpread(_objectSpread({}, createInitialBatchForm((response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : (_response$data4$data = _response$data4.data) === null || _response$data4$data === void 0 ? void 0 : (_response$data4$data$ = _response$data4$data.draft) === null || _response$data4$data$ === void 0 ? void 0 : _response$data4$data$.next_codigo_lote_sistema) || "")), {}, {
                  warehouse_id: previous.warehouse_id || ((_warehouseOptions$3 = warehouseOptions[0]) === null || _warehouseOptions$3 === void 0 ? void 0 : _warehouseOptions$3.value) || "",
                  purchase_supplier_id: previous.purchase_supplier_id || ""
                });
              });
              toast("Lote y compra registrados correctamente.");
              _context3.next = 20;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](4);
              message = (_context3.t0 === null || _context3.t0 === void 0 ? void 0 : (_requestError$respons5 = _context3.t0.response) === null || _requestError$respons5 === void 0 ? void 0 : (_requestError$respons6 = _requestError$respons5.data) === null || _requestError$respons6 === void 0 ? void 0 : _requestError$respons6.message) || "No se pudo registrar el lote.";
              setError(message);
              toast(message, _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 20:
              _context3.prev = 20;
              setSavingBatch(false);
              return _context3.finish(20);

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4, 15, 20, 23]]);
    }));

    return function createBatch(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var startEditingBatch = function startEditingBatch(batch) {
    setEditingBatchId(batch.id);
    setBatchEditForm(createEditBatchForm(batch));
  };

  var cancelBatchEdit = function cancelBatchEdit() {
    setEditingBatchId(null);
    setBatchEditForm(null);
  };

  var handleBatchEditChange = function handleBatchEditChange(event) {
    var _event$target3 = event.target,
        name = _event$target3.name,
        value = _event$target3.value;
    setBatchEditForm(function (previous) {
      return _objectSpread(_objectSpread({}, previous || {}), {}, _defineProperty({}, name, value));
    });
  };

  var saveBatchChanges = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
      var _response$data5, response, _requestError$respons7, _requestError$respons8, message;

      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              event.preventDefault();

              if (!(!editingBatchId || !batchEditForm)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return");

            case 3:
              if (canEditBatches) {
                _context4.next = 6;
                break;
              }

              toast("No tiene permiso para editar lotes.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context4.abrupt("return");

            case 6:
              _context4.prev = 6;
              setSavingBatchUpdate(true);
              setError("");
              _context4.next = 11;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_3__["default"].put("/products/".concat(productId, "/batches/").concat(editingBatchId), {
                lote_fabricante: batchEditForm.lote_fabricante,
                ubicacion: batchEditForm.ubicacion,
                descripcion: batchEditForm.descripcion,
                fecha_fabricacion: batchEditForm.fecha_fabricacion || null,
                fecha_vencimiento: batchEditForm.fecha_vencimiento || null,
                impuesto_tipo: batchEditForm.impuesto_tipo || "EXCLUSIVO",
                impuesto_valor: batchEditForm.impuesto_valor === "" || batchEditForm.impuesto_valor === null ? 0 : Number(batchEditForm.impuesto_valor || 0),
                product_price: batchEditForm.product_price === "" || batchEditForm.product_price === null ? null : Number(batchEditForm.product_price || 0)
              });

            case 11:
              response = _context4.sent;
              applyDashboard((response === null || response === void 0 ? void 0 : (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.data) || EMPTY_DASHBOARD);
              cancelBatchEdit();
              toast("Lote actualizado correctamente.");
              _context4.next = 22;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](6);
              message = (_context4.t0 === null || _context4.t0 === void 0 ? void 0 : (_requestError$respons7 = _context4.t0.response) === null || _requestError$respons7 === void 0 ? void 0 : (_requestError$respons8 = _requestError$respons7.data) === null || _requestError$respons8 === void 0 ? void 0 : _requestError$respons8.message) || "No se pudo actualizar el lote.";
              setError(message);
              toast(message, _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 22:
              _context4.prev = 22;
              setSavingBatchUpdate(false);
              return _context4.finish(22);

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[6, 17, 22, 25]]);
    }));

    return function saveBatchChanges(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  var backLink = dashboard !== null && dashboard !== void 0 && (_dashboard$product2 = dashboard.product) !== null && _dashboard$product2 !== void 0 && _dashboard$product2.main_product_id ? "/app/products/detail/".concat(dashboard.product.main_product_id) : "/app/products";
  var productImage = (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product3 = dashboard.product) === null || _dashboard$product3 === void 0 ? void 0 : _dashboard$product3.image_url) || "";
  var summary = (dashboard === null || dashboard === void 0 ? void 0 : dashboard.summary) || EMPTY_DASHBOARD.summary;
  var batches = (dashboard === null || dashboard === void 0 ? void 0 : dashboard.batches) || [];
  var statusCards = [{
    label: "Stock total",
    value: summary.total_stock,
    accent: "primary",
    formatter: function formatter(value) {
      return "".concat(Number(value || 0).toFixed(2), " u");
    }
  }, {
    label: "Stock por lotes",
    value: summary.batch_stock,
    accent: "success",
    formatter: function formatter(value) {
      return "".concat(Number(value || 0).toFixed(2), " u");
    }
  }, {
    label: "Lotes activos",
    value: summary.active_batches,
    accent: "primary",
    formatter: function formatter(value) {
      return value;
    }
  }, {
    label: "Por vencer",
    value: summary.expiring_batches,
    accent: "warning",
    formatter: function formatter(value) {
      return value;
    }
  }, {
    label: "Vencidos",
    value: summary.expired_batches,
    accent: "danger",
    formatter: function formatter(value) {
      return value;
    }
  }];
  var formatBatchDate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value) {
    if (!value) {
      return "Sin fecha";
    }

    var parsedDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(value, ["YYYY-MM-DD", (moment__WEBPACK_IMPORTED_MODULE_1___default().ISO_8601)], true);
    return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : value;
  }, []);
  var formatBatchDays = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value) {
    if (value === null || value === undefined || value === "") {
      return "Sin calculo";
    }

    var numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return "Sin calculo";
    }

    if (numericValue < 0) {
      return "".concat(Math.abs(numericValue), " dias vencido");
    }

    if (numericValue === 0) {
      return "Vence hoy";
    }

    if (numericValue === 1) {
      return "1 dia";
    }

    return "".concat(numericValue, " dias");
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_7__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
      title: "Gestion de lotes"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_header_HeaderTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      title: "Gestion de lotes",
      to: backLink
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
      className: "card card-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center py-5",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__["default"], {
          animation: "border",
          variant: "primary"
        })
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "batch-manager",
      children: [error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__["default"], {
        variant: "danger",
        children: error
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
        className: "batch-manager__hero",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "batch-manager__hero-main",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "batch-manager__hero-media",
            children: productImage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_19__["default"], {
              src: productImage,
              alt: dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product4 = dashboard.product) === null || _dashboard$product4 === void 0 ? void 0 : _dashboard$product4.name
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
              className: "batch-manager__hero-placeholder",
              children: (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product5 = dashboard.product) === null || _dashboard$product5 === void 0 ? void 0 : (_dashboard$product5$n = _dashboard$product5.name) === null || _dashboard$product5$n === void 0 ? void 0 : _dashboard$product5$n.charAt(0)) || "P"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "batch-manager__hero-copy",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__["default"], {
              className: "batch-manager__hero-badge",
              children: settingsForm.track_batches ? "Control por lote activo" : "Control por lote inactivo"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h2", {
              children: (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product6 = dashboard.product) === null || _dashboard$product6 === void 0 ? void 0 : _dashboard$product6.name) || "Producto"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "batch-manager__hero-meta",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
                children: ["Codigo: ", (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product7 = dashboard.product) === null || _dashboard$product7 === void 0 ? void 0 : _dashboard$product7.code) || "N/A"]
              }), dashboard !== null && dashboard !== void 0 && (_dashboard$product8 = dashboard.product) !== null && _dashboard$product8 !== void 0 && _dashboard$product8.product_code && (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product9 = dashboard.product) === null || _dashboard$product9 === void 0 ? void 0 : _dashboard$product9.product_code) !== (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product10 = dashboard.product) === null || _dashboard$product10 === void 0 ? void 0 : _dashboard$product10.code) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
                children: ["Codigo secundario:", " ", dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product11 = dashboard.product) === null || _dashboard$product11 === void 0 ? void 0 : _dashboard$product11.product_code]
              }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
                children: ["Precio: ", money((dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product12 = dashboard.product) === null || _dashboard$product12 === void 0 ? void 0 : _dashboard$product12.product_price) || 0)]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "batch-manager__hero-actions",
          children: canViewBatchStock ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
            className: "batch-manager__primary-btn",
            onClick: function onClick() {
              return navigate("/app/report/report-batch-expiry");
            },
            children: "Ver reporte de vencimientos"
          }) : null
        })]
      }), Number(summary.stock_difference || 0) !== 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__["default"], {
        variant: "warning",
        className: "batch-manager__sync-alert",
        children: ["El stock general y el stock por lotes no coinciden. Diferencia actual:", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
          children: Number(summary.stock_difference || 0).toFixed(2)
        }), "."]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__["default"], {
        className: "g-3 mb-4",
        children: statusCards.map(function (card) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
            lg: card.label === "Stock total" ? 4 : 2,
            md: 4,
            sm: 6,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("article", {
              className: "batch-manager__summary-card batch-manager__summary-card--".concat(card.accent),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                children: card.label
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                children: card.formatter(card.value)
              })]
            })
          }, card.label);
        })
      }), canAssignBatchSettings || canCreateBatches ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__["default"], {
        className: "g-4",
        children: [canAssignBatchSettings ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
          xl: canCreateBatches ? 4 : 12,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
            className: "batch-manager__panel",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "batch-manager__panel-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h4", {
                children: "Configuracion del producto"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                children: "Activa control por lotes, alertas y bloqueo por vencimiento."
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"], {
              onSubmit: saveSettings,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Check, {
                type: "switch",
                id: "track-batches",
                name: "track_batches",
                label: "Activar control por lotes",
                className: "mb-3",
                checked: settingsForm.track_batches,
                onChange: handleSettingsChange
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                className: "mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                  children: "Dias para alerta"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                  type: "number",
                  name: "alert_days",
                  min: "1",
                  value: settingsForm.alert_days,
                  onChange: handleSettingsChange
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__["default"], {
                className: "batch-manager__rule-alert mb-4",
                children: "Venta de lotes vencidos: bloqueada siempre."
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
                type: "submit",
                className: "batch-manager__primary-btn w-100",
                disabled: savingSettings,
                children: savingSettings ? "Guardando..." : "Guardar configuracion"
              })]
            })]
          })
        }) : null, canCreateBatches ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
          xl: canAssignBatchSettings ? 8 : 12,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
            className: "batch-manager__panel",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
              className: "batch-manager__panel-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h4", {
                children: "Registrar lote"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                children: "Ingresa lote, proveedor, costo, bodega, cantidad y fechas para alimentar el inventario."
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__["default"], {
              variant: "info",
              className: "mb-4",
              children: "Este lote generara automaticamente una compra en el sistema."
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"], {
              onSubmit: createBatch,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__["default"], {
                className: "g-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Bodega"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Select, {
                      name: "warehouse_id",
                      value: batchForm.warehouse_id,
                      onChange: handleBatchInputChange,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                        value: "",
                        children: "Seleccione"
                      }), warehouseOptions.map(function (warehouse) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                          value: warehouse.value,
                          children: warehouse.label
                        }, warehouse.value);
                      })]
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Proveedor"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Select, {
                      name: "purchase_supplier_id",
                      value: batchForm.purchase_supplier_id,
                      onChange: handleBatchInputChange,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                        value: "",
                        children: "Seleccione"
                      }), supplierOptions.map(function (supplier) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                          value: supplier.value,
                          children: supplier.label
                        }, supplier.value);
                      })]
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Lote sistema"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      name: "codigo_lote_sistema",
                      value: batchForm.codigo_lote_sistema || (dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$draft = dashboard.draft) === null || _dashboard$draft === void 0 ? void 0 : _dashboard$draft.next_codigo_lote_sistema) || "Autogenerado",
                      readOnly: true
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Lote fabricante"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      name: "lote_fabricante",
                      value: batchForm.lote_fabricante,
                      onChange: handleBatchInputChange,
                      placeholder: "Lote impreso por el fabricante"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Barcode lote"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      name: "lot_barcode",
                      value: batchForm.lot_barcode,
                      onChange: handleBatchInputChange,
                      placeholder: "Codigo escaneable"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Ubicacion"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      name: "ubicacion",
                      value: batchForm.ubicacion,
                      onChange: handleBatchInputChange,
                      placeholder: "Pasillo / Estante / Gaveta"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Costo unitario"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "number",
                      name: "product_cost",
                      min: "0.01",
                      step: "0.01",
                      value: batchForm.product_cost,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Precio venta"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "number",
                      name: "product_price",
                      min: "0.01",
                      step: "0.01",
                      value: batchForm.product_price,
                      onChange: handleBatchInputChange,
                      placeholder: String((dashboard === null || dashboard === void 0 ? void 0 : (_dashboard$product13 = dashboard.product) === null || _dashboard$product13 === void 0 ? void 0 : _dashboard$product13.product_price) || "")
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Cantidad"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "number",
                      name: "quantity",
                      min: "0.01",
                      step: "0.01",
                      value: batchForm.quantity,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Recibido"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "date",
                      name: "received_at",
                      value: batchForm.received_at,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Vence"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "date",
                      name: "fecha_vencimiento",
                      value: batchForm.fecha_vencimiento,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Fabricacion"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "date",
                      name: "fecha_fabricacion",
                      value: batchForm.fecha_fabricacion,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Tipo impuesto"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Select, {
                      name: "impuesto_tipo",
                      value: batchForm.impuesto_tipo,
                      onChange: handleBatchInputChange,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                        value: "EXCLUSIVO",
                        children: "EXCLUSIVO"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                        value: "INCLUSIVO",
                        children: "INCLUSIVO"
                      })]
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  md: 4,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Impuesto %"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      type: "number",
                      name: "impuesto_valor",
                      min: "0",
                      max: "100",
                      step: "0.01",
                      value: batchForm.impuesto_valor,
                      onChange: handleBatchInputChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  xs: 12,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                      children: "Descripcion"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                      as: "textarea",
                      rows: 3,
                      name: "descripcion",
                      value: batchForm.descripcion,
                      onChange: handleBatchInputChange,
                      maxLength: 1000,
                      placeholder: "Observaciones legales, sanitarias o logisticas del lote"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                  xs: 12,
                  children: [!settingsForm.track_batches ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_18__["default"], {
                    variant: "warning",
                    className: "mb-3",
                    children: "Active primero el control por lotes para poder registrar existencias por lote."
                  }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
                    type: "submit",
                    className: "batch-manager__primary-btn",
                    disabled: savingBatch || !settingsForm.track_batches,
                    children: savingBatch ? "Registrando..." : "Registrar lote"
                  })]
                })]
              })
            })]
          })
        }) : null]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
        className: "batch-manager__list-panel",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "batch-manager__panel-header",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h4", {
            children: "Lotes registrados"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            children: "Consulta stock, fechas, precios y descripcion de cada lote en una sola vista ordenada."
          })]
        }), batches.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "batch-manager__empty",
          children: "Aun no hay lotes registrados para este producto."
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "batch-manager__batch-grid",
          children: batches.map(function (batch) {
            var meta = (0,_shared_batchHelpers__WEBPACK_IMPORTED_MODULE_13__.getBatchStatusMeta)(batch.status);
            var systemLotCode = batch.codigo_lote_sistema || batch.lot_code || "Sin codigo";
            var manufacturerLotCode = batch.lote_fabricante || batch.lot_code || "Sin dato";
            var batchDescription = String(batch.descripcion || batch.note || "").trim();
            var stockItems = [{
              label: "Disponible",
              value: "".concat(Number(batch.available_quantity || 0).toFixed(2), " u")
            }, {
              label: "Recibido",
              value: "".concat(Number(batch.received_quantity || 0).toFixed(2), " u")
            }, {
              label: "Vence",
              value: formatBatchDate(batch.fecha_vencimiento || batch.expires_at)
            }, {
              label: "Tiempo",
              value: formatBatchDays(batch.days_remaining)
            }];
            var traceabilityItems = [{
              label: "Lote fabricante",
              value: manufacturerLotCode
            }, {
              label: "Codigo de barras",
              value: batch.lot_barcode || "Sin dato"
            }, {
              label: "Ubicacion",
              value: batch.ubicacion || "Sin dato"
            }, {
              label: "Ingreso",
              value: formatBatchDate(batch.received_at)
            }, {
              label: "Fabricacion",
              value: formatBatchDate(batch.fecha_fabricacion)
            }, {
              label: "Compra",
              value: batch.purchase_reference_code || "Sin referencia"
            }];
            var pricingItems = [{
              label: "Precio compra",
              value: money(batch.product_cost || 0)
            }, {
              label: "Precio venta",
              value: batch.product_price !== null && batch.product_price !== undefined ? money(batch.product_price) : "N/A"
            }, {
              label: "Impuesto",
              value: "".concat(batch.impuesto_tipo || "EXCLUSIVO", " ").concat(Number(batch.impuesto_valor || 0).toFixed(2), "%")
            }];
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("article", {
              className: "batch-manager__batch-card batch-manager__batch-card--".concat(meta.tone),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                className: "batch-manager__batch-top",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "batch-manager__batch-heading",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    className: "batch-manager__lot-code",
                    children: "Lote sistema"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h5", {
                    children: systemLotCode
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                    className: "batch-manager__batch-subtitle",
                    children: batch.warehouse_name || "Sin bodega"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                  className: "batch-manager__status-pill batch-manager__status-pill--".concat(meta.tone),
                  children: batch.status_label || "Sin estado"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                className: "batch-manager__batch-line batch-manager__batch-line--".concat(meta.tone),
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "batch-manager__batch-line-copy",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    className: "batch-manager__batch-line-label",
                    children: "Resumen"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("strong", {
                    children: [Number(batch.available_quantity || 0).toFixed(2), " ", "unidades disponibles"]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                  className: "batch-manager__batch-line-meta",
                  children: formatBatchDate(batch.fecha_vencimiento || batch.expires_at)
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "batch-manager__batch-section",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-section-head",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    children: "Stock y vigencia"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-stats",
                  children: stockItems.map(function (item) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                        children: item.label
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                        children: item.value
                      })]
                    }, "".concat(batch.id, "-").concat(item.label));
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "batch-manager__batch-section",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-section-head",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    children: "Trazabilidad"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-meta-grid",
                  children: traceabilityItems.map(function (item) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      className: "batch-manager__batch-meta-item",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                        children: item.label
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                        children: item.value
                      })]
                    }, "".concat(batch.id, "-").concat(item.label));
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "batch-manager__batch-section",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-section-head",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    children: "Precios e impuesto"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-meta-grid batch-manager__batch-meta-grid--pricing",
                  children: pricingItems.map(function (item) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      className: "batch-manager__batch-meta-item",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                        children: item.label
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
                        children: item.value
                      })]
                    }, "".concat(batch.id, "-").concat(item.label));
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("section", {
                className: "batch-manager__batch-description",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                  className: "batch-manager__batch-section-head batch-manager__batch-section-head--description",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                    children: "Descripcion"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                  className: "batch-manager__batch-description-text ".concat(batchDescription ? "" : "batch-manager__batch-description-text--placeholder"),
                  children: batchDescription || "Sin descripcion registrada para este lote."
                })]
              }), canEditBatches ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "d-flex gap-2 mt-1",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
                  variant: "outline-primary",
                  size: "sm",
                  onClick: function onClick() {
                    return startEditingBatch(batch);
                  },
                  children: "Editar lote"
                })
              }) : null, canEditBatches && editingBatchId === batch.id && batchEditForm ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"], {
                className: "mt-3",
                onSubmit: saveBatchChanges,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_22__["default"], {
                  className: "g-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Lote fabricante"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        name: "lote_fabricante",
                        value: batchEditForm.lote_fabricante,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Ubicacion"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        name: "ubicacion",
                        value: batchEditForm.ubicacion,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Fecha fabricacion"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        type: "date",
                        name: "fecha_fabricacion",
                        value: batchEditForm.fecha_fabricacion,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Fecha vencimiento"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        type: "date",
                        name: "fecha_vencimiento",
                        value: batchEditForm.fecha_vencimiento,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Tipo impuesto"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Select, {
                        name: "impuesto_tipo",
                        value: batchEditForm.impuesto_tipo,
                        onChange: handleBatchEditChange,
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                          value: "EXCLUSIVO",
                          children: "EXCLUSIVO"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("option", {
                          value: "INCLUSIVO",
                          children: "INCLUSIVO"
                        })]
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Impuesto %"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        type: "number",
                        min: "0",
                        max: "100",
                        step: "0.01",
                        name: "impuesto_valor",
                        value: batchEditForm.impuesto_valor,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Precio venta"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        type: "number",
                        min: "0.01",
                        step: "0.01",
                        name: "product_price",
                        value: batchEditForm.product_price,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    md: 6,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Cantidad recibida"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        value: Number(batch.received_quantity || 0).toFixed(2),
                        readOnly: true
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    xs: 12,
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Group, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Label, {
                        children: "Descripcion"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_24__["default"].Control, {
                        as: "textarea",
                        rows: 3,
                        maxLength: 1000,
                        name: "descripcion",
                        value: batchEditForm.descripcion,
                        onChange: handleBatchEditChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    xs: 12,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      className: "small text-muted mb-2",
                      children: ["Stock disponible:", " ", Number(batch.available_quantity || 0).toFixed(2), " ", "u. Cantidad y stock son solo lectura."]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                      className: "d-flex gap-2",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
                        type: "submit",
                        size: "sm",
                        className: "batch-manager__primary-btn",
                        disabled: savingBatchUpdate,
                        children: savingBatchUpdate ? "Guardando..." : "Guardar cambios"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_21__["default"], {
                        type: "button",
                        variant: "outline-secondary",
                        size: "sm",
                        onClick: cancelBatchEdit,
                        disabled: savingBatchUpdate,
                        children: "Cancelar"
                      })]
                    })]
                  })]
                })
              }) : null]
            }, batch.id);
          })
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductBatchManager);

/***/ })

}]);