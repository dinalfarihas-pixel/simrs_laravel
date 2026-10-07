<template>
    <section class="cppt-container">
        <!-- ====== HEADER RUMAH SAKIT ====== -->
        <header class="hospital-header">
            <div class="header-content">
                <img :src="data_rs['logo']" class="rs-logo" alt="Logo RS" />
                <div class="rs-info">
                    <h2 class="rs-name">{{ data_rs['nama_rs'] }}</h2>
                    <p class="rs-subtitle">Catatan Perkembangan Pasien Terintegrasi (CPPT)</p>
                </div>
            </div>
            <div class="header-divider"></div>
        </header>

        <!-- ====== DATA PASIEN (E-KARTU) ====== -->
        <div class="patient-card">
            <div class="card-grid">
                <div class="info-group">
                    <span class="label">NAMA PASIEN</span>
                    <span class="value bold uppercase">{{ data_pasien.DATA_SINGKAT }}</span>
                </div>
                <div class="info-group">
                    <span class="label">NO. REKAM MEDIS</span>
                    <span class="value highlight">{{ data_pasien.NOMR }}</span>
                </div>
                <div class="info-group">
                    <span class="label">TANGGAL LAHIR</span>
                    <span class="value">{{ data_pasien.TGLLAHIR }}</span>
                </div>
                <div class="info-group">
                    <span class="label">CARA BAYAR</span>
                    <span class="value">{{ data_pasien.CARABAYAR }}</span>
                </div>
                <div class="info-group">
                    <span class="label">DPJP</span>
                    <span class="value">{{ data_pasien.NAMADOKTER }}</span>
                </div>
                <div class="info-group">
                    <span class="label">TGL MASUK</span>
                    <span class="value">{{ data_pasien.MASUKPOLY }}</span>
                </div>
            </div>
        </div>

        <!-- ====== TABEL SOAP ====== -->
        <div class="table-responsive mt-4">
            <table class="professional-table">
                <thead>
                    <tr>
                        <th width="50">NO</th>
                        <th width="150">WAKTU & PPA</th>
                        <th>HASIL ASESMEN (SOAP)</th>
                        <th>INSTRUKSI / VERIFIKASI</th>
                        <th width="100">AUTORISASI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(input, k) in fact" :key="k" :class="{'row-sbar': input.jenis_dok === 'SBAR'}">
                        <td class="text-center font-weight-bold">{{ k + 1 }}</td>
                        <td class="ppa-info">
                            <span class="timestamp">{{ input.waktu_display }}</span>
                            <div class="ppa-badge">
                                <i class="fas fa-user-md"></i> {{ input.profesi }}
                            </div>
                            <span class="ppa-name">{{ input.verif_user_display }}</span>
                        </td>
                        <td class="soap-content">
                            <div v-if="input.jenis_dok === 'SBAR'" class="doc-type-tag">SBAR</div>
                            <div class="soap-item">
                                <strong>{{ input.caption1 }}:</strong>
                                <p v-html="convert_chart(input.subject)"></p>
                            </div>
                            <div class="soap-item">
                                <strong>{{ input.caption2 }}:</strong>
                                <p v-html="convert_chart(input.object_display)"></p>
                                <small class="text-muted">{{ input.object }}</small>
                            </div>
                            <div class="soap-item">
                                <strong>{{ input.caption3 }}:</strong>
                                <p v-html="convert_chart(input.asessment)"></p>
                            </div>
                            <div class="soap-item" v-if="input.jenis_dok === 'CPPT'">
                                <strong>{{ input.caption4 }}:</strong>
                                <p v-html="convert_chart(input.plan)"></p>
                            </div>
                        </td>
                        <td class="instruction-cell">
                            <div v-if="input.jenis_dok === 'SBAR'">
                                <div class="soap-item">
                                    <strong>{{ input.caption4 }}:</strong>
                                    <p v-html="convert_chart(input.plan)"></p>
                                </div>

                                <div v-if="input.verif == 0" class="mt-2">
                                    <button @click="call_oto(input.id, 21)" class="btn-verif">
                                        <i class="pi pi-plus"></i> Verif DPJP
                                    </button>
                                </div>
                                <div v-else class="qr-verify-wrapper">
                                    <qrcode-vue :value="input.verif_by_name" :size="50" level="H"></qrcode-vue>
                                    <div class="verify-details">
                                        <span class="verified-text text-success"><i class="pi pi-verified"></i> Terverifikasi</span>
                                        <span class="verify-name">{{ input.verif_by_name }}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            <div v-if="input.hasbeen_auth == 1" class="qr-auth">
                                <qrcode-vue :value="input.id" :size="60" level="H"></qrcode-vue>
                                <span class="qr-label">ID AUTH</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="history-section">
            <history_obat :datapasien="datapasien"></history_obat>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import Textarea from 'primevue/textarea';
    import QrcodeVue from 'qrcode.vue';
    import ConfirmDialog from 'primevue/confirmdialog';

    export default {
        components: {
            Loading,
            Textarea,
            QrcodeVue,
            ConfirmDialog,
        },

        data() {
            return {
                fact: [],
                noreg_from_url: '',
                showModal: false,
                showOtorisasi: false,
                datapasien:{
                    NOPENDAFTARAN:window.location.pathname.split('/').pop()
                },
                responvalue: 0,
                showIntruksi: false,
                soapId: 0,
                mode_otto: 2,
                isLoading: false,
                fullPage: true,
                displayConfirmation: false,
                message: '',
                is_update: false,
                id_soap: 0,
                size: 40,
                data_rs: '',
                alatbantu_nafas: ['Ya', 'Tidak'],
                value: 'https://example.com',
                data_pasien: [],

                form: {
                    startdate: '',
                    tglsoap: '',
                    subject: '',
                    object: '',
                    object_display: '',
                    asessment: '',
                    plan: '',
                    mode: '',
                    noregister: '',
                    id: '',
                    verif_user_display: '',
                    suhu: 0.0,
                    sistole: 0,
                    diastole: 0,
                    nadi: 0,
                    gcs: 0,
                    spo2: 0,
                    pernafasan: 0,
                    jenis_dok: '',
                    alatbantu_nafasSelected: 'Tidak'
                }
            };
        },

        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddatate = currentDate;
            this.form.tglsoap = currentDate;
            //this.noregister = window.location.pathname.split('/').pop();

        },

        created() {


           // this.form.noregister = noregister;
            this.noreg_from_url = window.location.pathname.split('/').pop();
            this.get_soap(1, "");
            this.getdatapasien();
            this.profile_rs();
        },

        methods: {
            profile_rs() {
                axios.get('/data_rumahsakit', "")
                    .then(response => {
                        this.data_rs = response.data
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
                this.form.noregister  =this.noreg_from_url //window.location.pathname.split('/').pop();
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

            convert_chart(data) {
                return data ? data.replace(/\n/g, '<br>') : "";
            },

            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },

            call_oto(soapid, mode_otto) {
                this.soapId = soapid;
                this.mode_otto = mode_otto
                this.showOtorisasi = true;
            },

            handleValue(value) {
                this.responvalue = value;
                if (this.responvalue == 200) {
                    this.showOtorisasi = false;
                    this.get_soap(1);
                }
            },

            async get_soap(mode, id) {
                this.isLoading = true;
                this.form.mode = mode;
                //this.form.noregister = "800368605";
                this.form.noregister =this.noreg_from_url //window.location.pathname.split('/').pop();
                this.form.lokasi = "IGD";
                this.form.id = id;

                await axios.post('/get_soap', this.form)
                    .then(response => {
                        this.isLoading = false;
                        if (mode == 1) {
                            this.fact = response.data.response;
                        }
                        if (mode == 2) {
                            let r = response.data.response[0];
                            this.form.subject = r.subject;
                            this.form.object = r.object;
                            this.form.object_display = r.object_display;
                            this.form.asessment = r.asessment;
                            this.form.plan = r.plan;
                            this.form.suhu = r.suhu;
                            this.form.sistole = r.sistole;
                            this.form.diastole = r.diastole;
                            this.form.nadi = r.nadi;
                            this.form.gcs = r.gcs;
                            this.form.spo2 = r.spo2;
                            this.form.respirasi = r.respirasi;
                            this.form.pernafasan = r.pernafasan;
                            this.form.verif_user_display = r.verif_user_display;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

        }
    };

</script>
<style scoped>
.cppt-container {
    padding: 20px;
    background-color: #ffffff;
    /* Gunakan warna slate yang sangat gelap agar font terlihat tajam */
    color: #090e1b;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
/* Header Modern */
.hospital-header {
    margin-bottom: 25px;
}
.header-content {
    display: flex;
    align-items: center;
    gap: 20px;
}
.rs-logo {
    width: 70px;
    height: 70px;
}
.rs-name {
    font-size: 24px;
    font-weight: 800;
    color: #1a5f7a;
    text-transform: uppercase;
    margin: 0;
}
.rs-subtitle {
    font-size: 16px;
    color: #64748b;
    margin: 0;
}
.header-divider {
    height: 3px;
    background: linear-gradient(to right, #1a5f7a, #3498db, transparent);
    margin-top: 15px;
}

/* Patient Card */
.patient-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
}
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}
.info-group {
    display: flex;
    flex-direction: column;
}
.label {
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 4px;
}
.value {
    font-size: 14px;
    color: #1e293b;
    font-weight: 600;
}
.value.highlight {
    color: #3b82f6;
}
.uppercase { text-transform: uppercase; }

/* Table Professional */
.professional-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}
.professional-table thead th {
    background: #1e293b;
    color: white;
    padding: 12px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: left;
}
.professional-table td {
    padding: 15px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
    font-size: 13px;
}

/* PPA Info Column */
.ppa-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.timestamp { font-weight: 800; color: #334155; }
.ppa-badge {
    background: #e0f2fe;
    color: #0369a1;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    width: fit-content;
}

/* SOAP Content */
.soap-item {
    margin-bottom: 12px;
}
.soap-item strong {
    color: #1a5f7a;
    font-size: 12px;
    display: block;
}
.soap-item p {
    margin: 2px 0 0 0;
    line-height: 1.5;
}
.doc-type-tag {
    background: #f59e0b;
    color: white;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: bold;
    border-radius: 3px;
    margin-bottom: 8px;
    display: inline-block;
}

/* Verif & QR */
.btn-verif {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.2s;
}
.btn-verif:hover { background: #2563eb; }

.qr-verify-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}
.verified-text {
    font-size: 11px;
    font-weight: bold;
    display: block;
}
.verify-name { font-size: 11px; color: #64748b; }

.qr-auth {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.qr-label {
    font-size: 9px;
    color: #94a3b8;
    margin-top: 4px;
}

/* Row SBAR distinction */
.row-sbar {
    background-color: #fffbeb;
}
</style>
