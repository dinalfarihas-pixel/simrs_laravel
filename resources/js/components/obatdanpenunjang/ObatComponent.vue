<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <ConfirmDialog group="terimaObat"></ConfirmDialog>
            <Dialog header="Daftar" v-model:visible="form_kco"
           :modal="true" :style="{ margin: '0', borderRadius: '0', width: '70vw', height: '70vh' }">
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
                                    <!-- <th>HARGA</th> -->

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in detils_obat" :key="k">
                                    <td>{{ k+1 }}</td>
                                    <td>{{row.SUB_BARCODE}}</td>
                                    <td>{{row.BARCODE}}</td>
                                    <td>{{row.NAMABARANG }}</td>
                                    <td>{{row.QTY}}<span v-if="row.KETERANGAN"
                                            class="badge badge-error">{{ row.KETERANGAN }}</span></td>
                                    <td>{{row.SATUAN }}</td>
                                    <!-- <td>{{row.HARGA}}</td> -->
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
            <Dialog header="Daftar Obat-obatan" v-model:visible="displayConfirmation" :modal="true" class="obat-dialog" :style="{ width: '70vw' }">
                <div class="row">
                    <div class="col-md-6">
                        <span class="p-input-icon-left mb-2">
                            <input type="text" class="form-control" v-model="form.itembarang" ref="inputBox"
                                @input="getdataobat(10)" placeholder="Search" />
                        </span>
                        <Button label="" class="mb-2" :loading="isLoading" icon="pi pi-search"
                            @click="getdataobat(10)" />
                    </div>
                    <div class="col-md-6 d-flex align-items-center justify-content-end gap-2">
                        <label class="mb-0 text-nowrap">Pilih lokasi:</label>
                        <Select v-model="form.lokasiSelected" @change="saveLokasi" :options="lokasi_arr"
                            optionLabel="DISPLAY2" placeholder="Tujuan Permintaan" style="width: 200px" />
                    </div>
                </div>

                <div v-if="form.itembarang.length <= 2" class="recent-obat-section">
                    <div class="recent-obat-hdr">
                        <span class="recent-obat-hdr-left">
                            <i class="pi pi-star-fill"></i>
                            Sering Diresepkan di Unit Ini
                        </span>
                        <span v-if="loadingRecent" class="recent-loading">
                            <i class="pi pi-spin pi-spinner"></i> Memuat…
                        </span>
                    </div>
                    <div v-if="!loadingRecent && list_recent_obatan.length === 0" class="recent-obat-empty">
                        <i class="pi pi-inbox"></i> Belum ada data
                    </div>
                    <div class="recent-obat-grid">
                        <div
                            v-for="item in list_recent_obatan"
                            :key="item.BARCODE"
                            class="recent-chip"
                            @click="addRecentObat(item)"
                        >
                            <div class="recent-chip-name">{{ item.NAMABARANG }}</div>
                            <div class="recent-chip-price" v-if="item.HARGA > 0">
                                {{ formatRupiah(item.HARGA) }}
                            </div>
                        </div>
                    </div>
                </div>

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
                                    <th>SUB BARCODE</th>
                                    <th>BARCODE</th>
                                    <th>GROUPING</th>
                                    <th>NAMA</th>
                                    <th>PERSEDIAAN</th>
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(row,k) in fact" :key="k">
                                <tr v-if="row.ARSIPKAN == 0">
                                    <td>{{ k+1 }}</td>
                                    <td>{{row.SUB_BARCODE}}</td>
                                    <td>{{row.BARCODE}}</td>
                                    <td>{{row.GROUPING }}</td>
                                    <td>{{row.NAMA }}
                                        <!-- Variation 1: With icon -->
                                        <Tag v-if="row.ARSIPKAN == 1" value="Tidak aktiv" severity="warning"
                                            icon="pi pi-times-circle">
                                        </Tag>

                                    </td>
                                    <td>{{row.QUNATITY}}</td>
                                    <td> <Button label="" class="btn p-btn-sm" :disabled="row.ARSIPKAN==1"
                                            @click="additem_barang(row)" icon="pi pi-plus" /></td>
                                </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template #footer>
                    <!-- <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" /> -->
                    <Button label="Tutup" icon="pi pi-times" @click="closeConfirmation" autofocus />
                </template>
            </Dialog>

            <div class="row">
                <div class="col-sm-3">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h3 class="card-title">
                                <span>Riwayat</span>
                            </h3>
                        </div>
                        <div class="card-body" style="height: 400px; overflow-y: auto;">
                            <div class="card" v-for="(data,index) in riwayat_obat">
                                <div class="card-header">
                                    <h5 class="card-title">
                                        <Button :label="`${tanggalKirimOrDefault(data)} - ${data.JAM_KIRIM ?? data.JAM}`" :loading="data.loadinngItem"
                                            @click="getdetail_sales(data)" class="p-button-text" />
                                    </h5>
                                    <div class="card-tools">
                                        <Button label="" @click="void_sales(data.RECEIPT_NO)"
                                            class="p-button-text p-button-danger" icon="pi pi-times" />
                                    </div>

                                </div>
                                <div class="card-body">
                                    <address>
                                        {{data.RECEIPT_NO}} <br>
                                        <!-- {{data.LOKASI}} <br> -->
                                        <strong>{{data.DPJP}}</strong> <br>
                                    </address>
                                        <strong> RUANG: </strong>{{ data.POLI_RUANG}} <br>

                                    <span v-if="data.TELAH_DIKIRIM==1">
                                        Status:
                                        <!-- <Button icon="pi pi-check" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-rounded p-button-success p-button-outlined" /> -->
                                        <Tag class="mr-2" severity="success">Terkirim ke {{ data.LOKASI }}</Tag>

                                    </span>
                                    <span v-if="data.TELAH_DIKIRIM==0">
                                        Status : <Tag class="mr-2" severity="warn" value="blm terkirim"></Tag>
                                        <Button icon="pi pi-send" severity="warn" class="p-button-sm"
                                            @click="kirim_resep(data.RECEIPT_NO)" />
                                    </span>
                                    <button v-if="data.TELAH_DIKIRIM==1" type="button"
                                        class="btn btn-block btn-outline-danger btn-sm w-100 mt-2"
                                        @click="confirmTerimaObat(data)"><span v-if="data.WAKTU_DITERIMA!=0">Terima :
                                            {{ data.WAKTU_DITERIMA }}</span> <span v-else>Konfirmasi Terima
                                            Obat</span></button>
                                    <!-- <Button icon="pi pi-check-circle" label="Konfirmasi Terima Obat"
                                       class="p-button-sm btn-outline-danger p-button-primary w-100 mt-2" /> -->
                                    <!-- <Button label="Yes" icon="pi pi-check" @click="addMessages" autofocus />  -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <div class="row" style="background-color: aliceblue;">
                                <div class="col-md-2">
                                    <h5>Permintaan Obat</h5>

                                </div>
                                <div class="col-md-10" style="text-align: right;">
                                    <label for="tanggal_resep">Tanggal Resep : </label>
                                    <Calendar id="tanggal_resep" v-model="form.waktu_masuk" :showTime="true"
                                        :showSeconds="true" />
                                    <Button label="Jam skrg" align="" @click="set_datetime_now" icon="pi pi-stopwatch"
                                        class="p-button p-btn-sm " />
                                    <Button label="Template" class="p-button-text p-button-default"
                                        icon="pi pi-external-link" @click="calltemplatObat()" />
                                </div>
                            </div>
                        </div>
                        <div class="card-body table-sm table-responsive p-10">

                            <!-- <Select v-model="form.selectedjns_resep" style="width: 6em;" @change="set_jenisresep"   :options="jenisresep" /> -->

                            <Button label="Obat Racikan" class="p-button p-button-sm p-button-success"
                                icon="pi pi-chart-pie" @click="add_modal_racik()" />

                            <Select v-if="form.selectedjns_resep=='RR'" v-model="form.bentuk_racik_selected"
                                style="width: 12em;" @change="set_jenisresep" class="mr-3" :options="bentuk_racik" />

                            <label v-if="form.selectedjns_resep=='RR'" class="mr-3">Jml Kemasan : </label>
                            <!-- <InputNumber  id="minmax" v-model="form.jml_kemasan"
                                autocomplete="off"  :minFractionDigits="0"
                                mode="integer" :min="0" :max="200" />  -->
                            <InputNumber v-if="form.selectedjns_resep=='RR'" id="minmax" v-model="form.jml_kemasan"
                                autocomplete="off" mode="decimal" :min="0" :max="200" />

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
                                    <Select v-model="form.lokasiSelected" @change="saveLokasi" class="mr-2"
                                        :options="lokasi_arr" optionLabel="DISPLAY2"
                                        placeholder="Tujuan Permintaan" />

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

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(selected,index) in form.obatselected" :key="index">
                                        <td><Button icon="pi pi-times" @click="confirm3(index,selected.NAMA,selected)"
                                                class="p-button-rounded p-button-danger p-button-text" /></td>
                                        <td>{{ index+1 }}</td>
                                        <td>
                                            {{ selected.JENIS_R }}
                                        </td>
                                        <td> {{selected.BARCODE}}</td>
                                        <td>
                                            <span v-if="selected.JENIS_RESEP=='RR'">
                                                <InputText type="text" class="form-control" style="width: 100%;"
                                                    v-model="selected.NAMA" placeholder="Satuan" />
                                            </span>
                                            <span v-else>
                                                {{selected.NAMA}}
                                            </span>

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
                                                <InputNumber id="minmax" v-model="selected.QTY" autocomplete="off"
                                                    @input="inputqtyobat(index)" :minFractionDigits="2" mode="decimal"
                                                    :min="0" :max="200" />
                                            </span>

                                        </td>
                                        <td>{{selected.SATUAN}}</td>
                                        <td>
                                            <span v-if="selected.JENIS_R=='R/'">
                                                <!-- <Select v-model="form.remark[index]" :filter="true" :key="index"
                                                    :showClear="true" optionLabel="REMARK" @change="setdosis(index)"
                                                    :options="carapakai_obat" /> -->
                                                <InputText type="text" class="form-control" style="width: 100%;"
                                                    v-model="selected.REMARK_ITEM"
                                                    placeholder="Dosis/Cara Pakai (Ketik bebas)" />
                                            </span>

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
                                    <Button label="Simpan" :loading="isLoading" icon="pi pi-check" @click="simpan_sales" class="ml-5"
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



            <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"
                class="container_modal" :modal="true">
                <!-- <otorisasi-form @getvalue="handleValue" :mode=2 :noregister="soapId"></otorisasi-form>  -->
                <otorisasi-form @getvalue="responsOtorisasi" :mode=11 :noregister="soapId"></otorisasi-form>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
                </template>
            </Dialog>

            <Dialog header="Obat Pulvis" v-model:visible="modalracik" :containerStyle="{width: '60vw'}" :modal="true">

                <obat-pulvis ref="obat_pulvis"></obat-pulvis>

                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="modalracik=false" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="addpulvisToMainSelectedItem()" autofocus />
                </template>
            </Dialog>

            <Dialog
                header="Template Obat"
                v-model:visible="ShowtemplateObat"
                :containerStyle="{ width: '90vw', maxWidth: '1200px' }"
                :modal="true"
            >
                <div style="margin: -16px; overflow: hidden;">
                    <templateObat @getvalue="handleValue"></templateObat>
                </div>
                <template #footer>
                    <button class="btn btn-default btn-sm" @click="ShowtemplateObat = false">
                        <i class="fas fa-times mr-1"></i> Tutup
                    </button>
                </template>
            </Dialog>
        </div>
    </section>
