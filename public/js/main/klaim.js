"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["klaim"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primevue_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/datatable */ "./node_modules/primevue/datatable/index.mjs");
/* harmony import */ var primevue_galleria__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/galleria */ "./node_modules/primevue/galleria/index.mjs");
/* harmony import */ var primevue_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/badge */ "./node_modules/primevue/badge/index.mjs");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/@primevue/core/api/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    DataTable: primevue_datatable__WEBPACK_IMPORTED_MODULE_2__["default"],
    FilterMatchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode,
    Galleria: primevue_galleria__WEBPACK_IMPORTED_MODULE_3__["default"],
    Badge: primevue_badge__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      list_lampiran: [],
      rincian_dx: {
        dx: [],
        proc: []
      },
      databiling: [],
      responsiveOptions: [{
        breakpoint: '1024px',
        numVisible: 5
      }, {
        breakpoint: '768px',
        numVisible: 3
      }, {
        breakpoint: '560px',
        numVisible: 1
      }],
      form: {
        startdate: '',
        enddate: '',
        jenisrawatSelected: 'JALAN',
        carabayarSelecated: 'BPJS',
        statuspulangSelected: 'SUDAH PULANG',
        NOSEP: '',
        noregister: '',
        foldername: 'LAMPIRAN'
      },
      activeIndex: 0,
      sepSelected: '',
      nama_pasien: '',
      isLoading: false,
      fullPage: true,
      jenisrawat: ['JALAN', 'INAP'],
      carabayar: ['BPJS'],
      status_pulang: ['ALL', 'SUDAH PULANG', 'SEDANG RAWAT'],
      filters1: {},
      showRincian: false,
      copied: false,
      modeduleFrom: 'LAMPIRAN',
      displayCustom: false,
      showdialogParam: false,
      data_trans: ''
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    this.form.enddate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    //this.fetchData();
    this.initFilters1();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    open: function open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 3000,
        dismissible: true
      });
    },
    showModalRincian: function showModalRincian(data) {
      // this.sepSelected ="";
      // this.sepSelected = data.NOSEP 
      // this.getdata_dx(data.NOSEP)
    },
    copyText: function copyText() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return navigator.clipboard.writeText(_this.sepSelected);
            case 3:
              _this.copied = true;
              setTimeout(function () {
                return _this.copied = false;
              }, 2000); // Show "copied" message for 2 seconds
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error("Failed to copy text: ", _context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    CopyDx: function CopyDx(dx) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return navigator.clipboard.writeText(dx);
            case 3:
              _context2.next = 8;
              break;
            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              console.error("Failed to copy text: ", _context2.t0);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 5]]);
      }))();
    },
    CopyProc: function CopyProc(proc) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return navigator.clipboard.writeText(proc);
            case 3:
              _context3.next = 8;
              break;
            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              console.error("Failed to copy text: ", _context3.t0);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 5]]);
      }))();
    },
    initFilters1: function initFilters1() {
      this.filters1 = {
        'global': {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      };
    },
    getdata: function getdata() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this2.isLoading = true;
              _context4.next = 3;
              return axios.post('/dashboard_data_klaim', _this2.form).then(function (response) {
                _this2.fact = response.data.response;
                _this2.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this2.isLoading = false;
              })["finally"](function () {
                return _this2.isLoading = false;
              });
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    imageClick: function imageClick(index) {
      this.activeIndex = index;
      this.displayCustom = true;
    },
    getdata_dx: function getdata_dx(data) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this3.isLoading = true;
              _this3.form.NOSEP = data.NOSEP;
              _context5.next = 4;
              return axios.post('/dashboard_data_klaim_get_dx', _this3.form).then(function (response) {
                _this3.isLoading = false;
                _this3.showRincian = true;
                console.log(response.data);
                _this3.rincian_dx = response.data.data;
                if (_this3.rincian_dx == null || _this3.rincian_dx == "") {
                  _this3.rincian_dx = {
                    dx: [],
                    proc: []
                  };
                }
                _this3.sepSelected = data.NOSEP;
                _this3.nama_pasien = data.NAMAPASIEN + ' (' + data.NOMR + ')';
                _this3.data_trans = data;
                _this3.getdatabiliing(data);
                _this3.getdata_lampiran(data);
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    getdatabiliing: function getdatabiliing(data) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _this4.form.NOSEP = data.NOSEP;
              _this4.form.NOMR = data.NOMR;
              _this4.databiling = null;
              _this4.isLoading = true;
              _context6.next = 6;
              return axios.post('/getdatabiliing', _this4.form).then(function (response) {
                console.log(response.data);
                _this4.databiling = response.data.rincian;
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    getdata_lampiran: function getdata_lampiran(data) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this5.isLoading = true;
              _this5.form.noregister = data.NOPENDAFTARAN;
              _context7.next = 4;
              return axios.post('/getdata_lampiran', _this5.form).then(function (response) {
                console.log(response.data.response);
                _this5.list_lampiran = response.data.response;
                _this5.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this5.isLoading = false;
              })["finally"](function () {
                return _this5.isLoading = false;
              });
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    hapusLampiranGambar: function hapusLampiranGambar(index) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var data;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _this6.activeIndex = index;
              data = _this6.list_lampiran[index];
              _this6.form.id = data.id;
              console.log(_this6.form.id);
              _context8.next = 6;
              return axios.post('/hapus_datalampiran', _this6.form).then(function (response) {
                var res = response.data.metadata;
                if (res['code'] == 200) {
                  alert('berhasil dihapus');
                  _this6.getdata_lampiran(_this6.data_trans);
                } else {
                  alert('Gagal dihapus');
                }
              })["catch"](function (error) {
                console.log(error);
                _this6.isLoading = false;
              })["finally"](function () {
                return _this6.isLoading = false;
              });
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var _hoisted_1 = {
  "class": "content"
};
var _hoisted_2 = {
  "class": "container-fluid"
};
var _hoisted_3 = {
  "class": "card"
};
var _hoisted_4 = {
  "class": "card-body"
};
var _hoisted_5 = {
  "class": "row"
};
var _hoisted_6 = {
  "class": "col-md-5"
};
var _hoisted_7 = {
  "class": "col-md-2"
};
var _hoisted_8 = {
  "class": "card"
};
var _hoisted_9 = {
  "class": "card-body"
};
var _hoisted_10 = {
  "class": "table table-sm hover"
};
var _hoisted_11 = {
  "class": "card"
};
var _hoisted_12 = {
  "class": "card-body"
};
var _hoisted_13 = {
  "class": "table table-sm hover"
};
var _hoisted_14 = {
  "class": "card"
};
var _hoisted_15 = {
  "class": "card-body"
};
var _hoisted_16 = {
  "class": "row"
};
var _hoisted_17 = {
  "class": "col-md-4"
};
var _hoisted_18 = {
  "class": "table table-sm hover"
};
var _hoisted_19 = {
  "class": "card"
};
var _hoisted_20 = {
  "class": "card-body d-flex justify-content-center"
};
var _hoisted_21 = {
  "class": "card"
};
var _hoisted_22 = {
  "class": "card-body"
};
var _hoisted_23 = ["src", "alt"];
var _hoisted_24 = {
  "class": "card card-success"
};
var _hoisted_25 = {
  "class": "card-body"
};
var _hoisted_26 = {
  "class": "row"
};
var _hoisted_27 = {
  "class": "col-md-12 col-lg-6 col-xl-4"
};
var _hoisted_28 = {
  "class": "card mb-2 bg-gradient-dark"
};
var _hoisted_29 = ["src"];
var _hoisted_30 = {
  "class": "card-img-overlay d-flex flex-column justify-content-end"
};
var _hoisted_31 = {
  "class": "card-title text-primary text-white"
};
var _hoisted_32 = {
  "class": "card"
};
var _hoisted_33 = {
  "class": "card-body"
};
var _hoisted_34 = {
  "class": "table-header"
};
var _hoisted_35 = {
  "class": "p-input-icon-left"
};
var _hoisted_36 = {
  key: 0
};
var _hoisted_37 = {
  key: 1
};
var _hoisted_38 = {
  key: 0
};
var _hoisted_39 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Calendar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Calendar");
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Galleria = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Galleria");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  var _component_Badge = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Badge");
  var _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  var _component_upload_file = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("upload-file");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Data kunjungan pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": ""
  }, "Tanggal Pulang ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
    modelValue: $data.form.startdate,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.startdate = $event;
    }),
    "class": "text-sm",
    showIcon: true,
    view: "date",
    dateFormat: "dd/mm/yy",
    yearNavigator: true,
    yearRange: "2000:2030",
    "aria-placeholder": "Tanggal awal",
    style: {
      "width": "10em"
    }
  }, null, 8 /* PROPS */, ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
    modelValue: $data.form.enddate,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.enddate = $event;
    }),
    "class": "text-sm",
    showIcon: true,
    view: "date",
    dateFormat: "dd/mm/yy",
    yearNavigator: true,
    yearRange: "2000:2030",
    "aria-placeholder": "Tanggal awal",
    style: {
      "width": "10em"
    }
  }, null, 8 /* PROPS */, ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    modelValue: $data.form.jenisrawatSelected,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.jenisrawatSelected = $event;
    }),
    options: $data.jenisrawat,
    placeholder: "Jenis rawat"
  }, null, 8 /* PROPS */, ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    modelValue: $data.form.carabayarSelecated,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.form.carabayarSelecated = $event;
    }),
    options: $data.carabayar,
    placeholder: "Cara bayar"
  }, null, 8 /* PROPS */, ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    modelValue: $data.form.statuspulangSelected,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.form.statuspulangSelected = $event;
    }),
    options: $data.status_pulang,
    placeholder: "Cara bayar"
  }, null, 8 /* PROPS */, ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Tampilkan",
    align: "",
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.getdata();
    }),
    icon: "pi pi-check",
    "class": "p-button"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Rincian",
    visible: $data.showRincian,
    "onUpdate:visible": _cache[12] || (_cache[12] = function ($event) {
      return $data.showRincian = $event;
    }),
    containerStyle: {
      width: '70vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-check",
        onClick: _cache[11] || (_cache[11] = function ($event) {
          return $data.showRincian = false;
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.sepSelected) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.nama_pasien), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "",
        icon: "pi pi-copy",
        onClick: $options.copyText,
        "class": "p-button-text"
      }, null, 8 /* PROPS */, ["onClick"])])]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Diagnosa")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_10, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "DX"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "CAPTION"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "JNS DX")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rincian_dx.dx, function (data) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          icon: "pi pi-copy",
          onClick: function onClick($event) {
            return $options.CopyDx(data.KODE_DIAGNOSA);
          },
          "class": "p-button-text"
        }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.KODE_DIAGNOSA), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.NAMA_DIAGNOSA), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.JENIS_DIAGNOSA), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Procedure")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_13, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "PROC"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "CAPTION")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rincian_dx.proc, function (data) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          icon: "pi pi-copy",
          onClick: function onClick($event) {
            return $options.CopyProc(data.KODE_TINDAKAN);
          },
          "class": "p-button-text"
        }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.KODE_TINDAKAN), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.NAMA_TINDAKAN), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Billing")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_18, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "KATEGORI"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TOTAL")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.databiling, function (data) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.GROUPCBG), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.TOTAL), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      }, "Menambahkan daftar lampiran file")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Pilih Lampiran",
        align: "",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $data.showdialogParam = true;
        }),
        icon: "pi pi-upload",
        "class": "p-button ml-1"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Refresh",
        align: "",
        onClick: _cache[8] || (_cache[8] = function ($event) {
          $options.getdata_lampiran($data.data_trans);
        }),
        icon: "pi pi-refresh",
        "class": "p-button p-button-success"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <video ref=\"video\" width=\"640\" height=\"480\" autoplay></video>\n                    <button @click=\"capture\">Capture</button>\n                    <canvas ref=\"canvas\" width=\"640\" height=\"480\" style=\"display: none;\"></canvas>\n                    <img :src=\"imageData\" alt=\"Captured Image\" v-if=\"imageData\"> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Lampiran")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Galleria, {
        value: $data.list_lampiran,
        activeIndex: $data.activeIndex,
        "onUpdate:activeIndex": _cache[9] || (_cache[9] = function ($event) {
          return $data.activeIndex = $event;
        }),
        responsiveOptions: $data.responsiveOptions,
        numVisible: 7,
        containerStyle: "max-width: 850px",
        circular: true,
        fullScreen: true,
        showItemNavigators: true,
        showThumbnails: false,
        visible: $data.displayCustom,
        "onUpdate:visible": _cache[10] || (_cache[10] = function ($event) {
          return $data.displayCustom = $event;
        })
      }, {
        item: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
            src: slotProps.item.file_lampiran,
            alt: slotProps.item.caption_file,
            style: {
              "width": "100%",
              "display": "block"
            }
          }, null, 8 /* PROPS */, _hoisted_23)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value", "activeIndex", "responsiveOptions", "visible"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.list_lampiran, function (image, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          "class": "card-img-top",
          src: image.file_lampiran,
          alt: "Dist Photo 1"
        }, null, 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(image.caption_file), 1 /* TEXT */), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": "card-text text-white pb-2 pt-1"
        }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          align: "",
          onClick: function onClick($event) {
            return $options.imageClick(index);
          },
          icon: "pi pi-search",
          "class": "p-button p-button-success",
          style: {
            "width": "5em"
          }
        }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          align: "",
          onClick: function onClick($event) {
            return $options.hapusLampiranGambar(index);
          },
          icon: "pi pi-times",
          "class": "p-button p-button-danger",
          style: {
            "width": "5em"
          }
        }, null, 8 /* PROPS */, ["onClick"])])])]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    fixTableHead: "",
    value: $data.fact,
    rowHover: true,
    columnResizeMode: "fit",
    selectionMode: "single",
    stripedRows: "",
    sortMode: "multiple",
    "class": "p-datatable-sm mt-4",
    responsiveLayout: "scroll",
    resizableColumns: true,
    paginator: true,
    rows: 10,
    filters: $data.filters1,
    "onUpdate:filters": _cache[14] || (_cache[14] = function ($event) {
      return $data.filters1 = $event;
    }),
    rowsPerPageOptions: [10, 20, 50, 100, 200]
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-search"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
        modelValue: $data.filters1['global'].value,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
          return $data.filters1['global'].value = $event;
        }),
        placeholder: "Pencarian"
      }, null, 8 /* PROPS */, ["modelValue"])])])];
    }),
    loading: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _toConsumableArray(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Loading customers data. Please wait. ", -1 /* CACHED */)]));
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "ID",
        header: "ID"
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return _toConsumableArray(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            "class": "p-input-icon-left"
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
            "class": "pi pi-tag"
          })], -1 /* CACHED */)]));
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "",
        sortable: true,
        header: "STTS_CODER",
        styles: {
          'width': '10em'
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [slotProps.data.STTS_CODER == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button icon=\"pi\" class=\"p-button p-button-success\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Badge, {
            value: "Ok",
            severity: "success",
            "class": "mr-2"
          })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), slotProps.data.STTS_CODER == 2 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button icon=\"pi\" class=\"p-button p-button-warning\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Badge, {
            value: slotProps.data.CTT_CODER,
            severity: "warning",
            "class": "mr-2"
          }, null, 8 /* PROPS */, ["value"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "",
        sortable: true,
        header: "RINCIAN"
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
            icon: "pi",
            "class": "p-button p-button-sm p-button-default",
            onClick: function onClick($event) {
              return $options.getdata_dx(slotProps.data);
            }
          }, null, 8 /* PROPS */, ["onClick"])];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NOSEP",
        sortable: true,
        header: "NOSEP"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NAMAPASIEN",
        sortable: true,
        header: "NAMAPASIEN"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NAMADOKTER",
        sortable: true,
        header: "NAMADOKTER"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NOMR",
        sortable: true,
        header: "NOMR"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "TGLREG",
        sortable: true,
        header: "TGLREG"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "POLI",
        sortable: true,
        header: "POLI"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "STTS_PULANG",
        sortable: true,
        header: "STTS_PULANG"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "",
        sortable: true,
        header: "SUDAHFINALCLAIM"
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [slotProps.data.SUDAHFINALCLAIM === 'SENT/FINAL' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Badge, {
            value: "SENT/FINAL",
            severity: "success",
            "class": "mr-2"
          })])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Badge, {
            value: slotProps.data.SUDAHFINALCLAIM,
            severity: "warning",
            "class": "mr-2"
          }, null, 8 /* PROPS */, ["value"])]))];
        }),
        _: 1 /* STABLE */
      })];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "filters"])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-footer"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Upload file",
    visible: $data.showdialogParam,
    "onUpdate:visible": _cache[16] || (_cache[16] = function ($event) {
      return $data.showdialogParam = $event;
    }),
    containerStyle: {
      width: '50vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        onClick: _cache[15] || (_cache[15] = function ($event) {
          return $data.showdialogParam = false;
        }),
        "class": "p-button-text"
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_upload_file, {
        noregister: $data.data_trans.NOPENDAFTARAN,
        moduleupload: $data.modeduleFrom,
        foldername: $data.form.foldername
      }, null, 8 /* PROPS */, ["noregister", "moduleupload", "foldername"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"])]);
}

/***/ }),

/***/ "./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardKlaimComponent_vue_vue_type_template_id_6d93c7d9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9 */ "./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9");
/* harmony import */ var _DashboardKlaimComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardKlaimComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DashboardKlaimComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DashboardKlaimComponent_vue_vue_type_template_id_6d93c7d9__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardKlaimComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardKlaimComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardKlaimComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9 ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardKlaimComponent_vue_vue_type_template_id_6d93c7d9__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardKlaimComponent_vue_vue_type_template_id_6d93c7d9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Klaimmanajemen/DashboardKlaimComponent.vue?vue&type=template&id=6d93c7d9");


/***/ })

}]);