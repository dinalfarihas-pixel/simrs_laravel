<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage" />

            <!-- Header Card -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Penerimaan</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label for="no_faktur">No. Faktur *</label>
                                <InputText id="no_faktur" v-model="form.no_faktur" type="text" style="width: 100%"
                                    placeholder="Masukkan nomor faktur" :class="{ 'p-invalid': errors.no_faktur }" />
                                <small v-if="errors.no_faktur" class="p-error">{{ errors.no_faktur }}</small>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label for="riwayat">Riwayat Penerimaan</label>
                                <Button label="Pilih Penerimaan" class="p-button" icon="pi pi-search"
                                    @click="showRiwayat=true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Items List Card -->
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3 class="card-title">Daftar Barang</h3>
                    <div class="card-tools">
                        <Button label="Pilih Barang" class="p-button p-button-success" icon="pi pi-plus"
                            @click="openItemSelection" />
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="form.item_selected.length === 0" class="text-center py-4">
                        <i class="pi pi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                        <p class="mt-2 text-muted">Belum ada barang yang dipilih</p>
                    </div>
                    <div v-else class="table-responsive" style="max-height: 500px; overflow-y: auto;">
                        <table class="table table-striped table-sm table-bordered">
                            <thead class="thead-light" style="position: sticky; top: 0; z-index: 1;">
                                <tr>
                                    <th style="width: 50px;">Aksi</th>
                                    <th style="width: 50px;">No</th>
                                    <th>Barcode</th>
                                    <th>Nama Barang</th>
                                    <th style="width: 120px;">Harga Satuan</th>
                                    <th style="width: 80px;">Qty</th>
                                    <th style="width: 80px;">Satuan</th>
                                    <th style="width: 120px;">Subtotal</th>
                                    <th style="width: 80px;">Markup (%)</th>
                                    <th style="width: 120px;">Harga Jual</th>
                                    <th style="width: 120px;">Expired</th>
                                    <th style="width: 100px;">Batch</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item, index) in form.item_selected" :key="item.BARCODE + index">
                                    <td class="text-center">
                                        <Button icon="pi pi-trash" @click="confirmDelete(index)"
                                            class="p-button-rounded p-button-danger p-button-text p-button-sm"
                                            :title="'Hapus item'" />
                                    </td>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.BARCODE }}</td>
                                    <td>
                                        <div class="font-weight-bold">{{ item.NAMA }}</div>
                                        <small class="text-muted">{{ item.SATUAN }}</small>
                                    </td>
                                    <td>
                                        <InputNumber v-model="item.HARGA"   :minFractionDigits="2" :maxFractionDigits="2"
                                            style="text-align: right; width: 100%;" locale="id-ID"
                                            @update:modelValue="calculateItemTotal(index)"
                                            :class="{ 'p-invalid': errors[`item_${index}_harga`] }" />
                                    </td>
                                    <td>
                                        <InputNumber v-model="form.qty_selected[index]" :minFractionDigits="0" :maxFractionDigits="0"
                                            style="text-align: right; width: 100%;" @update:modelValue="updateItemQty(index)"
                                            :class="{ 'p-invalid': errors[`item_${index}_qty`] }" />
                                    </td>
                                    <td>{{ item.SATUAN }}</td>
                                    <td>
                                        <InputNumber v-model="item.TOTALAMOUNT"
                                            :minFractionDigits="2" :maxFractionDigits="2" locale="id-ID" style="text-align: right; width: 100%;" :readonly="true"
                                            class="readonly-input" />
                                    </td>
                                    <td>
                                        <InputNumber v-model="item.UP_PERSEN" :minFractionDigits="0" :maxFractionDigits="0"
                                            style="text-align: right; width: 100%;"
                                            @update:modelValue="calculateSellingPrice(index)" />
                                    </td>
                                    <td>
                                        <InputNumber v-model="item.HARGAJUAL"
                                            :minFractionDigits="2" :maxFractionDigits="2" locale="id-ID" style="text-align: right; width: 100%;" :readonly="true"
                                            class="readonly-input" />
                                    </td>
                                    <td>
                                        <Calendar v-model="item.EXP" dateFormat="dd/mm/yy" :showIcon="true"
                                            :yearNavigator="true" yearRange="2000:2030" placeholder="DD/MM/YYYY"
                                            style="width: 100%;" appendTo="body" />
                                    </td>
                                    <td>
                                        <InputText v-model="item.BATCH" type="text" style="width: 100%;"
                                            placeholder="Batch" />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="form.item_selected.length > 0">
                                <tr class="font-weight-bold">
                                    <td colspan="7" class="text-right">Total:</td>
                                    <td>
                                        <InputNumber v-model="form.totalamount" prefix="Rp. "
                                            :minFractionDigits="2" :maxFractionDigits="2" locale="id-ID" style="text-align: right; width: 100%;" :readonly="true"
                                            class="readonly-input font-weight-bold" />
                                    </td>
                                    <td colspan="4"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <Button label="Proses Penerimaan" @click="validateAndProcess" class="p-button p-button-primary"
                        icon="pi pi-check" :disabled="form.item_selected.length === 0" />
                </div>
            </div>
        </div>

        <!-- Item Selection Dialog -->
        <Dialog header="Pilih Barang" v-model:visible="displayItemSelection" :style="{ width: '80vw' }" :modal="true"
            :maximizable="true">
            <div class="mb-3">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="searchQuery" type="text" placeholder="Cari barang (min 3 karakter)..."
                        style="width: 100%;" @input="debouncedSearch" ref="searchInput" />
                </span>
            </div>

            <div class="table-responsive" style="max-height: 400px;">
                <table class="table table-sm table-bordered table-striped">
                    <thead class="thead-light">
                        <tr>
                            <th>No</th>
                            <th>Sub Barcode</th>
                            <th>Barcode</th>
                            <th>Nama Barang</th>
                            <th>Harga Jual</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isSearching">
                            <td colspan="7" class="text-center">
                                <i class="pi pi-spin pi-spinner"></i> Mencari...
                            </td>
                        </tr>
                        <tr v-else-if="searchResults.length === 0 && searchQuery.length >= 3">
                            <td colspan="7" class="text-center text-muted">
                                Tidak ada barang yang ditemukan
                            </td>
                        </tr>
                        <tr v-else-if="searchResults.length === 0">
                            <td colspan="7" class="text-center text-muted">
                                Masukkan kata kunci pencarian (minimal 3 karakter)
                            </td>
                        </tr>
                        <tr v-else v-for="(item, index) in searchResults" :key="item.BARCODE">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.SUB_BARCODE }}</td>
                            <td>{{ item.BARCODE }}</td>
                            <td>
                                <div class="font-weight-bold">{{ item.NAMA }}</div>
                                <small class="text-muted">{{ item.GROUPING }}</small>
                                <Tag v-if="item.ARSIPKAN == '1'" value="Non aktiv" severity="warning"
                                    icon="pi pi-times-circle">
                                </Tag>

                            </td>
                            <td>{{ formatCurrency(item.HARGAJUAL) }}</td>
                            <td>{{ item.QUNATITY }}</td>
                            <td>
                                <Button icon="pi pi-plus" @click="addItemToList(item)"
                                    class="p-button-sm p-button-success" :disabled="isItemAlreadyAdded(item.BARCODE)"
                                    :title="isItemAlreadyAdded(item.BARCODE) ? 'Barang sudah ditambahkan' : 'Tambah barang'" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="displayItemSelection = false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- History Dialog -->
        <Dialog header="Finalisasi Penerimaan Barang" v-model:visible="showFinalizationDialog"
            :containerStyle="{ width: '50vw', maxWidth: '800px', minWidth: '600px' }" :modal="true" :closable="false"
            class="receipt-dialog">
            <Message severity="warn" :closable="false" class="mb-4">
                <i class="pi pi-exclamation-triangle mr-2"></i>
                Mohon periksa kembali data sebelum menyimpan
            </Message>

            <div class="form-container">
                <!-- Total Amount Card -->
                <div class="total-card mb-4">
                    <div class="total-header">
                        <i class="pi pi-dollar text-primary"></i>
                        <span class="total-label">Total Penerimaan</span>
                    </div>
                    <div class="total-amount">{{ formatCurrency(form.totalamount) }}</div>
                </div>

                <!-- Form Fields -->
                <div class="form-grid">
                    <!-- Invoice Number -->
                    <div class="form-field">
                        <label for="final_no_faktur" class="field-label required">
                            <i class="pi pi-file-edit mr-2"></i>
                            No. Faktur
                        </label>
                        <InputText id="final_no_faktur" v-model="form.no_faktur" type="text"
                            placeholder="Masukkan nomor faktur" :class="{ 'p-invalid': errors.no_faktur }" />
                        <small v-if="errors.no_faktur" class="p-error">{{ errors.no_faktur }}</small>
                    </div>

                    <!-- Supplier -->
                    <div class="form-field">
                        <label for="supplier" class="field-label required">
                            <i class="pi pi-building mr-2"></i>
                            Supplier
                        </label>
                        <Select id="supplier" v-model="form.supplier_selected" :options="data_supplier"
                            optionLabel="NAMASUPLIER" :filter="true" placeholder="Pilih supplier" class="field-input"
                            :class="{ 'p-invalid': errors.supplier }" />
                        <small v-if="errors.supplier" class="p-error">{{ errors.supplier }}</small>
                    </div>

                    <!-- Date Fields Row -->
                    <div class="date-fields-row">
                        <div class="form-field">
                            <label for="tgl_penerimaan" class="field-label required">
                                <i class="pi pi-calendar mr-2"></i>
                                Tanggal Penerimaan
                            </label>
                            <Calendar id="tgl_penerimaan" v-model="form.tgl_penerimaan" dateFormat="dd/mm/yy"
                                :showIcon="true" :yearNavigator="true" yearRange="2000:2030" placeholder="DD/MM/YYYY"
                                :class="{ 'p-invalid': errors.tgl_penerimaan }" />
                            <small v-if="errors.tgl_penerimaan" class="p-error">{{ errors.tgl_penerimaan }}</small>
                        </div>

                        <div class="form-field">
                            <label for="tgl_faktur" class="field-label required">
                                <i class="pi pi-calendar-plus mr-2"></i>
                                Tanggal Faktur
                            </label>
                            <Calendar id="tgl_faktur" v-model="form.tgl_faktur" dateFormat="dd/mm/yy" :showIcon="true"
                                :yearNavigator="true" yearRange="2000:2030" placeholder="DD/MM/YYYY"
                                :class="{ 'p-invalid': errors.tgl_faktur }" />
                            <small v-if="errors.tgl_faktur" class="p-error">{{ errors.tgl_faktur }}</small>
                        </div>
                    </div>

                    <!-- Due Date -->
                    <div class="form-field">
                        <label for="tgl_jatuh_tempo" class="field-label">
                            <i class="pi pi-calendar-times mr-2"></i>
                            Jatuh Tempo
                        </label>
                        <Calendar id="tgl_jatuh_tempo" v-model="form.tgl_jatuh_tempo" dateFormat="dd/mm/yy"
                            :showIcon="true" :yearNavigator="true" yearRange="2000:2030" placeholder="DD/MM/YYYY" />
                    </div>

                    <!-- File Upload -->
                    <div class="form-field">
                        <label for="attachment" class="field-label">
                            <i class="pi pi-paperclip mr-2"></i>
                            Lampiran
                        </label>
                        <div class="file-upload-container">
                            <div class="file-input-wrapper">
                                <input type="file" class="file-input" id="attachment" accept="image/*"
                                    @change="onFileChange" />
                                <label class="file-input-label" for="attachment">
                                    <i class="pi pi-upload mr-2"></i>
                                    <span>{{ form.file_attch ? form.file_attch.name : 'Pilih file gambar...' }}</span>
                                </label>
                            </div>
                            <small class="file-size-info">{{ file_size }}</small>
                        </div>

                        <!-- Image Preview -->
                        <div v-if="imagePreview" class="image-preview-section">
                            <div class="preview-container">
                                <img :src="imagePreview" alt="Preview" class="preview-image"
                                    @click="showImageModal = true" />
                                <div class="preview-overlay" @click="showImageModal = true">
                                    <i class="pi pi-search-plus"></i>
                                </div>
                            </div>
                            <small class="preview-hint">Klik gambar untuk memperbesar</small>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <Button label="Batal" icon="pi pi-times" @click="showFinalizationDialog = false"
                        class="p-button-outlined p-button-secondary" />
                    <Button label="Simpan" icon="pi pi-check" @click="saveReceipt" :loading="isLoading"
                        class="p-button-success" />
                </div>
            </template>
        </Dialog>
        <!-- Confirmation Dialogs -->
        <!-- <ConfirmDialog /> -->

        <!-- Image Modal for Preview -->
        <Dialog header="Preview Gambar" v-model:visible="showImageModal" :style="{ width: '50vw' }" :modal="true">
            <div class="text-center">
                <img :src="imagePreview" alt="Preview" style="max-width: 100%; height: auto;" />
            </div>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showImageModal = false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- <Dialog header="Riwayat perencanaan" v-model:visible="showRiwayat" :containerStyle="{width: '80vw'}" :modal="true">

            <sub-list-penerimaan></sub-list-penerimaan>
            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="showRiwayat=false" autofocus />
            </template>
        </Dialog>  -->


        <Dialog header="Riwayat perencanaan" v-model:visible="showRiwayat" :containerStyle="{width: '80vw'}"
            :modal="true">

            <sub-list-penerimaan></sub-list-penerimaan>

            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="showRiwayat=false" autofocus />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay'
    import { debounce } from 'lodash'

    export default {
        name: 'ReceiptManagement',
        components: { Loading },
        props: {
            msg: String
        },
        data() {
            return {
                // Search related
                searchQuery: '',
                searchResults: [],
                isSearching: false,
                // Main form data
                form: {
                    no_faktur: '',
                    tgl_faktur: new Date(),
                    tgl_penerimaan: new Date(),
                    tgl_jatuh_tempo: null,
                    supplier_selected: null,
                    item_selected: [],
                    qty_selected: [],
                    totalamount: 0,
                    file_attch: null
                },

                // UI state
                isLoading: false,
                fullPage: true,
                displayItemSelection: false,
                showFinalizationDialog: false,
                showRiwayat: false,
                showImageModal: false,
                imagePreview: '',
                file_size: '',

                // Data
                data_supplier: [],

                // Validation
                errors: {},

                // Debounced search function
                debouncedSearch: null
            }
        },

        computed: {
            hasItems() {
                return this.form.item_selected.length > 0
            }
        },

        watch: {
            'form.item_selected': {
                handler() {
                    this.calculateGrandTotal()
                },
                deep: true
            }
        },

        created() {
            this.initializeComponent()
            this.debouncedSearch = debounce(this.performSearch, 500)
        },

        methods: {
            async initializeComponent() {
                await this.loadSuppliers()
            },
            getdata_riwayat() {
                this.showRiwayat = true;
            },
            // Data loading methods
            async loadSuppliers() {
                try {
                    this.isLoading = true
                    const response = await axios.post('/get_data_supplier')
                    this.data_supplier = response.data.response
                } catch (error) {
                    console.error('Error loading suppliers:', error)
                    this.showMessage('error', 'Error', 'Gagal memuat data supplier')
                } finally {
                    this.isLoading = false
                }
            },

            // Search methods
            async performSearch() {
                if (this.searchQuery.length < 3) {
                    this.searchResults = []
                    return
                }

                try {
                    this.isSearching = true
                    const response = await axios.post('/getdata_obat_baseparam_v1', {
                        itembarang: this.searchQuery,
                        mode: 10
                    })
                    this.searchResults = response.data.response || []
                } catch (error) {
                    console.error('Error searching items:', error)
                    this.showMessage('error', 'Error', 'Gagal mencari barang')
                } finally {
                    this.isSearching = false
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
            // Item management methods
            openItemSelection() {
                this.displayItemSelection = true
                this.searchQuery = ''
                this.searchResults = []
                this.$nextTick(() => {
                    if (this.$refs.searchInput) {
                        this.$refs.searchInput.$el.focus()
                    }
                })
            },

            isItemAlreadyAdded(barcode) {
                return this.form.item_selected.some(item => item.BARCODE === barcode)
            },

            addItemToList(item) {
                if (this.isItemAlreadyAdded(item.BARCODE)) {
                    this.showMessage('warn', 'Peringatan', 'Barang sudah ditambahkan')
                    return
                }

                if (item.ARSIPKAN == '1') {
                    this.open('warning', 'Item tersebut sudah tidak aktif')
                    return
                }

                const newItem = {
                    BARCODE: item.BARCODE,
                    SUB_BARCODE: item.SUB_BARCODE,
                    NAMA: item.NAMA,
                    SATUAN: item.SATUAN,
                    HARGA: 0,
                    TOTALAMOUNT: 0,
                    UP_PERSEN: 0,
                    HARGAJUAL: 0,
                    BATCH: '',
                    EXP: null,
                    QTY: 0,
                    PERSEDIAAN: item.QUNATITY,
                    JENIS: item.JENIS || '',
                    ID_BARANG: item.BARCODE,
                    DISCOUNT: 0,
                    STATUS_PROGRESS: 'C',
                    OBAT_OBATAN: 1,
                    AS_PARENT: 0,
                    DISC: 0,
                    FLAG: 'NEW_LINE'
                }

                this.form.item_selected.push(newItem)
                this.form.qty_selected.push(0)
                // this.displayItemSelection = false
                this.open('success', 'Barang berhasil ditambahkan')
            },

            confirmDelete(index) {
                // this.$confirm.require({
                //     message: 'Apakah Anda yakin ingin menghapus barang ini?',
                //     header: 'Konfirmasi Hapus',
                //     icon: 'pi pi-exclamation-triangle',
                //     acceptClass: 'p-button-danger',
                //     acceptLabel: 'Ya, Hapus',
                //     rejectLabel: 'Batal',
                //     accept: () => {
                    this.removeItem(index)
                //         this.showMessage('success', 'Berhasil', 'Barang berhasil dihapus')
                //     }
                // })
            },

            removeItem(index) {
                this.form.item_selected.splice(index, 1)
                this.form.qty_selected.splice(index, 1)
                this.calculateGrandTotal()
            },

            // Calculation methods
            updateItemQty(index) {
                const qty = this.form.qty_selected[index] || 0
                this.form.item_selected[index].QTY = qty
                this.calculateItemTotal(index)
            },

            calculateItemTotal(index) {
                const item = this.form.item_selected[index]
                const qty = this.form.qty_selected[index] || 0
                const price = item.HARGA || 0

                item.TOTALAMOUNT = qty * price
                this.calculateSellingPrice(index)
                this.calculateGrandTotal()
            },

            calculateSellingPrice(index) {
                const item = this.form.item_selected[index]
                const markup = item.UP_PERSEN || 0
                const basePrice = item.HARGA || 0

                if (basePrice > 0) {
                    const markupAmount = (basePrice * markup) / 100
                    item.HARGAJUAL = basePrice + markupAmount
                } else {
                    item.HARGAJUAL = 0
                }
            },

            calculateGrandTotal() {
                const total = this.form.item_selected.reduce((sum, item) => {
                    return sum + (item.TOTALAMOUNT || 0)
                }, 0)
                this.form.totalamount = total
            },

            // Validation methods
            validateForm() {
                this.errors = {}

                if (!this.form.no_faktur.trim()) {
                    this.errors.no_faktur = 'Nomor faktur wajib diisi'
                }


                if (this.form.item_selected.length === 0) {
                    this.open('warning', 'Tidak ada barang yang dipilih')
                    return false
                }

                // Validate each item
                for (let i = 0; i < this.form.item_selected.length; i++) {
                    const item = this.form.item_selected[i]
                    const qty = this.form.qty_selected[i]

                    if (!qty || qty <= 0) {
                        this.errors[`item_${i}_qty`] = 'Quantity wajib diisi dan harus lebih dari 0'
                    }

                    if (!item.HARGA || item.HARGA <= 0) {
                        this.errors[`item_${i}_harga`] = 'Harga wajib diisi dan harus lebih dari 0'
                    }

                     if (!item.HARGAJUAL || item.HARGAJUAL <= 0) {
                       item.HARGAJUAL = item.HARGA
                     }

                }

                return Object.keys(this.errors).length === 0
            },

            validateAndProcess() {
                if (this.validateForm()) {
                    this.showFinalizationDialog = true
                } else {
                    // Show validation errors
                    const errorMessages = Object.values(this.errors).join('\n')
                    this.open('error', errorMessages)
                }
            },

            // File handling
            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    const size = file.size / 1000
                    this.file_size = `${file.name} - ${size.toFixed(2)} KB`
                    this.form.file_attch = file

                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.imagePreview = e.target.result
                    }
                    reader.readAsDataURL(file)
                }
            },

            // Save methods
            async saveReceipt() {
                if (!this.validateForm()) {
                    return
                } 


                try {
                    this.isLoading = true


                    if (!this.form.supplier_selected) {
                        this.errors.supplier = 'Supplier wajib dipilih'
                        this.open("warning", this.errors.supplier)
                        return;
                    }


                    if (!this.form.tgl_penerimaan) {
                        this.errors.tgl_penerimaan = 'Tanggal penerimaan wajib diisi'
                        this.open("warning", this.errors.tgl_penerimaan)
                        return;
                    }

                    if (!this.form.tgl_faktur) {
                        this.errors.tgl_faktur = 'Tanggal faktur wajib diisi'
                        this.open("warning", this.errors.tgl_faktur)
                        return;
                    } 

                    const formData = new FormData()

                    if (this.form.file_attch) {
                        formData.append('file_attch', this.form.file_attch)
                    }

                    formData.append('data', JSON.stringify({
                        no_faktur: this.form.no_faktur,
                        tgl_faktur: this.form.tgl_faktur,
                        tgl_penerimaan: this.form.tgl_penerimaan,
                        tgl_jatuh_tempo: this.form.tgl_jatuh_tempo,
                        supplier_selected: this.form.supplier_selected,
                        item_selected: this.form.item_selected,
                        qty_selected: this.form.qty_selected,
                        totalamount: this.form.totalamount,
                    }))

                    const response = await axios.post('/save_penerimaan', formData)

                    if (response.data.code === '200') {
                        this.open('success', response.data.message)
                        this.showFinalizationDialog = false
                        this.resetForm()
                    } else {
                        this.open('warning', response.data.message)
                    }
                } catch (error) {
                    console.error('Error saving receipt:', error)
                    this.showMessage('error', 'Error', 'Gagal menyimpan penerimaan')
                } finally {
                    this.isLoading = false
                }
            },

            // Utility methods
            resetForm() {
                this.form = {
                    no_faktur: '',
                    tgl_faktur: new Date(),
                    tgl_penerimaan: new Date(),
                    tgl_jatuh_tempo: null,
                    supplier_selected: null,
                    item_selected: [],
                    qty_selected: [],
                    totalamount: 0,
                    file_attch: null
                }
                this.imagePreview = ''
                this.file_size = ''
                this.errors = {}
            },

            formatCurrency(amount) {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(amount || 0)
            },

            showToast(severity, message) {
                // Using a simple alert for PrimeVue 2 compatibility
                // You can replace this with your preferred toast implementation
                const prefix = severity === 'success' ? '✅' : severity === 'warn' ? '⚠️' : severity === 'error' ? '❌' :
                    'ℹ️'
                alert(`${prefix} ${message}`)

                // Alternative: If you have vue-toasted or similar library
                // this.$toast.show(message, { type: severity, duration: 3000 })
            },

            showMessage(severity, summary, detail) {
                // Using ConfirmDialog for notifications in PrimeVue 2
                const icon = severity === 'success' ? 'pi pi-check-circle' :
                    severity === 'warn' ? 'pi pi-exclamation-triangle' :
                    severity === 'error' ? 'pi pi-times-circle' : 'pi pi-info-circle'

                const acceptClass = severity === 'success' ? 'p-button-success' :
                    severity === 'warn' ? 'p-button-warning' :
                    severity === 'error' ? 'p-button-danger' : 'p-button-info'

                this.$confirm.require({
                    message: detail,
                    header: summary,
                    icon: icon,
                    acceptLabel: 'OK',
                    rejectLabel: null,
                    acceptClass: acceptClass,
                    accept: () => {
                        // Do nothing, just close the dialog
                    }
                })
            },

            getToastSummary(severity) {
                const summaries = {
                    success: 'Berhasil',
                    warn: 'Peringatan',
                    error: 'Error',
                    info: 'Info'
                }
                return summaries[severity] || 'Notifikasi'
            }
        }
    }