</template>

<script>
      import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import InputNumber from 'primevue/inputnumber';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Tag from 'primevue/tag';
    import Checkbox from 'primevue/checkbox';
    import InputText from 'primevue/inputtext';
    import AutoComplete from 'primevue/autocomplete';
    import {
        toPlainObject
    } from 'lodash';
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
                loadinngItem: false,
                showOtorisasi: false,
                responvalue: 0,
                soapId: "0",
                fact: [],
                jenisresep: ["RT", "RR"],
                bentuk_racik: ['PUYER', 'SALAP', 'SIRUP'],
                carapakai_obat: [],
                data_kco: [],
                modalracik: false,
                lokasi_arr: [],
                ShowtemplateObat: false,
                selectedPulvis: {
                    nama: '',
                    item: []
                },
                itemPulvisTemp: {
                    nama: '',
                    item: []
                },
                list_recent_obatan: [],
                loadingRecent: false,
                form: {
                    startdate: '',
                    isObatPulang: false,
                    jenisresep: '',
                    enddate: '',
                    itembarang: '',
                    obatselected: [],
                    isPulvis: false,
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
                    dosis_racik: '',
                    breakdown:0
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
            this.form.waktu_masuk = currentDate;

            const saved = localStorage.getItem('lokasiSelected');
            if (saved) {
                this.form.lokasiSelected = JSON.parse(saved);
            }
        },
        created() {
            //this.getdataobat();
            //this.get_caraminum();

            this.get_riwayat();
            this.get_lokasi();
        },
        watch: {
            displayConfirmation(val) {
                if (val && this.list_recent_obatan.length === 0) {
                    this.getRecentObat();
                }
            }
        },

        methods: {
            tanggalKirimOrDefault(data) {
                const tgl = data.TANGGAL_KIRIM;
                if (!tgl || String(tgl).includes('1970')) return data.SHORTDATE;
                return tgl;
            },
            fetchData() {

            },
             saveLokasi(value) {

                localStorage.setItem('lokasiSelected', JSON.stringify(value.value));
                this.form.obatselected = [];
                this.fact=[];
               // localStorage.clear();
                // const saved = localStorage.getItem('lokasiSelected');
                // const lokasi = JSON.parse(saved);
                // console.log(lokasi)
            },
            set_datetime_now() {
                var currentDate = new Date();
                this.form.waktu_masuk = currentDate;
                //console.log(this.form.startdate);
            },
            confirmTerimaObat(data) {

                if (data.WAKTU_DITERIMA != 0) {
                    this.open("success", "Obat sudah di terima pada " + data.WAKTU_DITERIMA);
                    return;
                }

                this.$confirm.require({
                    group: 'terimaObat',
                    message: 'Apakah anda akan konfirmasi obat telah di terima?',
                    header: 'Konfirmasi',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        //this.konfirmasiTerimaObat(data)
                        this.soapId = data.RECEIPT_NO,
                            this.showOtorisasi = true;
                    },
                    reject: () => {
                        this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item");
                    }
                });
            },
            responsOtorisasi(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                // console.log("respon otorisasi : " + this.responvalue);
                if (this.responvalue == 200) {
                    this.showOtorisasi = false;
                    this.get_riwayat();
                }
            },
            set_jenisresep(e) {
                console.log(e.value)
            },
            calltemplatObat() {
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
                        // console.log(this.lokasi_arr);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async konfirmasiTerimaObat(data) {
                this.isLoading = true

                const param = {
                    noreceipt: data.RECEIPT_NO,
                }
                //this.param.RECEIPT_NO = this.datapasien.NOPENDAFTARAN;
                await axios.post('/konfirmasiTerimaObat', param)
                    .then(response => {
                        // console.log(response.data);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
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
                        //console.log(response.data);
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
                this.param.mode=2;
                await axios.post('/getheader_sales_v2', this.param)

                    .then(response => {

                        console.log(response.data)

                        this.riwayat_obat = response.data.response
                        this.riwayat_obat = this.riwayat_obat.filter(x => x.OBAT_OBATAN == 1)
                        //console.log(response.data.response)
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

                var data = this.$refs.obat_pulvis.get_value();
                this.modalracik = false;

                let sub_item_seqno = 0;

                for (let i = 0; i < this.form.obatselected.length; i++) {
                    if (this.form.obatselected[i].JENIS_R == 'R/') {
                        sub_item_seqno = this.form.obatselected[i].SUBITEMSEQNO;
                    }
                }

                sub_item_seqno = sub_item_seqno + 1;

                this.form.obatselected.push({
                    BARCODE: "00000",
                    AS_PARENT: 1,
                    POTONGSTOCK: 0,
                    JENIS_R: 'R/',
                    NAMA: data.nama,
                    SATUAN: data.satuan,
                    FLAG: "NEW LINE",
                    ITEM_RACIKAN: '',
                    QTY: data.qty,
                    HARGA: 0,
                    SATUAN_RACIK: data.satuan,
                    JENIS: '',
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    JML_RACIK: 0,
                    TOTALAMOUNT: 0,
                    DISCOUNT: 0,
                    ITEMSEQNO: '',
                    SUBITEMSEQNO: sub_item_seqno,
                    STATUS: '',
                    DOSIS: '',
                    STATUS_PROGRESS: "M",
                    SUB_BARCODE: "00000",
                    OBAT_OBATAN: 1,
                    SAT_RACIK: '',
                    MEREK: '',
                    FLAG: "NEW LINE",
                    JENIS: '',
                    JENIS_RESEP: "RR",
                    ID_LOKASI: 0,
                    REMARK_ITEM: '',
                    JML_RACIK: '',
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                console.log("total lenght obat racik")
                // console.log(data.item.length);
                // console.log(data.item);
                for (let i = 0; i < data.item.length; i++) {
                    this.form.obatselected.push({
                        BARCODE: "00000",
                        AS_PARENT: 0,
                        JENIS_R: "",
                        POTONGSTOCK: 1,
                        jenisresep: '',
                        NAMA: data.item[i].nama,
                        FLAG: "NEW LINE",
                        ITEM_RACIKAN: '',
                        QTY: 0,
                        HARGA: 0,
                        SATUAN_RACIK: data.satuan,
                        JENIS: '',
                        ID_LOKASI: 0,
                        REMARK_ITEM: '',
                        JML_RACIK: 0,
                        TOTALAMOUNT: 0,
                        DISCOUNT: 0,
                        ITEMSEQNO: '',
                        SUBITEMSEQNO: sub_item_seqno,
                        STATUS: '',
                        DOSIS: '',
                        STATUS_PROGRESS: "M",
                        SUB_BARCODE: "00000",
                        OBAT_OBATAN: 1,
                        AS_PARENT: 0,
                        SAT_RACIK: '',
                        MEREK: '',
                        FLAG: "NEW LINE",
                        JENIS: '',
                        JENIS_RESEP: "RR",
                        ID_LOKASI: 0,
                        REMARK_ITEM: '',
                        JML_RACIK: '',
                        TANGGAL_TRANS: this.formattedDateTime()
                    });

                }
                // this.setitemseqNo();

                // this.modalracik = false;
            },
            add_modal_racik() {
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

            async getdetail_sales(data) {
                data.loadinngItem = true
                this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.param.RECEIPT_NO = data.RECEIPT_NO;
                await axios.post('/getdetils_sales', this.param)
                    .then(response => {
                        this.detils_obat = response.data.response
                        if (this.detils_obat[0].OBAT_PULANG == 1) {
                            this.param.UpdateisObatPulang = true;
                        } else {
                            this.param.UpdateisObatPulang = false;
                        }

                        data.loadinngItem = false
                        this.details_confirmation = true;
                    })
                    .catch(error => {
                        console.log(error)
                        data.loadinngItem = false
                    })
                    .finally(() => data.loadinngItem = false)
            },
            setLabel(item) {
                return item.name;
            },
            inputChange(text) {

            },

            additem_barang(barang) {

                let sub_item_seqno = 0;
                for (let i = 0; i < this.form.obatselected.length; i++) {
                    if (this.form.obatselected[i].JENIS_R == 'R/') {
                        sub_item_seqno = this.form.obatselected[i].SUBITEMSEQNO;
                    }
                }

                var currentDate = new Date();
                this.form.obatselected.push({
                    BARCODE: barang.BARCODE,
                    ID_BARANG: barang.BARCODE,
                    JENIS_R: "R/",
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
                    SUBITEMSEQNO: sub_item_seqno,
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
                    JENIS_RESEP: "RT",
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

                //this.form.obatselected[index].QTY = this.form.qty_selected[index];
                this.form.obatselected[index].TOTALAMOUNT = this.form.obatselected[index].QTY * this.form.obatselected[
                    index].HARGA;

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
                    if (this.form.obatselected[i].JENIS_R === null) {
                        this.form.obatselected[i].JENIS_R = "";
                    }
                    if (this.form.obatselected[i].JENIS_R == "R/") {
                        if (this.form.obatselected[i].QTY == 0 || this.form.obatselected[i].QTY == "") {
                            this.open("warning", "Gagal tersimpan, Data Quantity untuk jumlah item " + this.form
                                .obatselected[i].NAMA);
                            isvalid = false;
                        }
                    } else {

                    }
                }
                return isvalid;
            },
            async simpan_sales() {

                this.isLoading = true;
                var currentDate = new Date();
                //this.form.waktu_masuk = currentDate;
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
                      console.log(response.data)
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
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            kirimpermintaan() {

            },
            hapusitem_barang(index, row) {
                if (row.JENIS_R == 'R/' && row.JENIS_RESEP == 'RR') {
                    for (let i = this.form.obatselected.length - 1; i >= 0; i--) {
                        if (row.SUBITEMSEQNO === this.form.obatselected[i].SUBITEMSEQNO) {
                            this.form.obatselected.splice(i, 1);
                        }
                    }
                } else {
                    this.form.obatselected.splice(index, 1);
                    this.form.qty_selected.splice(index, 1);
                    this.form.remark.splice(index, 1);
                }

            },
            async getdataobat(mode) {

                if (!this.form.lokasiSelected || this.form.lokasiSelected == null || !this.form.lokasiSelected.ID) {
                    this.open("warning", "Anda belum memilih lokasi");
                    return;
                }
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
                this.form.breakdown = 1;
                this.fact=[];

                await axios.post('/getdata_obat_baseparam', this.form)
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
            openConfirmation() {
                this.displayConfirmation = true;
            },
            closeConfirmation() {
                this.displayConfirmation = false;
            },
            confirm3(index, namaobat, row) {
                this.hapusitem_barang(index, row);
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
            // open(type, message) {
            //     this.$toast.open({
            //         message: message,
            //         position: 'top-right',
            //         type: type,
            //         duration: 3000,
            //         dismissible: true
            //     })
            // },

            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            async handleValue(data) ///terima nila dari funtion data obat
            {
                // Tutup dialog template segera agar user tidak menunggu di layar yang
                // terlihat diam — proses penambahan item berjalan di halaman utama,
                // yang sudah punya overlay loading sendiri (isLoading).
                this.ShowtemplateObat = false;
                this.isLoading = true;

            const notFoundItems = []; // simpan nama obat yang tidak ditemukan
            const nonaktifItems = []; // simpan nama obat yang arsipkan = 1 (non aktif, tidak bisa dipilih)

            for (let i = 0; i < data.detils.length; i++) {
                const item = data.detils[i];
                const barcode = item?.barcode;
                const nama = item?.nama || `Item ke-${i + 1}`;

                if (item?.arsipkan == '1') {
                    nonaktifItems.push(nama);
                    continue;
                }

                if (!barcode) {
                    notFoundItems.push(nama);
                    continue;
                }

                console.log(nama);

                this.form.barcode = barcode;
                await this.getdataobat(3);

                const barang = this.fact?.[0];
                if (!barang) {
                    notFoundItems.push(nama);
                    continue;
                }

                this.additem_barang(barang);
            }

            // Tampilkan pesan jika ada item non aktif yang dilewati
            if (nonaktifItems.length > 0) {
                this.open('warning', `${nonaktifItems.length} item non-aktif dilewati: ${nonaktifItems.join(', ')}`);
            }

            // Tampilkan pesan jika ada item yang tidak ditemukan
            if (notFoundItems.length > 0) {
                this.open('warning', `${notFoundItems.length} item sudah tidak tersedia: ${notFoundItems.join(', ')}`);
            }

                this.isLoading = false;
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
                        if(response.data.metadata.code == "200"){
                            this.open("success", response.data.metadata.message);
                            this.get_riwayat();
                        }
                        else
                        {
                            this.open("warning", response.data.metadata.message);
                        }

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
            },

            addRecentObat(item) {
                if (!this.form.lokasiSelected || !this.form.lokasiSelected.ID) {
                    this.open("warning", "Anda belum memilih lokasi");
                    return;
                }
                this.additem_barang({
                    BARCODE: item.BARCODE,
                    NAMA: item.NAMABARANG,
                    SATUAN: item.SATUAN,
                    HARGAJUAL: item.HARGA || 0,
                    POTONGSTOCK: 0,
                    QTY_RACIK: 0,
                    QUNATITY: 0,
                    SATUAN_RACIK: '',
                    SUB_BARCODE: item.BARCODE,
                    JENIS: '',
                    JML_RACIK: 0,
                });
                this.open("success", item.NAMABARANG + " berhasil ditambahkan ke daftar resep.", "Obat Ditambahkan");
            },

            formatRupiah(amount) {
                if (!amount || isNaN(amount)) return 'Rp 0';
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                }).format(amount);
            },

            getTodayStr() {
                const d = new Date();
                const y = d.getFullYear();
                const m = ('0' + (d.getMonth() + 1)).slice(-2);
                const day = ('0' + d.getDate()).slice(-2);
                return `${y}-${m}-${day}`;
            },

            async getRecentObat() {

                const kodePoli = this.datapasien?.KODERUANGAN || 'UNKNOWN';
                const RECENT_OBAT_KEY = `recent_obat_poly_${kodePoli}`;
                const RECENT_OBAT_DATE_KEY = `recent_obat_poly_date_${kodePoli}`;

                try {
                    this.loadingRecent = true;
                    const today = this.getTodayStr();
                    const savedDate = localStorage.getItem(RECENT_OBAT_DATE_KEY);

                    if (savedDate === today) {
                        const cached = localStorage.getItem(RECENT_OBAT_KEY);
                        if (cached) {
                            this.list_recent_obatan = JSON.parse(cached);
                            return;
                        }
                    }

                    localStorage.removeItem(RECENT_OBAT_KEY);
                    localStorage.removeItem(RECENT_OBAT_DATE_KEY);

                    const response = await axios.post('/get_recent_obat_poly', {
                        kode_poli: kodePoli,
                        limit: '20',
                    });

                    if (response.data?.code === 200) {
                        this.list_recent_obatan = response.data.result || [];
                        localStorage.setItem(RECENT_OBAT_KEY, JSON.stringify(this.list_recent_obatan));
                        localStorage.setItem(RECENT_OBAT_DATE_KEY, today);
                    }
                } catch (error) {
                    console.error('Gagal memuat recent obat:', error);
                } finally {
                    this.loadingRecent = false;
                }
            },

        },
    }

</script>

<style scoped>
/* Paksa dialog template obat selalu center terhadap full viewport,
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

:deep(.obat-dialog.p-dialog) {
    width: 60vw !important;
    max-width: 60vw !important;
}
:deep(.obat-dialog .p-dialog-content) {
    overflow-x: hidden;
}

.recent-obat-section {
    margin-bottom: 14px;
    padding: 12px 14px;
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    border: 1px solid #fde68a;
    border-radius: 8px;
}
.recent-obat-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
}
.recent-obat-hdr-left {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #92400e;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
.recent-obat-hdr-left .pi-star-fill { color: #f59e0b; font-size: 13px; }
.recent-loading {
    font-size: 11px;
    color: #92400e;
    display: flex;
    align-items: center;
    gap: 4px;
}
.recent-obat-empty {
    font-size: 12px;
    color: #a16207;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 0;
}
.recent-obat-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}
.recent-chip {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 6px 10px;
    background: #fff;
    border: 1px solid #fcd34d;
    border-radius: 8px;
    cursor: pointer;
    min-width: 130px;
    max-width: 200px;
    transition: all 0.15s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.recent-chip:hover {
    background: #fef9c3;
    border-color: #f59e0b;
    box-shadow: 0 2px 8px rgba(245,158,11,0.2);
    transform: translateY(-1px);
}
.recent-chip:active { transform: translateY(0); }
.recent-chip-name {
    font-size: 11px;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.35;
    word-break: break-word;
}
.recent-chip-price {
    font-size: 11px;
    font-weight: 700;
    color: #16a34a;
    margin-top: 2px;
}

@media (max-width: 768px) {
    :deep(.obat-dialog.p-dialog) {
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        margin: 0 !important;
        border-radius: 0 !important;
    }
    :deep(.obat-dialog .p-dialog-content) {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 0 !important;
    }
    :deep(.obat-dialog .p-dialog-header) {
        border-radius: 0 !important;
    }
}
</style>

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
