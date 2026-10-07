<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>


        <div class="card">
            <div class="card-header">
                <!-- <Select v-model="form.jenisTindakan" :options="opsiJenisTindakan"
                    optionLabel="label" optionValue="value"
                    placeholder="Pilih jenis tindakan" style="width: 100%; max-width: 320px;"
                    @change="onJenisTindakanChange" /> -->
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-md-6">
                        <Select style="width: 100%;" v-model="form.tindakanSelected" :options="fact"
                            optionLabel="NAMA" :filter="true" filterPlaceholder="Cari tindakan..."
                            placeholder="-- Pilih tindakan --"
                            @change="additemTindakanSelect($event)" />
                    </div>
                </div>

            </div>
        </div>
        <!-- {{ riwayat_tindakan }} -->
        <div class="card">
            <div class="card-body">
                <div class="card-body  table-sm table-responsive p-0" style="height: 600px; ">
                    <div class="field col-md-10 col-sm-6 col-12 mt-3">
                        <table class="table table-sm tb-sm table-bordered table-striped small-table">
                            <thead>
                                <tr>
                                    <th style="width: 10em;">KODE TINDAKAN</th>
                                    <th>TINDAKAN</th>
                                    <th style="width:10em;">TGL</th>
                                    <th>DESKRIPSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tindakan, index) in form.obatselected" :key="index">
                                    <td>
                                        <input class="form-control form-control" disabled v-model="tindakan.BARCODE"  type="text">
                                    </td>
                                    <td>
                                        <p><strong>{{ tindakan.NAMA }}</strong> </p>
                                    </td>
                                    <td>
                                        <DatePicker v-model="form.startdate" class="text-sm" :showIcon="true"
                                            dateFormat="dd/mm/yy"
                                            placeholder="Tanggal" style="width: 20em;" />
                                        <br>
                                        <br>

                                        <span v-if="tindakan.AUTH=='1'">
                                            <qrcode-vue :value="tindakan.AUTH_BY" :size="50" level="H">
                                            </qrcode-vue>
                                            <small>{{ tindakan.AUTH_BY }}</small><br>

                                        </span>
                                        <span v-if="tindakan.AUTH=='0'">
                                            <Button icon="pi pi-lock-open" @click="call_oto(tindakan.RECEIPT_NO,8)"
                                            class="p-button-rounded p-button-warning" />
                                        </span>
                                    </td>
                                    <td>
                                        <Editor v-model="tindakan.REMARK_ITEM" editorStyle="height: 300px" />
                                    </td>
                                    <td>
                                        <Button icon="pi pi-times" @click="voidtindakan(index,tindakan)"
                                            class="p-button-rounded p-button-danger p-button-text" />
                                        <br>
                                        <br>
                                        <br>


                                        <br>
                                        <br>
                                        <br>
                                        <Button icon="pi pi-save" @click="updateTindakan(tindakan)"
                                            class="p-button-rounded p-button-primary" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"
            class="container_modal" :modal="true">
            <!-- <otorisasi-form @getvalue="handleValue" :mode=2 :noregister="soapId"></otorisasi-form>  -->
            <otorisasi-form @getvalue="handleValue" :mode=mode_otto :noregister="id_inputan"></otorisasi-form>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Editor from 'primevue/editor';
    import QrcodeVue from 'qrcode.vue';
    import { EventBus } from '../bus';
    export default {
        components: {
            Loading,
            Editor,
            QrcodeVue
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                isEditMode: false,
                opsiJenisTindakan: [
                    { label: 'Semua Tindakan', value: 17 },
                    { label: 'Tindakan Medis', value: 15 },
                ],
                form: {
                    NOPENDAFTARAN: '',
                    startdate: '',
                    enddate: '',
                    breakdown: 0,
                    obatselected: [],
                    arr_tindakan: [],
                    modesales: '',
                    mode: '',
                    itembarang: '',
                    jenisTindakan: 17,
                },
                riwayat_tindakan: [],
                isLoading: false,
                fullPage: true,
                seq_number: 0,
                showOtorisasi: false,
                id_inputan: 0,
                mode_otto: 0
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            this.getmaster_tindakan(this.form.jenisTindakan);
            this.riwyat_rincian_tindakan();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async getmaster_tindakan(mode) {
                //this.isLoading = true;
                this.form.mode = mode
                await axios.post('/getdata_obat_baseparam', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                        //console.log(this.fact);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            addTindakan(barang) {
                console.log(barang)
                this.seq_number = this.seq_number + 1;
                var currentDate = new Date();

                this.form.obatselected.push({
                    BARCODE: barang.BARCODE,
                    ID_BARANG: barang.BARCODE,
                    NAMA: barang.NAMA,
                    SATUAN: barang.SATUAN,
                    RECEIPT_NO: '',
                    HARGA: barang.HARGAJUAL,
                    POTONGSTOCK: 0,
                    TOTAL_ITEM: 0,
                    QTY_RACIK: 0,
                    PERSEDIAAN: barang.QUNATITY,
                    SATUAN_RACIK: barang.SATUAN_RACIK,
                    MEREK: barang.SATUAN,
                    TOTALAMOUNT: 0,
                    DISCOUNT: 0,
                    ITEMSEQNO: this.seq_number,
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
                    JML_RACIK: barang.JML_RACIK,
                    AUTH:0,
                    AUTH_BY:'',
                    TANGGAL_TRANS: this.formattedDateTime()
                });

                this.simpan_sales();

            },
            onJenisTindakanChange() {
                this.fact = [];
                this.form.tindakanSelected = null;
                this.form.itembarang = '';
                this.getmaster_tindakan(this.form.jenisTindakan);
            },
            additemTindakanSelect(e) {
                if (e.value) {
                    this.addTindakan(e.value);
                    this.$nextTick(() => { this.form.tindakanSelected = null; });
                }
            },
            additemTindakan(e) {
                //console.log(e.value);
                this.addTindakan(e.value)
                this.form.tindakanSelected = '';
            },

            call_oto(soapid, mode_otto) {
                this.id_inputan = soapid;
                this.mode_otto = mode_otto
                this.showOtorisasi = true;
            },
            call_form() {
                this.showOtorisasi = true;
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if (this.responvalue == 200) {
                    this.showOtorisasi = false;
                    this.riwyat_rincian_tindakan();
                }
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
            open(type, message) {
                EventBus.$emit('show-alert', { type, message });
            },

            hapusitem_barang(index) {
                this.form.obatselected.splice(index, 1);
            },

            async riwyat_rincian_tindakan() {
                this.isLoading = true;
                var currentDate = new Date();
                this.form.waktu_masuk = currentDate;
                this.form.DATA_SINGKAT = this.datapasien.DATA_SINGKAT;
                this.form.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;

                await axios.post('/rincian_tindakan', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.riwayat_tindakan = response.data.response
                            this.form.obatselected = response.data.response;

                            for (let i = 0; i < this.form.obatselected.length; i++) {
                                this.seq_number = this.seq_number + 1;
                                this.form.obatselected[i].ITEMSEQNO = this.seq_number;
                                this.form.obatselected[i].FLAG = "EXISTING_ITEM";
                                this.form.obatselected[i].TOTALAMOUNT = 0;
                            }

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
            async simpan_sales() {

                //this.isLoading = true;
                var currentDate = new Date();
                this.form.waktu_masuk = currentDate;
                this.form.DATA_SINGKAT = this.datapasien.DATA_SINGKAT;
                this.form.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                this.form.modesales = 'REG'
                this.form.DPJP = this.datapasien.NAMADOKTER;
                this.form.NOMR = this.datapasien.NOMR;
                this.form.RECEIPT_NO = '',
                    this.form.POLI_RUANG = this.datapasien.POLI;
                this.form.OBAT_OBATAN = 4;
                this.form.id_ruangan = this.datapasien.KODERUANGAN;

                await axios.post('/kirimpermintaan_obat', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.isLoading = false
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Tindakan telah di tambahkan " + response.data.metadata
                                .Receipt);
                            this.form.RECEIPT_NO = response.data.metadata.Receipt;

                            for (let i = 0; i < this.form.obatselected.length; i++) {
                                if (this.form.obatselected[i].ITEMSEQNO == this.seq_number) {
                                    this.form.obatselected[i].RECEIPT_NO = this.form.RECEIPT_NO;
                                    this.form.obatselected[i].FLAG = "EXISTING_ITEM";
                                    this.form.obatselected[i].TOTALAMOUNT = 0;
                                }
                            }

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


            async updateTindakan(param) {
                param.noregister = this.datapasien.NOPENDAFTARAN;
                this.isLoading = true
                await axios.post('/updateItemTindakan', param)
                    .then(response => {
                        console.log(response);
                        this.isLoading = false
                        if (response.status == 200) {
                            this.open("success", "Suksess");
                            //this.get_riwayat();
                        } else {

                            this.open("warning", "Gagal menyimpan");
                        }
                        console.log(response.data.metadata);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async voidtindakan(index, param) {
                //param.noregister =this.datapasien.NOPENDAFTARAN;
                this.isLoading = true
                await axios.post('/voidtindakan', param)
                    .then(response => {
                        console.log(response);
                        this.isLoading = false
                        if (response.status == 200) {
                            this.hapusitem_barang(index);
                            this.open("success", "Suksess");
                            //this.get_riwayat();
                        } else {

                            this.open("warning", "Gagal menyimpan");
                        }
                        console.log(response.data.metadata);
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
