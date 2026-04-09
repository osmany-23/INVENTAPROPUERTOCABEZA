"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_pos_src_components_product_EditProduct_js"],{

/***/ "./resources/pos/src/components/product/EditProduct.js":
/*!*************************************************************!*\
  !*** ./resources/pos/src/components/product/EditProduct.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var _ProductForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductForm */ "./resources/pos/src/components/product/ProductForm.js");
/* harmony import */ var _header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header/HeaderTitle */ "./resources/pos/src/components/header/HeaderTitle.js");
/* harmony import */ var _MasterLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MasterLayout */ "./resources/pos/src/components/MasterLayout.js");
/* harmony import */ var _store_action_productUnitAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/action/productUnitAction */ "./resources/pos/src/store/action/productUnitAction.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/loaders/TopProgressBar */ "./resources/pos/src/shared/components/loaders/TopProgressBar.js");
/* harmony import */ var _store_action_baseUnitsAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/action/baseUnitsAction */ "./resources/pos/src/store/action/baseUnitsAction.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var EditProduct = function EditProduct(props) {
  var _singleProduct$, _singleProduct$$attri, _singleProduct$$attri2;

  var fetchMainProduct = props.fetchMainProduct,
      products = props.products,
      fetchAllBaseUnits = props.fetchAllBaseUnits,
      base = props.base;

  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useParams)(),
      id = _useParams.id;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      singleProduct = _useState2[0],
      setSingleProduct = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchAllBaseUnits();
    fetchMainProduct(id);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (Array.isArray(products) && products.length === 1) {
      setSingleProduct(products);
    } else {
      setSingleProduct([]);
    }
  }, [products]);
  var subProduct = Array.isArray(singleProduct) && singleProduct.length >= 1 && ((_singleProduct$ = singleProduct[0]) === null || _singleProduct$ === void 0 ? void 0 : (_singleProduct$$attri = _singleProduct$.attributes) === null || _singleProduct$$attri === void 0 ? void 0 : (_singleProduct$$attri2 = _singleProduct$$attri.products) === null || _singleProduct$$attri2 === void 0 ? void 0 : _singleProduct$$attri2[0]);
  var getSaleUnit = subProduct && subProduct.sale_unit_name ? {
    label: subProduct.sale_unit_name.name,
    value: subProduct.sale_unit_name.id
  } : '';
  var getPurchaseUnit = subProduct && subProduct.purchase_unit_name ? {
    label: subProduct.purchase_unit_name.name,
    value: subProduct.purchase_unit_name.id
  } : '';
  var mainProductItemsValue = Array.isArray(singleProduct) && singleProduct.length >= 1 ? singleProduct.map(function (product) {
    return {
      name: product === null || product === void 0 ? void 0 : product.attributes.name,
      code: product === null || product === void 0 ? void 0 : product.attributes.code,
      product_type: product === null || product === void 0 ? void 0 : product.attributes.product_type,
      product_category_id: {
        value: subProduct === null || subProduct === void 0 ? void 0 : subProduct.product_category_id,
        label: subProduct === null || subProduct === void 0 ? void 0 : subProduct.product_category_name
      },
      brand_id: {
        value: subProduct === null || subProduct === void 0 ? void 0 : subProduct.brand_id,
        label: subProduct === null || subProduct === void 0 ? void 0 : subProduct.brand_name
      },
      barcode_symbol: subProduct === null || subProduct === void 0 ? void 0 : subProduct.barcode_symbol,
      product_unit: Number(subProduct === null || subProduct === void 0 ? void 0 : subProduct.product_unit),
      sale_unit: getSaleUnit,
      purchase_unit: getPurchaseUnit,
      quantity_limit: subProduct === null || subProduct === void 0 ? void 0 : subProduct.quantity_limit,
      notes: subProduct === null || subProduct === void 0 ? void 0 : subProduct.notes,
      images: product === null || product === void 0 ? void 0 : product.attributes.images,
      status_id: {
        label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_8__.getFormattedMessage)("status.filter.received.label"),
        value: 1
      },
      isEdit: true,
      id: product.id
    };
  }) : [];
  var getProductUnit = Array.isArray(mainProductItemsValue) && mainProductItemsValue.length > 0 && base ? base.filter(function (fill) {
    var _mainProductItemsValu;

    return Number(fill === null || fill === void 0 ? void 0 : fill.id) === Number((_mainProductItemsValu = mainProductItemsValue[0]) === null || _mainProductItemsValu === void 0 ? void 0 : _mainProductItemsValu.product_unit);
  }) : [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_MasterLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_shared_components_loaders_TopProgressBar__WEBPACK_IMPORTED_MODULE_9__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_header_HeaderTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_8__.getFormattedMessage)('product.edit.title'),
      to: "/app/products"
    }), Array.isArray(mainProductItemsValue) && mainProductItemsValue.length >= 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProductForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
      singleProduct: mainProductItemsValue,
      productUnit: getProductUnit,
      baseUnits: base,
      id: id
    })]
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var products = state.products,
      base = state.base;
  return {
    products: products,
    base: base
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  fetchMainProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_2__.fetchMainProduct,
  fetchAllBaseUnits: _store_action_baseUnitsAction__WEBPACK_IMPORTED_MODULE_10__.fetchAllBaseUnits,
  productUnitDropdown: _store_action_productUnitAction__WEBPACK_IMPORTED_MODULE_6__.productUnitDropdown,
  fetchAllunits: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_7__.fetchAllunits
})(EditProduct));

/***/ }),

/***/ "./resources/pos/src/components/product/MultipleImage.js":
/*!***************************************************************!*\
  !*** ./resources/pos/src/components/product/MultipleImage.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Image.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_action_toastAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/action/toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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












var mapExistingImages = function mapExistingImages(product) {
  var _product$, _product$$images, _product$2, _product$2$images;

  var imageUrls = (product === null || product === void 0 ? void 0 : (_product$ = product[0]) === null || _product$ === void 0 ? void 0 : (_product$$images = _product$.images) === null || _product$$images === void 0 ? void 0 : _product$$images.imageUrls) || [];
  var imageIds = (product === null || product === void 0 ? void 0 : (_product$2 = product[0]) === null || _product$2 === void 0 ? void 0 : (_product$2$images = _product$2.images) === null || _product$2$images === void 0 ? void 0 : _product$2$images.id) || [];
  return imageUrls.map(function (url, index) {
    return {
      id: imageIds[index],
      url: url
    };
  }).filter(function (image) {
    return Boolean(image.url);
  });
};

var MultipleImage = function MultipleImage(props) {
  var _product$3;

  var fetchFiles = props.fetchFiles,
      product = props.product,
      transferImage = props.transferImage,
      transferDeletedImageIds = props.transferDeletedImageIds;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      images = _useState2[0],
      setImages = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      newImages = _useState4[0],
      setNewImages = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      oldImages = _useState6[0],
      setOldImages = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      removedImageIds = _useState8[0],
      setRemovedImageIds = _useState8[1];

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var currentProductId = product === null || product === void 0 ? void 0 : (_product$3 = product[0]) === null || _product$3 === void 0 ? void 0 : _product$3.id;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var existingImages = mapExistingImages(product);
    var existingImageUrls = existingImages.map(function (item) {
      return item.url;
    });
    setOldImages(existingImages);
    setImages([]);
    setRemovedImageIds([]);
    fetchFiles([]);
    transferImage(existingImageUrls);

    if (typeof transferDeletedImageIds === "function") {
      transferDeletedImageIds([]);
    }
  }, [currentProductId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (images.length < 1) {
      setNewImages([]);
      return;
    }

    var newImageUrls = images.map(function (image) {
      return URL.createObjectURL(image);
    });
    setNewImages(newImageUrls);
    return function () {
      newImageUrls.forEach(function (imageUrl) {
        return URL.revokeObjectURL(imageUrl);
      });
    };
  }, [images]);

  var onRemove = function onRemove(index) {
    dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_2__.addToast)({
      text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.image.success.delete.message")
    }));
    setImages(function (prevImages) {
      var nextImages = prevImages.filter(function (file, i) {
        return i !== index;
      });
      fetchFiles(nextImages);

      if (nextImages.length === 0) {
        var input = document.getElementById("productImage");

        if (input) {
          input.value = "";
        }
      }

      return nextImages;
    });
  };

  var oldRemoveOld = function oldRemoveOld(index) {
    var imageToRemove = oldImages[index];

    if (!imageToRemove) {
      return;
    }

    var nextOldImages = oldImages.filter(function (file, i) {
      return i !== index;
    });
    setOldImages(nextOldImages);
    transferImage(nextOldImages.map(function (item) {
      return item.url;
    }));
    setRemovedImageIds(function (prevIds) {
      var nextRemovedImageIds = imageToRemove.id === undefined || imageToRemove.id === null ? prevIds : Array.from(new Set([].concat(_toConsumableArray(prevIds), [Number(imageToRemove.id)])));

      if (typeof transferDeletedImageIds === "function") {
        transferDeletedImageIds(nextRemovedImageIds);
      }

      return nextRemovedImageIds;
    });
    dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_2__.addToast)({
      text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.image.success.delete.message")
    }));
  };

  var onUploadImage = function onUploadImage(e) {
    e.preventDefault();
    var selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length < 1) {
      return;
    }

    setImages(function (prevImages) {
      var nextImages = [].concat(selectedFiles, _toConsumableArray(prevImages));
      fetchFiles(nextImages);
      return nextImages;
    });
    dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_2__.addToast)({
      text: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_3__.getFormattedMessage)("product.image.success.upload.message")
    }));
  };

  var handleClick = function handleClick(event) {
    var _ref = event || {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? {} : _ref$target;

    target.value = "";
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"].Group, {
      className: "mb-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_6__["default"].Control, {
        type: "file",
        accept: ".png, .jpg, .jpeg",
        id: "productImage",
        onClick: handleClick,
        className: "upload-input-file",
        multiple: true,
        onChange: onUploadImage
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "imagePreviewContainer pt-3 p-0 d-flex flex-wrap",
      children: [newImages && newImages.map(function (newImage, i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "previewItem custom-preview position-relative cursor-pointer",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "imagePreview",
            src: newImage
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
            type: "button",
            onClick: function onClick() {
              return onRemove(i);
            },
            className: "remove-btn p-0",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faTrash
            })
          })]
        }, i);
      }), oldImages && oldImages.map(function (oldImage, i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "previewItem custom-preview position-relative cursor-pointer",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "imagePreview",
            src: oldImage.url
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_8__["default"], {
            type: "button",
            onClick: function onClick() {
              return oldRemoveOld(i);
            },
            className: "remove-btn p-0",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__.FontAwesomeIcon, {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__.faTrash
            })
          })]
        }, "".concat(oldImage.id || oldImage.url, "-").concat(i));
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MultipleImage);

/***/ }),

