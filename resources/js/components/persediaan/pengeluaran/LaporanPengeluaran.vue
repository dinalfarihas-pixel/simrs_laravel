 <template>
     <section class="content">
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

             <div class="card">
                 <div class="card-header">
                     <h3 class="card-title">Parameter</h3>
                 </div>
                 <div class="card-body">
                     <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                         dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                         aria-placeholder="Tanggal awal" style="width: 12em; " />
                     <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                         :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                         style="width: 12em; " />

                     <MultiSelect v-model="form.lokasi" style="width: 14em;" class="mr-2" :options="lokasi_arr"
                         optionLabel="CAPION" :filter="true" placeholder="Unit lokasi" :showClear="false">
                     </MultiSelect>
                     <MultiSelect v-model="form.kategori" style="width: 14em;" class="mr-2"
                         :options="['OBAT-OBATAN','BMHP','RADIOLOGI','LABORATORIUM']" :filter="true"
                         placeholder="Pilih Kategori" :showClear="false">
                     </MultiSelect>
                     <Button label="Tampilkan" align="" @click="get_data_pemakaian_obat()" icon="pi pi-check"
                         class="p-button" />
                 </div>
             </div>

             <div class="card">
                 <!-- Summary Section -->
                 <div class="card-body">
                     <h3 class="summary-title">Summary Pengeluaran</h3>

                     <!-- Summary Blocks - Left to Right Vertical -->
                     <div class="summary-blocks">
                         <!-- Block 1: Items Summary -->
                         <div class="summary-block">
                             <div class="block-icon items-icon">
                                 <i class="pi pi-box"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Total Items</div>
                                 <div class="block-value">{{ totalItems }}</div>
                                 <div class="block-subtitle">Jenis Obat</div>
                             </div>
                         </div>

                         <!-- Block 2: Quantity Summary -->
                         <div class="summary-block">
                             <div class="block-icon quantity-icon">
                                 <i class="pi pi-shopping-cart"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Total Quantity</div>
                                 <div class="block-value">{{ (totalQuantity) }}</div>
                                 <div class="block-subtitle">Unit Terjual</div>
                             </div>
                         </div>

                         <!-- Block 3: Revenue Summary -->
                         <div class="summary-block">
                             <div class="block-icon revenue-icon">
                                 <i class="pi pi-dollar"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Total Revenue</div>
                                 <div class="block-value">Rp {{ formatCurrency(totalValue) }}</div>
                                 <div class="block-subtitle">Pendapatan</div>
                             </div>
                         </div>

                         <!-- Block 4: Average Price -->
                         <div class="summary-block">
                             <div class="block-icon price-icon">
                                 <i class="pi pi-tag"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Avg Price</div>
                                 <div class="block-value">Rp {{ formatCurrency(averagePrice) }}</div>
                                 <div class="block-subtitle">Harga Rata-rata</div>
                             </div>
                         </div>

                         <!-- Block 5: Date Range -->
                         <div class="summary-block period-block">
                             <div class="block-icon period-icon">
                                 <i class="pi pi-calendar"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Periode</div>
                                 <div class="block-value-small">{{ dateRange }}</div>
                                 <div class="block-subtitle">Tanggal Laporan</div>
                             </div>
                         </div>

                         <!-- Block 6: Best Selling -->

                     </div>
                 </div>
             </div>

             <div class="card">
                 <div class="card-header">
                     <download-excel :data="filteredSalesData" :fields="json_fields" :name="`Pengeluaran-${dateRange}.xls`">
                         <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                     </download-excel>
                 </div>
                 <div class="card-body">
                     <!-- DataTable -->
                     <DataTable :value="filteredSalesData" :paginator="true" :rows="100"
                         :rowsPerPageOptions="[10,20,50,100]" :sortMode="sortMode" :rowHover="true"
                         :exportFilename="'laporan-penjualan-obat'" class="p-datatable-sm" stripedRows showGridlines
                         responsiveLayout="scroll">

                         <!-- Header with search -->
                         <template #header>
                             <div class="table-header">
                                 <span class="p-input-icon-left">
                                     <i class="pi pi-search"></i>
                                     <InputText v-model="globalFilter" placeholder="Cari data..." />
                                 </span>
                             </div>
                         </template>

                         <!-- Columns -->
                         <Column field="BARCODE" header="Barcode" :sortable="true" style="min-width: 120px;">
                             <template #body="slotProps">
                                 <span class="text-medium">{{ slotProps.data.BARCODE }}</span>
                             </template>
                         </Column>

                         <Column field="NAMA" header="Nama Obat" :sortable="true" style="min-width: 300px;">
                             <template #body="slotProps">
                                 <div class="font-medium">{{ slotProps.data.NAMA }}</div>
                             </template>
                         </Column>

                         <Column field="KATEGORI" header="Kategori" :sortable="true" style="min-width: 130px;">
                             <template #body="slotProps">
                                 <span class="category-badge">{{ slotProps.data.KATEGORI }}</span>
                             </template>
                         </Column>

                         <Column field="QTY" header="Qty" :sortable="true" style="min-width: 80px;" class="text-center">
                             <template #body="slotProps">
                                 <span class="font-medium">{{ slotProps.data.QTY }}</span>
                             </template>
                         </Column>

                         <Column field="HARGA" header="Harga" :sortable="true" style="min-width: 120px;">
                             <template #body="slotProps">
                                 <span class="font-medium text-green-600">
                                     Rp {{ formatCurrency(slotProps.data.HARGA) }}
                                 </span>
                             </template>
                         </Column>

                         <Column header="Total" style="min-width: 140px;">
                             <template #body="slotProps">
                                 <span class="font-bold text-blue-600">
                                     Rp {{ formatCurrency(slotProps.data.HARGA * slotProps.data.QTY) }}
                                 </span>
                             </template>
                         </Column>

                         <Column field="TANGGAL" header="Tanggal" :sortable="true" style="min-width: 120px;">
                             <template #body="slotProps">
                                 <span class="text-sm">{{ formatDate(slotProps.data.TANGGAL) }}</span>
                             </template>
                         </Column>

                         <Column field="" header="AKSI" :sortable="true" style="min-width: 120px;">
                             <template #body="slotProps">
                                 <button type="button" class="btn btn-success btn-sm"
                                     @click="selectedItem(slotProps.data)">Kartu Stock</button>
                                 <button type="button" style="color: white;" class="btn quantity-icon btn-sm"
                                     @click="get_data_pasien_penerima_obat(slotProps.data.BARCODE)">Pasien
                                     Penerima</button>
                             </template>
                         </Column>

                         <!-- Footer with totals -->
                         <template #footer>
                             <div class="table-footer mt-10">
                                 <div class="footer-summary">
                                     <span><strong>Total Records: {{ salesData.length }}</strong></span>
                                     <span><strong>Grand Total: Rp {{ formatCurrency(totalValue) }}</strong></span>
                                 </div>
                             </div>
                         </template>
                     </DataTable>
                 </div>
             </div>
         </div>
         <!-- Dialog with DataTable -->
         <Dialog v-model:visible="DialogPasienPenerima" :modal="true" :closable="true" :draggable="false"
             :resizable="false" :containerStyle="{ width: '95vw', maxWidth: '1200px' }" class="detail-dialog">

             <!-- Dialog Header -->
             <template #header>
                 <div class="dialog-header">
                     <div class="header-info">
                         <div>
                             <h3 class="dialog-title">Detail Penggunaan Obat</h3>
                             <p class="dialog-subtitle">Data transaksi per pasien</p>
                         </div>
                     </div>
                 </div>
             </template>
             <!-- Dialog Content -->
             <div class="dialog-content">
                 <!-- Search and Filter Section -->
                 <div class="table-controls mb-3">
                     <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">


                     </div>
                 </div>

                 <!-- DataTable -->
                 <DataTable :value="tableData" :paginator="true" :rows="20" :rowsPerPageOptions="[10,20,50,100]"
                     :sortMode="sortMode" :rowHover="true" :exportFilename="'laporan-penjualan-obat'"
                     class="p-datatable-sm" stripedRows showGridlines responsiveLayout="scroll">

                     <!-- Patient Info Column -->
                     <Column header="Info Pasien" :sortable="false" style="min-width: 250px;">
                         <template #body="slotProps">
                             <div class="patient-info">
                                 <div class="patient-name">
                                     <strong> {{ slotProps.data.PASIEN }}</strong>

                                 </div>
                                 <div class="patient-details">
                                     <span class="nomr">No. MR: {{ slotProps.data.NOMR }}</span>
                                     <span class="dpjp">DPJP: {{ slotProps.data.DPJP }}</span>
                                 </div>
                             </div>
                         </template>
                     </Column>

                     <!-- Medicine Info Column -->
                     <Column header="Informasi Obat" :sortable="true" sortField="NAMA" style="min-width: 300px;">
                         <template #body="slotProps">
                             <div class="medicine-info">
                                 <div class="medicine-name">
                                     <i class="pi pi-tag text-success"></i>
                                     {{ slotProps.data.NAMA }}
                                 </div>
                                 <div class="medicine-details">
                                     <span class="barcode">Barcode: {{ slotProps.data.BARCODE }}</span>
                                     <span class="category-badge">{{ slotProps.data.KATEGORI }}</span>
                                 </div>
                             </div>
                         </template>
                     </Column>

                     <!-- Quantity Column -->
                     <Column field="QTY" header="Req" :sortable="true" style="min-width: 80px;">
                         <template #body="slotProps">
                             <div class="quantity-cell">
                                 <span class="qty-badge">{{ slotProps.data.QTY_REQ }}</span>
                             </div>
                         </template>
                     </Column>
                     <!-- Quantity Column -->
                     <Column field="QTY" header="Qty" :sortable="true" style="min-width: 80px;">
                         <template #body="slotProps">
                             <div class="quantity-cell">
                                 <span class="qty-badge">{{ slotProps.data.QTY }}</span>
                             </div>
                         </template>
                     </Column>

                     <!-- Price Column -->
                     <Column field="HARGA" header="Harga Satuan" :sortable="true" style="min-width: 120px;">
                         <template #body="slotProps">
                             <div class="price-cell">
                                 <span class="price-value">Rp {{ formatCurrency(slotProps.data.HARGA) }}</span>
                             </div>
                         </template>
                     </Column>

                     <!-- Total Column -->
                     <Column header="Total Harga" :sortable="false" style="min-width: 130px;">
                         <template #body="slotProps">
                             <div class="total-cell">
                                 <span class="total-value">
                                     Rp {{ formatCurrency(slotProps.data.HARGA * slotProps.data.QTY) }}
                                 </span>
                             </div>
                         </template>
                     </Column>

                     <!-- Date Column -->
                     <Column field="TANGGAL" header="Tanggal" :sortable="true" style="min-width: 120px;">
                         <template #body="slotProps">
                             <div class="date-cell">
                                 <i class="pi pi-calendar"></i>
                                 {{ formatDate(slotProps.data.TANGGAL) }}
                             </div>
                         </template>
                     </Column>

                     <Column field="TANGGAL" header="RME" :sortable="true" style="min-width: 120px;">
                         <template #body="slotProps">
                             <div class="date-cell">
                                 <button type="button" @click="redirectSafely(slotProps.data.NOMR)"
                                     class="btn btn-block btn-danger"> <i class="pi pi-user text-default"></i> </button>
                             </div>
                         </template>
                     </Column>



                     <!-- Empty State -->
                     <template #empty>
                         <div class="empty-state">
                             <i class="pi pi-info-circle"></i>
                             <p>Tidak ada data yang ditemukan</p>
                         </div>
                     </template>
                 </DataTable>
             </div>

             <!-- Dialog Footer -->
             <template #footer>
                 <div class="dialog-footer">
                     <div class="footer-info">
                         <span class="record-count">
                             Menampilkan {{ tableData.length }} dari {{ tableData.length }} records
                         </span>
                     </div>
                     <div class="footer-actions">
                         <Button label="Tutup" icon="pi pi-times" class="p-button p-button-secondary"
                             @click="DialogPasienPenerima = false" />
                     </div>
                 </div>
             </template>
         </Dialog>

         <Dialog v-model:visible="KartuStockModal" :modal="true" :closable="true"
             :containerStyle="{ width: '95vw', maxWidth: '1200px' }" class="detail-dialog">

             <!-- Dialog Header -->
             <template #header>
                 <div class="dialog-header">
                     <div class="header-info">
                         <div>
                             <p class="dialog-subtitle">Kartu Stock</p>
                         </div>
                     </div>
                 </div>
             </template>

             <kartu_stock :items="barcodeSelected" :id_lokasi="form.lokasi.length > 0 ? form.lokasi[0] : 0">
             </kartu_stock>
         </Dialog>


     </section>
 </template>

 <script>
     import Loading from 'vue-loading-overlay';
     import DataTable from 'primevue/datatable';
     import Column from 'primevue/column';
     import InputText from 'primevue/inputtext';

     import {
         FilterMatchMode
     } from 'primevue/api';
     export default {
         components: {
             Loading,
             DataTable,
             Column,
             InputText,

         },
         props: {
             msg: String,
         },
         data() {
             return {
                 globalFilter: '',
                 sortMode: 'multiple', // Added this
                 filters: {
                     'global': {
                         value: null,
                         matchMode: FilterMatchMode.CONTAINS
                     }
                 },
                 salesData: [],
                 tableData: [],
                 lokasi_arr: [],
                 form: {
                     startdate: '',
                     enddate: '',
                     kategori: [],
                     lokasi: []
                 },
                 isLoading: false,
                 fullPage: true,
                 DialogPasienPenerima: false,
                 KartuStockModal: false,
                 barcodeSelected: null,
                 json_fields:{
                    'BARCODE':'BARCODE',
                    'NAMA':'NAMA',
                    'KATEGORI':'KATEGORI',
                    'HARGA':'HARGA',
                    'QTY':'QTY',
                    'TOTAL':'TOTAL',
                    'TANGGAL':'TANGGAL'

                 }

             };
         },
         computed: {
             totalItems() {
                 return this.salesData.length;
             },
             totalQuantity() {
                 return this.salesData.reduce((sum, item) => sum + item.QTY, 0);
             },
             totalValue() {
                 return this.salesData.reduce((sum, item) => sum + (item.HARGA * item.QTY), 0);
             },
             averagePrice() {
                 const validPrices = this.salesData.filter(item => item.HARGA > 0);
                 const totalPrice = validPrices.reduce((sum, item) => sum + item.HARGA, 0);
                 return validPrices.length > 0 ? totalPrice / validPrices.length : 0;
             },
             dateRange() {
                 const dates = [...new Set(this.salesData.map(item => item.TANGGAL))].sort();
                 return dates.length > 1 ? `${dates[0]} s/d ${dates[dates.length - 1]}` : dates[0] || '-';
             },
             filteredSalesData() {
                let data;
                if (!this.globalFilter || this.globalFilter.trim() === '') {
                    data = this.salesData;
                } else {
                    const searchTerm = this.globalFilter.toLowerCase().trim();
                    data = this.salesData.filter(item =>
                        item.BARCODE.toLowerCase().includes(searchTerm) ||
                        item.NAMA.toLowerCase().includes(searchTerm) ||
                        item.KATEGORI.toLowerCase().includes(searchTerm)
                    );
                }
                
                // Add TOTAL calculation to each item
                return data.map(item => ({
                    ...item,
                    TOTAL: item.QTY * item.HARGA
                })); 
             } 
         },
         mounted() {
             var currentDate = new Date();
             this.form.startdate = currentDate;
             this.form.enddate = currentDate
         },
         created() {
             //this.fetchData();
             this.get_lokasi();
         },
         methods: {
             fetchData() {
                 var currentDate = new Date();
                 console.log(this.form);
             },
             formatCurrency(value) {
                 if (value === 0 || value === null || value === undefined) return '0';
                 return new Intl.NumberFormat('id-ID').format(value);
             },
             formatDate(dateString) {
                 const date = new Date(dateString);
                 return date.toLocaleDateString('id-ID', {
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric'
                 });
             },
             async get_lokasi() {
                 const dataform = new FormData();
                 this.isLoading = true;
                 await axios.get('/getlokasi-api', "")
                     .then(response => {
                         this.lokasi_arr = response.data.response
                         this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ == "1")
                         this.isLoading = false
                         console.log(this.lokasi_arr);
                     })
                     .catch(error => {
                         console.log(error)
                     })
                     .finally(() => this.isLoading = false)
             },
             selectedItem(dataSelected) { 
                 this.KartuStockModal = true
                 this.barcodeSelected = dataSelected
             },
             async get_data_pemakaian_obat() {

                 this.isLoading = true;
                 await axios.post('/get_data_pemakaian_obat', this.form)
                     .then(response => {
                         console.log(response.data)
                         this.salesData = response.data.response
                         this.isLoading = false
                     })
                     .catch(error => {
                         console.log(error)
                     })
                     .finally(() => this.isLoading = false)
             },
             redirectSafely(norm) {
                 try {
                     const url = `medical-record?norm=${norm}`;
                     window.open(url, '_blank');
                 } catch (error) {
                     console.error('Error opening new tab:', error);
                 }
             },
             async get_data_pasien_penerima_obat(barcode) {

                 this.isLoading = true;
                 this.form.barcode = barcode;
                 this.tableData = [];

                 await axios.post('/get_data_pasien_penerima_obat', this.form)
                     .then(response => {
                         console.log(response.data)
                         this.tableData = response.data.response
                         this.isLoading = false
                         this.DialogPasienPenerima = true

                     })
                     .catch(error => {
                         console.log(error)
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
         },
     }

 </script>

 <style scoped>
     .summary-container {
         background: #ffffff;
         border-radius: 12px;
         padding: 2rem;
         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
         border: 1px solid #e5e7eb;
     }

     .summary-title {
         font-weight: 700;
         color: #1f2937;
         margin-bottom: 2rem;
         text-align: center;
     }

     .summary-blocks {
         display: grid;
         grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
         gap: 1.5rem;
     }

     .summary-block {
         background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
         border: 1px solid #e2e8f0;
         border-radius: 12px;
         padding: 1.5rem;
         display: flex;
         align-items: center;
         gap: 1rem;
         transition: all 0.3s ease;
         position: relative;
         overflow: hidden;
     }

     .summary-block:hover {
         transform: translateY(-2px);
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
         border-color: #cbd5e1;
     }

     .summary-block::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 4px;
         height: 100%;
         background: var(--block-color, #3b82f6);
     }

     .block-icon {
         width: 60px;
         height: 60px;
         border-radius: 12px;
         display: flex;
         align-items: center;
         justify-content: center;
         color: white;
         flex-shrink: 0;
     }

     .items-icon {
         background: linear-gradient(135deg, #3b82f6, #1d4ed8);
     }

     .summary-block:nth-child(1)::before {
         background: #3b82f6;
     }

     .quantity-icon {
         background: linear-gradient(135deg, #10b981, #047857);
     }

     .summary-block:nth-child(2)::before {
         background: #10b981;
     }

     .revenue-icon {
         background: linear-gradient(135deg, #f59e0b, #d97706);
     }

     .summary-block:nth-child(3)::before {
         background: #f59e0b;
     }

     .price-icon {
         background: linear-gradient(135deg, #8b5cf6, #7c3aed);
     }

     .summary-block:nth-child(4)::before {
         background: #8b5cf6;
     }

     .period-icon {
         background: linear-gradient(135deg, #ef4444, #dc2626);
     }

     .summary-block:nth-child(5)::before {
         background: #ef4444;
     }

     .bestseller-icon {
         background: linear-gradient(135deg, #f97316, #ea580c);
     }

     .summary-block:nth-child(6)::before {
         background: #f97316;
     }

     .block-content {
         flex: 1;
         min-width: 0;
     }

     .block-label {
         font-weight: 500;
         color: #6b7280;
         margin-bottom: 0.25rem;
     }

     .block-value {
         font-weight: 700;
         color: #111827;
         line-height: 1.2;
         margin-bottom: 0.25rem;
     }

     .block-value-small {
         font-weight: 600;
         color: #111827;
         line-height: 1.3;
         margin-bottom: 0.25rem;
     }

     .block-subtitle {
         color: #9ca3af;
         font-weight: 400;
     }

     .period-block .block-value-small {

         font-weight: 600;
     }

     /* Responsive Design */
     @media (max-width: 1024px) {
         .summary-blocks {
             grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
             gap: 1rem;
         }
     }

     @media (max-width: 768px) {
         .summary-container {
             padding: 1.5rem;
         }

         .summary-blocks {
             grid-template-columns: 1fr;
             gap: 1rem;
         }

         .summary-block {
             padding: 1.25rem;
         }

         .block-icon {
             width: 50px;
             height: 50px;
         }


     }

     @media (max-width: 480px) {
         .summary-title {
             margin-bottom: 1.5rem;
         }

         .summary-block {
             flex-direction: column;
             text-align: center;
             gap: 0.75rem;
         }

         .block-content {
             width: 100%;
         }
     }

     .table-header {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 1rem;
         background: #f8f9fa;
         border-radius: 8px 8px 0 0;
     }

     .category-badge {
         background: #e3f2fd;
         color: #1976d2;
         padding: 0.25rem 0.5rem;
         border-radius: 4px;
         font-weight: 500;
     }

     .table-footer {
         padding: 1rem;
         background: #f8f9fa;
         border-radius: 0 0 8px 8px;
     }

     .footer-summary {
         display: flex;
         justify-content: space-between;
         align-items: center;
     }

     /* Responsive adjustments for table */
     @media (max-width: 768px) {
         .table-header {
             flex-direction: column;
             gap: 1rem;
         }

         .footer-summary {
             flex-direction: column;
             gap: 0.5rem;
             text-align: center;
         }
     }

     /* PrimeVue DataTable customizations */
     :deep(.p-datatable) {
         border-radius: 8px;
         overflow: hidden;
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
     }

     :deep(.p-datatable .p-datatable-header) {
         border-radius: 8px 8px 0 0;
     }

     :deep(.p-datatable .p-datatable-footer) {
         border-radius: 0 0 8px 8px;
     }

     :deep(.p-paginator) {
         border-radius: 0 0 8px 8px;
     }

 </style>
