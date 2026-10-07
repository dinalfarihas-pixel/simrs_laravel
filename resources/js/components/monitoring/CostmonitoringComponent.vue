<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
           total pasien :  {{ totalPatients }}
            <!-- Search filters card with improved UI -->
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h3 class="card-title"><i class="pi pi-filter mr-2"></i>Filter Data Kunjungan Pasien</h3>
                </div>
                <div class="card-body d-flex flex-wrap align-items-center gap-3">
                    <div class="filter-group">
                        <label class="d-block mb-1 font-weight-bold text-sm">Tanggal Awal:</label>
                        <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                            dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                            aria-placeholder="Tanggal awal" style="width: 12em;" />
                    </div>
                    <div class="filter-group">
                        <label class="d-block mb-1 font-weight-bold text-sm">Tanggal Akhir:</label>
                        <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                            dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                            aria-placeholder="Tanggal akhir" style="width: 12em;" />
                    </div>
                    <div class="filter-group">
                        <label class="d-block mb-1 font-weight-bold text-sm">Jenis Rawat:</label>
                        <Select v-model="form.selectedJenisRawat" style="width: 10em;" :options="jenisRawat"
                            optionLabel="name" placeholder="Pilih jenis rawat" class="p-dropdown-sm" />
                    </div>

                    <div class="filter-group mt-4">
                        <Button label="Tampilkan" @click="fetchData()" icon="pi pi-search" class="p-button-primary" />

                    </div>
                </div>
            </div>

            <!-- Rekap Summary with improved UI -->
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h3 class="card-title mb-0"><i class="pi pi-chart-bar mr-2"></i>Rekap Data</h3>
                    <Button label="Export Excel" icon="pi pi-file-excel"
                        class="p-button-sm p-button-outlined p-button-light" />
                </div>

                <div class="card-body p-0">
                    <DataTable :value="recap" stripedRows sortMode="multiple" class="p-datatable-sm"
                        responsiveLayout="scroll">
                        <Column field="POLIRUANG" header="POLIRUANG" sortable>
                            <template #body="{ data }"><strong>{{ data.POLIRUANG }}</strong></template>
                        </Column>
                        <Column field="jumlah_ps" header="JML PASIEN" sortable
                            headerStyle="text-align:center" bodyStyle="text-align:center; font-weight:bold;">
                        </Column>
                        <Column field="OBATAN" header="OBAT-OBATAN" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.OBATAN)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.OBATAN) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="BMHP" header="BMHP" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.BMHP)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.BMHP) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="LABORATORIUM" header="LABORATORIUM" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.LABORATORIUM)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.LABORATORIUM) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="TENAGA_AHLI" header="TENAGA AHLI" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.TENAGA_AHLI)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.TENAGA_AHLI) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="KEPERAWATAN" header="KEPERAWATAN" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.KEPERAWATAN)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.KEPERAWATAN) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="RADIOLOGI" header="RADIOLOGI" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.RADIOLOGI)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.RADIOLOGI) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="AVG" header="AVG" sortable bodyStyle="text-align:right; font-weight:bold;">
                            <template #body="{ data }">{{ formatRupiah(data.AVG) }}</template>
                        </Column>
                        <Column field="TOTAL" header="TOTAL" sortable bodyStyle="text-align:right; font-weight:bold;">
                            <template #body="{ data }">{{ formatRupiah(data.TOTAL) }}</template>
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column footer="TOTAL" :footerStyle="{ 'font-weight': 'bold' }" />
                                <Column :footer="String(totalPatients)"
                                    :footerStyle="{ 'text-align': 'center', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalObatan)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalBMHP)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalLab)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalTenagaAhli)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalKeperawatan)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalRadiologi)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column footer="" />
                                <Column :footer="formatRupiah(grandTotal)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </div>

            <!-- Patient detail data with improved UI -->
            <div class="card shadow-sm">
                <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">

                    <div class="filter-group">
                        <Select v-model="form.dokterSelected" :filter="true" style="width: 20em;"
                            optionLabel="NAMADOKTER" :options="listDokter" placeholder="Pilih dokter"
                            filterPlaceholder="Filter by  dokter" />
                            <Button label="Reset" @click="resetFilters()" icon="pi pi-refresh"
                            class="p-button-secondary ml-2" />
                            <small v-if="filteredFact.length > 0" class="text-white mt-1">Menampilkan
                                {{ filteredFact.length }} data pasien</small>
                    </div>


                    <div class="d-flex align-items-center">
                        <div class="search-box mr-2">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <input type="text" v-model="searchQuery" class="p-inputtext p-component p-filled"
                                    placeholder="Cari pasien..." />
                            </span>
                        </div>
                    </div>
                    <div class="d-flex align-items-left">
                        <download-excel :data="exportDataFormatted" :fields="json_fields" name="data_pasien.xls">
                            <Button label="Download Excel" icon="pi pi-file-excel" class="p-button-success p-button-sm" />
                        </download-excel>
                    </div>
                </div>

                <div class="card-body p-0">
                    <DataTable :value="filteredFact" stripedRows sortMode="multiple" class="p-datatable-sm"
                        scrollable scrollHeight="600px" responsiveLayout="scroll">
                        <template #empty>
                            <div class="text-center py-5">
                                <i class="pi pi-search" style="font-size: 3rem; color: #ccc;"></i>
                                <h4 class="mt-3 text-muted">Tidak ada data yang ditemukan</h4>
                                <p class="text-muted">Silahkan ubah filter atau kata kunci pencarian</p>
                            </div>
                        </template>
                        <Column header="NO" headerStyle="text-align:center; width: 4rem;">
                            <template #body="{ index }">{{ index + 1 }}</template>
                        </Column>
                        <Column field="NOREGISTER" header="NOREGISTER" sortable>
                            <template #body="{ data }">
                                <Button :label="data.NOREGISTER" class="p-button-link p-button-info p-button-sm"
                                    @click="details_const_monitoring(data.NOREGISTER, data.NOMR, data.NAMAPASIEN)" />
                            </template>
                        </Column>
                        <Column field="NAMADOKTER" header="DOKTER" sortable></Column>
                        <Column field="NOMR" header="NOMR" sortable></Column>
                        <Column field="NAMAPASIEN" header="NAMAPASIEN" sortable></Column>
                        <Column field="NOSEP" header="NOSEP" sortable></Column>
                        <Column field="POLIRUANG" header="POLIRUANG" sortable></Column>
                        <Column field="MASUK" header="MASUK" sortable></Column>
                        <Column field="KELUAR" header="KELUAR" sortable></Column>
                        <Column field="OBATAN" header="OBAT-OBATAN" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.OBATAN)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.OBATAN) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="BMHP" header="BMHP" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.BMHP)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.BMHP) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="LABORATORIUM" header="LABORATORIUM" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.LABORATORIUM)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.LABORATORIUM) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="RADIOLOGI" header="RADIOLOGI" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.RADIOLOGI)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.RADIOLOGI) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="TARIF_CBG" header="TARIF CBG" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.TARIF_CBG)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.TARIF_CBG) }}
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <!-- Rekap Per Dokter -->
            <div class="card shadow-sm">
                <div class="card-header bg-secondary text-white">
                    <h3 class="card-title mb-0"><i class="pi pi-users mr-2"></i>Rekap Per Dokter</h3>
                </div>
                <div class="card-body p-0">
                    <DataTable :value="recapPerDokter" stripedRows sortMode="multiple" class="p-datatable-sm"
                        responsiveLayout="scroll">
                        <template #empty>
                            <div class="text-center text-muted py-4">Tidak ada data</div>
                        </template>
                        <Column field="NAMADOKTER" header="DOKTER" sortable>
                            <template #body="{ data }"><strong>{{ data.NAMADOKTER }}</strong></template>
                        </Column>
                        <Column field="jumlah_ps" header="JML PASIEN" sortable
                            headerStyle="text-align:center" bodyStyle="text-align:center; font-weight:bold;">
                        </Column>
                        <Column field="OBATAN" header="OBAT-OBATAN" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.OBATAN)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.OBATAN) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="BMHP" header="BMHP" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.BMHP)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.BMHP) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="LABORATORIUM" header="LABORATORIUM" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.LABORATORIUM)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.LABORATORIUM) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="RADIOLOGI" header="RADIOLOGI" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.RADIOLOGI)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.RADIOLOGI) }}
                                </div>
                            </template>
                        </Column>
                        <Column field="TARIF_CBG" header="TARIF CBG" sortable :pt="{ bodyCell: { style: { padding: 0 } } }">
                            <template #body="{ data }">
                                <div :class="getCellClass(data.TARIF_CBG)" style="text-align: right; padding: .5rem .75rem;">
                                    {{ formatRupiah(data.TARIF_CBG) }}
                                </div>
                            </template>
                        </Column>
                        <Column header="RATA-RATA" sortable bodyStyle="text-align:right; font-weight:bold;"
                            :sortField="(item) => calculateAveragePerDokter(item)">
                            <template #body="{ data }">{{ formatRupiah(calculateAveragePerDokter(data)) }}</template>
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column footer="TOTAL" :footerStyle="{ 'font-weight': 'bold' }" />
                                <Column :footer="String(totalPatientsPerDokter)"
                                    :footerStyle="{ 'text-align': 'center', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalObatanPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalBMHPPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalLabPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalRadiologiPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(totalTarifCbgPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                                <Column :footer="formatRupiah(averageAllPerDokter)"
                                    :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </div>

            <!-- Detail dialog with improved UI -->
            <Dialog :header="caption_dialog" v-model:visible="displayMaximizable" :containerStyle="{width: '90%'}"
                :maximizable="true" :modal="true" class="patient-detail-dialog">
                <div class="patient-info mb-3 p-3 bg-light rounded">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">{{ detailPatientInfo.name }}</h5>
                        <span class="badge badge-info p-2">RM: {{ detailPatientInfo.rm }}</span>
                    </div>
                    <div class="mt-2 text-muted small d-flex">
                        <div class="mr-3"><i class="pi pi-calendar mr-1"></i>Register: {{ detailPatientInfo.register }}
                        </div>
                        <div><i class="pi pi-bookmark mr-1"></i>{{ currentDetailPoliruang }}</div>
                    </div>
                </div>

                <DataTable :value="detailcost.response" stripedRows sortMode="multiple" class="p-datatable-sm"
                    responsiveLayout="scroll">
                    <Column field="KATEGORI" header="KATEGORI" sortable>
                        <template #body="{ data }">
                            <span class="badge" :class="getCategoryBadgeClass(data.KATEGORI)">{{ data.KATEGORI }}</span>
                        </template>
                    </Column>
                    <Column field="ITEM" header="ITEM" sortable></Column>
                    <Column field="QTY" header="QTY" sortable bodyStyle="text-align:right;">
                        <template #body="{ data }">{{ formatRupiah(data.QTY) }}</template>
                    </Column>
                    <Column field="HARGA_BELI" header="HARGA" sortable bodyStyle="text-align:right;">
                        <template #body="{ data }">{{ formatRupiah(data.HARGA_BELI) }}</template>
                    </Column>
                    <Column field="SATUAN" header="SATUAN" sortable></Column>
                    <Column field="TOTALAMOUNT" header="TOTALAMOUNT" sortable bodyStyle="text-align:right;">
                        <template #body="{ data }">{{ formatRupiah(data.TOTALAMOUNT) }}</template>
                    </Column>
                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="TOTAL" :colspan="5" :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                            <Column :footer="formatRupiah(calculateDetailTotal(detailcost.response))"
                                :footerStyle="{ 'text-align': 'right', 'font-weight': 'bold' }" />
                        </Row>
                    </ColumnGroup>
                </DataTable>

                <template #footer>
                    <div class="d-flex justify-content-between">
                        <!-- <Button label="Print" icon="pi pi-print" class="p-button-secondary" /> -->
                        <Button label="Tutup" icon="pi pi-times" @click="closeMaximizable" class="p-button-primary"
                            autofocus />
                    </div>
                </template>
            </Dialog>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {

                json_fields: {
                    'NOREGISTER': 'NOREGISTER',
                    'NOMR': 'NOMR',
                    'TGLLAHIR': 'TGLLAHIR',
                    'NAMAPASIEN': 'NAMAPASIEN',
                    'NOSEP': 'NOSEP',
                    'POLIRUANG': 'POLIRUANG',
                    'NAMADOKTER': 'NAMADOKTER',
                    'MASUK': 'MASUK',
                    'KELUAR': 'KELUAR',
                    'HAKKELAS': 'HAKKELAS',
                    'OBATAN': 'OBATAN',
                    'BMHP': 'BMHP',
                    'LABORATORIUM': 'LABORATORIUM',
                    'TENAGA_AHLI': 'TENAGA_AHLI',
                    'KEPERAWATAN': 'KEPERAWATAN',
                    'RADIOLOGI': 'RADIOLOGI',
                    'KEPERAWATAN': 'KEPERAWATAN',
                    'TARIF_CBG': 'TARIF_CBG',
                },
                fact: [],
                recap: [],
                detailcost: [],
                caption_dialog: '',
                searchQuery: '',
                selectedJenisRawat: null,
                dokterSelected: null,
                displayMaximizable: false,
                fullPage: true,
                jenisRawat: [{
                        name: 'JALAN',
                        code: 'JALAN'
                    },
                    {
                        name: 'INAP',
                        code: 'INAP'
                    },
                ],
                form: {
                    startdate: '',
                    enddate: '',
                    selectedJenisRawat: '',
                    dokterSelected: null,
                    norm: '',
                    noregister: ''
                },
                isLoading: false,
                fullPage: true,
                listDokter: [],
                detailPatientInfo: {
                    name: '',
                    rm: '',
                    register: ''
                },
                currentDetailPoliruang: '',
                data_has_filter:[]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
            this.getnamadokter();
        },
        computed: {
            // Filter data based on doctor selection and search query
            filteredFact() {
                let filtered = this.fact;

                // Filter by doctor if selected
                if (this.form.dokterSelected && this.form.dokterSelected.KDDOKTER) {
                    filtered = filtered.filter(item => item.KDDOKTER === this.form.dokterSelected.KDDOKTER);
                }

                // Filter by search query
                if (this.searchQuery && this.searchQuery.trim() !== '') {
                    const query = this.searchQuery.toLowerCase().trim();
                    filtered = filtered.filter(item =>
                        (item.NAMAPASIEN && item.NAMAPASIEN.toLowerCase().includes(query)) ||
                        (item.NOMR && item.NOMR.toString().includes(query)) ||
                        (item.NOREGISTER && item.NOREGISTER.toString().includes(query)) ||
                        (item.NOSEP && item.NOSEP.toString().includes(query)) ||
                        (item.POLIRUANG && item.POLIRUANG.toLowerCase().includes(query))
                    );
                }
                this.data_has_filter = filtered;

                return filtered;
            },

            exportDataFormatted() {
                return this.data_has_filter.map(row => ({
                NOREGISTER: row.NOREGISTER,
                NOMR: row.NOMR,
                TGLLAHIR: row.TGLLAHIR,
                NAMAPASIEN: row.NAMAPASIEN,
                NOSEP: row.NOSEP,
                POLIRUANG: row.POLIRUANG,
                NAMADOKTER: row.NAMADOKTER,
                MASUK: (row.MASUK),
                KELUAR: (row.KELUAR),
                HAKKELAS: row.HAKKELAS,
                OBATAN: this.formatRupiah(row.OBATAN),
                BMHP: this.formatRupiah(row.BMHP),
                LABORATORIUM: this.formatRupiah(row.LABORATORIUM),
                TENAGA_AHLI: this.formatRupiah(row.TENAGA_AHLI),
                KEPERAWATAN: this.formatRupiah(row.KEPERAWATAN),
                RADIOLOGI: this.formatRupiah(row.RADIOLOGI),
                TARIF_CBG: this.formatRupiah(row.TARIF_CBG),
                }));
            },

            // Summary totals for the recap table's TOTAL row
            totalPatients() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.jumlah_ps !== undefined ? Number(item.jumlah_ps) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalObatan() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.OBATAN !== undefined ? Number(item.OBATAN) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalBMHP() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.BMHP !== undefined ? Number(item.BMHP) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalLab() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.LABORATORIUM !== undefined ? Number(item.LABORATORIUM) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalTenagaAhli() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.TENAGA_AHLI !== undefined ? Number(item.TENAGA_AHLI) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalKeperawatan() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.KEPERAWATAN !== undefined ? Number(item.KEPERAWATAN) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            totalRadiologi() {
                return this.recap.reduce((sum, item) => {
                    const value = item?.RADIOLOGI !== undefined ? Number(item.RADIOLOGI) : 0;
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            },
            grandTotal() {
                return this.totalObatan + this.totalBMHP + this.totalLab +
                    this.totalTenagaAhli + this.totalKeperawatan + this.totalRadiologi;
            },

            // Summary grouped per dokter, based on the currently filtered patient list
            recapPerDokter() {
                const map = {};
                this.filteredFact.forEach(row => {
                    const dokter = row.NAMADOKTER || 'Tidak Diketahui';
                    if (!map[dokter]) {
                        map[dokter] = {
                            NAMADOKTER: dokter,
                            jumlah_ps: 0,
                            OBATAN: 0,
                            BMHP: 0,
                            LABORATORIUM: 0,
                            RADIOLOGI: 0,
                            TARIF_CBG: 0,
                        };
                    }
                    const item = map[dokter];
                    item.jumlah_ps += 1;
                    item.OBATAN += Number(row.OBATAN) || 0;
                    item.BMHP += Number(row.BMHP) || 0;
                    item.LABORATORIUM += Number(row.LABORATORIUM) || 0;
                    item.RADIOLOGI += Number(row.RADIOLOGI) || 0;
                    item.TARIF_CBG += Number(row.TARIF_CBG) || 0;
                });

                return Object.values(map).sort((a, b) => a.NAMADOKTER.localeCompare(b.NAMADOKTER));
            },
            totalPatientsPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.jumlah_ps, 0);
            },
            totalObatanPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.OBATAN, 0);
            },
            totalBMHPPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.BMHP, 0);
            },
            totalLabPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.LABORATORIUM, 0);
            },
            totalRadiologiPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.RADIOLOGI, 0);
            },
            totalTarifCbgPerDokter() {
                return this.recapPerDokter.reduce((sum, item) => sum + item.TARIF_CBG, 0);
            },
            averageAllPerDokter() {
                if (!this.totalPatientsPerDokter) return 0;
                const totalBiaya = this.totalObatanPerDokter + this.totalBMHPPerDokter +
                    this.totalLabPerDokter + this.totalRadiologiPerDokter + this.totalTarifCbgPerDokter;
                return totalBiaya / this.totalPatientsPerDokter;
            },
        },
        methods: {
            openMaximizable() {
                this.displayMaximizable = true;
            },
            calculateAveragePerDokter(row) {
                if (!row.jumlah_ps) return 0;
                const totalBiaya = (Number(row.OBATAN) || 0) + (Number(row.BMHP) || 0) +
                    (Number(row.LABORATORIUM) || 0) + (Number(row.RADIOLOGI) || 0) + (Number(row.TARIF_CBG) || 0);
                return totalBiaya / row.jumlah_ps;
            },
            formatRupiah(value) {
                if (!value) return '0';
                return new Intl.NumberFormat('id-ID').format(value);
            },
            formatDate(dateString) {
                if (!dateString) return '';
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return dateString; // Return original if invalid

                return new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(date);
            },
            closeMaximizable() {
                this.displayMaximizable = false;
            },
            resetFilters() {
                var currentDate = new Date();
                this.form.dokterSelected = null;
                this.searchQuery = '';
            },
            getCellClass(value) {
                const numValue = parseFloat(value) || 0;
                return numValue > 0 ? 'positive-value' : 'negative-value';
            },
            getCategoryBadgeClass(category) {
                switch (category) {
                    case 'OBAT-OBATAN':
                        return 'badge-info';
                    case 'BMHP':
                        return 'badge-warning';
                    case 'LABORATORIUM':
                        return 'badge-success';
                    case 'TENAGA AHLI':
                        return 'badge-primary';
                    case 'KEPERAWATAN':
                        return 'badge-dark';
                    case 'RADIOLOGI':
                        return 'badge-danger';
                    default:
                        return 'badge-secondary';
                }
            },
            calculateDetailTotal(arr) {
                if (!arr || !arr.length) {
                    return 0;
                }

                return arr.reduce((sum, item) => {
                    const amount = parseFloat(item.TOTALAMOUNT) || 0;
                    return sum + amount;
                }, 0);
            },
            async getnamadokter() {
                this.form.mode = 2;
                this.isLoading = true;
                await axios.post('/getnamadokter', this.form)
                    .then(response => {
                        this.listDokter = response.data.response;
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;
                    })
                    .finally(() => this.isLoading = false);
            },
            async fetchData() {
                var currentDate = new Date();
                this.isLoading = true;

                await axios.post('/const_monitoring', this.form)
                    .then(response => {
                        this.fact = response.data.response;
                        this.recap = response.data.recap;
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;
                    })
                    .finally(() => this.isLoading = false);
            },
            totalCost(array) {
                if (!array || !array.length) {
                    return 0;
                }

                return array.reduce((sum, item) => {
                    const amount = parseFloat(item.TOTALAMOUNT) || 0;
                    return sum + amount;
                }, 0);
            },
            async details_const_monitoring(noregister, norm, namapasien) {
                this.isLoading = true;
                this.form.noregister = noregister;

                // Store patient info for detail view
                this.detailPatientInfo = {
                    name: namapasien || '',
                    rm: norm || '',
                    register: noregister || ''
                };

                // Find current poliruang for this patient
                const patientData = this.fact.find(item => item.NOREGISTER === noregister);
                this.currentDetailPoliruang = patientData ? patientData.POLIRUANG : '';

                await axios.post('/get_details_item', this.form)
                    .then(response => {
                        this.detailcost = response.data;
                        this.caption_dialog = 'Detail Biaya Pasien';
                        this.isLoading = false;
                        this.displayMaximizable = true;
                    })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false;
                    })
                    .finally(() => this.isLoading = false);
            }
        },
    }

