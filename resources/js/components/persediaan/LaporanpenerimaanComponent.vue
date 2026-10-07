<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Laporan Pembelian perbulan berdasarkan jenis dan supplier</h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month"
                                dateFormat="mm/yy" :yearNavigator="true" aria-placeholder="Tanggal awal"
                                style="width: 13em;" />
                            <Button label="Tampilkan" @click="getdata()" icon="pi pi-check" class="p-button ml-2" />
                        </div>
                        <div class="col-md-4">
                            <div class="info-box" style="height:30px;">
                                <span class="info-box-icon bg-success"><i class="far fa-flag"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text">TOTAL</span>
                                    <span class="info-box-number">{{ $numeral(GrandTotal, '0,0.00') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body p-0">
                    <DataTable :value="fact" v-model:filters="filters" filterDisplay="row"
                        :paginator="true" :rows="20" :rowsPerPageOptions="[10, 20, 50, 100]"
                        stripedRows showGridlines class="p-datatable-sm"
                        scrollable scrollHeight="650px"
                        emptyMessage="Tidak ada data penerimaan"
                        :globalFilterFields="['NO_REFF','ID_PENERIMAAN','BARCODE','KATEGORI','NAMA','NAMASUPLIER']">
                        <template #header>
                            <div class="d-flex justify-content-end">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Cari semua kolom..." />
                                </span>
                            </div>
                        </template>

                        <Column field="NO_REFF" header="REFF" style="min-width: 8rem" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                            </template>
                        </Column>
                        <Column field="ID_PENERIMAAN" header="ID" style="min-width: 6rem" />
                        <Column field="TANGGAL" header="TANGGAL" style="min-width: 8rem" />
                        <Column field="BARCODE" header="BARCODE" style="min-width: 10rem" :showFilterMenu="false">
                            <template #body="{ data }">{{ data.BARCODE }}-{{ data.SUB_BARCODE }}</template>
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                            </template>
                        </Column>
                        <Column field="KATEGORI" header="KATEGORI" style="min-width: 10rem" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                            </template>
                        </Column>
                        <Column field="NAMA" header="NAMA" style="min-width: 14rem" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
                            </template>
                        </Column>
                        <Column field="QTY" header="QTY" style="min-width: 7rem; text-align: right">
                            <template #body="{ data }">{{ $numeral(data.QTY, '0,0.00') }}</template>
                        </Column>
                        <Column field="HARGA_POKOK" header="HARGA" style="min-width: 10rem; text-align: right">
                            <template #body="{ data }">{{ $numeral(data.HARGA_POKOK, '0,0.00') }}</template>
                        </Column>
                        <Column field="SUBTOTAL" header="SUBTOTAL" style="min-width: 10rem; text-align: right">
                            <template #body="{ data }">{{ $numeral(data.SUBTOTAL, '0,0.00') }}</template>
                            <template #footer>
                                <strong>{{ $numeral(GrandTotal, '0,0.00') }}</strong>
                            </template>
                        </Column>
                        <Column field="NAMASUPLIER" header="SUPPLIER" style="min-width: 12rem" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Cari..." class="p-column-filter" size="small" />
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
    import { FilterMatchMode } from '@primevue/core/api';

    export default {
        components: { Loading },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                GrandTotal: 0,
                filters: {
                    global:      { value: null, matchMode: FilterMatchMode.CONTAINS },
                    NO_REFF:     { value: null, matchMode: FilterMatchMode.CONTAINS },
                    BARCODE:     { value: null, matchMode: FilterMatchMode.CONTAINS },
                    KATEGORI:    { value: null, matchMode: FilterMatchMode.CONTAINS },
                    NAMA:        { value: null, matchMode: FilterMatchMode.CONTAINS },
                    NAMASUPLIER: { value: null, matchMode: FilterMatchMode.CONTAINS },
                },
                form: {
                    startdate: '',
                    enddate: '',
                    supplier: '',
                    mode: 1
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            this.form.startdate = new Date();
        },
        methods: {
            formatCurrency(value) {
                if (value !== undefined && value !== null) {
                    return parseFloat(value).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                }
                return 0;
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/datalaporan_penerimaan', this.form)
                    .then(response => {
                        this.fact = response.data.response;
                        this.GrandTotal = this.fact.reduce((sum, row) => sum + parseFloat(row.SUBTOTAL || 0), 0);
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
        }
    }
</script>
