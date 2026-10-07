<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 20em; " /> 
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div> -->

            <!-- <div class="row">
                <div class="col-12 col-sm-6 col-md-6 mx-auto text-center">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">Item kebutuhan</h3>
                        </div>
                        <div class="card-body"> 
                            <Timeline :value="events2" layout="horizontal" align="top">
                                <template #content="slotProps">
                                    {{slotProps.item}}
                                </template>
                            </Timeline>
                        </div>
                    </div>
                </div>
            </div> --> 
            <Sidebar v-model:visible="displayQtyModal" style="height: 30%;" :baseZIndex="2000" position="bottom">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-6 mx-auto text-center">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Input Quantity untuk <strong> {{ item_barang }}</strong></h3>
                            </div>
                            <div class="card-body">
                                <InputNumber class="mr-2" id="locale-user" autofocus v-model="temp_qty"
                                    :useGrouping="false" />
                                <Button label="Tambah" icon="pi pi-plus" @click="simpan_details()" />
                            </div>
                        </div>

                    </div>
                </div>
            </Sidebar>

            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Item kebutuhan</h3>
                </div>
                <div class="card-body">
                    <Select v-model="form.lokasi" style="width: 17em;" class="mr-2" :options="lokasi_arr"
                        optionLabel="CAPION" @change="getdata()" :filter="true" placeholder="Tujuan Permintaan"
                        :showClear="false">
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
                </div>
            </div>
            <ConfirmDialog></ConfirmDialog>
            <div class="row">
                <div class="col-12 col-sm-9 col-md-7">
                    <div class="card card-warning card-outline">
                        <div class="card-header">
                            <h3 class="card-title">Daftar barang yang tersedia</h3>
                        </div>

                        <div class="card-body table-sm  table-responsive p-10" style="height: 700px;">
                            <table class="table table-bordered table-striped  dataTable dtr-inline">
                                <thead>
                                    <tr>
                                        <th>BARCODE</th>
                                        <th>GROUPING</th>
                                        <th>NAMA</th>
                                        <th>HARGA</th>
                                        <th>SATUAN </th>
                                        <th>SIMPAN </th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" autocomplete="false" name="table_search"
                                                    v-model="filters.grouping.value" class="form-control float-left"
                                                    placeholder="Nama">
                                            </div>
                                        </th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" autocomplete="false" name="table_search"
                                                    v-model="filters.nama_barang.value" class="form-control float-left"
                                                    placeholder="Nama">
                                            </div>
                                        </th>
                                        <th></th>
                                        <th></th>

                                        <th></th>

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(row,i) in fact">
                                        <td>{{ row.IDBARANG }} </td>
                                        <td><strong> {{ row.GROUPING }} </strong> </td>
                                        <td><strong> {{ row.NAMA }}</strong></td>
                                        <td>{{ row.HARGABELI }}</td> 
                                        <td>{{ row.SATUAN }}</td>
                                        <td> <Button label="" align="" @click="openmodal_qty(row)" icon="pi pi-plus"
                                                class="p-button p-button-save" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-5">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">Daftar barang yang telah dipilih</h3>
                        </div>
                        <div class="card-body table-sm  table-responsive p-10" style="height: 700px;">
                            <table class="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">
                                            ID
                                        </th>
                                        <th style="width: 30%">
                                            BARCODE
                                        </th>
                                        <th style="width: 10%">
                                            Qty
                                        </th> 
                                        <th>
                                            Status
                                        </th>
                                        <th> 
                                        </th> 
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(data,i) in data_perencanaan">
                                        <td>{{ i+1}}</td>
                                        <td>{{ data.IDBARANG }} <br />
                                            <!-- <small>{{ data.NAMA }}</small> -->
                                            <strong>{{ data.NAMA }}</strong>
                                        </td>
                                        <td> <strong> {{ data.QTYPLAN }} </strong></td>
                                        <td>
                                            <div class="progress-group">
                                                Progress
                                                <span class="float-right"><b>0</b>/{{ data.QTYPLAN }}</span>
                                                <div class="progress progress-sm">
                                                    <div class="progress-bar bg-warning" style="width: 100%"></div>
                                                </div>
                                            </div>
                                        </td> 
                                        <td>
                                            <div class="text-center">
                                                <Button label="" align=""  @click="confirm2(data)" icon="pi pi-times"
                                                    class="p-button  p-button-danger p-button-text" />
                                            </div>
                                        </td> 
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Timeline from 'primevue/timeline';
    import Sidebar from 'primevue/sidebar'; 
    import ConfirmDialog from 'primevue/confirmdialog';
    export default {
        components: {
            Loading,
            Timeline,
            Sidebar, 
            ConfirmDialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                lokasi_arr: [],
                item_barang: '',
                temp_qty: 0,
                row_temp: '',
                data_perencanaan: [],
                events2: [
                    "Terbit 2023-01-10", "ACC 2023-01-10"
                ],
                form: {
                    enddate: '',
                    QTY: [] 
                }, 
                displayQtyModal: false,
                detail: {
                    plan_id: '',
                    barcode: '',
                    qty: 0,
                    harga: 0
                },
                isLoading: false,
                fullPage: true,
                filters: {
                    nama_barang: {
                        value: '',
                        keys: ['NAMA'],
                    },
                    grouping: {
                        value: '',
                        keys: ['GROUPING'],
                    },
                },
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate; 
        },
        created() {
            //this.fetchData();
            this.get_lokasi();
            this.getdata_perencanaan();

        },
        methods: {
            fetchData() {
                var currentDate = new Date(); 
            },
            confirm2(row) {
                this.$confirm.require({
                    message: 'Yakin akan menghapus '+ row.NAMA +' ?',
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        this.hapus_item_perencanaan(row);
                    },
                    reject: () => {
            
                    }
                });
            },
           async hapus_item_perencanaan(row){
            
                let uri = window.location.search.substring(1);
                let params = new URLSearchParams(uri);
                // console.log(params.get("data"));
                this.detail.plan_id = params.get("data");
                this.detail.barcode = row.IDBARANG; 

                this.isLoading = true;

                await axios.post('/hapus_item_perencanaan', this.detail)
                    .then(response => {
                        
                        this.isLoading = false 
                        this.getdata_perencanaan();

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openmodal_qty(row) {
                this.temp_qty = 0;
                this.row_temp = row;
                this.displayQtyModal = true;
                this.item_barang = row.NAMA;
                console.log(row);
            },
            getqty: function (i) {
                console.log(form.QTY[i]);
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },
            async removeItem()
            {

            },
            async simpan_details() {
                if (this.temp_qty == null || this.temp_qty == 0) {
                    this.open("warning", 'untuk ' + this.row_temp.NAMA + ' silahkah isi jumlah permintaan')
                    return;
                }

                this.detail = {};
                let uri = window.location.search.substring(1);
                let params = new URLSearchParams(uri);
                // console.log(params.get("data"));
                this.detail.plan_id = params.get("data");
                this.detail.barcode = this.row_temp.IDBARANG;
                this.detail.qty = this.temp_qty;
                this.detail.harga = this.row_temp.HARGABELI;

                this.displayQtyModal = false;
                //this.isLoading = true;
                await axios.post('/simpan_detail_perencanaan', this.detail)
                    .then(response => {
                        // this.isLoading = false
                        if (response.data.metadata.code = "200") {
                            this.open("info", this.row_temp.NAMA + ' Data berhasil tersimpan')
                            this.getdata_perencanaan();

                        } else {
                            this.open("warning", this.row_temp.NAMA + ' gagal tersimpan')
                        }
                    })
                    .catch(error => {
                        console.log(error) 
                    })
                    .finally(() => this.isLoading = false)
 
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/get_masterbarang_untukperencanaan', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                        console.log(this.fact);

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_perencanaan() {
                this.isLoading = true;
                await axios.post('/get_masterbarang_perencanaan', this.form)
                    .then(response => {
                        this.data_perencanaan = response.data.response
                        this.isLoading = false
                        console.log(this.data_perencanaan);

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ=="1");
                        this.isLoading = false
                        // this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>
