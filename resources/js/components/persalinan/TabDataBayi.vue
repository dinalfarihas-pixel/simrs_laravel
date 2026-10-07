<template>
    <div class="p-3">

        <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="fw-semibold">
                Jumlah bayi: <Tag :value="localBayi.length.toString()" severity="info" />
            </span>
            <Button v-if="!readonly"
                label="Tambah Bayi" icon="pi pi-plus"
                severity="success" size="small"
                @click="addBayi" />
        </div>

        <div v-if="localBayi.length === 0" class="text-center text-muted py-5">
            <i class="pi pi-heart" style="font-size:2rem"></i>
            <p class="mt-2">Belum ada data bayi. Klik "Tambah Bayi".</p>
        </div>

        <div v-for="(bayi, idx) in localBayi" :key="idx" class="mb-4">
            <Fieldset :legend="`Bayi ke-${idx + 1}`" :toggleable="true">

                <!-- Tombol hapus -->
                <template #legend>
                    <div class="d-flex align-items-center gap-2">
                        <span class="fw-semibold">Bayi ke-{{ idx + 1 }}</span>
                        <Button v-if="!readonly" icon="pi pi-trash" severity="danger"
                            text rounded size="small" @click="removeBayi(idx)" />
                    </div>
                </template>

                <!-- ── Data Dasar ── -->
                <div class="row g-3 mb-3">
                    <div class="col-12 col-md-3">
                        <label class="field-label">Jam Lahir</label>
                        <DatePicker v-model="bayi._jam_lahir_date" showTime hourFormat="24"
                            dateFormat="dd/mm/yy" showIcon
                            style="width:100%" :disabled="readonly"
                            @update:modelValue="v => { bayi._jam_lahir_date = v; emitAll() }" />
                    </div>
                    <div class="col-12 col-md-3">
                        <label class="field-label">Jenis Kelamin</label>
                        <div class="d-flex gap-3 mt-1">
                            <div class="d-flex align-items-center gap-2">
                                <RadioButton v-model="bayi.jenis_kelamin" :inputId="`jk_l_${idx}`"
                                    value="L" :disabled="readonly" @change="emitAll" />
                                <label :for="`jk_l_${idx}`" class="field-label mb-0">Laki-laki</label>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <RadioButton v-model="bayi.jenis_kelamin" :inputId="`jk_p_${idx}`"
                                    value="P" :disabled="readonly" @change="emitAll" />
                                <label :for="`jk_p_${idx}`" class="field-label mb-0">Perempuan</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <label class="field-label">Kondisi Lahir</label>
                        <Select v-model="bayi.kondisi_lahir" :options="opsiKondisiLahir"
                            optionLabel="label" optionValue="value"
                            placeholder="Pilih" class="w-100" :disabled="readonly"
                            @change="emitAll" />
                    </div>
                    <div class="col-12 col-md-3">
                        <label class="field-label">Anus</label>
                        <div class="d-flex gap-3 mt-1">
                            <div class="d-flex align-items-center gap-2">
                                <RadioButton v-model="bayi.anus" :inputId="`anus_plus_${idx}`"
                                    value="+" :disabled="readonly" @change="emitAll" />
                                <label :for="`anus_plus_${idx}`" class="field-label mb-0">+ (Ada)</label>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <RadioButton v-model="bayi.anus" :inputId="`anus_min_${idx}`"
                                    value="-" :disabled="readonly" @change="emitAll" />
                                <label :for="`anus_min_${idx}`" class="field-label mb-0">− (Atresia)</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ── Antropometri ── -->
                <div class="row g-3 mb-3">
                    <div class="col-6 col-md-3">
                        <label class="field-label">BB (gram)</label>
                        <InputNumber v-model="bayi.bb" :min="0" :max="8000"
                            style="width:100%"
                            :disabled="readonly" @update:modelValue="emitAll" />
                    </div>
                    <div class="col-6 col-md-3">
                        <label class="field-label">PB (cm)</label>
                        <InputNumber v-model="bayi.pb" :minFractionDigits="1" :maxFractionDigits="1"
                            style="width:100%"
                            :disabled="readonly" @update:modelValue="emitAll" />
                    </div>
                    <div class="col-6 col-md-3">
                        <label class="field-label">LK — Lingkar Kepala (cm)</label>
                        <InputNumber v-model="bayi.lk" :minFractionDigits="1" :maxFractionDigits="1"
                            style="width:100%"
                            :disabled="readonly" @update:modelValue="emitAll" />
                    </div>
                    <div class="col-6 col-md-3">
                        <label class="field-label">LD — Lingkar Dada (cm)</label>
                        <InputNumber v-model="bayi.ld" :minFractionDigits="1" :maxFractionDigits="1"
                            style="width:100%"
                            :disabled="readonly" @update:modelValue="emitAll" />
                    </div>
                    <div class="col-12">
                        <label class="field-label">Kelainan Kongenital</label>
                        <InputText v-model="bayi.kelainan_kongenital" class="w-100"
                            placeholder="Tidak ada / uraikan bila ada" :disabled="readonly" @input="emitAll" />
                    </div>
                </div>

                <!-- ── APGAR ── -->
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-semibold">Skor APGAR</span>
                        <div class="d-flex gap-2">
                            <Tag :severity="apgarSeverity(bayi.apgar_data?.m1?.tot)" :value="`Mnt 1: ${bayi.apgar_data?.m1?.tot ?? '—'}`" />
                            <Tag :severity="apgarSeverity(bayi.apgar_data?.m5?.tot)" :value="`Mnt 5: ${bayi.apgar_data?.m5?.tot ?? '—'}`" />
                            <Tag :severity="apgarSeverity(bayi.apgar_data?.m10?.tot)" :value="`Mnt 10: ${bayi.apgar_data?.m10?.tot ?? '—'}`" />
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered align-middle text-center">
                            <thead class="table-secondary">
                                <tr>
                                    <th style="text-align:left;min-width:160px">Kriteria</th>
                                    <th>Menit 1</th>
                                    <th>Menit 5</th>
                                    <th>Menit 10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="kr in apgarKriteria" :key="kr.key">
                                    <td style="text-align:left">
                                        <strong>{{ kr.singkatan }}</strong> — {{ kr.label }}
                                    </td>
                                    <td v-for="mnt in ['m1','m5','m10']" :key="mnt">
                                        <Select v-model="bayi.apgar_data[mnt][kr.key]"
                                            :options="[0,1,2]" :disabled="readonly"
                                            style="width:65px"
                                            @change="() => { recalcApgar(bayi, mnt); emitAll() }" />
                                    </td>
                                </tr>
                                <tr class="fw-bold table-light">
                                    <td style="text-align:left">TOTAL</td>
                                    <td>
                                        <Tag :severity="apgarSeverity(bayi.apgar_data?.m1?.tot)"
                                            :value="(bayi.apgar_data?.m1?.tot ?? '—').toString()" />
                                    </td>
                                    <td>
                                        <Tag :severity="apgarSeverity(bayi.apgar_data?.m5?.tot)"
                                            :value="(bayi.apgar_data?.m5?.tot ?? '—').toString()" />
                                    </td>
                                    <td>
                                        <Tag :severity="apgarSeverity(bayi.apgar_data?.m10?.tot)"
                                            :value="(bayi.apgar_data?.m10?.tot ?? '—').toString()" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- ── Profilaksis ── -->
                <div class="mb-3">
                    <label class="field-label fw-semibold">Profilaksis Neonatus</label>
                    <div class="d-flex flex-wrap gap-3 mt-1">
                        <div v-for="p in opsiProfilaksis" :key="p.value"
                            class="d-flex align-items-center gap-2">
                            <Checkbox v-model="bayi.profilaksis" :value="p.value"
                                :inputId="`prf_${idx}_${p.value}`"
                                :disabled="readonly" @change="emitAll" />
                            <label :for="`prf_${idx}_${p.value}`" class="field-label mb-0">
                                {{ p.label }}
                            </label>
                        </div>
                    </div>
                </div>

                <!-- ── Referensi RM Bayi ── -->
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label class="field-label">No RM Bayi (bila sudah terdaftar)</label>
                        <InputText v-model="bayi.ref_rm_bayi" class="w-100"
                            placeholder="No RM bayi" :disabled="readonly" @input="emitAll" />
                    </div>
                    <div class="col-12 col-md-4 d-flex align-items-end">
                        <Button label="New Ballard Score" icon="pi pi-external-link"
                            severity="secondary" outlined size="small"
                            @click="openBallard(bayi.ref_rm_bayi)" />
                    </div>
                </div>

            </Fieldset>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Fieldset from 'primevue/fieldset'

