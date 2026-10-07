<template>
    <section class="content">
        <div class="container-fluid">

            <div class="login-box">

                <div class="card card-outline card-primary">  
                    <div class="card-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Password Lama</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.passwordlama" class="form-control" name="password"
                                    id="password" placeholder="Password lama">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Password Baru</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.passwordbaru" class="form-control" name="password"
                                    id="password" placeholder="Password Baru">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Ulangi Password Baru</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.ulangipasswordbaru" class="form-control" name="password"
                                    id="password" placeholder="Ulangi Password word baru">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="col-12">
                            <button type="submit" @click="rubahpassword()"
                                class="btn btn-primary btn-block">Simpan</button>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.social-auth-links -->

                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
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
                passwordlama: '',
                passwordbaru: '',
                ulangipasswordbaru: '',
                form: {
                    passwordlama: '',
                    passwordbaru: '', 
                    ulangipasswordbaru: '', 
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
            open(type, message, posisi) {
                this.$toast.open({
                    message: message,
                    position: posisi, //'top-right'
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },

            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },

            async rubahpassword() {
                if (this.form.passwordlama == "") {
                    this.open("info", "Password lama harus di isi", 'top');
                    return;
                }

                if (this.form.passwordbaru != this.form.ulangipasswordbaru) {
                    this.open("info", "Password baru tidak sama", 'top');
                    return;
                }

                const dataform = new FormData();
                this.isLoading = true; 
                await axios.post('/changepassword-api', this.form)
                    .then(response => {
                        this.fact = response.data;
                        console.log(this.fact);
                        if(this.fact==200)
                        {
                            this.open("info", "Password berhasil di rubah", 'top');
                        }
                      
                        this.isLoading = false 
                         this.displayMaximizable = true; 
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
