<template>
    <section class="content">
        <div class="container-fluid">

            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Header" v-model:visible="displayConfirmation" :containerStyle="{width: '70vw'}" :modal="true">
                <span class="p-input-icon-left mb-5">

                    <input type="text" class="form-control" v-model="form.itembarang" ref="inputBox"
                        @input="getdataobat(10)" placeholder="Search" />
                </span>
                <Button label="" class="mb-5" :loading="isLoading" icon="pi pi-search" @click="getdataobat(10)" />
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">

                        </h3>
                    </div>
                    <div class="card-body">

                        <DataTable :value="fact" selectionMode="single" stripedRows class="p-datatable-sm" showGridlines
                            responsiveLayout="scroll">
                            <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column>
                            <Column field="BARCODE" header="BARCODE" sortable></Column>
                            <Column field="GROUPING" header="GROUPING" sortable></Column>
                            <Column field="NAMA" header="NAMA" sortable></Column>
                            <Column field="HARGABELI" header="HARGABELI" sortable></Column>
                            <Column field="QUNATITY" header="PERSEDIAAN" sortable></Column>
                            <Column field="" header="AKSI"
                                :styles="{'min-width':'250px','text-align':'right','white-space':'nowrap'}">
                                <template #body="slotProps">
                                    <Button label="" class="btn p-btn-sm" @click="additem_barang(slotProps.data)"
                                        icon="pi pi-plus" /> <br />
                                </template>
                            </Column>
                        </DataTable>
                        <!-- <table class="table table-sm table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>SUB_BARCODE</th>
                                    <th>BARCODE</th>
                                    <th>GROUPING</th>
                                    <th>NAMA</th>
                                    <th>HARGA</th>
                                    <th>PERSEDIAAN</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in fact">
                                    <td>{{ k+1 }}</td>
                                    <td>{{row.SUB_BARCODE}}</td>
                                    <td>{{row.BARCODE}}</td>
                                    <td>{{row.GROUPING }}</td>
                                    <td>{{row.NAMA }}</td>
                                    <td>{{row.HARGAJUAL}}</td>
                                    <td>{{row.QUNATITY}}</td>
                                    <td> <Button label="" class="btn p-btn-sm" @click="additem_barang(row)"
                                            icon="pi pi-plus" /></td>
                                </tr>
                            </tbody>
                        </table> -->
                    </div>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" autofocus />
                </template>
            </Dialog> 

            <div class="card card-primary">
                <div class="card-body">
                    <div class="row mt-2">
                        <div class="col-sm-10">
                            <Fieldset legend="Header" :toggleable="true">
                                <Toolbar class="mb-0">
                                    <template #start>
                                        <p for="kategori">Kategori</p>
                                        <Select class="ml-3" id="kategori" v-model="form.kategoriselected"
                                            :options="kategori_pr" style="width: 15em;" optionLabel="kategori"
                                            placeholder="Kategori telaah" />

                                    </template>
                                    <template #end>
                                        <p class="mr-2" style="color: grey;">Tanggal# </p>
                                        <Calendar v-model="form.tglpermintaan" class="text-sm mr-1" :showIcon="true"
                                            view="date" dateFormat="dd/mm/yy" :yearNavigator="true"
                                            yearRange="2000:2030" aria-placeholder="Tanggal awal"
                                            style="width: 13em;   " />
                                    </template>
                                </Toolbar>
                                <Toolbar class="mt-2">
                                    <template #start>
                                        <p for="kategori"> Kepada</p>
                                        <MultiSelect class="ml-4" v-model="form.lokasiSelected" :filter="true"
                                            :options="lokasi" optionLabel="CAPION" placeholder="Pilih lokasi"
                                            display="chip" />
                                    </template>
                                </Toolbar>

                                <Toolbar class="mt-2">
                                    <template #start>
                                        <p for="deskripsi"> Deskripsi</p>
                                        <InputText class="ml-3" id="deskripsi" style="width: 15em;" type="text"
                                            v-model="form.deskripsi_telaah" />
                                    </template>
                                </Toolbar>
                            </Fieldset>

                            <!-- <vue-document-editor  v-model:content="form.catatan" 
                                :zoom="zoom"
                                :page_format_mm="page_format_mm"
                                :page_margins="page_margins"
                                :display="display"
                                /> -->
                            <Editor class="mt-2" v-model="form.catatan" editorStyle="height: 300px" />

                        </div>
                    </div>
                </div>

            </div>

            <div class="card  ">
                <div class="card-header">
                    <h3 class="card-title">

                    </h3>
                </div>
                <div class="card-body"> 
                    <div class="row mt-3">
                        <div class="col-sm-9">
                            <Toolbar class="mb-0">
                                <template #start>
                                    <Button label="Pilih barang" class="p-button-text" icon="pi pi-search"
                                        @click="openConfirmation" />
                                </template>
                                <template #end>

                                </template>
                            </Toolbar>
                            <table class="table table-sm tb-sm table-bordered table-striped small-table">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>BARCODE</th>
                                        <th>NAMA</th>
                                        <th>ESTIMASI HARGA</th>
                                        <th>QTY</th>
                                        <th>SATUAN</th>
                                        <th>SUBTOTAL</th>
                                        <th>AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(selected,index) in form.itemselected" :key="index">

                                        <td>{{ index+1 }}</td>

                                        <td> {{selected.BARCODE}}</td>
                                        <td>
                                            {{selected.NAMA}}
                                            <br />

                                            <small> Harga : {{selected.HARGA}}- Persediaan :
                                                {{selected.PERSEDIAAN}}</small>
                                        </td>
                                        <td>
                                            <InputNumber id="minmax" v-model="form.estimasi_harga[index]"
                                                autocomplete="off" @input="inputestimasi_harga(index)"
                                                :minFractionDigits="2" mode="decimal" :min="0" />
                                        </td>

                                        <td>
                                            <InputNumber id="minmax" v-model="form.qty_selected[index]"
                                                autocomplete="off" @input="inputqtyobat(index)" :minFractionDigits="2"
                                                mode="decimal" :min="0" :max="10000" />
                                        </td>
                                        <td>{{selected.SATUAN}}</td>
                                        <td>
                                            <InputNumber id="minmax" v-model="selected.TOTALAMOUNT" autocomplete="off"
                                                :minFractionDigits="2" mode="decimal" :min="0" disabled />
                                        </td>

                                        <td><Button icon="pi pi-times" @click="confirm3(index,selected.NAMA)"
                                                class="p-button-rounded p-button-danger p-button-text" /></td>
                                    </tr>
                                </tbody>

                            </table>
                            <div class="row">
                                <!-- accepted payments column -->
                                <div class="col-6">

                                </div>
                                <!-- /.col -->
                                <div class="col-6">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                            <tr>
                                                <th style="width:50%">Subtotal:</th>
                                                <td> <strong> {{ $numeral(totalamount, '0,0.00') }}</strong> </td>
                                            </tr>
                                            <tr>
                                                <th>Tax(11%)</th>
                                                <td>$10.34</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>$265.24</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <div class="card-footer">
                                <Button label="Simpan" icon="pi pi-check" @click="simpan_purchase_req()" autofocus />
                                <Button label="Balat" class="p-button-warning" icon="pi pi-times" autofocus />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import InputNumber from 'primevue/inputnumber';
    import Textarea from 'primevue/textarea';
    import Dropdown from 'primevue/dropdown';
    import Editor from 'primevue/editor';
        import QrcodeVue from 'qrcode.vue';
    import Fieldset from 'primevue/fieldset';

    export default {
        components: {
            Loading,
            InputNumber,
            Textarea,
            Dropdown,
            Editor,
            QrcodeVue,
            Fieldset
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    enddate: '',
                    mode: 10,
                    catatan: '',
                    itemselected: [],
                    qty_selected: [],
                    estimasi_harga: [],
                    tglpermintaan: '',
                    kategoriselected: '',
                    deskripsi_telaah: '',
                    lokasiSelected: [], 
                },
                isLoading: false,
                fullPage: true,
                displayConfirmation: false,
                filters1: {},

                totalamount: 0,
                SelectButton: '',
                lokasi: [],
                kategori_pr: [],
                zoom: 1.1,
                zoom_min: 0.10,
                zoom_max: 5.0,
                page_format_mm: [250, 50],
                page_margins: "10mm 15mm",
                display: "grid", // ["grid", "vertical", "horizontal"]
                mounted: false, // will be true after this component is mounted
                undo_count: -1, // contains the number of times user can undo (= current position in content_history)
                content_history: [] // contains the content states for undo/redo operations
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.tglpermintaan = currentDate;
        },
        computed: {

        },
        created() {
            //this.fetchData();
            this.getlokasi();
            this.getkategori();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
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
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            async getdataobat(mode) {
                if (mode == 10) {
                    if (this.form.itembarang == "") {
                        this.fact = []
                        return;
                    }
                    if (this.form.itembarang.length < 3) {
                        return;
                    }
                }
                this.isLoading = true;
                this.form.mode = mode
                await axios.post('/getbarang', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getlokasi() {
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getkategori() {

                this.isLoading = true;
                await axios.post('/getkategori_pr', "")
                    .then(response => {

                        this.kategori_pr = response.data.response

                        console.log(this.kategori_pr);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async simpan_purchase_req() {
                // if (this.form.itemselected.length == 0) {
                //     this.open("warning", "Item barang belum dipilih")
                //     return
                // }
                this.isLoading = true;
                this.form.mode = 0

                await axios.post('/save_pr', this.form)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Permintaan pengadaan telah tersimpan")
                            this.cleardata();
                        } else {
                            this.open("success", "Permintaan pengadaan telah tersimpan")
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            cleardata() {
                this.form.itemselected = [];
                this.counting();
            },
            openConfirmation() {
                this.displayConfirmation = true;
            },
            closeConfirmation() {
                this.displayConfirmation = false;
            },
            additem_barang(barang) {


                var currentDate = new Date();
                this.form.itemselected.push({
                    BARCODE: barang.BARCODE,
                    ID_BARANG: barang.BARCODE,
                    NAMA: barang.NAMA,
                    SATUAN: barang.SATUAN,
                    RECEIPT_NO: '',
                    HARGA: barang.HARGABELI,
                    POTONGSTOCK: barang.POTONGSTOCK,
                    TOTAL_ITEM: 0,
                    QTY_RACIK: barang.QTY_RACIK,
                    PERSEDIAAN: barang.QUNATITY,
                    SATUAN_RACIK: barang.SATUAN_RACIK,
                    MEREK: barang.SATUAN,
                    TOTALAMOUNT: 0,
                    DISCOUNT: 0,
                    ITEMSEQNO: '',
                    SUBITEMSEQNO: 0,
                    QTY: 0,
                    DOSIS: '',
                    STATUS_PROGRESS: "C",
                    SUB_BARCODE: barang.SUB_BARCODE,
                    OBAT_OBATAN: 1,
                    AS_PARENT: 0,
                    SAT_RACIK: '',
                    STATUS: "NEWLINE",
                    KATEGORI: barang.KATEGORI,
                    JENIS: barang.JENIS,
                    JENIS_RESEP: "",
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    ID: 0
                });

                let index = this.form.itemselected.length;
                this.form.estimasi_harga.push(barang.HARGABELI);

            },
            counting() {
                let amount = 0;
                for (let i = 0; i < this.form.itemselected.length; i++) {
                    amount = amount + this.form.itemselected[i].TOTALAMOUNT;
                }
                this.totalamount = amount;
            },
            inputqtyobat(index) {
                if (this.form.qty_selected[index] == "" || this.form.qty_selected[index] == null) {
                    this.form.qty_selected[index] = 0;
                }
                this.form.itemselected[index].QTY = this.form.qty_selected[index];
                this.form.itemselected[index].TOTALAMOUNT = this.form.itemselected[index].QTY * this.form.itemselected[
                    index].HARGA;

                this.counting();
            },
            inputestimasi_harga(index) {
                if (this.form.estimasi_harga[index] == "" || this.form.estimasi_harga[index] == null) {
                    this.form.estimasi_harga[index] = 0;
                }
                this.form.itemselected[index].HARGA = this.form.estimasi_harga[index];
                this.form.itemselected[index].TOTALAMOUNT = this.form.itemselected[index].QTY * this.form.itemselected[
                    index].HARGA;
                this.counting();
            },
            confirm3(index, namaobat) {
                this.hapusitem_barang(index);
            },
            hapusitem_barang(index) {
                this.form.itemselected.splice(index, 1);
                this.form.qty_selected.splice(index, 1);
                this.form.estimasi_harga.splice(index, 1);
                this.counting();
            },
        },
    }

</script>

<style>
    .p-multiselect {
        min-width: 15rem;
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

</style>
<style>
    .ql-align-center {
        text-align: center;
    }

</style>
