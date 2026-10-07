<template>
    <section class="content">
        <div class="container-fluid p-0">

            <!-- ===== Hero Banner ===== -->
            <div class="hero-banner">
                <div class="row m-0 align-items-center" style="padding: 32px 28px 60px;">

                    <!-- Kunjungan Hari Ini -->
                    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <div class="hero-stat">
                            <div class="hero-stat-value">{{ totalKunjungan }}</div>
                            <div class="hero-stat-label">Kunjungan Hari Ini</div>
                            <div class="hero-stat-sub mt-3">
                                <div class="hero-stat-sub-label">RINCIAN KUNJUNGAN</div>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <div class="sub-label">Rawat Jalan</div>
                                        <div class="sub-value">{{ kunjunganRajal }}</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="sub-label">IGD</div>
                                        <div class="sub-value">{{ kunjunganIGD }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pasien Rawat Inap -->
                    <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <div class="hero-stat">
                            <div class="hero-stat-value">{{ pasienRanapTotal }}</div>
                            <div class="hero-stat-label">Pasien Rawat Inap</div>
                            <div class="mt-3">
                                <div class="sub-label">BOR</div>
                                <div class="sub-value">{{ bor }}%</div>
                            </div>
                        </div>
                    </div>

                    <!-- Kunjungan per Bulan Chart -->
                    <div class="col-lg-4 col-md-8 mb-4 mb-lg-0">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="chart-title">Kunjungan per Bulan</span>
                            <select class="hero-select" v-model="selectedYear">
                                <option value="2024" style="color:#333;">2024</option>
                                <option value="2025" style="color:#333;">2025</option>
                            </select>
                        </div>
                        <div style="height: 145px; position: relative;">
                            <canvas ref="visitChart" style="width:100%; height:100%;"></canvas>
                        </div>
                    </div>

                    <!-- BOR Donut -->
                    <div class="col-lg-3 col-md-4">
                        <div class="d-flex justify-content-between align-items-center mb-2" style="flex-wrap:wrap;">
                            <span class="chart-title">Status Tempat Tidur</span>
                            <select class="hero-select mt-1" v-model="selectedYearTT">
                                <option value="2024" style="color:#333;">2024</option>
                                <option value="2025" style="color:#333;">2025</option>
                            </select>
                        </div>
                        <div class="text-center">
                            <div class="position-relative d-inline-block">
                                <svg width="110" height="110">
                                    <circle cx="55" cy="55" r="44" fill="none"
                                        stroke="rgba(255,255,255,0.15)" stroke-width="9"/>
                                    <circle cx="55" cy="55" r="44" fill="none"
                                        stroke="#4ECDC4" stroke-width="9"
                                        stroke-dasharray="216 276"
                                        stroke-dashoffset="69"
                                        transform="rotate(-90 55 55)"
                                        stroke-linecap="round"/>
                                </svg>
                                <div class="donut-center-label">
                                    {{ bor }}%<br><small>BOR</small>
                                </div>
                            </div>
                            <div class="donut-legend mt-2 d-inline-block text-left">
                                <div class="d-flex align-items-center mb-1">
                                    <span class="legend-dot" style="background:#4ECDC4;"></span>
                                    <span class="legend-text">{{ bor }}% Terisi ({{ pasienRanapTotal }} TT)</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="legend-dot" style="background:rgba(255,255,255,0.25);"></span>
                                    <span class="legend-text">{{ 100 - bor }}% Tersedia ({{ ttTersedia }} TT)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ===== KPI Info Cards (overlapping banner) ===== -->
            <div class="px-3 mt-n4">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                        <div class="info-card info-card-blue">
                            <div class="info-card-icon">
                                <i class="fas fa-user-clock"></i>
                            </div>
                            <div class="info-card-body">
                                <div class="info-card-title">Antrian Aktif</div>
                                <div class="info-card-value">34</div>
                                <div class="info-card-sub">Menunggu dipanggil</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                        <div class="info-card info-card-green">
                            <div class="info-card-icon">
                                <i class="fas fa-procedures"></i>
                            </div>
                            <div class="info-card-body">
                                <div class="info-card-title">Pasien Masuk Hari Ini</div>
                                <div class="info-card-value">28</div>
                                <div class="info-card-sub">Rawat Inap Baru</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                        <div class="info-card info-card-amber">
                            <div class="info-card-icon">
                                <i class="fas fa-sign-out-alt"></i>
                            </div>
                            <div class="info-card-body">
                                <div class="info-card-title">Pasien Keluar Hari Ini</div>
                                <div class="info-card-value">19</div>
                                <div class="info-card-sub">Sembuh / Dirujuk</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
                        <div class="info-card info-card-rose">
                            <div class="info-card-icon">
                                <i class="fas fa-bed"></i>
                            </div>
                            <div class="info-card-body">
                                <div class="info-card-title">Tempat Tidur Tersedia</div>
                                <div class="info-card-value">{{ ttTersedia }}</div>
                                <div class="info-card-sub">dari {{ ttTotal }} total TT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== Data Tables ===== -->
            <div class="row px-3 mt-1">

                <!-- Pasien Rawat Inap Terbaru -->
                <div class="col-lg-7 mb-4">
                    <div class="content-card">
                        <div class="content-card-header">
                            <h6 class="content-card-title">
                                <i class="fas fa-hospital-user mr-2" style="color:#3d7abf;"></i>
                                Pasien Rawat Inap Terbaru
                            </h6>
                            <a href="#" class="content-card-link">Lihat Semua &rarr;</a>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>NO. RM</th>
                                        <th>NAMA PASIEN</th>
                                        <th>RUANG</th>
                                        <th>DIAGNOSA</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="pasien in pasienRanap" :key="pasien.id">
                                        <td>
                                            <span class="rm-link" @click="viewPasien(pasien)">
                                                {{ pasien.noRM }}
                                            </span>
                                        </td>
                                        <td class="fw-medium">{{ pasien.nama }}</td>
                                        <td>{{ pasien.ruang }}</td>
                                        <td class="text-muted-sm">{{ pasien.diagnosa }}</td>
                                        <td>
                                            <span :class="['status-badge', 'badge-' + pasien.statusClass]">
                                                {{ pasien.status }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="content-card-footer">
                            <span class="footer-label">Total Pasien Rawat Inap</span>
                            <span class="footer-value">{{ pasienRanapTotal }} Pasien</span>
                        </div>
                    </div>
                </div>

                <!-- Antrian Poliklinik Hari Ini -->
                <div class="col-lg-5 mb-4">
                    <div class="content-card">
                        <div class="content-card-header">
                            <h6 class="content-card-title">
                                <i class="fas fa-list-ol mr-2" style="color:#3d7abf;"></i>
                                Antrian Poliklinik Hari Ini
                            </h6>
                            <a href="#" class="content-card-link">Lihat Semua &rarr;</a>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>POLIKLINIK</th>
                                        <th>DOKTER</th>
                                        <th>TOTAL</th>
                                        <th>SISA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="poli in antrianPoli" :key="poli.id">
                                        <td class="fw-medium">{{ poli.nama }}</td>
                                        <td class="text-muted-sm">{{ poli.dokter }}</td>
                                        <td>{{ poli.total }}</td>
                                        <td>
                                            <span :class="['status-badge', poli.sisa > 10 ? 'badge-warning' : 'badge-success']">
                                                {{ poli.sisa }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="content-card-footer">
                            <span class="footer-label">Total Antrian Rawat Jalan</span>
                            <span class="footer-value">{{ kunjunganRajal }} Pasien</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HomeDashboard',
    data() {
        return {
            selectedYear: '2025',
            selectedYearTT: '2025',
            kunjunganRajal: 182,
            kunjunganIGD: 66,
            pasienRanapTotal: 156,
            bor: 78,
            ttTotal: 200,
            ttTersedia: 44,
            pasienRanap: [
                { id: 1, noRM: '00-45-321', nama: 'Budi Santoso',   ruang: 'Mawar - 101',   diagnosa: 'Demam Berdarah',  status: 'Dirawat',   statusClass: 'primary' },
                { id: 2, noRM: '00-61-043', nama: 'Siti Rahayu',    ruang: 'Melati - 203',  diagnosa: 'Hipertensi',      status: 'Observasi', statusClass: 'warning' },
                { id: 3, noRM: '00-23-877', nama: 'Ahmad Fauzi',    ruang: 'Anggrek - 305', diagnosa: 'Appendiksitis',   status: 'Post-Op',   statusClass: 'info'    },
                { id: 4, noRM: '00-82-154', nama: 'Dewi Lestari',   ruang: 'Kenanga - 402', diagnosa: 'Pneumonia',       status: 'Dirawat',   statusClass: 'primary' },
                { id: 5, noRM: '00-19-680', nama: 'Rudi Hartono',   ruang: 'Mawar - 108',   diagnosa: 'DM Tipe 2',       status: 'Stabil',    statusClass: 'success' },
            ],
            antrianPoli: [
                { id: 1, nama: 'Poli Umum',           dokter: 'dr. Adi Nugroho',      total: 45, sisa: 18 },
                { id: 2, nama: 'Poli Anak',           dokter: 'dr. Sari Dewi, Sp.A',  total: 32, sisa: 12 },
                { id: 3, nama: 'Poli Penyakit Dalam', dokter: 'dr. Hendra, Sp.PD',    total: 28, sisa:  7 },
                { id: 4, nama: 'Poli Bedah',          dokter: 'dr. Wahyu, Sp.B',      total: 21, sisa:  5 },
                { id: 5, nama: 'Poli Kandungan',      dokter: 'dr. Rina, Sp.OG',      total: 19, sisa:  3 },
                { id: 6, nama: 'Poli Saraf',          dokter: 'dr. Bima, Sp.S',       total: 15, sisa:  8 },
            ],
        };
    },
    computed: {
        totalKunjungan() {
            return this.kunjunganRajal + this.kunjunganIGD;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initVisitChart();
        });
    },
    methods: {
        viewPasien(pasien) {
            console.log('View pasien:', pasien);
        },
        initVisitChart() {
            if (!this.$refs.visitChart) return;
            const canvas = this.$refs.visitChart;
            const ctx = canvas.getContext('2d');
            const data = [2840, 3120, 2950, 3380, 3210, 2980, 3540, 3720, 3390, 3150, 2890, 3650];
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const currentMonth = new Date().getMonth();

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const w = rect.width;
            const h = rect.height;
            const padL = 10, padR = 10, padT = 10, padB = 25;
            const chartW = w - padL - padR;
            const chartH = h - padT - padB;
            const barW = (chartW / data.length) * 0.55;
            const gap  = (chartW / data.length) * 0.225;
            const maxVal = Math.max(...data);

            ctx.clearRect(0, 0, w, h);

            data.forEach((val, i) => {
                const barH  = (val / maxVal) * chartH * 0.9;
                const x     = padL + i * (chartW / data.length) + gap;
                const y     = padT + chartH - barH;
                const isNow = i === currentMonth;

                ctx.fillStyle = isNow ? '#4ECDC4' : 'rgba(255,255,255,0.3)';
                const radius = 2;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + barW - radius, y);
                ctx.quadraticCurveTo(x + barW, y, x + barW, y + radius);
                ctx.lineTo(x + barW, y + barH);
                ctx.lineTo(x, y + barH);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();

                if (isNow) {
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.fillRect(x + barW / 2 - 22, y - 22, 44, 18);
                    ctx.fillStyle = 'white';
                    ctx.font = 'bold 10px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(val.toLocaleString(), x + barW / 2, y - 8);
                }

                ctx.fillStyle = 'rgba(255,255,255,0.65)';
                ctx.font = '9px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(labels[i], x + barW / 2, h - 5);
            });

            canvas.addEventListener('mousemove', (e) => {
                const r = canvas.getBoundingClientRect();
                const mx = (e.clientX - r.left) * dpr;
                const idx = Math.floor((mx - padL * dpr) / ((chartW * dpr) / data.length));
                canvas.style.cursor = (idx >= 0 && idx < data.length) ? 'pointer' : 'default';
                canvas.title = (idx >= 0 && idx < data.length)
                    ? `${labels[idx]}: ${data[idx].toLocaleString()} kunjungan` : '';
            });
        },
    },
};
</script>

