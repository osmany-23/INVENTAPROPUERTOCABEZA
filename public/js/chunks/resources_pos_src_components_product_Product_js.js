(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_product_Product_js"],{

/***/ "./resources/pos/src/components/product/DeleteMainProduct.js":
/*!*******************************************************************!*\
  !*** ./resources/pos/src/components/product/DeleteMainProduct.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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







var DeleteMainProduct = function DeleteMainProduct(props) {
  var deleteMainProduct = props.deleteMainProduct,
      onDelete = props.onDelete,
      deleteModel = props.deleteModel,
      onClickDeleteModel = props.onClickDeleteModel;

  var deleteUserClick = function deleteUserClick() {
    deleteMainProduct(onDelete.id);
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
  deleteMainProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_2__.deleteMainProduct
})(DeleteMainProduct));

/***/ }),

/***/ "./resources/pos/src/components/product/ImportProductFrom.js":
/*!*******************************************************************!*\
  !*** ./resources/pos/src/components/product/ImportProductFrom.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Modal.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _store_action_toastAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/action/toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var ImportProductFrom = function ImportProductFrom(props) {
  var handleClose = props.handleClose,
      show = props.show,
      title = props.title,
      addImportData = props.addImportData,
      link = props.link;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    file: ''
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

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      selectFile = _useState6[0],
      setSelectFile = _useState6[1];

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  var handleValidation = function handleValidation() {
    var errorss = {};
    var isValid = false;

    if (!formValue['file']) {
      errorss['file'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.file.validate.label");
    } else if (formValue['file'].type !== "text/csv") {
      errorss['file'] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.csv-file.validate.label");
    } else {
      isValid = true;
    }

    setErrors(errorss);
    return isValid;
  };

  var handleImageChanges = function handleImageChanges(e) {
    e.preventDefault();

    if (e.target.files.length > 0) {
      var file = e.target.files[0];
      setSelectFile(file);

      if (file.type === 'text/csv') {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_4__.addToast)({
          text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("file.success.upload.message")
        }));
        setErrors('');
      }
    }
  };

  var handleClick = function handleClick(event) {
    var _ref = event || {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? {} : _ref$target;

    target.value = '';
  };

  var prepareFormData = function prepareFormData(data) {
    var formData = new FormData();

    if (selectFile) {
      formData.append('file', data.file);
    }

    return formData;
  };

  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    formValue.file = selectFile;
    var valid = handleValidation();

    if (valid) {
      setFormValue(formValue);
      addImportData(prepareFormData(formValue));
      clearField(false);
    }

    setSelectFile(null);
  };

  var clearField = function clearField() {
    setFormValue({
      file: ''
    });
    setErrors('');
    handleClose(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"], {
    show: show,
    onHide: clearField,
    keyboard: true,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"].Header, {
        closeButton: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"].Title, {
          children: title
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"].Body, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-12 mb-5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"].Group, {
              controlId: "formFileMultiple",
              className: "mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"].Control, {
                type: "file",
                onClick: handleClick,
                className: "upload-input-file",
                onChange: handleImageChanges
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors['file'] ? errors['file'] : null
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-sm-12 col-md-6 mb-1",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
              onClick: function onClick(event) {
                return onSubmit(event);
              },
              className: "btn btn-primary me-2 fw-semibold w-100 h-100",
              type: "submit",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
                children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.placeholderText)("globally.save-btn")
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-sm-12 col-md-6 mb-1",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: "/import_demo_files/import_products.csv",
              className: "btn btn-info me-2 fw-semibold w-100 h-100",
              type: "submit",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("u", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
                  children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)('globally.sample.download.label')
                })
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("table", {
              className: "table table-bordered table-sm mt-4",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tbody", {
                className: "fw-normal",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("supplier.table.name.column.title")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.product-details.code-product.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("td", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
                      className: "fw-bold",
                      children: [" ", (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product-code.import.required-highlight.message")]
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.product-details.category.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("brand.title")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.product-cost.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.product-price.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.product-unit.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("td", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
                      className: "fw-bold",
                      children: [" ", (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product-unit.import.required-highlight.message")]
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.sale-unit.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.purchase-unit.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.detail.order.tax")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.input.tax-type.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-primary",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.require-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)('dashboard.stockAlert.title')
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)('globally.input.notes.label')
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.detail.warehouse")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("supplier.title")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.quantity.title")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("dashboard.recentSales.status.label")
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                      className: "badge bg-light-success",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.optional-input.validate.label")
                      })
                    })
                  })]
                })]
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "col-md-12 text-end",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
              onClick: function onClick() {
                return clearField(false);
              },
              className: "btn btn-secondary",
              children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("globally.cancel-btn")
            })
          })]
        })
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  fetchBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.fetchBrand,
  editBrand: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.editBrand,
  fetchBrands: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_2__.fetchBrands
})(ImportProductFrom));

/***/ }),

/***/ "./resources/pos/src/components/product/ImportProductModel.js":
/*!********************************************************************!*\
  !*** ./resources/pos/src/components/product/ImportProductModel.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _ImportProductFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImportProductFrom */ "./resources/pos/src/components/product/ImportProductFrom.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ImportProductModel(props) {
  var handleClose = props.handleClose,
      show = props.show;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();

  var addImportData = function addImportData(formValue) {
    dispatch((0,_store_action_productAction__WEBPACK_IMPORTED_MODULE_3__.addImportProduct)(formValue, navigate));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ImportProductFrom__WEBPACK_IMPORTED_MODULE_2__["default"], {
      addImportData: addImportData,
      handleClose: handleClose,
      show: show,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_1__.getFormattedMessage)('product.import.title')
    })
  });
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImportProductModel);

/***/ }),

/***/ "./resources/pos/src/components/product/Product.js":
/*!*********************************************************!*\
  !*** ./resources/pos/src/components/product/Product.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Image.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var _shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/table/ReactDataTable */ "./resources/pos/src/shared/table/ReactDataTable.js");
/* harmony import */ var _DeleteMainProduct__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DeleteMainProduct */ "./resources/pos/src/components/product/DeleteMainProduct.js");
/* harmony import */ var _shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/tab-title/TabTitle */ "./resources/pos/src/shared/tab-title/TabTitle.js");
/* harmony import */ var _ProductImageLightBox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProductImageLightBox */ "./resources/pos/src/components/product/ProductImageLightBox.js");
/* harmony import */ var _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../assets/images/brand_logo.png */ "./resources/pos/src/assets/images/brand_logo.png");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/action-buttons/ActionButton */ "./resources/pos/src/shared/action-buttons/ActionButton.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var _ImportProductModel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ImportProductModel */ "./resources/pos/src/components/product/ImportProductModel.js");
/* harmony import */ var _store_action_productExcelAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../store/action/productExcelAction */ "./resources/pos/src/store/action/productExcelAction.js");
/* harmony import */ var _shared_performance_posPerformance__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../shared/performance/posPerformance */ "./resources/pos/src/shared/performance/posPerformance.js");
/* harmony import */ var _shared_can__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../shared/can */ "./resources/pos/src/shared/can.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


























var PRODUCT_NOTE_PREVIEW_LIMIT = 50;
var PRODUCT_NOTE_TOOLTIP_WIDTH = 320;
var PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT = 220;
var PRODUCT_NOTE_TOOLTIP_OFFSET = 10;
var PRODUCT_NOTE_TOOLTIP_HIDE_DELAY = 100;
var PRODUCT_NOTE_TOOLTIP_UNMOUNT_DELAY = 160;
var PRODUCT_NOTE_PREVIEW_STYLE = {
  maxWidth: 300,
  lineHeight: "1.3rem",
  minHeight: "2.6rem",
  maxHeight: "2.6rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  whiteSpace: "normal",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  overflow: "hidden",
  textOverflow: "ellipsis"
};
var PRODUCT_NOTE_PREVIEW_WRAPPER_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  maxWidth: "100%",
  cursor: "pointer"
};
var PRODUCT_NOTE_TOOLTIP_STYLE = {
  position: "fixed",
  zIndex: 1100,
  backgroundColor: "#ffffff",
  color: "#495057",
  border: "1px solid rgba(101, 113, 255, 0.24)",
  borderRadius: "12px",
  padding: "10px 12px",
  lineHeight: "1.35rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  maxHeight: PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT,
  overflowY: "auto",
  scrollbarWidth: "thin",
  boxShadow: "0 10px 26px rgba(16, 24, 40, 0.12), 0 2px 8px rgba(16, 24, 40, 0.08)",
  transition: "opacity 160ms ease, transform 160ms ease",
  opacity: 0,
  transform: "translateY(4px)",
  pointerEvents: "auto"
};
var PRODUCT_NOTE_TOOLTIP_VISIBLE_STYLE = {
  opacity: 1,
  transform: "translateY(0)"
};
var PRODUCT_IMAGE_WRAPPER_STYLE = {
  width: 50,
  height: 50,
  minWidth: 50,
  minHeight: 50,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"
};
var PRODUCT_IMAGE_CELL_CONTENT_STYLE = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
var PRODUCT_IMAGE_HEADER_STYLE = {
  width: "100%",
  textAlign: "center"
};
var PRODUCT_IMAGE_BUTTON_STYLE = {
  width: "100%",
  height: "100%",
  padding: 0,
  border: "none",
  boxShadow: "none",
  outline: "none",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%"
};
var PRODUCT_IMAGE_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  borderRadius: "50%"
};
var PRODUCT_IMAGE_COLUMN_CELL_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 0,
  paddingRight: 0
};
var PRODUCT_NAME_COLUMN_CELL_STYLE = {
  display: "flex",
  alignItems: "center",
  paddingLeft: "12px"
};
var PRODUCT_NAME_TEXT_STYLE = {
  display: "flex",
  alignItems: "center",
  width: "100%"
};
var PRODUCT_IMAGE_URL_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:\/\//i;
var PRODUCT_IMAGE_PATH_PREFIXES = ["//", "/", "data:", "blob:"];
var PRODUCT_ROUTE_PATH = "/app/products";
var PRODUCT_BOTTLENECK_LABEL = "shared/filterMenu/FilterDropdown.js -> fetchAllBaseUnits() + fetchAllBrands() + fetchAllProductCategories()";

var isProductImagePathLike = function isProductImagePathLike(value) {
  var normalizedValue = String(value || "").trim().toLowerCase();

  if (!normalizedValue) {
    return false;
  }

  if (PRODUCT_IMAGE_URL_PROTOCOL_REGEX.test(normalizedValue)) {
    return true;
  }

  return PRODUCT_IMAGE_PATH_PREFIXES.some(function (prefix) {
    return normalizedValue.startsWith(prefix);
  });
};

var shouldSplitProductImageValue = function shouldSplitProductImageValue(value) {
  if (!value.includes(",")) {
    return false;
  }

  var parts = value.split(",").map(function (part) {
    return part.trim();
  }).filter(Boolean);

  if (parts.length <= 1) {
    return false;
  }

  return parts.every(isProductImagePathLike);
};

var ProductImageCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductImageCell(_ref) {
  var imageUrl = _ref.imageUrl,
      imageUrls = _ref.imageUrls,
      productName = _ref.productName,
      onPreviewImage = _ref.onPreviewImage;
  var handlePreview = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.stopPropagation();

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      onPreviewImage(imageUrls);
    }
  }, [imageUrls, onPreviewImage]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    className: "product-table-card__image-cell",
    style: PRODUCT_IMAGE_CELL_CONTENT_STYLE,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
      className: "product-table-card__image-wrapper",
      style: PRODUCT_IMAGE_WRAPPER_STYLE,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("button", {
        type: "button",
        className: "d-inline-flex align-items-center justify-content-center product-table-card__image-button",
        style: PRODUCT_IMAGE_BUTTON_STYLE,
        onClick: handlePreview,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_20__["default"], {
          src: imageUrl || _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_11__["default"],
          height: 50,
          width: 50,
          alt: productName || "Product Image",
          className: "cursor-pointer product-table-card__image",
          style: PRODUCT_IMAGE_STYLE,
          loading: "lazy",
          decoding: "async"
        })
      })
    })
  });
});
var ProductNameCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductNameCell(_ref2) {
  var name = _ref2.name;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    className: "product-table-card__name",
    children: name || "-"
  });
});
var ProductCodeCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductCodeCell(_ref3) {
  var code = _ref3.code,
      label = _ref3.label;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    className: "product-table-card__code",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("span", {
      className: "badge bg-light-danger product-table-card__badge product-table-card__badge--code",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        className: "product-table-card__desktop-only",
        children: code || "-"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("span", {
        className: "product-table-card__mobile-only",
        children: [label, ": ", code || "-"]
      })]
    })
  });
});
var ProductBrandCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductBrandCell(_ref4) {
  var brandName = _ref4.brandName,
      label = _ref4.label;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
    className: "product-table-card__brand",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("span", {
      className: "product-table-card__label product-table-card__mobile-only",
      children: [label, ":"]
    }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      className: "product-table-card__value",
      children: brandName || "-"
    })]
  });
});
var ProductPriceCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductPriceCell(_ref5) {
  var price = _ref5.price;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    className: "product-table-card__price",
    children: price
  });
});
var ProductUnitCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductUnitCell(_ref6) {
  var unitName = _ref6.unitName;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    className: "product-table-card__unit",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      className: "badge bg-light-success product-table-card__badge product-table-card__badge--unit",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
        children: unitName || "N/A"
      })
    })
  });
});
var ProductStockCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductStockCell(_ref7) {
  var stock = _ref7.stock,
      label = _ref7.label;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
    className: "product-table-card__stock",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      className: "product-table-card__desktop-only",
      children: stock
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("span", {
      className: "product-table-card__stock-badge product-table-card__mobile-only",
      children: [label, ": ", stock]
    })]
  });
});
var ProductDescriptionCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductDescriptionCell(_ref8) {
  var rowId = _ref8.rowId,
      description = _ref8.description;
  var triggerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var hideTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var unmountTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var animationFrameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isTooltipMounted = _useState2[0],
      setIsTooltipMounted = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isTooltipVisible = _useState4[0],
      setIsTooltipVisible = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    top: 0,
    left: 0,
    width: PRODUCT_NOTE_TOOLTIP_WIDTH
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      tooltipPosition = _useState6[0],
      setTooltipPosition = _useState6[1];

  var fullDescription = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (description === null || description === undefined) {
      return "";
    }

    return String(description).trim();
  }, [description]);

  var _useMemo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!fullDescription) {
      return {
        displayDescription: "-",
        isTruncated: false
      };
    }

    if (fullDescription.length <= PRODUCT_NOTE_PREVIEW_LIMIT) {
      return {
        displayDescription: fullDescription,
        isTruncated: false
      };
    }

    return {
      displayDescription: "".concat(fullDescription.slice(0, PRODUCT_NOTE_PREVIEW_LIMIT), "..."),
      isTruncated: true
    };
  }, [fullDescription]),
      displayDescription = _useMemo.displayDescription,
      isTruncated = _useMemo.isTruncated;

  var clearTooltipTimers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (unmountTimeoutRef.current) {
      clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);
  var updateTooltipPosition = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!triggerRef.current || typeof window === "undefined") {
      return;
    }

    var rect = triggerRef.current.getBoundingClientRect();
    var viewportPadding = 8;
    var tooltipWidth = Math.min(PRODUCT_NOTE_TOOLTIP_WIDTH, Math.max(220, window.innerWidth - viewportPadding * 2));
    var left = rect.left;

    if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - tooltipWidth - viewportPadding;
    }

    left = Math.max(viewportPadding, left);
    var top = rect.bottom + PRODUCT_NOTE_TOOLTIP_OFFSET;
    var estimatedHeight = PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT + 24;

    if (top + estimatedHeight > window.innerHeight - viewportPadding) {
      top = Math.max(viewportPadding, rect.top - estimatedHeight - PRODUCT_NOTE_TOOLTIP_OFFSET);
    }

    setTooltipPosition(function (previousPosition) {
      if (previousPosition.top === top && previousPosition.left === left && previousPosition.width === tooltipWidth) {
        return previousPosition;
      }

      return {
        top: top,
        left: left,
        width: tooltipWidth
      };
    });
  }, []);
  var showTooltip = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!isTruncated) {
      return;
    }

    clearTooltipTimers();
    updateTooltipPosition();
    setIsTooltipMounted(true);
    animationFrameRef.current = requestAnimationFrame(function () {
      setIsTooltipVisible(true);
    });
  }, [clearTooltipTimers, isTruncated, updateTooltipPosition]);
  var hideTooltip = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    clearTooltipTimers();
    hideTimeoutRef.current = setTimeout(function () {
      setIsTooltipVisible(false);
      unmountTimeoutRef.current = setTimeout(function () {
        setIsTooltipMounted(false);
      }, PRODUCT_NOTE_TOOLTIP_UNMOUNT_DELAY);
    }, PRODUCT_NOTE_TOOLTIP_HIDE_DELAY);
  }, [clearTooltipTimers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isTooltipMounted) {
      return undefined;
    }

    var handlePositionUpdate = function handlePositionUpdate() {
      updateTooltipPosition();
    };

    window.addEventListener("scroll", handlePositionUpdate, true);
    window.addEventListener("resize", handlePositionUpdate);
    return function () {
      window.removeEventListener("scroll", handlePositionUpdate, true);
      window.removeEventListener("resize", handlePositionUpdate);
    };
  }, [isTooltipMounted, updateTooltipPosition]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      clearTooltipTimers();
    };
  }, [clearTooltipTimers]);

  var descriptionPreview = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
    ref: triggerRef,
    className: "product-table-card__description-trigger",
    style: PRODUCT_NOTE_PREVIEW_WRAPPER_STYLE,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    tabIndex: isTruncated ? 0 : -1,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
      className: "product-table-card__description-text",
      style: PRODUCT_NOTE_PREVIEW_STYLE,
      children: displayDescription
    })
  });

  if (!isTruncated) {
    return descriptionPreview;
  }

  var tooltipPortal = isTooltipMounted && typeof document !== "undefined" ? /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
    role: "tooltip",
    id: "product-note-popover-".concat(rowId),
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    style: _objectSpread(_objectSpread(_objectSpread({}, PRODUCT_NOTE_TOOLTIP_STYLE), isTooltipVisible ? PRODUCT_NOTE_TOOLTIP_VISIBLE_STYLE : null), {}, {
      top: tooltipPosition.top,
      left: tooltipPosition.left,
      width: tooltipPosition.width
    }),
    children: fullDescription
  }), document.body) : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.Fragment, {
    children: [descriptionPreview, tooltipPortal]
  });
});
var ProductActionCell = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function ProductActionCell(_ref9) {
  var row = _ref9.row,
      onView = _ref9.onView,
      onEdit = _ref9.onEdit,
      onDelete = _ref9.onDelete,
      viewLabel = _ref9.viewLabel,
      editLabel = _ref9.editLabel,
      deleteLabel = _ref9.deleteLabel,
      canUpdateProduct = _ref9.canUpdateProduct,
      canDeleteProduct = _ref9.canDeleteProduct;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
    className: "product-table-card__actions",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
      className: "product-table-card__actions-desktop",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_shared_action_buttons_ActionButton__WEBPACK_IMPORTED_MODULE_13__["default"], {
        isViewIcon: true,
        goToDetailScreen: onView,
        item: row,
        goToEditProduct: onEdit,
        isEditMode: true,
        onClickDeleteModel: onDelete
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("div", {
      className: "product-table-card__actions-mobile",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("button", {
        type: "button",
        className: "product-table-card__mobile-action product-table-card__mobile-action--view",
        onClick: function onClick(event) {
          event.stopPropagation();
          onView(row.id);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_21__.faEye,
          fixedWidth: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
          children: viewLabel
        })]
      }), canUpdateProduct ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("button", {
        type: "button",
        className: "product-table-card__mobile-action product-table-card__mobile-action--edit",
        onClick: function onClick(event) {
          event.stopPropagation();
          onEdit(row);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_21__.faPenToSquare,
          fixedWidth: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
          children: editLabel
        })]
      }) : null, canDeleteProduct ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("button", {
        type: "button",
        className: "product-table-card__mobile-action product-table-card__mobile-action--delete",
        onClick: function onClick(event) {
          event.stopPropagation();
          onDelete(row);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_21__.faTrash,
          fixedWidth: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("span", {
          children: deleteLabel
        })]
      }) : null]
    })]
  });
});

