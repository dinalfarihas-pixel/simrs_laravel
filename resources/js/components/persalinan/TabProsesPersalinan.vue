<template>
    <div class="p-3">

        <!-- ── KALA I ─────────────────────────────────────────────────────── -->
        <Fieldset legend="Kala I — Pembukaan" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-3">
                    <label class="field-label">Mulai Kala I</label>
                    <DatePicker v-model="lp.kala1_mulai" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="onKalaTimeChange" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Pembukaan Lengkap (10 cm)</label>
                    <DatePicker v-model="lp.pembukaan_lengkap_jam" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="onKalaTimeChange" />
                </div>
                <div class="col-12 col-md-2">
                    <label class="field-label">Lama Kala I</label>
                    <div class="form-control form-control-sm bg-light">{{ kala1LamaLabel }}</div>
                </div>
                <div class="col-12 col-md-2">
                    <label class="field-label">Pembukaan saat MRS (cm)</label>
                    <InputNumber v-model="lp.pembukaan_mrs" :min="0" :max="10"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emitProses" />
                </div>
                <div class="col-12 col-md-2 d-flex align-items-end">
                    <Button label="Buka Partograf" icon="pi pi-chart-line"
                        severity="secondary" outlined size="small" class="w-100"
                        @click="$emit('open-partograf')" />
                </div>

                <div class="col-12 col-md-3">
                    <label class="field-label">HIS — Frekuensi</label>
                    <InputText v-model="lp.his_frekuensi" class="w-100"
                        placeholder="mis. 3x/10 mnt" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">HIS — Durasi</label>
                    <InputText v-model="lp.his_durasi" class="w-100"
                        placeholder="mis. 40 dtk" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">DJJ (x/menit)</label>
                    <InputText v-model="lp.djj" class="w-100"
                        placeholder="mis. 140" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Penurunan Kepala</label>
                    <InputText v-model="lp.penurunan_kepala" class="w-100"
                        placeholder="mis. 3/5 · Hodge II" :disabled="readonly" @input="emitProses" />
                </div>

                <!-- Ketuban -->
                <div class="col-12 col-md-3">
                    <label class="field-label">Status Ketuban</label>
                    <Select v-model="lp.ketuban_status" :options="opsiKetuban"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emitProses" />
                </div>
                <div v-if="lp.ketuban_status === 'pecah'" class="col-12 col-md-3">
                    <label class="field-label">Jam Pecah Ketuban</label>
                    <DatePicker v-model="lp.ketuban_jam_pecah" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="emitProses" />
                </div>
                <div v-if="lp.ketuban_status === 'pecah'" class="col-12 col-md-3">
                    <label class="field-label">Warna Ketuban</label>
                    <Select v-model="lp.ketuban_warna" :options="opsiWarnaKetuban"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emitProses" />
                </div>
            </div>
        </Fieldset>

        <!-- ── KALA II ────────────────────────────────────────────────────── -->
        <Fieldset legend="Kala II — Pengeluaran" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-3">
                    <label class="field-label">Mulai Kala II</label>
                    <DatePicker v-model="lp.kala2_mulai" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="onKalaTimeChange" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Lama Kala II</label>
                    <div class="form-control form-control-sm bg-light">{{ kala2LamaLabel }}</div>
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Presentasi</label>
                    <InputText v-model="lp.presentasi" class="w-100"
                        placeholder="mis. Kepala, belakang kepala" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Lilitan Tali Pusat</label>
                    <InputText v-model="lp.lilitan_tali_pusat" class="w-100"
                        placeholder="mis. Tidak ada / 1× longgar" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12">
                    <label class="field-label">Catatan Kala II</label>
                    <Textarea v-model="lp.catatan_kala2" rows="2" class="w-100"
                        :disabled="readonly" @input="emitProses" />
                </div>
            </div>
        </Fieldset>

        <!-- ── KALA III ───────────────────────────────────────────────────── -->
        <Fieldset legend="Kala III — Pelepasan Plasenta" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-3">
                    <label class="field-label">Mulai Kala III</label>
                    <DatePicker v-model="lp.kala3_mulai" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="onKalaTimeChange" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Lama Kala III</label>
                    <div class="form-control form-control-sm bg-light">{{ kala3LamaLabel }}</div>
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">MAK III</label>
                    <Select v-model="lp.mak3" :options="opsiMak3"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Oksitosin — Jam Pemberian</label>
                    <DatePicker v-model="lp.oksitosin_waktu" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Cara Lahir Plasenta</label>
                    <Select v-model="lp.plasenta_lahir" :options="opsiPlasentaLahir"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Jam Plasenta Lahir</label>
                    <DatePicker v-model="lp.plasenta_jam" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="emitProses" />
                </div>
                <div class="col-12 col-md-6">
                    <label class="field-label">Kelengkapan Plasenta</label>
                    <InputText v-model="lp.kelengkapan_plasenta" class="w-100"
                        placeholder="Lengkap / Tidak lengkap — uraikan" :disabled="readonly" @input="emitProses" />
                </div>
            </div>
        </Fieldset>

        <!-- ── KALA IV ────────────────────────────────────────────────────── -->
        <Fieldset legend="Kala IV — Observasi 2 Jam" :toggleable="true" class="mb-3">
            <!-- Ringkasan -->
            <div class="row g-3 mb-3">
                <div class="col-12 col-md-3">
                    <label class="field-label">Kontraksi Uterus</label>
                    <InputText v-model="lp.kontraksi_uterus" class="w-100"
                        placeholder="Baik / Sedang / Lemah" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">TFU</label>
                    <InputText v-model="lp.tfu_kala4" class="w-100"
                        placeholder="mis. 2 jari bawah pusat" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Kandung Kemih</label>
                    <InputText v-model="lp.kandung_kemih_kala4" class="w-100"
                        placeholder="Kosong / Penuh" :disabled="readonly" @input="emitProses" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Total Perdarahan Kala IV (cc)</label>
                    <InputNumber v-model="lp.total_perdarahan_kala4" :min="0"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emitProses" />
                </div>
            </div>

            <!-- Tabel monitoring time-series -->
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-semibold small">Monitoring Berkala</span>
                <Button v-if="!readonly && localMonitoring.length === 0"
                    label="Inisiasi 6 Baris Observasi" icon="pi pi-plus"
                    severity="secondary" outlined size="small"
                    @click="initMonitoring" />
            </div>

            <div class="table-responsive">
                <table class="table table-sm table-bordered align-middle" style="font-size:.82rem">
                    <thead class="table-secondary">
                        <tr>
                            <th style="width:40px">#</th>
                            <th>Waktu</th>
                            <th>TD (mmHg)</th>
                            <th>Nadi (/mnt)</th>
                            <th>Suhu (°C)</th>
                            <th>TFU</th>
                            <th>Kontraksi</th>
                            <th>Kandung Kemih</th>
                            <th>Perdarahan (cc)</th>
                            <th v-if="!readonly" style="width:40px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(obs, idx) in localMonitoring" :key="idx">
                            <td class="text-center text-muted">{{ idx + 1 }}</td>
                            <td>
                                <DatePicker v-model="obs.waktu" showTime hourFormat="24"
                                    dateFormat="dd/mm" showIcon
                                    inputClass="form-control form-control-sm p-0"
                                    style="width:140px" :disabled="readonly"
                                    @update:modelValue="emitMonitoring" />
                            </td>
                            <td>
                                <div class="d-flex gap-1" style="width:110px">
                                    <InputNumber v-model="obs.tekanan_darah_sistolik" :min="0" :max="300"
                                        inputClass="form-control form-control-sm p-1 text-center"
                                        :disabled="readonly" @update:modelValue="emitMonitoring"
                                        placeholder="Sis" />
                                    <span class="align-self-center">/</span>
                                    <InputNumber v-model="obs.tekanan_darah_diastolik" :min="0" :max="200"
                                        inputClass="form-control form-control-sm p-1 text-center"
                                        :disabled="readonly" @update:modelValue="emitMonitoring"
                                        placeholder="Dia" />
                                </div>
                            </td>
                            <td>
                                <InputNumber v-model="obs.nadi" :min="0" :max="300"
                                    inputClass="form-control form-control-sm p-1 text-center"
                                    style="width:70px" :disabled="readonly"
                                    @update:modelValue="emitMonitoring" />
                            </td>
                            <td>
                                <InputNumber v-model="obs.suhu" :min="30" :max="42" :minFractionDigits="1" :maxFractionDigits="1"
                                    inputClass="form-control form-control-sm p-1 text-center"
                                    style="width:70px" :disabled="readonly"
                                    @update:modelValue="emitMonitoring" />
                            </td>
                            <td>
                                <InputText v-model="obs.tfu"
                                    class="form-control form-control-sm p-1" style="width:100px"
                                    :disabled="readonly" @input="emitMonitoring" />
                            </td>
                            <td>
                                <Select v-model="obs.kontraksi" :options="opsiKontraksi"
                                    optionLabel="label" optionValue="value"
                                    style="width:100px" :disabled="readonly"
                                    @change="emitMonitoring" />
                            </td>
                            <td>
                                <Select v-model="obs.kandung_kemih" :options="opsiKandungKemih"
                                    optionLabel="label" optionValue="value"
                                    style="width:100px" :disabled="readonly"
                                    @change="emitMonitoring" />
                            </td>
                            <td>
                                <InputNumber v-model="obs.perdarahan" :min="0"
                                    inputClass="form-control form-control-sm p-1 text-center"
                                    style="width:70px" :disabled="readonly"
                                    @update:modelValue="emitMonitoring" />
                            </td>
                            <td v-if="!readonly" class="text-center">
                                <Button icon="pi pi-times" severity="danger" text rounded size="small"
                                    @click="removeObs(idx)" />
                            </td>
                        </tr>
                        <tr v-if="localMonitoring.length === 0">
                            <td :colspan="readonly ? 9 : 10" class="text-center text-muted py-3">
                                Belum ada data monitoring. Klik "Inisiasi 6 Baris Observasi".
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Button v-if="!readonly && localMonitoring.length > 0"
                label="Tambah Baris" icon="pi pi-plus"
                severity="secondary" outlined size="small"
                @click="addObs" />
        </Fieldset>

        <!-- ── JENIS PERSALINAN ───────────────────────────────────────────── -->
        <Fieldset legend="Cara / Jenis Persalinan" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12">
                    <label class="field-label">Jenis Persalinan <span class="text-danger">*</span></label>
                    <div class="d-flex flex-wrap gap-3">
                        <div v-for="jp in opsiJenisPersalinan" :key="jp.value"
                            class="d-flex align-items-center gap-2">
                            <RadioButton v-model="lp.jenis_persalinan"
                                :inputId="`jp_${jp.value}`" :value="jp.value"
                                :disabled="readonly" @change="emitProses" />
                            <label :for="`jp_${jp.value}`" class="field-label mb-0">{{ jp.label }}</label>
                        </div>
                    </div>
                </div>

                <div v-if="lp.jenis_persalinan && lp.jenis_persalinan !== 'Spontan'" class="col-12 col-md-8">
                    <label class="field-label">Indikasi Tindakan</label>
                    <Textarea v-model="lp.indikasi_tindakan" rows="2" class="w-100"
                        placeholder="Uraikan indikasi dilakukannya tindakan"
                        :disabled="readonly" @input="emitProses" />
                </div>

                <div v-if="lp.jenis_persalinan === 'SC'" class="col-12 col-md-4">
                    <label class="field-label">Jenis Anestesi</label>
                    <InputText v-model="lp.anestesi_sc" class="w-100"
                        placeholder="mis. SAB / GA" :disabled="readonly" @input="emitProses" />
                </div>
            </div>
        </Fieldset>

    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import Fieldset from 'primevue/fieldset'

