"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["pengkajian-terminal"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ "./resources/js/components/bus.js");
/* harmony import */ var primevue_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/dialog */ "./node_modules/primevue/dialog/index.mjs");
/* harmony import */ var primevue_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/textarea */ "./node_modules/primevue/textarea/index.mjs");
/* harmony import */ var primevue_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/checkbox */ "./node_modules/primevue/checkbox/index.mjs");
/* harmony import */ var primevue_radiobutton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/radiobutton */ "./node_modules/primevue/radiobutton/index.mjs");
/* harmony import */ var primevue_selectbutton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/selectbutton */ "./node_modules/primevue/selectbutton/index.mjs");
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qrcode.vue */ "./node_modules/qrcode.vue/dist/qrcode.vue.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Dialog: primevue_dialog__WEBPACK_IMPORTED_MODULE_2__["default"],
    Textarea: primevue_textarea__WEBPACK_IMPORTED_MODULE_3__["default"],
    Checkbox: primevue_checkbox__WEBPACK_IMPORTED_MODULE_4__["default"],
    RadioButton: primevue_radiobutton__WEBPACK_IMPORTED_MODULE_5__["default"],
    SelectButton: primevue_selectbutton__WEBPACK_IMPORTED_MODULE_6__["default"],
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_7__["default"],
    QrcodeVue: qrcode_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    noregisterProp: {
      type: String,
      "default": null
    },
    datapasien: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      noregister: '',
      isLoadingRiwayat: false,
      isSaving: false,
      riwayat: [],
      showForm: false,
      showDetail: false,
      detailData: null,
      showOtorisasi: false,
      idPengkajianAktif: null,
      pernafasanOptions: ['Dispnea', 'Nafas cepat dan dangkal', 'Nafas lambat', 'Nafas tidak teratur', 'Nafas melalui mulut', 'Mukosa oral kering', 'Ada secret', 'Tidak ada kelainan'],
      tonusOtotOptions: ['Mual', 'Penurunan pergerakan tubuh', 'Sulit berbicara', 'Sulit menelan', 'Distensia abdomen', 'Inkontinensia urine', 'Inkontinensia feses', 'Tidak ada kelainan'],
      sirkulasiOptions: ['Bercak dan sianosis pada ekstermitas', 'Kulit dingin dan berkeringat', 'Tekanan darah menurun', 'Gelisah', 'Nadi lambat', 'Lemas', 'Tidak ada kelainan'],
      faktorOptions: ['Melakukan aktifitas fisik', 'Pindah posisi'],
      masalahKeperawatanOptions: ['Pola nafas tidak efektif', 'Nyeri', 'Perubahan persepsi sensori', 'Konstipasi', 'Bersihan jalan nafas tidak efektif', 'Defisit perawatan diri'],
      reaksiPasienOptions: ['Menyangkal', 'Takut', 'Rasa bersalah', 'Marah', 'Sedih/menangis', 'Ketidakberdayaan'],
      reaksiPasienMasalahOptions: ['Ansietas, kematian', 'Distres spiritual'],
      reaksiKeluargaOptions: ['Problem kebiasaan pola komunikasi', 'Penurunan konsentrasi', 'Ketidakmampuan memenuhi peran yang diharapkan', 'Keluarga kurang berkomunikasi dengan pasien', 'Keluarga kurang berpartisipasi membuat keputusan', 'Sedih/menangis', 'Rasa bersalah', 'Letih/lelah', 'Marah', 'Gangguan tidur'],
      reaksiKeluargaMasalahOptions: ['Koping individu tidak efektif', 'Distress spiritual', 'Perubahan proses keluarga'],
      dukunganOptions: ['Pasien perlu didampingi keluarga', 'Keluarga dapat mengunjungi pasien diluar waktu berkunjung', 'Sahabat dapat mengunjungi pasien diluar waktu berkunjung'],
      alternatifOptions: ['Tidak', 'Donasi organ'],
      resikoKeluargaOptions: ['Marah', 'Sedih/menangis', 'Depresi', 'Gangguan tidur', 'Rasa bersalah', 'Letih/lelah', 'Perubahan kebiasaan pola komunikasi', 'Ketidakmampuan memenuhi peran yang diharapkan'],
      resikoKeluargaMasalahOptions: ['Koping individu tidak efektif', 'Distress spiritual'],
      formData: this.emptyForm()
    };
  },
  created: function created() {
    this.noregister = this.noregisterProp || window.location.pathname.split('/').pop();
    this.fetchRiwayat();
  },
  watch: {
    noregisterProp: function noregisterProp(val) {
      if (val) {
        this.noregister = val;
        this.fetchRiwayat();
      }
    }
  },
  methods: {
    emptyForm: function emptyForm() {
      return {
        jenis_pengkajian: 'Awal',
        tanggal_jam: new Date(),
        pernafasan_items: [],
        spo2: '',
        tonus_otot_items: [],
        nyeri_status: 'Tidak',
        nyeri_lokasi: '',
        nyeri_skala: '',
        sirkulasi_items: [],
        faktor_items: [],
        faktor_lainnya: '',
        masalah_keperawatan_items: [],
        masalah_keperawatan_lainnya: '',
        perlu_pelayanan_spiritual: '',
        perlu_didoakan: '',
        perlu_bimbingan_rohani: '',
        status_psikologi: '',
        kontak_ada: 'Tidak',
        kontak_siapa: '',
        kontak_hubungan: '',
        kontak_dimana: '',
        kontak_telpon: '',
        rencana_perawatan: '',
        lingkungan_disiapkan: '',
        mampu_merawat_dirumah: '',
        mampu_merawat_oleh: '',
        perlu_difasilitasi_rs: '',
        reaksi_pasien_items: [],
        reaksi_pasien_masalah_items: [],
        reaksi_pasien_lainnya: '',
        reaksi_keluarga_items: [],
        reaksi_keluarga_masalah_items: [],
        dukungan_items: [],
        dukungan_lainnya: '',
        alternatif_items: [],
        alternatif_lainnya: '',
        resiko_keluarga_items: [],
        resiko_keluarga_masalah_items: [],
        selesai_tanggal_jam: null
      };
    },
    bukaFormBaru: function bukaFormBaru() {
      this.formData = this.emptyForm();
      this.showForm = true;
    },
    fetchRiwayat: function fetchRiwayat() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _res$data, res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isLoadingRiwayat = true;
              _context.prev = 1;
              _context.next = 4;
              return axios.post('/assesment/get_terminal', {
                noregister: _this.noregister
              });
            case 4:
              res = _context.sent;
              _this.riwayat = Array.isArray((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) ? res.data.response : [];
              _context.next = 11;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);
            case 11:
              _context.prev = 11;
              _this.isLoadingRiwayat = false;
              return _context.finish(11);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 8, 11, 14]]);
      }))();
    },
    formatDate: function formatDate(d) {
      if (!d) return null;
      var pad = function pad(n) {
        return String(n).padStart(2, '0');
      };
      return "".concat(d.getFullYear(), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getDate()), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()), ":00");
    },
    simpan: function simpan() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _res$data2, _res$data3, payload, res, _res$data4, _res$data5;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.isSaving = true;
              _context2.prev = 1;
              payload = _objectSpread(_objectSpread({}, _this2.formData), {}, {
                noregister: _this2.noregister,
                nomr: _this2.datapasien ? _this2.datapasien.NOMR : '',
                tanggal_jam: _this2.formatDate(_this2.formData.tanggal_jam),
                selesai_tanggal_jam: _this2.formatDate(_this2.formData.selesai_tanggal_jam)
              });
              _context2.next = 5;
              return axios.post('/assesment/simpan_terminal', payload);
            case 5:
              res = _context2.sent;
              if (!(((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.code) === 200 || ((_res$data3 = res.data) === null || _res$data3 === void 0 || (_res$data3 = _res$data3.metadata) === null || _res$data3 === void 0 ? void 0 : _res$data3.code) === 200)) {
                _context2.next = 13;
                break;
              }
              _this2.showForm = false;
              _this2.open('success', 'Pengkajian tahap terminal berhasil disimpan');
              _context2.next = 11;
              return _this2.fetchRiwayat();
            case 11:
              _context2.next = 14;
              break;
            case 13:
              _this2.open('warning', ((_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.message) || ((_res$data5 = res.data) === null || _res$data5 === void 0 || (_res$data5 = _res$data5.metadata) === null || _res$data5 === void 0 ? void 0 : _res$data5.message) || 'Gagal menyimpan pengkajian');
            case 14:
              _context2.next = 20;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              _this2.open('error', _context2.t0.message);
            case 20:
              _context2.prev = 20;
              _this2.isSaving = false;
              return _context2.finish(20);
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 16, 20, 23]]);
      }))();
    },
    lihatDetail: function lihatDetail(row) {
      this.detailData = row;
      this.showDetail = true;
    },
    konfirmasiHapus: function konfirmasiHapus(row) {
      var _this3 = this;
      this.$confirm.require({
        group: 'pengkajianTerminal',
        message: "Hapus pengkajian tanggal ".concat(this.formatWaktu(row.tanggal_jam), "? Tindakan ini tidak dapat dibatalkan."),
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        accept: function accept() {
          return _this3.hapus(row);
        }
      });
    },
    hapus: function hapus(row) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios.post('/assesment/hapus_terminal', {
                noregister: _this4.noregister,
                id_pengkajian: row.id_pengkajian
              });
            case 3:
              _this4.open('info', 'Pengkajian berhasil dihapus');
              _context3.next = 6;
              return _this4.fetchRiwayat();
            case 6:
              _context3.next = 12;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              _this4.open('error', _context3.t0.message);
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }))();
    },
    call_oto: function call_oto(idPengkajian) {
      this.idPengkajianAktif = idPengkajian;
      this.showOtorisasi = true;
    },
    handleValueOto: function handleValueOto(code) {
      if (code == 200) {
        this.showOtorisasi = false;
        this.open('success', 'TTE berhasil dilakukan');
        this.fetchRiwayat();
      }
    },
    formatWaktu: function formatWaktu(val) {
      if (!val) return '—';
      var d = new Date(String(val).replace(' ', 'T'));
      if (isNaN(d.getTime())) return val;
      var pad = function pad(n) {
        return String(n).padStart(2, '0');
      };
      return "".concat(pad(d.getDate()), "/").concat(pad(d.getMonth() + 1), "/").concat(d.getFullYear(), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()));
    },
    open: function open(type, message) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.$emit('show-alert', {
        type: type,
        title: title,
        message: message
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "row mb-3 align-items-end"
};
var _hoisted_3 = {
  "class": "col-md-3"
};
var _hoisted_4 = {
  "class": "col-md-3"
};
var _hoisted_5 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_6 = {
  "class": "card-body"
};
var _hoisted_7 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_8 = ["for"];
var _hoisted_9 = {
  "class": "row mb-3"
};
var _hoisted_10 = {
  "class": "col-md-3"
};
var _hoisted_11 = {
  "class": "checkbox-grid mb-3"
};
var _hoisted_12 = ["for"];
var _hoisted_13 = {
  "class": "d-flex mb-2",
  style: {
    "gap": "16px"
  }
};
var _hoisted_14 = {
  "class": "field-radiobutton"
};
var _hoisted_15 = {
  "class": "field-radiobutton"
};
var _hoisted_16 = {
  key: 0,
  "class": "row mb-3"
};
var _hoisted_17 = {
  "class": "col-md-4"
};
var _hoisted_18 = {
  "class": "col-md-3"
};
var _hoisted_19 = {
  "class": "checkbox-grid"
};
var _hoisted_20 = ["for"];
var _hoisted_21 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_22 = {
  "class": "card-body"
};
var _hoisted_23 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_24 = ["for"];
var _hoisted_25 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_26 = {
  "class": "card-body"
};
var _hoisted_27 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_28 = ["for"];
var _hoisted_29 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_30 = {
  "class": "card-body"
};
var _hoisted_31 = {
  "class": "mb-3"
};
var _hoisted_32 = {
  "class": "row mb-3"
};
var _hoisted_33 = {
  "class": "col-md-4"
};
var _hoisted_34 = {
  "class": "d-flex",
  style: {
    "gap": "16px"
  }
};
var _hoisted_35 = {
  "class": "field-radiobutton"
};
var _hoisted_36 = {
  "class": "field-radiobutton"
};
var _hoisted_37 = {
  "class": "col-md-4"
};
var _hoisted_38 = {
  "class": "d-flex",
  style: {
    "gap": "16px"
  }
};
var _hoisted_39 = {
  "class": "field-radiobutton"
};
var _hoisted_40 = {
  "class": "field-radiobutton"
};
var _hoisted_41 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_42 = {
  "class": "card-body"
};
var _hoisted_43 = {
  "class": "d-flex mb-2",
  style: {
    "gap": "16px"
  }
};
var _hoisted_44 = {
  "class": "field-radiobutton"
};
var _hoisted_45 = {
  "class": "field-radiobutton"
};
var _hoisted_46 = {
  key: 0,
  "class": "row"
};
var _hoisted_47 = {
  "class": "col-md-3"
};
var _hoisted_48 = {
  "class": "col-md-3"
};
var _hoisted_49 = {
  "class": "col-md-3"
};
var _hoisted_50 = {
  "class": "col-md-3"
};
var _hoisted_51 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_52 = {
  "class": "card-body"
};
var _hoisted_53 = {
  "class": "d-flex mb-3",
  style: {
    "gap": "16px"
  }
};
var _hoisted_54 = {
  "class": "field-radiobutton"
};
var _hoisted_55 = {
  "class": "field-radiobutton"
};
var _hoisted_56 = {
  "class": "row mb-2"
};
var _hoisted_57 = {
  "class": "col-md-4"
};
var _hoisted_58 = {
  "class": "d-flex",
  style: {
    "gap": "16px"
  }
};
var _hoisted_59 = {
  "class": "field-radiobutton"
};
var _hoisted_60 = {
  "class": "field-radiobutton"
};
var _hoisted_61 = {
  "class": "col-md-4"
};
var _hoisted_62 = {
  "class": "d-flex",
  style: {
    "gap": "16px"
  }
};
var _hoisted_63 = {
  "class": "field-radiobutton"
};
var _hoisted_64 = {
  "class": "field-radiobutton"
};
var _hoisted_65 = {
  key: 0,
  "class": "col-md-4"
};
var _hoisted_66 = {
  key: 0
};
var _hoisted_67 = {
  "class": "d-flex",
  style: {
    "gap": "16px"
  }
};
var _hoisted_68 = {
  "class": "field-radiobutton"
};
var _hoisted_69 = {
  "class": "field-radiobutton"
};
var _hoisted_70 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_71 = {
  "class": "card-body"
};
var _hoisted_72 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_73 = ["for"];
var _hoisted_74 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_75 = ["for"];
var _hoisted_76 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_77 = {
  "class": "card-body"
};
var _hoisted_78 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_79 = ["for"];
var _hoisted_80 = {
  "class": "checkbox-grid"
};
var _hoisted_81 = ["for"];
var _hoisted_82 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_83 = {
  "class": "card-body"
};
var _hoisted_84 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_85 = ["for"];
var _hoisted_86 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_87 = {
  "class": "card-body"
};
var _hoisted_88 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_89 = ["for"];
var _hoisted_90 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_91 = {
  "class": "card-body"
};
var _hoisted_92 = {
  "class": "checkbox-grid mb-2"
};
var _hoisted_93 = ["for"];
var _hoisted_94 = {
  "class": "checkbox-grid"
};
var _hoisted_95 = ["for"];
var _hoisted_96 = {
  "class": "card card-outline card-primary shadow-sm mb-3"
};
var _hoisted_97 = {
  "class": "card-body"
};
var _hoisted_98 = {
  "class": "col-md-4 p-0"
};
var _hoisted_99 = {
  "class": "card card-primary card-outline elevation-0"
};
var _hoisted_100 = {
  "class": "card-header d-flex align-items-center justify-content-between"
};
var _hoisted_101 = {
  "class": "d-flex align-items-center",
  style: {
    "gap": "8px"
  }
};
var _hoisted_102 = {
  "class": "badge badge-info"
};
var _hoisted_103 = {
  "class": "card-body p-0"
};
var _hoisted_104 = {
  "class": "table-responsive"
};
var _hoisted_105 = {
  "class": "table table-bordered table-sm align-middle mb-0"
};
var _hoisted_106 = {
  key: 0
};
var _hoisted_107 = {
  "class": "badge badge-secondary"
};
var _hoisted_108 = {
  style: {
    "font-size": ".85em"
  }
};
var _hoisted_109 = {
  key: 0
};
var _hoisted_110 = {
  key: 1
};
var _hoisted_111 = {
  key: 2
};
var _hoisted_112 = {
  key: 0
};
var _hoisted_113 = {
  style: {
    "font-size": ".75em",
    "color": "#2e7d32",
    "font-weight": "600"
  }
};
var _hoisted_114 = {
  "class": "text-muted"
};
var _hoisted_115 = {
  key: 1,
  "class": "text-muted"
};
var _hoisted_116 = {
  "class": "text-center"
};
var _hoisted_117 = {
  key: 0
};
var _hoisted_118 = {
  key: 0
};
var _hoisted_119 = {
  key: 1
};
var _hoisted_120 = {
  key: 2
};
var _hoisted_121 = {
  key: 0
};
var _hoisted_122 = {
  key: 3
};
var _hoisted_123 = {
  key: 4
};
var _hoisted_124 = {
  key: 0
};
var _hoisted_125 = {
  key: 5
};
var _hoisted_126 = {
  key: 6
};
var _hoisted_127 = {
  key: 7
};
var _hoisted_128 = {
  key: 8
};
var _hoisted_129 = {
  key: 9
};
var _hoisted_130 = {
  key: 10
};
var _hoisted_131 = {
  key: 11
};
var _hoisted_132 = {
  key: 12
};
var _hoisted_133 = {
  key: 13
};
var _hoisted_134 = {
  key: 14
};
var _hoisted_135 = {
  key: 15
};
var _hoisted_136 = {
  key: 16
};
var _hoisted_137 = {
  key: 17
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ConfirmDialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ConfirmDialog");
  var _component_SelectButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SelectButton");
  var _component_Calendar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Calendar");
  var _component_Checkbox = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Checkbox");
  var _component_RadioButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("RadioButton");
  var _component_Textarea = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Textarea");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_otorisasi_form = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("otorisasi-form");
  var _component_qrcode_vue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("qrcode-vue");
  var _directive_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("tooltip");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ConfirmDialog, {
    group: "pengkajianTerminal"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: FORM PENGKAJIAN ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Pengkajian Pasien Tahap Terminal",
    visible: $data.showForm,
    "onUpdate:visible": _cache[49] || (_cache[49] = function ($event) {
      return $data.showForm = $event;
    }),
    containerStyle: {
      width: '80vw'
    },
    contentStyle: {
      height: '75vh',
      overflowY: 'auto'
    },
    position: "center",
    modal: true,
    closable: !$data.isSaving
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Batal",
        icon: "pi pi-times",
        onClick: _cache[47] || (_cache[47] = function ($event) {
          return $data.showForm = false;
        }),
        "class": "p-button-text",
        disabled: $data.isSaving
      }, null, 8 /* PROPS */, ["disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Simpan",
        icon: "pi pi-check",
        onClick: _cache[48] || (_cache[48] = function ($event) {
          return $options.simpan();
        }),
        loading: $data.isSaving
      }, null, 8 /* PROPS */, ["loading"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Pengkajian", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SelectButton, {
        modelValue: $data.formData.jenis_pengkajian,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $data.formData.jenis_pengkajian = $event;
        }),
        options: ['Awal', 'Ulang']
      }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Tanggal & Jam", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
        modelValue: $data.formData.tanggal_jam,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.formData.tanggal_jam = $event;
        }),
        showIcon: true,
        showTime: "",
        hourFormat: "24",
        dateFormat: "dd/mm/yy",
        style: {
          "width": "100%"
        }
      }, null, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "1. Gambaran Umum Pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "a. Keadaan Pernafasan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pernafasanOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'pf-' + opt,
          value: opt,
          modelValue: $data.formData.pernafasan_items,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
            return $data.formData.pernafasan_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'pf-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_8)]);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "SpO2", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $data.formData.spo2 = $event;
        }),
        "class": "form-control",
        placeholder: "%"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.spo2]])])]), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "b. Kehilangan Tonus Otot", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.tonusOtotOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'to-' + opt,
          value: opt,
          modelValue: $data.formData.tonus_otot_items,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
            return $data.formData.tonus_otot_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'to-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_12)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "c. Nyeri", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ny-tidak",
        name: "nyeri_status",
        value: "Tidak",
        modelValue: $data.formData.nyeri_status,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.formData.nyeri_status = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ny-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ny-ya",
        name: "nyeri_status",
        value: "Ya",
        modelValue: $data.formData.nyeri_status,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          return $data.formData.nyeri_status = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ny-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))])]), $data.formData.nyeri_status === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lokasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
          return $data.formData.nyeri_lokasi = $event;
        }),
        "class": "form-control",
        placeholder: "Lokasi nyeri..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.nyeri_lokasi]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Skala", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
          return $data.formData.nyeri_skala = $event;
        }),
        "class": "form-control",
        placeholder: "0-10"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.nyeri_skala]])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "d. Perlambatan Sirkulasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.sirkulasiOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'sr-' + opt,
          value: opt,
          modelValue: $data.formData.sirkulasi_items,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
            return $data.formData.sirkulasi_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'sr-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_20)]);
      }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "2. Faktor yang Meningkatkan / Membangkitkan Gejala Fisik")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.faktorOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'fk-' + opt,
          value: opt,
          modelValue: $data.formData.faktor_items,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
            return $data.formData.faktor_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'fk-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_24)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lainnya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
          return $data.formData.faktor_lainnya = $event;
        }),
        "class": "form-control",
        placeholder: "Lainnya..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.faktor_lainnya]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "3. Managemen Gejala Saat Ini dan Respon Pasien — Masalah Keperawatan")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.masalahKeperawatanOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'mk-' + opt,
          value: opt,
          modelValue: $data.formData.masalah_keperawatan_items,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
            return $data.formData.masalah_keperawatan_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'mk-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_28)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lainnya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
          return $data.formData.masalah_keperawatan_lainnya = $event;
        }),
        "class": "form-control",
        placeholder: "Lainnya..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.masalah_keperawatan_lainnya]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "4-6. Orientasi Spiritual, Urusan & Status Psikologi")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "4. Orientasi Spiritual Pasien dan Keluarga — Apakah perlu pelayanan spiritual?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
        modelValue: $data.formData.perlu_pelayanan_spiritual,
        "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
          return $data.formData.perlu_pelayanan_spiritual = $event;
        }),
        style: {
          "width": "100%"
        },
        rows: 2
      }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "5. Perlu Didoakan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "dd-ya",
        name: "perlu_didoakan",
        value: "Ya",
        modelValue: $data.formData.perlu_didoakan,
        "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
          return $data.formData.perlu_didoakan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "dd-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "dd-tidak",
        name: "perlu_didoakan",
        value: "Tidak",
        modelValue: $data.formData.perlu_didoakan,
        "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) {
          return $data.formData.perlu_didoakan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "dd-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "Perlu Bimbingan Rohani", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "br-ya",
        name: "perlu_bimbingan_rohani",
        value: "Ya",
        modelValue: $data.formData.perlu_bimbingan_rohani,
        "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
          return $data.formData.perlu_bimbingan_rohani = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "br-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "br-tidak",
        name: "perlu_bimbingan_rohani",
        value: "Tidak",
        modelValue: $data.formData.perlu_bimbingan_rohani,
        "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) {
          return $data.formData.perlu_bimbingan_rohani = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "br-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "6. Status Psikologi Pasien dan Keluarga", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
        modelValue: $data.formData.status_psikologi,
        "onUpdate:modelValue": _cache[19] || (_cache[19] = function ($event) {
          return $data.formData.status_psikologi = $event;
        }),
        style: {
          "width": "100%"
        },
        rows: 2
      }, null, 8 /* PROPS */, ["modelValue"])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "a. Orang yang Ingin Dihubungi Saat Ini")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ka-ya",
        name: "kontak_ada",
        value: "Ya",
        modelValue: $data.formData.kontak_ada,
        "onUpdate:modelValue": _cache[20] || (_cache[20] = function ($event) {
          return $data.formData.kontak_ada = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[81] || (_cache[81] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ka-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ka-tidak",
        name: "kontak_ada",
        value: "Tidak",
        modelValue: $data.formData.kontak_ada,
        "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) {
          return $data.formData.kontak_ada = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ka-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])]), $data.formData.kontak_ada === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Siapa", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) {
          return $data.formData.kontak_siapa = $event;
        }),
        "class": "form-control"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.kontak_siapa]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Hubungan dengan Pasien", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[23] || (_cache[23] = function ($event) {
          return $data.formData.kontak_hubungan = $event;
        }),
        "class": "form-control"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.kontak_hubungan]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Dimana", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[24] || (_cache[24] = function ($event) {
          return $data.formData.kontak_dimana = $event;
        }),
        "class": "form-control"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.kontak_dimana]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "No. Telepon / Hp", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[25] || (_cache[25] = function ($event) {
          return $data.formData.kontak_telpon = $event;
        }),
        "class": "form-control"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.kontak_telpon]])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "b. Bagaimana Rencana Perawatan Selanjutnya?")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "rp-rs",
        name: "rencana_perawatan",
        value: "Tetap Dirawat di Rumah Sakit",
        modelValue: $data.formData.rencana_perawatan,
        "onUpdate:modelValue": _cache[26] || (_cache[26] = function ($event) {
          return $data.formData.rencana_perawatan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "rp-rs",
        "class": "ml-2"
      }, "Tetap Dirawat di Rumah Sakit", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "rp-rmh",
        name: "rencana_perawatan",
        value: "Dirawat di Rumah",
        modelValue: $data.formData.rencana_perawatan,
        "onUpdate:modelValue": _cache[27] || (_cache[27] = function ($event) {
          return $data.formData.rencana_perawatan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "rp-rmh",
        "class": "ml-2"
      }, "Dirawat di Rumah", -1 /* CACHED */))])]), $data.formData.rencana_perawatan === 'Dirawat di Rumah' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 0
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "Apakah lingkungan rumah sudah disiapkan?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ld-ya",
        name: "lingkungan_disiapkan",
        value: "Ya",
        modelValue: $data.formData.lingkungan_disiapkan,
        "onUpdate:modelValue": _cache[28] || (_cache[28] = function ($event) {
          return $data.formData.lingkungan_disiapkan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ld-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "ld-tidak",
        name: "lingkungan_disiapkan",
        value: "Tidak",
        modelValue: $data.formData.lingkungan_disiapkan,
        "onUpdate:modelValue": _cache[29] || (_cache[29] = function ($event) {
          return $data.formData.lingkungan_disiapkan = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ld-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "Apakah ada yang mampu merawat pasien dirumah?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "mm-ya",
        name: "mampu_merawat_dirumah",
        value: "Ya",
        modelValue: $data.formData.mampu_merawat_dirumah,
        "onUpdate:modelValue": _cache[30] || (_cache[30] = function ($event) {
          return $data.formData.mampu_merawat_dirumah = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "mm-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "mm-tidak",
        name: "mampu_merawat_dirumah",
        value: "Tidak",
        modelValue: $data.formData.mampu_merawat_dirumah,
        "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) {
          return $data.formData.mampu_merawat_dirumah = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "mm-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])])]), $data.formData.mampu_merawat_dirumah === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [_cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Oleh", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[32] || (_cache[32] = function ($event) {
          return $data.formData.mampu_merawat_oleh = $event;
        }),
        "class": "form-control"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.mampu_merawat_oleh]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.formData.mampu_merawat_dirumah === 'Tidak' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [_cache[99] || (_cache[99] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom d-block"
      }, "Apakah perlu difasilitasi oleh Rumah Sakit?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "df-ya",
        name: "perlu_difasilitasi_rs",
        value: "Ya",
        modelValue: $data.formData.perlu_difasilitasi_rs,
        "onUpdate:modelValue": _cache[33] || (_cache[33] = function ($event) {
          return $data.formData.perlu_difasilitasi_rs = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "df-ya",
        "class": "ml-2"
      }, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
        id: "df-tidak",
        name: "perlu_difasilitasi_rs",
        value: "Tidak",
        modelValue: $data.formData.perlu_difasilitasi_rs,
        "onUpdate:modelValue": _cache[34] || (_cache[34] = function ($event) {
          return $data.formData.perlu_difasilitasi_rs = $event;
        })
      }, null, 8 /* PROPS */, ["modelValue"]), _cache[98] || (_cache[98] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "df-tidak",
        "class": "ml-2"
      }, "Tidak", -1 /* CACHED */))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "c. Reaksi Pasien Atas Penyakit")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Asesmen Informasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reaksiPasienOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rp-' + opt,
          value: opt,
          modelValue: $data.formData.reaksi_pasien_items,
          "onUpdate:modelValue": _cache[35] || (_cache[35] = function ($event) {
            return $data.formData.reaksi_pasien_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rp-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_73)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Masalah Keperawatan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reaksiPasienMasalahOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rpm-' + opt,
          value: opt,
          modelValue: $data.formData.reaksi_pasien_masalah_items,
          "onUpdate:modelValue": _cache[36] || (_cache[36] = function ($event) {
            return $data.formData.reaksi_pasien_masalah_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rpm-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_75)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lainnya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[37] || (_cache[37] = function ($event) {
          return $data.formData.reaksi_pasien_lainnya = $event;
        }),
        "class": "form-control",
        placeholder: "Lainnya..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.reaksi_pasien_lainnya]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [_cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "d. Reaksi Keluarga Atas Penyakit Pasien")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [_cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Asesmen Informasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reaksiKeluargaOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rk-' + opt,
          value: opt,
          modelValue: $data.formData.reaksi_keluarga_items,
          "onUpdate:modelValue": _cache[38] || (_cache[38] = function ($event) {
            return $data.formData.reaksi_keluarga_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rk-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_79)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Masalah Keperawatan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reaksiKeluargaMasalahOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rkm-' + opt,
          value: opt,
          modelValue: $data.formData.reaksi_keluarga_masalah_items,
          "onUpdate:modelValue": _cache[39] || (_cache[39] = function ($event) {
            return $data.formData.reaksi_keluarga_masalah_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rkm-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_81)]);
      }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "7. Kebutuhan Dukungan / Kelonggaran Pelayanan")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.dukunganOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'dk-' + opt,
          value: opt,
          modelValue: $data.formData.dukungan_items,
          "onUpdate:modelValue": _cache[40] || (_cache[40] = function ($event) {
            return $data.formData.dukungan_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'dk-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_85)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[108] || (_cache[108] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lainnya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[41] || (_cache[41] = function ($event) {
          return $data.formData.dukungan_lainnya = $event;
        }),
        "class": "form-control",
        placeholder: "Lainnya..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.dukungan_lainnya]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[111] || (_cache[111] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "8. Kebutuhan Alternatif / Tingkat Pelayanan Lain")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.alternatifOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'al-' + opt,
          value: opt,
          modelValue: $data.formData.alternatif_items,
          "onUpdate:modelValue": _cache[42] || (_cache[42] = function ($event) {
            return $data.formData.alternatif_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'al-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_89)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Lainnya", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        "onUpdate:modelValue": _cache[43] || (_cache[43] = function ($event) {
          return $data.formData.alternatif_lainnya = $event;
        }),
        "class": "form-control",
        placeholder: "Lainnya..."
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formData.alternatif_lainnya]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [_cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "9. Faktor Resiko Bagi Keluarga yang Ditinggalkan")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [_cache[112] || (_cache[112] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Asesmen Informasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resikoKeluargaOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rr-' + opt,
          value: opt,
          modelValue: $data.formData.resiko_keluarga_items,
          "onUpdate:modelValue": _cache[44] || (_cache[44] = function ($event) {
            return $data.formData.resiko_keluarga_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rr-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_93)]);
      }), 128 /* KEYED_FRAGMENT */))]), _cache[113] || (_cache[113] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Masalah Keperawatan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resikoKeluargaMasalahOptions, function (opt) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          key: opt,
          "class": "field-checkbox"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Checkbox, {
          inputId: 'rrm-' + opt,
          value: opt,
          modelValue: $data.formData.resiko_keluarga_masalah_items,
          "onUpdate:modelValue": _cache[45] || (_cache[45] = function ($event) {
            return $data.formData.resiko_keluarga_masalah_items = $event;
          })
        }, null, 8 /* PROPS */, ["inputId", "value", "modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
          "for": 'rrm-' + opt,
          "class": "ml-2"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt), 9 /* TEXT, PROPS */, _hoisted_95)]);
      }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [_cache[117] || (_cache[117] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "card-header"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        "class": "card-title font-weight-bold mb-0"
      }, "Selesai Pengkajian")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [_cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "form-label-custom"
      }, "Tanggal & Jam Selesai", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Calendar, {
        modelValue: $data.formData.selesai_tanggal_jam,
        "onUpdate:modelValue": _cache[46] || (_cache[46] = function ($event) {
          return $data.formData.selesai_tanggal_jam = $event;
        }),
        showIcon: true,
        showTime: "",
        hourFormat: "24",
        dateFormat: "dd/mm/yy",
        style: {
          "width": "100%"
        }
      }, null, 8 /* PROPS */, ["modelValue"])]), _cache[116] || (_cache[116] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
        "class": "text-muted d-block mt-2"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-info-circle mr-1"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Nama & tanda tangan Perawat/Bidan diisi melalui TTE setelah pengkajian disimpan. ")], -1 /* CACHED */))])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible", "closable"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: TTE ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    header: "Tanda Tangan Elektronik (TTE) — Pengkajian Tahap Terminal",
    visible: $data.showOtorisasi,
    "onUpdate:visible": _cache[51] || (_cache[51] = function ($event) {
      return $data.showOtorisasi = $event;
    }),
    containerStyle: {
      width: '40vw'
    },
    modal: true
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        onClick: _cache[50] || (_cache[50] = function ($event) {
          return $data.showOtorisasi = false;
        }),
        "class": "p-button-text"
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showOtorisasi ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_otorisasi_form, {
        key: 0,
        onGetvalue: $options.handleValueOto,
        mode: 23,
        noregister: String($data.idPengkajianAktif)
      }, null, 8 /* PROPS */, ["onGetvalue", "noregister"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== RIWAYAT PENGKAJIAN ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [_cache[118] || (_cache[118] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title font-weight-bold mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-user-clock mr-2 text-primary"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Riwayat Pengkajian Pasien Tahap Terminal ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_102, "Total: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.riwayat.length), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    label: "Pengkajian Baru",
    icon: "pi pi-plus",
    "class": "p-button-success p-button-sm",
    onClick: _cache[52] || (_cache[52] = function ($event) {
      return $options.bukaFormBaru();
    })
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    icon: "pi pi-refresh",
    "class": "p-button-secondary p-button-outlined p-button-sm",
    onClick: _cache[53] || (_cache[53] = function ($event) {
      return $options.fetchRiwayat();
    }),
    loading: $data.isLoadingRiwayat
  }, null, 8 /* PROPS */, ["loading"]), [[_directive_tooltip, 'Muat ulang']])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_105, [_cache[123] || (_cache[123] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "5%"
    }
  }, "#"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "8%"
    }
  }, "Jenis"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "13%"
    }
  }, "Tanggal & Jam"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Ringkasan"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "16%"
    }
  }, "Nama & TTD"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    style: {
      "width": "8%"
    },
    "class": "text-center"
  }, "Aksi")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [$data.riwayat.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", _hoisted_106, _toConsumableArray(_cache[119] || (_cache[119] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
    colspan: "6",
    "class": "text-center text-muted py-4"
  }, "Belum ada pengkajian tahap terminal untuk pasien ini.", -1 /* CACHED */)])))) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.riwayat, function (row, k) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: row.id_pengkajian
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.jenis_pengkajian), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu(row.tanggal_jam)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_108, [row.nyeri_status === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_109, [_cache[120] || (_cache[120] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Nyeri:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.nyeri_lokasi) + " (skala " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.nyeri_skala) + ")", 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), row.rencana_perawatan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_110, [_cache[121] || (_cache[121] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Rencana:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.rencana_perawatan), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (row.masalah_keperawatan_items || []).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_111, [_cache[122] || (_cache[122] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Masalah Keperawatan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.masalah_keperawatan_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, [row.auth == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_qrcode_vue, {
      value: 'TTE-' + row.id_pengkajian,
      size: 36,
      level: "H"
    }, null, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(row.auth_name || row.auth_by), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu(row.jam_auth)), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_115, "Belum ditandatangani"))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      icon: "pi pi-eye",
      "class": "p-button-rounded p-button-info p-button-sm mr-1",
      onClick: function onClick($event) {
        return $options.lihatDetail(row);
      },
      title: "Detail"
    }, null, 8 /* PROPS */, ["onClick"]), row.auth != 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Button, {
      key: 0,
      icon: "pi pi-lock-open",
      "class": "p-button-rounded p-button-warning p-button-sm mr-1",
      onClick: function onClick($event) {
        return $options.call_oto(row.id_pengkajian);
      },
      title: "TTE"
    }, null, 8 /* PROPS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), row.auth != 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Button, {
      key: 1,
      icon: "pi pi-trash",
      "class": "p-button-rounded p-button-danger p-button-sm",
      onClick: function onClick($event) {
        return $options.konfirmasiHapus(row);
      },
      title: "Hapus"
    }, null, 8 /* PROPS */, ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: DETAIL ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    visible: $data.showDetail,
    "onUpdate:visible": _cache[55] || (_cache[55] = function ($event) {
      return $data.showDetail = $event;
    }),
    header: "Detail Pengkajian Tahap Terminal",
    modal: true,
    containerStyle: {
      width: '60vw'
    },
    contentStyle: {
      maxHeight: '70vh',
      overflowY: 'auto'
    }
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        onClick: _cache[54] || (_cache[54] = function ($event) {
          return $data.showDetail = false;
        }),
        "class": "p-button-text"
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.detailData ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 0
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.jenis_pengkajian), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu($data.detailData.tanggal_jam)), 1 /* TEXT */)]), $data.detailData.pernafasan_items && $data.detailData.pernafasan_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_117, [_cache[124] || (_cache[124] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Keadaan Pernafasan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.pernafasan_items.join(', ')) + " ", 1 /* TEXT */), $data.detailData.spo2 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_118, "(SpO2 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.spo2) + ")", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.tonus_otot_items && $data.detailData.tonus_otot_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_119, [_cache[125] || (_cache[125] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Kehilangan Tonus Otot:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.tonus_otot_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.nyeri_status ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_120, [_cache[126] || (_cache[126] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Nyeri:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.nyeri_status) + " ", 1 /* TEXT */), $data.detailData.nyeri_status === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_121, "— " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.nyeri_lokasi) + " (skala " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.nyeri_skala) + ")", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.sirkulasi_items && $data.detailData.sirkulasi_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_122, [_cache[127] || (_cache[127] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Perlambatan Sirkulasi:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.sirkulasi_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.faktor_items && $data.detailData.faktor_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_123, [_cache[128] || (_cache[128] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Faktor Peningkat Gejala:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.faktor_items.join(', ')) + " ", 1 /* TEXT */), $data.detailData.faktor_lainnya ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_124, ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.faktor_lainnya), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.masalah_keperawatan_items && $data.detailData.masalah_keperawatan_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_125, [_cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Masalah Keperawatan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.masalah_keperawatan_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.perlu_pelayanan_spiritual ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_126, [_cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Pelayanan Spiritual:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.perlu_pelayanan_spiritual), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.perlu_didoakan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_127, [_cache[131] || (_cache[131] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Perlu Didoakan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.perlu_didoakan) + "   ", 1 /* TEXT */), _cache[132] || (_cache[132] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Bimbingan Rohani:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.perlu_bimbingan_rohani), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.status_psikologi ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_128, [_cache[133] || (_cache[133] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Status Psikologi:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.status_psikologi), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.kontak_ada === 'Ya' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_129, [_cache[134] || (_cache[134] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Kontak:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.kontak_siapa) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.kontak_hubungan) + "), " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.kontak_dimana) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.kontak_telpon), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.rencana_perawatan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_130, [_cache[135] || (_cache[135] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Rencana Perawatan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.rencana_perawatan), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.reaksi_pasien_items && $data.detailData.reaksi_pasien_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_131, [_cache[136] || (_cache[136] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Reaksi Pasien:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.reaksi_pasien_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.reaksi_keluarga_items && $data.detailData.reaksi_keluarga_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_132, [_cache[137] || (_cache[137] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Reaksi Keluarga:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.reaksi_keluarga_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.dukungan_items && $data.detailData.dukungan_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_133, [_cache[138] || (_cache[138] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Kebutuhan Dukungan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.dukungan_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.alternatif_items && $data.detailData.alternatif_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_134, [_cache[139] || (_cache[139] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Kebutuhan Alternatif:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.alternatif_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.resiko_keluarga_items && $data.detailData.resiko_keluarga_items.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_135, [_cache[140] || (_cache[140] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Resiko Bagi Keluarga:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.resiko_keluarga_items.join(', ')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.selesai_tanggal_jam ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_136, [_cache[141] || (_cache[141] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Selesai:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu($data.detailData.selesai_tanggal_jam)), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailData.auth == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_137, [_cache[142] || (_cache[142] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "TTE oleh:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.auth_name || $data.detailData.auth_by) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu($data.detailData.jam_auth)), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.form-label-custom[data-v-18f75969] {\n    font-weight: 600;\n    font-size: .85rem;\n    color: #333;\n    margin-bottom: 6px;\n}\n.checkbox-grid[data-v-18f75969] {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 6px 16px;\n}\n.checkbox-grid .field-checkbox[data-v-18f75969] { display: flex; align-items: center;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_style_index_0_id_18f75969_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_style_index_0_id_18f75969_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_style_index_0_id_18f75969_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PengkajianTerminalComponent_vue_vue_type_template_id_18f75969_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true */ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true");
/* harmony import */ var _PengkajianTerminalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PengkajianTerminalComponent.vue?vue&type=script&lang=js */ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PengkajianTerminalComponent_vue_vue_type_style_index_0_id_18f75969_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css */ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PengkajianTerminalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PengkajianTerminalComponent_vue_vue_type_template_id_18f75969_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-18f75969"],['__file',"resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PengkajianTerminalComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_template_id_18f75969_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_template_id_18f75969_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=template&id=18f75969&scoped=true");


/***/ }),

/***/ "./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css":
/*!***************************************************************************************************************************************!*\
  !*** ./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PengkajianTerminalComponent_vue_vue_type_style_index_0_id_18f75969_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Medicalrecord/PengkajianTerminalComponent.vue?vue&type=style&index=0&id=18f75969&scoped=true&lang=css");


/***/ })

}]);