<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog :header="namadokter" v-model:visible="displayModal" :containerStyle="{width: '70vw'}" :modal="true">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Daftar pasien dengan status belum diserahkan</h3>
                    </div>
                    <div class="card-body p-0">
                        <DataTable :value="datapasien_arr" :paginator="true" :rows="10"
                            :rowsPerPageOptions="[10, 20, 50]"
                            stripedRows showGridlines
                            class="p-datatable-sm"
                            scrollable scrollHeight="400px"
                            emptyMessage="Tidak ada data pasien">
                            <Column header="#" style="width: 3rem; text-align: center">
                                <template #body="{ index }">{{ index + 1 }}</template>
                            </Column>
                            <Column field="NOMR" header="RM" style="min-width: 8rem" />
                            <Column field="NAMAPASIEN" header="NAMA" style="min-width: 12rem" />
                            <Column field="MASUKPOLY_DISPLAY" header="MASUK" style="min-width: 10rem" />
                            <Column field="KELUARPOLY" header="PULANG" style="min-width: 10rem" />
                            <Column field="POLI" header="POLI/RUANGAN" style="min-width: 10rem" />
                            <Column field="KETERANGAN" header="CARA PULANG/TINDAK LANJUT" style="min-width: 14rem" />
                            <Column field="STTS_ASSEBLY" header="STTS" style="min-width: 8rem" />
                        </DataTable>
                    </div>
                </div>
                <template #footer>
                    <!-- <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" /> -->
                    <Button label="Tutup" icon="pi pi-times" @click="closeModal" autofocus />

                    <!-- <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" /> -->
                </template>
            </Dialog>

            <div class="card">

                <div class="card-header">
                    <h3 class="card-title">Bulan Pulang</h3>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card-body">
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 12em;   " />
                            <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width:12em;   " />

                            <Select v-model="form.selectedJenisRawat" style="width: 8em;" :options="jenisRawat"
                        optionLabel="code" placeholder="Pilih jenis rawat" filterPlaceholder="" />

                        <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check"
                                class="p-button" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <!-- <div class="info-box">

                            <div class="info-box-content">
                                <span class="info-box-text">{{ grandtotal.pasien_pulang }} </span>
                            </div>
                        </div> -->

                        <div class="row">
                            <div class="col-sm-3 col-6">
                                <div class="description-block border-right border-left">
                                    <span class="description-percentage text-info">
                                        100% </span>
                                    <h5 class="description-header">{{ grandtotal.pasien_pulang }}</h5>
                                    <span class="description-text">PASIEN PULANG</span>
                                </div>

                            </div>

                            <div class="col-sm-3 col-6">
                                <div class="description-block border-right">
                                    <span class="description-percentage text-info">
                                        {{ grandtotal.lengkap }}%</span>
                                    <h5 class="description-header">{{ grandtotal.lengkap_ssts }}</h5>
                                    <span class="description-text">STTS LENGKAP</span>
                                </div>

                            </div>

                            <div class="col-sm-3 col-6">
                                <div class="description-block border-right">
                                    <span class="description-percentage text-info">
                                        {{grandtotal.total_pasien}}%</span>
                                    <h5 class="description-header">{{ grandtotal.sisa }}</h5>
                                    <span class="description-text">SISA</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3">
                    <div class="card ">
                        <div class="card-header">
                            <h3 class="card-title">Persentase</h3>
                        </div>
                        <div class="card-body table-sm table-responsive p-10" style="height: 400px;">
                            <Chart type="pie" :data="chartData" :options="chartOptions" />
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card ">
                        <div class="card-header">
                            <h3 class="card-title">Persentase Pasien pulang dan penyerahan status berdasarkan DPJP</h3>
                        </div>
                        <div class="card-body table-sm table-responsive p-10" style="height: 400px;">
                            <div class="row">
                                <!-- <Chip  :label="row.DOKTER"  icon="pi pi-check" class="mr-4 custom-chip" >{{ row.DOKTER }} <span class="right badge badge-danger"> New</span></Chip> -->
                                <div class="col-md-4 col-sm-6 col-12" v-for="row in fact">
                                    <p>
                                        <Tag :value="row.persen"
                                            v-tooltip.top="{ value:'OS : ' + row.total_pasien +' ,L : ' + row.lengkap }"
                                            :severity="row.color">{{row.persen}}%</Tag>
                                        <!-- <a href="#">  {{ row.DOKTER }}</a> -->
                                        <!-- <Button :label="row.DOKTER" class="p-button-link" /> -->
                                        <Button :label="row.DOKTER" class="p-button-outlined p-button-sm sucsess"
                                            @click="breakdown_data(row)" />
                                        <strong>
                                            [OS: {{ row.total_pasien }}]
                                            [L : {{ row.lengkap }}]

                                        </strong>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Bulan Pulang</h3>
                </div>
                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                    <table class="table table-bordered table-striped dtr-inline">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style="text-align: center;" colspan="31">Tanggal pulang</th>
                            </tr>

                            <tr>
                                <th>DOKTER</th>
                                <th v-for="index in 31"> {{ index }}</th>
                            </tr>


                        </thead>
                        <tbody>

                            <tr v-for="row in fact">
                                <td> {{ row.DOKTER }}</td>
                                <td v-for="index in 31">
                                    <span v-for=" data in row.data">
                                        <span v-if='data.TGL==index'>
                                            <Tag :value="data.PSERSEN"
                                                v-tooltip.top="{ value:'OS : ' + data.JMLPASIEN +' ,L : ' + data.L }"
                                                :severity="data.color"></Tag>
                                        </span>

                                    </span>

                                </td>

                            </tr>

                            <!-- <tr v-for="index in 31">
                                <td>{{ index }}</td>
                            </tr>

                            <tr v-for="data in fact.data">
                                  <td> JLM: {{ data.JMLPASIEN }} | TNTV :{{ data.TENTATIVE }}</td>
                            </tr> -->
                            <!-- <span  v-for="index in 31">
                            <tr v-for="index in 31"e >
                                <th>{{ index }}</th>
                            </tr>
                            </span> -->


                            <!-- <tr v-for="row in fact.data">
                            <th>{{ row.TGL }}</th>

                        </tr> -->


                        </tbody>
                        <tfoot slot="foot">
                            <tr>
                                <th>KATEGORI</th>
                                <th>ITEM</th>
                                <th>QTY</th>
                                <th>HARGA</th>
                                <th>SATUAN</th>
                                <th>TOTALAMOUNT</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Chart from 'primevue/chart';
    import Tag from 'primevue/tag';
    import Chip from 'primevue/chip';

    export default {
        components: {
            Loading,
            Chart,
            Tag,
            Chip
        },
        props: {
            msg: String,
        },
        data() {
            return {

                chartData: {
                    labels: ['Pasien Pualang', 'STTS'],

                    nilai_total: 0,
                    nilai_lengkap: 0,

                    datasets: [{
                        data: [0, 0],
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A",
                            "#FFA726"
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784",
                            "#FFB74D"
                        ]
                    }]
                },
                chartOptions: {
                    legend: {
                        labels: {
                            fontColor: '#495057',
                            position: 'right'
                        },

                    }
                },
                jenisRawat: [{
                        name: 'JALAN',
                        code: 'JALAN'
                    },
                    {
                        name: 'INAP',
                        code: 'INAP'
                    },
                ],
                grandtotal: '',
                fact: [],
                datapasien_arr: [],
                namadokter:'',
                form: {
                    startdate: '',
                    enddate: '',
                    kddokter: '',
                    selectedJenisRawat:
                            { code: 'INAP'}

                },
                isLoading: false,
                fullPage: true,
                displayModal: false,

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
            openModal() {
                this.displayModal = true;
            },
            closeModal() {
                this.displayModal = false;
            },

            async breakdown_data(row) {
                var currentDate = new Date();
                this.form.kddokter = row.KDDOKTER
                this.namadokter = row.DOKTER;
                this.datapasien_arr =[];
                console.log(this.form)
                this.displayModal = true;
                this.isLoading = true;
                await axios.post('/getpasien_perdokter', this.form)
                    .then(response => {
                        this.datapasien_arr = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)


            },
            async fetchData() {
                var currentDate = new Date();
                this.isLoading = true;
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;
                await axios.post('/stts_monitorin-api', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.fact = response.data.response
                        console.log(response.data);
                        //return;
                        this.grandtotal = response.data.grandtotal;
                        this.chartData = {
                                labels: ['Pasien pulang ' + response.data.grandtotal.total_pasien + '%',
                                    'Telah menyerahkan status ' + response.data.grandtotal.lengkap + '%'
                                ],
                                datasets: [{
                                    data: [response.data.grandtotal.total_pasien, response.data
                                        .grandtotal.lengkap
                                    ],
                                    backgroundColor: [
                                        "#880808",
                                        "#66BB6A",
                                    ],
                                    hoverBackgroundColor: [
                                        "#880808",
                                        "#81C784",

                                    ]
                                }]
                            },


                            this.isLoading = false

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)


            },
        },
    }

</script>
