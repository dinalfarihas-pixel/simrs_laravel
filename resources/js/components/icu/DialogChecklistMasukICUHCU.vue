<template>
  <Dialog
    v-model:visible="dialogVisible"
    :modal="true"
    :style="{ width: '70vw' }"
    :draggable="false"
    :closable="true"
    header="Checklist Kriteria Masuk ICU / HCU"
  >
    <loading v-model:active="isLoading" :is-full-page="false" />

    <!-- SCROLLABLE CONTENT BODY -->
    <div class="checklist-body">

      <!-- ==============================================
           SECTION 1: IDENTITAS & DATA PENGAJUAN
      =============================================== -->
      <Card class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-id-card mr-2" style="color: #3b82f6;"></i>
            1. Identitas &amp; Data Pengajuan
          </span>
        </template>
        <template #content>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">No. Register</label>
                <InputText v-model="form.noregister" disabled class="w-100" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">No. Rekam Medis</label>
                <InputText v-model="form.no_rm" disabled class="w-100" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Nama Pasien</label>
                <InputText v-model="form.nama_pasien" disabled class="w-100" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Ruangan / Unit Asal <span class="text-danger">*</span></label>
                <Select
                  v-model="form.ruangan_asal"
                  :options="optRuanganAsal"
                  placeholder="Pilih ruangan asal"
                  style="width: 100%;"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Dokter / DPJP Perujuk</label>
                <InputText v-model="form.dokter_perujuk" placeholder="Nama dokter perujuk" class="w-100" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Tanggal &amp; Jam Pengajuan</label>
                <DatePicker
                  v-model="form.tgl_pengajuan"
                  :showTime="true"
                  hourFormat="24"
                  dateFormat="dd/mm/yy"
                  :showIcon="true"
                  style="width: 100%;"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="form-group mb-0">
                <label class="field-label">Diagnosa Kerja Saat Diajukan <span class="text-danger">*</span></label>
                <Textarea
                  v-model="form.diagnosa"
                  :autoResize="true"
                  rows="2"
                  placeholder="Tuliskan diagnosa kerja saat pengajuan masuk..."
                  class="w-100"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 2: PEMILIHAN UNIT TUJUAN
      =============================================== -->
      <Card class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-building mr-2" style="color: #3b82f6;"></i>
            2. Pemilihan Unit Tujuan
          </span>
        </template>
        <template #content>
          <div class="d-flex align-items-center mb-3" style="gap: 2rem;">
            <div class="d-flex align-items-center">
              <RadioButton inputId="unit_icu" v-model="form.unit_tujuan" value="ICU" />
              <label for="unit_icu" class="mb-0 ml-2" style="font-weight: 600; font-size: 14px; cursor: pointer;">
                ICU — Intensive Care Unit
              </label>
            </div>
            <div class="d-flex align-items-center">
              <RadioButton inputId="unit_hcu" v-model="form.unit_tujuan" value="HCU" />
              <label for="unit_hcu" class="mb-0 ml-2" style="font-weight: 600; font-size: 14px; cursor: pointer;">
                HCU — High Care Unit
              </label>
            </div>
          </div>

          <Message v-if="form.unit_tujuan === 'ICU'" severity="info" :closable="false">
            <strong>ICU:</strong> Untuk pasien tidak stabil yang kemungkinan memerlukan bantuan
            ventilasi mekanik invasif dan/atau pemberian obat vasoaktif / inotropik kontinu.
          </Message>
          <Message v-else-if="form.unit_tujuan === 'HCU'" severity="info" :closable="false">
            <strong>HCU:</strong> Untuk pasien dengan risiko tinggi namun relatif stabil — tidak
            memerlukan ventilasi invasif, cukup dengan pengawasan ketat dan intervensi tidak invasif
            atau semi-invasif.
          </Message>
          <Message v-else severity="warn" :closable="false">
            Pilih unit tujuan terlebih dahulu untuk melanjutkan pengisian checklist.
          </Message>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 3A: KRITERIA MASUK ICU
      =============================================== -->
      <Card v-if="form.unit_tujuan === 'ICU'" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-list-check mr-2" style="color: #3b82f6;"></i>
            3. Checklist Kriteria Masuk — ICU
          </span>
        </template>
        <template #content>
          <Message
            v-if="!hasAtLeastOneICUCriteria && form.hasil_keputusan !== 'Ditolak'"
            severity="warn"
            :closable="false"
            class="mb-3"
          >
            Minimal satu kriteria masuk harus dicentang sebelum menyimpan.
          </Message>

          <!-- Prioritas I -->
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="danger" value="Prioritas I" class="mr-2" />
              <span style="font-size: 13px; font-weight: 600; color: #374151;">
                Pasien kritis, tidak stabil, butuh terapi intensif
              </span>
            </div>
            <div
              v-for="(item, i) in kriteriaICU.prioritas1"
              :key="'p1-' + i"
              class="d-flex align-items-center mb-2 ml-3"
            >
              <Checkbox v-model="form.checklist_icu.prioritas1" :inputId="'p1-' + i" :value="item" />
              <label :for="'p1-' + i" class="mb-0 ml-2" style="font-size: 13px; cursor: pointer;">{{ item }}</label>
            </div>
          </div>

          <hr class="my-3" />

          <!-- Prioritas II -->
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="warn" value="Prioritas II" class="mr-2" />
              <span style="font-size: 13px; font-weight: 600; color: #374151;">
                Butuh pemantauan intensif / canggih, risiko tinggi
              </span>
            </div>
            <div
              v-for="(item, i) in kriteriaICU.prioritas2"
              :key="'p2-' + i"
              class="d-flex align-items-center mb-2 ml-3"
            >
              <Checkbox v-model="form.checklist_icu.prioritas2" :inputId="'p2-' + i" :value="item" />
              <label :for="'p2-' + i" class="mb-0 ml-2" style="font-size: 13px; cursor: pointer;">{{ item }}</label>
            </div>
          </div>

          <hr class="my-3" />

          <!-- Prioritas III -->
          <div class="mb-0">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="secondary" value="Prioritas III" class="mr-2" />
              <span style="font-size: 13px; font-weight: 600; color: #374151;">
                Terapi intensif untuk komplikasi akut, prognosis pemulihan terbatas
              </span>
            </div>
            <div
              v-for="(item, i) in kriteriaICU.prioritas3"
              :key="'p3-' + i"
              class="d-flex align-items-center mb-2 ml-3"
            >
              <Checkbox v-model="form.checklist_icu.prioritas3" :inputId="'p3-' + i" :value="item" />
              <label :for="'p3-' + i" class="mb-0 ml-2" style="font-size: 13px; cursor: pointer;">{{ item }}</label>
            </div>
          </div>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 3B: KRITERIA MASUK HCU
      =============================================== -->
      <Card v-else-if="form.unit_tujuan === 'HCU'" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-list-check mr-2" style="color: #3b82f6;"></i>
            3. Checklist Kriteria Masuk — HCU
          </span>
        </template>
        <template #content>
          <Message
            v-if="!hasAtLeastOneHCUCriteria && form.hasil_keputusan !== 'Ditolak'"
            severity="warn"
            :closable="false"
            class="mb-3"
          >
            Minimal satu kriteria masuk harus dicentang sebelum menyimpan.
          </Message>
          <div
            v-for="(item, i) in kriteriaHCU"
            :key="'hcu-' + i"
            class="d-flex align-items-center mb-2"
          >
            <Checkbox v-model="form.checklist_hcu" :inputId="'hcu-' + i" :value="item" />
            <label :for="'hcu-' + i" class="mb-0 ml-2" style="font-size: 13px; cursor: pointer;">{{ item }}</label>
          </div>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 4: KRITERIA EKSKLUSI
      =============================================== -->
      <Card v-if="form.unit_tujuan" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-ban mr-2" style="color: #ef4444;"></i>
            4. Checklist Kriteria Eksklusi
          </span>
        </template>
        <template #content>
          <Message v-if="!isEligible" severity="warn" :closable="false" class="mb-3">
            <strong>Perhatian:</strong> Satu atau lebih kriteria eksklusi tercentang — pasien kemungkinan
            <strong>tidak layak</strong> masuk <strong>{{ form.unit_tujuan }}</strong>.
            Dokter dapat tetap memutuskan masuk dengan justifikasi klinis yang jelas.
          </Message>

          <div
            v-for="(item, i) in kriteriaEksklusi"
            :key="'eks-' + i"
            class="d-flex align-items-center mb-2"
          >
            <Checkbox v-model="form.checklist_eksklusi" :inputId="'eks-' + i" :value="item" />
            <label
              :for="'eks-' + i"
              class="mb-0 ml-2"
              :style="{
                fontSize: '13px',
                cursor: 'pointer',
                color: form.checklist_eksklusi.includes(item) ? '#dc2626' : 'inherit',
                fontWeight: form.checklist_eksklusi.includes(item) ? '600' : 'normal',
              }"
            >{{ item }}</label>
          </div>

          <div class="form-group mt-3 mb-0">
            <label class="field-label">
              Catatan / Justifikasi Klinis
              <small class="text-muted font-weight-normal">(wajib diisi jika ada eksklusi yang tercentang namun tetap diputuskan masuk)</small>
            </label>
            <Textarea
              v-model="form.catatan_eksklusi"
              :autoResize="true"
              rows="2"
              placeholder="Tuliskan justifikasi klinis..."
              class="w-100"
            />
          </div>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 5: KRITERIA FISIOLOGIS PENDUKUNG
      =============================================== -->
      <Card v-if="form.unit_tujuan" class="mb-3">
        <template #title>
          <div class="d-flex align-items-center">
            <span class="section-header">
              <i class="pi pi-heart-fill mr-2" style="color: #3b82f6;"></i>
              5. Kriteria Fisiologis Pendukung
            </span>
            <Tag severity="secondary" value="Opsional" class="ml-2" style="font-size: 11px;" />
          </div>
        </template>
        <template #content>
          <!-- GCS -->
          <p class="field-label mb-2"><strong>Glasgow Coma Scale (GCS)</strong></p>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">E — Eye <small class="text-muted">(1–4)</small></label>
                <InputNumber
                  v-model="form.fisiologis.gcs_e"
                  :min="1" :max="4"
                  showButtons
                  style="width: 100%;"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">M — Motor <small class="text-muted">(1–6)</small></label>
                <InputNumber
                  v-model="form.fisiologis.gcs_m"
                  :min="1" :max="6"
                  showButtons
                  style="width: 100%;"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">V — Verbal <small class="text-muted">(1–5)</small></label>
                <InputNumber
                  v-model="form.fisiologis.gcs_v"
                  :min="1" :max="5"
                  showButtons
                  style="width: 100%;"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">Total GCS</label>
                <div class="gcs-total-display">{{ gcsTotalScore }}</div>
              </div>
            </div>
          </div>

          <hr class="my-3" />

          <!-- Vital Signs -->
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">TD Sistol <small class="text-muted">(mmHg)</small></label>
                <InputNumber v-model="form.fisiologis.td_sistol" :min="0" :max="300" style="width: 100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">TD Diastol <small class="text-muted">(mmHg)</small></label>
                <InputNumber v-model="form.fisiologis.td_diastol" :min="0" :max="200" style="width: 100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">Heart Rate <small class="text-muted">(x/mnt)</small></label>
                <InputNumber v-model="form.fisiologis.heart_rate" :min="0" :max="300" style="width: 100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">Resp. Rate <small class="text-muted">(x/mnt)</small></label>
                <InputNumber v-model="form.fisiologis.resp_rate" :min="0" :max="60" style="width: 100%;" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">SpO₂ <small class="text-muted">(%)</small></label>
                <InputNumber v-model="form.fisiologis.spo2" :min="0" :max="100" style="width: 100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">Suhu <small class="text-muted">(°C)</small></label>
                <InputNumber
                  v-model="form.fisiologis.suhu"
                  :min="30" :max="45"
                  :minFractionDigits="1"
                  :maxFractionDigits="1"
                  style="width: 100%;"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">Skor qSOFA / NEWS</label>
                <InputNumber v-model="form.fisiologis.skor_severitas" :min="0" :max="20" style="width: 100%;" />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- ==============================================
           SECTION 6: KEPUTUSAN & PERSETUJUAN
      =============================================== -->
      <Card v-if="form.unit_tujuan" class="mb-1">
        <template #title>
          <span class="section-header">
            <i class="pi pi-check-circle mr-2" style="color: #3b82f6;"></i>
            6. Keputusan &amp; Persetujuan
          </span>
        </template>
        <template #content>
          <!-- Hasil Keputusan -->
          <div class="mb-3">
            <label class="field-label d-block mb-2">
              <strong>Hasil Keputusan</strong> <span class="text-danger">*</span>
            </label>
            <div class="d-flex flex-wrap" style="gap: 1.25rem;">
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_diterima" v-model="form.hasil_keputusan" value="Diterima" />
                <label for="hasil_diterima" class="mb-0 ml-2" style="cursor: pointer;">
                  <Tag severity="success" icon="pi pi-check-circle" value="Diterima" />
                </label>
              </div>
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_ditolak" v-model="form.hasil_keputusan" value="Ditolak" />
                <label for="hasil_ditolak" class="mb-0 ml-2" style="cursor: pointer;">
                  <Tag severity="danger" icon="pi pi-times-circle" value="Ditolak" />
                </label>
              </div>
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_dirujuk" v-model="form.hasil_keputusan" value="Dirujuk" />
                <label for="hasil_dirujuk" class="mb-0 ml-2" style="cursor: pointer;">
                  <Tag severity="warn" icon="pi pi-arrow-right" value="Dirujuk ke Unit Lain" />
                </label>
              </div>
            </div>
          </div>

          <!-- Kondisional: Unit alternatif jika Dirujuk -->
          <div v-if="form.hasil_keputusan === 'Dirujuk'" class="form-group">
            <label class="field-label">Unit Tujuan Alternatif <span class="text-danger">*</span></label>
            <Select
              v-model="form.unit_alternatif"
              :options="optUnitAlternatif"
              placeholder="Pilih unit tujuan"
              style="width: 100%; max-width: 320px;"
            />
          </div>

          <!-- Kondisional: Alasan jika Ditolak -->
          <div v-if="form.hasil_keputusan === 'Ditolak'" class="form-group">
            <label class="field-label">Alasan Penolakan <span class="text-danger">*</span></label>
            <Textarea
              v-model="form.alasan_penolakan"
              :autoResize="true"
              rows="3"
              placeholder="Tuliskan alasan penolakan secara jelas dan terperinci..."
              class="w-100"
            />
          </div>

          <hr class="my-3" />

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="field-label">Dokter ICU/HCU Penanggung Jawab <span class="text-danger">*</span></label>
                <InputText
                  v-model="form.nama_dokter_approver"
                  placeholder="dr. Nama Dokter, Sp.An"
                  class="w-100"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="field-label">Tanda Tangan Digital <small class="text-muted">(mock)</small></label>
                <InputText
                  v-model="form.ttd_digital"
                  placeholder="Ketik nama sebagai tanda tangan digital..."
                  class="w-100"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <div class="form-group mb-0">
                <label class="field-label">Tanggal &amp; Jam Keputusan</label>
                <DatePicker
                  v-model="form.tgl_keputusan"
                  :showTime="true"
                  hourFormat="24"
                  dateFormat="dd/mm/yy"
                  :showIcon="true"
                  style="width: 100%;"
                />
              </div>
            </div>
          </div>

          <!-- Status Kelayakan Ringkasan -->
          <div class="mt-3">
            <Message
              v-if="form.hasil_keputusan === 'Diterima' && isEligible"
              severity="success"
              :closable="false"
            >
              <i class="pi pi-check-circle mr-2"></i>
              Pasien <strong>memenuhi kriteria kelayakan</strong> untuk masuk <strong>{{ form.unit_tujuan }}</strong>.
            </Message>
            <Message
              v-else-if="form.hasil_keputusan === 'Diterima' && !isEligible"
              severity="warn"
              :closable="false"
            >
              <i class="pi pi-exclamation-triangle mr-2"></i>
              Keputusan diterima, namun terdapat <strong>kriteria eksklusi yang tercentang</strong>.
              Pastikan kolom justifikasi klinis telah diisi dengan lengkap.
            </Message>
            <Message
              v-else-if="form.hasil_keputusan === 'Ditolak'"
              severity="error"
              :closable="false"
            >
              <i class="pi pi-times-circle mr-2"></i>
              Pasien <strong>tidak diterima</strong> masuk <strong>{{ form.unit_tujuan }}</strong>.
            </Message>
            <Message
              v-else-if="form.hasil_keputusan === 'Dirujuk'"
              severity="info"
              :closable="false"
            >
              <i class="pi pi-arrow-right-arrow-left mr-2"></i>
              Pasien akan <strong>dirujuk</strong> ke unit alternatif yang dipilih.
            </Message>
          </div>
        </template>
      </Card>

    </div><!-- /checklist-body -->

    <!-- ==============================================
         FOOTER DIALOG
    =============================================== -->
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>
          <Tag
            v-if="form.hasil_keputusan === 'Diterima'"
            severity="success"
            icon="pi pi-check-circle"
            value="Status: Diterima"
          />
          <Tag
            v-else-if="form.hasil_keputusan === 'Ditolak'"
            severity="danger"
            icon="pi pi-times-circle"
            value="Status: Ditolak"
          />
          <Tag
            v-else-if="form.hasil_keputusan === 'Dirujuk'"
            severity="warn"
            icon="pi pi-arrow-right"
            value="Status: Dirujuk"
          />
          <Tag
            v-else
            severity="secondary"
            icon="pi pi-clock"
            value="Belum Dinilai"
          />
        </div>
        <div class="d-flex" style="gap: 0.5rem;">
          <Button
            label="Batal"
            icon="pi pi-times"
            severity="secondary"
            outlined
            @click="onCancel"
          />
          <Button
            label="Simpan Checklist"
            icon="pi pi-save"
            :disabled="!canSubmit"
            @click="onSubmit"
          />
        </div>
      </div>
    </template>

  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toast-notification'

