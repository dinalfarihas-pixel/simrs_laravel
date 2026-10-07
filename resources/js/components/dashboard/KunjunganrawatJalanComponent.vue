<template>
  <section class="content">
    <div class="container-fluid">
      <loading v-model:active="isLoading" :is-full-page="fullPage" />

      <!-- ===== Filter Card ===== -->
      <div class="filter-card mb-4">
        <div class="filter-card-header">
          <div>
            <h4 class="filter-card-title">
              <i class="fas fa-chart-line mr-2"></i>Dashboard Kunjungan Pasien
            </h4>
            <p class="filter-card-subtitle">
              Informasi kunjungan pasien dalam bentuk grafik, tabel, dan metrik untuk pengambilan keputusan yang cepat dan efisien.
            </p>
          </div>
          <div class="compare-toggle-group">
            <span class="compare-toggle-label">Mode Perbandingan</span>
            <label class="toggle-switch">
              <input
                type="checkbox"
                id="compareMode"
                v-model="compareMode"
                @change="onCompareModeChange"
              />
              <span class="toggle-track">
                <span class="toggle-thumb"></span>
              </span>
            </label>
          </div>
        </div>

        <div class="filter-card-body">
          <!-- Primary filter row -->
          <div class="filter-row">
            <div class="filter-group">
              <label class="filter-label">
                <i class="fas fa-user-md"></i> Dokter
                <span class="filter-hint">— abaikan untuk semua</span>
              </label>
              <Select
                class="w-100"
                id="caradatang"
                :showClear="true"
                filter
                v-model="form.dokterSelected"
                :options="master_dokter"
                optionLabel="NAMADOKTER"
                placeholder="Semua dokter"
              />
            </div>
            <div class="filter-group">
              <label class="filter-label">
                <i class="fas fa-wallet"></i> Cara Bayar
                <span class="filter-hint">— abaikan untuk semua</span>
              </label>
              <MultiSelect
                class="w-100"
                id="carabayar"
                :showClear="true"
                filter
                display="chip"
                v-model="form.carabayarSelected"
                :options="master_carabayar"
                optionLabel="NAMA"
                placeholder="Semua cara bayar"
              />
            </div>
            <div class="filter-group">
              <label class="filter-label">
                <i class="fas fa-calendar-alt"></i>
                {{ compareMode ? 'Periode Dipilih — Awal' : 'Tanggal Awal' }}
              </label>
              <Calendar
                v-model="form.tanggalawal"
                class="w-100"
                :showIcon="true"
                view="date"
                dateFormat="dd/mm/yy"
                :yearNavigator="true"
                yearRange="2000:2030"
                placeholder="Pilih tanggal awal"
                appendTo="body"
              />
            </div>
            <div class="filter-group">
              <label class="filter-label">
                <i class="fas fa-calendar-check"></i>
                {{ compareMode ? 'Periode Dipilih — Akhir' : 'Tanggal Akhir' }}
              </label>
              <Calendar
                v-model="form.tanggalakhir"
                class="w-100"
                :showIcon="true"
                view="date"
                dateFormat="dd/mm/yy"
                :yearNavigator="true"
                yearRange="2000:2030"
                placeholder="Pilih tanggal akhir"
                appendTo="body"
              />
            </div>
            <div class="filter-actions">
              <Button
                label="Tampilkan"
                @click="handleSubmit"
                :loading="isLoading"
                icon="pi pi-search"
                class="p-button p-button-primary btn-primary-action"
                :disabled="!isFormValid"
              />
              <Button
                label="Reset"
                @click="resetForm"
                icon="pi pi-refresh"
                class="p-button p-button-secondary btn-secondary-action"
                outlined
              />
            </div>
          </div>

          <!-- Comparison period row -->
          <div v-if="compareMode" class="compare-row mt-3">
            <div class="compare-row-badge">
              <i class="fas fa-exchange-alt mr-1"></i> Periode Pembanding
            </div>
            <div class="filter-row">
              <div class="filter-group">
                <label class="filter-label">Tanggal Awal Pembanding</label>
                <Calendar
                  v-model="compareForm.tanggalawal"
                  class="w-100"
                  :showIcon="true"
                  view="date"
                  dateFormat="dd/mm/yy"
                  :yearNavigator="true"
                  yearRange="2000:2030"
                  placeholder="Pilih tanggal awal pembanding"
                  appendTo="body"
                />
              </div>
              <div class="filter-group">
                <label class="filter-label">Tanggal Akhir Pembanding</label>
                <Calendar
                  v-model="compareForm.tanggalakhir"
                  class="w-100"
                  :showIcon="true"
                  view="date"
                  dateFormat="dd/mm/yy"
                  :yearNavigator="true"
                  yearRange="2000:2030"
                  placeholder="Pilih tanggal akhir pembanding"
                  appendTo="body"
                />
              </div>
              <div class="filter-actions">
                <Button
                  label="Bandingkan"
                  @click="handleCompareSubmit"
                  :loading="isLoading"
                  icon="pi pi-chart-line"
                  class="p-button p-button-warning btn-primary-action"
                  :disabled="!isCompareFormValid"
                />
                <div class="quick-wrap">
                  <Button
                    label="Quick"
                    icon="pi pi-clock"
                    class="p-button p-button-outlined btn-secondary-action"
                    @click="showQuickCompare = !showQuickCompare"
                  />
                  <div v-if="showQuickCompare" class="quick-dropdown">
                    <a class="quick-item" href="#" @click.prevent="quickCompare('lastMonth')">
                      <i class="fas fa-calendar mr-2"></i>vs Bulan Lalu
                    </a>
                    <a class="quick-item" href="#" @click.prevent="quickCompare('lastQuarter')">
                      <i class="fas fa-calendar-week mr-2"></i>vs Kuartal Lalu
                    </a>
                    <a class="quick-item" href="#" @click.prevent="quickCompare('lastYear')">
                      <i class="fas fa-history mr-2"></i>vs Tahun Lalu
                    </a>
                    <a class="quick-item" href="#" @click.prevent="quickCompare('samePeriodLastYear')">
                      <i class="fas fa-clone mr-2"></i>vs Periode Tahun Lalu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Comparison Summary ===== -->
      <div v-if="compareMode && hasComparisonData" class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="compare-card compare-card-blue">
            <div class="compare-card-icon">
              <i class="fas fa-walking"></i>
            </div>
            <div class="compare-card-body">
              <div class="compare-card-label">Kunjungan Rawat Jalan</div>
              <div class="compare-card-value">{{ formatNumber(grand_total_rajal) }}</div>
              <div class="compare-card-sub">Periode Saat Ini</div>
            </div>
            <div class="compare-card-delta">
              <span :class="['delta-badge', rajalComparison.percentage >= 0 ? 'delta-up' : 'delta-down']">
                <i :class="getComparisonIcon(rajalComparison)"></i>
                {{ Math.abs(rajalComparison.percentage) }}%
              </span>
              <div class="compare-card-vs">vs {{ formatNumber(grand_total_rajal_compare) }}</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="compare-card compare-card-green">
            <div class="compare-card-icon">
              <i class="fas fa-bed"></i>
            </div>
            <div class="compare-card-body">
              <div class="compare-card-label">Kunjungan Rawat Inap</div>
              <div class="compare-card-value">{{ formatNumber(grand_total_ranap) }}</div>
              <div class="compare-card-sub">Periode Saat Ini</div>
            </div>
            <div class="compare-card-delta">
              <span :class="['delta-badge', ranapComparison.percentage >= 0 ? 'delta-up' : 'delta-down']">
                <i :class="getComparisonIcon(ranapComparison)"></i>
                {{ Math.abs(ranapComparison.percentage) }}%
              </span>
              <div class="compare-card-vs">vs {{ formatNumber(grand_total_ranap_compare) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Summary Cards ===== -->
      <CardComponent
        v-if="hasData"
        :gt_ranap="grand_total_ranap"
        :gt_rajal="grand_total_rajal"
        :gt_ranap_compare="compareMode ? grand_total_ranap_compare : null"
        :gt_rajal_compare="compareMode ? grand_total_rajal_compare : null"
        :compare_mode="compareMode"
        :fact_rajal="fact"
        :fact_ranap="dataranap"
        :months="months"
        :month_keys="monthKeys"
        :total_monthly_rajal="total_monhtly_rajal"
        :total_monthly_ranap="total_monhtly_ranap"
      />

      <!-- ===== Charts ===== -->
      <div class="row" v-if="hasData">
        <div class="col-lg-6 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-blue">
              <div class="viz-header-left">
                <span class="viz-card-title">Kunjungan Rawat Jalan</span>
                <span class="viz-total-badge">{{ formatNumber(grand_total_rajal) }}</span>
              </div>
              <span
                v-if="compareMode && hasComparisonData"
                :class="['delta-chip', rajalComparison.percentage >= 0 ? 'chip-up' : 'chip-down']"
              >
                <i :class="getComparisonIcon(rajalComparison)"></i>
                {{ rajalComparison.percentage > 0 ? '+' : '' }}{{ rajalComparison.percentage }}%
              </span>
            </div>
            <div class="viz-card-body">
              <Chart type="bar" :data="graf_rajal" :options="chartOptions" class="chart-container" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-green">
              <div class="viz-header-left">
                <span class="viz-card-title">Kunjungan Rawat Inap</span>
                <span class="viz-total-badge">{{ formatNumber(grand_total_ranap) }}</span>
              </div>
              <span
                v-if="compareMode && hasComparisonData"
                :class="['delta-chip', ranapComparison.percentage >= 0 ? 'chip-up' : 'chip-down']"
              >
                <i :class="getComparisonIcon(ranapComparison)"></i>
                {{ ranapComparison.percentage > 0 ? '+' : '' }}{{ ranapComparison.percentage }}%
              </span>
            </div>
            <div class="viz-card-body">
              <Chart type="bar" :data="graf_ranap" :options="chartOptions" class="chart-container" />
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Detail Tables ===== -->
      <div class="row" v-if="hasData">
        <!-- Rawat Jalan per Poli -->
        <div class="col-lg-6 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-plain">
              <span class="viz-card-title">
                <i class="fas fa-clinic-medical mr-2 text-primary"></i>Detail Rawat Jalan per Poli
              </span>
              <div class="header-actions">
                <div v-if="compareMode" class="toggle-inline">
                  <input
                    class="toggle-inline-input"
                    type="checkbox"
                    id="showRajalComparison"
                    v-model="showTableComparisons.rajal"
                  />
                  <label class="toggle-inline-label" for="showRajalComparison">Tampilkan Perbandingan</label>
                </div>
                <downloadExcel
                  :data="excelDataRajal"
                  name="kunjungan_rawat_jalan.xls"
                  type="xls"
                >
                  <button class="btn-excel">
                    <i class="fas fa-file-excel"></i> Excel
                  </button>
                </downloadExcel>
              </div>
            </div>
            <div class="viz-card-body p-0">
              <div class="table-scroll">
                <table class="pro-table">
                  <thead>
                    <tr>
                      <th class="col-name">Poli</th>
                      <th v-for="month in months" :key="month" class="col-month text-center">{{ month }}</th>
                      <th class="col-total text-center">Total</th>
                      <th v-if="compareMode && showTableComparisons.rajal && hasComparisonData" class="col-delta text-center">Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in fact"
                      :key="index"
                      @click="handleRowClick_rajal(data)"
                      class="pro-row clickable"
                      :title="`Klik untuk melihat detail ${data.POLI}`"
                    >
                      <td class="col-name fw-600">{{ data.POLI }}</td>
                      <td v-for="month in monthKeys" :key="month" class="text-center">
                        {{ formatNumber(data[month]?.value || 0) }}
                        <div v-if="compareMode && showTableComparisons.rajal && hasComparisonData" class="inline-delta">
                          <small :class="getComparisonClass(getPoliComparison('rajal', data.POLI, month))">
                            {{ getPoliComparison('rajal', data.POLI, month).percentage > 0 ? '+' : '' }}{{ getPoliComparison('rajal', data.POLI, month).percentage }}%
                          </small>
                        </div>
                      </td>
                      <td class="text-center fw-600 total-cell">
                        {{ formatNumber(data.TOTAL) }}
                        <div v-if="compareMode && showTableComparisons.rajal && hasComparisonData" class="inline-delta">
                          <small :class="getComparisonClass(getPoliTotalComparison('rajal', data.POLI))">
                            {{ getPoliTotalComparison('rajal', data.POLI).percentage > 0 ? '+' : '' }}{{ getPoliTotalComparison('rajal', data.POLI).percentage }}%
                          </small>
                        </div>
                      </td>
                      <td v-if="compareMode && showTableComparisons.rajal && hasComparisonData" class="text-center">
                        <span :class="['delta-chip-sm', getPoliTotalComparison('rajal', data.POLI).percentage >= 0 ? 'chip-up' : 'chip-down']">
                          <i :class="getComparisonIcon(getPoliTotalComparison('rajal', data.POLI))"></i>
                          {{ Math.abs(getPoliTotalComparison('rajal', data.POLI).percentage) }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="pro-footer">
                      <td class="fw-600">TOTAL</td>
                      <td v-for="month in monthKeys" :key="month" class="text-center fw-600">
                        {{ formatNumber(total_monhtly_rajal[month] || 0) }}
                      </td>
                      <td class="text-center fw-600">{{ formatNumber(grand_total_rajal) }}</td>
                      <td v-if="compareMode && showTableComparisons.rajal && hasComparisonData" class="text-center">
                        <span :class="['delta-chip-sm', rajalComparison.percentage >= 0 ? 'chip-up' : 'chip-down']">
                          <i :class="getComparisonIcon(rajalComparison)"></i>
                          {{ Math.abs(rajalComparison.percentage) }}%
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Rawat Inap per Ruangan -->
        <div class="col-lg-6 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-plain">
              <span class="viz-card-title">
                <i class="fas fa-bed mr-2 text-success"></i>Detail Rawat Inap per Ruangan
              </span>
              <div class="header-actions">
                <div v-if="compareMode" class="toggle-inline">
                  <input
                    class="toggle-inline-input"
                    type="checkbox"
                    id="showRanapComparison"
                    v-model="showTableComparisons.ranap"
                  />
                  <label class="toggle-inline-label" for="showRanapComparison">Tampilkan Perbandingan</label>
                </div>
                <downloadExcel
                  :data="excelDataRanap"
                  name="kunjungan_rawat_inap.xls"
                  type="xls"
                >
                  <button class="btn-excel">
                    <i class="fas fa-file-excel"></i> Excel
                  </button>
                </downloadExcel>
              </div>
            </div>
            <div class="viz-card-body p-0">
              <div class="table-scroll">
                <table class="pro-table">
                  <thead>
                    <tr>
                      <th class="col-name">Ruangan</th>
                      <th v-for="month in months" :key="month" class="col-month text-center">{{ month }}</th>
                      <th class="col-total text-center">Total</th>
                      <th v-if="compareMode && showTableComparisons.ranap && hasComparisonData" class="col-delta text-center">Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, index) in dataranap" :key="index" class="pro-row">
                      <td class="col-name fw-600">{{ data.POLI }}</td>
                      <td v-for="month in monthKeys" :key="month" class="text-center">
                        {{ formatNumber(data[month]?.value || 0) }}
                        <div v-if="compareMode && showTableComparisons.ranap && hasComparisonData" class="inline-delta">
                          <small :class="getComparisonClass(getPoliComparison('ranap', data.POLI, month))">
                            {{ getPoliComparison('ranap', data.POLI, month).percentage > 0 ? '+' : '' }}{{ getPoliComparison('ranap', data.POLI, month).percentage }}%
                          </small>
                        </div>
                      </td>
                      <td class="text-center fw-600 total-cell">
                        {{ formatNumber(data.TOTAL) }}
                        <div v-if="compareMode && showTableComparisons.ranap && hasComparisonData" class="inline-delta">
                          <small :class="getComparisonClass(getPoliTotalComparison('ranap', data.POLI))">
                            {{ getPoliTotalComparison('ranap', data.POLI).percentage > 0 ? '+' : '' }}{{ getPoliTotalComparison('ranap', data.POLI).percentage }}%
                          </small>
                        </div>
                      </td>
                      <td v-if="compareMode && showTableComparisons.ranap && hasComparisonData" class="text-center">
                        <span :class="['delta-chip-sm', getPoliTotalComparison('ranap', data.POLI).percentage >= 0 ? 'chip-up' : 'chip-down']">
                          <i :class="getComparisonIcon(getPoliTotalComparison('ranap', data.POLI))"></i>
                          {{ Math.abs(getPoliTotalComparison('ranap', data.POLI).percentage) }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="pro-footer">
                      <td class="fw-600">TOTAL</td>
                      <td v-for="month in monthKeys" :key="month" class="text-center fw-600">
                        {{ formatNumber(total_monhtly_ranap[month] || 0) }}
                      </td>
                      <td class="text-center fw-600">{{ formatNumber(grand_total_ranap) }}</td>
                      <td v-if="compareMode && showTableComparisons.ranap && hasComparisonData" class="text-center">
                        <span :class="['delta-chip-sm', ranapComparison.percentage >= 0 ? 'chip-up' : 'chip-down']">
                          <i :class="getComparisonIcon(ranapComparison)"></i>
                          {{ Math.abs(ranapComparison.percentage) }}%
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Jenis Peserta ===== -->
      <div class="row" v-if="hasData && jenispeserta.labels">
        <div class="col-lg-8 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-plain">
              <span class="viz-card-title">
                <i class="fas fa-users mr-2 text-info"></i>Distribusi Jenis Peserta
              </span>
            </div>
            <div class="viz-card-body">
              <Chart type="doughnut" :data="jenispeserta" :options="doughnutOptions" style="height: 380px;" />
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-4">
          <div class="viz-card">
            <div class="viz-card-header viz-header-plain">
              <span class="viz-card-title">
                <i class="fas fa-list-ul mr-2 text-info"></i>Detail Jenis Peserta
              </span>
              <div class="header-actions">
                <div v-if="compareMode" class="toggle-inline">
                  <input
                    class="toggle-inline-input"
                    type="checkbox"
                    id="showPesertaComparison"
                    v-model="showTableComparisons.peserta"
                  />
                  <label class="toggle-inline-label" for="showPesertaComparison">Perbandingan</label>
                </div>
                <downloadExcel
                  :data="excelDataPeserta"
                  name="jenis_peserta.xls"
                  type="xls"
                >
                  <button class="btn-excel">
                    <i class="fas fa-file-excel"></i> Excel
                  </button>
                </downloadExcel>
              </div>
            </div>
            <div class="viz-card-body p-0">
              <div class="table-scroll">
                <table class="pro-table">
                  <thead>
                    <tr>
                      <th class="text-center" style="width:36px;">#</th>
                      <th>Jenis Peserta</th>
                      <th class="text-center">Jumlah</th>
                      <th class="text-center">%</th>
                      <th v-if="compareMode && showTableComparisons.peserta && hasComparisonData" class="text-center">Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, index) in table_jenis_peserta" :key="index" class="pro-row">
                      <td class="text-center text-muted">{{ index + 1 }}</td>
                      <td class="fw-600">{{ data.JENISPESERTA }}</td>
                      <td class="text-center">{{ formatNumber(data.JUMLAH) }}</td>
                      <td class="text-center">
                        <span class="pct-badge">{{ data.PERSEN }}%</span>
                      </td>
                      <td v-if="compareMode && showTableComparisons.peserta && hasComparisonData" class="text-center">
                        <span :class="['delta-chip-sm', getPesertaComparison(data.JENISPESERTA).percentage >= 0 ? 'chip-up' : 'chip-down']">
                          <i :class="getComparisonIcon(getPesertaComparison(data.JENISPESERTA))"></i>
                          {{ Math.abs(getPesertaComparison(data.JENISPESERTA).percentage) }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Empty State ===== -->
      <div v-if="!hasData && !isLoading" class="empty-state">
        <div class="empty-icon-wrap">
          <i class="fas fa-chart-bar"></i>
        </div>
        <h5 class="empty-title">Belum Ada Data Ditampilkan</h5>
        <p class="empty-desc">
          Pilih rentang tanggal dan klik <strong>Tampilkan</strong> untuk melihat dashboard kunjungan pasien.
          <span v-if="compareMode"> Aktifkan Mode Perbandingan untuk analisis lebih mendalam.</span>
        </p>
      </div>

    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Chart from 'primevue/chart';

export default {
  name: 'MedicalDashboard',
  components: {
    Loading,
    Chart
  },
  props: {
    msg: String,
  },
  data() {
    return {
      compareMode: false,
      showQuickCompare: false,
      showTableComparisons: {
        rajal: false,
        ranap: false,
        peserta: false
      },
      master_dokter:[],
      master_carabayar:[],

      fact: [],
      dataranap: [],
      table_jenis_peserta: [],

      fact_compare: [],
      dataranap_compare: [],
      table_jenis_peserta_compare: [],

      grand_total_ranap: 0,
      grand_total_rajal: 0,
      total_monhtly_rajal: {},
      total_monhtly_ranap: {},

      grand_total_ranap_compare: 0,
      grand_total_rajal_compare: 0,
      total_monhtly_rajal_compare: {},
      total_monhtly_ranap_compare: {},

      form: {
        tanggalawal: null,
        tanggalakhir: null,
        mode: 0,
        dokterSelected:null,
        carabayarSelected:[]
      },

      compareForm: {
        tanggalawal: null,
        tanggalakhir: null,
        mode: 0
      },

      isLoading: false,
      fullPage: true,

      graf_ranap: { labels: [], datasets: [] },
      graf_rajal: { labels: [], datasets: [] },
      jenispeserta: { labels: [], datasets: [] },

      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
      monthKeys: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES'],

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Bulan' }
          },
          y: {
            display: true,
            title: { display: true, text: 'Jumlah Kunjungan' },
            beginAtZero: true
          }
        }
      },

      doughnutOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      }
    };
  },

  computed: {
    hasData() {
      return this.fact.length > 0 || this.dataranap.length > 0;
    },

    excelDataRajal() {
      const rows = this.fact.map(row => {
        const obj = { 'Poli': row.POLI };
        this.monthKeys.forEach((key, i) => { obj[this.months[i]] = row[key]?.value || 0; });
        obj['Total'] = row.TOTAL || 0;
        return obj;
      });
      const totalRow = { 'Poli': 'GRAND TOTAL' };
      this.monthKeys.forEach((key, i) => { totalRow[this.months[i]] = this.total_monhtly_rajal[key] || 0; });
      totalRow['Total'] = this.grand_total_rajal;
      rows.push(totalRow);
      return rows;
    },

    excelDataRanap() {
      const rows = this.dataranap.map(row => {
        const obj = { 'Ruangan': row.POLI };
        this.monthKeys.forEach((key, i) => { obj[this.months[i]] = row[key]?.value || 0; });
        obj['Total'] = row.TOTAL || 0;
        return obj;
      });
      const totalRow = { 'Ruangan': 'GRAND TOTAL' };
      this.monthKeys.forEach((key, i) => { totalRow[this.months[i]] = this.total_monhtly_ranap[key] || 0; });
      totalRow['Total'] = this.grand_total_ranap;
      rows.push(totalRow);
      return rows;
    },

    excelDataPeserta() {
      return this.table_jenis_peserta.map((row, i) => ({
        'No':             i + 1,
        'Jenis Peserta':  row.JENISPESERTA,
        'Jumlah':         row.JUMLAH,
        'Persentase (%)': row.PERSEN,
      }));
    },

    hasComparisonData() {
      return this.compareMode && (this.fact_compare.length > 0 || this.dataranap_compare.length > 0);
    },

    isFormValid() {
      return this.form.tanggalawal && this.form.tanggalakhir;
    },

    isCompareFormValid() {
      return this.compareForm.tanggalawal && this.compareForm.tanggalakhir;
    },

    rajalComparison() {
      return this.calculateComparison(this.grand_total_rajal, this.grand_total_rajal_compare);
    },

    ranapComparison() {
      return this.calculateComparison(this.grand_total_ranap, this.grand_total_ranap_compare);
    }
  },

  mounted() {
    this.initializeDates();
  },

  methods: {
    initializeDates() {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      this.form.tanggalawal = firstDayOfMonth;
      this.form.tanggalakhir = currentDate;
      this.getnamadokter();
      this.getcarabayar();
    },

    onCompareModeChange() {
      if (!this.compareMode) {
        this.clearComparisonData();
        this.showTableComparisons = { rajal: false, ranap: false, peserta: false };
      } else {
        this.initializeComparisonDates();
      }
    },

    initializeComparisonDates() {
      if (this.form.tanggalawal && this.form.tanggalakhir) {
        const startDate = new Date(this.form.tanggalawal);
        const endDate = new Date(this.form.tanggalakhir);
        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate.setFullYear(endDate.getFullYear() - 1);
        this.compareForm.tanggalawal = startDate;
        this.compareForm.tanggalakhir = endDate;
      }
    },

    quickCompare(type) {
      this.showQuickCompare = false;

      if (!this.form.tanggalawal || !this.form.tanggalakhir) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Peringatan',
          detail: 'Silakan pilih periode utama terlebih dahulu',
          life: 3000
        });
        return;
      }

      const startDate = new Date(this.form.tanggalawal);
      const endDate = new Date(this.form.tanggalakhir);
      let compareStart, compareEnd;

      switch (type) {
        case 'lastMonth':
          compareStart = new Date(startDate);
          compareEnd = new Date(endDate);
          compareStart.setMonth(compareStart.getMonth() - 1);
          compareEnd.setMonth(compareEnd.getMonth() - 1);
          break;
        case 'lastQuarter':
          compareStart = new Date(startDate);
          compareEnd = new Date(endDate);
          compareStart.setMonth(compareStart.getMonth() - 3);
          compareEnd.setMonth(compareEnd.getMonth() - 3);
          break;
        case 'lastYear':
        case 'samePeriodLastYear':
          compareStart = new Date(startDate);
          compareEnd = new Date(endDate);
          compareStart.setFullYear(compareStart.getFullYear() - 1);
          compareEnd.setFullYear(compareEnd.getFullYear() - 1);
          break;
      }

      this.compareForm.tanggalawal = compareStart;
      this.compareForm.tanggalakhir = compareEnd;
      this.handleCompareSubmit();
    },

    resetForm() {
      this.initializeDates();
      this.clearData();
      this.clearComparisonData();
      this.compareMode = false;
      this.showTableComparisons = { rajal: false, ranap: false, peserta: false };
    },

    clearData() {
      this.fact = [];
      this.dataranap = [];
      this.table_jenis_peserta = [];
      this.grand_total_ranap = 0;
      this.grand_total_rajal = 0;
      this.total_monhtly_rajal = {};
      this.total_monhtly_ranap = {};
      this.graf_ranap = { labels: [], datasets: [] };
      this.graf_rajal = { labels: [], datasets: [] };
      this.jenispeserta = { labels: [], datasets: [] };
    },

    clearComparisonData() {
      this.fact_compare = [];
      this.dataranap_compare = [];
      this.table_jenis_peserta_compare = [];
      this.grand_total_ranap_compare = 0;
      this.grand_total_rajal_compare = 0;
      this.total_monhtly_rajal_compare = {};
      this.total_monhtly_ranap_compare = {};
    },

    formatNumber(value) {
      if (!value && value !== 0) return '-';
      return Number(value).toLocaleString('id-ID');
    },

    calculateComparison(current, previous) {
      if (!previous || previous === 0) {
        return { percentage: 0, difference: current };
      }
      const difference = current - previous;
      const percentage = Math.round((difference / previous) * 100);
      return { percentage, difference };
    },

    getComparisonClass(comparison) {
      if (comparison.percentage > 0) return 'text-success';
      if (comparison.percentage < 0) return 'text-danger';
      return 'text-muted';
    },

    getComparisonIcon(comparison) {
      if (comparison.percentage > 0) return 'fas fa-arrow-up';
      if (comparison.percentage < 0) return 'fas fa-arrow-down';
      return 'fas fa-minus';
    },

    getPoliComparison(type, poliName, month) {
      const currentData = type === 'rajal' ? this.fact : this.dataranap;
      const compareData = type === 'rajal' ? this.fact_compare : this.dataranap_compare;
      const currentPoli = currentData.find(item => item.POLI === poliName);
      const comparePoli = compareData.find(item => item.POLI === poliName);
      if (!currentPoli || !comparePoli) return { percentage: 0, difference: 0 };
      return this.calculateComparison(currentPoli[month]?.value || 0, comparePoli[month]?.value || 0);
    },

    getPoliTotalComparison(type, poliName) {
      const currentData = type === 'rajal' ? this.fact : this.dataranap;
      const compareData = type === 'rajal' ? this.fact_compare : this.dataranap_compare;
      const currentPoli = currentData.find(item => item.POLI === poliName);
      const comparePoli = compareData.find(item => item.POLI === poliName);
      if (!currentPoli || !comparePoli) return { percentage: 0, difference: 0 };
      return this.calculateComparison(currentPoli.TOTAL, comparePoli.TOTAL);
    },

    getPesertaComparison(jenispeserta) {
      const current = this.table_jenis_peserta.find(item => item.JENISPESERTA === jenispeserta);
      const compare = this.table_jenis_peserta_compare.find(item => item.JENISPESERTA === jenispeserta);
      if (!current || !compare) return { percentage: 0, difference: 0 };
      return this.calculateComparison(current.JUMLAH, compare.JUMLAH);
    },

    async handleSubmit() {
      if (!this.isFormValid) {
        this.open('warn', 'Silakan pilih tanggal awal dan akhir terlebih dahulu');
        return;
      }
      try {
        await Promise.all([this.getData(1), this.getData(2)]);
        this.open('success', 'Data berhasil dimuat');
        if (this.compareMode && !this.compareForm.tanggalawal) {
          this.initializeComparisonDates();
        }
      } catch (error) {
        this.open('error', 'Gagal memuat data. Silakan coba lagi.');
      }
    },

    open(type, message) {
      this.$toast.open({
        message: message,
        position: 'top-right',
        type: type,
        duration: 3000,
        dismissible: true
      });
    },

    async handleCompareSubmit() {
      if (!this.isCompareFormValid) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Peringatan',
          detail: 'Silakan pilih tanggal pembanding terlebih dahulu',
          life: 3000
        });
        return;
      }
      try {
        await Promise.all([this.getComparisonData(1), this.getComparisonData(2)]);
        this.updateChartsWithComparison();
        this.$toast.add({
          severity: 'success',
          summary: 'Berhasil',
          detail: 'Data perbandingan berhasil dimuat',
          life: 3000
        });
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Gagal memuat data perbandingan. Silakan coba lagi.',
          life: 5000
        });
      }
    },

    updateChartsWithComparison() {
      if (this.graf_rajal.datasets && this.graf_rajal.datasets.length > 0) {
        const compareDataRajal = this.monthKeys.map(month => this.total_monhtly_rajal_compare[month] || 0);
        this.graf_rajal = {
          ...this.graf_rajal,
          datasets: [
            { ...this.graf_rajal.datasets[0], label: 'Periode Saat Ini', backgroundColor: '#42A5F5' },
            { data: compareDataRajal, label: 'Periode Pembanding', backgroundColor: '#FFA726', borderColor: '#FF9800', borderWidth: 2 }
          ]
        };
      }
      if (this.graf_ranap.datasets && this.graf_ranap.datasets.length > 0) {
        const compareDataRanap = this.monthKeys.map(month => this.total_monhtly_ranap_compare[month] || 0);
        this.graf_ranap = {
          ...this.graf_ranap,
          datasets: [
            { ...this.graf_ranap.datasets[0], label: 'Periode Saat Ini', backgroundColor: '#66BB6A' },
            { data: compareDataRanap, label: 'Periode Pembanding', backgroundColor: '#FFCA28', borderColor: '#FFC107', borderWidth: 2 }
          ]
        };
      }
    },

    handleRowClick_rajal(dataset) {
      if (!dataset) return;
      const chartData = this.monthKeys.map(month => dataset[month]?.value || 0);
      let datasets = [{
        data: chartData,
        label: `Poli ${dataset.POLI}`,
        backgroundColor: '#42A5F5',
        borderColor: '#1976D2',
        borderWidth: 2,
        tension: 0.4
      }];
      if (this.compareMode && this.hasComparisonData) {
        const comparePoli = this.fact_compare.find(item => item.POLI === dataset.POLI);
        if (comparePoli) {
          datasets.push({
            data: this.monthKeys.map(month => comparePoli[month]?.value || 0),
            label: `${dataset.POLI} (Pembanding)`,
            backgroundColor: '#FFA726',
            borderColor: '#FF9800',
            borderWidth: 2,
            tension: 0.4
          });
        }
      }
      this.graf_rajal = { labels: this.months, datasets };
    },

    async getnamadokter() {
      try {
        const response = await axios.post('/getnamadokter', { mode: 2 });
        this.master_dokter = response.data.response || [];
      } catch (error) {
        console.error('Error fetching doctor names:', error);
      }
    },

    async getcarabayar() {
      try {
        const response = await axios.get('/addcaraBayar');
        this.master_carabayar = response.data || [];
      } catch (error) {
        console.error('Error fetching cara bayar:', error);
      }
    },

    async getData(mode) {
      try {
        this.isLoading = true;
        this.form.mode = mode;
        const response = await axios.post('/get_datakunjungan_poli', this.form);
        console.log(response.data);
        if (mode === 1) this.processRawatJalanData(response.data);
        else if (mode === 2) this.processRawatInapData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async getComparisonData(mode) {
      try {
        this.isLoading = true;
        this.compareForm.mode = mode;
        const response = await axios.post('/get_datakunjungan_poli', this.compareForm);
        if (mode === 1) this.processRawatJalanComparisonData(response.data);
        else if (mode === 2) this.processRawatInapComparisonData(response.data);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    processRawatJalanData(data) {
      this.fact = data.response || [];
      this.grand_total_rajal = data.grand_total || 0;
      this.total_monhtly_rajal = data.total_monhtly || {};
      if (data.grafik) {
        this.graf_rajal = {
          labels: data.grafik.label || this.months,
          datasets: [{ data: data.grafik.data || [], label: 'Rawat Jalan', backgroundColor: '#42A5F5', borderColor: '#1976D2', borderWidth: 2 }]
        };
      }
    },

    processRawatInapData(data) {
      this.grand_total_ranap = data.grand_total || 0;
      this.dataranap = data.response || [];
      this.total_monhtly_ranap = data.total_monhtly || {};
      if (data.grafik) {
        this.graf_ranap = {
          labels: data.grafik.label || this.months,
          datasets: [{ data: data.grafik.data || [], label: 'Rawat Inap', backgroundColor: '#66BB6A', borderColor: '#388E3C', borderWidth: 2 }]
        };
      }
      if (data.jenispeserta) {
        this.jenispeserta = {
          labels: data.jenispeserta.labels || [],
          datasets: [{
            data: data.jenispeserta.data || [],
            label: 'Jenis Peserta',
            backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#FF6384','#C9CBCF'],
            borderWidth: 2
          }]
        };
        this.table_jenis_peserta = data.jenispeserta.table || [];
      }
    },

    processRawatJalanComparisonData(data) {
      this.fact_compare = data.response || [];
      this.grand_total_rajal_compare = data.grand_total || 0;
      this.total_monhtly_rajal_compare = data.total_monhtly || {};
    },

    processRawatInapComparisonData(data) {
      this.grand_total_ranap_compare = data.grand_total || 0;
      this.dataranap_compare = data.response || [];
      this.total_monhtly_ranap_compare = data.total_monhtly || {};
      if (data.jenispeserta) {
        this.table_jenis_peserta_compare = data.jenispeserta.table || [];
      }
    }
  }
}
</script>

<style scoped>
/* ===== Filter Card ===== */
.filter-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  border: 1px solid #e8edf2;
}

.filter-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f4f8;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
}

