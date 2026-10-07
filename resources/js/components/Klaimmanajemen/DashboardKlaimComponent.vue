<template>

    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <label for="">Tanggal Pulang </label>
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 10em; " />

                    <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                    aria-placeholder="Tanggal awal" style="width: 10em; " />

                    <Select v-model="form.jenisrawatSelected" :options="jenisrawat" placeholder="Jenis rawat" />

                    <Select v-model="form.carabayarSelecated" :options="carabayar" placeholder="Cara bayar" />

                    <Select v-model="form.statuspulangSelected" :options="status_pulang" placeholder="Cara bayar" />

                    <Button label="Tampilkan" align="" @click="getdata()" icon="pi pi-check" class="p-button" />

                </div>
            </div>


            <Dialog header="Rincian" v-model:visible="showRincian" :containerStyle="{width: '70vw'}" :modal="true">

                <div class="row">
                    <div class="col-md-5">
                        <h4>{{sepSelected}} - {{ nama_pasien }}</h4>
                    </div>
                    <div class="col-md-2">
                        <Button label="" icon="pi pi-copy" @click="copyText" class="p-button-text" />
                    </div>
                </div>
                <hr>

                <div class="card">
                    <div class="card-header">
                        <h5>Diagnosa</h5>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>DX</th>
                                <th>CAPTION</th>
                                <th>JNS DX</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in rincian_dx.dx">
                                    <td> <Button label="" icon="pi pi-copy" @click="CopyDx(data.KODE_DIAGNOSA)" class="p-button-text" /></td>
                                    <td>{{ data.KODE_DIAGNOSA }}</td>
                                    <td>{{ data.NAMA_DIAGNOSA }}</td>
                                    <td>{{ data.JENIS_DIAGNOSA }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 
                <div class="card">
                    <div class="card-header">
                        <h5>Procedure</h5>
                    </div>
                    <div class="card-body">

                        <table class="table table-sm hover">
                            <thead>
                            <tr>
                                <th>PROC</th>
                                <th>CAPTION</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in rincian_dx.proc">
                                    <td> <Button label="" icon="pi pi-copy" @click="CopyProc(data.KODE_TINDAKAN)" class="p-button-text" /></td>
                                    <td>{{ data.KODE_TINDAKAN }}</td>
                                    <td>{{ data.NAMA_TINDAKAN }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5>Billing</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4"> 
                                <table class="table table-sm hover">
                                    <thead>
                                    <tr>
                                        <th>KATEGORI</th>
                                        <th>TOTAL</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in databiling">
                                            <td>{{ data.GROUPCBG }}</td>
                                            <td>{{ data.TOTAL }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Menambahkan daftar lampiran file</h3>
                    </div>
                    <div class="card-body d-flex justify-content-center">
                        <Button label="Pilih Lampiran" align="" @click="showdialogParam=true" icon="pi pi-upload"
                            class="p-button ml-1" />
                        <Button label="Refresh" align="" @click="getdata_lampiran(data_trans);" icon="pi pi-refresh"
                            class="p-button p-button-success" />

                        <!-- <video ref="video" width="640" height="480" autoplay></video>
                    <button @click="capture">Capture</button>
                    <canvas ref="canvas" width="640" height="480" style="display: none;"></canvas>
                    <img :src="imageData" alt="Captured Image" v-if="imageData"> -->
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5>Lampiran</h5>
                    </div>
                    <div class="card-body">
                        <Galleria :value="list_lampiran" v-model:activeIndex="activeIndex"
                            :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
                            :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false"
                            v-model:visible="displayCustom">
                            <template #item="slotProps">
                                <img :src="slotProps.item.file_lampiran" :alt="slotProps.item.caption_file"
                                    style="width: 100%; display: block;" />
                            </template>
                        </Galleria>

                    </div>
                </div>


                <div class="card card-success">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-4" v-for="(image, index) of list_lampiran">
                                <div class="card mb-2 bg-gradient-dark">
                                    <img class="card-img-top" :src="image.file_lampiran" alt="Dist Photo 1">
                                    <div class="card-img-overlay d-flex flex-column justify-content-end">
                                        <h5 class="card-title text-primary text-white">{{ image.caption_file }}</h5>
                                        <div class="card-text text-white pb-2 pt-1"></div>
                                        <Button label="" align="" @click="imageClick(index)" icon="pi pi-search"
                                            class="p-button p-button-success" style="width: 5em;" />
                                        <Button label="" align="" @click="hapusLampiranGambar(index)" icon="pi pi-times"
                                            class="p-button p-button-danger" style="width: 5em;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Tutup" icon="pi pi-check" @click="showRincian=false" autofocus />
                </template>
            </Dialog>


            <div class="card"> 
                <div class="card-body">
                    <DataTable fixTableHead :value="fact" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                        stripedRows sortMode="multiple" class="p-datatable-sm mt-4" responsiveLayout="scroll"
                        :resizableColumns="true" :paginator="true" :rows="10" v-model:filters="filters1"
                        :rowsPerPageOptions="[10,20,50,100,200]">
                        <template #header>
                            <div class="table-header">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters1['global'].value" placeholder="Pencarian" />
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
                        <Column field="" :sortable="true" header="STTS_CODER" :styles="{'width':'10em'}">
                            <template #body='slotProps'>
                                <span v-if="slotProps.data.STTS_CODER==1">
                                    <!-- <Button icon="pi" class="p-button p-button-success" /> -->
                                    <Badge value="Ok" severity="success" class="mr-2"></Badge>
                                </span>
                                <span v-if="slotProps.data.STTS_CODER==2">
                                    <!-- <Button icon="pi" class="p-button p-button-warning" /> -->
                                    <Badge :value="slotProps.data.CTT_CODER" severity="warning" class="mr-2"></Badge>
                                   
                                </span>
                            </template>
                        </Column>
                        <!-- <Column field="NOPENDAFTARAN" :sortable="true" header="NOPENDAFTARAN"
                            :styles="{'width':'10em'}">
                        </Column> -->
                        <Column field="" :sortable="true" header="RINCIAN">
                            <template #body='slotProps'>
                                <Button icon="pi" class="p-button p-button-sm p-button-default"
                                    @click="getdata_dx(slotProps.data)" />
                            </template>
                        </Column>
                        <Column field="NOSEP" :sortable="true" header="NOSEP"></Column>
                        <Column field="NAMAPASIEN" :sortable="true" header="NAMAPASIEN"></Column>
                        <Column field="NAMADOKTER" :sortable="true" header="NAMADOKTER"></Column>
                        <Column field="NOMR" :sortable="true" header="NOMR"></Column>
                        
                        <Column field="TGLREG" :sortable="true" header="TGLREG"></Column>
                     
                        <Column field="POLI" :sortable="true" header="POLI"></Column> 
                        <Column field="STTS_PULANG" :sortable="true" header="STTS_PULANG"></Column>
                        <Column field="" :sortable="true" header="SUDAHFINALCLAIM">
                            <template #body='slotProps'>
                                <span v-if="slotProps.data.SUDAHFINALCLAIM === 'SENT/FINAL'"> 
                                    <Badge value="SENT/FINAL" severity="success" class="mr-2"></Badge>
                                </span>
                                <span v-else> 
                                    <Badge :value="slotProps.data.SUDAHFINALCLAIM" severity="warning" class="mr-2"></Badge>
                                   
                                </span>
                            </template>
                        </Column> 
                      
                    </DataTable>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>

        <Dialog header="Upload file" v-model:visible="showdialogParam" :containerStyle="{width: '50vw'}" :modal="true">
            <upload-file :noregister="data_trans.NOPENDAFTARAN" :moduleupload='modeduleFrom'
                :foldername="form.foldername"></upload-file>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showdialogParam=false" class="p-button-text" />
            </template>
        </Dialog>

    </section>

</template>

<script>
    import Loading from 'vue-loading-overlay';
    import DataTable from 'primevue/datatable'
    import Galleria from 'primevue/galleria';
    import Badge from 'primevue/badge';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            DataTable,
            FilterMatchMode,
            Galleria,
            Badge
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                list_lampiran: [],
                rincian_dx: {
                    dx: [],
                    proc: []
                },
                databiling: [],
                responsiveOptions: [{
                        breakpoint: '1024px',
                        numVisible: 5
                    },
                    {
                        breakpoint: '768px',
                        numVisible: 3
                    },
                    {
                        breakpoint: '560px',
                        numVisible: 1
                    }
                ],
                form: {
                    startdate: '',
                    enddate: '',
                    jenisrawatSelected: 'JALAN',
                    carabayarSelecated: 'BPJS',
                    statuspulangSelected: 'SUDAH PULANG',
                    NOSEP: '',
                    noregister: '',
                    foldername: 'LAMPIRAN',
                },
                activeIndex: 0,
                sepSelected: '',
                nama_pasien: '',
                isLoading: false,
                fullPage: true,
                jenisrawat: ['JALAN', 'INAP'],
                carabayar: ['BPJS'],
                status_pulang: ['ALL', 'SUDAH PULANG', 'SEDANG RAWAT'],
                filters1: {},
                showRincian: false,
                copied: false,
                modeduleFrom: 'LAMPIRAN',
                displayCustom: false,
                showdialogParam: false,
                data_trans: ''
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
            this.initFilters1()

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
                    duration: 3000,
                    dismissible: true
                });
            },
            showModalRincian(data) {
                // this.sepSelected ="";
                // this.sepSelected = data.NOSEP 
                // this.getdata_dx(data.NOSEP)
            },
            async copyText() {
                try {
                    await navigator.clipboard.writeText(this.sepSelected);
                    this.copied = true;
                    setTimeout(() => (this.copied = false), 2000); // Show "copied" message for 2 seconds
                } catch (error) {
                    console.error("Failed to copy text: ", error);
                }
            },
            async CopyDx(dx) {
                try {
                    await navigator.clipboard.writeText(dx); 
                
                } catch (error) {
                    console.error("Failed to copy text: ", error);
                }
            },
            async CopyProc(proc) {
                try {
                    await navigator.clipboard.writeText(proc); 
                
                } catch (error) {
                    console.error("Failed to copy text: ", error);
                }
            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/dashboard_data_klaim', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            imageClick(index) {
                this.activeIndex = index;
                this.displayCustom = true;
            },
            async getdata_dx(data) {
                this.isLoading = true;
                this.form.NOSEP = data.NOSEP;
                await axios.post('/dashboard_data_klaim_get_dx', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.showRincian = true;
                        console.log(response.data)
                        this.rincian_dx = response.data.data
                        if (this.rincian_dx == null || this.rincian_dx == "") {
                            this.rincian_dx = {
                                dx: [],
                                proc: []
                            }
                        }
                        this.sepSelected = data.NOSEP;
                        this.nama_pasien = data.NAMAPASIEN + ' (' + data.NOMR + ')';
                        this.data_trans = data;
                        this.getdatabiliing(data);
                        this.getdata_lampiran(data);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async getdatabiliing(data) {

                this.form.NOSEP = data.NOSEP;
                this.form.NOMR = data.NOMR;
                this.databiling = null;
                this.isLoading = true
                await axios.post('/getdatabiliing', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.databiling = response.data.rincian
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async getdata_lampiran(data) {
                this.isLoading = true;
                this.form.noregister = data.NOPENDAFTARAN
                await axios.post('/getdata_lampiran', this.form)
                    .then(response => {
                        console.log(response.data.response)
                        this.list_lampiran = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async hapusLampiranGambar(index) {

                this.activeIndex = index;
                var data = this.list_lampiran[index];
                this.form.id = data.id;
                console.log(this.form.id);
                await axios.post('/hapus_datalampiran', this.form)
                    .then(response => {
                        var res = response.data.metadata
                        if (res['code'] == 200) {
                            alert('berhasil dihapus')
                            this.getdata_lampiran(this.data_trans);
                        } else {
                            alert('Gagal dihapus')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }
</script>