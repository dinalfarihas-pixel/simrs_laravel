<template>
    <Toast />
    <div class="content">

        <!-- ═══ KARTU DATA PASIEN ═════════════════════════════════════════════ -->
        <Card class="mb-3">
            <template #content>
                <!-- Loading skeleton -->
                <div v-if="isLoadingPasien" class="text-center py-3">
                    <ProgressBar mode="indeterminate" style="height:.3em" />
                    <small class="text-muted mt-2 d-block">Memuat data pasien…</small>
                </div>

                <!-- Data tersedia -->
                <div v-else-if="dataPasien.DATA_SINGKAT" class="pasien-card-grid">

                    <!-- Kolom 1: Avatar + Nama + Tags -->
                    <div class="pasien-col-identity">
                        <div class="d-flex align-items-start gap-3">
                            <div class="pasien-avatar">
                                <i :class="dataPasien.JENISKELAMIN === 'L' ? 'pi pi-user text-primary' : 'pi pi-user text-danger'"
                                   style="font-size:1.5rem"></i>
                            </div>
                            <div>
                                <div class="pasien-nama">{{ dataPasien.DATA_SINGKAT }}</div>
                                <div class="pasien-sub mt-1">
                                    No. RM: <strong>{{ dataPasien.NOMR || '—' }}</strong>
                                    &nbsp;·&nbsp;
                                    Reg: <code>{{ noregister }}</code>
                                </div>
                                <div class="d-flex flex-wrap gap-1 mt-2">
                                    <Tag
                                        :severity="dataPasien.JENISKELAMIN === 'L' ? 'info' : 'danger'"
                                        :icon="dataPasien.JENISKELAMIN === 'L' ? 'pi pi-mars' : 'pi pi-venus'"
                                        :value="dataPasien.JENISKELAMIN === 'L' ? 'Laki-laki' : 'Perempuan'"
                                    />
                                    <Tag severity="secondary"
                                        :value="(dataPasien.USIA_PASIEN?.tahun ?? '?') + ' Thn ' + (dataPasien.USIA_PASIEN?.bulan ?? 0) + ' Bln'"
                                    />
                                    <Tag severity="warn" icon="pi pi-plus-circle" value="ICU / HCU" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Garis pemisah vertikal -->
                    <div class="pasien-divider"></div>

                    <!-- Kolom 2: Info Kunjungan -->
                    <div class="pasien-col-info">
                        <div class="pasien-info-row">
                            <i class="pi pi-calendar text-muted"></i>
                            <span>Masuk</span>
                            <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong>
                        </div>
                        <div class="pasien-info-row">
                            <i class="pi pi-user-edit text-muted"></i>
                            <span>DPJP</span>
                            <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong>
                        </div>
                        <div class="pasien-info-row">
                            <i class="pi pi-credit-card text-muted"></i>
                            <span>Bayar</span>
                            <strong>{{ dataPasien.CARABAYAR || '—' }}</strong>
                        </div>
                    </div>

                    <!-- Garis pemisah vertikal -->
                    <div class="pasien-divider"></div>

                    <!-- Kolom 3: Kontrol Monitoring -->
                    <div class="pasien-col-kontrol">
                        <div class="kontrol-label">
                            <i class="pi pi-calendar-clock me-1"></i>Tanggal Monitoring
                        </div>
                        <DatePicker
                            v-model="selectedDate"
                            :maxDate="today"
                            showIcon
                            dateFormat="dd/mm/yy"
                            inputClass="form-control form-control-sm"
                            style="width:100%;max-width:180px"
                        >
                            <template #date="{ date }">
                                <span class="cal-day">
                                    {{ date.day }}
                                    <span v-if="hasPemantauan(date.day, date.month, date.year)" class="cal-dot"></span>
                                </span>
                            </template>
                        </DatePicker>
                        <div class="kontrol-hari">{{ tglMonitoringLabel }}</div>
                        <div class="d-flex gap-2 mt-1">
                            <Button
                                label="Dummy"
                                icon="pi pi-database"
                                severity="secondary"
                                size="small"
                                outlined
                                class="flex-fill"
                                @click="loadDummy"
                                :disabled="isSaving || isLoadingData"
                            />
                            <Button
                                :label="isSaving ? 'Menyimpan...' : 'Simpan'"
                                :icon="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"
                                severity="success"
                                size="small"
                                class="flex-fill"
                                @click="onSave"
                                :disabled="isSaving || isLoadingData"
                            />
                        </div>
                    </div>
                </div>

                <!-- Pasien tidak ditemukan -->
                <div v-else class="pasien-card-grid">
                    <div class="pasien-col-identity">
                        <div class="d-flex align-items-center gap-3">
                            <div class="pasien-avatar">
                                <i class="pi pi-user text-muted" style="font-size:1.5rem"></i>
                            </div>
                            <div>
                                <div class="fw-semibold text-muted">Data pasien tidak ditemukan</div>
                                <code class="text-muted small">No. Register: {{ noregister || '-' }}</code>
                            </div>
                        </div>
                    </div>
                    <div class="pasien-divider"></div>
                    <div class="pasien-col-info"></div>
                    <div class="pasien-divider"></div>
                    <div class="pasien-col-kontrol">
                        <div class="kontrol-label">
                            <i class="pi pi-calendar-clock me-1"></i>Tanggal Monitoring
                        </div>
                        <DatePicker
                            v-model="selectedDate"
                            :maxDate="today"
                            showIcon
                            dateFormat="dd/mm/yy"
                            inputClass="form-control form-control-sm"
                            style="width:100%;max-width:180px"
                        >
                            <template #date="{ date }">
                                <span class="cal-day">
                                    {{ date.day }}
                                    <span v-if="hasPemantauan(date.day, date.month, date.year)" class="cal-dot"></span>
                                </span>
                            </template>
                        </DatePicker>
                        <div class="d-flex gap-2 mt-2">
                            <Button label="Dummy"  icon="pi pi-database" severity="secondary" size="small" outlined class="flex-fill" @click="loadDummy" :disabled="isSaving || isLoadingData" />
                            <Button :label="isSaving ? 'Menyimpan...' : 'Simpan'" :icon="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'" severity="success" size="small" class="flex-fill" @click="onSave" :disabled="isSaving || isLoadingData" />
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- ═══ TABS PEMANTAUAN ════════════════════════════════════════════════ -->
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="0">
                    <i class="pi pi-wave-pulse me-1"></i>
                    <span class="d-none d-sm-inline">Ringkasan &amp; </span>Vital Signs
                </Tab>
                <Tab value="1">
                    <i class="pi pi-sliders-h me-1"></i>
                    Ventilator<span class="d-none d-sm-inline"> &amp; Airway</span>
                </Tab>
                <Tab value="2">
                    <i class="pi pi-drop me-1"></i>
                    Balance<span class="d-none d-sm-inline"> Cairan</span>
                </Tab>
                <Tab value="3">
                    <i class="pi pi-chart-line me-1"></i>
                    Grafik<span class="d-none d-sm-inline"> Tren</span>
                </Tab>
                <Tab value="4">
                    <i class="pi pi-file-edit me-1"></i>
                    CPPT<span class="d-none d-sm-inline"> / SOAP</span>
                </Tab>
                <Tab value="5">
                    <i class="pi pi-tablet me-1"></i>
                    <span class="d-none d-sm-inline">Form Pemberian </span>Obat
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0"><TabRingkasanVitalSign /></TabPanel>
                <TabPanel value="1"><TabVentilatorAirway /></TabPanel>
                <TabPanel value="2"><TabBalanceCairan /></TabPanel>
                <TabPanel value="3"><TabGrafikTren /></TabPanel>
                <TabPanel value="4">
                    <soap-form
                        :noregister="noregister"
                        :datapasien="dataPasienForSoap"
                        :is-cppt="true"
                        :data_igd="null"
                        :is-input="true"
                    />
                </TabPanel>
                <TabPanel value="5">
                    <pemberian-obat :datapasien="dataPasienForObat" />
                </TabPanel>
            </TabPanels>
        </Tabs>

    </div>