<style scoped>
/* ===== Hero Banner ===== */
.hero-banner {
    background: linear-gradient(135deg, #1a3c6e 0%, #2d5a9b 55%, #3d7abf 100%);
    color: white;
}

.hero-stat-value {
    font-size: 3.4rem;
    font-weight: 300;
    line-height: 1;
    margin-bottom: 6px;
    letter-spacing: -1px;
}

.hero-stat-label {
    font-size: 15px;
    opacity: 0.9;
}

.hero-stat-sub-label {
    font-size: 10px;
    opacity: 0.55;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 8px;
}

.sub-label {
    font-size: 12px;
    opacity: 0.72;
    margin-bottom: 2px;
}

.sub-value {
    font-size: 20px;
    font-weight: 300;
}

.chart-title {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
}

.hero-select {
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: white;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}

/* ===== Donut ===== */
.donut-center-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 300;
    color: white;
    text-align: center;
    line-height: 1.3;
}

.donut-center-label small {
    font-size: 11px;
    opacity: 0.65;
    display: block;
}

.legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 7px;
    flex-shrink: 0;
}

.legend-text {
    font-size: 11px;
    opacity: 0.8;
}

/* ===== KPI Info Cards ===== */
.info-card {
    background: white;
    border-radius: 12px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.09);
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.info-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.13);
}

