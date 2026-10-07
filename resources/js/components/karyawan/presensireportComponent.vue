<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Laporan personal perhari" v-model:visible="detils_form" :containerStyle="{width: '50vw'}" :modal="true">

               <div class="col-12 col-sm-4 col-md-4 d-flex align-items-stretch flex-column ">
                   <div class="card bg-light d-flex flex-fill elevation-0">
                       <div class="card-header text-muted border-bottom-0">
                           <!-- Digital Strategist -->
                       </div>
                       <div class="card-body pt-0">
                           <div class="row">
                            <div class="col-6 text-center">
                                   <img :src="pic" alt="user-avatar" class="img-circle img-fluid">
                               </div>
                               <div class="col-6">
                                   <h2 class="lead"><b>{{data_ind.id_karyawan}}</b></h2>
                                   <h2 class="lead"><b>{{data_ind.nama}}</b></h2>
                                   <h2 class="lead"><b> <Tag :value="data_ind.jeniskaryawan" severity="danger"></Tag></b></h2>
                                  
                               </div>
                              
                           </div>
                       </div> 
                   </div>
               </div>
               <!-- {{ details_riwayat }} -->

                <table class="table table-hover table-sm table-bordered">
                    <thead>
                        <tr>
                            <th colspan="2"  style="text-align: center; background-color: antiquewhite;">Waktu</th>
                            <th colspan="2"  style="text-align: center; background-color: cadetblue; color: white;">Presensi Masuk</th>
                            <th colspan="2"  style="text-align: center; background-color: cornsilk;">Presensi Pulang</th>
                        </tr>
                        <tr>
                            <th style="text-align: center;">Hari</th>
                            <th style="text-align: center;">Tanggal</th>
                            <th style="text-align: center;">Jam Masuk</th>
                            <th style="text-align: center;">Telat (jam:Menit)</th>
                            <th style="text-align: center;">Jam Pulang</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in details_riwayat">
                        <td>{{ row.hari }}</td>
                        <td>{{ row.tanggal }}</td>
                        <td>{{ row.jam_masuk }}</td>
                        <td>{{ row.telat_waktu }}</td>
                        <td>{{ row.jam_keluar }}</td>
                    </tr>
                    </tbody>
                    </table>

                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="close_detils_form()" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="close_detils_form()" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Laporan presensi perbidang</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month"
                        dateFormat="mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 10em; " />  
                        <Select v-model="form.ruanganselected" :options="ruangan" style="width: 17em; " optionLabel="namaruangan" :filter="true" :editable="false"/>
                     <Button label="Tampilkan" align="" @click="getlaporan_personal()" icon="pi pi-check" class="p-button" />
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <!-- {{ laporan_absen }} -->
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
                            <th>NAMA</th>
                            <th v-for="index in 31"> {{ index }}</th>
                            <th>Total Hadir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in laporan_absen">
                                <td><button type="button" @click="show_detils_form(row)" class="btn btn-block btn-danger btn-sm">Details</button></td>
                                <td> {{ row.nama }} - ({{ row.jeniskaryawan  }})</td> 
                                <td v-for="index in 31">
                                    <span v-for=" data in row.details" style="white-space: nowrap;">
                                        <span v-if='data.tgl==index'> 
                                            <span v-if="data.keterangan=='H'">

                                                <Tag :value="data.telat_menit" 
                                                 v-tooltip.top="{ value: data.jam_hadir}"
                                                :severity="data.coloring"></Tag>
                                            </span>
                                            <span v-if="data.keterangan=='L'">
                                                <Tag :value="data.keterangan"  
                                                severity="danger"></Tag>
                                            </span>
                                            <!-- <span v-if="data.keterangan=='A'">
                                                <Tag value="A"  
                                                severity="danger"></Tag>
                                            </span> -->
                                         
                                        </span> 
                                    </span> 
                                </td>

                                <td> 
                                    {{ row.totalhadir }}
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
    import Tag from 'primevue/tag';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            Tag
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                ruangan:[],
                laporan_absen:[],
                form: {
                    startdate: '',
                    enddate: '', 
                    ruanganselected:null,
                    id_ruangan:''
                },
                isLoading: false,
                fullPage: true,
                filters1: {},
                filters2: {},
                detils_form:false,
                details_riwayat:[],
                pic:'',
                data_ind:{
                    nama:'',
                    id_karyawan:'',
                    jeniskaryawan:''
                }
               
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getruangan();
            this.initFilters1()
            this.initFilters2()
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            show_detils_form(data)  
            { 
                this.data_ind = data;
                console.log(this.data_ind);
                this.getlaporan_personal_perhari(data); 

            },
            close_detils_form()
            { 
                this.detils_form = false;
            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
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
           async getruangan() {
                var currentDate = new Date();
                this.isLoading = true;
        
                await axios.post('/get_ruangan')
                    .then(response => {   

                        console.log(response.data);
                        this.ruangan = response.data.response; 
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)  
            },

            async getlaporan_personal() {
                var currentDate = new Date();

                this.isLoading = true;
                this.form.id_ruangan = this.form.ruanganselected.id;
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/getlaporan_personal',this.form)
                    .then(response => {  

                        //e.log(response.data);
                        this.laporan_absen = response.data.response;  
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)  
            },

            async getlaporan_personal_perhari(data) {
                var currentDate = new Date();

                this.isLoading = true;
                this.form.id_karyawan = data.id_karyawan;
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/getlaporan_personal_perhari',this.form)
                    .then(response => {   
                        //e.log(response.data);
                        this.details_riwayat = response.data.response;  
                        this.pic = response.data.profile_pic;  
                        this.detils_form = true;
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
