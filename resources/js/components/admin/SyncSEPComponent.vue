<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
<!-- {{ dataSEP }} -->
            <!-- Search Card -->
            <div class="card elevation-1 search-card mb-4">
                <div class="card-header">
                    <h3 class="card-title">Patient Registration Search</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="search-container">
                                <InputText autocomplete="off" v-model="form.noregister" type="text"
                                    placeholder="Nomor Regitrasi" class="search-input" />
                                <Button label="NO REGISTER" @click="datapasienpertransaksi()" icon="pi pi-search"
                                    class="p-button search-button" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="search-container">
                                <InputText autocomplete="off" v-model="form.nosep" type="text" placeholder="NO SEP"
                                    class="search-input" />
                                <Button label="NO SEP" @click="getdata()" style="background-color: darkgoldenrod;"
                                    icon="pi pi-search" class="p-button search-button" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <Dialog header="Detail SEP" v-model:visible="showDialogSEP" :modal="true" :closable="true"
                :style="{ width: '500px' }">
                <div class="p-fluid">
                    <div class="p-field">
                        <label>No. SEP</label>
                        <p>{{ dataSEP.noSep }}</p>
                    </div>
                    <div class="p-field">
                        <label>Tanggal SEP</label>
                        <p>{{ dataSEP.tglSep }}</p>
                    </div>
                    <div class="p-field">
                        <label>Jenis Pelayanan</label>
                        <p>{{ dataSEP.jnsPelayanan }}</p>
                    </div>
                    <div class="p-field">
                        <label>Diagnosa</label>
                        <p>{{ dataSEP.diagnosa }}</p>
                    </div>
                    <div class="p-field">
                        <label>Peserta</label>
                        <p>{{ dataSEP?.peserta?.nama }} ({{ dataSEP.peserta?.noKartu }})</p>
                    </div>
                    <div class="p-field">
                        <label>Dokter Kontrol</label>
                        <p>{{ dataSEP?.kontrol?.nmDokter }}</p>
                    </div>
                </div>
                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="showDialogSEP = false" class="p-button-text" />
                     <Button label="Sync" icon="pi pi-refresh" @click="proses_syncSEP()" class="p-button" />
                </template>
            </Dialog>

            <!-- Patient Information Card -->
            <div v-if="patientData.NOMR" class="card elevation-1 patient-card mb-4">
                <div class="card-header patient-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2 class="p-m-2">Patient Details</h2>
                        <div class="status-badge" :class="getStatusClass(patientData.STTS_PULANG)">
                            {{ patientData.STTS_PULANG || 'Unknown Status' }}
                        </div>
                    </div>
                </div>

                <div class="card-body patient-info">
                    <div class="row">
                        <!-- Left Column -->
                        <div class="col-md-6">
                            <div class="p-field">
                                <label>Nomor Rekam Medis</label>
                                <h3 class="mr-number">{{ patientData.NOMR }}</h3>
                            </div>

                            <div class="p-field">
                                <label>Registration Number</label>
                                <div class="field-value">{{ patientData.NOPENDAFTARAN }}</div>
                            </div>

                            <div class="p-field">
                                <label>Nama</label>
                                <div class="field-value patient-name">{{ patientData.NAMAPASIEN }}</div>
                            </div>

                            <div class="p-field">
                                <label>Jenis Kelamin</label>
                                <div class="field-value">
                                    {{ patientData.JENISKELAMIN === 'P' ? 'Perempuan' : 'Laki-laki' }}</div>
                            </div>

                            <div class="p-field">
                                <label>Tanggal Lahir</label>
                                <div class="field-value">{{ formatDate(patientData.TGLLAHIR) }}</div>
                            </div>

                            <div class="p-field">
                                <label>Usia</label>
                                <div class="field-value">{{ patientData.USIA }} years
                                    ({{ patientData.USIA_PASIEN.tahun }} years,
                                    {{ patientData.USIA_PASIEN.bulan }} months, {{ patientData.USIA_PASIEN.hari }} days)
                                </div>
                            </div>

                            <div class="p-field">
                                <label>NIK</label>
                                <div class="field-value">{{ patientData.NOKTP }}</div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="col-md-6">
                            <div class="p-field">
                                <label>Alamat</label>
                                <div class="field-value">{{ patientData.ALAMAT }}</div>
                            </div>

                            <div class="p-field">
                                <label>Kecamatan</label>
                                <div class="field-value">{{ patientData.NAMAKECAMATAN }}</div>
                            </div>

                            <div class="p-field">
                                <label>Phone Number</label>
                                <div class="field-value">{{ patientData.NOTELP }}</div>
                            </div>

                            <div class="p-field payment-method">
                                <label>Cara Bayar</label>
                                <div class="field-value"><strong>{{ patientData.CARABAYAR }}</strong></div>
                            </div>

                            <div class="p-field">
                                <label>Nomor Asuransi</label>
                                <div class="field-value">{{ patientData.NOJAMINAN }}</div>
                            </div>

                            <div class="p-field">
                                <label>Nomor SEP</label>
                                <div class="field-value">{{ patientData.NOSEP }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Information Cards -->
            <div v-if="patientData.NOMR" class="row">
                <!-- Hospitalization Details Card -->
                <div class="col-md-6">
                    <div class="card elevation-1 hosp-card mb-4">
                        <div class="card-header hosp-header">
                            <h2 class="p-m-0">Hospitalization Details</h2>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <!-- Left Column -->
                                <div class="col-md-6">
                                    <div class="p-field">
                                        <label>Care Type</label>
                                        <div class="field-value">{{ patientData.JENISRAWAT }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Department</label>
                                        <div class="field-value">{{ patientData.POLI }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Ward Code</label>
                                        <div class="field-value">{{ patientData.KODERUANGAN }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Length of Stay</label>
                                        <div class="field-value">{{ patientData.JLM_HARI_RAWAT }} days</div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="col-md-6">
                                    <div class="p-field">
                                        <label>Admission Date</label>
                                        <div class="field-value">{{ formatDateTime(patientData.MASUKPOLY) }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Discharge Date</label>
                                        <div class="field-value">{{ patientData.KELUARPOLY || 'Not discharged' }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Doctor</label>
                                        <div class="field-value">{{ patientData.NAMADOKTER }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Doctor ID</label>
                                        <div class="field-value">{{ patientData.KDDOKTER }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Diagnosis & Medical Details Card -->
                <div class="col-md-6">
                    <div class="card elevation-1 diag-card mb-4">
                        <div class="card-header diag-header">
                            <h2 class="p-m-0">Diagnosis & Medical Details</h2>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <!-- Left Column -->
                                <div class="col-md-6">
                                    <div class="p-field">
                                        <label>Initial Diagnosis Code</label>
                                        <div class="field-value">{{ patientData.DIAGNOSA_AWAL }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Diagnosis Description</label>
                                        <div class="field-value">{{ patientData.DX_CAPTION }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Accident Status</label>
                                        <div class="field-value">{{ patientData.KLL === '0' ? 'No' : 'Yes' }}</div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="col-md-6">
                                    <div class="p-field">
                                        <label>Discharge Status</label>
                                        <div class="field-value">{{ patientData.KETERANGAN }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Discharge Condition</label>
                                        <div class="field-value condition-badge"
                                            :class="getConditionClass(patientData.KEADAAN_SAAT_PULANG)">
                                            {{ getConditionText(patientData.KEADAAN_SAAT_PULANG) }}
                                        </div>
                                    </div>

                                    <div class="p-field">
                                        <label>Assembly Status</label>
                                        <div class="field-value">{{ patientData.STTS_ASSEBLY }}</div>
                                    </div>

                                    <div class="p-field">
                                        <label>Last Updated</label>
                                        <div class="field-value">{{ formatDateTime(patientData.LAST_UPD_ASS) }}</div>
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

    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                form: {
                    noregister: '',
                    startdate: '',
                    enddate: '',
                    mode: '',
                    nosep: ''
                },
                dataSEP: {
                    metaData: {
                        code: 201
                    },
                    response: {
                        dpjp: {
                            nmDPJP: ''
                        },
                        peserta: {

                        },
                        katarak: '0',
                        kontrol: {}
                    }
                },
                showDialogSEP: false,
                isLoading: false,
                fullPage: true,
                patientData: {
                    "NOPENDAFTARAN": "",
                    "NOKTP": "",
                    "NAMAPASIEN": "",
                    "DATA_SINGKAT": "",
                    "ALAMAT": "",
                    "NOMR": "",
                    "KODERUANGAN": "",
                    "TGLREG": "",
                    "JENISKELAMIN": "",
                    "MASUKPOLY": "",
                    "MASUKPOLY_DISPLAY": "",
                    "JENISRAWAT": "",
                    "NAMADOKTER": "",
                    "POLI": "",
                    "KODEPOLI": "",
                    "NOSEP": "",
                    "CARABAYAR": "",
                    "KONDISISAATPULANG": "",
                    "DIAGNOSA_AWAL": "",
                    "NAMAKECAMATAN": "",
                    "KELUARPOLY": "",
                    "KELUARPOLY_NULL": "",
                    "TGLLAHIR": "",
                    "USIA": "",
                    "KDDOKTER": "",
                    "IDGROUPRUANGAN": "",
                    "TEMPKAMAR": "",
                    "TEMPKELAS": "",
                    "NOJAMINAN": "",
                    "STTS_PULANG": "",
                    "KLL": "",
                    "KET_KLL": "",
                    "NOTELP": "",
                    "KETERANGAN": "",
                    "RUJUK_INTERNAL": "",
                    "USER_ID": "",
                    "REFF_INTERNAL": "",
                    "KET_RUJUK_INT": "",
                    "LUNAS": "0",
                    "STTS_ASSEBLY": "",
                    "LAST_UPD_ASS": "",
                    "DEPOSIT": "0.00",
                    "PRACTITIONER_ID": "",
                    "SATU_SEHATID": "",
                    "LOCATION_ID": null,
                    "ENCOUNTER_ID": null,
                    "SATU_SEHAT_TIME": null,
                    "STTS_PRB": null,
                    "JLM_HARI_RAWAT": "",
                    "STATUS": "1",
                    "KODECARABAYAR": 0,
                    "DX_CAPTION": "",
                    "LOS": 0,
                    "TELAH_VERIF": "",
                    "STTS_IGD": "",
                    "NOREFF_IGD": "",
                    "NOMORANTRIAN": "",
                    "CARA_KELUAR": "",
                    "NAMA_RS_TUJUAN_RUJUK": "",
                    "KEADAAN_SAAT_PULANG": "0",
                    "KONDISI_MENINGGAL": "0",
                    "WAKTU_KEMATIAN": "",
                    "SEBAB_KEMATIAN": "",
                    "USIA_PASIEN": {
                        "tahun": 0,
                        "bulan": 0,
                        "hari": 0
                    },
                    "ID_CLIENT": 0,
                    "KETERANGAN_MENINGGAL": null
                }
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        methods: {
            formatDate(dateString) {
                if (!dateString) return '-';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            },

            async proses_syncSEP()
            {
                if (this.form.nosep == "") {
                    this.open("warning", "NOsep Wajib di isi")
                    return;
                }
                this.isLoading = true;
                await axios.post('/syncSEP', this.dataSEP)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.open("success", response.data.message)
                               this.isLoading = false
                               this.showDialogSEP = false;
                        } else {
                            
                            this.isLoading = false
                            this.open("warning", response.data.message)
                        }


                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata() {

                if (this.form.nosep == "") {
                    this.open("warning", "NOsep Wajib di isi")
                    return;
                }
                this.isLoading = true;
                await axios.post('/getdata_SEP', this.form)
                    .then(response => {
                        if (response.data.metaData.code == 200) {
                            this.showDialogSEP = true;
                            this.dataSEP = response.data.response
                            this.dataSEP.noregister = this.form.noregister
                            this.dataSEP.norm = this.patientData.NOMR
                            this.open("success", response.data.metaData.message + ", SEP ditemukan")
                            this.isLoading = false
                        } else {
                            this.isLoading = false
                            this.dataSEP = {
                                metaData: {

                                },
                                response: {
                                    dpjp: {

                                    },
                                    peserta: {}
                                }
                            };
                            this.isLoading = false
                            this.open("warning", response.data.metaData.message)
                        }


                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            formatDateTime(dateTimeString) {
                if (!dateTimeString) return '-';
                const date = new Date(dateTimeString);
                return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) + ' ' + date.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },
            getConditionText(condition) {
                const conditions = {
                    '0': 'Unknown',
                    '1': 'Poor',
                    '2': 'Good',
                    '3': 'Critical',
                    '4': 'Deceased'
                };
                return conditions[condition] || 'Unknown';
            },
            getConditionClass(condition) {
                const classes = {
                    '0': 'condition-unknown',
                    '1': 'condition-poor',
                    '2': 'condition-good',
                    '3': 'condition-critical',
                    '4': 'condition-deceased'
                };
                return classes[condition] || 'condition-unknown';
            },
            getStatusClass(status) {
                if (!status) return 'status-unknown';
                if (status === 'Sedang dirawat') return 'status-active';
                if (status.includes('Pulang')) return 'status-discharged';
                return 'status-other';
            },
            async datapasienpertransaksi() {
                if (!this.form.noregister) {
                    this.open('error', 'Please enter a registration number');
                    return;
                }

                this.isLoading = true;
                this.form.mode = "history8";
                await axios.post('/datapasienpertransaksi', this.form)
                    .then(response => {
                        if (response.data.response && response.data.response.length > 0) {
                            this.patientData = response.data.response[0];
                            this.open('success', 'Patient data retrieved successfully');
                        } else {
                            this.open('error', 'No patient found with that registration number');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Error retrieving patient data');
                    })
                    .finally(() => this.isLoading = false);
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                });
            }
        }
    }

</script>

<style scoped>
    /* Base styling */
    .card {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border: none;
        margin-bottom: 1.5rem;
    }

    .card:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        border-bottom: 1px solid #edf2f7;
        padding: 1rem 1.5rem;
        background-color: #fff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .card-body {
        padding: 1.5rem;
        background-color: #fff;
    }

    /* Fields styling */
    .p-field {
        margin-bottom: 1.25rem;
    }

    .p-field label {
        display: block;
        margin-bottom: 0.35rem;
        color: #64748b;
    }

    .field-value {
        padding: 0.25rem 0;
    }

    /* Search card */
    .search-card {
        background-color: #f8fafc;
    }

    .search-card .card-header {
        background-color: #e4ecf7;
        color: #2c5282;
    }

    .search-container {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .search-input {
        flex-grow: 1;
        max-width: 400px;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
    }

    .search-button {
        background-color: #3182ce;
        border-color: #3182ce;
    }

    .search-button:hover {
        background-color: #2c5282;
        border-color: #2c5282;
    }

    /* Patient card */
    .patient-card .card-header {
        background-color: #ebf4ff;
        color: #2c5282;
    }

    .mr-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2b6cb0;
        margin: 0;
    }

    .patient-name {
        font-weight: 600;
    }

    /* Hospitalization card */
    .hosp-card .card-header {
        background-color: #e6fffa;
        color: #285e61;
    }

    /* Diagnosis card */
    .diag-card .card-header {
        background-color: #fef3c7;
        color: #92400e;
    }

    /* Status badges */
    .status-badge {
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-weight: 600;
        font-size: 0.875rem;
        display: inline-block;
    }

    .status-active {
        background-color: #c6f6d5;
        color: #22543d;
    }

    .status-discharged {
        background-color: #e9d8fd;
        color: #553c9a;
    }

    .status-unknown {
        background-color: #e2e8f0;
        color: #4a5568;
    }

    .status-other {
        background-color: #bee3f8;
        color: #2c5282;
    }

    /* Condition badges */
    .condition-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.875rem;
        display: inline-block;
    }

    .condition-good {
        background-color: #c6f6d5;
        color: #22543d;
    }

    .condition-poor {
        background-color: #fed7d7;
        color: #9b2c2c;
    }

    .condition-critical {
        background-color: #feebc8;
        color: #9c4221;
    }

    .condition-deceased {
        background-color: #e2e8f0;
        color: #4a5568;
    }

    .condition-unknown {
        background-color: #edf2f7;
        color: #4a5568;
    }

    /* Payment method styling */
    .payment-method .field-value {
        font-weight: 600;
        color: #2b6cb0;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .card-body {
            padding: 1rem;
        }

        .status-badge {
            margin-top: 0.5rem;
        }
    }

</style>
