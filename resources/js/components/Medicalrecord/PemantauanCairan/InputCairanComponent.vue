<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Input</h3>
                </div>
                <!-- {{ datapasien }} -->
                <div class="card-body">
                    <div class="grid">  
                        <div class="card elevation-0">
                            <div class="card-header">
                                <Button label="Add" icon="pi pi-plus" @click="add_newline()" class="p-button-text" />
                            </div>
                            <div class="card-body" style="height: 1200px;"> 
                                <table class="table table-hover table-bordered">
                                    <thead> 
                                        <tr>
                                            <th colspan="3" style="text-align: center;">CAIRAN MASUK</th>
                                            <th colspan="3" style="text-align: center;">CAIRAN KELUAR</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                JAM
                                            </th> 
                                            <th>NAMA CAIRAN</th>
                                            <th>JUMLAH CC</th>
                                            <th>CAIRAN KELUAR</th>
                                            <th>JUMLAH CC</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in form.data_balance">
                                            <td style="width: 15%;"> 
                                                <div class="p-inputgroup">
                                                    <span class="p-inputgroup-addon">
                                                        <i>Jam</i>
                                                    </span>
                                                    <Calendar id="time12" v-model="data.jam" :showTime="true"
                                                        :showSeconds="false" />
                                                </div>
                                            </td>
                                            <td>
                                                <div class="p-inputgroup">
                                                    <span class="p-inputgroup-addon">
                                                        <i></i>
                                                    </span>
                                                    <InputText placeholder="" v-model="data.nama_cairan_input" />
                                                </div>
                                            </td>
                                            <td style="width: 10%;">
                                                <div class="p-inputgroup">
                                                    <InputNumber v-model="data.jml_ml_input" mode="decimal"
                                                        :minFractionDigits="2" />
                                                    <span class="p-inputgroup-addon">
                                                        <i>CC</i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="p-inputgroup">
                                                    <span class="p-inputgroup-addon">
                                                        <i></i>
                                                    </span>
                                                    <InputText placeholder="" v-model="data.nama_cairan_output" />
                                                </div>
                                            </td>
                                            <td style="width: 10%;">
                                                <div class="p-inputgroup">
                                                    <InputNumber v-model="data.jml_ml_output" mode="decimal"
                                                        :minFractionDigits="2" />
                                                    <span class="p-inputgroup-addon">
                                                        <i>CC</i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <Button label="" icon="pi pi-times" @click="remove_line(index)" class="p-button-text p-button-danger" />
                                            </td>
                                        </tr> 
                                    </tbody>
                                </table>
                                <div class="row">
                                    <Button label="Simpan" icon="pi pi-saved" @click="simpanData()"  class="p-button-text p-button-danger" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card-footer">
                  
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import InputNumber from 'primevue/inputnumber';
    export default {
        components: {
            Loading,
            InputNumber
        },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                var_data:'',
                form: {
                    startdate: '',
                    namacairan_masuk: '',
                    jumlah_ml_input: 0,
                    data_balance: [{
                        jam: '',
                        nama_cairan_input: '-',
                        jml_ml_input: 0,
                        nama_cairan_output: '-',
                        jml_ml_output: 0
                    }],
                   
                },
                isLoading: false,
                fullPage: true,
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
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            add_newline() {
                this.form.data_balance.push({
                    jam: this.form.jam,
                    nama_cairan_input: "-",
                    jml_ml_input: 0.0,
                    nama_cairan_output: "-",
                    jml_ml_output: 0.0
                });
            },
            remove_line(index)
            {
                this.form.data_balance.splice(index,1);
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                })
            },
           async simpanData()
            {
                //return this.form.data_balance;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.form.nomr = this.datapasien.NOMR;
                this.form.mode = this.mode;
                this.form.kd_ruangan =this.datapasien.KODERUANGAN;
                this.form.nama_ruangan = this.datapasien.POLI;
                this.isLoading = true; 
                //this.var_data = this.form;
                await axios.post('/simpan_input_cairan', this.form)
                    .then(response => {
                        console.log(response.data) 
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message);
                            this.form.data_balance=[];
                        }
                        else
                        {
                            this.open("warning",response.data.metadata.message);
                        }

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