/***/ "./resources/pos/src/components/product/ProductBatchDraftSection.js":
/*!**************************************************************************!*\
  !*** ./resources/pos/src/components/product/ProductBatchDraftSection.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Alert.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/InputGroup.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var ProductBatchDraftSection = function ProductBatchDraftSection(_ref) {
  var batchDrafts = _ref.batchDrafts,
      errors = _ref.errors,
      frontSetting = _ref.frontSetting,
      onAddBatch = _ref.onAddBatch,
      onBatchChange = _ref.onBatchChange,
      onRemoveBatch = _ref.onRemoveBatch,
      batchFieldErrorKey = _ref.batchFieldErrorKey,
      decimalValidate = _ref.decimalValidate;
  var intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__["default"])();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "product-batch-draft product-form-panel mt-3",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "product-batch-draft__header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "product-batch-draft__eyebrow",
          children: intl.formatMessage({
            id: "product.batch.section.eyebrow",
            defaultMessage: "Producto por lote"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
          className: "product-batch-draft__title",
          children: intl.formatMessage({
            id: "product.batch.section.title",
            defaultMessage: "Lotes iniciales"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: "product-batch-draft__subtitle",
          children: intl.formatMessage({
            id: "product.batch.section.subtitle",
            defaultMessage: "Organiza los lotes con precios, fabricacion y vencimiento desde el alta del producto."
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("button", {
        type: "button",
        className: "product-batch-draft__add-btn",
        onClick: onAddBatch,
        children: ["+", " ", intl.formatMessage({
          id: "product.batch.section.add",
          defaultMessage: "Agregar lote"
        })]
      })]
    }), errors["batch_data"] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "text-danger d-block fw-400 fs-small mb-3",
      children: errors["batch_data"]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_3__["default"], {
      variant: "info",
      className: "product-batch-draft__notice mb-3",
      children: intl.formatMessage({
        id: "product.batch.section.auto_purchase_notice",
        defaultMessage: "Este lote generara automaticamente una compra en el sistema"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "product-batch-draft__list",
      children: batchDrafts.map(function (batch) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "product-batch-draft__card",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "product-batch-draft__card-head",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "product-batch-draft__card-meta",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
                className: "product-batch-draft__code-badge",
                children: ["[", batch.codigo_lote_sistema || batch.codigo_lote_sistema_preview, "]"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "product-batch-draft__chip",
                children: intl.formatMessage({
                  id: "product.batch.card.auto",
                  defaultMessage: "Auto"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "product-batch-draft__actions",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                type: "button",
                className: "product-batch-draft__remove-btn",
                onClick: function onClick() {
                  return onRemoveBatch(batch.id);
                },
                disabled: batchDrafts.length === 1,
                children: intl.formatMessage({
                  id: "globally.remove.button",
                  defaultMessage: "Quitar"
                })
              })
            })]
          }), errors[batchFieldErrorKey(batch.id, "lote_fabricante")] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
            className: "text-danger d-block fw-400 fs-small mb-3",
            children: errors[batchFieldErrorKey(batch.id, "lote_fabricante")]
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "row g-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.codigo_lote_sistema",
                  defaultMessage: "Lote sistema"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "text",
                className: "form-control",
                value: batch.codigo_lote_sistema || batch.codigo_lote_sistema_preview || "Autogenerado al guardar",
                readOnly: true
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.lote_fabricante",
                  defaultMessage: "Lote fabricante"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "text",
                className: "form-control",
                value: batch.lote_fabricante,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "lote_fabricante", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "lote_fabricante")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.lot_barcode",
                  defaultMessage: "Codigo de barras"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "text",
                className: "form-control",
                value: batch.lot_barcode,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "lot_barcode", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "lot_barcode")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.ubicacion",
                  defaultMessage: "Ubicacion"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "text",
                className: "form-control",
                value: batch.ubicacion,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "ubicacion", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "ubicacion")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.quantity",
                  defaultMessage: "Cantidad"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "number",
                min: 1,
                step: "0.01",
                className: "form-control",
                value: batch.quantity,
                onKeyPress: decimalValidate,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "quantity", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "quantity")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.product_cost",
                  defaultMessage: "Precio compra"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                  type: "text",
                  className: "form-control",
                  value: batch.product_cost,
                  onKeyPress: decimalValidate,
                  onChange: function onChange(e) {
                    return onBatchChange(batch.id, "product_cost", e.target.value);
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
                  children: frontSetting.value && frontSetting.value.currency_symbol
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "product_cost")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.product_price",
                  defaultMessage: "Precio venta"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                  type: "text",
                  className: "form-control",
                  value: batch.product_price,
                  onKeyPress: decimalValidate,
                  onChange: function onChange(e) {
                    return onBatchChange(batch.id, "product_price", e.target.value);
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
                  children: frontSetting.value && frontSetting.value.currency_symbol
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "product_price")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.impuesto_tipo",
                  defaultMessage: "Tipo impuesto"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("select", {
                className: "form-select",
                value: batch.impuesto_tipo,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "impuesto_tipo", e.target.value);
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
                  value: "EXCLUSIVO",
                  children: "EXCLUSIVO"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("option", {
                  value: "INCLUSIVO",
                  children: "INCLUSIVO"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "impuesto_tipo")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.impuesto_valor",
                  defaultMessage: "Impuesto %"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                  type: "number",
                  min: "0",
                  max: "100",
                  step: "0.01",
                  className: "form-control",
                  value: batch.impuesto_valor,
                  onKeyPress: decimalValidate,
                  onChange: function onChange(e) {
                    return onBatchChange(batch.id, "impuesto_valor", e.target.value);
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
                  children: "%"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "impuesto_valor")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.fecha_fabricacion",
                  defaultMessage: "Fecha fabricacion"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "date",
                className: "form-control",
                value: batch.fecha_fabricacion,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "fecha_fabricacion", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "fecha_fabricacion")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-xl-4 col-md-6",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.fecha_vencimiento",
                  defaultMessage: "Fecha vencimiento"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                type: "date",
                className: "form-control",
                value: batch.fecha_vencimiento,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "fecha_vencimiento", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "fecha_vencimiento")]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
              className: "col-12",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
                className: "form-label",
                children: intl.formatMessage({
                  id: "product.batch.field.descripcion",
                  defaultMessage: "Descripcion"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("textarea", {
                className: "form-control",
                rows: 3,
                value: batch.descripcion,
                onChange: function onChange(e) {
                  return onBatchChange(batch.id, "descripcion", e.target.value);
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors[batchFieldErrorKey(batch.id, "descripcion")]
              })]
            })]
          })]
        }, batch.id);
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductBatchDraftSection);

/***/ }),

/***/ "./resources/pos/src/components/product/ProductForm.js":
/*!*************************************************************!*\
  !*** ./resources/pos/src/components/product/ProductForm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! react-bootstrap/Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/InputGroup.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Button.js");
/* harmony import */ var _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/apiConfig */ "./resources/pos/src/config/apiConfig.js");
/* harmony import */ var _MultipleImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MultipleImage */ "./resources/pos/src/components/product/MultipleImage.js");
/* harmony import */ var _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/action/unitsAction */ "./resources/pos/src/store/action/unitsAction.js");
/* harmony import */ var _store_action_productCategoryAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/action/productCategoryAction */ "./resources/pos/src/store/action/productCategoryAction.js");
/* harmony import */ var _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/action/brandsAction */ "./resources/pos/src/store/action/brandsAction.js");
/* harmony import */ var _store_action_productAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/action/productAction */ "./resources/pos/src/store/action/productAction.js");
/* harmony import */ var _store_action_productUnitAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/action/productUnitAction */ "./resources/pos/src/store/action/productUnitAction.js");
/* harmony import */ var _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var _shared_option_lists_taxType_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/option-lists/taxType.json */ "./resources/pos/src/shared/option-lists/taxType.json");
/* harmony import */ var _shared_option_lists_barcode_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/option-lists/barcode.json */ "./resources/pos/src/shared/option-lists/barcode.json");
/* harmony import */ var _shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/components/modelFooter */ "./resources/pos/src/shared/components/modelFooter.js");
/* harmony import */ var _shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/select/reactSelect */ "./resources/pos/src/shared/select/reactSelect.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../constants */ "./resources/pos/src/constants/index.js");
/* harmony import */ var _store_action_warehouseAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../store/action/warehouseAction */ "./resources/pos/src/store/action/warehouseAction.js");
/* harmony import */ var _store_action_supplierAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../store/action/supplierAction */ "./resources/pos/src/store/action/supplierAction.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _units_UnitsForm__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../units/UnitsForm */ "./resources/pos/src/components/units/UnitsForm.js");
/* harmony import */ var _store_action_variationAction__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../store/action/variationAction */ "./resources/pos/src/store/action/variationAction.js");
/* harmony import */ var _shared_select_ReactMultiSelect__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../shared/select/ReactMultiSelect */ "./resources/pos/src/shared/select/ReactMultiSelect.jsx");
/* harmony import */ var _store_action_toastAction__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../store/action/toastAction */ "./resources/pos/src/store/action/toastAction.js");
/* harmony import */ var _ProductBatchDraftSection__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ProductBatchDraftSection */ "./resources/pos/src/components/product/ProductBatchDraftSection.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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


































var SINGLE_PRODUCT_TYPE = 1;
var VARIATION_PRODUCT_TYPE = 2;
var BATCH_PRODUCT_TYPE = 3;

var createBatchDraft = function createBatchDraft(sequence, manufacturedAt) {
  return {
    id: "batch-".concat(sequence, "-").concat(Date.now()),
    codigo_lote_sistema_preview: "LOTE-".concat(String(sequence).padStart(3, "0")),
    lote_fabricante: "",
    lot_barcode: "",
    ubicacion: "",
    descripcion: "",
    quantity: "",
    product_cost: "",
    product_price: "",
    fecha_fabricacion: manufacturedAt || moment__WEBPACK_IMPORTED_MODULE_17___default()().format("YYYY-MM-DD"),
    fecha_vencimiento: "",
    impuesto_tipo: "EXCLUSIVO",
    impuesto_valor: ""
  };
};

var batchFieldErrorKey = function batchFieldErrorKey(batchId, fieldName) {
  return "batch_".concat(batchId, "_").concat(fieldName);
};

