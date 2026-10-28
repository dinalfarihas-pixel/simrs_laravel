<template>
  <section class="content">
    <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
    <ConfirmDialog></ConfirmDialog>

    <!-- ===== DIALOG: Detail & Hasil Baca ===== -->
    <Dialog header="Permintaan Radiologi" v-model:visible="showdialog"
      :style="{ width: '98vw' }" :breakpoints="{ '768px': '100vw' }"
      :contentStyle="{ maxHeight: '82vh', overflowY: 'auto' }"
      position="center" :modal="true" :draggable="false">

      <!-- Info Pasien -->
      <div class="card card-outline card-primary shadow-sm mb-3">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h3 class="card-title font-weight-bold mb-0">
            <i class="fas fa-user-injured mr-2 text-primary"></i>
            Data Pasien
          </h3>
          <span class="badge badge-info p-2">{{ safe(dataregister.JENISRAWAT) }}</span>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <div class="info-row"><span class="info-lbl">Nama</span><span class="info-val font-weight-bold">{{ safe(data_pasien.NAMA) }}</span></div>
              <div class="info-row"><span class="info-lbl">No. RM</span><span class="info-val">{{ safe(data_pasien.NOMR) }}</span></div>
              <div class="info-row"><span class="info-lbl">Cara Bayar</span><span class="info-val">{{ safe(data_pasien.CARABAYAR) }}</span></div>
              <div class="info-row"><span class="info-lbl">Tgl. Lahir</span><span class="info-val">{{ safe(dataregister.TGLLAHIR) }}</span></div>
              <div class="info-row"><span class="info-lbl">No. Telp</span><span class="info-val">{{ safe(dataregister.NOTELP) }}</span></div>
            </div>
            <div class="col-md-4">
              <div class="info-row"><span class="info-lbl">DPJP</span><span class="info-val font-weight-bold">{{ safe(data_pasien.DPJP) }}</span></div>
              <div class="info-row"><span class="info-lbl">Poli / Ruang</span><span class="info-val">{{ safe(dataregister.POLI) }}</span></div>
              <div class="info-row"><span class="info-lbl">Tgl. Order</span><span class="info-val">{{ safe(data_pasien.TANGGAL) }}</span></div>
              <div class="info-row"><span class="info-lbl">No. Register</span><span class="info-val">{{ dataregister.NOPENDAFTARAN }}</span></div>
            </div>
            <div class="col-md-4">

              <div class="info-row"><span class="info-lbl">DX Awal</span><span class="info-val">{{ safe(dataregister.DIAGNOSA_AWAL) }}<span v-if="dataregister.DX_CAPTION"> — {{ dataregister.DX_CAPTION }}</span></span></div>
              <div class="info-row"><span class="info-lbl">Klinis</span><span class="info-val">{{ detailpermintaan.length > 0 ? safe(detailpermintaan[0].KLINIS) : '—' }}</span></div>
              <div class="info-row"><span class="info-lbl">Catatan</span><span class="info-val">{{ detailpermintaan.length > 0 ? safe(detailpermintaan[0].NOTE) : '—' }}</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Item + Hasil Baca -->
      <div class="card card-outline card-primary shadow-sm mb-3">
        <div class="card-header">
          <h3 class="card-title font-weight-bold mb-0">
            <i class="fas fa-x-ray mr-2 text-primary"></i>
            Item Pemeriksaan &amp; Hasil Baca
          </h3>
        </div>
        <div class="card-body p-0">
          <div class="row no-gutters">

            <!-- Daftar item (sidebar kiri) -->
            <div class="col-md-2 border-right">
              <div class="p-2">
                <div v-for="(data, idx) in detailpermintaan" :key="idx"
                  class="item-card mb-2 p-2 border rounded">
                  <div class="font-weight-bold" style="font-size:.8rem">{{ data.NAMABARANG }}</div>
                  <div class="text-muted" style="font-size:.72rem">{{ data.BARCODE }}</div>
                  <div class="text-muted" style="font-size:.72rem">{{ data.QTY }} {{ data.SATUAN }}</div>
                  <Button icon="pi pi-search" :loading="isLoading" class="p-button p-button-sm p-button-outlined mt-1 w-100"
                    label="Lihat Hasil"
                    @click="getSubdetail(data.ITEMSEQNO, data.RECEIPT_NO, data.BARCODE, data.NOREGISTER)" />
                </div>
                <div v-if="detailpermintaan.length === 0" class="text-muted text-center p-3">
                  <i class="fas fa-inbox" style="font-size:1.5rem;opacity:.3"></i>
                  <div class="mt-1">Tidak ada item</div>
                </div>
              </div>
            </div>

            <!-- Hasil baca -->
            <div class="col-md-10 p-3">
              <div v-if="hasilbacaradiologi.length === 0" class="text-center text-muted py-5">
                <i class="fas fa-arrow-left mr-2"></i>
                Pilih item pemeriksaan untuk melihat hasil baca
              </div>

              <div v-for="(item, idx) in hasilbacaradiologi" :key="idx">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <h6 class="font-weight-bold mb-0">
                    <i class="fas fa-file-medical mr-2 text-primary"></i>
                    {{ safe(item.NAMA) }}
                  </h6>
                  <small class="text-muted">Update: {{ safe(item.TANGGAL_TIMPSTAMP) }}</small>
                </div>

                <div class="row">
                  <!-- Lampiran -->
                  <div class="col-md-3">
                    <div class="lampiran-box">
                      <div class="lampiran-box-header">
                        <i class="fas fa-images mr-1"></i> Lampiran Foto
                      </div>
                      <div class="lampiran-box-body">
                        <div v-if="item.attachment && item.attachment.length > 0">
                          <div v-for="(att, ai) in item.attachment" :key="ai" class="mb-2">
                            <ImagePreview :src="att.link_img" alt="Lampiran" width="200"
                              preview class="mb-1 rounded" @show="onImageShow">
                              <template #indicator>{{ att.caption_file }}</template>
                            </ImagePreview>
                            <Button label="Hapus" icon="pi pi-trash" @click="confirmHapusLampiran(att)"
                              class="p-button p-button-sm p-button-danger p-button-outlined w-100 mt-1" />
                          </div>
                        </div>
                        <div v-else class="text-muted text-center py-3">
                          <i class="fas fa-image" style="font-size:1.5rem;opacity:.3"></i>
                          <div class="mt-1">Belum ada lampiran</div>
                        </div>
                        <Button label="Tambah Foto" icon="pi pi-plus" @click="showdialogParam = true"
                          class="p-button p-button-sm p-button-primary w-100 mt-2" />
                      </div>
                    </div>
                  </div>

                  <!-- Hasil baca -->
                  <div class="col-md-9">
                    <div v-if="!editMode" class="hasil-baca-box">
                      <div v-if="item.HASIL_BACA">
                        <span v-html="convertChart(item.HASIL_BACA)"></span>
                      </div>
                      <div v-else class="text-muted font-italic text-center py-4">
                        <i class="fas fa-file-alt" style="font-size:1.5rem;opacity:.3"></i>
                        <div class="mt-1">Hasil baca belum tersedia</div>
                      </div>
                    </div>

                    <div v-if="editMode">
                      <Editor v-model="form.hasilbaca" editorStyle="height:280px" />
                    </div>

                    <!-- Aksi & Otorisasi -->
                    <div class="d-flex align-items-center justify-content-between mt-3">
                      <div style="gap:8px" class="d-flex">
                        <Button v-if="!editMode" label="Edit Hasil" icon="pi pi-pencil"
                          @click="toggleEditMode" class="p-button-sm p-button-outlined" />
                        <Button v-if="editMode" label="Simpan" icon="pi pi-save"
                          @click="simpanHasilBaca(item.RECEIPT_NO, item.BARCODE)" class="p-button-sm p-button-success" />
                        <Button v-if="editMode" label="Batal" icon="pi pi-times"
                          @click="toggleEditMode" class="p-button-sm p-button-text" />
                      </div>

                      <div class="d-flex align-items-center" style="gap:8px">
                        <span v-if="data_auth.IS_VERIFIED == '1' && data_auth.PETUGAS_OTENTIKASI"
                          class="d-flex align-items-center mr-2">
                          <qrcode-vue :value="data_auth.PETUGAS_OTENTIKASI" :size="40" level="H" class="mr-2" />
                          <small class="text-success font-weight-bold">
                            <i class="fas fa-check-circle mr-1"></i>{{ data_auth.PETUGAS_OTENTIKASI }}
                          </small>
                        </span>
                        <Button v-if="data_auth.IS_VERIFIED == '1'"
                          label="Reset Otorisasi" icon="pi pi-lock"
                          class="p-button-sm p-button-danger p-button-outlined"
                          @click="confirmResetOtorisasi(item)" />
                        <Button v-else-if="data_auth.IS_VERIFIED == '0'"
                          label="Otorisasi" icon="pi pi-lock-open"
                          class="p-button-sm p-button-warning"
                          @click="callOtorisasi(item.ID, 8)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Tutup" icon="pi pi-times" @click="showdialog = false" class="p-button-text" />
        <a v-if="param.no_receipt"
          :href="'/print-radiologi?receipt_no=' + param.no_receipt + '&barcode=' + param.barcode + '&noregister=' + param.NOREGISTER"
          rel="noopener" target="_blank" class="btn btn-outline-secondary btn-sm ml-2">
          <i class="fas fa-print mr-1"></i> Print
        </a>
      </template>
    </Dialog>

    <!-- ===== DIALOG: Otorisasi ===== -->
    <Dialog header="Otorisasi" v-model:visible="showOtorisasi"
      :style="{ width: '40vw' }" :breakpoints="{ '768px': '100vw' }"
      position="center" :modal="true" :draggable="false">
      <otorisasi-form @getvalue="handleOtorisasiValue" :mode="modeOtto" :noregister="param.no_receipt" />
      <template #footer>
        <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi = false" class="p-button-text" />
      </template>
    </Dialog>

    <!-- ===== DIALOG: Upload File ===== -->
    <Dialog header="Upload Lampiran" v-model:visible="showdialogParam"
      :style="{ width: '50vw' }" :breakpoints="{ '768px': '100vw' }"
      :modal="true" :draggable="false">
      <upload-file :moduleupload="modeduleFrom" :barcode="form.barcode"
        :receipt_no="form.no_receipt" :foldername="form.foldername" />
      <template #footer>
        <Button label="Tutup" icon="pi pi-times" @click="showdialogParam = false" class="p-button-text" />
      </template>
    </Dialog>

    <!-- ===== MAIN CONTENT ===== -->
    <div class="container-fluid px-0">

      <!-- Filter Card -->
      <div class="card card-outline card-primary shadow-sm mb-3">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h3 class="card-title font-weight-bold mb-0">
            <i class="fas fa-x-ray mr-2 text-primary"></i>
            Order Radiologi
          </h3>
          <ProgressBar mode="indeterminate" v-show="isLoading" style="height:.25em;width:130px;border-radius:4px" />
        </div>
        <div class="card-body pb-2">
          <div class="row align-items-end">
            <div class="col-md-2">
              <label class="filter-label">Tanggal Awal</label>
              <Calendar v-model="form.startdate" :showIcon="true" dateFormat="dd/mm/yy"
                style="width:100%" />
            </div>
            <div class="col-md-2">
              <label class="filter-label">Tanggal Akhir</label>
              <Calendar v-model="form.enddate" :showIcon="true" dateFormat="dd/mm/yy"
                style="width:100%" />
            </div>
            <div class="col-md-2">
              <label class="filter-label">Cari No. RM / Nama</label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="No. RM atau nama pasien..."
                  v-model="searchKeyword" autocomplete="off" />
                <div class="input-group-append" v-show="searchKeyword">
                  <button class="btn btn-outline-secondary" type="button" @click="searchKeyword=''">
                    <i class="pi pi-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <label class="filter-label">Jenis Rawat</label>
              <Select v-model="jenisrawatSelected" @change="filterData(0)"
                :options="['INAP','JALAN','SEMUA']" placeholder="Semua" style="width:100%" />
            </div>
            <div class="col-md-4 d-flex align-items-end flex-wrap" style="gap:6px">
              <Button label="Cari" icon="pi pi-search" class="p-button-primary p-button-sm"
                @click="getListOrderRadiologi(5,'M')" />
              <Button label="Menunggu" icon="pi pi-clock" class="p-button-sm "
                @click="filterData(1)" />
              <Button label="Proses" icon="pi pi-spinner" class="p-button-sm p-button-warning "
                @click="filterData(3)" />
              <Button label="Selesai" icon="pi pi-check" class="p-button-sm p-button-success "
                @click="filterData(2)" />
              <Button label="Semua" icon="pi pi-list" class="p-button-sm "
                @click="filterData(0)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tabel Order -->
      <div class="card card-outline card-primary shadow-sm">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h3 class="card-title font-weight-bold mb-0">
            <i class="pi pi-list mr-2 text-primary"></i>
            Daftar Order
          </h3>
          <small class="text-muted">
            Menampilkan <strong>{{ filteredOrders.length }}</strong> dari <strong>{{ dataorderradiologi.length }}</strong> order
            <span v-if="searchKeyword" class="badge badge-info ml-1">Cari: "{{ searchKeyword }}"</span>
          </small>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered table-hover mb-0 rad-table">
              <thead>
                <tr>
                  <th class="text-center" style="width:40px">#</th>
                  <th style="width:100px">Status</th>
                  <th>No. Trans</th>
                  <th>Tanggal</th>
                  <th>No. RM</th>
                  <th>Pasien</th>
                  <th>DPJP</th>
                  <th>Jenis Rawat</th>
                  <th>Ruangan</th>
                  <th class="text-center" style="width:70px">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in filteredOrders" :key="list.TRANS || index">
                  <td class="text-center align-middle">
                    <span class="row-num">{{ index + 1 }}</span>
                  </td>
                  <td class="align-middle">
                    <span v-if="list.STATUS_PROGRESS === 'M'" class="status-pill status-menunggu">
                      <i class="fas fa-clock mr-1"></i>Menunggu
                    </span>
                    <span v-else-if="list.STATUS_PROGRESS === 'C'" class="status-pill status-selesai">
                      <i class="fas fa-check-circle mr-1"></i>Selesai
                    </span>
                    <span v-else-if="list.STATUS_PROGRESS === 'P'" class="status-pill status-proses">
                      <i class="fas fa-spinner mr-1"></i>Proses
                    </span>
                    <span v-else class="status-pill status-menunggu">{{ list.STATUS_PROGRESS || '?' }}</span>
                  </td>
                  <td class="align-middle font-weight-bold">{{ list.TRANS }}</td>
                  <td class="align-middle">{{ list.TANGGAL }}</td>
                  <td class="align-middle">{{ list.NOMR }}</td>
                  <td class="align-middle">
                    <div class="font-weight-bold">{{ list.NAMA }}</div>
                    <small class="text-muted">{{ list.JENISKELAMIN }} {{ list.USIA }}</small>
                  </td>
                  <td class="align-middle">{{ list.DPJP }}</td>
                  <td class="align-middle">
                    <span class="badge" :class="list.JENISRAWAT === 'INAP' ? 'badge-primary' : 'badge-info'">
                      {{ list.JENISRAWAT }}
                    </span>
                  </td>
                  <td class="align-middle">{{ list.POLI_RUANG }}</td>
                  <td class="text-center align-middle">
                    <button class="btn-aksi" @click="getDetailSales(list.TRANS, list.NOREGISTER, list)"
                      title="Proses order">
                      <i class="fas fa-folder-open"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="dataorderradiologi.length === 0 && !isLoading">
                  <td v-if="filteredOrders.length === 0" colspan="10" class="text-center text-muted py-5">
                    <i class="fas fa-inbox" style="font-size:2rem;opacity:.3"></i>
                    <div class="mt-2">Tidak ada data order radiologi</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-muted">
          <small>Menampilkan <strong>{{ dataorderradiologi.length }}</strong> order radiologi</small>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import SelectButton from 'primevue/selectbutton';
