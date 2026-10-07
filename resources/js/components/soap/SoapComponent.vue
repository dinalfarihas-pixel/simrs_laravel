<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <ConfirmDialog :group="confirmGroup"></ConfirmDialog>
            <Dialog header="Pengisian Soap" v-model:visible="showModal"
                :containerStyle="{width: '70vw'}"
                :contentStyle="{height: '70vh', overflowY: 'auto'}"
                position="center"
                :modal="true">


                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"> <strong>
                                <p class="text-muted">Pasien :{{ datapasien.NAMAPASIEN }}
                                    ({{ datapasien.JENISKELAMIN }}) - ({{ datapasien.USIA_PASIEN.tahun }}T
                                    -{{ datapasien.USIA_PASIEN.bulan }}B- {{ datapasien.USIA_PASIEN.hari }}H)</p>
                            </strong> </h3>
                            {{ form.lokasi }}
                    </div>
                    <div class="card-body">
                        <div class="field col-12 md:col-4">

                            <table class="table" style="width: 70%;">
                                <thead>
                                    <tr>
                                        <td style="width: 5em;"><strong> Tanggal </strong> </td>
                                        <td>
                                            <DatePicker v-model="form.tglsoap" showTime hourFormat="24"
                                                dateFormat="dd/mm/yy" placeholder="Pilih tanggal & jam" />
                                        </td>
                                        <td>
                                            <Button class="p-button p-button-sm p-button-success"
                                                v-tooltip.top="'Tanggal dan Jam Sekarang'" icon="pi pi-stopwatch"
                                                @click="tanggal_skrg()" label="" />
                                            <Button class="p-button p-button-sm p-button-default"
                                                v-tooltip.top="'Ambil data soap terakhir'" icon="pi pi-copy"
                                                v-if="data_igd==null" @click="ambil_soap_terakhir()"
                                                label="Soap Terakhir" />

                                            <Button class="p-button p-button-sm p-button-success" v-if="data_igd!=null"
                                                v-tooltip.top="'Ambil ttv terakhir'" icon="pi pi-copy"
                                                @click="auto_input_igd()" label="TTV" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> Suhu </strong> </td>
                                        <td>
                                            <InputNumber id="temperature" :minFractionDigits="1" v-model="form.suhu"
                                                prefix="↑ " suffix="℃" :min="0" :max="50" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> Tensi </strong> </td>
                                        <td>
                                            Sys :
                                            <InputNumber id="sistole" :minFractionDigits="0" v-model="form.sistole"
                                                suffix=" mmHg" :min="0" :max="300" />
                                        </td>
                                        <td>
                                            Ds
                                            <InputNumber id="diastole" :minFractionDigits="0" v-model="form.diastole"
                                                suffix=" mmHg" :min="0" :max="300" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> Nadi </strong> </td>
                                        <td>
                                            <InputNumber id="nadi" :minFractionDigits="0" v-model="form.nadi"
                                                suffix=" x/Menit" :min="0" :max="300" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> GCS </strong> </td>
                                        <td>
                                            <InputNumber id="gcs" :minFractionDigits="0" v-model="form.gcs" suffix=" "
                                                :min="0" :max="300" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> SPo2 </strong> </td>
                                        <td>
                                            <InputNumber id="nadi" :minFractionDigits="0" v-model="form.spo2"
                                                suffix=" %" :min="0" :max="300" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 5em;"><strong> Pernapasan </strong> </td>
                                        <td>
                                            <InputNumber id="nadi" :minFractionDigits="0" v-model="form.pernafasan"
                                                suffix=" x/Menit" :min="0" :max="300" />
                                        </td>
                                    </tr>

                                </thead>
                            </table>
                        </div>
                        <hr>
                        <div class="field col-12 md:col-6">
                            <div class="row">
                                <div class="col-md-3">
                                    <h5>Apakah Pasien menggunakan alat bantu nafas?</h5>
                                </div>
                                <div class="col-md-4">
                                    <Select v-model="form.alatbantu_nafasSelected" style="width: 7em;"
                                        :options="alatbantu_nafas" :editable="false" />
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="field col-12 md:col-4">
                            <h5>Subject </h5>
                            <p class="text-muted">Keluhan pasien</p>
                            <Textarea v-model="form.subject" :autoResize="true" rows="5" style="width:100%" /><br/>
                        </div>
                        <div class="field col-12 md:col-4">
                            <h5>Object</h5>
                            <p class="text-muted">Pemeriksaan Fisik</p>
                            <Textarea v-model="form.object" :autoResize="true" rows="5" style="width:100%" /><br/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <h5>Asesment</h5><p class="text-muted">Diagnosa</p>
                        <Textarea v-model="form.asessment" :autoResize="true" rows="5" style="width:100%" /><br/>
                    </div>
                    <div class="field col-12 md:col-4">
                        <h5>Plan <a href="#" @click.prevent="panggil_terapy_terakhir()" style="float:right; font-size:12px;">Terapi Terakhir</a></h5><p class="text-muted">Tindak lanjut</p>
                        <Textarea v-model="form.plan" :autoResize="false" rows="5" style="width:100%; resize:both;" /><br/>
                    </div>
                 </div>
             </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="displayModal_close" class="p-button-text"/>
                    <Button label="Simpan" icon="pi pi-check" @click="simpan_soap" autofocus :loading="isLoading" />
                </template>
            </Dialog>
        </div>


        <Dialog header="" v-model:visible="displayConfirmation" :containerStyle="{width: '20vw'}" :modal="true">
                <h5>{{ message }}</h5>
                <template #footer>
                    <Button label="Tutup" icon="pi pi-check" @click="closeConfirmation" autofocus />
                </template>
            </Dialog>



        <div class="card card-primary card-outline elevation-0">
                <div class="card-header">
                    <h3 class="card-title"><strong></strong>
                    </h3>
                </div>
                <!-- <div class="card-footer text-muted">
                </div> -->
                <div class="card-body">
                    <Button label="S O A P" icon="pi pi-external-link" class="p-button-info mb-1" @click="displayModal_open(false,0,true)" />
                    <Button label="S B A R" icon="pi pi-external-link" class="p-button-info mb-1" @click="displayModal_open(false,0,false)" />
                    <Button label="CETAK" icon="pi pi-print" class="p-button-warning mb-1" @click="cetakSoap()" />
                    <!-- <div class="card-body table table-responsive p-10" style="height: 700px;"> -->
                        <table class="table table-bordered table-striped  dataTable dtr-inline">
                        <thead>
                            <tr>
                                <th>AUTH</th>
                                <th>No.</th>
                                <th>WAKTU</th>
                                <th>SOAP</th>
                                <th>INSTRUKSI/VARIF</th>
                                <th>PPA</th>
                                <th>AUTH</th>
                                <th>AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(input,k) in fact">
                                <td>
                                    <span v-if="input.hasbeen_auth==1">
                                    <Button icon="pi pi-verified" class="p-button-rounded p-button-success" />
                                    </span>
                                    <span v-if="input.hasbeen_auth==0">
                                        <Button icon="pi pi-lock-open" class="p-button-rounded p-button-warning"  @click="call_oto(input.id,2)" />
                                    </span>
                                    <span v-if="input.jenis_dok=='SBAR'"><b>{{ input.jenis_dok }}</b></span>
                                </td>
                                <td>{{ k+1 }}</td>
                                <td><h6>{{input.waktu_display}}</h6></td>
                                <td>
                                    <h6></h6>
                                        <strong>{{input.caption1}}:</strong> <h6><span v-html="convert_chart(input.subject)"></span></h6>
                                        <strong>{{input.caption2}}:</strong> <h6><span v-html="convert_chart(input.object_display)"></span></h6>
                                        <strong></strong> <h6><span>{{input.object}}</span></h6>
                                        <strong>{{input.caption3}}:</strong> <h6><span v-html="convert_chart(input.asessment)"></span></h6>
                                        <strong v-if="input.jenis_dok=='CPPT'">{{input.caption4}}:</strong> <h6><span v-html="convert_chart(input.plan)"></span> </h6>
                                </td>
                                <td>
                                    <span v-if="input.jenis_dok=='SBAR'">
                                        <strong>{{input.caption4}}:</strong> <h6><span v-html="convert_chart(input.plan)"></span> </h6>
                                        <span v-if="input.verif==0">
                                            <Button label="Verif DPJP" icon="pi pi-plus" @click="call_oto(input.id,21)" class="p-button-rounded p-button-text" />
                                        </span>
                                        <span v-else>
                                            <qrcode-vue :value="input.verif_by_name" :size="size" level="H"></qrcode-vue>
                                            <p>({{ input.profesi_verif }}) <br/> {{ input.verif_by_name }}</p>
                                        </span>
                                    </span>
                                </td>
                                <td><h6> ({{ input.profesi }}) <br/> {{ input.verif_user_display }}</h6></td>
                                <td>
                                    <span v-if="input.hasbeen_auth==1">
                                        <qrcode-vue :value="input.id" :size="size" level="H"></qrcode-vue>
                                    </span>
                                </td>
                                <td><Button icon="pi pi-pencil" @click="displayModal_open(true,input.id)" class="p-button-rounded p-button-text" /><br>
                                    <Button icon="pi pi-delete-left" @click="confirm1(input.id,input.waktu)" class="p-button-rounded p-button-primary" /><br />

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <Button label="Simpan" align="" icon="pi pi-uncheck" class="p-button btn-sm btn-success" /> -->
                </div>

        </div>

            <Dialog header="Pengisian Intruksi" v-model:visible="showIntruksi" :containerStyle="{width: '70vw'}" :modal="true">
                <div class="card">
                    <div class="card-header">

                    </div>
                    <div class="card-body">
                        <div class="field col-12 md:col-4">
                            <div class="field col-12 md:col-4">
                        <h5>Intruksi</h5><p class="text-muted">Intruksi DPJP</p>
                        <Textarea  :autoResize="true" rows="5" style="width:80%" /><br/>
                                </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Simpan" icon="pi pi-check" @click="showIntruksi=false"  autofocus />
                    <Button label="Batal" icon="pi pi-times" @click="showIntruksi=false"  class="p-button-text" />
                </template>
            </Dialog>

            <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"  class="container_modal" :modal="true">
            <!-- <otorisasi-form @getvalue="handleValue" :mode=2 :noregister="soapId"></otorisasi-form>  -->
            <otorisasi-form @getvalue="handleValue" :mode=mode_otto :noregister="soapId"></otorisasi-form>
            <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
                </template>
        </Dialog>

    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import Textarea from 'primevue/textarea';
    import QrcodeVue from 'qrcode.vue';
    import ConfirmDialog from 'primevue/confirmdialog';
        export default {
        components: {
            Loading,
            Textarea,
            QrcodeVue,
            ConfirmDialog,
        },
        props: ['isInput', 'noregister','datapasien','isCppt','data_igd'],  //SELAIN CPPT ADALAH SBAR
        data() {
            return {
                confirmGroup: 'soap-' + Math.random().toString(36).substr(2, 9),
                fact: [],
                showModal: false,
                showOtorisasi:false,
                responvalue:0,
                showIntruksi:false,
                soapId:0,
                mode_otto:2,                // displayModal:false,
                isLoading: false,
                fullPage: true,
                displayConfirmation: false,
                message:'',
                is_update:false,
                id_soap:0,
                size: 40,
                alatbantu_nafas:['Ya','Tidak'],
                value: 'https://example.com',
                form:{
                    startdate:'',
                    tglsoap:'',
                    subject:'',
                    object:'',
                    object_display:'',
                    asessment:'',
                    plan:'',
                    mode:'',
                    noregister:'',
                    id:'',
                    verif_user_display:'',
                    suhu:0.0,
                    sistole:0,
                    diastole:0,
                    nadi:0,
                    gcs:0,
                    spo2:0,
                    pernafasan:0,
                    jenis_dok:'',
                    alatbantu_nafasSelected:'Tidak',
                    tb:0,
                    bb:0
                },

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.tglsoap = currentDate;
            this.auto_input_igd();
        },
        watch: {

        },
        created() {
            //this.fetchData();
            this.get_soap(1,"");
            this.auto_input_igd();
        },

        methods: {

            cetakSoap()
            {
                window.open('/print-soap/'+this.form.noregister, '_blank');
            },

            tingkat_kesadaran(teks) {
                if (!teks) return 0;
                const t = teks.toLowerCase().replace(/\s/g, '');
                if (t.includes('composmentis') || t.includes('composmetis')) return 15;
                if (t.includes('apatis'))                                     return 13;
                if (t.includes('delirium'))                                   return 10;
                if (t.includes('somnolen'))                                   return 7;
                if (t.includes('stupor'))                                     return 5;
                if (t.includes('koma'))                                       return 4;
                return 0;
            },
            auto_input_igd()
            {
                if (this.data_igd !== null) {
                    this.form.sistole = this.data_igd.tensi_sistol
                    this.form.diastole = this.data_igd.tensi_distol
                    this.form.suhu = this.data_igd.suhu
                    this.form.nadi = this.data_igd.nadipermenit
                    this.form.pernafasan = this.data_igd.respirasi
                    this.form.spo2 = this.data_igd.saturasi
                    this.form.gcs = this.tingkat_kesadaran(this.data_igd.kesadaran)
                }
            },


            convert_chart: function(data){
                if(data==null)
                {
                    return "";

                }else
                {
                    return data.replace(/\n/g, '<br>');
                }

            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            call_oto(soapid,mode_otto)
            {
                this.soapId =soapid;
                this.mode_otto = mode_otto
                this.showOtorisasi = true;
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child

                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;
                    this.get_soap(1);
                }
            },
            call_intruksi()
            {
                this.showIntruksi = true;
            },
            tanggal_skrg()
            {
                var currentDate = new Date();
                this.form.tglsoap = currentDate;
            },
            ambil_soap_terakhir()
            {

                const last_id = this.fact
                if (!this.fact || !Array.isArray(this.fact) || this.fact.length === 0) {
                    this.open("warning",'Data soap belum ada');
                } else {
                // Get the max ID when facts exist
                const maxId = Math.max(...this.fact.map(item => parseInt(item.id)));
                    this.get_soap(2,maxId) //mode = 2, id
                }
            },
           async simpan_soap() {


                console.log('data soap', this.form)

                var currentDate = new Date();
                //console.log(this.form.startdate);
                if(this.is_update==true)
                {
                    this.form.mode=2;
                }
                else
                {
                    this.form.mode=1;
                }

                this.form.lokasi = "IGD"
                this.form.id= this.id_soap;
                this.form.noregister = this.noregister;
                this.isLoading = true;
                await axios.post('/simpan_soap', this.form)
                    .then(response => {
                        this.message = response.data.metadata.message
                        this.isLoading = false
                        this.showModal = false;

                        if(response.data.metadata.code==200)
                        {
                            this.open("success", this.message)

                            this.get_soap(1);
                        }
                        else
                        {
                            this.open("warning", this.message)
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async insert_soap()
            {
            },

            clearfield()
            {
                this.form.subject = ""
                this.form.object =""
                this.form.asessment = ""
                this.form.plan =""
                this.form.suhu = 0
                this.form.sistole = 0
                this.form.diastole =0
                this.form.nadi = 0
                this.form.gcs = 0
                this.form.spo2 = 0
                this.form.respirasi = 0
                this.form.pernafasan = 0
            },
            async get_soap(mode,id) {
                var currentDate = new Date();
                //console.log(this.form.startdate);
                this.isLoading = true
                this.form.mode=mode;

                this.form.noregister = this.noregister;
                this.form.lokasi = "IGD"
                this.form.id=id;
                this.isLoading = true;
                await axios.post('/get_soap', this.form)
                    .then(response => {
                        this.isLoading = false
                        if(mode==1)
                        {
                            this.fact = response.data.response;
                        }
                        if(mode==2)
                        {
                            console.log(response.data.response);
                            this.form.tglsoap = new Date(response.data.response[0].waktu)
                            this.form.subject = response.data.response[0].subject
                            this.form.object = response.data.response[0].object
                            this.form.object_display = response.data.response[0].object_display
                            this.form.asessment = response.data.response[0].asessment
                            this.form.plan = response.data.response[0].plan
                            this.form.suhu = response.data.response[0].suhu
                            this.form.sistole = response.data.response[0].sistole
                            this.form.diastole = response.data.response[0].diastole
                            this.form.nadi = response.data.response[0].nadi
                            this.form.gcs = response.data.response[0].gcs
                            this.form.spo2 = response.data.response[0].spo2
                            this.form.respirasi = response.data.response[0].respirasi
                            this.form.pernafasan = response.data.response[0].pernafasan
                            this.form.verif_user_display =response.data.response[0].verif_user_display
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async deleted_soap(id) {
                var currentDate = new Date();
                //console.log(this.form.startdate);
                this.isLoading = true
                this.form.mode='1';
                this.form.noregister = this.noregister;
                this.form.id =id
                this.isLoading = true;
                await axios.post('/hapus_soap', this.form)
                    .then(response => {
                        this.isLoading = false
                        //this.displayConfirmation = true;
                        this.message = response.data.metadata.message
                        this.open("success",this.message);
                        if(response.data.metadata.code==200)
                        {
                            this.get_soap(1);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            confirm1(id,tanggal) {
                this.$confirm.require({
                        group: this.confirmGroup,
                        message: 'Anda ingin menghapus soap dengan tanggal '+tanggal+' ?',
                        header: 'Hapus konfirmasi',
                        icon: 'pi pi-info-circle',
                        acceptClass: 'p-button-danger',
                        accept: () => {
                            this.deleted_soap(id);
                        },
                        reject: () => {
                            console.log('batal')
                        }
                    });
            },
            displayModal_open(is_update,id, adalahCPPT) {
                this.showModal = true;
                if(is_update==true){
                    this.is_update = true;
                    this.id_soap = id;
                    this.get_soap(2,id) //mode = 2, id
                }
                else
                {
                    this.form.subject = "";
                    this.form.object =  "";
                    this.form.asessment =  "";
                    this.form.plan =  "";
                    if(adalahCPPT==true)
                    {
                        this.form.jenis_dok ="CPPT";
                    }
                    else
                    {
                        this.form.jenis_dok ="SBAR";
                    }

                    this.clearfield();
                    this.is_update = false;
                    this.get_soap(1,id) //mode = 2, id
                }

            },
            async panggil_terapy_terakhir() {
                this.isLoading = true;
                this.form.NOPENDAFTARAN =this.noregister,
                this.form.RECEIPT_NO =''
                this.form.MODE ='LAST_TERAPHY'

                await axios.post('/getdetils_sales',this.form)
                .then(response => {
                    const data = response.data;

                    console.log(data);

                    if (data.metadata && data.metadata.code == '200' && data.response && data.response.length > 0) {
                        const lines = data.response.map(item => {
                            const nama = item.NAMABARANG_REQ || '';
                            const remark = item.REMARK_ITEM && item.REMARK_ITEM !== '-' ? ' - ' + item.REMARK_ITEM : '';
                            return nama + remark;
                        });
                        this.form.plan = lines.join('\n');
                    } else {
                        this.open('warning', 'Data terapi terakhir tidak ditemukan');
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.open('warning', 'Gagal mengambil data terapi terakhir');
                })
                .finally(() => this.isLoading = false);
            },
            displayModal_close() {
                this.showModal = false;
            },
            openConfirmation() {
                this.displayConfirmation = true
            },
            closeConfirmation() {
                this.displayConfirmation = false;
                this.showModal = false;

            },

        },
    }

</script>
