<template>
    <div class="p-3">

        <!-- ── Pengaturan Waktu ───────────────────────────────────────── -->
        <Fieldset legend="Pengaturan Waktu" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-4">
                    <label class="field-label">Tanggal Persalinan</label>
                    <InputText type="date" v-model="form.tanggal" class="w-100" :disabled="readonly" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Jam Mulai <span class="text-danger">*</span></label>
                    <InputText type="time" v-model="form.jamMulai" class="w-100"
                        :disabled="readonly" @change="onJamMulaiChange" />
                </div>
                <div class="col-12 col-md-2">
                    <label class="field-label">Total Slot (30 mnt)</label>
                    <InputNumber v-model="form.totalSlot" :min="12" :max="60"
                        style="width:100%" inputClass="text-center" :disabled="readonly" />
                </div>
                <div class="col-12">
                    <div v-if="form.jamMulai" class="timeline-info">
                        <i class="pi pi-check-circle me-1"></i>
                        Mulai <strong>{{ form.jamMulai }}</strong> — interval 30 mnt —
                        <strong>{{ timeLabels.length }}</strong> slot
                        (s/d <strong>{{ timeLabels[timeLabels.length - 1] }}</strong>)
                    </div>
                    <div v-else class="timeline-info timeline-info--warn">
                        <i class="pi pi-exclamation-triangle me-1"></i>
                        Masukkan jam mulai untuk mengaktifkan input observasi
                    </div>
                </div>
            </div>
        </Fieldset>

        <!-- ── Grafik Pembukaan Serviks & Kontraksi ───────────────────── -->
        <Fieldset legend="Pembukaan Serviks & Kontraksi" :toggleable="true" class="mb-3">
            <v-chart ref="chartPembukaanRef" :option="chartPembukaanOption"
                :autoresize="true" style="height:600px;width:100%" />
        </Fieldset>

        <!-- ── Grafik DJJ ──────────────────────────────────────────────── -->
        <Fieldset legend="Denyut Jantung Janin (DJJ)" :toggleable="true" class="mb-3">
            <v-chart ref="chartDjjRef" :option="chartDjjOption"
                :autoresize="true" style="height:200px;width:100%" />
        </Fieldset>

        <!-- ── Grafik Tensi Ibu ────────────────────────────────────────── -->
        <Fieldset legend="Tensi Ibu (Tekanan Darah)" :toggleable="true" class="mb-3">
            <v-chart ref="chartTensiRef" :option="chartTensiOption"
                :autoresize="true" style="height:240px;width:100%" />
        </Fieldset>

        <!-- ── Flowsheet Input Observasi ──────────────────────────────── -->
        <Fieldset class="mb-3">
            <template #legend>
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <i class="pi pi-table"></i>
                    <span class="fw-semibold">Input Observasi</span>
                    <Tag :value="`${filledSlots} slot terisi`" severity="info" />
                    <span v-if="!form.jamMulai" class="text-muted" style="font-size:.85rem">
                        <i class="pi pi-info-circle me-1"></i>Set jam mulai dahulu
                    </span>
                    <div class="col-sizer ms-2">
                        <i class="pi pi-arrows-h me-1"></i>
                        <input type="range" v-model.number="colWidth" min="44" max="110" step="2" class="sizer-range" />
                        <span>{{ colWidth }}px</span>
                    </div>
                </div>
            </template>

            <div class="flowsheet-wrap" ref="flowsheetRef">
                <table class="flowsheet-tbl">
                    <thead>
                        <tr>
                            <th class="th-param">Parameter</th>
                            <th class="th-unit">Satuan</th>
                            <th v-for="(_, i) in timeLabels" :key="i"
                                :class="['th-time', highlightCol === i ? 'th-highlight' : '']"
                                :style="{ minWidth: colWidth + 'px', width: colWidth + 'px' }">
                                {{ label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(section, si) in flowSections" :key="si">
                            <tr class="tr-section">
                                <td :colspan="2 + timeLabels.length" class="td-section">
                                    {{ section.label }}
                                </td>
                            </tr>
                            <tr v-for="row in section.rows" :key="row.key" class="tr-param">
                                <td class="td-param">{{ row.label }}</td>
                                <td class="td-unit">{{ row.unit }}</td>

                                <template v-if="row.key === 'durasiKontraksi'">
                                    <td v-for="(_, i) in timeLabels" :key="i"
                                        :class="['td-cell', highlightCol === i ? 'td-highlight' : '']"
                                        :style="{ minWidth: colWidth + 'px' }">
                                        <div class="durasi-cell">
                                            <button v-for="opt in durasiOptions" :key="opt.value"
                                                :class="['dur-btn', `dur-${opt.value}`,
                                                    getCellValue('durasiKontraksi', i) === opt.value ? 'dur-active' : '']"
                                                :title="opt.label"
                                                :disabled="!form.jamMulai || readonly"
                                                @click="toggleDurasi(i, opt.value)" />
                                        </div>
                                    </td>
                                </template>

                                <template v-else>
                                    <td v-for="(_, i) in timeLabels" :key="i"
                                        :class="['td-cell', highlightCol === i ? 'td-highlight' : '',
                                            getCellClass(row, i)]"
                                        :style="{ minWidth: colWidth + 'px' }">
                                        <input
                                            type="number"
                                            class="cell-inp"
                                            :value="getCellValue(row.key, i) ?? ''"
                                            :min="row.min"
                                            :max="row.max"
                                            :step="row.step || 1"
                                            :disabled="!form.jamMulai || readonly"
                                            :data-row="row.navRow"
                                            :data-col="i"
                                            @change="e => setCellValue(row.key, i, e.target.value)"
                                            @keydown="e => handleNav(e, row.navRow, i)"
                                            @focus="highlightCol = i"
                                            @blur="highlightCol = -1"
                                        />
                                    </td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <!-- Legend -->
            <div class="legend-row">
                <span class="legend-lbl">Keterangan:</span>
                <span class="legend-item legend-ok"><i class="pi pi-circle-fill"></i> Normal</span>
                <span class="legend-item legend-warn"><i class="pi pi-circle-fill"></i> Perhatian</span>
                <span class="legend-item legend-danger"><i class="pi pi-circle-fill"></i> Kritis</span>
                <span class="ms-3 legend-lbl">Durasi kontraksi:</span>
                <span class="dur-leg dur-kurang20"></span><span class="legend-lbl"> &lt;20 det</span>
                <span class="dur-leg dur-20_40"></span><span class="legend-lbl"> 20–40 det</span>
                <span class="dur-leg dur-lebih40"></span><span class="legend-lbl"> &gt;40 det</span>
            </div>
        </Fieldset>

        <!-- ── Action Bar ──────────────────────────────────────────────── -->
        <div v-if="!readonly" class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-1 mb-3">
            <small class="text-muted">
                <i class="pi pi-info-circle me-1"></i>
                Isi data langsung pada cell. Gunakan ↑↓←→ / Enter untuk navigasi.
            </small>
            <div class="d-flex gap-2">
                <Button label="Reset Data" icon="pi pi-refresh" severity="secondary" outlined size="small" @click="resetData" />
                <Button label="Simpan Partograf" icon="pi pi-save" severity="success" size="small" :loading="loading" @click="savePartograf" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import Fieldset from 'primevue/fieldset'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
    GridComponent, TooltipComponent, LegendComponent,
    DataZoomComponent, MarkLineComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent,
     LegendComponent, DataZoomComponent, MarkLineComponent])

