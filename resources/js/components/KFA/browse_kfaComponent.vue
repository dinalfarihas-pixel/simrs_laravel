<!-- KFADetailForm.vue -->
<template>

    <div class="card"> 
        <!-- <Select v-model="form.barangSelected" :filter="true" :options="fact" optionLabel="BARCODE_NAMA"
        keys="id_kategori" @change="getdetails_barang($event)" placeholder="" style="width: 100%;" /> -->
        <InputText style="width: 100%;" @keyup.enter="data_kfa" v-model="form.param" />
        <br> 
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="">
                    <tr>
                        <th>KFA Code</th>
                        <th>Product Name</th> 
                        <th>Trade Mark</th>  
                        <th>Status</th>
                        <th>Type</th>
                        <th>Dosage Form</th>
                        <th>Manufacturer</th>
                        <th>NIE</th>
                        <th>Price (HET)</th>
                        <th>Active Ingredients</th>
                        <th>Last Updated</th>
                        <th>Details</th>
                        <th>Pakai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in fact" :key="product.kfa_code">
                        <td>{{ product.kfa_code }}</td>
                        <td>
                            <span class="fw-bold">{{ product.name }}</span>
                            <span v-if="product.generik" class="badge bg-info ms-2">Generic</span>
                        </td> 
                        <td>{{ product?.nama_dagang || '-' }}</td>
                        <td>
                            <span :class="getStatusBadgeClass(product.active, product.state)">
                                {{ getStatusText(product.active, product.state) }}
                            </span>
                        </td>
                        <td>{{ product.farmalkes_type?.name || '-' }}</td>
                        <td>{{ product.farmalkes_type?.name || '-' }}</td>
                       
                        <td>{{ product.manufacturer }}</td>
                        <td>{{ product.nie }}</td>
                        <td>
                            {{ product.het_price ? formatCurrency(product.het_price) : '-' }}
                        </td>
                        <td>
                            
                            <div v-for="ingredient in product.active_ingredients" :key="ingredient.kfa_code"
                                class="mb-1">
                                {{ ingredient.zat_aktif }} ({{ ingredient.kekuatan_zat_aktif }})
                            </div>
                        </td>
                        <td>{{ formatDate(product.updated_at) }}</td>
                        <td><button type="button" @click="data_kfa_bycode_function(product.kfa_code)" class="btn btn-primary btn-sm">Details</button></td>
                        <td><button type="button" @click="simpan_data_kfa(product)" class="btn btn-primary btn-sm">Simpan</button></td>
                    </tr>
                </tbody>
            </table>
        </div> 

        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
        
        <Dialog header="" v-model:visible="showKFA_Bycode" :containerStyle="{width: '80vw'}"   :modal="true">
            <div class="card">
                <div class="card-header">
                    <browse_kfa_bycode :data_trans=medicineData></browse_kfa_bycode>
                </div>
                <div class="card-body"> 
                </div>
            </div>
        
        </Dialog>

    </div>

</template>

<script>
    import Loading from 'vue-loading-overlay';
    import AutoComplete from 'primevue/autocomplete';

    export default {
        name: 'KFADetailForm',
        components: {
            Loading,
            AutoComplete
        },
        props: {
            msg: String,
            mode:0,
            param:Object
        },
        data() {
            return {
                form: {
                    param: '',
                    nameSelected: '',
                    mode:0,
                    kfa_code:'',
                    barcode:'',
                    sub_barcode:'',
                    kategori:''

                },
                fact: [],
                data: {
                    total: 227,
                    page: 2,
                    size: 1,
                    items: {
                        data: [
                            // your items array
                        ]
                    }
                },
                medicineData:{},
                isLoading: false,
                fullPage: true,
                showKFA_Bycode:false
            }
        },
        mounted() { 
            setTimeout(() => {
                this.form.param = this.msg
                this.data_kfa()
            }, 500) 
         // 2000 milliseconds = 2 seconds
        },
        methods: {
            formatPrice(price) {
                if (!price) return 'N/A';
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(price);
            },
            getStatusBadgeClass(active, state) {
                if (!active) return 'badge bg-danger'
                if (state === 'valid') return 'badge bg-success' 
                return 'badge bg-warning'
            },
            getStatusText(active, state) {
                if (!active) return 'Inactive'
                if (state === 'valid') return 'Active'
                return state
            },
            formatCurrency(value) {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(value)
            },
            formatDate(dateString) {
                return new Date(dateString).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
            },
            capitalize(str) {
                if (!str) return '';
                return str.charAt(0).toUpperCase() + str.slice(1);
            },
            async getdetails_barang(e) {
                console.log(e.value)
            },
            addData(e) {
                console.log(e.query);
                this.call_fanction(e.query)
                this.form.param = '';
            },
            async call_fanction(e) {
                console.log(e.query);

                if (e.query.length >= 3) {
                    this.data_kfa(e.query);
                    //this.addTindakan(e.value)   
                }
                //console.log(this.form.tindakanSelected)

            },
            async data_kfa() { 
                const dataform = new FormData();
                this.isLoading = true
                this.form.mode = 1
                await axios.post('/data_kfa', this.form)
                    .then(response => {
                        //this.fact
                        console.log(response.data);
                        this.fact = response.data.response.data; 
                        console.log(this.fact);
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async simpan_data_kfa(data)
            {
                console.log(this.msg);
                console.log(data);
                console.log(this.param);
                console.log('mode kfa')
                console.log(this.mode)


                const dataform = new FormData();
                this.isLoading = true
                this.form.mode = this.mode;
                this.form.kfa_code = data.kfa_code; //kfa code
                this.form.barcode = this.param.BARCODE,
                this.form.sub_barcode = this.param.SUB_BARCODE
                this.form.kategori = this.param.KATEGORI
                this.form.active_ingredients = data.active_ingredients
                this.form.volume_uom_name = data.volume_uom_name
                this.form.dosage_form = data.dosage_form
                

                await axios.post('/update_kode_kfa', this.form)
                    .then(response => {
                        //this.fact 
                        console.log(response.data);
                         
                        this.open(response.data.metadata.type, response.data.metadata.message)
                        this.isLoading = false;
                        //this.showKFA_Bycode = true;
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
                    duration: 3000,
                    dismissible: true
                })
            },
            async data_kfa_bycode_function(kfacode) { 
               
                const dataform = new FormData();
                this.isLoading = true
                this.form.mode = 2
                this.form.kfacode = kfacode;
                await axios.post('/data_kfa', this.form)
                    .then(response => {
                        //this.fact 
                        console.log(response.data);
                        this.medicineData = response.data.response;  
                        this.isLoading = false;
                        this.showKFA_Bycode = true;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
        }
    }

</script>

<style scoped>
.table {
  font-size: 0.9rem;
}

.table td {
  vertical-align: middle;
}

.badge {
  font-size: 0.8rem;
  font-weight: normal;
}
</style>