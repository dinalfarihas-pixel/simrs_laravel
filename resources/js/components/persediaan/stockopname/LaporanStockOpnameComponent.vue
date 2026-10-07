<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Kunjungan Pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 10em;" />

                    <Select class="multiselect-custom" id="lokasi" name="CAPION" v-model="form.lokasiSelected"
                        :options="lokasi_arr" optionLabel="DISPLAY" filter placeholder="Stok lokasi" display="chip" />

                    <Select class="multiselect-custom" id="kategori" name="CAPION" v-model="form.kategoriSelected"
                        :options="kategori" optionLabel="" placeholder="Pilih kategori persediaan" display="chip" />

                    <Button label="Tampilkan" align="" @click="laporan_stock_opname()" icon="pi pi-check"
                        class="p-button" />
                </div>
            </div>

            <!-- Summary Cards -->
            <div class="row">
                <div class="col-12 col-sm-3 col-md-3">
                    <div class="info-box bg-info">
                        <div class="info-box-content">
                            <span class="info-box-text">Jumlah Item Persediaan</span>
                            <span class="info-box-number">
                                <h3><strong>{{ summary.totalItem }}</strong></h3>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 col-md-3">
                    <div class="info-box bg-warning">
                        <div class="info-box-content">
                            <span class="info-box-text">Telah SO</span>
                            <span class="info-box-number">
                                <h3><strong>{{ summary.telahOpname }} ({{ summary.persentase }}%)</strong></h3>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 col-md-3">
                    <div class="info-box bg-orange">
                        <div class="info-box-content">
                            <span class="info-box-text">Total Persediaan Setelah SO</span>
                            <span class="info-box-number">
                                <h3>Rp.<strong>{{ $numeral(summary.total_persediaan, '0,0.00') }}</strong></h3>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 col-md-3">
                    <div class="info-box bg-success">
                        <div class="info-box-content">
                            <span class="info-box-text">Selisih (SO)</span>
                            <span class="info-box-number">
                                <h3>Rp.<strong>{{ $numeral(summary.net_selisih, '0,0.00') }}</strong></h3>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Difference Summary -->
            <div class="row">
                <div class="col-3">
                    <div class="info-box bg-lightgreen">
                        <div class="info-box-content">
                            <span class="info-box-text">Selisih Lebih</span>
                            <span class="info-box-number">
                                <h4>Rp.<strong>{{ $numeral(summary.selisih_plus, '0,0.00') }}</strong></h4>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="info-box bg-lightred">
                        <div class="info-box-content">
                            <span class="info-box-text">Selisih Kurang</span>
                            <span class="info-box-number">
                                <h4>Rp.<strong>{{ $numeral(summary.selisih_minus, '0,0.00') }}</strong></h4>
                            </span>
                        </div>
                    </div>
                </div>

                   <div class="col-3">
                        <div class="info-box bg-default">
                            <div class="info-box-content">
                                <span class="info-box-text">Stock IN</span>
                                <span class="info-box-number text-primary">
                                    <h4> Rp {{ $numeral(stock_out_in.STOCK_IN, '0,0.00') }}</h4>
                                </span>
                            </div>
                        </div>
                    </div>

                       <div class="col-3">
                        <div class="info-box bg-default">
                            <div class="info-box-content">
                                <span class="info-box-text">Stock OUT</span>
                                <span class="info-box-number">
                                  <h4>  Rp {{ $numeral(stock_out_in.STOCK_OUT, '0,0.00') }}</h4>
                                </span>
                            </div>
                        </div>
                    </div>
            </div>

            <!-- Data Table -->
            <div class="card">
                <div class="row mt-3 ml-3">
                    <div class="col-1">
                        <downloadExcel
                           class="btn btn-block btn-success btn-sm"
                             :data="fact && fact.length > 0 ? fact : []"  
                            worksheet="Stock Opname"
                            name="laporan_stock_opname.xls"
                            />
                    </div>
                </div>

                <div class="card-body">
                    <DataTable fixTableHead :value="fact" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                        stripedRows sortMode="multiple" class="p-datatable-sm" responsiveLayout="scroll"
                        :resizableColumns="false" :paginator="true" :rows="10" v-model:filters="filters2"
                        :rowsPerPageOptions="[10,20,50,100,200,500,1000]">
                        <template #header>
                            <div class="table-header">
                                <div class="row">
                                    <div class="col-md-7 col-sm-7 col-4 mt-0">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loading>
                            Loading data. Please wait.
                        </template>

                        <Column field="NO" :sortable="true" header="NO" style="width: 5%"></Column>
                        <Column field="SUB_BARCODE" :sortable="true" header="SUB BARCODE" style="width: 10%"></Column>
                        <Column field="BARCODE" :sortable="true" header="BARCODE" style="width: 8%"></Column>
                        <Column field="KATEGORI" :sortable="true" header="KATEGORI" style="width: 10%"></Column>
                        <Column field="NAMA" :sortable="true" header="NAMA" style="width: 15%"></Column>
                        
                        <Column field="STTS" :sortable="true" header="STATUS" style="width: 8%">
                            <template #body="slotProps">
                                <span v-if="slotProps.data.STTS === 'SUDAH'">
                                    <span class="badge badge-success">{{ slotProps.data.STTS }}</span>
                                </span>
                                <span v-else>
                                    <span class="badge badge-danger">{{ slotProps.data.STTS }}</span>
                                </span>
                            </template>
                        </Column>

                        <Column field="HARGA_POKOK" :sortable="true" header="HARGA POKOK" style="width: 10%; text-align: right">
                            <template #body="slotProps">
                                Rp.{{ $numeral(slotProps.data.HARGA_POKOK, '0,0.00') }}
                            </template>
                        </Column>

                        <Column field="QTY_SISTEM" :sortable="true" header="QTY SISTEM" style="width: 8%; text-align: right">
                            <template #body="slotProps">
                                {{ $numeral(slotProps.data.QTY_SISTEM, '0,0') }}
                            </template>
                        </Column>

                        <Column field="QTY_FISIK" :sortable="true" header="QTY FISIK" style="width: 8%; text-align: right">
                            <template #body="slotProps">
                                {{ $numeral(slotProps.data.QTY_FISIK, '0,0') }}
                            </template>
                        </Column>

                        <Column field="SELISIH" :sortable="true" header="SELISIH" style="width: 8%; text-align: right">
                            <template #body="slotProps">
                                <span :class="slotProps.data.SELISIH < 0 ? 'text-danger' : 'text-success'">
                                    {{ $numeral(slotProps.data.SELISIH, '0,0') }}
                                </span>
                            </template>
                        </Column>

                        <Column field="TGL_EXPIRED" :sortable="true" header="TGL EXPIRED" style="width: 10%"></Column>
                        <Column field="BATCH_NUMBER" :sortable="true" header="BATCH" style="width: 8%"></Column>
                        <Column field="CATATAN" :sortable="true" header="CATATAN" style="width: 10%"></Column>

                        <Column header="VERIFIKASI" style="width: 12%">
                            <template #body="slotProps">
                                <small v-if="slotProps.data.TGL_CONFIRM">
                                    <p class="m-0"><strong>{{ slotProps.data.TGL_CONFIRM }}</strong></p>
                                    <p class="m-0">{{ slotProps.data.CONFIRM_BY }}</p>
                                </small>
                                <small v-else class="text-muted">Belum diverifikasi</small>
                            </template>
                        </Column>

                        <Column header="AKSI" style="width: 10%">
                            <template #body="slotProps">
                                <button type="button" @click="arsipkan_item_barang(slotProps.data)"
                                    class="btn btn-block btn-info btn-sm">Non Aktifkan</button>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="card-footer">
                    <span v-if="summary.status" class="mr-3">
                        <strong>Status:</strong> <span class="badge badge-info">{{ summary.status }}</span>
                    </span>
                    <Button label="Verifikasi Selesai" align="" @click="show_final_dialog_func()" icon="pi pi-check"
                        class="p-button" />
                </div>
            </div>
        </div>

        <!-- Final Verification Dialog -->
        <Dialog :header="'Closing Opname ' + header_opname" v-model:visible="finaldialog" :containerStyle="{width: '85vw'}"
            :modal="true">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-12 col-sm-3 col-md-3">
                                    <div class="info-box bg-info">
                                        <div class="info-box-content">
                                            <span class="info-box-text">Jumlah Item</span>
                                            <span class="info-box-number">
                                                <h4><strong>{{ summary.totalItem }}</strong></h4>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-3 col-md-3">
                                    <div class="info-box bg-warning">
                                        <div class="info-box-content">
                                            <span class="info-box-text">Telah SO</span>
                                            <span class="info-box-number">
                                                <h4><strong>{{ summary.telahOpname }} ({{ summary.persentase }}%)</strong></h4>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-3 col-md-3">
                                    <div class="info-box bg-orange">
                                        <div class="info-box-content">
                                            <span class="info-box-text">Total Persediaan</span>
                                            <span class="info-box-number">
                                                <h4>Rp.<strong>{{ $numeral(summary.total_persediaan, '0,0.00') }}</strong></h4>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-3 col-md-3">
                                    <div class="info-box bg-success">
                                        <div class="info-box-content">
                                            <span class="info-box-text">Selisih Netto</span>
                                            <span class="info-box-number">
                                                <h4>Rp.<strong>{{ $numeral(summary.net_selisih, '0,0.00') }}</strong></h4>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="closefinalDialog()" class="p-button-text" />
                <Button label="Verifikasi Hasil Stock Opname" icon="pi pi-check" @click="finishing_opname()" autofocus />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import { Dropdown } from 'bootstrap';
    import DataTable from 'primevue/datatable';
    import Loading from 'vue-loading-overlay';
    import ConfirmDialog from 'primevue/confirmdialog';
    import ConfirmPopup from 'primevue/confirmpopup';
    import { FilterMatchMode } from 'primevue/api';

    export default {
        components: {
            Loading,
            DataTable,
            ConfirmDialog,
            ConfirmPopup,
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                kategori: ['OBAT-OBATAN', 'BMHP', 'BHP NONMEDIS'],
                lokasi_arr: [],
                finaldialog: false,
                header_opname: '',
                summary: {
                    totalItem: 0,
                    telahOpname: 0,
                    persentase: 0,
                    total_persediaan: 0,
                    selisih_plus: 0,
                    selisih_minus: 0,
                    net_selisih: 0,
                    status: ''
                },
                form: {
                    startdate: '',
                    lokasiSelected: '',
                    kategoriSelected: '',
                    data: []
                },
                isLoading: false,
                fullPage: true,
                filters2: {},
                stock_out_in: {
                    STOCK_IN: 0,
                    STOCK_OUT: 0
                }
            };
        },
        mounted() {
            const currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            this.get_lokasi();
            this.initFilters2();
        },
        methods: {
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
             async rekap_stock_in_out() {
                this.isLoading = true;
                this.form.bulanthn = this.form.startdate 
                
                await axios.post('/rekap_stock_in_out', this.form)
                    .then(response => {

                        if (response.data.response.length > 0) {
                            this.stock_out_in = response.data.response[0]; 
                            console.log(this.stock_out_in)
                        } 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
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
            async laporan_stock_opname() {
                this.isLoading = true; 
                try {
                    this.rekap_stock_in_out()
                    const response = await axios.post('/laporan_stock_opname', this.form);
                    this.fact = response.data.response || [];
                    this.summary = response.data.summary || {};
                } catch (error) {
                    console.error(error);
                    this.open('error', 'Gagal mengambil data');
                } finally {
                    this.isLoading = false;
                }
            },
            show_final_dialog_func() {
                this.header_opname = this.form.kategoriSelected || 'Stock Opname';
                this.finaldialog = true;
            },
            
            closefinalDialog() {
                this.finaldialog = false;
            },
            async finishing_opname() {
                this.isLoading = true;
                this.form.data = this.fact;
                this.closefinalDialog();

                try {
                    const response = await axios.post('/finishing_opname', this.form);
                    if (response.data.metadata.code === 200) {
                        this.open('success', response.data.metadata.message);
                    } else {
                        this.open('warning', response.data.metadata.message);
                    }
                } catch (error) {
                    console.error(error);
                    this.open('error', 'Gagal menyelesaikan opname');
                } finally {
                    this.isLoading = false;
                }
            },
            async get_lokasi() {
                this.isLoading = true;
                try {
                    const response = await axios.get('/getlokasi-api');
                    this.lokasi_arr = response.data.response.filter(x => x.IS_HQ === 1);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            },
            async arsipkan_item_barang(data) {
                this.form.data = data;
                this.form.mode = 3;

                try {
                    const response = await axios.post('/arsipkan_item_barang', this.form);
                    const index = this.fact.findIndex(item => item.SUB_BARCODE === data.SUB_BARCODE);
                    if (response.data.metadata.code === 200) {
                        this.open('success', response.data.metadata.message);
                        if (index > -1) {
                            this.fact.splice(index, 1);
                        }
                    } else {
                        this.open('warning', response.data.metadata.message);
                    }
                } catch (error) {
                    console.error(error);
                    this.open('error', 'Gagal mengarsipkan item');
                } finally {
                    this.isLoading = false;
                }
            }
        },
    }
</script>