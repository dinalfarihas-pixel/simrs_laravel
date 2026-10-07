<template>
    <section>
        <ConfirmDialog group="skriningInfeksius" />
        <!-- ===== DIALOG: FORM SKRINING ===== -->
        <Dialog v-model:visible="showForm" :header="formTitle" :modal="true" :style="{ width: '700px' }"
            :closable="!isSaving">
            <div class="mb-3 p-3" style="background:#e0f2f1;border-radius:8px;border-left:4px solid #00695c">
                <div style="font-weight:700;color:#00695c">
                    <i class="pi pi-shield mr-1"></i>Skrining Penyakit Menular / Infeksius (PPI)
                </div>
                <small style="color:#555">
                    Skrining awal untuk kewaspadaan pencegahan dan pengendalian infeksi (PPI).
                </small>
            </div>

            <!-- Gejala -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Gejala Saat Ini</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <div v-for="g in gejalaCriteria" :key="g.field" style="display:flex;align-items:center;gap:8px">
                        <Checkbox :inputId="'gejala_' + g.field" v-model="formData.gejala[g.field]" :binary="true" />
                        <label :for="'gejala_' + g.field" style="cursor:pointer;margin:0">{{ g.label }}</label>
                    </div>
                </div>
            </div>

            <!-- Riwayat Kontak -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:4px">
                    Riwayat Kontak dengan Kasus Penyakit Menular (14 hari terakhir)
                </label>
                <SelectButton v-model="formData.riwayat_kontak" :options="yaTidakOptions" optionLabel="label" optionValue="value" />
                <InputText v-if="formData.riwayat_kontak" v-model="formData.detail_kontak" class="mt-2" style="width:100%"
                    placeholder="Jenis penyakit / detail kontak" />
            </div>

            <!-- Riwayat Bepergian -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:4px">
                    Riwayat Bepergian ke Daerah Endemis / KLB (14 hari terakhir)
                </label>
                <SelectButton v-model="formData.riwayat_bepergian" :options="yaTidakOptions" optionLabel="label" optionValue="value" />
                <InputText v-if="formData.riwayat_bepergian" v-model="formData.detail_bepergian" class="mt-2" style="width:100%"
                    placeholder="Daerah tujuan" />
            </div>

            <!-- Riwayat Penyakit Menular Sebelumnya -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Riwayat Penyakit Menular Sebelumnya</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <div v-for="r in riwayatPenyakitCriteria" :key="r.field" style="display:flex;align-items:center;gap:8px">
                        <Checkbox :inputId="'riw_' + r.field" v-model="formData.riwayat_penyakit[r.field]" :binary="true" />
                        <label :for="'riw_' + r.field" style="cursor:pointer;margin:0">{{ r.label }}</label>
                    </div>
                </div>
                <InputText v-model="formData.riwayat_penyakit_lainnya" class="mt-2" style="width:100%"
                    placeholder="Lainnya (sebutkan)" />
            </div>

            <!-- Total Skor -->
            <div :style="hasilResultStyle" style="padding:12px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                <div>
                    <div style="font-weight:700">
                        <i class="pi pi-chart-bar mr-2"></i>Skor Skrining
                    </div>
                    <div style="font-size:0.9em;margin-top:2px">{{ hasilInterpretasi.keterangan }}</div>
                </div>
                <div style="text-align:right">
                    <div style="font-size:2em;font-weight:900;line-height:1">{{ totalSkor }}</div>
                    <Tag :severity="hasilInterpretasi.severity" :value="hasilInterpretasi.label" class="mt-1" />
                </div>
            </div>

            <!-- Kewaspadaan Isolasi -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:4px">Kewaspadaan Isolasi</label>
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <Select v-model="formData.kewaspadaan_isolasi" :options="isolasiOptions" style="min-width:220px" />
                    <Button v-if="saranIsolasi !== formData.kewaspadaan_isolasi" type="button"
                        :label="'Gunakan Saran: ' + saranIsolasi" icon="pi pi-sparkles" text size="small"
                        @click="formData.kewaspadaan_isolasi = saranIsolasi" />
                </div>
            </div>

            <!-- Catatan -->
            <div>
                <label style="font-weight:600;display:block;margin-bottom:4px">Catatan / Observasi</label>
                <Textarea v-model="formData.catatan" :rows="2" style="width:100%"
                    placeholder="Catatan tambahan skrining (opsional)..." />
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="showForm=false" :disabled="isSaving" />
                <Button label="Simpan Skrining" icon="pi pi-save" severity="success" @click="simpan()"
                    :loading="isSaving" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: DETAIL RIWAYAT ===== -->
        <Dialog v-model:visible="showDetail" header="Detail Skrining Infeksius" :modal="true" :style="{ width: '600px' }">
            <template v-if="detailData">
                <div class="mb-3 p-3" style="background:#e0f2f1;border-radius:8px;border-left:4px solid #00695c">
                    <div style="font-weight:700">Skrining Penyakit Menular / Infeksius</div>
                    <small>{{ formatWaktu(detailData.waktu_kajian) }} &nbsp;|&nbsp; Dikaji oleh: <strong>{{ detailData.username }}</strong></small>
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

                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:8px;background:#f5f5f5;border:1px solid #ddd;margin-bottom:10px">
                    <span style="font-weight:600">Total Skor</span>
                    <div style="text-align:right">
                        <span style="font-size:1.5em;font-weight:900;margin-right:10px">{{ detailData.skor_total }}</span>
                        <Tag :severity="getSeverityFromInterpretasi(detailData.interpretasi)"
                            :value="detailData.interpretasi" />
                    </div>
                </div>

                <div v-if="detailData.kewaspadaan_isolasi" class="mb-3">
                    <strong>Kewaspadaan Isolasi:</strong>
                    <Tag class="ml-2" severity="info" :value="detailData.kewaspadaan_isolasi" />
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
                            <div style="width:52px;height:52px;border-radius:50%;background:#e0f2f1;display:inline-flex;align-items:center;justify-content:center">
                                <i class="pi pi-shield" style="font-size:1.5em;color:#00695c"></i>
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
                            <Button label="Skrining Baru" icon="pi pi-plus" severity="success"
                                @click="bukaFormBaru()" :disabled="isLoadingPasien" />
                        </div>
                    </div>
                </template>
            </Card>

            <!-- ===== RIWAYAT SKRINING ===== -->
            <Card>
                <template #title>
                    <div style="display:flex;align-items:center;justify-content:space-between">
                        <div>
                            <i class="pi pi-list mr-2" style="color:#00695c"></i>
                            Riwayat Skrining Penyakit Menular / Infeksius
                        </div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <Tag :value="'Total: ' + riwayat.length + ' skrining'" severity="info" />
                            <Button v-if="datapasien" label="Skrining Baru" icon="pi pi-plus" severity="success"
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
                                <div class="mt-2">Belum ada skrining infeksius untuk pasien ini.</div>
                                <Button label="Mulai Skrining Pertama" icon="pi pi-plus" severity="success"
                                    class="mt-3" @click="bukaFormBaru()" />
                            </div>
                        </template>
                        <Column header="#" style="width:44px;text-align:center">
                            <template #body="s">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#e0f2f1;color:#00695c;font-weight:700">{{ s.index + 1 }}</span>
                            </template>
                        </Column>
                        <Column header="Waktu Skrining" style="min-width:160px">
                            <template #body="s">
                                <div style="font-weight:600">{{ formatWaktu(s.data.waktu_kajian) }}</div>
                                <small style="color:#888">{{ s.data.username }}</small>
                            </template>
                        </Column>
                        <Column header="Skor" style="width:90px;text-align:center">
                            <template #body="s">
                                <span style="font-size:1.4em;font-weight:800">{{ s.data.skor_total }}</span>
                            </template>
                        </Column>
                        <Column header="Interpretasi" style="width:180px;text-align:center">
                            <template #body="s">
                                <Tag :severity="getSeverityFromInterpretasi(s.data.interpretasi)"
                                    :value="s.data.interpretasi" />
                            </template>
                        </Column>
                        <Column header="Kewaspadaan Isolasi" style="width:150px">
                            <template #body="s">
                                <span v-if="s.data.kewaspadaan_isolasi">{{ s.data.kewaspadaan_isolasi }}</span>
                                <span v-else style="color:#ccc">—</span>
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
                    catatan: '',
                    gejala: {
                        demam: false,
                        batuk: false,
                        sesak: false,
                        nyeri_tenggorokan: false,
                        diare: false,
                        ruam: false,
                    },
                    riwayat_kontak: false,
                    detail_kontak: '',
                    riwayat_bepergian: false,
                    detail_bepergian: '',
                    riwayat_penyakit: {
                        tb: false,
                        hepatitis: false,
                        hiv: false,
                        covid: false,
                    },
                    riwayat_penyakit_lainnya: '',
                    kewaspadaan_isolasi: 'Standar',
                },

                gejalaCriteria: [
                    { field: 'demam', label: 'Demam (≥38°C)' },
                    { field: 'batuk', label: 'Batuk' },
                    { field: 'sesak', label: 'Sesak Napas / Sulit Bernapas' },
                    { field: 'nyeri_tenggorokan', label: 'Nyeri Tenggorokan' },
                    { field: 'diare', label: 'Diare' },
                    { field: 'ruam', label: 'Ruam Kulit / Lesi Kulit' },
                ],
                riwayatPenyakitCriteria: [
                    { field: 'tb', label: 'TB Paru' },
                    { field: 'hepatitis', label: 'Hepatitis B/C' },
                    { field: 'hiv', label: 'HIV/AIDS' },
                    { field: 'covid', label: 'COVID-19' },
                ],
                yaTidakOptions: [
                    { label: 'Tidak', value: false },
                    { label: 'Ya', value: true },
                ],
                isolasiOptions: ['Standar', 'Kontak', 'Droplet', 'Airborne'],
            };
        },

        computed: {
            gejalaCount() {
                return Object.values(this.formData.gejala).filter(Boolean).length;
            },
            riwayatPenyakitCount() {
                const count = Object.values(this.formData.riwayat_penyakit).filter(Boolean).length;
                return count + (this.formData.riwayat_penyakit_lainnya?.trim() ? 1 : 0);
            },
            totalSkor() {
                let skor = this.gejalaCount * 1;
                if (this.formData.riwayat_kontak) skor += 3;
                if (this.formData.riwayat_bepergian) skor += 2;
                skor += this.riwayatPenyakitCount * 1;
                return skor;
            },
            hasilInterpretasi() {
                const s = this.totalSkor;
                if (s === 0) return { label: 'Tidak Berisiko', severity: 'success', keterangan: 'Tidak ditemukan indikasi risiko penularan' };
                if (s <= 2) return { label: 'Perlu Skrining Lanjutan', severity: 'warn', keterangan: 'Pantau gejala, pertimbangkan skrining tambahan' };
                return { label: 'Berisiko Tinggi - Perlu Isolasi', severity: 'danger', keterangan: 'Terapkan kewaspadaan isolasi sesuai jenis transmisi' };
            },
            hasilResultStyle() {
                const map = {
                    success: 'background:#e8f5e9;border:1.5px solid #a5d6a7;color:#2e7d32',
                    warn: 'background:#fff8e1;border:1.5px solid #ffe082;color:#e65100',
                    danger: 'background:#ffebee;border:1.5px solid #ef9a9a;color:#b71c1c',
                };
                return map[this.hasilInterpretasi.severity];
            },
            saranIsolasi() {
                if (this.totalSkor === 0) return 'Standar';
                const g = this.formData.gejala;
                if (g.sesak || g.batuk || g.nyeri_tenggorokan) return this.totalSkor >= 3 ? 'Airborne' : 'Droplet';
                if (g.diare || g.ruam) return 'Kontak';
                return 'Standar';
            },
            formTitle() {
                return 'Skrining Penyakit Menular / Infeksius';
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
                    const res = await axios.post('/assesment/get_infeksius', { noregister: this.noregister });
                    this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoadingRiwayat = false;
                }
            },

            // ===== FORM BARU =====
            bukaFormBaru() {
                this.formData.catatan = '';
                this.formData.gejala = { demam: false, batuk: false, sesak: false, nyeri_tenggorokan: false, diare: false, ruam: false };
                this.formData.riwayat_kontak = false;
                this.formData.detail_kontak = '';
                this.formData.riwayat_bepergian = false;
                this.formData.detail_bepergian = '';
                this.formData.riwayat_penyakit = { tb: false, hepatitis: false, hiv: false, covid: false };
                this.formData.riwayat_penyakit_lainnya = '';
                this.formData.kewaspadaan_isolasi = 'Standar';
                this.showForm = true;
            },

            // ===== SIMPAN =====
            async simpan() {
                this.isSaving = true;
                try {
                    const payload = {
                        noregister: this.noregister,
                        skor_total: this.totalSkor,
                        interpretasi: this.hasilInterpretasi.label,
                        kewaspadaan_isolasi: this.formData.kewaspadaan_isolasi,
                        catatan: this.formData.catatan || '',
                        detail_items: this.buildDetailItems(),
                        parameter_json: JSON.stringify(this.formData),
                    };

                    const res = await axios.post('/assesment/simpan_infeksius', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        this.showForm = false;
                        this.open('success', 'Skrining infeksius berhasil disimpan');
                        await this.fetchRiwayat();
                    } else {
                        this.open('error', res.data?.message || 'Gagal menyimpan skrining');
                    }
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                } finally {
                    this.isSaving = false;
                }
            },

            buildDetailItems() {
                const items = [];
                this.gejalaCriteria.forEach(g => {
                    items.push({ parameter: g.label, jawaban: this.formData.gejala[g.field] ? 'Ya' : 'Tidak', skor: this.formData.gejala[g.field] ? 1 : 0 });
                });
                items.push({
                    parameter: 'Riwayat Kontak dengan Kasus Menular',
                    jawaban: this.formData.riwayat_kontak ? ('Ya' + (this.formData.detail_kontak ? ' — ' + this.formData.detail_kontak : '')) : 'Tidak',
                    skor: this.formData.riwayat_kontak ? 3 : 0,
                });
                items.push({
                    parameter: 'Riwayat Bepergian ke Daerah Endemis/KLB',
                    jawaban: this.formData.riwayat_bepergian ? ('Ya' + (this.formData.detail_bepergian ? ' — ' + this.formData.detail_bepergian : '')) : 'Tidak',
                    skor: this.formData.riwayat_bepergian ? 2 : 0,
                });
                this.riwayatPenyakitCriteria.forEach(r => {
                    items.push({ parameter: 'Riwayat ' + r.label, jawaban: this.formData.riwayat_penyakit[r.field] ? 'Ya' : 'Tidak', skor: this.formData.riwayat_penyakit[r.field] ? 1 : 0 });
                });
                if (this.formData.riwayat_penyakit_lainnya?.trim()) {
                    items.push({ parameter: 'Riwayat Penyakit Menular Lainnya', jawaban: this.formData.riwayat_penyakit_lainnya, skor: 1 });
                }
                return items;
            },

            // ===== DETAIL =====
            lihatDetail(row) {
                this.detailData = row;
                this.showDetail = true;
            },

            // ===== HAPUS =====
            konfirmasiHapus(row) {
                this.$confirm.require({
                    group: 'skriningInfeksius',
                    message: `Hapus skrining tanggal ${this.formatWaktu(row.waktu_kajian)}? Tindakan ini tidak dapat dibatalkan.`,
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
                    await axios.post('/assesment/hapus_infeksius', {
                        noregister: this.noregister,
                        id_kajian: row.id_kajian,
                    });
                    this.open('info', 'Skrining berhasil dihapus');
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
            getSeverityFromInterpretasi(val) {
                if (!val) return 'secondary';
                const v = val.toUpperCase();
                if (v.includes('BERISIKO TINGGI')) return 'danger';
                if (v.includes('SKRINING LANJUTAN')) return 'warn';
                return 'success';
            },
        }
    }
</script>
