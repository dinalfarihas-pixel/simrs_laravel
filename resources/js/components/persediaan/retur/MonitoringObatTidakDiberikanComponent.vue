<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="true"></loading>

        <!-- ===== FILTER ===== -->
        <div class="card card-outline card-primary shadow-sm mb-3">
            <div class="card-header d-flex align-items-center justify-content-between flex-wrap py-2" style="gap:8px">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-pills mr-2 text-primary"></i>
                    Obat Pasien yang Belum Diberikan
                </h3>
                <div class="d-flex align-items-center flex-wrap" style="gap:6px">
                    <Select v-model="depo_dipilih" :options="depo_options" optionLabel="label" optionValue="value"
                        placeholder="Pilih depo asal..." :filter="true" style="width:240px"
                        :class="{ 'p-invalid': !depo_dipilih }" @change="muat()" />
                    <SelectButton v-model="status_pasien" :options="status_options" optionLabel="label"
                        optionValue="value" :allowEmpty="false" class="p-button-sm" @change="muat()" />
                    <InputText v-model="cari" placeholder="Cari ruangan / pasien / obat..." style="width:240px" />
                    <Button icon="pi pi-file-excel" class="p-button-success p-button-sm p-button-outlined"
                        v-tooltip.top="'Export Excel'" :disabled="rows.length === 0" @click="export_excel()" />
                    <Button icon="pi pi-refresh" label="Refresh" class="p-button-secondary p-button-sm p-button-outlined"
                        :disabled="!depo_dipilih" @click="muat()" />
                </div>
            </div>
            <div class="card-body py-2 text-muted text-sm">
                Obat resep yang sudah <b>diterima ruangan</b> tetapi <b>belum diberikan</b> ke pasien dan
                <b>belum diretur</b> ke farmasi. Klik ruangan untuk melihat pasien.
                Depo asal = depo yang mengeluarkan resep; bila obat diterima dari beberapa depo, obat yang
                diterima lebih dulu dianggap dipakai lebih dulu.
            </div>
        </div>

        <!-- ===== RINGKASAN ===== -->
        <div class="row">
            <div class="col-md-3 col-6">
                <div class="small-box bg-info">
                    <div class="inner"><h3>{{ ruangan_list.length }}</h3><p>Ruangan</p></div>
                    <div class="icon"><i class="fas fa-hospital"></i></div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="small-box bg-primary">
                    <div class="inner"><h3>{{ total_pasien }}</h3><p>Pasien</p></div>
                    <div class="icon"><i class="fas fa-user-injured"></i></div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="small-box bg-warning">
                    <div class="inner"><h3>{{ data_tersaring.length }}</h3><p>Item Obat Belum Diberikan</p></div>
                    <div class="icon"><i class="fas fa-capsules"></i></div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="small-box bg-danger">
                    <div class="inner"><h3>{{ total_pasien_pulang }}</h3><p>Pasien Pulang Masih Ada Sisa Obat</p></div>
                    <div class="icon"><i class="fas fa-door-open"></i></div>
                </div>
            </div>
        </div>

        <!-- ===== DAFTAR RUANGAN ===== -->
        <div v-if="!depo_dipilih" class="card">
            <div class="card-body text-center text-muted py-5">
                <i class="fas fa-warehouse fa-2x mb-2 d-block text-primary"></i>
                Pilih <b>depo asal</b> terlebih dahulu untuk menampilkan data.
            </div>
        </div>
        <div v-else-if="ruangan_list.length === 0 && !isLoading" class="card">
            <div class="card-body text-center text-muted py-5">
                <i class="fas fa-check-circle fa-2x mb-2 d-block text-success"></i>
                Tidak ada obat pasien dari depo ini yang belum diberikan.
            </div>
        </div>
        <div class="row">
            <div v-for="r in ruangan_list" :key="r.ruangan" class="col-xl-3 col-lg-4 col-md-6 mb-3">
                <div class="card ruangan-card h-100 mb-0" :class="{ 'ruangan-aktif': r.ruangan === ruangan_dipilih }"
                    @click="pilih_ruangan(r.ruangan)">
                    <div class="card-body p-3">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="font-weight-bold ruangan-nama">
                                <i class="fas fa-procedures mr-1 text-primary"></i>{{ r.ruangan }}
                            </div>
                            <span v-if="r.pasien_pulang > 0" class="badge badge-danger"
                                v-tooltip.top="'Pasien sudah pulang tetapi masih ada sisa obat'">
                                {{ r.pasien_pulang }} pulang
                            </span>
                        </div>
                        <div class="d-flex mt-2 text-sm" style="gap:14px">
                            <div><div class="angka-besar">{{ r.jumlah_pasien }}</div><div class="text-muted">pasien</div></div>
                            <div><div class="angka-besar">{{ r.jumlah_item }}</div><div class="text-muted">item obat</div></div>
                            <div><div class="angka-besar" :class="r.maks_hari >= batas_hari ? 'text-danger' : ''">{{ r.maks_hari }}</div>
                                <div class="text-muted">hari terlama</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== PASIEN PER RUANGAN ===== -->
        <div v-if="ruangan_dipilih" ref="panelPasien" class="card card-outline card-info shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between py-2">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-user-injured mr-2 text-info"></i>
                    Pasien di {{ ruangan_dipilih }}
                    <span class="badge badge-info ml-1">{{ pasien_list.length }}</span>
                </h3>
                <Button icon="pi pi-times" class="p-button-text p-button-secondary p-button-sm" @click="ruangan_dipilih = null" />
            </div>
            <div class="card-body p-0">
                <DataTable :value="pasien_list" v-model:expandedRows="expanded" dataKey="noregister"
                    class="p-datatable-sm" stripedRows responsiveLayout="scroll">
                    <Column :expander="true" headerStyle="width:3rem" />
                    <Column field="nama_pasien" header="Nama Pasien" :sortable="true">
                        <template #body="{ data }">
                            <div class="font-weight-bold">{{ data.nama_pasien || '-' }}</div>
                            <div class="text-xs text-muted">{{ data.nomr }} · {{ data.noregister }}</div>
                        </template>
                    </Column>
                    <Column field="status_pasien" header="Status" :sortable="true" bodyClass="text-center">
                        <template #body="{ data }">
                            <span class="badge" :class="data.status_pasien === 'PULANG' ? 'badge-danger' : 'badge-success'">
                                {{ data.status_pasien === 'PULANG' ? 'Sudah pulang' : (data.status_pasien === 'DIRAWAT' ? 'Dirawat' : '-') }}
                            </span>
                        </template>
                    </Column>
                    <Column field="masuk" header="Tgl Masuk" :sortable="true"></Column>
                    <Column field="keluar" header="Tgl Keluar" :sortable="true"></Column>
                    <Column field="jumlah_item" header="Item Obat" :sortable="true" bodyClass="text-center"></Column>
                    <Column field="maks_hari" header="Hari Terlama" :sortable="true" bodyClass="text-center">
                        <template #body="{ data }">
                            <span :class="data.maks_hari >= batas_hari ? 'text-danger font-weight-bold' : ''">{{ data.maks_hari }}</span>
                        </template>
                    </Column>
                    <template #expansion="{ data }">
                        <div class="p-2">
                            <table class="table table-bordered table-sm mb-0 bg-white">
                                <thead>
                                    <tr>
                                        <th>Depo Asal</th>
                                        <th>Nama Obat</th>
                                        <th class="text-center">Satuan</th>
                                        <th class="text-center">Diterima</th>
                                        <th class="text-center">Diberikan</th>
                                        <th class="text-center">Diretur</th>
                                        <th class="text-center">Belum Diberikan</th>
                                        <th>Terakhir Diterima</th>
                                        <th class="text-center">Hari</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="o in data.obat" :key="o.BARCODE + '|' + o.ID_DEPO">
                                        <td><span class="badge badge-light border">{{ o.DEPO }}</span></td>
                                        <td>{{ o.NAMABARANG }}</td>
                                        <td class="text-center">{{ o.SATUAN }}</td>
                                        <td class="text-center">{{ angka(o.DITERIMA) }}</td>
                                        <td class="text-center">{{ angka(o.DIBERIKAN) }}</td>
                                        <td class="text-center">{{ angka(o.DIRETUR) }}</td>
                                        <td class="text-center font-weight-bold text-primary">{{ angka(o.SALDO) }}</td>
                                        <td>{{ o.TERIMA_TERAKHIR }}</td>
                                        <td class="text-center" :class="hari(o) >= batas_hari ? 'text-danger font-weight-bold' : ''">
                                            {{ hari(o) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </DataTable>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import { EventBus } from '../../bus';
    export default {
        components: {
            Loading
        },
        data() {
            return {
                isLoading: false,
                rows: [],
                status_pasien: '',
                status_options: [
                    { label: 'Semua', value: '' },
                    { label: 'Masih Dirawat', value: 'DIRAWAT' },
                    { label: 'Sudah Pulang', value: 'PULANG' },
                ],
                cari: '',
                // Data baru dimuat setelah depo dipilih (data berat): '-' = tidak diketahui, '*' = semua depo
                depo_dipilih: null,
                depo_options: [],
                ruangan_dipilih: null,
                expanded: [],
                // Obat yang tidak diberikan >= batas_hari sejak diterima ditandai merah
                batas_hari: 3
            };
        },
        created() {
            this.muat_depo();
        },
        computed: {
            // Data dari server sudah tersaring per depo; di sini hanya pencarian teks
            data_tersaring() {
                const q = this.cari.trim().toLowerCase();
                if (!q) return this.rows;
                return this.rows.filter(r =>
                    [r.RUANGAN, r.NAMA_PASIEN, r.NOMR, r.NOREGISTER, r.NAMABARANG, r.DEPO]
                        .some(v => String(v || '').toLowerCase().includes(q)));
            },
            // Kelompok per pasien: { noregister, nama_pasien, ..., obat: [] }
            pasien_semua() {
                const map = {};
                this.data_tersaring.forEach(r => {
                    if (!map[r.NOREGISTER]) {
                        map[r.NOREGISTER] = {
                            noregister: r.NOREGISTER,
                            nama_pasien: r.NAMA_PASIEN,
                            nomr: r.NOMR,
                            ruangan: r.RUANGAN || '-',
                            status_pasien: r.STATUS_PASIEN,
                            masuk: r.MASUKPOLY,
                            keluar: r.STATUS_PASIEN === 'PULANG' ? r.KELUARPOLY : '',
                            obat: []
                        };
                    }
                    map[r.NOREGISTER].obat.push(r);
                });
                return Object.values(map).map(p => ({
                    ...p,
                    jumlah_item: p.obat.length,
                    maks_hari: Math.max(...p.obat.map(o => this.hari(o)))
                }));
            },
            ruangan_list() {
                const map = {};
                this.pasien_semua.forEach(p => {
                    if (!map[p.ruangan]) {
                        map[p.ruangan] = { ruangan: p.ruangan, jumlah_pasien: 0, jumlah_item: 0, pasien_pulang: 0, maks_hari: 0 };
                    }
                    const r = map[p.ruangan];
                    r.jumlah_pasien++;
                    r.jumlah_item += p.jumlah_item;
                    if (p.status_pasien === 'PULANG') r.pasien_pulang++;
                    r.maks_hari = Math.max(r.maks_hari, p.maks_hari);
                });
                // Ruangan dengan pasien pulang / obat tertahan paling lama di depan
                return Object.values(map).sort((a, b) =>
                    b.pasien_pulang - a.pasien_pulang || b.maks_hari - a.maks_hari || a.ruangan.localeCompare(b.ruangan));
            },
            pasien_list() {
                return this.pasien_semua
                    .filter(p => p.ruangan === this.ruangan_dipilih)
                    .sort((a, b) => (b.status_pasien === 'PULANG') - (a.status_pasien === 'PULANG') || b.maks_hari - a.maks_hari);
            },
            total_pasien() {
                return this.pasien_semua.length;
            },
            total_pasien_pulang() {
                return this.pasien_semua.filter(p => p.status_pasien === 'PULANG').length;
            }
        },
        methods: {
            angka(v) {
                return this.$numeral(v, '0,0.[00]');
            },
            hari(o) {
                return parseInt(o.HARI_SEJAK_TERIMA) || 0;
            },
            // Daftar depo dari master lokasi (IS_DEPO = 1), tanpa menunggu data monitoring
            async muat_depo() {
                await axios.get('/getlokasi-api')
                    .then(response => {
                        const depo = (response.data.response || [])
                            .filter(x => x.IS_DEPO == '1')
                            .map(x => ({ label: x.DISPLAY, value: String(x.ID) }))
                            .sort((a, b) => a.label.localeCompare(b.label));
                        this.depo_options = depo.concat([
                            { label: 'Depo tidak diketahui', value: '-' },
                            { label: 'Semua depo (lebih lambat)', value: '*' },
                        ]);
                    })
                    .catch(error => this.open('error', 'Gagal memuat daftar depo: ' + error.message));
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            async muat() {
                if (!this.depo_dipilih) {
                    this.rows = [];
                    return;
                }
                this.isLoading = true;
                await axios.post('/monitoring_obat_tidak_diberikan', {
                    status_pasien: this.status_pasien,
                    id_depo: this.depo_dipilih
                })
                    .then(response => {
                        const meta = response.data.metadata || {};
                        if (meta.code == 200) {
                            this.rows = response.data.response || [];
                            if (this.ruangan_dipilih && !this.ruangan_list.some(r => r.ruangan === this.ruangan_dipilih)) {
                                this.ruangan_dipilih = null;
                            }
                        } else {
                            this.open('warning', meta.message || 'Gagal memuat data');
                        }
                    })
                    .catch(error => this.open('error', error.message))
                    .finally(() => this.isLoading = false);
            },
            pilih_ruangan(ruangan) {
                this.ruangan_dipilih = ruangan;
                this.expanded = [];
                this.$nextTick(() => {
                    if (this.$refs.panelPasien) this.$refs.panelPasien.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            },
            export_excel() {
                const data = this.data_tersaring.map(r => ({
                    RUANGAN: r.RUANGAN,
                    NAMA_PASIEN: r.NAMA_PASIEN,
                    NOMR: r.NOMR,
                    NOREGISTER: r.NOREGISTER,
                    STATUS_PASIEN: r.STATUS_PASIEN,
                    DEPO_ASAL: r.DEPO,
                    NAMA_OBAT: r.NAMABARANG,
                    SATUAN: r.SATUAN,
                    DITERIMA: Number(r.DITERIMA),
                    DIBERIKAN: Number(r.DIBERIKAN),
                    DIRETUR: Number(r.DIRETUR),
                    BELUM_DIBERIKAN: Number(r.SALDO),
                    TERAKHIR_DITERIMA: r.TERIMA_TERAKHIR,
                    HARI_SEJAK_TERIMA: this.hari(r)
                }));
                this.$exportExcel(data, 'obat_tidak_diberikan');
            }
        }
    }
</script>

<style scoped>
.ruangan-card {
    cursor: pointer;
    border-left: 4px solid #17a2b8;
    transition: box-shadow .15s, transform .15s;
}
.ruangan-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,.12);
    transform: translateY(-2px);
}
.ruangan-aktif {
    border-left-color: #007bff;
    background: #e8f2ff;
}
.ruangan-nama {
    font-size: 1rem;
}
.angka-besar {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.1;
}
</style>
