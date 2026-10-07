<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Ketersediaan Tempat Tidur</h3>
                </div>
                <div class="card-body"> 
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th style="width: 10px">#</th>
                                <th>RUANGAN</th>
                                <th>KELAS</th>
                                <th>JUMLAH PASIEN</th>
                                <th>BED RUSAK</th>
                                <th>JUMLAH TT</th>
                                <th>TERSEDIA</th>
                                <th>UPDATE TERAKHIR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,index) in fact">  
                                <td>{{index + 1}}</td>
                                <td>{{data.NAMA}}
                                    <div class="progress progress-xs progress-striped active">
                                        <div :class="data.COLOR" :style="{ width: data.PERSETASE + '%' }"></div>
                                        </div>
                                </td> 
                                <td>{{data.KELAS}}</td>
                                <td>{{data.JUMLAH_PS}}</td>
                                <td>{{data.BED_RUSAK}}</td> 
                                <td>{{data.JUMLAH_TT}}</td>
                                <td>{{data.TERSEDIA}}</td>
                                <td>{{data.LAST_UPDATE_KELUAR}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <Button label="Tampilkan" align="" @click="getdata_tempat_tidur()" icon="pi pi-check" class="p-button" /> -->
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
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getdata_tempat_tidur();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async getdata_tempat_tidur() {
                var currentDate = new Date();
                this.isLoading = true;
                await axios.post('/getdata_tempat_tidur')
                    .then(response => {
                        console.log(response.data)
                        this.fact = response.data.response;
                        this.isLoading = false;

                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }
        },
    }

</script>
