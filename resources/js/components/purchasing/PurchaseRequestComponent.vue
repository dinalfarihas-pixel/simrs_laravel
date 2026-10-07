<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card  elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Daftar permintaan</h3>
                </div>
                <div class="card-body">
                    
                    
                </div>
            </div>
            <Dialog header="Teruskan" v-model:visible="displayConfirmation" :modal="true">
                <div class="card" style="width: 350px; height: 400px; ">
                    <div class="card-header">
                        <Toolbar class="mt-0">
                            <template #start>
                               <h6> <p for="kategori"> Kepada </p></h6>
                                <MultiSelect name="kategori" class="ml-2" style="width: 200px;"
                                    v-model="form.lokasiSelected" :filter="true" :options="lokasi" optionLabel="CAPION"
                                    placeholder="Pilih lokasi" display="chip" />
                            </template>
                        </Toolbar>
                    </div>
                    <div class="card-body">
                        <div class="row invoice-info">
                            <div class="col-sm-12 invoice-col">
                                <address>
                                    No: <strong> {{pr_selected.no_permintaan}} </strong><br>
                                    Dari : <strong> {{pr_selected.lokasi}} </strong> #{{pr_selected.tanggal}}<br>
                                    <strong> Perihal : {{pr_selected.perihal}}</strong>
                                </address>
                            </div>
                        </div>


                        <strong for="disposisi"> Disposisi </strong><br>
                        <Textarea name="disposisi" v-model="form.disposisi" class="mt-3" :autoResize="true" rows="5"
                            cols="40" />
                        </div>
                </div>

                <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                    <Button label="Teruskan"  icon="pi pi-reply" @click="forward_pr()" autofocus />
                </template>
            </Dialog>

            <div class="card elevation-0" style="background-color: whitesmoke;">
                <div class="card-header">
                    <div class="card-tools">
                        <div class="input-group input-group-sm">
                            <a class="btn btn-info" href="/purchasingtrans">Telaah Baru
                                <i class="fas fa-plus">
                                </i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md 3">
                            <div class="card elevation-0">
                                <div class="card-header">
                                    <h3 class="card-title">Folders</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body p-0">
                                    <ul class="nav nav-pills flex-column">
                                        <li class="nav-item active">
                                            <a class="nav-link" @click="getdataby_inbox(3)">
                                                <i class="fas fa-inbox"></i> Telaah Masuk
                                                <span class="badge bg-warning float-right"><h6> <strong>  {{counting_telaah.inbox}} </strong></h6></span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" @click="getdataby_inbox(4)" >
                                                <i class="far fa-file-alt"></i> Telaah Masuk Belum saya disposisi
                                                <span class="badge bg-primary float-right"><h6> <strong> {{counting_telaah.blmacc}}</strong></h6></span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" @click="getdataby_inbox(2)" >
                                                <i class="far fa-envelope"></i> Telaah Keluar
                                            </a>
                                        </li> 
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                <i class="far fa-trash-alt"></i> Telaah dihapus
                                            </a>
                                        </li>
                                    </ul>

                                </div> 
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="mailbox-controls">
                                <button type="button"  class="btn btn-default btn-sm checkbox-toggle"><i
                                        class="far fa-square"></i>
                                </button>
                                <div class="btn-group">
                                    <button type="button" @click="show_detil=false" class="btn btn-default btn-sm">
                                        <i class="pi pi-arrow-left"></i>
                                    </button>
                                    <button type="button" @click="show_detil=true" class="btn btn-default btn-sm">
                                        <i class="pi pi-arrow-right"></i>
                                    </button>
                                </div> 
                                <button type="button" @click="getlist_pr(2)" class="btn btn-default btn-sm">
                                    <i class="pi pi-refresh"></i>
                                </button> 
                          
                            </div>  

                            <div class="card elevation-0">
                               
                                <div class="card-body table-responsive p-10" style="height: 100%;">
                                    <div  v-if="show_detil==true">
                                        <timeline-purchasing :data_pr=data_pr.no_permintaan></timeline-purchasing>
                                        <hr>
                                        <div class="card-header"> 
                                            <div class="row">
                                                <div class="col-12"> 
                                                        <!-- <img :src="data_rs['logo']" :alt="data_rs['logo']" class="brand-image img-circle elevation-0"
                                                    style="opacity: .8"> {{data_rs['nama_rs']}} -->
                                                  
                                                <h4>
                                                    <i class="">
                                                        <img :src="data_rs['logo']" height="40px" width="40px"/>
                                                    </i>  {{data_rs['nama_rs']}}
                                                <small class="float-right">
                                                    
                                                    <a :href= "'/printout-pr?data='+data_pr.no_permintaan" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a>
                                                    
                                                    <button type="button" @click="do_approval" class="btn btn-default bg-blue">
                                                        <i class="pi pi-check"> Setujui</i>
                                                    </button> 
                                                    <button type="button" @click="deleted_telaah(data_pr.no_permintaan)" class="btn btn-default bg-red">
                                                        <i class="pi pi-times"> Batalkan</i>
                                                    </button> 

                                                </small>
                                                </h4>
                                            </div>

                                            </div>
                                            <div class="flex align-items-center">
                                                <strong> Kepada YTH : </strong>
                                                <span v-for="data in pr_to">
                                                    <small>
                                                        <Chip :label="data.lokasi" class="mr-1" /></small>
                                                </span>
                                            </div>
                                            <br>
                                            <div class="row invoice-info">
                                                <div class="col-sm-6 invoice-col">
                                                    <address> 
                                                        <h6>
                                                        No: <strong> {{data_pr.no_permintaan}} </strong><br>
                                                        Dari :<strong> {{data_pr.lokasi}} #{{data_pr.tanggal}}</strong> <br>
                                                        <strong> Perihal : {{data_pr.perihal}}</strong>
                                                    </h6>
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body table-sm table-responsive"> 
                                            <div class="callout callout-primary elevation-0"> 
                                                    <p v-html="catatan" style="font-size: 15px;"></p>  
                                                    <div class="card-body table-sm table-responsive" v-if="detildata.length>0">  
                                                        <table class="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>NO</th>
                                                                    <th>BARCODE</th>
                                                                    <th>NAMA</th>
                                                                    <th>EST HARGA</th>
                                                                    <th>REQ</th>
                                                                    <th>DISETUJUI</th>
                                                                    <th>SATUAN</th>
                                                                    <th>SUBTOTAL</th>
                                                                    <th>CATATAN</th>
                                                                    <th>AKSI</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(row,index) in detildata">
                                                                    <td>{{ index+1 }}</td> 
                                                                    <td> {{row.barcode}}</td>
                                                                    <td style="width: 80%;">
                                                                        {{row.nama}} 
   
                                                                    </td>
                                                                    <td> 
                                                                        <!-- <InputNumber id="minmax" v-model="row.harga"
                                                                            autocomplete="off" 
                                                                            :minFractionDigits="0" @input="inputestimasi_harga(index)" mode="decimal" :min="0" /> -->
                                                                    
                                                                        <InputNumber :disabled="true" prefix="Rp. "
                                                                            style="text-align: right; width: 8em;" :minFractionDigits="2" :maxFractionDigits="2"
                                                                            v-model="row.harga" @input="inputestimasi_harga(index)" />
                                                                    </td>
                                                                    <td>
                                                                        <InputNumber :disabled="true" prefix=""
                                                                            style="text-align: right; width: 8em;" :minFractionDigits="0" :maxFractionDigits="0"
                                                                            v-model="row.qty" />
                                                                    </td>
                                                                    <td>
                                                                        <!-- <InputNumber id="minmax" v-model="row.qty_acc"
                                                                            autocomplete="off"
                                                                            :minFractionDigits="2" @input="inputestimasi_harga(index)" mode="decimal" :min="0" /> -->
                                                                        <InputNumber :disabled="true" prefix=""
                                                                            style="text-align: right; width: 8em;" :minFractionDigits="2" :maxFractionDigits="2" @input="inputestimasi_harga(index)"
                                                                            v-model="row.qty_acc" />
                                                                    </td>
                                                                    <td>{{row.satuan}}</td>
                                                                    <td>  
                                                                        <!-- <InputNumber id="minmax" v-model="row.sub_total"
                                                                            autocomplete="off" 
                                                                            :minFractionDigits="2" :disabled="true" mode="decimal" :min="0" /> -->
                                                                            <InputNumber :disabled="true" prefix=""
                                                                            style="text-align: right; width: 8em;" :minFractionDigits="2" :maxFractionDigits="2"
                                                                            v-model="row.sub_total" />
                                                                        </td>
                                                                    <td><InputText type="text" v-model="row.catatan" /></td>
                                                                    <td> <Button label="" class="btn p-btn-sm"
                                                                            @click="proses_telaah(row)" icon="pi pi-save" /></td>
                                                                </tr> 
                                                                <tr> 
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <th style="width:50%">Subtotal:</th>
                                                                        <td> <strong> {{ $numeral(totalamount, '0,0.00') }}</strong> </td>
                                                                </tr> 
                                                                <tr>
                                                                     <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <th></th>
                                                                    <td></td>
                                                                </tr> 
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <th></th>
                                                                    <td></td>
                                                                </tr>
                                                                
                                                        
                                                            </tbody>
                                                         
                                                        </table>
                                                        <!-- <div class="row"> 
                                                            <div class="col-5"> 
                                                            </div> 
                                                            <div class="col-6">
                                                                <div class="table-responsive">
                                                                    <table class="table">
                                                                        <tr>
                                                                            <th style="width:50%">Subtotal:</th>
                                                                            <td> <strong> {{ $numeral(totalamount, '0,0.00') }}</strong> </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Tax(11%)</th>
                                                                            <td>$10.34</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Total:</th>
                                                                            <td>$265.24</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div> 
                                                        </div>  -->
                                                     
                                                    </div> 
                                                    <p style="font-size:12.0pt">Demikian kami sampaikan, atas perhatiannya kami ucapkan terima kasih.</p>
                                                    <div class="row mt-300">
                                                        <div class="col-4"></div>
                                                        <div class="col-3"></div>
                                                        <div class="col-4">  
                                                        </div>
                                                    </div> 
                                            </div>
                                        </div>
                                     
                                        <disposisi-compenent :data_pr=data_pr></disposisi-compenent>
                                    </div> 

                                    <div v-if="show_detil==false"> 
                                        <span v-for="(data,index) in fact" >  
                                            <div  class="row callout callout elevation-1 post mb-1">
                                                <div class="col-md-1">
                                                    <div class="user-block" >
                                                        <img class="img-circle img-bordered-sm"
                                                            src="https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg"
                                                            alt="user image"> 
                                                    </div>  
                                                </div>
                                                <div class="col-md-2">
                                                    <span class="username" >
                                                      <strong> <a style="color: blue;" href="#" @click="openConfirmation(data)">{{ data.lokasi }}</a></strong> 
                                                        <button type="button" @click="open_form(data)" class="btn btn-default btn-sm">
                                                            <i class="fas fa-share"></i>
                                                        </button>
                                                    </span>
                                                    <span class="description"> 
                                                        {{data.tanggal}}
                                                    </span>
                                                </div>
                                                <div class="col-md-2">
                                                    <span class="description"> 
                                                        {{data.kategori}}
                                                    </span> 
                                                </div>
                                                <div class="col-md-2">
                                                    <span class="description"> 
                                                        <strong> {{data.perihal}}</strong>  
                                                    </span> 
                                                </div>
                                                <div class="col-md-2" >
                                                   <h5> <span class="badge badge-warning">Menunggu</span></h5>
                                                   <!-- <button type="button" class="btn btn-block btn-success btn-flat">Success</button> -->
                                                </div>
                                                <div class="col-md-2"  >
                                                    <a href="#" class="link-black text-sm">
                                                        <i class="far fa-comments mr-1"></i> Disposisi (5)
                                                    </a>
                                                </div> 
                                            </div>
                                           
                                        </span>
                                    </div> 
                                </div>
                                
                            </div>  
                        </div>
                    </div>

                </div>
            </div>
          
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Textarea from 'primevue/textarea';
    import Chip from 'primevue/chip';
    import QrcodeVue from 'qrcode.vue';  
    import InputNumber from 'primevue/inputnumber';
        export default {
        components: {
            Loading,
            Textarea,
            Chip,
            QrcodeVue,
            InputNumber,
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
                    mode: '',
                    no_permintaan: '',
                    lokasiSelected:'',
                    disposisi:'',
                    data:''
                },
                counting_telaah:{
                    inbox : 0,
                    blmacc : 0
                },
                windowHeight: window.innerWidth,
                isLoading: false,
                fullPage: true,
                displayConfirmation: false,
                catatan: '',
                data_pr: '',
                detildata: [],
                pr_to: [],
                show_detil:false,
                lokasi:[],
                pr_selected:'',
                totalamount:0,
                data_rs:'',
                 

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
           
        },
        computed:{
            formattedNumber(value) {
            // Example formatting: adding commas as thousand separators and fixing to 2 decimal places
            return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        },
        created() {
            //this.fetchData();

            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);

            if(params.get("data")!=null)
            {
                this.show_detil=true;
                this.form.no_permintaan = params.get("data");
                //this.getlist_pr(3);
                this.getlist_pr(1);
               
                //this.openConfirmation(datapr);
            }
            else
            {
                this.getlist_pr(3);
            }
         
            

            this.profile_rs();
           
            this.getlokasi();

            this.counting_data();
        },
        methods: {

            profile_rs()
            { 
                  axios.get('/data_rumahsakit',"")
                    .then(response => { 
                        
                    this.data_rs = response.data 
                    console.log(this.data_rs['nama_rs']);
                        
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            counting() {
                let amount = 0;
                for (let i = 0; i < this.detildata.length; i++) {
                    amount = amount + this.detildata[i].sub_total;
                }
                this.totalamount = amount;
            },
            inputestimasi_harga(index) {
                if (this.detildata[index] == "" || this.detildata[index] == null) {
                    this.detildata[index] = 0;
                }
                //this.detildata[index].harga = this.detildata[index];
                this.detildata[index].sub_total = this.detildata[index].qty_acc * this.detildata[index].harga;
                this.counting();
            },
            fetchData() {
                var currentDate = new Date();
            },
            onResize() {
                this.windowHeight = window.innerWidth 
            },
            convert_chart: function (stringText) {
                if (stringText == null) {
                    return "";
                } else {
                    // let res =  stringText.replace(/(\\r)*\\n/g, '<br>') 
                    // res =  res.replace(/\n\n/g, '<br>');
                    let res = stringText.replace(/\n/g, '<br>');
                    return res;
                }
            }, 
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },
            async forward_pr()
            {
                this.isLoading = true;
                var currentDate = new Date();
                this.form.startdate = currentDate;
                this.form.no_permintaan =  this.pr_selected.no_permintaan;
                await axios.post('/forward_pr', this.form)
                    .then(response => { 
                        this.isLoading = false 
                        this.closeConfirmation();
                        if(response.data.metadata.code==200)
                        { 
                            this.open("success",response.data.metadata.message); 
                        }
                        else
                        { 
                            this.open("danger",response.data.metadata.message);
                        }
                        
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            getdataby_inbox(mode)
            {  
                this.show_detil = false; 
                this.getlist_pr(mode)
            },
            async proses_telaah(row)
            {  
                await axios.post('/proses_telaah', row)
                    .then(response => { 
                        this.isLoading = false 
                        console.log(response.data)
                        if(response.data.metadata.code==200)
                        { 
                            this.open("success",response.data.metadata.message); 
                        }
                        else
                        { 
                            this.open("danger",response.data.metadata.message);
                        }
                        
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getlist_pr(mode) { 
               
                this.isLoading = true;
                this.form.mode = mode
                await axios.post('/getlist_pr', this.form)
                    .then(response => { 
                        if (mode > 1) {
                            this.fact = response.data.response.header
                        }
                        console.log(mode);
                        if (mode == 1) {
                            //.fact = response.data.response.header
                            this.detildata = response.data.response.details
                            this.pr_to = response.data.response.pr_to 
                            this.tandai_sudah_dibaca(this.pr_to[0]);  
                        }
                        this.isLoading = false

                        console.log('data fact');
                     
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getlokasi()
            {  
                await axios.get('/getlokasi-api',"")
                    .then(response => {
                        this.lokasi = response.data.response  
                        
                    })
                    .catch(error => {
                        console.log(error) 
                    })
                    .finally(() => this.isLoading = false)
            },

            async counting_data()
            {
                await axios.post('/counting_notif',"")
                    .then(response => {
                        this.counting_telaah = response.data.response  
                        console.log(this.counting_telaah);
                        console.log(response.data);
                        
                    })
                    .catch(error => {
                        console.log(error) 
                    })
                    .finally(() => this.isLoading = false)
            },

            async do_approval()
            { 
                //console.log(this.form);
                this.isLoading = true 
                await axios.post('/do_approval', this.form)
                    .then(response => {  
                        this.isLoading = false  
                        console.log(response.data)
                        
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message)
                            this.counting_data();
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message)
                        }
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
                    duration: 4000,
                    dismissible: true
                })
            },
            async deleted_telaah(nopr)
            {
                
                //this.form.no_permintaan = nopr
                //console.log(this.form);
                this.isLoading = true 
                await axios.post('/deleted_telaah', this.form)
                    .then(response => {  
                        this.isLoading = false  
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message)
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message)
                        }
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openConfirmation(pr) {
        
                this.form.no_permintaan = pr.no_permintaan
                this.catatan = pr.catatan;
                this.data_pr = pr;

                this.getlist_pr(1);

                this.show_detil = true;
            },
            closeConfirmation() {
                this.displayConfirmation = false;
            },
            open_form(data_pr)
            {
                console.log(data_pr);
                this.pr_selected = data_pr;
                this.displayConfirmation = true;
             
            },
            print() {
                //window.print();
            },
            async tandai_sudah_dibaca(data_pr)
            {

                await axios.post('/update_sudah_baca', data_pr)
                    .then(response => { 
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
<style>
    .ql-align-center {
        text-align: center;
    }


    .p-multiselect {
    min-width: 15rem;
}

:deep(.multiselect-custom) {
    .p-multiselect-label:not(.p-placeholder) {
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);

        img.flag {
            width: 17px;
        }
    }
}

</style>
 