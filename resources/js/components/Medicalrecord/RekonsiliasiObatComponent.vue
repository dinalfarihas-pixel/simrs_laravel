<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- ===== TABEL REKONSILIASI OBAT ===== -->
        <div class="card card-outline card-primary shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between py-2">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-clipboard-check mr-2 text-primary"></i>
                    Rekonsiliasi Obat
                </h3>
                <div class="d-flex" style="gap:6px">
                    <Button label="Tambah Obat Sebelum RS" icon="pi pi-plus" class="p-button-success p-button-sm"
                        @click="buka_tambah(1)" />
                    <Button v-if="showSinkronButton" label="Sinkron Obat RS" icon="pi pi-sync" class="p-button-info p-button-sm"
                        @click="sinkron_obat_rs()" v-tooltip.top="'Ambil obat dari Formulir Pemberian Obat'" />
                    <Button label="Riwayat" icon="pi pi-history" class="p-button-secondary p-button-sm p-button-outlined"
                        @click="buka_riwayat()" v-tooltip.top="'Riwayat rekonsiliasi obat kunjungan sebelumnya'" />
                    <Button icon="pi pi-refresh" class="p-button-secondary p-button-sm p-button-outlined"
                        @click="getrekonsiliasi_obat()" v-tooltip.top="'Refresh data'" />
                </div>
            </div>
            <div class="card-body p-0">
                <small class="text-muted d-block p-2">
                    <i class="fas fa-info-circle mr-1"></i>
                    Bandingkan obat yang dikonsumsi pasien sebelum masuk RS (rumah, faskes lain, OTC, jamu/suplemen, rawat inap
                    sebelumnya) dengan obat yang diresepkan di RS, lalu tentukan status tiap obat: Lanjutkan, Hentikan, Ganti, atau
                    Obat Baru.
                </small>
                <DataTable :value="fact" :rowHover="true" columnResizeMode="fit" stripedRows sortMode="multiple"
                    class="p-datatable-sm" responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                    v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100]">
                    <template #header>
                        <div class="d-flex justify-content-end p-2">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters2['global'].value" placeholder="Cari data..." style="width:220px" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center py-4 text-muted">
                            <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                            Belum ada data rekonsiliasi obat.
                        </div>
                    </template>
                    <Column field="obat_sebelumnya" :sortable="true" header="Sumber" :styles="{'min-width':'110px'}">
                        <template #body="slotProps">
                            <span :class="slotProps.data.obat_sebelumnya == 1 ? 'badge badge-warning' : 'badge badge-primary'">
                                {{ slotProps.data.obat_sebelumnya == 1 ? 'Sebelum RS' : 'Obat RS' }}
                            </span>
                        </template>
                    </Column>
                    <Column field="nama_obat" :sortable="true" header="Nama Obat" :styles="{'min-width':'160px'}"></Column>
                    <Column field="kode_kfa" :sortable="true" header="Kode KFA" :styles="{'min-width':'100px'}">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.kode_kfa">{{ slotProps.data.kode_kfa }}</span>
                            <span v-else class="text-muted">-</span>
                        </template>
                    </Column>
                    <Column field="alergi" header="Alergi" :styles="{'min-width':'120px'}">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.alergi == 1" class="badge badge-danger"
                                v-tooltip.top="slotProps.data.keterangan_alergi || 'Ada alergi'">
                                <i class="pi pi-exclamation-triangle mr-1"></i>Alergi
                            </span>
                            <span v-else class="text-muted">-</span>
                        </template>
                    </Column>
                    <Column field="dosis" :sortable="true" header="Dosis"></Column>
                    <Column field="frekwensi" :sortable="true" header="Frekuensi"></Column>
                    <Column field="rute" :sortable="true" header="Rute"></Column>
                    <Column field="sumber_informasi" :sortable="true" header="Sumber Informasi" :styles="{'min-width':'150px'}"></Column>
                    <Column field="status_rekonsiliasi" :sortable="true" header="Status" :styles="{'min-width':'110px'}">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.status_rekonsiliasi" :class="statusBadgeClass(slotProps.data.status_rekonsiliasi)">
                                {{ slotProps.data.status_rekonsiliasi }}
                            </span>
                            <span v-else class="text-muted">-</span>
                        </template>
                    </Column>
                    <Column field="obat_pengganti" header="Obat Pengganti"></Column>
                    <Column field="keterangan" header="Keterangan" :styles="{'min-width':'160px'}"></Column>
                    <Column header="Aksi" :styles="{'width':'90px','text-align':'center'}">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-text p-button-info p-button-sm" v-tooltip.top="'Edit'"
                                @click="buka_edit(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" v-tooltip.top="'Hapus'"
                                @click="hapus_line(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <!-- ===== DIALOG: TAMBAH / EDIT REKONSILIASI OBAT ===== -->
        <Dialog :header="form.id ? 'Edit Rekonsiliasi Obat' : 'Tambah Rekonsiliasi Obat'" v-model:visible="showDialog"
            :style="{ width: '55vw' }" :breakpoints="{ '768px': '100vw' }" :modal="true" :draggable="false">
            <div class="p-3">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label class="form-label-custom d-block">Sumber Obat</label>
                        <div class="d-flex" style="gap:16px">
                            <div class="field-radiobutton">
                                <RadioButton id="rk-sebelum" :value="1" v-model="form.obat_sebelumnya" />
                                <label for="rk-sebelum" class="ml-2">Sebelum Masuk RS</label>
                            </div>
                            <div class="field-radiobutton">
                                <RadioButton id="rk-rs" :value="0" v-model="form.obat_sebelumnya" />
                                <label for="rk-rs" class="ml-2">Obat RS</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 mb-3" v-if="form.obat_sebelumnya == 1">
                        <label class="form-label-custom">Sumber Informasi</label>
                        <Select class="w-100" v-model="form.sumber_informasi" :options="opsiSumberInformasi"
                            placeholder="Pilih sumber informasi..." />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Nama Obat <span class="text-danger">*</span></label>
                        <AutoComplete v-model="form.nama_obat" :suggestions="kfaSuggestions" optionLabel="name"
                            :loading="isSearchingKfa" fluid class="w-100" inputClass="w-100" :inputStyle="{width:'100%'}"
                            @complete="searchKfa($event.query)" @item-select="onKfaSelect"
                            @input="form.kode_kfa = ''" placeholder="Cari nama obat (sumber: KFA)...">
                            <template #option="{ option }">
                                <span class="fw-bold mr-2">{{ option.name }}</span>
                                <small class="text-muted">{{ option.kfa_code }}</small>
                            </template>
                        </AutoComplete>
                        <small class="text-muted d-block mt-1">
                            <span v-if="isSearchingKfa"><i class="pi pi-spin pi-spinner mr-1"></i>Mencari di KFA...</span>
                            <span v-else-if="form.kode_kfa">Kode KFA: <strong>{{ form.kode_kfa }}</strong></span>
                            <span v-else>Pencarian bersumber dari KFA (Kamus Farmasi &amp; Alkes SatuSehat). Obat non-KFA
                                (jamu/OTC) tetap bisa diketik manual.</span>
                        </small>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Dosis</label>
                        <InputText class="w-100" placeholder="Contoh: 500 mg" v-model="form.dosis" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Frekuensi</label>
                        <InputText class="w-100" placeholder="Contoh: 3x sehari" v-model="form.frekwensi" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Rute Pemberian</label>
                        <Select class="w-100" v-model="form.rute" filter :options="rute" placeholder="Pilih rute..." />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Status Rekonsiliasi</label>
                        <Select class="w-100" v-model="form.status_rekonsiliasi" :options="opsiStatus" placeholder="Pilih status..." />
                    </div>
                    <div class="col-md-6 mb-3" v-if="form.status_rekonsiliasi === 'Ganti'">
                        <label class="form-label-custom">Obat Pengganti</label>
                        <InputText class="w-100" placeholder="Nama obat pengganti" v-model="form.obat_pengganti" />
                    </div>

                    <div class="col-12 mb-3">
                        <div class="field-checkbox">
                            <Checkbox id="rk-alergi" :binary="true" v-model="form.alergi" />
                            <label for="rk-alergi" class="ml-2 form-label-custom mb-0">Pasien Memiliki Alergi Terhadap Obat Ini</label>
                        </div>
                        <Textarea v-if="form.alergi" class="w-100 mt-2" :rows="2"
                            placeholder="Jelaskan reaksi alergi (contoh: ruam kulit, sesak napas, gatal-gatal)..."
                            v-model="form.keterangan_alergi" />
                    </div>

                    <div class="col-12 mb-1">
                        <label class="form-label-custom">Keterangan</label>
                        <Textarea class="w-100" :rows="3" placeholder="Keterangan tambahan (opsional)" v-model="form.keterangan" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text p-button-secondary" @click="showDialog=false" />
                <Button label="Simpan" icon="pi pi-save" class="p-button-success" @click="simpan()" :disabled="!form.nama_obat" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: RIWAYAT REKONSILIASI OBAT ===== -->
        <Dialog header="Riwayat Rekonsiliasi Obat" v-model:visible="showRiwayat" :containerStyle="{width:'80vw'}"
            :modal="true">
            <small class="text-muted d-block mb-2">
                <i class="fas fa-info-circle mr-1"></i>
                Data rekonsiliasi obat dari kunjungan/rawat inap sebelumnya milik pasien ini.
            </small>
            <DataTable :value="riwayatList" :paginator="true" :rows="10" stripedRows showGridlines
                scrollable scrollHeight="60vh" class="p-datatable-sm" :loading="isLoadingRiwayat"
                emptyMessage="Belum ada riwayat rekonsiliasi obat untuk pasien ini.">
                <Column field="created_at" header="Tanggal Dicatat" sortable style="min-width:10rem" />
                <Column field="noregister_asal" header="No. Registrasi" sortable style="min-width:9rem" />
                <Column header="Sumber" style="min-width:9rem">
                    <template #body="{ data }">
                        <span :class="data.obat_sebelumnya == 1 ? 'badge badge-warning' : 'badge badge-primary'">
                            {{ data.obat_sebelumnya == 1 ? 'Sebelum RS' : 'Obat RS' }}
                        </span>
                    </template>
                </Column>
                <Column field="nama_obat" header="Nama Obat" sortable style="min-width:10rem" />
                <Column field="dosis" header="Dosis" style="min-width:8rem" />
                <Column field="frekwensi" header="Frekuensi" style="min-width:8rem" />
                <Column field="rute" header="Rute" style="min-width:8rem" />
                <Column header="Status" style="min-width:9rem">
                    <template #body="{ data }">
                        <span v-if="data.status_rekonsiliasi" :class="statusBadgeClass(data.status_rekonsiliasi)">
                            {{ data.status_rekonsiliasi }}
                        </span>
                        <span v-else class="text-muted">-</span>
                    </template>
                </Column>
                <Column header="Alergi" style="min-width:8rem">
                    <template #body="{ data }">
                        <span v-if="data.alergi == 1" class="badge badge-danger" v-tooltip.top="data.keterangan_alergi || 'Ada alergi'">
                            <i class="pi pi-exclamation-triangle mr-1"></i>Alergi
                        </span>
                        <span v-else class="text-muted">-</span>
                    </template>
                </Column>
                <Column header="Aksi" frozen alignFrozen="right" style="min-width:9rem">
                    <template #body="{ data }">
                        <Button label="Gunakan Data Ini" icon="pi pi-copy" class="p-button-sm p-button-outlined"
                            @click="gunakan_riwayat(data)" />
                    </template>
                </Column>
            </DataTable>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showRiwayat=false" class="p-button-text" />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Loading from 'vue-loading-overlay';
    import Textarea from 'primevue/textarea';
    import RadioButton from 'primevue/radiobutton';
    import Checkbox from 'primevue/checkbox';
    import { FilterMatchMode } from 'primevue/api';

    export default {
        components: { Loading, Textarea, RadioButton, Checkbox },
        props: {
            datapasien: { type: Object, default: () => ({}) },
            showSinkronButton: { type: Boolean, default: true }
        },
        data() {
            return {
                fact: [],
                isLoading: false,
                fullPage: true,
                showDialog: false,
                showRiwayat: false,
                riwayatList: [],
                isLoadingRiwayat: false,
                filters2: {},
                kfaSuggestions: [],
                isSearchingKfa: false,
                rute: [
                    'ORAL',
                    'INJEKSI',
                    'INTRAVENA (IV)',
                    'INTRAMUSKULAR (IM)',
                    'SUBKUTAN (SC)',
                    'INTRAKUTAN (IC)',
                    'SUBLINGUAL',
                    'BUKAL',
                    'REKTAL',
                    'TOPIKAL',
                    'INHALASI',
                    'TETES MATA',
                    'TETES TELINGA',
                    'TETES HIDUNG',
                    'INTRANASAL',
                    'VAGINAL',
                    'TRANSDERMAL',
                ],
                opsiSumberInformasi: [
                    'Wawancara Pasien/Keluarga',
                    'Kartu Obat yang Dibawa',
                    'Kemasan Obat yang Dibawa',
                    'Konfirmasi Apotek/Faskes Asal',
                    'Riwayat Rawat Inap Sebelumnya',
                    'Lainnya'
                ],
                opsiStatus: ['Lanjutkan', 'Hentikan', 'Ganti', 'Obat Baru'],
                form: {
                    id: null,
                    nama_obat: '',
                    kode_kfa: '',
                    dosis: '',
                    frekwensi: '',
                    rute: '',
                    obat_sebelumnya: 1,
                    sumber_informasi: '',
                    status_rekonsiliasi: '',
                    obat_pengganti: '',
                    alergi: false,
                    keterangan_alergi: '',
                    keterangan: ''
                }
            };
        },
        created() {
            this.initFilters2();
            this.getrekonsiliasi_obat();
        },
        methods: {
            initFilters2() {
                this.filters2 = {
                    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
                };
            },
            async searchKfa(query) {
                if (!query || query.length < 3) {
                    this.kfaSuggestions = [];
                    return;
                }
                this.isSearchingKfa = true;
                try {
                    const res = await axios.post('/data_kfa', { mode: 1, param: query });
                    const items = (res.data.response && res.data.response.data) ? res.data.response.data : [];
                    this.kfaSuggestions = items
                        .filter(x => x.name)
                        .map(x => ({ name: x.name, kfa_code: x.kfa_code }));
                } catch (e) {
                    console.error(e);
                    this.kfaSuggestions = [];
                } finally {
                    this.isSearchingKfa = false;
                }
            },
            onKfaSelect(e) {
                this.form.nama_obat = e.value.name;
                this.form.kode_kfa = e.value.kfa_code;
            },
            statusBadgeClass(status) {
                const map = {
                    'Lanjutkan': 'badge badge-success',
                    'Hentikan': 'badge badge-danger',
                    'Ganti': 'badge badge-warning',
                    'Obat Baru': 'badge badge-info'
                };
                return map[status] || 'badge badge-secondary';
            },
            clear_form() {
                this.form = {
                    id: null,
                    nama_obat: '',
                    kode_kfa: '',
                    dosis: '',
                    frekwensi: '',
                    rute: '',
                    obat_sebelumnya: 1,
                    sumber_informasi: '',
                    status_rekonsiliasi: '',
                    obat_pengganti: '',
                    alergi: false,
                    keterangan_alergi: '',
                    keterangan: ''
                };
            },
            buka_tambah(obat_sebelumnya) {
                this.clear_form();
                this.form.obat_sebelumnya = obat_sebelumnya;
                this.showDialog = true;
            },
            buka_edit(row) {
                this.form = {
                    id: row.id,
                    nama_obat: row.nama_obat,
                    kode_kfa: row.kode_kfa,
                    dosis: row.dosis,
                    frekwensi: row.frekwensi,
                    rute: row.rute,
                    obat_sebelumnya: row.obat_sebelumnya == 1 ? 1 : 0,
                    sumber_informasi: row.sumber_informasi,
                    status_rekonsiliasi: row.status_rekonsiliasi,
                    obat_pengganti: row.obat_pengganti,
                    alergi: row.alergi == 1,
                    keterangan_alergi: row.keterangan_alergi,
                    keterangan: row.keterangan
                };
                this.showDialog = true;
            },
            async simpan() {
                if (!this.form.nama_obat) return;
                this.isLoading = true;
                const payload = { ...this.form, noregister: this.datapasien.NOPENDAFTARAN };
                const url = this.form.id ? '/update_rekonsiliasi_obat' : '/simpan_rekonsiliasi_obat';
                try {
                    const res = await axios.post(url, payload);
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.showDialog = false;
                        this.getrekonsiliasi_obat();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async hapus_line(id) {
                this.isLoading = true;
                try {
                    const res = await axios.post('/hapus_rekonsiliasi_obat', { id });
                    if (res.data.metadata.code == 200) {
                        this.open('success', res.data.metadata.message);
                        this.getrekonsiliasi_obat();
                    } else {
                        this.open('warning', res.data.metadata.message);
                    }
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async sinkron_obat_rs() {
                this.isLoading = true;
                try {
                    const res = await axios.post('/sinkron_obat_rs_rekonsiliasi', { noregister: this.datapasien.NOPENDAFTARAN });
                    this.open('success', res.data.metadata.message);
                    this.getrekonsiliasi_obat();
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async getrekonsiliasi_obat() {
                this.isLoading = true;
                try {
                    const res = await axios.post('/getrekonsiliasi_obat', { noregister: this.datapasien.NOPENDAFTARAN });
                    this.fact = res.data.response || [];
                } catch (e) { console.error(e); }
                finally { this.isLoading = false; }
            },
            async buka_riwayat() {
                this.showRiwayat = true;
                this.isLoadingRiwayat = true;
                try {
                    const res = await axios.post('/get_riwayat_rekonsiliasi_obat', {
                        nomr: this.datapasien.NOMR,
                        exclude_noregister: this.datapasien.NOPENDAFTARAN
                    });
                    this.riwayatList = res.data.response || [];
                } catch (e) { console.error(e); }
                finally { this.isLoadingRiwayat = false; }
            },
            gunakan_riwayat(row) {
                this.clear_form();
                this.form.nama_obat = row.nama_obat;
                this.form.kode_kfa = row.kode_kfa;
                this.form.dosis = row.dosis;
                this.form.frekwensi = row.frekwensi;
                this.form.rute = row.rute;
                this.form.obat_sebelumnya = 1;
                this.form.sumber_informasi = 'Riwayat Rawat Inap Sebelumnya';
                this.form.alergi = row.alergi == 1;
                this.form.keterangan_alergi = row.keterangan_alergi;
                this.showRiwayat = false;
                this.showDialog = true;
                this.open('info', 'Data dari riwayat berhasil disalin. Silakan periksa kembali sebelum menyimpan.');
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            }
        }
    }
</script>

<style scoped>
.form-label-custom {
    font-weight: 600;
    font-size: .85rem;
    color: #333;
    margin-bottom: 6px;
}
</style>
