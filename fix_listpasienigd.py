"""Fix ListPasienIgdComponent.vue — excise embedded <script> blocks,
   restore truncated template, re-attach correct script and style."""

filepath = r"C:\xampp\htdocs\backend_dashbord\resources\js\components\igd\ListPasienIgdComponent.vue"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The corruption marker is the button tag that runs into <script>
CORRUPTION_MARKER = (
    '                                <button class="btn-aksi btn-aksi-info" @click="showdetails(row)">\n'
    '                      <script>\n'
)
assert CORRUPTION_MARKER in content, "Corruption marker not found"

# Everything before the marker is correct template
good_template = content[:content.index(CORRUPTION_MARKER)]

# Extract style sections — they appear after the LAST </script> in the file
SCRIPT_CLOSE = '</script>\n'
last_script_close_pos = content.rfind(SCRIPT_CLOSE)
style_sections = content[last_script_close_pos + len(SCRIPT_CLOSE):]
# style_sections now contains everything after the actual </script> closing tag

# Build corrected file
template_tail = """                                <button class="btn-aksi btn-aksi-info" @click="showdetails(row)">
                                    <i class="pi pi-folder-open"></i> Rekam Medis
                                </button>
                                <button class="btn-aksi btn-aksi-warning" @click="showInformConsent(row)">
                                    <i class="pi pi-file"></i> Consent
                                </button>
                                <button class="btn-aksi btn-aksi-default" @click="siriraj_score(row.NOPENDAFTARAN)">
                                    <i class="pi pi-file-pdf"></i> Siriraj Skor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>
"""

