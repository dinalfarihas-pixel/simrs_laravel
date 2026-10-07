<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- Dialog Otorisasi -->
        <Dialog header="Otorisasi Persiapan Operasi" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleOtorisasi" :mode="15" :noregister="form.noregister"
                :kodeboking="form.kodeboking"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- Pilih Jadwal Operasi -->
        <div class="card card-outline card-primary shadow-sm mb-3">
            <div class="card-header">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-calendar-check mr-2 text-primary"></i>
                    Pilih Jadwal Operasi
                </h3>
            </div>
            <div class="card-body">
                <Select v-model="selectedJadwal" :options="listJadwalOperasi" :loading="loadingJadwal"
                    optionLabel="kodebooking" placeholder="Pilih jadwal operasi pasien" style="width: 100%;"
                    :filter="true" filterPlaceholder="Cari jadwal operasi...">
                    <template #option="{ option }">
                        <div>
                            <strong>{{ formatTanggal(option.tanggaloperasi) }}</strong> — {{ option.namapoli }} —
                            {{ option.dokter }}
                            <br>
                            <small class="text-muted">Kode Booking: {{ option.kodebooking }}</small>
                        </div>
                    </template>
                    <template #value="{ value }">
                        <span v-if="value">
                            {{ formatTanggal(value.tanggaloperasi) }} — {{ value.namapoli }} — {{ value.dokter }}
                        </span>
                    </template>
                </Select>
                <small v-if="listJadwalOperasi.length === 0 && !loadingJadwal" class="text-muted d-block mt-2">
                    Belum ada jadwal operasi untuk pasien ini. Silakan buat jadwal pada tab Permintaan Operasi
                    terlebih dahulu.
                </small>
            </div>
        </div>

        <div v-if="selectedJadwal">
            <!-- Banner -->
            <div class="ops-banner mb-3">
                <div class="ops-banner-icon">
                    <i class="pi pi-list-check"></i>
                </div>
                <div class="ops-banner-content">
                    <h4 class="ops-banner-title">Check List Persiapan Operasi</h4>
                    <p class="ops-banner-desc">
                        Formulir ini digunakan untuk memastikan seluruh persyaratan medis, administrasi, dan
                        kebutuhan pasien telah dipenuhi sebelum tindakan pembedahan dilaksanakan.
                    </p>
                </div>
            </div>

            <div class="row">
                <!-- ===== KONDISI PASIEN ===== -->
                <div class="col-md-6 mb-3">
                    <div class="card card-outline card-primary shadow-sm h-100 mb-0">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-heartbeat mr-2 text-primary"></i>
                                Kondisi Pasien
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="field-group">
                                <label class="section-label">Diagnosa Pasien</label>
                                <InputText v-model="form.diagnosa" class="w-100" placeholder="Diagnosa pasien..." />
                            </div>

                            <div class="d-flex justify-content-between align-items-center mt-3 mb-1">
                                <label class="section-label mb-0">Tanda Vital</label>
                                <Button label="TTV Terakhir" icon="pi pi-copy" class="p-button-sm p-button-outlined"
                                    v-tooltip.top="'Salin tanda vital terakhir yang tercatat untuk pasien ini'"
                                    @click="ambilTtvTerakhir()" />
                            </div>

                            <div class="vital-grid">
                                <div class="vital-card">
                                    <div class="vital-card-label">Nadi</div>
                                    <VitalQuickPickInput v-model="form.nadi" label="Nadi" unit="x/mnt" :min="30"
                                        :max="220" :quickValues="[70, 80, 82, 88, 89, 90, 98, 101, 110, 117, 130, 134, 140]" />
                                    <small class="vital-hint">60 – 100 x/mnt</small>
                                </div>
                                <div class="vital-card">
                                    <div class="vital-card-label">Nafas</div>
                                    <VitalQuickPickInput v-model="form.nafas" label="Nafas" unit="x/mnt" :min="5"
                                        :max="70" :quickValues="[20, 22, 24, 26, 42, 43, 44, 45, 46, 48, 50, 60]" />
                                    <small class="vital-hint">12 – 20 x/mnt</small>
                                </div>
                                <div class="vital-card vital-card--td">
                                    <div class="vital-card-label">Tekanan Darah</div>
                                    <div class="td-pair">
                                        <div class="td-pair-item">
                                            <VitalQuickPickInput v-model="form.tekananDarahSistol" label="Sistolik"
                                                unit="mmHg" :min="40" :max="260"
                                                :quickValues="[60, 65, 70, 80, 90, 100, 110, 112, 120, 125, 130, 140]" />
                                        </div>
                                        <span class="td-pair-sep">/</span>
                                        <div class="td-pair-item">
                                            <VitalQuickPickInput v-model="form.tekananDarahDiastol" label="Diastolik"
                                                unit="mmHg" :min="20" :max="150"
                                                :quickValues="[40, 45, 50, 60, 70, 72, 75, 78, 80, 81, 89, 90]" />
                                        </div>
                                    </div>
                                    <small class="vital-hint">Normal: 120 / 80 mmHg</small>
                                </div>
                                <div class="vital-card">
                                    <div class="vital-card-label">Suhu</div>
                                    <VitalQuickPickInput v-model="form.suhu" label="Suhu" unit="°C"
                                        :minFractionDigits="1" :min="30" :max="42"
                                        :quickValues="[36, 36.2, 36.5, 36.6, 36.7, 36.8, 36.9, 37, 37.5, 38, 38.5, 39]" />
                                    <small class="vital-hint">36 – 37.5 °C</small>
                                </div>
                                <div class="vital-card">
                                    <div class="vital-card-label">Tinggi</div>
                                    <InputGroup>
                                        <InputNumber v-model="form.tinggi" :min="0" :max="250" />
                                        <InputGroupAddon>cm</InputGroupAddon>
                                    </InputGroup>
                                </div>
                                <div class="vital-card">
                                    <div class="vital-card-label">Berat</div>
                                    <InputGroup>
                                        <InputNumber v-model="form.berat" :min="0" :max="300" />
                                        <InputGroupAddon>kg</InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== PERSIAPAN PASIEN ===== -->
                <div class="col-md-6 mb-3">
                    <div class="card card-outline card-primary shadow-sm h-100 mb-0">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-user-check mr-2 text-primary"></i>
                                Persiapan Pasien
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="field-group">
                                <label class="section-label">Persiapan Darah</label>
                                <div class="p-inputgroup">
                                    <InputText v-model="form.persiapanDarah" placeholder="Volume" />
                                    <span class="p-inputgroup-addon">CC</span>
                                </div>
                            </div>
                            <div class="field-group">
                                <label class="section-label">Puasa Mulai Jam</label>
                                <InputText v-model="form.puasaMulai" class="w-100" placeholder="Contoh: 22:00" />
                            </div>

                            <div class="checklist-grid mt-3">
                                <div class="checklist-row" v-for="item in checklistKondisi" :key="item.field">
                                    <span class="checklist-label">{{ item.label }}</span>
                                    <div class="d-flex" style="gap:12px">
                                        <div class="field-radiobutton">
                                            <RadioButton :inputId="item.field+'Ya'" value="Ya"
                                                v-model="form[item.field]" />
                                            <label :for="item.field+'Ya'" class="ml-1">Ya</label>
                                        </div>
                                        <div class="field-radiobutton">
                                            <RadioButton :inputId="item.field+'Tidak'" value="Tidak"
                                                v-model="form[item.field]" />
                                            <label :for="item.field+'Tidak'" class="ml-1">Tidak</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== PERSIAPAN ADMINISTRASI ===== -->
                <div class="col-12 mb-3">
                    <div class="card card-outline card-primary shadow-sm mb-0">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-file-alt mr-2 text-primary"></i>
                                Persiapan Administrasi
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="checklist-grid-2">
                                <div class="checklist-row" v-for="item in checklistAdministrasi" :key="item.field">
                                    <span class="checklist-label">{{ item.label }}</span>
                                    <div class="d-flex" style="gap:12px">
                                        <div class="field-radiobutton">
                                            <RadioButton :inputId="item.field+'Ya'" value="Ya"
                                                v-model="form[item.field]" />
                                            <label :for="item.field+'Ya'" class="ml-1">Ya</label>
                                        </div>
                                        <div class="field-radiobutton">
                                            <RadioButton :inputId="item.field+'Tidak'" value="Tidak"
                                                v-model="form[item.field]" />
                                            <label :for="item.field+'Tidak'" class="ml-1">Tidak</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== OTORISASI ===== -->
                <div class="col-12 mb-3">
                    <div class="card card-outline card-primary shadow-sm mb-0">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-shield-alt mr-2 text-primary"></i>
                                Otorisasi
                            </h3>
                        </div>
                        <div class="card-body">
                            <div v-if="!isDataSaved" class="tte-hint">
                                <i class="pi pi-info-circle"></i>
                                <span>Lengkapi dan simpan data checklist persiapan operasi terlebih dahulu.
                                    Tombol otorisasi akan muncul setelah data berhasil disimpan.</span>
                            </div>
                            <div v-else-if="!isSigned" class="tte-hint">
                                <i class="pi pi-pen-to-square"></i>
                                <span>Dokumen belum diotorisasi.</span>
                                <Button label="Lakukan Otorisasi" icon="pi pi-lock" class="p-button-sm ml-2"
                                    @click="showOtorisasi = true" />
                            </div>
                            <div v-else class="tte-signed">
                                <div class="tte-signed-badge">
                                    <i class="pi pi-verified"></i>
                                    <div>
                                        <div class="tte-signed-label">Nama Petugas</div>
                                        <div class="tte-signed-name">{{ auth.nama_auth || auth.auth_by }}</div>
                                        <div class="tte-signed-label mt-1">Waktu Otorisasi</div>
                                        <div class="tte-signed-name">{{ auth.last_update }}</div>
                                    </div>
                                </div>
                                <div class="tte-qr">
                                    <QrcodeVue :value="qrCodeData" :size="90" level="H" render-as="svg" />
                                    <small class="text-muted d-block text-center mt-1">Scan untuk verifikasi</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Bar -->
            <div class="card card-outline card-primary shadow-sm mb-0">
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="pi pi-info-circle mr-1"></i>Pastikan semua data sudah diisi sebelum menyimpan.
                    </small>
                    <Button label="Simpan Data" icon="pi pi-save" class="p-button-success" :loading="isLoading"
                        @click="simpanData()" />
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import RadioButton from 'primevue/radiobutton';
    import QrcodeVue from 'qrcode.vue';
    import VitalQuickPickInput from '../controls/VitalQuickPickInput.vue';

    export default {
        components: {
            Loading,
            RadioButton,
            QrcodeVue,
            VitalQuickPickInput,
        },
        props: ['datapasien'],
        data() {
            return {
                isLoading: false,
                fullPage: true,
                loadingJadwal: false,
                listJadwalOperasi: [],
                selectedJadwal: null,
                isDataSaved: false,
                showOtorisasi: false,
                auth: { auth_by: '', nama_auth: '', last_update: '' },
                checklistKondisi: [
                    { field: 'clysma', label: 'Lakukan Clysma/Glycerin' },
                    { field: 'gigi', label: 'Lepas Gigi Palsu/Lensa/Hearing Aid' },
                    { field: 'barang', label: 'Amankan Barang Berharga' },
                    { field: 'makeup', label: 'Hapus Makeup/Cutex' },
                    { field: 'kemih', label: 'Pengosongan Kandung Kemih' },
                    { field: 'haid', label: 'Pasien Sedang Haid' },
                ],
                checklistAdministrasi: [
                    { field: 'status', label: 'Status Sudah Dilengkapi' },
                    { field: 'operasi', label: 'TTD Persetujuan Tindakan Operasi' },
                    { field: 'anestesi', label: 'TTD Persetujuan Tindakan Anestesi' },
                    { field: 'laboratorium', label: 'Hasil Pemeriksaan Laboratorium' },
                    { field: 'radiologi', label: 'Hasil Pemeriksaan Radiologi' },
                    { field: 'ekg', label: 'Hasil Pemeriksaan EKG' },
                ],
                form: {
                    noregister: '',
                    kodeboking: '',
                    diagnosa: '',
                    nadi: null,
                    nafas: null,
                    tekananDarahSistol: null,
                    tekananDarahDiastol: null,
                    suhu: null,
                    tinggi: null,
                    berat: null,
                    persiapanDarah: '',
                    puasaMulai: '',
                    clysma: 'Tidak',
                    gigi: 'Tidak',
                    barang: 'Tidak',
                    makeup: 'Tidak',
                    kemih: 'Tidak',
                    haid: 'Tidak',
                    status: 'Tidak',
                    operasi: 'Tidak',
                    anestesi: 'Tidak',
                    laboratorium: 'Tidak',
                    radiologi: 'Tidak',
                    ekg: 'Tidak',
                },
            };
        },
        computed: {
            isSigned() {
                return !!this.auth.auth_by;
            },
            qrCodeData() {
                return JSON.stringify({
                    dokumen: 'Check List Persiapan Operasi',
                    kodebooking: this.form.kodeboking,
                    noregister: this.form.noregister,
                    petugas: {
                        nama: this.auth.nama_auth || this.auth.auth_by,
                        waktu: this.auth.last_update,
                    },
                });
            },
        },
        watch: {
            selectedJadwal(val) {
                this.resetForm();
                if (val) {
                    this.form.noregister = val.noregister;
                    this.form.kodeboking = val.kodebooking;
                    this.getPersiapanOperasi();
                }
            },
        },
        created() {
            this.getJadwalOperasi();
        },
        methods: {
            formatTanggal(val) {
                if (!val) return '-';
                const d = new Date(val);
                if (isNaN(d)) return val;
                return d.toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },
            async ambilTtvTerakhir() {
                if (!this.form.noregister) return;
                this.isLoading = true;
                await axios.post('/get_soap', {
                        mode: 3,
                        noregister: this.form.noregister,
                    })
                    .then(response => {
                        const data = (response.data.response && response.data.response[0]) || null;
                        if (!data) {
                            this.open('warning', 'Belum ada data tanda vital tercatat untuk pasien ini.');
                            return;
                        }
                        this.form.nadi = data.nadi ?? this.form.nadi;
                        this.form.nafas = data.pernafasan ?? this.form.nafas;
                        this.form.tekananDarahSistol = data.sistole ?? this.form.tekananDarahSistol;
                        this.form.tekananDarahDiastol = data.diastole ?? this.form.tekananDarahDiastol;
                        this.form.suhu = data.suhu ?? this.form.suhu;
                        this.open('success',
                            `Tanda vital tersalin dari data tanggal ${data.waktu_display || ''}.`);
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Gagal mengambil data tanda vital terakhir');
                    })
                    .finally(() => this.isLoading = false)
            },
            async getJadwalOperasi() {
                this.loadingJadwal = true;
                await axios.post('/get_jadwal_operasi', {
                        nokartu: this.datapasien.NOJAMINAN,
                        mode: 2,
                    })
                    .then(response => {
                        this.listJadwalOperasi = response.data.response || [];
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.loadingJadwal = false)
            },
            resetForm() {
                this.isDataSaved = false;
                this.auth = { auth_by: '', nama_auth: '', last_update: '' };
                this.form = {
                    ...this.form,
                    diagnosa: '', nadi: null, nafas: null, tekananDarahSistol: null, tekananDarahDiastol: null,
                    suhu: null, tinggi: null, berat: null, persiapanDarah: '', puasaMulai: '',
                    clysma: 'Tidak', gigi: 'Tidak', barang: 'Tidak', makeup: 'Tidak', kemih: 'Tidak',
                    haid: 'Tidak', status: 'Tidak', operasi: 'Tidak', anestesi: 'Tidak',
                    laboratorium: 'Tidak', radiologi: 'Tidak', ekg: 'Tidak',
                };
            },
            async getPersiapanOperasi() {
                this.isLoading = true;
                await axios.post('/get_persiapan_operasi', { kodeboking: this.form.kodeboking })
                    .then(response => {
                        if (response.data.metadata.code == 200 && response.data.response) {
                            const data = response.data.response;
                            this.form = { ...this.form, ...data };
                            this.isDataSaved = !!data.last_update;
                            this.auth = {
                                auth_by: data.auth_by || '',
                                nama_auth: data.nama_auth || '',
                                last_update: data.last_update || '',
                            };
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false)
            },
            async simpanData() {
                this.isLoading = true;
                await axios.post('/persiapan_operasi', this.form)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.open('success', response.data.message);
                            this.getPersiapanOperasi();
                        } else {
                            this.open('warning', response.data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Gagal menyimpan data persiapan operasi');
                    })
                    .finally(() => this.isLoading = false)
            },
            handleOtorisasi(code) {
                if (code == 200) {
                    this.showOtorisasi = false;
                    this.getPersiapanOperasi();
                }
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        },
    }
</script>

<style scoped>
.field-group {
    margin-bottom: 1rem;
}

/* ===== Tanda Vital ===== */
.vital-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: .6rem;
    align-items: start;
}
.vital-card {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background: #fff;
    padding: .55rem .65rem .45rem;
    display: flex;
    flex-direction: column;
    gap: .3rem;
}
.vital-card--td {
    grid-column: span 2;
}
.vital-card-label {
    font-size: .7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #6c757d;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: .3rem;
    margin-bottom: .1rem;
}
.vital-hint {
    font-size: .65rem;
    color: #adb5bd;
    text-align: center;
}
.td-pair {
    display: flex;
    align-items: center;
    gap: 4px;
}
.td-pair-item {
    flex: 1;
    min-width: 0;
}
.td-pair-sep {
    font-size: 1.3rem;
    font-weight: 700;
    color: #adb5bd;
    flex-shrink: 0;
    line-height: 1;
}
.section-label {
    display: block;
    font-weight: 700;
    color: #444;
    margin-bottom: 6px;
    font-size: .82rem;
    text-transform: uppercase;
    letter-spacing: .04em;
}
.field-radiobutton {
    display: flex;
    align-items: center;
}

.ops-banner {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #1565c0;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    color: #fff;
}
.ops-banner-icon {
    flex-shrink: 0;
    font-size: 2rem;
    opacity: .9;
}
.ops-banner-title {
    margin: 0 0 .2rem;
    font-size: 1.05rem;
    font-weight: 700;
}
.ops-banner-desc {
    margin: 0;
    font-size: .8rem;
    opacity: .85;
    line-height: 1.5;
}

.checklist-grid {
    display: flex;
    flex-direction: column;
    gap: .4rem;
}
.checklist-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: .5rem;
}
.checklist-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem .75rem;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
    gap: .75rem;
}
.checklist-label {
    font-size: .8rem;
    color: #333;
    font-weight: 500;
    flex: 1;
}

.tte-hint {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    color: #64748b;
}
.tte-hint .pi { color: #3b82f6; font-size: 1.1rem; }

.tte-signed {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
}
.tte-signed-badge {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: .6rem;
    padding: .6rem .9rem;
    background: #e3f2fd;
    border: 1px solid #90caf9;
    color: #1565c0;
    border-radius: 8px;
}
.tte-signed-badge .pi-verified { font-size: 1.4rem; flex-shrink: 0; }
.tte-signed-label {
    font-size: .65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .06em;
    opacity: .6;
}
.tte-signed-name {
    font-weight: 700;
    font-size: .88rem;
}
.tte-qr {
    flex-shrink: 0;
    padding: .6rem;
    background: #fff;
    border: 2px solid #1565c0;
    border-radius: 8px;
}
</style>
