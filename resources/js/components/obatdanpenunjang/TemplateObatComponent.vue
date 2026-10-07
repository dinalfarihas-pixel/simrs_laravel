<template>
    <div class="content-wrapper">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
        <ConfirmDialog></ConfirmDialog>

        <!-- Content Header -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Template Obat</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Obat & Penunjang</a></li>
                            <li class="breadcrumb-item active">Template Obat</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <section class="content">
            <div class="container-fluid">

                <!-- Toolbar Row -->
                <div class="row mb-3">
                    <div class="col-md-4 col-sm-6 mb-2 mb-md-0">
                        <button class="btn btn-primary btn-sm" @click="addnewtemplate()">
                            <i class="fas fa-plus mr-1"></i> Buat Template Baru
                        </button>
                    </div>
                    <div class="col-md-4 col-sm-6 ml-auto">
                        <div class="input-group input-group-sm">
                            <input
                                v-model="filterText"
                                type="text"
                                class="form-control"
                                placeholder="Cari nama template..."
                            />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i v-if="!filterText" class="fas fa-search"></i>
                                    <i
                                        v-else
                                        class="fas fa-times text-danger"
                                        style="cursor:pointer"
                                        @click="filterText = ''"
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <small v-if="filterText" class="text-muted">
                            Menampilkan {{ filteredTemplates.length }} dari {{ templatePersediaan.length }} template
                        </small>
                    </div>
                </div>

                <!-- Info Bar -->
                <div class="row mb-2">
                    <div class="col-12">
                        <span class="badge badge-primary mr-1">
                            <i class="fas fa-layer-group mr-1"></i>
                            {{ templatePersediaan.length }} Template Tersedia
                        </span>
                    </div>
                </div>

                <!-- Empty State: Belum ada data -->
                <div v-if="templatePersediaan.length === 0" class="row">
                    <div class="col-12">
                        <div class="card card-outline card-info">
                            <div class="card-body text-center py-5">
                                <i class="fas fa-clipboard-list fa-4x text-secondary mb-3"></i>
                                <h5 class="text-secondary">Belum Ada Template</h5>
                                <p class="text-muted">Belum ada template obat yang dibuat. Mulai buat template untuk mempercepat prescribing.</p>
                                <button class="btn btn-primary btn-sm" @click="addnewtemplate()">
                                    <i class="fas fa-plus mr-1"></i> Buat Template Pertama
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State: Pencarian tidak ditemukan -->
                <div v-else-if="filteredTemplates.length === 0" class="row">
                    <div class="col-12">
                        <div class="card card-outline card-warning">
                            <div class="card-body text-center py-5">
                                <i class="fas fa-search fa-4x text-warning mb-3"></i>
                                <h5 class="text-secondary">Template Tidak Ditemukan</h5>
                                <p class="text-muted">
                                    Tidak ada template dengan nama <strong>"{{ filterText }}"</strong>.
                                </p>
                                <button class="btn btn-default btn-sm" @click="filterText = ''">
                                    <i class="fas fa-times mr-1"></i> Hapus Pencarian
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Template Cards -->
                <div v-else class="row">
                    <div
                        v-for="(data, index) in filteredTemplates"
                        :key="index"
                        class="col-md-6 col-lg-4 col-xl-3"
                    >
                        <div class="card card-outline card-primary">
                            <div class="card-header">
                                <h3 class="card-title">
                                    <i class="fas fa-file-medical mr-2 text-primary"></i>
                                    {{ data.caption }}
                                </h3>
                                <div class="card-tools">
                                    <span class="badge badge-primary">
                                        {{ data.detils.length }} obat
                                    </span>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="template-item-scroll">
                                    <ul class="list-group list-group-flush">
                                        <li
                                            v-for="(detail, idx) in data.detils"
                                            :key="idx"
                                            class="list-group-item py-2 px-3"
                                            :class="{ 'item-nonaktif': detail.arsipkan == '1' }"
                                        >
                                            <div class="d-flex align-items-start">
                                                <i class="fas fa-pills mr-2 mt-1"
                                                    :class="detail.arsipkan == '1' ? 'text-muted' : 'text-primary'"
                                                    style="font-size:11px; flex-shrink:0;"></i>
                                                <div style="min-width:0; flex:1;">
                                                    <div class="d-flex align-items-center" style="gap:6px;">
                                                        <div class="item-nama" style="font-size:13px; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ detail.nama }}</div>
                                                        <span v-if="detail.arsipkan == '1'" class="badge badge-secondary" style="font-size:9px; flex-shrink:0;">
                                                            <i class="fas fa-ban mr-1"></i>Non Aktif
                                                        </span>
                                                    </div>
                                                    <small class="text-muted">{{ detail.barcode }} &bull; {{ detail.satuan }}</small>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-footer bg-white p-2">
                                <div class="row no-gutters">
                                    <div class="col-4 pr-1">
                                        <button
                                            class="btn btn-outline-primary btn-sm btn-block"
                                            @click="editTemplate(data)"
                                        >
                                            <i class="fas fa-pen mr-1"></i> Edit
                                        </button>
                                    </div>
                                    <div class="col-4 px-1">
                                        <button
                                            class="btn btn-danger btn-sm btn-block"
                                            @click="hapustemplate(data.no_template)"
                                        >
                                            <i class="fas fa-trash-alt mr-1"></i> Hapus
                                        </button>
                                    </div>
                                    <div class="col-4 pl-1">
                                        <button
                                            class="btn btn-success btn-sm btn-block"
                                            @click="responvalue(data)"
                                        >
                                            <i class="fas fa-check mr-1"></i> Gunakan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ====== Dialog: Tambah Template ====== -->
        <Dialog
            :header="editingNoTemplate ? 'Edit Template Obat' : 'Tambah Template Obat'"
            v-model:visible="showAddnewtemplate"
            :modal="true"
            :style="{ width: '65vw' }"
            @hide="resetForm()"
        >
            <div class="row">
                <!-- Kiri: Daftar Obat -->
                <div class="col-md-6">
                    <div class="card  mb-0">
                        <div class="card-header p-2">
                            <h3 class="card-title">
                                <i class="fas fa-list mr-1"></i> Daftar Obat
                            </h3>
                        </div>
                        <div class="card-body p-2">
                            <div class="input-group input-group-sm mb-2">
                                <input
                                    v-model="form.itembarang"
                                    type="text"
                                    class="form-control"
                                    placeholder="Cari nama atau barcode..."
                                    @input="getdataobat(10)"
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" @click="getdataobat(10)">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                            <div style="max-height:320px; overflow-y:auto;" class="border rounded">
                                <div v-if="fact.length === 0" class="text-center text-muted py-4">
                                    <i class="fas fa-search fa-2x mb-2 d-block"></i>
                                    <small>Masukkan minimal 3 karakter untuk mencari</small>
                                </div>
                                <div
                                    v-for="(row, k) in fact"
                                    :key="k"
                                    class="d-flex align-items-center justify-content-between px-2 py-2 border-bottom"
                                    :class="[isItemSelected(row.BARCODE) ? 'bg-light' : '', row.ARSIPKAN == '1' ? 'item-nonaktif' : '']"
                                >
                                    <div style="min-width:0;">
                                        <div class="d-flex align-items-center" style="gap:6px;">
                                            <div class="item-nama" style="font-size:13px; font-weight:500;">{{ row.NAMA }}</div>
                                            <span v-if="row.ARSIPKAN == '1'" class="badge badge-secondary" style="font-size:9px; flex-shrink:0;">
                                                <i class="fas fa-ban mr-1"></i>Non Aktif
                                            </span>
                                        </div>
                                        <small class="text-muted">{{ row.BARCODE }} &bull; Stok: {{ row.QUNATITY }}</small>
                                    </div>
                                    <button
                                        class="btn btn-sm ml-2"
                                        :class="isItemSelected(row.BARCODE) ? 'btn-success' : 'btn-outline-primary'"
                                        :disabled="isItemSelected(row.BARCODE) || row.ARSIPKAN == '1'"
                                        v-tooltip.left="row.ARSIPKAN == '1' ? 'Barang non aktif, tidak dapat dipilih' : ''"
                                        @click="additemTemplate(row)"
                                        style="width:32px; height:32px; padding:0;"
                                    >
                                        <i :class="isItemSelected(row.BARCODE) ? 'fas fa-check' : 'fas fa-plus'"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kanan: Obat Dipilih -->
                <div class="col-md-6">
                    <div class="card mb-0">
                        <div class="card-header p-2">
                            <h3 class="card-title">
                                <i class="fas fa-check-circle mr-1"></i> Obat Dipilih
                            </h3>
                            <div class="card-tools">
                                <span class="badge badge-success">{{ form.obatselected.length }}</span>
                            </div>
                        </div>
                        <div class="card-body p-2">
                            <div style="max-height:354px; overflow-y:auto;" class="border rounded">
                                <div v-if="form.obatselected.length === 0" class="text-center text-muted py-4">
                                    <i class="fas fa-hand-pointer fa-2x mb-2 d-block"></i>
                                    <small>Pilih obat dari daftar di sebelah kiri</small>
                                </div>
                                <div
                                    v-for="(row, k) in form.obatselected"
                                    :key="k"
                                    class="d-flex align-items-center justify-content-between px-2 py-2 border-bottom bg-light"
                                >
                                    <div>
                                        <div style="font-size:13px; font-weight:500;">{{ row.NAMA }}</div>
                                        <small class="text-muted">{{ row.BARCODE }} &bull; {{ row.SATUAN }}</small>
                                    </div>
                                    <button
                                        class="btn btn-sm btn-outline-danger ml-2"
                                        @click="hapusItemTemplate(k)"
                                        style="width:32px; height:32px; padding:0;"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <button class="btn btn-default btn-sm" @click="showAddnewtemplate = false">
                    <i class="fas fa-times mr-1"></i> Batal
                </button>
                <button
                    class="btn btn-primary btn-sm"
                    :disabled="form.obatselected.length === 0"
                    @click="handleLanjutkan()"
                >
                    Lanjutkan <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </template>
        </Dialog>

        <!-- ====== Dialog: Nama Template ====== -->
        <Dialog
            :header="editingNoTemplate ? 'Simpan Perubahan Template' : 'Simpan Template'"
            v-model:visible="ShowCaption"
            :modal="true"
            :style="{ width: '100%', maxWidth: '420px' }"
        >
            <div class="form-group mb-3">
                <div class="callout callout-success">
                    <h6 class="mb-0">
                        <i class="fas fa-pills mr-1"></i>
                        {{ form.obatselected.length }} obat akan disimpan dalam template ini
                    </h6>
                </div>
            </div>

            <div class="form-group">
                <label class="font-weight-bold">Nama Template</label>
                <input
                    v-model="form.caption_template"
                    type="text"
                    class="form-control"
                    placeholder="Contoh: Hipertensi, Diabetes, Flu..."
                    @keyup.enter="simpanTemplate()"
                    autofocus
                />
                <small class="form-text text-muted">Nama template harus unik dan mudah dikenali</small>
            </div>

            <template #footer>
                <button class="btn btn-default btn-sm" @click="ShowCaption = false">
                    <i class="fas fa-times mr-1"></i> Batal
                </button>
                <button
                    class="btn btn-primary btn-sm"
                    :disabled="!form.caption_template.trim()"
                    @click="simpanTemplate()"
                >
                    <i class="fas fa-save mr-1"></i> {{ editingNoTemplate ? 'Simpan Perubahan' : 'Simpan Template' }}
                </button>
            </template>
        </Dialog>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
    components: {
        Loading,
        ConfirmDialog
    },
    data() {
        return {
            fact: [],
            isLoading: false,
            showAddnewtemplate: false,
            fullPage: true,
            ShowCaption: false,
            templatePersediaan: [],
            filterText: '',
            editingNoTemplate: null, // no_template dari template yg sedang diedit, null jika mode tambah baru
            form: {
                startdate: '',
                isObatPulang: false,
                enddate: '',
                itembarang: '',
                caption_template: '',
                obatselected: [],
                no_template: ''
            }
        };
    },
    computed: {
        filteredTemplates() {
            if (!this.filterText.trim()) return this.templatePersediaan;
            const q = this.filterText.toLowerCase();
            return this.templatePersediaan.filter(t =>
                t.caption.toLowerCase().includes(q)
            );
        }
    },
    mounted() {
        this.form.startdate = new Date();
        this.gettemplate();
        // PrimeVue 2: transform:scale(1) on outer .p-dialog creates a new containing block
        // for position:fixed children, shifting inner dialogs off-center.
        // Remove the transform so inner dialogs use the true viewport as reference.
        let el = this.$el.parentElement;
        while (el && el !== document.body) {
            if (el.classList.contains('p-dialog')) {
                el.style.transform = 'none';
                break;
            }
            el = el.parentElement;
        }
    },
    methods: {
        addnewtemplate() {
            this.editingNoTemplate = null;
            this.form.caption_template = '';
            this.form.obatselected = [];
            this.form.itembarang = '';
            this.fact = [];
            this.showAddnewtemplate = true;
        },
        editTemplate(data) {
            this.editingNoTemplate = data.no_template;
            this.form.caption_template = data.caption;
            this.form.obatselected = (data.detils || []).map(d => ({
                BARCODE: d.barcode,
                NAMA: d.nama,
                SATUAN: d.satuan
            }));
            this.form.itembarang = '';
            this.fact = [];
            this.showAddnewtemplate = true;
        },
        handleLanjutkan() {
            if (this.form.obatselected.length === 0) {
                this.open('warning', 'Pilih minimal 1 obat');
                return;
            }
            this.ShowCaption = true;
        },
        responvalue(datatemplate) {
            this.$emit('getvalue', datatemplate);
        },
        async getdataobat(mode) {
            if (mode === 10) {
                if (this.form.itembarang === '') { this.fact = []; return; }
                if (this.form.itembarang.length < 3) return;
            }
            this.form.breakdown = 1;
            this.isLoading = true;
            this.form.mode = mode;
            try {
                const response = await axios.post('/getdata_obat_baseparam', this.form);
                this.fact = response.data.response || [];
            } catch (error) {
                console.log(error);
                this.fact = [];
                this.open('error', 'Gagal memuat data obat');
            } finally {
                this.isLoading = false;
            }
        },
        hapusItemTemplate(index) {
            this.form.obatselected.splice(index, 1);
        },
        additemTemplate(barang) {
            if (barang.ARSIPKAN == '1') {
                this.open('warning', `${barang.NAMA} non aktif dan tidak dapat dipilih`);
                return;
            }
            if (!this.isItemSelected(barang.BARCODE)) {
                this.form.obatselected.push({
                    BARCODE: barang.BARCODE,
                    NAMA: barang.NAMA,
                    SATUAN: barang.SATUAN
                });
            }
        },
        isItemSelected(barcode) {
            return this.form.obatselected.some(item => item.BARCODE === barcode);
        },
        resetForm() {
            this.editingNoTemplate = null;
            this.form.obatselected = [];
            this.form.itembarang = '';
            this.fact = [];
            this.form.caption_template = '';
        },
        async gettemplate() {
            this.isLoading = true;
            try {
                const response = await axios.post('/get_template', this.form);
                console.log('Response get_template:', response.data);
                this.templatePersediaan = response.data.response || [];
            } catch (error) {
                console.log(error);
                this.templatePersediaan = [];
                this.open('error', 'Gagal memuat template');
            } finally {
                this.isLoading = false;
            }
        },
        async hapustemplate(notemplate) {
            this.$confirm.require({
                message: 'Apakah Anda yakin ingin menghapus template ini?',
                header: 'Konfirmasi Hapus',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger p-button-sm',
                rejectClass: 'p-button-secondary p-button-sm p-button-outlined',
                acceptLabel: 'Ya, Hapus',
                rejectLabel: 'Batal',
                accept: async () => {
                    this.isLoading = true;
                    this.form.no_template = notemplate;
                    try {
                        const response = await axios.post('/hapustemplate', this.form);
                        if (response.data.metadata.code === 200) {
                            this.open('success', response.data.metadata.message);
                            this.gettemplate();
                        } else {
                            this.open('warning', response.data.metadata.message);
                        }
                    } catch (error) {
                        console.log(error);
                        this.open('error', 'Gagal menghapus template');
                    } finally {
                        this.isLoading = false;
                    }
                }
            });
        },
        async simpanTemplate() {
            if (!this.form.caption_template.trim()) {
                this.open('warning', 'Nama template tidak boleh kosong');
                return;
            }
            if (this.form.obatselected.length === 0) {
                this.open('warning', 'Pilih minimal 1 obat');
                return;
            }
            this.isLoading = true;
            try {
                // Backend belum punya mode "update" untuk template — jadi untuk mode edit,
                // template lama dihapus dulu baru versi barunya disimpan sebagai template baru.
                if (this.editingNoTemplate) {
                    const hapusResponse = await axios.post('/hapustemplate', {
                        ...this.form,
                        no_template: this.editingNoTemplate
                    });
                    if (hapusResponse.data.metadata.code !== 200) {
                        this.open('warning', 'Gagal memperbarui: ' + hapusResponse.data.metadata.message);
                        return;
                    }
                }

                const response = await axios.post('/simpanTemplate', this.form);
                if (response.data.metadata.code === 200) {
                    this.open('success', this.editingNoTemplate
                        ? 'Template berhasil diperbarui'
                        : response.data.metadata.message);
                    this.resetForm();
                    this.ShowCaption = false;
                    this.showAddnewtemplate = false;
                    this.gettemplate();
                } else {
                    this.open('warning', response.data.metadata.message);
                }
            } catch (error) {
                console.log(error);
                this.open('error', 'Gagal menyimpan template');
            } finally {
                this.isLoading = false;
            }
        },
        open(type, message) {
            this.$toast.open({
                message,
                position: 'top-right',
                type,
                duration: 3000,
                dismissible: true
            });
        }
    }
};
</script>

