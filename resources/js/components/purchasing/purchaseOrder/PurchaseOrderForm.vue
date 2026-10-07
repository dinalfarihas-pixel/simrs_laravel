<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Header" v-model:visible="tampilkanPR" :containerStyle="{width: '70vw'}" :modal="true">
                <div class="card elevation-0">
                    <div class="row">
                        <div class="col-md-5">
                            <Calendar v-model="form.bulantahun" class="text-sm" :showIcon="true" view="month"
                                dateFormat="mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 15em; " />
                            <Button label="Browse PR" align="" @click="getlist_pr()" icon="pi pi-plus"
                                class="p-button" />
                        </div>
                    </div>

                    <DataTable :value="fact" columnResizeMode="fit" selectionMode="single" v-model:filters="filters1"
                        stripedRows class="p-datatable-sm" showGridlines :resizableColumns="false" :loading="isLoading">
                        <template #header>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Global Search" />
                            </span>
                        </template>

                        <!-- <Column field="seqnumber" header="No" :styles="{'min-width':'4px'}" sortable> </Column> -->
                        <Column field="no_permintaan" header="No Permintaan" sortable>
                            <template #body='slotProps'>
                                <button type="button" @click="getdetails_pr(slotProps.data)"
                                    class="btn btn-block btn-success btn-xs"
                                    style="width: 6em;">{{slotProps.data.no_permintaan}}</button>
                            </template>
                        </Column>
                        <Column field="lokasi" header="Asal Permintaan" sortable>

                        </Column>
                        <Column field="tanggal" header="Tanggal" sortable></Column>
                        <Column field="kategori" header="Kategori" sortable></Column>

                    </DataTable>
                </div>


                <template #footer>
                    <Button label="Tutup" icon="pi pi-check" @click="tampilkanPR=false" autofocus />
                </template>
            </Dialog>


            <Dialog header="Header" v-model:visible="details_pr_form" :containerStyle="{width: '80vw'}" :modal="true">
                <div class="card elevation-0">

                    <timeline-purchasing :data_pr=form.no_permintaan></timeline-purchasing>

                    <DataTable :value="details_pr" columnResizeMode="fit" selectionMode="single" stripedRows
                        class="p-datatable-sm" showGridlines :resizableColumns="false" :loading="isLoading">
                        <template #header>

                        </template>

                        <!-- <Column field="seqnumber" header="No" :styles="{'min-width':'4px'}" sortable> </Column> -->
                        <Column field="no_permintaan" header="No Permintaan" sortable>

                        </Column>
                        <Column field="barcode" header="Barcode" sortable></Column>
                        <Column field="kategori" header="Kategori" sortable></Column>
                        <Column field="nama" header="Item" sortable></Column>
                        <Column field="satuan" header="Satuan" sortable></Column>
                        <Column field="qty_acc" header="Qty" sortable></Column>
                        <Column field="harga" header="Est Harga" sortable></Column>
                        <Column field="no_permintaan" header="Aksi" sortable>
                            <template #body='slotProps'>
                                <button type="button" @click="additem(slotProps.data)"
                                    class="btn btn-block btn-danger btn-sm" style="width: 8em;">+ Tambahkan</button>
                            </template>
                        </Column>
                    </DataTable>
                </div>


                <template #footer>
                    <Button label="Tutup" icon="pi pi-check" @click="details_pr_form=false" autofocus />
                </template>
            </Dialog>


            <div class="card elevation-0 bg-white">
                <div class="card-header">
                    <h3 class="card-title">Form pemesanan barang kesupplier</h3>
                </div>
                <div class="card-body">
                    <!-- <Button label="PO Baru" align="" @click="fetchData()" icon="pi pi-plus" class="p-button" /> -->
                    <div class="row">
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="form-group">
                                    <label for="caradatang">Kepada Supplier</label><br /> 
                                    <Select id="caradatang" v-model="form.supplier_selected" :options="data_supplier"
                                        optionLabel="NAMASUPLIER" :filter="true" placeholder="" style="width: 35em" />
                                </div>
                            </div>
                            <div class="input-group">
                                <div class="form-group">
                                  <label for="caradatang"> {{form.supplier_selected.KOTA}}</label><br />  
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="form-group">
                                    <label for="caradatang">Tanggal PO</label><br />
                                        <Calendar v-model="form.tanggal_po" class="text-sm" :showIcon="true" view="date"
                                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                    aria-placeholder="Tanggal awal" style="width: 15em; " />
                                </div>
                                <div class="form-group ml-2" >
                                    <label for="caradatang">Nomor SPK</label><br />
                                    <input class="form-control form-control" v-model="form.no_spk" type="text" placeholder="No referensi">
                                </div>
                            </div>
                     
                        </div>
                    </div>

                </div>
            </div>

            <div class="card elevation-0 bg-white pt-2">
                <div class="card-body">
                    <Button label="Browse PR" align="" @click="openBasic()" icon="pi pi-plus" class="p-button" />
                </div>
            </div>

            <div class="card elevation-0 bg-white pt-2">
                <div class="card-body">
                    <table class="table table-sm tb-sm table-bordered table-striped small-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NO</th>
                                <th>BARCODE</th>
                                <th>NAMA</th>
                                <th>ESTIMASI HARGA</th>
                                <th>QTY</th>
                                <th>SATUAN</th>
                                <th>SUBTOTAL</th>
                                <th>NO PERMINTAAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,index) in add_item_po ">
                                <td><Button label="" align="" @click="remove(index)" icon="pi pi-times"
                                    class="p-button-rounded  p-button-danger p-button-text" />
                                </td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.BARCODE }}</td>
                                <td>{{ data.NAMA }}</td>
                                <td> {{ $numeral(data.HARGA, '0,0.00') }}</td>
                                <td>
                                    {{ $numeral(data.QTY_TEMP, '0,0.00') }} /
                                    <InputNumber prefix=""
                                    :minFractionDigits="2" :maxFractionDigits="2" style="text-align: right; width: 8em;"
                                    @blur="check_data_qty_tidakbolehlebih_besar(data,index)"
                                    v-model="data.QTY" />
                                </td>
                                <td>{{ data.SATUAN }}</td>
                                <td> {{ $numeral(data.SUB_TOTAL, '0,0.00') }}</td>
                                <td><button type="button"  
                                    class="btn btn-block btn-primary btn-xs"
                                    style="width: 6em;">{{data.NO_PERMINTAAN}}</button>  
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>TOTAL</th>
                                <th>{{ $numeral(subtotal, '0,0.00') }}</th> 
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div> 
            <div class="card elevation-0 bg-white pt-1">
                <div class="card-body">
                    <Button label="Simpan PO" align="" @click="simpan_po()"  icon="pi pi-save" class="p-button p-button-danger" />
                </div>
            </div> 
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
        import {
        FilterMatchMode
    } from 'primevue/api';
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
                details_pr: [],
                details_pr_form: false,
                subtotal:0,
                form: {
                    bulantahun: '',
                    tanggal_po:'',
                    enddate: '',
                    supplier_selected: '',
                    mode: 4,
                    no_permintaan: '',
                    no_spk:'',
                    details_po:[]
                },
                isLoading: false,
                fullPage: true,
                tampilkanPR: false,
                filters1: {},
                data_supplier: [],
                add_item_po: [],
                temp_qty:[]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.bulantahun = currentDate;
            this.form.tanggal_po = currentDate;
            //console.log(bulantahun);
        },
        created() {
            //this.fetchData();
            this.get_data_supplier();
            this.initFilters1();
        },
        methods: {
            fetchData() {

            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            check_data_qty_tidakbolehlebih_besar(data)
            {
                //this.temp_qty = data.QTY  
                
                if(data.QTY > data.QTY_TEMP)
                {
                    data.QTY = data.QTY_TEMP
                    this.open('warning','Quantitas tidak boleh lebih besar dari permintaan')
                } 

                this.counting()
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 4000,
                    dismissible: true
                })
            },
            async get_data_supplier() {
                this.isLoading = true;
                await axios.post('/get_data_supplier', "")
                    .then(response => {
                        this.data_supplier = response.data.response
                        this.isLoading = false 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openBasic() {
                this.tampilkanPR = true;
            },
            async getlist_pr() {

                this.isLoading = true;
                this.form.mode = 5
                await axios.post('/getlist_pr', this.form)
                    .then(response => {
                        this.fact = response.data.response.header
                        this.isLoading = false
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdetails_pr(data) {
                this.details_pr = []
                this.details_pr_form = true; 
                this.form.mode = 1
                this.form.no_permintaan = data.no_permintaan
                await axios.post('/getlist_pr', this.form)
                    .then(response => { 
                        this.details_pr = response.data.response.details   
                    })
                    .catch(error => {
                        console.log(error)

                    })
                    .finally(() => this.isLoading = false)
            }, 
            counting()
            {
                this.subtotal = 0;
                for(let i = 0; i<this.add_item_po.length; i++)
                {
                    this.add_item_po[i].SUB_TOTAL = this.add_item_po[i].QTY *this.add_item_po[i].HARGA
                    this.subtotal = this.subtotal + this.add_item_po[i].SUB_TOTAL;
                }
            },
            async additem(data) {
                this.add_item_po.push({
                    BARCODE: data.barcode,
                    NAMA: data.nama,
                    HARGA: data.harga,
                    QTY: data.qty_acc,
                    QTY_TEMP:data.qty_acc,
                    SATUAN: data.satuan,
                    SUB_TOTAL: data.harga * data.qty_acc,
                    NO_PERMINTAAN: data.no_permintaan
                }); 
                this.counting();
                this.open('success', data.nama + ' telah ditambahkan')
            },
            remove(index)
            {
                this.add_item_po.splice(index, 1)
                this.counting();
            },
            async simpan_po()
            {
                this.form.details_po = this.add_item_po; 
                await axios.post('/simpan_po', this.form)
                    .then(response => {
                        console.log(response.data);  
                    })
                    .catch(error => {
                        console.log(error)

                    })
                    .finally(() => this.isLoading = false)
            },  
            
        },
    }

</script>
