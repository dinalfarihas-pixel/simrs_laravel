<template>
  <section>
    <ConfirmDialog group="icuChecklist" />

    <!-- DIALOG: DETAIL RIWAYAT -->
    <Dialog v-model:visible="showDetail" header="Detail Checklist Masuk ICU/HCU" :modal="true"
      :style="{ width: '680px' }" :closable="true">
      <template v-if="detailData">
        <div class="p-3 mb-3" :style="detailData.unit_tujuan === 'ICU'
          ? 'background:#e3f2fd;border-radius:8px;border-left:4px solid #1976d2'
          : 'background:#fce4ec;border-radius:8px;border-left:4px solid #c2185b'">
          <div style="font-weight:700">
            {{ detailData.unit_tujuan === 'ICU' ? 'Masuk ICU — Intensive Care Unit' : 'Masuk HCU — High Care Unit' }}
          </div>
          <small style="color:#555">
            {{ formatWaktu(detailData.created_at) }}
            &nbsp;|&nbsp; Dikaji oleh: <strong>{{ detailData.username }}</strong>
            &nbsp;|&nbsp; Dokter: <strong>{{ detailData.nama_dokter_approver }}</strong>
          </small>
        </div>

        <div class="mb-2">
          <strong>Diagnosa:</strong> {{ detailData.diagnosa || '—' }}
        </div>
        <div class="mb-3">
          <strong>Ruangan Asal:</strong> {{ detailData.ruangan_asal || '—' }}
          &nbsp;|&nbsp;
          <strong>Dokter Perujuk:</strong> {{ detailData.dokter_perujuk || '—' }}
        </div>

        <div v-if="detailData.checklist_masuk_json && Object.keys(detailData.checklist_masuk_json).length" class="mb-3">
          <div style="font-weight:600;margin-bottom:6px">Kriteria Masuk Tercentang:</div>
          <template v-if="detailData.unit_tujuan === 'ICU'">
            <div v-for="(items, prio) in detailData.checklist_masuk_json" :key="prio">
              <div v-if="items && items.length">
                <Tag :severity="prio === 'prioritas1' ? 'danger' : prio === 'prioritas2' ? 'warn' : 'secondary'"
                  :value="prio === 'prioritas1' ? 'Prioritas I' : prio === 'prioritas2' ? 'Prioritas II' : 'Prioritas III'"
                  class="mb-1 mr-1" />
                <ul class="mt-1 mb-2" style="font-size:13px;">
                  <li v-for="(item, i) in items" :key="i">{{ item }}</li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <ul style="font-size:13px;">
              <li v-for="(item, i) in (detailData.checklist_masuk_json.hcu || [])" :key="i">{{ item }}</li>
            </ul>
          </template>
        </div>

        <div v-if="detailData.checklist_eksklusi_json && detailData.checklist_eksklusi_json.length" class="mb-3">
          <div style="font-weight:600;margin-bottom:6px;color:#dc2626">Kriteria Eksklusi Tercentang:</div>
          <ul style="font-size:13px;color:#dc2626">
            <li v-for="(item, i) in detailData.checklist_eksklusi_json" :key="i">{{ item }}</li>
          </ul>
          <div v-if="detailData.catatan_eksklusi" style="font-size:13px;color:#555">
            <i class="pi pi-comment mr-1"></i><strong>Justifikasi:</strong> {{ detailData.catatan_eksklusi }}
          </div>
        </div>

        <div v-if="detailData.fisiologis_json && hasAnyFisiologis(detailData.fisiologis_json)" class="mb-3">
          <div style="font-weight:600;margin-bottom:6px">Data Fisiologis:</div>
          <div class="row" style="font-size:13px;">
            <div class="col-md-4" v-if="detailData.fisiologis_json.gcs_total">
              GCS Total: <strong>{{ detailData.fisiologis_json.gcs_total }}</strong>
            </div>
            <div class="col-md-4" v-if="detailData.fisiologis_json.td_sistol">
              TD: <strong>{{ detailData.fisiologis_json.td_sistol }}/{{ detailData.fisiologis_json.td_diastol }} mmHg</strong>
            </div>
            <div class="col-md-4" v-if="detailData.fisiologis_json.heart_rate">
              HR: <strong>{{ detailData.fisiologis_json.heart_rate }} x/mnt</strong>
            </div>
            <div class="col-md-4" v-if="detailData.fisiologis_json.resp_rate">
              RR: <strong>{{ detailData.fisiologis_json.resp_rate }} x/mnt</strong>
            </div>
            <div class="col-md-4" v-if="detailData.fisiologis_json.spo2">
              SpO₂: <strong>{{ detailData.fisiologis_json.spo2 }}%</strong>
            </div>
            <div class="col-md-4" v-if="detailData.fisiologis_json.suhu">
              Suhu: <strong>{{ detailData.fisiologis_json.suhu }}°C</strong>
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:8px;background:#f5f5f5;border:1px solid #ddd">
          <span style="font-weight:600">Keputusan Akhir</span>
          <Tag
            :severity="detailData.hasil_keputusan === 'Diterima' ? 'success' : detailData.hasil_keputusan === 'Ditolak' ? 'danger' : 'warn'"
            :icon="detailData.hasil_keputusan === 'Diterima' ? 'pi pi-check-circle' : detailData.hasil_keputusan === 'Ditolak' ? 'pi pi-times-circle' : 'pi pi-arrow-right'"
            :value="detailData.hasil_keputusan"
          />
        </div>
        <div v-if="detailData.alasan_penolakan" class="mt-2 p-2"
          style="background:#fff8e1;border-radius:6px;border:1px solid #ffe082;font-size:13px">
          <i class="pi pi-info-circle mr-1" style="color:#f57c00"></i>
          <strong>Alasan Penolakan:</strong> {{ detailData.alasan_penolakan }}
        </div>
        <div v-if="detailData.unit_alternatif" class="mt-2" style="font-size:13px">
          <strong>Unit Alternatif:</strong> {{ detailData.unit_alternatif }}
        </div>
      </template>
      <template #footer>
        <Button label="Tutup" icon="pi pi-times" text @click="showDetail = false" />
      </template>
    </Dialog>

    <div class="container-fluid px-0">

      <!-- INFO PASIEN -->
      <Card class="mb-3">
        <template #content>
          <div v-if="isLoadingPasien" class="text-center py-3">
            <ProgressBar mode="indeterminate" style="height:.3em" />
          </div>
          <div v-else class="row align-items-center">
            <div class="col-md-1 text-center">
              <div style="width:52px;height:52px;border-radius:50%;background:#e3f2fd;display:inline-flex;align-items:center;justify-content:center">
                <i class="pi pi-user" style="font-size:1.5em;color:#1565c0"></i>
              </div>
            </div>
            <div class="col-md-4">
              <div style="font-weight:700;font-size:1.1em;color:#1a1a2e">
                {{ dataPasien.DATA_SINGKAT || dataPasien.NAMAPASIEN || '—' }}
              </div>
              <div style="color:#666;margin-top:2px">
                No. RM: <strong>{{ dataPasien.NOMR || '—' }}</strong>
                &nbsp;|&nbsp; No. Reg: <code>{{ noregister }}</code>
              </div>
              <div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap">
                <Tag v-if="dataPasien.JENISKELAMIN"
                  :severity="dataPasien.JENISKELAMIN === 'L' ? 'info' : 'danger'"
                  :icon="dataPasien.JENISKELAMIN === 'L' ? 'pi pi-mars' : 'pi pi-venus'"
                  :value="dataPasien.JENISKELAMIN === 'L' ? 'Laki-laki' : 'Perempuan'" />
                <Tag v-if="dataPasien.USIA_PASIEN" severity="secondary"
                  :value="(dataPasien.USIA_PASIEN?.tahun ?? '?') + ' Thn ' + (dataPasien.USIA_PASIEN?.bulan ?? 0) + ' Bln'" />
              </div>
            </div>
            <div class="col-md-4">
              <div style="color:#555;font-size:0.85rem">
                <i class="pi pi-calendar mr-1"></i>Masuk: <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong>
              </div>
              <div style="color:#555;margin-top:4px">
                <i class="pi pi-user-edit mr-1"></i>DPJP: <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong>
              </div>
              <div style="color:#555;margin-top:4px">
                <i class="pi pi-credit-card mr-1"></i>{{ dataPasien.CARABAYAR || '—' }}
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- RIWAYAT CHECKLIST -->
      <Card class="mb-3">
        <template #title>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <i class="pi pi-list mr-2" style="color:#1976d2"></i>
              Riwayat Checklist Masuk ICU / HCU
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <Tag :value="'Total: ' + riwayat.length + ' checklist'" severity="info" />
              <Button icon="pi pi-refresh" severity="secondary" outlined size="small"
                v-tooltip="'Muat ulang'" @click="fetchRiwayat()" :loading="isLoadingRiwayat" />
            </div>
          </div>
        </template>
        <template #content>
          <DataTable :value="riwayat" :rowHover="true" size="small" stripedRows
            :paginator="riwayat.length > 5" :rows="5">
            <template #empty>
              <div class="text-center py-4" style="color:#aaa">
                <i class="pi pi-inbox" style="font-size:2em;opacity:.4"></i>
                <div class="mt-2">Belum ada checklist untuk pasien ini.</div>
              </div>
            </template>
            <Column header="#" style="width:44px;text-align:center">
              <template #body="s">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#e3f2fd;color:#1565c0;font-weight:700">{{ s.index + 1 }}</span>
              </template>
            </Column>
            <Column header="Waktu" style="min-width:140px">
              <template #body="s">
                <div style="font-weight:600">{{ formatWaktu(s.data.created_at) }}</div>
                <small style="color:#888">{{ s.data.username }}</small>
              </template>
            </Column>
            <Column header="Unit" style="width:100px">
              <template #body="s">
                <Tag :severity="s.data.unit_tujuan === 'ICU' ? 'info' : 'danger'" :value="s.data.unit_tujuan" />
              </template>
            </Column>
            <Column header="Dokter" style="min-width:160px">
              <template #body="s">
                <span style="font-size:13px">{{ s.data.nama_dokter_approver || '—' }}</span>
              </template>
            </Column>
            <Column header="Keputusan" style="width:130px;text-align:center">
              <template #body="s">
                <Tag
                  :severity="s.data.hasil_keputusan === 'Diterima' ? 'success' : s.data.hasil_keputusan === 'Ditolak' ? 'danger' : 'warn'"
                  :value="s.data.hasil_keputusan"
                />
              </template>
            </Column>
            <Column header="Aksi" style="width:130px;text-align:center">
              <template #body="s">
                <div style="display:flex;gap:4px;justify-content:center">
                  <Button icon="pi pi-eye" size="small" outlined v-tooltip="'Lihat Detail'"
                    @click="lihatDetail(s.data)" />
                  <Button icon="pi pi-pencil" size="small" severity="warn" outlined v-tooltip="'Edit'"
                    @click="editChecklist(s.data)" />
                  <Button icon="pi pi-trash" size="small" severity="danger" outlined v-tooltip="'Hapus'"
                    @click="konfirmasiHapus(s.data)" />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>

      <!-- BANNER: MODE EDIT -->
      <div v-if="editMode" class="edit-mode-banner mb-3">
        <div class="d-flex align-items-center" style="gap:10px">
          <i class="pi pi-pencil" style="font-size:1.2rem"></i>
          <div>
            <strong>Mode Edit</strong>
            <span style="margin-left:8px;opacity:.85">— Anda sedang mengedit checklist #{{ editId }}</span>
          </div>
        </div>
        <Button label="Batal Edit" icon="pi pi-times" severity="secondary" outlined size="small"
          @click="batalEdit" />
      </div>

      <!-- SECTION 1: IDENTITAS & DATA PENGAJUAN -->
      <Card class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-id-card mr-2" style="color:#3b82f6;"></i>
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
                <InputText v-model="form.ruangan_asal" placeholder="Ruangan / unit asal pasien" class="w-100" disabled />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Dokter / DPJP Perujuk</label>
                <InputText v-model="form.dokter_perujuk" placeholder="Nama dokter perujuk" class="w-100" disabled />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label class="field-label">Tanggal &amp; Jam Pengajuan</label>
                <DatePicker v-model="form.tgl_pengajuan" :showTime="true" hourFormat="24"
                  dateFormat="dd/mm/yy" :showIcon="true" style="width:100%;" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-0">
                <label class="field-label">Diagnosa Kerja Saat Diajukan <span class="text-danger">*</span></label>
                <Textarea v-model="form.diagnosa" :autoResize="true" rows="2"
                  placeholder="Tuliskan diagnosa kerja saat pengajuan masuk..." class="w-100" />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- SECTION 2: PEMILIHAN UNIT TUJUAN -->
      <Card class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-building mr-2" style="color:#3b82f6;"></i>
            2. Pemilihan Unit Tujuan
          </span>
        </template>
        <template #content>
          <div class="d-flex align-items-center mb-3" style="gap:2rem;">
            <div class="d-flex align-items-center">
              <RadioButton inputId="unit_icu" v-model="form.unit_tujuan" value="ICU" />
              <label for="unit_icu" class="mb-0 ml-2" style="font-weight:600;font-size:14px;cursor:pointer;">
                ICU — Intensive Care Unit
              </label>
            </div>
            <div class="d-flex align-items-center">
              <RadioButton inputId="unit_hcu" v-model="form.unit_tujuan" value="HCU" />
              <label for="unit_hcu" class="mb-0 ml-2" style="font-weight:600;font-size:14px;cursor:pointer;">
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

      <!-- SECTION 3A: KRITERIA MASUK ICU -->
      <Card v-if="form.unit_tujuan === 'ICU'" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-list-check mr-2" style="color:#3b82f6;"></i>
            3. Checklist Kriteria Masuk — ICU
          </span>
        </template>
        <template #content>
          <Message v-if="!hasAtLeastOneICUCriteria && form.hasil_keputusan !== 'Ditolak'"
            severity="warn" :closable="false" class="mb-3">
            Minimal satu kriteria masuk harus dicentang sebelum menyimpan.
          </Message>
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="danger" value="Prioritas I" class="mr-2" />
              <span style="font-size:13px;font-weight:600;color:#374151;">Pasien kritis, tidak stabil, butuh terapi intensif</span>
            </div>
            <div v-for="(item, i) in kriteriaICU.prioritas1" :key="'p1-' + i" class="d-flex align-items-center mb-2 ml-3">
              <Checkbox v-model="form.checklist_icu.prioritas1" :inputId="'p1-' + i" :value="item" />
              <label :for="'p1-' + i" class="mb-0 ml-2" style="font-size:13px;cursor:pointer;">{{ item }}</label>
            </div>
          </div>
          <hr class="my-3" />
          <div class="mb-3">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="warn" value="Prioritas II" class="mr-2" />
              <span style="font-size:13px;font-weight:600;color:#374151;">Butuh pemantauan intensif / canggih, risiko tinggi</span>
            </div>
            <div v-for="(item, i) in kriteriaICU.prioritas2" :key="'p2-' + i" class="d-flex align-items-center mb-2 ml-3">
              <Checkbox v-model="form.checklist_icu.prioritas2" :inputId="'p2-' + i" :value="item" />
              <label :for="'p2-' + i" class="mb-0 ml-2" style="font-size:13px;cursor:pointer;">{{ item }}</label>
            </div>
          </div>
          <hr class="my-3" />
          <div class="mb-0">
            <div class="d-flex align-items-center mb-2">
              <Tag severity="secondary" value="Prioritas III" class="mr-2" />
              <span style="font-size:13px;font-weight:600;color:#374151;">Terapi intensif untuk komplikasi akut, prognosis pemulihan terbatas</span>
            </div>
            <div v-for="(item, i) in kriteriaICU.prioritas3" :key="'p3-' + i" class="d-flex align-items-center mb-2 ml-3">
              <Checkbox v-model="form.checklist_icu.prioritas3" :inputId="'p3-' + i" :value="item" />
              <label :for="'p3-' + i" class="mb-0 ml-2" style="font-size:13px;cursor:pointer;">{{ item }}</label>
            </div>
          </div>
        </template>
      </Card>

      <!-- SECTION 3B: KRITERIA MASUK HCU -->
      <Card v-else-if="form.unit_tujuan === 'HCU'" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-list-check mr-2" style="color:#3b82f6;"></i>
            3. Checklist Kriteria Masuk — HCU
          </span>
        </template>
        <template #content>
          <Message v-if="!hasAtLeastOneHCUCriteria && form.hasil_keputusan !== 'Ditolak'"
            severity="warn" :closable="false" class="mb-3">
            Minimal satu kriteria masuk harus dicentang sebelum menyimpan.
          </Message>
          <div v-for="(item, i) in kriteriaHCU" :key="'hcu-' + i" class="d-flex align-items-center mb-2">
            <Checkbox v-model="form.checklist_hcu" :inputId="'hcu-' + i" :value="item" />
            <label :for="'hcu-' + i" class="mb-0 ml-2" style="font-size:13px;cursor:pointer;">{{ item }}</label>
          </div>
        </template>
      </Card>

      <!-- SECTION 4: KRITERIA EKSKLUSI -->
      <Card v-if="form.unit_tujuan" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-ban mr-2" style="color:#ef4444;"></i>
            4. Checklist Kriteria Eksklusi
          </span>
        </template>
        <template #content>
          <Message v-if="!isEligible" severity="warn" :closable="false" class="mb-3">
            <strong>Perhatian:</strong> Satu atau lebih kriteria eksklusi tercentang — pasien kemungkinan
            <strong>tidak layak</strong> masuk <strong>{{ form.unit_tujuan }}</strong>.
          </Message>
          <div v-for="(item, i) in kriteriaEksklusi" :key="'eks-' + i" class="d-flex align-items-center mb-2">
            <Checkbox v-model="form.checklist_eksklusi" :inputId="'eks-' + i" :value="item" />
            <label :for="'eks-' + i" class="mb-0 ml-2"
              :style="{ fontSize:'13px', cursor:'pointer',
                color: form.checklist_eksklusi.includes(item) ? '#dc2626' : 'inherit',
                fontWeight: form.checklist_eksklusi.includes(item) ? '600' : 'normal' }">
              {{ item }}
            </label>
          </div>
          <div class="form-group mt-3 mb-0">
            <label class="field-label">
              Catatan / Justifikasi Klinis
              <small class="text-muted font-weight-normal">(wajib diisi jika ada eksklusi yang tercentang namun tetap diputuskan masuk)</small>
            </label>
            <Textarea v-model="form.catatan_eksklusi" :autoResize="true" rows="2"
              placeholder="Tuliskan justifikasi klinis..." class="w-100" />
          </div>
        </template>
      </Card>

      <!-- SECTION 5: KRITERIA FISIOLOGIS PENDUKUNG -->
      <Card v-if="form.unit_tujuan" class="mb-3">
        <template #title>
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <span class="section-header">
                <i class="pi pi-heart-fill mr-2" style="color:#3b82f6;"></i>
                5. Kriteria Fisiologis Pendukung
              </span>
              <Tag severity="secondary" value="Opsional" class="ml-2" style="font-size:11px;" />
            </div>
            <Button
              label="Ambil TTV Terakhir"
              icon="pi pi-download"
              severity="info"
              outlined
              size="small"
              :loading="isLoadingTtv"
              @click="ambilTtvTerakhir"
              v-tooltip.left="'Isi otomatis dari data TTV SOAP/CPPT terakhir pasien ini'"
            />
          </div>
        </template>
        <template #content>
          <p class="field-label mb-2"><strong>Glasgow Coma Scale (GCS)</strong></p>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">E — Eye <small class="text-muted">(1–4)</small></label>
                <InputNumber v-model="form.fisiologis.gcs_e" :min="1" :max="4" showButtons style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">M — Motor <small class="text-muted">(1–6)</small></label>
                <InputNumber v-model="form.fisiologis.gcs_m" :min="1" :max="6" showButtons style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">V — Verbal <small class="text-muted">(1–5)</small></label>
                <InputNumber v-model="form.fisiologis.gcs_v" :min="1" :max="5" showButtons style="width:100%;" />
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
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">TD Sistol <small class="text-muted">(mmHg)</small></label>
                <InputNumber v-model="form.fisiologis.td_sistol" :min="0" :max="300" style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">TD Diastol <small class="text-muted">(mmHg)</small></label>
                <InputNumber v-model="form.fisiologis.td_diastol" :min="0" :max="200" style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">Heart Rate <small class="text-muted">(x/mnt)</small></label>
                <InputNumber v-model="form.fisiologis.heart_rate" :min="0" :max="300" style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label class="field-label">Resp. Rate <small class="text-muted">(x/mnt)</small></label>
                <InputNumber v-model="form.fisiologis.resp_rate" :min="0" :max="60" style="width:100%;" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">SpO₂ <small class="text-muted">(%)</small></label>
                <InputNumber v-model="form.fisiologis.spo2" :min="0" :max="100" style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">Suhu <small class="text-muted">(°C)</small></label>
                <InputNumber v-model="form.fisiologis.suhu" :min="30" :max="45"
                  :minFractionDigits="1" :maxFractionDigits="1" style="width:100%;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group mb-0">
                <label class="field-label">Skor qSOFA / NEWS</label>
                <InputNumber v-model="form.fisiologis.skor_severitas" :min="0" :max="20" style="width:100%;" />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- SECTION 6: KEPUTUSAN & PERSETUJUAN -->
      <Card v-if="form.unit_tujuan" class="mb-3">
        <template #title>
          <span class="section-header">
            <i class="pi pi-check-circle mr-2" style="color:#3b82f6;"></i>
            6. Keputusan &amp; Persetujuan
          </span>
        </template>
        <template #content>
          <div class="mb-3">
            <label class="field-label d-block mb-2"><strong>Hasil Keputusan</strong> <span class="text-danger">*</span></label>
            <div class="d-flex flex-wrap" style="gap:1.25rem;">
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_diterima" v-model="form.hasil_keputusan" value="Diterima" />
                <label for="hasil_diterima" class="mb-0 ml-2" style="cursor:pointer;">
                  <Tag severity="success" icon="pi pi-check-circle" value="Diterima" />
                </label>
              </div>
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_ditolak" v-model="form.hasil_keputusan" value="Ditolak" />
                <label for="hasil_ditolak" class="mb-0 ml-2" style="cursor:pointer;">
                  <Tag severity="danger" icon="pi pi-times-circle" value="Ditolak" />
                </label>
              </div>
              <div class="d-flex align-items-center">
                <RadioButton inputId="hasil_dirujuk" v-model="form.hasil_keputusan" value="Dirujuk" />
                <label for="hasil_dirujuk" class="mb-0 ml-2" style="cursor:pointer;">
                  <Tag severity="warn" icon="pi pi-arrow-right" value="Dirujuk ke Unit Lain" />
                </label>
              </div>
            </div>
          </div>
          <div v-if="form.hasil_keputusan === 'Dirujuk'" class="form-group">
            <label class="field-label">Unit Tujuan Alternatif <span class="text-danger">*</span></label>
            <Select v-model="form.unit_alternatif" :options="optUnitAlternatif"
              placeholder="Pilih unit tujuan" style="width:100%;max-width:320px;" />
          </div>
          <div v-if="form.hasil_keputusan === 'Ditolak'" class="form-group">
            <label class="field-label">Alasan Penolakan <span class="text-danger">*</span></label>
            <Textarea v-model="form.alasan_penolakan" :autoResize="true" rows="3"
              placeholder="Tuliskan alasan penolakan secara jelas dan terperinci..." class="w-100" />
          </div>
          <hr class="my-3" />
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="field-label">Dokter ICU/HCU Penanggung Jawab <span class="text-danger">*</span></label>
                <div style="display:flex;gap:6px;align-items:center">
                  <Select
                    v-model="dokterApproverSelected"
                    :options="dokterList"
                    optionLabel="NAMADOKTER"
                    dataKey="KDDOKTER"
                    :filter="true"
                    filterPlaceholder="Cari dokter..."
                    placeholder="Pilih dokter penanggung jawab..."
                    style="flex:1"
                    @change="onDokterApproverChange"
                  />
                  <Button
                    icon="pi pi-refresh"
                    severity="secondary"
                    outlined
                    size="small"
                    :loading="isLoadingDokter"
                    v-tooltip.top="'Muat ulang daftar dokter'"
                    @click="refreshDokterList"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="field-label">Tanda Tangan Digital <small class="text-muted">(mock)</small></label>
                <InputText v-model="form.ttd_digital" placeholder="Ketik nama sebagai tanda tangan digital..." class="w-100" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5">
              <div class="form-group mb-0">
                <label class="field-label">Tanggal &amp; Jam Keputusan</label>
                <DatePicker v-model="form.tgl_keputusan" :showTime="true" hourFormat="24"
                  dateFormat="dd/mm/yy" :showIcon="true" style="width:100%;" />
              </div>
            </div>
          </div>
          <div class="mt-3">
            <Message v-if="form.hasil_keputusan === 'Diterima' && isEligible" severity="success" :closable="false">
              <i class="pi pi-check-circle mr-2"></i>
              Pasien <strong>memenuhi kriteria kelayakan</strong> untuk masuk <strong>{{ form.unit_tujuan }}</strong>.
            </Message>
            <Message v-else-if="form.hasil_keputusan === 'Diterima' && !isEligible" severity="warn" :closable="false">
              <i class="pi pi-exclamation-triangle mr-2"></i>
              Keputusan diterima, namun terdapat <strong>kriteria eksklusi yang tercentang</strong>.
            </Message>
            <Message v-else-if="form.hasil_keputusan === 'Ditolak'" severity="error" :closable="false">
              <i class="pi pi-times-circle mr-2"></i>
              Pasien <strong>tidak diterima</strong> masuk <strong>{{ form.unit_tujuan }}</strong>.
            </Message>
            <Message v-else-if="form.hasil_keputusan === 'Dirujuk'" severity="info" :closable="false">
              <i class="pi pi-arrow-right-arrow-left mr-2"></i>
              Pasien akan <strong>dirujuk</strong> ke unit alternatif yang dipilih.
            </Message>
          </div>
        </template>
      </Card>

      <!-- ACTION BAR -->
      <Card v-if="form.unit_tujuan">
        <template #content>
          <div class="d-flex justify-content-between align-items-center flex-wrap" style="gap:10px">
            <div class="d-flex align-items-center" style="gap:8px">
              <Tag v-if="form.hasil_keputusan === 'Diterima'" severity="success" icon="pi pi-check-circle" value="Status: Diterima" />
              <Tag v-else-if="form.hasil_keputusan === 'Ditolak'" severity="danger" icon="pi pi-times-circle" value="Status: Ditolak" />
              <Tag v-else-if="form.hasil_keputusan === 'Dirujuk'" severity="warn" icon="pi pi-arrow-right" value="Status: Dirujuk" />
              <Tag v-else severity="secondary" icon="pi pi-clock" value="Belum Dinilai" />
              <Tag v-if="editMode" severity="warn" icon="pi pi-pencil" value="Mode Edit" />
            </div>
            <div class="d-flex align-items-center" style="gap:8px">
              <Button v-if="editMode" label="Batal" icon="pi pi-times" severity="secondary" outlined
                @click="batalEdit" :disabled="isSaving" />
              <Button
                :label="editMode ? 'Update Checklist' : 'Simpan Checklist'"
                :icon="editMode ? 'pi pi-check' : 'pi pi-save'"
                :severity="editMode ? 'warn' : 'primary'"
                :disabled="!canSubmit || isSaving" :loading="isSaving"
                @click="onSubmit" />
            </div>
          </div>
        </template>
      </Card>

    </div>
  </section>
