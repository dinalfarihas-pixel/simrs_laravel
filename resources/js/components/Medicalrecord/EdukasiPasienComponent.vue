<template>
    <section>
        <ConfirmDialog group="edukasiPasien" />

        <!-- ===== DIALOG: TTE PPA ===== -->
        <Dialog header="Tanda Tangan Elektronik (TTE) PPA" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" class="container_modal" :modal="true">
            <otorisasi-form @getvalue="handleValueOto" :mode="17" :noregister="String(idDetailAktif)"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: TAMBAH SESI EDUKASI ===== -->
        <Dialog v-model:visible="showForm" :header="'Sesi Edukasi — ' + formSesi.materi_label" :modal="true"
            :style="{ width: '750px' }" :closable="!isSaving">
            <div v-if="currentMateri && currentMateri.note" class="mb-3 p-2"
                style="background:#fff8e1;border-radius:6px;font-size:0.85em;color:#795548">
                <i class="pi pi-info-circle mr-1"></i>{{ currentMateri.note }}
            </div>

            <!-- Sub Item Materi -->
            <div v-if="currentMateri && currentMateri.subItems.length" class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Poin yang Disampaikan</label>
                <div style="display:flex;flex-direction:column;gap:6px">
                    <div v-for="item in currentMateri.subItems" :key="item" style="display:flex;align-items:flex-start;gap:8px">
                        <Checkbox :inputId="'sub_' + item" v-model="formSesi.sub_items" :value="item" />
                        <label :for="'sub_' + item" style="cursor:pointer;margin:0">{{ item }}</label>
                    </div>
                </div>
            </div>

            <!-- Tanggal & Jam -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:4px">Tanggal &amp; Jam Edukasi</label>
                <Calendar v-model="formSesi.waktu_edukasi" showTime hourFormat="24" dateFormat="dd/mm/yy"
                    :showIcon="true" style="width:100%" />
            </div>

            <!-- Metoda & Durasi -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Metoda &amp; Durasi</label>
                <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px">
                    <div v-for="opt in metodaOptions" :key="opt" style="display:flex;align-items:center;gap:6px">
                        <Checkbox :inputId="'metoda_' + opt" v-model="formSesi.metoda" :value="opt" />
                        <label :for="'metoda_' + opt" style="cursor:pointer;margin:0">{{ opt }}</label>
                    </div>
                </div>
                <InputText v-model="formSesi.metoda_lainnya" placeholder="Metoda lain-lain (opsional)" class="mb-2" style="width:100%" />
                <InputGroup style="max-width:220px">
                    <InputGroupAddon>Durasi</InputGroupAddon>
                    <InputNumber v-model="formSesi.durasi_menit" :min="0" />
                    <InputGroupAddon>menit</InputGroupAddon>
                </InputGroup>
            </div>

            <!-- Profesi / Nama Edukator -->
            <div class="mb-3 row">
                <div class="col-md-6">
                    <label style="font-weight:600;display:block;margin-bottom:4px">Profesi Edukator (PPA)</label>
                    <InputText v-model="formSesi.profesi_edukator" style="width:100%" placeholder="Contoh: Dokter (DPJP)" />
                </div>
                <div class="col-md-6">
                    <label style="font-weight:600;display:block;margin-bottom:4px">Nama Edukator</label>
                    <InputText v-model="formSesi.nama_edukator" style="width:100%" placeholder="Nama petugas" />
                </div>
            </div>

            <!-- Evaluasi Pemahaman -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Evaluasi Pemahaman</label>
                <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px">
                    <div v-for="opt in evaluasiOptions" :key="opt" style="display:flex;align-items:center;gap:6px">
                        <Checkbox :inputId="'evaluasi_' + opt" v-model="formSesi.evaluasi_pemahaman" :value="opt" />
                        <label :for="'evaluasi_' + opt" style="cursor:pointer;margin:0">{{ opt }}</label>
                    </div>
                </div>
                <InputText v-model="formSesi.evaluasi_lainnya" placeholder="Evaluasi lain-lain (opsional)" style="width:100%" />
            </div>

            <!-- Sasaran Edukasi -->
            <div class="mb-3">
                <label style="font-weight:600;display:block;margin-bottom:8px">Sasaran Edukasi</label>
                <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:8px">
                    <div v-for="opt in sasaranOptions" :key="opt" style="display:flex;align-items:center;gap:6px">
                        <Checkbox :inputId="'sasaran_' + opt" v-model="formSesi.sasaran_edukasi" :value="opt" />
                        <label :for="'sasaran_' + opt" style="cursor:pointer;margin:0">{{ opt }}</label>
                    </div>
                </div>
                <InputText v-model="formSesi.sasaran_lainnya" placeholder="Sasaran lain-lain (opsional)" style="width:100%" />
            </div>

            <!-- Tanda Tangan Pasien / Keluarga -->
            <div class="mb-2">
                <label style="font-weight:600;display:block;margin-bottom:4px">Tanda Tangan Pasien / Keluarga</label>
                <div style="text-align:center">
                    <canvas ref="ttdCanvas" width="400" height="150"
                        style="border:1.5px solid #ccc;border-radius:6px;background:#fff;touch-action:none;cursor:crosshair"
                        @mousedown="beginDrawTtd" @mousemove="drawTtd" @mouseup="stopDrawTtd" @mouseleave="stopDrawTtd">
                    </canvas>
                    <div class="mt-1">
                        <Button label="Bersihkan" icon="pi pi-times" severity="secondary" text size="small" @click="clearTtdCanvas()" />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" severity="secondary" text @click="showForm=false" :disabled="isSaving" />
                <Button label="Simpan Sesi Edukasi" icon="pi pi-save" severity="success" @click="simpanSesi()" :loading="isSaving" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">
            <!-- ===== INFO PASIEN ===== -->
            <Card v-if="!datapasien" class="mb-3">
                <template #content>
                    <div v-if="isLoadingPasien" class="text-center py-3">
                        <ProgressBar mode="indeterminate" style="height:.3em" />
                    </div>
                    <div v-else class="row align-items-center">
                        <div class="col-md-1 text-center">
                            <div style="width:52px;height:52px;border-radius:50%;background:#e3f2fd;display:inline-flex;align-items:center;justify-content:center">
                                <i class="pi pi-book" style="font-size:1.5em;color:#1565c0"></i>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div style="font-weight:700;font-size:1.1em;color:#1a1a2e">
                                {{ dataPasien.DATA_SINGKAT || '—' }}
                            </div>
                            <div style="color:#666;margin-top:2px">
                                No. RM: <strong>{{ dataPasien.NOMR || '—' }}</strong>
                                &nbsp;|&nbsp; No. Reg: <code>{{ noregister }}</code>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div style="color:#555;font-size:0.85rem"><i class="pi pi-calendar mr-1"></i>
                                Masuk: <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong></div>
                            <div style="color:#555;margin-top:4px"><i class="pi pi-user-edit mr-1"></i>
                                DPJP: <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong></div>
                        </div>
                    </div>
                </template>
            </Card>
            <!-- ===== HAMBATAN PEMBERIAN EDUKASI ===== -->
            <Card class="mb-3">
                <template #title>
                    <i class="pi pi-exclamation-circle mr-2" style="color:#1565c0"></i>
                    Hambatan Pemberian Edukasi pada Pasien dan Keluarga
                </template>
                <template #content>
                    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
                        <div v-for="opt in hambatanOptions" :key="opt" style="display:flex;align-items:center;gap:8px">
                            <Checkbox :inputId="'hambatan_' + opt" v-model="hambatanForm.hambatan" :value="opt" />
                            <label :for="'hambatan_' + opt" style="cursor:pointer;margin:0">{{ opt }}</label>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <Checkbox inputId="hambatan_tidakada" v-model="hambatanForm.hambatan" value="Tidak ada" />
                            <label for="hambatan_tidakada" style="cursor:pointer;margin:0">Tidak ada</label>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px">
                            <Checkbox inputId="hambatan_lainlain" v-model="hambatanForm.hambatan" value="Lain-lain" />
                            <label for="hambatan_lainlain" style="cursor:pointer;margin:0">Lain-lain</label>
                        </div>
                    </div>

                    <div v-if="hambatanForm.hambatan.includes('Tidak bisa berbahasa Indonesia')" class="mb-2">
                        <InputText v-model="hambatanForm.bahasa_digunakan" style="width:100%" placeholder="Bahasa yang digunakan" />
                        <InputText v-model="hambatanForm.nama_penerjemah" class="mt-2" style="width:100%"
                            placeholder="Nama & paraf penerjemah (jika perlu penerjemah)" />
                    </div>
                    <div v-if="hambatanForm.hambatan.includes('Lain-lain')" class="mb-2">
                        <InputText v-model="hambatanForm.hambatan_lainnya" style="width:100%" placeholder="Sebutkan hambatan lainnya" />
                    </div>

                    <Button label="Simpan Hambatan Edukasi" icon="pi pi-save" severity="success" size="small"
                        @click="simpanHambatan()" :loading="isSavingHambatan" />
                </template>
            </Card>

            <!-- ===== TABEL MATERI EDUKASI ===== -->
            <Card>
                <template #title>
                    <div style="display:flex;align-items:center;justify-content:space-between">
                        <div>
                            <i class="pi pi-list mr-2" style="color:#1565c0"></i>
                            Materi Edukasi
                        </div>
                        <Button icon="pi pi-refresh" severity="secondary" outlined size="small"
                            v-tooltip="'Muat ulang'" @click="fetchRiwayatEdukasi()" :loading="isLoadingRiwayat" />
                    </div>
                </template>
                <template #content>
                    <DataTable :value="materiEdukasiList" dataKey="kode" v-model:expandedRows="expandedRows" size="small" stripedRows>
                        <Column expander style="width:40px" />
                        <Column header="No" style="width:44px;text-align:center">
                            <template #body="s">{{ s.data.kode }}</template>
                        </Column>
                        <Column header="Materi Edukasi" style="min-width:220px">
                            <template #body="s">
                                <div style="font-weight:700">{{ s.data.label }}</div>
                                <small style="color:#888">{{ s.data.defaultProfesi }}</small>
                            </template>
                        </Column>
                        <Column header="Sesi Tercatat" style="width:130px;text-align:center">
                            <template #body="s">
                                <Tag :value="String((riwayatByMateri[s.data.kode] || []).length)"
                                    :severity="(riwayatByMateri[s.data.kode] || []).length > 0 ? 'success' : 'secondary'" />
                            </template>
                        </Column>
                        <Column header="Aksi" style="width:170px;text-align:center">
                            <template #body="s">
                                <Button label="Tambah Sesi" icon="pi pi-plus" size="small" severity="success"
                                    @click="bukaFormSesi(s.data)" />
                            </template>
                        </Column>

                        <template #expansion="s">
                            <div class="p-3" style="background:#fafafa">
                                <DataTable :value="riwayatByMateri[s.data.kode] || []" size="small" showGridlines>
                                    <template #empty>
                                        <div class="text-center py-3" style="color:#aaa">Belum ada sesi edukasi untuk materi ini.</div>
                                    </template>
                                    <Column header="Waktu" style="min-width:140px">
                                        <template #body="r">{{ formatWaktu(r.data.waktu_edukasi) }}</template>
                                    </Column>
                                    <Column header="Metoda" style="min-width:150px">
                                        <template #body="r">
                                            <span>{{ (r.data.metoda || []).join(', ') }}</span>
                                            <span v-if="r.data.metoda_lainnya"> ({{ r.data.metoda_lainnya }})</span>
                                            <div v-if="r.data.durasi_menit" style="color:#888;font-size:0.85em">{{ r.data.durasi_menit }} menit</div>
                                        </template>
                                    </Column>
                                    <Column header="Edukator" style="min-width:150px">
                                        <template #body="r">
                                            <div>{{ r.data.nama_edukator || '—' }}</div>
                                            <small style="color:#888">{{ r.data.profesi_edukator }}</small>
                                        </template>
                                    </Column>
                                    <Column header="Evaluasi" style="min-width:150px">
                                        <template #body="r">
                                            <Tag v-for="e in r.data.evaluasi_pemahaman" :key="e" :value="e"
                                                :severity="e.toUpperCase().includes('ULANG') ? 'warn' : 'success'" class="mr-1 mb-1" />
                                        </template>
                                    </Column>
                                    <Column header="Sasaran" style="min-width:130px">
                                        <template #body="r">{{ (r.data.sasaran_edukasi || []).join(', ') }}</template>
                                    </Column>
                                    <Column header="TTD Pasien/Klg" style="min-width:130px;text-align:center">
                                        <template #body="r">
                                            <img v-if="r.data.ttd_pasien_keluarga" :src="r.data.ttd_pasien_keluarga"
                                                style="max-height:40px;max-width:120px;border:1px solid #eee;border-radius:4px" />
                                            <small v-else style="color:#ccc">—</small>
                                        </template>
                                    </Column>
                                    <Column header="TTE PPA" style="width:150px;text-align:center">
                                        <template #body="r">
                                            <div v-if="r.data.auth == 1">
                                                <qrcode-vue :value="'TTE-' + r.data.id_detail" :size="42" level="H"></qrcode-vue>
                                                <div style="font-size:0.75em;color:#2e7d32;font-weight:600">{{ r.data.auth_name || r.data.auth_by }}</div>
                                                <small style="color:#888">{{ formatWaktu(r.data.jam_auth) }}</small>
                                            </div>
                                            <Button v-else icon="pi pi-lock-open" size="small" severity="warning"
                                                label="TTE" v-tooltip="'Tanda Tangani (PPA)'" @click="call_oto(r.data.id_detail)" />
                                        </template>
                                    </Column>
                                    <Column header="Aksi" style="width:60px;text-align:center">
                                        <template #body="r">
                                            <Button icon="pi pi-trash" size="small" severity="danger" outlined
                                                v-tooltip="'Hapus'" @click="konfirmasiHapusSesi(r.data)" />
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </template>
                    </DataTable>
                </template>
            </Card>
        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import QrcodeVue from 'qrcode.vue';

    export default {
        components: {
            QrcodeVue,
        },
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
                isSavingHambatan: false,
                riwayat: [],
                expandedRows: {},

                showOtorisasi: false,
                idDetailAktif: 0,

                showForm: false,
                formSesi: {
                    materi_kode: null,
                    materi_label: '',
                    sub_items: [],
                    waktu_edukasi: null,
                    metoda: [],
                    metoda_lainnya: '',
                    durasi_menit: null,
                    profesi_edukator: '',
                    nama_edukator: '',
                    evaluasi_pemahaman: [],
                    evaluasi_lainnya: '',
                    sasaran_edukasi: [],
                    sasaran_lainnya: '',
                },

                isDrawingTtd: false,
                ttdX: 0,
                ttdY: 0,
                ttdHasSignature: false,

                hambatanForm: {
                    hambatan: [],
                    bahasa_digunakan: '',
                    nama_penerjemah: '',
                    hambatan_lainnya: '',
                },

                hambatanOptions: [
                    'Penglihatan terganggu',
                    'Pendengaran kurang',
                    'Tidak bisa berbahasa Indonesia',
                    'Hambatan kognitif / disabilitas intelektual',
                ],
                metodaOptions: ['Diskusi', 'Demonstrasi', 'Ceramah', 'Simulasi', 'Observasi'],
                evaluasiOptions: ['Mampu mengerti', 'Mampu memahami', 'Perlu edukasi ulang'],
                sasaranOptions: ['Pasien', 'Pasangan (istri/suami)', 'Orang tua', 'Saudara kandung'],

                materiEdukasiList: [
                    {
                        kode: '1', label: 'Dokter Spesialis / DPJP', defaultProfesi: 'Dokter (DPJP)',
                        subItems: [
                            'Penjelasan perjalanan penyakit (penyebab, tanda & gejala)',
                            'Hasil pemeriksaan',
                            'Penjelasan tentang diagnosa',
                            'Tindakan medis',
                            'Perkiraan hari keperawatan',
                            'Penjelasan komplikasi',
                            'Diagnosa saat ini (single/multi)',
                        ],
                    },
                    {
                        kode: '2', label: 'Nutrisi', defaultProfesi: 'Ahli Gizi',
                        subItems: [
                            'Status gizi dan penjelasan makanan RS',
                            'Diet selama perawatan',
                            'Diet untuk di rumah',
                        ],
                    },
                    {
                        kode: '3', label: 'IMD dan ASI Eksklusif', defaultProfesi: 'Bidan / Perawat',
                        subItems: [
                            'Pentingnya IMD untuk kesehatan ibu dan bayi',
                            'Manfaat ASI untuk kesehatan ibu dan bayi',
                        ],
                    },
                    {
                        kode: '4', label: 'PMK (Perawatan Metode Kangguru)', defaultProfesi: 'Bidan / Perawat',
                        subItems: [
                            'Manfaat PMK pada bayi BBLR',
                            'Anjuran untuk PMK di rumah',
                        ],
                    },
                    {
                        kode: '5', label: 'Manajemen Nyeri', defaultProfesi: 'Dokter / Perawat',
                        subItems: ['Farmakologi', 'Non farmakologi'],
                    },
                    {
                        kode: '6', label: 'Kerohanian / Bimbingan Spiritual', defaultProfesi: 'Rohaniwan / Perawat',
                        subItems: [
                            'Pendampingan sesuai keyakinan / agama pasien',
                            'Konseling kerohanian',
                        ],
                    },
                    {
                        kode: '7', label: 'Perencanaan Pulang (Discharge Planning)', defaultProfesi: 'Dokter / Perawat',
                        subItems: [
                            'Rencana kontrol / kontrol ulang',
                            'Tanda bahaya yang harus diwaspadai',
                            'Perawatan lanjutan di rumah',
                        ],
                    },
                    {
                        kode: '8', label: 'Edukasi Obat-obatan', defaultProfesi: 'Apoteker / Farmasi',
                        subItems: [
                            'Nama obat, dosis, dan cara penggunaan',
                            'Efek samping obat',
                            'Penyimpanan obat di rumah',
                        ],
                    },
                    {
                        kode: '9', label: 'Keamanan dan Efektivitas Penggunaan Peralatan Medis', defaultProfesi: 'Perawat',
                        subItems: ['Infus', 'Oksigen', 'Nebulizer'],
                    },
                    {
                        kode: '10', label: 'Cara Mencuci Tangan yang Baik dan Benar', defaultProfesi: 'Perawat / PPI',
                        note: 'Five moments sebelum dan sesudah tindakan',
                        subItems: ['Handwash 40–60 detik', 'Handrub 20–30 detik'],
                    },
                    {
                        kode: '11', label: 'Hak dan Kewajiban Pasien', defaultProfesi: 'Petugas Admisi / PPA',
                        note: 'Sesuai UU No. 17 Tahun 2023 tentang Kesehatan dan ketentuan Rumah Sakit (rincian 18 poin hak pasien — lampirkan/tempel leaflet Hak & Kewajiban Pasien)',
                        subItems: [],
                    },
                ],
            };
        },

        computed: {
            currentMateri() {
                return this.materiEdukasiList.find(m => m.kode === this.formSesi.materi_kode) || null;
            },
            riwayatByMateri() {
                const map = {};
                this.riwayat.forEach(r => {
                    if (!map[r.materi_kode]) map[r.materi_kode] = [];
                    map[r.materi_kode].push(r);
                });
                return map;
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

            this.fetchHambatan();
            this.fetchRiwayatEdukasi();
        },

        watch: {
            noregisterProp(val) {
                if (val) {
                    this.noregister = val;
                    this.fetchHambatan();
                    this.fetchRiwayatEdukasi();
                }
            },
            datapasien(val) {
                if (val) {
                    this.dataPasien = val;
                }
            },
            'hambatanForm.hambatan': {
                deep: true,
                handler(newVal, oldVal) {
                    if (newVal.includes('Tidak ada') && !oldVal.includes('Tidak ada')) {
                        this.hambatanForm.hambatan = ['Tidak ada'];
                    } else if (newVal.length > 1 && newVal.includes('Tidak ada') && oldVal.includes('Tidak ada')) {
                        this.hambatanForm.hambatan = newVal.filter(v => v !== 'Tidak ada');
                    }
                },
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

            // ===== HAMBATAN EDUKASI =====
            async fetchHambatan() {
                try {
                    const res = await axios.post('/assesment/get_hambatan_edukasi', { noregister: this.noregister });
                    const data = res.data?.response;
                    if (data) {
                        this.hambatanForm.hambatan = Array.isArray(data.hambatan) ? data.hambatan : [];
                        this.hambatanForm.bahasa_digunakan = data.bahasa_digunakan || '';
                        this.hambatanForm.nama_penerjemah = data.nama_penerjemah || '';
                        this.hambatanForm.hambatan_lainnya = data.hambatan_lainnya || '';
                    }
                } catch (e) {
                    console.error(e);
                }
            },
            async simpanHambatan() {
                this.isSavingHambatan = true;
                try {
                    const payload = {
                        noregister: this.noregister,
                        hambatan: this.hambatanForm.hambatan,
                        bahasa_digunakan: this.hambatanForm.bahasa_digunakan,
                        nama_penerjemah: this.hambatanForm.nama_penerjemah,
                        hambatan_lainnya: this.hambatanForm.hambatan_lainnya,
                    };
                    const res = await axios.post('/assesment/simpan_hambatan_edukasi', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        this.open('success', 'Hambatan edukasi berhasil disimpan');
                    } else {
                        this.open('error', res.data?.message || 'Gagal menyimpan hambatan edukasi');
                    }
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                } finally {
                    this.isSavingHambatan = false;
                }
            },

            // ===== RIWAYAT SESI EDUKASI =====
            async fetchRiwayatEdukasi() {
                this.isLoadingRiwayat = true;
                try {
                    const res = await axios.post('/assesment/get_edukasi_pasien', { noregister: this.noregister });
                    this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoadingRiwayat = false;
                }
            },

            // ===== FORM SESI =====
            bukaFormSesi(materi) {
                this.formSesi = {
                    materi_kode: materi.kode,
                    materi_label: materi.label,
                    sub_items: [],
                    waktu_edukasi: new Date(),
                    metoda: [],
                    metoda_lainnya: '',
                    durasi_menit: null,
                    profesi_edukator: materi.defaultProfesi,
                    nama_edukator: '',
                    evaluasi_pemahaman: [],
                    evaluasi_lainnya: '',
                    sasaran_edukasi: [],
                    sasaran_lainnya: '',
                };
                this.showForm = true;
                this.$nextTick(() => this.clearTtdCanvas());
            },

            async simpanSesi() {
                if (!this.formSesi.materi_kode) {
                    this.open('error', 'Materi edukasi belum dipilih');
                    return;
                }
                this.isSaving = true;
                try {
                    const payload = {
                        noregister: this.noregister,
                        materi_kode: this.formSesi.materi_kode,
                        materi_label: this.formSesi.materi_label,
                        sub_items: this.formSesi.sub_items,
                        waktu_edukasi: this.toMysqlDatetime(this.formSesi.waktu_edukasi),
                        metoda: this.formSesi.metoda,
                        metoda_lainnya: this.formSesi.metoda_lainnya,
                        durasi_menit: this.formSesi.durasi_menit,
                        profesi_edukator: this.formSesi.profesi_edukator,
                        nama_edukator: this.formSesi.nama_edukator,
                        evaluasi_pemahaman: this.formSesi.evaluasi_pemahaman,
                        evaluasi_lainnya: this.formSesi.evaluasi_lainnya,
                        sasaran_edukasi: this.formSesi.sasaran_edukasi,
                        sasaran_lainnya: this.formSesi.sasaran_lainnya,
                    };
                    const res = await axios.post('/assesment/simpan_sesi_edukasi', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        const idDetail = res.data?.id_detail ?? res.data?.response?.id_detail;
                        if (idDetail && this.ttdHasSignature) {
                            await this.uploadTtdPasien(idDetail);
                        }
                        this.showForm = false;
                        this.open('success', 'Sesi edukasi berhasil disimpan');
                        await this.fetchRiwayatEdukasi();
                        this.expandedRows = { ...this.expandedRows, [this.formSesi.materi_kode]: true };
                    } else {
                        this.open('error', res.data?.message || 'Gagal menyimpan sesi edukasi');
                    }
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                } finally {
                    this.isSaving = false;
                }
            },

            // ===== HAPUS SESI =====
            konfirmasiHapusSesi(row) {
                this.$confirm.require({
                    group: 'edukasiPasien',
                    message: `Hapus sesi edukasi tanggal ${this.formatWaktu(row.waktu_edukasi)}? Tindakan ini tidak dapat dibatalkan.`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => {
                        this.hapusSesi(row);
                    },
                });
            },
            async hapusSesi(row) {
                try {
                    await axios.post('/assesment/hapus_sesi_edukasi', {
                        noregister: this.noregister,
                        id_detail: row.id_detail,
                    });
                    this.open('info', 'Sesi edukasi berhasil dihapus');
                    await this.fetchRiwayatEdukasi();
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                }
            },

            // ===== TANDA TANGAN PASIEN / KELUARGA (CANVAS) =====
            clearTtdCanvas() {
                const canvas = this.$refs.ttdCanvas;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.ttdHasSignature = false;
            },
            drawTtdLine(x1, y1, x2, y2) {
                const canvas = this.$refs.ttdCanvas;
                const ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.strokeStyle = '#1a1a2e';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
            },
            beginDrawTtd(e) {
                this.ttdX = e.offsetX;
                this.ttdY = e.offsetY;
                this.isDrawingTtd = true;
            },
            drawTtd(e) {
                if (!this.isDrawingTtd) return;
                this.drawTtdLine(this.ttdX, this.ttdY, e.offsetX, e.offsetY);
                this.ttdX = e.offsetX;
                this.ttdY = e.offsetY;
                this.ttdHasSignature = true;
            },
            stopDrawTtd(e) {
                if (!this.isDrawingTtd) return;
                this.drawTtdLine(this.ttdX, this.ttdY, e.offsetX, e.offsetY);
                this.isDrawingTtd = false;
            },
            uploadTtdPasien(idDetail) {
                return new Promise((resolve) => {
                    const canvas = this.$refs.ttdCanvas;
                    canvas.toBlob(async (blob) => {
                        try {
                            const formData = new FormData();
                            formData.append('noregister', this.noregister);
                            formData.append('id_detail', idDetail);
                            formData.append('image', blob, 'ttd.png');
                            await axios.post('/assesment/upload_ttd_edukasi', formData, {
                                headers: { 'Content-Type': 'multipart/form-data' },
                            });
                        } catch (e) {
                            console.error(e);
                        } finally {
                            resolve();
                        }
                    }, 'image/png');
                });
            },

            // ===== TTE PPA =====
            call_oto(idDetail) {
                this.idDetailAktif = idDetail;
                this.showOtorisasi = true;
            },
            async handleValueOto(code) {
                if (code == 200) {
                    this.showOtorisasi = false;
                    this.open('success', 'TTE PPA berhasil dilakukan');
                    await this.fetchRiwayatEdukasi();
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
            toMysqlDatetime(date) {
                if (!date) return null;
                const d = new Date(date);
                const dd   = String(d.getDate()).padStart(2, '0');
                const mm   = String(d.getMonth() + 1).padStart(2, '0');
                const yyyy = d.getFullYear();
                const hh   = String(d.getHours()).padStart(2, '0');
                const min  = String(d.getMinutes()).padStart(2, '0');
                return `${yyyy}-${mm}-${dd} ${hh}:${min}:00`;
            },

            // ===== NOTIFIKASI =====
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        }
    }
</script>
