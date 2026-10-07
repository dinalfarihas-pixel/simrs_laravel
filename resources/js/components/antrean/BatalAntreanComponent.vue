<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <ConfirmDialog></ConfirmDialog> 
            <!-- Date Selection Card -->
            <div class="card elevation-0 mb-4">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        Tanggal Pelayanan
                    </h3>
                </div>
                <div class="card-body">
                    <div class="d-flex align-items-center gap-3">
                        <Calendar 
                            v-model="form.startdate" 
                            class="text-sm" 
                            :showIcon="true" 
                            view="date"
                            dateFormat="dd/mm/yy" 
                            :yearNavigator="true" 
                            yearRange="2000:2030"
                            placeholder="Pilih tanggal" 
                            style="width: 12em;" 
                        />
                        <Button 
                            label="Fetch Data" 
                            @click="fetchData()" 
                            icon="pi pi-search" 
                            class="p-button p-button-primary"
                            :loading="isLoading"
                        />
                    </div>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="stats-cards mb-4">
                <div class="stat-card stat-card-primary">
                    <div class="stat-content">
                        <div class="stat-number">{{ totalPatients }}</div>
                        <div class="stat-label">TOTAL PASIEN</div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-bars">
                            <div class="bar" style="height: 60%"></div>
                            <div class="bar" style="height: 40%"></div>
                            <div class="bar" style="height: 80%"></div>
                            <div class="bar" style="height: 30%"></div>
                            <div class="bar" style="height: 50%"></div>
                        </div>
                    </div>
                </div>

                <div class="stat-card stat-card-success">
                    <div class="stat-content">
                        <div class="stat-number">{{ activePatients }}</div>
                        <div class="stat-label">PASIEN AKTIF</div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-bars">
                            <div class="bar" style="height: 90%"></div>
                            <div class="bar" style="height: 70%"></div>
                            <div class="bar" style="height: 85%"></div>
                            <div class="bar" style="height: 60%"></div>
                            <div class="bar" style="height: 95%"></div>
                        </div>
                    </div>
                </div>

                <div class="stat-card stat-card-warning">
                    <div class="stat-content">
                        <div class="stat-number">{{ cancelledPatients }}</div>
                        <div class="stat-label">PASIEN BATAL</div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-bars">
                            <div class="bar" style="height: 45%"></div>
                            <div class="bar" style="height: 70%"></div>
                            <div class="bar" style="height: 35%"></div>
                            <div class="bar" style="height: 80%"></div>
                            <div class="bar" style="height: 25%"></div>
                        </div>
                    </div>
                </div>

                <div class="stat-card stat-card-info">
                    <div class="stat-content">
                        <div class="stat-number">{{ uniqueDepartments }}</div>
                        <div class="stat-label">DEPARTEMEN</div>
                    </div>
                    <div class="stat-chart">
                        <div class="chart-bars">
                            <div class="bar" style="height: 75%"></div>
                            <div class="bar" style="height: 85%"></div>
                            <div class="bar" style="height: 65%"></div>
                            <div class="bar" style="height: 90%"></div>
                            <div class="bar" style="height: 80%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-table mr-2"></i>
                                Data Antrian Pasien
                            </h3>
                            <div class="card-tools">
                                <button class="btn btn-sm btn-refresh" @click="fetchData()" :disabled="isLoading">
                                    <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoading }"></i> 
                                    Refresh
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <!-- Filters -->
                            <div class="filters-section p-3 bg-light border-bottom">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Pencarian:</label>
                                            <input 
                                                type="text" 
                                                class="form-control form-control-sm" 
                                                v-model="searchTerm" 
                                                placeholder="Cari pasien, kode booking, atau dokter..."
                                            >
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Departemen:</label>
                                            <select class="form-control form-control-sm" v-model="selectedDepartment">
                                                <option value="">Semua Departemen</option>
                                                <option v-for="dept in departments" :key="dept" :value="dept">
                                                    {{ getDepartmentName(dept) }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Status:</label>
                                            <select class="form-control form-control-sm" v-model="selectedStatus">
                                                <option value="">Semua Status</option>
                                                <option value="active">Aktif</option>
                                                <option value="cancelled">Batal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group mb-2">
                                            <label class="form-label">Per Halaman:</label>
                                            <select class="form-control form-control-sm" v-model="perPage">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Table Container with Sticky Header -->
                            <div class="table-container">
                                <table class="table table-bordered table-striped table-hover mb-0">
                                    <thead class="sticky-header">
                                        <tr>
                                            <th class="text-center" width="120">Aksi</th>
                                            <th class="text-center" width="120">Kode Booking</th>
                                            <th width="200">Nama Pasien</th>
                                            <th class="text-center" width="120">No. MR</th>
                                            <th class="text-center" width="100">Poli Klinik</th>
                                            <th width="180">Dokter</th>
                                            <th class="text-center" width="120">No. Antrian</th>
                                            <th class="text-center" width="100">Status</th>
                                            <th class="text-center" width="120">Check-In</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isLoading && paginatedData.length === 0">
                                            <td colspan="9" class="text-center p-4">
                                                <i class="fas fa-spinner fa-spin mr-2"></i>
                                                Memuat data...
                                            </td>
                                        </tr>
                                        <tr v-else-if="!isLoading && paginatedData.length === 0">
                                            <td colspan="9" class="text-center p-4 text-muted">
                                                <i class="fas fa-info-circle mr-2"></i>
                                                Tidak ada data yang ditemukan
                                            </td>
                                        </tr>
                                        <tr v-else v-for="(patient, index) in paginatedData" :key="patient.KODE_BOOKING">
                                            <td class="text-center">
                                                <div class="btn-group" role="group">
                                                    <button 
                                                        class="btn btn-sm btn-primary" 
                                                        @click="viewDetails(patient)"
                                                        title="Lihat Detail"
                                                    >
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    <Button class="btn p-button-warn" label="Batalkan" @click="confirmCancelBooking(patient)"/> 
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <strong class="text-primary">{{ patient.KODE_BOOKING }}</strong>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <i class="fas fa-user-circle text-info mr-2"></i>
                                                    <span>{{ patient.NAMAPASIEN }}</span>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <span  >{{ patient.NOMR }}</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge badge-info" :class="getDepartmentClass(patient.KODEPOLI)">
                                                    {{ getDepartmentName(patient.KODEPOLI) }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <i class="fas fa-user-md text-success mr-2"></i>
                                                    <span>{{ patient.NAMADOKTER ? patient.NAMADOKTER.trim() : '-' }}</span>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <div class="queue-numbers">
                                                    <small class="d-block">
                                                        <span class="badge badge-secondary">
                                                            Loket: {{ patient.ANT_LOKET }}
                                                        </span>
                                                    </small>
                                                    <small class="d-block mt-1">
                                                        <span class="badge badge-secondary">
                                                            Poli: {{ patient.ANT_POLI }}
                                                        </span>
                                                    </small>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <span 
                                                    v-if="patient.BATAL === 'BATAL'" 
                                                    class="badge badge-danger status-badge"
                                                >
                                                    <i class="fas fa-times-circle"></i> Batal
                                                </span>
                                                <span 
                                                    v-else 
                                                    class="badge badge-success status-badge"
                                                >
                                                    <i class="fas fa-check-circle"></i> Aktif
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span 
                                                    class="badge" 
                                                    :class="patient.CHECK_IN === 'BELUM CHECKIN' ? 'badge-warning' : 'badge-info'"
                                                >
                                                    {{ patient.CHECK_IN }}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Pagination -->
                            <div class="pagination-section p-3 bg-light border-top" v-if="totalPages > 1">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <p class="mb-0 text-muted">
                                            Menampilkan {{ startIndex + 1 }} - {{ endIndex }} dari {{ filteredData.length }} data
                                        </p>
                                    </div>
                                    <div class="col-md-6">
                                        <nav>
                                            <ul class="pagination pagination-sm justify-content-end mb-0">
                                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                    <button class="page-link" @click="currentPage = 1" :disabled="currentPage === 1">
                                                        <i class="fas fa-angle-double-left"></i>
                                                    </button>
                                                </li>
                                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                    <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                                                        <i class="fas fa-angle-left"></i>
                                                    </button>
                                                </li>
                                                <li 
                                                    v-for="page in visiblePages" 
                                                    :key="page"
                                                    class="page-item" 
                                                    :class="{ active: currentPage === page }"
                                                >
                                                    <button class="page-link" @click="currentPage = page">
                                                        {{ page }}
                                                    </button>
                                                </li>
                                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                                    <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
                                                        <i class="fas fa-angle-right"></i>
                                                    </button>
                                                </li>
                                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                                    <button class="page-link" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
                                                        <i class="fas fa-angle-double-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
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
import { FilterMatchMode } from 'primevue/api';
import Loading from 'vue-loading-overlay';
import ConfirmDialog from 'primevue/confirmdialog'; 
import Toast from 'primevue/toast';

export default {
    components: {
        Loading,
        ConfirmDialog,
        Toast
    },
    props: {
        msg: String,
    },
    data() {
        return {
            searchTerm: '',
            selectedDepartment: '',
            selectedStatus: '',
            perPage: 10,
            currentPage: 1,
            
            queueData: {
                metadata: {
                    code: 200,
                    message: "OK"
                },
                data_antrian: []
            },
            form: {
                startdate: '',
                enddate: '',
            },
            isLoading: false,
            fullPage: true,
            filters1: {},
        };
    },
    mounted() {
        this.form.startdate = new Date();
        this.fetchData();
    },
    created() {
        this.initFilters1();
    },
    computed: {
        patients() {
            return this.queueData.data_antrian || [];
        },
        totalPatients() {
            return this.patients.length;
        },
        activePatients() {
            return this.patients.filter(patient => patient.BATAL !== 'BATAL').length;
        },
        cancelledPatients() {
            return this.patients.filter(patient => patient.BATAL === 'BATAL').length;
        },
        departments() {
            return [...new Set(this.patients.map(patient => patient.KODEPOLI))];
        },
        uniqueDepartments() {
            return this.departments.length;
        },
        filteredData() {
            let filtered = this.patients;
            
            // Search filter
            if (this.searchTerm) {
                const searchLower = this.searchTerm.toLowerCase();
                filtered = filtered.filter(patient =>
                    patient.NAMAPASIEN?.toLowerCase().includes(searchLower) ||
                    patient.KODE_BOOKING?.toLowerCase().includes(searchLower) ||
                    patient.NOMR?.includes(this.searchTerm) ||
                    patient.NAMADOKTER?.toLowerCase().includes(searchLower)
                );
            }
            
            // Department filter
            if (this.selectedDepartment) {
                filtered = filtered.filter(patient => patient.KODEPOLI === this.selectedDepartment);
            }
            
            // Status filter
            if (this.selectedStatus) {
                if (this.selectedStatus === 'active') {
                    filtered = filtered.filter(patient => patient.BATAL !== 'BATAL');
                } else if (this.selectedStatus === 'cancelled') {
                    filtered = filtered.filter(patient => patient.BATAL === 'BATAL');
                }
            }
            
            return filtered;
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.perPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.perPage;
        },
        endIndex() {
            return Math.min(this.startIndex + this.perPage, this.filteredData.length);
        },
        paginatedData() {
            return this.filteredData.slice(this.startIndex, this.endIndex);
        },
        visiblePages() {
            const pages = [];
            const start = Math.max(1, this.currentPage - 2);
            const end = Math.min(this.totalPages, this.currentPage + 2);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    watch: {
        perPage() {
            this.currentPage = 1;
        },
        searchTerm() {
            this.currentPage = 1;
        },
        selectedDepartment() {
            this.currentPage = 1;
        },
        selectedStatus() {
            this.currentPage = 1;
        }
    },
    methods: {
        fetchData() {
            this.getdata_antrean();
        },
        initFilters1() {
            this.filters1 = {
                'global': {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS
                }
            };
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
         confirmCancelBooking(patient) {
            this.$confirm.require({
                message: `Apakah Anda yakin ingin membatalkan booking untuk pasien "${patient.NAMAPASIEN}"?\n\nKode Booking: ${patient.KODE_BOOKING}\nDokter: ${patient.NAMADOKTER}`,
                 header: 'Hapus konfirmasi',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger', 
                accept: () => {
                    this.cancelBooking(patient);
                },
                reject: () => {
                    this.open(  'warning', 'Pembatalan booking dibatalkan'
                    );
                }
            });
        },
        async getdata_antrean() {
            this.isLoading = true;
            
            try {
                const response = await axios.post('/getdata_antrean', this.form);
                
                if (response.data && response.data.data_antrian) {
                    this.queueData = response.data;
                } else {
                    this.queueData = {
                        metadata: {
                            code: 200,
                            message: "No data"
                        },
                        data_antrian: []
                    };
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                this.queueData = {
                    metadata: {
                        code: 500,
                        message: "Error"
                    },
                    data_antrian: []
                };
            } finally {
                this.isLoading = false;
            }
        },
        getDepartmentName(code) {
            const departments = {
                'SAR': 'Saraf',
                'PAR': 'Paru',
                'GIG': 'Gigi',
                'MAT': 'Mata',
                'THT': 'THT',
                'INT': 'Penyakit Dalam',
                'PED': 'Anak',
                'OBS': 'Kebidanan',
                'SUR': 'Bedah',
                'ORT': 'Ortopedi'
            };
            return departments[code] || code;
        },
        getDepartmentClass(code) {
            const classes = {
                'SAR': 'badge-warning',
                'PAR': 'badge-info',
                'GIG': 'badge-success',
                'MAT': 'badge-primary',
                'THT': 'badge-secondary',
                'INT': 'badge-danger',
                'PED': 'badge-light',
                'OBS': 'badge-dark',
                'SUR': 'badge-warning',
                'ORT': 'badge-info'
            };
            return classes[code] || 'badge-secondary';
        },
        viewDetails(patient) {
            // Implement view details functionality
            console.log('View details for:', patient);
        },
        async cancelBooking(patient) {
            // Implement 
            try {
            this.isLoading = true; 

            const param = {
                "kodebooking":patient.KODE_BOOKING
            } 
            const response = await axios.post('/batalkan_antrean_bpjs',param); 
            if(response.data.metadata.code==200)
            {
                this.open(
                    'success',response.data.metadata.message
                );
                this.getdata_antrean();
            }
            else
            {
                this.open(
                    'warning', 
                response.data.metadata.message
                );
            }
           
               
                
            } catch (error) {
                console.error('Error fetching data:', error);
                 
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
/* Statistics Cards */
.stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}

.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    min-height: 100px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.stat-card-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card-success {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card-warning {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card-info {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-content {
    position: relative;
    z-index: 2;
}

.stat-number {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 5px;
    line-height: 1;
}

.stat-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    opacity: 0.9;
    text-transform: uppercase;
}

.stat-chart {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 35px;
    opacity: 0.3;
}

.chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 100%;
}

.bar {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
    min-height: 20%;
    transition: all 0.3s ease;
}

.stat-card:hover .bar {
    background: rgba(255, 255, 255, 0.8);
}

/* Table Styles */
.table-container {
    max-height: 600px;
    overflow-y: auto;
    position: relative;
}

.sticky-header {
    position: sticky;
    top: 0;
    background: #f8f9fa;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sticky-header th {
    background: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    font-weight: 600;
    
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 12px 8px;
    white-space: nowrap;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.02);
}

.table-hover tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.05);
}

.table td {
    padding: 12px 8px;
    vertical-align: middle;
    
}

/* Filters Section */
.filters-section {
    border-bottom: 1px solid #dee2e6;
}

.form-label {
    font-weight: 600;
    font-size: 0.8rem;
    color: #495057;
    margin-bottom: 4px;
}

.form-control-sm {
    font-size: 0.875rem;
}

/* Status Badges */
.status-badge {
    font-size: 0.75rem;
    padding: 4px 8px;
}

.badge {
    font-size: 0.75rem;
    padding: 4px 8px;
}

/* Queue Numbers */
.queue-numbers .badge {
    font-size: 0.7rem;
    padding: 2px 6px;
}

/* Pagination */
.pagination-section {
    border-top: 1px solid #dee2e6;
}

.pagination-sm .page-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
}

.page-link {
    color: #007bff;
    border: 1px solid #dee2e6;
}

.page-link:hover {
    color: #0056b3;
    background-color: #e9ecef;
}

.page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
}

/* Button Styles */
.btn-refresh {
    background: #17a2b8;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.btn-refresh:hover {
    background: #138496;
}

.btn-refresh:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
    .stats-cards {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
    } 
    
    .table-container {
        max-height: 500px;
    }
    
    .sticky-header th {
        padding: 8px 4px; 
    }
    
    .table td {
        padding: 8px 4px; 
    }
}

/* Custom scrollbar */
.table-container::-webkit-scrollbar {
    width: 8px;
}

.table-container::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>