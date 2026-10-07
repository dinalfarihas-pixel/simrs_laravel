<template>
    <section class="content">
        <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> -->
        <ConfirmDialog></ConfirmDialog>

        <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="year" dateFormat="yy"
            :yearNavigator="true" aria-placeholder="Tanggal awal" style="width: 14em; " />
        <Button label="Tampilkan" align="" @click="getdata_penerimaan(5)" icon="pi pi-check" class="p-button" />


        <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
        <DataTable fixTableHead :value="fact" :rowHover="false" columnResizeMode="fit" selectionMode="single"
            stripedRows sortMode="multiple" class="p-datatable-sm mt-4" :resizableColumns="true" :paginator="true"
            :rows="20" v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100,200]">
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
                        <button type="button" icon="pi pi-search" @click="onRowExpand(slotProps.data)"
                            class="btn btn-block btn-success btn-xs" style="width: 6em;">Rincian</button>
                    </span>
                </template>
            </Column>
            <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->
            <Column field="AKSI" :sortable="true" header="">
                <template #body="slotProps">
                    <button type="button" icon="pi pi-search" @click="confirm1(slotProps.data)"
                        class="btn btn-block btn-danger btn-xs" style="width: 6em;">Batalkan</button>
                </template> </Column>
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
                    <ImagePreview :src="slotProps.data.LAMPIRAN" alt="Image" width="50" preview class="mb-2">
                    </ImagePreview>
                </template>
            </Column>


            <ColumnGroup type="footer">
                <Row>
                    <Column footer="Totals : " :colspan="5" :footerStyle="{'text-align':'right'}" />
                    <!-- <Column :footer="summTotal_item(item_brekdown)" :styles="{'text-align':'right'}">
                                </Column> -->
                </Row>
            </ColumnGroup>
        </DataTable>

        <Dialog header="Satu Sehat Browse" v-model:visible="show_kfa_form" :containerStyle="{width: '80vw'}"
            :modal="true">
            <div class="card">
                <div class="card-header">
                    <browse_kfa :msg=selectedText?.NAMA :mode="mode_kfa" :param=selectedText> </browse_kfa>
                </div>
                <div class="card-body">
                    <p>Testing Data</p>
                </div>
            </div>
        </Dialog>


        <Dialog :header="temp_caption" v-model:visible="show_detils" :containerStyle="{width: '80vw'}" :modal="true">
            <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
            
            <DataTable :value="details_expanse">
                <!-- <Column field="ID_PENERIMAAN" header="ID_PENERIMAAN" sortable></Column> -->
              
                <Column field="BARCODE" header="BARCODE" sortable></Column>
                <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE" sortable></Column> -->
                <Column field="NAMA" header="NAMA" sortable></Column>
                <Column field="KATEGORI" header="KATEGORI" sortable></Column>
                <Column field="HARGA_POKOK" header="HARGA_POKOK"
                    :styles="{'text-align':'right','background-color': 'azure'}" sortable>
                    <template #body="slotProps1">
                        <span class="product-badge-primary"> {{formatCurrency(slotProps1.data.HARGA_POKOK)}}</span>
                    </template>
                </Column>
                <Column field="QTY" header="QTY" sortable
                    :styles="{'text-align':'right','background-color': 'cornsilk'}">
                    <template #body="slotProps1">
                        <span class="product-badge-primary">{{slotProps1.data.QTY}}</span>
                    </template>
                </Column>
                <Column field="SATUAN" header="SATUAN" sortable
                    :styles="{'text-align':'center','background-color': 'cornsilk'}">
                </Column>
                <Column field="SUBTOTAL" header="SUBTOTAL" sortable
                    :styles="{'text-align':'right','background-color': 'azure'}">
                    <template #body="slotProps1">
                        {{formatCurrency(slotProps1.data.SUBTOTAL)}}
                    </template>
                </Column>
                <Column field="BACTH_NUMBER" header="BACTH_NUMBER" sortable>
                </Column>
                <Column field="EXP_DATE" header="EXP_DATE" sortable></Column>
                <Column field="KFA_CODE" header="KFA CODE" sortable></Column>
                <Column field="" :sortable="true" header="KFA">
                    <template #body='slotProps'>
                        <Button type="button" icon="pi pi-list" @click="getTextParam(slotProps.data,1)" label="KFA"
                            class="p-button-danger" style="margin-right: .5em; background-color: darkcyan;"></Button />
                    </template>
                </Column>


            </DataTable>
            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="show_detils=false" autofocus />
            </template>
        </Dialog>




    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import {
        FilterMatchMode
    } from 'primevue/api';
    import ProgressBar from 'primevue/progressbar';
    import ImagePreview from 'primevue/image';
    import ConfirmDialog from 'primevue/confirmdialog';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            ProgressBar,
            ImagePreview,
            ConfirmDialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                id_lokasi: '',
                show_kfa_form: false,
                mode_kfa: 2, //put the code on the master or on details
                selectedText: '',
                form: {
                    startdate: '',
                    enddate: '',
                    ID_PENERIMAAN: '',
                    lokasi_selected: [],
                    bulan_selected: {
                        'code': ''
                    },

                },
                isLoading: false,
                fullPage: true,
                item_brekdown: [],
                details_expanse: [],
                show_break_down: false,
                show_detils: false,
                filters2: {},
                temp_caption: ''
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);

        },
        created()   {
             this.get_lokasi_tovue()
             this.getdata_penerimaan(5);

            //this.fetchData();  
            this.initFilters2()

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            getTextParam(param, mode) {
                console.log(param)
                this.mode_kfa = mode;
                this.show_kfa_form = true;
                this.selectedText = param;
            },
            onRowExpand(event) {
                this.show_detils = true;
                this.details_expanse = [];
                this.form.ID_PENERIMAAN = event.ID_PENERIMAAN;
                this.temp_caption = 'NO PENERIMAAN :' + event.ID_PENERIMAAN + ', NO FAKTUR :' + event.NO_REFF +
                    ', SUPPLIER :' + event.NAMASUPLIER 
                this.getdata_penerimaan(4);
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            confirm1(x) {
                this.$confirm.require({
                    message: 'Anda ingin membatalkan penerimaan ' + x.ID_PENERIMAAN + ' dengan no faktur ' + x
                        .NO_REFF + ' dari ' + x.NAMASUPLIER + ' ?',
                    header: 'Hapus konfirmasi',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        this.hapus_penerimaan(x)
                    },
                    reject: () => {
                        //this.$toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
                        console.log('batal')
                    }
                });
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 4000,
                    dismissible: true
                })
            },
            get_lokasi_tovue() {
                axios.get('/get_lokasi_tovue')
                    .then(response => {
                        this.id_lokasi = response.data.data
                        console.log(this.form.lokasi_selected);
                        console.log(this.id_lokasi);
                        this.form.lokasi_selected = [{
                            ID: response.data.data
                        }]
                        this.isLoading = false
                        console.log(this.form.lokasi_selected);
                    })

                return this.id_lokasi;
            },
            async hapus_penerimaan(data) {
                console.log(data);
                this.form.ID_PENERIMAAN = data.ID_PENERIMAAN
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/batalkan_penerimaan', this.form)
                    .then(response => {
                        if (response.data.metadata.code == 200) {
                            this.getdata_penerimaan(5);
                            this.open('success', response.data.metadata.message);
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
            async getdata_penerimaan(mode) {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.mode = mode
                console.log(this.form)
                await axios.post('/datalaporan_penerimaan_rekap', this.form)
                    .then(response => {
                        console.log(response.data)
                        if (mode == 3) {
                            this.item_brekdown = response.data.response
                        }
                        if (mode == 4) {
                            this.details_expanse = response.data.response
                            console.log(this.details_expanse)
                        }
                        if (mode == 5) {
                            this.fact = response.data.response
                            //this.summTotal(this.fact);
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
