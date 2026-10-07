<template>
    <section class="content">
        <div class="container-fluid">
            <Dialog header="Tambahkan Tanda tangan" style="background-color: antiquewhite;"
                v-model:visible="addTandaTangan" :containerStyle="{width: '75vw'}" class="container_modal" :modal="true">
                <tambah-tanda-tangan ref="get" :id_consent="id_consent"></tambah-tanda-tangan>
                <template #footer>
                    <Button label="Simpan" icon="pi pi-check" @click="adddata()" autofocus />
                    <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="addTandaTangan=false"
                        autofocus />
                </template>
            </Dialog>
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <!-- {{ datapasien }} -->
            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <div class="row invoice-info">
                        <div class="col-md-2">
                            <img width="220px" height="130px" src="https://ws-simrs.link/ilustration/ilustrasi1.png"
                                alt="Ilustration">
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Pasien KLL <span v-if="datapasien.KLL=='1'"><strong>Ya</strong></span>
                            <span v-if="datapasien.KLL=='0'"><strong>Tidak</strong></span>
                            <address>
                                <h5> <strong> {{datapasien.DATA_SINGKAT}} , {{datapasien.NOMR}}</strong>
                                </h5>
                                {{datapasien.CARABAYAR}} - <strong> {{datapasien.NOSEP}}</strong><br>
                                {{datapasien.NAMAKECAMATAN}}<br>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Masuk
                            <address>
                                <strong> {{datapasien.MASUKPOLY_DISPLAY}} ,
                                    {{datapasien.NOPENDAFTARAN}}</strong><br>
                                Ruangan/Poli, {{datapasien.POLI}}<br>
                                DPJP <strong> {{datapasien.NAMADOKTER}}</strong><br>
                                Dx Awal
                                <strong>{{ datapasien.DIAGNOSA_AWAL }}-{{ datapasien.DX_CAPTION }}</strong>
                            </address>
                        </div>
                    </div>
                                        <Tabs>
                        <TabList>
                            <Tab></Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>

                                <span v-html="data.display"></span>
                                <hr> 
                                <div class="row">
                                    <div class="col-md-8">
                                        <Button label="Tambahkan Tanda tangan" align=""
                                            @click="ShowTandatangan(data.id)" icon="pi pi-user"
                                            class="p-button p-button-text p-button-info" />
                                        <span v-for="det in details_ttd">
                                            <span v-if="det.id_consent==data.id">
                                                <tanda-tangan :data_sign="det"></tanda-tangan>
                                            </span>
                                        </span>  
                                    </div> 
                                </div>
                                <Button label="Otentikasi" icon="pi pi-auth" @click="call_oto(6)" class="p-button" /> 
                            
                            </TabPanel>
                        </TabPanels>
                    </Tabs>



                </div>
            </div>

        </div> 
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
    import Loading from 'vue-loading-overlay';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import QrcodeVue from 'qrcode.vue';
    export default {
        components: {
            Loading,
            Tabs, TabList, Tab, TabPanels, TabPanel,
            QrcodeVue
        },
        props: ['datapasien'], //SELAIN CPPT ADALAH SBAR
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    data: ''
                },
                isLoading: false,
                fullPage: true,
                addTandaTangan: false,
                id_consent: 0,
                mode_otto:2,        
                showOtorisasi:false,
                details_ttd: []
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
            this.get_consent_pasien();
        },
        created() {
            //this.fetchData();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
                // this.get_consent_pasien();
            },
            call_oto(mode_otto)
            { 
                this.mode_otto = mode_otto
                this.showOtorisasi = true; 
            },
            ShowTandatangan(id) {
                this.id_consent = id
                this.addTandaTangan = true
            },
            async get_consent_pasien() {
                //this.form.id = id;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.isLoading = true;
                await axios.post('/get_consent_pasien', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.fact = response.data.response
                        this.details_ttd = response.data.detail
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
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
            async adddata() {
                this.form.data = this.$refs.get.getdata(); // Access child's data
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.id_consent = this.id_consent;
                this.isLoading = true;
                await axios.post('/simpantanda_list_penanggung_jawab', this.form)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.metadata.code == 200) {
                            this.addTandaTangan = false;
                            this.open('success', response.data.metadata.message)
                            this.get_consent_pasien();
                        } else {
                            this.open('warning', response.data.metadata.message)
                        }
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