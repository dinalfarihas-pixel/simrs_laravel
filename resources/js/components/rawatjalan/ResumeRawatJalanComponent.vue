<template>
  <section class="content">
    <div class="container-fluid px-0">

      <ProgressBar v-if="isLoading" mode="indeterminate"
        style="height:3px;border-radius:0;margin-bottom:0" />

      <!-- ── MAIN CARD ── -->
      <div class="card card-outline card-primary shadow-sm">

        <!-- Card Header -->
        <div class="card-header d-flex align-items-center justify-content-between">
          <h3 class="card-title font-weight-bold mb-0">
            <i class="pi pi-file-edit mr-2" style="color:#1976d2"></i>
            Resume Medis &mdash; Rawat Jalan
          </h3>
          <Tag v-if="noregister" severity="info" icon="pi pi-hashtag"
            :value="'No. Register : ' + noregister" />
        </div>

        <!-- Card Body -->
        <div class="card-body">

          <!-- ANAMNESIS -->
          <Panel header="ANAMNESIS" class="resume-panel mb-3" :toggleable="false">
            <p class="panel-text">{{ asesmen.subjek || '—' }}</p>
          </Panel>

          <!-- PEMERIKSAAN FISIK -->
          <Panel header="PEMERIKSAAN FISIK" class="resume-panel mb-3" :toggleable="false">
            <div class="vitals-grid">
              <div class="vital-item">
                <span class="vital-label">Tensi</span>
                <span class="vital-value">{{ asesmen.tensi || '—' }} <small>mmHg</small></span>
              </div>
              <div class="vital-item">
                <span class="vital-label">SpO₂</span>
                <span class="vital-value">{{ asesmen.sp2o || '—' }}</span>
              </div>
              <div class="vital-item">
                <span class="vital-label">Respirasi / mnt</span>
                <span class="vital-value">{{ asesmen.respirasi_perm || '—' }}</span>
              </div>
              <div class="vital-item">
                <span class="vital-label">Berat Badan</span>
                <span class="vital-value">{{ asesmen.berat_badan || '—' }} <small>kg</small></span>
              </div>
              <div class="vital-item">
                <span class="vital-label">Suhu</span>
                <span class="vital-value">{{ asesmen.suhu || '—' }} <small>°C</small></span>
              </div>
              <div class="vital-item">
                <span class="vital-label">GCS (E, V, M)</span>
                <span class="vital-value">{{ asesmen.cgs || '—' }}</span>
              </div>
              <div class="vital-item">
                <span class="vital-label">Nadi / mnt</span>
                <span class="vital-value">{{ asesmen.nadi_permenit || '—' }}</span>
              </div>
              <div class="vital-item">
                <span class="vital-label">Tinggi Badan</span>
                <span class="vital-value">{{ asesmen.tinggi_badan || '—' }} <small>cm</small></span>
              </div>
            </div>
            <Divider />
            <div class="bmi-row">
              <span class="vital-label">BMI</span>
              <span class="vital-value">{{ bmi }} <small>kg/m²</small></span>
              <Tag v-if="bmiKategori" :severity="bmiSeverity" :value="bmiKategori" class="ml-2" />
            </div>
          </Panel>

          <!-- PEMERIKSAAN PENUNJANG -->
          <Panel header="PEMERIKSAAN PENUNJANG" class="resume-panel mb-3" :toggleable="false">
            <p class="panel-text">{{ asesmen.objek || '—' }}</p>
          </Panel>

          <!-- DIAGNOSA + ICD 9/10 -->
          <div class="split-row mb-3">
            <Panel header="DIAGNOSA" class="resume-panel split-panel" :toggleable="false">
              <p class="panel-text">{{ asesmen.asesmen || '—' }}</p>
            </Panel>
            <Panel header="ICD 9 / 10" class="resume-panel split-panel" :toggleable="false">
              <div v-if="diagnosaList.length === 0" class="icd-row">
                <span class="icd-label">Diagnosa</span><span>—</span>
              </div>
              <div v-for="(dx, i) in diagnosaList" :key="i" class="icd-row">
                <span class="icd-label">Diagnosa</span>
                <span>{{ dx }}</span>
              </div>
              <Divider />
              <div class="icd-row">
                <span class="icd-label">Procedure</span>
                <span>{{ procedureText }}</span>
              </div>
            </Panel>
          </div>

          <!-- OBAT + TINDAKAN -->
          <div class="split-row mb-3">
            <Panel header="TERAPI / OBAT YANG DIBERIKAN" class="resume-panel split-panel" :toggleable="false">
              <div v-if="obatList.length === 0" class="panel-text">—</div>
              <ul v-else class="item-list">
                <li v-for="(obat, i) in obatList" :key="i">{{ obat }}</li>
              </ul>
            </Panel>
            <Panel header="TINDAKAN" class="resume-panel split-panel" :toggleable="false">
              <div v-if="tindakanList.length === 0" class="panel-text">—</div>
              <ul v-else class="item-list">
                <li v-for="(t, i) in tindakanList" :key="i"><strong>{{ t }}</strong></li>
              </ul>
            </Panel>
          </div>

          <!-- RENCANA TINDAK LANJUT -->
          <Panel header="RENCANA TINDAK LANJUT (PLAN)" class="resume-panel mb-3" :toggleable="false">
            <p class="panel-text">{{ asesmen.plan || '—' }}</p>
          </Panel>

          <Divider />

          <!-- TANDA TANGAN DOKTER -->
          <div class="sig-block">
            <div class="sig-inner">
              <p class="sig-title">Dokter Penanggung Jawab Pasien</p>
              <div class="qr-wrap">
                <qrcode-vue v-if="dokter" :value="dokter" :size="40" level="H" />
              </div>
              <Divider />
              <p class="sig-name">{{ dokter || '—' }}</p>
            </div>
          </div>

        </div><!-- /card-body -->
      </div><!-- /card -->

    </div>
  </section>