.filter-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a2d4e;
  margin: 0 0 4px;
}

.filter-card-subtitle {
  font-size: 12px;
  color: #8a9bb0;
  margin: 0;
  max-width: 520px;
  line-height: 1.5;
}

.filter-card-body {
  padding: 18px 24px;
}

/* Toggle Switch */
.compare-toggle-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: 20px;
}

.compare-toggle-label {
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  white-space: nowrap;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.toggle-track {
  display: block;
  width: 44px;
  height: 24px;
  background: #cbd5e0;
  border-radius: 12px;
  transition: background 0.25s ease;
  position: relative;
}

.toggle-switch input:checked + .toggle-track {
  background: #3b82f6;
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: transform 0.25s ease;
}

.toggle-switch input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
}

/* Filter Row */
.filter-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 160px;
}

.filter-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #6b7a8d;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;
}

.filter-label i {
  margin-right: 4px;
  color: #9aabbc;
}

.filter-hint {
  font-size: 10px;
  color: #aab4c0;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}

.filter-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.btn-primary-action {
  white-space: nowrap;
}

.btn-secondary-action {
  white-space: nowrap;
}

/* Comparison Row */
.compare-row {
  padding-top: 16px;
  border-top: 2px dashed #e2e8f0;
}

.compare-row-badge {
  display: inline-flex;
  align-items: center;
  background: #fff8e6;
  color: #b7791f;
  border: 1px solid #f6d860;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Compare */
.quick-wrap {
  position: relative;
}

.quick-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 1000;
  min-width: 200px;
  overflow: hidden;
}

.quick-item {
  display: block;
  padding: 9px 16px;
  font-size: 13px;
  color: #374151;
  text-decoration: none;
  transition: background 0.15s;
}

.quick-item:hover {
  background: #f3f4f6;
  color: #111827;
  text-decoration: none;
}

/* ===== Comparison Summary Cards ===== */
.compare-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  color: white;
}