const props = defineProps({
    noregister: { type: String, default: '' },
    namapasien: { type: String, default: '' },
    readonly:   { type: Boolean, default: false },
})

const toast         = useToast()
const loading       = ref(false)
const highlightCol  = ref(-1)
const colWidth      = ref(68)
const flowsheetRef  = ref(null)

const chartPembukaanRef = ref(null)
const chartDjjRef       = ref(null)
const chartTensiRef     = ref(null)
const stripePattern     = ref(null)

// ── Form ──────────────────────────────────────────────────────────────────
const form = ref({
    noRegister: props.noregister || '',
    tanggal:    new Date().toISOString().split('T')[0],
    jamMulai:   '',
    totalSlot:  32,
})

const observations = ref([])   // [{timeIndex, time, pembukaan, penurunan, djj, ...}]

// ── Durasi options ────────────────────────────────────────────────────────
const durasiOptions = [
    { label: '< 20 detik',  value: 'kurang20' },
    { label: '20–40 detik', value: '20_40'    },
    { label: '> 40 detik',  value: 'lebih40'  },
]

// ── Flowsheet row definitions ─────────────────────────────────────────────
const flowSections = [
    {
        label: 'KEMAJUAN PERSALINAN',
        rows: [
            { key: 'pembukaan', label: 'Pembukaan Serviks (✕)', unit: 'cm',    navRow: 0, min: 0,  max: 10,  step: 0.5, normalMin: null, normalMax: null },
            { key: 'penurunan', label: 'Penurunan Kepala (○)',  unit: '/5',    navRow: 1, min: 0,  max: 5,   step: 1   },
            { key: 'kontraksi', label: 'Kontraksi',             unit: '×/10m', navRow: 2, min: 0,  max: 5,   step: 1   },
            { key: 'durasiKontraksi', label: 'Durasi Kontraksi', unit: '' },
        ],
    },
    {
        label: 'DENYUT JANTUNG JANIN',
        rows: [
            { key: 'djj', label: 'DJJ', unit: 'bpm', navRow: 3, min: 60, max: 200, step: 1,
              normalMin: 120, normalMax: 160, warnMin: 100, warnMax: 180 },
        ],
    },
    {
        label: 'TANDA VITAL IBU',
        rows: [
            { key: 'nadi',          label: 'Nadi',           unit: 'x/mnt', navRow: 4, min: 40,  max: 200, step: 1,
              normalMin: 60, normalMax: 100, warnMin: 50, warnMax: 110 },
            { key: 'suhu',          label: 'Suhu',           unit: '°C',    navRow: 5, min: 35,  max: 42,  step: 0.1,
              normalMin: 36.0, normalMax: 37.5, warnMin: 35.5, warnMax: 38.5 },
            { key: 'tensiSistolik', label: 'Tensi Sistolik', unit: 'mmHg',  navRow: 6, min: 60,  max: 220, step: 1,
              normalMin: 90, normalMax: 140, warnMin: 80, warnMax: 160 },
            { key: 'tensiDiastolik',label: 'Tensi Diastolik',unit: 'mmHg',  navRow: 7, min: 40,  max: 140, step: 1,
              normalMin: 60, normalMax: 90,  warnMin: 50, warnMax: 100 },
        ],
    },
]