var Product = function Product(props) {
  var fetchAllMainProducts = props.fetchAllMainProducts,
      products = props.products,
      totalRecord = props.totalRecord,
      isLoading = props.isLoading,
      frontSetting = props.frontSetting,
      productExcelAction = props.productExcelAction,
      productUnitId = props.productUnitId,
      allConfigData = props.allConfigData;
  var intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_22__["default"])();

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      deleteModel = _useState8[0],
      setDeleteModel = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      isDelete = _useState10[0],
      setIsDelete = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isOpen = _useState12[0],
      setIsOpen = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      lightBoxImage = _useState14[0],
      setLightBoxImage = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      importProduct = _useState16[0],
      setImportProduct = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isWarehouseValue = _useState18[0],
      setIsWarehouseValue = _useState18[1];

  var activeRequestRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var initialProductsRequestStartedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var navigationReadyLoggedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setImportProduct(function (previous) {
      return !previous;
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (isWarehouseValue === true) {
      productExcelAction(setIsWarehouseValue, true, productUnitId);
    }
  }, [isWarehouseValue, productExcelAction, productUnitId]);
  var onExcelClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setIsWarehouseValue(true);
  }, []);
  var cancelActiveRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (activeRequestRef.current) {
      activeRequestRef.current.abort();
      activeRequestRef.current = null;
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_shared_performance_posPerformance__WEBPACK_IMPORTED_MODULE_17__.reportDetectedBottleneck)(PRODUCT_BOTTLENECK_LABEL, "cargas simultaneas de catalogos completos al montar Productos");
    return function () {
      cancelActiveRequest();
    };
  }, [cancelActiveRequest]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!initialProductsRequestStartedRef.current || isLoading || navigationReadyLoggedRef.current) {
      return;
    }

    (0,_shared_performance_posPerformance__WEBPACK_IMPORTED_MODULE_17__.markNavigationReady)("".concat(PRODUCT_ROUTE_PATH, "::data"), "components/product/Product");
    navigationReadyLoggedRef.current = true;
  }, [isLoading]);
  var onClickDeleteModel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setDeleteModel(function (previous) {
      return !previous;
    });
    setIsDelete(item);
  }, []);
  var onChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (filter) {
    cancelActiveRequest();
    initialProductsRequestStartedRef.current = true;
    var controller = new AbortController();
    activeRequestRef.current = controller;
    fetchAllMainProducts(filter, true, controller.signal);
  }, [cancelActiveRequest, fetchAllMainProducts]);
  var goToEditProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (item) {
    var id = item.id;
    window.location.href = "#/app/products/edit/" + id;
  }, []);
  var goToProductDetailPage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    window.location.href = "#/app/products/detail/" + productId;
  }, []);
  var onPreviewImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (images) {
    var normalizeImages = function normalizeImages(value) {
      if (Array.isArray(value)) {
        return value.flatMap(normalizeImages);
      }

      if (typeof value === "string") {
        var normalizedValue = value.trim();

        if (!normalizedValue) {
          return [];
        }

        if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) {
          try {
            return normalizeImages(JSON.parse(normalizedValue));
          } catch (error) {// If parsing fails, continue with plain string fallback.
          }
        }

        if (shouldSplitProductImageValue(normalizedValue)) {
          return normalizedValue.split(",").map(function (image) {
            return image.trim();
          }).filter(Boolean);
        }

        return [normalizedValue];
      }

      return [];
    };

    var normalizedImages = normalizeImages(images).filter(Boolean);

    if (normalizedImages.length === 0) {
      return;
    }

    setLightBoxImage(normalizedImages);
    setIsOpen(true);
  }, []);
  var currencySymbol = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getCurrencySymbol)(frontSetting);
  var codeLabel = intl.formatMessage({
    id: "product.input.code.label",
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

  var viewActionLabel = function () {
    var translatedLabel = intl.formatMessage({
      id: "globally.view.tooltip.label",
      defaultMessage: "Ver"
    });
    return translatedLabel === "Vista" ? "Ver" : translatedLabel;
  }();

  var editActionLabel = intl.formatMessage({
    id: "globally.edit.tooltip.label",
    defaultMessage: "Editar"
  });

  var deleteActionLabel = function () {
    var translatedLabel = intl.formatMessage({
      id: "globally.delete.tooltip.label",
      defaultMessage: "Eliminar"
    });
    return translatedLabel === "Borrar" ? "Eliminar" : translatedLabel;
  }();

  var canUpdateProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_shared_can__WEBPACK_IMPORTED_MODULE_18__.canCrud)("update");
  }, []);
  var canDeleteProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_shared_can__WEBPACK_IMPORTED_MODULE_18__.canCrud)("delete");
  }, []);
  var formattedPrice = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productPrice) {
    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.formatCurrency)(allConfigData, currencySymbol, productPrice);
  }, [allConfigData, currencySymbol]);
  var itemsValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    return products.map(function (product) {
      var _attributes$products, _attributes$min_price, _attributes$max_price, _attributes$images, _attributes$product_u, _attributes$in_stock;

      var attributes = (product === null || product === void 0 ? void 0 : product.attributes) || {};
      var firstVariation = (attributes === null || attributes === void 0 ? void 0 : (_attributes$products = attributes.products) === null || _attributes$products === void 0 ? void 0 : _attributes$products[0]) || {};
      var minPrice = Number((_attributes$min_price = attributes.min_price) !== null && _attributes$min_price !== void 0 ? _attributes$min_price : firstVariation.product_price);
      var maxPrice = Number((_attributes$max_price = attributes.max_price) !== null && _attributes$max_price !== void 0 ? _attributes$max_price : firstVariation.product_price);
      var productPrice = Number.isFinite(minPrice) && Number.isFinite(maxPrice) ? minPrice === maxPrice ? formattedPrice(minPrice) : "".concat(formattedPrice(minPrice), " - ").concat(formattedPrice(maxPrice)) : formattedPrice(0);
      var createdAt = attributes.created_at || firstVariation.created_at;
      var description = attributes.full_description || attributes.description || firstVariation.notes || "";
      var imageUrls = (attributes === null || attributes === void 0 ? void 0 : (_attributes$images = attributes.images) === null || _attributes$images === void 0 ? void 0 : _attributes$images.imageUrls) || [];
      var inStockFromVariations = Array.isArray(attributes.products) ? attributes.products.reduce(function (sum, rowProduct) {
        return sum + Number((rowProduct === null || rowProduct === void 0 ? void 0 : rowProduct.in_stock) || 0);
      }, 0) : 0;
      return {
        id: product.id,
        name: attributes.name,
        code: attributes.code,
        date: createdAt ? (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedDate)(createdAt, allConfigData && allConfigData) : "",
        time: createdAt ? moment__WEBPACK_IMPORTED_MODULE_3___default()(createdAt).format("LT") : "",
        brand_name: attributes.brand_name || firstVariation.brand_name || "",
        product_price: productPrice,
        product_unit: (attributes === null || attributes === void 0 ? void 0 : (_attributes$product_u = attributes.product_unit) === null || _attributes$product_u === void 0 ? void 0 : _attributes$product_u.name) || "N/A",
        in_stock: Number((_attributes$in_stock = attributes.in_stock) !== null && _attributes$in_stock !== void 0 ? _attributes$in_stock : inStockFromVariations),
        description: description,
        imageUrl: imageUrls[0] || null,
        imageUrls: imageUrls
      };
    });
  }, [allConfigData, formattedPrice, products]);
  var columns = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [{
      name: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
        style: PRODUCT_IMAGE_HEADER_STYLE,
        children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.title")
      }),
      sortField: "name",
      sortable: false,
      center: true,
      style: PRODUCT_IMAGE_COLUMN_CELL_STYLE,
      width: "132px",
      minWidth: "132px",
      maxWidth: "132px",
      grow: 0,
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductImageCell, {
          imageUrl: row.imageUrl,
          imageUrls: row.imageUrls,
          productName: row.name,
          onPreviewImage: onPreviewImage
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("supplier.table.name.column.title"),
      sortField: "name",
      sortable: true,
      style: PRODUCT_NAME_COLUMN_CELL_STYLE,
      grow: 1.4,
      minWidth: "220px",
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductNameCell, {
          name: row.name
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.code.label"),
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductCodeCell, {
          code: row.code,
          label: codeLabel
        });
      },
      sortField: "code",
      sortable: true
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.brand.label"),
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductBrandCell, {
          brandName: row.brand_name,
          label: brandLabel
        });
      },
      sortField: "brand_name",
      sortable: false
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.table.price.column.label"),
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductPriceCell, {
          price: row.product_price
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.product-unit.label"),
      sortField: "product_unit",
      sortable: true,
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductUnitCell, {
          unitName: row.product_unit
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.product-in-stock.label"),
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductStockCell, {
          stock: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.formatQuantity)(row.in_stock, 0),
          label: stockLabel
        });
      },
      sortField: "in_stock",
      sortable: false
    }, {
      name: "Descripcion",
      selector: function selector(row) {
        return row.description ? row.description : "";
      },
      sortField: "description",
      sortable: false,
      minWidth: "200px",
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductDescriptionCell, {
          rowId: row.id,
          description: row.description
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("globally.react-table.column.created-date.label"),
      selector: function selector(row) {
        return row.date;
      },
      sortField: "created_at",
      sortable: true,
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)("span", {
          className: "badge bg-light-info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
            className: "mb-1",
            children: row.time
          }), row.date]
        });
      }
    }, {
      name: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("react-data-table.action.column.label"),
      right: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "120px",
      cell: function cell(row) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(ProductActionCell, {
          row: row,
          onView: goToProductDetailPage,
          onEdit: goToEditProduct,
          onDelete: onClickDeleteModel,
          viewLabel: viewActionLabel,
          editLabel: editActionLabel,
          deleteLabel: deleteActionLabel,
          canUpdateProduct: canUpdateProduct,
          canDeleteProduct: canDeleteProduct
        });
      }
    }];
  }, [brandLabel, canDeleteProduct, canUpdateProduct, codeLabel, deleteActionLabel, editActionLabel, goToEditProduct, goToProductDetailPage, onClickDeleteModel, onPreviewImage, stockLabel, viewActionLabel]);
  var productTableStyles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return {
      rows: {
        style: {
          minHeight: "74px",
          height: "74px",
          maxHeight: "74px"
        }
      },
      cells: {
        style: {
          alignItems: "center",
          "&:first-of-type": {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
            justifyContent: "center"
          }
        }
      },
      headCells: {
        style: {
          "&:first-of-type": {
            paddingLeft: "0 !important",
            justifyContent: "center"
          }
        }
      }
    };
  }, []);
  var productRenderProfiler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_shared_performance_posPerformance__WEBPACK_IMPORTED_MODULE_17__.createRenderProfiler)("components/product/Product", 24);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_14__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_shared_tab_title_TabTitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.placeholderText)("products.title")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Profiler, {
      id: "ProductTable",
      onRender: productRenderProfiler,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)("div", {
        className: "product-listing-table",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_shared_table_ReactDataTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
          columns: columns,
          items: itemsValue,
          onChange: onChange,
          isLoading: isLoading,
          customStyles: productTableStyles,
          defaultLimit: 10,
          paginationRowsPerPageOptions: [10, 20, 50, 100],
          ButtonValue: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.create.title"),
          totalRows: totalRecord,
          to: "#/app/products/create",
          isShowFilterField: true,
          isModernFilterModal: true,
          isUnitFilter: true,
          title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.product-unit.label"),
          goToImport: handleClose,
          isExportDropdown: true,
          isImportDropdown: true,
          onExcelClick: onExcelClick,
          isProductCategoryFilter: true,
          isBrandFilter: true,
          brandFilterTitle: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.brand.label"),
          productCategoryFilterTitle: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_12__.getFormattedMessage)("product.input.product-category.label")
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_DeleteMainProduct__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onClickDeleteModel: onClickDeleteModel,
      deleteModel: deleteModel,
      onDelete: isDelete
    }), isOpen && lightBoxImage.length !== 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_ProductImageLightBox__WEBPACK_IMPORTED_MODULE_10__["default"], {
      setIsOpen: setIsOpen,
      isOpen: isOpen,
      lightBoxImage: lightBoxImage
    }), importProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_19__.jsx)(_ImportProductModel__WEBPACK_IMPORTED_MODULE_15__["default"], {
      handleClose: handleClose,
      show: importProduct
    })]
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var products = state.products,
      totalRecord = state.totalRecord,
      isLoading = state.isLoading,
      frontSetting = state.frontSetting,
      productUnitId = state.productUnitId,
      allConfigData = state.allConfigData;
  return {
    products: products,
    totalRecord: totalRecord,
    isLoading: isLoading,
    frontSetting: frontSetting,
    productUnitId: productUnitId,
    allConfigData: allConfigData
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps, {
  fetchAllMainProducts: _store_action_productAction__WEBPACK_IMPORTED_MODULE_6__.fetchAllMainProducts,
  productExcelAction: _store_action_productExcelAction__WEBPACK_IMPORTED_MODULE_16__.productExcelAction
})(Product));

