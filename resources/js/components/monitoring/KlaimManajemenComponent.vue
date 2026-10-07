<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <span v-if="isLoading">
                    <ProgressBar mode="indeterminate" style="height: .2em" />
                </span>
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <div class="row">

                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" />

                            <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" />

                            <Select v-model="form.selectedJenisRawat" :options="jenisRawat" style="width: 8em;"
                                optionLabel="name" placeholder="Pilih jenis rawat" filterPlaceholder="Find Car" />



                            <Button label="Tampilkan" align="" @click="getdata_klaim()" icon="pi pi-check"
                                class="p-button" />

                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box shadow-sm">
                                <span class="info-box-icon bg-info"><i class="far fa-envelope"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">AVG Cost</span>
                                    <span class="info-box-number"><h4>{{ formatCurrency(grand_total.total_avg) }} / {{ formatInterger(grand_total.total_pasien) }} OS</h4></span>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box shadow-sm">
                                <span class="info-box-icon bg-success"><i class="far fa-flag"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">Total Unit Cost</span>
                                    <span class="info-box-number"><h4>{{ formatCurrency(grand_total.total_subtotal) }}</h4></span>
                                </div>

                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box shadow-sm">
                                <span class="info-box-icon bg-warning"><i class="far fa-copy"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">AVG CBG'S</span>
                                    <span class="info-box-number"><h4>{{ formatCurrency(grand_total.total_avg_inacbg) }} / {{ formatInterger(grand_total.total_pasien) }} OS</h4></span>
                                </div>

                            </div>

                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                            <div class="info-box shadow-sm">
                                <span class="info-box-icon bg-danger"><i class="far fa-star"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">Total INA CBG'S</span>
                                    <span class="info-box-number"><h4>{{formatCurrency(grand_total.total_inacbg)}}</h4></span>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

                        <Tabs>
                <TabList>
                    <Tab>Summary</Tab>
                    <Tab>Detil</Tab>
                    <Tab>Detil</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>

                    <div class="card">
                        <div class="card-body  table-responsive p-10" style="height: 800px;">

                        <!-- <table  class="table table-bordered table-striped  dataTable dtr-inline">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>DPJP</th>
                                        <th>JML PASIEN</th>
                                        <th>OBAT_OBATAN</th>
                                        <th>BMHP</th>
                                        <th>LABORATORIUM</th>
                                        <th>RADIOLOGI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in summary_klaim" :key="row.id">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ row.DPJP }}</td>
                                        <td style="text-align: right;"><strong>{{ row.OS }}
                                        </strong></td>
                                        <td style="text-align: right;"><strong>{{ $numeral(row.OBAT_OBATAN, '0,0.00') }}
                                            </strong></td>
                                        <td style="text-align: right;"><strong>{{ $numeral(row.BMHP, '0,0.00') }}
                                            </strong></td>

                                        <td style="text-align: right;"><strong>{{ $numeral(row.LABORATORIUM, '0,0.00') }}
                                            </strong></td>
                                        <td style="text-align: right;"><strong>{{ $numeral(row.RADIOLOGI, '0,0.00') }}
                                            </strong></td>

                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>

                            </table> -->
                            <DataTable :value="summary_klaim"  :resizableColumns="true" columnResizeMode="fit"  selectionMode="single" stripedRows sortMode="multiple"
                                class="p-datatable-sm"   responsiveLayout="scroll" scrollHeight="flex">
                                <template #header>
                                    Small Table
                                </template>
                                <!-- <ColumnGroup type="header">

                                    <Row>
                                        <Column header="Sales" :colspan="2" />
                                        <Column header="Profits" :colspan="2" />
                                    </Row>
                                    <Row>
                                        <Column header="DPJP" :sortable="true" field="DPJP" />
                                        <Column header="Pasien" :sortable="true" field="thisYearSale" />
                                        <Column header="Last Year" :sortable="true" field="lastYearProfit" />
                                        <Column header="This Year" :sortable="true" field="thisYearProfit" />
                                    </Row>
                                </ColumnGroup> -->

                                <Column field="DPJP" header="[1] DPJP" sortable></Column>
                                <Column field="OS" header="[2] PASIEN" sortable
                                    :styles="{'text-align':'right', 'background-color':'bisque'}">
                                </Column>
                                <Column field="INACBG" sortable header="[3] TARIF INACBG"
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps" sortable>
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.INACBG, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="OBAT_OBATAN" sortable header="[4] OBAT_OBATAN"
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps" sortable>
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.OBAT_OBATAN, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="BMHP" header="[5] BMHP" sortable :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.BMHP, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="LABORATORIUM" header="[6] LABORATORIUM" sortable
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.LABORATORIUM, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="RADIOLOGI" header="[7] RADIOLOGI" sortable
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.RADIOLOGI, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="TOTAL" header="[8=4+5+6+7] SUB TOTAL" sortable
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.TOTAL, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <Column field="RATA2_UNITCOST" header="[9=8/2] AVG COST" sortable
                                    :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        <strong> {{ $numeral(slotProps.data.RATA2_UNITCOST, '0,0.00') }}</strong>


                                    </template>
                                </Column>
                                <Column field="RATA2_INACBG" header="[10] AVG CBG'S" sortable
                                    :styles="{'text-align':'right','background-color':'green', 'color':'white'} ">
                                    <template #body="slotProps">
                                        <!-- //{{formatCurrency(slotProps.data.mar)}}  -->
                                        <strong> {{ $numeral(slotProps.data.RATA2_INACBG, '0,0.00') }}</strong>
                                    </template>
                                </Column>
                                <ColumnGroup type="footer">
                                    <Row>
                                        <Column footer="Totals:" :colspan="1" :footerStyle="{'text-align':'right'}" />
                                        <Column :footer="formatInterger(grand_total.total_pasien)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_inacbg)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_obatan)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_BMHP)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_labor)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_radiologi)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_subtotal)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                        <Column :footer="formatCurrency(grand_total.total_avg)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />
                                            <Column :footer="formatCurrency(grand_total.total_avg_inacbg)"
                                            :footerStyle="{'text-align':'right','font-weight':'bold'}" />

                                    </Row>
                                </ColumnGroup>
                            </DataTable>


                        </div>
                    </div>

                    </TabPanel>
                    <TabPanel>

                    <div class="card">
                        <div class="card-body  table-responsive p-10" style="height: 700px;">
                            <table class="table table-bordered table-striped  dataTable dtr-inline">
                                <thead>
                                    <tr>
                                        <th>RM</th>
                                        <v-th>PASIEN</v-th>
                                        <v-th>DOKTER</v-th>
                                        <th>TGL MASUK</th>
                                        <th>TGL PULANG</th>
                                        <v-th>POLI/RUANG</v-th>
                                        <v-th>TARIF INACBG</v-th>
                                        <v-th>TARIF RS</v-th>
                                        <v-th>OBAT-OBATAN</v-th>
                                    </tr>

                                    <tr>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NOMR.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search">
                                            </div>

                                        </th>
                                        <th></th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NAMADOKTER.value"
                                                    name="table_search" class="form-control float-left"
                                                    placeholder="Search">
                                            </div>

                                        </th>
                                        <th>

                                        </th>
                                        <th>

                                        </th>
                                        <th>

                                        </th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NOSEP.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search">
                                            </div>
                                        </th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.POLI.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search"></div>

                                        </th>

                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in fact" :key="row.id">
                                        <td>{{ row.NOMR }} </td>
                                        <td>{{ row.NAMAPASIEN }} </td>
                                        <td>{{ row.NAMADOKTER }} </td>
                                        <td>{{ row.TGLREG }} </td>
                                        <td>{{ row.KELUARPOLY }} </td>
                                        <td>{{ row.POLI }} </td>
                                        <td style="text-align: right;"><strong>{{ $numeral(row.TARIFCBG, '0,0.00') }}
                                            </strong></td>
                                        <td style="text-align: right;">{{ $numeral(row.TARIFRS, '0,0.00') }} </td>
                                        <td style="text-align: right;">
                                            <strong>{{ $numeral(row.OBAT, '0,0.00') }}</strong> </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style="text-align: right;">
                                            <strong>{{ $numeral(sum_inacbg(displayData), '0,0.00') }}</strong></td>
                                        <td></td>
                                        <td style="text-align: right;"><strong>
                                                {{ $numeral(summTotal(displayData), '0,0.00') }}</strong></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                </tbody>
                                <tfoot>

                                </tfoot>
                            </table>
                        </div>
                    </div>

                    </TabPanel>
                    <TabPanel>

                    <div class="card">
                        <div class="card-body  table-responsive p-10" style="height: 700px;">
                            <table class="table table-bordered table-striped  dataTable dtr-inline">
                                <thead>
                                    <tr>
                                        <th>RM</th>
                                        <v-th>PASIEN</v-th>
                                        <v-th>DOKTER</v-th>
                                        <th>TGL MASUK</th>
                                        <th>TGL PULANG</th>
                                        <th>NOSEP</th>
                                        <v-th>STTS PLNG</v-th>
                                        <v-th>POLI/RUANG</v-th>
                                        <v-th>CODE </v-th>
                                        <v-th>DESKRIPSI </v-th>
                                        <v-th>TARIF INACBG</v-th>
                                        <v-th>TARIF RS</v-th>
                                        <v-th>OBATAN</v-th>
                                        <v-th>STTS</v-th>
                                        <v-th>VERIF</v-th>
                                    </tr>

                                    <tr>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NOMR.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search">
                                            </div>

                                        </th>
                                        <th></th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NAMADOKTER.value"
                                                    name="table_search" class="form-control float-left"
                                                    placeholder="Search">
                                            </div>

                                        </th>
                                        <th>

                                        </th>
                                        <th>

                                        </th>
                                        <th>

                                        </th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.NOSEP.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search">
                                            </div>
                                        </th>
                                        <th>
                                            <div class="input-group input-group-sm">
                                                <input type="text" v-model="filters.POLI.value" name="table_search"
                                                    class="form-control float-left" placeholder="Search"></div>

                                        </th>
                                        <th></th>
                                        <th> </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in fact" :key="row.id">
                                        <td>{{ row.NOMR }} </td>
                                        <td>{{ row.NAMAPASIEN }} </td>
                                        <td>
                                            <p style="white-space:nowrap"> {{ row.NAMADOKTER }}</p>
                                        </td>
                                        <td>{{ row.TGLREG }} </td>
                                        <td>{{ row.KELUARPOLY }} </td>
                                        <td>{{ row.NOSEP }} </td>
                                        <td>{{ row.STTS_PULANG }} </td>
                                        <td>{{ row.POLI }} </td>
                                        <td>{{ row.CODE }} </td>
                                        <td>{{ row.DESKRIPSI }} </td>
                                        <td style="text-align: right;"><strong>{{ $numeral(row.TARIFCBG, '0,0.00') }}
                                            </strong></td>
                                        <td style="text-align: right;">{{ $numeral(row.TARIFRS, '0,0.00') }} </td>
                                        <td style="text-align: right;">
                                            <strong>{{ $numeral(row.OBAT, '0,0.00') }}</strong> </td>
                                        <td>{{ row.SUDAHFINALCLAIM }} </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style="text-align: right;">
                                            <strong>{{ $numeral(sum_inacbg(displayData), '0,0.00') }}</strong></td>
                                        <td></td>
                                        <td style="text-align: right;"><strong>
                                                {{ $numeral(summTotal(displayData), '0,0.00') }}</strong></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                </tbody>
                                <tfoot>

                                </tfoot>
                            </table>
                        </div>
                    </div>

                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import ProgressBar from 'primevue/progressbar';

