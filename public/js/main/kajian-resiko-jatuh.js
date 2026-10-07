"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["kajian-resiko-jatuh"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ "./resources/js/components/bus.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
      dataPasien: {},
      isLoadingPasien: false,
      isLoadingRiwayat: false,
      isSaving: false,
      riwayat: [],
      showForm: false,
      showDetail: false,
      detailData: null,
      formData: {
        skala: 'MORSE',
        catatan: '',
        morse: {
          riwayat_jatuh: 0,
          diagnosa_sekunder: 0,
          alat_bantu: 0,
          terapi_iv: 0,
          gaya_berjalan: 0,
          status_mental: 0
        },
        humpty: {
          usia: 4,
          jenis_kelamin: 2,
          diagnosis: 4,
          gangguan_kognitif: 3,
          faktor_lingkungan: 4,
          respon_operasi: 3,
          penggunaan_obat: 3
        }
      },
      morseCriteria: [{
        field: 'riwayat_jatuh',
        label: 'Riwayat Jatuh',
        note: 'Dalam 3 bulan terakhir',
        options: [{
          value: 0,
          label: 'Tidak (0)'
        }, {
          value: 25,
          label: 'Ya (25)'
        }]
      }, {
        field: 'diagnosa_sekunder',
        label: 'Diagnosa Sekunder',
        note: '≥ 2 diagnosa medis',
        options: [{
          value: 0,
          label: 'Tidak (0)'
        }, {
          value: 15,
          label: 'Ya (15)'
        }]
      }, {
        field: 'alat_bantu',
        label: 'Alat Bantu Jalan',
        options: [{
          value: 0,
          label: 'Tidak ada / Bed rest / Dibantu perawat (0)'
        }, {
          value: 15,
          label: 'Kruk / Tongkat / Walker (15)'
        }, {
          value: 30,
          label: 'Berpegangan pada benda sekitar / Mebel (30)'
        }]
      }, {
        field: 'terapi_iv',
        label: 'Terapi Intravena / Infus',
        options: [{
          value: 0,
          label: 'Tidak (0)'
        }, {
          value: 20,
          label: 'Ya (20)'
        }]
      }, {
        field: 'gaya_berjalan',
        label: 'Cara Berjalan / Gaya Berjalan',
        options: [{
          value: 0,
          label: 'Normal / Tirah baring / Kursi roda (0)'
        }, {
          value: 10,
          label: 'Lemah (10)'
        }, {
          value: 20,
          label: 'Terganggu / Tidak normal (20)'
        }]
      }, {
        field: 'status_mental',
        label: 'Status Mental',
        options: [{
          value: 0,
          label: 'Orientasi sesuai kemampuan diri (0)'
        }, {
          value: 15,
          label: 'Lupa akan keterbatasan diri (15)'
        }]
      }],
      humptyDumptyCriteria: [{
        field: 'usia',
        label: 'Usia',
        options: [{
          value: 4,
          label: 'Di bawah 3 tahun (4)'
        }, {
          value: 3,
          label: '3 – 7 tahun (3)'
        }, {
          value: 2,
          label: '7 – 13 tahun (2)'
        }, {
          value: 1,
          label: '≥ 13 tahun (1)'
        }]
      }, {
        field: 'jenis_kelamin',
        label: 'Jenis Kelamin',
        options: [{
          value: 2,
          label: 'Laki-laki (2)'
        }, {
          value: 1,
          label: 'Perempuan (1)'
        }]
      }, {
        field: 'diagnosis',
        label: 'Diagnosis',
        options: [{
          value: 4,
          label: 'Kelainan neurologis (4)'
        }, {
          value: 3,
          label: 'Perubahan oksigenasi (3)'
        }, {
          value: 2,
          label: 'Kelainan psikis / perilaku (2)'
        }, {
          value: 1,
          label: 'Diagnosis lain-lain (1)'
        }]
      }, {
        field: 'gangguan_kognitif',
        label: 'Gangguan Kognitif',
        options: [{
          value: 3,
          label: 'Tidak sadar terhadap keterbatasan (3)'
        }, {
          value: 2,
          label: 'Lupa terhadap keterbatasan (2)'
        }, {
          value: 1,
          label: 'Mengetahui kemampuan diri (1)'
        }]
      }, {
        field: 'faktor_lingkungan',
        label: 'Faktor Lingkungan',
        options: [{
          value: 4,
          label: 'Riwayat jatuh dari tempat tidur (4)'
        }, {
          value: 3,
          label: 'Pasien menggunakan alat bantu (3)'
        }, {
          value: 2,
          label: 'Pasien berada di tempat tidur (2)'
        }, {
          value: 1,
          label: 'Di luar area perawatan (1)'
        }]
      }, {
        field: 'respon_operasi',
        label: 'Respons Operasi / Obat Penenang / Anestesi',
        options: [{
          value: 3,
          label: 'Dalam 24 jam (3)'
        }, {
          value: 2,
          label: 'Dalam 48 jam (2)'
        }, {
          value: 1,
          label: 'Lebih dari 48 jam / Tidak (1)'
        }]
      }, {
        field: 'penggunaan_obat',
        label: 'Penggunaan Obat',
        options: [{
          value: 3,
          label: 'Multipel: sedatif, hipnotik, diuretik, narkotik, dll (3)'
        }, {
          value: 2,
          label: 'Salah satu obat di atas (2)'
        }, {
          value: 1,
          label: 'Tidak ada (1)'
        }]
      }]
    };
  },
  computed: {
    skalaPasien: function skalaPasien() {
      var _this$dataPasien$USIA, _this$dataPasien;
      var tahun = (_this$dataPasien$USIA = (_this$dataPasien = this.dataPasien) === null || _this$dataPasien === void 0 || (_this$dataPasien = _this$dataPasien.USIA_PASIEN) === null || _this$dataPasien === void 0 ? void 0 : _this$dataPasien.tahun) !== null && _this$dataPasien$USIA !== void 0 ? _this$dataPasien$USIA : 99;
      return Number(tahun) < 14 ? 'HUMPTY_DUMPTY' : 'MORSE';
    },
    totalMorse: function totalMorse() {
      var _m$riwayat_jatuh, _m$diagnosa_sekunder, _m$alat_bantu, _m$terapi_iv, _m$gaya_berjalan, _m$status_mental;
      var m = this.formData.morse;
      return ((_m$riwayat_jatuh = m.riwayat_jatuh) !== null && _m$riwayat_jatuh !== void 0 ? _m$riwayat_jatuh : 0) + ((_m$diagnosa_sekunder = m.diagnosa_sekunder) !== null && _m$diagnosa_sekunder !== void 0 ? _m$diagnosa_sekunder : 0) + ((_m$alat_bantu = m.alat_bantu) !== null && _m$alat_bantu !== void 0 ? _m$alat_bantu : 0) + ((_m$terapi_iv = m.terapi_iv) !== null && _m$terapi_iv !== void 0 ? _m$terapi_iv : 0) + ((_m$gaya_berjalan = m.gaya_berjalan) !== null && _m$gaya_berjalan !== void 0 ? _m$gaya_berjalan : 0) + ((_m$status_mental = m.status_mental) !== null && _m$status_mental !== void 0 ? _m$status_mental : 0);
    },
    morseInterpretasi: function morseInterpretasi() {
      var s = this.totalMorse;
      if (s >= 45) return {
        label: 'Risiko Tinggi',
        severity: 'danger',
        keterangan: 'Perlu tindakan pencegahan jatuh intensif',
        bg: '#ffebee',
        border: '#ef9a9a',
        color: '#b71c1c'
      };
      if (s >= 25) return {
        label: 'Risiko Sedang',
        severity: 'warn',
        keterangan: 'Perlu tindakan pencegahan jatuh standar',
        bg: '#fff8e1',
        border: '#ffe082',
        color: '#e65100'
      };
      return {
        label: 'Risiko Rendah',
        severity: 'success',
        keterangan: 'Tetap lakukan orientasi lingkungan',
        bg: '#e8f5e9',
        border: '#a5d6a7',
        color: '#2e7d32'
      };
    },
    morseResultStyle: function morseResultStyle() {
      var i = this.morseInterpretasi;
      return "background:".concat(i.bg, ";border:1.5px solid ").concat(i.border, ";color:").concat(i.color);
    },
    totalHumpty: function totalHumpty() {
      var _h$usia, _h$jenis_kelamin, _h$diagnosis, _h$gangguan_kognitif, _h$faktor_lingkungan, _h$respon_operasi, _h$penggunaan_obat;
      var h = this.formData.humpty;
      return ((_h$usia = h.usia) !== null && _h$usia !== void 0 ? _h$usia : 1) + ((_h$jenis_kelamin = h.jenis_kelamin) !== null && _h$jenis_kelamin !== void 0 ? _h$jenis_kelamin : 1) + ((_h$diagnosis = h.diagnosis) !== null && _h$diagnosis !== void 0 ? _h$diagnosis : 1) + ((_h$gangguan_kognitif = h.gangguan_kognitif) !== null && _h$gangguan_kognitif !== void 0 ? _h$gangguan_kognitif : 1) + ((_h$faktor_lingkungan = h.faktor_lingkungan) !== null && _h$faktor_lingkungan !== void 0 ? _h$faktor_lingkungan : 1) + ((_h$respon_operasi = h.respon_operasi) !== null && _h$respon_operasi !== void 0 ? _h$respon_operasi : 1) + ((_h$penggunaan_obat = h.penggunaan_obat) !== null && _h$penggunaan_obat !== void 0 ? _h$penggunaan_obat : 1);
    },
    humptyInterpretasi: function humptyInterpretasi() {
      var s = this.totalHumpty;
      if (s >= 16) return {
        label: 'Risiko Tinggi',
        severity: 'danger',
        keterangan: 'Perlu tindakan pencegahan jatuh intensif',
        bg: '#ffebee',
        border: '#ef9a9a',
        color: '#b71c1c'
      };
      if (s >= 12) return {
        label: 'Risiko Sedang',
        severity: 'warn',
        keterangan: 'Perlu tindakan pencegahan standar',
        bg: '#fff8e1',
        border: '#ffe082',
        color: '#e65100'
      };
      return {
        label: 'Risiko Rendah',
        severity: 'success',
        keterangan: 'Tetap lakukan orientasi lingkungan',
        bg: '#e8f5e9',
        border: '#a5d6a7',
        color: '#2e7d32'
      };
    },
    humptyResultStyle: function humptyResultStyle() {
      var i = this.humptyInterpretasi;
      return "background:".concat(i.bg, ";border:1.5px solid ").concat(i.border, ";color:").concat(i.color);
    },
    formTitle: function formTitle() {
      var skala = this.formData.skala === 'MORSE' ? 'Skala Morse (Dewasa)' : 'Skala Humpty Dumpty (Anak)';
      return "Pengkajian Risiko Jatuh \u2014 ".concat(skala);
    }
  },
  created: function created() {
    if (this.noregisterProp) {
      this.noregister = this.noregisterProp;
    } else {
      this.noregister = window.location.pathname.split('/').pop();
    }
    if (this.datapasien) {
      this.dataPasien = this.datapasien;
    } else {
      this.fetchDataPasien();
    }
    this.fetchRiwayat();
  },
  watch: {
    noregisterProp: function noregisterProp(val) {
      if (val) {
        this.noregister = val;
        this.fetchRiwayat();
      }
    },
    datapasien: function datapasien(val) {
      if (val) {
        this.dataPasien = val;
      }
    }
  },
  methods: {
    // ===== DATA PASIEN =====
    fetchDataPasien: function fetchDataPasien() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isLoadingPasien = true;
              _context.next = 3;
              return axios.post('/datapasienpertransaksi', {
                mode: 'history8',
                noregister: _this.noregister
              }).then(function (response) {
                _this.dataPasien = response.data.response[0];
              })["catch"](function (error) {
                console.error(error);
              })["finally"](function () {
                _this.isLoadingPasien = false;
              });
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    // ===== RIWAYAT =====
    fetchRiwayat: function fetchRiwayat() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _res$data, res;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.isLoadingRiwayat = true;
              _context2.prev = 1;
              _context2.next = 4;
              return axios.post('/assesment/get_resiko_jatuh', {
                noregister: _this2.noregister
              });
            case 4:
              res = _context2.sent;
              _this2.riwayat = Array.isArray((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) ? res.data.response : [];
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
            case 11:
              _context2.prev = 11;
              _this2.isLoadingRiwayat = false;
              return _context2.finish(11);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 8, 11, 14]]);
      }))();
    },
    // ===== FORM BARU =====
    bukaFormBaru: function bukaFormBaru() {
      var _this$dataPasien$USIA2, _this$dataPasien2, _this$dataPasien3;
      // Set skala otomatis berdasarkan usia
      this.formData.skala = this.skalaPasien;
      // Reset nilai
      this.formData.catatan = '';
      this.formData.morse = {
        riwayat_jatuh: 0,
        diagnosa_sekunder: 0,
        alat_bantu: 0,
        terapi_iv: 0,
        gaya_berjalan: 0,
        status_mental: 0
      };
      // Humpty Dumpty: auto-pilih usia dari data pasien
      var tahun = Number((_this$dataPasien$USIA2 = (_this$dataPasien2 = this.dataPasien) === null || _this$dataPasien2 === void 0 || (_this$dataPasien2 = _this$dataPasien2.USIA_PASIEN) === null || _this$dataPasien2 === void 0 ? void 0 : _this$dataPasien2.tahun) !== null && _this$dataPasien$USIA2 !== void 0 ? _this$dataPasien$USIA2 : 0);
      var usiaVal = 1;
      if (tahun < 3) usiaVal = 4;else if (tahun < 7) usiaVal = 3;else if (tahun < 13) usiaVal = 2;
      var jk = ((_this$dataPasien3 = this.dataPasien) === null || _this$dataPasien3 === void 0 ? void 0 : _this$dataPasien3.JENISKELAMIN) === 'L' ? 2 : 1;
      this.formData.humpty = {
        usia: usiaVal,
        jenis_kelamin: jk,
        diagnosis: 4,
        gangguan_kognitif: 3,
        faktor_lingkungan: 4,
        respon_operasi: 3,
        penggunaan_obat: 3
      };
      this.showForm = true;
    },
    // ===== SIMPAN =====
    simpan: function simpan() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _res$data2, _res$data3, isMorse, skor, interpretasi, detail_items, payload, res, _res$data4;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.isSaving = true;
              _context3.prev = 1;
              isMorse = _this3.formData.skala === 'MORSE';
              skor = isMorse ? _this3.totalMorse : _this3.totalHumpty;
              interpretasi = isMorse ? _this3.morseInterpretasi.label : _this3.humptyInterpretasi.label;
              detail_items = isMorse ? _this3.buildDetailMorse() : _this3.buildDetailHumpty();
              payload = {
                noregister: _this3.noregister,
                skala: _this3.formData.skala,
                skor_total: skor,
                interpretasi: interpretasi,
                catatan: _this3.formData.catatan || '',
                detail_items: detail_items,
                parameter_json: isMorse ? JSON.stringify(_this3.formData.morse) : JSON.stringify(_this3.formData.humpty)
              };
              _context3.next = 9;
              return axios.post('/assesment/simpan_resiko_jatuh', payload);
            case 9:
              res = _context3.sent;
              if (!(((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.code) === 200 || ((_res$data3 = res.data) === null || _res$data3 === void 0 || (_res$data3 = _res$data3.metadata) === null || _res$data3 === void 0 ? void 0 : _res$data3.code) === 200)) {
                _context3.next = 17;
                break;
              }
              _this3.showForm = false;
              _this3.open('success', 'Pengkajian risiko jatuh berhasil disimpan');
              _context3.next = 15;
              return _this3.fetchRiwayat();
            case 15:
              _context3.next = 18;
              break;
            case 17:
              _this3.open('error', ((_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.message) || 'Gagal menyimpan pengkajian');
            case 18:
              _context3.next = 24;
              break;
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](1);
              console.error(_context3.t0);
              _this3.open('error', _context3.t0.message);
            case 24:
              _context3.prev = 24;
              _this3.isSaving = false;
              return _context3.finish(24);
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 20, 24, 27]]);
      }))();
    },
    buildDetailMorse: function buildDetailMorse() {
      var m = this.formData.morse;
      return [{
        parameter: 'Riwayat Jatuh',
        jawaban: m.riwayat_jatuh === 25 ? 'Ya' : 'Tidak',
        skor: m.riwayat_jatuh
      }, {
        parameter: 'Diagnosa Sekunder',
        jawaban: m.diagnosa_sekunder === 15 ? 'Ya' : 'Tidak',
        skor: m.diagnosa_sekunder
      }, {
        parameter: 'Alat Bantu Jalan',
        jawaban: this.labelMorseAlatBantu(m.alat_bantu),
        skor: m.alat_bantu
      }, {
        parameter: 'Terapi Intravena / Infus',
        jawaban: m.terapi_iv === 20 ? 'Ya' : 'Tidak',
        skor: m.terapi_iv
      }, {
        parameter: 'Cara Berjalan',
        jawaban: this.labelMorseGaya(m.gaya_berjalan),
        skor: m.gaya_berjalan
      }, {
        parameter: 'Status Mental',
        jawaban: m.status_mental === 15 ? 'Lupa akan keterbatasan diri' : 'Orientasi sesuai kemampuan',
        skor: m.status_mental
      }];
    },
    labelMorseAlatBantu: function labelMorseAlatBantu(v) {
      if (v === 30) return 'Berpegangan benda sekitar / Mebel';
      if (v === 15) return 'Kruk / Tongkat / Walker';
      return 'Tidak ada / Bed rest / Dibantu perawat';
    },
    labelMorseGaya: function labelMorseGaya(v) {
      if (v === 20) return 'Terganggu / Tidak normal';
      if (v === 10) return 'Lemah';
      return 'Normal / Tirah baring / Kursi roda';
    },
    buildDetailHumpty: function buildDetailHumpty() {
      var h = this.formData.humpty;
      var usiaCaptions = {
        4: 'Di bawah 3 tahun',
        3: '3–7 tahun',
        2: '7–13 tahun',
        1: '≥13 tahun'
      };
      var diagCaptions = {
        4: 'Kelainan neurologis',
        3: 'Perubahan oksigenasi',
        2: 'Kelainan psikis/perilaku',
        1: 'Diagnosis lain'
      };
      var kognitifCaptions = {
        3: 'Tidak sadar terhadap keterbatasan',
        2: 'Lupa terhadap keterbatasan',
        1: 'Mengetahui kemampuan diri'
      };
      var lingkCaptions = {
        4: 'Riwayat jatuh dari tempat tidur',
        3: 'Menggunakan alat bantu',
        2: 'Berada di tempat tidur',
        1: 'Di luar area perawatan'
      };
      var responCaptions = {
        3: 'Dalam 24 jam',
        2: 'Dalam 48 jam',
        1: '>48 jam / Tidak'
      };
      var obatCaptions = {
        3: 'Multipel obat',
        2: 'Salah satu obat',
        1: 'Tidak ada'
      };
      return [{
        parameter: 'Usia',
        jawaban: usiaCaptions[h.usia] || h.usia,
        skor: h.usia
      }, {
        parameter: 'Jenis Kelamin',
        jawaban: h.jenis_kelamin === 2 ? 'Laki-laki' : 'Perempuan',
        skor: h.jenis_kelamin
      }, {
        parameter: 'Diagnosis',
        jawaban: diagCaptions[h.diagnosis] || h.diagnosis,
        skor: h.diagnosis
      }, {
        parameter: 'Gangguan Kognitif',
        jawaban: kognitifCaptions[h.gangguan_kognitif] || h.gangguan_kognitif,
        skor: h.gangguan_kognitif
      }, {
        parameter: 'Faktor Lingkungan',
        jawaban: lingkCaptions[h.faktor_lingkungan] || h.faktor_lingkungan,
        skor: h.faktor_lingkungan
      }, {
        parameter: 'Respons Operasi/Obat Penenang',
        jawaban: responCaptions[h.respon_operasi] || h.respon_operasi,
        skor: h.respon_operasi
      }, {
        parameter: 'Penggunaan Obat',
        jawaban: obatCaptions[h.penggunaan_obat] || h.penggunaan_obat,
        skor: h.penggunaan_obat
      }];
    },
    // ===== DETAIL =====
    lihatDetail: function lihatDetail(row) {
      this.detailData = row;
      this.showDetail = true;
    },
    // ===== HAPUS =====
    konfirmasiHapus: function konfirmasiHapus(row) {
      var _this4 = this;
      this.$confirm.require({
        group: 'kajianResikoJatuh',
        message: "Hapus pengkajian tanggal ".concat(this.formatWaktu(row.waktu_kajian), "? Tindakan ini tidak dapat dibatalkan."),
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        accept: function accept() {
          _this4.hapus(row);
        }
      });
    },
    hapus: function hapus(row) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return axios.post('/assesment/hapus_resiko_jatuh', {
                noregister: _this5.noregister,
                id_kajian: row.id_kajian
              });
            case 3:
              _this5.open('info', 'Pengkajian berhasil dihapus');
              _context4.next = 6;
              return _this5.fetchRiwayat();
            case 6:
              _context4.next = 12;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);
              _this5.open('error', _context4.t0.message);
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 8]]);
      }))();
    },
    // ===== FORMAT =====
    formatWaktu: function formatWaktu(val) {
      if (!val) return '—';
      var d = new Date(val.replace(' ', 'T'));
      if (isNaN(d)) return val;
      var dd = String(d.getDate()).padStart(2, '0');
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var yyyy = d.getFullYear();
      var hh = String(d.getHours()).padStart(2, '0');
      var min = String(d.getMinutes()).padStart(2, '0');
      return "".concat(dd, "/").concat(mm, "/").concat(yyyy, " ").concat(hh, ":").concat(min);
    },
    // ===== NOTIFIKASI =====
    open: function open(type, message) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.$emit('show-alert', {
        type: type,
        title: title,
        message: message
      });
    },
    // ===== HELPER DISPLAY =====
    getSeverityFromInterpretasi: function getSeverityFromInterpretasi(val) {
      if (!val) return 'secondary';
      var v = val.toUpperCase();
      if (v.includes('TINGGI')) return 'danger';
      if (v.includes('SEDANG')) return 'warn';
      if (v.includes('RENDAH')) return 'success';
      return 'secondary';
    },
    getIconFromInterpretasi: function getIconFromInterpretasi(val) {
      if (!val) return 'pi pi-minus';
      var v = val.toUpperCase();
      if (v.includes('TINGGI')) return 'pi pi-exclamation-triangle';
      if (v.includes('SEDANG')) return 'pi pi-clock';
      return 'pi pi-check-circle';
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  style: {
    "font-weight": "600"
  }
};
var _hoisted_2 = {
  key: 0,
  style: {
    "font-size": "0.85em",
    "color": "#888"
  }
};
var _hoisted_3 = {
  style: {
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px"
  }
};
var _hoisted_4 = ["for"];
var _hoisted_5 = {
  style: {
    "font-size": "0.9em",
    "margin-top": "2px"
  }
};
var _hoisted_6 = {
  style: {
    "text-align": "right"
  }
};
var _hoisted_7 = {
  style: {
    "font-size": "2em",
    "font-weight": "900",
    "line-height": "1"
  }
};
var _hoisted_8 = {
  style: {
    "font-weight": "600"
  }
};
var _hoisted_9 = {
  style: {
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px"
  }
};
var _hoisted_10 = ["for"];
var _hoisted_11 = {
  style: {
    "font-size": "0.9em",
    "margin-top": "2px"
  }
};
var _hoisted_12 = {
  style: {
    "text-align": "right"
  }
};
var _hoisted_13 = {
  style: {
    "font-size": "2em",
    "font-weight": "900",
    "line-height": "1"
  }
};
var _hoisted_14 = {
  style: {
    "font-weight": "700"
  }
};
var _hoisted_15 = {
  style: {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "padding": "10px 14px",
    "border-radius": "8px",
    "background": "#f5f5f5",
    "border": "1px solid #ddd"
  }
};
var _hoisted_16 = {
  style: {
    "text-align": "right"
  }
};
var _hoisted_17 = {
  style: {
    "font-size": "1.5em",
    "font-weight": "900",
    "margin-right": "10px"
  }
};
var _hoisted_18 = {
  key: 0,
  "class": "mt-3 p-3",
  style: {
    "background": "#fff8e1",
    "border-radius": "6px",
    "border": "1px solid #ffe082"
  }
};
var _hoisted_19 = {
  "class": "container-fluid px-0"
};
var _hoisted_20 = {
  key: 0,
  "class": "text-center py-3"
};
var _hoisted_21 = {
  key: 1,
  "class": "row align-items-center"
};
var _hoisted_22 = {
  "class": "col-md-4"
};
var _hoisted_23 = {
  style: {
    "font-weight": "700",
    "font-size": "1.1em",
    "color": "#1a1a2e"
  }
};
var _hoisted_24 = {
  style: {
    "color": "#666",
    "margin-top": "2px"
  }
};
var _hoisted_25 = {
  style: {
    "margin-top": "4px",
    "display": "flex",
    "gap": "6px",
    "flex-wrap": "wrap"
  }
};
var _hoisted_26 = {
  "class": "col-md-4"
};
var _hoisted_27 = {
  style: {
    "color": "#555",
    "font-size": "0.85rem"
  }
};
var _hoisted_28 = {
  style: {
    "color": "#555",
    "margin-top": "4px"
  }
};
var _hoisted_29 = {
  style: {
    "color": "#555",
    "margin-top": "4px"
  }
};
var _hoisted_30 = {
  "class": "col-md-3 text-right"
};
var _hoisted_31 = {
  style: {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between"
  }
};
var _hoisted_32 = {
  style: {
    "display": "flex",
    "align-items": "center",
    "gap": "8px"
  }
};
var _hoisted_33 = {
  "class": "text-center py-5",
  style: {
    "color": "#aaa"
  }
};
var _hoisted_34 = {
  style: {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "26px",
    "height": "26px",
    "border-radius": "50%",
    "background": "#e3f2fd",
    "color": "#1565c0",
    "font-weight": "700"
  }
};
var _hoisted_35 = {
  style: {
    "font-weight": "600"
  }
};
var _hoisted_36 = {
  style: {
    "color": "#888"
  }
};
var _hoisted_37 = {
  style: {
    "font-size": "1.4em",
    "font-weight": "800"
  }
};
var _hoisted_38 = {
  key: 0,
  style: {
    "color": "#555"
  }
};
var _hoisted_39 = {
  key: 1,
  style: {
    "color": "#ccc"
  }
};
var _hoisted_40 = {
  style: {
    "display": "flex",
    "gap": "4px",
    "justify-content": "center"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ConfirmDialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ConfirmDialog");
  var _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  var _component_RadioButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("RadioButton");
  var _component_Tag = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tag");
  var _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  var _component_Textarea = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Textarea");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_Dialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dialog");
  var _component_ProgressBar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ProgressBar");
  var _component_Card = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Card");
  var _directive_tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDirective)("tooltip");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ConfirmDialog, {
    group: "kajianResikoJatuh"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: FORM PENGKAJIAN ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    visible: $data.showForm,
    "onUpdate:visible": _cache[3] || (_cache[3] = function ($event) {
      return $data.showForm = $event;
    }),
    header: $options.formTitle,
    modal: true,
    style: {
      width: '700px'
    },
    closable: !$data.isSaving
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Batal",
        icon: "pi pi-times",
        severity: "secondary",
        text: "",
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $data.showForm = false;
        }),
        disabled: $data.isSaving
      }, null, 8 /* PROPS */, ["disabled"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Simpan Pengkajian",
        icon: "pi pi-save",
        severity: "success",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $options.simpan();
        }),
        loading: $data.isSaving
      }, null, 8 /* PROPS */, ["loading"])];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.formData.skala === 'MORSE' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 0
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== SKALA MORSE ===== "), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "mb-3 p-3",
        style: {
          "background": "#e3f2fd",
          "border-radius": "8px",
          "border-left": "4px solid #1976d2"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: {
          "font-weight": "700",
          "color": "#1565c0",
          "margin-bottom": "2px"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-info-circle mr-1"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Skala Morse — Dewasa / Remaja (≥ 14 tahun) ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
        style: {
          "color": "#555"
        }
      }, "Skor total menentukan tingkat risiko jatuh pasien dewasa.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
        value: $data.morseCriteria,
        showGridlines: "",
        size: "small",
        "class": "mb-3"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Parameter",
            style: {
              "min-width": "200px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.label), 1 /* TEXT */), s.data.note ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.note), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Pilihan",
            style: {
              "min-width": "260px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(s.data.options, function (opt) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                  key: opt.value,
                  style: {
                    "display": "flex",
                    "align-items": "center",
                    "gap": "8px"
                  }
                }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
                  inputId: s.data.field + '_' + opt.value,
                  name: s.data.field,
                  value: opt.value,
                  modelValue: $data.formData.morse[s.data.field],
                  "onUpdate:modelValue": function onUpdateModelValue($event) {
                    return $data.formData.morse[s.data.field] = $event;
                  }
                }, null, 8 /* PROPS */, ["inputId", "name", "value", "modelValue", "onUpdate:modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
                  "for": s.data.field + '_' + opt.value,
                  style: {
                    "cursor": "pointer",
                    "margin": "0"
                  }
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.label), 9 /* TEXT, PROPS */, _hoisted_4)]);
              }), 128 /* KEYED_FRAGMENT */))])];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Skor",
            style: {
              "width": "80px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              var _$data$formData$morse;
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
                value: String((_$data$formData$morse = $data.formData.morse[s.data.field]) !== null && _$data$formData$morse !== void 0 ? _$data$formData$morse : 0),
                severity: $data.formData.morse[s.data.field] > 0 ? 'warn' : 'secondary'
              }, null, 8 /* PROPS */, ["value", "severity"])];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Total Morse "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([$options.morseResultStyle, {
          "padding": "12px 16px",
          "border-radius": "8px",
          "display": "flex",
          "align-items": "center",
          "justify-content": "space-between",
          "margin-bottom": "12px"
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: {
          "font-weight": "700"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-chart-bar mr-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Total Skor Morse ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.morseInterpretasi.keterangan), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalMorse), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: $options.morseInterpretasi.severity,
        value: $options.morseInterpretasi.label,
        "class": "mt-1"
      }, null, 8 /* PROPS */, ["severity", "value"])])], 4 /* STYLE */)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== HUMPTY DUMPTY ===== "), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "mb-3 p-3",
        style: {
          "background": "#fce4ec",
          "border-radius": "8px",
          "border-left": "4px solid #c2185b"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: {
          "font-weight": "700",
          "color": "#ad1457",
          "margin-bottom": "2px"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-info-circle mr-1"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Skala Humpty Dumpty — Anak-anak (< 14 tahun) ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
        style: {
          "color": "#555"
        }
      }, "Skor total menentukan tingkat risiko jatuh pasien anak.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
        value: $data.humptyDumptyCriteria,
        showGridlines: "",
        size: "small",
        "class": "mb-3"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Parameter",
            style: {
              "min-width": "180px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.label), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Pilihan",
            style: {
              "min-width": "280px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(s.data.options, function (opt) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                  key: opt.value,
                  style: {
                    "display": "flex",
                    "align-items": "center",
                    "gap": "8px"
                  }
                }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_RadioButton, {
                  inputId: s.data.field + '_' + opt.value,
                  name: s.data.field,
                  value: opt.value,
                  modelValue: $data.formData.humpty[s.data.field],
                  "onUpdate:modelValue": function onUpdateModelValue($event) {
                    return $data.formData.humpty[s.data.field] = $event;
                  }
                }, null, 8 /* PROPS */, ["inputId", "name", "value", "modelValue", "onUpdate:modelValue"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
                  "for": s.data.field + '_' + opt.value,
                  style: {
                    "cursor": "pointer",
                    "margin": "0"
                  }
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.label), 9 /* TEXT, PROPS */, _hoisted_10)]);
              }), 128 /* KEYED_FRAGMENT */))])];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Skor",
            style: {
              "width": "80px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              var _$data$formData$humpt, _$data$formData$humpt2;
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
                value: String((_$data$formData$humpt = $data.formData.humpty[s.data.field]) !== null && _$data$formData$humpt !== void 0 ? _$data$formData$humpt : 1),
                severity: ((_$data$formData$humpt2 = $data.formData.humpty[s.data.field]) !== null && _$data$formData$humpt2 !== void 0 ? _$data$formData$humpt2 : 1) > 1 ? 'warn' : 'secondary'
              }, null, 8 /* PROPS */, ["value", "severity"])];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Total Humpty Dumpty "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([$options.humptyResultStyle, {
          "padding": "12px 16px",
          "border-radius": "8px",
          "display": "flex",
          "align-items": "center",
          "justify-content": "space-between",
          "margin-bottom": "12px"
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: {
          "font-weight": "700"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-chart-bar mr-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Total Skor Humpty Dumpty ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humptyInterpretasi.keterangan), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalHumpty), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: $options.humptyInterpretasi.severity,
        value: $options.humptyInterpretasi.label,
        "class": "mt-1"
      }, null, 8 /* PROPS */, ["severity", "value"])])], 4 /* STYLE */)], 64 /* STABLE_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        style: {
          "font-weight": "600",
          "display": "block",
          "margin-bottom": "4px"
        }
      }, "Catatan / Observasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
        modelValue: $data.formData.catatan,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $data.formData.catatan = $event;
        }),
        rows: 2,
        style: {
          "width": "100%"
        },
        placeholder: "Catatan tambahan pengkajian (opsional)..."
      }, null, 8 /* PROPS */, ["modelValue"])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible", "header", "closable"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== DIALOG: DETAIL RIWAYAT ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dialog, {
    visible: $data.showDetail,
    "onUpdate:visible": _cache[5] || (_cache[5] = function ($event) {
      return $data.showDetail = $event;
    }),
    header: "Detail Pengkajian",
    modal: true,
    style: {
      width: '600px'
    }
  }, {
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Tutup",
        icon: "pi pi-times",
        text: "",
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return $data.showDetail = false;
        })
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.detailData ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 0
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "mb-3 p-3",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($data.detailData.skala === 'MORSE' ? 'background:#e3f2fd;border-radius:8px;border-left:4px solid #1976d2' : 'background:#fce4ec;border-radius:8px;border-left:4px solid #c2185b')
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.skala === 'MORSE' ? 'Skala Morse — Dewasa' : 'Skala Humpty Dumpty — Anak'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu($data.detailData.waktu_kajian)) + "  |  Dikaji oleh: ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.username), 1 /* TEXT */)])], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
        value: $data.detailData.detail_items,
        showGridlines: "",
        size: "small",
        "class": "mb-3"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "parameter",
            header: "Parameter",
            style: {
              "min-width": "200px"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "jawaban",
            header: "Jawaban",
            style: {
              "min-width": "200px"
            }
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            field: "skor",
            header: "Skor",
            style: {
              "width": "80px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
                value: String(s.data.skor),
                severity: s.data.skor > 0 ? 'warn' : 'secondary'
              }, null, 8 /* PROPS */, ["value", "severity"])];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        style: {
          "font-weight": "600"
        }
      }, "Total Skor", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.skor_total), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: $options.getSeverityFromInterpretasi($data.detailData.interpretasi),
        value: $data.detailData.interpretasi
      }, null, 8 /* PROPS */, ["severity", "value"])])]), $data.detailData.catatan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-comment mr-1",
        style: {
          "color": "#f57c00"
        }
      }, null, -1 /* CACHED */)), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Catatan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailData.catatan), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== INFO PASIEN (hanya tampil di halaman standalone, bukan sebagai component) ===== "), !$props.datapasien ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Card, {
    key: 0,
    "class": "mb-3"
  }, {
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      var _$data$dataPasien$USI, _$data$dataPasien$USI2, _$data$dataPasien$USI3, _$data$dataPasien$USI4;
      return [$data.isLoadingPasien ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ProgressBar, {
        mode: "indeterminate",
        style: {
          "height": ".3em"
        }
      })])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "col-md-1 text-center"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        style: {
          "width": "52px",
          "height": "52px",
          "border-radius": "50%",
          "background": "#e3f2fd",
          "display": "inline-flex",
          "align-items": "center",
          "justify-content": "center"
        }
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-user",
        style: {
          "font-size": "1.5em",
          "color": "#1565c0"
        }
      })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dataPasien.DATA_SINGKAT || '—'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" No. RM: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dataPasien.NOMR || '—'), 1 /* TEXT */), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  |  No. Reg: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("code", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.noregister), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: $data.dataPasien.JENISKELAMIN === 'L' ? 'info' : 'danger',
        icon: $data.dataPasien.JENISKELAMIN === 'L' ? 'pi pi-mars' : 'pi pi-venus',
        value: $data.dataPasien.JENISKELAMIN === 'L' ? 'Laki-laki' : 'Perempuan'
      }, null, 8 /* PROPS */, ["severity", "icon", "value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: "secondary",
        value: ((_$data$dataPasien$USI = (_$data$dataPasien$USI2 = $data.dataPasien.USIA_PASIEN) === null || _$data$dataPasien$USI2 === void 0 ? void 0 : _$data$dataPasien$USI2.tahun) !== null && _$data$dataPasien$USI !== void 0 ? _$data$dataPasien$USI : '?') + ' Thn ' + ((_$data$dataPasien$USI3 = (_$data$dataPasien$USI4 = $data.dataPasien.USIA_PASIEN) === null || _$data$dataPasien$USI4 === void 0 ? void 0 : _$data$dataPasien$USI4.bulan) !== null && _$data$dataPasien$USI3 !== void 0 ? _$data$dataPasien$USI3 : 0) + ' Bln'
      }, null, 8 /* PROPS */, ["value"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        severity: $options.skalaPasien === 'MORSE' ? 'info' : 'danger',
        icon: $options.skalaPasien === 'MORSE' ? 'pi pi-user' : 'pi pi-star',
        value: 'Skala: ' + ($options.skalaPasien === 'MORSE' ? 'Morse (Dewasa)' : 'Humpty Dumpty (Anak)')
      }, null, 8 /* PROPS */, ["severity", "icon", "value"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-calendar mr-1"
      }, null, -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Masuk: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dataPasien.MASUKPOLY_DISPLAY || '—'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-user-edit mr-1"
      }, null, -1 /* CACHED */)), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" DPJP: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dataPasien.NAMADOKTER || '—'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-credit-card mr-1"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dataPasien.CARABAYAR || '—'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        label: "Pengkajian Baru",
        icon: "pi pi-plus",
        severity: "success",
        onClick: _cache[6] || (_cache[6] = function ($event) {
          return $options.bukaFormBaru();
        }),
        disabled: $data.isLoadingPasien
      }, null, 8 /* PROPS */, ["disabled"])])]))];
    }),
    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== RIWAYAT PENGKAJIAN ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Card, null, {
    title: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "pi pi-list mr-2",
        style: {
          "color": "#1976d2"
        }
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Riwayat Pengkajian Risiko Jatuh ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
        value: 'Total: ' + $data.riwayat.length + ' pengkajian',
        severity: "info"
      }, null, 8 /* PROPS */, ["value"]), $props.datapasien ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Button, {
        key: 0,
        label: "Pengkajian Baru",
        icon: "pi pi-plus",
        severity: "success",
        size: "small",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return $options.bukaFormBaru();
        })
      })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
        icon: "pi pi-refresh",
        severity: "secondary",
        outlined: "",
        size: "small",
        onClick: _cache[8] || (_cache[8] = function ($event) {
          return $options.fetchRiwayat();
        }),
        loading: $data.isLoadingRiwayat
      }, null, 8 /* PROPS */, ["loading"]), [[_directive_tooltip, 'Muat ulang']])])])];
    }),
    content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
        value: $data.riwayat,
        rowHover: true,
        size: "small",
        stripedRows: "",
        paginator: $data.riwayat.length > 10,
        rows: 10
      }, {
        empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
            "class": "pi pi-inbox",
            style: {
              "font-size": "2em",
              "opacity": ".4"
            }
          }, null, -1 /* CACHED */)), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "mt-2"
          }, "Belum ada pengkajian risiko jatuh untuk pasien ini.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
            label: "Mulai Pengkajian Pertama",
            icon: "pi pi-plus",
            severity: "success",
            "class": "mt-3",
            onClick: _cache[9] || (_cache[9] = function ($event) {
              return $options.bukaFormBaru();
            })
          })])];
        }),
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "#",
            style: {
              "width": "44px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.index + 1), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Waktu Kajian",
            style: {
              "min-width": "160px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatWaktu(s.data.waktu_kajian)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.username), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Skala",
            style: {
              "width": "160px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
                severity: s.data.skala === 'MORSE' ? 'info' : 'danger',
                value: s.data.skala === 'MORSE' ? 'Morse — Dewasa' : 'Humpty Dumpty — Anak'
              }, null, 8 /* PROPS */, ["severity", "value"])];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Skor Total",
            style: {
              "width": "110px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.skor_total), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Risiko",
            style: {
              "width": "140px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tag, {
                severity: $options.getSeverityFromInterpretasi(s.data.interpretasi),
                value: s.data.interpretasi,
                icon: $options.getIconFromInterpretasi(s.data.interpretasi)
              }, null, 8 /* PROPS */, ["severity", "value", "icon"])];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Catatan",
            style: {
              "min-width": "180px"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [s.data.catatan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_38, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
                "class": "pi pi-comment mr-1",
                style: {
                  "color": "#f57c00"
                }
              }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.data.catatan), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_39, "—"))];
            }),
            _: 1 /* STABLE */
          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
            header: "Aksi",
            style: {
              "width": "130px",
              "text-align": "center"
            }
          }, {
            body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (s) {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
                icon: "pi pi-eye",
                size: "small",
                outlined: "",
                onClick: function onClick($event) {
                  return $options.lihatDetail(s.data);
                }
              }, null, 8 /* PROPS */, ["onClick"]), [[_directive_tooltip, 'Lihat Detail']]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
                icon: "pi pi-trash",
                size: "small",
                severity: "danger",
                outlined: "",
                onClick: function onClick($event) {
                  return $options.konfirmasiHapus(s.data);
                }
              }, null, 8 /* PROPS */, ["onClick"]), [[_directive_tooltip, 'Hapus']])])];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["value", "paginator"])];
    }),
    _: 1 /* STABLE */
  })])]);
}

/***/ }),

/***/ "./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue":
/*!************************************************************************************!*\
  !*** ./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _KajianResikoJatuhComponent_vue_vue_type_template_id_9224884a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a */ "./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a");
/* harmony import */ var _KajianResikoJatuhComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KajianResikoJatuhComponent.vue?vue&type=script&lang=js */ "./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_KajianResikoJatuhComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_KajianResikoJatuhComponent_vue_vue_type_template_id_9224884a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KajianResikoJatuhComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KajianResikoJatuhComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./KajianResikoJatuhComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KajianResikoJatuhComponent_vue_vue_type_template_id_9224884a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KajianResikoJatuhComponent_vue_vue_type_template_id_9224884a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue?vue&type=template&id=9224884a");


/***/ })

}]);