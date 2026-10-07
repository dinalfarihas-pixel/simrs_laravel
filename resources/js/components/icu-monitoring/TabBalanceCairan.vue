<template>
    <div class="tab-balance-cairan">

        <!-- Summary Cards -->
        <div class="row g-2 mb-3">
            <div class="col-6 col-md-3">
                <div class="bc-card bc-card-blue">
                    <div class="bc-icon"><i class="pi pi-arrow-down-circle"></i></div>
                    <div><div class="bc-value">{{ totalIntake }} mL</div><div class="bc-label">Total Intake 24j</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="bc-card bc-card-orange">
                    <div class="bc-icon"><i class="pi pi-arrow-up-circle"></i></div>
                    <div><div class="bc-value">{{ totalOutput }} mL</div><div class="bc-label">Total Output 24j</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div :class="['bc-card', totalBalance >= 0 ? 'bc-card-green' : 'bc-card-red']">
                    <div class="bc-icon"><i class="pi pi-balance-scale"></i></div>
                    <div><div class="bc-value">{{ totalBalance >= 0 ? '+' : '' }}{{ totalBalance }} mL</div><div class="bc-label">Balance Kumulatif</div></div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="bc-card bc-card-purple">
                    <div class="bc-icon"><i class="pi pi-chart-bar"></i></div>
                    <div><div class="bc-value">{{ rataUO }} mL/j/kg</div><div class="bc-label">UO Rerata/jam/kg</div></div>
                </div>
            </div>
        </div>

        <!-- BB Awal -->
        <div class="d-flex align-items-center gap-3 mb-3">
            <label class="fw-semibold mb-0" style="min-width:120px">BB Pasien (kg)</label>
            <input
                type="number" class="form-control form-control-sm" style="width:100px"
                :value="cairan.bb_awal ?? ''"
                min="1" max="250" step="0.1"
                @change="e => cairan.bb_awal = e.target.value === '' ? null : parseFloat(e.target.value)"
                placeholder="kg"
            />
            <small class="text-muted">Digunakan untuk hitung UO/jam/kgBB</small>
        </div>

        <!-- Slider kontrol ukuran -->
        <div class="tbl-sizer">
            <div class="sizer-group">
                <i class="pi pi-arrows-v sizer-icon"></i>
                <span class="sizer-label">Tinggi</span>
                <input type="range" class="sizer-range" v-model.number="height" min="20" max="92" step="1" />
                <span class="sizer-val">{{ height }}vh</span>
            </div>
            <div class="sizer-divider"></div>
            <div class="sizer-group">
                <i class="pi pi-arrows-h sizer-icon"></i>
                <span class="sizer-label">Lebar Kolom</span>
                <input type="range" class="sizer-range" v-model.number="colWidth" min="40" max="112" step="2" />
                <span class="sizer-val">{{ colWidth }}px</span>
            </div>
            <div class="sizer-divider"></div>
            <button class="sizer-reset" @click="resetSize"><i class="pi pi-refresh"></i> Reset</button>
        </div>

        <!-- Flowsheet DataTable -->
        <div ref="tableRef" class="flowsheet-dt-wrap" :style="{ maxHeight: height + 'vh' }">
            <DataTable
                :value="tableRows"
                rowGroupMode="subheader"
                groupRowsBy="section"
                size="small"
                class="flowsheet-dt"
            >
                <template #groupheader="{ data }">
                    <span :class="['section-label', 'section-' + data.sectionKey]">{{ data.section }}</span>
                </template>

                <Column header="Parameter" style="min-width:160px; width:160px">
                    <template #body="{ data }">
                        <span :class="['param-name', data.isBold && 'fw-bold']">{{ data.label }}</span>
                    </template>
                </Column>

                <Column header="Satuan" style="min-width:52px; width:52px">
                    <template #body="{ data }">
                        <span class="param-unit">mL</span>
                    </template>
                </Column>

                <Column
                    v-for="(h, i) in hours" :key="h"
                    :header="h"
                    :headerClass="isCurrentHour(i) ? 'th-current' : ''"
                    :style="{ minWidth: colWidth + 'px', width: colWidth + 'px' }"
                >
                    <template #body="{ data }">
                        <div :class="['cell-fill', getCellClass(data, i), isCurrentHour(i) ? 'cell-current' : '']">
                            <!-- Computed rows -->
                            <span v-if="data.isComputed" class="cell-computed">
                                {{ displayVal(data, i) }}
                            </span>
                            <!-- Input rows -->
                            <input
                                v-else
                                type="number"
                                class="cell-input"
                                :value="cairan[data.key][i] ?? ''"
                                min="0" max="5000"
                                :data-row="data.navRow"
                                :data-col="i"
                                @change="e => setNum(data.key, i, e.target.value)"
                                @keydown="e => handleNav(e, data.navRow, i)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script setup>
import { inject } from 'vue'
import { ICU_MONITORING_KEY } from './composables/useFormPemantauanICU'
import { useFlowsheetNav }  from './composables/useFlowsheetNav'
import { useFlowsheetSize } from './composables/useFlowsheetSize'

