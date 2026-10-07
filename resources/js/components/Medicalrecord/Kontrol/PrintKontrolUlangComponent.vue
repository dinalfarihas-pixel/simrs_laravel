<template>
    <section class="content">
        <div class="print-page">

            <!-- ===== HEADER ===== -->
            <div class="pk-header">
                <div class="pk-header-logo">
                    <img src="https://ws-simrs.net/logo/bpjs.jpg" alt="BPJS Kesehatan" class="pk-bpjs-logo" />

                </div>
                <div class="pk-header-title">
                    <div class="pk-title">SURAT RENCANA KONTROL</div>
                    <div class="pk-rs-name">{{ data_rs.nama_rs || 'RSUD' }}</div>
                </div>
                <div class="pk-header-no">
                    No : <strong>{{ kontrol.NO_KONTROL_ULANG || '-' }}</strong>
                </div>
            </div>

            <div class="pk-divider"></div>

            <!-- ===== BODY ===== -->
            <div class="pk-body">

                <table class="pk-info-table">
                    <tbody>
                        <tr>
                            <td class="pk-lbl">Kepada Yth</td>
                            <td class="pk-val"><strong>{{ kontrol.NAMADOKTER || '-' }}</strong></td>
                        </tr>
                        <tr>
                            <td class="pk-lbl">Spesialis/Sub Sp</td>
                            <td class="pk-val">{{ kontrol.POLI || '-' }}</td>
                        </tr>
                    </tbody>
                </table>

                <p class="pk-salam">Mohon Pemeriksaan dan Penanganan Lebih Lanjut :</p>

                <table class="pk-info-table">
                    <tbody>
                        <tr>
                            <td class="pk-lbl">No Kartu</td>
                            <td class="pk-val">: {{ dataPasien.NOJAMINAN || '-' }}</td>
                            <td style="width:80px"></td>
                            <td class="pk-lbl" style="width:80px">NO RM :</td>
                            <td class="pk-val">{{ dataPasien.NOMR || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="pk-lbl">Nama Peserta</td>
                            <td class="pk-val">: {{ dataPasien.NAMAPASIEN || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="pk-lbl">Tgl Lahir</td>
                            <td class="pk-val">: {{ dataPasien.TGLLAHIR || '-' }}</td>
                        </tr>
                        <tr>
                            <td class="pk-lbl">Diagnosa</td>
                            <td class="pk-val" colspan="4">
                                : {{ kontrol.KODE_DIAGNOSA || dataPasien.DIAGNOSA_AWAL || '-' }}
                                <span v-if="dataPasien.DX_CAPTION"> - {{ dataPasien.DX_CAPTION }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="pk-lbl">Tanggal Kontrol</td>
                            <td class="pk-val">: {{ kontrol.TANGGAL_KONTROL || '-' }}</td>
                        </tr>
                    </tbody>
                </table>

                <p class="pk-salam pk-terimakasih">Demikian atas bantuannya, diucapkan banyak terma kasih.</p>

            </div>

            <!-- ===== FOOTER ===== -->
            <div class="pk-footer">
                <div class="pk-footer-left">
                    <canvas ref="barcodeCanvas"></canvas>
                </div>
                <div class="pk-footer-right">
                    <div>Mengetahui DPJP,</div>
                </div>
            </div>

            <div class="pk-bottom">
                <div class="pk-bottom-left">
                    <span>Tanggal Entri : <strong>{{ kontrol.TLG_ENTRI || '-' }}</strong></span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span>Tanggal Cetak : <strong>{{ tanggalCetak }}</strong></span>
                </div>
                <div class="pk-bottom-right">
                    <strong>{{ dataPasien.NAMADOKTER || '-' }}</strong>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
    data() {
        return {
            dataPasien: {},
            kontrol: {},
            data_rs: {},
            tanggalCetak: '',
            param: {
                no_kontrol: '',
                noregister: '',
            },
        };
    },

    created() {
        const params = new URLSearchParams(window.location.search);
        this.param.no_kontrol  = params.get('no_kontrol')  || '';
        this.param.noregister  = params.get('noregister')  || '';

        const now = new Date();
        this.tanggalCetak = now.toLocaleDateString('id-ID', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', '.');

        this.fetchDataRs();
        if (this.param.noregister) {
            this.fetchDataPasien();
        }
    },

    methods: {
        async fetchDataRs() {
            try {
                const res = await axios.get('/data_rumahsakit');
                this.data_rs = res.data || {};
            } catch (e) { console.error(e); }
        },

        async fetchDataPasien() {
            try {
                const res = await axios.post('/datapasienpertransaksi', {
                    noregister: this.param.noregister,
                    mode: 'history8',
                });
                this.dataPasien = res.data?.response?.[0] || {};
                if (this.dataPasien.NOMR) {
                    await this.fetchKontrol(this.dataPasien.NOMR);
                }
            } catch (e) { console.error(e); }
        },

        async fetchKontrol(norm) {
            try {
                const res = await axios.get(`/get_riwayat_kontrolulang/${norm}`);
                const list = res.data?.response || [];
                this.kontrol = list.find(r => r.NO_KONTROL_ULANG === this.param.no_kontrol) || list[0] || {};
                this.$nextTick(() => this.renderBarcode());
            } catch (e) { console.error(e); }
        },

        renderBarcode() {
            const no = this.kontrol.NO_KONTROL_ULANG;
            if (!no || !this.$refs.barcodeCanvas) return;
            try {
                JsBarcode(this.$refs.barcodeCanvas, no, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: false,
                    margin: 0,
                });
                setTimeout(() => window.print(), 800);
            } catch (e) { console.error(e); }
        },
    },
};
</script>

<style>
* { box-sizing: border-box; }
body { background: #fff; margin: 0; padding: 0; font-family: Arial, sans-serif; color: #000; }

.print-page {
    width: 210mm;
    min-height: 140mm;
    margin: 0 auto;
    padding: 18mm 20mm 14mm;
    font-size: 12px;
    background: #fff;
}

/* ===== HEADER ===== */
.pk-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}
.pk-header-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 160px;
}
.pk-bpjs-logo {
    height: 48px;
    width: auto;
}
.pk-bpjs-text {
    font-size: 13px;
    line-height: 1.3;
    color: #008000;
}
.pk-header-title {
    text-align: center;
    flex: 1;
}
.pk-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
}
.pk-rs-name {
    font-size: 13px;
    margin-top: 2px;
}
.pk-header-no {
    min-width: 160px;
    text-align: right;
    font-size: 12px;
}

.pk-divider {
    border-top: 1.5px solid #000;
    margin-bottom: 14px;
}

/* ===== BODY ===== */
.pk-body { margin-bottom: 12px; }

.pk-info-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 8px;
}
.pk-info-table tr td {
    padding: 2px 0;
    vertical-align: top;
}
.pk-lbl {
    width: 130px;
    color: #000;
    white-space: nowrap;
}
.pk-val { color: #000; }

.pk-salam {
    margin: 10px 0 8px;
    font-size: 12px;
}
.pk-terimakasih { margin-top: 14px; }

/* ===== FOOTER ===== */
.pk-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 4px;
}
.pk-footer-left canvas {
    display: block;
    max-width: 260px;
}
.pk-footer-right {
    text-align: right;
    font-size: 12px;
    padding-bottom: 4px;
}

/* ===== BOTTOM ===== */
.pk-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 11px;
    border-top: 1px solid #ccc;
    padding-top: 6px;
    margin-top: 6px;
}
.pk-bottom-right {
    text-align: right;
    font-size: 12px;
    font-weight: 700;
}

/* ===== PRINT ===== */
@media print {
    body { margin: 0; padding: 0; }
    .print-page { padding: 10mm 14mm; width: 100%; }
    .no-print { display: none !important; }
}
</style>
