<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 20em; " /> 
                    <Button label="Tampilkan" align="" @click="fetchData()" icon="pi pi-check" class="p-button" />
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
