<template>
    <Toast />
    <div class="content">

        <!-- ══ PATIENT BANNER (disembunyikan saat dipakai sebagai component) ══ -->
        <Card v-if="!embedded" class="mb-3">
            <template #content>
                <div v-if="isLoadingPasien" class="text-center py-3">
                    <ProgressBar mode="indeterminate" style="height:.3em" />
                    <small class="text-muted mt-2 d-block">Memuat data pasien…</small>
                </div>

                <div v-else class="pasien-banner-grid">
                    <!-- Identitas -->
                    <div class="pasien-col-identity">
                        <div class="d-flex align-items-start gap-3">
                            <div class="pasien-avatar">
                                <i class="pi pi-user text-danger" style="font-size:1.5rem"></i>
                            </div>
                            <div>
                                <div class="fw-bold fs-6">{{ dataPasien.DATA_SINGKAT || '—' }}</div>
                                <div class="text-muted small mt-1">
                                    No. RM: <strong>{{ dataPasien.NOMR || '—' }}</strong>
                                    &nbsp;·&nbsp; Reg: <code>{{ noregister }}</code>
                                </div>
                                <div class="d-flex flex-wrap gap-1 mt-2">
                                    <Tag severity="danger" icon="pi pi-venus" value="Perempuan" />
                                    <Tag severity="secondary"
                                        :value="usiaLabel" />
                                    <Tag severity="warn" icon="pi pi-heart" value="Persalinan" />
                                    <Tag v-if="form.is_final" severity="danger" icon="pi pi-lock" value="FINAL / TERKUNCI" />
                                    <Tag v-else severity="info" icon="pi pi-pencil" value="Draft" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pasien-divider"></div>

                    <!-- Info kunjungan -->
                    <div class="pasien-col-info">
                        <div class="pasien-info-row">
                            <i class="pi pi-calendar text-muted"></i>
                            <span>Masuk</span>
                            <strong>{{ dataPasien.MASUKPOLY_DISPLAY || '—' }}</strong>
                        </div>
                        <div class="pasien-info-row">
                            <i class="pi pi-user-edit text-muted"></i>
                            <span>DPJP</span>
                            <strong>{{ dataPasien.NAMADOKTER || '—' }}</strong>
                        </div>
                        <div class="pasien-info-row">
                            <i class="pi pi-credit-card text-muted"></i>
                            <span>Bayar</span>
                            <strong>{{ dataPasien.CARABAYAR || '—' }}</strong>
                        </div>
                    </div>

                    <div class="pasien-divider"></div>

                    <!-- Tombol global -->
                    <div class="pasien-col-kontrol">
                        <div class="d-flex flex-column gap-2">
                            <Button
                                :label="isSaving ? 'Menyimpan…' : 'Simpan Draft'"
                                :icon="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"
                                severity="success"
                                size="small"
                                :disabled="isSaving || form.is_final"
                                @click="onSaveDraft"
                            />
                            <Button
                                label="Finalisasi & Kunci RM"
                                icon="pi pi-lock"
                                severity="danger"
                                size="small"
                                :disabled="isSaving || form.is_final"
                                @click="onFinalize"
                            />
                            <div class="d-flex gap-2">
                                <Button
                                    label="Cetak"
                                    icon="pi pi-print"
                                    severity="secondary"
                                    size="small"
                                    outlined
                                    class="flex-fill"
                                    @click="onCetak"
                                />
                                <Button
                                    label="Partograf"
                                    icon="pi pi-chart-line"
                                    severity="secondary"
                                    size="small"
                                    outlined
                                    class="flex-fill"
                                    @click="onLihatPartograf"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- ══ TOOLBAR AKSI (mode embedded — banner+tombol di atas disembunyikan) ══ -->
        <div v-if="embedded" class="embedded-toolbar mb-3">
            <Tag v-if="form.is_final" severity="danger" icon="pi pi-lock" value="FINAL / TERKUNCI" />
            <Tag v-else severity="info" icon="pi pi-pencil" value="Draft" />
            <div class="d-flex gap-2 ms-auto">
                <Button
                    label="Cetak"
                    icon="pi pi-print"
                    severity="secondary"
                    size="small"
                    outlined
                    @click="onCetak"
                />
                <Button
                    label="Partograf"
                    icon="pi pi-chart-line"
                    severity="secondary"
                    size="small"
                    outlined
                    @click="onLihatPartograf"
                />
                <Button
                    :label="isSaving ? 'Menyimpan…' : 'Simpan Draft'"
                    :icon="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"
                    severity="success"
                    size="small"
                    :disabled="isSaving || form.is_final"
                    @click="onSaveDraft"
                />
                <Button
                    label="Finalisasi & Kunci RM"
                    icon="pi pi-lock"
                    severity="danger"
                    size="small"
                    :disabled="isSaving || form.is_final"
                    @click="onFinalize"
                />
            </div>
        </div>

        <!-- ══ TAB VIEW ══════════════════════════════════════════════════════ -->
        <Tabs v-model:value="activeTab">
            <TabList>
                <Tab value="0">RIWAYAT OBSTETRI</Tab>
                <Tab value="1">PROSES PERSALINAN</Tab>
                <Tab value="2">DATA BAYI</Tab>
                <Tab value="3">KONDISI IBU</Tab>
                <Tab value="4">DIAGNOSA &amp; VERIFIKASI</Tab>
                <Tab value="5">PARTOGRAF</Tab>
            </TabList>

            <TabPanels>
                <TabPanel value="0">
                    <tab-riwayat-obstetri
                        v-model="form.riwayat"
                        :readonly="form.is_final"
                        :tgl-persalinan="tglPersalinan"
                    />
                </TabPanel>

                <TabPanel value="1">
                    <tab-proses-persalinan
                        v-model:proses="form.proses"
                        v-model:kala4-monitoring="form.kala4_monitoring"
                        :readonly="form.is_final"
                    />
                </TabPanel>

                <TabPanel value="2">
                    <tab-data-bayi
                        v-model="form.bayi"
                        :readonly="form.is_final"
                    />
                </TabPanel>

                <TabPanel value="3">
                    <tab-kondisi-ibu
                        v-model="form.kondisi_ibu"
                        :readonly="form.is_final"
                    />
                </TabPanel>

                <TabPanel value="4">
                    <tab-diagnosa-verifikasi
                        v-model:diagnosa="form.diagnosa"
                        v-model:icd-list="form.icd_list"
                        :readonly="form.is_final"
                        :username="username"
                        :dpjp-nama="dataPasien.NAMADOKTER || ''"
                    />
                </TabPanel>

                <TabPanel value="5">
                    <partograf-component
                        :noregister="noregister"
                        :namapasien="dataPasien.DATA_SINGKAT || ''"
                        :readonly="form.is_final"
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>

        <!-- ══ DIALOG KONFIRMASI FINALISASI ══════════════════════════════════ -->
        <Dialog
            v-model:visible="showFinalizeDialog"
            header="Konfirmasi Finalisasi"
            :modal="true"
            style="width:380px"
        >
            <p class="mb-0">
                Setelah difinalisasi, rekam medis persalinan ini akan
                <strong>dikunci dan tidak dapat diubah lagi</strong>.
                Lanjutkan?
            </p>
            <template #footer>
                <Button label="Batal" severity="secondary" outlined @click="showFinalizeDialog = false" />
                <Button
                    :label="isSaving ? 'Memproses…' : 'Ya, Finalisasi'"
                    :icon="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-lock'"
                    severity="danger"
                    :disabled="isSaving"
                    @click="doFinalize"
                />
            </template>
        </Dialog>

    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import TabRiwayatObstetri    from './TabRiwayatObstetri.vue'
