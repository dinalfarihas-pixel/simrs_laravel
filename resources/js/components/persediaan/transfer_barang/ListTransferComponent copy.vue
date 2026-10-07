<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pilih tanggal permintaan</h3>
                </div>
                <div class="card-body">
                    <Toolbar class="mb-0">
                        <template #start>
                            <Calendar v-model="form.startdate" class="text-sm mr-1" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;" />
                            <Calendar v-model="form.enddate" class="text-sm mr-1" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;   " />
                            <Button label="" align="" @click="get_data_list_transfer_v3()" icon="pi pi-check"
                                class="p-button" />
                        </template>
                        <template #end>

                            <Button label="Selesai" @click="(1)" class="p-button p-button p-button-success mr-1" />
                            <Button label="Menunggu" @click="filter_data(2)" class="p-button  mr-1" />
                            <Button label="Semua" @click="filter_data(0)"
                                class="p-button p-button p-button-danger mr-1" />
                            <!-- <a class="btn btn-info">
                                <i class="fas fa-plus">
                                </i>
                                Permintaan baru
                            </a> -->
                        </template>

                    </Toolbar>
                </div>
            </div>

            <div class="card">
                <div class="card-header">

                </div>
                <div class="card-body"> 

                    <table class="table table-striped projects">
                        <thead>
                            <tr>
                                <th style="width: 10%">
                                    Tanggal
                                </th>
                                <th style="width: 20%">
                                    Asal Permintaan
                                </th>
                                <th style="width: 30%">
                                    Tujuan Permintaan
                                </th>
                                <th>
                                    Progress
                                </th>
                                <th style="width: 20%">
                                    Catatan
                                </th>
                                <th style="width: 30%" class="text-center">
                                    Status/Batalkan
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="data in fact">
                                <td>{{ data.NO_PERMINTAAN }} <br />
                                    <small>{{data.TANGGAL}}</small>
                                </td>
                                <td>{{ data.LOKASI }}
                                </td>
                                <td>
                                    {{ data.TUJUAN }}
                                </td>
                                <td class="project-state">
                                    <span v-if="data.TELAH_DIPROSES==0">
                                        <span class="badge badge-warning">
                                            Menunggu </span>
                                    </span>
                                    <span v-if="data.TELAH_DIPROSES==1">
                                        <span class="badge badge-success">
                                            Sudah diproses </span>
                                    </span>
                                </td>
                                <td>
                                    {{ data.CATATAN }}
                                </td>
                                <td class="project-actions text-center"> 
                                    <a class="btn btn-info" :href="`/persediaan/do-transfer?no_permintaan=${data.NO_PERMINTAAN}`" target="_blank">
                                        <i class="fas fa-cogs" ></i>   
                                        Proses
                                    </a>  
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
                temp_data: []
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate; 

          

        },
        created() {
            //this.fetchData(); 
            this.get_data_list_transfer_v3();



        },
        methods: {
            fetchData() {
                var currentDate = new Date(); 
            },
            async get_data_list_transfer_v3() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/persediaan/get_data_list_transfer_v3', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.temp_data = this.fact;
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async filter_data(status) {
                // Reset to original data
                this.fact = [...this.temp_data];

                // Filter by status
                switch (status) {
                    case 1:
                        this.fact = this.fact.filter(x => x.TELAH_DIPROSES === '1');
                        break;
                    case 2:
                        this.fact = this.fact.filter(x => x.STATUS_PROGRESS === '2');
                        break;
                    default:
                        break;

                }
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
        },
    }

</script>
