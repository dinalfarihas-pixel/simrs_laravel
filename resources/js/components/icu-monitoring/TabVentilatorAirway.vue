<template>
    <div class="tab-ventilator">

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
                    <span class="section-label">{{ data.section }}</span>
                </template>

                <Column header="Parameter" style="min-width:170px; width:170px">
                    <template #body="{ data }">
                        <span class="param-name">{{ data.label }}</span>
                    </template>
                </Column>

                <Column header="Satuan" style="min-width:68px; width:68px">
                    <template #body="{ data }">
                        <span class="param-unit">{{ data.unit }}</span>
                    </template>
                </Column>

                <Column
                    v-for="(h, i) in hours" :key="h"
                    :header="h"
                    :headerClass="isCurrentHour(i) ? 'th-current' : ''"
                    :style="{ minWidth: colWidth + 'px', width: colWidth + 'px' }"
                >
                    <template #body="{ data }">
                        <div :class="['cell-fill', isCurrentHour(i) ? 'cell-current' : '']">
                            <input
                                v-if="data.type === 'number'"
                                type="number"
                                class="cell-input"
                                :value="ventilator[data.key][i] ?? ''"
                                :min="data.min ?? 0"
                                :max="data.max ?? 9999"
                                :step="data.step || 1"
                                :data-row="data.navRow"
                                :data-col="i"
                                @change="e => setNum(data.key, i, e.target.value)"
                                @keydown="e => handleNav(e, data.navRow, i)"
                            />
                            <input
                                v-else
                                type="text"
                                class="cell-input cell-input-text"
                                :value="ventilator[data.key][i] ?? ''"
                                :data-row="data.navRow"
                                :data-col="i"
                                @change="e => setText(data.key, i, e.target.value)"
                                @keydown="e => handleNav(e, data.navRow, i)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <small class="text-muted mt-2 d-block">
            <i class="pi pi-info-circle me-1"></i>
            Isi nilai per kolom jam. Tekan Tab untuk pindah sel berikutnya.
        </small>

    </div>
</template>

<script setup>
import { inject } from 'vue'
import { ICU_MONITORING_KEY } from './composables/useFormPemantauanICU'
import { useFlowsheetNav }  from './composables/useFlowsheetNav'
import { useFlowsheetSize } from './composables/useFlowsheetSize'

const state = inject(ICU_MONITORING_KEY)
const { hours, ventilator, setCellNum, setCellText } = state

const { tableRef, handleNav } = useFlowsheetNav()
const { height, colWidth, reset: resetSize } = useFlowsheetSize('icu_vent', { height: 68, colWidth: 76 })

const currentHour  = new Date().getHours()
const isCurrentHour = (i) => i === currentHour

const tableRows = [
    { section: 'SETELAN VENTILATOR', key: 'mode_ventilasi', label: 'Mode Ventilasi',   unit: '-',      type: 'text',   navRow: 0 },
    { section: 'SETELAN VENTILATOR', key: 'fio2',           label: 'FiO₂',             unit: '%',      type: 'number', navRow: 1, min: 21, max: 100 },
    { section: 'SETELAN VENTILATOR', key: 'peep',           label: 'PEEP',             unit: 'cmH₂O', type: 'number', navRow: 2, min: 0,  max: 30 },
    { section: 'SETELAN VENTILATOR', key: 'tv_set',         label: 'TV Set',            unit: 'mL',     type: 'number', navRow: 3, min: 0,  max: 1000 },
    { section: 'SETELAN VENTILATOR', key: 'tv_terukur',     label: 'TV Terukur',        unit: 'mL',     type: 'number', navRow: 4, min: 0,  max: 1000 },
    { section: 'SETELAN VENTILATOR', key: 'rr_set',         label: 'RR Set',            unit: 'x/mnt',  type: 'number', navRow: 5, min: 0,  max: 60 },
    { section: 'SETELAN VENTILATOR', key: 'ie_ratio',       label: 'I:E Ratio',         unit: '-',      type: 'text',   navRow: 6 },
    { section: 'SETELAN VENTILATOR', key: 'pip',            label: 'PIP',               unit: 'cmH₂O', type: 'number', navRow: 7, min: 0,  max: 60 },
    { section: 'SETELAN VENTILATOR', key: 'plateau',        label: 'Plateau Pressure',  unit: 'cmH₂O', type: 'number', navRow: 8, min: 0,  max: 60 },
    { section: 'AIRWAY',             key: 'jenis_airway',   label: 'Jenis Airway',      unit: '-',      type: 'text',   navRow: 9 },
    { section: 'AIRWAY',             key: 'ukuran_airway',  label: 'Ukuran',            unit: 'mm',     type: 'text',   navRow: 10 },
    { section: 'AIRWAY',             key: 'fiksasi_cm',     label: 'Fiksasi',           unit: 'cm',     type: 'number', navRow: 11, min: 0, max: 50 },
]

function setNum(key, i, raw) { setCellNum(ventilator, key, i, raw) }
function setText(key, i, raw) { setCellText(ventilator, key, i, raw) }
</script>

<style scoped>
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
:deep(.flowsheet-dt thead > tr > th:nth-child(2)) { left: 170px; z-index: 30; }
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
    position: sticky; left: 170px; z-index: 10;
    background: #f8f9fa; border-right: 2px solid #ced4da !important;
}

:deep(.flowsheet-dt .p-rowgroup-header > td) {
    background: #334155; color: #e2e8f0;
    font-weight: 700; font-size: .88rem;
    text-transform: uppercase; letter-spacing: .06em;
    padding: 6px 12px; border-bottom: 1px solid #475569;
}
:deep(.flowsheet-dt .p-rowgroup-header:hover > td) { background: #334155 !important; }

.param-name {
    display: block; font-weight: 600; font-size: 1rem;
    padding: 8px 10px 8px 12px; color: #1e293b; white-space: nowrap;
}
.param-unit {
    display: block; text-align: center; font-size: .9rem;
    color: #64748b; padding: 8px 4px; white-space: nowrap;
}

.cell-fill {
    display: flex; align-items: center; justify-content: center;
    min-height: 40px; padding: 2px 3px;
}
.cell-current { background: rgba(37,99,235,.07); }

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
.cell-input-text { width: calc(100% - 8px); text-align: left; padding: 0 6px; }

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