import TabProsesPersalinan   from './TabProsesPersalinan.vue'
import TabDataBayi           from './TabDataBayi.vue'
import TabKondisiIbu         from './TabKondisiIbu.vue'
import TabDiagnosaVerifikasi from './TabDiagnosaVerifikasi.vue'
import PartografComponent    from './partografComponent.vue'

const toast = useToast()

const props = defineProps({
    noregister: { type: String, required: true },
    username:   { type: String, default: '' },
    // true jika komponen ini dipanggil sebagai child component (mis. di dalam tab
    // halaman lain yang sudah menampilkan banner pasiennya sendiri)
    embedded:   { type: Boolean, default: false },
})

// ── State UI ─────────────────────────────────────────────────────────────────
const activeTab          = ref('0')
const isLoadingPasien    = ref(false)
const isSaving           = ref(false)
const showFinalizeDialog = ref(false)
const dataPasien         = ref({})

// ── Form data (semua tab) ─────────────────────────────────────────────────────
const form = reactive({
    is_final: false,

    // Tab 1
    riwayat: {
        gravida: null, partus: null, abortus: null, gpa_lengkap: '',
        hpht: null, hpl: null,
        usia_kehamilan_minggu: null, usia_kehamilan_hari: null,
        jumlah_anc: null, riwayat_persalinan_sebelumnya: '',
        riwayat_sc: false, jumlah_sc: 0,
        faktor_risiko: [], faktor_risiko_lain: '',
    },

    // Tab 2
    proses: {
        kala1_mulai: null, kala1_lama_menit: null,
        his_frekuensi: '', his_durasi: '', djj: '',
        pembukaan_mrs: null, pembukaan_lengkap_jam: null, penurunan_kepala: '',
        ketuban_status: null, ketuban_jam_pecah: null, ketuban_warna: null,
        kala2_mulai: null, kala2_lama_menit: null,
        presentasi: '', lilitan_tali_pusat: '', catatan_kala2: '',
        kala3_mulai: null, kala3_lama_menit: null,
        mak3: null, oksitosin_waktu: null,
        plasenta_lahir: null, plasenta_jam: null, kelengkapan_plasenta: '',
        kontraksi_uterus: '', tfu_kala4: '', kandung_kemih_kala4: '',
        total_perdarahan_kala4: null,
        jenis_persalinan: null, indikasi_tindakan: '', anestesi_sc: '',
    },
    kala4_monitoring: [],

    // Tab 3
    bayi: [],

    // Tab 4
    kondisi_ibu: {
        plasenta_berat: null, plasenta_ukuran: '', insersio_tali_pusat: null,
        panjang_tali_pusat: null, jumlah_pembuluh: '', kelengkapan_kotiledon_selaput: '',
        kondisi_perineum: null, derajat_robekan: null,
        episiotomi: false, jenis_episiotomi: null,
        penjahitan: false, anestesi_lokal: '', jenis_benang: '',
        perdarahan_kala23: null, perdarahan_kala4_ibu: null,
        perdarahan_total: null, catatan_atonia_hpp: '',
        uterotonika: '', cairan_infus: '', antibiotik: '',
        transfusi: false, detail_transfusi: '',
        komplikasi: [], komplikasi_lain: '',
    },

    // Tab 5
    diagnosa: {
        diagnosa_naratif: '',
        waktu_pencatatan: null,
        diinput_oleh: props.username,
        dpjp_id: null, dpjp_nama: '',
        bidan_id: null, bidan_nama: '',
    },
    icd_list: [],
})