.compare-card-blue {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.compare-card-green {
  background: linear-gradient(135deg, #059669, #047857);
}

.compare-card-icon {
  font-size: 28px;
  opacity: 0.75;
  flex-shrink: 0;
}

.compare-card-body {
  flex: 1;
}

.compare-card-label {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.compare-card-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 2px;
}

.compare-card-sub {
  font-size: 11px;
  opacity: 0.7;
}

.compare-card-delta {
  text-align: right;
  flex-shrink: 0;
}

.compare-card-vs {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
}

/* Delta Badges */
.delta-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
}

.delta-up   { background: rgba(255,255,255,0.2); color: #bbf7d0; }
.delta-down { background: rgba(255,255,255,0.2); color: #fecaca; }

.delta-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
}

.delta-chip.chip-up   { background: #dcfce7; color: #15803d; }
.delta-chip.chip-down { background: #fee2e2; color: #b91c1c; }

.delta-chip-sm {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
}

.delta-chip-sm.chip-up   { background: #dcfce7; color: #15803d; }
.delta-chip-sm.chip-down { background: #fee2e2; color: #b91c1c; }

/* ===== Viz Cards ===== */
.viz-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e8edf2;
  overflow: hidden;
  height: 100%;
}

.viz-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f0f4f8;
}

.viz-header-blue  { border-left: 4px solid #2563eb; }
.viz-header-green { border-left: 4px solid #059669; }
.viz-header-plain { border-left: 4px solid #e2e8f0; }

.viz-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.viz-card-title {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
}

.viz-total-badge {
  background: #f1f5f9;
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

.viz-card-body {
  padding: 16px 20px;
}

/* ===== Pro Table ===== */
.table-scroll {
  max-height: 460px;
  overflow-y: auto;
  overflow-x: auto;
}

.pro-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.pro-table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f8fafc;
  color: #64748b;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  padding: 10px 12px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

.pro-table tbody td {
  padding: 10px 12px;
  color: #374151;
  border-bottom: 1px solid #f8fafc;
  vertical-align: middle;
}

.pro-row:hover td {
  background: #f0f7ff;
}

.pro-row.clickable {
  cursor: pointer;
}

.pro-row.clickable:hover td {
  background: #eff6ff;
}

.pro-table tfoot .pro-footer td {
  background: #1e293b;
  color: white;
  padding: 11px 12px;
  font-size: 11px;
  border: none;
}

.col-name   { min-width: 120px; }
.col-month  { min-width: 42px; }
.col-total  { min-width: 60px; background: #f0f7ff; font-weight: 700; }
.col-delta  { min-width: 52px; }

.total-cell {
  background: #f8fbff;
}

.fw-600 { font-weight: 600; }

.inline-delta {
  font-size: 10px;
  margin-top: 1px;
  line-height: 1;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Excel Button */
.btn-excel {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #1d6f42;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 11px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
}

.btn-excel:hover {
  background: #155230;
  transform: translateY(-1px);
}

.btn-excel i {
  font-size: 12px;
}

/* Toggle Inline */
.toggle-inline {
  display: flex;
  align-items: center;
  gap: 6px;
}

.toggle-inline-input {
  width: 14px;
  height: 14px;
  accent-color: #2563eb;
  cursor: pointer;
}

.toggle-inline-label {
  font-size: 11px;
  color: #6b7280;
  cursor: pointer;
  margin: 0;
}

/* Pct Badge */
.pct-badge {
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

/* Chart */
.chart-container {
  height: 280px;
}

/* ===== Empty State ===== */
.empty-state {
  text-align: center;
  padding: 64px 24px;
  background: white;
  border-radius: 12px;
  border: 1px dashed #cbd5e0;
}

.empty-icon-wrap {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #94a3b8;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 13px;
  color: #9ca3af;
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .filter-card-header {
    flex-direction: column;
    gap: 12px;
  }

  .compare-toggle-group {
    margin-left: 0;
  }

  .filter-row {
    flex-direction: column;
  }

  .filter-group {
    min-width: 100%;
  }

  .chart-container {
    height: 220px;
  }

  .compare-card {
    flex-wrap: wrap;
  }
}
</style>
