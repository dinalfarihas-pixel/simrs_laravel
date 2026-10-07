<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header"> 
                    <div class="row">
                        <div class="col-md-6">
                            <InputText type="text" class="form-control" style="width: 100%;" v-model="selectedPulvis.nama"  ref="inputBox"
                            placeholder="Nama item pulvis" />
                        </div> 
                        <div class="col-md-3">
                            <InputNumber  autocomplete="off" mode="decimal" :min="0" :max="200" style="width: 100%;" v-model="selectedPulvis.qty"  ref="inputBox"
                            placeholder="Jumlah" />
                        </div> 
                        <div class="col-md-3">
                            <InputText type="text" class="form-control" style="width: 100%;" v-model="selectedPulvis.satuan"  ref="inputBox"
                            placeholder="Satuan" />
                        </div> 
                    </div> 
                </div> 
                <div class="card-body">
                    
                    <Button  icon="pi pi-plus" @click="subitemPulv()" autofocus />
                    <hr>
                    <div class="row"  v-for="(item,index) in item_pulv"> 
                        <div class="col-md-8"> 
                            <InputText type="text" class="form-control" style="width: 100%;" v-model="item.nama"  ref="inputBox"
                            placeholder="Nama item pulvis" />
                        </div>
                        <hr/>
                        <div class="col-md-2"> 
                            <Button label="" class="p-button-text"  icon="pi pi-times"  @click="hapusItem(index)"/>
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
                nama_pulvis:'',
                isLoading: false,
                fullPage: true,
                selectedPulvis: {
                    nama: '',
                    qty:0,
                    satuan:'',
                    item: []
                },
                item_pulv:[
                    // {
                    //     nama:''
                    // }
                ]
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
            additemObat(nama_pulv)
            {
                // this.selectedPulvis.push(
                //     nama=nama_pulv, 
                // ) 

            },
            subitemPulv()
            {
                this.item_pulv.push({
                    namaitem:this.item_pulv.nama
                }); 
                this.selectedPulvis.item =this.item_pulv 
            },
            get_value()
            { 
                return this.selectedPulvis;
            },
            hapusItem(index)
            {
                this.item_pulv.splice(index,1) 
            } 

        },
    }

</script>
