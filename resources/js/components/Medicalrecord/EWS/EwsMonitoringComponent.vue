<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
        <div class="container-fluid px-0">

            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-heartbeat mr-2 text-primary"></i>
                        Early Warning Score (EWS)
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <ProgressBar mode="indeterminate" v-show="isLoading" style="height:.25em;width:130px;border-radius:4px" />
                        <Button label="Sync dari CPPT" icon="pi pi-sync" class="p-button-primary p-button-sm" @click="sync_ews_from_soap()" :disabled="isLoading" />
                    </div>
                </div>
            </div>

            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-table mr-2 text-primary"></i>
                        Data Pemantauan
                    </h3>
                    <small class="text-muted">Total: <strong>{{ fact.length }}</strong> record</small>
                </div>
                <div class="card-body p-0">
                    <div v-if="!isLoading && fact.length === 0" class="ews-empty">
                        <i class="fas fa-chart-line"></i>
                        <div class="mt-2">Belum ada data EWS — klik "Sync dari CPPT" untuk memuat data</div>
                    </div>
                    <div v-else class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 ews-table">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width:50px">#</th>
                                    <th>Tanggal / Jam</th>
                                    <th class="text-center">Pernapasan</th>
                                    <th class="text-center">Sistol</th>
                                    <th class="text-center">Nadi</th>
                                    <th class="text-center">Kesadaran</th>
                                    <th class="text-center">SPO2</th>
                                    <th class="text-center">Suhu</th>
                                    <th class="text-center">Alat Bantu</th>
                                    <th class="text-center" style="width:90px">Total EWS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, i) in fact" :key="data.id">
                                    <td class="text-center align-middle"><span class="row-num">{{ i + 1 }}</span></td>
                                    <td class="align-middle"><strong>{{ data.tanggal }}</strong></td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.pernapasan.input }} <small>x/mnt</small></span>
                                            <span class="ews-score">{{ data.pernapasan.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.sistol.input }} <small>mmHg</small></span>
                                            <span class="ews-score">{{ data.sistol.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.nadi.input }} <small>x/mnt</small></span>
                                            <span class="ews-score">{{ data.nadi.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.tingkat_kesadran.input }}</span>
                                            <span class="ews-score">{{ data.tingkat_kesadran.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.spo2.input }} <small>%</small></span>
                                            <span class="ews-score">{{ data.spo2.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.suhu.input }} <small>C</small></span>
                                            <span class="ews-score">{{ data.suhu.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-cell">
                                            <span class="ews-val">{{ data.alat_bantu_nafas.input }}</span>
                                            <span class="ews-score">{{ data.alat_bantu_nafas.score }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="ews-total-badge" :style="{ backgroundColor: data.color_total_ews }">
                                            {{ data.total_score_ews }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted"><i class="fas fa-info-circle mr-1"></i>Angka di bawah nilai adalah <strong class="text-primary">skor</strong> tiap parameter</small>
                </div>
            </div>

            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-info-circle mr-2 text-primary"></i>
                        Interpretasi Nilai EWS
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <div class="ews-interp-card">
                                <div class="ews-interp-header" style="background:#26C281">
                                    <i class="fas fa-check-circle mr-2"></i>Skor 0-4
                                    <span class="badge badge-light ml-2">Risiko Rendah</span>
                                </div>
                                <div class="ews-interp-body" style="background:#f0fff8;border:1px solid #a8e6cf;border-top:none">
                                    <p><strong>Interpretasi:</strong> Pasien memiliki risiko rendah terhadap kondisi kritis.</p>
                                    <p class="mb-0"><strong>Tindakan:</strong> Lanjutkan pemantauan vital signs berkala.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="ews-interp-card">
                                <div class="ews-interp-header" style="background:#e6a817">
                                    <i class="fas fa-exclamation-circle mr-2"></i>Skor 5-6
                                    <span class="badge badge-light ml-2">Risiko Sedang</span>
                                </div>
                                <div class="ews-interp-body" style="background:#fffbf0;border:1px solid #fde68a;border-top:none">
                                    <p><strong>Interpretasi:</strong> Pasien berada pada risiko sedang mengalami perburukan.</p>
                                    <p class="mb-0"><strong>Tindakan:</strong> Tingkatkan pemantauan dan pertimbangkan intervensi dini.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="ews-interp-card">
                                <div class="ews-interp-header" style="background:#F22613">
                                    <i class="fas fa-exclamation-triangle mr-2"></i>Skor 7+
                                    <span class="badge badge-light ml-2">Risiko Tinggi</span>
                                </div>
                                <div class="ews-interp-body" style="background:#fff5f5;border:1px solid #fecaca;border-top:none">
                                    <p><strong>Interpretasi:</strong> Pasien risiko tinggi atau sudah dalam kondisi kritis.</p>
                                    <p class="mb-0"><strong>Tindakan:</strong> Tindakan medis segera. Panggil tim resusitasi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    export default {
        components: { Loading, ProgressBar },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                form: { mode: 1, noregister: '' },
                isLoading: false,
                fullPage: false,
            };
        },
        created() {
            this.sync_ews_from_soap();
        },
        methods: {
            async sync_ews_from_soap() {
                this.form.mode = 1;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                this.isLoading = true;
                try {
                    const response = await axios.post('/sync_ews_from_soap', this.form);
                    this.fact = response.data.response || [];
                } catch (error) {
                    console.error('EWS sync:', error);
                } finally {
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style scoped>
.ews-table thead th { background:#f8f9fa; font-weight:700; text-transform:uppercase; letter-spacing:.04em; vertical-align:middle; white-space:nowrap; border-color:#dee2e6 !important; }
.ews-table td { border-color:#dee2e6 !important; vertical-align:middle; }
.ews-table tbody tr:hover { background:#e3f2fd !important; }
.row-num { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#e3f2fd; color:#1565c0; font-weight:700; }
.ews-cell { display:flex; flex-direction:column; align-items:center; gap:3px; }
.ews-val { font-weight:600; color:#333; }
.ews-val small { color:#888; font-weight:400; }
.ews-score { display:inline-block; background:#e3f2fd; color:#1565c0; border-radius:10px; padding:1px 8px; font-weight:700; }
.ews-total-badge { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:50%; font-size:1.1rem; font-weight:700; color:#fff; margin:0 auto; box-shadow:0 2px 6px rgba(0,0,0,.2); }
.ews-empty { text-align:center; padding:48px 16px; color:#aaa; }
.ews-empty .fas { font-size:2.5rem; opacity:.3; }
.ews-interp-card { border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,.08); }
.ews-interp-header { padding:12px 16px; font-weight:700; color:#fff; font-size:.92rem; display:flex; align-items:center; }
.ews-interp-body { padding:14px 16px; font-size:.85rem; line-height:1.6; color:#333; border-radius:0 0 10px 10px; }
.ews-interp-body p { margin-bottom:6px; }
</style>
