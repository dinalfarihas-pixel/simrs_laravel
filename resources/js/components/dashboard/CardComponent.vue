<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <!-- Card Rawat Jalan -->
        <div class="col-md-4">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ gt_rajal }}</h3>
              <p>Kunjungan Rawat Jalan</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <downloadExcel
              :data="excelCardRajal"
              name="summary_rawat_jalan.xls"
              type="xls"
              class="small-box-footer"
            >
              <i class="fas fa-file-excel mr-1"></i> Download Excel
              <i class="fas fa-arrow-circle-right float-right mt-1"></i>
            </downloadExcel>
          </div>
        </div>

        <!-- Card Rawat Inap -->
        <div class="col-md-4">
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{ gt_ranap }}</h3>
              <p>Kunjungan Rawat Inap</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <downloadExcel
              :data="excelCardRanap"
              name="summary_rawat_inap.xls"
              type="xls"
              class="small-box-footer"
            >
              <i class="fas fa-file-excel mr-1"></i> Download Excel
              <i class="fas fa-arrow-circle-right float-right mt-1"></i>
            </downloadExcel>
          </div>
        </div>

        <!-- Card Total RS -->
        <div class="col-md-4">
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{ gt_rajal + gt_ranap }}</h3>
              <p>Kunjungan Rumah Sakit</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <downloadExcel
              :data="excelCardTotal"
              name="summary_kunjungan_rs.xls"
              type="xls"
              class="small-box-footer"
            >
              <i class="fas fa-file-excel mr-1"></i> Download Excel
              <i class="fas fa-arrow-circle-right float-right mt-1"></i>
            </downloadExcel>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  components: { Loading },
  props: [
    'gt_rajal',
    'gt_ranap',
    'gt_rajal_compare',
    'gt_ranap_compare',
    'compare_mode',
    'fact_rajal',
    'fact_ranap',
    'months',
    'month_keys',
    'total_monthly_rajal',
    'total_monthly_ranap',
  ],
  computed: {
    excelCardRajal() {
      const rows = (this.fact_rajal || []).map(row => {
        const obj = { 'Poli': row.POLI };
        (this.month_keys || []).forEach((key, i) => {
          obj[(this.months || [])[i] || key] = row[key]?.value || 0;
        });
        obj['Total'] = row.TOTAL || 0;
        return obj;
      });
      if (rows.length) {
        const footer = { 'Poli': 'GRAND TOTAL' };
        (this.month_keys || []).forEach((key, i) => {
          footer[(this.months || [])[i] || key] = (this.total_monthly_rajal || {})[key] || 0;
        });
        footer['Total'] = this.gt_rajal || 0;
        rows.push(footer);
      }
      return rows.length ? rows : [{ 'Kunjungan Rawat Jalan': this.gt_rajal || 0 }];
    },

    excelCardRanap() {
      const rows = (this.fact_ranap || []).map(row => {
        const obj = { 'Ruangan': row.POLI };
        (this.month_keys || []).forEach((key, i) => {
          obj[(this.months || [])[i] || key] = row[key]?.value || 0;
        });
        obj['Total'] = row.TOTAL || 0;
        return obj;
      });
      if (rows.length) {
        const footer = { 'Ruangan': 'GRAND TOTAL' };
        (this.month_keys || []).forEach((key, i) => {
          footer[(this.months || [])[i] || key] = (this.total_monthly_ranap || {})[key] || 0;
        });
        footer['Total'] = this.gt_ranap || 0;
        rows.push(footer);
      }
      return rows.length ? rows : [{ 'Kunjungan Rawat Inap': this.gt_ranap || 0 }];
    },

    excelCardTotal() {
      return [
        { 'Jenis Kunjungan': 'Rawat Jalan',         'Jumlah': this.gt_rajal || 0 },
        { 'Jenis Kunjungan': 'Rawat Inap',           'Jumlah': this.gt_ranap || 0 },
        { 'Jenis Kunjungan': 'Total Kunjungan RS',   'Jumlah': (this.gt_rajal || 0) + (this.gt_ranap || 0) },
      ];
    },
  },
};
</script>