var ProductForm = function ProductForm(props) {
  var _productUnit$2, _variations$filter$, _variations$filter$$a, _variations$filter$$a2, _singleProduct$, _ref, _productValue$barcode, _productValue$barcode2, _productValue$barcode3, _productValue$barcode4, _singleProductItem$st, _productValue$product, _productValue$product3, _productValue$product4, _productValue$product5, _productValue$product6;

  var addProductData = props.addProductData,
      warehouses = props.warehouses,
      suppliers = props.suppliers,
      id = props.id,
      editMainProduct = props.editMainProduct,
      singleProduct = props.singleProduct,
      brands = props.brands,
      fetchAllBrands = props.fetchAllBrands,
      fetchAllProductCategories = props.fetchAllProductCategories,
      productCategories = props.productCategories,
      fetchUnits = props.fetchUnits,
      productUnits = props.productUnits,
      productUnitDropdown = props.productUnitDropdown,
      frontSetting = props.frontSetting,
      fetchAllWarehouses = props.fetchAllWarehouses,
      fetchAllSuppliers = props.fetchAllSuppliers,
      addUnit = props.addUnit,
      baseUnits = props.baseUnits,
      productUnit = props.productUnit;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_25__.useNavigate)();
  var intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_26__["default"])();
  var MIN_GENERATED_BARCODE_LENGTH = 8;

  var formatPlaceholder = function formatPlaceholder(label) {
    return intl.formatMessage({
      id: label
    });
  };

  var variations = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return state.variations;
  });

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    date: new Date(),
    name: "",
    code: "",
    product_category_id: "",
    brand_id: "",
    barcode_symbol: "",
    product_unit: "",
    sale_unit: "",
    purchase_unit: "",
    sale_quantity_limit: "",
    notes: "",
    images: [],
    warehouse_id: "",
    supplier_id: "",
    product_type: "",
    variation: "",
    variation_type: [],
    status_id: {
      label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("status.filter.received.label"),
      value: 1
    },
    isEdit: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      productValue = _useState2[0],
      setProductValue = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      variationTypesData = _useState4[0],
      setVariationTypesData = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    product_cost: "",
    product_price: "",
    stock_alert: "",
    order_tax: "",
    tax_type: "",
    add_stock: "",
    product_variation_code: ""
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      singleProductTypeData = _useState6[0],
      setSingleProductTypeData = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      unitModel = _useState8[0],
      setUnitModel = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      existingImages = _useState10[0],
      setExistingImages = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      deletedImageIds = _useState12[0],
      setDeletedImageIds = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState14 = _slicedToArray(_useState13, 2),
      isClearDropdown = _useState14[0],
      setIsClearDropdown = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      _useState16 = _slicedToArray(_useState15, 2),
      isDropdown = _useState16[0],
      setIsDropdown = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState18 = _slicedToArray(_useState17, 2),
      multipleFiles = _useState18[0],
      setMultipleFiles = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
      _useState20 = _slicedToArray(_useState19, 2),
      errors = _useState20[0],
      setErrors = _useState20[1];

  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState22 = _slicedToArray(_useState21, 2),
      batchDrafts = _useState22[0],
      setBatchDrafts = _useState22[1];

  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
      _useState24 = _slicedToArray(_useState23, 2),
      nextBatchSequence = _useState24[0],
      setNextBatchSequence = _useState24[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchAllBrands();
    fetchAllProductCategories();
    fetchUnits();
    fetchAllWarehouses();
    fetchAllSuppliers();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _productUnit$;

    if (productUnit !== null && productUnit !== void 0 && (_productUnit$ = productUnit[0]) !== null && _productUnit$ !== void 0 && _productUnit$.id) {
      productUnitDropdown(productUnit[0].id);
    }
  }, [productUnit === null || productUnit === void 0 ? void 0 : (_productUnit$2 = productUnit[0]) === null || _productUnit$2 === void 0 ? void 0 : _productUnit$2.id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (productValue.variation !== "" && productValue.isEdit === false) {
      setProductValue(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          variation_type: ""
        });
      });
      setVariationTypesData([]);
    }
  }, [productValue.variation]);
  var variationsOptions = (variations === null || variations === void 0 ? void 0 : variations.length) > 0 ? variations === null || variations === void 0 ? void 0 : variations.map(function (variation) {
    return {
      id: variation.id,
      name: variation.attributes.name
    };
  }) : [];
  var variationTypesOptions = variations === null || variations === void 0 ? void 0 : (_variations$filter$ = variations.filter(function (variation) {
    var _productValue$variati;

    return (variation === null || variation === void 0 ? void 0 : variation.id) === ((_productValue$variati = productValue.variation) === null || _productValue$variati === void 0 ? void 0 : _productValue$variati.value);
  })[0]) === null || _variations$filter$ === void 0 ? void 0 : (_variations$filter$$a = _variations$filter$.attributes) === null || _variations$filter$$a === void 0 ? void 0 : (_variations$filter$$a2 = _variations$filter$$a.variation_types) === null || _variations$filter$$a2 === void 0 ? void 0 : _variations$filter$$a2.map(function (variationType) {
    return {
      value: variationType.id,
      label: variationType.name
    };
  });
  var singleProductItem = (_singleProduct$ = singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct[0]) !== null && _singleProduct$ !== void 0 ? _singleProduct$ : null;
  var newTax = singleProductItem ? _shared_option_lists_taxType_json__WEBPACK_IMPORTED_MODULE_10__.filter(function (tax) {
    return singleProductItem.tax_type === tax.value;
  }) : [];
  var singleProductBarcodeSymbol = (singleProductItem === null || singleProductItem === void 0 ? void 0 : singleProductItem.barcode_symbol) !== undefined && (singleProductItem === null || singleProductItem === void 0 ? void 0 : singleProductItem.barcode_symbol) !== null ? String(singleProductItem.barcode_symbol) : "";
  var selectedBarcodeValue = (_ref = (_productValue$barcode = productValue === null || productValue === void 0 ? void 0 : (_productValue$barcode2 = productValue.barcode_symbol) === null || _productValue$barcode2 === void 0 ? void 0 : (_productValue$barcode3 = _productValue$barcode2[0]) === null || _productValue$barcode3 === void 0 ? void 0 : _productValue$barcode3.value) !== null && _productValue$barcode !== void 0 ? _productValue$barcode : productValue === null || productValue === void 0 ? void 0 : (_productValue$barcode4 = productValue.barcode_symbol) === null || _productValue$barcode4 === void 0 ? void 0 : _productValue$barcode4.value) !== null && _ref !== void 0 ? _ref : "";
  var newBarcode = singleProductItem ? _shared_option_lists_barcode_json__WEBPACK_IMPORTED_MODULE_11__.filter(function (barcode) {
    var _barcode$value;

    return singleProductBarcodeSymbol === String((_barcode$value = barcode === null || barcode === void 0 ? void 0 : barcode.value) !== null && _barcode$value !== void 0 ? _barcode$value : "");
  }) : [];
  var disabled = multipleFiles.length !== 0 || deletedImageIds.length !== 0 ? false : singleProductItem && productValue.product_unit[0] && productValue.product_unit[0].value === singleProductItem.product_unit && selectedBarcodeValue !== "" && String(selectedBarcodeValue) === singleProductBarcodeSymbol && singleProductItem.name === productValue.name && singleProductItem.notes === productValue.notes && singleProductItem.product_price === productValue.product_price && (singleProductItem === null || singleProductItem === void 0 ? void 0 : (_singleProductItem$st = singleProductItem.stock_alert) === null || _singleProductItem$st === void 0 ? void 0 : _singleProductItem$st.toString()) === productValue.stock_alert && singleProductItem.product_cost === productValue.product_cost && singleProductItem.code === productValue.code && JSON.stringify(singleProductItem.order_tax) === productValue.order_tax && singleProductItem.quantity_limit === productValue.sale_quantity_limit && singleProductItem.brand_id.value === productValue.brand_id.value && newTax.length === productValue.tax_type.length && singleProductItem.product_category_id.value === productValue.product_category_id.value && JSON.stringify(singleProductItem.images.imageUrls || []) === JSON.stringify(existingImages);

  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState26 = _slicedToArray(_useState25, 2),
      selectedBrand = _useState26[0],
      setSelectedBrand = _useState26[1];

  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState28 = _slicedToArray(_useState27, 2),
      selectedBarcode = _useState28[0],
      setSelectedBarcode = _useState28[1];

  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState30 = _slicedToArray(_useState29, 2),
      selectedProductCategory = _useState30[0],
      setSelectedProductCategory = _useState30[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (singleProduct && singleProduct[0]) {
      var nextBrand = [{
        label: singleProduct[0].brand_id.label,
        value: singleProduct[0].brand_id.value
      }];
      var nextCategory = [{
        label: singleProduct[0].product_category_id.label,
        value: singleProduct[0].product_category_id.value
      }];
      setSelectedBrand(function (prev) {
        var _prev$, _prev$2;

        if ((prev === null || prev === void 0 ? void 0 : (_prev$ = prev[0]) === null || _prev$ === void 0 ? void 0 : _prev$.value) === nextBrand[0].value && (prev === null || prev === void 0 ? void 0 : (_prev$2 = prev[0]) === null || _prev$2 === void 0 ? void 0 : _prev$2.label) === nextBrand[0].label) {
          return prev;
        }

        return nextBrand;
      });
      setSelectedProductCategory(function (prev) {
        var _prev$3, _prev$4;

        if ((prev === null || prev === void 0 ? void 0 : (_prev$3 = prev[0]) === null || _prev$3 === void 0 ? void 0 : _prev$3.value) === nextCategory[0].value && (prev === null || prev === void 0 ? void 0 : (_prev$4 = prev[0]) === null || _prev$4 === void 0 ? void 0 : _prev$4.label) === nextCategory[0].label) {
          return prev;
        }

        return nextCategory;
      });
    } else {
      setSelectedBrand(function (prev) {
        return prev === null ? prev : null;
      });
      setSelectedProductCategory(function (prev) {
        return prev === null ? prev : null;
      });
    }
  }, [singleProduct]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (newBarcode && newBarcode[0]) {
      var nextBarcode = [{
        label: newBarcode[0].label,
        value: newBarcode[0].value
      }];
      setSelectedBarcode(function (prev) {
        var _prev$5, _prev$6;

        if ((prev === null || prev === void 0 ? void 0 : (_prev$5 = prev[0]) === null || _prev$5 === void 0 ? void 0 : _prev$5.value) === nextBarcode[0].value && (prev === null || prev === void 0 ? void 0 : (_prev$6 = prev[0]) === null || _prev$6 === void 0 ? void 0 : _prev$6.label) === nextBarcode[0].label) {
          return prev;
        }

        return nextBarcode;
      });
    } else {
      setSelectedBarcode(function (prev) {
        return prev === null ? prev : null;
      });
    }
  }, [singleProduct]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _ref2, _selectedBarcode$0$va, _selectedBarcode$;

    if (!selectedBarcode) {
      return;
    }

    var nextValue = (_ref2 = (_selectedBarcode$0$va = selectedBarcode === null || selectedBarcode === void 0 ? void 0 : (_selectedBarcode$ = selectedBarcode[0]) === null || _selectedBarcode$ === void 0 ? void 0 : _selectedBarcode$.value) !== null && _selectedBarcode$0$va !== void 0 ? _selectedBarcode$0$va : selectedBarcode === null || selectedBarcode === void 0 ? void 0 : selectedBarcode.value) !== null && _ref2 !== void 0 ? _ref2 : selectedBarcode;

    if (nextValue === undefined || nextValue === null || nextValue === "") {
      return;
    }

    setProductValue(function (prev) {
      var _ref3, _prev$barcode_symbol$, _prev$barcode_symbol, _prev$barcode_symbol$2, _prev$barcode_symbol2;

      var currentValue = (_ref3 = (_prev$barcode_symbol$ = prev === null || prev === void 0 ? void 0 : (_prev$barcode_symbol = prev.barcode_symbol) === null || _prev$barcode_symbol === void 0 ? void 0 : (_prev$barcode_symbol$2 = _prev$barcode_symbol[0]) === null || _prev$barcode_symbol$2 === void 0 ? void 0 : _prev$barcode_symbol$2.value) !== null && _prev$barcode_symbol$ !== void 0 ? _prev$barcode_symbol$ : prev === null || prev === void 0 ? void 0 : (_prev$barcode_symbol2 = prev.barcode_symbol) === null || _prev$barcode_symbol2 === void 0 ? void 0 : _prev$barcode_symbol2.value) !== null && _ref3 !== void 0 ? _ref3 : prev === null || prev === void 0 ? void 0 : prev.barcode_symbol;

      if (String(currentValue !== null && currentValue !== void 0 ? currentValue : "") === String(nextValue)) {
        return prev;
      }

      return _objectSpread(_objectSpread({}, prev), {}, {
        barcode_symbol: selectedBarcode
      });
    });
  }, [selectedBarcode]);
  var saleUnitOption = productUnits && productUnits.length && productUnits.map(function (productUnit) {
    return {
      value: productUnit === null || productUnit === void 0 ? void 0 : productUnit.id,
      label: productUnit.attributes.name
    };
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (singleProduct) {
      var _productUnit$3, _productUnit$4;

      setProductValue({
        name: singleProduct ? singleProduct[0].name : "",
        code: singleProduct ? singleProduct[0].code : "",
        product_category_id: singleProduct ? singleProduct[0].product_category_id : "",
        brand_id: singleProduct ? singleProduct[0].brand_id : "",
        barcode_symbol: selectedBarcode,
        product_unit: singleProduct ? {
          value: (_productUnit$3 = productUnit[0]) === null || _productUnit$3 === void 0 ? void 0 : _productUnit$3.id,
          label: (_productUnit$4 = productUnit[0]) === null || _productUnit$4 === void 0 ? void 0 : _productUnit$4.attributes.name
        } : "",
        sale_unit: singleProduct ? singleProduct[0].sale_unit : "",
        purchase_unit: singleProduct ? singleProduct[0].purchase_unit && singleProduct[0].purchase_unit : "",
        stock_alert: singleProduct ? singleProduct[0].stock_alert ? singleProduct[0].stock_alert : 0 : 0,
        sale_quantity_limit: singleProduct ? singleProduct[0].quantity_limit ? singleProduct[0].quantity_limit : "" : "",
        notes: singleProduct ? singleProduct[0].notes : "",
        images: singleProduct ? singleProduct[0].images : "",
        isEdit: singleProduct ? singleProduct[0].is_Edit : false
      });
    }
  }, []);

  var onChangeFiles = function onChangeFiles(file) {
    setMultipleFiles(Array.isArray(file) ? file : []);
  };

  var transferImage = function transferImage(item) {
    setExistingImages(Array.isArray(item) ? item : []);
  };

  var transferDeletedImageIds = function transferDeletedImageIds(ids) {
    setDeletedImageIds(Array.isArray(ids) ? ids : []);
  };

  var handleProductUnitChange = function handleProductUnitChange(obj) {
    productUnitDropdown(obj.value);
    setIsClearDropdown(false);
    setIsDropdown(false);
    setProductValue(_objectSpread(_objectSpread({}, productValue), {}, {
      product_unit: obj
    }));
    setErrors({});
  };

  var handleSaleUnitChange = function handleSaleUnitChange(obj) {
    setIsClearDropdown(true);
    setProductValue(_objectSpread(_objectSpread({}, productValue), {}, {
      sale_unit: obj
    }));
    setErrors({});
  };

  var handlePurchaseUnitChange = function handlePurchaseUnitChange(obj) {
    setIsDropdown(true);
    setProductValue(_objectSpread(_objectSpread({}, productValue), {}, {
      purchase_unit: obj
    }));
    setErrors({});
  };

  var onBrandChange = function onBrandChange(obj) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        brand_id: obj
      });
    });
    setErrors({});
  };

  var onBarcodeChange = function onBarcodeChange(obj) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        barcode_symbol: obj
      });
    });
    setErrors({});
  };

  var getSelectedBarcodeSymbolValue = function getSelectedBarcodeSymbolValue() {
    var _ref4, _productValue$barcode5, _productValue$barcode6, _productValue$barcode7, _productValue$barcode8;

    var selectedValue = (_ref4 = (_productValue$barcode5 = productValue === null || productValue === void 0 ? void 0 : (_productValue$barcode6 = productValue.barcode_symbol) === null || _productValue$barcode6 === void 0 ? void 0 : (_productValue$barcode7 = _productValue$barcode6[0]) === null || _productValue$barcode7 === void 0 ? void 0 : _productValue$barcode7.value) !== null && _productValue$barcode5 !== void 0 ? _productValue$barcode5 : productValue === null || productValue === void 0 ? void 0 : (_productValue$barcode8 = productValue.barcode_symbol) === null || _productValue$barcode8 === void 0 ? void 0 : _productValue$barcode8.value) !== null && _ref4 !== void 0 ? _ref4 : productValue === null || productValue === void 0 ? void 0 : productValue.barcode_symbol;

    if (selectedValue === undefined || selectedValue === null || selectedValue === "") {
      return null;
    }

    var parsedValue = Number(selectedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  };

  var onGenerateBarcode = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var barcodeSymbol, message, currentCode, shouldReplace, _response$data, _response$data$data, response, generatedCode, _error$response, _error$response$data;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              barcodeSymbol = getSelectedBarcodeSymbolValue();

              if (barcodeSymbol) {
                _context.next = 6;
                break;
              }

              message = "Debe seleccionar primero la simbología del código de barras.";
              dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_22__.addToast)({
                text: message,
                type: _constants__WEBPACK_IMPORTED_MODULE_14__.toastType.ERROR
              }));
              setErrors(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  barcode_symbol: message
                });
              });
              return _context.abrupt("return");

            case 6:
              currentCode = String((productValue === null || productValue === void 0 ? void 0 : productValue.code) || "").trim();

              if (!currentCode) {
                _context.next = 11;
                break;
              }

              shouldReplace = window.confirm("El campo ya tiene un código. ¿Desea reemplazarlo?");

              if (shouldReplace) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return");

            case 11:
              _context.prev = 11;
              _context.next = 14;
              return _config_apiConfig__WEBPACK_IMPORTED_MODULE_2__["default"].post("main-products/generate-barcode", {
                barcode_symbol: barcodeSymbol,
                min_length: MIN_GENERATED_BARCODE_LENGTH
              });

            case 14:
              response = _context.sent;
              generatedCode = String((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$data = _response$data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.code) || "").trim();

              if (!(generatedCode.length < MIN_GENERATED_BARCODE_LENGTH)) {
                _context.next = 19;
                break;
              }

              dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_22__.addToast)({
                text: "No se pudo generar un código válido.",
                type: _constants__WEBPACK_IMPORTED_MODULE_14__.toastType.ERROR
              }));
              return _context.abrupt("return");

            case 19:
              setProductValue(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  code: generatedCode
                });
              });
              setErrors(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  code: ""
                });
              });
              _context.next = 26;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](11);
              dispatch((0,_store_action_toastAction__WEBPACK_IMPORTED_MODULE_22__.addToast)({
                text: (_context.t0 === null || _context.t0 === void 0 ? void 0 : (_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || "No se pudo generar el código de barras.",
                type: _constants__WEBPACK_IMPORTED_MODULE_14__.toastType.ERROR
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[11, 23]]);
    }));

    return function onGenerateBarcode() {
      return _ref5.apply(this, arguments);
    };
  }();

  var onProductCategoryChange = function onProductCategoryChange(obj) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        product_category_id: obj
      });
    });
    setErrors({});
  };

  var productTypesOptionsObj = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedOptions)(_constants__WEBPACK_IMPORTED_MODULE_14__.productTypesOptions);
  var productTypeOptions = [].concat(_toConsumableArray(productTypesOptionsObj), [{
    id: BATCH_PRODUCT_TYPE,
    name: intl.formatMessage({
      id: "product.type.batch.label",
      defaultMessage: "Por lote"
    })
  }]);
  var currentProductTypeValue = Number((productValue === null || productValue === void 0 ? void 0 : (_productValue$product = productValue.product_type) === null || _productValue$product === void 0 ? void 0 : _productValue$product.value) || 0);
  var isBatchProductCreate = !singleProduct && currentProductTypeValue === BATCH_PRODUCT_TYPE; // tax type dropdown functionality

  var taxTypeFilterOptions = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedOptions)(_constants__WEBPACK_IMPORTED_MODULE_14__.taxMethodOptions);
  var defaultTaxType = singleProduct ? singleProduct[0].tax_type === "1" ? {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("tax-type.filter.exclusive.label")
  } : {
    value: 2,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("tax-type.filter.inclusive.label")
  } || singleProduct[0].tax_type === "2" ? {
    value: 2,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("tax-type.filter.inclusive.label")
  } : {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("tax-type.filter.exclusive.label")
  } : {
    value: 1,
    label: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("tax-type.filter.exclusive.label")
  };

  var onTaxTypeChange = function onTaxTypeChange(obj, variation_type_id) {
    if (variation_type_id) {
      setVariationTypesData(function (prev) {
        return prev.map(function (variationTypeData) {
          if (variationTypeData.variation_type_id === variation_type_id) {
            return _objectSpread(_objectSpread({}, variationTypeData), {}, {
              tax_type: obj
            });
          } else {
            return variationTypeData;
          }
        });
      });
    } else {
      setSingleProductTypeData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          tax_type: obj
        });
      });
    }

    setErrors({});
  };

  var onProductTypeChange = function onProductTypeChange(obj) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        product_type: obj
      });
    });

    if (obj.value === VARIATION_PRODUCT_TYPE) {
      dispatch((0,_store_action_variationAction__WEBPACK_IMPORTED_MODULE_20__.fetchAllVariations)());
    }

    if (obj.value === BATCH_PRODUCT_TYPE && batchDrafts.length === 0) {
      var initialBatch = createBatchDraft(nextBatchSequence, moment__WEBPACK_IMPORTED_MODULE_17___default()(productValue.date).format("YYYY-MM-DD"));
      setBatchDrafts([initialBatch]);
      setNextBatchSequence(function (prev) {
        return prev + 1;
      });
    }

    setErrors({});
  };

  var onVariationChange = function onVariationChange(obj) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        variation: obj
      });
    });
    setErrors({});
  };

  var onVariationTypesChange = function onVariationTypesChange(array) {
    setProductValue(function (productValue) {
      return _objectSpread(_objectSpread({}, productValue), {}, {
        variation_type: array
      });
    });

    if (variationTypesData.length <= 0) {
      setVariationTypesData(array === null || array === void 0 ? void 0 : array.map(function (variationType) {
        var _productValue$variati2;

        return {
          variation_id: (_productValue$variati2 = productValue.variation) === null || _productValue$variati2 === void 0 ? void 0 : _productValue$variati2.value,
          variation_type_id: variationType === null || variationType === void 0 ? void 0 : variationType.value,
          variation_type: variationType === null || variationType === void 0 ? void 0 : variationType.label,
          product_cost: "",
          product_price: "",
          stock_alert: 0,
          order_tax: 0,
          tax_type: "",
          add_stock: "",
          product_variation_code: ""
        };
      }));
    } else {
      var foundVariationTypeId = array.map(function (item) {
        return item.value;
      });
      var commonVariationTypes = variationTypesData.filter(function (item) {
        return foundVariationTypeId.includes(item.variation_type_id);
      });
      var commonVariationTypesIds = commonVariationTypes.map(function (item) {
        return item.variation_type_id;
      });
      var newVariationType = array.filter(function (variationType) {
        return !commonVariationTypesIds.includes(variationType.value);
      });

      if (newVariationType.length > 0) {
        var _productValue$variati3, _newVariationType$, _newVariationType$2;

        setVariationTypesData([].concat(_toConsumableArray(commonVariationTypes), [{
          variation_id: (_productValue$variati3 = productValue.variation) === null || _productValue$variati3 === void 0 ? void 0 : _productValue$variati3.value,
          variation_type_id: (_newVariationType$ = newVariationType[0]) === null || _newVariationType$ === void 0 ? void 0 : _newVariationType$.value,
          variation_type: (_newVariationType$2 = newVariationType[0]) === null || _newVariationType$2 === void 0 ? void 0 : _newVariationType$2.label,
          product_cost: "",
          product_price: "",
          stock_alert: 0,
          order_tax: 0,
          tax_type: "",
          add_stock: "",
          product_variation_code: ""
        }]));
      } else {
        setVariationTypesData(commonVariationTypes);
      }
    }

    setErrors({});
  };

  var onWarehouseChange = function onWarehouseChange(obj) {
    setProductValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, {
        warehouse_id: obj
      });
    });
    setErrors({});
  };

  var onSupplierChange = function onSupplierChange(obj) {
    setProductValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, {
        supplier_id: obj
      });
    });
    setErrors({});
  };

  var onStatusChange = function onStatusChange(obj) {
    setProductValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, {
        status_id: obj
      });
    });
  };

  var statusFilterOptions = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedOptions)(_constants__WEBPACK_IMPORTED_MODULE_14__.saleStatusOptions);
  var statusDefaultValue = statusFilterOptions.map(function (option) {
    return {
      value: option.id,
      label: option.name
    };
  });

  var validateVariationTypesData = function validateVariationTypesData() {
    var invalid = true;
    var error = {};
    variationTypesData.map(function (variationType) {
      if (Object.keys(error).length <= 0 && (!variationType.product_cost || variationType.product_cost === "")) {
        error["".concat(variationType.variation_type_id, "_product_cost")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-cost.validate.label");
      } else if (Object.keys(error).length <= 0 && (!variationType.product_variation_code || variationType.product_variation_code === "")) {
        error["".concat(variationType.variation_type_id, "_product_variation_code")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.code.validate.label");
      } else if (Object.keys(error).length <= 0 && (!variationType.product_price || variationType.product_price === "")) {
        error["".concat(variationType.variation_type_id, "_product_price")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-price.validate.label");
      } else if (Object.keys(error).length <= 0 && (!variationType.tax_type || variationType.tax_type === "")) {
        error["".concat(variationType.variation_type_id, "_tax_type")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.tax-type.validate.label");
      } else if (Object.keys(error).length <= 0 && (!variationType.add_stock || variationType.add_stock === "")) {
        error["".concat(variationType.variation_type_id, "_add_stock")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.product.quantity.validate.label");
      } else if (Object.keys(error).length <= 0 && variationType.order_tax > 100) {
        error["".concat(variationType.variation_type_id, "_order_tax")] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.order-tax.valid.validate.label");
      }
    });

    if (Object.keys(error).length <= 0) {
      invalid = false;
    } // Don't Remove thi setTimeout. !!! SetTimeout is placed here because js uses synchronously and so the set function cannot wait until the map loop on the array, so by putting setTimeout the set method is made a bit slower than the loop.


    setTimeout(function () {
      setErrors(error);
    }, 0);
    return invalid;
  };

  var getCommonCreateValidationError = function getCommonCreateValidationError() {
    if (!productValue["warehouse_id"]) {
      return {
        warehouse_id: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.select.warehouse.validate.label")
      };
    }

    if (!productValue["supplier_id"]) {
      return {
        supplier_id: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.select.supplier.validate.label")
      };
    }

    if (!productValue["status_id"]) {
      return {
        status_id: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("globally.status.validate.label")
      };
    }

    return {};
  };

  var getBatchValidationErrors = function getBatchValidationErrors() {
    var batchErrors = {};
    var manufacturerLots = new Set();
    var barcodes = new Set();

    if (batchDrafts.length === 0) {
      batchErrors["batch_data"] = intl.formatMessage({
        id: "product.batch.validation.required",
        defaultMessage: "Agregue al menos un lote para guardar el producto."
      });
      return batchErrors;
    }

    batchDrafts.forEach(function (batch) {
      var manufacturerLot = String(batch.lote_fabricante || "").trim();
      var lotBarcode = String(batch.lot_barcode || "").trim();
      var description = String(batch.descripcion || "").trim();
      var quantity = Number(batch.quantity || 0);
      var productCost = Number(batch.product_cost || 0);
      var productPrice = Number(batch.product_price || 0);
      var manufacturedAt = String(batch.fecha_fabricacion || "").trim();
      var expiresAt = String(batch.fecha_vencimiento || "").trim();
      var taxType = String(batch.impuesto_tipo || "EXCLUSIVO").trim();
      var taxValue = batch.impuesto_valor === "" || batch.impuesto_valor === null ? 0 : Number(batch.impuesto_valor || 0);
      var normalizedManufacturerLot = manufacturerLot.toUpperCase();
      var normalizedBarcode = lotBarcode.toUpperCase();

      if (!manufacturerLot) {
        batchErrors[batchFieldErrorKey(batch.id, "lote_fabricante")] = intl.formatMessage({
          id: "product.batch.validation.lote_fabricante",
          defaultMessage: "Ingrese el lote del fabricante."
        });
      } else if (manufacturerLots.has(normalizedManufacturerLot)) {
        batchErrors[batchFieldErrorKey(batch.id, "lote_fabricante")] = intl.formatMessage({
          id: "product.batch.validation.duplicate_lote_fabricante",
          defaultMessage: "Cada lote debe tener un lote de fabricante unico dentro del producto."
        });
      } else {
        manufacturerLots.add(normalizedManufacturerLot);
      }

      if (lotBarcode) {
        if (barcodes.has(normalizedBarcode)) {
          batchErrors[batchFieldErrorKey(batch.id, "lot_barcode")] = intl.formatMessage({
            id: "product.batch.validation.duplicate_barcode",
            defaultMessage: "Cada codigo de barras de lote debe ser unico."
          });
        } else {
          barcodes.add(normalizedBarcode);
        }
      }

      if (!(quantity > 0)) {
        batchErrors[batchFieldErrorKey(batch.id, "quantity")] = intl.formatMessage({
          id: "product.batch.validation.quantity",
          defaultMessage: "La cantidad del lote debe ser mayor a cero."
        });
      }

      if (!(productCost > 0)) {
        batchErrors[batchFieldErrorKey(batch.id, "product_cost")] = intl.formatMessage({
          id: "product.batch.validation.product_cost",
          defaultMessage: "Ingrese un precio de compra mayor a cero."
        });
      }

      if (!(productPrice > 0)) {
        batchErrors[batchFieldErrorKey(batch.id, "product_price")] = intl.formatMessage({
          id: "product.batch.validation.product_price",
          defaultMessage: "Ingrese un precio de venta mayor a cero."
        });
      }

      if (description.length > 1000) {
        batchErrors[batchFieldErrorKey(batch.id, "descripcion")] = intl.formatMessage({
          id: "product.batch.validation.descripcion",
          defaultMessage: "La descripcion del lote no puede superar los 1000 caracteres."
        });
      }

      if (manufacturedAt && expiresAt && moment__WEBPACK_IMPORTED_MODULE_17___default()(expiresAt).isBefore(moment__WEBPACK_IMPORTED_MODULE_17___default()(manufacturedAt), "day")) {
        batchErrors[batchFieldErrorKey(batch.id, "fecha_vencimiento")] = intl.formatMessage({
          id: "product.batch.validation.fecha_vencimiento",
          defaultMessage: "La fecha de vencimiento debe ser igual o posterior a la fecha de fabricacion."
        });
      }

      if (taxType && taxType !== "EXCLUSIVO" && taxType !== "INCLUSIVO") {
        batchErrors[batchFieldErrorKey(batch.id, "impuesto_tipo")] = intl.formatMessage({
          id: "product.batch.validation.impuesto_tipo",
          defaultMessage: "Seleccione un tipo de impuesto valido."
        });
      }

      if (!(taxValue >= 0 && taxValue <= 100)) {
        batchErrors[batchFieldErrorKey(batch.id, "impuesto_valor")] = intl.formatMessage({
          id: "product.batch.validation.impuesto_valor",
          defaultMessage: "El impuesto del lote debe estar entre 0 y 100."
        });
      }
    });

    if (Object.keys(batchErrors).length > 0) {
      batchErrors["batch_data"] = intl.formatMessage({
        id: "product.batch.validation.row_error",
        defaultMessage: "Revise los datos de los lotes antes de guardar."
      });
    }

    return batchErrors;
  };

  var addBatchDraft = function addBatchDraft() {
    var nextDraft = createBatchDraft(nextBatchSequence, moment__WEBPACK_IMPORTED_MODULE_17___default()(productValue.date).format("YYYY-MM-DD"));
    setBatchDrafts(function (prev) {
      return [].concat(_toConsumableArray(prev), [nextDraft]);
    });
    setNextBatchSequence(function (prev) {
      return prev + 1;
    });
    setErrors(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        batch_data: ""
      });
    });
  };

  var removeBatchDraft = function removeBatchDraft(batchId) {
    setBatchDrafts(function (prev) {
      return prev.filter(function (batch) {
        return batch.id !== batchId;
      });
    });
    setErrors(function (prev) {
      return Object.keys(prev).reduce(function (carry, key) {
        if (key !== "batch_data" && !key.startsWith("batch_".concat(batchId, "_"))) {
          carry[key] = prev[key];
        }

        return carry;
      }, {});
    });
  };

  var onBatchDraftChange = function onBatchDraftChange(batchId, fieldName, value) {
    setBatchDrafts(function (prev) {
      return prev.map(function (batch) {
        return batch.id === batchId ? _objectSpread(_objectSpread({}, batch), {}, _defineProperty({}, fieldName, value)) : batch;
      });
    });
    setErrors(function (prev) {
      var _ref6;

      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({
        batch_data: ""
      }, batchFieldErrorKey(batchId, fieldName), ""), fieldName === "fecha_fabricacion" || fieldName === "fecha_vencimiento" ? (_ref6 = {}, _defineProperty(_ref6, batchFieldErrorKey(batchId, "fecha_fabricacion"), ""), _defineProperty(_ref6, batchFieldErrorKey(batchId, "fecha_vencimiento"), ""), _ref6) : {});
    });
  };

  var handleValidation = function handleValidation() {
    var _productValue$barcode9;

    var errorss = {};
    var isValid = false;
    var codeRegex = /^[A-Z0-9]+$/;

    if (!productValue["name"] || productValue["name"].trim() === "") {
      errorss["name"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("globally.input.name.validate.label");
    } else if (!productValue["code"]) {
      errorss["code"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.code.validate.label");
    } else if (!productValue["product_category_id"]) {
      errorss["product_category_id"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-category.validate.label");
    } else if (!productValue["brand_id"]) {
      errorss["brand_id"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.brand.validate.label");
    } else if (!productValue["barcode_symbol"]) {
      errorss["barcode_symbol"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.barcode-symbology.validate.label");
    } else if (productValue && productValue["code"] && ((_productValue$barcode9 = productValue.barcode_symbol) === null || _productValue$barcode9 === void 0 ? void 0 : _productValue$barcode9.value) == 2 && !codeRegex.test(productValue["code"])) {
      errorss["code"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("barcode-symbol-uppercase-validation-message");
    } else if (!productValue["product_unit"]) {
      errorss["product_unit"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-unit.validate.label");
    } else if (!productValue["sale_unit"]) {
      errorss["sale_unit"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.sale-unit.validate.label");
    } else if (isClearDropdown === false) {
      errorss["sale_unit"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.sale-unit.validate.label");
    } else if (!productValue["purchase_unit"]) {
      errorss["purchase_unit"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.purchase-unit.validate.label");
    } else if (isDropdown === false) {
      errorss["purchase_unit"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.purchase-unit.validate.label");
    } else if (productValue["notes"] && productValue["notes"].length > 1500) {
      errorss["notes"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("globally.input.notes.validate.label");
    } else if (productValue["isEdit"] === false) {
      if (productValue.product_type === "" && !productValue.product_type.label) {
        errorss["product_type"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.type.input.validation.error");
      } else if (currentProductTypeValue === VARIATION_PRODUCT_TYPE) {
        if (productValue.variation === "" && !productValue.variation.label) {
          errorss["variation"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variation.select.validation.error.message");
        } else if (productValue.variation_type === "" && !productValue.variation_type.label) {
          errorss["variation_type"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variation.type.select.validate.error.message");
        } else if (validateVariationTypesData()) {} else {
          errorss = _objectSpread(_objectSpread({}, errorss), getCommonCreateValidationError());

          if (Object.keys(errorss).length === 0) {
            isValid = true;
          }
        }
      } else if (currentProductTypeValue === SINGLE_PRODUCT_TYPE) {
        if (!singleProductTypeData.product_cost || singleProductTypeData.product_cost === "") {
          errorss["product_cost"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-cost.validate.label");
        } else if (!singleProductTypeData.product_price || singleProductTypeData.product_price === "") {
          errorss["product_price"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-price.validate.label");
        } else if (!singleProductTypeData.tax_type || singleProductTypeData.tax_type === "") {
          errorss["tax_type"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.tax-type.validate.label");
        } else if (singleProductTypeData.order_tax && singleProductTypeData.order_tax > 100) {
          errorss["order_tax"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.order-tax.valid.validate.label");
        } else if (!singleProductTypeData.add_stock || singleProductTypeData.add_stock === "") {
          errorss["add_stock"] = (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.product.quantity.validate.label");
        } else {
          errorss = _objectSpread(_objectSpread({}, errorss), getCommonCreateValidationError());

          if (Object.keys(errorss).length === 0) {
            isValid = true;
          }
        }
      } else if (currentProductTypeValue === BATCH_PRODUCT_TYPE) {
        errorss = _objectSpread(_objectSpread({}, errorss), getBatchValidationErrors());

        if (Object.keys(errorss).length === 0) {
          errorss = _objectSpread(_objectSpread({}, errorss), getCommonCreateValidationError());
        }

        if (Object.keys(errorss).length === 0) {
          isValid = true;
        }
      }
    } else {
      isValid = true;
    }

    setErrors(errorss);
    return isValid;
  };

  var onChangeInput = function onChangeInput(e) {
    e.preventDefault();
    var _e$target = e.target,
        value = _e$target.value,
        name = _e$target.name; // Solo aplicar la restricción de decimales a los campos numéricos, no a 'notes'

    if (name !== "name" && name !== "notes" && value.match(/\./g)) {
      var _value$split = value.split("."),
          _value$split2 = _slicedToArray(_value$split, 2),
          decimal = _value$split2[1];

      if ((decimal === null || decimal === void 0 ? void 0 : decimal.length) > 2) {
        return;
      }
    }

    setProductValue(function (inputs) {
      return _objectSpread(_objectSpread({}, inputs), {}, _defineProperty({}, name, value));
    });
    setErrors({});
  };

  var onChangeVariationTypesData = function onChangeVariationTypesData(e, variation_type_id) {
    setErrors({});
    setVariationTypesData(function (prev) {
      return prev.map(function (variationTypeData) {
        if (variationTypeData.variation_type_id === variation_type_id) {
          return _objectSpread(_objectSpread({}, variationTypeData), {}, _defineProperty({}, e.target.name, e.target.value));
        } else {
          return variationTypeData;
        }
      });
    });
  };

  var onSingleProductDataChange = function onSingleProductDataChange(e) {
    setSingleProductTypeData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, e.target.name, e.target.value));
    });
    setErrors({});
  };

  var showUnitModel = function showUnitModel(val) {
    setUnitModel(val);
  };

  var addUnitsData = function addUnitsData(productValue) {
    addUnit(productValue);
  };

  var prepareFormData = function prepareFormData() {
    var _productValue$product2;

    var formData = new FormData();
    var sanitizedBatchDrafts = batchDrafts.map(function (batch) {
      return {
        codigo_lote_sistema: null,
        lote_fabricante: String(batch.lote_fabricante || "").trim(),
        lot_code: String(batch.lote_fabricante || "").trim(),
        lot_barcode: String(batch.lot_barcode || "").trim() || null,
        ubicacion: String(batch.ubicacion || "").trim() || null,
        descripcion: String(batch.descripcion || "").trim() || null,
        quantity: Number(batch.quantity || 0),
        product_cost: Number(batch.product_cost || 0),
        product_price: Number(batch.product_price || 0),
        fecha_fabricacion: batch.fecha_fabricacion || null,
        fecha_vencimiento: batch.fecha_vencimiento || null,
        impuesto_tipo: batch.impuesto_tipo || "EXCLUSIVO",
        impuesto_valor: batch.impuesto_valor === "" || batch.impuesto_valor === null ? 0 : Number(batch.impuesto_valor || 0),
        received_at: moment__WEBPACK_IMPORTED_MODULE_17___default()(productValue.date).format("YYYY-MM-DD")
      };
    });
    var primaryBatch = sanitizedBatchDrafts[0] || null;
    formData.append("name", productValue.name);
    formData.append("product_code", productValue.code);
    formData.append("product_type", (_productValue$product2 = productValue.product_type) === null || _productValue$product2 === void 0 ? void 0 : _productValue$product2.value);
    formData.append("product_category_id", productValue.product_category_id.value);
    formData.append("brand_id", productValue.brand_id.value);

    if (productValue.barcode_symbol[0]) {
      formData.append("barcode_symbol", productValue.barcode_symbol[0].value);
    } else {
      formData.append("barcode_symbol", productValue.barcode_symbol.value);
    }

    formData.append("product_unit", productValue.product_unit && productValue.product_unit[0] ? productValue.product_unit[0].value : productValue.product_unit.value);
    formData.append("sale_unit", productValue.sale_unit && productValue.sale_unit[0] ? productValue.sale_unit[0].value : productValue.sale_unit.value);
    formData.append("purchase_unit", productValue.purchase_unit && productValue.purchase_unit[0] ? productValue.purchase_unit[0].value : productValue.purchase_unit.value);
    formData.append("quantity_limit", productValue.sale_quantity_limit ? productValue.sale_quantity_limit : "");
    formData.append("notes", productValue.notes);

    if (productValue.isEdit === false) {
      formData.append("purchase_supplier_id", productValue.supplier_id.value);
      formData.append("purchase_warehouse_id", productValue.warehouse_id.value);
      formData.append("purchase_date", moment__WEBPACK_IMPORTED_MODULE_17___default()(productValue.date).format("YYYY-MM-DD"));
      formData.append("purchase_status", productValue.status_id.value);

      if (currentProductTypeValue === SINGLE_PRODUCT_TYPE) {
        formData.append("code", productValue.code);
        formData.append("product_cost", singleProductTypeData.product_cost);
        formData.append("product_price", singleProductTypeData.product_price);
        formData.append("stock_alert", singleProductTypeData.stock_alert ? singleProductTypeData.stock_alert : "");
        formData.append("order_tax", singleProductTypeData.order_tax ? singleProductTypeData.order_tax : "");
        formData.append("tax_type", singleProductTypeData.tax_type.value ? singleProductTypeData.tax_type.value : 1);
        formData.append("purchase_quantity", singleProductTypeData.add_stock);
      } else if (currentProductTypeValue === BATCH_PRODUCT_TYPE) {
        formData.append("code", productValue.code);
        formData.append("product_cost", primaryBatch ? primaryBatch.product_cost : "");
        formData.append("product_price", primaryBatch ? primaryBatch.product_price : "");
        formData.append("stock_alert", "");
        formData.append("order_tax", 0);
        formData.append("tax_type", 1);
        formData.append("batch_data", JSON.stringify(sanitizedBatchDrafts));
      } else {
        formData.append("variation_data", JSON.stringify(variationTypesData.map(function (variationType) {
          return _objectSpread(_objectSpread({}, variationType), {}, {
            tax_type: variationType.tax_type.value,
            purchase_quantity: variationType.add_stock,
            code: variationType.product_variation_code
          });
        })));
      }
    }

    if (multipleFiles) {
      multipleFiles.forEach(function (image, index) {
        formData.append("images[".concat(index, "]"), image);
      });
    }

    if (deletedImageIds.length > 0) {
      deletedImageIds.forEach(function (imageId, index) {
        formData.append("deleted_image_ids[".concat(index, "]"), imageId);
      });
    }

    return formData;
  };

  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var valid = handleValidation();

    if (singleProduct && valid && isClearDropdown === true && isDropdown === true) {
      if (!disabled) {
        editMainProduct(id, prepareFormData(), navigate);
      }
    } else {
      if (valid) {
        addProductData(prepareFormData());
      }
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
    className: "card product-form-shell",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
      className: "card-body product-form-shell__body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_27__["default"], {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
            className: "col-xl-8",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "card product-form-panel product-form-panel--main",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                className: "card-body product-form-panel__body",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                    className: "col-md-6 mb-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                      className: "form-label",
                      children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("globally.input.name.label"), ":", " "]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "required"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                      type: "text",
                      name: "name",
                      value: productValue.name,
                      placeholder: formatPlaceholder("globally.input.name.placeholder.label"),
                      className: "form-control",
                      autoFocus: true,
                      onChange: function onChange(e) {
                        return onChangeInput(e);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "text-danger d-block fw-400 fs-small mt-2",
                      children: errors["name"] ? errors["name"] : null
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                    className: "col-md-6 mb-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                      className: "form-label",
                      children: ["SKU (Barcode):", " "]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "required"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                        type: "text",
                        name: "code",
                        className: "form-control",
                        placeholder: formatPlaceholder("product.input.code.placeholder.label"),
                        onChange: function onChange(e) {
                          return onChangeInput(e);
                        },
                        value: productValue.code
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_29__["default"], {
                        type: "button",
                        variant: "primary",
                        title: "Generar c\xF3digo de barras",
                        onClick: onGenerateBarcode,
                        className: "d-flex align-items-center justify-content-center",
                        style: {
                          cursor: "pointer",
                          transition: "filter 0.2s ease"
                        },
                        onMouseEnter: function onMouseEnter(e) {
                          e.currentTarget.style.filter = "brightness(1.12)";
                        },
                        onMouseLeave: function onMouseLeave(e) {
                          e.currentTarget.style.filter = "brightness(1)";
                        },
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_18__.FontAwesomeIcon, {
                          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_30__.faBarcode
                        })
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "text-danger d-block fw-400 fs-small mt-2",
                      children: errors["code"] ? errors["code"] : null
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-category.label"),
                      placeholder: formatPlaceholder("product.input.product-category.placeholder.label"),
                      defaultValue: selectedProductCategory,
                      value: productValue.product_category_id,
                      data: productCategories,
                      onChange: onProductCategoryChange,
                      errors: errors["product_category_id"]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.brand.label"),
                      placeholder: formatPlaceholder("product.input.brand.placeholder.label"),
                      defaultValue: selectedBrand,
                      errors: errors["brand_id"],
                      data: brands,
                      onChange: onBrandChange,
                      value: productValue.brand_id
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.barcode-symbology.label"),
                      placeholder: formatPlaceholder("product.input.barcode-symbology.placeholder.label"),
                      defaultValue: selectedBarcode,
                      errors: errors["barcode_symbol"],
                      data: _shared_option_lists_barcode_json__WEBPACK_IMPORTED_MODULE_11__,
                      onChange: onBarcodeChange,
                      value: productValue.barcode_symbol
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                      className: "flex-nowrap dropdown-side-btn",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                        className: "position-relative",
                        title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-unit.label"),
                        placeholder: formatPlaceholder("product.input.product-unit.placeholder.label"),
                        defaultValue: productValue.product_unit,
                        value: productValue.product_unit,
                        data: baseUnits,
                        errors: errors["product_unit"],
                        onChange: handleProductUnitChange
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_29__["default"], {
                        onClick: function onClick() {
                          return showUnitModel(true);
                        },
                        className: "position-absolute model-dtn",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_18__.FontAwesomeIcon, {
                          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_30__.faPlus
                        })
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      className: "position-relative",
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.sale-unit.label"),
                      placeholder: formatPlaceholder("product.input.sale-unit.placeholder.label"),
                      value: isClearDropdown === false ? "" : productValue.sale_unit,
                      data: saleUnitOption,
                      errors: errors["sale_unit"],
                      onChange: handleSaleUnitChange
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "col-md-6 mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      className: "position-relative",
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.purchase-unit.label"),
                      placeholder: formatPlaceholder("product.input.purchase-unit.placeholder.label"),
                      value: isDropdown === false ? "" : productValue.purchase_unit,
                      data: saleUnitOption,
                      errors: errors["purchase_unit"],
                      onChange: handlePurchaseUnitChange
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                    className: "col-md-6 mb-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                      className: "form-label",
                      children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.quantity-limitation.label"), ":", " "]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                      type: "number",
                      name: "sale_quantity_limit",
                      className: "form-control",
                      placeholder: formatPlaceholder("product.input.quantity-limitation.placeholder"),
                      onKeyPress: function onKeyPress(event) {
                        return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                      },
                      onChange: function onChange(e) {
                        return onChangeInput(e);
                      },
                      value: productValue.sale_quantity_limit,
                      min: 1
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "text-danger d-block fw-400 fs-small mt-2",
                      children: errors["stock_alert"] ? errors["stock_alert"] : null
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                    className: "col-md-6 mb-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                      className: "form-label",
                      children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("globally.input.notes.label"), ":", " "]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("textarea", {
                      className: "form-control",
                      name: "notes",
                      rows: 3,
                      placeholder: formatPlaceholder("globally.input.notes.placeholder.label"),
                      onChange: onChangeInput,
                      value: productValue.notes || ""
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                      className: "text-danger d-block fw-400 fs-small mt-2",
                      children: errors["notes"] ? errors["notes"] : null
                    })]
                  })]
                })
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
            className: "col-xl-4",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "card product-form-panel product-form-panel--aside",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "card-body product-form-panel__body",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.multiple-image.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_MultipleImage__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  product: singleProduct,
                  fetchFiles: onChangeFiles,
                  transferImage: transferImage,
                  transferDeletedImageIds: transferDeletedImageIds
                }), !singleProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                  className: "product-form-panel__aside-stack",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("h1", {
                      className: "text-center product-form-panel__aside-heading",
                      children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("add-stock.title"), " ", ":", " "]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      data: warehouses,
                      onChange: onWarehouseChange,
                      defaultValue: productValue.warehouse_id,
                      isWarehouseDisable: true,
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("warehouse.title"),
                      errors: errors["warehouse_id"],
                      placeholder: formatPlaceholder("purchase.select.warehouse.placeholder.label")
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      data: suppliers,
                      onChange: onSupplierChange,
                      defaultValue: productValue.supplier_id,
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("supplier.title"),
                      errors: errors["supplier_id"],
                      placeholder: formatPlaceholder("purchase.select.supplier.placeholder.label")
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                    className: "mb-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                      multiLanguageOption: statusFilterOptions,
                      onChange: onStatusChange,
                      name: "status",
                      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.select.status.label"),
                      value: productValue.status_id,
                      errors: errors["status_id"],
                      defaultValue: statusDefaultValue[0],
                      placeholder: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("purchase.select.status.label")
                    })
                  })]
                })]
              })
            })
          }), !singleProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
            className: "row product-form-shell__type-row border-top pt-4",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "col-md-4 mb-3",
              children: !singleProduct ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.type.label"),
                multiLanguageOption: productTypeOptions,
                onChange: onProductTypeChange,
                value: productValue.product_type,
                errors: errors["product_type"],
                placeholder: formatPlaceholder("product.type.placeholder.label")
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("label", {
                  className: "form-label",
                  children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.type.label")
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  className: "form-control",
                  value: productValue.product_type.label,
                  disabled: true
                })]
              })
            }), typeof productValue.product_type !== "string" && ((_productValue$product3 = productValue.product_type) === null || _productValue$product3 === void 0 ? void 0 : _productValue$product3.value) === VARIATION_PRODUCT_TYPE && (!singleProduct ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "col-md-4 mb-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variations.title"),
                value: productValue.variation,
                multiLanguageOption: variationsOptions,
                onChange: onVariationChange,
                errors: errors["variation"]
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-4 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("label", {
                className: "form-label",
                children: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variations.title")
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                type: "text",
                className: "form-control",
                value: productValue.variation.label,
                disabled: true
              })]
            })), typeof productValue.product_type !== "string" && ((_productValue$product4 = productValue.product_type) === null || _productValue$product4 === void 0 ? void 0 : _productValue$product4.value) === VARIATION_PRODUCT_TYPE && typeof productValue.variation !== "string" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "col-md-4 mb-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_ReactMultiSelect__WEBPACK_IMPORTED_MODULE_21__["default"], {
                title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variation.variation_types"),
                value: productValue.variation_type,
                option: variationTypesOptions,
                onChange: onVariationTypesChange,
                errors: errors["variation_type"]
              })
            })]
          }), isBatchProductCreate ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
            className: "row",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "col-12",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_ProductBatchDraftSection__WEBPACK_IMPORTED_MODULE_23__["default"], {
                batchDrafts: batchDrafts,
                errors: errors,
                frontSetting: frontSetting,
                onAddBatch: addBatchDraft,
                onBatchChange: onBatchDraftChange,
                onRemoveBatch: removeBatchDraft,
                batchFieldErrorKey: batchFieldErrorKey,
                decimalValidate: _shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate
              })
            })
          }) : null, typeof productValue.product_type !== "string" && !singleProduct && ((_productValue$product5 = productValue.product_type) === null || _productValue$product5 === void 0 ? void 0 : _productValue$product5.value) === SINGLE_PRODUCT_TYPE ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
            className: "row product-form-shell__pricing-row border-top pt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-3 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                className: "form-label",
                children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-cost.label"), ":", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "required"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  name: "product_cost",
                  min: 0,
                  className: "form-control",
                  placeholder: formatPlaceholder("product.input.product-cost.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onSingleProductDataChange(e);
                  },
                  value: singleProductTypeData.product_cost
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                  children: frontSetting.value && frontSetting.value.currency_symbol
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors["product_cost"] ? errors["product_cost"] : null
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-3 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                className: "form-label",
                children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-price.label"), ":", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "required"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  name: "product_price",
                  min: 0,
                  className: "form-control",
                  placeholder: formatPlaceholder("product.input.product-price.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onSingleProductDataChange(e);
                  },
                  value: singleProductTypeData.product_price
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                  children: frontSetting.value && frontSetting.value.currency_symbol
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors["product_price"] ? errors["product_price"] : null
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-3 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                className: "form-label",
                children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.stock-alert.label"), ":", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                type: "number",
                name: "stock_alert",
                className: "form-control",
                placeholder: formatPlaceholder("product.input.stock-alert.placeholder.label"),
                onKeyPress: function onKeyPress(event) {
                  return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                },
                onChange: function onChange(e) {
                  return onSingleProductDataChange(e);
                },
                value: singleProductTypeData.stock_alert,
                min: 0
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-3 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                className: "form-label",
                children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.order-tax.label"), ":", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  name: "order_tax",
                  className: "form-control",
                  placeholder: formatPlaceholder("product.input.order-tax.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onSingleProductDataChange(e);
                  },
                  min: 0,
                  pattern: "[0-9]*",
                  value: singleProductTypeData.order_tax
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                  children: "%"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors["order_tax"] ? errors["order_tax"] : null
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
              className: "col-md-3 mb-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.tax-type.label"),
                multiLanguageOption: taxTypeFilterOptions,
                value: singleProductTypeData.tax_type,
                onChange: function onChange(data) {
                  return onTaxTypeChange(data);
                },
                errors: errors["tax_type"],
                defaultValue: defaultTaxType,
                placeholder: formatPlaceholder("product.input.tax-type.placeholder.label")
              })
            }), !singleProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "col-md-3 mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                className: "form-label",
                children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product-quantity.add.title"), ":"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "required"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                type: "number",
                name: "add_stock",
                className: "form-control",
                placeholder: formatPlaceholder("product-quantity.add.title"),
                onKeyPress: function onKeyPress(event) {
                  return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                },
                onChange: function onChange(e) {
                  return onSingleProductDataChange(e);
                },
                value: singleProductTypeData.add_stock,
                min: 1
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                className: "text-danger d-block fw-400 fs-small mt-2",
                children: errors["add_stock"] ? errors["add_stock"] : null
              })]
            })]
          }) : ((_productValue$product6 = productValue.product_type) === null || _productValue$product6 === void 0 ? void 0 : _productValue$product6.value) === VARIATION_PRODUCT_TYPE && typeof productValue.variation !== "string" && typeof productValue.variation_type !== "string" && (variationTypesData === null || variationTypesData === void 0 ? void 0 : variationTypesData.map(function (variation) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
              className: "row border-top pt-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("variation.type.title"), ":"]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  name: "variation_type",
                  className: "form-control",
                  value: variation.variation_type,
                  disabled: true,
                  readOnly: true
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-cost.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                    type: "text",
                    name: "product_cost",
                    min: 0,
                    className: "form-control",
                    placeholder: formatPlaceholder("product.input.product-cost.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onChangeVariationTypesData(e, variation.variation_type_id);
                    },
                    value: variation.product_cost
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["".concat(variation.variation_type_id, "_product_cost")] ? errors["".concat(variation.variation_type_id, "_product_cost")] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: ["SKU (Barcode):", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "text",
                  name: "product_variation_code",
                  className: " form-control",
                  placeholder: formatPlaceholder("product.input.code.placeholder.label"),
                  onChange: function onChange(e) {
                    return onChangeVariationTypesData(e, variation.variation_type_id);
                  },
                  value: variation.product_variation_code
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["".concat(variation.variation_type_id, "_product_variation_code")] ? errors["".concat(variation.variation_type_id, "_product_variation_code")] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.product-price.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                    type: "text",
                    name: "product_price",
                    min: 0,
                    className: "form-control",
                    placeholder: formatPlaceholder("product.input.product-price.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onChangeVariationTypesData(e, variation.variation_type_id);
                    },
                    value: variation.product_price
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                    children: frontSetting.value && frontSetting.value.currency_symbol
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["".concat(variation.variation_type_id, "_product_price")] ? errors["".concat(variation.variation_type_id, "_product_price")] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.stock-alert.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "number",
                  name: "stock_alert",
                  className: "form-control",
                  placeholder: formatPlaceholder("product.input.stock-alert.placeholder.label"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onChangeVariationTypesData(e, variation.variation_type_id);
                  },
                  value: variation.stock_alert,
                  min: 0
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.order-tax.label"), ":", " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                    type: "text",
                    name: "order_tax",
                    className: "form-control",
                    placeholder: formatPlaceholder("product.input.order-tax.placeholder.label"),
                    onKeyPress: function onKeyPress(event) {
                      return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                    },
                    onChange: function onChange(e) {
                      return onChangeVariationTypesData(e, variation.variation_type_id);
                    },
                    min: 0,
                    pattern: "[0-9]*",
                    value: variation.order_tax
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_28__["default"].Text, {
                    children: "%"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["".concat(variation.variation_type_id, "_order_tax")] ? errors["".concat(variation.variation_type_id, "_order_tax")] : null
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("div", {
                className: "col-md-3 mb-3",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_select_reactSelect__WEBPACK_IMPORTED_MODULE_13__["default"], {
                  title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product.input.tax-type.label"),
                  multiLanguageOption: taxTypeFilterOptions,
                  value: variation.tax_type,
                  onChange: function onChange(data) {
                    return onTaxTypeChange(data, variation.variation_type_id);
                  },
                  errors: errors["".concat(variation.variation_type_id, "_tax_type")],
                  defaultValue: defaultTaxType,
                  placeholder: formatPlaceholder("product.input.tax-type.placeholder.label")
                })
              }), !singleProduct && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("div", {
                className: "col-md-3 mb-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsxs)("label", {
                  className: "form-label",
                  children: [(0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("product-quantity.add.title"), ":"]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "required"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("input", {
                  type: "number",
                  name: "add_stock",
                  className: "form-control",
                  placeholder: formatPlaceholder("product-quantity.add.title"),
                  onKeyPress: function onKeyPress(event) {
                    return (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.decimalValidate)(event);
                  },
                  onChange: function onChange(e) {
                    return onChangeVariationTypesData(e, variation.variation_type_id);
                  },
                  value: variation.add_stock,
                  min: 1
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)("span", {
                  className: "text-danger d-block fw-400 fs-small mt-2",
                  children: errors["".concat(variation.variation_type_id, "_add_stock")] ? errors["".concat(variation.variation_type_id, "_add_stock")] : null
                })]
              })]
            }, variation.variation_type_id);
          })), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_shared_components_modelFooter__WEBPACK_IMPORTED_MODULE_12__["default"], {
            onEditRecord: singleProduct,
            onSubmit: onSubmit,
            editDisabled: disabled,
            link: "/app/products",
            addDisabled: !productValue.name
          })]
        })
      })
    }), unitModel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_24__.jsx)(_units_UnitsForm__WEBPACK_IMPORTED_MODULE_19__["default"], {
      addProductData: addUnitsData,
      product_unit: productValue.product_unit,
      title: (0,_shared_sharedMethod__WEBPACK_IMPORTED_MODULE_9__.getFormattedMessage)("unit.create.title"),
      show: unitModel,
      hide: setUnitModel
    })]
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var brands = state.brands,
      productCategories = state.productCategories,
      units = state.units,
      totalRecord = state.totalRecord,
      suppliers = state.suppliers,
      warehouses = state.warehouses,
      productUnits = state.productUnits,
      frontSetting = state.frontSetting;
  return {
    brands: brands,
    productCategories: productCategories,
    units: units,
    totalRecord: totalRecord,
    suppliers: suppliers,
    warehouses: warehouses,
    productUnits: productUnits,
    frontSetting: frontSetting
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  fetchProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_7__.fetchProduct,
  editMainProduct: _store_action_productAction__WEBPACK_IMPORTED_MODULE_7__.editMainProduct,
  fetchAllBrands: _store_action_brandsAction__WEBPACK_IMPORTED_MODULE_6__.fetchAllBrands,
  fetchAllProductCategories: _store_action_productCategoryAction__WEBPACK_IMPORTED_MODULE_5__.fetchAllProductCategories,
  fetchUnits: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_4__.fetchUnits,
  productUnitDropdown: _store_action_productUnitAction__WEBPACK_IMPORTED_MODULE_8__.productUnitDropdown,
  fetchAllWarehouses: _store_action_warehouseAction__WEBPACK_IMPORTED_MODULE_15__.fetchAllWarehouses,
  fetchAllSuppliers: _store_action_supplierAction__WEBPACK_IMPORTED_MODULE_16__.fetchAllSuppliers,
  addUnit: _store_action_unitsAction__WEBPACK_IMPORTED_MODULE_4__.addUnit
})(ProductForm));

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