// Flat rows untuk navigasi keyboard
const allRows = computed(() => flowSections.flatMap(s => s.rows.filter(r => r.key !== 'durasiKontraksi')))

// ── Timeline ──────────────────────────────────────────────────────────────
const timeLabels = computed(() => {
    const total = form.value.totalSlot || 32
    if (!form.value.jamMulai) {
        return Array.from({ length: total }, (_, i) => `T+${i * 30}m`)
    }
    const [h, m] = form.value.jamMulai.split(':').map(Number)
    return Array.from({ length: total }, (_, i) => {
        const mins = h * 60 + m + i * 30
        const hh   = Math.floor(mins / 60) % 24
        const mm   = mins % 60
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
    })
})

const filledSlots = computed(() => observations.value.length)

// ── Cell read/write ───────────────────────────────────────────────────────
function getCellValue(key, timeIndex) {
    return observations.value.find(o => o.timeIndex === timeIndex)?.[key] ?? null
}

function getOrCreateObs(timeIndex) {
    let obs = observations.value.find(o => o.timeIndex === timeIndex)
    if (!obs) {
        obs = {
            timeIndex,
            time: timeLabels.value[timeIndex] ?? '',
            pembukaan: null, penurunan: null, djj: null,
            kontraksi: null, durasiKontraksi: null,
            nadi: null, suhu: null, tensiSistolik: null, tensiDiastolik: null,
        }
        observations.value.push(obs)
        observations.value.sort((a, b) => a.timeIndex - b.timeIndex)
    }
    return obs
}

function pruneObs(obs) {
    const keys = ['pembukaan','penurunan','djj','kontraksi','durasiKontraksi',
                  'nadi','suhu','tensiSistolik','tensiDiastolik']
    if (keys.every(k => obs[k] === null || obs[k] === undefined)) {
        const idx = observations.value.indexOf(obs)
        if (idx !== -1) observations.value.splice(idx, 1)
    }
}

function setCellValue(key, timeIndex, raw) {
    const total = timeLabels.value.length
    if (timeIndex < 0 || timeIndex >= total) return
    const val = (raw === '' || raw === null || raw === undefined) ? null : parseFloat(raw)
    const obs = val === null
        ? observations.value.find(o => o.timeIndex === timeIndex)
        : getOrCreateObs(timeIndex)
    if (!obs) return
    obs[key] = val
    pruneObs(obs)
}

function toggleDurasi(timeIndex, value) {
    const total = timeLabels.value.length
    if (timeIndex < 0 || timeIndex >= total) return
    const obs = getOrCreateObs(timeIndex)
    obs.durasiKontraksi = obs.durasiKontraksi === value ? null : value
    pruneObs(obs)
}

