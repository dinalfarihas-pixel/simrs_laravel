<template>
    <section class="content">

        <!-- ===== DIALOG: OTORISASI ===== -->
        <Dialog header="Otorisasi Konfirmasi Transfer" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw', maxWidth:'520px'}"
            position="center"
            :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode="6" :noregister="form.noregister" />
            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">
            <ProgressBar v-if="isLoading" mode="indeterminate" style="height:.25em;border-radius:4px" />

            <!-- Empty state -->
            <div v-if="!isLoading && fact.length === 0" class="text-center py-5 text-muted">
                <i class="pi pi-inbox" style="font-size:2.5rem;opacity:.3"></i>
                <div class="mt-2 font-weight-bold">Tidak ada data pemindahan pasien</div>
                <small>Belum ada catatan transfer yang tercatat</small>
            </div>

            <!-- ===== CARD LIST ===== -->
            <div v-for="(data, index) in fact" :key="data.id" class="transfer-card mb-3">

                <!-- ── HEADER KARTU ── -->
                <div class="transfer-card-header">
                    <div class="d-flex align-items-start justify-content-between flex-wrap" style="gap:8px">
                        <!-- Info Pasien -->
                        <div class="d-flex align-items-start" style="gap:10px">
                            <div class="gender-avatar"
                                :class="data.pasien && data.pasien.jenis_kelamin === 'P' ? 'avatar-p' : 'avatar-l'">
                                <ion-icon
                                    :name="data.pasien && data.pasien.jenis_kelamin === 'P' ? 'woman-sharp' : 'man-sharp'"
                                    size="large"></ion-icon>
                            </div>
                            <div>
                                <div class="pasien-nama">{{ data.pasien ? data.pasien.nama_pasien : '—' }}</div>
                                <div class="d-flex flex-wrap align-items-center mt-1" style="gap:6px">
                                    <span v-if="data.pasien" class="info-chip">
                                        <i class="pi pi-id-card mr-1"></i># {{ data.pasien.nomr }}
                                    </span>
                                    <span v-if="data.pasien" class="info-chip">
                                        {{ data.pasien.jenis_kelamin === 'P' ? '♀ Perempuan' : '♂ Laki-laki' }}
                                    </span>
                                    <!-- Guard: hitungUsia selalu return objek, cek .valid -->
                                    <span v-if="data.pasien && hitungUsia(data.pasien.tgl_lahir).valid" class="info-chip">
                                        {{ hitungUsia(data.pasien.tgl_lahir).tahun }} Thn
                                        {{ hitungUsia(data.pasien.tgl_lahir).bulan }} Bln
                                    </span>
                                    <span v-if="data.pasien && data.pasien.no_bpjs" class="info-chip info-chip-bpjs">
                                        <i class="pi pi-shield mr-1"></i>{{ data.pasien.no_bpjs }}
                                    </span>
                                </div>
                                <div class="mt-1">
                                    <small class="text-muted">
                                        <i class="pi pi-calendar mr-1"></i>
                                        Masuk: <strong>{{ formatDatetime(data.pasien ? data.pasien.masukpoly : null) }}</strong>
                                    </small>
                                </div>
                            </div>
                        </div>

                        <!-- Status + Durasi -->
                        <div class="d-flex flex-column align-items-end" style="gap:6px">
                            <span v-if="data.has_confirm == 0" class="status-badge status-menunggu">
                                <i class="pi pi-clock mr-1"></i>Menunggu Konfirmasi
                            </span>
                            <span v-else class="status-badge status-disetujui">
                                <i class="pi pi-check-circle mr-1"></i>Disetujui
                            </span>
                            <span v-if="data.progres_pendaftaran == 1" class="status-badge status-terdaftar">
                                <i class="pi pi-check mr-1"></i>Terdaftar
                            </span>
                            <div class="durasi-badge" :title="'Waktu kirim: ' + formatDatetime(data.waktu_kirim)">
                                <i class="pi pi-stopwatch mr-1"></i>
                                {{ formatDurasi(data.durasi) }} yang lalu
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ── BODY: TRANSFER INFO ── -->
                <div class="transfer-card-body">

                    <!-- Baris 1: Asal → Tujuan -->
                    <div class="transfer-route-row">
                        <div class="route-box route-asal">
                            <div class="route-label">Asal Ruangan</div>
                            <div class="route-value">{{ data.asal_ruangan_display || '—' }}</div>
                        </div>
                        <div class="route-arrow">
                            <i class="pi pi-arrow-right"></i>
                            <small class="d-block text-center" style="font-size:0.65rem;margin-top:2px">
                                {{ caraKeluarLabel(data.cara_keluar) }}
                            </small>
                        </div>
                        <div class="route-box route-tujuan">
                            <div class="route-label">Tujuan Transfer</div>
                            <div class="route-value">{{ data.tujuan_display || '—' }}</div>
                        </div>
                        <div class="route-meta">
                            <div class="meta-item">
                                <span class="meta-label">Waktu Kirim</span>
                                <span class="meta-value">{{ formatDatetime(data.waktu_kirim) }}</span>
                            </div>
                            <div v-if="data.waktu_diterima" class="meta-item mt-1">
                                <span class="meta-label">Waktu Diterima</span>
                                <span class="meta-value text-success">{{ formatDatetime(data.waktu_diterima) }}</span>
                            </div>
                            <div class="meta-item mt-1">
                                <span class="meta-label">Jenis Kasus</span>
                                <span class="meta-value">
                                    <span class="badge badge-info">{{ data.jenis_kasus || '—' }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Baris 2: Dokter + Metode -->
                    <div class="info-row-grid mt-2">
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-user mr-1"></i>Dokter DPJP</span>
                            <span class="cell-value">
                                <span v-if="data.nama_dokter">{{ data.nama_dokter }}</span>
                                <em v-else class="text-muted">Tidak diisi</em>
                            </span>
                        </div>
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-truck mr-1"></i>Metode Pemindahan</span>
                            <span class="cell-value">{{ data.metode_pemindahan_pasien || '—' }}</span>
                        </div>
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-user mr-1"></i>Status Fungsional</span>
                            <span class="cell-value">{{ data.status_fungsional_pasien || '—' }}</span>
                        </div>
                    </div>

                    <hr class="my-2">

                    <!-- Baris 3: Klinis -->
                    <div class="info-row-grid">
                        <div class="info-cell" style="grid-column: span 2">
                            <span class="cell-label"><i class="pi pi-tag mr-1"></i>Diagnosa Utama</span>
                            <span class="cell-value font-weight-bold">{{ data.dx_utama || '—' }}</span>
                        </div>
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-tags mr-1"></i>Diagnosa Sekunder</span>
                            <span class="cell-value">{{ data.dx_sekunder || '—' }}</span>
                        </div>
                    </div>

                    <!-- Alat Medis + Gangguan -->
                    <div class="info-row-grid mt-2">
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-heart mr-1"></i>Alat Medis Terpasang</span>
                            <div class="cell-value">
                                <template v-if="Array.isArray(data.alat_medis_yg_terpasang_display) && data.alat_medis_yg_terpasang_display.length">
                                    <Chip v-for="alkes in data.alat_medis_yg_terpasang_display" :key="alkes"
                                        :label="alkes" icon="pi pi-check" class="mr-1 mb-1" />
                                </template>
                                <template v-else-if="data.alat_medis_yg_terpasang_display && !Array.isArray(data.alat_medis_yg_terpasang_display)">
                                    {{ data.alat_medis_yg_terpasang_display }}
                                </template>
                                <span v-else class="text-muted">—</span>
                            </div>
                        </div>
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-exclamation-triangle mr-1"></i>Gangguan</span>
                            <div class="cell-value">
                                <template v-if="Array.isArray(data.gangguan_display) && data.gangguan_display.length">
                                    <Chip v-for="g in data.gangguan_display" :key="g"
                                        :label="g" icon="pi pi-check" class="mr-1 mb-1" />
                                </template>
                                <template v-else-if="data.gangguan_display && !Array.isArray(data.gangguan_display)">
                                    {{ data.gangguan_display }}
                                </template>
                                <span v-else class="text-muted">—</span>
                            </div>
                        </div>
                    </div>

                    <!-- Catatan -->
                    <div v-if="data.catatan" class="catatan-box mt-2">
                        <i class="pi pi-comment mr-2"></i>
                        <span>{{ data.catatan }}</span>
                    </div>

                    <hr class="my-2">

                    <!-- Baris 4: Perawat -->
                    <div class="info-row-grid">
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-user mr-1"></i>Perawat Pendamping</span>
                            <span class="cell-value">{{ data.perawat_pendamping_display || '—' }}</span>
                        </div>
                        <div class="info-cell">
                            <span class="cell-label"><i class="pi pi-user mr-1"></i>Perawat Penerima</span>
                            <span class="cell-value">{{ data.perawat_penerima_display || '—' }}</span>
                        </div>
                    </div>
                </div>

                <!-- ── FOOTER: AKSI ── -->
                <div class="transfer-card-footer">
                    <Button label="Batalkan Transfer" icon="pi pi-times"
                        class="p-button-danger p-button-outlined p-button-sm"
                        :disabled="isLoading"
                        @click="Batalkan_transfer(data.id, index)" />
                    <div class="ml-auto">
                        <template v-if="form.mode == 2">
                            <Button v-if="data.has_confirm == 0"
                                label="Konfirmasi Transfer" icon="pi pi-check"
                                class="p-button-success p-button-sm"
                                @click="call_oto(data.id)" />
                            <span v-else class="status-badge status-disetujui">
                                <i class="pi pi-check-circle mr-1"></i>Telah Dikonfirmasi
                            </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    import Chip from 'primevue/chip';

    export default {
        components: { Loading, ProgressBar, Chip },
        props: ['datapasien', 'mode'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    noregister: '',
                    id: 0,
                    mode: 0
                },
                isLoading: false,
                showOtorisasi: false,
                responvalue: null,
            };
        },
        created() {
            this.getdata_pemindahan_pasien();
        },
        methods: {
            // ── HELPERS ──
            hitungUsia(tglLahir) {
                // Selalu return objek agar template tidak crash saat akses .tahun/.bulan
                if (!tglLahir) return { tahun: 0, bulan: 0, hari: 0, valid: false };
                const lahir = new Date(tglLahir);
                if (isNaN(lahir)) return { tahun: 0, bulan: 0, hari: 0, valid: false };
                const now   = new Date();
                let tahun = now.getFullYear() - lahir.getFullYear();
                let bulan = now.getMonth()    - lahir.getMonth();
                let hari  = now.getDate()     - lahir.getDate();
                if (hari  < 0) { bulan--; hari  += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
                if (bulan < 0) { tahun--; bulan += 12; }
                return { tahun, bulan, hari, valid: true };
            },
            formatDatetime(val) {
                if (!val) return '—';
                // "2026-06-13 09:29:07" → "13-06-2026 09:29"
                const m = String(val).match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}:\d{2})/);
                if (m) return `${m[3]}-${m[2]}-${m[1]} ${m[4]}`;
                return val;
            },
            formatDurasi(d) {
                if (!d) return '—';
                const parts = [];
                if (d.tahun > 0) parts.push(`${d.tahun} thn`);
                if (d.bulan  > 0) parts.push(`${d.bulan} bln`);
                if (d.hari   > 0) parts.push(`${d.hari} hr`);
                if (d.jam    > 0) parts.push(`${d.jam} jam`);
                if (d.menit  > 0) parts.push(`${d.menit} mnt`);
                return parts.join(' ') || '< 1 mnt';
            },
            caraKeluarLabel(val) {
                const map = { 1: 'Pulang Atas Persetujuan Dokter',  2: 'Dirujuk', 3: 'Pulang Atas Permintaan Sendiri',  4: 'Meninggal', 7: 'Rujuk ke rawat inap' };
                return map[val] || 'Transfer';
            },
            notify(type, message) {
                this.$toast.open({ message, position: 'top-right', type, duration: 5000, dismissible: true });
            },

            // ── ACTIONS ──
            handleValue(value) {
                this.responvalue = value;
                if (this.responvalue == 200) {
                    this.showOtorisasi = false;
                    this.getdata_pemindahan_pasien();
                }
            },
            call_oto(id) {
                this.form.noregister = id;
                this.showOtorisasi   = true;
            },
            async Batalkan_transfer(id, index) {
                this.form.id  = id;
                this.isLoading = true;
                try {
                    const res = await axios.post('/batalkan_transfer', this.form);
                    if (res.data.metadata.code == 200) {
                        this.notify('success', res.data.metadata.message);
                        this.fact.splice(index, 1);
                    } else {
                        this.notify('warning', res.data.metadata.message);
                    }
                } catch (e) {
                    this.notify('error', 'Gagal membatalkan transfer');
                    console.error(e);
                } finally {
                    this.isLoading = false;
                }
            },
            async getdata_pemindahan_pasien() {
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.mode       = 1;
                this.isLoading       = true;
                try {
                    const res  = await axios.post('/getdata_pemindahan_pasien', this.form);
                    // Sesuaikan format response baru
                    this.fact = Array.isArray(res.data.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoading = false;
                }
            },
        },
    }
