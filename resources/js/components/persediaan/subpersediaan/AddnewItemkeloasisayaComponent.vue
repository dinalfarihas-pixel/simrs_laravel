<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> --> 
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Kategori</h3>
                </div>
                <div class="card-body">
                    <SelectButton v-model="SelectButton" :options="kategories" optionLabel="brand">
                        <template #option="slotProps">
                            <div class="car-option" @click="handleClick(slotProps.option.NAMA_KATEGORI)">
                                <div>{{slotProps.option.NAMA_KATEGORI}}</div>
                            </div>
                        </template>
                    </SelectButton>
                </div> 
                <div class="card">
                    <div class="card-body">
                        <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
                        <DataTable fixTableHead :value="fact.response" :rowHover="true" columnResizeMode="fit"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm"
                            responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                            v-model:filters="filters1" :rowsPerPageOptions="[10,20,50,100,200]">
                            <template #header>
                                <div class="table-header">
                                    <div class="row">
                                        <div class="col-md-7 col-sm-7 col-4 mt-0">
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters1['global'].value" placeholder="Pencarian" /> 
                                            </span>
                                        </div> 
                                    </div>
                                </div>
                            </template>
                            <template #loading>
                                Loading customers data. Please wait.
                            </template> 
                            <Column bodyStyle="text-align: center" header="TAMBAHKAN"  
                            :styles="{'width':'10em','text-align':'center'}">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-plus"
                                        @click="add_itembarang_to_mylocation(slotProps.data)" class="p-button-danger"
                                        style="margin-right: .5em"></Button />
                                </template>
                            </Column>
                            <Column field="BARCODE" header="BARCODE"></Column> 
                            <Column field="KATEGORI" :sortable="true" header="KATEGORI"></Column>
                            <Column field="NAMA" :sortable="true" header="NAMA" :styles="{'width':'10em'}"></Column> 
                            <Column field="SATUAN" :sortable="true" header="SATUAN"></Column>
                           
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import SelectButton from 'primevue/selectbutton';
    import ProgressBar from 'primevue/progressbar';
    import {
        FilterMatchMode
    } from 'primevue/api';
    import {
        find
    } from 'lodash';
    export default {
        components: {
            Loading,
            FilterMatchMode,
            SelectButton,
            ProgressBar
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    barcode:''
                },
                kategories: [],
                isLoading: false,
                fullPage: true,
                SelectButton: 'OBAT-OBATAN',
                filters1: {},
                filters2: {},
            
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            //this.fetchData();
            this.get_kategori();
            this.initFilters1();
            this.initFilters2(); 
        },
        methods: {
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
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
            formatCurrency(value) {
                //return value;
                if (value !== undefined && value !== null) {
                return value.toLocaleString('id-ID', {
                    
                });
                } else {
                    return 0;
                }
                 
            },
            async get_kategori() {
                this.isLoading = true;
                await axios.post('/getdata_kategori', "")
                    .then(response => {
                        this.kategories = response.data.response; 
                        this.kategories = this.kategories.filter(x => x.NAMA_KATEGORI != '');
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            handleClick(param) {
                this.SelectButton = param;
                this.getdata_master(6, 0)
            },

            async add_itembarang_to_mylocation(data)
            {
                const dataform = new FormData();
                
                this.isLoading = true; 
                this.form.kategori = this.SelectButton;   
                this.form.barcode = data.BARCODE; 
                await axios.post('/add_itembarang_to_mylocation', this.form)
                    .then(response => {  
                        console.log(response.data);
                        if(response.data.metadata.code=="200")
                        {
                            this.open('success',response.data.metadata.message)
                        }
                        else
                        {
                            this.open('warning',response.data.metadata.message)
                        }
                       
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }, 
            async getdata_master(mode, breakdown) {
                const dataform = new FormData();
                this.isLoading = true;
                //this.fact = [];
                this.form.kategori = this.SelectButton;    
                await axios.post('/additembarang_frommaster', this.form)
                    .then(response => {  
                        this.fact = response.data
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

</script>
