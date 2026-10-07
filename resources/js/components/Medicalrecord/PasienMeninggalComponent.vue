<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 20em; " />
                    <Button label="Tampilkan" align="" @click="getdata_pasien('history24')" icon="pi pi-check"
                        class="p-button" />
                        <!-- <Button label="Print" align="" @click="generateReport()" icon="pi pi-check"
                        class="p-button" /> -->
                     
                      
                </div>
            </div>

            <div class="card" >
                <div class="card-body"> 

                    <DataTable :value="fact" columnResizeMode="fit" v-model:filters="filters1" selectionMode="single"
                        stripedRows class="p-datatable-sm" showGridlines :resizableColumns="true" >
                        <template #header>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Global Search" />
                            </span>
                        </template>

                        <Column field="NOKTP" header="NOKTP" sortable> </Column>
                        <Column field="NOMR" header="NOMR"></Column>
                        <Column field="NOPENDAFTARAN" header="NOPENDAFTARAN"></Column>
                        <Column field="NAMAPASIEN" header="NAMAPASIEN"sortable>  
                            <template #body="slotProps">
                                        {{ slotProps.data.NAMAPASIEN }} -  {{ slotProps.data.USIA_PASIEN.tahun }} Thn, {{ slotProps.data.USIA_PASIEN.bulan }} Bln, {{ slotProps.data.USIA_PASIEN.hari }} Hari <br>
                             </template>
                        </Column>
                        <Column field="ALAMAT" header="ALAMAT"sortable> </Column>
                        <Column field="NAMADOKTER" header="DPJP"sortable> </Column>
                        <Column field="MASUKPOLY" header="MASUK"sortable> </Column>
                        <Column field="KELUARPOLY_NULL" header="KELUAR"sortable> </Column>
                        <Column field="LOS" header="LOS"sortable> </Column>
                        <Column field="WAKTU_KEMATIAN" header="WAKTU_KEMATIAN"sortable> </Column>
                        <Column field="SEBAB_KEMATIAN" header="SEBAB_KEMATIAN"sortable> </Column>
                        <Column field="KETERANGAN_MENINGGAL" header="KETERANGAN_MENINGGAL"sortable> </Column>
                        <Column field="" header="SURAT KET MENIGGAL"sortable> 
                            <template #body="slotProps">
                                <a href="/print-surat-meninggal" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a>
                            </template>
                        </Column>
                    </DataTable>

                </div>
            </div>
        </div>

 
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup';   
        import html2pdf from 'html2pdf.js'; 
    import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            ColumnGroup,
            Column,
            html2pdf, 
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
                    kodeunit: '',
                    norm: '',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
                    ruangan_tujuan_transfer: null,
                    old_ruangan: 0,
                    id_ruangan: 0,
                    noregister: ''
                },
                isLoading: false,
                fullPage: true,
               
                filters1: {},
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.initFilters1();
            this.getdata_pasien('history24');
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
            async getdata_pasien(mode) {
                this.fact = [];
                this.form.mode = mode;
                this.isLoading = true;
                await axios.post('/data_pasien_meninggal', this.form)
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
        },
    }

</script>
