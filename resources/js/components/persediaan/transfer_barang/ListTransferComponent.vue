<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Filter Card -->
            <div class="card shadow-sm">
                <div class="card-header">
                    <h3 class="card-title mb-0">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        Filter Permintaan Transfer
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="d-flex flex-wrap align-items-center gap-2">
                                <div class="form-group mb-0">
                                    <label class="form-label small text-muted">Tanggal Awal</label>
                                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                        placeholder="Pilih tanggal awal" style="width: 12em;" />
                                </div>
                                <div class="form-group mb-0">
                                    <label class="form-label small text-muted">Tanggal Akhir</label>
                                    <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                        placeholder="Pilih tanggal akhir" style="width: 12em;" />
                                </div>
                                <div class="form-group mb-0">
                                    <label class="form-label small text-muted">&nbsp;</label>
                                    <Button label="Cari" @click="get_data_list_transfer_v3()" icon="pi pi-search"
                                        class="p-button p-button-primary" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="d-flex flex-wrap justify-content-end gap-2">
                                <Button label="Selesai" @click="filter_data(1)" class="p-button p-button-success"
                                    :badge="getStatusCount(1).toString()" />
                                <Button label="Menunggu" @click="filter_data(2)" class="p-button p-button-warning"
                                    :badge="getStatusCount(2).toString()" />
                                <Button label="Semua" @click="filter_data(0)" class="p-button p-button-secondary"
                                    :badge="temp_data.length.toString()" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Card -->
            <div class="row">
                <div class="card shadow-sm col-md-12">
                    <div class="card-header bg-light">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="card-title mb-0">
                                <i class="fas fa-list mr-2"></i>
                                Daftar Permintaan Transfer
                            </h3>
                            <span class="badge badge-info">{{ fact.length }} permintaan</span>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <!-- Empty State -->
                        <div v-if="fact.length === 0 && !isLoading" class="text-center py-5">
                            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">Tidak ada data permintaan transfer</h5>
                            <p class="text-muted">Pilih tanggal dan klik tombol Cari untuk menampilkan data</p>
                        </div>

                        <!-- Data Table -->
                        <div v-else class="table-responsive sticky-table-container">
                            <table class="table table-hover table-striped mb-0">
                                <thead class="thead-light sticky-header">
                                    <tr>
                                        <th style="width: 12%">
                                            <i class="fas fa-calendar mr-1"></i>
                                            Tanggal
                                        </th>
                                        <th style="width: 20%">
                                            <i class="fas fa-map-marker-alt mr-1"></i>
                                            Asal Permintaan
                                        </th>
                                        <th style="width: 20%">
                                            <i class="fas fa-arrow-right mr-1"></i>
                                            Tujuan Permintaan
                                        </th>
                                        <th style="width: 15%">
                                            <i class="fas fa-tasks mr-1"></i>
                                            Status
                                        </th>
                                        <th style="width: 18%">
                                            <i class="fas fa-sticky-note mr-1"></i>
                                            Catatan
                                        </th>
                                        <th style="width: 15%" class="text-center">
                                            <i class="fas fa-cogs mr-1"></i>
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in fact" :key="index" class="align-middle">
                                        <td>
                                            <div class="d-flex flex-column">
                                                <strong class="text-primary">{{ data.NO_PERMINTAAN }}</strong>
                                                <small class="text-muted">
                                                    <i class="fas fa-clock mr-1"></i>
                                                    {{ formatDate(data.TANGGAL) }}
                                                </small>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-building text-info mr-2"></i>
                                                <span>{{ data.LOKASI }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <i class="fas fa-arrow-right text-success mr-2"></i>
                                                <span>{{ data.TUJUAN }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span v-if="data.TELAH_DIPROSES == 0"
                                                class="badge badge-warning badge-pill">
                                                <i class="fas fa-hourglass-half mr-1"></i>
                                                Menunggu
                                            </span>
                                            <span v-else-if="data.TELAH_DIPROSES == 1"
                                                class="badge badge-success badge-pill">
                                                <i class="fas fa-check-circle mr-1"></i>
                                                Selesai
                                            </span>
                                            <span v-else class="badge badge-secondary badge-pill">
                                                <i class="fas fa-question-circle mr-1"></i>
                                                Tidak Diketahui
                                            </span>
                                        </td>
                                        <td>
                                            <div class="text-truncate" :title="data.CATATAN" style="max-width: 150px;">
                                                {{ data.CATATAN || '-' }}
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <a :href="`/persediaan/do-transfer?no_permintaan=${data.NO_PERMINTAAN}`"
                                                target="_blank" class="btn btn-sm btn-primary btn-action"
                                                :title="`Proses permintaan ${data.NO_PERMINTAAN}`">
                                                <i class="fas fa-cogs mr-1"></i>
                                                Proses
                                            </a>
                                        </td>
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

    export default {
        name: 'TransferRequestPage',
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                fullPage: true,
                temp_data: []
            };
        },
        computed: {
            // Add computed properties for better reactivity
            filteredData() {
                return this.fact;
            }
        },
        mounted() {
            this.initializeDates();
            this.get_data_list_transfer_v3();
        },
        created() {

        },
        methods: {
            initializeDates() {
                const currentDate = new Date();
                this.form.startdate = currentDate;
                this.form.enddate = currentDate;
            },

            formatDate(dateString) {
                if (!dateString) return '-';
                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                } catch (error) {
                    return dateString;
                }
            },

            async get_data_list_transfer_v3() {
                try {
                    this.isLoading = true;
                    const response = await axios.post('/persediaan/get_data_list_transfer_v3', this.form);

                    if (response.data && response.data.response) {
                        this.fact = response.data.response;
                        this.temp_data = [...this.fact]; // Create a copy
                        this.showToast('success', 'Data berhasil dimuat');
                    } else {
                        this.fact = [];
                        this.temp_data = [];
                        this.showToast('warning', 'Tidak ada data ditemukan');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    this.showToast('error', 'Gagal memuat data');
                    this.fact = [];
                    this.temp_data = [];
                } finally {
                    this.isLoading = false;
                }
            },

            filter_data(status) {
                // Reset to original data
                this.fact = [...this.temp_data];

                // Apply filters
                switch (status) {
                    case 1: // Selesai
                        this.fact = this.fact.filter(x => x.TELAH_DIPROSES == '1');
                        break;
                    case 2: // Menunggu
                        this.fact = this.fact.filter(x => x.TELAH_DIPROSES == '0');
                        break;
                    case 0: // Semua
                    default:
                        // Show all data
                        break;
                }

                // Show toast notification
                const statusLabels = {
                    0: 'Semua',
                    1: 'Selesai',
                    2: 'Menunggu'
                };
            },

            getStatusCount(status) {
                if (!this.temp_data.length) return 0;

                switch (status) {
                    case 1: // Selesai
                        return this.temp_data.filter(x => x.TELAH_DIPROSES == '1').length;
                    case 2: // Menunggu
                        return this.temp_data.filter(x => x.TELAH_DIPROSES == '0').length;
                    default:
                        return this.temp_data.length;
                }
            },

            showToast(type, message) {
                if (this.$toast) {
                    this.$toast.open({
                        message: message,
                        position: 'top-right',
                        type: type,
                        duration: 3000,
                        dismissible: true
                    });
                }
            },

            // Legacy method for backward compatibility
            open(type, message) {
                this.showToast(type, message);
            }
        }
    };

