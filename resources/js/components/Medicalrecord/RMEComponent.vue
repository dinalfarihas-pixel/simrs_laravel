<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Header Card -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Kunjungan Pasien</h3>
                </div>
                <div class="card-body">
                    <label>No Rekam Medis</label>
                    <InputText v-model="no_rekam_medis" style="width: 18em;" placeholder="Cari pakai NIK atau No RM" />
                    <Button label="Cari" @click="getriwayat_lengkap()" icon="pi pi-search" />
                </div>
            </div>

             <div class="card" v-if="data_pasien.length>0">
                <div class="card-heeader">

                </div>
                <div class="card-body">

                    <div class="detail-section">
                        <h4 class="section-title">
                            <i class="pi pi-id-card"></i>
                            Informasi Pribadi
                        </h4>
                        <div class="detail-grid">
                            <div class="header-info">
                                <h3 class="patient-name">{{ patientData.NAMAPASIEN }}</h3>
                                <span class="patient-id">ID: {{ patientData.NOMR }}</span>
                            </div>
                            
                            <div class="detail-item">
                                <span class="label">No. Kartu:</span>
                                <span class="value">{{ patientData.NO_KARTU }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Tanggal Lahir:</span>
                                <span class="value">{{ (patientData.TGLLAHIR) }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Usia:</span>
                                <span class="value">{{ patientData.USIA_LENGKAP }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Jenis Kelamin:</span>
                                <span
                                    class="value">{{ patientData.JENISKELAMIN === 'L' ? 'Laki-laki' : 'Perempuan' }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Alamat: </span>
                                <span class="value">{{ patientData.namakelurahan }}</span>
                            </div>
                            
                            <div class="detail-item">
                                <span class="label">No HP:</span>
                                <span class="value">{{ patientData.NOTELP }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Info -->
            <div class="results-info">
                <span class="results-count">{{ filteredData.length }} Kali kunjungan</span>
            </div>

           
 
            <div class="card modern-card table-card">
                <div class="table-container">
                    <table class="modern-table">
                        <thead class="sticky-header">
                            <tr>
                                <th class="col-kunjungan">
                                    <div class="header-content">
                                        <span>Kunjungan</span>
                                        <Button icon="pi pi-sort" @click="sortBy('TGLREG')"
                                            class="p-button-text p-button-sm sort-btn" />
                                    </div>
                                </th>
                                <th class="col-pemeriksaan">
                                    <div class="header-content">
                                        <span>Pemeriksaan</span>
                                        <Button icon="pi pi-sort" @click="sortBy('NAMADOKTER')"
                                            class="p-button-text p-button-sm sort-btn" />
                                    </div>
                                </th>
                                <th class="col-therapy">
                                    <span>Terapi</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in filteredData" :key="row.NOREGISTER" class="data-row">
                                <td class="visit-cell">
                                    <div class="visit-info">
                                        <Badge :value="row.TGLREG" class="date-badge"></Badge>
                                        <div class="doctor-info">
                                            <strong>{{ row.NAMADOKTER }}</strong>
                                        </div>
                                        <div class="poli-info">
                                            <span class="label">POLI:</span> {{ row.POLI }}
                                        </div>
                                        <div class="reg-info">
                                            <span class="label">NOREG:</span> {{ row.NOREGISTER }}
                                        </div>
                                        <div class="rujuk-info" v-if="row.KET_RUJUK_INT">
                                            <small>{{ row.KET_RUJUK_INT }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td class="exam-cell">
                                    <div class="vital-signs">
                                        <div class="vital-item">
                                            <span class="vital-label">Suhu:</span>
                                            <span class="vital-value">{{ row.SUHU }}°C</span>
                                        </div>
                                        <div class="vital-item">
                                            <span class="vital-label">TD:</span>
                                            <span class="vital-value">{{ row.TENSI }}</span>
                                        </div>
                                        <div class="vital-item">
                                            <span class="vital-label">SP2O:</span>
                                            <span class="vital-value">{{ row.SP2O }}</span>
                                        </div>
                                        <div class="vital-item">
                                            <span class="vital-label">NADI:</span>
                                            <span class="vital-value">{{ row.NADI }}</span>
                                        </div>
                                    </div>
                                    <div class="soap-notes">
                                        <div class="soap-item" v-if="row.SUBJEK">
                                            <span class="soap-label">S:</span>
                                            <span class="soap-content">{{ row.SUBJEK }}</span>
                                        </div>
                                        <div class="soap-item" v-if="row.OBJEK">
                                            <span class="soap-label">O:</span>
                                            <span class="soap-content">{{ row.OBJEK }}</span>
                                        </div>
                                        <div class="soap-item" v-if="row.ASSESMEN">
                                            <span class="soap-label">A:</span>
                                            <span class="soap-content">{{ row.ASSESMEN }}</span>
                                        </div>
                                        <div class="soap-item" v-if="row.PLAN">
                                            <span class="soap-label">P:</span>
                                            <span class="soap-content">{{ row.PLAN }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="therapy-cell">
                                    <div class="therapy-content" v-html="row.OBATAN_WEBVIEW"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Badge from 'primevue/badge';
    import Card from 'primevue/card';

    export default {
        components: {
            Loading,
            Badge,
            Card
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                no_rekam_medis: '',
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                fullPage: true,
                riwayat: [],
                filter: {
                    globalSearch: ''
                },
                sort: {
                    field: null,
                    order: 'asc'
                },
                data_pasien: [],
                patientData: null
            };
        },
        computed: {
            filteredData() {
                let filtered = [...this.riwayat];

                // Global search
                if (this.filter.globalSearch) {
                    const searchTerm = this.filter.globalSearch.toLowerCase();
                    filtered = filtered.filter(item => {
                        return Object.values(item).some(value =>
                            value && value.toString().toLowerCase().includes(searchTerm)
                        );
                    });
                }

                // Sort data
                if (this.sort.field) {
                    filtered.sort((a, b) => {
                        const aValue = a[this.sort.field];
                        const bValue = b[this.sort.field];

                        if (this.sort.order === 'asc') {
                            return aValue > bValue ? 1 : -1;
                        } else {
                            return aValue < bValue ? 1 : -1;
                        }
                    });
                }

                return filtered;
            }
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('norm')) {
                this.no_rekam_medis = urlParams.get('norm')
                this.getdata_pasien()
                this.getriwayat_lengkap();

            }

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            formatDate(dateString) {
                if (!dateString) return '-';
                const date = new Date(dateString);
                return date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            },
            getStatusText(status) {
                const statusMap = {
                    '1': 'Aktif',
                    '0': 'Tidak Aktif'
                };
                return statusMap[status] || 'Unknown';
            },
            getStatusSeverity(status) {
                return status === '1' ? 'success' : 'danger';
            },
            getPendidikanText(pendidikan) {
                const pendidikanMap = {
                    '1': 'SD',
                    '2': 'SMP',
                    '3': 'SMA',
                    '4': 'D3',
                    '5': 'S1',
                    '6': 'S2',
                    '7': 'S3'
                };
                return pendidikanMap[pendidikan] || 'Tidak Diketahui';
            },

            async getriwayat_lengkap() {
                const dataform = new FormData();

                this.getdata_pasien()
                this.form.norm = this.no_rekam_medis;
                this.isLoading = true;
                await axios.post('/riwayat_kunjungan', this.form)
                    .then(response => {
                        this.riwayat = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_pasien() {
                const dataform = new FormData();
                this.form.nomr = this.no_rekam_medis;
                this.isLoading = true;
                this.form.mode = 3
                await axios.post('/masterpasien', this.form)
                    .then(response => {
                        this.data_pasien = response.data.response
                        if (this.data_pasien.length > 0) {
                            this.patientData = this.data_pasien[0]
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            resetFilter() {
                this.filter = {
                    globalSearch: ''
                };
                this.sort = {
                    field: null,
                    order: 'asc'
                };
            },

            sortBy(field) {
                if (this.sort.field === field) {
                    this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sort.field = field;
                    this.sort.order = 'asc';
                }
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
        },
    }

</script>

<style scoped>
    /* Modern Card Styling */

    .modern-card {
        border: none;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        margin-bottom: 20px;
    }
    .detail-item {
        display: flex;
        padding: 2px 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .detail-item:last-child {
        border-bottom: none;
    }

    .modern-card .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px 12px 0 0;
        
        border: none;
    }

    .modern-card .card-title {
        color: white;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
    }

    .modern-card .card-body {
        padding: 20px;
    }

    /* Search Section */
    .search-section {
        display: flex;
        gap: 15px;
        align-items: center;
        flex-wrap: wrap;
    }

    .search-input {
        flex: 1;
        min-width: 300px;
        padding: 12px 16px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .reset-btn {
        height: 46px;
        padding: 0 20px;
        border-radius: 8px;
    }

    /* Results Info */
    .results-info {
        margin-bottom: 15px;
        padding: 0 5px;
    }

    .results-count {
        color: #6c757d;
        font-size: 14px;
        font-weight: 500;
    }

    /* Table Styling */
    .table-card {
        margin-bottom: 0;
    }



    .table-container {
        max-height: 70vh;
        overflow-y: auto;
        border-radius: 8px;
    }

    .modern-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }

    /* Sticky Header */
    .sticky-header {
        position: sticky;
        top: 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .sticky-header th {
        padding: 16px;
        font-weight: 600;
        color: #495057;
        border-bottom: 2px solid #dee2e6;
    }

    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .sort-btn {
        opacity: 0.6;
        transition: opacity 0.3s ease;
    }

    .sort-btn:hover {
        opacity: 1;
    }

    /* Column Widths */
    .col-kunjungan {
        width: 25%;
    }

    .col-pemeriksaan {
        width: 40%;
    }

    .col-therapy {
        width: 35%;
    }

    /* Table Rows */
    .data-row {
        transition: all 0.3s ease;
        border-bottom: 1px solid #e9ecef;
    }

    .data-row:hover {
        background-color: #f8f9fa;
    }

    .data-row td {
        padding: 16px;
        vertical-align: top;
    }

    /* Visit Cell */
    .visit-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .date-badge {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        align-self: flex-start;
    }

    .doctor-info {
        color: #2c3e50;
        font-size: 15px;
    }

    .poli-info,
    .reg-info {
        color: #6c757d;
        font-size: 13px;
    }

    .label {
        font-weight: 600;
        color: #495057;
    }

    .rujuk-info {
        color: #28a745;
        font-style: italic;
        margin-top: 4px;
    }

    /* Examination Cell */
    .exam-cell {
        background-color: #fafbfc;
    }

    .vital-signs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 16px;
        padding: 12px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e9ecef;
    }

    .vital-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .vital-label {
        font-weight: 500;
        color: #495057;
        font-size: 12px;
    }

    .vital-value {
        font-weight: 600;
        color: #2c3e50;
        font-size: 13px;
    }

    .soap-notes {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .soap-item {
        display: flex;
        gap: 8px;
        padding: 8px;
        background: white;
        border-radius: 4px;
        border-left: 3px solid #667eea;
    }

    .soap-label {
        font-weight: 700;
        color: #667eea;
        min-width: 20px;
        font-size: 13px;
    }

    .patient-icon {
  font-size: 2.5rem;
  margin-right: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 50%;
}

.header-info {
  flex: 1;
}

.patient-name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.patient-id {
  font-size: 0.9rem;
  opacity: 0.9;
}

.status-badge {
  position: absolute;
  top: 15px;
  right: 20px;
}

.patient-details {
  padding: 0;
}

.detail-section {
  margin-bottom: 25px;
  padding: 0 20px;
}

.detail-section:last-child {
  margin-bottom: 0;
  padding-bottom: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

    .soap-content {
        color: #495057;
        font-size: 13px;
        line-height: 1.4;
    }

    /* Therapy Cell */
    .therapy-content {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #e9ecef;
        font-size: 13px;
        line-height: 1.5;
    }

    /* Scrollbar Styling */
    .table-container::-webkit-scrollbar {
        width: 6px;
    }

    .table-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    .table-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }

    .table-container::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .search-section {
            flex-direction: column;
            align-items: stretch;
        }

        .search-input {
            min-width: 100%;
        }

        .vital-signs {
            grid-template-columns: 1fr;
        }

        .modern-table {
            font-size: 12px;
        }

        .modern-card .card-body {
            padding: 15px;
        }
    }

</style>
