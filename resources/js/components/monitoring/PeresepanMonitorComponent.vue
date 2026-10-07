<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data obat yang di copy</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="month" dateFormat="mm/yy"
                        :yearNavigator="true" yearRange="2000:2030" aria-placeholder="Tanggal awal"
                        style="width: 12em; " />
                    <MultiSelect class="multiselect-custom" id="lokasi" name="CAPION" v-model="form.lokasiSelected"
                        :options="lokasi_arr" optionLabel="DISPLAY" placeholder="Stok lokasi" display="chip" />

                    <MultiSelect v-model="form.jenisrawatSeleceted" :options="jenisrawat" optionLabel=""
                        placeholder="Jenis rawat" style="width: 5em;" display="chip" />
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <!-- {{ fact }} -->

                    <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                       
                     
                        <div class="mt-0">
                            <label >Tampilkan data Frekwensi resep</label>
                        </div>
                        <Checkbox v-model="checked" :binary="true" />
                        <table  class="table table-bordered table-striped dtr-inline">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th style="text-align: center;" colspan="33">Tanggal Kunjungan</th>
                                </tr> 
                                <tr>
                                    <th>BARCODE</th>
                                    <th>ITEM BARANG</th>
                                    <th v-for="index in 31"> {{ index }}</th>
                                    <th>TOTAL</th>
                                </tr> 
                            </thead>
                            <tbody> 
                                <tr v-for="row in fact.item">
                                    <td> {{ row.BARCODE }}</td>
                                    <td> {{ row.NAMA }}</td>
                                    <td v-for="index in 31"> 
                                        <span v-for=" data in row.details">
                                            <span v-if='data.TGL==index'> 
                                                <span v-if='data.QTY >= 0'>
                                                    {{ data.QTY }}   <span v-show="checked">/  {{ data.FREQ }} </span> 
                                                </span>
                                                <span v-if="data.QTY==''">
                                                    0
                                                </span>
                                                  
                                                <!-- <Tag :value="data.PSERSEN"
                                                    v-tooltip.top="{ value:'OS : ' + data.JMLPASIEN +' ,L : ' + data.L }"
                                                    :severity="data.color"></Tag> -->
                                            </span> 
                                        </span> 
                                    </td>
                                    <td>{{ row.TOTAL }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Checkbox from 'primevue/checkbox';

    export default {
        components: {
            Loading,
            Checkbox
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                lokasi_param: null,
                checked:true,
                form: {
                    startdate: '',
                    enddate: '',
                    jenisrawatSeleceted: null,
                    lokasiSelected:null,
                },
                isLoading: false,
                fullPage: true,
                lokasi_arr: [],
                jenisrawat: [
                        "INAP", 
                        "JALAN"
                    
                ], 
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            //this.fetchData();
            this.get_lokasi();
        },
        methods: {
            async fetchData() {
                var currentDate = new Date();
                this.isLoading = true;
                //this.form.noregister = this.datapasien.NOPENDAFTARAN
                await axios.post('/peresepan_monitoring_api', this.form)
                    .then(response => {
                        this.isLoading = false 
                        this.fact = response.data.response 
                    
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ === 1);
                        console.log(this.lokasi_arr)
                        this.isLoading = false
                        // this.summTotal(this.fact); 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>
