<template>
    <section class="content">
        <div class="container-fluid">
            <!-- Loading Overlay -->
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Page Header -->
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">
                        
                    </h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Item Barang</li>
                    </ol>
                </div>
            </div>

            <!-- Main Card - Centered -->
            <div class="row" style="display: flex; justify-content: center;">
                <div class="col-lg-8 col-md-10">
                    <div class="card card-primary card-outline">
                        <div class="card-header with-border">
                            <h3 class="card-title">
                                <i class="fas fa-plus-circle mr-2"></i>Form Input Item Barang
                            </h3>
                            <div class="card-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <form @submit.prevent="simpan_new_item">
                            <div class="card-body">
                                <div class="row">
                                    <!-- Nama Persediaan -->
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="nama">
                                                <i class="fas fa-tag mr-1"></i>NAMA PERSEDIAAN
                                                <span class="text-danger">*</span>
                                            </label>
                                            <InputText 
                                                id="nama"
                                                v-model="form.NAMA" 
                                                type="text" 
                                                class="w-100"
                                                style="text-transform: uppercase"
                                                placeholder="Masukkan nama persediaan"
                                            />
                                        </div>
                                    </div>

                                    <!-- Kategori -->
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="kategori">
                                                <i class="fas fa-folder mr-1"></i>KATEGORI
                                                <span class="text-danger">*</span>
                                            </label> 
                                            <Select 
                                                id="kategori"
                                                v-model="form.kategori_selected" 
                                                :options="kategories" 
                                                :filter="true"
                                                optionLabel="NAMA_KATEGORI"  
                                                placeholder="Pilih Kategori"
                                                class="w-100"
                                                @change="onKategoriChange"
                                            />
                                        </div>
                                    </div>

                                    <!-- Kandungan -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="kandungan">
                                                <i class="fas fa-flask mr-1"></i>KANDUNGAN (Contoh : 500 Mg)
                                            </label>
                                            <InputNumber 
                                                id="kandungan"
                                                v-model="form.KANDUNGAN" 
                                                mode="decimal" 
                                                :minFractionDigits="0"
                                                placeholder="0"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <!-- Jenis -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="jenis">
                                                <i class="fas fa-list mr-1"></i>JENIS
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="jenis"
                                                v-model="form.jenis" 
                                                :filter="true"
                                                :options="get_jenis_item" 
                                                optionLabel="JENIS"  
                                                placeholder="Pilih Jenis"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <!-- Bentuk Obat (Dinamis) -->
                                    <!-- <div class="col-md-12" v-if="form.kategori_selected['NAMA_KATEGORI']=='OBAT-OBATAN' || form.kategori_selected['NAMA_KATEGORI']=='BMHP'">
                                        <div class="form-group">
                                            <label for="bentukobat">
                                                <i class="fas fa-pills mr-1"></i>BENTUK OBAT
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="bentukobat"
                                                v-model="form.bentuk_obat" 
                                                :options="bentuk_obat_options" 
                                                optionLabel="name" 
                                                placeholder="Pilih Bentuk Obat"
                                                class="w-100"
                                            />
                                        </div>
                                    </div> -->

                                    <!-- Grouping -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="grouping">
                                                <i class="fas fa-layer-group mr-1"></i>GROUPING
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="grouping"
                                                v-model="form.data_grouping" 
                                                :filter="true"
                                                :options="data_grouping" 
                                                optionLabel="GROUPING"  
                                                placeholder="Pilih Grouping"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <!-- Grouping Baru -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="grouping2">
                                                <i class="fas fa-plus-square mr-1"></i>GROUPING (Baru)
                                            </label>
                                            <InputText 
                                                id="grouping2"
                                                v-model="form.grouping2" 
                                                type="text" 
                                                class="w-100"
                                                style="text-transform: uppercase"
                                                placeholder="Diisi jika grouping belum tersedia"
                                            />
                                            <small class="form-text text-muted d-block mt-2">
                                                <i class="fas fa-info-circle mr-1"></i>Opsional: untuk membuat grouping baru
                                            </small>
                                        </div>
                                    </div>

                                    <!-- Satuan & Stock Min -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="satuan">
                                                <i class="fas fa-ruler mr-1"></i>SATUAN
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="satuan"
                                                v-model="form.satuan_selected" 
                                                :filter="true"
                                                :options="satuan_data" 
                                                optionLabel="SATUAN"  
                                                placeholder="Pilih Satuan"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="stockmin">
                                                <i class="fas fa-boxes mr-1"></i>STOCK MINIMUM
                                            </label>
                                            <InputNumber 
                                                id="stockmin"
                                                v-model="form.stock_min" 
                                                mode="decimal" 
                                                :minFractionDigits="0"
                                                placeholder="0"
                                                class="w-100"
                                            />
                                            <small class="form-text text-muted d-block mt-2">
                                                <i class="fas fa-info-circle mr-1"></i>Jika kurang dari 0, dianggap tidak menggunakan minimum
                                            </small>
                                        </div>
                                    </div>

                                    <!-- Potong Stock -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="potongstock">
                                                <i class="fas fa-cut mr-1"></i>POTONG STOCK
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="potongstock"
                                                v-model="form.potong_stock" 
                                                :options="potong_stock" 
                                                optionLabel="name"
                                                placeholder="Pilih Opsi"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <!-- Untuk Dijual -->
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="untukdijual">
                                                <i class="fas fa-shopping-cart mr-1"></i>UNTUK DIJUAL
                                                <span class="text-danger">*</span>
                                            </label>
                                            <Select 
                                                id="untukdijual"
                                                v-model="form.untuk_dijual" 
                                                :options="untuk_dijual" 
                                                optionLabel="name"
                                                placeholder="Pilih Opsi"
                                                class="w-100"
                                            />
                                            <small class="form-text text-muted d-block mt-2">
                                            <i class="fas fa-info-circle mr-1"></i>Apakah item dibeli dan dijual kembali
                                            </small>
                                        </div>
                                    </div>

                                    <!-- Jasa Pelayanan -->
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="jasapelayanan">
                                                <i class="fas fa-handshake mr-1"></i>JASA PELAYANAN
                                            </label>
                                            <InputNumber 
                                                id="jasapelayanan"
                                                v-model="form.JASA_PELAYANAN" 
                                                mode="decimal" 
                                                :minFractionDigits="0"
                                                placeholder="0"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Footer -->
                            <div class="card-footer bg-light">
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <Button 
                                        type="submit" 
                                        label="Simpan"
                                        icon="pi pi-save"
                                        class="p-button-success"
                                        :loading="isLoading"
                                    />
                                    <Button 
                                        type="button" 
                                        label="Arsipkan"
                                        icon="pi pi-bookmark-fill"
                                        class="p-button-warning"
                                        @click="arsipkan"
                                        :disabled="isLoading"
                                    />
                                    <Button 
                                        type="button" 
                                        label="Reset"
                                        icon="pi pi-redo"
                                        class="p-button-secondary"
                                        @click="resetForm"
                                        :disabled="isLoading"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

