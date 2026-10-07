<template>
    <section class="content">
        <div class="print-page">

            <!-- ===== HEADER ===== -->
            <div class="pl-header">
                <div class="pl-header-logo">
                    <img :src="data_rs.logo || '/images/bpjs-logo.png'" alt="Logo RS" class="pl-rs-logo" />
                </div>
                <div class="pl-header-title">
                    <div class="pl-rs-name">{{ data_rs.nama_rs || 'RUMAH SAKIT' }}</div>
                    <div class="pl-title">HASIL PEMERIKSAAN LABORATORIUM</div>
                    <div class="pl-rs-alamat">{{ data_rs.alamat || '' }}</div>
                </div>
                <div class="pl-header-no">
                    <div>No. Receipt</div>
                    <strong>{{ pasien.RECEIPT_NO || receiptNo }}</strong>
                </div>
            </div>

            <div class="pl-divider-double"></div>

            <!-- ===== INFO PASIEN ===== -->
            <div class="pl-info-box">
                <table class="pl-info-table">
                    <tbody>
                        <tr>
                            <td class="pl-lbl">Nama Pasien</td>
                            <td>: <strong>{{ pasien.NAMA || '-' }}</strong></td>
                            <td class="pl-lbl pl-lbl-mid">No. RM</td>
                            <td>: <strong>{{ pasien.NOMR || dataPasien.NOMR || '-' }}</strong></td>
                        </tr>
                        <tr>
                            <td class="pl-lbl">Jenis Kelamin / Usia</td>
                            <td>: {{ pasien.JENISKELAMIN || '-' }} / {{ pasien.USIA || '-' }}</td>
                            <td class="pl-lbl pl-lbl-mid">Tgl Lahir</td>
                            <td>: {{ dataPasien.TGLLAHIR || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="pl-lbl">Dokter DPJP</td>
                            <td>: {{ pasien.DPJP || dataPasien.NAMADOKTER || '-' }}</td>
                            <td class="pl-lbl pl-lbl-mid">Ruang / Poli</td>
                            <td>: {{ dataPasien.POLI || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="pl-lbl">Tgl Order</td>
                            <td>: {{ pasien.TANGGAL || '-' }}</td>
                            <td class="pl-lbl pl-lbl-mid">Cara Bayar</td>
                            <td>: {{ dataPasien.CARABAYAR || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pl-divider"></div>

            <!-- ===== HASIL PEMERIKSAAN ===== -->
            <div v-if="isLoading" class="pl-loading">Memuat data...</div>

            <div v-for="(items, namaGrup) in groupedByNama" :key="namaGrup" class="pl-grup">
                <div class="pl-grup-header">{{ namaGrup }}</div>
                <table class="pl-hasil-table">
                    <thead>
                        <tr>
                            <th style="width:28px">#</th>
                            <th>Pemeriksaan</th>
                            <th style="width:100px">Hasil</th>
                            <th style="width:120px">Nilai Normal</th>
                            <th style="width:70px">Satuan</th>
                            <th style="width:90px">Ket</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in items" :key="idx"
                            :class="{ 'pl-abnormal': item.HASIL_TIDAK_NORMAL == 1 }">
                            <td class="pl-td-center">{{ idx + 1 }}</td>
                            <td>{{ item.PEMERIKSAAN }}</td>
                            <td class="pl-td-center">
                                <strong :style="item.HASIL_TIDAK_NORMAL == 1 ? 'color:#c0392b' : ''">
                                    {{ item.HASIL }}
                                </strong>
                            </td>
                            <td class="pl-td-center">{{ item.NORMAL }}</td>
                            <td class="pl-td-center">{{ item.SATUAN }}</td>
                            <td class="pl-td-center">{{ item.KET_HASIL }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="!isLoading && Object.keys(groupedByNama).length === 0" class="pl-empty">
                Tidak ada data hasil pemeriksaan.
            </div>

            <!-- ===== KETERANGAN ABNORMAL ===== -->
            <div v-if="adaAbnormal" class="pl-keterangan-abnormal">
                <span style="color:#c0392b;font-weight:700">*</span>
                Nilai yang dicetak merah menunjukkan hasil di luar batas normal.
            </div>

            <!-- ===== FOOTER TANDA TANGAN ===== -->
            <div class="pl-footer">
                <div class="pl-footer-right">
                    <div class="pl-footer-label">
                        Otorisasi :
                        <strong v-if="pasien.IS_VERIFIED == 1" style="color:#27ae60">Sudah diverifikasi</strong>
                        <strong v-else style="color:#e67e22">Belum diverifikasi</strong>
                    </div>
                    <div class="pl-footer-qr">
                        <qrcode-vue
                            v-if="pasien.IS_VERIFIED == 1 && pasien.PETUGAS_OTENTIKASI"
                            :value="pasien.PETUGAS_OTENTIKASI + ' | ' + receiptNo"
                            :size="72"
                            level="H" />
                        <div v-else class="pl-footer-space"></div>
                    </div>
                    <div class="pl-footer-name">{{ pasien.PETUGAS_OTENTIKASI || '(....................................)' }}</div>
                    <div class="pl-footer-sub">Analis / Petugas Lab</div>
                </div>
            </div>

            <!-- ===== BOTTOM ===== -->
            <div class="pl-bottom">
                <span>Dicetak oleh : <strong>{{ namaUser }}</strong></span>
                <span>Tanggal Cetak : <strong>{{ tanggalCetak }}</strong></span>
            </div>

        </div>
    </section>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
    components: { QrcodeVue },
    data() {
        return {
            pasien: {},
            dataPasien: {},
            data_rs: {},
            hasilLab: [],
            namaUser: '',
            tanggalCetak: '',
            isLoading: false,
            receiptNo: '',
            noregister: '',
        };
    },

    computed: {
        groupedByNama() {
            return this.hasilLab.reduce((acc, item) => {
                const key = item.NAMA || 'Lainnya';
                if (!acc[key]) acc[key] = [];
                acc[key].push(item);
                return acc;
            }, {});
        },
        adaAbnormal() {
            return this.hasilLab.some(i => i.HASIL_TIDAK_NORMAL == 1);
        },
    },

    created() {
        const params   = new URLSearchParams(window.location.search);
        this.receiptNo = params.get('receipt_no') || '';
        this.noregister = params.get('noregister') || '';

        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        this.tanggalCetak =
            `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ` +
            `${pad(now.getHours())}.${pad(now.getMinutes())}`;

        this.fetchDataRs();
        this.fetchNamaUser();
        if (this.receiptNo) this.fetchHasilLab();
        if (this.noregister) this.fetchDataPasien();
    },

    methods: {
        async fetchDataRs() {
            try {
                const res = await axios.get('/data_rumahsakit');
                this.data_rs = res.data || {};
            } catch (e) { console.error(e); }
        },

        async fetchNamaUser() {
            try {
                const res = await axios.get('/getusername');
                this.namaUser = res.data || '';
            } catch (e) { console.error(e); }
        },

        async fetchDataPasien() {
            try {
                const res = await axios.post('/datapasienpertransaksi', {
                    noregister: this.noregister,
                    mode: 'history8',
                });
                this.dataPasien = res.data?.response?.[0] || {};
            } catch (e) { console.error(e); }
        },

        async fetchHasilLab() {
            this.isLoading = true;
            try {
                const res = await axios.post('/getdatahasil_lab', { receipt: this.receiptNo });
                this.hasilLab = res.data?.response || [];
                this.pasien   = res.data?.pasien   || {};
            } catch (e) {
                console.error(e);
            } finally {
                this.isLoading = false;
                this.$nextTick(() => setTimeout(() => window.print(), 600));
            }
        },
    },
};
</script>

<style>
* { box-sizing: border-box; }
body { background: #fff; margin: 0; padding: 0; font-family: Arial, sans-serif; color: #000; font-size: 12px; }

.print-page {
    width: 210mm;
    margin: 0 auto;
    padding: 14mm 18mm 12mm;
    background: #fff;
}

/* ===== HEADER ===== */
.pl-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
}
.pl-rs-logo {
    height: 60px;
    width: auto;
}
.pl-header-title {
    flex: 1;
    text-align: center;
}
.pl-rs-name {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.4px;
}
.pl-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-top: 2px;
}
.pl-rs-alamat {
    font-size: 10px;
    color: #555;
    margin-top: 2px;
}
.pl-header-no {
    min-width: 130px;
    text-align: right;
    font-size: 11px;
    line-height: 1.5;
}

.pl-divider-double {
    border-top: 3px double #000;
    margin: 6px 0;
}
.pl-divider {
    border-top: 1px solid #aaa;
    margin: 8px 0;
}

/* ===== INFO PASIEN ===== */
.pl-info-box { margin-bottom: 4px; }
.pl-info-table {
    width: 100%;
    border-collapse: collapse;
}
.pl-info-table td { padding: 1.5px 0; vertical-align: top; }
.pl-lbl { width: 140px; color: #444; white-space: nowrap; }
.pl-lbl-mid { width: 100px; padding-left: 16px; }

/* ===== HASIL ===== */
.pl-grup { margin-bottom: 10px; }
.pl-grup-header {
    background: #2c3e50;
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    padding: 4px 10px;
    letter-spacing: 0.5px;
}
.pl-hasil-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
}
.pl-hasil-table thead tr {
    background: #ecf0f1;
}
.pl-hasil-table th {
    padding: 4px 6px;
    border: 1px solid #bdc3c7;
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}
.pl-hasil-table td {
    padding: 3px 6px;
    border: 1px solid #dfe6e9;
    vertical-align: middle;
}
.pl-hasil-table tbody tr:nth-child(even) { background: #f8f9fa; }
.pl-abnormal { background: #fff5f5 !important; }
.pl-td-center { text-align: center; }

/* ===== KETERANGAN ABNORMAL ===== */
.pl-keterangan-abnormal {
    font-size: 10px;
    color: #555;
    margin: 6px 0 10px;
    font-style: italic;
}

/* ===== FOOTER ===== */
.pl-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 8px;
}
.pl-footer-left, .pl-footer-right {
    width: 45%;
    text-align: center;
}
.pl-footer-right { text-align: center; }
.pl-footer-label { font-size: 11px; margin-bottom: 2px; }
.pl-footer-qr { display: flex; justify-content: center; align-items: center; min-height: 76px; margin: 4px 0; }
.pl-footer-space { height: 72px; }
.pl-footer-name { font-weight: 700; font-size: 12px; border-top: 1px solid #000; padding-top: 4px; display: inline-block; min-width: 160px; }
.pl-footer-sub { font-size: 10px; color: #555; margin-top: 2px; }

/* ===== BOTTOM ===== */
.pl-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #666;
    border-top: 1px solid #ccc;
    padding-top: 5px;
    margin-top: 10px;
}

.pl-loading, .pl-empty {
    text-align: center;
    padding: 20px;
    color: #888;
    font-style: italic;
}

/* ===== PRINT ===== */
@media print {
    body { margin: 0; padding: 0; }
    .print-page { width: 100%; padding: 8mm 12mm; }
    .pl-abnormal { background: #fff5f5 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .pl-grup-header { background: #2c3e50 !important; color: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