// ── Cell color class ──────────────────────────────────────────────────────
function getCellClass(row, i) {
    if (!row.normalMin) return ''
    const val = getCellValue(row.key, i)
    if (val === null || val === undefined) return ''
    const n = parseFloat(val)
    if (isNaN(n)) return ''
    if (n >= row.normalMin && n <= row.normalMax) return 'cell-ok'
    if (row.warnMin && n >= row.warnMin && n <= row.warnMax) return 'cell-warn'
    return 'cell-danger'
}

// ── Keyboard navigation ───────────────────────────────────────────────────
function handleNav(e, rowIdx, colIdx) {
    const total   = timeLabels.value.length
    const rowCount = allRows.value.length
    let tr = rowIdx, tc = colIdx
    if (e.key === 'ArrowRight')       { tc = Math.min(tc + 1, total - 1); e.preventDefault() }
    else if (e.key === 'ArrowLeft')   { tc = Math.max(tc - 1, 0); e.preventDefault() }
    else if (e.key === 'ArrowDown' || e.key === 'Enter') { tr = Math.min(tr + 1, rowCount - 1); e.preventDefault() }
    else if (e.key === 'ArrowUp')     { tr = Math.max(tr - 1, 0); e.preventDefault() }
    else return
    if (tr === rowIdx && tc === colIdx) return
    const el = flowsheetRef.value?.querySelector(
        `input[data-row="${tr}"][data-col="${tc}"]`
    )
    if (el) { el.focus(); el.select() }
}

// ── localStorage ──────────────────────────────────────────────────────────
const storageKey = computed(() => `partograf_${form.value.noRegister || 'temp'}`)

const persist = () => {
    try { localStorage.setItem(storageKey.value, JSON.stringify({ form: form.value, observations: observations.value })) }
    catch (_) {}
}
watch([form, observations], persist, { deep: true })

// ── Canvas stripe pattern ─────────────────────────────────────────────────
const createStripePattern = () => {
    const c = document.createElement('canvas')
    c.width = c.height = 10
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#fb923c'
    ctx.fillRect(0, 0, 10, 10)
    ctx.strokeStyle = 'rgba(255,255,255,0.65)'
    ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(10, 0); ctx.stroke()
    return ctx.createPattern(c, 'repeat')
}

const getKontraksiColor = (durasi) => {
    if (durasi === 'kurang20') return '#d1d5db'
    if (durasi === '20_40')   return stripePattern.value ?? '#fb923c'
    if (durasi === 'lebih40') return '#374151'
    return '#9ca3af'
}

// ── Series data builder ───────────────────────────────────────────────────
const buildSeriesData = () => {
    const total = timeLabels.value.length
    const pembukaan = new Array(total).fill(null)
    const penurunan = new Array(total).fill(null)
    const djj       = new Array(total).fill(null)
    const kontraksi = new Array(total).fill(null)
    const sistolik  = new Array(total).fill(null)
    const diastolik = new Array(total).fill(null)
    const tensiGap  = new Array(total).fill(null)

    observations.value.forEach(obs => {
        const i = obs.timeIndex
        if (i < 0 || i >= total) return
        if (obs.pembukaan  != null) pembukaan[i] = obs.pembukaan
        if (obs.penurunan  != null) penurunan[i] = obs.penurunan
        if (obs.djj        != null) djj[i] = obs.djj
        if (obs.kontraksi  != null)
            kontraksi[i] = { value: obs.kontraksi, itemStyle: { color: getKontraksiColor(obs.durasiKontraksi) } }
        if (obs.tensiDiastolik != null) diastolik[i] = obs.tensiDiastolik
        if (obs.tensiSistolik  != null) {
            sistolik[i] = obs.tensiSistolik
            if (obs.tensiDiastolik != null) tensiGap[i] = obs.tensiSistolik - obs.tensiDiastolik
        }
    })
    return { pembukaan, penurunan, djj, kontraksi, sistolik, diastolik, tensiGap }
}