</script>

<style scoped>
    .receipt-dialog {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .form-container {
        padding: 1.5rem;
    }

    /* Total Amount Card */
    .total-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 1.5rem;
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .total-header {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .total-header i {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }

    .total-label {
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.9;
    }

    .total-amount {
        font-size: 1.8rem;
        font-weight: 700;
        margin-top: 0.5rem;
    }

    /* Form Grid */
    .form-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-field {
        display: flex;
        flex-direction: column;
    }

    .field-label {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }

    .field-label.required::after {
        content: "*";
        color: #ef4444;
        margin-left: 0.25rem;
    }

    .field-label i {
        color: #6b7280;
        font-size: 0.9rem;
    }

    .field-input {
        width: 100% !important;
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        padding: 0.75rem !important;
        font-size: 0.9rem !important;
        transition: all 0.2s ease !important;
    }

    .field-input:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }

    .field-input.p-invalid {
        border-color: #ef4444 !important;
    }

    /* Date Fields Row */
    .date-fields-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    /* File Upload */
    .file-upload-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .file-input-wrapper {
        position: relative;
        overflow: hidden;
    }

    .file-input {
        position: absolute;
        left: -9999px;
        opacity: 0;
    }

    .file-input-label {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        background: #f8fafc;
        border: 2px dashed #cbd5e1;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
        color: #64748b;
    }

    .file-input-label:hover {
        background: #f1f5f9;
        border-color: #667eea;
        color: #667eea;
    }

    .file-size-info {
        color: #6b7280;
        font-size: 0.8rem;
    }

    /* Image Preview */
    .image-preview-section {
        margin-top: 1rem;
    }

    .preview-container {
        position: relative;
        display: inline-block;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .preview-image {
        max-width: 200px;
        max-height: 200px;
        object-fit: cover;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .preview-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        cursor: pointer;
    }

    .preview-overlay i {
        color: white;
        font-size: 1.5rem;
    }

    .preview-container:hover .preview-overlay {
        opacity: 1;
    }

    .preview-container:hover .preview-image {
        transform: scale(1.05);
    }

    .preview-hint {
        display: block;
        margin-top: 0.5rem;
        color: #6b7280;
        font-size: 0.8rem;
    }

    /* Dialog Footer */
    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 1rem 0;
    }

    /* Error Messages */
    .p-error {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }

    /* Message Component Enhancement */
    :deep(.p-message) {
        border-radius: 8px !important;
        border-left: 4px solid #f59e0b !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .date-fields-row {
            grid-template-columns: 1fr;
        }

        .total-amount {
            font-size: 1.5rem;
        }

        .preview-image {
            max-width: 150px;
            max-height: 150px;
        }
    }

    .readonly-input {
        background-color: #f8f9fa !important;
        border-color: #dee2e6 !important;
    }

    .table th {
        background-color: #f8f9fa;
        border-top: 1px solid #dee2e6;
        font-weight: 600;
    }

    .table-responsive {
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
    }

    .custom-file-label::after {
        content: "Browse";
    }

    .card-tools {
        margin-left: auto;
    }

    .p-invalid {
        border-color: #e24c4c !important;
    }

    .p-error {
        color: #e24c4c;
        font-size: 0.875rem;
    }

    .font-weight-bold {
        font-weight: 600 !important;
    }

    .text-muted {
        color: #6c757d !important;
    }

    .table-sm th,
    .table-sm td {
        padding: 0.5rem;
        vertical-align: middle;
    }

    .card {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.375rem;
        margin-bottom: 1rem;
    }

    .card-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0.75rem 1rem;
    }

    .card-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 500;
    }

    .card-body {
        padding: 1rem;
    }

    .card-footer {
        background-color: #f8f9fa;
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0.75rem 1rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        font-weight: 500;
        margin-bottom: 0.5rem;
        display: block;
    }

    .btn-spacing {
        margin-right: 0.5rem;
    }

    .btn-spacing:last-child {
        margin-right: 0;
    }

    .text-center {
        text-align: center !important;
    }

    .text-right {
        text-align: right !important;
    }

    .text-left {
        text-align: left !important;
    }

    .d-flex {
        display: flex !important;
    }

    .justify-content-between {
        justify-content: space-between !important;
    }

    .align-items-center {
        align-items: center !important;
    }

    .py-4 {
        padding-top: 1.5rem !important;
        padding-bottom: 1.5rem !important;
    }

    .mt-2 {
        margin-top: 0.5rem !important;
    }

    .mt-3 {
        margin-top: 1rem !important;
    }

    .mb-3 {
        margin-bottom: 1rem !important;
    }

    .mb-5 {
        margin-bottom: 3rem !important;
    }

    .p-2 {
        padding: 0.5rem !important;
    }

    .thead-light th {
        background-color: #e9ecef;
        border-color: #dee2e6;
    }

    .sticky-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #e9ecef;
    }

    /* Custom scrollbar for webkit browsers */
    .table-responsive::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .table-responsive::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .table-responsive::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }

    .table-responsive::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    /* Animation for loading states */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    /* Improved button spacing in dialogs */
    .p-dialog-footer .p-button {
        margin-left: 0.5rem;
    }

    .p-dialog-footer .p-button:first-child {
        margin-left: 0;
    }

    /* Enhanced table styling */
    .table-striped tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.02);
    }

    .table-hover tbody tr:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    /* Input focus states */
    .p-inputtext:focus,
    .p-dropdown:focus,
    .p-calendar:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        border-color: #80bdff;
    }

    /* Custom file input styling */
    .custom-file-input:focus~.custom-file-label {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .custom-file-label {
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        background-color: #fff;
        cursor: pointer;
        display: block;
        width: 100%;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
    }

    .custom-file-label::after {
        content: "Browse";
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        display: block;
        height: calc(1.5em + 0.75rem);
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        color: #495057;
        background-color: #e9ecef;
        border-left: inherit;
        border-radius: 0 0.375rem 0.375rem 0;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .card-body {
            padding: 0.5rem;
        }

        .table-responsive {
            font-size: 0.875rem;
        }

        .p-dialog {
            width: 95vw !important;
        }

        .col-md-6 {
            margin-bottom: 1rem;
        }
    }

    /* Print styles */
    @media print {

        .card-footer,
        .p-button,
        .pi {
            display: none !important;
        }

        .card {
            border: none;
            box-shadow: none;
        }

        .table {
            font-size: 12px;
        }
    }

    /* Loading overlay customization */
    .vld-overlay {
        z-index: 9999;
    }

    .vld-background {
        background-color: rgba(255, 255, 255, 0.8);
    }

    /* Success/Error states */
    .has-success .p-inputtext,
    .has-success .p-dropdown,
    .has-success .p-calendar {
        border-color: #28a745;
    }

    .has-error .p-inputtext,
    .has-error .p-dropdown,
    .has-error .p-calendar {
        border-color: #dc3545;
    }

    /* Tooltip customization */
    .p-tooltip .p-tooltip-text {
        background-color: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
    }

    /* Custom cursor for clickable images */
    .cursor-pointer {
        cursor: pointer;
    }

    .cursor-pointer:hover {
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .image-preview-container {
        text-align: center;
    }

    .card-primary {
        border-color: #007bff;
    }

    .card-primary .card-header {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
    }

    .card-success {
        border-color: #28a745;
    }

    .card-success .card-header {
        background-color: #28a745;
        color: white;
        border-color: #28a745;
    }

    .card-warning {
        border-color: #ffc107;
    }

    .card-warning .card-header {
        background-color: #ffc107;
        color: #212529;
        border-color: #ffc107;
    }

    .card-danger {
        border-color: #dc3545;
    }

    .card-danger .card-header {
        background-color: #dc3545;
        color: white;
        border-color: #dc3545;
    }

</style>
