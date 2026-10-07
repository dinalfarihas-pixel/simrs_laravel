<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col-md-11">
                            <div class="row">
                                <div class="col-md-2">
                                    <label for="keluhanutama">Tanggal pulang</label><br />
                                </div>
                                <div class="col-md-8">
                                    <Calendar v-model="form.tanggal_pulang" class="text-sm" :showIcon="true" view="date"
                                        dateFormat="dd/mm/yy" :yearNavigator="true" :showTime="true"
                                        yearRange="2000:2030" aria-placeholder="Tanggal awal" style="width: 15em; " />
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-2">
                                    <label for="keluhanutama">NIK</label><br />
                                </div>
                                <div class="col-md-8">
                                    <input id="keluhanutama" class="form-control" autocomplete="off" type="text"
                                        placeholder="anamnesis">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-2">
                                    <label for="keluhanutama">NIK</label><br />
                                </div>
                                <div class="col-md-8">
                                    <input id="keluhanutama" class="form-control" autocomplete="off" type="text"
                                        placeholder="anamnesis">
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-2">
                                    <label for="keluhanutama">NIK</label><br />
                                </div>
                                <div class="col-md-8">
                                    <input id="keluhanutama" class="form-control" autocomplete="off" type="text"
                                        placeholder="anamnesis">
                                </div>
                            </div>
                        </div>
                    </div>
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
