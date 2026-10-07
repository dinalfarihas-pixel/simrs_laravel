<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Apakah data sudah benar?" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}"
                class="container_modal" :modal="true">
                <div class="card-container"> 
                    <table border="1" cellspacing="0" class="table" cellpadding="5">
                        <tbody>
                        <tr>
                            <td>Nama</td>
                            <td><strong>{{ data.nama }}</strong></td>
                        </tr>
                        <tr>
                            <td>NIK</td>
                            <td><strong>{{ data.nik }}</strong></td>
                        </tr>
                        <tr>
                            <td>Nomor Kartu</td>
                            <td><strong>{{ data.noKartu }}</strong></td>
                        </tr>
                        <tr>
                            <td>Jenis Kelamin</td>
                            <td><strong>{{ data.sex === 'P' ? 'Perempuan' : 'Laki-laki' }}</strong></td>
                        </tr>
                        <tr>
                            <td>Tanggal Lahir</td>
                            <td><strong>{{ formatDate(data.tglLahir) }}</strong></td>
                        </tr>
                        <tr>
                            <td>Profesi</td>
                            <td><strong>{{ formData.profesi.profesi}}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="card">
                        <div class="card-header">
                            <p>User ID untuk login</p>
                        </div>
                        <div class="card-body">
                            <span v-if="response_user_login!=null">
                                <div class="row justify-content-center" style="height: 90%;">
                                    <div class="col-md-6">
                                        <div class="title">User ID</div>
                                        <div class="bg-success" style="text-align: center; border-radius: 5px; color: white; padding: 5px;">
                                            <h1> </h1>
                                            <h4> {{ response_user_login }}</h4><br>
                                            <p>Silahkan gunakan user ini untuk melakukan login</p>
                                        </div>
                                    </div>

                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                 
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                    <Button label="Simpan" icon="pi pi-check" @click="post_tobackend" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Register User</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitForm" class="container">
                        <div class="row mb-3">
                            <!-- NIK Field -->
                            <div class="col-md-12">
                                <div class="row">
                                    <label class="col-md-3 col-form-label">NIK:</label>
                                    <div class="col-md-6">
                                        <InputText v-model="formData.nik" style="width: 100%;" />
                                        <div class="invalid-feedback" v-if="submitted && !formData.nik">NIK is required
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <Button class="btn btn-primary" @click="get_data_peserta()" label="Check" />
                                    </div> 
                                </div>
                            </div>

                            <!-- Nama Field -->
                            <div class="col-md-12 mt-3">
                                <div class="row align-items-center">
                                    <label class="col-md-3 col-form-label text-md-end">Nama:</label>
                                    <div class="col-md-6">
                                        <InputText type="text" v-model="formData.nama" disabled required
                                            class="form-control" />
                                        <div class="invalid-feedback" v-if="submitted && !formData.nama">Nama is
                                            required</div>
                                    </div>
                                </div>
                            </div>
                            <!-- Ruangan Field -->
                            <div class="col-md-12 mt-3">
                                <div class="row align-items-center">
                                    <label class="col-md-3 col-form-label text-md-end">Profesi:</label>
                                    <div class="col-md-6">
                                        <Select v-model="formData.profesi" :options="fact" optionLabel="profesi"
                                            :filter=true style="width: 100%;" placeholder="Select a City"
                                            class="w-full md:w-14rem" />

                                    </div>
                                </div>
                            </div>

                            <!-- Password Field -->
                            <div class="col-md-12 mt-3">
                                <div class="row align-items-center">
                                    <label class="col-md-3 col-form-label text-md-end">Password:</label>
                                    <div class="col-md-6">
                                        <InputText type="password" v-model="formData.password" required minlength="6"
                                            class="form-control" />
                                        <div class="invalid-feedback" v-if="submitted && formData.password.length < 6">
                                            Password must be at least 6 characters
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Confirm Password Field -->
                            <div class="col-md-12 mt-3">
                                <div class="row align-items-center">
                                    <label class="col-md-3 col-form-label text-md-end">Confirm Password:</label>
                                    <div class="col-md-6">
                                        <InputText type="password" v-model="formData.confirmPassword" required
                                            class="form-control" />
                                        <div class="invalid-feedback" v-if="submitted && !isPasswordMatch">
                                            Passwords do not match
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Submit Button -->
                            <div class="col-12 mt-4">
                                <div class="row">
                                    <div class="col-md-6 offset-md-3">
                                        <Button @click="simpan_data_user" class="btn btn-primary" label="Register" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </div> 
    </section>
