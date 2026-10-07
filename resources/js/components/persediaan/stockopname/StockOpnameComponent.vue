<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Pilih bulan tahun Stock Opname</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.bulanthn" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :minDate="new Date(2000, 0, 1)" :maxDate="new Date(2030, 11, 31)"
                        aria-placeholder="Pilih bulan SO" style="width: 15em;" />
                    <Button label="Tampilkan Item Sudah/Belum Opname" align="" @click="laporan_stock_opname()"
                        icon="pi pi-list" class="p-button ml-2" />
                </div>
            </div>
            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">List data persediaan</h3>
                </div>
                <div class="card-body">
                    <!-- <Select v-model="form.barangSelected" :filter="true" :options="fact" optionLabel="BARCODE_NAMA"
                        keys="id_kategori" @change="getdetails_barang($event)" placeholder="" style="width: 100%;" /> -->
                    <Select v-model="form.barangSelected" :options="fact" optionLabel="BARCODE_NAMA" :filter="true"
                        @change="getdetails_barang($event)" @filter="call_data_barang($event)"
                        placeholder="Search Item barang..." style="width: 100%;">
                        <!-- Template untuk item dropdown -->
                        <template #option="slotProps">
                            <div class="p-d-flex p-jc-between p-ai-center" style="width:100%">
                                <div>
                                    <div style="font-weight:600">
                                        {{ slotProps.option.BARCODE_NAMA }}

                                    </div>

                                </div>

                                <!-- Tag -->

                            </div>
                        </template>

                    </Select>
                </div>
            </div>

            <div class="card elevation-0">
                <div class="card-header">

                </div>
                <div class="card-body  table-sm table-responsive p-0" style="height: 800px; ">
                    <div class="so-item-block" v-for="(data,index) in form.detailsItem" :key="index">
                        <!-- Header item -->
                        <div class="so-item-header">
                            <div class="so-item-title">
                                <i class="fas fa-box mr-2 text-primary"></i>
                                <span>{{ data.RUNNING }} — {{ data.BARCODE_NAMA }}</span>
                            </div>
                            <div class="so-item-total">
                                <span class="so-total-label">Persediaan Fisik:</span>
                                <strong class="so-total-value">{{ $numeral(data.TOTAL, '0,0.00') }}</strong>
                            </div>
                        </div>

                        <table class="table table-sm table-bordered table-striped so-table mb-0">
                            <thead>
                                <tr>
                                    <th style="width:16%">SUB BARCODE</th>
                                    <th style="width:9%">HARGA</th>
                                    <th style="width:10%">TGL EXP</th>
                                    <th style="width:11%">BATCH</th>
                                    <th style="width:8%">STK SISTEM</th>
                                    <th style="width:9%">STK FISIK</th>
                                    <th style="width:9%">SELISIH</th>
                                    <th>CATATAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="details in data.details" :key="details.SUB_BARCODE">
                                    <td>
                                        <div class="so-cell-sub">
                                            <input class="form-control form-control-sm" disabled
                                                v-model="details.SUB_BARCODE" type="text" />
                                            <Tag v-if="details.ARSIPKAN==1" value="NON AKTIF" severity="warning" class="so-tag-nonaktif" />
                                        </div>
                                    </td>
                                    <td>
                                        <InputNumber disabled :minFractionDigits="0" :maxFractionDigits="0"
                                            v-model="details.HARGA"
                                            style="width:100%" :inputStyle="{ textAlign:'right' }" />
                                    </td>
                                    <td>
                                        <input disabled autocomplete="off" type="text"
                                            v-model="details.TGL_EXPIRED"
                                            class="form-control form-control-sm" />
                                    </td>
                                    <td>
                                        <input disabled autocomplete="off" type="text"
                                            v-model="details.BATCH_NUMBER"
                                            class="form-control form-control-sm" />
                                    </td>
                                    <td>
                                        <InputNumber disabled :minFractionDigits="0" :maxFractionDigits="0"
                                            v-model="details.QTY"
                                            style="width:100%" :inputStyle="{ textAlign:'right' }" />
                                    </td>
                                    <td>
                                        <InputNumber @blur="hitungselisih(index,details)"
                                            :minFractionDigits="0" :maxFractionDigits="0"
                                            v-model="details.STOCK_FISIK"
                                            style="width:100%" :inputStyle="{ textAlign:'right' }" />
                                    </td>
                                    <td>
                                        <InputNumber disabled :minFractionDigits="2" :maxFractionDigits="2"
                                            v-model="details.SELISIH"
                                            style="width:100%" :inputStyle="{ textAlign:'right',
                                                color: details.SELISIH < 0 ? '#dc3545' : details.SELISIH > 0 ? '#28a745' : '' }" />
                                    </td>
                                    <td>
                                        <input autocomplete="off" type="text"
                                            style="text-transform:uppercase"
                                            class="form-control form-control-sm" v-model="details.CATATAN" />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="so-tfoot">
                                    <td>
                                        <button type="button" @click="hapus_item(index)"
                                            class="btn btn-danger btn-sm btn-block">
                                            <i class="fas fa-trash mr-1"></i>Hapus
                                        </button>
                                    </td>
                                    <td colspan="5"></td>
                                    <td>
                                        <InputNumber :minFractionDigits="0" :maxFractionDigits="0"
                                            v-model="data.TOTAL_FISIK"
                                            style="width:100%" :inputStyle="{ textAlign:'right', fontWeight:'600' }" />
                                    </td>
                                    <td>
                                        <button type="button"
                                            :class="data.SAVED
                                                ? 'btn btn-success btn-sm btn-block'
                                                : 'btn btn-primary btn-sm btn-block'"
                                            @click="simpan_hasil_opname(index)">
                                            <i :class="data.SAVED ? 'fas fa-check mr-1' : 'pi pi-save mr-1'"></i>
                                            {{ data.CAPTION_SAVE }}
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <Divider class="my-2" />
                    </div>
                </div>
            </div>

            <Dialog header="Detail Stock Opname" v-model:visible="ModalLaporanOpname" :modal="true"
                :style="{width: '91vw'}">
                <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

                <div class="row summary-row">

                    <div class="col-2 summary-item">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Total Persediaan</span>
                                <span class="info-box-number">
                                    Rp {{ $numeral(summary.total_persediaan, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 summary-item">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Selisih (SO)</span>
                                <span class="info-box-number">
                                    Rp {{ $numeral(summary.net_selisih, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 summary-item">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Selisih Lebih</span>
                                <span class="info-box-number text-success">
                                    Rp {{ $numeral(summary.selisih_plus, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 summary-item">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Selisih Kurang</span>
                                <span class="info-box-number text-danger">
                                    Rp {{ $numeral(summary.selisih_minus, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 summary-item">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Stock IN</span>
                                <span class="info-box-number text-primary">
                                    Rp {{ $numeral(stock_out_in.STOCK_IN, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 summary-item no-border">
                        <div class="info-box bg-default elevation-0">
                            <div class="info-box-content">
                                <span class="info-box-text">Stock OUT</span>
                                <span class="info-box-number text-warning">
                                    Rp {{ $numeral(stock_out_in.STOCK_OUT, '0,0.00') }}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <Button label="Refresh" align="" @click="get_data_laporan_stock_opname()"
                                    icon="pi pi-refresh" />
                                <Select class="multiselect-custom" id="kategori" name="CAPION"
                                    v-model="form.kategoriSelected" :options="listkategori" optionLabel=""
                                    placeholder="Pilih kategori persediaan" display="chip" />
                            </div>
                            <div class="col-md-6">

                            </div>
                            <div class="col-md-3 text-right">
                                <Button label="Sudah SO" class="p-button-success" align=""
                                    @click="filter_by_sudah('SUDAH')" icon="pi pi-list" />
                                <Button label="Belum SO" class="p-button-warning" align=""
                                    @click="filter_by_sudah('BELUM')" icon="pi pi-list" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card elevation-0">
                    <div class="card-body">
                        <DataTable :value="data_list_laporan" :rowHover="true"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm"
                            scrollable scrollHeight="500px" :paginator="true" :rows="10"
                            v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100,200,500,1000]">
                            <template #header>
                                <div class="table-header">
                                    <div class="row">
                                        <div class="col-md-7 col-sm-7 col-4 mt-0">
                                            <IconField>
                                                <InputIcon class="pi pi-search" />
                                                <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                            </IconField>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loading>
                                Loading data. Please wait.
                            </template>

                            <Column field="NO" :sortable="true" header="NO" style="width: 5%"></Column>
                            <Column field="SUB_BARCODE" :sortable="true" header="SUB BARCODE" style="width: 10%">
                            </Column>
                            <Column field="BARCODE" :sortable="true" header="BARCODE" style="width: 8%"></Column>
                            <Column field="KATEGORI" :sortable="true" header="KATEGORI" style="width: 10%"></Column>
                            <Column field="NAMA" :sortable="true" header="NAMA" style="width: 15%"></Column>

                            <Column field="STTS" :sortable="true" header="STATUS" style="width: 8%">
                                <template #body="slotProps">
                                    <span v-if="slotProps.data.STTS === 'SUDAH'">
                                        <span class="badge badge-success">{{ slotProps.data.STTS }}</span>
                                    </span>
                                    <span v-else>
                                        <span class="badge badge-danger">{{ slotProps.data.STTS }}</span>
                                    </span>
                                </template>
                            </Column>

                            <Column field="HARGA_POKOK" :sortable="true" header="HARGA POKOK"
                                style="width: 10%; text-align: right">
                                <template #body="slotProps">
                                    Rp.{{ $numeral(slotProps.data.HARGA_POKOK, '0,0.00') }}
                                </template>
                            </Column>

                            <Column field="QTY_SISTEM" :sortable="true" header="QTY SISTEM"
                                style="width: 8%; text-align: right">
                                <template #body="slotProps">
                                    {{ $numeral(slotProps.data.QTY_SISTEM, '0,0') }}
                                </template>
                            </Column>

                            <Column field="QTY_FISIK" :sortable="true" header="QTY FISIK"
                                style="width: 8%; text-align: right">
                                <template #body="slotProps">
                                    {{ $numeral(slotProps.data.QTY_FISIK, '0,0') }}
                                </template>
                            </Column>

                            <Column field="SELISIH" :sortable="true" header="SELISIH"
                                style="width: 8%; text-align: right">
                                <template #body="slotProps">
                                    <span :class="slotProps.data.SELISIH < 0 ? 'text-danger' : 'text-success'">
                                        {{ $numeral(slotProps.data.SELISIH, '0,0') }}
                                    </span>
                                </template>
                            </Column>

                            <Column field="TGL_EXPIRED" :sortable="true" header="TGL EXPIRED" style="width: 10%">
                            </Column>
                            <Column field="BATCH_NUMBER" :sortable="true" header="BATCH" style="width: 8%"></Column>
                            <Column field="CATATAN" :sortable="true" header="CATATAN" style="width: 10%"></Column>
                        </DataTable>
                    </div>
                </div>
            </Dialog>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../../bus';
    import Loading from 'vue-loading-overlay';
    import Divider from 'primevue/divider';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Tag from 'primevue/tag';
    import IconField from 'primevue/iconfield';
    import InputIcon from 'primevue/inputicon';
    import { FilterMatchMode } from 'primevue/api';
    export default {
        components: {
            Loading,
            Divider,
            DataTable,
            Column,
            Tag,
            IconField,
            InputIcon,
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                data_list_laporan: [],
                temp_data_list_laporan: [],
                loadingItem: [],
                ModalLaporanOpname: false,
                counter: 0,
                summary: {
                    totalItem: 0,
                    telahOpname: 0,
                    persentase: 0,
                    total_persediaan: 0,
                    selisih_plus: 0,
                    selisih_minus: 0,
                    net_selisih: 0,
                    status: ''
                },
                listkategori: ['OBAT-OBATAN', 'BMHP', 'BHP NON MEDIS'],
                form: {
                    startdate: '',
                    bulanthn: '',
                    enddate: '',
                    mode: 1,
                    kategori: 'OBAT-OBATAN',
                    itembarang: '',
                    barcode: '',
                    barangSelected: null,
                    detailsItem: [],
                    kategoriSelected: '',
                    lokasiSelected: '',
                },
                isLoading: false,
                fullPage: true,
                filters2: {},
                stock_out_in: {
                    STOCK_IN: 0,
                    STOCK_OUT: 0
                }
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.bulanthn = currentDate;
        },
        created() {
            //this.getdatabarang_foropname();

            this.initFilters2();
        },
        methods: {
            fetchData() {
                console.log(this.form.startdate);
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            hapus_item(index) {
                this.form.detailsItem.splice(index, 1);
            },
            hitungselisih(index, data) {
                this.$nextTick(() => {
                    this.hitungTotalFisik(index, data);
                });
            },
            hitungTotalFisik(index, data) {
                let total_fisik = 0;

                for (let i = 0; i < this.form.detailsItem[index].details.length; i++) {
                    if (data.SUB_BARCODE == this.form.detailsItem[index].details[i].SUB_BARCODE) {
                        this.form.detailsItem[index].details[i].SELISIH =
                            this.form.detailsItem[index].details[i].STOCK_FISIK - this.form.detailsItem[index].details[
                                i].QTY;
                    }

                    let total = this.form.detailsItem[index].details[i].SELISIH * this.form.detailsItem[index].details[
                        i].HARGA;
                    total_fisik = total_fisik + total;
                }

                this.form.detailsItem[index].TOTAL_FISIK = total_fisik;
            },
            async laporan_stock_opname() {
                this.ModalLaporanOpname = true;
                // this.isLoading = true;
                // try {
                //     const response = await axios.post('/laporan_stock_opname', this.form);
                //     this.fact = response.data.response || [];
                //     this.summary = response.data.summary || {};
                // } catch (error) {
                //     console.error(error);
                //     this.open('error', 'Gagal mengambil data');
                // } finally {
                //     this.isLoading = false;
                // }
            },
            async rekap_stock_in_out() {
                this.isLoading = true;
                await axios.post('/rekap_stock_in_out', this.form)
                    .then(response => {

                        if (response.data.response.length > 0) {
                            this.stock_out_in = response.data.response[0];
                            console.log(this.stock_out_in);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async get_data_laporan_stock_opname() {
                this.isLoading = true;
                await axios.post('/laporan_stock_opname', this.form)
                    .then(response => {
                        this.data_list_laporan = response.data.response
                        this.temp_data_list_laporan = response.data.response
                        this.summary = response.data.summary || {};
                        this.isLoading = false
                        this.rekap_stock_in_out();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async filter_by_sudah(stts) {
                this.isLoading = true;
                await this.get_data_laporan_stock_opname();
                this.data_list_laporan = this.temp_data_list_laporan.filter(
                    item => item.STTS === stts
                )
                this.isLoading = false
            },
            open(type, message) {
                EventBus.$emit('show-alert', { type, message });
            },
            async simpan_hasil_opname(index) {


                var currentDate = new Date();
                this.form.detailsItem[index].bulanthn = this.form.bulanthn;
                this.form.detailsItem[index].startdate = currentDate;

                this.isLoading = true;
                await axios.post('/simpan_stock_opaname', this.form.detailsItem[index])
                    .then(response => {
                        this.isLoading = false
                        console.log(response.data)
                        if (response.data.metadata.code == 200) {
                            this.open('success', 'Data tersimpan')
                            if (this.form.detailsItem[index].SAVED == true) {
                                return;
                            }
                            this.form.detailsItem[index].SAVED = !this.form.detailsItem[index].SAVED;
                            this.form.detailsItem[index].CAPTION_SAVE = 'Telah disimpan';
                        } else {
                            this.open('warning', response.data.metadata.message)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async call_data_barang(event) {
                console.log(event)
                this.form.mode = 3
                const query = event.value;
                if (!query || query.length <= 3) {
                    this.fact = [];
                    return;
                }

                this.form.itembarang = query
                await this.getdatabarang_foropname(event)
            },
            async getdatabarang_foropname() {

                this.isLoading = true;

                await axios.post('/getdatabarang_foropname', this.form)
                    .then(response => {
                        if (this.form.mode == 3) {
                            this.fact = response.data.response
                        }
                        if (this.form.mode == 2) {
                            var data = response.data.response[0]
                            data.CAPTION_SAVE = 'Simpan'
                            data.SAVED = false,
                                this.counter = this.counter + 1;
                            data.RUNNING = this.counter;
                            this.form.detailsItem.push(data)
                            this.form.detailsItem.sort((a, b) => b.RUNNING - a.RUNNING);
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async getdetails_barang(e) {
                this.form.mode = 2;
                this.form.barcode = e.value['BARCODE'];
                //console.log(e.value);
                this.getdatabarang_foropname()

            }
        },
    }

</script>


<style scoped>
/* ===== SUMMARY BAR ===== */
.summary-row .info-box        { min-height: 70px; padding: 6px 4px; }
.summary-row .info-box-content{ padding: 4px 8px; }
.summary-row .info-box-text   { font-size: 12px; color: #6c757d; }
.summary-row .info-box-number { font-size: 14px; font-weight: 600; margin-top: 2px; }
.summary-item                 { border-right: 1px solid #dee2e6; }
.summary-item.no-border       { border-right: none; }

/* ===== STOCK OPNAME ITEM BLOCK ===== */
.so-item-block {
    margin-bottom: 4px;
}

.so-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f0f4ff;
    border: 1px solid #c8d6f0;
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    padding: 7px 12px;
}
.so-item-title {
    font-size: .92rem;
    font-weight: 700;
    color: #1a3a6b;
}
.so-item-total {
    display: flex;
    align-items: center;
    gap: 6px;
}
.so-total-label {
    font-size: .78rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: .03em;
}
.so-total-value {
    font-size: .92rem;
    color: #1a3a6b;
}

/* ===== TABEL ===== */
.so-table {
    font-size: .82rem;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
}
.so-table thead th {
    background: #e9eef8;
    color: #1a3a6b;
    font-weight: 700;
    font-size: .75rem;
    text-transform: uppercase;
    letter-spacing: .03em;
    white-space: nowrap;
    vertical-align: middle;
    padding: 6px 8px;
}
.so-table tbody td {
    vertical-align: middle;
    padding: 4px 6px;
}
.so-table .form-control-sm {
    font-size: .82rem;
    height: 30px;
    padding: 3px 6px;
}

/* SUB BARCODE cell: input + tag dalam satu baris */
.so-cell-sub {
    display: flex;
    align-items: center;
    gap: 4px;
}
.so-cell-sub input {
    flex: 1;
    min-width: 0;
}
.so-tag-nonaktif {
    font-size: .65rem;
    padding: 2px 5px;
    white-space: nowrap;
    flex-shrink: 0;
}

/* InputNumber fill cell */
.so-table :deep(.p-inputnumber) { width: 100%; }
.so-table :deep(.p-inputnumber .p-inputtext) {
    font-size: .82rem;
    height: 30px;
    padding: 3px 6px;
    width: 100%;
}

/* TFOOT */
.so-tfoot td {
    background: #f8f9fa;
    padding: 5px 6px;
    vertical-align: middle;
}
</style>
