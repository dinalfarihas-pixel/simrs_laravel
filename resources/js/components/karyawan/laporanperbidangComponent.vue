<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Laporan personal perhari" v-model:visible="detils_form" :containerStyle="{width: '90vw'}"
                :modal="true">

                        <div class="card">
                            <div class="card-header">

                            </div>
                        <div class="card-body pt-0">
                            <table class="table table-hover table-sm table-bordered">
                                <thead>
                                    <tr>

                                        <th></th>
                                        <th style="text-align: center;" colspan="31">Tangal</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>BIDANG</th>
                                        <th>JLM PEG</th>
                                        <th v-for="index in 31"> {{ index }}</th>
                                        <th>Rat-rata (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="row in data_perruang">
                                        <td></td>
                                        <td>{{ row.bidang  }}</td>
                                        <td> <strong>{{ row.total }}</strong></td>
                                        <td v-for="index in 31">
                                            <span v-for=" data in row.details" style="white-space: nowrap;">
                                                <span v-if="data.tanggal==index">
                                                    {{ data.persentase }} 
                                                </span>
                                            </span>
                                        </td>
                                        <td> <strong>{{ row.avg }}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
                <!-- {{ details_riwayat }} -->

             
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="close_detils_form()" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="close_detils_form()" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 20em; " />
                    <Button label="Tampilkan" align="" @click="laporan_perbidang_grouping()" icon="pi pi-check"
                        class="p-button" />
                </div>
            </div>

            <div class="card">
                <div class="card-header">

                </div>

                <div class="card-body">
                    <table class="table table-hover table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th style="text-align: center;" colspan="31">Tangal</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>BIDANG</th>
                                <th>JLM PEG</th>
                                <th v-for="index in 31"> {{ index }}</th>
                                <th>Rat-rata (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td><button type="button" @click="laporan_perruang_grouping(row)"
                                        class="btn btn-block btn-success btn-sm">Details</button></td>
                                <td>{{ row.bidang  }}</td>
                                <td> <strong>{{ row.total }}</strong></td>
                                <td v-for="index in 31">
                                    <span v-for=" data in row.details" style="white-space: nowrap;">
                                        <span v-if="data.tanggal==index">
                                            {{ data.persentase }}
                                        </span>
                                    </span>
                                </td>
                                <td> <strong>{{ row.avg }}</strong></td>
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
                data_perruang: [],
                form: {
                    startdate: '',
                    enddate: '',
                    id_bidang: ''
                },
                detils_form:false,
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
            close_detils_form()
            { 
                this.detils_form = false;
            },
            async laporan_perbidang_grouping() //load data
            {
                this.isLoading = true;
                var currentDate = new Date();
                await axios.post('/laporan_perbidang_grouping', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.fact = response.data.response
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async laporan_perruang_grouping(row) //load data
            {
                console.log(row);
                this.isLoading = true;
                this.form.id_bidang = row.id
                var currentDate = new Date();
                await axios.post('/laporan_perruang_grouping', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.data_perruang = response.data.response
                        this.isLoading = false;
                        this.detils_form = true;
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