/***/ "./resources/pos/src/shared/select/ReactMultiSelect.jsx":
/*!**************************************************************!*\
  !*** ./resources/pos/src/shared/select/ReactMultiSelect.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap-v5 */ "./node_modules/react-bootstrap-v5/lib/esm/Form.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var react_select_animated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select/animated */ "./node_modules/react-select/animated/dist/react-select.esm.js");
/* harmony import */ var _sharedMethod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sharedMethod */ "./resources/pos/src/shared/sharedMethod.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var animatedComponents = (0,react_select_animated__WEBPACK_IMPORTED_MODULE_1__["default"])();

var ReactMultiSelect = function ReactMultiSelect(_ref) {
  var title = _ref.title,
      isRequired = _ref.isRequired,
      placeholder = _ref.placeholder,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? null : _ref$value,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      onChange = _ref.onChange,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? "" : _ref$errors,
      option = _ref.option;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"].Group, {
    className: "form-group w-100",
    controlId: "formBasic",
    children: [title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_bootstrap_v5__WEBPACK_IMPORTED_MODULE_4__["default"].Label, {
      children: [title, " :"]
    }) : "", isRequired ? "" : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "required"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
      placeholder: placeholder,
      components: animatedComponents,
      isMulti: true,
      value: value,
      defaultValue: defaultValue,
      onChange: onChange,
      options: option,
      noOptionsMessage: function noOptionsMessage() {
        return (0,_sharedMethod__WEBPACK_IMPORTED_MODULE_2__.getFormattedMessage)("no-option.label");
      }
    }), errors ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "text-danger d-block fw-400 fs-small mt-2",
      children: errors ? errors : null
    }) : null]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactMultiSelect);

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