<style scoped>
/* Scroll area item obat dalam card template */
.template-item-scroll {
    max-height: 180px;
    overflow-y: auto;
}

.template-item-scroll::-webkit-scrollbar {
    width: 4px;
}

.template-item-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.template-item-scroll::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

.template-item-scroll::-webkit-scrollbar-thumb:hover {
    background: #3c8dbc;
}

/* Minimal overrides — mengikuti AdminLTE bawaan */
.list-group-item:hover {
    background-color: #f8f9fa;
}

/* Item dengan arsipkan = 1: sudah non aktif, tidak bisa dipilih saat template dipakai */
.item-nonaktif {
    opacity: .55;
}
.item-nonaktif .item-nama,
.item-nonaktif small {
    text-decoration: line-through;
}

:deep(.p-dialog .p-dialog-header) {
    background-color: #3c8dbc;
    padding: 12px 16px;
}

:deep(.p-dialog .p-dialog-title) {
    font-weight: 600;
    font-size: 15px;
    color: #fff;
}

:deep(.p-dialog .p-dialog-header-close) {
    color: rgba(255,255,255,0.8) !important;
}

:deep(.p-dialog .p-dialog-header-close:hover) {
    background: rgba(255,255,255,0.15) !important;
    color: #fff !important;
}

:deep(.p-dialog .p-dialog-content) {
    padding: 16px;
}

:deep(.p-dialog .p-dialog-footer) {
    padding: 10px 16px;
    border-top: 1px solid #dee2e6;
    text-align: right;
}


</style>

