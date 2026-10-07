"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["penunjang"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primevue_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/dialog */ "./node_modules/primevue/dialog/index.mjs");
/* harmony import */ var primevue_inputnumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/inputnumber */ "./node_modules/primevue/inputnumber/index.mjs");
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");
/* harmony import */ var primevue_progressbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/progressbar */ "./node_modules/primevue/progressbar/index.mjs");
/* harmony import */ var primevue_textarea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/textarea */ "./node_modules/primevue/textarea/index.mjs");
/* harmony import */ var primevue_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/tag */ "./node_modules/primevue/tag/index.mjs");
/* harmony import */ var pdf_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdf-lib */ "./node_modules/pdf-lib/es/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    Dialog: primevue_dialog__WEBPACK_IMPORTED_MODULE_2__["default"],
    InputNumber: primevue_inputnumber__WEBPACK_IMPORTED_MODULE_3__["default"],
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_4__["default"],
    Tag: primevue_tag__WEBPACK_IMPORTED_MODULE_5__["default"],
    ProgressBar: primevue_progressbar__WEBPACK_IMPORTED_MODULE_6__["default"],
    Textarea: primevue_textarea__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  props: ['isInput', 'datapasien'],
  data: function data() {
    return {
      fact: [],
      jenisresep: '',
      openGrup: {},
      carapakai_obat: [],
      data_kco: [],
      modalracik: false,
      selectedPulvis: {
        nama: '',
        item: []
      },
      itemPulvisTemp: {
        nama: '',
        item: []
      },
      form: {
        startdate: '',
        enddate: '',
        itembarang: '',
        obatselected: [],
        selectedjns_resep: '',
        qty_selected: [],
        remark: [],
        DATA_SINGKAT: '',
        NOMR: '',
        modesales: '',
        NOPENDAFTARAN: '',
        DPJP: '',
        totalamount: '',
        waktu_masuk: '',
        RECEIPT_NO: '',
        POLI_RUANG: '',
        kategori: '',
        klinis: '',
        catatan: ''
      },
      param: {
        NOPENDAFTARAN: '',
        RECEIPT_NO: ''
      },
      isLoading: false,
      fullPage: true,
      temo_qtyobat: 0,
      displayConfirmation: false,
      details_confirmation: false,
      loading_spiner: 'pi pi-spin pi-spinner',
      totalamount: 0,
      messages: [],
      riwayat_penunjang: [],
      detils_obat: [],
      form_kco: false,
      barcode: '',
      item: {},
      detailpemeriksaanlab: [],
      datalab_pasien: ''
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  computed: {
    groupedByNama: function groupedByNama() {
      return this.detailpemeriksaanlab.reduce(function (acc, item) {
        var key = item.NAMA;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
    }
  },
  watch: {
    groupedByNama: {
      immediate: true,
      handler: function handler(val) {
        var _this = this;
        // Buka semua grup secara default
        Object.keys(val).forEach(function (key) {
          if (_this.openGrup[key] === undefined) {
            _this.openGrup[key] = true;
          }
        });
      }
    }
  },
  created: function created() {
    //this.getdataobat();

    this.get_caraminum();
    this.get_riwayat();
  },
  methods: {
    cetakHasilLab: function cetakHasilLab(receiptNo) {
      var _this$datapasien;
      var noregister = ((_this$datapasien = this.datapasien) === null || _this$datapasien === void 0 ? void 0 : _this$datapasien.NOPENDAFTARAN) || '';
      window.open("/print-hasil-lab?receipt_no=".concat(receiptNo, "&noregister=").concat(noregister), '_blank');
    },
    toggleGrup: function toggleGrup(namaGrup) {
      this.openGrup[namaGrup] = !this.openGrup[namaGrup];
    },
    countAbnormal: function countAbnormal(items) {
      return items.filter(function (i) {
        return i.HASIL_TIDAK_NORMAL == 1;
      }).length;
    },
    fetchData: function fetchData() {},
    itemSelected: function itemSelected(item) {
      this.item = item;
    },
    gethasilpemeriksaan_lab: function gethasilpemeriksaan_lab(receipt) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.isLoading = true;
              _this2.param.receipt = receipt;
              _context.next = 4;
              return axios.post('/getdatahasil_lab', _this2.param).then(function (response) {
                _this2.detailpemeriksaanlab = response.data.response;
                _this2.datalab_pasien = response.data.pasien;
                _this2.isLoading = false;
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
    get_riwayat: function get_riwayat() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              _this3.param.noregister = _this3.datapasien.NOPENDAFTARAN;
              _this3.param.jenisdata = 2;
              _context2.next = 5;
              return axios.post('/getheader_penunjang_v2', _this3.param).then(function (response) {
                _this3.riwayat_penunjang = response.data.response;
                var data = response.data.response;
                _this3.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    addMessages: function addMessages() {
      this.messages = [{
        severity: 'info',
        content: 'Dynamic Info Message'
      }, {
        severity: 'success',
        content: 'Dynamic Success Message'
      }, {
        severity: 'warn',
        content: 'Dynamic Warning Message'
      }];
    },
    getdetail_sales: function getdetail_sales(RECEIPT_NO) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this4.isLoading = true;
              _this4.param.NOPENDAFTARAN = _this4.datapasien.NOPENDAFTARAN;
              _this4.param.RECEIPT_NO = RECEIPT_NO;
              _this4.param.MODE = 'RCPT';
              _context3.next = 6;
              return axios.post('/getdetils_sales', _this4.param).then(function (response) {
                console.log(response.data);
                _this4.detils_obat = response.data.response;
                _this4.isLoading = false;
                _this4.details_confirmation = true;
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    setLabel: function setLabel(item) {
      return item.name;
    },
    inputChange: function inputChange(text) {},
    additem_barang: function additem_barang(barang) {
      var currentDate = new Date();
      this.form.obatselected.push({
        BARCODE: barang.BARCODE,
        ID_BARANG: barang.BARCODE,
        NAMA: barang.NAMA,
        SATUAN: barang.SATUAN,
        RECEIPT_NO: '',
        HARGA: barang.HARGAJUAL,
        POTONGSTOCK: barang.POTONGSTOCK,
        TOTAL_ITEM: 0,
        QTY_RACIK: barang.QTY_RACIK,
        PERSEDIAAN: barang.QUNATITY,
        SATUAN_RACIK: barang.SATUAN_RACIK,
        MEREK: barang.SATUAN,
        TOTALAMOUNT: 0,
        DISCOUNT: 0,
        ITEMSEQNO: '',
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
        JENIS_RESEP: '',
        ID_LOKASI: 0,
        REMARK_ITEM: '',
        TANGGAL_TRANS: this.formattedDateTime()
      });
      this.setitemseqNo();
    },
    setitemseqNo: function setitemseqNo() {
      for (var i = 0; i < this.form.obatselected.length; i++) {
        this.form.obatselected[i].ITEMSEQNO = i + 1;
        this.form.qty_selected[i] = 1;
        this.form.obatselected[i].QTY = 1;
        this.form.obatselected[i].TOTALAMOUNT = this.form.obatselected[i].HARGA;
      }
      if (this.form.mode == 10) {
        this.form.itembarang = '';
        this.$refs.inputBox.focus();
      }
      this.counting();
    },
    setdosis: function setdosis(index) {
      var remark_item = "";
      remark_item = this.form.remark[index];
      this.form.obatselected[index].REMARK_ITEM = remark_item['REMARK'];
      console.log(this.form.obatselected[index].REMARK_ITEM);
    },
    save_sales: function save_sales() {
      var currentDate = new Date();
    },
    counting: function counting() {
      var amount = 0;
      for (var i = 0; i < this.form.obatselected.length; i++) {
        amount = amount + this.form.obatselected[i].TOTALAMOUNT;
      }
      this.totalamount = amount;
    },
    inputqtyobat: function inputqtyobat(index) {
      if (this.form.qty_selected[index] == "" || this.form.qty_selected[index] == null) {
        this.form.qty_selected[index] = 0;
      }
      this.form.obatselected[index].QTY = this.form.qty_selected[index];
      this.form.obatselected[index].TOTALAMOUNT = this.form.obatselected[index].QTY * this.form.obatselected[index].HARGA;
      //console.log(this.form.qty_selected[index]);
      this.counting();
    },
    get_caraminum: function get_caraminum() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return axios.post('/get_carapakai_obat', "").then(function (response) {
                _this5.carapakai_obat = response.data.response;
                _this5.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this5.isLoading = false;
              })["finally"](function () {
                return _this5.isLoading = false;
              });
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    validation_data: function validation_data() {
      var isvalid = true;
      for (var i = 0; i < this.form.obatselected.length; i++) {
        if (this.form.obatselected[i].QTY == 0 || this.form.obatselected[i].QTY == "") {
          this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item " + this.form.obatselected[i].NAMA);
          isvalid = false;
        }
      }
      return isvalid;
    },
    simpan_sales: function simpan_sales() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var currentDate, isValid;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this6.isLoading = true;
              currentDate = new Date();
              _this6.form.waktu_masuk = currentDate;
              _this6.form.DATA_SINGKAT = _this6.datapasien.DATA_SINGKAT;
              _this6.form.NOPENDAFTARAN = _this6.datapasien.NOPENDAFTARAN;
              _this6.form.modesales = 'REG';
              _this6.form.DPJP = _this6.datapasien.NAMADOKTER;
              _this6.form.NOMR = _this6.datapasien.NOMR;
              _this6.form.RECEIPT_NO = '', _this6.form.POLI_RUANG = _this6.datapasien.POLI;
              _this6.form.OBAT_OBATAN = 2;
              isValid = _this6.validation_data();
              if (!(isValid == false)) {
                _context5.next = 13;
                break;
              }
              return _context5.abrupt("return");
            case 13:
              if (_this6.form.catatan == '') {
                _this6.form.catatan = '-';
              }
              _context5.next = 16;
              return axios.post('/kirimpermintaan_obat', _this6.form).then(function (response) {
                console.log(response.data);
                _this6.isLoading = false;
                if (response.data.metadata.code == 200) {
                  _this6.open("success", "Permintaan pemeriksaan lab berihasil, dengan nomor" + response.data.metadata.Receipt);
                  _this6.form.RECEIPT_NO = response.data.metadata.Receipt;
                  _this6.cleartable();
                  _this6.get_riwayat();
                }
              })["catch"](function (error) {
                console.log(error);
                _this6.isLoading = false;
              })["finally"](function () {
                return _this6.isLoading = false;
              });
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    kirimpermintaan: function kirimpermintaan() {},
    hapusitem_barang: function hapusitem_barang(index) {
      this.form.obatselected.splice(index, 1);
      this.form.qty_selected.splice(index, 1);
      this.form.remark.splice(index, 1);
    },
    getdataobat: function getdataobat(mode) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(mode == 112)) {
                _context6.next = 6;
                break;
              }
              if (!(_this7.form.itembarang == "")) {
                _context6.next = 4;
                break;
              }
              _this7.fact = [];
              return _context6.abrupt("return");
            case 4:
              if (!(_this7.form.itembarang.length < 3)) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return");
            case 6:
              _this7.isLoading = true;
              _this7.form.mode = mode;
              _this7.form.breakdown = 0;
              _this7.form.kategori = 'LABORATORIUM';
              _context6.next = 12;
              return axios.post('/getdata_obat_baseparam', _this7.form).then(function (response) {
                console.log(response.data);
                _this7.fact = response.data.response;
                _this7.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this7.isLoading = false;
              })["finally"](function () {
                return _this7.isLoading = false;
              });
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    openConfirmation: function openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation: function closeConfirmation() {
      this.displayConfirmation = false;
    },
    confirm3: function confirm3(index, namaobat) {
      this.hapusitem_barang(index);
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
    getdata_kco: function getdata_kco() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this8.isLoading = true;
              _this8.form.NOREGISTER = _this8.datapasien.NOPENDAFTARAN;
              _context7.next = 4;
              return axios.post('/get_data_kco', _this8.form).then(function (response) {
                _this8.data_kco = response.data.response;
                _this8.form_kco = true;
                _this8.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this8.isLoading = false;
              })["finally"](function () {
                return _this8.isLoading = false;
              });
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
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
    add_copy_item: function add_copy_item(row) {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var barang;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _this9.form.barcode = row.BARCODE;
              _context8.next = 3;
              return _this9.getdataobat(3);
            case 3:
              barang = _this9.fact[0];
              _this9.additem_barang(barang);
              _this9.open("success", row.NAMABARANG + " " + "Telah di tambahkan");
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    },
    add_copy_all: function add_copy_all() {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var i, barang;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _this10.form_kco = false;
              i = 0;
            case 2:
              if (!(i < _this10.data_kco.itembarang.length)) {
                _context9.next = 11;
                break;
              }
              _this10.form.barcode = _this10.data_kco.itembarang[i].BARCODE;
              _context9.next = 6;
              return _this10.getdataobat(3);
            case 6:
              barang = _this10.fact[0];
              _this10.additem_barang(barang);
            case 8:
              i++;
              _context9.next = 2;
              break;
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }))();
    },
    cleartable: function cleartable() {
      this.form.obatselected = [];
      this.form.qty_selected = [];
      this.form.remark = [];
    },
    void_sales: function void_sales(rcpt_no) {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _this11.isLoading = true;
              _this11.form.NOREGISTER = _this11.datapasien.NOPENDAFTARAN;
              _this11.form.RECEIPT_NO = rcpt_no;
              _context10.next = 5;
              return axios.post('/void_sales', _this11.form).then(function (response) {
                _this11.isLoading = false;
                _this11.get_riwayat();
              })["catch"](function (error) {
                console.log(error);
                _this11.isLoading = false;
              })["finally"](function () {
                return _this11.isLoading = false;
              });
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }))();
    },
    kirim_resep: function kirim_resep(rcpt_no) {
      var _this12 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _this12.isLoading = true;
              _this12.form.RECEIPT_NO = rcpt_no;
              _context11.next = 4;
              return axios.post('/kirim_resep', _this12.form).then(function (response) {
                _this12.details_confirmation = false;
                _this12.isLoading = false;
                _this12.open("success", response.data.metadata.message);
                _this12.get_riwayat();
                console.log(response.data);
              })["catch"](function (error) {
                console.log(error);
                _this12.isLoading = false;
              })["finally"](function () {
                return _this12.isLoading = false;
              });
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primevue_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/dialog */ "./node_modules/primevue/dialog/index.mjs");
/* harmony import */ var primevue_inputnumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/inputnumber */ "./node_modules/primevue/inputnumber/index.mjs");
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");
/* harmony import */ var primevue_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/image */ "./node_modules/primevue/image/index.mjs");
/* harmony import */ var primevue_textarea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/textarea */ "./node_modules/primevue/textarea/index.mjs");
/* harmony import */ var primevue_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/tag */ "./node_modules/primevue/tag/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default()),
    Dialog: primevue_dialog__WEBPACK_IMPORTED_MODULE_1__["default"],
    InputNumber: primevue_inputnumber__WEBPACK_IMPORTED_MODULE_2__["default"],
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_3__["default"],
    Tag: primevue_tag__WEBPACK_IMPORTED_MODULE_4__["default"],
    ImagePreview: primevue_image__WEBPACK_IMPORTED_MODULE_5__["default"],
    Textarea: primevue_textarea__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  props: ['isInput', 'datapasien'],
  data: function data() {
    return {
      fact: [],
      jenisresep: ["R/", "RR/", ''],
      carapakai_obat: [],
      data_kco: [],
      modalracik: false,
      selectedPulvis: {
        nama: '',
        item: []
      },
      itemPulvisTemp: {
        nama: '',
        item: []
      },
      form: {
        startdate: '',
        enddate: '',
        itembarang: '',
        obatselected: [],
        selectedjns_resep: '',
        qty_selected: [],
        remark: [],
        DATA_SINGKAT: '',
        NOMR: '',
        modesales: '',
        NOPENDAFTARAN: '',
        DPJP: '',
        totalamount: '',
        waktu_masuk: '',
        RECEIPT_NO: '',
        POLI_RUANG: '',
        kategori: '',
        klinis: '',
        catatan: ''
      },
      param: {
        NOPENDAFTARAN: '',
        RECEIPT_NO: '',
        MODE: 'RCPT'
      },
      isLoading: false,
      fullPage: true,
      temo_qtyobat: 0,
      displayConfirmation: false,
      details_confirmation: false,
      loading_spiner: 'pi pi-spin pi-spinner',
      totalamount: 0,
      messages: [],
      riwayat_penunjang: [],
      detils_obat: [],
      form_kco: false,
      barcode: '',
      item: {},
      hasilbacaradiologi: []
    };
  },
  computed: {},
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  created: function created() {
    //this.getdataobat();

    //this.get_caraminum();
    this.get_riwayat();
    //this.param.RECEIPT_NO = "1100194767277779"
  },
  methods: {
    fetchData: function fetchData() {},
    onImageShow: function onImageShow() {
      // After image preview is shown, add a close button to the preview mask
      this.$nextTick(function () {
        var maskElement = document.querySelector('.p-image-mask');
        if (maskElement && !document.querySelector('.custom-close-btn')) {
          // Create close button element
          var closeBtn = document.createElement('button');
          closeBtn.className = 'custom-close-btn';
          closeBtn.innerHTML = '<i class="pi pi-times"></i>';

          // Add click event to close the preview
          closeBtn.addEventListener('click', function () {
            // Find and click the mask to close the preview
            var mask = document.querySelector('.p-image-mask');
            if (mask) mask.click();
          });

          // Append button to mask
          maskElement.appendChild(closeBtn);
        }
      });
    },
    convert_chart: function convert_chart(stringText) {
      if (stringText == null) {
        return "";
      } else {
        // let res =  stringText.replace(/(\\r)*\\n/g, '<br>')
        // res =  res.replace(/\n\n/g, '<br>');
        var res = stringText.replace(/\n/g, '<br>');
        return res;
      }
    },
    get_subdetail: function get_subdetail(no_receipt) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isLoading = true;
              //this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
              _this.form.no_receipt = no_receipt;
              // this.form.no_receipt = this.noreceipt;
              _this.form.mode = "1";
              _context.next = 5;
              return axios.post('/get_detail_radiologi', _this.form).then(function (response) {
                _this.hasilbacaradiologi = response.data.response;
                _this.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this.isLoading = false;
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
    itemSelected: function itemSelected(item) {
      this.item = item;
    },
    get_riwayat: function get_riwayat() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.isLoading = true;
              _this2.param.noregister = _this2.datapasien.NOPENDAFTARAN;
              _this2.param.jenisdata = 3;
              _context2.next = 5;
              return axios.post('/getheader_penunjang_v2', _this2.param).then(function (response) {
                _this2.riwayat_penunjang = response.data.response;
                _this2.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this2.isLoading = false;
              })["finally"](function () {
                return _this2.isLoading = false;
              });
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    addMessages: function addMessages() {
      this.messages = [{
        severity: 'info',
        content: 'Dynamic Info Message'
      }, {
        severity: 'success',
        content: 'Dynamic Success Message'
      }, {
        severity: 'warn',
        content: 'Dynamic Warning Message'
      }];
    },
    getdetail_sales: function getdetail_sales(RECEIPT_NO) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.isLoading = true;
              _this3.param.NOPENDAFTARAN = _this3.datapasien.NOPENDAFTARAN;
              _this3.param.RECEIPT_NO = RECEIPT_NO;
              _context3.next = 5;
              return axios.post('/getdetils_sales_radiologi', _this3.param).then(function (response) {
                _this3.detils_obat = response.data.response;
                _this3.isLoading = false;
                _this3.details_confirmation = true;
              })["catch"](function (error) {
                console.log(error);
                _this3.isLoading = false;
              })["finally"](function () {
                return _this3.isLoading = false;
              });
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    setLabel: function setLabel(item) {
      return item.name;
    },
    inputChange: function inputChange(text) {},
    additem_barang: function additem_barang(barang) {
      var currentDate = new Date();
      this.form.obatselected.push({
        BARCODE: barang.BARCODE,
        ID_BARANG: barang.BARCODE,
        NAMA: barang.NAMA,
        SATUAN: barang.SATUAN,
        RECEIPT_NO: '',
        HARGA: barang.HARGAJUAL,
        POTONGSTOCK: barang.POTONGSTOCK,
        TOTAL_ITEM: 0,
        QTY_RACIK: barang.QTY_RACIK,
        PERSEDIAAN: barang.QUNATITY,
        SATUAN_RACIK: barang.SATUAN_RACIK,
        MEREK: barang.SATUAN,
        TOTALAMOUNT: 0,
        DISCOUNT: 0,
        ITEMSEQNO: '',
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
        TANGGAL_TRANS: this.formattedDateTime()
      });
      this.setitemseqNo();
    },
    setitemseqNo: function setitemseqNo() {
      for (var i = 0; i < this.form.obatselected.length; i++) {
        this.form.obatselected[i].ITEMSEQNO = i + 1;
        this.form.obatselected[i].QTY = 1;
        this.form.qty_selected[i] = 1;
        this.form.obatselected[i].TOTALAMOUNT = this.form.obatselected[i].HARGA;
      }
      if (this.form.mode == 10) {
        this.form.itembarang = '';
        this.$refs.inputBox.focus();
      }
      this.counting();
    },
    setdosis: function setdosis(index) {
      var remark_item = "";
      remark_item = this.form.remark[index];
      this.form.obatselected[index].REMARK_ITEM = remark_item['REMARK'];
      console.log(this.form.obatselected[index].REMARK_ITEM);
    },
    save_sales: function save_sales() {
      var currentDate = new Date();
    },
    counting: function counting() {
      var amount = 0;
      for (var i = 0; i < this.form.obatselected.length; i++) {
        amount = amount + this.form.obatselected[i].TOTALAMOUNT;
      }
      this.totalamount = amount;
    },
    inputqtyobat: function inputqtyobat(index) {
      if (this.form.qty_selected[index] == "" || this.form.qty_selected[index] == null) {
        this.form.qty_selected[index] = 0;
      }
      this.form.obatselected[index].QTY = this.form.qty_selected[index];
      this.form.obatselected[index].TOTALAMOUNT = this.form.obatselected[index].QTY * this.form.obatselected[index].HARGA;
      console.log(this.form.qty_selected[index]);
      this.counting();
    },
    get_caraminum: function get_caraminum() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return axios.post('/get_carapakai_obat', "").then(function (response) {
                _this4.carapakai_obat = response.data.response;
                _this4.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this4.isLoading = false;
              })["finally"](function () {
                return _this4.isLoading = false;
              });
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    validation_data: function validation_data() {
      var isvalid = true;
      for (var i = 0; i < this.form.obatselected.length; i++) {
        if (this.form.obatselected[i].QTY == 0 || this.form.obatselected[i].QTY == "") {
          this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item " + this.form.obatselected[i].NAMA);
          isvalid = false;
        }
      }
      return isvalid;
    },
    simpan_sales: function simpan_sales() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var currentDate, isValid;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this5.isLoading = true;
              currentDate = new Date();
              _this5.form.waktu_masuk = currentDate;
              _this5.form.DATA_SINGKAT = _this5.datapasien.DATA_SINGKAT;
              _this5.form.NOPENDAFTARAN = _this5.datapasien.NOPENDAFTARAN;
              _this5.form.modesales = 'REG';
              _this5.form.DPJP = _this5.datapasien.NAMADOKTER;
              _this5.form.NOMR = _this5.datapasien.NOMR;
              _this5.form.RECEIPT_NO = '', _this5.form.POLI_RUANG = _this5.datapasien.POLI;
              _this5.form.OBAT_OBATAN = 3;
              isValid = _this5.validation_data();
              if (!(isValid == false)) {
                _context5.next = 14;
                break;
              }
              _this5.isLoading = false;
              return _context5.abrupt("return");
            case 14:
              if (!(_this5.form.klinis == '')) {
                _context5.next = 18;
                break;
              }
              _this5.open("warning", "Data klinis pasien wajib diisi");
              _this5.isLoading = false;
              return _context5.abrupt("return");
            case 18:
              if (_this5.form.catatan == '') {
                _this5.form.catatan = '-';
              }

              // console.log(JSON.stringify(this.form))
              // return;
              _context5.next = 21;
              return axios.post('/kirimpermintaan_obat', _this5.form).then(function (response) {
                console.log(response.data);
                _this5.isLoading = false;
                if (response.data.metadata.code == 200) {
                  _this5.open("success", "Data permintaan telah tersimpan, dengan nomor" + response.data.metadata.Receipt);
                  _this5.form.RECEIPT_NO = response.data.metadata.Receipt;
                  _this5.cleartable();
                  _this5.get_riwayat();
                }
              })["catch"](function (error) {
                console.log(error);
                _this5.open("warning", "Gagal proses," + error);
                _this5.isLoading = false;
              })["finally"](function () {
                return _this5.isLoading = false;
              });
            case 21:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    kirimpermintaan: function kirimpermintaan() {},
    hapusitem_barang: function hapusitem_barang(index) {
      this.form.obatselected.splice(index, 1);
      this.form.qty_selected.splice(index, 1);
      this.form.remark.splice(index, 1);
    },
    getdataobat: function getdataobat(mode) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(mode == 112)) {
                _context6.next = 6;
                break;
              }
              if (!(_this6.form.itembarang == "")) {
                _context6.next = 4;
                break;
              }
              _this6.fact = [];
              return _context6.abrupt("return");
            case 4:
              if (!(_this6.form.itembarang.length < 3)) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return");
            case 6:
              _this6.isLoading = true;
              _this6.form.mode = mode;
              _this6.form.breakdown = 0;
              _this6.form.kategori = 'RADIOLOGI';
              _context6.next = 12;
              return axios.post('/getdata_obat_baseparam', _this6.form).then(function (response) {
                console.log(response.data);
                _this6.fact = response.data.response;
                _this6.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this6.isLoading = false;
              })["finally"](function () {
                return _this6.isLoading = false;
              });
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    openConfirmation: function openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation: function closeConfirmation() {
      this.displayConfirmation = false;
    },
    confirm3: function confirm3(index, namaobat) {
      this.hapusitem_barang(index);
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
    getdata_kco: function getdata_kco() {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this7.isLoading = true;
              _this7.form.NOREGISTER = _this7.datapasien.NOPENDAFTARAN;
              _context7.next = 4;
              return axios.post('/get_data_kco', _this7.form).then(function (response) {
                _this7.data_kco = response.data.response;
                _this7.form_kco = true;
                _this7.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this7.isLoading = false;
              })["finally"](function () {
                return _this7.isLoading = false;
              });
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
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
    add_copy_item: function add_copy_item(row) {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var barang;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _this8.form.barcode = row.BARCODE;
              _context8.next = 3;
              return _this8.getdataobat(3);
            case 3:
              barang = _this8.fact[0];
              _this8.additem_barang(barang);
              _this8.open("success", row.NAMABARANG + " " + "Telah di tambahkan");
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    },
    add_copy_all: function add_copy_all() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var i, barang;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _this9.form_kco = false;
              i = 0;
            case 2:
              if (!(i < _this9.data_kco.itembarang.length)) {
                _context9.next = 11;
                break;
              }
              _this9.form.barcode = _this9.data_kco.itembarang[i].BARCODE;
              _context9.next = 6;
              return _this9.getdataobat(3);
            case 6:
              barang = _this9.fact[0];
              _this9.additem_barang(barang);
            case 8:
              i++;
              _context9.next = 2;
              break;
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }))();
    },
    cleartable: function cleartable() {
      this.form.obatselected = [];
      this.form.qty_selected = [];
      this.form.remark = [];
      this.form.klinis = '';
      this.form.catatan = '';
    },
    void_sales: function void_sales(rcpt_no) {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _this10.isLoading = true;
              _this10.form.NOREGISTER = _this10.datapasien.NOPENDAFTARAN;
              _this10.form.RECEIPT_NO = rcpt_no;
              _context10.next = 5;
              return axios.post('/void_sales', _this10.form).then(function (response) {
                _this10.isLoading = false;
                _this10.get_riwayat();
              })["catch"](function (error) {
                console.log(error);
                _this10.isLoading = false;
              })["finally"](function () {
                return _this10.isLoading = false;
              });
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }))();
    },
    kirim_resep: function kirim_resep(rcpt_no) {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _this11.isLoading = true;
              _this11.form.RECEIPT_NO = rcpt_no;
              _context11.next = 4;
              return axios.post('/kirim_resep', _this11.form).then(function (response) {
                _this11.isLoading = false;
                _this11.details_confirmation = false;
                _this11.open("success", response.data.metadata.message);
                _this11.get_riwayat();
              })["catch"](function (error) {
                console.log(error);
                _this11.isLoading = false;
              })["finally"](function () {
                return _this11.isLoading = false;
              });
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card card-primary card-outline"
};
var _hoisted_4 = {
  "class": "card-body"
};
var _hoisted_5 = {
  "class": "table table-sm tb-sm table-bordered table-striped small-table"
};
var _hoisted_6 = {
  key: 0
};
var _hoisted_7 = {
  "class": "card card-primary card-outline"
};
var _hoisted_8 = {
  "class": "card-body"
};
var _hoisted_9 = {
  "class": "table table-sm table-bordered table-striped"
};
var _hoisted_10 = {
  "class": "p-input-icon-left mb-5"
};
var _hoisted_11 = {
  "class": "card card-primary card-outline"
};
var _hoisted_12 = {
  "class": "card-body"
};
var _hoisted_13 = {
  "class": "table table-sm table-bordered table-striped"
};
var _hoisted_14 = {
  "class": "row"
};
var _hoisted_15 = {
  key: 0
};
var _hoisted_16 = {
  "class": "col-sm-3"
};
var _hoisted_17 = {
  "class": "card card-primary card-outline"
};
var _hoisted_18 = {
  "class": "card-header"
};
var _hoisted_19 = {
  "class": "card-title"
};
var _hoisted_20 = {
  "class": "card-body",
  style: {
    "height": "400px",
    "overflow-y": "auto"
  }
};
var _hoisted_21 = {
  "class": "card"
};
var _hoisted_22 = {
  "class": "card-header"
};
var _hoisted_23 = {
  "class": "card-title"
};
var _hoisted_24 = {
  "class": "card-tools"
};
var _hoisted_25 = {
  "class": "card-body"
};
var _hoisted_26 = {
  key: 0
};
var _hoisted_27 = {
  key: 1
};
var _hoisted_28 = {
  key: 0
};
var _hoisted_29 = {
  key: 1
};
var _hoisted_30 = {
  key: 2
};
var _hoisted_31 = {
  "class": "col-sm-9"
};
var _hoisted_32 = {
  "class": "card card-primary card-outline"
};
var _hoisted_33 = {
  "class": "card-body"
};
var _hoisted_34 = {
  "class": "row"
};
var _hoisted_35 = {
  "class": "col-md-6"
};
var _hoisted_36 = {
  "class": "col-md-3"
};
var _hoisted_37 = {
  "class": "col-md-3"
};
var _hoisted_38 = {
  "class": "table table-sm tb-sm table-bordered table-striped small-table"
};
var _hoisted_39 = {
  "class": "card-footer"
};
var _hoisted_40 = {
  "class": "card card-primary card-outline"
};
var _hoisted_41 = {
  "class": "card-body"
};
var _hoisted_42 = {
  "class": "row invoice-info mb-3"
};
var _hoisted_43 = {
  "class": "col-sm-4 invoice-col"
};
var _hoisted_44 = {
  "class": "col-sm-4 invoice-col"
};
var _hoisted_45 = {
  "class": "col-sm-4 invoice-col"
};
var _hoisted_46 = {
  key: 0
};
var _hoisted_47 = {
  key: 1
};
var _hoisted_48 = ["onClick"];
var _hoisted_49 = {
  "class": "badge badge-info mr-2"
};
var _hoisted_50 = {
  "class": "mr-auto font-weight-bold text-dark"
};
var _hoisted_51 = {
  key: 0,
  "class": "badge badge-danger mr-2"
};
var _hoisted_52 = {
  "class": "badge badge-secondary mr-2"
};
var _hoisted_53 = {
  "class": "table table-sm table-bordered table-striped small-table mb-0"
};
var _hoisted_54 = {
  key: 0,
  style: {
    "color": "red"
  }
};
var _hoisted_55 = {
  key: 1,
  style: {
    "color": "black"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_ConfirmDialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ConfirmDialog");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_ProgressBar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ProgressBar");
  var _component_Tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag");
  var _component_Textarea = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Textarea");
  var _component_InputNumber = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputNumber");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ConfirmDialog), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Daftar laboratorium",
    visible: $data.form_kco,
    "onUpdate:visible": _cache[2] || (_cache[2] = function ($event) {
      return $data.form_kco = $event;
    }),
    containerStyle: {
      width: '70vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $data.form_kco = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Copy Semua\" icon=\"pi pi-plus\" @click=\"add_copy_all()\" class=\"p-button-warning\"\n                        autofocus /> ")];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#", -1 /* CACHED */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#", -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BACODE", -1 /* CACHED */)), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA OBAT", -1 /* CACHED */)), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "JENIS", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.header, function (tgl, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tgl.datacaption), 1 /* TEXT */);
      }), 256 /* UNKEYED_FRAGMENT */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TOTAL", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.itembarang, function (data, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
          key: index
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          icon: "pi pi-plus",
          onClick: function onClick($event) {
            return $options.add_copy_item(data);
          },
          "class": "p-button p-button-sm p-btn-sm p-button-warning"
        }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.NAMABARANG), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.SATUAN), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.header, function (tgl, index) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.sub_item, function (item, sub_item) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [data.BARCODE == item.BARCODE && tgl.tgl == item.DT_ONLY ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.QTY), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
          }), 256 /* UNKEYED_FRAGMENT */))]);
        }), 256 /* UNKEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.TOTAL), 1 /* TEXT */)])]);
      }), 128 /* KEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: $data.param.RECEIPT_NO,
    visible: $data.details_confirmation,
    "onUpdate:visible": _cache[4] || (_cache[4] = function ($event) {
      return $data.details_confirmation = $event;
    }),
    containerStyle: {
      width: '70vw'
    },
    modal: false
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: _cache[3] || (_cache[3] = function ($event) {
          return $data.details_confirmation = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Kirim Permintaan\" icon=\"pi pi-send\" @click=\"kirim_resep(param.RECEIPT_NO)\"\n                        autofocus /> ")];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_9, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "SUB_BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA BARANG"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "QTY"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "SATUAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "HARGA")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.detils_obat, function (row, k) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.SUB_BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.NAMABARANG), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.QTY), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.SATUAN), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.HARGA), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["header", "visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Daftar Laboratorium",
    visible: $data.displayConfirmation,
    "onUpdate:visible": _cache[8] || (_cache[8] = function ($event) {
      return $data.displayConfirmation = $event;
    }),
    modal: true,
    "class": "lab-dialog",
    style: {
      width: '60vw'
    }
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: $options.closeConfirmation,
        "class": "p-button-text"
      }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Yes",
        icon: "pi pi-check",
        onClick: $options.closeConfirmation,
        autofocus: ""
      }, null, 8 /* PROPS */, ["onClick"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "text",
        "class": "form-control",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.form.itembarang = $event;
        }),
        ref: "inputBox",
        onInput: _cache[6] || (_cache[6] = function ($event) {
          return $options.getdataobat(112);
        }),
        placeholder: "Search"
      }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.itembarang]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "",
        "class": "mb-5",
        loading: $data.isLoading,
        icon: "pi pi-search",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $options.getdataobat(112);
        })
      }, null, 8 /* PROPS */, ["loading"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_13, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <th>SUB_BARCODE</th> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <th>GROUPING</th> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "HARGA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "AKSI")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.fact, function (row, k) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>{{row.SUB_BARCODE}}</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>{{row.GROUPING }}</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.NAMA), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.HARGAJUAL), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          "class": "btn p-btn-sm",
          onClick: function onClick($event) {
            return $options.additem_barang(row);
          },
          icon: "pi pi-plus"
        }, null, 8 /* PROPS */, ["onClick"])])]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [$data.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ProgressBar, {
    mode: "indeterminate",
    style: {
      "height": ".5em"
    }
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_19, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Riwayat", -1 /* CACHED */)), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    onClick: _cache[9] || (_cache[9] = function ($event) {
      return $options.get_riwayat();
    }),
    "class": "p-button-text p-button-dange",
    icon: "pi pi-refresh"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.riwayat_penunjang, function (data, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: data.RECEIPT_NO,
      onClick: function onClick($event) {
        return $options.getdetail_sales(data.RECEIPT_NO);
      },
      "class": "p-button-text"
    }, null, 8 /* PROPS */, ["label", "onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <strong>{{data.RECEIPT_NO}}</strong> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "",
      onClick: function onClick($event) {
        return $options.void_sales(data.RECEIPT_NO);
      },
      "class": "p-button-text p-button-danger",
      icon: "pi pi-times"
    }, null, 8 /* PROPS */, ["onClick"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.TANGGAL) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.JAM), 1 /* TEXT */), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Apakah Sudah di proses? ", -1 /* CACHED */)), data.STATUS_PROGRESS == 'M' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Tag class=\"mr-2\" severity=\"warning\">Blm</Tag> "), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Belum", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), data.STATUS_PROGRESS == 'P' || data.STATUS_PROGRESS == 'C' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_27, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Ya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Tag class=\"mr-2\" severity=\"success\">Sudah</Tag> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.DPJP), 1 /* TEXT */), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))]), data.TELAH_DIKIRIM == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_28, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Status: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button icon=\"pi pi-check\" @click=\"getdetail_sales(data.RECEIPT_NO)\"\n                                            class=\"p-button-rounded p-button-success p-button-outlined\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
      "class": "mr-2",
      severity: "success",
      value: "terkirim"
    })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), data.TELAH_DIKIRIM == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Status : ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
      "class": "mr-2",
      severity: "warning",
      value: "blm terkirim"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-send",
      "class": "p-button-sm p-button-primary",
      onClick: function onClick($event) {
        return $options.kirim_resep(data.RECEIPT_NO);
      }
    }, null, 8 /* PROPS */, ["onClick"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), data.STATUS_PROGRESS == 'P' || data.STATUS_PROGRESS == 'C' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "Lihat hasil",
      icon: "pi pi-search",
      "class": "p-button-sm p-button-text p-button-primary",
      onClick: function onClick($event) {
        return $options.gethasilpemeriksaan_lab(data.RECEIPT_NO);
      }
    }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "Cetak",
      icon: "pi pi-print",
      "class": "p-button-sm p-button-text p-button-secondary",
      onClick: function onClick($event) {
        return $options.cetakHasilLab(data.RECEIPT_NO);
      }
    }, null, 8 /* PROPS */, ["onClick"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Yes\" icon=\"pi pi-check\" @click=\"addMessages\" autofocus />  ")])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Permintaan Laboratorium")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Pilih Item Pemeriksaan",
    "class": "p-button-text",
    icon: "pi pi-search",
    onClick: $options.openConfirmation
  }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Copy\" class=\"p-button-text p-button-success\"\n                                        icon=\"pi pi-external-link\" @click=\"getdata_kco()\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Hapus",
    "class": "p-button-text p-button-danger",
    icon: "pi pi-times",
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.cleartable();
    })
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "klinis"
  }, "Klinis", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
    id: "klinis",
    style: {
      "width": "100%"
    },
    placeholder: "Wajib Input Klinis",
    modelValue: $data.form.klinis,
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return $data.form.klinis = $event;
    })
  }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "catatan"
  }, "Catatan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
    id: "catatan",
    style: {
      "width": "100%"
    },
    placeholder: "Input Catatan",
    modelValue: $data.form.catatan,
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return $data.form.catatan = $event;
    })
  }, null, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_38, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "QTY"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "SATUAN")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.form.obatselected, function (selected, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-times",
      onClick: function onClick($event) {
        return $options.confirm3(index, selected.NAMA);
      },
      "class": "p-button-rounded p-button-danger p-button-text"
    }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.NAMA) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, " Harga : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.HARGA), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
      id: "minmax",
      modelValue: $data.form.qty_selected[index],
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $data.form.qty_selected[index] = $event;
      },
      autocomplete: "off",
      onInput: function onInput($event) {
        return $options.inputqtyobat(index);
      },
      minFractionDigits: 2,
      mode: "decimal",
      min: 0,
      max: 200
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "onInput"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.SATUAN), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tfoot", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TOTAL", -1 /* CACHED */)), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
    id: "minmax",
    modelValue: $data.totalamount,
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return $data.totalamount = $event;
    }),
    autocomplete: "off",
    minFractionDigits: 2,
    mode: "decimal",
    min: 0,
    disabled: ""
  }, null, 8 /* PROPS */, ["modelValue"])]), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Simpan",
    icon: "pi pi-check",
    onClick: $options.simpan_sales,
    autofocus: ""
  }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Kirim Permintaan\" class=\"p-button-success\" icon=\"pi pi-send\"\n                                @click=\"kirimpermintaan\" autofocus /> ")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <history_obat :datapasien=\"datapasien\"></history_obat>  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"card card-primary card-outline\">\n                <div class=\"card-header\">\n                    <h3 class=\"card-title\">\n                        <h5>Hasil pemeriksaan Laboratorium</h5>\n                    </h3>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"row invoice-info\">\n                        <div class=\"col-sm-4 invoice-col\">\n                            Pasien\n                            <address>\n                                <strong>{{datalab_pasien.NAMA}} ({{datalab_pasien.JENISKELAMIN}}-{{datalab_pasien.USIA}}) </strong><br>\n                            </address>\n                        </div>\n                        <div class=\"col-sm-4 invoice-col\">\n                            Masuk\n                            <address>\n                               Tanggal order : <strong>  {{datalab_pasien.TANGGAL}} </strong>\n                            </address>\n                        </div>\n                        <div class=\"col-sm-4 invoice-col\">\n                            Otorisasi\n                            <address>\n                               Telah dilakukan otorisasi : <strong v-if=\"datalab_pasien.IS_VERIFIED==1\"> Ya, </strong>\n                               <strong v-if=\"datalab_pasien.IS_VERIFIED==0\"> Belum </strong>\n                               <strong>{{datalab_pasien.PETUGAS_OTENTIKASI}}</strong>\n                            </address>\n\n                        </div>\n                    </div>\n                    <table class=\"table table-sm tb-sm table-bordered table-striped small-table\">\n                        <thead>\n                            <tr>\n                                <th>#</th>\n                                <th>#</th>\n                                <th>PEMERIKSAAN</th>\n                                <th>HASIL</th>\n                                <th>NORMAL</th>\n                                <th>SATUAN</th>\n                                <th>KET HASIL</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr v-for=\"(hasil,index) in detailpemeriksaanlab\" :key=\"index\">\n                                <td>{{ index+1 }}</td>\n                                <td>{{ hasil.NAMA }}</td>\n                                <td>{{ hasil.PEMERIKSAAN }}</td>\n                                <td>\n                                    <span v-if=\"hasil.HASIL_TIDAK_NORMAL==1\">\n                                     <strong style=\"color: red;\">{{ hasil.HASIL }}</strong>\n                                    </span>\n                                    <span v-if=\"hasil.HASIL_TIDAK_NORMAL==0\">\n                                     <strong style=\"color: black;\"> {{ hasil.HASIL }}</strong>\n                                    </span>\n                                </td>\n                                <td>{{ hasil.NORMAL }}</td>\n                                <td>{{ hasil.SATUAN }}</td>\n                                <td>{{ hasil.KET_HASIL }}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n\n                </div>\n            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Hasil Pemeriksaan Laboratorium")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Info Pasien "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pasien ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datalab_pasien.NAMA) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datalab_pasien.JENISKELAMIN) + "-" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datalab_pasien.USIA) + ")", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Masuk ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Tanggal order: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datalab_pasien.TANGGAL), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Otorisasi ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Telah dilakukan otorisasi: ", -1 /* CACHED */)), $data.datalab_pasien.IS_VERIFIED == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_46, "Ya, ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.datalab_pasien.IS_VERIFIED == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_47, "Belum ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.datalab_pasien.PETUGAS_OTENTIKASI), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Master-Detail per Grup NAMA "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.groupedByNama, function (items, namaGrup) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: namaGrup,
      "class": "card mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Master Header (induk) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "card-header d-flex align-items-center",
      style: {
        "cursor": "pointer",
        "background": "#f4f6f9"
      },
      onClick: function onClick($event) {
        return $options.toggleGrup(namaGrup);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(namaGrup), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(namaGrup), 1 /* TEXT */), $options.countAbnormal(items) > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.countAbnormal(items)) + " tidak normal ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(items.length) + " item", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', $data.openGrup[namaGrup] ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Detail (child) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_53, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Pemeriksaan"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Hasil"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Normal"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Satuan"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Ket Hasil")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(items, function (hasil, index) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
        key: index
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.PEMERIKSAAN), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [hasil.HASIL_TIDAK_NORMAL == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.HASIL), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.HASIL), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.NORMAL), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.SATUAN), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hasil.KET_HASIL), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.openGrup[namaGrup]]])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card card-primary card-outline"
};
var _hoisted_4 = {
  "class": "card-body"
};
var _hoisted_5 = {
  "class": "table table-sm tb-sm table-bordered table-striped small-table"
};
var _hoisted_6 = {
  key: 0
};
var _hoisted_7 = {
  "class": "card card-primary card-outline"
};
var _hoisted_8 = {
  "class": "card-body"
};
var _hoisted_9 = {
  "class": "table table-sm table-bordered table-striped"
};
var _hoisted_10 = {
  "class": "p-input-icon-left mb-5"
};
var _hoisted_11 = {
  "class": "card card-primary card-outline"
};
var _hoisted_12 = {
  "class": "card-body"
};
var _hoisted_13 = {
  "class": "table table-sm table-bordered table-striped"
};
var _hoisted_14 = {
  "class": "row"
};
var _hoisted_15 = {
  "class": "col-sm-3"
};
var _hoisted_16 = {
  "class": "card card-primary card-outline"
};
var _hoisted_17 = {
  "class": "card-header"
};
var _hoisted_18 = {
  "class": "card-title"
};
var _hoisted_19 = {
  "class": "card-body",
  style: {
    "height": "400px",
    "overflow-y": "auto"
  }
};
var _hoisted_20 = {
  "class": "card"
};
var _hoisted_21 = {
  "class": "card-header"
};
var _hoisted_22 = {
  "class": "card-title"
};
var _hoisted_23 = {
  "class": "card-tools"
};
var _hoisted_24 = {
  "class": "card-body"
};
var _hoisted_25 = {
  key: 0
};
var _hoisted_26 = {
  key: 1
};
var _hoisted_27 = {
  key: 0
};
var _hoisted_28 = {
  key: 1
};
var _hoisted_29 = {
  "class": "col-sm-9"
};
var _hoisted_30 = {
  "class": "card card-primary card-outline"
};
var _hoisted_31 = {
  "class": "card-body"
};
var _hoisted_32 = {
  "class": "row"
};
var _hoisted_33 = {
  "class": "col-md-6"
};
var _hoisted_34 = {
  "class": "col-md-3"
};
var _hoisted_35 = {
  "class": "col-md-3"
};
var _hoisted_36 = {
  "class": "table table-sm tb-sm table-bordered table-striped small-table"
};
var _hoisted_37 = {
  key: 0
};
var _hoisted_38 = {
  "class": "card-footer"
};
var _hoisted_39 = {
  "class": "card-body"
};
var _hoisted_40 = {
  "class": "form-group"
};
var _hoisted_41 = {
  "class": "row"
};
var _hoisted_42 = {
  "class": "col-sm-4"
};
var _hoisted_43 = {
  "class": "form-group"
};
var _hoisted_44 = ["onUpdate:modelValue"];
var _hoisted_45 = {
  "class": "col-sm-2"
};
var _hoisted_46 = {
  "class": "form-group"
};
var _hoisted_47 = {
  "class": "card card-primary card-outline"
};
var _hoisted_48 = {
  "class": "card-body"
};
var _hoisted_49 = {
  "class": "row"
};
var _hoisted_50 = {
  "class": "col-sm-9"
};
var _hoisted_51 = {
  "class": "card"
};
var _hoisted_52 = {
  "class": "card-header"
};
var _hoisted_53 = {
  "class": "card-title"
};
var _hoisted_54 = {
  "class": "card-body"
};
var _hoisted_55 = {
  "class": "row"
};
var _hoisted_56 = {
  "class": "col-md-4"
};
var _hoisted_57 = {
  "class": "image-preview-container"
};
var _hoisted_58 = {
  "class": "col-md-8"
};
var _hoisted_59 = {
  "class": "text-muted"
};
var _hoisted_60 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  var _component_ConfirmDialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ConfirmDialog");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_Tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag");
  var _component_Textarea = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Textarea");
  var _component_InputNumber = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputNumber");
  var _component_ImagePreview = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ImagePreview");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ConfirmDialog), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Header",
    visible: $data.form_kco,
    "onUpdate:visible": _cache[3] || (_cache[3] = function ($event) {
      return $data.form_kco = $event;
    }),
    containerStyle: {
      width: '70vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $data.form_kco = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Copy Semua",
        icon: "pi pi-plus",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.add_copy_all();
        }),
        "class": "p-button-warning",
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#", -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#", -1 /* CACHED */)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BACODE", -1 /* CACHED */)), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA OBAT", -1 /* CACHED */)), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "JENIS", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.header, function (tgl, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tgl.datacaption), 1 /* TEXT */);
      }), 256 /* UNKEYED_FRAGMENT */)), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TOTAL", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.itembarang, function (data, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
          key: index
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          icon: "pi pi-plus",
          onClick: function onClick($event) {
            return $options.add_copy_item(data);
          },
          "class": "p-button p-button-sm p-btn-sm p-button-warning"
        }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.NAMABARANG), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.SATUAN), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.header, function (tgl, index) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data_kco.sub_item, function (item, sub_item) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [data.BARCODE == item.BARCODE && tgl.tgl == item.DT_ONLY ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.QTY), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
          }), 256 /* UNKEYED_FRAGMENT */))]);
        }), 256 /* UNKEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.TOTAL), 1 /* TEXT */)])]);
      }), 128 /* KEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: $data.param.RECEIPT_NO,
    visible: $data.details_confirmation,
    "onUpdate:visible": _cache[5] || (_cache[5] = function ($event) {
      return $data.details_confirmation = $event;
    }),
    containerStyle: {
      width: '70vw'
    },
    modal: false
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return $data.details_confirmation = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Kirim Permintaan\" icon=\"pi pi-send\" @click=\"kirim_resep(param.RECEIPT_NO)\"\n                        autofocus /> ")];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_9, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <th>SUB_BARCODE</th> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA BARANG"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "QTY"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "SATUAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "HARGA")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.detils_obat, function (row, k) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>{{row.SUB_BARCODE}}</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.NAMABARANG), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.QTY), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.SATUAN), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.HARGA), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["header", "visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "List Item Radiologi",
    visible: $data.displayConfirmation,
    "onUpdate:visible": _cache[9] || (_cache[9] = function ($event) {
      return $data.displayConfirmation = $event;
    }),
    modal: true,
    "class": "radiologi-dialog",
    style: {
      width: '60vw'
    }
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: $options.closeConfirmation,
        "class": "p-button-text"
      }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Yes",
        icon: "pi pi-check",
        onClick: $options.closeConfirmation,
        autofocus: ""
      }, null, 8 /* PROPS */, ["onClick"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "text",
        "class": "form-control",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          return $data.form.itembarang = $event;
        }),
        ref: "inputBox",
        onInput: _cache[7] || (_cache[7] = function ($event) {
          return $options.getdataobat(112);
        }),
        placeholder: "Search"
      }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.itembarang]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "",
        "class": "mb-5",
        loading: $data.isLoading,
        icon: "pi pi-search",
        onClick: _cache[8] || (_cache[8] = function ($event) {
          return $options.getdataobat(10);
        })
      }, null, 8 /* PROPS */, ["loading"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_13, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <th>SUB_BARCODE</th> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <th>GROUPING</th> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "HARGA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "PERSEDIAAN"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "AKSI")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.fact, function (row, k) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>{{row.SUB_BARCODE}}</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <td>{{row.GROUPING }}</td> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.NAMA), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.HARGAJUAL), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.QUNATITY), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          "class": "btn p-btn-sm",
          onClick: function onClick($event) {
            return $options.additem_barang(row);
          },
          icon: "pi pi-plus"
        }, null, 8 /* PROPS */, ["onClick"])])]);
      }), 256 /* UNKEYED_FRAGMENT */))])])])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_18, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Riwayat", -1 /* CACHED */)), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.get_riwayat();
    }),
    "class": "p-button-text p-button-dange",
    icon: "pi pi-refresh"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.riwayat_penunjang, function (data, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: data.RECEIPT_NO,
      onClick: function onClick($event) {
        return $options.getdetail_sales(data.RECEIPT_NO);
      },
      "class": "p-button-text"
    }, null, 8 /* PROPS */, ["label", "onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <strong>{{data.RECEIPT_NO}}</strong> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "",
      onClick: function onClick($event) {
        return $options.void_sales(data.RECEIPT_NO);
      },
      "class": "p-button-text p-button-danger",
      icon: "pi pi-times"
    }, null, 8 /* PROPS */, ["onClick"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("address", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.TANGGAL) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.JAM), 1 /* TEXT */), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Apakah Sudah di proses? ", -1 /* CACHED */)), data.STATUS_PROGRESS == 'M' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_25, _toConsumableArray(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Belum", -1 /* CACHED */)])))) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), data.STATUS_PROGRESS == 'C' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Ya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Tag class=\"mr-2\" severity=\"success\">Sudah</Tag> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.DPJP), 1 /* TEXT */), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))]), data.TELAH_DIKIRIM == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_27, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Status: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button icon=\"pi pi-check\" @click=\"getdetail_sales(data.RECEIPT_NO)\"\n                                            class=\"p-button-rounded p-button-success p-button-outlined\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
      "class": "mr-2",
      severity: "success",
      value: "terkirim"
    })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), data.TELAH_DIKIRIM == 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_28, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Status : ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
      "class": "mr-2",
      severity: "warn",
      value: "blm terkirim"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-send",
      severity: "warn",
      "class": "p-button-sm",
      onClick: function onClick($event) {
        return $options.kirim_resep(data.RECEIPT_NO);
      }
    }, null, 8 /* PROPS */, ["onClick"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      label: "Lihat hasil",
      icon: "pi pi-search",
      "class": "p-button-sm p-button-text p-button-primary",
      onClick: function onClick($event) {
        return $options.get_subdetail(data.RECEIPT_NO);
      }
    }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Yes\" icon=\"pi pi-check\" @click=\"addMessages\" autofocus />  ")])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Permintaan Radiologi")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Pilih Item Pemeriksaan",
    "class": "p-button-text",
    icon: "pi pi-search",
    onClick: $options.openConfirmation
  }, null, 8 /* PROPS */, ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button label=\"Copy\" class=\"p-button-text p-button-success\"\n                                        icon=\"pi pi-external-link\" @click=\"getdata_kco()\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Hapus",
    "class": "p-button-text p-button-danger",
    icon: "pi pi-times",
    onClick: _cache[11] || (_cache[11] = function ($event) {
      return $options.cleartable();
    })
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "klinis"
  }, "Klinis", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
    id: "klinis",
    style: {
      "width": "100%"
    },
    placeholder: "Wajib Input Klinis",
    modelValue: $data.form.klinis,
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return $data.form.klinis = $event;
    })
  }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "catatan"
  }, "Catatan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
    id: "catatan",
    style: {
      "width": "100%"
    },
    placeholder: "Input Catatan",
    modelValue: $data.form.catatan,
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return $data.form.catatan = $event;
    })
  }, null, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_36, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "#"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NO"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "BARCODE"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "NAMA"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "QTY"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "SATUAN")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.form.obatselected, function (selected, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-times",
      onClick: function onClick($event) {
        return $options.confirm3(index, selected.NAMA);
      },
      "class": "p-button-rounded p-button-danger p-button-text"
    }, null, 8 /* PROPS */, ["onClick"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.BARCODE), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.NAMA) + " ", 1 /* TEXT */), _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), selected.AS_PARENT == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.ITEM_RACIKAN.nama), 1 /* TEXT */), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(selected.ITEM_RACIKAN.item, function (pulvis) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pulvis.nama) + " -- " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pulvis.dosis) + " ", 1 /* TEXT */), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */))]);
    }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, " Harga : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.HARGA) + "- Persediaan : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.PERSEDIAAN), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
      id: "minmax",
      modelValue: $data.form.qty_selected[index],
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $data.form.qty_selected[index] = $event;
      },
      autocomplete: "off",
      onInput: function onInput($event) {
        return $options.inputqtyobat(index);
      },
      minFractionDigits: 2,
      mode: "decimal",
      min: 0,
      max: 200
    }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "onInput"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(selected.SATUAN), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tfoot", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "TOTAL", -1 /* CACHED */)), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputNumber, {
    id: "minmax",
    modelValue: $data.totalamount,
    "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
      return $data.totalamount = $event;
    }),
    autocomplete: "off",
    minFractionDigits: 2,
    mode: "decimal",
    min: 0,
    disabled: ""
  }, null, 8 /* PROPS */, ["modelValue"])]), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */)), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, null, -1 /* CACHED */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Simpan",
    icon: "pi pi-check",
    onClick: $options.simpan_sales,
    autofocus: ""
  }, null, 8 /* PROPS */, ["onClick"])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <history_obat :datapasien=\"datapasien\"></history_obat>  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <hasilbaca-radiologi :noreceipt=param.RECEIPT_NO></hasilbaca-radiologi> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Header x",
    visible: $data.modalracik,
    "onUpdate:visible": _cache[19] || (_cache[19] = function ($event) {
      return $data.modalracik = $event;
    }),
    containerStyle: {
      width: '40vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "No",
        icon: "pi pi-times",
        onClick: _cache[17] || (_cache[17] = function ($event) {
          return $data.modalracik = false;
        }),
        "class": "p-button-text"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Yes",
        icon: "pi pi-check",
        onClick: _cache[18] || (_cache[18] = function ($event) {
          return _ctx.addpulvisToMainSelectedItem();
        }),
        autofocus: ""
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "exampleInputEmail1"
      }, "Racikan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "text",
        "class": "form-control",
        id: "exampleInputEmail1",
        "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
          return $data.selectedPulvis.nama = $event;
        }),
        placeholder: "Cara Pakai"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.selectedPulvis.nama]])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.selectedPulvis.item, function (data, index) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          "class": "col-sm-4"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"form-group\">\n                                <input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\"\n                                    placeholder=\"Nama Sediaan\" v-model=\"data.nama\">\n                            </div> ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
          type: "text",
          "class": "form-control",
          id: "dosis",
          placeholder: "Dosis",
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return data.dosis = $event;
          }
        }, null, 8 /* PROPS */, _hoisted_44), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, data.dosis]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
          label: "",
          icon: "pi pi-minus",
          "class": "p-button-danger p-button-sm",
          onClick: function onClick($event) {
            return _ctx.hapusitemPulvis(index);
          },
          autofocus: ""
        }, null, 8 /* PROPS */, ["onClick"])])])]);
      }), 256 /* UNKEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "",
        icon: "pi pi-plus",
        "class": "p-button-success p-button-sm",
        onClick: _cache[16] || (_cache[16] = function ($event) {
          return _ctx.addItemPulvis();
        }),
        autofocus: ""
      })])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, " Expertis radiologi")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.hasilbacaradiologi, function (item) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_53, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Keterangan hasil baca ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.NAMA), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.attachment, function (att) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Image Preview Component "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ImagePreview, {
        src: att.link_img,
        alt: "Image",
        width: "250",
        preview: "",
        "class": "mb-2 custom-image-preview",
        onShow: $options.onImageShow
      }, {
        indicator: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(att.caption_file), 1 /* TEXT */)];
        }),
        _: 2 /* DYNAMIC */
      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["src", "onShow"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <ImagePreview :src=\"att.link_img\" alt=\"Image\" width=\"250\" preview\n                                                    class=\"mb-2\">\n                                                    <template #indicator>\n                                                        {{att.caption_file}}\n                                                    </template>\n                                                </ImagePreview> ")]);
    }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Subject ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_59, "Hasil baca Radiologi, update terakhir " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.TANGGAL_TIMPSTAMP), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: $options.convert_chart(item.HASIL_BACA)
    }, null, 8 /* PROPS */, _hoisted_60)])])])])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Paksa semua dialog selalu center terhadap full viewport,\n   mengabaikan margin-left sidebar AdminLTE */\n[data-v-4a92bb88] .p-dialog-mask {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n}\n[data-v-4a92bb88] .lab-dialog.p-dialog {\n    width: 60vw !important;\n    max-width: 60vw !important;\n}\n[data-v-4a92bb88] .lab-dialog .p-dialog-content {\n    overflow-x: hidden;\n}\n@media (max-width: 768px) {\n[data-v-4a92bb88] .lab-dialog.p-dialog {\n        width: 100vw !important;\n        max-width: 100vw !important;\n        height: 100dvh !important;\n        max-height: 100dvh !important;\n        margin: 0 !important;\n        border-radius: 0 !important;\n}\n[data-v-4a92bb88] .lab-dialog .p-dialog-content {\n        flex: 1;\n        overflow-y: auto;\n        overflow-x: hidden;\n        border-radius: 0 !important;\n}\n[data-v-4a92bb88] .lab-dialog .p-dialog-header {\n        border-radius: 0 !important;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Vue 2 syntax for deep selectors */\n.custom-image-preview >>> .p-image-preview {\n  padding: 2rem;\n  background-color: rgba(255, 255, 255, 0.95);\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n}\n\n/* Style for the caption/indicator */\n.custom-image-preview >>> .p-image-preview-indicator {\n  font-weight: 500;\n  padding: 0.5rem;\n  background: rgba(0, 0, 0, 0.6);\n  color: #ffffff;\n  border-radius: 4px;\n}\n\n/* Improving the overlay background */\n.custom-image-preview >>> .p-image-mask {\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n/* Additional style to make the image look better in normal view */\n.custom-image-preview >>> .p-image img {\n  border-radius: 6px;\n  border: 1px solid #e0e0e0;\n}\n\n/* Custom close button styling */\n.custom-close-btn {\n  position: absolute;\n  top: 50px;\n  right: 20px;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.8);\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  z-index: 10000;\n}\n.custom-close-btn:hover {\n  background-color: rgba(255, 255, 255, 1);\n  transform: scale(1.1);\n}\n.custom-close-btn i {\n  font-size: 1.2rem;\n  color: #333;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Paksa dialog selalu center terhadap full viewport,\n   mengabaikan margin-left sidebar AdminLTE */\n[data-v-75e060ee] .p-dialog-mask {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n}\n[data-v-75e060ee] .radiologi-dialog.p-dialog {\n    width: 60vw !important;\n    max-width: 60vw !important;\n}\n[data-v-75e060ee] .radiologi-dialog .p-dialog-content {\n    overflow-x: hidden;\n}\n@media (max-width: 768px) {\n[data-v-75e060ee] .radiologi-dialog.p-dialog {\n        width: 100vw !important;\n        max-width: 100vw !important;\n        height: 100dvh !important;\n        max-height: 100dvh !important;\n        margin: 0 !important;\n        border-radius: 0 !important;\n}\n[data-v-75e060ee] .radiologi-dialog .p-dialog-content {\n        flex: 1;\n        overflow-y: auto;\n        overflow-x: hidden;\n        border-radius: 0 !important;\n}\n[data-v-75e060ee] .radiologi-dialog .p-dialog-header {\n        border-radius: 0 !important;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_style_index_0_id_4a92bb88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_style_index_0_id_4a92bb88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_style_index_0_id_4a92bb88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_0_id_75e060ee_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_0_id_75e060ee_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_0_id_75e060ee_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_1_id_75e060ee_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_1_id_75e060ee_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_1_id_75e060ee_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PermintaanLabComponent_vue_vue_type_template_id_4a92bb88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true */ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true");
/* harmony import */ var _PermintaanLabComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PermintaanLabComponent.vue?vue&type=script&lang=js */ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PermintaanLabComponent_vue_vue_type_style_index_0_id_4a92bb88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css */ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PermintaanLabComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PermintaanLabComponent_vue_vue_type_template_id_4a92bb88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-4a92bb88"],['__file',"resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PermintaanRadiologiComponent_vue_vue_type_template_id_75e060ee_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true */ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true");
/* harmony import */ var _PermintaanRadiologiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PermintaanRadiologiComponent.vue?vue&type=script&lang=js */ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PermintaanRadiologiComponent_vue_vue_type_style_index_0_id_75e060ee_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css */ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css");
/* harmony import */ var _PermintaanRadiologiComponent_vue_vue_type_style_index_1_id_75e060ee_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css */ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_PermintaanRadiologiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PermintaanRadiologiComponent_vue_vue_type_template_id_75e060ee_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-75e060ee"],['__file',"resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanLabComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_template_id_4a92bb88_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_template_id_4a92bb88_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=template&id=4a92bb88&scoped=true");


/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_template_id_75e060ee_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_template_id_75e060ee_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=template&id=75e060ee&scoped=true");


/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanLabComponent_vue_vue_type_style_index_0_id_4a92bb88_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanLabComponent.vue?vue&type=style&index=0&id=4a92bb88&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_0_id_75e060ee_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=0&id=75e060ee&lang=css");


/***/ }),

/***/ "./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css":
/*!*******************************************************************************************************************************************!*\
  !*** ./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PermintaanRadiologiComponent_vue_vue_type_style_index_1_id_75e060ee_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/obatdanpenunjang/PermintaanRadiologiComponent.vue?vue&type=style&index=1&id=75e060ee&scoped=true&lang=css");


/***/ })

}]);