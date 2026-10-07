<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- Dialog Otorisasi -->
        <Dialog header="Otorisasi Kajian Awal" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"
            :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode=3 :noregister="datapasien.NOPENDAFTARAN"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">
            <!-- Header -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-clipboard-list mr-2 text-primary"></i>
                        Pengkajian Awal Medis Pasien
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <span v-if="stts_verif" class="badge badge-success p-2">
                            <i class="pi pi-check mr-1"></i>{{ stts_verif }}
                        </span>
                        <small v-if="form.last_update" class="text-muted">
                            <i class="far fa-clock mr-1"></i>{{ form.last_update }}
                        </small>
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:130px;border-radius:4px" />
                    </div>
                </div>
            </div>

            <Tabs value="0">
                <TabList>
                    <Tab value="0">Kajian DPJP</Tab>
                    <Tab value="1">Kajian Perawat</Tab>
                    <Tab v-if="datapasien.JENISRAWAT=='INAP'" value="2">Discharge Planning</Tab>
                    <Tab v-if="datapasien.JENISRAWAT=='INAP'" value="3">Case Manager</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">

                        <!-- Keluhan Utama -->
                        <div class="card card-outline card-primary shadow-sm mb-3">
                            <div class="card-header">
                                <h3 class="card-title font-weight-bold mb-0">
                                    <i class="fas fa-comment-medical mr-2 text-primary"></i>
                                    Keluhan Utama
                                </h3>
                            </div>
                            <div class="card-body">
                                <Textarea v-model="form.keluhan_utama" style="width:100%" :rows="4"
                                    placeholder="Tuliskan keluhan utama pasien..." />
                                </div>
                    </div>

                    <!-- Riwayat Penyakit Sekarang -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-history mr-2 text-primary"></i>
                                Riwayat Penyakit Sekarang
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="form-label-custom mb-2">Kondisi yang diderita</label>
                                    <div class="checkbox-grid">
                                        <div v-for="item in ['Diabetes malitus','Hipertensi','Jantung','Tumor/Kanker','Osteoporosis','TBC','Asma','Skizofrenia','Hypertiroid','Hiperkolestrol']"
                                            :key="item" class="field-checkbox">
                                            <Checkbox :id="'rpsk-'+item" name="riwayat_peny_skrg_arr"
                                                :value="item" v-model="form.riwayat_peny_skrg_arr" />
                                            <label :for="'rpsk-'+item" class="ml-2">{{ item }}</label>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <label class="form-label-custom">Lainnya</label>
                                        <input v-model="form.riwayat_peny_skrg_lainnya"
                                            class="form-control form-control-sm" placeholder="Lainnya..." />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label-custom">Deskripsi Riwayat Penyakit</label>
                                    <Textarea v-model="form.riwayat_peny_skrg" style="width:100%" :rows="6"
                                        placeholder="Tuliskan riwayat penyakit sekarang..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alergi -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-allergies mr-2 text-primary"></i>
                                Riwayat Alergi
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="field-checkbox mb-2">
                                        <Checkbox id="al-obat" name="elergi" value="Obat" v-model="form.elergi_arr" />
                                        <label for="al-obat" class="ml-2">Alergi Obat</label>
                                    </div>
                                    <div class="field-checkbox mb-2">
                                        <Checkbox id="al-makan" name="elergi" value="Makanan" v-model="form.elergi_arr" />
                                        <label for="al-makan" class="ml-2">Alergi Makanan</label>
                                    </div>
                                    <div class="field-checkbox">
                                        <Checkbox id="al-lain" name="elergi" value="Lainnya" v-model="form.elergi_arr" />
                                        <label for="al-lain" class="ml-2">Lainnya</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label-custom">Deskripsi Alergi</label>
                                    <Textarea v-model="form.elergi_deskripsi" style="width:100%" :rows="4"
                                        placeholder="Penjelasan riwayat alergi..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Riwayat Penyakit Keluarga -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-users mr-2 text-primary"></i>
                                Riwayat Penyakit Keluarga
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="checkbox-grid">
                                        <div v-for="item in ['Diabetes malitus','Hipertensi','Jantung','Tumor/Kanker','Osteoporosis','TBC','Asma','Skizofrenia','Hypertiroid','Hiperkolestrol']"
                                            :key="item" class="field-checkbox">
                                            <Checkbox :id="'kel-'+item" name="riwayat_panyakit_kel"
                                                :value="item" v-model="form.riwayat_panyakit_kel" />
                                            <label :for="'kel-'+item" class="ml-2">{{ item }}</label>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <label class="form-label-custom">Lainnya</label>
                                        <input v-model="form.riwayat_panyakit_kel_lainnya"
                                            class="form-control form-control-sm" placeholder="Lainnya..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pemeriksaan Sistemik -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-stethoscope mr-2 text-primary"></i>
                                Pemeriksaan Sistemik
                            </h3>
                        </div>
                        <div class="card-body p-0">
                            <table class="table table-bordered table-hover mb-0 survey-table">
                                <thead>
                                    <tr>
                                        <th style="width:30%">Objek</th>
                                        <th class="text-center" style="width:80px">Normal</th>
                                        <th>Jika Tidak Normal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in data_survey_fisik" :key="data.survey">
                                        <td class="font-weight-bold align-middle">{{ data.survey }}</td>
                                        <td class="text-center align-middle">
                                            <RadioButton :id="'sv-'+data.survey" :name="'sv-'+data.survey"
                                                value="NORMAL" v-model="data.hasil" />
                                        </td>
                                        <td>
                                            <input v-model="data.hasil" class="form-control form-control-sm"
                                                autocomplete="off" type="text" placeholder="Deskripsikan..." />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Pemeriksaan Penunjang -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-vials mr-2 text-primary"></i>
                                Pemeriksaan Penunjang
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="form-label-custom">Laboratorium</label>
                                    <input v-model="form.lab" class="form-control" placeholder="Hasil laboratorium..." />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label-custom">Radiologi</label>
                                    <input v-model="form.radiologi" class="form-control" placeholder="Hasil radiologi..." />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label-custom">Lainnya</label>
                                    <input v-model="form.penunjang_lainnya" class="form-control" placeholder="Penunjang lainnya..." />
                                </div>
                            </div>

                            <!-- Hasil Lab Abnormal — teks sebaris -->
                            <div v-if="hasil_lab_positif && hasil_lab_positif.length > 0" class="mt-3 lab-inline-wrap">
                                <span class="lab-inline-title">
                                    <i class="fas fa-flask mr-1 text-warning"></i>Hasil Lab Abnormal:
                                </span>
                                <span v-for="(lab, i) in hasil_lab_positif" :key="i" class="lab-inline-item">
                                    {{ lab.KATEGORI }} — <strong>{{ lab.PEMERIKSAAN }}</strong> {{ lab.HASIL }}<span v-if="i < hasil_lab_positif.length - 1"> &bull; </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Diagnosa -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-diagnoses mr-2 text-primary"></i>
                                Diagnosa/Prosedur
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="form-label-custom">
                                        Diagnosa Utama
                                        <span class="text-danger ml-1">*</span>
                                    </label>
                                    <Textarea v-model="form.diagnosautama" :rows="6" class="form-control"
                                        placeholder="Contoh: Stroke Hemoragik, Hipertensi Emergency..." />
                                    <small class="form-help-text">
                                        <i class="fas fa-info-circle mr-1"></i>
                                        Diagnosis utama yang menjadi alasan utama pasien dirawat.
                                    </small>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label-custom">Diagnosa Sekunder</label>
                                    <Textarea v-model="form.diagnosasekunder" :rows="6" class="form-control"
                                        placeholder="Contoh: Diabetes Mellitus Tipe 2, Anemia..." />
                                    <small class="form-help-text">
                                        <i class="fas fa-info-circle mr-1"></i>
                                        Penyakit penyerta (komorbiditas) yang mempengaruhi kondisi atau penanganan pasien.
                                        Pisahkan dengan koma jika lebih dari satu.
                                    </small>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label-custom">Prosedur</label>
                                    <Textarea v-model="form.prosedur" :rows="6" class="form-control"
                                        placeholder="Contoh: Operasi Sesar, Intubasi..." />
                                    <small class="form-help-text">
                                        <i class="fas fa-info-circle mr-1"></i>
                                        Tindakan atau prosedur medis yang telah atau akan dilakukan selama perawatan. Opsional jika belum ada.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex" style="gap:8px">
                            <Button label="Simpan" icon="pi pi-save" class="p-button-success"
                                @click="simpan_kajian_awal_dokter()" :disabled="isLoading" />
                            <Button label="Otorisasi" icon="pi pi-verified" class="p-button-warning"
                                @click="call_oto()" />
                        </div>
                    </div>


                    </TabPanel>
                    <TabPanel value="1">

                    <kajianawalpasienPerawat :datapasien="datapasien"></kajianawalpasienPerawat>

                    </TabPanel>
                    <TabPanel v-if="datapasien.JENISRAWAT=='INAP'" value="2">

                    <discharge-planning :datapasien="datapasien"></discharge-planning>

                    </TabPanel>
                    <TabPanel v-if="datapasien.JENISRAWAT=='INAP'" value="3">

                    <case-manager :datapasien="datapasien"></case-manager>

                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Textarea from 'primevue/textarea';
    import Checkbox from 'primevue/checkbox';
    import RadioButton from 'primevue/radiobutton';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import ProgressBar from 'primevue/progressbar';

    export default {
        components: { Loading, Textarea, Checkbox, RadioButton, Tabs, TabList, Tab, TabPanels, TabPanel, ProgressBar },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                showOtorisasi: false,
                responvalue: 0,
                stts_verif: '',
                hasil_lab_positif: [],
                form: {
                    keluhan_utama: '',
                    riwayat_peny_skrg: '',
                    riwayat_peny_skrg_arr: [],
                    riwayat_peny_skrg_lainnya: '',
                    elergi_deskripsi: '',
                    elergi_arr: [],
                    riwayat_panyakit_kel_lainnya: '',
                    riwayat_panyakit_kel: [],
                    lab: '',
                    radiologi: '',
                    penunjang_lainnya: '',
                    diagnosautama: '',
                    prosedur:'',
                    diagnosasekunder: '',
                    data_survey_fisik: [],
                    last_update: ''
                },
                data_survey_fisik: [],
                isLoading: false,
                fullPage: false
            };
        },
        created() {
            this.get_kajian_awal_dokter();
            this.survey_fisik_ranap();
        },
        methods: {
            call_oto() { this.showOtorisasi = true; },
            handleValue(value) {
                this.responvalue = value;
                if (this.responvalue == 200) {
                    this.get_kajian_awal_dokter();
                    this.showOtorisasi = false;
                }
            },
            async survey_fisik_ranap() {
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                try {
                    const res = await axios.post('/survey_fisik_ranap', this.form);
                    this.data_survey_fisik = res.data.response;
                } catch (e) { console.error(e); }
            },
            async simpan_kajian_awal_dokter() {
                this.form.data_survey_fisik = this.data_survey_fisik;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.nomr = this.datapasien.NOMR;
                this.isLoading = true;

                console.log('Data yang akan disimpan:', this.form); // Debug: cek data sebelum dikirim
                try {
                    const res = await axios.post('/kajian_awal_dokter', this.form);
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.get_kajian_awal_dokter();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async get_kajian_awal_dokter() {
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                try {
                    const res = await axios.post('/get_kajian_awal_dokter_v2', this.form);
                    const r = res.data.response;
                    this.form.keluhan_utama              = r.keluhan_utama;
                    this.form.riwayat_peny_skrg          = r.riwayat_peny_skrg;
                    this.form.lab                        = r.penunjang_lab;
                    this.form.radiologi                  = r.penunjang_radiologi;
                    this.form.penunjang_lainnya          = r.penunjang_lainnya;
                    this.form.diagnosautama              = r.dx_awal;
                    this.form.diagnosasekunder           = r.dx_sekunder;
                    this.form.elergi_arr                 = r.elergi_arr || [];
                    this.form.elergi_deskripsi           = r.elergi_deskripsi;
                    this.form.riwayat_peny_skrg_arr      = r.riwayat_peny_skrg_arr || [];
                    this.form.riwayat_panyakit_kel       = r.riwayat_panyakit_kel || [];
                    this.form.last_update                = r.last_update;
                    this.form.riwayat_panyakit_kel_lainnya = r.riwayat_panyakit_kel_lainnya;
                    this.form.prosedur                    = r.prosedur;
                    this.stts_verif                      = r.telah_verif;
                    this.hasil_lab_positif               = res.data.hasil_lab_positif || [];
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            // open(type, message) {
            //     this.$toast.open({ message, position: 'top-right', type, duration: 3000, dismissible: true });
            // },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            }
            }
    }
</script>
<style scoped>
.form-help-text {
    display: block;
    margin-top: 5px;
    color: #6c757d;
    line-height: 1.5;
    font-style: italic;
}

/* ===== CHECKBOX GRID ===== */
.checkbox-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 16px;
}
.checkbox-grid .field-checkbox { display: flex; align-items: center; }

/* ===== SURVEY TABLE ===== */
.survey-table thead th {
    background: #f8f9fa;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
    vertical-align: middle;
}
.survey-table tbody tr:hover { background: #e3f2fd !important; }

/* ===== HASIL LAB INLINE ===== */
.lab-inline-wrap {
    background: #fff8e1;
    border: 1px solid #ffe082;
    border-radius: 6px;
    padding: 8px 12px;
    line-height: 1.7;
}
.lab-inline-title {
    font-weight: 700;
    color: #e65100;
    margin-right: 6px;
}
.lab-inline-item {
    color: #555;
}
.lab-inline-item strong {
    color: #c62828;
}
</style>
