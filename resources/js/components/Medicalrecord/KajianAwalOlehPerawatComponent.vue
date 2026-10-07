<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- Dialog Otorisasi -->
        <Dialog header="Otorisasi Kajian Perawat" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode=4 :noregister="datapasien.NOPENDAFTARAN"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- Dialog Riwayat -->
        <Dialog header="Riwayat Kajian Awal Perawat" v-model:visible="showRiwayat"
            :containerStyle="{width: '92vw'}" :modal="true">
            <DataTable :value="riwayatKajian" :paginator="true" :rows="10" stripedRows showGridlines
                scrollable scrollHeight="60vh" class="p-datatable-sm" :loading="isLoadingRiwayat"
                emptyMessage="Belum ada riwayat kajian awal untuk pasien ini.">
                <Column field="last_update" header="Tanggal" sortable frozen style="min-width:10rem">
                    <template #body="{ data }">
                        <span :title="data.last_update">{{ timeAgo(data.last_update) }}</span>
                    </template>
                </Column>
                <Column field="noregister" header="No. Register" sortable style="min-width:9rem" />
                <Column field="status_psikologi" header="Psikologi" style="min-width:9rem" />
                <Column field="status_hubungan_keluarga" header="Hub. Keluarga" style="min-width:8rem" />
                <Column field="status_spiritual" header="Spiritual" style="min-width:8rem" />
                <Column field="status_ekonomi" header="Ekonomi" style="min-width:8rem" />
                <Column header="Risiko Jatuh" style="min-width:9rem">
                    <template #body="{ data }">
                        <span class="badge" :class="data.resiko_jatuh === 'YA' ? 'badge-danger' : 'badge-success'">
                            {{ data.resiko_jatuh || '-' }}
                        </span>
                        <span v-if="data.resiko_jatuh_alat_bantu === 'YA'" class="badge badge-warning ml-1">
                            Alat Bantu
                        </span>
                    </template>
                </Column>
                <Column header="Nyeri" style="min-width:9rem">
                    <template #body="{ data }">
                        <span class="font-weight-bold">{{ data.slide_skala_nyeri }}</span>
                        <span v-if="data.lokasi_nyeri" class="text-muted"> — {{ data.lokasi_nyeri }}</span>
                    </template>
                </Column>
                <Column header="Gastrointestinal" style="min-width:8rem">
                    <template #body="{ data }">
                        <span v-if="data.gastrointestinal && data.gastrointestinal.length" class="badge badge-info"
                            v-tooltip.top="data.gastrointestinal.join(', ')">
                            {{ data.gastrointestinal.length }} item
                        </span>
                        <span v-else class="text-muted">-</span>
                    </template>
                </Column>
                <Column header="Edukasi" style="min-width:7rem">
                    <template #body="{ data }">
                        <span v-if="data.topik_edukasi && data.topik_edukasi.length" class="badge badge-info"
                            v-tooltip.top="data.topik_edukasi.join(', ')">
                            {{ data.topik_edukasi.length }} topik
                        </span>
                        <span v-else class="text-muted">-</span>
                    </template>
                </Column>
                <Column header="Dx Keperawatan" style="min-width:9rem">
                    <template #body="{ data }">
                        <span v-if="data.dx_keperawatan_nama && data.dx_keperawatan_nama.length" class="badge badge-info"
                            v-tooltip.top="data.dx_keperawatan_nama.join(', ')">
                            {{ data.dx_keperawatan_nama.length }} dx
                        </span>
                        <span v-else class="text-muted">-</span>
                    </template>
                </Column>
                <Column header="Status" style="min-width:12rem">
                    <template #body="{ data }">
                        <span v-if="data.telah_verif" class="badge badge-success">{{ data.telah_verif }}</span>
                        <span v-else class="badge badge-secondary">Belum diverifikasi</span>
                    </template>
                </Column>
                <Column header="Aksi" frozen alignFrozen="right" style="min-width:9rem">
                    <template #body="{ data }">
                        <Button label="Gunakan Data Ini" icon="pi pi-copy" class="p-button-sm p-button-outlined"
                            @click="gunakan_riwayat(data)" />
                    </template>
                </Column>
            </DataTable>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showRiwayat=false" class="p-button-text" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">

            <!-- Header bar -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-user-nurse mr-2 text-primary"></i>
                        Kajian Awal oleh Perawat
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <span v-if="stts_verif" class="badge badge-success p-2">
                            <i class="pi pi-check mr-1"></i>{{ stts_verif }}
                        </span>
                        <small v-if="form.last_update" class="text-muted">
                            <i class="far fa-clock mr-1"></i>{{ form.last_update }}
                        </small>
                        <span v-if="tanggalPengkajianTerakhir" class="badge badge-info p-2">
                            <i class="pi pi-history mr-1"></i>
                            Pengkajian sebelumnya: {{ tanggalPengkajianTerakhir }}
                        </span>
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:130px;border-radius:4px" />
                    </div>
                </div>
            </div>

            <!-- ===== PSIKOLOGI, SOSIAL, EKONOMI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-brain mr-2 text-primary"></i>
                        Psikologi, Sosial &amp; Ekonomi
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <!-- Status Psikologi -->
                        <div class="col-md-4">
                            <label class="section-label">Status Psikologi</label>
                            <div class="radio-list">
                                <div v-for="opt in ['Marah','Takut','Cemas','Depresi','Kecendrungan Bunuh Diri','Gelisah','Lain-lain','Tidak-masalah']"
                                    :key="opt" class="field-radiobutton">
                                    <RadioButton :id="'psi-'+opt" name="status_psikologi" :value="opt"
                                        v-model="form.status_psikologi" />
                                    <label :for="'psi-'+opt" class="ml-2">{{ opt }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Hubungan keluarga & Spiritual -->
                        <div class="col-md-4">
                            <label class="section-label">Hubungan dengan Keluarga</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="hub-baik" name="status_hubungan_keluarga" value="BAIK"
                                        v-model="form.status_hubungan_keluarga" />
                                    <label for="hub-baik" class="ml-2">Baik</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="hub-tidak" name="status_hubungan_keluarga" value="TIDAK BAIK"
                                        v-model="form.status_hubungan_keluarga" />
                                    <label for="hub-tidak" class="ml-2">Tidak Baik</label>
                                </div>
                            </div>

                            <label class="section-label mt-3">Status Spiritual</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="spi-baik" name="status_spiritual" value="BAIK"
                                        v-model="form.status_spiritual" />
                                    <label for="spi-baik" class="ml-2">Baik</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="spi-tidak" name="status_spiritual" value="TIDAK BAIK"
                                        v-model="form.status_spiritual" />
                                    <label for="spi-tidak" class="ml-2">Tidak Baik</label>
                                </div>
                            </div>
                        </div>

                        <!-- Ekonomi -->
                        <div class="col-md-4">
                            <label class="section-label">Status Ekonomi</label>
                            <div class="radio-list">
                                <div v-for="opt in ['BAIK','CUKUP','KURANG','SULIT DINILAI']" :key="opt"
                                    class="field-radiobutton">
                                    <RadioButton :id="'eko-'+opt" name="status_ekonomi" :value="opt"
                                        v-model="form.status_ekonomi" />
                                    <label :for="'eko-'+opt" class="ml-2">{{ opt }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== SCREENING GIZI ===== -->
            <screening-gizi-dewasa ref="gizi_form" :dataset="datapasien" :noregister="form.noregister">
            </screening-gizi-dewasa>

            <!-- ===== STATUS FISIK ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-heartbeat mr-2 text-primary"></i>
                        Status Fisik
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <!-- Gastrointestinal -->
                        <div class="col-md-5">
                            <label class="section-label">Gastrointestinal</label>
                            <small class="d-block text-muted mb-2">Gejala atau kondisi pada sistem pencernaan</small>
                            <div v-for="item in ['Nyeri Perut','Mual atau muntah','Diare atau konstipasi','Perubahan pola buang air besar','Perdarahan gastrointestinal (seperti muntah darah atau darah dalam tinja)','Nafsu makan yang menurun','Kesulitan menelan']"
                                :key="item" class="field-checkbox mb-1">
                                <Checkbox :id="'gi-'+item" :name="'gi-'+item" :value="item"
                                    v-model="form.gastrointestinal" />
                                <label :for="'gi-'+item" class="ml-2">{{ item }}</label>
                            </div>
                        </div>

                        <!-- Risiko Jatuh -->
                        <div class="col-md-7">
                            <label class="section-label">Risiko Jatuh</label>
                            <div class="rj-question">
                                <span>Apakah pasien pernah jatuh dalam 6 bulan terakhir?</span>
                                <div class="d-flex mt-1" style="gap:16px">
                                    <div class="field-radiobutton">
                                        <RadioButton id="rj-ya" name="resiko_jatuh" value="YA"
                                            v-model="form.resiko_jatuh" />
                                        <label for="rj-ya" class="ml-2"><span class="badge badge-danger">YA</span></label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="rj-tidak" name="resiko_jatuh" value="TIDAK"
                                            v-model="form.resiko_jatuh" />
                                        <label for="rj-tidak" class="ml-2"><span class="badge badge-success">TIDAK</span></label>
                                    </div>
                                </div>
                            </div>
                            <div class="rj-question mt-3">
                                <span>Apakah berjalan menggunakan alat bantu (Kruk, tripot, kursi roda)?</span>
                                <div class="d-flex mt-1" style="gap:16px">
                                    <div class="field-radiobutton">
                                        <RadioButton id="ab-ya" name="resiko_jatuh_alat_bantu" value="YA"
                                            v-model="form.resiko_jatuh_alat_bantu" />
                                        <label for="ab-ya" class="ml-2"><span class="badge badge-danger">YA</span></label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="ab-tidak" name="resiko_jatuh_alat_bantu" value="TIDAK"
                                            v-model="form.resiko_jatuh_alat_bantu" />
                                        <label for="ab-tidak" class="ml-2"><span class="badge badge-success">TIDAK</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== SKALA NYERI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-thermometer-half mr-2 text-primary"></i>
                        Skala Nyeri
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-center mb-3">
                        <div class="col-md-1 text-center">
                            <img :src="nyeriPic" height="60" width="60" style="object-fit:contain">
                            <div class="nyeri-score-box mt-1">{{ nyeriValue }}</div>
                        </div>
                        <div class="col-md-8">
                            <div class="nyeri-radio-group">
                                <div v-for="btn in nyeriButtons" :key="btn.nilai"
                                    class="nyeri-radio-label"
                                    :class="[btn.color, nyeriValue === btn.nilai ? 'nyeri-active' : '']"
                                    @click="pilihNyeri(btn.nilai)">
                                    <span class="nyeri-radio-number">{{ btn.nilai }}</span>
                                    <span class="nyeri-radio-desc">{{ btn.label }}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between mt-1">
                                <small class="text-muted">0 — Tidak nyeri</small>
                                <small class="text-muted">10 — Sangat berat</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Lokasi Nyeri</label>
                            <input v-model="form.lokasi_nyeri" class="form-control"
                                autocomplete="off" placeholder="Lokasi nyeri..." />
                        </div>
                    </div>
                    <div class="nyeri-legend-row">
                        <span><span class="nyeri-dot nyeri-0"></span> 0: Tidak ada nyeri</span>
                        <span><span class="nyeri-dot nyeri-ringan"></span> 1–3: Ringan</span>
                        <span><span class="nyeri-dot nyeri-sedang"></span> 4–6: Sedang</span>
                        <span><span class="nyeri-dot nyeri-berat"></span> 7–9: Berat</span>
                        <span><span class="nyeri-dot nyeri-parah"></span> 10: Tak tertahankan</span>
                    </div>
                </div>
            </div>

            <!-- ===== KEBUTUHAN EDUKASI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-chalkboard-teacher mr-2 text-primary"></i>
                        Kebutuhan Edukasi
                    </h3>
                </div>
                <div class="card-body">
                    <label class="section-label mb-2">Topik Edukasi yang Akan Diberikan</label>
                    <div class="checkbox-grid-2">
                        <div v-for="topik in ['Diagnosa dan kondisi medis','Penggunaan obat dan efek samping','Manajemen kondisi sehari-hari','Prosedur/tindakan medis yang akan dilakukan','Tanda-tanda peringatan yang perlu diperhatikan','Penggunaan alat kesehatan','Gaya hidup sehat']"
                            :key="topik" class="field-checkbox">
                            <Checkbox :id="'edu-'+topik" :name="'edu-'+topik" :value="topik"
                                v-model="form.topik_edukasi" />
                            <label :for="'edu-'+topik" class="ml-2">{{ topik }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== DIAGNOSA KEPERAWATAN ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-clipboard-check mr-2 text-primary"></i>
                        Masalah &amp; Diagnosa Keperawatan
                    </h3>
                </div>
                <div class="card-body p-0">
                    <table class="table table-bordered table-hover mb-0 dx-table">
                        <thead>
                            <tr><th>Diagnosa Keperawatan</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in master_diagnosa_keperawatan" :key="data.id">
                                <td>
                                    <div class="field-checkbox">
                                        <Checkbox :id="data.id" :name="data.id" :value="data.id"
                                            v-model="form.dx_keperawatanSelected" />
                                        <label :for="data.id" class="ml-2">{{ data.dx_keperawatan }}</label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex" style="gap:8px">
                    <Button label="Simpan" icon="pi pi-save" class="p-button-success"
                        @click="simpan_kajian_awal_perawat()" :disabled="isLoading" />
                    <Button label="Otorisasi" icon="pi pi-verified" class="p-button-warning"
                        @click="call_oto()" />
                    <Button label="Riwayat" icon="pi pi-history" class="p-button-outlined p-button-secondary"
                        @click="lihat_riwayat()" />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import dayjs from 'dayjs';
    import Checkbox from 'primevue/checkbox';
    import RadioButton from 'primevue/radiobutton';
    import Slider from 'primevue/slider';
    import ProgressBar from 'primevue/progressbar'
    export default {
        components: {
            Loading,
            Checkbox,
            RadioButton,
            Slider,
            ProgressBar
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                stts_verif: '',
                master_diagnosa_keperawatan: [],
                nyeriValue: 0,
                showOtorisasi: false,
                showRiwayat: false,
                riwayatKajian: [],
                isLoadingRiwayat: false,

                form: {
                    startdate: '',
                    nomr: '',
                    enddate: '',
                    status_psikologi: '',
                    last_update:'',
                    status_hubungan_keluarga: '',
                    status_spiritual: '',
                    status_ekonomi: '',
                    gastrointestinal: [],
                    resiko_jatuh: '',
                    resiko_jatuh_alat_bantu: '',
                    slide_skala_nyeri: 0,
                    lokasi_nyeri: '',

                    topik_edukasi: [],
                    dx_keperawatanSelected: []
                },
                prev_skala_nyeri_pic: 0,
                prev_skala_nyeri: [{
                        nomor: 0,
                        link: 'https://ws-simrs.link/skala_nyeri/a.png'
                    },
                    {
                        nomor: 1,
                        link: 'https://ws-simrs.link/skala_nyeri/b.png'
                    },
                    {
                        nomor: 2,
                        link: 'https://ws-simrs.link/skala_nyeri/c.png'
                    },
                    {
                        nomor: 3,
                        link: 'https://ws-simrs.link/skala_nyeri/d.png'
                    },
                    {
                        nomor: 4,
                        link: 'https://ws-simrs.link/skala_nyeri/e.png'
                    },
                    {
                        nomor: 5,
                        link: 'https://ws-simrs.link/skala_nyeri/f.png'
                    },
                ],
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.diagnosa_keperawatan();
            this.changeSlider(0);
            this.get_kajian_awal_perawat();
            this.get_riwayat_kajian_awal_perawat();
        },
        computed: {
            riwayatSebelumnya() {
                return this.riwayatKajian.filter(r => r.noregister !== this.datapasien.NOPENDAFTARAN);
            },
            tanggalPengkajianTerakhir() {
                return this.riwayatSebelumnya.length ? this.riwayatSebelumnya[0].last_update : null;
            },
            nyeriPic() {
                const n = this.nyeriValue;
                if (n === 0)           return 'https://ws-simrs.net/skala_nyeri/a.png';
                if (n >= 1 && n <= 3)  return 'https://ws-simrs.net/skala_nyeri/b.png';
                if (n >= 4 && n <= 6)  return 'https://ws-simrs.net/skala_nyeri/c.png';
                if (n >= 7 && n <= 9)  return 'https://ws-simrs.net/skala_nyeri/d.png';
                return 'https://ws-simrs.net/skala_nyeri/e.png';
            },
            nyeriButtons() {
                const colorMap = ['nyeri-btn-0','nyeri-btn-ringan','nyeri-btn-ringan','nyeri-btn-ringan','nyeri-btn-sedang','nyeri-btn-sedang','nyeri-btn-sedang','nyeri-btn-berat','nyeri-btn-berat','nyeri-btn-berat','nyeri-btn-parah'];
                const labelMap = ['Tidak','Ringan','Ringan','Ringan','Sedang','Sedang','Sedang','Berat','Berat','Berat','Parah'];
                return Object.freeze(Array.from({length: 11}, (_, i) => ({ nilai: i, color: colorMap[i], label: labelMap[i] })));
            },
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            call_oto() {
                this.showOtorisasi = true;
            },
            timeAgo(dateStr) {
                if (!dateStr) return '-';

                const then = dayjs(dateStr);
                if (!then.isValid()) return '-';

                const now = dayjs();

                const diffMinutes = now.diff(then, 'minute');
                if (diffMinutes < 1) return 'Baru saja';
                if (diffMinutes < 60) return diffMinutes + ' menit yang lalu';

                const diffHours = now.diff(then, 'hour');
                if (diffHours < 24) return diffHours + ' jam yang lalu';

                const diffDays = now.diff(then, 'day');
                if (diffDays < 7) return diffDays + ' hari yang lalu';

                const diffWeeks = now.diff(then, 'week');
                if (diffWeeks < 5) return diffWeeks + ' minggu yang lalu';

                const diffMonths = now.diff(then, 'month');
                if (diffMonths < 12) return diffMonths + ' bulan yang lalu';

                const diffYears = now.diff(then, 'year');
                return diffYears + ' tahun yang lalu';
            },
            async get_riwayat_kajian_awal_perawat() {
                this.isLoadingRiwayat = true;
                await axios.post('/get_riwayat_kajian_awal_perawat', {
                        nomr: this.datapasien.NOMR
                    })
                    .then(response => {
                        this.riwayatKajian = response.data.response || [];
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Gagal memuat riwayat kajian awal');
                    })
                    .finally(() => this.isLoadingRiwayat = false)
            },
            lihat_riwayat() {
                this.showRiwayat = true;
                this.get_riwayat_kajian_awal_perawat();
            },
            gunakan_riwayat(row) {
                this.form.status_psikologi = row.status_psikologi;
                this.form.status_hubungan_keluarga = row.status_hubungan_keluarga;
                this.form.status_spiritual = row.status_spiritual;
                this.form.status_ekonomi = row.status_ekonomi;
                this.form.resiko_jatuh = row.resiko_jatuh;
                this.form.resiko_jatuh_alat_bantu = row.resiko_jatuh_alat_bantu;
                this.form.lokasi_nyeri = row.lokasi_nyeri;
                this.form.slide_skala_nyeri = row.slide_skala_nyeri;
                this.nyeriValue = parseInt(row.slide_skala_nyeri) || 0;
                this.form.gastrointestinal = [...(row.gastrointestinal || [])];
                this.form.topik_edukasi = [...(row.topik_edukasi || [])];
                this.form.dx_keperawatanSelected = [...(row.dx_keperawatanSelected || [])];

                this.showRiwayat = false;
                this.open('success',
                    `Data dari kajian tanggal ${row.last_update} berhasil disalin. Silakan periksa kembali sebelum menyimpan.`);
            },
            handleValue(value) {

                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if (this.responvalue == 200) {
                    this.get_kajian_awal_dokter();
                    this.showOtorisasi = false;
                }
            },
            changeSlider(param) {

                let value = parseInt(param, 10); // value is 123
                if (value == 0) {
                    var img = this.prev_skala_nyeri.filter(x => x.nomor == 0)
                    this.prev_skala_nyeri_pic = img[0].link;
                }
                if (value >= 1 && value <= 3) {
                    var img = this.prev_skala_nyeri.filter(x => x.nomor == 1)
                    this.prev_skala_nyeri_pic = img[0].link;
                }
                if (value >= 4 && value <= 6) {
                    var img = this.prev_skala_nyeri.filter(x => x.nomor == 2)
                    this.prev_skala_nyeri_pic = img[0].link;
                }
                if (value >= 7 && value <= 9) {
                    var img = this.prev_skala_nyeri.filter(x => x.nomor == 3)
                    this.prev_skala_nyeri_pic = img[0].link;
                }
                if (value > 9 && value <= 10) {
                    var img = this.prev_skala_nyeri.filter(x => x.nomor == 4)
                    this.prev_skala_nyeri_pic = img[0].link;
                }
                this.form.nyeri = value

                console.log(this.prev_skala_nyeri_pic);
            },

            pilihNyeri(nilai) {
                this.nyeriValue = nilai;
            },
            async simpan_kajian_awal_perawat() {
                this.form.slide_skala_nyeri = this.nyeriValue; // sync sebelum simpan
                this.isLoading = true;
                var currentDate = new Date();
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.nomr = this.datapasien.NOMR;
                this.form.data_gizi = this.$refs.gizi_form.get_value();
                await axios.post('/kajian_awal_perawat', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.open('success', response.data.metadata.message)
                        } else {
                            this.open('warning', response.data.metadata.message)
                        }
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async diagnosa_keperawatan() //load data
            {
                var currentDate = new Date();
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                await axios.post('/diagnosa_keperawatan', this.form)
                    .then(response => {
                        this.master_diagnosa_keperawatan = response.data.response
                        this.form.dx_keperawatanSelected = response.data.selected;

                        console.log(response.data.selected)
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async get_kajian_awal_perawat() {
                var currentDate = new Date();
                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.nomr = this.datapasien.NOMR;

                await axios.post('/get_kajian_awal_perawat', this.form)
                    .then(response => {
                        console.log('data kajian perawat');
                        console.log(response.data);

                        this.form.status_psikologi = response.data.response.status_psikologi;
                        this.form.status_hubungan_keluarga = response.data.response.status_hubungan_keluarga;
                        this.form.status_spiritual = response.data.response.status_spiritual;
                        this.form.status_ekonomi = response.data.response.status_ekonomi;
                        this.form.resiko_jatuh = response.data.response.resiko_jatuh;
                        this.form.resiko_jatuh_alat_bantu = response.data.response.resiko_jatuh_alat_bantu;
                        this.form.lokasi_nyeri = response.data.response.lokasi_nyeri;
                        this.form.slide_skala_nyeri = response.data.response.slide_skala_nyeri;
                        this.nyeriValue = parseInt(response.data.response.slide_skala_nyeri) || 0;
                        this.form.topik_edukasi = response.data.response.topik_edukasi;
                        this.form.gastrointestinal = response.data.response.gastrointestinal;
                        this.stts_verif = response.data.response.telah_verif;
                        this.form.last_update = response.data.response.last_update;


                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            // open(type, message) {
            //     this.$toast.open({
            //         message: message,
            //         position: 'top-right',
            //         type: type,
            //         duration: 3000,
            //         dismissible: true
            //     })
            // },
             open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        },
    }

</script>

<style scoped>
.section-label {
    display: block; font-weight: 700; color: #444;
    margin-bottom: 6px; font-size: .82rem;
    text-transform: uppercase; letter-spacing: .04em;
}
.form-label-custom {
    display: block; font-weight: 600; color: #555;
    margin-bottom: 4px; text-transform: uppercase; letter-spacing: .04em;
}
.nyeri-radio-group { display: flex; gap: 6px; flex-wrap: wrap; }
.nyeri-radio-label {
    display: flex; flex-direction: column; align-items: center;
    cursor: pointer; padding: 6px 10px; border-radius: 8px;
    border: 2px solid transparent; min-width: 52px;
    transition: all .15s; user-select: none;
}
.nyeri-radio-label:hover { filter: brightness(.92); }
.nyeri-radio-number { font-size: 1.1rem; font-weight: 700; line-height: 1; color: #fff; }
.nyeri-radio-desc   { font-size: .62rem; color: rgba(255,255,255,.85); margin-top: 2px; text-transform: uppercase; }
.nyeri-btn-0       { background: #43a047; border-color: #2e7d32; }
.nyeri-btn-ringan  { background: #8bc34a; border-color: #558b2f; }
.nyeri-btn-sedang  { background: #ffa726; border-color: #e65100; }
.nyeri-btn-berat   { background: #ef5350; border-color: #b71c1c; }
.nyeri-btn-parah   { background: #b71c1c; border-color: #7f0000; }
.nyeri-active { box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(0,0,0,.5); transform: scale(1.12); }
.nyeri-radio-label:not(.nyeri-active) { opacity: .65; }
.nyeri-score-box {
    width: 48px; height: 48px; border-radius: 50%;
    background: #1565c0; color: #fff; font-size: 1.4rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 4px;
}
.nyeri-legend-row { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; padding-top: 8px; border-top: 1px solid #dee2e6; }
.nyeri-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.nyeri-0      { background: #43a047; }
.nyeri-ringan { background: #8bc34a; }
.nyeri-sedang { background: #ffc107; }
.nyeri-berat  { background: #ff5722; }
.nyeri-parah  { background: #b71c1c; }

/* ===== MISC ===== */
.radio-list .field-radiobutton { display: flex; align-items: center; margin-bottom: 6px; }
.rj-question { background: #f8f9fa; border-radius: 6px; padding: 10px 14px; border: 1px solid #dee2e6; }

.checkbox-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 24px;
}
.checkbox-grid-2 .field-checkbox { display: flex; align-items: center; }

.dx-table thead th {
    background: #f8f9fa; font-weight: 700;
    text-transform: uppercase; letter-spacing: .04em;
}
.dx-table tbody tr:hover { background: #e3f2fd !important; }
.dx-table td { vertical-align: middle; }
</style>
