"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_credits_Credits_js"],{

/***/ "./resources/pos/src/components/credits/Credits.js":
/*!*********************************************************!*\
  !*** ./resources/pos/src/components/credits/Credits.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Row.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Col.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header/HeaderTitle */ "./resources/pos/src/components/header/HeaderTitle.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _store_action_toastAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/action/toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_can__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/can */ "./resources/pos/src/shared/can.js");
/* harmony import */ var _store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../store/action/creditListAction */ "./resources/pos/src/store/action/creditListAction.js");
/* harmony import */ var _creditHelpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./creditHelpers */ "./resources/pos/src/components/credits/creditHelpers.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



















var ConfigModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.ConfigModal
    };
  });
});
var DetailModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.DetailModal
    };
  });
});
var EditCreditModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.EditCreditModal
    };
  });
});
var ManualCreditModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.ManualCreditModal
    };
  });
});
var PaymentModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.PaymentModal
    };
  });
});
var CreditPrintPreviewModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditPrintPreviewModal_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditPrintPreviewModal */ "./resources/pos/src/components/credits/CreditPrintPreviewModal.js")).then(function (module) {
    return {
      "default": module["default"]
    };
  });
});
var RestructureCreditModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.RestructureCreditModal
    };
  });
});
var ReturnModal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js")).then(function (module) {
    return {
      "default": module.ReturnModal
    };
  });
});

var preloadCreditModalBundles = function preloadCreditModalBundles() {
  __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditModals_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditModals */ "./resources/pos/src/components/credits/CreditModals.js"));
  __webpack_require__.e(/*! import() */ "resources_pos_src_components_credits_CreditPrintPreviewModal_js").then(__webpack_require__.bind(__webpack_require__, /*! ./CreditPrintPreviewModal */ "./resources/pos/src/components/credits/CreditPrintPreviewModal.js"));
};

var PAGE_SIZE = 3;
var PAGE_WINDOW_SIZE = 5;
var MANUAL_PRODUCT_PAGE_SIZE = 250;
var MANUAL_SEARCH_RESULT_LIMIT = 6;

var createDefaultManualForm = function createDefaultManualForm() {
  return _objectSpread(_objectSpread({}, _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_MANUAL_FORM), {}, {
    start_date: moment__WEBPACK_IMPORTED_MODULE_2___default()().format("YYYY-MM-DD"),
    due_date: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(1, "month").format("YYYY-MM-DD")
  });
};

var resolveCreditInstallmentsCount = function resolveCreditInstallmentsCount(detail) {
  if ((detail === null || detail === void 0 ? void 0 : detail.credit_type) === "libre") {
    return 1;
  }

  if (Number.isFinite(Number(detail === null || detail === void 0 ? void 0 : detail.installments_count))) {
    return Number(detail.installments_count);
  }

  if (Array.isArray(detail === null || detail === void 0 ? void 0 : detail.installments)) {
    return detail.installments.length || 1;
  }

  return Number((detail === null || detail === void 0 ? void 0 : detail.installments) || 1) || 1;
};

var SECTION_RESULT_LABELS = {
  credits: "creditos",
  customers: "clientes",
  overdue: "morosos",
  interest: "registros"
};

