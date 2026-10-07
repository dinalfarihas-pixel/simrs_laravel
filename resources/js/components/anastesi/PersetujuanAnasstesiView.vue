<template>
    <div class="content">
        <div class="container">
            <div class="main-card">
                <div class="card-header">
                    <h2>Form Anestesi - Rekam Medis Anestesi Sedasi</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <!-- Patient Information -->
                        <Panel header="Informasi Pasien" class="form-panel">
                            
                            <div class="panel-body">
                                <div class="form-grid">
                                    <div class="form-col-4">
                                        <div class="form-field">
                                            <label for="nama">Nama *</label>
                                            <InputText id="nama" v-model="form.nama"  style="width: 15em;" placeholder="Nama pasien"
                                                
                                                :class="{'input-invalid': submitted && !form.nama}" />
                                            <small v-if="submitted && !form.nama" class="error-text">Nama wajib
                                                diisi</small>
                                        </div>
                                    </div>
                                    <div class="form-col-4">
                                        <div class="form-field">
                                            <label for="jenisKelamin">Jenis Kelamin *</label>
                                            <select id="jenisKelamin" v-model="form.jenisKelamin" class="form-select"
                                                :class="{'input-invalid': submitted && !form.jenisKelamin}">
                                                <option value="">Pilih jenis kelamin</option>
                                                <option value="L">Laki-laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                            <small v-if="submitted && !form.jenisKelamin" class="error-text">Jenis
                                                kelamin wajib dipilih</small>
                                        </div>
                                    </div>
                                    <div class="form-col-4">
                                        <div class="form-field">
                                            <label for="noReg">No. Reg/RM *</label>
                                            <input id="noReg" v-model="form.noReg" type="text"
                                                placeholder="No. Registrasi" class="form-input"
                                                :class="{'input-invalid': submitted && !form.noReg}" />
                                            <small v-if="submitted && !form.noReg" class="error-text">No. Registrasi
                                                wajib diisi</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-grid">
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="umur">Umur</label>
                                            <input id="umur" v-model="form.umur" type="number" placeholder="Umur"
                                                class="form-input" min="0" max="150" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="beratBadan">BB (Kg)</label>
                                            <input id="beratBadan" v-model="form.beratBadan" type="number"
                                                placeholder="Berat badan" class="form-input" step="0.1" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="tinggiBadan">TB (Cm)</label>
                                            <input id="tinggiBadan" v-model="form.tinggiBadan" type="number"
                                                placeholder="Tinggi badan" class="form-input" step="0.1" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="ruangan">Ruangan</label>
                                            <input id="ruangan" v-model="form.ruangan" type="text" placeholder="Ruangan"
                                                class="form-input" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-grid">
                                    <div class="form-col-6">
                                        <div class="form-field">
                                            <label for="diagnosisPraOperasi">Diagnosis Pra Operasi / Tindakan</label>
                                            <textarea id="diagnosisPraOperasi" v-model="form.diagnosisPraOperasi"
                                                placeholder="Diagnosis pra operasi" rows="3"
                                                class="form-textarea"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-col-6">
                                        <div class="form-field">
                                            <label for="rencanaOperasi">Rencana Operasi / Tindakan</label>
                                            <textarea id="rencanaOperasi" v-model="form.rencanaOperasi"
                                                placeholder="Rencana operasi" rows="3" class="form-textarea"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>

                        <!-- Vital Signs -->
                        <div class="form-panel">
                            <div class="panel-header">Tanda-tanda Vital</div>
                            <div class="panel-body">
                                <div class="form-grid">
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="tekananDarah">TD (mmHg)</label>
                                            <input id="tekananDarah" v-model="form.tekananDarah" type="text"
                                                placeholder="120/80" class="form-input" />
                                        </div>
                                    </div>
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="nadi">Nadi (/menit)</label>
                                            <input id="nadi" v-model="form.nadi" type="number" placeholder="80"
                                                class="form-input" min="0" max="300" />
                                        </div>
                                    </div>
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="suhu">Suhu (°C)</label>
                                            <input id="suhu" v-model="form.suhu" type="number" placeholder="36.5"
                                                class="form-input" step="0.1" min="30" max="45" />
                                        </div>
                                    </div>
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="respirasi">RR (/menit)</label>
                                            <input id="respirasi" v-model="form.respirasi" type="number"
                                                placeholder="20" class="form-input" min="0" max="60" />
                                        </div>
                                    </div>
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="spo2">SpO2 (%)</label>
                                            <input id="spo2" v-model="form.spo2" type="number" placeholder="98"
                                                class="form-input" min="0" max="100" />
                                        </div>
                                    </div>
                                    <div class="form-col-2">
                                        <div class="form-field">
                                            <label for="skalaNyeri">Skala Nyeri</label>
                                            <select id="skalaNyeri" v-model="form.skalaNyeri" class="form-select">
                                                <option value="">Pilih skala</option>
                                                <option v-for="n in 11" :key="n-1" :value="n-1">{{ n-1 }} -
                                                    {{ getNyeriLabel(n-1) }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Assessment -->
                        <div class="form-panel">
                            <div class="panel-header">Assessment Prasedasi / Anestesi</div>
                            <div class="panel-body">
                                <div class="form-grid">
                                    <div class="form-col-6">
                                        <h5>Anamnesis</h5>
                                        <div class="form-field">
                                            <label>Riwayat Anestesi</label>
                                            <div class="radio-group">
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.riwayatAnestesi" value="ada" />
                                                    <span>Ada</span>
                                                </label>
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.riwayatAnestesi" value="tidak" />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form-field">
                                            <label>Riwayat Alergi</label>
                                            <div class="radio-group">
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.riwayatAlergi" value="ada" />
                                                    <span>Ada</span>
                                                </label>
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.riwayatAlergi" value="tidak" />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form-field">
                                            <label for="obatDikonsumsi">Obat-obatan yang sedang dikonsumsi</label>
                                            <Textarea id="obatDikonsumsi" v-model="form.obatDikonsumsi"
                                                placeholder="Daftar obat yang sedang dikonsumsi" rows="3"
                                                class="form-textarea"></Textarea>
                                        </div>
                                    </div>

                                    <div class="form-col-6">
                                        <h5>Evaluasi Faktor Risiko</h5>
                                        <div class="form-grid">
                                            <div class="form-col-6">
                                                <div class="form-field">
                                                    <label>Jantung</label>
                                                    <div class="radio-group">
                                                        <label class="radio-item">
                                                            <input type="radio" v-model="form.evaluasi.jantung"
                                                                value="normal" />
                                                            <span>Normal</span>
                                                        </label>
                                                        <label class="radio-item">
                                                            <input type="radio" v-model="form.evaluasi.jantung"
                                                                value="tidak" />
                                                            <span>Tidak Normal</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-col-6">
                                                <div class="form-field">
                                                    <label>Paru</label>
                                                    <div class="radio-group">
                                                        <label class="radio-item">
                                                            <input type="radio" v-model="form.evaluasi.paru"
                                                                value="normal" />
                                                            <span>Normal</span>
                                                        </label>
                                                        <label class="radio-item">
                                                            <input type="radio" v-model="form.evaluasi.paru"
                                                                value="tidak" />
                                                            <span>Tidak Normal</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-field">
                                            <label>Diabetes</label>
                                            <div class="radio-group">
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.evaluasi.diabetes" value="ya" />
                                                    <span>Ya</span>
                                                </label>
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.evaluasi.diabetes"
                                                        value="tidak" />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form-field">
                                            <label>Hipertensi</label>
                                            <div class="radio-group">
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.evaluasi.hipertensi" value="ya" />
                                                    <span>Ya</span>
                                                </label>
                                                <label class="radio-item">
                                                    <input type="radio" v-model="form.evaluasi.hipertensi"
                                                        value="tidak" />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Physical Examination -->
                        <div class="form-panel">
                            <div class="panel-header">Pemeriksaan Fisik</div>
                            <div class="panel-body">
                                <div class="form-grid">
                                    <div class="form-col-6">
                                        <h5>Sistem Pernapasan</h5>
                                        <div class="checkbox-group">
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.bronkitis" />
                                                <span>Bronkitis</span>
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.dispneu" />
                                                <span>Dispneu</span>
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.orthopneu" />
                                                <span>Orthopneu</span>
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.pneumonia" />
                                                <span>Pneumonia</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-col-6">
                                        <h5>Sistem Kardiovaskular</h5>
                                        <div class="checkbox-group">
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.angina" />
                                                <span>Angina</span>
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.pacemaker" />
                                                <span>Pacemaker</span>
                                            </label>
                                            <label class="checkbox-item">
                                                <input type="checkbox" v-model="form.pemeriksaan.disritmia" />
                                                <span>Disritmia</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Laboratory Results -->
                        <div class="form-panel">
                            <div class="panel-header">Hasil Laboratorium</div>
                            <div class="panel-body">
                                <div class="form-grid">
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="hb">Hb (g/dL)</label>
                                            <input id="hb" v-model="form.lab.hb" type="number" placeholder="12.5"
                                                class="form-input" step="0.1" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="hct">Hct (%)</label>
                                            <input id="hct" v-model="form.lab.hct" type="number" placeholder="37.5"
                                                class="form-input" step="0.1" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="leukosit">Leukosit</label>
                                            <input id="leukosit" v-model="form.lab.leukosit" type="number"
                                                placeholder="8000" class="form-input" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="trombosit">Trombosit</label>
                                            <input id="trombosit" v-model="form.lab.trombosit" type="number"
                                                placeholder="250000" class="form-input" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="gds">GDS (mg/dL)</label>
                                            <input id="gds" v-model="form.lab.gds" type="number" placeholder="100"
                                                class="form-input" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="ureum">Ureum (mg/dL)</label>
                                            <input id="ureum" v-model="form.lab.ureum" type="number" placeholder="30"
                                                class="form-input" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="creatinin">Creatinin (mg/dL)</label>
                                            <input id="creatinin" v-model="form.lab.creatinin" type="number"
                                                placeholder="1.0" class="form-input" step="0.1" />
                                        </div>
                                    </div>
                                    <div class="form-col-3">
                                        <div class="form-field">
                                            <label for="sgot">SGOT (U/L)</label>
                                            <input id="sgot" v-model="form.lab.sgot" type="number" placeholder="25"
                                                class="form-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ASA Classification -->
                        <div class="form-panel">
                            <div class="panel-header">Kesimpulan Assessment Prasedasi / Anestesi</div>
                            <div class="panel-body">
                                <div class="form-field">
                                    <label>Klasifikasi ASA</label>
                                    <div class="radio-group horizontal">
                                        <label class="radio-item" v-for="n in 5" :key="n">
                                            <input type="radio" v-model="form.asaClassification" :value="n" />
                                            <span>ASA {{ n }}</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-field">
                                    <label for="keterangan">Keterangan</label>
                                    <textarea id="keterangan" v-model="form.keterangan"
                                        placeholder="Keterangan tambahan" rows="3" class="form-textarea"></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Buttons -->
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                <span v-if="loading" class="spinner"></span>
                                {{ loading ? 'Menyimpan...' : 'Simpan Form' }}
                            </button>
                            <button type="button" class="btn btn-secondary" @click="resetForm" :disabled="loading">
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Toast Messages -->
        <div v-if="showToast" :class="['toast', toastType]">
            {{ toastMessage }}
        </div>
    </div>
</template>

<script>
    import InputText from 'primevue/inputtext';
    import InputNumber from 'primevue/inputnumber';
    import InputMask from 'primevue/inputmask';
    import Dropdown from 'primevue/dropdown';
    import Textarea from 'primevue/textarea';
    import RadioButton from 'primevue/radiobutton';
    import Checkbox from 'primevue/checkbox';
    import Button from 'primevue/button';
    import Panel from 'primevue/panel';
    import Toast from 'primevue/toast';
    import ConfirmDialog from 'primevue/confirmdialog';
    export default {
        name: 'AnesthesiaForm',
        components: {
            InputText,
            InputNumber,
            InputMask,
            Dropdown,
            Textarea,
            RadioButton,
            Checkbox,
            Button,
            Panel,
            Toast,
            ConfirmDialog
        },
        data() {
            return {
                submitted: false,
                loading: false,
                showToast: false,
                toastMessage: '',
                toastType: 'success',
                form: {
                    nama: '',
                    jenisKelamin: '',
                    noReg: '',
                    umur: null,
                    beratBadan: null,
                    tinggiBadan: null,
                    ruangan: '',
                    diagnosisPraOperasi: '',
                    rencanaOperasi: '',
                    tekananDarah: '',
                    nadi: null,
                    suhu: null,
                    respirasi: null,
                    spo2: null,
                    skalaNyeri: null,
                    riwayatAnestesi: '',
                    riwayatAlergi: '',
                    obatDikonsumsi: '',
                    evaluasi: {
                        jantung: '',
                        paru: '',
                        diabetes: '',
                        hipertensi: ''
                    },
                    pemeriksaan: {
                        bronkitis: false,
                        dispneu: false,
                        orthopneu: false,
                        pneumonia: false,
                        angina: false,
                        pacemaker: false,
                        disritmia: false
                    },
                    lab: {
                        hb: null,
                        hct: null,
                        leukosit: null,
                        trombosit: null,
                        gds: null,
                        ureum: null,
                        creatinin: null,
                        sgot: null
                    },
                    asaClassification: null,
                    keterangan: ''
                }
            }
        },
        methods: {
            getNyeriLabel(scale) {
                const labels = {
                    0: 'Tidak Nyeri',
                    1: 'Nyeri Ringan',
                    2: 'Nyeri Ringan',
                    3: 'Nyeri Sedang',
                    4: 'Nyeri Sedang',
                    5: 'Nyeri Sedang',
                    6: 'Nyeri Berat',
                    7: 'Nyeri Berat',
                    8: 'Nyeri Sangat Berat',
                    9: 'Nyeri Sangat Berat',
                    10: 'Nyeri Tak Tertahankan'
                };
                return labels[scale] || '';
            },

            showToastMessage(message, type = 'success') {
                this.toastMessage = message;
                this.toastType = type;
                this.showToast = true;
                setTimeout(() => {
                    this.showToast = false;
                }, 3000);
            },

            submitForm() {
                this.submitted = true;

                // Validate required fields
                if (!this.form.nama || !this.form.jenisKelamin || !this.form.noReg) {
                    this.showToastMessage('Mohon lengkapi data pasien yang wajib diisi', 'error');
                    return;
                }

                this.loading = true;

                // Simulate form submission
                setTimeout(() => {
                    console.log('Form submitted:', this.form);

                    this.showToastMessage('Form anestesi berhasil disimpan', 'success');

                    this.loading = false;
                    this.submitted = false;

                    // Here you would typically send the data to your backend
                    // fetch('/api/anesthesia-forms', {
                    //   method: 'POST',
                    //   headers: { 'Content-Type': 'application/json' },
                    //   body: JSON.stringify(this.form)
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //   this.showToastMessage('Form berhasil disimpan', 'success');
                    // })
                    // .catch(error => {
                    //   this.showToastMessage('Terjadi kesalahan saat menyimpan form', 'error');
                    // });
                }, 1000);
            },

            resetForm() {
                if (confirm('Apakah Anda yakin ingin mereset form? Semua data akan hilang.')) {
                    this.form = {
                        nama: '',
                        jenisKelamin: '',
                        noReg: '',
                        umur: null,
                        beratBadan: null,
                        tinggiBadan: null,
                        ruangan: '',
                        diagnosisPraOperasi: '',
                        rencanaOperasi: '',
                        tekananDarah: '',
                        nadi: null,
                        suhu: null,
                        respirasi: null,
                        spo2: null,
                        skalaNyeri: null,
                        riwayatAnestesi: '',
                        riwayatAlergi: '',
                        obatDikonsumsi: '',
                        evaluasi: {
                            jantung: '',
                            paru: '',
                            diabetes: '',
                            hipertensi: ''
                        },
                        pemeriksaan: {
                            bronkitis: false,
                            dispneu: false,
                            orthopneu: false,
                            pneumonia: false,
                            angina: false,
                            pacemaker: false,
                            disritmia: false
                        },
                        lab: {
                            hb: null,
                            hct: null,
                            leukosit: null,
                            trombosit: null,
                            gds: null,
                            ureum: null,
                            creatinin: null,
                            sgot: null
                        },
                        asaClassification: null,
                        keterangan: ''
                    };
                    this.submitted = false;

                    this.showToastMessage('Form berhasil direset', 'info');
                }
            }
        }
    }

</script>

<style scoped>
    /* Base Styles */
    .anesthesia-form {
        background-color: #f8fafc;
        min-height: 100vh;
        padding: 20px;
    }

    .form-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .main-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        overflow: hidden;
    }

    .card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 24px;
        text-align: center;
    }

    .card-header h2 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 600;
    }

    .card-body {
        padding: 24px;
    }

    /* Form Panel Styles */
    .form-panel {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 24px;
        overflow: hidden;
    }

    .panel-header {
        background: #e2e8f0;
        color: #374151;
        font-weight: 600;
        font-size: 1.1rem;
        padding: 16px 24px;
        border-bottom: 1px solid #cbd5e0;
    }

    .panel-body {
        padding: 24px;
        background: white;
    }

    /* Grid System */
    .form-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-col-2 {
        flex: 0 0 calc(16.666% - 16px);
    }

    .form-col-3 {
        flex: 0 0 calc(25% - 15px);
    }

    .form-col-4 {
        flex: 0 0 calc(33.333% - 14px);
    }

    .form-col-6 {
        flex: 0 0 calc(50% - 10px);
    }

    /* Form Elements */
    .form-field {
        margin-bottom: 20px;
    }

    .form-field label {
        display: block;
        margin-bottom: 8px;
        color: #374151;
    }

    .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        transition: all 0.2s ease;
        background-color: white;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-textarea {
        resize: vertical;
        min-height: 80px;
    }

    .input-invalid {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-text {
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 4px;
        display: block;
    }

    /* Radio and Checkbox Styles */
    .radio-group,
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .radio-group.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
    }

    .radio-item,
    .checkbox-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
    }

    .radio-item input[type="radio"],
    .checkbox-item input[type="checkbox"] {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        accent-color: #667eea;
    }

    .radio-item span,
    .checkbox-item span {
        color: #374151;
    }

    .radio-item:hover,
    .checkbox-item:hover {
        color: #667eea;
    }

    /* Section Headers */
    h5 {
        color: #374151;
        font-weight: 600;
        margin-bottom: 16px;
        font-size: 1.1rem;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 8px;
    }

    /* Buttons */
    .form-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-start;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
    }

    .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
        background: #6b7280;
        color: white;
    }

    .btn-secondary:hover:not(:disabled) {
        background: #4b5563;
        transform: translateY(-1px);
    }

    /* Loading Spinner */
    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Toast Messages */
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .toast.success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .toast.error {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .toast.info {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .anesthesia-form {
            padding: 10px;
        }

        .card-header {
            padding: 16px;
        }

        .card-header h2 {
            font-size: 1.5rem;
        }

        .card-body {
            padding: 16px;
        }

        .panel-body {
            padding: 16px;
        }

        .form-grid {
            gap: 16px;
        }

        .form-col-2,
        .form-col-3,
        .form-col-4,
        .form-col-6 {
            flex: 0 0 100%;
        }

        .radio-group.horizontal {
            flex-direction: column;
        }

        .form-actions {
            flex-direction: column;
        }

        .btn {
            width: 100%;
            justify-content: center;
        }

        .toast {
            right: 10px;
            left: 10px;
            top: 10px;
        }
    }

    @media (max-width: 480px) {
        .card-header h2 {
            font-size: 1.25rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
            padding: 10px;
        }
    }

    /* Print Styles */
    @media print {
        .anesthesia-form {
            background: white;
            padding: 0;
        }

        .main-card {
            box-shadow: none;
            border: 1px solid #000;
        }

        .card-header {
            background: white !important;
            color: black !important;
            border-bottom: 2px solid #000;
        }

        .form-actions,
        .toast {
            display: none;
        }

        .form-panel {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    }

</style>
