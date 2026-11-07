<template>
    <section class="content">
        <div class="container-fluid">
            <loading :active="isLoading" :is-full-page="fullPage"></loading>

            <div class="login-box">

                <div class="card card-outline card-primary">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="rp_username">Username</label>
                            <div class="input-group mb-3">
                                <input type="text" v-model="form.username" class="form-control"
                                    id="rp_username" placeholder="Username" autocomplete="username">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="rp_passwordlama">Password Lama</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.passwordlama" class="form-control"
                                    id="rp_passwordlama" placeholder="Password lama" autocomplete="current-password">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="rp_passwordbaru">Password Baru</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.passwordbaru" class="form-control"
                                    id="rp_passwordbaru" placeholder="Password baru (min. 6 karakter)" autocomplete="new-password">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="rp_ulangipasswordbaru">Konfirmasi Password Baru</label>
                            <div class="input-group mb-3">
                                <input type="password" v-model="form.ulangipasswordbaru" class="form-control"
                                    id="rp_ulangipasswordbaru" placeholder="Ulangi password baru" autocomplete="new-password"
                                    @keyup.enter="rubahpassword()">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <button type="button" @click="rubahpassword()" :disabled="isLoading"
                                class="btn btn-primary btn-block">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from './bus';

    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                form: {
                    username: '',
                    passwordlama: '',
                    passwordbaru: '',
                    ulangipasswordbaru: '',
                },
                isLoading: false,
                fullPage: true,
            };
        },
        methods: {
            alert(type, message) {
                EventBus.$emit('show-alert', {
                    type: type,
                    title: type == 'success' ? 'Berhasil' : 'Perhatian',
                    message: message,
                });
            },

            async rubahpassword() {
                if (!this.form.username || !this.form.passwordlama || !this.form.passwordbaru || !this.form.ulangipasswordbaru) {
                    this.alert('warning', 'Username, password lama, password baru dan konfirmasi wajib diisi');
                    return;
                }
                if (this.form.passwordbaru.length < 6) {
                    this.alert('warning', 'Password baru minimal 6 karakter');
                    return;
                }
                if (this.form.passwordbaru != this.form.ulangipasswordbaru) {
                    this.alert('warning', 'Konfirmasi password baru tidak sama');
                    return;
                }

                this.isLoading = true;
                try {
                    const res = await axios.post('/rubah-password-v2', this.form);
                    const meta = (res.data && res.data.metadata) || {};
                    if (parseInt(meta.code) == 200) {
                        this.alert('success', meta.message || 'Password berhasil diubah');
                        this.form.passwordlama = '';
                        this.form.passwordbaru = '';
                        this.form.ulangipasswordbaru = '';
                    } else {
                        this.alert('error', meta.message || 'Gagal mengubah password');
                    }
                } catch (error) {
                    console.log(error);
                    this.alert('error', 'Gagal menghubungi server');
                } finally {
                    this.isLoading = false;
                }
            }
        },
    }
</script>
