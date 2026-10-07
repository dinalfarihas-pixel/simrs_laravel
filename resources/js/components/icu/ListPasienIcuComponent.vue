<template>
    <section class="content">
        <!-- ===== DIALOG: FORM CHECKLIST ICU/HCU ===== -->
        <Dialog header="Checklist Kriteria Masuk ICU / HCU"
            v-model:visible="showChecklistDialog"
            :maximized="true" :modal="true"
            :style="{ margin: '0', borderRadius: '0', width: '98vw', height: '100vh' }"
            :contentStyle="{ overflow: 'auto', flex: '1' }">
            <checklist-masuk-icu-hcu-page
                v-if="selectedNoregister"
                :initial-noregister="selectedNoregister"
                @checklist-saved="onChecklistSaved" />
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" severity="secondary" outlined
                    @click="showChecklistDialog = false" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">

            <!-- ===== FILTER CARD ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-filter mr-2" style="color:#1976d2"></i>
                        Parameter Pencarian — Checklist Masuk ICU / HCU
                    </h3>
                    <ProgressBar mode="indeterminate" v-show="isLoading"
                        style="height:.25em;width:180px;border-radius:4px" />
                </div>
                <div class="card-body pb-3">
                    <div class="row align-items-end">
                        <div class="col-md-3">
                            <label class="filter-label">Tanggal Awal</label>
                            <Calendar v-model="form.tgl_awal" :showIcon="true"
                                dateFormat="dd/mm/yy" style="width:100%" />
                        </div>
                        <div class="col-md-3">
                            <label class="filter-label">Tanggal Akhir</label>
                            <Calendar v-model="form.tgl_akhir" :showIcon="true"
                                dateFormat="dd/mm/yy" style="width:100%" />
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
                            <Button label="Tampilkan" icon="pi pi-search"
                                class="p-button-primary w-100"
                                @click="fetchData()" :loading="isLoading" />
                        </div>
                        <div class="col-md-4">
                            <label class="filter-label">Cari Nama / No. RM</label>
                            <InputText v-model="searchNama" placeholder="Nama / No. RM / Dokter..."
                                style="width:100%" @keyup.enter="fetchData()" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== SUMMARY CARD ===== -->
            <div class="row mb-3">
                <div class="col-md-3 col-sm-6">
                    <div class="summary-card summary-total">
                        <i class="pi pi-users summary-icon"></i>
                        <div class="summary-body">
                            <div class="summary-num">{{ fact.length }}</div>
                            <div class="summary-label">Total Record</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="summary-card summary-icu">
                        <i class="pi pi-building summary-icon"></i>
                        <div class="summary-body">
                            <div class="summary-num">{{ icuCount }}</div>
                            <div class="summary-label">ICU</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="summary-card summary-hcu">
                        <i class="pi pi-heart summary-icon"></i>
                        <div class="summary-body">
                            <div class="summary-num">{{ hcuCount }}</div>
                            <div class="summary-label">HCU</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="summary-card summary-diterima">
                        <i class="pi pi-check-circle summary-icon"></i>
                        <div class="summary-body">
                            <div class="summary-num">{{ diterimaCount }}</div>
                            <div class="summary-label">Diterima</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== TABLE CARD ===== -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header d-flex align-items-center justify-content-between flex-wrap" style="gap:8px">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-list mr-2" style="color:#1976d2"></i>
                        Daftar Pasien yang Sudah Mengisi Checklist ICU / HCU
                    </h3>
                    <!-- Filter chips -->
                    <div class="d-flex flex-wrap align-items-center" style="gap:6px">
                        <span class="filter-label mb-0 mr-1">Filter:</span>
                        <button type="button" class="btn btn-xs"
                            :class="filterUnit === 'SEMUA' ? 'btn-secondary' : 'btn-outline-secondary'"
                            @click="filterUnit = 'SEMUA'">Semua</button>
                        <button type="button" class="btn btn-xs"
                            :class="filterUnit === 'ICU' ? 'btn-primary' : 'btn-outline-primary'"
                            @click="filterUnit = 'ICU'">ICU</button>
                        <button type="button" class="btn btn-xs"
                            :class="filterUnit === 'HCU' ? 'btn-danger' : 'btn-outline-danger'"
                            @click="filterUnit = 'HCU'">HCU</button>
                        <span class="mx-1 text-muted">|</span>
                        <button type="button" class="btn btn-xs"
                            :class="filterHasil === 'SEMUA' ? 'btn-secondary' : 'btn-outline-secondary'"
                            @click="filterHasil = 'SEMUA'">Semua Hasil</button>
                        <button type="button" class="btn btn-xs"
                            :class="filterHasil === 'Diterima' ? 'btn-success' : 'btn-outline-success'"
                            @click="filterHasil = 'Diterima'">Diterima</button>
                        <button type="button" class="btn btn-xs"
                            :class="filterHasil === 'Ditolak' ? 'btn-warning' : 'btn-outline-warning'"
                            @click="filterHasil = 'Ditolak'">Ditolak</button>
                        <button type="button" class="btn btn-xs"
                            :class="filterHasil === 'Dirujuk' ? 'btn-info' : 'btn-outline-info'"
                            @click="filterHasil = 'Dirujuk'">Dirujuk</button>
                    </div>
                </div>
                <div class="card-header py-1 border-top-0" style="background:#f8f9fa">
                    <small class="text-muted">
                        Menampilkan <strong>{{ factFiltered.length }}</strong> dari
                        <strong>{{ fact.length }}</strong> record
                        <span v-if="searchNama" class="badge badge-info ml-1">
                            Cari: "{{ searchNama }}"
                        </span>
                    </small>
                </div>

                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 icu-table">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width:44px">No</th>
                                    <th style="min-width:220px">Pasien</th>
                                    <th style="min-width:120px">No. Register</th>
                                    <th style="min-width:140px">Tgl Pengajuan</th>
                                    <th class="text-center" style="width:90px">Unit</th>
                                    <th style="min-width:140px">Dokter PJ</th>
                                    <th style="min-width:180px">Diagnosa</th>
                                    <th class="text-center" style="min-width:140px">Hasil Keputusan</th>
                                    <th class="text-center" style="min-width:130px">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="isLoading">
                                    <td colspan="9" class="text-center py-5">
                                        <i class="pi pi-spin pi-spinner mr-2"></i>
                                        Memuat data checklist...
                                    </td>
                                </tr>
                                <tr v-else-if="factFiltered.length === 0 && !isLoading">
                                    <td colspan="9" class="text-center text-muted py-5">
                                        <i class="pi pi-inbox" style="font-size:2rem;opacity:.35"></i>
                                        <div class="mt-2 font-weight-bold">Tidak ada data ditemukan</div>
                                        <div class="mt-1">
                                            <small>Gunakan filter tanggal lalu klik Tampilkan.</small>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(row, k) in factFiltered" :key="row.id_checklist"
                                    :class="rowClass(row)">
                                    <td class="text-center align-middle">
                                        <span class="row-number">{{ k + 1 }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <div class="pasien-nama">{{ row.nama_pasien || '—' }}</div>
                                        <div class="d-flex align-items-center mt-1" style="gap:4px">
                                            <code class="text-primary" style="font-size:0.82rem">{{ row.no_rm || '—' }}</code>
                                        </div>
                                        <small class="text-muted d-block mt-1">
                                            <i class="pi pi-map-marker mr-1"></i>{{ row.ruangan_asal || '—' }}
                                        </small>
                                    </td>
                                    <td class="align-middle">
                                        <code style="font-size:0.8rem;color:#1565c0">{{ row.noregister }}</code>
                                        <div class="mt-1">
                                            <small class="text-muted">
                                                Oleh: <strong>{{ row.username || '—' }}</strong>
                                            </small>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div>{{ formatTanggal(row.tgl_pengajuan) }}</div>
                                        <small class="text-muted">
                                            Keputusan: {{ formatTanggal(row.tgl_keputusan) }}
                                        </small>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span class="unit-badge"
                                            :class="row.unit_tujuan === 'ICU' ? 'unit-icu' : 'unit-hcu'">
                                            {{ row.unit_tujuan }}
                                        </span>
                                    </td>
                                    <td class="align-middle">
                                        <div style="font-size:0.85rem">{{ row.nama_dokter_approver || '—' }}</div>
                                        <small v-if="row.dokter_perujuk" class="text-muted">
                                            Perujuk: {{ row.dokter_perujuk }}
                                        </small>
                                    </td>
                                    <td class="align-middle">
                                        <div class="diagnosa-text">{{ row.diagnosa || '—' }}</div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <!-- Diterima -->
                                        <template v-if="row.hasil_keputusan === 'Diterima'">
                                            <span class="hasil-badge hasil-diterima">
                                                <i class="pi pi-check-circle mr-1"></i>Diterima
                                            </span>
                                            <div v-if="!row.is_eligible" class="mt-1">
                                                <span class="badge badge-warning" style="font-size:0.7rem">
                                                    <i class="pi pi-exclamation-triangle mr-1"></i>Ada Eksklusi
                                                </span>
                                            </div>
                                        </template>
                                        <!-- Ditolak -->
                                        <template v-else-if="row.hasil_keputusan === 'Ditolak'">
                                            <span class="hasil-badge hasil-ditolak">
                                                <i class="pi pi-times-circle mr-1"></i>Ditolak
                                            </span>
                                            <div v-if="row.alasan_penolakan" class="mt-1 alasan-text">
                                                {{ row.alasan_penolakan }}
                                            </div>
                                        </template>
                                        <!-- Dirujuk -->
                                        <template v-else-if="row.hasil_keputusan === 'Dirujuk'">
                                            <span class="hasil-badge hasil-dirujuk">
                                                <i class="pi pi-arrow-right mr-1"></i>Dirujuk
                                            </span>
                                            <div v-if="row.unit_alternatif" class="mt-1">
                                                <small class="text-muted">→ {{ row.unit_alternatif }}</small>
                                            </div>
                                        </template>
                                        <!-- Tidak diketahui -->
                                        <template v-else>
                                            <span class="hasil-badge hasil-unknown">
                                                <i class="pi pi-question-circle mr-1"></i>
                                                {{ row.hasil_keputusan || '—' }}
                                            </span>
                                        </template>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="aksi-group">
                                            <button class="btn-aksi btn-aksi-primary"
                                                @click="bukaChecklist(row)"
                                                title="Lihat / Edit Form Checklist">
                                                <i class="pi pi-clipboard mr-1"></i>Checklist
                                            </button>
                                            <button class="btn-aksi btn-aksi-arrow mt-1"
                                                @click="bukaProsesCheklist(row)"
                                                title="Buka Form Proses ICU">
                                                <i class="pi pi-arrow-right mr-1"></i>Proses ICU
                                            </button>
                                        </div>
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
import { EventBus } from '../bus';

export default {
    data() {
        return {
            fact: [],
            form: {
                tgl_awal:  new Date(),
                tgl_akhir: new Date(),
            },
            isLoading: false,
            searchNama: '',
            filterUnit:  'SEMUA',
            filterHasil: 'SEMUA',
            showChecklistDialog: false,
            selectedNoregister: null,
        };
    },

    computed: {
        factFiltered() {
            let data = this.fact || [];

            if (this.filterUnit !== 'SEMUA') {
                data = data.filter(r => r.unit_tujuan === this.filterUnit);
            }
            if (this.filterHasil !== 'SEMUA') {
                data = data.filter(r => r.hasil_keputusan === this.filterHasil);
            }
            if (this.searchNama && this.searchNama.trim()) {
                const kw = this.searchNama.trim().toLowerCase();
                data = data.filter(r =>
                    [r.nama_pasien, r.no_rm, r.noregister, r.nama_dokter_approver, r.dokter_perujuk]
                        .some(v => String(v || '').toLowerCase().includes(kw))
                );
            }

            return data;
        },

        icuCount() {
            return this.fact.filter(r => r.unit_tujuan === 'ICU').length;
        },
        hcuCount() {
            return this.fact.filter(r => r.unit_tujuan === 'HCU').length;
        },
        diterimaCount() {
            return this.fact.filter(r => r.hasil_keputusan === 'Diterima').length;
        },
    },

    created() {
        this.fetchData();
    },

    methods: {
        fmtDate(d) {
            if (!d) return null;
            const dt = d instanceof Date ? d : new Date(d);
            if (isNaN(dt)) return null;
            const yyyy = dt.getFullYear();
            const mm   = String(dt.getMonth() + 1).padStart(2, '0');
            const dd   = String(dt.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        },

        async fetchData() {
            this.isLoading = true;
            this.fact = [];
            try {
                const res = await axios.post('/icu/get_all_checklist_masuk', {
                    tgl_awal:  this.fmtDate(this.form.tgl_awal),
                    tgl_akhir: this.fmtDate(this.form.tgl_akhir),
                });

                console.log('fetchData response:', res.data);
                this.fact = Array.isArray(res.data?.response) ? res.data.response : [];
            } catch (e) {
                console.error(e);
                this.notify('error', 'Gagal memuat data checklist ICU/HCU.');
            } finally {
                this.isLoading = false;
            }
        },

        bukaChecklist(row) {
            this.selectedNoregister = String(row.noregister);
            this.showChecklistDialog = true;
        },

        bukaProsesCheklist(row) {
            window.location.href = `/pemantauan-intensif-icu/${row.noregister}`;
        },

        onChecklistSaved() {
            this.fetchData();
        },

        rowClass(row) {
            if (row.hasil_keputusan === 'Diterima') return 'row-diterima';
            if (row.hasil_keputusan === 'Ditolak')  return 'row-ditolak';
            if (row.hasil_keputusan === 'Dirujuk')  return 'row-dirujuk';
            return '';
        },

        formatTanggal(val) {
            if (!val) return '—';
            const d = new Date(val.replace(' ', 'T'));
            if (isNaN(d)) return val;
            const dd   = String(d.getDate()).padStart(2, '0');
            const mm   = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = d.getFullYear();
            const hh   = String(d.getHours()).padStart(2, '0');
            const min  = String(d.getMinutes()).padStart(2, '0');
            return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
        },

        notify(type, message) {
            EventBus.$emit('show-alert', { type, title: '', message });
        },
    },
};
</script>

<style scoped>
.filter-label {
    display: block;
    font-weight: 600;
    color: #555;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: .04em;
    font-size: 0.82rem;
}

/* ===== SUMMARY CARDS ===== */
.summary-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: 10px;
    margin-bottom: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,.07);
}

