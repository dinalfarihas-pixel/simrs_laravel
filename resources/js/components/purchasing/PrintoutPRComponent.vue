<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-7">
                    <div class="card  elevation-0">
                        <div class="card-body table-responsive p-10" style="height: 100%;">
                            <div v-if="show_detil==true"> 
                                <timeline-purchasing :data_pr=form.no_permintaan></timeline-purchasing>
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-12">
                                            <h4>
                                                <i class="">
                                                    <img :src="data_rs['logo']" height="40px" width="40px" />
                                                </i> {{data_rs['nama_rs']}} 
                                                <!-- <small class="float-right"><a href="/printout-pr" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a></small> -->
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="flex align-items-center">
                                        <p>Kepada YTH: </p>
                                        <span v-for="data in pr_to">
                                            <small>
                                                <Chip :label="data.lokasi" class="mr-1" /></small>
                                        </span>
                                    </div>
                                    <br>
                                    <div class="row invoice-info">
                                        <div class="col-sm-6 invoice-col">
                                            <address>
                                                No: <strong> {{data_pr.no_permintaan}} </strong><br>
                                                Dari : {{data_pr.lokasi}} #{{data_pr.tanggal}} <br>
                                                <strong> Perihal : {{data_pr.perihal}}</strong>
                                            </address>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body table-sm table-responsive">
                                    <div class="callout  elevation-0">
                                        <p v-html="data_pr.catatan" style="font-size: 16px;"></p>
                                        <div class="card-body table-sm table-responsive" v-if="detildata.length>0">
                                            <table class="table table-striped table-bordered ">
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

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row,index) in detildata">
                                                        <td>{{ index+1 }}</td>
                                                        <td> {{row.barcode}}</td>
                                                        <td>
                                                            {{row.nama}}

                                                        </td>
                                                        <td>
                                                            {{ row.harga }}


                                                        </td>
                                                        <td><strong>{{row.qty }}</strong></td>
                                                        <td>
                                                            {{ row.qty_acc }}

                                                        </td>
                                                        <td>{{row.satuan}}</td>
                                                        <td>
                                                            {{ row.sub_total }}

                                                        </td>
                                                        <td>
                                                            {{ row.catatan }}

                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <th>Subtotal:</th>
                                                        <td> <strong> {{ $numeral(totalamount, '0,0.00') }}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <th>Tax(11%)</th>
                                                        <td>$10.34</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <th>Total:</th>
                                                        <td>$265.24</td>
                                                    </tr>


                                                </tbody>

                                            </table>


                                        </div>
                                        <br>
                                        <!-- <p style="font-size:12.0pt">Demikian kami sampaikan, atas perhatiannya kami
                                            ucapkan
                                            terima kasih.</p> -->
                                        <!-- <div class="row mt-300">
                                            <div class="col-4"></div>
                                            <div class="col-3"></div>
                                            <div class="col-4">
                                                <table>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <h5>Kasubbag Umum dan Kepegawaian/PPTK,</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <qrcode-vue value="Testing" size="60" level="H">
                                                            </qrcode-vue>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align: center;">
                                                            <h5>
                                                                <strong> Ns.ERISMAWATI.S.Kep </strong><br>
                                                                NIP.1983 1208 200504 2 001
                                                            </h5>
                                                        </td>
                                                    </tr>

                                                </table>

                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card  elevation-0">
                        <div class="card-header p-2">
                            <strong>Disposisi</strong>
                        </div>
                        <div class="card-body">
                            <span v-if="isLoading">
                                <ProgressBar mode="indeterminate" style="height: .1em" />
                            </span>
                            <div class="card-comment" id="activity">
                                <div class="post" v-for="(data,index) in list_disposisi">
                                    <div class="user-block">
                                        <img class="img-circle img-bordered-sm"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZvb6lJBuvgYuI___kRDyfEeVIOq8a4DmKg&usqp=CAU"
                                            alt="user image">
                                        <span class="username">
                                            <a href="#">{{ data.nama_user }}</a>
                                            <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                        </span>
                                        <span class="description">{{ data.tanggal_dispp }}</span>
                                    </div>
                                    <p>
                                        {{ data.disposisi }}
                                        <span v-if="data.is_forwarded==1">
                                            <div class="callout  elevation-1">
                                                <strong><cite title="">" {{ data.nama_user }} Meneruskan Telaah ke
                                                        {{ data.forward_note }} "</cite> </strong>
                                            </div>
                                        </span>
                                        <span v-if="data.is_forwarded==2">
                                            <div class="callout  elevation-1">
                                                <strong><cite title="">" {{ data.nama_user }} Melakukan persetujuan pada telaah ini
                                                         </cite> </strong>
                                            </div>
                                        </span>

                                    </p>
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
    import ProgressBar from 'primevue/progressbar';
    import Timeline from 'primevue/timeline';
    export default {
        components: {
            Loading,
            Textarea,
            Chip,
            QrcodeVue,
            InputNumber,
            ProgressBar
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
                    lokasiSelected: '',
                    disposisi: '',
                    content_disposisi: ''
                },
                windowHeight: window.innerWidth,
                isLoading: false,
                fullPage: true,
                displayConfirmation: false,
                catatan: '',
                data_pr: '',
                detildata: [],
                pr_to: [],
                show_detil: true,
                lokasi: [],
                pr_selected: '',
                totalamount: 0,
                list_disposisi: [],
                data_rs:''
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
            this.getlist_pr(1)
        },
        created() {
            //this.fetchData();

            this.profile_rs();
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            // console.log(params.get("data"));
            // this.detail.plan_id = 
            this.form.no_permintaan = params.get("data");

           
            this.get_disposisi();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            profile_rs()
            { 
                  axios.get('/data_rumahsakit',"")
                    .then(response => { 
                        
                    this.data_rs = response.data  
                        
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

                        this.detildata = response.data.response.details
                        this.data_pr = response.data.response.header.find(x => x.no_permintaan == this.form
                            .no_permintaan);

                        this.pr_to = response.data.response.pr_to

                        this.isLoading = false

                        console.log(this.data_pr);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async get_disposisi() {
                //this.form.no_permintaan =this.data_pr.no_permintaan
                this.isLoading = true;
                await axios.post('/get_disposisi', this.form)
                    .then(response => {
                        this.list_disposisi = response.data.response;
                        this.form.content_disposisi = '';
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
