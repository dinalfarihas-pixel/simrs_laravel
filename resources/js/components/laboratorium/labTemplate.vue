<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <!-- Data Table Card -->
            <div class="card shadow-sm">
                <div class="card-header bg-light border-bottom">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="card-title mb-0">
                            <i class="fas fa-flask me-2"></i>
                            Master Data Item Laboratorium
                        </h3>
                        <div class="d-flex gap-2 align-items-center">

                            <span class="badge bg-secondary">
                                Total: {{ dataLab.length }} item
                            </span>
                            <span class="badge bg-secondary">
                                Kategori: {{ uniqueCategories }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Search and Actions -->
                <div class="card-body border-bottom">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="fas fa-search"></i>
                                </span>
                                <input type="text" class="form-control" placeholder="Cari item atau kategori..."
                                    v-model="searchTerm">
                            </div>
                        </div>
                        <div class="col-md-6 text-end">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-secondary" @click="exportData">
                                    <i class="fas fa-download me-1"></i>
                                    Export
                                </button>
                                <button type="button" class="btn btn-outline-secondary" @click="printData">
                                    <i class="fas fa-print me-1"></i>
                                    Print
                                </button>
                                <Button label="Add/Edit" class="btn ml-2" @click="addNewItem" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="table-responsive" style="max-height: 600px;">
                    <table class="table table-bordered table-hover mb-0">
                        <thead class="bg-light sticky-top">
                            <tr>
                                <th class="text-center" style="width: 60px;">No</th>
                                <th style="width: 180px;">
                                    <i class="fas fa-tags me-1"></i>
                                    Kategori
                                </th>
                                <th style="width: 180px;">
                                    <i class="fas fa-tags me-1"></i>
                                    Kode Loinc
                                </th>
                                <th style="width: 280px;">
                                    <i class="fas fa-list me-1"></i>
                                    Item Pemeriksaan
                                </th>
                                <th style="width: 120px;">
                                    <i class="fas fa-chart-line me-1"></i>
                                    Hasil Normal
                                </th>
                                <th style="width: 80px;">
                                    <i class="fas fa-ruler me-1"></i>
                                    Satuan
                                </th>
                                <th style="width: 150px;">
                                    <i class="fas fa-book me-1"></i>
                                    Rujukan
                                </th>
                                <th class="text-center" style="width: 120px;">
                                    <i class="fas fa-cog me-1"></i>
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredDataLab.length === 0">
                                <td colspan="7" class="text-center text-muted py-4">
                                    <i class="fas fa-search fa-2x mb-2"></i>
                                    <div>Tidak ada data yang ditemukan</div>
                                    <div>Coba ubah kata kunci pencarian</div>
                                </td>
                            </tr>
                            <tr v-for="(row, index) in filteredDataLab" :key="row.ID">
                                <td class="text-center">{{ index + 1 }}</td>
                                <td v-if="shouldShowCategory(index)" :rowspan="getCategoryRowspan(index)"
                                    class="category-cell">
                                    <div class="category-content">
                                        <i class="fas fa-folder me-2"></i>
                                        {{ row.KATEGORI }}
                                    </div>
                                </td>
                                <td>{{ row.KODE_LOINC }}</td>
                                <td>{{ row.ITEM }}</td>
                                <td class="text-center">{{ row.HASIL_NORMAL || '-' }}</td>
                                <td class="text-center">{{ row.SATUAN || '-' }}</td>
                                <td>{{ row.RUJUKAN || '-' }}</td>
                                <td class="text-center">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-sm btn-outline-primary"
                                            @click="editItem(row)" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger"
                                            @click="confirmDelete(row)" title="Hapus">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Footer -->
                <div class="card-footer bg-light">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="text-muted">
                                <i class="fas fa-info-circle me-1"></i>
                                Menampilkan {{ filteredDataLab.length }} dari {{ dataLab.length }} item
                            </div>
                        </div>
                        <div class="col-md-6 text-end">
                            <div class="text-muted">
                                <i class="fas fa-clock me-1"></i>
                                Terakhir diperbarui: {{ lastUpdated }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Dialog -->
        <Dialog v-model:visible="addEditItemLab" :modal="true" :closable="true"
            :containerStyle="{ width: '95vw', maxWidth: '800px' }" class="detail-dialog">

            <template #header>
                <div class="dialog-header">
                    <div class="header-info">
                        <div>
                            <h4 class="dialog-title">
                                <i class="fas fa-flask me-2"></i>
                                {{ isEditMode ? 'Edit Item Laboratorium' : 'Tambah Item Laboratorium' }}
                            </h4>
                            <p class="dialog-subtitle mb-0">
                                {{ isEditMode ? 'Ubah data item laboratorium' : 'Masukkan data item laboratorium baru' }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            <div class="dialog-content">
                <form @submit.prevent="submitForm">
                    <div class="row">
                        <!-- Kategori -->
                        <div class="col-md-6 mb-3">
                            <label for="kategori" class="form-label">
                                <i class="fas fa-tags me-1"></i>
                                Kategori <span class="text-danger">*</span>
                            </label>

                            <Select
                                v-model="formData.kategori"
                                :options="kategoriLab"
                                optionLabel="KATEGORI"
                                placeholder="Pilih atau ketik kategori"
                                :filter="true"
                                :showClear="true"
                                class="w-100"
                                :class="{ 'p-invalid': errors.kategori }"
                            />
                            <small v-if="errors.kategori" class="text-danger">{{ errors.kategori }}</small>
                        </div>

                        <!-- Sub Kategori -->
                        <div class="col-md-6 mb-3">
                            <label for="subKategori" class="form-label">
                                <i class="fas fa-tag me-1"></i>
                                Sub Kategori
                            </label>
                            <InputText
                                v-model="formData.subKategori"
                                placeholder="Masukkan sub kategori (opsional)"
                                class="w-100"
                            />
                        </div>

                        <!-- Kode LOINC -->
                        <div class="col-md-6 mb-3">
                            <label for="kodeLoinc" class="form-label">
                                <i class="fas fa-barcode me-1"></i>
                                Kode LOINC <span class="text-danger">*</span>
                            </label>
                            <InputText
                                v-model="formData.kodeLoinc"
                                placeholder="Masukkan kode LOINC"
                                class="w-100"
                                :class="{ 'p-invalid': errors.kodeLoinc }"
                            />
                            <small v-if="errors.kodeLoinc" class="text-danger">{{ errors.kodeLoinc }}</small>
                        </div>

                        <!-- Item Pemeriksaan -->
                        <div class="col-12 mb-3">
                            <label for="item" class="form-label">
                                <i class="fas fa-list me-1"></i>
                                Item Pemeriksaan <span class="text-danger">*</span>
                            </label>
                            <InputText
                                v-model="formData.item"
                                placeholder="Masukkan nama item pemeriksaan"
                                class="w-100"
                                :class="{ 'p-invalid': errors.item }"
                            />
                            <small v-if="errors.item" class="text-danger">{{ errors.item }}</small>
                        </div>

                        <!-- Hasil Normal -->
                        <div class="col-md-6 mb-3">
                            <label for="hasilNormal" class="form-label">
                                <i class="fas fa-chart-line me-1"></i>
                                Hasil Normal
                            </label>
                            <InputText
                                v-model="formData.hasilNormal"
                                placeholder="Masukkan hasil normal"
                                class="w-100"
                            />
                        </div>

                        <!-- Satuan -->
                        <div class="col-md-6 mb-3">
                            <label for="satuan" class="form-label">
                                <i class="fas fa-ruler me-1"></i>
                                Satuan
                            </label>
                            <Select
                                v-model="formData.satuan"
                                :options="satuanList"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Pilih atau ketik satuan"
                                :showClear="true"
                                :editable="true"
                                class="w-100"
                            />
                        </div>

                        <!-- Rujukan -->
                        <div class="col-12 mb-3">
                            <label for="rujukan" class="form-label">
                                <i class="fas fa-book me-1"></i>
                                Rujukan
                            </label>
                            <Textarea
                                v-model="formData.rujukan"
                                placeholder="Masukkan rujukan atau referensi"
                                class="w-100"
                                :rows="3"
                            />
                        </div>

                        <!-- Status -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label">
                                <i class="fas fa-toggle-on me-1"></i>
                                Status
                            </label>
                            <div class="form-check">
                                <InputSwitch v-model="formData.isActive" />
                                <label class="form-check-label ms-2">
                                    {{ formData.isActive ? 'Aktif' : 'Nonaktif' }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                        <Button
                            label="Batal"
                            icon="fas fa-times"
                            class="p-button-secondary"
                            @click="closeDialog"
                        />
                        <Button
                            :label="isEditMode ? 'Update' : 'Simpan'"
                            :icon="isEditMode ? 'fas fa-save' : 'fas fa-plus'"
                            class="p-button-primary"
                            type="submit"
                            :loading="isSubmitting"
                        />
                    </div>
                </form>
            </div>
        </Dialog>
        <ConfirmDialog />
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import Textarea from 'primevue/textarea';
    import InputSwitch from 'primevue/inputswitch';
    import ConfirmDialog from 'primevue/confirmdialog'

    export default {
        name: 'TabelLab',
        components: {
            Loading,
            Dialog,
            Button,
            InputText,
            Dropdown,
            Textarea,
            InputSwitch,
            ConfirmDialog
        },
        data() {
            return {
                form: {
                    startdate: '',
                    enddate: '',
                },
                addEditItemLab: false,
                isLoading: false,
                fullPage: true,
                dataLab: [],
                searchTerm: '',
                lastUpdated: '',
                isEditMode: false,
                isSubmitting: false,
                currentEditItem: null,
                kategoriLab:[],
                formData: {
                    kategori: {
                        KATEGORI:'',
                    },
                    kodeLoinc: '',
                    item: '',
                    hasilNormal: '',
                    satuan: '',
                    rujukan: '',
                    isActive: true
                },
                errors: {},
                satuanList: [
                    { label: 'mg/dL', value: 'mg/dL' },
                    { label: 'g/dL', value: 'g/dL' },
                    { label: 'mL', value: 'mL' },
                    { label: 'L', value: 'L' },
                    { label: 'mmol/L', value: 'mmol/L' },
                    { label: 'µ/L', value: 'U/L' },
                    { label: 'Iµ/L', value: 'IU/L' },
                    { label: 'ng/mL', value: 'ng/mL' },
                    { label: 'pg/mL', value: 'pg/mL' },
                    { label: 'µg/mL', value: 'µg/mL' },
                    { label: 'cells/µL', value: 'cells/µL' },
                    { label: '%', value: '%' },
                    { label: 'Negative', value: 'Negative' }
                ]
            };
        },
        watch: {
            'formData.kategori'(val) {
                // Auto-set subKategori = kategori jika subKategori masih kosong
                if (!this.formData.subKategori) {
                    const label = val?.KATEGORI || val || '';
                    this.formData.subKategori = label;
                }
            }
        },
        computed: {
            filteredDataLab() {
                if (!this.searchTerm) return this.dataLab;

                return this.dataLab.filter(item =>
                    item.KATEGORI?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    item.ITEM?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    item.HASIL_NORMAL?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    item.SATUAN?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    item.RUJUKAN?.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            },
            uniqueCategories() {
                const categories = [...new Set(this.dataLab.map(item => item.KATEGORI))];
                return categories.length;
            }
        },
        created() {
            this.fetchData();
            this.get_kategori_lab();

        },
        methods: {
            async fetchData() {
                this.isLoading = true;
                try {
                    const response = await axios.get('/get_template_lab');
                    console.log(response.data);
                    this.dataLab = response.data.response || [];
                    this.lastUpdated = new Date().toLocaleString('id-ID');
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memuat data');
                } finally {
                    this.isLoading = false;
                }
            },

            async get_kategori_lab()
            {
                    this.isLoading = true;
                try {
                    const response = await axios.get('/get_kategori_lab');
                    console.log(response.data);
                    this.kategoriLab = response.data.response || [];
                } catch (error) {
                    console.log(error);
                    this.open('error', 'Gagal memuat data');
                } finally {
                    this.isLoading = false;
                }
            },
            shouldShowCategory(index) {
                if (index === 0) return true;
                return this.filteredDataLab[index].KATEGORI !== this.filteredDataLab[index - 1].KATEGORI;
            },

            confirmDelete(data) {
                this.$confirm.require({
                    message: `Apakah Anda yakin ingin menghapus item "${data.ITEM}" ini?`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => {

                        this.deleteitemTemplate(data)
                    //this.showMessage('success', 'Berhasil', 'Barang berhasil dihapus')
                    }
                })
            },

            getCategoryRowspan(index) {
                let count = 1;
                const currentCategory = this.filteredDataLab[index].KATEGORI;

                for (let i = index + 1; i < this.filteredDataLab.length; i++) {
                    if (this.filteredDataLab[i].KATEGORI === currentCategory) {
                        count++;
                    } else {
                        break;
                    }
                }

                return count;
            },

            exportData() {
                this.open('info', 'Fitur export akan segera tersedia');
            },

            printData() {
                window.print();
            },

            addNewItem() {
                this.isEditMode = false;
                this.currentEditItem = null;
                this.resetForm();
                this.addEditItemLab = true;
            },

            editItem(item) {
                this.isEditMode = true;
                this.currentEditItem = item;
                this.formData = {
                    kategori: {
                       KATEGORI: item.KATEGORI
                    },
                    subKategori: item.SUB_KATEGORI || '',
                    kodeLoinc: item.KODE_LOINC || '',
                    item: item.ITEM || '',
                    hasilNormal: item.HASIL_NORMAL || '',
                    satuan: item.SATUAN || '',
                    rujukan: item.RUJUKAN || '',
                    isActive: item.STATUS !== 'nonaktif'
                };
                this.errors = {};
                this.addEditItemLab = true;

                console.log('teste',this.formData)
            },

            deleteItem(item) {
                if (confirm(`Apakah Anda yakin ingin menghapus item "${item.ITEM}"?`)) {
                    console.log('Delete item:', item);
                    this.open('success', `Item "${item.ITEM}" berhasil dihapus`);
                    // Call delete API here
                }
            },

            resetForm() {
                this.formData = {
                    kategori: '',
                    subKategori: '',
                    kodeLoinc: '',
                    item: '',
                    hasilNormal: '',
                    satuan: '',
                    rujukan: '',
                    isActive: true
                };
                this.errors = {};
            },

            validateForm() {
                this.errors = {};

                if (!this.formData.kategori) {
                    this.errors.kategori = 'Kategori wajib diisi';
                }

                if (!this.formData.kodeLoinc) {
                    this.errors.kodeLoinc = 'Kode LOINC wajib diisi';
                }

                if (!this.formData.item) {
                    this.errors.item = 'Item pemeriksaan wajib diisi';
                }

                return Object.keys(this.errors).length === 0;
            },

            async deleteitemTemplate(data)
            {

                 try {
                    const payload = {
                        ID: data.ID,
                    };

                    // Update existing item
                    const response = await axios.post('/deleted_item_template', payload);
                    console.log(response.data)
                    if(response.data.metadata.code==200)
                    {
                        this.open('success', 'Data berhasil diperbarui');
                        this.closeDialog();
                        this.fetchData(); // Refresh data
                    }
                    else
                    {
                        this.open('warning', response.data.metadata.message);
                    }

                } catch (error) {
                    console.error('Error submitting form:', error);
                    this.open('error', 'Terjadi kesalahan saat menyimpan data');
                } finally {
                    this.isSubmitting = false;
                }
            },

            async submitForm() {
                if (!this.validateForm()) {
                    this.open('error', 'Mohon lengkapi semua field yang wajib diisi');
                    return;
                }

                this.isSubmitting = true;

                try {
                    const payload = {
                        KATEGORI: this.formData.kategori,
                        SUB_KATEGORI: this.formData.subKategori || '',
                        KODE_LOINC: this.formData.kodeLoinc,
                        ITEM: this.formData.item,
                        HASIL_NORMAL: this.formData.hasilNormal,
                        SATUAN: this.formData.satuan,
                        RUJUKAN: this.formData.rujukan,
                        STATUS: this.formData.isActive ? 'aktif' : 'nonaktif'
                    };

                    if (this.isEditMode) {
                        // Update existing item
                        payload.ID = this.currentEditItem.ID;
                        const response = await axios.post('/update_template_lab', payload);
                        console.log(response.data)
                        this.open('success', 'Data berhasil diperbarui');
                    } else {
                        // Add new item
                        const response = await axios.post('/add_template_lab', payload);
                        console.log(response.data)
                        this.open('success', 'Data berhasil ditambahkan');
                    }

                    this.closeDialog();
                    this.fetchData(); // Refresh data

                } catch (error) {
                    console.error('Error submitting form:', error);
                    this.open('error', 'Terjadi kesalahan saat menyimpan data');
                } finally {
                    this.isSubmitting = false;
                }
            },

            closeDialog() {
                this.addEditItemLab = false;
                this.resetForm();
                this.isEditMode = false;
                this.currentEditItem = null;
            },

            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                });
            }
        }
    };

</script>

 <style scoped>
    .table {
        font-size: 1rem;
    }

    .table th,
    .table td {
        vertical-align: middle;
        padding: 0.75rem;
        border: 1px solid #dee2e6;
    }

    .table thead th {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-bottom: 2px solid #dee2e6;
        font-weight: 600;
        color: #495057;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .sticky-top {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .category-cell {
        background: linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%);
        border-right: 2px solid #6c757d;
        vertical-align: middle;
        text-align: center;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .category-content {
        font-weight: 600;
        color: #495057;
        padding: 8px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .table-responsive {
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .input-group-text {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-color: #ced4da;
        color: #6c757d;
    }

    .btn-group .btn {
        border-radius: 4px;
    }

    .badge {
        font-size: 0.875rem;
        padding: 0.375rem 0.75rem;
    }

    .bg-secondary {
        background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%) !important;
    }

    .card {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: none;
    }

    .card-header {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-bottom: 1px solid #dee2e6;
    }

    .card-body {
        background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
    }

    .card-footer {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-top: 1px solid #dee2e6;
        padding: 1rem 1.5rem;
    }

    /* Button Gradients */
    .btn-outline-secondary {
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-color: #6c757d;
        color: #6c757d;
        transition: all 0.3s ease;
    }

    .btn-outline-secondary:hover {
        background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
        border-color: #5a6268;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .btn-outline-primary {
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-color: #007bff;
        color: #007bff;
        transition: all 0.3s ease;
    }

    .btn-outline-primary:hover {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        border-color: #0056b3;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
    }

    .btn-outline-danger {
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-color: #dc3545;
        color: #dc3545;
        transition: all 0.3s ease;
    }

    .btn-outline-danger:hover {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        border-color: #c82333;
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
    }

    /* Table Row Hover Effect */
    .table tbody tr {
        transition: all 0.3s ease;
    }

    .table tbody tr:hover {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Dialog Styles */
    .dialog-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #dee2e6;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .dialog-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #495057;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .dialog-subtitle {
        color: #6c757d;
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }

    .dialog-content {
        padding: 1.5rem;
        background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
    }

    .form-label {
        font-weight: 600;
        color: #495057;
        margin-bottom: 0.5rem;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .text-danger {
        color: #dc3545 !important;
    }

    .p-invalid {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    .form-check {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
    }

    /* Primary Button Gradients */
    .p-button-primary {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        border-color: #007bff;
        transition: all 0.3s ease;
    }

    .p-button-primary:hover {
        background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
        border-color: #004085;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
    }

    .p-button-secondary {
        background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
        border-color: #6c757d;
        transition: all 0.3s ease;
    }

    .p-button-secondary:hover {
        background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
        border-color: #495057;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
    }

    /* Loading Overlay */
    .loading-overlay {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
    }

    /* Search Input */
    .form-control {
        transition: all 0.3s ease;
    }

    .form-control:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    /* Dropdown and Input Enhancements */
    .p-dropdown,
    .p-inputtext,
    .p-inputtextarea {
        transition: all 0.3s ease;
    }

    .p-dropdown:hover,
    .p-inputtext:hover,
    .p-inputtextarea:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .card-body {
            padding: 1rem;
        }

        .table-responsive {
            max-height: 400px;
        }

        .category-content {
            padding: 4px 8px;
            font-size: 0.9rem;
        }

        .dialog-content {
            padding: 1rem;
        }
    }

    /* Print styles */
    @media print {

        .card-header,
        .card-body:first-child,
        .card-footer {
            display: none !important;
        }

        .table {
            font-size: 0.9rem;
        }

        .category-cell {
            background: #f8f9fa !important;
        }
    }

    /* Additional Animation Effects */
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    /* Icon Enhancements */
    .fas {
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
    }

    /* Empty State Styling */
    .table tbody tr td {
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    }

    /* Border Radius Enhancements */
    .btn {
        border-radius: 6px;
    }

    .form-control,
    .p-dropdown,
    .p-inputtext,
    .p-inputtextarea {
        border-radius: 6px;
    }
</style>