/***/ }),

/***/ "./resources/pos/src/components/product/ProductImageLightBox.js":
/*!**********************************************************************!*\
  !*** ./resources/pos/src/components/product/ProductImageLightBox.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_image_lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-image-lightbox */ "./node_modules/react-image-lightbox/dist/index.es.js");
/* harmony import */ var react_image_lightbox_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-image-lightbox/style.css */ "./node_modules/react-image-lightbox/style.css");
/* harmony import */ var _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/images/brand_logo.png */ "./resources/pos/src/assets/images/brand_logo.png");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }







var URL_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:\/\//i;
var PLACEHOLDER_IMAGE_HINTS = ["no-image", "no_image", "placeholder"];
var IMAGE_PATH_PREFIXES = ["//", "/", "data:", "blob:"];
var IMAGE_OBJECT_KEYS = ["url", "src", "path", "image_url", "imageUrl", "image", "original", "original_url", "full_url"];
var LIGHTBOX_COUNTER_STYLE = {
  fontSize: "13px",
  lineHeight: 1,
  fontWeight: 600,
  letterSpacing: "0.03em",
  color: "#ffffff",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(12, 20, 34, 0.72)",
  backdropFilter: "blur(4px)"
};
var LIGHTBOX_ANIMATION_DURATION = 220;

var safeEncodeUrl = function safeEncodeUrl(value) {
  if (!value) {
    return "";
  }

  if (value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  try {
    return encodeURI(decodeURI(value));
  } catch (error) {
    return encodeURI(value);
  }
};

var getAbsoluteUrl = function getAbsoluteUrl(value) {
  var normalizedValue = (value || "").trim();

  if (!normalizedValue) {
    return "";
  }

  if (normalizedValue.startsWith("data:") || normalizedValue.startsWith("blob:")) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith("//")) {
    if (typeof window === "undefined") {
      return "https:".concat(normalizedValue);
    }

    return "".concat(window.location.protocol).concat(normalizedValue);
  }

  if (URL_PROTOCOL_REGEX.test(normalizedValue)) {
    return normalizedValue;
  }

  var safePath = normalizedValue.replace(/\\/g, "/");

  if (typeof window === "undefined") {
    return safePath;
  }

  var pathWithSlash = safePath.startsWith("/") ? safePath : "/".concat(safePath);

  try {
    return new URL(pathWithSlash, window.location.origin).toString();
  } catch (error) {
    return "".concat(window.location.origin).concat(pathWithSlash);
  }
};

var normalizeImageInput = function normalizeImageInput(value) {
  if (Array.isArray(value)) {
    return value.flatMap(normalizeImageInput);
  }

  if (value && _typeof(value) === "object") {
    var imageValues = IMAGE_OBJECT_KEYS.flatMap(function (key) {
      return normalizeImageInput(value[key]);
    });

    if (imageValues.length > 0) {
      return imageValues;
    }

    return Object.values(value).flatMap(normalizeImageInput);
  }

  if (typeof value !== "string") {
    return [];
  }

  var normalizedValue = value.trim().replace(/^['"]|['"]$/g, "");

  if (!normalizedValue) {
    return [];
  }

  if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]") || normalizedValue.startsWith("{") && normalizedValue.endsWith("}")) {
    try {
      return normalizeImageInput(JSON.parse(normalizedValue));
    } catch (error) {// Keep fallback behavior for raw string values.
    }
  }

  var isUrlLike = URL_PROTOCOL_REGEX.test(normalizedValue) || normalizedValue.startsWith("//") || normalizedValue.startsWith("/") || normalizedValue.startsWith("data:") || normalizedValue.startsWith("blob:");

  var isPathLikeValue = function isPathLikeValue(candidate) {
    var normalizedCandidate = String(candidate || "").trim().toLowerCase();

    if (!normalizedCandidate) {
      return false;
    }

    if (URL_PROTOCOL_REGEX.test(normalizedCandidate)) {
      return true;
    }

    return IMAGE_PATH_PREFIXES.some(function (prefix) {
      return normalizedCandidate.startsWith(prefix);
    });
  };

  var shouldSplitCommaValue = function () {
    if (isUrlLike || !normalizedValue.includes(",")) {
      return false;
    }

    var parts = normalizedValue.split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);

    if (parts.length <= 1) {
      return false;
    }

    return parts.every(isPathLikeValue);
  }();

  if (shouldSplitCommaValue) {
    return normalizedValue.split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  return [normalizedValue];
};

var buildSourceCandidates = function buildSourceCandidates(rawSource) {
  var normalizedSource = String(rawSource || "").trim().replace(/^['"]|['"]$/g, "");

  if (!normalizedSource) {
    return [_assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"]];
  }

  var sourceCandidates = [normalizedSource, normalizedSource.replace(/\\/g, "/"), getAbsoluteUrl(normalizedSource)].filter(Boolean);
  var uniqueCandidates = [];

  var addCandidate = function addCandidate(candidate) {
    var cleanedCandidate = String(candidate || "").trim();

    if (!cleanedCandidate) {
      return;
    }

    var encodedCandidate = safeEncodeUrl(cleanedCandidate);

    if (encodedCandidate && !uniqueCandidates.includes(encodedCandidate)) {
      uniqueCandidates.push(encodedCandidate);
    }
  };

  sourceCandidates.forEach(addCandidate);
  addCandidate(_assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return uniqueCandidates;
};

var isPlaceholderLikeImage = function isPlaceholderLikeImage(value) {
  var normalizedValue = String(value || "").toLowerCase();
  return PLACEHOLDER_IMAGE_HINTS.some(function (hint) {
    return normalizedValue.includes(hint);
  });
};

var ProductImageLightBox = function ProductImageLightBox(_ref) {
  var isOpen = _ref.isOpen,
      setIsOpen = _ref.setIsOpen,
      lightBoxImage = _ref.lightBoxImage;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      photoIndex = _useState2[0],
      setPhotoIndex = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      sourceIndexMap = _useState4[0],
      setSourceIndexMap = _useState4[1];

  var isMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var isClosingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    isMountedRef.current = true;
    return function () {
      isMountedRef.current = false;
      isClosingRef.current = true;
    };
  }, []);
  var imageSources = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var normalizedImages = normalizeImageInput(lightBoxImage);
    var allEntries = [];
    var seenEntries = new Set();
    normalizedImages.forEach(function (image) {
      var candidates = buildSourceCandidates(image);
      var signature = candidates[0];

      if (!signature || seenEntries.has(signature)) {
        return;
      }

      seenEntries.add(signature);
      allEntries.push(candidates);
    });

    if (allEntries.length <= 1) {
      return allEntries;
    }

    var nonPlaceholderEntries = allEntries.filter(function (entry) {
      return !isPlaceholderLikeImage(entry[0]);
    });
    return nonPlaceholderEntries.length > 0 ? nonPlaceholderEntries : allEntries;
  }, [lightBoxImage]);
  var totalImages = imageSources.length;
  var hasMultipleImages = totalImages > 1;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (isOpen) {
      isClosingRef.current = false;
      setPhotoIndex(0);
      setSourceIndexMap({});
    }
  }, [isOpen, totalImages]);
  var appElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (typeof document === "undefined") {
      return null;
    }

    return document.getElementById("root") || document.getElementById("app") || null;
  }, []);
  var reactModalProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (appElement) {
      return {
        appElement: appElement,
        ariaHideApp: true
      };
    }

    return {
      ariaHideApp: false
    };
  }, [appElement]);
  var getImageSourceByIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (index) {
    var sourceCandidates = imageSources[index] || [_assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"]];
    var currentSourceIndex = sourceIndexMap[index] || 0;
    var safeSourceIndex = Math.min(currentSourceIndex, sourceCandidates.length - 1);
    return sourceCandidates[safeSourceIndex] || _assets_images_brand_logo_png__WEBPACK_IMPORTED_MODULE_3__["default"];
  }, [imageSources, sourceIndexMap]);
  var onCloseRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    isClosingRef.current = true;

    if (isMountedRef.current) {
      setPhotoIndex(0);
      setSourceIndexMap({});
    }

    setIsOpen(false);
  }, [setIsOpen]);
  var onMovePrevRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!hasMultipleImages) {
      return;
    }

    setPhotoIndex(function (previousIndex) {
      return (previousIndex + totalImages - 1) % totalImages;
    });
  }, [hasMultipleImages, totalImages]);
  var onMoveNextRequest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!hasMultipleImages) {
      return;
    }

    setPhotoIndex(function (previousIndex) {
      return (previousIndex + 1) % totalImages;
    });
  }, [hasMultipleImages, totalImages]);
  var getIndexBySourceType = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (sourceType) {
    if (sourceType === "mainSrc") {
      return photoIndex;
    }

    if (!hasMultipleImages) {
      return null;
    }

    if (sourceType === "nextSrc") {
      return (photoIndex + 1) % totalImages;
    }

    if (sourceType === "prevSrc") {
      return (photoIndex + totalImages - 1) % totalImages;
    }

    return null;
  }, [hasMultipleImages, photoIndex, totalImages]);
  var onImageLoadError = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_failedImage, sourceType) {
    if (!isMountedRef.current || isClosingRef.current || !isOpen) {
      return;
    }

    var targetIndex = getIndexBySourceType(sourceType);

    if (targetIndex === null || targetIndex === undefined) {
      return;
    }

    setSourceIndexMap(function (previousMap) {
      if (!isMountedRef.current || isClosingRef.current || !isOpen) {
        return previousMap;
      }

      var sourceCandidates = imageSources[targetIndex] || [];
      var currentSourceIndex = previousMap[targetIndex] || 0;

      if (sourceCandidates.length === 0) {
        return previousMap;
      }

      if (currentSourceIndex >= sourceCandidates.length - 1) {
        return previousMap;
      }

      return _objectSpread(_objectSpread({}, previousMap), {}, _defineProperty({}, targetIndex, currentSourceIndex + 1));
    });
  }, [getIndexBySourceType, imageSources, isOpen]);

  if (!isOpen || totalImages === 0) {
    return null;
  }

  var mainImageSource = getImageSourceByIndex(photoIndex);
  var nextImageSource = hasMultipleImages ? getImageSourceByIndex((photoIndex + 1) % totalImages) : undefined;
  var previousImageSource = hasMultipleImages ? getImageSourceByIndex((photoIndex + totalImages - 1) % totalImages) : undefined;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_image_lightbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
    mainSrc: mainImageSource,
    nextSrc: nextImageSource,
    prevSrc: previousImageSource,
    onCloseRequest: onCloseRequest,
    onMovePrevRequest: onMovePrevRequest,
    onMoveNextRequest: onMoveNextRequest,
    imageTitle: totalImages > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
      style: LIGHTBOX_COUNTER_STYLE,
      children: [photoIndex + 1, " / ", totalImages]
    }) : null,
    reactModalProps: reactModalProps,
    enableKeyboardInput: true,
    onImageLoadError: onImageLoadError,
    animationDuration: LIGHTBOX_ANIMATION_DURATION
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductImageLightBox);

/***/ }),

/***/ "./resources/pos/src/store/action/productExcelAction.js":
/*!**************************************************************!*\
  !*** ./resources/pos/src/store/action/productExcelAction.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productExcelAction": () => (/* binding */ productExcelAction)
/* harmony export */ });
/* harmony import */ var _loadingAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadingAction */ "./resources/pos/src/store/action/loadingAction.js");
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _toastAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toastAction */ "./resources/pos/src/store/action/toastAction.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var productExcelAction = function productExcelAction(setIsWarehouseValue) {
  var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var id = arguments.length > 2 ? arguments[2] : undefined;
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dispatch) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (isLoading) {
                dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_0__.setLoading)(true));
              }

              _context.next = 3;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_1__["default"].get("products-export-excel" + "".concat(id ? "?id=" + id : "")).then(function (response) {
                window.open(response.data.data.product_excel_url, '_blank');
                setIsWarehouseValue(false);

                if (isLoading) {
                  dispatch((0,_loadingAction__WEBPACK_IMPORTED_MODULE_0__.setLoading)(false));
                }
              })["catch"](function (_ref2) {
                var response = _ref2.response;
                dispatch((0,_toastAction__WEBPACK_IMPORTED_MODULE_3__.addToast)({
                  text: response.data.message,
                  type: _constants__WEBPACK_IMPORTED_MODULE_2__.toastType.ERROR
                }));
              });

            case 3:
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

/***/ }),

