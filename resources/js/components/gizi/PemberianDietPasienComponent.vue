<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Riwayat diet pasien</h3>
                </div>
                <div class="card-body">
                    <Button label="Pilih diet" align="" @click="showdialog()" class="p-button-text"
                        icon="pi pi-search" />

                    <div class="row">
                        <div class="col-md-8">
                            <table class="table table-bordered table-striped  dataTable dtr-inline"
                                style="height: 100%;">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>JENIS DIET</th>
                                        <th>WAKTU</th>
                                        <th>AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data,k) in trans_gizi">
                                        <td>
                                            {{ k + 1 }}
                                        </td>
                                        <td>
                                            <strong>{{ data.jenis_diet }}</strong>
                                        </td>
                                        <td>
                                            
                                            <date-picker v-model="data.waktu" type="datetime" style="width: 100%;"
                                            placeholder="Select tanggal waktu"></date-picker>
                                   
                                        </td>
                                        <td>
                                            <button type="button" @click="hapus_item(data,k)"
                                                class="btn btn-block btn-warning btn-sm" style="width: 5em;">X</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog header="Pilh jenis diet" v-model:visible="showmaster_diet" :containerStyle="{width: '60vw'}"
                class="container_modal" :modal="false">
                <p v-if="isLoading==true">Silahkan menunggu, Sendang Memuat data..</p>
                <div class="card elevation-0">
                    <div class="card-body">
                        <table class="table table-bordered table-striped  dataTable dtr-inline" style="height: 100%;">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>JENIS DIET</th>
                                    
                                    <th>AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,k) in fact">
                                    <td>
                                        {{ data.id }}
                                    </td>
                                    <td>
                                        <strong>{{ data.jenis_diet }}</strong>
                                    </td>
                                    
                                    <td>
                                        <button type="button" class="btn btn-block btn-info btn-sm" style="width: 5em;"
                                            @click="additem_gizi(data)">Pilih</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <template #footer>
                    <Button label="Tutup" @click="showmaster_diet=false" autofocus />
                </template>
            </Dialog> 

            <Dialog header="Pilh jenis diet" v-model:visible="modal_time" :containerStyle="{width: '60vw'}"
                class="container_modal" :modal="false">
                <div class="card elevation-0">
                    <div class="card-body" style="height: 30em;">
                        <div class="col">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label for="caradatang">Waktu masuk</label><br />
                                    <Calendar id="time12" v-model="form.waktu_masuk" :showTime="true"
                                        :showSeconds="true" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Tutup" @click="modal_time=false" autofocus />
                </template>
            </Dialog>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading
        },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    waktu_masuk:''
                },
                isLoading: false,
                fullPage: true,
                showmaster_diet: false,
                modal_time: false,
                trans_gizi: []
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();

        },
        methods: {
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
            async fetchData() {
                this.isLoading = true
                await axios.post('/getmaster_gizi', this.form)
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
            showdialog() {
                this.showmaster_diet = true;
                this.fetchData();
            },
            additem_gizi(data) {
                // this.modal_time = true
                this.showmaster_diet = false;
                this.trans_gizi.push(
                    {
                        jenis_diet:data.jenis_diet,
                        waktu:data.waktu
                    }
                );
            },
            hapus_item(data, index) {
                this.trans_gizi.splice(index, 1)
                this.open("warning", data.jenis_diet + " Berhasil dihapus")
            }
        },
    }

</script>
