<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>  
            <br>
            <div class="row">
                <div class="col-md-10">
                    <h5>GRAFIK PERKEMBANGAN PASIEN</h5>
                    <Chart type="line" :data="basicData" />
                </div>
                <div class="col-md-2">
                    <Button label="Reload" align="" @click="get_kajian_awal_dokter()" icon="pi pi-refresh" class="p-button p-button-success" />  
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
        props: ['noregister'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    noregister: ''
                },
                isLoading: false,
                fullPage: true,
                basicData: {
                    labels: [],
                    datasets: [{
                        label: '',
                        data: [],
                        fill: false,
             
                        borderColor: '#FFA726',
                        tension: .4
                    }, ]
                },
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.get_kajian_awal_dokter();
        },
        methods: {
            async get_kajian_awal_dokter() {
                var currentDate = new Date();
                this.form.noregister = this.noregister;
                await axios.post('/datagrafik_cppt', this.form)
                    .then(response => {
                        this.basicData = {
                            labels: response.data.response.waktu,
                            datasets: [
                                    {
                                        label: 'SUHU',
                                        data: response.data.response.suhu,
                                        fill: false,
                                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: '#42daf5',
                                        borderWidth: 3,
                                        tension: .4
                                    },
                                    {
                                        label: 'SISTOLE',
                                        data: response.data.response.sistole,
                                        fill: false,
                                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: '#f5ce42',
                                        borderWidth: 3,
                                        tension: .4
                                    },
                                    {
                                        label: 'GCS',
                                        data: response.data.response.gcs,
                                        fill: false,
                                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: '#63f542',
                                        borderWidth: 3,
                                        tension: .4
                                    },
                                    {
                                        label: 'SPO2',
                                        data: response.data.response.spo2,
                                        fill: false,
                                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: '#428af5',
                                        borderWidth: 3,
                                        tension: .4
                                    },
                                    {
                                        label: 'PERNAFASAN',
                                        data: response.data.response.pernafasan,
                                        fill: false,
                                        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: '#e642f5',
                                        borderWidth: 3,
                                        tension: .4
                                    }


                            ],

                        }
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>
