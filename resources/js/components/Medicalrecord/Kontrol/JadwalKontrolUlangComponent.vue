<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Filter Card -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header">
                    <h3 class="card-title"><i class="pi pi-calendar mr-1"></i> Filter Data Jadwal Kontrol Ulang</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="text-sm">Tanggal Awal</label><br>
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                style="width: 100%;" />
                        </div>
                        <div class="col-md-3">
                            <label class="text-sm">Tanggal Akhir</label><br>
                            <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                style="width: 100%;" />
                        </div>
                        <div class="col-md-3">
                            <label class="text-sm">Jenis Rawat</label><br>
                            <Select v-model="form.selectedJenisRawat" style="width: 100%;"
                                :options="jenisRawat" optionLabel="nama" placeholder="Semua" :showClear="true" />
                        </div>
                        <div class="col-md-3 d-flex align-items-end">
                            <Button label="Cari" icon="pi pi-search" class="p-button p-button-primary mr-2"
                                @click="getData()" />
                            <Button label="Reset" icon="pi pi-refresh" class="p-button p-button-secondary"
                                @click="resetFilter()" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Table Card -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header">
                    <h3 class="card-title"><i class="pi pi-list mr-1"></i> Daftar Jadwal Kontrol Ulang</h3>
                    <div class="card-tools">
                        <Button label="Tambah Jadwal" icon="pi pi-plus" class="p-button p-button-success p-button-sm"
                            @click="openDialogTambah()" />
                    </div>
                </div>
                <div class="card-body">
                    <DataTable :value="fact" columnResizeMode="fit" v-model:filters="filters1"
                        selectionMode="single" stripedRows class="p-datatable-sm" showGridlines
                        :resizableColumns="true" :paginator="true" :rows="15"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 15, 25, 50]"
                        currentPageReportTemplate="Menampilkan {first} - {last} dari {totalRecords} data">
                        <template #header>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Cari data..." />
                            </span>
                        </template>
                        <template #empty>
                            <div class="text-center p-3">Tidak ada data jadwal kontrol ulang.</div>
                        </template>

                        <Column field="NOMR" header="No. MR" sortable style="min-width:100px"></Column>
                        <Column field="NOPENDAFTARAN" header="No. Register" sortable style="min-width:130px"></Column>
                        <Column field="NAMAPASIEN" header="Nama Pasien" sortable style="min-width:180px">
                            <template #body="slotProps">
                                {{ slotProps.data.NAMAPASIEN }}
                                <span v-if="slotProps.data.USIA_PASIEN" class="text-muted text-sm">
                                    - {{ slotProps.data.USIA_PASIEN.tahun }} Thn
                                </span>
                            </template>
                        </Column>
                        <Column field="NAMADOKTER" header="Dokter DPJP" sortable style="min-width:160px"></Column>
                        <Column field="NAMA_POLI" header="Poli Tujuan" sortable style="min-width:140px"></Column>
                        <Column field="TANGGAL_KONTROL" header="Tgl Kontrol" sortable style="min-width:130px"></Column>
                        <Column field="JENIS_RAWAT" header="Jenis Rawat" sortable style="min-width:110px"></Column>
                        <Column field="STATUS" header="Status" sortable style="min-width:110px">
                            <template #body="slotProps">
                                <span :class="badgeClass(slotProps.data.STATUS)">
                                    {{ slotProps.data.STATUS || '-' }}
                                </span>
                            </template>
                        </Column>
                        <Column header="Aksi" style="min-width:180px">
                            <template #body="slotProps">
                                <a :href="'/jadwal-kontrol/form/' + slotProps.data.NOPENDAFTARAN"
                                    class="p-button p-button-primary p-button-sm mr-1"
                                    style="text-decoration:none; padding:0.3rem 0.6rem;">
                                    <i class="pi pi-plus mr-1"></i> Buat Jadwal
                                </a>
                                <Button v-if="slotProps.data.STATUS !== 'TERBIT'"
                                    label="Terbitkan" icon="pi pi-send"
                                    class="p-button p-button-warning p-button-sm"
                                    @click="openDialogTerbitkan(slotProps.data)" />
                                <span v-else class="badge badge-success">Sudah Terbit</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <!-- Dialog Tambah Jadwal -->
            <Dialog header="Tambah Jadwal Kontrol Ulang" v-model:visible="dialogTambah"
                :style="{ width: '500px' }" :modal="true" :closable="true">
                <div class="row">
                    <div class="col-12 mb-2">
                        <label class="text-sm">No. Register / No. MR</label>
                        <InputText v-model="formTambah.noregister" class="w-100" placeholder="Masukkan no. register" />
                    </div>
                    <div class="col-12 mb-2">
                        <label class="text-sm">Poli Tujuan Kontrol</label>
                        <Select v-model="formTambah.poli" :options="dataPoly" optionLabel="NAMA"
                            optionValue="KODE" placeholder="Pilih poli" class="w-100" filter />
                    </div>
                    <div class="col-12 mb-2">
                        <label class="text-sm">Tanggal Kontrol</label><br>
                        <Calendar v-model="formTambah.tanggal_kontrol" :showIcon="true" view="date"
                            dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                            style="width: 100%;" />
                    </div>
                    <div class="col-12 mb-2">
                        <label class="text-sm">Keterangan</label>
                        <Textarea v-model="formTambah.keterangan" rows="3" class="w-100"
                            placeholder="Keterangan tambahan..." />
                    </div>
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" class="p-button p-button-secondary"
                        @click="dialogTambah = false" />
                    <Button label="Simpan" icon="pi pi-check" class="p-button p-button-primary"
                        @click="simpanJadwal()" :disabled="isLoading" />
                </template>
            </Dialog>

            <!-- Dialog Konfirmasi Terbitkan -->
            <Dialog header="Konfirmasi Terbitkan Jadwal" v-model:visible="dialogTerbitkan"
                :style="{ width: '420px' }" :modal="true" :closable="true">
                <div v-if="selectedRow">
                    <p class="mb-1">Anda akan menerbitkan jadwal kontrol ulang untuk:</p>
                    <table class="table table-sm table-borderless">
                        <tbody>
                        <tr>
                            <td class="text-sm font-weight-bold" style="width:40%">Pasien</td>
                            <td class="text-sm">: {{ selectedRow.NAMAPASIEN }}</td>
                        </tr>
                        <tr>
                            <td class="text-sm font-weight-bold">No. Register</td>
                            <td class="text-sm">: {{ selectedRow.NOPENDAFTARAN }}</td>
                        </tr>
                        <tr>
                            <td class="text-sm font-weight-bold">Poli Tujuan</td>
                            <td class="text-sm">: {{ selectedRow.NAMA_POLI }}</td>
                        </tr>
                        <tr>
                            <td class="text-sm font-weight-bold">Tgl Kontrol</td>
                            <td class="text-sm">: {{ selectedRow.TANGGAL_KONTROL }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="text-warning text-sm"><i class="pi pi-exclamation-triangle mr-1"></i>Tindakan ini tidak dapat dibatalkan.</p>
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" class="p-button p-button-secondary"
                        @click="dialogTerbitkan = false" />
                    <Button label="Terbitkan" icon="pi pi-send" class="p-button p-button-warning"
                        @click="terbitkanJadwal()" :disabled="isLoading" />
                </template>
            </Dialog>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { FilterMatchMode } from 'primevue/api';
    import { EventBus } from '../../bus';

    export default {
        components: {
            Loading,
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
                    selectedJenisRawat: null,
                },
                formTambah: {
                    noregister: '',
                    poli: null,
                    tanggal_kontrol: '',
                    keterangan: '',
                },
                jenisRawat: [
                    { nama: 'Rawat Inap', kode: 'RI' },
                    { nama: 'Rawat Jalan', kode: 'RJ' }, 
                ],
                dataPoly: [],
                isLoading: false,
                fullPage: true,
                filters1: {},
                dialogTambah: false,
                dialogTerbitkan: false,
                selectedRow: null,
            };
        },
        mounted() {
            const now = new Date();
            this.form.startdate = now;
            this.form.enddate = now;
        },
        created() {
            this.initFilters1();
            this.getData();
            this.getDataPoly();
        },
        methods: {
            initFilters1() {
                this.filters1 = {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
                };
            },

            resetFilter() {
                const now = new Date();
                this.form.startdate = now;
                this.form.enddate = now;
                this.form.selectedJenisRawat = null;
                this.getData();
            },

            async getData() {
                this.fact = [];
                this.isLoading = true;
                await axios.post('/get_jadwal_kontrolulang', this.form)
                    .then(response => {
                        const res = response.data;
                        this.fact = res.response || res.data || res || [];
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal memuat data jadwal kontrol ulang');
                        console.error(error);
                    })
                    .finally(() => this.isLoading = false);
            },

            async getDataPoly() {
                await axios.post('/datapoly', {})
                    .then(response => {
                        this.dataPoly = response.data.response || response.data || [];
                    })
                    .catch(error => console.error(error));
            },

            openDialogTambah() {
                this.formTambah = { noregister: '', poli: null, tanggal_kontrol: '', keterangan: '' };
                this.dialogTambah = true;
            },

            openDialogTerbitkan(row) {
                this.selectedRow = row;
                this.dialogTerbitkan = true;
            },

            async simpanJadwal() {
                if (!this.formTambah.noregister || !this.formTambah.poli || !this.formTambah.tanggal_kontrol) {
                    this.notify('warning', 'Lengkapi semua field yang wajib diisi');
                    return;
                }
                this.isLoading = true;
                await axios.post('/terbitkan_kontrolulang', this.formTambah)
                    .then(response => {
                        this.notify('success', 'Jadwal kontrol ulang berhasil disimpan');
                        this.dialogTambah = false;
                        this.getData();
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal menyimpan jadwal kontrol ulang');
                        console.error(error);
                    })
                    .finally(() => this.isLoading = false);
            },

            async terbitkanJadwal() {
                this.isLoading = true;
                await axios.post('/terbitkan_kontrolulang', this.selectedRow)
                    .then(response => {
                        this.notify('success', 'Jadwal kontrol ulang berhasil diterbitkan');
                        this.dialogTerbitkan = false;
                        this.selectedRow = null;
                        this.getData();
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal menerbitkan jadwal');
                        console.error(error);
                    })
                    .finally(() => this.isLoading = false);
            },

            badgeClass(status) {
                if (status === 'TERBIT') return 'badge badge-success';
                if (status === 'PENDING') return 'badge badge-warning';
                return 'badge badge-secondary';
            },

            notify(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        },
    }
</script>
