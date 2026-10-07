"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["tindakan"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/index.mjs");
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qrcode.vue */ "./node_modules/qrcode.vue/dist/qrcode.vue.esm.js");
/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bus */ "./resources/js/components/bus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    Editor: primevue_editor__WEBPACK_IMPORTED_MODULE_3__["default"],
    QrcodeVue: qrcode_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['isInput', 'datapasien'],
  data: function data() {
    return {
      fact: [],
      isEditMode: false,
      opsiJenisTindakan: [{
        label: 'Semua Tindakan',
        value: 17
      }, {
        label: 'Tindakan Medis',
        value: 15
      }],
      form: {
        NOPENDAFTARAN: '',
        startdate: '',
        enddate: '',
        breakdown: 0,
        obatselected: [],
        arr_tindakan: [],
        modesales: '',
        mode: '',
        itembarang: '',
        jenisTindakan: 17
      },
      riwayat_tindakan: [],
      isLoading: false,
      fullPage: true,
      seq_number: 0,
      showOtorisasi: false,
      id_inputan: 0,
      mode_otto: 0
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
    console.log(currentDate);
  },
  created: function created() {
    this.getmaster_tindakan(this.form.jenisTindakan);
    this.riwyat_rincian_tindakan();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
      console.log(this.form.startdate);
    },
    getmaster_tindakan: function getmaster_tindakan(mode) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //this.isLoading = true;
              _this.form.mode = mode;
              _context.next = 3;
              return axios.post('/getdata_obat_baseparam', _this.form).then(function (response) {
                _this.fact = response.data.response;
                _this.isLoading = false;
                //console.log(this.fact);
              })["catch"](function (error) {
                console.log(error);
                _this.isLoading = false;
              })["finally"](function () {
                return _this.isLoading = false;
              });
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    addTindakan: function addTindakan(barang) {
      console.log(barang);
      this.seq_number = this.seq_number + 1;
      var currentDate = new Date();
      this.form.obatselected.push({
        BARCODE: barang.BARCODE,
        ID_BARANG: barang.BARCODE,
        NAMA: barang.NAMA,
        SATUAN: barang.SATUAN,
        RECEIPT_NO: '',
        HARGA: barang.HARGAJUAL,
        POTONGSTOCK: 0,
        TOTAL_ITEM: 0,
        QTY_RACIK: 0,
        PERSEDIAAN: barang.QUNATITY,
        SATUAN_RACIK: barang.SATUAN_RACIK,
        MEREK: barang.SATUAN,
        TOTALAMOUNT: 0,
        DISCOUNT: 0,
        ITEMSEQNO: this.seq_number,
        SUBITEMSEQNO: 0,
        QTY: 1,
        STATUS: '',
        DOSIS: '',
        STATUS_PROGRESS: "C",
        SUB_BARCODE: barang.SUB_BARCODE,
        OBAT_OBATAN: 1,
        AS_PARENT: 0,
        SAT_RACIK: '',
        FLAG: "NEW LINE",
        JENIS: barang.JENIS,
        JENIS_RESEP: "",
        ID_LOKASI: 0,
        REMARK_ITEM: '',
        JML_RACIK: barang.JML_RACIK,
        AUTH: 0,
        AUTH_BY: '',
        TANGGAL_TRANS: this.formattedDateTime()
      });
      this.simpan_sales();
    },
    onJenisTindakanChange: function onJenisTindakanChange() {
      this.fact = [];
      this.form.tindakanSelected = null;
      this.form.itembarang = '';
      this.getmaster_tindakan(this.form.jenisTindakan);
    },
    additemTindakanSelect: function additemTindakanSelect(e) {
      var _this2 = this;
      if (e.value) {
        this.addTindakan(e.value);
        this.$nextTick(function () {
          _this2.form.tindakanSelected = null;
        });
      }
    },
    additemTindakan: function additemTindakan(e) {
      //console.log(e.value);
      this.addTindakan(e.value);
      this.form.tindakanSelected = '';
    },
    call_oto: function call_oto(soapid, mode_otto) {
      this.id_inputan = soapid;
      this.mode_otto = mode_otto;
      this.showOtorisasi = true;
    },
    call_form: function call_form() {
      this.showOtorisasi = true;
    },
    handleValue: function handleValue(value) {
      this.responvalue = value; // Update the parent data with the value from the child
      console.log(this.responvalue);
      if (this.responvalue == 200) {
        this.showOtorisasi = false;
        this.riwyat_rincian_tindakan();
      }
    },
    formattedDateTime: function formattedDateTime() {
      var currentDate = new Date();
      // Parse the datetime string to a Date object
      var dateTime = currentDate;
      // Extract date and time components
      var year = dateTime.getFullYear();
      var month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
      var day = ('0' + dateTime.getDate()).slice(-2);
      var hours = ('0' + dateTime.getHours()).slice(-2);
      var minutes = ('0' + dateTime.getMinutes()).slice(-2);
      var seconds = ('0' + dateTime.getSeconds()).slice(-2);

      // Format the datetime
      return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
    },
    open: function open(type, message) {
      _bus__WEBPACK_IMPORTED_MODULE_2__.EventBus.$emit('show-alert', {
        type: type,
        message: message
      });
    },
    hapusitem_barang: function hapusitem_barang(index) {
      this.form.obatselected.splice(index, 1);
    },
    riwyat_rincian_tindakan: function riwyat_rincian_tindakan() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var currentDate;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              currentDate = new Date();
              _this3.form.waktu_masuk = currentDate;
              _this3.form.DATA_SINGKAT = _this3.datapasien.DATA_SINGKAT;
              _this3.form.NOPENDAFTARAN = _this3.datapasien.NOPENDAFTARAN;
              _context2.next = 7;
              return axios.post('/rincian_tindakan', _this3.form).then(function (response) {
                console.log(response.data);
                _this3.isLoading = false;
                console.log(response.data);
                if (response.data.metadata.code == 200) {
                  _this3.riwayat_tindakan = response.data.response;
                  _this3.form.obatselected = response.data.response;
                  for (var i = 0; i < _this3.form.obatselected.length; i++) {
                    _this3.seq_number = _this3.seq_number + 1;
                    _this3.form.obatselected[i].ITEMSEQNO = _this3.seq_number;
                    _this3.form.obatselected[i].FLAG = "EXISTING_ITEM";
                    _this3.form.obatselected[i].TOTALAMOUNT = 0;
                  }
                } else {
                  var data = response.data.metadata.message;
                  _this3.open("warning", data);
                }
                console.log(response.data.metadata);
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    simpan_sales: function simpan_sales() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var currentDate;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              //this.isLoading = true;
              currentDate = new Date();
              _this4.form.waktu_masuk = currentDate;
              _this4.form.DATA_SINGKAT = _this4.datapasien.DATA_SINGKAT;
              _this4.form.NOPENDAFTARAN = _this4.datapasien.NOPENDAFTARAN;
              _this4.form.modesales = 'REG';
              _this4.form.DPJP = _this4.datapasien.NAMADOKTER;
              _this4.form.NOMR = _this4.datapasien.NOMR;
              _this4.form.RECEIPT_NO = '', _this4.form.POLI_RUANG = _this4.datapasien.POLI;
              _this4.form.OBAT_OBATAN = 4;
              _this4.form.id_ruangan = _this4.datapasien.KODERUANGAN;
              _context3.next = 12;
              return axios.post('/kirimpermintaan_obat', _this4.form).then(function (response) {
                console.log(response.data);
                _this4.isLoading = false;
                if (response.data.metadata.code == 200) {
                  _this4.open("success", "Tindakan telah di tambahkan " + response.data.metadata.Receipt);
                  _this4.form.RECEIPT_NO = response.data.metadata.Receipt;
                  for (var i = 0; i < _this4.form.obatselected.length; i++) {
                    if (_this4.form.obatselected[i].ITEMSEQNO == _this4.seq_number) {
                      _this4.form.obatselected[i].RECEIPT_NO = _this4.form.RECEIPT_NO;
                      _this4.form.obatselected[i].FLAG = "EXISTING_ITEM";
                      _this4.form.obatselected[i].TOTALAMOUNT = 0;
                    }
                  }
                } else {
                  var data = response.data.metadata.message;
                  _this4.open("warning", data);
                }
                console.log(response.data.metadata);
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    updateTindakan: function updateTindakan(param) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              param.noregister = _this5.datapasien.NOPENDAFTARAN;
              _this5.isLoading = true;
              _context4.next = 4;
              return axios.post('/updateItemTindakan', param).then(function (response) {
                console.log(response);
                _this5.isLoading = false;
                if (response.status == 200) {
                  _this5.open("success", "Suksess");
                  //this.get_riwayat();
                } else {
                  _this5.open("warning", "Gagal menyimpan");
                }
                console.log(response.data.metadata);
              })["catch"](function (error) {
                console.log(error);
                _this5.isLoading = false;
              })["finally"](function () {
                return _this5.isLoading = false;
              });
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    voidtindakan: function voidtindakan(index, param) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              //param.noregister =this.datapasien.NOPENDAFTARAN;
              _this6.isLoading = true;
              _context5.next = 3;
              return axios.post('/voidtindakan', param).then(function (response) {
                console.log(response);
                _this6.isLoading = false;
                if (response.status == 200) {
                  _this6.hapusitem_barang(index);
                  _this6.open("success", "Suksess");
                  //this.get_riwayat();
                } else {
                  _this6.open("warning", "Gagal menyimpan");
                }
                console.log(response.data.metadata);
              })["catch"](function (error) {
                console.log(error);
                _this6.isLoading = false;
              })["finally"](function () {
                return _this6.isLoading = false;
              });
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card"
};
var _hoisted_3 = {
  "class": "card-body"
};
var _hoisted_4 = {
  "class": "row"
};
var _hoisted_5 = {
  "class": "col-md-6"
};
var _hoisted_6 = {
  "class": "card"
};
var _hoisted_7 = {
  "class": "card-body"
};
var _hoisted_8 = {
  "class": "card-body table-sm table-responsive p-0",
  style: {
    "height": "600px"
  }
};
var _hoisted_9 = {
  "class": "field col-md-10 col-sm-6 col-12 mt-3"
};
var _hoisted_10 = {
  "class": "table table-sm tb-sm table-bordered table-striped small-table"
};
var _hoisted_11 = ["onUpdate:modelValue"];
var _hoisted_12 = {
  key: 0
};
var _hoisted_13 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  var _component_DatePicker = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DatePicker");
  var _component_qrcode_vue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("qrcode-vue");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  var _component_otorisasi_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("otorisasi-form");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Select v-model=\"form.jenisTindakan\" :options=\"opsiJenisTindakan\"\n                    optionLabel=\"label\" optionValue=\"value\"\n                    placeholder=\"Pilih jenis tindakan\" style=\"width: 100%; max-width: 320px;\"\n                    @change=\"onJenisTindakanChange\" /> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    style: {
      "width": "100%"
    },
    modelValue: $data.form.tindakanSelected,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.tindakanSelected = $event;
    }),
    options: $data.fact,
    optionLabel: "NAMA",
    filter: true,
    filterPlaceholder: "Cari tindakan...",
    placeholder: "-- Pilih tindakan --",
    onChange: _cache[2] || (_cache[2] = function ($event) {
      return $options.additemTindakanSelect($event);
    })
  }, null, 8 /* PROPS */, ["modelValue", "options"])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" {{ riwayat_tindakan }} "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_10, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "10em"
    }
  }, "KODE TINDAKAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TINDAKAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "10em"
    }
  }, "TGL"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "DESKRIPSI")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.form.obatselected, function (tindakan, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "form-control form-control",
      disabled: "",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return tindakan.BARCODE = $event;
      },
      type: "text"
    }, null, 8 /* PROPS */, _hoisted_11), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, tindakan.BARCODE]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tindakan.NAMA), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DatePicker, {
      modelValue: $data.form.startdate,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
        return $data.form.startdate = $event;
      }),
      "class": "text-sm",
      showIcon: true,
      dateFormat: "dd/mm/yy",
      placeholder: "Tanggal",
      style: {
        "width": "20em"
      }
    }, null, 8 /* PROPS */, ["modelValue"]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), tindakan.AUTH == '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_qrcode_vue, {
      value: tindakan.AUTH_BY,
      size: 50,
      level: "H"
    }, null, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tindakan.AUTH_BY), 1 /* TEXT */), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), tindakan.AUTH == '0' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-lock-open",
      onClick: function onClick($event) {
        return $options.call_oto(tindakan.RECEIPT_NO, 8);
      },
      "class": "p-button-rounded p-button-warning"
    }, null, 8 /* PROPS */, ["onClick"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
      modelValue: tindakan.REMARK_ITEM,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return tindakan.REMARK_ITEM = $event;
      },
      editorStyle: "height: 300px"
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-times",
      onClick: function onClick($event) {
        return $options.voidtindakan(index, tindakan);
      },
      "class": "p-button-rounded p-button-danger p-button-text"
    }, null, 8 /* PROPS */, ["onClick"]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-save",
      onClick: function onClick($event) {
        return $options.updateTindakan(tindakan);
      },
      "class": "p-button-rounded p-button-primary"
    }, null, 8 /* PROPS */, ["onClick"])])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Otorisasi",
    visible: $data.showOtorisasi,
    "onUpdate:visible": _cache[6] || (_cache[6] = function ($event) {
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
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return $data.showOtorisasi = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-check",
        onClick: _cache[5] || (_cache[5] = function ($event) {
          return $data.showOtorisasi = false;
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_otorisasi_form, {
        onGetvalue: $options.handleValue,
        mode: $data.mode_otto,
        noregister: $data.id_inputan
      }, null, 8 /* PROPS */, ["onGetvalue", "mode", "noregister"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"])]);
}

/***/ }),

/***/ "./resources/js/components/Tindakan/FormTindakanComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/Tindakan/FormTindakanComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FormTindakanComponent_vue_vue_type_template_id_57cd2075__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormTindakanComponent.vue?vue&type=template&id=57cd2075 */ "./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075");
/* harmony import */ var _FormTindakanComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormTindakanComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FormTindakanComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FormTindakanComponent_vue_vue_type_template_id_57cd2075__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Tindakan/FormTindakanComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormTindakanComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormTindakanComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FormTindakanComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075 ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormTindakanComponent_vue_vue_type_template_id_57cd2075__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FormTindakanComponent_vue_vue_type_template_id_57cd2075__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FormTindakanComponent.vue?vue&type=template&id=57cd2075 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Tindakan/FormTindakanComponent.vue?vue&type=template&id=57cd2075");


/***/ })

}]);