<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Tanggal kunjungan pasien</h3>
                        </div>

                        <div class="card-body">
                            <Toolbar style="background-color: white;">
                                <template #start>
                                    <Calendar v-model="form.startdate" class="text-sm mr-2" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                        aria-placeholder="Tanggal awal" style="width: 20em;" />
                                    <Button label="Tampilkan" align="" @click="getdata()" icon="pi pi-check"
                                        class="p-button" />
                                </template>

                                <template #end> 
                                    <div class="info-box bg-gradient-success">
                                        <span class="info-box-icon"><i class="far fa-flag"></i></span>
                                        <div class="info-box-content">
                                            <span class="info-box-text">Total Capaian</span>
                                            <h3>{{avg}} %</h3>
                                        </div> 
                                    </div>
                                    <!-- <h5><mute> Total capaian = </mute></h5>
                                    <h1>22,85%</h1> -->
                                </template>
                            </Toolbar>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-sm-9">
                    <Card style="width: 100%; margin-bottom: 1em;">
                        <template #header>
                            <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                        </template>
                        <template #title>
                            <p>Pengisian Rekam Medis Elektronik Rawat Jalan</p>
                        </template>
                        <template #content>
                            <Chart type="bar" :data="basicData" />
                        </template>
                        <template #footer>

                        </template>
                    </Card>
                </div>
                <div class="col-sm-3">
                    <Card style="width: 100%; margin-bottom: 1em;">
                        <template #header>
                            <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                        </template>
                        <template #title>

                        </template>
                        <template #content>
                            <div class="card-body  table-sm table-responsive p-10">
                                <table class="table table-bordered table-striped dtr-inline">
                                    <thead>
                                        <tr>
                                            <th>POLIKLINIK</th>
                                            <th>PERSEN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in datatable">
                                            <td>{{ row.poli }}</td>
                                            <td>{{ row.persen }} %</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </template>
                        <template #footer>

                        </template>
                    </Card>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                    <table class="table table-bordered table-striped dtr-inline">
                        <thead>
                            <tr>
                                <th>DPJP</th>
                                <th>POLI</th>
                                <th>CARA BAYAR</th>
                                <th>RM</th>
                                <th>PASIEN</th>
                                <th>SUHU</th>
                                <th>TENSI</th>
                                <th>TINGGI BADAN</th>
                                <th>BB</th>
                                <th>NADI</th>
                                <th>SUBJEK</th>
                                <th>ASSESMENT</th>
                                <th>PLAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td>{{ row.NAMADOKTER }}</td>
                                <td>{{ row.POLI }}</td>
                                <td>{{ row.CARABAYAR }}</td>
                                <td>{{ row.NOMR }}</td>
                                <td>{{ row.DATA_SINGKAT }}</td>
                                <td
                                    v-bind:style=" row.SUHU==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.SUHU==1 ?'pi pi-check' : 'pi pi-times'" style="font-size: 1rem"></i>
                                </td>
                                <td
                                    v-bind:style=" row.TENSI==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.TENSI==1 ?'pi pi-check' : 'pi pi-times'" style="font-size: 1rem"></i>
                                </td>
                                <td
                                    v-bind:style=" row.TINGGIBADAN==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.TINGGIBADAN==1 ?'pi pi-check' : 'pi pi-times'"
                                        style="font-size: 1rem"></i></td>
                                <td
                                    v-bind:style=" row.BB==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.BB==1 ?'pi pi-check' : 'pi pi-times'" style="font-size: 1rem"></i>
                                </td>
                                <td
                                    v-bind:style=" row.NADI==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.NADI==1 ?'pi pi-check' : 'pi pi-times'" style="font-size: 1rem"></i>
                                </td>
                                <td
                                    v-bind:style=" row.SUBJEK==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.SUBJEK==1 ?'pi pi-check' : 'pi pi-times'"
                                        style="font-size: 1rem"></i> </td>
                                <td
                                    v-bind:style=" row.ASSESMENT==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.ASSESMENT==1 ?'pi pi-check' : 'pi pi-times'"
                                        style="font-size: 1rem"></i> </td>
                                <td
                                    v-bind:style=" row.PLAN==1 ? 'background-color: rgba(44, 255, 12, 0.431);' : 'background-color: rgba(255, 13, 13, 0.431);'">
                                    <i :class="row.PLAN==1 ?'pi pi-check' : 'pi pi-times'" style="font-size: 1rem"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>

    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Chart from 'primevue/chart';
    export default {
        components: {
            Loading,
            Chart
        },
        props: {
            msg: String,
        },
        data() {
            return {
                basicData: {
                    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    //     datasets: [{  label: 'Dataset 1',
                    //     backgroundColor: [
                    //         '#EC407A',
                    //         '#AB47BC',
                    //         '#42A5F5',
                    //         '#7E57C2',
                    //         '#66BB6A',
                    //         '#FFCA28',
                    //         '#26A69A'
                    //     ],
                    //     yAxisID: 'y',
                    //     data: [65, 59, 80, 81, 56, 55, 10]
                    // }, ]
                },
                filters: {
                    NAMA: {
                        value: '',
                        keys: ['NAMA'],
                    },
                    NAMASUPLIER: {
                        value: '',
                        keys: ['NAMASUPLIER'],
                    },
                    KATEGORI: {
                        value: '',
                        keys: ['KATEGORI'],
                    },
                    BARCODE: {
                        value: '',
                        keys: ['BARCODE'],
                    },

                },
                fact: [],
                datatable: [],
                form: {
                    startdate: '',
                    enddate: '',

                },
                isLoading: false,
                fullPage: true,
                avg:0
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
            this.getdata();
        },
        created() {
            //this.fetchData();
            //this.getdata();

        },
        methods: {
            async getdata() {
                const dataform = new FormData();
                this.fact = []
                this.basicData = {};
                this.isLoading = true;
                await axios.post('/getdatapasien_rme', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.fact = response.data.response
                        this.avg =0;
                        this.isLoading = false 
                        this.basicData = {
                            labels: response.data.grafik.res.labels,
                            datasets: [{
                                label: 'Persentase Pengisian Rekam Medis Elektronik',
                                backgroundColor: response.data.grafik.res.bgcolor,
                                yAxisID: 'y',
                                data: response.data.grafik.res.data
                            }]
                        };

                        this.datatable = response.data.grafik.res.table;
                        this.avg =  response.data.grafik.res.avg;
                        //this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            loadgrafik() {
                datagrafik
            }
        },
    }

</script>

<!-- <style>
    th {
        position: sticky;
        top: -20px;
        /* 0px if you don't have a navbar, but something is required */
        background: rgb(239, 239, 239);
    }

</style> -->
