<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Parameter Percarian</h3>
                        </div>
                        <div class="card-body">
                             
                                <Select id="kategori" name="kategori" v-model="form.kategori_selected"
                                    :options="kategori" optionLabel="name" placeholder="Pilih Kategory" />

                                <Select class="multiselect-custom" id="lokasi" name="CAPION" v-model="lokasi_param"
                                    :options="lokasi_arr" optionLabel="DISPLAY" placeholder="Stok lokasi" />

                                <Calendar v-model="form.valuedate" class="text-sm" :showIcon="true" view="month"
                                    dateFormat="mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                    aria-placeholder="Pilih bulan" style="width: 10em;   " />

                                <Button label="Tampilkan" align="" icon="pi pi-check" @click="getdtaa()"
                                    class="p-button" />                               
                           
                            <div class="card-body table-responsive p-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box bg-info">
                        <div class="info-box-content">
                            <span class="info-box-text">Persediaan Awal</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumstockawal) }}</strong></h4>
                                <small></small>
                            </span>
                        </div>
                    </div>
                </div>


                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box mb-3 bg-indigo ">
                        <div class="info-box-content">
                            <span class="info-box-text">Terima distribusi</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumTerima) }}</strong></h4>

                            </span>
                        </div>
                    </div>
                </div>


                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box bg-danger mb-3">
                        <div class="info-box-content">
                            <span class="info-box-text">Pembelian</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumpembelian) }}</strong></h4>
                                <!-- <InputNumber v-model="summary.sumpembelian" class="disable" />  -->
                            </span>
                        </div>

                    </div>
                </div>

                <div class="clearfix hidden-md-up"></div>
                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box mb-3 bg-success">

                        <div class="info-box-content">
                            <span class="info-box-text">Distribusi</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumdistribusi)}}</strong></h4>
                                <!-- <InputNumber v-model="summary.sumdistribusi" class="disable" />  -->
                            </span>
                        </div>

                    </div>

                </div>

                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box bg-maroon mb-3">
                        <div class="info-box-content">
                            <span class="info-box-text">Pemakaian</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumSales)}}</strong></h4>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 col-md-2">
                    <div class="info-box bg-warning mb-3">
                        <div class="info-box-content">
                            <span class="info-box-text">Persediaan Akhir</span>
                            <span class="info-box-number">
                                <h4>Rp. <strong> {{formatCurrency(summary.sumstockakhir) }}</strong></h4>
                                <!-- <InputNumber v-model="summary.sumdistribusi" class="disable" />  -->
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <download-excel :data="fact" :fields="json_fields" name="DATA PERSEDIAAN.xls">
                        <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                    </download-excel>

                    <div class="card-tools">
                        <div class="input-group input-group-sm" >
                              <a class="btn btn" target="_blank" :href="url_print">
                                    <i class="fas fa-print">
                                    </i>
                                    Cetak format SO
                                </a>
                        </div>
                    </div>
                    <br>
                    <br>
                    <DataTable :value="fact" showGridlines responsiveLayout="scroll" :rowHover="true"
                        columnResizeMode="fit" selectionMode="single" stripedRows sortMode="multiple"
                        class="p-datatable-sm" :resizableColumns="true" :paginator="true" :rows="10"
                        v-model:filters="filters1" :rowsPerPageOptions="[10,20,50,100,200]">
                        <template #header>
                            <div class="table-header">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters1['global'].value" placeholder="Pencarian" />
                                </span>
                            </div>
                        </template>
                        <ColumnGroup type="header">
                            <Row>
                                <Column header="" :colspan="1" :rowspan="2"  frozen/>
                                <Column header="" :colspan="1" :rowspan="2" frozen/>
                                <Column header="" :colspan="1" :rowspan="2"frozen />
                                <Column header="" :colspan="1" :rowspan="2"  frozen/>
                                <Column header="" :colspan="1" :rowspan="2" />
                                <Column header="PERSEDIAAN AWAL" :colspan="3" :rowspan="2"
                                    :styles="{'background-color':'azure'}">
                                    <template #body="slotProps">
                                        <p></p>
                                    </template>
                                </Column>
                                <Column header="PEMBELIAN" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'bisque'}"></Column>
                                <Column header="DISTRIBUSI" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'azure'}"></Column>
                                <Column header="PENERIMAAN DISTRIBUSI" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'bisque'}"></Column>
                                <Column header="PEMAKAIAN" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'azure'}"></Column>
                                <Column header="PERSEDIAAN AKHIR" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'bisque'}"></Column>
                                <Column header="EXP" :colspan="2" :rowspan="2"
                                    :styles="{'text-align':'center', 'background-color':'bisque'}"></Column>
                            </Row>
                            <Row>
                                <Column field="running_number" header="NO" sortable  alignFrozen="left"></Column>
                                <Column field="barcode" header="BARCODE" sortable  alignFrozen="left"></Column>
                                <Column field="subbarcode" header="SUB BARCODE" sortable  alignFrozen="left"></Column>
                                <Column field="nama_barang" header="NAMA" frozen alignFrozen="left"
                                :styles="{'flex-grow':'1', 'flex-basis':'160px'}"  ></Column>
                                <Column field="satuan" header="SATUAN" frozen></Column>
                                <Column field="stock_awal" header="STOCK AWAL" sortable></Column>
                                <Column field="harga" header="HARGA" sortable></Column>
                                <Column field="total_persediaan_awal" sortable header="PERSEDIAAN AWAL (Rp)"
                                    :styles="{'text-align':'center'}"></Column>
                                <Column field="pembelian" header="PEMBELIAN" sortable></Column>
                                <Column field="total_pembelian" header="PEMBELIAN (Rp)" sortable></Column>
                                <Column field="transfer_bidang" header="TRANSF BIDANG" sortable></Column>
                                <Column field="total_transfer_bidang" header="TRANSF (Rp)" sortable></Column>
                                <Column field="terima" header="TERIMA" sortable></Column>
                                <Column field="total_terima" header="TERIMA (Rp)" sortable></Column>
                                <Column field="penjualan" header="PEMAKAIAN" sortable></Column>
                                <Column field="penjualan_amt" header="PEMAKAIAN (Rp)" sortable></Column>
                                <Column field="stock_akhir" header="STOCK AKHIR" sortable></Column>
                                <Column field="persediaan_akhir_total" header="STOCK AKHIR (Rp)" sortable></Column>
                                <Column field="expired_date" header="EXP" sortable></Column>
                            </Row>

                        </ColumnGroup>
                        <Column field="running_number" header="NO" frozen></Column>
                        <Column field="barcode" header="BARCODE"frozen></Column>
                        <Column field="subbarcode" header="SUB BARCODE" frozen></Column>
                        <Column field="nama_barang" header="NAMA" :styles="{'flex-grow':'1', 'flex-basis':'160px'}" frozen>
                            <template #body="slotProps">
                                <Button type="button" icon="pi pi-paperclip" @click="openBasic(slotProps.data)"
                                class="p-button-primary p-button-text"></Button />
                                {{formatInterger(slotProps.data.nama_barang)}}
                            </template>
                        </Column>
                        <Column field="satuan" header="SATUAN" frozen></Column>
                        <Column field="" header="STOCK AWAL" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatInterger(slotProps.data.stock_awal)}}
                            </template>

                        </Column>
                        <Column field="" header="harga" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.harga)}}
                            </template>
                        </Column>

                        <Column field="" header="total_persediaan_awal" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.total_persediaan_awal)}}
                            </template>
                        </Column>
                        <Column field="pembelian" header="pembelian" :styles="{'text-align':'right'}">

                            <template #body="slotProps">

                                {{formatCurrency(slotProps.data.pembelian)}}
                            </template>
                        </Column>
                        <Column field="total_pembelian" header="total_pembelian" :styles="{'text-align':'right'}">
                            <template #body="slotProps">

                                {{formatCurrency(slotProps.data.total_pembelian)}}
                            </template>
                        </Column>
                        <Column field="transfer_bidang" header="transfer_bidang" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.transfer_bidang)}}
                            </template>
                        </Column>
                        <Column field="total_transfer_bidang" header="total_transfer_bidang"
                            :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.total_transfer_bidang)}}
                            </template>
                        </Column>
                        <Column field="terima" header="terima" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.terima)}}
                            </template>
                        </Column>
                        <Column field="total_terima" header="total_terima" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.total_terima)}}
                            </template>
                        </Column>
                        <Column field="penjualan" header="penjualan" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.penjualan)}}
                            </template>
                        </Column>
                        <Column field="penjualan_amt" header="penjualan_amt" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.penjualan_amt)}}
                            </template>
                        </Column>
                        <Column field="stock_akhir" header="stock_akhir" :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.stock_akhir)}}
                            </template>
                        </Column>
                        <Column field="persediaan_akhir_total" header="STOCK AKHIR (Rp)" sortable
                            :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.persediaan_akhir_total)}}
                            </template>
                        </Column>
                        <Column field="expired_date" header="EXP" sortable></Column>
                        <template #footer>

                        </template>
                    </DataTable>

                </div>
            </div>

            <Dialog :header=param_send.item_header v-model:visible="displayBasic" :containerStyle="{width: '80vw'}"
                :modal="true">

                <div class="card ">
                    <download-excel :data="card_stock" :fields="json_fields" name="kartu stock.xls">
                        <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                    </download-excel>
                    <div class="card-body table-sm table-responsive p-0">
                        <Calendar v-model="param_send.startdate" class="text-sm" :showIcon="true" view="date"
                            dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                            aria-placeholder="Tanggal awal" style="width: 15em; " />
                        <Calendar v-model="param_send.enddate" class="text-sm" :showIcon="true" view="date"
                            dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                            aria-placeholder="Tanggal Akhir" style="width: 15em; " />
                        <Button type="button" label="Cari" icon="pi pi-search" @click="getriwayat_card_stock()"
                            class="p-button" />
                        <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
                        <DataTable fixTableHead :value="card_stock" :rowHover="true" columnResizeMode="fit"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm mt-4"
                            responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                            v-model:filters="filters1" :rowsPerPageOptions="[10,20,50,100,200]">
                            <template #header>
                                <div class="table-header">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText v-model="filters1['global'].value" placeholder="Pencarian" />
                                    </span>

                                </div>
                            </template>
                            <template #loading>
                                Loading customers data. Please wait.
                            </template>
                            <Column field="ID" header="ID">
                                <template #body='slotProps'>

                                    <span class="p-input-icon-left">
                                        <i class="pi pi-tag" />
                                    </span>
                                </template>
                            </Column>
                            <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->

                            <Column field="CAPTION" :sortable="true" header="CAPTION" :styles="{'width':'10em'}">
                            </Column>
                            <Column field="BARCODE" :sortable="true" header="BARCODE"></Column>
                            <Column field="SUB_BARCODE" :sortable="true" header="S BARCODE"></Column>
                            <Column field="LOKASI" :sortable="true" header="LOKASI"></Column>
                            <Column field="TANGGAL_TRANS" :sortable="true" header="TGL"
                                :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="REFF_NUMBER" :sortable="true" header="NO.TRAN"></Column>
                            <Column field="QTY" :sortable="true" header="QTY" :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="SALDO" :sortable="true" header="SALDO" :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="HARGA_SATUAN" :sortable="true" header="HARGA_SATUAN"
                                :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="OP" :sortable="true" header="OP" :styles="{'text-align':'right'}" />
                            <!-- <Column field="TGL_PERMINTAAN" :sortable="true" header="TGL PERMINTAAN"></Column> -->
                        </DataTable>
                    </div>
                </div>

                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeBasic" autofocus />
                </template>
            </Dialog>

        </div>
    </section>
