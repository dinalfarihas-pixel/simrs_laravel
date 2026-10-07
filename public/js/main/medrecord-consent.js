"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["medrecord-consent"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primevue_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/tabs */ "./node_modules/primevue/tabs/index.mjs");
/* harmony import */ var primevue_tablist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/tablist */ "./node_modules/primevue/tablist/index.mjs");
/* harmony import */ var primevue_tab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/tab */ "./node_modules/primevue/tab/index.mjs");
/* harmony import */ var primevue_tabpanels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/tabpanels */ "./node_modules/primevue/tabpanels/index.mjs");
/* harmony import */ var primevue_tabpanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/tabpanel */ "./node_modules/primevue/tabpanel/index.mjs");
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qrcode.vue */ "./node_modules/qrcode.vue/dist/qrcode.vue.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    Tabs: primevue_tabs__WEBPACK_IMPORTED_MODULE_2__["default"],
    TabList: primevue_tablist__WEBPACK_IMPORTED_MODULE_3__["default"],
    Tab: primevue_tab__WEBPACK_IMPORTED_MODULE_4__["default"],
    TabPanels: primevue_tabpanels__WEBPACK_IMPORTED_MODULE_5__["default"],
    TabPanel: primevue_tabpanel__WEBPACK_IMPORTED_MODULE_6__["default"],
    QrcodeVue: qrcode_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['datapasien'],
  //SELAIN CPPT ADALAH SBAR
  data: function data() {
    return {
      fact: [],
      form: {
        startdate: '',
        enddate: '',
        data: ''
      },
      isLoading: false,
      fullPage: true,
      addTandaTangan: false,
      id_consent: 0,
      mode_otto: 2,
      showOtorisasi: false,
      details_ttd: []
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
    this.get_consent_pasien();
  },
  created: function created() {
    //this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
      // this.get_consent_pasien();
    },
    call_oto: function call_oto(mode_otto) {
      this.mode_otto = mode_otto;
      this.showOtorisasi = true;
    },
    ShowTandatangan: function ShowTandatangan(id) {
      this.id_consent = id;
      this.addTandaTangan = true;
    },
    get_consent_pasien: function get_consent_pasien() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //this.form.id = id;
              _this.form.noregister = _this.datapasien.NOPENDAFTARAN;
              _this.isLoading = true;
              _context.next = 4;
              return axios.post('/get_consent_pasien', _this.form).then(function (response) {
                console.log(response.data);
                _this.fact = response.data.response;
                _this.details_ttd = response.data.detail;
                _this.isLoading = false;
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
        duration: 3000,
        dismissible: true
      });
    },
    adddata: function adddata() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.form.data = _this2.$refs.get.getdata(); // Access child's data
              _this2.form.noregister = _this2.datapasien.NOPENDAFTARAN;
              _this2.form.id_consent = _this2.id_consent;
              _this2.isLoading = true;
              _context2.next = 6;
              return axios.post('/simpantanda_list_penanggung_jawab', _this2.form).then(function (response) {
                console.log(response.data);
                if (response.data.metadata.code == 200) {
                  _this2.addTandaTangan = false;
                  _this2.open('success', response.data.metadata.message);
                  _this2.get_consent_pasien();
                } else {
                  _this2.open('warning', response.data.metadata.message);
                }
              })["catch"](function (error) {
                console.log(error);
                _this2.isLoading = false;
              })["finally"](function () {
                return _this2.isLoading = false;
              });
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
      canvas: null,
      x: 0,
      y: 0,
      fact: [],
      canvasStates: [],
      currentStep: -1,
      form: {
        startdate: '',
        enddate: ''
      },
      isDrawing: false,
      isLoading: false,
      fullPage: true
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    var canvas = this.$refs.canvas;
    this.canvas = canvas.getContext('2d');
    this.loadimage();
    //this.drawOnCanvas()
  },
  created: function created() {
    //this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    clearCanvas: function clearCanvas() {
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      // Clear the entire canvas
      ctx.clearRect(0, 0, 450, 450);
      this.loadimage();
    },
    loadimage: function loadimage() {
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = 'https://ws-simrs.net/anatomipic/anatomi1.jpg';
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 450, 450);
      };
    },
    drawLine: function drawLine(x1, y1, x2, y2) {
      var ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      // ctx.globalAlpha = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw: function draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    showCoordinates: function showCoordinates(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    beginDrawing: function beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    stopDrawing: function stopDrawing(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        //this.saveState();
      }
    },
    saveState: function saveState() {
      var canvas = this.$refs.canvas;
      this.currentStep++;
      this.canvasStates = this.canvasStates.slice(0, this.currentStep); // Remove any redo states
      this.canvasStates.push(canvas);
      console.log(this.canvasStates);
    },
    undo: function undo() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.restoreState();
      }
    },
    restoreState: function restoreState() {
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = this.canvasStates[this.currentStep];
      console.log(this.canvasStates);
      img.onload = function () {
        // ctx.clearRect(0, 0, 450, 450);
        // ctx.drawImage("", 0, 0);
        ctx.drawImage("http://127.0.0.1:8000/list-pasien-igd", 0, 0);
      };
    },
    uploadImage: function uploadImage() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var dataURL, blob, formData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dataURL = _this.$refs.canvas.toDataURL("image/png");
              blob = _this.dataURLToBlob(dataURL); // Create FormData and append the blob
              formData = new FormData();
              formData.append('image', blob, 'canvas-image.png');

              // Send the image to the Laravel backend
              _context.next = 6;
              return axios.post('/api/upload-canvas-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(function (response) {
                console.log('Image uploaded successfully:', response.data);
              })["catch"](function (error) {
                console.error('Error uploading image:', error);
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: ['id_consent'],
  data: function data() {
    var _ref;
    return _ref = {
      fact: [],
      form: {
        startdate: '',
        enddate: '',
        datasign: ''
      },
      tandatanganList: [{
        nama: '',
        hubunganSelected: '',
        nohp: ''
      }],
      isLoading: false,
      fullPage: true
    }, _defineProperty(_ref, "tandatanganList", []), _defineProperty(_ref, "hubungandengan_pasien", ['Diri sendiri', 'Suami', 'Istri', 'Anak Kandung']), _ref;
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    //this.fetchData();
    this.addtandTangan();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    addtandTangan: function addtandTangan() {
      this.tandatanganList.push({});
    },
    hapusItem: function hapusItem(index) {
      this.tandatanganList.splice(index, 1);
    },
    getdata: function getdata() {
      this.form.datasign = this.tandatanganList;
      return this.form;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _methods;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: ['data_sign'],
  data: function data() {
    return {
      canvas: null,
      x: 0,
      y: 0,
      fact: [],
      canvasStates: [],
      currentStep: -1,
      form: {
        startdate: '',
        enddate: '',
        id: ''
      },
      isDrawing: false,
      isLoading: false,
      fullPage: true
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    var canvas = this.$refs.canvas;
    this.canvas = canvas.getContext('2d');
    this.loadimage(this.data_sign.link_tt);
    //this.drawOnCanvas()
  },
  created: function created() {
    //this.fetchData(); 
  },
  methods: (_methods = {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    clearCanvas: function clearCanvas() {
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 450, 450);
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
    hapusTdd: function hapusTdd(data) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var currentDate;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isLoading = true;
              currentDate = new Date();
              _this.form.id = data.id;
              _context.next = 5;
              return axios.post('/hapus_ttd', _this.form).then(function (response) {
                console.log(data);
                if (response.data.metadata.code == 200) {
                  _this.data_sign.deleted = 1;
                  _this.isLoading = false;
                  _this.open("success", response.data.metadata.message);
                } else {
                  _this.isLoading = false;
                  _this.open("warning", response.data.metadata.message);
                }
              })["catch"](function (error) {
                console.log(error);
                //this.isLoading = false
              })["finally"](function () {
                return _this.isLoading = false;
              });
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    loadimage: function loadimage(url) {
      if (url != "") {
        var canvas = this.$refs.canvas;
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = url;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, 420, 180);
        };
      }
    },
    drawLine: function drawLine(x1, y1, x2, y2) {
      var ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      // ctx.globalAlpha = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw: function draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    showCoordinates: function showCoordinates(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    beginDrawing: function beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    stopDrawing: function stopDrawing(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        //this.saveState(); 
      }
    },
    saveState: function saveState() {
      var canvas = this.$refs.canvas;
      this.currentStep++;
      this.canvasStates = this.canvasStates.slice(0, this.currentStep); // Remove any redo states
      this.canvasStates.push(canvas);
      console.log(this.canvasStates);
    }
  }, _defineProperty(_methods, "open", function open(type, message) {
    this.$toast.open({
      message: message,
      position: 'top-right',
      type: type,
      duration: 3000,
      dismissible: true
    });
  }), _defineProperty(_methods, "uploadImage", function uploadImage() {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var canvas;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            canvas = _this2.$refs.canvas;
            canvas.toBlob(function (blob) {
              // Create FormData object

              var formData = new FormData();
              var image_kel_pasien = _this2.$refs.get.get_pic();
              formData.append("data", JSON.stringify(_this2.data_sign));
              formData.append('image', blob, 'canvasImage.png');
              formData.append('pic_kel_pasien', image_kel_pasien, 'pic.png');
              axios.post('/upload_canvas', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(function (response) {
                _this2.open("success", response.data.metadata.message);
                //console.log('Image uploaded successfully:', response.data);
              })["catch"](function (error) {
                _this2.open("warning", error);
                //console.error('Error uploading the image:', error);
              });
            }, 'image/png');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }), _methods)
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: ['data_sign'],
  data: function data() {
    return {
      stream: null,
      // To store the video stream from the camera
      videoStream: null,
      photo: '',
      // To store the captured photo
      captured: false,
      fullPage: true,
      isLoading: false,
      cameraIsOpen: false,
      file_picture: null
    };
  },
  mounted: function mounted() {
    //this.startVideo();
    this.check_has_take_pic();
  },
  created: function created() {
    //this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
    },
    check_has_take_pic: function check_has_take_pic() {
      if (this.data_sign.pic != "") {
        this.photo = this.data_sign.pic;
        this.captured = true;
        this.cameraIsOpen = true;
      }
    },
    startCamera: function startCamera() {
      var _this = this;
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: "environment"
          }
        }
      }).then(function (stream) {
        _this.$refs.video.srcObject = stream;
        _this.stream = stream;
      })["catch"](function (err) {
        console.error("Error accessing the camera: ", err);
      });
    },
    startVideo: function startVideo() {
      var _this2 = this;
      var constraints = {
        video: {
          width: {
            ideal: 1280
          },
          // Remove or lower if needed
          height: {
            ideal: 720
          },
          // Remove or lower if needed
          facingMode: 'user' // 'user' for front camera, 'environment' for rear
        }
      };
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        _this2.stream = stream;
        _this2.$refs.video.srcObject = stream;
        _this2.cameraIsOpen = true;
      })["catch"](function (error) {
        if (error.name === 'OverconstrainedError') {
          console.error("OverconstrainedError: Could not meet requested camera constraints.", error);
        } else if (error.name === 'NotAllowedError') {
          console.error("NotAllowedError: Camera access denied by user.", error);
        } else {
          console.error("Error accessing the camera: ", error);
        }
      });
    },
    retakePhoto: function retakePhoto() {
      this.captured = false;
      this.startVideo();
    },
    capturePhoto: function capturePhoto() {
      var _this3 = this;
      var video = this.$refs.video;
      var canvas_pic = this.$refs.canvas_pic;
      var ctx = canvas_pic.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas_pic.width, canvas_pic.height);
      this.photo = canvas_pic.toDataURL('image/png');
      if (this.photo) {
        canvas_pic.toBlob(function (blob) {
          // Create FormData object  
          _this3.file_picture = blob;
          console.log(_this3.file_picture);
        }, 'image/png');
      }
      this.stopcamera();
      this.captured = true;
    },
    capture: function capture() {
      var video = this.$refs.video;
      var canvas_pic = this.$refs.canvas_pic;
      var context = canvas_pic.getContext('2d');
      // context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // this.photo = canvas.toDataURL('image/png');
      // this.showCanvas = false;
    },
    stopcamera: function stopcamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          return track.stop();
        });
        this.stream = null;
      }
    },
    get_pic: function get_pic() {
      return this.file_picture;
    },
    downloadImage: function downloadImage() {
      // Convert base64 to blob
      var canvas = this.$refs.canvas_pic;
      canvas.toBlob(function (blob) {
        // Create FormData object  
        console.log(blob);
      }, 'image/png');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "row invoice-info"
};
var _hoisted_6 = {
  "class": "col-sm-4 invoice-col"
};
var _hoisted_7 = {
  key: 0
};
var _hoisted_8 = {
  key: 1
};
var _hoisted_9 = {
  "class": "col-sm-4 invoice-col"
};
var _hoisted_10 = ["innerHTML"];
var _hoisted_11 = {
  "class": "row"
};
var _hoisted_12 = {
  "class": "col-md-8"
};
var _hoisted_13 = {
  key: 0
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_tambah_tanda_tangan = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tambah-tanda-tangan");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Tab = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tab");
  var _component_TabList = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TabList");
  var _component_tanda_tangan = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("tanda-tangan");
  var _component_TabPanel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TabPanel");
  var _component_TabPanels = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TabPanels");
  var _component_Tabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tabs");
  var _component_otorisasi_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("otorisasi-form");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Tambahkan Tanda tangan",
    style: {
      "background-color": "antiquewhite"
    },
    visible: $data.addTandaTangan,
    "onUpdate:visible": _cache[2] || (_cache[2] = function ($event) {
      return $data.addTandaTangan = $event;
    }),
    containerStyle: {
      width: '75vw'
    },
    "class": "container_modal",
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Simpan",
        icon: "pi pi-check",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.adddata();
        }),
        autofocus: ""
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Batal",
        icon: "pi pi-times",
        "class": "p-button-text",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $data.addTandaTangan = false;
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tambah_tanda_tangan, {
        ref: "get",
        id_consent: $data.id_consent
      }, null, 8 /* PROPS */, ["id_consent"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[3] || (_cache[3] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ datapasien }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Data kunjungan pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "col-md-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    width: "220px",
    height: "130px",
    src: "https://ws-simrs.link/ilustration/ilustrasi1.png",
    alt: "Ilustration"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pasien KLL ", -1 /* CACHED */)), $props.datapasien.KLL == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_7, _toConsumableArray(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Ya", -1 /* CACHED */)])))) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.datapasien.KLL == '0' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, _toConsumableArray(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Tidak", -1 /* CACHED */)])))) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.DATA_SINGKAT) + " , " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.NOMR), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.CARABAYAR) + " - ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.NOSEP), 1 /* TEXT */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.NAMAKECAMATAN), 1 /* TEXT */), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Masuk ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.MASUKPOLY_DISPLAY) + " , " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.NOPENDAFTARAN), 1 /* TEXT */), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Ruangan/Poli, " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.POLI), 1 /* TEXT */), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" DPJP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.NAMADOKTER), 1 /* TEXT */), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Dx Awal ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.DIAGNOSA_AWAL) + "-" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.datapasien.DX_CAPTION), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tabs, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TabList, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tab)];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TabPanels, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TabPanel, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                innerHTML: _ctx.data.display
              }, null, 8 /* PROPS */, _hoisted_10), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
                label: "Tambahkan Tanda tangan",
                align: "",
                onClick: _cache[4] || (_cache[4] = function ($event) {
                  return $options.ShowTandatangan(_ctx.data.id);
                }),
                icon: "pi pi-user",
                "class": "p-button p-button-text p-button-info"
              }), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.details_ttd, function (det) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [det.id_consent == _ctx.data.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_tanda_tangan, {
                  data_sign: det
                }, null, 8 /* PROPS */, ["data_sign"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
              }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
                label: "Otentikasi",
                icon: "pi pi-auth",
                onClick: _cache[5] || (_cache[5] = function ($event) {
                  return $options.call_oto(6);
                }),
                "class": "p-button"
              })];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      })];
    }),
    _: 1 /* STABLE */
  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Otorisasi",
    visible: $data.showOtorisasi,
    "onUpdate:visible": _cache[8] || (_cache[8] = function ($event) {
      return $data.showOtorisasi = $event;
    }),
    containerStyle: {
      width: '40vw'
    },
    "class": "container_modal",
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: _cache[6] || (_cache[6] = function ($event) {
          return $data.showOtorisasi = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-check",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $data.showOtorisasi = false;
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_otorisasi_form, {
        onGetvalue: _ctx.handleValue,
        mode: $data.mode_otto,
        noregister: _ctx.soapId
      }, null, 8 /* PROPS */, ["onGetvalue", "mode", "noregister"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "row"
};
var _hoisted_6 = {
  "class": "col-md-6",
  style: {
    "text-align": "left"
  }
};
var _hoisted_7 = {
  "class": "card-body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "MARKING SITE")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Clear",
    align: "",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.clearCanvas();
    }),
    icon: "pi pi-times",
    "class": "p-button p-button-text p-button-warning"
  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ canvas}} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span>{{x}}, {{y}}</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", {
    ref: "canvas",
    width: "450",
    height: "450",
    onMousemove: _cache[2] || (_cache[2] = function () {
      return $options.draw && $options.draw.apply($options, arguments);
    }),
    onMousedown: _cache[3] || (_cache[3] = function () {
      return $options.beginDrawing && $options.beginDrawing.apply($options, arguments);
    }),
    onMouseup: _cache[4] || (_cache[4] = function () {
      return $options.stopDrawing && $options.stopDrawing.apply($options, arguments);
    })
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Clear\" align=\"\" @click=\"clearCanvas()\" icon=\"pi pi-check\" class=\"p-button\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"undo\" align=\"\" @click=\"undo()\" icon=\"pi pi-undo\" class=\"p-button button-warning\" /> ")])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card-body",
  style: {
    "height": "400px"
  }
};
var _hoisted_5 = {
  "class": "row pt-1"
};
var _hoisted_6 = {
  "class": "col-md-3"
};
var _hoisted_7 = {
  "class": "col-md-4"
};
var _hoisted_8 = {
  "class": "col-md-3"
};
var _hoisted_9 = {
  "class": "col-md-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" COnsent ID {{ id_consent }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, "Tambahkan penanggung jawab pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    icon: "pi pi-plus",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.addtandTangan();
    }),
    autofocus: ""
  }), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.tandatanganList, function (data, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "for": "basic"
    }, "Nama ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
      type: "text",
      modelValue: data.nama,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return data.nama = $event;
      },
      style: {
        "width": "80%"
      }
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "for": "icon"
    }, "Hubungan ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
      style: {
        "width": "80%"
      },
      modelValue: data.hubunganSelected,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return data.hubunganSelected = $event;
      },
      options: $data.hubungandengan_pasien,
      placeholder: "Pilih Hubungan"
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "options"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "for": "basic"
    }, "No HP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
      style: {
        "width": "80%"
      },
      modelValue: data.nohp,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return data.nohp = $event;
      },
      type: "text"
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-times",
      "class": "p-button-text",
      onClick: function onClick($event) {
        return $options.hapusItem(index);
      },
      autofocus: ""
    }, null, 8 /* PROPS */, ["onClick"])])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  key: 0,
  "class": "card elevation-0",
  style: {
    "height": "320px"
  }
};
var _hoisted_4 = {
  "class": "card-header",
  style: {
    "text-align": "center"
  }
};
var _hoisted_5 = {
  "class": "card-body",
  style: {
    "text-align": "center"
  }
};
var _hoisted_6 = {
  "class": "row"
};
var _hoisted_7 = {
  "class": "col-md-6"
};
var _hoisted_8 = {
  "class": "col-md-6"
};
var _hoisted_9 = {
  "class": "card-footer"
};
var _hoisted_10 = {
  "class": "row"
};
var _hoisted_11 = {
  "class": "col-md-6"
};
var _hoisted_12 = {
  "class": "col-md-6",
  style: {
    "text-align": "right"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_take_picture_consent = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("take-picture-consent");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), $props.data_sign.deleted == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data_sign.ket), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", {
    ref: "canvas",
    style: {
      "border": ".5px solid gray"
    },
    width: "420",
    height: "180",
    onMousemove: _cache[1] || (_cache[1] = function () {
      return $options.draw && $options.draw.apply($options, arguments);
    }),
    onMousedown: _cache[2] || (_cache[2] = function () {
      return $options.beginDrawing && $options.beginDrawing.apply($options, arguments);
    }),
    onMouseup: _cache[3] || (_cache[3] = function () {
      return $options.stopDrawing && $options.stopDrawing.apply($options, arguments);
    })
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("u", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data_sign.nama_keluarga_pasien) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.data_sign.hubungan), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_take_picture_consent, {
    ref: "get",
    data_sign: $props.data_sign
  }, null, 8 /* PROPS */, ["data_sign"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Clear",
    align: "",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.clearCanvas();
    }),
    icon: "pi pi-times",
    "class": "p-button p-button-text p-button-danger"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Simpan",
    align: "",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.uploadImage();
    }),
    icon: "pi pi-save",
    "class": "p-button p-button p-button-text"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Hapus",
    align: "",
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.hapusTdd($props.data_sign);
    }),
    icon: "pi pi-trash",
    "class": "p-button p-button-danger p-button-text"
  })])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  key: 0,
  "class": "image-container"
};
var _hoisted_4 = {
  ref: "canvas_pic",
  width: "420",
  height: "180",
  style: {
    "display": "none",
    "border": "1px solid gray"
  }
};
var _hoisted_5 = {
  key: 1
};
var _hoisted_6 = {
  ref: "video",
  width: "420",
  height: "180",
  autoplay: ""
};
var _hoisted_7 = {
  key: 2
};
var _hoisted_8 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), !$data.cameraIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg",
    alt: "Captured Photo",
    style: {
      "border": "1px solid gray"
    },
    width: "410",
    height: "180"
  }, null, -1 /* CACHED */)), !$data.cameraIsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Button, {
    key: 0,
    "class": "button-xl",
    icon: "pi pi-camera",
    label: "Foto",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.startVideo();
    })
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_4, null, 512 /* NEED_PATCH */), !$data.captured ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("video", _hoisted_6, null, 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Foto",
    icon: "pi pi-camera",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.capturePhoto();
    }),
    "class": "p-button-text"
  })])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.photo,
    alt: "Captured Photo",
    style: {
      "border": "1px solid gray"
    },
    width: "410",
    height: "180"
  }, null, 8 /* PROPS */, _hoisted_8), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Foto Ulang",
    icon: "pi pi-camera",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.retakePhoto();
    }),
    "class": "p-button-text"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button class=\"button-xl\" icon=\"pi pi-download\" label=\"Foto\" @click=\"downloadImage()\"/> ")]))])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.image-container {\r\n      position: relative;\r\n      display: inline-block;\n}\n.image-container img {\r\n      display: block;\r\n      width: 100%;\r\n      height: auto;\n}\n.image-container button {\r\n      position: absolute;\r\n      top: 50%;\r\n      left: 50%;\r\n      transform: translate(-50%, -50%);\r\n      padding: 10px 20px;\r\n      background-color: rgba(0, 0, 0, 0.5);\r\n      color: white;\r\n      border: none;\r\n      cursor: pointer;\r\n      font-size: 16px;\r\n      border-radius: 5px;\n}\n.image-container button:hover {\r\n      background-color: rgba(0, 0, 0, 0.7);\n}\r\n  ", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_style_index_0_id_e676bf3a_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_style_index_0_id_e676bf3a_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_style_index_0_id_e676bf3a_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GeneralConsentCompnent_vue_vue_type_template_id_257a1596__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneralConsentCompnent.vue?vue&type=template&id=257a1596 */ "./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596");
