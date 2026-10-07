<template>
    <div class="p-3">

        <!-- ── A. Plasenta & Tali Pusat ──────────────────────────────────── -->
        <Fieldset legend="A — Plasenta & Tali Pusat" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-3">
                    <label class="field-label">Berat Plasenta (gram)</label>
                    <InputNumber v-model="local.plasenta_berat" :min="0" :max="1500"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emit" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Ukuran Plasenta</label>
                    <InputText v-model="local.plasenta_ukuran" class="w-100"
                        placeholder="mis. 20×18×3 cm" :disabled="readonly" @input="emit" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Insersio Tali Pusat</label>
                    <Select v-model="local.insersio_tali_pusat" :options="opsiInsersio"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emit" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Panjang Tali Pusat (cm)</label>
                    <InputNumber v-model="local.panjang_tali_pusat" :min="0" :max="150"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emit" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Jumlah Pembuluh Tali Pusat</label>
                    <InputText v-model="local.jumlah_pembuluh" class="w-100"
                        placeholder="mis. 2 arteri 1 vena" :disabled="readonly" @input="emit" />
                </div>
                <div class="col-12 col-md-8">
                    <label class="field-label">Kelengkapan Kotiledon & Selaput</label>
                    <InputText v-model="local.kelengkapan_kotiledon_selaput" class="w-100"
                        placeholder="Lengkap / Tidak lengkap — uraikan" :disabled="readonly" @input="emit" />
                </div>
            </div>
        </Fieldset>

        <!-- ── B. Perineum / Jalan Lahir ─────────────────────────────────── -->
        <Fieldset legend="B — Perineum / Jalan Lahir" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-4">
                    <label class="field-label">Kondisi Perineum</label>
                    <Select v-model="local.kondisi_perineum" :options="opsiKondisiPerineum"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emit" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Derajat Robekan</label>
                    <Select v-model="local.derajat_robekan" :options="opsiDerajatRobekan"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emit" />
                </div>

                <!-- Episiotomi -->
                <div class="col-12 col-md-4">
                    <label class="field-label">Episiotomi</label>
                    <div class="d-flex gap-3 mt-1">
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.episiotomi" inputId="epi_ya" :value="true"
                                :disabled="readonly" @change="emit" />
                            <label for="epi_ya" class="field-label mb-0">Ya</label>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.episiotomi" inputId="epi_tidak" :value="false"
                                :disabled="readonly" @change="emit" />
                            <label for="epi_tidak" class="field-label mb-0">Tidak</label>
                        </div>
                    </div>
                </div>

                <div v-if="local.episiotomi" class="col-12 col-md-4">
                    <label class="field-label">Jenis Episiotomi</label>
                    <Select v-model="local.jenis_episiotomi" :options="opsiJenisEpisiotomi"
                        optionLabel="label" optionValue="value"
                        placeholder="Pilih" class="w-100" :disabled="readonly"
                        @change="emit" />
                </div>

                <!-- Penjahitan -->
                <div class="col-12 col-md-4">
                    <label class="field-label">Penjahitan</label>
                    <div class="d-flex gap-3 mt-1">
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.penjahitan" inputId="jht_ya" :value="true"
                                :disabled="readonly" @change="emit" />
                            <label for="jht_ya" class="field-label mb-0">Ya</label>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.penjahitan" inputId="jht_tidak" :value="false"
                                :disabled="readonly" @change="emit" />
                            <label for="jht_tidak" class="field-label mb-0">Tidak</label>
                        </div>
                    </div>
                </div>

                <div v-if="local.penjahitan" class="col-12 col-md-4">
                    <label class="field-label">Anestesi Lokal</label>
                    <InputText v-model="local.anestesi_lokal" class="w-100"
                        placeholder="mis. Lidokain 1%" :disabled="readonly" @input="emit" />
                </div>
                <div v-if="local.penjahitan" class="col-12 col-md-4">
                    <label class="field-label">Jenis Benang</label>
                    <InputText v-model="local.jenis_benang" class="w-100"
                        placeholder="mis. Vicryl 2-0" :disabled="readonly" @input="emit" />
                </div>
            </div>
        </Fieldset>

        <!-- ── C. Perdarahan ─────────────────────────────────────────────── -->
        <Fieldset legend="C — Perdarahan" :toggleable="true" class="mb-3">
            <div class="row g-3 align-items-end">
                <div class="col-12 col-md-3">
                    <label class="field-label">Perdarahan Kala II + III (cc)</label>
                    <InputNumber v-model="local.perdarahan_kala23" :min="0"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="onPerdarahanChange" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Perdarahan Kala IV (cc)</label>
                    <InputNumber v-model="local.perdarahan_kala4_ibu" :min="0"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="onPerdarahanChange" />
                </div>
                <div class="col-12 col-md-3">
                    <label class="field-label">Total Perdarahan (cc)</label>
                    <div class="d-flex align-items-center gap-2">
                        <div class="form-control form-control-sm bg-light fw-bold">
                            {{ local.perdarahan_total ?? '—' }} cc
                        </div>
                        <Tag :severity="hppSeverity" :value="hppLabel" />
                    </div>
                </div>
                <div class="col-12">
                    <label class="field-label">Catatan Atonia / HPP</label>
                    <Textarea v-model="local.catatan_atonia_hpp" rows="2" class="w-100"
                        placeholder="Uraikan penanganan atonia / HPP bila ada"
                        :disabled="readonly" @input="emit" />
                </div>
            </div>

            <!-- Peringatan HPP -->
            <Message v-if="isHpp" severity="error" :closable="false" class="mt-2">
                <i class="pi pi-exclamation-triangle me-1"></i>
                <strong>WASPADA HPP!</strong> Total perdarahan ≥ 500 cc. Pastikan penanganan sudah dicatat.
            </Message>
        </Fieldset>

        <!-- ── D. Obat & Tindakan ─────────────────────────────────────────── -->
        <Fieldset legend="D — Obat & Tindakan" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <div class="col-12 col-md-4">
                    <label class="field-label">Uterotonika</label>
                    <InputText v-model="local.uterotonika" class="w-100"
                        placeholder="mis. Oksitosin 10 IU IM + Misoprostol 400 mcg" :disabled="readonly" @input="emit" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Cairan Infus</label>
                    <InputText v-model="local.cairan_infus" class="w-100"
                        placeholder="mis. RL 500 mL IV" :disabled="readonly" @input="emit" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="field-label">Antibiotik</label>
                    <InputText v-model="local.antibiotik" class="w-100"
                        placeholder="mis. Amoxicillin 500 mg 3×1" :disabled="readonly" @input="emit" />
                </div>

                <!-- Transfusi -->
                <div class="col-12 col-md-3">
                    <label class="field-label">Transfusi</label>
                    <div class="d-flex gap-3 mt-1">
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.transfusi" inputId="trf_ya" :value="true"
                                :disabled="readonly" @change="emit" />
                            <label for="trf_ya" class="field-label mb-0">Ya</label>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.transfusi" inputId="trf_tidak" :value="false"
                                :disabled="readonly" @change="emit" />
                            <label for="trf_tidak" class="field-label mb-0">Tidak</label>
                        </div>
                    </div>
                </div>
                <div v-if="local.transfusi" class="col-12 col-md-9">
                    <label class="field-label">Detail Transfusi</label>
                    <InputText v-model="local.detail_transfusi" class="w-100"
                        placeholder="mis. PRC 1 kolf, Gol. darah A, cross match cocok" :disabled="readonly" @input="emit" />
                </div>
            </div>
        </Fieldset>

        <!-- ── E. Komplikasi ──────────────────────────────────────────────── -->
        <Fieldset legend="E — Komplikasi Ibu" :toggleable="true" class="mb-3">
            <div class="row g-2 mb-3">
                <!-- Tidak ada komplikasi (eksklusif) -->
                <div class="col-12">
                    <div class="d-flex align-items-center gap-2">
                        <Checkbox v-model="tidakAdaKomplikasi" :binary="true"
                            inputId="tidak_ada_komplikasi"
                            :disabled="readonly"
                            @change="onTidakAdaChange" />
                        <label for="tidak_ada_komplikasi" class="field-label mb-0 fw-semibold text-success">
                            Tidak ada komplikasi
                        </label>
                    </div>
                </div>

                <div v-for="k in opsiKomplikasi" :key="k.value" class="col-12 col-sm-6 col-md-4">
                    <div class="d-flex align-items-center gap-2">
                        <Checkbox v-model="local.komplikasi" :value="k.value"
                            :inputId="`komp_${k.value}`"
                            :disabled="readonly || tidakAdaKomplikasi"
                            @change="onKomplikasiChange" />
                        <label :for="`komp_${k.value}`" class="field-label mb-0">
                            {{ k.label }}
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label class="field-label">Komplikasi Lain</label>
                <InputText v-model="local.komplikasi_lain" class="w-100"
                    placeholder="Tulis komplikasi lain bila tidak ada dalam daftar"
                    :disabled="readonly || tidakAdaKomplikasi" @input="emit" />
            </div>
        </Fieldset>

    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import Fieldset from 'primevue/fieldset'