/***/ "./node_modules/exenv/index.js":
/*!*************************************!*\
  !*** ./node_modules/exenv/index.js ***!
  \*************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return ExecutionEnvironment;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}());


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/react-image-lightbox/style.css":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/react-image-lightbox/style.css ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@-webkit-keyframes closeWindow {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes closeWindow {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.ril__outer {\n  background-color: rgba(0, 0, 0, 0.85);\n  outline: none;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  -ms-content-zooming: none;\n  -ms-user-select: none;\n  -ms-touch-select: none;\n  -ms-touch-action: none;\n      touch-action: none;\n}\n\n.ril__outerClosing {\n  opacity: 0;\n}\n\n.ril__inner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.ril__image,\n.ril__imagePrev,\n.ril__imageNext {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  max-width: none;\n  -ms-content-zooming: none;\n  -ms-user-select: none;\n  -ms-touch-select: none;\n  -ms-touch-action: none;\n      touch-action: none;\n}\n\n.ril__imageDiscourager {\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n}\n\n.ril__navButtons {\n  border: none;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 20px;\n  height: 34px;\n  padding: 40px 30px;\n  margin: auto;\n  cursor: pointer;\n  opacity: 0.7;\n}\n.ril__navButtons:hover {\n  opacity: 1;\n}\n.ril__navButtons:active {\n  opacity: 0.7;\n}\n\n.ril__navButtonPrev {\n  left: 0;\n  background: rgba(0, 0, 0, 0.2)\n    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==')\n    no-repeat center;\n}\n\n.ril__navButtonNext {\n  right: 0;\n  background: rgba(0, 0, 0, 0.2)\n    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+')\n    no-repeat center;\n}\n\n.ril__downloadBlocker {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');\n  background-size: cover;\n}\n\n.ril__caption,\n.ril__toolbar {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  left: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.ril__caption {\n  bottom: 0;\n  max-height: 150px;\n  overflow: auto;\n}\n\n.ril__captionContent {\n  padding: 10px 20px;\n  color: #fff;\n}\n\n.ril__toolbar {\n  top: 0;\n  height: 50px;\n}\n\n.ril__toolbarSide {\n  height: 50px;\n  margin: 0;\n}\n\n.ril__toolbarLeftSide {\n  padding-left: 20px;\n  padding-right: 0;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.ril__toolbarRightSide {\n  padding-left: 0;\n  padding-right: 20px;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n\n.ril__toolbarItem {\n  display: inline-block;\n  line-height: 50px;\n  padding: 0;\n  color: #fff;\n  font-size: 120%;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ril__toolbarItemChild {\n  vertical-align: middle;\n}\n\n.ril__builtinButton {\n  width: 40px;\n  height: 35px;\n  cursor: pointer;\n  border: none;\n  opacity: 0.7;\n}\n.ril__builtinButton:hover {\n  opacity: 1;\n}\n.ril__builtinButton:active {\n  outline: none;\n}\n\n.ril__builtinButtonDisabled {\n  cursor: default;\n  opacity: 0.5;\n}\n.ril__builtinButtonDisabled:hover {\n  opacity: 0.5;\n}\n\n.ril__closeButton {\n  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=')\n    no-repeat center;\n}\n\n.ril__zoomInButton {\n  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PHBhdGggZD0iTTEyIDV2NiIvPjwvZz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')\n    no-repeat center;\n}\n\n.ril__zoomOutButton {\n  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9nPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')\n    no-repeat center;\n}\n\n.ril__outerAnimating {\n  -webkit-animation-name: closeWindow;\n          animation-name: closeWindow;\n}\n\n@-webkit-keyframes pointFade {\n  0%,\n  19.999%,\n  100% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 1;\n  }\n}\n\n@keyframes pointFade {\n  0%,\n  19.999%,\n  100% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 1;\n  }\n}\n\n.ril__loadingCircle {\n  width: 60px;\n  height: 60px;\n  position: relative;\n}\n\n.ril__loadingCirclePoint {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.ril__loadingCirclePoint::before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 11%;\n  height: 30%;\n  background-color: #fff;\n  border-radius: 30%;\n  -webkit-animation: pointFade 800ms infinite ease-in-out both;\n          animation: pointFade 800ms infinite ease-in-out both;\n}\n.ril__loadingCirclePoint:nth-of-type(1) {\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n.ril__loadingCirclePoint:nth-of-type(7) {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.ril__loadingCirclePoint:nth-of-type(1)::before,\n.ril__loadingCirclePoint:nth-of-type(7)::before {\n  -webkit-animation-delay: -800ms;\n          animation-delay: -800ms;\n}\n.ril__loadingCirclePoint:nth-of-type(2) {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.ril__loadingCirclePoint:nth-of-type(8) {\n  -webkit-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.ril__loadingCirclePoint:nth-of-type(2)::before,\n.ril__loadingCirclePoint:nth-of-type(8)::before {\n  -webkit-animation-delay: -666ms;\n          animation-delay: -666ms;\n}\n.ril__loadingCirclePoint:nth-of-type(3) {\n  -webkit-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.ril__loadingCirclePoint:nth-of-type(9) {\n  -webkit-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.ril__loadingCirclePoint:nth-of-type(3)::before,\n.ril__loadingCirclePoint:nth-of-type(9)::before {\n  -webkit-animation-delay: -533ms;\n          animation-delay: -533ms;\n}\n.ril__loadingCirclePoint:nth-of-type(4) {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.ril__loadingCirclePoint:nth-of-type(10) {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.ril__loadingCirclePoint:nth-of-type(4)::before,\n.ril__loadingCirclePoint:nth-of-type(10)::before {\n  -webkit-animation-delay: -400ms;\n          animation-delay: -400ms;\n}\n.ril__loadingCirclePoint:nth-of-type(5) {\n  -webkit-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.ril__loadingCirclePoint:nth-of-type(11) {\n  -webkit-transform: rotate(300deg);\n          transform: rotate(300deg);\n}\n.ril__loadingCirclePoint:nth-of-type(5)::before,\n.ril__loadingCirclePoint:nth-of-type(11)::before {\n  -webkit-animation-delay: -266ms;\n          animation-delay: -266ms;\n}\n.ril__loadingCirclePoint:nth-of-type(6) {\n  -webkit-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.ril__loadingCirclePoint:nth-of-type(12) {\n  -webkit-transform: rotate(330deg);\n          transform: rotate(330deg);\n}\n.ril__loadingCirclePoint:nth-of-type(6)::before,\n.ril__loadingCirclePoint:nth-of-type(12)::before {\n  -webkit-animation-delay: -133ms;\n          animation-delay: -133ms;\n}\n.ril__loadingCirclePoint:nth-of-type(7) {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.ril__loadingCirclePoint:nth-of-type(13) {\n  -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n}\n.ril__loadingCirclePoint:nth-of-type(7)::before,\n.ril__loadingCirclePoint:nth-of-type(13)::before {\n  -webkit-animation-delay: 0ms;\n          animation-delay: 0ms;\n}\n\n.ril__loadingContainer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.ril__imagePrev .ril__loadingContainer,\n.ril__imageNext .ril__loadingContainer {\n  display: none;\n}\n\n.ril__errorContainer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  color: #fff;\n}\n.ril__imagePrev .ril__errorContainer,\n.ril__imageNext .ril__errorContainer {\n  display: none;\n}\n\n.ril__loadingContainer__icon {\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-image-lightbox/style.css":
/*!*****************************************************!*\
  !*** ./node_modules/react-image-lightbox/style.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _laravel_mix_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../laravel-mix/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!../postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./style.css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/react-image-lightbox/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_laravel_mix_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_laravel_mix_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/react-image-lightbox/dist/index.es.js":
/*!************************************************************!*\
  !*** ./node_modules/react-image-lightbox/dist/index.es.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_1__);




function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Placeholder for future translate functionality
 */
function translate(str) {
  var replaceStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!str) {
    return '';
  }

  var translated = str;

  if (replaceStrings) {
    Object.keys(replaceStrings).forEach(function (placeholder) {
      translated = translated.replace(placeholder, replaceStrings[placeholder]);
    });
  }

  return translated;
}
function getWindowWidth() {
  return typeof __webpack_require__.g.window !== 'undefined' ? __webpack_require__.g.window.innerWidth : 0;
}
function getWindowHeight() {
  return typeof __webpack_require__.g.window !== 'undefined' ? __webpack_require__.g.window.innerHeight : 0;
}

var isCrossOriginFrame = function isCrossOriginFrame() {
  try {
    return __webpack_require__.g.window.location.hostname !== __webpack_require__.g.window.parent.location.hostname;
  } catch (e) {
    return true;
  }
}; // Get the highest window context that isn't cross-origin
// (When in an iframe)


function getHighestSafeWindowContext() {
  var self = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __webpack_require__.g.window.self;

  // If we reached the top level, return self
  if (self === __webpack_require__.g.window.top) {
    return self;
  } // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953


  if (!isCrossOriginFrame()) {
    return getHighestSafeWindowContext(self.parent);
  } // If a different origin, we consider the current level
  // as the top reachable one


  return self;
}

// Min image zoom level
var MIN_ZOOM_LEVEL = 0; // Max image zoom level

var MAX_ZOOM_LEVEL = 300; // Size ratio between previous and next zoom levels

var ZOOM_RATIO = 1.007; // How much to increase/decrease the zoom level when the zoom buttons are clicked

var ZOOM_BUTTON_INCREMENT_SIZE = 100; // Used to judge the amount of horizontal scroll needed to initiate a image move

var WHEEL_MOVE_X_THRESHOLD = 200; // Used to judge the amount of vertical scroll needed to initiate a zoom action

var WHEEL_MOVE_Y_THRESHOLD = 1;
var KEYS = {
  ESC: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
}; // Actions

var ACTION_NONE = 0;
var ACTION_MOVE = 1;
var ACTION_SWIPE = 2;
var ACTION_PINCH = 3;

var SOURCE_ANY = 0;
var SOURCE_MOUSE = 1;
var SOURCE_TOUCH = 2;
var SOURCE_POINTER = 3; // Minimal swipe distance

var MIN_SWIPE_DISTANCE = 200;

