<template>
    <section class="content">

        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
        <div class="row">
            <div class="col-md-3">
                <div class="card elevation-0 card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">
                            <Button label="Riwayat" @click="get_data_permintaan_fisio()" class="p-button-text" icon="pi pi-refresh" />
                        </h3>
                    </div>

                    <div class="card-body" style="height: 400px; overflow-y: auto;">
                        <div class="card" v-for="(data,index) in fact">
                            <div class="card-header">
                                <h5 class="card-title">
                                    <Button :label="'00000000'+data.id" class="p-button-text" />
                                </h5>
                                <div class="card-tools">
                                    <Button label="" @click="void_sales(data.id)" class="p-button-text p-button-danger" icon="pi pi-times" />
                                </div>
                            </div>
                            <div class="card-body">
                                <address>
                                    {{data.tanggal}}<br> 
                                    <strong>{{data.asal_permintaan}}</strong> <br>
                                </address>
                                <span v-if="data.stts==1">
                                        Status:
                                        <!-- <Button icon="pi pi-check" @click="getdetail_sales(data.RECEIPT_NO)"
                                            class="p-button-rounded p-button-success p-button-outlined" /> -->
                                        <Tag class="mr-2" severity="success" value="Selesai"></Tag>
                                    </span>
                                    <span v-if="data.stts==0">
                                        Status : <Tag class="mr-2" severity="warning" value="blm diproses"></Tag>
                                        
                                    </span>

                                <!-- <Button label="Yes" icon="pi pi-check" @click="addMessages" autofocus />  -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-9">
                <div class="card elevation-0 card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">
                            <span>Permintaan Fisio Teraphy</span>
                        </h3>
                    </div>
                    <div class="card-body">
                        <label for="keterangan">Data klinis</label><br>
                        <InputText type="text" v-model="form.dataklinis" style="width: 80%;" /><br><br />
                        <label for="keterangan">Keterangan</label><br>
                        <Textarea v-model="form.keterangan" id="keterangan" rows="5" style="width: 80%;" />
                        </div> 
                    <div class="card-footer">
                        <Button label="Simpan" icon="pi pi-save" @click="input_permintaan_fisio()"  autofocus />
                    </div>
                  
                </div>
            </div>
        </div> 
        <div>
 
  
  </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Textarea from 'primevue/textarea'; 
    import Tag from 'primevue/tag'; 
    export default {
        components: {
            Loading,
            Textarea,
            Tag
        },
        props:['datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '', 
                    dataklinis:'',
                    keterangan:'',
                    noregister:'',
                    asal_permintaan:'',
                    id:0
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
            this.get_data_permintaan_fisio();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            onConfirm () {
                this.value = 'Agreed'
            },
            onCancel () {
                this.value = 'Disagreed'
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

            clear_text()
            {
                this.form.dataklinis=""
                this.form.keterangan ="" 
            },  
            async get_data_permintaan_fisio()
            {
                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN,
                this.form.asal_permintaan = this.datapasien.POLI,

                this.form.mode = 1

                await axios.post('/get_data_permintaan_fisio', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response; 
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async void_sales(id) {
                this.isLoading = true 
                this.form.id = id;
                await axios.post('/hapus_permintaan_fisio', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.isLoading = false
                        this.get_data_permintaan_fisio();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async input_permintaan_fisio()
            { 
                if(this.form.dataklinis=="")
                {
                    this.open("warning","Data klinis wajib disi");
                    return;
                }

                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                await axios.post('/input_permintaan_fisio', this.form)
                    .then(response => {
                        console.log(response.data);

                        if(response.data.metadata.code==200)
                        {
                            this.isLoading = false;
                            this.open("success","Permintaan berhasil dikirim");
                            this.clear_text();
                            this.get_data_permintaan_fisio();
                        }
                        else
                        {
                            this.open("warning","Gagal proses");
                        }
                        this.isLoading = false
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
