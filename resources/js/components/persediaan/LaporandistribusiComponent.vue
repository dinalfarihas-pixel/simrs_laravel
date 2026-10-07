<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Tabs value="0">
                <TabList>
                    <Tab value="0">Rincian</Tab>
                    <Tab value="1">Rekap</Tab>
                </TabList>
                <TabPanels>
                    <!-- ===== TAB RINCIAN ===== -->
                    <TabPanel value="0">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Tahun bulan distribusi</h3>
                            </div>
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <Calendar v-model="form.startdate" class="text-sm" :showIcon="true"
                                            view="month" dateFormat="mm/yy" :yearNavigator="true"
                                            yearRange="2000:2030" aria-placeholder="Tanggal awal"
                                            style="width: 15em;" />
                                        <Select v-model="form.lokasi" style="width: 15em;" class="mx-2"
                                            :options="lokasi_arr" optionLabel="CAPION" :filter="true"
                                            placeholder="Asal Distribusi" :showClear="false" />
                                        <Button label="Tampilkan" @click="getdata()" icon="pi pi-check" class="p-button" />
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info-box" style="height:30px;">
                                            <span class="info-box-icon bg-warning elevation-1">
                                                <i class="pi pi-sitemap" style="font-size: 2rem"></i>
                                            </span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">TOTAL</span>
                                                <span class="info-box-number">{{ $numeral(GrandTotal, '0,0.00') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap" style="gap:10px">
                                <download-excel :data="filteredFact" :fields="json_fields" name="DATA DISTRIBUSI.xls">
                                    <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                                </download-excel>
                                <div class="filter-summary-bar">
                                    <span class="filter-summary-item">
                                        Menampilkan <strong>{{ formatInterger(filteredFact.length) }}</strong>
                                        dari <strong>{{ formatInterger(fact.length) }}</strong> data
                                    </span>
                                    <span class="filter-summary-sep">•</span>
                                    <span class="filter-summary-item">
                                        Qty: <strong>{{ $numeral(filteredSummary.qty, '0,0.00') }}</strong>
                                    </span>
                                    <span class="filter-summary-sep">•</span>
                                    <span class="filter-summary-item">
                                        Total: <strong>{{ $numeral(filteredSummary.total, '0,0.00') }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <DataTable :value="fact" v-model:filters="filters" filterDisplay="row"
                                    :paginator="true" :rows="20" :rowsPerPageOptions="[10, 20, 50, 100]"
                                    stripedRows showGridlines class="p-datatable-sm"
                                    scrollable scrollHeight="620px"
                                    sortMode="multiple" removableSort
                                    :globalFilterFields="['NO_TRANSFER','TUJUAN','KATEGORI','BARCODE','NAMA']"
                                    emptyMessage="Tidak ada data distribusi"
                                    @filter="onFilterFact">
                                    <template #header>
                                        <div class="d-flex justify-content-end">
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters['global'].value" placeholder="Cari semua kolom..." />
                                            </span>
                                        </div>
                                    </template>

                                    <Column field="NO_TRANSFER" header="NO TRANSFER" style="min-width: 10rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                                        </template>
                                    </Column>
                                    <Column field="TUJUAN" header="TUJUAN" style="min-width: 12rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <MultiSelect v-model="filterModel.value" @change="filterCallback()"
                                                :options="tujuanOptions" placeholder="Semua" display="chip"
                                                class="p-column-filter" style="min-width: 12rem" :maxSelectedLabels="1" filter />
                                        </template>
                                    </Column>
                                    <Column field="TANGGAL" header="TANGGAL" style="min-width: 8rem" sortable />
                                    <Column field="JENIS_LOKASI" header="JENIS LOKASI" style="min-width: 12rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <MultiSelect v-model="filterModel.value" @change="filterCallback()"
                                                :options="jenisLokasiOptions" placeholder="Semua" display="chip"
                                                class="p-column-filter" style="min-width: 11rem" :maxSelectedLabels="1" filter />
                                        </template>
                                    </Column>
                                    <Column field="KATEGORI" header="KATEGORI" style="min-width: 12rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <MultiSelect v-model="filterModel.value" @change="filterCallback()"
                                                :options="kategoriOptions" placeholder="Semua" display="chip"
                                                class="p-column-filter" style="min-width: 11rem" :maxSelectedLabels="1" filter />
                                        </template>
                                    </Column>
                                    <Column field="BARCODE" header="BARCODE" style="min-width: 10rem" :showFilterMenu="false" sortable>
                                        <template #body="{ data }">{{ data.SUB_BARCODE }}-{{ data.BARCODE }}</template>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                                        </template>
                                    </Column>
                                    <Column field="NAMA" header="NAMA" style="min-width: 14rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                                        </template>
                                    </Column>
                                    <Column field="QTY" header="QTY" style="min-width: 7rem; text-align: right" sortable>
                                        <template #body="{ data }">{{ $numeral(data.QTY, '0,0.00') }}</template>
                                        <template #footer>
                                            <strong>{{ $numeral(filteredSummary.qty, '0,0.00') }}</strong>
                                        </template>
                                    </Column>
                                    <Column field="HARGA" header="HARGA" style="min-width: 10rem; text-align: right" sortable>
                                        <template #body="{ data }">{{ $numeral(data.HARGA, '0,0.00') }}</template>
                                    </Column>
                                    <Column field="TOTAL" header="TOTAL" style="min-width: 10rem; text-align: right" sortable>
                                        <template #body="{ data }">{{ $numeral(data.TOTAL, '0,0.00') }}</template>
                                        <template #footer>
                                            <strong>{{ $numeral(filteredSummary.total, '0,0.00') }}</strong>
                                        </template>
                                    </Column>
                                    <Column field="TGL_EXPIRED" header="EXP" style="min-width: 8rem" sortable />
                                    <Column field="BATCH_NUMBER" header="BATCH" style="min-width: 8rem" sortable />
                                </DataTable>
                            </div>
                        </div>

                        <!-- ===== RANGKUMAN TRANSAKSI ===== -->
                        <div class="card mt-3">
                            <div class="card-header">
                                <div class="d-flex flex-column">
                                    <h3 class="card-title mb-1">Rangkuman Transaksi</h3>
                                    <small class="text-muted">
                                        Berdasarkan {{ formatInterger(filteredFact.length) }} dari {{ formatInterger(fact.length) }} transaksi (mengikuti filter yang aktif di tabel di atas)
                                    </small>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row mb-2">
                                    <div class="col-md-3 col-6 mb-3">
                                        <div class="info-box">
                                            <span class="info-box-icon bg-info elevation-1"><i class="pi pi-list"></i></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">Total Transaksi</span>
                                                <span class="info-box-number">{{ formatInterger(filteredFact.length) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-6 mb-3">
                                        <div class="info-box">
                                            <span class="info-box-icon bg-primary elevation-1"><i class="pi pi-box"></i></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">Total Qty</span>
                                                <span class="info-box-number">{{ $numeral(filteredSummary.qty, '0,0.00') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-6 mb-3">
                                        <div class="info-box">
                                            <span class="info-box-icon bg-success elevation-1"><i class="pi pi-dollar"></i></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">Total Nilai</span>
                                                <span class="info-box-number">{{ $numeral(filteredSummary.total, '0,0.00') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-6 mb-3">
                                        <div class="info-box">
                                            <span class="info-box-icon bg-warning elevation-1"><i class="pi pi-chart-line"></i></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">Rata-rata / Transaksi</span>
                                                <span class="info-box-number">{{ $numeral(rataRataPerTransaksi, '0,0.00') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <h6 class="font-weight-bold mb-2">Ringkasan per Kategori</h6>
                                        <div class="table-responsive">
                                            <table class="table table-sm table-bordered table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th class="sortable-th" @click="toggleSummarySort('kategori','label')">
                                                            Kategori <i :class="summarySortIcon('kategori','label')"></i>
                                                        </th>
                                                        <th class="text-center sortable-th" @click="toggleSummarySort('kategori','count')">
                                                            Transaksi <i :class="summarySortIcon('kategori','count')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('kategori','qty')">
                                                            Qty <i :class="summarySortIcon('kategori','qty')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('kategori','total')">
                                                            Total <i :class="summarySortIcon('kategori','total')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('kategori','percent')">
                                                            % <i :class="summarySortIcon('kategori','percent')"></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="row in summaryByKategori" :key="row.label">
                                                        <td>{{ row.label }}</td>
                                                        <td class="text-center">{{ formatInterger(row.count) }}</td>
                                                        <td class="text-right">{{ $numeral(row.qty, '0,0.00') }}</td>
                                                        <td class="text-right">{{ $numeral(row.total, '0,0.00') }}</td>
                                                        <td class="text-right">{{ row.percent }}%</td>
                                                    </tr>
                                                    <tr v-if="summaryByKategori.length === 0">
                                                        <td colspan="5" class="text-center text-muted py-3">Tidak ada data</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                <div class="mb-3">
                                    <h6 class="font-weight-bold mb-2">Top 10 Tujuan (berdasarkan Total Nilai)</h6>
                                        <div class="table-responsive">
                                            <table class="table table-sm table-bordered table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th style="width:48px">#</th>
                                                        <th class="sortable-th" @click="toggleSummarySort('tujuan','label')">
                                                            Tujuan <i :class="summarySortIcon('tujuan','label')"></i>
                                                        </th>
                                                        <th class="text-center sortable-th" @click="toggleSummarySort('tujuan','count')">
                                                            Transaksi <i :class="summarySortIcon('tujuan','count')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('tujuan','qty')">
                                                            Qty <i :class="summarySortIcon('tujuan','qty')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('tujuan','total')">
                                                            Total <i :class="summarySortIcon('tujuan','total')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('tujuan','percent')">
                                                            % <i :class="summarySortIcon('tujuan','percent')"></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, idx) in topTujuanSummary" :key="row.label">
                                                        <td>{{ idx + 1 }}</td>
                                                        <td>{{ row.label }}</td>
                                                        <td class="text-center">{{ formatInterger(row.count) }}</td>
                                                        <td class="text-right">{{ $numeral(row.qty, '0,0.00') }}</td>
                                                        <td class="text-right">{{ $numeral(row.total, '0,0.00') }}</td>
                                                        <td class="text-right">{{ row.percent }}%</td>
                                                    </tr>
                                                    <tr v-if="topTujuanSummary.length === 0">
                                                        <td colspan="6" class="text-center text-muted py-3">Tidak ada data</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                <div class="mb-3">
                                    <h6 class="font-weight-bold mb-2">Top 15 Item Barang (berdasarkan Total Nilai)</h6>
                                        <div class="table-responsive">
                                            <table class="table table-sm table-bordered table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th style="width:48px">#</th>
                                                        <th class="sortable-th" @click="toggleSummarySort('item','label')">
                                                            Item Barang <i :class="summarySortIcon('item','label')"></i>
                                                        </th>
                                                        <th class="text-center sortable-th" @click="toggleSummarySort('item','count')">
                                                            Transaksi <i :class="summarySortIcon('item','count')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('item','qty')">
                                                            Qty <i :class="summarySortIcon('item','qty')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('item','total')">
                                                            Total <i :class="summarySortIcon('item','total')"></i>
                                                        </th>
                                                        <th class="text-right sortable-th" @click="toggleSummarySort('item','percent')">
                                                            % <i :class="summarySortIcon('item','percent')"></i>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, idx) in topItemSummary" :key="row.label">
                                                        <td>{{ idx + 1 }}</td>
                                                        <td>{{ row.label }}</td>
                                                        <td class="text-center">{{ formatInterger(row.count) }}</td>
                                                        <td class="text-right">{{ $numeral(row.qty, '0,0.00') }}</td>
                                                        <td class="text-right">{{ $numeral(row.total, '0,0.00') }}</td>
                                                        <td class="text-right">{{ row.percent }}%</td>
                                                    </tr>
                                                    <tr v-if="topItemSummary.length === 0">
                                                        <td colspan="6" class="text-center text-muted py-3">Tidak ada data</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </TabPanel>

                    <!-- ===== TAB REKAP ===== -->
                    <TabPanel value="1">
                        <div class="card">
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <h3 class="card-title mb-0">Rekapan pertahun</h3>
                                <div class="d-flex align-items-center" style="gap:8px">
                                    <span style="font-size:.85rem; color:#6b7a8d;">Mode Perbandingan Antar Tahun</span>
                                    <ToggleSwitch v-model="compareMode" @change="onCompareModeChange" />
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-8">
                                        <Calendar v-model="form.startdate" class="text-sm" :showIcon="true"
                                            view="year" dateFormat="yy" :yearNavigator="true"
                                            yearRange="2000:2030" aria-placeholder="Tanggal awal"
                                            style="width: 20em;" />
                                        <Button label="Tampilkan" @click="getdata_rekap_pertahun()"
                                            icon="pi pi-check" class="p-button ml-2" />
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info-box" style="height:30px;">
                                            <span class="info-box-icon bg-warning elevation-1">
                                                <i class="pi pi-sitemap" style="font-size: 2rem"></i>
                                            </span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">
                                                    Grand Total
                                                    <small v-if="compareMode" class="d-block" style="opacity:.85">(bulan terpilih)</small>
                                                </span>
                                                <span class="info-box-number">
                                                    <strong>{{ $numeral(compareMode ? grandTotalRange : filteredRekapSummary.total, '0,0.00') }}</strong>
                                                    <span v-if="hasComparisonData" class="ml-2"
                                                        :class="totalComparison.percentage >= 0 ? 'text-success' : 'text-danger'">
                                                        <i :class="totalComparison.percentage >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                        {{ Math.abs(totalComparison.percentage) }}%
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="compareMode" class="row align-items-center mt-3 pt-3"
                                    style="border-top: 2px dashed #e2e8f0;">
                                    <div class="col-md-9">
                                        <label class="mr-2" style="font-size:.8rem; color:#6b7a8d;">Tahun Pembanding</label>
                                        <Calendar v-model="compareYear" class="text-sm" :showIcon="true"
                                            view="year" dateFormat="yy" :yearNavigator="true"
                                            yearRange="2000:2030" aria-placeholder="Tahun pembanding"
                                            style="width: 16em;" />
                                        <label class="ml-3 mr-2" style="font-size:.8rem; color:#6b7a8d;">Bulan yang Dibandingkan</label>
                                        <MultiSelect v-model="compareBulanSelected" :options="bulanOptions"
                                            optionLabel="label" optionValue="key" display="chip"
                                            placeholder="Pilih bulan" style="width: 22em;" />
                                        <Button label="Bandingkan" @click="getdata_rekap_pertahun_compare()"
                                            icon="pi pi-chart-line" class="p-button-warning ml-2" />
                                    </div>
                                    <div class="col-md-3" v-if="hasComparisonData">
                                        <div class="info-box" style="height:30px;">
                                            <span class="info-box-icon bg-secondary elevation-1">
                                                <i class="pi pi-history" style="font-size: 2rem"></i>
                                            </span>
                                            <div class="info-box-content">
                                                <span class="info-box-text">Total Bulan Terpilih</span>
                                                <span class="info-box-number">
                                                    <strong>{{ $numeral(grandTotalCompareRange, '0,0.00') }}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2" v-if="compareMode">
                                        <small class="text-muted">
                                            <i class="pi pi-info-circle mr-1"></i>
                                            <span v-if="bulanKeysCompareRange.length > 0">
                                                Perbandingan dihitung hanya dari bulan yang dipilih (<strong>{{ bulanSelectedLabel }}</strong>)
                                                pada kedua tahun, agar adil terhadap tahun berjalan yang belum selesai.
                                            </span>
                                            <span v-else class="text-danger">
                                                Silakan pilih minimal satu bulan untuk dibandingkan.
                                            </span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="datarekap.length > 0">
                            <div class="col-lg-6 mb-3">
                                <div class="card h-100">
                                    <div class="card-header d-flex align-items-center justify-content-between"
                                        style="cursor:pointer; user-select:none" @click="grafBulananExpanded = !grafBulananExpanded">
                                        <h3 class="card-title mb-0">Grafik Distribusi per Bulan</h3>
                                        <i :class="grafBulananExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                                    </div>
                                    <div class="card-body" v-if="grafBulananExpanded">
                                        <Chart type="bar" :data="grafBulanan" :options="chartOptionsBulanan" style="height: 320px;" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="card h-100">
                                    <div class="card-header d-flex align-items-center justify-content-between"
                                        style="cursor:pointer; user-select:none" @click="grafTujuanExpanded = !grafTujuanExpanded">
                                        <h3 class="card-title mb-0">Top 10 Tujuan Distribusi</h3>
                                        <i :class="grafTujuanExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                                    </div>
                                    <div class="card-body" v-if="grafTujuanExpanded">
                                        <Chart type="bar" :data="grafTujuan" :options="chartOptionsTujuan" style="height: 320px;" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header d-flex align-items-center gap-2">
                                <download-excel :data="filteredDatarekap" :fields="json_datarekapExport" name="DATA DISTRIBUSI.xls">
                                    <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                                </download-excel>
                                <Select id="kategori" name="kategori" v-model="form.kategoriSelected"
                                    :options="kategori" optionLabel="name" placeholder="Pilih Kategory" />
                                <div class="d-flex align-items-center" style="gap:6px; margin-left:auto;">
                                    <Checkbox v-model="showSerapan" :binary="true" inputId="showSerapan" @change="onToggleSerapan" />
                                    <label for="showSerapan" style="margin:0; font-size:.85rem; color:#495057; cursor:pointer;">
                                        Gabungkan dengan Data Serapan (Pemakaian Obat)
                                    </label>
                                </div>
                                <div class="d-flex align-items-center" style="gap:6px;">
                                    <Checkbox v-model="showMoMPercent" :binary="true" inputId="showMoMPercent" />
                                    <label for="showMoMPercent" style="margin:0; font-size:.85rem; color:#495057; cursor:pointer;">
                                        Tampilkan % Perbandingan Bulan Sebelumnya
                                    </label>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <DataTable :key="'rekap-' + showSerapan + '-' + hasComparisonData" :value="datarekapDisplay" v-model:filters="filters1"
                                    filterDisplay="row" @filter="onFilterRekap"
                                    stripedRows showGridlines class="p-datatable-sm"
                                    scrollable scrollHeight="620px"
                                    sortMode="multiple" removableSort
                                    emptyMessage="Tidak ada data rekap">
                                    <template #header>
                                        <div class="d-flex justify-content-end">
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters1['global'].value" placeholder="Cari..." />
                                            </span>
                                        </div>
                                    </template>

                                    <Column field="seqnumber" header="No" style="min-width: 4rem" sortable />
                                    <Column field="tujuan" header="TUJUAN" style="min-width: 12rem" :showFilterMenu="false" sortable>
                                        <template #filter="{ filterModel, filterCallback }">
                                            <MultiSelect v-model="filterModel.value" @change="filterCallback()"
                                                :options="rekapTujuanOptions" placeholder="Semua" display="chip"
                                                class="p-column-filter" style="min-width: 12rem" :maxSelectedLabels="1" filter />
                                        </template>
                                    </Column>
                                    <Column field="jan" header="JAN" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.jan, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'jan')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'jan').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'jan')" :class="yoyPercent(data,'jan').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'jan').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'jan').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'jan'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="feb" header="FEB" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.feb, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'feb')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'feb').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'feb')" :class="yoyPercent(data,'feb').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'feb').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'feb').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'feb')"
                                                :class="momPercent(data,'feb').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'feb').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'feb').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'feb'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="mar" header="MAR" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.mar, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'mar')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'mar').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'mar')" :class="yoyPercent(data,'mar').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'mar').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'mar').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'mar')"
                                                :class="momPercent(data,'mar').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'mar').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'mar').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'mar'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="apr" header="APR" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.apr, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'apr')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'apr').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'apr')" :class="yoyPercent(data,'apr').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'apr').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'apr').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'apr')"
                                                :class="momPercent(data,'apr').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'apr').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'apr').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'apr'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="mei" header="MEI" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.mei, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'mei')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'mei').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'mei')" :class="yoyPercent(data,'mei').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'mei').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'mei').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'mei')"
                                                :class="momPercent(data,'mei').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'mei').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'mei').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'mei'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="jun" header="JUN" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.jun, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'jun')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'jun').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'jun')" :class="yoyPercent(data,'jun').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'jun').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'jun').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'jun')"
                                                :class="momPercent(data,'jun').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'jun').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'jun').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'jun'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="jul" header="JUL" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.jul, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'jul')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'jul').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'jul')" :class="yoyPercent(data,'jul').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'jul').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'jul').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'jul')"
                                                :class="momPercent(data,'jul').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'jul').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'jul').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'jul'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="agt" header="AGT" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.agt, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'agt')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'agt').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'agt')" :class="yoyPercent(data,'agt').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'agt').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'agt').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'agt')"
                                                :class="momPercent(data,'agt').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'agt').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'agt').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'agt'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="sep" header="SEP" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.sep, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'sep')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'sep').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'sep')" :class="yoyPercent(data,'sep').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'sep').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'sep').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'sep')"
                                                :class="momPercent(data,'sep').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'sep').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'sep').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'sep'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="okt" header="OKT" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.okt, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'okt')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'okt').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'okt')" :class="yoyPercent(data,'okt').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'okt').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'okt').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'okt')"
                                                :class="momPercent(data,'okt').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'okt').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'okt').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'okt'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="nov" header="NOV" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.nov, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'nov')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'nov').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'nov')" :class="yoyPercent(data,'nov').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'nov').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'nov').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'nov')"
                                                :class="momPercent(data,'nov').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'nov').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'nov').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'nov'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="des" header="DES" :style="monthColStyle" sortable>
                                        <template #body="{ data }">
                                            <div>{{ $numeral(data.des, '0,0.00') }}</div>
                                            <template v-if="hasComparisonData">
                                                <small class="text-muted d-block" style="font-size:.7rem;" v-if="yoyPercent(data,'des')">
                                                    {{ compareYearLabel }}: {{ $numeral(yoyPercent(data,'des').compareValue, '0,0.00') }}
                                                </small>
                                                <small v-if="yoyPercent(data,'des')" :class="yoyPercent(data,'des').up ? 'text-success' : 'text-danger'">
                                                    <i :class="yoyPercent(data,'des').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                    {{ Math.abs(yoyPercent(data,'des').percentage) }}%
                                                </small>
                                            </template>
                                            <small v-else-if="showMoMPercent && momPercent(data,'des')"
                                                :class="momPercent(data,'des').up ? 'text-success' : 'text-danger'">
                                                <i :class="momPercent(data,'des').up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(momPercent(data,'des').percentage) }}%
                                            </small>
                                            <small v-if="showSerapan" class="d-block" style="color:#6f42c1; font-size:.7rem;">
                                                Serapan: {{ $numeral(serapanForMonth(data,'des'), '0,0.00') }}
                                            </small>
                                        </template>
                                    </Column>
                                    <Column field="total" header="TOTAL" style="min-width: 8rem; text-align: right; font-weight: bold" sortable>
                                        <template #body="{ data }">{{ $numeral(data.total, '0,0.00') }}</template>
                                    </Column>
                                    <Column field="persen" header="%" style="min-width: 6rem; text-align: right" sortable>
                                        <template #body="{ data }">{{ $numeral(data.persen, '0,0.00') }}%</template>
                                    </Column>
                                    <Column v-if="hasComparisonData" field="deltaPembanding" header="Δ vs Pembanding" style="min-width: 9rem; text-align: right" sortable>
                                        <template #body="{ data }">
                                            <span :class="data.deltaPembanding >= 0 ? 'text-success' : 'text-danger'">
                                                <i :class="data.deltaPembanding >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                                                {{ Math.abs(data.deltaPembanding) }}%
                                            </span>
                                        </template>
                                    </Column>
                                    <Column field="rataRata" header="RATA-RATA" style="min-width: 8rem; text-align: right; font-weight: bold" sortable>
                                        <template #body="{ data }">{{ $numeral(data.rataRata, '0,0.00') }}</template>
                                    </Column>
                                    <Column v-if="showSerapan" field="serapan" header="SERAPAN" style="min-width: 9rem; text-align: right; font-weight: bold" sortable>
                                        <template #body="{ data }">{{ $numeral(data.serapan, '0,0.00') }}</template>
                                    </Column>
                                    <Column v-if="showSerapan" field="serapanPercent" header="% TERSERAP" style="min-width: 8rem; text-align: right" sortable>
                                        <template #body="{ data }">
                                            <span :class="serapanPercentClass(data.serapanPercent)">
                                                {{ $numeral(data.serapanPercent, '0,0.00') }}%
                                            </span>
                                        </template>
                                    </Column>

                                    <ColumnGroup type="footer">
                                        <Row>
                                            <Column footer="TOTAL" :colspan="2" footerStyle="text-align:right; font-weight:bold" />
                                            <Column :footer="formatInterger(filteredRekapSummary.jan)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.feb)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.mar)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.apr)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.mei)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.jun)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.jul)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.agt)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.sep)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.okt)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.nov)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.des)" />
                                            <Column :footer="formatInterger(filteredRekapSummary.total)" footerStyle="text-align:right; font-weight:bold" />
                                            <Column :footer="$numeral(filteredRekapSummary.persen, '0,0.00') + '%'" footerStyle="text-align:right; font-weight:bold" />
                                            <Column v-if="hasComparisonData"
                                                :footer="(totalComparison.percentage >= 0 ? '+' : '') + totalComparison.percentage + '%'"
                                                footerStyle="text-align:right; font-weight:bold" />
                                            <Column :footer="formatInterger(grandAverageValue)" footerStyle="text-align:right; font-weight:bold" />
                                            <Column v-if="showSerapan" :footer="formatInterger(grandSerapan)" footerStyle="text-align:right; font-weight:bold" />
                                            <Column v-if="showSerapan"
                                                :footer="$numeral(grandSerapanPercent, '0,0.00') + '%'"
                                                :footerStyle="'text-align:right; font-weight:bold; ' + serapanPercentFooterStyle" />
                                        </Row>
                                    </ColumnGroup>
                                </DataTable>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    </section>
