<template>
    <section class="content">
        <div class="card card-outline card-primary shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="pi pi-tablets mr-2" style="color:#1976d2"></i>
                    Riwayat Pemberian Obat
                </h3>
                <div class="d-flex align-items-center" style="gap:8px">
                    <ProgressBar mode="indeterminate" v-show="isLoading"
                        style="height:.25em;width:150px;border-radius:4px" />
                    <Button label="Reload" icon="pi pi-refresh" class="p-button-success p-button-sm p-button-outlined"
                        @click="fetchData()" :disabled="isLoading" />
                </div>
            </div>

            <div class="card-body p-0">
                <!-- Empty state -->
                <div v-if="!isLoading && (!riwayat_obat.itembarang || riwayat_obat.itembarang.length === 0)"
                    class="empty-state">
                    <i class="pi pi-inbox"></i>
                    <div class="mt-2">Tidak ada data riwayat pemberian obat</div>
                </div>

                <!-- Table -->
                <div v-else class="table-responsive">
                    <table class="table table-bordered table-hover mb-0 obat-table">
                        <thead>
                            <tr>
                                <th class="text-center" style="width:40px">#</th>
                                <th style="width:110px">Barcode</th>
                                <th>Nama Obat</th>
                                <th class="text-center" style="width:80px">Satuan</th>
                                <th v-for="(tgl, index) in riwayat_obat.header" :key="'hdr-'+index"
                                    class="text-center tgl-col">
                                    {{ tgl.datacaption }}
                                </th>
                                <th class="text-center" style="width:80px">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in riwayat_obat.itembarang" :key="index">
                                <td class="text-center align-middle">
                                    <span class="row-number">{{ index + 1 }}</span>
                                </td>
                                <td class="align-middle">
                                    <span class="barcode-text">{{ data.BARCODE }}</span>
                                </td>
                                <td class="align-middle">
                                    <div class="obat-nama">{{ data.NAMABARANG }}</div>
                                    <span v-if="data.ITEM_PENGGANTI && data.ITEM_PENGGANTI !== ''"
                                        class="badge badge-warning mt-1">
                                        <i class="pi pi-arrow-right-arrow-left mr-1" style="font-size:.65rem"></i>
                                        {{ data.ITEM_PENGGANTI }}
                                    </span>
                                </td>
                                <td class="text-center align-middle">
                                    <span class="satuan-badge">{{ data.SATUAN }}</span>
                                </td>
                                <td v-for="(tgl, tglIndex) in riwayat_obat.header" :key="'tgl-'+tglIndex"
                                    class="text-center align-middle">
                                    <template v-for="(item, sub_item) in riwayat_obat.sub_item">
                                        <div v-if="data.BARCODE == item.BARCODE && tgl.tgl == item.DT_ONLY"
                                            :key="'item-'+sub_item" class="qty-cell">
                                            <span class="qty-req">{{ item.QTY_REQ }}</span>
                                            <span class="qty-sep">/</span>
                                            <span class="qty-given">{{ item.QTY }}</span>
                                            <span v-if="item.QTY_COPY" class="qty-copy">{{ item.QTY_COPY }}</span>
                                            <div v-if="item.REMARK_ITEM" class="remark-pill">
                                                <ion-icon name="medical-outline" class="remark-icon"></ion-icon>
                                                <span>{{ item.REMARK_ITEM }}</span>
                                            </div>
                                            <div v-if="item.KETERANGAN" class="qty-ket">{{ item.KETERANGAN }}</div>
                                        </div>
                                    </template>
                                </td>
                                <td class="text-center align-middle">
                                    <span class="total-badge">{{ data.TOTAL }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card-footer" v-if="riwayat_obat.itembarang && riwayat_obat.itembarang.length > 0">
                <div class="d-flex align-items-center justify-content-between flex-wrap" style="gap:8px">
                    <!-- Keterangan kolom qty -->
                    <div class="legend-box">
                        <span class="legend-title">Keterangan kolom tanggal:</span>
                        <span class="legend-item">
                            <span class="legend-dot legend-req"></span>
                            <strong>Angka kiri</strong> = Jumlah  diresepkan
                        </span>
                        <span class="legend-sep">/</span>
                        <span class="legend-item">
                            <span class="legend-dot legend-given"></span>
                            <strong>Angka kanan</strong> = Jumlah diterima di ruangan
                        </span>
                    </div>
                    <!-- Ringkasan -->
                    <small class="text-muted">
                        Total <strong>{{ riwayat_obat.itembarang.length }}</strong> item obat
                        <span v-if="riwayat_obat.header && riwayat_obat.header.length > 0">
                            &mdash; periode <strong>{{ riwayat_obat.header.length }}</strong> hari
                        </span>
                    </small>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar'
    export default {
        components: { Loading,ProgressBar },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    NOREGISTER: '',
                    MODE: ''
                },
                isLoading: false,
                fullPage: true,
                riwayat_obat: [],
            };
        },
        mounted() {
            this.form.startdate = new Date();
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.isLoading = true;
                this.form.NOREGISTER = this.datapasien.NOPENDAFTARAN;
                await axios.post('/get_data_kco', this.form)
                    .then(response => {
                        this.riwayat_obat = response.data.response;
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
        },
    }
</script>

<style scoped>
.obat-table thead th {
    background: #f8f9fa;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: #444;
    white-space: nowrap;
    vertical-align: middle;
    border-color: #dee2e6 !important;
}

.obat-table tbody tr:hover {
    background: #e3f2fd !important;
}

.obat-table td {
    vertical-align: middle;
    border-color: #dee2e6 !important;
}

.tgl-col {
    min-width: 90px;
}

.row-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #e3f2fd;
    color: #1565c0;
    font-weight: 700;
}

.barcode-text {
    font-family: monospace;
    color: #555;
}

.obat-nama {
    font-weight: 600;
    color: #1a1a2e;
}

.satuan-badge {
    display: inline-block;
    padding: 2px 8px;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 12px;
    font-weight: 600;
}

.qty-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
}

.remark-pill {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 4px;
    padding: 2px 7px;
    background: #fff3e0;
    border: 1px solid #ffcc80;
    border-left: 3px solid #ef6c00;
    border-radius: 4px;
    color: #bf360c;
    font-size: .85rem;
    font-weight: 600;
    line-height: 1.4;
    text-align: left;
    word-break: break-word;
}

.remark-icon {
    font-size: 1rem;
    color: #ef6c00;
    flex-shrink: 0;
}

.qty-req {
    color: #1565c0;
    font-weight: 700;
}

.qty-sep {
    color: #aaa;
    margin: 0 1px;
}

.qty-given {
    color: #2e7d32;
    font-weight: 700;
}

.qty-copy {
    color: #e65100;
}

.qty-ket {
    width: 100%;
    color: #888;
    text-align: center;
}

.total-badge {
    display: inline-block;
    padding: 3px 10px;
    background: #1565c0;
    color: #fff;
    border-radius: 12px;
    font-weight: 700;
}

.empty-state {
    text-align: center;
    padding: 48px 16px;
    color: #aaa;
}

.empty-state .pi {
    font-size: 2.5rem;
    opacity: .35;
}

.legend-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: .82rem;
    color: #444;
}

.legend-title {
    font-weight: 600;
    color: #555;
    margin-right: 4px;
}

.legend-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.legend-sep {
    color: #aaa;
    font-weight: 700;
    margin: 0 2px;
}

.legend-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.legend-req  { background: #1565c0; }
.legend-given { background: #2e7d32; }
</style>
