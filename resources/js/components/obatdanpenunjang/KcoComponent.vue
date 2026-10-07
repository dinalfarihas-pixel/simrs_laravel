<template>
    <section class="content"> 
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><h5>Kartu Rencan Obat Pasien</h5></h3>
                </div>
                <div class="card-body">
                    <!-- <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check"
                                 class="p-button" /> -->
                    <table class="table table-sm tb-sm table-bordered table-striped small-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>BACODE</th>
                                <th>NAMA OBAT</th>
                                <th>JENIS</th>
                                <th v-for="(tgl,index) in riwayat_obat.header">{{tgl.datacaption}}</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,index) in riwayat_obat.itembarang" :key="index">
                                <td>
                                    {{index+1}}                            
                                </td>
                                <td>
                                    {{data.BARCODE}}                            
                                </td>
                                <td>
                                    {{data.NAMABARANG}}                            
                                </td>
                                <td>
                                    {{data.SATUAN}}                            
                                </td>
                                <td  v-for="(tgl,index) in riwayat_obat.header">  
                                    <span v-for="(item,sub_item) in riwayat_obat.sub_item">
                                        <span v-if="data.BARCODE==item.BARCODE && tgl.tgl==item.DT_ONLY">
                                             {{item.QTY}} 
                                        </span>  
                                    </span>
                                  
                                </td>
                                <td><strong>{{data.TOTAL}}</strong>  </td>
                            </tr>
                        </tbody>
                    </table>
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
        props: ['isInput', 'datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    NOREGISTER:''

                },
                isLoading: false,
                fullPage: true,
                riwayat_obat: null,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            this.fetchData();

        },
        methods: {
           async fetchData() {

                this.isLoading = true
                this.form.NOREGISTER =this.datapasien.NOPENDAFTARAN;
                await axios.post('/get_data_kco', "")
                    .then(response => {
                        this.riwayat_obat = response.data.response
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

</script>./KcoComponent.vue
