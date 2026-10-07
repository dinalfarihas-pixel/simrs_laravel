<template>
    <div class="tab-vital-sign">

        <!-- Summary Cards -->
        <div class="row g-2 mb-3">
            <div v-for="card in summaryCards" :key="card.label" class="col-6 col-md-3">
                <div :class="['vs-card', card.cls]">
                    <div class="vs-card-icon"><i :class="card.icon"></i></div>
                    <div class="vs-card-body">
                        <div class="vs-card-value">{{ card.value }}</div>
                        <div class="vs-card-label">{{ card.label }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slider kontrol ukuran tabel -->
        <div class="tbl-sizer">
            <div class="sizer-group">
                <i class="pi pi-arrows-v sizer-icon"></i>
                <span class="sizer-label">Tinggi</span>
                <input type="range" class="sizer-range" v-model.number="height"
                    min="20" max="92" step="1" />
                <span class="sizer-val">{{ height }}vh</span>
            </div>
            <div class="sizer-divider"></div>
            <div class="sizer-group">
                <i class="pi pi-arrows-h sizer-icon"></i>
                <span class="sizer-label">Lebar Kolom</span>
                <input type="range" class="sizer-range" v-model.number="colWidth"
                    min="52" max="160" step="2" />
                <span class="sizer-val">{{ colWidth }}px</span>
            </div>
            <div class="sizer-divider"></div>
            <button class="sizer-reset" @click="resetSize" title="Reset ukuran">
                <i class="pi pi-refresh"></i> Reset
            </button>
        </div>

        <!-- Flowsheet -->
        <div class="flowsheet-wrapper" ref="tableRef" :style="{ maxHeight: height + 'vh' }">
            <table class="flowsheet-table" :style="{ '--col-w': colWidth + 'px' }">
                <thead>
                    <tr>
                        <th class="sticky-col th-param">Parameter</th>
                        <th class="sticky-col-2 th-unit">Satuan</th>
                        <th
                            v-for="(h, i) in hours" :key="h"
                            :class="['th-hour', isCurrentHour(i) ? 'th-current' : '']"
                        >{{ h }}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Section: Hemodinamik -->
                    <tr class="section-header">
                        <td class="sticky-col" colspan="2">HEMODINAMIK</td>
                        <td v-for="h in hours" :key="h"></td>
                    </tr>
                    <tr v-for="param in hemodynamicParams" :key="param.key">
                        <td class="sticky-col param-name"> {{ param.label }}</td>
                        <td class="sticky-col-2 param-unit">{{ param.unit }}</td>
                        <td
                            v-for="(_, i) in hours" :key="i"
                            :class="['cell-hour', cellClass(param, getVal(param.key, i)), isCurrentHour(i) ? 'cell-current' : '']"
                        >
                            <input
                                v-if="param.type !== 'computed'"
                                type="number"
                                class="cell-input"
                                :value="getVal(param.key, i) ?? ''"
                                :min="param.min"
                                :max="param.max"
                                :step="param.step || 1"
                                :data-row="navRow[param.key]"
                                :data-col="i"
                                @change="e => setNum(param.key, i, e.target.value)"
                                @keydown="e => handleNav(e, navRow[param.key], i)"
                            />
                            <span v-else class="cell-computed">
                                {{ getVal(param.key, i) ?? '' }}
                            </span>
                        </td>
                    </tr>

                    <!-- Section: GCS -->
                    <tr class="section-header">
                        <td class="sticky-col" colspan="2">GCS</td>
                        <td v-for="h in hours" :key="h"></td>
                    </tr>
                    <tr v-for="param in gcsParams" :key="param.key">
                        <td class="sticky-col param-name">{{ param.label }}</td>
                        <td class="sticky-col-2 param-unit">{{ param.unit }}</td>
                        <td
                            v-for="(_, i) in hours" :key="i"
                            :class="['cell-hour', cellClass(param, getVal(param.key, i)), isCurrentHour(i) ? 'cell-current' : '']"
                        >
                            <input
                                v-if="param.type !== 'computed'"
                                type="number"
                                class="cell-input"
                                :value="getVal(param.key, i) ?? ''"
                                :min="param.min"
                                :max="param.max"
                                :step="1"
                                :data-row="navRow[param.key]"
                                :data-col="i"
                                @change="e => setNum(param.key, i, e.target.value)"
                                @keydown="e => handleNav(e, navRow[param.key], i)"
                            />
                            <span v-else class="cell-computed" :class="gcsTotalClass(i)">
                                {{ gcsTotal[i] ?? '' }}
                            </span>
                        </td>
                    </tr>

                    <!-- Section: Lain-lain -->
                    <tr class="section-header">
                        <td class="sticky-col" colspan="2">LAIN-LAIN</td>
                        <td v-for="h in hours" :key="h"></td>
                    </tr>
                    <tr v-for="param in otherParams" :key="param.key">
                        <td class="sticky-col param-name">{{ param.label }}</td>
                        <td class="sticky-col-2 param-unit">{{ param.unit }}</td>
                        <td
                            v-for="(_, i) in hours" :key="i"
                            :class="['cell-hour', cellClass(param, getVal(param.key, i)), isCurrentHour(i) ? 'cell-current' : '']"
                        >
                            <input
                                type="number"
                                class="cell-input"
                                :value="getVal(param.key, i) ?? ''"
                                :min="param.min"
                                :max="param.max"
                                :step="param.step || 1"
                                :data-row="navRow[param.key]"
                                :data-col="i"
                                @change="e => setNum(param.key, i, e.target.value)"
                                @keydown="e => handleNav(e, navRow[param.key], i)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Legend -->
        <div class="d-flex gap-3 mt-3 flex-wrap align-items-center legend-row">
            <span class="text-muted me-1" style="font-size:.78rem">Keterangan warna:</span>
            <span class="legend-item legend-ok"><i class="pi pi-check-circle me-1"></i>Normal</span>
            <span class="legend-item legend-warning"><i class="pi pi-exclamation-circle me-1"></i>Perhatian</span>
            <span class="legend-item legend-danger"><i class="pi pi-times-circle me-1"></i>Kritis</span>
        </div>

    </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { ICU_MONITORING_KEY } from './composables/useFormPemantauanICU'
import { useFlowsheetNav }  from './composables/useFlowsheetNav'
import { useFlowsheetSize } from './composables/useFlowsheetSize'

const state = inject(ICU_MONITORING_KEY)
const { hours, vitalSign, gcsTotal, setCellNum } = state

const { tableRef, handleNav } = useFlowsheetNav()
const { height, colWidth, reset: resetSize } = useFlowsheetSize('icu_vs', { height: 62, colWidth: 76 })

const currentHour = new Date().getHours()
const isCurrentHour = (i) => i === currentHour

// Nomor baris navigasi (hanya input, baris computed dilewati)
const navRow = {
    td_sistol: 0, td_diastol: 1, map: 2, nadi: 3,
    gcs_e: 4, gcs_v: 5, gcs_m: 6,
    suhu: 7, spo2: 8, rr: 9,
}

// ── Parameter definitions ─────────────────────────────────────────────────
const hemodynamicParams = [
    { key: 'td_sistol',  label: 'TD Sistol',  unit: 'mmHg',  type: 'number', min: 0,   max: 300, normalMin: 90,  normalMax: 140, warnMin: 80,  warnMax: 160 },
    { key: 'td_diastol', label: 'TD Diastol', unit: 'mmHg',  type: 'number', min: 0,   max: 200, normalMin: 60,  normalMax: 90,  warnMin: 50,  warnMax: 100 },
    { key: 'map',        label: 'MAP',         unit: 'mmHg',  type: 'number', min: 0,   max: 200, normalMin: 70,  normalMax: 100, warnMin: 60,  warnMax: 110 },
    { key: 'nadi',       label: 'Nadi',        unit: 'x/mnt', type: 'number', min: 0,   max: 250, normalMin: 60,  normalMax: 100, warnMin: 50,  warnMax: 110 },
]

const gcsParams = [
    { key: 'gcs_e',   label: 'GCS E (Eye)',    unit: '1-4', type: 'number', min: 1, max: 4 },
    { key: 'gcs_v',   label: 'GCS V (Verbal)', unit: '1-5', type: 'number', min: 1, max: 5 },
    { key: 'gcs_m',   label: 'GCS M (Motor)',  unit: '1-6', type: 'number', min: 1, max: 6 },
    { key: 'gcs_total', label: 'GCS Total',    unit: '3-15', type: 'computed' },
]

const otherParams = [
    { key: 'suhu', label: 'Suhu',   unit: '°C',    type: 'number', min: 30, max: 43, step: 0.1, normalMin: 36.0, normalMax: 37.5, warnMin: 35.5, warnMax: 38.5 },
    { key: 'spo2', label: 'SpO₂',  unit: '%',     type: 'number', min: 50, max: 100, normalMin: 95, normalMax: 100, warnMin: 90, warnMax: 100 },
    { key: 'rr',   label: 'RR',    unit: 'x/mnt', type: 'number', min: 0,  max: 60,  normalMin: 12, normalMax: 20,  warnMin: 8,  warnMax: 30 },
]

function getVal(key, i) {
    if (key === 'gcs_total') return gcsTotal.value[i]
    return vitalSign[key][i]
}

function setNum(key, i, raw) {
    setCellNum(vitalSign, key, i, raw)
}

function cellClass(param, val) {
    if (val === null || val === undefined || val === '') return ''
    const n = parseFloat(val)
    if (isNaN(n)) return ''
    if (!param.normalMin && !param.normalMax) return ''

    if (n >= param.normalMin && n <= param.normalMax) return 'cell-ok'
    if (n >= param.warnMin   && n <= param.warnMax)   return 'cell-warning'
    return 'cell-danger'
}

function gcsTotalClass(i) {
    const v = gcsTotal.value[i]
    if (v === null) return ''
    if (v >= 13) return 'gcs-ok'
    if (v >= 9)  return 'gcs-warning'
    return 'gcs-danger'
}

// ── Summary Cards ────────────────────────────────────────────────────────
function lastFilled(key) {
    const arr = key === 'gcs_total' ? gcsTotal.value : vitalSign[key]
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== null) return arr[i]
    }
    return null
}

