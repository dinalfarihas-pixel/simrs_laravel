<template>
    <section class="content">
        <Dialog header="Pengaturan" v-model:visible="displayModal" :containerStyle="{width: '20vw'}" :modal="true">
            <div class="row">
                <div class="col-3">

                </div>
            </div>
            <div class="field col-6 md:col-6">
                <label for="withoutgrouping">Filter Persediaan</label>
                <Select v-model="form.filter_qty" style="width: 12em;" class="mr-2" :options="setting_list"
                    optionLabel="name" placeholder="SEMUA" />
            </div>
            <br />
            <div class="field col-6 md:col-6">
                <label for="withoutgrouping">Limit</label>
                <InputNumber id="withoutgrouping" v-model="form.limitation" mode="decimal" :useGrouping="false" />
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="getdata()" autofocus />
            </template>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Dialog>



        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Laporan pemakaian obat perbulan untuk pasien</h3>
                </div>
                <div class="card-body">
                    <Toolbar class="mb-0">
                        <template #start>
                            <Calendar v-model="form.startdate" class="text-sm mr-1" :showIcon="true" view="year"
                                dateFormat="yy" :yearNavigator="true" aria-placeholder="pilih tahun"
                                style="width: 13em; " />
                            <Button label="Tampilkan" align="" @click="getdata()" icon="pi pi-check" class="p-button" />

                        </template>

                        <template #end>

                            <Select v-model="form.kategori_barang" style="width: 12em;" class="mr-2"
                                :options="kategori_barang" optionLabel="name" placeholder="Kategori" />

                            <Select v-model="form.lokasi" style="width: 12em;" class="mr-2" :options="lokasi_arr"
                                optionLabel="CAPION" :filter="true" placeholder="Pilih lokasi" :showClear="false">
                                <template #value="slotProps">
                                    <div class="p-dropdown-car-value" v-if="slotProps.value">
                                        <span>{{slotProps.value.CAPION}}</span>
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="p-dropdown-car-option">
                                        <span>{{slotProps.option.CAPION}}</span>
                                    </div>
                                </template>
                            </Select>
                            <Button label="Reload" @click="getdata()" style="height: 2.5em;" icon="pi pi-refresh"
                                class="p-button-help mr-2" />
                            <Button label="" @click="openModal()" style="height: 2.5em;" icon="pi pi-sliders-h"
                                class="p-button" />
                        </template>
                    </Toolbar>
                </div>
            </div> 
           
            <div class="card">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="card-body p-12">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        TOTAL ITEM <span class="float-right badge bg-info"><h5 class="float-right">{{recap.total_item}}</h5></span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        ITEM TERSEDIA <span class="float-right badge bg-success"><h5 class="float-right">{{ recap.item_tersedia}}</h5></span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link">
                                        ITEM TIDAK TERSEDIA <span class="float-right badge bg-danger"> <h5  class="float-right">{{recap.item_tidaktersedia}}</h5></span>
                                    </a>
                                </li>
                             
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <Button @click="exportData(fact)" icon="pi pi-file-excel" label="Export-excel" style="height: 1.2em; background-color: green;"  class="p-button-raised p-button-sm p-button-rounded"/>
                    <!-- <export-excel class="p-button" style="height: 1.5em; background-color: green;" :data="fact"
                        :fields="json_fields" worksheet="My Worksheet" name="DATA PENGGUNAAN OBAT.xls">
                        Download Excel
                    </export-excel> -->
                    <div class="card-tools">
                        <div class="input-group input-group-sm" style="width: 300px;">
                            <input type="text" name="table_search" v-model="filters.nama_barang.value"
                                class="form-control float-left" placeholder="Search">
                            <div class="input-group-append">
                                <button class="btn  btn-default">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body table-sm  table-responsive p-10" style="height: 700px;">

                    <table class="table table-bordered table-striped dataTable dtr-inline">
                        <thead>

                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="table_search" v-model="filters.stock_akhir.value"
                                            class="form-control float-left" placeholder="Search">
                                        <div class="input-group-append">
                                            <button class="btn  btn-default">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                            </tr>


                            <tr>
                                <th>NO</th>
                                <th>BARCODE</th>
                                <th>NAMA</th>
                                <th>SATUAN</th>
                                <th>HARGA</th>
                                <th>JAN</th>
                                <th>FEB</th>
                                <th>MAR</th>
                                <th>APR</th>
                                <th>MEI</th>
                                <th>JUN</th>
                                <th>JUL</th>
                                <th>AGT</th>
                                <th>SEP</th>
                                <th>OKT</th>
                                <th>NOV</th>
                                <th>DES</th>
                                <th>TOTAL</th>
                                <th>RATA2</th>
                                <th>STOCK AKHIR</th>
                                <th>ESTIMASI [BULAN] </th>
                                <th>EXP[Bulan] </th>
                            </tr>


                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in fact">
                                <td>{{ index + 1}}</td>
                                <td>{{ row.barcode }}</td>
                                <td>{{ row.nama_barang }}</td>
                                <td style="text-align: right;">{{ row.satuan }}</td>
                                <td style="text-align: right;">{{ $numeral(row.harga, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.jan, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.feb, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.mar, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.apr, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.mei, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.jun, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.jul, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.agt, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.sep, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.okt, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.nov, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.des, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.total, '0,0.00') }}</td>
                                <td style="text-align: right;">{{ $numeral(row.avg, '0,0.00') }}</td>
                                <td style="text-align: right;">
                                    <h5><span :class="[row.stock_akhir<=0 ? 'badge bg-danger':'badge bg-success']">
                                            {{ $numeral(row.stock_akhir, '0,0.00') }}</span> </h5>
                                </td>
                                <td>{{ row.estimasi_stock }}</td>
                                <td>{{ row.exp }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </table>

                </div>
            </div>


        </div>
    </section>
</template>
<script>
    import Loading from 'vue-loading-overlay';
    import InputNumber from 'primevue/inputnumber';
    import exportFromJSON from "export-from-json"; 
    export default {
        components: {
            Loading,
            InputNumber
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                recap:{
                    total_item:0,
                    item_tidaktersedia:0,
                    item_tersedia:0
                },
                lokasi_arr: [],
                selectedlokasi: null,
                selectedSetting: null,

                selectedKategori: null,
                displayModal: false,
                json_fields: {
                    'BARCODE': 'barcode',
                    'NAMA BARANG': 'nama_barang',
                    'SATUAN': 'satuan',
                    'HARGA': 'harga',
                    'JAN': 'jan',
                    'FEB': 'feb',
                    'MAR': 'mar',
                    'APR': 'apr',
                    'MEI': 'mei',
                    'JUN': 'jun',
                    'JUL': 'jul',
                    'AGU': 'agu',
                    'SEP': 'sep',
                    'OKT': 'okt',
                    'NOV': 'nov',
                    'DES': 'des',
                    'TOTAL': 'total',
                    'AVG': 'avg',
                    'STOCK AKHIR': 'stock_akhir',
                    'EST[BULAN]': 'estimasi_stock',
                    'EXP[Bulan]': 'exp'
                },
                lokasi: [{
                        name: 'Australia',
                        code: 'AU'
                    },
                    {
                        name: 'Brazil',
                        code: 'BR'
                    },
                    {
                        name: 'China',
                        code: 'CN'
                    },
                ],
                filters: {
                    nama_barang: {
                        value: '',
                        keys: ['nama_barang'],
                    },
                    stock_akhir: {
                        value: '',
                        keys: ['stock_akhir'],
                    },
                },

                filters1: {},
                is_aktif: true,
                currentPage: 1,
                totalPages: 5,
                form: {
                    startdate: '',
                    enddate: '',
                    supplier: '',
                    kategori_barang: '',
                    lokasi: '',
                    filter_qty: '',
                    limitation: 0
                },
                listsupplier: [{
                    value: 'ALL',
                    name: '0'
                }, ],
                displayModal: false,
                isLoading: false,
                fullPage: true,
                setting_stock_tidak_samadengan_nol: 0,
                kategori_barang: [{
                        name: 'OBAT-OBATAN'
                    },
                    {
                        name: 'BMHP'
                    }
                ],
                setting_list: [{
                        name: 'SEMUA',
                        code: '1'
                    },
                    {
                        name: 'PERSEEDIAAN > 0',
                        code: '2'
                    },
                    {
                        name: 'PERSEEDIAAN <= 0',
                        code: '3'
                    },
                ]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.limitation = 0;
            this.form.filter_qty = {
                name: 'SEMUA',
                code: '1'
            };
            this.get_lokasi();
            //this.getdata();


        },
       
        methods: {
            exportData(data) { 
                const fileName = "laporan_pemakaian_obat";
                const exportType = exportFromJSON.types["xls"];
                exportFromJSON({ data, fileName, exportType });
            }, 

            nameLength(row) {
                return row.avg;
            },
            openModal() {
                this.displayModal = true;
                console.log(this.form);
            },
            closeModal() {
                this.displayModal = false;
            },
            check_var_lokasi() {

            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.isLoading = false
                        console.log(this.lokasi_arr);
                        // this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata() {
                this.closeModal();
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/getdatapemakaianobat', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                        this.recap = response.data.recap
                        console.log(this.fact);

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },


        }
    }

</script>

<style>
    .vt-sort:before {
        font-family: FontAwesome;
        padding-right: 0.5em;
        width: 1.28571429em;
        display: inline-block;
        text-align: center;
    }

    .vt-sortable:before {
        content: "\f0dc";
    }

    .vt-asc:before {
        content: "\f160";
    }

    .vt-desc:before {
        content: "\f161";
    }

</style>