var ReactImageLightbox = /*#__PURE__*/function (_Component) {
  _inherits(ReactImageLightbox, _Component);

  var _super = _createSuper(ReactImageLightbox);

  function ReactImageLightbox(props) {
    var _this;

    _classCallCheck(this, ReactImageLightbox);

    _this = _super.call(this, props);
    _this.state = {
      //-----------------------------
      // Animation
      //-----------------------------
      // Lightbox is closing
      // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
      isClosing: !props.animationDisabled,
      // Component parts should animate (e.g., when images are moving, or image is being zoomed)
      shouldAnimate: false,
      //-----------------------------
      // Zoom settings
      //-----------------------------
      // Zoom level of image
      zoomLevel: MIN_ZOOM_LEVEL,
      //-----------------------------
      // Image position settings
      //-----------------------------
      // Horizontal offset from center
      offsetX: 0,
      // Vertical offset from center
      offsetY: 0,
      // image load error for srcType
      loadErrorStatus: {}
    }; // Refs

    _this.outerEl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    _this.zoomInBtn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    _this.zoomOutBtn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    _this.caption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();
    _this.closeIfClickInner = _this.closeIfClickInner.bind(_assertThisInitialized(_this));
    _this.handleImageDoubleClick = _this.handleImageDoubleClick.bind(_assertThisInitialized(_this));
    _this.handleImageMouseWheel = _this.handleImageMouseWheel.bind(_assertThisInitialized(_this));
    _this.handleKeyInput = _this.handleKeyInput.bind(_assertThisInitialized(_this));
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_this));
    _this.handleOuterMousewheel = _this.handleOuterMousewheel.bind(_assertThisInitialized(_this));
    _this.handleTouchStart = _this.handleTouchStart.bind(_assertThisInitialized(_this));
    _this.handleTouchMove = _this.handleTouchMove.bind(_assertThisInitialized(_this));
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_assertThisInitialized(_this));
    _this.handlePointerEvent = _this.handlePointerEvent.bind(_assertThisInitialized(_this));
    _this.handleCaptionMousewheel = _this.handleCaptionMousewheel.bind(_assertThisInitialized(_this));
    _this.handleWindowResize = _this.handleWindowResize.bind(_assertThisInitialized(_this));
    _this.handleZoomInButtonClick = _this.handleZoomInButtonClick.bind(_assertThisInitialized(_this));
    _this.handleZoomOutButtonClick = _this.handleZoomOutButtonClick.bind(_assertThisInitialized(_this));
    _this.requestClose = _this.requestClose.bind(_assertThisInitialized(_this));
    _this.requestMoveNext = _this.requestMoveNext.bind(_assertThisInitialized(_this));
    _this.requestMovePrev = _this.requestMovePrev.bind(_assertThisInitialized(_this)); // Timeouts - always clear it before umount

    _this.timeouts = []; // Current action

    _this.currentAction = ACTION_NONE; // Events source

    _this.eventsSource = SOURCE_ANY; // Empty pointers list

    _this.pointerList = []; // Prevent inner close

    _this.preventInnerClose = false;
    _this.preventInnerCloseTimeout = null; // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc

    _this.keyPressed = false; // Used to store load state / dimensions of images

    _this.imageCache = {}; // Time the last keydown event was called (used in keyboard action rate limiting)

    _this.lastKeyDownTime = 0; // Used for debouncing window resize event

    _this.resizeTimeout = null; // Used to determine when actions are triggered by the scroll wheel

    _this.wheelActionTimeout = null;
    _this.resetScrollTimeout = null;
    _this.scrollX = 0;
    _this.scrollY = 0; // Used in panning zoomed images

    _this.moveStartX = 0;
    _this.moveStartY = 0;
    _this.moveStartOffsetX = 0;
    _this.moveStartOffsetY = 0; // Used to swipe

    _this.swipeStartX = 0;
    _this.swipeStartY = 0;
    _this.swipeEndX = 0;
    _this.swipeEndY = 0; // Used to pinch

    _this.pinchTouchList = null;
    _this.pinchDistance = 0; // Used to differentiate between images with identical src

    _this.keyCounter = 0; // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)

    _this.moveRequested = false;
    return _this;
  }

  _createClass(ReactImageLightbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.animationDisabled) {
        // Make opening animation play
        this.setState({
          isClosing: false
        });
      } // Prevents cross-origin errors when using a cross-origin iframe


      this.windowContext = getHighestSafeWindowContext();
      this.listeners = {
        resize: this.handleWindowResize,
        mouseup: this.handleMouseUp,
        touchend: this.handleTouchEnd,
        touchcancel: this.handleTouchEnd,
        pointerdown: this.handlePointerEvent,
        pointermove: this.handlePointerEvent,
        pointerup: this.handlePointerEvent,
        pointercancel: this.handlePointerEvent
      };
      Object.keys(this.listeners).forEach(function (type) {
        _this2.windowContext.addEventListener(type, _this2.listeners[type]);
      });
      this.loadAllImages();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this3 = this;

      this.getSrcTypes().forEach(function (srcType) {
        if (_this3.props[srcType.name] !== nextProps[srcType.name]) {
          _this3.moveRequested = false;
        }
      }); // Wait for move...

      return !this.moveRequested;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this4 = this;

      var sourcesChanged = false;
      var prevSrcDict = {};
      var nextSrcDict = {};
      this.getSrcTypes().forEach(function (srcType) {
        if (prevProps[srcType.name] !== _this4.props[srcType.name]) {
          sourcesChanged = true;
          prevSrcDict[prevProps[srcType.name]] = true;
          nextSrcDict[_this4.props[srcType.name]] = true;
        }
      });

      if (sourcesChanged || this.moveRequested) {
        // Reset the loaded state for images not rendered next
        Object.keys(prevSrcDict).forEach(function (prevSrc) {
          if (!(prevSrc in nextSrcDict) && prevSrc in _this4.imageCache) {
            _this4.imageCache[prevSrc].loaded = false;
          }
        });
        this.moveRequested = false; // Load any new images

        this.loadAllImages(this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this5 = this;

      this.didUnmount = true;
      Object.keys(this.listeners).forEach(function (type) {
        _this5.windowContext.removeEventListener(type, _this5.listeners[type]);
      });
      this.timeouts.forEach(function (tid) {
        return clearTimeout(tid);
      });
    }
  }, {
    key: "setTimeout",
    value: function (_setTimeout) {
      function setTimeout(_x, _x2) {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function (func, time) {
      var _this6 = this;

      var id = setTimeout(function () {
        _this6.timeouts = _this6.timeouts.filter(function (tid) {
          return tid !== id;
        });
        func();
      }, time);
      this.timeouts.push(id);
      return id;
    })
  }, {
    key: "setPreventInnerClose",
    value: function setPreventInnerClose() {
      var _this7 = this;

      if (this.preventInnerCloseTimeout) {
        this.clearTimeout(this.preventInnerCloseTimeout);
      }

      this.preventInnerClose = true;
      this.preventInnerCloseTimeout = this.setTimeout(function () {
        _this7.preventInnerClose = false;
        _this7.preventInnerCloseTimeout = null;
      }, 100);
    } // Get info for the best suited image to display with the given srcType

  }, {
    key: "getBestImageForType",
    value: function getBestImageForType(srcType) {
      var imageSrc = this.props[srcType];
      var fitSizes = {};

      if (this.isImageLoaded(imageSrc)) {
        // Use full-size image if available
        fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height);
      } else if (this.isImageLoaded(this.props["".concat(srcType, "Thumbnail")])) {
        // Fall back to using thumbnail if the image has not been loaded
        imageSrc = this.props["".concat(srcType, "Thumbnail")];
        fitSizes = this.getFitSizes(this.imageCache[imageSrc].width, this.imageCache[imageSrc].height, true);
      } else {
        return null;
      }

      return {
        src: imageSrc,
        height: this.imageCache[imageSrc].height,
        width: this.imageCache[imageSrc].width,
        targetHeight: fitSizes.height,
        targetWidth: fitSizes.width
      };
    } // Get sizing for when an image is larger than the window

  }, {
    key: "getFitSizes",
    value: function getFitSizes(width, height, stretch) {
      var boxSize = this.getLightboxRect();
      var maxHeight = boxSize.height - this.props.imagePadding * 2;
      var maxWidth = boxSize.width - this.props.imagePadding * 2;

      if (!stretch) {
        maxHeight = Math.min(maxHeight, height);
        maxWidth = Math.min(maxWidth, width);
      }

      var maxRatio = maxWidth / maxHeight;
      var srcRatio = width / height;

      if (maxRatio > srcRatio) {
        // height is the constraining dimension of the photo
        return {
          width: width * maxHeight / height,
          height: maxHeight
        };
      }

      return {
        width: maxWidth,
        height: height * maxWidth / width
      };
    }
  }, {
    key: "getMaxOffsets",
    value: function getMaxOffsets() {
      var zoomLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.zoomLevel;
      var currentImageInfo = this.getBestImageForType('mainSrc');

      if (currentImageInfo === null) {
        return {
          maxX: 0,
          minX: 0,
          maxY: 0,
          minY: 0
        };
      }

      var boxSize = this.getLightboxRect();
      var zoomMultiplier = this.getZoomMultiplier(zoomLevel);
      var maxX = 0;

      if (zoomMultiplier * currentImageInfo.width - boxSize.width < 0) {
        // if there is still blank space in the X dimension, don't limit except to the opposite edge
        maxX = (boxSize.width - zoomMultiplier * currentImageInfo.width) / 2;
      } else {
        maxX = (zoomMultiplier * currentImageInfo.width - boxSize.width) / 2;
      }

      var maxY = 0;

      if (zoomMultiplier * currentImageInfo.height - boxSize.height < 0) {
        // if there is still blank space in the Y dimension, don't limit except to the opposite edge
        maxY = (boxSize.height - zoomMultiplier * currentImageInfo.height) / 2;
      } else {
        maxY = (zoomMultiplier * currentImageInfo.height - boxSize.height) / 2;
      }

      return {
        maxX: maxX,
        maxY: maxY,
        minX: -1 * maxX,
        minY: -1 * maxY
      };
    } // Get image src types

  }, {
    key: "getSrcTypes",
    value: function getSrcTypes() {
      return [{
        name: 'mainSrc',
        keyEnding: "i".concat(this.keyCounter)
      }, {
        name: 'mainSrcThumbnail',
        keyEnding: "t".concat(this.keyCounter)
      }, {
        name: 'nextSrc',
        keyEnding: "i".concat(this.keyCounter + 1)
      }, {
        name: 'nextSrcThumbnail',
        keyEnding: "t".concat(this.keyCounter + 1)
      }, {
        name: 'prevSrc',
        keyEnding: "i".concat(this.keyCounter - 1)
      }, {
        name: 'prevSrcThumbnail',
        keyEnding: "t".concat(this.keyCounter - 1)
      }];
    }
    /**
     * Get sizing when the image is scaled
     */

  }, {
    key: "getZoomMultiplier",
    value: function getZoomMultiplier() {
      var zoomLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.zoomLevel;
      return Math.pow(ZOOM_RATIO, zoomLevel);
    }
    /**
     * Get the size of the lightbox in pixels
     */

  }, {
    key: "getLightboxRect",
    value: function getLightboxRect() {
      if (this.outerEl.current) {
        return this.outerEl.current.getBoundingClientRect();
      }

      return {
        width: getWindowWidth(),
        height: getWindowHeight(),
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }
  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout(_x3) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (id) {
      this.timeouts = this.timeouts.filter(function (tid) {
        return tid !== id;
      });
      clearTimeout(id);
    } // Change zoom level
    )
  }, {
    key: "changeZoom",
    value: function changeZoom(zoomLevel, clientX, clientY) {
      // Ignore if zoom disabled
      if (!this.props.enableZoom) {
        return;
      } // Constrain zoom level to the set bounds


      var nextZoomLevel = Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, zoomLevel)); // Ignore requests that don't change the zoom level

      if (nextZoomLevel === this.state.zoomLevel) {
        return;
      }

      if (nextZoomLevel === MIN_ZOOM_LEVEL) {
        // Snap back to center if zoomed all the way out
        this.setState({
          zoomLevel: nextZoomLevel,
          offsetX: 0,
          offsetY: 0
        });
        return;
      }

      var imageBaseSize = this.getBestImageForType('mainSrc');

      if (imageBaseSize === null) {
        return;
      }

      var currentZoomMultiplier = this.getZoomMultiplier();
      var nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel); // Default to the center of the image to zoom when no mouse position specified

      var boxRect = this.getLightboxRect();
      var pointerX = typeof clientX !== 'undefined' ? clientX - boxRect.left : boxRect.width / 2;
      var pointerY = typeof clientY !== 'undefined' ? clientY - boxRect.top : boxRect.height / 2;
      var currentImageOffsetX = (boxRect.width - imageBaseSize.width * currentZoomMultiplier) / 2;
      var currentImageOffsetY = (boxRect.height - imageBaseSize.height * currentZoomMultiplier) / 2;
      var currentImageRealOffsetX = currentImageOffsetX - this.state.offsetX;
      var currentImageRealOffsetY = currentImageOffsetY - this.state.offsetY;
      var currentPointerXRelativeToImage = (pointerX - currentImageRealOffsetX) / currentZoomMultiplier;
      var currentPointerYRelativeToImage = (pointerY - currentImageRealOffsetY) / currentZoomMultiplier;
      var nextImageRealOffsetX = pointerX - currentPointerXRelativeToImage * nextZoomMultiplier;
      var nextImageRealOffsetY = pointerY - currentPointerYRelativeToImage * nextZoomMultiplier;
      var nextImageOffsetX = (boxRect.width - imageBaseSize.width * nextZoomMultiplier) / 2;
      var nextImageOffsetY = (boxRect.height - imageBaseSize.height * nextZoomMultiplier) / 2;
      var nextOffsetX = nextImageOffsetX - nextImageRealOffsetX;
      var nextOffsetY = nextImageOffsetY - nextImageRealOffsetY; // When zooming out, limit the offset so things don't get left askew

      if (this.currentAction !== ACTION_PINCH) {
        var maxOffsets = this.getMaxOffsets();

        if (this.state.zoomLevel > nextZoomLevel) {
          nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, nextOffsetX));
          nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, nextOffsetY));
        }
      }

      this.setState({
        zoomLevel: nextZoomLevel,
        offsetX: nextOffsetX,
        offsetY: nextOffsetY
      });
    }
  }, {
    key: "closeIfClickInner",
    value: function closeIfClickInner(event) {
      if (!this.preventInnerClose && event.target.className.search(/\bril-inner\b/) > -1) {
        this.requestClose(event);
      }
    }
    /**
     * Handle user keyboard actions
     */

  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(event) {
      event.stopPropagation(); // Ignore key input during animations

      if (this.isAnimating()) {
        return;
      } // Allow slightly faster navigation through the images when user presses keys repeatedly


      if (event.type === 'keyup') {
        this.lastKeyDownTime -= this.props.keyRepeatKeyupBonus;
        return;
      }

      var keyCode = event.which || event.keyCode; // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
      // But allow it if it's a lightbox closing action

      var currentTime = new Date();

      if (currentTime.getTime() - this.lastKeyDownTime < this.props.keyRepeatLimit && keyCode !== KEYS.ESC) {
        return;
      }

      this.lastKeyDownTime = currentTime.getTime();

      switch (keyCode) {
        // ESC key closes the lightbox
        case KEYS.ESC:
          event.preventDefault();
          this.requestClose(event);
          break;
        // Left arrow key moves to previous image

        case KEYS.LEFT_ARROW:
          if (!this.props.prevSrc) {
            return;
          }

          event.preventDefault();
          this.keyPressed = true;
          this.requestMovePrev(event);
          break;
        // Right arrow key moves to next image

        case KEYS.RIGHT_ARROW:
          if (!this.props.nextSrc) {
            return;
          }

          event.preventDefault();
          this.keyPressed = true;
          this.requestMoveNext(event);
          break;
      }
    }
    /**
     * Handle a mouse wheel event over the lightbox container
     */

  }, {
    key: "handleOuterMousewheel",
    value: function handleOuterMousewheel(event) {
      var _this8 = this;

      // Prevent scrolling of the background
      event.stopPropagation();
      var xThreshold = WHEEL_MOVE_X_THRESHOLD;
      var actionDelay = 0;
      var imageMoveDelay = 500;
      this.clearTimeout(this.resetScrollTimeout);
      this.resetScrollTimeout = this.setTimeout(function () {
        _this8.scrollX = 0;
        _this8.scrollY = 0;
      }, 300); // Prevent rapid-fire zoom behavior

      if (this.wheelActionTimeout !== null || this.isAnimating()) {
        return;
      }

      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        // handle horizontal scrolls with image moves
        this.scrollY = 0;
        this.scrollX += event.deltaX;
        var bigLeapX = xThreshold / 2; // If the scroll amount has accumulated sufficiently, or a large leap was taken

        if (this.scrollX >= xThreshold || event.deltaX >= bigLeapX) {
          // Scroll right moves to next
          this.requestMoveNext(event);
          actionDelay = imageMoveDelay;
          this.scrollX = 0;
        } else if (this.scrollX <= -1 * xThreshold || event.deltaX <= -1 * bigLeapX) {
          // Scroll left moves to previous
          this.requestMovePrev(event);
          actionDelay = imageMoveDelay;
          this.scrollX = 0;
        }
      } // Allow successive actions after the set delay


      if (actionDelay !== 0) {
        this.wheelActionTimeout = this.setTimeout(function () {
          _this8.wheelActionTimeout = null;
        }, actionDelay);
      }
    }
  }, {
    key: "handleImageMouseWheel",
    value: function handleImageMouseWheel(event) {
      var yThreshold = WHEEL_MOVE_Y_THRESHOLD;

      if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
        event.stopPropagation(); // If the vertical scroll amount was large enough, perform a zoom

        if (Math.abs(event.deltaY) < yThreshold) {
          return;
        }

        this.scrollX = 0;
        this.scrollY += event.deltaY;
        this.changeZoom(this.state.zoomLevel - event.deltaY, event.clientX, event.clientY);
      }
    }
    /**
     * Handle a double click on the current image
     */

  }, {
    key: "handleImageDoubleClick",
    value: function handleImageDoubleClick(event) {
      if (this.state.zoomLevel > MIN_ZOOM_LEVEL) {
        // A double click when zoomed in zooms all the way out
        this.changeZoom(MIN_ZOOM_LEVEL, event.clientX, event.clientY);
      } else {
        // A double click when zoomed all the way out zooms in
        this.changeZoom(this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE, event.clientX, event.clientY);
      }
    }
  }, {
    key: "shouldHandleEvent",
    value: function shouldHandleEvent(source) {
      if (this.eventsSource === source) {
        return true;
      }

      if (this.eventsSource === SOURCE_ANY) {
        this.eventsSource = source;
        return true;
      }

      switch (source) {
        case SOURCE_MOUSE:
          return false;

        case SOURCE_TOUCH:
          this.eventsSource = SOURCE_TOUCH;
          this.filterPointersBySource();
          return true;

        case SOURCE_POINTER:
          if (this.eventsSource === SOURCE_MOUSE) {
            this.eventsSource = SOURCE_POINTER;
            this.filterPointersBySource();
            return true;
          }

          return false;

        default:
          return false;
      }
    }
  }, {
    key: "addPointer",
    value: function addPointer(pointer) {
      this.pointerList.push(pointer);
    }
  }, {
    key: "removePointer",
    value: function removePointer(pointer) {
      this.pointerList = this.pointerList.filter(function (_ref) {
        var id = _ref.id;
        return id !== pointer.id;
      });
    }
  }, {
    key: "filterPointersBySource",
    value: function filterPointersBySource() {
      var _this9 = this;

      this.pointerList = this.pointerList.filter(function (_ref2) {
        var source = _ref2.source;
        return source === _this9.eventsSource;
      });
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (this.shouldHandleEvent(SOURCE_MOUSE) && ReactImageLightbox.isTargetMatchImage(event.target)) {
        this.addPointer(ReactImageLightbox.parseMouseEvent(event));
        this.multiPointerStart(event);
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.shouldHandleEvent(SOURCE_MOUSE)) {
        this.multiPointerMove(event, [ReactImageLightbox.parseMouseEvent(event)]);
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      if (this.shouldHandleEvent(SOURCE_MOUSE)) {
        this.removePointer(ReactImageLightbox.parseMouseEvent(event));
        this.multiPointerEnd(event);
      }
    }
  }, {
    key: "handlePointerEvent",
    value: function handlePointerEvent(event) {
      if (this.shouldHandleEvent(SOURCE_POINTER)) {
        switch (event.type) {
          case 'pointerdown':
            if (ReactImageLightbox.isTargetMatchImage(event.target)) {
              this.addPointer(ReactImageLightbox.parsePointerEvent(event));
              this.multiPointerStart(event);
            }

            break;

          case 'pointermove':
            this.multiPointerMove(event, [ReactImageLightbox.parsePointerEvent(event)]);
            break;

          case 'pointerup':
          case 'pointercancel':
            this.removePointer(ReactImageLightbox.parsePointerEvent(event));
            this.multiPointerEnd(event);
            break;
        }
      }
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(event) {
      var _this10 = this;

      if (this.shouldHandleEvent(SOURCE_TOUCH) && ReactImageLightbox.isTargetMatchImage(event.target)) {
        [].forEach.call(event.changedTouches, function (eventTouch) {
          return _this10.addPointer(ReactImageLightbox.parseTouchPointer(eventTouch));
        });
        this.multiPointerStart(event);
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(event) {
      if (this.shouldHandleEvent(SOURCE_TOUCH)) {
        this.multiPointerMove(event, [].map.call(event.changedTouches, function (eventTouch) {
          return ReactImageLightbox.parseTouchPointer(eventTouch);
        }));
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(event) {
      var _this11 = this;

      if (this.shouldHandleEvent(SOURCE_TOUCH)) {
        [].map.call(event.changedTouches, function (touch) {
          return _this11.removePointer(ReactImageLightbox.parseTouchPointer(touch));
        });
        this.multiPointerEnd(event);
      }
    }
  }, {
    key: "decideMoveOrSwipe",
    value: function decideMoveOrSwipe(pointer) {
      if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
        this.handleSwipeStart(pointer);
      } else {
        this.handleMoveStart(pointer);
      }
    }
  }, {
    key: "multiPointerStart",
    value: function multiPointerStart(event) {
      this.handleEnd(null);

      switch (this.pointerList.length) {
        case 1:
          {
            event.preventDefault();
            this.decideMoveOrSwipe(this.pointerList[0]);
            break;
          }

        case 2:
          {
            event.preventDefault();
            this.handlePinchStart(this.pointerList);
            break;
          }
      }
    }
  }, {
    key: "multiPointerMove",
    value: function multiPointerMove(event, pointerList) {
      switch (this.currentAction) {
        case ACTION_MOVE:
          {
            event.preventDefault();
            this.handleMove(pointerList[0]);
            break;
          }

        case ACTION_SWIPE:
          {
            event.preventDefault();
            this.handleSwipe(pointerList[0]);
            break;
          }

        case ACTION_PINCH:
          {
            event.preventDefault();
            this.handlePinch(pointerList);
            break;
          }
      }
    }
  }, {
    key: "multiPointerEnd",
    value: function multiPointerEnd(event) {
      if (this.currentAction !== ACTION_NONE) {
        this.setPreventInnerClose();
        this.handleEnd(event);
      }

      switch (this.pointerList.length) {
        case 0:
          {
            this.eventsSource = SOURCE_ANY;
            break;
          }

        case 1:
          {
            event.preventDefault();
            this.decideMoveOrSwipe(this.pointerList[0]);
            break;
          }

        case 2:
          {
            event.preventDefault();
            this.handlePinchStart(this.pointerList);
            break;
          }
      }
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(event) {
      switch (this.currentAction) {
        case ACTION_MOVE:
          this.handleMoveEnd(event);
          break;

        case ACTION_SWIPE:
          this.handleSwipeEnd(event);
          break;

        case ACTION_PINCH:
          this.handlePinchEnd(event);
          break;
      }
    } // Handle move start over the lightbox container
    // This happens:
    // - On a mouseDown event
    // - On a touchstart event

  }, {
    key: "handleMoveStart",
    value: function handleMoveStart(_ref3) {
      var clientX = _ref3.x,
          clientY = _ref3.y;

      if (!this.props.enableZoom) {
        return;
      }

      this.currentAction = ACTION_MOVE;
      this.moveStartX = clientX;
      this.moveStartY = clientY;
      this.moveStartOffsetX = this.state.offsetX;
      this.moveStartOffsetY = this.state.offsetY;
    } // Handle dragging over the lightbox container
    // This happens:
    // - After a mouseDown and before a mouseUp event
    // - After a touchstart and before a touchend event

  }, {
    key: "handleMove",
    value: function handleMove(_ref4) {
      var clientX = _ref4.x,
          clientY = _ref4.y;
      var newOffsetX = this.moveStartX - clientX + this.moveStartOffsetX;
      var newOffsetY = this.moveStartY - clientY + this.moveStartOffsetY;

      if (this.state.offsetX !== newOffsetX || this.state.offsetY !== newOffsetY) {
        this.setState({
          offsetX: newOffsetX,
          offsetY: newOffsetY
        });
      }
    }
  }, {
    key: "handleMoveEnd",
    value: function handleMoveEnd() {
      var _this12 = this;

      this.currentAction = ACTION_NONE;
      this.moveStartX = 0;
      this.moveStartY = 0;
      this.moveStartOffsetX = 0;
      this.moveStartOffsetY = 0; // Snap image back into frame if outside max offset range

      var maxOffsets = this.getMaxOffsets();
      var nextOffsetX = Math.max(maxOffsets.minX, Math.min(maxOffsets.maxX, this.state.offsetX));
      var nextOffsetY = Math.max(maxOffsets.minY, Math.min(maxOffsets.maxY, this.state.offsetY));

      if (nextOffsetX !== this.state.offsetX || nextOffsetY !== this.state.offsetY) {
        this.setState({
          offsetX: nextOffsetX,
          offsetY: nextOffsetY,
          shouldAnimate: true
        });
        this.setTimeout(function () {
          _this12.setState({
            shouldAnimate: false
          });
        }, this.props.animationDuration);
      }
    }
  }, {
    key: "handleSwipeStart",
    value: function handleSwipeStart(_ref5) {
      var clientX = _ref5.x,
          clientY = _ref5.y;
      this.currentAction = ACTION_SWIPE;
      this.swipeStartX = clientX;
      this.swipeStartY = clientY;
      this.swipeEndX = clientX;
      this.swipeEndY = clientY;
    }
  }, {
    key: "handleSwipe",
    value: function handleSwipe(_ref6) {
      var clientX = _ref6.x,
          clientY = _ref6.y;
      this.swipeEndX = clientX;
      this.swipeEndY = clientY;
    }
  }, {
    key: "handleSwipeEnd",
    value: function handleSwipeEnd(event) {
      var xDiff = this.swipeEndX - this.swipeStartX;
      var xDiffAbs = Math.abs(xDiff);
      var yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY);
      this.currentAction = ACTION_NONE;
      this.swipeStartX = 0;
      this.swipeStartY = 0;
      this.swipeEndX = 0;
      this.swipeEndY = 0;

      if (!event || this.isAnimating() || xDiffAbs < yDiffAbs * 1.5) {
        return;
      }

      if (xDiffAbs < MIN_SWIPE_DISTANCE) {
        var boxRect = this.getLightboxRect();

        if (xDiffAbs < boxRect.width / 4) {
          return;
        }
      }

      if (xDiff > 0 && this.props.prevSrc) {
        event.preventDefault();
        this.requestMovePrev();
      } else if (xDiff < 0 && this.props.nextSrc) {
        event.preventDefault();
        this.requestMoveNext();
      }
    }
  }, {
    key: "calculatePinchDistance",
    value: function calculatePinchDistance() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pinchTouchList,
          _ref8 = _slicedToArray(_ref7, 2),
          a = _ref8[0],
          b = _ref8[1];

      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
  }, {
    key: "calculatePinchCenter",
    value: function calculatePinchCenter() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pinchTouchList,
          _ref10 = _slicedToArray(_ref9, 2),
          a = _ref10[0],
          b = _ref10[1];

      return {
        x: a.x - (a.x - b.x) / 2,
        y: a.y - (a.y - b.y) / 2
      };
    }
  }, {
    key: "handlePinchStart",
    value: function handlePinchStart(pointerList) {
      if (!this.props.enableZoom) {
        return;
      }

      this.currentAction = ACTION_PINCH;
      this.pinchTouchList = pointerList.map(function (_ref11) {
        var id = _ref11.id,
            x = _ref11.x,
            y = _ref11.y;
        return {
          id: id,
          x: x,
          y: y
        };
      });
      this.pinchDistance = this.calculatePinchDistance();
    }
  }, {
    key: "handlePinch",
    value: function handlePinch(pointerList) {
      this.pinchTouchList = this.pinchTouchList.map(function (oldPointer) {
        for (var i = 0; i < pointerList.length; i += 1) {
          if (pointerList[i].id === oldPointer.id) {
            return pointerList[i];
          }
        }

        return oldPointer;
      });
      var newDistance = this.calculatePinchDistance();
      var zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance;
      this.pinchDistance = newDistance;

      var _this$calculatePinchC = this.calculatePinchCenter(this.pinchTouchList),
          clientX = _this$calculatePinchC.x,
          clientY = _this$calculatePinchC.y;

      this.changeZoom(zoomLevel, clientX, clientY);
    }
  }, {
    key: "handlePinchEnd",
    value: function handlePinchEnd() {
      this.currentAction = ACTION_NONE;
      this.pinchTouchList = null;
      this.pinchDistance = 0;
    } // Handle the window resize event

  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      this.clearTimeout(this.resizeTimeout);
      this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100);
    }
  }, {
    key: "handleZoomInButtonClick",
    value: function handleZoomInButtonClick() {
      var nextZoomLevel = this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE;
      this.changeZoom(nextZoomLevel);

      if (nextZoomLevel === MAX_ZOOM_LEVEL) {
        this.zoomOutBtn.current.focus();
      }
    }
  }, {
    key: "handleZoomOutButtonClick",
    value: function handleZoomOutButtonClick() {
      var nextZoomLevel = this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE;
      this.changeZoom(nextZoomLevel);

      if (nextZoomLevel === MIN_ZOOM_LEVEL) {
        this.zoomInBtn.current.focus();
      }
    }
  }, {
    key: "handleCaptionMousewheel",
    value: function handleCaptionMousewheel(event) {
      event.stopPropagation();

      if (!this.caption.current) {
        return;
      }

      var _this$caption$current = this.caption.current.getBoundingClientRect(),
          height = _this$caption$current.height;

      var _this$caption$current2 = this.caption.current,
          scrollHeight = _this$caption$current2.scrollHeight,
          scrollTop = _this$caption$current2.scrollTop;

      if (event.deltaY > 0 && height + scrollTop >= scrollHeight || event.deltaY < 0 && scrollTop <= 0) {
        event.preventDefault();
      }
    } // Detach key and mouse input events

  }, {
    key: "isAnimating",
    value: function isAnimating() {
      return this.state.shouldAnimate || this.state.isClosing;
    } // Check if image is loaded

  }, {
    key: "isImageLoaded",
    value: function isImageLoaded(imageSrc) {
      return imageSrc && imageSrc in this.imageCache && this.imageCache[imageSrc].loaded;
    } // Load image from src and call callback with image width and height on load

  }, {
    key: "loadImage",
    value: function loadImage(srcType, imageSrc, done) {
      var _this13 = this;

      // Return the image info if it is already cached
      if (this.isImageLoaded(imageSrc)) {
        this.setTimeout(function () {
          done();
        }, 1);
        return;
      }

      var inMemoryImage = new __webpack_require__.g.Image();

      if (this.props.imageCrossOrigin) {
        inMemoryImage.crossOrigin = this.props.imageCrossOrigin;
      }

      inMemoryImage.onerror = function (errorEvent) {
        _this13.props.onImageLoadError(imageSrc, srcType, errorEvent); // failed to load so set the state loadErrorStatus


        _this13.setState(function (prevState) {
          return {
            loadErrorStatus: _objectSpread2(_objectSpread2({}, prevState.loadErrorStatus), {}, _defineProperty({}, srcType, true))
          };
        });

        done(errorEvent);
      };

      inMemoryImage.onload = function () {
        _this13.props.onImageLoad(imageSrc, srcType, inMemoryImage);

        _this13.imageCache[imageSrc] = {
          loaded: true,
          width: inMemoryImage.width,
          height: inMemoryImage.height
        };
        done();
      };

      inMemoryImage.src = imageSrc;
    } // Load all images and their thumbnails

  }, {
    key: "loadAllImages",
    value: function loadAllImages() {
      var _this14 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var generateLoadDoneCallback = function generateLoadDoneCallback(srcType, imageSrc) {
        return function (err) {
          // Give up showing image on error
          if (err) {
            return;
          } // Don't rerender if the src is not the same as when the load started
          // or if the component has unmounted


          if (_this14.props[srcType] !== imageSrc || _this14.didUnmount) {
            return;
          } // Force rerender with the new image


          _this14.forceUpdate();
        };
      }; // Load the images


      this.getSrcTypes().forEach(function (srcType) {
        var type = srcType.name; // there is no error when we try to load it initially

        if (props[type] && _this14.state.loadErrorStatus[type]) {
          _this14.setState(function (prevState) {
            return {
              loadErrorStatus: _objectSpread2(_objectSpread2({}, prevState.loadErrorStatus), {}, _defineProperty({}, type, false))
            };
          });
        } // Load unloaded images


        if (props[type] && !_this14.isImageLoaded(props[type])) {
          _this14.loadImage(type, props[type], generateLoadDoneCallback(type, props[type]));
        }
      });
    } // Request that the lightbox be closed

  }, {
    key: "requestClose",
    value: function requestClose(event) {
      var _this15 = this;

      // Call the parent close request
      var closeLightbox = function closeLightbox() {
        return _this15.props.onCloseRequest(event);
      };

      if (this.props.animationDisabled || event.type === 'keydown' && !this.props.animationOnKeyInput) {
        // No animation
        closeLightbox();
        return;
      } // With animation
      // Start closing animation


      this.setState({
        isClosing: true
      }); // Perform the actual closing at the end of the animation

      this.setTimeout(closeLightbox, this.props.animationDuration);
    }
  }, {
    key: "requestMove",
    value: function requestMove(direction, event) {
      var _this16 = this;

      // Reset the zoom level on image move
      var nextState = {
        zoomLevel: MIN_ZOOM_LEVEL,
        offsetX: 0,
        offsetY: 0
      }; // Enable animated states

      if (!this.props.animationDisabled && (!this.keyPressed || this.props.animationOnKeyInput)) {
        nextState.shouldAnimate = true;
        this.setTimeout(function () {
          return _this16.setState({
            shouldAnimate: false
          });
        }, this.props.animationDuration);
      }

      this.keyPressed = false;
      this.moveRequested = true;

      if (direction === 'prev') {
        this.keyCounter -= 1;
        this.setState(nextState);
        this.props.onMovePrevRequest(event);
      } else {
        this.keyCounter += 1;
        this.setState(nextState);
        this.props.onMoveNextRequest(event);
      }
    } // Request to transition to the next image

  }, {
    key: "requestMoveNext",
    value: function requestMoveNext(event) {
      this.requestMove('next', event);
    } // Request to transition to the previous image

  }, {
    key: "requestMovePrev",
    value: function requestMovePrev(event) {
      this.requestMove('prev', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var _this$props = this.props,
          animationDisabled = _this$props.animationDisabled,
          animationDuration = _this$props.animationDuration,
          clickOutsideToClose = _this$props.clickOutsideToClose,
          discourageDownloads = _this$props.discourageDownloads,
          enableZoom = _this$props.enableZoom,
          imageTitle = _this$props.imageTitle,
          nextSrc = _this$props.nextSrc,
          prevSrc = _this$props.prevSrc,
          toolbarButtons = _this$props.toolbarButtons,
          reactModalStyle = _this$props.reactModalStyle,
          _onAfterOpen = _this$props.onAfterOpen,
          imageCrossOrigin = _this$props.imageCrossOrigin,
          reactModalProps = _this$props.reactModalProps,
          loader = _this$props.loader;
      var _this$state = this.state,
          zoomLevel = _this$state.zoomLevel,
          offsetX = _this$state.offsetX,
          offsetY = _this$state.offsetY,
          isClosing = _this$state.isClosing,
          loadErrorStatus = _this$state.loadErrorStatus;
      var boxSize = this.getLightboxRect();
      var transitionStyle = {}; // Transition settings for sliding animations

      if (!animationDisabled && this.isAnimating()) {
        transitionStyle = _objectSpread2(_objectSpread2({}, transitionStyle), {}, {
          transition: "transform ".concat(animationDuration, "ms")
        });
      } // Key endings to differentiate between images with the same src


      var keyEndings = {};
      this.getSrcTypes().forEach(function (_ref12) {
        var name = _ref12.name,
            keyEnding = _ref12.keyEnding;
        keyEndings[name] = keyEnding;
      }); // Images to be displayed

      var images = [];

      var addImage = function addImage(srcType, imageClass, transforms) {
        // Ignore types that have no source defined for their full size image
        if (!_this17.props[srcType]) {
          return;
        }

        var bestImageInfo = _this17.getBestImageForType(srcType);

        var imageStyle = _objectSpread2(_objectSpread2({}, transitionStyle), ReactImageLightbox.getTransform(_objectSpread2(_objectSpread2({}, transforms), bestImageInfo)));

        if (zoomLevel > MIN_ZOOM_LEVEL) {
          imageStyle.cursor = 'move';
        } // support IE 9 and 11


        var hasTrueValue = function hasTrueValue(object) {
          return Object.keys(object).some(function (key) {
            return object[key];
          });
        }; // when error on one of the loads then push custom error stuff


        if (bestImageInfo === null && hasTrueValue(loadErrorStatus)) {
          images.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "".concat(imageClass, " ril__image ril-errored"),
            style: imageStyle,
            key: _this17.props[srcType] + keyEndings[srcType]
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "ril__errorContainer"
          }, _this17.props.imageLoadErrorMessage)));
          return;
        }

        if (bestImageInfo === null) {
          var loadingIcon = loader !== undefined ? loader : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "ril-loading-circle ril__loadingCircle ril__loadingContainer__icon"
          }, _toConsumableArray(new Array(12)).map(function (_, index) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
              // eslint-disable-next-line react/no-array-index-key
              key: index,
              className: "ril-loading-circle-point ril__loadingCirclePoint"
            });
          })); // Fall back to loading icon if the thumbnail has not been loaded

          images.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "".concat(imageClass, " ril__image ril-not-loaded"),
            style: imageStyle,
            key: _this17.props[srcType] + keyEndings[srcType]
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "ril__loadingContainer"
          }, loadingIcon)));
          return;
        }

        var imageSrc = bestImageInfo.src;

        if (discourageDownloads) {
          imageStyle.backgroundImage = "url('".concat(imageSrc, "')");
          images.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "".concat(imageClass, " ril__image ril__imageDiscourager"),
            onDoubleClick: _this17.handleImageDoubleClick,
            onWheel: _this17.handleImageMouseWheel,
            style: imageStyle,
            key: imageSrc + keyEndings[srcType]
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
            className: "ril-download-blocker ril__downloadBlocker"
          })));
        } else {
          images.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", _extends({}, imageCrossOrigin ? {
            crossOrigin: imageCrossOrigin
          } : {}, {
            className: "".concat(imageClass, " ril__image"),
            onDoubleClick: _this17.handleImageDoubleClick,
            onWheel: _this17.handleImageMouseWheel,
            onDragStart: function onDragStart(e) {
              return e.preventDefault();
            },
            style: imageStyle,
            src: imageSrc,
            key: imageSrc + keyEndings[srcType],
            alt: typeof imageTitle === 'string' ? imageTitle : translate('Image'),
            draggable: false
          })));
        }
      };

      var zoomMultiplier = this.getZoomMultiplier(); // Next Image (displayed on the right)

      addImage('nextSrc', 'ril-image-next ril__imageNext', {
        x: boxSize.width
      }); // Main Image

      addImage('mainSrc', 'ril-image-current', {
        x: -1 * offsetX,
        y: -1 * offsetY,
        zoom: zoomMultiplier
      }); // Previous Image (displayed on the left)

      addImage('prevSrc', 'ril-image-prev ril__imagePrev', {
        x: -1 * boxSize.width
      });
      var modalStyle = {
        overlay: _objectSpread2({
          zIndex: 1000,
          backgroundColor: 'transparent'
        }, reactModalStyle.overlay),
        content: _objectSpread2({
          backgroundColor: 'transparent',
          overflow: 'hidden',
          // Needed, otherwise keyboard shortcuts scroll the page
          border: 'none',
          borderRadius: 0,
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }, reactModalStyle.content)
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_modal__WEBPACK_IMPORTED_MODULE_1___default()), _extends({
        isOpen: true,
        onRequestClose: clickOutsideToClose ? this.requestClose : undefined,
        onAfterOpen: function onAfterOpen() {
          // Focus on the div with key handlers
          if (_this17.outerEl.current) {
            _this17.outerEl.current.focus();
          }

          _onAfterOpen();
        },
        style: modalStyle,
        contentLabel: translate('Lightbox'),
        appElement: typeof __webpack_require__.g.window !== 'undefined' ? __webpack_require__.g.window.document.body : undefined
      }, reactModalProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        // eslint-disable-line jsx-a11y/no-static-element-interactions
        // Floating modal with closing animations
        className: "ril-outer ril__outer ril__outerAnimating ".concat(this.props.wrapperClassName, " ").concat(isClosing ? 'ril-closing ril__outerClosing' : ''),
        style: {
          transition: "opacity ".concat(animationDuration, "ms"),
          animationDuration: "".concat(animationDuration, "ms"),
          animationDirection: isClosing ? 'normal' : 'reverse'
        },
        ref: this.outerEl,
        onWheel: this.handleOuterMousewheel,
        onMouseMove: this.handleMouseMove,
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        tabIndex: "-1" // Enables key handlers on div
        ,
        onKeyDown: this.handleKeyInput,
        onKeyUp: this.handleKeyInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        // Image holder
        className: "ril-inner ril__inner",
        onClick: clickOutsideToClose ? this.closeIfClickInner : undefined
      }, images), prevSrc && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        // Move to previous image button
        type: "button",
        className: "ril-prev-button ril__navButtons ril__navButtonPrev",
        key: "prev",
        "aria-label": this.props.prevLabel,
        title: this.props.prevLabel,
        onClick: !this.isAnimating() ? this.requestMovePrev : undefined // Ignore clicks during animation

      }), nextSrc && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        // Move to next image button
        type: "button",
        className: "ril-next-button ril__navButtons ril__navButtonNext",
        key: "next",
        "aria-label": this.props.nextLabel,
        title: this.props.nextLabel,
        onClick: !this.isAnimating() ? this.requestMoveNext : undefined // Ignore clicks during animation

      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        // Lightbox toolbar
        className: "ril-toolbar ril__toolbar"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
        className: "ril-toolbar-left ril__toolbarSide ril__toolbarLeftSide"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "ril-toolbar__item ril__toolbarItem"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
        className: "ril-toolbar__item__child ril__toolbarItemChild"
      }, imageTitle))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
        className: "ril-toolbar-right ril__toolbarSide ril__toolbarRightSide"
      }, toolbarButtons && toolbarButtons.map(function (button, i) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
          key: "button_".concat(i + 1),
          className: "ril-toolbar__item ril__toolbarItem"
        }, button);
      }), enableZoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "ril-toolbar__item ril__toolbarItem"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        // Lightbox zoom in button
        type: "button",
        key: "zoom-in",
        "aria-label": this.props.zoomInLabel,
        title: this.props.zoomInLabel,
        className: ['ril-zoom-in', 'ril__toolbarItemChild', 'ril__builtinButton', 'ril__zoomInButton'].concat(_toConsumableArray(zoomLevel === MAX_ZOOM_LEVEL ? ['ril__builtinButtonDisabled'] : [])).join(' '),
        ref: this.zoomInBtn,
        disabled: this.isAnimating() || zoomLevel === MAX_ZOOM_LEVEL,
        onClick: !this.isAnimating() && zoomLevel !== MAX_ZOOM_LEVEL ? this.handleZoomInButtonClick : undefined
      })), enableZoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "ril-toolbar__item ril__toolbarItem"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        // Lightbox zoom out button
        type: "button",
        key: "zoom-out",
        "aria-label": this.props.zoomOutLabel,
        title: this.props.zoomOutLabel,
        className: ['ril-zoom-out', 'ril__toolbarItemChild', 'ril__builtinButton', 'ril__zoomOutButton'].concat(_toConsumableArray(zoomLevel === MIN_ZOOM_LEVEL ? ['ril__builtinButtonDisabled'] : [])).join(' '),
        ref: this.zoomOutBtn,
        disabled: this.isAnimating() || zoomLevel === MIN_ZOOM_LEVEL,
        onClick: !this.isAnimating() && zoomLevel !== MIN_ZOOM_LEVEL ? this.handleZoomOutButtonClick : undefined
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
        className: "ril-toolbar__item ril__toolbarItem"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        // Lightbox close button
        type: "button",
        key: "close",
        "aria-label": this.props.closeLabel,
        title: this.props.closeLabel,
        className: "ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton",
        onClick: !this.isAnimating() ? this.requestClose : undefined // Ignore clicks during animation

      })))), this.props.imageCaption &&
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        // Image caption
        onWheel: this.handleCaptionMousewheel,
        onMouseDown: function onMouseDown(event) {
          return event.stopPropagation();
        },
        className: "ril-caption ril__caption",
        ref: this.caption
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "ril-caption-content ril__captionContent"
      }, this.props.imageCaption))));
    }
  }], [{
    key: "isTargetMatchImage",
    value: function isTargetMatchImage(target) {
      return target && /ril-image-current/.test(target.className);
    }
  }, {
    key: "parseMouseEvent",
    value: function parseMouseEvent(mouseEvent) {
      return {
        id: 'mouse',
        source: SOURCE_MOUSE,
        x: parseInt(mouseEvent.clientX, 10),
        y: parseInt(mouseEvent.clientY, 10)
      };
    }
  }, {
    key: "parseTouchPointer",
    value: function parseTouchPointer(touchPointer) {
      return {
        id: touchPointer.identifier,
        source: SOURCE_TOUCH,
        x: parseInt(touchPointer.clientX, 10),
        y: parseInt(touchPointer.clientY, 10)
      };
    }
  }, {
    key: "parsePointerEvent",
    value: function parsePointerEvent(pointerEvent) {
      return {
        id: pointerEvent.pointerId,
        source: SOURCE_POINTER,
        x: parseInt(pointerEvent.clientX, 10),
        y: parseInt(pointerEvent.clientY, 10)
      };
    } // Request to transition to the previous image

  }, {
    key: "getTransform",
    value: function getTransform(_ref13) {
      var _ref13$x = _ref13.x,
          x = _ref13$x === void 0 ? 0 : _ref13$x,
          _ref13$y = _ref13.y,
          y = _ref13$y === void 0 ? 0 : _ref13$y,
          _ref13$zoom = _ref13.zoom,
          zoom = _ref13$zoom === void 0 ? 1 : _ref13$zoom,
          width = _ref13.width,
          targetWidth = _ref13.targetWidth;
      var nextX = x;
      var windowWidth = getWindowWidth();

      if (width > windowWidth) {
        nextX += (windowWidth - width) / 2;
      }

      var scaleFactor = zoom * (targetWidth / width);
      return {
        transform: "translate3d(".concat(nextX, "px,").concat(y, "px,0) scale3d(").concat(scaleFactor, ",").concat(scaleFactor, ",1)")
      };
    }
  }]);

  return ReactImageLightbox;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