const props = defineProps({
    modelValue: { type: Array, default: () => [] },
    readonly:   { type: Boolean, default: false },
})
const emits = defineEmits(['update:modelValue'])

// ── APGAR zero-state ──────────────────────────────────────────────────────────
function blankApgar() {
    return {
        m1:  { A:0, P:0, G:0, R:0, Ac:0, tot:0 },
        m5:  { A:0, P:0, G:0, R:0, Ac:0, tot:0 },
        m10: { A:0, P:0, G:0, R:0, Ac:0, tot:0 },
    }
}

function blankBayi() {
    return {
        _jam_lahir_date: null,
        jam_lahir: null,
        jenis_kelamin: null, kondisi_lahir: null,
        bb: null, pb: null, lk: null, ld: null,
        anus: null, kelainan_kongenital: '',
        apgar_data: blankApgar(),
        profilaksis: [],
        ref_rm_bayi: '',
    }
}

// Hydrate dari props (jam_lahir string → Date)
function hydrateRow(b) {
    return {
        ...blankBayi(),
        ...b,
        _jam_lahir_date: b.jam_lahir ? new Date(b.jam_lahir) : null,
        apgar_data: b.apgar_data ?? blankApgar(),
        profilaksis: b.profilaksis ?? [],
    }
}

const localBayi = ref(props.modelValue.map(hydrateRow))

