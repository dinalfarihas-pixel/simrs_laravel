(self["webpackChunk"] = self["webpackChunk"] || []).push([["tte"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js/sha256 */ "./node_modules/crypto-js/sha256.js");
/* harmony import */ var crypto_js_sha256__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_sha256__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_inputnumber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/inputnumber */ "./node_modules/primevue/inputnumber/index.mjs");
/* harmony import */ var primevue_progressbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/progressbar */ "./node_modules/primevue/progressbar/index.mjs");
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qrcode.vue */ "./node_modules/qrcode.vue/dist/qrcode.vue.esm.js");
/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js");
/* harmony import */ var pdf_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pdf-lib */ "./node_modules/pdf-lib/es/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default()),
    InputNumber: primevue_inputnumber__WEBPACK_IMPORTED_MODULE_5__["default"],
    ProgressBar: primevue_progressbar__WEBPACK_IMPORTED_MODULE_6__["default"],
    QrcodeVue: qrcode_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    QRCode: qrcode__WEBPACK_IMPORTED_MODULE_3__
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      data_res: '',
      displayModal: false,
      hash_code: '',
      form: {
        startdate: '',
        nama_dokumen: '',
        enddate: '',
        file_attch: '',
        halaman: 1,
        nomor_surat: '',
        user_dipilih: null,
        signature: '',
        passphrase: ''
      },
      user_list: [],
      value: 'https://example.com',
      size: 100,
      isLoading: false,
      fullPage: true,
      pdf_file: '',
      file_size: 'Maxmimum ukuran file 700kb',
      pageCount: null
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    //this.fetchData();
    //this.getdata_user();
  },
  methods: {
    generateHashCodeWithTimestamp: function generateHashCodeWithTimestamp() {
      var timestamp = new Date().getTime().toString(); // Get current timestamp
      var combinedString = timestamp;
      return crypto_js_sha256__WEBPACK_IMPORTED_MODULE_0___default()(combinedString).toString(); // Concatenate the string with the timestamp
    },
    hashCode: function hashCode(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        var _char = str.charCodeAt(i);
        hash = (hash << 5) - hash + _char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return md5(hash).toString();
      ;
    },
    onFileChange: function onFileChange(e) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var size, file, reader;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              size = e.target.files[0].size / 1000;
              _this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';
              _this.form.file_attch = e.target.files[0];
              file = e.target.files[0]; // Get the file from the file input
              reader = new FileReader();
              _this.pdf_file = file;
              console.log(file);
              reader.onload = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
                  var arrayBuffer, pdfDoc;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        arrayBuffer = e.target.result;
                        _context.next = 3;
                        return pdf_lib__WEBPACK_IMPORTED_MODULE_4__.PDFDocument.load(arrayBuffer);
                      case 3:
                        pdfDoc = _context.sent;
                        //var response = await this.modify_file(arrayBuffer)

                        //this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';

                        // this.pdf_file = response.type

                        //this.pdf_file = response;
                        _this.pageCount = pdfDoc.getPageCount();
                        _this.form.halaman = _this.pageCount;
                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }();
              reader.readAsArrayBuffer(file);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    modify_file: function modify_file(file) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", file);
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    closeConfirmation: function closeConfirmation() {
      window.location.assign("/list_tte");
    },
    download: function download(pdfBytes, fileName) {
      // Create a Blob from the PDF bytes
      var blob = new Blob([pdfBytes], {
        type: 'application/pdf'
      });

      // Create an object URL from the Blob
      var url = URL.createObjectURL(blob);

      // Create a temporary link element
      var link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      // Append the link to the document body
      document.body.appendChild(link);

      // Programmatically trigger a click to start the download
      link.click();

      // Clean up: remove the link element and revoke the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    convertUint8ArrayToFile: function convertUint8ArrayToFile(uint8Array) {
      var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'document.pdf';
      var mimeType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'application/pdf';
      // Create a Blob from the Uint8Array
      var blob = new Blob([uint8Array], {
        type: mimeType
      });

      // Create a File object from the Blob
      var file = new File([blob], fileName, {
        type: mimeType
      });

      // Return the File object
      return file;
    },
    handleConvertPdf: function handleConvertPdf(file) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var pdfFile;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              pdfFile = _this2.convertUint8ArrayToFile(file, 'myDocument.pdf');
              return _context4.abrupt("return", pdfFile);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    openModal: function openModal() {
      this.form.passphrase = '';
      this.displayModal = true;
    },
    closeModal: function closeModal() {
      this.displayModal = false;
    },
    submit: function submit() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var fd;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this3.isLoading = true;
              fd = new FormData();
              fd.append("pdf_file", _this3.form.file_attch);
              fd.append("data", JSON.stringify(_this3.form));
              _context5.next = 6;
              return axios.post('/uploaddata', fd).then(function (response) {
                // this.fact = response.data.response
                _this3.isLoading = false;
                console.log(response.data);
                if (response.data.code == 201) {
                  _this3.open("warning", response.data.message);
                }
                if (response.data.metadata.code == 200) {
                  _this3.open("success", response.data.metadata.message);
                  _this3.closeConfirmation();
                }
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    getdata_user: function getdata_user() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return axios.post('/get_user').then(function (response) {
                _this4.user_list = response.data.response;
                console.log(_this4.user_list);
                _this4.isLoading = false;
                console.log(response.data);
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    open: function open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 2500,
        dismissible: true
      });
    },
    submit_ttd: function submit_ttd() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var fd;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this5.isLoading = true;
              fd = new FormData();
              _this5.closeModal();
              fd.append("pdf_file", _this5.form.file_attch);
              fd.append("data", JSON.stringify(_this5.form));
              _context7.next = 7;
              return axios.post('/ttd_file_v2', fd).then(function (response) {
                // this.fact = response.data.response
                _this5.isLoading = false;
                console.log(response.data);
                if (response.data.code == 201) {
                  _this5.open("warning", response.data.message);
                }
                if (response.data.code == 200) {
                  _this5.open("success", response.data.message);
                }
              })["catch"](function (error) {
                console.log(error);
                _this5.isLoading = false;
              })["finally"](function () {
                return _this5.isLoading = false;
              });
            case 7:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pdf_viewer_vue_dist_vue3_pdf_viewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdf-viewer-vue/dist/vue3-pdf-viewer */ "./node_modules/pdf-viewer-vue/dist/vue3-pdf-viewer.js");