const props = defineProps({
    proses:          { type: Object,  required: true },
    kala4Monitoring: { type: Array,   default: () => [] },
    readonly:        { type: Boolean, default: false },
})
const emits = defineEmits(['update:proses', 'update:kala4Monitoring', 'open-partograf'])

const lp = reactive({ ...props.proses })
const localMonitoring = ref(props.kala4Monitoring.map(r => ({
    ...r,
    waktu: r.waktu ? new Date(r.waktu) : null,
})))

watch(() => props.proses,          (v) => Object.assign(lp, v), { deep: true })
watch(() => props.kala4Monitoring, (v) => {
    localMonitoring.value = v.map(r => ({ ...r, waktu: r.waktu ? new Date(r.waktu) : null }))
}, { deep: true })

function emitProses()    { emits('update:proses', { ...lp }) }
function emitMonitoring(){ emits('update:kala4Monitoring', localMonitoring.value.map(r => ({ ...r }))) }

// ── Auto-hitung lama kala ─────────────────────────────────────────────────────
function onKalaTimeChange() {
    if (lp.kala1_mulai && lp.pembukaan_lengkap_jam) {
        lp.kala1_lama_menit = Math.round((lp.pembukaan_lengkap_jam - lp.kala1_mulai) / 60000)
    }
    if (lp.pembukaan_lengkap_jam && lp.kala2_mulai) {
        // kala 2 mulai = pembukaan lengkap
        lp.kala2_lama_menit = lp.kala3_mulai
            ? Math.round((lp.kala3_mulai - lp.pembukaan_lengkap_jam) / 60000)
            : null
    }
    if (lp.kala3_mulai && lp.plasenta_jam) {
        lp.kala3_lama_menit = Math.round((lp.plasenta_jam - lp.kala3_mulai) / 60000)
    }
    emitProses()
}