.info-card-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    flex-shrink: 0;
}

.info-card-blue  .info-card-icon { background: linear-gradient(135deg, #4776e6, #8e54e9); }
.info-card-green .info-card-icon { background: linear-gradient(135deg, #11998e, #38ef7d); }
.info-card-amber .info-card-icon { background: linear-gradient(135deg, #f7971e, #ffd200); }
.info-card-rose  .info-card-icon { background: linear-gradient(135deg, #f953c6, #b91d73); }

.info-card-title {
    font-size: 11px;
    color: #9aa5b4;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 4px;
}

.info-card-value {
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    line-height: 1;
    margin-bottom: 3px;
}

.info-card-sub {
    font-size: 11px;
    color: #b0b8c4;
}

/* ===== Content Cards ===== */
.content-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.content-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 22px 14px;
    border-bottom: 1px solid #f0f4f8;
}

.content-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
}

.content-card-link {
    font-size: 12px;
    color: #3d7abf;
    text-decoration: none;
    font-weight: 500;
}

.content-card-link:hover {
    color: #1a3c6e;
    text-decoration: none;
}

/* ===== Data Table ===== */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0;
}

.data-table thead th {
    background: #f8fafc;
    color: #9aa5b4;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 11px 18px;
    border: none;
    border-bottom: 2px solid #edf2f7;
    white-space: nowrap;
}

.data-table tbody td {
    padding: 13px 18px;
    font-size: 13px;
    color: #4a5568;
    border: none;
    border-bottom: 1px solid #f7fafc;
    vertical-align: middle;
}

.data-table tbody tr:last-child td {
    border-bottom: none;
}

.data-table tbody tr:hover td {
    background-color: #f8fafd;
}

.rm-link {
    color: #3d7abf;
    font-weight: 500;
    cursor: pointer;
    font-family: monospace;
    font-size: 12px;
}

.rm-link:hover {
    color: #1a3c6e;
    text-decoration: underline;
}

.fw-medium {
    font-weight: 500;
    color: #2d3748;
}

.text-muted-sm {
    color: #9aa5b4;
    font-size: 12px;
}

/* ===== Status Badges ===== */
.status-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
}

.badge-primary { background: #ebf4ff; color: #3d7abf; }
.badge-success { background: #f0fff4; color: #38a169; }
.badge-warning { background: #fffaf0; color: #c17c00; }
.badge-danger  { background: #fff5f5; color: #e53e3e; }
.badge-info    { background: #ebf8ff; color: #2b6cb0; }

/* ===== Card Footer ===== */
.content-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 22px;
    background: #fafbfc;
    border-top: 2px solid #edf2f7;
}

.footer-label {
    font-size: 13px;
    color: #718096;
    font-weight: 500;
}

.footer-value {
    font-size: 15px;
    font-weight: 700;
    color: #2d3748;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
    .hero-stat-value {
        font-size: 2.6rem;
    }

    .info-card {
        padding: 14px 16px;
    }

    .info-card-value {
        font-size: 24px;
    }
}
</style>
