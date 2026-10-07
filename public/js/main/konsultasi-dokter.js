"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["konsultasi-dokter"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/index.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");
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
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_1___default()),
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  props: {
    msg: String
  },
  data: function data() {
    return {
      fact: [],
      data_pasien: [],
      list_dokter: [],
      noreg_from_url: '',
      form: {
        startdate: '',
        enddate: ''
      },
      isLoading: false,
      loading_post: false,
      fullPage: true,
      // Form Input Baru
      form_konsul: {
        pesan: ''
      },
      chat_history: []
    };
  },
  mounted: function mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  created: function created() {
    //this.fetchData();
    this.noreg_from_url = window.location.pathname.split('/').pop();
    this.getdatapasien();
    this.getnamadokter();
    this.get_konsultasi_dokter();
  },
  methods: {
    fetchData: function fetchData() {
      var currentDate = new Date();
    },
    convert_chart: function convert_chart(data) {
      if (data == null) {
        return "";
      } else {
        return data.replace(/\n/g, '<br>');
      }
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
    getnamadokter: function getnamadokter() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.form.mode = 2;
              _context.next = 3;
              return axios.post('/getnamadokter', _this.form).then(function (response) {
                _this.list_dokter = response.data.response;
                _this.isLoading = false;
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
    confirmHapusBalasan: function confirmHapusBalasan(id) {
      var _this2 = this;
      this.$confirm.require({
        message: 'Apakah Anda yakin ingin menghapus balasan ini?',
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: function accept() {
          // Panggil fungsi hapus jika user klik 'Ya'
          _this2.eksekusiHapusBalasan(id);
        },
        reject: function reject() {
          // Opsi jika user batal (opsional)
        }
      });
    },
    eksekusiHapusBalasan: function eksekusiHapusBalasan(id) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              _context2.prev = 1;
              _context2.next = 4;
              return axios.post('/delete_balasan_konsul', {
                detail_id: id
              });
            case 4:
              response = _context2.sent;
              if (response.data.metadata.code === 200) {
                _this3.open('success', 'Balasan berhasil dihapus');

                // Refresh data tanpa reload halaman
                _this3.get_konsultasi_dokter();
              }
              _context2.next = 12;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error(_context2.t0);
              _this3.open('error', 'Gagal menghapus balasan');
            case 12:
              _context2.prev = 12;
              _this3.isLoading = false;
              return _context2.finish(12);
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 8, 12, 15]]);
      }))();
    },
    hapusKonsulInduk: function hapusKonsulInduk(id) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat konsultasi ini?')) {
                // Panggil API hapus di sini
                // await axios.post('/delete_konsultasi', { id: id })
                _this4.open('success', 'Konsultasi berhasil dihapus');
                _this4.get_konsultasi_dokter(); // Refresh data
              }
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    hapusBalasan: function hapusBalasan(id) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (confirm('Hapus balasan ini?')) {
                // Panggil API hapus balasan di sini
                // await axios.post('/delete_balasan', { id: id })
                _this5.open('success', 'Balasan berhasil dihapus');
                _this5.get_konsultasi_dokter(); // Refresh data
              }
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    kirimKonsul: function kirimKonsul() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var newChat;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!_this6.form_konsul.dokter_tujuan || !_this6.form_konsul.pesan)) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return", _this6.open('error', 'Pilih dokter dan isi pesan konsul!'));
            case 2:
              _this6.loading_post = true;
              newChat = {
                id: Date.now(),
                // ID unik sementara 
                tgl_tanya: new Date().toLocaleString('id-ID'),
                noregister: _this6.data_pasien.NOPENDAFTARAN,
                no_rm: _this6.data_pasien.NOMR,
                nama_pasien: _this6.data_pasien.NAMAPASIEN,
                keluhan: _this6.form_konsul.pesan,
                dokter_tujuan: _this6.form_konsul.dokter_tujuan,
                dokter_pengirim: _this6.data_pasien.KDDOKTER,
                // Default ke DPJP    
                diagnosa: _this6.form_konsul.diagnosa || '',
                // Tambahkan field diagnosa
                jawaban: null,
                temp_balasan: ''
              }; //console.log('parameter',this.form)
              _context5.next = 6;
              return axios.post('/insert_konsultasi_dokter', newChat).then(function (response) {
                if (response.data.code === 200) {
                  _this6.get_konsultasi_dokter();
                  _this6.form_konsul.pesan = '';
                  _this6.form_konsul.dokter_tujuan = null;
                  _this6.form_konsul.diagnosa = '';
                  _this6.open('success', 'Konsultasi dikirim!');
                }
                _this6.loading_post = false;
              })["catch"](function (error) {
                console.log(error);
                _this6.loading_post = false;
              })["finally"](function () {
                return _this6.loading_post = false;
              });
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    },
    balasKonsul: function balasKonsul(item) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var newBalasan;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (item.temp_balasan) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", _this7.open('error', 'Isi balasan konsul terlebih dahulu!'));
            case 2:
              item.loading_balasan = true;
              newBalasan = {
                id_konsul: item.id_konsul,
                noregister: _this7.data_pasien.NOPENDAFTARAN,
                no_rm: _this7.data_pasien.NOMR,
                nama_pasien: _this7.data_pasien.NAMAPASIEN,
                balasan: item.temp_balasan,
                nama_dokter: _this7.data_pasien.NAMADOKTER,
                // Nama dokter pengirim (DPJP)
                kode_dokter: _this7.data_pasien.KDDOKTER // Default ke DPJP    
              };
              _context6.next = 6;
              return axios.post('/insert_balasan_konsul', newBalasan).then(function (response) {
                if (response.data.metadata.code === 200) {
                  _this7.get_konsultasi_dokter();
                  item.temp_balasan = '';
                  _this7.open('success', 'Balasan terkirim!');
                }
              })["catch"](function (error) {
                console.log(error);
              })["finally"](function () {
                item.loading_balasan = false;
              });
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    get_konsultasi_dokter: function get_konsultasi_dokter() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var param;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              param = {
                noregister: _this8.noreg_from_url,
                mode: 1
              };
              _context7.next = 3;
              return axios.post('/get_konsultasi_dokter', param).then(function (response) {
                // this.chat_history = response.data.response; 
                _this8.isLoading = false;
                var rawData = response.data.response;
                _this8.chat_history = rawData.map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    show_all: false,
                    // Default: sembunyikan jika lebih dari 5
                    loading_balasan: false,
                    temp_balasan: ''
                  });
                });
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
    getdatapasien: function getdatapasien() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _this9.form.mode = "history8";
              //this.form.noregister = "800368605";
              _this9.form.noregister = _this9.noreg_from_url; //window.location.pathname.split('/').pop();
              //console.log('parameter',this.form)
              _context8.next = 4;
              return axios.post('/datapasienpertransaksi', _this9.form).then(function (response) {
                _this9.data_pasien = response.data.response[0];
                _this9.isLoading = false;
              })["catch"](function (error) {
                console.log(error);
                _this9.isLoading = false;
              })["finally"](function () {
                return _this9.isLoading = false;
              });
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  name: 'KonsulInbox',
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_0___default())
  },
  data: function data() {
    return {
      isLoading: false,
      fullPage: true,
      activeTab: 'masuk',
      searchQuery: '',
      replyText: '',
      replyStatus: 'dibalas',
      replyPrioritas: 'normal',
      replyWithTtd: true,
      selectedKonsul: null,
      konsul_list_db: [],
      showReplyModal: false,
      isSending: false
    };
  },
  computed: {
    unreadCount: function unreadCount() {
      return this.konsul_list_db.filter(function (k) {
        return k.is_read === '0' && k.selesai === '0';
      }).length;
    },
    filteredKonsul: function filteredKonsul() {
      var _this = this;
      return this.konsul_list_db.filter(function (k) {
        return k.tab === _this.activeTab;
      }).filter(function (k) {
        if (!_this.searchQuery) return true;
        var q = _this.searchQuery.toLowerCase();
        return k.dokterPengirim.toLowerCase().includes(q) || k.subject.toLowerCase().includes(q) || k.pasien.nama.toLowerCase().includes(q);
      });
    }
  },
  created: function created() {
    this.get_konsultasi_dokter();
  },
  methods: {
    // ===== HELPER =====
    extractSpesialis: function extractSpesialis(namaDokter) {
      if (!namaDokter) return 'Umum';
      var match = namaDokter.match(/Sp\.\w+/);
      return match ? match[0] : 'Umum';
    },
    formatWaktu: function formatWaktu(tanggal) {
      if (!tanggal) return '';
      var now = new Date();
      var tgl = new Date(tanggal);
      var diffHours = (now - tgl) / (1000 * 60 * 60);
      var diffDays = diffHours / 24;
      if (diffHours < 24) {
        return tgl.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (diffDays < 2) {
        return 'Kemarin';
      } else {
        return tgl.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short'
        });
      }
    },
    print_soap: function print_soap(noregister) {
      window.open('/print-soap/' + noregister, '_blank');
    },
    formatWaktuLengkap: function formatWaktuLengkap(tanggal) {
      if (!tanggal) return '';
      return new Date(tanggal).toLocaleString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getAvatarColor: function getAvatarColor(id) {
      var colors = ['#dc3545', '#6f42c1', '#17a2b8', '#20c997', '#fd7e14', '#e83e8c', '#007bff', '#28a745', '#c0392b'];
      return colors[parseInt(id) % colors.length];
    },
    getSpesialisBadgeClass: function getSpesialisBadgeClass(spesialis) {
      var map = {
        'Sp.PD': 'badge-success',
        'Sp.B': 'badge-danger',
        'Sp.JP': 'badge-purple',
        'Sp.A': 'badge-info',
        'Sp.OG': 'badge-warning',
        'Sp.S': 'badge-dark',
        'Sp.M': 'badge-secondary'
      };
      return map[spesialis] || 'badge-primary';
    },
    statusBadgeClass: function statusBadgeClass(status) {
      var map = {
        'Baru': 'badge badge-primary',
        'Dibalas': 'badge badge-success',
        'Selesai': 'badge badge-secondary',
        'Urgent': 'badge badge-danger'
      };
      return map[status] || 'badge badge-light';
    },
    // ===== MAPPING DB → UI =====
    mapKonsulItem: function mapKonsulItem(item) {
      var spesialis = this.extractSpesialis(item.nama_dokter_pengirim);
      var initials = item.inisial_dokter_pengirim ? item.inisial_dokter_pengirim : (item.nama_dokter_pengirim || '??').substring(0, 2).toUpperCase();
      var status = 'Baru';
      if (item.selesai === '1') {
        status = 'Selesai';
      } else if (item.is_read === '1') {
        status = 'Dibalas';
      }
      var tab = item.selesai === '1' ? 'selesai' : 'masuk';
      var messages = [{
        sender: item.nama_dokter_pengirim,
        initials: initials,
        isMe: false,
        isRead: item.is_read === '1',
        time: this.formatWaktuLengkap(item.tanggal_konsul),
        body: item.keluhan || '(tidak ada isi pesan)'
      }];
      return {
        id_konsul: item.id_konsul,
        noregister: item.noregister,
        is_read: item.is_read,
        is_urgent: item.is_urgent,
        selesai: item.selesai,
        dokter_tujuan: item.dokter_tujuan,
        tanggal_konsul: item.tanggal_konsul,
        dokterPengirim: item.nama_dokter_pengirim,
        namaDokterTujuan: item.nama_dokter_tujuan,
        spesialis: spesialis,
        spesialisBadgeClass: this.getSpesialisBadgeClass(spesialis),
        subject: item.diagnosa || '(tanpa diagnosa)',
        preview: (item.keluhan || '').substring(0, 80) + '...',
        waktu: this.formatWaktu(item.tanggal_konsul),
        isRead: item.is_read === '1',
        isUrgent: item.is_urgent === '1',
        status: status,
        tab: tab,
        initials: initials,
        avatarColor: this.getAvatarColor(item.id_konsul),
        pasien: {
          nama: item.nama_pasien || '-',
          noRm: item.no_rm || '-',
          noregister: item.noregister || '-',
          diagnosa: item.diagnosa || '-'
        },
        messages: messages
      };
    },
    // ===== FETCH LIST =====
    get_konsultasi_dokter: function get_konsultasi_dokter() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, rawData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.isLoading = true;
              _context.prev = 1;
              _context.next = 4;
              return axios.post('/get_konsultasi_dokter', {
                kd_dokter: '303568',
                mode: 2,
                noregister: ''
              });
            case 4:
              response = _context.sent;
              rawData = response.data.response || [];
              _this2.konsul_list_db = rawData.map(function (item) {
                return _this2.mapKonsulItem(item);
              });
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              console.error('Error fetch konsultasi:', _context.t0);
            case 12:
              _context.prev = 12;
              _this2.isLoading = false;
              return _context.finish(12);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 9, 12, 15]]);
      }))();
    },
    // ===== FETCH DETAIL / BALASAN =====
    get_detil_konsul: function get_detil_konsul(item) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, data, details;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoading = true;
              _context2.prev = 1;
              _context2.next = 4;
              return axios.post('/get_konsultasi_dokter', {
                id_konsul: item.id_konsul,
                noregister: item.noregister,
                mode: 3
              });
            case 4:
              response = _context2.sent;
              data = response.data.response;
              if (!(!data || data.length === 0)) {
                _context2.next = 9;
                break;
              }
              console.warn('Tidak ada detail untuk id_konsul:', item.id_konsul);
              return _context2.abrupt("return");
            case 9:
              details = data[0].details || [];
              if (!(details.length === 0)) {
                _context2.next = 12;
                break;
              }
              return _context2.abrupt("return");
            case 12:
              if (_this3.selectedKonsul && _this3.selectedKonsul.id_konsul === item.id_konsul) {
                _this3.selectedKonsul.messages = [_this3.selectedKonsul.messages[0]];
                details.forEach(function (d) {
                  _this3.selectedKonsul.messages.push({
                    sender: d.nama_dokter || item.namaDokterTujuan,
                    initials: d.inisial || item.inisial_dokter_tujuan || 'DR',
                    isMe: d.is_me === '1',
                    isRead: d.is_me === '1' ? _this3.selectedKonsul.is_read === '1' : true,
                    is_read_penerima: d.is_read_penerima,
                    time: _this3.formatWaktuLengkap(d.tanggal || item.tanggal_konsul),
                    body: d.balasan || d.pesan || d.isi || ''
                  });
                });
                _this3.$nextTick(function () {
                  if (_this3.$refs.threadContainer) {
                    _this3.$refs.threadContainer.scrollTop = _this3.$refs.threadContainer.scrollHeight;
                  }
                });
              }
              _context2.next = 18;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
              console.error('Error fetch detail konsul:', _context2.t0);
            case 18:
              _context2.prev = 18;
              _this3.isLoading = false;
              return _context2.finish(18);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 15, 18, 21]]);
      }))();
    },
    // ===== PILIH KONSUL =====
    selectKonsul: function selectKonsul(item) {
      var _this4 = this;
      this.selectedKonsul = null;
      this.replyText = '';
      this.$nextTick(function () {
        _this4.selectedKonsul = item;
        item.is_read = '1';
        item.isRead = true;
        if (Array.isArray(item.messages)) {
          item.messages.forEach(function (msg) {
            msg.isRead = true;
          });
        }
        _this4.get_detil_konsul(item);
        _this4.markAsReadOnServer(item);
        _this4.$nextTick(function () {
          if (_this4.$refs.threadContainer) {
            _this4.$refs.threadContainer.scrollTop = _this4.$refs.threadContainer.scrollHeight;
          }
        });
      });
    },
    // ===== MODAL BALAS =====
    openReplyModal: function openReplyModal() {
      this.replyText = '';
      this.replyStatus = 'dibalas';
      this.replyPrioritas = 'normal';
      this.replyWithTtd = true;
      this.showReplyModal = true;
    },
    closeReplyModal: function closeReplyModal() {
      this.showReplyModal = false;
    },
    insertSnippet: function insertSnippet(text) {
      this.replyText += text;
    },
    // ===== KIRIM BALASAN =====
    sendReply: function sendReply() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var pesan, timeStr;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!_this5.replyText.trim() || !_this5.selectedKonsul)) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              _this5.isSending = true;
              pesan = _this5.replyText;
              timeStr = _this5.formatWaktuLengkap(new Date().toISOString());
              _this5.selectedKonsul.messages.push({
                sender: _this5.selectedKonsul.namaDokterTujuan || 'dr. Anda',
                initials: 'AN',
                isMe: true,
                isRead: false,
                is_read_penerima: '0',
                time: timeStr,
                body: pesan
              });
              _this5.selectedKonsul.status = 'Dibalas';
              _this5.selectedKonsul.is_read = '1';
              _this5.selectedKonsul.preview = pesan.substring(0, 80) + '...';

              // Jika status langsung selesai
              if (_this5.replyStatus === 'selesai') {
                _this5.selectedKonsul.status = 'Selesai';
                _this5.selectedKonsul.tab = 'selesai';
                _this5.selectedKonsul.selesai = '1';
              }
              _this5.$nextTick(function () {
                if (_this5.$refs.threadContainer) {
                  _this5.$refs.threadContainer.scrollTop = _this5.$refs.threadContainer.scrollHeight;
                }
              });
              _context3.prev = 11;
              _context3.next = 14;
              return _this5.postReplyToServer(_this5.selectedKonsul, pesan);
            case 14:
              _this5.open('success', 'Balasan berhasil dikirim.');
              _this5.closeReplyModal();
              if (!(_this5.replyStatus === 'selesai')) {
                _context3.next = 20;
                break;
              }
              _context3.next = 19;
              return _this5.postSelesaiToServer(_this5.selectedKonsul);
            case 19:
              _this5.selectedKonsul = null;
            case 20:
              _context3.next = 24;
              break;
            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](11);
            case 24:
              _context3.prev = 24;
              _this5.isSending = false;
              _this5.replyText = '';
              return _context3.finish(24);
            case 28:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[11, 22, 24, 28]]);
      }))();
    },
    // ===== TANDAI SELESAI =====
    markAsSelesai: function markAsSelesai(item) {
      item.status = 'Selesai';
      item.tab = 'selesai';
      item.selesai = '1';
      this.selectedKonsul = null;
      this.postSelesaiToServer(item);
      this.open('success', 'Konsultasi ditandai selesai.');
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
    // ===== TERUSKAN =====
    teruskanKonsul: function teruskanKonsul() {
      this.open('info', 'Fitur teruskan konsultasi akan segera tersedia.');
    },
    // ===== API CALLS =====
    markAsReadOnServer: function markAsReadOnServer(konsul) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return axios.post('/konsultasi_read', {
                id_konsul: konsul.id_konsul
              });
            case 3:
              _context4.next = 8;
              break;
            case 5:
              _context4.prev = 5;
              _context4.t0 = _context4["catch"](0);
              console.error('Gagal tandai baca:', _context4.t0);
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 5]]);
      }))();
    },
    postReplyToServer: function postReplyToServer(konsul, pesan) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var param, res;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              param = {
                id_konsul: konsul.id_konsul,
                noregister: konsul.noregister,
                kode_dokter: konsul.dokter_tujuan,
                nama_dokter: konsul.namaDokterTujuan,
                balasan: pesan,
                is_me: '1',
                status: konsul.status
              };
              _context5.next = 4;
              return axios.post('/insert_balasan_konsul', param);
            case 4:
              res = _context5.sent;
              console.log('Balasan berhasil dikirim:', res.data);
              _context5.next = 13;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              console.error('Gagal mengirim balasan:', _context5.t0);
              _this6.open('error', 'Gagal mengirim balasan, silahkan periksa koneksi.');
              throw _context5.t0;
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8]]);
      }))();
    },
    postSelesaiToServer: function postSelesaiToServer(konsul) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return axios.post('/konsultasi_selesai', {
                id_konsul: konsul.id_konsul,
                noregister: konsul.noregister
              });
            case 3:
              _context6.next = 8;
              break;
            case 5:
              _context6.prev = 5;
              _context6.t0 = _context6["catch"](0);
              console.error('Gagal tandai selesai:', _context6.t0);
            case 8:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 5]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79 ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "card card-outline card-primary shadow-sm"
};
var _hoisted_4 = {
  "class": "card-header bg-white"
};
var _hoisted_5 = {
  "class": "card-tools"
};
var _hoisted_6 = {
  "class": "badge badge-info p-2"
};
var _hoisted_7 = {
  "class": "card-body bg-light-custom"
};
var _hoisted_8 = {
  "class": "row"
};
var _hoisted_9 = {
  "class": "col-md-4 border-right"
};
var _hoisted_10 = {
  "class": "d-flex align-items-center mb-3"
};
var _hoisted_11 = {
  "class": "mb-0 text-bold text-primary"
};
var _hoisted_12 = {
  "class": "text-muted"
};
var _hoisted_13 = {
  "class": "info-group"
};
var _hoisted_14 = {
  "class": "text-monospace"
};
var _hoisted_15 = {
  "class": "col-md-4 border-right"
};
var _hoisted_16 = {
  "class": "info-group"
};
var _hoisted_17 = {
  "class": "info-group"
};
var _hoisted_18 = {
  "class": "col-md-4"
};
var _hoisted_19 = {
  "class": "info-group"
};
var _hoisted_20 = {
  "class": "text-primary text-bold"
};
var _hoisted_21 = {
  "class": "container-fluid"
};
var _hoisted_22 = {
  "class": "card card-primary card-outline shadow-sm"
};
var _hoisted_23 = {
  "class": "card-body"
};
var _hoisted_24 = {
  "class": "row"
};
var _hoisted_25 = {
  "class": "col-md-8 form-group"
};
var _hoisted_26 = {
  "class": "col-md-8 form-group"
};
var _hoisted_27 = {
  "class": "col-md-12 form-group"
};
var _hoisted_28 = {
  "class": "card-footer bg-white text-right"
};
var _hoisted_29 = {
  "class": "card shadow-none bg-transparent elevation-0"
};
var _hoisted_30 = {
  "class": "timeline"
};
var _hoisted_31 = {
  "class": "timeline-item shadow-sm border-0 mb-4"
};
var _hoisted_32 = {
  "class": "time"
};
var _hoisted_33 = ["onClick"];
var _hoisted_34 = {
  "class": "timeline-header no-border"
};
var _hoisted_35 = {
  "class": "text-primary"
};
var _hoisted_36 = {
  "class": "timeline-body bg-white rounded"
};
var _hoisted_37 = {
  "class": "pertanyaan mb-3"
};
var _hoisted_38 = ["innerHTML"];
var _hoisted_39 = {
  "class": "d-flex justify-content-between align-items-start mb-2"
};
var _hoisted_40 = {
  key: 0,
  "class": "badge badge-secondary ml-1"
};
var _hoisted_41 = {
  "class": "text-right"
};
var _hoisted_42 = {
  "class": "text-muted mr-2"
};
var _hoisted_43 = ["onClick"];
var _hoisted_44 = ["innerHTML"];
var _hoisted_45 = {
  key: 0,
  "class": "text-center mb-2"
};
var _hoisted_46 = ["onClick"];
var _hoisted_47 = ["onUpdate:modelValue"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Select = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Select");
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Button = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Button");
  var _component_ConfirmDialog = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ConfirmDialog");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title text-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-notes-medical mr-2 text-primary"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Informasi Ringkas Pasien ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.CARABAYAR), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "avatar-circle mr-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-user-circle fa-3x text-secondary"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.DATA_SINGKAT), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_12, "No. MR: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.NOMR), 1 /* TEXT */)])]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-fingerprint"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" NO. SEP")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.NOSEP || '-'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-calendar-day"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tanggal Lahir")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.TGLLAHIR), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-clock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Registrasi Masuk")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.MASUKPOLY), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-user-md"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" DPJP / Dokter Pemeriksa")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data_pasien.NAMADOKTER), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "info-group"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-hospital-user"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Status Penjamin")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": "badge badge-success-soft"
  }, "Aktif")])], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title text-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-paper-plane mr-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Kirim Konsultasi Baru")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "text-bold d-block"
  }, "Kepada YTH : ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Select, {
    modelValue: $data.form_konsul.dokter_tujuan,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.form_konsul.dokter_tujuan = $event;
    }),
    options: $data.list_dokter,
    optionLabel: "NAMADOKTER",
    placeholder: "-- Pilih Dokter Spesialis --",
    filter: true,
    filterPlaceholder: "Cari dokter...",
    "class": "w-100 custom-prime-dropdown"
  }, null, 8 /* PROPS */, ["modelValue", "options"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "text-bold d-block"
  }, "Diagnosa ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
    modelValue: $data.form_konsul.diagnosa,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form_konsul.diagnosa = $event;
    }),
    "class": "w-100",
    placeholder: ""
  }, null, 8 /* PROPS */, ["modelValue"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "class": "text-bold"
  }, "Isi Konsultasi / Pertanyaan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "class": "form-control",
    rows: "3",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form_konsul.pesan = $event;
    }),
    placeholder: "Tuliskan alasan konsul dan temuan klinis..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form_konsul.pesan]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
    "class": "btn btn-primary",
    icon: "fas fa-paper-plane",
    label: "Kirim Konsul",
    loading: $data.loading_post,
    onClick: $options.kirimKonsul
  }, null, 8 /* PROPS */, ["loading", "onClick"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header pl-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "card-title text-bold text-secondary"
  }, "History Konsultasi")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chat_history, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(item.jawaban ? 'fas fa-check bg-success' : 'fas fa-question bg-warning')
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": "fas fa-clock mr-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tanggal_konsul) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.hapusKonsulInduk(item.id);
      },
      "class": "btn btn-xs btn-link text-danger ml-2",
      title: "Hapus Konsultasi"
    }, _toConsumableArray(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      "class": "fas fa-times"
    }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_33)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_34, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Mengirim konsul ke ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.nama_dokter_tujuan), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "badge badge-light mb-1"
    }, "Pertanyaan:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      innerHTML: $options.convert_chart(item.keluhan)
    }, null, 8 /* PROPS */, _hoisted_38)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"jawaban-container p-3 rounded mt-1 mb-2\" \n                                v-for=\"(jawaban, idx_j) in (item.show_all ? item.details : item.details.slice(0, 5))\" \n                                :key=\"idx_j\"\n                                style=\"background: #e7f3ff; border-left: 4px solid #007bff;\">\n\n                                <div class=\"d-flex justify-content-between align-items-start mb-2\">\n                                    <div>\n                                        <strong class=\"text-primary\">\n                                            <i class=\"fas fa-user-md mr-1\"></i> {{ jawaban.nama_dokter }}\n                                        </strong>\n                                    </div>\n                                    <div class=\"text-right\">\n                                        <small class=\"text-muted mr-2\">{{ jawaban.created_at }}</small>\n                                        <button @click=\"hapusBalasan(jawaban.id)\" class=\"btn btn-xs btn-outline-danger border-0\" style=\"padding: 0 5px;\">\n                                            <i class=\"fas fa-times\"></i>\n                                        </button>\n                                    </div>\n                                </div>\n                                <p class=\"mb-0\"> {{ jawaban.balasan }} </p>\n                            </div> "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.show_all ? item.details : item.details.slice(0, 5), function (jawaban, idx_j) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        "class": "jawaban-container p-3 rounded mt-1 mb-2",
        key: idx_j,
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([jawaban.nama_dokter === 'dr.Teuku Ronasky.Sp.B' ? {
          background: '#f4f6f9',
          borderLeft: '4px solid #adb5bd'
        } : {
          background: '#e7f3ff',
          borderLeft: '4px solid #007bff'
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(jawaban.kode_dokter === $data.data_pasien.KDDOKTER ? 'text-secondary' : 'text-primary')
      }, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-user-md mr-1"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(jawaban.nama_dokter) + " ", 1 /* TEXT */), jawaban.kode_dokter === $data.data_pasien.KDDOKTER ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_40, "Saya")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(jawaban.created_at), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: function onClick($event) {
          return $options.confirmHapusBalasan(jawaban.detail_id);
        },
        "class": "btn btn-xs btn-outline-danger border-0",
        style: {
          "padding": "0 5px"
        }
      }, _toConsumableArray(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-times"
      }, null, -1 /* CACHED */)])), 8 /* PROPS */, _hoisted_43)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mb-0", {
          'text-muted': jawaban.kode_dokter === $data.data_pasien.KDDOKTER
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        innerHTML: $options.convert_chart(jawaban.balasan)
      }, null, 8 /* PROPS */, _hoisted_44)], 2 /* CLASS */)], 4 /* STYLE */);
    }), 128 /* KEYED_FRAGMENT */)), item.details && item.details.length > 5 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn btn-xs btn-link text-primary",
      onClick: function onClick($event) {
        return item.show_all = !item.show_all;
      }
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.show_all ? 'Tampilkan lebih sedikit' : 'Lihat ' + (item.details.length - 5) + ' balasan lainnya...'), 9 /* TEXT, PROPS */, _hoisted_46)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
      "class": "form-control mb-2 mt-1",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return item.temp_balasan = $event;
      },
      placeholder: "Tulis jawaban konsul di sini..."
    }, null, 8 /* PROPS */, _hoisted_47), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, item.temp_balasan]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Button, {
      "class": "btn btn-sm",
      icon: "fas fa-reply",
      loading: item.loading_balasan,
      label: "Balas Konsul",
      onClick: function onClick($event) {
        return $options.balasKonsul(item);
      }
    }, null, 8 /* PROPS */, ["loading", "onClick"])])])]);
  }), 128 /* KEYED_FRAGMENT */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-clock bg-gray"
  })], -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ConfirmDialog)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true ***!
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
  "class": "row",
  style: {
    "height": "calc(100vh - 140px)"
  }
};
var _hoisted_4 = {
  "class": "col-md-4 col-lg-3 p-0",
  style: {
    "border-right": "1px solid #dee2e6",
    "background": "#fff",
    "display": "flex",
    "flex-direction": "column",
    "height": "100%"
  }
};
var _hoisted_5 = {
  "class": "p-3",
  style: {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "border-bottom": "1px solid #dee2e6"
  }
};
var _hoisted_6 = {
  "class": "badge badge-danger badge-pill",
  style: {
    "font-size": "12px"
  }
};
var _hoisted_7 = {
  "class": "p-2",
  style: {
    "border-bottom": "1px solid #f0f0f0"
  }
};
var _hoisted_8 = {
  "class": "nav nav-tabs nav-justified",
  style: {
    "flex-shrink": "0"
  }
};
var _hoisted_9 = {
  "class": "nav-item"
};
var _hoisted_10 = {
  "class": "nav-item"
};
var _hoisted_11 = {
  style: {
    "overflow-y": "auto",
    "flex": "1"
  }
};
var _hoisted_12 = {
  key: 0,
  "class": "text-center text-muted p-4"
};
var _hoisted_13 = ["onClick"];
var _hoisted_14 = {
  "class": "flex-grow-1 overflow-hidden"
};
var _hoisted_15 = {
  "class": "d-flex justify-content-between align-items-center"
};
var _hoisted_16 = {
  "class": "text-muted ml-1 flex-shrink-0",
  style: {
    "font-size": "12px"
  }
};
var _hoisted_17 = {
  "class": "d-flex align-items-center mt-1"
};
var _hoisted_18 = {
  "class": "text-truncate text-muted",
  style: {
    "font-size": "12px",
    "flex": "1"
  }
};
var _hoisted_19 = {
  key: 0,
  style: {
    "width": "9px",
    "height": "9px",
    "background": "#007bff",
    "border-radius": "50%",
    "flex-shrink": "0",
    "margin-top": "6px",
    "margin-left": "6px"
  }
};
var _hoisted_20 = {
  "class": "col-md-8 col-lg-9 p-0 d-flex flex-column",
  style: {
    "height": "100%",
    "background": "#fff"
  }
};
var _hoisted_21 = {
  key: 0,
  "class": "flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted"
};
var _hoisted_22 = {
  "class": "p-3 d-flex align-items-center justify-content-between",
  style: {
    "border-bottom": "1px solid #dee2e6",
    "background": "#fdfdfd"
  }
};
var _hoisted_23 = {
  "class": "d-flex align-items-center"
};
var _hoisted_24 = {
  style: {
    "font-size": "16px"
  }
};
var _hoisted_25 = {
  style: {
    "font-size": "13px",
    "color": "#6c757d",
    "margin-top": "3px"
  }
};
var _hoisted_26 = {
  style: {
    "font-size": "13px"
  }
};
var _hoisted_27 = {
  style: {
    "font-size": "13px"
  }
};
var _hoisted_28 = {
  key: 0,
  "class": "badge badge-danger",
  style: {
    "font-size": "12px"
  }
};
var _hoisted_29 = {
  "class": "d-flex"
};
var _hoisted_30 = {
  "class": "mx-3 mt-3 p-3 rounded",
  style: {
    "background": "#f8f9fa",
    "border": "1px solid #dee2e6",
    "flex-shrink": "0"
  }
};
var _hoisted_31 = {
  "class": "row"
};
var _hoisted_32 = {
  "class": "col-6 col-md-3 mb-2"
};
var _hoisted_33 = {
  style: {
    "font-size": "14px",
    "font-weight": "600",
    "color": "#212529"
  }
};
var _hoisted_34 = {
  "class": "col-6 col-md-3 mb-2"
};
var _hoisted_35 = {
  style: {
    "font-size": "14px",
    "font-weight": "600",
    "color": "#212529"
  }
};
var _hoisted_36 = {
  "class": "col-6 col-md-3 mb-2"
};
var _hoisted_37 = {
  style: {
    "font-size": "14px",
    "font-weight": "600",
    "color": "#212529"
  }
};
var _hoisted_38 = {
  "class": "col-6 col-md-3 mb-2"
};
var _hoisted_39 = {
  style: {
    "font-size": "14px",
    "font-weight": "600",
    "color": "#212529"
  }
};
var _hoisted_40 = {
  ref: "threadContainer",
  "class": "flex-grow-1 overflow-auto p-3",
  style: {
    "background": "#f1f3f5"
  }
};
var _hoisted_41 = {
  style: {
    "font-size": "14px"
  }
};
var _hoisted_42 = {
  "class": "text-muted mx-2",
  style: {
    "font-size": "12px"
  }
};
var _hoisted_43 = ["innerHTML"];
var _hoisted_44 = {
  key: 0,
  "class": "fas fa-check-double",
  style: {
    "font-size": "14px",
    "color": "#1a73e8"
  },
  title: "Sudah dibaca"
};
var _hoisted_45 = {
  key: 1,
  "class": "fas fa-check",
  style: {
    "font-size": "14px",
    "color": "#adb5bd"
  },
  title: "Terkirim, belum dibaca"
};
var _hoisted_46 = {
  "class": "p-3",
  style: {
    "border-top": "1px solid #dee2e6",
    "background": "#fff",
    "flex-shrink": "0"
  }
};
var _hoisted_47 = {
  "class": "modal-dialog-konsul"
};
var _hoisted_48 = {
  "class": "modal-konsul-header"
};
var _hoisted_49 = {
  "class": "d-flex align-items-center"
};
var _hoisted_50 = {
  style: {
    "font-size": "14px",
    "font-weight": "600",
    "color": "#212529"
  }
};
var _hoisted_51 = {
  style: {
    "font-size": "12px",
    "color": "#6c757d",
    "margin-top": "2px"
  }
};
var _hoisted_52 = {
  style: {
    "color": "#343a40"
  }
};
var _hoisted_53 = {
  style: {
    "color": "#343a40"
  }
};
var _hoisted_54 = {
  "class": "modal-konsul-preview"
};
var _hoisted_55 = {
  "class": "preview-body"
};
var _hoisted_56 = {
  "class": "modal-konsul-body"
};
var _hoisted_57 = {
  "class": "row mb-3"
};
var _hoisted_58 = {
  "class": "col-6"
};
var _hoisted_59 = {
  "class": "col-6"
};
var _hoisted_60 = {
  "class": "mb-2"
};
var _hoisted_61 = {
  "class": "d-flex justify-content-between align-items-center mt-1"
};
var _hoisted_62 = {
  "class": "d-flex flex-wrap",
  style: {
    "gap": "5px"
  }
};
var _hoisted_63 = {
  "class": "text-muted",
  style: {
    "font-size": "11px",
    "white-space": "nowrap",
    "margin-left": "8px"
  }
};
var _hoisted_64 = {
  "class": "d-flex align-items-center mt-2"
};
var _hoisted_65 = {
  "class": "custom-control custom-checkbox"
};
var _hoisted_66 = {
  "class": "modal-konsul-footer"
};
var _hoisted_67 = ["disabled"];
var _hoisted_68 = {
  key: 0
};
var _hoisted_69 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("loading");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_loading, {
    active: $data.isLoading,
    "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
      return $data.isLoading = $event;
    }),
    "is-full-page": $data.fullPage
  }, null, 8 /* PROPS */, ["active", "is-full-page"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== SIDEBAR LIST ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    "class": "mb-0",
    style: {
      "font-size": "15px"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-inbox mr-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Kotak Masuk Konsul")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.unreadCount) + " Baru", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.searchQuery = $event;
    }),
    type: "text",
    "class": "form-control",
    style: {
      "font-size": "14px"
    },
    placeholder: "🔍 Cari konsultasi..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link", {
      active: $data.activeTab === 'masuk'
    }]),
    style: {
      "font-size": "14px"
    },
    href: "#",
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $data.activeTab = 'masuk';
    }, ["prevent"]))
  }, _toConsumableArray(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-inbox mr-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Masuk ", -1 /* CACHED */)])), 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link", {
      active: $data.activeTab === 'selesai'
    }]),
    style: {
      "font-size": "14px"
    },
    href: "#",
    onClick: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
      return $data.activeTab = 'selesai';
    }, ["prevent"]))
  }, _toConsumableArray(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-check-circle mr-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Selesai ", -1 /* CACHED */)])), 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" List Konsul "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [$options.filteredKonsul.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, _toConsumableArray(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-inbox fa-2x mb-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    style: {
      "font-size": "14px"
    }
  }, "Tidak ada konsultasi", -1 /* CACHED */)])))) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredKonsul, function (item) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.id_konsul,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex align-items-start p-3", {
        'bg-warning-light': item.is_read === '0' && $data.activeTab === 'masuk',
        'sidebar-item-active': $data.selectedKonsul && $data.selectedKonsul.id_konsul === item.id_konsul
      }]),
      style: {
        "border-bottom": "1px solid #f0f0f0",
        "cursor": "pointer",
        "transition": "background 0.15s"
      },
      onClick: function onClick($event) {
        return $options.selectKonsul(item);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Avatar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "mr-2 d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: item.avatarColor,
        width: '42px',
        height: '42px',
        fontSize: '14px',
        fontWeight: '700'
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.initials), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Konten "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "class": "text-truncate",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontWeight: item.is_read === '0' ? '700' : '500',
        fontSize: '14px'
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.dokterPengirim), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.waktu), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "text-truncate mt-1",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([{
        "font-size": "13px",
        "color": "#343a40"
      }, {
        fontWeight: item.is_read === '0' ? '600' : '400'
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.isUrgent ? '⚡ URGENT: ' : '') + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.subject), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.preview), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dot unread "), item.is_read === '0' && $data.activeTab === 'masuk' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_13);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== PANEL DETAIL ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !$data.selectedKonsul ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, _toConsumableArray(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-envelope-open fa-4x mb-3",
    style: {
      "opacity": "0.3"
    }
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    style: {
      "font-size": "15px"
    }
  }, "Pilih konsultasi untuk dibaca", -1 /* CACHED */)])))) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header detail "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "mr-3 d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      background: $data.selectedKonsul.avatarColor,
      width: '46px',
      height: '46px',
      fontSize: '15px',
      fontWeight: '700'
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.initials), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.subject), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge", $data.selectedKonsul.spesialisBadgeClass]),
    style: {
      "font-size": "12px"
    }
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.spesialis), 3 /* TEXT, CLASS */), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.dokterPengirim), 1 /* TEXT */), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-arrow-right mx-1",
    style: {
      "font-size": "11px"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.namaDokterTujuan), 1 /* TEXT */), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge", $options.statusBadgeClass($data.selectedKonsul.status)]),
    style: {
      "font-size": "12px"
    }
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.status), 3 /* TEXT, CLASS */), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("   ", -1 /* CACHED */)), $data.selectedKonsul.isUrgent ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_28, " ⚡ Urgent ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-success btn-sm mr-2",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.markAsSelesai($data.selectedKonsul);
    }),
    style: {
      "font-size": "13px"
    }
  }, _toConsumableArray(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-check mr-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Selesai ", -1 /* CACHED */)]))), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-outline-secondary btn-sm",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $options.teruskanKonsul($data.selectedKonsul);
    }),
    style: {
      "font-size": "13px"
    }
  }, _toConsumableArray(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-share mr-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Teruskan ", -1 /* CACHED */)])))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Info Pasien "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "font-size": "11px",
      "color": "#adb5bd",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.4px"
    }
  }, "Nama Pasien", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.pasien.nama) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-sm btn-outline-info mt-1 mr-2 ml-2",
    style: {
      "font-size": "11px",
      "padding": "2px 6px"
    },
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.print_soap($data.selectedKonsul.pasien.noregister);
    })
  }, _toConsumableArray(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-info-circle mr-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tampilkan CPPT", -1 /* CACHED */)])))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "font-size": "11px",
      "color": "#adb5bd",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.4px"
    }
  }, "No. RM", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.pasien.noRm), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "font-size": "11px",
      "color": "#adb5bd",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.4px"
    }
  }, "No. Register", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.pasien.noregister), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "font-size": "11px",
      "color": "#adb5bd",
      "font-weight": "700",
      "text-transform": "uppercase",
      "letter-spacing": "0.4px"
    }
  }, "Diagnosa", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul.pasien.diagnosa), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Thread pesan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.selectedKonsul.messages, function (msg, i) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: i,
      "class": "mb-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Nama + waktu "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex align-items-center mb-1", msg.isMe ? 'flex-row-reverse' : 'flex-row'])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0", msg.isMe ? 'ml-2' : 'mr-2']),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: msg.isMe ? '#007bff' : $data.selectedKonsul.avatarColor,
        width: '32px',
        height: '32px',
        fontSize: '13px',
        fontWeight: '700'
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(msg.initials), 7 /* TEXT, CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(msg.sender), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(msg.time), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Baris: centang + bubble "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex align-items-center", msg.isMe ? 'flex-row-reverse' : 'flex-row'])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bubble pesan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "p-3",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([{
        "font-size": "14px",
        "line-height": "1.7",
        "text-align": "left",
        "max-width": "80%"
      }, {
        background: msg.isMe ? '#dbeafe' : '#ffffff',
        border: msg.isMe ? '1px solid #bfdbfe' : '1px solid #e9ecef',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderRadius: msg.isMe ? '12px 12px 4px 12px' : '12px 12px 12px 4px'
      }]),
      innerHTML: msg.body.replace(/\n/g, '<br>')
    }, null, 12 /* STYLE, PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Centang di samping bubble "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["d-flex align-items-center justify-content-center flex-shrink-0", msg.isMe ? 'mr-2' : 'ml-2']),
      style: {
        "width": "24px",
        "height": "24px"
      }
    }, [msg.isMe ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [msg.is_read_penerima === '1' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_44)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_45))], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)], 2 /* CLASS */)]);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Reply Trigger Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-primary btn-block",
    onClick: _cache[7] || (_cache[7] = function ($event) {
      return $options.openReplyModal();
    }),
    style: {
      "font-size": "14px",
      "padding": "10px"
    }
  }, _toConsumableArray(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "fas fa-reply mr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tulis Balasan Konsul ", -1 /* CACHED */)])))])], 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ===== MODAL BALAS KONSUL ===== "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "modal-fade"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.showReplyModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "modal-overlay",
        onClick: _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return $options.closeReplyModal();
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "modal-avatar mr-3",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          background: $data.selectedKonsul ? $data.selectedKonsul.avatarColor : '#6f42c1'
        })
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul ? $data.selectedKonsul.initials : '??'), 5 /* TEXT, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul ? $data.selectedKonsul.dokterPengirim : ''), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pasien: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul ? $data.selectedKonsul.pasien.nama : ''), 1 /* TEXT */), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("  ·  No. RM: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul ? $data.selectedKonsul.pasien.noRm : ''), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn-close-modal",
        onClick: _cache[8] || (_cache[8] = function ($event) {
          return $options.closeReplyModal();
        })
      }, _toConsumableArray(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-times"
      }, null, -1 /* CACHED */)])))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Preview Keluhan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        "class": "preview-label"
      }, "Isi konsultasi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedKonsul && $data.selectedKonsul.messages[0] ? $data.selectedKonsul.messages[0].body : '-'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal Body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Status & Prioritas "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "modal-label"
      }, "Status balasan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
          return $data.replyStatus = $event;
        }),
        "class": "form-control form-control-sm",
        style: {
          "font-size": "13px"
        }
      }, _toConsumableArray(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "dibalas"
      }, "Dibalas", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "perlu_tindak"
      }, "Perlu tindak lanjut", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "selesai"
      }, "Langsung selesai", -1 /* CACHED */)])), 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.replyStatus]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "modal-label"
      }, "Prioritas", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
          return $data.replyPrioritas = $event;
        }),
        "class": "form-control form-control-sm",
        style: {
          "font-size": "13px"
        }
      }, _toConsumableArray(_cache[42] || (_cache[42] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "normal"
      }, "Normal", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "urgent"
      }, "Urgent", -1 /* CACHED */)])), 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.replyPrioritas]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Textarea Balasan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "modal-label"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Balasan konsultasi "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        style: {
          "color": "#dc3545"
        }
      }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
        "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
          return $data.replyText = $event;
        }),
        "class": "form-control",
        rows: "5",
        placeholder: "Tulis jawaban konsultasi Anda di sini...",
        style: {
          "font-size": "13px",
          "resize": "vertical",
          "line-height": "1.7"
        }
      }, "                                ", 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.replyText]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Snippets "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn-snippet",
        onClick: _cache[12] || (_cache[12] = function ($event) {
          return $options.insertSnippet('Terima kasih atas konsultasinya. ');
        })
      }, " + Sapaan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn-snippet",
        onClick: _cache[13] || (_cache[13] = function ($event) {
          return $options.insertSnippet('Disarankan untuk melakukan pemeriksaan lanjutan berupa ');
        })
      }, " + Pemeriksaan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn-snippet",
        onClick: _cache[14] || (_cache[14] = function ($event) {
          return $options.insertSnippet('Kami setuju dengan diagnosis dan tatalaksana yang telah dilakukan. ');
        })
      }, " + Setuju ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.replyText.length) + " karakter ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tanda Tangan "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        type: "checkbox",
        "class": "custom-control-input",
        id: "chkTtdModal",
        "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
          return $data.replyWithTtd = $event;
        })
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.replyWithTtd]]), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "class": "custom-control-label",
        "for": "chkTtdModal",
        style: {
          "font-size": "13px",
          "color": "#6c757d",
          "cursor": "pointer"
        }
      }, " Sertakan tanda tangan digital otomatis ", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal Footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn btn-outline-secondary btn-sm mr-2",
        onClick: _cache[16] || (_cache[16] = function ($event) {
          return $options.closeReplyModal();
        }),
        style: {
          "font-size": "13px",
          "padding": "7px 18px"
        }
      }, " Batal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "class": "btn btn-primary btn-sm",
        disabled: !$data.replyText.trim() || $data.isSending,
        onClick: _cache[17] || (_cache[17] = function ($event) {
          return $options.sendReply();
        }),
        style: {
          "font-size": "13px",
          "padding": "7px 20px",
          "min-width": "130px"
        }
      }, [!$data.isSending ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_68, _toConsumableArray(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-paper-plane mr-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Kirim Balasan ", -1 /* CACHED */)])))) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_69, _toConsumableArray(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        "class": "fas fa-spinner fa-spin mr-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Mengirim... ", -1 /* CACHED */)]))))], 8 /* PROPS */, _hoisted_67)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.bg-warning-light[data-v-3868a2be] {\r\n    background-color: #fffbea !important;\n}\n.sidebar-item-active[data-v-3868a2be] {\r\n    background-color: #e8f4fd !important;\r\n    border-left: 3px solid #007bff !important;\n}\n.badge-purple[data-v-3868a2be] {\r\n    background-color: #6f42c1;\r\n    color: #fff;\n}\r\n\r\n/* ===== MODAL OVERLAY ===== */\n.modal-overlay[data-v-3868a2be] {\r\n    position: fixed;\r\n    top: 0; left: 0; right: 0; bottom: 0;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    z-index: 1050;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    padding: 1rem;\n}\r\n\r\n/* ===== MODAL DIALOG ===== */\n.modal-dialog-konsul[data-v-3868a2be] {\r\n    background: #ffffff;\r\n    border-radius: 12px;\r\n    border: 1px solid #dee2e6;\r\n    width: 100%;\r\n    max-width: 600px;\r\n    max-height: 90vh;\r\n    overflow-y: auto;\r\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);\r\n    display: flex;\r\n    flex-direction: column;\n}\r\n\r\n/* ===== MODAL HEADER ===== */\n.modal-konsul-header[data-v-3868a2be] {\r\n    padding: 1rem 1.25rem;\r\n    border-bottom: 1px solid #dee2e6;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    flex-shrink: 0;\n}\n.modal-avatar[data-v-3868a2be] {\r\n    width: 40px;\r\n    height: 40px;\r\n    border-radius: 50%;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 13px;\r\n    font-weight: 700;\r\n    color: #fff;\r\n    flex-shrink: 0;\n}\n.btn-close-modal[data-v-3868a2be] {\r\n    background: none;\r\n    border: none;\r\n    cursor: pointer;\r\n    color: #6c757d;\r\n    font-size: 16px;\r\n    padding: 4px 8px;\r\n    border-radius: 6px;\r\n    line-height: 1;\r\n    transition: background 0.15s, color 0.15s;\n}\n.btn-close-modal[data-v-3868a2be]:hover {\r\n    background: #f0f0f0;\r\n    color: #343a40;\n}\r\n\r\n/* ===== MODAL PREVIEW ===== */\n.modal-konsul-preview[data-v-3868a2be] {\r\n    padding: 0.875rem 1.25rem;\r\n    background: #f8f9fa;\r\n    border-bottom: 1px solid #dee2e6;\r\n    flex-shrink: 0;\n}\n.preview-label[data-v-3868a2be] {\r\n    font-size: 11px;\r\n    color: #adb5bd;\r\n    font-weight: 700;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.5px;\r\n    margin-bottom: 5px;\n}\n.preview-body[data-v-3868a2be] {\r\n    font-size: 13px;\r\n    color: #495057;\r\n    line-height: 1.7;\r\n    max-height: 80px;\r\n    overflow-y: auto;\n}\r\n\r\n/* ===== MODAL BODY ===== */\n.modal-konsul-body[data-v-3868a2be] {\r\n    padding: 1.25rem;\r\n    flex: 1;\n}\n.modal-label[data-v-3868a2be] {\r\n    font-size: 12px;\r\n    color: #6c757d;\r\n    font-weight: 600;\r\n    display: block;\r\n    margin-bottom: 4px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.3px;\n}\r\n\r\n/* ===== QUICK SNIPPET BUTTONS ===== */\n.btn-snippet[data-v-3868a2be] {\r\n    font-size: 11px;\r\n    padding: 3px 9px;\r\n    border-radius: 6px;\r\n    border: 1px solid #dee2e6;\r\n    background: #f8f9fa;\r\n    color: #6c757d;\r\n    cursor: pointer;\r\n    transition: background 0.15s, color 0.15s;\r\n    line-height: 1.5;\n}\n.btn-snippet[data-v-3868a2be]:hover {\r\n    background: #e9ecef;\r\n    color: #343a40;\n}\r\n\r\n/* ===== MODAL FOOTER ===== */\n.modal-konsul-footer[data-v-3868a2be] {\r\n    padding: 0.875rem 1.25rem;\r\n    border-top: 1px solid #dee2e6;\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    align-items: center;\r\n    flex-shrink: 0;\n}\r\n\r\n/* ===== TRANSITION ===== */\n.modal-fade-enter-active[data-v-3868a2be],\r\n.modal-fade-leave-active[data-v-3868a2be] {\r\n    transition: opacity 0.2s ease;\n}\n.modal-fade-enter-active .modal-dialog-konsul[data-v-3868a2be],\r\n.modal-fade-leave-active .modal-dialog-konsul[data-v-3868a2be] {\r\n    transition: transform 0.2s ease, opacity 0.2s ease;\n}\n.modal-fade-enter[data-v-3868a2be],\r\n.modal-fade-leave-to[data-v-3868a2be] {\r\n    opacity: 0;\n}\n.modal-fade-enter .modal-dialog-konsul[data-v-3868a2be],\r\n.modal-fade-leave-to .modal-dialog-konsul[data-v-3868a2be] {\r\n    transform: scale(0.96);\r\n    opacity: 0;\n}\r\n\r\n/* ===== DOUBLE CHECKMARK ===== */\n.single-check[data-v-3868a2be] {\r\n    font-size: 13px;\r\n    font-weight: 700;\r\n    color: #adb5bd;\r\n    letter-spacing: -2px;\n}\n.double-check[data-v-3868a2be] {\r\n    font-size: 13px;\r\n    font-weight: 700;\r\n    color: #adb5bd;\r\n    letter-spacing: -2px;\n}\n.double-check-blue[data-v-3868a2be] {\r\n    color: #1a73e8 !important;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_style_index_0_id_3868a2be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_style_index_0_id_3868a2be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_style_index_0_id_3868a2be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue":
/*!********************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _KonsultasiDokterComponent_vue_vue_type_template_id_787a7c79__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79 */ "./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79");
/* harmony import */ var _KonsultasiDokterComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KonsultasiDokterComponent.vue?vue&type=script&lang=js */ "./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_KonsultasiDokterComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_KonsultasiDokterComponent_vue_vue_type_template_id_787a7c79__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TerimaKonsulComponent_vue_vue_type_template_id_3868a2be_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true */ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true");
/* harmony import */ var _TerimaKonsulComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TerimaKonsulComponent.vue?vue&type=script&lang=js */ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _TerimaKonsulComponent_vue_vue_type_style_index_0_id_3868a2be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css */ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TerimaKonsulComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TerimaKonsulComponent_vue_vue_type_template_id_3868a2be_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3868a2be"],['__file',"resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KonsultasiDokterComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KonsultasiDokterComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./KonsultasiDokterComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TerimaKonsulComponent.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79 ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KonsultasiDokterComponent_vue_vue_type_template_id_787a7c79__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_KonsultasiDokterComponent_vue_vue_type_template_id_787a7c79__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/KonsultasiDokterComponent.vue?vue&type=template&id=787a7c79");


/***/ }),

/***/ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_template_id_3868a2be_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_template_id_3868a2be_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=template&id=3868a2be&scoped=true");


/***/ }),

/***/ "./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css":
/*!************************************************************************************************************************************!*\
  !*** ./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TerimaKonsulComponent_vue_vue_type_style_index_0_id_3868a2be_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/konsultasiDokter/TerimaKonsulComponent.vue?vue&type=style&index=0&id=3868a2be&scoped=true&lang=css");


/***/ })

}]);