// ── Computed ──────────────────────────────────────────────────────────────────
const usiaLabel = computed(() => {
    const t = dataPasien.value?.USIA_PASIEN?.tahun ?? '?'
    const b = dataPasien.value?.USIA_PASIEN?.bulan ?? 0
    return `${t} Thn ${b} Bln`
})

const tglPersalinan = computed(() => {
    return form.proses.kala2_mulai || null
})

// ── Load data pasien ──────────────────────────────────────────────────────────
async function fetchDataPasien() {
    if (!props.noregister) return
    isLoadingPasien.value = true
    try {
        const res = await axios.post('/datapasienpertransaksi', {
            mode: 'history8',
            noregister: props.noregister,
        })
        dataPasien.value = res.data?.response?.[0] ?? {}
    } catch (e) {
        console.error('[Persalinan] fetchDataPasien:', e)
    } finally {
        isLoadingPasien.value = false
    }
}

// ── Load data persalinan ──────────────────────────────────────────────────────
async function fetchData() {
    try {
        const res = await axios.post('/persalinan/get', { noregister: props.noregister })
        const d   = res.data?.response
        if (!d) return
        hydrate(d)
    } catch (e) {
        console.error('[Persalinan] fetchData:', e)
    }
}

function hydrate(d) {
    form.is_final = !!d.is_final

    // Tab 1
    Object.assign(form.riwayat, {
        gravida: d.gravida, partus: d.partus, abortus: d.abortus,
        gpa_lengkap: d.gpa_lengkap || '',
        hpht: d.hpht ? new Date(d.hpht) : null,
        hpl:  d.hpl  ? new Date(d.hpl)  : null,
        usia_kehamilan_minggu: d.usia_kehamilan_minggu,
        usia_kehamilan_hari:   d.usia_kehamilan_hari,
        jumlah_anc: d.jumlah_anc,
        riwayat_persalinan_sebelumnya: d.riwayat_persalinan_sebelumnya || '',
        riwayat_sc: !!d.riwayat_sc, jumlah_sc: d.jumlah_sc || 0,
        faktor_risiko: d.faktor_risiko || [], faktor_risiko_lain: d.faktor_risiko_lain || '',
    })

    // Tab 2 — proses
    const dtFields = ['kala1_mulai','pembukaan_lengkap_jam','ketuban_jam_pecah',
                      'kala2_mulai','kala3_mulai','oksitosin_waktu','plasenta_jam']
    for (const f of dtFields) {
        form.proses[f] = d[f] ? new Date(d[f]) : null
    }
    const strFields = ['kala1_lama_menit','his_frekuensi','his_durasi','djj',
        'pembukaan_mrs','penurunan_kepala','ketuban_status','ketuban_warna',
        'kala2_lama_menit','presentasi','lilitan_tali_pusat','catatan_kala2',
        'kala3_lama_menit','mak3','plasenta_lahir','kelengkapan_plasenta',
        'kontraksi_uterus','tfu_kala4','kandung_kemih_kala4','total_perdarahan_kala4',
        'jenis_persalinan','indikasi_tindakan','anestesi_sc']
    for (const f of strFields) {
        if (d[f] !== undefined) form.proses[f] = d[f]
    }
    form.kala4_monitoring = d.kala4_monitoring || []

    // Tab 3 — bayi
    form.bayi = d.bayi || []

    // Tab 4 — kondisi ibu
    const ibuFields = [
        'plasenta_berat','plasenta_ukuran','insersio_tali_pusat','panjang_tali_pusat',
        'jumlah_pembuluh','kelengkapan_kotiledon_selaput',
        'kondisi_perineum','derajat_robekan','jenis_episiotomi',
        'penjahitan','anestesi_lokal','jenis_benang',
        'perdarahan_kala23','perdarahan_kala4_ibu','perdarahan_total','catatan_atonia_hpp',
        'uterotonika','cairan_infus','antibiotik','detail_transfusi','komplikasi_lain',
    ]
    for (const f of ibuFields) {
        if (d[f] !== undefined) form.kondisi_ibu[f] = d[f]
    }
    form.kondisi_ibu.episiotomi = !!d.episiotomi
    form.kondisi_ibu.transfusi  = !!d.transfusi
    form.kondisi_ibu.komplikasi = d.komplikasi || []

    // Tab 5
    Object.assign(form.diagnosa, {
        diagnosa_naratif: d.diagnosa_naratif || '',
        waktu_pencatatan: d.waktu_pencatatan ? new Date(d.waktu_pencatatan) : null,
        diinput_oleh: d.diinput_oleh || props.username,
        dpjp_id: d.dpjp_id, dpjp_nama: d.dpjp_nama || '',
        bidan_id: d.bidan_id, bidan_nama: d.bidan_nama || '',
    })
    form.icd_list = d.icd_list || []
}

