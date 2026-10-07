<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>


            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Toolbar style="background-color: white;">
                        <template #start>
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 12em;   " />
                            <Button label="Reload" align="" @click="getdata()" icon="pi pi-check" class="p-button" />
                        </template>
                        <template #end>

                        </template>
                    </Toolbar>

                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                    <Toolbar style="background-color: white;">
                        <template #start>
                            <div class="card-tools">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="Cari Rm">
                                    <div class="input-group-append">
                                        <Button label="" icon="pi pi-search" class="p-button p-button-sm" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #end>
                            <Button label="Selesai" class="p-button p-button p-button-success mr-1" />
                            <Button label="Menunggu" class="p-button  mr-1" />
                            <Button label="Semua" class="p-button p-button p-button-danger mr-1" />
                        </template>
                    </Toolbar>

                    <table class="table table-bordered table-striped  dataTable dtr-inline">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                    <div class="input-group input-group-sm">
                                        <input type="text" v-model="filters.DATA_SINGKAT.value" name="table_search"
                                            class="form-control float-left" placeholder="Nama">
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>ANTRI</th>
                                <th>#</th>
                                <th>NOMR </th>
                                <th>NAMAPASIEN</th>
                                <th>CARABAYAR</th>
                                <th>REG</th>
                                <th>Rekam Medis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in fact">
                                <td>{{ row.NOMORANTRIAN }} </td>
                                <td>
                                    <span v-if="row.JENISKELAMIN=='P'">
                                        <ion-icon size="large" style="color: pink;" name="woman-sharp"></ion-icon>
                                    </span>
                                    <span v-if="row.JENISKELAMIN=='L'">
                                        <ion-icon size="large" style="color: navy;" name="man-sharp"> </ion-icon>
                                    </span>
                                </td>
                                <td>{{ row.NOMR }} </td>
                                <td>
                                    <h5>
                                        # {{row.NOMR}} - {{row.DATA_SINGKAT}}</h5>
                                    <p style="color: cadetblue;">{{row.NAMADOKTER}}</p>

                                </td>
                                <td>
                                    <span v-if="row.KODECARABAYAR==27 || row.KODECARABAYAR==28">
                                        <button type="button" class="btn btn-block btn-danger btn-sm">
                                            <ion-icon name="wallet-outline"></ion-icon>{{ row.CARABAYAR }}
                                        </button>
                                    </span>
                                    <span v-else>
                                        <button type="button" class="btn btn-block btn-outline-success btn-sm">
                                            <ion-icon name="wallet-outline"></ion-icon>{{ row.CARABAYAR }}
                                        </button>
                                    </span>
                                </td>

                                <td>{{ row.MASUKPOLY_DISPLAY }} </td>
                                <td><button type="button"
                                        @click="getlink_icare(row.NOJAMINAN,row.NOMR,row.DATA_SINGKAT,row)"
                                        class="btn btn-block btn-success btn-sm">Rekam Medis</button> </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog :header="nama_pasien" v-model:visible="displayMaximizable" :containerStyle="{width: '90vw'}"
                :maximizable="false" :modal="true">

                <div class="card card-warning card-outline">
                    <div class="card-header">
                        <h3 class="card-title">Menampilkan data rekam medis pasien dalam satu episode rawatan</h3>
                    </div>
                    <div class="card-body">
                        <div class="row invoice-info">
                            <div class="col-md-2">
                                <img width="220px" height="130px" src="https://ws-simrs.link/ilustration/ilustrasi1.png"
                                    alt="Ilustration">
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Pasien KLL <span v-if="data_trans.KLL==1"><strong>Ya</strong></span>
                                <span v-if="data_trans.KLL==0"><strong>Tidak</strong></span>
                                <address>
                                    <h5> <strong> {{data_trans.DATA_SINGKAT}} , {{data_trans.NOMR}}</strong> </h5>
                                    {{data_trans.CARABAYAR}} - <strong> {{data_trans.NOSEP}}</strong><br>
                                    {{data_trans.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address>
                                    <strong> {{data_trans.MASUKPOLY_DISPLAY}} ,
                                        {{data_trans.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{data_trans.POLI}}<br>
                                    DPJP <strong> {{data_trans.NAMADOKTER}}</strong><br>
                                    Dx Awal <strong>{{ data_trans.DIAGNOSA_AWAL }}-{{ data_trans.DX_CAPTION }}</strong>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>REKAM MEDIS</Tab>
                        <Tab>OBAT-OBATAN</Tab>
                        <Tab>PENGISIAN SOAP RAWAT JALAN</Tab>
                        <Tab>PENUNJANG</Tab>
                        <Tab>I CARE</Tab>
                        <Tab>LAMPIRAN FILE</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>

                        <table class="table table-bordered table-striped dataTable dtr-inline">
                            <thead>
                                <tr>
                                    <th style="width: 20%;">Kunjungan</th>
                                    <th style="width: 20%;">Pemeriksaan </th>
                                    <th>Teraphy </th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="row in riwayat">
                                    <td>
                                        <Badge :value="row.TGLREG" class="mr-2"> </Badge><br />
                                        {{ row.NAMADOKTER }}<br />
                                        POLI : {{ row.POLI }}<br />
                                        NOREG : {{ row.NOREGISTER }}
                                        <br />
                                        <br />
                                        <br />
                                        <p style="color: green;"><small> {{ row.KET_RUJUK_INT }}</small></p> <br />
                                    </td>
                                    <td>
                                        Suhu :{{ row.SUHU }} C<br />
                                        TD : {{ row.TENSI }}<br />
                                        SP2O : {{ row.SP2O }}<br />
                                        NADI : {{ row.NADI }}<br />

                                        S : {{ row.SUBJEK}}<br />
                                        O : {{ row.OBJEK}}<br />
                                        A : {{ row.ASSESMEN}}<br />
                                        P : {{ row.PLAN}}<br />

                                    </td>
                                    <td>
                                        <p v-html="row.OBATAN_WEBVIEW"></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        </TabPanel>
                        <TabPanel>

                        <permintaanobat :datapasien=fact></permintaanobat>

                        </TabPanel>
                        <TabPanel>

                        <soap-rawatjalan :datapasien="data_trans"></soap-rawatjalan>

                        </TabPanel>
                        <TabPanel>

                            <Tabs>
                                <TabList>
                                    <Tab>LABORATORIUM</Tab>
                                    <Tab>RADIOLOGI</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <permintaan-lab :datapasien="fact"></permintaan-lab>

                                    </TabPanel>
                                    <TabPanel>

                                    <permintaan-radiologi :datapasien="fact"></permintaan-radiologi>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                        <TabPanel>

                        <iframe width="100%" height="600px" frameborder="1" scrolling="yes" allowtransparency="true"
                            :src="url_icare"></iframe>

                        </TabPanel>
                        <TabPanel>

                            <Tabs>
                                <TabList>
                                    <Tab>LAMPIRAN FILE PADA KUNJUNGAN INI</Tab>
                                    <Tab>LAMPIRAN SEMUA KUNJUNGAN</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <listupload :datapasien="data_trans"></listupload>

                                    </TabPanel>
                                    <TabPanel>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Dialog>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import Badge from 'primevue/badge';
    export default {
        components: {
            Loading,
            Tabs, TabList, Tab, TabPanels, TabPanel,
            Badge
        },
        props: {
            msg: String
            },
        data() {
            return {
                fact: [],
                riwayat: '',
                icare: '',
                url_icare: '',
                nama_pasien: '',
                form: {
                    noka: '',
                    startdate: '',
                    norm: ''

                },
                filters: {
                    DATA_SINGKAT: {
                        value: '',
                        keys: ['DATA_SINGKAT']
                    }
                },
                isLoading: false,
                fullPage: true,
                displayMaximizable: false,
                data_trans: ''
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
            this.getdata();
        },
        created() {
            //  this.getdata();

        },
        methods: {
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },
            openMaximizable() {
                this.displayMaximizable = true;
            },
            closeMaximizable() {
                this.displayMaximizable = false;
            },

            openlink(url) {
                window.open(
                    "https://mobile-faskes.bpjs-kesehatan.go.id/IHS/historyfaskes?token=4571e118-af6d-4c08-9362-723ff6f62372",
                    "_blank");
            },
            async getlink_icare(noka, nomr, nama, row) {

                this.nama_pasien = nama;
                const dataform = new FormData();
                this.isLoading = true;
                this.form.noka = noka;
                this.data_trans = row;
                await axios.post('/icare-api', this.form)
                    .then(response => {
                        this.icare = response.data
                        this.open("info", this.icare.metaData.message)

                        if (this.icare.metaData.code == "200") {
                            let json = JSON.parse(this.icare.response);
                            this.url_icare = json.url;
                        }

                        this.isLoading = false
                        this.displayMaximizable = true;

                        this.getriwayat_lengkap(nomr);
                        //this.openlink(json)
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                        this.open("warning", error.message)
                    })
                    .finally(() => this.isLoading = false)

            },
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async getdata() {

                const dataform = new FormData();
                this.isLoading = true;

                await axios.post('/datakunjungan', this.form)
                    .then(response => {
                        this.fact = [];
                        console.log(response.data.metadata);
                        if (response.data.metadata.code == "200") {
                            this.fact = response.data.response
                            console.log(this.fact);
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getriwayat_lengkap(norm) {
                const dataform = new FormData();
                this.form.norm = norm;
                this.isLoading = true;
                await axios.post('/riwayat_kunjungan', this.form)
                    .then(response => {
                        this.riwayat = response.data.response
                        console.log(this.riwayat);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            }
        }
    }

</script>
