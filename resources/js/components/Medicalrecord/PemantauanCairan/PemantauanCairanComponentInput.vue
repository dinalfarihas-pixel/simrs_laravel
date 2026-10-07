<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>  -->
            <ProgressBar mode="indeterminate" v-show="isLoading" style="height: .2em" />
            <div class="card elevation-0">
                <div class="card-header"> 
                    <Button label="" align="" @click="call_input_cairan()" icon="pi pi-plus"
                        class="p-button p-button-danger" /> 
                    <Button label="" align="" @click="get_data_input_cairan('',2)" icon="pi pi-refresh"
                    class="p-button p-button-success" /> 
                </div> 
            </div>

            <div class="card elevation-0">
                <div class="card-header"> 
                    <span v-for="data in grouping">
                        <Button :label="data.tanggal"  align="" @click="get_data_input_cairan(data.tanggal,1)" 
                        class="p-button ml-1" />
                    </span>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <td rowspan="2" style="text-align: center;">AKSI</td>
                                <th rowspan="2" style="text-align: center;">RUANGAN</th>
                                <th rowspan="2" style="text-align: center;">TANGGAL</th>
                                <th rowspan="2" style="text-align: center;">JAM</th>
                                <th colspan="2" style="text-align: center;">CAIRAN MASUK</th>
                                <th colspan="2" style="text-align: center;">CAIRAN KELUAR</th>
                                <th rowspan="2" style="text-align: center;">OTORISASI</th>
                            </tr>
                            <tr>
                                <th>CAIRAN</th>
                                <th>JUMLAH</th>
                                <th>CAIRAN</th>
                                <th>JUMLAH</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data) in fact"> 
                                <td> <Button label="" icon="pi pi-times" @click="remove_line(data.id)" class="p-button-text p-button-danger" /></td>
                                <td>{{ data.nama_ruangan }}</td>
                                <td>{{ data.tanggal }}</td>
                                <td>{{ data.jam }}</td> 
                                <td>{{ data.nama_cairan_input }}</td> 
                                <td style="text-align: right;">{{ data.jml_ml_input }}</td> 
                                <td>{{ data.nama_cairan_output }}</td> 
                                <td style="text-align: right;">{{ data.jml_ml_output }}</td>  
                                <td>{{ data.stts_verif }} 
                                    <span v-if="data.has_auth==1">
                                    <Button icon="pi pi-verified" class="p-button-rounded p-button-success" /> 
                                    </span>
                                    <span v-if="data.has_auth==0">
                                        <Button icon="pi pi-lock-open" class="p-button-rounded p-button-warning"  @click="call_oto(data.id,5)" /> 
                                    </span>
                                </td>
                            </tr>  
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td> 
                                <td></td>
                              
                                <td></td>
                                <td style="text-align: right;"><b>{{ total.total_in }}</b> </td>
                               
                                <td></td>
                                <td style="text-align: right;"><b>{{ total.total_out }}</b> </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>  
        </div>

        <Dialog header="Otorisasi" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"  class="container_modal" :modal="true">
            <!-- <otorisasi-form @getvalue="handleValue" :mode=2 :noregister="soapId"></otorisasi-form>  -->
            <otorisasi-form @getvalue="handleValue" :mode=mode_otto :noregister="id_inputa"></otorisasi-form> 
            <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" autofocus />
                </template>
        </Dialog> 
          
        <Dialog header="BALANCE CAIRAIN" v-model:visible="showInputCairan" :containerStyle="{width: '80vw'}"
            :modal="true">
            <input-pemantauan-cairan ref="form_input" :datapasien="this.datapasien"></input-pemantauan-cairan>
            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="showInputCairan=false" autofocus />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import {
        AsyncCompiler
    } from 'sass';
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    export default {
        components: {
            Loading,
            ProgressBar
        },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                grouping:[],
                tanggal:'',
                form: {
                    startdate: '',
                    enddate: '',
                    data: ''
                },
                isLoading: false,
                fullPage: true,
                mode_otto:5,    
                showOtorisasi:false,
                showInputCairan: false,
                total:{
                    total_in:0,
                    total_out:0
                },
                responvalue:0,
                id_inputa:0
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.get_data_input_cairan("",2);
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            call_oto(soapid,mode_otto)
            {
                this.id_inputa =soapid; 
                this.mode_otto = mode_otto
                this.showOtorisasi = true; 
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;

                    if(this.tanggal=='')
                    {
                        this.get_data_input_cairan(this.tanggal,2);
                    }
                    else
                    {
                        this.get_data_input_cairan(this.tanggal,1);
                    }
                   
                }
            }, 
            call_input_cairan() {
                this.showInputCairan = true;
            },
            simpandata() {
                this.form.data = this.$refs.form_input.simpanData();
            },
            async get_data_input_cairan(tanggal,mode) {
                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.mode = mode
                this.form.tanggal = tanggal;
                this.tanggal = tanggal;
                this.form.nomr = this.datapasien.NOMR;
                await axios.post('/get_data_cairan', this.form)
                    .then(response => {
                        // console.log(response.data) 
                        this.fact = response.data.response;
                        this.grouping = response.data.grouping;
                        this.total.total_in = response.data.total.total_in
                        this.total.total_out = response.data.total.total_out
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
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
            async remove_line(id)
            {

                this.isLoading = true;
                this.form.id = id;
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                await axios.post('/hapus_inputan_cairan', this.form)
                    .then(response => {
                        if(response.data.metadata.code==200)
                        {
                            this.get_data_input_cairan(this.tanggal,1);
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