const kala1LamaLabel = computed(() => formatMenit(lp.kala1_lama_menit))
const kala2LamaLabel = computed(() => formatMenit(lp.kala2_lama_menit))
const kala3LamaLabel = computed(() => formatMenit(lp.kala3_lama_menit))

function formatMenit(m) {
    if (m == null || isNaN(m)) return '—'
    const h = Math.floor(m / 60)
    const mn = m % 60
    return h > 0 ? `${h} jam ${mn} mnt` : `${mn} mnt`
}

// ── Monitoring Kala IV ────────────────────────────────────────────────────────
function blankObs() {
    return {
        waktu: null, tekanan_darah_sistolik: null, tekanan_darah_diastolik: null,
        nadi: null, suhu: null, tfu: '', kontraksi: null, kandung_kemih: null, perdarahan: null,
    }
}

function initMonitoring() {
    // 4 baris jam pertama (tiap 15 mnt) + 2 baris jam kedua (tiap 30 mnt)
    const base = lp.kala3_mulai ? new Date(lp.kala3_mulai) : new Date()
    const rows = []
    for (let i = 1; i <= 4; i++) {
        const t = new Date(base)
        t.setMinutes(t.getMinutes() + i * 15)
        rows.push({ ...blankObs(), waktu: t })
    }
    for (let i = 1; i <= 2; i++) {
        const t = new Date(base)
        t.setMinutes(t.getMinutes() + 60 + i * 30)
        rows.push({ ...blankObs(), waktu: t })
    }
    localMonitoring.value = rows
    emitMonitoring()
}