import TabList from 'primevue/tablist';

import Tabs from 'primevue/tabs';

import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
    import {
        sum
    } from 'lodash';
    export default {
        components: {
            Loading,
            ProgressBar,
            Tabs, TabList, Tab, TabPanels, TabPanel
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
                    selectedJenisRawat: {
                        name: 'JALAN',
                        code: 'JALAN'
                    }
            },
                isLoading: false,
                fullPage: true,
                grand_total_inacbg: 0,
                summary_klaim: [],
                sum_pasien: 0,
                sum_obat_obatan: 0,
                vsum_inacbg: 0,
                vsum_labor: 0,
                GrandTotal: 0,
                sum_bmhp: 0,

                jenisRawat: [{
                        name: 'JALAN',
                        code: 'JALAN'
                    },
                    {
                        name: 'INAP',
                        code: 'INAP'
                    },
                ],
                filters: {
                    NOMR: {
                        value: '',
                        keys: ['NOMR']
            },
                    GrandTotal: 0,
                    NAMADOKTER: {
                        value: '',
                        keys: ['NAMADOKTER']
            },
                    POLI: {
                        value: '',
                        keys: ['POLI']
            },
                    SUDAHFINALCLAIM: {
                        value: '',
                        keys: ['SUDAHFINALCLAIM']
            },
                    NOSEP: {
                        value: '',
                        keys: ['NOSEP']
            }
            },
                grand_total:{
                    total_obatan:0,
                    total_pasien:0,
                    total_inacbg:0,
                    total_BMHP:0,
                    total_labor:0,
                    total_radiologi:0,
                    total_subtotal :0,
                    total_avg:0,
                    total_avg_inacbg:0
                }
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
        },
        created() {
            //this.fetchData();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },

            formatCurrency(value) {
                return value.toLocaleString('en-US', {
                    style: 'currency', currency: 'IDR'
                });
            },
            formatInterger(value) {
                return value.toLocaleString('en-US', {

                });
            },
            counting_summary() {

            },
            nameLength(row) {
                //return row.NORM.length
            },
            summTotal(row) {
                let hasil = 0;
                for (let i = 0; i < row.length; i++) {
                    hasil = parseFloat(hasil) + parseFloat(row[i].OBAT);
                }
                this.GrandTotal = hasil;

                return hasil;
            },
            sum_inacbg(row) {
                let inacbg = 0;
                for (let i = 0; i < row.length; i++) {
                    inacbg = parseFloat(inacbg) + parseFloat(row[i].TARIFCBG);
                }

                return inacbg;
            },

            async getdata_klaim() {
                this.isLoading = true
                await axios.post('/monitoring_klaim', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.summary_klaim = response.data.summary.rincian
                        this.grand_total = response.data.summary.total
                        this.isLoading = false
                        this.counting_summary();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            }

        }
            }

</script>
