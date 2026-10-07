<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Tanggal Pelayanan</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 15em;   " />
                    <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 15em;   " />
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Rata-rata waktu layan</h3>
                </div>

                <div class="card-body table-sm table-responsive p-10 ">
                    <table class="table table-bordered table-striped dtr-inline">
                        <thead>
                            <tr>
                                <th>POLI KLINIK </th>
                                <th>PASIEN</th>
                                <th>TUNGGU ADMISI</th>
                                <th>LAYAN ADMISI</th>
                                <th>TUNGGU POLI</th>
                                <th>LAYAN POLI</th>
                                <th>TUNGGU FARMASI</th>
                                <!-- <th>LAYAN FARMASI</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td>{{ row.nama }}</td>
                                <td>{{ row.jml_pasien }}</td>
                                <td :class="row.tunggu_admisi_numb">{{ row.tunggu_admisi }}</td>
                                <td :class="row.layan_admisi_numb">{{ row.layan_admisi }}</td>
                                <td :class="row.tunggu_poli_numb">{{ row.tunggu_poli }}</td>
                                <td :class="row.layan_poli_numb">{{ row.layan_poli }}</td>
                                <td :class="row.tunggu_farmasi_numb">{{ row.tunggu_farmasi }}</td>
                                <!-- <td :class="row.layan_farmasi_numb">{{ row.layan }}</td> -->
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>JUMLAH</strong> </td>
                                <td> <strong>{{ formatNumber(getTotal('jml_pasien')) }}</strong> </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Breakdown</h3>
                </div>

                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                    <button label="Tampilkan" align="" @click="breakdown_data()" icon="pi pi-check"
                        class="btn btn-success btn-sm">Breakdown</button>
                    <table class="table table-bordered table-striped dtr-inline">
                        <thead>
                            <tr>

                                <td style="text-align: center;">
                                    <div class="input-group input-group-sm">
                                        <input type="text" v-model="filters.kodepoli.value" name="table_search"
                                            class="form-control float-left" placeholder="Search">
                                    </div>
                                </td>

                                <td></td>
                                <td></td>
                                <td style="text-align: center;">
                                    <div class="input-group input-group-sm">
                                        <input type="text" v-model="filters.namapasien.value" name="table_search"
                                            class="form-control float-left" placeholder="Search">
                                    </div>
                                </td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>POLI KLINIK </th>
                                <th>NOKA</th>
                                <th>RM</th>
                                <th>PASIEN</th>
                                <v-th :sortKey="nameLength" defaultSort="desc">TUNGGU ADMISI</v-th>
                                <th>LAYAN ADMISI</th>
                                <th>TUNGGU POLI</th>
                                <th>LAYAN POLI</th>
                                <th>TUNGGU FARMASI</th>
                                <!-- <th>LAYAN FARMASI</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in breakdown">
                                <td>{{ row.kodepoli }}</td>
                                <td>{{ row.nomorkartu }}</td>
                                <td>{{ row.nomr }}</td>
                                <td>{{ row.namapasien }}</td>
                                <td>{{ row.tunggu_admisi }}</td>
                                <td>{{ row.layan_admisi }}</td>
                                <td>{{ row.tunggu_poli }}</td>
                                <td>{{ row.layan_poli }}</td>
                                <td>{{ row.tunggu_farmasi }}</td>
                                <!-- <td>{{ row.layan }}</td> -->
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
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                breakdown: [],
                form: {
                    startdate: '',
                    enddate: '',

                },
                filters: {
                    namapasien: {
                        value: '',
                        keys: ['namapasien'],
                    },
                    kodepoli: {
                        value: '',
                        keys: ['kodepoli'],
                    },

                },
                isLoading: false,
                fullPage: true,
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
            nameLength(row) {
                return row.avg;
            },

            async breakdown_data() {
                var currentDate = new Date();
                console.log(this.form.startdate);
                var currentDate = new Date();
                this.isLoading = true;
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/timeservice_breakdown-api', this.form)
                    .then(response => {
                        this.breakdown = response.data.response
                        console.log(this.breakdown);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

                console.log(this.form);
            },

             getTotal(field) {
                if (!this.fact || this.fact.length === 0) return 0;
                return this.fact.reduce((sum, row) => {
                let val = parseFloat(row[field]) || 0;
                return sum + val;
                }, 0);
            },
             formatNumber(value) {
                if (!value) return 0;
                return value.toLocaleString('id-ID'); // Format Indonesia, contoh: 1.234.567
            },
            async fetchData() {
                var currentDate = new Date();
                var currentDate = new Date();
                this.isLoading = true;
                this.fact = [];
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/timeservice-api', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.breakdown = response.data.breakdown
                        console.log(this.fact);
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
