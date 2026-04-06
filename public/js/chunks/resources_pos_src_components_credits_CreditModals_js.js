"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_credits_CreditModals_js"],{

/***/ "./resources/pos/src/components/credits/CreditModals.js":
/*!**************************************************************!*\
  !*** ./resources/pos/src/components/credits/CreditModals.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigModal": () => (/* binding */ ConfigModal),
/* harmony export */   "DetailModal": () => (/* binding */ DetailModal),
/* harmony export */   "EditCreditModal": () => (/* binding */ EditCreditModal),
/* harmony export */   "ManualCreditModal": () => (/* binding */ ManualCreditModal),
/* harmony export */   "PaymentModal": () => (/* binding */ PaymentModal),
/* harmony export */   "RestructureCreditModal": () => (/* binding */ RestructureCreditModal),
/* harmony export */   "ReturnModal": () => (/* binding */ ReturnModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Table.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Spinner.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Row.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Col.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/InputGroup.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/select/reactSelect */ "./resources/pos/src/shared/select/reactSelect.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _creditHelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./creditHelpers */ "./resources/pos/src/components/credits/creditHelpers.js");
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












var MODAL_PROPS = {
  centered: true,
  dialogClassName: "credits-modal-dialog",
  contentClassName: "creditos-module credits-modal-content",
  backdropClassName: "credits-modal-backdrop"
};

var formatHistoryDateTime = function formatHistoryDateTime(value) {
  if (!value) {
    return "-";
  }

  var parsedValue = moment__WEBPACK_IMPORTED_MODULE_1___default()(value);

  if (!parsedValue.isValid()) {
    return value;
  }

  return parsedValue.format("YYYY-MM-DD hh:mm A");
};

var TableBox = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref) {
  var headers = _ref.headers,
      rows = _ref.rows,
      emptyText = _ref.emptyText;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "credits-table-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "table-responsive",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
        hover: true,
        className: "align-middle credits-table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("thead", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
            children: headers.map(function (header) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                children: header
              }, header);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tbody", {
          children: rows.length > 0 ? rows : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              colSpan: headers.length,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "credits-empty",
                children: emptyText
              })
            })
          })
        })]
      })
    })
  });
});
var ModalLoading = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function () {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "credits-modal-loading",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
      animation: "border"
    })
  });
});

var useDeferredModalContent = function useDeferredModalContent(show) {
  var ready = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      shouldRenderContent = _React$useState2[0],
      setShouldRenderContent = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (!show || !ready) {
      setShouldRenderContent(false);
      return undefined;
    }

    var frameId = 0;
    frameId = window.requestAnimationFrame(function () {
      setShouldRenderContent(true);
    });
    return function () {
      window.cancelAnimationFrame(frameId);
    };
  }, [ready, show]); // Avoid rendering stale modal bodies during the close frame after detail data
  // has already been cleared from parent state.

  return show && ready && shouldRenderContent;
};

var toFiniteNumber = function toFiniteNumber(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var parsed = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.parseNumber)(value, fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
};

var normalizeInstallments = function normalizeInstallments(form) {
  if ((form === null || form === void 0 ? void 0 : form.credit_type) === "libre") {
    return 1;
  }

  var safeInstallments = Math.trunc(toFiniteNumber(form === null || form === void 0 ? void 0 : form.installments, 1));
  return safeInstallments > 0 ? safeInstallments : 1;
};

var resolveInstallmentsCount = function resolveInstallmentsCount(creditDetail) {
  if ((creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.credit_type) === "libre") {
    return 1;
  }

  if (Number.isFinite(Number(creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.installments_count))) {
    return Number(creditDetail.installments_count);
  }

  if (Array.isArray(creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.installments)) {
    return creditDetail.installments.length || 1;
  }

  return Number((creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.installments) || 1) || 1;
};

var estimatePlannedTotal = function estimatePlannedTotal(baseAmount, interestRate) {
  var safeBase = toFiniteNumber(baseAmount, 0);
  var safeInterest = toFiniteNumber(interestRate, 0);
  return safeBase + safeBase * safeInterest / 100;
};

var InlineError = function InlineError(_ref2) {
  var text = _ref2.text;
  return text ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "text-danger mt-2",
    children: text
  }) : null;
};

var CreditTermsSummary = function CreditTermsSummary(_ref3) {
  var creditDetail = _ref3.creditDetail,
      form = _ref3.form,
      money = _ref3.money,
      title = _ref3.title,
      description = _ref3.description,
      _ref3$isRestructure = _ref3.isRestructure,
      isRestructure = _ref3$isRestructure === void 0 ? false : _ref3$isRestructure;
  var baseAmount = isRestructure ? toFiniteNumber(creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.balance, 0) : toFiniteNumber(creditDetail === null || creditDetail === void 0 ? void 0 : creditDetail.total_amount, 0);
  var installments = normalizeInstallments(form);
  var estimatedTotal = estimatePlannedTotal(baseAmount, form.interest_rate);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "credits-form-panel credits-form-panel--accent",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "credits-form-panel__title",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "credits-form-panel__subtitle",
      children: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-detail-grid credits-detail-grid--dense",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Base a recalcular"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(baseAmount)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Tipo nuevo"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: (0,_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.getCreditTypeLabel)(form.credit_type)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Cuotas nuevas"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: String(installments)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Total estimado"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(estimatedTotal)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Inicio"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: form.start_date || "-"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Vencimiento"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: form.due_date || "-"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "credits-info-banner credits-info-banner--primary mt-4",
      children: isRestructure ? "Los pagos previos se conservan en historial y se generara un nuevo plan sobre el saldo pendiente." : "La edicion directa solo ajusta terminos del credito sin tocar pagos ni historial."
    })]
  });
};