/* harmony import */ var pdf_viewer_vue_dist_vue3_pdf_viewer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pdf_viewer_vue_dist_vue3_pdf_viewer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/tag */ "./node_modules/primevue/tag/index.mjs");
/* harmony import */ var primevue_chip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/chip */ "./node_modules/primevue/chip/index.mjs");
/* harmony import */ var primevue_splitbutton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/splitbutton */ "./node_modules/primevue/splitbutton/index.mjs");
/* harmony import */ var primevue_selectbutton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/selectbutton */ "./node_modules/primevue/selectbutton/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    PDFViewer: (pdf_viewer_vue_dist_vue3_pdf_viewer__WEBPACK_IMPORTED_MODULE_1___default()),
    Tag: primevue_tag__WEBPACK_IMPORTED_MODULE_2__["default"],
    Chip: primevue_chip__WEBPACK_IMPORTED_MODULE_3__["default"],
    SplitButton: primevue_splitbutton__WEBPACK_IMPORTED_MODULE_4__["default"],
    SelectButton: primevue_selectbutton__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  props: {
    msg: String
  },
  data: function data() {
    var _this = this;
    return {
      temp_data: [],
      filters: {
        nama_dokument: {
          value: '',
          keys: ['nama_dokument']
        }
      },
      fact: [],
      paymentOptions: [{
        name: 'Semua',
        value: 1
      }, {
        name: 'Yang belum TTD',
        value: 2
      }, {
        name: 'Yang sudah TTD',
        value: 3
      }],
      value2: [{
        name: 'Semua',
        value: 1
      }],
      displayModal: false,
      phasepress: '',
      url_pdf: '',
      displayBasic2: false,
      form: {
        startdate: '',
        enddate: '',
        id: ''
      },
      isLoading: false,
      fullPage: true,
      items: [{
        label: 'Update',
        icon: 'pi pi-refresh',
        command: function command() {
          _this.$toast.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Data Updated',
            life: 3000
          });
        }
      }, {
        label: 'Batalkan',
        icon: 'pi pi-times',
        command: function command() {
          _this.$toast.add({
            severity: 'warn',
            summary: 'Delete',
            detail: 'Data Deleted',
            life: 3000
          });
        }
      }]
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    this.getlist_ttd();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    openBasic2: function openBasic2(url) {
      this.url_pdf = url;
      this.displayBasic2 = true;
    },
    closeBasic2: function closeBasic2() {
      this.displayBasic2 = false;
    },
    openModal: function openModal() {
      this.displayModal = true;
    },
    closeModal: function closeModal() {
      this.displayModal = false;
    },
    open: function open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 2500,
        dismissible: true
      });
    },
    hapus_tte: function hapus_tte(id) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.form.id = id;
              _this2.isLoading = true;
              _context.next = 4;
              return axios.post('/hapus_tte', _this2.form).then(function (response) {
                _this2.isLoading = false;
                if (response.data.metadata.code == 200) {
                  _this2.open('success', 'Data telah dihapus');
                  _this2.getlist_ttd();
                } else {
                  _this2.open('warning', 'Data telah dihapus');
                }
              })["catch"](function (error) {
                console.log(error);
                _this2.isLoading = false;
              })["finally"](function () {
                return _this2.isLoading = false;
              });
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    check_user_ttd: function check_user_ttd() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              _context2.next = 3;
              return axios.post('/ttd-api-checkuser').then(function (response) {
                _this3.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    filterdata: function filterdata(value) {
      this.isLoading = true;
      if (value == 1) {
        this.fact = this.temp_data;
      }
      if (value == 2) {
        this.fact = this.temp_data;
        this.fact = this.fact.filter(function (x) {
          return x.sudah_ttd == 0;
        });
      }
      if (value == 3) {
        this.fact = this.temp_data;
        this.fact = this.fact.filter(function (x) {
          return x.sudah_ttd == 1;
        });
      }
      this.isLoading = false;
      //this.temp_data=
    },
    getlist_ttd: function getlist_ttd() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this4.isLoading = true;
              _context3.next = 3;
              return axios.post('/getlist_ttd').then(function (response) {
                _this4.fact = response.data.response;
                _this4.temp_data = response.data.response;
                _this4.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "content"
};
var _hoisted_2 = {
  "class": "pp-wrap"
};
var _hoisted_3 = {
  "class": "pp-field"
};
var _hoisted_4 = {
  "class": "container-fluid px-0"
};
var _hoisted_5 = {
  "class": "row justify-content-center"
};
var _hoisted_6 = {
  "class": "col-md-8 col-lg-7"
};
var _hoisted_7 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_8 = {
  "class": "card-header d-flex align-items-center justify-content-between"
};
var _hoisted_9 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_10 = {
  "class": "card-body"
};
var _hoisted_11 = {
  "class": "form-group mb-3"
};
var _hoisted_12 = {
  "class": "form-group mb-3"
};
var _hoisted_13 = {
  "class": "form-group mb-3"
};
var _hoisted_14 = {
  "class": "country-item"
};
var _hoisted_15 = {
  "class": "form-group mb-3"
};
var _hoisted_16 = {
  key: 0,
  "class": "text-primary mt-1 d-block"
};
var _hoisted_17 = {
  "class": "form-group mb-1"
};
var _hoisted_18 = {
  "class": "tte-file-wrap"
};
var _hoisted_19 = {
  "for": "inputFile",
  "class": "tte-file-label"
};
var _hoisted_20 = {
  "class": "card-footer d-flex",
  style: {
    "gap": "8px"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_ProgressBar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ProgressBar");
  var _component_MultiSelect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("MultiSelect");
  var _component_InputNumber = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputNumber");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: Passphrase ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Konfirmasi Passphrase",
    visible: $data.displayModal,
    "onUpdate:visible": _cache[3] || (_cache[3] = function ($event) {
      return $data.displayModal = $event;
    }),
    containerStyle: {
      width: '95vw',
      maxWidth: '420px'
    },
    position: "center",
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Batal",
        icon: "pi pi-times",
        onClick: $options.closeModal,
        "class": "p-button-text"
      }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tanda Tangani",
        icon: "pi pi-check-circle",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.submit_ttd();
        }),
        "class": "p-button-success"
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "pp-icon"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-key"
      })], -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        "class": "pp-desc"
      }, "Masukkan passphrase untuk menandatangani dokumen secara digital", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "pp-label"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-lock mr-1"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Passphrase")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
        type: "password",
        modelValue: $data.form.passphrase,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.form.passphrase = $event;
        }),
        autocomplete: "off",
        style: {
          "width": "100%"
        },
        placeholder: "Masukkan passphrase..."
      }, null, 8 /* PROPS */, ["modelValue"])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title font-weight-bold mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-file-signature mr-2 text-primary"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tanda Tangan Elektronik ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ProgressBar, {
    mode: "indeterminate",
    style: {
      "height": ".25em",
      "width": "130px",
      "border-radius": "4px"
    }
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.isLoading]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title font-weight-bold mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-file-alt mr-2 text-primary"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Informasi Dokumen ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Nama Dokumen "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "tte-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-file-alt mr-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Nama Dokumen ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.form.nama_dokumen = $event;
    }),
    style: {
      "text-transform": "uppercase"
    },
    autocomplete: "off",
    "class": "form-control tte-input",
    placeholder: "Nama dokumen..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.nama_dokumen]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Nomor Surat "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "tte-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-hashtag mr-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Nomor Surat ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.form.nomor_surat = $event;
    }),
    style: {
      "text-transform": "uppercase"
    },
    autocomplete: "off",
    "class": "form-control tte-input",
    placeholder: "Nomor surat..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.nomor_surat]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Penandatangan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "tte-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-users mr-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Ditandatangani Oleh ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_MultiSelect, {
    modelValue: $data.form.user_dipilih,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.form.user_dipilih = $event;
    }),
    style: {
      "width": "100%"
    },
    options: $data.user_list,
    optionLabel: "nama_user",
    placeholder: "Pilih penandatangan...",
    filter: true,
    "class": "multiselect-custom"
  }, {
    value: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(slotProps.value, function (option) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          "class": "country-item country-item-value",
          key: option.nip
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.nama_user), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */)), !slotProps.value || slotProps.value.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 0
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pilih penandatangan... ")], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-user mr-2 text-primary"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.option.nama_user), 1 /* TEXT */)])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["modelValue", "options"])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, false]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Total Halaman "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "tte-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-copy mr-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Total Halaman ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
    modelValue: $data.form.halaman,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.form.halaman = $event;
    }),
    mode: "decimal",
    min: 0,
    max: 100,
    "class": "w-100"
  }, null, 8 /* PROPS */, ["modelValue"]), $data.pageCount !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_16, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-info-circle mr-1"
  }, null, -1 /* CACHED */)), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" PDF terdeteksi: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pageCount), 1 /* TEXT */), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" halaman ", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Upload PDF "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "tte-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-upload mr-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" File PDF ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "file",
    "class": "tte-file-input",
    accept: "application/pdf",
    onChange: _cache[8] || (_cache[8] = function () {
      return $options.onFileChange && $options.onFileChange.apply($options, arguments);
    }),
    id: "inputFile"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_19, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-cloud-upload-alt mr-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.file_size), 1 /* TEXT */)])]), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    "class": "text-muted mt-1 d-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-exclamation-circle mr-1 text-warning"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Maksimal ukuran file "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "700 KB")], -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "TTD & Simpan",
    icon: "pi pi-check-circle",
    "class": "p-button-success",
    onClick: _cache[9] || (_cache[9] = function ($event) {
      return $options.openModal();
    })
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Daftar Dokumen",
    icon: "pi pi-list",
    "class": "p-button-warning p-button-outlined",
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.closeConfirmation();
    })
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Logo BSRE "), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card card-outline card-primary shadow-sm mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-body d-flex align-items-center",
    style: {
      "gap": "12px"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://bsre.bssn.go.id/img/bsre-logo-full.aa4caa4d.png",
    width: "100",
    height: "30",
    alt: "BSRE BSSN"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    "class": "text-muted"
  }, " Layanan tanda tangan elektronik menggunakan infrastruktur BSRE — Badan Siber dan Sandi Negara ")])], -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "content"
};
var _hoisted_2 = {
  "class": "container-fluid"
};
var _hoisted_3 = {
  "class": "card-body"
};
var _hoisted_4 = {
  "class": "form-group"
};
var _hoisted_5 = {
  "class": "card-body"
};
var _hoisted_6 = {
  "class": "card"
};
var _hoisted_7 = ["onClick"];
var _hoisted_8 = {
  "class": "card"
};
var _hoisted_9 = {
  "class": "card-body table-sm table-responsive p-10",
  style: {
    "height": "700px"
  }
};
var _hoisted_10 = {
  "class": "table table-bordered table-striped dataTable dtr-inline"
};
var _hoisted_11 = {
  "class": "input-group input-group-sm"
};
var _hoisted_12 = ["href"];
var _hoisted_13 = {
  style: {
    "text-align": "center"
  }
};
var _hoisted_14 = {
  style: {
    "text-align": "center"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_PDFViewer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("PDFViewer");
  var _component_SelectButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SelectButton");
  var _component_Toolbar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Toolbar");
  var _component_Chip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Chip");
  var _component_Tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Tanda tangan",
    visible: $data.displayModal,
    "onUpdate:visible": _cache[2] || (_cache[2] = function ($event) {
      return $data.displayModal = $event;
    }),
    containerStyle: {
      width: '30vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: $options.closeModal,
        "class": "p-button-text"
      }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Yes",
        icon: "pi pi-check",
        onClick: $options.closeModal,
        autofocus: ""
      }, null, 8 /* PROPS */, ["onClick"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "exampleInputEmail1"
      }, "Passphrase", -1 /* CACHED */)), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
        type: "password",
        modelValue: $data.phasepress,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.phasepress = $event;
        }),
        autocomplete: "off",
        style: {
          "width": "30em"
        }
      }, null, 8 /* PROPS */, ["modelValue"])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Header",
    visible: $data.displayBasic2,
    "onUpdate:visible": _cache[4] || (_cache[4] = function ($event) {
      return $data.displayBasic2 = $event;
    }),
    containerStyle: {
      width: '60vw'
    },
    modal: false
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Lakukan tanda tangan",
        icon: "pi pi-pencil",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $options.openModal();
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-check",
        onClick: $options.closeBasic2,
        autofocus: ""
      }, null, 8 /* PROPS */, ["onClick"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_PDFViewer, {
        source: $data.url_pdf,
        style: {
          "height": "70vh",
          "width": "60vw"
        }
      }, null, 8 /* PROPS */, ["source"])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Filter data")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Toolbar, {
    style: {
      "background-color": "white"
    }
  }, {
    start: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SelectButton, {
        modelValue: $data.value2,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.value2 = $event;
        }),
        options: $data.paymentOptions,
        optionLabel: "name"
      }, {
        option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "car-option",
            onClick: function onClick($event) {
              return $options.filterdata(slotProps.option.value);
            }
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.option.name), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_7)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "options"])];
    }),
    end: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button icon=\"pi pi-search\" class=\"mr-2\" />\n                        <Button icon=\"pi pi-calendar\" class=\"p-button-success mr-2\" />\n                        <Button icon=\"pi pi-times\" class=\"p-button-danger\" /> ")];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.filters.nama_dokument.value = $event;
    }),
    autocomplete: "off",
    name: "table_search",
    "class": "form-control float-left",
    placeholder: "Search"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.filters.nama_dokument.value]])])]), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */))]), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NOMOR"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, " PERIHAL "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TGL PENGAJUAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TTD OLEH"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "STTS"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "AKSI")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.fact, function (row, k) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button :label=\"row.nomor_surat\" @click=\"openBasic2(row.link_lampiran)\"\n                                        icon=\"pi pi-file-pdf\"  class=\"p-button-link\"\n                                         /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: row.link_lampiran,
      target: "_blank"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.nomor_surat), 9 /* TEXT, PROPS */, _hoisted_12)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.nama_dokument), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.tgl_pengajuan), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row.detail_user, function (user) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Chip, {
        label: user.user_name,
        image: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
        "class": "mr-2 custom-chip"
      }, null, 8 /* PROPS */, ["label"]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))]);
    }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_14, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row.detail_user, function (user) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Badge value=\"Menunggu\" class=\"mr-2 p-button-raised \" icon=\"pi pi-pencil\" severity=\"\" ></Badge>   "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button :label=\"user.stts\" @click=\"check_user_ttd()\" icon=\"pi pi-check\"\n                                            :class=\"user.css\" />\n                                        <br /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        value: user.stts,
        severity: user.css
      }, null, 8 /* PROPS */, ["value", "severity"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Badge :value=\"user.stts\" size=\"small\" class=\"p-button-raised\" :severity=\"user.css\"></Badge> ")]);
    }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "",
      onClick: function onClick($event) {
        return $options.hapus_tte(row.id);
      },
      icon: "pi pi-times",
      "class": "p-button-danger p-button-text"
    }, null, 8 /* PROPS */, ["onClick"])])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n/* ===== LABEL ===== */\n.tte-label[data-v-68cec520] {\n    display: block;\n    font-weight: 700;\n    color: #333;\n    margin-bottom: 5px;\n    text-transform: uppercase;\n    letter-spacing: .04em;\n}\n\n/* ===== INPUT ===== */\n.tte-input[data-v-68cec520] {\n    border: 1.5px solid #ced4da;\n    border-radius: 8px;\n    padding: 9px 14px;\n    transition: border-color .2s, box-shadow .2s;\n}\n.tte-input[data-v-68cec520]:focus {\n    border-color: #1565c0;\n    box-shadow: 0 0 0 3px rgba(21,101,192,.12);\n    outline: none;\n}\n\n/* ===== FILE UPLOAD ===== */\n.tte-file-wrap[data-v-68cec520] { position: relative;\n}\n.tte-file-input[data-v-68cec520] {\n    position: absolute;\n    width: 1px; height: 1px;\n    opacity: 0; overflow: hidden;\n}\n.tte-file-label[data-v-68cec520] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 10px 16px;\n    border: 2px dashed #ced4da;\n    border-radius: 8px;\n    cursor: pointer;\n    color: #555;\n    font-weight: 600;\n    transition: border-color .2s, background .2s;\n    background: #f8f9fa;\n    word-break: break-all;\n}\n.tte-file-label[data-v-68cec520]:hover {\n    border-color: #1565c0;\n    background: #e3f2fd;\n    color: #1565c0;\n}\n\n/* ===== PASSPHRASE DIALOG ===== */\n.pp-wrap[data-v-68cec520] { padding: 8px 0 16px; text-align: center;\n}\n.pp-icon[data-v-68cec520] {\n    width: 52px; height: 52px; border-radius: 50%;\n    background: linear-gradient(135deg, #1565c0, #42a5f5);\n    display: flex; align-items: center; justify-content: center;\n    font-size: 1.3rem; color: #fff;\n    margin: 0 auto 12px;\n    box-shadow: 0 4px 12px rgba(21,101,192,.3);\n}\n.pp-desc[data-v-68cec520] { color: #888; margin-bottom: 16px;\n}\n.pp-field[data-v-68cec520] { text-align: left;\n}\n.pp-label[data-v-68cec520] {\n    display: block; font-weight: 700; color: #333;\n    margin-bottom: 5px; text-transform: uppercase; letter-spacing: .04em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.p-multiselect { min-width: 100%; width: 100%;\n}\n.country-item-value {\n    padding: .2rem .5rem;\n    border-radius: 4px;\n    display: inline-flex;\n    margin-right: .4rem;\n    background-color: #1565c0;\n    color: #fff;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_0_id_68cec520_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_0_id_68cec520_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_0_id_68cec520_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_1_id_68cec520_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_1_id_68cec520_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_1_id_68cec520_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/tte/dosignComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/tte/dosignComponent.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dosignComponent_vue_vue_type_template_id_68cec520_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dosignComponent.vue?vue&type=template&id=68cec520&scoped=true */ "./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true");
/* harmony import */ var _dosignComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dosignComponent.vue?vue&type=script&lang=js */ "./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _dosignComponent_vue_vue_type_style_index_0_id_68cec520_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css */ "./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css");
/* harmony import */ var _dosignComponent_vue_vue_type_style_index_1_id_68cec520_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css */ "./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_dosignComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_dosignComponent_vue_vue_type_template_id_68cec520_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-68cec520"],['__file',"resources/js/components/tte/dosignComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/tte/listdokumenComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/tte/listdokumenComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _listdokumenComponent_vue_vue_type_template_id_00c1b34f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listdokumenComponent.vue?vue&type=template&id=00c1b34f */ "./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f");
/* harmony import */ var _listdokumenComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listdokumenComponent.vue?vue&type=script&lang=js */ "./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_listdokumenComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_listdokumenComponent_vue_vue_type_template_id_00c1b34f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/tte/listdokumenComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_listdokumenComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_listdokumenComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./listdokumenComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_template_id_68cec520_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_template_id_68cec520_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=template&id=68cec520&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=template&id=68cec520&scoped=true");


/***/ }),

/***/ "./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_listdokumenComponent_vue_vue_type_template_id_00c1b34f__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_listdokumenComponent_vue_vue_type_template_id_00c1b34f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./listdokumenComponent.vue?vue&type=template&id=00c1b34f */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/listdokumenComponent.vue?vue&type=template&id=00c1b34f");


/***/ }),

/***/ "./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_0_id_68cec520_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=0&id=68cec520&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_dosignComponent_vue_vue_type_style_index_1_id_68cec520_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tte/dosignComponent.vue?vue&type=style&index=1&id=68cec520&lang=css");


/***/ }),

/***/ "?599d":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);