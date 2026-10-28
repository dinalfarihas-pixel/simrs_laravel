<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" header="Administrasi / Billing Pasien"
        :modal="true" :style="{ width: '70vw' }" :breakpoints="{ '991px': '95vw' }" @show="muat">
        <ConfirmDialog group="adm" :style="{ width: '26rem', maxWidth: '94vw' }" />

        <div v-if="pasien" class="adm-info">
            <div><span class="adm-lbl">Pasien</span><strong>{{ pasien.NAMAPASIEN }}</strong></div>
            <div><span class="adm-lbl">No. RM</span>{{ pasien.NOMR }}</div>
            <div><span class="adm-lbl">No. Registrasi</span>{{ pasien.NOPENDAFTARAN }}</div>
            <div><span class="adm-lbl">Ruang / Poli</span>{{ pasien.POLI || '-' }}</div>
            <div><span class="adm-lbl">DPJP</span>{{ pasien.NAMADOKTER || '-' }}</div>
        </div>

        <!-- Input jasa (hanya jasa/tindakan) -->
        <div class="adm-form">
            <div class="adm-form-title"><i class="pi pi-plus-circle"></i> Tambah Jasa / Tindakan</div>
            <div class="adm-form-row">
                <div class="adm-field adm-field-jasa">
                    <label>Jasa / Tindakan <span class="text-danger">*</span></label>
                    <Select v-model="jasaDipilih" :options="jasaOptions" optionLabel="NAMA" filter
                        :loading="loadingJasa" placeholder="Pilih jasa/tindakan..." class="w-100">
                        <template #option="{ option }">
                            <div class="adm-opsi">
                                <span>{{ option.NAMA }}</span>
                                <span>{{ rupiah(option.HARGAJUAL) }}</span>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="adm-field adm-field-qty">
                    <label>Qty</label>
                    <InputNumber v-model="qty" :min="1" showButtons inputClass="w-100" class="w-100" />
                </div>
                <div class="adm-field adm-field-sub">
                    <label>Subtotal</label>
                    <div class="adm-subtotal">{{ rupiah(subtotal) }}</div>
                </div>
                <div class="adm-field adm-field-btn">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary adm-btn-tambah" :disabled="saving || !jasaDipilih" @click="simpan">
                        <i :class="saving ? 'pi pi-spin pi-spinner' : 'pi pi-check'"></i> Tambahkan
                    </button>
                </div>
            </div>
            <div v-if="jasaError" class="adm-hint text-danger">
                {{ jasaError }} <a href="#" @click.prevent="muatJasa(true)">Coba lagi</a>
            </div>
            <div v-else class="adm-hint">
                {{ jasaOptions.length }} jasa<template v-if="jasaDiperbarui"> · diperbarui {{ jasaDiperbarui }}</template>
                <a href="#" @click.prevent="muatJasa(true)">
                    <i :class="loadingJasa ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'"></i> Muat ulang daftar jasa
                </a>
            </div>
        </div>

        <!-- Rincian billing -->
        <div class="adm-bill-head">
            <div class="adm-bill-title"><i class="pi pi-receipt"></i> Rincian Tagihan</div>
            <button class="adm-refresh" title="Muat ulang tagihan" :disabled="loading" @click="muatBilling">
                <i :class="loading ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'"></i> Muat ulang
            </button>
        </div>
        <div v-if="loading && !billing" class="adm-empty"><i class="pi pi-spin pi-spinner"></i> Memuat tagihan...</div>
        <div v-else-if="errorMsg" class="adm-empty adm-error">
            <i class="pi pi-exclamation-triangle"></i> {{ errorMsg }}
            <div><button class="btn btn-sm btn-outline-primary mt-2" @click="muatBilling">Coba lagi</button></div>
        </div>
        <div v-else-if="!adaTagihan" class="adm-empty">Belum ada item tagihan untuk kunjungan ini.</div>
        <template v-else>
            <div class="adm-table-wrap" :class="{ 'adm-memuat': loading }">
                <table class="adm-table">
                    <thead>
                        <tr>
                            <th>Item / Layanan</th>
                            <th class="r">Harga</th>
                            <th class="c">Qty</th>
                            <th>Satuan</th>
                            <th class="r">Subtotal</th>
                            <th>Tanggal</th>
                            <th class="c">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(items, kategori) in groupedByCategory" :key="kategori">
                            <tr class="adm-kat"><td colspan="7">{{ kategori }}</td></tr>
                            <tr v-for="(item, idx) in items" :key="kategori + idx"
                                :data-adm-key="kategori + '|' + idx"
                                :class="{ 'adm-row-baru': sorotKey === kategori + '|' + idx }">
                                <td>{{ item.ITEM }}</td>
                                <td class="r">{{ rupiah(item.HARGA) }}</td>
                                <td class="c">{{ item.QTY }}</td>
                                <td>{{ item.SATUAN }}</td>
                                <td class="r"><strong>{{ rupiah(item.TOTALAMOUNT) }}</strong></td>
                                <td>{{ item.TANGGAL }}</td>
                                <td class="c">
                                    <button v-if="item.BISA_HAPUS" class="adm-del" title="Hapus item ini dari tagihan"
                                        :disabled="hapusId !== null" @click="konfirmasiHapus(item)">
                                        <i :class="hapusId === (item.RECEIPT_NO || item.NO_RECEIPT) ? 'pi pi-spin pi-spinner' : 'pi pi-trash'"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr class="adm-sub">
                                <td colspan="4">Subtotal {{ kategori }}</td>
                                <td class="r">{{ rupiah(items.reduce((s, i) => s + (Number(i.TOTALAMOUNT) || 0), 0)) }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="adm-total"><span>Total Tagihan</span><span>{{ rupiah(totalTagihan) }}</span></div>
        </template>
    </Dialog>
</template>

<script>
    import axios from 'axios';
    import { EventBus } from '../bus';
    import Dialog from 'primevue/dialog';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Select from 'primevue/select';
    import InputNumber from 'primevue/inputnumber';

    // Sama dengan TTL_JASA di AdministrasiBillingController (3 jam).
    const TTL_JASA_MS = 3 * 60 * 60 * 1000;

    export default {
        name: 'AdministrasiBillingDialog',
        components: { Dialog, ConfirmDialog, Select, InputNumber },
        props: {
            visible: { type: Boolean, default: false },
            pasien: { type: Object, default: null }
        },
        emits: ['update:visible'],
        data() {
            return {
                billing: null,
                loading: false,
                errorMsg: '',
                jasaOptions: [],
                loadingJasa: false,
                jasaError: '',
                jasaDiperbarui: '',
                jasaDimuatPada: 0,
                jasaDipilih: null,
                qty: 1,
                saving: false,
                hapusId: null,
                sorotKey: null,
                sorotTimer: null
            };
        },
        beforeUnmount() {
            clearTimeout(this.sorotTimer);
        },
        computed: {
            groupedByCategory() {
                const detail = this.billing && this.billing.DETAIL;
                if (!Array.isArray(detail)) return {};
                return detail.reduce((g, item) => {
                    const kat = item.KATEGORI || 'Lainnya';
                    (g[kat] = g[kat] || []).push(item);
                    return g;
                }, {});
            },
            adaTagihan() {
                return Object.keys(this.groupedByCategory).length > 0;
            },
            totalTagihan() {
                return ((this.billing && this.billing.DETAIL) || [])
                    .reduce((s, i) => s + (Number(i.TOTALAMOUNT) || 0), 0);
            },
            subtotal() {
                return (Number(this.jasaDipilih && this.jasaDipilih.HARGAJUAL) || 0) * (Number(this.qty) || 0);
            }
        },
        methods: {
            rupiah(v) {
                return 'Rp ' + (Number(v) || 0).toLocaleString('id-ID');
            },
            // Notifikasi lewat TheGlobalAlert (type: success | info | warning | error).
            notif(type, message) {
                EventBus.$emit('show-alert', { type, title: '', message });
            },
            // Pesan galat yang mudah dipahami petugas (pesan dari server sudah diterjemahkan di backend).
            pesanError(e) {
                if (e && e.response) {
                    const msg = e.response.data && e.response.data.message;
                    if (e.response.status === 419) return 'Sesi login berakhir. Muat ulang halaman lalu login kembali.';
                    if (e.response.status === 401 || e.response.status === 403) return 'Anda tidak memiliki akses untuk aksi ini.';
                    if (e.response.status >= 500) return 'Server sedang bermasalah. Coba lagi beberapa saat lagi.';
                    return msg || 'Permintaan gagal diproses.';
                }
                return 'Tidak dapat terhubung ke server. Periksa koneksi, lalu coba lagi.';
            },
            async muat() {
                this.jasaDipilih = null;
                this.qty = 1;
                this.sorotKey = null;
                // Daftar di memori halaman ikut masa berlaku cache server (3 jam).
                if (Date.now() - this.jasaDimuatPada > TTL_JASA_MS) this.jasaOptions = [];
                await Promise.all([this.muatBilling(), this.muatJasa()]);
            },
            async muatBilling() {
                if (!this.pasien) return;
                this.loading = true;
                this.errorMsg = '';
                try {
                    const res = await axios.post('/administrasi_billing_kunjungan', {
                        norm: this.pasien.NOMR,
                        noregister: this.pasien.NOPENDAFTARAN
                    });
                    if (res.data && res.data.metadata && res.data.metadata.code != 200) {
                        this.billing = null;
                        this.errorMsg = res.data.metadata.message;
                    } else {
                        const rows = Array.isArray(res.data) ? res.data : [];
                        this.billing = rows[0] || null;
                    }
                } catch (e) {
                    this.billing = null;
                    this.errorMsg = this.pesanError(e);
                } finally {
                    this.loading = false;
                }
            },
            // '2026-10-14 15:57:04' -> '15:57' (hari ini) atau '14/10 15:57' (hari lain)
            formatWaktu(v) {
                if (!v) return '';
                const [tgl, jam] = String(v).split(' ');
                const hhmm = (jam || '').slice(0, 5);
                const d = new Date();
                const p = n => String(n).padStart(2, '0');
                const hariIni = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
                return tgl === hariIni ? hhmm : tgl.slice(8, 10) + '/' + tgl.slice(5, 7) + ' ' + hhmm;
            },
            // paksa = true: buang cache server dan ambil daftar terbaru (mis. ada jasa/harga baru di master).
            async muatJasa(paksa = false) {
                if (this.loadingJasa || (this.jasaOptions.length && paksa !== true)) return;
                this.loadingJasa = true;
                this.jasaError = '';
                try {
                    const res = await axios.post('/administrasi_daftar_jasa', { refresh: paksa === true ? 1 : 0 });
                    if (res.data.metadata.code == 200) {
                        this.jasaOptions = res.data.response;
                        this.jasaDimuatPada = Date.now();
                        this.jasaDiperbarui = this.formatWaktu(res.data.diperbarui);
                        // Pilihan lama bisa sudah berubah/dihapus di master: samakan dengan data baru.
                        if (this.jasaDipilih) {
                            this.jasaDipilih = this.jasaOptions.find(j => j.BARCODE === this.jasaDipilih.BARCODE) || null;
                        }
                    } else {
                        this.jasaError = res.data.metadata.message;
                    }
                } catch (e) {
                    this.jasaError = this.pesanError(e);
                } finally {
                    this.loadingJasa = false;
                }
            },
            // Berapa kali jasa ini sudah ada di tagihan (pencocokan nama).
            jumlahSudahAda(nama) {
                const target = String(nama || '').trim().toLowerCase();
                return ((this.billing && this.billing.DETAIL) || [])
                    .filter(d => String(d.ITEM || '').trim().toLowerCase() === target).length;
            },
            konfirmasiHapus(item) {
                this.$confirm.require({
                    group: 'adm',
                    header: 'Hapus Item Tagihan',
                    message: `Hapus "${item.ITEM}" (${this.rupiah(item.TOTALAMOUNT)}) dari tagihan pasien?`,
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    acceptClass: 'p-button-danger',
                    rejectClass: 'p-button-secondary p-button-outlined',
                    accept: () => this.hapus(item)
                });
            },
            async hapus(item) {
                const receipt = item.RECEIPT_NO || item.NO_RECEIPT;

                this.hapusId = receipt;
                try {
                    const res = await axios.post('/administrasi_hapus_jasa', {
                        NOPENDAFTARAN: this.pasien.NOPENDAFTARAN,
                        NOMR: this.pasien.NOMR,
                        RECEIPT_NO: receipt
                    });
                    if (res.data && res.data.metadata && res.data.metadata.code == 200) {
                        this.notif('success', `${item.ITEM} dihapus dari tagihan`);
                        await this.muatBilling();
                    } else {
                        this.notif('error', (res.data && res.data.metadata && res.data.metadata.message) || 'Gagal menghapus item');
                    }
                } catch (e) {
                    this.notif('error', 'Gagal menghapus item: ' + this.pesanError(e));
                } finally {
                    this.hapusId = null;
                }
            },
            simpan() {
                if (this.saving) return;
                if (!this.jasaDipilih) return this.notif('warning', 'Pilih jasa/tindakan terlebih dahulu.');
                if (!this.qty || this.qty <= 0) return this.notif('warning', 'Qty harus lebih dari 0.');

                // Jasa yang sama sudah ada di tagihan: minta konfirmasi agar tidak tercatat dobel tak sengaja.
                const sudahAda = this.jumlahSudahAda(this.jasaDipilih.NAMA);
                if (sudahAda > 0) {
                    this.$confirm.require({
                        group: 'adm',
                        header: 'Jasa Sudah Ada',
                        message: `"${this.jasaDipilih.NAMA}" sudah tercatat ${sudahAda}x pada tagihan ini. Tetap tambahkan lagi?`,
                        icon: 'pi pi-question-circle',
                        acceptLabel: 'Ya, Tambahkan',
                        rejectLabel: 'Batal',
                        rejectClass: 'p-button-secondary p-button-outlined',
                        accept: () => this.kirimTambah()
                    });
                    return;
                }
                this.kirimTambah();
            },
            async kirimTambah() {
                if (this.saving) return;
                this.saving = true;
                const jasa = this.jasaDipilih;
                const qty = this.qty;
                try {
                    const res = await axios.post('/administrasi_tambah_jasa', {
                        NOPENDAFTARAN: this.pasien.NOPENDAFTARAN,
                        NOMR: this.pasien.NOMR,
                        NAMAPASIEN: this.pasien.NAMAPASIEN,
                        POLI: this.pasien.POLI,
                        NAMADOKTER: this.pasien.NAMADOKTER,
                        BARCODE: jasa.BARCODE,
                        HARGA_TAMPIL: jasa.HARGAJUAL,
                        QTY: qty
                    });
                    if (res.data && res.data.metadata && res.data.metadata.code == 200) {
                        this.notif('success', `${jasa.NAMA} x ${qty} ditambahkan`);
                        this.jasaDipilih = null;
                        this.qty = 1;
                        await this.muatBilling();
                        this.sorotJasaBaru(jasa.NAMA);
                    } else {
                        this.notif('error', (res.data && res.data.metadata && res.data.metadata.message) || 'Gagal menambah jasa');
                        // Jasa ditolak karena sudah diarsipkan/bukan jasa: daftar di layar sudah usang.
                        if (res.data && res.data.metadata && /bukan jasa|harga jasa berubah/i.test(res.data.metadata.message || '')) {
                            this.muatJasa(true);
                        }
                    }
                } catch (e) {
                    this.notif('error', 'Gagal menambah jasa: ' + this.pesanError(e));
                } finally {
                    this.saving = false;
                }
            },
            // Sorot baris jasa yang baru masuk (kemunculan terakhir dengan nama itu) dan gulir ke sana.
            sorotJasaBaru(nama) {
                const target = String(nama || '').trim().toLowerCase();
                let kunci = null;
                Object.keys(this.groupedByCategory).forEach(kat => {
                    this.groupedByCategory[kat].forEach((it, idx) => {
                        if (String(it.ITEM || '').trim().toLowerCase() === target) kunci = kat + '|' + idx;
                    });
                });
                if (!kunci) return;

                this.sorotKey = kunci;
                this.$nextTick(() => {
                    const el = document.querySelector('[data-adm-key="' + kunci + '"]');
                    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                });
                clearTimeout(this.sorotTimer);
                this.sorotTimer = setTimeout(() => { this.sorotKey = null; }, 4000);
            }
        }
    };
</script>

<style scoped>
    .adm-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px 16px;
        padding: 10px 14px; background: #f1f5f9; border-radius: 8px; margin-bottom: 14px; font-size: 14px; }
    .adm-lbl { display: block; font-size: 11px; text-transform: uppercase; color: #64748b; }
    .adm-form { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px; }
    .adm-form-title, .adm-bill-title { font-weight: 700; }
    .adm-form-title { margin-bottom: 10px; }
    .adm-bill-title { font-size: 15px; }
    .adm-bill-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .adm-refresh { border: 0; background: transparent; color: #0d6efd; font-size: 13px; cursor: pointer; }
    .adm-refresh:disabled { opacity: .6; cursor: default; }
    .adm-form-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
    /* Semua kontrol satu tinggi supaya sejajar dalam satu baris. */
    .adm-form-row :deep(.p-select),
    .adm-form-row :deep(.p-inputnumber),
    .adm-form-row :deep(.p-inputnumber-input) { height: 40px; }
    .adm-form-row :deep(.p-select-label) { display: flex; align-items: center; }
    .adm-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .adm-field-jasa { flex: 1 1 280px; }
    .adm-field-qty { width: 130px; }
    .adm-field-sub { width: 140px; }
    .adm-subtotal { height: 40px; display: flex; align-items: center; justify-content: flex-end; padding: 0 10px;
        background: #f8fafc; border-radius: 6px; font-weight: 700; }
    .adm-btn-tambah { height: 40px; white-space: nowrap; }
    .adm-hint { margin-top: 8px; font-size: 12px; color: #64748b; }
    .adm-hint a { margin-left: 8px; color: #0d6efd; text-decoration: none; }
    .adm-opsi { display: flex; justify-content: space-between; gap: 16px; width: 100%; }
    .adm-empty { text-align: center; padding: 20px 0; color: #64748b; }
    .adm-error { color: #dc2626; }
    /* Tabel punya scroll sendiri: form di atas dan total di bawah selalu terlihat. */
    .adm-table-wrap { max-height: 42vh; overflow: auto; border-bottom: 1px solid #e2e8f0; transition: opacity .15s; }
    .adm-memuat { opacity: .55; }
    .adm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .adm-table th { position: sticky; top: 0; z-index: 1; background: #fff; text-align: left; padding: 6px 8px;
        font-size: 11px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
    .adm-table td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; }
    .adm-table .r { text-align: right; }
    .adm-table .c { text-align: center; }
    .adm-row-baru td { animation: adm-sorot 4s ease-out; }
    @keyframes adm-sorot { 0%, 60% { background: #dcfce7; } 100% { background: transparent; } }
    .adm-del { width: 28px; height: 28px; border: 1px solid #fecaca; border-radius: 6px; background: #fff;
        color: #dc2626; cursor: pointer; }
    .adm-del:hover:not(:disabled) { background: #fef2f2; }
    .adm-del:disabled { opacity: .5; cursor: not-allowed; }
    .adm-kat td { background: #f1f5f9; font-weight: 700; font-size: 12px; text-transform: uppercase; color: #0d6efd; }
    .adm-sub td { font-style: italic; font-weight: 600; border-bottom: 2px solid #e2e8f0; }
    .adm-total { display: flex; justify-content: space-between; margin-top: 10px; padding: 10px 14px;
        background: #eff6ff; border-radius: 8px; font-weight: 700; font-size: 16px; }
</style>