// ── Alert lines ───────────────────────────────────────────────────────────
const buildAlertSeries = (total) => {
    const waspadaLabelIdx   = Math.max(4,  Math.floor(total * 0.18))
    const bertindakLabelIdx = Math.max(14, Math.floor(total * 0.44))

    const makeLabel = (text) => ({
        show: true, formatter: text,
        fontSize: 28, fontWeight: 'bold', color: '#111827',
        rotate: -27, position: 'top', distance: 2,
        textShadowColor: 'rgba(255,255,255,0.9)', textShadowBlur: 4,
    })

    const waspadaData = Array.from({ length: total }, (_, i) => {
        const val = 4 + i * 0.5
        if (val > 10) return null
        const v = parseFloat(val.toFixed(1))
        return i === waspadaLabelIdx ? { value: v, label: makeLabel('WASPADA') } : v
    })

    const bertindakData = Array.from({ length: total }, (_, i) => {
        if (i < 8) return null
        const val = 4 + (i - 8) * 0.5
        if (val > 10) return null
        const v = parseFloat(val.toFixed(1))
        return i === bertindakLabelIdx ? { value: v, label: makeLabel('BERTINDAK') } : v
    })

    return { waspadaData, bertindakData }
}

// ── Tooltip ───────────────────────────────────────────────────────────────
const tooltipFormatter = (params) => {
    const time = params[0]?.axisValue ?? ''
    let html = `<div style="font-weight:700;margin-bottom:4px;border-bottom:1px solid #e5e7eb;padding-bottom:3px">${time}</div>`
    params.forEach(p => {
        const val = typeof p.value === 'object' ? p.value?.value : p.value
        if (val == null) return
        html += `${p.marker} ${p.seriesName}: <strong>${val}</strong><br/>`
    })
    return html
}

// ── ECharts: Pembukaan & Kontraksi ────────────────────────────────────────
const chartPembukaanOption = computed(() => {
    const labels = timeLabels.value
    const total  = labels.length
    const { pembukaan, penurunan, kontraksi } = buildSeriesData()
    const { waspadaData, bertindakData }      = buildAlertSeries(total)

    const xAxisCommon = {
        type: 'category', data: labels, boundaryGap: false,
        axisLine:  { lineStyle: { color: '#9ca3af', width: 1 } },
        axisTick:  { lineStyle: { color: '#d1d5db' } },
        splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } },
        axisLabel: { fontSize: 9, color: '#6b7280',
            interval: Math.max(0, Math.ceil(total / 24) - 1),
            rotate: total > 24 ? 45 : 0 },
    }

    return {
        backgroundColor: '#ffffff', animation: false,
        tooltip: { trigger: 'axis',
            axisPointer: { type: 'cross', link: [{ xAxisIndex: 'all' }], crossStyle: { color: '#9ca3af' } },
            formatter: tooltipFormatter },
        dataZoom: [
            { type: 'inside', xAxisIndex: [0, 1], start: 0, end: 100 },
            { type: 'slider', xAxisIndex: [0, 1], bottom: 4, height: 18,
              borderColor: '#e5e7eb', fillerColor: 'rgba(13,148,136,0.1)', handleStyle: { color: '#0d9488' } },
        ],
        grid: [
            { left: 56, right: 60, top: 40, height: 350 },
            { left: 56, right: 60, top: 435, height: 120 },
        ],
        xAxis: [
            { ...xAxisCommon, gridIndex: 0 },
            { ...xAxisCommon, gridIndex: 1, boundaryGap: true },
        ],
        yAxis: [
            { gridIndex: 0, type: 'value', min: 0, max: 10, interval: 1,
              name: 'Pembukaan Serviks', nameLocation: 'middle', nameGap: 32,
              nameTextStyle: { fontSize: 9, color: '#374151', fontWeight: 600 },
              axisLabel: { fontSize: 10, color: '#374151', margin: 6 },
              axisLine: { show: true, lineStyle: { color: '#9ca3af', width: 1 } },
              splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } }, axisTick: { show: true } },
            { gridIndex: 0, type: 'value', min: 0, max: 5, interval: 1,
              position: 'right', name: 'Penurunan', nameLocation: 'middle', nameGap: 28,
              nameTextStyle: { fontSize: 9, color: '#dc2626' },
              axisLabel: { fontSize: 10, color: '#dc2626', margin: 6 },
              axisLine: { show: true, lineStyle: { color: '#dc2626', width: 1 } },
              splitLine: { show: false }, axisTick: { show: true } },
            { gridIndex: 1, type: 'value', min: 0, max: 5, interval: 1,
              name: 'Kontraksi', nameLocation: 'middle', nameGap: 28,
              nameTextStyle: { fontSize: 9, color: '#374151', fontWeight: 600 },
              axisLabel: { fontSize: 10, color: '#374151', margin: 6 },
              axisLine: { show: true, lineStyle: { color: '#9ca3af', width: 1 } },
              splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } }, axisTick: { show: true } },
        ],
        series: [
            { name: 'Pembukaan Serviks', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: pembukaan,
              symbol: 'path://M-6,-6 L6,6 M-6,6 L6,-6', symbolSize: 13,
              lineStyle: { color: '#111827', width: 2 }, itemStyle: { color: '#111827' },
              label: { show: true, position: 'top', fontSize: 11, color: '#111827' },
              connectNulls: false, z: 5 },
            { name: 'Penurunan Kepala', type: 'line', xAxisIndex: 0, yAxisIndex: 1, data: penurunan,
              symbol: 'emptyCircle', symbolSize: 11,
              lineStyle: { color: '#dc2626', width: 2 }, itemStyle: { color: '#dc2626', borderWidth: 2 },
              label: { show: true, position: 'top', fontSize: 11, color: '#dc2626' },
              connectNulls: false, z: 5 },
            { name: 'Garis Waspada', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: waspadaData,
              symbol: 'none', lineStyle: { color: '#374151', width: 1.5 },
              itemStyle: { color: '#374151' }, connectNulls: false, z: 2 },
            { name: 'Garis Bertindak', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: bertindakData,
              symbol: 'none', lineStyle: { color: '#374151', width: 1.5 },
              itemStyle: { color: '#374151' }, connectNulls: false, z: 2 },
            { name: 'Kontraksi', type: 'bar', xAxisIndex: 1, yAxisIndex: 2, data: kontraksi,
              barWidth: '80%', label: { show: true }, z: 3 },
        ],
    }
})