</script>

<style scoped>
    .gap-2 {
        gap: 0.5rem;
    }

    .btn-action {
        transition: all 0.2s ease;
    }

    .btn-action:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .table-hover tbody tr:hover {
        background-color: rgba(0, 123, 255, 0.05);
    }

    .badge-pill {
        font-size: 0.75em;
        padding: 0.375rem 0.75rem;
    }

    .form-label {
        font-weight: 500;
        margin-bottom: 0.25rem;
        display: block;
    }

    .card {
        border: none;
        margin-bottom: 1.5rem;
    }

    .card-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .text-truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Sticky Table Styles */
    .sticky-table-container {
        max-height: 600px;
        overflow-y: auto;
        position: relative;
    }

    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #f8f9fa !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .sticky-header th {
        background-color: #f8f9fa !important;
        border-bottom: 2px solid #dee2e6;
        font-weight: 600;
        white-space: nowrap;
        padding: 12px 8px;
    }

    /* Ensure proper scrolling behavior */
    .sticky-table-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .sticky-table-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .sticky-table-container::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }

    .sticky-table-container::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    @media (max-width: 768px) {
        .d-flex.flex-wrap {
            flex-direction: column;
        }

        .gap-2>* {
            margin-bottom: 0.5rem;
        }

        .table-responsive {
            font-size: 0.875rem;
        }

        .sticky-table-container {
            max-height: 500px;
        }

        .sticky-header th {
            padding: 8px 4px;
            font-size: 0.875rem;
        }
    }

</style>