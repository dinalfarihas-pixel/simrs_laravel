<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog
                header="Approval Pemberian Barang"
                v-model:visible="modalItemBarang"
                :modal="true"
                :style="{ width: '70vw' }"
                :breakpoints="{ '768px': '100vw' }"
                :draggable="false">
                <DataTable
                    :value="itemBarang"
                    scrollable
                    scrollHeight="400px"
                    stripedRows
                    size="small"
                    class="approval-table">
                    <Column field="IDBARANG" header="Barcode" style="min-width:100px" />
                    <Column field="SUB_BARCODE" header="Sub Barcode" style="min-width:110px" />
                    <Column field="NAMA" header="Nama Barang" style="min-width:160px" />
                    <Column field="SATUAN" header="Satuan" style="min-width:70px; text-align:center" headerStyle="text-align:center" />
                    <Column field="HARGABELI" header="Harga" style="min-width:90px; text-align:right" headerStyle="text-align:center">
                        <template #body="{ data }">
                            <span class="text-right d-block">{{ $numeral(data.HARGABELI, '0,0') }}</span>
                        </template>
                    </Column>
                    <Column field="QUNATITY" header="Persediaan" style="min-width:90px; text-align:center" headerStyle="text-align:center">
                        <template #body="{ data }">
                            <Tag :value="String(data.QUNATITY)" severity="warning" />
                        </template>
                    </Column>
                    <Column field="QTY_APROVED" header="Diberikan" style="min-width:120px; text-align:center" headerStyle="text-align:center">
                        <template #body="{ data }">
                            <InputNumber
                                v-model="data.QTY_APROVED"
                                :min="0"
                                :minFractionDigits="0"
                                :maxFractionDigits="0"
                                style="width:100%"
                                :inputStyle="{ textAlign:'center', backgroundColor:'lavenderblush' }" />
                        </template>
                    </Column>
                    <Column field="TGL_EXPIRED_DT" header="Exp. Date" style="min-width:100px" />
                </DataTable>
                <template #footer>
                    <Button label="Selesai" icon="pi pi-check" @click="modalItemBarang=false" />
                </template>
            </Dialog>


            <Dialog
                :header="'Riwayat Permintaan — ' + namaRiwayatSeleceted"
                v-model:visible="modalRiwayat"
                :modal="true"
                :style="{ width: '70vw' }"
                :breakpoints="{ '768px': '100vw' }"
                :draggable="false">

                <!-- Stats Cards -->
                <div v-if="riwayatStats" class="riwayat-stats-row mb-3">
                    <div class="riwayat-stat-card">
                        <i class="pi pi-box riwayat-stat-icon text-primary"></i>
                        <div class="riwayat-stat-body">
                            <div class="riwayat-stat-label">Total QTY</div>
                            <div class="riwayat-stat-value">{{ riwayatStats.totalQty }} <small>PCS</small></div>
                        </div>
                    </div>
                    <div class="riwayat-stat-card">
                        <i class="pi pi-calendar riwayat-stat-icon text-success"></i>
                        <div class="riwayat-stat-body">
                            <div class="riwayat-stat-label">Rata-rata / Bulan</div>
                            <div class="riwayat-stat-value">{{ riwayatStats.avgPerBulan }} <small>PCS</small></div>
                        </div>
                    </div>
                    <div class="riwayat-stat-card">
                        <i class="pi pi-chart-line riwayat-stat-icon text-warning"></i>
                        <div class="riwayat-stat-body">
                            <div class="riwayat-stat-label">Rata-rata / Minggu</div>
                            <div class="riwayat-stat-value">{{ riwayatStats.avgPerMinggu }} <small>PCS</small></div>
                        </div>
                    </div>
                    <div class="riwayat-stat-card riwayat-stat-card--highlight">
                        <i class="pi pi-star riwayat-stat-icon text-danger"></i>
                        <div class="riwayat-stat-body">
                            <div class="riwayat-stat-label">Saran Kebutuhan/Minggu</div>
                            <div class="riwayat-stat-value">{{ riwayatStats.saranKebutuhan }} <small>PCS</small></div>
                        </div>
                    </div>
                    <div class="riwayat-stat-card">
                        <i class="pi pi-dollar riwayat-stat-icon" style="color:#8b5cf6"></i>
                        <div class="riwayat-stat-body">
                            <div class="riwayat-stat-label">Total Nilai</div>
                            <div class="riwayat-stat-value" style="font-size:.85rem">{{ $numeral(riwayatStats.totalNilai, '0,0') }}</div>
                        </div>
                    </div>
                </div>

                <!-- Tabel Riwayat -->
                <DataTable
                    :value="riwayatPermintaan"
                    scrollable
                    scrollHeight="350px"
                    stripedRows
                    size="small"
                    class="riwayat-table">
                    <Column field="TANGGAL" header="Tanggal" style="min-width:110px" />
                    <Column field="SUB_BARCODE" header="Sub Barcode" style="min-width:120px" />
                    <Column field="SATUAN" header="Satuan" style="min-width:70px; text-align:center" headerStyle="text-align:center" />
                    <Column field="HARGA" header="Harga" style="min-width:110px; text-align:right" headerStyle="text-align:right">
                        <template #body="{ data }">
                            <span class="d-block text-end">{{ $numeral(data.HARGA, '0,0') }}</span>
                        </template>
                    </Column>
                    <Column field="QTY" header="QTY" style="min-width:80px; text-align:center" headerStyle="text-align:center">
                        <template #body="{ data }">
                            <Tag :value="String(data.QTY)" severity="warning" />
                        </template>
                    </Column>
                    <Column field="TOTAL" header="Total" style="min-width:140px; text-align:right" headerStyle="text-align:right">
                        <template #body="{ data }">
                            <span class="fw-semibold d-block text-end">{{ $numeral(data.TOTAL, '0,0.00') }}</span>
                        </template>
                        <template #footer>
                            <span class="fw-bold d-block text-end">
                                {{ riwayatStats ? $numeral(riwayatStats.totalNilai, '0,0.00') : '' }}
                            </span>
                        </template>
                    </Column>
                </DataTable>

                <template #footer>
                    <Button
                        v-if="riwayatStats"
                        :label="`Terapkan Saran (${riwayatStats.saranKebutuhan} PCS/minggu)`"
                        icon="pi pi-check-circle"
                        severity="success"
                        @click="terapkanSaranKebutuhan" />
                    <Button label="Tutup" icon="pi pi-times" severity="secondary" @click="modalRiwayat=false" />
                </template>
            </Dialog>


              <div class="card elevation-0">
                 <!-- Summary Section -->
                  <div class="card-header">
                    Nilai transfer ke <strong> {{fact.header.LOKASI}} </strong>
                  </div>
                 <div class="card-body">
                     <!-- Summary Blocks - Left to Right Vertical -->
                     <div class="summary-blocks">
                         <!-- Block 1: Items Summary -->
                         <div class="summary-block">
                             <div class="block-icon items-icon">
                                 <i class="pi pi-box"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Transfer Minggu Ini</div>
                                 <div class="block-value">{{ formatCurrency(summary?.this_week_total) }}</div>

                             </div>
                         </div>

                         <!-- Block 2: Quantity Summary -->
                         <div class="summary-block">
                             <div class="block-icon quantity-icon">
                                 <i class="pi pi-shopping-cart"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Transfer Bulan Ini</div>
                                 <div class="block-value">{{ formatCurrency(summary?.this_month_total) }}</div>

                             </div>
                         </div>

                         <!-- Block 3: Revenue Summary -->
                         <div class="summary-block">
                             <div class="block-icon revenue-icon">
                                 <i class="pi pi-dollar"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Transfer Tahun Ini</div>
                                 <div class="block-value">Rp {{ formatCurrency( summary?.this_year_total) }}</div>

                             </div>
                         </div>

                     </div>
                 </div>
             </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">#Permintaan</h3>

                </div>
                <div class="card-body">
                    <div class="row invoice-info">
                        <div class="col-sm-4 invoice-col">
                            Nomor Permintaan
                            <address>
                                <strong> <i class="fas fa-tag"></i> {{fact.header.NO_PERMINTAAN}} </strong><br>
                                <!-- {{details_pasien.NAMAKECAMATAN}}<br> -->
                            </address>
                            Tanggal
                            <address>
                                <strong><i class="fas fa-calendar"></i>{{fact.header.TANGGAL}}</strong><br>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Asal Permintaan
                            <address>
                                <strong> <i class="fas fa-location"></i>{{fact.header.LOKASI}}
                                </strong><br>
                                Catatan : {{fact.header?.CATATAN}}<br>

                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Status
                            <address>
                                <strong>

                                    <i v-if="fact.header.TELAH_DIPROSES==1" class="far fa-check-circle fa-3x"
                                        style="color: green;"></i>

                                    <i v-if="fact.header.TELAH_DIPROSES==0" class="fas fa-minus fa-3x "
                                        style="color: orange;"></i>

                                </strong><br>


                            </address>
                        </div>

                    </div>
                </div>
            </div>

            <div class="card">

                <div class="card-header">
                    <a class="btn btn-text btn-danger-text" style="color: brown;">
                        <i class="fas fa-search"></i>
                        *Lihat Riwayat permintaan/Persetujuan
                    </a>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-hover">
                        <thead>
                            <tr style="height:5px">
                                <th style="width: 10%">
                                    No Permintaan
                                </th>
                                <th style="width: 10%">
                                    Barcode/Riwayat
                                </th>
                                <th style="width: 20%">
                                    Nama Barang
                                </th>
                                <th style="width: 20%">
                                    Satuan
                                </th>
                                <th style="text-align: center;">
                                    Qty Permintaan
                                </th>
                                <th style="text-align: center;">
                                    Sisa Persediaan
                                </th>
                                <th style="text-align: center;">
                                    Kebutuhan Perminggu
                                </th>
                                <th style="text-align: center;">
                                    Qty Disetujui
                                </th>
                                <th style="width: 20%">
                                    Catatan
                                </th>
                                <th style="width: 30%" class="text-center">
                                    Proses
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(data, index) in fact.details" :key="index" style="height: 3px;">

                                <td>{{ data.ID_PERMINTAAN }} <br />
                                    <small>{{data.TANGGAL}}</small>
                                </td>
                                <td>{{ data.BARCODE }}
                                    <button type="button" class="btn btn-link btn-sm p-0 ml-1" @click="getlaporan_tf_v3(data)">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </td>
                                <td>
                                    {{ data.NAMA }}
                                </td>
                                <td>
                                    {{ data.SATUAN }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    {{ data.QTY_ORDER }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    {{ data.SISA_PERSEDIAAN }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    <InputNumber  :minFractionDigits="0" :maxFractionDigits="0"
                                        v-model="data.KEBUTUHAN_PERMINGGU" style="width:100%"
                                        :inputStyle="{ textAlign:'center', backgroundColor:'#fff9c4' }" />
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    <InputNumber disabled :minFractionDigits="0" :maxFractionDigits="0"
                                        v-model="data.QTY_APROVED" style="width:100%"
                                        :inputStyle="{ textAlign:'center', backgroundColor:'#dcedc8' }" />
                                </td>
                                <td>
                                    <!-- {{ data }} -->
                                </td>
                                <td class="project-actions text-center">
                                    <button type="button" class="btn btn-success btn-sm" @click="getdata_obat_baseparam(data)">
                                        <i class="fas fa-cogs"></i>
                                        Pilih
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <!-- proses_transferv2 -->
                    <button type="button" class="btn btn-warning mr-2" @click="proses_transferv2">
                        <i class="fas fa-save"></i>
                        Simpan
                    </button>
                    <button type="button" class="btn btn-info" @click="cetak_surat_transfer">
                        <i class="fas fa-print"></i>
                        Cetak
                    </button>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../../bus';
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading,
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: {
                    header: {
                        NO_PERMINTAAN: '',
                        TANGGAL: '',
                        LOKASI: '',
                        CATATAN: ''
                    },
                    details: []
                },
                itemBarang: [],
                modalItemBarang: false,
                modalRiwayat: false,
                form: {
                    startdate: '',
                    enddate: '',
                    noPermintaan: ''
                },
                isLoading: false,
                fullPage: true,
                noPermintaan: '',
                BarangSeleceted: [],
                currentParentRow: null,
                riwayatParentRow: null,
                riwayatPermintaan: [],
                namaRiwayatSeleceted: '',
                summary:{
                    this_week_total:0,
                    this_month_total:0,
                    this_year_total:0
                }
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;

            const params = new URLSearchParams(window.location.search);
            this.noPermintaan = params.get("no_permintaan");
            //console.log("No Permintaan:", this.noPermintaan);
            this.get_data_permintaan_barang_detail_v3()


        },
        created() {
            //this.fetchData();
        },
        computed: {
            itemBarangQtyList() {
                return this.itemBarang.map(item => item.QTY_APROVED);
            },
            riwayatStats() {
                const data = this.riwayatPermintaan;
                if (!data || data.length === 0) return null;

                const totalQty   = data.reduce((s, r) => s + (Number(r.QTY)   || 0), 0);
                const totalNilai = data.reduce((s, r) => s + (Number(r.TOTAL) || 0), 0);

                const dates = data.map(r => new Date(r.TANGGAL)).filter(d => !isNaN(d));
                let avgPerBulan = 0, avgPerMinggu = 0;
                if (dates.length >= 2) {
                    const minDate = new Date(Math.min(...dates));
                    const maxDate = new Date(Math.max(...dates));
                    const diffMs  = maxDate - minDate;
                    const bulan   = diffMs / (1000 * 60 * 60 * 24 * 30.44);
                    const minggu  = diffMs / (1000 * 60 * 60 * 24 * 7);
                    avgPerBulan  = bulan  > 0 ? totalQty / bulan  : totalQty;
                    avgPerMinggu = minggu > 0 ? totalQty / minggu : totalQty;
                }

                return {
                    totalQty,
                    totalNilai,
                    avgPerBulan:    Math.round(avgPerBulan  * 10) / 10,
                    avgPerMinggu:   Math.round(avgPerMinggu * 10) / 10,
                    saranKebutuhan: Math.ceil(avgPerMinggu),
                };
            }
        },
        watch: {
            itemBarangQtyList(newList, oldList) {
                newList.forEach((qty, index) => {
                    if (qty !== oldList[index]) {
                        this.validasi_pemberian(this.itemBarang[index]);
                    }
                });
            }
        },
        methods: {
            open(type, message) {
                EventBus.$emit('show-alert', { type, message });
            },
            formatCurrency(value) {
                if (value === 0 || value === null || value === undefined) return '0';
                return new Intl.NumberFormat('id-ID').format(value);
            },
            terapkanSaranKebutuhan() {
                if (this.riwayatParentRow && this.riwayatStats) {
                    this.riwayatParentRow.KEBUTUHAN_PERMINGGU = this.riwayatStats.saranKebutuhan;
                    this.modalRiwayat = false;
                    this.open('success', `Kebutuhan perminggu diperbarui: ${this.riwayatStats.saranKebutuhan} PCS`);
                }
            },
            async cetak_surat_transfer() {
                this.isLoading = true;
                this.form.no_permintaan = this.fact.header.NO_PERMINTAAN
                await axios.post('/transfer/cetak_surat_transfer', this.form)
                    .then(response => {

                        window.open(response.data.file_url, '_blank');

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getlaporan_tf_v3(row) {

                this.isLoading = true;
                this.form.mode = 2
                this.form.barcode = row.BARCODE;
                this.form.lokasi = this.fact.header.ID_LOKASI;

                this.namaRiwayatSeleceted = row.NAMA;
                this.riwayatParentRow = row;

                await axios.post('/getlaporan_tf_v3', this.form)
                    .then(response => {

                        if (response.data.metadata.code == 200) {
                            this.modalRiwayat = true;
                            this.riwayatPermintaan = response.data.response;
                            this.open("success", response.data.metadata.message)
                        } else {
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            validasi_pemberian(data) {
                const barcode =  data.BARCODE;
                const total_persediaan = data.QUNATITY;
                const qty = data.QTY_APROVED ?? 0;
                if (qty > total_persediaan) {
                    this.open("warning", "Tidak dapat diproses, pemberian melebihi persediaan")
                    data.QTY_APROVED = 0;
                }



                this.removeItem(data.SUB_BARCODE);

                const finalQty = data.QTY_APROVED ?? 0;
                if (finalQty > 0) {
                    this.BarangSeleceted.push({
                        "SUB_BARCODE": data.SUB_BARCODE,
                        "BARCODE": barcode,
                        "QTY_APROVED": finalQty,
                        "HARGA": data.HARGABELI,
                        "KEBUTUHAN_PERMINGGU": data.KEBUTUHAN_PERMINGGU,
                        "TGL_EXPIRED": data.TGL_EXPIRED_DT,
                    });
                }

                const filteredItems = this.BarangSeleceted.filter(item => item.BARCODE === barcode);
                const totalQuantity = filteredItems.reduce((sum, item) => sum + (item.QTY_APROVED || 0), 0);

                if (this.currentParentRow) {
                    this.currentParentRow.QTY_APROVED = totalQuantity;
                }
            },
            removeItem(SUB_BARCODE) {
                // Find index of the item with matching SUB_BARCODE
                const index = this.BarangSeleceted.findIndex(item => item.SUB_BARCODE === SUB_BARCODE);

                // If found, remove the item
                if (index !== -1) {
                    this.BarangSeleceted.splice(index, 1);
                }
            },
            async getTransferSummary() {
                this.isLoading = true;
                this.form.lokasi = this.fact.header.ID_LOKASI;
                await axios.post('/getTransferSummary', this.form)
                    .then(response => {
                        this.summary = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async proses_transferv2() {
                this.isLoading = true;

                this.fact.details.forEach(element => {
                    const json = this.BarangSeleceted.filter(item => item.BARCODE === element.BARCODE);
                    if (json) {
                        element.ID = JSON.stringify(json);
                    }
                });

                this.form.data = this.fact;

                await axios.post('/persediaan/proses_transferv2', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.open("success", response.data.metadata.message)
                            this.get_data_permintaan_barang_detail_v3();
                        } else {
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_obat_baseparam(row) {
                this.currentParentRow = row;
                this.isLoading = true;
                this.form.mode = 3
                this.form.barcode = row.BARCODE

                await axios.post('/getdata_obat_baseparam_v1', this.form)
                    .then(response => {
                        console.log(this.itemBarang);
                        this.itemBarang = response.data.response;
                        this.modalItemBarang = true;
                        this.itemBarang = this.itemBarang.map(x => {
                            const match = this.BarangSeleceted.find(sub => sub.SUB_BARCODE === x.SUB_BARCODE);
                            return { ...x, QTY_APROVED: match ? match.QTY_APROVED : 0 };
                        });

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_data_permintaan_barang_detail_v3() {
                this.isLoading = true;
                this.form.noPermintaan = this.noPermintaan;
                await axios.post('/persediaan/get_data_permintaan_barang_detail_v3', this.form)
                    .then(response => {
                        this.fact = response.data
                        this.getTransferSummary();
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>



 <style scoped>
      td {
        height: 3px;
        padding: 0;
        overflow: hidden;
        /* Prevents content from expanding row */
    }
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
         font-weight: 500;
         color: #111827;
         font-size: 1.3rem;
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

     .riwayat-stats-row {
         display: flex;
         flex-wrap: wrap;
         gap: 0.6rem;
     }

     .riwayat-stat-card {
         flex: 1 1 140px;
         display: flex;
         align-items: center;
         gap: 0.6rem;
         background: #f8fafc;
         border: 1px solid #e2e8f0;
         border-radius: 8px;
         padding: 0.6rem 0.8rem;
     }

     .riwayat-stat-card--highlight {
         background: #fff7ed;
         border-color: #fed7aa;
     }

     .riwayat-stat-icon {
         font-size: 1.3rem;
         flex-shrink: 0;
     }

     .riwayat-stat-body {
         display: flex;
         flex-direction: column;
     }

     .riwayat-stat-label {
         font-size: 0.7rem;
         color: #6b7280;
         line-height: 1.2;
     }

     .riwayat-stat-value {
         font-weight: 700;
         color: #111827;
         line-height: 1.3;
     }

     .riwayat-stat-value small {
         font-weight: 400;
         font-size: 0.72rem;
         color: #6b7280;
     }

     .riwayat-table :deep(.p-datatable-thead > tr > th),
     .approval-table :deep(.p-datatable-thead > tr > th) {
         background: #f1f5f9;
         font-weight: 600;
         white-space: nowrap;
     }

     .riwayat-table :deep(.p-datatable-tbody > tr > td),
     .approval-table :deep(.p-datatable-tbody > tr > td) {
         padding: 0.35rem 0.5rem;
         vertical-align: middle;
     }

     .approval-table :deep(.p-inputnumber) {
         width: 100%;
     }

     @media (max-width: 768px) {
         :deep(.p-dialog) {
             margin: 0 !important;
             border-radius: 0 !important;
         }

         .riwayat-stats-row {
             gap: 0.4rem;
         }

         .riwayat-stat-card {
             flex: 1 1 calc(50% - 0.4rem);
             padding: 0.5rem 0.6rem;
         }

         .riwayat-stat-icon {
             font-size: 1.1rem;
         }

         .riwayat-stat-label {
             font-size: 0.65rem;
         }

         .riwayat-stat-value {
             font-size: 0.85rem;
         }

         .riwayat-table :deep(.p-datatable-thead > tr > th),
         .riwayat-table :deep(.p-datatable-tbody > tr > td),
         .approval-table :deep(.p-datatable-thead > tr > th),
         .approval-table :deep(.p-datatable-tbody > tr > td) {
             font-size: 0.78rem;
             padding: 0.3rem 0.35rem;
         }
     }

</style>