/* harmony import */ var _GeneralConsentCompnent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneralConsentCompnent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_GeneralConsentCompnent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_GeneralConsentCompnent_vue_vue_type_template_id_257a1596__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Medicalrecord/GeneralConsentCompnent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/MediaMarkingComponent.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/MediaMarkingComponent.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MediaMarkingComponent_vue_vue_type_template_id_1c840ab8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaMarkingComponent.vue?vue&type=template&id=1c840ab8 */ "./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8");
/* harmony import */ var _MediaMarkingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaMarkingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_MediaMarkingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MediaMarkingComponent_vue_vue_type_template_id_1c840ab8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Medicalrecord/MediaMarkingComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganAddComponent.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganAddComponent.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TandatanganAddComponent_vue_vue_type_template_id_415b06f6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TandatanganAddComponent.vue?vue&type=template&id=415b06f6 */ "./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6");
/* harmony import */ var _TandatanganAddComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TandatanganAddComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TandatanganAddComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TandatanganAddComponent_vue_vue_type_template_id_415b06f6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Medicalrecord/TandatanganAddComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TandatanganConsentPasienComponent_vue_vue_type_template_id_13b36edc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc */ "./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc");
/* harmony import */ var _TandatanganConsentPasienComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TandatanganConsentPasienComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TandatanganConsentPasienComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TandatanganConsentPasienComponent_vue_vue_type_template_id_13b36edc__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TandatanganTakePicComponent_vue_vue_type_template_id_e676bf3a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a */ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a");
/* harmony import */ var _TandatanganTakePicComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TandatanganTakePicComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _TandatanganTakePicComponent_vue_vue_type_style_index_0_id_e676bf3a_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css */ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TandatanganTakePicComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TandatanganTakePicComponent_vue_vue_type_template_id_e676bf3a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GeneralConsentCompnent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GeneralConsentCompnent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GeneralConsentCompnent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaMarkingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaMarkingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaMarkingComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganAddComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganAddComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganAddComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganConsentPasienComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganConsentPasienComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganConsentPasienComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganTakePicComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596 ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GeneralConsentCompnent_vue_vue_type_template_id_257a1596__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GeneralConsentCompnent_vue_vue_type_template_id_257a1596__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GeneralConsentCompnent.vue?vue&type=template&id=257a1596 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/GeneralConsentCompnent.vue?vue&type=template&id=257a1596");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8 ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaMarkingComponent_vue_vue_type_template_id_1c840ab8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaMarkingComponent_vue_vue_type_template_id_1c840ab8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaMarkingComponent.vue?vue&type=template&id=1c840ab8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/MediaMarkingComponent.vue?vue&type=template&id=1c840ab8");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6 ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganAddComponent_vue_vue_type_template_id_415b06f6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganAddComponent_vue_vue_type_template_id_415b06f6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganAddComponent.vue?vue&type=template&id=415b06f6 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganAddComponent.vue?vue&type=template&id=415b06f6");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganConsentPasienComponent_vue_vue_type_template_id_13b36edc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganConsentPasienComponent_vue_vue_type_template_id_13b36edc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganConsentPasienComponent.vue?vue&type=template&id=13b36edc");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_template_id_e676bf3a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_template_id_e676bf3a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=template&id=e676bf3a");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TandatanganTakePicComponent_vue_vue_type_style_index_0_id_e676bf3a_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/TandatanganTakePicComponent.vue?vue&type=style&index=0&id=e676bf3a&lang=css");


/***/ })

}]);