var Credits = function Credits() {
  var _creditListState$load, _creditListState$erro, _manualForm$warehouse2, _manualForm$warehouse6, _manualForm$warehouse8, _manualForm$warehouse9;

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useLocation)();

  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useParams)(),
      creditId = _useParams.creditId;

  var settings = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state.settings;
  });
  var allConfigData = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state.allConfigData;
  });
  var creditListState = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state.creditList;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      saving = _useState4[0],
      setSaving = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      detailLoading = _useState6[0],
      setDetailLoading = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      customers = _useState8[0],
      setCustomers = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      warehouses = _useState10[0],
      setWarehouses = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      warehouseProducts = _useState12[0],
      setWarehouseProducts = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("credits"),
      _useState14 = _slicedToArray(_useState13, 2),
      activeSection = _useState14[0],
      setActiveSection = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    search: "",
    status: ""
  }),
      _useState16 = _slicedToArray(_useState15, 2),
      filters = _useState16[0],
      setFilters = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState18 = _slicedToArray(_useState17, 2),
      debouncedSearch = _useState18[0],
      setDebouncedSearch = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    page: 1,
    limit: PAGE_SIZE
  }),
      _useState20 = _slicedToArray(_useState19, 2),
      pagination = _useState20[0],
      setPagination = _useState20[1];

  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      listReady = _useState22[0],
      setListReady = _useState22[1];

  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    summary: {},
    customer_configs: [],
    credits: [],
    overdue_customers: [],
    interest_report: []
  }),
      _useState24 = _slicedToArray(_useState23, 2),
      dashboard = _useState24[0],
      setDashboard = _useState24[1];

  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState26 = _slicedToArray(_useState25, 2),
      creditDetail = _useState26[0],
      setCreditDetail = _useState26[1];

  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState28 = _slicedToArray(_useState27, 2),
      showConfigModal = _useState28[0],
      setShowConfigModal = _useState28[1];

  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState30 = _slicedToArray(_useState29, 2),
      showManualModal = _useState30[0],
      setShowManualModal = _useState30[1];

  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState32 = _slicedToArray(_useState31, 2),
      showDetailModal = _useState32[0],
      setShowDetailModal = _useState32[1];

  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState34 = _slicedToArray(_useState33, 2),
      showEditModal = _useState34[0],
      setShowEditModal = _useState34[1];

  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState36 = _slicedToArray(_useState35, 2),
      showPaymentModal = _useState36[0],
      setShowPaymentModal = _useState36[1];

  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState38 = _slicedToArray(_useState37, 2),
      showPrintPreviewModal = _useState38[0],
      setShowPrintPreviewModal = _useState38[1];

  var _useState39 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState40 = _slicedToArray(_useState39, 2),
      showRestructureModal = _useState40[0],
      setShowRestructureModal = _useState40[1];

  var _useState41 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState42 = _slicedToArray(_useState41, 2),
      showReturnModal = _useState42[0],
      setShowReturnModal = _useState42[1];

  var _useState43 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState44 = _slicedToArray(_useState43, 2),
      printPreviewCreditId = _useState44[0],
      setPrintPreviewCreditId = _useState44[1];

  var _useState45 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState46 = _slicedToArray(_useState45, 2),
      currentAction = _useState46[0],
      setCurrentAction = _useState46[1];

  var _useState47 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_CONFIG_FORM),
      _useState48 = _slicedToArray(_useState47, 2),
      configForm = _useState48[0],
      setConfigForm = _useState48[1];

  var _useState49 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(createDefaultManualForm),
      _useState50 = _slicedToArray(_useState49, 2),
      manualForm = _useState50[0],
      setManualForm = _useState50[1];

  var _useState51 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState52 = _slicedToArray(_useState51, 2),
      manualProductsLoading = _useState52[0],
      setManualProductsLoading = _useState52[1];

  var _useState53 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_EDIT_CREDIT_FORM),
      _useState54 = _slicedToArray(_useState53, 2),
      editForm = _useState54[0],
      setEditForm = _useState54[1];

  var _useState55 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_PAYMENT_FORM),
      _useState56 = _slicedToArray(_useState55, 2),
      paymentForm = _useState56[0],
      setPaymentForm = _useState56[1];

  var _useState57 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RESTRUCTURE_CREDIT_FORM),
      _useState58 = _slicedToArray(_useState57, 2),
      restructureForm = _useState58[0],
      setRestructureForm = _useState58[1];

  var _useState59 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RETURN_FORM),
      _useState60 = _slicedToArray(_useState59, 2),
      returnForm = _useState60[0],
      setReturnForm = _useState60[1];

  var _useState61 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState62 = _slicedToArray(_useState61, 2),
      configErrors = _useState62[0],
      setConfigErrors = _useState62[1];

  var _useState63 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState64 = _slicedToArray(_useState63, 2),
      editErrors = _useState64[0],
      setEditErrors = _useState64[1];

  var _useState65 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState66 = _slicedToArray(_useState65, 2),
      manualErrors = _useState66[0],
      setManualErrors = _useState66[1];

  var _useState67 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState68 = _slicedToArray(_useState67, 2),
      paymentErrors = _useState68[0],
      setPaymentErrors = _useState68[1];

  var _useState69 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState70 = _slicedToArray(_useState69, 2),
      restructureErrors = _useState70[0],
      setRestructureErrors = _useState70[1];

  var _useState71 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState72 = _slicedToArray(_useState71, 2),
      returnErrors = _useState72[0],
      setReturnErrors = _useState72[1];

  var manualProductInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var manualProductsCacheRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());
  var manualProductsRequestIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  var manualLastAutoAddedQueryRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)("");
  var detailRequestIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  var routeCreditId = Number(creditId || 0);
  var routeAction = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new URLSearchParams(location.search).get("action");
  }, [location.search]);
  var canViewCredits = (0,_shared_can__WEBPACK_IMPORTED_MODULE_10__.can)("ver_creditos", {
    strict: true
  });
  var canViewCreditDetail = (0,_shared_can__WEBPACK_IMPORTED_MODULE_10__.can)("ver_detalle_credito", {
    strict: true
  });
  var canCreateCredits = (0,_shared_can__WEBPACK_IMPORTED_MODULE_10__.can)("crear_creditos", {
    strict: true
  });
  var canEditCredits = (0,_shared_can__WEBPACK_IMPORTED_MODULE_10__.can)("editar_creditos", {
    strict: true
  });
  var canRegisterCreditPayments = (0,_shared_can__WEBPACK_IMPORTED_MODULE_10__.can)("registrar_pagos_credito", {
    strict: true
  });
  var toast = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (text) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.SUCCESS;
    return dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_7__.addToast)({
      text: text,
      type: type
    }));
  }, [dispatch]);
  var getErrorMessage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (error) {
    var _error$response, _error$response$data;

    return (error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || (error === null || error === void 0 ? void 0 : error.message) || "No se pudo completar la operacion.";
  }, []);
  var money = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value) {
    var safeNumber = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(value, 0);
    var safeCurrency = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getCurrencySymbol)(settings);
    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.currencySymbolHandling)(allConfigData, safeCurrency, safeNumber);
  }, [allConfigData, settings]);

  var buildCreditEditForm = function buildCreditEditForm(detail) {
    return _objectSpread(_objectSpread({}, _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_EDIT_CREDIT_FORM), {}, {
      credit_type: (detail === null || detail === void 0 ? void 0 : detail.credit_type) || "automatico",
      installments: String(resolveCreditInstallmentsCount(detail)),
      interest_rate: Number((detail === null || detail === void 0 ? void 0 : detail.interest_rate) || 0).toFixed(2),
      start_date: (detail === null || detail === void 0 ? void 0 : detail.start_date) || moment__WEBPACK_IMPORTED_MODULE_2___default()().format("YYYY-MM-DD"),
      due_date: (detail === null || detail === void 0 ? void 0 : detail.due_date) || moment__WEBPACK_IMPORTED_MODULE_2___default()().add(1, "month").format("YYYY-MM-DD"),
      note: (detail === null || detail === void 0 ? void 0 : detail.note) || ""
    });
  };

  var buildCreditRestructureForm = function buildCreditRestructureForm(detail) {
    return _objectSpread(_objectSpread({}, _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RESTRUCTURE_CREDIT_FORM), {}, {
      credit_type: (detail === null || detail === void 0 ? void 0 : detail.credit_type) || "automatico",
      installments: String(resolveCreditInstallmentsCount(detail)),
      interest_rate: Number((detail === null || detail === void 0 ? void 0 : detail.interest_rate) || 0).toFixed(2),
      start_date: moment__WEBPACK_IMPORTED_MODULE_2___default()().format("YYYY-MM-DD"),
      due_date: (detail === null || detail === void 0 ? void 0 : detail.due_date) || moment__WEBPACK_IMPORTED_MODULE_2___default()().add(1, "month").format("YYYY-MM-DD"),
      note: (detail === null || detail === void 0 ? void 0 : detail.note) || ""
    });
  };

  var buildCreditTermsPayload = function buildCreditTermsPayload(form) {
    return {
      credit_type: form.credit_type,
      installments: form.credit_type === "libre" ? 1 : Math.max(Number(form.installments || 1), 1),
      interest_rate: Number(form.interest_rate || 0),
      start_date: form.start_date,
      due_date: form.due_date,
      note: form.note
    };
  };

  var currentListParams = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return {
      section: activeSection,
      search: debouncedSearch,
      status: activeSection === "credits" || activeSection === "interest" ? filters.status : "",
      page: pagination.page,
      limit: pagination.limit
    };
  }, [activeSection, debouncedSearch, filters.status, pagination.limit, pagination.page]);
  var currentRequestKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.buildCreditListRequestKey)(currentListParams);
  }, [currentListParams]);
  var currentPageData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _creditListState$cach;

    return (creditListState === null || creditListState === void 0 ? void 0 : (_creditListState$cach = creditListState.cacheByRequestKey) === null || _creditListState$cach === void 0 ? void 0 : _creditListState$cach[currentRequestKey]) || null;
  }, [creditListState === null || creditListState === void 0 ? void 0 : creditListState.cacheByRequestKey, currentRequestKey]);
  var activeRows = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (currentPageData === null || currentPageData === void 0 ? void 0 : currentPageData.rows) || [];
  }, [currentPageData]);
  var activeMeta = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (currentPageData === null || currentPageData === void 0 ? void 0 : currentPageData.meta) || {
      total: 0,
      per_page: pagination.limit,
      current_page: pagination.page,
      last_page: 0,
      from: 0,
      to: 0
    };
  }, [currentPageData, pagination.limit, pagination.page]);
  var isListLoading = Boolean(creditListState === null || creditListState === void 0 ? void 0 : (_creditListState$load = creditListState.loadingByRequestKey) === null || _creditListState$load === void 0 ? void 0 : _creditListState$load[currentRequestKey]);
  var listError = creditListState === null || creditListState === void 0 ? void 0 : (_creditListState$erro = creditListState.errorByRequestKey) === null || _creditListState$erro === void 0 ? void 0 : _creditListState$erro[currentRequestKey];
  var shouldShowListSkeleton = isListLoading && !currentPageData;
  var visiblePageNumbers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var totalPages = Math.max(Number(activeMeta.last_page || 0), 1);
    var currentPage = Math.min(Math.max(Number(activeMeta.current_page || 1), 1), totalPages);
    var halfWindow = Math.floor(PAGE_WINDOW_SIZE / 2);
    var startPage = Math.max(currentPage - halfWindow, 1);
    var endPage = Math.min(startPage + PAGE_WINDOW_SIZE - 1, totalPages);
    startPage = Math.max(endPage - PAGE_WINDOW_SIZE + 1, 1);
    return Array.from({
      length: endPage - startPage + 1
    }, function (_, index) {
      return startPage + index;
    });
  }, [activeMeta.current_page, activeMeta.last_page]);
  var paginationSummary = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var label = SECTION_RESULT_LABELS[activeSection] || "registros";

    if (activeMeta.total <= 0) {
      return "0 ".concat(label);
    }

    return "".concat(activeMeta.from, "-").concat(activeMeta.to, " de ").concat(activeMeta.total, " ").concat(label);
  }, [activeMeta.from, activeMeta.to, activeMeta.total, activeSection]);
  var closeAllCreditModals = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowConfigModal(false);
    setShowManualModal(false);
    setShowDetailModal(false);
    setShowEditModal(false);
    setShowPaymentModal(false);
    setShowPrintPreviewModal(false);
    setShowRestructureModal(false);
    setShowReturnModal(false);
  }, []);

  var resetManualModalState = function resetManualModalState() {
    manualProductsRequestIdRef.current += 1;
    manualLastAutoAddedQueryRef.current = "";
    setManualErrors({});
    setManualForm(createDefaultManualForm());
    setManualProductsLoading(false);
    setWarehouseProducts([]);
  };

  var closeManualModal = function closeManualModal() {
    setShowManualModal(false);
    setCurrentAction(null);
    setCreditDetail(null);
    resetManualModalState();
  };

  var closeDetailModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    cancelPendingDetailRequest();
    setShowDetailModal(false);
    setCurrentAction(null);
    setCreditDetail(null);

    if (routeCreditId) {
      navigate("/app/credits", {
        replace: true
      });
    }
  }, [cancelPendingDetailRequest, navigate, routeCreditId]);
  var closeEditModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var shouldReturnToDetail = currentAction === "view" && !!creditDetail;
    setShowEditModal(false);

    if (shouldReturnToDetail) {
      closeAllCreditModals();
      setShowDetailModal(true);
      return;
    }

    cancelPendingDetailRequest();
    setCurrentAction(null);
    setCreditDetail(null);
  }, [cancelPendingDetailRequest, closeAllCreditModals, creditDetail, currentAction]);
  var closeRestructureModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var shouldReturnToDetail = currentAction === "view" && !!creditDetail;
    setShowRestructureModal(false);

    if (shouldReturnToDetail) {
      closeAllCreditModals();
      setShowDetailModal(true);
      return;
    }

    cancelPendingDetailRequest();
    setCurrentAction(null);
    setCreditDetail(null);
  }, [cancelPendingDetailRequest, closeAllCreditModals, creditDetail, currentAction]);
  var closeConfigModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowConfigModal(false);
    setCurrentAction(null);
  }, []);
  var closePaymentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    cancelPendingDetailRequest();
    setShowPaymentModal(false);
    setCurrentAction(null);
    setCreditDetail(null);
    setPaymentForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_PAYMENT_FORM);
    setPaymentErrors({});

    if (routeCreditId && routeAction === "payment") {
      navigate("/app/credits", {
        replace: true
      });
    }
  }, [cancelPendingDetailRequest, navigate, routeAction, routeCreditId]);
  var closeReturnModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    cancelPendingDetailRequest();
    setShowReturnModal(false);
    setCurrentAction(null);
    setCreditDetail(null);
    setReturnForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RETURN_FORM);
    setReturnErrors({});
  }, [cancelPendingDetailRequest]);
  var closePrintPreviewModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowPrintPreviewModal(false);
    setPrintPreviewCreditId(null);
  }, []);
  var openManualModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!canCreateCredits) {
      toast("No tiene permiso para crear creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    closeAllCreditModals();
    setCurrentAction("create");
    setCreditDetail(null);
    resetManualModalState();
    setShowManualModal(true);
  }, [canCreateCredits, closeAllCreditModals, toast]);
  var existingCustomerIds = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [];
  }, []);

  var clearManualErrorFields = function clearManualErrorFields() {
    for (var _len = arguments.length, fieldNames = new Array(_len), _key = 0; _key < _len; _key++) {
      fieldNames[_key] = arguments[_key];
    }

    if (fieldNames.length === 0) {
      return;
    }

    setManualErrors(function (prev) {
      var nextErrors = _objectSpread({}, prev);

      fieldNames.forEach(function (fieldName) {
        delete nextErrors[fieldName];
      });
      return nextErrors;
    });
  };

  var focusManualProductInput = function focusManualProductInput() {
    setTimeout(function () {
      var _manualProductInputRe, _manualProductInputRe2, _manualProductInputRe3;

      (_manualProductInputRe = manualProductInputRef.current) === null || _manualProductInputRe === void 0 ? void 0 : _manualProductInputRe.focus();
      (_manualProductInputRe2 = manualProductInputRef.current) === null || _manualProductInputRe2 === void 0 ? void 0 : (_manualProductInputRe3 = _manualProductInputRe2.select) === null || _manualProductInputRe3 === void 0 ? void 0 : _manualProductInputRe3.call(_manualProductInputRe2);
    }, 80);
  };

  var normalizeManualLookup = function normalizeManualLookup(value) {
    return String(value || "").trim().toLowerCase();
  };

  var getManualProductStock = function getManualProductStock(product) {
    var _product$attributes, _product$attributes$s;

    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(product === null || product === void 0 ? void 0 : (_product$attributes = product.attributes) === null || _product$attributes === void 0 ? void 0 : (_product$attributes$s = _product$attributes.stock) === null || _product$attributes$s === void 0 ? void 0 : _product$attributes$s.quantity, 0);
  };

  var formatManualQuantity = function formatManualQuantity(value) {
    var safeValue = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(value, 0);

    if (!Number.isFinite(safeValue)) {
      return "0";
    }

    if (Number.isInteger(safeValue)) {
      return String(safeValue);
    }

    return String(Number(safeValue.toFixed(2)));
  };

  var warehouseProductsById = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var productMap = new Map();
    (warehouseProducts || []).forEach(function (product) {
      productMap.set(Number(product.id), product);
    });
    return productMap;
  }, [warehouseProducts]);
  var warehouseExactCodeMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var productMap = new Map();
    (warehouseProducts || []).forEach(function (product) {
      var _product$attributes2, _product$attributes3;

      [product === null || product === void 0 ? void 0 : (_product$attributes2 = product.attributes) === null || _product$attributes2 === void 0 ? void 0 : _product$attributes2.code, product === null || product === void 0 ? void 0 : (_product$attributes3 = product.attributes) === null || _product$attributes3 === void 0 ? void 0 : _product$attributes3.product_code].map(normalizeManualLookup).filter(Boolean).forEach(function (code) {
        if (!productMap.has(code)) {
          productMap.set(code, product);
        }
      });
    });
    return productMap;
  }, [warehouseProducts]);
  var warehouseSearchIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (warehouseProducts || []).map(function (product) {
      var _product$attributes4, _product$attributes5, _product$attributes6;

      return {
        product: product,
        id: Number(product.id),
        normalizedCode: normalizeManualLookup(product === null || product === void 0 ? void 0 : (_product$attributes4 = product.attributes) === null || _product$attributes4 === void 0 ? void 0 : _product$attributes4.code),
        normalizedProductCode: normalizeManualLookup(product === null || product === void 0 ? void 0 : (_product$attributes5 = product.attributes) === null || _product$attributes5 === void 0 ? void 0 : _product$attributes5.product_code),
        normalizedName: normalizeManualLookup(product === null || product === void 0 ? void 0 : (_product$attributes6 = product.attributes) === null || _product$attributes6 === void 0 ? void 0 : _product$attributes6.name)
      };
    });
  }, [warehouseProducts]);
  var manualTotal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (manualForm.items || []).reduce(function (sum, item) {
      var _product$attributes7;

      var product = warehouseProductsById.get(Number(item.product_id || 0));
      var price = Number((product === null || product === void 0 ? void 0 : (_product$attributes7 = product.attributes) === null || _product$attributes7 === void 0 ? void 0 : _product$attributes7.product_price) || 0);
      var quantity = Number(item.quantity || 0);

      if (!product || quantity <= 0) {
        return sum;
      }

      return sum + price * quantity;
    }, 0);
  }, [manualForm.items, warehouseProductsById]);

  var findWarehouseProductById = function findWarehouseProductById(productId) {
    return warehouseProductsById.get(Number(productId || 0)) || null;
  };

  var findWarehouseProductByExactCode = function findWarehouseProductByExactCode(query) {
    var normalizedQuery = normalizeManualLookup(query);

    if (!normalizedQuery) {
      return null;
    }

    return warehouseExactCodeMap.get(normalizedQuery) || null;
  };

  var getManualSearchResults = function getManualSearchResults(query) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MANUAL_SEARCH_RESULT_LIMIT;
    var normalizedQuery = normalizeManualLookup(query);

    if (!normalizedQuery) {
      return [];
    }

    var results = [];
    var seenIds = new Set();
    var exactCodeMatch = findWarehouseProductByExactCode(normalizedQuery);

    var pushUniqueResult = function pushUniqueResult(product) {
      if (!product) {
        return;
      }

      var productId = Number(product.id || 0);

      if (seenIds.has(productId)) {
        return;
      }

      seenIds.add(productId);
      results.push(product);
    };

    pushUniqueResult(exactCodeMatch);
    warehouseSearchIndex.forEach(function (entry) {
      var searchableValues = [entry.normalizedCode, entry.normalizedProductCode, entry.normalizedName].filter(Boolean);

      if (entry.normalizedName && entry.normalizedName === normalizedQuery) {
        pushUniqueResult(entry.product);
        return;
      }

      if (searchableValues.some(function (value) {
        return value.startsWith(normalizedQuery);
      })) {
        pushUniqueResult(entry.product);
      }
    });
    warehouseSearchIndex.forEach(function (entry) {
      var searchableValues = [entry.normalizedCode, entry.normalizedProductCode, entry.normalizedName].filter(Boolean);

      if (searchableValues.some(function (value) {
        return value.includes(normalizedQuery);
      })) {
        pushUniqueResult(entry.product);
      }
    });
    return results.slice(0, Math.max(limit, 1));
  };

  var findWarehouseProductByLookup = function findWarehouseProductByLookup(query) {
    return getManualSearchResults(query, 1)[0] || null;
  };

  var manualSearchResults = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _manualForm$warehouse;

    if (!showManualModal || !((_manualForm$warehouse = manualForm.warehouse_id) !== null && _manualForm$warehouse !== void 0 && _manualForm$warehouse.value)) {
      return [];
    }

    return getManualSearchResults(manualForm.product_search);
  }, [showManualModal, manualForm.product_search, (_manualForm$warehouse2 = manualForm.warehouse_id) === null || _manualForm$warehouse2 === void 0 ? void 0 : _manualForm$warehouse2.value, warehouseExactCodeMap, warehouseSearchIndex]);
  var manualProductPreview = manualSearchResults[0] || null;

  var getRequestedProductQuantity = function getRequestedProductQuantity(productId) {
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : manualForm.items || [];
    var excludedIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    return (items || []).reduce(function (sum, item, index) {
      if (index === excludedIndex) {
        return sum;
      }

      if (Number(item.product_id || 0) !== Number(productId || 0)) {
        return sum;
      }

      return sum + (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(item.quantity, 0);
    }, 0);
  };

  var addManualProductToForm = function addManualProductToForm(product) {
    var _product$attributes8;

    if (!product) {
      return false;
    }

    var stockQuantity = getManualProductStock(product);
    var productName = (product === null || product === void 0 ? void 0 : (_product$attributes8 = product.attributes) === null || _product$attributes8 === void 0 ? void 0 : _product$attributes8.name) || "Producto";

    if (stockQuantity <= 0) {
      setManualErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_search: "Stock insuficiente."
        });
      });
      toast("Stock insuficiente", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      focusManualProductInput();
      return false;
    }

    var stockExceeded = false;
    setManualForm(function (prev) {
      var items = Array.isArray(prev.items) ? _toConsumableArray(prev.items) : [];
      var existingIndex = items.findIndex(function (item) {
        return Number(item.product_id || 0) === Number(product.id);
      });

      if (existingIndex >= 0) {
        var currentQuantity = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(items[existingIndex].quantity, 0);
        var nextQuantity = currentQuantity + 1;

        if (nextQuantity > stockQuantity) {
          stockExceeded = true;
          return prev;
        }

        items[existingIndex] = _objectSpread(_objectSpread({}, items[existingIndex]), {}, {
          quantity: formatManualQuantity(nextQuantity)
        });
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_search: "",
          items: items
        });
      }

      return _objectSpread(_objectSpread({}, prev), {}, {
        product_search: "",
        items: [].concat(_toConsumableArray(items), [{
          product_id: String(product.id),
          quantity: "1"
        }])
      });
    });

    if (stockExceeded) {
      setManualErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_search: "Stock insuficiente."
        });
      });
      toast("Stock insuficiente", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      focusManualProductInput();
      return false;
    }

    clearManualErrorFields("product_search", "items", "total_amount", "warehouse_id");
    toast("".concat(productName, " agregado correctamente"));
    focusManualProductInput();
    return true;
  };

  var handleManualWarehouseChange = function handleManualWarehouseChange(value) {
    setManualForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        warehouse_id: value,
        product_search: "",
        items: []
      });
    });
    manualLastAutoAddedQueryRef.current = "";
    clearManualErrorFields("warehouse_id", "product_search", "items", "total_amount");
    focusManualProductInput();
  };

  var handleManualProductSearchChange = function handleManualProductSearchChange(value) {
    var _manualForm$warehouse3;

    setManualForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        product_search: value
      });
    });
    clearManualErrorFields("product_search", "items", "total_amount");
    manualLastAutoAddedQueryRef.current = "";

    if (!((_manualForm$warehouse3 = manualForm.warehouse_id) !== null && _manualForm$warehouse3 !== void 0 && _manualForm$warehouse3.value)) {
      return;
    }

    var normalizedQuery = normalizeManualLookup(value);

    if (!normalizedQuery) {
      return;
    }

    var matchedProduct = findWarehouseProductByExactCode(normalizedQuery);

    if (!matchedProduct) {
      return;
    }

    manualLastAutoAddedQueryRef.current = normalizedQuery;
    addManualProductToForm(matchedProduct);
  };

  var handleManualProductSearchSubmit = function handleManualProductSearchSubmit(searchValueArg) {
    var _ref, _manualForm$warehouse4;

    var searchValue = String((_ref = searchValueArg !== null && searchValueArg !== void 0 ? searchValueArg : manualForm.product_search) !== null && _ref !== void 0 ? _ref : "").trim();
    var normalizedQuery = normalizeManualLookup(searchValue);

    if (!((_manualForm$warehouse4 = manualForm.warehouse_id) !== null && _manualForm$warehouse4 !== void 0 && _manualForm$warehouse4.value)) {
      setManualErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          warehouse_id: "Seleccione una bodega antes de agregar productos."
        });
      });
      toast("Seleccione una bodega primero.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      focusManualProductInput();
      return;
    }

    if (!searchValue) {
      setManualErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_search: "Escanee o escriba un codigo valido."
        });
      });
      focusManualProductInput();
      return;
    }

    if (normalizedQuery && normalizedQuery === manualLastAutoAddedQueryRef.current) {
      manualLastAutoAddedQueryRef.current = "";
      focusManualProductInput();
      return;
    }

    var product = findWarehouseProductByLookup(searchValue);

    if (!product) {
      setManualErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          product_search: "Producto no encontrado."
        });
      });
      toast("Producto no encontrado", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      focusManualProductInput();
      return;
    }

    manualLastAutoAddedQueryRef.current = "";
    addManualProductToForm(product);
  };

  var handleManualItemQuantityChange = function handleManualItemQuantityChange(index, value) {
    if (value === "") {
      setManualForm(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          items: prev.items.map(function (item, itemIndex) {
            return itemIndex === index ? _objectSpread(_objectSpread({}, item), {}, {
              quantity: ""
            }) : item;
          })
        });
      });
      clearManualErrorFields("items", "total_amount");
      return;
    }

    var nextQuantity = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(value, 0);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
      return;
    }

    var stockExceeded = false;
    setManualForm(function (prev) {
      var items = prev.items.map(function (item) {
        return _objectSpread({}, item);
      });
      var currentItem = items[index];

      if (!currentItem) {
        return prev;
      }

      var product = findWarehouseProductById(currentItem.product_id);
      var stockQuantity = getManualProductStock(product);
      var otherQuantity = getRequestedProductQuantity(currentItem.product_id, prev.items, index);
      var maxAllowedQuantity = Math.max(stockQuantity - otherQuantity, 0);
      var safeQuantity = product && nextQuantity > maxAllowedQuantity ? maxAllowedQuantity : nextQuantity;

      if (product && nextQuantity > maxAllowedQuantity) {
        stockExceeded = true;
      }

      items[index] = _objectSpread(_objectSpread({}, currentItem), {}, {
        quantity: formatManualQuantity(safeQuantity)
      });
      return _objectSpread(_objectSpread({}, prev), {}, {
        items: items
      });
    });

    if (stockExceeded) {
      toast("Stock insuficiente", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
    }

    clearManualErrorFields("items", "total_amount");
  };

  var handleManualItemRemove = function handleManualItemRemove(index) {
    setManualForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        items: prev.items.filter(function (_, itemIndex) {
          return itemIndex !== index;
        })
      });
    });
    clearManualErrorFields("items", "total_amount", "product_search");
    focusManualProductInput();
  };

  var fetchCustomers = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _response$data, response;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].get("/customers?page[size]=0");

            case 3:
              response = _context.sent;
              setCustomers((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || []);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              toast(getErrorMessage(_context.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function fetchCustomers() {
      return _ref2.apply(this, arguments);
    };
  }();

  var fetchWarehouses = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _response$data2, response;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].get("/warehouses?page[size]=0");

            case 3:
              response = _context2.sent;
              setWarehouses((response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) || []);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              toast(getErrorMessage(_context2.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function fetchWarehouses() {
      return _ref3.apply(this, arguments);
    };
  }();

  var fetchWarehouseProducts = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(warehouseId) {
      var normalizedWarehouseId, cacheKey, requestId, cachedProducts, _ret;

      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              normalizedWarehouseId = Number(warehouseId || 0);

              if (normalizedWarehouseId) {
                _context4.next = 6;
                break;
              }

              manualProductsRequestIdRef.current += 1;
              setManualProductsLoading(false);
              setWarehouseProducts([]);
              return _context4.abrupt("return", []);

            case 6:
              cacheKey = String(normalizedWarehouseId);
              requestId = ++manualProductsRequestIdRef.current;
              cachedProducts = manualProductsCacheRef.current.get(cacheKey);

              if (!cachedProducts) {
                _context4.next = 13;
                break;
              }

              setManualProductsLoading(false);
              setWarehouseProducts(cachedProducts);
              return _context4.abrupt("return", cachedProducts);

            case 13:
              _context4.prev = 13;
              return _context4.delegateYield( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                var page, hasMorePages, catalogById, _response$data3, _response$data4, response, batch, meta, catalog;

                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        setManualProductsLoading(true);
                        page = 1;
                        hasMorePages = true;
                        catalogById = new Map();

                      case 4:
                        if (!hasMorePages) {
                          _context3.next = 15;
                          break;
                        }

                        _context3.next = 7;
                        return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].get("/products/pos-feed?warehouse_id=".concat(normalizedWarehouseId, "&page[number]=").concat(page, "&page[size]=").concat(MANUAL_PRODUCT_PAGE_SIZE));

                      case 7:
                        response = _context3.sent;
                        batch = (response === null || response === void 0 ? void 0 : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.data) || [];
                        meta = (response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.meta) || {};
                        batch.forEach(function (product) {
                          catalogById.set(Number(product.id), product);
                        });
                        hasMorePages = Boolean(meta.has_more_pages) && batch.length > 0;
                        page += 1;
                        _context3.next = 4;
                        break;

                      case 15:
                        catalog = Array.from(catalogById.values());
                        manualProductsCacheRef.current.set(cacheKey, catalog);

                        if (requestId === manualProductsRequestIdRef.current) {
                          setWarehouseProducts(catalog);
                        }

                        return _context3.abrupt("return", {
                          v: catalog
                        });

                      case 19:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              })(), "t0", 15);

            case 15:
              _ret = _context4.t0;

              if (!(_typeof(_ret) === "object")) {
                _context4.next = 18;
                break;
              }

              return _context4.abrupt("return", _ret.v);

            case 18:
              _context4.next = 24;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t1 = _context4["catch"](13);

              if (requestId === manualProductsRequestIdRef.current) {
                setWarehouseProducts([]);
                toast(getErrorMessage(_context4.t1), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              }

              return _context4.abrupt("return", []);

            case 24:
              _context4.prev = 24;

              if (requestId === manualProductsRequestIdRef.current) {
                setManualProductsLoading(false);
              }

              return _context4.finish(24);

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[13, 20, 24, 27]]);
    }));

    return function fetchWarehouseProducts(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  var fetchDashboard = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var _response$data5, response;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (canViewCredits) {
              _context5.next = 4;
              break;
            }

            setLoading(false);
            setDashboard({
              summary: {},
              customer_configs: [],
              credits: [],
              overdue_customers: [],
              interest_report: []
            });
            return _context5.abrupt("return");

          case 4:
            _context5.prev = 4;
            setLoading(true);
            _context5.next = 8;
            return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].get("/credits/dashboard");

          case 8:
            response = _context5.sent;
            setDashboard((response === null || response === void 0 ? void 0 : (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.data) || {});
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](4);
            toast(getErrorMessage(_context5.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

          case 15:
            _context5.prev = 15;
            setLoading(false);
            return _context5.finish(15);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 12, 15, 18]]);
  })), [canViewCredits, getErrorMessage, toast]);
  var fetchCreditDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(creditId) {
      var options,
          requestId,
          _response$data6,
          _options$onSuccess,
          response,
          detail,
          _args6 = arguments;

      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              requestId = Number(options.requestId || 0) || detailRequestIdRef.current + 1;
              detailRequestIdRef.current = requestId;
              _context6.prev = 3;
              setDetailLoading(true);
              _context6.next = 7;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].get("/credits/".concat(creditId));

            case 7:
              response = _context6.sent;

              if (!(detailRequestIdRef.current !== requestId)) {
                _context6.next = 10;
                break;
              }

              return _context6.abrupt("return", null);

            case 10:
              detail = (response === null || response === void 0 ? void 0 : (_response$data6 = response.data) === null || _response$data6 === void 0 ? void 0 : _response$data6.data) || null;
              setCreditDetail(detail);
              (_options$onSuccess = options.onSuccess) === null || _options$onSuccess === void 0 ? void 0 : _options$onSuccess.call(options, detail);
              return _context6.abrupt("return", detail);

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](3);

              if (!(detailRequestIdRef.current !== requestId)) {
                _context6.next = 20;
                break;
              }

              return _context6.abrupt("return", null);

            case 20:
              toast(getErrorMessage(_context6.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context6.abrupt("return", null);

            case 22:
              _context6.prev = 22;

              if (detailRequestIdRef.current === requestId) {
                setDetailLoading(false);
              }

              return _context6.finish(22);

            case 25:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 16, 22, 25]]);
    }));

    return function (_x2) {
      return _ref6.apply(this, arguments);
    };
  }(), [getErrorMessage, toast]);
  var cancelPendingDetailRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    detailRequestIdRef.current += 1;
    setDetailLoading(false);
  }, []);
  var openModalWithCreditDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (creditId) {
    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        action = _ref7.action,
        openModal = _ref7.openModal,
        onSuccess = _ref7.onSuccess;

    var resolvedCreditId = Number(creditId || 0);

    if (resolvedCreditId <= 0 || typeof openModal !== "function") {
      return;
    }

    var requestId = detailRequestIdRef.current + 1;
    detailRequestIdRef.current = requestId;
    setCurrentAction(action || null);
    setCreditDetail(null);
    setDetailLoading(true);
    closeAllCreditModals();
    openModal(true);
    fetchCreditDetail(resolvedCreditId, {
      requestId: requestId,
      onSuccess: onSuccess
    });
  }, [closeAllCreditModals, fetchCreditDetail]);
  var fetchSectionPage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return dispatch((0,_store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.fetchCreditListPage)(currentListParams, options));
  }, [currentListParams, dispatch]);
  var refreshCurrentSection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            dispatch((0,_store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.clearCreditListCache)());
            _context7.next = 3;
            return fetchDashboard();

          case 3:
            _context7.next = 5;
            return dispatch((0,_store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.fetchCreditListPage)(currentListParams, {
              force: true
            }));

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })), [currentListParams, dispatch, fetchDashboard]);
  var handleOpenDetailModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (creditId) {
    if (!canViewCreditDetail) {
      toast("No tiene permiso para ver el detalle del credito.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    openModalWithCreditDetail(creditId, {
      action: "view",
      openModal: setShowDetailModal
    });
  }, [canViewCreditDetail, openModalWithCreditDetail, toast]);
  var handleOpenPaymentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (creditId) {
    if (!canRegisterCreditPayments) {
      toast("No tiene permiso para registrar pagos de credito.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    setPaymentErrors({});
    setPaymentForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_PAYMENT_FORM);
    openModalWithCreditDetail(creditId, {
      action: "payment",
      openModal: setShowPaymentModal,
      onSuccess: function onSuccess(detail) {
        setPaymentForm(_objectSpread(_objectSpread({}, _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_PAYMENT_FORM), {}, {
          amount: Number((detail === null || detail === void 0 ? void 0 : detail.balance) || 0) > 0 ? String(detail.balance) : ""
        }));
      }
    });
  }, [canRegisterCreditPayments, openModalWithCreditDetail, toast]);
  var handleOpenEditCreditModalFromRow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (creditId) {
    if (!canEditCredits) {
      toast("No tiene permiso para editar creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    setEditErrors({});
    setEditForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_EDIT_CREDIT_FORM);
    openModalWithCreditDetail(creditId, {
      action: "edit",
      openModal: setShowEditModal,
      onSuccess: function onSuccess(detail) {
        setEditForm(buildCreditEditForm(detail));
      }
    });
  }, [canEditCredits, openModalWithCreditDetail, toast]);
  var handleOpenRestructureModalFromRow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (creditId) {
    if (!canEditCredits) {
      toast("No tiene permiso para editar creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    setRestructureErrors({});
    setRestructureForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RESTRUCTURE_CREDIT_FORM);
    openModalWithCreditDetail(creditId, {
      action: "restructure",
      openModal: setShowRestructureModal,
      onSuccess: function onSuccess(detail) {
        setRestructureForm(buildCreditRestructureForm(detail));
      }
    });
  }, [canEditCredits, openModalWithCreditDetail, toast]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchCustomers();
    fetchWarehouses();
    fetchDashboard();
  }, [fetchDashboard]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var idleId = null;
    var timeoutId = null;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(preloadCreditModalBundles, {
        timeout: 350
      });
    } else {
      timeoutId = window.setTimeout(preloadCreditModalBundles, 180);
    }

    return function () {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var timer = setTimeout(function () {
      setDebouncedSearch(String(filters.search || "").trim());
    }, 300);
    return function () {
      return clearTimeout(timer);
    };
  }, [filters.search]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _manualForm$warehouse5;

    fetchWarehouseProducts(Number(((_manualForm$warehouse5 = manualForm.warehouse_id) === null || _manualForm$warehouse5 === void 0 ? void 0 : _manualForm$warehouse5.value) || 0));
  }, [(_manualForm$warehouse6 = manualForm.warehouse_id) === null || _manualForm$warehouse6 === void 0 ? void 0 : _manualForm$warehouse6.value]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _manualForm$warehouse7;

    if (!showManualModal) {
      return;
    }

    var normalizedQuery = normalizeManualLookup(manualForm.product_search);

    if (manualProductsLoading || !((_manualForm$warehouse7 = manualForm.warehouse_id) !== null && _manualForm$warehouse7 !== void 0 && _manualForm$warehouse7.value) || !normalizedQuery) {
      return;
    }

    var matchedProduct = findWarehouseProductByExactCode(normalizedQuery);

    if (!matchedProduct) {
      return;
    }

    manualLastAutoAddedQueryRef.current = normalizedQuery;
    addManualProductToForm(matchedProduct);
  }, [showManualModal, manualProductsLoading, manualForm.product_search, (_manualForm$warehouse8 = manualForm.warehouse_id) === null || _manualForm$warehouse8 === void 0 ? void 0 : _manualForm$warehouse8.value, warehouseExactCodeMap]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!showManualModal) {
      return undefined;
    }

    var timer = setTimeout(function () {
      focusManualProductInput();
    }, 160);
    return function () {
      return clearTimeout(timer);
    };
  }, [showManualModal, (_manualForm$warehouse9 = manualForm.warehouse_id) === null || _manualForm$warehouse9 === void 0 ? void 0 : _manualForm$warehouse9.value]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!canViewCredits) {
      return;
    }

    fetchSectionPage()["catch"](function () {});
  }, [canViewCredits, fetchSectionPage]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!(currentPageData !== null && currentPageData !== void 0 && currentPageData.meta)) {
      return;
    }

    if (Number(currentPageData.meta.current_page || 0) >= Number(currentPageData.meta.last_page || 0)) {
      return;
    }

    dispatch((0,_store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.fetchCreditListPage)(_objectSpread(_objectSpread({}, currentListParams), {}, {
      page: Number(currentPageData.meta.current_page) + 1
    }), {
      background: true,
      silent: true
    }))["catch"](function () {});
  }, [currentListParams, currentPageData, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setListReady(false);
    var frameId = window.requestAnimationFrame(function () {
      setListReady(true);
    });
    return function () {
      return window.cancelAnimationFrame(frameId);
    };
  }, [activeSection, currentRequestKey]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!routeCreditId) {
      return;
    }

    if (routeAction === "payment" && canRegisterCreditPayments) {
      handleOpenPaymentModal(routeCreditId);
      return;
    }

    handleOpenDetailModal(routeCreditId);
  }, [canRegisterCreditPayments, handleOpenDetailModal, handleOpenPaymentModal, routeAction, routeCreditId]);

  var validateConfigForm = function validateConfigForm() {
    var errors = {};
    if (!configForm.customer_id) errors.customer_id = "Seleccione un cliente.";

    if (Number(configForm.credit_limit) < 0) {
      errors.credit_limit = "Limite invalido.";
    }

    if (Number(configForm.max_installments) < 1) {
      errors.max_installments = "Ingrese al menos una cuota.";
    }

    setConfigErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var validateManualForm = function validateManualForm() {
    var errors = {};
    if (!manualForm.customer_id) errors.customer_id = "Seleccione un cliente.";
    var normalizedItems = (manualForm.items || []).filter(function (item) {
      return Number(item.product_id || 0) > 0 && Number(item.quantity || 0) > 0;
    });
    var hasNegativeQuantity = (manualForm.items || []).some(function (item) {
      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.parseNumber)(item.quantity, 0) < 0;
    });

    if (normalizedItems.length > 0 && !manualForm.warehouse_id) {
      errors.warehouse_id = "Seleccione una bodega.";
    }

    if (hasNegativeQuantity) {
      errors.items = "No se permiten cantidades negativas.";
    }

    if (!errors.items && normalizedItems.length > 0) {
      var stockIssue = normalizedItems.reduce(function (issue, item) {
        if (issue) {
          return issue;
        }

        var product = findWarehouseProductById(item.product_id);
        var requestedQuantity = getRequestedProductQuantity(item.product_id, normalizedItems);
        var stockQuantity = getManualProductStock(product);

        if (!product) {
          return "Uno o mas productos ya no estan disponibles en la bodega.";
        }

        if (requestedQuantity > stockQuantity) {
          var _product$attributes9;

          return "Stock insuficiente para ".concat((product === null || product === void 0 ? void 0 : (_product$attributes9 = product.attributes) === null || _product$attributes9 === void 0 ? void 0 : _product$attributes9.name) || "el producto seleccionado", ".");
        }

        return null;
      }, null);

      if (stockIssue) {
        errors.items = stockIssue;
      }
    }

    if (normalizedItems.length === 0 && Number(manualForm.total_amount) <= 0) {
      errors.total_amount = "Ingrese un monto valido.";
    }

    setManualErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var validatePaymentForm = function validatePaymentForm() {
    var errors = {};
    var amount = Number(paymentForm.amount || 0);
    var currentBalance = Number((creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.balance) || 0);

    if (!Number.isFinite(amount) || amount <= 0) {
      errors.amount = "Ingrese un monto valido.";
    } else if (currentBalance <= 0) {
      errors.amount = "Este credito ya no tiene saldo pendiente.";
    } else if (amount > currentBalance) {
      errors.amount = "El monto no puede ser mayor al saldo pendiente (".concat(money(currentBalance), ").");
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var validateEditForm = function validateEditForm() {
    var errors = {};
    var installments = editForm.credit_type === "libre" ? 1 : Number(editForm.installments || 0);
    if (!editForm.start_date) errors.start_date = "Seleccione una fecha inicial.";
    if (!editForm.due_date) errors.due_date = "Seleccione una fecha final.";

    if (Number(editForm.interest_rate) < 0) {
      errors.interest_rate = "Ingrese un interes valido.";
    }

    if (installments < 1) {
      errors.installments = "Ingrese al menos una cuota.";
    }

    if (editForm.start_date && editForm.due_date && moment__WEBPACK_IMPORTED_MODULE_2___default()(editForm.due_date).isBefore(editForm.start_date, "day")) {
      errors.due_date = "La fecha final no puede ser menor a la inicial.";
    }

    if (!editForm.confirm) {
      errors.confirm = "Debe confirmar los cambios antes de guardar.";
    }

    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var validateRestructureForm = function validateRestructureForm() {
    var errors = {};
    var installments = restructureForm.credit_type === "libre" ? 1 : Number(restructureForm.installments || 0);

    if (!restructureForm.start_date) {
      errors.start_date = "Seleccione una fecha inicial.";
    }

    if (!restructureForm.due_date) {
      errors.due_date = "Seleccione una fecha final.";
    }

    if (Number(restructureForm.interest_rate) < 0) {
      errors.interest_rate = "Ingrese un interes valido.";
    }

    if (installments < 1) {
      errors.installments = "Ingrese al menos una cuota.";
    }

    if (!String(restructureForm.reason || "").trim()) {
      errors.reason = "Debe indicar el motivo de la reestructuracion.";
    }

    if (restructureForm.start_date && restructureForm.due_date && moment__WEBPACK_IMPORTED_MODULE_2___default()(restructureForm.due_date).isBefore(restructureForm.start_date, "day")) {
      errors.due_date = "La fecha final no puede ser menor a la inicial.";
    }

    if (!restructureForm.confirm) {
      errors.confirm = "Debe confirmar la reestructuracion antes de guardar.";
    }

    setRestructureErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var validateReturnForm = function validateReturnForm() {
    var errors = {};
    var hasAnyQuantity = Object.values(returnForm.quantities || {}).some(function (value) {
      return Number(value || 0) > 0;
    });

    if (!hasAnyQuantity) {
      errors.items = "Ingrese al menos una cantidad a devolver.";
    }

    setReturnErrors(errors);
    return Object.keys(errors).length === 0;
  };

  var saveConfig = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (canEditCredits) {
                _context8.next = 3;
                break;
              }

              toast("No tiene permiso para editar configuraciones de credito.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context8.abrupt("return");

            case 3:
              if (validateConfigForm()) {
                _context8.next = 5;
                break;
              }

              return _context8.abrupt("return");

            case 5:
              _context8.prev = 5;
              setSaving(true);
              _context8.next = 9;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].post("/credits/customer-config", {
                customer_id: Number(configForm.customer_id.value),
                credit_limit: Number(configForm.credit_limit || 0),
                interest_rate: Number(configForm.interest_rate || 0),
                max_installments: Number(configForm.max_installments || 1),
                status: configForm.status
              });

            case 9:
              closeConfigModal();
              setConfigForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_CONFIG_FORM);
              _context8.next = 13;
              return refreshCurrentSection();

            case 13:
              toast("Configuracion guardada.");
              _context8.next = 19;
              break;

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](5);
              toast(getErrorMessage(_context8.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 19:
              _context8.prev = 19;
              setSaving(false);
              return _context8.finish(19);

            case 22:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[5, 16, 19, 22]]);
    }));

    return function saveConfig() {
      return _ref9.apply(this, arguments);
    };
  }();

  var saveManualCredit = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var _manualForm$warehouse10, items;

      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (canCreateCredits) {
                _context9.next = 3;
                break;
              }

              toast("No tiene permiso para crear creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context9.abrupt("return");

            case 3:
              if (validateManualForm()) {
                _context9.next = 5;
                break;
              }

              return _context9.abrupt("return");

            case 5:
              _context9.prev = 5;
              setSaving(true);
              items = (manualForm.items || []).filter(function (item) {
                return Number(item.product_id || 0) > 0 && Number(item.quantity || 0) > 0;
              }).map(function (item) {
                return {
                  product_id: Number(item.product_id),
                  quantity: Number(item.quantity)
                };
              });
              _context9.next = 10;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].post("/credits/manual", {
                customer_id: Number(manualForm.customer_id.value),
                warehouse_id: Number(((_manualForm$warehouse10 = manualForm.warehouse_id) === null || _manualForm$warehouse10 === void 0 ? void 0 : _manualForm$warehouse10.value) || 0) || null,
                total_amount: Number(items.length > 0 ? manualTotal : manualForm.total_amount || 0),
                interest_rate: Number(manualForm.interest_rate || 0),
                installments: Number(manualForm.installments || 1),
                start_date: manualForm.start_date,
                due_date: manualForm.due_date,
                note: manualForm.note,
                items: items
              });

            case 10:
              closeManualModal();
              _context9.next = 13;
              return refreshCurrentSection();

            case 13:
              toast("Credito manual creado.");
              _context9.next = 19;
              break;

            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9["catch"](5);
              toast(getErrorMessage(_context9.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 19:
              _context9.prev = 19;
              setSaving(false);
              return _context9.finish(19);

            case 22:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[5, 16, 19, 22]]);
    }));

    return function saveManualCredit() {
      return _ref10.apply(this, arguments);
    };
  }();

  var saveCreditEdit = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var _response$data7, shouldReturnToDetail, response, detail;

      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (canEditCredits) {
                _context10.next = 3;
                break;
              }

              toast("No tiene permiso para editar creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context10.abrupt("return");

            case 3:
              if (!(!creditDetail || !validateEditForm())) {
                _context10.next = 5;
                break;
              }

              return _context10.abrupt("return");

            case 5:
              _context10.prev = 5;
              shouldReturnToDetail = currentAction === "view";
              setSaving(true);
              _context10.next = 10;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].put("/credits/".concat(creditDetail.id), buildCreditTermsPayload(editForm));

            case 10:
              response = _context10.sent;
              detail = (response === null || response === void 0 ? void 0 : (_response$data7 = response.data) === null || _response$data7 === void 0 ? void 0 : _response$data7.data) || null;
              setCreditDetail(detail);
              setShowEditModal(false);

              if (shouldReturnToDetail && detail) {
                closeAllCreditModals();
                setShowDetailModal(true);
                setCurrentAction("view");
              } else {
                setCurrentAction(null);
                setCreditDetail(null);
              }

              setEditForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_EDIT_CREDIT_FORM);
              _context10.next = 18;
              return refreshCurrentSection();

            case 18:
              toast("Credito actualizado.");
              _context10.next = 24;
              break;

            case 21:
              _context10.prev = 21;
              _context10.t0 = _context10["catch"](5);
              toast(getErrorMessage(_context10.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 24:
              _context10.prev = 24;
              setSaving(false);
              return _context10.finish(24);

            case 27:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[5, 21, 24, 27]]);
    }));

    return function saveCreditEdit() {
      return _ref11.apply(this, arguments);
    };
  }();

  var savePayment = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var _response$data8, response, updatedDetail, message;

      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (canRegisterCreditPayments) {
                _context11.next = 3;
                break;
              }

              toast("No tiene permiso para registrar pagos de credito.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context11.abrupt("return");

            case 3:
              if (!(!creditDetail || !validatePaymentForm())) {
                _context11.next = 5;
                break;
              }

              return _context11.abrupt("return");

            case 5:
              _context11.prev = 5;
              setSaving(true);
              setPaymentErrors({});
              _context11.next = 10;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].post("/credits/".concat(creditDetail.id, "/payments"), {
                amount: Number(paymentForm.amount || 0),
                payment_type: Number(paymentForm.payment_type || 1),
                note: paymentForm.note
              });

            case 10:
              response = _context11.sent;
              updatedDetail = (response === null || response === void 0 ? void 0 : (_response$data8 = response.data) === null || _response$data8 === void 0 ? void 0 : _response$data8.data) || null;
              setCreditDetail(updatedDetail);
              setPaymentForm(_objectSpread(_objectSpread({}, _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_PAYMENT_FORM), {}, {
                payment_type: String(paymentForm.payment_type || 1),
                amount: Number((updatedDetail === null || updatedDetail === void 0 ? void 0 : updatedDetail.balance) || 0) > 0 ? String(updatedDetail.balance) : ""
              }));
              _context11.next = 16;
              return refreshCurrentSection();

            case 16:
              toast("Pago registrado.");
              _context11.next = 24;
              break;

            case 19:
              _context11.prev = 19;
              _context11.t0 = _context11["catch"](5);
              message = getErrorMessage(_context11.t0);
              setPaymentErrors({
                general: message
              });
              toast(message, _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 24:
              _context11.prev = 24;
              setSaving(false);
              return _context11.finish(24);

            case 27:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[5, 19, 24, 27]]);
    }));

    return function savePayment() {
      return _ref12.apply(this, arguments);
    };
  }();

  var saveCreditRestructure = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var _response$data9, shouldReturnToDetail, response, detail;

      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (canEditCredits) {
                _context12.next = 3;
                break;
              }

              toast("No tiene permiso para editar creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context12.abrupt("return");

            case 3:
              if (!(!creditDetail || !validateRestructureForm())) {
                _context12.next = 5;
                break;
              }

              return _context12.abrupt("return");

            case 5:
              _context12.prev = 5;
              shouldReturnToDetail = currentAction === "view";
              setSaving(true);
              _context12.next = 10;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].post("/credits/".concat(creditDetail.id, "/restructure"), _objectSpread(_objectSpread({}, buildCreditTermsPayload(restructureForm)), {}, {
                reason: restructureForm.reason
              }));

            case 10:
              response = _context12.sent;
              detail = (response === null || response === void 0 ? void 0 : (_response$data9 = response.data) === null || _response$data9 === void 0 ? void 0 : _response$data9.data) || null;
              setCreditDetail(detail);
              setShowRestructureModal(false);

              if (shouldReturnToDetail && detail) {
                closeAllCreditModals();
                setShowDetailModal(true);
                setCurrentAction("view");
              } else {
                setCurrentAction(null);
                setCreditDetail(null);
              }

              setRestructureForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_RESTRUCTURE_CREDIT_FORM);
              _context12.next = 18;
              return refreshCurrentSection();

            case 18:
              toast("Credito reestructurado.");
              _context12.next = 24;
              break;

            case 21:
              _context12.prev = 21;
              _context12.t0 = _context12["catch"](5);
              toast(getErrorMessage(_context12.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 24:
              _context12.prev = 24;
              setSaving(false);
              return _context12.finish(24);

            case 27:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[5, 21, 24, 27]]);
    }));

    return function saveCreditRestructure() {
      return _ref13.apply(this, arguments);
    };
  }();

  var saveReturn = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var _response$data10, items, response;

      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (canEditCredits) {
                _context13.next = 3;
                break;
              }

              toast("No tiene permiso para editar creditos.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
              return _context13.abrupt("return");

            case 3:
              if (!(!creditDetail || !validateReturnForm())) {
                _context13.next = 5;
                break;
              }

              return _context13.abrupt("return");

            case 5:
              _context13.prev = 5;
              setSaving(true);
              items = Object.entries(returnForm.quantities || {}).map(function (_ref15) {
                var _ref16 = _slicedToArray(_ref15, 2),
                    creditItemId = _ref16[0],
                    quantity = _ref16[1];

                return {
                  credit_item_id: Number(creditItemId),
                  quantity: Number(quantity || 0)
                };
              }).filter(function (item) {
                return item.quantity > 0;
              });
              _context13.next = 10;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_6__["default"].post("/credits/".concat(creditDetail.id, "/returns"), {
                items: items,
                note: returnForm.note
              });

            case 10:
              response = _context13.sent;
              setCreditDetail((response === null || response === void 0 ? void 0 : (_response$data10 = response.data) === null || _response$data10 === void 0 ? void 0 : _response$data10.data) || null);
              closeReturnModal();
              _context13.next = 15;
              return refreshCurrentSection();

            case 15:
              toast("Devolucion registrada.");
              _context13.next = 21;
              break;

            case 18:
              _context13.prev = 18;
              _context13.t0 = _context13["catch"](5);
              toast(getErrorMessage(_context13.t0), _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);

            case 21:
              _context13.prev = 21;
              setSaving(false);
              return _context13.finish(21);

            case 24:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[5, 18, 21, 24]]);
    }));

    return function saveReturn() {
      return _ref14.apply(this, arguments);
    };
  }();

  var openConfigModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!canEditCredits) {
      toast("No tiene permiso para editar configuraciones de credito.", _constants__WEBPACK_IMPORTED_MODULE_8__.toastType.ERROR);
      return;
    }

    setConfigErrors({});

    if (!row) {
      setConfigForm(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.DEFAULT_CONFIG_FORM);
    } else {
      setConfigForm({
        customer_id: {
          value: row.customer_id,
          label: row.customer_name
        },
        credit_limit: String(row.credit_limit),
        interest_rate: String(row.interest_rate),
        max_installments: String(row.max_installments),
        status: row.status
      });
    }

    closeAllCreditModals();
    setCurrentAction("config");
    setShowConfigModal(true);
  }, [canEditCredits, closeAllCreditModals, toast]);
  var openEditCreditModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : creditDetail;

    if (!detail || !canEditCredits) {
      return;
    }

    setEditErrors({});
    setEditForm(buildCreditEditForm(detail));
    closeAllCreditModals();
    setShowEditModal(true);
  }, [canEditCredits, closeAllCreditModals, creditDetail]);
  var openRestructureModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : creditDetail;

    if (!detail || !canEditCredits) {
      return;
    }

    setRestructureErrors({});
    setRestructureForm(buildCreditRestructureForm(detail));
    closeAllCreditModals();
    setShowRestructureModal(true);
  }, [canEditCredits, closeAllCreditModals, creditDetail]);
  var openReturnModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : creditDetail;

    if (!detail || !canEditCredits) {
      return;
    }

    setReturnErrors({});
    setReturnForm({
      quantities: (detail.items || []).reduce(function (carry, item) {
        if (item.credit_item_id) {
          carry[item.credit_item_id] = "";
        }

        return carry;
      }, {}),
      note: ""
    });
    closeAllCreditModals();
    setShowReturnModal(true);
  }, [canEditCredits, closeAllCreditModals, creditDetail]);
  var openPrintPreviewModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (nextCreditId) {
    var resolvedCreditId = Number(nextCreditId || (creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.id) || 0);

    if (resolvedCreditId <= 0) {
      return;
    }

    setPrintPreviewCreditId(resolvedCreditId);
    setShowPrintPreviewModal(true);
  }, [creditDetail]);
  var handleSectionChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (nextSection) {
    setActiveSection(nextSection);
    setPagination(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: 1
      });
    });
  }, []);
  var handleSearchChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    var value = event.target.value;
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        search: value
      });
    });
    setPagination(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: 1
      });
    });
  }, []);
  var handleStatusChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    var value = event.target.value;
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        status: value
      });
    });
    setPagination(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: 1
      });
    });
  }, []);
  var handlePageSizeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    var nextLimit = Number(event.target.value || PAGE_SIZE);
    setPagination({
      page: 1,
      limit: _store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.CREDIT_PAGE_SIZE_OPTIONS.includes(nextLimit) ? nextLimit : PAGE_SIZE
    });
  }, []);
  var handlePageChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (nextPage) {
    var safeNextPage = Math.max(1, Math.min(Number(nextPage || 1), Number(activeMeta.last_page || 1)));
    setPagination(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: safeNextPage
      });
    });
  }, [activeMeta.last_page]);
  var handleOpenEditFromDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return openEditCreditModal();
  }, [openEditCreditModal]);
  var handleOpenPrintFromDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowDetailModal(false);
    openPrintPreviewModal(creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.id);
  }, [creditDetail, openPrintPreviewModal]);
  var handleOpenRestructureFromDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return openRestructureModal();
  }, [openRestructureModal]);
  var handleOpenReturnFromDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return openReturnModal();
  }, [openReturnModal]);
  var renderSkeletonCards = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return Array.from({
      length: pagination.limit
    }, function (_, index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditCardSkeleton, {}, "credit-skeleton-".concat(index));
    });
  }, [pagination.limit]);
  var activeSectionContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (loading || shouldShowListSkeleton) {
      return renderSkeletonCards;
    }

    if (activeSection === "customers") {
      if (!activeRows.length) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.EmptyStateCard, {
          text: "No hay clientes configurados para credito."
        });
      }

      return activeRows.map(function (row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CustomerCreditCard, {
          row: row,
          money: money,
          onEdit: openConfigModal,
          canEditConfig: canEditCredits
        }, row.id);
      });
    }

    if (activeSection === "overdue") {
      if (!activeRows.length) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.EmptyStateCard, {
          text: "No hay clientes morosos."
        });
      }

      return activeRows.map(function (row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.OverdueCustomerCard, {
          row: row,
          money: money
        }, row.customer_id);
      });
    }

    if (activeSection === "interest") {
      if (!activeRows.length) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.EmptyStateCard, {
          text: "No hay datos de interes disponibles."
        });
      }

      return activeRows.map(function (row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.InterestCard, {
          row: row,
          money: money
        }, row.credit_id);
      });
    }

    if (!activeRows.length) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.EmptyStateCard, {
        text: "No hay creditos registrados."
      });
    }

    return activeRows.map(function (row) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditCard, {
        row: row,
        money: money,
        onView: handleOpenDetailModal,
        onPrint: openPrintPreviewModal,
        onEdit: handleOpenEditCreditModalFromRow,
        onPay: handleOpenPaymentModal,
        onRestructure: handleOpenRestructureModalFromRow,
        canViewDetail: canViewCreditDetail,
        canEditCredit: canEditCredits,
        canRegisterPayment: canRegisterCreditPayments
      }, row.id);
    });
  }, [activeRows, activeSection, canEditCredits, canRegisterCreditPayments, canViewCreditDetail, handleOpenDetailModal, handleOpenEditCreditModalFromRow, handleOpenPaymentModal, handleOpenRestructureModalFromRow, loading, money, openConfigModal, openPrintPreviewModal, renderSkeletonCards, shouldShowListSkeleton]);
  var summary = dashboard.summary || {};
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "creditos-module credits-page",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
        title: "Creditos"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: "Creditos"
      }), canViewCredits ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_15__["default"], {
          className: "g-4 mb-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_16__["default"], {
            xl: 3,
            md: 6,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.SummaryCard, {
              label: "Saldo pendiente",
              value: money(summary.pending_balance),
              icon: "balance",
              tooltip: "Monto total que los clientes aun deben pagar"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_16__["default"], {
            xl: 3,
            md: 6,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.SummaryCard, {
              label: "Capital usado",
              value: money(summary.principal_in_use),
              icon: "capital",
              tooltip: "Monto original otorgado en creditos, sin intereses"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_16__["default"], {
            xl: 3,
            md: 6,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.SummaryCard, {
              label: "Creditos vencidos",
              value: String(summary.overdue_credits || 0),
              icon: "overdue",
              tooltip: "Cantidad de creditos con fecha de vencimiento superada"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_16__["default"], {
            xl: 3,
            md: 6,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.SummaryCard, {
              label: "Interes cobrado",
              value: money(summary.collected_interest),
              icon: "interest",
              tooltip: "Interes efectivamente cobrado a los clientes"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          className: "card credits-surface-card",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "card-body",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "d-flex flex-wrap justify-content-between align-items-center credits-toolbar mb-4",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.SectionButtons, {
                activeSection: activeSection,
                setActiveSection: handleSectionChange
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "d-flex flex-wrap credits-toolbar credits-toolbar-actions",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.TooltipWrap, {
                  text: "Buscar por cliente, numero de venta o credito",
                  block: true,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__["default"].Control, {
                    className: "credits-toolbar-field",
                    placeholder: "Buscar cliente, venta o credito",
                    value: filters.search,
                    onChange: handleSearchChange
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.TooltipWrap, {
                  text: "Filtrar la lista de creditos por estado",
                  block: true,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__["default"].Select, {
                    className: "credits-toolbar-field",
                    value: filters.status,
                    onChange: handleStatusChange,
                    disabled: activeSection !== "credits" && activeSection !== "interest",
                    children: _creditHelpers__WEBPACK_IMPORTED_MODULE_12__.STATUS_FILTER_OPTIONS.map(function (option) {
                      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("option", {
                        value: option.value,
                        children: option.label
                      }, option.value);
                    })
                  })
                }), canEditCredits ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.TooltipWrap, {
                  text: "Definir limite de credito y condiciones del cliente",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditActionButton, {
                    action: "configure-customer",
                    onClick: function onClick() {
                      return openConfigModal();
                    },
                    children: "Configurar cliente"
                  })
                }) : null, canCreateCredits ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.TooltipWrap, {
                  text: "Crear un credito sin necesidad de factura",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditActionButton, {
                    action: "create-manual-credit",
                    onClick: openManualModal,
                    children: "Credito manual"
                  })
                }) : null]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "credits-card-grid credits-page-transition".concat(listReady ? " credits-page-transition--ready" : "").concat(activeSection === "overdue" ? " credits-card-grid--compact" : ""),
                children: activeSectionContent
              }), listError ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "credits-list-feedback",
                children: listError
              }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "credits-pagination",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "credits-pagination__summary",
                  children: paginationSummary
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                  className: "credits-pagination__controls",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("label", {
                    className: "credits-pagination__limit",
                    htmlFor: "credits-page-size",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
                      children: "Mostrar"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_17__["default"].Select, {
                      id: "credits-page-size",
                      value: pagination.limit,
                      onChange: handlePageSizeChange,
                      children: _store_action_creditListAction__WEBPACK_IMPORTED_MODULE_11__.CREDIT_PAGE_SIZE_OPTIONS.map(function (size) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("option", {
                          value: size,
                          children: size
                        }, size);
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "credits-pagination__nav",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditActionButton, {
                      action: "page-nav",
                      onClick: function onClick() {
                        return handlePageChange(Number(activeMeta.current_page) - 1);
                      },
                      disabled: Number(activeMeta.current_page || 1) <= 1,
                      children: "Anterior"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                      className: "credits-pagination__pages",
                      children: visiblePageNumbers.map(function (pageNumber) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditActionButton, {
                          action: pageNumber === Number(activeMeta.current_page) ? "page-current" : "page-nav",
                          onClick: function onClick() {
                            return handlePageChange(pageNumber);
                          },
                          children: pageNumber
                        }, pageNumber);
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_12__.CreditActionButton, {
                      action: "page-nav",
                      onClick: function onClick() {
                        return handlePageChange(Number(activeMeta.current_page) + 1);
                      },
                      disabled: Number(activeMeta.current_page || 1) >= Number(activeMeta.last_page || 0) || Number(activeMeta.last_page || 0) === 0,
                      children: "Siguiente"
                    })]
                  })]
                })]
              })]
            })]
          })
        })]
      }) : null]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: null,
      children: [showConfigModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ConfigModal, {
        show: showConfigModal,
        onHide: closeConfigModal,
        form: configForm,
        setForm: setConfigForm,
        errors: configErrors,
        customers: customers,
        saving: saving,
        onSubmit: saveConfig,
        existingCustomerIds: existingCustomerIds
      }) : null, showManualModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ManualCreditModal, {
        show: showManualModal,
        onHide: closeManualModal,
        form: manualForm,
        setForm: setManualForm,
        errors: manualErrors,
        customers: customers,
        warehouses: warehouses,
        productsById: warehouseProductsById,
        productsLoading: manualProductsLoading,
        manualTotal: manualTotal,
        money: money,
        productPreview: manualProductPreview,
        searchResults: manualSearchResults,
        productInputRef: manualProductInputRef,
        saving: saving,
        onWarehouseChange: handleManualWarehouseChange,
        onProductSearchChange: handleManualProductSearchChange,
        onProductSearchSubmit: handleManualProductSearchSubmit,
        onSelectSearchResult: addManualProductToForm,
        onQuantityChange: handleManualItemQuantityChange,
        onRemoveItem: handleManualItemRemove,
        onSubmit: saveManualCredit
      }) : null, showDetailModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(DetailModal, {
        show: showDetailModal,
        onHide: closeDetailModal,
        detailLoading: detailLoading,
        creditDetail: creditDetail,
        money: money,
        onOpenEdit: handleOpenEditFromDetail,
        onOpenPrint: handleOpenPrintFromDetail,
        onOpenRestructure: handleOpenRestructureFromDetail,
        onOpenReturn: handleOpenReturnFromDetail,
        canEditCredit: canEditCredits,
        canRestructureCredit: canEditCredits,
        canRegisterReturn: canEditCredits
      }) : null, showEditModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(EditCreditModal, {
        show: showEditModal,
        onHide: closeEditModal,
        creditDetail: creditDetail,
        money: money,
        form: editForm,
        setForm: setEditForm,
        errors: editErrors,
        saving: saving,
        onSubmit: saveCreditEdit
      }) : null, showPaymentModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(PaymentModal, {
        show: showPaymentModal,
        onHide: closePaymentModal,
        detailLoading: detailLoading,
        creditDetail: creditDetail,
        money: money,
        form: paymentForm,
        setForm: setPaymentForm,
        errors: paymentErrors,
        saving: saving,
        onSubmit: savePayment
      }) : null, showPrintPreviewModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(CreditPrintPreviewModal, {
        show: showPrintPreviewModal,
        onHide: closePrintPreviewModal,
        creditId: printPreviewCreditId,
        money: money
      }) : null, showRestructureModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(RestructureCreditModal, {
        show: showRestructureModal,
        onHide: closeRestructureModal,
        creditDetail: creditDetail,
        money: money,
        form: restructureForm,
        setForm: setRestructureForm,
        errors: restructureErrors,
        saving: saving,
        onSubmit: saveCreditRestructure
      }) : null, showReturnModal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(ReturnModal, {
        show: showReturnModal,
        onHide: closeReturnModal,
        detailLoading: detailLoading,
        creditDetail: creditDetail,
        money: money,
        form: returnForm,
        setForm: setReturnForm,
        errors: returnErrors,
        saving: saving,
        onSubmit: saveReturn
      }) : null]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Credits);

