<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Laporan Pembelian pertahun berdasarkan jenis dan supplier</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <MultiSelect v-model="form.lokasi_selected" style="width: 15em;" :options="lokasi_arr"
                                    optionLabel="DISPLAY" placeholder="Plih lokasi" :filter="true"
                                    class="multiselect-custom">  
                            </MultiSelect>
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="year"
                                dateFormat="yy" :yearNavigator="true" aria-placeholder="Tanggal awal"
                                style="width: 14em; " />
                            <Button label="Tampilkan" align="" @click="getdata(2)" icon="pi pi-check"
                                class="p-button" />
                        </div>
                        <div class="col-md-4">
                            <div class="info-box elevation-0" style="height:30px;">
                                <span class="info-box-icon bg-success"><i class="far fa-flag"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">TOTAL</span>
                                    <span class="info-box-number">
                                        <h4>{{ $numeral(GrandTotal, '0,0.00') }}</h4>
                                    </span>
                                </div>

                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-10">
                    <div class="card ">
                        <div class="card-body">
                            <DataTable :value="fact" :resizableColumns="true" columnResizeMode="fit"
                                selectionMode="single" :paginator="true" :rows="10" stripedRows sortMode="multiple" class="p-datatable-sm"
                                responsiveLayout="scroll" scrollHeight="flex" v-model:filters="filters2"  :rowsPerPageOptions="[10,20,50,100,200,500]">
                                <template #header>
                                    <div class="table-header">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />  <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                        </span> 
                                    </div>
                                </template>
                                <template #loading>
                                    Loading customers data. Please wait.
                                </template> 
                                <!-- <Column field="IDSUPLIER" header="[1] IDSUPLIER" sortable></Column> -->
                                <!-- <Column field="JML_FAKTUR" header="[1] JMLTRANSAKSI" sortable></Column> -->
                                <Column field="NAMASUPLIER" header="[1] SUPPLIER" sortable></Column>
                                <Column field="GRAND_TOTAL" header="TOTAL" sortable :styles="{'text-align':'right'}">
                                    <template #body="slotProps">
                                        {{formatCurrency(slotProps.data.GRAND_TOTAL)}}
                                    </template>
                                </Column>
                                <Column bodyStyle="text-align: center" header="PREVIEW">
                                    <template #body='slotProps'>
                                        <button type="button" icon="pi pi-search" @click="show_detils(slotProps.data)"
                                            class="btn btn-block btn-success btn-xs"  style="width: 6em;">Prev</button>
                                    </template>
                                </Column>

                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog header="Breakdown" v-model:visible="show_break_down" :containerStyle="{width: '80vw'}" :modal="true"> 
                <div class="card">
                    <div class="card-body table-sm table-responsive p-0">
                        <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
                        <DataTable fixTableHead :value="item_brekdown" :rowHover="false" columnResizeMode="fit"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm mt-4"
                            :resizableColumns="true" :paginator="true" :rows="20" v-model:filters="filters2"
                            :rowsPerPageOptions="[10,20,50,100,200]"  @row-expand="onRowExpand" v-model:expandedRows="fact">
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
                            <Column field="" header="ID">
                                <template #body='slotProps'>

                                    <span class="p-input-icon-left">
                                        <i class="pi pi-tag" />
                                    </span>


                                </template>
                            </Column>
                            <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->
                            <Column :expander="true" :headerStyle="{'width': '3rem'}" />
                            <Column field="NO_REFF" :sortable="true" header="NO FAKTUR"></Column>
                            <Column field="ID_PENERIMAAN" :sortable="true" header="ID_PENERIMAAN"></Column>
                            <Column field="NAMASUPLIER" :sortable="true" header="NAMASUPLIER"></Column>
                            <Column field="TGL_PENERIMAAN" :sortable="true" header="TGL_PENERIMAAN"></Column>
                            <Column field="GRAND_TOTAL" :sortable="true" :styles="{'text-align':'right'}" header="GRAND_TOTAL"> 
                                <template #body="slotProps">
                                       <strong> {{formatCurrency(slotProps.data.GRAND_TOTAL)}}</strong>
                                </template> 
                            </Column>
                            
                            <Column field="LAMPIRAN" :sortable="true" header="FAKTUR">  
                                <template #body='slotProps'> 
                                    <ImagePreview :src="slotProps.data.LAMPIRAN" alt="Image" width="50" preview
                                    class="mb-2"> 
                                </ImagePreview>
                                </template>
                            </Column>
                            <template #expansion="slotProps1">
                                <div class="orders-subtable">
                                    <h5>ID Penerimaan : {{ form.ID_PENERIMAAN }}  </h5>
                                    <DataTable :value="details_expanse">
                                        <!-- <Column field="ID_PENERIMAAN" header="ID_PENERIMAAN" sortable></Column> -->
                                        <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE" sortable></Column> -->
                                        <Column field="BARCODE" header="BARCODE" sortable></Column>
                                        <Column field="NAMA" header="NAMA" sortable></Column>
                                        <Column field="KATEGORI" header="KATEGORI" sortable></Column>
                                        <Column field="HARGA_POKOK" header="HARGA_POKOK"  :styles="{'text-align':'right','background-color': 'azure'}" sortable>
                                            <template #body="slotProps1">
                                                {{formatCurrency(slotProps1.data.HARGA_POKOK)}}
                                            </template> 
                                        </Column>
                                        <Column field="QTY" header="QTY" sortable   :styles="{'text-align':'right','background-color': 'cornsilk'}">
                                            <template #body="slotProps1">
                                                <span class="product-badge-primary">{{slotProps1.data.QTY}}</span> 
                                            </template>  
                                        </Column>
                                        <Column field="SATUAN" header="SATUAN" sortable :styles="{'text-align':'center','background-color': 'cornsilk'}"></Column>
                                        <Column field="SUBTOTAL" header="SUBTOTAL" sortable :styles="{'text-align':'right','background-color': 'azure'}">
                                        <Column field="BACTH_NUMBER" header="BACTH_NUMBER" sortable></Column>
                                        <Column field="EXP_DATE" header="EXP_DATE" sortable></Column>
                                            <template #body="slotProps1">
                                                 {{formatCurrency(slotProps1.data.SUBTOTAL)}}
                                            </template>  
                                        </Column>
                                    </DataTable>
                                </div>
                            </template>
                            <ColumnGroup type="footer">
                                    <Row>
                                        <Column footer="Totals : " :colspan="5" :footerStyle="{'text-align':'right'}" />
                                        <Column :footer="summTotal_item(item_brekdown)" :styles="{'text-align':'right'}"> 
                                        </Column>
                                    </Row>
                            </ColumnGroup>
                        </DataTable> 
                    </div>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="show_break_down=false" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="show_break_down=false" autofocus />
                </template>
            </Dialog>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    import ImagePreview from 'primevue/image';
    import {  FilterMatchMode } from 'primevue/api';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            ProgressBar,
            ImagePreview
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                lokasi_arr:[],
                details_expanse:[],
                form: {
                    startdate: '',
                    enddate: '',
                    mode: 2,
                    bulan_selected: {
                        name: "Semua Bulan",
                        code: 0
                    },
                    supplier: null,
                    lokasi_selected:null,
                    ID_PENERIMAAN:''
                    
                },
                bulan: [{
                        name: "Semua Bulan",
                        code: 0
                    },
                    {
                        name: "Jan",
                        code: 1
                    },
                    {
                        name: "Feb",
                        code: 2
                    },
                    {
                        name: "Mar",
                        code: 3
                    },
                    {
                        name: "Apr",
                        code: 4
                    },
                    {
                        name: "Mei",
                        code: 5
                    }
                ],
                isLoading: false,
                fullPage: true,
                show_break_down: false,
                GrandTotal: 0,
                item_brekdown: [],
                mode: 2,
                filters2: {},
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate; 
            this.get_lokasi();
        },
        created() {
            //this.fetchData();
            this.initFilters2();
          
        },
        methods: {
            onRowExpand(event) {  
                this.details_expanse=[];
                this.form.ID_PENERIMAAN = event.data.ID_PENERIMAAN;
                console.log(this.form.ID_PENERIMAAN)
                this.getdata(4);
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            formatCurrency(value) { 
                if (value !== undefined && value !== null) {
                    value = parseFloat(value);
                    return value.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    });
                } else {
                    return 0;
                }

            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ === 1);
                        this.isLoading = false
                        console.log('call lokasi')
                        console.log(this.lokasi_arr);
                        // this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            summTotal(row) {
                let hasil = 0;;
                for (let i = 0; i < row.length; i++) {
                    hasil = parseFloat(hasil) + parseFloat(row[i].GRAND_TOTAL); 
                }
                this.GrandTotal = hasil;
                return hasil;
            },
            summTotal_item(row) {
                let hasil = 0;;
                for (let i = 0; i < row.length; i++) {
                    hasil = parseFloat(hasil) + parseFloat(row[i].GRAND_TOTAL);  
                } 
                return this.formatCurrency(hasil);
            },

            show_detils(data) { 
                this.show_break_down = true;
                this.item_brekdown = []
                this.form.supplier = data.IDSUPLIER
                console.log(data);
                this.getdata(3);
            },
            async getdata(mode) {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.mode=mode
                await axios.post('/datalaporan_penerimaan_rekap', this.form)
                    .then(response => { 
                        if (mode == 2) { 
                            this.fact = response.data.response
                            this.summTotal(this.fact);
                        }
                        if (mode == 3) {
                            this.item_brekdown = response.data.response
                        } 
                        if (mode == 4) {
                            this.details_expanse = response.data.response
                        }
                        this.isLoading = false
                        console.log(response.data)
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

<style>
    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