const props = defineProps({
    modelValue: { type: Object, required: true },
    readonly:   { type: Boolean, default: false },
})
const emits = defineEmits(['update:modelValue'])

const local = reactive({ ...props.modelValue })

const tidakAdaKomplikasi = ref(
    local.komplikasi?.length === 0 && !local.komplikasi_lain
)

watch(() => props.modelValue, (v) => Object.assign(local, v), { deep: true })

function emit() {
    emits('update:modelValue', { ...local })
}

function onPerdarahanChange() {
    const k23 = local.perdarahan_kala23  ?? 0
    const k4  = local.perdarahan_kala4_ibu ?? 0
    local.perdarahan_total = k23 + k4
    emit()
}

function onTidakAdaChange() {
    if (tidakAdaKomplikasi.value) {
        local.komplikasi      = []
        local.komplikasi_lain = ''
    }
    emit()
}

function onKomplikasiChange() {
    if (local.komplikasi.length > 0) tidakAdaKomplikasi.value = false
    emit()
}

const isHpp = computed(() => (local.perdarahan_total ?? 0) >= 500)
const hppSeverity = computed(() => isHpp.value ? 'danger' : 'success')
const hppLabel    = computed(() => isHpp.value ? 'HPP ≥500cc' : 'Normal')

const opsiInsersio         = [
    { label: 'Sentral',      value: 'sentral' },
    { label: 'Marginal',     value: 'marginal' },
    { label: 'Velamentosa',  value: 'velamentosa' },
]
const opsiKondisiPerineum  = [
    { label: 'Utuh',                   value: 'utuh' },
    { label: 'Ruptur spontan',         value: 'ruptur' },
    { label: 'Episiotomi + Ruptur',    value: 'episiotomi+ruptur' },
]
const opsiDerajatRobekan   = [
    { label: 'Tidak ada',  value: 'Tidak ada' },
    { label: 'Derajat I',  value: 'I' },
    { label: 'Derajat II', value: 'II' },
    { label: 'Derajat III',value: 'III' },
    { label: 'Derajat IV', value: 'IV' },
]
const opsiJenisEpisiotomi  = [
    { label: 'Mediolateral', value: 'mediolateral' },
    { label: 'Medial',       value: 'medial' },
]
const opsiKomplikasi = [
    { label: 'HPP (Haemorrhage Post Partum)',    value: 'HPP' },
    { label: 'Retensio Plasenta',                value: 'RetensioPlasenta' },
    { label: 'Atonia Uteri',                     value: 'Atonia' },
    { label: 'Distosia Bahu',                    value: 'DistosiBahu' },
    { label: 'Eklampsia / PEB',                  value: 'Eklampsia' },
    { label: 'Ruptur Uteri',                     value: 'RupturUteri' },
    { label: 'Robekan Derajat III–IV',           value: 'RobekanIIIIV' },
    { label: 'Inversio Uteri',                   value: 'InversioUteri' },
    { label: 'Emboli Air Ketuban',               value: 'EmboliKetuban' },
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
