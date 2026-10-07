<template>
    <div class="container">
        <!-- Header Controls -->
        <div class="card">
            <div class="card-header">
                <label for="startdate">Tanggal Mulai:</label>
                <Calendar id="startdate" v-model="param_send.startdate" class="date-input" :showIcon="true" view="date"
                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                    placeholder="Pilih tanggal awal" />

                <label for="enddate">Tanggal Akhir:</label>
                <Calendar id="enddate" v-model="param_send.enddate" class="date-input" :showIcon="true" view="date"
                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                    placeholder="Pilih tanggal akhir" />

                <Button type="button" label="Cari" icon="pi pi-search" @click="getriwayat_card_stock()"
                    class="p-button p-button-primary search-btn" :loading="isLoading" :disabled="!isDateRangeValid" />

                <Button type="button" label="Reset" icon="pi pi-refresh" @click="resetFilters()"
                    class="p-button p-button-secondary" :disabled="isLoading" />
            </div>
        </div>

        <!-- Export Section -->
        <div class="export-section" v-if="card_stock && card_stock.length > 0">
            <download-excel :data="card_stock" :fields="json_fields" name="kartu_stock.xls">
                <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
            </download-excel>
            <span class="record-count">Total: {{ card_stock.length }} record(s)</span>
        </div>
 
        <!-- Progress Bar -->
        <ProgressBar v-show="isLoading" mode="indeterminate" class="loading-bar" /> 
        <!-- Data Table -->
        <div class="stock-card-container">
            <table class="table table-bordered table-striped dataTable compact-table">
                <thead class="sticky-header">
                    <tr>
                        <th class="col-id">ID</th>
                        <th class="col-item">Nama Item</th>
                        <th class="col-barcode">Barcode</th>
                        <th class="col-sub-barcode">Sub Barcode</th>
                        <th class="col-location">Lokasi</th>
                        <th class="col-date">Tgl Trans</th> 
                        <th class="col-qty">Qty</th>
                        <th class="col-saldo">Saldo</th>
                        <th class="col-price">Harga</th>
                        <th class="col-operator">Operator</th>
                        <th class="col-request-date">Tgl Req</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in card_stock" :key="index" class="data-row">
                        <td class="col-id text-center">{{ row.ID }}</td>
                        <td class="col-item text-left">
                            <span class="item-name" :title="row.CAPTION">{{ row.CAPTION }} <br/> <span class="category-badge">{{ row.REFF_NUMBER }}</span></span>
                        </td>
                        <td class="col-barcode text-center"> <span class="category-badge" style="white-space: nowrap;"><strong>{{ items.NAMA }}</strong></span> <br/>  {{ row.BARCODE }}</td>
                        <td class="col-sub-barcode text-center">{{ row.SUB_BARCODE }}</td>
                        <td class="col-location text-center">{{ row.LOKASI }}</td>
                        <td class="col-date text-center">{{ formatDateShort(row.TANGGAL_TRANS) }}</td>
                        
                        <td class="col-qty text-right">{{ formatNumber(row.QTY) }}</td>
                        <td class="col-saldo text-right">{{ formatNumber(row.SALDO) }}</td>
                        <td class="col-price text-right">{{ formatCurrencyShort(row.HARGA_SATUAN) }}</td>
                        <td class="col-operator text-center">{{ row.OP }}</td>
                        <td class="col-request-date text-center">{{ formatDateShort(row.TGL_PERMINTAAN) }}</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="6" style="background-color: aliceblue;" class="total-label">Total:</td>
                        <td class="col-qty text-right total-value">{{ formatNumber(totalQty) }}</td>
                        <td class="col-saldo text-right total-value">{{ formatNumber(totalSaldo) }}</td>
                        <td class="col-price text-right total-value">{{ formatCurrencyShort(totalHargaSatuan) }}</td>
                        <td colspan="2"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar'
    import {
        FilterMatchMode
    } from 'primevue/api';
