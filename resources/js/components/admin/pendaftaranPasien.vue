 <template>
     <section class="content">
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            {{ os }}
             <div class="card patient-info-card mt-10">
                 <div class="card-header" style="background-color: seashell;">
                     <h5>Pendaftaran Pasien Baru</h5>
                 </div>
                 <div class="card-body">
                     <div class="row">
                         <div class="col-md-6">
                             <div class="form-group">
                                 <label class="font-bold">No Rekam Medis<span class="text-danger">*</span></label>
                                   <span class="text-danger" style="font-size: 9px;">Jika RM tidak diisi maka akan dibuat
                                     otomatis oleh sistem</span>
                                 <br />
                                 <InputText v-model="form.rm" style="width: 100%;" />

                             </div>
                             <div class="form-group">
                                 <label class="font-bold">Nama Pasien<span class="text-danger">*</span></label><br />
                                 <InputText v-model="form.nama_pasien" style="width: 100%;" />

                             </div>
                             <div class="form-group">
                                 <label class="font-bold">Nomor Kartu<span class="text-danger">*</span></label><br />
                                 <div class="input-group">
                                     <InputText id="noka" v-model="form.noka" placeholder="Masukkan Nomor Kartu BPJS"
                                         autocomplete="off" class="form-control" />
                                     <div class="input-group-append">
                                         <Button label="Cari" icon="pi pi-search" class="p-button p-button-primary" />
                                     </div>
                                 </div>
                             </div>
                             <div class="row">
                                 <div class="col-6">
                                     <div class="form-group">
                                         <label class="font-bold">Tanggal Lahir<span
                                                 class="text-danger">*</span></label><br>

                                         <Calendar v-model="form.tanggal_lahir" :showIcon="true" view="date"
                                             dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                             placeholder="Tanggal Lahir" class="w-100 calendar-high-z "
                                             appendTo="body" />

                                     </div>
                                 </div>
                                 <div class="col-6">
                                     <div class="form-group">
                                         <label class="font-bold">Usia<span class="text-danger">*</span></label><br>
                                         <InputNumber   style="text-align: right;  " v-model="form.usia"
                                             class="w-100 form-control" />
                                     </div>
                                 </div>
                             </div>
                             <div class="form-group">

                                 <label class="font-bold">Desa/Kelurahan<span class="text-danger">*</span></label><br />
                                 <Select id="jenis_akun" filter v-model="form.desaselected" @filter="getdata_lokasi" @change="pilihDesa"
                                     :options=datalokasi placeholder="Masukan 4 kata kunci untuk pencarian" optionLabel="id_desa"
                                     class="w-100" appendTo="body">
                                     <template #option="slotProps">
                                         <div class="flex items-center">
                                             <!-- <Tag  severity="success"
                                                 :value="slotProps.option.nama_desa"></Tag> -->
                                             <strong>{{ slotProps.option.nama_desa }}</strong>
                                             <small>
                                                 <div
                                                     style="white-space: normal; width: 500px; overflow-wrap: break-word">
                                                    {{ slotProps.option.namaprovinsi }} >
                                                     {{ slotProps.option.nama_kabkota }} >
                                                     {{ slotProps.option.nama_kecamatan }}
                                                 </div>
                                             </small>
                                         </div>
                                     </template>
                                 </Select>
                             </div>
                               <div class="form-group">
                                 <label class="font-bold">Alamat<span class="text-danger">*</span></label><br />
                                 <InputText v-model="form.alamat" style="width: 100%;" />
                             </div>
                         </div>

                         <div class="col-md-6">
                             <div class="form-group">
                                 <label class="font-bold">Jenis Kelamin<span class="text-danger">*</span></label><br />
                                 <Select id="jenis_akun" v-model="form.jeniskelamin"
                                     :options="['L','P']" placeholder="Pilih jenis kelamin"
                                     class="w-100" />
                                      <span class="text-danger" style="font-size: 9px;"> </span>
                             </div>
                             <div class="form-group">
                                 <label class="font-bold">Jenis Kelamin<span class="text-danger">*</span></label><br />
                                 <Select id="jenis_akun" v-model="form.jeniskelamin"
                                     :options="['LAKI-LAKI','PEREMPUAN']" placeholder="Pilih Desa kelurahan"
                                     class="w-100" />
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
          import Tag from 'primevue/tag'
     export default {
         components: {
             Loading,
             Tag
         },
         props: {
             msg: String,
             os: Object
         },
         data() {
             return {
                 fact: [],
                 form: {
                     startdate: '',
                     enddate: '',
                     tanggal_lahir: null,
                     usia:0,
                     alamat:'',
                     nama_pasien:'',
                     noka:''
                 },
                 isLoading: false,
                 fullPage: true,
                 datalokasi: []
             };
         },
         mounted() {
             var currentDate = new Date();
             this.form.startdate = currentDate;
             this.setdata();
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

             setdata()
             {
                this.form.nama_pasien =this.os?.nama;
                this.form.noka = this.os?.noKartu
                this.form.tanggal_lahir =this.formatDateForDisplay(this.os?.tglLahir)
                this.form.jeniskelamin = this.os?.sex
             },
             async getdata_lokasi(event) {
                 const query = event.value;
                 if (!query || query.length < 4) {
                     this.datalokasi = [];
                     return;
                 }
                 this.form.mode = 1
                 this.form.nama_desa = query

                 await axios.post('/getdatakec', this.form)
                     .then(response => {
                         this.datalokasi = response.data

                     })
                     .catch(error => {
                         console.log(error)
                         this.isLoading = false
                     })
                     .finally(() => this.isLoading = false)
             },
            formatDateForDisplay(dateString) {
               if (!dateString) return "";

                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) return "";

                    return date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                    });
                } catch (error) {
                    console.error('Error formatting Indonesian date:', error);
                    return "";
                }
            },
            pilihDesa(value)
            {
                this.form.alamat = this.form.desaselected['nama_desa'];
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
     }

 </script>


 <style scoped>
     .patient-info-card {
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
         border: none;
         border-radius: 10px;
         overflow: hidden;
     }

     .input-group-append {
         display: flex;
     }

     .input-group-append .p-button {
         border-top-left-radius: 0;
         border-bottom-left-radius: 0;
         margin-left: -1px;
     }

     .calendar-high-z .p-datepicker {
         z-index: 9999 !important;
     }

     /* Or target the overlay specifically */
     .p-datepicker-panel {
         z-index: 9999 !important;
     }

 </style>
