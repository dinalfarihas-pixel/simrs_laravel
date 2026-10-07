<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Data kunjungan pasien</h3>
                        </div>
                        <div class="card-body">
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 20em;   " />
                            <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check"
                                class="p-button" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Apps</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/simrs.png">
                                </template>
                                <template #title>
                                    SIMRS
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/Inventori.png">
                                </template>
                                <template #title>
                                    Inventory
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/radiologi.PNG">
                                </template>
                                <template #title>
                                    Radiologi
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/lab.PNG">
                                </template>
                                <template #title>
                                    Radiologi
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/eklaim.png">
                                </template>
                                <template #title>
                                    Eklaim Manajement
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/backend.png">
                                </template>
                                <template #title>
                                    Eklaim Manajement
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/jadwal.PNG">
                                </template>
                                <template #title>
                                    Jadwal Operasi
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/jadwal.PNG">
                                </template>
                                <template #title>
                                    Tiket Antrian
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/jadwal.PNG">
                                </template>
                                <template #title>
                                    Display Antrian Poli
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        <div class="col-md-2">
                            <Card>
                                <template #header>
                                    <img alt="user header" src="https://simrs-link.info/icon/jadwal.PNG">
                                </template>
                                <template #title>
                                    Display Farmasi
                                </template>
                                <template #subtitle>
                                    las Update 2023-10-27
                                </template>

                                <template #footer>
                                    <Button icon="pi pi-download" label="Donwload" />

                                </template>
                            </Card> 
                        </div>
                        
                    </div>
                </div>
                <div class="card-footer bg-white">

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
                form: {
                    startdate: '',
                    enddate: '',

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
        },
    }

</script>
