<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-sm-9">
                    <Card style="width: 100%; margin-bottom: 1em;">
                        <template #header>
                            <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                        </template>
                        <template #content>
                            <div class="flex flex-wrap align-items-center mb-3 gap-2">
                                <MultiSelect style="height: 2.3em;" v-model="form.selectedYear" :options="tahun"
                                    optionLabel="value" placeholder="Pilih Tahun" />

                                <MultiSelect style="height: 2.3em;" v-model="form.jenisrawatSelected"
                                    :options="jenisrawat" optionLabel="value" placeholder="Pilih Jenis rawat" />
                                <Button style="height: 2.3em;border-radius:5px;margin-left: 0.5em" @click="createPost()"
                                    severity="warning">Tampikan</Button />
                            </div>
                            Dashboard adalah antarmuka visual yang menyajikan informasi penting
                            dalam bentuk grafik, tabel, dan metrik untuk pengambilan keputusan yang cepat dan efisien.
                        </template>

                    </Card>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-9">
                    <Card style="width: 100%; margin-bottom: 1em;">
                        <template #header>
                            <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                        </template>
                        <template #title>

                        </template>
                        <template #content>
                            <Chart type="bar" :data="basicData" />
                        </template>
                        <template #footer>

                        </template>
                    </Card>
                </div>
                <div class="col-sm-9">
                    <Card style="width: 100%; margin-bottom: 1em;">
                        <template #header>

                        </template>
                        <template #title>
                            <h6>Data okupasi Tempat Tidur</h6>
                            <Calendar v-model="form.startdate" class="text-sm mr-2" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;" />
                            <Calendar v-model="form.enddate" class="text-sm mr-2" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;" />
                            <Button label="Tampilkan" align="" @click="okupasi_bed()" icon="pi pi-check"
                                class="p-button" />
                        </template>
                        <template #content>

                            <table class="table table-bordered table-striped dtr-inline table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>RUANGAN</th>
                                        <th>JUMLAH_TT</th>
                                        <th>TERSEDIA</th>
                                        <th>BOR</th>
                                        <th>AVLOS</th>
                                        <th>BTO</th>
                                        <th>TOI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in data_okupasi">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ row.NAMA }}</td>
                                        <td>{{ row.JUMLAH_TT }}</td>
                                        <td>{{ row.TERSEDIA }}</td>
                                        <td>{{ row.details.BOR }}</td>
                                        <td>{{ row.details.AVLOS }}</td>
                                        <td>{{ row.details.BTO }}</td>
                                        <td>{{ row.details.TOI }}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </template>
                        <template #footer>

                        </template>
                    </Card>
                </div>

            </div>
        </div>

    </section>
</template>

<script setup>
</script>

<script>
    import Chart from 'primevue/chart';
    import Toast from 'primevue/toast';
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            'Chart': Chart,
            'Toast': Toast,
            'Loading': Loading
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                form: {
                    selectedYear: '',
                    jenisrawatSelected: '',
                    startdate: '',
                    enddate: ''
                },
                data_okupasi: [],
                tahun: [{
                        value: '2021'
                    },
                    {
                        value: '2022', 
                    },
                    { 
                        value: '2023'
                    },
                    { 
                        value: '2024'
                    },
                    { 
                        value: '2025'
                    },
                    { 
                        value: '2026'
                    }
                ],
                jenisrawat: [{
                        value: 'INAP'
                    },
                    {
                        value: 'JALAN'
                    }
                ],

                basicOptions: null,
                basicData: '',
                response_db: ''
            }
        },
        created() {
            this.createPost()
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
            // this.getdtatahun();
            // this.fetchData();
        },

        methods: {

            showSuccess() {

                this.$toast.add({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Message Content',
                    group: 'br',
                    life: 3000
                });
            },
            async createPost() {
                try {
                    this.isLoading = true;
                    const year = this.selectedYear;
                    const response = await axios.post("/datakunjunganpasien", this.form);
                    this.response_db = response.data

                    this.basicData = {
                        labels: this.response_db.labels,
                        datasets: this.response_db.dataset
                    };
                    //this.post = data;
                    this.isLoading = false;
                    console.log(this.basicData);
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                }
            },

            async getdatadsaboard_datakunjungan() {

                var data = JSON.stringify({
                    author: 'bobby hadz',
                    title: 'Using fetch correctly in JavaScript',
                });
                //console.log(data);
                this.basicData = {};
                await fetch('/datakunjunganpasien', {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": 'your-api-key',
                            "X-RapidAPI-Host": 'facts-by-api-ninjas.p.rapidapi.com',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        body: this.selectedYear
                    })

                    .then((response) => {
                        response.json().then((data) => {
                            this.response_db = data;
                            console.log(data)
                            this.basicData = {
                                labels: this.response_db.labels,
                                datasets: this.response_db.dataset
                            };
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });

            },
            getdtatahun() {
                fetch('/gettahun', {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": 'your-api-key',
                            "X-RapidAPI-Host": 'facts-by-api-ninjas.p.rapidapi.com',
                        },

                    })
                    .then((response) => {
                        response.json().then((data) => {
                            this.tahun = data;
                            //console.log(this.tahun)
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
            async okupasi_bed() {
                this.isLoading = true
                await axios.post('/okupasi_bed', this.form)
                    .then(response => {
                        this.data_okupasi = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

        }
    }

</script>
