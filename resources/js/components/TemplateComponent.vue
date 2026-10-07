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
                         aria-placeholder="Tanggal awal" style="width: 20em; " />
                    <Select v-model="form.selectedJenisRawat" style="width: 8em;" :options="jenisRawat"
                        optionLabel="code" placeholder="Pilih jenis rawat" filterPlaceholder="" />
                     <button class="btn-aksi btn-aksi-default btn-sm"
                                                @click="notify('warning', 'Data berhasil disimpan', 'Berhasil')" title="Siriraj Skor"></button>
                 </div>
             </div>

         </div>
     </section>
 </template>

 <script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../bus';
     export default {
         components: {
             Loading,
             EventBus
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

         },
         methods: {
             fetchData() {
                 var currentDate = new Date();
                 console.log(this.form.startdate);
             },
            notify(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
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
         async Getdata() {
             this.isLoading = true
             await axios.post('/monitoring_klaim', this.form)
                 .then(response => {
                     this.fact = response.data.response
                     this.summary_klaim = response.data.summary.rincian
                     this.grand_total = response.data.summary.total
                     this.isLoading = false
                     this.counting_summary();
                 })
                 .catch(error => {
                     console.log(error)
                 })
                 .finally(() => this.isLoading = false)
         }
     }

 </script>
