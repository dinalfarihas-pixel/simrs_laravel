<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-2">
                        <h5 class="mb-0">Data Persediaan Radiologi</h5>
                        <span class="badge badge-info">{{ filteredFact.length }} items</span>
                    </div>
                    <div class="filter-controls">
                        <button class="btn btn-sm btn-outline-secondary" @click="toggleAdvancedFilter">
                            <i class="pi pi-sliders-h"></i> Advanced Filter
                        </button>
                        <button v-if="hasActiveFilters" class="btn btn-sm btn-outline-danger" @click="resetFilters">
                            <i class="pi pi-times"></i> Reset
                        </button>
                    </div>
                </div>

                <!-- Advanced Filter Section -->
                <div v-if="showAdvancedFilter" class="card-body border-bottom bg-light">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="form-label">Barcode</label>
                            <input type="text" v-model="filters.barcode" class="form-control form-control-sm" 
                                placeholder="Cari barcode...">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Nama Barang</label>
                            <input type="text" v-model="filters.nama" class="form-control form-control-sm" 
                                placeholder="Cari nama barang...">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Satuan</label>
                            <input type="text" v-model="filters.satuan" class="form-control form-control-sm" 
                                placeholder="Cari satuan...">
                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <label class="form-label">SNOMAD</label>
                            <select v-model="filters.snomad" class="form-control form-control-sm">
                                <option value="">-- Pilih SNOMAD --</option>
                                <option v-for="item in uniqueSnomad" :key="item" :value="item">
                                    {{ item || 'Kosong' }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">LOINC</label>
                            <select v-model="filters.loinc" class="form-control form-control-sm">
                                <option value="">-- Pilih LOINC --</option>
                                <option v-for="item in uniqueLoinc" :key="item" :value="item">
                                    {{ item || 'Kosong' }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">SNOMAD CT</label>
                            <select v-model="filters.snomad_ct_select" class="form-control form-control-sm">
                                <option value="">-- Pilih SNOMAD CT --</option>
                                <option v-for="item in uniqueSnomadCt" :key="item" :value="item">
                                    {{ item || 'Kosong' }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 d-flex align-items-end">
                            <button class="btn btn-sm btn-primary w-100" @click="applyFilters">
                                <i class="pi pi-check"></i> Terapkan Filter
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Search Bar (Simple Search) -->
                <div class="card-body border-bottom pb-2">
                    <div class="search-container">
                        <div class="input-group">
                            <input type="text" v-model="searchQuery" class="form-control form-control-sm"
                                placeholder="Cari barcode, nama barang, atau satuan..." @input="onSearchInput" />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="pi pi-search"></i>
                                </span>
                            </div>
                        </div>
                        <small v-if="searchQuery" class="text-muted mt-1 d-block">
                            Menampilkan {{ filteredFact.length }} dari {{ fact.length }} item
                        </small>
                    </div>
                </div>

                <div class="card-body">
                    <div class="table-container">
                        <table class="table table-sm table-hover sticky-header-table">
                            <thead class="sticky-header">
                                <tr>
                                    <th class="text-center">BARCODE</th>
                                    <th>NAMA BARANG</th>
                                    <th>SATUAN</th>
                                    <th class="text-center">LOINC</th>
                                    <th class="text-center">SNOMAD CT</th>
                                    <th class="text-center">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="filteredFact.length === 0" class="text-center">
                                    <td colspan="8" class="py-4">
                                        <div v-if="searchQuery || hasActiveFilters">
                                            <i class="pi pi-search text-muted" style="font-size: 2rem;"></i>
                                            <p class="text-muted mt-2 mb-0">Tidak ada data yang sesuai dengan pencarian</p>
                                            <button class="btn btn-sm btn-outline-primary mt-2" @click="clearSearch">
                                                <i class="pi pi-times"></i> Hapus Pencarian
                                            </button>
                                        </div>
                                        <div v-else>
                                            <i class="pi pi-inbox text-muted" style="font-size: 2rem;"></i>
                                            <p class="text-muted mt-2 mb-0">Tidak ada data tersedia</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(data, index) in filteredFact" :key="index" class="table-row">
                                    <td class="text-center">
                                        <span v-html="highlightText(data.IDBARANG)"></span>
                                    </td>
                                    <td>
                                        <span v-html="highlightText(data.NAMA)"></span>
                                    </td>
                                    <td class="text-center">
                                        <span v-html="highlightText(data.SATUAN)"></span>
                                    </td>
                                    <td class="text-center">
                                        <input type="text" class="form-control" placeholder="Loinc"
                                            v-model="data.LOINC">
                                    </td>
                                    <td class="text-center">
                                        <input type="text" class="form-control" placeholder="Snomad CT"
                                            v-model="data.SNOMAD_CT">
                                    </td>
                                    <td class="text-center">
                                        <Button
                                            label='Simpan'
                                            icon='fas fa-save'  
                                            class="p-button-primary"
                                            type="submit"
                                            @click="update_loinc_radiologi(data,index)"
                                            :loading="loadingButtonIndex[index]"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            Loading,
        },
        computed: {
            filteredFact() {
                let result = this.fact;

                // Apply search query filter
                if (this.searchQuery.trim()) {
                    const query = this.searchQuery.toLowerCase().trim();
                    result = result.filter(item => {
                        return (
                            (item.IDBARANG && item.IDBARANG.toString().toLowerCase().includes(query)) ||
                            (item.NAMA && item.NAMA.toLowerCase().includes(query)) ||
                            (item.SATUAN && item.SATUAN.toLowerCase().includes(query))
                        );
                    });
                }

                // Apply advanced filters
                if (this.filters.barcode.trim()) {
                    result = result.filter(item => 
                        item.IDBARANG && item.IDBARANG.toString().toLowerCase().includes(this.filters.barcode.toLowerCase())
                    );
                }

                if (this.filters.nama.trim()) {
                    result = result.filter(item => 
                        item.NAMA && item.NAMA.toLowerCase().includes(this.filters.nama.toLowerCase())
                    );
                }

                if (this.filters.satuan.trim()) {
                    result = result.filter(item => 
                        item.SATUAN && item.SATUAN.toLowerCase().includes(this.filters.satuan.toLowerCase())
                    );
                }

                if (this.filters.loinc.trim()) {
                    result = result.filter(item => 
                        item.LOINC && item.LOINC.toLowerCase().includes(this.filters.loinc.toLowerCase())
                    );
                }

                if (this.filters.snomad !== '') {
                    result = result.filter(item => 
                        item.SNOMAD === this.filters.snomad
                    );
                }

                if (this.filters.snomad_ct_select !== '') {
                    result = result.filter(item => 
                        item.SNOMAD_CT === this.filters.snomad_ct_select
                    );
                }

                return result;
            },
            uniqueSnomad() {
                const snomads = this.fact.map(item => item.SNOMAD).filter(Boolean);
                return [...new Set(snomads)].sort();
            },
            uniqueSnomadCt() {
                const snomadCts = this.fact.map(item => item.SNOMAD_CT).filter(Boolean);
                return [...new Set(snomadCts)].sort();
            },
            hasActiveFilters() {
                return this.filters.barcode.trim() !== '' || 
                       this.filters.nama.trim() !== '' || 
                       this.filters.satuan.trim() !== '' || 
                       this.filters.loinc.trim() !== '' || 
                       this.filters.snomad !== '' || 
                       this.filters.snomad_ct_select !== '';
            }
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                searchQuery: '',
                searchTimeout: null,
                loadingButtonIndex: {},
                showAdvancedFilter: false,
                filters: {
                    barcode: '',
                    nama: '',
                    satuan: '',
                    loinc: '',
                    snomad: '',
                    snomad_ct_select: ''
                },
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            this.getdata_radiologi();
        },
        methods: {
            toggleAdvancedFilter() {
                this.showAdvancedFilter = !this.showAdvancedFilter;
            },
            applyFilters() {
                this.showAdvancedFilter = false;
            },
            resetFilters() {
                this.filters = {
                    barcode: '',
                    nama: '',
                    satuan: '',
                    loinc: '',
                    snomad: '',
                    snomad_ct_select: ''
                };
                this.searchQuery = '';
            },
            clearSearch() {
                this.searchQuery = '';
                this.resetFilters();
            },
            onSearchInput() {
                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                }
                this.searchTimeout = setTimeout(() => {
                    console.log('Searching for:', this.searchQuery);
                }, 300);
            },
            highlightText(text) {
                if (!text || !this.searchQuery.trim()) {
                    return text;
                }
                const query = this.searchQuery.trim();
                const regex = new RegExp(`(${query})`, 'gi');
                return text.toString().replace(regex, '<mark class="search-highlight">$1</mark>');
            },
            getStatus(dateString) {
                if (!dateString) return 'Unknown';
                const date = new Date(dateString);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const thirtyDaysLater = new Date(today);
                thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

                if (date < today) {
                    return 'Expired';
                } else if (date <= thirtyDaysLater) {
                    return 'Akan Expired';
                } else {
                    return 'Aktif';
                }
            },
            getStatusLabel(status) {
                const statusMap = {
                    'active': 'Aktif',
                    'expired': 'Expired',
                    'expiring': 'Akan Expired'
                };
                return statusMap[status] || '';
            },
            getStatusBadgeClass(dateString) {
                const status = this.getStatus(dateString);
                if (status === 'Expired') {
                    return 'badge badge-danger';
                } else if (status === 'Akan Expired') {
                    return 'badge badge-warning';
                } else {
                    return 'badge badge-success';
                }
            },
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
                this.getdata_radiologi();
            },
            async getdata_radiologi() {
                this.isLoading = true;
                try {
                    this.form.mode = 12;
                    this.form.kategori = 'RADIOLOGI';
                    this.form.breakdown = 2;

                    const response = await axios.post('/getdatapersediaan', this.form);
                    console.log(response.data);
                    this.fact = response.data.response || [];
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memuat data');
                } finally {
                    this.isLoading = false;
                }
            },
            async update_loinc_radiologi(row, index) {  
                try {
                    console.log(row)
                    this.loadingButtonIndex[index] = true;
                    this.form.mode = 12;
                    this.form.barcode = row.BARCODE;
                    this.form.loinc = row.LOINC;
                    this.form.snomad_ct = row.SNOMAD_CT;
 
                    const response = await axios.post('/update_loinc_radiologi', this.form);
                    console.log(response.data);  
                    if(response.data.code === 200) {
                         this.open('success', response.data.message);
                    } else {
                        this.open('error', response.data.message);
                    }
             
                } catch (error) { 
                    this.open('error', 'Gagal memuat data');
                } finally {
                    this.loadingButtonIndex[index] = false;
                }
            },
            formatDate(dateString) {
                if (!dateString) return '-';
                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('id-ID');
                } catch (error) {
                    return dateString;
                }
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                });
            },
        },
    }

