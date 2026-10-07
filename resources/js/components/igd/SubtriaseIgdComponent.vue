<template>
    <section class="content">

        <!-- Dialog: Konfirmasi -->
        <Dialog header="Informasi" v-model:visible="displayConfirmation" :containerStyle="{width: '25vw'}" :modal="true">
            <div class="d-flex align-items-center" style="gap:12px">
                <i class="pi pi-info-circle" style="font-size:1.8rem;color:#1976d2"></i>
                <p class="mb-0">{{ message }}</p>
            </div>
            <template #footer>
                <Button label="Tutup" icon="pi pi-check" @click="closeConfirmation" class="p-button-primary" />
            </template>
        </Dialog>

        <!-- Dialog: Otorisasi -->
        <Dialog header="Otorisasi Triase" v-model:visible="showOtorisasi" :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode=1 :noregister="datapasien.NOPENDAFTARAN"></otorisasi-form>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
                <Button label="Tutup" icon="pi pi-check" @click="showOtorisasi=false" class="p-button-primary" />
            </template>
        </Dialog>

        <!-- ===== BANNER: DRAFT TERSIMPAN ===== -->
        <transition name="draft-slide">
            <div v-if="draftBanner" class="draft-banner">
                <div class="draft-banner-content">
                    <i class="pi pi-save mr-2"></i>
                    <span>Ditemukan draft tersimpan pukul <strong>{{ draftInfo }}</strong> — data belum tersimpan ke server.</span>
                </div>
                <div class="draft-banner-actions">
                    <button class="draft-btn-restore" @click="restore_draft()">
                        <i class="pi pi-undo mr-1"></i> Pulihkan
                    </button>
                    <button class="draft-btn-dismiss" @click="dismiss_draft()">
                        <i class="pi pi-times mr-1"></i> Abaikan
                    </button>
                </div>
            </div>
        </transition>

        <div class="container-fluid px-0">
            <!-- ===== HEADER: SKOR TRIASE ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-ambulance mr-2 text-primary"></i>
                        Form Triase IGD
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <Button label="Riwayat Kunjungan" icon="pi pi-history" class="p-button-info p-button-sm p-button-outlined" @click="buka_riwayat_kunjungan(datapasien.NOMR)" />
                        <!-- <Button label="ICARE" icon="pi pi-heart" class="p-button-danger p-button-sm p-button-outlined" @click="getlink_icare(datapasien.NOJAMINAN,datapasien.NOMR,datapasien.DATA_SINGKAT,datapasien)()" /> -->
                        <ProgressBar mode="indeterminate" v-show="isLoading" style="height:.25em;width:140px;border-radius:4px" />
                    </div>
                </div>
                <div class="card-body pb-2">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="triase-stat triase-emergensi">
                                <div class="triase-stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                                <div class="triase-stat-info">
                                    <div class="triase-stat-value">{{ nilai_triase.EMERGENSI || 0 }}</div>
                                    <div class="triase-stat-label">Emergensi</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="triase-stat triase-urgent">
                                <div class="triase-stat-icon"><i class="fas fa-clock"></i></div>
                                <div class="triase-stat-info">
                                    <div class="triase-stat-value">{{ nilai_triase.URGENT || 0 }}</div>
                                    <div class="triase-stat-label">Urgent</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="triase-stat triase-nonurgent">
                                <div class="triase-stat-icon"><i class="fas fa-check-circle"></i></div>
                                <div class="triase-stat-info">
                                    <div class="triase-stat-value">{{ nilai_triase.NON_URGENT || 0 }}</div>
                                    <div class="triase-stat-label">Non Urgent</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="triase-stat triase-doa">
                                <div class="triase-stat-icon"><i class="fas fa-times-circle"></i></div>
                                <div class="triase-stat-info">
                                    <div class="triase-stat-value">{{ nilai_triase.DEATH_ON_ARRIVAL || 0 }}</div>
                                    <div class="triase-stat-label">Death on Arrival</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Hasil Skor Real-time -->
                    <div class="mt-3" v-if="skorTriase.total > 0">
                        <div :class="skorTriase.warna" class="triase-hasil-bar">
                            <div class="triase-hasil-left">
                                <i class="fas fa-poll mr-2"></i>
                                <span class="triase-hasil-label">Hasil Penilaian Triase:</span>
                                <strong class="triase-hasil-kategori ml-2">{{ skorTriase.kategori }}</strong>
                            </div>
                            <div class="triase-hasil-rincian">
                                <span v-if="skorTriase.emergensi > 0" class="rincian-chip chip-e">E: {{ skorTriase.emergensi }}</span>
                                <span v-if="skorTriase.urgent > 0"    class="rincian-chip chip-u">U: {{ skorTriase.urgent }}</span>
                                <span v-if="skorTriase.nonUrgent > 0" class="rincian-chip chip-n">N: {{ skorTriase.nonUrgent }}</span>
                                <span v-if="skorTriase.doa > 0"       class="rincian-chip chip-d">D: {{ skorTriase.doa }}</span>
                                <span class="rincian-chip chip-total">Total: {{ skorTriase.total }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3" v-else>
                        <div class="triase-hasil-bar triase-hasil-kosong">
                            <i class="fas fa-clipboard mr-2"></i>
                            Belum ada pilihan — silakan isi penilaian triase di bawah
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== CARA MASUK PASIEN ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-door-open mr-2 text-primary"></i>
                        Cara Masuk Pasien
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-end">
                        <div class="col-md-3">
                            <label class="form-label-custom">Diantar Oleh</label>
                            <Select v-model="form.diantar_oleh" :options="caradatang"
                                optionLabel="diantar_oleh" placeholder="Pilih cara datang" style="width:100%" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Transportasi</label>
                            <Select :options="transportasi" v-model="form.transportasi"
                                optionLabel="transportasi" placeholder="Pilih transportasi" style="width:100%" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Waktu Masuk</label>
                            <div class="d-flex" style="gap:6px">
                                <Calendar v-model="form.waktu_masuk" :showTime="true" :showSeconds="true" style="flex:1" />
                                <Button icon="pi pi-stopwatch" @click="set_datetime_now" class="p-button-outlined p-button-secondary" title="Jam Sekarang" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Nama Dokter</label>
                             <small v-if="dokterKonfirmasi" class="text-success"><i class="pi pi-check mr-1"></i>Telah dikonfirmasi</small>
                            <small v-else class="text-danger btn-dokter-blink"><i class="pi pi-exclamation-triangle mr-1"></i>Perlu konfirmasi dokter</small>
                            <div class="d-flex" style="gap:6px">
                                <Select
                                    v-model="form.dpjpSelected"
                                    :options="dokter.master"
                                    optionLabel="NAMADOKTER"
                                    dataKey="KDDOKTER"
                                    placeholder="Pilih dokter..."
                                    :filter="true"
                                    filterPlaceholder="Cari dokter..."
                                    style="flex:1"
                                    @change="onDokterSelected"
                                />
                                <Button v-if="datapasien?.JENISRAWAT=='JALAN'"
                                    :icon="dokterKonfirmasi ? 'pi pi-check' : 'pi pi-exclamation-triangle'"
                                    :class="dokterKonfirmasi ? 'p-button-success btn-dokter-confirmed' : 'p-button-danger btn-dokter-unconfirmed'"
                                    @click="konfirmasiDokter"
                                    :title="dokterKonfirmasi ? 'Dokter sudah dikonfirmasi' : 'Klik untuk konfirmasi dokter!'"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== ANAMNESE SINGKAT ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-notes-medical mr-2 text-primary"></i>
                        Anamnese Singkat
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label-custom">Keluhan Utama</label>
                            <KeluhanUtamaInput ref="keluhanRef" v-model="form.keluhan_utama" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label-custom">Riwayat Penyakit Dahulu (RPD)</label>
                            <RiwayatPenyakitInput
                                v-model="form.riwayat_penyakit_dahulu"
                                :keluhan-utama="form.keluhan_utama"
                            />
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                              <label class="form-label-custom">Riwayat Penyakit Sekarang (RPS)</label>
                            <Textarea v-model="form.riwayat_penyakit_sekarang" rows="4" placeholder="Riwayat penyakit sekarang..." style="width:100%" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== REKONSILIASI OBAT ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div
                    class="card-header d-flex align-items-center justify-content-between"
                    style="cursor:pointer;user-select:none"
                    @click="rekonsiliasiObatExpanded = !rekonsiliasiObatExpanded"
                >
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-clipboard-check mr-2 text-primary"></i>
                        Rekonsiliasi Obat
                    </h3>
                    <i :class="rekonsiliasiObatExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                </div>
                <div class="card-body p-0" v-show="rekonsiliasiObatExpanded">
                    <rekonsiliasi-obat v-if="rekonsiliasiObatExpanded" :datapasien="datapasien"
                        :show-sinkron-button="false"></rekonsiliasi-obat>
                </div>
            </div>

            <!-- ===== STATUS PSIKOLOGI & RISIKO JATUH ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-brain mr-2 text-primary"></i>
                        Status Psikologi &amp; Risiko Jatuh
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-7">
                            <label class="form-label-custom mb-2">Status Psikologi</label>
                            <div class="radio-grid">
                                <div class="field-radiobutton" v-for="opt in ['Marah','Takut','Cemas','Depresi','Kecendrungan Bunuh Diri','Gelisah','Lain-lain','Tidak-masalah']" :key="opt">
                                    <RadioButton :id="'psi-'+opt" name="status_psikologi" :value="opt" v-model="form.status_psikologi" />
                                    <label :for="'psi-'+opt" class="ml-2">{{ opt }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 border-left">
                            <label class="form-label-custom mb-2">Risiko Jatuh</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="rj-ya" name="resiko_jatuh" value="YA" v-model="form.resiko_jatuh" />
                                    <label for="rj-ya" class="ml-2">
                                        <span class="badge badge-danger">YA</span>
                                    </label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="rj-tidak" name="resiko_jatuh" value="TIDAK" v-model="form.resiko_jatuh" />
                                    <label for="rj-tidak" class="ml-2">
                                        <span class="badge badge-success">TIDAK</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mt-2">
                                <Button
                                    label="Kajian Risiko Jatuh"
                                    icon="pi pi-external-link"
                                    size="small"
                                    severity="info"
                                    outlined
                                    :disabled="!form.noregister"
                                    @click="bukaKajianResikoJatuh()"
                                    v-tooltip.top="'Buka form pengkajian risiko jatuh'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== ALERGI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3" v-show="false">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-allergies mr-2 text-primary"></i>
                        Alergi
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="alergi-box">
                                <div class="alergi-box-title"><i class="fas fa-utensils mr-1"></i> Makanan &amp; Lingkungan</div>
                                <div class="alergi-box-body text-muted">Belum ada data</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="alergi-box">
                                <div class="alergi-box-title"><i class="fas fa-pills mr-1"></i> Obat-obatan</div>
                                <div class="alergi-box-body text-muted">Belum ada data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== TANDA VITAL ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-heartbeat mr-2 text-primary"></i>
                        Keadaan Umum / Tanda Vital
                    </h3>
                </div>
                <div class="card-body pb-2">
                    <div class="vital-grid">

                        <!-- Suhu -->
                        <div class="vital-card">
                            <div class="vital-card-label">Suhu Tubuh</div>
                            <VitalQuickPickInput
                                v-model="form.suhu"
                                label="Suhu" unit="℃"
                                :minFractionDigits="1"
                                :min="30" :max="42"
                                :quickValues="[36, 36.2, 36.5, 36.6, 36.7, 36.8, 36.9, 37, 37.5, 38, 38.5, 39]"
                            />
                            <small class="vital-hint">36 – 37.5 ℃</small>
                        </div>

                        <!-- Tekanan Darah -->
                        <div class="vital-card vital-card--td">
                            <div class="vital-card-label">Tekanan Darah</div>
                            <div class="td-pair">
                                <div class="td-pair-item">
                                    <VitalQuickPickInput
                                        v-model="form.tensi_sistol"
                                        label="Sistolik" unit="mmHg"
                                        :min="40" :max="260"
                                        :quickValues="[60, 65, 70, 80, 90, 100, 110, 112, 120, 125, 130, 140]"
                                    />
                                </div>
                                <span class="td-pair-sep">/</span>
                                <div class="td-pair-item">
                                    <VitalQuickPickInput
                                        v-model="form.tensi_distol"
                                        label="Diastolik" unit="mmHg"
                                        :min="20" :max="150"
                                        :quickValues="[40, 45, 50, 60, 70, 72, 75, 78, 80, 81, 89, 90]"
                                    />
                                </div>
                            </div>
                            <small class="vital-hint">Normal: 120 / 80 mmHg</small>
                        </div>

                        <!-- Nadi -->
                        <div class="vital-card">
                            <div class="vital-card-label">Nadi</div>
                            <VitalQuickPickInput
                                v-model="form.nadipermenit"
                                label="Nadi" unit="x/mnt"
                                :min="30" :max="220"
                                :quickValues="[70, 80, 82, 88, 89, 90, 98, 101, 110,117,130, 134, 140]"
                            />
                            <small class="vital-hint">60 – 100 x/mnt</small>
                        </div>

                        <!-- Saturasi O₂ -->
                        <div class="vital-card">
                            <div class="vital-card-label">Saturasi O₂</div>
                            <VitalQuickPickInput
                                v-model="form.saturasi"
                                label="SPO2" unit="%"
                                :min="0" :max="100"
                                :quickValues="[80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]"
                            />
                            <small class="vital-hint">≥ 95 %</small>
                        </div>

                        <!-- Respirasi -->
                        <div class="vital-card">
                            <div class="vital-card-label">Respirasi</div>
                            <VitalQuickPickInput
                                v-model="form.respirasi"
                                label="Respirasi" unit="/mnt"
                                :min="5" :max="70"
                                :quickValues="[20, 22, 24, 26, 42, 43, 44, 45, 46, 48, 50, 60]"
                            />
                            <small class="vital-hint">12 – 20 /mnt</small>
                        </div>

                        <!-- TB -->
                        <div class="vital-card" :class="{ 'vital-card--required': !form.tb || form.tb <= 0 }">
                            <div class="vital-card-label">
                                Tinggi Badan <span class="vital-required">*</span>
                                <span class="vital-hint" style="font-weight:400;margin-left:4px">{{ tbAgeLabel }}</span>
                            </div>
                            <VitalQuickPickInput
                                v-model="form.tb"
                                label="Tinggi Badan" unit="cm"
                                :min="0" :max="300"
                                :quickValues="tbQuickValues"
                            />
                            <small class="vital-hint">cm</small>
                        </div>

                        <!-- BB -->
                        <div class="vital-card" :class="{ 'vital-card--required': !form.bb || form.bb <= 0 }">
                            <div class="vital-card-label">
                                Berat Badan <span class="vital-required">*</span>
                                <span class="vital-hint" style="font-weight:400;margin-left:4px">{{ tbAgeLabel }}</span>
                            </div>
                            <VitalQuickPickInput
                                v-model="form.bb"
                                label="Berat Badan" unit="kg"
                                :min="0" :max="300"
                                :maxFractionDigits="1"
                                :quickValues="bbQuickValues"
                            />
                            <small class="vital-hint">kg</small>
                        </div>

                        <!-- BMI -->
                        <div class="vital-card vital-card--bmi">
                            <div class="vital-card-label">BMI</div>
                            <div class="bmi-body">
                                <div class="bmi-value" :style="{ color: bmiInfo.color }">
                                    {{ bmi !== null ? bmi.toFixed(1) : '—' }}<span class="bmi-unit">kg/m²</span>
                                </div>
                                <Tag :value="bmiInfo.label" :severity="bmiInfo.severity" class="bmi-tag" />
                            </div>
                            <div class="bmi-scale">
                                <span class="bmi-scale-item" :class="{ active: bmi !== null && bmi < 18.5 }">
                                    &lt;18.5<br><small>Kurus</small>
                                </span>
                                <span class="bmi-scale-item bmi-scale-normal" :class="{ active: bmi !== null && bmi >= 18.5 && bmi < 25 }">
                                    18.5–25<br><small>Normal</small>
                                </span>
                                <span class="bmi-scale-item" :class="{ active: bmi !== null && bmi >= 25 && bmi < 27 }">
                                    25–27<br><small>Gemuk</small>
                                </span>
                                <span class="bmi-scale-item" :class="{ active: bmi !== null && bmi >= 27 }">
                                    &gt;27<br><small>Obesitas</small>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- ===== KEHAMILAN (hanya perempuan ≥ 15 tahun) ===== -->
            <div class="hamil-card mb-3" v-if="showKehamilanSection">

                <!-- Card Header -->
                <div class="hamil-card-header">
                    <div class="hamil-card-title">
                        <span class="hamil-card-icon"><i class="fas fa-baby"></i></span>
                        <span>Keterangan Kehamilan</span>
                    </div>
                    <span v-if="form.status_hamil" class="hamil-status-badge">
                        <i class="pi pi-check-circle mr-1"></i>Hamil
                    </span>
                </div>

                <div class="hamil-card-body">
                    <!-- Toggle status hamil -->
                    <label for="cb_hamil" class="hamil-toggle-row"
                        :class="{ 'hamil-toggle-row--on': form.status_hamil }">
                        <div class="hamil-toggle-left">
                            <span class="hamil-toggle-icon">
                                <i class="fas" :class="form.status_hamil ? 'fa-baby' : 'fa-user'"></i>
                            </span>
                            <div>
                                <div class="hamil-toggle-text">Pasien sedang hamil</div>
                                <div class="hamil-toggle-hint">
                                    {{ form.status_hamil ? 'Isi data kehamilan di bawah ini' : 'Centang untuk mengisi data kehamilan' }}
                                </div>
                            </div>
                        </div>
                        <Checkbox v-model="form.status_hamil" :binary="true" inputId="cb_hamil" />
                    </label>

                    <!-- Detail panel dengan animasi -->
                    <Transition name="hamil-expand">
                    <div v-if="form.status_hamil" class="hamil-detail-panel">

                        <!-- Sub-header: Data Kehamilan -->
                        <div class="hamil-sub-header">
                            <i class="pi pi-info-circle"></i>
                            <span>Data Kehamilan</span>
                        </div>

                        <div class="hamil-fields-grid">
                            <!-- G / P / A -->
                            <div class="hamil-field hamil-field-gpa">
                                <label class="hamil-field-label">Gravida / Para / Abortus</label>
                                <InputGroup>
                                    <InputGroupAddon>G</InputGroupAddon>
                                    <InputNumber v-model="form.gravida" :min="0" :max="20"
                                        :inputStyle="{ textAlign:'center' }" />
                                    <InputGroupAddon>P</InputGroupAddon>
                                    <InputNumber v-model="form.para" :min="0" :max="20"
                                        :inputStyle="{ textAlign:'center' }" />
                                    <InputGroupAddon>A</InputGroupAddon>
                                    <InputNumber v-model="form.abortus" :min="0" :max="20"
                                        :inputStyle="{ textAlign:'center' }" />
                                </InputGroup>
                            </div>

                            <!-- HPHT -->
                            <div class="hamil-field hamil-field-hpht">
                                <label class="hamil-field-label">
                                    HPHT
                                    <span class="hamil-field-label-sub">— Hari Pertama Haid Terakhir</span>
                                </label>
                                <InputGroup>
                                    <InputGroupAddon><i class="pi pi-calendar-minus"></i></InputGroupAddon>
                                    <input type="date" class="hamil-date-input" v-model="form.hpht" @change="onHphtChange" />
                                </InputGroup>
                            </div>

                            <!-- Usia kehamilan -->
                            <div class="hamil-field hamil-field-usia">
                                <label class="hamil-field-label">Usia Kehamilan</label>
                                <InputGroup>
                                    <InputNumber v-model="form.usia_kehamilan_minggu" :min="0" :max="45"
                                        :inputStyle="{ textAlign:'center' }"
                                        @blur="onUsiaChange(form.usia_kehamilan_minggu)" />
                                    <InputGroupAddon>mgg</InputGroupAddon>
                                </InputGroup>
                                <small v-if="usiaKehamilanSisa" class="hamil-hint">
                                    <i class="pi pi-info-circle mr-1"></i>{{ usiaKehamilanSisa }}
                                </small>
                            </div>

                            <!-- HPL -->
                            <div class="hamil-field hamil-field-hpl">
                                <label class="hamil-field-label">Taksiran Persalinan (HPL)</label>
                                <InputGroup>
                                    <InputGroupAddon><i class="pi pi-calendar"></i></InputGroupAddon>
                                    <input type="date" class="hamil-date-input" v-model="form.hpl" @change="onHplChange" />
                                </InputGroup>
                            </div>
                        </div>

                        <!-- ===== PEMERIKSAAN LEOPOLD ===== -->
                        <div class="leopold-section mt-3">
                            <div class="leopold-header">
                                <i class="fas fa-hand-paper mr-2"></i>
                                Pemeriksaan Leopold
                            </div>

                            <!-- Pesan jika usia kehamilan < 20 minggu -->
                            <template v-if="!leopoldVisible">
                                <Message severity="info" :closable="false" class="mt-2">
                                    Pemeriksaan Leopold belum relevan untuk usia kehamilan &lt; 20 minggu.
                                </Message>
                            </template>

                            <template v-else>
                                <!-- Soft-warning kombinasi tidak lazim -->
                                <Message v-for="(w, i) in leopoldWarnings" :key="i"
                                    severity="warn" :closable="false" class="mt-2 mb-0">
                                    {{ w }}
                                </Message>

                                <!-- Baris TFU & DJJ -->
                                <div class="leopold-row mt-2">
                                    <div class="leopold-item">
                                        <label class="form-label-custom">Tinggi Fundus Uteri</label>
                                        <InputGroup>
                                            <InputNumber v-model="form.leopold_tfu" :min="0" :max="50"
                                                :minFractionDigits="0" :maxFractionDigits="1"
                                                :inputStyle="{ textAlign:'center' }" placeholder="0" />
                                            <InputGroupAddon>cm</InputGroupAddon>
                                        </InputGroup>
                                        <small class="vital-hint">Normal sesuai usia kehamilan</small>
                                    </div>
                                    <div class="leopold-item">
                                        <label class="form-label-custom">Detak Jantung Janin</label>
                                        <InputGroup :class="{ 'djj-warning': djjWarning }">
                                            <InputNumber v-model="form.djj" :min="0" :max="250"
                                                :inputStyle="{ textAlign:'center', color: djjWarning ? '#dc3545' : '' }"
                                                placeholder="0" />
                                            <InputGroupAddon>x/mnt</InputGroupAddon>
                                        </InputGroup>
                                        <small :class="djjWarning ? 'text-danger font-weight-bold' : 'vital-hint'">
                                            {{ djjWarning ? 'Di luar batas normal (120–160 x/mnt)' : 'Normal: 120–160 x/mnt' }}
                                        </small>
                                    </div>
                                    <div class="leopold-item">
                                        <label class="form-label-custom">Irama DJJ</label>
                                        <SelectButton v-model="form.djj_reguler"
                                            :options="djjRegulerOpts"
                                            optionLabel="label" optionValue="value" />
                                    </div>
                                </div>

                                <!-- Baris maneuver Leopold I–IV -->
                                <div class="leopold-grid mt-3">

                                    <!-- Leopold I -->
                                    <div class="leopold-card">
                                        <div class="leopold-roman">I</div>
                                        <div class="leopold-card-body">
                                            <label class="form-label-custom mb-1">Bagian Fundus</label>
                                            <SelectButton v-model="form.leopold_i"
                                                :options="leopoldIFundusOpts"
                                                optionLabel="label" optionValue="value" />
                                        </div>
                                    </div>

                                    <!-- Leopold II — 2 field independen -->
                                    <div class="leopold-card">
                                        <div class="leopold-roman">II</div>
                                        <div class="leopold-card-body">
                                            <label class="form-label-custom mb-1">Letak Punggung</label>
                                            <SelectButton v-model="form.leopold_ii_punggung"
                                                :options="leopoldIIPunggungOpts"
                                                optionLabel="label" optionValue="value" />
                                            <label class="form-label-custom mt-2 mb-1">
                                                Posisi
                                                <span class="hamil-label-sub">(opsional)</span>
                                            </label>
                                            <SelectButton v-model="form.leopold_ii_posisi"
                                                :options="leopoldIIPosisiOpts"
                                                optionLabel="label" optionValue="value" />
                                        </div>
                                    </div>

                                    <!-- Leopold III -->
                                    <div class="leopold-card">
                                        <div class="leopold-roman">III</div>
                                        <div class="leopold-card-body">
                                            <label class="form-label-custom mb-1">Bagian Terbawah</label>
                                            <SelectButton v-model="form.leopold_iii"
                                                :options="leopoldIIIBawahOpts"
                                                optionLabel="label" optionValue="value"
                                                @change="onLeopoldIIIChange" />
                                            <template v-if="leopoldMasukPAPVisible">
                                                <label class="form-label-custom mt-2 mb-1">Masuk PAP</label>
                                                <SelectButton v-model="form.leopold_iii_masuk"
                                                    :options="leopoldMasukPAPOpts"
                                                    optionLabel="label" optionValue="value" />
                                            </template>
                                        </div>
                                    </div>

                                    <!-- Leopold IV — hanya aktif jika III = kepala -->
                                    <div class="leopold-card" :class="{ 'leopold-card--disabled': !leopoldIVVisible }">
                                        <div class="leopold-roman">IV</div>
                                        <div class="leopold-card-body">
                                            <label class="form-label-custom mb-1">
                                                Penurunan Kepala
                                                <span class="hamil-label-sub">(hanya jika kepala)</span>
                                            </label>

                                            <!-- Toggle metode -->
                                            <SelectButton v-model="form.leopold_iv_metode"
                                                :options="leopoldIVMetodeOpts"
                                                optionLabel="label" optionValue="value"
                                                :disabled="!leopoldIVVisible"
                                                class="mb-2" />

                                            <!-- Metode: konvergensi -->
                                            <template v-if="form.leopold_iv_metode === 'konvergensi'">
                                                <label class="form-label-custom mb-1">Hasil Konvergensi</label>
                                                <SelectButton v-model="form.leopold_iv_konvergensi"
                                                    :options="leopoldIVKonvergensiOpts"
                                                    optionLabel="label" optionValue="value"
                                                    :disabled="!leopoldIVVisible" />
                                            </template>

                                            <!-- Metode: perlimaan -->
                                            <template v-else-if="form.leopold_iv_metode === 'perlimaan'">
                                                <label class="form-label-custom mb-1">Perlimaan</label>
                                                <SelectButton v-model="form.leopold_iv_perlimaan"
                                                    :options="leopoldIVPerlimaanOpts"
                                                    optionLabel="label" optionValue="value"
                                                    :disabled="!leopoldIVVisible" />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            <!-- ===== RINGKASAN GABUNGAN OBSTETRI ===== -->
                            <div v-if="obstetriText" class="leopold-summary mt-3">
                                <div class="leopold-summary-header">
                                    <span><i class="fas fa-file-alt mr-1"></i> Ringkasan Obstetri</span>
                                    <div class="leopold-summary-actions">
                                        <Button icon="pi pi-copy" label="Salin" size="small"
                                            severity="secondary" outlined
                                            v-tooltip.top="'Salin semua ke clipboard'"
                                            @click="copyObstetriText" />
                                    </div>
                                </div>
                                <pre class="leopold-summary-text">{{ obstetriText }}</pre>
                            </div>
                            </template>
                        </div>
                    </div>
                    </Transition>
                </div>
            </div>

            <!-- ===== SKALA NYERI ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-thermometer-half mr-2 text-primary"></i>
                        Skala Nyeri
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-center mb-3">
                        <!-- Gambar ekspresi -->
                        <div class="col-md-1 text-center">
                            <img :src="nyeriPic" height="60" width="60" style="object-fit:contain">
                            <div class="nyeri-score-box mt-1">{{ nyeriValue }}</div>
                        </div>

                        <!-- Tombol skala nyeri 0–10 -->
                        <div class="col-md-8">
                            <div class="nyeri-radio-group">
                                <div v-for="btn in nyeriButtons" :key="btn.nilai"
                                    class="nyeri-radio-label"
                                    :class="[btn.color, nyeriValue === btn.nilai ? 'nyeri-active' : '']"
                                    @click="pilihNyeri(btn.nilai)">
                                    <span class="nyeri-radio-number">{{ btn.nilai }}</span>
                                    <span class="nyeri-radio-desc">{{ btn.label }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Lokasi Nyeri -->
                        <div class="col-md-3">
                            <label class="form-label-custom">Lokasi Nyeri</label>
                            <LokasiNyeriInput v-model="form.lokasinyeri" />
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="nyeri-legend-row">
                        <span><span class="nyeri-dot nyeri-0"></span> 0: Tidak nyeri</span>
                        <span><span class="nyeri-dot nyeri-ringan"></span> 1–3: Ringan</span>
                        <span><span class="nyeri-dot nyeri-sedang"></span> 4–6: Sedang</span>
                        <span><span class="nyeri-dot nyeri-berat"></span> 7–9: Berat</span>
                        <span><span class="nyeri-dot nyeri-parah"></span> 10: Tak tertahankan</span>
                    </div>
                </div>
            </div>

            <!-- ===== SCREENING GIZI ===== -->
            <screening-gizi-anak v-if="isPasienAnak" ref="gizi_form" :dataset="datapasien" :noregister="form.noregister"></screening-gizi-anak>
            <screening-gizi-dewasa v-else ref="gizi_form" :dataset="datapasien" :noregister="form.noregister"></screening-gizi-dewasa>

            <!-- ===== KESADARAN ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-eye mr-2 text-primary"></i>
                        Kesadaran
                    </h3>
                </div>
                <div class="card-body">
                    <div class="radio-grid">
                        <div class="field-radiobutton" v-for="opt in ['Composmetis','Apatis','Delerium','Somnolen','Sopor','Semi koma','Koma']" :key="opt">
                            <RadioButton :id="'ks-'+opt" name="kesadaran" :value="opt" v-model="form.kesadaran" />
                            <label :for="'ks-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===== TABEL TRIASE ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div
                    class="card-header d-flex align-items-center justify-content-between"
                    style="cursor:pointer;user-select:none"
                    @click="penilaianTriaseExpanded = !penilaianTriaseExpanded"
                >
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-clipboard-list mr-2 text-primary"></i>
                        Penilaian Triase
                    </h3>
                    <i :class="penilaianTriaseExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                </div>
                <div class="card-body p-0" v-show="penilaianTriaseExpanded">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0 triase-table">
                            <thead>
                                <tr>
                                    <th style="width:20%">Pemeriksaan</th>
                                    <th class="th-emergensi">EMERGENSI</th>
                                    <th class="th-urgent">URGENT</th>
                                    <th class="th-nonurgent">NON URGENT</th>
                                    <th class="th-doa">DEATH ON ARRIVAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in fact" :key="data.grouping">
                                    <td class="td-grouping"><strong>{{ data.grouping }}</strong></td>
                                    <td>
                                        <template v-for="(det,k) in data.details" :key="'e'+k">
                                            <div class="field-checkbox" v-if="det.sk_1!=''">
                                                <Checkbox v-model="form.check_triase" :value="det.val_1" :binary="false" :id="det.val_1" @change="checkboxChanged()" />
                                                <label :for="det.val_1" class="ml-1">{{ det.sk_1 }}</label>
                                            </div>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="(det,k) in data.details" :key="'u'+k">
                                            <div class="field-checkbox" v-if="det.sk_2!=''">
                                                <Checkbox v-model="form.check_triase" :value="det.val_2" :binary="false" :id="det.val_2" />
                                                <label :for="det.val_2" class="ml-1">{{ det.sk_2 }}</label>
                                            </div>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="(det,k) in data.details" :key="'n'+k">
                                            <div class="field-checkbox" v-if="det.sk_4!=''">
                                                <Checkbox v-model="form.check_triase" :value="det.val_4" :binary="false" :id="det.val_4" />
                                                <label :for="det.val_4" class="ml-1">{{ det.sk_4 }}</label>
                                            </div>
                                        </template>
                                    </td>
                                    <td>
                                        <template v-for="(det,k) in data.details" :key="'d'+k">
                                            <div class="field-checkbox" v-if="det.sk_5!=''">
                                                <Checkbox v-model="form.check_triase" :value="det.val_5" :binary="false" :id="det.val_5" />
                                                <label :for="det.val_5" class="ml-1">{{ det.sk_5 }}</label>
                                            </div>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ===== SOAP / CPPT ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-file-medical-alt mr-2 text-primary"></i>
                        SOAP / CPPT
                    </h3>
                </div>
                <div class="card-body">
                    <soap-form ref="soapForm" :datapasien="datapasien" :noregister="form.noregister" :isCppt="true" :data_igd="form"></soap-form>
                </div>
            </div>

            <!-- ===== SECONDARY SURVEY ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div
                    class="card-header d-flex align-items-center justify-content-between"
                    style="cursor:pointer;user-select:none"
                    @click="secondarySurveyExpanded = !secondarySurveyExpanded"
                >
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-stethoscope mr-2 text-primary"></i>
                        Secondary Survey (Pemeriksaan Fisik)
                    </h3>
                    <i :class="secondarySurveyExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" class="text-muted"></i>
                </div>
                <div class="card-body" v-show="secondarySurveyExpanded">

                    <!-- Body marking (dinonaktifkan sementara) -->
                    <!--
                    <media-marking ref="childComponent"></media-marking>
                    -->

                    <Accordion class="ss-accordion">
                        <AccordionPanel v-for="item in secondary_surver_list" :key="item.id" :value="String(item.id)">
                            <AccordionHeader>
                                <template #toggleicon="{ active }">
                                    <i :class="active ? 'pi pi-minus' : 'pi pi-plus'" class="ss-acc-icon"></i>
                                </template>
                                <span class="ss-acc-label">{{ item.label }}</span>
                                <span v-if="item.kondisi && item.kondisi !== 'NORMAL'" class="ss-acc-badge">{{ item.kondisi }}</span>
                            </AccordionHeader>
                            <AccordionContent>
                                <div class="ss-organ-body">
                                    <div v-for="sf in item.schemaFields" :key="sf.key" class="ss-field">
                                        <span class="ss-field-label">{{ sf.label }}</span>
                                        <!-- CHECKBOX -->
                                        <div v-if="sf.type === 'checkbox'" class="ss-field-opts">
                                            <label v-for="opt in sf.options" :key="opt.value" class="ss-opt-label">
                                                <Checkbox v-model="item.fields[sf.key]" :value="opt.value" :inputId="'cb-'+item.id+'-'+sf.key+'-'+opt.value" />
                                                <span>{{ opt.label }}</span>
                                            </label>
                                        </div>
                                        <!-- RADIO → toggle buttons -->
                                        <div v-else-if="sf.type === 'radio'" class="ss-btn-group">
                                            <button v-for="opt in sf.options" :key="opt.value" type="button"
                                                :class="['ss-btn-opt', { 'ss-btn-active': item.fields[sf.key] === opt.value }]"
                                                @click="item.fields[sf.key] = opt.value">
                                                {{ opt.label }}
                                            </button>
                                        </div>
                                        <!-- TEXT -->
                                        <InputText v-else-if="sf.type === 'text'" v-model="item.fields[sf.key]" class="ss-text-input" :placeholder="sf.label" size="small" />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>

                    <Divider />

                    <!-- Ringkasan -->
                    <div class="ss-ringkasan-header">
                        <span class="ss-ringkasan-title">
                            <i class="pi pi-clipboard"></i> Ringkasan Pemeriksaan Fisik
                        </span>
                        <Button
                            :label="ringkasanCopied ? 'Tersalin!' : 'Salin'"
                            :icon="ringkasanCopied ? 'pi pi-check' : 'pi pi-copy'"
                            :severity="ringkasanCopied ? 'success' : 'secondary'"
                            size="small"
                            outlined
                            @click="copyRingkasan"
                        />
                    </div>
                    <Textarea
                        :value="ringkasanFisik"
                        :rows="5"
                        readonly
                        style="width:100%;resize:vertical;font-family:monospace;font-size:.82rem"
                    />

                    <!-- QR verifikasi -->
                    <div v-if="stts_verif" class="qr-verif-wrap mt-3">
                        <div class="qr-verif-card">
                            <qrcode-vue :value="qrVerifValue" :size="50" level="M" render-as="svg" />
                            <small class="text-muted"><i class="fas fa-shield-alt mr-1 text-success"></i>{{ stts_verif }}</small>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ===== ACTION BAR ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-body d-flex align-items-center flex-wrap" style="gap:10px">
                    <Button label="Simpan Triase" v-if="datapasien?.JENISRAWAT=='JALAN'" icon="pi pi-save" class="p-button-success" @click="simpan()" :disabled="isLoading" />
                    <Button label="Otorisasi" v-if="datapasien?.JENISRAWAT=='JALAN'" icon="pi pi-lock" class="p-button-warning" @click="call_oto()" />
                    <ProgressBar mode="indeterminate" v-show="isLoading" style="height:.25em;width:160px;border-radius:4px" />
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import QrcodeVue from 'qrcode.vue';
    import Dialog from 'primevue/dialog';
    import Checkbox from 'primevue/checkbox';
    import RadioButton from 'primevue/radiobutton';
    import Textarea from 'primevue/textarea';
    import html2pdf from 'html2pdf.js';
    import jsPDF from 'jspdf';
    import JsBarcode from 'jsbarcode';
    import InputNumber from 'primevue/inputnumber';
    import InputText       from 'primevue/inputtext';
    import Divider         from 'primevue/divider';
    import Accordion       from 'primevue/accordion';
    import AccordionPanel  from 'primevue/accordionpanel';
    import AccordionHeader from 'primevue/accordionheader';
    import AccordionContent from 'primevue/accordioncontent';
    import ProgressBar from 'primevue/progressbar';
    import VitalQuickPickInput from '../controls/VitalQuickPickInput.vue';
    import LokasiNyeriInput from '../controls/LokasiNyeriInput.vue';
    import KeluhanUtamaInput from './KeluhanUtamaInput.vue';
    import RiwayatPenyakitInput from './RiwayatPenyakitInput.vue';
    import { parseRiwayatToText } from './igdComplaintMapping';
    export default {
        components: {
            Dialog,
            Checkbox,
            RadioButton,
            Textarea,
            QrcodeVue,
            ProgressBar,
            InputNumber,
            InputText,
            Divider,
            Accordion,
            AccordionPanel,
            AccordionHeader,
            AccordionContent,
            VitalQuickPickInput,
            LokasiNyeriInput,
            KeluhanUtamaInput,
            RiwayatPenyakitInput,
        },
        mounted() {
            //console.log('Component mounted.')
        },
        created() {
            var currentDate = new Date();
            this.form.waktu_masuk = currentDate;

            this.form.dpjp = this.datapasien.NAMADOKTER
            this.form.dpjpSelected = {
                NAMADOKTER: this.datapasien.NAMADOKTER || '',
                KDDOKTER:   this.datapasien.KDDOKTER   || '',
            };

            if(this.datapasien.NOREFF_IGD=="")
            {
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
            }
            else
            {
                this.form.noregister = this.datapasien.NOREFF_IGD;
            }

            this.changeSlider(0);

            this.cleanup_old_drafts();
            this.getdatareferensi();
            this.allMasterDokter();
            // this.carapulang();
            this.fetchData();

            //this.initdata();
        },
        props: {
            datapasien: { type: Object, default: () => ({}) },
            defaultMetodePenurunan: { type: String, default: 'konvergensi' },
        },
        data() {
            return {
                checked: false,
                displayModal1: false,
                catatan_penting: '',
                cities: [],
                element_printout: '',
                selectedCategories: [],
                message: '',
                city: false,
                sumbatanpartial: false,
                showOtorisasi:false,
                checked_val: [],
                fact: [],
                check:'',
                prev_skala_nyeri_pic: '',
                secondary_surver_list: [
                    {
                        id: 1, organ: 'kepala', label: 'Kepala', kondisi: 'NORMAL',
                        fields: { kondisi: [], lainnya: '' },
                        schemaFields: [
                            { key: 'kondisi', label: 'Kondisi', type: 'checkbox', options: [{ value: 'normal', label: 'Normal' }, { value: 'mikrosefali', label: 'Mikrosefali' }, { value: 'makrosefali', label: 'Makrosefali' }] },
                            { key: 'lainnya', label: 'Lainnya', type: 'text' },
                        ],
                    },
                    {
                        id: 2, organ: 'mata', label: 'Mata', kondisi: 'NORMAL',
                        fields: { anemis_ka: '', anemis_ki: '', kondisi: [], bentuk_pupil: '', diameter_pupil_ka: '', diameter_pupil_ki: '', refleks_cahaya_ka: '', refleks_cahaya_ki: '', oedem: '', infeksi: '' },
                        schemaFields: [
                            { key: 'anemis_ka', label: 'Anemis kanan', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'anemis_ki', label: 'Anemis kiri', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'oedem', label: 'Oedem', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'infeksi', label: 'Infeksi', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'kondisi', label: 'Kondisi', type: 'checkbox', options: [{ value: 'sklera_ikterik', label: 'Sklera ikterik' }, { value: 'kelopak', label: 'Kelopak' }] },
                            { key: 'bentuk_pupil', label: 'Pupil', type: 'radio', options: [{ value: 'isokor', label: 'Isokor' }, { value: 'anisokor', label: 'Anisokor' }] },
                            { key: 'diameter_pupil_ka', label: 'Ø pupil kanan (mm)', type: 'text' },
                            { key: 'diameter_pupil_ki', label: 'Ø pupil kiri (mm)', type: 'text' },
                            { key: 'refleks_cahaya_ka', label: 'RC kanan', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'refleks_cahaya_ki', label: 'RC kiri', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                        ],
                    },
                    {
                        id: 3, organ: 'tht', label: 'THT', kondisi: 'NORMAL',
                        fields: { telinga: '', hidung: '', tonsil: '', faring: '', lidah: '', bibir: '', beslag: '' },
                        schemaFields: [
                            { key: 'telinga', label: 'Telinga', type: 'text' },
                            { key: 'hidung', label: 'Hidung', type: 'text' },
                            { key: 'tonsil', label: 'Tonsil', type: 'text' },
                            { key: 'faring', label: 'Faring', type: 'text' },
                            { key: 'lidah', label: 'Lidah', type: 'text' },
                            { key: 'bibir', label: 'Bibir', type: 'text' },
                            { key: 'beslag', label: 'Beslag', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                        ],
                    },
                    {
                        id: 4, organ: 'leher', label: 'Leher', kondisi: 'NORMAL',
                        fields: { jvp: '', pembesaran_kelenjar: '', kaku_kuduk: '' },
                        schemaFields: [
                            { key: 'jvp', label: 'JVP', type: 'text' },
                            { key: 'pembesaran_kelenjar', label: 'Pembesaran Kelenjar', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'kaku_kuduk', label: 'Kaku kuduk', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                        ],
                    },
                    {
                        id: 5, organ: 'thorax', label: 'Thorax', kondisi: 'NORMAL',
                        fields: { bentuk: '', stem_fremitus: '', perkusi_thorax: '', lain_lain: '' },
                        schemaFields: [
                            { key: 'bentuk', label: 'Inspeksi', type: 'radio', options: [{ value: 'simetris', label: 'Simetris' }, { value: 'asimetris', label: 'Asimetris' }] },
                            { key: 'stem_fremitus', label: 'SF (Fremitus)', type: 'radio', options: [{ value: 'ki_ka', label: 'Ki=Ka' }, { value: 'menurun', label: 'Menurun' }, { value: 'meningkat', label: 'Meningkat' }] },
                            { key: 'perkusi_thorax', label: 'Perkusi', type: 'radio', options: [{ value: 'sonor', label: 'Sonor' }, { value: 'hipersonor', label: 'Hipersonor' }, { value: 'redup', label: 'Redup' }, { value: 'pekak', label: 'Pekak' }] },
                            { key: 'lain_lain', label: 'Lain-lain', type: 'text' },
                        ],
                    },
                    {
                        id: 6, organ: 'cor', label: 'Cor', kondisi: 'NORMAL',
                        fields: { bunyi_jantung: '', irama: '', murmur: '' },
                        schemaFields: [
                            { key: 'bunyi_jantung', label: 'S1, S2', type: 'text' },
                            { key: 'irama', label: 'Irama', type: 'radio', options: [{ value: 'reguler', label: 'Reguler' }, { value: 'ireguler', label: 'Ireguler' }] },
                            { key: 'murmur', label: 'Murmur', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                        ],
                    },
                    {
                        id: 7, organ: 'pulmo', label: 'Pulmo', kondisi: 'NORMAL',
                        fields: { suara_napas: '', ronkhi_ka: '', ronkhi_ki: '', wheezing_ka: '', wheezing_ki: '' },
                        schemaFields: [
                            { key: 'suara_napas', label: 'Suara napas', type: 'radio', options: [{ value: 'vesikuler', label: 'Vesikuler' }, { value: 'bronkial', label: 'Bronkial' }, { value: 'melemah', label: 'Melemah' }] },
                            { key: 'ronkhi_ka', label: 'Ronkhi kanan', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'ronkhi_ki', label: 'Ronkhi kiri', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'wheezing_ka', label: 'Wheezing kanan', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'wheezing_ki', label: 'Wheezing kiri', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                        ],
                    },
                    {
                        id: 8, organ: 'abdomen', label: 'Abdomen', kondisi: 'NORMAL',
                        fields: { soepel: '', distensi: '', perkusi_abdomen: '', peristaltik: '', nyeri_tekan: '', lokasi_nyeri_tekan: [], defans_muscular: '', asites: '', meteorismus: '', hepar: '', hepar_keterangan: '', lien: '', lien_keterangan: '', lain_lain: '' },
                        schemaFields: [
                            { key: 'soepel', label: 'Inspeksi', type: 'radio', options: [{ value: 'soepel', label: 'Soepel' }, { value: 'distensi', label: 'Distensi' }, { value: 'cembung', label: 'Cembung' }] },
                            { key: 'nyeri_tekan', label: 'Nyeri tekan', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'defans_muscular', label: 'Defans muscular', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'lokasi_nyeri_tekan', label: 'Lokasi NT', type: 'checkbox', options: [{ value: 'epigastrium', label: 'Epigastrium' }, { value: 'hipokondrium_ka', label: 'Hipokondrium Ka' }, { value: 'hipokondrium_ki', label: 'Hipokondrium Ki' }, { value: 'umbilikal', label: 'Umbilikal' }, { value: 'lumbal_ka', label: 'Lumbal Ka' }, { value: 'lumbal_ki', label: 'Lumbal Ki' }, { value: 'hipogastrium', label: 'Hipogastrium' }, { value: 'iliaka_ka', label: 'Iliaka Ka' }, { value: 'iliaka_ki', label: 'Iliaka Ki' }, { value: 'suprapubic', label: 'Suprapubic' }] },
                            { key: 'perkusi_abdomen', label: 'Perkusi', type: 'radio', options: [{ value: 'tympani', label: 'Tympani' }, { value: 'hipertympani', label: 'Hipertympani' }, { value: 'redup', label: 'Redup' }, { value: 'pekak', label: 'Pekak' }] },
                            { key: 'peristaltik', label: 'Peristaltik', type: 'radio', options: [{ value: 'normal', label: 'Normal' }, { value: 'meningkat', label: 'Meningkat' }, { value: 'menurun', label: 'Menurun' }] },
                            { key: 'asites', label: 'Asites', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'meteorismus', label: 'Meteorismus', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'hepar', label: 'Hepar', type: 'radio', options: [{ value: 'tidak_teraba', label: 'Tidak teraba' }, { value: 'teraba', label: 'Teraba membesar' }] },
                            { key: 'hepar_keterangan', label: 'Hepar (ket.)', type: 'text' },
                            { key: 'lien', label: 'Lien', type: 'radio', options: [{ value: 'tidak_teraba', label: 'Tidak teraba' }, { value: 'teraba', label: 'Teraba membesar' }] },
                            { key: 'lien_keterangan', label: 'Lien (ket.)', type: 'text' },
                            { key: 'lain_lain', label: 'Lain-lain', type: 'text' },
                        ],
                    },
                    {
                        id: 9, organ: 'genitalia', label: 'Genitalia', kondisi: 'NORMAL',
                        fields: { keterangan: '' },
                        schemaFields: [
                            { key: 'keterangan', label: 'Keterangan', type: 'text' },
                        ],
                    },
                    {
                        id: 10, organ: 'extremitas', label: 'Extremitas', kondisi: 'NORMAL',
                        fields: { akral: '', edema: '', crt: '', kekuatan_ka_atas: '', kekuatan_ki_atas: '', kekuatan_ka_bawah: '', kekuatan_ki_bawah: '', lain_lain: '' },
                        schemaFields: [
                            { key: 'akral', label: 'Akral', type: 'radio', options: [{ value: 'hangat', label: 'Hangat' }, { value: 'dingin', label: 'Dingin' }] },
                            { key: 'edema', label: 'Edema', type: 'radio', options: [{ value: 'positif', label: '+' }, { value: 'negatif', label: '-' }] },
                            { key: 'crt', label: 'CRT', type: 'text' },
                            { key: 'kekuatan_ka_atas', label: 'Motorik Ka atas', type: 'radio', options: [{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }] },
                            { key: 'kekuatan_ki_atas', label: 'Motorik Ki atas', type: 'radio', options: [{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }] },
                            { key: 'kekuatan_ka_bawah', label: 'Motorik Ka bawah', type: 'radio', options: [{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }] },
                            { key: 'kekuatan_ki_bawah', label: 'Motorik Ki bawah', type: 'radio', options: [{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }] },
                            { key: 'lain_lain', label: 'Lain-lain', type: 'text' },
                        ],
                    },
                    {
                        id: 11, organ: 'status_lokalis', label: 'Status Lokalis', kondisi: 'NORMAL',
                        fields: { regio: '', inspeksi: '', palpasi: '', perkusi: '', auskultasi: '' },
                        schemaFields: [
                            { key: 'regio', label: 'Regio', type: 'text' },
                            { key: 'inspeksi', label: 'Inspeksi (I)', type: 'text' },
                            { key: 'palpasi', label: 'Palpasi (P)', type: 'text' },
                            { key: 'perkusi', label: 'Perkusi (P)', type: 'text' },
                            { key: 'auskultasi', label: 'Auskultasi (A)', type: 'text' },
                        ],
                    },
                ],
                prev_skala_nyeri: [{
                        nomor: 0,
                        link: 'https://ws-simrs.net/skala_nyeri/a.png'
                    },
                    {
                        nomor: 1,
                        link: 'https://ws-simrs.net/skala_nyeri/b.png'
                    },
                    {
                        nomor: 2,
                        link: 'https://ws-simrs.net/skala_nyeri/c.png'
                    },
                    {
                        nomor: 3,
                        link: 'https://ws-simrs.net/skala_nyeri/d.png'
                    },
                    {
                        nomor: 4,
                        link: 'https://ws-simrs.net/skala_nyeri/e.png'
                    },
                    {
                        nomor: 5,
                        link: 'https://ws-simrs.net/skala_nyeri/f.png'
                    },
                ],
                caradatangselected: {
                    diantar_oleh: 'Datang Sendiri',
                    code: '1'
                },
                caradatang: [],
                carapulangarr:[],
                transportasi: [],
                transportasiselected: '',
                displayConfirmation: false,
                ringkasanCopied: false,
                secondarySurveyExpanded: true,
                rekonsiliasiObatExpanded: false,
                penilaianTriaseExpanded: true,
                isLoading: false,
                fullPage: false,
                bebas_gawat: false,
                bebas_tdk_gawat: false,
                bebas_sedikit_gawat: false,
                responvalue:0,
                stts_verif:'',
                dokterKonfirmasi: false,
                draftBanner: false,
                draftInfo: null,
                dokter:{
                    nama:'',
                    master:[],
                    dokterSelected:'',
                    mode:0
                },
                nilai_triase:'',
                nyeriValue: 0,
                form: {
                    check_triase: [],
                    norm:'',
                    noregister: '',
                    waktu_masuk: '',
                    diantar_oleh: '',
                    transportasi: '',
                    keluhan_utama: '',
                    riwayat_penyakit_dahulu: '',
                    riwayat_penyakit_sekarang:'',
                    suhu: 0,
                    tensi_sistol: 0,
                    tensi_distol:0,
                    nyeri_distol: 0,
                    bb:0,
                    tb:0,
                    nadipermenit: 0,
                    saturasi: 0,
                    respirasi: 0,
                    catatanpenting: '',
                    resiko_jatuh: 'TIDAK',
                    status_psikologi: 'Tidak-masalah',
                    dpjpSelected:{NAMADOKTER:'',KDDOKTER:''},
                    kesadaran: 'Composmetis',
                    rencana_tindak_lanjut:'',
                    survey:[],
                    data_gizi:'',
                    lokasinyeri:'',
                    hasil_triase_kategori: '',
                    hasil_triase_emergensi: 0,
                    hasil_triase_urgent: 0,
                    hasil_triase_nonurgent: 0,
                    hasil_triase_doa: 0,
                    hasil_triase_total: 0,
                    status_hamil: false,
                    gravida: null,
                    para: null,
                    abortus: null,
                    usia_kehamilan_minggu: null,
                    hpht: '',
                    hpl: '',
                    leopold_tfu: null,
                    leopold_i: null,
                    leopold_ii_punggung: null,
                    leopold_ii_posisi: null,
                    leopold_iii: null,
                    leopold_iii_masuk: null,
                    leopold_iv_metode: 'konvergensi',
                    leopold_iv_konvergensi: null,
                    leopold_iv_perlimaan: null,
                    djj: null,
                    djj_reguler: null,
                },
                djjRegulerOpts: [
                    { label: 'Reguler', value: 1 },
                    { label: 'Ireguler', value: 0 },
                ],
                leopoldIFundusOpts: [
                    { label: 'Kepala', value: 'kepala' },
                    { label: 'Bokong', value: 'bokong' },
                    { label: 'Tdk Teraba', value: 'tidak_teraba' },
                ],
                leopoldIIPunggungOpts: [
                    { label: 'Ki', value: 'kiri' },
                    { label: 'Ka', value: 'kanan' },
                ],
                leopoldIIPosisiOpts: [
                    { label: 'Anterior', value: 'anterior' },
                    { label: 'Posterior', value: 'posterior' },
                ],
                leopoldIIIBawahOpts: [
                    { label: 'Kepala', value: 'kepala' },
                    { label: 'Bokong', value: 'bokong' },
                    { label: 'Lintang', value: 'lintang' },
                ],
                leopoldMasukPAPOpts: [
                    { label: 'Sudah', value: 1 },
                    { label: 'Belum', value: 0 },
                ],
                leopoldIVMetodeOpts: [
                    { label: 'Konvergensi', value: 'konvergensi' },
                    { label: 'Perlimaan', value: 'perlimaan' },
                ],
                leopoldIVKonvergensiOpts: [
                    { label: 'Konvergen', value: 'konvergen' },
                    { label: 'Sejajar', value: 'sejajar' },
                    { label: 'Divergen', value: 'divergen' },
                ],
                leopoldIVPerlimaanOpts: [
                    { label: '0/5', value: 0 },
                    { label: '1/5', value: 1 },
                    { label: '2/5', value: 2 },
                    { label: '3/5', value: 3 },
                    { label: '4/5', value: 4 },
                    { label: '5/5', value: 5 },
                ],
            }
        },
        computed: {
            tbQuickValues() {
                const tahun = this.datapasien?.USIA_PASIEN?.tahun ?? 99;
                if (tahun < 1)  return [50, 55, 60, 65, 70, 75];
                if (tahun < 5)  return [75, 80, 85, 90, 95, 100];
                if (tahun < 12) return [100, 110, 120, 130, 140];
                return [140, 145, 150, 155, 160, 165, 170, 175, 180];
            },
            tbAgeLabel() {
                const tahun = this.datapasien?.USIA_PASIEN?.tahun ?? 99;
                if (tahun < 1)  return '(0–1 thn)';
                if (tahun < 5)  return '(1–5 thn)';
                if (tahun < 12) return '(5–12 thn)';
                return '(≥ 12 thn)';
            },
            bbQuickValues() {
                const tahun = this.datapasien?.USIA_PASIEN?.tahun ?? 99;
                if (tahun < 1)  return [3, 4, 5, 6, 7, 8, 9, 10];
                if (tahun < 5)  return [10, 12, 14, 16, 18, 20];
                if (tahun < 12) return [18, 20, 25, 30, 35, 40];
                return [40, 45, 50, 55, 60, 65, 70, 75, 80];
            },
            bmi() {
                const tb = this.form.tb;
                const bb = this.form.bb;
                if (!tb || !bb || tb <= 0) return null;
                return bb / ((tb / 100) ** 2);
            },
            bmiInfo() {
                const v = this.bmi;
                if (v === null) return { label: '—', severity: 'secondary', color: '#adb5bd' };
                if (v < 17.0)  return { label: 'Sangat Kurus',  severity: 'danger',  color: '#dc3545' };
                if (v < 18.5)  return { label: 'Kurus',         severity: 'warning', color: '#fd7e14' };
                if (v < 25.0)  return { label: 'Normal',        severity: 'success', color: '#198754' };
                if (v < 27.0)  return { label: 'Gemuk',         severity: 'warning', color: '#fd7e14' };
                return             { label: 'Obesitas',          severity: 'danger',  color: '#dc3545' };
            },
            showKehamilanSection() {
                const jk    = this.datapasien?.JENISKELAMIN;
                const tahun = this.datapasien?.USIA_PASIEN?.tahun ?? 0;
                return jk === 'P' && tahun >= 15;
            },
            isPasienAnak() {
                const tahun = this.datapasien?.USIA_PASIEN?.tahun ?? 99;
                return tahun < 18;
            },
            kehamilanText() {
                const f = this.form;
                if (!f.status_hamil) return '';
                const lines = [];
                const g = f.gravida ?? '?';
                const p = f.para    ?? '?';
                const a = f.abortus ?? '?';
                lines.push(`G${g}P${p}A${a}`);
                if (f.usia_kehamilan_minggu !== null && f.usia_kehamilan_minggu > 0) {
                    lines.push(`Usia Kehamilan  : ${f.usia_kehamilan_minggu} minggu`);
                }
                if (f.hpl) {
                    const d = new Date(f.hpl);
                    if (!isNaN(d.getTime())) {
                        const fmt = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
                        lines.push(`HPL             : ${fmt}`);
                    }
                }
                if (this.hpht && this.hpht !== '-') {
                    lines.push(`HPHT            : ${this.hpht}`);
                }
                if (lines.length === 0) return '';
                return 'Keterangan Kehamilan:\n' + lines.map(l => '- ' + l).join('\n');
            },
            obstetriText() {
                const parts = [];
                if (this.kehamilanText) parts.push(this.kehamilanText);
                if (this.leopoldText)   parts.push(this.leopoldText);
                return parts.join('\n\n');
            },
            leopoldVisible() {
                const uk = this.form.usia_kehamilan_minggu;
                return uk !== null && uk >= 20;
            },
            leopoldMasukPAPVisible() {
                return this.form.leopold_iii === 'kepala' || this.form.leopold_iii === 'bokong';
            },
            leopoldIVVisible() {
                return this.form.leopold_iii === 'kepala';
            },
            djjWarning() {
                const v = this.form.djj;
                return v !== null && v > 0 && (v < 120 || v > 160);
            },
            leopoldText() {
                const f = this.form;
                if (!this.leopoldVisible) return '';

                const labelFundus   = { kepala: 'Kepala', bokong: 'Bokong', tidak_teraba: 'Tidak teraba' };
                const labelPunggung = { kiri: 'Kiri', kanan: 'Kanan' };
                const labelPosisi   = { anterior: 'Anterior', posterior: 'Posterior' };
                const labelBawah    = { kepala: 'Kepala', bokong: 'Bokong', lintang: 'Lintang' };
                const labelKonv     = { konvergen: 'Konvergen', sejajar: 'Sejajar', divergen: 'Divergen' };

                const lines = [];

                // TFU
                if (f.leopold_tfu !== null && f.leopold_tfu > 0) {
                    lines.push(`TFU           : ${f.leopold_tfu} cm`);
                }

                // Leopold I
                if (f.leopold_i) {
                    lines.push(`Leopold I     : Fundus teraba ${(labelFundus[f.leopold_i] || f.leopold_i).toLowerCase()}`);
                }

                // Leopold II
                const punggung = f.leopold_ii_punggung ? `Punggung ${labelPunggung[f.leopold_ii_punggung] || f.leopold_ii_punggung}` : null;
                const posisi   = f.leopold_ii_posisi   ? `, posisi ${(labelPosisi[f.leopold_ii_posisi] || f.leopold_ii_posisi).toLowerCase()}` : '';
                if (punggung) {
                    lines.push(`Leopold II    : ${punggung}${posisi}`);
                } else if (f.leopold_ii_posisi) {
                    lines.push(`Leopold II    : Posisi ${(labelPosisi[f.leopold_ii_posisi] || f.leopold_ii_posisi).toLowerCase()}`);
                }

                // Leopold III
                if (f.leopold_iii) {
                    let l3 = `Presentasi ${(labelBawah[f.leopold_iii] || f.leopold_iii).toLowerCase()}`;
                    if (this.leopoldMasukPAPVisible && f.leopold_iii_masuk !== null) {
                        l3 += f.leopold_iii_masuk ? ', sudah masuk PAP' : ', belum masuk PAP';
                    }
                    lines.push(`Leopold III   : ${l3}`);
                }

                // Leopold IV
                if (this.leopoldIVVisible) {
                    if (f.leopold_iv_metode === 'konvergensi' && f.leopold_iv_konvergensi) {
                        lines.push(`Leopold IV    : ${labelKonv[f.leopold_iv_konvergensi] || f.leopold_iv_konvergensi}`);
                    } else if (f.leopold_iv_metode === 'perlimaan' && f.leopold_iv_perlimaan !== null) {
                        lines.push(`Leopold IV    : ${f.leopold_iv_perlimaan}/5`);
                    }
                }

                // DJJ
                if (f.djj !== null && f.djj > 0) {
                    const irama = f.djj_reguler === 1 ? 'reguler' : f.djj_reguler === 0 ? 'ireguler' : '';
                    lines.push(`DJJ           : ${f.djj} x/mnt${irama ? ', ' + irama : ''}`);
                }

                if (lines.length === 0) return '';
                return 'Pemeriksaan Leopold:\n' + lines.map(l => '- ' + l).join('\n');
            },
            leopoldWarnings() {
                const warns = [];
                const i   = this.form.leopold_i;
                const iii = this.form.leopold_iii;
                const pap = this.form.leopold_iii_masuk;
                if (i === 'tidak_teraba' && iii === 'kepala' && pap === 1) {
                    warns.push('Kombinasi tidak lazim: fundus tidak teraba (Leopold I) namun presentasi kepala sudah masuk PAP (Leopold III).');
                }
                if (i === 'kepala' && iii === 'kepala') {
                    warns.push('Kombinasi tidak lazim: bagian fundus dan presentasi terbawah sama-sama teraba sebagai kepala.');
                }
                if (i === 'bokong' && iii === 'bokong') {
                    warns.push('Kombinasi tidak lazim: bagian fundus dan presentasi terbawah sama-sama teraba sebagai bokong.');
                }
                return warns;
            },
            hpht() {
                if (!this.form.hpht) return '-';
                const d = new Date(this.form.hpht);
                if (isNaN(d.getTime())) return '-';
                return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
            },
            usiaKehamilanSisa() {
                if (!this.form.hpht) return null;
                const hpht = new Date(this.form.hpht);
                if (isNaN(hpht.getTime())) return null;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today - hpht) / 86400000);
                if (diffDays < 0) return 'Tanggal HPHT di masa depan';
                const minggu = Math.floor(diffDays / 7);
                const sisa = diffDays % 7;
                return `${minggu} minggu ${sisa} hari`;
            },
            qrVerifValue() {
                return JSON.stringify({
                    noregister : this.form.noregister,
                    verif      : this.stts_verif,
                    pasien     : this.datapasien?.NAMAPASIEN || '',
                    nomr       : this.datapasien?.NOMR || '',
                });
            },
            nyeriPic() {
                const n = this.nyeriValue;
                if (n === 0)           return 'https://ws-simrs.net/skala_nyeri/a.png';
                if (n >= 1 && n <= 3)  return 'https://ws-simrs.net/skala_nyeri/b.png';
                if (n >= 4 && n <= 6)  return 'https://ws-simrs.net/skala_nyeri/c.png';
                if (n >= 7 && n <= 9)  return 'https://ws-simrs.net/skala_nyeri/d.png';
                return 'https://ws-simrs.net/skala_nyeri/e.png';
            },
            nyeriButtons() {
                const colorMap = [
                    'nyeri-btn-0',
                    'nyeri-btn-ringan','nyeri-btn-ringan','nyeri-btn-ringan',
                    'nyeri-btn-sedang','nyeri-btn-sedang','nyeri-btn-sedang',
                    'nyeri-btn-berat','nyeri-btn-berat','nyeri-btn-berat',
                    'nyeri-btn-parah',
                ];
                const labelMap = ['Tidak','Ringan','Ringan','Ringan','Sedang','Sedang','Sedang','Berat','Berat','Berat','Parah'];
                return Object.freeze(Array.from({length: 11}, (_, i) => ({
                    nilai: i,
                    color: colorMap[i],
                    label: labelMap[i],
                })));
            },
            skorTriase() {
                const checked = new Set(this.form.check_triase);
                let emergensi = 0, urgent = 0, nonUrgent = 0, doa = 0;

                (this.fact || []).forEach(group => {
                    (group.details || []).forEach(det => {
                        if (det.val_1 && checked.has(det.val_1)) emergensi++;
                        if (det.val_2 && checked.has(det.val_2)) urgent++;
                        if (det.val_4 && checked.has(det.val_4)) nonUrgent++;
                        if (det.val_5 && checked.has(det.val_5)) doa++;
                    });
                });

                const total = emergensi + urgent + nonUrgent + doa;
                let kategori = null;
                let warna = '';

                if (emergensi > 0)       { kategori = 'EMERGENSI';       warna = 'triase-hasil-emergensi'; }
                else if (doa > 0)        { kategori = 'DEATH ON ARRIVAL'; warna = 'triase-hasil-doa'; }
                else if (urgent > 0)     { kategori = 'URGENT';           warna = 'triase-hasil-urgent'; }
                else if (nonUrgent > 0)  { kategori = 'NON URGENT';       warna = 'triase-hasil-nonurgent'; }

                return { emergensi, urgent, nonUrgent, doa, total, kategori, warna };
            },
            ringkasanFisik() {
                const lines = this.secondary_surver_list.map(item => {
                    const organ = (item.label || item.organ).padEnd(12, ' ');
                    let parts = [];
                    if (item.fields && item.schemaFields) {
                        item.schemaFields.forEach(sf => {
                            const val = item.fields[sf.key];
                            if (!val || (Array.isArray(val) && val.length === 0) || val === '') return;
                            const disp = Array.isArray(val)
                                ? val.map(v => sf.options?.find(x => x.value === v)?.label || v).join(', ')
                                : (sf.options ? (sf.options.find(x => x.value === val)?.label || val) : val);
                            parts.push(`${sf.label}: ${disp}`);
                        });
                    }
                    const kondisi = parts.length > 0 ? parts.join(' | ') : (item.kondisi || 'NORMAL');
                    return `- ${organ}: ${kondisi}`;
                });
                return 'Pemeriksaan Fisik Sekunder:\n' + lines.join('\n');
            },
        },
        watch: {
            form: {
                deep: true,
                handler() {
                    clearTimeout(this._draftTimer);
                    this._draftTimer = setTimeout(() => this.save_draft(), 4000);
                }
            },
            nyeriValue() {
                clearTimeout(this._draftTimer);
                this._draftTimer = setTimeout(() => this.save_draft(), 4000);
            },
            secondary_surver_list: {
                deep: true,
                handler() {
                    clearTimeout(this._draftTimer);
                    this._draftTimer = setTimeout(() => this.save_draft(), 4000);
                }
            },
        },
        beforeUnmount() {
            clearTimeout(this._draftTimer);
            this.save_draft();
        },
        methods: {
            onHphtChange() {
                if (!this.form.hpht) { this.form.hpl = ''; this.form.usia_kehamilan_minggu = null; return; }
                const hpht = new Date(this.form.hpht);
                if (isNaN(hpht.getTime())) return;
                const hpl = new Date(hpht); hpl.setDate(hpl.getDate() + 280);
                this.form.hpl = hpl.toISOString().split('T')[0];
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today - hpht) / 86400000);
                this.form.usia_kehamilan_minggu = diffDays >= 0 ? Math.floor(diffDays / 7) : 0;
            },
            onUsiaChange(minggu) {
                if (minggu === null || minggu === undefined) return;
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const hpht = new Date(today); hpht.setDate(hpht.getDate() - minggu * 7);
                this.form.hpht = hpht.toISOString().split('T')[0];
                const hpl = new Date(hpht); hpl.setDate(hpl.getDate() + 280);
                this.form.hpl = hpl.toISOString().split('T')[0];
            },
            onHplChange() {
                if (!this.form.hpl) { this.form.hpht = ''; this.form.usia_kehamilan_minggu = null; return; }
                const hpl = new Date(this.form.hpl);
                if (isNaN(hpl.getTime())) return;
                const hpht = new Date(hpl); hpht.setDate(hpht.getDate() - 280);
                this.form.hpht = hpht.toISOString().split('T')[0];
                const today = new Date(); today.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((today - hpht) / 86400000);
                this.form.usia_kehamilan_minggu = diffDays >= 0 ? Math.floor(diffDays / 7) : 0;
            },
            copyRingkasan() {
                navigator.clipboard.writeText(this.ringkasanFisik).then(() => {
                    this.ringkasanCopied = true;
                    setTimeout(() => { this.ringkasanCopied = false; }, 2000);
                });
            },
            async generateReport() {
                const doc = new jsPDF();

                // Generate barcode
                const barcodeText = '123456789';

                doc.text("Hello world!", 20, 20);
                doc.text("This is client-side Javascript, pumping out a PDF.", 20, 30);

                doc.text("Do you like that?", 23, 20);

                // Generate barcode using JsBarcode

                doc.save('barcode.pdf');

                // Save the PDF document
            },
            async getlink_icare(noka, nomr, nama, row) {

                this.nama_pasien = nama;
                const dataform = new FormData();
                this.isLoading = true;
                this.form.noka = noka;
                this.data_trans = row;
                await axios.post('/icare-api', this.form)
                    .then(response => {
                        this.icare = response.data
                        this.open("info", this.icare.metaData.message)

                        if (this.icare.metaData.code == "200") {
                            let json = JSON.parse(this.icare.response);
                            this.url_icare = json.url;
                        }
                        this.isLoading = false
                        this.displayMaximizable = true;

                        //this.getriwayat_lengkap(nomr);
                        //this.openlink(json)
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                        this.open("warning", error.message)
                    })
                    .finally(() => this.isLoading = false)

            },
            async input_header_triase() {
                //console.log(this.form.startdate);
                this.isLoading = true;
                this.syncKondisi(); this.form.survey = this.secondary_surver_list;
                this.form.norm = this.datapasien.NOMR;
                this.form.data_gizi = this.$refs.gizi_form.get_value();


                await axios.post('/input_header_triase', this.form)
                    .then(response => {
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child

                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;
                    this.fetchData();
                }
            },
            call_oto()
            {
                this.showOtorisasi = true;
            },
            changeSlider(param) {
                const value = param;
                let nomor = 0;
                if (value >= 1 && value <= 3)  nomor = 1;
                else if (value >= 4 && value <= 6) nomor = 2;
                else if (value >= 7 && value <= 9) nomor = 3;
                else if (value > 9)                nomor = 4;
                const img = this.prev_skala_nyeri.find(x => x.nomor === nomor);
                if (img) this.prev_skala_nyeri_pic = img.link;
                this.form.nyeri = value;
            },
            bukaKajianResikoJatuh() {
                if (!this.form.noregister) return;
                window.open(`/kajian-resiko-jatuh/${this.form.noregister}`, '_blank');
            },
            redirectSafely(norm) {
                 try {
                     const url = `medical-record?norm=${norm}`;
                     window.open(url, '_blank');
                 } catch (error) {
                     console.error('Error opening new tab:', error);
                 }
            },
            printPDF() {
                const element = document.getElementById('pdfContent'); // The ID of the HTML element to be printed
                var opt = {
                    margin: 0,
                    filename: 'myfile.pdf',
                    image: {
                        type: 'jpeg',
                        quality: `0.98`
                    },
                    html2canvas: {
                        scale: 0.8
                    },
                    jsPDF: {
                        unit: 'in',
                        format: 'A4',
                        orientation: 'portrait'
                    }
                };
                html2pdf()
                    .set(opt)
                    .from(element)
                    .save();
            },

            filled_load_header(data) {

                this.form.waktu_masuk = data.waktu
                this.form.diantar_oleh = {
                    diantar_oleh: data.diantar_oleh,
                    code: data.id_diantar_oleh,
                }
                this.form.transportasi = {
                    transportasi: data.transportasi,
                    id: data.id_transportasi,
                }

                //this.form.rencana_tindak_lanjut = this.kondisiSaatPulang.filter(x=>x.code==data.code)
                this.form.rencana_tindak_lanjut = {
                    STATUS:data.STATUS,
                    KETERANGAN:data.KETERANGAN
                }

                if (data.dokter_sp) {
                    const savedMatch = this.dokter.master.find(d => d.KDDOKTER == data.dokter_sp);
                    this.form.dpjpSelected = savedMatch || { KDDOKTER: data.dokter_sp, NAMADOKTER: data.namadokter_sp };
                }
                this.dokterKonfirmasi = this.datapasien.KONFIRMASI_PS_SAYA == 1;

                if(data.code==200)
                {
                    this.form.keluhan_utama = data.keluhan_utama
                    this.form.suhu = data.suhu
                    //this.form.nyeri =data.nyeri;  //
                    this.form.tensi_sistol = data.tensi_sistol
                    this.form.tensi_distol = data.tensi_distol
                    this.form.nadipermenit = data.nadipermenit
                    this.form.saturasi = data.saturasi
                    this.form.respirasi = data.respirasi
                    this.form.bb = data.bb
                    this.form.tb = data.tb

                    this.form.riwayat_penyakit_dahulu = parseRiwayatToText(data.riwayat_penyakit_dahulu)
                    this.form.riwayat_penyakit_sekarang = data.riwayat_penyakit_sekarang
                    // this.form.slide_skala_nyeri =parseInt(data.nyeri)
                    this.form.resiko_jatuh = data.resiko_jatuh
                    this.form.status_psikologi = data.status_psikologi
                    this.form.kesadaran = data.kesadaran
                    this.stts_verif = data.telah_verif
                    this.form.nyeri = data.nyeri;
                    this.nyeriValue = parseInt(data.nyeri) || 0;
                    this.form.lokasinyeri = data.lokasinyeri
                    this.changeSlider(this.form.nyeri);

                    this.form.status_hamil          = !!data.status_hamil;
                    this.form.gravida               = data.gravida   ?? null;
                    this.form.para                  = data.para      ?? null;
                    this.form.abortus               = data.abortus   ?? null;
                    this.form.usia_kehamilan_minggu = data.usia_kehamilan_minggu ?? null;
                    this.form.hpl                   = (data.hpl && data.hpl !== '0000-00-00') ? data.hpl : '';
                    if (this.form.hpl) {
                        const hpl = new Date(this.form.hpl);
                        if (!isNaN(hpl.getTime())) {
                            const hpht = new Date(hpl);
                            hpht.setDate(hpht.getDate() - 280);
                            this.form.hpht = hpht.toISOString().split('T')[0];
                        }
                    }
                    this.form.leopold_tfu            = data.leopold_tfu            ?? null;
                    this.form.leopold_i              = data.leopold_i              ?? null;
                    this.form.leopold_ii_punggung    = data.leopold_ii_punggung    ?? null;
                    this.form.leopold_ii_posisi      = data.leopold_ii_posisi      ?? null;
                    this.form.leopold_iii            = data.leopold_iii            ?? null;
                    this.form.leopold_iii_masuk      = data.leopold_iii_masuk      ?? null;
                    this.form.leopold_iv_metode      = data.leopold_iv_metode      ?? this.defaultMetodePenurunan;
                    this.form.leopold_iv_konvergensi = data.leopold_iv_konvergensi ?? null;
                    this.form.leopold_iv_perlimaan   = data.leopold_iv_perlimaan   ?? null;
                    this.form.djj                    = data.djj                    ?? null;
                    this.form.djj_reguler            = data.djj_reguler            ?? null;
                }


            },
            async getdatareferensi() {
                this.isLoading = true;
                await axios.post('/get_referensi_triase', this.form)
                    .then(response => {
                        this.caradatang = response.data.response.diantar
                        this.transportasi = response.data.response.transport
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            print() {
                // Get the content to print
                const contentToPrint = this.$refs.contentToPrint;

                // Open a new window and write the content to print
                const printWindow = window.open('', '_blank');
                printWindow.document.write(contentToPrint.innerHTML);

                // Close the print window after printing
                //printWindow.document.close();
                printWindow.print();
                printWindow.close();
            },
            show_close() {


            },
            openConfirmation() {
                this.displayConfirmation = true
            },
            closeConfirmation() {
                this.displayConfirmation = false;

            },
            checkboxChanged() {

            },
            async initdata() {

                try {
                    for (let i = 0; i < this.fact.length; i++) {

                        for (let x = 0; x < this.fact[i].details.length; x++) {

                            if (this.fact[i].details[x].checked_val_1 == true) {
                                this.form.check_triase.push(this.fact[i].details[x].val_1)
                            }
                            if (this.fact[i].details[x].checked_val_2 == true) {
                                this.form.check_triase.push(this.fact[i].details[x].val_2)
                            }
                            if (this.fact[i].details[x].checked_val_3 == true) {
                                this.form.check_triase.push(this.fact[i].details[x].val_3)
                            }
                            if (this.fact[i].details[x].checked_val_4 == true) {
                                this.form.check_triase.push(this.fact[i].details[x].val_4)
                            }
                            if (this.fact[i].details[x].checked_val_5 == true) {
                                this.form.check_triase.push(this.fact[i].details[x].val_5)
                            }
                        }
                    }
                } catch (error) {
                    // Catching the error
                    console.error('An error occurred:', error.message);
                    // Optionally, you can handle the error here
                }
            },
            uncheck_all() {
                this.form.check_triase = [];
            },
            // open(type, message) {
            //     this.$toast.open({
            //         message: message,
            //         position: 'top-right',
            //         type: type,
            //         duration: 5000,
            //         dismissible: true
            //     })
            // },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            set_datetime_now() {
                var currentDate = new Date();
                this.form.waktu_masuk = currentDate;
                //console.log(this.form.startdate);
            },
            async fetchData() {
                var currentDate = new Date();
                //console.log(this.form.startdate);

                this.isLoading = true;
                await axios.post('/get_triase_form', this.form)
                    .then(response => {
                        //console.log(response.data.response)
                        this.fact = response.data.response
                        this.nilai_triase =response.data.nilatriase
                       // console.log('data json', JSON.parse(response.data));
                        if(response.data.survey && response.data.survey.length > 0) {
                            const saved = response.data.survey;
                            this.secondary_surver_list = this.secondary_surver_list.map(def => {
                                const match = saved.find(s => s.organ === def.organ);
                                if (!match) return def;
                                // restore kondisi & fields, merge agar key baru di schema tetap dapat default-nya
                                return Object.assign({}, def, {
                                    kondisi: match.kondisi || def.kondisi,
                                    fields:  Object.assign({}, def.fields, match.fields || {}),
                                });
                            });
                        }
                        if(response.data.header.code==200)
                        {

                        }
                        this.filled_load_header(response.data.header);

                        this.isLoading = false
                        this.initdata();
                        this.check_draft();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async allMasterDokter()
            {
                const d = new Date();
                const today = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
                const cacheKey = `dokter_master_${today}`;

                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    try {
                        this.dokter.master = JSON.parse(cached);
                        const kd = this.datapasien?.KDDOKTER;
                        if (kd) {
                            const match = this.dokter.master.find(x => x.KDDOKTER == kd);
                            if (match) this.form.dpjpSelected = match;
                        }
                        return;
                    } catch (e) {
                        localStorage.removeItem(cacheKey);
                    }
                }

                // Hapus semua cache dokter lama sebelum menyimpan yang baru
                const toDelete = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('dokter_master_')) toDelete.push(key);
                }
                toDelete.forEach(k => localStorage.removeItem(k));

                this.dokter.mode = 2;
                await axios.post('/getnamadokter', this.dokter)
                    .then(response => {
                        this.dokter.master = response.data.response;
                        try {
                            localStorage.setItem(cacheKey, JSON.stringify(response.data.response));
                        } catch (e) {
                            console.warn('Gagal menyimpan cache dokter:', e.message);
                        }
                        const kd = this.datapasien?.KDDOKTER;
                        if (kd) {
                            const match = this.dokter.master.find(x => x.KDDOKTER == kd);
                            if (match) this.form.dpjpSelected = match;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdataDokter(e)
            {
                if(e.query.length >= 3)
                {
                    this.dokter.nama = e.query;
                }
                var currentDate = new Date();
                this.dokter.mode =1;
                await axios.post('/getnamadokter', this.dokter)
                    .then(response => {

                        this.dokter.master = response.data.response
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            addDokter(e)
            {
                this.form.tindakanSelected =e.value;

            },

            alert_warn(title, message) {
                EventBus.$emit('show-alert', { type: 'warning', title, message });
            },
            validasi() {
                const fail = (title, message) => {
                    this.alert_warn(title, message);
                    return false;
                };

                if (!this.form.diantar_oleh || !this.form.diantar_oleh.code)
                    return fail('Cara Masuk', 'Pilihan "Diantar Oleh" wajib diisi.');

                if (!this.form.transportasi || !this.form.transportasi.id)
                    return fail('Cara Masuk', 'Transportasi pasien wajib dipilih.');

                if (!this.form.keluhan_utama || !this.form.keluhan_utama.trim())
                    return fail('Anamnese Singkat', 'Keluhan Utama wajib diisi.');
                if (this.$refs.keluhanRef && !this.$refs.keluhanRef.validate())
                    return fail('Anamnese Singkat', 'Keluhan Utama tidak valid (terlalu pendek atau data uji coba).');

                if (!this.form.suhu || this.form.suhu <= 0)
                    return fail('Tanda Vital', 'Suhu tubuh wajib diisi.');

                const usiaTahun = this.datapasien?.USIA_PASIEN?.tahun ?? 99;
                if (usiaTahun >= 17 && (!this.form.tensi_sistol || this.form.tensi_sistol <= 0))
                    return fail('Tanda Vital', 'Tekanan darah sistolik wajib diisi.');

                if (!this.form.nadipermenit || this.form.nadipermenit <= 0)
                    return fail('Tanda Vital', 'Nadi per menit wajib diisi.');

                if (!this.form.saturasi || this.form.saturasi <= 0)
                    return fail('Tanda Vital', 'Saturasi O₂ wajib diisi.');

                if (!this.form.respirasi || this.form.respirasi <= 0)
                    return fail('Tanda Vital', 'Respirasi wajib diisi.');

                if (!this.form.tb || this.form.tb <= 0)
                    return fail('Tanda Vital', 'Tinggi badan wajib diisi.');

                if (!this.form.bb || this.form.bb <= 0)
                    return fail('Tanda Vital', 'Berat badan wajib diisi.');

                if (!this.form.status_psikologi)
                    return fail('Status Psikologi', 'Status psikologi wajib dipilih.');

                if (!this.form.resiko_jatuh)
                    return fail('Risiko Jatuh', 'Risiko jatuh wajib dipilih.');

                if (!this.form.check_triase || this.form.check_triase.length === 0)
                    return fail('Penilaian Triase', 'Minimal satu pilihan triase harus dipilih.');

                if (this.nyeriValue > 0 && (!this.form.lokasinyeri || !this.form.lokasinyeri.trim()))
                    return fail('Skala Nyeri', 'Lokasi nyeri wajib diisi jika skor nyeri > 0.');

                if (this.form.lokasinyeri && this.form.lokasinyeri.trim() && this.nyeriValue === 0)
                    return fail('Skala Nyeri', 'Lokasi nyeri sudah diisi — pilih skala nyeri terlebih dahulu (minimal 1).');

                // if (this.form.rencana_tindak_lanjut?.STATUS == 7 && !this.form.dpjpSelected?.NAMADOKTER)
                //     return fail('Rujuk Rawat Inap', 'Dokter DPJP wajib dipilih jika merujuk ke rawat inap.');
                return true;
            },
            async simpan() {
                this.form.nyeri = this.nyeriValue; // sync nyeriValue ke form sebelum simpan
                this.syncKondisi(); this.form.survey = this.secondary_surver_list;

                let IsValid = this.validasi();
                if (!IsValid) return;

                const skor = this.skorTriase;
                this.form.hasil_triase_kategori  = skor.kategori  || '';
                this.form.hasil_triase_emergensi = skor.emergensi || 0;
                this.form.hasil_triase_urgent    = skor.urgent    || 0;
                this.form.hasil_triase_nonurgent = skor.nonUrgent || 0;
                this.form.hasil_triase_doa       = skor.doa       || 0;
                this.form.hasil_triase_total     = skor.total     || 0;

                this.isLoading = true;

                await axios.post('/simpan_triase', this.form)
                    .then(response => {


                        if (response.data.metadata.code == 200) {
                            this.open("success", response.data.metadata.message)
                            //this.displayConfirmation = true;
                            this.message = response.data.metadata.message;
                            this.delete_draft();
                            this.input_header_triase();

                        } else {
                            this.open("warning", response.data.metadata.message)
                            //this.displayConfirmation = true;
                            this.message = response.data.metadata.message;
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)



            },

            getscscreening_gizi_value()
            {
               var data = this.$refs.gizi_form.get_value();

            },
            buka_riwayat_kunjungan(norm) {
                const url = `medical-record?norm=${norm}`;
                window.open(url, '_blank');
            },
            buka_icare() {
                window.open('/icare/' + this.datapasien.NOMR, '_blank');
            },
            nyeriClass(n) {
                if (n === 0)           return 'nyeri-btn-0';
                if (n >= 1 && n <= 3)  return 'nyeri-btn-ringan';
                if (n >= 4 && n <= 6)  return 'nyeri-btn-sedang';
                if (n >= 7 && n <= 9)  return 'nyeri-btn-berat';
                return 'nyeri-btn-parah';
            },
            nyeriShortLabel(n) {
                if (n === 0)           return 'Tidak';
                if (n >= 1 && n <= 3)  return 'Ringan';
                if (n >= 4 && n <= 6)  return 'Sedang';
                if (n >= 7 && n <= 9)  return 'Berat';
                return 'Parah';
            },
            nyeriKeterangan(n) {
                const map = {
                    0:'Tidak ada nyeri', 1:'Nyeri sangat ringan', 2:'Nyeri ringan',
                    3:'Nyeri ringan terasa', 4:'Nyeri sedang', 5:'Nyeri sedang lebih kuat',
                    6:'Nyeri sedang-berat', 7:'Nyeri berat', 8:'Nyeri berat sekali',
                    9:'Nyeri sangat berat', 10:'Nyeri tak tertahankan'
                };
                return map[n] || '';
            },
            pilihNyeri(nilai) {
                this.nyeriValue = nilai;
            },
            copyObstetriText() {
                if (!this.obstetriText) return;
                navigator.clipboard.writeText(this.obstetriText)
                    .then(() => this.open('success', 'Ringkasan obstetri berhasil disalin ke clipboard.'))
                    .catch(() => this.open('warn', 'Gagal menyalin — coba salin manual dari kotak di atas.'));
            },
            async openSoapWithLeopold() {
                if (!this.leopoldText || !this.$refs.soapForm) return;
                this.$refs.soapForm.displayModal_open(false, 0, true);
                await this.$nextTick();
                const cur = this.$refs.soapForm.form.object || '';
                this.$refs.soapForm.form.object = cur
                    ? cur + '\n\n' + this.leopoldText
                    : this.leopoldText;
            },
            onLeopoldIIIChange() {
                if (!this.leopoldMasukPAPVisible) {
                    this.form.leopold_iii_masuk = null;
                }
                if (!this.leopoldIVVisible) {
                    this.form.leopold_iv_metode      = this.defaultMetodePenurunan;
                    this.form.leopold_iv_konvergensi = null;
                    this.form.leopold_iv_perlimaan   = null;
                }
            },
            onDokterSelected() {
                this.dokterKonfirmasi = false;
            },
            async konfirmasiDokter() {
                if (!this.form.dpjpSelected?.KDDOKTER) {
                    this.open('warning', 'Pilih dokter terlebih dahulu sebelum konfirmasi.');
                    return;
                }
                this.isLoading = true;
                try {

                    const payload = {
                        noregister: this.form.noregister,
                        kddokter:   this.form.dpjpSelected.KDDOKTER,
                    };

                    const response = await axios.post('/update_dokter_pendaftaran', payload);
                    if (response.data?.metadata?.code == 200) {
                        this.dokterKonfirmasi = true;
                        this.open('success', 'Dokter berhasil dikonfirmasi.');
                        this.$emit('dokter-dikonfirmasi', {
                            NAMADOKTER:        this.form.dpjpSelected.NAMADOKTER,
                            KDDOKTER:          this.form.dpjpSelected.KDDOKTER,
                            KONFIRMASI_PS_SAYA: 1,
                        });
                    } else {
                        this.open('warning', response.data?.metadata?.message || 'Gagal mengkonfirmasi dokter.');
                    }
                } catch (e) {
                    this.open('warning', 'Terjadi kesalahan saat konfirmasi dokter.');
                } finally {
                    this.isLoading = false;
                }
            },

            syncKondisi() {
                this.secondary_surver_list.forEach(item => {
                    if (!item.fields || !item.schemaFields) return;
                    const parts = [];
                    item.schemaFields.forEach(sf => {
                        const val = item.fields[sf.key];
                        if (!val || (Array.isArray(val) && val.length === 0) || val === '') return;
                        const disp = Array.isArray(val)
                            ? val.map(v => sf.options?.find(x => x.value === v)?.label || v).join(', ')
                            : (sf.options ? (sf.options.find(x => x.value === val)?.label || val) : val);
                        parts.push(`${sf.label}: ${disp}`);
                    });
                    item.kondisi = parts.length > 0 ? parts.join(' | ') : 'NORMAL';
                });
            },

            // ===== DRAFT METHODS =====
            _draftKey() {
                // Gunakan form.noregister (ditetapkan di created, tidak berubah saat prop datapasien berganti)
                const noReg = this.form.noregister || this.datapasien?.NOPENDAFTARAN;
                const d = new Date();
                const ymd = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
                return `triase_draft_${noReg}_${ymd}`;
            },
            cleanup_old_drafts() {
                const d = new Date();
                const todayStr = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
                const toDelete = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('triase_draft_')) {
                        const datePart = key.slice(-8);
                        if (/^\d{8}$/.test(datePart) && datePart < todayStr) {
                            toDelete.push(key);
                        }
                    }
                }
                toDelete.forEach(k => localStorage.removeItem(k));
            },
            save_draft() {
                try {
                    const FIELDS = [
                        'waktu_masuk','diantar_oleh','transportasi',
                        'keluhan_utama','riwayat_penyakit_dahulu',
                        'suhu','tensi_sistol','tensi_distol',
                        'nadipermenit','saturasi','respirasi','bb','tb',
                        'resiko_jatuh','status_psikologi','kesadaran',
                        'check_triase','lokasinyeri','nyeri',
                        'status_hamil','gravida','para','abortus',
                        'usia_kehamilan_minggu','hpht','hpl',
                        'leopold_tfu','leopold_i',
                        'leopold_ii_punggung','leopold_ii_posisi',
                        'leopold_iii','leopold_iii_masuk',
                        'leopold_iv_metode','leopold_iv_konvergensi','leopold_iv_perlimaan',
                        'djj','djj_reguler',
                        'dpjpSelected'
                    ];
                    const snapshot = {};
                    FIELDS.forEach(f => { snapshot[f] = this.form[f]; });
                    snapshot._survey      = this.secondary_surver_list;
                    snapshot._nyeriValue  = this.nyeriValue;
                    snapshot._savedAt     = new Date().toISOString();
                    localStorage.setItem(this._draftKey(), JSON.stringify(snapshot));
                } catch (e) {
                    console.warn('Draft tidak dapat disimpan:', e.message);
                }
            },
            check_draft() {
                try {
                    const raw = localStorage.getItem(this._draftKey());
                    if (!raw) return;
                    const draft = JSON.parse(raw);
                    this._pendingDraft = draft;
                    this.draftInfo = draft._savedAt
                        ? new Date(draft._savedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                        : '—';
                    this.draftBanner = true;
                } catch (e) {
                    localStorage.removeItem(this._draftKey());
                }
            },
            restore_draft() {
                if (!this._pendingDraft) return;
                const draft = this._pendingDraft;
                const FIELDS = [
                    'diantar_oleh','transportasi',
                    'keluhan_utama','riwayat_penyakit_dahulu',
                    'suhu','tensi_sistol','tensi_distol',
                    'nadipermenit','saturasi','respirasi','bb','tb',
                    'resiko_jatuh','status_psikologi','kesadaran',
                    'check_triase','lokasinyeri',
                    'status_hamil','gravida','para','abortus',
                    'usia_kehamilan_minggu','hpl',
                    'leopold_tfu','leopold_i',
                    'leopold_ii_punggung','leopold_ii_posisi',
                    'leopold_iii','leopold_iii_masuk',
                    'leopold_iv_metode','leopold_iv_konvergensi','leopold_iv_perlimaan',
                    'djj','djj_reguler',
                    'dpjpSelected'
                ];
                FIELDS.forEach(f => { if (draft[f] !== undefined) this.form[f] = draft[f]; });
                // Parse string riwayat ke object setelah restore
                this.form.riwayat_penyakit_obj = parseRiwayatString(this.form.riwayat_penyakit_dahulu);
                if (draft.waktu_masuk)  this.form.waktu_masuk = new Date(draft.waktu_masuk);
                if (draft._survey && draft._survey.length > 0) {
                    this.secondary_surver_list = this.secondary_surver_list.map(def => {
                        const match = draft._survey.find(s => s.organ === def.organ);
                        if (!match) return def;
                        return Object.assign({}, def, { kondisi: match.kondisi || def.kondisi, fields: match.fields || def.fields });
                    });
                }
                if (draft._nyeriValue !== undefined) {
                    this.nyeriValue = draft._nyeriValue;
                    this.changeSlider(draft._nyeriValue);
                }
                this.draftBanner   = false;
                this._pendingDraft = null;
                this.open('success', 'Draft berhasil dipulihkan.');
            },
            dismiss_draft() {
                this.draftBanner   = false;
                this._pendingDraft = null;
                this.delete_draft();
            },
            delete_draft() {
                try { localStorage.removeItem(this._draftKey()); } catch (e) {}
            },
        }
    }

</script>

<style scoped>
/* ===== VITAL SIGN CARDS ===== */
.vital-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.6rem;
    align-items: start;
}

.vital-card {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background: #fff;
    padding: 0.55rem 0.65rem 0.45rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

/* Tekanan Darah pakai 2 kolom */
.vital-card--td {
    grid-column: span 2;
}

.vital-card-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6c757d;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 0.3rem;
    margin-bottom: 0.1rem;
}

.vital-required {
    color: #dc3545;
    font-size: 0.75rem;
}

.vital-card--required {
    border-color: #f5c2c7;
    background: #fff8f8;
}

.vital-hint {
    font-size: 0.65rem;
    color: #adb5bd;
    text-align: center;
}

/* BMI card */
.vital-card--bmi {
    grid-column: span 2;
}

.bmi-body {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.bmi-value {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1;
    white-space: nowrap;
}

.bmi-unit {
    font-size: 0.62rem;
    font-weight: 500;
    color: #6c757d;
    margin-left: 0.1rem;
}

.bmi-tag :deep(.p-tag) {
    font-size: 0.62rem;
    padding: 0.1rem 0.4rem;
}

.bmi-scale {
    display: flex;
    gap: 0.1rem;
    margin-top: 0.3rem;
}

.bmi-scale-item {
    flex: 1;
    text-align: center;
    font-size: 0.55rem;
    padding: 0.15rem 0.05rem;
    border-radius: 3px;
    background: #f1f3f5;
    color: #868e96;
    line-height: 1.3;
    transition: background 0.2s, color 0.2s;
}

.bmi-scale-item small { font-size: 0.52rem; }

.bmi-scale-item.active {
    background: #e9ecef;
    color: #212529;
    font-weight: 700;
    outline: 1.5px solid #adb5bd;
}

.bmi-scale-normal {
    background: #f8f9fa;
}

/* Tekanan Darah — InputGroup styling */
.vital-card--td :deep(.p-inputgroup-addon) {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6c757d;
    padding: 0 0.5rem;
    min-width: unset;
}

.vital-card--td :deep(.p-inputnumber) {
    flex: 1;
    min-width: 0;
}

@media (max-width: 768px) {
    .vital-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .vital-card--td {
        grid-column: span 2;
    }
}

/* ===== DRAFT BANNER ===== */
.draft-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    background: #fff8e1;
    border: 1.5px solid #ffe082;
    border-radius: 8px;
    padding: 10px 16px;
    margin-bottom: 12px;
    color: #795548;
}
.draft-banner-content { display: flex; align-items: center; font-size: .88rem; }
.draft-banner-actions { display: flex; gap: 8px; }
.draft-btn-restore {
    background: #1976d2; color: #fff;
    border: none; border-radius: 5px;
    padding: 4px 12px; font-size: .82rem; font-weight: 600;
    cursor: pointer; transition: opacity .15s;
}
.draft-btn-restore:hover { opacity: .85; }
.draft-btn-dismiss {
    background: #fff; color: #b71c1c;
    border: 1px solid #ef9a9a; border-radius: 5px;
    padding: 4px 12px; font-size: .82rem; font-weight: 600;
    cursor: pointer; transition: opacity .15s;
}
.draft-btn-dismiss:hover { background: #ffebee; }
.draft-slide-enter-active, .draft-slide-leave-active { transition: all .25s ease; }
.draft-slide-enter-from, .draft-slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* ===== FORM LABEL ===== */
.form-label-custom {
    display: block;
    font-size: .78rem;
    font-weight: 600;
    color: #555;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: .04em;
}

/* ===== KARTU KEHAMILAN ===== */
.hamil-card {
    border: 1px solid rgba(0,0,0,.125);
    border-top: 3px solid #1976d2;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.07);
    overflow: hidden;
}

.hamil-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.125);
}

.hamil-card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: .88rem;
    color: #333;
    text-transform: uppercase;
    letter-spacing: .04em;
}

.hamil-card-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #1976d2;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .82rem;
    flex-shrink: 0;
}

.hamil-status-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    background: #1976d2;
    color: #fff;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .03em;
}

.hamil-card-body {
    padding: 12px 16px 14px;
}

/* Toggle baris status hamil */
.hamil-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
    padding: 10px 14px;
    border-radius: 6px;
    border: 1.5px solid #dee2e6;
    background: #f8f9fa;
    transition: background .18s, border-color .18s;
    user-select: none;
    margin: 0;
}
.hamil-toggle-row:hover {
    background: #e3f2fd;
    border-color: #90caf9;
}
.hamil-toggle-row--on {
    background: linear-gradient(90deg, #e3f2fd 0%, #f0f7ff 100%);
    border-color: #90caf9;
}

.hamil-toggle-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.hamil-toggle-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e3f2fd;
    color: #1976d2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: background .2s, color .2s;
    flex-shrink: 0;
}
.hamil-toggle-row--on .hamil-toggle-icon {
    background: #1976d2;
    color: #fff;
}

.hamil-toggle-text {
    font-weight: 700;
    font-size: .88rem;
    color: #333;
}

.hamil-toggle-hint {
    font-size: .74rem;
    color: #888;
    margin-top: 2px;
}

/* Animasi expand/collapse panel */
.hamil-expand-enter-active,
.hamil-expand-leave-active {
    transition: opacity .25s ease, max-height .3s cubic-bezier(.4,0,.2,1);
    overflow: hidden;
}
.hamil-expand-enter-from,
.hamil-expand-leave-to {
    opacity: 0;
    max-height: 0 !important;
}
.hamil-expand-enter-to,
.hamil-expand-leave-from {
    opacity: 1;
    max-height: 2000px;
}

/* Panel detail kehamilan */
.hamil-detail-panel {
    margin-top: 10px;
    padding: 14px 16px 12px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
}

/* Sub-header "Data Kehamilan" */
.hamil-sub-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: .75rem;
    font-weight: 700;
    color: #1565c0;
    text-transform: uppercase;
    letter-spacing: .06em;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #dee2e6;
}

/* Grid empat kolom untuk field kehamilan */
.hamil-fields-grid {
    display: grid;
    grid-template-columns: 3fr 1.5fr 2.5fr 2.5fr;
    gap: 12px;
    align-items: start;
}
.hamil-field {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.hamil-field-label {
    display: block;
    font-size: .72rem;
    font-weight: 700;
    color: #1565c0;
    text-transform: uppercase;
    letter-spacing: .05em;
    margin-bottom: 4px;
}
.hamil-field-label-sub {
    font-size: .68rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #888;
    margin-left: 4px;
}

/* Label sub untuk bagian Leopold */
.hamil-label-sub {
    font-size: .68rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #888;
    margin-left: 4px;
}

/* Input tanggal HPL (native date, dalam InputGroup) */
.hamil-date-input {
    flex: 1;
    height: 38px;
    border: 1px solid #ced4da;
    border-left: none;
    border-radius: 0 4px 4px 0;
    padding: 0 0.5rem;
    font-size: .9rem;
    color: #495057;
    background: #fff;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    min-width: 0;
}
.hamil-date-input:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 1px #1976d2;
}

/* Input readonly HPHT (hasil komputasi dari HPL) */
.hamil-hpht-input {
    flex: 1;
    height: 38px;
    border: 1px solid #ced4da;
    border-left: none;
    border-radius: 0 4px 4px 0;
    padding: 0 0.5rem;
    font-size: .9rem;
    color: #1976d2;
    background: #e3f2fd;
    cursor: default;
    outline: none;
    min-width: 0;
}

@media (max-width: 992px) {
    .hamil-fields-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 576px) {
    .hamil-fields-grid { grid-template-columns: 1fr; }
}

/* ===== PEMERIKSAAN LEOPOLD ===== */
.leopold-section {
    border-top: 1px dashed #dee2e6;
    padding-top: 12px;
}
.leopold-header {
    font-weight: 700;
    font-size: .85rem;
    color: #1565c0;
    text-transform: uppercase;
    letter-spacing: .05em;
    margin-bottom: 4px;
}
.leopold-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: flex-start;
}
.leopold-item {
    display: flex;
    flex-direction: column;
    min-width: 140px;
    flex: 1;
}
.leopold-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
@media (max-width: 992px) {
    .leopold-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 576px) {
    .leopold-grid { grid-template-columns: 1fr; }
}
.leopold-card {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #f0f7ff;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 10px 12px;
}
.leopold-card--disabled {
    opacity: .5;
    pointer-events: none;
}
.leopold-roman {
    font-size: 1.1rem;
    font-weight: 900;
    color: #1976d2;
    min-width: 22px;
    text-align: center;
    padding-top: 2px;
}
.leopold-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
}
.leopold-card-body .p-selectbutton {
    flex-wrap: wrap;
}
/* ===== RINGKASAN TEKS LEOPOLD ===== */
.leopold-summary {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    overflow: hidden;
}
.leopold-summary-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 12px;
    background: #e3f2fd;
    border-bottom: 1px solid #dee2e6;
    font-size: .8rem;
    font-weight: 700;
    color: #1565c0;
}
.leopold-summary-actions {
    display: flex;
    gap: 6px;
}
.leopold-summary-text {
    margin: 0;
    padding: 10px 14px;
    font-size: .9rem;
    line-height: 1.6;
    color: #242424;
    white-space: pre-wrap;
    word-break: break-word;
}

.djj-warning .p-inputgroup-addon,
.djj-warning .p-inputnumber-input {
    border-color: #dc3545 !important;
}
.djj-warning .p-inputgroup-addon {
    background: #fff5f5;
    color: #dc3545;
}

/* ===== TRIASE STAT CARDS ===== */
.triase-stat {
    display: flex;
    align-items: center;
    gap: 14px;
    border-radius: 10px;
    padding: 14px 18px;
    color: #fff;
    margin-bottom: 8px;
}
.triase-stat-icon { font-size: 1.8rem; opacity: .85; }
.triase-stat-value { font-size: 2rem; font-weight: 700; line-height: 1; }
.triase-stat-label { font-size: .8rem; opacity: .9; margin-top: 2px; }

.triase-emergensi { background: linear-gradient(135deg, #b71c1c, #ef5350); }
.triase-urgent    { background: linear-gradient(135deg, #e65100, #ffa726); }
.triase-nonurgent { background: linear-gradient(135deg, #1b5e20, #43a047); }
.triase-doa       { background: linear-gradient(135deg, #212121, #616161); }

/* ===== RADIO GRID ===== */
.radio-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 24px;
}
.radio-grid .field-radiobutton {
    display: flex;
    align-items: center;
}

/* ===== ALERGI BOX ===== */
.alergi-box {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
}
.alergi-box-title {
    background: #f8f9fa;
    padding: 8px 14px;
    font-weight: 700;
    font-size: .82rem;
    color: #444;
    border-bottom: 1px solid #dee2e6;
}
.alergi-box-body {
    padding: 14px;
    min-height: 48px;
}

/* ===== NYERI ===== */
.nyeri-score-box {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #1565c0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 4px;
}
.nyeri-legend { font-size: .8rem; color: #555; line-height: 1.8; }
.nyeri-dot {
    display: inline-block;
    width: 10px; height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
}
.nyeri-0       { background: #4caf50; }
.nyeri-ringan  { background: #8bc34a; }
.nyeri-sedang  { background: #ffc107; }
.nyeri-berat   { background: #ff5722; }
.nyeri-parah   { background: #b71c1c; }

/* ===== RADIO SKALA NYERI ===== */
.nyeri-radio-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.nyeri-radio-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 8px;
    border: 2px solid transparent;
    min-width: 52px;
    transition: all .15s;
    user-select: none;
}
.nyeri-radio-label:hover { filter: brightness(.92); }

.nyeri-radio-number {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}
.nyeri-radio-desc {
    font-size: .62rem;
    color: rgba(255,255,255,.85);
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: .03em;
}

/* Warna per kategori */
.nyeri-btn-0       { background: #43a047; border-color: #2e7d32; }
.nyeri-btn-ringan  { background: #8bc34a; border-color: #558b2f; }
.nyeri-btn-sedang  { background: #ffa726; border-color: #e65100; }
.nyeri-btn-berat   { background: #ef5350; border-color: #b71c1c; }
.nyeri-btn-parah   { background: #b71c1c; border-color: #7f0000; }

/* Efek terpilih */
.nyeri-active {
    box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(0,0,0,.5);
    transform: scale(1.12);
    opacity: 1 !important;
}
.nyeri-radio-label:not(.nyeri-active) {
    opacity: .65;
}

.nyeri-legend-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #dee2e6;
}

.action-divider {
    width: 1px;
    height: 28px;
    background: #dee2e6;
    margin: 0 4px;
}

/* ===== TRIASE TABLE ===== */
.triase-table thead th {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
    vertical-align: middle;
    white-space: nowrap;
}
.th-emergensi { background: #c62828; color: #fff; }
.th-urgent    { background: #f57c00; color: #fff; }
.th-nonurgent { background: #2e7d32; color: #fff; }
.th-doa       { background: #212121; color: #fff; }

.triase-table td { vertical-align: top; padding: 10px; }
.td-grouping { background: #f8f9fa; font-weight: 700; vertical-align: middle !important; }

.triase-table .field-checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

/* ===== SECONDARY SURVEY ===== */
/* Accordion — ikut tema PrimeVue 4 */
:deep(.ss-accordion .p-accordionpanel) {
    margin-bottom: 6px;
}
:deep(.ss-accordion .p-accordionheader) {
    gap: 8px;
}
:deep(.ss-accordion .p-accordioncontent-content) { padding: 10px 14px; }

.ss-acc-icon { font-size: .78rem; flex-shrink: 0; }
.ss-acc-label { flex: 1; }
.ss-acc-badge {
    font-size: .68rem; font-weight: 600;
    background: var(--p-primary-50, #e8f5e9); color: var(--p-primary-color, #00897B);
    border: 1px solid var(--p-primary-200, #a5d6a7); border-radius: 4px; padding: 1px 7px;
    max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* Organ div (legacy, masih dipakai jika grid diaktifkan kembali) */
.ss-organ-div { border:1px solid #dee2e6; border-radius:6px; overflow:hidden; }
.ss-organ-header {
    background:#00897B; color:#fff;
    font-size:.85rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
    padding:7px 12px;
}
.ss-organ-body { padding:10px 14px; }

/* Fields */
.ss-field { display:flex; align-items:center; gap:8px; margin-bottom:7px; flex-wrap:wrap; }
.ss-field-label { font-size:.85rem; font-weight:600; color:#555; min-width:100px; flex-shrink:0; }
.ss-field-opts { display:flex; flex-wrap:wrap; gap:8px; flex:1; }
.ss-opt-label { display:flex; align-items:center; gap:5px; font-size:.88rem; cursor:pointer; margin:0; }
.ss-text-input { flex:1; min-width:60px; font-size:.88rem; height:32px; }

/* Toggle button group (radio replacement) */
.ss-btn-group { display:flex; flex-wrap:wrap; gap:5px; flex:1; }
.ss-btn-opt {
    padding: 3px 12px; border-radius: 20px;
    border: 1.5px solid var(--p-primary-color);
    background: transparent;
    color: var(--p-primary-color);
    font-size: .88rem; font-weight: 600;
    cursor: pointer; transition: background .15s, color .15s;
    line-height: 1.7;
}
.ss-btn-opt:hover { background: var(--p-primary-50, #e8f5e9); }
.ss-btn-active {
    background: var(--p-primary-color) !important;
    color: var(--p-primary-contrast-color, #fff) !important;
}

/* Ringkasan */
.ss-ringkasan-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.ss-ringkasan-title { font-weight:700; font-size:.9rem; color:#333; display:flex; align-items:center; gap:6px; }

/* ===== QR VERIFIKASI ===== */
.qr-verif-wrap {
    display: flex;
}
.qr-verif-card {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,.08);
}
.qr-verif-label {
    font-size: .78rem;
    font-weight: 600;
    color: #555;
    text-align: center;
}

/* ===== HASIL SKOR TRIASE ===== */
.triase-hasil-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    animation: fadeIn .3s ease;
}
@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }

.triase-hasil-left { display: flex; align-items: center; }
.triase-hasil-label { opacity: .85; }
.triase-hasil-kategori { font-size: 1.1rem; letter-spacing: .04em; }
.triase-hasil-rincian { display: flex; gap: 6px; flex-wrap: wrap; }

.triase-hasil-emergensi { background: #ffebee; color: #b71c1c; border: 2px solid #ef5350; }
.triase-hasil-urgent    { background: #fff3e0; color: #e65100; border: 2px solid #ffa726; }
.triase-hasil-nonurgent { background: #e8f5e9; color: #1b5e20; border: 2px solid #43a047; }
.triase-hasil-doa       { background: #f5f5f5; color: #212121; border: 2px solid #616161; }
.triase-hasil-kosong    { background: #f8f9fa; color: #888;    border: 2px dashed #dee2e6; }

.rincian-chip {
    padding: 2px 10px;
    border-radius: 20px;
    font-weight: 700;
}
.chip-e     { background: #c62828; color: #fff; }
.chip-u     { background: #f57c00; color: #fff; }
.chip-n     { background: #2e7d32; color: #fff; }
.chip-d     { background: #424242; color: #fff; }
.chip-total { background: #1565c0; color: #fff; }

/* ===== TOMBOL KONFIRMASI DOKTER ===== */
@keyframes pulse-red {
    0%   { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.7); opacity: 1; }
    50%  { box-shadow: 0 0 0 6px rgba(211, 47, 47, 0); opacity: 0.75; }
    100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); opacity: 1; }
}
.btn-dokter-unconfirmed {
    animation: pulse-red 1.2s ease-in-out infinite;
}
.btn-dokter-confirmed {
    animation: none;
}
@keyframes blink-text {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
}
.btn-dokter-blink {
    animation: blink-text 1.2s ease-in-out infinite;
    font-weight: 600;
}

/* ===== TEKANAN DARAH PAIR ===== */
.td-pair {
    display: flex;
    align-items: center;
    gap: 4px;
}
.td-pair-item {
    flex: 1;
    min-width: 0;
}
.td-pair-sep {
    font-size: 1.3rem;
    font-weight: 700;
    color: #adb5bd;
    flex-shrink: 0;
    line-height: 1;
}

</style>
