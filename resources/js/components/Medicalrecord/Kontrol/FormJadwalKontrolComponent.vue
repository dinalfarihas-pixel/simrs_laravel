<template>
    <section class="content">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Page Header -->
            <div class="fk-page-header">
                <Button icon="pi pi-arrow-left" severity="secondary" text rounded @click="kembali()" />
                <div>
                    <h5 class="fk-page-title">Form Jadwal Kontrol Ulang</h5>
                    <small class="fk-page-sub">Buat jadwal kontrol ulang untuk pasien</small>
                </div>
            </div>
            <!-- Info Pasien -->
            <Card class="fk-card mb-3">
                <template #title>
                    <div class="fk-card-title">
                        <i class="pi pi-id-card"></i>
                        <span>Informasi Pasien</span>
                    </div>
                </template>
                <template #content>
                    <div v-if="data_pasien.NAMAPASIEN" class="fk-patient-grid">
                        <div class="fk-info-item">
                            <span class="fk-info-label">Nama Pasien</span>
                            <span class="fk-info-value">{{ data_pasien.NAMAPASIEN }}</span>
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">No. MR</span>
                            <span class="fk-info-value">{{ data_pasien.NOMR }}</span>
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">No. Pendaftaran</span>
                            <span class="fk-info-value">{{ data_pasien.NOPENDAFTARAN }}</span>
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">Dokter DPJP</span>
                            <span class="fk-info-value">{{ data_pasien.NAMADOKTER }}</span>
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">Ruangan</span>
                            <span class="fk-info-value">{{ data_pasien.NAMA_RUANGAN }}</span>
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">Cara Bayar</span>
                            <Tag :value="data_pasien.CARABAYAR" severity="info" />
                        </div>
                        <div class="fk-info-item">
                            <span class="fk-info-label">Tanggal Masuk</span>
                            <span class="fk-info-value">{{ data_pasien.MASUKPOLY }}</span>
                        </div>
                    </div>
                    <div v-else class="fk-loading-info">
                        <i class="pi pi-spin pi-spinner"></i>
                        <span>Memuat data pasien...</span>
                    </div>
                </template>
            </Card>

            <!-- Form Jadwal -->
            <Card class="fk-card">
                <template #title>
                    <div class="fk-card-title">
                        <i class="pi pi-calendar-plus fk-icon-green"></i>
                        <span>Jadwal Kontrol Ulang</span>
                    </div>
                </template>
                <template #content>
                    <Message v-if="validationMsg" severity="warn" :closable="false" class="mb-3">
                        {{ validationMsg }}
                    </Message>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="fk-label">Tanggal Kontrol Ulang <span class="fk-required">*</span></label>
                            <div class="fk-date-nav">
                                <Button icon="pi pi-chevron-left" severity="secondary" outlined
                                    :disabled="!form.tanggal_kontrol"
                                    @click="geserTanggal(-1)" />
                                <DatePicker v-model="form.tanggal_kontrol" :showIcon="true"
                                    dateFormat="dd/mm/yy" style="flex: 1;"
                                    placeholder="Pilih tanggal kontrol"
                                    @update:modelValue="onTanggalChange" />
                                <Button icon="pi pi-chevron-right" severity="secondary" outlined
                                    :disabled="!form.tanggal_kontrol"
                                    @click="geserTanggal(1)" />
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="fk-label">Poli Tujuan <span class="fk-required">*</span></label>
                            <Select v-model="selectedPoli" :options="dataPoly" optionLabel="NAMA"
                                placeholder="Pilih poli tujuan" style="width: 100%;"
                                :filter="true" filterPlaceholder="Cari poli..." />
                        </div>

                        <!-- Dokter & Jadwal (dinamis dari API) -->
                        <div class="col-md-12 mb-3">
                            <label class="fk-label">
                                Pilih Dokter &amp; Jadwal Praktek
                                <span class="fk-optional">(opsional)</span>
                            </label>

                            <!-- Hint: belum pilih poli / tanggal -->
                            <div v-if="!selectedPoli || !form.tanggal_kontrol" class="fk-dokter-hint">
                                <i class="pi pi-info-circle"></i>
                                Pilih <strong>poli tujuan</strong> dan <strong>tanggal</strong> terlebih dahulu untuk melihat jadwal dokter yang tersedia.
                            </div>

                            <!-- Loading -->
                            <div v-else-if="loadingDokter" class="fk-dokter-loading">
                                <i class="pi pi-spin pi-spinner"></i>
                                <span>Memuat jadwal dokter...</span>
                            </div>

                            <!-- Empty -->
                            <div v-else-if="dataDokter.length === 0" class="fk-dokter-empty">
                                <i class="pi pi-calendar-times"></i>
                                <span>Tidak ada dokter yang praktek pada poli &amp; tanggal ini.</span>
                            </div>

                            <!-- List kartu jadwal dokter -->
                            <div v-else class="fk-dokter-list">
                                <div
                                    v-for="(dokter, idx) in dataDokter"
                                    :key="idx"
                                    class="fk-dokter-card"
                                    :class="{ 'fk-dokter-card--selected': selectedDokter === dokter }"
                                    @click="selectedDokter = dokter"
                                >
                                    <div class="fk-dokter-card-left">
                                        <div class="fk-dokter-card-icon">
                                            <i class="pi pi-user-plus"></i>
                                        </div>
                                    </div>
                                    <div class="fk-dokter-card-body">
                                        <div class="fk-dokter-card-nama">{{ dokter.namaDokter }}</div>
                                        <div class="fk-dokter-card-meta">
                                            <span class="fk-dokter-card-jam">
                                                <i class="pi pi-clock"></i> {{ dokter.jadwalPraktek }}
                                            </span>
                                            <span class="fk-dokter-card-kapasitas">
                                                <i class="pi pi-users"></i> {{ dokter.kapasitas }} pasien
                                            </span>
                                        </div>
                                    </div>
                                    <div class="fk-dokter-card-right">
                                        <i v-if="selectedDokter === dokter" class="pi pi-check-circle fk-check-icon"></i>
                                        <i v-else class="pi pi-circle fk-uncheck-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </template>
                <template #footer>
                    <div class="fk-footer-actions">
                        <Button label="Batal" icon="pi pi-times" severity="secondary" outlined
                            @click="kembali()" />
                        <Button label="Terbitkan Jadwal" icon="pi pi-send" severity="success"
                            @click="konfirmasiTerbitkan()" :loading="isLoading" />
                    </div>
                </template>
            </Card>

            <!-- Riwayat Kontrol Ulang -->
            <Card class="fk-card mt-3">
                <template #title>
                    <div class="fk-card-title">
                        <i class="pi pi-history fk-icon-blue"></i>
                        <span>Riwayat Kontrol Ulang</span>
                        <Tag value="Server BPJS" severity="secondary" />
                        <Tag :value="riwayatKontrolUlangFiltered.length" severity="info" class="ml-auto" />
                    </div>
                </template>
                <template #content>
                    <!-- Filter bulan/tahun -->
                    <div class="fk-riwayat-filter">
                        <div class="fk-riwayat-filter-info">
                            <i class="pi pi-credit-card"></i>
                            No. Kartu: <strong>{{ data_pasien.NOJAMINAN || '—' }}</strong>
                        </div>
                        <div class="fk-riwayat-filter-ctrl">
                            <span class="fk-riwayat-filter-info">
                                <i class="pi pi-calendar"></i>
                                Periode: <strong>{{ labelBulanRiwayat }}</strong>
                            </span>
                            <Button label="Muat Ulang" icon="pi pi-refresh" severity="info" size="small" outlined
                                :loading="loadingRiwayat" @click="getRiwayatKontrolUlang()" />
                        </div>
                    </div>

                    <div v-if="loadingRiwayat" class="fk-dokter-loading">
                        <i class="pi pi-spin pi-spinner"></i>
                        <span>Mengambil data dari server BPJS...</span>
                    </div>
                    <div v-else-if="riwayatKontrolUlangFiltered.length === 0" class="fk-riwayat-empty">
                        <i class="pi pi-inbox"></i>
                        <span v-if="riwayatError">{{ riwayatError }}</span>
                        <span v-else-if="form.tanggal_kontrol">Tidak ada rencana kontrol pada tanggal ini.</span>
                        <span v-else>Tidak ada rencana kontrol pada periode ini.</span>
                    </div>
                    <div v-else class="fk-riwayat-table-wrapper">
                        <table class="fk-riwayat-table">
                            <thead>
                                <tr>
                                    <th>No. Surat Kontrol</th>
                                    <th>Jenis</th>
                                    <th>Tgl. Kontrol</th>
                                    <th>Tgl. Terbit</th>
                                    <th>SEP Asal</th>
                                    <th>Tgl. SEP</th>
                                    <th>Poli Tujuan</th>
                                    <th>Dokter</th>
                                    <th>Terbit SEP</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, idx) in riwayatKontrolUlangFiltered" :key="row.noSuratKontrol || idx">
                                    <td><code class="fk-code">{{ row.noSuratKontrol || '—' }}</code></td>
                                    <td>{{ row.namaJnsKontrol || '—' }}</td>
                                    <td>{{ row.tglRencanaKontrol || '—' }}</td>
                                    <td>{{ row.tglTerbitKontrol || '—' }}</td>
                                    <td><code class="fk-code">{{ row.noSepAsalKontrol || '—' }}</code></td>
                                    <td>{{ row.tglSEP || '—' }}</td>
                                    <td>{{ row.namaPoliTujuan || row.poliTujuan || '—' }}</td>
                                    <td>{{ row.namaDokter || '—' }}</td>
                                    <td>
                                        <Tag :value="row.terbitSEP || '—'"
                                            :severity="row.terbitSEP === 'Sudah' ? 'success' : 'secondary'" />
                                    </td>
                                    <td>
                                        <div style="display:flex;gap:4px;align-items:center">
                                            <Button text rounded size="small"
                                                :icon="syncIcon(row.noSuratKontrol)"
                                                :severity="syncSeverity(row.noSuratKontrol)"
                                                :loading="!!syncingMap[row.noSuratKontrol]"
                                                :disabled="!!syncingMap[row.noSuratKontrol]"
                                                v-tooltip="'Sync ke SIMRS'"
                                                @click="syncItem(row)" />
                                            <Button icon="pi pi-print" severity="info" text rounded size="small"
                                                v-tooltip="'Cetak Surat Kontrol'"
                                                @click="cetakKontrol(row)" />
                                            <Button icon="pi pi-times" severity="danger" text rounded size="small"
                                                :loading="loadingHapus === row.noSuratKontrol"
                                                :disabled="row.terbitSEP === 'Sudah'"
                                                v-tooltip="'Batalkan'"
                                                @click="konfirmasiHapus(row)" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
            </Card>

            <!-- Dialog Konfirmasi -->
            <Dialog header="Konfirmasi Terbitkan Jadwal" v-model:visible="dialogKonfirmasi"
                :style="{ width: '460px' }" :modal="true">
                <Message severity="warn" :closable="false" class="mb-3">
                    <i class="pi pi-exclamation-triangle mr-1"></i>
                    Pastikan semua data sudah benar sebelum menerbitkan.
                </Message>
                <div class="fk-summary">
                    <div class="fk-summary-row">
                        <span class="fk-summary-label">Pasien</span>
                        <span class="fk-summary-value font-weight-bold">{{ data_pasien.NAMAPASIEN }}</span>
                    </div>
                    <div class="fk-summary-row">
                        <span class="fk-summary-label">No. Register</span>
                        <span class="fk-summary-value">{{ noregister }}</span>
                    </div>
                    <div class="fk-summary-row">
                        <span class="fk-summary-label">Poli Tujuan</span>
                        <span class="fk-summary-value">{{ namaPoliSelected }}</span>
                    </div>
                    <div class="fk-summary-row">
                        <span class="fk-summary-label">Tanggal Kontrol</span>
                        <span class="fk-summary-value">{{ formatTanggal(form.tanggal_kontrol) }}</span>
                    </div>
                    <div v-if="selectedDokter" class="fk-summary-row">
                        <span class="fk-summary-label">Dokter</span>
                        <span class="fk-summary-value">{{ selectedDokter.namaDokter }}</span>
                    </div>
                    <div v-if="selectedDokter" class="fk-summary-row">
                        <span class="fk-summary-label">Jadwal Praktek</span>
                        <Tag :value="selectedDokter.jadwalPraktek" severity="success" />
                    </div>
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" severity="secondary" outlined
                        @click="dialogKonfirmasi = false" />
                    <Button label="Ya, Terbitkan" icon="pi pi-check" severity="success"
                        @click="simpan()" :loading="isLoading" />
                </template>
            </Dialog>

            <!-- Dialog Konfirmasi Hapus Surat Kontrol -->
            <Dialog header="Batalkan Surat Kontrol" v-model:visible="dialogHapus"
                :style="{ width: '420px' }" :modal="true">
                <div class="fk-hapus-body">
                    <div class="fk-hapus-icon">
                        <i class="pi pi-exclamation-triangle"></i>
                    </div>
                    <p class="fk-hapus-desc">
                        Apakah Anda yakin ingin membatalkan surat kontrol berikut?
                    </p>
                    <div v-if="hapusTarget" class="fk-summary mt-2">
                        <div class="fk-summary-row">
                            <span class="fk-summary-label">No. Kontrol</span>
                            <code class="fk-code">{{ hapusTarget.noSuratKontrol }}</code>
                        </div>
                        <div class="fk-summary-row">
                            <span class="fk-summary-label">Pasien</span>
                            <span class="fk-summary-value">{{ hapusTarget.nama || data_pasien.NAMAPASIEN }}</span>
                        </div>
                        <div class="fk-summary-row">
                            <span class="fk-summary-label">Poli</span>
                            <span class="fk-summary-value">{{ hapusTarget.namaPoliTujuan || hapusTarget.poliTujuan }}</span>
                        </div>
                        <div class="fk-summary-row">
                            <span class="fk-summary-label">Dokter</span>
                            <span class="fk-summary-value">{{ hapusTarget.namaDokter }}</span>
                        </div>
                        <div class="fk-summary-row">
                            <span class="fk-summary-label">Tgl. Kontrol</span>
                            <span class="fk-summary-value">{{ hapusTarget.tglRencanaKontrol }}</span>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Tidak" icon="pi pi-times" severity="secondary" outlined
                        @click="dialogHapus = false" />
                    <Button label="Ya, Batalkan" icon="pi pi-trash" severity="danger"
                        @click="hapusSuratKontrol()" :loading="loadingHapus !== null" />
                </template>
            </Dialog>

    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../../bus';

    export default {
        components: {
            Loading,
        },
        data() {
            return {
                noregister: '',
                data_pasien: {},
                dataPoly: [],
                dataDokter: [],
                selectedPoli: null,
                selectedDokter: null,
                form: {
                    noregister: '',
                    tanggal_kontrol: '',
                    kd_poli: null,
                    kd_dokter: null,
                    jadwal_dokter: '',
                },
                riwayatKontrolUlang: [],
                bulanRiwayat: '', // 'YYYY-MM' bulan yang terakhir dimuat dari BPJS
                loadingRiwayat: false,
                riwayatError: '',
                syncingMap: {},     // { [noSuratKontrol]: true } saat proses sync
                syncResultMap: {},  // { [noSuratKontrol]: 'success' | 'error' }
                isLoading: false,
                loadingDokter: false,
                loadingHapus: null,
                dialogHapus: false,
                hapusTarget: null,
                fullPage: true,
                dialogKonfirmasi: false,
                validationMsg: '',
            };
        },
        computed: {
            namaPoliSelected() {
                return this.selectedPoli?.NAMA || '-';
            },
            // Bulan riwayat mengikuti Tanggal Kontrol Ulang; jika kosong pakai bulan berjalan
            tanggalAcuanRiwayat() {
                return this.form.tanggal_kontrol ? new Date(this.form.tanggal_kontrol) : new Date();
            },
            labelBulanRiwayat() {
                return this.tanggalAcuanRiwayat.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
            },
            riwayatKontrolUlangFiltered() {
                if (!this.form.tanggal_kontrol) return this.riwayatKontrolUlang;

                const target = this.formatDateForApi(this.form.tanggal_kontrol);
                return this.riwayatKontrolUlang.filter(row => {
                    if (!row.tglRencanaKontrol) return false;
                    return row.tglRencanaKontrol === target;
                });
            },
        },
        watch: {
            selectedPoli(val) {
                this.form.kd_poli = val?.KODE || null;
                this.getDokterLive();
            },
            selectedDokter(val) {
                this.form.kd_dokter     = val?.kodeDokter    || null;
                this.form.jadwal_dokter = val?.jadwalPraktek  || '';
            },
        },
        created() {
            this.noregister = window.location.pathname.split('/').pop();
            this.form.noregister = this.noregister;
            this.getDataPasien();
            this.getDataPoly();
        },
        methods: {
            konfirmasiHapus(row) {
                this.hapusTarget  = row;
                this.dialogHapus  = true;
            },

            async hapusSuratKontrol() {
                this.loadingHapus = this.hapusTarget.noSuratKontrol;
                await axios.post('/hapus_surat_kontrol', { no_kontrol: this.hapusTarget.noSuratKontrol })
                    .then(response => {
                        const data = typeof response.data === 'string'
                            ? JSON.parse(response.data)
                            : response.data;

                        if (data.code == 200) {
                            this.notify('success', 'Surat kontrol berhasil dibatalkan');
                            this.dialogHapus  = false;
                            this.hapusTarget  = null;
                            this.getRiwayatKontrolUlang();
                        } else {
                            this.notify('error', data.message || 'Gagal membatalkan surat kontrol');
                        }
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal membatalkan surat kontrol');
                        console.error(error);
                    })
                    .finally(() => {
                        this.loadingHapus = null;
                    });
            },

            // Riwayat rencana kontrol diambil langsung dari server BPJS (per bulan)
            async getRiwayatKontrolUlang() {
                this.riwayatKontrolUlang = [];
                this.riwayatError = '';
                if (!this.data_pasien.NOJAMINAN) {
                    this.riwayatError = 'No. Kartu BPJS pasien tidak tersedia.';
                    return;
                }

                const d = this.tanggalAcuanRiwayat;
                const akhirBulan = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                this.bulanRiwayat = this.formatDateForApi(d).slice(0, 7);

                this.loadingRiwayat = true;
                this.syncResultMap = {};
                try {
                    const res = await axios.post('/list_rencana_kontrol_bpjs', {
                        no_kartu: this.data_pasien.NOJAMINAN,
                        tanggal : this.formatDateForApi(akhirBulan),
                    });
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    const code = data?.metaData?.code;
                    if (code == 200) {
                        const raw = data?.response;
                        this.riwayatKontrolUlang = Array.isArray(raw) ? raw
                            : (Array.isArray(raw?.list) ? raw.list : []);
                    } else {
                        this.riwayatError = data?.metaData?.message || 'Data tidak ditemukan.';
                    }
                } catch (error) {
                    console.error('Gagal memuat riwayat kontrol dari BPJS:', error);
                    this.riwayatError = 'Koneksi ke server BPJS gagal.';
                } finally {
                    this.loadingRiwayat = false;
                }
            },

            async syncItem(row) {
                const key = row.noSuratKontrol;
                if (!key || this.syncingMap[key]) return;

                this.syncingMap    = { ...this.syncingMap, [key]: true };
                this.syncResultMap = { ...this.syncResultMap, [key]: null };
                try {
                    const res = await axios.post('/sync_no_kontrol_ulang', {
                        no_kontrol_ulang : key,
                        noregister       : this.noregister,
                        noSepAsalKontrol : row.noSepAsalKontrol,
                        noKartu          : row.noKartu,
                        norm             : this.data_pasien.NOMR,
                        kodeDokter       : row.kodeDokter,
                        poliTujuan       : row.poliTujuan,
                        tglRencanaKontrol: row.tglRencanaKontrol,
                        tglSEP           : row.tglSEP,
                        terbitSEP        : row.terbitSEP,
                    });
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data?.code == 200) {
                        this.syncResultMap = { ...this.syncResultMap, [key]: 'success' };
                        const aksi = data?.action === 'insert' ? 'Data baru disimpan' : 'Data diperbarui';
                        this.notify('success', `${key} — ${aksi} ke SIMRS`);
                    } else {
                        this.syncResultMap = { ...this.syncResultMap, [key]: 'error' };
                        this.notify('error', data?.message || 'Gagal sync surat kontrol.');
                    }
                } catch (error) {
                    console.error(error);
                    this.syncResultMap = { ...this.syncResultMap, [key]: 'error' };
                    this.notify('error', 'Koneksi ke server gagal.');
                } finally {
                    const next = { ...this.syncingMap };
                    delete next[key];
                    this.syncingMap = next;
                }
            },
            syncIcon(key) {
                const r = this.syncResultMap[key];
                return r === 'success' ? 'pi pi-check' : (r === 'error' ? 'pi pi-times-circle' : 'pi pi-cloud-download');
            },
            syncSeverity(key) {
                const r = this.syncResultMap[key];
                return r === 'success' ? 'success' : (r === 'error' ? 'danger' : 'help');
            },

            // Jika tanggal kontrol pindah bulan, muat ulang riwayat BPJS bulan tersebut
            sinkronBulanRiwayat() {
                const bulan = this.formatDateForApi(this.tanggalAcuanRiwayat).slice(0, 7);
                if (bulan !== this.bulanRiwayat) {
                    this.getRiwayatKontrolUlang();
                }
            },

            onTanggalChange() {
                this.sinkronBulanRiwayat();
                this.getDokterLive();
            },
            geserTanggal(arah) {
                const d = new Date(this.form.tanggal_kontrol);
                d.setDate(d.getDate() + arah);
                this.form.tanggal_kontrol = d;
                this.sinkronBulanRiwayat();
                this.getDokterLive();
            },
            async getDokterLive() {
                if (!this.selectedPoli || !this.form.tanggal_kontrol) return;
                this.loadingDokter  = true;
                this.dataDokter     = [];
                this.selectedDokter = null;
                try {
                   // console.log('Fetching dokter live for poli:', this.form, 'on date:', this.form.tanggal_kontrol);
                    const res = await axios.post('/get_dokter_live', {
                        kode_poli : this.selectedPoli?.KODE_BPJS,
                        tanggal   : this.formatDateForApi(this.form.tanggal_kontrol),
                    });
                    this.dataDokter = res.data?.response?.list || [];
                } catch (err) {
                    console.error(err);
                    this.notify('error', 'Gagal memuat jadwal dokter');
                } finally {
                    this.loadingDokter = false;
                }
            },
            formatDateForApi(date) {
                if (!date) return '';
                const d   = new Date(date);
                const y   = d.getFullYear();
                const m   = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${day}`;
            },
            async getDataPasien() {
                this.isLoading = true;
                await axios.post('/datapasienpertransaksi', { noregister: this.noregister, mode: 'history8' })
                    .then(response => {
                        const data = response.data;
                        this.data_pasien = data.response?.[0] || data?.[0] || data || {};
                        this.getRiwayatKontrolUlang();
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal memuat data pasien');
                        console.error(error);
                    })
                    .finally(() => this.isLoading = false);
            },

            async getDataPoly() {
                this.form.mode = 0;
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        this.dataPoly = response.data;
                    })
                    .catch(e => console.log(e)).finally(() => this.isLoading = false);
            },

            konfirmasiTerbitkan() {
                this.validationMsg = '';
                if (!this.form.tanggal_kontrol) {
                    this.validationMsg = 'Tanggal kontrol ulang wajib diisi.';
                    return;
                }
                if (!this.selectedPoli) {
                    this.validationMsg = 'Poli tujuan wajib dipilih.';
                    return;
                }
                this.dialogKonfirmasi = true;
            },

            async simpan() {
                this.isLoading = true;

                const payload = {
                    nosep     : this.data_pasien.NOSEP,
                    nokartu   : this.data_pasien.NOJAMINAN,
                    norm      : this.data_pasien.NOMR,
                    tanggal   : this.formatDateForApi(this.form.tanggal_kontrol),
                    dokter    : {
                        KDDOKTER: this.selectedDokter?.kodeDokter || null,
                    },
                    poli_klinik: {
                        KodePoliBPJS: this.selectedPoli?.KODE_BPJS || null,
                    },
                };

                await axios.post('/terbitkan_kontrolulang', payload)
                    .then(response => {
                        const data = typeof response.data === 'string'
                            ? JSON.parse(response.data)
                            : response.data;

                        if (data.code == 200) {
                            this.notify('success', data.message || 'Jadwal kontrol ulang berhasil diterbitkan');
                            this.dialogKonfirmasi = false;
                            this.getRiwayatKontrolUlang();
                            //setTimeout(() => window.location.href = '/jadwal-kontrol', 1500);
                        } else {
                            const msg = data?.metaData?.message || data?.message || 'Gagal menerbitkan jadwal';
                            this.notify('error', msg);
                        }
                    })
                    .catch(error => {
                        this.notify('error', 'Gagal menerbitkan jadwal kontrol ulang');
                        console.error(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },

            cetakKontrol(row) {
                const url = `/print-kontrol-ulang?no_kontrol=${row.noSuratKontrol}&noregister=${this.noregister}`;
                window.open(url, '_blank');
            },

            kembali() {
                window.history.back();
            },

            formatTanggal(date) {
                if (!date) return '-';
                if (typeof date === 'string') return date;
                return new Date(date).toLocaleDateString('id-ID', {
                    day: '2-digit', month: 'long', year: 'numeric'
                });
            },

            notify(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        },
    }
</script>

<style scoped>
.fk-wrapper {
    max-width: 860px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
}

.fk-page-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}
.fk-page-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
}
.fk-page-sub {
    color: #64748b;
    font-size: 12px;
}

.fk-card {
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.fk-card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: #334155;
}
.fk-icon-green { color: #16a34a; }

/* Patient info grid */
.fk-patient-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem 1.5rem;
}
.fk-info-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.fk-info-label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
.fk-info-value {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
}

.fk-loading-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 13px;
}

/* Date nav */
.fk-date-nav {
    display: flex;
    align-items: center;
    gap: 6px;
}
:deep(.fk-date-nav .p-datepicker-input) {
    flex: 1;
}

/* Form labels */
.fk-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 6px;
}
.fk-required { color: #ef4444; }
.fk-optional { font-weight: 400; color: #94a3b8; }

/* Dokter states */
.fk-dokter-hint,
.fk-dokter-loading,
.fk-dokter-empty {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
}
.fk-dokter-hint {
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    color: #64748b;
}
.fk-dokter-hint i { color: #3b82f6; }
.fk-dokter-loading {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
}
.fk-dokter-empty {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    color: #c2410c;
}

/* Card list jadwal dokter */
.fk-dokter-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.fk-dokter-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    background: #fff;
    transition: all 0.15s ease;
    user-select: none;
}
.fk-dokter-card:hover {
    border-color: #93c5fd;
    background: #f0f9ff;
}
.fk-dokter-card--selected {
    border-color: #3b82f6 !important;
    background: #eff6ff !important;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
}
.fk-dokter-card-left {
    flex-shrink: 0;
}
.fk-dokter-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    font-size: 16px;
}
.fk-dokter-card--selected .fk-dokter-card-icon {
    background: #3b82f6;
    color: #fff;
}
.fk-dokter-card-body {
    flex: 1;
    min-width: 0;
}
.fk-dokter-card-nama {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
}
.fk-dokter-card-meta {
    display: flex;
    align-items: center;
    gap: 14px;
}
.fk-dokter-card-jam,
.fk-dokter-card-kapasitas {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #64748b;
}
.fk-dokter-card-jam i { color: #16a34a; }
.fk-dokter-card-kapasitas i { color: #7c3aed; }
.fk-dokter-card-right { flex-shrink: 0; }
.fk-check-icon { color: #3b82f6; font-size: 20px; }
.fk-uncheck-icon { color: #cbd5e1; font-size: 20px; }

/* Footer actions */
.fk-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

/* Confirmation summary */
.fk-summary {
    display: flex;
    flex-direction: column;
    gap: 0;
}
.fk-summary-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
    gap: 1rem;
}
.fk-summary-row:last-child { border-bottom: none; }
.fk-summary-label {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    min-width: 130px;
}
.fk-summary-value {
    font-size: 13px;
    color: #1e293b;
    text-align: right;
    flex: 1;
}

/* Dialog hapus */
.fk-hapus-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.5rem 0 0.25rem;
}
.fk-hapus-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #fef2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
}
.fk-hapus-icon i {
    font-size: 22px;
    color: #ef4444;
}
.fk-hapus-desc {
    font-size: 13px;
    color: #475569;
    margin: 0;
}

/* Riwayat table */
.fk-icon-blue { color: #3b82f6; }
.fk-riwayat-empty {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    color: #94a3b8;
    font-size: 13px;
    justify-content: center;
}
.fk-riwayat-empty i { font-size: 20px; }
.fk-riwayat-filter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 10px 14px;
    margin-bottom: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
}
.fk-riwayat-filter-info {
    flex: 1;
    font-size: 12px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 6px;
}
.fk-riwayat-filter-ctrl {
    display: flex;
    align-items: center;
    gap: 8px;
}
.fk-riwayat-table-wrapper {
    overflow-x: auto;
}
.fk-riwayat-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}
.fk-riwayat-table thead tr {
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
}
.fk-riwayat-table th {
    padding: 8px 12px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
}
.fk-riwayat-table td {
    padding: 8px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #334155;
    vertical-align: middle;
}
.fk-riwayat-table tbody tr:hover {
    background: #f8fafc;
}
.fk-riwayat-table tbody tr:last-child td {
    border-bottom: none;
}
.fk-code {
    font-size: 11px;
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    color: #475569;
    font-family: monospace;
}

@media (max-width: 576px) {
    .fk-wrapper { padding: 1rem 0.5rem; }
    .fk-patient-grid { grid-template-columns: 1fr 1fr; }
    .fk-footer-actions { flex-direction: column-reverse; }
    .fk-footer-actions .p-button { width: 100%; justify-content: center; }
}
</style>