</script>

<style scoped>
    .table-container {
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: auto;
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
    }

    .sticky-header-table {
        margin-bottom: 0;
    }

    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #f8f9fa;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .sticky-header th {
        background-color: #f8f9fa;
        border-bottom: 2px solid #dee2e6;
        font-weight: 600;
        padding: 12px 8px;
        white-space: nowrap;
    }

    .table-row {
        transition: background-color 0.15s ease-in-out;
    }

    .table-row:hover {
        background-color: #f5f5f5;
    }

    .text-center {
        text-align: center;
    }

    .filter-controls {
        display: flex;
        gap: 8px;
    }

    .search-container {
        min-width: 300px;
    }

    .search-highlight {
        background-color: #fff3cd;
        padding: 1px 2px;
        border-radius: 2px;
        font-weight: 500;
    }

    .input-group-text {
        background-color: #f8f9fa;
        border-color: #ced4da;
    }

    .badge {
        font-size: 0.75rem;
        padding: 0.375rem 0.625rem;
    }

    .gap-2 > *+* {
        margin-left: 0.5rem;
    }

    .table td[colspan] {
        background-color: #f8f9fa;
        border: none;
    }

    @media (max-width: 768px) {
        .table-container {
            max-height: 60vh;
        }

        .sticky-header th {
            padding: 8px 4px;
            font-size: 0.875rem;
        }

        .table td {
            padding: 8px 4px; 
        }

        .search-container {
            min-width: 250px;
            margin-top: 10px;
        }

        .card-header {
            flex-direction: column;
            align-items: stretch !important;
        }

        .d-flex.justify-content-between {
            flex-direction: column;
        }

        .filter-controls {
            margin-top: 10px;
            justify-content: flex-start;
        }
    }

    .form-label {
        font-weight: 500;
        margin-bottom: 0.5rem; 
    }
</style>