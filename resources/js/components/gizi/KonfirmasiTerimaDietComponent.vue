<template>
    <section class="content">
        <div class="container-fluid">


            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
           
            <!-- Filter Form -->
            <div class="card shadow-md rounded-2xl border-0" style="background: #f9fafb;">
                <div class="card-header bg-blue-50 border-0 rounded-t-2xl">
                    <h3 class="card-title text-blue-700 font-semibold">
                        📋 Data Kunjungan Pasien
                    </h3>
                </div>
                <div class="card-body">
                    <!-- Calendar -->
                    <label class="text-sm mb-1 text-gray-600">Tanggal Awal</label>
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030" placeholder="Pilih tanggal"
                        style="width: 15em" />

                    <!-- Shift -->
                    <label for="shift" class="text-sm mb-1 text-gray-600">Shift</label>
                    <Select id="shift" v-model="form.shift" :options="shiftOptions" optionLabel="label"
                        optionValue="value" placeholder="Pilih shift" showClear style="width: 150px" />

                    <!-- Tombol Tampilkan -->
                    <Button label="Tampilkan" icon="pi pi-check" class="p-button-rounded p-button-success"
                        @click="getlist_penunjang_order_jasa_penunjang" />
                </div>
            </div>

            <!-- Tabel -->
            <div class="card shadow-md rounded-2xl border-0 mt-4" style="background: #ffffff;">
                <div class="card-header flex justify-between items-center bg-blue-50 border-0 rounded-t-2xl">
                    <!-- Select All Checkbox -->
                    <div class="flex items-center">
                        
                        <label for="selectAll" class="ml-2 text-sm font-medium">
                           Dipilih ({{ selectedPatients.length }})
                        </label>
                    </div>

                    <!-- Search -->
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Cari pasien..."
                            class="p-inputtext-sm" />
                    </span>
                </div>
                <div class="card-body">
                    <DataTable :value="fact" :paginator="true" :rows="10" responsiveLayout="scroll" :filters="filters"
                        stripedRows class="p-datatable-sm" :globalFilterFields="['NAMA',
              'NOMR',
              'NOREGISTER',
              'ALAMAT',
              'DPJP',
              'POLI_RUANG',
              'DX_AWAL'
            ]">

                        <Column field="NOMR" header="No. RM"></Column>
                        <Column field="NAMA" header="Nama">
                            <template #body="slotProps">
                                <div class="flex items-center space-x-2">
                                    <Checkbox 
                                        v-model="selectedPatients" 
                                        :value="slotProps.data.TRANS" 
                                        :inputId="`patient-${slotProps.data.TRANS}`" 
                                        @change="onPatientSelect"
                                    />
                                    <div>
                                        <h5 class="flex items-center space-x-2">   
                                            <span>{{ slotProps.data.NAMA }}</span>
                                            <span v-if="slotProps.data.JENISKELAMIN=='P'">
                                                <ion-icon size="medium" style="color: pink;" name="woman-sharp"></ion-icon>
                                            </span>
                                            <span v-if="slotProps.data.JENISKELAMIN=='L'">
                                                <ion-icon size="medium" style="color: navy;" name="man-sharp"> </ion-icon>
                                            </span>
                                        </h5>
                                        <p style="color: cadetblue;">{{ slotProps.data.DPJP }}</p>
                                    </div>
                                </div>
                            </template>
                        </Column>
                        <Column field="DIET" header="DIET"></Column>
                        <Column field="BB" header="BB (kg)"></Column>
                        <Column field="TB" header="TB (cm)"></Column>
                        <Column field="DX_AWAL" header="DIAGNOSA AWAL"></Column>
                        <Column field="ALAMAT" header="ALAMAT"></Column>
                        <Column field="CARABAYAR" header="CARA BAYAR"></Column>
                        <Column field="POLI_RUANG" header="RUANG"></Column>
                        <Column field="TANGGAL" header="TANGGAL"></Column>
                        <Column field="STATUS_PROGRESS" header="PROGRESS">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.STATUS_PROGRESS"
                                    :severity="getStatusSeverity(slotProps.data.STATUS_PROGRESS)"
                                    :icon="getStatusIcon(slotProps.data.STATUS_PROGRESS)" class="font-semibold" />
                            </template>
                        </Column> 
                        <Column field="PROSES" header="PROSES"></Column>
                        <Column field="SELESAI" header="SELESAI"></Column>

                        <!-- Kolom Aksi -->
                        <Column header="AUTH" bodyStyle="text-align:center">
                            <template #body="slotProps"> 
                                <qrcode-vue v-if="slotProps.data.AUTH=='1'" :value="slotProps.data.NAMA_USER" :size="50" level="H"></qrcode-vue> 
                                <small>{{ slotProps.data.NAMA_USER }}</small><br/>
                                <small>{{ slotProps.data.TGL_OTO }}</small>
                            </template>
                        </Column>
                    </DataTable>

                    <!-- Selected Patients Actions -->
                    <div v-if="selectedPatients.length > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p class="text-sm font-medium mb-2">
                            {{ selectedPatients.length }} pasien terpilih
                        </p>
                        <div class="flex space-x-2">
                            <Button 
                                label="Lakukakan Serah Terima" 
                                icon="pi pi-cog" 
                                class="p-button-sm p-button-info"
                                @click="call_oto('000',9)" 
                            /> 
                            <Button 
                                label="Clear Selection" 
                                icon="pi pi-times" 
                                class="p-button-sm p-button-secondary"
                                @click="clearSelection" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"  class="container_modal" :modal="true">
            <!-- <otorisasi-form @getvalue="handleValue" :mode=2 :noregister="soapId"></otorisasi-form>  -->
            <otorisasi-form @getvalue="handleValue" :mode=mode_otto :noregister="id_inputan" :paramArray="selectedPatients"></otorisasi-form> 
            <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
                </template>
        </Dialog> 

    </section>
