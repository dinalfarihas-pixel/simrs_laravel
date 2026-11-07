<template>
    <div>
        <Dialog :header="'Serah Terima Obat: ' + receiptNo" :visible="visible" @update:visible="$emit('update:visible', $event)"
            :style="{width: '85vw'}" :modal="true">
            <div class="form-serah-terima">
                <div v-if="header && header.WAKTU_DITERIMA && itemBelumDiterima.length == 0" class="alert-diterima mb-3">
                    <i class="pi pi-check-circle mr-1"></i>
                    Obat sudah diterima <b>{{ header.DITERIMA_OLEH }}</b> pada {{ header.WAKTU_DITERIMA }}
                </div>
                <p v-else class="mb-2 text-muted">
                    Cocokkan obat yang diantar dengan permintaan. Centang item yang sudah diterima dan isi jumlah yang benar-benar diterima.
                    Obat yang belum diberikan farmasi (diberikan 0) dapat diterima nanti pada resep yang sama setelah farmasi memberikannya.
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
                            <th class="text-center">Sudah Diterima</th>
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
                                <span v-else>-</span>
                            </td>
                            <td class="text-center">
                                <span v-if="!bisaDikonfirmasi(item)">-</span>
                                <template v-else>
                                    <InputNumber v-model="item.qty_input" :min="0" :max="Number(item.QTY_SISA)"
                                        :maxFractionDigits="2" :disabled="!item.checked" inputClass="text-center"
                                        :inputStyle="{width: '6em'}" />
                                    <div v-if="item.sudah_diterima" class="status-terima-waktu">
                                        tambahan {{ $numeral(item.QTY_SISA, '0,0.[00]') }}
                                    </div>
                                </template>
                            </td>
                            <td class="text-center">
                                <span v-if="tanpaRincian" class="badge badge-secondary">Tanpa rincian item</span>
                                <span v-else-if="bisaDikonfirmasi(item) && item.sudah_diterima" class="badge badge-warning">Ada tambahan obat</span>
                                <span v-else-if="bisaDikonfirmasi(item)" class="badge badge-warning">Belum diterima</span>
                                <span v-else-if="!item.sudah_diterima" class="badge badge-secondary">Belum diberikan farmasi</span>
                                <span v-else class="badge badge-primary">Diterima</span>
                                <!-- Riwayat penerimaan (bisa lebih dari sekali) -->
                                <div v-for="(r, i) in riwayatItem(item)" :key="i" class="status-riwayat">
                                    <span v-if="riwayatItem(item).length > 1" class="font-weight-bold">{{ i + 1 }}.</span>
                                    <span class="status-terima-user">{{ r.DITERIMA_OLEH }}</span>
                                    <span v-if="riwayatItem(item).length > 1">({{ $numeral(r.QTY_TERIMA, '0,0.[00]') }})</span>
                                    <div class="status-terima-waktu">{{ r.TANGGAL_TERIMA }}</div>
                                </div>
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
    import { EventBus } from '../bus';
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
                riwayat: [],
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
            // Resep yang diterima lewat tombol Terima lama (tanpa rincian item): tidak bisa diserahterimakan lagi
            tanpaRincian() {
                return !!(this.header && this.header.TANPA_RINCIAN == 1);
            },
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
                EventBus.$emit('show-alert', { type, title: 'Serah Terima Obat', message });
            },
            // Bisa diterima selama ada obat diberikan yang belum diterima (QTY_SISA > 0), termasuk penerimaan
            // kedua dst. pada resep yang sama. Diberikan 0 -> tidak bisa dicentang.
            bisaDikonfirmasi(item) {
                return !this.tanpaRincian && Number(item.QTY_SISA) > 0;
            },
            riwayatItem(item) {
                return this.riwayat.filter(r => r.ITEM_ID == item.ITEM_ID);
            },
            // Total diterima (termasuk input sekarang bila dicentang) dibanding jumlah diberikan yang sudah diserahkan
            selisih(item) {
                let terima = item.sudah_diterima ? Number(item.QTY_TERIMA) : null;
                const input_aktif = item.checked && this.bisaDikonfirmasi(item)
                    && item.qty_input !== null && item.qty_input !== undefined;
                if (input_aktif) terima = (terima || 0) + Number(item.qty_input);
                if (terima === null) return 0;
                // Tambahan yang belum diterima (tidak dicentang) bukan selisih
                const dasar = Number(item.QTY_KIRIM) - (input_aktif ? 0 : Number(item.QTY_SISA));
                return terima - dasar;
            },
            togglePilihSemua() {
                this.itemBelumDiterima.forEach(item => item.checked = this.pilihSemua);
            },
            async loadDetail() {
                this.header = null;
                this.items = [];
                this.riwayat = [];
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
                    this.riwayat = response.data.riwayat || [];
                    this.items = response.data.response.map(item => {
                        // API lama (sebelum penerimaan bertahap) belum mengirim QTY_SISA: hitung dengan cara lama
                        const sisa = item.QTY_SISA !== undefined && item.QTY_SISA !== null
                            ? Number(item.QTY_SISA)
                            : (item.QTY_TERIMA === null ? Number(item.QTY_KIRIM) : 0);
                        return {
                            ...item,
                            QTY_SISA: sisa,
                            sudah_diterima: item.QTY_TERIMA !== null,
                            checked: false,
                            qty_input: sisa
                        };
                    });
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

    .status-riwayat {
        margin-top: 0.3rem;
        line-height: 1.2;
    }

    .status-riwayat .status-terima-user {
        margin-top: 0;
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
