<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 13em; " />
                    <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 13em; " /> 
                    <Select v-model="form.selectedJenisRawat" style="width: 7em;" :options="jenisRawat"
                        optionLabel="name" placeholder="Pilih jenis rawat" filterPlaceholder="Jenis rawat" /> 
                  
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-body">

                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 10%">
                                        Tanggal
                                    </th>
                                    <th style="width: 20%">
                                        Nama
                                    </th>
                                    <th style="width: 10%">
                                        Jenis Rawat
                                    </th>
                                    <th>
                                        DPJP
                                    </th>
                                    <th style="width: 20%">
                                        Cara Bayar
                                    </th>
                                    <th style="width: 20%">
                                        Encounter ID
                                    </th>
                                    <th style="width: 30%" class="text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="data in fact">
                                    <td>{{ data.NOMR }} <br />
                                        <small>{{data.NOPENDAFTARAN}}</small>
                                        <small>{{data.MASUKPOLY_DISPLAY}}</small>
                                    </td>
                                    <td>{{ data.DATA_SINGKAT }}
                                    </td>
                                    <td>
                                        {{ data.JENISRAWAT }}
                                    </td> 
                                    <td>
                                        {{ data.NAMADOKTER }}
                                    </td>
                                    <td>
                                        {{ data.CARABAYAR }}
                                    </td>
                                    <td   class="project-state">
                                          
                                            <span class="badge badge-success">
                                                {{ data.ENCOUNTER_ID }}
                                           </span>
                                    
                                    </td>
                                    <td class="project-actions text-center">
                                        <Button icon="pi pi-search" @click="openModal(data.NO_PERMINTAAN)"
                                            class="p-button-rounded p-button-success" />
                                       
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>



        </div> 
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import SelectButton from 'primevue/selectbutton';
    export default {
        components: {
            Loading,
            SelectButton
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [], 
                jenisRawat: [{
                        name: 'JALAN',
                        code: 'JALAN'
                    },
                    {
                        name: 'INAP',
                        code: 'INAP'
                    },
                ],
                form: {
                    startdate: '',
                    enddate: '', 
                    selectedJenisRawat:''
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate =currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();

        },
        methods: {
           async fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
                this.isLoading = true;
                await axios.post('/datapasiensatusehat', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                        console.log(this.fact);

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
