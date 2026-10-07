<template>
    <section class="content">
        <div class="container-fluid">
            <div class="card card-info card-outline elevation-0">
                <div
                    class="card-header d-flex align-items-center justify-content-between"
                    style="cursor:pointer;user-select:none"
                    @click="screeningExpanded = !screeningExpanded"
                >
                    <b>SCREENING GIZI ANAK (STRONG KIDS)</b>
                    <i :class="screeningExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                </div>
                <span v-if="isLoading==true">
                    <b>Memuat data.......</b>
                </span>
                <div class="card-body strongkids-body" v-show="screeningExpanded">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="strongkids-item">
                                <div class="strongkids-item-header">
                                    <span class="strongkids-num">1</span>
                                    <span class="strongkids-question">Apakah pasien tampak kurus (penilaian klinis)?</span>
                                </div>
                                <div class="strongkids-item-control">
                                    <SelectButton v-model="form.tampak_kurus" :options="tampak_kurus"
                                        optionLabel="caption" dataKey="caption" :allowEmpty="false" />
                                    <Tag :value="'Nilai ' + form.tampak_kurus.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>

                            <div class="strongkids-item">
                                <div class="strongkids-item-header">
                                    <span class="strongkids-num">2</span>
                                    <span class="strongkids-question">Apakah terdapat penurunan berat badan selama 1
                                        bulan terakhir? <small class="strongkids-hint">(data objektif bila ada, atau
                                        penilaian subjektif orang tua; untuk bayi &lt;1 tahun: berat badan tidak naik
                                        selama 3 bulan terakhir)</small></span>
                                </div>
                                <div class="strongkids-item-control">
                                    <SelectButton v-model="form.penurunanBB_1bulan" :options="penurunanBB_1bulan"
                                        optionLabel="caption" dataKey="caption" :allowEmpty="false" />
                                    <Tag :value="'Nilai ' + form.penurunanBB_1bulan.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>

                            <div class="strongkids-item">
                                <div class="strongkids-item-header">
                                    <span class="strongkids-num">3</span>
                                    <span class="strongkids-question">Apakah terdapat salah satu dari kondisi
                                        berikut: diare &ge;5x/hari dan/atau muntah &gt;3x/hari dalam seminggu
                                        terakhir, dan/atau asupan makanan berkurang selama 1 minggu terakhir?</span>
                                </div>
                                <div class="strongkids-item-control">
                                    <SelectButton v-model="form.gejala_asupan" :options="gejala_asupan"
                                        optionLabel="caption" dataKey="caption" :allowEmpty="false" />
                                    <Tag :value="'Nilai ' + form.gejala_asupan.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>

                            <div class="strongkids-item">
                                <div class="strongkids-item-header">
                                    <span class="strongkids-num">4</span>
                                    <span class="strongkids-question">Apakah terdapat penyakit/keadaan yang berisiko
                                        mengakibatkan malnutrisi? <small class="strongkids-hint">(mis. diare kronik,
                                        penyakit jantung bawaan, penyakit ginjal, keganasan, luka bakar, penyakit
                                        hati kronik, kelainan metabolik bawaan, trauma/rencana operasi mayor,
                                        prematuritas, dll)</small></span>
                                </div>
                                <div class="strongkids-item-control">
                                    <SelectButton v-model="form.penyakit_beresiko" :options="penyakit_beresiko"
                                        optionLabel="caption" dataKey="caption" :allowEmpty="false" />
                                    <Tag :value="'Nilai ' + form.penyakit_beresiko.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="strongkids-score-panel" :class="sttsStrongKids">
                                <div class="strongkids-score-label">SKOR STRONG KIDS</div>
                                <i :class="['pi', skorIcon, 'strongkids-score-icon']"></i>
                                <div class="strongkids-score-value">{{ skorStrongKids }}</div>
                                <Tag :value="captionStrongKids" class="strongkids-score-tag" rounded></Tag>
                                <p class="strongkids-score-note">{{ rekomendasiStrongKids }}</p>
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
    export default {
        components: {
            Loading,
        },
        props:['dataset','noregister'],
        data() {
            return {
                fact: [],
                data_respons:'',
                tampak_kurus: [
                    { caption: 'Tidak', value: 0 },
                    { caption: 'Ya', value: 1 },
                ],
                penurunanBB_1bulan: [
                    { caption: 'Tidak', value: 0 },
                    { caption: 'Ya', value: 1 },
                ],
                gejala_asupan: [
                    { caption: 'Tidak', value: 0 },
                    { caption: 'Ya', value: 1 },
                ],
                penyakit_beresiko: [
                    { caption: 'Tidak', value: 0 },
                    { caption: 'Ya', value: 2 },
                ],
                param:{
                     noregister:'',
                     norm:''
                },
                form: {
                    nilai_strongkids: 0,
                    tampak_kurus: { caption: 'Tidak', value: 0 },
                    penurunanBB_1bulan: { caption: 'Tidak', value: 0 },
                    gejala_asupan: { caption: 'Tidak', value: 0 },
                    penyakit_beresiko: { caption: 'Tidak', value: 0 },
                },
                isLoading: false,
                screeningExpanded: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            this.get_data_assesment_gizi();
        },
        watch: {
            noregister(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.get_data_assesment_gizi();
                }
            }
        },
        computed: {
            skorStrongKids() {
                return (this.form.tampak_kurus.value || 0)
                    + (this.form.penurunanBB_1bulan.value || 0)
                    + (this.form.gejala_asupan.value || 0)
                    + (this.form.penyakit_beresiko.value || 0);
            },
            sttsStrongKids() {
                if (this.skorStrongKids == 0) return 'bg-success';
                if (this.skorStrongKids <= 3) return 'bg-warning';
                return 'bg-danger';
            },
            captionStrongKids() {
                if (this.skorStrongKids == 0) return 'RISIKO RENDAH';
                if (this.skorStrongKids <= 3) return 'RISIKO SEDANG';
                return 'RESIKO TINGGI';
            },
            rekomendasiStrongKids() {
                if (this.skorStrongKids == 0) return 'Tidak berisiko malnutrisi, ulangi skrining secara berkala';
                if (this.skorStrongKids <= 3) return 'Observasi asupan makanan selama 3 hari, bila tidak ada perbaikan konsul ke Tim Gizi';
                return 'Konsul ke Tim Gizi/Dietisien untuk rencana terapi gizi segera';
            },
            skorIcon() {
                if (this.skorStrongKids == 0) return 'pi-check-circle';
                if (this.skorStrongKids <= 3) return 'pi-exclamation-triangle';
                return 'pi-exclamation-circle';
            }
        },

        methods: {
            fetchData() {

            },
            async get_data_assesment_gizi() {

                this.isLoading = true;
                this.param.noregister = this.noregister;
                this.param.norm = this.dataset?.NOMR;
                await axios.post('/get_data_assesment_gizi', this.param)
                    .then(response => {
                        const data_gizi = response.data.data_gizi;
                        if (data_gizi) {
                            if (data_gizi.tampak_kurus) this.form.tampak_kurus = {
                                caption: data_gizi.tampak_kurus.caption,
                                value: data_gizi.tampak_kurus.value
                            }
                            if (data_gizi.penurunanBB_1bulan) this.form.penurunanBB_1bulan = {
                                caption: data_gizi.penurunanBB_1bulan.caption,
                                value: data_gizi.penurunanBB_1bulan.value
                            }
                            if (data_gizi.gejala_asupan) this.form.gejala_asupan = {
                                caption: data_gizi.gejala_asupan.caption,
                                value: data_gizi.gejala_asupan.value
                            }
                            if (data_gizi.penyakit_beresiko) this.form.penyakit_beresiko = {
                                caption: data_gizi.penyakit_beresiko.caption,
                                value: data_gizi.penyakit_beresiko.value
                            }
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            get_value()
            {
                this.form.nilai_strongkids = this.skorStrongKids;
                return this.form;
            },
            setValue()
            {
                this.form.tampak_kurus = {
                    caption: this.dataset.tampak_kurus.caption,
                    value: this.dataset.tampak_kurus.value
                }
                this.form.penurunanBB_1bulan = {
                    caption: this.dataset.penurunanBB_1bulan.caption,
                    value: this.dataset.penurunanBB_1bulan.value
                }
                this.form.gejala_asupan = {
                    caption: this.dataset.gejala_asupan.caption,
                    value: this.dataset.gejala_asupan.value
                }
                this.form.penyakit_beresiko = {
                    caption: this.dataset.penyakit_beresiko.caption,
                    value: this.dataset.penyakit_beresiko.value
                }
                this.form.nilai_strongkids = this.skorStrongKids;
            }
        },
    }

</script>


<style scoped>
.strongkids-body {
    padding-top: 1.25rem;
}

.strongkids-item {
    background: #f8f9fb;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 14px;
    transition: border-color .15s ease, box-shadow .15s ease;
}

.strongkids-item:hover {
    border-color: #ced4da;
}

.strongkids-item-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
}

.strongkids-num {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    background: #17a2b8;
    color: #fff;
    font-weight: bold;
    font-size: .8rem;
    text-align: center;
}

.strongkids-question {
    font-weight: 600;
    color: #343a40;
    font-size: .95rem;
}

.strongkids-hint {
    display: block;
    font-weight: 400;
    color: #868e96;
    margin-top: 2px;
}

.strongkids-item-control {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-left: 34px;
}

.strongkids-score-panel {
    text-align: center;
    border-radius: 12px;
    color: #fff;
    padding: 14px 16px;
    max-width: 220px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,.08);
    position: sticky;
    top: 12px;
}

.strongkids-score-label {
    font-weight: 700;
    letter-spacing: .5px;
    font-size: .7rem;
    opacity: .9;
    margin-bottom: 4px;
}

.strongkids-score-icon {
    font-size: 1.1rem;
    margin-bottom: 2px;
    opacity: .9;
}

.strongkids-score-value {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 6px;
}

.strongkids-score-tag {
    background: rgba(255,255,255,.25) !important;
    color: #fff !important;
    font-weight: 700;
    font-size: .7rem;
    margin-bottom: 6px;
}

.strongkids-score-note {
    font-size: .72rem;
    margin: 0;
    opacity: .95;
}
</style>