/***/ }),

/***/ "./node_modules/react-select/animated/dist/react-select.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-select/animated/dist/react-select.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "MultiValue": () => (/* binding */ MultiValue),
/* harmony export */   "Placeholder": () => (/* binding */ Placeholder),
/* harmony export */   "SingleValue": () => (/* binding */ SingleValue),
/* harmony export */   "ValueContainer": () => (/* binding */ ValueContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dist/index-a7690a33.esm.js */ "./node_modules/react-select/dist/index-a7690a33.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! memoize-one */ "./node_modules/react-select/node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/TransitionGroup.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

















var _excluded$4 = ["in", "onExited", "appear", "enter", "exit"];

// strip transition props off before spreading onto select component
var AnimatedInput = function AnimatedInput(WrappedComponent) {
  return function (_ref) {
    _ref.in;
        _ref.onExited;
        _ref.appear;
        _ref.enter;
        _ref.exit;
        var props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded$4);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(WrappedComponent, props);
  };
};

var _excluded$3 = ["component", "duration", "in", "onExited"];
var Fade = function Fade(_ref) {
  var Tag = _ref.component,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1 : _ref$duration,
      inProp = _ref.in;
      _ref.onExited;
      var props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded$3);

  var nodeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var transition = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1,
      transition: "opacity ".concat(duration, "ms")
    },
    exiting: {
      opacity: 0
    },
    exited: {
      opacity: 0
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_11__["default"], {
    mountOnEnter: true,
    unmountOnExit: true,
    in: inProp,
    timeout: duration,
    nodeRef: nodeRef
  }, function (state) {
    var innerProps = {
      style: (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({}, transition[state]),
      ref: nodeRef
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Tag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      innerProps: innerProps
    }, props));
  });
}; // ==============================
// Collapse Transition
// ==============================