// ── ECharts: DJJ ─────────────────────────────────────────────────────────
const chartDjjOption = computed(() => {
    const labels = timeLabels.value
    const total  = labels.length
    const { djj } = buildSeriesData()
    return {
        backgroundColor: '#ffffff', animation: false,
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#9ca3af' } }, formatter: tooltipFormatter },
        dataZoom: [{ type: 'inside', start: 0, end: 100 }],
        grid: { left: 56, right: 18, top: 10, bottom: 30 },
        xAxis: { type: 'category', data: labels, boundaryGap: false,
            axisLine: { lineStyle: { color: '#9ca3af', width: 1 } },
            axisLabel: { fontSize: 9, color: '#6b7280', interval: Math.max(0, Math.ceil(total / 24) - 1), rotate: total > 24 ? 45 : 0 },
            splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } } },
        yAxis: { type: 'value', min: 100, max: 180, interval: 20,
            name: 'DJJ (bpm)', nameLocation: 'middle', nameGap: 32,
            nameTextStyle: { fontSize: 9, color: '#374151', fontWeight: 600 },
            axisLabel: { fontSize: 10, color: '#374151', margin: 6 },
            axisLine: { show: true, lineStyle: { color: '#9ca3af', width: 1 } },
            splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } },
            markLine: { silent: true, symbol: 'none',
                lineStyle: { color: '#fca5a5', type: 'dashed', width: 1 },
                label: { fontSize: 9, color: '#ef4444' },
                data: [{ yAxis: 120, name: '120' }, { yAxis: 160, name: '160' }] } },
        series: [{ name: 'DJJ', type: 'line', data: djj,
            symbol: 'circle', symbolSize: 7,
            lineStyle: { color: '#0d9488', width: 2 }, itemStyle: { color: '#0d9488' }, connectNulls: false }],
    }
})

