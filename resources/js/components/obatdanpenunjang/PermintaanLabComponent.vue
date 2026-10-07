<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>


            <ConfirmDialog></ConfirmDialog>
            <Dialog header="Daftar laboratorium" v-model:visible="form_kco" :containerStyle="{width: '70vw'}" :modal="true">
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
                    <!-- <Button label="Copy Semua" icon="pi pi-plus" @click="add_copy_all()" class="p-button-warning"
                        autofocus /> -->
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
                    <Button label="No" icon="pi pi-times" @click="details_confirmation=false" class="p-button-text" />
                    <!-- <Button label="Kirim Permintaan" icon="pi pi-send" @click="kirim_resep(param.RECEIPT_NO)"
                        autofocus /> -->
                </template>
            </Dialog>
            <Dialog header="Daftar Laboratorium" v-model:visible="displayConfirmation" :modal="true" class="lab-dialog" :style="{ width: '60vw' }">
                <span class="p-input-icon-left mb-5">

                    <input type="text" class="form-control" v-model="form.itembarang" ref="inputBox"
                        @input="getdataobat(112)" placeholder="Search" />
                </span>
                <Button label="" class="mb-5" :loading="isLoading" icon="pi pi-search" @click="getdataobat(112)" />
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
                <span v-if="isLoading">
                    <ProgressBar mode="indeterminate" style="height: .5em" />
                </span>
                <div class="col-sm-3">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">
                                <span>Riwayat</span> <Button @click="get_riwayat()" class="p-button-text p-button-dange"
                                    icon="pi pi-refresh"></Button>
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
                                            <!-- <Tag class="mr-2" severity="warning">Blm</Tag> -->
                                            <strong>Belum</strong>
                                        </span>
                                        <span v-if="data.STATUS_PROGRESS=='P'||data.STATUS_PROGRESS=='C'">
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
                                        Status : <Tag class="mr-2" severity="warning" value="blm terkirim"></Tag>
                                        <Button icon="pi pi-send" class="p-button-sm p-button-primary"
                                            @click="kirim_resep(data.RECEIPT_NO)" />
                                    </span>
                                    <br />
                                    <span v-if="data.STATUS_PROGRESS=='P'||data.STATUS_PROGRESS=='C'">

                                        <Button label="Lihat hasil" icon="pi pi-search"
                                            class="p-button-sm p-button-text p-button-primary"
                                            @click="gethasilpemeriksaan_lab(data.RECEIPT_NO)" />

                                        <Button label="Cetak" icon="pi pi-print"
                                            class="p-button-sm p-button-text p-button-secondary"
                                            @click="cetakHasilLab(data.RECEIPT_NO)" />

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
                                <span>Permintaan Laboratorium</span>
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
                                    <Textarea id="klinis" style="width: 100%;" placeholder="Wajib Input Klinis"
                                        v-model="form.klinis"></Textarea>
                                </div>
                                <div class="col-md-3">
                                    <label for="catatan">Catatan</label>
                                    <Textarea id="catatan" style="width: 100%;" placeholder="Input Catatan"
                                        v-model="form.catatan"></Textarea>
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
                                            <small> Harga : {{selected.HARGA}} </small>
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

                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="card-footer">
                            <Button label="Simpan" icon="pi pi-check" @click="simpan_sales" autofocus />
                            <!-- <Button label="Kirim Permintaan" class="p-button-success" icon="pi pi-send"
                                @click="kirimpermintaan" autofocus /> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- <history_obat :datapasien="datapasien"></history_obat>  -->
            <!-- <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">
                        <h5>Hasil pemeriksaan Laboratorium</h5>
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row invoice-info">
                        <div class="col-sm-4 invoice-col">
                            Pasien
                            <address>
                                <strong>{{datalab_pasien.NAMA}} ({{datalab_pasien.JENISKELAMIN}}-{{datalab_pasien.USIA}}) </strong><br>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Masuk
                            <address>
                               Tanggal order : <strong>  {{datalab_pasien.TANGGAL}} </strong>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Otorisasi
                            <address>
                               Telah dilakukan otorisasi : <strong v-if="datalab_pasien.IS_VERIFIED==1"> Ya, </strong>
                               <strong v-if="datalab_pasien.IS_VERIFIED==0"> Belum </strong>
                               <strong>{{datalab_pasien.PETUGAS_OTENTIKASI}}</strong>
                            </address>

                        </div>
                    </div>
                    <table class="table table-sm tb-sm table-bordered table-striped small-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>#</th>
                                <th>PEMERIKSAAN</th>
                                <th>HASIL</th>
                                <th>NORMAL</th>
                                <th>SATUAN</th>
                                <th>KET HASIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(hasil,index) in detailpemeriksaanlab" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ hasil.NAMA }}</td>
                                <td>{{ hasil.PEMERIKSAAN }}</td>
                                <td>
                                    <span v-if="hasil.HASIL_TIDAK_NORMAL==1">
                                     <strong style="color: red;">{{ hasil.HASIL }}</strong>
                                    </span>
                                    <span v-if="hasil.HASIL_TIDAK_NORMAL==0">
                                     <strong style="color: black;"> {{ hasil.HASIL }}</strong>
                                    </span>
                                </td>
                                <td>{{ hasil.NORMAL }}</td>
                                <td>{{ hasil.SATUAN }}</td>
                                <td>{{ hasil.KET_HASIL }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div> -->


            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">
                        <span>Hasil Pemeriksaan Laboratorium</span>
                    </h3>
                </div>
                <div class="card-body">
                    <!-- Header Info Pasien -->
                    <div class="row invoice-info mb-3">
                        <div class="col-sm-4 invoice-col">
                            Pasien
                            <address>
                                <strong>{{ datalab_pasien.NAMA }}
                                    ({{ datalab_pasien.JENISKELAMIN }}-{{ datalab_pasien.USIA }})</strong>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Masuk
                            <address>Tanggal order: <strong>{{ datalab_pasien.TANGGAL }}</strong></address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Otorisasi
                            <address>
                                Telah dilakukan otorisasi:
                                <strong v-if="datalab_pasien.IS_VERIFIED == 1">Ya, </strong>
                                <strong v-if="datalab_pasien.IS_VERIFIED == 0">Belum </strong>
                                <strong>{{ datalab_pasien.PETUGAS_OTENTIKASI }}</strong>
                            </address>
                        </div>
                    </div>

                    <!-- Master-Detail per Grup NAMA -->
                    <div v-for="(items, namaGrup) in groupedByNama" :key="namaGrup" class="card mb-2">
                        <!-- Master Header (induk) -->
                        <div class="card-header d-flex align-items-center" style="cursor: pointer; background: #f4f6f9;"
                            @click="toggleGrup(namaGrup)">
                            <span class="badge badge-info mr-2">{{ namaGrup }}</span>
                            <span class="mr-auto font-weight-bold text-dark">{{ namaGrup }}</span>
                            <span class="badge badge-danger mr-2" v-if="countAbnormal(items) > 0">
                                {{ countAbnormal(items) }} tidak normal
                            </span>
                            <span class="badge badge-secondary mr-2">{{ items.length }} item</span>
                            <i :class="['fas', openGrup[namaGrup] ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                        </div>

                        <!-- Detail (child) -->
                        <div v-show="openGrup[namaGrup]">
                            <table class="table table-sm table-bordered table-striped small-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Pemeriksaan</th>
                                        <th>Hasil</th>
                                        <th>Normal</th>
                                        <th>Satuan</th>
                                        <th>Ket Hasil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(hasil, index) in items" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ hasil.PEMERIKSAAN }}</td>
                                        <td>
                                            <strong v-if="hasil.HASIL_TIDAK_NORMAL == 1" style="color: red;">
                                                {{ hasil.HASIL }}
                                            </strong>
                                            <strong v-else style="color: black;">
                                                {{ hasil.HASIL }}
                                            </strong>
                                        </td>
                                        <td>{{ hasil.NORMAL }}</td>
                                        <td>{{ hasil.SATUAN }}</td>
                                        <td>{{ hasil.KET_HASIL }}</td>
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
    import Dialog from 'primevue/dialog';
    import InputNumber from 'primevue/inputnumber';
    import ConfirmDialog from 'primevue/confirmdialog';
    import ProgressBar from 'primevue/progressbar';
    import Textarea from 'primevue/textarea';
    import Tag from 'primevue/tag';
    import {
        componentsToColor
    } from 'pdf-lib';
    export default {
        components: {
            Loading,
            Dialog,
            InputNumber,
            ConfirmDialog,
            Tag,
            ProgressBar,
            Textarea
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                jenisresep: '',
                openGrup: {},
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
                    RECEIPT_NO: ''
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
                detailpemeriksaanlab: [],
                datalab_pasien: ''
            };
        },

        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        computed: {
            groupedByNama() {
            return this.detailpemeriksaanlab.reduce((acc, item) => {
                const key = item.NAMA
                if (!acc[key]) acc[key] = []
                acc[key].push(item)
                return acc
            }, {})
            }
        },
          watch: {
            groupedByNama: {
            immediate: true,
            handler(val) {
                // Buka semua grup secara default
                Object.keys(val).forEach(key => {
                    if (this.openGrup[key] === undefined) {
                        this.openGrup[key] = true;
                    }
                })
            }
            }
        },
        created() {
            //this.getdataobat();

            this.get_caraminum();
            this.get_riwayat();
        },

        methods: {
            cetakHasilLab(receiptNo) {
                const noregister = this.datapasien?.NOPENDAFTARAN || '';
                window.open(`/print-hasil-lab?receipt_no=${receiptNo}&noregister=${noregister}`, '_blank');
            },
            toggleGrup(namaGrup) {
                this.openGrup[namaGrup] = !this.openGrup[namaGrup];
            },
            countAbnormal(items) {
                return items.filter(i => i.HASIL_TIDAK_NORMAL == 1).length
            },
            fetchData() {

            },
            itemSelected(item) {
                this.item = item;
            },

            async gethasilpemeriksaan_lab(receipt) {
                this.isLoading = true
                this.param.receipt = receipt
                await axios.post('/getdatahasil_lab', this.param)
                    .then(response => {
                        this.detailpemeriksaanlab = response.data.response
                        this.datalab_pasien = response.data.pasien;

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
                this.param.noregister = this.datapasien.NOPENDAFTARAN;
                this.param.jenisdata = 2;
                await axios.post('/getheader_penunjang_v2', this.param)
                    .then(response => {
                        this.riwayat_penunjang = response.data.response

                        var data = response.data.response

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
                this.param.MODE = 'RCPT'
                await axios.post('/getdetils_sales', this.param)
                    .then(response => {
                        console.log(response.data)
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
                    JENIS_RESEP: '',
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                this.setitemseqNo();

            },
            setitemseqNo() {
                for (let i = 0; i < this.form.obatselected.length; i++) {
                    this.form.obatselected[i].ITEMSEQNO = (i + 1);
                    this.form.qty_selected[i] = 1
                    this.form.obatselected[i].QTY = 1;
                    this.form.obatselected[i].TOTALAMOUNT = this.form.obatselected[i].HARGA;
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
                //console.log(this.form.qty_selected[index]);
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
                this.form.OBAT_OBATAN = 2;
                let isValid = this.validation_data();
                if (isValid == false) {
                    return;
                }

                if (this.form.catatan == '') {
                    this.form.catatan = '-';
                }
                await axios.post('/kirimpermintaan_obat', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Permintaan pemeriksaan lab berihasil, dengan nomor" + response
                                .data
                                .metadata.Receipt);
                            this.form.RECEIPT_NO = response.data.metadata.Receipt;
                            this.cleartable();
                            this.get_riwayat();
                        }
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
                this.form.breakdown = 0;
                this.form.kategori = 'LABORATORIUM'
                await axios.post('/getdata_obat_baseparam', this.form)
                    .then(response => {
                        console.log(response.data);
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
                        this.details_confirmation = false
                        this.isLoading = false
                        this.open("success", response.data.metadata.message);
                        this.get_riwayat();

                        console.log(response.data);
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
/* Paksa semua dialog selalu center terhadap full viewport,
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

:deep(.lab-dialog.p-dialog) {
    width: 60vw !important;
    max-width: 60vw !important;
}

:deep(.lab-dialog .p-dialog-content) {
    overflow-x: hidden;
}

@media (max-width: 768px) {
    :deep(.lab-dialog.p-dialog) {
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        margin: 0 !important;
        border-radius: 0 !important;
    }
    :deep(.lab-dialog .p-dialog-content) {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 0 !important;
    }
    :deep(.lab-dialog .p-dialog-header) {
        border-radius: 0 !important;
    }
}
</style>
