<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">
                        <div class="row">
                            <div class="col-12">
                                <h4>
                                    <i class="">
                                        <img :src="data_rs['logo']" height="40px" width="40px" />
                                    </i> {{data_rs['nama_rs']}}
                                    <!-- <small class="float-right"><a href="/printout-pr" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a></small> -->
                                </h4>
                            </div>
                        </div>

                    </h3>
                </div>
                <div class="card-body">
                    <h3>Format Stock Opname</h3>
                    <h5>STOCK LOKASI : <strong>{{ lokasi_display }}</strong> </h5>
                </div>
            </div>

            <div class="card elevation-0">
                <div class="card-body">
                    <table class="table  table-sm table-striped  ">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th style="text-align: center;">BARCODE</th>
                            <th style="text-align: center;">SUB BARCODE</th>
                            <th style="text-align: center;">NAMA PERSEDIAAN</th>
                            <th style="text-align: center;">SATUAN</th>
                            <th style="text-align: center;">HARGA</th>
                            <th style="text-align: center; background-color: bisque;">STOCK SISTEM</th>
                            <th style="text-align: center;">EXP</th>
                            <th style="text-align: center;">FISIK</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in fact">
                                <td>{{ data.running_number }}</td>
                                <td>{{ data.barcode }}</td>
                                <td>{{ data.subbarcode }}</td>
                                <td>{{ data.nama_barang }}</td>
                                <td>{{ data.satuan }}</td>
                                <td style="text-align: right;">{{ $numeral(data.harga_beli, '0,0.00') }}</td>
                                <td style="text-align: center; background-color: bisque;">
                                    {{ $numeral(data.stock_akhir, '0,0.00') }}</td>
                                <td>{{ data.expired_date }}</td>
                                <td>
                                    <p style="color: gainsboro;">.............</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-md-4">

                        </div>
                        <div class="col-md-4">

                        </div>

                        <div class="col-md-4"> 
                            <div  >
                                <h5>{{ tanggal }}, Mengetahui</h5>
                                <h5>{{ datajabatan_user.JABATAN }}</h5> <br><br>
                                <h5> {{ datajabatan_user.JENIS_NOINDUK }} {{ datajabatan_user.NOINDUK }}</h5>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
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
                    kategori_selected: '',
                    lokasiSelected: '',
                    valuedate: '',
                },
                isLoading: false,
                fullPage: true,
                lokasi_display: '',
                datajabatan_user: '',
                tanggal: '',
                data_rs: ''
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            let uri = window.location.search.substring(1);

            console.log(uri);
            let params = new URLSearchParams(uri);

            let lokasi = params.get("lokasi");
            let kategori = params.get("kategori");
            let bulantahun = params.get("bulantahun");
            this.tanggal = bulantahun;
            this.lokasi_display = params.get("lokasi_display");
            this.getdtaa(lokasi, kategori, bulantahun);
            this.datajabatan_user_func();
            this.profile_rs();

        },
        profile_rs() {
            axios.get('/data_rumahsakit', "")
                .then(response => {

                    this.data_rs = response.data

                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },


            async datajabatan_user_func() {
                await axios.get('/datajabatan_user')
                    .then(response => {
                        this.datajabatan_user = response.data;
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdtaa(lokasi, kategori, bulantahun) {
                const dataform = new FormData();
                this.isLoading = true;
                this.form.lokasiSelected = {
                    id: lokasi,
                }
                this.form.kategori_selected = {
                    name: kategori
                }
                this.form.valuedate = bulantahun



                console.log(this.lokasi_param)
                await axios.post('/persediaan_data', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response
                        this.summary = response.data.summary
                        console.log(response.data);
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
