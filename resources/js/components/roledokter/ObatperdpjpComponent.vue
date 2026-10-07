<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">

                                        <Tabs>
                        <TabList>
                            <Tab></Tab>
                            <Tab>Data persediaan</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>

                            <div class="card">
                                <div class="card-header">
                                    <div class="card-tools">
                                        <Button label="Refresh" align="" @click="getdata()" icon="pi pi-refresh" class="p-button sm btn-sm" />
                                     </div>
                                </div>
                                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                                    <table class="table table-bordered table-striped  dataTable dtr-inline">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>
                                                    <div class="input-group input-group-sm">
                                                        <input type="text" v-model="filters.NAMA.value" name="table_search"
                                                            class="form-control float-left" placeholder="Nama">
                                                    </div>
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <th>BARCODE </th>
                                                <th>
                                                    NAMA
                                                </th>
                                                <th>PEMAKAIAN</th>
                                                <th>PERSEDIAAN</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr v-for="row in fact">
                                                <td>{{ row.BARCODE }} </td>
                                                <td>{{ row.NAMA }} </td>
                                                <td style="text-align: right;">{{ row.QTY }} </td>
                                                <td style="text-align: right;">
                                                    <h5><span
                                                            :class="[row.STOCK <=0 ? 'badge bg-danger':'badge bg-success']">
                                                            {{ row.STOCK }}</span> </h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            </TabPanel>
                            <TabPanel>

                            <div class="card">
                                <div class="card-header">
                                    <div class="card-tools">
                                        <Button label="Refresh" align="" @click="getdata_mode2()" icon="pi pi-refresh"
                                class="p-button" />
                                        </div>
                                </div>

                            <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">

                                <table class="table table-bordered table-striped  dataTable dtr-inline">
                                    <thead>
                                        <tr>
                                            <th>BARCODE </th>
                                            <th>NAMA</th>
                                            <th>PERSEDIAAN</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th>
                                                <div class="input-group input-group-sm">
                                                    <input type="text" v-model="filters.NAMA.value" name="table_search"
                                                        class="form-control float-left" placeholder="Nama">
                                                </div>
                                            </th>
                                            <th></th>

                                            </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="row in persediaan">
                                            <td>{{ row.BARCODE }} </td>
                                            <td>{{ row.NAMA }} </td>
                                            <td style="text-align: right;">
                                                <h5><span
                                                        :class="[row.STOCK <= 0 ? 'badge bg-danger':'badge bg-success']">
                                                        {{ $numeral(row.STOCK, '0,0') }}</span> </h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    export default {
        components: {
            Loading,
            Tabs, TabList, Tab, TabPanels, TabPanel
        },
        props: {
            namadokter: String
            },
        data() {
            return {
                fact: [],
                persediaan: [],
                caption:'',
                form: {
                    mode: ''
            },
                isLoading: false,
                fullPage: true,
                dpjp: '',
                filters: {
                    NAMA: {
                        value: '',
                        keys: ['NAMA']
            }
            }
            };
        },
        mounted() {

        },
        created() {
            this.getdata();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
            },
            async getdata() {

                this.isLoading = true;
                this.form.mode = 1;
                await axios.post('/obatdppjdata', this.form)
                    .then(response => {
                        this.fact = response.data.response
                        this.dpjp = response.data.dpjp
                        this.caption = "Obat resepkan oleh " + this.dpjp.toString().toLowerCase();
                        console.log(response.data)
                        this.isLoading = false
                        console.log(this.fact);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getdata_mode2() {
                this.isLoading = true;
                this.form.mode = 2;
                await axios.post('/obatdppjdata', this.form)
                    .then(response => {
                        this.persediaan = response.data.response

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            }
            }
            }

</script>
