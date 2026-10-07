<template>
  <section class="content">
    <div class="container-fluid">
      <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

      <!-- FORM PERMINTAAN OPERASI -->
      <div class="card elevation-0">
        <div class="card-header">
          <h3 class="card-title">
            <i class="fas fa-procedures mr-2"></i>Form Permintaan Operasi
            <span v-if="editMode" class="badge badge-warning ml-2">Mode Edit</span>
          </h3>
        </div>
        <div class="card-body">
          <!-- Data Pasien -->
          <div class="row col-md-8">
            <div class="col-md-6">
              <div class="form-group">
                <label>No. Rekam Medis <span class="text-danger">*</span></label>

                <InputText v-model="form.no_rm" disabled placeholder="Contoh: RM-2024-001" class="w-100" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Nama Pasien <span class="text-danger">*</span></label>
                <InputText v-model="form.nama_pasien" disabled placeholder="Nama lengkap pasien" class="w-100" />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-md-6">
              <div class="form-group">
                <label>Jenis Kelamin</label>
                <InputText v-model="form.jenis_kelamin" disabled class="w-100" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Tanggal Lahir</label>
                <InputText v-model="form.tgl_lahir" disabled class="w-100" />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-md-6">
              <div class="form-group">
                <label>Jenis Rawat</label>
                <InputText v-model="form.jenis_rawat" disabled class="w-100" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Asal Ruang Permintaan</label>
                <InputText v-model="form.asal_ruang_nama" disabled class="w-100" />
              </div>
            </div>
          </div>

          <hr />

          <!-- Detail Operasi -->
          <div class="row col-md-8">
            <div class="col-12">
              <div class="form-group">
                <label>Jenis Operasi / Tindakan <span class="text-danger">*</span></label>
                <Select v-model="form.jenis_operasi" :filter="true" :options="optJenisOperasi"
                  optionLabel="NAMA"
                  placeholder="Pilih jenis operasi" class="w-100" />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-md-6">
              <div class="form-group">
                <label>Tanggal &amp; Jam Operasi <span class="text-danger">*</span></label>
                <Calendar v-model="form.tgl_operasi" dateFormat="dd/mm/yy" showTime hourFormat="24"
                  :showIcon="true" placeholder="Pilih tanggal & jam" class="w-100" />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-md-6">
              <div class="form-group">
                <label>Dokter Operator <span class="text-danger">*</span></label>
                <Select v-model="form.dokter_operator" :options="optDokterOperator"
                  optionLabel="NAMADOKTER"
                  placeholder="Pilih dokter operator" class="w-100"
                  :filter="true" filterPlaceholder="Cari dokter..." />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-12">
              <div class="form-group">
                <label>Diagnosis / Indikasi Operasi <span class="text-danger">*</span></label>
                <Textarea v-model="form.diagnosis" :autoResize="true" rows="3"
                  placeholder="Tuliskan diagnosis dan indikasi operasi..."
                  class="w-100" />
              </div>
            </div>
          </div>

          <div class="row col-md-8">
            <div class="col-12">
              <div class="form-group">
                <label>Catatan Tambahan</label>
                <Textarea v-model="form.catatan" :autoResize="true" rows="2"
                  placeholder="Catatan khusus, persiapan, atau hal lain..."
                  class="w-100" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer text-right">
          <Button v-if="editMode" label="Batal Edit" icon="pi pi-times"
            class="p-button-secondary mr-2" @click="batalkanEdit()" />
          <Button v-else label="Reset" icon="pi pi-refresh"
            class="p-button-secondary mr-2" @click="resetForm()" />
          <Button :label="editMode ? 'Simpan Perubahan' : 'Kirim Permintaan'"
            :icon="editMode ? 'pi pi-save' : 'pi pi-check'"
            class="p-button-primary" @click="submitForm()" />
        </div>
      </div>

      <!-- ===== TABEL JADWAL OPERASI ===== -->
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3 class="card-title mb-0">
            <i class="fas fa-calendar-alt mr-2"></i>Daftar Jadwal Operasi
          </h3>
          <Button
            label="Refresh"
            icon="pi pi-refresh"
            class="p-button-sm p-button-outlined p-button-secondary"
            @click="getJadwalOperasi()" />
        </div>
        <div class="card-body p-0">
          <DataTable
            :value="listJadwalOperasi"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 25]"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} - {last} dari {totalRecords} data"
            responsiveLayout="scroll"
            stripedRows
            class="p-datatable-sm"
            :loading="isLoadingTable"
            emptyMessage="Tidak ada data jadwal operasi."
          >
            <Column field="nomor" header="No." :style="{ width: '60px', textAlign: 'center' }">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>

            <Column field="nomorrm" header="No. RM" :sortable="true" />

            <Column field="nama" header="Nama Pasien" :sortable="true">
              <template #body="slotProps">
                <span class="text-capitalize">{{ slotProps.data.nama }}</span>
              </template>
            </Column>

            <Column field="jeniskelamin" header="JK" :style="{ width: '60px', textAlign: 'center' }">
              <template #body="slotProps">
                <span :class="slotProps.data.jeniskelamin === 'L' ? 'badge-jk-l' : 'badge-jk-p'">
                  {{ slotProps.data.jeniskelamin === 'L' ? 'L' : 'P' }}
                </span>
              </template>
            </Column>

            <Column field="usia" header="Usia" />

            <Column field="namapoli" header="Poli / Unit" :sortable="true">
              <template #body="slotProps">
                <span class="badge badge-info badge-poli">{{ slotProps.data.namapoli }}</span>
              </template>
            </Column>

            <Column field="dokter" header="Dokter Operator" :sortable="true" />

            <Column field="tanggaloperasi" header="Tanggal & Jam Operasi" :sortable="true">
              <template #body="slotProps">
                <div>
                  <i class="far fa-calendar mr-1 text-muted"></i>
                  {{ formatTanggal(slotProps.data.tanggaloperasi) }}
                </div>
                <small class="text-muted">
                  <i class="far fa-clock mr-1"></i>{{ slotProps.data.jam }}
                </small>
              </template>
            </Column>

            <Column field="jenistindakan" header="Jenis Tindakan">
              <template #body="slotProps">
                <span v-if="slotProps.data.jenistindakan">{{ slotProps.data.jenistindakan }}</span>
                <span v-else class="text-muted font-italic">-</span>
              </template>
            </Column>

            <Column field="terlaksana" header="Status" :style="{ textAlign: 'center' }">
              <template #body="slotProps">
                <span :class="getStatusClass(slotProps.data.terlaksana)">
                  <i :class="getStatusIcon(slotProps.data.terlaksana)"></i>
                  {{ getStatusLabel(slotProps.data.terlaksana) }}
                </span>
              </template>
            </Column>

            <Column header="Aksi" :style="{ width: '130px', textAlign: 'center' }">
              <template #body="slotProps">
                <Button
                  icon="pi pi-eye"
                  class="p-button-sm p-button-rounded p-button-info p-button-text mr-1"
                  v-tooltip.top="'Detail'"
                  @click="lihatDetail(slotProps.data)"
                />
                <Button
                  v-if="slotProps.data.terlaksana === '0'"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-rounded p-button-warning p-button-text mr-1"
                  v-tooltip.top="'Edit'"
                  @click="editJadwal(slotProps.data)"
                />
                <Button
                  v-if="slotProps.data.terlaksana === '0'"
                  icon="pi pi-trash"
                  class="p-button-sm p-button-rounded p-button-danger p-button-text"
                  v-tooltip.top="'Batalkan'"
                  @click="konfirmasiBatal(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Dialog Detail -->
      <Dialog
        v-model:visible="dialogDetail"
        header="Detail Jadwal Operasi"
        :modal="true"
        :style="{ width: '500px' }"
        :closable="true">
        <div v-if="selectedJadwal" class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">No. RM</span>
            <span class="detail-value">{{ selectedJadwal.nomorrm }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Nama Pasien</span>
            <span class="detail-value text-capitalize">{{ selectedJadwal.nama }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Usia</span>
            <span class="detail-value">{{ selectedJadwal.usia }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">No. Peserta</span>
            <span class="detail-value">{{ selectedJadwal.nopeserta }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Poli</span>
            <span class="detail-value">{{ selectedJadwal.namapoli }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Dokter</span>
            <span class="detail-value">{{ selectedJadwal.dokter }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tanggal Operasi</span>
            <span class="detail-value">{{ formatTanggal(selectedJadwal.tanggaloperasi) }} — {{ selectedJadwal.jam }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Kode Booking</span>
            <span class="detail-value">{{ selectedJadwal.kodebooking }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Alamat</span>
            <span class="detail-value">{{ selectedJadwal.alamat }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span :class="getStatusClass(selectedJadwal.terlaksana)">
              {{ getStatusLabel(selectedJadwal.terlaksana) }}
            </span>
          </div>
        </div>
        <template #footer>
          <Button label="Tutup" icon="pi pi-times" class="p-button-secondary" @click="dialogDetail = false" />
        </template>
      </Dialog>

    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { EventBus } from '../bus';

export default {
  components: {
    Loading,
    Textarea,
    DataTable,
    Column,
    Dialog,
  },
  props: ['datapasien'],
  data() {
    return {
      isLoading: false,
      isLoadingTable: false,
      fullPage: true,
      minDate: new Date(),

      // Dialog
      dialogDetail: false,
      selectedJadwal: null,
      // Edit
      editMode: false,
      form: {
        no_rm: this.datapasien.NOMR,
        noregister: this.datapasien.NOPENDAFTARAN,
        nama_pasien: this.datapasien.NAMAPASIEN,
        jenis_kelamin: this.datapasien.JENISKELAMIN,
        tgl_lahir: `${this.datapasien.USIA_PASIEN['tahun']} tahun ${this.datapasien.USIA_PASIEN['bulan']} bulan ${this.datapasien.USIA_PASIEN['hari']} hari`,
        nokartu: this.datapasien.NOJAMINAN,
        nosep: this.datapasien.NOSEP,
        jenis_rawat: this.datapasien.JENISRAWAT,
        asal_ruang_kode: this.datapasien.KODERUANGAN || this.datapasien.KODEPOLI,
        asal_ruang_nama: this.datapasien.POLI,
        kodebooking: null,
        jenis_operasi: null,
        dokter_operator: null,
        dokter_anestesi: null,
        tgl_operasi: null,
        kamar_ok: null,
        diagnosis: '',
        catatan: '',
      },
      optJenisOperasi: [],
      optDokterOperator: [],
      // Data tabel
      listJadwalOperasi: [],
    };
  },
  created() {
    this.getnamaruangan_poli();
    this.getnamadokter();
    this.getJadwalOperasi();
  },
  methods: {
    // ===== Helpers =====
    formatTanggal(val) {
      if (!val) return '-';
      const d = new Date(val);
      if (isNaN(d)) return val;
      return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    },

    getStatusLabel(terlaksana) {
      if (terlaksana === '1' || terlaksana === 1) return 'Terlaksana';
      if (terlaksana === '2' || terlaksana === 2) return 'Dibatalkan';
      return 'Dijadwalkan';
    },

    getStatusClass(terlaksana) {
      if (terlaksana === '1' || terlaksana === 1) return 'status-badge status-done';
      if (terlaksana === '2' || terlaksana === 2) return 'status-badge status-cancel';
      return 'status-badge status-scheduled';
    },

    getStatusIcon(terlaksana) {
      if (terlaksana === '1' || terlaksana === 1) return 'pi pi-check-circle mr-1';
      if (terlaksana === '2' || terlaksana === 2) return 'pi pi-times-circle mr-1';
      return 'pi pi-clock mr-1';
    },

    lihatDetail(data) {
      this.selectedJadwal = data;
      this.dialogDetail = true;
    },

    editJadwal(data) {
      const jenisOperasi = this.optJenisOperasi.find(o => o.KODE === data.kodepolirs) || null;
      const dokterOperator = this.optDokterOperator.find(o => o.NAMADOKTER === data.dokter) || null;

      this.form = {
        ...this.form,
        noregister: data.noregister,
        kodebooking: data.kodebooking,
        nosep: data.NOSEP || this.datapasien.NOSEP,
        jenis_operasi: jenisOperasi,
        dokter_operator: dokterOperator,
        tgl_operasi: data.tanggaloperasi ? new Date(data.tanggaloperasi) : null,
        diagnosis: data.diagnosis || '',
        catatan: data.catatan || '',
      };

      this.editMode = true;
      this.open('info', `Mengubah jadwal operasi ${data.nama}. Silakan perbarui data lalu simpan.`);

      this.$nextTick(() => {
        const el = document.querySelector('.card.elevation-0');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },

    batalkanEdit() {
      this.resetForm();
    },

    konfirmasiBatal(data) {
      this.$confirm.require({
        message: `Batalkan jadwal operasi untuk pasien ${data.nama}?`,
        header: 'Konfirmasi Pembatalan',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Ya, Batalkan',
        rejectLabel: 'Tidak',
        accept: () => this.batalkanJadwal(data),
      });
    },

    // ===== API Calls =====
    async getnamaruangan_poli() {
      this.form.mode = 0;
      await axios.post('/getnamaruangan_poli', this.form)
        .then(response => { this.optJenisOperasi = response.data; })
        .catch(error => console.log(error))
        .finally(() => this.isLoading = false);
    },

    async getnamadokter() {
      this.form.mode = 2;
      await axios.post('/getnamadokter', this.form)
        .then(response => { this.optDokterOperator = response.data.response; })
        .catch(error => console.log(error))
        .finally(() => this.isLoading = false);
    },

    async getJadwalOperasi() {
      this.isLoadingTable = true;
      this.form.mode = 2;
      await axios.post('/get_jadwal_operasi',this.form)
        .then(response => {
          this.listJadwalOperasi = [];
          if (response.data.response.length > 0) {
            this.listJadwalOperasi = response.data.response;
          } else {
            this.listJadwalOperasi = [];
          }
        })
        .catch(error => {
          console.log(error);
          this.listJadwalOperasi = [];
        })
        .finally(() => this.isLoadingTable = false);
    },

    async submitForm() {
      if (!this.validateForm()) return;
      const payload = { ...this.form, mode: this.editMode ? 0 : 1 };
      this.isLoading = true;

      await axios.post('/insert_jadwal_operasi_v2', payload)
        .then(response => {
          if (response.data.metadata.code === 200) {
            this.open('success', this.editMode
              ? 'Jadwal operasi berhasil diperbarui!'
              : 'Permintaan operasi berhasil dikirim!');
            this.resetForm();
            this.getJadwalOperasi(); // Refresh tabel setelah submit
          } else {
            this.open('error', response.data.metadata.message || 'Gagal menyimpan permintaan operasi.');
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.isLoading = false);
    },

    async batalkanJadwal(data) {
      this.isLoading = true;
      await axios.post('/batal_jadwal_operasi', { noregister: data.noregister, kodebooking: data.kodebooking })
        .then(response => {
          if (response.data.metadata.code === 200) {
            this.open('success', 'Jadwal operasi berhasil dibatalkan.');
            this.getJadwalOperasi();
          } else {
            this.open('error', 'Gagal membatalkan jadwal.');
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.isLoading = false);
    },

    validateForm() {
      const required = [
        { field: this.form.dokter_operator, label: 'Dokter Operator' },
        { field: this.form.tgl_operasi, label: 'Tanggal Operasi' },
      ];
      for (const item of required) {
        if (!item.field) {
          this.open('warning', `${item.label} wajib diisi.`);
          return false;
        }
      }
      return true;
    },

    resetForm() {
      this.editMode = false;
      this.form = {
        ...this.form,
        noregister: this.datapasien.NOPENDAFTARAN,
        kodebooking: null,
        jenis_operasi: null,
        dokter_operator: null,
        dokter_anestesi: null,
        tgl_operasi: null,
        kamar_ok: null,
        diagnosis: '',
        catatan: '',
      };
    },

    open(type, message, title = '') {
      EventBus.$emit('show-alert', { type, title, message });
    },
  },
};
</script>

<style scoped>
.w-100 { width: 100%; }

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}
.status-scheduled { background: #fff3cd; color: #856404; }
.status-done      { background: #d1e7dd; color: #0a5c36; }
.status-cancel    { background: #f8d7da; color: #842029; }

/* JK Badge */
.badge-jk-l {
  display: inline-block;
  padding: 2px 8px;
  background: #cfe2ff;
  color: #084298;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}
.badge-jk-p {
  display: inline-block;
  padding: 2px 8px;
  background: #f8d7da;
  color: #842029;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

/* Poli Badge */
.badge-poli {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
}

/* Detail Dialog Grid */
.detail-grid { display: flex; flex-direction: column; gap: 10px; }
.detail-row  { display: flex; align-items: flex-start; gap: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
.detail-label {
  min-width: 140px;
  font-weight: 600;
  color: #6c757d;
  font-size: 13px;
}
.detail-value { font-size: 13px; color: #212529; }
</style>
