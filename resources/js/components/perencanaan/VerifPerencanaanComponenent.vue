<template>
    <section class="content">
        <div class="container-fluid">
            <Dialog :header="ruangan_yang_pilih" v-model:visible="displayModal" :containerStyle="{width: '80%'}"
                :modal="true">
                <table class="table table-striped projects">
                    <thead>
                        <tr>
                            <th style="width: 4%">
                                NO
                            </th>
                            <th style="width: 10%">
                                ID
                            </th>
                            <th style="width: 10%">
                                BARCODE
                            </th>
                            <th style="width: 5%">
                                KATEGORI
                            </th>
                            <th style="width: 5%">
                                NAMA
                            </th>
                            <th>
                                QTY
                            </th>
                            <th>ACC</th>
                            <th>
                                HARGA
                            </th>
                            <th>SATUAN</th>
                            <th>TOTAL</th>
                            <th>Verif</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,k) in list_item_perencanaan">
                            <td>{{ k+1 }}</td>
                            <td>{{data.plan_id}}</td>
                            <td>{{data.barcode}}</td>
                            <td>{{data.KATEGORI}}</td>
                            <td>{{data.NAMA}}</td>
                            <td>{{data.qty}}</td>
                            <td>
                                <InputNumber v-model="qty_approval[k]" style="width:60px" :showButtons="false" />
                                <!-- <div class="field col-2 md:col-3">
                                    <label for="minmax">Min-Max Boundaries</label>
                                    <InputNumber style="width: 3em;" type="text" v-model="data.qty_approve" /> 
                                </div>  -->


                            </td>
                            <td>{{data.harga}}</td>
                            <td>{{data.SATUAN}}</td>
                            <td>{{ $numeral(data.total, '0,0.00') }}</td>
                            <td>

                                <Button label="Verif"
                                    @click="approval_qty(data.plan_id,data.qty_approve,data.barcode,k,data.lokasi_inv)"
                                    class="p-button-sm p-button-success" /></td />
                            <td><Button style="width: 10em;" label="Bandingkan"
                                    @click="compare_item(data.barcode,data.NAMA,k)" :loading="isLoadingbutton[k]"
                                    class="p-button-sm p-button-success" /></td>
                        </tr>
                    </tbody>
                </table>

                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                    <Button label="Batal" icon="pi pi-check" @click="closeModal" autofocus />
                </template>
            </Dialog>

            <Dialog :header="nama_item" v-model:visible="displayModal_compare" :containerStyle="{width: '50vw'}"
                :modal="true">
                <table class="table table-striped projects">
                    <thead>
                        <tr>
                            <th style="width: 4%">
                                NO
                            </th>
                            <th style="width: 10%">
                                ID
                            </th>
                            <th style="width: 10%">
                                BARCODE
                            </th>
                            <th style="width: 5%">
                                KATEGORI
                            </th>
                            <th>
                                QTY
                            </th>
                            <th>
                                HARGA
                            </th>
                            <th>SATUAN</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(data,k) in compare_item_arr">
                            <td>{{ k+1 }}</td>
                            <td>{{data.LOKASI}}</td>
                            <td>{{data.barcode}}</td>
                            <td>{{data.KATEGORI}}</td>
                            <td>{{data.qty}}</td>
                            <td>{{data.harga}}</td>
                            <td>{{data.SATUAN}}</td>
                            <td>{{ $numeral(data.total, '0,0.00') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeModal_compare" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeModal_compare" autofocus />
                </template>
            </Dialog>


            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Perencanaan Ruangan</h3>
                </div>
                <div class="card-body">
                    <Toolbar class="mb-0">
                        <template #start>
                            <Calendar v-model="form.year" class="text-sm mr-1" :showIcon="true" view="year"
                                dateFormat="yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tahun Perencanaan" style="width: 10em; " />
                            <Button label="Tampilkan" align="" @click="monitoring_perencanaan()" icon="pi pi-check"
                                class="p-button" />
                        </template>
                        <template #end>
                            <div class="info-box mb-3">
                                <div class="info-box-content">
                                    <span class="info-box-text">GRAND TOTAL</span>
                                    <span class="info-box-number">{{ $numeral(grandtotal, '0,0.00') }}</span>
                                </div>

                            </div>
                        </template>
                    </Toolbar>

                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <!-- <h3 class="card-title">Data Perencanaan Ruangan</h3>  -->
                    <SelectButton v-model="selectedValue" :options="options" optionLabel="name">
                        <template #option="slotProps">
                            <div class="car-option" @click="filterdata(slotProps.option.value)">
                                <div>{{slotProps.option.name}}</div>
                            </div>
                        </template>
                    </SelectButton>

                </div>
                <div class="card-body">

                    <table @totalPagesChanged="totalPages =$event" class="table table-striped projects">
                        <thead>
                            <tr>
                                <th style="width: 4%">
                                    NO
                                </th>
                                <th style="width: 10%">
                                    LOKASI
                                </th>
                                <th style="width: 5%">
                                    STTS Pengimputan
                                </th>
                                <th style="width: 5%">
                                    Tahun Perencanaan
                                </th>
                                <th>
                                    TOTAL
                                </th>
                                <th>
                                    Verif
                                </th>
                                <th>Aksi</th>
                                <th>Progess Verifikasi</th> 
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(data,k) in temp_data_filter">
                              
                                <td>{{ k+1 }}</td>
                                <td><strong>{{ data.LOKASI }}  </strong> 
                                  
                                
                                </td>
                                <td>
                                    <span v-if="data.total==0">
                                        <Button label="" style="width: 5em;" class="p-button p-button-danger" />
                                    </span>
                                    <span v-if="data.total>0">
                                        <Button label="" style="width: 5rem;" class="p-button p-button-success" />
                                    </span>
                                </td>

                                <td>{{ data.tahun }}</td>
                                <td>
                                    <InputNumber v-model="data.total" align="right"
                                        @change="handleInputChange(data.qty, k)" class="p-inputtext-m text-align-center"
                                        style="text-align: right" mode="decimal" :minFractionDigits="2" />

                                  
                                    <!-- <div class="progress progress-sm mt-2">
                                        <div class="progress-bar bg-info" style="width: 78%"><strong>BHP NON MEDIS</strong></div>
                                    </div> -->
                                </td>
                                <td style="align-content: center;">
                                    <span v-if="data.locked==1">
                                        <Button label="" icon="pi pi-lock" class="p-button-success p-button-rounded" />
                                    </span>
                                    <span v-if="data.locked==0">
                                        <Button label="" icon="pi pi-lock-open"
                                            class="p-button-warning p-button-rounded" />
                                    </span> 
                                </td>
                                <td>
                                    <!-- <Button label="Preview" class="p-button-success p-button-outlined mr-2"
                                        @click="getdetails_item(data.id_lokasi,data.LOKASI)" /> -->
                                    <!-- <Button label="Selesai Verifikasi" class="p-button-outlined p-button" /> -->
                                    <a :href="varifdetails(data.id_lokasi,data.planning_number,data.tahun)">Proses
                                        Verifikasi</a> 
                                </td>
                                <td>
                                       
                                    <span v-for="progess in data.proses_verif">
                                     
                                        <Badge :value=" progess.kat+' '+progess.persen+'%'" :severity="progess.style" class="mr-2"></Badge> 
                                      
                                    </span> 
                                     
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <smart-pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import InputNumber from 'primevue/inputnumber';
    import SelectButton from 'primevue/selectbutton';
    import Dialog from 'primevue/dialog';
    import Badge from 'primevue/badge'
    export default {
        components: {
            Loading,
            InputNumber,
            SelectButton,
            Dialog,
            Badge
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                compare_item_arr: [],
                edit_acc: [{
                    k: false
                }],
                ruangan_yang_pilih: '',
                qty_approval: [],
                nama_item: '',
                selectedValue: {
                    name: 'Semua',
                    value: 3
                },
                options: [{
                        name: 'Sudah input',
                        value: 1
                    },
                    {
                        name: 'Belum Input',
                        value: 2
                    },
                    {
                        name: 'Semua',
                        value: 3
                    }
                ],
                displayModal: false,
                isLoadingbutton: [],
                displayModal_compare: false,
                loadingApproval: [],
                data_planning: [],
                temp_data_filter: [],
                list_item_perencanaan: [],
                currentPage: 1,
                totalPages: 0,
                form: {
                    year: '',
                    enddate: '',
                    mode: 0,
                    lokasi_inv: 0,
                    barcode: '',

                },
                verif: {
                    barcode: '',
                    qty_approve: '',
                    plan_id: '',
                    lokasi_inv: 0
                },
                isLoading: false,
                fullPage: true,
                grandtotal: 0,

            };
        },
        mounted() {


        },
        created() {
            var currentDate = new Date();
            this.form.year = currentDate;
            this.monitoring_perencanaan();
            this.isLoadingbutton[0] = false;

        },
        methods: {
            openModal() {
                this.displayModal = true;
            },
            openModal_compare() {
                this.displayModal_compare = true;
            },
            closeModal_compare() {
                this.displayModal_compare = false;
            },
            closeModal() {
                this.displayModal = false;
            },
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            handleInputChange(valueIndex, index) {
                this.qty_approval[index] = 2000;
                console.log(this.qty_approval[index]);
            },
            varifdetails(lokasi, plan_id, tahun) {
                return "/varifdetails?lokasi=" + lokasi + "&plan_id=" + plan_id + '&tahun=' + tahun
            },
            async filterdata(value) {
                if (value == 1) {
                    this.temp_data_filter = this.data_planning;
                    this.temp_data_filter = this.temp_data_filter.filter(x => x.total > 0);
                }
                if (value == 2) {
                    this.temp_data_filter = this.data_planning;
                    this.temp_data_filter = this.temp_data_filter.filter(x => x.total == 0);
                }
                if (value == 3) {
                    this.temp_data_filter = this.data_planning;
                }

                this.counting();
            },
            async edit_acc_func(index) {
                if (this.edit_acc[index] === true) {
                    this.edit_acc[index] = false;
                } else {
                    this.edit_acc[index] = true;
                }

                alert(this.edit_acc[index]);

            },
            async counting() {
                this.grandtotal = 0;
                for (var i = 0; i < this.temp_data_filter.length; i++) {
                    this.grandtotal = this.grandtotal + this.temp_data_filter[i].total;
                }
            },
            async getdetails_item(lokasi, ruangan_yang_pilih) {
                this.ruangan_yang_pilih = ruangan_yang_pilih;
                this.form.mode = 1;
                this.form.lokasi_inv = lokasi;
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/get_list_item', this.form)
                    .then(response => {
                        this.list_item_perencanaan = response.data.response
                        this.isLoading = false
                        this.openModal();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async compare_item(barcode, nama, i) {
                this.isLoadingbutton[i] = true;
                this.form.mode = 2;
                this.form.barcode = barcode;
                this.nama_item = "Perbandingan " + nama + " dengan ruangan lain";
                const dataform = new FormData();

                await axios.post('/get_list_item', this.form)
                    .then(response => {
                        this.compare_item_arr = response.data.response

                        this.openModal_compare();
                        this.isLoadingbutton[i] = false;
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoadingbutton[i] = false)
            },
            async monitoring_perencanaan() {

                this.form.mode = 1;
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/monitoring_perencanaan', this.form)
                    .then(response => {
                        this.data_planning = response.data.response
                        this.temp_data_filter = this.data_planning;
                        this.counting();
                        console.log(this.data_planning);
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async approval_qty(plan_id, qty_approve, barcode, index, lokasi) {
                this.verif.barcode = barcode;
                this.verif.plan_id = plan_id;
                this.verif.qty_approve = qty_approve;
                this.verif.lokasi_inv = lokasi
                console.log(this.verif);
                const dataform = new FormData();
                this.loadingApproval[index] = true;
                await axios.post('/do_verif', this.verif)
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error)

                    })
                    .finally(() => this.isLoading = false)

            }
        },
    }

</script>