/***/ }),

/***/ "./resources/pos/src/store/action/creditListAction.js":
/*!************************************************************!*\
  !*** ./resources/pos/src/store/action/creditListAction.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CREDIT_PAGE_SIZE_OPTIONS": () => (/* binding */ CREDIT_PAGE_SIZE_OPTIONS),
/* harmony export */   "CREDIT_SECTION_OPTIONS": () => (/* binding */ CREDIT_SECTION_OPTIONS),
/* harmony export */   "buildCreditListQueryKey": () => (/* binding */ buildCreditListQueryKey),
/* harmony export */   "buildCreditListRequestKey": () => (/* binding */ buildCreditListRequestKey),
/* harmony export */   "clearCreditListCache": () => (/* binding */ clearCreditListCache),
/* harmony export */   "fetchCreditListPage": () => (/* binding */ fetchCreditListPage),
/* harmony export */   "normalizeCreditListParams": () => (/* binding */ normalizeCreditListParams)
/* harmony export */ });
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _toastAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toastAction */ "./resources/pos/src/store/action/toastAction.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var CREDIT_SECTION_OPTIONS = ["credits", "customers", "overdue", "interest"];
var CREDIT_PAGE_SIZE_OPTIONS = [3, 6, 9];
var DEFAULT_CREDIT_LIST_PARAMS = {
  section: "credits",
  search: "",
  status: "",
  page: 1,
  limit: 3
};
var normalizeCreditListParams = function normalizeCreditListParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var section = CREDIT_SECTION_OPTIONS.includes(params.section) ? params.section : DEFAULT_CREDIT_LIST_PARAMS.section;
  var search = String(params.search || "").trim();
  var status = String(params.status || "").trim();
  var page = Math.max(Number(params.page || 1), 1);
  var limit = CREDIT_PAGE_SIZE_OPTIONS.includes(Number(params.limit)) ? Number(params.limit) : DEFAULT_CREDIT_LIST_PARAMS.limit;
  return {
    section: section,
    search: search,
    status: status,
    page: page,
    limit: limit
  };
};
var buildCreditListQueryKey = function buildCreditListQueryKey() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var normalized = normalizeCreditListParams(params);
  return [normalized.section, normalized.limit, normalized.status || "all", normalized.search.toLowerCase() || "all"].join("|");
};
var buildCreditListRequestKey = function buildCreditListRequestKey() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var normalized = normalizeCreditListParams(params);
  return "".concat(buildCreditListQueryKey(normalized), "|").concat(normalized.page);
};