const summaryCards = computed(() => {
    const s = lastFilled('td_sistol')
    const d = lastFilled('td_diastol')
    const gcs = lastFilled('gcs_total')
    const spo2 = lastFilled('spo2')
    const nadi = lastFilled('nadi')

    return [
        {
            label: 'TD (Terakhir)',
            value: s !== null && d !== null ? `${s}/${d}` : '-',
            icon: 'pi pi-wave-pulse',
            cls: s !== null && (s < 90 || s > 140) ? 'vs-card-danger' : 'vs-card-primary',
        },
        {
            label: 'SpO₂ (Terakhir)',
            value: spo2 !== null ? `${spo2}%` : '-',
            icon: 'pi pi-circle-fill',
            cls: spo2 !== null && spo2 < 90 ? 'vs-card-danger' : spo2 !== null && spo2 < 95 ? 'vs-card-warning' : 'vs-card-success',
        },
        {
            label: 'GCS (Terakhir)',
            value: gcs !== null ? gcs : '-',
            icon: 'pi pi-brain',
            cls: gcs !== null && gcs <= 8 ? 'vs-card-danger' : gcs !== null && gcs <= 12 ? 'vs-card-warning' : 'vs-card-info',
        },
        {
            label: 'Nadi (Terakhir)',
            value: nadi !== null ? `${nadi} x/mnt` : '-',
            icon: 'pi pi-wave-pulse',
            cls: nadi !== null && (nadi < 60 || nadi > 100) ? 'vs-card-warning' : 'vs-card-success',
        },
    ]
})
</script>

