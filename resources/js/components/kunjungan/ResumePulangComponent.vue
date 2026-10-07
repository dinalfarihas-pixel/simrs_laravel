<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <div class="container-fluid px-0">

            <!-- ===== HEADER AKSI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-file-medical-alt mr-2 text-primary"></i>
                        Resume Pulang Pasien
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:130px;border-radius:4px" />
                        <Button icon="pi pi-refresh" class="p-button-outlined p-button-sm"
                            @click="getdata_resume_pulang_pasien()" title="Refresh" />
                    </div>
                </div>
            </div>

            <template v-if="fact.pasien">



                <!-- ===== RINGKASAN MASUK ===== -->
                <div class="resume-section mb-3">
                    <div class="resume-section-header">
                        <span class="resume-section-icon">&#9632;</span> RINGKASAN MASUK
                    </div>
                    <div class="resume-section-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="info-row">
                                    <span class="info-label">No. Register</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value info-highlight">{{ fact.masuk_dari ? fact.masuk_dari.NOPENDAFTARAN : (fact.data_ranap ? fact.data_ranap.NOPENDAFTARAN : '') }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Ruang Rawat</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? fact.data_ranap.POLI : '' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Dokter Penerima</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.masuk_dari ? fact.masuk_dari.NAMADOKTER : (fact.triase_igd ? fact.triase_igd.dpjp : '') }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Tanggal Masuk</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.masuk_dari ? fact.masuk_dari.MASUKPOLY_DISPLAY : (fact.data_ranap ? fact.data_ranap.MASUKPOLY_DISPLAY : '') }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="info-row">
                                    <span class="info-label">Diantar Oleh</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.triase_igd ? fact.triase_igd.diantar_oleh : '' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Transportasi</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.triase_igd ? fact.triase_igd.transportasi : '' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Dokter Rawat</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? fact.data_ranap.NAMADOKTER : '' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Lama Dirawat</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? fact.data_ranap.JLM_HARI_RAWAT + ' Hari' : '' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== RINGKASAN KELUAR ===== -->
                <div class="resume-section mb-3">
                    <div class="resume-section-header">
                        <span class="resume-section-icon">&#9632;</span> RINGKASAN KELUAR
                    </div>
                    <div class="resume-section-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="info-row">
                                    <span class="info-label">Tanggal Keluar</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? fact.data_ranap.KELUARPOLY : '-' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">Cara Keluar</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? (fact.data_ranap.STTS_PULANG || '-') : '-' }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="info-row">
                                    <span class="info-label">Keadaan Saat Pulang</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">{{ fact.data_ranap ? (fact.data_ranap.KEADAAN_SAAT_PULANG || '-') : '-' }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">KLL</span>
                                    <span class="info-colon">:</span>
                                    <span class="info-value">
                                        <span :class="fact.data_ranap && fact.data_ranap.KLL == 1 ? 'badge badge-danger' : 'badge badge-secondary'">
                                            {{ fact.data_ranap && fact.data_ranap.KLL == 1 ? 'Ya' : 'Tidak' }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== ANAMNESA & DIAGNOSA ===== -->
                <div class="resume-section mb-3">
                    <div class="resume-section-header">
                        <span class="resume-section-icon">&#9632;</span> ANAMNESA &amp; DIAGNOSA
                    </div>
                    <div class="resume-section-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="info-block mb-3">
                                    <div class="info-block-label">Keluhan Utama</div>
                                    <div class="info-block-value">{{ fact.resume ? (fact.resume.keluhan_utama || '-') : '-' }}</div>
                                </div>
                                <div class="info-block mb-3">
                                    <div class="info-block-label">Riwayat Penyakit Sekarang</div>
                                    <div class="info-block-value" style="white-space:pre-line">{{ fact.resume ? (fact.resume.riwayat_peny_skrg || '-') : '-' }}</div>
                                </div>
                                <div class="info-block" v-if="fact.resume && fact.resume.riwayat_peny_skrg_arr">
                                    <div class="info-block-label">Riwayat Penyakit Sebelumnya</div>
                                    <div class="info-block-value">
                                        <span v-for="(item, i) in riwayatArr" :key="i" class="badge badge-secondary mr-1 mb-1">{{ item }}</span>
                                        <span v-if="!riwayatArr.length">-</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="info-block mb-3" v-if="fact.resume && fact.resume.dx_masuk">
                                    <div class="info-block-label">Diagnosa Masuk (IGD)</div>
                                    <div class="info-block-value">{{ fact.resume.dx_masuk.dx_utama || '-' }}</div>
                                </div>
                                <div class="info-block mb-3">
                                    <div class="info-block-label">Diagnosa Utama (Rawat Inap)</div>
                                    <div class="info-block-value font-weight-bold text-danger">
                                        {{ fact.resume ? (fact.resume.dx_awal || '-') : '-' }}
                                    </div>
                                </div>
                                <div class="info-block">
                                    <div class="info-block-label">Diagnosa Sekunder</div>
                                    <div class="info-block-value">{{ fact.resume ? (fact.resume.dx_sekunder || '-') : '-' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- ===== SOAP / CPPT TERAKHIR ===== -->
                <div v-if="fact.soap_akhir" class="resume-section mb-3">
                    <div class="resume-section-header">
                        <span class="resume-section-icon">&#9632;</span> SOAP / CPPT TERAKHIR
                        <span class="resume-section-meta">{{ fact.soap_akhir.waktu_display }} &mdash; {{ fact.soap_akhir.verif_user_display }}</span>
                    </div>
                    <div class="resume-section-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="soap-block soap-s mb-3">
                                    <div class="soap-label">S &mdash; Subjective</div>
                                    <div class="soap-value" style="white-space:pre-line">{{ fact.soap_akhir.subject || '-' }}</div>
                                </div>
                                <div class="soap-block soap-o">
                                    <div class="soap-label">O &mdash; Objective</div>
                                    <div class="soap-value" v-html="fact.soap_akhir.object_display || fact.soap_akhir.object || '-'"></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="soap-block soap-a mb-3">
                                    <div class="soap-label">A &mdash; Assessment</div>
                                    <div class="soap-value">{{ fact.soap_akhir.asessment || '-' }}</div>
                                </div>
                                <div class="soap-block soap-p">
                                    <div class="soap-label">P &mdash; Plan</div>
                                    <div class="soap-value" style="white-space:pre-line">{{ fact.soap_akhir.plan || '-' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== PENUNJANG ===== -->
                <div class="card card-outline card-primary shadow-sm mb-3">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold mb-0">
                            <i class="fas fa-vials mr-2 text-primary"></i>
                            Pemeriksaan Penunjang
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="info-block-label">Laboratorium</div>
                                <div class="info-block-value">{{ fact.resume ? (fact.resume.penunjang_lab || '-') : '-' }}</div>
                            </div>
                            <div class="col-md-4">
                                <div class="info-block-label">Radiologi</div>
                                <div class="info-block-value">{{ fact.resume ? (fact.resume.penunjang_radiologi || '-') : '-' }}</div>
                            </div>
                            <div class="col-md-4">
                                <div class="info-block-label">Lainnya</div>
                                <div class="info-block-value">{{ fact.resume ? (fact.resume.penunjang_lainnya || '-') : '-' }}</div>
                            </div>
                        </div>

                        <!-- Hasil Lab Abnormal -->
                        <div v-if="fact.obat_penunjang && fact.obat_penunjang.hasil_lab_positiv && fact.obat_penunjang.hasil_lab_positiv.length > 0" class="mt-3">
                            <div class="info-block-label mb-2">Hasil Lab Abnormal</div>
                            <div class="lab-badge-wrap">
                                <div v-for="(lab, i) in fact.obat_penunjang.hasil_lab_positiv" :key="i" class="lab-badge">
                                    <div class="lab-badge-kat">{{ lab.KATEGORI }}</div>
                                    <div class="lab-badge-nama">{{ lab.PEMERIKSAAN }}</div>
                                    <div class="lab-badge-hasil">{{ lab.HASIL }}</div>
                                    <div class="lab-badge-normal">N: {{ lab.NORMAL }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== OBAT YANG PERNAH DIBERIKAN ===== -->
                <div v-if="obatanArr.length" class="resume-section mb-3">
                    <div class="resume-section-header">
                        <span class="resume-section-icon">&#9632;</span> TERAPI YANG DIBERIKAN
                        <span class="resume-section-meta">{{ obatanArr.length }} item</span>
                    </div>
                    <div class="resume-section-body">
                        <div class="obat-wrap">
                            <span v-for="(nama, i) in obatanArr" :key="i" class="obat-chip">
                                <i class="fas fa-capsules mr-1"></i>{{ nama }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- ===== OBAT PULANG ===== -->
                <div class="card card-outline card-primary shadow-sm mb-3">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold mb-0">
                            <i class="fas fa-prescription-bottle-alt mr-2 text-primary"></i>
                            Obat Pulang
                        </h3>
                    </div>
                    <div class="card-body p-0">
                        <div v-if="!fact.obat_pulang || fact.obat_pulang.length === 0" class="text-center text-muted py-4">
                            <i class="fas fa-inbox" style="font-size:1.5rem;opacity:.3"></i>
                            <div class="mt-1">Tidak ada obat pulang</div>
                        </div>
                        <div v-else class="table-responsive">
                            <table class="table table-bordered table-hover mb-0 obat-table">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width:40px">No</th>
                                        <th>Nama Obat</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-center">Satuan</th>
                                        <th>Cara Pakai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in fact.obat_pulang" :key="index">
                                        <td class="text-center align-middle">{{ index + 1 }}</td>
                                        <td class="align-middle font-weight-bold">{{ data.NAMABARANG }}</td>
                                        <td class="text-center align-middle">{{ data.QTY }}</td>
                                        <td class="text-center align-middle">{{ data.SATUAN }}</td>
                                        <td class="align-middle">{{ data.REMARK_ITEM }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ===== VERIFIKASI ===== -->
                <div v-if="fact.resume && fact.resume.auth" class="card card-outline card-success shadow-sm mb-3">
                    <div class="card-body d-flex align-items-center" style="gap:12px">
                        <i class="fas fa-shield-alt text-success" style="font-size:1.8rem"></i>
                        <div>
                            <div class="font-weight-bold text-success">Telah Diverifikasi</div>
                            <small class="text-muted">{{ fact.resume.auth }} &mdash; {{ fact.resume.jam_auth }}</small>
                        </div>
                    </div>
                </div>

            </template>

            <!-- Empty state -->
            <div v-else-if="!isLoading" class="card shadow-sm">
                <div class="card-body text-center text-muted py-5">
                    <i class="fas fa-file-medical" style="font-size:2.5rem;opacity:.3"></i>
                    <div class="mt-2">Data resume pulang belum tersedia</div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    export default {
        components: { Loading, ProgressBar },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: {
                    resume: null, pasien: null, obat_penunjang: null,
                    obat_pulang: [], data_masuk: null, triase_igd: null,
                    data_ranap: null, soap_akhir: null
                },
                form: { noregister: '' },
                isLoading: false,
                fullPage: false,
            };
        },
        mounted() {
            this.getdata_resume_pulang_pasien();
        },
        computed: {
            // obatan: string "|BETAHISTIN 6 MG |ALPRAZOLAM..." → array unik tanpa duplikat
            obatanArr() {
                const raw = this.fact?.obat_penunjang?.obatan;
                if (!raw) return [];
                const items = raw.split('|')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                return [...new Set(items)]; // hapus duplikat
            },
            // riwayat_peny_skrg_arr: ",Hipertensi,Hiperkolestro" → array
            riwayatArr() {
                const raw = this.fact?.resume?.riwayat_peny_skrg_arr;
                if (!raw) return [];
                return raw.split(',').map(s => s.trim()).filter(s => s.length > 0);
            },
        },
        methods: {
            open(type, message) {
                this.$toast.open({ message, position: 'top-right', type, duration: 5000, dismissible: true });
            },
            async getdata_resume_pulang_pasien() {
                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                try {
                    const response = await axios.post('/get_resume_pulang', this.form);
                    this.fact = response.data;
                } catch (error) {
                    console.error('Resume pulang:', error);
                } finally {
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
/* ===== RESUME SECTION (seperti screenshot) ===== */
.resume-section {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,.07);
}
.resume-section-header {

    padding: 10px 16px;
    font-size: .88rem;
    letter-spacing: .06em;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.resume-section-body { padding: 16px 20px; background: #fff; }

.info-highlight { color: #1a6b3c; font-weight: 700; }

/* ===== INFO ROW (label : value) ===== */
.info-row {
    display: flex;
    gap: 0;
    margin-bottom: 8px;
    align-items: flex-start;
}
.info-label {
    width: 160px;
    flex-shrink: 0;
    font-weight: 600;
    color: #666;
}
.info-colon { width: 16px; flex-shrink: 0; color: #999; }
.info-value { flex: 1; color: #222; }

/* ===== INFO BLOCK (label + value stacked) ===== */
.info-block-label {
    font-weight: 700;
    color: #555;
    font-size: .8rem;
    text-transform: uppercase;
    letter-spacing: .04em;
    margin-bottom: 4px;
}
.info-block-value {
    color: #222;
    line-height: 1.6;
    background: #f8f9fa;
    border-radius: 6px;
    padding: 8px 12px;
    border: 1px solid #dee2e6;
}

/* ===== SOAP ===== */
.soap-block { border-radius: 8px; overflow: hidden; }
.soap-label {
    padding: 6px 12px;
    font-weight: 700;
    font-size: .82rem;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: #fff;
}
.soap-value { padding: 10px 12px; font-size: 1rem; line-height: 1.6; }
.soap-s .soap-label { background: #1565c0; }
.soap-s .soap-value { background: #e3f2fd; }
.soap-o .soap-label { background: #2e7d32; }
.soap-o .soap-value { background: #e8f5e9; }
.soap-a .soap-label { background: #e65100; }
.soap-a .soap-value { background: #fff3e0; }
.soap-p .soap-label { background: #6a1b9a; }
.soap-p .soap-value { background: #f3e5f5; }

/* ===== OBAT CHIP ===== */
.obat-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.obat-chip {
    display: inline-flex; align-items: center;
    padding: 4px 12px; border-radius: 20px;
    background: #e3f2fd; color: #1565c0;
    border: 1px solid #90caf9; font-weight: 600;
}

/* ===== LAB BADGE ===== */
.lab-badge-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.lab-badge {
    background: #fff8e1; border: 1px solid #ffe082;
    border-left: 4px solid #f57c00;
    border-radius: 8px; padding: 6px 12px; min-width: 120px;
}
.lab-badge-kat  { font-size:.65rem; color:#888; text-transform:uppercase; }
.lab-badge-nama { font-weight:700; color:#333; }
.lab-badge-hasil { color:#c62828; font-weight:700; font-size:1rem; }
.lab-badge-normal { font-size:.7rem; color:#888; }

/* ===== OBAT TABLE ===== */
.obat-table thead th {
    background: #f8f9fa; font-weight: 700;
    text-transform: uppercase; letter-spacing: .04em;
    border-color: #dee2e6 !important;
}
.obat-table td { border-color: #dee2e6 !important; }
.obat-table tbody tr:hover { background: #e3f2fd !important; }
</style>