</script>

<style scoped>
/* ===== CARD WRAPPER ===== */
.transfer-card {
    border: 1px solid #dee2e6;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.08);
    transition: box-shadow .2s;
}
.transfer-card:hover { box-shadow: 0 3px 10px rgba(0,0,0,.12); }

/* ── HEADER ── */
.transfer-card-header {
    padding: 14px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}
.gender-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}
.avatar-p { background: #fce4ec; color: #c2185b; }
.avatar-l { background: #e3f2fd; color: #1565c0; }

.pasien-nama {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a2e;
}
.info-chip {
    display: inline-flex; align-items: center;
    padding: 2px 9px;
    background: #eceff1; color: #37474f;
    border-radius: 20px; font-size: 0.75rem;
    border: 1px solid #b0bec5;
    white-space: nowrap;
}
.info-chip-bpjs { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }

/* ── STATUS BADGES ── */
.status-badge {
    display: inline-flex; align-items: center;
    padding: 4px 12px; border-radius: 20px;
    font-weight: 600; font-size: 0.8rem;
    white-space: nowrap;
}
.status-menunggu  { background: #fff8e1; color: #e65100; border: 1px solid #ffe082; }
.status-disetujui { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
.status-terdaftar { background: #e3f2fd; color: #1565c0; border: 1px solid #90caf9; }

.durasi-badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 20px;
    background: #ede7f6; color: #4527a0;
    border: 1px solid #b39ddb;
    font-size: 0.75rem; font-weight: 600;
}

/* ── BODY ── */
.transfer-card-body {
    padding: 14px 16px;
    font-size: 0.875rem;
}

/* Transfer route */
.transfer-route-row {
    display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
}
.route-box {
    flex: 1; min-width: 120px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}
.route-asal  { background: #fff3e0; border-color: #ffcc80; }
.route-tujuan{ background: #e8f5e9; border-color: #a5d6a7; }
.route-label {
    font-size: 0.7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .05em;
    color: #78909c; margin-bottom: 4px;
}
.route-value { font-weight: 700; color: #1a1a2e; font-size: 0.95rem; }
.route-arrow {
    color: #90a4ae; font-size: 1.1rem; flex-shrink: 0;
    text-align: center;
}
.route-meta {
    flex: 1; min-width: 150px;
    padding: 8px 14px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}
.meta-label { font-size: 0.7rem; color: #78909c; display: block; text-transform: uppercase; letter-spacing:.04em; }
.meta-value { font-weight: 600; font-size: 0.82rem; }

/* Info grid */
.info-row-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
.info-cell {
    display: flex; flex-direction: column; gap: 3px;
}
.cell-label {
    font-size: 0.7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .04em;
    color: #78909c;
}
.cell-value { color: #1a1a2e; font-size: 0.875rem; }

/* Catatan */
.catatan-box {
    display: flex; align-items: flex-start; gap: 8px;
    background: #fff8e1; border: 1px solid #ffe082;
    border-radius: 6px; padding: 8px 12px;
    color: #795548; font-size: 0.875rem;
}
.catatan-box i { color: #f57c00; flex-shrink: 0; margin-top: 2px; }

/* ── FOOTER ── */
.transfer-card-footer {
    padding: 10px 16px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    display: flex; align-items: center; gap: 8px;
    flex-wrap: wrap;
}
</style>

<style>
/* Override offset sidebar AdminLTE agar dialog selalu di tengah viewport */
.p-dialog-mask {
    position: fixed  !important;
    top: 0           !important;
    left: 0          !important;
    width: 100vw     !important;
    height: 100vh    !important;
    display: flex    !important;
    align-items: center     !important;
    justify-content: center !important;
}
.p-dialog {
    margin-left: 0 !important;
}
</style>
