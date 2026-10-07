<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <Dialog header="Pelayanan Fisioterapi" v-model:visible="displayBasic2" :containerStyle="{width: '95vw'}"
                class="container_modal" :modal="true">
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
                                Pasien KLL <span v-if="details_pasien.KLL==1"><strong>Ya</strong></span>
                                <span v-if="details_pasien.KLL==0"><strong>Tidak</strong></span>
                                <address>
                                    <h5> <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong>
                                    </h5>
                                    {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                    {{details_pasien.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address>
                                    <strong> {{details_pasien.MASUKPOLY_DISPLAY}} ,
                                        {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{details_pasien.POLI}}<br>
                                    DPJP <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                    Dx Awal
                                    <strong>{{ details_pasien.DIAGNOSA_AWAL }}-{{ details_pasien.DX_CAPTION }}</strong>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- {{ details_pasien }} -->
                                <Tabs>
                    <TabList>
                        <Tab>TINDAKAN FISIOTERAPI</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>

                        <tindakan :datapasien="details_pasien"></tindakan>
                    
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeBasic2" class="p-button-text" />
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
                    <Button label="Tampilkan" align="" @click="listpermintaan_fisio()" icon="pi pi-check"
                        class="p-button" />
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    
                </div>
                <div class="card-body">

                    <DataTable fixTableHead :value="fact" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                        stripedRows sortMode="multiple" class="p-datatable-sm mt-4" responsiveLayout="scroll"
                        :resizableColumns="true" :paginator="true" :rows="10" v-model:filters="filters2"
                        :rowsPerPageOptions="[10,20,50,100,200]">
                        <template #header>
                            <div class="table-header">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                </span>

                            </div>
                        </template>
                        <template #loading>
                            Loading customers data. Please wait.
                        </template>
                    

                        <Column field="NOPENDAFTARAN" :sortable="true" header="NOREGISTER" :styles="{'width':'10em'}">
                        </Column>
                        <Column field="NOMR" :sortable="true" header="NOMR"></Column>
                        <Column field="NAMAPASIEN" :sortable="true" header="PASIEN"></Column> 
                        <Column field="NAMADOKTER" :sortable="true" header="NAMADOKTER"></Column>
                        <Column field="CARABAYAR" :sortable="true" header="CARABAYAR"></Column>
                        <Column field="JENISRAWAT" :sortable="true" header="JENISRAWAT"></Column>
                        <Column field="POLI" :sortable="true" header="POLI/RUANG"></Column>
                        <Column field="ALAMAT"   header="ALAMAT"></Column>
                        <Column field="TGLLAHIR" :sortable="true" header="TGLLAHIR"></Column>
                        <Column field="DX_CAPTION" :sortable="true" header="DX_CAPTION"></Column>
                        <Column field="STTS" :sortable="true" header="STTS">
                            <!-- <template #body='slotProps'>
                                <span v-if="slotProps.data.auth==1">
                                    <qrcode-vue :value="slotProps.data.auth_by" :size="50" level="H"></qrcode-vue>
                                    <small>{{ slotProps.data.auth_by }}</small><br>
                                    <small>{{ slotProps.data.time_verif }}</small>
                                </span>
                                <span v-if="slotProps.data.auth==0">
                                    <Button icon="pi pi-lock-open" class="p-button-rounded p-button-warning"
                                        @click="call_oto(slotProps.data.id,7)" />
                                </span>
                            </template> -->
                        </Column>
                        <Column field=""  header="AKSI">
                            <template #body='slotProps'>
                                <Button label="Tampilkan" align="" @click="call_details_form(slotProps.data)" icon="pi pi-check"
                                class="p-button" />
                            </template>
                        </Column>
                      
                        <!-- <Column field="JENISRAWAT" :sortable="true" header="JENIS RAWAT"></Column> -->

                    </DataTable>
                </div>
            </div>

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
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
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
                    mode: 0
                },
                isLoading: false,
                fullPage: true,
                filters1: {},
                filters2: {},
                details_pasien:[],
                displayBasic2:false

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.listpermintaan_fisio();
            this.initFilters1()
            this.initFilters2()
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            call_details_form(data)
            {
                this.openBasic2();
                this.details_pasien = data; 
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            async listpermintaan_fisio() {
                this.isLoading = true;
                this.form.mode = 1
                await axios.post('/listpermintaan_fisio', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response;
                      
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
            }
            }
            }

</script>