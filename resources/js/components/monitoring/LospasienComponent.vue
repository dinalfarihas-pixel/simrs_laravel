<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Durasi Hari</h3>
                        </div>
                        <div class="card-body">
                            <label for="selectedCity" class="text-sm mr-3">Diatas >= </label>
                            <Select v-model="form.los_pasien" class="mr-3" :options="los" style="width: 5em;"
                                optionLabel="value" placeholder="" />
                            <label for="selectedCity" class="text-sm mr-3">Hari </label>
                            <Button label="Tampilkan" align="" @click="getdata()" icon="pi pi-check" class="p-button" />
                            
                        </div>
                    </div>
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
                                <th>RUANGAN</th> 
                                <th>JUMLAH PASIEN</th>
                                <th>LAMA MENGINAP (HARI)</th>
                                <th>PREVIEW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td>{{ row.RUANG }}</td>
                                <td>{{ row.JML_PASIEN }}</td>
                                <td>{{ row.HARIRAWATAN }}</td>
                                <td><Button type="button" icon="pi pi-search" @click="prev_data(row)"
                                        class="p-button-success" style="margin-right: .5em"></Button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            
            <Dialog :header="caption_dialog" v-model:visible="displayMaximizable" :containerStyle="{width: '50vw'}"
                :maximizable="false" :modal="true">
                <table class="table table-bordered table-striped dtr-inline">
                    <thead>
                        <tr>
                            <th>NOMR</th> 
                            <th>NAMA</th> 
                            <th>ALAMAT</th>
                            <th>MASUK</th>
                            <th>NAMADOKTER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in datapasien">
                            <td>{{ row.NOMR }}</td>
                            <td>{{ row.DATA_SINGKAT }}</td>
                            <td>{{ row.ALAMAT }}</td>
                            <td>{{ row.MASUKPOLY_DISPLAY }}</td>
                            <td>{{ row.NAMADOKTER }}</td> 
                        </tr>
                    </tbody>
                </table>
                <template #footer>
                     
                    <Button label="Tutup" icon="pi pi-check" @click="closeMaximizable" autofocus />
                </template>
            </Dialog>
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
                caption_dialog:'',
                datapasien:[],
                form: {
                    los_pasien: '',
                    kodeunit:''
                },
                displayMaximizable: false,
                isLoading: false,
                fullPage: true,
                selectvalue: 3,
                los: [{
                        value: "1"
                    },
                    {
                        value: "2"
                    },
                    {
                        value: "3"
                    },
                    {
                        value: "4"
                    },
                    {
                        value: "5"
                    },
                    {
                        value: "6"
                    },
                    {
                        value: "7"
                    },
                    {
                        value: "8"
                    }
                ]
            };
        },
        mounted() {

        },
        created() {
            //this.fetchData();

        },
        methods: {
            open(type,message) {
                this.$toast.open({
                    message: message,
                    position:'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                })
            },
            openMaximizable() {
                this.displayMaximizable = true;
            },
            closeMaximizable() {
                this.displayMaximizable = false;
            },
            fetchData() {
                console.log(this.form.los_pasien.value);
            },
            async getdata() {
                const dataform = new FormData();

                console.log(this.form.los_pasien);
                if(this.form.los_pasien=="")
                {
                    this.open("warning","Silahkan pilih jumlah hari pasien menginap")
                    return;
                }

                this.isLoading = true;
                await axios.post('/lospasien-api', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
           async prev_data(row) {
                console.log(row) 
                const dataform = new FormData();
                this.isLoading = true;
                this.form.kodeunit = row.KODERUANGAN;
                this.caption_dialog ="Pasien telah di rawat lebih dari " + this.form.los_pasien.value + " hari di ruang " + row.RUANG;
                await axios.post('/datadetails_pasien', this.form)
                    .then(response => {
                        this.datapasien = response.data.response
                        this.isLoading = false
                        console.log(this.datapasien);
                         this.displayMaximizable = true; 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            }
        },
    }

</script>
