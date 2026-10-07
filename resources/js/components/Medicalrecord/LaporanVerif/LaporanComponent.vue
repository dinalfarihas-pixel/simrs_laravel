<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.tglawal" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 10em; " />
                    <Calendar v-model="form.tglakhir" class="text-sm" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 10em; " />
                    <Select v-model="form.ruanganselected" style="width: 10em;" class="mr-2"
                            :options="ruangan" optionLabel="NAMA" @change="change_ruangan" :filter="true"
                            placeholder="Pilh ruangan rawat" :showClear="false">
                            <template #option="slotProps">
                                <div class="p-dropdown-car-option">
                                    <span>{{slotProps.option.NAMA}}</span>
                                </div>
                            </template>
                        </Select>
                    <Button label="Tampilkan" align="" @click="get_data_laporan()" icon="pi pi-check"
                        class="p-button" />
                </div>
            </div>

            <div class="card elevation-0">
                <div class="card-header">

                </div>
                <div class="card-body">


                    <div class="card ">

                        <DataTable fixTableHead :value="fact" :rowHover="true" columnResizeMode="fit"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm mt-4"
                            responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                            v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100,200]">
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
                                    {{ slotProps.index + 1 }}
                                </template>
                            </Column>

                            <Column field="CTT_CODER" :sortable="true" header="CATATAN VERIFIKATOR">
                                <template #body='slotProps'>
                                    <div style="color: red">{{ slotProps.data.CTT_CODER }}</div>

                                </template>
                            </Column>
                            <Column field="AKSI" header="AKSI">
                                <template #body='slotProps'>
                                    <div class="d-flex flex-column" style="gap:4px">
                                        <button type="button" @click="sudah_dilengkapi(slotProps.data,slotProps.index)" class="btn btn-block btn-success btn-sm">Sudah dilengkapi</button>
                                        <button v-if="isIgdSelected" type="button"
                                            @click="openIgdPage(slotProps.data)"
                                            class="btn btn-block btn-primary btn-sm">
                                            <i class="pi pi-external-link mr-1"></i>Buka IGD
                                        </button>
                                    </div>
                                </template>
                            </Column>
                            <Column field="NOMR" :sortable="true" header="NOMR" :styles="{'width':'10em'}">
                            </Column>
                            <Column field="NAMAPASIEN" :sortable="true" header="NAMAPASIEN"></Column>
                            <Column field="POLI" :sortable="true" header="POLI/RUANG"></Column>
                            <Column field="ALAMAT" :sortable="true" header="ALAMAT"></Column>
                            <Column field="HAKKELAS" :sortable="true" header="HAKKELAS"></Column>
                            <Column field="MASUKPOLY" :sortable="true" header="TGL RAWAT"
                                :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="KELUARPOLY_NULL" :sortable="true" header="TGL PULANG"
                                :styles="{'text-align':'right'}">
                            </Column>
                            <Column field="NOJAMINAN" :sortable="true" header="NOJAMINAN"></Column>

                            <Column field="JENISRAWAT" :sortable="true" header="JENIS RAWAT"></Column>

                        </DataTable>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    tglawal: '',
                    tglakhir: '',
                    mode: 'history3',
                    noregister:'',
                    kodeunit:'',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },

                },
                ruangan: [],
                isLoading: false,
                fullPage: true,
                filters1: {},
                filters2: {},
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.tglawal = currentDate;
            this.form.tglakhir = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();;
            this.initFilters1();
            this.initFilters2();
            this.getnamaruangan_poli();
        },
        computed: {
            isIgdSelected() {
                const r = this.form.ruanganselected;
                if (!r || !r.NAMA) return false;
                return (r.KODE_BPJS === 'IGD') || r.NAMA.toUpperCase().includes('IGD');
            },
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
            async get_data_laporan() {
                this.isLoading = true
                this.form.mode = "history3"
                this.fact =[]
                await axios.post('/laporan_verif_api', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response
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
            async change_ruangan(e) {
                console.log(e.value);
                this.form.kodeunit = e.value.KODE
            },
            async getnamaruangan_poli() {
                this.form.mode =0
                await axios.post('/getnamaruangan_poli',this.form)
                    .then(response => {
                        console.log('data ruangan')
                        console.log(response.data)
                        this.ruangan = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            openIgdPage(row) {
                localStorage.setItem('laporan_igd_filter', JSON.stringify({
                    tglawal: this.form.tglawal,
                    tglakhir: this.form.tglakhir,
                    ruanganselected: this.form.ruanganselected,
                }));
                window.open('/list-pasien-igd?noregister=' + row.NOPENDAFTARAN, '_blank');
            },
            async sudah_dilengkapi(row,index) {

                console.log(row);
                console.log(index);
                this.isLoading = true
                this.form.mode = "history3"
                this.form.noregister = row.NOPENDAFTARAN
                await axios.post('/set_sudah_dilenkapi_klaim', this.form)
                    .then(response => {
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message);
                            this.get_data_laporan()
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message);
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