import ImagePreview from 'primevue/image';
import Textarea from 'primevue/textarea';
import Editor from 'primevue/editor';
import Tag from 'primevue/tag';
import ConfirmDialog from 'primevue/confirmdialog';
import QrcodeVue from 'qrcode.vue';
import ProgressBar from 'primevue/progressbar';

export default {
  components: {
    Loading,
    SelectButton,
    ImagePreview,
    Textarea,
    Tag,
    Editor,
    QrcodeVue,
    ConfirmDialog,
    ProgressBar
  },

  data() {
    return {
      form: {
        startdate: new Date(),
        enddate: new Date(),
        jenispermintaan: '',
        kategori: '',
        noregister: '',
        mode: '',
        tanggal: '',
        status: '',
        hasilbaca: '',
        barcode: '',
        no_receipt: '',
        nomr: '',
        foldername: 'RADIOLOGI',
      },
      param: {
        RECEIPT_NO: '',
        NOREGISTER: '',
        MODE: 'RCPT',
        no_receipt: '',
        barcode: '',
        mode: '',
      },
      // FIX: sebelumnya hanya { KLINIS: '' } — IS_VERIFIED & PETUGAS_OTENTIKASI tidak ada
      data_auth: {
        IS_VERIFIED: '0',
        PETUGAS_OTENTIKASI: '',
        ID: null,
      },
      // FIX: sebelumnya diinisialisasi '' (string) — error saat akses .NAMA, .POLI, dll
      dataregister: {},
      data_pasien: {},

      dataorderradiologi: [],
      detailpermintaan: [],
      hasilbacaradiologi: [],
      tempData: [],

      jenisrawatSelected: null,
      searchKeyword: '',
      modeduleFrom: 'RADIOLOGI',
      modeOtto: 0,
      idInputan: '',
      profile_rs: null,

      isLoading: false,
      fullPage: true,
      editMode: false,
      showdialog: false,
      showdialogParam: false,
      showOtorisasi: false,
    };
  },

  computed: {
    filteredOrders() {
      if (!this.searchKeyword || !this.searchKeyword.trim()) return this.dataorderradiologi;
      const kw = this.searchKeyword.trim().toLowerCase();
      return this.dataorderradiologi.filter(x =>
        String(x.NOMR   || '').toLowerCase().includes(kw) ||
        String(x.NAMA   || '').toLowerCase().includes(kw) ||
        String(x.TRANS  || '').toLowerCase().includes(kw) ||
        String(x.DPJP   || '').toLowerCase().includes(kw)
      );
    },
  },

  mounted() {
    this.getProfileRs();
    this.getListOrderRadiologi(1);
  },

  methods: {
    // ── Helpers ──────────────────────────────────────────────────────────────
    safe(value, fallback = '—') {
      const v = value !== null && value !== undefined ? String(value).trim() : '';
      return v !== '' ? v : fallback;
    },

    convertChart(text) {
      if (!text) return '';
      return String(text).replace(/\n/g, '<br>');
    },

    showToast(type, message) {
      this.$toast.open({
        message,
        position: 'top-right',
        type,
        duration: 2500,
        dismissible: true,
      });
    },

    // ── Image preview: tambah tombol close ───────────────────────────────────
    onImageShow() {
      this.$nextTick(() => {
        const mask = document.querySelector('.p-image-mask');
        if (mask && !document.querySelector('.custom-close-btn')) {
          const btn = document.createElement('button');
          btn.className = 'custom-close-btn';
          btn.innerHTML = '<i class="pi pi-times"></i>';
          btn.addEventListener('click', () => {
            document.querySelector('.p-image-mask')?.click();
          });
          mask.appendChild(btn);
        }
      });
    },

    // ── Otorisasi ─────────────────────────────────────────────────────────────
    callOtorisasi(id, mode) {
      this.idInputan = id;
      this.modeOtto = mode;
      this.showOtorisasi = true;
    },

    handleOtorisasiValue(value) {
      if (value === 200) {
        this.data_auth.IS_VERIFIED = '1';
        this.showOtorisasi = false;
      }
    },

    confirmResetOtorisasi(data) {
      this.$confirm.require({
        message: 'Otorisasi akan direset dan harus dilakukan ulang. Lanjutkan?',
        header: 'Konfirmasi Reset Otorisasi',
        icon: 'pi pi-exclamation-triangle',
        acceptProps: { severity: 'danger' },
        acceptLabel: 'Ya, Reset',
        rejectLabel: 'Batal',
        accept: () => this.resetOtorisasi(data),
        reject: () => {},
      });
    },

    async resetOtorisasi(data)
    {
      this.isLoading = true;
      try {
        const res = await axios.post('/reset_otorisasi_radiologi', {
          RECEIPT_NO: data.RECEIPT_NO
        });
        if (res.data?.metadata?.code === 200) {
          this.data_auth.IS_VERIFIED = '0';
          this.data_auth.PETUGAS_OTENTIKASI = '';
          this.showToast('success', 'Otorisasi berhasil direset');
        } else {
          this.showToast('danger', res.data?.metadata?.message || 'Gagal mereset otorisasi');
        }
      } catch (err) {
        console.error(err);
        this.showToast('danger', 'Terjadi kesalahan saat reset otorisasi');
      } finally {
        this.isLoading = false;
      }
    },

    // ── Hapus lampiran foto ───────────────────────────────────────────────────
    confirmHapusLampiran(att) {
      this.$confirm.require({
        message: 'Anda ingin menghapus file lampiran ini?',
        header: 'Konfirmasi hapus',
        icon: 'pi pi-info-circle',
        acceptProps: { severity: 'danger' },
        accept: () => this.hapusLampiranFoto(att.id),
        reject: () => {},
      });
    },

    async hapusLampiranFoto(id) {
      this.isLoading = true;
      this.param.id = id;
      try {
        const res = await axios.post('/hapus_lampiran_foto_rad', this.param);
        if (res.data?.metadata?.code === 200) {
          this.showToast('success', 'Lampiran berhasil dihapus');
          await this.getSubdetail('', this.param.no_receipt, this.param.barcode, this.param.NOREGISTER);
        } else {
          this.showToast('danger', 'Gagal menghapus lampiran');
        }
      } catch (err) {
        console.error(err);
        this.showToast('danger', 'Terjadi kesalahan');
      } finally {
        this.isLoading = false;
      }
    },

    // ── Profile RS ────────────────────────────────────────────────────────────
    async getProfileRs() {
      try {
        const res = await axios.get('/data_rumahsakit');
        this.profile_rs = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    // ── Subdetail (hasil baca per item) ───────────────────────────────────────
    async getSubdetail(itemseqno, receiptNo, barcode, noregister) {
      this.isLoading = true;
      this.param.no_receipt = receiptNo;
      this.param.barcode = barcode;
      this.param.NOREGISTER = noregister;
      this.param.mode = '2';
      try {
        const res = await axios.post('/get_detail_radiologi', this.param);
        this.hasilbacaradiologi = res.data.response || [];
        this.data_auth = res.data.pasien || { IS_VERIFIED: '0', PETUGAS_OTENTIKASI: '', ID: null };
        this.idInputan = this.data_auth.ID;
        if (this.hasilbacaradiologi.length > 0) {
          this.form.hasilbaca  = this.hasilbacaradiologi[0].HASIL_BACA  || '';
          this.form.barcode    = this.hasilbacaradiologi[0].BARCODE     || '';
          this.form.no_receipt = this.hasilbacaradiologi[0].RECEIPT_NO  || '';
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // ── Toggle edit mode ──────────────────────────────────────────────────────
    toggleEditMode() {
      this.editMode = !this.editMode;
    },

    // ── Simpan hasil baca ─────────────────────────────────────────────────────
    async simpanHasilBaca(receiptNo, barcode) {
      this.isLoading = true;
      this.form.no_receipt = receiptNo;
      this.form.barcode = barcode;
      try {
        await axios.post('/simpanhasil_bacaradiologi', this.form);
        if (this.hasilbacaradiologi.length > 0) {
          this.hasilbacaradiologi[0].HASIL_BACA = this.form.hasilbaca;
        }
        this.showToast('success', 'Hasil baca berhasil disimpan');
        this.editMode = false;
      } catch (err) {
        console.error(err);
        this.showToast('danger', 'Gagal menyimpan hasil baca');
      } finally {
        this.isLoading = false;
      }
    },

    // ── Buka dialog detail + hasil baca ──────────────────────────────────────
    async getDetailSales(receiptNo, noregister, row) {
      this.isLoading = true;
      this.param.RECEIPT_NO = receiptNo;
      this.param.NOREGISTER = noregister;
      this.detailpermintaan    = [];
      this.hasilbacaradiologi  = [];
      this.editMode            = false; // FIX: reset edit mode saat buka dialog baru
      this.getDataPasien(noregister);
      try {
        const res = await axios.post('/getdetils_sales_radiologi', this.param);
        this.detailpermintaan = (res.data.response || []).filter(x => x.KATEGORI === 'RADIOLOGI');
        this.data_pasien = row || {};
        this.showdialog = true;
        if (this.detailpermintaan.length > 0) {
          const first = this.detailpermintaan[0];
          this.getSubdetail(first.ITEMSEQNO, first.RECEIPT_NO, first.BARCODE, first.NOREGISTER);
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // ── Data pasien per transaksi ─────────────────────────────────────────────
    async getDataPasien(noregister) {
      if (!noregister) return;
      this.form.mode      = 'history8';
      this.form.noregister = noregister;
      try {
        const res = await axios.post('/datapasienpertransaksi', this.form);
        const rows = res.data?.response || [];
        this.dataregister = rows.length > 0 ? rows[0] : {};
      } catch (err) {
        console.error(err);
      }
    },

    // ── List order radiologi ──────────────────────────────────────────────────
    async getListOrderRadiologi(mode, status = '') {
      this.isLoading = true;
      this.form.jenispermintaan = '3';
      this.form.kategori        = 'RADIOLOGI';
      this.form.mode            = mode;
      this.form.status          = status;
      try {
        const res = await axios.post('/listorderPenunjang', this.form);
        /// console.log('listorderPenunjang response:', res.data);
        this.dataorderradiologi = res.data?.response || [];
        this.tempData = [...this.dataorderradiologi];
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // ── Filter lokal (status + jenis rawat) ──────────────────────────────────
    filterData(status) {
      let result = [...this.tempData];

      // FIX: sebelumnya pakai .includes() — bisa false-positive; diganti === eksak
      const statusMap = { 1: 'M', 2: 'C', 3: 'P' };
      if (statusMap[status]) {
        result = result.filter(x => x.STATUS_PROGRESS === statusMap[status]);
      }

      if (this.jenisrawatSelected && this.jenisrawatSelected !== 'SEMUA') {
        result = result.filter(x =>
          (x.JENISRAWAT || '').includes(this.jenisrawatSelected)
        );
      }

      this.dataorderradiologi = result;
    },
  },
};
</script>

<style scoped>
/* Font mengikuti tema — tidak ada font-size hardcode */
.filter-label { display:block; font-weight:700; color:#333; margin-bottom:4px; text-transform:uppercase; letter-spacing:.04em; }

.rad-table thead th { background:#e9ecef; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#343a40; vertical-align:middle; white-space:nowrap; border-color:#ced4da !important; }
.rad-table td { border-color:#dee2e6 !important; vertical-align:middle; color:#212529; }
.rad-table tbody tr:hover { background:#d0e8ff !important; }

.row-num { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#1565c0; color:#fff; font-weight:700; }

.status-pill { display:inline-flex; align-items:center; padding:4px 12px; border-radius:20px; font-weight:700; white-space:nowrap; }
.status-menunggu { background:#dee2e6; color:#495057; border:1.5px solid #adb5bd; }
.status-proses   { background:#ffe8cc; color:#c0460a; border:1.5px solid #fd7e14; }
.status-selesai  { background:#b7f5c8; color:#0f5c27; border:1.5px solid #28a745; }

.btn-aksi { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; background:#1565c0; color:#fff; border:none; cursor:pointer; transition:all .15s; box-shadow:0 2px 4px rgba(21,101,192,.3); }
.btn-aksi:hover { background:#0d47a1; }

.info-row { display:flex; gap:0; margin-bottom:8px; }
.info-lbl { width:120px; flex-shrink:0; font-weight:700; color:#495057; }
.info-val { flex:1; color:#212529; font-weight:500; }

.item-card { background:#f1f3f5; border-color:#ced4da !important; transition:background .15s; }
.item-card:hover { background:#cce5ff; border-color:#74b3ff !important; }

.hasil-baca-box { background:#fff; border:2px solid #dee2e6; border-radius:8px; padding:16px; min-height:120px; line-height:1.8; color:#212529; }

.lampiran-box { border:1.5px solid #ced4da; border-radius:8px; overflow:hidden; }
.lampiran-box-header { background:#e9ecef; padding:8px 12px; font-weight:700; color:#343a40; border-bottom:1.5px solid #ced4da; }
.lampiran-box-body { padding:12px; }
</style>
