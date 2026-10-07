<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Print Preview" v-model:visible="showModal" :containerStyle="{width: '70vw'}" :modal="true">
                 <pdf-printpreview :pdfUrl=url_toview></pdf-printpreview>
           
            <template #footer>
                    <Button label="Batal" icon="pi pi-times"  class="p-button-text"/>
                    <Button label="Simpan" icon="pi pi-check"  autofocus :loading="isLoading" />
                </template>
            </Dialog>  

            <div class="card elevation-0 card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">Pencarian Elegibilitas Peserta/Noregister</h3>
                </div> 
                <div class="card-body">
                    <InputText  autocomplete="off" v-model="form.nosep" type="text" placeholder="Input No SEP/Noregister"  style="width: 20em;" />
                    <Button label="" align="" @click="call_data()" icon="pi pi-search" class="p-button" /> 
                </div>
            </div>
            

            <div class="card elevation-0 card-primary card-outline">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card card-primaryelevation-0">
                                <div class="card-body box-profile">
                                    <div class="text-center">
                                        <img width="220px" height="130px"
                                            src="https://ws-simrs.link/ilustration/ilustrasi1.png" alt="Ilustration">
                                    </div>
                                    <h3 class="profile-username text-center" v-if="dataSEP.metaData.code=200">
                                        {{dataSEP.response.peserta.nama}}</h3>
                                    <p class="text-muted text-center">{{dataSEP.response.peserta.jnsPeserta}}</p>
                                    <ul class="list-group list-group-unbordered mb-3">
                                        <li class="list-group-item">
                                            <b>NO Kartu</b> <a
                                                class="float-right">{{dataSEP.response.peserta.noKartu}}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Tanggal Lahir</b> <a
                                                class="float-right">{{dataSEP.response.peserta.tglLahir}}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>NOMR </b> <a class="float-right">{{dataSEP.response.peserta.noMr}}</a>
                                        </li>
                                        <li class="list-group-item">
                                            <b>Hak Kelas </b> <a
                                                class="float-right">{{dataSEP.response.peserta.hakKelas}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Data BPJS</h5>

                                   
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped projects">
                                        <thead>
                                            <tr>
                                                <th style="width: 100px">Header</th>
                                                <th style="width: 10px">#</th>
                                                <th>Task</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="dataSEP.metaData.code=200">
                                            <tr>
                                                <td>
                                                    No SEP
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.noSep}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tanggal SEP
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.tglSep}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Jenis Layanan
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.jnsPelayanan}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    kelas Rawat
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.kelasRawat}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Diagnosa
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.diagnosa}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Poli
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.poli}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    catatan
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.catatan}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Katarak
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    <Checkbox :binary="true" v-model="dataSEP.response.katarak" />

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    DPJP
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{dataSEP.response.kontrol.nmDokter}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Data Rumah Sakit</h5>
                                </div>
                                <div class="card-body">
                                    <!-- {{ data_rs }} -->
                                    <table class="table table-striped projects" style="overflow: visible;">
                                        <thead>
                                            <tr>
                                                <th style="width: 100px">Header</th>
                                                <th style="width: 10px">#</th>
                                                <th>Task</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    No Register
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.NOPENDAFTARAN}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    NOKTP
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.NOKTP}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Nama Pasien
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.NAMAPASIEN}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Masuk
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.MASUKPOLY}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Diagnosa
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    <!-- {{data_rs.DX_CAPTION}} -->
                                                    <Select 
                                                    v-model="form.diagnoseSelected"
                                                    class=""
                                                    :options="listDiagnose" 
                                                    optionLabel="dx" 
                                                    :filter="true" 
                                                    :showClear="false" 
                                                    :loading="isLoading"
                                                    @filter="searchDiagnose"
                                                    placeholder="Search diagnose..."
                                                     appendTo="body"
                                                    style="width: 100%; height: 35px; " />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Poli/Ruang
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.POLI}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    USER_ID
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.USER_ID}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    LOS
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>
                                                    {{data_rs.JLM_HARI_RAWAT}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    DPJP
                                                </td>
                                                <td>
                                                    :
                                                </td>
                                                <td>   
                                                    <Select v-model="form.dokterSelected" style="width: 100%; height: 35px;" 
                                                        :options="listDokter" @change="updatedokter"  appendTo="body" class="" optionLabel="NAMADOKTER" :filter="true" placeholder=""
                                                        :showClear="false" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">

                </div>
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-5">
                        <label for="">Catatan SEP</label><br>
                        <div style="display: flex;"> 
                            <Textarea v-model="data_rs.CATATAN" :autoResize="true" rows="2" style="width:80%" /><br/>
                            <!-- <Button label="Update catatan" class="p-button p-button"   icon="pi pi-post"   autofocus /> -->
                        </div> 
                    </div>
                </div>  
                </div>
                        
            </div>

            <div class="card elevation-0 card-primary card-outline">
                <div class="card-header">
                    <!-- {{ dataSEP }} -->
                </div>
                <div class="card-body"> 
                    <Button label="Update" @click="updateSEP_db()" icon="pi pi-save" autofocus />
                    <Button label="Cetak" @click="cetakSEP()" icon="pi pi-print" class="p-button success" autofocus />
                </div>
            </div>
        </div>
    </section>
</template>

<script> 
    import Loading from 'vue-loading-overlay';
    import Checkbox from 'primevue/checkbox';
    import Textarea  from 'primevue/textarea';
    import Dialog from 'primevue/dialog';
    export default {
        components: {
            Loading,
            Checkbox,
            Textarea,
            Dialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                showModal:false,
                isOsKatarak:'0',
                url_toview:'https://djpk.kemenkeu.go.id/wp-content/uploads/2021/01/PMK-222_MK.07_2020_Pengelolaan-Dana-Desa.pdf',
                data_rs: {

                },
                dataSEP: {
                    metaData: {
                        code: 201
                    },
                    response: {
                        dpjp: {
                            nmDPJP: ''
                        },
                        peserta: {

                        },
                        katarak: '0',
                        kontrol:{}
                    }
                },
                form: {
                    noregister:'',
                    startdate: '',
                    enddate: '',
                    nosep: '',
                    catatan:'',
                    param:'',
                    dokterSelected:{
                        NAMADOKTER:'',
                        KDDOKTER:''
                    },
                    diagnoseSelected:null
                },
                isLoading: false,
                fullPage: true,
                listDokter:[],
                listDiagnose:[]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getnamadokter();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
           
            async searchDiagnose(event)
            {
                
                const query = event.value;
                if (!query || query.length < 2) {
                    this.listDiagnose = [];
                    return;
                }

                console.log(query)

                this.form.mode = 1; 
                this.form.param = query

                console.log(this.form);

                await axios.post('/get_icd_v2', this.form)
                    .then(response => {
                        console.log(response.data) 
                        this.listDiagnose = response.data; 
                        this.isLoading = false; 
 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getnamadokter()
            {
                this.form.mode = 2; 
                await axios.post('/getnamadokter', this.form)
                    .then(response => {
                        console.log(response.data) 
                        this.listDokter = response.data.response; 
                        this.isLoading = false; 

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
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
            async call_data()
            {
                this.diagnoseSelected = null;
                this.listDiagnose =[]

                if(this.form.nosep.length==19)
                {
                    this.form.mode = 8;
                    this.getdata();
                    this.getdataRs();
                }
                else
                {
                    this.form.mode = 1;
                    this.form.noregister = this.form.nosep;
                    this.getdataRs();
                }
               
            },
            async getdata() {

                if (this.form.nosep == "") {
                    this.open("warning", "NOsep Wajib di isi")
                    return;
                }
                this.isLoading = true;
                await axios.post('/getdata_SEP', this.form)
                    .then(response => {
                        console.log(response.data) 
                        if (response.data.metaData.code == 200) {
                            this.dataSEP = response.data
                            this.open("success", response.data.metaData.message + ", SEP ditemukan")
                            this.isLoading = false

                            
                        } else {
                            this.isLoading = false
                            this.dataSEP = {
                                metaData: {

                                },
                                response: {
                                    dpjp: {

                                    },
                                    peserta: {}
                                }
                            };
                            this.isLoading = false
                            this.open("warning", response.data.metaData.message)
                        } 

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdataRs() {
 
                this.isLoading = true;
                await axios.post('/getpasien_api', this.form)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.metadata.code == 200) {
                            this.data_rs = response.data.response[0]; 
                            this.open("success", response.data.metadata.message + ", Data RS Ditemukan")
                            this.isLoading = false;
                            this.form.dokterSelected = {
                                KDDOKTER : this.data_rs.KDDOKTER,
                                NAMADOKTER : this.data_rs.NAMADOKTER,
                            };

                            this.form.diagnoseSelected = {
                                icd_code :this.data_rs.DIAGNOSA_AWAL,
                                jenis_penyakit :this.data_rs.DX_CAPTION,
                                dx : this.data_rs.DIAGNOSA_AWAL + '-' + this.data_rs.DX_CAPTION
                            } 

                            this.listDiagnose.push(this.form.diagnoseSelected)

                            console.log('dx',this.form.diagnoseSelected);
                        
                        } else {
                            this.data_rs = {
                                response: ''
                            };
                            this.isLoading = false
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async updateSEP() { 
              
                this.isLoading = true;
                this.form.dataSEP = this.dataSEP;
                await axios.post('/updateSEP', this.form)
                    .then(response => {
                        console.log(response.data) 
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
                },

            async updatedokter(e)
            {  
                this.data_rs.NAMADOKTER = e.value.NAMADOKTER;
                this.data_rs.KDDOKTER = e.value.KDDOKTER;  
            },

            async cetakSEP()
            {
                this.isLoading = true;  
  
                const data_rs ={
                    data : this.data_rs
                }  
                await axios.post('/sep/get_data_sep', data_rs)
                    .then(response => {
                       console.log(response.data) 
                    //    this.url_toview = response.data;
                       window.open(response.data, '_blank');
                    //    this.showModal = true;
                        this.open("success", response.data.metadata.message)
                        this.isLoading = false 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }, 
            async updateSEP_db()
            {
                this.isLoading = true; 

                this.data_rs.DIAGNOSA_AWAL =  this.form.diagnoseSelected.icd_code;
                this.data_rs.DX_CAPTION =  this.form.diagnoseSelected.jenis_penyakit; 
                this.data_rs.NAMADIAGNOSA = this.form.diagnoseSelected.dx;
                this.data_rs.KDDOKTER = this.form.dokterSelected.KDDOKTER;
                this.data_rs.SPRI_KONTROL_ULANG = this.dataSEP.response.kontrol.noSurat 

                const data_rs ={
                    data : this.data_rs
                }  
                await axios.post('/update_sep_pasien', data_rs)
                    .then(response => {
                        console.log(response.data) 
                        this.open("success", response.data.metadata.message)
                        this.isLoading = false
                        //this.showModal=true;
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

 <style>
 

</style>