// =======================================================
// PROPS & EMITS
// =======================================================

const props = defineProps({
  visible:     { type: Boolean, required: true },
  noregister:  { type: String,  default: '' },
  patientData: { type: Object,  default: () => ({}) },
})

const emit = defineEmits(['update:visible', 'submitted'])

// =======================================================
// COMPOSABLES
// =======================================================

const $toast    = useToast()
const isLoading = ref(false)

// =======================================================
// STATIC OPTIONS & CHECKLIST DATA
// =======================================================

const optRuanganAsal   = ['IGD', 'Ruang Rawat Inap', 'Kamar Operasi', 'Rujukan RS Lain']
const optUnitAlternatif = ['ICU', 'HCU', 'Ruang Rawat Biasa', 'ICCU', 'PICU / NICU']

const kriteriaICU = {
  prioritas1: [
    'Membutuhkan bantuan ventilasi mekanik invasif',
    'Membutuhkan infus obat vasoaktif / inotropik kontinu',
    'Gagal napas akut',
    'Syok (septik / kardiogenik / hipovolemik) yang tidak stabil',
    'Pasca henti jantung (post cardiac arrest)',
  ],
  prioritas2: [
    'Pasca bedah besar / luas (bedah digestif, tumor, bedah saraf)',
    'Penyakit dasar jantung-paru dengan risiko perburukan mendadak',
    'Gagal ginjal akut / berat',
    'Gangguan metabolik berat yang berisiko dekompensasi',
  ],
  prioritas3: [
    'Keganasan metastatik dengan komplikasi infeksi berat',
    'Gagal napas dengan prognosis buruk, tetap dengan indikasi terapi (bukan futile)',
  ],
}

