<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
 <!-- {{ fact }} -->
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body "> 
                   
                    <div class="row">
                        <div class="col-md-11">
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Tanggal Masuk</label><br />
                                </div>
                                <div class="col-md-8">
                                    <Calendar v-model="form.tanggal_masuk" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true"  :showTime="true" yearRange="2000:2030"
                                        aria-placeholder="Tanggal awal" style="width: 15em; " /> 
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Tanggal pulang</label><br />
                                </div>
                                <div class="col-md-2">
                                    <Calendar v-model="form.tanggal_pulang" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true"  :showTime="true" yearRange="2000:2030"
                                        aria-placeholder="Tanggal awal" style="width: 15em;" /> 
                                </div>
                                <div class="col-md-3">
                                  <b> {{ datamasuk.display }}</b>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Anamnesa</label><br />
                                </div>
                                <div class="col-md-8">
                                    <!-- <input id="keluhanutama" v-model="form.anamnesis" class="form-control"
                                        autocomplete="off" type="text" placeholder="anamnesis"> -->
                                    <Textarea id="anamnesis" v-model="form.anamnesis" style="width: 100%;" rows="5" cols="30" />
                                </div>
                            </div> 

                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Riwayat Penyakit</label><br />
                                </div>
                                <div class="col-md-8">
                                    <!-- <input id="keluhanutama" v-model="form.anamnesis" class="form-control"
                                        autocomplete="off" type="text" placeholder="anamnesis"> -->
                                    <Textarea id="anamnesis" v-model="rawayat_penyakit" style="width: 100%;" rows="5" cols="30" />
                                </div>
                            </div> 

                           
                       
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Teraphy yang pernah diberikan</label><br />
                                </div>
                                <div class="col-md-8">
                                   <span v-for="data in arr_hisobat_penunjang.obatan">
                                            <Badge :value="data.NAMA" severity="success" class="mr-2"></Badge> 
                                   </span>
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Penunjang</label><br />
                                </div>
                                <div class="col-md-8">
                                   <span v-for="data in arr_hisobat_penunjang.lab">
                                            <Badge :value="data.NAMA" severity="info" class="mr-2"></Badge> 
                                   </span>
                                   <span v-for="data in arr_hisobat_penunjang.radiologi">
                                            <Badge :value="data.NAMA" severity="info" class="mr-2"></Badge> 
                                   </span>
                                </div>
                            </div>
                            <hr/>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Pemeriksaan Fisik</label><br />
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="keluhanutama">Tensi</label><br />
                                        <input id="keluhanutama" v-model="form.tensi" autocomplete="off"
                                            class="form-control" type="text" placeholder="Tensi">

                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="keluhanutama">Skala Nyeri</label><br />
                                        <input id="keluhanutama" v-model="form.skala_nyeri" autocomplete="off"
                                            class="form-control" type="text" placeholder="Skala Nyeri"> 
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="keluhanutama">Nadi /menit</label><br />
                                        <input id="keluhanutama" v-model="form.nadipermenit" autocomplete="off"
                                            class="form-control" type="text" placeholder="Skala Nyeri">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="saturasi">Saturasi O2(%)</label><br />
                                        <input id="saturasi" v-model="form.saturasi" class="form-control" type="text"
                                            placeholder="Saturasi"> 
                                    </div>
                                </div>
                             
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="respirasi">Respirasi/Menit</label><br />
                                        <input id="respirasi" autocomplete="off" v-model="form.respirasi"
                                            class="form-control" type="text" placeholder="Respirasi">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="saturasi">Suhu</label><br />
                                        <input id="saturasi" v-model="form.suhu" class="form-control" type="text"
                                            placeholder="Saturasi">

                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Diagnosa Utama</label><br />
                                </div>
                                <div class="col-md-8">
                                    <input id="keluhanutama" v-model="form.dxutama" class="form-control"
                                        autocomplete="off" type="text" placeholder="Dx utama">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Diagnosa Sekunder</label><br />
                                </div>
                                <div class="col-md-8">
                                    <input id="keluhanutama" v-model="form.dxskunder" class="form-control"
                                        autocomplete="off" type="text" placeholder="Dx Skunder">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Kondisi Saat Pulang</label><br />
                                </div>
                                <div class="col-md-3">
                                    <Select v-model="form.kondisiSaatpulangSelected" @change="jenis_kll_atau_meninggal" style="width: 100%;" class="mr-2"
                                        :options="kondisiSaatPulang" optionLabel="name" :filter="false"
                                        placeholder="Kondisi pulang" :showClear="false">
                                        <template #option="slotProps">
                                            <div class="p-dropdown-car-option">
                                                <span>{{slotProps.option.name}}</span>
                                            </div>
                                        </template>
                                    </Select>
                                </div>
                                <div class="col-md-3">
                                    <!-- <Button label="Update" @click="getdata_resume_pulang_pasien" icon="pi pi-check" class="p-button-sm p-button-success"  />  -->
                                </div>
                            </div>
                            <div class="row mt-3" v-if="datapasien.KLL=='1'">  
                              <div class="col-md-3">
                                  <label for="keluhanutama">No Laporan Polisi</label><br />
                              </div>
                              <div class="col-md-3">
                                  <input id="keluhanutama" v-model="form.NOLP" class="form-control"
                                      autocomplete="off" type="text" placeholder="Nomor Laporan Polisi">
                              </div> 
                            </div>
                            <div class="row mt-3" v-if="jenis_meninggal_atau_kll==4">
                                <div class="col-md-3">
                                    <label for="keluhanutama">No Surat meninggal</label><br />
                                </div>
                                <div class="col-md-3">
                                    <input id="keluhanutama" v-model="form.nomor_ref" class="form-control"
                                        autocomplete="off" type="text" placeholder="Nomor Surat meninggal">
                                </div>
                                <div class="col-md-3">
                                    <Calendar v-model="form.tgl_meninggal" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"  :showTime="true"
                                        aria-placeholder="Tanggal awal"  style="width: 15em;" /> 
                                </div>
                            </div>
                          
                            <div class="row mt-3">
                                <div class="col-md-3">
                                    <label for="keluhanutama">Teraphy</label><br /> 
                                </div>
                                <div class="col-md-8">
                                    <table class="table table-sm tb-sm table-bordered table-striped small-table">
                                        <thead>
                                            <tr> 
                                                <th>NO</th>
                                                <th>NAMA</th>
                                                <th>QTY</th>
                                                <th>SATUAN</th>
                                                <th>CARA PAKAI</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data,index) in detils_obat">
                                                <td>{{ index+1 }}</td> 
                                                <td>{{ data.NAMABARANG }}</td>
                                                <td>{{ data.QTY }}</td>
                                                <td>{{ data.SATUAN }}</td>
                                                <td>{{ data.REMARK_ITEM }}</td>
                                            
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-3">
                                  
                                </div>
                                <div class="col-md-8">
                                    <Button label="Simpan" @click="simpandata_resume" icon="pi pi-check p-btn-success" class="p-button-sm"  />
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
    import Badge from 'primevue/badge';
    import dayjs from 'dayjs';
    export default {
        components: {
            Loading,
            Textarea,
            Badge
        },
        props: {
            msg: String,
        },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                detils_obat:[],
                jenis_meninggal_atau_kll:0,
                kondisiSaatPulang: [{
                        code: 1,
                        name: 'Sembuh/Atas Persetujuan Dokter',
                    },
                    {
                        code: 2,
                        name: 'Dirujuk',
                    },
                    {
                        code: 3,
                        name: 'Atas Permintaan Sendiri',
                    },
                    {
                        code: 4,
                        name: 'Meninggal',
                    },
                    {
                        code: 5,
                        name: 'Lain-Lain',
                    },
                    {
                        code: 6,
                        name: 'Batalkan Pulang',
                    }
                ],
                dataresume_medis:[],
                arr_hisobat_penunjang:[],
                datamasuk:{
                    LOS:0,
                    jam:0,
                    masuk:'',
                    keluar:'',
                    display:''
                },
                form: {
                    check_triase: [],
                    noregister: '',
                    waktu_masuk: '',
                    waktu_pulang:'',
                    diantar_oleh: '',
                    transportasi: '',
                    keluhan_utama: '',
                    suhu: '',
                    tensi: '', 
                    nadipermenit: '',
                    skala_nyeri:'',
                    saturasi: '',
                    respirasi: '',
                    catatanpenting: '',
                    anamnesis: '',
                    dxutama: '',
                    dxskunder: '',
                    tanggal_pulang:null,
                    tanggal_masuk:null,
                    tanggalrencana_kontrol:null,
                    kondisiSaatpulangSelected: null,
                    nomor_ref:'',
                    NOLP:'',
                    tgl_meninggal:'',
                    nomr:'',
                    kdcarabayar:'',
                    nosep:'', 
                    kll:'',
                    
                },
                param: {
                    NOPENDAFTARAN:'',
                    RECEIPT_NO: '',
                    UpdateisObatPulang: false,
                    MODE:'OBAT_PULANG'
                },
                isLoading: false,
                fullPage: true,
                rawayat_penyakit:'',
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.tanggal_pulang = currentDate;
           
        },
        created() {
            //this.fetchData();
            this.getdetail_sales();
            this.getdata_resume_pulang_pasien(); 
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
                
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
            async simpandata_resume()
            {  
                if(this.form.kondisiSaatpulangSelected==null)
                {
                    this.open("warning","Silahkan pilih cara pulang pasien")
                    return;
                }
                this.isLoading = true
                this.form.noregister =this.datapasien.NOPENDAFTARAN; 
                this.form.kdcarabayar=this.datapasien.KODECARABAYAR; 
                this.form.nosep = this.datapasien.NOSEP; 
                this.form.nomr = this.datapasien.NOMR;
                this.form.kll= this.datapasien.KLL;
                await axios.post('/simpan_resume_pulang', this.form)
                    .then(response => { 
                        this.isLoading = false   
                        console.log(response.data)
                        if(response.data.metadata.code ==200)
                        {
                            this.open("success",response.data.metadata.message)
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message)
                        } 

                        this.getdata_resume_pulang_pasien();
                        
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            jenis_kll_atau_meninggal(e)
            { 
                this.jenis_meninggal_atau_kll = e.value['code'];
            },
            async getdata_resume_pulang_pasien()
            {
                this.isLoading = true
                this.form.noregister =this.datapasien.NOPENDAFTARAN; 
                //this.param.RECEIPT_NO = RECEIPT_NO;  
                await axios.post('/getdata_resume_pulang_pasien', this.form)
                    .then(response => { 
                        this.fact = response.data
                        // this.dataresume_medis = response.data.response   
                        // this.form.suhu =response.data.response.suhu  
                        // this.form.tensi =response.data.response.tensi   
                        // this.form.respirasi =response.data.response.respirasi_perm   
                        // this.form.saturasi =response.data.response.sp2o   
                        // this.form.nadipermenit =response.data.response.nadi_permenit   
                        // this.form.anamnesis =response.data.response.subjek   
                        // this.form.skala_nyeri =response.data.response.skala_nyeri
                        // this.form.dxutama=response.data.response.asesmen;
                     
                        // this.datamasuk=response.data.datamasuk; 

                        // this.form.tanggal_masuk = dayjs(this.datamasuk.masuk).format('DD-MM-YYYY HH:mm');

                        // this.rawayat_penyakit =response.data.rawayat_penyakit; 

                        // this.form.tanggal_pulang = dayjs(this.datamasuk.keluar).format('DD-MM-YYYY HH:mm');  

                        // var plan = this.kondisiSaatPulang.filter(x => x.name==response.data.response.plan);
                        // //console.log(plan[0])

                        //  this.form.kondisiSaatpulangSelected =plan[0];  

                        // this.isLoading = false  

                        // this.history_obat_penunjang();
                  
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }, 
            async getdetail_sales() {
                this.isLoading = true
                this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN; 
                //this.param.RECEIPT_NO = RECEIPT_NO;
        

                await axios.post('/data_obat_pulang', this.param)
                    .then(response => {
                        this.detils_obat = response.data.response   
                        this.isLoading = false  
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async history_obat_penunjang()
            {
                this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN; 
                //this.param.RECEIPT_NO = RECEIPT_NO;
               
                await axios.post('/history_obat_penunjang', this.param)
                    .then(response => {

                        this.arr_hisobat_penunjang = response.data.response   
                        console.log(this.arr_hisobat_penunjang);
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
 