</template>

<script setup>
    const search = (e) => {
        console.log(e.target.value);
    }

</script>

<script>
    // import {
    //     Dropdown
    // } from 'bootstrap';
    import Loading from 'vue-loading-overlay';
    import moment from 'moment';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            moment
        },
        mounted() {

        },
        data() {
            return {
                json_fields: {
                    'BARCODE': 'barcode',
                    'SUBBARCODE': 'subbarcode',
                    'NAMA BARANG': 'nama_barang',
                    'SATUAN': 'satuan',
                    'STOCK AWAL': 'stock_awal',
                    'HARGA': 'harga',
                    'TOTAL PERSEDIAAN AWAL': 'total_persediaan_awal',
                    'PEMBELIAN': 'pembelian',
                    'TOTAL PEMBELIAN': 'total_pembelian',
                    'TRANSFER BIDANG': 'transfer_bidang',
                    'TOTAL TRANSFER BIDANG': 'total_transfer_bidang',
                    'STOCK AKHIR': 'stock_akhir',
                    'PEMAKAIAN': 'penjualan',
                    'PEMAKAIAN (Rp)': 'penjualan_amt',
                    'TOTAL PERSEDIAAN AKHIR': 'persediaan_akhir_total',
                    'SUPPLIER': 'supplier',
                    'EXP': 'expired_date',

                },
                card_stock:[],
                selectedDate: new Date(),
                lokasi_param: null,
                form: {
                    kategori_selected: '',
                    lokasiSelected: '',
                    valuedate: '',
                },
                isLoading: false,
                fullPage: true,
                penerimaan: 0,
                summary: '',
                selectedCars: '',

                fact: [],
                filters: {
                    nama_barang: {
                        value: '',
                        keys: ['nama_barang'],
                    },
                    barcode: {
                        value: '',
                        keys: ['barcode'],
                    },

                },

                kategori: [{
                        name: 'OBAT-OBATAN',
                        code: 'OBT'
                    },
                    {
                        name: 'BMHP',
                        code: 'BMHP'
                    },
                    {
                        name: 'BHP NON MEDIS',
                        code: 'BHP NON MEDIS'
                    },
                ],
                lokasi_arr: [],

                searchTerm: '',
                filters1: {},
                filters2: {},
                displayBasic: false,
                param_send: {
                    startdate: '',
                    enddate: '',
                    lokasi: '',
                    barcode: '',
                    data: '',
                    item_header: ''
                },
                url_print:''

            };
        },

        // beforeCreate()
        // {
        //     console.log("befrore created")

        // },
        created() {
            // console.log("testesin//g")
            // this.getdtaa(); 
            this.get_lokasi();
            this.initFilters1();
            this.initFilters2();
            var currentDate = new Date();
            this.param_send.startdate = currentDate;
            this.param_send.enddate = currentDate;
        },

        computed: {
            filterterdata: function () {
                if (this.searchTerm == "") {
                    return this.fact.response;
                } else {
                    return this.fact.response.filter((data) => {
                        return data.barcode.match(this.searchTerm);
                    });
                }

            }
        },
        methods: {

            searchItems(searchTerm) {
                //console.log(this.fact.response.filter(item => item.NAMA.includes(this.searchTerm)));

                return this.fact.response;

            },
            
            formatCurrency(value) {
                //return value;
                if (value !== undefined && value !== null) {
                    return value.toLocaleString('id-ID', {

                    });
                } else {
                    return 0;
                }

            },
            formatInterger(value) {
                if (value !== undefined && value !== null) {
                    return value.toLocaleString('id-ID', {

                    });
                } else {
                    return 0;
                }
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
            filterProducts: function (Parameter = '') {

                if (Parameter == 'parce') {
                    return this.fact.response;
                } else {
                    return this.fact.response.filter((data) => {
                        return data.barcode.match(Parameter);
                    });
                    // return data;
                }

            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ === 1);
                        this.isLoading = false
                        console.log(this.lokasi_arr);
                        // this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            summTotal(row) {
                let hasil = 0;;
                for (let i = 0; i < row.length; i++) {
                    hasil = parseFloat(hasil) + parseFloat(row[i].total_pembelian); 
                }
                this.penerimaan = hasil;
                return hasil;
            },
            openBasic(data) {
                this.displayBasic = true;
                console.log(data)
                this.param_send.barcode = data.barcode
                this.param_send.lokasi = this.lokasi_param['ID']
                this.param_send.item_header = data.nama_barang
                this.param_send.data = data
                this.card_stock = [];
                
            },
            async getriwayat_card_stock() {
                this.displayBasic = true;  

                this.isLoading = true
                await axios.post('/getriwayat_card_stock', this.param_send)
                    .then(response => {
                        this.card_stock = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            closeBasic() {
                this.displayBasic = false;
            },
            async getdtaa() {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.lokasiSelected = {
                    // id : this.lokasi_param[0]['ID'],  for multi select
                    id: this.lokasi_param['ID'],
                }
                let tgl = moment(String(this.param_send.startdate)).format('YYYY-MM-DD');
                this.url_print ='/cetak-format-opname?lokasi='
                +this.lokasi_param['ID']+'&kategori='+this.form.kategori_selected['name']+'&bulantahun='+tgl+'&lokasi_display='+this.lokasi_param['DISPLAY']

                console.log(this.lokasi_param)
                await axios.post('/persediaan_data', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response
                        this.summary = response.data.summary
                        console.log(response.data);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            }
        }

    }

</script>

<style>
    .p-multiselect {
        min-width: 15rem;
    }
    :deep(.p-datatable-frozen-tbody) {
        font-weight: bold;
    }

    :deep(.p-datatable-scrollable .p-frozen-column) {
        font-weight: bold;
    }
    :deep(.multiselect-custom) {
        .p-multiselect-label:not(.p-placeholder) {
            padding-top: .25rem;
            padding-bottom: .25rem;
        }

        .country-item-value {
            padding: .25rem .5rem;
            border-radius: 3px;
            display: inline-flex;
            margin-right: .5rem;
            background-color: var(--primary-color);
            color: var(--primary-color-text);

            img.flag {
                width: 17px;
            }
        }
    }

    tr {
        line-height: 25px;
        min-height: 25px;
        height: 25px;
    }

</style>