const kriteriaHCU = [
  'Kondisi hemodinamik relatif stabil (tidak butuh vasoaktif dosis tinggi kontinu)',
  'Tidak memerlukan ventilasi mekanik invasif (boleh NRM / nasal kanul / NIV intermiten)',
  'Memerlukan observasi tanda vital ketat (frekuensi >1x/jam)',
  'Pasien pasca operasi risiko sedang yang butuh pengawasan pasca-anestesi lebih lama',
  'Pasien "step-down" dari ICU yang sudah stabil namun belum layak ke ruang biasa',
  'Pasien "step-up" dari ruang rawat inap biasa dengan perburukan ringan-sedang',
]

const kriteriaEksklusi = [
  'Mati batang otak (MBO)',
  'Koma permanen dengan kemungkinan sadar kembali sangat kecil',
  'Stadium akhir penyakit terminal tanpa rencana terapi agresif lanjutan',
  'Keputusan keluarga / pasien menolak perawatan intensif (informed consent terlampir)',
]

// =======================================================
// FORM STATE
// =======================================================

const defaultForm = () => ({
  noregister:        '',
  no_rm:             '',
  nama_pasien:       '',
  ruangan_asal:      null,
  dokter_perujuk:    '',
  diagnosa:          '',
  tgl_pengajuan:     new Date(),

  unit_tujuan:       null,

  checklist_icu: {
    prioritas1: [],
    prioritas2: [],
    prioritas3: [],
  },
  checklist_hcu:      [],

  checklist_eksklusi: [],
  catatan_eksklusi:   '',

  fisiologis: {
    gcs_e:          null,
    gcs_m:          null,
    gcs_v:          null,
    td_sistol:      null,
    td_diastol:     null,
    heart_rate:     null,
    resp_rate:      null,
    spo2:           null,
    suhu:           null,
    skor_severitas: null,
  },

  hasil_keputusan:      null,
  unit_alternatif:      null,
  alasan_penolakan:     '',
  nama_dokter_approver: '',
  ttd_digital:          '',
  tgl_keputusan:        new Date(),
})

