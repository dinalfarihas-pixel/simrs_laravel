 <template>
     <section class="content">
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
             <div class="row">
                 <div class="col-md-12">
                     <div class="card">
                         <div class="card-header">
                             <h3 class="card-title">Data kunjungan pasien harian UPDATE ssss</h3>
                         </div>
                         <div class="card-body">
                             <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                 dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                 aria-placeholder="Tanggal awal" style="width: 20em;   " />
                             <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check"
                                 class="p-button" />
                         </div>
                     </div>
                 </div>
             </div>
             <div class="card">
                 <div class="card-header">
                     <h3 class="card-title">Jenis Poliklinik</h3>
                 </div>
                 <div class="card-body">
                     <div class="row">
                         <div class="col-md-3 col-sm-6 col-12" v-for="data in fact.response">
                             <div :class=data.COLOR>
                                 <span class="info-box-icon"><i class="far fa-bookmark"></i></span>
                                 <div class="info-box-content">
                                     <span class="info-box-text"><strong>
                                             <h5>{{ data.NAMA }}</h5>
                                         </strong></span>
                                     <span class="info-box-number">
                                         <h5>Jml : {{ data.JML }} dilayani : {{ data.SELESAI_BEROBAT }} </h5>
                                     </span>
                                     <div class="progress">
                                         <div class="progress-bar" :style={width:data.PERSENTASE_CAP}></div>
                                     </div>
                                     <span class="progress-description">
                                         Selesai {{data.PERSENTASE_CAP }}
                                     </span>
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
             this.fetchData(); 
         },
         created() {
             //this.fetchData();

         },
         methods: {
             async fetchData() {
                 const dataform = new FormData();
                 this.isLoading = true;
                 await axios.post('/datakunjunganharian', this.form)
                     .then(response => {
                         this.fact = response.data
                         this.isLoading = false
                         //this.summTotal(this.fact);
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