ReactImageLightbox.propTypes = {
  //-----------------------------
  // Image sources
  //-----------------------------
  // Main display image url
  mainSrc: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
  // eslint-disable-line react/no-unused-prop-types
  // Previous display image url (displayed to the left)
  // If left undefined, movePrev actions will not be performed, and the button not displayed
  prevSrc: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  // Next display image url (displayed to the right)
  // If left undefined, moveNext actions will not be performed, and the button not displayed
  nextSrc: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  //-----------------------------
  // Image thumbnail sources
  //-----------------------------
  // Thumbnail image url corresponding to props.mainSrc
  mainSrcThumbnail: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  // eslint-disable-line react/no-unused-prop-types
  // Thumbnail image url corresponding to props.prevSrc
  prevSrcThumbnail: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  // eslint-disable-line react/no-unused-prop-types
  // Thumbnail image url corresponding to props.nextSrc
  nextSrcThumbnail: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  // eslint-disable-line react/no-unused-prop-types
  //-----------------------------
  // Event Handlers
  //-----------------------------
  // Close window event
  // Should change the parent state such that the lightbox is not rendered
  onCloseRequest: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired),
  // Move to previous image event
  // Should change the parent state such that props.prevSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.nextSrc, etc.
  onMovePrevRequest: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // Move to next image event
  // Should change the parent state such that props.nextSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.prevSrc, etc.
  onMoveNextRequest: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // Called when an image fails to load
  // (imageSrc: string, srcType: string, errorEvent: object): void
  onImageLoadError: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // Called when image successfully loads
  onImageLoad: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  // Open window event
  onAfterOpen: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  //-----------------------------
  // Download discouragement settings
  //-----------------------------
  // Enable download discouragement (prevents [right-click -> Save Image As...])
  discourageDownloads: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  //-----------------------------
  // Animation settings
  //-----------------------------
  // Disable all animation
  animationDisabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  // Disable animation on actions performed with keyboard shortcuts
  animationOnKeyInput: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  // Animation duration (ms)
  animationDuration: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  //-----------------------------
  // Keyboard shortcut settings
  //-----------------------------
  // Required interval of time (ms) between key actions
  // (prevents excessively fast navigation of images)
  keyRepeatLimit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  // Amount of time (ms) restored after each keyup
  // (makes rapid key presses slightly faster than holding down the key to navigate images)
  keyRepeatKeyupBonus: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  //-----------------------------
  // Image info
  //-----------------------------
  // Image title
  imageTitle: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  // Image caption
  imageCaption: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  // Optional crossOrigin attribute
  imageCrossOrigin: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  //-----------------------------
  // Lightbox style
  //-----------------------------
  // Set z-index style, etc., for the parent react-modal (format: https://github.com/reactjs/react-modal#styles )
  reactModalStyle: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({}),
  // Padding (px) between the edge of the window and the lightbox
  imagePadding: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  wrapperClassName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  //-----------------------------
  // Other
  //-----------------------------
  // Array of custom toolbar buttons
  toolbarButtons: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)),
  // When true, clicks outside of the image close the lightbox
  clickOutsideToClose: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  // Set to false to disable zoom functionality and hide zoom buttons
  enableZoom: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
  // Override props set on react-modal (https://github.com/reactjs/react-modal)
  reactModalProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({}),
  // Aria-labels
  nextLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  prevLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  zoomInLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  zoomOutLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  closeLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  imageLoadErrorMessage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  // custom loader
  loader: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
};
ReactImageLightbox.defaultProps = {
  imageTitle: null,
  imageCaption: null,
  toolbarButtons: null,
  reactModalProps: {},
  animationDisabled: false,
  animationDuration: 300,
  animationOnKeyInput: false,
  clickOutsideToClose: true,
  closeLabel: 'Close lightbox',
  discourageDownloads: false,
  enableZoom: true,
  imagePadding: 10,
  imageCrossOrigin: null,
  keyRepeatKeyupBonus: 40,
  keyRepeatLimit: 180,
  mainSrcThumbnail: null,
  nextLabel: 'Next image',
  nextSrc: null,
  nextSrcThumbnail: null,
  onAfterOpen: function onAfterOpen() {},
  onImageLoadError: function onImageLoadError() {},
  onImageLoad: function onImageLoad() {},
  onMoveNextRequest: function onMoveNextRequest() {},
  onMovePrevRequest: function onMovePrevRequest() {},
  prevLabel: 'Previous image',
  prevSrc: null,
  prevSrcThumbnail: null,
  reactModalStyle: {},
  wrapperClassName: '',
  zoomInLabel: 'Zoom in',
  zoomOutLabel: 'Zoom out',
  imageLoadErrorMessage: 'This image failed to load',
  loader: undefined
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactImageLightbox);


