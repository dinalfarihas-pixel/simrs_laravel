<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Dialog: Konfirmasi kirim -->
            <Dialog header="Kirim Permintaan" v-model:visible="displayModal" :containerStyle="{width: '30vw'}" :modal="true">
                <p class="mb-2">Silahkan pastikan permintaan barang sudah sesuai.</p>
                <div class="p-field">
                    <label for="catatan" class="d-block mb-1">Catatan</label>
                    <InputText id="catatan" style="width:100%" v-model="header.CATATAN" type="text" />
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="closeBasic()" class="p-button-text" />
                    <Button label="Kirim Permintaan" icon="pi pi-send" @click="simpan_permintaan()" autofocus />
                </template>
            </Dialog>

            <!-- Dialog: Sukses -->
            <Dialog header="Informasi" v-model:visible="displayConfirmation" :containerStyle="{width: '350px'}" :modal="true">
                <div class="d-flex align-items-center" style="gap:12px">
                    <i class="pi pi-check-circle" style="font-size:2rem;color:#28a745"></i>
                    <span>Sukses, data permintaan sudah terkirim.</span>
                </div>
                <template #footer>
                    <Button label="Tutup" icon="pi pi-check" @click="closeConfirmation()" autofocus />
                </template>
            </Dialog>

            <!-- Drawer: Input Qty -->
            <Drawer v-model:visible="displayQtyModal" style="height:auto" :baseZIndex="2000" position="bottom">
                <template #header>
                    <span class="font-weight-bold">Input Qty — <em>{{ item_barang }}</em></span>
                </template>
                <div class="d-flex justify-content-center align-items-center" style="gap:10px;padding:12px 0">
                    <InputNumber autofocus v-model="temp_qty" :useGrouping="false" :min="1" style="width:120px" />
                    <Button label="Tambah" icon="pi pi-plus" @click="add_item()" />
                    <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="closeqtyModal()" />
                </div>
            </Drawer>

            <!-- Dialog: Konfirmasi ganti tujuan -->
            <Dialog header="Ganti Tujuan Permintaan?" v-model:visible="showKonfirmasiGantiTujuan"
                :containerStyle="{width:'360px'}" :modal="true" :closable="false">
                <div class="d-flex align-items-start" style="gap:12px">
                    <i class="pi pi-exclamation-triangle" style="font-size:1.8rem;color:#f57c00;margin-top:2px"></i>
                    <p class="mb-0">
                        Terdapat <strong>{{ itemSelected.length }} item</strong> yang sudah dipilih.<br>
                        Mengganti tujuan akan <strong>menghapus semua item</strong> tersebut.<br>
                        Lanjutkan?
                    </p>
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="batalGantiTujuan()" />
                    <Button label="Ya, Ganti" icon="pi pi-check" class="p-button-warning" @click="konfirmasiGantiTujuan()" />
                </template>
            </Dialog>

            <!-- Toolbar atas -->
            <div class="card shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title mb-0">
                        <i class="fas fa-cart-plus mr-2 text-primary"></i>
                        Daftar permintaan barang oleh ruangan
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <Select v-model="form.lokasi" style="width:17em" :options="lokasi_arr"
                            optionLabel="CAPION" @change="onLokasiChange($event)" :filter="true"
                            placeholder="Tujuan Permintaan" :showClear="false" />
                        <Button label="Simpan" @click="openModal()" icon="pi pi-save" class="p-button-success" />
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Panel kiri: barang tersedia -->
                <div class="col-md-7">
                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h3 class="card-title mb-0">
                                <i class="fas fa-boxes mr-2 text-primary"></i>
                                Daftar barang yang tersedia
                            </h3>
                        </div>
                        <div class="card-body p-0" style="height:650px;overflow-y:auto">
                            <table class="table table-sm table-bordered table-striped mb-0">
                                <thead class="thead-light">
                                    <tr>
                                        <th style="width:12%">BARCODE</th>
                                        <th style="width:15%">GROUPING</th>
                                        <th>NAMA</th>
                                        <th style="width:10%">PERSEDIAAN</th>
                                        <th style="width:9%">SATUAN</th>
                                        <th style="width:7%">+</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <input type="text" v-model="filters.grouping.value"
                                                class="form-control form-control-sm" placeholder="Filter..." />
                                        </th>
                                        <th>
                                            <input type="text" v-model="filters.nama_barang.value"
                                                class="form-control form-control-sm" placeholder="Filter..." />
                                        </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in filteredFact" :key="row.IDBARANG">
                                        <td class="text-monospace small">{{ row.IDBARANG }}</td>
                                        <td class="medium">{{ row.GROUPING }}</td>
                                        <td class="medium">
                                            {{ row.NAMA }}
                                            <Tag v-if="row.ARSIPKAN == 1" value="Tidak Aktif"
                                                severity="warning" class="ml-1" />
                                        </td>
                                        <td class="text-right medium">{{ row.QUNATITY }}</td>
                                        <td class="medium">{{ row.SATUAN }}</td>
                                        <td class="text-center">
                                            <Button :disabled="row.ARSIPKAN == 1" @click="openmodal_qty(row)"
                                                icon="pi pi-plus" class="p-button-rounded p-button-success p-button-sm" />
                                        </td>
                                    </tr>
                                    <tr v-if="filteredFact.length === 0">
                                        <td colspan="6" class="text-center text-muted py-3">
                                            <i class="pi pi-inbox mr-2"></i>Pilih tujuan untuk menampilkan barang
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Panel kanan: barang dipilih -->
                <div class="col-md-5">
                    <div class="card shadow-sm">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <h3 class="card-title mb-0">
                                <i class="fas fa-clipboard-list mr-2 text-success"></i>
                                Barang yang telah dipilih
                            </h3>
                            <span class="badge badge-success">{{ itemSelected.length }} item</span>
                        </div>
                        <div class="card-body p-0" style="height:650px;overflow-y:auto">
                            <div v-if="itemSelected.length === 0" class="text-center text-muted py-4">
                                <i class="pi pi-shopping-cart" style="font-size:2rem;opacity:.3"></i>
                                <p class="mt-2 small">Belum ada barang dipilih</p>
                            </div>
                            <div v-for="(input, k) in itemSelected" :key="input.BARCODE + k" class="perm-item">
                                <div class="perm-item-header">
                                    <div class="perm-item-no">{{ k + 1 }}</div>
                                    <div class="perm-item-info">
                                        <div class="perm-item-barcode">
                                            <i class="pi pi-check-circle text-success mr-1"></i>{{ input.BARCODE }}
                                        </div>
                                        <div class="perm-item-nama">{{ input.GROUPING }} — {{ input.NAMA }}</div>
                                    </div>
                                    <Button icon="pi pi-times" @click="remove(k)"
                                        class="p-button-rounded p-button-danger p-button-text p-button-sm" />
                                </div>
                                <div class="perm-item-stats">
                                    <div class="perm-stat perm-stat-qty">
                                        <span class="perm-stat-label">Qty Permintaan</span>
                                        <InputNumber :disabled="true" v-model="input.QTY"
                                            :minFractionDigits="0" :maxFractionDigits="0"
                                            style="width:100%" :inputStyle="{ textAlign:'center', fontWeight:'700' }" />
                                    </div>
                                    <div class="perm-stat perm-stat-sisa">
                                        <span class="perm-stat-label">Sisa Persediaan</span>
                                        <InputNumber :disabled="true" v-model="input.SISA_PERSEDIAAN"
                                            :minFractionDigits="0" :maxFractionDigits="0"
                                            style="width:100%" :inputStyle="{ textAlign:'center', fontWeight:'700', color:'#dc3545' }" />
                                    </div>
                                    <div class="perm-stat perm-stat-kebutuhan">
                                        <span class="perm-stat-label">Kebutuhan/Minggu</span>
                                        <InputNumber :disabled="true" v-model="input.KEBUTUHAN_PERMINGGU"
                                            :minFractionDigits="0" :maxFractionDigits="0"
                                            style="width:100%" :inputStyle="{ textAlign:'center', fontWeight:'700' }" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Drawer from 'primevue/drawer';
    import Tag from 'primevue/tag';
    export default {
        components: {
            Loading,
            Drawer,
            Tag,
        },
        props: {
            msg: String,
        },
        data() {
            return {
                message: '',
                temp_qty: 0,
                sisa_persediaan: 0,
                kebutuhan_perminggu: 0,
                row_temp: '',
                detail_perimtaan: [],
                header: {
                    CATATAN: '',
                    TUJUAN: '',
                    TANGGAL: '',
                    ASAL: '',
                    ItemPermintaan: [],
                },
                fact: [],
                displayModal: false,
                displayConfirmation: false,
                displayQtyModal: false,
                lokasi_arr: [],
                my_location: 0,
                item_barang: '',
                qty: 0,
                itemSelected: [],
                filters: {
                    nama_barang: { value: '', keys: ['NAMA'] },
                    grouping:    { value: '', keys: ['GROUPING'] },
                },
                form: {
                    startdate: '',
                    enddate: '',
                    supplier: '',
                    kategori_barang: '',
                    lokasi: '',
                    id_lokasi: '',
                    filter_qty: '',
                    limitation: 0,
                },
                isLoading: false,
                fullPage: true,
                showKonfirmasiGantiTujuan: false,
                lokasi_pending: null,
                lokasi_sebelumnya: null,
            };
        },
        computed: {
            filteredFact() {
                return this.fact.filter(row => {
                    const matchNama = !this.filters.nama_barang.value ||
                        row.NAMA?.toLowerCase().includes(this.filters.nama_barang.value.toLowerCase());
                    const matchGroup = !this.filters.grouping.value ||
                        row.GROUPING?.toLowerCase().includes(this.filters.grouping.value.toLowerCase());
                    return matchNama && matchGroup;
                });
            },
        },
        mounted() {
            this.form.startdate = new Date();
        },
        created() {
            this.get_lokasi();
            this.get_lokasi_mylocation();
        },
        methods: {
            open(type, message) {
                EventBus.$emit('show-alert', { type, message });
            },
            onLokasiChange(event) {
                if (this.itemSelected.length > 0) {
                    // Simpan pilihan baru, kembalikan ke sebelumnya sementara
                    this.lokasi_pending    = event.value;
                    this.form.lokasi       = this.lokasi_sebelumnya;
                    this.showKonfirmasiGantiTujuan = true;
                } else {
                    this.lokasi_sebelumnya = event.value;
                    this.getdata();
                }
            },
            konfirmasiGantiTujuan() {
                this.itemSelected      = [];
                this.form.lokasi       = this.lokasi_pending;
                this.lokasi_sebelumnya = this.lokasi_pending;
                this.lokasi_pending    = null;
                this.showKonfirmasiGantiTujuan = false;
                this.getdata();
            },
            batalGantiTujuan() {
                this.lokasi_pending    = null;
                this.showKonfirmasiGantiTujuan = false;
            },
            async get_lokasi_mylocation() {
                await axios.get('/get_lokasi_tovue', '')
                    .then(response => { this.my_location = response.data.data; })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            closeConfirmation() {
                this.displayConfirmation = false;
                window.location.assign('/permintaanlist');
            },
            async get_lokasi() {
                this.isLoading = true;
                await axios.get('/getlokasi-api', '')
                    .then(response => {
                        this.lokasi_arr = response.data.response.filter(x => x.IS_HQ == 1);
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            async get_kebutuhan_perminggu(BARCODE) {
                try {
                    this.form.BARCODE  = BARCODE;
                    this.form.id_lokasi = this.my_location;
                    this.isLoading = true;
                    const response = await axios.post('/get_kebutuhan_perminggu', this.form);
                    return response.data.response || 0;
                } catch {
                    return 0;
                } finally {
                    this.isLoading = false;
                }
            },
            async add(row) {
                row.KEBUTUHAN_PERMINGGU = await this.get_kebutuhan_perminggu(row.BARCODE);
                this.itemSelected.push({
                    BARCODE:            row.IDBARANG,
                    GROUPING:           row.GROUPING,
                    NAMA:               row.NAMA,
                    HARGA:              row.HARGABELI,
                    QTY_APROVED:        0,
                    QTY:                this.temp_qty,
                    SISA_PERSEDIAAN:    row.SISA_PERSEDIAAN,
                    KEBUTUHAN_PERMINGGU: row.KEBUTUHAN_PERMINGGU,
                    SATUAN:             row.SATUAN,
                });
                this.filters.nama_barang.value = '';
                this.filters.grouping.value    = '';
                this.open('info', row.NAMA + ' telah ditambahkan');
            },
            remove(index) {
                this.itemSelected.splice(index, 1);
            },
            openmodal_qty(row) {
                this.row_temp   = row;
                this.item_barang = row.NAMA;
                this.temp_qty   = 0;
                this.displayQtyModal = true;
            },
            add_item() {
                if (!this.temp_qty || this.temp_qty <= 0) {
                    this.open('warning', 'Silahkan tambahkan jumlah item yang akan diminta');
                } else {
                    this.add(this.row_temp);
                    this.closeqtyModal();
                }
            },
            closeqtyModal() {
                this.displayQtyModal = false;
            },
            openModal() {
                this.displayModal = true;
            },
            closeBasic() {
                this.displayModal = false;
            },
            async simpan_permintaan() {
                if (this.itemSelected.length <= 0) {
                    this.open('warning', 'Belum ada barang yang dipilih');
                    return;
                }
                const currentDate = new Date();
                this.header.TUJUAN        = this.form.lokasi.ID;
                this.header.TANGGAL       = currentDate;
                this.header.ItemPermintaan = this.itemSelected;
                this.closeBasic();
                this.isLoading = true;
                await axios.post('/save_permintaan_obatv3', this.header)
                    .then(response => {
                           console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.displayConfirmation = true;
                        } else {
                            this.open('warning', response.data.metadata.message);
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/get_masterbarang', this.form)
                    .then(response => { this.fact = response.data.response; })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
        },
    }
</script>

<style scoped>
/* ===== PANEL KANAN: ITEM DIPILIH ===== */
.perm-item {
    border-bottom: 1px solid #e9ecef;
    padding: 8px 12px;
}
.perm-item:last-child { border-bottom: none; }

.perm-item-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 8px;
}
.perm-item-no {
    min-width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #1976d2;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
}
.perm-item-info { flex: 1; min-width: 0; }
.perm-item-barcode {
    font-weight: 600;
    color: #333;
}
.perm-item-nama {
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Tiga kotak stat dalam satu baris */
.perm-item-stats {
    display: flex;
    gap: 6px;
}
.perm-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    padding: 4px 6px;
}
.perm-stat-label {
    text-transform: uppercase;
    letter-spacing: .03em;
    margin-bottom: 3px;
    white-space: nowrap;
    font-weight: 600;
}
.perm-stat-qty      { background: #e8f5e9; }
.perm-stat-qty .perm-stat-label { color: #2e7d32; }
.perm-stat-sisa     { background: #ffebee; }
.perm-stat-sisa .perm-stat-label { color: #c62828; }
.perm-stat-kebutuhan{ background: #fff8e1; }
.perm-stat-kebutuhan .perm-stat-label { color: #e65100; }

/* InputNumber di dalam stat box */
.perm-stat :deep(.p-inputnumber) { width: 100%; }
.perm-stat :deep(.p-inputnumber .p-inputtext) {
    text-align: center;
    font-weight: 700;
    border: none;
    background: transparent;
    padding: 2px 4px;
    height: 28px;
    width: 100%;
    box-shadow: none;
}
</style>
