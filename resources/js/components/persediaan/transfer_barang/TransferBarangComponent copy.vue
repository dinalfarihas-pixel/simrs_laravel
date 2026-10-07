<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Approval" v-model:visible="modalItemBarang" :containerStyle="{width: '80vw'}" :modal="true">
                <div class="card-header">

                </div>
                <div class="card-body">
                    <table class="table table-sm table-hover">
                        <thead>
                            <tr style="height:5px">
                                <th style="text-align: center;">
                                    Sisa Persediaan
                                </th>
                                <th>
                                    Barcode
                                </th>
                                <th>
                                    Sub Barcode
                                </th>
                                <th>
                                    Nama Barang
                                </th>
                                <th>
                                    Satuan
                                </th>
                                <th style="text-align: center;">
                                    Harga
                                </th>

                                <th style="text-align: center;">
                                    Diberikan
                                </th>
                                <th>
                                    Exp
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(data, index) in itemBarang" :key="index" style="height: 3px;">

                                <td>{{ data.IDBARANG }} <br />
                                </td>
                                <td>{{ data.SUB_BARCODE }}
                                    <a class="btn btn-text btn-danger-text">
                                        <i class="fas fa-search"></i>
                                    </a>
                                </td>
                                <td>
                                    {{ data.NAMA }}
                                </td>
                                <td style="text-align: center;">
                                    {{ data.SATUAN }}
                                </td>
                                <td class="project-state">
                                    {{ data.HARGABELI }}
                                </td>
                                <td class="project-state" style="text-align: center; background-color: antiquewhite;">
                                    <strong>{{ data.QUNATITY }}</strong>
                                </td>
                                <td style="text-align: center;">
                                    <vue-numeric currency="" separator="."
                                        style="text-align: center; width: 3em; background-color: lightskyblue;"
                                        v-bind:precision="0" v-model="data.QTY_APROVED"
                                        @blur="validasi_pemberian(data)"></vue-numeric>
                                </td>
                                <td class="project-state">
                                    {{ data.TGL_EXPIRED_DT }}
                                </td>



                            </tr>
                        </tbody>
                    </table>
                </div>
                <template #footer>
                    <!-- <Button label="No" icon="pi pi-times" @click="modalItemBarang=false" class="p-button-text" /> -->
                    <Button label="Selesai" icon="pi pi-check" @click="modalItemBarang=false" autofocus />
                </template>
            </Dialog>


            

            <Dialog :header="'Riwayat Permintaan ' + fact.header.LOKASI" v-model:visible="modalRiwayat"
                :containerStyle="{width: '50vw'}" :modal="true">
                <div class="card-header">
                    Persediaan <h5>{{ namaRiwayatSeleceted }}</h5>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-bordered table-hover">
                        <thead>
                            <tr style="height:5px">
                                <th>
                                    Tanggal
                                </th>
                                <th>
                                    Sub Barcode
                                </th>
                                <th>
                                    Satuan
                                </th>
                                <th style="text-align: center;">
                                    Harga
                                </th>
                                <th style="text-align: center;">
                                    QTY Approved
                                </th>
                                <th style="text-align: center;">
                                    Total
                                </th>


                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(data, index) in riwayatPermintaan" :key="index" style="height: 3px;">

                                <td>{{ data.TANGGAL }} <br />
                                </td>

                                <td>{{ data.SUB_BARCODE }}

                                </td>
                                <td style="text-align: center;">
                                    {{ data.SATUAN }}
                                </td>
                                <td class="project-state">
                                    {{ data.HARGA }}
                                </td>
                                <td class="project-state" style="text-align: center; background-color: antiquewhite;">
                                    <strong>{{ data.QTY }}</strong>
                                </td>
                                <td style="text-align: center;">
                                    <vue-numeric currency="Rp " separator="," style="text-align: right; width: 10em;"
                                        v-bind:precision="2" v-model="data.TOTAL" @blur="validasi_pemberian(data)">
                                    </vue-numeric>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <template #footer>
                    <!-- <Button label="No" icon="pi pi-times" @click="modalItemBarang=false" class="p-button-text" /> -->
                    <Button label="Selesai" icon="pi pi-check" @click="modalRiwayat=false" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">#Permintaan</h3>

                </div>
                <div class="card-body">
                    <div class="row invoice-info">
                        <div class="col-sm-4 invoice-col">
                            Nomor Permintaan
                            <address>
                                <strong> <i class="fas fa-tag"></i> {{fact.header.NO_PERMINTAAN}} </strong><br>
                                <!-- {{details_pasien.NAMAKECAMATAN}}<br> -->
                            </address>
                            Tanggal
                            <address>
                                <strong><i class="fas fa-calender"></i>{{fact.header.TANGGAL}}</strong><br>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Asal Permintaan
                            <address>
                                <strong> <i class="fas fa-location"></i>{{fact.header.LOKASI}}
                                </strong><br>
                                Catatan : {{fact.header?.CATATAN}}<br>

                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Status
                            <address>
                                <strong>

                                    <i v-if="fact.header.TELAH_DIPROSES==1" class="fas fa-check fa-3x "
                                        style="color: green;"></i>

                                    <i v-if="fact.header.TELAH_DIPROSES==0" class="fas fa-minus fa-3x "
                                        style="color: orange;"></i>

                                </strong><br>


                            </address>
                        </div>

                    </div>
                </div>
            </div>

            <div class="card">

                <div class="card-header">
                    <a class="btn btn-text btn-danger-text" style="color: brown;">
                        <i class="fas fa-search"></i>
                        *Lihat Riwayat permintaan/Persetujuan
                    </a>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-hover">
                        <thead>
                            <tr style="height:5px">
                                <th style="width: 10%">
                                    No Permintaan
                                </th>
                                <th style="width: 10%">
                                    Barcode
                                </th>
                                <th style="width: 20%">
                                    Nama Barang
                                </th>
                                <th style="width: 20%">
                                    Satuan
                                </th>
                                <th style="text-align: center;">
                                    Qty Permintaan
                                </th>
                                <th style="text-align: center;">
                                    Sisa Persediaan
                                </th>
                                <th style="text-align: center;">
                                    Kebutuhan Perminggu
                                </th>
                                <th style="text-align: center;">
                                    Qty Disetujui
                                </th>
                                <th style="width: 20%">
                                    Catatan
                                </th>
                                <th style="width: 30%" class="text-center">
                                    Proses
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(data, index) in fact.details" :key="index" style="height: 3px;">

                                <td>{{ data.ID_PERMINTAAN }} <br />
                                    <small>{{data.TANGGAL}}</small>
                                </td>
                                <td>{{ data.BARCODE }}
                                    <a class="btn btn-text btn-danger-text" @click="getlaporan_tf_v3(data)">
                                        <i class="fas fa-search"></i>

                                    </a>
                                </td>
                                <td>
                                    {{ data.NAMA }}
                                </td>
                                <td>
                                    {{ data.SATUAN }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    {{ data.QTY_ORDER }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    {{ data.SISA_PERSEDIAAN }}
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    <vue-numeric disable currency="" separator="."
                                        style="text-align: center; background-color: yellow; width: 3em;"
                                        v-bind:precision="0" v-model="data.KEBUTUHAN_PERMINGGU"></vue-numeric>
                                    <!-- {{ data.KEBUTUHAN_PERMINGGU }} -->
                                </td>
                                <td class="project-state" style="text-align: center;">
                                    <!-- {{ data.QTY_APROVED }} -->
                                    <vue-numeric disable currency="" separator="." disabled
                                        style="text-align: center; background-color: greenyellow;  width: 3em;"
                                        v-bind:precision="0" v-model="data.QTY_APROVED"></vue-numeric>
                                </td>
                                <td>
                                    <!-- {{ data }} -->
                                </td>
                                <td class="project-actions text-center">
                                    <a class="btn btn-success" @click="getdata_obat_baseparam(data)">
                                        <i class="fas fa-cogs"></i>
                                        Pilih
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <!-- proses_transferv2 -->
                    <a class="btn btn-warning" @click="proses_transferv2">
                        <i class="fas fa-save"></i>
                        Simpan
                    </a>
                    <a class="btn btn-info" @click="cetak_surat_transfer">
                        <i class="fas fa-print"></i>
                        Cetak
                    </a>
                </div>
            </div>

            <div class="card">
                <div class="card-header">

                </div>
                <div class="card-body">

                </div>

            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import VueNumeric from 'vue-numeric'
    export default {
        components: {
            Loading,
            VueNumeric
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: {
                    header: {
                        NO_PERMINTAAN: '',
                        TANGGAL: '',
                        LOKASI: '',
                        CATATAN: ''
                    },
                    details: []
                },
                itemBarang: [],
                modalItemBarang: false,
                modalRiwayat: false,
                form: {
                    startdate: '',
                    enddate: '',
                    noPermintaan: ''
                },
                isLoading: false,
                fullPage: true,
                noPermintaan: '',
                BarangSeleceted: [],
                riwayatPermintaan: [],
                namaRiwayatSeleceted: ''
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;

            const params = new URLSearchParams(window.location.search);
            this.noPermintaan = params.get("no_permintaan");
            //console.log("No Permintaan:", this.noPermintaan);
            this.get_data_permintaan_barang_detail_v3()


        },
        created() {
            //this.fetchData();

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
                    duration: 2500,
                    dismissible: true
                })
            },
            async cetak_surat_transfer() {
                this.isLoading = true;
                this.form.no_permintaan = this.fact.header.NO_PERMINTAAN
                await axios.post('/transfer/cetak_surat_transfer', this.form)
                    .then(response => {
                        console.log(response.data);

                        window.open(response.data.file_url, '_blank');


                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getlaporan_tf_v3(row) {

                this.isLoading = true;
                this.form.mode = 2
                this.form.barcode = row.BARCODE;
                this.form.lokasi = this.fact.header.ID_LOKASI;

                this.namaRiwayatSeleceted = row.NAMA;

                await axios.post('/getlaporan_tf_v3', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.modalRiwayat = true;
                            this.riwayatPermintaan = response.data.response;
                            this.open("success", response.data.metadata.message)
                        } else {
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async validasi_pemberian(data) {
                console.log('containing harga', data)
                const total_persediaan = data.QUNATITY;

                if (data.QTY_APROVED > total_persediaan) {
                    this.open("warning", "Tidak dapat diproses,Pemberian melebihi dari pada persediaan")
                    data.QTY_APROVED = 0;
                } else {
                    this.BarangSeleceted.splice()
                    this.removeItem(data.SUB_BARCODE)

                    if (data.QTY_APROVED > 0) {
                        this.BarangSeleceted.push({
                            "SUB_BARCODE": data.SUB_BARCODE,
                            "BARCODE": data.BARCODE,
                            "QTY_APROVED": data.QTY_APROVED,
                            "HARGA": data.HARGABELI,
                            "KEBUTUHAN_PERMINGGU":data.KEBUTUHAN_PERMINGGU,
                            "TGL_EXPIRED": data.TGL_EXPIRED_DT,
                        }); // Filter BarangSeleceted by matching BARCODE
                        const filteredItems = this.BarangSeleceted.filter(item => item.BARCODE === data.BARCODE);
                        // Calculate total quantity from filtered items
                        const totalQuantity = filteredItems.reduce((sum, item) =>
                            sum + (item.QTY_APROVED || 0), 0
                        );

                        // Find and update the matching item
                        const index = this.fact.details.findIndex(item => item.BARCODE === data.BARCODE);
                        if (index !== -1) {
                            this.fact.details[index].QTY_APROVED = totalQuantity;
                            //this.fact.details[index].ID= this.BarangSeleceted;
                        } else {
                            console.warn(`Item with barcode ${data.BARCODE} not found`);
                        }
                    }
                }
            },
            removeItem(SUB_BARCODE) {
                // Find index of the item with matching SUB_BARCODE
                const index = this.BarangSeleceted.findIndex(item => item.SUB_BARCODE === SUB_BARCODE);

                // If found, remove the item
                if (index !== -1) {
                    this.BarangSeleceted.splice(index, 1);
                }
            },

            async proses_transferv2() {
                const dataform = new FormData();
                this.isLoading = true;

                this.fact.details.forEach(element => {
                    const json = this.BarangSeleceted.filter(item => item.BARCODE === element.BARCODE);
                    if (json) {
                        element.ID = JSON.stringify(json);
                    }
                });

                this.form.data = this.fact; 

                await axios.post('/persediaan/proses_transferv2', this.form)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.open("success", response.data.metadata.message)
                            this.get_data_permintaan_barang_detail_v3();
                        } else {
                            this.open("warning", response.data.metadata.message)
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_obat_baseparam(row) {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.mode = 3
                this.form.barcode = row.BARCODE

                await axios.post('/getdata_obat_baseparam', this.form)
                    .then(response => {
                        console.log(this.itemBarang);
                        this.itemBarang = response.data.response;
                        this.modalItemBarang = true;
                        this.itemBarang = this.itemBarang.map(x => {
                            const match = this.BarangSeleceted.find(sub => sub.SUB_BARCODE === x
                                .SUB_BARCODE);
                            return match ? {
                                ...x,
                                QTY_APROVED: match.QTY_APROVED
                            } : x;
                        });

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_data_permintaan_barang_detail_v3() {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.noPermintaan = this.noPermintaan;
                await axios.post('/persediaan/get_data_permintaan_barang_detail_v3', this.form)
                    .then(response => {
                        this.fact = response.data

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
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
        },
    }

</script>


<style>
    td {
        height: 3px;
        padding: 0;
        overflow: hidden;
        /* Prevents content from expanding row */
    }

</style>