script_section = """
<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../bus';
    import ProgressBar from 'primevue/progressbar';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import ConfirmDialog from 'primevue/confirmdialog';

    export default {
        components: {
            Loading,
            Tabs, TabList, Tab, TabPanels, TabPanel,
            ProgressBar,
            ConfirmDialog
        },
        props: {
            msg: String
            },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    mode: 'history15',
                    kodeunit: '',
                    norm: '',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
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
                details_pasien: {},
                ruangan: [],
                dataruangan_realtime: [],
                kode_unit_login: null,
                splitParts_kode_unit: [],
                characterFound: false,
                showmessage: false,
                InformConsent: false,
                list_notif_penunjang:[],
                searchNama: '',
                filterTriase: 'SEMUA',
                filterUsia: 'SEMUA',
                filterDokter: 'SEMUA',
                dokterScrollShowLeft: false,
                dokterScrollShowRight: false,
                expandedKeluhan: {},
                now: Date.now(),
                _losTimer: null,
                showLaporanDokter: false,
                laporan: {
                    list: [],
                    loading: false,
                    tanggal: new Date().toISOString().slice(0, 10),
                    tanggalObj: new Date(),
                    keyword: '',
                    filterVerif: null,
                    activeTab: 'detail'
                },
                laporanVerifOptions: [
                    { label: 'Sudah Diverifikasi', value: '1' },
                    { label: 'Belum Diverifikasi', value: '0' },
                ]
            };
        },
        computed: {
            factFiltered() {
                let filtered = this.fact || [];

                if (this.searchNama && this.searchNama.trim()) {
                    const keyword = this.searchNama.trim().toLowerCase();
                    filtered = filtered.filter(row => {
                        return [
                            row.NAMAPASIEN,
                            row.DATA_SINGKAT,
                            row.NOMR,
                            row.NAMADOKTER,
                        ].some(val => String(val || '').toLowerCase().includes(keyword));
                    });
                }

                if (this.filterTriase !== 'SEMUA') {
                    filtered = filtered.filter(row => row.HASIL_TRIASE === this.filterTriase);
                }

                if (this.filterUsia !== 'SEMUA') {
                    filtered = filtered.filter(row => this.getKelompokUsia(row) === this.filterUsia);
                }

                if (this.filterDokter !== 'SEMUA') {
                    filtered = filtered.filter(row => (row.NAMADOKTER || '') === this.filterDokter);
                }

                return filtered;
            },
            penunjangMap() {
                const map = {};
                (this.list_notif_penunjang || []).forEach(n => {
                    const key = String(n.NOREGISTER).trim();
                    if (!map[key]) map[key] = [];
                    map[key].push(n);
                });
                return map;
            },
            triaseStats() {
                const stats = {
                    EMERGENSI: 0,
                    URGENT: 0,
                    'NON URGENT': 0,
                    'DEATH ON ARRIVAL': 0,
                    LAINNYA: 0,
                    TOTAL: 0
                };

                if (this.fact) {
                    stats.TOTAL = this.fact.length;
                    this.fact.forEach(row => {
                        if (row.HASIL_TRIASE === 'EMERGENSI') stats.EMERGENSI++;
                        else if (row.HASIL_TRIASE === 'URGENT') stats.URGENT++;
                        else if (row.HASIL_TRIASE === 'NON URGENT') stats['NON URGENT']++;
                        else if (row.HASIL_TRIASE === 'DEATH ON ARRIVAL') stats['DEATH ON ARRIVAL']++;
                        else stats.LAINNYA++;
                    });
                }
                return stats;
            },
            usiaStats() {
                const stats = { BAYI: 0, BALITA: 0, REMAJA: 0, DEWASA: 0, LANSIA: 0 };
                (this.fact || []).forEach(row => {
                    const grp = this.getKelompokUsia(row);
                    if (stats[grp] !== undefined) stats[grp]++;
                });
                return stats;
            },
            daftarDokter() {
                const map = {};
                (this.fact || []).forEach(row => {
                    const nama = (row.NAMADOKTER || '').trim();
                    if (!nama) return;
                    if (!map[nama]) map[nama] = 0;
                    map[nama]++;
                });
                return Object.entries(map)
                    .map(([nama, jumlah]) => ({ nama, jumlah }))
                    .sort((a, b) => a.nama.localeCompare(b.nama));
            },
            laporanFiltered() {
                let data = this.laporan.list;
                const kw = (this.laporan.keyword || '').toLowerCase().trim();
                if (kw) {
                    data = data.filter(d =>
                        (d.NOMR || '').toLowerCase().includes(kw) ||
                        (d.NAMAPASIEN || '').toLowerCase().includes(kw) ||
                        (d.dpjp || '').toLowerCase().includes(kw) ||
                        (d.keterangan || '').toLowerCase().includes(kw)
                    );
                }
                if (this.laporan.filterVerif !== null && this.laporan.filterVerif !== undefined) {
                    data = data.filter(d => d.telah_verif === this.laporan.filterVerif);
                }
                return data;
            },
            laporanSummary() {
                const map = {};
                this.laporan.list.forEach(p => {
                    const key = p.dpjp || '(Tidak Diisi)';
                    if (!map[key]) map[key] = { dpjp: key, total: 0, verif: 0, belum: 0 };
                    map[key].total++;
                    if (p.telah_verif === '1') map[key].verif++;
                    else map[key].belum++;
                });
                return Object.values(map)
                    .map(d => ({ ...d, persen: d.total > 0 ? Math.round((d.verif / d.total) * 100) : 0 }))
                    .sort((a, b) => b.total - a.total);
            },
            laporanJumlahVerif() {
                return this.laporan.list.filter(function(x) { return x.telah_verif === '1'; }).length;
            },
            laporanJumlahBelumVerif() {
                return this.laporan.list.filter(function(x) { return x.telah_verif !== '1'; }).length;
            },
            laporanPersenVerif() {
                if (!this.laporan.list.length) return 0;
                return Math.round((this.laporanJumlahVerif / this.laporan.list.length) * 100);
            }
            },
        watch: {
            daftarDokter() {
                this.$nextTick(() => this.checkDokterScroll());
            }
            },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this._losTimer = setInterval(() => { this.now = Date.now(); }, 60000);
            this.$nextTick(() => this.checkDokterScroll());
        },
        beforeUnmount() {
            if (this._losTimer) clearInterval(this._losTimer);
        },
        async created() {
            this.form.startdate = new Date();
            await this.getnamaruangan_poli();
            this.getdata_pasien(6);
        },
        methods: {
            checkDokterScroll() {
                const el = this.$refs.dokterScroll;
                if (!el) return;
                this.dokterScrollShowLeft  = el.scrollLeft > 0;
                this.dokterScrollShowRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
            },
            onDokterScroll() {
                this.checkDokterScroll();
            },
            scrollDokter(dir) {
                const el = this.$refs.dokterScroll;
                if (!el) return;
                el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
            },
            onLaporanDateSelect(date) {
                const d = new Date(date);
                const yyyy = d.getFullYear();
                const mm   = String(d.getMonth() + 1).padStart(2, '0');
                const dd   = String(d.getDate()).padStart(2, '0');
                this.laporan.tanggal = `${yyyy}-${mm}-${dd}`;
            },
            buka_laporan_dokter() {
                this.showLaporanDokter = true;
                this.fetchLaporanDokter();
            },
            resetLaporanFilter() {
                this.laporan.tanggal     = new Date().toISOString().slice(0, 10);
                this.laporan.tanggalObj  = new Date();
                this.laporan.keyword     = '';
                this.laporan.filterVerif = null;
                this.fetchLaporanDokter();
            },
            async fetchLaporanDokter() {
                this.laporan.loading = true;
                this.laporan.list    = [];
                try {
                    const response = await axios.post('/get_triase_by_tanggal', { tanggal: this.laporan.tanggal });
                    this.laporan.list = Array.isArray(response.data.response) ? response.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.laporan.loading = false;
                }
            },
            laporanRowClass(data) {
                return data.telah_verif === '1' ? 'laporan-row-verified' : 'laporan-row-pending';
            },
            notify(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            onDokterDikonfirmasi(data) {
                this.details_pasien.NAMADOKTER         = data.NAMADOKTER;
                this.details_pasien.KDDOKTER           = data.KDDOKTER;
                this.details_pasien.KONFIRMASI_PS_SAYA = data.KONFIRMASI_PS_SAYA;

                const idx = this.fact.findIndex(r => r.NOPENDAFTARAN === this.details_pasien.NOPENDAFTARAN);
                if (idx !== -1) {
                    this.fact[idx] = {
                        ...this.fact[idx],
                        NAMADOKTER:         data.NAMADOKTER,
                        KDDOKTER:           data.KDDOKTER,
                        KONFIRMASI_PS_SAYA: data.KONFIRMASI_PS_SAYA
                    };
                }
            },
            showdetails(pasien) {
                if (this.displayBasic2) {
                    this.displayBasic2 = false;
                    this.$nextTick(() => {
                        this.details_pasien = pasien;
                        this.displayBasic2  = true;
                    });
                } else {
                    this.details_pasien = pasien;
                    this.displayBasic2  = true;
                }
            },
            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            showInformConsent(data) {
                this.details_pasien = data;
                this.InformConsent = true;
            },
            toggleKeluhan(nopendaftaran) {
                this.expandedKeluhan = {
                    ...this.expandedKeluhan,
                    [nopendaftaran]: !this.expandedKeluhan[nopendaftaran]
                };
            },
            pilihtanggal(event) {
                this.filterDokter = 'SEMUA';
                this.getdata_pasien(6);
            },
            async getnamaruangan_poli() {
                this.form.mode = 0;
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        this.ruangan = response.data;

                        const igd = this.ruangan.find(n => n.KODE_BPJS === 'IGD');
                        if (igd) {
                            this.form.kodeunit = igd.KODE;
                        }
                    })
                    .catch(e => console.log(e))
                    .finally(() => this.isLoading = false);
            },
            siriraj_score(noregister) {
                window.open('/siriraj-score/' + noregister, '_blank');
            },
            triaseBadgeClass(nilai) {
                const map = {
                    'EMERGENSI':       'triase-bg-emergensi',
                    'URGENT':          'triase-bg-urgent',
                    'NON URGENT':      'triase-bg-nonurgent',
                    'DEATH ON ARRIVAL':'triase-bg-doa'
                };
                return map[nilai] || 'triase-bg-default';
            },
            triaseBadgeIcon(nilai) {
                const map = {
                    'EMERGENSI':       'fas fa-exclamation-triangle',
                    'URGENT':          'fas fa-clock',
                    'NON URGENT':      'fas fa-check-circle',
                    'DEATH ON ARRIVAL':'fas fa-times-circle'
                };
                return map[nilai] || 'fas fa-question-circle';
            },
            triaseBadgeLabel(nilai) {
                const map = {
                    'EMERGENSI':       'Emergensi',
                    'URGENT':          'Urgent',
                    'NON URGENT':      'Non Urgent',
                    'DEATH ON ARRIVAL':'Death on Arrival'
                };
                return map[nilai] || nilai;
            },
            getKelompokUsia(row) {
                const tahun = (row.USIA_PASIEN && row.USIA_PASIEN.tahun != null) ? Number(row.USIA_PASIEN.tahun) : 0;
                if (tahun < 1)  return 'BAYI';
                if (tahun < 5)  return 'BALITA';
                if (tahun < 18) return 'REMAJA';
                if (tahun < 60) return 'DEWASA';
                return 'LANSIA';
            },
            usiaFilterBadgeClass(grp) {
                const map = { BAYI: 'badge-pink', BALITA: 'badge-info', REMAJA: 'badge-teal', DEWASA: 'badge-warning', LANSIA: 'badge-secondary' };
                return map[grp] || 'badge-secondary';
            },
            _masukMenit(row) {
                if (!row.MASUKPOLY_DISPLAY) return null;
                const m = row.MASUKPOLY_DISPLAY.match(/^(\\d{2})-(\\d{2})-(\\d{4})\\s+(\\d{2}):(\\d{2})/);
                if (!m) return null;
                const [, dd, mm, yyyy, hh, min] = m;
                const masuk  = new Date(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(min));
                const diffMs = this.now - masuk;
                return diffMs < 0 ? null : Math.floor(diffMs / 60000);
            },
            getLOS(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return null;
                const h  = Math.floor(totalMins / 60);
                const mi = totalMins % 60;
                return h > 0 ? `${h}j ${mi}m` : `${mi}m`;
            },
            getLOSClass(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return 'los-normal';
                if (totalMins >= 360) return 'los-danger';
                if (totalMins >= 120) return 'los-warning';
                return 'los-normal';
            },
            verifAging(row) {
                const totalMins = this._masukMenit(row);
                if (totalMins === null) return { level: 'fresh', durasi: '' };
                const h      = Math.floor(totalMins / 60);
                const mi     = totalMins % 60;
                const durasi = h > 0 ? `${h}j ${mi}m` : `${mi}m`;
                if (totalMins < 60)  return { level: 'fresh',   durasi };
                if (totalMins < 120) return { level: 'warning',  durasi };
                return                      { level: 'urgent',   durasi };
            },
            triasePillKey(nilai) {
                const map = {
                    'EMERGENSI':       'emergensi',
                    'URGENT':          'urgent',
                    'NON URGENT':      'nonurgent',
                    'DEATH ON ARRIVAL':'doa'
                };
                return map[nilai] || 'default';
            },
            async getdata_pasien(mode) {
                this.fact = [];
                this.searchNama = '';
                this.filterTriase = 'SEMUA';
                this.filterUsia = 'SEMUA';
                this.form.mode = mode;
                this.form.jenis_rawat = 'JALAN';
                this.form.kodeunit = 'IGD';
                this.isLoading = true;

                try {
                    const response = await axios.post('/getpasien_api', this.form);
                    this.fact = response.data.response || [];
                    this.get_notif_penunjang_json();
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            },
            async get_notif_penunjang_json() {
                try {
                    const tglawal = this.form.startdate;
                    this.form.mode = 6;

                    const kode_unit = this.ruangan.filter(n => n.KODE_BPJS == 'IGD');
                    if (kode_unit.length > 0) {
                        this.form.kodeunit = kode_unit[0].KODE;
                    }

                    const response = await axios.post('/get_notif_penunjang_json', this.form);
                    const results = response.data.results || [];
                    this.list_notif_penunjang = results;

                    this.fact = this.fact.map(row => {
                        const noReg = String(row.NOPENDAFTARAN).trim();
                        const matched = results.filter(n => {
                            const noPenunjang = String(n.NOREGISTER).trim();
                            return noPenunjang === noReg
                                || noPenunjang.includes(noReg)
                                || noReg.includes(noPenunjang);
                        });
                        return { ...row, PENUNJANG: matched };
                    });
                } catch (error) {
                    console.error('get_notif_penunjang_json:', error);
                }
            }
        }
    }

</script>
"""

new_content = good_template + template_tail + script_section + style_sections

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(new_content)

print("Fixed: ListPasienIgdComponent.vue")