</template>

<script setup>
import { ref, computed, provide, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useFormPemantauanICU, ICU_MONITORING_KEY } from './composables/useFormPemantauanICU'
import TabRingkasanVitalSign from './TabRingkasanVitalSign.vue'
import TabVentilatorAirway   from './TabVentilatorAirway.vue'
import TabBalanceCairan      from './TabBalanceCairan.vue'
import TabGrafikTren         from './TabGrafikTren.vue'

const toast = useToast()

const props = defineProps({
    noregister: { type: String, default: '' },
    username:   { type: String, default: '' },
})

// ── Resolve noregister (prop → URL fallback) ──────────────────────────────
const noregister = computed(() =>
    props.noregister || window.location.pathname.split('/').pop()
)

// ── Pasien ────────────────────────────────────────────────────────────────
const dataPasien      = ref({})
const isLoadingPasien = ref(false)

async function fetchDataPasien() {
    if (!noregister.value) return
    isLoadingPasien.value = true
    try {
        const res = await axios.post('/datapasienpertransaksi', {
            mode: 'history8',
            noregister: noregister.value,
        })
        dataPasien.value = res.data?.response?.[0] ?? {}
    } catch (e) {
        console.error('[ICU] fetchDataPasien:', e)
    } finally {
        isLoadingPasien.value = false
    }
}

