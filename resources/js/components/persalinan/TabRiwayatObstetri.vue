<template>
    <div class="p-3">

        <!-- ── GPA ───────────────────────────────────────────────────────── -->
        <Fieldset legend="GPA & Identitas Kehamilan" :toggleable="true" class="mb-3">
            <div class="row g-3">
                <!-- G P A numeric -->
                <div class="col-12 col-md-4">
                    <div class="d-flex align-items-center gap-2">
                        <div class="flex-fill">
                            <label class="field-label">Gravida (G)</label>
                            <InputNumber v-model="local.gravida" :min="0" :max="20"
                                style="width:100%"
                                :disabled="readonly" @update:modelValue="emit" />
                        </div>
                        <div class="flex-fill">
                            <label class="field-label">Partus (P)</label>
                            <InputNumber v-model="local.partus" :min="0" :max="20"
                                style="width:100%"
                                :disabled="readonly" @update:modelValue="emit" />
                        </div>
                        <div class="flex-fill">
                            <label class="field-label">Abortus (A)</label>
                            <InputNumber v-model="local.abortus" :min="0" :max="20"
                                style="width:100%"
                                :disabled="readonly" @update:modelValue="emit" />
                        </div>
                    </div>
                    <div class="mt-2">
                        <Tag severity="info" :value="gpaLabel" />
                    </div>
                </div>

                <!-- GPA lengkap -->
                <div class="col-12 col-md-4">
                    <label class="field-label">GPA Lengkap (catatan bebas)</label>
                    <InputText v-model="local.gpa_lengkap" class="w-100"
                        placeholder="mis. G2P1A0, 1SC" :disabled="readonly" @input="emit" />
                </div>

                <!-- Jumlah ANC -->
                <div class="col-12 col-md-4">
                    <label class="field-label">Jumlah Kunjungan ANC</label>
                    <InputNumber v-model="local.jumlah_anc" :min="0" :max="50"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emit" />
                </div>

                <!-- HPHT -->
                <div class="col-12 col-md-4">
                    <label class="field-label">HPHT <span class="text-danger">*</span></label>
                    <DatePicker v-model="local.hpht" dateFormat="dd/mm/yy"
                        showIcon style="width:100%" :disabled="readonly"
                        @update:modelValue="onHphtChange" />
                </div>

                <!-- HPL -->
                <div class="col-12 col-md-4">
                    <label class="field-label">HPL (Naegele — bisa diedit)</label>
                    <DatePicker v-model="local.hpl" dateFormat="dd/mm/yy"
                        showIcon style="width:100%" :disabled="readonly"
                        @update:modelValue="emit" />
                </div>

                <!-- Usia kehamilan (auto) -->
                <div class="col-12 col-md-4">
                    <label class="field-label">Usia Kehamilan (auto)</label>
                    <div class="d-flex gap-2 align-items-center">
                        <InputNumber v-model="local.usia_kehamilan_minggu" :min="0" :max="50"
                            suffix=" mgg" style="width:100%"
                            :disabled="readonly" @update:modelValue="emit" />
                        <InputNumber v-model="local.usia_kehamilan_hari" :min="0" :max="6"
                            suffix=" hr" style="width:100%"
                            :disabled="readonly" @update:modelValue="emit" />
                    </div>
                    <small class="text-muted">{{ usiaKehamilanLabel }}</small>
                </div>
            </div>
        </Fieldset>

        <!-- ── Riwayat SC ─────────────────────────────────────────────────── -->
        <Fieldset legend="Riwayat Sectio Caesarea (SC)" :toggleable="true" class="mb-3">
            <div class="row g-3 align-items-center">
                <div class="col-12 col-md-3">
                    <label class="field-label">Riwayat SC</label>
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.riwayat_sc" inputId="sc_ya" :value="true"
                                :disabled="readonly" @change="emit" />
                            <label for="sc_ya" class="field-label mb-0">Ya</label>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <RadioButton v-model="local.riwayat_sc" inputId="sc_tidak" :value="false"
                                :disabled="readonly" @change="emit" />
                            <label for="sc_tidak" class="field-label mb-0">Tidak</label>
                        </div>
                    </div>
                </div>

                <div v-if="local.riwayat_sc" class="col-12 col-md-3">
                    <label class="field-label">Jumlah SC Sebelumnya</label>
                    <InputNumber v-model="local.jumlah_sc" :min="1" :max="10"
                        style="width:100%"
                        :disabled="readonly" @update:modelValue="emit" />
                </div>

                <div v-if="local.riwayat_sc" class="col-12">
                    <Message severity="warn" :closable="false">
                        <i class="pi pi-exclamation-triangle me-1"></i>
                        Pasien dengan riwayat SC — pertimbangkan risiko ruptur uteri &amp; VBAC.
                    </Message>
                </div>
            </div>
        </Fieldset>

        <!-- ── Faktor Risiko ──────────────────────────────────────────────── -->
        <Fieldset legend="Faktor Risiko / Komplikasi Kehamilan" :toggleable="true" class="mb-3">
            <div class="row g-2 mb-3">
                <div v-for="f in faktors" :key="f.value" class="col-12 col-sm-6 col-md-4">
                    <div class="d-flex align-items-center gap-2">
                        <Checkbox
                            v-model="local.faktor_risiko"
                            :value="f.value"
                            :inputId="`fr_${f.value}`"
                            :disabled="readonly"
                            @change="emit"
                        />
                        <label :for="`fr_${f.value}`" class="field-label mb-0">
                            {{ f.label }}
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label class="field-label">Faktor Risiko Lain</label>
                <InputText v-model="local.faktor_risiko_lain"
                    class="w-100"
                    placeholder="Tulis faktor risiko lain jika ada"
                    :disabled="readonly" @input="emit" />
            </div>
        </Fieldset>

        <!-- ── Riwayat Persalinan Sebelumnya ─────────────────────────────── -->
        <Fieldset legend="Riwayat Persalinan Sebelumnya" :toggleable="true" class="mb-3">
            <Textarea v-model="local.riwayat_persalinan_sebelumnya"
                class="w-100" rows="4"
                placeholder="Uraikan riwayat persalinan sebelumnya (cara lahir, BB bayi, komplikasi, dll)"
                :disabled="readonly" @input="emit" />
        </Fieldset>

    </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import Fieldset from 'primevue/fieldset'

