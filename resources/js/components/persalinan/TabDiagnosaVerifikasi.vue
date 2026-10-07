<template>
    <div class="p-3">

        <!-- ── A. ICD-10 ──────────────────────────────────────────────────── -->
        <Fieldset legend="A — Diagnosa ICD-10" :toggleable="true" class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="small text-muted">Fokus: O80–O84 (jenis persalinan), O70.x (komplikasi), Z37.x (luaran bayi)</span>
                <Button v-if="!readonly"
                    label="Tambah Kode ICD" icon="pi pi-plus"
                    severity="secondary" outlined size="small"
                    @click="addIcd" />
            </div>

            <div v-if="localIcd.length === 0" class="text-center text-muted py-3">
                Belum ada kode ICD-10. Klik "Tambah Kode ICD".
            </div>

            <div v-for="(icd, idx) in localIcd" :key="idx" class="row g-2 mb-2 align-items-center">
                <!-- Primer flag -->
                <div class="col-auto d-flex align-items-center gap-2">
                    <RadioButton v-model="primerIdx" :value="idx"
                        :inputId="`icd_primer_${idx}`"
                        :disabled="readonly"
                        @change="onPrimerChange" />
                    <label :for="`icd_primer_${idx}`" class="field-label mb-0">
                        <Tag v-if="primerIdx === idx" severity="danger" value="Utama" />
                        <span v-else class="text-muted small">Set Utama</span>
                    </label>
                </div>

                <!-- Kode ICD -->
                <div class="col-12 col-md-2">
                    <AutoComplete
                        v-model="icd.kode"
                        :suggestions="icdSuggestions"
                        optionLabel="kode"
                        forceSelection
                        placeholder="Kode ICD"
                        style="width:100%"
                        :disabled="readonly"
                        @complete="searchIcd($event.query)"
                        @item-select="e => { icd.kode = e.value.kode; icd.deskripsi = e.value.deskripsi; emitIcd() }"
                        @input="emitIcd"
                    >
                        <template #option="{ option }">
                            <span class="fw-bold me-2">{{ option.kode }}</span>
                            <small class="text-muted">{{ option.deskripsi }}</small>
                        </template>
                    </AutoComplete>
                </div>

                <!-- Deskripsi -->
                <div class="col">
                    <InputText v-model="icd.deskripsi" class="w-100"
                        placeholder="Deskripsi ICD-10"
                        :disabled="readonly" @input="emitIcd" />
                </div>

                <!-- Hapus -->
                <div v-if="!readonly" class="col-auto">
                    <Button icon="pi pi-times" severity="danger" text rounded size="small"
                        @click="removeIcd(idx)" />
                </div>
            </div>

            <!-- Diagnosa naratif -->
            <div class="mt-3">
                <label class="field-label">Diagnosa Naratif</label>
                <Textarea v-model="localDiagnosa.diagnosa_naratif" rows="3" class="w-100"
                    placeholder="Uraikan diagnosa secara naratif / klinis"
                    :disabled="readonly" @input="emitDiagnosa" />
            </div>
        </Fieldset>

        <!-- ── B. Verifikasi ──────────────────────────────────────────────── -->
        <Fieldset legend="B — Verifikasi & Tanda Tangan" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-4">
                    <label class="field-label">Waktu Pencatatan</label>
                    <DatePicker v-model="localDiagnosa.waktu_pencatatan" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" showIcon
                        style="width:100%" :disabled="readonly"
                        @update:modelValue="emitDiagnosa" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Diinput Oleh</label>
                    <InputText v-model="localDiagnosa.diinput_oleh" class="w-100"
                        :disabled="true" />
                </div>
            </div>

            <!-- TTD DPJP -->
            <div class="row g-3 mt-1">
                <div class="col-12">
                    <span class="fw-semibold small">Tanda Tangan Petugas</span>
                </div>
                <div class="col-12 col-md-4">
                    <div class="border rounded p-3">
                        <div class="text-center fw-semibold small mb-2">
                            <i class="pi pi-user-edit me-1"></i> DPJP (Sp.OG)
                        </div>
                        <div class="mb-2">
                            <label class="field-label">ID / No. Pegawai DPJP</label>
                            <InputText v-model="localDiagnosa.dpjp_id" class="w-100"
                                :disabled="readonly" @input="emitDiagnosa" />
                        </div>
                        <div>
                            <label class="field-label">Nama DPJP</label>
                            <InputText v-model="localDiagnosa.dpjp_nama" class="w-100"
                                :placeholder="dpjpNama || 'Nama DPJP'"
                                :disabled="readonly" @input="emitDiagnosa" />
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="border rounded p-3">
                        <div class="text-center fw-semibold small mb-2">
                            <i class="pi pi-user me-1"></i> Bidan Penolong
                        </div>
                        <div class="mb-2">
                            <label class="field-label">ID / No. Pegawai Bidan</label>
                            <InputText v-model="localDiagnosa.bidan_id" class="w-100"
                                :disabled="readonly" @input="emitDiagnosa" />
                        </div>
                        <div>
                            <label class="field-label">Nama Bidan</label>
                            <InputText v-model="localDiagnosa.bidan_nama" class="w-100"
                                placeholder="Nama bidan penolong"
                                :disabled="readonly" @input="emitDiagnosa" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status final -->
            <div class="mt-3">
                <Message v-if="readonly" severity="error" :closable="false">
                    <i class="pi pi-lock me-1"></i>
                    <strong>Rekam medis ini sudah DIFINALISASI dan TERKUNCI.</strong>
                    Tidak dapat dilakukan perubahan.
                </Message>
                <Message v-else severity="info" :closable="false">
                    <i class="pi pi-info-circle me-1"></i>
                    Status: <strong>Draft</strong>. Gunakan tombol
                    <strong>"Finalisasi & Kunci RM"</strong> di header untuk mengunci rekam medis ini.
                </Message>
            </div>
        </Fieldset>

        <!-- ── Saran ICD Persalinan ───────────────────────────────────────── -->
        <Fieldset legend="Referensi Cepat ICD-10 Persalinan" :toggleable="true" :collapsed="true" class="mb-3">
            <div class="table-responsive">
                <table class="table table-sm table-bordered" style="font-size:.82rem">
                    <thead class="table-secondary">
                        <tr><th>Kode</th><th>Deskripsi</th><th v-if="!readonly"></th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="ref in icdReferensi" :key="ref.kode">
                            <td><code>{{ ref.kode }}</code></td>
                            <td>{{ ref.deskripsi }}</td>
                            <td v-if="!readonly">
                                <Button label="Pakai" size="small" severity="secondary" outlined
                                    @click="pakaIcd(ref)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fieldset>

    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import Fieldset from 'primevue/fieldset'

