<template>
    <section>
        <ConfirmDialog group="kajianResikoJatuh" />
        <!-- ===== DIALOG: FORM PENGKAJIAN ===== -->
        <Dialog v-model:visible="showForm" :header="formTitle" :modal="true" :style="{ width: '700px' }"
            :closable="!isSaving">
            <template v-if="formData.skala === 'MORSE'">
                <!-- ===== SKALA MORSE ===== -->
                <div class="mb-3 p-3" style="background:#e3f2fd;border-radius:8px;border-left:4px solid #1976d2">
                    <div style="font-weight:700;color:#1565c0;margin-bottom:2px">
                        <i class="pi pi-info-circle mr-1"></i>Skala Morse — Dewasa / Remaja (≥ 14 tahun)
                    </div>
                    <small style="color:#555">Skor total menentukan tingkat risiko jatuh pasien dewasa.</small>
                </div>

                <DataTable :value="morseCriteria" showGridlines size="small" class="mb-3">
                    <Column header="Parameter" style="min-width:200px">
                        <template #body="s">
                            <span style="font-weight:600">{{ s.data.label }}</span>
                            <div v-if="s.data.note" style="font-size:0.85em;color:#888">{{ s.data.note }}</div>
                        </template>
                    </Column>
                    <Column header="Pilihan" style="min-width:260px">
                        <template #body="s">
                            <div style="display:flex;flex-direction:column;gap:4px">
                                <div v-for="opt in s.data.options" :key="opt.value"
                                    style="display:flex;align-items:center;gap:8px">
                                    <RadioButton :inputId="s.data.field + '_' + opt.value"
                                        :name="s.data.field" :value="opt.value"
                                        v-model="formData.morse[s.data.field]" />
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
                            <Tag :value="String(formData.morse[s.data.field] ?? 0)"
                                :severity="formData.morse[s.data.field] > 0 ? 'warn' : 'secondary'" />
                        </template>
                    </Column>
                </DataTable>

                <!-- Total Morse -->
                <div :style="morseResultStyle" style="padding:12px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                    <div>
                        <div style="font-weight:700">
                            <i class="pi pi-chart-bar mr-2"></i>Total Skor Morse
                        </div>
                        <div style="font-size:0.9em;margin-top:2px">{{ morseInterpretasi.keterangan }}</div>
                    </div>
                    <div style="text-align:right">
                        <div style="font-size:2em;font-weight:900;line-height:1">{{ totalMorse }}</div>
                        <Tag :severity="morseInterpretasi.severity" :value="morseInterpretasi.label" class="mt-1" />
                    </div>
                </div>
            </template>

            <template v-else>
                <!-- ===== HUMPTY DUMPTY ===== -->
                <div class="mb-3 p-3" style="background:#fce4ec;border-radius:8px;border-left:4px solid #c2185b">
                    <div style="font-weight:700;color:#ad1457;margin-bottom:2px">
                        <i class="pi pi-info-circle mr-1"></i>Skala Humpty Dumpty — Anak-anak (&lt; 14 tahun)
                    </div>
                    <small style="color:#555">Skor total menentukan tingkat risiko jatuh pasien anak.</small>
                </div>

                <DataTable :value="humptyDumptyCriteria" showGridlines size="small" class="mb-3">
                    <Column header="Parameter" style="min-width:180px">
                        <template #body="s">
                            <span style="font-weight:600">{{ s.data.label }}</span>
                        </template>
                    </Column>
                    <Column header="Pilihan" style="min-width:280px">
                        <template #body="s">
                            <div style="display:flex;flex-direction:column;gap:4px">
                                <div v-for="opt in s.data.options" :key="opt.value"
                                    style="display:flex;align-items:center;gap:8px">
                                    <RadioButton :inputId="s.data.field + '_' + opt.value"
                                        :name="s.data.field" :value="opt.value"
                                        v-model="formData.humpty[s.data.field]" />
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
                            <Tag :value="String(formData.humpty[s.data.field] ?? 1)"
                                :severity="(formData.humpty[s.data.field] ?? 1) > 1 ? 'warn' : 'secondary'" />
                        </template>
                    </Column>
                </DataTable>

                <!-- Total Humpty Dumpty -->
                <div :style="humptyResultStyle" style="padding:12px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
                    <div>
                        <div style="font-weight:700">
                            <i class="pi pi-chart-bar mr-2"></i>Total Skor Humpty Dumpty
                        </div>
                        <div style="font-size:0.9em;margin-top:2px">{{ humptyInterpretasi.keterangan }}</div>
                    </div>
                    <div style="text-align:right">
                        <div style="font-size:2em;font-weight:900;line-height:1">{{ totalHumpty }}</div>
                        <Tag :severity="humptyInterpretasi.severity" :value="humptyInterpretasi.label" class="mt-1" />
                    </div>
                </div>
            </template>

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
        <Dialog v-model:visible="showDetail" header="Detail Pengkajian" :modal="true" :style="{ width: '600px' }">
            <template v-if="detailData">
                <div class="mb-3 p-3" :style="detailData.skala === 'MORSE'
                    ? 'background:#e3f2fd;border-radius:8px;border-left:4px solid #1976d2'
                    : 'background:#fce4ec;border-radius:8px;border-left:4px solid #c2185b'">
                    <div style="font-weight:700">
                        {{ detailData.skala === 'MORSE' ? 'Skala Morse — Dewasa' : 'Skala Humpty Dumpty — Anak' }}
                    </div>
                    <small>{{ formatWaktu(detailData.waktu_kajian) }} &nbsp;|&nbsp; Dikaji oleh: <strong>{{ detailData.username }}</strong></small>
                </div>

                <DataTable :value="detailData.detail_items" showGridlines size="small" class="mb-3">
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
                            <div style="width:52px;height:52px;border-radius:50%;background:#e3f2fd;display:inline-flex;align-items:center;justify-content:center">
                                <i class="pi pi-user" style="font-size:1.5em;color:#1565c0"></i>
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
                            <div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap">
                                <Tag :severity="dataPasien.JENISKELAMIN === 'L' ? 'info' : 'danger'"
                                    :icon="dataPasien.JENISKELAMIN === 'L' ? 'pi pi-mars' : 'pi pi-venus'"
                                    :value="dataPasien.JENISKELAMIN === 'L' ? 'Laki-laki' : 'Perempuan'" />
                                <Tag severity="secondary"
                                    :value="(dataPasien.USIA_PASIEN?.tahun ?? '?') + ' Thn ' + (dataPasien.USIA_PASIEN?.bulan ?? 0) + ' Bln'" />
                                <Tag :severity="skalaPasien === 'MORSE' ? 'info' : 'danger'"
                                    :icon="skalaPasien === 'MORSE' ? 'pi pi-user' : 'pi pi-star'"
                                    :value="'Skala: ' + (skalaPasien === 'MORSE' ? 'Morse (Dewasa)' : 'Humpty Dumpty (Anak)')" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div style="color:#555;font-size:0.85rem"><i class="pi pi-calendar mr-1"></i>
                                Masuk: <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong></div>
                            <div style="color:#555;margin-top:4px"><i class="pi pi-user-edit mr-1"></i>
                                DPJP: <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong></div>
                            <div style="color:#555;margin-top:4px"><i class="pi pi-credit-card mr-1"></i>
                                {{ dataPasien.CARABAYAR || '—' }}</div>
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
                            <i class="pi pi-list mr-2" style="color:#1976d2"></i>
                            Riwayat Pengkajian Risiko Jatuh
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
                                <div class="mt-2">Belum ada pengkajian risiko jatuh untuk pasien ini.</div>
                                <Button label="Mulai Pengkajian Pertama" icon="pi pi-plus" severity="success"
                                    class="mt-3" @click="bukaFormBaru()" />
                            </div>
                        </template>
                        <Column header="#" style="width:44px;text-align:center">
                            <template #body="s">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#e3f2fd;color:#1565c0;font-weight:700">{{ s.index + 1 }}</span>
                            </template>
                        </Column>
                        <Column header="Waktu Kajian" style="min-width:160px">
                            <template #body="s">
                                <div style="font-weight:600">{{ formatWaktu(s.data.waktu_kajian) }}</div>
                                <small style="color:#888">{{ s.data.username }}</small>
                            </template>
                        </Column>
                        <Column header="Skala" style="width:160px">
                            <template #body="s">
                                <Tag :severity="s.data.skala === 'MORSE' ? 'info' : 'danger'"
                                    :value="s.data.skala === 'MORSE' ? 'Morse — Dewasa' : 'Humpty Dumpty — Anak'" />
                            </template>
                        </Column>
                        <Column header="Skor Total" style="width:110px;text-align:center">
                            <template #body="s">
                                <span style="font-size:1.4em;font-weight:800">{{ s.data.skor_total }}</span>
                            </template>
                        </Column>
                        <Column header="Risiko" style="width:140px;text-align:center">
                            <template #body="s">
                                <Tag :severity="getSeverityFromInterpretasi(s.data.interpretasi)"
                                    :value="s.data.interpretasi"
                                    :icon="getIconFromInterpretasi(s.data.interpretasi)" />
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
                    skala: 'MORSE',
                    catatan: '',
                    morse: {
                        riwayat_jatuh: 0,
                        diagnosa_sekunder: 0,
                        alat_bantu: 0,
                        terapi_iv: 0,
                        gaya_berjalan: 0,
                        status_mental: 0,
                    },
                    humpty: {
                        usia: 4,
                        jenis_kelamin: 2,
                        diagnosis: 4,
                        gangguan_kognitif: 3,
                        faktor_lingkungan: 4,
                        respon_operasi: 3,
                        penggunaan_obat: 3,
                    }
                },

                morseCriteria: [
                    {
                        field: 'riwayat_jatuh', label: 'Riwayat Jatuh',
                        note: 'Dalam 3 bulan terakhir',
                        options: [{ value: 0, label: 'Tidak (0)' }, { value: 25, label: 'Ya (25)' }]
                    },
                    {
                        field: 'diagnosa_sekunder', label: 'Diagnosa Sekunder',
                        note: '≥ 2 diagnosa medis',
                        options: [{ value: 0, label: 'Tidak (0)' }, { value: 15, label: 'Ya (15)' }]
                    },
                    {
                        field: 'alat_bantu', label: 'Alat Bantu Jalan',
                        options: [
                            { value: 0, label: 'Tidak ada / Bed rest / Dibantu perawat (0)' },
                            { value: 15, label: 'Kruk / Tongkat / Walker (15)' },
                            { value: 30, label: 'Berpegangan pada benda sekitar / Mebel (30)' }
                        ]
                    },
                    {
                        field: 'terapi_iv', label: 'Terapi Intravena / Infus',
                        options: [{ value: 0, label: 'Tidak (0)' }, { value: 20, label: 'Ya (20)' }]
                    },
                    {
                        field: 'gaya_berjalan', label: 'Cara Berjalan / Gaya Berjalan',
                        options: [
                            { value: 0, label: 'Normal / Tirah baring / Kursi roda (0)' },
                            { value: 10, label: 'Lemah (10)' },
                            { value: 20, label: 'Terganggu / Tidak normal (20)' }
                        ]
                    },
                    {
                        field: 'status_mental', label: 'Status Mental',
                        options: [
                            { value: 0, label: 'Orientasi sesuai kemampuan diri (0)' },
                            { value: 15, label: 'Lupa akan keterbatasan diri (15)' }
                        ]
                    },
                ],

                humptyDumptyCriteria: [
                    {
                        field: 'usia', label: 'Usia',
                        options: [
                            { value: 4, label: 'Di bawah 3 tahun (4)' },
                            { value: 3, label: '3 – 7 tahun (3)' },
                            { value: 2, label: '7 – 13 tahun (2)' },
                            { value: 1, label: '≥ 13 tahun (1)' },
                        ]
                    },
                    {
                        field: 'jenis_kelamin', label: 'Jenis Kelamin',
                        options: [
                            { value: 2, label: 'Laki-laki (2)' },
                            { value: 1, label: 'Perempuan (1)' },
                        ]
                    },
                    {
                        field: 'diagnosis', label: 'Diagnosis',
                        options: [
                            { value: 4, label: 'Kelainan neurologis (4)' },
                            { value: 3, label: 'Perubahan oksigenasi (3)' },
                            { value: 2, label: 'Kelainan psikis / perilaku (2)' },
                            { value: 1, label: 'Diagnosis lain-lain (1)' },
                        ]
                    },
                    {
                        field: 'gangguan_kognitif', label: 'Gangguan Kognitif',
                        options: [
                            { value: 3, label: 'Tidak sadar terhadap keterbatasan (3)' },
                            { value: 2, label: 'Lupa terhadap keterbatasan (2)' },
                            { value: 1, label: 'Mengetahui kemampuan diri (1)' },
                        ]
                    },
                    {
                        field: 'faktor_lingkungan', label: 'Faktor Lingkungan',
                        options: [
                            { value: 4, label: 'Riwayat jatuh dari tempat tidur (4)' },
                            { value: 3, label: 'Pasien menggunakan alat bantu (3)' },
                            { value: 2, label: 'Pasien berada di tempat tidur (2)' },
                            { value: 1, label: 'Di luar area perawatan (1)' },
                        ]
                    },
                    {
                        field: 'respon_operasi', label: 'Respons Operasi / Obat Penenang / Anestesi',
                        options: [
                            { value: 3, label: 'Dalam 24 jam (3)' },
                            { value: 2, label: 'Dalam 48 jam (2)' },
                            { value: 1, label: 'Lebih dari 48 jam / Tidak (1)' },
                        ]
                    },
                    {
                        field: 'penggunaan_obat', label: 'Penggunaan Obat',
                        options: [
                            { value: 3, label: 'Multipel: sedatif, hipnotik, diuretik, narkotik, dll (3)' },
                            { value: 2, label: 'Salah satu obat di atas (2)' },
                            { value: 1, label: 'Tidak ada (1)' },
                        ]
                    },
                ],
            };
        },

        computed: {
            skalaPasien() {
                const tahun = this.dataPasien?.USIA_PASIEN?.tahun ?? 99;
                return Number(tahun) < 14 ? 'HUMPTY_DUMPTY' : 'MORSE';
            },
            totalMorse() {
                const m = this.formData.morse;
                return (m.riwayat_jatuh ?? 0) + (m.diagnosa_sekunder ?? 0) +
                    (m.alat_bantu ?? 0) + (m.terapi_iv ?? 0) +
                    (m.gaya_berjalan ?? 0) + (m.status_mental ?? 0);
            },
            morseInterpretasi() {
                const s = this.totalMorse;
                if (s >= 45) return { label: 'Risiko Tinggi', severity: 'danger', keterangan: 'Perlu tindakan pencegahan jatuh intensif', bg: '#ffebee', border: '#ef9a9a', color: '#b71c1c' };
                if (s >= 25) return { label: 'Risiko Sedang', severity: 'warn', keterangan: 'Perlu tindakan pencegahan jatuh standar', bg: '#fff8e1', border: '#ffe082', color: '#e65100' };
                return { label: 'Risiko Rendah', severity: 'success', keterangan: 'Tetap lakukan orientasi lingkungan', bg: '#e8f5e9', border: '#a5d6a7', color: '#2e7d32' };
            },
            morseResultStyle() {
                const i = this.morseInterpretasi;
                return `background:${i.bg};border:1.5px solid ${i.border};color:${i.color}`;
            },
            totalHumpty() {
                const h = this.formData.humpty;
                return (h.usia ?? 1) + (h.jenis_kelamin ?? 1) + (h.diagnosis ?? 1) +
                    (h.gangguan_kognitif ?? 1) + (h.faktor_lingkungan ?? 1) +
                    (h.respon_operasi ?? 1) + (h.penggunaan_obat ?? 1);
            },
            humptyInterpretasi() {
                const s = this.totalHumpty;
                if (s >= 16) return { label: 'Risiko Tinggi', severity: 'danger', keterangan: 'Perlu tindakan pencegahan jatuh intensif', bg: '#ffebee', border: '#ef9a9a', color: '#b71c1c' };
                if (s >= 12) return { label: 'Risiko Sedang', severity: 'warn', keterangan: 'Perlu tindakan pencegahan standar', bg: '#fff8e1', border: '#ffe082', color: '#e65100' };
                return { label: 'Risiko Rendah', severity: 'success', keterangan: 'Tetap lakukan orientasi lingkungan', bg: '#e8f5e9', border: '#a5d6a7', color: '#2e7d32' };
            },
            humptyResultStyle() {
                const i = this.humptyInterpretasi;
                return `background:${i.bg};border:1.5px solid ${i.border};color:${i.color}`;
            },
            formTitle() {
                const skala = this.formData.skala === 'MORSE' ? 'Skala Morse (Dewasa)' : 'Skala Humpty Dumpty (Anak)';
                return `Pengkajian Risiko Jatuh — ${skala}`;
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
                    const res = await axios.post('/assesment/get_resiko_jatuh', { noregister: this.noregister });
                    this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoadingRiwayat = false;
                }
            },

            // ===== FORM BARU =====
            bukaFormBaru() {
                // Set skala otomatis berdasarkan usia
                this.formData.skala = this.skalaPasien;
                // Reset nilai
                this.formData.catatan = '';
                this.formData.morse = { riwayat_jatuh: 0, diagnosa_sekunder: 0, alat_bantu: 0, terapi_iv: 0, gaya_berjalan: 0, status_mental: 0 };
                // Humpty Dumpty: auto-pilih usia dari data pasien
                const tahun = Number(this.dataPasien?.USIA_PASIEN?.tahun ?? 0);
                let usiaVal = 1;
                if (tahun < 3) usiaVal = 4;
                else if (tahun < 7) usiaVal = 3;
                else if (tahun < 13) usiaVal = 2;
                const jk = this.dataPasien?.JENISKELAMIN === 'L' ? 2 : 1;
                this.formData.humpty = { usia: usiaVal, jenis_kelamin: jk, diagnosis: 4, gangguan_kognitif: 3, faktor_lingkungan: 4, respon_operasi: 3, penggunaan_obat: 3 };
                this.showForm = true;
            },

            // ===== SIMPAN =====
            async simpan() {
                this.isSaving = true;
                try {
                    const isMorse = this.formData.skala === 'MORSE';
                    const skor = isMorse ? this.totalMorse : this.totalHumpty;
                    const interpretasi = isMorse ? this.morseInterpretasi.label : this.humptyInterpretasi.label;

                    const detail_items = isMorse
                        ? this.buildDetailMorse()
                        : this.buildDetailHumpty();

                    const payload = {
                        noregister: this.noregister,
                        skala: this.formData.skala,
                        skor_total: skor,
                        interpretasi,
                        catatan: this.formData.catatan || '',
                        detail_items,
                        parameter_json: isMorse
                            ? JSON.stringify(this.formData.morse)
                            : JSON.stringify(this.formData.humpty),
                    };

                    const res = await axios.post('/assesment/simpan_resiko_jatuh', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        this.showForm = false;
                        this.open('success', 'Pengkajian risiko jatuh berhasil disimpan');
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

            buildDetailMorse() {
                const m = this.formData.morse;
                return [
                    { parameter: 'Riwayat Jatuh', jawaban: m.riwayat_jatuh === 25 ? 'Ya' : 'Tidak', skor: m.riwayat_jatuh },
                    { parameter: 'Diagnosa Sekunder', jawaban: m.diagnosa_sekunder === 15 ? 'Ya' : 'Tidak', skor: m.diagnosa_sekunder },
                    { parameter: 'Alat Bantu Jalan', jawaban: this.labelMorseAlatBantu(m.alat_bantu), skor: m.alat_bantu },
                    { parameter: 'Terapi Intravena / Infus', jawaban: m.terapi_iv === 20 ? 'Ya' : 'Tidak', skor: m.terapi_iv },
                    { parameter: 'Cara Berjalan', jawaban: this.labelMorseGaya(m.gaya_berjalan), skor: m.gaya_berjalan },
                    { parameter: 'Status Mental', jawaban: m.status_mental === 15 ? 'Lupa akan keterbatasan diri' : 'Orientasi sesuai kemampuan', skor: m.status_mental },
                ];
            },
            labelMorseAlatBantu(v) {
                if (v === 30) return 'Berpegangan benda sekitar / Mebel';
                if (v === 15) return 'Kruk / Tongkat / Walker';
                return 'Tidak ada / Bed rest / Dibantu perawat';
            },
            labelMorseGaya(v) {
                if (v === 20) return 'Terganggu / Tidak normal';
                if (v === 10) return 'Lemah';
                return 'Normal / Tirah baring / Kursi roda';
            },

            buildDetailHumpty() {
                const h = this.formData.humpty;
                const usiaCaptions = { 4: 'Di bawah 3 tahun', 3: '3–7 tahun', 2: '7–13 tahun', 1: '≥13 tahun' };
                const diagCaptions = { 4: 'Kelainan neurologis', 3: 'Perubahan oksigenasi', 2: 'Kelainan psikis/perilaku', 1: 'Diagnosis lain' };
                const kognitifCaptions = { 3: 'Tidak sadar terhadap keterbatasan', 2: 'Lupa terhadap keterbatasan', 1: 'Mengetahui kemampuan diri' };
                const lingkCaptions = { 4: 'Riwayat jatuh dari tempat tidur', 3: 'Menggunakan alat bantu', 2: 'Berada di tempat tidur', 1: 'Di luar area perawatan' };
                const responCaptions = { 3: 'Dalam 24 jam', 2: 'Dalam 48 jam', 1: '>48 jam / Tidak' };
                const obatCaptions = { 3: 'Multipel obat', 2: 'Salah satu obat', 1: 'Tidak ada' };
                return [
                    { parameter: 'Usia', jawaban: usiaCaptions[h.usia] || h.usia, skor: h.usia },
                    { parameter: 'Jenis Kelamin', jawaban: h.jenis_kelamin === 2 ? 'Laki-laki' : 'Perempuan', skor: h.jenis_kelamin },
                    { parameter: 'Diagnosis', jawaban: diagCaptions[h.diagnosis] || h.diagnosis, skor: h.diagnosis },
                    { parameter: 'Gangguan Kognitif', jawaban: kognitifCaptions[h.gangguan_kognitif] || h.gangguan_kognitif, skor: h.gangguan_kognitif },
                    { parameter: 'Faktor Lingkungan', jawaban: lingkCaptions[h.faktor_lingkungan] || h.faktor_lingkungan, skor: h.faktor_lingkungan },
                    { parameter: 'Respons Operasi/Obat Penenang', jawaban: responCaptions[h.respon_operasi] || h.respon_operasi, skor: h.respon_operasi },
                    { parameter: 'Penggunaan Obat', jawaban: obatCaptions[h.penggunaan_obat] || h.penggunaan_obat, skor: h.penggunaan_obat },
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
                    group: 'kajianResikoJatuh',
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
                    await axios.post('/assesment/hapus_resiko_jatuh', {
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
            getSeverityFromInterpretasi(val) {
                if (!val) return 'secondary';
                const v = val.toUpperCase();
                if (v.includes('TINGGI')) return 'danger';
                if (v.includes('SEDANG')) return 'warn';
                if (v.includes('RENDAH')) return 'success';
                return 'secondary';
            },
            getIconFromInterpretasi(val) {
                if (!val) return 'pi pi-minus';
                const v = val.toUpperCase();
                if (v.includes('TINGGI')) return 'pi pi-exclamation-triangle';
                if (v.includes('SEDANG')) return 'pi pi-clock';
                return 'pi pi-check-circle';
            },
        }
    }
</script>