/***/ }),

/***/ "./node_modules/react-modal/lib/components/Modal.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/components/Modal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__(/*! ./ModalPortal */ "./node_modules/react-modal/lib/components/ModalPortal.js");

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__(/*! ../helpers/ariaAppHider */ "./node_modules/react-modal/lib/helpers/ariaAppHider.js");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__(/*! ../helpers/safeHTMLElement */ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

var _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ "./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = "ReactModalPortal";
var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

var isReact16 = _safeHTMLElement.canUseDOM && _reactDom2.default.createPortal !== undefined;

var createHTMLElement = function createHTMLElement(name) {
  return document.createElement(name);
};

var getCreatePortal = function getCreatePortal() {
  return isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;
};

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      if (parent && parent.contains(_this.node)) {
        parent.removeChild(_this.node);
      } else {
        // eslint-disable-next-line no-console
        console.warn('React-Modal: "parentSelector" prop did not returned any DOM ' + "element. Make sure that the parent element is unmounted to " + "avoid any memory leaks.");
      }
    }, _this.portalRef = function (ref) {
      _this.portal = ref;
    }, _this.renderPortal = function (props) {
      var createPortal = getCreatePortal();
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;

      if (!isReact16) {
        this.node = createHTMLElement("div");
      }
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      var prevParent = getParentElement(prevProps.parentSelector);
      var nextParent = getParentElement(this.props.parentSelector);
      return { prevParent: prevParent, nextParent: nextParent };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, _, snapshot) {
      if (!_safeHTMLElement.canUseDOM) return;
      var _props = this.props,
          isOpen = _props.isOpen,
          portalClassName = _props.portalClassName;


      if (prevProps.portalClassName !== portalClassName) {
        this.node.className = portalClassName;
      }

      var prevParent = snapshot.prevParent,
          nextParent = snapshot.nextParent;

      if (nextParent !== prevParent) {
        prevParent.removeChild(this.node);
        nextParent.appendChild(this.node);
      }

      // Stop unnecessary renders if modal is remaining closed
      if (!prevProps.isOpen && !isOpen) return;

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }

      if (!this.node && isReact16) {
        this.node = createHTMLElement("div");
      }

      var createPortal = getCreatePortal();
      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_safeHTMLElement2.default), _propTypes2.default.instanceOf(_safeHTMLElement.SafeHTMLCollection), _propTypes2.default.instanceOf(_safeHTMLElement.SafeNodeList), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_safeHTMLElement2.default))]),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  preventScroll: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func,
  id: _propTypes2.default.string,
  overlayElement: _propTypes2.default.func,
  contentElement: _propTypes2.default.func
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  role: "dialog",
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  preventScroll: false,
  parentSelector: function parentSelector() {
    return document.body;
  },
  overlayElement: function overlayElement(props, contentEl) {
    return _react2.default.createElement(
      "div",
      props,
      contentEl
    );
  },
  contentElement: function contentElement(props, children) {
    return _react2.default.createElement(
      "div",
      props,
      children
    );
  }
};
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};


(0, _reactLifecyclesCompat.polyfill)(Modal);

if (true) {
  Modal.setCreateHTMLElement = function (fn) {
    return createHTMLElement = fn;
  };
}

exports["default"] = Modal;

/***/ }),

/***/ "./node_modules/react-modal/lib/components/ModalPortal.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-modal/lib/components/ModalPortal.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = __webpack_require__(/*! ../helpers/focusManager */ "./node_modules/react-modal/lib/helpers/focusManager.js");

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__(/*! ../helpers/scopeTab */ "./node_modules/react-modal/lib/helpers/scopeTab.js");

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__(/*! ../helpers/ariaAppHider */ "./node_modules/react-modal/lib/helpers/ariaAppHider.js");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _classList = __webpack_require__(/*! ../helpers/classList */ "./node_modules/react-modal/lib/helpers/classList.js");

var classList = _interopRequireWildcard(_classList);

