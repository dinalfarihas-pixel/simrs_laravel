 <template>
     <section class="content">
         <div class="container-fluid">
             <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

             <div class="card">
                 <div class="card-header">
                     <h3 class="card-title">Parameter</h3>
                 </div>
                 <div class="card-body">
                     <label for="noka" class="font-bold">Nomor Kartu BPJS/NIK <span class="text-danger">*</span></label>
                     <InputText id="noka" v-model="form.noka" placeholder="Nomor Kartu" autocomplete="off"
                         class="p-valid" />
                     <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                         dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                         aria-placeholder="Tanggal awal" style="width: 12em; " />
                     <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                         :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                         style="width: 12em; " />
                     <Button label="Tampilkan" align="" @click="get_historis_pelayanan_bpjs()" icon="pi pi-check"
                         class="p-button" />
                 </div>
             </div>

             <div class="card">

                 <div v-if="fact.length === 0" class="no-data">
                     <i class="pi pi-info-circle" style="font-size: 24px; margin-bottom: 10px;"></i>
                     <p>Tidak ada data riwayat SEP</p>
                 </div>

                 <div v-else>
                     <div v-for="(item, index) in fact" :key="item.noSep" class="sep-item" >
                         <div class="sep-row">
                             <div class="sep-main-info">
                                 <div class="sep-title">{{ item.namaPeserta }}</div>
                                 <div class="sep-subtitle sep-title">{{ item.noSep }} • {{ item.noKartu }}</div>
                                 <div class="sep-details">
                                     <span><i class="pi pi-calendar"></i> Tgl masuk {{ formatDate(item.tglSep) }}</span>
                                     <span><i class="pi pi-home"></i> {{ item.ppkPelayanan }}</span>
                                     <span><i class="pi pi-tag"></i> {{ item.poli }}</span>
                                     <span class="sep-badge">{{ item.kelasRawat }}</span>
                                 </div>
                             </div>

                             <div class="sep-meta">
                                 <div class="sep-date"> Pulang {{ formatDateShort(item.tglPlgSep) }}</div>
                                 <div class="sep-status">
                                     {{ item.jnsPelayanan === '2' ? 'Rawat Jalan' : 'Rawat Inap' }}</div>
                                 <div class="sep-actions">
                                     <!-- <button class="action-btn edit-btn" @click.stop="editSep(item)">
                                         <i class="pi pi-pencil"></i> Edit
                                     </button> -->
                                     <button class="action-btn view-btn" @click.stop="hapus_sep(item)">
                                         <i class="pi pi-eye"></i> Hapus
                                     </button>
                                 </div>
                             </div>
                         </div>

                         <div style="margin-top: 8px; font-size: 12px; color: #6c757d;">
                             <strong>Diagnosa:</strong> {{ item.diagnosa }}
                             <span v-if="item.noRujukan" style="margin-left: 20px;">
                                 <strong>No. Rujukan:</strong> {{ item.noRujukan }}
                             </span>
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
                     noka: ''
                 },
                 isLoading: false,
                 fullPage: true,
             };
         },
         mounted() {
             var currentDate = new Date();
             this.form.startdate = currentDate;
             this.form.enddate = currentDate;
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
             async get_historis_pelayanan_bpjs() {
                 this.isLoading = true;
                 await axios.post('/get_historis_pelayanan_bpjs', this.form)
                     .then(response => {
                         this.fact = [];
                         if (response.data.metaData.code == "200") {
                             console.log(response.data.response);
                             this.fact = response.data.response.histori;
                             //this.showOtorisasi = true;  
                         } else {
                             this.open('warning', response.data.metaData.message);
                         }
                     })
                     .catch(error => {
                         console.log(error);
                     })
                     .finally(() => {
                         this.isLoading = false;
                     });
             },
             formatDate(dateString) {
                 const date = new Date(dateString);
                 return date.toLocaleDateString('id-ID', {
                     day: '2-digit',
                     month: 'short',
                     year: 'numeric'
                 });
             },

             formatDateShort(dateString) {
                 const date = new Date(dateString);
                 return date.toLocaleDateString('id-ID', {
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric'
                 });
             },
            async hapus_sep(item) { 
               
                this.isLoading = true;
                 const param = {
                    nosep:item.noSep
                 } 
                
                await axios.post('/hapus_sep', param)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metaData.code == "200") {
                           
                            this.fact = response.data.response.histori;
                            this.open("success","Berhasih dihapus")
                            this.get_historis_pelayanan_bpjs();
                            //this.showOtorisasi = true;  
                        } else {
                            this.open('warning', response.data.metaData.message); 
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
             },
             open(type, message) {
                 this.$toast.open({
                     message: message,
                     position: 'top-right',
                     type: type,
                     duration: 6000,
                     dismissible: true
                 })
             },
         },
     }

 </script>
 <style scoped>
     body {

         margin: 0;
         padding: 20px;
     }



     .sep-item {
         border-bottom: 1px solid #e9ecef;
         padding: 16px 20px;
         transition: background-color 0.2s ease;
         cursor: pointer;
     }

     .sep-item:hover {
         background-color: #f8f9fa;
     }

     .sep-item:last-child {
         border-bottom: none;
     }

     .sep-row {
         display: flex;
         justify-content: space-between;
         align-items: center;
         flex-wrap: wrap;
         gap: 10px;
     }

     .sep-main-info {
         flex: 1;
         min-width: 300px;
     }

     .sep-title {
         font-size: 16px;
         font-weight: 600;
         color: #2c3e50;
         margin-bottom: 4px;
     }

     .sep-subtitle {
         font-size: 13px;
         color: #6c757d;
         margin-bottom: 8px;
     }

     .sep-details {
         display: flex;
         flex-wrap: wrap;
         gap: 15px;
         font-size: 12px;
         color: #6c757d;
     }

     .sep-meta {
         display: flex;
         flex-direction: column;
         align-items: flex-end;
         gap: 8px;
         min-width: 120px;
     }

     .sep-date {
         font-size: 14px;
         color: #495057;
         font-weight: 500;
     }

     .sep-status {
         font-size: 12px;
         color: #6c757d;
     }

     .sep-actions {
         display: flex;
         gap: 8px;
     }

     .action-btn {
         padding: 6px 12px;
         border-radius: 4px;
         font-size: 12px;
         font-weight: 500;
         border: none;
         cursor: pointer;
         transition: all 0.2s ease;
     }

     .edit-btn {
         background-color: #e9ecef;
         color: #6c757d;
     }

     .edit-btn:hover {
         background-color: #dee2e6;
         color: #495057;
     }

     .view-btn {
         background-color: #17a2b8;
         color: white;
     }

     .view-btn:hover {
         background-color: #138496;
     }

     .sep-badge {
         display: inline-block;
         padding: 2px 8px;
         background-color: #e3f2fd;
         color: #1976d2;
         border-radius: 12px;
         font-size: 11px;
         font-weight: 500;
     }

     .no-data {
         text-align: center;
         padding: 40px;
         color: #6c757d;
     }

     @media (max-width: 768px) {
         .sep-row {
             flex-direction: column;
             align-items: flex-start;
         }

         .sep-meta {
             align-items: flex-start;
             width: 100%;
         }

         .sep-actions {
             margin-top: 10px;
         }

         .sep-details {
             font-size: 11px;
         }
     }

 </style>
