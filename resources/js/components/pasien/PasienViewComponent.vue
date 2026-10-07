<template>
    <div class="patient-view">
        <loading v-model:active="isLoading" :is-full-page="false"></loading>

        <div class="card card-outline card-primary" v-if="patientData">
            <div class="card-body box-profile">
                <div class="text-center">
                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" class="profile-avatar" />
                </div>
                <h3 class="profile-username text-center">{{ patientData.TITLE }} {{ patientData.NAMAPASIEN }}</h3>
                <p class="text-center">
                    <Tag severity="danger" :value="'NORM ' + patientData.NOMR" />
                    <Tag :severity="patientData.JENISKELAMIN === 'P' ? 'warn' : 'info'" :value="jenisKelaminLabel"
                        class="ml-1" />
                </p>
            </div>
            <Divider />

            <div class="card-body pt-0">
                <strong><i class="fas fa-birthday-cake mr-1"></i> Tanggal Lahir</strong>
                <p class="text-muted">
                    {{ patientData.TGLLAHIR }} ({{ patientData.USIA_LENGKAP || patientData.USIA }})
                </p>

                <Divider />

                <strong><i class="fas fa-pray mr-1"></i> Agama</strong>
                <p class="text-muted">{{ patientData.AGAMADISPLAY || '-' }}</p>

                <Divider />

                <strong><i class="fas fa-map-marker-alt mr-1"></i> Alamat</strong>
                <p class="text-muted">{{ alamatLengkap }}</p>

                <Divider />

                <strong><i class="fas fa-phone mr-1"></i> No. Telepon</strong>
                <p class="text-muted">{{ patientData.NOTELP || '-' }}</p>

                <Divider />

                <strong><i class="fas fa-id-card mr-1"></i> No. Kartu (BPJS/Asuransi)</strong>
                <p class="text-muted">{{ patientData.NO_KARTU || '-' }}</p>

                <Divider />

                <div class="d-flex justify-content-between align-items-start">
                    <strong><i class="fas fa-briefcase mr-1"></i> Pekerjaan</strong>
                    <Button v-if="!editingPekerjaan" icon="pi pi-pencil" text rounded size="small"
                        @click="startEditPekerjaan" v-tooltip.top="'Edit Pekerjaan'" />
                </div>

                <template v-if="!editingPekerjaan">
                    <p class="text-muted mb-0">{{ pekerjaanLabel }}</p>
                    <p class="text-muted mb-0" v-if="isTniPolri">
                        NRP: {{ patientData.NO_NRP || '-' }} &nbsp;|&nbsp; Pangkat: {{ patientData.PANGKAT || '-' }}
                        <br>
                        Satuan: {{ patientData.SATUAN || '-' }}
                    </p>
                </template>

                <template v-else>
                    <div class="mt-2">
                        <Select v-model="editForm.pekerjaan" :options="pekerjaanOptions" optionLabel="label"
                            placeholder="Pilih Pekerjaan" class="w-100" />
                    </div>

                    <div class="row mt-2" v-if="isEditTniPolri">
                        <div class="col-6">
                            <label class="font-bold d-block">NRP</label>
                            <InputText v-model="editForm.no_nrp" class="w-100" />
                        </div>
                        <div class="col-6">
                            <label class="font-bold d-block">Hubungan TNI/POLRI</label>
                            <Select v-model="editForm.hubungan_tni_polri" :options="hubunganTNIOptions"
                                optionLabel="label" class="w-100" />
                        </div>
                    </div>

                    <div class="row mt-2" v-if="isEditTniPolri">
                        <div class="col-6">
                            <label class="font-bold d-block">Pangkat</label>
                            <InputText v-model="editForm.pangkat" class="w-100" />
                        </div>
                        <div class="col-6">
                            <label class="font-bold d-block">Satuan</label>
                            <Select v-model="editForm.satuan" :options="listYonif" optionLabel="nama_yonif"
                                placeholder="Pilih atau ketik Satuan" class="w-100" filter editable
                                :loading="loadingYonif" />
                        </div>
                    </div>

                    <div class="mt-2 text-right">
                        <Button label="Batal" icon="pi pi-times" text @click="editingPekerjaan = false"
                            class="mr-2" />
                        <Button label="Simpan" icon="pi pi-save" :loading="savingPekerjaan"
                            @click="savePekerjaan" />
                    </div>
                </template>
            </div>
        </div>

        <Message v-else-if="searched && !isLoading" severity="warn" :closable="false">
            Data pasien dengan NORM "{{ norm }}" tidak ditemukan.
        </Message>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Avatar from 'primevue/avatar';
    import Divider from 'primevue/divider';
    import { EventBus } from '../bus';
    export default {
        components: {
            Loading,
            Avatar,
            Divider
        },
        props: {
            norm: {
                type: [String, Number],
                default: ''
            },
            noregister: {
                type: [String, Number],
                default: ''
            },
        },
        data() {
            return {
                patientData: null,
                searched: false,
                isLoading: false,
                editingPekerjaan: false,
                savingPekerjaan: false,
                editForm: {
                    pekerjaan: null,
                    no_nrp: '',
                    hubungan_tni_polri: null,
                    pangkat: '',
                    satuan: '',
                },
                pekerjaanOptions: [
                    { kode: '1', label: 'PNS' },
                    { kode: '2', label: 'POLRI' },
                    { kode: '7', label: 'TNI' },
                    { kode: '3', label: 'SWASTA' },
                    { kode: '4', label: 'BUMN' },
                    { kode: '5', label: 'MAHASISWA' },
                    { kode: '6', label: 'TIDAK/BELUM BEKERJA' },
                ],
                hubunganTNIOptions: [
                    { kode: '1', label: 'Diri Sendiri' },
                    { kode: '2', label: 'Suami' },
                    { kode: '3', label: 'Istri' },
                    { kode: '4', label: 'Anak' },
                ],
                listYonif: [],
                loadingYonif: false,
            };
        },
        computed: {
            jenisKelaminLabel() {
                if (!this.patientData) return '';
                return this.patientData.JENISKELAMIN === 'P' ? 'Perempuan' : 'Laki-laki';
            },
            alamatLengkap() {
                if (!this.patientData) return '-';
                const bagian = [
                    this.patientData.ALAMAT,
                    this.patientData.namakelurahan,
                    this.patientData.namakecamatan,
                    this.patientData.namakota,
                    this.patientData.nama_provinsi,
                ].filter(v => v && String(v).trim() !== '');
                return bagian.length ? bagian.join(', ') : '-';
            },
            pekerjaanLabel() {
                if (!this.patientData) return '-';
                const found = this.pekerjaanOptions.find(o => o.kode === String(this.patientData.PEKERJAAN));
                return found ? found.label : (this.patientData.PEKERJAAN || '-');
            },
            isTniPolri() {
                return ['TNI', 'POLRI'].includes(this.pekerjaanLabel);
            },
            isEditTniPolri() {
                return ['TNI', 'POLRI'].includes(this.editForm.pekerjaan?.label);
            },
        },
        watch: {
            norm(newVal) {
                if (newVal) {
                    this.getdata_pasien();
                } else {
                    this.patientData = null;
                    this.searched = false;
                }
            },
        },
        mounted() {
            if (this.norm) {
                this.getdata_pasien();
            }
            this.getYonif();
        },
        methods: {
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            async getYonif() {
                this.loadingYonif = true;
                await axios.post('/get_yonif')
                    .then(response => {
                        this.listYonif = response.data || [];
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => this.loadingYonif = false)
            },
            async getdata_pasien() {
                this.isLoading = true;
                this.searched = true;
                this.patientData = null;

                await axios.post('/masterpasien', {
                        mode: 3,
                        nomr: this.norm
                    })
                    .then(response => {
                        const list = response.data.response;
                        this.patientData = (list && list.length) ? list[0] : null;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => this.isLoading = false)
            },
            startEditPekerjaan() {
                this.editForm = {
                    pekerjaan: this.pekerjaanOptions.find(o => o.kode === String(this.patientData.PEKERJAAN)) ||
                        null,
                    no_nrp: this.patientData.NO_NRP || '',
                    hubungan_tni_polri: this.hubunganTNIOptions.find(o => o.kode === String(this.patientData
                        .HUBUNGAN_TNI_POLRI)) || null,
                    pangkat: this.patientData.PANGKAT || '',
                    satuan: this.listYonif.find(o => o.nama_yonif === this.patientData.SATUAN) ||
                        this.patientData.SATUAN || null,
                };
                this.editingPekerjaan = true;
            },
            async savePekerjaan() {
                if (!this.editForm.pekerjaan) {
                    this.open('warning', 'Pilih pekerjaan terlebih dahulu');
                    return;
                }

                const satuanValue = (this.editForm.satuan && typeof this.editForm.satuan === 'object') ?
                    (this.editForm.satuan.nama_yonif || '') : (this.editForm.satuan || '');

                const payload = {
                    nomr: this.patientData.NOMR,
                    noregister: this.noregister,
                    pekerjaan: this.editForm.pekerjaan.kode,
                    no_nrp: this.isEditTniPolri ? this.editForm.no_nrp : '',
                    hubungan_tni_polri: this.isEditTniPolri ? (this.editForm.hubungan_tni_polri?.kode || '') : '',
                    pangkat: this.isEditTniPolri ? this.editForm.pangkat : '',
                    satuan: this.isEditTniPolri ? satuanValue : '',
                };

                this.savingPekerjaan = true;
                await axios.post('/update_pekerjaan_pasien', payload)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.patientData.PEKERJAAN = payload.pekerjaan;
                            this.patientData.NO_NRP = payload.no_nrp;
                            this.patientData.HUBUNGAN_TNI_POLRI = payload.hubungan_tni_polri;
                            this.patientData.PANGKAT = payload.pangkat;
                            this.patientData.SATUAN = payload.satuan;
                            this.editingPekerjaan = false;
                            this.open('success', response.data.message || 'Pekerjaan berhasil diperbarui');
                        } else {
                            this.open('warning', response.data.message || 'Gagal memperbarui pekerjaan');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Gagal memperbarui pekerjaan');
                    })
                    .finally(() => this.savingPekerjaan = false)
            },
        },
    }

</script>
