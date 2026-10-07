 <template>
     <section class="content">
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

             <button class="btn btn-success mr-2" @click="get_riwayat_konsul()">
                 <i class="fa fa-refresh"></i> Get data
             </button>
             <!-- Table Card -->

             <DataTable :value="records" :paginator="true" :rows="10" :rowsPerPageOptions="[5,10,20]"
                 :responsiveLayout="'scroll'">

                 <Column field="no_konsul" header="No. Konsul" sortable></Column>
                 <Column field="noregister" header="No. Register" sortable></Column>
                 <Column field="jenis_konsul" header="Jenis" sortable></Column>
                 <Column field="nomr" header="NOMR" sortable></Column>

                 <Column header="Progress">
                     <template #body="slotProps">
                         <Tag v-if="slotProps.data.progress === 'C'" value="Selesai" severity="success" />
                         <Tag v-else value="Menunggu" severity="warning" />
                     </template>
                 </Column>
                 <Column field="tanggal" header="Tanggal" sortable></Column>
                 <Column header="Aksi">
                     <template #body="slotProps">
                         <button class="btn btn-success mr-2" @click="getdata_details(slotProps.data)">
                             <i class="fa fa-search"></i> Tampilkan
                         </button>
                     </template>

                 </Column>
             </DataTable>
         </div>


         <Dialog header="Detail Konsultasi" v-model:visible="ShowDetail" :modal="true" :style="{ width: '70vw' }"
             :closable="true">
             <div class="row">
                 <div class="col-md-6">
                     <h5>Data Konsultasi</h5>
                     <div class="form-group">
                         <label>No Konsul</label>
                         <p class="form-control-static">{{ data.no_konsul }}</p>
                     </div>
                     <div class="form-group">
                         <label>No Register</label>
                         <p class="form-control-static">{{ data.noregister }}</p>
                     </div>
                     <div class="form-group">
                         <label>Jenis Konsul</label>
                         <p class="form-control-static">{{ data.jenis_konsul }}</p>
                     </div>
                     <div class="form-group">
                         <label>Nomr</label>
                         <p class="form-control-static">{{ data.nomr }}</p>
                     </div>
                     <div class="form-group">
                         <label>Berat Badan (kg)</label>
                         <p class="form-control-static">{{ data.berat_badan }}</p>
                     </div>
                     <div class="form-group">
                         <label>Tinggi Badan (cm)</label>
                         <p class="form-control-static">{{ data.tinggi_badan }}</p>
                     </div>
                     <div class="form-group">
                         <label>IMT</label>
                         <p class="form-control-static">{{ data.imt }}</p>
                     </div>
                     <div class="form-group">
                         <label>Status Gizi</label>
                         <p class="form-control-static">{{ data.status_gizi }}</p>
                     </div>
                 </div>

                 <div class="col-md-6">
                     <h5>Detail Medis</h5>
                     <div class="form-group">
                         <label>DX Medis</label>
                         <p class="form-control-static">{{ data.dx_medis }}</p>
                     </div>
                     <div class="form-group">
                         <label>Pemeriksaan Lab</label>
                         <p class="form-control-static">{{ data.pemeriksaan_lab }}</p>
                     </div>
                     <div class="form-group">
                         <label>Pengobatan Penting</label>
                         <p class="form-control-static">{{ data.pengobatan_penting }}</p>
                     </div>
                     <div class="form-group">
                         <label>Diet Yang Dianjurkan</label>
                         <p class="form-control-static">{{ data.diet_yang_dianjurkan }}</p>
                     </div>
                     <div class="form-group">
                         <label>Biokimia Status</label>
                         <p class="form-control-static">{{ data.biokimia_status }}</p>
                     </div>
                     <div class="form-group">
                         <label>Biokimia Keterangan</label>
                         <p class="form-control-static">{{ data.biokimia_ket }}</p>
                     </div>
                     <div class="form-group">
                         <label>Klinik Status</label>
                         <p class="form-control-static">{{ data.klinik_status }}</p>
                     </div>
                     <div class="form-group">
                         <label>Klinik Keterangan</label>
                         <p class="form-control-static">{{ data.klinik_ket }}</p>
                     </div>
                     <div class="info-item full-width">
                         <label>Alergi Makanan</label>
                         <span class="info-value allergy-tags">
                             <span v-for="allergy in allergyList" :key="allergy" class="allergy-tag">
                                 <i class="fas fa-exclamation-triangle"></i>
                                 {{ allergy }}
                             </span>
                             <span v-if="allergyList.length === 0" class="no-allergy">
                                 <i class="fas fa-check-circle"></i>
                                 Tidak ada alergi
                             </span>
                         </span>
                     </div>
                     <div class="form-group">
                         <label>Pola Makan</label>
                         <p class="form-control-static">{{ data.pola_makan }}</p>
                     </div>
                 </div>
             </div>
         </Dialog>


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
         props: ['datapasien'], //SELAIN CPPT ADALAH SBAR
         data() {
             return {
                 fact: [],
                 form: {
                     startdate: '',
                     enddate: '',
                 },
                 isLoading: false,
                 fullPage: true,
                 records: [],
                 globalFilter: '',
                 filters: {},
                 ShowDetail: false,
                 data: []

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
             alergiMakananString() {
                try {
                    return JSON.parse(this.data.alergi_makanan).join(', ');
                } catch {
                    return this.data.alergi_makanan;
                }
            },
            allergyList() {
                try {
                    const parsed = JSON.parse(this.data.alergi_makanan);
                    return Array.isArray(parsed) ? parsed : [];
                } catch {
                    return this.data.alergi_makanan ? [this.data.alergi_makanan] : [];
                }
            },
             async getdata_details(row) {
                 this.ShowDetail = true;
                 this.data = row;
             },
             async get_riwayat_konsul() {

                 this.isLoading = true;
                 this.form.noregister = this.datapasien.NOPENDAFTARAN
                 this.form.mode = 2

                 await axios.post('/get_riwayat_konsul', this.form)
                     .then(response => {
                         this.isLoading = false
                         this.records = response.data.response

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
                     duration: 3000,
                     dismissible: true
                 })
             },
         },
     }

 </script>

 <style scoped>
     .card {
         border: none;
         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
     }

     .card-header {
         background-color: #f8f9fa;
         border-bottom: 1px solid #e9ecef;
     }

     .btn {
         border-radius: 0.375rem;
     }

     .btn-success {
         background-color: #198754;
         border-color: #198754;
     }

     .btn-success:hover {
         background-color: #157347;
         border-color: #146c43;
     }

     .p-inputgroup {
         margin-bottom: 1rem;
     }

     @media (max-width: 768px) {
         .w-50 {
             width: 100% !important;
         }

         .mr-2 {
             margin-bottom: 1rem;
         }
     }

 </style>
