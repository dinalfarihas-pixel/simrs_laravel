<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <div class="oto-wrapper">

            <!-- Icon shield -->
            <div class="oto-icon-wrap">
                <div class="oto-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>

            <h5 class="oto-title">Verifikasi Identitas</h5>
            <p class="oto-subtitle">Masukkan username dan PIN untuk melakukan otorisasi</p>

            <!-- Username -->
            <div class="oto-field">
                <label class="oto-label">
                    <i class="fas fa-user mr-1"></i> Username
                </label>
                <input
                    v-model="form.username"
                    class="form-control oto-input"
                    autocomplete="off"
                    type="text"
                    placeholder="Masukkan username"
                />
            </div>

            <!-- PIN -->
            <div class="oto-field">
                <label class="oto-label">
                    <i class="fas fa-lock mr-1"></i> PIN Otorisasi
                </label>
                <input
                    v-model="form.pwd"
                    type="password"
                    class="form-control oto-input"
                    autocomplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-bwignore="true"
                    data-form-type="other"
                    placeholder="Masukkan PIN"
                    @keyup.enter="do_otorize"
                />
            </div>

            <!-- Status loading -->
            <div v-if="isLoading" class="oto-loading">
                <ProgressBar mode="indeterminate" style="height:.25em;border-radius:4px" />
                <small class="text-muted mt-2 d-block text-center">Memverifikasi...</small>
            </div>

            <!-- Aksi -->
            <div class="oto-actions">
                <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="batal" :disabled="isLoading" />
                <Button label="Simpan" icon="pi pi-check" class="p-button-primary"
                    @click="do_otorize" :disabled="isLoading || !form.username || !form.pwd" />
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../bus';
        import ProgressBar from 'primevue/progressbar';

    export default {
        components: { Loading, ProgressBar },
        props: {
            mode:       { type: Number, required: true },
            noregister: { type: String, required: true },
            kodeboking: { type: String, required: false, default: '' },
            paramArray: { type: Array,  required: false }
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    username: '',
                    mode: '',
                    pwd: '',
                    noregister: '',
                    kodeboking: '',
                    paramArray: []
                },
                isLoading: false,
                fullPage: false,
                responseCode: 0
            };
        },
        mounted() {
            this.form.startdate = new Date();
        },
        created() {
            this.form.username  = localStorage.getItem('user_id');
            this.form.noregister = this.noregister;
        },
        methods: {
            batal() {
                this.form.pwd = '';
                this.$emit('cancel');
            },
            // open(type, message) {
            //     this.$toast.open({
            //         message,
            //         position: 'top-right',
            //         type,
            //         duration: 2500,
            //         dismissible: true
            //     });
            // },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            responvalue() {
                this.$emit('getvalue', this.responseCode);
            },
            async do_otorize() {
                this.form.mode       = this.mode;
                this.form.kodeboking = this.kodeboking;
                this.form.paramArray = this.paramArray;
                this.isLoading = true;

                try {
                    const response = await axios.post('/otorisasi_v3', this.form);
                    this.responseCode = response.data.metadata.code;
                    if (response.data.metadata.code == 200) {
                        this.open('success', response.data.metadata.message);
                    } else {
                        this.open('warning', response.data.metadata.message);
                    }
                    this.responvalue();
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }

                localStorage.setItem('user_id', this.form.username);
            }
        }
    }
</script>

<style scoped>
/* ===== WRAPPER ===== */
.oto-wrapper {
    padding: 8px 4px 16px;
    max-width: 420px;
    margin: 0 auto;
}

/* ===== ICON ===== */
.oto-icon-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 6px;
}
.oto-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1565c0, #42a5f5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #fff;
    box-shadow: 0 4px 12px rgba(21,101,192,.3);
}

/* ===== TITLE ===== */
.oto-title {
    text-align: center;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
}
.oto-subtitle {
    text-align: center;
    color: #888;
    margin-bottom: 20px;
}

/* ===== FIELD ===== */
.oto-field {
    margin-bottom: 16px;
}
.oto-label {
    display: block;
    font-weight: 600;
    color: #555;
    margin-bottom: 6px;
    font-size: .82rem;
    text-transform: uppercase;
    letter-spacing: .04em;
}
.oto-input {
    border-radius: 8px;
    border: 1.5px solid #dee2e6;
    padding: 10px 14px;
    transition: border-color .2s, box-shadow .2s;
}
.oto-input:focus {
    border-color: #1565c0;
    box-shadow: 0 0 0 3px rgba(21,101,192,.12);
    outline: none;
}

/* ===== LOADING ===== */
.oto-loading { margin-top: 16px; }

/* ===== ACTIONS ===== */
.oto-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
}
</style>
