<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
             
                <Dialog header="Header" v-model:visible="displayModal" :containerStyle="{width: '25vw'}" :modal="true">
                 
                    <p>{{ this.acc_item.nama_item}} , Permintaan {{ this.acc_item.permintaan }}</p> 
                    <label for="inptqty_app">Jumlah yang Acc :</label>
                    <InputNumber id="inptqty_app" style="width: 3em;" type="text" v-model="acc_item.approval_qty" /> 
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeModal(false)" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click="closeModal(true)" autofocus />
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

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body"> 
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
                </div>
            </div>

            <div class="card">
                <div class="card-hearder">

                </div>
                <div class="card-body table-sm  table-responsive p-10" style="height: 700px;">
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
                            <th  style="width: 7%">ACC</th>
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

                                <!-- <Button label="" @click="edit_acc_func(k,data.qty_approve)" icon="pi pi-pencil"
                                    class="p-button-sm p-button-success" /> -->
                                <span v-if="isVisible[k]===true">
                                  
                                    <!-- <InputNumber  align="right"   v-model="qty_approval[k]"
                                        class="p-inputtext-m text-align-center" style="text-align: right" mode="decimal"
                                        :minFractionDigits="2" />  -->
                                </span>
                                <!-- <span v-if="isVisible_aa===false">
                                    {{data.qty_approve}}
                                </span> -->
                           
                                <!-- <div class="field col-2 md:col-3">
                                    <label for="minmax">Min-Max Boundaries</label>
                                    <InputNumber style="width: 3em;" type="text" v-model="data.qty_approve" /> 
                                </div>  --> 
                        
                            <td>

                              <strong>{{ data.qty_approve }}</strong>  
                                <!-- <InputNumber @change="" style="width: 3em;" type="text" v-model="data.qty_approve" />  -->
                                <!-- <vue-numeric-input class="form-control form-control-sm"  v-model="data.qty_approve"  :controls="false"></vue-numeric-input> -->
                            
                            </td>
                            <td>{{data.harga}}</td>
                            <td>{{data.SATUAN}}</td>
                            <td>{{ $numeral(data.total, '0,0.00') }}</td>
                            <td><Button label="Verif" @click="openModal(data.plan_id,data.qty,data.qty_approve,data.barcode,k,data.lokasi_inv,data.NAMA)"  
                                    class="p-button-sm p-button-success" /></td>
                            <td><Button style="width: 10em;" label="Bandingkan"
                                    @click="compare_item(data.barcode,data.NAMA,k)" :loading="isLoadingbutton[k]"
                                    class="p-button-sm p-button-success" /></td>
                        </tr> 
                    </tbody>
                </table>
                    
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"></h3>
                </div>
                <div class="card-body"> 
                    <!-- <Button label="Acc semua permintaan" align="" @click="fetchData()" icon="pi pi-check" class="p-button p-button-warning" />
                    <Button label="Acc permintaan yang telah diberikan" align="" @click="fetchData()" icon="pi pi-check" class="p-button p-button-danger" /> -->
                    <Button label="Finalisasi" align="" @click="fetchData()" icon="pi pi-check" class="p-button p-button-warning" />
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
                loadingApproval: [],
                isVisible_aa:false,
                displayModal:false,
                isVisible: [],
                compare_item_arr: [],
                data_planning: [], 
                isLoadingbutton: [],
                nama_item:'',
                temp_data_filter: [],
                list_item_perencanaan: [],
                displayModal_compare: false,
                acc_item:{
                    plan_id:'',
                    index:'',
                    permintaan:0,
                    approval_qty:0,
                    nama_item:'',
                    lokasi:0,
                    barcode:''
                },
                form: {
                    year: '',
                    enddate: '',
                    mode: 0,
                    lokasi_inv: 0,
                    barcode: '',
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date(); 
            console.log(this.form.startdate);
            console.log(currentDate);
            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);  
            console.log(params.get("lokasi"))
            this.getdetails_item(params.get("lokasi"),params.get("tahun"))

        },
        created() { 
      
        },
        methods: {
            fetchData() { 
         
            },
            finalsasi()
            {

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
            openModal(plan_id, permintaan, qty_approve, barcode, index,lokasi, nama_item) 
            { 
                this.acc_item.barcode =barcode
                this.acc_item.index =index
                this.acc_item.plan_id =plan_id
                this.acc_item.approval_qty =0;
                this.acc_item.permintaan = permintaan
                this.acc_item.lokasi =lokasi
                this.displayModal = true; 
                this.acc_item.nama_item = nama_item;
            },
            closeModal(proses) {

                this.displayModal = false;  
                if(proses==true)
                {
                    this.list_item_perencanaan[this.acc_item.index].qty_approve =this.acc_item.approval_qty 
                    console.log(this.acc_item);
                    this.approval_qty(this.acc_item.plan_id, this.acc_item.approval_qty,this.acc_item.barcode,
                    this.acc_item.index,this.acc_item.lokasi)
                } 
            },
            openModal_compare() {
                this.displayModal_compare = true;
            },
            closeModal_compare() {
                this.displayModal_compare = false;
                
            },
            change_value_app(index,value)
            {
                ///this.list_item_perencanaan[index].qty_approve =10
            },
            async getdetails_item(lokasi,tahun) { 
                this.form.mode = 1;
                this.form.lokasi_inv = lokasi; 
                this.form.year =tahun
                this.isLoading = true;
                await axios.post('/get_list_item', this.form)
                    .then(response => {
                        this.list_item_perencanaan = response.data.response  
                        this.isLoading = false 
                        console.log(this.list_item_perencanaan);
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
             edit_acc_func(index,qty_app) {
             

                this.isVisible[index] = !this.isVisible[index];
               
                console.log(this.isVisible[index]);
                console.log(index);
               
                // this.qty_approval[index] =qty_app
            },
            async approval_qty() { 
                
                if(this.acc_item.approval_qty==0)
                {
                    this.open("warning", "Jumlah yang di input adalah 0")
                }
                const dataform = new FormData();
                // this.loadingApproval[index] = true;
                await axios.post('/do_verif', this.acc_item)
                    .then(response => { 
                       console.log(response.data.metadata)
                       if(response.data.metadata.code=="200")
                       {
                            this.open("info", response.data.metadata.message)
                       }
                    })
                    .catch(error => {
                        console.log(error)
                    
                })
                .finally(() => this.isLoading = false) 
            }
        },
    }

</script>
