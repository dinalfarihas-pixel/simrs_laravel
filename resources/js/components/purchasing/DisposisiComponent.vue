<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card  elevation-0">
                        <div class="card-header p-0">
                       
                            <strong>Disposisi</strong>
                        </div>
                        <div class="card-body"> 
                            <span v-if="isLoading">
                                <ProgressBar mode="indeterminate" style="height: .1em" />
                            </span>
                            <div class="card-comment" id="activity">
                                <div class="post" v-for="(data,index) in list_disposisi">
                                    <div class="user-block">
                                        <img class="img-circle img-bordered-sm"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZvb6lJBuvgYuI___kRDyfEeVIOq8a4DmKg&usqp=CAU"
                                            alt="user image">
                                        <span class="username">
                                            <a href="#">{{ data.nama_user }}</a>
                                            <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                        </span>
                                        <span class="description">Tanggal Disposisi {{ data.tanggal_dispp }}</span>
                                    </div>
                                    <div>
                                        <span> <span v-html="convert_chart(data.disposisi)"></span></span>
                                        <span v-if="data.is_forwarded==1"> 
                                            <div class="callout elevation-1">
                                               <strong><cite title="">" {{ data.nama_user }} Meneruskan Telaah ke {{ data.forward_note }} "</cite> </strong> 
                                            </div>
                                        </span>
                                        <span v-if="data.is_forwarded==2">
                                            <div class="callout elevation-1">
                                               <strong><cite title="">" {{ data.nama_user }} Melakukan persetujuan pada telaah ini  "</cite> </strong>
                                            </div>
                                        </span>

                                    </div>
                                </div>  
                            </div> 

                        </div>
                        <div class="card-footer">

                            <img class="img-fluid img-circle img-sm"
                                src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU="
                                alt="Alt Text">

                            <div class="img-push">
                                <!-- <input type="text" class="form-control form-control-sm"
                                                placeholder="Press enter to post comment"> -->
                                <Textarea :autoResize="false" v-model="form.content_disposisi" rows="5" cols="100%"
                                    laceholder="Press enter to post comment" />
                                <Button label="Disposisi" @click="push_disposisi()" icon="pi pi-send" class="p-button p-button-sm p-button-danger">Disposisi </Button>
                                      
                                        </div />
                                    
                                </div>
                            </div>
                        </div>

                    </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Textarea from 'primevue/textarea';
    import ProgressBar from 'primevue/progressbar';
    export default {
        components: {
            Loading,
            Textarea,
            ProgressBar
        },
        props: {
            data_pr:''
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '', 
                    content_disposisi:'',
                    no_permintaan:''
                },
                isLoading: false,
                fullPage: true,
                list_disposisi:[]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate; 
        },
        created() {
            //this.fetchData();
            this.get_disposisi();
        },
        methods: {
            fetchData() {
                var currentDate = new Date(); 
            },
            convert_chart:function(stringText)
            { 
             
                if(stringText==null)
                { 
                    return ""; 
                }
                else
                { 
                    // let res =  stringText.replace(/(\\r)*\\n/g, '<br>') 
                    // res =  res.replace(/\n\n/g, '<br>');
                    let res =  stringText.replace(/\n/g, '<br>');
                    return res;  
                }  
            },
            async push_disposisi()
            {
                this.form.no_permintaan =this.data_pr.no_permintaan
                this.isLoading = true; 
                var currentDate = new Date();
                this.form.startdate = currentDate;
                await axios.post('/push_disposisi', this.form)
                    .then(response => {  
                         
                        this.isLoading = false
                        this.get_disposisi();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_disposisi()
            {
                this.form.no_permintaan =this.data_pr.no_permintaan
                this.isLoading = true; 
                console.log(this.data_pr.no_permintaan);
                await axios.post('/get_disposisi', this.form)
                    .then(response => {  
                       this.list_disposisi=response.data.response;  
                        this.form.content_disposisi ='';
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }
        },
    }

</script>