</template>

<script>
import QrcodeVue  from 'qrcode.vue';
import Panel      from 'primevue/panel';
import Divider    from 'primevue/divider';
import Tag        from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';

export default {
  name: 'ResumeRawatJalanComponent',
  components: { QrcodeVue, Panel, Divider, Tag, ProgressBar },

  props: {
    initNoregister: { type: String, default: '' },
    initNama:       { type: String, default: '' },
    initNorm:       { type: String, default: '' },
    initDokter:     { type: String, default: '' },
  },

  data() {
    return {
      noregister: '',
      nama:       '',
      norm:       '',
      dokter:     '',
      asesmen: {
        suhu: '', tensi: '', sp2o: '', tinggi_badan: '', respirasi_perm: '',
        cgs: '', berat_badan: '', nadi_permenit: '', subjek: '', objek: '',
        asesmen: '', plan: '', diagnosa: '', procedure: '', obat: '',
        tindakan_non_icd: '', no_register: ''
      },
      isLoading: false,
    };
  },

  computed: {
    bmi() {
      const bb = parseFloat(this.asesmen.berat_badan);
      const tb = parseFloat(this.asesmen.tinggi_badan) / 100;
      if (!bb || !tb || isNaN(bb) || isNaN(tb)) return '—';
      return (bb / (tb * tb)).toFixed(1);
    },
    bmiKategori() {
      const b = parseFloat(this.bmi);
      if (isNaN(b)) return '';
      if (b < 18.5) return 'Underweight';
      if (b < 25)   return 'Normal';
      if (b < 30)   return 'Overweight';
      return 'Obesitas';
    },
    bmiSeverity() {
      const b = parseFloat(this.bmi);
      if (isNaN(b))  return 'info';
      if (b < 18.5)  return 'info';
      if (b < 25)    return 'success';
      if (b < 30)    return 'warn';
      return 'danger';
    },
    obatList() {
      if (!this.asesmen.obat) return [];
      return this.asesmen.obat
        .split('\n')
        .map(l => l.trim().replace(/\r$/, '').trim())
        .filter(l => l.length > 0)
        .map(l => {
          const parts = l.split('@');
          if (parts.length >= 2) {
            const name   = parts[0].trim();
            const tokens = parts[1].trim().split(/\s+/).filter(t => t);
            return `${name} — ${tokens[tokens.length - 1] || ''}`;
          }
          return l;
        });
    },
    tindakanList() {
      if (!this.asesmen.tindakan_non_icd) return [];
      return this.asesmen.tindakan_non_icd
        .split('\n')
        .map(l => l.trim().replace(/\r$/, '').trim())
        .filter(l => l.length > 0);
    },
    diagnosaList() {
      if (!this.asesmen.diagnosa) return [];
      return this.asesmen.diagnosa
        .split('\n')
        .map(l => l.trim().replace(/\r$/, '').trim())
        .filter(l => l.length > 0);
    },
    procedureText() {
      if (!this.asesmen.procedure) return '—';
      const val = this.asesmen.procedure.trim();
      return val.length > 0 ? val : '—';
    }
  },

  watch: {
    initNoregister(val) {
      if (val) {
        this.noregister = val;
        this.nama       = this.initNama;
        this.norm       = this.initNorm;
        this.dokter     = this.initDokter;
        this.loadData();
      }
    }
  },

  created() {
    this.resolveParams();
    this.loadData();
  },

  methods: {
    resolveParams() {
      if (this.initNoregister) {
        this.noregister = this.initNoregister;
        this.nama       = this.initNama;
        this.norm       = this.initNorm;
        this.dokter     = this.initDokter;
      } else {
        const segments  = window.location.pathname.split('/').filter(s => s);
        this.noregister = segments[segments.length - 1] || '';
        const params    = new URLSearchParams(window.location.search);
        this.nama       = params.get('nama')   || '';
        this.norm       = params.get('norm')   || '';
        this.dokter     = params.get('dokter') || '';
      }
    },
    async loadData() {
      if (!this.noregister) return;
      this.isLoading = true;
      try {
        const res  = await axios.get(`/getdata_asesmen/${this.noregister}`);
        const data = res.data;
        if (data && data.response) {
          this.asesmen = data.response;
          if (!this.dokter) this.dokter = data.response.dokter || '';
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>

<style scoped>
/* ── PANEL HEADER ── */
:deep(.resume-panel > .p-panel-header) {
  background: #00897B;
  color: #fff;
  font-weight: 700;
  font-size: 9pt;
  letter-spacing: 1px;
  padding: 7px 14px;
  border-radius: 0;
}
:deep(.resume-panel > .p-panel-content-container > .p-panel-content) {
  padding: 12px 14px;
  font-size: 10.5pt;
  min-height: 36px;
}
:deep(.resume-panel) {
  border-radius: 4px;
  overflow: hidden;
}
:deep(.resume-panel .p-panel-header-actions) {
  display: none;
}

/* ── TEXT ── */
.panel-text {
  margin: 0;
  line-height: 1.7;
  white-space: pre-wrap;
}

/* ── VITALS ── */
.vitals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 0;
}
.vital-item {
  display: flex;
  flex-direction: column;
  padding-right: 12px;
}
.vital-label {
  font-size: 8pt;
  color: #888;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.vital-value {
  font-size: 11pt;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 2px;
}
.vital-value small {
  font-weight: 400;
  color: #666;
  font-size: 9pt;
}
.bmi-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ml-2 { margin-left: 8px; }

/* ── SPLIT ── */
.split-row {
  display: flex;
  gap: 12px;
}
.split-panel {
  flex: 1;
}

/* ── ICD ── */
.icd-row {
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 10.5pt;
}
.icd-label {
  font-weight: 700;
  min-width: 76px;
  flex-shrink: 0;
}

/* ── LISTS ── */
.item-list {
  margin: 0;
  padding-left: 18px;
  line-height: 1.9;
  font-size: 10.5pt;
}

/* ── SIGNATURE ── */
.sig-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.sig-inner {
  width: 220px;
  text-align: center;
}
.sig-title {
  font-size: 9.5pt;
  color: #555;
  margin-bottom: 8px;
}
.qr-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
.sig-name {
  font-size: 10.5pt;
  font-weight: 700;
  margin-top: 4px;
}

/* ── PRINT ── */
@media print {
  .card { box-shadow: none !important; border: none !important; }
  .card-header { border-bottom: 2px solid #1a1a1a; }
}
</style>
