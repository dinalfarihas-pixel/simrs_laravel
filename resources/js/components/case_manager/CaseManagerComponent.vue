<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <ConfirmDialog group="caseManagerNotes" />

        <!-- Dialog Otorisasi / TTE per baris -->
        <Dialog header="TTE Kegiatan Case Manager" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form v-if="showOtorisasi" @getvalue="handleValueOto" :mode=22
                :noregister="String(selectedRowId)"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- Dialog Tambah / Edit Kegiatan -->
        <Dialog :header="editingId ? 'Ubah Kegiatan Case Manager' : 'Tambah Kegiatan Case Manager'"
            v-model:visible="showForm" :containerStyle="{width: '40vw'}" :modal="true">
            <div class="mb-3">
                <label class="form-label-custom">Tanggal &amp; Jam</label>
                <Calendar v-model="form.tanggal_jam" :showIcon="true" showTime hourFormat="24"
                    dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2035" style="width:100%" />
            </div>
            <div class="mb-3">
                <label class="form-label-custom">Item</label>
                <Select v-model="form.item" :options="itemOptions" optionLabel="label" optionValue="value"
                    placeholder="Pilih item kegiatan..." style="width:100%" />
            </div>
            <div class="mb-3">
                <label class="form-label-custom">Kegiatan Manajemen Pelayanan Pasien</label>
                <Textarea v-model="form.kegiatan" style="width:100%" :rows="4"
                    placeholder="Tuliskan kegiatan manajemen pelayanan pasien..." />
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="batal_form()" class="p-button-text" />
                <Button label="Simpan" icon="pi pi-save" class="p-button-primary"
                    @click="simpan_form()" :disabled="isLoadingForm || !form.kegiatan.trim() || !form.item || !form.tanggal_jam" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">

            <!-- ===== HEADER FORM B ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="cm-title-bar">
                    FORM - B MANAJEMEN PELAYANAN PASIEN / CASE MANAGER
                </div>
                <div class="card-body">
                    <div class="cm-keterangan">
                        <div class="cm-keterangan-title">Keterangan Item :</div>
                        <div class="cm-keterangan-grid">
                            <div class="cm-keterangan-col">
                                <div v-for="opt in itemOptions.slice(0,4)" :key="opt.value">
                                    <strong>{{ opt.value }}.</strong> {{ opt.label.split('. ')[1] }}
                                </div>
                            </div>
                            <div class="cm-keterangan-col">
                                <div v-for="opt in itemOptions.slice(4,8)" :key="opt.value">
                                    <strong>{{ opt.value }}.</strong> {{ opt.label.split('. ')[1] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== TABEL KEGIATAN ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-user-nurse mr-2 text-primary"></i>
                        Kegiatan Case Manager
                    </h3>
                    <ProgressBar mode="indeterminate" v-show="isLoading" style="height:.25em;width:130px;border-radius:4px" />
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm align-middle mb-0">
                            <thead>
                                <tr>
                                    <th style="width:14%">Tanggal &amp; Jam</th>
                                    <th style="width:7%" class="text-center">Item</th>
                                    <th>Kegiatan Manajemen Pelayanan Pasien</th>
                                    <th style="width:15%">Nama &amp; TTD</th>
                                    <th style="width:7%" class="text-center">TTE</th>
                                    <th style="width:10%" class="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="rows.length === 0">
                                    <td colspan="6" class="text-center text-muted py-3">Belum ada kegiatan case manager.</td>
                                </tr>
                                <tr v-for="row in rows" :key="row.id">
                                    <td>{{ formatDisplay(row.tanggal_jam) }}</td>
                                    <td class="text-center"><span class="badge badge-info">{{ row.item }}</span></td>
                                    <td style="white-space:pre-wrap">{{ row.kegiatan }}</td>
                                    <td>{{ row.hasbeen_auth == 1 ? row.nama_paraf : 'Belum di otorisasi' }}</td>
                                    <td class="text-center">
                                        <span v-if="row.hasbeen_auth == 1" class="text-success" title="Telah ditandatangani">
                                            <i class="pi pi-verified"></i>
                                        </span>
                                        <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                            @click="call_oto(row.id)" title="Otorisasi (TTE)" />
                                    </td>
                                    <td class="text-center">
                                        <Button v-if="row.hasbeen_auth != 1" icon="pi pi-pencil"
                                            class="p-button-rounded p-button-info p-button-sm mr-1"
                                            @click="mulai_edit(row)" title="Edit" />
                                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"
                                            @click="konfirmasi_hapus(row)" title="Hapus" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer d-flex" style="gap:8px">
                    <Button label="Tambah Kegiatan" icon="pi pi-plus" class="p-button-primary" @click="buka_tambah()" />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Dialog from 'primevue/dialog';
    import Textarea from 'primevue/textarea';
    import ProgressBar from 'primevue/progressbar';

    export default {
        components: { Loading, Dialog, Textarea, ProgressBar },
        props: ['datapasien'],
        data() {
            return {
                isLoading: false,
                fullPage: false,
                isLoadingForm: false,
                showForm: false,
                editingId: null,
                showOtorisasi: false,
                selectedRowId: null,
                rows: [],
                itemOptions: [
                    { value: 'A', label: 'A. Pelaksanaan Perencanaan' },
                    { value: 'B', label: 'B. Monitoring' },
                    { value: 'C', label: 'C. Identifikasi masalah - risiko - kesempatan' },
                    { value: 'D', label: 'D. Fasilitas, koordinasi, komunikasi' },
                    { value: 'E', label: 'E. Kolaborasi' },
                    { value: 'F', label: 'F. Advokasi' },
                    { value: 'G', label: 'G. Hasil Pelayanan' },
                    { value: 'H', label: 'H. Terminasi MPP' },
                ],
                form: {
                    tanggal_jam: new Date(),
                    item: null,
                    kegiatan: '',
                },
            };
        },
        created() {
            this.get_case_manager();
        },
        methods: {
            async get_case_manager() {
                this.isLoading = true;
                try {
                    const res = await axios.post('/get_case_manager', { noregister: this.datapasien.NOPENDAFTARAN });
                    this.rows = res.data.response || [];
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            buka_tambah() {
                this.editingId = null;
                this.form = { tanggal_jam: new Date(), item: null, kegiatan: '' };
                this.showForm = true;
            },
            mulai_edit(row) {
                this.editingId = row.id;
                this.form = {
                    tanggal_jam: row.tanggal_jam ? new Date(row.tanggal_jam.replace(' ', 'T')) : new Date(),
                    item: row.item,
                    kegiatan: row.kegiatan,
                };
                this.showForm = true;
            },
            batal_form() {
                this.showForm = false;
                this.editingId = null;
            },
            async simpan_form() {
                if (!this.form.kegiatan.trim() || !this.form.item || !this.form.tanggal_jam) return;
                this.isLoadingForm = true;
                const payload = {
                    noregister: this.datapasien.NOPENDAFTARAN,
                    nomr: this.datapasien.NOMR,
                    tanggal_jam: this.formatDate(this.form.tanggal_jam),
                    item: this.form.item,
                    kegiatan: this.form.kegiatan,
                };
                try {
                    const url = this.editingId ? '/update_case_manager' : '/simpan_case_manager';
                    if (this.editingId) payload.id = this.editingId;
                    const res = await axios.post(url, payload);
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.showForm = false;
                        this.editingId = null;
                        this.get_case_manager();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoadingForm = false; }
            },
            konfirmasi_hapus(row) {
                this.$confirm.require({
                    group: 'caseManagerNotes',
                    message: `Hapus kegiatan tanggal ${this.formatDisplay(row.tanggal_jam)}? Tindakan ini tidak dapat dibatalkan.`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => {
                        this.hapus(row);
                    },
                });
            },
            call_oto(id) {
                this.selectedRowId = id;
                this.showOtorisasi = true;
            },
            handleValueOto(value) {
                if (value == 200) {
                    this.showOtorisasi = false;
                    this.get_case_manager();
                }
            },
            async hapus(row) {
                try {
                    const res = await axios.post('/hapus_case_manager', { id: row.id });
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.get_case_manager();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
            },
            formatDate(d) {
                const pad = n => String(n).padStart(2, '0');
                return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
            },
            formatDisplay(v) {
                if (!v) return '-';
                const d = new Date(String(v).replace(' ', 'T'));
                if (isNaN(d.getTime())) return v;
                const pad = n => String(n).padStart(2, '0');
                return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            }
        },
    }
</script>

<style scoped>
.cm-title-bar {
    background: #1f2937;
    color: #fff;
    font-weight: 700;
    text-align: center;
    padding: 10px 12px;
    border-radius: 4px 4px 0 0;
    letter-spacing: .3px;
}
.form-label-custom {
    font-weight: 600;
    font-size: .85rem;
    color: #333;
    margin-bottom: 6px;
}
.cm-keterangan-title {
    font-weight: 700;
    margin-bottom: 8px;
}
.cm-keterangan-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 24px;
    font-size: .9rem;
}
.cm-keterangan-col > div {
    padding: 2px 0;
}
</style>