const props = defineProps({
    modelValue:    { type: Object, required: true },
    readonly:      { type: Boolean, default: false },
    tglPersalinan: { type: [Date, String, null], default: null },
})
const emits = defineEmits(['update:modelValue'])

const local = reactive({ ...props.modelValue })

watch(() => props.modelValue, (v) => Object.assign(local, v), { deep: true })

function emit() {
    emits('update:modelValue', { ...local })
}

// ── HPHT → auto-hitung HPL (Naegele) & usia kehamilan ────────────────────────
function onHphtChange(val) {
    local.hpht = val
    if (val instanceof Date && !isNaN(val)) {
        // HPL Naegele: HPHT + 7 hari - 3 bulan + 1 tahun
        const hpl = new Date(val)
        hpl.setDate(hpl.getDate() + 7)
        hpl.setMonth(hpl.getMonth() - 3)
        hpl.setFullYear(hpl.getFullYear() + 1)
        local.hpl = hpl

        // Usia kehamilan vs hari ini (atau tgl persalinan bila sudah ada)
        const acuan = props.tglPersalinan
            ? (props.tglPersalinan instanceof Date ? props.tglPersalinan : new Date(props.tglPersalinan))
            : new Date()
        const diffDays = Math.floor((acuan - val) / 86400000)
        local.usia_kehamilan_minggu = Math.floor(diffDays / 7)
        local.usia_kehamilan_hari   = diffDays % 7
    }
    emit()
}

// ── Label ─────────────────────────────────────────────────────────────────────
const gpaLabel = computed(() => {
    const g = local.gravida ?? 0
    const p = local.partus  ?? 0
    const a = local.abortus ?? 0
    return `G${g} P${p} A${a}`
})

const usiaKehamilanLabel = computed(() => {
    const mgg = local.usia_kehamilan_minggu
    const hr  = local.usia_kehamilan_hari
    if (mgg == null) return ''
    return `${mgg} minggu ${hr ?? 0} hari`
})

// ── Daftar faktor risiko ──────────────────────────────────────────────────────
const faktors = [
    { value: 'KPD',         label: 'KPD (Ketuban Pecah Dini)' },
    { value: 'PEB',         label: 'Preeklampsia / PEB' },
    { value: 'Anemia',      label: 'Anemia' },
    { value: 'DMG',         label: 'DM Gestasional' },
    { value: 'Sungsang',    label: 'Letak Sungsang' },
    { value: 'Gemelli',     label: 'Kehamilan Ganda (Gemelli)' },
    { value: 'Makrosomia',  label: 'Makrosomia' },
    { value: 'IUGR',        label: 'IUGR / PJT' },
    { value: 'OligohidramnionPolihi', label: 'Oligohidramnion / Polihidramnion' },
    { value: 'Plasenta',    label: 'Kelainan Plasenta (previa/solutio)' },
    { value: 'RiwayatHPP',  label: 'Riwayat HPP' },
    { value: 'Hipertensi',  label: 'Hipertensi Kronik' },
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
