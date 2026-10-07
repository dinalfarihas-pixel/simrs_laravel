<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Pegawai</h3>
                </div>
                <!-- <Button label="Tampilkan" align="" @click="GetData()" icon="pi pi-check" class="p-button" /> -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">

                            <div class="row">
                                <div class="col-12 col-sm-3 col-md-2">
                                    <div class="info-box bg-info">
                                        <div class="info-box-content">
                                            <span class="info-box-text">ASN</span>
                                            <span class="info-box-number">
                                                <h3><strong> {{summary.ASN}}</strong> </h3>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-3 col-md-2">
                                    <div class="info-box mb-3 bg-indigo ">
                                        <div class="info-box-content">
                                            <span class="info-box-text">P3K</span>
                                            <span class="info-box-number">
                                                <h3><strong> {{summary.P3K}}</strong></h3>

                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.col -->

                                <div class="col-12 col-sm-3 col-md-2">
                                    <div class="info-box bg-danger mb-3">
                                        <div class="info-box-content">
                                            <span class="info-box-text">NON ASN</span>
                                            <span class="info-box-number">
                                                <h3> <strong> {{summary.NON_ASN }}</strong></h3>
                                                <!-- <InputNumber v-model="summary.sumpembelian" class="disable" />  -->
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- fix for small devices only -->
                                <div class="clearfix hidden-md-up"></div>

                                <div class="col-12 col-sm-3 col-md-2">
                                    <div class="info-box mb-3 bg-success">

                                        <div class="info-box-content">
                                            <span class="info-box-text">Belum Menentukan</span>
                                            <span class="info-box-number">
                                                <h3> <strong> {{summary.OTHER}}</strong>
                                                </h3>
                                                <!-- <InputNumber v-model="summary.sumdistribusi" class="disable" />  -->
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div class="card">
                <div class="card-head">

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
                        <Column field="ID" header="ID">
                            <template #body='slotProps'>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-tag" />
                                </span>
                            </template>
                        </Column>

                        <Column field="NOKTP" :sortable="true" header="NOKTP"></Column>
                        <Column field="NIP" :sortable="true" header="NIP"></Column>
                        <Column field="NAMA" :sortable="true" header="NAMA"></Column>
                        <Column field="AGAMA" :sortable="true" header="AGAMA"></Column>
                        <Column field="TGLLAHIR" :sortable="true" header="TGLLAHIR"></Column>
                        <Column field="JENISKELAMIN" :sortable="true" header="JENISKELAMIN"></Column>
                        <Column field="ALAMAT" :sortable="true" header="ALAMAT"></Column>
                        <Column field="PROVINSI" :sortable="true" header="PROVINSI"> </Column>
                        <Column field="KOTA" :sortable="true" header="KOTA"></Column>
                        <Column field="NAMA_KECAMATAN" :sortable="true" header="NAMA_KECAMATAN"></Column>
                        <Column field="NOTELP" :sortable="true" header="NOTELP"></Column>
                        <Column field="RUANGAN" :sortable="true" header="RUANGAN"></Column>
                        <Column field="JENIS_KARYAWAN" :sortable="true" header="JNS PEG">
                            <template #body='slotProps'>
                                <span v-if="slotProps.data.JENIS_KARYAWAN=='ASN'">
                                    <Badge :value="slotProps.data.JENIS_KARYAWAN" severity="success" class="mr-2">
                                    </Badge>
                                </span>
                                <span v-if="slotProps.data.JENIS_KARYAWAN=='P3K'">
                                    <Badge :value="slotProps.data.JENIS_KARYAWAN" severity="secondary" class="mr-2">
                                    </Badge>
                                </span>
                                <span v-if="slotProps.data.JENIS_KARYAWAN=='NON ASN'">
                                    <Badge :value="slotProps.data.JENIS_KARYAWAN" severity="warning" class="mr-2">
                                    </Badge>
                                </span>

                            </template>
                        </Column>
                        <Column field="" :sortable="true" header="AKSI">
                            <template #body='slotProps'>
                                <!-- <Button label="Reset pass" class="button p-button-sm" icon="pi pi-action" /> -->
                                <button type="button" class="btn btn-block btn-primary btn-sm" @click="resetpassword(slotProps.data)">Reset Password</button>
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
    import Badge from 'primevue/badge';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            Badge
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
                    mode: 2,
                    nik:''
                    
                },
                summary: {
                    ASN: 0,
                    P3K: 0,
                    NON_ASN: 0,
                    OTHER: 0
                },
                isLoading: false,
                fullPage: true,
                filters1: {},
                filters2: {},
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.GetData();
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
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
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
            async resetpassword(data)
            {
                var currentDate = new Date();
                this.isLoading = true;
                this.form.NIK = data.NOKTP; 
           
         
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/reset_password', this.form)
                    .then(response => { 
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message);
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message);
                        } 
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async GetData() {
                var currentDate = new Date();
                this.isLoading = true;
                //this.form.selectedJenisRawat = this.form.selectedJenisRawat.code;  
                await axios.post('/getMasterKaryawan', this.form)
                    .then(response => {

                        console.log(response.data);
                        this.fact = response.data.response; 

                        this.summary = response.data.summary;

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
                    duration: 5000,
                    dismissible: true
                })
            },
        },
    }
</script>