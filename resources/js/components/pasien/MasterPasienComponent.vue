<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Master pasien</h3>
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
                        <Column field="NOMR" :sortable="true" header="NOMR" :styles="{'width':'10em'}">
                        </Column>
                        <Column field="NAMAPASIEN" :sortable="true" header="NAMAPASIEN"></Column>
                        <Column field="nama_provinsi" :sortable="true" header="PROV"></Column>
                        <Column field="namakota" :sortable="true" header="KAB/KOTA"></Column>
                        <Column field="AGAMADISPLAY" :sortable="true" header="AGAMA"></Column>
                        <Column field="NOTELP" :sortable="true" header="NOTELP"></Column>
                        <Column field="NOKTP_ENKRIP" :sortable="true" header="NIK"></Column>   
                        <Column field="USIA_LENGKAP" :sortable="true" header="USIA"></Column>
                        <Column field="ALAMAT" :sortable="true" header="ALAMAT"></Column>   
                    </DataTable>
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
                    startdate: '',
                    enddate: '', 
                    mode:0,
                    nomr:''
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
            this.masterpasien(2,0);
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
                    duration: 5000,
                    dismissible: true
                })
            },
            async masterpasien(mode,nomr) {
                this.isLoading = true 
                this.form.mode =mode,
                this.form.nomr=''
                await axios.post('/masterpasien', this.form)
                    .then(response => { 

                        console.log(response.data)
                        if (response.data.metadata.code == 200) { 
                           this.fact = response.data.response;
                        } else {
                            this.open('warning', response.data.metadata.message);
                        }

                        this.isLoading = false
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