var CreditTermsFields = function CreditTermsFields(_ref4) {
  var form = _ref4.form,
      setForm = _ref4.setForm,
      errors = _ref4.errors,
      confirmLabel = _ref4.confirmLabel,
      _ref4$isRestructure = _ref4.isRestructure,
      isRestructure = _ref4$isRestructure === void 0 ? false : _ref4$isRestructure;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "credits-form-panel",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: "g-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Tipo de credito"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Select, {
          className: "credits-form-control",
          value: form.credit_type,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                credit_type: event.target.value,
                installments: event.target.value === "libre" ? "1" : prev.installments
              });
            });
          },
          children: _creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CREDIT_TYPE_OPTIONS.map(function (option) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
              value: option.value,
              children: option.label
            }, option.value);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Numero de cuotas"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          className: "credits-form-control",
          type: "number",
          min: "1",
          step: "1",
          disabled: form.credit_type === "libre",
          value: form.credit_type === "libre" ? "1" : form.installments,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                installments: event.target.value
              });
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.installments
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 4,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Interes (%)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          className: "credits-form-control",
          type: "number",
          min: "0",
          step: "0.01",
          value: form.interest_rate,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                interest_rate: event.target.value
              });
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.interest_rate
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 6,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Fecha inicial"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          className: "credits-form-control",
          type: "date",
          value: form.start_date,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                start_date: event.target.value
              });
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.start_date
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 6,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Fecha de vencimiento"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          className: "credits-form-control",
          type: "date",
          value: form.due_date,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                due_date: event.target.value
              });
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.due_date
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 12,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Nota"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          as: "textarea",
          rows: 3,
          className: "credits-form-control",
          value: form.note,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                note: event.target.value
              });
            });
          }
        })]
      }), isRestructure ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 12,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
          children: "Motivo de reestructuracion"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
          as: "textarea",
          rows: 3,
          className: "credits-form-control",
          value: form.reason,
          onChange: function onChange(event) {
            return setForm(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                reason: event.target.value
              });
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.reason
        })]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
        md: 12,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "credits-check-field",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Check, {
            label: confirmLabel,
            checked: form.confirm,
            onChange: function onChange(event) {
              return setForm(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  confirm: event.target.checked
                });
              });
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
          text: errors.confirm
        })]
      })]
    })
  });
};

var ConfigModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref5) {
  var _form$customer_id;

  var show = _ref5.show,
      onHide = _ref5.onHide,
      form = _ref5.form,
      setForm = _ref5.setForm,
      errors = _ref5.errors,
      customers = _ref5.customers,
      saving = _ref5.saving,
      onSubmit = _ref5.onSubmit,
      existingCustomerIds = _ref5.existingCustomerIds;
  var shouldRenderBody = useDeferredModalContent(show);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "lg"
  }, MODAL_PROPS), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Configurar credito de cliente"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "credits-form-panel",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
          className: "g-4 credits-manual-layout",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
              title: "Cliente",
              data: customers,
              value: form.customer_id,
              onChange: function onChange(value) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    customer_id: value
                  });
                });
              },
              errors: errors.customer_id,
              customSelectProps: {
                isDisabled: existingCustomerIds.includes(Number((_form$customer_id = form.customer_id) === null || _form$customer_id === void 0 ? void 0 : _form$customer_id.value))
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Limite de credito"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "0",
              step: "0.01",
              value: form.credit_limit,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    credit_limit: event.target.value
                  });
                });
              }
            }), errors.credit_limit ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "text-danger mt-2",
              children: errors.credit_limit
            }) : null]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Interes (%)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "0",
              step: "0.01",
              value: form.interest_rate,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    interest_rate: event.target.value
                  });
                });
              }
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Maximo de cuotas"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "1",
              step: "1",
              value: form.max_installments,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    max_installments: event.target.value
                  });
                });
              }
            }), errors.max_installments ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "text-danger mt-2",
              children: errors.max_installments
            }) : null]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Estado"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Select, {
              className: "credits-form-control",
              value: form.status,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    status: event.target.value
                  });
                });
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
                value: "activo",
                children: "Activo"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
                value: "bloqueado",
                children: "Bloqueado"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "small text-muted",
              children: "El limite de credito es estricto y siempre se valida en backend usando el saldo pendiente real del cliente."
            })
          })]
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "cancel-modal",
        onClick: onHide,
        children: "Cancelar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "save-config",
        onClick: onSubmit,
        disabled: saving,
        children: saving ? "Guardando..." : "Guardar"
      })]
    })]
  }));
});
var ManualCreditModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref6) {
  var _productPreview$attri, _productPreview$attri2, _productPreview$attri3;

  var show = _ref6.show,
      onHide = _ref6.onHide,
      form = _ref6.form,
      setForm = _ref6.setForm,
      errors = _ref6.errors,
      customers = _ref6.customers,
      warehouses = _ref6.warehouses,
      productsById = _ref6.productsById,
      productsLoading = _ref6.productsLoading,
      manualTotal = _ref6.manualTotal,
      money = _ref6.money,
      productPreview = _ref6.productPreview,
      searchResults = _ref6.searchResults,
      productInputRef = _ref6.productInputRef,
      saving = _ref6.saving,
      onWarehouseChange = _ref6.onWarehouseChange,
      onProductSearchChange = _ref6.onProductSearchChange,
      onProductSearchSubmit = _ref6.onProductSearchSubmit,
      onSelectSearchResult = _ref6.onSelectSearchResult,
      onQuantityChange = _ref6.onQuantityChange,
      onRemoveItem = _ref6.onRemoveItem,
      onSubmit = _ref6.onSubmit;
  var shouldRenderBody = useDeferredModalContent(show);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide
  }, MODAL_PROPS), {}, {
    dialogClassName: "credits-modal-dialog credits-modal-dialog--manual",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Crear credito manual"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "credits-form-panel",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
          className: "g-4 credits-manual-layout",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
              title: "Cliente",
              data: customers,
              value: form.customer_id,
              onChange: function onChange(value) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    customer_id: value
                  });
                });
              },
              errors: errors.customer_id
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_3__["default"], {
              title: "Bodega",
              data: warehouses,
              value: form.warehouse_id,
              onChange: onWarehouseChange,
              errors: errors.warehouse_id
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field credits-manual-layout__field--product-section",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "credits-form-panel credits-form-panel--accent credits-manual-products",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "credits-manual-products__header",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "credits-form-panel__title mb-1",
                    children: "Productos del credito"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: "credits-form-panel__subtitle mb-0",
                    children: "Escanea o escribe nombre o codigo. El codigo exacto se agrega al instante y los productos repetidos suman cantidad."
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "credits-manual-products__count",
                  children: [(form.items || []).length, " producto", (form.items || []).length === 1 ? "" : "s"]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "credits-manual-products__scan",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
                  children: "Escanear o buscar producto"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_13__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_13__["default"].Text, {
                    className: "credits-manual-products__scan-icon",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__.faBarcode
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
                    ref: productInputRef,
                    className: "credits-form-control credits-manual-products__scan-input",
                    type: "text",
                    autoFocus: true,
                    autoComplete: "off",
                    spellCheck: false,
                    value: form.product_search || "",
                    placeholder: form.warehouse_id ? "Escanea o escribe nombre o codigo" : "Seleccione una bodega para comenzar",
                    disabled: !form.warehouse_id,
                    onChange: function onChange(event) {
                      return onProductSearchChange(event.target.value);
                    },
                    onKeyDown: function onKeyDown(event) {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        onProductSearchSubmit(event.currentTarget.value);
                      }
                    }
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "credits-manual-products__hint",
                  children: productsLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
                    className: "credits-manual-products__status",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
                      animation: "border",
                      size: "sm"
                    }), "Cargando catalogo de la bodega..."]
                  }) : productPreview ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
                    children: ["Coincidencia lista:", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
                      children: productPreview === null || productPreview === void 0 ? void 0 : (_productPreview$attri = productPreview.attributes) === null || _productPreview$attri === void 0 ? void 0 : _productPreview$attri.name
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                      children: " \xB7 ".concat(String((productPreview === null || productPreview === void 0 ? void 0 : (_productPreview$attri2 = productPreview.attributes) === null || _productPreview$attri2 === void 0 ? void 0 : _productPreview$attri2.code) || (productPreview === null || productPreview === void 0 ? void 0 : (_productPreview$attri3 = productPreview.attributes) === null || _productPreview$attri3 === void 0 ? void 0 : _productPreview$attri3.product_code) || "sin codigo"))
                    })]
                  }) : form.warehouse_id ? "Escribe o escanea. El codigo exacto entra sin Enter y el cursor sigue listo." : "Selecciona una bodega para habilitar el flujo de escaneo."
                }), (searchResults === null || searchResults === void 0 ? void 0 : searchResults.length) > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "credits-manual-products__results",
                  children: searchResults.map(function (product) {
                    var _product$attributes, _product$attributes2, _product$attributes$s, _product$attributes3, _product$attributes3$, _product$attributes4;

                    var productCode = (product === null || product === void 0 ? void 0 : (_product$attributes = product.attributes) === null || _product$attributes === void 0 ? void 0 : _product$attributes.code) || (product === null || product === void 0 ? void 0 : (_product$attributes2 = product.attributes) === null || _product$attributes2 === void 0 ? void 0 : _product$attributes2.product_code) || "ID ".concat(product === null || product === void 0 ? void 0 : product.id);
                    var stockQty = (_product$attributes$s = product === null || product === void 0 ? void 0 : (_product$attributes3 = product.attributes) === null || _product$attributes3 === void 0 ? void 0 : (_product$attributes3$ = _product$attributes3.stock) === null || _product$attributes3$ === void 0 ? void 0 : _product$attributes3$.quantity) !== null && _product$attributes$s !== void 0 ? _product$attributes$s : 0;
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
                      type: "button",
                      className: "credits-manual-products__result",
                      onClick: function onClick() {
                        return onSelectSearchResult(product);
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                        className: "credits-manual-products__result-name",
                        children: (product === null || product === void 0 ? void 0 : (_product$attributes4 = product.attributes) === null || _product$attributes4 === void 0 ? void 0 : _product$attributes4.name) || "Producto"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                        className: "credits-manual-products__result-meta",
                        children: "".concat(productCode, " | Stock ").concat(Number(stockQty || 0).toFixed(2))
                      })]
                    }, "manual-search-result-".concat(product.id));
                  })
                }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
                  text: errors.product_search
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "credits-table-wrapper credits-table-wrapper--manual",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "table-responsive",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
                    hover: true,
                    className: "align-middle credits-table",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("thead", {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                          children: "Producto"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                          children: "Precio"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                          children: "Disponible"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                          className: "text-center",
                          children: "Cantidad"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
                          children: "Subtotal"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {})]
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tbody", {
                      children: (form.items || []).length > 0 ? (form.items || []).map(function (item, index) {
                        var _product$attributes$s2, _product$attributes5, _product$attributes5$, _product$attributes$p, _product$attributes6, _product$attributes7, _product$attributes7$, _product$attributes8, _product$attributes8$, _product$attributes9, _product$attributes9$, _product$attributes10, _product$attributes11, _product$attributes12;

                        var product = productsById === null || productsById === void 0 ? void 0 : productsById.get(Number(item.product_id || 0));
                        var stockQty = (_product$attributes$s2 = product === null || product === void 0 ? void 0 : (_product$attributes5 = product.attributes) === null || _product$attributes5 === void 0 ? void 0 : (_product$attributes5$ = _product$attributes5.stock) === null || _product$attributes5$ === void 0 ? void 0 : _product$attributes5$.quantity) !== null && _product$attributes$s2 !== void 0 ? _product$attributes$s2 : 0;
                        var price = (_product$attributes$p = product === null || product === void 0 ? void 0 : (_product$attributes6 = product.attributes) === null || _product$attributes6 === void 0 ? void 0 : _product$attributes6.product_price) !== null && _product$attributes$p !== void 0 ? _product$attributes$p : 0;
                        var subTotal = Number(price || 0) * Number(item.quantity || 0);
                        var quantity = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.parseNumber)(item.quantity, 1) || 1;
                        var safeQuantity = quantity < 1 ? 1 : quantity;
                        var availableStock = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_4__.parseNumber)(stockQty, 0);
                        var maxQuantity = availableStock > 0 ? availableStock : safeQuantity;
                        var canDecrement = safeQuantity > 1;
                        var canIncrement = safeQuantity < maxQuantity;
                        var displayQuantity = Number.isInteger(safeQuantity) ? String(safeQuantity) : safeQuantity.toFixed(2);
                        var stockUnit = (product === null || product === void 0 ? void 0 : (_product$attributes7 = product.attributes) === null || _product$attributes7 === void 0 ? void 0 : (_product$attributes7$ = _product$attributes7.sale_unit_name) === null || _product$attributes7$ === void 0 ? void 0 : _product$attributes7$.short_name) || (product === null || product === void 0 ? void 0 : (_product$attributes8 = product.attributes) === null || _product$attributes8 === void 0 ? void 0 : (_product$attributes8$ = _product$attributes8.product_unit_name) === null || _product$attributes8$ === void 0 ? void 0 : _product$attributes8$.short_name) || (product === null || product === void 0 ? void 0 : (_product$attributes9 = product.attributes) === null || _product$attributes9 === void 0 ? void 0 : (_product$attributes9$ = _product$attributes9.product_unit_name) === null || _product$attributes9$ === void 0 ? void 0 : _product$attributes9$.name) || "U";
                        var productCode = (product === null || product === void 0 ? void 0 : (_product$attributes10 = product.attributes) === null || _product$attributes10 === void 0 ? void 0 : _product$attributes10.code) || (product === null || product === void 0 ? void 0 : (_product$attributes11 = product.attributes) === null || _product$attributes11 === void 0 ? void 0 : _product$attributes11.product_code) || "ID ".concat(product === null || product === void 0 ? void 0 : product.id);
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
                          className: "credits-manual-product-row",
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                              className: "credits-manual-product",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
                                className: "product-name credits-manual-product__code",
                                children: productCode
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                                className: "d-flex flex-wrap align-items-center gap-2 mt-2",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                                  className: "credits-manual-product__name-badge",
                                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                                    children: (product === null || product === void 0 ? void 0 : (_product$attributes12 = product.attributes) === null || _product$attributes12 === void 0 ? void 0 : _product$attributes12.name) || "Producto no disponible"
                                  })
                                })
                              })]
                            })
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            className: "text-end credits-manual-product__money",
                            children: money(price)
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                              className: "credits-manual-product__stock-badge",
                              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                                children: "".concat(Number(stockQty || 0).toFixed(2), " ").concat(stockUnit)
                              })
                            })
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            className: "text-center",
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                              className: "credits-manual-product__qty",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                                type: "button",
                                className: (0,_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.getCreditActionClassName)({
                                  action: "manual-qty",
                                  className: "credits-manual-product__qty-button",
                                  icon: true
                                }),
                                disabled: !canDecrement,
                                onClick: function onClick() {
                                  return canDecrement && onQuantityChange(index, String(Math.max(1, safeQuantity - 1)));
                                },
                                "aria-label": "Disminuir cantidad",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                                  icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__.faMinus
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
                                "aria-label": "Cantidad del producto",
                                className: "credits-manual-product__qty-input",
                                value: displayQuantity,
                                type: "text",
                                readOnly: true,
                                tabIndex: -1
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                                type: "button",
                                className: (0,_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.getCreditActionClassName)({
                                  action: "manual-qty",
                                  className: "credits-manual-product__qty-button",
                                  icon: true
                                }),
                                disabled: !canIncrement,
                                onClick: function onClick() {
                                  return canIncrement && onQuantityChange(index, String(Math.min(maxQuantity, safeQuantity + 1)));
                                },
                                "aria-label": "Aumentar cantidad",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                                  icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__.faPlus
                                })
                              })]
                            })
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            className: "text-end credits-manual-product__money",
                            children: money(subTotal)
                          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                            className: "text-end remove-button",
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
                              type: "button",
                              className: (0,_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.getCreditActionClassName)({
                                action: "remove-manual-item",
                                className: "credits-manual-product__remove",
                                icon: true
                              }),
                              onClick: function onClick() {
                                return onRemoveItem(index);
                              },
                              "aria-label": "Eliminar producto del credito",
                              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
                                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__.faTrash
                              })
                            })
                          })]
                        }, "manual-credit-item-".concat(item.product_id || index));
                      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                          colSpan: 6,
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                            className: "credits-empty credits-empty--manual",
                            children: "Escanea o escribe un producto para comenzar a cargar el credito."
                          })
                        })
                      })
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InlineError, {
                text: errors.items
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            className: "credits-manual-layout__field",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Monto"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "0",
              step: "0.01",
              value: Number(manualTotal || 0) > 0 ? Number(manualTotal).toFixed(2) : form.total_amount,
              disabled: Number(manualTotal || 0) > 0,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    total_amount: event.target.value
                  });
                });
              }
            }), errors.total_amount ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "text-danger mt-2",
              children: errors.total_amount
            }) : null]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 6,
            className: "credits-manual-layout__field",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Interes (%)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "0",
              step: "0.01",
              value: form.interest_rate,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    interest_rate: event.target.value
                  });
                });
              }
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 4,
            className: "credits-manual-layout__field",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Cuotas"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "number",
              min: "1",
              step: "1",
              value: form.installments,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    installments: event.target.value
                  });
                });
              }
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 4,
            className: "credits-manual-layout__field",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Fecha inicial"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "date",
              value: form.start_date,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    start_date: event.target.value
                  });
                });
              }
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 4,
            className: "credits-manual-layout__field",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Fecha de vencimiento"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              className: "credits-form-control",
              type: "date",
              value: form.due_date,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    due_date: event.target.value
                  });
                });
              }
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
            md: 12,
            className: "credits-manual-layout__field credits-manual-layout__field--full",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
              children: "Nota"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
              as: "textarea",
              rows: 3,
              className: "credits-form-control",
              value: form.note,
              onChange: function onChange(event) {
                return setForm(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    note: event.target.value
                  });
                });
              }
            })]
          })]
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "cancel-modal",
        onClick: onHide,
        children: "Cancelar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "create-credit",
        onClick: onSubmit,
        disabled: saving,
        children: saving ? "Guardando..." : "Crear credito"
      })]
    })]
  }));
});
var DetailBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref7) {
  var creditDetail = _ref7.creditDetail,
      money = _ref7.money;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-hero",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-record-eyebrow",
          children: ["Credito #", creditDetail.id]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
          className: "credits-record-title mb-1",
          children: creditDetail.customer_name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-record-subtitle",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            children: creditDetail.sale_reference_code || "Venta manual"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
            children: ["Inicio ", creditDetail.start_date || "-"]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.StatusBadge, {
        status: creditDetail.status
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-detail-grid mb-5",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Cliente"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: creditDetail.customer_name
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Venta"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: creditDetail.sale_reference_code || "-"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Total original"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.original_total_amount || creditDetail.total_amount)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Saldo actual"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.balance)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Recuperado"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.recovered_amount || creditDetail.paid_total || 0)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Total a recuperar"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.collection_target_amount || creditDetail.total_with_interest)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Capital pendiente"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.principal_balance)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Estado"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: creditDetail.status
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Tipo"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: creditDetail.credit_type_label || "Automatico"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Pagos registrados"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: Number(creditDetail.payments_count || 0)
        })]
      }), creditDetail.restructured ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Saldo previo"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: money(creditDetail.previous_balance)
        })]
      }) : null, creditDetail.restructured_at ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "credits-detail-item",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
          children: "Ultima reestructuracion"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          children: creditDetail.restructured_at
        })]
      }) : null]
    }), !creditDetail.can_edit_directly && creditDetail.can_restructure ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "credits-info-banner credits-info-banner--warning mb-5",
      children: "Este credito ya tiene movimiento financiero registrado. Para cambiar condiciones debe usarse reestructuracion."
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Cuotas"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["#", "Monto", "Pagado", "Pendiente", "Vence", "Estado"],
        rows: (creditDetail.installments || []).map(function (row) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.installment_number
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.amount)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.paid_amount)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.pending_amount)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.due_date
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.StatusBadge, {
                status: row.status
              })
            })]
          }, row.id);
        }),
        emptyText: "Sin cuotas registradas."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Productos del credito"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["Producto", "Bodega", "Cantidad", "Precio", "Subtotal", "Origen"],
        rows: (creditDetail.items || []).map(function (row) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.product_name || "-"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.warehouse_name || "-"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: Number(row.quantity || 0).toFixed(2)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.product_price)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.sub_total)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.source_label || "-"
            })]
          }, row.credit_item_id || row.id);
        }),
        emptyText: "Este credito no tiene productos asociados."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Historial de pagos"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["Fecha", "Monto", "Tipo", "Metodo", "Nota"],
        rows: (creditDetail.payments || []).map(function (row) {
          var _PAYMENT_METHOD_OPTIO;

          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: formatHistoryDateTime(row.created_at)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.amount)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.entry_type_label || row.entry_type || "-"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: ((_PAYMENT_METHOD_OPTIO = _creditHelpers__WEBPACK_IMPORTED_MODULE_5__.PAYMENT_METHOD_OPTIONS.find(function (option) {
                return Number(option.value) === Number(row.payment_type);
              })) === null || _PAYMENT_METHOD_OPTIO === void 0 ? void 0 : _PAYMENT_METHOD_OPTIO.label) || row.payment_method
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.note || "-"
            })]
          }, row.id);
        }),
        emptyText: "Este credito aun no registra pagos."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Historial de devoluciones"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["Fecha", "Producto", "Cantidad", "Subtotal", "Nota"],
        rows: (creditDetail.returns || []).map(function (row) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: formatHistoryDateTime(row.created_at)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.product_name || "-"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: Number(row.quantity || 0).toFixed(2)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.sub_total)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.note || "-"
            })]
          }, row.id);
        }),
        emptyText: "Este credito aun no registra devoluciones."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Historial de reestructuraciones"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["Fecha", "Saldo anterior", "Saldo nuevo", "Cambio", "Motivo"],
        rows: (creditDetail.restructures || []).map(function (row) {
          var _row$old_terms, _row$new_terms;

          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: formatHistoryDateTime(row.created_at)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.old_balance)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: money(row.new_balance)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: (((_row$old_terms = row.old_terms) === null || _row$old_terms === void 0 ? void 0 : _row$old_terms.credit_type_label) || "Automatico") + " -> " + (((_row$new_terms = row.new_terms) === null || _row$new_terms === void 0 ? void 0 : _row$new_terms.credit_type_label) || "Automatico")
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.reason || "-"
            })]
          }, row.id);
        }),
        emptyText: "Este credito aun no registra reestructuraciones."
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "credits-modal-section",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
        className: "credits-modal-section-title",
        children: "Bitacora del credito"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
        headers: ["Fecha", "Accion", "Descripcion"],
        rows: (creditDetail.logs || []).map(function (row) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: formatHistoryDateTime(row.created_at)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.action
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
              children: row.description || "-"
            })]
          }, row.id);
        }),
        emptyText: "Este credito aun no registra movimientos de bitacora."
      })]
    })]
  });
});
var DetailModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref8) {
  var _creditDetail$items;

  var show = _ref8.show,
      onHide = _ref8.onHide,
      detailLoading = _ref8.detailLoading,
      creditDetail = _ref8.creditDetail,
      money = _ref8.money,
      onOpenEdit = _ref8.onOpenEdit,
      onOpenPrint = _ref8.onOpenPrint,
      onOpenRestructure = _ref8.onOpenRestructure,
      onOpenReturn = _ref8.onOpenReturn,
      _ref8$canEditCredit = _ref8.canEditCredit,
      canEditCredit = _ref8$canEditCredit === void 0 ? true : _ref8$canEditCredit,
      _ref8$canRestructureC = _ref8.canRestructureCredit,
      canRestructureCredit = _ref8$canRestructureC === void 0 ? true : _ref8$canRestructureC,
      _ref8$canRegisterRetu = _ref8.canRegisterReturn,
      canRegisterReturn = _ref8$canRegisterRetu === void 0 ? true : _ref8$canRegisterRetu;
  var shouldRenderBody = useDeferredModalContent(show, !detailLoading && !!creditDetail);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "xl"
  }, MODAL_PROPS), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Detalle de credito"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(DetailBody, {
        creditDetail: creditDetail,
        money: money
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      className: "credits-detail-modal__footer",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "print-credit-state",
        className: "credits-detail-modal__btn",
        onClick: onOpenPrint,
        disabled: !creditDetail,
        children: "Imprimir estado"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "close-modal",
        className: "credits-detail-modal__btn credits-detail-modal__btn--secondary",
        onClick: onHide,
        children: "Cerrar"
      }), creditDetail !== null && creditDetail !== void 0 && creditDetail.can_edit_directly && canEditCredit ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "edit-credit",
        className: "credits-detail-modal__btn",
        onClick: onOpenEdit,
        children: "Editar credito"
      }) : null, creditDetail !== null && creditDetail !== void 0 && creditDetail.can_restructure && canRestructureCredit ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "restructure-credit",
        className: "credits-detail-modal__btn",
        onClick: onOpenRestructure,
        children: "Reestructurar credito"
      }) : null, canRegisterReturn && creditDetail !== null && creditDetail !== void 0 && (_creditDetail$items = creditDetail.items) !== null && _creditDetail$items !== void 0 && _creditDetail$items.some(function (item) {
        return Number(item.available_return_quantity) > 0;
      }) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "register-return",
        className: "credits-detail-modal__btn",
        onClick: onOpenReturn,
        children: "Registrar devolucion"
      }) : null]
    })]
  }));
});
var EditCreditModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref9) {
  var show = _ref9.show,
      onHide = _ref9.onHide,
      creditDetail = _ref9.creditDetail,
      money = _ref9.money,
      form = _ref9.form,
      setForm = _ref9.setForm,
      errors = _ref9.errors,
      saving = _ref9.saving,
      onSubmit = _ref9.onSubmit;
  var shouldRenderBody = useDeferredModalContent(show, !!creditDetail);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "xl"
  }, MODAL_PROPS), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Editar credito"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CreditTermsSummary, {
          creditDetail: creditDetail,
          form: form,
          money: money,
          title: "Resumen previo",
          description: "Ajuste cuotas, fechas, interes y tipo manteniendo intacto el historial existente."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-detail-grid mb-4 mt-4",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Cliente"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.customer_name
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Plan actual"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
              children: [resolveInstallmentsCount(creditDetail), " cuotas /", " ", creditDetail.credit_type_label || "Automatico"]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Total original"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: money(creditDetail.original_total_amount || creditDetail.total_amount)
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Interes actual"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
              children: [Number(creditDetail.interest_rate || 0).toFixed(2), "%"]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CreditTermsFields, {
          form: form,
          setForm: setForm,
          errors: errors,
          confirmLabel: "Confirmo que deseo actualizar este credito sin reestructurarlo."
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "cancel-modal",
        onClick: onHide,
        children: "Cancelar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "save-credit-edit",
        onClick: onSubmit,
        disabled: saving || !creditDetail,
        children: saving ? "Guardando..." : "Guardar cambios"
      })]
    })]
  }));
});
var RestructureCreditModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref10) {
  var show = _ref10.show,
      onHide = _ref10.onHide,
      creditDetail = _ref10.creditDetail,
      money = _ref10.money,
      form = _ref10.form,
      setForm = _ref10.setForm,
      errors = _ref10.errors,
      saving = _ref10.saving,
      onSubmit = _ref10.onSubmit;
  var shouldRenderBody = useDeferredModalContent(show, !!creditDetail);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "xl"
  }, MODAL_PROPS), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Reestructurar credito"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CreditTermsSummary, {
          creditDetail: creditDetail,
          form: form,
          money: money,
          title: "Nuevo plan sobre saldo vigente",
          description: "Se recalculara un nuevo plan tomando el saldo pendiente actual como base.",
          isRestructure: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-detail-grid mb-4 mt-4",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Cliente"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.customer_name
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Saldo a reestructurar"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: money(creditDetail.balance)
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Estado actual"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.status
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Pagos historicos"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: Number(creditDetail.payments_count || 0)
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "credits-info-banner credits-info-banner--warning mb-4",
          children: "Las cuotas actuales seran reemplazadas por un nuevo plan y el cambio quedara auditado en historial."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CreditTermsFields, {
          form: form,
          setForm: setForm,
          errors: errors,
          confirmLabel: "Confirmo que deseo reestructurar este credito y generar un nuevo plan.",
          isRestructure: true
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "cancel-modal",
        onClick: onHide,
        children: "Cancelar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "apply-restructure",
        onClick: onSubmit,
        disabled: saving || !creditDetail,
        children: saving ? "Guardando..." : "Aplicar reestructuracion"
      })]
    })]
  }));
});
var PaymentModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref11) {
  var show = _ref11.show,
      onHide = _ref11.onHide,
      detailLoading = _ref11.detailLoading,
      creditDetail = _ref11.creditDetail,
      money = _ref11.money,
      form = _ref11.form,
      setForm = _ref11.setForm,
      errors = _ref11.errors,
      saving = _ref11.saving,
      onSubmit = _ref11.onSubmit;
  var shouldRenderBody = useDeferredModalContent(show, !detailLoading && !!creditDetail);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "xl"
  }, MODAL_PROPS), {}, {
    contentClassName: "".concat(MODAL_PROPS.contentClassName, " credits-payment-modal"),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Registrar pago"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      className: "credits-payment-modal__body",
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-detail-grid mb-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Cliente"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.customer_name
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Saldo actual"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: money(creditDetail.balance)
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Vencimiento"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.due_date
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-form-panel mb-5",
          children: [errors.general ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "alert alert-danger mb-4",
            children: errors.general
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "g-4",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
              md: 4,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
                children: "Monto recibido"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
                className: "credits-form-control",
                type: "number",
                min: "0.01",
                max: creditDetail.balance,
                step: "0.01",
                value: form.amount,
                onChange: function onChange(event) {
                  return setForm(function (prev) {
                    return _objectSpread(_objectSpread({}, prev), {}, {
                      amount: event.target.value
                    });
                  });
                }
              }), errors.amount ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "text-danger mt-2",
                children: errors.amount
              }) : null]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
              md: 4,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
                children: "Metodo de pago"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Select, {
                className: "credits-form-control",
                value: form.payment_type,
                onChange: function onChange(event) {
                  return setForm(function (prev) {
                    return _objectSpread(_objectSpread({}, prev), {}, {
                      payment_type: event.target.value
                    });
                  });
                },
                children: _creditHelpers__WEBPACK_IMPORTED_MODULE_5__.PAYMENT_METHOD_OPTIONS.map(function (option) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("option", {
                    value: option.value,
                    children: option.label
                  }, option.value);
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_10__["default"], {
              md: 12,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
                children: "Nota"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
                as: "textarea",
                rows: 3,
                className: "credits-form-control",
                value: form.note,
                onChange: function onChange(event) {
                  return setForm(function (prev) {
                    return _objectSpread(_objectSpread({}, prev), {}, {
                      note: event.target.value
                    });
                  });
                }
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-modal-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
            className: "credits-modal-section-title",
            children: "Cuotas pendientes"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
            headers: ["#", "Monto", "Pagado", "Pendiente", "Vence", "Estado"],
            rows: _toConsumableArray(creditDetail.installments || []).filter(function (row) {
              return Number(row.pending_amount) > 0;
            }).sort(function (left, right) {
              var dueDateComparison = String(left.due_date || "").localeCompare(String(right.due_date || ""));

              if (dueDateComparison !== 0) {
                return dueDateComparison;
              }

              return Number(left.installment_number || 0) - Number(right.installment_number || 0);
            }).map(function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: row.installment_number
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: money(row.amount)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: money(row.paid_amount)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: money(row.pending_amount)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: row.due_date
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.StatusBadge, {
                    status: row.status
                  })
                })]
              }, row.id);
            }),
            emptyText: "No hay cuotas pendientes."
          })]
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      className: "credits-payment-modal__footer",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "close-modal",
        onClick: onHide,
        children: "Cerrar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "register-payment",
        onClick: onSubmit,
        disabled: saving || !creditDetail,
        className: "credits-payment-modal__submit",
        children: saving ? "Guardando..." : "Registrar pago"
      })]
    })]
  }));
});
var ReturnModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (_ref12) {
  var show = _ref12.show,
      onHide = _ref12.onHide,
      detailLoading = _ref12.detailLoading,
      creditDetail = _ref12.creditDetail,
      money = _ref12.money,
      form = _ref12.form,
      setForm = _ref12.setForm,
      errors = _ref12.errors,
      saving = _ref12.saving,
      onSubmit = _ref12.onSubmit;
  var shouldRenderBody = useDeferredModalContent(show, !detailLoading && !!creditDetail);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"], _objectSpread(_objectSpread({
    show: show,
    onHide: onHide,
    size: "xl"
  }, MODAL_PROPS), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Header, {
      closeButton: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Title, {
        children: "Registrar devolucion"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Body, {
      children: shouldRenderBody ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-detail-grid mb-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Cliente"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: creditDetail.customer_name
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Credito"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
              children: ["#", creditDetail.id]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "credits-detail-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
              children: "Saldo actual"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: money(creditDetail.balance)
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-modal-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
            className: "credits-modal-section-title",
            children: "Productos disponibles para devolucion"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(TableBox, {
            headers: ["Producto", "Entregado", "Devuelto", "Disponible", "Precio", "Cantidad a devolver"],
            rows: (creditDetail.items || []).filter(function (row) {
              return Number(row.available_return_quantity) > 0;
            }).map(function (row) {
              var _form$quantities;

              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: row.product_name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: Number(row.quantity).toFixed(2)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: Number(row.returned_quantity).toFixed(2)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: Number(row.available_return_quantity).toFixed(2)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  children: money(row.product_price)
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                  style: {
                    minWidth: 160
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
                    className: "credits-form-control",
                    type: "number",
                    min: "0",
                    max: row.available_return_quantity,
                    step: "0.01",
                    value: ((_form$quantities = form.quantities) === null || _form$quantities === void 0 ? void 0 : _form$quantities[row.credit_item_id]) || "",
                    onChange: function onChange(event) {
                      return setForm(function (prev) {
                        return _objectSpread(_objectSpread({}, prev), {}, {
                          quantities: _objectSpread(_objectSpread({}, prev.quantities), {}, _defineProperty({}, row.credit_item_id, event.target.value))
                        });
                      });
                    }
                  })
                })]
              }, row.credit_item_id || row.id);
            }),
            emptyText: "Este credito no tiene productos devolvibles."
          }), errors.items ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "text-danger mt-2",
            children: errors.items
          }) : null]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "credits-form-panel mt-4",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Label, {
            children: "Nota"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_11__["default"].Control, {
            as: "textarea",
            rows: 3,
            className: "credits-form-control",
            value: form.note,
            onChange: function onChange(event) {
              return setForm(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  note: event.target.value
                });
              });
            }
          })]
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ModalLoading, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_12__["default"].Footer, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "close-modal",
        onClick: onHide,
        children: "Cerrar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_creditHelpers__WEBPACK_IMPORTED_MODULE_5__.CreditActionButton, {
        action: "register-return",
        onClick: onSubmit,
        disabled: saving || !creditDetail,
        children: saving ? "Guardando..." : "Registrar devolucion"
      })]
    })]
  }));
});

/***/ })

}]);