var collapseDuration = 260;
// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
var Collapse = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Collapse, _Component);

  var _super = (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__._)(Collapse);

  function Collapse() {
    var _this;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Collapse);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.duration = collapseDuration;
    _this.rafID = void 0;
    _this.state = {
      width: 'auto'
    };
    _this.transition = {
      exiting: {
        width: 0,
        transition: "width ".concat(_this.duration, "ms ease-out")
      },
      exited: {
        width: 0
      }
    };
    _this.nodeRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();

    _this.getStyle = function (width) {
      return {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: width
      };
    };

    _this.getTransition = function (state) {
      return _this.transition[state];
    };

    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Collapse, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var ref = this.nodeRef.current;
      /*
        A check on existence of ref should not be necessary at this point,
        but TypeScript demands it.
      */

      if (ref) {
        /*
          Here we're invoking requestAnimationFrame with a callback invoking our
          call to getBoundingClientRect and setState in order to resolve an edge case
          around portalling. Certain portalling solutions briefly remove children from the DOM
          before appending them to the target node. This is to avoid us trying to call getBoundingClientrect
          while the Select component is in this state.
        */
        // cannot use `offsetWidth` because it is rounded
        this.rafID = window.requestAnimationFrame(function () {
          var _ref$getBoundingClien = ref.getBoundingClientRect(),
              width = _ref$getBoundingClien.width;

          _this2.setState({
            width: width
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.rafID) {
        window.cancelAnimationFrame(this.rafID);
      }
    } // get base styles

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          inProp = _this$props.in,
          onExited = _this$props.onExited;

      var exitedProp = function exitedProp() {
        if (_this3.nodeRef.current && onExited) {
          onExited(_this3.nodeRef.current);
        }
      };

      var width = this.state.width;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_11__["default"], {
        enter: false,
        mountOnEnter: true,
        unmountOnExit: true,
        in: inProp,
        onExited: exitedProp,
        timeout: this.duration,
        nodeRef: this.nodeRef
      }, function (state) {
        var style = (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)((0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({}, _this3.getStyle(width)), _this3.getTransition(state));

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
          ref: _this3.nodeRef,
          style: style
        }, children);
      });
    }
  }]);

  return Collapse;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);