function addObs() {
    localMonitoring.value.push(blankObs())
    emitMonitoring()
}

function removeObs(idx) {
    localMonitoring.value.splice(idx, 1)
    emitMonitoring()
}

// ── Options ───────────────────────────────────────────────────────────────────
const opsiKetuban       = [{ label: 'Utuh', value: 'utuh' }, { label: 'Sudah Pecah', value: 'pecah' }]
const opsiWarnaKetuban  = [
    { label: 'Jernih', value: 'jernih' },
    { label: 'Mekonium', value: 'mekonium' },
    { label: 'Bercampur darah', value: 'darah' },
]
const opsiMak3          = [
    { label: 'Ya (MAK III)', value: 'Ya' },
    { label: 'Tidak', value: 'Tidak' },
    { label: 'Lengkap', value: 'Lengkap' },
]
const opsiPlasentaLahir = [{ label: 'Spontan', value: 'spontan' }, { label: 'Manual', value: 'manual' }]
const opsiJenisPersalinan = [
    { label: 'Spontan Pervaginam', value: 'Spontan' },
    { label: 'Vakum Ekstraksi',    value: 'Vakum' },
    { label: 'Forcep',             value: 'Forcep' },
    { label: 'Sectio Caesarea',    value: 'SC' },
    { label: 'VBAC',               value: 'VBAC' },
]
const opsiKontraksi    = [
    { label: 'Baik',   value: 'Baik' },
    { label: 'Sedang', value: 'Sedang' },
    { label: 'Lemah',  value: 'Lemah' },
]
const opsiKandungKemih = [
    { label: 'Kosong',  value: 'Kosong' },
    { label: 'Penuh',   value: 'Penuh' },
    { label: 'Kateter', value: 'Kateter' },
]
</script>

<style scoped>
.field-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.35px;
    margin-bottom: 4px;
}
.field-label.mb-0 {
    margin-left: 6px;
    cursor: pointer;
}
</style>
