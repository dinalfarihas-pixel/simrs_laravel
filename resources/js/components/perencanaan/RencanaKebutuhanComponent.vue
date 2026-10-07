<template>
    <section class="content">
        <div class="container-fluid"> 
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">Perencanaan</h3>
                </div>
                <div class="card-body">
                    <!-- <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" /> -->
                    <Button label="Baru" align="" @click="openBasic('')" icon="pi pi-plus" class="p-button btn-info" />
                </div>
            </div>
            <Dialog header="Header" v-model:visible="displayBasic" :containerStyle="{width: '40vw'}" :modal="true"> 
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-6 mx-auto text-center">
                                <span class="p-float-label mt-3">
                                    <Calendar v-model="form.year" class="text-sm" :showIcon="true" view="year"
                                        dateFormat="yy" :yearNavigator="true" yearRange="2000:2030"
                                        aria-placeholder="Tahun Perencanaan" style="width: 40em;   " />
                                    <label for="form.year">Tahun Perencanaan</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> 
                
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="save_header()" autofocus />
                </template>
            </Dialog> 

            <div class="card">
                <div class="card-header">
                    <div class="card-body"> 
                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 10%">
                                        ID
                                    </th>
                                    <th style="width: 20%">
                                       Tahun Perencanaan
                                    </th> 
                                    <th>
                                        Status
                                    </th>
                                    <th style="width: 20%">
                                        Progress
                                    </th> 
                                    <th style="width: 10%">
                                        Aksi
                                    </th>
                                    <th style="width: 10%">
                                        Hapus
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="data in data_planning">
                                    <td>{{ data.planning_number }} <br />
                                        <small>{{ data.tahun }}</small>
                                    </td>
                                    <td><strong>{{ data.tahun }}</strong>   </td>
                                    <td>
                                       <p> {{ data.planning_number }}</p>
                                    </td>
                                    <td class="project-state">
                                        <span v-if="data.locked==0"> 
                                                <i class="pi pi-lock-open" style="font-size: 2rem"></i>  
                                                <span class="badge badge-success">
                                                Open </span>
                                        </span>
                                        <span v-if="data.locked==1">
                                            <i class="pi pi-lock" style="font-size: 2rem"></i>  
                                            <span class="badge badge-danger">
                                               Close </span>
                                        </span> 
                                    </td> 
                                    <td class="project-actions text-center">
                                        <Button icon="pi pi-search" class="p-button-rounded p-button-warning"  @click="go_details(data.planning_number)" />
                                        <!-- <Button icon="pi pi-remove" class="p-button-rounded p-button-warning" /> -->
                                    </td>
                                    <!-- @click="hapusheader(data.planning_number)" -->
                                   
                                    <td class="project-actions text-center">
                                        <ConfirmDialog></ConfirmDialog>
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button" @click='hapusheader_confirm(data.planning_number)' />
                                        <!-- <Button icon="pi pi-remove" class="p-button-rounded p-button-warning" /> -->
                                    </td>
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
    import ConfirmDialog from 'primevue/confirmdialog';

    export default {
        components: {
            Loading, 
            ConfirmDialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                data_planning: [],
                displayBasic: false,
                events1: [
                {status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg'},
                {status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7'},
                {status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800'},
                {status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B'}
                ],
                
                form: {
                    year: '',
                    enddate: '',
                    plan_id:''
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.year = currentDate;
        },
        created() {
            //this.fetchData();
            this.getdata_perecanaan();

        },
        methods: {
            hapusheader_confirm(header) {
                this.$confirm.require({
                    message: 'Yakin perencanaan ini akan di hapus '+header+' ?',
                    header: 'Konfirmasi',
                    icon: 'pi pi-exclamation-triangle danger',
                    accept: () => {
                        this.hapusheader(header);
                    },
                    reject: () => {
                        //callback to execute when user rejects the action
                    }
                });
            },
            openBasic() {
                this.displayBasic = true;
            },
            closeBasic() {
                this.displayBasic = false;
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
            async hapusheader(header)
            { 
                this.form.plan_id = header
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/hapus_header', this.form)
                    .then(response => {
                      
                        this.closeBasic();
                        if (response.data.metadata .code == 200) {
                            this.open("info", 'Data telah di hapus')
                        } else {
                            this.open("warning", response.data.metadata.message)
                        } 
                        this.isLoading = false
                      
                        this.getdata_perecanaan();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_perecanaan() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/getdata_perencanaan', this.form)
                    .then(response => {
                        this.data_planning = response.data.response
                      
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async go_details(id_planning)
            {
                window.location.assign("/detailperencanaan?data="+id_planning);
            },
            async save_header() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/save_header_perencanaan', this.form)
                    .then(response => {
                        this.fact = response.data.metadata 
                        this.closeBasic();
                        if (this.fact.code == 200) {
                            this.open("info", 'Data berhasil tersimpan')
                        } else {
                            this.open("warning", response.data.metadata.message)
                        } 
                        this.isLoading = false
                      
                        this.getdata_perecanaan();
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