const state = inject(ICU_MONITORING_KEY)
const {
    hours, cairan,
    intakePerJam, outputPerJam, balancePerJam, balanceKumulatif,
    totalIntake, totalOutput, totalBalance, rataUO,
    setCellNum,
} = state

const { tableRef, handleNav } = useFlowsheetNav()
const { height, colWidth, reset: resetSize } = useFlowsheetSize('icu_bc', { height: 60, colWidth: 76 })

const currentHour  = new Date().getHours()
const isCurrentHour = (i) => i === currentHour

const tableRows = [
    { section: 'INTAKE', sectionKey: 'intake', key: 'iv_kristaloid',    label: 'IV Kristaloid',     isBold: false, navRow: 0 },
    { section: 'INTAKE', sectionKey: 'intake', key: 'iv_koloid',        label: 'IV Koloid',         isBold: false, navRow: 1 },
    { section: 'INTAKE', sectionKey: 'intake', key: 'oral',             label: 'Oral',              isBold: false, navRow: 2 },
    { section: 'INTAKE', sectionKey: 'intake', key: 'ngt_intake',       label: 'NGT (Intake)',      isBold: false, navRow: 3 },
    { section: 'INTAKE', sectionKey: 'intake', key: '__total_intake__', label: 'Total Intake/Jam',  isBold: true,  isComputed: true },
    { section: 'OUTPUT', sectionKey: 'output', key: 'urine',            label: 'Urine',             isBold: false, navRow: 4 },
    { section: 'OUTPUT', sectionKey: 'output', key: 'drain',            label: 'Drain',             isBold: false, navRow: 5 },
    { section: 'OUTPUT', sectionKey: 'output', key: 'muntah',           label: 'Muntah/Emesis',     isBold: false, navRow: 6 },
    { section: 'OUTPUT', sectionKey: 'output', key: 'ngt_output',       label: 'NGT Aspirat',       isBold: false, navRow: 7 },
    { section: 'OUTPUT', sectionKey: 'output', key: 'perdarahan',       label: 'Perdarahan',        isBold: false, navRow: 8 },
    { section: 'OUTPUT', sectionKey: 'output', key: '__total_output__', label: 'Total Output/Jam',  isBold: true,  isComputed: true },
    { section: 'BALANCE', sectionKey: 'balance', key: '__balance_jam__',       label: 'Balance/Jam',      isBold: true, isComputed: true },
    { section: 'BALANCE', sectionKey: 'balance', key: '__balance_kumulatif__', label: 'Balance Kumulatif', isBold: true, isComputed: true },
]

function displayVal(data, i) {
    switch (data.key) {
        case '__total_intake__':
            return intakePerJam.value[i] || ''
        case '__total_output__':
            return outputPerJam.value[i] || ''
        case '__balance_jam__': {
            const v = balancePerJam.value[i]
            if (!intakePerJam.value[i] && !outputPerJam.value[i]) return ''
            return (v >= 0 ? '+' : '') + v
        }
        case '__balance_kumulatif__': {
            const v = balanceKumulatif.value[i]
            if (!intakePerJam.value[i] && !outputPerJam.value[i]) return ''
            return (v >= 0 ? '+' : '') + v
        }
    }
    return ''
}

function getCellClass(data, i) {
    if (data.key === '__balance_jam__' || data.key === '__balance_kumulatif__') {
        const v = data.key === '__balance_jam__' ? balancePerJam.value[i] : balanceKumulatif.value[i]
        if (v > 0) return 'cell-balance-pos'
        if (v < 0) return 'cell-balance-neg'
        return 'cell-computed-row'
    }
    if (data.isComputed) return 'cell-computed-row'
    return ''
}

function setNum(key, i, raw) {
    setCellNum(cairan, key, i, raw)
}
</script>

