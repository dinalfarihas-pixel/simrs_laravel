<template>
    <section class="content">
        <div class="container-fluid">  
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> 
            <ConfirmDialog></ConfirmDialog> 
            <Dialog :header="'No Permitaan: '+param.no_permintaan" v-model:visible="displayModal" :containerStyle="{width: '80%'}" :modal="true">
                <p class="m-0"> </p>
                <table class="table table-striped projects">
                    <thead>
                        <tr>
                            <th style="width: 7%">
                                NO
                            </th> 
                            <th style="width: 7%">
                                Barcode
                            </th>
                            <th style="width: 30%">
                                Nama Barang
                            </th>
                            <th>
                                Satuan
                            </th>
                            <th  >
                                Permintaan
                            </th>
                            <th   class="text-center">
                                Disetujui
                            </th>
                            <th   class="text-center">
                                Harga Satuan
                            </th>
                            <th class="text-center">
                                Sub Total
                            </th>
                            <th class="text-center">
                                Exp date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    
                        <tr v-for="(data,k) in detail_perimtaan">
                            <td>{{ k+1 }}</td> 
                            <td>{{ data.BARCODE }}</td>
                            <td>{{ data.NAMA }}</td>
                            <td class="project-actions text-center">{{ data.SATUAN }}</td>
                            <td class="project-actions text-center">{{ data.QTY_ORDER }}</td>
                            <td class="project-actions text-center">{{ data.QTY_APROVED }}</td>
                            <td class="project-actions text-center">{{ $numeral(data.HARGA, '0,0.00') }}</td>
                            <td class="project-actions text-center">{{ $numeral(data.SUB_TOTAL, '0,0.00') }}</td>
                            <td class="project-actions text-center">{{ data.EXP }}</td>
                        </tr>
                    </tbody>
                </table>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
                </template>
            </Dialog>

            <Dialog :header="'Konfirmasi Serah Terima: '+serahTerima.no_permintaan" v-model:visible="displaySerahTerima"
                :style="{width: '85%'}" :modal="true">
                <div class="form-serah-terima">
                <p class="mb-2 text-muted">
                    Centang item yang sudah diterima dan isi jumlah yang benar-benar diterima ruangan.
                </p>
                <table class="table table-striped projects">
                    <thead>
                        <tr>
                            <th style="width: 4%" class="text-center">
                                <Checkbox v-model="pilihSemua" :binary="true" :disabled="itemBelumDiterima.length==0"
                                    @change="togglePilihSemua" />
                            </th>
                            <th style="width: 4%">NO</th>
                            <th style="width: 10%">Barcode</th>
                            <th style="width: 28%">Nama Barang</th>
                            <th>Satuan</th>
                            <th class="text-center">Diminta</th>
                            <th class="text-center">Dikirim</th>
                            <th class="text-center" style="width: 14%">Jumlah Diterima</th>
                            <th class="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,k) in serahTerima.items" :key="item.BARCODE+'-'+item.ITEMSEQNO">
                            <td class="text-center">
                                <Checkbox v-model="item.checked" :binary="true" :disabled="item.sudah_diterima" />
                            </td>
                            <td>{{ k+1 }}</td>
                            <td>{{ item.BARCODE }}</td>
                            <td>{{ item.NAMA }}</td>
                            <td>{{ item.SATUAN }}</td>
                            <td class="text-center">{{ $numeral(item.QTY_ORDER, '0,0.[00]') }}</td>
                            <td class="text-center">{{ $numeral(item.QTY_KIRIM, '0,0.[00]') }}</td>
                            <td class="text-center">
                                <span v-if="item.sudah_diterima">{{ $numeral(item.QTY_TERIMA, '0,0.[00]') }}</span>
                                <InputNumber v-else v-model="item.qty_input" :min="0" :max="Number(item.QTY_KIRIM)"
                                    :maxFractionDigits="2" :disabled="!item.checked" inputClass="text-center"
                                    :inputStyle="{width: '6em'}" />
                            </td>
                            <td class="text-center">
                                <div v-if="item.sudah_diterima" class="status-terima">
                                    <span class="badge badge-primary">Diterima</span>
                                    <div class="status-terima-user">{{ item.DITERIMA_OLEH }}</div>
                                    <div class="status-terima-waktu">{{ item.TANGGAL_TERIMA }}</div>
                                </div>
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
                    <Button label="Tutup" icon="pi pi-times" @click="displaySerahTerima = false" class="p-button-text" />
                    <Button v-if="itemBelumDiterima.length > 0" label="Konfirmasi Terima" icon="pi pi-check"
                        :disabled="itemDipilih.length==0" @click="konfirmasiSerahTerima" />
                </template>
            </Dialog>

            <Dialog header="Otorisasi Serah Terima" v-model:visible="displayOtorisasi" :style="{width: '450px'}" :modal="true">
                <div class="form-serah-terima">
                    <p class="mb-3 text-muted">
                        Konfirmasi terima {{ itemDipilih.length }} item untuk permintaan {{ serahTerima.no_permintaan }}.
                        Masukkan user dan password petugas ruangan. Data yang sudah dikonfirmasi tidak dapat diubah.
                    </p>
                    <form @submit.prevent="otorisasi.user ? simpanSerahTerima() : cekUserOtorisasi()" autocomplete="off">
                        <div class="form-group">
                            <label for="oto_username">Username</label>
                            <InputText id="oto_username" v-model="otorisasi.username" class="w-100" autocomplete="off"
                                autofocus @input="otorisasi.user = null" />
                        </div>
                        <div class="form-group">
                            <label for="oto_password">Password</label>
                            <InputText id="oto_password" v-model="otorisasi.password" type="password" class="w-100"
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
                        :disabled="!otorisasi.username || !otorisasi.password" @click="cekUserOtorisasi" />
                    <Button v-else label="Konfirmasi & Simpan" icon="pi pi-lock-open" class="p-button-success"
                        @click="simpanSerahTerima" />
                </template>
            </Dialog>

            </div>
 
         

              <div class="card elevation-0">
                 <!-- Summary Section -->
                 <div class="card-body"> 
                     <!-- Summary Blocks - Left to Right Vertical -->
                     <div class="summary-blocks">
                         <!-- Block 1: Items Summary -->
                         <div class="summary-block">
                             <div class="block-icon items-icon">
                                 <i class="pi pi-box"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Terima Minggu Ini</div>
                                 <div class="block-value">{{ formatCurrency(summary?.this_week_total) }}</div>
                                  
                             </div>
                         </div>

                         <!-- Block 2: Quantity Summary -->
                         <div class="summary-block">
                             <div class="block-icon quantity-icon">
                                 <i class="pi pi-shopping-cart"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Terima Bulan Ini</div>
                                 <div class="block-value">{{ formatCurrency(summary?.this_month_total) }}</div>
                                 
                             </div>
                         </div>

                         <!-- Block 3: Revenue Summary -->
                         <div class="summary-block">
                             <div class="block-icon revenue-icon">
                                 <i class="pi pi-dollar"></i>
                             </div>
                             <div class="block-content">
                                 <div class="block-label">Terima Tahun Ini</div>
                                 <div class="block-value">Rp {{ formatCurrency( summary?.this_year_total) }}</div>
                                
                             </div>
                         </div>  

                     </div>
                 </div>
             </div>
           
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pilih tanggal permintaan</h3>
                </div>
                <div class="card-body">
                    <Toolbar class="mb-0">
                        <template #start>
                            <Calendar v-model="form.startdate" class="text-sm mr-1" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;" />
                            <Calendar v-model="form.enddate" class="text-sm mr-1" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 10em;   " />
                            <Button label="" align="" @click="getlist_permintaan()" icon="pi pi-check"
                                class="p-button" />
                        </template>
                        <template #end>
                            <a class="btn btn-info" href="/permintaanlogistik">
                                <i class="fas fa-plus">
                                </i>
                                Permintaan baru
                            </a>
                        </template>

                    </Toolbar>

                </div>
            </div> 
            <div class="card">
                <div class="card-header">
                    <div class="card-body">

                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 10%">
                                        Tanggal
                                    </th>
                                    <th style="width: 20%">
                                        Asal Permintaan
                                    </th>
                                    <th style="width: 30%">
                                        Tujuan Permintaan
                                    </th>
                                    <th>
                                        Progress
                                    </th>
                                    <th style="width: 20%">
                                        Catatan
                                    </th>
                                    <th style="width: 30%" class="text-center">
                                        Status/Batalkan
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="data in fact">
                                    <td>{{ data.NO_PERMINTAAN }} <br />
                                        <small>{{data.TANGGAL}}</small>
                                    </td>
                                    <td>{{ data.LOKASI }}
                                    </td>
                                    <td>
                                        {{ data.TUJUAN }}
                                    </td>
                                    <td class="project-state">
                                        <span v-if="data.TELAH_DIPROSES==0">
                                            <span class="badge badge-warning">
                                                Menunggu </span>
                                        </span>
                                        <span v-if="data.TELAH_DIPROSES==1">
                                            <span class="badge badge-success">
                                                Sudah diproses </span>
                                        </span>
                                        <br v-if="data.TELAH_DIPROSES==1" />
                                        <span v-if="data.TELAH_DIPROSES==1 && sudahDiterima(data)" class="badge badge-primary">
                                            Sudah diterima </span>
                                        <span v-else-if="data.TELAH_DIPROSES==1 && data.JML_DITERIMA > 0" class="badge badge-info">
                                            Diterima {{ data.JML_DITERIMA }}/{{ data.JML_ITEM }} item </span>
                                    </td>
                                    <td>
                                        {{ data.CATATAN }}
                                    </td>
                                    <td class="project-actions text-center">
                                        <Button icon="pi pi-search" @click="openModal(data.NO_PERMINTAAN)"
                                            class="p-button-rounded p-button-success" />
                                        <Button v-if="data.TELAH_DIPROSES==0" icon="pi pi-times" @click="confirm1(data.NO_PERMINTAAN)"
                                            class="p-button-rounded p-button-danger" />
                                        <Button v-else-if="!sudahDiterima(data)" icon="pi pi-inbox" label="Konfirmasi terima"
                                            @click="openSerahTerima(data.NO_PERMINTAAN)"
                                            class="p-button-rounded p-button-warning ml-1" />
                                        <Button v-else icon="pi pi-check-circle" label="Lihat serah terima"
                                            @click="openSerahTerima(data.NO_PERMINTAAN)"
                                            class="p-button-rounded p-button-outlined p-button-secondary ml-1" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
      
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import ConfirmDialog from 'primevue/confirmdialog';
    export default {
        components: {
            Loading,
            Dialog,
            ConfirmDialog, 
        },
        props: {
            msg: String,
        },
        data() {
            return {
                displayModal: false,
                fact: [],
                detail_perimtaan: [],
                param: {
                    no_permintaan: ''
                },
                form: {
                    startdate: '',
                    enddate: '',

                },
                isLoading: false,
                fullPage: true,
                summary:{
                    this_week_total:0,
                    this_month_total:0,
                    this_year_total:0
                },
                displaySerahTerima: false,
                displayOtorisasi: false,
                otorisasi: {
                    username: '',
                    password: '',
                    user: null
                },
                pilihSemua: false,
                serahTerima: {
                    no_permintaan: '',
                    items: []
                }
            };
        },
        computed: {
            itemBelumDiterima() {
                return this.serahTerima.items.filter(item => !item.sudah_diterima);
            },
            itemDipilih() {
                return this.itemBelumDiterima.filter(item => item.checked);
            }
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
            console.log(currentDate);
            this.getlist_permintaan();
            this.getTransferSummary()
        },

        created() {
            //this.fetchData();
      
        },
        methods: {
            openModal(nomor_permintaan) {
                this.displayModal = true;
                this.param.no_permintaan = nomor_permintaan;
                this.getdetail_histori(nomor_permintaan)
            },
            closeModal() {
                this.displayModal = false;
            },
            async getdetail_histori(nomor_permintaan) {

                this.detail_perimtaan=[];
                this.param.no_permintaan = nomor_permintaan;
               
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/getdetail_permintaan', this.param)
                    .then(response => {
                        this.detail_perimtaan = response.data
                        this.isLoading = false
                        console.log(this.detail_perimtaan);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            sudahDiterima(data) {
                return Number(data.JML_ITEM) > 0 && Number(data.JML_DITERIMA) >= Number(data.JML_ITEM);
            },
            selisih(item) {
                const terima = item.sudah_diterima ? item.QTY_TERIMA : (item.checked ? item.qty_input : null);
                if (terima === null || terima === undefined) return 0;
                return Number(terima) - Number(item.QTY_KIRIM);
            },
            togglePilihSemua() {
                this.itemBelumDiterima.forEach(item => item.checked = this.pilihSemua);
            },
            async openSerahTerima(no_permintaan) {
                this.serahTerima = { no_permintaan: no_permintaan, items: [] };
                this.pilihSemua = false;
                this.isLoading = true;
                try {
                    const response = await axios.post('/get_detail_serah_terima', { no_permintaan: no_permintaan });
                    if (response.data.metadata.code != 200) {
                        this.open('warning', response.data.metadata.message);
                        return;
                    }
                    this.serahTerima.items = response.data.response.map(item => ({
                        ...item,
                        sudah_diterima: item.QTY_TERIMA !== null,
                        checked: false,
                        qty_input: Number(item.QTY_KIRIM)
                    }));
                    this.displaySerahTerima = true;
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memuat detail serah terima');
                } finally {
                    this.isLoading = false;
                }
            },
            konfirmasiSerahTerima() {
                const kosong = this.itemDipilih.find(item => item.qty_input === null || item.qty_input === undefined);
                if (kosong) {
                    this.open('warning', 'Jumlah diterima ' + kosong.NAMA + ' belum diisi');
                    return;
                }
                this.otorisasi = { username: '', password: '', user: null };
                this.displayOtorisasi = true;
            },
            async cekUserOtorisasi() {
                if (!this.otorisasi.username || !this.otorisasi.password) {
                    this.open('warning', 'Username dan password otorisasi wajib diisi');
                    return;
                }
                this.isLoading = true;
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
                    this.isLoading = false;
                }
            },
            async simpanSerahTerima() {
                if (!this.otorisasi.user) {
                    this.cekUserOtorisasi();
                    return;
                }
                const payload = {
                    username: this.otorisasi.username,
                    password: this.otorisasi.password,
                    no_permintaan: this.serahTerima.no_permintaan,
                    items: this.itemDipilih.map(item => ({
                        BARCODE: item.BARCODE,
                        ITEMSEQNO: item.ITEMSEQNO,
                        QTY_TERIMA: item.qty_input
                    }))
                };
                this.isLoading = true;
                try {
                    const response = await axios.post('/simpan_serah_terima', payload);
                    if (response.data.metadata.code == 200) {
                        this.open('success', response.data.metadata.message);
                        this.displayOtorisasi = false;
                        this.displaySerahTerima = false;
                        this.getlist_permintaan();
                    } else {
                        this.open('warning', response.data.metadata.message);
                    }
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal menyimpan serah terima');
                } finally {
                    this.otorisasi.password = '';
                    this.otorisasi.user = null;
                    this.isLoading = false;
                }
            },
            formatCurrency(value) {
                 if (value === 0 || value === null || value === undefined) return '0';
                 return new Intl.NumberFormat('id-ID').format(value);
             },
            confirm1(x) { 
                this.$confirm.require({
                        message: 'Anda ingin menghapus permintaan '+x+' ?',
                        header: 'Hapus konfirmasi',
                        icon: 'pi pi-info-circle',
                        acceptClass: 'p-button-danger',
                        accept: () => {  
                            this.hapus_permintaan(x)
                            
                        },
                        reject: () => {
                            //this.$toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
                            console.log('batal')
                        }
                    }); 
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 4000,
                    dismissible: true
                })
            }, 
            async hapus_permintaan(no_permintaan)
            {
 
                const dataform = new FormData();

                this.param.no_permintaan = no_permintaan;
                this.isLoading = true;
                await axios.post('/hapus_permintaan', this.param)
                    .then(response => {

                        console.log(response.data);
                        let respon = response.data.metadata.code
                        if(respon==200)
                        {
                            this.open('success',response.data.metadata.message)
                            this.getlist_permintaan();
                        }
                        else
                        {
                            this.open('warning',response.data.metadata.message)
                        }

                        this.isLoading = false 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getlist_permintaan() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/getlist_permintaan_baselokasi', this.form)
                    .then(response => {
                        if (response.data.metadata && response.data.metadata.code != 200) {
                            this.open('warning', response.data.metadata.message)
                        }
                        this.fact = response.data.response
                        this.isLoading = false
                        this.getTransferSummary()
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getTransferSummary() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/getTransferSummary', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.summary = response.data 
                        this.isLoading = false 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>



 <style scoped>
     .summary-container {
         background: #ffffff;
         border-radius: 12px;
         padding: 2rem;
         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
         border: 1px solid #e5e7eb;
     }

     .summary-title {
         font-weight: 700;
         color: #1f2937;
         margin-bottom: 2rem;
         text-align: center;
     }

     .summary-blocks {
         display: grid;
         grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
         gap: 1.5rem;
     }

     .summary-block {
         background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
         border: 1px solid #e2e8f0;
         border-radius: 12px;
         padding: 1.5rem;
         display: flex;
         align-items: center;
         gap: 1rem;
         transition: all 0.3s ease;
         position: relative;
         overflow: hidden;
     }

     .summary-block:hover {
         transform: translateY(-2px);
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
         border-color: #cbd5e1;
     }

     .summary-block::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 4px;
         height: 100%;
         background: var(--block-color, #3b82f6);
     }

     .block-icon {
         width: 60px;
         height: 60px;
         border-radius: 12px;
         display: flex;
         align-items: center;
         justify-content: center;
         color: white;
         flex-shrink: 0;
     }

     .items-icon {
         background: linear-gradient(135deg, #3b82f6, #1d4ed8);
     }

     .summary-block:nth-child(1)::before {
         background: #3b82f6;
     }

     .quantity-icon {
         background: linear-gradient(135deg, #10b981, #047857);
     }

     .summary-block:nth-child(2)::before {
         background: #10b981;
     }

     .revenue-icon {
         background: linear-gradient(135deg, #f59e0b, #d97706);
     }

     .summary-block:nth-child(3)::before {
         background: #f59e0b;
     }

     .price-icon {
         background: linear-gradient(135deg, #8b5cf6, #7c3aed);
     }

     .summary-block:nth-child(4)::before {
         background: #8b5cf6;
     }

     .period-icon {
         background: linear-gradient(135deg, #ef4444, #dc2626);
     }

     .summary-block:nth-child(5)::before {
         background: #ef4444;
     }

     .bestseller-icon {
         background: linear-gradient(135deg, #f97316, #ea580c);
     }

     .summary-block:nth-child(6)::before {
         background: #f97316;
     }

     .block-content {
         flex: 1;
         min-width: 0;
     }

     .block-label {
         font-weight: 500;
         color: #6b7280;
         margin-bottom: 0.25rem;
     }

     .block-value {
         font-weight: 500;
         color: #111827;
         font-size: 1.3rem;
         line-height: 1.2;
         margin-bottom: 0.25rem;
     }

     .block-value-small {
         font-weight: 600;
         color: #111827;
         line-height: 1.3;
         margin-bottom: 0.25rem;
     }

     .block-subtitle {
         color: #9ca3af;
         font-weight: 400;
     }

     .period-block .block-value-small {

         font-weight: 600;
     }

     /* Responsive Design */
     @media (max-width: 1024px) {
         .summary-blocks {
             grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
             gap: 1rem;
         }
     }

     @media (max-width: 768px) {
         .summary-container {
             padding: 1.5rem;
         }

         .summary-blocks {
             grid-template-columns: 1fr;
             gap: 1rem;
         }

         .summary-block {
             padding: 1.25rem;
         }

         .block-icon {
             width: 50px;
             height: 50px;
         }


     }

     @media (max-width: 480px) {
         .summary-title {
             margin-bottom: 1.5rem;
         }

         .summary-block {
             flex-direction: column;
             text-align: center;
             gap: 0.75rem;
         }

         .block-content {
             width: 100%;
         }
     }

     .table-header {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 1rem;
         background: #f8f9fa;
         border-radius: 8px 8px 0 0;
     }

     .category-badge {
         background: #e3f2fd;
         color: #1976d2;
         padding: 0.25rem 0.5rem;
         border-radius: 4px;
         font-weight: 500;
     }

     .table-footer {
         padding: 1rem;
         background: #f8f9fa;
         border-radius: 0 0 8px 8px;
     }

     .footer-summary {
         display: flex;
         justify-content: space-between;
         align-items: center;
     }

     /* Responsive adjustments for table */
     @media (max-width: 768px) {
         .table-header {
             flex-direction: column;
             gap: 1rem;
         }

         .footer-summary {
             flex-direction: column;
             gap: 0.5rem;
             text-align: center;
         }
     }

     /* Form konfirmasi serah terima */
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

     .form-serah-terima .status-terima-user {
         font-weight: 600;
         font-size: 0.95rem;
         margin-top: 0.3rem;
     }

     .form-serah-terima .status-terima-waktu {
         font-size: 0.85rem;
         color: #6b7280;
     }

     .form-serah-terima .status-selisih {
         font-size: 0.9rem;
         font-weight: 600;
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

     /* PrimeVue DataTable customizations */
     :deep(.p-datatable) {
         border-radius: 8px;
         overflow: hidden;
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
     }

     :deep(.p-datatable .p-datatable-header) {
         border-radius: 8px 8px 0 0;
     }

     :deep(.p-datatable .p-datatable-footer) {
         border-radius: 0 0 8px 8px;
     }

     :deep(.p-paginator) {
         border-radius: 0 0 8px 8px;
     }

 </style>