</script>

<style scoped>
    .filter-group {
        margin-right: 15px;
    }

    .positive-value {
        background-color: rgba(40, 167, 69, 0.15) !important;
        color: #1e7e34 !important;
    }

    .negative-value {
        background-color: rgba(255, 13, 13, 0.2) !important;
    }

    .search-box {
        min-width: 300px;
    }

    .patient-detail-dialog .p-dialog-content {
        padding: 0;
    }

    .patient-info {
        border-left: 4px solid #17a2b8;
    }

    /* Badge styles */
    .badge {
        padding: 0.4em 0.6em;
        font-size: 85%;
        border-radius: 0.25rem;
    }

    .badge-info {
        background-color: #17a2b8;
        color: white;
    }

    .badge-warning {
        background-color: #ffc107;
        color: #212529;
    }

    .badge-success {
        background-color: #28a745;
        color: white;
    }

    .badge-primary {
        background-color: #007bff;
        color: white;
    }

    .badge-danger {
        background-color: #dc3545;
        color: white;
    }

    .badge-dark {
        background-color: #343a40;
        color: white;
    }

    .badge-secondary {
        background-color: #6c757d;
        color: white;
    }

    .card {
        margin-bottom: 1.5rem;
        border: none;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }

    .shadow-sm {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    }

    .gap-3 {
        gap: 1rem;
    }

    /* Button improvements */
    .p-button-sm {
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
    }

</style>