import { number } from 'echarts';

    export default {
        components: {
            Loading,
            ProgressBar
        },
        props: {
            msg: String,
            items:Object,
            id_lokasi:Object
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
                displayBasic: false,
                card_stock: [],
                param_send: {
                    startdate: null,
                    enddate: null,
                    item_header: 'Riwayat Kartu Stock',
                    barcode: '',
                    lokasi: '',
                    data: {}
                },
                filters2: {},
                rowsPerPage: 10,
                json_fields: {
                    'ID': 'ID',
                    'Nama Item': 'CAPTION',
                    'Barcode': 'BARCODE',
                    'Sub Barcode': 'SUB_BARCODE',
                    'Nama': 'NAMA',
                    'Lokasi': 'LOKASI',
                    'Tanggal Transaksi': 'TANGGAL_TRANS',
                    'No. Referensi': 'REFF_NUMBER',
                    'Qty': 'QTY',
                    'Saldo': 'SALDO',
                    'Harga Satuan': 'HARGA_SATUAN',
                    'Operator': 'OP',
                    'Tanggal Permintaan': 'TGL_PERMINTAAN'
                }
            };
        },
        computed: {
            isDateRangeValid() {
                return this.param_send.startdate && this.param_send.enddate;
            },
            emptyMessage() {
                return this.isLoading ? 'Memuat data...' : 'Tidak ada data ditemukan';
            },
            totalQty() {
                return this.card_stock.reduce((sum, item) => sum + (parseFloat(item.QTY) || 0), 0);
            },
            totalSaldo() {
                return this.card_stock.reduce((sum, item) => sum + (parseFloat(item.SALDO) || 0), 0);
            },
            totalHargaSatuan() {
                return this.card_stock.reduce((sum, item) => sum + (parseFloat(item.HARGA_SATUAN) || 0), 0);
            }
        },
        mounted() {
            this.initializeData();
            this.initFilters2();
        },
        methods: {
            initializeData() {
                const currentDate = new Date();
                //const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

                this.param_send.startdate = currentDate;
                this.param_send.enddate = currentDate;
                this.getriwayat_card_stock()
            },

            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                };
            },

            async getriwayat_card_stock() {
                if (!this.isDateRangeValid) {
                    this.open('error', 'Silakan pilih range tanggal terlebih dahulu');
                    return;
                }

                this.displayBasic = true;
                this.param_send.barcode = this.items.BARCODE
                this.param_send.lokasi = this.id_lokasi['ID']

                this.isLoading = true;

                try {
                    const response = await axios.post('/getriwayat_card_stock', this.param_send);
                    this.card_stock = response.data.response || [];
                    //this.card_stock =

                    console.log('kartu stock', response.data);

                    this.card_stock.forEach(item => {
                        item.NAMA = this.items.NAMA;
                        item.QTY  = this.formatNumber(item.QTY);
                    });
                    
               

                    if (this.card_stock.length === 0) {
                        this.open('info', 'Tidak ada data ditemukan untuk range tanggal yang dipilih');
                    } else { 
                    }
                } catch (error) {
                    console.error('Error fetching card stock:', error);
                    this.open('error', 'Gagal memuat data kartu stock');
                    this.card_stock = [];
                } finally {
                    this.isLoading = false;
                }
            },

            resetFilters() {
                this.initFilters2();
                this.initializeData();
            },

            refreshData() {
                if (this.card_stock.length > 0) {
                    this.getriwayat_card_stock();
                }
            },

            closeBasic() {
                this.displayBasic = false;
                this.resetFilters();
            },

            formatCurrency(value) {
                if (value !== undefined && value !== null && !isNaN(value)) {
                    return new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(value);
                }
                return 'Rp 0';
            },

            formatCurrencyShort(value) {
                if (value !== undefined && value !== null && !isNaN(value)) {
                    const formatted = new Intl.NumberFormat('id-ID', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(value);
                    return 'Rp ' + formatted;
                }
                return 'Rp 0';
            },

            formatNumber(value) {
                if (value !== undefined && value !== null && !isNaN(value)) {
                    return new Intl.NumberFormat('id-ID').format(value);
                }
                return '0';
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

            formatDateShort(dateString) {
                if (!dateString) return '-';

                try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    });
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
            }
        }
    }
</script>