const form = ref(defaultForm())

// =======================================================
// COMPUTED
// =======================================================

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})

const isEligible = computed(() => form.value.checklist_eksklusi.length === 0)

const hasAtLeastOneICUCriteria = computed(() => {
  const { prioritas1, prioritas2, prioritas3 } = form.value.checklist_icu
  return prioritas1.length > 0 || prioritas2.length > 0 || prioritas3.length > 0
})

const hasAtLeastOneHCUCriteria = computed(() => form.value.checklist_hcu.length > 0)

const gcsTotalScore = computed(() => {
  const e = form.value.fisiologis.gcs_e || 0
  const m = form.value.fisiologis.gcs_m || 0
  const v = form.value.fisiologis.gcs_v || 0
  const total = e + m + v
  return total > 0 ? total : '—'
})

const canSubmit = computed(() => {
  if (!form.value.unit_tujuan || !form.value.hasil_keputusan) return false
  if (form.value.hasil_keputusan === 'Ditolak') return true
  if (form.value.unit_tujuan === 'ICU') return hasAtLeastOneICUCriteria.value
  if (form.value.unit_tujuan === 'HCU') return hasAtLeastOneHCUCriteria.value
  return false
})

// =======================================================
// WATCHERS
// =======================================================

watch(
  () => props.visible,
  (isOpen) => { if (isOpen) resetForm() }
)

