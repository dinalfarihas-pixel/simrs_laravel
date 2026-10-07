<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <!-- Search Form -->
            <div class="card mb-4">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="pi pi-search mr-2"></i>Pencarian Data Pasien BPJS
                    </h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="noka" class="font-bold">Nomor Kartu BPJS/NIK <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <InputText 
                                        id="noka" 
                                        v-model="form.nik" 
                                        placeholder="Masukkan Nomor Kartu BPJS atau NIK"
                                        autocomplete="off" 
                                        class="form-control" 
                                    />
                                    <div class="input-group-append">
                                        <Button 
                                            label="Cari" 
                                            @click="get_data_peserta()" 
                                            icon="pi pi-search"
                                            class="p-button p-button-primary" 
                                        />
                                        <Button 
                                            label="" 
                                            @click="showDtailsForm()" 
                                            icon="pi pi-user"
                                            class="p-button-secondary ml-2" 
                                            style="width: 3em;" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <!-- NoSEP Display -->
            <div class="card mb-4" v-if="response_nosep">
                <div class="card-body text-center">
                    <h4><i class="pi pi-check-circle mr-2"></i>NoSEP : <strong>{{ response_nosep }}</strong></h4>
                </div>
            </div>

            <!-- Main Content -->
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <!-- Patient Information Panel -->
                        <div class="col-lg-4">
                            <div class="card patient-info-card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="pi pi-user mr-2"></i>Informasi Pasien
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <!-- Patient Illustration -->
                                    <div class="text-center mb-4">
                                        <img 
                                            class="patient-illustration"
                                            src="https://ws-simrs.link/ilustration/ilustrasi1.png"
                                            alt="Patient Illustration"
                                        >
                                    </div>
                                     
                                    <!-- Patient Details -->
                                    <div class="patient-details">
                                        <div class="detail-item">
                                            <label>Nama Pasien</label>
                                            <div class="detail-value">{{ peserta.nama || '-' }}</div>
                                        </div>
                                        
                                        <div class="detail-item">
                                            <label>Nomor BPJS</label>
                                            <div class="detail-value">{{ peserta.noKartu || '-' }}</div>
                                        </div>

                                        <div class="detail-item">
                                            <label>NIK</label>
                                            <div class="detail-value">{{ peserta.nik || '-' }}</div>
                                        </div>

                                        <div class="detail-item">
                                            <label>Status</label>
                                            <div class="detail-value">
                                                <span 
                                                    v-if="peserta.nama"
                                                    :class="getStatusBadgeClass(peserta.statusPeserta?.keterangan)"
                                                    class="badge"
                                                >
                                                    {{ peserta.statusPeserta?.keterangan || 'TIDAK AKTIF' }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="detail-item">
                                            <label>Jenis Kelamin</label>
                                            <div class="detail-value">{{ getGenderText(peserta.sex) }}</div>
                                        </div>

                                        <div class="detail-item">
                                            <label>Tanggal Lahir</label>
                                            <div class="detail-value">{{ peserta.tglLahir || '-' }}</div>
                                        </div>

                                        <div class="detail-item">
                                            <label>Faskes Tingkat I</label>
                                            <div class="detail-value">{{ peserta.provUmum?.nmProvider || '-' }}</div>
                                        </div>

                                        <div class="detail-item">
                                            <label>Hak Kelas</label>
                                            <div class="detail-value">{{ peserta.hakKelas?.keterangan || '-' }}</div>
                                        </div>
                                    </div>

                                    <div class="mt-4 text-center">
                                        <Button 
                                            label="Lihat Detail Lengkap" 
                                            icon="pi pi-info-circle"
                                            class="p-button-secondary p-button-sm" 
                                            @click="InfoBPJS = true" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SEP Form Panel -->
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="mb-0">
                                        <i class="pi pi-file-edit mr-2"></i>Form Pendaftaran/Penerbitan SEP
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <!-- Date and Cataract -->
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="font-bold">Tanggal SEP <span class="text-danger">*</span></label>
                                                <Calendar 
                                                    v-model="form.tglsep" 
                                                    :showIcon="true" 
                                                    view="date"
                                                    dateFormat="dd/mm/yy" 
                                                    :yearNavigator="true" 
                                                    yearRange="2000:2030"
                                                    placeholder="Pilih Tanggal SEP" 
                                                    class="w-100"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-9">
                                             <div class="form-group">
                                                <label class="font-bold">Pasien Katarak ?</label>
                                                <div style="display: flex; align-items: center; margin-top: 8px;">
                                                    <Checkbox 
                                                        v-model="form.pasienkatarak" 
                                                        :binary="true"
                                                        id="pasienkatarak" 
                                                    />
                                                    <label for="pasienkatarak" style="margin-left: 8px; margin-bottom: 0; cursor: pointer;">Ya, pasien katarak</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Medical Record Number -->
                                    <div class="form-group">
                                        <label class="font-bold">No. Rekam Medis <span class="text-danger">*</span></label>
                                        <InputText 
                                            v-model="form.norm" 
                                            placeholder="Masukkan No. Rekam Medis"
                                            class="w-100"
                                        />
                                    </div>

                                        <!-- Treatment Type -->
                                    <div class="form-group">
                                        <label class="font-bold">Cara Bayar <span class="text-danger">*</span></label>
                                        <Select 
                                            :filter="true" 
                                            v-model="form.caraBayarSelected"
                                            :options="caraBayarList" 
                                            optionLabel="NAMA" 
                                            placeholder="Pilih Cara Bayar"
                                            class="w-100"
                                            @change="saveToLocal"
                                        />
                                    </div>

                                    <!-- Treatment Type -->
                                    <div class="form-group">
                                        <label class="font-bold">Jenis Rawat <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.jenisrawatSelected"
                                            :options="jenisrawat" 
                                            optionLabel="caption" 
                                            
                                            placeholder="Pilih Jenis Rawat"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Doctor Selection -->
                                    <div class="form-group">
                                        <label class="font-bold">Pilih Dokter <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.dokterSelected"
                                            :options="listDokter" 
                                            optionLabel="NAMADOKTER"
                                            :filter="true" 
                                            placeholder="Cari dan pilih dokter"
                                            :showClear="true"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Diagnosis -->
                                    <div class="form-group">
                                        <label class="font-bold">Diagnosa <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.diagnoseSelected"
                                            :options="listDiagnose"
                                            optionLabel="dx" 
                                            :filter="true" 
                                            :showClear="true" 
                                            :loading="isLoading"
                                            @filter="searchDiagnose" 
                                            placeholder="Ketik minimal 3 karakter untuk mencari diagnosa"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Outpatient Clinic (conditional) -->
                                    <div class="form-group" v-if="form.jenisrawatSelected?.code == 2">
                                        <label class="font-bold">Poli Klinik/IGD <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.poliSelected"
                                            :options="list_poli" 
                                            optionLabel="display"
                                            placeholder="Pilih Poli/IGD"
                                            class="w-100"
                                        />
                                    </div>

                                     <!-- SPRI Number (conditional) - FOR INPATIENT -->  
                                    <div class="form-group" v-if="form.jenisrawatSelected && form.jenisrawatSelected.code === 1 && form.caraBayarSelected.KODE==='5'">
                                        <label class="font-bold">No. SPRI <span class="text-danger">*</span></label>
                                        <div style="display: flex; width: 100%;">
                                            <InputText 
                                                v-model="form.nospri" 
                                                placeholder="Masukkan No. SPRI"
                                                style="flex: 1; margin-right: 8px;"
                                            />
                                            <Button 
                                                label="Buat SPRI" 
                                                @click="loadSPRI()" 
                                                icon="pi pi-plus"
                                                class="p-button-secondary" 
                                                :loading="isLoadingSPRI"
                                                style="white-space: nowrap;"
                                            />
                                        </div>
                                        <small style="color: #6c757d; font-size: 0.875rem; margin-top: 4px; display: block;">
                                            Klik "Buat SPRI" untuk generate nomor SPRI otomatis
                                        </small>
                                    </div>

                                    <!-- Class Treatment -->
                                    <div class="form-group">
                                        <label class="font-bold">Kelas Rawat <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.klsRawatNaik"
                                            :options="klsRawatNaik" 
                                            optionLabel="caption"
                                            placeholder="Pilih Kelas Rawat"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Traffic Accident -->
                                    <div class="form-group">
                                        <label class="font-bold">Pasien KLL? <span class="text-danger">*</span></label>
                                        <Select 
                                            v-model="form.lakaLantas"
                                            :options="lakaLantas" 
                                            @change="getdata_propinsi_bpjs"
                                            optionLabel="caption"
                                            placeholder="Pilih status KLL"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Traffic Accident Details (conditional) -->
                                    <div v-if="form.lakaLantas?.code > 0" class="kll-details">
                                        <div class="form-group">
                                            <label class="font-bold">Tanggal KLL <span class="text-danger">*</span></label>
                                            <Calendar 
                                                v-model="form.tanggalKLL" 
                                                :showIcon="true" 
                                                view="date"
                                                dateFormat="dd/mm/yy" 
                                                :yearNavigator="true" 
                                                yearRange="2000:2030"
                                                placeholder="Pilih Tanggal KLL" 
                                                class="w-100"
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label class="font-bold">Provinsi Lokasi KLL <span class="text-danger">*</span></label>
                                            <Select 
                                                v-model="form.provSelected"
                                                :options="listPropinsi" 
                                                @change="get_Kabupten"
                                                optionLabel="nama" 
                                                :filter="true" 
                                                :showClear="true"
                                                placeholder="Pilih Provinsi"
                                                class="w-100"
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label class="font-bold">Kabupaten/Kota <span class="text-danger">*</span></label>
                                            <Select 
                                                v-model="form.kabSelected"
                                                :options="listKabupaten" 
                                                @change="getdata_kecamatan_bpjs"
                                                optionLabel="nama" 
                                                :filter="true" 
                                                :showClear="true"
                                                placeholder="Pilih Kabupaten/Kota"
                                                class="w-100"
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label class="font-bold">Kecamatan <span class="text-danger">*</span></label>
                                            <Select 
                                                v-model="form.kecSelected"
                                                :options="listKecamatan"
                                                optionLabel="nama" 
                                                :filter="true" 
                                                :showClear="true"
                                                placeholder="Pilih Kecamatan"
                                                class="w-100"
                                            />
                                        </div>
                                    </div>

                                    <!-- Notes -->
                                    <div class="form-group">
                                        <label class="font-bold">Catatan SEP</label>
                                        <Textarea 
                                            v-model="form.catatan" 
                                            :autoResize="true" 
                                            rows="3"
                                            placeholder="Masukkan catatan tambahan (opsional)"
                                            class="w-100"
                                        />
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="form-group mt-4">
                                        <div class="btn-group w-100">
                                            <Button 
                                                label="Detail Pasien" 
                                                @click="InfoBPJS = true" 
                                                icon="pi pi-user"
                                                class="p-button-secondary mr-2 flex-fill" 
                                            />
                                            <Button 
                                                label="Terbitkan SEP" 
                                                @click="terbitkanSEP()" 
                                                icon="pi pi-save"
                                                class="p-button flex-fill" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Patient Detail Modal -->
            <Dialog 
                header="Detail Lengkap Pasien BPJS" 
                :modal="true" 
                v-model:visible="InfoBPJS" 
                :closable="true" 
                :containerStyle="{ width: '90vw', maxWidth: '1200px' }"
                
            >
                <div >
                    <!-- Search Section in Modal -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h6 class="mb-0">Pencarian Ulang Data Pasien</h6>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <InputText 
                                            v-model="form.nik" 
                                            placeholder="Nomor Kartu BPJS/NIK"
                                            class="form-control"
                                        />
                                        <div class="input-group-append">
                                            <Button 
                                                label="Cari" 
                                                @click="get_data_peserta()" 
                                                icon="pi pi-search"
                                                class="p-button" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Detailed Patient Information Table -->
                    <div class="card">
                        <div class="card-header">
                            <h6 class="mb-0">Informasi Lengkap Pasien</h6>
                        </div>
                        <div class="card-body table-responsive" style="max-height: 500px; overflow-y: auto;">
                            <table class="table table-bordered table-striped">
                                <tbody>
                                    <!-- Personal Information -->
                                    <tr class="table-primary">
                                        <th colspan="2" class="text-center"><strong>INFORMASI PRIBADI</strong></th>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold" style="width: 30%;">Nomor Kartu</td>
                                        <td>{{ peserta.noKartu || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">NIK</td>
                                        <td>{{ peserta.nik || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Nama Lengkap</td>
                                        <td>{{ peserta.nama || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Jenis Kelamin</td>
                                        <td>{{ getGenderText(peserta.sex) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Tanggal Lahir</td>
                                        <td>{{ peserta.tglLahir || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">PISA</td>
                                        <td>{{ peserta.pisa || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">No. Medical Record</td>
                                        <td>{{ peserta.mr?.noMR || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">No. Telepon</td>
                                        <td>{{ peserta.mr?.noTelepon || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Umur Sekarang</td>
                                        <td>{{ peserta.umur?.umurSekarang || '-' }}</td>
                                    </tr>

                                    <!-- Membership Information -->
                                    <tr class="table-info">
                                        <th colspan="2" class="text-center"><strong>INFORMASI KEPESERTAAN</strong></th>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Status Peserta</td>
                                        <td>
                                            <span 
                                                :class="getStatusBadgeClass(peserta.statusPeserta?.keterangan)"
                                                class="badge"
                                            >
                                                {{ peserta.statusPeserta?.keterangan || 'TIDAK AKTIF' }}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Jenis Peserta</td>
                                        <td>{{ peserta.jenisPeserta?.keterangan || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Hak Kelas</td>
                                        <td>{{ peserta.hakKelas?.keterangan || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Faskes Tingkat I</td>
                                        <td>
                                            {{ peserta.provUmum?.nmProvider ? 
                                               `${peserta.provUmum.nmProvider} (${peserta.provUmum.kdProvider})` : '-' }}
                                        </td>
                                    </tr>

                                    <!-- Card Information -->
                                    <tr class="table-warning">
                                        <th colspan="2" class="text-center"><strong>INFORMASI KARTU</strong></th>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Tanggal Cetak Kartu</td>
                                        <td>{{ peserta.tglCetakKartu || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Tanggal TMT</td>
                                        <td>{{ peserta.tglTMT || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Tanggal TAT</td>
                                        <td>{{ peserta.tglTAT || '-' }}</td>
                                    </tr>

                                    <!-- COB Information -->
                                    <tr class="table-success">
                                        <th colspan="2" class="text-center"><strong>INFORMASI COB</strong></th>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Nama Asuransi</td>
                                        <td>{{ peserta.cob?.nmAsuransi || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">No. Asuransi</td>
                                        <td>{{ peserta.cob?.noAsuransi || '-' }}</td>
                                    </tr>

                                    <!-- Additional Information -->
                                    <tr class="table-secondary">
                                        <th colspan="2" class="text-center"><strong>INFORMASI TAMBAHAN</strong></th>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Dinsos</td>
                                        <td>{{ peserta.informasi?.dinsos || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Prolanis PRB</td>
                                        <td>{{ peserta.informasi?.prolanisPRB || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">No. SKTM</td>
                                        <td>{{ peserta.informasi?.noSKTM || '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">e-SEP</td>
                                        <td>{{ peserta.informasi?.eSEP || '-' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div class="modal-footer">
                        <Button 
                            label="Tutup" 
                            icon="pi pi-times" 
                            @click="InfoBPJS = false" 
                            class="p-button-secondary mr-2" 
                        />
                        <Button 
                            label="Terbitkan SEP" 
                            @click="terbitkanSEP()" 
                            icon="pi pi-save"
                            class="p-button" 
                        />
                    </div>
                </template>
            </Dialog>
        </div>

         <Dialog 
                header="List Surat Perintah Rawat Inap" 
                :modal="true" 
                v-model:visible="ListSPRI" 
                :closable="true" 
                :containerStyle="{ width: '60vw', maxWidth: '1200px' }">
               
            <div class="card">
                <div class="card-body">
                      <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
                                <table class="table table-bordered table-striped table-hover">
                                    <thead class="thead-light sticky-top">
                                        <tr>
                                            <th style="width: 5%;">#</th>
                                            <th style="width: 15%;">No. SPRI</th>
                                            <th style="width: 10%;">Tanggal</th>
                                            <th style="width: 20%;">Dokter</th>
                                            <th style="width: 10%;">Jenis Rawat</th>
                                            <th style="width: 15%;">Poli/Ruang</th>
                                            <th style="width: 10%;">No. Register</th>
                                            <th style="width: 10%;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isLoadingSPRI">
                                            <td colspan="8" class="text-center py-4">
                                                <i class="pi pi-spin pi-spinner mr-2"></i>
                                                Memuat data SPRI...
                                            </td>
                                        </tr>
                                        <tr v-else-if="spriHistoryData.length === 0">
                                            <td colspan="8" class="text-center py-4 text-muted">
                                                <i class="pi pi-info-circle mr-2"></i>
                                                Tidak ada data SPRI ditemukan
                                            </td>
                                        </tr>
                                        <tr v-else v-for="(spri, index) in spriHistoryData" :key="index">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td>
                                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                                    <div>
                                                        <strong class="text-primary">{{ spri.SPRI }}</strong>
                                                        <br>
                                                        <small class="text-muted">{{ spri.NO_KARTU }}</small>
                                                    </div>
                                                    <Button 
                                                        icon="pi pi-copy" 
                                                        @click="copySPRI(spri.SPRI, index)"
                                                        class="p-button-text p-button-sm copy-btn"
                                                        :class="{ 'copied': copiedSPRIIndex === index }"
                                                        :title="copiedSPRIIndex === index ? 'Tersalin!' : 'Salin SPRI'"
                                                        style="padding: 0.25rem; margin-left: 8px;"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <span class="badge badge-light">{{ formatDate(spri.TANGGAL) }}</span>
                                            </td>
                                            <td>
                                                <strong>{{ spri.NAMADOKTER }}</strong>
                                                <br>
                                                <small class="text-muted">Kode: {{ spri.KODE_DOKTER_BPJS }}</small>
                                            </td>
                                            <td>
                                               
                                                    {{ spri.JENISRAWAT }}
                                             
                                            </td>
                                            <td>{{ spri.POLI_KONTROL || '-' }}</td>
                                            <td>
                                                <code>{{ spri.NOREGISTER }}</code>
                                            </td> 
                                            <td>
                                                <Button 
                                                label="Cetak" 
                                                @click="cetakSPRI(spri)"
                                                icon="pi pi-print"
                                                 style="padding: 0.25rem; margin-left: 8px;"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                </div>
            </div>
        </Dialog>

        <Dialog header="Pendaftaran Pasien" 
                :modal="true" 
                v-model:visible="ShowFormPasien" 
                :closable="true" 
                :containerStyle="{ width: '60vw', maxWidth: '1200px' }">
            <pendaftaranPasien :os="data"></pendaftaranPasien>
        </Dialog>
                
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Checkbox from 'primevue/checkbox';
    import Textarea from 'primevue/textarea';  
    
    export default {
        components: {
            Loading,
            Checkbox,
            Textarea
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                ShowFormPasien:false,
                list_poli: [{
                    kode: 'IGD',
                    display: 'INSTALASI GAWAT DARURAT'
                }],
                data: null,
                pasienkatarak: 0,
                InfoBPJS: false,
                lakaLantas: [
                    { caption: "Bukan Kecelakaan lalu lintas [BKLL]", code: 0 },
                    { caption: "KLL dan bukan kecelakaan Kerja [BKK]", code: 1 },
                    { caption: "KLL dan KK", code: 2 },
                    { caption: "Kecelakaan Kerja [KK]", code: 2 }
                ],
                form: { 
                    startdate: '',
                    enddate: '',
                    nik: '',
                    dokterSelected: "",
                    diagnoseSelected: "",
                    pasienkatarak: 0,
                    catatan: "-",
                    nospri: "",
                    tglsep: "",
                    norm: '',
                    tanggalKLL: '',
                    poliSelected: {
                        kode: 'IGD',
                        display: 'INSTALASI GAWAT DARURAT'
                    },
                    jenisrawatSelected: {
                        caption: 'INAP',
                        code: 1
                    },
                    caraBayarSelected:{
                        KODE:0
                    },
                    klsRawatNaik: {
                        caption: '',
                        code: 0
                    },
                    lakaLantas: {
                        caption: "Bukan Kecelakaan lalu lintas [BKLL]",
                        code: 0,
                    },
                    provSelected: { kode: '', nama: '' },
                    kecSelected: { kode: '', nama: '' },
                },
                jenisrawat: [
                    { caption: 'JALAN', code: 2 },
                    { caption: 'INAP', code: 1 }
                ],
                isLoading: false,
                fullPage: true,
                showDetailModal: false,
                hasVisitData: false,
                listDiagnose: [],
                response_nosep: "",
                listDokter: [],
                listPropinsi: [],
                klsRawatNaik: [
                    { caption: "VVIP", code: 1 },
                    { caption: "VIP", code: 2 },
                    { caption: "Kelas 1", code: 3 },
                    { caption: "Kelas 2", code: 4 },
                    { caption: "Kelas 3", code: 5 },
                    { caption: "ICCU", code: 6 },
                    { caption: "ICU", code: 7 },
                    { caption: "Diatas Kelas 1", code: 8 }
                ],
                peserta: {
                    noKartu: "",
                    nik: "",
                    nama: "",
                    pisa: "",
                    sex: "",
                    mr: { noMR: '', noTelepon: null },
                    tglLahir: "",
                    tglCetakKartu: "",
                    tglTAT: "",
                    tglTMT: "",
                    statusPeserta: { kode: "", keterangan: "" },
                    provUmum: { kdProvider: "", nmProvider: "" },
                    jenisPeserta: { kode: "", keterangan: "" },
                    hakKelas: { kode: "", keterangan: "" },
                    umur: { umurSekarang: "", umurSaatPelayanan: "" },
                    informasi: { dinsos: null, prolanisPRB: null, noSKTM: null, eSEP: null },
                    cob: { noAsuransi: null, nmAsuransi: null, tglTMT: null, tglTAT: null }
                },
                listKabupaten: [],
                listKecamatan: [],
                caraBayarList:[],
                copiedSPRIIndex: null,
                isLoadingSPRI:false,
                ListSPRI:false,
                spriHistoryData:[]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.tglsep = currentDate;
            this.form.tanggalKLL = currentDate;
            this.getnamadokter();
            this.addcaraBayar();
            this.loadFromLocal(); // Load saved data from localStorage
        },
        methods: {
            getStatusBadgeClass(status) {
                return status === 'AKTIF' ? 'badge-success' : 'badge-danger';
            },
            getGenderText(sex) {
                return sex === 'P' ? 'Perempuan' : sex === 'L' ? 'Laki-laki' : '-';
            },
            async copySPRI(spriNumber, index) {
                // Modern clipboard API
                await navigator.clipboard.writeText(spriNumber);
                this.open('success','Telah dicopy '+ spriNumber);
                
                // Fallback for older browsers
                // Shows success message
                // Visual feedback with green highlight
            },

            async cetakSPRI(param)
            {  
                await axios.post('/cetakSPRI', param)
                .then(response => { 
              
                   // window.open(response.data.download_url, '_blank', 'noopener,noreferrer');

                     // Open small print window
                    const printWindow = window.open(
                        response.data.download_url,
                        'printWindow',
                        'width=900,height=700,scrollbars=yes,resizable=yes,toolbar=yes,menubar=no,location=no,status=no'
                    );

                       // Auto-print when loaded
                    printWindow.onload = function() {
                        setTimeout(() => {
                            printWindow.print();
                        }, 1000);
                    }; 
                })
                .catch(error => {
                    console.log(error)
                    this.isLoadingSPRI = false
                })
                .finally(() => this.isLoadingSPRI = false)
            },
            async loadSPRI()
            {   

                if (!this.form.norm) {
                    this.open('warning', 'No Rekam Medis tidak boleh kosong');
                    return;
                }
                  const spriData = {
                        mode: "history3",
                        SPRI: this.form.norm,  
                        norm: this.form.norm,  
                }; 
 
                this.isLoadingSPRI = true

                await axios.post('/sprigetdata', spriData)
                .then(response => {
                    console.log(response.data)
                    this.spriHistoryData = response.data.response; 
                    this.isLoadingSPRI = false;

                    this.ListSPRI = true;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoadingSPRI = false
                })
                .finally(() => this.isLoadingSPRI = false)
            },
            async createSPRI() {
                // Validate required fields before creating SPRI
                if (!this.peserta.noKartu) {
                    this.open('warning', 'Silakan cari data pasien terlebih dahulu');
                    return;
                }

                if (!this.form.dokterSelected) {
                    this.open('warning', 'Silakan pilih dokter terlebih dahulu');
                    return;
                }

                this.isLoadingSPRI = true;
                
                try {

                    const spriData = {
                        noKartu: this.peserta.noKartu,
                        kodeDokter: this.form.dokterSelected.KODEDOKTER,
                        namaDokter: this.form.dokterSelected.NAMADOKTER,
                        tglRencanaKonsul: this.form.tglsep,
                        kodeSpesialis: this.form.dokterSelected.KODESPESIALIS || '',
                        // Add other required fields for SPRI creation
                    };

                    console.log('Creating SPRI with data:', spriData);

                    const response = await axios.post('/createSPRI', spriData);
                    
                    if (response.data.metaData.code === '200') {
                        this.form.nospri = response.data.response.noSPRI;
                        this.open('success', `SPRI berhasil dibuat: ${response.data.response.noSPRI}`);
                        
                        // Save SPRI to localStorage
                        localStorage.setItem('lastCreatedSPRI', JSON.stringify({
                            noSPRI: response.data.response.noSPRI,
                            createdAt: new Date().toISOString(),
                            noKartu: this.peserta.noKartu
                        }));

                    } else {
                        this.open('warning', response.data.metaData.message || 'Gagal membuat SPRI');
                    }

                } catch (error) {
                    console.error('Error creating SPRI:', error);
                    this.open('error', 'Terjadi kesalahan saat membuat SPRI');
                } finally {
                    this.isLoadingSPRI = false;
                }
            },
            formatDate(dateString) {
                if (!dateString) return '-';
                const date = new Date(dateString);
                return date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit', 
                    year: 'numeric'
                });
            },
            saveToLocal(e)
            {
               if (e.value) {
                    localStorage.setItem('caraBayarSelected', JSON.stringify(e.value));
                    localStorage.setItem('caraBayarSelectedCode', e.value.KODE);
                    localStorage.setItem('caraBayarSelectedName', e.value.NAMA);
                    
                    console.log('Saved to localStorage:', {
                        fullObject: e.value,
                        code: e.value.KODE,
                        name: e.value.NAMA
                    });
                } else {
                    // Clear localStorage when no selection
                    localStorage.removeItem('caraBayarSelected');
                    localStorage.removeItem('caraBayarSelectedCode');
                    localStorage.removeItem('caraBayarSelectedName');
                }
            },
            loadFromLocal() {
                try {
                    const savedCaraBayar = localStorage.getItem('caraBayarSelected');
                    if (savedCaraBayar) {
                        const parsedData = JSON.parse(savedCaraBayar);
                        this.form.caraBayarSelected = parsedData;
                        console.log('Loaded from localStorage:', parsedData);
                    }
                } catch (error) {
                    console.error('Error loading from localStorage:', error);
                    // Clear corrupted data
                    localStorage.removeItem('caraBayarSelected');
                    localStorage.removeItem('caraBayarSelectedCode');
                    localStorage.removeItem('caraBayarSelectedName');
                }
            },
            async getdata_propinsi_bpjs(e) {
                if(e.value.code == 0) {
                    console.log('call data prov')
                }
                const param = {};
                
                await axios.post('/getdata_propinsi_bpjs', param)
                .then(response => {
                    this.listPropinsi = response.data; 
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
            },
            async addcaraBayar()
            {
                await axios.get('/addcaraBayar')
                .then(response => { 
                    console.log(response);
                    this.caraBayarList = response.data; 

                })
                .catch(error => {
                    console.log(error) 
                })
                .finally(() => this.isLoading = false)
            },
            async get_Kabupten(e) { 
                if(e.value == null) {
                    this.listKabupaten = [];
                    this.form.kabSelected = { kode: '', nama: '' }
                    return
                }
                
                const param = { kdProv : e.value.kode } 
                console.log('data para kab', param)
                
                await axios.post('/getdata_kabupaten_bpjs', param)
                .then(response => { 
                    this.listKabupaten = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
            },
            
            async getdata_kecamatan_bpjs(e) {
                console.log(e.value)
                if(e.value == null) {
                    this.listKecamatan = [];
                    this.form.kecSelected = { kode: '', nama: '' }
                    return
                }
                
                const param = { kdKab : e.value.kode } 
                console.log('data para kab', param)

                await axios.post('/getdata_kecamatan_bpjs', param)
                .then(response => { 
                    console.log(response.data)
                    this.listKecamatan = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error)
                    this.isLoading = false
                })
                .finally(() => this.isLoading = false)
            },
            
            async searchDiagnose(event) {
                const query = event.value;
                if (!query || query.length < 2) {
                    this.listDiagnose = [];
                    return;
                }
 
                this.form.mode = 1;
                this.form.param = query 
                
                console.log(this.form);

                await axios.post('/get_icd_v2', this.form)
                    .then(response => { 
                        this.listDiagnose = response.data;
                        this.isLoading = false; 
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            
            async getnamadokter() {
                this.form.mode = 2;
                await axios.post('/getnamadokter', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.listDokter = response.data.response;
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            
            async terbitkanSEP() { 
                this.form.noka = this.peserta.noKartu;
                this.form.klsRawatHak = this.peserta.hakKelas 
                this.isLoading = true;

                if(this.form.norm == "") {
                    this.open('warning', "No. rekam medis tidak boleh kosong")
                    this.isLoading = false;
                    return;
                }
                
                await axios.post('/createSEP', this.form)
                    .then(response => {  
                        console.log(response.data); 
                        if (response.data.metaData.code === '200') {
                            this.open('success', response.data.metaData.message);  
                            this.response_nosep = response.data.response.sep.noSep;
                        } else {
                            this.open('warning', response.data.metaData.message);
                        }
                    })
                    .catch(error => {
                        this.open('warning', error);   
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            
            showDtailsForm() {
                this.showDetailModal = true; 
            }, 
            async get_data_peserta() {
                this.isLoading = true;
                await axios.post('/get_data_peserta', this.form)
                    .then(response => {
                        if (response.data.metaData.code === "200") {
                            this.data = response.data.response.peserta;
                            this.peserta = response.data.response.peserta;
                            this.form.norm =  response.data.response.peserta.mr.noMR
                            this.open('success', response.data.response.peserta.nama);
                            //this.formData.nama = response.data.response.peserta.nama; 

                            this.ShowFormPasien=false
                        } else {
                            this.open('warning', response.data.metaData.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
             open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
        }
    }
</script>

<style scoped>
    /* Enhanced styling for better UI */
    .patient-info-card {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: none;
        border-radius: 10px;
        overflow: hidden;
    }

    .patient-illustration {
        width: 180px;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .patient-details {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 1rem;
    }

    .detail-item {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e9ecef;
    }

    .detail-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .detail-item label {
        font-size: 0.85rem;
        color: #6c757d;
        font-weight: 500;
        display: block;
        margin-bottom: 0.25rem;
    }

    .detail-value {
        font-weight: 600;
        color: #495057;
        font-size: 0.95rem;
    }

    .badge {
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 0.375rem;
    }

    .badge-success {
        background-color: #6c757d;
        color: white;
    }

    .badge-danger {
        background-color: #6c757d;
        color: white;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        margin-bottom: 0.5rem;
        display: block;
        font-weight: 600;
        color: #495057;
    }

    .kll-details {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
    }

    .btn-group {
        display: flex;
        gap: 0.5rem;
    }

    .flex-fill {
        flex: 1;
    }

    .input-group {
        display: flex;
        width: 100%;
    }

    .input-group .form-control {
        flex: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .input-group-append {
        display: flex;
    }

    .input-group-append .p-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
    }

    .patient-detail-modal .modal-content {
        max-height: 80vh;
        overflow-y: auto;
    }

    .table-responsive {
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .table th {
        background-color: #f8f9fa;
        color: #495057;
        font-weight: 600;
        border: 1px solid #dee2e6;
    }

    .table-header th {
        background-color: #e9ecef !important;
        color: #495057 !important;
        font-weight: 700;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 1rem;
        border-top: 1px solid #dee2e6;
        background-color: #f8f9fa;
    }

    .card {
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .card-header {
        border-bottom: 1px solid #dee2e6;
        padding: 1rem 1.25rem;
        border-radius: 8px 8px 0 0;
    }

    .card-header h3,
    .card-header h5,
    .card-header h6 {
        margin: 0;
        font-weight: 600;
    }

    .bg-primary {
        background-color: #007bff !important;
    }

    .bg-secondary {
        background-color: #6c757d !important;
    }

    .text-white {
        color: white !important;
    }

    .text-danger {
        color: #dc3545 !important;
    }

    .w-100 {
        width: 100% !important;
    }

    .mr-2 {
        margin-right: 0.5rem !important;
    }

    .ml-2 {
        margin-left: 0.5rem !important;
    }

    .mb-4 {
        margin-bottom: 1.5rem !important;
    }

    .mt-4 {
        margin-top: 1.5rem !important;
    }

    .text-center {
        text-align: center !important;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .row {
            margin: 0;
        }
        
        .col-lg-4,
        .col-lg-8 {
            padding: 0.5rem;
        }
        
        .btn-group {
            flex-direction: column;
        }
        
        .patient-illustration {
            width: 150px;
            height: 100px;
        }
    }
</style>