// ── ECharts: Tensi ────────────────────────────────────────────────────────
const chartTensiOption = computed(() => {
    const labels = timeLabels.value
    const total  = labels.length
    const { sistolik, diastolik, tensiGap } = buildSeriesData()
    return {
        backgroundColor: '#ffffff', animation: false,
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#9ca3af' } },
            formatter: (params) => {
                const time = params[0]?.axisValue ?? ''
                let html = `<div style="font-weight:700;margin-bottom:4px;border-bottom:1px solid #e5e7eb;padding-bottom:3px">${time}</div>`
                params.forEach(p => {
                    if (p.seriesName === '_tensiGap') return
                    const val = typeof p.value === 'object' ? p.value?.value : p.value
                    if (val == null) return
                    html += `${p.marker} ${p.seriesName}: <strong>${val} mmHg</strong><br/>`
                })
                return html
            } },
        dataZoom: [{ type: 'inside', start: 0, end: 100 }],
        legend: { data: ['Sistolik', 'Diastolik'], top: 4, right: 20, itemWidth: 14, itemHeight: 8, textStyle: { fontSize: 10 } },
        grid: { left: 56, right: 18, top: 30, bottom: 30 },
        xAxis: { type: 'category', data: labels, boundaryGap: false,
            axisLine: { lineStyle: { color: '#9ca3af', width: 1 } },
            axisLabel: { fontSize: 9, color: '#6b7280', interval: Math.max(0, Math.ceil(total / 24) - 1), rotate: total > 24 ? 45 : 0 },
            splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } } },
        yAxis: { type: 'value', min: 60, max: 180, interval: 20,
            name: 'Tensi (mmHg)', nameLocation: 'middle', nameGap: 32,
            nameTextStyle: { fontSize: 9, color: '#374151', fontWeight: 600 },
            axisLabel: { fontSize: 10, color: '#374151', margin: 6 },
            axisLine: { show: true, lineStyle: { color: '#9ca3af', width: 1 } },
            splitLine: { show: true, lineStyle: { color: '#e5e7eb', width: 1 } },
            markLine: { silent: true, symbol: 'none', lineStyle: { color: '#fca5a5', type: 'dashed', width: 1 },
                label: { fontSize: 9, color: '#ef4444' }, data: [{ yAxis: 140, name: '140' }] } },
        series: [
            { name: 'Diastolik', type: 'line', data: diastolik, stack: 'tensi',
              symbol: 'circle', symbolSize: 7, lineStyle: { color: '#2563eb', width: 2 }, itemStyle: { color: '#2563eb' },
              areaStyle: { color: 'rgba(255,255,255,0)' }, connectNulls: false },
            { name: '_tensiGap', type: 'line', data: tensiGap, stack: 'tensi',
              symbol: 'none', lineStyle: { width: 0, color: 'transparent' }, itemStyle: { opacity: 0 },
              areaStyle: { color: 'rgba(220,38,38,0.15)' }, connectNulls: false, silent: true, showSymbol: false,
              emphasis: { scale: false, lineStyle: { width: 0 } } },
            { name: 'Sistolik', type: 'line', data: sistolik,
              symbol: 'circle', symbolSize: 7, lineStyle: { color: '#dc2626', width: 2 }, itemStyle: { color: '#dc2626' },
              connectNulls: false, z: 10 },
        ],
    }
})

// ── Jam mulai change ──────────────────────────────────────────────────────
const onJamMulaiChange = () => {
    if (observations.value.length > 0)
        toast.add({ severity: 'warn', summary: 'Perhatian',
            detail: 'Mengubah jam mulai akan menggeser posisi seluruh data grafik', life: 4000 })
}

// ── Save & Reset ──────────────────────────────────────────────────────────
const savePartograf = async () => {
    if (!form.value.jamMulai) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Masukkan jam mulai persalinan', life: 3000 })
        return
    }
    try {
        loading.value = true
        persist()
        toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Partograf berhasil disimpan', life: 3000 })
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Gagal menyimpan partograf', life: 3000 })
    } finally { loading.value = false }
}

const resetData = () => {
    observations.value = []
    localStorage.removeItem(storageKey.value)
    toast.add({ severity: 'info', summary: 'Reset', detail: 'Data observasi telah direset', life: 2000 })
}

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(() => {
    stripePattern.value = createStripePattern()
    const saved = localStorage.getItem(storageKey.value)
    if (saved) {
        try {
            const data = JSON.parse(saved)
            if (data.form)         Object.assign(form.value, data.form)
            if (data.observations) observations.value = data.observations
        } catch (_) { localStorage.removeItem(storageKey.value) }
    }
})
</script>

<style scoped>
/* ═══ Labels ════════════════════════════════════════════════════════════ */
.field-label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.3rem; }