var _excluded$2 = ["in", "onExited"];

// strip transition props off before spreading onto actual component
var AnimatedMultiValue = function AnimatedMultiValue(WrappedComponent) {
  return function (_ref) {
    var inProp = _ref.in,
        onExited = _ref.onExited,
        props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded$2);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Collapse, {
      in: inProp,
      onExited: onExited
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(WrappedComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      cropWithEllipsis: inProp
    }, props)));
  };
};

// fade in when last multi-value removed, otherwise instant
var AnimatedPlaceholder = function AnimatedPlaceholder(WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Fade, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      component: WrappedComponent,
      duration: props.isMulti ? collapseDuration : 1
    }, props));
  };
};

// instant fade; all transition-group children must be transitions
var AnimatedSingleValue = function AnimatedSingleValue(WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Fade, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      component: WrappedComponent
    }, props));
  };
};

var _excluded$1 = ["component"],
    _excluded2 = ["children"];

// make ValueContainer a transition group
var AnimatedValueContainer = function AnimatedValueContainer(WrappedComponent) {
  return function (props) {
    return props.isMulti ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(IsMultiValueContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      component: WrappedComponent
    }, props)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_13__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      component: WrappedComponent
    }, props));
  };
};

var IsMultiValueContainer = function IsMultiValueContainer(_ref) {
  var component = _ref.component,
      restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded$1);

  var multiProps = useIsMultiValueContainer(restProps);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_13__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
    component: component
  }, multiProps));
};

