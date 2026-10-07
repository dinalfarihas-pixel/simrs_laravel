<template>
    <section class="content">
        <div class="container-fluid">
            <div class="card card-info card-outline elevation-0">
                <div class="card-body">
                    <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .2em" />
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="keluhanutama">Diagnosa Utama</label><br />
                                <Textarea id="keluhanutama" v-model="form.dx_utama" style="width: 100%;" rows="5"
                                    cols="30" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">  
                                <label for="keluhanutama">Jenis Kasus</label><br />
                                <div class="field-radiobutton">
                                    <RadioButton id="jenis_kasus_baru" name="jenis_kasus_baru" value="Baru" v-model="form.jenis_kasus" />
                                    <label for="jenis_kasus_baru">Baru</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="jenis_kasus_lama" name="jenis_kasus_lama" value="Lama" v-model="form.jenis_kasus" />
                                    <label for="jenis_kasus_lama">Lama</label>
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="keluhanutama">Diagnosa Penyerta & Komplikasi</label><br />  
                                <Textarea id="keluhanutama" v-model="form.dx_sekunder" style="width: 100%;" rows="5"
                                    cols="30" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                       
                    </div>
                </div>
                <div class="card-footer">
                    <Button label="Simpan" align="" @click="simpan_diagnosan_dokter()" icon="pi pi-save" class="p-button" /> 
                </div>
             </div> 
             
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay'; 
    import Chart from 'primevue/chart';
    import Textarea from 'primevue/textarea';
    import ProgressBar from 'primevue/progressbar';
    import RadioButton from 'primevue/radiobutton';
    export default {
        components: {
            Loading,
            Chart,
            Textarea,
            ProgressBar,
            RadioButton
       
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [], 
                form: {
                    startdate: '',
                    enddate: '', 
                    nomr:'',
                    noregister:'',
                    dx_utama:'',
                    dx_sekunder:'',
                    jenis_kasus:'Baru'
                },
                isLoading: false,
                fullPage: true,
                data_res:{
                    nomr:'',
                    dx_utama:'',
                    dx_sekunder:''
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
            this.get_diagnosa_dokter();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async simpan_diagnosan_dokter() {
                const dataform = new FormData();
                this.form.nomr =this.datapasien.NOMR;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.isLoading = true;
                await axios.post('/simpan_diagnosan_dokter', this.form)
                    .then(response => {

                        console.log(response.data)
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message);
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message);
                        }

                        this.isLoading = false;
                    
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            }, 

            async get_diagnosa_dokter() {
                const dataform = new FormData(); 
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.isLoading = true;
                await axios.post('/get_diagnosa_dokter', this.form)
                    .then(response => {  
                        if(response.data.metadata.code==200)
                        {
                            this.form = response.data.response 
                        } 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            }, 
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                })
            },
        },
    }

</script>
<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 800px;
}
</style>
