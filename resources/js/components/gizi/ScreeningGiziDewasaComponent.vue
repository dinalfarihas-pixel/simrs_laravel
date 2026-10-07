<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> -->
            <div class="card card-info card-outline elevation-0">
                <div
                    class="card-header d-flex align-items-center justify-content-between"
                    style="cursor:pointer;user-select:none"
                    @click="screeningExpanded = !screeningExpanded"
                >
                    <b>SCREENING GIZI</b>
                    <i :class="screeningExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                </div>
                <span v-if="isLoading==true">
                    <b>Memuat data.......</b>
                </span>
                <div class="card-body mst-body" v-show="screeningExpanded">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="mst-item">
                                <div class="mst-item-header">
                                    <span class="mst-num">1</span>
                                    <span class="mst-question">Apakah terjadi penurunan berat badan dalam 6 bulan
                                        terakhir?</span>
                                </div>
                                <div class="mst-item-control">
                                    <Select v-model="form.penurunanBB" :options="penurunanBB"
                                        optionLabel="caption" placeholder="" dataKey="caption" />
                                    <Tag :value="'Nilai ' + form.penurunanBB.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>

                            <div class="mst-item">
                                <div class="mst-item-header">
                                    <span class="mst-num">2</span>
                                    <span class="mst-question">Apakah Anda mengalami asupan makan kurang dari 3/4
                                        porsi karena penurunan nafsu makan?</span>
                                </div>
                                <div class="mst-item-control">
                                    <SelectButton v-model="form.turunnafsu_makan" :options="turunnafsu_makan"
                                        optionLabel="caption" dataKey="caption" :allowEmpty="false" />
                                    <Tag :value="'Nilai ' + form.turunnafsu_makan.value" severity="secondary" rounded></Tag>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="mst-score-panel" :class="sttsMst">
                                <div class="mst-score-label">SKOR MST</div>
                                <i :class="['pi', skorIcon, 'mst-score-icon']"></i>
                                <div class="mst-score-value">{{ skorMst }}</div>
                                <Tag :value="captionMst" class="mst-score-tag" rounded></Tag>
                                <p class="mst-score-note" v-if="rekomendasiMst">{{ rekomendasiMst }}</p>
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
    import RadioButton from 'primevue/radiobutton';
    export default {
        components: {
            Loading,
            RadioButton
        },
        props:['dataset','noregister'],
        data() {
            return {
                fact: [],

                data_respons:'',
                penurunanBB: [{
                        caption: 'Tidak',
                        value: 0,
                    },
                    {
                        caption: 'Tidak Yakin',
                        value: 2,
                    },
                    {
                        caption: 'Penurunan 1-5 Kg',
                        value: 1,
                    },
                    {
                        caption: 'Penurunan 6-10 Kg',
                        value: 2,
                    },
                    {
                        caption: 'Penurunan 11-15 Kg',
                        value: 3,
                    },
                    {
                        caption: 'Penurunan Lebih 15 Kg',
                        value: 4,
                    }
                ],
                turunnafsu_makan: [{
                        caption: 'Ya',
                        value: 1
                    },
                    {
                        caption: 'Tidak',
                        value: 0
                    }
                ],
                param:{
                     noregister:'',
                     norm:''
                },
                form: {
                    nilai_mst:0,
                    penurunanBB: {
                        caption:'Tidak',
                        value:0
                    },
                    turunnafsu_makan: {
                        caption :"Tidak",
                        value:0
                    },
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
            skorMst() {
                return (this.form.turunnafsu_makan.value || 0) + (this.form.penurunanBB.value || 0);
            },
            sttsMst() {
                if (this.skorMst <= 1) return 'bg-success';
                if (this.skorMst == 2) return 'bg-warning';
                return 'bg-danger';
            },
            captionMst() {
                if (this.skorMst <= 1) return 'RISIKO RENDAH';
                if (this.skorMst == 2) return 'RISIKO SEDANG';
                return 'RESIKO TINGGI';
            },
            rekomendasiMst() {
                if (this.skorMst <= 1) return '';
                if (this.skorMst == 2) return 'Konsul DPJP dan NPJP untuk diagnosis lengkap, Pertimbangan intervensi gizi oleh NPJP';
                return 'Konsul DPJP dan NPJP untuk diagnosais lengkap serta untuk rekomendasi gizi individual dan Rencana pelayanan (Care Plan) segera lakukan intevensi gizi';
            },
            skorIcon() {
                if (this.skorMst <= 1) return 'pi-check-circle';
                if (this.skorMst == 2) return 'pi-exclamation-triangle';
                return 'pi-exclamation-circle';
            }
        },

        methods: {
            fetchData() {

            },
            async get_data_assesment_gizi() {

                this.isLoading = true;
                this.param.noregister =this.noregister; //this.dataset.NOPENDAFTARAN;
                this.param.norm = this.dataset?.NOMR;
                await axios.post('/get_data_assesment_gizi', this.param)
                    .then(response => {
                        console.log(response.data.data_gizi)
                        this.form.penurunanBB = {
                            caption :response.data.data_gizi.penurunanBB.caption,
                            value :response.data.data_gizi.penurunanBB.value
                        }
                        this.form.turunnafsu_makan = {
                            caption :response.data.data_gizi.turunnafsu_makan.caption,
                            value :response.data.data_gizi.turunnafsu_makan.value
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
                this.form.nilai_mst = this.skorMst;
                return this.form;
            },
            setValue()
            {
                this.form.penurunanBB ={
                    caption :this.dataset.penurunanBB.caption,
                    value : this.dataset.penurunanBB.value
                }
                this.form.turunnafsu_makan ={
                    caption:this.dataset.turunnafsu_makan.caption,
                    value:this.dataset.turunnafsu_makan.value
                }
                this.form.nilai_mst = this.skorMst;
            }
        },
    }

</script>


<style scoped>
.mst-body {
    padding-top: 1.25rem;
}

.mst-item {
    background: #f8f9fb;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 14px;
    transition: border-color .15s ease, box-shadow .15s ease;
}

.mst-item:hover {
    border-color: #ced4da;
}

.mst-item-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
}

.mst-num {
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

.mst-question {
    font-weight: 600;
    color: #343a40;
    font-size: .95rem;
}

.mst-item-control {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-left: 34px;
}

.mst-score-panel {
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

.mst-score-label {
    font-weight: 700;
    letter-spacing: .5px;
    font-size: .7rem;
    opacity: .9;
    margin-bottom: 4px;
}

.mst-score-icon {
    font-size: 1.1rem;
    margin-bottom: 2px;
    opacity: .9;
}

.mst-score-value {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 6px;
}

.mst-score-tag {
    background: rgba(255,255,255,.25) !important;
    color: #fff !important;
    font-weight: 700;
    font-size: .7rem;
    margin-bottom: 6px;
}

.mst-score-note {
    font-size: .72rem;
    margin: 0;
    opacity: .95;
}
</style>
