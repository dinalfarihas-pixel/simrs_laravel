<template>
    <section class="content">
        <div class="container-fluid">  
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <td style="width: 10%;"> <img :src="data_rs['logo']" height="120px" width="120px" />  </td>
                    <td>
                         <span v-html="data_rs['kop_surat']"></span>
                    </td>
                </tr>
                </tbody>
            </table>
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
                data_rs:'',
                nama_rs:'',
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.profile_rs();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            profile_rs() {
                axios.get('/data_rumahsakit', "")
                    .then(response => {

                        this.data_rs = response.data
                        this.nama_rs =this.data_rs['nama_rs'].toUpperCase()

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
<style>
    body {
        font-family: Arial, sans-serif;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    .header img {
        max-width: 100px;
    }

    .content p {
        text-align: justify;
    }

    .signature {
        text-align: right;
        margin-top: 40px;
    }

    .signature p {
        margin: 0;
    }

    .footer {
        text-align: right;
        margin-top: 50px;
    }

</style>
