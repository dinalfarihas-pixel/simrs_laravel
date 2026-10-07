<template>
  <section class="content">
    <ConfirmDialog></ConfirmDialog>
    <div class="container-fluid">
      <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
      <!-- Summary Cards -->
      <div class="row mb-3">
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0">{{ calculateTotalRooms() }}</h4>
                  <div class="text-white-50">Total Ruangan</div>
                </div>
                <i class="pi pi-home" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0">{{ calculateTotalBeds() }}</h4>
                  <div class="text-white-50">Total Tempat Tidur</div>
                </div>
                <i class="pi pi-table" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0">{{ calculateTotalBrokenBeds() }}</h4>
                  <div class="text-white-50">Tempat Tidur Rusak</div>
                </div>
                <i class="pi pi-exclamation-triangle" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="mb-0">{{ calculateAvailableBeds() }}</h4>
                  <div class="text-white-50">Tempat Tidur Tersedia</div>
                </div>
                <i class="pi pi-check-circle" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Introduction Card -->
      <div class="card mb-3">
        <div class="card-header bg-light">
          <h3 class="card-title">
            <i class="pi pi-info-circle mr-2"></i>Manajemen Ruangan dan Tempat Tidur
          </h3>
        </div>
        <div class="card-body">
          <p>
            Halaman ini digunakan untuk mengelola data ruangan dan tempat tidur di rumah sakit.
            Pengguna dapat menambahkan ruangan baru, mengedit informasi yang sudah ada, serta menghapus
            data yang tidak diperlukan. Fitur ini membantu memastikan ketersediaan dan penataan tempat tidur
            selalu terpantau dengan baik.
          </p>
          <Button label="Tambah Ruang Baru" @click="ShowFormAddEdit()" icon="pi pi-plus"
            class="p-button p-button-raised" />
        </div>
      </div>

      <!-- Filters Card -->
      <div class="card mb-3">
        <div class="card-header bg-light">
          <h3 class="card-title">
            <i class="pi pi-filter mr-2"></i>Filter Data
          </h3>
        </div>
        <div class="card-body">
          <div class="p-fluid grid">
            <div class="field col-md-4">
              <label for="filterClass">Filter Kelas</label>
              <Select id="filterClass" v-model="filters.kelas" :options="classOptions" optionLabel="label"
                placeholder="Semua Kelas" class="w-full" :showClear="true" />
            </div>

            <div class="field col-md-4 mt-3">
              <label for="searchTerm">Cari Ruangan</label>
              <div class="p-inputgroup">
                <InputText id="searchTerm" v-model="filters.searchTerm" placeholder="Ketik untuk mencari..." />
                <Button icon="pi pi-search" class="p-button-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="card">
        <div class="card-header bg-light">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="card-title">
              <i class="pi pi-list mr-2"></i>Daftar Ruangan
            </h3>
            <div>
              <Button icon="pi pi-refresh" @click="get_data_ruangan()" class="p-button-outlined p-button-sm"
                tooltip="Refresh Data" tooltipPosition="left" />
            </div>
          </div>
        </div>
        <div class="card-body">
          <DataTable :value="filteredRooms" :paginator="true" :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows removableSort
            responsiveLayout="scroll" class="p-datatable-sm" :loading="isLoading"
            dataKey="KD_RUANGAN" :rowHover="true">

            <template #empty>
              <div class="p-4 text-center">
                <i class="pi pi-search" style="font-size: 2rem"></i>
                <p>Tidak ada data ruangan yang ditemukan</p>
              </div>
            </template>

            <Column field="KD_RUANGAN" header="Kode Ruangan" sortable>
              <template #body="slotProps">
                <span class="font-semibold">{{ slotProps.data.KD_RUANGAN }}</span>
              </template>
            </Column>
            <Column field="NAMA" header="Nama Ruangan" sortable></Column>
            <Column field="KELAS" header="Kelas" sortable>
              <template #body="slotProps">
                <span class="badge" :class="getClassBadgeColor(slotProps.data.KELAS)">
                  {{ slotProps.data.KELAS }}
                </span>
              </template>
            </Column>
            <Column field="JUMLAH_TT" header="Total Tempat Tidur" sortable>
              <template #body="slotProps">
                <span class="font-semibold">{{ slotProps.data.JUMLAH_TT }}</span>
              </template>
            </Column>
            <Column field="BED_RUSAK" header="Tempat Tidur Rusak" sortable>
              <template #body="slotProps">
                <Badge v-if="slotProps.data.BED_RUSAK > 0" :value="slotProps.data.BED_RUSAK" severity="danger" />
                <span v-else>0</span>
              </template>
            </Column>
            <Column field="JUMLAH_PS" header="Pasien" sortable>
              <template #body="slotProps">
                {{ slotProps.data.JUMLAH_PS || '0' }}
              </template>
            </Column>
            <Column field="TERSEDIA" header="Tersedia" sortable>
              <template #body="slotProps">
                <Badge :value="calculateAvailableForRoom(slotProps.data)"
                  :severity="calculateAvailableForRoom(slotProps.data) > 0 ? 'success' : 'danger'" />
              </template>
            </Column>
            <Column header="Status Okupansi">
              <template #body="slotProps">
                <div class="progress" style="height: 15px;">
                  <div :class="getOccupancyColorClass(slotProps.data)" role="progressbar"
                    :style="`width: ${calculateOccupancy(slotProps.data)}%`"
                    :aria-valuenow="calculateOccupancy(slotProps.data)" aria-valuemin="0"
                    aria-valuemax="100">
                    <span class="small occupancy-text">{{ calculateOccupancy(slotProps.data) }}%</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column header="Tindakan" style="width: 120px" :exportable="false">
              <template #body="slotProps">
                <div class="d-flex">
                  <Button icon="pi pi-pencil" @click="show_edit_bed(slotProps.data)"
                    class="p-button-rounded p-button-success p-button-sm mr-2"
                    tooltip="Edit" tooltipPosition="top" />
                  <Button icon="pi pi-trash" @click="confirm1(slotProps.data.KD_RUANGAN, slotProps.data.NAMA)"
                    class="p-button-rounded p-button-danger p-button-sm"
                    tooltip="Hapus" tooltipPosition="top" />
                </div>
              </template>
            </Column>
            <Column header="Location (satu Sehat)" style="width: 120px" :exportable="false">
              <template #body="slotProps">
                <div class="d-flex">
                  <Button icon="pi pi-plus" @click="show_edit_bed(slotProps.data)"
                    class="p-button-rounded p-button-success p-button-sm mr-2"
                    tooltip="Edit" tooltipPosition="top" />

                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Add/Edit Room Dialog -->
      <Dialog :header="param.mode === 1 ? 'Tambah Ruangan Baru' : 'Edit Data Ruangan'"
        v-model:visible="addNewRoom" class="container_modal" :modal="true" :closable="false"
        :style="{width: '560px'}">
        <div class="room-form">
          <div class="dialog-field">
            <label for="roomName" class="font-bold">Nama Ruangan <span class="text-danger">*</span></label>
            <InputText id="roomName" v-model="param.nama" placeholder="Masukkan nama ruangan"
              autocomplete="off" style="text-transform: uppercase" class="w-full" />
          </div>

          <div class="dialog-row">
            <div class="dialog-field">
              <label for="roomClass" class="font-bold">Kelas <span class="text-danger">*</span></label>
              <Select id="roomClass" v-model="param.kelasSelected" optionLabel="kelas"
                placeholder="Pilih kelas ruangan" :options="listKelas" :filter="true" class="w-full" />
            </div>
            <div class="dialog-field">
              <label for="totalBeds" class="font-bold">Jumlah Tempat Tidur <span class="text-danger">*</span></label>
              <InputNumber id="totalBeds" v-model="param.jumlah_tt" mode="decimal" :minFractionDigits="0"
                placeholder="0" :min="0" showButtons buttonLayout="horizontal" class="w-full"
                decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            </div>
          </div>

          <div class="dialog-row">
            <div class="dialog-field">
              <label for="brokenBeds" class="font-bold">Tempat Tidur Rusak</label>
              <InputNumber id="brokenBeds" v-model="param.bed_rusak" mode="decimal" :minFractionDigits="0"
                placeholder="0" :min="0" :max="param.jumlah_tt" showButtons buttonLayout="horizontal" class="w-full"
                decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
              <small v-if="param.bed_rusak > param.jumlah_tt" class="p-error">
                Tidak boleh melebihi jumlah total tempat tidur
              </small>
            </div>
            <div class="dialog-field">
              <label class="font-bold">Tempat Tidur Aktif</label>
              <div class="tt-aktif-display">
                {{ (param.jumlah_tt || 0) - (param.bed_rusak || 0) }}
              </div>
            </div>
          </div>

          <div class="dialog-field">
            <label for="roomNotes" class="font-bold">Keterangan Tambahan</label>
            <Textarea id="roomNotes" v-model="param.ket_ruang" rows="3" class="w-full"
              placeholder="Keterangan tambahan (opsional)" />
          </div>
        </div>
        <template #footer>
          <div class="flex justify-content-end">
            <Button label="Batal" icon="pi pi-times" @click="addNewRoom=false" class="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" @click="simpan_new_item()"
              class="p-button-primary" :disabled="!isFormValid" />
          </div>
        </template>
      </Dialog>
    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Badge from 'primevue/badge';
