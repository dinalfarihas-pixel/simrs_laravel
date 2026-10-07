<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header bg-white">
                    <h3 class="card-title text-bold">
                        <i class="fas fa-notes-medical mr-2 text-primary"></i>
                        Informasi Ringkas Pasien
                    </h3>
                    <div class="card-tools">
                        <span class="badge badge-info p-2">{{ data_pasien.CARABAYAR }}</span>
                    </div>
                </div>

                <div class="card-body bg-light-custom">
                    <div class="row">
                        <div class="col-md-4 border-right">
                            <div class="d-flex align-items-center mb-3">
                                <div class="avatar-circle mr-3">
                                    <i class="fas fa-user-circle fa-3x text-secondary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0 text-bold text-primary">{{ data_pasien.DATA_SINGKAT }}</h5>
                                    <small class="text-muted">No. MR: {{ data_pasien.NOMR }}</small>
                                </div>
                            </div>
                            <hr>
                            <div class="info-group">
                                <label><i class="fas fa-fingerprint"></i> NO. SEP</label>
                                <p class="text-monospace">{{ data_pasien.NOSEP || '-' }}</p>
                            </div>
                        </div>

                        <div class="col-md-4 border-right">
                            <div class="info-group">
                                <label><i class="fas fa-calendar-day"></i> Tanggal Lahir</label>
                                <p>{{ data_pasien.TGLLAHIR }}</p>
                            </div>
                            <div class="info-group">
                                <label><i class="fas fa-clock"></i> Registrasi Masuk</label>
                                <p>{{ data_pasien.MASUKPOLY }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info-group">
                                <label><i class="fas fa-user-md"></i> DPJP / Dokter Pemeriksa</label>
                                <p class="text-primary text-bold">{{ data_pasien.NAMADOKTER }}</p>
                            </div>
                            <div class="info-group">
                                <label><i class="fas fa-hospital-user"></i> Status Penjamin</label>
                                <p><span class="badge badge-success-soft">Aktif</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card Utama -->
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-file-medical mr-2"></i>Kalkulator Siriraj Stroke Score</h3>
                </div>

                <div class="card-body p-0">
                    <table class="table table-bordered mb-0">
                        <thead class="bg-light">
                            <tr>
                                <th style="width: 30%">Parameter</th>
                                <th>Pilihan Jawaban</th>
                                <th style="width: 15%" class="text-center">Skor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Derajat Kesadaran -->
                            <tr>
                                <td><b>Derajat Kesadaran</b></td>
                                <td>
                                    <div class="d-flex flex-wrap">
                                        <div class="p-field-radiobutton mr-4">
                                            <RadioButton id="c0" name="cons" value="0" v-model="siriraj.consciousness" />
                                            <label for="c0" class="ml-2">Sadar Penuh</label>
                                        </div>
                                        <div class="p-field-radiobutton mr-4">
                                            <RadioButton id="c1" name="cons" value="1" v-model="siriraj.consciousness" />
                                            <label for="c1" class="ml-2">Somnolen</label>
                                        </div>
                                        <div class="p-field-radiobutton">
                                            <RadioButton id="c2" name="cons" value="2" v-model="siriraj.consciousness" />
                                            <label for="c2" class="ml-2">Semi-koma/Koma</label>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center text-bold">{{ siriraj.consciousness }}</td>
                            </tr>

                            <!-- Muntah Proyektil -->
                            <tr>
                                <td><b>Muntah Proyektil</b> <small class="d-block text-muted">Dalam 2 jam setelah onset</small></td>
                                <td>
                                    <div class="d-flex">
                                        <div class="p-field-radiobutton mr-4">
                                            <RadioButton id="v0" value="0" v-model="siriraj.vomit" />
                                            <label for="v0" class="ml-2">Tidak</label>
                                        </div>
                                        <div class="p-field-radiobutton">
                                            <RadioButton id="v1" value="1" v-model="siriraj.vomit" />
                                            <label for="v1" class="ml-2">Ya</label>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center text-bold">{{ siriraj.vomit }}</td>
                            </tr>

                            <!-- Sakit Kepala -->
                            <tr>
                                <td><b>Sakit Kepala Hebat</b> <small class="d-block text-muted">Dalam 2 jam setelah onset</small></td>
                                <td>
                                    <div class="d-flex">
                                        <div class="p-field-radiobutton mr-4">
                                            <RadioButton id="h0" value="0" v-model="siriraj.headache" />
                                            <label for="h0" class="ml-2">Tidak</label>
                                        </div>
                                        <div class="p-field-radiobutton">
                                            <RadioButton id="h1" value="1" v-model="siriraj.headache" />
                                            <label for="h1" class="ml-2">Ya</label>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center text-bold">{{ siriraj.headache }}</td>
                            </tr>

                            <!-- Tekanan Darah -->
                            <tr>
                                <td><b>Tekanan Darah Diastolik</b></td>
                                <td>
                                    <div class="p-inputgroup" style="max-width: 200px">
                                        <InputNumber v-model="siriraj.diastolic" :min="0" placeholder="0" />
                                        <span class="p-inputgroup-addon">mmHg</span>
                                    </div>
                                </td>
                                <td class="text-center text-bold">{{ siriraj.diastolic }}</td>
                            </tr>

                            <!-- Ateroma -->
                            <tr>
                                <td><b>Penanda Ateroma</b> <small class="d-block text-muted">DM, Angina, atau Klaudikasio</small></td>
                                <td>
                                    <div class="d-flex">
                                        <div class="p-field-radiobutton mr-4">
                                            <RadioButton id="a0" value="0" v-model="siriraj.ateroma" />
                                            <label for="a0" class="ml-2">Tidak Ada</label>
                                        </div>
                                        <div class="p-field-radiobutton">
                                            <RadioButton id="a1" value="1" v-model="siriraj.ateroma" />
                                            <label for="a1" class="ml-2">Satu atau Lebih</label>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center text-bold">{{ siriraj.ateroma }}</td>
                            </tr>
                        </tbody>
                        <tfoot class="bg-dark text-white">
                            <tr>
                                <td colspan="2" class="text-right align-middle">
                                    <strong>TOTAL SKOR SIRIRAJ :</strong>
                                </td>
                                <td class="text-center align-middle">
                                    <h4 class="mb-0"><b>{{ computedSSS }}</b></h4>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Hasil Interpretasi -->
                <div class="card-footer px-0 pt-0 border-top-0">
                    <div :class="interpretation.class" class="alert m-3 shadow-sm">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-poll-h fa-2x mr-3"></i>
                            <div>
                                <h5 class="mb-1">Interpretasi Hasil:</h5>
                                <p class="mb-0 text-lg"><strong>{{ interpretation.text }}</strong></p>
                            </div>
                        </div>
                    </div>
                    <div class="px-3 pb-3">
                        <Button label="Simpan ke Rekam Medis" icon="pi pi-save" class="p-button-md p-button-success" @click="saveSiriraj" />
                        <Button label="Hapus data siriraj" icon="pi pi-times" class="p-button-md p-button-error" @click="hapus_siriraj" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// Logic script tetap sama seperti sebelumnya
import Loading from 'vue-loading-overlay';
import ConfirmDialog from 'primevue/confirmdialog';
export default {
        components: {
        Loading,
        ConfirmDialog
    },
    data() {
        return {
            isLoading: false,
            noreg_from_url:'',
            data_pasien: [],
            fullPage: true,
            siriraj: {
                consciousness: "0",
                vomit: "0",
                headache: "0",
                diastolic: 0,
                ateroma: "0",
            },
            isLoading:false,
            form:{}
        }
    },
    computed: {
        computedSSS() {
            const score = (2.5 * parseInt(this.siriraj.consciousness)) +
                          (2 * parseInt(this.siriraj.vomit)) +
                          (2 * parseInt(this.siriraj.headache)) +
                          (0.1 * (this.siriraj.diastolic || 0)) -
                          (3 * parseInt(this.siriraj.ateroma)) - 12;
            return score.toFixed(1);
        },
        interpretation() {
            const s = parseFloat(this.computedSSS);
            if (s > 1) return { text: "STROKE HEMORAGIK (Pendarahan)", class: "alert-danger" };
            if (s < -1) return { text: "STROKE ISKEMIK (Penyumbatan)", class: "alert-info" };
            return { text: "HASIL MERAGUKAN (Segera CT-Scan)", class: "alert-warning" };
        }
    },
    created() {
        this.noreg_from_url = window.location.pathname.split('/').pop();
        this.getdatapasien();
        this.get_siriraj();
    },
    methods: {

        async saveSiriraj() {

            const consciousnessCaption = { "0": "Sadar Penuh", "1": "Somnolen", "2": "Semi-koma/Koma" };
            const yaTidakCaption = { "0": "Tidak", "1": "Ya" };
            const ateromaCaption = { "0": "Tidak Ada", "1": "Satu atau Lebih" };

            this.isLoading = true
            const payload = {
                noregister: this.noreg_from_url,
                kesadaran: parseInt(this.siriraj.consciousness),
                kesadaran_caption: consciousnessCaption[this.siriraj.consciousness] ?? '-',
                muntah: parseInt(this.siriraj.vomit),
                muntah_caption: yaTidakCaption[this.siriraj.vomit] ?? '-',
                sakit_kepala: parseInt(this.siriraj.headache),
                sakit_kepala_caption: yaTidakCaption[this.siriraj.headache] ?? '-',
                tekanan_darah_diastolik: this.siriraj.diastolic,
                ateroma: parseInt(this.siriraj.ateroma),
                ateroma_caption: ateromaCaption[this.siriraj.ateroma] ?? '-',
                skor_akhir: this.computedSSS,
                interpretasi: this.interpretation.text
            };

            console.log(payload);

             await axios.post('/assesment/simpan_siriraj', payload)
                .then(response => {
                this.isLoading = false

                    if(response.data.code==200)
                    {
                        this.open('success',response.data.message)
                    }
                    else{
                        this.open('warn',response.data.message)
                    }


                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)

        },

        async get_siriraj() {
            this.form.mode = "history8";
              this.isLoading = true
            this.form.noregister = this.noreg_from_url
            await axios.post('/assesment/get_siriraj', this.form)
                .then(response => {
                if(response.data.code==200)
                {
                    const data = response.data.response[0]
                    this.siriraj = {
                            consciousness: data.kesadaran,
                            vomit: data.muntah,
                            headache: data.sakit_kepala,
                            diastolic: data.tekanan_darah_diastolik,
                            ateroma: data.ateroma,
                            skor_akhir: this.computedSSS,
                            interpretasi: this.interpretation.text
                        };
                }

                this.isLoading = false
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
        },
        async hapus_siriraj() {
            this.form.mode = "history8";
            this.isLoading = true
            this.form.noregister = this.noreg_from_url
            await axios.post('/assesment/hapus_siriraj', this.form)
                .then(response => {

                    console.log(response.data)
                if(response.data.code==200)
                {
                    this.open('success',response.data.message)
                }
                else{
                    this.open('warn',response.data.message)
                }

                this.isLoading = false
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
        },
         async getdatapasien() {
            this.form.mode = "history8";
            //this.form.noregister = "800368605";
            this.form.noregister = this.noreg_from_url //window.location.pathname.split('/').pop();
            //console.log('parameter',this.form)
            await axios.post('/datapasienpertransaksi', this.form)
                .then(response => {

                    this.data_pasien = response.data.response[0]
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
    }
}
</script>

<style scoped>
.table td, .table th {
    vertical-align: middle !important;
}
.p-field-radiobutton {
    margin-bottom: 0 !important;
}
/* Menyesuaikan style PrimeVue agar fit di dalam tabel AdminLTE */
:deep(.p-inputnumber-input) {
    width: 100%;
}
</style>
