<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <!-- <Dialog header="Input Nama Dokter" v-model:visible="displayModal" :containerStyle="{width: '70vw'}"
                :modal="true"> -->

            <!-- <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                    <Button label="Simpan" icon="pi pi-check" @click="simpan_dokter()" autofocus />
                </template>
            </Dialog> -->
            <Card>
                <template #header>
                    <div class="card-header">
                        <h3 class="card-title">Master dokter</h3>
                    </div>
                </template>
                <template #content>
                    <!-- <img alt="user header" src="https://ws-simrs.link/images/dokter1.jpg"> -->
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" style="height: 2.5em;" class="p-button-success mr-2"
                                @click="show_form_input=true" />
                            <!-- <Button label="Delete" icon="pi pi-trash" style="height: 2.5em;" class="p-button-danger" /> -->
                        </template>

                        <template #end>
                            <Button label="Reload" @click="getdata()" style="height: 2.5em;" icon="pi pi-refresh"
                                class="p-button-help" />
                        </template>
                    </Toolbar>

                    <div class="row" v-show="show_form_input">
                        <div class="col-12 col-sm-6 col-md-6">
                            <div class="form-group">
                                <label for="nama">NIK</label>
                                <input type="text" class="form-control" v-model="form.nik" id="namadokter"
                                    placeholder="NIK">
                            </div>
                          
                                <div class="form-group">
                                    <label for="nama">Kode Dokter BPJS</label>
                                    <div class="row">
                                        <div class="col-12 col-sm-3 col-md-3">
                                            <input type="text" v-model="form.kddokter" class="form-control"
                                                id="kddokter" placeholder="KODE DOKTER BPJS">
                                        </div>
                                        <div class="col-12 col-sm-3 col-md-6">
                                            <!-- <Button label="" icon="pi pi-user-edit" @click="getdata_bpjs()" style="height: 2.3em;"
                                            class="p-button-success mr-2 button-sm" /> -->
                                            <Select v-model="dokterbpjs_selected" @change="handleOptionChange"
                                                :options="masterdokter_bpjs" :filter="true" :showClear="true"
                                                optionLabel="namadokter" placeholder="Pilih dokter BPJS" />
                                        </div>
                                    </div>
                                </div>
                         
                            <div class="form-group">
                                <label for="nama">Nama</label>
                                <input type="text" v-model="form.namadokter" class="form-control" id="namadokter"
                                    placeholder="Nama dokter">
                            </div>
                            <div class="form-group">
                                <div class="col-md-4">
                                    <label for="integeronly">Profesi</label>
                                </div>
                                <Select v-model="form.polibpjs_selected" :options="master_poli" :filter="true"
                                    :showClear="true" optionLabel="nmpoli" placeholder="Pilih dokter BPJS" />
                            </div>
                            <div class="col-md-4">
                                <Button label="Simpan" icon="pi pi-check" @click="simpan_dokter()" autofocus />
                                <Button label="Batal" icon="pi pi-times" @click="show_form_input=false"
                                    class="p-button-text" />
                            </div>
                        </div>
                    </div>

                    <ConfirmDialog></ConfirmDialog>
                    <span v-if="show_form_input==false">
                        <DataTable :value="fact" v-model:filters="filters1" :rowHover="true" stripedRows
                            :resizableColumns="true" class="p-datatable-sm"
                            responsiveLayout="scroll" :paginator="true" :scrollable="true" scrollHeight="flex"
                            :rows="10"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            :rowsPerPageOptions="[10,20,50]">
                            <template #header>
                                <div class="table-header">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText v-model="filters1['global'].value" placeholder="Global Search" />
                                    </span>
                                    <Button type="button" icon="pi pi-search" @click="handleClick(slotProps.response)"
                                        class="p-button-success" style="margin-right: .5em"></Button />
                                </div>
                            </template>
                            <template #loading>
                                Loading customers data. Please wait.
                            </template>
                            <Column field="KDDOKTER" :sortable="true" header="KD"></Column>
                            <Column field="NAMADOKTER" :sortable="true" header="NAMA"></Column>
                            <Column field="NAMAPROFESI" :sortable="true" header="PROFESI/POLIKLINIK"></Column>
                            <Column field="KDPOLY_BPJS" :sortable="true" header="KD POLI"> </Column>
                          
                            <Column headerStyle="width: 8em"  bodyStyle="text-align: center" header="EDIT">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-user-edit" @click="handleClick(slotProps)"
                                        class="p-button-success p-button-text"  ></Button />
                                </template>
                            </Column>
                            <Column field="STTS"  header="NON AKTIF"> 
                                <template #body='slotProps'>
                                   <Button type="button" icon="pi pi-times" @click="delete_dokter(slotProps)"
                                        class="p-button-danger"></Button />
                                </template>
                            </Column>
                        </DataTable>
                    </span>
                    <!-- <table class="table table-bordered table-striped  dataTable dtr-inline">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NIK</th>
                                <th>KD DOKTER</th>
                                <th>DOKTER </th>
                                <th>PROFESI</th> 
                                <th>AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in fact">
                                <td>{{ index + 1 }} </td>
                                <td>{{ row.KDDOKTER }} </td>
                                <td>{{ row.NAMADOKTER }} </td>
                                <td>{{ row.NAMAPROFESI}} </td>
                                <td>{{ row.KODE_DOKTER_BPJS }} </td>
                                <td> <Button label="" icon="pi pi-user-edit" style="height: 2.3em;"
                                        class="p-button-success mr-2 button-sm" /> </td>

                            </tr>
                        </tbody>
                    </table> -->

                </template>

            </Card>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Dropdown from 'primevue/dropdown';
    import ConfirmDialog from 'primevue/confirmdialog';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            Dropdown,
            ConfirmDialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                masterdokter_bpjs: [],
                stts_ative_selected:'',
                stts_ative:[
                    {
                        stts:'aktif',
                        code:0,
                    },
                    {
                        stts:'Non aktif',
                        code:1,
                    }
                ],
                master_poli: [],
                dokterbpjs_selected: '', 
                profesi: [{
                        name: 'Dokter Umum',
                        kode: '0'
                    },
                    {
                        name: 'Dokter Spesialis',
                        kode: '0'
                    }
                ],
                is_aktif: true,
                form: {
                    startdate: '',
                    enddate: '',
                    kddokter: '',
                    namadokter: '',
                    nik: '',
                    profesi: '',
                    polibpjs_selected: '',
                },
                displayModal: false,
                isLoading: false,
                fullPage: true,
                filters1: {},
                show_form_input: false
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;

        },
        created() {
            // this.fetchData();
            this.getdata();
            this.getdata_bpjs();
            this.getdata_poli_bpjs();
            this.initFilters1();
            // this.getdata();
        },
        methods: {
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            openModal() {
                this.displayModal = true;
            },
            closeModal() {
                this.displayModal = false;
            },
            fetchData() {
                var currentDate = new Date();

            },
            delete_dokter(data) {
                this.$confirm.require({
                    message: 'Dokter ini akan di non aktifkan?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        //callback to execute when user confirms the action
                    },
                    reject: () => {
                        //callback to execute when user rejects the action
                    }
                });
            },
            handleOptionChange() {
                // Logic to handle the selected option on @change
                this.form.kddokter = this.dokterbpjs_selected.kodedokter;
                this.form.namadokter = this.dokterbpjs_selected.namadokter
            },

            async getdata_bpjs() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/datadokter-bpjs-api', )
                    .then(response => {
                        this.masterdokter_bpjs = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getdata_poli_bpjs() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/datapoli-bpjs-api', )
                    .then(response => {
                        this.master_poli = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },

            async getdata() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/masterdokter', )
                    .then(response => {
                        this.fact = response.data
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
            async simpan_dokter() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/simpan_edit_dokter', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.code == 200) {
                            this.open("success", "Dokter telah di tambahkan");
                            this.getdata();
                            this.form.namadokter = "";
                            this.form.kodedokter = "";
                            this.form.nik = "";
                        } else {
                            this.open("warning", response.data.message);
                        }

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
