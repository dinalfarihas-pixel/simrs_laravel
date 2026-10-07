"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["stock-opname"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
        kategori_selected: '',
        lokasiSelected: '',
        valuedate: ''
      },
      isLoading: false,
      fullPage: true,
      lokasi_display: '',
      datajabatan_user: '',
      tanggal: '',
      data_rs: ''
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    //this.fetchData();
    var uri = window.location.search.substring(1);
    console.log(uri);
    var params = new URLSearchParams(uri);
    var lokasi = params.get("lokasi");
    var kategori = params.get("kategori");
    var bulantahun = params.get("bulantahun");
    this.tanggal = bulantahun;
    this.lokasi_display = params.get("lokasi_display");
    this.getdtaa(lokasi, kategori, bulantahun);
    this.datajabatan_user_func();
    this.profile_rs();
  },
  profile_rs: function profile_rs() {
    var _this = this;
    axios.get('/data_rumahsakit', "").then(function (response) {
      _this.data_rs = response.data;
    })["catch"](function (error) {
      console.log(error);
      _this.isLoading = false;
    })["finally"](function () {
      return _this.isLoading = false;
    });
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    datajabatan_user_func: function datajabatan_user_func() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios.get('/datajabatan_user').then(function (response) {
                _this2.datajabatan_user = response.data;
                _this2.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this2.isLoading = false;
              })["finally"](function () {
                return _this2.isLoading = false;
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    getdtaa: function getdtaa(lokasi, kategori, bulantahun) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var dataform;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              dataform = new FormData();
              _this3.isLoading = true;
              _this3.form.lokasiSelected = {
                id: lokasi
              };
              _this3.form.kategori_selected = {
                name: kategori
              };
              _this3.form.valuedate = bulantahun;
              console.log(_this3.lokasi_param);
              _context2.next = 8;
              return axios.post('/persediaan_data', _this3.form).then(function (response) {
                console.log(response.data);
                _this3.fact = response.data.response;
                _this3.summary = response.data.summary;
                console.log(response.data);
                _this3.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var primevue_datatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/datatable */ "./node_modules/primevue/datatable/index.mjs");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");
/* harmony import */ var primevue_confirmpopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/confirmpopup */ "./node_modules/primevue/confirmpopup/index.mjs");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/api */ "./node_modules/@primevue/core/api/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default()),
    DataTable: primevue_datatable__WEBPACK_IMPORTED_MODULE_3__["default"],
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_4__["default"],
    ConfirmPopup: primevue_confirmpopup__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      kategori: ['OBAT-OBATAN', 'BMHP', 'BHP NONMEDIS'],
      lokasi_arr: [],
      finaldialog: false,
      header_opname: '',
      summary: {
        totalItem: 0,
        telahOpname: 0,
        persentase: 0,
        total_persediaan: 0,
        selisih_plus: 0,
        selisih_minus: 0,
        net_selisih: 0,
        status: ''
      },
      form: {
        startdate: '',
        lokasiSelected: '',
        kategoriSelected: '',
        data: []
      },
      isLoading: false,
      fullPage: true,
      filters2: {},
      stock_out_in: {
        STOCK_IN: 0,
        STOCK_OUT: 0
      }
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  created: function created() {
    this.get_lokasi();
    this.initFilters2();
  },
  methods: {
    initFilters2: function initFilters2() {
      this.filters2 = {
        'global': {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_2__.FilterMatchMode.CONTAINS
        }
      };
    },
    rekap_stock_in_out: function rekap_stock_in_out() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isLoading = true;
              _this.form.bulanthn = _this.form.startdate;
              _context.next = 4;
              return axios.post('/rekap_stock_in_out', _this.form).then(function (response) {
                if (response.data.response.length > 0) {
                  _this.stock_out_in = response.data.response[0];
                  console.log(_this.stock_out_in);
                }
              })["catch"](function (error) {
                console.log(error);
                _this.isLoading = false;
              })["finally"](function () {
                return _this.isLoading = false;
              });
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    open: function open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 5000,
        dismissible: true
      });
    },
    laporan_stock_opname: function laporan_stock_opname() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.isLoading = true;
              _context2.prev = 1;
              _this2.rekap_stock_in_out();
              _context2.next = 5;
              return axios.post('/laporan_stock_opname', _this2.form);
            case 5:
              response = _context2.sent;
              _this2.fact = response.data.response || [];
              _this2.summary = response.data.summary || {};
              _context2.next = 14;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              _this2.open('error', 'Gagal mengambil data');
            case 14:
              _context2.prev = 14;
              _this2.isLoading = false;
              return _context2.finish(14);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 10, 14, 17]]);
      }))();
    },
    show_final_dialog_func: function show_final_dialog_func() {
      this.header_opname = this.form.kategoriSelected || 'Stock Opname';
      this.finaldialog = true;
    },
    closefinalDialog: function closefinalDialog() {
      this.finaldialog = false;
    },
    finishing_opname: function finishing_opname() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.isLoading = true;
              _this3.form.data = _this3.fact;
              _this3.closefinalDialog();
              _context3.prev = 3;
              _context3.next = 6;
              return axios.post('/finishing_opname', _this3.form);
            case 6:
              response = _context3.sent;
              if (response.data.metadata.code === 200) {
                _this3.open('success', response.data.metadata.message);
              } else {
                _this3.open('warning', response.data.metadata.message);
              }
              _context3.next = 14;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              console.error(_context3.t0);
              _this3.open('error', 'Gagal menyelesaikan opname');
            case 14:
              _context3.prev = 14;
              _this3.isLoading = false;
              return _context3.finish(14);
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 10, 14, 17]]);
      }))();
    },
    get_lokasi: function get_lokasi() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this4.isLoading = true;
              _context4.prev = 1;
              _context4.next = 4;
              return axios.get('/getlokasi-api');
            case 4:
              response = _context4.sent;
              _this4.lokasi_arr = response.data.response.filter(function (x) {
                return x.IS_HQ === 1;
              });
              _context4.next = 11;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              console.error(_context4.t0);
            case 11:
              _context4.prev = 11;
              _this4.isLoading = false;
              return _context4.finish(11);
            case 14:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 8, 11, 14]]);
      }))();
    },
    arsipkan_item_barang: function arsipkan_item_barang(data) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response, index;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this5.form.data = data;
              _this5.form.mode = 3;
              _context5.prev = 2;
              _context5.next = 5;
              return axios.post('/arsipkan_item_barang', _this5.form);
            case 5:
              response = _context5.sent;
              index = _this5.fact.findIndex(function (item) {
                return item.SUB_BARCODE === data.SUB_BARCODE;
              });
              if (response.data.metadata.code === 200) {
                _this5.open('success', response.data.metadata.message);
                if (index > -1) {
                  _this5.fact.splice(index, 1);
                }
              } else {
                _this5.open('warning', response.data.metadata.message);
              }
              _context5.next = 14;
              break;
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](2);
              console.error(_context5.t0);
              _this5.open('error', 'Gagal mengarsipkan item');
            case 14:
              _context5.prev = 14;
              _this5.isLoading = false;
              return _context5.finish(14);
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 10, 14, 17]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bus */ "./resources/js/components/bus.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/divider */ "./node_modules/primevue/divider/index.mjs");
/* harmony import */ var primevue_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/datatable */ "./node_modules/primevue/datatable/index.mjs");
/* harmony import */ var primevue_column__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/column */ "./node_modules/primevue/column/index.mjs");
/* harmony import */ var primevue_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/tag */ "./node_modules/primevue/tag/index.mjs");
/* harmony import */ var primevue_iconfield__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/iconfield */ "./node_modules/primevue/iconfield/index.mjs");
/* harmony import */ var primevue_inputicon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primevue/inputicon */ "./node_modules/primevue/inputicon/index.mjs");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/api */ "./node_modules/@primevue/core/api/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default()),
    Divider: primevue_divider__WEBPACK_IMPORTED_MODULE_3__["default"],
    DataTable: primevue_datatable__WEBPACK_IMPORTED_MODULE_4__["default"],
    Column: primevue_column__WEBPACK_IMPORTED_MODULE_5__["default"],
    Tag: primevue_tag__WEBPACK_IMPORTED_MODULE_6__["default"],
    IconField: primevue_iconfield__WEBPACK_IMPORTED_MODULE_7__["default"],
    InputIcon: primevue_inputicon__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      data_list_laporan: [],
      temp_data_list_laporan: [],
      loadingItem: [],
      ModalLaporanOpname: false,
      counter: 0,
      summary: {
        totalItem: 0,
        telahOpname: 0,
        persentase: 0,
        total_persediaan: 0,
        selisih_plus: 0,
        selisih_minus: 0,
        net_selisih: 0,
        status: ''
      },
      listkategori: ['OBAT-OBATAN', 'BMHP', 'BHP NON MEDIS'],
      form: {
        startdate: '',
        bulanthn: '',
        enddate: '',
        mode: 1,
        kategori: 'OBAT-OBATAN',
        itembarang: '',
        barcode: '',
        barangSelected: null,
        detailsItem: [],
        kategoriSelected: '',
        lokasiSelected: ''
      },
      isLoading: false,
      fullPage: true,
      filters2: {},
      stock_out_in: {
        STOCK_IN: 0,
        STOCK_OUT: 0
      }
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    this.form.bulanthn = currentDate;
  },
  created: function created() {
    //this.getdatabarang_foropname();

    this.initFilters2();
  },
  methods: {
    fetchData: function fetchData() {
      console.log(this.form.startdate);
    },
    initFilters2: function initFilters2() {
      this.filters2 = {
        'global': {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_2__.FilterMatchMode.CONTAINS
        }
      };
    },
    hapus_item: function hapus_item(index) {
      this.form.detailsItem.splice(index, 1);
    },
    hitungselisih: function hitungselisih(index, data) {
      var _this = this;
      this.$nextTick(function () {
        _this.hitungTotalFisik(index, data);
      });
    },
    hitungTotalFisik: function hitungTotalFisik(index, data) {
      var total_fisik = 0;
      for (var i = 0; i < this.form.detailsItem[index].details.length; i++) {
        if (data.SUB_BARCODE == this.form.detailsItem[index].details[i].SUB_BARCODE) {
          this.form.detailsItem[index].details[i].SELISIH = this.form.detailsItem[index].details[i].STOCK_FISIK - this.form.detailsItem[index].details[i].QTY;
        }
        var total = this.form.detailsItem[index].details[i].SELISIH * this.form.detailsItem[index].details[i].HARGA;
        total_fisik = total_fisik + total;
      }
      this.form.detailsItem[index].TOTAL_FISIK = total_fisik;
    },
    laporan_stock_opname: function laporan_stock_opname() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.ModalLaporanOpname = true;
              // this.isLoading = true;
              // try {
              //     const response = await axios.post('/laporan_stock_opname', this.form);
              //     this.fact = response.data.response || [];
              //     this.summary = response.data.summary || {};
              // } catch (error) {
              //     console.error(error);
              //     this.open('error', 'Gagal mengambil data');
              // } finally {
              //     this.isLoading = false;
              // }
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    rekap_stock_in_out: function rekap_stock_in_out() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              _context2.next = 3;
              return axios.post('/rekap_stock_in_out', _this3.form).then(function (response) {
                if (response.data.response.length > 0) {
                  _this3.stock_out_in = response.data.response[0];
                  console.log(_this3.stock_out_in);
                }
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
    get_data_laporan_stock_opname: function get_data_laporan_stock_opname() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this4.isLoading = true;
              _context3.next = 3;
              return axios.post('/laporan_stock_opname', _this4.form).then(function (response) {
                _this4.data_list_laporan = response.data.response;
                _this4.temp_data_list_laporan = response.data.response;
                _this4.summary = response.data.summary || {};
                _this4.isLoading = false;
                _this4.rekap_stock_in_out();
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
    },
    filter_by_sudah: function filter_by_sudah(stts) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this5.isLoading = true;
              _context4.next = 3;
              return _this5.get_data_laporan_stock_opname();
            case 3:
              _this5.data_list_laporan = _this5.temp_data_list_laporan.filter(function (item) {
                return item.STTS === stts;
              });
              _this5.isLoading = false;
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    open: function open(type, message) {
      _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.$emit('show-alert', {
        type: type,
        message: message
      });
    },
    simpan_hasil_opname: function simpan_hasil_opname(index) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var currentDate;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              currentDate = new Date();
              _this6.form.detailsItem[index].bulanthn = _this6.form.bulanthn;
              _this6.form.detailsItem[index].startdate = currentDate;
              _this6.isLoading = true;
              _context5.next = 6;
              return axios.post('/simpan_stock_opaname', _this6.form.detailsItem[index]).then(function (response) {
                _this6.isLoading = false;
                console.log(response.data);
                if (response.data.metadata.code == 200) {
                  _this6.open('success', 'Data tersimpan');
                  if (_this6.form.detailsItem[index].SAVED == true) {
                    return;
                  }
                  _this6.form.detailsItem[index].SAVED = !_this6.form.detailsItem[index].SAVED;
                  _this6.form.detailsItem[index].CAPTION_SAVE = 'Telah disimpan';
                } else {
                  _this6.open('warning', response.data.metadata.message);
                }
              })["catch"](function (error) {
                console.log(error);
                _this6.isLoading = false;
              })["finally"](function () {
                return _this6.isLoading = false;
              });
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    call_data_barang: function call_data_barang(event) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var query;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              console.log(event);
              _this7.form.mode = 3;
              query = event.value;
              if (!(!query || query.length <= 3)) {
                _context6.next = 6;
                break;
              }
              _this7.fact = [];
              return _context6.abrupt("return");
            case 6:
              _this7.form.itembarang = query;
              _context6.next = 9;
              return _this7.getdatabarang_foropname(event);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    getdatabarang_foropname: function getdatabarang_foropname() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this8.isLoading = true;
              _context7.next = 3;
              return axios.post('/getdatabarang_foropname', _this8.form).then(function (response) {
                if (_this8.form.mode == 3) {
                  _this8.fact = response.data.response;
                }
                if (_this8.form.mode == 2) {
                  var data = response.data.response[0];
                  data.CAPTION_SAVE = 'Simpan';
                  data.SAVED = false, _this8.counter = _this8.counter + 1;
                  data.RUNNING = _this8.counter;
                  _this8.form.detailsItem.push(data);
                  _this8.form.detailsItem.sort(function (a, b) {
                    return b.RUNNING - a.RUNNING;
                  });
                }
                _this8.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this8.isLoading = false;
              })["finally"](function () {
                return _this8.isLoading = false;
              });
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    getdetails_barang: function getdetails_barang(e) {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _this9.form.mode = 2;
              _this9.form.barcode = e.value['BARCODE'];
              //console.log(e.value);
              _this9.getdatabarang_foropname();
            case 3:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  "class": "card elevation-0"
};
var _hoisted_4 = {
  "class": "card-header"
};
var _hoisted_5 = {
  "class": "card-title"
};
var _hoisted_6 = {
  "class": "row"
};
var _hoisted_7 = {
  "class": "col-12"
};
var _hoisted_8 = {
  "class": ""
};
var _hoisted_9 = ["src"];
var _hoisted_10 = {
  "class": "card-body"
};
var _hoisted_11 = {
  "class": "card elevation-0"
};
var _hoisted_12 = {
  "class": "card-body"
};
var _hoisted_13 = {
  "class": "table table-sm table-striped"
};
var _hoisted_14 = {
  style: {
    "text-align": "right"
  }
};
var _hoisted_15 = {
  style: {
    "text-align": "center",
    "background-color": "bisque"
  }
};
var _hoisted_16 = {
  "class": "card-footer"
};
var _hoisted_17 = {
  "class": "row"
};
var _hoisted_18 = {
  "class": "col-md-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.data_rs['logo'],
    height: "40px",
    width: "40px"
  }, null, 8 /* PROPS */, _hoisted_9)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_rs['nama_rs']) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <small class=\"float-right\"><a href=\"/printout-pr\" rel=\"noopener\" target=\"_blank\" class=\"btn btn-default\"><i class=\"fas fa-print\"></i> Print</a></small> ")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Format Stock Opname", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("STOCK LOKASI : ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.lokasi_display), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_13, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "No"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "SUB BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "NAMA PERSEDIAAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "SATUAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "HARGA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center",
      "background-color": "bisque"
    }
  }, "STOCK SISTEM"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "EXP"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "text-align": "center"
    }
  }, "FISIK")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.fact, function (data) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.running_number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.barcode), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.subbarcode), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.nama_barang), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.satuan), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(data.harga_beli, '0,0.00')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(data.stock_akhir, '0,0.00')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.expired_date), 1 /* TEXT */), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      style: {
        "color": "gainsboro"
      }
    }, ".............")], -1 /* CACHED */))]);
  }), 256 /* UNKEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "col-md-4"
  }, null, -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "col-md-4"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tanggal) + ", Mengetahui", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datajabatan_user.JABATAN), 1 /* TEXT */), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datajabatan_user.JENIS_NOINDUK) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datajabatan_user.NOINDUK), 1 /* TEXT */)])])])])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_7 = {
  "class": "info-box bg-info"
};
var _hoisted_8 = {
  "class": "info-box-content"
};
var _hoisted_9 = {
  "class": "info-box-number"
};
var _hoisted_10 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_11 = {
  "class": "info-box bg-warning"
};
var _hoisted_12 = {
  "class": "info-box-content"
};
var _hoisted_13 = {
  "class": "info-box-number"
};
var _hoisted_14 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_15 = {
  "class": "info-box bg-orange"
};
var _hoisted_16 = {
  "class": "info-box-content"
};
var _hoisted_17 = {
  "class": "info-box-number"
};
var _hoisted_18 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_19 = {
  "class": "info-box bg-success"
};
var _hoisted_20 = {
  "class": "info-box-content"
};
var _hoisted_21 = {
  "class": "info-box-number"
};
var _hoisted_22 = {
  "class": "row"
};
var _hoisted_23 = {
  "class": "col-3"
};
var _hoisted_24 = {
  "class": "info-box bg-lightgreen"
};
var _hoisted_25 = {
  "class": "info-box-content"
};
var _hoisted_26 = {
  "class": "info-box-number"
};
var _hoisted_27 = {
  "class": "col-3"
};
var _hoisted_28 = {
  "class": "info-box bg-lightred"
};
var _hoisted_29 = {
  "class": "info-box-content"
};
var _hoisted_30 = {
  "class": "info-box-number"
};
var _hoisted_31 = {
  "class": "col-3"
};
var _hoisted_32 = {
  "class": "info-box bg-default"
};
var _hoisted_33 = {
  "class": "info-box-content"
};
var _hoisted_34 = {
  "class": "info-box-number text-primary"
};
var _hoisted_35 = {
  "class": "col-3"
};
var _hoisted_36 = {
  "class": "info-box bg-default"
};
var _hoisted_37 = {
  "class": "info-box-content"
};
var _hoisted_38 = {
  "class": "info-box-number"
};
var _hoisted_39 = {
  "class": "card"
};
var _hoisted_40 = {
  "class": "row mt-3 ml-3"
};
var _hoisted_41 = {
  "class": "col-1"
};
var _hoisted_42 = {
  "class": "card-body"
};
var _hoisted_43 = {
  "class": "table-header"
};
var _hoisted_44 = {
  "class": "row"
};
var _hoisted_45 = {
  "class": "col-md-7 col-sm-7 col-4 mt-0"
};
var _hoisted_46 = {
  "class": "p-input-icon-left"
};
var _hoisted_47 = {
  key: 0
};
var _hoisted_48 = {
  "class": "badge badge-success"
};
var _hoisted_49 = {
  key: 1
};
var _hoisted_50 = {
  "class": "badge badge-danger"
};
var _hoisted_51 = {
  key: 0
};
var _hoisted_52 = {
  "class": "m-0"
};
var _hoisted_53 = {
  "class": "m-0"
};
var _hoisted_54 = {
  key: 1,
  "class": "text-muted"
};
var _hoisted_55 = ["onClick"];
var _hoisted_56 = {
  "class": "card-footer"
};
var _hoisted_57 = {
  key: 0,
  "class": "mr-3"
};
var _hoisted_58 = {
  "class": "badge badge-info"
};
var _hoisted_59 = {
  "class": "card"
};
var _hoisted_60 = {
  "class": "card-body"
};
var _hoisted_61 = {
  "class": "row"
};
var _hoisted_62 = {
  "class": "col-md-12"
};
var _hoisted_63 = {
  "class": "row"
};
var _hoisted_64 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_65 = {
  "class": "info-box bg-info"
};
var _hoisted_66 = {
  "class": "info-box-content"
};
var _hoisted_67 = {
  "class": "info-box-number"
};
var _hoisted_68 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_69 = {
  "class": "info-box bg-warning"
};
var _hoisted_70 = {
  "class": "info-box-content"
};
var _hoisted_71 = {
  "class": "info-box-number"
};
var _hoisted_72 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_73 = {
  "class": "info-box bg-orange"
};
var _hoisted_74 = {
  "class": "info-box-content"
};
var _hoisted_75 = {
  "class": "info-box-number"
};
var _hoisted_76 = {
  "class": "col-12 col-sm-3 col-md-3"
};
var _hoisted_77 = {
  "class": "info-box bg-success"
};
var _hoisted_78 = {
  "class": "info-box-content"
};
var _hoisted_79 = {
  "class": "info-box-number"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Calendar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Calendar");
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_downloadExcel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("downloadExcel");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  var _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Data Kunjungan Pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
    modelValue: $data.form.startdate,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.startdate = $event;
    }),
    "class": "text-sm",
    showIcon: true,
    view: "month",
    dateFormat: "mm/yy",
    yearNavigator: true,
    yearRange: "2000:2030",
    "aria-placeholder": "Tanggal awal",
    style: {
      "width": "10em"
    }
  }, null, 8 /* PROPS */, ["modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    "class": "multiselect-custom",
    id: "lokasi",
    name: "CAPION",
    modelValue: $data.form.lokasiSelected,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.lokasiSelected = $event;
    }),
    options: $data.lokasi_arr,
    optionLabel: "DISPLAY",
    filter: "",
    placeholder: "Stok lokasi",
    display: "chip"
  }, null, 8 /* PROPS */, ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    "class": "multiselect-custom",
    id: "kategori",
    name: "CAPION",
    modelValue: $data.form.kategoriSelected,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.kategoriSelected = $event;
    }),
    options: $data.kategori,
    optionLabel: "",
    placeholder: "Pilih kategori persediaan",
    display: "chip"
  }, null, 8 /* PROPS */, ["modelValue", "options"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Tampilkan",
    align: "",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.laporan_stock_opname();
    }),
    icon: "pi pi-check",
    "class": "p-button"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Summary Cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Jumlah Item Persediaan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.totalItem), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Telah SO", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.telahOpname) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.persentase) + "%)", 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Total Persediaan Setelah SO", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.total_persediaan, '0,0.00')), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Selisih (SO)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.net_selisih, '0,0.00')), 1 /* TEXT */)])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Difference Summary "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Selisih Lebih", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.selisih_plus, '0,0.00')), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Selisih Kurang", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.selisih_minus, '0,0.00')), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Stock IN", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.stock_out_in.STOCK_IN, '0,0.00')), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "info-box-text"
  }, "Stock OUT", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.stock_out_in.STOCK_OUT, '0,0.00')), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Data Table "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_downloadExcel, {
    "class": "btn btn-block btn-success btn-sm",
    data: $data.fact && $data.fact.length > 0 ? $data.fact : [],
    worksheet: "Stock Opname",
    name: "laporan_stock_opname.xls"
  }, null, 8 /* PROPS */, ["data"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    fixTableHead: "",
    value: $data.fact,
    rowHover: true,
    columnResizeMode: "fit",
    selectionMode: "single",
    stripedRows: "",
    sortMode: "multiple",
    "class": "p-datatable-sm",
    responsiveLayout: "scroll",
    resizableColumns: false,
    paginator: true,
    rows: 10,
    filters: $data.filters2,
    "onUpdate:filters": _cache[6] || (_cache[6] = function ($event) {
      return $data.filters2 = $event;
    }),
    rowsPerPageOptions: [10, 20, 50, 100, 200, 500, 1000]
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-search"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
        modelValue: $data.filters2['global'].value,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.filters2['global'].value = $event;
        }),
        placeholder: "Pencarian"
      }, null, 8 /* PROPS */, ["modelValue"])])])])])];
    }),
    loading: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return _toConsumableArray(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Loading data. Please wait. ", -1 /* CACHED */)]));
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NO",
        sortable: true,
        header: "NO",
        style: {
          "width": "5%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "SUB_BARCODE",
        sortable: true,
        header: "SUB BARCODE",
        style: {
          "width": "10%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "BARCODE",
        sortable: true,
        header: "BARCODE",
        style: {
          "width": "8%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "KATEGORI",
        sortable: true,
        header: "KATEGORI",
        style: {
          "width": "10%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "NAMA",
        sortable: true,
        header: "NAMA",
        style: {
          "width": "15%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "STTS",
        sortable: true,
        header: "STATUS",
        style: {
          "width": "8%"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [slotProps.data.STTS === 'SUDAH' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.STTS), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.STTS), 1 /* TEXT */)]))];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "HARGA_POKOK",
        sortable: true,
        header: "HARGA POKOK",
        style: {
          "width": "10%",
          "text-align": "right"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Rp." + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.HARGA_POKOK, '0,0.00')), 1 /* TEXT */)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "QTY_SISTEM",
        sortable: true,
        header: "QTY SISTEM",
        style: {
          "width": "8%",
          "text-align": "right"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.QTY_SISTEM, '0,0')), 1 /* TEXT */)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "QTY_FISIK",
        sortable: true,
        header: "QTY FISIK",
        style: {
          "width": "8%",
          "text-align": "right"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.QTY_FISIK, '0,0')), 1 /* TEXT */)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "SELISIH",
        sortable: true,
        header: "SELISIH",
        style: {
          "width": "8%",
          "text-align": "right"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(slotProps.data.SELISIH < 0 ? 'text-danger' : 'text-success')
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.SELISIH, '0,0')), 3 /* TEXT, CLASS */)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "TGL_EXPIRED",
        sortable: true,
        header: "TGL EXPIRED",
        style: {
          "width": "10%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "BATCH_NUMBER",
        sortable: true,
        header: "BATCH",
        style: {
          "width": "8%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "CATATAN",
        sortable: true,
        header: "CATATAN",
        style: {
          "width": "10%"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        header: "VERIFIKASI",
        style: {
          "width": "12%"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [slotProps.data.TGL_CONFIRM ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.TGL_CONFIRM), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.CONFIRM_BY), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_54, "Belum diverifikasi"))];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        header: "AKSI",
        style: {
          "width": "10%"
        }
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            onClick: function onClick($event) {
              return $options.arsipkan_item_barang(slotProps.data);
            },
            "class": "btn btn-block btn-info btn-sm"
          }, "Non Aktifkan", 8 /* PROPS */, _hoisted_55)];
        }),
        _: 1 /* STABLE */
      })];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "filters"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [$data.summary.status ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_57, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Status:", -1 /* CACHED */)), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.status), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Verifikasi Selesai",
    align: "",
    onClick: _cache[7] || (_cache[7] = function ($event) {
      return $options.show_final_dialog_func();
    }),
    icon: "pi pi-check",
    "class": "p-button"
  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Final Verification Dialog "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: 'Closing Opname ' + $data.header_opname,
    visible: $data.finaldialog,
    "onUpdate:visible": _cache[10] || (_cache[10] = function ($event) {
      return $data.finaldialog = $event;
    }),
    containerStyle: {
      width: '85vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Batal",
        icon: "pi pi-times",
        onClick: _cache[8] || (_cache[8] = function ($event) {
          return $options.closefinalDialog();
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Verifikasi Hasil Stock Opname",
        icon: "pi pi-check",
        onClick: _cache[9] || (_cache[9] = function ($event) {
          return $options.finishing_opname();
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Jumlah Item", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.totalItem), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Telah SO", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.telahOpname) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summary.persentase) + "%)", 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Total Persediaan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.total_persediaan, '0,0.00')), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Selisih Netto", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Rp.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.net_selisih, '0,0.00')), 1 /* TEXT */)])])])])])])])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["header", "visible"])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card elevation-0"
};
var _hoisted_4 = {
  "class": "card-body"
};
var _hoisted_5 = {
  "class": "card elevation-0"
};
var _hoisted_6 = {
  "class": "card-body"
};
var _hoisted_7 = {
  "class": "p-d-flex p-jc-between p-ai-center",
  style: {
    "width": "100%"
  }
};
var _hoisted_8 = {
  style: {
    "font-weight": "600"
  }
};
var _hoisted_9 = {
  "class": "card elevation-0"
};
var _hoisted_10 = {
  "class": "card-body table-sm table-responsive p-0",
  style: {
    "height": "800px"
  }
};
var _hoisted_11 = {
  "class": "so-item-header"
};
var _hoisted_12 = {
  "class": "so-item-title"
};
var _hoisted_13 = {
  "class": "so-item-total"
};
var _hoisted_14 = {
  "class": "so-total-value"
};
var _hoisted_15 = {
  "class": "table table-sm table-bordered table-striped so-table mb-0"
};
var _hoisted_16 = {
  "class": "so-cell-sub"
};
var _hoisted_17 = ["onUpdate:modelValue"];
var _hoisted_18 = ["onUpdate:modelValue"];
var _hoisted_19 = ["onUpdate:modelValue"];
var _hoisted_20 = ["onUpdate:modelValue"];
var _hoisted_21 = {
  "class": "so-tfoot"
};
var _hoisted_22 = ["onClick"];
var _hoisted_23 = ["onClick"];
var _hoisted_24 = {
  "class": "row summary-row"
};
var _hoisted_25 = {
  "class": "col-2 summary-item"
};
var _hoisted_26 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_27 = {
  "class": "info-box-content"
};
var _hoisted_28 = {
  "class": "info-box-number"
};
var _hoisted_29 = {
  "class": "col-2 summary-item"
};
var _hoisted_30 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_31 = {
  "class": "info-box-content"
};
var _hoisted_32 = {
  "class": "info-box-number"
};
var _hoisted_33 = {
  "class": "col-2 summary-item"
};
var _hoisted_34 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_35 = {
  "class": "info-box-content"
};
var _hoisted_36 = {
  "class": "info-box-number text-success"
};
var _hoisted_37 = {
  "class": "col-2 summary-item"
};
var _hoisted_38 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_39 = {
  "class": "info-box-content"
};
var _hoisted_40 = {
  "class": "info-box-number text-danger"
};
var _hoisted_41 = {
  "class": "col-2 summary-item"
};
var _hoisted_42 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_43 = {
  "class": "info-box-content"
};
var _hoisted_44 = {
  "class": "info-box-number text-primary"
};
var _hoisted_45 = {
  "class": "col-2 summary-item no-border"
};
var _hoisted_46 = {
  "class": "info-box bg-default elevation-0"
};
var _hoisted_47 = {
  "class": "info-box-content"
};
var _hoisted_48 = {
  "class": "info-box-number text-warning"
};
var _hoisted_49 = {
  "class": "card"
};
var _hoisted_50 = {
  "class": "card-body"
};
var _hoisted_51 = {
  "class": "row"
};
var _hoisted_52 = {
  "class": "col-md-3"
};
var _hoisted_53 = {
  "class": "col-md-3 text-right"
};
var _hoisted_54 = {
  "class": "card elevation-0"
};
var _hoisted_55 = {
  "class": "card-body"
};
var _hoisted_56 = {
  "class": "table-header"
};
var _hoisted_57 = {
  "class": "row"
};
var _hoisted_58 = {
  "class": "col-md-7 col-sm-7 col-4 mt-0"
};
var _hoisted_59 = {
  key: 0
};
var _hoisted_60 = {
  "class": "badge badge-success"
};
var _hoisted_61 = {
  key: 1
};
var _hoisted_62 = {
  "class": "badge badge-danger"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Calendar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Calendar");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  var _component_Tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag");
  var _component_InputNumber = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputNumber");
  var _component_Divider = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Divider");
  var _component_InputIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputIcon");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_IconField = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("IconField");
  var _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  var _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Pilih bulan tahun Stock Opname")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
    modelValue: $data.form.bulanthn,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.bulanthn = $event;
    }),
    "class": "text-sm",
    showIcon: true,
    view: "month",
    dateFormat: "mm/yy",
    minDate: new Date(2000, 0, 1),
    maxDate: new Date(2030, 11, 31),
    "aria-placeholder": "Pilih bulan SO",
    style: {
      "width": "15em"
    }
  }, null, 8 /* PROPS */, ["modelValue", "minDate", "maxDate"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Tampilkan Item Sudah/Belum Opname",
    align: "",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.laporan_stock_opname();
    }),
    icon: "pi pi-list",
    "class": "p-button ml-2"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "List data persediaan")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Select v-model=\"form.barangSelected\" :filter=\"true\" :options=\"fact\" optionLabel=\"BARCODE_NAMA\"\n                        keys=\"id_kategori\" @change=\"getdetails_barang($event)\" placeholder=\"\" style=\"width: 100%;\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    modelValue: $data.form.barangSelected,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.barangSelected = $event;
    }),
    options: $data.fact,
    optionLabel: "BARCODE_NAMA",
    filter: true,
    onChange: _cache[4] || (_cache[4] = function ($event) {
      return $options.getdetails_barang($event);
    }),
    onFilter: _cache[5] || (_cache[5] = function ($event) {
      return $options.call_data_barang($event);
    }),
    placeholder: "Search Item barang...",
    style: {
      "width": "100%"
    }
  }, {
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.option.BARCODE_NAMA), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tag ")])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["modelValue", "options"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.form.detailsItem, function (data, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "so-item-block",
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header item "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": "fas fa-box mr-2 text-primary"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.RUNNING) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.BARCODE_NAMA), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "class": "so-total-label"
    }, "Persediaan Fisik:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(data.TOTAL, '0,0.00')), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_15, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "16%"
      }
    }, "SUB BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "9%"
      }
    }, "HARGA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "10%"
      }
    }, "TGL EXP"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "11%"
      }
    }, "BATCH"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "8%"
      }
    }, "STK SISTEM"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "9%"
      }
    }, "STK FISIK"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
      style: {
        "width": "9%"
      }
    }, "SELISIH"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "CATATAN")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(data.details, function (details) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
        key: details.SUB_BARCODE
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "class": "form-control form-control-sm",
        disabled: "",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.SUB_BARCODE = $event;
        },
        type: "text"
      }, null, 8 /* PROPS */, _hoisted_17), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, details.SUB_BARCODE]]), details.ARSIPKAN == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Tag, {
        key: 0,
        value: "NON AKTIF",
        severity: "warning",
        "class": "so-tag-nonaktif"
      })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
        disabled: "",
        minFractionDigits: 0,
        maxFractionDigits: 0,
        modelValue: details.HARGA,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.HARGA = $event;
        },
        style: {
          "width": "100%"
        },
        inputStyle: {
          textAlign: 'right'
        }
      }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        disabled: "",
        autocomplete: "off",
        type: "text",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.TGL_EXPIRED = $event;
        },
        "class": "form-control form-control-sm"
      }, null, 8 /* PROPS */, _hoisted_18), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, details.TGL_EXPIRED]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        disabled: "",
        autocomplete: "off",
        type: "text",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.BATCH_NUMBER = $event;
        },
        "class": "form-control form-control-sm"
      }, null, 8 /* PROPS */, _hoisted_19), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, details.BATCH_NUMBER]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
        disabled: "",
        minFractionDigits: 0,
        maxFractionDigits: 0,
        modelValue: details.QTY,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.QTY = $event;
        },
        style: {
          "width": "100%"
        },
        inputStyle: {
          textAlign: 'right'
        }
      }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
        onBlur: function onBlur($event) {
          return $options.hitungselisih(index, details);
        },
        minFractionDigits: 0,
        maxFractionDigits: 0,
        modelValue: details.STOCK_FISIK,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.STOCK_FISIK = $event;
        },
        style: {
          "width": "100%"
        },
        inputStyle: {
          textAlign: 'right'
        }
      }, null, 8 /* PROPS */, ["onBlur", "modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
        disabled: "",
        minFractionDigits: 2,
        maxFractionDigits: 2,
        modelValue: details.SELISIH,
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.SELISIH = $event;
        },
        style: {
          "width": "100%"
        },
        inputStyle: {
          textAlign: 'right',
          color: details.SELISIH < 0 ? '#dc3545' : details.SELISIH > 0 ? '#28a745' : ''
        }
      }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "inputStyle"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        autocomplete: "off",
        type: "text",
        style: {
          "text-transform": "uppercase"
        },
        "class": "form-control form-control-sm",
        "onUpdate:modelValue": function onUpdateModelValue($event) {
          return details.CATATAN = $event;
        }
      }, null, 8 /* PROPS */, _hoisted_20), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, details.CATATAN]])])]);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tfoot", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      onClick: function onClick($event) {
        return $options.hapus_item(index);
      },
      "class": "btn btn-danger btn-sm btn-block"
    }, _toConsumableArray(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": "fas fa-trash mr-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hapus ", -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_22)]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
      colspan: "5"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
      minFractionDigits: 0,
      maxFractionDigits: 0,
      modelValue: data.TOTAL_FISIK,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return data.TOTAL_FISIK = $event;
      },
      style: {
        "width": "100%"
      },
      inputStyle: {
        textAlign: 'right',
        fontWeight: '600'
      }
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(data.SAVED ? 'btn btn-success btn-sm btn-block' : 'btn btn-primary btn-sm btn-block'),
      onClick: function onClick($event) {
        return $options.simpan_hasil_opname(index);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(data.SAVED ? 'fas fa-check mr-1' : 'pi pi-save mr-1')
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.CAPTION_SAVE), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_23)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Divider, {
      "class": "my-2"
    })]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Detail Stock Opname",
    visible: $data.ModalLaporanOpname,
    "onUpdate:visible": _cache[13] || (_cache[13] = function ($event) {
      return $data.ModalLaporanOpname = $event;
    }),
    modal: true,
    style: {
      width: '91vw'
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
        active: $data.isLoading,
        "onUpdate:active": _cache[6] || (_cache[6] = function ($event) {
          return $data.isLoading = $event;
        }),
        "is-full-page": $data.fullPage
      }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Total Persediaan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.total_persediaan, '0,0.00')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Selisih (SO)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.net_selisih, '0,0.00')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Selisih Lebih", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.selisih_plus, '0,0.00')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Selisih Kurang", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.summary.selisih_minus, '0,0.00')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Stock IN", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_44, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.stock_out_in.STOCK_IN, '0,0.00')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        "class": "info-box-text"
      }, "Stock OUT", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_48, " Rp " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral($data.stock_out_in.STOCK_OUT, '0,0.00')), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Refresh",
        align: "",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $options.get_data_laporan_stock_opname();
        }),
        icon: "pi pi-refresh"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
        "class": "multiselect-custom",
        id: "kategori",
        name: "CAPION",
        modelValue: $data.form.kategoriSelected,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
          return $data.form.kategoriSelected = $event;
        }),
        options: $data.listkategori,
        optionLabel: "",
        placeholder: "Pilih kategori persediaan",
        display: "chip"
      }, null, 8 /* PROPS */, ["modelValue", "options"])]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "col-md-6"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Sudah SO",
        "class": "p-button-success",
        align: "",
        onClick: _cache[9] || (_cache[9] = function ($event) {
          return $options.filter_by_sudah('SUDAH');
        }),
        icon: "pi pi-list"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Belum SO",
        "class": "p-button-warning",
        align: "",
        onClick: _cache[10] || (_cache[10] = function ($event) {
          return $options.filter_by_sudah('BELUM');
        }),
        icon: "pi pi-list"
      })])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
        value: $data.data_list_laporan,
        rowHover: true,
        selectionMode: "single",
        stripedRows: "",
        sortMode: "multiple",
        "class": "p-datatable-sm",
        scrollable: "",
        scrollHeight: "500px",
        paginator: true,
        rows: 10,
        filters: $data.filters2,
        "onUpdate:filters": _cache[12] || (_cache[12] = function ($event) {
          return $data.filters2 = $event;
        }),
        rowsPerPageOptions: [10, 20, 50, 100, 200, 500, 1000]
      }, {
        header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_IconField, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputIcon, {
                "class": "pi pi-search"
              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
                modelValue: $data.filters2['global'].value,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
                  return $data.filters2['global'].value = $event;
                }),
                placeholder: "Pencarian"
              }, null, 8 /* PROPS */, ["modelValue"])];
            }),
            _: 1 /* STABLE */
          })])])])];
        }),
        loading: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return _toConsumableArray(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Loading data. Please wait. ", -1 /* CACHED */)]));
        }),
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "NO",
            sortable: true,
            header: "NO",
            style: {
              "width": "5%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "SUB_BARCODE",
            sortable: true,
            header: "SUB BARCODE",
            style: {
              "width": "10%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "BARCODE",
            sortable: true,
            header: "BARCODE",
            style: {
              "width": "8%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "KATEGORI",
            sortable: true,
            header: "KATEGORI",
            style: {
              "width": "10%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "NAMA",
            sortable: true,
            header: "NAMA",
            style: {
              "width": "15%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "STTS",
            sortable: true,
            header: "STATUS",
            style: {
              "width": "8%"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
              return [slotProps.data.STTS === 'SUDAH' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.STTS), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_62, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.data.STTS), 1 /* TEXT */)]))];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "HARGA_POKOK",
            sortable: true,
            header: "HARGA POKOK",
            style: {
              "width": "10%",
              "text-align": "right"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Rp." + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.HARGA_POKOK, '0,0.00')), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "QTY_SISTEM",
            sortable: true,
            header: "QTY SISTEM",
            style: {
              "width": "8%",
              "text-align": "right"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.QTY_SISTEM, '0,0')), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "QTY_FISIK",
            sortable: true,
            header: "QTY FISIK",
            style: {
              "width": "8%",
              "text-align": "right"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.QTY_FISIK, '0,0')), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "SELISIH",
            sortable: true,
            header: "SELISIH",
            style: {
              "width": "8%",
              "text-align": "right"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(slotProps.data.SELISIH < 0 ? 'text-danger' : 'text-success')
              }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$numeral(slotProps.data.SELISIH, '0,0')), 3 /* TEXT, CLASS */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "TGL_EXPIRED",
            sortable: true,
            header: "TGL EXPIRED",
            style: {
              "width": "10%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "BATCH_NUMBER",
            sortable: true,
            header: "BATCH",
            style: {
              "width": "8%"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "CATATAN",
            sortable: true,
            header: "CATATAN",
            style: {
              "width": "10%"
            }
          })];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value", "filters"])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"])])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n/* ===== SUMMARY BAR ===== */\n.summary-row .info-box[data-v-c83689bc]        { min-height: 70px; padding: 6px 4px;\n}\n.summary-row .info-box-content[data-v-c83689bc]{ padding: 4px 8px;\n}\n.summary-row .info-box-text[data-v-c83689bc]   { font-size: 12px; color: #6c757d;\n}\n.summary-row .info-box-number[data-v-c83689bc] { font-size: 14px; font-weight: 600; margin-top: 2px;\n}\n.summary-item[data-v-c83689bc]                 { border-right: 1px solid #dee2e6;\n}\n.summary-item.no-border[data-v-c83689bc]       { border-right: none;\n}\n\n/* ===== STOCK OPNAME ITEM BLOCK ===== */\n.so-item-block[data-v-c83689bc] {\n    margin-bottom: 4px;\n}\n.so-item-header[data-v-c83689bc] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    background: #f0f4ff;\n    border: 1px solid #c8d6f0;\n    border-bottom: none;\n    border-radius: 6px 6px 0 0;\n    padding: 7px 12px;\n}\n.so-item-title[data-v-c83689bc] {\n    font-size: .92rem;\n    font-weight: 700;\n    color: #1a3a6b;\n}\n.so-item-total[data-v-c83689bc] {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n}\n.so-total-label[data-v-c83689bc] {\n    font-size: .78rem;\n    color: #666;\n    text-transform: uppercase;\n    letter-spacing: .03em;\n}\n.so-total-value[data-v-c83689bc] {\n    font-size: .92rem;\n    color: #1a3a6b;\n}\n\n/* ===== TABEL ===== */\n.so-table[data-v-c83689bc] {\n    font-size: .82rem;\n    border-radius: 0 0 6px 6px;\n    overflow: hidden;\n}\n.so-table thead th[data-v-c83689bc] {\n    background: #e9eef8;\n    color: #1a3a6b;\n    font-weight: 700;\n    font-size: .75rem;\n    text-transform: uppercase;\n    letter-spacing: .03em;\n    white-space: nowrap;\n    vertical-align: middle;\n    padding: 6px 8px;\n}\n.so-table tbody td[data-v-c83689bc] {\n    vertical-align: middle;\n    padding: 4px 6px;\n}\n.so-table .form-control-sm[data-v-c83689bc] {\n    font-size: .82rem;\n    height: 30px;\n    padding: 3px 6px;\n}\n\n/* SUB BARCODE cell: input + tag dalam satu baris */\n.so-cell-sub[data-v-c83689bc] {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n.so-cell-sub input[data-v-c83689bc] {\n    flex: 1;\n    min-width: 0;\n}\n.so-tag-nonaktif[data-v-c83689bc] {\n    font-size: .65rem;\n    padding: 2px 5px;\n    white-space: nowrap;\n    flex-shrink: 0;\n}\n\n/* InputNumber fill cell */\n.so-table[data-v-c83689bc] .p-inputnumber { width: 100%;\n}\n.so-table[data-v-c83689bc] .p-inputnumber .p-inputtext {\n    font-size: .82rem;\n    height: 30px;\n    padding: 3px 6px;\n    width: 100%;\n}\n\n/* TFOOT */\n.so-tfoot td[data-v-c83689bc] {\n    background: #f8f9fa;\n    padding: 5px 6px;\n    vertical-align: middle;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_style_index_0_id_c83689bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_style_index_0_id_c83689bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_style_index_0_id_c83689bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CetakformatOpnameComponent_vue_vue_type_template_id_73b470e5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5 */ "./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5");
/* harmony import */ var _CetakformatOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CetakformatOpnameComponent.vue?vue&type=script&lang=js */ "./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_CetakformatOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CetakformatOpnameComponent_vue_vue_type_template_id_73b470e5__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LaporanStockOpnameComponent_vue_vue_type_template_id_c4b044a2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2 */ "./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2");
/* harmony import */ var _LaporanStockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LaporanStockOpnameComponent.vue?vue&type=script&lang=js */ "./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_LaporanStockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_LaporanStockOpnameComponent_vue_vue_type_template_id_c4b044a2__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StockOpnameComponent_vue_vue_type_template_id_c83689bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true */ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true");
/* harmony import */ var _StockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockOpnameComponent.vue?vue&type=script&lang=js */ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _StockOpnameComponent_vue_vue_type_style_index_0_id_c83689bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css */ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_StockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_StockOpnameComponent_vue_vue_type_template_id_c83689bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-c83689bc"],['__file',"resources/js/components/persediaan/stockopname/StockOpnameComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CetakformatOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CetakformatOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CetakformatOpnameComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LaporanStockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LaporanStockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LaporanStockOpnameComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StockOpnameComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5 ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CetakformatOpnameComponent_vue_vue_type_template_id_73b470e5__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CetakformatOpnameComponent_vue_vue_type_template_id_73b470e5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/CetakformatOpnameComponent.vue?vue&type=template&id=73b470e5");


/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2 ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LaporanStockOpnameComponent_vue_vue_type_template_id_c4b044a2__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LaporanStockOpnameComponent_vue_vue_type_template_id_c4b044a2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/LaporanStockOpnameComponent.vue?vue&type=template&id=c4b044a2");


/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_template_id_c83689bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_template_id_c83689bc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=template&id=c83689bc&scoped=true");


/***/ }),

/***/ "./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css":
/*!*****************************************************************************************************************************************!*\
  !*** ./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StockOpnameComponent_vue_vue_type_style_index_0_id_c83689bc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/persediaan/stockopname/StockOpnameComponent.vue?vue&type=style&index=0&id=c83689bc&scoped=true&lang=css");


/***/ })

}]);