<template>
    <section class="content">
        <div class="container-fluid print-container">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="header-print mb-4">
                <div class="row align-items-center">
                    <div class="col-2 text-center">
                        <img v-if="data_rs && data_rs['logo']" :src="data_rs['logo']" class="img-logo" />
                        <div v-else class="logo-placeholder">LOGO</div>
                    </div>
                    <div class="col-10">
                        <h2 class="mb-0 hospital-name"><strong>{{ data_rs ? data_rs['nama_rs'] : 'UNIT RADIOLOGI' }}</strong></h2>
                        <p class="mb-0 text-muted">{{ data_rs ? data_rs['alamat'] : '' }}</p>
                    </div>
                </div>
                <hr class="border-dark mt-2">
            </div>

            <div class="card card-outline card-primary shadow-none border-0">
                <div class="card-body p-0">
                    <div class="row mb-4">
                        <div class="col-6">
                            <table class="table table-sm table-borderless info-table">
                                <tbody>
                                <tr>
                                    <td width="35%">No. Rekam Medis</td>
                                    <td>: <strong>{{ dataorderradiologi.NOMR || '-' }}</strong></td>
                                </tr>
                                <tr>
                                    <td>Nama Pasien</td>
                                    <td>: <strong>{{ dataorderradiologi.NAMA || '-' }}</strong></td>
                                </tr>
                                <tr>
                                    <td>Tgl Lahir / JK</td>
                                    <td>: {{ dataorderradiologi.TGLLAHIR || '-' }} / {{ dataorderradiologi.JENISKELAMIN || '-' }}</td>
                                </tr>
                                <tr>
                                    <td>Usia</td>
                                    <td>: {{ dataorderradiologi.USIA || '-' }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-6">
                            <table class="table table-sm table-borderless info-table">
                                <tbody>
                                <tr>
                                    <td width="35%">No. Receipt</td>
                                    <td>: <strong>{{ dataorderradiologi.RECEIPT_NO || '-' }}</strong></td>
                                </tr>
                                <tr>
                                    <td>Dokter Pengirim</td>
                                    <td>: {{ dataorderradiologi.DPJP || '-' }}</td>
                                </tr>
                                <tr>
                                    <td>Poli / Ruang</td>
                                    <td>: {{ dataregister.POLI || '-' }}</td>
                                </tr>
                                <tr>
                                    <td>Tgl Order</td>
                                    <td>: {{ dataorderradiologi.TANGGAL || '-' }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="klinis-box p-2 mb-4 bg-light border">
                        <strong>Klinis:</strong> {{ dataorderradiologi.KLINIS || '-' }}
                    </div>
                </div>
            </div>

            <div v-if="hasilbacaradiologi && hasilbacaradiologi.length > 0">
                <div v-for="(item, index) in hasilbacaradiologi" :key="index" class="hasil-item border-top pt-4 mt-4">
                    <div class="text-center mb-4">
                        <h4 class="text-uppercase" style="text-decoration: underline; letter-spacing: 2px;">HASIL PEMERIKSAAN RADIOLOGI</h4>
                        <h5><strong>{{ item.NAMA }}</strong></h5>
                    </div>

                    <div class="hasil-baca-content">
                        <div v-if="item.HASIL_BACA" v-html="convert_chart(item.HASIL_BACA)" class="readable-text"></div>
                        <div v-else class="text-muted text-italic">Hasil belum diinput oleh dokter spesialis.</div>
                    </div>

                    <p class="text-muted small mt-4"><i>Update terakhir: {{ item.TANGGAL_TIMPSTAMP || '-' }}</i></p>
                </div>
            </div>

            <div v-else class="alert alert-info text-center mt-5">
                <i class="fas fa-info-circle"></i> Menunggu data hasil bacaan radiologi...
            </div>

            <div class="row mt-5 pt-4">
                <div class="col-7">
                    <small class="text-muted" v-if="nama_user">Dicetak oleh: {{ nama_user }}</small>
                </div>
                <div class="col-5 text-center">
                    <p class="mb-1">Salam Sejawat,</p>
                    <div class="signature-space d-flex justify-content-center align-items-center">
                        <div v-if="dataorderradiologi.IS_VERIFIED == 1" class="qrcode-container">
                            <qrcode-vue :value="dataorderradiologi.PETUGAS_OTENTIKASI" :size="80" level="H"></qrcode-vue>
                        </div>
                        <div v-else class="spacer-signature"></div>
                    </div>
                    <div class="mt-2">
                        <strong>{{ dataorderradiologi.PETUGAS_OTENTIKASI || '(....................................)' }}</strong>
                        <br><small>Dokter Spesialis Radiologi</small>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import QrcodeVue from 'qrcode.vue';
import axios from 'axios';

export default {
    components: {
        Loading,
        QrcodeVue
    },
    props: ['isInput', 'datapasien'],
    data() {
        return {
            isLoading: false,
            fullPage: true,
            data_rs: {},
            dataregister: {},
            hasilbacaradiologi: [],
            dataorderradiologi: {},
            nama_user: '',
            form: {
                startdate: '',
                noregister: '',
                mode: ''
            },
            param: {
                no_receipt: '',
                barcode: '',
                mode: 'RCPT'
            }
        };
    },
    created() {
        this.profile_rs();
        this.getnama_user();

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);

        this.param.no_receipt = params.get("receipt_no");
        this.param.barcode = params.get("barcode");

        if (this.param.no_receipt) {
            this.get_subdetail();
        }

        if (params.get("noregister")) {
            this.getdatapasien(params.get("noregister"));
        }
    },
    methods: {
        profile_rs() {
            // Tambahkan timestamp untuk cegah cache
            axios.get('/data_rumahsakit?t=' + Date.now())
                .then(response => { this.data_rs = response.data; })
                .catch(err => console.error(err));
        },

        getnama_user() {
            axios.get('/getusername?t=' + Date.now())
                .then(response => { this.nama_user = response.data; })
                .catch(err => console.error(err));
        },

        convert_chart(stringText) {
            if (!stringText) return "";
            // Mengubah newline menjadi <br> secara aman
            return stringText.replace(/\n/g, '<br>');
        },

        async get_subdetail() {
            this.isLoading = true;
            this.param.mode = "2";
            // Anti-Cache request
            await axios.post('/get_detail_radiologi?t=' + Date.now(), this.param)
                .then(response => {
                    this.hasilbacaradiologi = response.data.response || [];
                    this.dataorderradiologi = response.data.pasien || {};
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.isLoading = false);
        },

        async getdatapasien(noregister) {
            this.form.mode = "history8";
            this.form.noregister = noregister;
            await axios.post('/datapasienpertransaksi?t=' + Date.now(), this.form)
                .then(response => {
                    this.dataregister = response.data.response[0] || {};
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.isLoading = false);
        },
    },
};
</script>

<style scoped>
/* Pengaturan Layout Cetak */
.print-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #212529;
    background: white;
    padding: 20px;
}

.img-logo {
    max-height: 85px;
    width: auto;
}

.logo-placeholder {
    height: 80px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.info-table td {
    padding: 2px 0;
    vertical-align: top;
}

.klinis-box {
    font-size: 0.9rem;
    border-radius: 4px;
}

.readable-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #000;
    min-height: 200px;
    text-align: justify;
}

.signature-space {
    min-height: 100px;
}

.spacer-signature {
    height: 80px;
}

/* Pengaturan Khusus Printer */
@media print {
    body {
        background-color: transparent !important;
    }
    .container-fluid {
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .no-print, .main-footer, .navbar, .btn {
        display: none !important;
    }
    .card {
        border: none !important;
    }
    .print-container {
        padding: 0;
    }
    /* Memastikan warna background (bg-light) tetap tercetak di beberapa browser */
    .bg-light {
        background-color: #f8f9fa !important;
        -webkit-print-color-adjust: exact;
    }
}
</style>