var _safeHTMLElement = __webpack_require__(/*! ../helpers/safeHTMLElement */ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

var _portalOpenInstances = __webpack_require__(/*! ../helpers/portalOpenInstances */ "./node_modules/react-modal/lib/helpers/portalOpenInstances.js");

var _portalOpenInstances2 = _interopRequireDefault(_portalOpenInstances);

__webpack_require__(/*! ../helpers/bodyTrap */ "./node_modules/react-modal/lib/helpers/bodyTrap.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ariaHiddenInstances = 0;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
      _this.props.overlayRef && _this.props.overlayRef(overlay);
    };

    _this.setContentRef = function (content) {
      _this.content = content;
      _this.props.contentRef && _this.props.contentRef(content);
    };

    _this.afterClose = function () {
      var _this$props = _this.props,
          appElement = _this$props.appElement,
          ariaHideApp = _this$props.ariaHideApp,
          htmlOpenClassName = _this$props.htmlOpenClassName,
          bodyOpenClassName = _this$props.bodyOpenClassName;

      // Remove classes.

      bodyOpenClassName && classList.remove(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.remove(document.getElementsByTagName("html")[0], htmlOpenClassName);

      // Reset aria-hidden attribute if all modals have been removed
      if (ariaHideApp && ariaHiddenInstances > 0) {
        ariaHiddenInstances -= 1;

        if (ariaHiddenInstances === 0) {
          ariaAppHider.show(appElement);
        }
      }

      if (_this.props.shouldFocusAfterRender) {
        if (_this.props.shouldReturnFocusAfterClose) {
          focusManager.returnFocus(_this.props.preventScroll);
          focusManager.teardownScopedFocus();
        } else {
          focusManager.popWithoutFocus();
        }
      }

      if (_this.props.onAfterClose) {
        _this.props.onAfterClose();
      }

      _portalOpenInstances2.default.deregister(_this);
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        if (_this.props.shouldFocusAfterRender) {
          focusManager.setupScopedFocus(_this.node);
          focusManager.markForFocusLater();
        }

        _this.setState({ isOpen: true }, function () {
          _this.openAnimationFrame = requestAnimationFrame(function () {
            _this.setState({ afterOpen: true });

            if (_this.props.isOpen && _this.props.onAfterOpen) {
              _this.props.onAfterOpen({
                overlayEl: _this.overlay,
                contentEl: _this.content
              });
            }
          });
        });
      }
    };

    _this.close = function () {
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus({ preventScroll: true });
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }

      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
        event.stopPropagation();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function (event) {
      if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
        event.preventDefault();
      }
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + "--after-open",
        beforeClose: CLASS_NAMES[which] + "--before-close"
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + " " + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + " " + classNames.beforeClose;
      }
      return typeof additional === "string" && additional ? className + " " + additional : className;
    };

    _this.attributesFromObject = function (prefix, items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc[prefix + "-" + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isOpen) {
        this.open();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (true) {
        if (prevProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
        if (prevProps.htmlOpenClassName !== this.props.htmlOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "htmlOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
      }

      if (this.props.isOpen && !prevProps.isOpen) {
        this.open();
      } else if (!this.props.isOpen && prevProps.isOpen) {
        this.close();
      }

      // Focus only needs to be set once when the modal is being opened
      if (this.props.shouldFocusAfterRender && this.state.isOpen && !prevState.isOpen) {
        this.focusContent();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.isOpen) {
        this.afterClose();
      }
      clearTimeout(this.closeTimer);
      cancelAnimationFrame(this.openAnimationFrame);
    }
  }, {
    key: "beforeOpen",
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          htmlOpenClassName = _props.htmlOpenClassName,
          bodyOpenClassName = _props.bodyOpenClassName;

      // Add classes.

      bodyOpenClassName && classList.add(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.add(document.getElementsByTagName("html")[0], htmlOpenClassName);

      if (ariaHideApp) {
        ariaHiddenInstances += 1;
        ariaAppHider.hide(appElement);
      }

      _portalOpenInstances2.default.register(this);
    }

    // Don't steal focus from inner elements

  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          id = _props2.id,
          className = _props2.className,
          overlayClassName = _props2.overlayClassName,
          defaultStyles = _props2.defaultStyles,
          children = _props2.children;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      if (this.shouldBeClosed()) {
        return null;
      }

      var overlayProps = {
        ref: this.setOverlayRef,
        className: this.buildClassName("overlay", overlayClassName),
        style: _extends({}, overlayStyles, this.props.style.overlay),
        onClick: this.handleOverlayOnClick,
        onMouseDown: this.handleOverlayOnMouseDown
      };

      var contentProps = _extends({
        id: id,
        ref: this.setContentRef,
        style: _extends({}, contentStyles, this.props.style.content),
        className: this.buildClassName("content", className),
        tabIndex: "-1",
        onKeyDown: this.handleKeyDown,
        onMouseDown: this.handleContentOnMouseDown,
        onMouseUp: this.handleContentOnMouseUp,
        onClick: this.handleContentOnClick,
        role: this.props.role,
        "aria-label": this.props.contentLabel
      }, this.attributesFromObject("aria", _extends({ modal: true }, this.props.aria)), this.attributesFromObject("data", this.props.data || {}), {
        "data-testid": this.props.testId
      });

      var contentElement = this.props.contentElement(contentProps, children);
      return this.props.overlayElement(overlayProps, contentElement);
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  },
  defaultStyles: {}
};
ModalPortal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  defaultStyles: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  ariaHideApp: _propTypes2.default.bool,
  appElement: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_safeHTMLElement2.default), _propTypes2.default.instanceOf(_safeHTMLElement.SafeHTMLCollection), _propTypes2.default.instanceOf(_safeHTMLElement.SafeNodeList), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_safeHTMLElement2.default))]),
  onAfterOpen: _propTypes2.default.func,
  onAfterClose: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  preventScroll: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  children: _propTypes2.default.node,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func,
  id: _propTypes2.default.string,
  overlayElement: _propTypes2.default.func,
  contentElement: _propTypes2.default.func,
  testId: _propTypes2.default.string
};
exports["default"] = ModalPortal;
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/ariaAppHider.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/ariaAppHider.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.resetState = resetState;
exports.log = log;
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;

var _warning = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");

var _warning2 = _interopRequireDefault(_warning);

var _safeHTMLElement = __webpack_require__(/*! ./safeHTMLElement */ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalElement = null;

/* eslint-disable no-console */
/* istanbul ignore next */
function resetState() {
  if (globalElement) {
    if (globalElement.removeAttribute) {
      globalElement.removeAttribute("aria-hidden");
    } else if (globalElement.length != null) {
      globalElement.forEach(function (element) {
        return element.removeAttribute("aria-hidden");
      });
    } else {
      document.querySelectorAll(globalElement).forEach(function (element) {
        return element.removeAttribute("aria-hidden");
      });
    }
  }
  globalElement = null;
}

/* istanbul ignore next */
function log() {
  if (true) {
    var check = globalElement || {};
    console.log("ariaAppHider ----------");
    console.log(check.nodeName, check.className, check.id);
    console.log("end ariaAppHider ----------");
  }
}
/* eslint-enable no-console */

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string" && _safeHTMLElement.canUseDOM) {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function validateElement(appElement) {
  var el = appElement || globalElement;
  if (el) {
    return Array.isArray(el) || el instanceof HTMLCollection || el instanceof NodeList ? el : [el];
  } else {
    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

    return [];
  }
}

function hide(appElement) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = validateElement(appElement)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      el.setAttribute("aria-hidden", "true");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function show(appElement) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = validateElement(appElement)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var el = _step2.value;

      el.removeAttribute("aria-hidden");
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/bodyTrap.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/bodyTrap.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.resetState = resetState;
exports.log = log;

var _portalOpenInstances = __webpack_require__(/*! ./portalOpenInstances */ "./node_modules/react-modal/lib/helpers/portalOpenInstances.js");

var _portalOpenInstances2 = _interopRequireDefault(_portalOpenInstances);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Body focus trap see Issue #742

var before = void 0,
    after = void 0,
    instances = [];

/* eslint-disable no-console */
/* istanbul ignore next */
function resetState() {
  var _arr = [before, after];

  for (var _i = 0; _i < _arr.length; _i++) {
    var item = _arr[_i];
    if (!item) continue;
    item.parentNode && item.parentNode.removeChild(item);
  }
  before = after = null;
  instances = [];
}

/* istanbul ignore next */
function log() {
  console.log("bodyTrap ----------");
  console.log(instances.length);
  var _arr2 = [before, after];
  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var item = _arr2[_i2];
    var check = item || {};
    console.log(check.nodeName, check.className, check.id);
  }
  console.log("edn bodyTrap ----------");
}
/* eslint-enable no-console */

function focusContent() {
  if (instances.length === 0) {
    if (true) {
      // eslint-disable-next-line no-console
      console.warn("React-Modal: Open instances > 0 expected");
    }
    return;
  }
  instances[instances.length - 1].focusContent();
}

function bodyTrap(eventType, openInstances) {
  if (!before && !after) {
    before = document.createElement("div");
    before.setAttribute("data-react-modal-body-trap", "");
    before.style.position = "absolute";
    before.style.opacity = "0";
    before.setAttribute("tabindex", "0");
    before.addEventListener("focus", focusContent);
    after = before.cloneNode();
    after.addEventListener("focus", focusContent);
  }

  instances = openInstances;

  if (instances.length > 0) {
    // Add focus trap
    if (document.body.firstChild !== before) {
      document.body.insertBefore(before, document.body.firstChild);
    }
    if (document.body.lastChild !== after) {
      document.body.appendChild(after);
    }
  } else {
    // Remove focus trap
    if (before.parentElement) {
      before.parentElement.removeChild(before);
    }
    if (after.parentElement) {
      after.parentElement.removeChild(after);
    }
  }
}

_portalOpenInstances2.default.subscribe(bodyTrap);

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/classList.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/classList.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.resetState = resetState;
exports.log = log;
var htmlClassList = {};
var docBodyClassList = {};

/* eslint-disable no-console */
/* istanbul ignore next */
function removeClass(at, cls) {
  at.classList.remove(cls);
}

/* istanbul ignore next */
function resetState() {
  var htmlElement = document.getElementsByTagName("html")[0];
  for (var cls in htmlClassList) {
    removeClass(htmlElement, htmlClassList[cls]);
  }

  var body = document.body;
  for (var _cls in docBodyClassList) {
    removeClass(body, docBodyClassList[_cls]);
  }

  htmlClassList = {};
  docBodyClassList = {};
}

/* istanbul ignore next */
function log() {
  if (true) {
    var classes = document.getElementsByTagName("html")[0].className;
    var buffer = "Show tracked classes:\n\n";

    buffer += "<html /> (" + classes + "):\n  ";
    for (var x in htmlClassList) {
      buffer += "  " + x + " " + htmlClassList[x] + "\n  ";
    }

    classes = document.body.className;

    buffer += "\n\ndoc.body (" + classes + "):\n  ";
    for (var _x in docBodyClassList) {
      buffer += "  " + _x + " " + docBodyClassList[_x] + "\n  ";
    }

    buffer += "\n";

    console.log(buffer);
  }
}
/* eslint-enable no-console */

/**
 * Track the number of reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var incrementReference = function incrementReference(poll, className) {
  if (!poll[className]) {
    poll[className] = 0;
  }
  poll[className] += 1;
  return className;
};

/**
 * Drop the reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var decrementReference = function decrementReference(poll, className) {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};

/**
 * Track a class and add to the given class list.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be tracked.
 */
var trackClass = function trackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};

/**
 * Untrack a class and remove from the given class list if the reference
 * reaches 0.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be untracked.
 */
var untrackClass = function untrackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    decrementReference(poll, className);
    poll[className] === 0 && classListRef.remove(className);
  });
};

/**
 * Public inferface to add classes to the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var add = exports.add = function add(element, classString) {
  return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/**
 * Public inferface to remove classes from the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var remove = exports.remove = function remove(element, classString) {
  return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/focusManager.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/focusManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.resetState = resetState;
exports.log = log;
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.popWithoutFocus = popWithoutFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__(/*! ../helpers/tabbable */ "./node_modules/react-modal/lib/helpers/tabbable.js");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

/* eslint-disable no-console */
/* istanbul ignore next */
function resetState() {
  focusLaterElements = [];
}

/* istanbul ignore next */
function log() {
  if (true) {
    console.log("focusManager ----------");
    focusLaterElements.forEach(function (f) {
      var check = f || {};
      console.log(check.nodeName, check.className, check.id);
    });
    console.log("end focusManager ----------");
  }
}
/* eslint-enable no-console */

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var preventScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      toFocus.focus({ preventScroll: preventScroll });
    }
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
/* eslint-enable no-console */

function popWithoutFocus() {
  focusLaterElements.length > 0 && focusLaterElements.pop();
}

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/portalOpenInstances.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/portalOpenInstances.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.log = log;
exports.resetState = resetState;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Tracks portals that are open and emits events to subscribers

var PortalOpenInstances = function PortalOpenInstances() {
  var _this = this;

  _classCallCheck(this, PortalOpenInstances);

  this.register = function (openInstance) {
    if (_this.openInstances.indexOf(openInstance) !== -1) {
      if (true) {
        // eslint-disable-next-line no-console
        console.warn("React-Modal: Cannot register modal instance that's already open");
      }
      return;
    }
    _this.openInstances.push(openInstance);
    _this.emit("register");
  };

  this.deregister = function (openInstance) {
    var index = _this.openInstances.indexOf(openInstance);
    if (index === -1) {
      if (true) {
        // eslint-disable-next-line no-console
        console.warn("React-Modal: Unable to deregister " + openInstance + " as " + "it was never registered");
      }
      return;
    }
    _this.openInstances.splice(index, 1);
    _this.emit("deregister");
  };

  this.subscribe = function (callback) {
    _this.subscribers.push(callback);
  };

  this.emit = function (eventType) {
    _this.subscribers.forEach(function (subscriber) {
      return subscriber(eventType,
      // shallow copy to avoid accidental mutation
      _this.openInstances.slice());
    });
  };

  this.openInstances = [];
  this.subscribers = [];
};

var portalOpenInstances = new PortalOpenInstances();

/* eslint-disable no-console */
/* istanbul ignore next */
function log() {
  console.log("portalOpenInstances ----------");
  console.log(portalOpenInstances.openInstances.length);
  portalOpenInstances.openInstances.forEach(function (p) {
    return console.log(p);
  });
  console.log("end portalOpenInstances ----------");
}

/* istanbul ignore next */
function resetState() {
  portalOpenInstances = new PortalOpenInstances();
}
/* eslint-enable no-console */

exports["default"] = portalOpenInstances;

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/safeHTMLElement.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.canUseDOM = exports.SafeNodeList = exports.SafeHTMLCollection = undefined;

var _exenv = __webpack_require__(/*! exenv */ "./node_modules/exenv/index.js");

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

var SafeHTMLCollection = exports.SafeHTMLCollection = EE.canUseDOM ? window.HTMLCollection : {};

var SafeNodeList = exports.SafeNodeList = EE.canUseDOM ? window.NodeList : {};

var canUseDOM = exports.canUseDOM = EE.canUseDOM;

exports["default"] = SafeHTMLElement;

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/scopeTab.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/scopeTab.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = scopeTab;

var _tabbable = __webpack_require__(/*! ./tabbable */ "./node_modules/react-modal/lib/helpers/tabbable.js");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getActiveElement() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  return el.activeElement.shadowRoot ? getActiveElement(el.activeElement.shadowRoot) : el.activeElement;
}

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);

  if (!tabbable.length) {
    // Do nothing, since there are no elements that can receive focus.
    event.preventDefault();
    return;
  }

  var target = void 0;

  var shiftKey = event.shiftKey;
  var head = tabbable[0];
  var tail = tabbable[tabbable.length - 1];
  var activeElement = getActiveElement();

  // proceed with default browser behavior on tab.
  // Focus on last element on shift + tab.
  if (node === activeElement) {
    if (!shiftKey) return;
    target = tail;
  }

  if (tail === activeElement && !shiftKey) {
    target = head;
  }

  if (head === activeElement && shiftKey) {
    target = tail;
  }

  if (target) {
    event.preventDefault();
    target.focus();
    return;
  }

  // Safari radio issue.
  //
  // Safari does not move the focus to the radio button,
  // so we need to force it to really walk through all elements.
  //
  // This is very error prone, since we are trying to guess
  // if it is a safari browser from the first occurence between
  // chrome or safari.
  //
  // The chrome user agent contains the first ocurrence
  // as the 'chrome/version' and later the 'safari/version'.
  var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

  // If we are not in safari desktop, let the browser control
  // the focus
  if (!isSafariDesktop) return;

  var x = tabbable.indexOf(activeElement);

  if (x > -1) {
    x += shiftKey ? -1 : 1;
  }

  target = tabbable[x];

  // If the tabbable element does not exist,
  // focus head/tail based on shiftKey
  if (typeof target === "undefined") {
    event.preventDefault();
    target = shiftKey ? tail : head;
    target.focus();
    return;
  }

  event.preventDefault();

  target.focus();
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/tabbable.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/tabbable.js ***!
  \**********************************************************/
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object|iframe/;

function hidesContents(element) {
  var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  try {
    // Otherwise we need to check some styles
    var style = window.getComputedStyle(element);
    return zeroSize ? style.getPropertyValue("overflow") !== "visible" ||
    // if 'overflow: visible' set, check if there is actually any overflow
    element.scrollWidth <= 0 && element.scrollHeight <= 0 : style.getPropertyValue("display") == "none";
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.warn("Failed to inspect element style");
    return false;
  }
}

function visible(element) {
  var parentElement = element;
  var rootNode = element.getRootNode && element.getRootNode();
  while (parentElement) {
    if (parentElement === document.body) break;

    // if we are not hidden yet, skip to checking outside the Web Component
    if (rootNode && parentElement === rootNode) parentElement = rootNode.host.parentNode;

    if (hidesContents(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  var descendants = [].slice.call(element.querySelectorAll("*"), 0).reduce(function (finished, el) {
    return finished.concat(!el.shadowRoot ? [el] : findTabbableDescendants(el.shadowRoot));
  }, []);
  return descendants.filter(tabbable);
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-modal/lib/index.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _Modal = __webpack_require__(/*! ./components/Modal */ "./node_modules/react-modal/lib/components/Modal.js");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = _Modal2.default;
module.exports = exports["default"];

/***/ })

}]);