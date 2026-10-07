<template>
    <!-- Main content -->
    <section class="content">
        <Loading v-model:active="isLoading" :is-full-page="true" />

        <div class="card elevation-0">
            <div class="card-header">
                <h3 class="card-title">Pilih Tanggal Pencarian</h3>
            </div>
            <div class="card-body">
                <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                    :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal" style="width: 15em;" />
                <Select v-model="form.selectedJenisRawat" style="width: 8em;" :options="jenisRawat" optionLabel="code"
                    placeholder="Pilih jenis rawat" @change="ganti_jenis_rawat" />
                <Button label="Tampilkan" @click="fetchData()" icon="pi pi-check" class="p-button" />
            </div>
        </div>

        <div class="container-fluid">
            <!-- Info boxes -->
            <div class="row">
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box elevation-0">
                        <span class="info-box-icon bg-info elevation-1">
                            <i class="fas fa-prescription-bottle"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Total Resep</span>
                            <span class="info-box-number">{{ totalResep }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3 elevation-0">
                        <span class="info-box-icon bg-success elevation-1">
                            <i class="fas fa-check-circle"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Resep Selesai</span>
                            <span class="info-box-number">{{ totalSelesai }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3 elevation-0">
                        <span class="info-box-icon bg-warning elevation-1">
                            <i class="fas fa-clock"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Menunggu</span>
                            <span class="info-box-number">{{ totalMenunggu }}</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3 elevation-0">
                        <span class="info-box-icon bg-primary elevation-1">
                            <i class="fas fa-paper-plane"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Belum Dikirim</span>
                            <span class="info-box-number">{{ BlmDikirim }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tambahan: Rata-rata waktu tunggu -->
            <div class="row">
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3 elevation-0">
                        <span class="info-box-icon bg-danger elevation-1">
                            <i class="fas fa-hourglass-half"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">Rata-rata Waktu Tunggu</span>
                            <span class="info-box-number">{{ avgWaktuTunggu }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Patient Data Table -->
            <div class="row mt-3">
                <div class="col-12">
                    <div class="card elevation-0">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-users mr-2"></i>
                                Data Pasien
                            </h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" @click="fetchData">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </div> 
                        <div class="card-body">
                            <DataTable :value="filteredPatients" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                                class="p-datatable-sm" stripedRows responsiveLayout="scroll">
                                <template #header>
                                    <div class="row">
                                        <div class="col-md-4 mb-2">
                                            <span class="p-input-icon-left" style="width: 100%">
                                                <i class="pi pi-search" />
                                                <InputText v-model="globalSearch" placeholder="Cari pasien..."
                                                    style="width: 100%" class="p-inputtext-sm" />
                                            </span>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <MultiSelect v-model="selectedPoliRuang" 
                                                :options="poliRuangOptions" 
                                                placeholder="Filter Poli/Ruang" 
                                                :filter="true"
                                                style="width: 100%"
                                                :showToggleAll="true"
                                                display="chip"
                                                class="p-inputtext-sm">
                                            </MultiSelect>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <MultiSelect v-model="selectedObatPulang" 
                                                :options="obatPulangOptions" 
                                                optionLabel="label" 
                                                optionValue="value"
                                                placeholder="Filter Obat Pulang" 
                                                style="width: 100%"
                                                display="chip"
                                                class="p-inputtext-sm">
                                            </MultiSelect>
                                        </div>
                                        <div class="col-md-2 mb-2 text-right">
                                            <Button label="Clear" icon="pi pi-filter-slash"
                                                class="p-button-sm p-button-outlined" 
                                                @click="clearFilters" />
                                        </div>
                                    </div>
                                </template>

                                <Column field="NOMR" header="No. RM" :sortable="true" style="width: 100px"></Column>
                                <Column field="NAMA" header="Nama Pasien" :sortable="true" style="min-width: 200px">
                                    <template #body="slotProps">

                                        <button   class="btn btn-block btn-outline-dark btn-sm"
                                        @click="details_const_monitoring(slotProps.data.NOREGISTER,slotProps.data.NOMR, slotProps.data.NAMA)" >
                                    
                                         {{ slotProps.data.NAMA }}
                                        <span
                                            :class="slotProps.data.JENISKELAMIN === 'L' ? 'badge badge-info' : 'badge badge-pink'">
                                            {{ slotProps.data.JENISKELAMIN }}
                                        </span>
                                    </button>
                                       
                                    </template>
                                </Column>
                                <Column field="TGLLAHIR" header="Tgl Lahir" :sortable="true" style="width: 120px">
                                </Column>
                                <Column field="USIA" header="Usia" :sortable="true" style="width: 100px"></Column>
                                <Column field="DPJP" header="DPJP" style="min-width: 200px"></Column>
                                <Column field="JENISRAWAT" header="Jenis Rawat" :sortable="true" style="width: 100px">
                                    <template #body="slotProps">
                                        <span
                                            :class="slotProps.data.JENISRAWAT === 'INAP' ? 'badge badge-info' : 'badge badge-warning'">
                                            {{ slotProps.data.JENISRAWAT }}
                                        </span>
                                    </template>
                                </Column>
                                <Column field="CARABAYAR" header="Cara Bayar" :sortable="true" style="width: 100px">
                                </Column>
                                <Column field="POLI_RUANG" header="Poli/Ruang" style="min-width: 150px"></Column>
                                <Column field="MASUK" header="Masuk" style="width: 80px"></Column>
                                <Column field="SELESAI" header="Selesai" style="width: 80px"></Column>
                                <Column field="WAKTU_DITERIMA_TIME" header="Terima" :sortable="true"  style="width: 80px"></Column>

                                <!-- Kolom baru -->
                                <Column header="Durasi(menit)" :sortable="true"  style="width: 120px">
                                    <template #body="slotProps">
                                        {{ calculateWaitingTime(slotProps.data) }}
                                    </template>
                                </Column>

                                <Column field="STATUS_PROGRESS" header="Status" style="width: 80px">
                                    <template #body="slotProps">
                                        <span class="badge badge-success">
                                            {{ slotProps.data.STATUS_PROGRESS === 'C' ? 'Complete' : slotProps.data.STATUS_PROGRESS }}
                                        </span>
                                    </template>
                                </Column>
                                <Column field="OBAT_PULANG" header="Obat Pulang" style="width: 100px">
                                    <template #body="slotProps">
                                        <span v-if="slotProps.data.OBAT_PULANG === 'YA'" class="badge badge-success">
                                            <i class="fas fa-check"></i> Ya
                                        </span>
                                        <span v-else class="badge badge-secondary">Tidak</span>
                                    </template>
                                </Column>

                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>


              <div class="row">
                <div class="col-12">
                    <div class="card elevation-0">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-bar mr-2"></i>
                                Dashboard Resep per Poli/Ruang
                            </h3>
                        </div>
                        <div class="card-body">
                            <DataTable :value="filteredDashboardResep" :paginator="true" :rows="10"
                                :rowsPerPageOptions="[10, 20, 50]" class="p-datatable-sm" stripedRows :rowHover="true"
                                responsiveLayout="scroll">
                                <template #header>
                                    <div class="p-d-flex p-jc-between">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="dashboardSearch" placeholder="Cari Poli/Ruang..." 
                                                class="p-inputtext-sm" />
                                        </span>
                                    </div>
                                </template>

                                <Column field="POLI_RUANG" header="Poli/Ruang" :sortable="true"
                                    style="min-width: 200px"></Column>
                                <Column field="TOTAL" header="Total" :sortable="true" style="width:50px">
                                    <template #body="slotProps">
                                        <span>{{ slotProps.data.TOTAL }}</span>
                                    </template>
                                </Column>
                                <Column field="SELESAI" header="Selesai" :sortable="true" style="width: 50px">
                                    <template #body="slotProps">
                                        <span>{{ slotProps.data.SELESAI }}</span>
                                    </template>
                                </Column>
                                <Column field="MENUNGGU" header="Menunggu" :sortable="true" style="width: 50px">
                                    <template #body="slotProps">
                                        <span>{{ slotProps.data.MENUNGGU }}</span>
                                    </template>
                                </Column>
                                <Column field="" header="Tidak Dikirim" :sortable="true" style="width: 50px">
                                    <template #body="slotProps">
                                        <span>{{ slotProps.data.BELUM_DIKIRIM }}</span>
                                    </template>
                                </Column>
                                <Column header="Progress">
                                    <template #body="slotProps">
                                        <div class="progress" style="height: 20px;">
                                            <div class="progress-bar bg-success" role="progressbar"
                                                :style="{width: calculateProgress(slotProps.data) + '%'}"
                                                :aria-valuenow="calculateProgress(slotProps.data)" aria-valuemin="0"
                                                aria-valuemax="100">
                                                {{ calculateProgress(slotProps.data) }}%
                                            </div>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <!-- Detail dialog with improved UI -->
            <Dialog :header="caption_dialog" v-model:visible="displayMaximizable" :containerStyle="{width: '90%'}"
                :maximizable="true" :modal="true" class="patient-detail-dialog">
               

                <table class="table table-bordered table-striped dtr-inline table-hover">
                    <thead >
                        <tr>
                            <th class="text-center">KATEGORI</th>
                            <th class="text-center">ITEM</th>
                            <th class="text-center">QTY</th>
                            <th class="text-center">HARGA</th>
                            <th class="text-center">SATUAN</th>
                            <th class="text-center">TOTALAMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in detailcost.response">
                            <td><span class="badge"
                                    :class="getCategoryBadgeClass(row.KATEGORI)">{{ row.KATEGORI }}</span></td>
                            <td>{{ row.ITEM }}</td>
                            <td style="text-align: right;">{{ formatRupiah(row.QTY)}}</td>
                            <td style="text-align: right;">{{ formatRupiah(row.HARGA_BELI)}}</td>
                            <td>{{ row.SATUAN }}</td>
                            <td style="text-align: right;">{{ formatRupiah(row.TOTALAMOUNT) }}</td>
                        </tr> 
                        <tr> 
                            <td colspan="5" class="text-right font-weight-bold">TOTAL</td>
                            <td class="text-right font-weight-bold"> 
                                {{ formatRupiah(calculateDetailTotal(detailcost.response)) }}</td>
                        </tr>
                      
                    </tbody>
                   
                </table>

                <template #footer>
                    <div class="d-flex justify-content-between">
                        <!-- <Button label="Print" icon="pi pi-print" class="p-button-secondary" /> -->
                        <Button label="Tutup" icon="pi pi-times" @click="closeMaximizable" class="p-button-primary"
                            autofocus />
                    </div>
                </template>
            </Dialog>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'

export default {
    name: 'HospitalDashboard',
    components: { Loading },
    data() {
        return {
            isLoading: false,
            jenisRawat: [
                { name: 'JALAN', code: 'JALAN' },
                { name: 'INAP', code: 'INAP' }
            ],
            form: {
                startdate: '',
                enddate: '',
                selectedJenisRawat: { code: 'JALAN', nama: 'JALAN' }
            },
            patients: [],
            displayMaximizable: false,
            caption_dialog: '',
            dashboardResep: [],
            listData: [],
            detailPatientInfo: {
                name: '',
                rm: '', 
                register: ''
            },
            tempDashboardResep: [],
            globalSearch: '',
            dashboardSearch: '',
            selectedPoliRuang: null,
            selectedObatPulang: null,
            detailcost:[],
            obatPulangOptions: [
                { label: 'Ya', value: 'YA' },
                { label: 'Tidak', value: 'TIDAK' }
            ]
        }
    },
    computed: {
        totalResep() {
            return this.dashboardResep.reduce((sum, item) => sum + parseInt(item.TOTAL), 0)
        },
        totalSelesai() {
            return this.dashboardResep.reduce((sum, item) => sum + parseInt(item.SELESAI), 0)
        },
        totalMenunggu() {
            return this.dashboardResep.reduce((sum, item) => sum + parseInt(item.MENUNGGU), 0)
        },
        BlmDikirim() {
            return this.dashboardResep.reduce((sum, item) => sum + parseInt(item.BELUM_DIKIRIM), 0)
        },
        // Get unique Poli/Ruang options
        poliRuangOptions() {
            const unique = [...new Set(this.listData.map(item => item.POLI_RUANG))].filter(Boolean)
            return unique.sort()
        },
        // Filtered patients based on all filters
        filteredPatients() {
            let filtered = this.patients

            // Filter by Poli/Ruang
            if (this.selectedPoliRuang && this.selectedPoliRuang.length > 0) {
                filtered = filtered.filter(p => this.selectedPoliRuang.includes(p.POLI_RUANG))
            }

            // Filter by Obat Pulang
            if (this.selectedObatPulang && this.selectedObatPulang.length > 0) {
                filtered = filtered.filter(p => {
                    const obatValue = p.OBAT_PULANG === 'YA' ? 'YA' : 'TIDAK'
                    return this.selectedObatPulang.includes(obatValue)
                })
            }

            // Global search
            if (this.globalSearch) {
                const search = this.globalSearch.toLowerCase()
                filtered = filtered.filter(p => {
                    return (
                        (p.NOMR && p.NOMR.toLowerCase().includes(search)) ||
                        (p.NAMA && p.NAMA.toLowerCase().includes(search)) ||
                        (p.DPJP && p.DPJP.toLowerCase().includes(search)) ||
                        (p.POLI_RUANG && p.POLI_RUANG.toLowerCase().includes(search)) ||
                        (p.CARABAYAR && p.CARABAYAR.toLowerCase().includes(search))
                    )
                })
            }

            return filtered
        },
        // Filtered dashboard based on search
        filteredDashboardResep() {
            if (!this.dashboardSearch) {
                return this.dashboardResep
            }
            const search = this.dashboardSearch.toLowerCase()
            return this.dashboardResep.filter(item => 
                item.POLI_RUANG && item.POLI_RUANG.toLowerCase().includes(search)
            )
        },
        // 🧮 Rata-rata waktu tunggu
        avgWaktuTunggu() {
            if (this.patients.length === 0) return '0 Jam 00 Menit'
            const times = this.patients
                .map(p => this.calculateWaitingTime(p))
                .filter(t => !isNaN(t))

            if (times.length === 0) return '0 Jam 00 Menit'

            const total = times.reduce((a, b) => a + b, 0)
            const avg = Math.round(total / times.length)

            const minutes = Math.floor(avg / 60)
            const seconds = avg % 60

            const pad = n => String(n).padStart(2, '0')

            return `${pad(minutes)} Jam ${pad(seconds)} Menit`
        }
    },
    created() {
        this.form.startdate = new Date()
        this.form.selectedJenisRawat = { code: 'JALAN', nama: 'JALAN' }
    },
    methods: {
        calculateProgress(data) {
            const total = parseInt(data.TOTAL)
            const selesai = parseInt(data.SELESAI)
            return total > 0 ? Math.round((selesai / total) * 100) : 0
        },
         getCategoryBadgeClass(category) {
            switch (category) {
                case 'OBAT-OBATAN':
                    return 'badge-info';
                case 'BMHP':
                    return 'badge-warning';
                case 'LABORATORIUM':
                    return 'badge-success';
                case 'TENAGA AHLI':
                    return 'badge-primary';
                case 'KEPERAWATAN':
                    return 'badge-dark';
                case 'RADIOLOGI':
                    return 'badge-danger';
                default:
                    return 'badge-secondary';
            }
        },
         calculateDetailTotal(arr) {
            if (!arr || !arr.length) {
                return 0;
            }

            return arr.reduce((sum, item) => {
                const amount = parseFloat(item.TOTALAMOUNT) || 0;
                return sum + amount;
            }, 0);
        },
        closeMaximizable() {
            this.displayMaximizable = false;
        },
        formatRupiah(value) {
            if (!value) return '0';
            return new Intl.NumberFormat('id-ID').format(value);
        },
        async details_const_monitoring(noregister, norm, namapasien) {
            this.isLoading = true;
            this.form.noregister = noregister;

            // Store patient info for detail view
            this.detailPatientInfo = {
                name: namapasien || '',
                rm: norm || '',
                register: noregister || ''
            };

            // Find current poliruang for this patient 
            await axios.post('/get_details_item', this.form)
                .then(response => {
                    this.detailcost = response.data;
                    this.caption_dialog = 'Detail Biaya Pasien';
                    this.isLoading = false;
                    this.displayMaximizable = true;
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
                .finally(() => this.isLoading = false);
        },
        // ⏱ Hitung waktu tunggu per pasien (menit)
        calculateWaitingTime(patient) {
            if (!patient.JAM_KIRIM_RESEP || !patient.WAKTU_DITERIMA) return NaN
            const masuk = new Date(patient.JAM_KIRIM_RESEP)
            const diterima = new Date(patient.WAKTU_DITERIMA)
            const diffMs = diterima - masuk
            return diffMs > 0 ? Math.round(diffMs / 60000) : 0
        },
        ganti_jenis_rawat() {
            this.patients = this.listData.filter(item => item.JENISRAWAT === this.form.selectedJenisRawat.name)
            this.dashboardResep = this.tempDashboardResep.filter(item => item.JENISRAWAT === this.form.selectedJenisRawat.name)
            this.clearFilters()
        },
        clearFilters() {
            this.globalSearch = ''
            this.selectedPoliRuang = null
            this.selectedObatPulang = null
        },
        async fetchData() {
            this.isLoading = true
            try {
                const response = await axios.post(`/get_list_resep`, this.form)
                this.listData = response.data.response || []
                this.patients = this.listData.filter(item => item.JENISRAWAT === this.form.selectedJenisRawat.name)
                this.tempDashboardResep = response.data.dasboard_resep || []
                this.dashboardResep = this.tempDashboardResep.filter(item => item.JENISRAWAT === this.form.selectedJenisRawat.name)
            } catch (error) {
                this.open('warning', error)
            } finally {
                this.isLoading = false
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
        }
    }
}
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    .badge-pink {
        background-color: #e83e8c;
        color: white;
    }

    .p-datatable {
        font-size: 13px;
    }

    .p-datatable .p-datatable-thead>tr>th {
        background-color: #007bff;
        color: white;
        padding: 10px;
        font-weight: 600;
    }

    .p-datatable .p-datatable-tbody>tr>td {
        padding: 8px 10px;
    }

    .p-datatable .p-datatable-tbody>tr:hover {
        background-color: #f8f9fa;
    }

    .info-box {
        box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);
        border-radius: .25rem;
        background-color: #fff;
        display: flex;
        margin-bottom: 1rem;
        min-height: 80px;
        padding: .5rem;
        position: relative;
    }

    .info-box .info-box-icon {
        border-radius: .25rem;
        align-items: center;
        display: flex;
        font-size: 1.875rem;
        justify-content: center;
        text-align: center;
        width: 70px;
    }

    .info-box .info-box-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.8;
        flex: 1;
        padding: 0 10px;
    }

    .info-box .info-box-text {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .info-box .info-box-number {
        display: block;
        font-weight: 700;
        font-size: 1.5rem;
    }

    .elevation-1 {
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    }

    .card {
        box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);
        margin-bottom: 1rem;
    }

    .card-header {
        background-color: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, .125);
        padding: .75rem 1.25rem;
        position: relative;
        border-top-left-radius: .25rem;
        border-top-right-radius: .25rem;
    }

    .card-title {
        float: left;
        font-size: 1.1rem;
        font-weight: 400;
        margin: 0;
    }

    .card-tools {
        float: right;
        margin-right: -.625rem;
    }

    .card-body {
        flex: 1 1 auto;
        padding: 1.25rem;
    }

    .p-input-icon-left {
        position: relative;
        display: inline-block;
    }

    .p-input-icon-left>i {
        position: absolute;
        left: 0.5rem;
        top: 50%;
        margin-top: -0.5rem;
        z-index: 1;
    }

    .p-input-icon-left>.p-inputtext {
        padding-left: 2rem;
    }

    .progress {
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: .75rem;
        background-color: #e9ecef;
        border-radius: .25rem;
    }

    .progress-bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #007bff;
        transition: width .6s ease;
    }

    /* PrimeVue Button customization */
    .p-button {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }

    .p-button-sm {
        padding: 0.375rem 0.75rem;
        font-size: 0.813rem;
    }

    /* DataTable responsive */
    @media screen and (max-width: 768px) {
        .p-datatable .p-datatable-thead>tr>th,
        .p-datatable .p-datatable-tbody>tr>td {
            padding: 5px;
            font-size: 11px;
        }

        .info-box-number {
            font-size: 1.2rem !important;
        }
    }
</style>    