// ── Serialize form → payload ──────────────────────────────────────────────────
function buildPayload() {
    const fmt = (v) => v instanceof Date
        ? v.toISOString().slice(0, 19).replace('T', ' ')
        : v

    return {
        noregister: props.noregister,

        // Tab 1
        ...form.riwayat,
        hpht: fmt(form.riwayat.hpht),
        hpl:  fmt(form.riwayat.hpl),
        riwayat_sc: form.riwayat.riwayat_sc ? 1 : 0,

        // Tab 2
        ...form.proses,
        kala1_mulai:         fmt(form.proses.kala1_mulai),
        pembukaan_lengkap_jam: fmt(form.proses.pembukaan_lengkap_jam),
        ketuban_jam_pecah:   fmt(form.proses.ketuban_jam_pecah),
        kala2_mulai:         fmt(form.proses.kala2_mulai),
        kala3_mulai:         fmt(form.proses.kala3_mulai),
        oksitosin_waktu:     fmt(form.proses.oksitosin_waktu),
        plasenta_jam:        fmt(form.proses.plasenta_jam),
        kala4_monitoring:    form.kala4_monitoring.map(r => ({
            ...r,
            waktu: r.waktu
                ? fmt(r.waktu instanceof Date ? r.waktu : new Date(r.waktu))
                : null,
        })),

        // Tab 3
        bayi: form.bayi,

        // Tab 4
        ...form.kondisi_ibu,
        episiotomi: form.kondisi_ibu.episiotomi ? 1 : 0,
        transfusi:  form.kondisi_ibu.transfusi  ? 1 : 0,

        // Tab 5
        ...form.diagnosa,
        waktu_pencatatan: fmt(form.diagnosa.waktu_pencatatan),
        icd_list: form.icd_list,
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function showError(res) {
    const msg    = res.data?.message   || 'Terjadi kesalahan'
    const debug  = res.data?.debug     || ''
    const errno  = res.data?.errno     || ''
    const query  = res.data?.last_query|| ''
    // Log detail ke console agar bisa dicek via DevTools → Network / Console
    if (debug || errno) {
        console.error('[Persalinan] DB Error', { errno, debug, last_query: query, full: res.data })
    }
    const detail = debug ? `${msg} | errno ${errno}: ${debug}` : msg
    toast.add({ severity: 'error', summary: 'Gagal Menyimpan', detail, life: 6000 })
}

// ── Actions ───────────────────────────────────────────────────────────────────
async function onSaveDraft() {
    isSaving.value = true
    try {
        const res = await axios.post('/persalinan/save', buildPayload())
        if (res.data?.code === 200) {
            toast.add({ severity: 'success', summary: 'Tersimpan', detail: 'Draft berhasil disimpan', life: 3000 })
        } else {
            showError(res)
        }
    } catch (e) {
        console.error('[Persalinan] onSaveDraft:', e)
        toast.add({ severity: 'error', summary: 'Error Koneksi', detail: e.message, life: 4000 })
    } finally {
        isSaving.value = false
    }
}

function onFinalize() {
    showFinalizeDialog.value = true
}

async function doFinalize() {
    isSaving.value = true
    try {
        const res = await axios.post('/persalinan/finalize', buildPayload())
        if (res.data?.code === 200) {
            form.is_final = true
            showFinalizeDialog.value = false
            toast.add({ severity: 'success', summary: 'Difinalisasi', detail: 'Rekam medis dikunci', life: 3000 })
        } else {
            showError(res)
        }
    } catch (e) {
        console.error('[Persalinan] doFinalize:', e)
        toast.add({ severity: 'error', summary: 'Error Koneksi', detail: e.message, life: 4000 })
    } finally {
        isSaving.value = false
    }
}

function onCetak() {
    window.open(`/persalinan/cetak/${props.noregister}`, '_blank')
}

function onLihatPartograf() {
    activeTab.value = '5'
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
    fetchDataPasien()
    fetchData()
})
</script>

<style scoped>
.embedded-toolbar {
    display: flex;
    align-items: center;
    gap: .5rem;
    flex-wrap: wrap;
}
.pasien-banner-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 220px;
    gap: 1rem;
    align-items: start;
}
.pasien-divider {
    width: 1px;
    background: #e0e0e0;
    align-self: stretch;
}
.pasien-info-row {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: .85rem;
    margin-bottom: .35rem;
}
.pasien-info-row span { color: #6c757d; min-width: 50px; }
.pasien-avatar {
    width: 2.5rem; height: 2.5rem;
    background: #f8d7da; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
}

@media (max-width: 768px) {
    .pasien-banner-grid {
        grid-template-columns: 1fr;
    }
    .pasien-divider { display: none; }
}

.field-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.35px;
    margin-bottom: 4px;
}
</style>