</template>

<script>
    import Loading from "vue-loading-overlay";
    import Checkbox from 'primevue/checkbox';
    import Tag from "primevue/tag"
    import "vue-loading-overlay/dist/css/index.css";
    import {
        FilterMatchMode
    } from "primevue/api";
    import QrcodeVue from 'qrcode.vue';
    import axios from "axios";

    export default {
        components: {
            Loading,
            Tag,
            QrcodeVue,
            Checkbox
        },
        data() {
            return {
                fact: [],
                selectedPatients: [], // Array to store selected patient NOMR values
                showOtorisasi:false,
                selectAll: false, // Master checkbox state
                form: {
                    startdate: new Date(),
                    enddate: "",
                    shift: "PAGI",
                    mode: 3,
                },
                id_inputan:0,
                mode_otto:0,   
                isLoading: false,
                fullPage: true,
                shiftOptions: [{
                        label: "PAGI",
                        value: "PAGI"
                    },
                    {
                        label: "SIANG",
                        value: "SIANG"
                    },
                    {
                        label: "MALAM",
                        value: "MALAM"
                    },
                ],
                filters: {
                    global: {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    },
                },
            };
        },
        computed: {
            // Computed property to check if some (but not all) items are selected
            isIndeterminate() {
                return this.selectedPatients.length > 0 && this.selectedPatients.length < this.fact.length;
            }
        },
        watch: {
            // Watch for changes in fact data to reset selections
            fact() {
                this.selectedPatients = [];
                this.selectAll = false;
            }
        },
        methods: {
            open(type, message) {
                this.$toast.open({
                    message,
                    position: "top-right",
                    type,
                    duration: 3000,
                    dismissible: true,
                });
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if(this.responvalue==200)
                {
                    this.showOtorisasi = false; 
                    this.getlist_penunjang_order_jasa_penunjang();
                }
            },
            call_oto(soapid,mode_otto)
            {
                this.id_inputan = soapid; 
                this.mode_otto = mode_otto
                this.showOtorisasi = true; 
            },
            getStatusSeverity(status) {
                switch (status?.toLowerCase()) {
                    case 'selesai':
                    case 'completed':
                        return 'success';
                    case 'proses':
                    case 'processing':
                        return 'info';
                    case 'menunggu':
                    case 'waiting':
                        return 'warning';
                    case 'batal':
                    case 'cancelled':
                        return 'danger';
                    default:
                        return 'secondary';
                }
            },
            getStatusIcon(status) {
                switch (status?.toLowerCase()) {
                    case 'selesai':
                    case 'completed':
                        return 'pi pi-check-circle';
                    case 'proses':
                    case 'processing':
                        return 'pi pi-cog';
                    case 'menunggu':
                    case 'waiting':
                        return 'pi pi-clock';
                    case 'batal':
                    case 'cancelled':
                        return 'pi pi-times-circle';
                    default:
                        return 'pi pi-info-circle';
                }
            },

            async getlist_penunjang_order_jasa_penunjang() {
                this.isLoading = true;
                try {
                    const response = await axios.post(
                        "/getlist_penunjang_order_jasa_penunjang",
                        this.form
                    );
                    console.log(response.data)
                    if (response.data.metadata.code === 200) {
                        this.fact = response.data.response;
                    } else {
                        this.fact = [];
                        this.open("error", "Data tidak ditemukan");
                    }
                } catch (error) {
                    console.error(error);
                    this.open("error", "Terjadi kesalahan server");
                } finally {
                    this.isLoading = false;
                }
            },

            // Checkbox related methods
            toggleSelectAll() {
                if (this.selectAll) {
                    // Select all patients
                    this.selectedPatients = this.fact.map(patient => patient.NOMR);
                } else {
                    // Deselect all patients
                    this.selectedPatients = [];
                }
            },
            
            onPatientSelect() {
                // Update selectAll state based on current selections
                if (this.selectedPatients.length === this.fact.length) {
                    this.selectAll = true;
                } else {
                    this.selectAll = false;
                }
            },

            clearSelection() {
                this.selectedPatients = [];
                this.selectAll = false;
                this.open("info", "Seleksi dibersihkan");
            },

            processBatch() {
                const selectedData = this.fact.filter(patient => 
                    this.selectedPatients.includes(patient.TRANS)
                );
                console.log('Processing batch for:', selectedData);
                this.open("info", `Memproses ${this.selectedPatients.length} pasien terpilih`);
                // Add your batch processing logic here
            }, 

            detailPasien(data) {
                this.open("info", `Detail pasien: ${data.NAMA}`);
            },
            editPasien(data) {
                this.open("warning", `Edit pasien: ${data.NAMA}`);
            },
            hapusPasien(data) {
                this.open("error", `Hapus pasien: ${data.NAMA}`);
            },
        },
    };
