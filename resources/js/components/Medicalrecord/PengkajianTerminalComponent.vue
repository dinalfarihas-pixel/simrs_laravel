<template>
    <section class="content">
        <ConfirmDialog group="pengkajianTerminal" />

        <!-- ===== DIALOG: FORM PENGKAJIAN ===== -->
        <Dialog header="Pengkajian Pasien Tahap Terminal" v-model:visible="showForm"
            :containerStyle="{width: '80vw'}"
            :contentStyle="{height: '75vh', overflowY: 'auto'}"
            position="center" :modal="true" :closable="!isSaving">

            <div class="row mb-3 align-items-end">
                <div class="col-md-3">
                    <label class="form-label-custom">Pengkajian</label>
                    <SelectButton v-model="formData.jenis_pengkajian" :options="['Awal','Ulang']" />
                </div>
                <div class="col-md-3">
                    <label class="form-label-custom">Tanggal &amp; Jam</label>
                    <Calendar v-model="formData.tanggal_jam" :showIcon="true" showTime hourFormat="24"
                        dateFormat="dd/mm/yy" style="width:100%" />
                </div>
            </div>

            <!-- 1. Gambaran umum pasien -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">1. Gambaran Umum Pasien</h3></div>
                <div class="card-body">
                    <label class="form-label-custom">a. Keadaan Pernafasan</label>
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in pernafasanOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'pf-'+opt" :value="opt" v-model="formData.pernafasan_items" />
                            <label :for="'pf-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label class="form-label-custom">SpO2</label>
                            <input v-model="formData.spo2" class="form-control" placeholder="%" />
                        </div>
                    </div>

                    <label class="form-label-custom">b. Kehilangan Tonus Otot</label>
                    <div class="checkbox-grid mb-3">
                        <div v-for="opt in tonusOtotOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'to-'+opt" :value="opt" v-model="formData.tonus_otot_items" />
                            <label :for="'to-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>

                    <label class="form-label-custom d-block">c. Nyeri</label>
                    <div class="d-flex mb-2" style="gap:16px">
                        <div class="field-radiobutton">
                            <RadioButton id="ny-tidak" name="nyeri_status" value="Tidak" v-model="formData.nyeri_status" />
                            <label for="ny-tidak" class="ml-2">Tidak</label>
                        </div>
                        <div class="field-radiobutton">
                            <RadioButton id="ny-ya" name="nyeri_status" value="Ya" v-model="formData.nyeri_status" />
                            <label for="ny-ya" class="ml-2">Ya</label>
                        </div>
                    </div>
                    <div v-if="formData.nyeri_status==='Ya'" class="row mb-3">
                        <div class="col-md-4">
                            <label class="form-label-custom">Lokasi</label>
                            <input v-model="formData.nyeri_lokasi" class="form-control" placeholder="Lokasi nyeri..." />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Skala</label>
                            <input v-model="formData.nyeri_skala" class="form-control" placeholder="0-10" />
                        </div>
                    </div>

                    <label class="form-label-custom">d. Perlambatan Sirkulasi</label>
                    <div class="checkbox-grid">
                        <div v-for="opt in sirkulasiOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'sr-'+opt" :value="opt" v-model="formData.sirkulasi_items" />
                            <label :for="'sr-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. Faktor -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">2. Faktor yang Meningkatkan / Membangkitkan Gejala Fisik</h3></div>
                <div class="card-body">
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in faktorOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'fk-'+opt" :value="opt" v-model="formData.faktor_items" />
                            <label :for="'fk-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Lainnya</label>
                    <input v-model="formData.faktor_lainnya" class="form-control" placeholder="Lainnya..." />
                </div>
            </div>

            <!-- 3. Managemen gejala -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">3. Managemen Gejala Saat Ini dan Respon Pasien — Masalah Keperawatan</h3></div>
                <div class="card-body">
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in masalahKeperawatanOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'mk-'+opt" :value="opt" v-model="formData.masalah_keperawatan_items" />
                            <label :for="'mk-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Lainnya</label>
                    <input v-model="formData.masalah_keperawatan_lainnya" class="form-control" placeholder="Lainnya..." />
                </div>
            </div>

            <!-- 4-6 -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">4-6. Orientasi Spiritual, Urusan &amp; Status Psikologi</h3></div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label-custom">4. Orientasi Spiritual Pasien dan Keluarga — Apakah perlu pelayanan spiritual?</label>
                        <Textarea v-model="formData.perlu_pelayanan_spiritual" style="width:100%" :rows="2" />
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label class="form-label-custom d-block">5. Perlu Didoakan</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="dd-ya" name="perlu_didoakan" value="Ya" v-model="formData.perlu_didoakan" />
                                    <label for="dd-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="dd-tidak" name="perlu_didoakan" value="Tidak" v-model="formData.perlu_didoakan" />
                                    <label for="dd-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label-custom d-block">Perlu Bimbingan Rohani</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="br-ya" name="perlu_bimbingan_rohani" value="Ya" v-model="formData.perlu_bimbingan_rohani" />
                                    <label for="br-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="br-tidak" name="perlu_bimbingan_rohani" value="Tidak" v-model="formData.perlu_bimbingan_rohani" />
                                    <label for="br-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="form-label-custom">6. Status Psikologi Pasien dan Keluarga</label>
                        <Textarea v-model="formData.status_psikologi" style="width:100%" :rows="2" />
                    </div>
                </div>
            </div>

            <!-- a. Kontak -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">a. Orang yang Ingin Dihubungi Saat Ini</h3></div>
                <div class="card-body">
                    <div class="d-flex mb-2" style="gap:16px">
                        <div class="field-radiobutton">
                            <RadioButton id="ka-ya" name="kontak_ada" value="Ya" v-model="formData.kontak_ada" />
                            <label for="ka-ya" class="ml-2">Ya</label>
                        </div>
                        <div class="field-radiobutton">
                            <RadioButton id="ka-tidak" name="kontak_ada" value="Tidak" v-model="formData.kontak_ada" />
                            <label for="ka-tidak" class="ml-2">Tidak</label>
                        </div>
                    </div>
                    <div v-if="formData.kontak_ada==='Ya'" class="row">
                        <div class="col-md-3">
                            <label class="form-label-custom">Siapa</label>
                            <input v-model="formData.kontak_siapa" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Hubungan dengan Pasien</label>
                            <input v-model="formData.kontak_hubungan" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">Dimana</label>
                            <input v-model="formData.kontak_dimana" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label-custom">No. Telepon / Hp</label>
                            <input v-model="formData.kontak_telpon" class="form-control" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- b. Rencana perawatan -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">b. Bagaimana Rencana Perawatan Selanjutnya?</h3></div>
                <div class="card-body">
                    <div class="d-flex mb-3" style="gap:16px">
                        <div class="field-radiobutton">
                            <RadioButton id="rp-rs" name="rencana_perawatan" value="Tetap Dirawat di Rumah Sakit" v-model="formData.rencana_perawatan" />
                            <label for="rp-rs" class="ml-2">Tetap Dirawat di Rumah Sakit</label>
                        </div>
                        <div class="field-radiobutton">
                            <RadioButton id="rp-rmh" name="rencana_perawatan" value="Dirawat di Rumah" v-model="formData.rencana_perawatan" />
                            <label for="rp-rmh" class="ml-2">Dirawat di Rumah</label>
                        </div>
                    </div>
                    <template v-if="formData.rencana_perawatan==='Dirawat di Rumah'">
                        <div class="row mb-2">
                            <div class="col-md-4">
                                <label class="form-label-custom d-block">Apakah lingkungan rumah sudah disiapkan?</label>
                                <div class="d-flex" style="gap:16px">
                                    <div class="field-radiobutton">
                                        <RadioButton id="ld-ya" name="lingkungan_disiapkan" value="Ya" v-model="formData.lingkungan_disiapkan" />
                                        <label for="ld-ya" class="ml-2">Ya</label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="ld-tidak" name="lingkungan_disiapkan" value="Tidak" v-model="formData.lingkungan_disiapkan" />
                                        <label for="ld-tidak" class="ml-2">Tidak</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label-custom d-block">Apakah ada yang mampu merawat pasien dirumah?</label>
                                <div class="d-flex" style="gap:16px">
                                    <div class="field-radiobutton">
                                        <RadioButton id="mm-ya" name="mampu_merawat_dirumah" value="Ya" v-model="formData.mampu_merawat_dirumah" />
                                        <label for="mm-ya" class="ml-2">Ya</label>
                                    </div>
                                    <div class="field-radiobutton">
                                        <RadioButton id="mm-tidak" name="mampu_merawat_dirumah" value="Tidak" v-model="formData.mampu_merawat_dirumah" />
                                        <label for="mm-tidak" class="ml-2">Tidak</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4" v-if="formData.mampu_merawat_dirumah==='Ya'">
                                <label class="form-label-custom">Oleh</label>
                                <input v-model="formData.mampu_merawat_oleh" class="form-control" />
                            </div>
                        </div>
                        <div v-if="formData.mampu_merawat_dirumah==='Tidak'">
                            <label class="form-label-custom d-block">Apakah perlu difasilitasi oleh Rumah Sakit?</label>
                            <div class="d-flex" style="gap:16px">
                                <div class="field-radiobutton">
                                    <RadioButton id="df-ya" name="perlu_difasilitasi_rs" value="Ya" v-model="formData.perlu_difasilitasi_rs" />
                                    <label for="df-ya" class="ml-2">Ya</label>
                                </div>
                                <div class="field-radiobutton">
                                    <RadioButton id="df-tidak" name="perlu_difasilitasi_rs" value="Tidak" v-model="formData.perlu_difasilitasi_rs" />
                                    <label for="df-tidak" class="ml-2">Tidak</label>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- c. Reaksi pasien -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">c. Reaksi Pasien Atas Penyakit</h3></div>
                <div class="card-body">
                    <label class="form-label-custom">Asesmen Informasi</label>
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in reaksiPasienOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rp-'+opt" :value="opt" v-model="formData.reaksi_pasien_items" />
                            <label :for="'rp-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Masalah Keperawatan</label>
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in reaksiPasienMasalahOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rpm-'+opt" :value="opt" v-model="formData.reaksi_pasien_masalah_items" />
                            <label :for="'rpm-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Lainnya</label>
                    <input v-model="formData.reaksi_pasien_lainnya" class="form-control" placeholder="Lainnya..." />
                </div>
            </div>

            <!-- d. Reaksi keluarga -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">d. Reaksi Keluarga Atas Penyakit Pasien</h3></div>
                <div class="card-body">
                    <label class="form-label-custom">Asesmen Informasi</label>
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in reaksiKeluargaOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rk-'+opt" :value="opt" v-model="formData.reaksi_keluarga_items" />
                            <label :for="'rk-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Masalah Keperawatan</label>
                    <div class="checkbox-grid">
                        <div v-for="opt in reaksiKeluargaMasalahOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rkm-'+opt" :value="opt" v-model="formData.reaksi_keluarga_masalah_items" />
                            <label :for="'rkm-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 7. Kebutuhan dukungan -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">7. Kebutuhan Dukungan / Kelonggaran Pelayanan</h3></div>
                <div class="card-body">
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in dukunganOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'dk-'+opt" :value="opt" v-model="formData.dukungan_items" />
                            <label :for="'dk-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Lainnya</label>
                    <input v-model="formData.dukungan_lainnya" class="form-control" placeholder="Lainnya..." />
                </div>
            </div>

            <!-- 8. Kebutuhan alternatif -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">8. Kebutuhan Alternatif / Tingkat Pelayanan Lain</h3></div>
                <div class="card-body">
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in alternatifOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'al-'+opt" :value="opt" v-model="formData.alternatif_items" />
                            <label :for="'al-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Lainnya</label>
                    <input v-model="formData.alternatif_lainnya" class="form-control" placeholder="Lainnya..." />
                </div>
            </div>

            <!-- 9. Faktor resiko keluarga -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">9. Faktor Resiko Bagi Keluarga yang Ditinggalkan</h3></div>
                <div class="card-body">
                    <label class="form-label-custom">Asesmen Informasi</label>
                    <div class="checkbox-grid mb-2">
                        <div v-for="opt in resikoKeluargaOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rr-'+opt" :value="opt" v-model="formData.resiko_keluarga_items" />
                            <label :for="'rr-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                    <label class="form-label-custom">Masalah Keperawatan</label>
                    <div class="checkbox-grid">
                        <div v-for="opt in resikoKeluargaMasalahOptions" :key="opt" class="field-checkbox">
                            <Checkbox :inputId="'rrm-'+opt" :value="opt" v-model="formData.resiko_keluarga_masalah_items" />
                            <label :for="'rrm-'+opt" class="ml-2">{{ opt }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Selesai pengkajian -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header"><h3 class="card-title font-weight-bold mb-0">Selesai Pengkajian</h3></div>
                <div class="card-body">
                    <div class="col-md-4 p-0">
                        <label class="form-label-custom">Tanggal &amp; Jam Selesai</label>
                        <Calendar v-model="formData.selesai_tanggal_jam" :showIcon="true" showTime hourFormat="24"
                            dateFormat="dd/mm/yy" style="width:100%" />
                    </div>
                    <small class="text-muted d-block mt-2">
                        <i class="fas fa-info-circle mr-1"></i>
                        Nama &amp; tanda tangan Perawat/Bidan diisi melalui TTE setelah pengkajian disimpan.
                    </small>
                </div>
            </div>

            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="showForm=false" class="p-button-text" :disabled="isSaving" />
                <Button label="Simpan" icon="pi pi-check" @click="simpan()" :loading="isSaving" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: TTE ===== -->
        <Dialog header="Tanda Tangan Elektronik (TTE) — Pengkajian Tahap Terminal" v-model:visible="showOtorisasi"
            :containerStyle="{width: '40vw'}" :modal="true">
            <otorisasi-form v-if="showOtorisasi" @getvalue="handleValueOto" :mode="23"
                :noregister="String(idPengkajianAktif)"></otorisasi-form>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showOtorisasi=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== RIWAYAT PENGKAJIAN ===== -->
        <div class="card card-primary card-outline elevation-0">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-user-clock mr-2 text-primary"></i>
                    Riwayat Pengkajian Pasien Tahap Terminal
                </h3>
                <div class="d-flex align-items-center" style="gap:8px">
                    <span class="badge badge-info">Total: {{ riwayat.length }}</span>
                    <Button label="Pengkajian Baru" icon="pi pi-plus" class="p-button-success p-button-sm" @click="bukaFormBaru()" />
                    <Button icon="pi pi-refresh" class="p-button-secondary p-button-outlined p-button-sm"
                        v-tooltip="'Muat ulang'" @click="fetchRiwayat()" :loading="isLoadingRiwayat" />
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-bordered table-sm align-middle mb-0">
                        <thead>
                            <tr>
                                <th style="width:5%">#</th>
                                <th style="width:8%">Jenis</th>
                                <th style="width:13%">Tanggal &amp; Jam</th>
                                <th>Ringkasan</th>
                                <th style="width:16%">Nama &amp; TTD</th>
                                <th style="width:8%" class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="riwayat.length===0">
                                <td colspan="6" class="text-center text-muted py-4">Belum ada pengkajian tahap terminal untuk pasien ini.</td>
                            </tr>
                            <tr v-for="(row,k) in riwayat" :key="row.id_pengkajian">
                                <td>{{ k+1 }}</td>
                                <td><span class="badge badge-secondary">{{ row.jenis_pengkajian }}</span></td>
                                <td>{{ formatWaktu(row.tanggal_jam) }}</td>
                                <td style="font-size:.85em">
                                    <div v-if="row.nyeri_status==='Ya'"><strong>Nyeri:</strong> {{ row.nyeri_lokasi }} (skala {{ row.nyeri_skala }})</div>
                                    <div v-if="row.rencana_perawatan"><strong>Rencana:</strong> {{ row.rencana_perawatan }}</div>
                                    <div v-if="(row.masalah_keperawatan_items||[]).length"><strong>Masalah Keperawatan:</strong> {{ row.masalah_keperawatan_items.join(', ') }}</div>
                                </td>
                                <td>
                                    <div v-if="row.auth==1">
                                        <qrcode-vue :value="'TTE-'+row.id_pengkajian" :size="36" level="H"></qrcode-vue>
                                        <div style="font-size:.75em;color:#2e7d32;font-weight:600">{{ row.auth_name || row.auth_by }}</div>
                                        <small class="text-muted">{{ formatWaktu(row.jam_auth) }}</small>
                                    </div>
                                    <span v-else class="text-muted">Belum ditandatangani</span>
                                </td>
                                <td class="text-center">
                                    <Button icon="pi pi-eye" class="p-button-rounded p-button-info p-button-sm mr-1"
                                        @click="lihatDetail(row)" title="Detail" />
                                    <Button v-if="row.auth!=1" icon="pi pi-lock-open"
                                        class="p-button-rounded p-button-warning p-button-sm mr-1"
                                        @click="call_oto(row.id_pengkajian)" title="TTE" />
                                    <Button v-if="row.auth!=1" icon="pi pi-trash"
                                        class="p-button-rounded p-button-danger p-button-sm"
                                        @click="konfirmasiHapus(row)" title="Hapus" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ===== DIALOG: DETAIL ===== -->
        <Dialog v-model:visible="showDetail" header="Detail Pengkajian Tahap Terminal" :modal="true"
            :containerStyle="{width: '60vw'}" :contentStyle="{maxHeight:'70vh', overflowY:'auto'}">
            <template v-if="detailData">
                <p><strong>{{ detailData.jenis_pengkajian }}</strong> — {{ formatWaktu(detailData.tanggal_jam) }}</p>
                <p v-if="detailData.pernafasan_items && detailData.pernafasan_items.length"><strong>Keadaan Pernafasan:</strong> {{ detailData.pernafasan_items.join(', ') }} <span v-if="detailData.spo2">(SpO2 {{ detailData.spo2 }})</span></p>
                <p v-if="detailData.tonus_otot_items && detailData.tonus_otot_items.length"><strong>Kehilangan Tonus Otot:</strong> {{ detailData.tonus_otot_items.join(', ') }}</p>
                <p v-if="detailData.nyeri_status"><strong>Nyeri:</strong> {{ detailData.nyeri_status }} <span v-if="detailData.nyeri_status==='Ya'">— {{ detailData.nyeri_lokasi }} (skala {{ detailData.nyeri_skala }})</span></p>
                <p v-if="detailData.sirkulasi_items && detailData.sirkulasi_items.length"><strong>Perlambatan Sirkulasi:</strong> {{ detailData.sirkulasi_items.join(', ') }}</p>
                <p v-if="detailData.faktor_items && detailData.faktor_items.length"><strong>Faktor Peningkat Gejala:</strong> {{ detailData.faktor_items.join(', ') }} <span v-if="detailData.faktor_lainnya">, {{ detailData.faktor_lainnya }}</span></p>
                <p v-if="detailData.masalah_keperawatan_items && detailData.masalah_keperawatan_items.length"><strong>Masalah Keperawatan:</strong> {{ detailData.masalah_keperawatan_items.join(', ') }}</p>
                <p v-if="detailData.perlu_pelayanan_spiritual"><strong>Pelayanan Spiritual:</strong> {{ detailData.perlu_pelayanan_spiritual }}</p>
                <p v-if="detailData.perlu_didoakan"><strong>Perlu Didoakan:</strong> {{ detailData.perlu_didoakan }} &nbsp; <strong>Bimbingan Rohani:</strong> {{ detailData.perlu_bimbingan_rohani }}</p>
                <p v-if="detailData.status_psikologi"><strong>Status Psikologi:</strong> {{ detailData.status_psikologi }}</p>
                <p v-if="detailData.kontak_ada==='Ya'"><strong>Kontak:</strong> {{ detailData.kontak_siapa }} ({{ detailData.kontak_hubungan }}), {{ detailData.kontak_dimana }}, {{ detailData.kontak_telpon }}</p>
                <p v-if="detailData.rencana_perawatan"><strong>Rencana Perawatan:</strong> {{ detailData.rencana_perawatan }}</p>
                <p v-if="detailData.reaksi_pasien_items && detailData.reaksi_pasien_items.length"><strong>Reaksi Pasien:</strong> {{ detailData.reaksi_pasien_items.join(', ') }}</p>
                <p v-if="detailData.reaksi_keluarga_items && detailData.reaksi_keluarga_items.length"><strong>Reaksi Keluarga:</strong> {{ detailData.reaksi_keluarga_items.join(', ') }}</p>
                <p v-if="detailData.dukungan_items && detailData.dukungan_items.length"><strong>Kebutuhan Dukungan:</strong> {{ detailData.dukungan_items.join(', ') }}</p>
                <p v-if="detailData.alternatif_items && detailData.alternatif_items.length"><strong>Kebutuhan Alternatif:</strong> {{ detailData.alternatif_items.join(', ') }}</p>
                <p v-if="detailData.resiko_keluarga_items && detailData.resiko_keluarga_items.length"><strong>Resiko Bagi Keluarga:</strong> {{ detailData.resiko_keluarga_items.join(', ') }}</p>
                <p v-if="detailData.selesai_tanggal_jam"><strong>Selesai:</strong> {{ formatWaktu(detailData.selesai_tanggal_jam) }}</p>
                <p v-if="detailData.auth==1"><strong>TTE oleh:</strong> {{ detailData.auth_name || detailData.auth_by }} — {{ formatWaktu(detailData.jam_auth) }}</p>
            </template>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showDetail=false" class="p-button-text" />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import { EventBus } from '../bus';
    import Dialog from 'primevue/dialog';
    import Textarea from 'primevue/textarea';
    import Checkbox from 'primevue/checkbox';
    import RadioButton from 'primevue/radiobutton';
    import SelectButton from 'primevue/selectbutton';
    import ConfirmDialog from 'primevue/confirmdialog';
    import QrcodeVue from 'qrcode.vue';

    export default {
        components: { Dialog, Textarea, Checkbox, RadioButton, SelectButton, ConfirmDialog, QrcodeVue },
        props: {
            noregisterProp: { type: String, default: null },
            datapasien: { type: Object, default: null },
        },
        data() {
            return {
                noregister: '',
                isLoadingRiwayat: false,
                isSaving: false,
                riwayat: [],
                showForm: false,
                showDetail: false,
                detailData: null,
                showOtorisasi: false,
                idPengkajianAktif: null,

                pernafasanOptions: ['Dispnea','Nafas cepat dan dangkal','Nafas lambat','Nafas tidak teratur','Nafas melalui mulut','Mukosa oral kering','Ada secret','Tidak ada kelainan'],
                tonusOtotOptions: ['Mual','Penurunan pergerakan tubuh','Sulit berbicara','Sulit menelan','Distensia abdomen','Inkontinensia urine','Inkontinensia feses','Tidak ada kelainan'],
                sirkulasiOptions: ['Bercak dan sianosis pada ekstermitas','Kulit dingin dan berkeringat','Tekanan darah menurun','Gelisah','Nadi lambat','Lemas','Tidak ada kelainan'],
                faktorOptions: ['Melakukan aktifitas fisik','Pindah posisi'],
                masalahKeperawatanOptions: ['Pola nafas tidak efektif','Nyeri','Perubahan persepsi sensori','Konstipasi','Bersihan jalan nafas tidak efektif','Defisit perawatan diri'],
                reaksiPasienOptions: ['Menyangkal','Takut','Rasa bersalah','Marah','Sedih/menangis','Ketidakberdayaan'],
                reaksiPasienMasalahOptions: ['Ansietas, kematian','Distres spiritual'],
                reaksiKeluargaOptions: ['Problem kebiasaan pola komunikasi','Penurunan konsentrasi','Ketidakmampuan memenuhi peran yang diharapkan','Keluarga kurang berkomunikasi dengan pasien','Keluarga kurang berpartisipasi membuat keputusan','Sedih/menangis','Rasa bersalah','Letih/lelah','Marah','Gangguan tidur'],
                reaksiKeluargaMasalahOptions: ['Koping individu tidak efektif','Distress spiritual','Perubahan proses keluarga'],
                dukunganOptions: ['Pasien perlu didampingi keluarga','Keluarga dapat mengunjungi pasien diluar waktu berkunjung','Sahabat dapat mengunjungi pasien diluar waktu berkunjung'],
                alternatifOptions: ['Tidak','Donasi organ'],
                resikoKeluargaOptions: ['Marah','Sedih/menangis','Depresi','Gangguan tidur','Rasa bersalah','Letih/lelah','Perubahan kebiasaan pola komunikasi','Ketidakmampuan memenuhi peran yang diharapkan'],
                resikoKeluargaMasalahOptions: ['Koping individu tidak efektif','Distress spiritual'],

                formData: this.emptyForm(),
            };
        },
        created() {
            this.noregister = this.noregisterProp || window.location.pathname.split('/').pop();
            this.fetchRiwayat();
        },
        watch: {
            noregisterProp(val) {
                if (val) {
                    this.noregister = val;
                    this.fetchRiwayat();
                }
            },
        },
        methods: {
            emptyForm() {
                return {
                    jenis_pengkajian: 'Awal',
                    tanggal_jam: new Date(),
                    pernafasan_items: [], spo2: '',
                    tonus_otot_items: [],
                    nyeri_status: 'Tidak', nyeri_lokasi: '', nyeri_skala: '',
                    sirkulasi_items: [],
                    faktor_items: [], faktor_lainnya: '',
                    masalah_keperawatan_items: [], masalah_keperawatan_lainnya: '',
                    perlu_pelayanan_spiritual: '',
                    perlu_didoakan: '', perlu_bimbingan_rohani: '',
                    status_psikologi: '',
                    kontak_ada: 'Tidak', kontak_siapa: '', kontak_hubungan: '', kontak_dimana: '', kontak_telpon: '',
                    rencana_perawatan: '', lingkungan_disiapkan: '', mampu_merawat_dirumah: '', mampu_merawat_oleh: '', perlu_difasilitasi_rs: '',
                    reaksi_pasien_items: [], reaksi_pasien_masalah_items: [], reaksi_pasien_lainnya: '',
                    reaksi_keluarga_items: [], reaksi_keluarga_masalah_items: [],
                    dukungan_items: [], dukungan_lainnya: '',
                    alternatif_items: [], alternatif_lainnya: '',
                    resiko_keluarga_items: [], resiko_keluarga_masalah_items: [],
                    selesai_tanggal_jam: null,
                };
            },
            bukaFormBaru() {
                this.formData = this.emptyForm();
                this.showForm = true;
            },
            async fetchRiwayat() {
                this.isLoadingRiwayat = true;
                try {
                    const res = await axios.post('/assesment/get_terminal', { noregister: this.noregister });
                    this.riwayat = Array.isArray(res.data?.response) ? res.data.response : [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoadingRiwayat = false;
                }
            },
            formatDate(d) {
                if (!d) return null;
                const pad = n => String(n).padStart(2, '0');
                return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
            },
            async simpan() {
                this.isSaving = true;
                try {
                    const payload = {
                        ...this.formData,
                        noregister: this.noregister,
                        nomr: this.datapasien ? this.datapasien.NOMR : '',
                        tanggal_jam: this.formatDate(this.formData.tanggal_jam),
                        selesai_tanggal_jam: this.formatDate(this.formData.selesai_tanggal_jam),
                    };
                    const res = await axios.post('/assesment/simpan_terminal', payload);
                    if (res.data?.code === 200 || res.data?.metadata?.code === 200) {
                        this.showForm = false;
                        this.open('success', 'Pengkajian tahap terminal berhasil disimpan');
                        await this.fetchRiwayat();
                    } else {
                        this.open('warning', res.data?.message || res.data?.metadata?.message || 'Gagal menyimpan pengkajian');
                    }
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                } finally {
                    this.isSaving = false;
                }
            },
            lihatDetail(row) {
                this.detailData = row;
                this.showDetail = true;
            },
            konfirmasiHapus(row) {
                this.$confirm.require({
                    group: 'pengkajianTerminal',
                    message: `Hapus pengkajian tanggal ${this.formatWaktu(row.tanggal_jam)}? Tindakan ini tidak dapat dibatalkan.`,
                    header: 'Konfirmasi Hapus',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClass: 'p-button-danger',
                    acceptLabel: 'Ya, Hapus',
                    rejectLabel: 'Batal',
                    accept: () => this.hapus(row),
                });
            },
            async hapus(row) {
                try {
                    await axios.post('/assesment/hapus_terminal', {
                        noregister: this.noregister,
                        id_pengkajian: row.id_pengkajian,
                    });
                    this.open('info', 'Pengkajian berhasil dihapus');
                    await this.fetchRiwayat();
                } catch (e) {
                    console.error(e);
                    this.open('error', e.message);
                }
            },
            call_oto(idPengkajian) {
                this.idPengkajianAktif = idPengkajian;
                this.showOtorisasi = true;
            },
            handleValueOto(code) {
                if (code == 200) {
                    this.showOtorisasi = false;
                    this.open('success', 'TTE berhasil dilakukan');
                    this.fetchRiwayat();
                }
            },
            formatWaktu(val) {
                if (!val) return '—';
                const d = new Date(String(val).replace(' ', 'T'));
                if (isNaN(d.getTime())) return val;
                const pad = n => String(n).padStart(2, '0');
                return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
        },
    }
</script>

<style scoped>
.form-label-custom {
    font-weight: 600;
    font-size: .85rem;
    color: #333;
    margin-bottom: 6px;
}
.checkbox-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px 16px;
}
.checkbox-grid .field-checkbox { display: flex; align-items: center; }
</style>
