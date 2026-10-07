<template>
    <section class="content">
        <!-- ===== DIALOG: PERSETUJUAN PASIEN ===== -->
        <Dialog header="Persetujuan Pasien" v-model:visible="InformConsent"  :style="{ width: '50rem' }"
            :modal="true">
            <consent-pasien :datapasien="details_pasien"></consent-pasien>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="InformConsent=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: LAPORAN DOKTER IGD ===== -->
        <Dialog header="Laporan Inputan Dokter IGD" v-model:visible="showLaporanDokter" :modal="true"
            :style="{ width: '50rem' }">
            <!-- Stat strip compact -->
            <div class="d-flex flex-wrap mb-3" style="gap:8px">
                <div class="lp-stat lp-stat-primary">
                    <i class="fas fa-users lp-stat-icon"></i>
                    <span class="lp-stat-num">{{ laporan.list.length }}</span>
                    <span class="lp-stat-lbl">Total Pasien</span>
                </div>
                <div class="lp-stat lp-stat-success">
                    <i class="pi pi-check-circle lp-stat-icon"></i>
                    <span class="lp-stat-num">{{ laporanJumlahVerif }}</span>
                    <span class="lp-stat-lbl">Sudah Verifikasi</span>
                </div>
                <div class="lp-stat lp-stat-warning">
                    <i class="pi pi-clock lp-stat-icon"></i>
                    <span class="lp-stat-num">{{ laporanJumlahBelumVerif }}</span>
                    <span class="lp-stat-lbl">Belum Verifikasi</span>
                </div>
                <div class="lp-stat lp-stat-info">
                    <i class="pi pi-chart-pie lp-stat-icon"></i>
                    <span class="lp-stat-num">{{ laporanPersenVerif }}%</span>
                    <span class="lp-stat-lbl">Terverifikasi</span>
                </div>
            </div>

            <!-- Filter card -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header py-2">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-filter mr-2" style="color:#1976d2"></i>Filter Data
                    </h3>
                </div>
                <div class="card-body pb-2">
                    <div class="row align-items-end">
                        <div class="col-md-3">
                            <label class="filter-label">Tanggal</label>
                            <Calendar v-model="laporan.tanggalObj" dateFormat="dd/mm/yy" :showIcon="true"
                                style="width:100%" @date-select="onLaporanDateSelect" />
                        </div>
                        <div class="col-md-4">
                            <label class="filter-label">Cari</label>
                            <InputText v-model="laporan.keyword" placeholder="No. MR / Nama / DPJP / Keterangan..."
                                style="width:100%" />
                        </div>
                        <div class="col-md-3">
                            <label class="filter-label">Status Verifikasi</label>
                            <Select v-model="laporan.filterVerif" :options="laporanVerifOptions" optionLabel="label"
                                optionValue="value" placeholder="Semua" style="width:100%" :showClear="true" />
                        </div>
                        <div class="col-md-2 d-flex" style="gap:6px">
                            <Button label="Cari" icon="pi pi-search" class="p-button-primary p-button-sm"
                                :disabled="laporan.loading" @click="fetchLaporanDokter()" />
                            <Button icon="pi pi-refresh" class="p-button-secondary p-button-outlined p-button-sm"
                                v-tooltip.top="'Reset filter'" @click="resetLaporanFilter()" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- Tab card -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header p-0 border-bottom-0">
                    <ul class="nav nav-tabs" style="border-bottom:none">
                        <li class="nav-item">
                            <a class="nav-link" :class="{active: laporan.activeTab==='detail'}" href="#"
                                @click.prevent="laporan.activeTab='detail'">
                                <i class="pi pi-list mr-1"></i> Detail Pasien
                                <span class="badge badge-primary ml-1">{{ laporanFiltered.length }}</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{active: laporan.activeTab==='summary'}" href="#"
                                @click.prevent="laporan.activeTab='summary'">
                                <i class="pi pi-chart-bar mr-1"></i> Summary per Dokter
                                <span class="badge badge-info ml-1">{{ laporanSummary.length }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Tab: Detail Pasien -->
                <div v-if="laporan.activeTab==='detail'" class="card-body p-0">
                    <DataTable :value="laporanFiltered" :rowHover="true" :paginator="true" :rows="15"
                        class="p-datatable-sm p-datatable-striped" responsiveLayout="scroll"
                        :rowsPerPageOptions="[10,15,20,50]" :rowClass="laporanRowClass" :loading="laporan.loading">
                        <template #empty>
                            <div class="text-center py-5 text-muted">
                                <i class="fas fa-ambulance fa-2x mb-2 d-block opacity-50"></i>
                                <strong>Tidak ada data triase</strong><br>
                                <small>Pilih tanggal dan klik Cari untuk memuat data</small>
                            </div>
                        </template>
                        <template #loading>
                            <div class="text-center py-3"><i class="pi pi-spin pi-spinner mr-2"></i>Memuat data...</div>
                        </template>
                        <Column header="No" :styles="{'width':'52px','text-align':'center'}">
                            <template #body="slotProps">
                                <span class="badge badge-secondary">{{ slotProps.index + 1 }}</span>
                            </template>
                        </Column>
                        <Column field="NOMR" header="No. Rekam Medis" :styles="{'width':'150px'}">
                            <template #body="slotProps">
                                <code class="text-primary font-weight-bold">{{ slotProps.data.NOMR || '-' }}</code>
                            </template>
                        </Column>
                        <Column field="NAMAPASIEN" header="Nama Pasien" :styles="{'min-width':'180px'}">
                            <template #body="slotProps">
                                <span class="font-weight-bold">{{ slotProps.data.NAMAPASIEN || '—' }}</span>
                            </template>
                        </Column>
                        <Column field="dpjp" header="DPJP / Dokter" :styles="{'min-width':'200px'}">
                            <template #body="slotProps">
                                <span><i
                                        class="pi pi-user mr-1 text-primary"></i>{{ slotProps.data.dpjp || '—' }}</span>
                            </template>
                        </Column>
                        <Column field="keterangan" header="Keterangan / Disposisi" :styles="{'min-width':'180px'}">
                            <template #body="slotProps">
                                <span v-if="slotProps.data.keterangan" class="badge badge-info"
                                    style="white-space:normal;text-align:left">
                                    {{ slotProps.data.keterangan }}
                                </span>
                                <span v-else class="text-muted"><em>—</em></span>
                            </template>
                        </Column>
                        <Column field="telah_verif" header="Status Verifikasi" :styles="{'width':'170px'}">
                            <template #body="slotProps">
                                <span v-if="slotProps.data.telah_verif=='1'" class="badge badge-success">
                                    <i class="pi pi-check mr-1"></i>Sudah Diverifikasi
                                </span>
                                <span v-else class="badge badge-warning text-dark">
                                    <i class="pi pi-clock mr-1"></i>Belum Diverifikasi
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Tab: Summary per Dokter -->
                <div v-if="laporan.activeTab==='summary'" class="card-body p-0">
                    <DataTable :value="laporanSummary" :rowHover="true" showGridlines class="p-datatable-sm"
                        responsiveLayout="scroll" sortField="total" :sortOrder="-1">
                        <template #empty>
                            <div class="text-center py-5 text-muted">
                                <i class="pi pi-chart-bar fa-2x mb-2 d-block"></i>
                                Tidak ada data
                            </div>
                        </template>
                        <Column header="No" :styles="{'width':'52px','text-align':'center'}">
                            <template #body="slotProps">
                                <span class="badge badge-secondary">{{ slotProps.index + 1 }}</span>
                            </template>
                        </Column>
                        <Column field="dpjp" header="Dokter / DPJP" :sortable="true" :styles="{'min-width':'220px'}">
                            <template #body="slotProps">
                                <span><i
                                        class="pi pi-user mr-1 text-primary"></i>{{ slotProps.data.dpjp || '—' }}</span>
                            </template>
                        </Column>
                        <Column field="total" header="Total Pasien" :sortable="true"
                            :styles="{'width':'130px','text-align':'center'}">
                            <template #body="slotProps">
                                <span class="badge badge-primary"
                                    style="font-size:13px">{{ slotProps.data.total }}</span>
                            </template>
                        </Column>
                        <Column field="verif" header="Sudah Verif" :sortable="true"
                            :styles="{'width':'130px','text-align':'center'}">
                            <template #body="slotProps">
                                <span class="badge badge-success"
                                    style="font-size:13px">{{ slotProps.data.verif }}</span>
                            </template>
                        </Column>
                        <Column field="belum" header="Belum Verif" :sortable="true"
                            :styles="{'width':'130px','text-align':'center'}">
                            <template #body="slotProps">
                                <span class="badge badge-warning text-dark"
                                    style="font-size:13px">{{ slotProps.data.belum }}</span>
                            </template>
                        </Column>
                        <Column field="persen" header="% Verifikasi" :sortable="true" :styles="{'min-width':'160px'}">
                            <template #body="slotProps">
                                <div class="d-flex align-items-center" style="gap:8px">
                                    <div class="progress flex-grow-1 mb-0" style="height:10px">
                                        <div class="progress-bar bg-success"
                                            :style="{width: slotProps.data.persen+'%'}"></div>
                                    </div>
                                    <small class="font-weight-bold text-success">{{ slotProps.data.persen }}%</small>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <template #footer>
                <Button label="Tutup" icon="pi pi-times" class="p-button-secondary p-button-outlined"
                    @click="showLaporanDokter=false" />
            </template>
        </Dialog>

        <!-- <ConfirmDialog></ConfirmDialog> -->
        <!-- ===== DIALOG: REKAM MEDIS ===== -->
        <Dialog header="Rekam Medis Pasien" v-model:visible="displayBasic2"
            :maximized="true"
            position="center" :modal="true"
            :style="{ margin: '0', borderRadius: '0', width: '98vw', height: '100vh' }"
            :contentStyle="{ overflow: 'auto', flex: '1' }">
            <div class="card card-outline card-primary">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2 text-center">
                            <img width="160" src="https://ws-simrs.net/ilustration/ilustrasi1.png" alt="Ilustration"
                                class="img-fluid rounded">
                        </div>
                        <div class="col-md-5">
                            <h5 class="font-weight-bold mb-1">{{ details_pasien.DATA_SINGKAT }} &mdash;
                                {{ details_pasien.NOMR }}</h5>
                            <div class="text-muted mb-1">{{ details_pasien.CARABAYAR }} &nbsp;|&nbsp;
                                <strong>{{ details_pasien.NOSEP }}</strong></div>
                            <div class="text-muted">{{ details_pasien.NAMAKECAMATAN }}</div>
                            <span class="badge" :class="details_pasien.KLL==1 ? 'badge-danger' : 'badge-secondary'">
                                KLL: {{ details_pasien.KLL==1 ? 'Ya' : 'Tidak' }}
                            </span>
                        </div>
                        <div class="col-md-5 border-left">
                            <div class="text-muted mb-1"><i class="pi pi-calendar mr-1"></i> Masuk:
                                <strong>{{ details_pasien.MASUKPOLY_DISPLAY }}</strong></div>
                            <div class="text-muted mb-1"><i class="pi pi-map-marker mr-1"></i> {{ details_pasien.POLI }}
                            </div>
                            <div class="text-muted mb-1"><i class="pi pi-user mr-1"></i> DPJP:
                                <strong>{{ details_pasien.NAMADOKTER }}</strong></div>
                            <div class="text-muted"><i class="pi pi-tag mr-1"></i> Dx:
                                <strong>{{ details_pasien.DIAGNOSA_AWAL }} — {{ details_pasien.DX_CAPTION }}</strong>
                            </div>
                            <div class="text-muted"><i class="pi pi-tag mr-1"></i> NOREG :
                                <strong>{{ details_pasien.NOPENDAFTARAN }} </strong>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Tabs :value="(details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD') ? '0' : '1'">
                <TabList>
                    <Tab v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'" value="0">TRIASE IGD</Tab>
                    <Tab value="1">OBAT-OBATAN</Tab>
                    <Tab value="2">PENUNJANG</Tab>
                    <Tab value="3">TINDAKAN</Tab>
                    <Tab value="4">DIAGNOSA DOKTER</Tab>
                    <Tab value="5">LAMPIRAN FILE</Tab>
                    <Tab value="6">SELESAI DIRAWAT</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'" value="0">
                        <subtriaseigd :datapasien="details_pasien" @dokter-dikonfirmasi="onDokterDikonfirmasi">
                        </subtriaseigd>
                    </TabPanel>
                    <TabPanel value="1">
                        <Tabs value="1a">
                            <TabList>
                                <Tab value="1a">PERMINTAAN OBAT</Tab>
                                <Tab value="1b">FORMULIR PEMBERIAN OBAT</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="1a">
                                    <permintaanobat :datapasien="details_pasien"></permintaanobat>
                                </TabPanel>
                                <TabPanel value="1b">
                                    <pemberian-obat :datapasien="details_pasien"></pemberian-obat>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel value="2">
                        <Tabs value="2a">
                            <TabList>
                                <Tab value="2a">LABORATORIUM</Tab>
                                <Tab value="2b">RADIOLOGI</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="2a">
                                    <permintaan-lab :datapasien="details_pasien"></permintaan-lab>
                                </TabPanel>
                                <TabPanel value="2b">
                                    <permintaan-radiologi :datapasien="details_pasien"></permintaan-radiologi>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel value="3">
                        <Tabs value="3a">
                            <TabList>
                                <Tab value="3a">RIWAYAT TINDAKAN</Tab>
                                <Tab value="3b">PERMINTAAN OPERASI</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="3a">
                                    <tindakan :datapasien="details_pasien"></tindakan>
                                </TabPanel>
                                <TabPanel value="3b">
                                    <permintaan-operasi :datapasien="details_pasien"></permintaan-operasi>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel value="4">
                        <assement-dokter :datapasien="details_pasien"></assement-dokter>
                    </TabPanel>
                    <TabPanel value="5">
                        <listupload :datapasien="details_pasien"></listupload>
                    </TabPanel>
                    <TabPanel value="6">
                        <selesai-rawat :datapasien="details_pasien"></selesai-rawat>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Dialog>

        <div class="container-fluid px-0">

            <!-- ===== FILTER CARD ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-filter mr-2" style="color:#1976d2"></i>
                        Parameter Pencarian — IGD
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <Button label="Laporan Dokter" icon="pi pi-chart-bar" class="p-button-sm p-button-outlined"
                            style="border-color:#2d1b69;color:#2d1b69" @click="buka_laporan_dokter()" />
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:180px;border-radius:4px" />
                    </div>
                </div>
                <div class="card-body pb-3">
                    <div class="row">
                        <!-- KOLOM KIRI: FILTER & PENCARIAN -->
                        <div class="col-md-9 border-right">
                            <div class="row align-items-end">
                                <div class="col-md-3">
                                    <label class="filter-label">Tanggal Kunjungan</label>
                                    <Calendar v-model="form.startdate" @date-select="pilihtanggal($event)"
                                        :showIcon="true" view="date" dateFormat="dd/mm/yy" style="width:100%" />
                                </div>
                                <div class="col-md-4">
                                    <label class="filter-label">Cari Nama / No. RM</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="searchNama"
                                            placeholder="Nama / No. RM / Dokter..." />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" @click="getdata_pasien(7)">
                                                <i class="pi pi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5 d-flex align-items-end" style="gap:5px">
                                    <Button label="Refresh" icon="pi pi-refresh"
                                        class="p-button-success p-button-outlined" @click="getdata_pasien(6)" />
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label class="filter-label">Filter Triase:</label>
                                    <div class="d-flex flex-wrap" style="gap:8px">
                                        <button type="button" class="btn btn-xs"
                                            :class="filterTriase === 'SEMUA' ? 'btn-primary' : 'btn-outline-primary'"
                                            @click="filterTriase = 'SEMUA'">Semua</button>
                                        <button type="button" class="btn btn-xs"
                                            :class="filterTriase === 'EMERGENSI' ? 'btn-danger' : 'btn-outline-danger'"
                                            @click="filterTriase = 'EMERGENSI'">Emergensi</button>
                                        <button type="button" class="btn btn-xs"
                                            :class="filterTriase === 'URGENT' ? 'btn-warning' : 'btn-outline-warning'"
                                            @click="filterTriase = 'URGENT'">Urgent</button>
                                        <button type="button" class="btn btn-xs"
                                            :class="filterTriase === 'NON URGENT' ? 'btn-success' : 'btn-outline-success'"
                                            @click="filterTriase = 'NON URGENT'">Non-Urgent</button>
                                        <button type="button" class="btn btn-xs"
                                            :class="filterTriase === 'DEATH ON ARRIVAL' ? 'btn-dark' : 'btn-outline-dark'"
                                            @click="filterTriase = 'DEATH ON ARRIVAL'">DOA</button>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <label class="filter-label">Filter Kelompok Usia:</label>
                                    <div class="d-flex flex-wrap" style="gap:8px">
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'SEMUA'   ? 'btn-secondary'      : 'btn-outline-secondary'"
                                            @click="filterUsia = 'SEMUA'" title="Semua usia">Semua</button>
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'BAYI'    ? 'btn-usia-bayi'      : 'btn-outline-usia-bayi'"
                                            @click="filterUsia = 'BAYI'" title="&lt; 1 tahun">Bayi <strong
                                                class="badge badge-light ml-1">{{ usiaStats.BAYI }}</strong></button>
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'BALITA'  ? 'btn-usia-balita'    : 'btn-outline-usia-balita'"
                                            @click="filterUsia = 'BALITA'" title="1 – 4 tahun">Balita <strong
                                                class="badge badge-light ml-1">{{ usiaStats.BALITA }}</strong></button>
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'REMAJA'  ? 'btn-usia-remaja'    : 'btn-outline-usia-remaja'"
                                            @click="filterUsia = 'REMAJA'" title="5 – 17 tahun">Remaja <strong
                                                class="badge badge-light ml-1">{{ usiaStats.REMAJA }}</strong></button>
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'DEWASA'  ? 'btn-usia-dewasa'    : 'btn-outline-usia-dewasa'"
                                            @click="filterUsia = 'DEWASA'" title="18 – 59 tahun">Dewasa <strong
                                                class="badge badge-light ml-1">{{ usiaStats.DEWASA }}</strong></button>
                                        <button type="button" class="btn btn-sm"
                                            :class="filterUsia === 'LANSIA'  ? 'btn-usia-lansia'    : 'btn-outline-usia-lansia'"
                                            @click="filterUsia = 'LANSIA'" title="≥ 60 tahun">Lansia <strong
                                                class="badge badge-light ml-1">{{ usiaStats.LANSIA }}</strong></button>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <label class="filter-label">Filter Dokter / DPJP:</label>
                                    <div class="filter-dokter-wrapper">
                                        <button v-if="dokterScrollShowLeft" type="button"
                                            class="dokter-scroll-arrow dokter-scroll-arrow-left"
                                            @click="scrollDokter('left')" title="Geser kiri">
                                            <i class="pi pi-chevron-left"></i>
                                        </button>
                                        <div class="filter-dokter-scroll" ref="dokterScroll" @scroll="onDokterScroll">
                                            <button type="button" class="btn btn-sm btn-dokter"
                                                :class="filterDokter === 'SEMUA' ? 'btn-dokter-active' : ''"
                                                @click="filterDokter = 'SEMUA'">
                                                <i class="pi pi-users mr-1"></i>Semua
                                                <span class="badge badge-light ml-1">{{ fact.length }}</span>
                                            </button>
                                            <button v-for="dok in daftarDokter" :key="dok.nama" type="button"
                                                class="btn btn-sm btn-dokter"
                                                :class="filterDokter === dok.nama ? 'btn-dokter-active' : ''"
                                                :title="dok.nama" @click="filterDokter = dok.nama">
                                                <i class="pi pi-user mr-1"></i>
                                                {{ dok.nama }}
                                                <span class="badge badge-light ml-1">{{ dok.jumlah }}</span>
                                            </button>
                                        </div>
                                        <button v-if="dokterScrollShowRight" type="button"
                                            class="dokter-scroll-arrow dokter-scroll-arrow-right"
                                            @click="scrollDokter('right')" title="Geser kanan">
                                            <i class="pi pi-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- KOLOM KANAN: CARD KALKULASI (NEW) -->
                        <div class="col-md-3">
                            <div class="summary-wrapper">
                                <div class="summary-item bg-danger-light">
                                    <span class="summary-label">Emergensi</span>
                                    <span class="summary-count "><strong>{{ triaseStats.EMERGENSI }}</strong></span>
                                </div>
                                <div class="summary-item bg-warning-light">
                                    <span class="summary-label">Urgent</span>
                                    <span class="summary-count "><strong> {{ triaseStats.URGENT }}</strong></span>
                                </div>
                                <div class="summary-item bg-success-light">
                                    <span class="summary-label">Non-Urgent</span>
                                    <span class="summary-count  "><strong>
                                            {{ triaseStats['NON URGENT'] }}</strong></span>
                                </div>
                                <div class="summary-item bg-dark-light">
                                    <span class="summary-label">DOA</span>
                                    <span
                                        class="summary-count "><strong>{{ triaseStats['DEATH ON ARRIVAL'] }}</strong></span>
                                </div>
                                <div class="summary-item bg-secondary-light border-top mt-1 pt-1">
                                    <span class="summary-label"><strong>Total Pasien</strong></span>
                                    <span class="summary-count"><strong>{{ triaseStats.TOTAL }}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== TABLE CARD ===== -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-list mr-2" style="color:#1976d2"></i>
                        Daftar Pasien IGD
                    </h3>
                    <small class="text-muted">
                        Menampilkan <strong>{{ factFiltered.length }}</strong> dari <strong>{{ fact.length }}</strong>
                        pasien
                        <span v-if="searchNama" class="badge badge-info ml-1">Nama: "{{ searchNama }}"</span>
                        <span v-if="filterTriase !== 'SEMUA'" class="badge badge-secondary ml-1">Triase:
                            {{ filterTriase }}</span>
                        <span v-if="filterUsia !== 'SEMUA'" class="badge ml-1"
                            :class="usiaFilterBadgeClass(filterUsia)">Usia: {{ filterUsia }}</span>
                        <span v-if="filterDokter !== 'SEMUA'" class="badge badge-primary ml-1" style="cursor:pointer"
                            @click="filterDokter = 'SEMUA'" title="Klik untuk hapus">
                            <i class="pi pi-user mr-1"></i>{{ filterDokter }} &times;
                        </span>
                    </small>
                </div>
                <div class="card-body p-0">
                    <!-- Desktop: tabel (sembunyikan di layar < md) -->
                    <div class="table-responsive d-none d-md-block">
                        <table class="table table-bordered table-hover mb-0 igd-table">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width:40px">No</th>
                                    <th class="text-center" style="width:36px"></th>
                                    <th style="min-width:200px">Pasien</th>
                                    <th style="min-width:130px">Alamat</th>
                                    <th style="min-width:160px">Status Rawat</th>
                                    <th style="min-width:150px">Tgl Masuk / Keluar</th>
                                    <th style="min-width:170px">PENUNJANG</th>
                                    <th style="min-width:120px">Cara Bayar</th>
                                    <th class="text-center" style="min-width:130px">Aksi</th>
                                    <th class="text-center" style="min-width:130px">Status IGD</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="factFiltered.length === 0">
                                    <td colspan="10" class="text-center text-muted py-5">
                                        <i class="pi pi-inbox" style="font-size:2rem;opacity:.35"></i>
                                        <div class="mt-2">
                                            Data tidak ditemukan berdasarkan kriteria pencarian dan filter triase.
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(row, k) in factFiltered" :key="row.NOPENDAFTARAN"
                                    :class="{'row-waiting': row.KODECARABAYAR==27 || row.KODECARABAYAR==28}">
                                    <td class="text-center align-middle">
                                        <span class="row-number">{{ k + 1 }}</span>
                                    </td>
                                    <td class="text-center align-middle">
                                        <ion-icon v-if="row.JENISKELAMIN=='P'" size="large" style="color:#e91e8c"
                                            name="woman-sharp"></ion-icon>
                                        <ion-icon v-if="row.JENISKELAMIN=='L'" size="large" style="color:#1565c0"
                                            name="man-sharp"></ion-icon>
                                    </td>
                                    <td class="align-middle">
                                        <div class="pasien-nama"># {{ row.NOMR }} — {{ row.DATA_SINGKAT }}</div>
                                        <small>{{ row.USIA_PASIEN.tahun }} Thn, {{ row.USIA_PASIEN.bulan }} Bln,
                                            {{ row.USIA_PASIEN.hari }} Hr</small>
                                        <span class="usia-kelompok-pill ml-1"
                                            :class="'usia-kelompok-' + getKelompokUsia(row).toLowerCase()">
                                            {{ getKelompokUsia(row) }}
                                        </span>
                                        <div class="pasien-dokter">{{ row.NAMADOKTER }}</div>

                                        <div v-if="row.HASIL_TRIASE" class="mt-1">
                                            <Tag :severity="triaseSeverity(row.HASIL_TRIASE)"
                                                :value="triaseBadgeLabel(row.HASIL_TRIASE)"
                                                :icon="triaseIcon(row.HASIL_TRIASE)" />
                                        </div>

                                        <div v-if="row.SIRIRAJ && row.SIRIRAJ.SKOR_AKIR"
                                            class="d-inline-block text-center border rounded p-1 bg-light mt-4 siriraj-clickable"
                                            @click="siriraj_score(row.NOPENDAFTARAN)"
                                            title="Klik untuk buka form Siriraj Score">
                                            <div class="badge badge-danger d-block mb-1">
                                                <i class="pi pi-external-link mr-1" style="font-size:.65rem"></i>
                                                Siriraj: {{ row.SIRIRAJ.SKOR_AKIR }}
                                            </div>
                                            <small class="text-uppercase font-weight-bold d-block text-truncate"
                                                style="max-width: 150px;">
                                                {{ row.SIRIRAJ.INTERPRETASI }}
                                            </small>
                                        </div>

                                        <div v-if="row.LAST_UPDATED" class="mt-2 text-muted">
                                            <i class="far fa-clock mr-1"></i>
                                            <span>Update terakhir: </span>
                                            <span class="font-weight-bold">{{ row.LAST_UPDATED }}</span>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <small class="text-muted">{{ row.ALAMAT }}</small>
                                    </td>
                                    <td class="align-middle">
                                        <span v-if="row.STATUS==0" class="badge badge-danger">Sedang Rawat</span>
                                        <span v-else class="badge badge-success">{{ row.KETERANGAN }}</span>
                                        <div v-if="row.KELUHAN_IGD" class="keluhan-box mt-1">
                                            <i class="fas fa-comment-medical mr-1 flex-shrink-0"></i>
                                            <span>
                                                <template
                                                    v-if="expandedKeluhan[row.NOPENDAFTARAN] || row.KELUHAN_IGD.length <= 100">{{ row.KELUHAN_IGD }}</template>
                                                <template v-else>{{ row.KELUHAN_IGD.slice(0, 100) }}...</template>
                                                <a v-if="row.KELUHAN_IGD.length > 100" href="#" class="keluhan-toggle"
                                                    @click.prevent="toggleKeluhan(row.NOPENDAFTARAN)">
                                                    {{ expandedKeluhan[row.NOPENDAFTARAN] ? ' Show less' : ' Show more...' }}
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div><strong>M:</strong> {{ row.MASUKPOLY_DISPLAY }}</div>
                                        <div v-if="getLOS(row)" class="los-badge mt-1" :class="getLOSClass(row)">
                                            <i class="pi pi-stopwatch mr-1"></i>{{ getLOS(row) }}
                                        </div>
                                        <div class="mt-1"><strong>K:</strong> {{ row.KELUARPOLY || '—' }}</div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <!-- <span class="los-value">{{ row.JLM_HARI_RAWAT }}</span>
                                        <div><small class="text-muted">hari</small></div> -->

                                        <!-- Notif Penunjang -->
                                        <div v-if="row.PENUNJANG && row.PENUNJANG.length" class="penunjang-list mt-1">
                                            <div v-for="(notif, ni) in row.PENUNJANG" :key="ni">
                                                <div v-for="(layanan, li) in notif.NAMA_LAYANAN.split(',')"
                                                    :key="ni+'-'+li" class="penunjang-item"
                                                    :class="notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C'  ? 'penunjang-selesai' : 'penunjang-menunggu'">
                                                    <span class="penunjang-dot"
                                                        :class="notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C'  ? 'dot-selesai' : 'dot-menunggu'">
                                                    </span>
                                                    <span class="penunjang-nama">{{ layanan.trim() }}</span>
                                                    <span class="penunjang-status">
                                                        —
                                                        {{ notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C' ? 'selesai' : 'menunggu' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <span class="cara-bayar-badge"
                                            :class="(row.KODECARABAYAR==27||row.KODECARABAYAR==28) ? 'cara-bayar-warning' : 'cara-bayar-normal'">
                                            <i class="pi pi-wallet mr-1"></i>{{ row.CARABAYAR }}
                                        </span>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="aksi-group">
                                            <button class="btn-aksi btn-aksi-info btn-sm" @click="showdetails(row)"
                                                title="Rekam Medis">
                                                <i class="pi pi-folder-open"></i> Rekam Medis
                                            </button>
                                            <button class="btn-aksi btn-aksi-warning btn-sm"
                                                @click="showInformConsent(row)" title="Persetujuan Pasien">
                                                <i class="pi pi-file"></i> Consent
                                            </button>
                                            <button class="btn-aksi btn-aksi-default btn-sm"
                                                @click="siriraj_score(row.NOPENDAFTARAN)" title="Siriraj Skor">
                                                <i class="pi pi-file-pdf"></i> Siriraj Skor
                                            </button>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <!-- <button class="btn-aksi btn-aksi-default btn-sm"
                                                @click="notify('warning', 'Data berhasil disimpan', 'Berhasil')" title="Siriraj Skor">
                                                <i class="pi pi-file-pdf"></i> Test</button> -->
                                        <template v-if="row.TELAH_VERIF==0">
                                            <span class="verif-badge" :class="'verif-aging-' + verifAging(row).level"
                                                :title="'Belum diverifikasi selama ' + verifAging(row).durasi">
                                                <i class="pi mr-1"
                                                    :class="verifAging(row).level === 'urgent' ? 'pi-exclamation-circle' : 'pi-clock'"></i>
                                                Belum Verif
                                                <span class="verif-durasi">{{ verifAging(row).durasi }}</span>
                                            </span>
                                        </template>
                                        <span v-if="row.TELAH_VERIF==1" class="verif-badge verif-sudah">
                                            <i class="pi pi-check-circle mr-1"></i>Telah Verif
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Mobile: card layout (tampil di layar < md) -->
                    <div class="d-md-none">
                        <div v-if="factFiltered.length === 0" class="text-center text-muted py-5">
                            <i class="pi pi-inbox" style="font-size:2rem;opacity:.35"></i>
                            <div class="mt-2">Data tidak ditemukan.</div>
                        </div>
                        <div v-for="(row, k) in factFiltered" :key="'m-' + row.NOPENDAFTARAN" class="igd-card"
                            :class="{'igd-card-waiting': row.KODECARABAYAR==27 || row.KODECARABAYAR==28}">

                            <!-- Header kartu -->
                            <div class="igd-card-header">
                                <div class="d-flex align-items-start" style="gap:8px">
                                    <span class="row-number flex-shrink-0 mt-1">{{ k + 1 }}</span>
                                    <div class="flex-shrink-0">
                                        <ion-icon v-if="row.JENISKELAMIN=='P'" size="large" style="color:#e91e8c"
                                            name="woman-sharp"></ion-icon>
                                        <ion-icon v-if="row.JENISKELAMIN=='L'" size="large" style="color:#1565c0"
                                            name="man-sharp"></ion-icon>
                                    </div>
                                    <div class="flex-grow-1" style="min-width:0">
                                        <div class="pasien-nama" style="font-size:0.9rem"># {{ row.NOMR }} —
                                            {{ row.DATA_SINGKAT }}</div>
                                        <div class="d-flex flex-wrap align-items-center" style="gap:4px;margin-top:3px">
                                            <small>{{ row.USIA_PASIEN.tahun }} Thn, {{ row.USIA_PASIEN.bulan }}
                                                Bln</small>
                                            <span class="usia-kelompok-pill"
                                                :class="'usia-kelompok-' + getKelompokUsia(row).toLowerCase()">{{ getKelompokUsia(row) }}</span>
                                            <span v-if="row.KLL==1" class="badge badge-danger"
                                                title="Kecelakaan Lalu Lintas">KLL</span>
                                        </div>
                                        <div class="pasien-dokter" style="font-size:0.8rem;margin-top:2px">
                                            {{ row.NAMADOKTER }}</div>
                                    </div>
                                    <!-- Triase + Verif di pojok kanan -->
                                    <div class="d-flex flex-column align-items-end flex-shrink-0" style="gap:4px">
                                        <Tag v-if="row.HASIL_TRIASE"
                                            :severity="triaseSeverity(row.HASIL_TRIASE)"
                                            :value="triaseBadgeLabel(row.HASIL_TRIASE)"
                                            :icon="triaseIcon(row.HASIL_TRIASE)"
                                            style="font-size:0.68rem" />
                                        <template v-if="row.TELAH_VERIF==0">
                                            <span class="verif-badge" style="font-size:0.68rem"
                                                :class="'verif-aging-' + verifAging(row).level">
                                                <i class="pi mr-1"
                                                    :class="verifAging(row).level==='urgent' ? 'pi-exclamation-circle' : 'pi-clock'"></i>
                                                Belum Verif <span
                                                    class="verif-durasi">{{ verifAging(row).durasi }}</span>
                                            </span>
                                        </template>
                                        <span v-if="row.TELAH_VERIF==1" class="verif-badge verif-sudah"
                                            style="font-size:0.68rem">
                                            <i class="pi pi-check-circle mr-1"></i>Telah Verif
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Body kartu -->
                            <div class="igd-card-body">
                                <!-- Status rawat + Cara bayar -->
                                <div class="igd-card-row">
                                    <div>
                                        <span v-if="row.STATUS==0" class="badge badge-danger">Sedang Rawat</span>
                                        <span v-else class="badge badge-success">{{ row.KETERANGAN }}</span>
                                    </div>
                                    <div>
                                        <span class="cara-bayar-badge"
                                            :class="(row.KODECARABAYAR==27||row.KODECARABAYAR==28) ? 'cara-bayar-warning' : 'cara-bayar-normal'">
                                            <i class="pi pi-wallet mr-1"></i>{{ row.CARABAYAR }}
                                        </span>
                                    </div>
                                </div>
                                <!-- Tgl Masuk + LOS + Keluar -->
                                <div class="igd-card-row">
                                    <div>
                                        <small><strong>M:</strong> {{ row.MASUKPOLY_DISPLAY }}</small>
                                        <div v-if="getLOS(row)" class="los-badge mt-1" :class="getLOSClass(row)">
                                            <i class="pi pi-stopwatch mr-1"></i>{{ getLOS(row) }}
                                        </div>
                                    </div>
                                    <small v-if="row.KELUARPOLY" class="text-muted"><strong>K:</strong>
                                        {{ row.KELUARPOLY }}</small>
                                </div>
                                <!-- Alamat (tidak terpotong di mobile) -->
                                <div v-if="row.ALAMAT" class="igd-card-row">
                                    <small class="text-muted"><i
                                            class="pi pi-map-marker mr-1"></i>{{ row.ALAMAT }}</small>
                                </div>
                                <!-- Keluhan dengan show more -->
                                <div v-if="row.KELUHAN_IGD" class="keluhan-box">
                                    <i class="fas fa-comment-medical mr-1 flex-shrink-0"></i>
                                    <span>
                                        <template
                                            v-if="expandedKeluhan[row.NOPENDAFTARAN] || row.KELUHAN_IGD.length <= 100">{{ row.KELUHAN_IGD }}</template>
                                        <template v-else>{{ row.KELUHAN_IGD.slice(0, 100) }}...</template>
                                        <a v-if="row.KELUHAN_IGD.length > 100" href="#" class="keluhan-toggle"
                                            @click.prevent="toggleKeluhan(row.NOPENDAFTARAN)">
                                            {{ expandedKeluhan[row.NOPENDAFTARAN] ? ' Show less' : ' Show more...' }}
                                        </a>
                                    </span>
                                </div>
                                <!-- Penunjang -->
                                <div v-if="row.PENUNJANG && row.PENUNJANG.length" class="penunjang-list">
                                    <div v-for="(notif, ni) in row.PENUNJANG" :key="ni">
                                        <div v-for="(layanan, li) in notif.NAMA_LAYANAN.split(',')" :key="ni+'-'+li"
                                            class="penunjang-item"
                                            :class="notif.STATUS_PROGRESS==='P'||notif.STATUS_PROGRESS==='C' ? 'penunjang-selesai' : 'penunjang-menunggu'">
                                            <span class="penunjang-dot"
                                                :class="notif.STATUS_PROGRESS==='P'||notif.STATUS_PROGRESS==='C' ? 'dot-selesai' : 'dot-menunggu'"></span>
                                            <span class="penunjang-nama">{{ layanan.trim() }}</span>
                                            <span class="penunjang-status">—
                                                {{ notif.STATUS_PROGRESS==='P'||notif.STATUS_PROGRESS==='C' ? 'selesai' : 'menunggu' }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- Siriraj Score -->
                                <div v-if="row.SIRIRAJ && row.SIRIRAJ.SKOR_AKIR" class="mt-1">
                                    <span class="badge badge-danger siriraj-clickable px-2 py-1"
                                        @click="siriraj_score(row.NOPENDAFTARAN)">
                                        <i class="pi pi-external-link mr-1"></i>
                                        Siriraj: {{ row.SIRIRAJ.SKOR_AKIR }} — {{ row.SIRIRAJ.INTERPRETASI }}
                                    </span>
                                </div>
                            </div>

                            <!-- Footer kartu: tombol aksi -->
                            <div class="igd-card-footer">
                                <button class="btn-aksi btn-aksi-info" @click="showdetails(row)">
                                    <i class="pi pi-folder-open"></i> Rekam Medis
                                </button>
                                <button class="btn-aksi btn-aksi-warning" @click="showInformConsent(row)">
                                    <i class="pi pi-file"></i> Consent
                                </button>
                                <button class="btn-aksi btn-aksi-default" @click="siriraj_score(row.NOPENDAFTARAN)">
                                    <i class="pi pi-file-pdf"></i> Siriraj Skor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import {
        EventBus
    } from '../bus';
    import ProgressBar from 'primevue/progressbar';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import ConfirmDialog from 'primevue/confirmdialog';

    export default {
        components: {
            Loading,
            Tabs,
            TabList,
            Tab,
            TabPanels,
            TabPanel,
            ProgressBar,
            ConfirmDialog
        },
        props: {
            msg: String
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    mode: 'history15',
                    kodeunit: '',
                    norm: '',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
                    ruangan_tujuan_transfer: null,
                    old_ruangan: 0,
                    id_ruangan: 0,
                    noregister: ''
                },

                int_kd_ruangan_user: null,
                isLoading: false,
                fullPage: true,
                visibleFull: false,
                displayBasic2: false,
                form_pindahruang: false,
                namaruagan_asal: null,
                details_pasien: {},
                ruangan: [],
                dataruangan_realtime: [],
                kode_unit_login: null,
                splitParts_kode_unit: [],
                characterFound: false,
                showmessage: false,
                InformConsent: false,
                list_notif_penunjang: [],
                searchNama: '',
                filterTriase: 'SEMUA',
                filterUsia: 'SEMUA',
                filterDokter: 'SEMUA',
                dokterScrollShowLeft: false,
                dokterScrollShowRight: false,
                expandedKeluhan: {},
                now: Date.now(),
                _losTimer: null,
                showLaporanDokter: false,
                laporan: {
                    list: [],
                    loading: false,
                    tanggal: new Date().toISOString().slice(0, 10),
                    tanggalObj: new Date(),
                    keyword: '',
                    filterVerif: null,
                    activeTab: 'detail'
                },
                laporanVerifOptions: [{
                        label: 'Sudah Diverifikasi',
                        value: '1'
                    },
                    {
                        label: 'Belum Diverifikasi',
                        value: '0'
                    },
                ]
            };
        },
        computed: {
            factFiltered() {
                let filtered = this.fact || [];

                if (this.searchNama && this.searchNama.trim()) {
                    const keyword = this.searchNama.trim().toLowerCase();
                    filtered = filtered.filter(row => {
                        return [
                            row.NAMAPASIEN,
                            row.DATA_SINGKAT,
                            row.NOMR,
                            row.NAMADOKTER,
                        ].some(val => String(val || '').toLowerCase().includes(keyword));
                    });
                }

                if (this.filterTriase !== 'SEMUA') {
                    filtered = filtered.filter(row => row.HASIL_TRIASE === this.filterTriase);
                }

                if (this.filterUsia !== 'SEMUA') {
                    filtered = filtered.filter(row => this.getKelompokUsia(row) === this.filterUsia);
                }

                if (this.filterDokter !== 'SEMUA') {
                    filtered = filtered.filter(row => (row.NAMADOKTER || '') === this.filterDokter);
                }

                return filtered;
            },
            penunjangMap() {
                const map = {};
                (this.list_notif_penunjang || []).forEach(n => {
                    const key = String(n.NOREGISTER).trim();
                    if (!map[key]) map[key] = [];
                    map[key].push(n);
                });
                return map;
            },
            triaseStats() {
                const stats = {
                    EMERGENSI: 0,
                    URGENT: 0,
                    'NON URGENT': 0,
                    'DEATH ON ARRIVAL': 0,
                    LAINNYA: 0,
                    TOTAL: 0
                };

                if (this.fact) {
                    stats.TOTAL = this.fact.length;
                    this.fact.forEach(row => {
                        if (row.HASIL_TRIASE === 'EMERGENSI') stats.EMERGENSI++;
                        else if (row.HASIL_TRIASE === 'URGENT') stats.URGENT++;
                        else if (row.HASIL_TRIASE === 'NON URGENT') stats['NON URGENT']++;
                        else if (row.HASIL_TRIASE === 'DEATH ON ARRIVAL') stats['DEATH ON ARRIVAL']++;
                        else stats.LAINNYA++;
                    });
                }
                return stats;
            },
            usiaStats() {
                const stats = {
                    BAYI: 0,
                    BALITA: 0,
                    REMAJA: 0,
                    DEWASA: 0,
                    LANSIA: 0
                };
                (this.fact || []).forEach(row => {
                    const grp = this.getKelompokUsia(row);
                    if (stats[grp] !== undefined) stats[grp]++;
                });
                return stats;
            },
            daftarDokter() {
                const map = {};
                (this.fact || []).forEach(row => {
                    const nama = (row.NAMADOKTER || '').trim();
                    if (!nama) return;
                    if (!map[nama]) map[nama] = 0;
                    map[nama]++;
                });
                return Object.entries(map)
                    .map(([nama, jumlah]) => ({
                        nama,
                        jumlah
                    }))
                    .sort((a, b) => a.nama.localeCompare(b.nama));
            },
            laporanFiltered() {
                let data = this.laporan.list;
                const kw = (this.laporan.keyword || '').toLowerCase().trim();
                if (kw) {
                    data = data.filter(d =>
                        (d.NOMR || '').toLowerCase().includes(kw) ||
                        (d.NAMAPASIEN || '').toLowerCase().includes(kw) ||
                        (d.dpjp || '').toLowerCase().includes(kw) ||
                        (d.keterangan || '').toLowerCase().includes(kw)
                    );
                }
                if (this.laporan.filterVerif !== null && this.laporan.filterVerif !== undefined) {
                    data = data.filter(d => d.telah_verif === this.laporan.filterVerif);
                }
                return data;
            },
            laporanSummary() {
                const map = {};
                this.laporan.list.forEach(p => {
                    const key = p.dpjp || '(Tidak Diisi)';
                    if (!map[key]) map[key] = {
                        dpjp: key,
                        total: 0,
                        verif: 0,
                        belum: 0
                    };
                    map[key].total++;
                    if (p.telah_verif === '1') map[key].verif++;
                    else map[key].belum++;
                });
                return Object.values(map)
                    .map(d => ({
                        ...d,
                        persen: d.total > 0 ? Math.round((d.verif / d.total) * 100) : 0
                    }))
                    .sort((a, b) => b.total - a.total);
            },
            laporanJumlahVerif() {
                return this.laporan.list.filter(function (x) {
                    return x.telah_verif === '1';
                }).length;
            },
            laporanJumlahBelumVerif() {
                return this.laporan.list.filter(function (x) {
                    return x.telah_verif !== '1';
                }).length;
            },
            laporanPersenVerif() {
                if (!this.laporan.list.length) return 0;
                return Math.round((this.laporanJumlahVerif / this.laporan.list.length) * 100);
            }
        },
        watch: {
            daftarDokter() {
                this.$nextTick(() => this.checkDokterScroll());
            }
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this._losTimer = setInterval(() => {
                this.now = Date.now();
            }, 60000);
            this.$nextTick(() => {
                this.checkDokterScroll();
                const noregister = new URLSearchParams(window.location.search).get('noregister');
                if (noregister) this.autoOpenByNoregister(noregister);
            });
        },
        beforeUnmount() {
            if (this._losTimer) clearInterval(this._losTimer);
        },
        async created() {
            this.form.startdate = new Date();
            await this.getnamaruangan_poli();
            this.getdata_pasien(6);
        },
        methods: {
            checkDokterScroll() {
                const el = this.$refs.dokterScroll;
                if (!el) return;
                this.dokterScrollShowLeft = el.scrollLeft > 0;
                this.dokterScrollShowRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
            },
            onDokterScroll() {
                this.checkDokterScroll();
            },
            scrollDokter(dir) {
                const el = this.$refs.dokterScroll;
                if (!el) return;
                el.scrollBy({
                    left: dir === 'left' ? -200 : 200,
                    behavior: 'smooth'
                });
            },
            onLaporanDateSelect(date) {
                const d = new Date(date);
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                this.laporan.tanggal = `${yyyy}-${mm}-${dd}`;
            },
            buka_laporan_dokter() {
                this.showLaporanDokter = true;
                this.fetchLaporanDokter();
            },
            resetLaporanFilter() {
                this.laporan.tanggal = new Date().toISOString().slice(0, 10);
                this.laporan.tanggalObj = new Date();
                this.laporan.keyword = '';
                this.laporan.filterVerif = null;
                this.fetchLaporanDokter();
            },
            async fetchLaporanDokter() {
                this.laporan.loading = true;
                this.laporan.list = [];
                try {
                    const response = await axios.post('/get_triase_by_tanggal', {
                        tanggal: this.laporan.tanggal
                    });
                    this.laporan.list = Array.isArray(response.data.response) ? response.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.laporan.loading = false;
                }
            },
            laporanRowClass(data) {
                return data.telah_verif === '1' ? 'laporan-row-verified' : 'laporan-row-pending';
            },
            notify(type, message, title = '') {
                EventBus.$emit('show-alert', {
                    type,
                    title,
                    message
                });
            },
            onDokterDikonfirmasi(data) {
                this.details_pasien.NAMADOKTER = data.NAMADOKTER;
                this.details_pasien.KDDOKTER = data.KDDOKTER;
                this.details_pasien.KONFIRMASI_PS_SAYA = data.KONFIRMASI_PS_SAYA;

                const idx = this.fact.findIndex(r => r.NOPENDAFTARAN === this.details_pasien.NOPENDAFTARAN);
                if (idx !== -1) {
                    this.fact[idx] = {
                        ...this.fact[idx],
                        NAMADOKTER: data.NAMADOKTER,
                        KDDOKTER: data.KDDOKTER,
                        KONFIRMASI_PS_SAYA: data.KONFIRMASI_PS_SAYA
                    };
                }
            },
            async autoOpenByNoregister(noregister) {
                try {
                    const today = new Date();
                    const tglawal = new Date(today);
                    tglawal.setDate(tglawal.getDate() - 1);
                    const response = await axios.post('/getpasien_api', {
                        noregister,
                        mode: 1,
                        kodeunit: '',
                        startdate: tglawal,
                        enddate: today,
                        jenis_rawat: '',
                    });
                    const list = response.data?.response || [];
                    const pasien = list.find(p => String(p.NOPENDAFTARAN).trim() === String(noregister).trim());
                    if (pasien) this.showdetails(pasien);
                } catch (e) {
                    console.warn('autoOpenByNoregister gagal:', e);
                }
            },
            showdetails(pasien) {
                if (this.displayBasic2) {
                    this.displayBasic2 = false;
                    this.$nextTick(() => {
                        this.details_pasien = pasien;
                        this.displayBasic2 = true;
                    });
                } else {
                    this.details_pasien = pasien;
                    this.displayBasic2 = true;
                }
            },
            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            showInformConsent(data) {
                this.details_pasien = data;
                this.InformConsent = true;
            },
            toggleKeluhan(nopendaftaran) {
                this.expandedKeluhan = {
                    ...this.expandedKeluhan,
                    [nopendaftaran]: !this.expandedKeluhan[nopendaftaran]
                };
            },
            pilihtanggal(event) {
                this.filterDokter = 'SEMUA';
                this.getdata_pasien(6);
            },
            async getnamaruangan_poli() {
                this.form.mode = 0;
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        this.ruangan = response.data;

                        const igd = this.ruangan.find(n => n.KODE_BPJS === 'IGD');
                        if (igd) {
                            this.form.kodeunit = igd.KODE;
                        }
                    })
                    .catch(e => console.log(e))
                    .finally(() => this.isLoading = false);
            },
            siriraj_score(noregister) {
                window.open('/siriraj-score/' + noregister, '_blank');
            },
            triaseBadgeClass(nilai) {
                const map = {
                    'EMERGENSI': 'triase-bg-emergensi',
                    'URGENT': 'triase-bg-urgent',
                    'NON URGENT': 'triase-bg-nonurgent',
                    'DEATH ON ARRIVAL': 'triase-bg-doa'
                };
                return map[nilai] || 'triase-bg-default';
            },
            triaseBadgeIcon(nilai) {
                const map = {
                    'EMERGENSI': 'fas fa-exclamation-triangle',
                    'URGENT': 'fas fa-clock',
                    'NON URGENT': 'fas fa-check-circle',
                    'DEATH ON ARRIVAL': 'fas fa-times-circle'
                };
                return map[nilai] || 'fas fa-question-circle';
            },
            triaseBadgeLabel(nilai) {
                const map = {
                    'EMERGENSI': 'Emergensi',
                    'URGENT': 'Urgent',
                    'NON URGENT': 'Non Urgent',
                    'DEATH ON ARRIVAL': 'Death on Arrival'
                };
                return map[nilai] || nilai;
            },
            triaseSeverity(nilai) {
                const map = {
                    'EMERGENSI': 'danger',
                    'URGENT': 'warn',
                    'NON URGENT': 'success',
                    'DEATH ON ARRIVAL': 'secondary'
                };
                return map[nilai] || 'secondary';
            },
            triaseIcon(nilai) {
                const map = {
                    'EMERGENSI': 'pi pi-exclamation-triangle',
                    'URGENT': 'pi pi-clock',
                    'NON URGENT': 'pi pi-check-circle',
                    'DEATH ON ARRIVAL': 'pi pi-times-circle'
                };
                return map[nilai] || 'pi pi-question-circle';
            },
            getKelompokUsia(row) {
                const tahun = (row.USIA_PASIEN && row.USIA_PASIEN.tahun != null) ? Number(row.USIA_PASIEN.tahun) : 0;
                if (tahun < 1) return 'BAYI';
                if (tahun < 5) return 'BALITA';
                if (tahun < 18) return 'REMAJA';
                if (tahun < 60) return 'DEWASA';
                return 'LANSIA';
            },
            usiaFilterBadgeClass(grp) {
                const map = {
                    BAYI: 'badge-pink',
                    BALITA: 'badge-info',
                    REMAJA: 'badge-teal',
                    DEWASA: 'badge-warning',
                    LANSIA: 'badge-secondary'
                };
                return map[grp] || 'badge-secondary';
            },
            _masukMenit(row) {
                if (!row.MASUKPOLY_DISPLAY) return null;
                const m = row.MASUKPOLY_DISPLAY.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})/);
                if (!m) return null;
                const [, dd, mm, yyyy, hh, min] = m;
                const masuk = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min));
                const diffMs = this.now - masuk;
                return diffMs < 0 ? null : Math.floor(diffMs / 60000);
            },
            getLOS(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return null;
                const h = Math.floor(totalMins / 60);
                const mi = totalMins % 60;
                return h > 0 ? `${h}j ${mi}m` : `${mi}m`;
            },
            getLOSClass(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return 'los-normal';
                if (totalMins >= 360) return 'los-danger';
                if (totalMins >= 120) return 'los-warning';
                return 'los-normal';
            },
            verifAging(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return {
                    level: 'fresh',
                    durasi: ''
                };
                const h = Math.floor(totalMins / 60);
                const mi = totalMins % 60;
                const durasi = h > 0 ? `${h}j ${mi}m` : `${mi}m`;
                if (totalMins < 60) return {
                    level: 'fresh',
                    durasi
                };
                if (totalMins < 120) return {
                    level: 'warning',
                    durasi
                };
                return {
                    level: 'urgent',
                    durasi
                };
            },
            triasePillKey(nilai) {
                const map = {
                    'EMERGENSI': 'emergensi',
                    'URGENT': 'urgent',
                    'NON URGENT': 'nonurgent',
                    'DEATH ON ARRIVAL': 'doa'
                };
                return map[nilai] || 'default';
            },
            async getdata_pasien(mode) {
                this.fact = [];
                this.searchNama = '';
                this.filterTriase = 'SEMUA';
                this.filterUsia = 'SEMUA';
                this.form.mode = mode;
                this.form.jenis_rawat = 'JALAN';
                this.form.kodeunit = 'IGD';
                this.isLoading = true;

                try {
                    const response = await axios.post('/getpasien_api', this.form);
 
                    this.fact = response.data.response || [];
                    this.get_notif_penunjang_json();
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            },
            async get_notif_penunjang_json() {
                try {
                    const tglawal = this.form.startdate;
                    this.form.mode = 6;

                    const kode_unit = this.ruangan.filter(n => n.KODE_BPJS == 'IGD');
                    if (kode_unit.length > 0) {
                        this.form.kodeunit = kode_unit[0].KODE;
                    }

                    const response = await axios.post('/get_notif_penunjang_json', this.form);
                    const results = response.data.results || [];
                    this.list_notif_penunjang = results;

                    this.fact = this.fact.map(row => {
                        const noReg = String(row.NOPENDAFTARAN).trim();
                        const matched = results.filter(n => {
                            const noPenunjang = String(n.NOREGISTER).trim();
                            return noPenunjang === noReg ||
                                noPenunjang.includes(noReg) ||
                                noReg.includes(noPenunjang);
                        });
                        return {
                            ...row,
                            PENUNJANG: matched
                        };
                    });
                } catch (error) {
                    console.error('get_notif_penunjang_json:', error);
                }
            }
        }
    }

