<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <div class="card">
                <div class="card-title">
                  {{ noregister }}
                </div>
                <div class="card-body">
                    <div class="row">
                        
                        <div class="col-md-8">
                            <div class="input-group w-30">
                                <input type="file" class="custom-file-input" accept="image/*" @change="onFileChange"  id="exampleInputFile">
                                <label class="custom-file-label" for="exampleInputFile">{{ file_size }}</label>
                            </div>
                            <div class="form-group"> 
                                <small><label for="minmax">Maksimal ukuran file 700 kb</label></small> <br />
                            </div> 
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nama Dokumen</label>
                                <input type="text" v-model="form.caption_file" style="text-transform:uppercase"
                                    autocomplete="off" class="form-control" id="exampleInputEmail1" placeholder="">
                            </div>
                            <Button label="Upload" @click="submit" icon="pi pi-upload"
                                class="p-button p-button  p-button-sm p-button-primary mr-1" /> 
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
        props:['noregister','noreceipt','moduleupload','barcode','receipt_no','foldername'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '', 
                    caption_file: '',
                    noreceipt:'', 
                    module_upload:'',
                    file_lampiran:'',
                    noregister:'',
                    barcode:'',
                    noreff:'' , 
                    directori:''
                },
                isLoading: false,
                fullPage: true,
                file_size: '', 
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate; 
        },
        created() {
            //this.fetchData();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
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
            onFileChange(e) {
                console.log("selected file", e.target.files[0])
                let size = e.target.files[0].size / 1000;
                this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';
                this.pdf_file = e.target.files[0]
                this.form.file_attch = e.target.files[0] 
            },
            async submit() {
                this.isLoading = true;
                var currentDate = new Date();
                this.form.startdate = currentDate; 
                this.form.noreceipt =this.receipt_no //this.datapasien.RECEIPT_NO
                this.form.noreff = this.barcode//this.datapasien.BARCODE 
                this.form.module_upload =this.moduleupload//"RADIOLOGI"
                this.form.noregister = this.noregister
                this.form.directori = this.foldername
                let fd = new FormData();
                fd.append("pdf_file", this.pdf_file);
                fd.append("data", JSON.stringify(this.form));
                await axios.post('/uploadlampiran', fd)
                    .then(response => {
                        // this.fact = response.data.response
                        this.isLoading = false
                        console.log(response)
                        if (response.data.code == 201) {
                            this.open("warning", response.data.message)
                        }
                        if (response.data.code == 200) {
                            this.open("success", response.data.message)
                            //this.closeConfirmation();
                        }
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
