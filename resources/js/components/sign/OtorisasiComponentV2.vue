<template>
    <section class="content">
        <div class="oto-wrapper">

            <!-- Icon shield -->
            <div class="oto-icon-wrap">
                <div class="oto-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>

            <h5 class="oto-title">Verifikasi Identitas</h5>
            <p class="oto-subtitle">Masukkan username dan password untuk melakukan otorisasi</p>

            <!-- Username -->
            <div class="oto-field">
                <label class="oto-label">
                    <i class="fas fa-user mr-1"></i> Username
                </label>
                <input
                    v-model="localUsername"
                    class="form-control oto-input"
                    autocomplete="off"
                    type="text"
                    placeholder="Masukkan username"
                />
            </div>

            <!-- Password -->
            <div class="oto-field">
                <label class="oto-label">
                    <i class="fas fa-lock mr-1"></i> Password
                </label>
                <Password
                    v-model="localPassword"
                    :feedback="false"
                    toggleMask
                    inputClass="form-control oto-input"
                    :inputStyle="{ width: '100%' }"
                    style="width:100%"
                    placeholder="Masukkan password"
                />
            </div>

        </div>
    </section>
</template>

<script>
    import Password from 'primevue/password';

    export default {
        components: { Password },
        props: {
            username: { type: String, default: '' },
            password: { type: String, default: '' }
        },
        emits: ['update:username', 'update:password'],
        computed: {
            localUsername: {
                get() { return this.username; },
                set(val) { this.$emit('update:username', val); }
            },
            localPassword: {
                get() { return this.password; },
                set(val) { this.$emit('update:password', val); }
            }
        },
        created() {
            if (!this.username) {
                this.$emit('update:username', localStorage.getItem('user_id') || '');
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
</style>