<style scoped>
    .dialog-content {
        padding: 0;
    }

    .controls-section {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
    }
    .category-badge {
         background: #e3f2fd;
         color: #1976d2;
         padding: 0.25rem 0.5rem;
         border-radius: 4px;
         font-size: 0.75rem;
         font-weight: 500;
     }

    .date-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .date-input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .date-input-group label {
        font-weight: 600;
        color: #495057;
        font-size: 0.9rem;
    }

    .date-input {
        width: 120px;
    }

    .action-controls {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .search-btn {
        background: #007bff;
        border-color: #007bff;
    }

    .export-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: #e9ecef;
        border-radius: 4px;
    }

    .export-btn {
        background: #28a745;
        border-color: #28a745;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .record-count {
        font-size: 0.9rem;
        color: #6c757d;
        font-weight: 600;
    }

    .loading-bar {
        height: 3px;
        margin-bottom: 1rem;
    }

    .stock-card-container {
        position: relative;
        max-height: 600px;
        overflow-y: auto;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Compact Table Styles */
    .compact-table {
        font-size: 0.85rem;
        line-height: 1.3;
    }

    .compact-table th,
    .compact-table td {
        padding: 0.4rem 0.5rem;
        vertical-align: middle;
        border: 1px solid #dee2e6;
    }

    /* Column widths */
    .col-id { width: 50px; min-width: 50px; }
    .col-item { width: 200px; min-width: 150px; }
    .col-barcode { width: 100px; min-width: 80px; }
    .col-sub-barcode { width: 100px; min-width: 80px; }
    .col-location { width: 80px; min-width: 80px; white-space: nowrap; }
    .col-date { width: 80px; min-width: 70px; }
    .col-ref { width: 120px; min-width: 100px; }
    .col-qty { width: 70px; min-width: 60px; }
    .col-saldo { width: 80px; min-width: 70px; }
    .col-price { width: 100px; min-width: 90px; }
    .col-operator { width: 80px; min-width: 70px; }
    .col-request-date { width: 80px; min-width: 70px; }

    /* Text alignment */
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }

    /* Header styles */
    .sticky-header th {
        background: #f8f9fa;
        border-bottom: 2px solid #dee2e6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 10;
        font-weight: 700;
        color: #495057;
        font-size: 0.8rem;
        white-space: nowrap;
    }

    /* Data row styles */
    .data-row {
        transition: background-color 0.2s ease;
    }

    .data-row:hover {
        background-color: #f8f9fa;
    }

    .data-row:nth-child(even) {
        background-color: #fdfdfd;
    }

    /* Text truncation for long content */
    .item-name {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
        cursor: help;
    }

    .ref-number {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100px;
        cursor: help;
    }

    /* Total row styles */
    .total-row {
        background-color: #e9ecef;
        font-weight: 700;
        border-top: 2px solid #6c757d;
        position: sticky;
        bottom: 0;
        z-index: 5;
    }

    .total-label {
        text-align: right;
        font-weight: 1000;
        font-size: 14px;
        color: #495057;
    }

    .total-value {
        background-color: #d4edda;
        color: #155724;
        font-size: 14px;
        font-weight: 1000;
    }

    /* Number formatting */
    .col-qty,
    .col-saldo {
        font-family: 'Courier New', monospace;
        font-weight: 1000;
        font-size: 13px;
        color: #007bff;
    }

    .col-price {
        font-family: 'Courier New', monospace;
        font-weight: 1000;
        font-size: 13px;
        color: #28a745;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .date-controls {
            flex-direction: column;
        }

        .date-input {
            width: 100%;
        }

        .action-controls {
            flex-direction: column;
            align-items: stretch;
        }

        .export-section {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }

        .compact-table {
            font-size: 0.8rem;
        }

        .compact-table th,
        .compact-table td {
            padding: 0.25rem 0.3rem;
        }

        .col-item { width: 150px; min-width: 120px; }
        .col-ref { width: 100px; min-width: 80px; }
        .item-name { max-width: 140px; }
        .ref-number { max-width: 80px; }
    }

    @media (max-width: 480px) {
        .compact-table {
            font-size: 0.75rem;
        }
        
        .col-item { width: 120px; min-width: 100px; }
        .item-name { max-width: 110px; }
    }
</style>