<template>
    <section>
        <ConfirmDialog group="pengkajianNyeri" />
        <!-- ===== DIALOG: FORM PENGKAJIAN ===== -->
        <Dialog v-model:visible="showForm" :header="formTitle" :modal="true" :style="{ width: '700px' }"
            :closable="!isSaving">
            <div class="mb-3 p-3" style="background:#f3e5f5;border-radius:8px;border-left:4px solid #7b1fa2">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
                    <div>
                        <div style="font-weight:700;color:#6a1b9a">
                            <i class="pi pi-heart mr-1"></i>Skala Pengkajian Nyeri
                        </div>
                        <small style="color:#555">
                            {{ formData.skala === 'NRS' ? 'NRS — pasien dapat melaporkan nyeri secara verbal' : 'FLACC — bayi / anak / pasien tidak dapat berkomunikasi verbal' }}
                        </small>
                    </div>
                    <SelectButton v-model="formData.skala" :options="['NRS', 'FLACC']" />
                </div>
            </div>

            <template v-if="formData.skala === 'NRS'">
                <!-- ===== NRS ===== -->
                <div class="mb-3">
                    <label style="font-weight:600;display:block;margin-bottom:8px">
                        Skala Nyeri (0 = Tidak Nyeri, 10 = Nyeri Sangat Berat)
                    </label>
                    <div style="display:flex;gap:6px;flex-wrap:wrap">
                        <button v-for="n in 11" :key="n-1" type="button"
                            @click="formData.nrs.skor = n-1"
                            :style="nrsButtonStyle(n-1)"
                            style="width:44px;height:44px;border-radius:8px;font-weight:800;font-size:1.05em;cursor:pointer">
                            {{ n-1 }}
                        </button>
                    </div>
                </div>

                <div class="mb-3">
                    <label style="font-weight:600;display:block;margin-bottom:4px">Lokasi Nyeri</label>
                    <InputText v-model="formData.lokasi_nyeri" style="width:100%" placeholder="Contoh: Perut kanan bawah" />
                </div>
            </template>

            <template v-else>
                <!-- ===== FLACC ===== -->
                <DataTable :value="flaccCriteria" showGridlines size="small" class="mb-3">
                    <Column header="Kategori" style="min-width:140px">
                        <template #body="s">
                            <span style="font-weight:600">{{ s.data.label }}</span>
                        </template>
                    </Column>
                    <Column header="Pilihan" style="min-width:320px">
                        <template #body="s">
                            <div style="display:flex;flex-direction:column;gap:4px">
                                <div v-for="opt in s.data.options" :key="opt.value"
                                    style="display:flex;align-items:center;gap:8px">
                                    <RadioButton :inputId="s.data.field + '_' + opt.value"
                                        :name="s.data.field" :value="opt.value"
                                        v-model="formData.flacc[s.data.field]" />
                                    <label :for="s.data.field + '_' + opt.value"
                                        style="cursor:pointer;margin:0">
                                        {{ opt.label }}
                                    </label>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column header="Skor" style="width:80px;text-align:center">
                        <template #body="s">
                            <Tag :value="String(formData.flacc[s.data.field] ?? 0)"
                                :severity="formData.flacc[s.data.field] > 0 ? 'warn' : 'secondary'" />
                        </template>
                    </Column>
                </DataTable>
            </template>

            <!-- Total Skor -->
            <div :style="hasilResultStyle" style="padding:12px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                <div>
                    <div style="font-weight:700">
                        <i class="pi pi-chart-bar mr-2"></i>Total Skor Nyeri
                    </div>
                    <div style="font-size:0.9em;margin-top:2px">{{ hasilInterpretasi.keterangan }}</div>
                </div>
                <div style="text-align:right">
                    <div style="font-size:2em;font-weight:900;line-height:1">{{ totalSkor }}</div>
                    <Tag :severity="hasilInterpretasi.severity" :value="hasilInterpretasi.label" class="mt-1" />
                </div>
            </div>

            <!-- Catatan -->
            <div>
                <label style="font-weight:600;display:block;margin-bottom:4px">Catatan / Observasi</label>
                <Textarea v-model="formData.catatan" :rows="2" style="width:100%"
                    placeholder="Catatan tambahan pengkajian (opsional)..." />
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="showForm=false" :disabled="isSaving" />
                <Button label="Simpan Pengkajian" icon="pi pi-save" severity="success" @click="simpan()"
                    :loading="isSaving" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: DETAIL RIWAYAT ===== -->
        <Dialog v-model:visible="showDetail" header="Detail Pengkajian Nyeri" :modal="true" :style="{ width: '600px' }">
            <template v-if="detailData">
                <div class="mb-3 p-3" style="background:#f3e5f5;border-radius:8px;border-left:4px solid #7b1fa2">
                    <div style="font-weight:700">
                        {{ detailData.skala === 'NRS' ? 'NRS — Numeric Rating Scale' : 'FLACC — Observasional' }}
                    </div>
                    <small>{{ formatWaktu(detailData.waktu_kajian) }} &nbsp;|&nbsp; Dikaji oleh: <strong>{{ detailData.username }}</strong></small>
                </div>

                <div v-if="detailData.lokasi_nyeri" class="mb-3">
                    <strong>Lokasi Nyeri:</strong> {{ detailData.lokasi_nyeri }}
                </div>

                <DataTable v-if="detailData.detail_items && detailData.detail_items.length" :value="detailData.detail_items" showGridlines size="small" class="mb-3">
                    <Column field="parameter" header="Parameter" style="min-width:200px" />
                    <Column field="jawaban" header="Jawaban" style="min-width:200px" />
                    <Column field="skor" header="Skor" style="width:80px;text-align:center">
                        <template #body="s">
                            <Tag :value="String(s.data.skor)"
                                :severity="s.data.skor > 0 ? 'warn' : 'secondary'" />
                        </template>
                    </Column>
                </DataTable>

                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:8px;background:#f5f5f5;border:1px solid #ddd">
                    <span style="font-weight:600">Total Skor</span>
                    <div style="text-align:right">
                        <span style="font-size:1.5em;font-weight:900;margin-right:10px">{{ detailData.skor_total }}</span>
                        <Tag :severity="getSeverityFromInterpretasi(detailData.interpretasi)"
                            :value="detailData.interpretasi" />
                    </div>
                </div>

                <div v-if="detailData.catatan" class="mt-3 p-3"
                    style="background:#fff8e1;border-radius:6px;border:1px solid #ffe082">
                    <i class="pi pi-comment mr-1" style="color:#f57c00"></i>
                    <strong>Catatan:</strong> {{ detailData.catatan }}
                </div>
            </template>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" text @click="showDetail=false" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">
            <!-- ===== INFO PASIEN (hanya tampil di halaman standalone, bukan sebagai component) ===== -->
            <Card v-if="!datapasien" class="mb-3">
                <template #content>
                    <div v-if="isLoadingPasien" class="text-center py-3">
                        <ProgressBar mode="indeterminate" style="height:.3em" />
                    </div>
                    <div v-else class="row align-items-center">
                        <div class="col-md-1 text-center">
                            <div style="width:52px;height:52px;border-radius:50%;background:#f3e5f5;display:inline-flex;align-items:center;justify-content:center">
                                <i class="pi pi-heart" style="font-size:1.5em;color:#7b1fa2"></i>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div style="font-weight:700;font-size:1.1em;color:#1a1a2e">
                                {{ dataPasien.DATA_SINGKAT || '—' }}
                            </div>
                            <div style="color:#666;margin-top:2px">
                                No. RM: <strong>{{ dataPasien.NOMR || '—' }}</strong>
                                &nbsp;|&nbsp; No. Reg: <code>{{ noregister }}</code>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div style="color:#555;font-size:0.85rem"><i class="pi pi-calendar mr-1"></i>
                                Masuk: <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong></div>
                            <div style="color:#555;margin-top:4px"><i class="pi pi-user-edit mr-1"></i>
                                DPJP: <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong></div>
                        </div>
                        <div class="col-md-3 text-right">
                            <Button label="Pengkajian Baru" icon="pi pi-plus" severity="success"
                                @click="bukaFormBaru()" :disabled="isLoadingPasien" />
                        </div>
                    </div>
                </template>
            </Card>

            <!-- ===== RIWAYAT PENGKAJIAN ===== -->
            <Card>
                <template #title>
                    <div style="display:flex;align-items:center;justify-content:space-between">
                        <div>
                            <i class="pi pi-list mr-2" style="color:#7b1fa2"></i>
                            Riwayat Pengkajian Nyeri
                        </div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <Tag :value="'Total: ' + riwayat.length + ' pengkajian'" severity="info" />
                            <Button v-if="datapasien" label="Pengkajian Baru" icon="pi pi-plus" severity="success"
                                size="small" @click="bukaFormBaru()" />
                            <Button icon="pi pi-refresh" severity="secondary" outlined size="small"
                                v-tooltip="'Muat ulang'" @click="fetchRiwayat()" :loading="isLoadingRiwayat" />
                        </div>
                    </div>
                </template>
                <template #content>
                    <DataTable :value="riwayat" :rowHover="true" size="small" stripedRows
                        :paginator="riwayat.length > 10" :rows="10">
                        <template #empty>
                            <div class="text-center py-5" style="color:#aaa">
                                <i class="pi pi-inbox" style="font-size:2em;opacity:.4"></i>
                                <div class="mt-2">Belum ada pengkajian nyeri untuk pasien ini.</div>
                                <Button label="Mulai Pengkajian Pertama" icon="pi pi-plus" severity="success"
                                    class="mt-3" @click="bukaFormBaru()" />
                            </div>
                        </template>
                        <Column header="#" style="width:44px;text-align:center">
                            <template #body="s">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#f3e5f5;color:#7b1fa2;font-weight:700">{{ s.index + 1 }}</span>
                            </template>
                        </Column>
                        <Column header="Waktu Kajian" style="min-width:160px">
                            <template #body="s">
                                <div style="font-weight:600">{{ formatWaktu(s.data.waktu_kajian) }}</div>
                                <small style="color:#888">{{ s.data.username }}</small>
                            </template>
                        </Column>
                        <Column header="Skala" style="width:120px">
                            <template #body="s">
                                <Tag severity="secondary" :value="s.data.skala" />
                            </template>
                        </Column>
                        <Column header="Lokasi Nyeri" style="min-width:140px">
                            <template #body="s">
                                <span v-if="s.data.lokasi_nyeri">{{ s.data.lokasi_nyeri }}</span>
                                <span v-else style="color:#ccc">—</span>
                            </template>
                        </Column>
                        <Column header="Skor" style="width:90px;text-align:center">
                            <template #body="s">
                                <span style="font-size:1.4em;font-weight:800">{{ s.data.skor_total }}</span>
                            </template>
                        </Column>
                        <Column header="Interpretasi" style="width:140px;text-align:center">
                            <template #body="s">
                                <Tag :severity="getSeverityFromInterpretasi(s.data.interpretasi)"
                                    :value="s.data.interpretasi" />
                            </template>
                        </Column>
                        <Column header="Catatan" style="min-width:180px">
                            <template #body="s">
                                <span v-if="s.data.catatan" style="color:#555">
                                    <i class="pi pi-comment mr-1" style="color:#f57c00"></i>{{ s.data.catatan }}
                                </span>
                                <span v-else style="color:#ccc">—</span>
                            </template>
                        </Column>
                        <Column header="Aksi" style="width:130px;text-align:center">
                            <template #body="s">
                                <div style="display:flex;gap:4px;justify-content:center">
                                    <Button icon="pi pi-eye" size="small" outlined
                                        v-tooltip="'Lihat Detail'" @click="lihatDetail(s.data)" />
                                    <Button icon="pi pi-trash" size="small" severity="danger" outlined
                                        v-tooltip="'Hapus'" @click="konfirmasiHapus(s.data)" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </template>
            </Card>
        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';

    export default {
        props: {
            noregisterProp: {
                type: String,
                default: null,
            },
            datapasien: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                noregister: '',
                dataPasien: {},
                isLoadingPasien: false,
                isLoadingRiwayat: false,
                isSaving: false,
                riwayat: [],
                showForm: false,
                showDetail: false,
                detailData: null,
                formData: {
                    skala: 'NRS',
                    catatan: '',
                    lokasi_nyeri: '',
                    nrs: {
                        skor: 0,
                    },
                    flacc: {
                        wajah: 0,
                        kaki: 0,
                        aktivitas: 0,
                        menangis: 0,
                        konsolabilitas: 0,
                    }
                },

                flaccCriteria: [
                    {
                        field: 'wajah', label: 'Wajah',
                        options: [
                            { value: 0, label: 'Tersenyum / tidak ada ekspresi khusus (0)' },
                            { value: 1, label: 'Sesekali meringis / menarik diri (1)' },
                            { value: 2, label: 'Sering cemberut, rahang mengatup, dagu bergetar (2)' },
                        ]
                    },
                    {
                        field: 'kaki', label: 'Kaki',
                        options: [
                            { value: 0, label: 'Posisi normal / rileks (0)' },
                            { value: 1, label: 'Tidak tenang, gelisah, tegang (1)' },
                            { value: 2, label: 'Menendang atau kaki tertarik (2)' },
                        ]
                    },
                    {
                        field: 'aktivitas', label: 'Aktivitas',
                        options: [
                            { value: 0, label: 'Berbaring tenang, bergerak mudah (0)' },
                            { value: 1, label: 'Menggeliat-geliat, bolak-balik, tegang (1)' },
                            { value: 2, label: 'Melengkung, kaku, atau menghentak-hentak (2)' },
                        ]
                    },
                    {
                        field: 'menangis', label: 'Menangis',
                        options: [
                            { value: 0, label: 'Tidak menangis (0)' },
                            { value: 1, label: 'Merintih / merengek, kadang mengeluh (1)' },
                            { value: 2, label: 'Menangis terus-menerus, menjerit / terisak (2)' },
                        ]
                    },
                    {
                        field: 'konsolabilitas', label: 'Kemampuan Ditenangkan',
                        options: [
                            { value: 0, label: 'Rileks (0)' },
                            { value: 1, label: 'Dapat ditenangkan dengan disentuh / dipeluk / diajak bicara (1)' },
                            { value: 2, label: 'Sulit ditenangkan / dibujuk (2)' },
                        ]
                    },
                ],
            };
        },

        computed: {
            skalaPasien() {
                const tahun = this.dataPasien?.USIA_PASIEN?.tahun ?? 99;
                return Number(tahun) < 3 ? 'FLACC' : 'NRS';
            },
            totalSkor() {
                if (this.formData.skala === 'NRS') {
                    return this.formData.nrs.skor ?? 0;
                }
                const f = this.formData.flacc;
                return (f.wajah ?? 0) + (f.kaki ?? 0) + (f.aktivitas ?? 0) +
                    (f.menangis ?? 0) + (f.konsolabilitas ?? 0);
            },
            hasilInterpretasi() {
                const s = this.totalSkor;
                if (s === 0) return { label: 'Tidak Nyeri', severity: 'success', keterangan: 'Pasien rileks dan nyaman', bg: '#e8f5e9', border: '#a5d6a7', color: '#2e7d32' };
                if (s <= 3) return { label: 'Nyeri Ringan', severity: 'success', keterangan: 'Nyeri ringan, tetap pantau berkala', bg: '#e8f5e9', border: '#a5d6a7', color: '#2e7d32' };
                if (s <= 6) return { label: 'Nyeri Sedang', severity: 'warn', keterangan: 'Perlu intervensi manajemen nyeri', bg: '#fff8e1', border: '#ffe082', color: '#e65100' };
                return { label: 'Nyeri Berat', severity: 'danger', keterangan: 'Perlu penanganan nyeri segera', bg: '#ffebee', border: '#ef9a9a', color: '#b71c1c' };
            },
            hasilResultStyle() {
                const i = this.hasilInterpretasi;
                return `background:${i.bg};border:1.5px solid ${i.border};color:${i.color}`;
            },
            formTitle() {
                const skala = this.formData.skala === 'NRS' ? 'NRS' : 'FLACC';
                return `Pengkajian Nyeri — ${skala}`;
            },
        },

        created() {
            if (this.noregisterProp) {
                this.noregister = this.noregisterProp;
            } else {
                this.noregister = window.location.pathname.split('/').pop();
            }

            if (this.datapasien) {
                this.dataPasien = this.datapasien;
            } else {
                this.fetchDataPasien();
            }

            this.fetchRiwayat();
        },

        watch: {
            noregisterProp(val) {
                if (val) {
                    this.noregister = val;
                    this.fetchRiwayat();
                }
            },
            datapasien(val) {
                if (val) {
                    this.dataPasien = val;
                }
            },
        },

        methods: {
            // ===== DATA PASIEN =====
            async fetchDataPasien() {
                this.isLoadingPasien = true;
                await axios.post('/datapasienpertransaksi', { mode: 'history8', noregister: this.noregister })
                    .then(response => {
                        this.dataPasien = response.data.response[0];
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        this.isLoadingPasien = false;
                    });
            },

            // ===== RIWAYAT =====
            async fetchRiwayat() {
                this.isLoadingRiwayat = true;
                try {
                    const res = await axios.post('/assesment/get_nyeri', { noregister: this.noregister });
                    this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoadingRiwayat = false;
                }
            },

            // ===== FORM BARU =====
            bukaFormBaru() {
                this.formData.skala = this.skalaPasien;
                this.formData.catatan = '';
                this.formData.lokasi_nyeri = '';
                this.formData.nrs = { skor: 0 };
                this.formData.flacc = { wajah: 0, kaki: 0, aktivitas: 0, menangis: 0, konsolabilitas: 0 };
                this.showForm = true;
            },

            // ===== SIMPAN =====
            async simpan() {
                this.isSaving = true;
                try {
                    const isNrs = this.formData.skala === 'NRS';
                    const skor = this.totalSkor;
                    const interpretasi = this.hasilInterpretasi.label;

                    const detail_items = isNrs ? [] : this.buildDetailFlacc();

                    const payload = {
                        noregister: this.noregister,
                        skala: this.formData.skala,
                        skor_total: skor,
                        interpretasi,
                        lokasi_nyeri: this.formData.lokasi_nyeri || '',
                        catatan: this.formData.catatan || '',
                        detail_items,
                        parameter_json: isNrs
                            ? JSON.stringify(this.formData.nrs)
                            : JSON.stringify(this.formData.flacc),
                    };

                    const res = await axios.post('/assesment/simpan_nyeri', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        this.showForm = false;
                        this.open('success', 'Pengkajian nyeri berhasil disimpan');
                        await this.fetchRiwayat();
                    } else {
                        this.open('error', res.data?.message || 'Gagal menyimpan pengkajian');
                    }
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                } finally {
                    this.isSaving = false;
                }
            },

            buildDetailFlacc() {
                const f = this.formData.flacc;
                const labelFor = (field, val) => {
                    const criteria = this.flaccCriteria.find(c => c.field === field);
                    const opt = criteria?.options.find(o => o.value === val);
                    return opt ? opt.label.replace(/\s*\(\d\)$/, '') : val;
                };
                return [
                    { parameter: 'Wajah', jawaban: labelFor('wajah', f.wajah), skor: f.wajah },
                    { parameter: 'Kaki', jawaban: labelFor('kaki', f.kaki), skor: f.kaki },
                    { parameter: 'Aktivitas', jawaban: labelFor('aktivitas', f.aktivitas), skor: f.aktivitas },
                    { parameter: 'Menangis', jawaban: labelFor('menangis', f.menangis), skor: f.menangis },
                    { parameter: 'Kemampuan Ditenangkan', jawaban: labelFor('konsolabilitas', f.konsolabilitas), skor: f.konsolabilitas },
                ];
            },

            // ===== DETAIL =====
            lihatDetail(row) {
                this.detailData = row;
                this.showDetail = true;
            },

            // ===== HAPUS =====
            konfirmasiHapus(row) {
                this.$confirm.require({
                    group: 'pengkajianNyeri',
                    message: `Hapus pengkajian tanggal ${this.formatWaktu(row.waktu_kajian)}? Tindakan ini tidak dapat dibatalkan.`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => {
                        this.hapus(row);
                    },
                });
            },
            async hapus(row) {
                try {
                    await axios.post('/assesment/hapus_nyeri', {
                        noregister: this.noregister,
                        id_kajian: row.id_kajian,
                    });
                    this.open('info', 'Pengkajian berhasil dihapus');
                    await this.fetchRiwayat();
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                }
            },

            // ===== FORMAT =====
            formatWaktu(val) {
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

            // ===== NOTIFIKASI =====
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },

            // ===== HELPER DISPLAY =====
            nrsButtonStyle(n) {
                const active = this.formData.nrs.skor === n;
                let color = '#2e7d32';
                if (n >= 7) color = '#b71c1c';
                else if (n >= 4) color = '#e65100';
                else if (n >= 1) color = '#2e7d32';
                else color = '#616161';

                if (active) {
                    return `background:${color};border:2px solid ${color};color:#fff`;
                }
                return `background:#fff;border:2px solid ${color};color:${color}`;
            },
            getSeverityFromInterpretasi(val) {
                if (!val) return 'secondary';
                const v = val.toUpperCase();
                if (v.includes('BERAT')) return 'danger';
                if (v.includes('SEDANG')) return 'warn';
                return 'success';
            },
        }
    }
</script>
