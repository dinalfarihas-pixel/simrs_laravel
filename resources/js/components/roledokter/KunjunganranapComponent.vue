<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien rawat inap {{ namadokter }}</h3>
                </div>
                <div class="card-body">
                    <label class="">Bulan Pulang</label>
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 10em; " />
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"></h3>
                </div>
                <div class="card-body table-sm table-responsive p-10" style="height: 700px;">
                    <table class="table table-bordered table-striped  dataTable dtr-inline">
                        <thead :filters="filters">
                            <tr>
                                <th></th>
                                <th>
                                    <div class="input-group input-group-sm">
                                        <input type="text" v-model="filters.NAMA.value" name="table_search"
                                            class="form-control float-left" placeholder="Nama">
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>NOMR </th>
                                <th>
                                    NAMA 
                                </th>
                                <th>MASUK</th>
                                <th>RUANGAN</th>
                                <th>STTS</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td>{{ row.NOMR }} </td>
                                <td>{{ row.DATA_SINGKAT }}     <br/>
                                   <span class="badge bg-success">{{ row.CARABAYAR }} </span> 
                                </td>
                                <td>M : {{ row.MASUKPOLY }} <br/>
                                    K : {{ row.KELUARPOLY_NULL }}
                                </td>
                                <td>{{ row.POLI }} </td>
                                <td> 
                                    <h3 :class="[row.KONDISISAATPULANG=='' ? 'badge bg-danger':'badge bg-success']   ">
                                                        {{ row.STTS_PULANG }}</h3   >
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
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
            namadokter: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',

                },
                isLoading: false,
                fullPage: true,
                filters: {
                    NAMA: {
                        value: '',
                        keys: ['NAMA'],
                    }, 
                },
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            //console.log(currentDate);
        },
        created() {
            //this.fetchData();

        },
        methods: {
            async fetchData() {
                this.isLoading = true;
                await axios.post('/datarawatpasien_ranap_api', this.form)
                    .then(response => {
                        this.fact = response.data.response
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
