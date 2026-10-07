<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> -->


            <ConfirmDialog></ConfirmDialog>
            <Dialog header="Header" v-model:visible="form_kco" :containerStyle="{width: '70vw'}" :modal="false">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">

                        </h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm tb-sm table-bordered table-striped small-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>#</th>
                                    <th>BACODE</th>
                                    <th>NAMA OBAT</th>
                                    <th>JENIS</th>
                                    <th v-for="(tgl,index) in data_kco.header">{{tgl.datacaption}}</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in data_kco.itembarang" :key="index">
                                    <td> <Button label="" icon="pi pi-plus" @click="add_copy_item(data)"
                                            class="p-button p-button-sm p-btn-sm p-button-warning" /></td>
                                    <td>
                                        {{index+1}}
                                    </td>
                                    <td>
                                        {{data.BARCODE}}
                                    </td>
                                    <td>
                                        {{data.NAMABARANG}}
                                    </td>
                                    <td>
                                        {{data.SATUAN}}
                                    </td>
                                    <td v-for="(tgl,index) in data_kco.header">
                                        <span v-for="(item,sub_item) in data_kco.sub_item">
                                            <span v-if="data.BARCODE==item.BARCODE && tgl.tgl==item.DT_ONLY">
                                                {{item.QTY}}
                                            </span>
                                        </span>
                                    </td>
                                    <td><strong>{{data.TOTAL}}</strong> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="form_kco=false" class="p-button-text" />
                    <Button label="Copy Semua" icon="pi pi-plus" @click="add_copy_all()" class="p-button-warning"
                        autofocus />
                </template>
            </Dialog>
            <Dialog :header="param.RECEIPT_NO" v-model:visible="details_confirmation" :containerStyle="{width: '70vw'}"
                :modal="false">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">

                        </h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>SUB_BARCODE</th>
                                    <th>BARCODE</th>
                                    <th>NAMA BARANG</th>
                                    <th>QTY</th>
                                    <th>SATUAN</th>
                                    <th>HARGA</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(row,k) in detils_obat">
                                    <td>{{ k+1 }}</td>
                                    <td>{{row.SUB_BARCODE}}</td>
                                    <td>{{row.BARCODE}}</td>
                                    <td>{{row.NAMABARANG }}</td>
                                    <td>{{row.QTY}}</td>
                                    <td>{{row.SATUAN }}</td>
                                    <td>{{row.HARGA}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template #footer>
                    <Toolbar class="mb-0">
                        <template #start>
                            <Checkbox id="city3" name="city" class="mr-2" :binary="true" @change="handleCheckboxChange"
                                v-model="param.UpdateisObatPulang" />
                            <label for="city3"> Merupakan Obat pulang</label>
                        </template>
                        <template #end>
                            <Button label="No" icon="pi pi-times" @click="details_confirmation=false"
                                class="p-button-text" />
                        </template>
                    </Toolbar>
                    <!-- <Button label="Kirim Permintaan" icon="pi pi-send" @click="kirim_resep(param.RECEIPT_NO)"
                        autofocus /> -->

                </template>
            </Dialog>
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
                        <table class="table table-sm table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>BARCODE</th>
                                    <th>GROUPING</th>
                                    <th>NAMA</th>
                                    <th>PERSEDIAAN</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in fact">
                                    <td>{{ k+1 }}</td>
                                    <!-- <td>{{row.SUB_BARCODE}}</td> -->
                                    <td>{{row.BARCODE}}</td>
                                    <td>{{row.GROUPING }}</td>
                                    <td>{{row.NAMA }}</td>
                                    <!-- <td>{{row.HARGAJUAL}}</td> -->
                                    <td>{{row.QUNATITY}}</td>
                                    <td> <Button label="" class="btn p-btn-sm" @click="additem_barang(row)"
                                            icon="pi pi-plus" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" autofocus />
                </template>
            </Dialog>

            <div class="row">
                <div class="col-sm-3">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">
                                <h5>Riwayat</h5>
                            </h3>
                        </div>
                        <div class="card-body" style="height: 400px; overflow-y: auto;">
                            <div class="card" v-for="(data,index) in riwayat_obat">
                                <div class="card-header">
                                    <h5 class="card-title">
                                        <Button :label="data.RECEIPT_NO" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-text" />
                                    </h5>
                                    <div class="card-tools">
                                        <Button label="" @click="void_sales(data.RECEIPT_NO)"
                                            class="p-button-text p-button-danger" icon="pi pi-times" />
                                    </div>
                                </div>
                                <div class="card-body">
                                    <address>
                                        {{data.TANGGAL}} - {{data.JAM}}<br>
                                        {{data.LOKASI}} <br>
                                        <strong>{{data.DPJP}}</strong> <br>
                                    </address>
                                    <span v-if="data.TELAH_DIKIRIM==1">
                                        Status:
                                        <!-- <Button icon="pi pi-check" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-rounded p-button-success p-button-outlined" /> -->
                                        <Tag class="mr-2" severity="success" value="terkirim"></Tag>
                                    </span>
                                    <span v-if="data.TELAH_DIKIRIM==0">
                                        Status : <Tag class="mr-2" severity="warning" value="blm terkirim"></Tag>
                                        <Button icon="pi pi-send" class="p-button-sm p-button-primary"
                                            @click="kirim_resep(data.RECEIPT_NO)" />
                                    </span>
                                    <!-- <Button label="Yes" icon="pi pi-check" @click="addMessages" autofocus />  -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="card card-primary card-outline">
                        <div class="card-header"> 
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>Permintaan Obat</h5>
                                </div>
                                <div class="col-md-6" style="text-align: right;">
                                    <Button label="Template" class="p-button-text p-button-default"
                                        icon="pi pi-external-link" @click="calltemplatObat()" />
                                </div>
                            </div> 
                        </div>
                        <div class="card-body table-sm table-responsive p-10">
                            <label>Jenis Resep : </label>
                            <Select v-model="form.selectedjns_resep" style="width: 6em;" @change="set_jenisresep"
                                :options="jenisresep" />

                            <Button label="Obat Racikan" class="p-button-text p-button-success"
                            icon="pi pi-edit" @click="add_modal_racik()" />

                            <Select v-if="form.selectedjns_resep=='RR'" v-model="form.bentuk_racik_selected"
                                style="width: 12em;" @change="set_jenisresep" class="mr-3" :options="bentuk_racik" />

                            <label v-if="form.selectedjns_resep=='RR'" class="mr-3">Jml Kemasan : </label>
                            <!-- <InputNumber  id="minmax" v-model="form.jml_kemasan"
                                autocomplete="off"  :minFractionDigits="0"
                                mode="integer" :min="0" :max="200" />  -->
                            <InputNumber v-if="form.selectedjns_resep=='RR'" id="minmax" v-model="form.jml_kemasan"
                                autocomplete="off" mode="decimal" :min="0" :max="200">

                            <label v-if="form.selectedjns_resep=='RR'" class="mr-3">Dosis Racik : </label>
                            <InputText v-if="form.selectedjns_resep=='RR'" utocomplete="off"
                                v-model="form.dosis_racik" />

                            <Toolbar class="mt-2">
                                <template #start>
                                    <Button label="Pilih obat" class="p-button-text" icon="pi pi-search"
                                        @click="openConfirmation" />
                                    <Button label="Riwayat" class="p-button-text p-button-success"
                                        icon="pi pi-external-link" @click="getdata_kco()" />
                                    <Button label="Hapus" class="p-button-text p-button-danger" icon="pi pi-times"
                                        @click="cleartable()" />
                                    <div class="field-checkbox mr-2">
                                    </div>

                                </template>
                                <template #end>
                                    <Select v-model="form.lokasiSelected" style="width: 20em;" class="mr-2"
                                        :options="lokasi_arr" optionLabel="DISPLAY2" :filter="false"
                                        placeholder="Tujuan Permintaan" :showClear="false">
                                        <template #option="slotProps">
                                            <div class="p-dropdown-car-option">
                                                <span>{{slotProps.option.DISPLAY2}}</span>
                                            </div>
                                        </template>
                                    </Select>

                                    <!-- <Button label="Proses" @click="getdata()" style="height: 2.5em;" icon="pi pi-refresh"
                                class="p-button-help mr-2" /> -->
                                </template>
                            </Toolbar> 
                           
                            <table class="table table-sm tb-sm table-bordered table-striped small-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NO</th>
                                        <th>JENIS</th>
                                        <th>BARCODE</th>
                                        <th>NAMA</th>
                                        <th>QTY</th>
                                        <th>SATUAN</th>
                                        <th>CARA PAKAI</th>
                                        <th>AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(selected,index) in form.obatselected" :key="index">
                                        <td><Button icon="pi pi-times" @click="confirm3(index,selected.NAMA)"
                                                class="p-button-rounded p-button-danger p-button-text" /></td>
                                        <td>{{ index+1 }}</td>
                                        <td>
                                            {{ selected.jenisresep }}
                                        </td>
                                        <td> {{selected.BARCODE}}</td>
                                        <td>
                                            {{selected.NAMA}}
                                            <br />
                                            <span v-if="selected.AS_PARENT==1">
                                                {{ selected.ITEM_RACIKAN.nama }}<br />
                                                <span v-for="pulvis in selected.ITEM_RACIKAN.item">
                                                    {{ pulvis.nama }} -- {{ pulvis.dosis }} <br />
                                                </span>
                                            </span>
                                            <!-- <small> Harga : {{selected.HARGA}}- Persediaan :
                                                {{selected.PERSEDIAAN}}</small> -->
                                        </td>
                                        <td>
                                            <span v-if="form.selectedjns_resep=='RT'">
                                                <InputNumber id="minmax" v-model="form.qty_selected[index]"
                                                    autocomplete="off" @input="inputqtyobat(index)"
                                                    :minFractionDigits="2" mode="decimal" :min="0" :max="200" />
                                            </span>
                                            <span v-if="form.selectedjns_resep=='RR'">
                                                <InputText utocomplete="off" @input="inputqtyobat(index)"
                                                    v-model="form.qty_racik[index]" />
                                            </span>

                                        </td>
                                        <td>{{selected.SATUAN}}</td>
                                        <td>
                                            <span v-if="form.selectedjns_resep=='RT'">
                                                <Select v-model="form.remark[index]" :filter="true" :key="index"
                                                    :showClear="true" optionLabel="REMARK" @change="setdosis(index)"
                                                    :options="carapakai_obat" />
                                            </span>

                                        </td>

                                        <td> <Button label="" class="btn btn-primary mr3" icon="pi pi-check"
                                                autofocus />
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>TOTAL</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>
                                            <InputNumber id="minmax" v-model="totalamount" autocomplete="off"
                                                :minFractionDigits="2" mode="decimal" :min="0" disabled />
                                        </th>
                                        <th></th>
                                        <th>

                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="card-footer">
                            <Toolbar class="mb-0">
                                <template #start>
                                    <Button label="Simpan" icon="pi pi-check" @click="simpan_sales" class="ml-5"
                                        autofocus />
                                </template>
                                <template #end>
                                    <Checkbox id="city3" name="city" class="mr-2" :binary="true"
                                        v-model="form.isObatPulang" />
                                    <label for="city3"> Merupakan Obat pulang</label>
                                </template>
                            </Toolbar> 
                        </div>
                    </div>
                </div>
            </div>

            <history_obat :datapasien="datapasien"></history_obat>

            <Dialog header="Header" v-model:visible="modalracik" :containerStyle="{width: '60vw'}" :modal="true">
                
                    <obat-pulvis ref="obat_pulvis"></obat-pulvis>
                    
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="modalracik=false" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="addpulvisToMainSelectedItem()" autofocus />
                </template>
            </Dialog>

            <Dialog header="Header" v-model:visible="ShowtemplateObat" :containerStyle="{width: '80vw'}" :modal="true"> 
                <div class="card elevation-0"> 
                    <div class="card-body" style="height: 800px;">
                        <templateObat @getvalue="handleValue"></templateObat>
                    </div>
                </div> 

                <template #footer> 
                    <Button label="Tutup" icon="pi pi-check" @click="ShowtemplateObat=false" autofocus />
                </template>
            </Dialog>

         
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import InputNumber from 'primevue/inputnumber';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Tag from 'primevue/tag';
    import Checkbox from 'primevue/checkbox';
    import InputText from 'primevue/inputtext';
    import AutoComplete from 'primevue/autocomplete';
    export default {
        components: {
            Loading,
            Dialog,
            InputNumber,
            ConfirmDialog,
            Tag,
            Checkbox,
            AutoComplete
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                jenisresep: ["RT", "RR"],
                bentuk_racik: ['PUYER', 'SALAP', 'SIRUP'],
                carapakai_obat: [],
                data_kco: [],
                modalracik: false,
                lokasi_arr: [],
                ShowtemplateObat:false, 
                selectedPulvis: {
                    nama: '',
                    item: []
                },
                itemPulvisTemp: {
                    nama: '',
                    item: []
                },
                form: {
                    startdate: '',
                    isObatPulang: false,
                    jenisresep:'',
                    enddate: '',
                    itembarang: '',
                    obatselected: [],
                    isPulvis:false,
                    selectedjns_resep: 'RT',
                    bentuk_racik_selected: '',
                    qty_selected: [],
                    lokasiSelected: null,
                    remark: [],
                    DATA_SINGKAT: '',
                    NOMR: '',
                    modesales: '',
                    NOPENDAFTARAN: '',
                    DPJP: '',
                    totalamount: '',
                    waktu_masuk: '',
                    RECEIPT_NO: '',
                    POLI_RUANG: '',
                    id_ruangan: '',
                    qty_racik: [],
                    jml_kemasan: 1,
                    dosis_racik: ''
                },
                param: {
                    NOPENDAFTARAN: '',
                    RECEIPT_NO: '',
                    UpdateisObatPulang: false,
                    MODE: 'RCPT'
                },
                isLoading: false,
                fullPage: true,
                temo_qtyobat: 0,
                displayConfirmation: false,
                details_confirmation: false,
                loading_spiner: 'pi pi-spin pi-spinner',
                totalamount: 0,
                messages: [],
                riwayat_obat: [],
                detils_obat: [],
                form_kco: false,
                barcode: '',
                item: {},
            };
        },
        computed: {

        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            //this.getdataobat();

            this.get_caraminum();
            this.get_riwayat();
            this.get_lokasi();

        },

        methods: {
            fetchData() {

            },
            set_jenisresep(e) {
                console.log(e.value)
            },
            calltemplatObat()
            {   
                this.ShowtemplateObat = true;
            },
           
            itemSelected(item) {
                this.item = item;
            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_DEPO == "1")
                        this.isLoading = false
                        console.log(this.lokasi_arr);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            inputChange(text) {
                // your search method
                //var items = this.fact.filter((itemselected) => itemselected.NAMA.indexOf(text) > -1);
                var items = this.items.filter((item) => item.name.indexOf(text) > -1);
                console.log(items);
                // now `items` will be showed in the suggestion list
            },
            async handleCheckboxChange() {
                this.isLoading = true
                //this.param.RECEIPT_NO = this.datapasien.NOPENDAFTARAN;  
                await axios.post('/update_stts_obat_pulang', this.param)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async get_riwayat() {
                this.isLoading = true
                this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.param.RECEIPT_NO = this.datapasien.NOPENDAFTARAN;
                await axios.post('/getheader_sales', this.param)
                    .then(response => {
                        this.riwayat_obat = response.data.response
                        this.riwayat_obat = this.riwayat_obat.filter(x => x.OBAT_OBATAN == 1)
                        console.log(response.data.response)
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            addItemPulvis() {

                let itemseqNo = this.form.obatselected.length;
                this.selectedPulvis.item.push({
                    itemseq: itemseqNo + 1,
                    nama: '',
                    dosis: ''
                });
            },
            hapusitemPulvis(index) {
                this.selectedPulvis.item.splice(index, 1);
            },
            addpulvisToMainSelectedItem() {
                // this.itemPulvisTemp.push(this.selectedPulvis);

                var data =  this.$refs.obat_pulvis.get_value();

                console.log(data);
                this.form.obatselected.push({
                    BARCODE: "0000",
                    AS_PARENT: 1,
                    jenisresep:'R',
                    NAMA: data.nama,
                    SATUAN:data.satuan,
                    FLAG: "NEW LINE",
                    ITEM_RACIKAN: this.itemPulvisTemp,
                    QTY: data.qty,
                    HARGA: 0,
                    SATUAN_RACIK: data.satuan,
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                for(let i=0; i<data.item.length; i++)
                {
                    this.form.obatselected.push({
                    BARCODE: "0000",
                    AS_PARENT: 1,
                    jenisresep:'',
                    NAMA: data.item[i].nama,
                    FLAG: "NEW LINE",
                    ITEM_RACIKAN:'',
                    QTY: 0,
                    HARGA: 0,
                    SATUAN_RACIK: data.satuan,
                    TANGGAL_TRANS: this.formattedDateTime()
                });
                }


                

                // this.setitemseqNo();
     
                // this.modalracik = false;
            },
            add_modal_racik()
            {
                this.modalracik = true;
            },
            addMessages() {
                this.messages = [{
                        severity: 'info',
                        content: 'Dynamic Info Message'
                    },
                    {
                        severity: 'success',
                        content: 'Dynamic Success Message'
                    },
                    {
                        severity: 'warn',
                        content: 'Dynamic Warning Message'
                    }
                ]
            },
            async getdetail_sales(RECEIPT_NO) {
                this.isLoading = true
                this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.param.RECEIPT_NO = RECEIPT_NO;
                await axios.post('/getdetils_sales', this.param)
                    .then(response => {
                        this.detils_obat = response.data.response
                        console.log(this.detils_obat[0].OBAT_PULANG);
                        if (this.detils_obat[0].OBAT_PULANG == 1) {
                            this.param.UpdateisObatPulang = true;
                        } else {
                            this.param.UpdateisObatPulang = false;
                        }

                        this.isLoading = false
                        this.details_confirmation = true;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            setLabel(item) {
                return item.name;
            },
            inputChange(text) {

            },

            additem_barang(barang) {
                var currentDate = new Date();
                this.form.obatselected.push({
                    BARCODE: barang.BARCODE,
                    ID_BARANG: barang.BARCODE,
                    jenisresep:'R',
                    NAMA: barang.NAMA,
                    SATUAN: barang.SATUAN,
                    RECEIPT_NO: '',
                    HARGA: barang.HARGAJUAL,
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
                    QTY: 1,
                    STATUS: '',
                    DOSIS: '',
                    STATUS_PROGRESS: "M",
                    SUB_BARCODE: barang.SUB_BARCODE,
                    OBAT_OBATAN: 1,
                    AS_PARENT: 0,
                    SAT_RACIK: '',
                    FLAG: "NEW LINE",
                    JENIS: barang.JENIS,
                    JENIS_RESEP: "",
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    JML_RACIK: barang.JML_RACIK,
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                console.log(this.form.obatselected);

                this.setitemseqNo();

            },
            setitemseqNo() {
                for (let i = 0; i < this.form.obatselected.length; i++) {
                    //this.form.selectedjns_resep[i] = "R/";
                    this.form.obatselected[i].ITEMSEQNO = (i + 1);
                }

                if (this.form.mode == 10) {
                    this.form.itembarang = '';
                    this.$refs.inputBox.focus();
                }
            },
            setdosis(index) {
                let remark_item = "";
                remark_item = this.form.remark[index];
                this.form.obatselected[index].REMARK_ITEM = remark_item['REMARK']
                console.log(this.form.obatselected[index].REMARK_ITEM);
            },
            save_sales() {
                var currentDate = new Date();
            },
            counting() {
                let amount = 0;
                for (let i = 0; i < this.form.obatselected.length; i++) {
                    amount = amount + this.form.obatselected[i].TOTALAMOUNT;
                }
                this.totalamount = amount;
            },
            inputqtyobat(index) {
                if (this.form.qty_selected[index] == "" || this.form.qty_selected[index] == null) {
                    this.form.qty_selected[index] = 0;
                }
                this.form.obatselected[index].QTY = this.form.qty_selected[index];
                this.form.obatselected[index].TOTALAMOUNT = this.form.obatselected[index].QTY * this.form.obatselected[
                    index].HARGA;

                this.form.obatselected[index].QTY_RACIK = this.form.qty_racik[index];
                this.form.obatselected[index].SAT_RACIK = this.form.qty_racik[index];
                console.log(this.form.qty_selected[index]);
                this.counting();
            },

            async get_caraminum() {
                await axios.post('/get_carapakai_obat', "")
                    .then(response => {
                        this.carapakai_obat = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            validation_data() {
                let isvalid = true;

                if (this.form.jenisresep == 'R') {

                    for (let i = 0; i < this.form.obatselected.length; i++) {
                        if (this.form.obatselected[i].QTY == 0 || this.form.obatselected[i].QTY == "") {
                            this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item " + this.form
                                .obatselected[i].NAMA);
                            isvalid = false;
                        }

                    }
                } else {
                    for (let i = 0; i < this.form.obatselected.length; i++) {
                        if (this.form.obatselected[i].SAT_RACIK == "") {
                            this.open("warning", "Satuan racik belum perlu diisi")
                            isvalid = false;
                        }
                        if (this.form.obatselected[i].SAT_RACIK == "") {
                            this.open("warning", "Satuan racik belum perlu diisi")
                            isvalid = false;
                        }
                    }
                    if (this.form.dosis_racik == "") {
                        this.open("warning", "Dosis racikan belum di isi")
                        isvalid = false;
                    }
                    if (this.form.bentuk_racik_selected == "") {
                        this.open("warning", "Bentuk racikan belum dipilih")
                        isvalid = false;
                    }


                }

                return isvalid;
            },
            async simpan_sales() {

                this.isLoading = true;
                var currentDate = new Date();
                this.form.waktu_masuk = currentDate;
                this.form.DATA_SINGKAT = this.datapasien.DATA_SINGKAT;
                this.form.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.form.modesales = 'REG'
                this.form.DPJP = this.datapasien.NAMADOKTER;
                this.form.NOMR = this.datapasien.NOMR;
                this.form.RECEIPT_NO = '',
                    this.form.POLI_RUANG = this.datapasien.POLI;
                this.form.OBAT_OBATAN = 1;
                this.form.id_ruangan = this.datapasien.KODERUANGAN;

                let isValid = this.validation_data();
                if (isValid == false) {
                    this.isLoading = false;
                    return;
                }
                await axios.post('/kirimpermintaan_obat', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Data obat telah tersimpan, dengan nomor" + response.data
                                .metadata.Receipt);
                            this.form.RECEIPT_NO = response.data.metadata.Receipt;
                            this.cleartable();
                            this.get_riwayat();
                        } else {
                            var data = response.data.metadata.message;
                            this.open("warning", data);
                        }
                        console.log(response.data.metadata);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            kirimpermintaan() {

            },
            hapusitem_barang(index) {
                this.form.obatselected.splice(index, 1);
                this.form.qty_selected.splice(index, 1);
                this.form.remark.splice(index, 1);
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
                await axios.post('/getdata_obat_baseparam', this.form)
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
            openConfirmation() {
                this.displayConfirmation = true;
            },
            closeConfirmation() {
                this.displayConfirmation = false;
            },
            confirm3(index, namaobat) {
                this.hapusitem_barang(index);
            },

            formattedDateTime() {
                var currentDate = new Date();
                // Parse the datetime string to a Date object
                const dateTime = currentDate
                // Extract date and time components
                const year = dateTime.getFullYear();
                const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
                const day = ('0' + dateTime.getDate()).slice(-2);
                const hours = ('0' + dateTime.getHours()).slice(-2);
                const minutes = ('0' + dateTime.getMinutes()).slice(-2);
                const seconds = ('0' + dateTime.getSeconds()).slice(-2);

                // Format the datetime
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            async getdata_kco() {

                this.isLoading = true
                this.form.NOREGISTER = this.datapasien.NOPENDAFTARAN;
                await axios.post('/get_data_kco', this.form)
                    .then(response => {
                        this.data_kco = response.data.response
                        this.form_kco = true;
                        this.isLoading = false
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
                    duration: 3000,
                    dismissible: true
                })
            },
           async handleValue(data)  ///terima nila dari funtion data obat
            {
                console.log(data.detils)
                for(let i=0; i<data.detils.length; i++)
                {
                   // console.log(data.detils[i].barcode)
                    this.form.barcode =data.detils[i].barcode
                    await this.getdataobat(3);
                    var barang = this.fact[0];
                    this.additem_barang(barang);
                    this.open("success", data.detils[i].nama + " " + "Telah di tambahkan");
                }
                //this.add_copy_item(data)
            },
            async add_copy_item(row) {
                this.form.barcode = row.BARCODE;
                await this.getdataobat(3);
                var barang = this.fact[0];
                this.additem_barang(barang);
                this.open("success", row.NAMABARANG + " " + "Telah di tambahkan");
            },
            async add_copy_all() {
                this.form_kco = false;
                for (let i = 0; i < this.data_kco.itembarang.length; i++) {
                    this.form.barcode = this.data_kco.itembarang[i].BARCODE;
                    await this.getdataobat(3);
                    var barang = this.fact[0];
                    this.additem_barang(barang);
                }
            },
            cleartable() {
                this.form.obatselected = [];
                this.form.qty_selected = [];
                this.form.remark = [];

            },
            async void_sales(rcpt_no) {
                this.isLoading = true
                this.form.NOREGISTER = this.datapasien.NOPENDAFTARAN;
                this.form.RECEIPT_NO = rcpt_no;
                await axios.post('/void_sales', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.get_riwayat();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async kirim_resep(rcpt_no) {
                this.isLoading = true
                this.form.RECEIPT_NO = rcpt_no;
                await axios.post('/kirim_resep', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.details_confirmation = false
                        this.open("success", response.data.metadata.message);
                        this.get_riwayat();
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
<!-- <style scope>
  .vue-suggestion .vs__list {
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #023d7b;
    position: relative;
  }
  .vue-suggestion .vs__list .vs__list-item {
    background-color: #fff;
    padding: 10px;
    border-left: 1px solid #023d7b;
    border-right: 1px solid #023d7b;
  }
  .vue-suggestion .vs__list .vs__list-item:last-child {
    border-bottom: none;
  }
  .vue-suggestion .vs__list .vs__list-item:hover {
    background-color: #eee !important;
  }
  .vue-suggestion .vs__list,
  .vue-suggestion .vs__loading {
    position: absolute;
  }
  .vue-suggestion .vs__list .vs__list-item {
    cursor: pointer;
  }
  .vue-suggestion .vs__list .vs__list-item.vs__item-active {
    background-color: #f3f6fa;
  }
</style> -->
