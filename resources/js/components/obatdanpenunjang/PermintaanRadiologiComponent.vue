<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>


            <ConfirmDialog></ConfirmDialog>
            <Dialog header="Header" v-model:visible="form_kco" :containerStyle="{width: '70vw'}" :modal="true">
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
                                    <!-- <th>SUB_BARCODE</th> -->
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
                                    <!-- <td>{{row.SUB_BARCODE}}</td> -->
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
                    <Button label="No" icon="pi pi-times" @click="details_confirmation=false" class="p-button-text" />
                    <!-- <Button label="Kirim Permintaan" icon="pi pi-send" @click="kirim_resep(param.RECEIPT_NO)"
                        autofocus /> -->
                </template>
            </Dialog>
            <Dialog header="List Item Radiologi" v-model:visible="displayConfirmation" :modal="true" class="radiologi-dialog" :style="{ width: '60vw' }">
                <span class="p-input-icon-left mb-5">
                    <input type="text" class="form-control" v-model="form.itembarang" ref="inputBox"
                        @input="getdataobat(112)" placeholder="Search" />
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
                                    <!-- <th>SUB_BARCODE</th> -->
                                    <th>BARCODE</th>
                                    <!-- <th>GROUPING</th> -->
                                    <th>NAMA</th>
                                    <th>HARGA</th>
                                    <th>PERSEDIAAN</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in fact">
                                    <td>{{ k+1 }}</td>
                                    <!-- <td>{{row.SUB_BARCODE}}</td> -->
                                    <td>{{row.BARCODE}}</td>
                                    <!-- <td>{{row.GROUPING }}</td> -->
                                    <td>{{row.NAMA }}</td>
                                    <td>{{row.HARGAJUAL}}</td>
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
                                <span>Riwayat</span> <Button @click="get_riwayat()" class="p-button-text p-button-dange" icon="pi pi-refresh"></Button>
                            </h3>
                        </div>
                        <div class="card-body" style="height: 400px; overflow-y: auto;">
                            <div class="card" v-for="(data,index) in riwayat_penunjang">
                                <div class="card-header">
                                    <h5 class="card-title">
                                        <Button :label="data.RECEIPT_NO" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-text" />
                                        <!-- <strong>{{data.RECEIPT_NO}}</strong> -->
                                    </h5>
                                    <div class="card-tools">
                                        <Button label="" @click="void_sales(data.RECEIPT_NO)"
                                            class="p-button-text p-button-danger" icon="pi pi-times" />
                                    </div>
                                </div>
                                <div class="card-body">
                                    <address>
                                        {{data.TANGGAL}} - {{data.JAM}}<br>
                                        Apakah Sudah di proses?
                                        <span v-if="data.STATUS_PROGRESS=='M'">
                                            <strong>Belum</strong>
                                        </span>
                                        <span v-if="data.STATUS_PROGRESS=='C'">
                                            <strong>Ya</strong>
                                            <!-- <Tag class="mr-2" severity="success">Sudah</Tag> -->
                                        </span>
                                        <br>

                                        <strong>{{data.DPJP}}</strong> <br>

                                    </address>
                                    <span v-if="data.TELAH_DIKIRIM==1">
                                        Status:
                                        <!-- <Button icon="pi pi-check" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-rounded p-button-success p-button-outlined" /> -->
                                        <Tag class="mr-2" severity="success" value="terkirim"></Tag>
                                    </span>
                                    <span v-if="data.TELAH_DIKIRIM==0">
                                        Status : <Tag class="mr-2" severity="warn" value="blm terkirim"></Tag>
                                        <Button icon="pi pi-send" severity="warn" class="p-button-sm"
                                            @click="kirim_resep(data.RECEIPT_NO)" />
                                    </span>
                                    <br />
                                    <span >

                                        <Button label="Lihat hasil" icon="pi pi-search"
                                            class="p-button-sm p-button-text p-button-primary"
                                            @click="get_subdetail(data.RECEIPT_NO)" />

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
                            <h3 class="card-title">
                                <span>Permintaan Radiologi</span>
                            </h3>
                        </div>
                        <div class="card-body">


                            <div class="row">
                                <div class="col-md-6">
                                    <Button label="Pilih Item Pemeriksaan" class="p-button-text" icon="pi pi-search"
                                        @click="openConfirmation" />
                                    <!-- <Button label="Copy" class="p-button-text p-button-success"
                                        icon="pi pi-external-link" @click="getdata_kco()" /> -->
                                    <Button label="Hapus" class="p-button-text p-button-danger" icon="pi pi-times"
                                        @click="cleartable()" />
                                </div>
                                <div class="col-md-3">
                                    <label for="klinis">Klinis</label>
                                    <Textarea id="klinis" style="width: 100%;" placeholder="Wajib Input Klinis" v-model="form.klinis"></Textarea>
                                </div>
                                <div class="col-md-3">
                                    <label for="catatan">Catatan</label>
                                    <Textarea id="catatan" style="width: 100%;" placeholder="Input Catatan" v-model="form.catatan"></Textarea>
                                </div>
                            </div>

                            <table class="table table-sm tb-sm table-bordered table-striped small-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NO</th>
                                        <th>BARCODE</th>
                                        <th>NAMA</th>
                                        <th>QTY</th>
                                        <th>SATUAN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(selected,index) in form.obatselected" :key="index">
                                        <td><Button icon="pi pi-times" @click="confirm3(index,selected.NAMA)"
                                                class="p-button-rounded p-button-danger p-button-text" /></td>
                                        <td>{{ index+1 }}</td>

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

                                            <small> Harga : {{selected.HARGA}}- Persediaan :
                                                {{selected.PERSEDIAAN}}</small>
                                        </td>
                                        <td>
                                            <InputNumber id="minmax" v-model="form.qty_selected[index]"
                                                autocomplete="off" @input="inputqtyobat(index)" :minFractionDigits="2"
                                                mode="decimal" :min="0" :max="200" />
                                        </td>
                                        <td>{{selected.SATUAN}}</td>
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
                            <Button label="Simpan" icon="pi pi-check" @click="simpan_sales" autofocus />
                        </div>
                    </div>
                </div>
            </div>
            <!-- <history_obat :datapasien="datapasien"></history_obat>  -->
            <!-- <hasilbaca-radiologi :noreceipt=param.RECEIPT_NO></hasilbaca-radiologi> -->

            <Dialog header="Header x" v-model:visible="modalracik" :containerStyle="{width: '40vw'}" :modal="true">
                <div class="card-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Racikan</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="selectedPulvis.nama"
                            placeholder="Cara Pakai">
                    </div>

                    <div class="row" v-for="(data,index) in selectedPulvis.item">
                        <div class="col-sm-4">
                            <!-- <div class="form-group">
                                <input type="text" class="form-control" id="exampleInputEmail1"
                                    placeholder="Nama Sediaan" v-model="data.nama">
                            </div> -->


                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" class="form-control" id="dosis" placeholder="Dosis"
                                    v-model="data.dosis">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <Button label="" icon="pi pi-minus" class="p-button-danger p-button-sm"
                                    @click="hapusitemPulvis(index)" autofocus />
                            </div>
                        </div>
                    </div>
                    <Button label="" icon="pi pi-plus" class="p-button-success p-button-sm" @click="addItemPulvis()"
                        autofocus />
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="modalracik=false" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="addpulvisToMainSelectedItem()" autofocus />
                </template>
            </Dialog>


            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title"><strong> Expertis radiologi</strong></h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="card" v-for="item in hasilbacaradiologi">
                                <div class="card-header">
                                    <h3 class="card-title">Keterangan hasil baca <strong> {{item.NAMA}} </strong></h3>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <span v-for="att in item.attachment">
                                                <div class="image-preview-container">
                                                        <!-- Image Preview Component -->
                                                        <ImagePreview
                                                        :src="att.link_img"
                                                        alt="Image"
                                                        width="250"
                                                        preview
                                                        class="mb-2 custom-image-preview"
                                                        @show="onImageShow"
                                                        >
                                                        <template #indicator>
                                                            {{att.caption_file}}
                                                        </template>
                                                        </ImagePreview>
                                                    </div>
                                                    <!-- <ImagePreview :src="att.link_img" alt="Image" width="250" preview
                                                    class="mb-2">
                                                    <template #indicator>
                                                        {{att.caption_file}}
                                                    </template>
                                                </ImagePreview> -->
                                            </span>
                                        </div>
                                        <div class="col-md-8">
                                            <h5>Subject </h5>
                                            <p class="text-muted">Hasil baca Radiologi, update terakhir
                                                {{ item.TANGGAL_TIMPSTAMP  }}</p>
                                            <h6><span v-html="convert_chart(item.HASIL_BACA)"></span></h6>
                                        </div>
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
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import InputNumber from 'primevue/inputnumber';
    import ConfirmDialog from 'primevue/confirmdialog';
    import ImagePreview from 'primevue/image';
    import Textarea from 'primevue/textarea';
    import Tag from 'primevue/tag';
    export default {
        components: {
            Loading,
            Dialog,
            InputNumber,
            ConfirmDialog,
            Tag,
            ImagePreview,
            Textarea
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                jenisresep: ["R/", "RR/", ''],
                carapakai_obat: [],
                data_kco: [],
                modalracik: false,
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
                    enddate: '',
                    itembarang: '',
                    obatselected: [],
                    selectedjns_resep: '',
                    qty_selected: [],
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
                    kategori: '',
                    klinis: '',
                    catatan: ''
                },
                param: {
                    NOPENDAFTARAN: '',
                    RECEIPT_NO: '',
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
                riwayat_penunjang: [],
                detils_obat: [],
                form_kco: false,
                barcode: '',
                item: {},
                hasilbacaradiologi: []

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

            //this.get_caraminum();
            this.get_riwayat();
            //this.param.RECEIPT_NO = "1100194767277779"
        },

        methods: {
            fetchData() {

            },
            onImageShow() {
                // After image preview is shown, add a close button to the preview mask
                this.$nextTick(() => {
                    const maskElement = document.querySelector('.p-image-mask');

                    if (maskElement && !document.querySelector('.custom-close-btn')) {
                    // Create close button element
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'custom-close-btn';
                    closeBtn.innerHTML = '<i class="pi pi-times"></i>';

                    // Add click event to close the preview
                    closeBtn.addEventListener('click', () => {
                        // Find and click the mask to close the preview
                        const mask = document.querySelector('.p-image-mask');
                        if (mask) mask.click();
                    });

                    // Append button to mask
                    maskElement.appendChild(closeBtn);
                    }
                });
                },

            convert_chart: function (stringText) {
                if (stringText == null) {
                    return "";
                } else {
                    // let res =  stringText.replace(/(\\r)*\\n/g, '<br>')
                    // res =  res.replace(/\n\n/g, '<br>');
                    let res = stringText.replace(/\n/g, '<br>');
                    return res;
                }
            },
            async get_subdetail(no_receipt) {
                this.isLoading = true
                //this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.form.no_receipt = no_receipt;
                // this.form.no_receipt = this.noreceipt;
                this.form.mode = "1"
                await axios.post('/get_detail_radiologi', this.form)
                    .then(response => {
                        this.hasilbacaradiologi = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            itemSelected(item) {
                this.item = item;
            },

            async get_riwayat() {
                this.isLoading = true
                this.param.noregister = this.datapasien.NOPENDAFTARAN;
                this.param.jenisdata = 3;
                await axios.post('/getheader_penunjang_v2', this.param)
                    .then(response => {
                        this.riwayat_penunjang = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
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
                await axios.post('/getdetils_sales_radiologi', this.param)
                    .then(response => {
                        this.detils_obat = response.data.response
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
                    STATUS_PROGRESS: "C",
                    SUB_BARCODE: barang.SUB_BARCODE,
                    OBAT_OBATAN: 1,
                    AS_PARENT: 0,
                    SAT_RACIK: '',
                    FLAG: "NEW LINE",
                    JENIS: barang.JENIS,
                    JENIS_RESEP: "",
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                this.setitemseqNo();

            },
            setitemseqNo() {
                for (let i = 0; i < this.form.obatselected.length; i++) {
                    this.form.obatselected[i].ITEMSEQNO = (i + 1);
                    this.form.obatselected[i].QTY = 1;
                    this.form.qty_selected[i] = 1
                    this.form.obatselected[i].TOTALAMOUNT = this.form.obatselected[i].HARGA
                }

                if (this.form.mode == 10) {
                    this.form.itembarang = '';
                    this.$refs.inputBox.focus();
                }

                this.counting();
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

                for (let i = 0; i < this.form.obatselected.length; i++) {
                    if (this.form.obatselected[i].QTY == 0 || this.form.obatselected[i].QTY == "") {
                        this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item " + this.form
                            .obatselected[i].NAMA);
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
                this.form.OBAT_OBATAN = 3;

                let isValid = this.validation_data();
                if (isValid == false) {
                    this.isLoading = false
                    return;
                }

                if(this.form.klinis=='')
                {
                    this.open("warning", "Data klinis pasien wajib diisi");
                    this.isLoading = false
                    return
                }

                if(this.form.catatan=='')
                {
                    this.form.catatan ='-';
                }

                // console.log(JSON.stringify(this.form))
                // return;
                await axios.post('/kirimpermintaan_obat', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Data permintaan telah tersimpan, dengan nomor" + response.data
                                .metadata.Receipt);
                            this.form.RECEIPT_NO = response.data.metadata.Receipt;
                            this.cleartable();
                            this.get_riwayat();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.open("warning", "Gagal proses," + error);
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

                if (mode == 112) {
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
                this.form.breakdown = 0
                this.form.kategori = 'RADIOLOGI'
                await axios.post('/getdata_obat_baseparam', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.fact = response.data.response
                        this.isLoading = false
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
                this.form.klinis ='';
                this.form.catatan='';

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

<style>
/* Vue 2 syntax for deep selectors */
.custom-image-preview >>> .p-image-preview {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Style for the caption/indicator */
.custom-image-preview >>> .p-image-preview-indicator {
  font-weight: 500;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border-radius: 4px;
}

/* Improving the overlay background */
.custom-image-preview >>> .p-image-mask {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Additional style to make the image look better in normal view */
.custom-image-preview >>> .p-image img {
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

/* Custom close button styling */
.custom-close-btn {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10000;
}

.custom-close-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.custom-close-btn i {
  font-size: 1.2rem;
  color: #333;
}
</style>

<style scoped>
/* Paksa dialog selalu center terhadap full viewport,
   mengabaikan margin-left sidebar AdminLTE */
:deep(.p-dialog-mask) {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

:deep(.radiologi-dialog.p-dialog) {
    width: 60vw !important;
    max-width: 60vw !important;
}

:deep(.radiologi-dialog .p-dialog-content) {
    overflow-x: hidden;
}

@media (max-width: 768px) {
    :deep(.radiologi-dialog.p-dialog) {
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        margin: 0 !important;
        border-radius: 0 !important;
    }
    :deep(.radiologi-dialog .p-dialog-content) {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 0 !important;
    }
    :deep(.radiologi-dialog .p-dialog-header) {
        border-radius: 0 !important;
    }
}
</style>
