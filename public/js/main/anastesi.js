"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["anastesi"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var primevue_inputtext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! primevue/inputtext */ "./node_modules/primevue/inputtext/index.mjs");
/* harmony import */ var primevue_inputnumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/inputnumber */ "./node_modules/primevue/inputnumber/index.mjs");
/* harmony import */ var primevue_inputmask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/inputmask */ "./node_modules/primevue/inputmask/index.mjs");
/* harmony import */ var primevue_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/dropdown */ "./node_modules/primevue/dropdown/index.mjs");
/* harmony import */ var primevue_textarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primevue/textarea */ "./node_modules/primevue/textarea/index.mjs");
/* harmony import */ var primevue_radiobutton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primevue/radiobutton */ "./node_modules/primevue/radiobutton/index.mjs");
/* harmony import */ var primevue_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/checkbox */ "./node_modules/primevue/checkbox/index.mjs");
/* harmony import */ var primevue_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/button */ "./node_modules/primevue/button/index.mjs");
/* harmony import */ var primevue_panel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primevue/panel */ "./node_modules/primevue/panel/index.mjs");
/* harmony import */ var primevue_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primevue/toast */ "./node_modules/primevue/toast/index.mjs");
/* harmony import */ var primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primevue/confirmdialog */ "./node_modules/primevue/confirmdialog/index.mjs");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AnesthesiaForm',
  components: {
    InputText: primevue_inputtext__WEBPACK_IMPORTED_MODULE_0__["default"],
    InputNumber: primevue_inputnumber__WEBPACK_IMPORTED_MODULE_1__["default"],
    InputMask: primevue_inputmask__WEBPACK_IMPORTED_MODULE_2__["default"],
    Dropdown: primevue_dropdown__WEBPACK_IMPORTED_MODULE_3__["default"],
    Textarea: primevue_textarea__WEBPACK_IMPORTED_MODULE_4__["default"],
    RadioButton: primevue_radiobutton__WEBPACK_IMPORTED_MODULE_5__["default"],
    Checkbox: primevue_checkbox__WEBPACK_IMPORTED_MODULE_6__["default"],
    Button: primevue_button__WEBPACK_IMPORTED_MODULE_7__["default"],
    Panel: primevue_panel__WEBPACK_IMPORTED_MODULE_8__["default"],
    Toast: primevue_toast__WEBPACK_IMPORTED_MODULE_9__["default"],
    ConfirmDialog: primevue_confirmdialog__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  data: function data() {
    return {
      submitted: false,
      loading: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      form: {
        nama: '',
        jenisKelamin: '',
        noReg: '',
        umur: null,
        beratBadan: null,
        tinggiBadan: null,
        ruangan: '',
        diagnosisPraOperasi: '',
        rencanaOperasi: '',
        tekananDarah: '',
        nadi: null,
        suhu: null,
        respirasi: null,
        spo2: null,
        skalaNyeri: null,
        riwayatAnestesi: '',
        riwayatAlergi: '',
        obatDikonsumsi: '',
        evaluasi: {
          jantung: '',
          paru: '',
          diabetes: '',
          hipertensi: ''
        },
        pemeriksaan: {
          bronkitis: false,
          dispneu: false,
          orthopneu: false,
          pneumonia: false,
          angina: false,
          pacemaker: false,
          disritmia: false
        },
        lab: {
          hb: null,
          hct: null,
          leukosit: null,
          trombosit: null,
          gds: null,
          ureum: null,
          creatinin: null,
          sgot: null
        },
        asaClassification: null,
        keterangan: ''
      }
    };
  },
  methods: {
    getNyeriLabel: function getNyeriLabel(scale) {
      var labels = {
        0: 'Tidak Nyeri',
        1: 'Nyeri Ringan',
        2: 'Nyeri Ringan',
        3: 'Nyeri Sedang',
        4: 'Nyeri Sedang',
        5: 'Nyeri Sedang',
        6: 'Nyeri Berat',
        7: 'Nyeri Berat',
        8: 'Nyeri Sangat Berat',
        9: 'Nyeri Sangat Berat',
        10: 'Nyeri Tak Tertahankan'
      };
      return labels[scale] || '';
    },
    showToastMessage: function showToastMessage(message) {
      var _this = this;
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(function () {
        _this.showToast = false;
      }, 3000);
    },
    submitForm: function submitForm() {
      var _this2 = this;
      this.submitted = true;

      // Validate required fields
      if (!this.form.nama || !this.form.jenisKelamin || !this.form.noReg) {
        this.showToastMessage('Mohon lengkapi data pasien yang wajib diisi', 'error');
        return;
      }
      this.loading = true;

      // Simulate form submission
      setTimeout(function () {
        console.log('Form submitted:', _this2.form);
        _this2.showToastMessage('Form anestesi berhasil disimpan', 'success');
        _this2.loading = false;
        _this2.submitted = false;

        // Here you would typically send the data to your backend
        // fetch('/api/anesthesia-forms', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(this.form)
        // })
        // .then(response => response.json())
        // .then(data => {
        //   this.showToastMessage('Form berhasil disimpan', 'success');
        // })
        // .catch(error => {
        //   this.showToastMessage('Terjadi kesalahan saat menyimpan form', 'error');
        // });
      }, 1000);
    },
    resetForm: function resetForm() {
      if (confirm('Apakah Anda yakin ingin mereset form? Semua data akan hilang.')) {
        this.form = {
          nama: '',
          jenisKelamin: '',
          noReg: '',
          umur: null,
          beratBadan: null,
          tinggiBadan: null,
          ruangan: '',
          diagnosisPraOperasi: '',
          rencanaOperasi: '',
          tekananDarah: '',
          nadi: null,
          suhu: null,
          respirasi: null,
          spo2: null,
          skalaNyeri: null,
          riwayatAnestesi: '',
          riwayatAlergi: '',
          obatDikonsumsi: '',
          evaluasi: {
            jantung: '',
            paru: '',
            diabetes: '',
            hipertensi: ''
          },
          pemeriksaan: {
            bronkitis: false,
            dispneu: false,
            orthopneu: false,
            pneumonia: false,
            angina: false,
            pacemaker: false,
            disritmia: false
          },
          lab: {
            hb: null,
            hct: null,
            leukosit: null,
            trombosit: null,
            gds: null,
            ureum: null,
            creatinin: null,
            sgot: null
          },
          asaClassification: null,
          keterangan: ''
        };
        this.submitted = false;
        this.showToastMessage('Form berhasil direset', 'info');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "container"
};
var _hoisted_3 = {
  "class": "main-card"
};
var _hoisted_4 = {
  "class": "card-body"
};
var _hoisted_5 = {
  "class": "panel-body"
};
var _hoisted_6 = {
  "class": "form-grid"
};
var _hoisted_7 = {
  "class": "form-col-4"
};
var _hoisted_8 = {
  "class": "form-field"
};
var _hoisted_9 = {
  key: 0,
  "class": "error-text"
};
var _hoisted_10 = {
  "class": "form-col-4"
};
var _hoisted_11 = {
  "class": "form-field"
};
var _hoisted_12 = {
  key: 0,
  "class": "error-text"
};
var _hoisted_13 = {
  "class": "form-col-4"
};
var _hoisted_14 = {
  "class": "form-field"
};
var _hoisted_15 = {
  key: 0,
  "class": "error-text"
};
var _hoisted_16 = {
  "class": "form-grid"
};
var _hoisted_17 = {
  "class": "form-col-3"
};
var _hoisted_18 = {
  "class": "form-field"
};
var _hoisted_19 = {
  "class": "form-col-3"
};
var _hoisted_20 = {
  "class": "form-field"
};
var _hoisted_21 = {
  "class": "form-col-3"
};
var _hoisted_22 = {
  "class": "form-field"
};
var _hoisted_23 = {
  "class": "form-col-3"
};
var _hoisted_24 = {
  "class": "form-field"
};
var _hoisted_25 = {
  "class": "form-grid"
};
var _hoisted_26 = {
  "class": "form-col-6"
};
var _hoisted_27 = {
  "class": "form-field"
};
var _hoisted_28 = {
  "class": "form-col-6"
};
var _hoisted_29 = {
  "class": "form-field"
};
var _hoisted_30 = {
  "class": "form-panel"
};
var _hoisted_31 = {
  "class": "panel-body"
};
var _hoisted_32 = {
  "class": "form-grid"
};
var _hoisted_33 = {
  "class": "form-col-2"
};
var _hoisted_34 = {
  "class": "form-field"
};
var _hoisted_35 = {
  "class": "form-col-2"
};
var _hoisted_36 = {
  "class": "form-field"
};
var _hoisted_37 = {
  "class": "form-col-2"
};
var _hoisted_38 = {
  "class": "form-field"
};
var _hoisted_39 = {
  "class": "form-col-2"
};
var _hoisted_40 = {
  "class": "form-field"
};
var _hoisted_41 = {
  "class": "form-col-2"
};
var _hoisted_42 = {
  "class": "form-field"
};
var _hoisted_43 = {
  "class": "form-col-2"
};
var _hoisted_44 = {
  "class": "form-field"
};
var _hoisted_45 = ["value"];
var _hoisted_46 = {
  "class": "form-panel"
};
var _hoisted_47 = {
  "class": "panel-body"
};
var _hoisted_48 = {
  "class": "form-grid"
};
var _hoisted_49 = {
  "class": "form-col-6"
};
var _hoisted_50 = {
  "class": "form-field"
};
var _hoisted_51 = {
  "class": "radio-group"
};
var _hoisted_52 = {
  "class": "radio-item"
};
var _hoisted_53 = {
  "class": "radio-item"
};
var _hoisted_54 = {
  "class": "form-field"
};
var _hoisted_55 = {
  "class": "radio-group"
};
var _hoisted_56 = {
  "class": "radio-item"
};
var _hoisted_57 = {
  "class": "radio-item"
};
var _hoisted_58 = {
  "class": "form-field"
};
var _hoisted_59 = {
  "class": "form-col-6"
};
var _hoisted_60 = {
  "class": "form-grid"
};
var _hoisted_61 = {
  "class": "form-col-6"
};
var _hoisted_62 = {
  "class": "form-field"
};
var _hoisted_63 = {
  "class": "radio-group"
};
var _hoisted_64 = {
  "class": "radio-item"
};
var _hoisted_65 = {
  "class": "radio-item"
};
var _hoisted_66 = {
  "class": "form-col-6"
};
var _hoisted_67 = {
  "class": "form-field"
};
var _hoisted_68 = {
  "class": "radio-group"
};
var _hoisted_69 = {
  "class": "radio-item"
};
var _hoisted_70 = {
  "class": "radio-item"
};
var _hoisted_71 = {
  "class": "form-field"
};
var _hoisted_72 = {
  "class": "radio-group"
};
var _hoisted_73 = {
  "class": "radio-item"
};
var _hoisted_74 = {
  "class": "radio-item"
};
var _hoisted_75 = {
  "class": "form-field"
};
var _hoisted_76 = {
  "class": "radio-group"
};
var _hoisted_77 = {
  "class": "radio-item"
};
var _hoisted_78 = {
  "class": "radio-item"
};
var _hoisted_79 = {
  "class": "form-panel"
};
var _hoisted_80 = {
  "class": "panel-body"
};
var _hoisted_81 = {
  "class": "form-grid"
};
var _hoisted_82 = {
  "class": "form-col-6"
};
var _hoisted_83 = {
  "class": "checkbox-group"
};
var _hoisted_84 = {
  "class": "checkbox-item"
};
var _hoisted_85 = {
  "class": "checkbox-item"
};
var _hoisted_86 = {
  "class": "checkbox-item"
};
var _hoisted_87 = {
  "class": "checkbox-item"
};
var _hoisted_88 = {
  "class": "form-col-6"
};
var _hoisted_89 = {
  "class": "checkbox-group"
};
var _hoisted_90 = {
  "class": "checkbox-item"
};
var _hoisted_91 = {
  "class": "checkbox-item"
};
var _hoisted_92 = {
  "class": "checkbox-item"
};
var _hoisted_93 = {
  "class": "form-panel"
};
var _hoisted_94 = {
  "class": "panel-body"
};
var _hoisted_95 = {
  "class": "form-grid"
};
var _hoisted_96 = {
  "class": "form-col-3"
};
var _hoisted_97 = {
  "class": "form-field"
};
var _hoisted_98 = {
  "class": "form-col-3"
};
var _hoisted_99 = {
  "class": "form-field"
};
var _hoisted_100 = {
  "class": "form-col-3"
};
var _hoisted_101 = {
  "class": "form-field"
};
var _hoisted_102 = {
  "class": "form-col-3"
};
var _hoisted_103 = {
  "class": "form-field"
};
var _hoisted_104 = {
  "class": "form-grid"
};
var _hoisted_105 = {
  "class": "form-col-3"
};
var _hoisted_106 = {
  "class": "form-field"
};
var _hoisted_107 = {
  "class": "form-col-3"
};
var _hoisted_108 = {
  "class": "form-field"
};
var _hoisted_109 = {
  "class": "form-col-3"
};
var _hoisted_110 = {
  "class": "form-field"
};
var _hoisted_111 = {
  "class": "form-col-3"
};
var _hoisted_112 = {
  "class": "form-field"
};
var _hoisted_113 = {
  "class": "form-panel"
};
var _hoisted_114 = {
  "class": "panel-body"
};
var _hoisted_115 = {
  "class": "form-field"
};
var _hoisted_116 = {
  "class": "radio-group horizontal"
};
var _hoisted_117 = ["value"];
var _hoisted_118 = {
  "class": "form-field"
};
var _hoisted_119 = {
  "class": "form-actions"
};
var _hoisted_120 = ["disabled"];
var _hoisted_121 = {
  key: 0,
  "class": "spinner"
};
var _hoisted_122 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_InputText = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("InputText");
  var _component_Panel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Panel");
  var _component_Textarea = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Textarea");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Form Anestesi - Rekam Medis Anestesi Sedasi")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {
      return $options.submitForm && $options.submitForm.apply($options, arguments);
    }, ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Patient Information "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Panel, {
    header: "Informasi Pasien",
    "class": "form-panel"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "nama"
      }, "Nama *", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_InputText, {
        id: "nama",
        modelValue: $data.form.nama,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          return $data.form.nama = $event;
        }),
        style: {
          "width": "15em"
        },
        placeholder: "Nama pasien",
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
          'input-invalid': $data.submitted && !$data.form.nama
        })
      }, null, 8 /* PROPS */, ["modelValue", "class"]), $data.submitted && !$data.form.nama ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_9, "Nama wajib diisi")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "jenisKelamin"
      }, "Jenis Kelamin *", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        id: "jenisKelamin",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return $data.form.jenisKelamin = $event;
        }),
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-select", {
          'input-invalid': $data.submitted && !$data.form.jenisKelamin
        }])
      }, _toConsumableArray(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: ""
      }, "Pilih jenis kelamin", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "L"
      }, "Laki-laki", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "P"
      }, "Perempuan", -1 /* CACHED */)])), 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.jenisKelamin]]), $data.submitted && !$data.form.jenisKelamin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_12, "Jenis kelamin wajib dipilih")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "noReg"
      }, "No. Reg/RM *", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "noReg",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
          return $data.form.noReg = $event;
        }),
        type: "text",
        placeholder: "No. Registrasi",
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-input", {
          'input-invalid': $data.submitted && !$data.form.noReg
        }])
      }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.noReg]]), $data.submitted && !$data.form.noReg ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_15, "No. Registrasi wajib diisi")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "umur"
      }, "Umur", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "umur",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return $data.form.umur = $event;
        }),
        type: "number",
        placeholder: "Umur",
        "class": "form-input",
        min: "0",
        max: "150"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.umur]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "beratBadan"
      }, "BB (Kg)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "beratBadan",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
          return $data.form.beratBadan = $event;
        }),
        type: "number",
        placeholder: "Berat badan",
        "class": "form-input",
        step: "0.1"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.beratBadan]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "tinggiBadan"
      }, "TB (Cm)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "tinggiBadan",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return $data.form.tinggiBadan = $event;
        }),
        type: "number",
        placeholder: "Tinggi badan",
        "class": "form-input",
        step: "0.1"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.tinggiBadan]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "ruangan"
      }, "Ruangan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        id: "ruangan",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
          return $data.form.ruangan = $event;
        }),
        type: "text",
        placeholder: "Ruangan",
        "class": "form-input"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ruangan]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "diagnosisPraOperasi"
      }, "Diagnosis Pra Operasi / Tindakan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
        id: "diagnosisPraOperasi",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
          return $data.form.diagnosisPraOperasi = $event;
        }),
        placeholder: "Diagnosis pra operasi",
        rows: "3",
        "class": "form-textarea"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.diagnosisPraOperasi]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        "for": "rencanaOperasi"
      }, "Rencana Operasi / Tindakan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
        id: "rencanaOperasi",
        "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
          return $data.form.rencanaOperasi = $event;
        }),
        placeholder: "Rencana operasi",
        rows: "3",
        "class": "form-textarea"
      }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.rencanaOperasi]])])])])])];
    }),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Vital Signs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "panel-header"
  }, "Tanda-tanda Vital", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "tekananDarah"
  }, "TD (mmHg)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "tekananDarah",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
      return $data.form.tekananDarah = $event;
    }),
    type: "text",
    placeholder: "120/80",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.tekananDarah]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "nadi"
  }, "Nadi (/menit)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "nadi",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
      return $data.form.nadi = $event;
    }),
    type: "number",
    placeholder: "80",
    "class": "form-input",
    min: "0",
    max: "300"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.nadi]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "suhu"
  }, "Suhu (°C)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "suhu",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return $data.form.suhu = $event;
    }),
    type: "number",
    placeholder: "36.5",
    "class": "form-input",
    step: "0.1",
    min: "30",
    max: "45"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.suhu]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "respirasi"
  }, "RR (/menit)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "respirasi",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
      return $data.form.respirasi = $event;
    }),
    type: "number",
    placeholder: "20",
    "class": "form-input",
    min: "0",
    max: "60"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.respirasi]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "spo2"
  }, "SpO2 (%)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "spo2",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
      return $data.form.spo2 = $event;
    }),
    type: "number",
    placeholder: "98",
    "class": "form-input",
    min: "0",
    max: "100"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.spo2]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "skalaNyeri"
  }, "Skala Nyeri", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "skalaNyeri",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
      return $data.form.skalaNyeri = $event;
    }),
    "class": "form-select"
  }, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "Pilih skala", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(11, function (n) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      key: n - 1,
      value: n - 1
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(n - 1) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getNyeriLabel(n - 1)), 9 /* TEXT, PROPS */, _hoisted_45);
  }), 64 /* STABLE_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.skalaNyeri]])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Assessment "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "panel-header"
  }, "Assessment Prasedasi / Anestesi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Anamnesis", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Riwayat Anestesi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
      return $data.form.riwayatAnestesi = $event;
    }),
    value: "ada"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.riwayatAnestesi]]), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ada", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) {
      return $data.form.riwayatAnestesi = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.riwayatAnestesi]]), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Riwayat Alergi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
      return $data.form.riwayatAlergi = $event;
    }),
    value: "ada"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.riwayatAlergi]]), _cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ada", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) {
      return $data.form.riwayatAlergi = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.riwayatAlergi]]), _cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "obatDikonsumsi"
  }, "Obat-obatan yang sedang dikonsumsi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Textarea, {
    id: "obatDikonsumsi",
    modelValue: $data.form.obatDikonsumsi,
    "onUpdate:modelValue": _cache[19] || (_cache[19] = function ($event) {
      return $data.form.obatDikonsumsi = $event;
    }),
    placeholder: "Daftar obat yang sedang dikonsumsi",
    rows: "3",
    "class": "form-textarea"
  }, null, 8 /* PROPS */, ["modelValue"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Evaluasi Faktor Risiko", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Jantung", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = function ($event) {
      return $data.form.evaluasi.jantung = $event;
    }),
    value: "normal"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.jantung]]), _cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Normal", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) {
      return $data.form.evaluasi.jantung = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.jantung]]), _cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak Normal", -1 /* CACHED */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [_cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Paru", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) {
      return $data.form.evaluasi.paru = $event;
    }),
    value: "normal"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.paru]]), _cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Normal", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[23] || (_cache[23] = function ($event) {
      return $data.form.evaluasi.paru = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.paru]]), _cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak Normal", -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[81] || (_cache[81] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Diabetes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[24] || (_cache[24] = function ($event) {
      return $data.form.evaluasi.diabetes = $event;
    }),
    value: "ya"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.diabetes]]), _cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[25] || (_cache[25] = function ($event) {
      return $data.form.evaluasi.diabetes = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.diabetes]]), _cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [_cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Hipertensi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[26] || (_cache[26] = function ($event) {
      return $data.form.evaluasi.hipertensi = $event;
    }),
    value: "ya"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.hipertensi]]), _cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ya", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "radio",
    "onUpdate:modelValue": _cache[27] || (_cache[27] = function ($event) {
      return $data.form.evaluasi.hipertensi = $event;
    }),
    value: "tidak"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.evaluasi.hipertensi]]), _cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tidak", -1 /* CACHED */))])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Physical Examination "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [_cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "panel-header"
  }, "Pemeriksaan Fisik", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Sistem Pernapasan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[28] || (_cache[28] = function ($event) {
      return $data.form.pemeriksaan.bronkitis = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.bronkitis]]), _cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Bronkitis", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[29] || (_cache[29] = function ($event) {
      return $data.form.pemeriksaan.dispneu = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.dispneu]]), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Dispneu", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[30] || (_cache[30] = function ($event) {
      return $data.form.pemeriksaan.orthopneu = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.orthopneu]]), _cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Orthopneu", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) {
      return $data.form.pemeriksaan.pneumonia = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.pneumonia]]), _cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Pneumonia", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Sistem Kardiovaskular", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[32] || (_cache[32] = function ($event) {
      return $data.form.pemeriksaan.angina = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.angina]]), _cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Angina", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_91, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[33] || (_cache[33] = function ($event) {
      return $data.form.pemeriksaan.pacemaker = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.pacemaker]]), _cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Pacemaker", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[34] || (_cache[34] = function ($event) {
      return $data.form.pemeriksaan.disritmia = $event;
    })
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.form.pemeriksaan.disritmia]]), _cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Disritmia", -1 /* CACHED */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Laboratory Results "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [_cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "panel-header"
  }, "Hasil Laboratorium", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [_cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "hb"
  }, "Hb (g/dL)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "hb",
    "onUpdate:modelValue": _cache[35] || (_cache[35] = function ($event) {
      return $data.form.lab.hb = $event;
    }),
    type: "number",
    placeholder: "12.5",
    "class": "form-input",
    step: "0.1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.hb]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [_cache[98] || (_cache[98] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "hct"
  }, "Hct (%)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "hct",
    "onUpdate:modelValue": _cache[36] || (_cache[36] = function ($event) {
      return $data.form.lab.hct = $event;
    }),
    type: "number",
    placeholder: "37.5",
    "class": "form-input",
    step: "0.1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.hct]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [_cache[99] || (_cache[99] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "leukosit"
  }, "Leukosit", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "leukosit",
    "onUpdate:modelValue": _cache[37] || (_cache[37] = function ($event) {
      return $data.form.lab.leukosit = $event;
    }),
    type: "number",
    placeholder: "8000",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.leukosit]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "trombosit"
  }, "Trombosit", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "trombosit",
    "onUpdate:modelValue": _cache[38] || (_cache[38] = function ($event) {
      return $data.form.lab.trombosit = $event;
    }),
    type: "number",
    placeholder: "250000",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.trombosit]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_106, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "gds"
  }, "GDS (mg/dL)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "gds",
    "onUpdate:modelValue": _cache[39] || (_cache[39] = function ($event) {
      return $data.form.lab.gds = $event;
    }),
    type: "number",
    placeholder: "100",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.gds]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "ureum"
  }, "Ureum (mg/dL)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "ureum",
    "onUpdate:modelValue": _cache[40] || (_cache[40] = function ($event) {
      return $data.form.lab.ureum = $event;
    }),
    type: "number",
    placeholder: "30",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.ureum]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "creatinin"
  }, "Creatinin (mg/dL)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "creatinin",
    "onUpdate:modelValue": _cache[41] || (_cache[41] = function ($event) {
      return $data.form.lab.creatinin = $event;
    }),
    type: "number",
    placeholder: "1.0",
    "class": "form-input",
    step: "0.1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.creatinin]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_112, [_cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "sgot"
  }, "SGOT (U/L)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "sgot",
    "onUpdate:modelValue": _cache[42] || (_cache[42] = function ($event) {
      return $data.form.lab.sgot = $event;
    }),
    type: "number",
    placeholder: "25",
    "class": "form-input"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lab.sgot]])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ASA Classification "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [_cache[108] || (_cache[108] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "panel-header"
  }, "Kesimpulan Assessment Prasedasi / Anestesi", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_114, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [_cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, "Klasifikasi ASA", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(5, function (n) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      "class": "radio-item",
      key: n
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "radio",
      "onUpdate:modelValue": _cache[43] || (_cache[43] = function ($event) {
        return $data.form.asaClassification = $event;
      }),
      value: n
    }, null, 8 /* PROPS */, _hoisted_117), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.form.asaClassification]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "ASA " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(n), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [_cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "keterangan"
  }, "Keterangan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "keterangan",
    "onUpdate:modelValue": _cache[44] || (_cache[44] = function ($event) {
      return $data.form.keterangan = $event;
    }),
    placeholder: "Keterangan tambahan",
    rows: "3",
    "class": "form-textarea"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.keterangan]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Submit Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    "class": "btn btn-primary",
    disabled: $data.loading
  }, [$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_121)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.loading ? 'Menyimpan...' : 'Simpan Form'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_120), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    "class": "btn btn-secondary",
    onClick: _cache[45] || (_cache[45] = function () {
      return $options.resetForm && $options.resetForm.apply($options, arguments);
    }),
    disabled: $data.loading
  }, " Reset Form ", 8 /* PROPS */, _hoisted_122)])], 32 /* NEED_HYDRATION */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Toast Messages "), $data.showToast ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['toast', $data.toastType])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.toastMessage), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\r\n    /* Base Styles */\n.anesthesia-form[data-v-237ccce6] {\r\n        background-color: #f8fafc;\r\n        min-height: 100vh;\r\n        padding: 20px;\n}\n.form-container[data-v-237ccce6] {\r\n        max-width: 1200px;\r\n        margin: 0 auto;\n}\n.main-card[data-v-237ccce6] {\r\n        background: white;\r\n        border-radius: 12px;\r\n        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\r\n        overflow: hidden;\n}\n.card-header[data-v-237ccce6] {\r\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\r\n        color: white;\r\n        padding: 24px;\r\n        text-align: center;\n}\n.card-header h2[data-v-237ccce6] {\r\n        margin: 0;\r\n        font-size: 1.75rem;\r\n        font-weight: 600;\n}\n.card-body[data-v-237ccce6] {\r\n        padding: 24px;\n}\r\n\r\n    /* Form Panel Styles */\n.form-panel[data-v-237ccce6] {\r\n        background: #f8fafc;\r\n        border: 1px solid #e2e8f0;\r\n        border-radius: 8px;\r\n        margin-bottom: 24px;\r\n        overflow: hidden;\n}\n.panel-header[data-v-237ccce6] {\r\n        background: #e2e8f0;\r\n        color: #374151;\r\n        font-weight: 600;\r\n        font-size: 1.1rem;\r\n        padding: 16px 24px;\r\n        border-bottom: 1px solid #cbd5e0;\n}\n.panel-body[data-v-237ccce6] {\r\n        padding: 24px;\r\n        background: white;\n}\r\n\r\n    /* Grid System */\n.form-grid[data-v-237ccce6] {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n        gap: 20px;\r\n        margin-bottom: 20px;\n}\n.form-col-2[data-v-237ccce6] {\r\n        flex: 0 0 calc(16.666% - 16px);\n}\n.form-col-3[data-v-237ccce6] {\r\n        flex: 0 0 calc(25% - 15px);\n}\n.form-col-4[data-v-237ccce6] {\r\n        flex: 0 0 calc(33.333% - 14px);\n}\n.form-col-6[data-v-237ccce6] {\r\n        flex: 0 0 calc(50% - 10px);\n}\r\n\r\n    /* Form Elements */\n.form-field[data-v-237ccce6] {\r\n        margin-bottom: 20px;\n}\n.form-field label[data-v-237ccce6] {\r\n        display: block;\r\n        margin-bottom: 8px;\r\n        color: #374151;\n}\n.form-input[data-v-237ccce6],\r\n    .form-select[data-v-237ccce6],\r\n    .form-textarea[data-v-237ccce6] {\r\n        width: 100%;\r\n        padding: 12px;\r\n        border: 1px solid #d1d5db;\r\n        border-radius: 6px;\r\n        transition: all 0.2s ease;\r\n        background-color: white;\n}\n.form-input[data-v-237ccce6]:focus,\r\n    .form-select[data-v-237ccce6]:focus,\r\n    .form-textarea[data-v-237ccce6]:focus {\r\n        outline: none;\r\n        border-color: #667eea;\r\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-textarea[data-v-237ccce6] {\r\n        resize: vertical;\r\n        min-height: 80px;\n}\n.input-invalid[data-v-237ccce6] {\r\n        border-color: #ef4444;\r\n        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.error-text[data-v-237ccce6] {\r\n        color: #ef4444;\r\n        font-size: 0.75rem;\r\n        margin-top: 4px;\r\n        display: block;\n}\r\n\r\n    /* Radio and Checkbox Styles */\n.radio-group[data-v-237ccce6],\r\n    .checkbox-group[data-v-237ccce6] {\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 8px;\n}\n.radio-group.horizontal[data-v-237ccce6] {\r\n        flex-direction: row;\r\n        flex-wrap: wrap;\r\n        gap: 16px;\n}\n.radio-item[data-v-237ccce6],\r\n    .checkbox-item[data-v-237ccce6] {\r\n        display: flex;\r\n        align-items: center;\r\n        cursor: pointer;\r\n        font-size: 1rem;\n}\n.radio-item input[type=\"radio\"][data-v-237ccce6],\r\n    .checkbox-item input[type=\"checkbox\"][data-v-237ccce6] {\r\n        margin-right: 8px;\r\n        width: 16px;\r\n        height: 16px;\r\n        accent-color: #667eea;\n}\n.radio-item span[data-v-237ccce6],\r\n    .checkbox-item span[data-v-237ccce6] {\r\n        color: #374151;\n}\n.radio-item[data-v-237ccce6]:hover,\r\n    .checkbox-item[data-v-237ccce6]:hover {\r\n        color: #667eea;\n}\r\n\r\n    /* Section Headers */\nh5[data-v-237ccce6] {\r\n        color: #374151;\r\n        font-weight: 600;\r\n        margin-bottom: 16px;\r\n        font-size: 1.1rem;\r\n        border-bottom: 2px solid #e5e7eb;\r\n        padding-bottom: 8px;\n}\r\n\r\n    /* Buttons */\n.form-actions[data-v-237ccce6] {\r\n        display: flex;\r\n        gap: 12px;\r\n        justify-content: flex-start;\r\n        margin-top: 32px;\r\n        padding-top: 24px;\r\n        border-top: 1px solid #e5e7eb;\n}\n.btn[data-v-237ccce6] {\r\n        padding: 12px 24px;\r\n        border: none;\r\n        border-radius: 6px;\r\n        font-size: 0.875rem;\r\n        font-weight: 500;\r\n        cursor: pointer;\r\n        transition: all 0.2s ease;\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 8px;\n}\n.btn[data-v-237ccce6]:disabled {\r\n        opacity: 0.6;\r\n        cursor: not-allowed;\n}\n.btn-primary[data-v-237ccce6] {\r\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\r\n        color: white;\n}\n.btn-primary[data-v-237ccce6]:hover:not(:disabled) {\r\n        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);\r\n        transform: translateY(-1px);\r\n        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-secondary[data-v-237ccce6] {\r\n        background: #6b7280;\r\n        color: white;\n}\n.btn-secondary[data-v-237ccce6]:hover:not(:disabled) {\r\n        background: #4b5563;\r\n        transform: translateY(-1px);\n}\r\n\r\n    /* Loading Spinner */\n.spinner[data-v-237ccce6] {\r\n        width: 16px;\r\n        height: 16px;\r\n        border: 2px solid transparent;\r\n        border-top: 2px solid currentColor;\r\n        border-radius: 50%;\r\n        animation: spin-237ccce6 1s linear infinite;\n}\n@keyframes spin-237ccce6 {\nto {\r\n            transform: rotate(360deg);\n}\n}\r\n\r\n    /* Toast Messages */\n.toast[data-v-237ccce6] {\r\n        position: fixed;\r\n        top: 20px;\r\n        right: 20px;\r\n        padding: 16px 24px;\r\n        border-radius: 8px;\r\n        color: white;\r\n        font-weight: 500;\r\n        z-index: 1000;\r\n        animation: slideIn-237ccce6 0.3s ease;\r\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n}\n.toast.success[data-v-237ccce6] {\r\n        background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n}\n.toast.error[data-v-237ccce6] {\r\n        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n}\n.toast.info[data-v-237ccce6] {\r\n        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);\n}\n@keyframes slideIn-237ccce6 {\nfrom {\r\n            transform: translateX(100%);\r\n            opacity: 0;\n}\nto {\r\n            transform: translateX(0);\r\n            opacity: 1;\n}\n}\r\n\r\n    /* Responsive Design */\n@media (max-width: 768px) {\n.anesthesia-form[data-v-237ccce6] {\r\n            padding: 10px;\n}\n.card-header[data-v-237ccce6] {\r\n            padding: 16px;\n}\n.card-header h2[data-v-237ccce6] {\r\n            font-size: 1.5rem;\n}\n.card-body[data-v-237ccce6] {\r\n            padding: 16px;\n}\n.panel-body[data-v-237ccce6] {\r\n            padding: 16px;\n}\n.form-grid[data-v-237ccce6] {\r\n            gap: 16px;\n}\n.form-col-2[data-v-237ccce6],\r\n        .form-col-3[data-v-237ccce6],\r\n        .form-col-4[data-v-237ccce6],\r\n        .form-col-6[data-v-237ccce6] {\r\n            flex: 0 0 100%;\n}\n.radio-group.horizontal[data-v-237ccce6] {\r\n            flex-direction: column;\n}\n.form-actions[data-v-237ccce6] {\r\n            flex-direction: column;\n}\n.btn[data-v-237ccce6] {\r\n            width: 100%;\r\n            justify-content: center;\n}\n.toast[data-v-237ccce6] {\r\n            right: 10px;\r\n            left: 10px;\r\n            top: 10px;\n}\n}\n@media (max-width: 480px) {\n.card-header h2[data-v-237ccce6] {\r\n            font-size: 1.25rem;\n}\n.form-input[data-v-237ccce6],\r\n        .form-select[data-v-237ccce6],\r\n        .form-textarea[data-v-237ccce6] {\r\n            padding: 10px;\n}\n}\r\n\r\n    /* Print Styles */\n@media print {\n.anesthesia-form[data-v-237ccce6] {\r\n            background: white;\r\n            padding: 0;\n}\n.main-card[data-v-237ccce6] {\r\n            box-shadow: none;\r\n            border: 1px solid #000;\n}\n.card-header[data-v-237ccce6] {\r\n            background: white !important;\r\n            color: black !important;\r\n            border-bottom: 2px solid #000;\n}\n.form-actions[data-v-237ccce6],\r\n        .toast[data-v-237ccce6] {\r\n            display: none;\n}\n.form-panel[data-v-237ccce6] {\r\n            -moz-column-break-inside: avoid;\r\n                 break-inside: avoid;\r\n            page-break-inside: avoid;\n}\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_style_index_0_id_237ccce6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_style_index_0_id_237ccce6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_style_index_0_id_237ccce6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/anastesi/PersetujuanAnasstesiView.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PersetujuanAnasstesiView_vue_vue_type_template_id_237ccce6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true */ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true");
/* harmony import */ var _PersetujuanAnasstesiView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PersetujuanAnasstesiView.vue?vue&type=script&lang=js */ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js");
/* harmony import */ var _PersetujuanAnasstesiView_vue_vue_type_style_index_0_id_237ccce6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css */ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PersetujuanAnasstesiView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PersetujuanAnasstesiView_vue_vue_type_template_id_237ccce6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-237ccce6"],['__file',"resources/js/components/anastesi/PersetujuanAnasstesiView.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PersetujuanAnasstesiView.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_template_id_237ccce6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_template_id_237ccce6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=template&id=237ccce6&scoped=true");


/***/ }),

/***/ "./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PersetujuanAnasstesiView_vue_vue_type_style_index_0_id_237ccce6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/anastesi/PersetujuanAnasstesiView.vue?vue&type=style&index=0&id=237ccce6&scoped=true&lang=css");


/***/ })

}]);