<template>
    <section class="content">
        <div class="container-fluid">
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header bg-white">
                    <h3 class="card-title text-bold">
                        <i class="fas fa-notes-medical mr-2 text-primary"></i>
                        Informasi Ringkas Pasien
                    </h3>
                    <div class="card-tools">
                        <span class="badge badge-info p-2">{{ data_pasien.CARABAYAR }}</span>
                    </div>
                </div>

                <div class="card-body bg-light-custom">
                    <div class="row">
                        <div class="col-md-4 border-right">
                            <div class="d-flex align-items-center mb-3">
                                <div class="avatar-circle mr-3">
                                    <i class="fas fa-user-circle fa-3x text-secondary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0 text-bold text-primary">{{ data_pasien.DATA_SINGKAT }}</h5>
                                    <small class="text-muted">No. MR: {{ data_pasien.NOMR }}</small>
                                </div>
                            </div>
                            <hr>
                            <div class="info-group">
                                <label><i class="fas fa-fingerprint"></i> NO. SEP</label>
                                <p class="text-monospace">{{ data_pasien.NOSEP || '-' }}</p>
                            </div>
                        </div>

                        <div class="col-md-4 border-right">
                            <div class="info-group">
                                <label><i class="fas fa-calendar-day"></i> Tanggal Lahir</label>
                                <p>{{ data_pasien.TGLLAHIR }}</p>
                            </div>
                            <div class="info-group">
                                <label><i class="fas fa-clock"></i> Registrasi Masuk</label>
                                <p>{{ data_pasien.MASUKPOLY }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info-group">
                                <label><i class="fas fa-user-md"></i> DPJP / Dokter Pemeriksa</label>
                                <p class="text-primary text-bold">{{ data_pasien.NAMADOKTER }}</p>
                            </div>
                            <div class="info-group">
                                <label><i class="fas fa-hospital-user"></i> Status Penjamin</label>
                                <p><span class="badge badge-success-soft">Aktif</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="container-fluid">
            <div class="card card-primary card-outline shadow-sm">
                <div class="card-header">
                    <h3 class="card-title text-bold"><i class="fas fa-paper-plane mr-2"></i> Kirim Konsultasi Baru</h3>
                </div> 
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8 form-group">
                            <label class="text-bold d-block">Kepada YTH : </label>
                            <Select v-model="form_konsul.dokter_tujuan" :options="list_dokter"
                                optionLabel="NAMADOKTER" placeholder="-- Pilih Dokter Spesialis --" :filter="true"
                                filterPlaceholder="Cari dokter..." class="w-100 custom-prime-dropdown" />
                        </div>
                        <div class="col-md-8 form-group">
                            <label class="text-bold d-block">Diagnosa </label>
                            <InputText v-model="form_konsul.diagnosa" class="w-100" placeholder="" />
                        </div>
                        <div class="col-md-12 form-group">
                            <label class="text-bold">Isi Konsultasi / Pertanyaan</label>
                            <textarea class="form-control" rows="3" v-model="form_konsul.pesan"
                                placeholder="Tuliskan alasan konsul dan temuan klinis..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white text-right">
                    <Button class="btn btn-primary" icon="fas fa-paper-plane" label="Kirim Konsul"
                        :loading="loading_post" @click="kirimKonsul" />
                </div>
            </div>

            <div class="card shadow-none bg-transparent elevation-0">
                <div class="card-header pl-0">
                    <h3 class="card-title text-bold text-secondary">History Konsultasi</h3>
                </div>
                <div class="timeline">
                    <div v-for="(item, index) in chat_history" :key="index">
                        <i :class="item.jawaban ? 'fas fa-check bg-success' : 'fas fa-question bg-warning'"></i>

                        <div class="timeline-item shadow-sm border-0 mb-4">
                            <span class="time">
                                <i class="fas fa-clock mr-1"></i> {{ item.tanggal_konsul }}
                                <button @click="hapusKonsulInduk(item.id)" class="btn btn-xs btn-link text-danger ml-2"
                                    title="Hapus Konsultasi">
                                    <i class="fas fa-times"></i>
                                </button>
                            </span>

                            <h3 class="timeline-header no-border">
                                Mengirim konsul ke <span class="text-primary">{{ item.nama_dokter_tujuan }}</span>
                            </h3>

                            <div class="timeline-body bg-white rounded">
                                <div class="pertanyaan mb-3">
                                    <div class="badge badge-light mb-1">Pertanyaan:</div>
                                    <div v-html="convert_chart(item.keluhan)"></div>
                                </div>

                                <!-- <div class="jawaban-container p-3 rounded mt-1 mb-2" 
                                v-for="(jawaban, idx_j) in (item.show_all ? item.details : item.details.slice(0, 5))" 
                                :key="idx_j"
                                style="background: #e7f3ff; border-left: 4px solid #007bff;">

                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <strong class="text-primary">
                                            <i class="fas fa-user-md mr-1"></i> {{ jawaban.nama_dokter }}
                                        </strong>
                                    </div>
                                    <div class="text-right">
                                        <small class="text-muted mr-2">{{ jawaban.created_at }}</small>
                                        <button @click="hapusBalasan(jawaban.id)" class="btn btn-xs btn-outline-danger border-0" style="padding: 0 5px;">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <p class="mb-0"> {{ jawaban.balasan }} </p>
                            </div> -->
                                <div class="jawaban-container p-3 rounded mt-1 mb-2"
                                    v-for="(jawaban, idx_j) in (item.show_all ? item.details : item.details.slice(0, 5))"
                                    :key="idx_j" :style="[
                                    jawaban.nama_dokter === 'dr.Teuku Ronasky.Sp.B' 
                                    ? { background: '#f4f6f9', borderLeft: '4px solid #adb5bd' } 
                                    : { background: '#e7f3ff', borderLeft: '4px solid #007bff' }
                                ]">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <strong
                                                :class="jawaban.kode_dokter === data_pasien.KDDOKTER ? 'text-secondary' : 'text-primary'">
                                                <i class="fas fa-user-md mr-1"></i>
                                                {{ jawaban.nama_dokter }}
                                                <span v-if="jawaban.kode_dokter === data_pasien.KDDOKTER"
                                                    class="badge badge-secondary ml-1">Saya</span>
                                            </strong>
                                        </div>
                                        <div class="text-right">
                                            <small class="text-muted mr-2">{{ jawaban.created_at }}</small>
                                            <button @click="confirmHapusBalasan(jawaban.detail_id)"
                                                class="btn btn-xs btn-outline-danger border-0" style="padding: 0 5px;">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p class="mb-0"
                                        :class="{'text-muted': jawaban.kode_dokter === data_pasien.KDDOKTER}">
                                        <span v-html="convert_chart(jawaban.balasan)"></span>
                                    </p>
                                </div>

                                <div v-if="item.details && item.details.length > 5" class="text-center mb-2">
                                    <button class="btn btn-xs btn-link text-primary"
                                        @click="item.show_all = !item.show_all">
                                        {{ item.show_all ? 'Tampilkan lebih sedikit' : 'Lihat ' + (item.details.length - 5) + ' balasan lainnya...' }}
                                    </button>
                                </div>

                                <textarea class="form-control mb-2 mt-1" v-model="item.temp_balasan"
                                    placeholder="Tulis jawaban konsul di sini..."></textarea>

                                <Button class="btn btn-sm" icon="fas fa-reply" :loading="item.loading_balasan"
                                    label="Balas Konsul" @click="balasKonsul(item)" />

                            </div>
                        </div>
                    </div>
                    <div><i class="fas fa-clock bg-gray"></i></div>
                </div>
            </div>
        </div>
        <ConfirmDialog></ConfirmDialog>
    </section>