</script>
<style scoped>
    /* jangan muncul di tengah area konten */
    /* .p-dialog {
    margin-left: 250px !important;
} */
    body.sidebar-collapse .p-dialog,
    body.sidebar-mini.sidebar-collapse .p-dialog {
        margin-left: 60px !important;
    }

    /* Dialog yang sudah punya posisi sendiri (nested/otorisasi) jangan digeser */
    /* .p-dialog .p-dialog {
    margin-left: 0 !important;
} */

</style>

<style scoped>
    .filter-label {
        display: block;
        font-weight: 600;
        color: #555;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: .04em;
        font-size: 0.85rem;
    }

    /* ===== TABLE ===== */
    .igd-table thead th {
        background: #f8f9fa;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .05em;
        white-space: nowrap;
        vertical-align: middle;
        border-color: #dee2e6 !important;
        font-size: 0.85rem;
    }

    .igd-table tbody tr:hover {
        background: #e3f2fd !important;
    }

    .igd-table td {
        vertical-align: middle;
        border-color: #dee2e6 !important;
    }

    .row-waiting {
        background: #fff8e1 !important;
    }

    .row-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #e3f2fd;
        color: #1565c0;
        font-weight: 700;
    }

    .keluhan-box {
        display: flex;
        align-items: flex-start;
        gap: 5px;
        background: #fff8e1;
        border: 1px solid #ffe082;
        border-radius: 6px;
        padding: 4px 8px;
        color: #795548;
        max-width: 220px;
    }

    .keluhan-box i {
        color: #f57c00;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .keluhan-box span {
        line-height: 1.4;
    }

    .pasien-nama {
        font-weight: 700;
        color: #1a1a2e;
    }

    .pasien-dokter {
        color: #1976d2;
        font-weight: 500;
    }

    .los-value {
        font-weight: 700;
        color: #1565c0;
    }

    .cara-bayar-badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 20px;
        font-weight: 600;
        white-space: nowrap;
    }

    .cara-bayar-warning {
        background: #ffebee;
        color: #b71c1c;
        border: 1px solid #ef9a9a;
    }

    .cara-bayar-normal {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }

    .aksi-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .btn-aksi {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 7px;
        border-radius: 4px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        transition: opacity .15s;
    }

    .btn-aksi:hover {
        opacity: .82;
    }

    .btn-aksi-info {
        background: #1976d2;
        color: #fff;
    }

    .btn-aksi-warning {
        background: #f57c00;
        color: #fff;
    }

    .btn-aksi-default {
        background: #546e7a;
        color: #fff;
    }

    .verif-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
        white-space: nowrap;
    }

    /* Aging levels untuk Belum Verif */
    .verif-aging-fresh {
        background: #fff8e1;
        color: #e65100;
        border: 1px solid #ffe082;
    }

    .verif-aging-warning {
        background: #fff3e0;
        color: #bf360c;
        border: 1px solid #ff8a65;
    }

    .verif-aging-urgent {
        background: #ffebee;
        color: #b71c1c;
        border: 1px solid #ef9a9a;
        animation: pulse-urgent 2s ease-in-out infinite;
    }

    @keyframes pulse-urgent {

        0%,
        100% {
            box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.35);
        }

        50% {
            box-shadow: 0 0 0 5px rgba(183, 28, 28, 0);
        }
    }

    .verif-durasi {
        display: inline-block;
        margin-left: 4px;
        font-size: 0.7rem;
        font-weight: 700;
        opacity: 0.85;
    }

    .verif-sudah {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }

    .siriraj-clickable {
        cursor: pointer;
        transition: transform .1s;
    }

    .siriraj-clickable:hover {
        transform: translateY(-1px);
        border-color: #c62828 !important;
    }

    .triase-badge-hasil {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 4px;
        font-weight: 700;
        white-space: nowrap;
    }

    .triase-bg-emergensi {
        background: #c62828;
        color: #fff;
    }

    .triase-bg-urgent {
        background: #f57c00;
        color: #fff;
    }

    .triase-bg-nonurgent {
        background: #2e7d32;
        color: #fff;
    }

    .triase-bg-doa {
        background: #212121;
        color: #fff;
    }

    .triase-bg-default {
        background: #607d8b;
        color: #fff;
    }

    /* ===== TRIASE PILL (seperti badge Action) ===== */
    .triase-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 10px 3px 6px;
        border-radius: 20px;
        font-weight: 600;
        white-space: nowrap;
        border: 1.5px solid transparent;
    }

    .triase-pill-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    /* Emergensi — merah */
    .triase-pill-emergensi {
        background: #fff0f0;
        color: #c62828;
        border-color: #ef9a9a;
    }

    .triase-pill-emergensi .triase-pill-dot {
        background: #e53935;
    }

    /* Urgent — oranye */
    .triase-pill-urgent {
        background: #fff8f0;
        color: #e65100;
        border-color: #ffcc80;
    }

    .triase-pill-urgent .triase-pill-dot {
        background: #fb8c00;
    }

    /* Non Urgent — hijau */
    .triase-pill-nonurgent {
        background: #f0fff4;
        color: #2e7d32;
        border-color: #a5d6a7;
    }

    .triase-pill-nonurgent .triase-pill-dot {
        background: #43a047;
    }

    /* Death on Arrival — abu gelap */
    .triase-pill-doa {
        background: #f5f5f5;
        color: #424242;
        border-color: #bdbdbd;
    }

    .triase-pill-doa .triase-pill-dot {
        background: #616161;
    }

    /* ===== NOTIF PENUNJANG ===== */
    .penunjang-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .penunjang-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #dee2e6;
        background: #f8f9fa;
        color: #495057;
        max-width: 200px;
        overflow: hidden;
    }

    .penunjang-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    /* FIX: blink di dot-menunggu (pending), bukan selesai */
    .dot-menunggu {
        background: #adb5bd;
        animation: blink-dot 1.5s ease-in-out infinite;
    }

    .dot-selesai {
        background: #28a745;
    }

    @keyframes blink-dot {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.2;
        }
    }

    .penunjang-nama {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    .penunjang-status {
        color: #adb5bd;
        flex-shrink: 0;
    }

    .penunjang-selesai {
        border-color: #c3e6cb;
        background: #f0fff4;
    }

    .penunjang-selesai .penunjang-status {
        color: #28a745;
    }

    .penunjang-menunggu {
        border-color: #dee2e6;
        background: #f8f9fa;
    }

    .penunjang-menunggu .penunjang-status {
        color: #adb5bd;
    }

    /* ===== KELUHAN SHOW MORE ===== */
    .keluhan-toggle {
        display: inline;
        color: #1976d2;
        font-size: 0.75rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
    }

    .keluhan-toggle:hover {
        text-decoration: underline;
    }

    /* ===== SUMMARY PANEL KANAN ===== */
    .summary-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-left: 12px;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        border-radius: 6px;
        border: 1px solid transparent;
    }

    .summary-label {
        font-weight: 600;
        font-size: 0.875rem;
    }

    .summary-count {
        font-size: 1.1rem;
        font-weight: 700;
    }

    .bg-danger-light {
        background: #ffebee;
        color: #b71c1c;
        border-color: #ef9a9a;
    }

    .bg-warning-light {
        background: #fff8e1;
        color: #e65100;
        border-color: #ffe082;
    }

    .bg-success-light {
        background: #e8f5e9;
        color: #2e7d32;
        border-color: #a5d6a7;
    }

    .bg-dark-light {
        background: #f5f5f5;
        color: #424242;
        border-color: #bdbdbd;
    }

    .bg-secondary-light {
        background: #eceff1;
        color: #37474f;
        border-color: #b0bec5;
    }

    /* ===== FILTER DOKTER ===== */
    .filter-dokter-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .filter-dokter-scroll {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 6px;
        padding-bottom: 4px;
        -webkit-overflow-scrolling: touch;
        flex: 1;
        min-width: 0;
        scrollbar-width: none;
    }

    .filter-dokter-scroll::-webkit-scrollbar {
        display: none;
    }

    .dokter-scroll-arrow {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border: 1.5px solid #90a4ae;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #546e7a;
        padding: 0;
        transition: background 0.15s, color 0.15s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12);
        z-index: 1;
    }

    .dokter-scroll-arrow:hover {
        background: #546e7a;
        color: #fff;
        border-color: #546e7a;
    }

    .dokter-scroll-arrow-left {
        margin-right: 4px;
    }

    .dokter-scroll-arrow-right {
        margin-left: 4px;
    }

    .btn-dokter {
        background: transparent;
        border: 1.5px solid #90a4ae;
        color: #546e7a;
        border-radius: 20px;
        white-space: nowrap;
        flex-shrink: 0;
        transition: all .15s;
        font-size: 0.8rem;
    }

    .btn-dokter:hover {
        background: #eceff1;
        border-color: #546e7a;
        color: #263238;
    }

    .btn-dokter-active {
        background: #1565c0;
        border-color: #1565c0;
        color: #fff !important;
    }

    .btn-dokter-active:hover {
        background: #0d47a1;
        border-color: #0d47a1;
    }

    /* ===== USIA BUTTON FILTER ===== */
    .btn-usia-bayi {
        background: #c2185b;
        border-color: #c2185b;
        color: #fff;
    }

    .btn-usia-bayi:hover {
        background: #ad1457;
        border-color: #ad1457;
        color: #fff;
    }

    .btn-outline-usia-bayi {
        background: transparent;
        border-color: #c2185b;
        color: #c2185b;
    }

    .btn-outline-usia-bayi:hover {
        background: #fce4ec;
    }

    .btn-usia-balita {
        background: #1565c0;
        border-color: #1565c0;
        color: #fff;
    }

    .btn-usia-balita:hover {
        background: #0d47a1;
        border-color: #0d47a1;
        color: #fff;
    }

    .btn-outline-usia-balita {
        background: transparent;
        border-color: #1565c0;
        color: #1565c0;
    }

    .btn-outline-usia-balita:hover {
        background: #e3f2fd;
    }

    .btn-usia-remaja {
        background: #00695c;
        border-color: #00695c;
        color: #fff;
    }

    .btn-usia-remaja:hover {
        background: #004d40;
        border-color: #004d40;
        color: #fff;
    }

    .btn-outline-usia-remaja {
        background: transparent;
        border-color: #00695c;
        color: #00695c;
    }

    .btn-outline-usia-remaja:hover {
        background: #e0f2f1;
    }

    .btn-usia-dewasa {
        background: #e65100;
        border-color: #e65100;
        color: #fff;
    }

    .btn-usia-dewasa:hover {
        background: #bf360c;
        border-color: #bf360c;
        color: #fff;
    }

    .btn-outline-usia-dewasa {
        background: transparent;
        border-color: #e65100;
        color: #e65100;
    }

    .btn-outline-usia-dewasa:hover {
        background: #fff3e0;
    }

    .btn-usia-lansia {
        background: #4e342e;
        border-color: #4e342e;
        color: #fff;
    }

    .btn-usia-lansia:hover {
        background: #3e2723;
        border-color: #3e2723;
        color: #fff;
    }

    .btn-outline-usia-lansia {
        background: transparent;
        border-color: #4e342e;
        color: #4e342e;
    }

    .btn-outline-usia-lansia:hover {
        background: #efebe9;
    }

    /* ===== USIA KELOMPOK PILL (di baris pasien) ===== */
    .usia-kelompok-pill {
        display: inline-block;
        padding: 1px 7px;
        border-radius: 10px;
        font-size: 0.6rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .04em;
        vertical-align: middle;
    }

    .usia-kelompok-bayi {
        background: #fce4ec;
        color: #c2185b;
        border: 1px solid #f48fb1;
    }

    .usia-kelompok-balita {
        background: #e3f2fd;
        color: #1565c0;
        border: 1px solid #90caf9;
    }

    .usia-kelompok-remaja {
        background: #e0f2f1;
        color: #00695c;
        border: 1px solid #80cbc4;
    }

    .usia-kelompok-dewasa {
        background: #fff3e0;
        color: #e65100;
        border: 1px solid #ffcc80;
    }

    .usia-kelompok-lansia {
        background: #efebe9;
        color: #4e342e;
        border: 1px solid #bcaaa4;
    }

    .badge-pink {
        background: #c2185b;
        color: #fff;
    }

    .badge-teal {
        background: #00695c;
        color: #fff;
    }

    .laporan-row-pending td:first-child {
        border-left: 3px solid #f59e0b;
    }

    .laporan-row-verified td:first-child {
        border-left: 3px solid #28a745;
    }

    /* ===== LAPORAN STAT STRIP ===== */
    .lp-stat {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 5px 14px;
        border-radius: 20px;
        font-size: 12px;
        border: 1px solid transparent;
        white-space: nowrap;
    }

    .lp-stat-icon {
        font-size: 13px;
        flex-shrink: 0;
    }

    .lp-stat-num {
        font-weight: 700;
        font-size: 13px;
    }

    .lp-stat-lbl {
        font-size: 11px;
        opacity: .85;
    }

    .lp-stat-primary {
        background: #dbeafe;
        color: #1d4ed8;
        border-color: #93c5fd;
    }

    .lp-stat-success {
        background: #dcfce7;
        color: #166534;
        border-color: #86efac;
    }

    .lp-stat-warning {
        background: #fef9c3;
        color: #854d0e;
        border-color: #fde047;
    }

    .lp-stat-info {
        background: #e0f2fe;
        color: #075985;
        border-color: #7dd3fc;
    }

    /* ===== LOS BADGE ===== */
    .los-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 9px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.78rem;
        white-space: nowrap;
        border: 1px solid transparent;
    }

    .los-normal {
        background: #e3f2fd;
        color: #1565c0;
        border-color: #90caf9;
    }

    .los-warning {
        background: #fff3e0;
        color: #e65100;
        border-color: #ffcc80;
    }

    .los-danger {
        background: #ffebee;
        color: #b71c1c;
        border-color: #ef9a9a;
        animation: pulse-urgent 2.5s ease-in-out infinite;
    }

    /* ===== MOBILE CARD LAYOUT ===== */
    .igd-card {
        margin: 8px;
        background: #fff;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
    }

    .igd-card-waiting {
        border-color: #ffe082;
        background: #fffde7;
    }

    .igd-card-header {
        padding: 10px 12px;
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
    }

    .igd-card-body {
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 0.85rem;
    }

    .igd-card-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .igd-card-footer {
        padding: 8px 12px;
        background: #f8f9fa;
        border-top: 1px solid #e9ecef;
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    /* Penunjang item tidak terpotong di mobile */
    @media (max-width: 767px) {
        .penunjang-item {
            max-width: 100%;
        }

        .keluhan-box {
            max-width: 100%;
        }
    }

</style>
<!-- <style>
/* Dialog offset mengikuti sidebar AdminLTE */
.p-dialog-mask {
    left: 250px !important;
    width: calc(100vw - 250px) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}
body.sidebar-collapse .p-dialog-mask,
body.sidebar-mini.sidebar-collapse .p-dialog-mask {
    left: 60px !important;
    width: calc(100vw - 60px) !important;
}
</style> -->
