"""Fix TriaseIgdComponent.vue — remove embedded <script> blocks,
   restore truncated template, re-attach correct script and style."""

filepath = r"C:\xampp\htdocs\backend_dashbord\resources\js\components\igd\TriaseIgdComponent.vue"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The template is correct up to the truncated button at line 619-620.
# The corruption marker is the button attribute running into <script>
CORRUPTION_MARKER = (
    '                                        <button class="btn-icon-pindah" @click="pasiwn_pindah_ruang(row)"\n'
    '                                            title="Pindah Ruangan"<script>\n'
)

assert CORRUPTION_MARKER in content, "Corruption marker not found — file may have changed"

# Everything before the marker is good template
good_part = content[:content.index(CORRUPTION_MARKER)]

# What comes after the corruption marker — we need to extract the CSS from the style block
# The CSS content starts after the second </script> (line 1118) and ends at </style>
# We also have a second <style scoped> block after that.
# We'll just hardcode the replacement tail.

tail = r"""                                        <button class="btn-icon-pindah" @click="pasiwn_pindah_ruang(row)"
                                            title="Pindah Ruangan">
                                            <i class="pi pi-arrow-right-arrow-left"></i>
                                        </button>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span :class="row.JENISRAWAT === 'INAP' ? 'jenis-badge jenis-inap' : 'jenis-badge jenis-jalan'">
                                            {{ row.JENISRAWAT }}
                                        </span>
                                    </td>
                                    <td class="align-middle">
                                        <div class="aksi-group">
                                            <button class="btn-aksi btn-aksi-danger"
                                                @click="confirm_tidak_merawat(row)"
                                                v-if="row.JENISRAWAT=='INAP'" title="Tidak Merawat">
                                                <i class="pi pi-times"></i> Tidak Merawat
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import Message from 'primevue/message';
    import ConfirmDialog from 'primevue/confirmdialog';
    import {
        FilterMatchMode
    } from 'primevue/api';

    export default {
        components: {
            Loading,
            Sidebar,
            Dialog,
            Tabs, TabList, Tab, TabPanels, TabPanel,
            Message,
            ProgressBar,
            ConfirmDialog
            },
        props: {
            msg: String
        },
        data() {
            return {
                globalFilter: '',
                sortMode: 'multiple',
                showAdvanced: false,
                filterJenisRawat: 'SEMUA',
                opsiJenisRawat: ['SEMUA', 'INAP', 'JALAN'],
                filters: {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                },
                formData: {
                    patientName: '',
                    patientId: '',
                    withdrawalReason: null
                },
                fact: [],
                errors: {},
                antrian_pasien: 0,
                class_button: 'p-button',
                temp_mode:'',
                form: {
                    startdate: '',
                    enddate: '',
                    parametersearch: '',
                    alasan_tarikpasien: '',
                    mode: 'history15',
                    kodeunit: '',
                    norm: '',
                    alasan: '',
                    nama_pasien:'',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
                    dokterselected: null,
                    ruangan_tujuan_transfer: null,
                    old_ruangan: 0,
                    id_ruangan: 0,
                    noregister: ''
                },
                int_kd_ruangan_user: null,
                isLoading: false,
                fullPage: true,
                visibleFull: false,
                displayBasic2: false,
                form_pindahruang: false,
                namaruagan_asal: null,
                details_pasien: [],
                ruangan: [],
                dataruangan_realtime: [],
                kode_unit_login: null,
                splitParts_kode_unit: [],
                characterFound: false,
                showmessage: false,
                showPindahruang: false,
                listPasienTidakDirawat: [],
                tampilkanDialogLPT: false,
                tariPasienDariIniBukanPasienKami: false,
                dataPasien: null
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
        },
        created() {
            this.getdata_pasien(4);
            this.getnamaruangan_poli();
            this.getkode_unit();
            this.getnotif_pindahruangan();
        },
        computed: {
            listDokter() {
                const map = {};
                (this.fact || []).forEach(row => {
                    if (row.NAMADOKTER && !map[row.NAMADOKTER]) {
                        map[row.NAMADOKTER] = { NAMADOKTER: row.NAMADOKTER };
                    }
                });
                return Object.values(map).sort((a, b) => a.NAMADOKTER.localeCompare(b.NAMADOKTER));
            },
            factFilteredNamaPasien() {
                if (!this.form.dokterselected) return this.fact || [];
                return (this.fact || []).filter(
                    row => row.NAMAPASIEN === this.form.nama_pasien
                );
            },
            factFiltered() {
                let result = this.fact || [];
                if (this.form.nama_pasien && this.form.nama_pasien.trim() !== '') {
                    const keyword = this.form.nama_pasien.trim().toLowerCase();
                    result = result.filter(row =>
                        String(row.NAMAPASIEN || '').toLowerCase().includes(keyword)
                    );
                }
                if (this.form.dokterselected) {
                    result = result.filter(row =>
                        row.NAMADOKTER === this.form.dokterselected.NAMADOKTER
                    );
                }
                if (this.filterJenisRawat && this.filterJenisRawat !== 'SEMUA') {
                    result = result.filter(row => row.JENISRAWAT === this.filterJenisRawat);
                }
                return result;
            },
            filteredDataPasien() {
                if (!this.globalFilter || this.globalFilter.trim() === '') {
                    return this.listPasienTidakDirawat || [];
                }
                const searchTerm = this.globalFilter.toLowerCase().trim();
                return (this.listPasienTidakDirawat || []).filter(item =>
                    String(item.NOSEP || '').toLowerCase().includes(searchTerm) ||
                    String(item.NAMAPASIEN || '').toLowerCase().includes(searchTerm) ||
                    String(item.NOMR || '').toLowerCase().includes(searchTerm)
                );
            },
            jumlahRawatInap() {
                return (this.factFiltered || []).filter(r => r.JENISRAWAT === 'INAP').length;
            },
            jumlahRawatJalan() {
                return (this.factFiltered || []).filter(r => r.JENISRAWAT !== 'INAP').length;
            },
            jumlahWaitingList() {
                return (this.factFiltered || []).filter(r => r.KODECARABAYAR == 27 || r.KODECARABAYAR == 28).length;
            }
            },
        methods: {
            applyDokterFilter() {
                // filter reaktif via computed, tidak perlu reload data
            },
            print_soap(noregister) {
                window.open('/print-soap/' + noregister, '_blank');
            },
            print_resume(noregister) {
                window.open('/print-resume-pulang/' + noregister, '_blank');
            },
            konsultasi_dokter(noregister) {
                window.open('/konsultasi-dokter/' + noregister, '_blank');
            },
            siriraj_score(noregister) {
                window.open('/siriraj-score/' + noregister, '_blank');
            },
            validateForm() {
                if (!this.formData.patientName.trim()) {
                    this.errors.patientName = 'Nama pasien harus diisi';
                }
            },
            func_tarik_pasien(data) {
                this.tariPasienDariIniBukanPasienKami = true;
                this.dataPasien = data;
                this.pasien_sedang_rawat_inap();
                this.form.old_ruangan = data.KODERUANGAN;
                this.form.noregister = data.NOPENDAFTARAN;
                this.details_pasien = data;
            },
            show_list_pasien_pindah_ruang() {
                this.showPindahruang = true;
            },
            checkCharacter(param) {
                if (typeof param === 'string') {
                    return param.includes(',');
                }
                return false;
            },
            getkode_unit() {
                axios.post('/getruangan_user_login').then(response => {
                    this.kode_unit_login = response.data;
                    this.splitParts_kode_unit = [];
                    this.characterFound = this.checkCharacter(this.kode_unit_login);
                    if (this.characterFound) {
                        this.splitParts_kode_unit = this.kode_unit_login.split(',').map(i => i.trim());
                    } else {
                        this.splitParts_kode_unit.push(this.kode_unit_login);
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => this.isLoading = false);
            },
            showdetails(pasien) {
                this.openBasic2();
                this.details_pasien = pasien;
            },
            async change_ruangan(e) {
                this.form.kodeunit = e.value.KODE;
                this.getdata_pasien(4);
            },
            async refresh_form() {
                this.form.kodeunit = this.temp_mode;
                this.getdata_pasien(4);
            },
            confirm_tidak_merawat(data) {
                this.$confirm.require({
                    message: 'Konfirmasi bahwa Anda tidak merawat pasien: ' + data.NAMAPASIEN + '?',
                    header: 'Konfirmasi',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        this.tidak_merawat_pasien_ini(data);
                    },
                    reject: () => {
                        console.log('batal');
                    }
                });
            },
            async tidak_merawat_pasien_ini(data) {
                this.isLoading = true;
                await axios.post('/tidak_merawat_pasien_ini', {
                        noregister: data.NOPENDAFTARAN,
                        los: data.JLM_HARI_RAWAT
                    })
                    .then(response => {
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Berhasil diproses");
                            const index = this.fact.findIndex(i => i.NOPENDAFTARAN === data.NOPENDAFTARAN);
                            if (index > -1) this.fact.splice(index, 1);
                        } else {
                            this.open("warning", response.data.metadata.message);
                        }
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async pasiwn_pindah_ruang(data) {
                this.pasien_sedang_rawat_inap();
                this.form.old_ruangan = data.KODERUANGAN;
                this.namaruagan_asal = data.POLI;
                this.form_pindahruang = true;
                this.form.noregister = data.NOPENDAFTARAN;
                this.details_pasien = data;
            },
            open(type, message) {
                this.$toast.open({
                    message,
                    position: 'top-right',
                    type,
                    duration: 4000,
                    dismissible: true
                });
            },
            async excute_pindah_ruangan(data) {
                this.form.id_ruangan = data.KD_RUANGAN;
                this.isLoading = true;
                await axios.post('/pasien_pindah_ruangan', this.form)
                    .then(response => {
                        if (response.data == 200) {
                            this.open("success", "Berhasil pindah ruangan");
                        } else {
                            this.open("warning", "Gagal proses — apakah bed masih tersedia?");
                            return;
                        }
                        this.tariPasienDariIniBukanPasienKami = false;
                        this.form_pindahruang = false;
                        this.getdata_pasien(4);
                        this.getdata_pasien(9);
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getdata_pasien(mode) {
                this.form.mode = mode;
                this.isLoading = true;
                await axios.post('/getpasien_api', this.form)
                    .then(response => {
                        if (mode != 9) {
                            this.fact = response.data.response || [];
                            this.showmessage = this.fact.some(r => r.KODECARABAYAR == 27 || r.KODECARABAYAR == 28);
                            this.form.dokterselected = null;
                        } else {
                            this.listPasienTidakDirawat = response.data.response || [];
                            this.tampilkanDialogLPT = true;
                        }
                        this.get_notif_penunjang_json(mode);
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },

            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            async pasien_sedang_rawat_inap() {
                await axios.post('/pasien_sedang_rawat_inap')
                    .then(response => {
                        this.isLoading = true;
                        this.dataruangan_realtime = response.data.response;

                        for (let i = 0; i < this.dataruangan_realtime.length; i++) {
                            this.dataruangan_realtime[i].MYROOM = 0;
                            for (let j = 0; j < this.splitParts_kode_unit.length; j++) {
                                if (this.dataruangan_realtime[i].KD_RUANGAN == this.splitParts_kode_unit[j]) {
                                    this.dataruangan_realtime[i].MYROOM = 1;
                                }
                            }
                        }

                        this.isLoading = false;
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getnamaruangan_poli() {
                this.form.mode = 1;
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        this.ruangan = response.data;
                    })
                    .catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getnotif_pindahruangan() {
                await axios.post('/getnotif_pindahruangan')
                    .then(response => {
                        this.antrian_pasien = response.data.response.antrian;
                        this.class_button = this.antrian_pasien > 0 ? 'p-button p-button-danger' : 'p-button';
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async get_notif_penunjang_json(mode) {
                try {
                    const tglawal = this.form.startdate;
                    this.form.mode = mode;

                    if (mode == 4) {
                        this.form.kodeunit = "";
                    }

                    const response = await axios.post('/get_notif_penunjang_json', this.form);

                    const results = response.data.results || [];
                    this.fact.forEach((row, index) => {
                        const noReg = String(row.NOPENDAFTARAN).trim();
                        const matched = results.filter(n => {
                            const noPenunjang = String(n.NOREGISTER).trim();
                            return noPenunjang === noReg
                                || noPenunjang.includes(noReg)
                                || noReg.includes(noPenunjang);
                        });
                        this.fact[index] = { ...row, PENUNJANG: matched };
                    });

                } catch (error) {
                    console.error('get_notif_penunjang_json:', error);
                }
            }
        }
    }

</script>

<style scoped>

    .filter-label {
        display: block;
        font-size: .75rem;
        font-weight: 600;
        color: #555;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: .04em;
    }

    /* ===== ADVANCED SEARCH ===== */
    .advanced-search-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #1976d2;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        padding: 4px 0;
        border-bottom: 1px dashed #1976d2;
        width: fit-content;
        user-select: none;
    }

    .advanced-search-body {
        background: #f5f8ff;
        border: 1px solid #d0e3ff;
        border-radius: 6px;
        padding: 16px;
    }

    /* ===== STAT CARDS ===== */
    .stat-card {
        display: flex;
        align-items: center;
        gap: 16px;
        border-radius: 10px;
        padding: 16px 20px;
        color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .10);
        margin-bottom: 0;
    }

    .stat-blue { background: linear-gradient(135deg, #1976d2, #42a5f5); }
    .stat-green { background: linear-gradient(135deg, #2e7d32, #66bb6a); }
    .stat-orange { background: linear-gradient(135deg, #e65100, #ffa726); }
    .stat-red { background: linear-gradient(135deg, #b71c1c, #ef5350); }

    .stat-icon { font-size: 2rem; opacity: .85; }
    .stat-value { font-size: 1.8rem; font-weight: 700; line-height: 1; }
    .stat-label { font-size: 0.82rem; opacity: .9; margin-top: 2px; }

    /* ===== TABLE ===== */
    .pasien-table thead th {
        background: #ffffff;
        text-transform: uppercase;
        letter-spacing: .05em;
        white-space: nowrap;
        vertical-align: middle;
        border-color: #bababa !important;
    }

    .pasien-table tbody tr:hover { background: #e3f2fd !important; }
    .row-waiting { background: #fff8e1 !important; }

    .row-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #e3f2fd;
        color: #1565c0;
        font-weight: 700;
        font-size: 1rem;
    }

    .pasien-nama-table { font-weight: 700; font-size: .92rem; color: #1a1a2e; }
    .pasien-nomr { font-size: .78rem; color: #555; margin-top: 2px; }
    .pasien-dokter { font-size: .78rem; color: #1976d2; margin-top: 1px; }

    .badge-status {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: .72rem;
        font-weight: 600;
    }
    .badge-status-rawat { background: #ffebee; color: #c62828; }
    .badge-status-selesai { background: #e8f5e9; color: #2e7d32; }

    .los-badge { display: inline-block; font-size: 1.1rem; font-weight: 700; color: #1565c0; }

    .cara-bayar-badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: .78rem;
        font-weight: 600;
        white-space: nowrap;
    }
    .cara-bayar-warning { background: #ffebee; color: #b71c1c; border: 1px solid #ef9a9a; }
    .cara-bayar-normal { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }

    .jenis-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: .04em;
    }
    .jenis-inap { background: #1565c0; color: #fff; }
    .jenis-jalan { background: #00695c; color: #fff; }

    /* ===== AKSI BUTTONS ===== */
    .aksi-group { display: flex; flex-direction: column; gap: 4px; }

    .btn-aksi {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 5px;
        font-size: .76rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: opacity .15s, transform .1s;
        white-space: nowrap;
    }
    .btn-aksi:hover { opacity: .85; transform: translateX(1px); }
    .btn-aksi-info { background: #1976d2; color: #fff; }
    .btn-aksi-default { background: #546e7a; color: #fff; }
    .btn-aksi-purple { background: #6a1b9a; color: #fff; }
    .btn-aksi-danger { background: #c62828; color: #fff; }

    .btn-icon-pindah {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #00acc1;
        background: #e0f7fa;
        color: #00acc1;
        cursor: pointer;
        font-size: 1rem;
        transition: background .15s, color .15s;
    }
    .btn-icon-pindah:hover { background: #00acc1; color: #fff; }

    /* ===== REKAM MEDIS HEADER ===== */
    .rm-header-card {
        background: linear-gradient(135deg, #1565c0 0%, #0288d1 100%);
        border-radius: 10px;
        padding: 20px 24px;
        margin-bottom: 16px;
        color: #fff;
    }
    .rm-header-inner { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
    .rm-patient-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .18);
        font-size: 2rem;
        flex-shrink: 0;
    }

    /* ===== TARIK PASIEN DIALOG ===== */
    .tarik-pasien-body { padding: 8px 0; }
    .tarik-info-box {
        display: flex;
        align-items: center;
        gap: 14px;
        background: #e3f2fd;
        border: 1px solid #90caf9;
        border-radius: 8px;
        padding: 14px 18px;
        margin-bottom: 20px;
    }
    .tarik-info-box .pi { font-size: 1.8rem; color: #1976d2; }
    .tarik-no-rm { font-size: 1rem; font-weight: 700; color: #1a1a2e; }
    .tarik-los { font-size: .87rem; color: #444; margin-top: 2px; }
    .tarik-ruangan-label {
        font-weight: 600;
        font-size: .85rem;
        color: #555;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: .04em;
    }
    .tarik-ruangan-grid { display: flex; flex-wrap: wrap; gap: 8px; }

    /* ===== TRANSFER LAYOUT ===== */
    .transfer-layout { display: flex; align-items: flex-start; gap: 20px; }
    .transfer-asal {
        background: #fce4ec;
        border: 1px solid #f48fb1;
        border-radius: 8px;
        padding: 16px 24px;
        min-width: 160px;
        text-align: center;
    }
    .transfer-label { font-size: .78rem; font-weight: 700; text-transform: uppercase; color: #555; margin-bottom: 6px; }
    .transfer-ruang-name { font-size: 1.05rem; font-weight: 700; color: #1a1a2e; }
    .transfer-arrow { font-size: 2rem; color: #1976d2; margin-top: 24px; }

    /* ===== DROPDOWN DOKTER ===== */
    .dropdown-dokter-option { display: flex; align-items: center; }

    /* ===== MISC ===== */
    .table-header-bar { display: flex; align-items: center; justify-content: space-between; }
    .col-pasien-info { line-height: 1.5; }
    .pasien-nama { font-weight: 700; font-size: .9rem; }
    .pasien-sep { font-weight: 600; font-size: .85rem; color: #1565c0; }
    .pasien-meta { font-size: .78rem; color: #666; }

    /* ===== NOTIF PENUNJANG ===== */
    .penunjang-list { display: flex; flex-direction: column; gap: 2px; }
    .penunjang-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #dee2e6;
        background: #f8f9fa;
        color: #495057;
        max-width: 200px;
        overflow: hidden;
    }
    .penunjang-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .dot-menunggu { background: #adb5bd; }
    .dot-selesai { background: #28a745; animation: blink-dot 2s ease-in-out infinite; }

    @keyframes blink-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
    }

    .penunjang-nama { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
    .penunjang-status { color: #adb5bd; flex-shrink: 0; }
    .penunjang-selesai { border-color: #c3e6cb; background: #f0fff4; }
    .penunjang-selesai .penunjang-status { color: #28a745; }
    .penunjang-menunggu { border-color: #dee2e6; background: #f8f9fa; }
    .penunjang-menunggu .penunjang-status { color: #adb5bd; }

</style>
"""

new_content = good_part + tail

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(new_content)

print("Fixed: TriaseIgdComponent.vue")