/* ═══ Timeline Info ══════════════════════════════════════════════════════ */
.timeline-info {
    padding: 0.4rem 0.75rem; background: #f0fdfa;
    border: 1px solid #99f6e4; border-radius: 6px; font-size: 0.875rem; color: #134e4a;
}
.timeline-info--warn { background: #fffbeb; border-color: #fde68a; color: #92400e; }

/* ═══ Col sizer ══════════════════════════════════════════════════════════ */
.col-sizer {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.82rem; color: #374151;
}
.sizer-range { width: 70px; accent-color: #0d9488; cursor: pointer; }

/* ═══ Flowsheet ══════════════════════════════════════════════════════════ */
.flowsheet-wrap {
    overflow: auto;
    max-height: 55vh;
    border-bottom: 1px solid #e2e8f0;
}

.flowsheet-tbl {
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.875rem;
    width: max-content;
    min-width: 100%;
}

/* Sticky columns */
.th-param, .td-param {
    position: sticky; left: 0; z-index: 3;
    background: #f8fafc;
    min-width: 185px; width: 185px;
    border-right: 1px solid #ced4da;
    white-space: nowrap;
    padding: 6px 10px;
}
.th-unit, .td-unit {
    position: sticky; left: 185px; z-index: 3;
    background: #f8fafc;
    min-width: 60px; width: 60px;
    border-right: 2px solid #ced4da;
    text-align: center;
    padding: 6px 4px;
    color: #6b7280; font-size: 0.82rem;
}

/* Header row */
.flowsheet-tbl thead tr { background: #1e3a5f; color: #fff; position: sticky; top: 0; z-index: 4; }
.th-param { background: #1e3a5f; color: #fff; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; }
.th-unit  { background: #1e3a5f; color: rgba(255,255,255,.7); font-size: 0.82rem; }
.th-time  {
    background: #1e3a5f; color: rgba(255,255,255,.9);
    padding: 6px 3px; text-align: center;
    font-size: 0.8rem; font-weight: 600;
    border-right: 1px solid rgba(255,255,255,.15);
    white-space: nowrap;
}
.th-highlight { background: #0d9488 !important; }

/* Section header row */
.tr-section .td-section {
    background: #e2e8f0; color: #374151; font-weight: 700;
    font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;
    padding: 5px 10px;
    position: sticky; left: 0;
    border-top: 2px solid #94a3b8;
}

/* Parameter row */
.tr-param:hover .td-param,
.tr-param:hover .td-unit,
.tr-param:hover .td-cell { background: #f0fdf4; }

.td-param {
    font-size: 0.875rem; font-weight: 600; color: #1e293b;
    border-bottom: 1px solid #e2e8f0;
}
.td-unit {
    color: #6b7280; border-bottom: 1px solid #e2e8f0;
}

/* Data cell */
.td-cell {
    padding: 2px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    text-align: center;
    vertical-align: middle;
    background: #fff;
}
.td-highlight { background: #f0fdfa !important; }

/* Input inside cell */
.cell-inp {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    text-align: center;
    font-size: 0.875rem;
    color: #1e293b;
    padding: 5px 2px;
    -moz-appearance: textfield;
}
.cell-inp::-webkit-inner-spin-button,
.cell-inp::-webkit-outer-spin-button { -webkit-appearance: none; }
.cell-inp:focus { background: #eff6ff; border-radius: 2px; }
.cell-inp:disabled { opacity: 0.4; cursor: not-allowed; }

/* Cell color states */
.cell-ok     { background: #dcfce7 !important; }
.cell-warn   { background: #fef9c3 !important; }
.cell-danger { background: #fee2e2 !important; }

/* Durasi kontraksi cell */
.durasi-cell {
    display: flex; justify-content: center; align-items: center; gap: 4px;
    padding: 5px 2px;
}
.dur-btn {
    width: 16px; height: 16px; border-radius: 2px; border: 1.5px solid #d1d5db;
    cursor: pointer; flex-shrink: 0; padding: 0;
    transition: transform 0.1s, box-shadow 0.1s;
}
.dur-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.dur-btn:not(:disabled):hover { transform: scale(1.2); box-shadow: 0 0 0 2px rgba(0,0,0,.15); }
.dur-kurang20 { background: #d1d5db; }
.dur-20_40    { background: repeating-linear-gradient(-45deg,#fb923c 0,#fb923c 3px,#fff 3px,#fff 6px); }
.dur-lebih40  { background: #1f2937; }
.dur-active   { border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13,148,136,.4); transform: scale(1.15); }

/* ═══ Legend ════════════════════════════════════════════════════════════ */
.legend-row {
    display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
    padding: 10px 14px; background: #f8fafc; border-top: 1px solid #e2e8f0;
    font-size: 0.875rem;
}
.legend-lbl { color: #6b7280; font-weight: 600; }
.legend-item { display: flex; align-items: center; gap: 4px; }
.legend-ok     { color: #16a34a; }
.legend-warn   { color: #ca8a04; }
.legend-danger { color: #dc2626; }
.dur-leg {
    display: inline-block; width: 14px; height: 14px; border-radius: 2px;
    border: 1px solid #d1d5db; vertical-align: middle;
}

/* ═══ PrimeVue overrides ════════════════════════════════════════════════ */
:deep(.p-inputtext), :deep(.p-inputnumber-input) { font-size: 0.9rem; }

/* ═══ Responsive ════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
    .flowsheet-wrap { max-height: 45vh; }
}
</style>