// ── Mapping dataPasien untuk SoapComponent (butuh NAMAPASIEN & USIA_PASIEN.hari) ─
const dataPasienForSoap = computed(() => ({
    ...dataPasien.value,
    NAMAPASIEN: dataPasien.value.NAMAPASIEN || dataPasien.value.DATA_SINGKAT || '',
    USIA_PASIEN: {
        tahun: dataPasien.value.USIA_PASIEN?.tahun ?? 0,
        bulan: dataPasien.value.USIA_PASIEN?.bulan ?? 0,
        hari:  dataPasien.value.USIA_PASIEN?.hari  ?? 0,
    },
}))

// ── Mapping dataPasien untuk FormPemberianObat (butuh NOPENDAFTARAN & POLI) ──────
const dataPasienForObat = computed(() => ({
    ...dataPasien.value,
    NOPENDAFTARAN: dataPasien.value.NOPENDAFTARAN || noregister.value,
    POLI: dataPasien.value.POLI || dataPasien.value.NAMAPOLI || 'ICU/HCU',
}))

// ── Tanggal Monitoring ────────────────────────────────────────────────────
const activeTab     = ref('0')
const today         = new Date()
const selectedDate  = ref(new Date())
const isSaving        = ref(false)
const isLoadingData   = ref(false)
const datesWithData   = ref([])

const tglMonitoringLabel = computed(() => {
    if (!selectedDate.value) return '-'
    return selectedDate.value.toLocaleDateString('id-ID', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    })
})

function tglString(date) {
    const d = date || new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}

// ── State ICU ─────────────────────────────────────────────────────────────
const state = useFormPemantauanICU()
provide(ICU_MONITORING_KEY, state)

function loadDummy() {
    state.isiDummyData()
}

// ── Ambil daftar tanggal yang ada datanya ────────────────────────────────
async function fetchTanggalPemantauan() {
    if (!noregister.value) return
    try {
        const res = await axios.post('/icu/get_tanggal_pemantauan', { noregister: noregister.value })
        console.log('[ICU] fetchTanggalPemantauan:', res.data)
        if (res.data?.code === 200) datesWithData.value = res.data.response || []
    } catch (e) {
        console.error('[ICU] fetchTanggalPemantauan:', e)
    }
}

function hasPemantauan(day, month, year) {
    const str = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return datesWithData.value.includes(str)
}