</script>

<style scoped>
    /* Tambahan warna lembut */
    .card {
        transition: all 0.3s ease-in-out;
    }

    .card:hover {
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.08);
    }

    /* Custom DataTable styling */
    :deep(.custom-datatable) {
        border-radius: 0 0 1.5rem 1.5rem;
        overflow: hidden;
    }

    :deep(.custom-datatable .p-datatable-header) {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border: none;
        border-radius: 0;
    }

    :deep(.custom-datatable .p-datatable-thead > tr > th) {
        background: linear-gradient(135deg, #475569 0%, #334155 100%);
        color: white;
        font-weight: 600;
        padding: 1rem;
        border: none;
        font-size: 0.875rem;
    }

    :deep(.custom-datatable .p-datatable-tbody > tr > td) {
        padding: 1rem;
        border-color: #e2e8f0;
        font-size: 0.875rem;
    }

    :deep(.custom-datatable .p-datatable-tbody > tr:nth-child(even)) {
        background-color: #f8fafc;
    }

    :deep(.custom-datatable .p-datatable-tbody > tr:hover) {
        background-color: #dbeafe !important;
        transform: scale(1.005);
        transition: all 0.2s ease;
    }

    /* Loading overlay customization */
    :deep(.vld-overlay) {
        border-radius: 1.5rem;
    }

    /* Checkbox styling */
    .flex {
        display: flex;
    }
    
    .items-center {
        align-items: center;
    }
    
    .space-x-2 > * + * {
        margin-left: 0.5rem;
    }
    
    .ml-2 {
        margin-left: 0.5rem;
    }
    
    .mt-4 {
        margin-top: 1rem;
    }
    
    .mb-2 {
        margin-bottom: 0.5rem;
    }
    
    .p-3 {
        padding: 0.75rem;
    }
    
    .bg-blue-50 {
        background-color: #eff6ff;
    }
    
    .rounded-lg {
        border-radius: 0.5rem;
    }
    
    .text-sm {
        font-size: 0.875rem;
    }
    
    .font-medium {
        font-weight: 500;
    }

    /* Responsive improvements */
    @media (max-width: 768px) {
        .container-fluid {
            padding: 0.5rem;
        }

        .grid {
            grid-template-columns: 1fr;
        }

        :deep(.custom-datatable .p-datatable-thead > tr > th),
        :deep(.custom-datatable .p-datatable-tbody > tr > td) {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
        }
    }

    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }

    /* Custom scrollbar */
    :deep(.p-datatable-scrollable-body)::-webkit-scrollbar {
        height: 8px;
    }

    :deep(.p-datatable-scrollable-body)::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }

    :deep(.p-datatable-scrollable-body)::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }

    :deep(.p-datatable-scrollable-body)::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>