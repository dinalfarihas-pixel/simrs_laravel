<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
                <!-- COnsent ID {{ id_consent }} -->
            <div class="card elevation-0">
                <div class="card-header">
                    <h3 class="card-title">Tambahkan penanggung jawab pasien</h3>
                </div>
                <div class="card-body" style="height: 400px;">
                    <Button icon="pi pi-plus" @click="addtandTangan()" autofocus />
                    <hr>
                    <div class="row pt-1" v-for="(data,index) in tandatanganList">
                        <div class="col-md-3">
                            <label for="basic">Nama </label>
                            <InputText type="text" v-model="data.nama" style="width: 80%;" />
                        </div> 
                        <div class="col-md-4">
                            <label for="icon">Hubungan </label>
                            <Select  style="width: 80%;" v-model="data.hubunganSelected" :options="hubungandengan_pasien"  placeholder="Pilih Hubungan" />
                        </div>
                        <div class="col-md-3">
                            <label for="basic">No HP </label>
                            <InputText  style="width: 80%;" v-model="data.nohp" type="text" />
                        </div>
                        <div class="col-md-2">
                            <Button icon="pi pi-times" class="p-button-text" @click="hapusItem(index)" autofocus />
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
        props:['id_consent'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    datasign:''
                },
                tandatanganList:[
                    {
                        nama:'',
                        hubunganSelected:'',
                        nohp:''
                    }
                ],
                isLoading: false,
                fullPage: true,
                tandatanganList:[],
                hubungandengan_pasien:['Diri sendiri','Suami','Istri','Anak Kandung'],
                
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.addtandTangan();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            addtandTangan()
            {
                this.tandatanganList.push({}); 
            },
            hapusItem(index)
            {
                this.tandatanganList.splice(index,1); 
            },
            getdata()
            {
                this.form.datasign=this.tandatanganList;
                return this.form;
            }
        },
    }

</script>