</template>

<script>
    import {
        data
    } from 'jquery';
    import Loading from 'vue-loading-overlay';
    import ConfirmDialog from 'primevue/confirmdialog';
    export default {
        components: {
            Loading,
            ConfirmDialog
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                data_pasien: [],
                list_dokter: [],
                noreg_from_url: '',
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                loading_post: false,
                fullPage: true,
                // Form Input Baru
                form_konsul: {
                    pesan: ''
                },
                chat_history: [],
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate; 
        },
        created() {
            //this.fetchData();
            this.noreg_from_url = window.location.pathname.split('/').pop();
            this.getdatapasien();
            this.getnamadokter();
            this.get_konsultasi_dokter();
        },
        methods: {
            fetchData() {
                var currentDate = new Date(); 
            },
            convert_chart: function (data) {
                if (data == null) {
                    return "";

                } else {
                    return data.replace(/\n/g, '<br>');
                }

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
            async getnamadokter() {
                this.form.mode = 2;
                await axios.post('/getnamadokter', this.form)
                    .then(response => {
                        this.list_dokter = response.data.response;
                        this.isLoading = false;

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            confirmHapusBalasan(id) {
 
                this.$confirm.require({
                    message: 'Apakah Anda yakin ingin menghapus balasan ini?',
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        // Panggil fungsi hapus jika user klik 'Ya'
                        this.eksekusiHapusBalasan(id);
                    },
                    reject: () => {
                        // Opsi jika user batal (opsional)
                    }
                });
            },
            async eksekusiHapusBalasan(id) {
                this.isLoading = true;
                try {
                    // Ganti URL sesuai endpoint API Anda
                    const response = await axios.post('/delete_balasan_konsul', {
                        detail_id: id
                    });

                    if (response.data.metadata.code === 200) {
                        this.open('success', 'Balasan berhasil dihapus');

                        // Refresh data tanpa reload halaman
                        this.get_konsultasi_dokter();
                    }
                } catch (error) {
                    console.error(error);
                    this.open('error', 'Gagal menghapus balasan');
                } finally {
                    this.isLoading = false;
                }
            },
            async hapusKonsulInduk(id) {
                if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat konsultasi ini?')) {
                    // Panggil API hapus di sini
                    // await axios.post('/delete_konsultasi', { id: id })
                    this.open('success', 'Konsultasi berhasil dihapus');
                    this.get_konsultasi_dokter(); // Refresh data
                }
            },

            async hapusBalasan(id) {
                if (confirm('Hapus balasan ini?')) {
                    // Panggil API hapus balasan di sini
                    // await axios.post('/delete_balasan', { id: id })
                    this.open('success', 'Balasan berhasil dihapus');
                    this.get_konsultasi_dokter(); // Refresh data
                }
            },
            async kirimKonsul() {
                if (!this.form_konsul.dokter_tujuan || !this.form_konsul.pesan) {
                    return this.open('error', 'Pilih dokter dan isi pesan konsul!');
                }

                this.loading_post = true;

                const newChat = {
                    id: Date.now(), // ID unik sementara 
                    tgl_tanya: new Date().toLocaleString('id-ID'),
                    noregister: this.data_pasien.NOPENDAFTARAN,
                    no_rm: this.data_pasien.NOMR,
                    nama_pasien: this.data_pasien.NAMAPASIEN,
                    keluhan: this.form_konsul.pesan,
                    dokter_tujuan: this.form_konsul.dokter_tujuan,
                    dokter_pengirim: this.data_pasien.KDDOKTER, // Default ke DPJP    
                    diagnosa: this.form_konsul.diagnosa || '', // Tambahkan field diagnosa
                    jawaban: null,
                    temp_balasan: ''
                };
                //console.log('parameter',this.form)
                await axios.post('/insert_konsultasi_dokter', newChat)
                    .then(response => { 

                        if (response.data.code === 200) {
                            this.get_konsultasi_dokter();
                            this.form_konsul.pesan = '';
                            this.form_konsul.dokter_tujuan = null;
                            this.form_konsul.diagnosa = '';
                            this.open('success', 'Konsultasi dikirim!');
                        }
                        this.loading_post = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.loading_post = false
                    })
                    .finally(() => this.loading_post = false)

            },
            async balasKonsul(item) {


                if (!item.temp_balasan) {
                    return this.open('error', 'Isi balasan konsul terlebih dahulu!');
                }

                item.loading_balasan = true;

                const newBalasan = {
                    id_konsul: item.id_konsul,
                    noregister: this.data_pasien.NOPENDAFTARAN,
                    no_rm: this.data_pasien.NOMR,
                    nama_pasien: this.data_pasien.NAMAPASIEN,
                    balasan: item.temp_balasan,
                    nama_dokter: this.data_pasien.NAMADOKTER, // Nama dokter pengirim (DPJP)
                    kode_dokter: this.data_pasien.KDDOKTER, // Default ke DPJP    
                }; 

                await axios.post('/insert_balasan_konsul', newBalasan)
                    .then(response => {
 
                        if (response.data.metadata.code === 200) {
                            this.get_konsultasi_dokter();
                            item.temp_balasan = '';
                            this.open('success', 'Balasan terkirim!');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        item.loading_balasan = false;
                    })
            },
            async get_konsultasi_dokter() {

                const param = {
                    noregister: this.noreg_from_url,
                    mode: 1,
                }; 
                await axios.post('/get_konsultasi_dokter', param)
                    .then(response => { 
                        // this.chat_history = response.data.response; 
                        this.isLoading = false 

                        const rawData = response.data.response;
                        this.chat_history = rawData.map(item => ({
                            ...item,
                            show_all: false, // Default: sembunyikan jika lebih dari 5
                            loading_balasan: false,
                            temp_balasan: ''
                        }));
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async getdatapasien() {
                this.form.mode = "history8";
                //this.form.noregister = "800368605";
                this.form.noregister = this.noreg_from_url //window.location.pathname.split('/').pop();
                //console.log('parameter',this.form)
                await axios.post('/datapasienpertransaksi', this.form)
                    .then(response => {

                        this.data_pasien = response.data.response[0]
                        this.isLoading = false
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