.summary-icon {
    font-size: 1.8rem;
    opacity: .75;
}

.summary-num {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1;
}

.summary-label {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .04em;
    opacity: .75;
}

.summary-total   { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }
.summary-icu     { background: #e8eaf6; color: #283593; border: 1px solid #9fa8da; }
.summary-hcu     { background: #fce4ec; color: #880e4f; border: 1px solid #f48fb1; }
.summary-diterima{ background: #e8f5e9; color: #1b5e20; border: 1px solid #a5d6a7; }

/* ===== TABLE ===== */
.icu-table thead th {
    background: #f8f9fa;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    white-space: nowrap;
    vertical-align: middle;
    border-color: #dee2e6 !important;
    font-size: 0.82rem;
}

.icu-table td {
    vertical-align: middle;
    border-color: #dee2e6 !important;
    font-size: 0.9rem;
}

.row-diterima { background: #f1f8e9 !important; }
.row-diterima:hover { background: #dcedc8 !important; }
.row-ditolak  { background: #fff8e1 !important; }
.row-ditolak:hover  { background: #fff3cd !important; }
.row-dirujuk  { background: #e3f2fd !important; }
.row-dirujuk:hover  { background: #bbdefb !important; }

.row-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #e3f2fd;
    color: #1565c0;
    font-weight: 700;
    font-size: 12px;
}

.pasien-nama {
    font-weight: 700;
    color: #1a1a2e;
}

.diagnosa-text {
    font-size: 0.82rem;
    color: #37474f;
    max-width: 200px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.alasan-text {
    font-size: 0.75rem;
    color: #b71c1c;
    max-width: 150px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

/* ===== UNIT BADGE ===== */
.unit-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.82rem;
    white-space: nowrap;
    min-width: 60px;
}

.unit-icu {
    background: #e3f2fd;
    color: #1565c0;
    border: 1px solid #90caf9;
}

.unit-hcu {
    background: #fce4ec;
    color: #c2185b;
    border: 1px solid #f48fb1;
}

/* ===== HASIL BADGE ===== */
.hasil-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.82rem;
    white-space: nowrap;
}

.hasil-diterima {
    background: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #a5d6a7;
}

.hasil-ditolak {
    background: #fff8e1;
    color: #e65100;
    border: 1px solid #ffe082;
}

.hasil-dirujuk {
    background: #e3f2fd;
    color: #1565c0;
    border: 1px solid #90caf9;
}

.hasil-unknown {
    background: #f5f5f5;
    color: #757575;
    border: 1px solid #e0e0e0;
}

/* ===== AKSI ===== */
.aksi-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: stretch;
}

.btn-aksi {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.8rem;
    transition: opacity .15s;
}

.btn-aksi:hover { opacity: .82; }
.btn-aksi-primary { background: #1976d2; color: #fff; }
.btn-aksi-info    { background: #546e7a; color: #fff; }
</style>