</template>

<script>
    import { FilterMatchMode } from '@primevue/core/api';
    import Loading from 'vue-loading-overlay';
    import Chart from 'primevue/chart';

    export default {
        components: { Loading, Chart },
        props: { msg: String },
        data() {
            return {
                json_fields: {
                    'NO_TRANSFER': 'NO_TRANSFER',
                    'TUJUAN': 'TUJUAN',
                    'TANGGAL': 'TANGGAL',
                    'KATEGORI': 'KATEGORI',
                    'SUB_BARCODE': 'SUB_BARCODE',
                    'NAMA': 'NAMA',
                    'QTY': 'QTY',
                    'HARGA': 'HARGA',
                    'TOTAL': 'TOTAL'
                },
                json_datarekap: {
                    'NO': 'no', 'tujuan': 'tujuan',
                    'jan': 'jan', 'feb': 'feb', 'mar': 'mar', 'apr': 'apr',
                    'mei': 'mei', 'jun': 'jun', 'jul': 'jul', 'agt': 'agt',
                    'sep': 'sep', 'okt': 'okt', 'nov': 'nov', 'des': 'des',
                    'total': 'total', 'persen (%)': 'persen', 'rata-rata': 'rataRata'
                },
                fact: [],
                filteredFact: [],
                datarekap: [],
                datarekap_compare: [],
                filteredDatarekap: [],
                lokasi_arr: [],
                GrandTotal: 0,
                GrandTotalTahunan: 0,
                GrandTotalTahunanCompare: 0,
                compareMode: false,
                compareYear: null,
                compareBulanSelected: [],
                showMoMPercent: false,
                summarySort: {
                    kategori: { field: 'total', order: -1 },
                    tujuan:   { field: 'total', order: -1 },
                    item:     { field: 'total', order: -1 },
                },
                bulanKeys: ['jan','feb','mar','apr','mei','jun','jul','agt','sep','okt','nov','des'],
                bulanOptions: [
                    { key: 'jan', label: 'Januari' }, { key: 'feb', label: 'Februari' },
                    { key: 'mar', label: 'Maret' }, { key: 'apr', label: 'April' },
                    { key: 'mei', label: 'Mei' }, { key: 'jun', label: 'Juni' },
                    { key: 'jul', label: 'Juli' }, { key: 'agt', label: 'Agustus' },
                    { key: 'sep', label: 'September' }, { key: 'okt', label: 'Oktober' },
                    { key: 'nov', label: 'November' }, { key: 'des', label: 'Desember' },
                ],
                kategori: [
                    { name: 'OBAT-OBATAN', code: 'OBT' },
                    { name: 'BMHP', code: 'BMHP' },
                    { name: 'BHP NON MEDIS', code: 'BHP NON MEDIS' },
                    { name: 'ALL', code: 'ALL' },
                ],
                summary: { jan:0, feb:0, mar:0, apr:0, mei:0, jun:0, jul:0, agt:0, sep:0, okt:0, nov:0, des:0 },
                summary_compare: { jan:0, feb:0, mar:0, apr:0, mei:0, jun:0, jul:0, agt:0, sep:0, okt:0, nov:0, des:0 },
                grafBulananExpanded: true,
                grafTujuanExpanded: true,
                grafBulanan: { labels: [], datasets: [] },
                grafTujuan: { labels: [], datasets: [] },
                showSerapan: false,
                isLoadingSerapan: false,
                serapanByLokasi: {},
                form: {
                    startdate: '',
                    enddate: '',
                    lokasi: '',
                    kategoriSelected: { name: 'ALL', code: 'ALL' }
                },
                filters: {
                    global:       { value: null, matchMode: FilterMatchMode.CONTAINS },
                    NO_TRANSFER:  { value: null, matchMode: FilterMatchMode.CONTAINS },
                    TUJUAN:       { value: null, matchMode: FilterMatchMode.IN },
                    JENIS_LOKASI: { value: null, matchMode: FilterMatchMode.IN },
                    KATEGORI:     { value: null, matchMode: FilterMatchMode.IN },
                    BARCODE:      { value: null, matchMode: FilterMatchMode.CONTAINS },
                    NAMA:         { value: null, matchMode: FilterMatchMode.CONTAINS },
                },
                filters1: {
                    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                    tujuan: { value: null, matchMode: FilterMatchMode.IN }
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            this.form.startdate = new Date();
        },
        created() {
            this.get_lokasi();
        },
        watch: {
            compareBulanSelected: {
                deep: true,
                handler() {
                    if (this.hasComparisonData) this.buildCharts();
                }
            }
        },
        computed: {
            filteredSummary() {
                return this.filteredFact.reduce((acc, row) => {
                    acc.qty += parseFloat(row.QTY) || 0;
                    acc.total += parseFloat(row.TOTAL) || 0;
                    return acc;
                }, { qty: 0, total: 0 });
            },
            rataRataPerTransaksi() {
                return this.filteredFact.length > 0 ? this.filteredSummary.total / this.filteredFact.length : 0;
            },
            summaryByKategori() {
                return this.sortSummaryRows(this.groupSummary(this.filteredFact, 'KATEGORI'), 'kategori');
            },
            topTujuanSummary() {
                // Top 10 selalu dipilih berdasarkan Total Nilai (default groupSummary),
                // sortir kolom di bawah hanya mengubah urutan tampil dari 10 baris ini.
                const top10 = this.groupSummary(this.filteredFact, 'TUJUAN').slice(0, 10);
                return this.sortSummaryRows(top10, 'tujuan');
            },
            topItemSummary() {
                // Dikelompokkan per nama item (barang), top 15 berdasarkan Total Nilai.
                const top15 = this.groupSummary(this.filteredFact, 'NAMA').slice(0, 15);
                return this.sortSummaryRows(top15, 'item');
            },
            // Menambahkan field deltaPembanding pada tiap baris agar kolom
            // "Δ vs Pembanding" bisa disortir (sortable butuh field asli, bukan
            // nilai yang dihitung ulang tiap render lewat method).
            datarekapDisplay() {
                let rows = this.datarekap;
                if (this.hasComparisonData) {
                    rows = rows.map(row => ({
                        ...row,
                        deltaPembanding: this.getTujuanComparison(row.tujuan).percentage
                    }));
                }
                if (this.showSerapan) {
                    rows = rows.map(row => {
                        const s = this.serapanByLokasi[String(row.id_tujuan)];
                        const serapan = s ? s.total : 0;
                        const serapanPercent = row.total > 0 ? Math.round((serapan / row.total) * 1000) / 10 : 0;
                        return { ...row, serapan, serapanPercent };
                    });
                }
                return rows;
            },
            json_datarekapExport() {
                if (!this.showSerapan) return this.json_datarekap;
                return { ...this.json_datarekap, 'serapan': 'serapan', 'persen terserap (%)': 'serapanPercent' };
            },
            // Rangkuman (per bulan, total, persen, serapan) dihitung dari baris yang
            // SEDANG TAMPIL di tabel (mengikuti filter TUJUAN / pencarian), bukan seluruh data.
            filteredRekapSummary() {
                const sum = { jan:0, feb:0, mar:0, apr:0, mei:0, jun:0, jul:0, agt:0, sep:0, okt:0, nov:0, des:0, total: 0, persen: 0, serapan: 0 };
                this.filteredDatarekap.forEach(row => {
                    this.bulanKeys.forEach(k => { sum[k] += parseFloat(row[k]) || 0; });
                    sum.total += row.total || 0;
                    sum.persen += row.persen || 0;
                    if (row.serapan !== undefined) sum.serapan += row.serapan || 0;
                });
                return sum;
            },
            grandSerapan() {
                return this.filteredRekapSummary.serapan;
            },
            grandSerapanPercent() {
                return this.filteredRekapSummary.total > 0 ? Math.round((this.grandSerapan / this.filteredRekapSummary.total) * 1000) / 10 : 0;
            },
            serapanPercentFooterStyle() {
                return this.serapanPercentColor(this.grandSerapanPercent);
            },
            // Opsi tiap MultiSelect dihitung dari data yang sudah tersaring oleh filter
            // KOLOM LAIN (bukan filter kolom itu sendiri), supaya opsi ikut ter-update
            // begitu ada filter lain diterapkan, tanpa opsi kolom sendiri jadi hilang
            // saat sudah ada pilihan aktif.
            tujuanOptions() {
                return [...new Set(
                    this.fact.filter(r => this.matchesFilters(r, 'TUJUAN')).map(r => r.TUJUAN).filter(v => v)
                )].sort();
            },
            rekapTujuanOptions() {
                return [...new Set(this.datarekap.map(row => row.tujuan).filter(v => v))].sort();
            },
            jenisLokasiOptions() {
                return [...new Set(
                    this.fact.filter(r => this.matchesFilters(r, 'JENIS_LOKASI')).map(r => r.JENIS_LOKASI).filter(v => v)
                )].sort();
            },
            kategoriOptions() {
                return [...new Set(
                    this.fact.filter(r => this.matchesFilters(r, 'KATEGORI')).map(r => r.KATEGORI).filter(v => v)
                )].sort();
            },
            hasComparisonData() {
                return this.compareMode && this.datarekap_compare.length > 0;
            },
            compareYearLabel() {
                return this.compareYear ? new Date(this.compareYear).getFullYear() : 'Pembanding';
            },
            monthColStyle() {
                const wide = this.hasComparisonData || this.showSerapan;
                return {
                    minWidth: wide ? '9rem' : '7rem',
                    textAlign: 'right'
                };
            },
            bulanKeysCompareRange() {
                // Urutkan sesuai urutan kalender, bukan urutan klik user di MultiSelect
                return this.bulanKeys.filter(k => this.compareBulanSelected.includes(k));
            },
            grandAverageValue() {
                const activeMonths = this.bulanKeys.filter(k => this.filteredRekapSummary[k] > 0).length;
                const divisor = activeMonths > 0 ? activeMonths : this.bulanKeys.length;
                return this.filteredRekapSummary.total / divisor;
            },
            bulanSelectedLabel() {
                return this.bulanOptions
                    .filter(o => this.compareBulanSelected.includes(o.key))
                    .map(o => o.label)
                    .join(', ');
            },
            grandTotalRange() {
                return this.filteredDatarekap.reduce((sum, row) => sum + this.sumRangeForRow(row), 0);
            },
            grandTotalCompareRange() {
                return this.filteredDatarekap.reduce((sum, row) => {
                    const compareRow = this.datarekap_compare.find(c => c.tujuan === row.tujuan);
                    return sum + this.sumRangeForRow(compareRow);
                }, 0);
            },
            totalComparison() {
                return this.calculateComparison(this.grandTotalRange, this.grandTotalCompareRange);
            },
            chartOptionsBulanan() {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: this.hasComparisonData, position: 'top' } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { color: '#e1e0d9' } }
                    }
                };
            },
            chartOptionsTujuan() {
                return {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: this.hasComparisonData, position: 'top' } },
                    scales: {
                        x: { beginAtZero: true, grid: { color: '#e1e0d9' } },
                        y: { grid: { display: false } }
                    }
                };
            },
        },
        methods: {
            formatInterger(value) {
                return (value || 0).toLocaleString('en-US');
            },
            formatCurrency(value) {
                return (value || 0).toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
            },
            // Mengelompokkan baris transaksi berdasarkan satu kolom (mis. KATEGORI, TUJUAN),
            // dipakai untuk kartu Rangkuman Transaksi di bawah tabel Rincian.
            groupSummary(rows, field) {
                const map = {};
                rows.forEach(row => {
                    const key = row[field] || '(Kosong)';
                    if (!map[key]) map[key] = { label: key, count: 0, qty: 0, total: 0 };
                    map[key].count += 1;
                    map[key].qty += parseFloat(row.QTY) || 0;
                    map[key].total += parseFloat(row.TOTAL) || 0;
                });
                const grandTotal = rows.reduce((sum, r) => sum + (parseFloat(r.TOTAL) || 0), 0);
                return Object.values(map)
                    .map(item => ({ ...item, percent: grandTotal > 0 ? ((item.total / grandTotal) * 100).toFixed(1) : '0.0' }))
                    .sort((a, b) => b.total - a.total);
            },
            // Sortir untuk tabel ringkasan (Kategori / Jenis Lokasi / Tujuan) — bukan
            // tabel PrimeVue, jadi diurutkan manual berdasarkan state di summarySort.
            sortSummaryRows(rows, tableKey) {
                const state = this.summarySort[tableKey];
                return [...rows].sort((a, b) => {
                    let av = a[state.field];
                    let bv = b[state.field];
                    if (state.field === 'percent') { av = parseFloat(av); bv = parseFloat(bv); }
                    if (typeof av === 'string') return av.localeCompare(bv) * state.order;
                    return (av - bv) * state.order;
                });
            },
            toggleSummarySort(tableKey, field) {
                const state = this.summarySort[tableKey];
                if (state.field === field) {
                    state.order = -state.order;
                } else {
                    state.field = field;
                    state.order = field === 'label' ? 1 : -1;
                }
            },
            summarySortIcon(tableKey, field) {
                const state = this.summarySort[tableKey];
                if (state.field !== field) return 'pi pi-sort';
                return state.order === 1 ? 'pi pi-sort-up' : 'pi pi-sort-down';
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/distribusi-api', this.form)
                    .then(response => {
                        this.fact = response.data.response;
                        this.filteredFact = this.fact;
                        this.GrandTotal = this.fact.reduce((sum, row) => sum + parseFloat(row.TOTAL || 0), 0);
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            onFilterFact(event) {
                this.filteredFact = event.filteredValue || this.fact;
            },
            // Mengecek satu baris terhadap semua filter aktif di tabel Rincian, kecuali
            // kolom `excludeField` — dipakai untuk menghitung opsi MultiSelect per kolom
            // secara cascading (mengikuti filter kolom lain, tapi tidak memfilter dirinya sendiri).
            matchesFilters(row, excludeField) {
                const f = this.filters;
                if (f.global.value) {
                    const term = String(f.global.value).toLowerCase();
                    const fields = ['NO_TRANSFER', 'TUJUAN', 'KATEGORI', 'BARCODE', 'NAMA'];
                    if (!fields.some(fld => String(row[fld] ?? '').toLowerCase().includes(term))) return false;
                }
                if (excludeField !== 'NO_TRANSFER' && f.NO_TRANSFER.value) {
                    if (!String(row.NO_TRANSFER ?? '').toLowerCase().includes(String(f.NO_TRANSFER.value).toLowerCase())) return false;
                }
                if (excludeField !== 'TUJUAN' && f.TUJUAN.value && f.TUJUAN.value.length) {
                    if (!f.TUJUAN.value.includes(row.TUJUAN)) return false;
                }
                if (excludeField !== 'JENIS_LOKASI' && f.JENIS_LOKASI.value && f.JENIS_LOKASI.value.length) {
                    if (!f.JENIS_LOKASI.value.includes(row.JENIS_LOKASI)) return false;
                }
                if (excludeField !== 'KATEGORI' && f.KATEGORI.value && f.KATEGORI.value.length) {
                    if (!f.KATEGORI.value.includes(row.KATEGORI)) return false;
                }
                if (excludeField !== 'BARCODE' && f.BARCODE.value) {
                    if (!String(row.BARCODE ?? '').toLowerCase().includes(String(f.BARCODE.value).toLowerCase())) return false;
                }
                if (excludeField !== 'NAMA' && f.NAMA.value) {
                    if (!String(row.NAMA ?? '').toLowerCase().includes(String(f.NAMA.value).toLowerCase())) return false;
                }
                return true;
            },
            async get_lokasi() {
                this.isLoading = true;
                await axios.get('/getlokasi-api', '')
                    .then(response => {
                        this.lokasi_arr = response.data.response.filter(x => x.IS_HQ == '1');
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            onToggleSerapan() {
                if (this.showSerapan && this.datarekap.length > 0) {
                    this.getDataSerapan();
                }
            },
            serapanPercentClass(value) {
                if (value >= 80) return 'text-success';
                if (value >= 50) return 'text-warning';
                return 'text-danger';
            },
            serapanPercentColor(value) {
                if (value >= 80) return 'color:#28a745;';
                if (value >= 50) return 'color:#e0a800;';
                return 'color:#dc3545;';
            },
            // Nilai serapan (pemakaian obat) untuk lokasi & bulan yang sama dengan sel
            // distribusi yang sedang ditampilkan — dipakai untuk baris kecil di tiap sel bulan.
            serapanForMonth(row, key) {
                const s = this.serapanByLokasi[String(row.id_tujuan)];
                return s ? (s[key] || 0) : 0;
            },
            async getDataSerapan() {
                if (!this.form.startdate) return;
                this.isLoadingSerapan = true;
                const year = new Date(this.form.startdate).getFullYear();
                const payload = {
                    kategori: (this.form.kategoriSelected && this.form.kategoriSelected.name) || 'ALL',
                    tanggal_awal: `${year}-01-01`,
                    tanggal_akhir: `${year}-12-31`,
                };
                console.log('[serapan] payload dikirim:', payload);
                try {
                    const res = await axios.post('/get_data_pemakaian_obat_summary', payload);
                    console.log('[serapan] response mentah:', res.data);
                    const rows = res.data.response || [];
                    console.log('[serapan] jumlah baris:', rows.length);

                    // Dicocokkan langsung berdasarkan kode lokasi (id_tujuan), bukan nama tujuan.
                    const map = {};
                    rows.forEach(row => {
                        const kode = String(row.LOKASI);
                        const bulanIdx = parseInt(row.BULAN, 10);
                        const key = this.bulanKeys[bulanIdx - 1];
                        if (!key) return;
                        if (!map[kode]) {
                            map[kode] = { jan:0, feb:0, mar:0, apr:0, mei:0, jun:0, jul:0, agt:0, sep:0, okt:0, nov:0, des:0, total: 0 };
                        }
                        const val = parseFloat(row.TOTAL_SERAPAN) || 0;
                        map[kode][key] += val;
                        map[kode].total += val;
                    });
                    this.serapanByLokasi = map;
                    this.filteredDatarekap = this.datarekapDisplay;
                } catch (e) {
                    console.log('[serapan] ERROR saat fetch:', e);
                } finally {
                    this.isLoadingSerapan = false;
                }
            },
            onFilterRekap(event) {
                this.filteredDatarekap = event.filteredValue || this.datarekapDisplay;
            },
            async getdata_rekap_pertahun() {
                this.fact = [];
                this.isLoading = true;
                await axios.post('/rekap_transfer_bulanan', this.form)
                    .then(response => {
                        const rows = (response.data.response || []).map(row => ({
                            ...row,
                            total: this.bulanKeys.reduce((sum, key) => sum + parseFloat(row[key] || 0), 0)
                        }));
                        this.summary = response.data.summary;
                        const s = this.summary;
                        this.GrandTotalTahunan = (s.jan + s.feb + s.mar + s.apr + s.mei + s.jun +
                            s.jul + s.agt + s.sep + s.okt + s.nov + s.des);
                        this.datarekap = rows.map(row => ({
                            ...row,
                            persen: this.GrandTotalTahunan > 0 ? (row.total / this.GrandTotalTahunan) * 100 : 0,
                            rataRata: this.averageValue(row)
                        }));
                        this.filteredDatarekap = this.datarekapDisplay;

                        this.buildCharts();
                        if (this.showSerapan) this.getDataSerapan();
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            onCompareModeChange() {
                if (!this.compareMode) {
                    this.datarekap_compare = [];
                    this.summary_compare = { jan:0, feb:0, mar:0, apr:0, mei:0, jun:0, jul:0, agt:0, sep:0, okt:0, nov:0, des:0 };
                    this.GrandTotalTahunanCompare = 0;
                    this.buildCharts();
                    this.filteredDatarekap = this.datarekapDisplay;
                    return;
                }
                if (!this.compareYear) {
                    const base = this.form.startdate ? new Date(this.form.startdate) : new Date();
                    base.setFullYear(base.getFullYear() - 1);
                    this.compareYear = base;
                }
                // Tahun yang sedang dilihat masih berjalan (= tahun kalender saat ini) →
                // default pilihan bulan hanya sampai bulan terakhir agar adil, bukan 12 bulan penuh.
                if (this.compareBulanSelected.length === 0) {
                    const tahunDilihat = this.form.startdate ? new Date(this.form.startdate).getFullYear() : new Date().getFullYear();
                    const batas = tahunDilihat === new Date().getFullYear() ? new Date().getMonth() + 1 : 12;
                    this.compareBulanSelected = this.bulanKeys.slice(0, batas);
                }
            },
            calculateComparison(current, previous) {
                if (!previous || previous === 0) {
                    return { percentage: 0, difference: current };
                }
                const difference = current - previous;
                const percentage = Math.round((difference / previous) * 100);
                return { percentage, difference };
            },
            // Persentase bulan ke bulan (dalam baris/tujuan yang sama), mengikuti
            // rumus hitung_persentase yang sudah dipakai di dashboard kunjungan.
            momPercent(row, key) {
                const idx = this.bulanKeys.indexOf(key);
                if (idx <= 0) return null; // JAN tidak punya bulan sebelumnya dalam tahun yang sama
                const prevKey = this.bulanKeys[idx - 1];
                const awal = parseFloat(row[prevKey]) || 0;
                const akhir = parseFloat(row[key]) || 0;
                if (awal === 0 || akhir === 0) return { percentage: 0, up: true };
                const percentage = Math.round(((akhir - awal) / awal) * 1000) / 10;
                return { percentage, up: percentage >= 0 };
            },
            // Rata-rata per bulan berjalan — dibagi jumlah bulan yang sudah ada datanya
            // (bukan 12), supaya tidak turun palsu saat tahun berjalan belum selesai.
            averageValue(row) {
                const activeMonths = this.bulanKeys.filter(k => parseFloat(row[k]) > 0).length;
                const divisor = activeMonths > 0 ? activeMonths : this.bulanKeys.length;
                return (row.total || 0) / divisor;
            },
            // Persentase tahun ke tahun untuk bulan yang sama pada tujuan yang sama,
            // misal Januari tahun berjalan vs Januari tahun pembanding.
            yoyPercent(row, key) {
                const compareRow = this.datarekap_compare.find(r => r.tujuan === row.tujuan);
                if (!compareRow) return null;
                const awal = parseFloat(compareRow[key]) || 0;
                const akhir = parseFloat(row[key]) || 0;
                if (awal === 0 || akhir === 0) return { percentage: 0, up: true, compareValue: awal };
                const percentage = Math.round(((akhir - awal) / awal) * 1000) / 10;
                return { percentage, up: percentage >= 0, compareValue: awal };
            },
            sumRangeForRow(row) {
                if (!row) return 0;
                return this.bulanKeysCompareRange.reduce((sum, key) => sum + (parseFloat(row[key]) || 0), 0);
            },
            getTujuanComparison(tujuan) {
                const compareRow = this.datarekap_compare.find(r => r.tujuan === tujuan);
                if (!compareRow) return { percentage: 0, difference: 0 };
                const currentRow = this.datarekap.find(r => r.tujuan === tujuan);
                return this.calculateComparison(this.sumRangeForRow(currentRow), this.sumRangeForRow(compareRow));
            },
            async getdata_rekap_pertahun_compare() {
                if (!this.compareYear) {
                    this.open('warn', 'Silakan pilih tahun pembanding terlebih dahulu');
                    return;
                }
                if (this.compareBulanSelected.length === 0) {
                    this.open('warn', 'Silakan pilih minimal satu bulan untuk dibandingkan');
                    return;
                }
                this.isLoading = true;
                const payload = {
                    startdate: this.compareYear,
                    lokasi: this.form.lokasi,
                    kategoriSelected: this.form.kategoriSelected
                };
                await axios.post('/rekap_transfer_bulanan', payload)
                    .then(response => {
                        this.datarekap_compare = (response.data.response || []).map(row => ({
                            ...row,
                            total: this.bulanKeys.reduce((sum, key) => sum + parseFloat(row[key] || 0), 0)
                        }));
                        this.summary_compare = response.data.summary;
                        const s = this.summary_compare;
                        this.GrandTotalTahunanCompare = (s.jan + s.feb + s.mar + s.apr + s.mei + s.jun +
                            s.jul + s.agt + s.sep + s.okt + s.nov + s.des);
                        this.buildCharts();
                        this.filteredDatarekap = this.datarekapDisplay;
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            open(type, message) {
                if (this.$toast) {
                    this.$toast.open({ message, position: 'top-right', type, duration: 3000, dismissible: true });
                }
            },
            buildCharts() {
                const bulanLabels = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'];
                const tahunUtama = this.form.startdate ? new Date(this.form.startdate).getFullYear() : 'Tahun Ini';
                const tahunBanding = this.compareYear ? new Date(this.compareYear).getFullYear() : 'Pembanding';

                const datasetsBulanan = [{
                    label: `Tahun ${tahunUtama}`,
                    data: this.bulanKeys.map(key => this.summary[key] || 0),
                    backgroundColor: '#2a78d6',
                    borderColor: '#184f95',
                    borderWidth: 1,
                    borderRadius: 4
                }];
                if (this.hasComparisonData) {
                    datasetsBulanan.push({
                        label: `Tahun ${tahunBanding}`,
                        data: this.bulanKeys.map(key => this.summary_compare[key] || 0),
                        backgroundColor: '#eb6834',
                        borderColor: '#c94f1c',
                        borderWidth: 1,
                        borderRadius: 4
                    });
                }
                this.grafBulanan = { labels: bulanLabels, datasets: datasetsBulanan };

                // Saat mode perbandingan aktif, ranking & nilai dihitung dari rentang
                // bulan yang sama (bulanKeysCompareRange) di kedua tahun agar adil.
                const valueOf = row => this.hasComparisonData ? this.sumRangeForRow(row) : row.total;
                const sorted = [...this.datarekap].sort((a, b) => valueOf(b) - valueOf(a));
                const top10 = sorted.slice(0, 10);
                const sisa = sorted.slice(10).reduce((sum, row) => sum + valueOf(row), 0);
                const labels = top10.map(row => row.tujuan);
                const values = top10.map(row => valueOf(row));
                if (sisa > 0) {
                    labels.push('LAINNYA');
                    values.push(sisa);
                }
                const datasetsTujuan = [{
                    label: `Tahun ${tahunUtama}`,
                    data: values,
                    backgroundColor: '#2a78d6',
                    borderColor: '#184f95',
                    borderWidth: 1,
                    borderRadius: 4
                }];
                if (this.hasComparisonData) {
                    const compareValues = top10.map(row => {
                        const match = this.datarekap_compare.find(c => c.tujuan === row.tujuan);
                        return this.sumRangeForRow(match);
                    });
                    if (sisa > 0) compareValues.push(0);
                    datasetsTujuan.push({
                        label: `Tahun ${tahunBanding}`,
                        data: compareValues,
                        backgroundColor: '#eb6834',
                        borderColor: '#c94f1c',
                        borderWidth: 1,
                        borderRadius: 4
                    });
                }
                this.grafTujuan = { labels, datasets: datasetsTujuan };
            }
        }
    }
</script>

<style scoped>
.sortable-th {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
}
.sortable-th i {
    font-size: .7rem;
    opacity: .6;
    margin-left: 3px;
}
.sortable-th:hover {
    background: #f1f5f9;
}
.filter-summary-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .85rem;
    color: #495057;
    flex-wrap: wrap;
}
.filter-summary-sep {
    color: #cbd5e0;
}
</style>
