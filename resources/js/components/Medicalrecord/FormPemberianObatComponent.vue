<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- ===== TABEL PEMBERIAN OBAT ===== -->
        <div class="card card-outline card-primary shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between py-2">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-pills mr-2 text-primary"></i>
                    Catatan Pemberian Obat
                </h3>
                <div class="d-flex align-items-center" style="gap:6px">
                    <SelectButton v-model="viewMode" :options="viewModeOptions" optionLabel="label" optionValue="value"
                        class="p-button-sm" />
                    <Button label="Tambah" icon="pi pi-plus" class="p-button-success p-button-sm" @click="call_form()" />
                    <Button icon="pi pi-refresh" class="p-button-secondary p-button-sm p-button-outlined" @click="getpemberian_obat()" v-tooltip.top="'Refresh data'" />
                </div>
            </div>
            <div class="card-body p-0" v-if="viewMode === 'list'">
                <DataTable :value="fact" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                    stripedRows sortMode="multiple" class="p-datatable-sm" responsiveLayout="scroll"
                    :resizableColumns="true" :paginator="true" :rows="10" v-model:filters="filters2"
                    :rowsPerPageOptions="[10,20,50,100,200]">
                    <template #header>
                        <div class="d-flex justify-content-end p-2">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters2['global'].value" placeholder="Cari data..." style="width:220px" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center py-4 text-muted">
                            <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                            Belum ada data pemberian obat.
                        </div>
                    </template>
                    <Column field="nama_obat" :sortable="true" header="Nama Obat" :styles="{'min-width':'140px'}"></Column>
                    <Column field="dosis"     :sortable="true" header="Dosis"></Column>
                    <Column field="frekwensi" :sortable="true" header="Frekuensi"></Column>
                    <Column field="rute"      :sortable="true" header="Rute"></Column>
                    <Column field="waktu"     :sortable="true" header="Waktu Pemberian"></Column>
                    <Column field="keterangan" :sortable="true" header="Keterangan"></Column>
                    <Column field="obat_dc"   :sortable="true" header="High Alert">
                        <template #body="slotProps">
                            <span :class="slotProps.data.obat_dc === 'YA' ? 'badge badge-danger' : 'badge badge-secondary'">
                                {{ slotProps.data.obat_dc }}
                            </span>
                        </template>
                    </Column>
                    <Column field="ruangan"   :sortable="true" header="Ruangan"></Column>
                    <Column field="auth_by"   header="Verifikasi" :styles="{'min-width':'110px'}">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.auth == 1" class="text-center">
                                <qrcode-vue :value="slotProps.data.auth_by" :size="48" level="H"></qrcode-vue>
                                <div class="text-xs text-muted mt-1">{{ slotProps.data.auth_by }}</div>
                                <div class="text-xs text-muted">{{ slotProps.data.time_verif }}</div>
                            </div>
                            <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                v-tooltip.top="'Otorisasi'" @click="call_oto(slotProps.data.id, 7)" />
                        </template>
                    </Column>
                    <Column header="Aksi" :styles="{'width':'90px','text-align':'center'}">
                        <template #body="slotProps">
                            <Button icon="pi pi-copy"  class="p-button-text p-button-info p-button-sm"   v-tooltip.top="'Salin'"  @click="filter_data(slotProps.data.id)" />
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" v-tooltip.top="'Hapus'" @click="hapus_line(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- ===== CROSSTAB VIEW: OBAT x TANGGAL ===== -->
            <div class="card-body p-0" v-else>
                <div class="table-responsive">
                    <table class="table table-bordered table-sm mb-0 crosstab-table">
                        <thead>
                            <tr>
                                <th style="min-width:180px">Nama Obat</th>
                                <th v-for="d in crosstabDates" :key="d" class="text-center" style="min-width:100px">
                                    {{ formatDateHeader(d) }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="crosstabRows.length === 0">
                                <td :colspan="crosstabDates.length + 1" class="text-center text-muted py-4">
                                    <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                                    Belum ada data pemberian obat.
                                </td>
                            </tr>
                            <tr v-for="row in crosstabRows" :key="row.nama_obat">
                                <td class="font-weight-bold">{{ row.nama_obat }}</td>
                                <td v-for="d in crosstabDates" :key="d" class="text-center crosstab-cell"
                                    :class="{ 'crosstab-cell-filled': row.cells[d] }"
                                    @click="row.cells[d] && buka_detail_sel(row.nama_obat, d, row.cells[d])">
                                    <template v-if="row.cells[d]">
                                        <span v-for="entry in row.cells[d]" :key="entry.id"
                                            class="crosstab-badge"
                                            :class="entry.auth == 1 ? 'crosstab-badge-verified' : 'crosstab-badge-pending'">
                                            {{ timeOnly(entry.waktu) }}
                                        </span>
                                    </template>
                                    <span v-else class="text-muted">-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ===== DIALOG: DETAIL SEL CROSSTAB ===== -->
        <Dialog :header="'Detail Pemberian: ' + selectedCellLabel" v-model:visible="showCellDetail"
            :containerStyle="{width:'60vw'}" :modal="true">
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Waktu</th>
                        <th>Dosis</th>
                        <th>Frekuensi</th>
                        <th>Rute</th>
                        <th>Keterangan</th>
                        <th>High Alert</th>
                        <th style="min-width:110px">Verifikasi</th>
                        <th style="width:90px" class="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in selectedCellEntries" :key="entry.id">
                        <td>{{ entry.waktu }}</td>
                        <td>{{ entry.dosis }}</td>
                        <td>{{ entry.frekwensi }}</td>
                        <td>{{ entry.rute }}</td>
                        <td>{{ entry.keterangan }}</td>
                        <td>
                            <span :class="entry.obat_dc === 'YA' ? 'badge badge-danger' : 'badge badge-secondary'">
                                {{ entry.obat_dc }}
                            </span>
                        </td>
                        <td>
                            <div v-if="entry.auth == 1" class="text-center">
                                <qrcode-vue :value="entry.auth_by" :size="40" level="H"></qrcode-vue>
                                <div class="text-xs text-muted mt-1">{{ entry.auth_by }}</div>
                                <div class="text-xs text-muted">{{ entry.time_verif }}</div>
                            </div>
                            <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                v-tooltip.top="'Otorisasi'" @click="call_oto(entry.id, 7)" />
                        </td>
                        <td class="text-center">
                            <Button icon="pi pi-copy" class="p-button-text p-button-info p-button-sm" v-tooltip.top="'Salin'"
                                @click="filter_data(entry.id); showCellDetail=false" />
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" v-tooltip.top="'Hapus'"
                                @click="hapus_line(entry.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showCellDetail=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: OTORISASI ===== -->
        <Dialog header="Otorisasi Pemberian Obat" v-model:visible="showOtorisasi"
            :containerStyle="{width:'40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode="mode_otto" :noregister="id_inputan"></otorisasi-form>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="showOtorisasi=false" />
                <Button label="Tutup"  icon="pi pi-check" @click="showOtorisasi=false" autofocus />
            </template>
        </Dialog>

        <!-- ===== DIALOG: INPUT PEMBERIAN OBAT ===== -->
        <Dialog header="Input Catatan Pemberian Obat" v-model:visible="showInputCairan"
            :style="{ width: '60vw' }" :breakpoints="{ '768px': '100vw' }"
            :contentStyle="{ minHeight: '420px' }" :modal="true" :draggable="false">
            <div class="p-3">
                <div class="row">
                    <!-- Waktu Pemberian -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Waktu Pemberian <span class="text-danger">*</span></label>
                        <DatePicker v-model="form.startdate" showTime hourFormat="24" style="width:100%" placeholder="Pilih tanggal & waktu" />
                    </div>

                         <!-- Dosis -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Dosis Pemakaian <span class="text-danger">*</span></label>
                        <InputText class="w-100" placeholder="Contoh: 500 mg" v-model="form.dosis" />
                    </div>
                    <!-- Nama Obat -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Nama Obat <span class="text-danger">*</span></label>
                        <Select
                            class="w-100"
                            v-model="form.nama_obat"
                            :options="obat_options"
                            @change="onObatSelect($event)"
                            placeholder="Pilih atau ketik nama obat"
                            :editable="true"
                            :filter="true"
                        />
                    </div>

                    <!-- Frekuensi -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Frekuensi</label>
                        <InputText class="w-100" placeholder="Contoh: 3x sehari" v-model="form.frekwensi" />
                    </div>
                    <!-- Rute -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Rute Pemberian <span class="text-danger">*</span></label>
                        <Select class="w-100" v-model="form.ruteselected" filter :options="rute" placeholder="Pilih rute..." />
                    </div>
                    <!-- High Alert -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Obat High Alert</label>
                        <Select class="w-100" v-model="form.obat_dc_selected" :options="obat_dc" placeholder="Pilih..." />
                    </div>
                    <!-- Keterangan -->
                    <div class="col-12 mb-1">
                        <label class="form-label-custom">Keterangan</label>
                        <InputText class="w-100" placeholder="Keterangan tambahan (opsional)" v-model="form.keterangan" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Batal"  icon="pi pi-times" class="p-button-text p-button-secondary" @click="showInputCairan=false" />
                <Button label="Simpan" icon="pi pi-save"  class="p-button-success" @click="simpan_pemberian_obat()" />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import InputMask from 'primevue/inputmask';
        import QrcodeVue from 'qrcode.vue';
        import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            QrcodeVue
        },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    ruteselected: null,
                    obat_dc_selected:null,
                    keterangan: '',
                    dosis: '',
                    nama_obat: '',
                    nama_ruangan: '',
                    frekwensi: ''
                },
                isLoading: false,
                fullPage: true,
                mode_otto:0,
                showInputCairan: false,
                rute: [
                    'ORAL',
                    'INJEKSI',
                    'INTRAVENA (IV)',
                    'INTRAMUSKULAR (IM)',
                    'SUBKUTAN (SC)',
                    'INTRAKUTAN (IC)',
                    'SUBLINGUAL',
                    'BUKAL',
                    'REKTAL',
                    'TOPIKAL',
                    'INHALASI',
                    'TETES MATA',
                    'TETES TELINGA',
                    'TETES HIDUNG',
                    'INTRANASAL',
                    'VAGINAL',
                    'TRANSDERMAL',
                ],
                obat_dc:['YA','TIDAK'],
                filters1: {},
                filters2: {},
                showOtorisasi:false,
                id_inputan:0,
                riwayat_obat: [],
                viewMode: 'list',
                viewModeOptions: [
                    { label: 'List', value: 'list', icon: 'pi pi-list' },
                    { label: 'Crosstab', value: 'crosstab', icon: 'pi pi-table' },
                ],
                showCellDetail: false,
                selectedCellEntries: [],
                selectedCellLabel: ''

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getpemberian_obat();
            this.initFilters1()
            this.initFilters2()
            this.get_data_kco()
        },
        computed: {
            obat_options() {
                const items = (this.riwayat_obat && this.riwayat_obat.sub_item) ? this.riwayat_obat.sub_item : [];

                let selectedDate = null;
                if (this.form.startdate) {
                    const d = new Date(this.form.startdate);
                    selectedDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                }

                const filtered = selectedDate ? items.filter(x => x.DT_ONLY === selectedDate) : items;

                const seen = new Set();
                return filtered
                    .filter(x => {
                        if (seen.has(x.NAMABARANG)) return false;
                        seen.add(x.NAMABARANG);
                        return true;
                    })
                    .map(x => x.NAMABARANG);
            },
            crosstabDates() {
                const set = new Set();
                (this.fact || []).forEach(r => {
                    if (r.waktu) set.add(this.dateOnly(r.waktu));
                });
                return Array.from(set).sort();
            },
            crosstabRows() {
                const map = {};
                (this.fact || []).forEach(r => {
                    const obat = r.nama_obat || '-';
                    if (!map[obat]) map[obat] = {};
                    const d = this.dateOnly(r.waktu);
                    if (!map[obat][d]) map[obat][d] = [];
                    map[obat][d].push(r);
                });
                return Object.keys(map).sort().map(obat => ({ nama_obat: obat, cells: map[obat] }));
            }
        },
        methods: {
            dateOnly(waktu) {
                return waktu ? String(waktu).substring(0, 10) : '';
            },
            timeOnly(waktu) {
                return waktu ? String(waktu).substring(11, 16) : '';
            },
            formatDateHeader(d) {
                if (!d) return '-';
                const [y, m, day] = d.split('-');
                return `${day}/${m}/${y}`;
            },
            buka_detail_sel(nama_obat, date, entries) {
                this.selectedCellEntries = entries;
                this.selectedCellLabel = `${nama_obat} - ${this.formatDateHeader(date)}`;
                this.showCellDetail = true;
            },
            fetchData() {
                var currentDate = new Date();
            },
            call_form() {
                this.showInputCairan = true;
            },
            async get_data_kco() {
                this.isLoading = true;
                this.form.NOREGISTER = this.datapasien.NOPENDAFTARAN;
                await axios.post('/get_data_kco', this.form)
                    .then(response => {
                        this.riwayat_obat = response.data.response;
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            call_oto(soapid,mode_otto)
            {
                this.id_inputan = soapid;
                this.mode_otto = mode_otto
                this.showOtorisasi = true;
            },
            async hapus_line(id)
            {
                this.isLoading = true
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.id = id;
                await axios.post('/hapus_pemberian_obat', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.open('success', response.data.metadata.message);
                            this.clear_data();
                            this.getpemberian_obat();
                        } else {
                            this.open('warning', response.data.metadata.message);
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            clear_data()
            {
                this.form.dosis ="";
                this.form.frekwensi ="";
                this.form.nama_obat ="";
                this.form.keterangan ="";
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;
                    this.getpemberian_obat();
                }
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                })
            },
            async simpan_pemberian_obat() {
                this.isLoading = true
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.nama_ruangan = this.datapasien.POLI;
                await axios.post('/simpan_pemberian_obat', this.form)
                    .then(response => {
                        if (response.data.metadata.code == 200) {
                            this.showInputCairan = false;
                            this.open('success', response.data.metadata.message);
                            this.getpemberian_obat();

                        } else {
                            this.open('warning', response.data.metadata.message);
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            filter_data(id)
            {
                const data_filter = this.fact.filter(x => x.id ===id);

                this.call_form()

                if(data_filter.length>0)
                {
                    this.form.ruteselected= data_filter[0].rute;
                    this.form.obat_dc_selected= data_filter[0].obat_dc;
                    this.form.keterangan= data_filter[0].keterangan;
                    this.form.dosis= data_filter[0].dosis;
                    this.form.nama_obat= data_filter[0].nama_obat;
                    this.form.frekwensi= data_filter[0].frekwensi;
                }

            },
            onObatSelect(event) {
                const items = (this.riwayat_obat && this.riwayat_obat.sub_item) ? this.riwayat_obat.sub_item : [];
                const name = event.value;

                // Format tanggal dari form.startdate ke "YYYY-MM-DD"
                let selectedDate = null;
                if (this.form.startdate) {
                    const d = new Date(this.form.startdate);
                    selectedDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                }

                // Cari berdasarkan nama obat + tanggal yang dipilih
                let matched = selectedDate
                    ? items.find(x => x.NAMABARANG === name && x.DT_ONLY === selectedDate)
                    : null;

                // Fallback: entry pertama untuk nama obat tsb yang punya REMARK_ITEM
                if (!matched || !matched.REMARK_ITEM) {
                    matched = items.find(x => x.NAMABARANG === name && x.REMARK_ITEM);
                }

                this.form.dosis = (matched && matched.REMARK_ITEM) ? matched.REMARK_ITEM : '';
            },
            async getpemberian_obat() {
                this.isLoading = true
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                await axios.post('/getpemberian_obat', this.form)
                    .then(response => {
                        this.fact = response.data.response;
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }

        },
    }

</script>

<style scoped>
.crosstab-table thead th {
    background: #f8f9fa;
    text-align: center;
    vertical-align: middle;
}
.crosstab-cell {
    vertical-align: middle;
}
.crosstab-cell-filled {
    cursor: pointer;
}
.crosstab-cell-filled:hover {
    background: #e3f2fd;
}
.crosstab-badge {
    display: inline-block;
    margin: 1px 2px;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: .75rem;
    font-weight: 600;
}
.crosstab-badge-verified {
    background: #d4edda;
    color: #155724;
}
.crosstab-badge-pending {
    background: #fff3cd;
    color: #856404;
}
</style>
