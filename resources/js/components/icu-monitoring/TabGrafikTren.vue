<template>
    <div class="tab-grafik-tren">

        <div class="row g-3">

            <!-- Chart 1: Tekanan Darah & MAP -->
            <div class="col-12 col-xl-6">
                <div class="chart-card">
                    <div class="chart-title">
                        <i class="pi pi-wave-pulse me-1 text-danger"></i>
                        Tekanan Darah &amp; MAP
                    </div>
                    <Chart type="line" :data="chartTD" :options="optionsTD" style="height:220px" />
                </div>
            </div>

            <!-- Chart 2: SpO2 & RR -->
            <div class="col-12 col-xl-6">
                <div class="chart-card">
                    <div class="chart-title">
                        <i class="pi pi-circle-fill me-1 text-info"></i>
                        SpO₂ &amp; Frekuensi Napas (RR)
                    </div>
                    <Chart type="line" :data="chartSpO2RR" :options="optionsSpO2RR" style="height:220px" />
                </div>
            </div>

            <!-- Chart 3: GCS -->
            <div class="col-12 col-xl-6">
                <div class="chart-card">
                    <div class="chart-title">
                        <i class="pi pi-brain me-1 text-warning"></i>
                        Glasgow Coma Scale (GCS)
                    </div>
                    <Chart type="line" :data="chartGCS" :options="optionsGCS" style="height:220px" />
                </div>
            </div>

            <!-- Chart 4: Balance Cairan -->
            <div class="col-12 col-xl-6">
                <div class="chart-card">
                    <div class="chart-title">
                        <i class="pi pi-drop me-1 text-primary"></i>
                        Balance Cairan (Intake vs Output)
                    </div>
                    <Chart type="line" :data="chartBalance" :options="optionsBalance" style="height:220px" />
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import Chart from 'primevue/chart'
import { ICU_MONITORING_KEY } from './composables/useFormPemantauanICU'

const state = inject(ICU_MONITORING_KEY)
const { hours, vitalSign, gcsTotal, intakePerJam, outputPerJam, balanceKumulatif } = state

// ── Shared chart options factory ──────────────────────────────────────────
function baseOptions(yScales = {}) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: {
            legend: { position: 'top', labels: { font: { size: 11 } } },
        },
        scales: {
            x: {
                ticks: { font: { size: 9 }, maxRotation: 0 },
                grid:  { color: 'rgba(0,0,0,.06)' },
            },
            ...yScales,
        },
        spanGaps: true,
        elements: {
            point: { radius: 3, hitRadius: 6 },
            line:  { tension: 0.3, borderWidth: 2 },
        },
    }
}

// ── Chart 1: TD & MAP ────────────────────────────────────────────────────
const chartTD = computed(() => ({
    labels: hours,
    datasets: [
        {
            label: 'TD Sistol',
            data:  vitalSign.td_sistol,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,.1)',
            fill: false,
        },
        {
            label: 'TD Diastol',
            data:  vitalSign.td_diastol,
            borderColor: '#f97316',
            backgroundColor: 'rgba(249,115,22,.1)',
            fill: false,
        },
        {
            label: 'MAP',
            data:  vitalSign.map,
            borderColor: '#a855f7',
            borderDash: [4, 3],
            fill: false,
        },
    ],
}))

const optionsTD = baseOptions({
    y: {
        min: 40,
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0,0,0,.06)' },
        title: { display: true, text: 'mmHg', font: { size: 10 } },
    },
})

// ── Chart 2: SpO2 & RR ───────────────────────────────────────────────────
const chartSpO2RR = computed(() => ({
    labels: hours,
    datasets: [
        {
            label: 'SpO₂ (%)',
            data:  vitalSign.spo2,
            borderColor: '#0ea5e9',
            yAxisID: 'ySpo2',
            fill: false,
        },
        {
            label: 'RR (x/mnt)',
            data:  vitalSign.rr,
            borderColor: '#22c55e',
            yAxisID: 'yRR',
            fill: false,
        },
    ],
}))

const optionsSpO2RR = baseOptions({
    ySpo2: {
        position: 'left',
        min: 70, max: 100,
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0,0,0,.06)' },
        title: { display: true, text: 'SpO₂ %', font: { size: 10 } },
    },
    yRR: {
        position: 'right',
        min: 0, max: 50,
        ticks: { font: { size: 10 } },
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'RR x/mnt', font: { size: 10 } },
    },
})

// ── Chart 3: GCS ─────────────────────────────────────────────────────────
const chartGCS = computed(() => ({
    labels: hours,
    datasets: [
        {
            label: 'GCS Total',
            data:  gcsTotal.value,
            borderColor: '#eab308',
            backgroundColor: 'rgba(234,179,8,.15)',
            fill: true,
        },
        {
            label: 'GCS E',
            data:  vitalSign.gcs_e,
            borderColor: '#94a3b8',
            borderDash: [4, 3],
            fill: false,
        },
        {
            label: 'GCS V',
            data:  vitalSign.gcs_v,
            borderColor: '#64748b',
            borderDash: [4, 3],
            fill: false,
        },
        {
            label: 'GCS M',
            data:  vitalSign.gcs_m,
            borderColor: '#475569',
            borderDash: [4, 3],
            fill: false,
        },
    ],
}))

const optionsGCS = baseOptions({
    y: {
        min: 0, max: 15,
        ticks: { stepSize: 3, font: { size: 10 } },
        grid: { color: 'rgba(0,0,0,.06)' },
        title: { display: true, text: 'Skor GCS', font: { size: 10 } },
    },
})

// ── Chart 4: Balance Cairan ──────────────────────────────────────────────
const chartBalance = computed(() => ({
    labels: hours,
    datasets: [
        {
            label: 'Intake/Jam (mL)',
            data:  intakePerJam.value,
            borderColor: '#0369a1',
            backgroundColor: 'rgba(3,105,161,.1)',
            fill: true,
        },
        {
            label: 'Output/Jam (mL)',
            data:  outputPerJam.value,
            borderColor: '#b45309',
            backgroundColor: 'rgba(180,83,9,.1)',
            fill: true,
        },
        {
            label: 'Balance Kumulatif (mL)',
            data:  balanceKumulatif.value,
            borderColor: '#16a34a',
            borderDash: [5, 3],
            fill: false,
            yAxisID: 'yKum',
        },
    ],
}))

const optionsBalance = baseOptions({
    y: {
        position: 'left',
        min: 0,
        ticks: { font: { size: 10 } },
        grid: { color: 'rgba(0,0,0,.06)' },
        title: { display: true, text: 'mL/jam', font: { size: 10 } },
    },
    yKum: {
        position: 'right',
        ticks: { font: { size: 10 } },
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Kumulatif mL', font: { size: 10 } },
    },
})
</script>

<style scoped>
.tab-grafik-tren {
    padding: 4px 0;
}
.chart-card {
    border: 1px solid #ced4da;
    border-radius: 10px;
    padding: 16px 18px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.06);
    height: 100%;
}
.chart-title {
    font-size: .9rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
}
</style>
