<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>  
          
            <Dialog header="Header" v-model:visible="displayBasic2" :containerStyle="{width: '90vw'}" :modal="true">
                <div class="card card-warning card-outline">
                    <div class="card-header">
                        <h3 class="card-title">Data kunjungan pasien</h3>
                    </div>
                    <div class="card-body"> 
                        <div class="row invoice-info">
                            <div class="col-sm-4 invoice-col">
                                Pasien
                                <address>
                                    <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong><br>
                                     {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                    {{details_pasien.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address>
                                    <strong> {{details_pasien.MASUKPOLY_DISPLAY}} , {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{details_pasien.POLI}}<br>
                                   DPJP  <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                </address>
                            </div> 
                        </div> 
                    </div>
                </div>
                                        <Tabs>
                        <TabList>
                            <Tab>TRIASE IGD</Tab>
                            <Tab>OBAT-OBATAN</Tab>
                            <Tab>PENUNJANG</Tab>
                            <Tab>CPPT</Tab>
                            <Tab>RESUME PASIEN PULANG</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>

                            <subtriaseigd :datapasien=details_pasien></subtriaseigd>
                        
                            </TabPanel>
                            <TabPanel>

                            <permintaanobat :datapasien=details_pasien></permintaanobat>
                        
                            </TabPanel>
                            <TabPanel>

                                                        <Tabs>
                                <TabList>
                                    <Tab>LABORATORIUM</Tab>
                                    <Tab>RADIOLOGI</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <permintaan-lab :datapasien="details_pasien"></permintaan-lab>
                                
                                    </TabPanel>
                                    <TabPanel>
  
                                    <permintaan-radiologi :datapasien="details_pasien"></permintaan-radiologi>
                                
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        
                            </TabPanel>
                            <TabPanel>

                            <soap-form :datapasien="details_pasien"></soap-form>
                        
                            </TabPanel>
                            <TabPanel>

                            <!-- <soap-form :datapasien="details_pasien"></soap-form> -->
                        
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeBasic2" class="p-button-text"/>
                    <Button label="Yes" icon="pi pi-check" @click="closeBasic2" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 20em; " />
                    <Button label="Tampilkan" align="" @click="getdata_pasien()" icon="pi pi-check" class="p-button" />
                </div>
            </div>
            <div class="card ">
                <div class="card-header">
                    <h3 class="card-title">Data pasien</h3>
                </div>
                <div class="card-body">
                    <Button icon="pi pi-th-large" @click="visibleFull = true" />
                </div>
            </div>

            <Sidebar v-model:visible="visibleFull" :baseZIndex="1000" position="full">
                <div class="card card-warning card-outline">
                    <div class="card-header">
                        <h3 class="card-title">Data kunjungan pasien</h3>
                    </div>
                    <div class="card-body">

                        <div class="row invoice-info">
                            <div class="col-sm-4 invoice-col">
                                Pasien
                                <address>
                                    <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong><br>
                                     {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                    {{details_pasien.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address> 
                                    <strong> {{details_pasien.MASUKPOLY_DISPLAY}} , {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{details_pasien.POLI}}<br>
                                   DPJP  <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                </address>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="row mb-2">
                    <!-- <div class="col-sm-0">
                        <div class="card card-warning card-outline">
                            <div class="card-header">
                                <h3 class="card-title">Data kunjungan pasien</h3>
                            </div>
                            <div class="card-body">
                                <Detailpasien :datapasien=details_pasien></Detailpasien>
                            </div>
                        </div> 
                    </div>  -->

                    <div class="col-sm-12">
                    
                    </div>

                </div>
            </Sidebar>

            <div class="card">
                <div class="card-body">
                    <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                        <table class="table table-bordered table-striped  dataTable dtr-inline">
                            <thead>
                                <tr style="background-color: black;">
                                    <th> </th>
                                    <th> </th>
                                    <th> 
                                        <div class="input-group input-group-sm">
                                            <input type="text" v-model="filters.NAMAPASIEN.value" autocomplete="off"
                                                name="table_search" class="form-control float-left"
                                                placeholder="Search">
                                        </div> 
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th> 
                                </tr>
                                <tr>
                                    <th>NO</th>
                                    <th>NOPENDAFTARAN</th>
                                    <th>NORM</th>
                                    <th>CARA BAYAR</th>
                                    <th>PASIEN</th>
                                    <th>DPJP</th>
                                    <th>AKSI</th>
                                    <th>ALAMAT</th>
                                    <th>STTS TRIASE</th>

                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in fact">
                                    <td>{{ k+1 }}</td>
                                    <td>{{row.NOPENDAFTARAN}}</td>
                                    <td>{{row.NOMR}}</td>
                                    <td>{{ row.CARABAYAR }}</td>
                                    <td>{{row.DATA_SINGKAT}}</td>
                                    <td>{{row.NAMADOKTER}}</td>
                                    <td> <Button class="p-button-sm p-btn-sm" icon="pi pi-th-large"
                                            @click="showdetails(row)" />
         <script>
    import Loading from 'vue-loading-overlay';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel'; 
    export default {
        components: {
            Loading,
            Sidebar,
          <script>
    import Loading from 'vue-loading-overlay';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel'; 
    export default {
        components: {
            Loading,
            Sidebar,
            Dialog,
            Tabs, TabList, Tab, TabPanels, TabPanel
        },
        props: {
            msg: String
            },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    mode: 'history15',
                    kodeunit: 110
            },
                filters: {
                    NAMAPASIEN: {
                        value: '',
                        keys: ['NAMAPASIEN']
            }
            },
                isLoading: false,
                fullPage: true,
                visibleFull: false,
                displayBasic2: false,
                details_pasien: []
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getdata_pasien();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            showdetails(pasien) {
                this.openBasic2();
                this.details_pasien = pasien; 
            },
            async getdata_pasien() {
                this.isLoading = true;
                console.log(this.form)
                await axios.post('/getpasien_api', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        console.log(response.data.response);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            }
            }
            }

            console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            }
            }
            }

</script>