var buildPaginationMeta = function buildPaginationMeta() {
  var meta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var normalized = normalizeCreditListParams(params);
  return {
    total: Number(meta.total || 0),
    per_page: Number(meta.per_page || normalized.limit),
    current_page: Number(meta.current_page || normalized.page),
    last_page: Number(meta.last_page || 0),
    from: Number(meta.from || 0),
    to: Number(meta.to || 0)
  };
};

var clearCreditListCache = function clearCreditListCache() {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__.creditListActionType.CLEAR
  };
};
var fetchCreditListPage = function fetchCreditListPage() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dispatch, getState) {
      var _getState$creditList, _getState$creditList$;

      var normalized, requestKey, queryKey, cachedPage, shouldUseCache, response, payload, rows, meta, pageData, _error$response, _error$response$data, _error$response2, _error$response2$data;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              normalized = normalizeCreditListParams(params);
              requestKey = buildCreditListRequestKey(normalized);
              queryKey = buildCreditListQueryKey(normalized);
              cachedPage = (_getState$creditList = getState().creditList) === null || _getState$creditList === void 0 ? void 0 : (_getState$creditList$ = _getState$creditList.cacheByRequestKey) === null || _getState$creditList$ === void 0 ? void 0 : _getState$creditList$[requestKey];
              shouldUseCache = cachedPage && !options.force;

              if (!shouldUseCache) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", cachedPage);

            case 7:
              if (!options.background) {
                dispatch({
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.creditListActionType.REQUEST,
                  payload: {
                    requestKey: requestKey
                  }
                });
              }

              _context.prev = 8;
              _context.next = 11;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get(_constants__WEBPACK_IMPORTED_MODULE_1__.apiBaseURL.CREDITS, {
                params: {
                  section: normalized.section,
                  page: normalized.page,
                  limit: normalized.limit,
                  search: normalized.search || undefined,
                  status: normalized.section === "credits" || normalized.section === "interest" ? normalized.status || undefined : undefined
                }
              });

            case 11:
              response = _context.sent;
              payload = (response === null || response === void 0 ? void 0 : response.data) || {};
              rows = Array.isArray(payload.data) ? payload.data : [];
              meta = buildPaginationMeta(payload.meta, normalized);
              pageData = {
                section: payload.section || normalized.section,
                rows: rows,
                meta: meta,
                queryKey: queryKey,
                requestKey: requestKey,
                receivedAt: Date.now()
              };
              dispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_1__.creditListActionType.SUCCESS,
                payload: pageData
              });
              return _context.abrupt("return", pageData);

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](8);
              dispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_1__.creditListActionType.FAILURE,
                payload: {
                  requestKey: requestKey,
                  error: (_context.t0 === null || _context.t0 === void 0 ? void 0 : (_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || (_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) || "No se pudo cargar la lista de creditos."
                }
              });

              if (!options.silent) {
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_2__.addToast)({
                  text: (_context.t0 === null || _context.t0 === void 0 ? void 0 : (_error$response2 = _context.t0.response) === null || _error$response2 === void 0 ? void 0 : (_error$response2$data = _error$response2.data) === null || _error$response2$data === void 0 ? void 0 : _error$response2$data.message) || (_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) || "No se pudo cargar la lista de creditos.",
                  type: _constants__WEBPACK_IMPORTED_MODULE_1__.toastType.ERROR
                }));
              }

              throw _context.t0;

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 20]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

/***/ })

}]);