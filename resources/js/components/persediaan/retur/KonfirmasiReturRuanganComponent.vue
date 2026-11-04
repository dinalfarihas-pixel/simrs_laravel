<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="true"></loading>
        <ConfirmDialog group="retur-ruangan" />

        <div class="card card-outline card-primary shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between py-2">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-undo mr-2 text-primary"></i>
                    Retur Obat Pasien dari Ruangan
                    <span v-if="jumlah_menunggu > 0" class="badge badge-warning ml-2">{{ jumlah_menunggu }} menunggu</span>
                </h3>
                <Button icon="pi pi-refresh" label="Refresh" class="p-button-secondary p-button-sm p-button-outlined"
                    @click="muat()" />
            </div>

            <!-- ===== FILTER ===== -->
            <div class="card-body py-2 border-bottom d-flex align-items-center flex-wrap" style="gap:8px">
                <SelectButton v-model="status" :options="status_options" optionLabel="label" optionValue="value"
                    :allowEmpty="false" class="p-button-sm" @change="muat()" />
                <template v-if="status !== 'MENUNGGU'">
                    <DatePicker v-model="tgl_min" dateFormat="dd/mm/yy" showIcon @update:modelValue="muat()" />
                    <span class="text-muted">s/d</span>
                    <DatePicker v-model="tgl_max" dateFormat="dd/mm/yy" showIcon @update:modelValue="muat()" />
                </template>
                <InputText v-model="cari" placeholder="Cari pasien / obat / no. retur..." class="ml-auto" style="width:260px" />
            </div>

            <!-- ===== TABEL RETUR ===== -->
            <div class="card-body p-0">
                <DataTable :value="retur_tersaring" dataKey="ID" class="p-datatable-sm" stripedRows :paginator="true"
                    :rows="20" :rowsPerPageOptions="[20,50,100]" responsiveLayout="scroll">
                    <template #empty>
                        <div class="text-center py-4 text-muted">
                            <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                            Tidak ada retur obat.
                        </div>
                    </template>
                    <Column field="NO_RETUR" header="No. Retur" :sortable="true"></Column>
                    <Column field="REQUEST_AT" header="Tanggal" :sortable="true"></Column>
                    <Column header="Pasien" :style="{'min-width':'180px'}">
                        <template #body="{ data }">
                            <div class="font-weight-bold">{{ data.NAMA_PASIEN || '-' }}</div>
                            <div class="text-xs text-muted">{{ data.NOMR }} · {{ data.NOREGISTER }}</div>
                        </template>
                    </Column>
                    <Column field="RUANGAN" header="Ruangan" :sortable="true"></Column>
                    <Column field="NAMABARANG" header="Nama Obat" :sortable="true" :style="{'min-width':'180px'}"></Column>
                    <Column header="Jumlah" bodyClass="text-center">
                        <template #body="{ data }">{{ angka(data.QTY) }} {{ data.SATUAN }}</template>
                    </Column>
                    <Column field="KETERANGAN" header="Keterangan"></Column>
                    <Column field="REQUEST_BY" header="Diretur Oleh"></Column>
                    <Column header="Status" bodyClass="text-center">
                        <template #body="{ data }">
                            <span class="badge" :class="status_class(data.STATUS)">{{ label_status(data) }}</span>
                            <div v-if="data.STATUS === 'DITOLAK'" class="text-xs text-muted">{{ data.ALASAN_TOLAK }}</div>
                            <div v-if="data.PROSES_AT" class="text-xs text-muted">{{ data.PROSES_BY }} · {{ data.PROSES_AT }}</div>
                        </template>
                    </Column>
                    <Column header="Nilai Retur" bodyClass="text-right">
                        <template #body="{ data }">
                            <span v-if="data.STATUS === 'DITERIMA'">Rp {{ $numeral(data.NILAI_RETUR, '0,0') }}</span>
                        </template>
                    </Column>
                    <Column header="Aksi" bodyClass="text-center" :style="{'width':'190px'}">
                        <template #body="{ data }">
                            <template v-if="data.STATUS === 'MENUNGGU'">
                                <Button label="Terima" icon="pi pi-check" class="p-button-success p-button-sm p-button-text"
                                    @click="terima(data)" />
                                <Button label="Tolak" icon="pi pi-times" class="p-button-danger p-button-sm p-button-text"
                                    @click="buka_tolak(data)" />
                            </template>
                            <Button v-else-if="data.STATUS === 'DITERIMA'" label="Rincian" icon="pi pi-list"
                                class="p-button-info p-button-sm p-button-text" @click="buka_detail(data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <!-- ===== DIALOG TOLAK ===== -->
        <Dialog header="Tolak Retur Obat" v-model:visible="show_tolak" :modal="true" :style="{ width: '440px' }">
            <div v-if="form_tolak.item">
                <div class="font-weight-bold">{{ form_tolak.item.NAMABARANG }}</div>
                <div class="text-muted text-sm mb-3">
                    {{ form_tolak.item.NO_RETUR }} · {{ angka(form_tolak.item.QTY) }} {{ form_tolak.item.SATUAN }} ·
                    {{ form_tolak.item.NAMA_PASIEN || form_tolak.item.NOREGISTER }}
                </div>
                <label class="font-weight-bold text-sm">Tindak Lanjut <span class="text-danger">*</span></label>
                <div class="mb-3">
                    <div class="d-flex align-items-center mb-1" style="gap:6px">
                        <RadioButton v-model="form_tolak.tindak_lanjut" inputId="tl_kembali" value="KEMBALI_RUANGAN" />
                        <label for="tl_kembali" class="mb-0">Kembalikan ke ruangan (masuk lagi ke stok pasien)</label>
                    </div>
                    <div class="d-flex align-items-center" style="gap:6px">
                        <RadioButton v-model="form_tolak.tindak_lanjut" inputId="tl_rusak" value="RUSAK" />
                        <label for="tl_rusak" class="mb-0">Obat rusak / tidak layak (hanya dicatat)</label>
                    </div>
                </div>
                <label class="font-weight-bold text-sm">Alasan <span class="text-danger">*</span></label>
                <Textarea v-model="form_tolak.alasan" class="w-100" rows="2" :autoResize="true"
                    placeholder="Contoh: kemasan terbuka / obat kedaluwarsa" />
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text p-button-secondary" @click="show_tolak=false" />
                <Button label="Tolak Retur" icon="pi pi-ban" class="p-button-danger" @click="simpan_tolak()" />
            </template>
        </Dialog>

        <!-- ===== DIALOG RINCIAN BATCH ===== -->
        <Dialog :header="'Rincian Retur ' + (detail_item ? detail_item.NO_RETUR : '')" v-model:visible="show_detail"
            :modal="true" :style="{ width: '60vw' }" :breakpoints="{ '768px': '100vw' }">
            <div class="text-muted text-sm mb-2">Stok dikembalikan ke batch dan lokasi asal resep berikut.</div>
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>No. Resep</th>
                        <th>Batch</th>
                        <th>Lokasi</th>
                        <th class="text-center">Jumlah</th>
                        <th class="text-right">Harga</th>
                        <th class="text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in detail_rows" :key="row.ID">
                        <td>{{ row.RECEIPT_NO }}</td>
                        <td>{{ row.SUB_BARCODE }}</td>
                        <td>{{ row.ID_LOKASI }}</td>
                        <td class="text-center">{{ angka(row.QTY) }}</td>
                        <td class="text-right">{{ $numeral(row.HARGA, '0,0') }}</td>
                        <td class="text-right">{{ $numeral(row.QTY * row.HARGA, '0,0') }}</td>
                    </tr>
                </tbody>
            </table>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading
        },
        data() {
            const hari_ini = new Date();
            return {
                isLoading: false,
                retur: [],
                jumlah_menunggu: 0,
                status: 'MENUNGGU',
                status_options: [
                    { label: 'Menunggu', value: 'MENUNGGU' },
                    { label: 'Diterima', value: 'DITERIMA' },
                    { label: 'Ditolak', value: 'DITOLAK' },
                    { label: 'Dibatalkan', value: 'BATAL' },
                    { label: 'Semua', value: '' },
                ],
                tgl_min: new Date(hari_ini.getFullYear(), hari_ini.getMonth(), hari_ini.getDate() - 7),
                tgl_max: hari_ini,
                cari: '',
                show_tolak: false,
                form_tolak: { item: null, alasan: '', tindak_lanjut: 'KEMBALI_RUANGAN' },
                show_detail: false,
                detail_item: null,
                detail_rows: []
            };
        },
        created() {
            this.muat();
        },
        computed: {
            retur_tersaring() {
                const q = this.cari.trim().toLowerCase();
                if (!q) return this.retur;
                return this.retur.filter(r =>
                    [r.NO_RETUR, r.NAMA_PASIEN, r.NOMR, r.NOREGISTER, r.NAMABARANG, r.RUANGAN]
                        .some(v => String(v || '').toLowerCase().includes(q)));
            }
        },
        methods: {
            angka(v) {
                return this.$numeral(v, '0,0.[00]');
            },
            ymd(d) {
                if (!d) return '';
                return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            },
            label_status(r) {
                if (r.STATUS === 'DITOLAK') return r.TINDAK_LANJUT === 'RUSAK' ? 'Ditolak (rusak)' : 'Ditolak, kembali ke ruangan';
                return { MENUNGGU: 'Menunggu', DITERIMA: 'Diterima', BATAL: 'Dibatalkan ruangan' }[r.STATUS] || r.STATUS;
            },
            status_class(status) {
                return {
                    MENUNGGU: 'badge-warning',
                    DITERIMA: 'badge-success',
                    DITOLAK: 'badge-danger',
                    BATAL: 'badge-secondary'
                }[status] || 'badge-secondary';
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 5000,
                    dismissible: true
                });
            },
            async list(filter) {
                const response = await axios.post('/retur_ruangan_list', filter);
                const meta = response.data.metadata || {};
                if (meta.code != 200) throw new Error(meta.message || 'Gagal memuat retur');
                return response.data.response || [];
            },
            async muat() {
                this.isLoading = true;
                try {
                    // Retur menunggu ditampilkan semua tanpa batas tanggal supaya tidak ada yang terlewat
                    const filter = this.status === 'MENUNGGU'
                        ? { status: 'MENUNGGU' }
                        : { status: this.status, tgl_min: this.ymd(this.tgl_min), tgl_max: this.ymd(this.tgl_max) };
                    this.retur = await this.list(filter);
                    this.jumlah_menunggu = this.status === 'MENUNGGU'
                        ? this.retur.length
                        : (await this.list({ status: 'MENUNGGU' })).length;
                } catch (error) {
                    this.open('error', error.message);
                } finally {
                    this.isLoading = false;
                }
            },
            // Kirim aksi, tampilkan pesan backend, lalu muat ulang daftar
            async proses(url, payload, pesan_sukses) {
                this.isLoading = true;
                let ok = false;
                try {
                    const response = await axios.post(url, payload);
                    const meta = response.data.metadata || {};
                    ok = meta.code == 200;
                    this.open(ok ? 'success' : 'warning', ok && pesan_sukses ? pesan_sukses(response.data) : meta.message);
                } catch (error) {
                    this.open('error', error.message);
                } finally {
                    this.isLoading = false;
                }
                this.muat();
                return ok;
            },
            terima(r) {
                this.$confirm.require({
                    group: 'retur-ruangan',
                    header: 'Terima Retur Obat',
                    message: `Terima retur ${r.NO_RETUR}: ${r.NAMABARANG} ${this.angka(r.QTY)} ${r.SATUAN || ''} dari ${r.RUANGAN || 'ruangan'}? Stok depo akan bertambah ke batch asal.`,
                    icon: 'pi pi-check-circle',
                    acceptLabel: 'Ya, terima',
                    rejectLabel: 'Batal',
                    accept: () => this.proses('/retur_ruangan_terima', { id_retur: r.ID },
                        data => `${data.metadata.message} (nilai Rp ${this.$numeral(data.response ? data.response.NILAI_RETUR : 0, '0,0')})`)
                });
            },
            buka_tolak(r) {
                this.form_tolak = { item: r, alasan: '', tindak_lanjut: 'KEMBALI_RUANGAN' };
                this.show_tolak = true;
            },
            async simpan_tolak() {
                if (!this.form_tolak.alasan.trim()) {
                    this.open('warning', 'Alasan penolakan wajib diisi');
                    return;
                }
                const ok = await this.proses('/retur_ruangan_tolak', {
                    id_retur: this.form_tolak.item.ID,
                    alasan: this.form_tolak.alasan.trim(),
                    tindak_lanjut: this.form_tolak.tindak_lanjut
                });
                if (ok) this.show_tolak = false;
            },
            async buka_detail(r) {
                this.detail_item = r;
                this.detail_rows = [];
                this.show_detail = true;
                await axios.post('/retur_ruangan_detail', { id_retur: r.ID })
                    .then(response => {
                        this.detail_rows = response.data.response || [];
                    })
                    .catch(error => this.open('error', error.message));
            }
        }
    }
</script>