import ConfirmDialog from 'primevue/confirmdialog';
import Textarea from 'primevue/textarea';

export default {
  components: {
    Loading,
    Badge,
    ConfirmDialog,
    Textarea
  },
  props: {
    msg: String,
  },
  data() {
    return {
      fact: [],
      form: {
        startdate: '',
        enddate: '',
      },
      param: {
        id: 0,
        no: '',
        urutan: '',
        nama: '',
        kelas: null,
        idx_ruang: 0,
        jumlah_tt: 0,
        bed_rusak: 0,
        ket_ruang: '',
        location_id: '',
        kelasSelected: {
          kelas: '',
          code: ''
        },
        mode: 1
      },
      isLoading: false,
      fullPage: true,
      selectedRooms: [],
      roomToDelete: null,
      addNewRoom: false,
      listKelas: [
        { 'kelas': 'KL1', 'code': 'I' },
        { 'kelas': 'KL2', 'code': 'II' },
        { 'kelas': 'KL3', 'code': 'III' },
        { 'kelas': 'NON', 'code': 'NON' },
        { 'kelas': 'NON KELAS', 'code': 'NON' },
        { 'kelas': 'ISOLASI', 'code': 'ISO' },
        { 'kelas': 'VIP', 'code': 'NON' },
        { 'kelas': 'ICU', 'code': 'ICU' },
        { 'kelas': 'NICU', 'code': 'NIC' },
      ],
      filters: {
        kelas: null,
        status: null,
        searchTerm: '',
      },
      classOptions: [
        { label: 'KL1', value: 'KL1' },
        { label: 'KL2', value: 'KL2' },
        { label: 'KL3', value: 'KL3' },
        { label: 'VIP', value: 'VIP' },
        { label: 'ISOLASI', value: 'ISOLASI' },
        { label: 'ICU', value: 'ICU' },
        { label: 'NICU', value: 'NICU' },
        { label: 'NON', value: 'NON' },
        { label: 'NON KELAS', value: 'NON KELAS' },
      ],
      statusOptions: [
        { label: 'Penuh', value: 'full' },
        { label: 'Tersedia', value: 'available' },
        { label: 'Ada Rusak', value: 'damaged' },
      ]
    };
  },
  computed: {
    isFormValid() {
      return this.param.nama &&
             this.param.kelasSelected &&
             this.param.kelasSelected.kelas &&
             this.param.jumlah_tt > 0 &&
             this.param.bed_rusak <= this.param.jumlah_tt;
    },
    filteredRooms() {
      let result = [...this.fact];

      // Filter by class/kelas
      if (this.filters.kelas) {
        result = result.filter(room => room.KELAS === this.filters.kelas.value);
      }

      // Filter by status
      if (this.filters.status) {
        if (this.filters.status.value === 'full') {
          result = result.filter(room => this.calculateAvailableForRoom(room) <= 0);
        } else if (this.filters.status.value === 'available') {
          result = result.filter(room => this.calculateAvailableForRoom(room) > 0);
        } else if (this.filters.status.value === 'damaged') {
          result = result.filter(room => parseInt(room.BED_RUSAK) > 0);
        }
      }

      // Filter by search term
      if (this.filters.searchTerm) {
        const term = this.filters.searchTerm.toLowerCase();
        result = result.filter(room =>
          room.NAMA.toLowerCase().includes(term) ||
          room.KD_RUANGAN.toLowerCase().includes(term)
        );
      }

      return result;
    }
  },
  mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  created() {
    this.get_data_ruangan();
  },
  methods: {
    fetchData() {
      var currentDate = new Date();
    },

    clearData() {
      this.param = {
        id: 0,
        nama: '',
        jumlah_tt: 0,
        bed_rusak: 0,
        ket_ruang: '',
        kelasSelected: {
          kelas: '',
          code: ''
        },
        mode: 1
      }
    },

    ShowFormAddEdit() {
      this.clearData();
      this.param.mode = 1;
      this.addNewRoom = true;
    },

    calculateOccupancy(room) {
      const usableBeds = parseInt(room.JUMLAH_TT) || 0;
      const occupiedBeds = parseInt(room.JUMLAH_PS) || 0;

      if (usableBeds <= 0) return 100; // If all beds are broken/none usable, show as 100% occupied

      return Math.round((occupiedBeds / usableBeds) * 100);
    },

    calculateAvailableForRoom(room) {
      // room.JUMLAH_TT sudah net dari bed_rusak, cukup dikurangi yang terisi.
      const usableBeds = parseInt(room.JUMLAH_TT) || 0;
      const occupiedBeds = parseInt(room.JUMLAH_PS) || 0;

      return usableBeds - occupiedBeds;
    },

    getOccupancyColorClass(room) {
      const occupancy = this.calculateOccupancy(room);

      if (occupancy >= 90) {
        return 'progress-bar bg-danger';
      } else if (occupancy >= 75) {
        return 'progress-bar bg-warning';
      } else {
        return 'progress-bar bg-success';
      }
    },

    getClassBadgeColor(kelas) {
      switch(kelas) {
        case 'VIP': return 'bg-purple';
        case 'KL1': return 'bg-info';
        case 'KL2': return 'bg-success';
        case 'KL3': return 'bg-primary';
        case 'ICU': return 'bg-danger';
        case 'NICU': return 'bg-danger';
        case 'ISOLASI': return 'bg-warning';

        default: return 'bg-secondary';
      }
    },

    calculateTotalRooms() {
      return this.fact.length;
    },

    calculateTotalBeds() {
      // Total fisik (kartu ringkasan) = usable (JUMLAH_TT, sudah net bed_rusak) + BED_RUSAK.
      return this.fact.reduce((sum, room) =>
        sum + (parseInt(room.JUMLAH_TT) || 0) + (parseInt(room.BED_RUSAK) || 0), 0);
    },

    calculateTotalBrokenBeds() {
      return this.fact.reduce((sum, room) => sum + (parseInt(room.BED_RUSAK) || 0), 0);
    },

    calculateAvailableBeds() {
      return this.fact.reduce((sum, room) => {
        const available = this.calculateAvailableForRoom(room);
        return sum + (available > 0 ? available : 0);
      }, 0);
    },

    async get_data_ruangan() {
      this.isLoading = true;
      await axios.post('/get_data_ruangan', this.form)
        .then(response => {
          this.fact = response.data.response;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          this.open("error", "Gagal memuat data: " + error);
        })
        .finally(() => this.isLoading = false);
    },

    confirm1(id, namaruangan) {
      this.$confirm.require({
        message: 'Anda ingin menghapus Ruangan ' + namaruangan + ' ?',
        header: 'Konfirmasi Hapus',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.hapus_ruangan(id);
        },
        reject: () => {
          console.log('batal');
        }
      });
    },

    async hapus_ruangan(id_ruang) {
      this.isLoading = true;
      this.param.id = id_ruang;

      await axios.post('/hapus_ruangan', this.param)
        .then(response => {
          if (response.data.code == 200) {
            this.open("success", response.data.message);
            this.get_data_ruangan();
          } else {
            this.open("warning", response.data.message);
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.open("error", "Error: " + error);
          this.isLoading = false;
        })
        .finally(() => this.isLoading = false);
    },
    async show_edit_bed(data) {
      // data.JUMLAH_TT dari backend sudah net dari bed_rusak (jumlah_tt - bed_rusak),
      // sementara field "Jumlah Tempat Tidur" pada form ini adalah jumlah_tt ASLI (kotor).
      // Harus dijumlahkan kembali di sini, kalau tidak tiap kali disimpan jumlah_tt asli
      // akan menyusut sebesar bed_rusak setiap kali diedit.
      const brokenBeds = parseInt(data.BED_RUSAK) || 0;
      const jumlahTtAsli = (parseInt(data.JUMLAH_TT) || 0) + brokenBeds;

      this.param = {
        id: data.KD_RUANGAN,
        nama: data.NAMA,
        jumlah_tt: jumlahTtAsli,
        bed_rusak: brokenBeds,
        ket_ruang: data.KET_RUANG || '',
        kelasSelected: this.listKelas.find(k => k.kelas === data.KELAS) ||
          { kelas: data.KELAS, code: data.IDX_RUANG },
        mode: 2
      };

      this.addNewRoom = true;
    },

    async simpan_new_item() {
      if (!this.isFormValid) {
        this.open("warning", "Harap lengkapi semua field yang wajib diisi");
        return;
      }

      // Sesuai backend (input_bed): mode 1 = insert ruangan baru,
      // selain itu = update ruangan yang sudah ada (dicocokkan via id).
      // Ditentukan eksplisit di sini dari param.id agar tidak bergantung
      // pada nilai mode yang mungkin sudah berubah karena aksi lain.
      this.param.mode = this.param.id ? 2 : 1;

      this.isLoading = true;
    //   console.log("Mengirim data:", JSON.stringify(this.param));
      await axios.post('/input_bed', this.param)
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.open("success", response.data.message);
            this.get_data_ruangan();
            this.addNewRoom = false;
          } else {
            this.open("warning", response.data.message);
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.open("error", "Error: " + error);
          this.isLoading = false;
        })
        .finally(() => this.isLoading = false);
    },

    open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 5000,
        dismissible: true
      });
    },
  },
}
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 0.25rem;
  border: none;
}

/* Room Add/Edit Dialog */
.room-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dialog-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.dialog-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dialog-field label {
  font-size: 0.85rem;
  color: #495057;
}

.tt-aktif-display {
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 14px;
  border-radius: 6px;
  background: #f1f5f9;
  border: 1px solid #dee2e6;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2e7d32;
}

@media (max-width: 576px) {
  .dialog-row {
    grid-template-columns: 1fr;
  }
}

.card-header {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-body {
  padding: 1.25rem;
}

.badge {
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  border-radius: 0.25rem;
  color: white;
  display: inline-block;
  font-weight: 600;
}

.bg-purple {
  background-color: #800080;
}

.occupancy-text {
  color: white;
  font-weight: bold;
  margin-left: 5px;
}

.progress {
  border-radius: 0.25rem;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .row.mb-3 > .col-md-3 {
    margin-bottom: 1rem;
  }
}
</style>