</template>

<script>
    import { data } from 'jquery';
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
                submitted: false,
                fact: [],
                formData: {
                    nik: null,
                    nama: '',
                    profesi: {
                        id: '',
                        profesi: '',
                        jsprofesi:''
                    },
                    password: '',
                    confirmPassword: ''
                },
                data: {
                    nama: "",
                    nik: "",
                    noKartu: "",
                    pisa: "",
                    provUmum: { 
                        kdProvider: '', 
                        nmProvider: '' 
                    },
                    sex: "",
                    statusPeserta: { 
                        kode: '', 
                        keterangan: '' 
                    },
                    tglCetakKartu: "",
                    tglLahir: "",
                    tglTAT: "",
                    tglTMT: ""
                },  
                fullPage: true,
                isLoading: false,
                visibleForm: false,
                showOtorisasi: false,
                response_user_login:null
            }
        },
        created() {
            this.getdataprofesi();
        },
        computed: {
            isPasswordMatch() {
                return this.formData.password === this.formData.confirmPassword
            },
            isValidForm() {
                return (
                    this.formData.nik &&
                    this.formData.nama &&
                    this.formData.profesi &&
                    this.formData.password.length >= 6 &&
                    this.isPasswordMatch
                )
            }
        },
        methods: {
            submitForm() {
                this.submitted = true 
                if (this.isValidForm) { 
                    console.log('Form submitted:', this.formData)
                }
            },
            formatDate(dateString) {
                    const date = new Date(dateString);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    return date.toLocaleDateString('id-ID', options);
                },
            async getdataprofesi() {
                this.isLoading = true;
                await axios.post('/get_profesi')
                    .then(response => {
                        this.fact = response.data.response; 
                        console.log(this.fact);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            validatePasswords() {
                this.validationErrors = [];
                const { password, confirmPassword, profesi } = this.formData;

                // Check for empty/whitespace passwords
                if (!password?.trim() || !confirmPassword?.trim()) {
                    this.open('warning', 'Password tidak boleh kosong');
                    return false;
                }

                // Check password length
                if (password.length != 6) {
                    this.open('warning', 'Password harus 6 karakter');
                    return false;
                }

                // Check password match
                if (password !== confirmPassword) {
                    this.open('warning', 'Password tidak sama');
                    return false;
                }

                // Check password strength
                if (!/^\d+$/.test(password) || !/^\d+$/.test(confirmPassword)) {
                    this.open('warning', 'Password harus berupa angka');
                    return false;
                }

                if(this.formData.profesi.length == 0 || this.formData.profesi == null || this.formData.profesi== undefined){
                    this.open('warning', 'Profesi harus dipilih');
                    return false;
                }

                return true
            }, 
          
            showDialog() {
                console.log('showDialog method called'); // Add this line
                this.visibleForm = true;
                this.showOtorisasi = true;
                console.log(this.showOtorisasi)
            },
            simpan_data_user()
            {
                if(this.validatePasswords())
                {
                    console.log('Form submitted:', this.formData) 
                    this.showOtorisasi = true;
                } 
            },  
            async post_tobackend() {
                this.isLoading = true;
                await axios.post('/post_tobackend', this.formData)
                    .then(response => {  
                        console.log(response.data);  

                        if (response.data.metadata.code === "200") { 

                            this.open('success', response.data.metadata.message); 
                        } else {
                            this.open('warning', response.data.metadata.message);
                        }

                        this.response_user_login = response.data.response.response;

                        console.log(response.data.response.response);   
                      
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            async get_data_peserta() {
                this.isLoading = true;
                await axios.post('/get_data_peserta', this.formData)
                    .then(response => {  
                        console.log(response.data);  
                        if (response.data.metaData.code === "200") {
                            this.data = response.data.response.peserta; 

                            this.open('success', response.data.response.peserta.nama);
                            
                            this.open('success', "Data ditemukan");

                            this.formData.nama = response.data.response.peserta.nama;
                            //this.showOtorisasi = true;  
                        } else {
                            this.open('warning', response.data.metaData.message);
                        } 
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
        }
    }

</script>

<style>
    .error {
        color: red;
        font-size: 0.8em;
        margin-top: 5px;
    }

</style>