<style scoped>
/* ── Summary Cards ──────────────────────────────────────────── */
.vs-card {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    padding: 12px 16px;
    border-left: 4px solid transparent;
}
.vs-card-icon { font-size: 1.6rem; opacity: .75; }
.vs-card-value { font-size: 1.25rem; font-weight: 700; line-height: 1.1; }
.vs-card-label { font-size: .78rem; color: #6c757d; margin-top: 2px; }
.vs-card-primary { background: #e7f0fd; border-color: #3b82f6; color: #1d4ed8; }
.vs-card-success { background: #d1fae5; border-color: #22c55e; color: #15803d; }
.vs-card-warning { background: #fef9c3; border-color: #eab308; color: #854d0e; }
.vs-card-danger  { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
.vs-card-info    { background: #e0f2fe; border-color: #0ea5e9; color: #075985; }

/* ── Flowsheet wrapper ──────────────────────────────────────── */
.flowsheet-wrapper {
    overflow: auto;
    max-height: 68vh;
    border: 1px solid #ced4da;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
}

/* ── Tabel utama ────────────────────────────────────────────── */
.flowsheet-table {
    border-collapse: separate;
    border-spacing: 0;
    font-size: .88rem;          /* lebih besar dari .72rem */
    width: max-content;
    min-width: 100%;
}

.flowsheet-table th,
.flowsheet-table td {
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    padding: 0;
    white-space: nowrap;
}

/* ── Header jam ─────────────────────────────────────────────── */
.flowsheet-table thead th {
    position: sticky;
    top: 0;
    background: #1e293b;
    color: #f8fafc;
    text-align: center;
    font-weight: 600;
    font-size: .82rem;
    padding: 8px 4px;
    z-index: 20;
    letter-spacing: .02em;
}

.th-param   { min-width: 160px; text-align: left !important; padding-left: 12px !important; }
.th-unit    { min-width: 62px;  text-align: center !important; }
.th-hour    { min-width: var(--col-w, 76px); }      /* ← dikontrol slider */
.th-current { background: #2563eb !important; }

/* ── Sticky kolom kiri ──────────────────────────────────────── */
.sticky-col {
    position: sticky;
    left: 0;
    background: #f8f9fa;
    z-index: 10;
    min-width: 160px;
    border-right: 2px solid #ced4da !important;
}
.sticky-col-2 {
    position: sticky;
    left: 160px;
    background: #f8f9fa;
    z-index: 10;
    min-width: 62px;
    text-align: center;
    color: #6c757d;
    font-size: .8rem;
    border-right: 2px solid #ced4da !important;
}
thead th.sticky-col,
thead th.sticky-col-2 { z-index: 30; }

/* ── Nama & satuan parameter ────────────────────────────────── */
.param-name {
    font-weight: 700;
    font-size: .88rem;
    padding: 7px 10px 7px 12px;
    color: #1e293b;
}
.param-unit {
    text-align: center;
    font-size: .78rem;
    color: #64748b;
    padding: 7px 4px;
}

/* ── Section header (HEMODINAMIK / GCS / dll) ───────────────── */
.section-header td {
    background: #334155;
    color: #e2e8f0;
    font-weight: 700;
    font-size: .76rem;
    text-transform: uppercase;
    letter-spacing: .06em;
    padding: 5px 12px;
}
.section-header td.sticky-col  { z-index: 11; background: #334155; color: #e2e8f0; }
.section-header td.sticky-col-2{ z-index: 11; background: #334155; color: #e2e8f0; }

/* ── Sel jam (data) ─────────────────────────────────────────── */
.cell-hour {
    text-align: center;
    padding: 3px 3px;
    vertical-align: middle;
}
.cell-current { background: rgba(37,99,235,.07); }

/* ── Input dalam sel ────────────────────────────────────────── */
.cell-input {
    width: 68px;                 /* ← lebar input */
    height: 34px;                /* ← tinggi input */
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
    text-align: center;
    font-size: .88rem;           /* ← font input */
    font-weight: 500;
    color: #1e293b;
    padding: 0 4px;
    outline: none;
    transition: border-color .15s, background .15s;
    display: block;
    margin: 0 auto;
}
.cell-input:hover  { border-color: #93c5fd; background: #f0f7ff; }
.cell-input:focus  { border-color: #3b82f6; background: #eff6ff; box-shadow: 0 0 0 2px rgba(59,130,246,.15); }

/* Hapus panah spinner bawaan browser */
.cell-input::-webkit-outer-spin-button,
.cell-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.cell-input[type=number] { -moz-appearance: textfield; }

/* ── Nilai computed (GCS Total) ─────────────────────────────── */
.cell-computed {
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: .95rem;
    line-height: 34px;
}

/* ── Warna status sel ───────────────────────────────────────── */
.cell-ok      { background: #dcfce7 !important; }
.cell-warning { background: #fef9c3 !important; }
.cell-danger  { background: #fee2e2 !important; }

.cell-ok .cell-input      { color: #15803d; }
.cell-warning .cell-input { color: #854d0e; }
.cell-danger .cell-input  { color: #991b1b; font-weight: 700; }

.gcs-ok      { color: #15803d; }
.gcs-warning { color: #854d0e; }
.gcs-danger  { color: #991b1b; font-weight: 800; }

/* ── Legend ─────────────────────────────────────────────────── */
.legend-row { font-size: .78rem; }
.legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 12px;
    border-radius: 20px;
    font-weight: 600;
}
.legend-ok      { background: #dcfce7; color: #15803d; }
.legend-warning { background: #fef9c3; color: #854d0e; }
.legend-danger  { background: #fee2e2; color: #991b1b; }

/* ── Slider kontrol ukuran tabel ────────────────────────────── */
.tbl-sizer {
    display: flex;
    align-items: center;
    gap: 0;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 6px 14px;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 6px 0;
}
.sizer-group {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
}
.sizer-icon  { font-size: .85rem; color: #64748b; }
.sizer-label { font-size: .75rem; font-weight: 600; color: #475569; white-space: nowrap; }
.sizer-val   { font-size: .75rem; color: #3b82f6; font-weight: 700; min-width: 38px; text-align: right; }
.sizer-divider {
    width: 1px;
    height: 24px;
    background: #e2e8f0;
    margin: 0 4px;
}
.sizer-range {
    -webkit-appearance: none;
    appearance: none;
    width: 130px;
    height: 4px;
    border-radius: 4px;
    background: #cbd5e1;
    outline: none;
    cursor: pointer;
}
.sizer-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: background .15s;
}
.sizer-range::-webkit-slider-thumb:hover { background: #2563eb; }
.sizer-range::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
}
.sizer-reset {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    font-size: .75rem;
    font-weight: 600;
    color: #64748b;
    background: transparent;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
    margin-left: auto;
    transition: all .15s;
}
.sizer-reset:hover { background: #f1f5f9; color: #334155; border-color: #94a3b8; }
</style>