// =======================================================
// METHODS
// =======================================================

const resetForm = () => {
  const pd = props.patientData || {}
  form.value = {
    ...defaultForm(),
    noregister:    props.noregister || pd.noregister   || pd.NOPENDAFTARAN || '',
    no_rm:         pd.no_rm         || pd.nomr          || pd.NOMR           || 'RM-DEMO-001',
    nama_pasien:   pd.nama_pasien   || pd.namapasien    || pd.NAMAPASIEN     || 'Pasien Demo',
    ruangan_asal:  pd.ruanganAsal   || pd.ruangan_asal  || null,
    diagnosa:      pd.diagnosa      || pd.DIAGNOSA       || '',
    tgl_pengajuan: new Date(),
    tgl_keputusan: new Date(),
  }
}

const showToast = (type, message) =>
  $toast.open({ message, type, position: 'top-right', duration: 3000, dismissible: true })

const onSubmit = () => {
  if (!form.value.ruangan_asal) {
    showToast('warning', 'Ruangan / unit asal pengajuan wajib dipilih.')
    return
  }
  if (!form.value.diagnosa.trim()) {
    showToast('warning', 'Diagnosa kerja wajib diisi.')
    return
  }
  if (form.value.hasil_keputusan === 'Ditolak' && !form.value.alasan_penolakan.trim()) {
    showToast('warning', 'Alasan penolakan wajib diisi.')
    return
  }
  if (form.value.hasil_keputusan === 'Dirujuk' && !form.value.unit_alternatif) {
    showToast('warning', 'Unit tujuan alternatif wajib dipilih.')
    return
  }
  if (!form.value.nama_dokter_approver.trim()) {
    showToast('warning', 'Nama dokter penanggung jawab wajib diisi.')
    return
  }

  const checklist_masuk = form.value.unit_tujuan === 'ICU'
    ? {
        prioritas1: [...form.value.checklist_icu.prioritas1],
        prioritas2: [...form.value.checklist_icu.prioritas2],
        prioritas3: [...form.value.checklist_icu.prioritas3],
      }
    : { hcu: [...form.value.checklist_hcu] }

  const payload = {
    noregister:           form.value.noregister,
    no_rm:                form.value.no_rm,
    nama_pasien:          form.value.nama_pasien,
    ruangan_asal:         form.value.ruangan_asal,
    dokter_perujuk:       form.value.dokter_perujuk,
    diagnosa:             form.value.diagnosa,
    tgl_pengajuan:        form.value.tgl_pengajuan,
    unit_tujuan:          form.value.unit_tujuan,
    checklist_masuk,
    checklist_eksklusi:   [...form.value.checklist_eksklusi],
    catatan_eksklusi:     form.value.catatan_eksklusi,
    is_eligible:          isEligible.value,
    fisiologis: {
      ...form.value.fisiologis,
      gcs_total: typeof gcsTotalScore.value === 'number' ? gcsTotalScore.value : null,
    },
    hasil_keputusan:      form.value.hasil_keputusan,
    unit_alternatif:      form.value.unit_alternatif,
    alasan_penolakan:     form.value.alasan_penolakan,
    nama_dokter_approver: form.value.nama_dokter_approver,
    ttd_digital:          form.value.ttd_digital,
    tgl_keputusan:        form.value.tgl_keputusan,
  }

  console.log('[ChecklistMasukICUHCU] Payload:', payload)
  emit('submitted', payload)
  emit('update:visible', false)
  showToast('success', 'Checklist berhasil disimpan.')
}

const onCancel = () => emit('update:visible', false)
</script>

<style scoped>
.checklist-body {
  max-height: 72vh;
  overflow-y: auto;
  padding: 0.5rem 0.75rem;
}

.section-header {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.field-label {
  display: block;
  font-size: 11.5px;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  margin-bottom: 4px;
}

.gcs-total-display {
  background: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  font-weight: 700;
  font-size: 1.15rem;
  color: #212529;
  text-align: center;
  line-height: 1.9;
}
</style>