var useIsMultiValueContainer = function useIsMultiValueContainer(_ref2) {
  var children = _ref2.children,
      props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);

  var isMulti = props.isMulti,
      hasValue = props.hasValue,
      innerProps = props.innerProps,
      _props$selectProps = props.selectProps,
      components = _props$selectProps.components,
      controlShouldRenderValue = _props$selectProps.controlShouldRenderValue;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isMulti && controlShouldRenderValue && hasValue),
      _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
      cssDisplayFlex = _useState2[0],
      setCssDisplayFlex = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
      removingValue = _useState4[0],
      setRemovingValue = _useState4[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (hasValue && !cssDisplayFlex) {
      setCssDisplayFlex(true);
    }
  }, [hasValue, cssDisplayFlex]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (removingValue && !hasValue && cssDisplayFlex) {
      setCssDisplayFlex(false);
    }

    setRemovingValue(false);
  }, [removingValue, hasValue, cssDisplayFlex]);

  var onExited = function onExited() {
    return setRemovingValue(true);
  };

  var childMapper = function childMapper(child) {
    if (isMulti && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(child)) {
      // Add onExited callback to MultiValues
      if (child.type === components.MultiValue) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(child, {
          onExited: onExited
        });
      } // While container flexed, Input cursor is shown after Placeholder text,
      // so remove Placeholder until display is set back to grid


      if (child.type === components.Placeholder && cssDisplayFlex) {
        return null;
      }
    }

    return child;
  };

  var newInnerProps = (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)((0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({}, innerProps), {}, {
    style: (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)((0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({}, innerProps === null || innerProps === void 0 ? void 0 : innerProps.style), {}, {
      display: cssDisplayFlex ? 'flex' : 'grid'
    })
  });

  var newProps = (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)((0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({}, props), {}, {
    innerProps: newInnerProps,
    children: react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children).map(childMapper)
  });

  return newProps;
};

var _excluded = ["Input", "MultiValue", "Placeholder", "SingleValue", "ValueContainer"];

var makeAnimated = function makeAnimated() {
  var externalComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var components = (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.G)({
    components: externalComponents
  });

  var Input = components.Input,
      MultiValue = components.MultiValue,
      Placeholder = components.Placeholder,
      SingleValue = components.SingleValue,
      ValueContainer = components.ValueContainer,
      rest = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(components, _excluded);

  return (0,_dist_index_a7690a33_esm_js__WEBPACK_IMPORTED_MODULE_12__.a)({
    Input: AnimatedInput(Input),
    MultiValue: AnimatedMultiValue(MultiValue),
    Placeholder: AnimatedPlaceholder(Placeholder),
    SingleValue: AnimatedSingleValue(SingleValue),
    ValueContainer: AnimatedValueContainer(ValueContainer)
  }, rest);
};

var AnimatedComponents = makeAnimated();
var Input = AnimatedComponents.Input;
var MultiValue = AnimatedComponents.MultiValue;
var Placeholder = AnimatedComponents.Placeholder;
var SingleValue = AnimatedComponents.SingleValue;
var ValueContainer = AnimatedComponents.ValueContainer;
var index = (0,memoize_one__WEBPACK_IMPORTED_MODULE_14__["default"])(makeAnimated);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);



/***/ }),

/***/ "./node_modules/react-transition-group/esm/TransitionGroup.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/TransitionGroup.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransitionGroupContext */ "./node_modules/react-transition-group/esm/TransitionGroupContext.js");
/* harmony import */ var _utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/ChildMapping */ "./node_modules/react-transition-group/esm/utils/ChildMapping.js");









var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__["default"])(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getInitialChildMapping)(nextProps, handleExited) : (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getChildMapping)(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
      value: contextValue
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(Component, props, children));
  };

  return TransitionGroup;
}(react__WEBPACK_IMPORTED_MODULE_4__.Component);

TransitionGroup.propTypes =  true ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),

  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
} : 0;
TransitionGroup.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransitionGroup);

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/ChildMapping.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/ChildMapping.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getChildMapping": () => (/* binding */ getChildMapping),
/* harmony export */   "getInitialChildMapping": () => (/* binding */ getInitialChildMapping),
/* harmony export */   "getNextChildMapping": () => (/* binding */ getNextChildMapping),
/* harmony export */   "mergeChildMappings": () => (/* binding */ mergeChildMappings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./resources/pos/src/shared/option-lists/barcode.json":
/*!************************************************************!*\
  !*** ./resources/pos/src/shared/option-lists/barcode.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"label":"Code 128","value":"1"},{"label":"Code 39","value":"2"}]');

/***/ }),

/***/ "./resources/pos/src/shared/option-lists/taxType.json":
/*!************************************************************!*\
  !*** ./resources/pos/src/shared/option-lists/taxType.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"label":"Exclusive","value":"1"},{"label":"Inclusive","value":"2"}]');

/***/ })

}]);