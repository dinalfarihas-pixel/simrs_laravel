<template>
    <div>
        <Dialog :header="'Serah Terima Obat: ' + receiptNo" :visible="visible" @update:visible="$emit('update:visible', $event)"
            :style="{width: '85vw'}" :modal="true">
            <div class="form-serah-terima">
                <div v-if="header && header.WAKTU_DITERIMA" class="alert-diterima mb-3">
                    <i class="pi pi-check-circle mr-1"></i>
                    Obat sudah diterima <b>{{ header.DITERIMA_OLEH }}</b> pada {{ header.WAKTU_DITERIMA }}
                </div>
                <p v-else class="mb-2 text-muted">
                    Cocokkan obat yang diantar dengan permintaan. Centang item yang sudah diterima dan isi jumlah yang benar-benar diterima.
                </p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style="width: 4%" class="text-center">
                                <Checkbox v-model="pilihSemua" :binary="true" :disabled="itemBelumDiterima.length==0"
                                    @change="togglePilihSemua" />
                            </th>
                            <th style="width: 4%">NO</th>
                            <th style="width: 32%">Nama Obat</th>
                            <th>Satuan</th>
                            <th class="text-center">Diminta</th>
                            <th class="text-center">Diberikan</th>
                            <th class="text-center" style="width: 14%">Jumlah Diterima</th>
                            <th class="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,k) in items" :key="item.ITEM_ID">
                            <td class="text-center">
                                <Checkbox v-model="item.checked" :binary="true" :disabled="!bisaDikonfirmasi(item)" />
                            </td>
                            <td>{{ k+1 }}</td>
                            <td>
                                {{ item.NAMABARANG }}
                                <div v-if="item.NAMABARANG_REQ && item.NAMABARANG_REQ != item.NAMABARANG" class="text-warning-dark small">
                                    Diminta: {{ item.NAMABARANG_REQ }}
                                </div>
                            </td>
                            <td>{{ item.SATUAN }}</td>
                            <td class="text-center">{{ $numeral(item.QTY_REQ, '0,0.[00]') }}</td>
                            <td class="text-center">{{ $numeral(item.QTY_KIRIM, '0,0.[00]') }}</td>
                            <td class="text-center">
                                <span v-if="item.sudah_diterima">{{ $numeral(item.QTY_TERIMA, '0,0.[00]') }}</span>
                                <span v-else-if="!bisaDikonfirmasi(item)">-</span>
                                <InputNumber v-else v-model="item.qty_input" :min="0" :max="Number(item.QTY_KIRIM)"
                                    :maxFractionDigits="2" :disabled="!item.checked" inputClass="text-center"
                                    :inputStyle="{width: '6em'}" />
                            </td>
                            <td class="text-center">
                                <div v-if="item.sudah_diterima">
                                    <span class="badge badge-primary">Diterima</span>
                                    <div class="status-terima-user">{{ item.DITERIMA_OLEH }}</div>
                                    <div class="status-terima-waktu">{{ item.TANGGAL_TERIMA }}</div>
                                </div>
                                <span v-else-if="header && header.WAKTU_DITERIMA" class="badge badge-secondary">Tanpa rincian item</span>
                                <span v-else class="badge badge-warning">Belum diterima</span>
                                <div v-if="selisih(item) != 0" class="text-danger status-selisih">
                                    Selisih {{ $numeral(selisih(item), '0,0.[00]') }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="$emit('update:visible', false)" class="p-button-text" />
                <Button v-if="itemBelumDiterima.length > 0" label="Konfirmasi Terima" icon="pi pi-check"
                    :disabled="itemDipilih.length==0" @click="konfirmasi" />
            </template>
        </Dialog>

        <Dialog header="Otorisasi Serah Terima Obat" v-model:visible="displayOtorisasi" :style="{width: '450px'}" :modal="true">
            <div class="form-serah-terima">
                <p class="mb-3 text-muted">
                    Konfirmasi terima {{ itemDipilih.length }} item obat resep {{ receiptNo }}.
                    Masukkan user dan password petugas. Data yang sudah dikonfirmasi tidak dapat diubah.
                </p>
                <form @submit.prevent="otorisasi.user ? simpan() : cekUser()" autocomplete="off">
                    <div class="form-group">
                        <label for="oto_resep_username">Username</label>
                        <InputText id="oto_resep_username" v-model="otorisasi.username" class="w-100" autocomplete="off"
                            autofocus @input="otorisasi.user = null" />
                    </div>
                    <div class="form-group">
                        <label for="oto_resep_password">Password</label>
                        <InputText id="oto_resep_password" v-model="otorisasi.password" type="password" class="w-100"
                            autocomplete="new-password" @input="otorisasi.user = null" />
                    </div>
                    <button type="submit" class="d-none"></button>
                </form>
                <div v-if="otorisasi.user" class="oto-user-info">
                    <div class="text-muted small mb-1">Pastikan data user berikut benar sebelum konfirmasi:</div>
                    <table class="w-100">
                        <tbody>
                            <tr><td style="width: 35%">Nama</td><td><b>{{ otorisasi.user.nama }}</b></td></tr>
                            <tr><td>Username</td><td>{{ otorisasi.user.username }}</td></tr>
                            <tr v-if="otorisasi.user.jabatan"><td>Jabatan</td><td>{{ otorisasi.user.jabatan }}</td></tr>
                            <tr v-if="otorisasi.user.lokasi"><td>Lokasi</td><td>{{ otorisasi.user.lokasi }}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="displayOtorisasi = false" class="p-button-text" />
                <Button v-if="!otorisasi.user" label="Cek User" icon="pi pi-user"
                    :disabled="!otorisasi.username || !otorisasi.password" @click="cekUser" />
                <Button v-else label="Konfirmasi & Simpan" icon="pi pi-lock-open" class="p-button-success" @click="simpan" />
            </template>
        </Dialog>
    </div>
</template>

<script>
    import Dialog from 'primevue/dialog';
    export default {
        components: {
            Dialog,
        },
        props: {
            visible: Boolean,
            receiptNo: [String, Number],
        },
        emits: ['update:visible', 'saved', 'loading'],
        data() {
            return {
                header: null,
                items: [],
                pilihSemua: false,
                displayOtorisasi: false,
                otorisasi: {
                    username: '',
                    password: '',
                    user: null
                },
            };
        },
        computed: {
            itemBelumDiterima() {
                return this.items.filter(item => this.bisaDikonfirmasi(item));
            },
            itemDipilih() {
                return this.itemBelumDiterima.filter(item => item.checked);
            }
        },
        watch: {
            visible(val) {
                if (val) this.loadDetail();
            }
        },
        mounted() {
            if (this.visible) this.loadDetail();
        },
        methods: {
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 4000,
                    dismissible: true
                })
            },
            bisaDikonfirmasi(item) {
                // Header sudah diterima (termasuk konfirmasi lama tanpa rincian) -> tidak bisa dikonfirmasi lagi
                return !item.sudah_diterima && !(this.header && this.header.WAKTU_DITERIMA);
            },
            selisih(item) {
                const terima = item.sudah_diterima ? item.QTY_TERIMA : (item.checked ? item.qty_input : null);
                if (terima === null || terima === undefined) return 0;
                return Number(terima) - Number(item.QTY_KIRIM);
            },
            togglePilihSemua() {
                this.itemBelumDiterima.forEach(item => item.checked = this.pilihSemua);
            },
            async loadDetail() {
                this.header = null;
                this.items = [];
                this.pilihSemua = false;
                this.$emit('loading', true);
                try {
                    const response = await axios.post('/get_detail_serah_terima_resep', { receipt_no: this.receiptNo });
                    if (response.data.metadata.code != 200) {
                        this.open('warning', response.data.metadata.message);
                        this.$emit('update:visible', false);
                        return;
                    }
                    this.header = response.data.header;
                    this.items = response.data.response.map(item => ({
                        ...item,
                        sudah_diterima: item.QTY_TERIMA !== null,
                        checked: false,
                        qty_input: Number(item.QTY_KIRIM)
                    }));
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memuat detail serah terima obat');
                } finally {
                    this.$emit('loading', false);
                }
            },
            konfirmasi() {
                const kosong = this.itemDipilih.find(item => item.qty_input === null || item.qty_input === undefined);
                if (kosong) {
                    this.open('warning', 'Jumlah diterima ' + kosong.NAMABARANG + ' belum diisi');
                    return;
                }
                this.otorisasi = { username: '', password: '', user: null };
                this.displayOtorisasi = true;
            },
            async cekUser() {
                if (!this.otorisasi.username || !this.otorisasi.password) {
                    this.open('warning', 'Username dan password otorisasi wajib diisi');
                    return;
                }
                this.$emit('loading', true);
                try {
                    const response = await axios.post('/cek_otorisasi_serah_terima', {
                        username: this.otorisasi.username,
                        password: this.otorisasi.password
                    });
                    if (response.data.metadata.code == 200) {
                        this.otorisasi.user = response.data.response;
                    } else {
                        this.otorisasi.user = null;
                        this.open('warning', response.data.metadata.message);
                    }
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memeriksa user otorisasi');
                } finally {
                    this.$emit('loading', false);
                }
            },
            async simpan() {
                if (!this.otorisasi.user) {
                    this.cekUser();
                    return;
                }
                const payload = {
                    username: this.otorisasi.username,
                    password: this.otorisasi.password,
                    receipt_no: this.receiptNo,
                    items: this.itemDipilih.map(item => ({
                        ITEM_ID: item.ITEM_ID,
                        QTY_TERIMA: item.qty_input
                    }))
                };
                this.$emit('loading', true);
                try {
                    const response = await axios.post('/simpan_serah_terima_resep', payload);
                    if (response.data.metadata.code == 200) {
                        this.open('success', response.data.metadata.message);
                        this.displayOtorisasi = false;
                        this.$emit('update:visible', false);
                        this.$emit('saved');
                    } else {
                        this.open('warning', response.data.metadata.message);
                    }
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal menyimpan serah terima obat');
                } finally {
                    this.otorisasi.password = '';
                    this.otorisasi.user = null;
                    this.$emit('loading', false);
                }
            },
        },
    }
</script>

<style scoped>
    .form-serah-terima {
        font-size: 1.05rem;
    }

    .form-serah-terima .table td,
    .form-serah-terima .table th {
        vertical-align: middle;
    }

    .form-serah-terima .badge {
        font-size: 0.9rem;
        padding: 0.4em 0.7em;
    }

    .status-terima-user {
        font-weight: 600;
        font-size: 0.95rem;
        margin-top: 0.3rem;
    }

    .status-terima-waktu {
        font-size: 0.85rem;
        color: #6b7280;
    }

    .status-selisih {
        font-size: 0.9rem;
        font-weight: 600;
    }

    .text-warning-dark {
        color: #b45309;
    }

    .alert-diterima {
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        border-radius: 8px;
        padding: 0.6rem 1rem;
    }

    .oto-user-info {
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        border-radius: 8px;
        padding: 0.75rem 1rem;
    }

    .oto-user-info td {
        padding: 0.15rem 0;
    }

    .form-serah-terima :deep(.p-inputnumber-input) {
        font-size: 1.05rem;
    }
</style>