// ── Load data dari server saat tanggal berubah ────────────────────────────
async function fetchPemantauan(date) {
    if (!noregister.value) return
    isLoadingData.value = true
    state.resetState()
    try {
        const res = await axios.post('/icu/get_pemantauan', {
            noregister:     noregister.value,
            tgl_monitoring: tglString(date),
        })
        const result = res.data
        if (result?.code === 200 && result?.response) {
            state.loadFromPayload(result.response)
        }
    } catch (e) {
        console.error('[ICU] fetchPemantauan:', e)
    } finally {
        isLoadingData.value = false
    }
}

watch(selectedDate, (newDate) => {
    if (newDate) fetchPemantauan(newDate)
})

// ── Simpan data ───────────────────────────────────────────────────────────
async function onSave() {
    if (isSaving.value) return
    isSaving.value = true
    try {
        const payload = state.buildPayload(noregister.value, tglString(selectedDate.value), props.username)
        const res = await axios.post('/icu/simpan_pemantauan', payload)
        const result = res.data
        if (result?.code === 200) {
            toast.add({ severity: 'success', summary: 'Berhasil', detail: result.message || 'Data pemantauan ICU berhasil disimpan', life: 3000 })
            fetchTanggalPemantauan()
        } else {
            toast.add({ severity: 'warn', summary: 'Gagal', detail: result?.message || 'Terjadi kesalahan saat menyimpan', life: 4000 })
        }
    } catch (e) {
        console.error('[ICU] onSave:', e)
        toast.add({ severity: 'error', summary: 'Error', detail: 'Koneksi ke server gagal', life: 4000 })
    } finally {
        isSaving.value = false
    }
}

// ── Init ──────────────────────────────────────────────────────────────────
onMounted(() => {
    fetchDataPasien()
    fetchPemantauan(selectedDate.value)
    fetchTanggalPemantauan()
})
</script>

<style scoped>
/* ── Grid utama kartu pasien ──────────────────────────────── */
.pasien-card-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 220px;
    align-items: center;
    gap: 0;
    min-height: 80px;
}

/* Kolom identitas (kiri) */
.pasien-col-identity { padding: 4px 16px 4px 0; }

/* Garis pemisah vertikal */
.pasien-divider {
    width: 1px;
    align-self: stretch;
    background: #dee2e6;
    margin: 0 16px;
}

/* Kolom info kunjungan (tengah) */
.pasien-col-info {
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* Kolom kontrol (kanan) */
.pasien-col-kontrol {
    padding: 4px 0 4px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* ── Avatar ───────────────────────────────────────────────── */
.pasien-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e3f2fd;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* ── Nama & sub ───────────────────────────────────────────── */
.pasien-nama {
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1.2;
}
.pasien-sub {
    color: #666;
    margin-top: 2px;
}

/* ── Baris info (Masuk / DPJP / Bayar) ───────────────────── */
.pasien-info-row {
    display: grid;
    grid-template-columns: 16px 44px 1fr;
    align-items: center;
    gap: 6px;
    color: #555;
}
.pasien-info-row span { color: #888; white-space: nowrap; }
.pasien-info-row strong { color: #222; }

/* ── Kontrol monitoring ───────────────────────────────────── */
.kontrol-label {
    font-weight: 600;
    color: #495057;
}
.kontrol-hari {
    color: #6c757d;
    min-height: 16px;
}

/* ── Dot indikator tanggal di DatePicker ──────────────────── */
.cal-day {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.cal-dot {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3b82f6;
    pointer-events: none;
}
:deep(.p-datepicker-day-selected) .cal-dot { background: #fff; }

/* ── Responsive: kolom tumpuk di mobile ───────────────────── */
@media (max-width: 768px) {
    .pasien-card-grid {
        grid-template-columns: 1fr;
    }
    .pasien-divider {
        width: auto;
        height: 1px;
        margin: 10px 0;
        align-self: auto;
    }
    .pasien-col-kontrol { max-width: 100%; }
}
</style>
