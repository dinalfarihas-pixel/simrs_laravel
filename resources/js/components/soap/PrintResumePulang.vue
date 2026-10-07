<template>
  <section class="content">
    <div class="print-container">

      <!-- Header -->
      <div class="header">
        <div class="header-inner">
          <div class="header-logo">
            <img height="80" width="80" :src="data_rs['logo']" class="rs-logo" />
          </div>
          <div class="header-text">
            <div class="header-title">{{ data_rs['nama_rs'] }}</div>
            <div class="header-divider"></div>
            <div class="header-subtitle">DISCHARGE SUMMARY / RINGKASAN PULANG PASIEN</div>
          </div>
        </div>
      </div>

      <!-- Patient Section -->
      <div class="section-block">
        <div class="section-title">
          <span class="section-icon">&#9632;</span> PASIEN
        </div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nama</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.nama }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">No. RM</span>
              <span class="info-colon">:</span>
              <span class="info-value bold-value">{{ patient.noRm }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Tanggal Lahir</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.tanggalLahir }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Jenis Kelamin</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.jenisKelamin }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Usia</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.usia }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">NIK</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.nik }}</span>
            </div>
            <div class="info-item span-full">
              <span class="info-label">Alamat</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.alamat }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">No. Telepon</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ patient.noTlp }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Admission Section -->
      <div class="section-block">
        <div class="section-title">
          <span class="section-icon">&#9632;</span> RINGKASAN MASUK
        </div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">No. Register</span>
              <span class="info-colon">:</span>
              <span class="info-value bold-value">{{ admission.noregister }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Diantar Oleh</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.diantarOleh }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Ruang Rawat</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.ruangRawat }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Transportasi</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.transportasi }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dokter Penerima</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.dokterPenerima }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dokter Rawat</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.dokterRawat }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Tanggal Masuk</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ admission.tanggalMasuk }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Medical Records Section -->
      <div class="section-block">
        <div class="section-title">
          <span class="section-icon">&#9632;</span> RINGKASAN MEDIS
        </div>
        <div class="section-content">

          <!-- Vitals -->
          <div class="vitals-wrapper">
            <div class="vitals-header">Tanda-Tanda Vital (TTV)</div>
            <div class="vitals-grid">
              <div class="vital-card">
                <div class="vital-name">Tekanan Darah</div>
                <div class="vital-val">{{ medicalRecords.td }}</div>
              </div>
              <div class="vital-card">
                <div class="vital-name">Suhu</div>
                <div class="vital-val">{{ medicalRecords.suhu }}</div>
              </div>
              <div class="vital-card">
                <div class="vital-name">Nadi</div>
                <div class="vital-val">{{ medicalRecords.nadi }}</div>
              </div>
              <div class="vital-card">
                <div class="vital-name">GCS</div>
                <div class="vital-val">{{ medicalRecords.gcs }}</div>
              </div>
              <div class="vital-card">
                <div class="vital-name">SPO2</div>
                <div class="vital-val">{{ medicalRecords.spo2 }}</div>
              </div>
              <div class="vital-card">
                <div class="vital-name">Pernafasan</div>
                <div class="vital-val">{{ medicalRecords.pernafasan }}</div>
              </div>
            </div>
          </div>

          <div class="info-grid mt-10">
            <div class="info-item">
              <span class="info-label">Diagnosis Masuk</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ medicalRecords.diagnosisMasuk }}</span>
            </div>
            <div class="info-item span-full">
              <span class="info-label">Pemeriksaan Lab</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ medicalRecords.pemerikaaanLab }}</span>
            </div>

            <!-- Hasil Lab Abnormal — satu baris per item -->
            <div v-if="medicalRecords.hasilLabPositif && medicalRecords.hasilLabPositif.length > 0"
                class="info-item span-full">
              <span class="info-label" style="align-self:flex-start">Hasil Lab Abnormal</span>
              <span class="info-colon">:</span>
              <div class="info-value">
                <span v-for="(lab, i) in medicalRecords.hasilLabPositif" :key="i" class="lab-inline-chip">
                  <strong>{{ lab.PEMERIKSAAN }}</strong> {{ lab.HASIL }}<span v-if="i < medicalRecords.hasilLabPositif.length - 1">,&nbsp;</span>
                </span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">Diagnosis Keluar</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ medicalRecords.diagnosisKeluar }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Pemeriksaan Radiologi</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ medicalRecords.pemerikaaanRadiologi }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Discharge Section -->
      <div class="section-block">
        <div class="section-title">
          <span class="section-icon">&#9632;</span> RINGKASAN KELUAR
        </div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Tanggal Pulang</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ discharge.tanggalPulang }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Keluhan Utama</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ discharge.keluhanUtama }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Cara Keluar</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ discharge.caraKeluar }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Keadaan Saat Keluar</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ discharge.keadaanSaatKeluar }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Lama Dirawat</span>
              <span class="info-colon">:</span>
              <span class="info-value">{{ discharge.lamaDirawat }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Therapy Section -->
      <div class="section-block">
        <div class="section-title">
          <span class="section-icon">&#9632;</span> TERAPI PULANG
        </div>
        <div class="section-content">
          <table class="therapy-table">
            <thead>
              <tr>
                <th>Nama Obat</th>
                <th>Dosis</th>
                <th>Jumlah</th>
                <th>Satuan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(obat, index) in dataResume.obat_pulang" :key="index">
                <td>{{ obat.NAMABARANG }}</td>
                <td>{{ obat.REMARK_ITEM }}</td>
                <td>{{ obat.QTY }}</td>
                <td>{{ obat.SATUAN }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="signature-wrapper">
        <div class="signature-box">
          <div class="sig-location">Meulaboh, {{ discharge.tanggalPulang }}</div>
          <div class="sig-label-top">Dokter Penanggung Jawab</div>
          <div class="qr-center" v-if="admission?.dokterRawat">
            <qrcode-vue :value="admission.dokterRawat" :size="70" level="H"></qrcode-vue>
          </div>
          <div class="sig-name">{{ admission.dokterRawat }}</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="doc-footer">
        <div class="footer-line"></div>
        <div class="footer-text">{{ clinicName }} &mdash; Dokumen ini dicetak secara elektronik dan sah tanpa tanda tangan basah</div>
      </div>

    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    Loading,
    QrcodeVue
  },
  props: {
    msg: String,
  },
  data() {
    return {
      fact: [],
      form: {
        startdate: '',
        enddate: '',
      },
      data_rs: '',
      isLoading: false,
      fullPage: true,
      dataResume: [],
      clinicName: '',
      patient: {
        nama: '', noRm: '', tanggalLahir: '', jenisKelamin: '',
        usia: '', nik: '', alamat: '', noTlp: ''
      },
      admission: {
        diantarOleh: '', ruangRawat: '', transportasi: '',
        dokterPenerima: '', tanggalMasuk: '', dokterRawat: '', noregister: ''
      },
      medicalRecords: {
        td: '', suhu: '', nadi: '', gcs: '', spo2: '', pernafasan: '',
        diagnosisMasuk: '', diagnosisKeluar: '',
        pemerikaaanLab: '', pemerikaaanRadiologi: '',
        hasilLabPositif: []
      },
      discharge: {
        tanggalPulang: '-', keluhanUtama: '', caraKeluar: '',
        keadaanSaatKeluar: '', lamaDirawat: '', dokterRawat: ''
      },

    };
  },
  mounted() {
    var currentDate = new Date();
    this.form.startdate = currentDate;
  },
  created() {
    this.get_data_resume();
    this.profile_rs();
  },
  methods: {
    profile_rs() {
      axios.get('/data_rumahsakit', "")
        .then(response => { this.data_rs = response.data })
        .catch(error => { console.log(error) })
        .finally(() => this.isLoading = false)
    },
    async get_data_resume() {
      this.form.noregister = window.location.pathname.split('/').pop();
      await axios.post('/get_resume_pulang', this.form)
        .then(response => {
            console.log(response.data)
          this.dataResume = response.data;

          this.patient.nama             = this.dataResume.pasien.NAMAPASIEN;
          this.patient.noRm             = this.dataResume.pasien.NOMR;
          this.patient.tanggalLahir     = this.dataResume.pasien.TGLLAHIR;
          this.patient.jenisKelamin     = this.dataResume.pasien.JENISKELAMIN;
          this.patient.usia             = this.dataResume.pasien.USIA_LENGKAP;
          this.patient.nik              = '';
          this.patient.alamat           = this.dataResume.pasien.ALAMAT + ' - ' + this.dataResume.pasien.namakecamatan;
          this.patient.noTlp            = this.dataResume.pasien.NOTELP;

          this.admission.diantarOleh    = this.dataResume.triase_igd.diantar_oleh;
          this.admission.transportasi   = this.dataResume.triase_igd.transportasi;
          this.admission.ruangRawat     = this.dataResume.data_ranap.POLI;
          this.admission.tanggalMasuk   = this.dataResume.data_ranap.MASUKPOLY_DISPLAY;
          this.admission.dokterPenerima = this.dataResume.masuk_dari.NAMADOKTER;
          this.admission.dokterRawat    = this.dataResume.data_ranap.NAMADOKTER;
          this.admission.noregister     = this.dataResume.data_ranap.NOPENDAFTARAN;

          this.discharge.keluhanUtama      = this.dataResume.triase_igd.keluhan_utama;
          this.discharge.caraKeluar        = this.dataResume.data_ranap.STTS_PULANG;
          this.discharge.tanggalPulang     = this.dataResume.data_ranap.KELUARPOLY;
          this.discharge.lamaDirawat       = this.dataResume.data_masuk.display;
          this.discharge.keadaanSaatKeluar = this.dataResume.data_ranap.KEADAAN_SAAT_PULANG;

          this.medicalRecords.diagnosisMasuk        = this.dataResume.resume.dx_masuk?.dx_utama;
          this.medicalRecords.diagnosisKeluar       = this.dataResume.resume.dx_awal;
          this.medicalRecords.pemerikaaanLab        = this.dataResume.resume.penunjang_lab;
          this.medicalRecords.pemerikaaanRadiologi  = this.dataResume.resume.penunjang_radiologi;
          this.medicalRecords.hasilLabPositif       = this.dataResume.obat_penunjang?.hasil_lab_positiv || [];

          this.medicalRecords.td          = this.dataResume.soap_akhir.sistole + '/' + this.dataResume.soap_akhir.diastole + ' mmHg';
          this.medicalRecords.suhu        = this.dataResume.soap_akhir.suhu + ' °C';
          this.medicalRecords.nadi        = this.dataResume.soap_akhir.nadi + ' x/Menit';
          this.medicalRecords.gcs         = this.dataResume.soap_akhir.gcs;
          this.medicalRecords.spo2        = this.dataResume.soap_akhir.spo2 + ' %';
          this.medicalRecords.pernafasan  = this.dataResume.soap_akhir.pernafasan + ' x/Menit';



          this.isLoading = false;
        })
        .catch(error => { console.log(error); this.isLoading = false; })
        .finally(() => this.isLoading = false)
    },
    open(type, message) {
      this.$toast.open({ message, position: 'top-right', type, duration: 3000, dismissible: true });
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@600&display=swap');

* {
  box-sizing: border-box;
}

/* ===== CONTAINER ===== */
.print-container {
  font-family: 'Lato', sans-serif;
  max-width: 860px;
  margin: 0 auto;
  padding: 30px 36px;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 11.5pt;
  line-height: 1.4;
}

/* ===== HEADER ===== */
.header {
  border-bottom: 3px solid #005f3a;
  padding-bottom: 14px;
  margin-bottom: 18px;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header-logo img {
  border-radius: 6px;
  object-fit: contain;
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: 20pt;
  font-weight: 600;
  color: #005f3a;
  letter-spacing: 0.3px;
  line-height: 1.2;
}

.header-divider {
  width: 50px;
  height: 2px;
  background: #c8a84b;
  margin: 6px 0;
}

.header-subtitle {
  font-size: 10.5pt;
  font-weight: 700;
  color: #555;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* ===== SECTION BLOCKS ===== */
.section-block {
  margin-bottom: 14px;
  border: 1px solid #dde5de;
  border-radius: 4px;
  overflow: hidden;
}

.section-title {
  background: linear-gradient(90deg, #005f3a 0%, #007a4d 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 10pt;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 7px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 7pt;
  opacity: 0.75;
}

.section-content {
  padding: 12px 16px;
  background: #fdfdfd;
}

/* ===== INFO GRID ===== */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  row-gap: 5px;
}

.info-item {
  display: flex;
  align-items: baseline;
  gap: 0;
}

.info-item.span-full {
  grid-column: 1 / -1;
}

.info-label {
  font-weight: 700;
  font-size: 10pt;
  color: #444;
  min-width: 130px;
  flex-shrink: 0;
}

.info-colon {
  font-weight: 700;
  color: #444;
  margin-right: 8px;
  margin-left: 4px;
}

.info-value {
  font-size: 10.5pt;
  color: #1a1a1a;
  flex: 1;
}

.bold-value {
  font-weight: 700;
  color: #005f3a;
}

/* ===== VITALS ===== */
.vitals-wrapper {
  border: 1px solid #c8ddd0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.vitals-header {
  background: #e8f5ee;
  font-weight: 700;
  font-size: 10pt;
  color: #005f3a;
  padding: 5px 12px;
  border-bottom: 1px solid #c8ddd0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.vitals-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
}

.vital-card {
  padding: 8px 10px;
  border-right: 1px solid #dde5de;
  background: #fff;
  text-align: center;
}

.vital-card:last-child {
  border-right: none;
}

.vital-name {
  font-size: 8.5pt;
  color: #777;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.vital-val {
  font-size: 11pt;
  font-weight: 700;
  color: #005f3a;
}

.mt-10 {
  margin-top: 10px;
}

/* ===== THERAPY TABLE ===== */
.therapy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10.5pt;
}

.therapy-table thead tr {
  background: #f0f6f2;
}

.therapy-table th {
  padding: 7px 10px;
  text-align: left;
  font-weight: 700;
  font-size: 10pt;
  color: #005f3a;
  border: 1px solid #c8ddd0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.therapy-table td {
  padding: 5px 10px;
  border: 1px solid #dde5de;
  color: #1a1a1a;
}

.therapy-table tbody tr:nth-child(even) {
  background: #f8fbf9;
}

/* ===== SIGNATURE SECTION ===== */
.signature-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  margin-bottom: 16px;
}

.signature-box {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}

.sig-location {
  font-size: 10pt;
  color: #444;
  margin-bottom: 4px;
}

.sig-label-top {
  font-size: 9.5pt;
  font-weight: 700;
  color: #005f3a;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;
}

.qr-center {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #a0bfaa;
  padding: 8px;
  border-radius: 4px;
  background: #f8fbf9;
  margin-bottom: 4px;
}

.sig-name {
  font-size: 10.5pt;
  font-weight: 700;
  color: #1a1a1a;
  border-top: 2px solid #1a1a1a;
  padding-top: 5px;
  margin-top: 4px;
  width: 100%;
  text-align: center;
}

/* ===== FOOTER ===== */
.doc-footer {
  margin-top: 16px;
}

.footer-line {
  height: 1px;
  background: linear-gradient(90deg, #005f3a, #c8a84b, #005f3a);
  margin-bottom: 8px;
}

.footer-text {
  text-align: center;
  font-size: 8.5pt;
  color: #999;
  font-style: italic;
}

/* ===== HASIL LAB INLINE ===== */
.lab-inline-chip {
  display: inline;
  font-size: .82rem;
  color: #b71c1c;
}

/* ===== PRINT ===== */
@media print {
  body {
    background: white;
  }
  .print-container {
    padding: 10px;
    max-width: 100%;
    box-shadow: none;
  }
}
</style>
