<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card card-warning card-outline elevation-0">
                <div class="card-header" style="text-align: center;">
                    <b>CATATAN PEMINDAHAN PASIEN ANTAR RUANGAN</b>
                </div>
                <!-- {{ datapasien }} -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="caradatang">ASAL RUANGAN</label><br />
                                <p>{{ datapasien.POLI }}</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="caradatang">RUANGAN TUJUAN</label><br />
                                <Button type="button" :label="rungan_dipilih" @click="toggle" />
                                <Popover ref="op" appendTo="body">
                                    <DataTable :value="data_ruangan" v-model:selection="form.ruanganselected"
                                        selectionMode="single" :paginator="true" :rows="5"
                                        @row-select="onProductSelect">
                                        <Column field="KD_RUANGAN" header="KD_RUANGAN" sortable></Column>
                                        <Column field="NAMA" header="NAMA" sortable></Column>
                                        <Column field="KELAS" header="KELAS" sortable></Column>
                                        <Column field="JUMLAH_TT" header="JUMLAH_TT" sortable></Column>
                                        <Column field="TERSEDIA" header="TERSEDIA" sortable></Column>
                                    </DataTable>
                                </Popover>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="caradatang">METODE PEMINDAHAN PASIEN</label><br />
                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="kursiroda" name="cara_keluar" value="Kursi Roda"
                                    v-model="form.metode_pemindahan_pasien" />
                                <label class="ml-3" for="kursiroda">Kursi Roda</label>
                            </div>

                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Brangkar" name="cara_keluar" value="Brangkar"
                                    v-model="form.metode_pemindahan_pasien" />
                                <label class="ml-3" for="Brangkar">Brangkar</label>
                            </div>
                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Tempat tidur" name="cara_keluar" value="Tempat tidur"
                                    v-model="form.metode_pemindahan_pasien" />
                                <label class="ml-3" for="Tempat tidur">Tempat tidur</label>
                            </div>
                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Berjalan" name="cara_keluar" value="Berjalan"
                                    v-model="form.metode_pemindahan_pasien" />
                                <label class="ml-3" for="Berjalan">Berjalan</label>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="caradatang">STATUS FUNGSIONAL PASIEN</label><br />
                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Mandiri" name="status_fungsional_pasien" value="Mandiri"
                                    v-model="form.status_fungsional_pasien" />
                                <label class="ml-3" for="Mandiri">Mandiri</label>
                            </div>

                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Ketergantungan Sedang" name="status_fungsional_pasien"
                                    value="Ketergantungan Sedang" v-model="form.status_fungsional_pasien" />
                                <label class="ml-3" for="Ketergantungan Sedang">Ketergantungan Sedang</label>
                            </div>
                            <div class="field-radiobutton form-check form-check-inline">
                                <RadioButton id="Ketergantungan penuh" name="status_fungsional_pasien"
                                    value="Ketergantungan penuh " v-model="form.status_fungsional_pasien" />
                                <label class="ml-3" for="Ketergantungan penuh">Ketergantungan penuh</label>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="caradatang ">PERALATAN MEDIS YANG TERPASANG</label><br />
                                    <div class="field-checkbox">
                                        <Checkbox id="O2" v-model="form.alat_medis_yg_terpasang" value="O2" />
                                        <label for="O2">Oksigen</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="Abbocate" v-model="form.alat_medis_yg_terpasang"
                                            value="Abbocate" />
                                        <label for="Abbocate">Abbocate</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="NGT" v-model="form.alat_medis_yg_terpasang" value="NGT" />
                                        <label for="NGT">NGT</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <br>
                                    <div class="field-checkbox ">
                                        <Checkbox id="Kateter Urin" v-model="form.alat_medis_yg_terpasang"
                                            value="Kateter Urin" />
                                        <label for="Kateter Urin">Kateter Urin</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="Infus" v-model="form.alat_medis_yg_terpasang" value="Infus" />
                                        <label for="Infus">Infus</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="Ventilator" v-model="form.alat_medis_yg_terpasang"
                                            value="Ventilator" />
                                        <label for="Ventilator">Ventilator</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="caradatang">GANGGUAN</label><br />
                                    <div class="field-checkbox">
                                        <Checkbox id="Mental" v-model="form.gangguan" value="Mental" />
                                        <label for="Mental">Mental</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="Pendengaran" v-model="form.gangguan" value="Pendengaran" />
                                        <label for="Pendengaran">Pendengaran</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="Sensasi" v-model="form.gangguan" value="Sensasi" />
                                        <label for="Sensasi">Sensasi</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <br>
                                    <div class="field-checkbox ">
                                        <Checkbox id="Bicara" v-model="form.gangguan" value="Bicara" />
                                        <label for="Bicara">Bicara</label>
                                    </div>

                                    <div class="field-checkbox">
                                        <Checkbox id="Penglihatan" v-model="form.gangguan" value="Penglihatan" />
                                        <label for="Penglihatan">Penglihatan</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="catatan">CATATAN</label><br />
                                <Textarea id="catatan" v-model="form.catatan" style="width: 100%;" rows="5" cols="30" />
                                </div>
                            </div>
                    </div>
                    <Dialog header="CATATAN PEMINDAHAN PASIEN ANTAR RUANGAN" v-model:visible="showList"
                          :containerStyle="{width: '70vw', marginTop: '1vh', marginBottom: '2vh'}"

                        position="center"
                        :modal="true">
                        <catatan-pemindahan-list :datapasien="datapasien" :mode=1></catatan-pemindahan-list>
                        <template #footer>
                                <Button label="No" icon="pi pi-times" @click="showList=false" class="p-button-text" />
                                <Button label="Tutup" icon="pi pi-check" @click="showList=false" autofocus />
                            </template>
                    </Dialog>
                    <div class="row">
                        <div class="col-md-6">
                            <Button label="Lihat riwayat" @click="panggil_riwayat_pemindahan()" icon="pi pi-check"   autofocus />
                            <span  v-if="this.mode==2">
                                <Button label="Simpan" @click="simpan()" icon="pi pi-save"   autofocus />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Popover from 'primevue/popover';
    import RadioButton from 'primevue/radiobutton';
    import Checkbox from 'primevue/checkbox';
    import Textarea from 'primevue/textarea';
    export default {
        components: {
            Loading,
            Popover,
            RadioButton,
            Checkbox,
            Textarea
        },
        props: ['datapasien','mode'], //SELAIN CPPT ADALAH SBAR
        data() {
            return {
                fact: [],
                showList:false,
                param:{
                    data_pemindahan:'',
                },
                form: {
                    id:'',
                    noregister:'',
                    asal_ruangan:0,
                    tujuan:0,
                    ruanganselected: null,
                    metode_pemindahan_pasien: 'Kursi Roda',
                    status_fungsional_pasien:'',
                    alat_medis_yg_terpasang:[],
                    gangguan:[],
                    catatan:'',
                    id_client:'',
                    cara_keluar:'',
                    jenis_ruangan:'',
                    kddokter:'',
                    nama_dokter:''
                },
                rungan_dipilih: 'Pilih Ruangan',
                data_ruangan: [],
                isLoading: false,
                fullPage: true,
                data_saved:[],
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getdata_pemindahan_pasien();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
            },
            toggle(event) {
                this.$refs.op.toggle(event);
            },

            async getdata_pemindahan_pasien() {
                this.form.noregister  = this.datapasien.NOPENDAFTARAN;
                this.form.kddokter    = this.datapasien.KDDOKTER;
                this.form.nama_dokter = this.datapasien.NAMADOKTER;
                this.form.mode        = 1;
                this.isLoading       = true;
                try {
                    const res  = await axios.post('/getdata_pemindahan_pasien', this.form);

                    // Sesuaikan format response baru
                    this.fact = Array.isArray(res.data.response) ? res.data.response : [];

                    if (this.fact.length > 0) {
                        const d = this.fact[0];
                        this.form.id                       = d.id || '';
                        this.form.metode_pemindahan_pasien = d.metode_pemindahan_pasien || 'Kursi Roda';
                        this.form.status_fungsional_pasien = d.status_fungsional_pasien || '';
                        this.form.alat_medis_yg_terpasang  = Array.isArray(d.alat_medis_yg_terpasang_display) ? d.alat_medis_yg_terpasang_display : [];
                        this.form.gangguan                 = Array.isArray(d.gangguan_display) ? d.gangguan_display : [];
                        this.form.catatan                  = d.catatan || '';
                        this.form.tujuan                   = d.tujuan || 0;
                        this.form.cara_keluar              = d.cara_keluar || '';
                        this.rungan_dipilih                = d.tujuan_display || 'Pilih Ruangan';
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoading = false;
                }
            },

            async get_data_ruangan() {
                await axios.post('/get_data_ruangan')
                    .then(response => {
                        console.log(response.data)
                        this.data_ruangan = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            get_value()
            {
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.id_client = this.datapasien.ID_CLIENT;
                return this.form;
            },
            async simpan()
            {

                this.form.asal_ruangan = this.datapasien.KODERUANGAN;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.id_client = this.datapasien.ID_CLIENT;
                this.form.jenis_ruangan = this.datapasien.KODEPOLI;
                this.param.data_pemindahan = this.form;

                this.isLoading = true;
                await axios.post('/pindah_pasien_antar_ruangan',this.param)
                    .then(response => {
                        console.log(response.data)
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message)
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message)
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            panggil_riwayat_pemindahan()
            {
                this.showList=true;
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                })
            },
            onProductSelect(event) {
                console.log(event.data)
                this.form.tujuan = this.form.ruanganselected.KD_RUANGAN
                this.form.asal_ruangan = this.datapasien.KODERUANGAN;
                this.rungan_dipilih = event.data.NAMA
                this.$refs.op.hide();
            }
        },
    }

</script>

<style>
/* Fix: dialog selalu di tengah viewport, tidak tergeser offset sidebar AdminLTE */
.p-dialog-mask {
    position: fixed  !important;
    top: 0           !important;
    left: 0          !important;
    width: 100vw     !important;
    height: 100vh    !important;
    display: flex    !important;
    align-items: center     !important;
    justify-content: center !important;
}
.p-dialog {
    margin-left: 0 !important;
}
</style>