watch(() => props.modelValue, (v) => {
    localBayi.value = v.map(hydrateRow)
}, { deep: true })

function addBayi() {
    localBayi.value.push(blankBayi())
    emitAll()
}

function removeBayi(idx) {
    localBayi.value.splice(idx, 1)
    emitAll()
}

function recalcApgar(bayi, mnt) {
    const s = bayi.apgar_data[mnt]
    s.tot = (s.A ?? 0) + (s.P ?? 0) + (s.G ?? 0) + (s.R ?? 0) + (s.Ac ?? 0)
}

function emitAll() {
    const out = localBayi.value.map(b => ({
        ...b,
        jam_lahir: b._jam_lahir_date instanceof Date
            ? b._jam_lahir_date.toISOString().slice(0, 19).replace('T', ' ')
            : (b._jam_lahir_date || null),
    }))
    emits('update:modelValue', out)
}

function apgarSeverity(tot) {
    if (tot == null) return 'secondary'
    if (tot >= 7)    return 'success'
    if (tot >= 4)    return 'warn'
    return 'danger'
}

function openBallard(rm) {
    if (rm) window.open(`/ballard/${rm}`, '_blank')
}

const apgarKriteria = [
    { key: 'A',  singkatan: 'A', label: 'Appearance (Warna kulit)' },
    { key: 'P',  singkatan: 'P', label: 'Pulse (Denyut jantung)' },
    { key: 'G',  singkatan: 'G', label: 'Grimace (Refleks)' },
    { key: 'Ac', singkatan: 'A', label: 'Activity (Tonus otot)' },
    { key: 'R',  singkatan: 'R', label: 'Respiration (Pernapasan)' },
]

const opsiKondisiLahir = [
    { label: 'Hidup',      value: 'Hidup' },
    { label: 'Asfiksia',   value: 'Asfiksia' },
    { label: 'Lahir Mati', value: 'Lahir mati' },
]

const opsiProfilaksis = [
    { label: 'IMD (Inisiasi Menyusu Dini)',  value: 'IMD' },
    { label: 'Injeksi Vit K1',               value: 'VitK1' },
    { label: 'Salep Mata',                   value: 'SalepMata' },
    { label: 'Imunisasi Hep B (HB-0)',       value: 'HepB' },
    { label: 'Resusitasi Neonatus',          value: 'Resusitasi' },
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