export default {
    components: {
        Loading,
        InputText,
        InputNumber,
        Dropdown,
        Button
    },
    props: {
        msg: String,
    },
    data() {
        return {
            form: {
                NAMA: '',
                KANDUNGAN: 0,
                data_grouping: '',
                grouping2: '',
                potong_stock: {
                    name: 'YA',
                    code: 1
                },
                kategori_selected: '',
                satuan_selected: '',
                stock_min: 0,
                untuk_dijual: {
                    name: 'YA',
                    code: 1
                },
                jenis: '',
                JASA_PELAYANAN: 0,
                bentuk_obat: ''
            },
            data_grouping: [],
            get_jenis_item: [],
            kategories: [],
            satuan_data: [],
            potong_stock: [
                { name: 'YA', code: 1 },
                { name: 'TIDAK', code: 0 }
            ],
            untuk_dijual: [
                { name: 'YA', code: 1 },
                { name: 'TIDAK', code: 0 }
            ],
            bentuk_obat_options: [
                { name: 'KRIM/SALAP', code: 'BS030' },
                { name: 'KAPSUL', code: 'BS019' },
                { name: 'LARUTAN INJEKSI', code: 'BS034' }
            ],
            isLoading: false,
            fullPage: true,
            isKategoriObat: false,
            kategori_obat_keywords: ['obat', 'obat-obatan', 'BMHP']
        };
    },
    created() {
        this.loadInitialData();
    },
    methods: {
        loadInitialData() {
            this.get_kategori();
            this.get_satuan();
            this.get_grouping();
            this.get_jenis();
        },
        async get_kategori() {
            this.isLoading = true;
            try {
                const response = await axios.post('/getdata_kategori', '');
                this.kategories = response.data.response || [];
            } catch (error) {
                console.error('Error loading categories:', error);
                this.open('error', 'Gagal memuat data kategori');
            } finally {
                this.isLoading = false;
            }
        },
        async get_satuan() {
            this.isLoading = true;
            try {
                const response = await axios.post('/getdata_satuan_v2', '');
                this.satuan_data = response.data.response || [];
            } catch (error) {
                console.error('Error loading units:', error);
                this.open('error', 'Gagal memuat data satuan');
            } finally {
                this.isLoading = false;
            }
        },
        async get_grouping() {
            this.isLoading = true;
            try {
                const response = await axios.post('/getdata_grouping', '');
                this.data_grouping = response.data.response || [];
            } catch (error) {
                console.error('Error loading grouping:', error);
                this.open('error', 'Gagal memuat data grouping');
            } finally {
                this.isLoading = false;
            }
        },
        async get_jenis() {
            this.isLoading = true;
            try {
                const response = await axios.post('/get_jenis', '');
                this.get_jenis_item = response.data.response || [];
            } catch (error) {
                console.error('Error loading types:', error);
                this.open('error', 'Gagal memuat data jenis');
            } finally {
                this.isLoading = false;
            }
        },
        onKategoriChange() {
            // Cek apakah kategori yang dipilih adalah obat atau BMHP
            if (this.form.kategori_selected && this.form.kategori_selected.NAMA_KATEGORI) {
                const kategoriName = this.form.kategori_selected.NAMA_KATEGORI.toLowerCase();
                this.isKategoriObat = this.kategori_obat_keywords.some(keyword => 
                    kategoriName.includes(keyword)
                );
            } else {
                this.isKategoriObat = false;
            }

            // Reset bentuk_obat jika kategori tidak termasuk obat
            if (!this.isKategoriObat) {
                this.form.bentuk_obat = '';
            }
        },
        async simpan_new_item() { 

            this.isLoading = true;
            try {
                const response = await axios.post('/insert_itembarang', this.form);
 
                
                if (response.data.metadata && response.data.metadata.code === 200) {
                    this.open('success', `${response.data.metadata.message}, barcode: ${response.data.metadata.data}`);
                    this.resetForm();
                } else {
                    this.open('warning', response.data.metadata?.message || 'Gagal menyimpan data');
                }
            } catch (error) {
                console.error('Error saving item:', error);
                this.open('error', 'Terjadi kesalahan saat menyimpan data');
            } finally {
                this.isLoading = false;
            }
        },
        arsipkan() {
            this.open('info', 'Fitur arsipkan sedang dalam pengembangan');
        },
        resetForm() {
            this.form = {
                NAMA: '',
                KANDUNGAN: 0,
                data_grouping: '',
                grouping2: '',
                potong_stock: { name: 'YA', code: 1 },
                kategori_selected: '',
                satuan_selected: '',
                stock_min: 0,
                untuk_dijual: { name: 'YA', code: 1 },
                jenis: '',
                JASA_PELAYANAN: 0,
                bentuk_obat: ''
            };
            this.isKategoriObat = false;
        },
        validateForm() {
            const isValid = this.form.NAMA && this.form.data_grouping && this.form.jenis && 
                   this.form.kategori_selected && this.form.satuan_selected;
            
            // Jika kategori adalah obat, bentuk_obat harus diisi
           

            return isValid;
        },
        open(type, message) {
            const typeMap = {
                'success': 'success',
                'warning': 'warning',
                'error': 'danger',
                'info': 'info'
            };

            this.$toast.open({
                message: message,
                position: 'top-right',
                type: typeMap[type] || 'info',
                duration: 5000,
                dismissible: true
            });
        }
    }
};
</script>

<style scoped>
.w-100 {
    width: 100%;
}

.d-block {
    display: block;
}

.mt-2 {
    margin-top: 0.5rem;
}

.text-danger {
    color: #dc3545;
}

.text-muted {
    color: #6c757d;
}

.bg-light {
    background-color: #f8f9fa;
}

.card-header.with-border {
    border-bottom: 1px solid #dee2e6;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
}

:deep(.p-dropdown) {
    width: 100%;
}

:deep(.p-inputtext) {
    width: 100%;
    padding: 0.5rem;
}

:deep(.p-inputnumber) {
    width: 100%;
}
</style>