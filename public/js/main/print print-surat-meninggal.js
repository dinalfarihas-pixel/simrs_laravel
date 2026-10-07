"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["print print-surat-meninggal"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/vue-loading.min.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      form: {
        startdate: '',
        enddate: ''
      },
      isLoading: false,
      fullPage: true,
      data_rs: '',
      nama_rs: ''
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    //this.fetchData();

    this.profile_rs();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    print: function print() {
      window.addEventListener("load", window.print());
    },
    profile_rs: function profile_rs() {
      var _this = this;
      axios.get('/data_rumahsakit', "").then(function (response) {
        _this.data_rs = response.data;
        _this.nama_rs = _this.data_rs['nama_rs'].toUpperCase();
      })["catch"](function (error) {
        console.log(error);
        _this.isLoading = false;
      })["finally"](function () {
        return _this.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "content"
  }, [_c("div", {
    staticClass: "container-fluid"
  }, [_c("loading", {
    attrs: {
      active: _vm.isLoading,
      "is-full-page": _vm.fullPage
    },
    on: {
      "update:active": function updateActive($event) {
        _vm.isLoading = $event;
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "container my-5"
  }, [_c("div", {
    staticClass: "header"
  }, [_c("kop-surat-component")], 1), _vm._v(" "), _c("hr"), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2)])], 1)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "text-center"
  }, [_c("h5", [_c("u", [_c("b", [_vm._v(" SURAT KETERANGAN KEMATIAN")])])]), _vm._v(" "), _c("p", [_vm._v("Nomor : 670 / ............")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "content"
  }, [_c("p", [_vm._v("Yang bertanda tangan dibawah ini, dokter pada Puskesmas Sabarmiokre dengan ini menerangkan bahwa Pegawai Negeri Sipil tersebut dibawah ini:")]), _vm._v(" "), _c("table", {
    staticClass: "table table-borderless"
  }, [_c("tbody", [_c("tr", [_c("td", [_vm._v("Nama")]), _vm._v(" "), _c("td", [_vm._v(": HERMAN MANSOBEN")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("NIP")]), _vm._v(" "), _c("td", [_vm._v(": 640 001 638")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("Pangkat/Gol")]), _vm._v(" "), _c("td", [_vm._v(": PENATA Tk I (III/d)")])]), _vm._v(" "), _c("tr", [_c("td", [_vm._v("Jabatan")]), _vm._v(" "), _c("td", [_vm._v(": Pensiunan PNS pada Kantor Bawasda Kab. Biak Numfor")])])])]), _vm._v(" "), _c("p", [_vm._v("Pada hari Sabtu, 21 April 2012 telah "), _c("strong", [_vm._v("Meninggal Dunia di Kampung Wapur")]), _vm._v(" pada pukul 15.00 WIT dengan penyebab kematian diagnosa akhir adalah "), _c("strong", [_vm._v("DECOMPENSATIO CORDIS GRADE IV")]), _vm._v(" yang dideritanya.")]), _vm._v(" "), _c("p", [_vm._v("Demikian Surat Keterangan Kematian ini dibuat untuk digunakan seperlunya.")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "footer"
  }, [_c("p", [_vm._v("Sabarmiokre, 22 Mei 2012")]), _vm._v(" "), _c("p", [_vm._v("Dokter Puskesmas Sabarmiokre")]), _vm._v(" "), _c("br"), _c("br"), _c("br"), _vm._v(" "), _c("p", [_c("strong", [_c("u", [_vm._v("dr. RUTH HUTAPEA")])])]), _vm._v(" "), _c("p", [_vm._v("NRPTT. 26 1 005 432")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.header {\n    text-align: center;\n    margin-bottom: 20px;\n}\n.content p {\n    text-align: justify;\n}\n.signature {\n    text-align: right;\n    margin-top: 40px;\n}\n.signature p {\n    margin: 0;\n}\n.footer {\n    text-align: right;\n    margin-top: 50px;\n}\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_style_index_0_id_4f139e40_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_style_index_0_id_4f139e40_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_style_index_0_id_4f139e40_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/printout/PrintSuratMeninggalComponent.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40 */ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40");
/* harmony import */ var _PrintSuratMeninggalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrintSuratMeninggalComponent.vue?vue&type=script&lang=js */ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PrintSuratMeninggalComponent_vue_vue_type_style_index_0_id_4f139e40_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css */ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PrintSuratMeninggalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__.render,
  _PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/printout/PrintSuratMeninggalComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrintSuratMeninggalComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40 ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_template_id_4f139e40__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=template&id=4f139e40");


/***/ }),

/***/ "./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PrintSuratMeninggalComponent_vue_vue_type_style_index_0_id_4f139e40_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/printout/PrintSuratMeninggalComponent.vue?vue&type=style&index=0&id=4f139e40&lang=css");


/***/ })

}]);