<style scoped>
/* ── Summary Cards ──────────────────────────────────────────── */
.bc-card { display: flex; align-items: center; gap: 12px; border-radius: 8px; padding: 12px 16px; border-left: 4px solid transparent; }
.bc-icon  { font-size: 1.6rem; opacity: .75; }
.bc-value { font-size: 1.2rem; font-weight: 700; line-height: 1.1; }
.bc-label { font-size: .78rem; color: #6c757d; margin-top: 2px; }
.bc-card-blue   { background: #e0f2fe; border-color: #0ea5e9; color: #075985; }
.bc-card-orange { background: #ffedd5; border-color: #f97316; color: #9a3412; }
.bc-card-green  { background: #d1fae5; border-color: #22c55e; color: #15803d; }
.bc-card-red    { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
.bc-card-purple { background: #f3e8ff; border-color: #a855f7; color: #6b21a8; }

/* ── Flowsheet wrapper ──────────────────────────────────────── */
.flowsheet-dt-wrap {
    overflow: auto;
    border: 1px solid #ced4da;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
}

:deep(.flowsheet-dt table) {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    font-size: 1rem;
    width: max-content;
    min-width: 100%;
}
:deep(.flowsheet-dt .p-datatable-table-container) { overflow: visible !important; }

:deep(.flowsheet-dt thead > tr > th) {
    position: sticky; top: 0; z-index: 20;
    background: #1e293b; color: #f8fafc;
    text-align: center; font-weight: 600; font-size: .94rem;
    padding: 9px 4px;
    border-right: 1px solid #374151; border-bottom: 1px solid #374151;
    letter-spacing: .02em; white-space: nowrap;
}
:deep(.flowsheet-dt thead > tr > th:nth-child(1)) { left: 0; z-index: 30; text-align: left; padding-left: 12px; }
:deep(.flowsheet-dt thead > tr > th:nth-child(2)) { left: 160px; z-index: 30; }
:deep(.flowsheet-dt thead > tr > th.th-current)   { background: #2563eb !important; }

:deep(.flowsheet-dt tbody > tr > td) {
    padding: 0;
    border-right: 1px solid #dee2e6; border-bottom: 1px solid #dee2e6;
    white-space: nowrap; vertical-align: middle;
}
:deep(.flowsheet-dt tbody > tr:not(.p-rowgroup-header) > td:nth-child(1)) {
    position: sticky; left: 0; z-index: 10;
    background: #f8f9fa; border-right: 2px solid #ced4da !important;
}
:deep(.flowsheet-dt tbody > tr:not(.p-rowgroup-header) > td:nth-child(2)) {
    position: sticky; left: 160px; z-index: 10;
    background: #f8f9fa; border-right: 2px solid #ced4da !important;
}

/* ── Section header colors ──────────────────────────────────── */
:deep(.flowsheet-dt .p-rowgroup-header > td) {
    color: #fff; font-weight: 700; font-size: .88rem;
    text-transform: uppercase; letter-spacing: .06em;
    padding: 6px 12px; border-bottom: 1px solid rgba(255,255,255,.2);
}
:deep(.flowsheet-dt .p-rowgroup-header:has(.section-intake) > td)  { background: #0369a1; }
:deep(.flowsheet-dt .p-rowgroup-header:has(.section-output) > td)  { background: #92400e; }
:deep(.flowsheet-dt .p-rowgroup-header:has(.section-balance) > td) { background: #334155; }
:deep(.flowsheet-dt .p-rowgroup-header:hover > td) { filter: brightness(.95); }

/* ── Frozen-column labels ───────────────────────────────────── */
.param-name {
    display: block; font-weight: 600; font-size: 1rem;
    padding: 8px 10px 8px 12px; color: #1e293b; white-space: nowrap;
}
.param-unit {
    display: block; text-align: center; font-size: .9rem;
    color: #64748b; padding: 8px 4px;
}

/* ── Cell fill ──────────────────────────────────────────────── */
.cell-fill {
    display: flex; align-items: center; justify-content: center;
    min-height: 40px; padding: 2px 3px;
}
.cell-current     { background: rgba(37,99,235,.07); }
.cell-computed-row { background: #f1f5f9 !important; }
.cell-balance-pos { background: #dcfce7 !important; color: #15803d; font-weight: 700; }
.cell-balance-neg { background: #fee2e2 !important; color: #991b1b; font-weight: 700; }

/* ── Input ──────────────────────────────────────────────────── */
.cell-input {
    width: calc(100% - 8px); height: 40px;
    border: 1px solid transparent; border-radius: 4px;
    background: transparent; text-align: center;
    font-size: 1rem; font-weight: 500; color: #1e293b;
    padding: 0 4px; outline: none;
    transition: border-color .15s, background .15s;
    display: block; margin: 0 auto;
}
.cell-input:hover { border-color: #93c5fd; background: #f0f7ff; }
.cell-input:focus { border-color: #3b82f6; background: #eff6ff; box-shadow: 0 0 0 2px rgba(59,130,246,.15); }
.cell-input::-webkit-outer-spin-button,
.cell-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.cell-input[type=number] { -moz-appearance: textfield; }

/* ── Computed cell ──────────────────────────────────────────── */
.cell-computed {
    display: block; text-align: center;
    font-size: 1rem; font-weight: 700; color: #334155;
    line-height: 40px;
}

/* ── Slider kontrol ─────────────────────────────────────────── */
.tbl-sizer { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; margin-bottom: 8px; flex-wrap: wrap; gap: 6px 0; }
.sizer-group { display: flex; align-items: center; gap: 8px; padding: 0 12px; }
.sizer-icon  { font-size: .85rem; color: #64748b; }
.sizer-label { font-size: .75rem; font-weight: 600; color: #475569; white-space: nowrap; }
.sizer-val   { font-size: .75rem; color: #3b82f6; font-weight: 700; min-width: 38px; text-align: right; }
.sizer-divider { width: 1px; height: 24px; background: #e2e8f0; margin: 0 4px; }
.sizer-range { -webkit-appearance: none; appearance: none; width: 130px; height: 4px; border-radius: 4px; background: #cbd5e1; outline: none; cursor: pointer; }
.sizer-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.sizer-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; cursor: pointer; border: none; }
.sizer-reset { display: flex; align-items: center; gap: 4px; padding: 3px 10px; font-size: .75rem; font-weight: 600; color: #64748b; background: transparent; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; margin-left: auto; transition: all .15s; }
.sizer-reset:hover { background: #f1f5f9; color: #334155; border-color: #94a3b8; }
</style>