const props = defineProps({
    diagnosa:  { type: Object, required: true },
    icdList:   { type: Array,  default: () => [] },
    readonly:  { type: Boolean, default: false },
    username:  { type: String,  default: '' },
    dpjpNama:  { type: String,  default: '' },
})
const emits = defineEmits(['update:diagnosa', 'update:icdList'])

const localDiagnosa = reactive({ ...props.diagnosa })
const localIcd      = ref(props.icdList.map(i => ({ ...i })))
const primerIdx     = ref(props.icdList.findIndex(i => i.is_primer))
const icdSuggestions = ref([])

watch(() => props.diagnosa, (v) => Object.assign(localDiagnosa, v), { deep: true })
watch(() => props.icdList, (v) => {
    localIcd.value  = v.map(i => ({ ...i }))
    primerIdx.value = v.findIndex(i => i.is_primer)
}, { deep: true })

// Set waktu pencatatan default saat pertama load (jika kosong)
onMounted(() => {
    if (!localDiagnosa.waktu_pencatatan) {
        localDiagnosa.waktu_pencatatan = new Date()
        emitDiagnosa()
    }
    if (!localDiagnosa.diinput_oleh) {
        localDiagnosa.diinput_oleh = props.username
        emitDiagnosa()
    }
})

function emitDiagnosa() {
    emits('update:diagnosa', { ...localDiagnosa })
}

function emitIcd() {
    emits('update:icdList', localIcd.value.map((icd, i) => ({
        ...icd,
        is_primer: i === primerIdx.value ? 1 : 0,
    })))
}

function addIcd() {
    localIcd.value.push({ kode: '', deskripsi: '', is_primer: 0 })
    emitIcd()
}

function removeIcd(idx) {
    localIcd.value.splice(idx, 1)
    if (primerIdx.value >= localIcd.value.length) primerIdx.value = -1
    emitIcd()
}

function onPrimerChange() {
    emitIcd()
}

function pakaIcd(ref) {
    localIcd.value.push({ kode: ref.kode, deskripsi: ref.deskripsi, is_primer: 0 })
    emitIcd()
}

// Autocomplete ICD (hit API bila ada, fallback ke daftar referensi)
async function searchIcd(query) {
    if (!query || query.length < 2) {
        icdSuggestions.value = icdReferensi.filter(r =>
            r.kode.toLowerCase().includes(query.toLowerCase()) ||
            r.deskripsi.toLowerCase().includes(query.toLowerCase())
        )
        return
    }
    try {
        const res = await axios.post('/datareferensi/search_icd', { q: query })
        icdSuggestions.value = res.data?.response ?? []
    } catch {
        icdSuggestions.value = icdReferensi.filter(r =>
            r.kode.toLowerCase().includes(query.toLowerCase()) ||
            r.deskripsi.toLowerCase().includes(query.toLowerCase())
        )
    }
}

// Referensi ICD-10 persalinan (data lokal cepat)
const icdReferensi = [
    { kode: 'O80',   deskripsi: 'Single spontaneous delivery' },
    { kode: 'O80.0', deskripsi: 'Spontaneous vertex delivery' },
    { kode: 'O81',   deskripsi: 'Single delivery by forceps and vacuum extractor' },
    { kode: 'O82',   deskripsi: 'Single delivery by caesarean section' },
    { kode: 'O82.0', deskripsi: 'Elective caesarean delivery' },
    { kode: 'O82.1', deskripsi: 'Emergency caesarean delivery' },
    { kode: 'O84',   deskripsi: 'Multiple delivery' },
    { kode: 'O70.0', deskripsi: 'First degree perineal laceration during delivery' },
    { kode: 'O70.1', deskripsi: 'Second degree perineal laceration during delivery' },
    { kode: 'O70.2', deskripsi: 'Third degree perineal laceration during delivery' },
    { kode: 'O70.3', deskripsi: 'Fourth degree perineal laceration during delivery' },
    { kode: 'O72.0', deskripsi: 'Third-stage haemorrhage (HPP)' },
    { kode: 'O72.1', deskripsi: 'Other immediate postpartum haemorrhage' },
    { kode: 'O73',   deskripsi: 'Retained placenta and membranes' },
    { kode: 'O62.2', deskripsi: 'Uterine inertia (Atonia uteri)' },
    { kode: 'O14',   deskripsi: 'Pre-eclampsia' },
    { kode: 'O15',   deskripsi: 'Eclampsia' },
    { kode: 'Z37.0', deskripsi: 'Single live birth' },
    { kode: 'Z37.1', deskripsi: 'Single stillbirth' },
    { kode: 'Z37.2', deskripsi: 'Twins, both liveborn' },
    { kode: 'Z37.3', deskripsi: 'Twins, one liveborn and one stillborn' },
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
