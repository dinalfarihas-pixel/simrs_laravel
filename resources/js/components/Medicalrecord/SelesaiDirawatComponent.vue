<template>
    <section class="content">
        <div class="container-fluid">

            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-warning card-outline elevation-0">
                        <div class="card-header" style="text-align: center;">
                            <b>CARA KELUAR</b>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <div class="field-radiobutton">
                                    <RadioButton id="Pulang" name="cara_keluar" value=1 v-model="form.cara_keluar" />
                                    <label for="Pulang">Pulang Atas Persetujuan Dokter</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="paps" name="cara_keluar" value=3 v-model="form.cara_keluar" />
                                    <label for="paps">Pulang Paksa</label>
                                </div>
                                <div class="field-radiobutton" v-if="datapasien.JENISRAWAT=='JALAN'">
                                    <RadioButton id="ranap" name="cara_keluar" value=7 v-model="form.cara_keluar" />
                                    <label for="ranap">Rawat Inap</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="rujuk_ke_rs_lain" name="cara_keluar" value=2
                                        v-model="form.cara_keluar" />
                                    <label for="rujuk_ke_rs_lain">Rujuk Ke Rumah Sakit Lain</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="meninggal" name="cara_keluar" value=4 v-model="form.cara_keluar" />
                                    <label for="meninggal">Meninggal</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="batal_pulang" name="cara_keluar" value=6
                                        v-model="form.cara_keluar" />
                                    <label for="batal_pulang">Batalkan Pemulangan</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="tidak_jadi_berobat" name="cara_keluar" value=5
                                        v-model="form.cara_keluar" />
                                    <label for="tidak_jadi_berobat">Pasien Tidak Jadi Berobat</label>
                                </div>
                            </div>


                            <div class="col-md-2" v-if="form.cara_keluar==4">
                                <div class="field-radiobutton">
                                    <RadioButton id="meninggal_saat_tiba" name="kondisi_meniggal" value=1
                                        v-model="form.kondisi_meniggal" />
                                    <label for="meninggal_saat_tiba">Meninggal Saat Tiba</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="meninggal_sblm48jam" name="kondisi_meniggal" value=2
                                        v-model="form.kondisi_meniggal" />
                                    <label for="meninggal_sblm48jam">Meninggal &lt;= 48 Jam</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="meninggal_lebih_dari_48jam" name="kondisi_meniggal" value=3
                                        v-model="form.kondisi_meniggal" />
                                    <label for="meninggal_lebih_dari_48jam">Meninggal &gt; 48 Jam</label>
                                </div>
                            </div>

                            <div class="col-md-6" v-if="form.cara_keluar==1 ||  form.cara_keluar==2 || form.cara_keluar==3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="d-block mb-1">Tanggal &amp; Jam Pulang</label>
                                            <div class="d-flex align-items-center" style="gap:6px">
                                                <Calendar :showIcon="true" dateFormat="dd/mm/yy"
                                                    :yearNavigator="true" yearRange="2000:2030"
                                                    v-model="tgl_pulang"
                                                    placeholder="Tanggal"
                                                    appendTo="body"
                                                    />
                                                <input type="time" v-model="jam_pulang"
                                                    class="form-control form-control-sm"
                                                     />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="form.cara_keluar==1">
                                        <label for="tanggal">Apakah ada rencana kontrol.?</label><br />
                                        <Button label="Rencana Kontrol Ulang" align="" @click="bukaFormKontrol"
                                            icon="" class="p-button p-button-warning" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6" v-if="form.cara_keluar==5">
                                <div class="alert alert-warning" role="alert">
                                    <i class="pi pi-exclamation-triangle"></i>
                                    Jika pasien tidak jadi berobat, SEP akan <b>dihapus</b> dan <b>tidak dapat dikembalikan</b>.
                                </div>
                                <div class="form-group">
                                    <label for="alasan_tidak_jadi_berobat">Alasan Pasien Tidak Jadi Berobat</label><br />
                                    <Textarea id="alasan_tidak_jadi_berobat" v-model="form.alasan_tidak_jadi_berobat"
                                        style="width: 100%;" rows="5" cols="30" />
                                </div>
                            </div>

                            <div class="col-md-7" v-if="form.cara_keluar==4">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="sebab_meninggal">Sebab Kematian</label><br />
                                            <Textarea id="sebab_meninggal" v-model="form.sebab_meninggal"
                                                style="width: 100%;" rows="5" cols="30" />
                                            </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="tanggal">Jam & Tanggal Kematian</label><br />
                                            <Calendar id="time12" :showIcon="true"  dateFormat="dd/mm/yy"  :yearNavigator="true" yearRange="2000:2030" v-model="form.tanggal_kematian" :showTime="true"   />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
                <div class="col-md-12" v-if="form.cara_keluar==2" >
                    <div class="card card-warning card-outline elevation-0">
                        <div class="card-header"  style="text-align: center;">
                            <b>NAMA RUMAH SAKIT TUJUAN RUJUK</b>
                        </div>
                        <div class="card-body">
                            <label for="suhu"></label><br />
                            <input id="suhu" autocomplete="off" v-model="form.rs_tujuan_rujuk" class="form-control"
                                type="text" placeholder="Inputkan nama rumah sakit tujuan rujuk">
                        </div>
                    </div>
                </div>
                <div class="col-md-12" v-if="form.cara_keluar==7">
                    <div class="card card-warning card-outline elevation-0">
                        <div class="card-header"  style="text-align: center;">
                            <b>LANJUT KE RAWAT INAP</b>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="caradatang">Dokter Penanggung jawab pasien (Dokter Spesialis): </label><br />
                                        <Select v-model="form.dpjpSelected" :filter="true" :options="dokter.master" optionLabel="NAMADOKTER"
                                        dataKey="KDDOKTER" placeholder="" style="width: 20em;" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="caradatang">Waktu Masuk</label><br />
                                        <span class="p-input-icon-right">
                                        <Calendar style="width: 20em;"  dateFormat="dd/mm/yy" id="time12"
                                            v-model="form.waktu_masuk" :showTime="true" :showSeconds="true" />
                                            <i class="pi pi-time" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-10" v-if="form.cara_keluar==7">
                    <catatan-pemindahan-pasien ref="pemindahan_pasien" :datapasien ="datapasien" :mode=1></catatan-pemindahan-pasien>
                </div>

                <div class="col-md-12" v-if="form.cara_keluar!=7 && form.cara_keluar!=4 && form.cara_keluar!=6 && form.cara_keluar!=5">
                    <div class="card card-warning card-outline elevation-0">
                        <div class="card-header"  style="text-align: center;">
                            <b>KEADAAN PADA SAAT MENINGGALKAN FASKES</b>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="field-radiobutton">
                                        <RadioButton id="Belum sembuh" name="keadaan_saat_pulang" value=0
                                            v-model="form.keadaan_saat_pulang" />
                                        <label for="Belum sembuh">Belum sembuh</label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="Membaik" name="keadaan_saat_pulang" value=1
                                            v-model="form.keadaan_saat_pulang" />
                                        <label for="Membaik">Membaik</label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="Sembuh" name="keadaan_saat_pulang" value=2
                                            v-model="form.keadaan_saat_pulang" />
                                        <label for="Sembuh">Sembuh</label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="Cacat" name="keadaan_saat_pulang" value=3
                                            v-model="form.keadaan_saat_pulang" />
                                        <label for="Cacat">Cacat</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card card-warning card-outline elevation-0">
                        <div class="card-body">
                            <Button label="Simpan" align="" @click="onSimpanClick()"  icon="pi pi-save" class="p-button" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"    :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode=1 :noregister="datapasien.NOPENDAFTARAN"></otorisasi-form>
            <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
                </template>
        </Dialog>

        <Dialog header="Otorisasi" v-model:visible="showOtorisasiV2" :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form-v2 v-model:username="form.username" v-model:password="form.pwd"></otorisasi-form-v2>
            <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="showOtorisasiV2=false" class="p-button-text" />
                    <Button label="Simpan" icon="pi pi-check" @click="confirmOtorisasiThenSimpan()"
                        :disabled="!form.username || !form.pwd" autofocus />
                </template>
        </Dialog>

           <Dialog header="Rencana Kontrol Ulang" v-model:visible="showKontrolUlang" :containerStyle="{width: '30vw'}"  class="container_modal" :modal="true">
             <div style="height: 400px;">
                <div class="mt-3">
                    <label for="tanggal_kontrol">Tanggal Rencana Kontrol</label><br />
                    <Calendar style="width: 30em;"  dateFormat="dd/mm/yy" id="tanggal_kontrol"
                    v-model="rencanKontrol.tanggal" :showTime="false" :showSeconds="false" />
                    <i class="pi pi-time" /> <br>
                </div>
                <div class="mt-3">
                    <label for="pilihdokter">Pilih dokter</label><br />
                    <Select :disabled="isLoadingdokter" v-model="rencanKontrol.dokter" :filter="true" :options="dokter.master" optionLabel="NAMADOKTER"
                        placeholder="" style="width: 30em;" />
                    <label v-if="isLoadingdokter"> Memuat dokter.....</label>
                </div>

                <div class="mt-3">
                    <label for="pilihdokter">Pilih Poliklinik</label><br />
                    <Select v-model="rencanKontrol.poli_klinik" :filter="true" :options="get_master_poli" optionLabel="nama"
                        placeholder=""  style="width: 30em;" />
                </div>

                <div style="margin-top: 3em;" v-if="no_ku">
                    <label for="no_ku">Nomor Kontrol Ulang</label><br />
                    <strong style="font-size: large;">{{ no_ku }}</strong>
                </div>

             </div>
            <template #footer>
                    <Button label="Tutup" class="p-button text" icon="pi pi-times" @click="showKontrolUlang=false" autofocus />
                    <Button label="Terbitkan Kontrol ulang" icon="pi pi-check"  @click="terbitkan_kontrolulang()" autofocus />
                </template>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../bus';
    import RadioButton from 'primevue/radiobutton';
    import Textarea from 'primevue/textarea';
    import dayjs from 'dayjs';
    export default {
        components: {
            Loading,
            RadioButton,
            Textarea,
            dayjs
        },
        props: ['datapasien'],  //SELAIN CPPT ADALAH SBAR
        data() {
            return {
                fact: [],
                isLoadingdokter:false,
                showOtorisasi:false,
                showOtorisasiV2:false,
                showKontrolUlang:false,
                responvalue:0,
                dokter:{
                    nama:'',
                    master:[],
                    dokterSelected:'',
                    mode:0
                },
                rencanKontrol:{
                    tanggal:null,
                    poli:null,
                    dokter:null,
                    nokartu:null,
                    dx:null,
                    nosep:null,
                    norm:null
                },
                poli_klinik:{

                },
                form: {
                    startdate: '',
                    noregister:'',
                    enddate: '',
                    rs_tujuan_rujuk: '',
                    cara_keluar: '',
                    kondisi_meniggal:'',
                    keadaan_saat_pulang:'',
                    sebab_meninggal:'',
                    alasan_tidak_jadi_berobat:'',
                    tanggal_pulang:'',
                    tanggal_kematian:'',
                    dpjpSelected:'',
                    waktu_masuk:'',
                    data_pemindahan:'',
                    id_client:'',
                    cara_bayar:'',
                    nosep:'',
                    username:'',
                    pwd:''
                },
                tgl_pulang: null,
                jam_pulang: '',
                isLoading: false,
                fullPage: true,
                get_master_poli:[],
                no_ku:''

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.tanggal_kematian = currentDate;
            this.rencanKontrol.tanggal = currentDate;

            this.form.waktu_masuk = dayjs(currentDate).format('DD-MM-YYYY HH:mm');
            this.form.tanggal_pulang = dayjs(currentDate).format('DD-MM-YYYY HH:mm');
            // Init input terpisah
            this.tgl_pulang = currentDate;
            this.jam_pulang = dayjs(currentDate).format('HH:mm');
        },
        created() {


            //this.fetchData();
            this.allMasterDokter();
            this.get_status_keluar();
            this.get_poli();
            this.rencanKontrol.dokter = {
                KDDOKTER: this.datapasien.KDDOKTER,
                NAMADOKTER: this.datapasien.NAMADOKTER,
            };
        },

        methods: {
            bukaFormKontrol() {
                const noregister = this.datapasien.NOPENDAFTARAN;
                window.open(`/jadwal-kontrol/form/${noregister}`, '_blank');
            },
            fetchData() {
                var currentDate = new Date();
            },
            get_status_keluar() {
                this.form.cara_keluar      = this.datapasien.STATUS;
                this.form.rs_tujuan_rujuk  = this.datapasien.NAMA_RS_TUJUAN_RUJUK;
                this.form.keadaan_saat_pulang = this.datapasien.KEADAAN_SAAT_PULANG;
                this.form.kondisi_meniggal = this.datapasien.KONDISI_MENINGGAL;
                this.form.tanggal_kematian = this.datapasien.WAKTU_KEMATIAN;
                this.form.sebab_meninggal  = this.datapasien.SEBAB_KEMATIAN;
                this.form.alasan_tidak_jadi_berobat = this.datapasien.ALASAN_TIDAK_JADI_BEROBAT;

                // Auto-split tanggal & jam dari KELUARPOLY_NULL jika ada
                const tglKeluar = this.datapasien.KELUARPOLY_NULL || this.datapasien.KELUARPOLY;
                if (tglKeluar && tglKeluar !== '-') {
                    const d = dayjs(tglKeluar);
                    if (d.isValid()) {
                        this.tgl_pulang = d.toDate();
                        this.jam_pulang = d.format('HH:mm');
                        this.form.tanggal_pulang = d.format('DD-MM-YYYY HH:mm');
                    }
                }


            },
           async get_dokter_pindahruangan() {

               if (this.form.cara_keluar == 7) {
                    this.form.noregister  = this.datapasien.NOPENDAFTARAN;
                    const res  = await axios.post('/get_dokter_pindahruangan', this.form);


                    if (res.data && res.data.length > 0) {
                        const dokter = res.data[0];
                        this.form.dpjpSelected = {
                            KDDOKTER: dokter.kddokter,
                            NAMADOKTER: dokter.nama_dokter,
                            KDPOLY_BPJS:"INT",
                            KODE_DOKTER_BPJS:"431833"
                        };
                    }
               }

            },

            gabungTanggalJam() {
                if (!this.tgl_pulang) return;
                const tgl = dayjs(this.tgl_pulang).format('DD-MM-YYYY');
                const jam = this.jam_pulang || '00:00';
                this.form.tanggal_pulang = `${tgl} ${jam}`;
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;
                }
            },
            async allMasterDokter()
            {
                this.dokter.mode =2;
                this.isLoadingdokter = true;
                await axios.post('/getnamadokter', this.dokter)
                    .then(response => {
                        this.dokter.master = response.data.response;
                        this.isLoadingdokter = false;
                        this.get_dokter_pindahruangan();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoadingdokter = false)
            },

            async get_poli()
            {

                var currentDate = new Date();

                await axios.post('/datapoly')
                    .then(response => {
                        this.get_master_poli = response.data
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            onSimpanClick() {
                if (this.form.cara_keluar == 5) {
                    this.showOtorisasiV2 = true;
                    return;
                }
                this.selsairawat();
            },
            confirmOtorisasiThenSimpan() {
                if (!this.form.username || !this.form.pwd) return;
                this.showOtorisasiV2 = false;
                this.selsairawat();
            },
            async selsairawat() {

                if (this.form.cara_keluar == 7) {
                    this.form.data_pemindahan = this.$refs.pemindahan_pasien.get_value();
                }

                this.gabungTanggalJam(); // gabung tanggal + jam sebelum kirim

                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.norm = this.datapasien.NOMR;
                this.form.asal_ruangan = this.datapasien.KODERUANGAN;
                this.form.cara_bayar = this.datapasien.KODECARABAYAR;
                this.form.nosep = this.datapasien.NOSEP;

                // console.log('isi form', this.form)
                await axios.post('/simpan_selesai_pelayanan', this.form)
                    .then(response => {

                        if(response.data.metadata.code==200)
                        {
                            this.open("success", response.data.metadata.message)
                        }
                        else
                        {
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async terbitkan_kontrolulang()
            {
                this.rencanKontrol.nosep =this.datapasien.NOSEP;
                this.rencanKontrol.nokartu =this.datapasien.NOJAMINAN;
                this.rencanKontrol.norm =this.datapasien.NOMR;

                this.isLoading = true;
                await axios.post('/terbitkan_kontrolulang', this.rencanKontrol)
                .then(response => {

                    if(response.data.code==200)
                    {
                        this.open("success", response.data.message)
                        this.no_ku = response.data.no_ku;
                    }
                    else
                    {
                        this.open("warning", response.data.metaData.message)
                    }
                    this.isLoading = false
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
            },
            call_oto()
            {
                this.showOtorisasi = true;
            },
            // open(type, message) {
            //     this.$toast.open({
            //         message: message,
            //         position: 'top-right',
            //         type: type,
            //         duration: 5000,
            //         dismissible: true
            //     })
            // },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },

        },
    }

</script>

<style scoped>
    .field-radiobutton {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
    }

    .field-radiobutton label {
        margin-left: 0.5rem;
        margin-bottom: 0;
        line-height: 1.3;
    }
</style>