</template>

<script>
import { EventBus } from '../bus';

export default {
  props: {
    initialNoregister: {
      type: String,
      default: null,
    },
  },

  emits: ['checklist-saved'],

  data() {
    return {
      noregister:        '',
      dataPasien:        {},
      isLoadingPasien:   false,
      isLoadingRiwayat:  false,
      isSaving:          false,
      riwayat:           [],
      showDetail:        false,
      detailData:        null,

      optUnitAlternatif: ['ICU', 'HCU', 'Ruang Rawat Biasa', 'ICCU', 'PICU / NICU'],
      dokterList: [],
      dokterApproverSelected: null,
      isLoadingTtv: false,
      isLoadingDokter: false,
      editMode: false,
      editId: null,

      kriteriaICU: {
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
      },

      kriteriaHCU: [
        'Kondisi hemodinamik relatif stabil (tidak butuh vasoaktif dosis tinggi kontinu)',
        'Tidak memerlukan ventilasi mekanik invasif (boleh NRM / nasal kanul / NIV intermiten)',
        'Memerlukan observasi tanda vital ketat (frekuensi >1x/jam)',
        'Pasien pasca operasi risiko sedang yang butuh pengawasan pasca-anestesi lebih lama',
        'Pasien "step-down" dari ICU yang sudah stabil namun belum layak ke ruang biasa',
        'Pasien "step-up" dari ruang rawat inap biasa dengan perburukan ringan-sedang',
      ],

      kriteriaEksklusi: [
        'Mati batang otak (MBO)',
        'Koma permanen dengan kemungkinan sadar kembali sangat kecil',
        'Stadium akhir penyakit terminal tanpa rencana terapi agresif lanjutan',
        'Keputusan keluarga / pasien menolak perawatan intensif (informed consent terlampir)',
      ],

      form: {
        noregister:           '',
        no_rm:                '',
        nama_pasien:          '',
        ruangan_asal:         '',
        dokter_perujuk:       '',
        diagnosa:             '',
        tgl_pengajuan:        new Date(),
        unit_tujuan:          null,
        checklist_icu:        { prioritas1: [], prioritas2: [], prioritas3: [] },
        checklist_hcu:        [],
        checklist_eksklusi:   [],
        catatan_eksklusi:     '',
        fisiologis: {
          gcs_e: null, gcs_m: null, gcs_v: null,
          td_sistol: null, td_diastol: null,
          heart_rate: null, resp_rate: null,
          spo2: null, suhu: null, skor_severitas: null,
        },
        hasil_keputusan:      null,
        unit_alternatif:      null,
        alasan_penolakan:     '',
        nama_dokter_approver: '',
        ttd_digital:          '',
        tgl_keputusan:        new Date(),
      },
    };
  },

  computed: {
    isEligible() {
      return this.form.checklist_eksklusi.length === 0;
    },
    hasAtLeastOneICUCriteria() {
      const { prioritas1, prioritas2, prioritas3 } = this.form.checklist_icu;
      return prioritas1.length > 0 || prioritas2.length > 0 || prioritas3.length > 0;
    },
    hasAtLeastOneHCUCriteria() {
      return this.form.checklist_hcu.length > 0;
    },
    gcsTotalScore() {
      const e = this.form.fisiologis.gcs_e || 0;
      const m = this.form.fisiologis.gcs_m || 0;
      const v = this.form.fisiologis.gcs_v || 0;
      const total = e + m + v;
      return total > 0 ? total : '—';
    },
    canSubmit() {
      if (!this.form.unit_tujuan || !this.form.hasil_keputusan) return false;
      if (this.form.hasil_keputusan === 'Ditolak') return true;
      if (this.form.unit_tujuan === 'ICU') return this.hasAtLeastOneICUCriteria;
      if (this.form.unit_tujuan === 'HCU') return this.hasAtLeastOneHCUCriteria;
      return false;
    },
  },

  created() {
    // Gunakan prop jika disediakan (mode dialog), fallback ke URL path (mode page)
    this.noregister      = this.initialNoregister || window.location.pathname.split('/').pop();
    this.form.noregister = this.noregister;
    this.fetchDataPasien();
    this.fetchRiwayat();
    this.allMasterDokter();
  },

  methods: {
    async fetchDataPasien() {
      this.isLoadingPasien = true;
      try {
        const res = await axios.post('/datapasienpertransaksi', {
          mode: 'history8',
          noregister: this.noregister,
        });
        const data = res.data?.response?.[0] || {};
        this.dataPasien          = data;
        this.form.no_rm          = data.NOMR          || '';
        this.form.nama_pasien    = data.NAMAPASIEN    || data.DATA_SINGKAT || '';
        this.form.dokter_perujuk = data.NAMADOKTER    || '';
        this.form.ruangan_asal   = data.POLI          || '';
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingPasien = false;
      }
    },

    async fetchRiwayat() {
      this.isLoadingRiwayat = true;
      try {
        const res = await axios.post('/icu/get_checklist_masuk', { noregister: this.noregister });
        this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoadingRiwayat = false;
      }
    },

    lihatDetail(row) {
      this.detailData = row;
      this.showDetail = true;
    },

    konfirmasiHapus(row) {
      this.$confirm.require({
        group: 'icuChecklist',
        message: `Hapus checklist tanggal ${this.formatWaktu(row.created_at)}? Tindakan ini tidak dapat dibatalkan.`,
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        accept: () => this.hapus(row),
      });
    },

    async hapus(row) {
      try {
        const res = await axios.post('/icu/hapus_checklist_masuk', {
          noregister:    this.noregister,
          id_checklist:  row.id_checklist,
        });
        if (res.data?.code === 200) {
          this.open('info', 'Checklist berhasil dihapus.');
          await this.fetchRiwayat();
        } else {
          this.open('error', res.data?.message || 'Gagal menghapus checklist.');
        }
      } catch (e) {
        console.error(e);
        this.open('error', e.message);
      }
    },

    async onSubmit() {
      if (!this.form.ruangan_asal) {
        this.open('warn', 'Ruangan / unit asal pengajuan wajib dipilih.');
        return;
      }
      if (!this.form.diagnosa.trim()) {
        this.open('warning', 'Diagnosa kerja wajib diisi.');
        return;
      }
      if (this.form.hasil_keputusan === 'Ditolak' && !this.form.alasan_penolakan.trim()) {
        this.open('warn', 'Alasan penolakan wajib diisi.');
        return;
      }
      if (this.form.hasil_keputusan === 'Dirujuk' && !this.form.unit_alternatif) {
        this.open('warn', 'Unit tujuan alternatif wajib dipilih.');
        return;
      }
      if (!this.form.nama_dokter_approver.trim()) {
        this.open('warn', 'Nama dokter penanggung jawab wajib diisi.');
        return;
      }

      const checklist_masuk = this.form.unit_tujuan === 'ICU'
        ? {
            prioritas1: [...this.form.checklist_icu.prioritas1],
            prioritas2: [...this.form.checklist_icu.prioritas2],
            prioritas3: [...this.form.checklist_icu.prioritas3],
          }
        : { hcu: [...this.form.checklist_hcu] };

      const payload = {
        noregister:           this.form.noregister,
        no_rm:                this.form.no_rm,
        nama_pasien:          this.form.nama_pasien,
        ruangan_asal:         this.form.ruangan_asal,
        dokter_perujuk:       this.form.dokter_perujuk,
        diagnosa:             this.form.diagnosa,
        tgl_pengajuan:        this.form.tgl_pengajuan,
        unit_tujuan:          this.form.unit_tujuan,
        checklist_masuk,
        checklist_eksklusi:   [...this.form.checklist_eksklusi],
        catatan_eksklusi:     this.form.catatan_eksklusi,
        is_eligible:          this.isEligible,
        fisiologis: {
          ...this.form.fisiologis,
          gcs_total: typeof this.gcsTotalScore === 'number' ? this.gcsTotalScore : null,
        },
        hasil_keputusan:      this.form.hasil_keputusan,
        unit_alternatif:      this.form.unit_alternatif,
        alasan_penolakan:     this.form.alasan_penolakan,
        nama_dokter_approver: this.form.nama_dokter_approver,
        ttd_digital:          this.form.ttd_digital,
        tgl_keputusan:        this.form.tgl_keputusan,
      };

      this.isSaving = true;
      try {
        const endpoint = this.editMode
          ? '/icu/update_checklist_masuk'
          : '/icu/simpan_checklist_masuk';

        if (this.editMode) payload.id_checklist = this.editId;

        const res = await axios.post(endpoint, payload);
        if (res.data?.code === 200) {
          this.open('success', this.editMode ? 'Checklist berhasil diperbarui.' : 'Checklist berhasil disimpan.');
          await this.fetchRiwayat();
          this.$emit('checklist-saved', { noregister: this.noregister });
          this.resetForm();
        } else {
          this.open('error', res.data?.message || 'Gagal menyimpan checklist.');
        }
      } catch (e) {
        console.error(e);
        this.open('error', e.message || 'Terjadi kesalahan saat menyimpan.');
      } finally {
        this.isSaving = false;
      }
    },

    editChecklist(row) {
      // Isi form dari data riwayat
      this.form.diagnosa            = row.diagnosa          || '';
      this.form.ruangan_asal        = row.ruangan_asal      || '';
      this.form.dokter_perujuk      = row.dokter_perujuk    || '';
      this.form.unit_tujuan         = row.unit_tujuan       || null;
      this.form.hasil_keputusan     = row.hasil_keputusan   || null;
      this.form.unit_alternatif     = row.unit_alternatif   || null;
      this.form.alasan_penolakan    = row.alasan_penolakan  || '';
      this.form.catatan_eksklusi    = row.catatan_eksklusi  || '';
      this.form.nama_dokter_approver = row.nama_dokter_approver || '';
      this.form.ttd_digital         = row.ttd_digital       || '';

      // Parse tanggal
      if (row.tgl_pengajuan) {
        const d = new Date(row.tgl_pengajuan.replace(' ', 'T'));
        if (!isNaN(d)) this.form.tgl_pengajuan = d;
      }
      if (row.tgl_keputusan) {
        const d = new Date(row.tgl_keputusan.replace(' ', 'T'));
        if (!isNaN(d)) this.form.tgl_keputusan = d;
      }

      // Checklist masuk
      this.form.checklist_icu = { prioritas1: [], prioritas2: [], prioritas3: [] };
      this.form.checklist_hcu = [];
      if (row.checklist_masuk_json) {
        if (row.unit_tujuan === 'ICU') {
          this.form.checklist_icu.prioritas1 = [...(row.checklist_masuk_json.prioritas1 || [])];
          this.form.checklist_icu.prioritas2 = [...(row.checklist_masuk_json.prioritas2 || [])];
          this.form.checklist_icu.prioritas3 = [...(row.checklist_masuk_json.prioritas3 || [])];
        } else {
          this.form.checklist_hcu = [...(row.checklist_masuk_json.hcu || [])];
        }
      }

      // Checklist eksklusi
      this.form.checklist_eksklusi = Array.isArray(row.checklist_eksklusi_json)
        ? [...row.checklist_eksklusi_json] : [];

      // Fisiologis
      const f = row.fisiologis_json || {};
      this.form.fisiologis.gcs_e          = f.gcs_e          ?? null;
      this.form.fisiologis.gcs_m          = f.gcs_m          ?? null;
      this.form.fisiologis.gcs_v          = f.gcs_v          ?? null;
      this.form.fisiologis.td_sistol      = f.td_sistol      ?? null;
      this.form.fisiologis.td_diastol     = f.td_diastol     ?? null;
      this.form.fisiologis.heart_rate     = f.heart_rate     ?? null;
      this.form.fisiologis.resp_rate      = f.resp_rate      ?? null;
      this.form.fisiologis.spo2           = f.spo2           ?? null;
      this.form.fisiologis.suhu           = f.suhu           ?? null;
      this.form.fisiologis.skor_severitas = f.skor_severitas ?? null;

      // Dropdown dokter — cari match dari list
      const match = this.dokterList.find(d => d.NAMADOKTER === row.nama_dokter_approver);
      this.dokterApproverSelected = match || null;

      // Aktifkan edit mode
      this.editMode = true;
      this.editId   = row.id_checklist;

      // Scroll ke form
      this.$nextTick(() => {
        const el = document.querySelector('.edit-mode-banner');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    },

    batalEdit() {
      this.resetForm();
    },

    resetForm() {
      this.dokterApproverSelected = null;
      this.editMode = false;
      this.editId   = null;
      this.form = {
        noregister:           this.noregister,
        no_rm:                this.form.no_rm,
        nama_pasien:          this.form.nama_pasien,
        ruangan_asal:         this.form.ruangan_asal,
        dokter_perujuk:       this.form.dokter_perujuk,
        diagnosa:             '',
        tgl_pengajuan:        new Date(),
        unit_tujuan:          null,
        checklist_icu:        { prioritas1: [], prioritas2: [], prioritas3: [] },
        checklist_hcu:        [],
        checklist_eksklusi:   [],
        catatan_eksklusi:     '',
        fisiologis: {
          gcs_e: null, gcs_m: null, gcs_v: null,
          td_sistol: null, td_diastol: null,
          heart_rate: null, resp_rate: null,
          spo2: null, suhu: null, skor_severitas: null,
        },
        hasil_keputusan:      null,
        unit_alternatif:      null,
        alasan_penolakan:     '',
        nama_dokter_approver: '',
        ttd_digital:          '',
        tgl_keputusan:        new Date(),
      };
    },

    async ambilTtvTerakhir() {
      this.isLoadingTtv = true;
      try {
        const res = await axios.post('/get_soap', {
          noregister: this.noregister,
          lokasi: 'IGD',
          mode: 1,
        });
        const list = res.data?.response;
        if (!list || !list.length) {
          this.open('warn', 'Belum ada data TTV dari SOAP/CPPT untuk pasien ini.');
          return;
        }
        const ttv = list[0];
        const num = (v) => { const n = parseFloat(v); return isNaN(n) || n === 0 ? null : n; };
        if (num(ttv.suhu))       this.form.fisiologis.suhu        = num(ttv.suhu);
        if (num(ttv.sistole))    this.form.fisiologis.td_sistol    = num(ttv.sistole);
        if (num(ttv.diastole))   this.form.fisiologis.td_diastol   = num(ttv.diastole);
        if (num(ttv.nadi))       this.form.fisiologis.heart_rate   = num(ttv.nadi);
        if (num(ttv.spo2))       this.form.fisiologis.spo2         = num(ttv.spo2);
        const rr = num(ttv.pernafasan) || num(ttv.respirasi);
        if (rr)                  this.form.fisiologis.resp_rate    = rr;
        this.open('success', 'TTV berhasil diambil dari SOAP terakhir. GCS (E/M/V) harap diisi manual.');
      } catch (e) {
        console.error(e);
        this.open('error', 'Gagal mengambil TTV terakhir.');
      } finally {
        this.isLoadingTtv = false;
      }
    },

    onDokterApproverChange(e) {
      this.form.nama_dokter_approver = e.value?.NAMADOKTER || '';
    },

    async refreshDokterList() {
      // Hapus semua cache dokter lalu fetch ulang
      const toDelete = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dokter_master_')) toDelete.push(key);
      }
      toDelete.forEach(k => localStorage.removeItem(k));

      this.isLoadingDokter = true;
      try {
        const res = await axios.post('/getnamadokter', { mode: 2 });
        this.dokterList = res.data.response || [];
        const d = new Date();
        const today = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
        try {
          localStorage.setItem(`dokter_master_${today}`, JSON.stringify(this.dokterList));
        } catch (e) {
          console.warn('Gagal menyimpan cache dokter:', e.message);
        }
        this.open('success', `Daftar dokter diperbarui (${this.dokterList.length} dokter).`);
      } catch (e) {
        console.error(e);
        this.open('error', 'Gagal memuat daftar dokter.');
      } finally {
        this.isLoadingDokter = false;
      }
    },

    async allMasterDokter() {
      const d = new Date();
      const today = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
      const cacheKey = `dokter_master_${today}`;

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          this.dokterList = JSON.parse(cached);
          return;
        } catch (e) {
          localStorage.removeItem(cacheKey);
        }
      }

      const toDelete = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('dokter_master_')) toDelete.push(key);
      }
      toDelete.forEach(k => localStorage.removeItem(k));

      try {
        const res = await axios.post('/getnamadokter', { mode: 2 });
        this.dokterList = res.data.response || [];
        try {
          localStorage.setItem(cacheKey, JSON.stringify(this.dokterList));
        } catch (e) {
          console.warn('Gagal menyimpan cache dokter:', e.message);
        }
      } catch (e) {
        console.error(e);
      }
    },

    hasAnyFisiologis(f) {
      return f && (f.gcs_total || f.td_sistol || f.heart_rate || f.resp_rate || f.spo2 || f.suhu);
    },

    formatWaktu(val) {
      if (!val) return '—';
      const d = new Date(val.replace(' ', 'T'));
      if (isNaN(d)) return val;
      const dd   = String(d.getDate()).padStart(2, '0');
      const mm   = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh   = String(d.getHours()).padStart(2, '0');
      const min  = String(d.getMinutes()).padStart(2, '0');
      return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    },

    open(type, message) {
      EventBus.$emit('show-alert', { type, title: '', message });
    },
  },
};
</script>

<style scoped>
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

.edit-mode-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fff8e1;
  border: 1.5px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 13px;
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
