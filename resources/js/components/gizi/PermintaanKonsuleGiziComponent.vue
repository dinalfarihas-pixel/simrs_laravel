 <template>
     <section class="content"> 
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

             <div class="card">
                 <div class="card-body">
                     <h5 class="mb-3">Mohon Dilakukan</h5>

                   <!-- Radio Button PrimeVue -->
                    <div class="form-group d-flex gap-3">
                    <div class="flex align-items-center">
                        <RadioButton
                        inputId="analisis"
                        name="mohonDilakukan"
                        value="analisis"
                        v-model="form.mohonDilakukan"
                        />
                        <label for="analisis" class="ml-1">Analisis Asupan Makanan</label>
                    </div>
                    <div class="flex align-items-center ml-1">
                        <RadioButton
                        inputId="konseling"
                        name="mohonDilakukan"
                        value="konseling"
                        v-model="form.mohonDilakukan"
                        />
                        <label for="konseling" class="ml-1">Konseling Gizi</label>
                    </div>
                    </div>

                     <!-- Berat & Tinggi Badan -->
                     <div class="form-row">
                         <div class="form-group col-md-6">
                             <label>Berat Badan</label>
                             <div class="input-group">
                                 <input type="number" class="form-control" v-model="form.beratBadan" />
                                 <div class="input-group-append">
                                     <span class="input-group-text">kg</span>
                                 </div>
                             </div>
                         </div>

                         <div class="form-group col-md-6">
                             <label>Tinggi Badan</label>
                             <div class="input-group">
                                 <input type="number" class="form-control" v-model="form.tinggiBadan" />
                                 <div class="input-group-append">
                                     <span class="input-group-text">cm</span>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <!-- Diagnosa Medis -->
                     <div class="form-group">
                         <label>Diagnosa Medis</label>
                         <input type="text" class="form-control" v-model="form.diagnosaMedis" />
                     </div>

                     <!-- Pemeriksaan Lab -->
                     <div class="form-group">
                         <label>Pemeriksaan Laboratorium</label>
                         <textarea class="form-control" rows="3" v-model="form.pemeriksaanLab"></textarea>
                     </div>

                     <!-- Pengobatan Penting -->
                     <div class="form-group">
                         <label>Pengobatan Penting</label>
                         <input type="text" class="form-control" v-model="form.pengobatanPenting" />
                     </div>

                     <!-- Diet -->
                     <div class="form-group">
                         <label>Diet Yang Dianjurkan</label>
                         <input type="text" class="form-control" v-model="form.diet" />
                     </div>

                     <!-- Button -->
                     <div class="text-center">
                         <button class="btn btn-success mr-2" @click="simpan_konsul">
                             <i class="fa fa-save"></i> Simpan
                         </button>
                         <button class="btn btn-danger" @click="reset">
                             <i class="fa fa-times"></i> Batal
                         </button>
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
        props: ['datapasien'],  //SELAIN CPPT ADALAH SBAR
         data() {
             return {
                 fact: [],
                 form: {
                    mohonDilakukan: "konseling",
                    beratBadan: "",
                    tinggiBadan: "",
                    diagnosaMedis: "",
                    pemeriksaanLab: "",
                    pengobatanPenting: "",
                    diet: "",
                    noregister:"",
                    nomr:""
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
             simpan() {
                console.log("Data disimpan:", this.form);
                    alert("Data berhasil disimpan!");
                },
                async simpan_konsul() {

                    this.isLoading = true; 
                    this.form.noregister = this.datapasien.NOPENDAFTARAN
                    this.form.nomr = this.datapasien.NOMR

                    await axios.post('/simpan_konsul', this.form)
                        .then(response => {  
                            this.isLoading = false   

                            if(response.data.code == 200)
                            {
                                this.open('success',response.data.message)
                                this.reset();
                            }
                            else
                            {
                                this.open('warning',response.data.message)
                            }

                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => this.isLoading = false)
                },
                reset() {
                    this.form = {
                        mohonDilakukan: "",
                        beratBadan: "",
                        tinggiBadan: "",
                        diagnosaMedis: "",
                        pemeriksaanLab: "",
                        pengobatanPenting: "",
                        diet: "",
                    };
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
