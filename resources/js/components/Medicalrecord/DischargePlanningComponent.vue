<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- Dialog Otorisasi / TTE -->
        <Dialog header="TTE Discharge Planning" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode=18 :noregister="datapasien.NOPENDAFTARAN"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- Dialog Otorisasi / TTE per baris Catatan Tambahan -->
        <Dialog header="TTE Catatan Discharge Planning" v-model:visible="showOtorisasiCatatan"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form v-if="showOtorisasiCatatan" @getvalue="handleValueCatatan" :mode=19
                :noregister="String(selectedCatatanId)"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasiCatatan=false" class="p-button-text" />
            </template>
        </Dialog>

        <ConfirmDialog group="dischargePlanningNotes" />

        <!-- Dialog Tambah Catatan Discharge Planning -->
        <Dialog header="Tambah Catatan Discharge Planning" v-model:visible="showTambahCatatan"
            :containerStyle="{width: '40vw'}" :modal="true">
            <div class="mb-3">
                <label class="form-label-custom">Tanggal &amp; Jam</label>
                <Calendar v-model="catatanWaktu" :showIcon="true" showTime hourFormat="24"
                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2035" style="width:100%" />
            </div>
            <div>
                <label class="form-label-custom">Catatan</label>
                <Textarea v-model="catatanBaru" style="width:100%" :rows="4"
                    placeholder="Tuliskan catatan perubahan discharge planning..." />
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="showTambahCatatan=false" class="p-button-text" />
                <Button label="Simpan" icon="pi pi-save" class="p-button-primary"
                    @click="simpan_catatan_discharge_planning()" :disabled="isLoadingCatatan || !catatanBaru.trim() || !catatanWaktu" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">

            <!-- Header bar -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-door-open mr-2 text-primary"></i>
                        Rencana Pemulangan Pasien (Discharge Planning)
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <span v-if="stts_verif" class="badge badge-success p-2">
                            <i class="pi pi-check mr-1"></i>{{ stts_verif }}
                        </span>
                        <small v-if="form.last_update" class="text-muted">
                            <i class="far fa-clock mr-1"></i>Terakhir diisi: {{ form.last_update }}
                        </small>
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:130px;border-radius:4px" />
                    </div>
                </div>
                <div class="card-body">
                    <small class="text-muted">
                        <i class="fas fa-info-circle mr-1"></i>
                        Dilengkapi dalam waktu 48 jam pertama pasien masuk rawat inap.
                    </small>
                </div>
            </div>

            <!-- Info Dasar -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-file-signature mr-2 text-primary"></i>
                        Data Pengkajian
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label class="form-label-custom">Estimasi Tanggal Pemulangan Pasien</label>
                            <Calendar v-model="form.estimasi_pulang" :showIcon="true" showTime hourFormat="24"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2035" style="width:100%" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 1. Pengaruh Rawat Inap -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">1. Pengaruh Rawat Inap Terhadap</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label class="form-label-custom d-block">Pasien dan Keluarga Pasien</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="pk-ya" name="pengaruh_pasien_keluarga" value="Ya" v-model="form.pengaruh_pasien_keluarga" />
                                    <label for="pk-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="pk-tidak" name="pengaruh_pasien_keluarga" value="Tidak" v-model="form.pengaruh_pasien_keluarga" />
                                    <label for="pk-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label-custom d-block">Pekerjaan</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="pker-ya" name="pengaruh_pekerjaan" value="Ya" v-model="form.pengaruh_pekerjaan" />
                                    <label for="pker-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="pker-tidak" name="pengaruh_pekerjaan" value="Tidak" v-model="form.pengaruh_pekerjaan" />
                                    <label for="pker-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label-custom d-block">Keuangan</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="pkeu-ya" name="pengaruh_keuangan" value="Ya" v-model="form.pengaruh_keuangan" />
                                    <label for="pkeu-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="pkeu-tidak" name="pengaruh_keuangan" value="Tidak" v-model="form.pengaruh_keuangan" />
                                    <label for="pkeu-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. Antisipasi Masalah -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">2. Antisipasi Terhadap Masalah Saat Pulang</h3>
                </div>
                <div class="card-body">
                    <div class="d-flex" style="gap:16px">
                        <div class="field-radiobutton">
                            <RadioButton id="am-ya" name="antisipasi_masalah" value="Ya" v-model="form.antisipasi_masalah" />
                            <label for="am-ya" class="ml-2">Ya</label>
                        </div>
                        <div class="field-radiobutton">
                            <RadioButton id="am-tidak" name="antisipasi_masalah" value="Tidak" v-model="form.antisipasi_masalah" />
                            <label for="am-tidak" class="ml-2">Tidak</label>
                        </div>
                    </div>
                    <div class="mt-2" v-if="form.antisipasi_masalah === 'Ya'">
                        <label class="form-label-custom">Penjelasan</label>
                        <Textarea v-model="form.antisipasi_masalah_penjelasan" style="width:100%" :rows="3"
                            placeholder="Jelaskan antisipasi masalah, edukasi, penjelasan mengenai perawatan, pemakaian obat sesuai resep dokter, dll..." />
                    </div>
                </div>
            </div>

            <!-- 3. Bantuan Diperlukan -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">3. Bantuan Diperlukan Dalam Hal</h3>
                </div>
                <div class="card-body">
                    <div class="checkbox-grid">
                        <div v-for="item in opsiBantuan" :key="item" class="field-checkbox">
                            <Checkbox :id="'bantuan-'+item" name="bantuan_diperlukan" :value="item"
                                v-model="form.bantuan_diperlukan" />
                            <label :for="'bantuan-'+item" class="ml-2">{{ item }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pertanyaan Ya/Tidak + keterangan -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">4 - 12. Pengkajian Kebutuhan Pemulangan</h3>
                </div>
                <div class="card-body">
                    <div v-for="(q, idx) in pertanyaan" :key="q.field"
                        :class="{'pb-3 mb-3 border-bottom': idx < pertanyaan.length - 1}">
                        <label class="form-label-custom d-block">{{ idx + 4 }}. {{ q.label }}</label>
                        <div class="d-flex" style="gap:16px">
                            <div class="field-radiobutton">
                                <RadioButton :id="q.field+'-ya'" :name="q.field" value="Ya" v-model="form[q.field]" />
                                <label :for="q.field+'-ya'" class="ml-2">Ya</label>
                            </div>
                            <div class="field-radiobutton">
                                <RadioButton :id="q.field+'-tidak'" :name="q.field" value="Tidak" v-model="form[q.field]" />
                                <label :for="q.field+'-tidak'" class="ml-2">Tidak</label>
                            </div>
                        </div>
                        <input v-if="form[q.field] === 'Ya'" v-model="form[q.field + '_ket']"
                            class="form-control form-control-sm mt-2" :placeholder="q.placeholder" />
                    </div>
                </div>
                <div class="card-footer d-flex" style="gap:8px">
                    <Button label="Simpan" icon="pi pi-save" class="p-button-success"
                        @click="simpan_discharge_planning()" :disabled="isLoading || form.auth == 1" />
                    <Button label="Otorisasi (TTE)" icon="pi pi-verified" class="p-button-warning"
                        @click="call_oto()" :disabled="form.auth == 1" />
                </div>
            </div>

            <!-- Catatan Tambahan (Notes) Perubahan Discharge Planning -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-notes-medical mr-2 text-primary"></i>
                        Catatan Tambahan (Notes) Perubahan Discharge Planning
                    </h3>
                </div>
                <div class="card-body">
                    <small class="text-muted d-block mb-3">
                        <i class="fas fa-info-circle mr-1"></i>
                        Diisi apabila ada perubahan discharge planning setelah asesmen awal.
                    </small>

                    <div class="table-responsive">
                        <table class="table table-bordered table-sm align-middle">
                            <thead>
                                <tr>
                                    <th style="width:13%">Jam</th>
                                    <th style="width:12%">Profesi</th>
                                    <th>Catatan</th>
                                    <th style="width:14%">Nama / Paraf</th>
                                    <th style="width:7%" class="text-center">TTE</th>
                                    <th style="width:11%" class="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="catatanList.length === 0">
                                    <td colspan="6" class="text-center text-muted py-3">Belum ada catatan tambahan.</td>
                                </tr>
                                <tr v-for="row in catatanList" :key="row.id">
                                    <template v-if="editingCatatanId === row.id">
                                        <td>
                                            <Calendar v-model="editWaktu" :showIcon="true" showTime hourFormat="24"
                                                dateFormat="dd/mm/yy" style="width:100%" />
                                        </td>
                                        <td>-</td>
                                        <td>
                                            <Textarea v-model="editCatatan" style="width:100%" :rows="2" />
                                        </td>
                                        <td>Belum di otorisasi</td>
                                        <td class="text-center">
                                            <Button icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm" disabled />
                                        </td>
                                        <td class="text-center">
                                            <Button icon="pi pi-check" class="p-button-rounded p-button-success p-button-sm mr-1"
                                                @click="simpan_edit_catatan(row.id)" :disabled="isLoadingCatatan || !editCatatan.trim() || !editWaktu"
                                                title="Simpan" />
                                            <Button icon="pi pi-times" class="p-button-rounded p-button-secondary p-button-sm"
                                                @click="batal_edit_catatan()" title="Batal" />
                                        </td>
                                    </template>
                                    <template v-else>
                                        <td>{{ row.waktu_display }}</td>
                                        <td>{{ row.hasbeen_auth == 1 ? (row.profesi || '-') : '-' }}</td>
                                        <td style="white-space:pre-wrap">{{ row.catatan }}</td>
                                        <td>{{ row.hasbeen_auth == 1 ? row.nama_paraf : 'Belum di otorisasi' }}</td>
                                        <td class="text-center">
                                            <span v-if="row.hasbeen_auth == 1" class="text-success" title="Telah ditandatangani">
                                                <i class="pi pi-verified"></i>
                                            </span>
                                            <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                                @click="call_oto_catatan(row.id)" title="Otorisasi (TTE)" />
                                        </td>
                                        <td class="text-center">
                                            <Button v-if="row.hasbeen_auth != 1" icon="pi pi-pencil"
                                                class="p-button-rounded p-button-info p-button-sm mr-1"
                                                @click="mulai_edit_catatan(row)" title="Edit" />
                                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"
                                                @click="konfirmasi_hapus_catatan(row)" title="Hapus" />
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer d-flex" style="gap:8px">
                    <Button label="Tambah Catatan" icon="pi pi-plus" class="p-button-primary"
                        @click="buka_tambah_catatan()" />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import Textarea from 'primevue/textarea';
    import Checkbox from 'primevue/checkbox';
    import RadioButton from 'primevue/radiobutton';
    import ProgressBar from 'primevue/progressbar';

    export default {
        components: { Loading, Dialog, Textarea, Checkbox, RadioButton, ProgressBar },
        props: ['datapasien'],
        data() {
            return {
                isLoading: false,
                fullPage: false,
                showOtorisasi: false,
                stts_verif: '',
                responvalue: 0,
                catatanList: [],
                catatanBaru: '',
                catatanWaktu: new Date(),
                isLoadingCatatan: false,
                showTambahCatatan: false,
                showOtorisasiCatatan: false,
                selectedCatatanId: null,
                editingCatatanId: null,
                editCatatan: '',
                editWaktu: null,
                opsiBantuan: ['Minum obat', 'Makan', 'Menyiapkan makanan', 'Edukasi kesehatan', 'Mandi', 'Diet', 'Berpakaian', 'Transportasi'],
                pertanyaan: [
                    { field: 'ada_yang_membantu', label: 'Adakah yang membantu keperluan tersebut diatas?', placeholder: 'Jelaskan siapa yang membantu (keluarga/orang terdekat)...' },
                    { field: 'hidup_sendiri', label: 'Apakah pasien hidup / tinggal sendiri setelah keluar dari rumah sakit?', placeholder: 'Jelaskan orang yang akan merawat...' },
                    { field: 'pakai_alat_medis', label: 'Apakah pasien menggunakan peralatan medis di rumah setelah keluar rumah sakit (kateter, NGT, double lumen, oksigen)?', placeholder: 'Jelaskan...' },
                    { field: 'perlu_alat_bantu', label: 'Apakah pasien memerlukan alat bantu setelah keluar dari rumah sakit (tongkat, kursi roda, walker dll)?', placeholder: 'Jelaskan...' },
                    { field: 'perlu_perawatan_khusus', label: 'Apakah memerlukan bantuan / perawatan khusus di rumah setelah keluar rumah sakit?', placeholder: 'Jelaskan...' },
                    { field: 'masalah_kebutuhan_pribadi', label: 'Apakah pasien bermasalah dalam memenuhi kebutuhan pribadinya setelah keluar dari rumah sakit (makan, minum, toileting, dll)?', placeholder: 'Jelaskan...' },
                    { field: 'nyeri_kronis', label: 'Apakah pasien memiliki nyeri kronis dan kelelahan setelah keluar dari rumah sakit?', placeholder: 'Jelaskan...' },
                    { field: 'perlu_edukasi', label: 'Apakah pasien dan keluarga memerlukan eduaksi kesehatan setelah keluar dari rumah sakit (obat-obatan, nyeri, diit, mencari pertolongan, followup, dll)?', placeholder: 'Jelaskan...' },
                    { field: 'perlu_keterampilan_khusus', label: 'Apakah pasien dan keluarga memerlukan keterampilan khusus setelah keluar dari rumah sakit (perawatan luka, injeksi, perawatan bayi, dll)?', placeholder: 'Jelaskan...' },
                ],
                form: {
                    estimasi_pulang: null,
                    pengaruh_pasien_keluarga: '',
                    pengaruh_pekerjaan: '',
                    pengaruh_keuangan: '',
                    antisipasi_masalah: '',
                    antisipasi_masalah_penjelasan: '',
                    bantuan_diperlukan: [],
                    ada_yang_membantu: '', ada_yang_membantu_ket: '',
                    hidup_sendiri: '', hidup_sendiri_ket: '',
                    pakai_alat_medis: '', pakai_alat_medis_ket: '',
                    perlu_alat_bantu: '', perlu_alat_bantu_ket: '',
                    perlu_perawatan_khusus: '', perlu_perawatan_khusus_ket: '',
                    masalah_kebutuhan_pribadi: '', masalah_kebutuhan_pribadi_ket: '',
                    nyeri_kronis: '', nyeri_kronis_ket: '',
                    perlu_edukasi: '', perlu_edukasi_ket: '',
                    perlu_keterampilan_khusus: '', perlu_keterampilan_khusus_ket: '',
                    auth: 0,
                    last_update: ''
                }
            };
        },
        created() {
            this.get_discharge_planning();
            this.get_catatan_discharge_planning();
        },
        methods: {
            async get_discharge_planning() {
                this.isLoading = true;
                try {
                    const res = await axios.post('/get_discharge_planning', { noregister: this.datapasien.NOPENDAFTARAN });
                    const r = res.data.response;
                    if (r) {
                        Object.keys(this.form).forEach(key => {
                            if (key === 'estimasi_pulang') {
                                this.form.estimasi_pulang = r.estimasi_pulang ? new Date(r.estimasi_pulang) : null;
                            } else if (r[key] !== undefined) {
                                this.form[key] = r[key];
                            }
                        });
                        this.stts_verif = r.telah_verif || '';
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async simpan_discharge_planning() {
                this.isLoading = true;
                const payload = {
                    ...this.form,
                    noregister: this.datapasien.NOPENDAFTARAN,
                    nomr: this.datapasien.NOMR,
                    estimasi_pulang: this.form.estimasi_pulang ? this.formatDate(this.form.estimasi_pulang) : null
                };
                try {
                    const res = await axios.post('/simpan_discharge_planning', payload);
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.get_discharge_planning();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            formatDate(d) {
                const pad = n => String(n).padStart(2, '0');
                return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
            },
            async get_catatan_discharge_planning() {
                try {
                    const res = await axios.post('/get_catatan_discharge_planning', { noregister: this.datapasien.NOPENDAFTARAN });
                    this.catatanList = res.data.response || [];
                } catch (e) { console.error(e); }
            },
            buka_tambah_catatan() {
                this.catatanBaru = '';
                this.catatanWaktu = new Date();
                this.showTambahCatatan = true;
            },
            async simpan_catatan_discharge_planning() {
                if (!this.catatanBaru.trim() || !this.catatanWaktu) return;
                this.isLoadingCatatan = true;
                try {
                    const res = await axios.post('/simpan_catatan_discharge_planning', {
                        noregister: this.datapasien.NOPENDAFTARAN,
                        catatan: this.catatanBaru,
                        waktu: this.formatDate(this.catatanWaktu)
                    });
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.catatanBaru = '';
                        this.catatanWaktu = new Date();
                        this.showTambahCatatan = false;
                        this.get_catatan_discharge_planning();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoadingCatatan = false; }
            },
            call_oto() {
                this.showOtorisasi = true;
            },
            call_oto_catatan(id) {
                this.selectedCatatanId = id;
                this.showOtorisasiCatatan = true;
            },
            mulai_edit_catatan(row) {
                this.editingCatatanId = row.id;
                this.editCatatan = row.catatan;
                this.editWaktu = row.waktu ? new Date(row.waktu.replace(' ', 'T')) : new Date();
            },
            batal_edit_catatan() {
                this.editingCatatanId = null;
                this.editCatatan = '';
                this.editWaktu = null;
            },
            async simpan_edit_catatan(id) {
                if (!this.editCatatan.trim() || !this.editWaktu) return;
                this.isLoadingCatatan = true;
                try {
                    const res = await axios.post('/update_catatan_discharge_planning', {
                        id,
                        noregister: this.datapasien.NOPENDAFTARAN,
                        catatan: this.editCatatan,
                        waktu: this.formatDate(this.editWaktu)
                    });
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.batal_edit_catatan();
                        this.get_catatan_discharge_planning();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoadingCatatan = false; }
            },
            konfirmasi_hapus_catatan(row) {
                this.$confirm.require({
                    group: 'dischargePlanningNotes',
                    message: `Hapus catatan tanggal ${row.waktu_display}? Tindakan ini tidak dapat dibatalkan.`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => {
                        this.hapus_catatan(row);
                    },
                });
            },
            async hapus_catatan(row) {
                try {
                    const res = await axios.post('/hapus_catatan_discharge_planning', {
                        id: row.id,
                        noregister: this.datapasien.NOPENDAFTARAN
                    });
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.get_catatan_discharge_planning();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
            },
            handleValueCatatan(value) {
                if (value == 200) {
                    this.get_catatan_discharge_planning();
                    this.showOtorisasiCatatan = false;
                }
            },
            handleValue(value) {
                this.responvalue = value;
                if (this.responvalue == 200) {
                    this.get_discharge_planning();
                    this.showOtorisasi = false;
                }
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            }
        }
    }
</script>
<style scoped>
.form-label-custom {
    font-weight: 600;
    font-size: .85rem;
    color: #333;
    margin-bottom: 6px;
}
.checkbox-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 6px 16px;
}
.checkbox-grid .field-checkbox { display: flex; align-items: center; }
</style>
