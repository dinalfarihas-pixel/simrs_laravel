<template>
    <section class="content">
        <ConfirmDialog></ConfirmDialog>

        <!-- ===== DRAWER KANAN: MENU AKSI ===== -->
        <Drawer v-model:visible="showMenuAksi" header="Aksi" position="right" :style="{width: '340px', maxWidth: '94vw'}"
            @show="fokusCariMenu">
            <div v-if="rowMenu" class="menu-aksi-list">
                <div class="menu-aksi-pasien">
                    <strong>{{ rowMenu.NAMAPASIEN }}</strong>
                    <small># {{ rowMenu.NOMR }}</small>
                </div>
                <div class="menu-aksi-search">
                    <i class="pi pi-search"></i>
                    <input ref="cariMenuInput" v-model="cariMenu" type="text" class="form-control" placeholder="Cari menu..."
                        autocomplete="off" @keydown.enter="pilihMenuTunggal">
                </div>
                <ul class="menu-aksi-items">
                    <li v-for="m in menuAksiTampil" :key="m.key" class="menu-aksi-item" tabindex="0"
                        @click="aksiMenu(m.aksi)" @keydown.enter="aksiMenu(m.aksi)">
                        <i :class="m.icon"></i>
                        <span>{{ m.label }}</span>
                        <i class="pi pi-angle-right menu-aksi-arrow"></i>
                    </li>
                    <li v-if="!menuAksiTampil.length" class="menu-aksi-kosong">Menu tidak ditemukan</li>
                </ul>
            </div>
        </Drawer>

        <!-- ===== DIALOG: ADMINISTRASI / BILLING (input jasa) ===== -->
        <AdministrasiBillingDialog v-model:visible="showAdministrasi" :pasien="pasienAdministrasi" />

        <!-- ===== DIALOG: PINDAH RUANG ===== -->
        <Dialog header="Catatan Pasien Pindah Ruang" v-model:visible="showPindahruang" :containerStyle="{width: '80vw'}"
            :modal="true">
            <catatan-pemindahan-list :datapasien="details_pasien" :mode=2></catatan-pemindahan-list>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="showPindahruang=false" class="p-button-text" />
                <Button label="Tutup" icon="pi pi-check" @click="showPindahruang=false" autofocus />
            </template>
        </Dialog>

        <!-- ===== DIALOG: REKAM MEDIS ===== -->
        <Dialog header="Rekam Medis Pasien" v-model:visible="displayBasic2" :maximized="true" position="center"
             :style="{ margin: '0', borderRadius: '0', width: '98vw', height: '100vh' }"
            :contentStyle="{ overflow: 'auto', flex: '1' }">
            <div class="card card-warning card-outline">
                <div class="card-header">
                    <h3 class="card-title">Menampilkan data rekam medis pasien dalam satu episode rawatan</h3>
                </div>
                <div class="card-body">
                    <div class="row invoice-info">
                        <div class="col-md-2">
                            <img width="220px" height="130px" src="https://ws-simrs.net/ilustration/ilustrasi1.png"
                                alt="Ilustration">
                        </div>
                        <div class="col-sm-4 invoice-col">
                            Pasien KLL <span v-if="details_pasien.KLL==1"><strong>Ya</strong></span>
                            <span v-if="details_pasien.KLL==0"><strong>Tidak</strong></span>
                            <address>
                                <h5> <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong>
                                </h5>
                                {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                {{details_pasien.NAMAKECAMATAN}}<br>
                            </address>
                        </div>
                        <div class="col-sm-4 invoice-col">

                            Masuk
                            <address>
                                <strong> {{details_pasien.MASUKPOLY_DISPLAY}} ,
                                    {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                Ruangan/Poli, {{details_pasien.POLI}}<br>
                                DPJP <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                Dx Awal
                                <strong>{{ details_pasien.DIAGNOSA_AWAL }}-{{ details_pasien.DX_CAPTION }}</strong>
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs v-model:value="activeMainTab">
                <TabList>
                    <Tab value="0">{{ details_pasien_reff.POLI === 'IGD' ? 'TRIASE IGD' : 'RESUME RAWAT JALAN' }}</Tab>
                    <Tab value="1">KAJIAN AWAL</Tab>
                    <Tab value="2">OBAT-OBATAN</Tab>
                    <Tab value="3">PENUNJANG</Tab>
                    <Tab v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'" value="4">OBSERVASI</Tab>
                    <Tab value="5">TINDAKAN</Tab>
                    <Tab v-if="details_pasien.JENISRAWAT=='INAP'" value="6">DIET PASIEN (GIZI)</Tab>
                    <Tab v-if="details_pasien.JENISRAWAT=='INAP'" value="7">RESUME PULANG</Tab>
                    <Tab value="operasi">OPERASI</Tab>
                    <Tab v-if="details_pasien.JENISKELAMIN=='P'" value="persalinan">CATATAN PERSALINAN</Tab>
                    <Tab value="8">LAMPIRAN FILE</Tab>
                    <Tab value="9">TINDAK LANJUT</Tab>
                    <Tab value="10">PASIEN</Tab>

                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <!-- Dari poli (rawat jalan) → tampilkan resume rawat jalan -->
                        <resume-rawat-jalan
                            v-if="visitedMain['0'] && details_pasien_reff.POLI !== 'IGD'"
                            :init-noregister="details_pasien.REFF_INTERNAL"
                            :init-nama="details_pasien.NAMAPASIEN || details_pasien.DATA_SINGKAT"
                            :init-norm="details_pasien.NOMR"
                            :init-dokter="details_pasien.NAMADOKTER">
                        </resume-rawat-jalan>
                        <!-- Dari IGD → tampilkan triase IGD -->
                        <subtriaseigd
                            v-if="visitedMain['0'] && details_pasien_reff.POLI === 'IGD'"
                            :datapasien="details_pasien">
                        </subtriaseigd>
                    </TabPanel>
                    <TabPanel value="1">
                        <kajianawalpasien v-if="visitedMain['1']" :datapasien="details_pasien"></kajianawalpasien>
                    </TabPanel>
                    <TabPanel value="2">
                        <Tabs v-if="visitedMain['2']" v-model:value="activeObatTab">
                            <TabList>
                                <Tab value="0">PERMINTAAN OBAT</Tab>
                                <Tab value="1">FORMULIR PEMBERIAN OBAT</Tab>
                                <Tab value="2">REKONSILIASI OBAT</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <permintaanobat v-if="visitedObat['0']" :datapasien="details_pasien"></permintaanobat>
                                </TabPanel>
                                <TabPanel value="1">
                                    <pemberian-obat v-if="visitedObat['1']" :datapasien="details_pasien"></pemberian-obat>
                                </TabPanel>
                                <TabPanel value="2">
                                    <rekonsiliasi-obat v-if="visitedObat['2']" :datapasien="details_pasien"></rekonsiliasi-obat>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel value="3">
                        <Tabs v-if="visitedMain['3']" v-model:value="activePenunjangTab">
                            <TabList>
                                <Tab value="0">LABORATORIUM</Tab>
                                <Tab value="1">RADIOLOGI</Tab>
                                <Tab value="2">FISIOTERAPHI</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <permintaan-lab v-if="visitedPenunjang['0']" :datapasien="details_pasien"></permintaan-lab>
                                </TabPanel>
                                <TabPanel value="1">
                                    <permintaan-radiologi v-if="visitedPenunjang['1']" :datapasien="details_pasien"></permintaan-radiologi>
                                </TabPanel>
                                <TabPanel value="2">
                                    <fisioteraphy v-if="visitedPenunjang['2']" :datapasien="details_pasien"></fisioteraphy>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'" value="4">
                        <Tabs v-if="visitedMain['4']" v-model:value="activeObsTab">
                            <TabList>
                                <Tab value="0">CPPT</Tab>
                                <Tab value="1">GRAFIK PERKEMBANGAN</Tab>
                                <Tab value="2">EARLY WARNING SCORE</Tab>
                                <Tab value="3">PEMANTAUAN CAIRAN</Tab>
                                <Tab value="4">PENGKAJIAN RESIKO JATUH</Tab>
                                <Tab value="5">PENGKAJIAN NYERI</Tab>
                                <Tab value="6">SKRINING INFEKSIUS</Tab>
                                <Tab value="7">EDUKASI PASIEN</Tab>
                                <Tab value="8">PENGKAJIAN TAHAP TERMINAL</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <soap-form v-if="visitedObs['0']" :datapasien="details_pasien"
                                        :noregister="details_pasien.NOPENDAFTARAN"
                                        :showinstruksi="true" :isCppt="true" :data_igd="null"></soap-form>
                                </TabPanel>
                                <TabPanel value="1">
                                    <grafik-cppt v-if="visitedObs['1']" :noregister="details_pasien.NOPENDAFTARAN"></grafik-cppt>
                                </TabPanel>
                                <TabPanel value="2">
                                    <early-warning-score v-if="visitedObs['2']" :datapasien="details_pasien"></early-warning-score>
                                </TabPanel>
                                <TabPanel value="3">
                                    <form-input-cairan v-if="visitedObs['3']" :datapasien="details_pasien"></form-input-cairan>
                                </TabPanel>
                                <TabPanel value="4">
                                    <kajian-resiko-jatuh v-if="visitedObs['4']"
                                        :noregister-prop="details_pasien.NOPENDAFTARAN"
                                        :datapasien="details_pasien">
                                    </kajian-resiko-jatuh>
                                </TabPanel>
                                <TabPanel value="5">
                                    <pengkajian-nyeri v-if="visitedObs['5']"
                                        :noregister-prop="details_pasien.NOPENDAFTARAN"
                                        :datapasien="details_pasien">
                                    </pengkajian-nyeri>
                                </TabPanel>
                                <TabPanel value="6">
                                    <pengkajian-infeksius v-if="visitedObs['6']"
                                        :noregister-prop="details_pasien.NOPENDAFTARAN"
                                        :datapasien="details_pasien">
                                    </pengkajian-infeksius>
                                </TabPanel>
                                <TabPanel value="7">
                                    <edukasi-pasien v-if="visitedObs['7']"
                                        :noregister-prop="details_pasien.NOPENDAFTARAN"
                                        :datapasien="details_pasien">
                                    </edukasi-pasien>
                                </TabPanel>
                                <TabPanel value="8">
                                    <pengkajian-terminal v-if="visitedObs['8']"
                                        :noregister-prop="details_pasien.NOPENDAFTARAN"
                                        :datapasien="details_pasien">
                                    </pengkajian-terminal>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel value="5">
                        <tindakan v-if="visitedMain['5']" :datapasien="details_pasien"></tindakan>
                    </TabPanel>
                    <TabPanel v-if="details_pasien.JENISRAWAT=='INAP'" value="6">
                        <Tabs v-if="visitedMain['6']" v-model:value="activeGiziTab">
                            <TabList>
                                <Tab value="0">RIWAYAT KONSUL GIZI</Tab>
                                <Tab value="1">PERMINTAAN KONSUL GIZI</Tab>
                                <Tab value="2">PEMBERIAN DIET</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <RiwayatKonsulComponent v-if="visitedGizi['0']" :datapasien="details_pasien"></RiwayatKonsulComponent>
                                </TabPanel>
                                <TabPanel value="1">
                                    <permintaanKonsulGizi v-if="visitedGizi['1']" :datapasien="details_pasien"></permintaanKonsulGizi>
                                </TabPanel>
                                <TabPanel value="2">
                                    <diet-pasien v-if="visitedGizi['2']" :datapasien="details_pasien"></diet-pasien>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel v-if="details_pasien.JENISRAWAT=='INAP'" value="7">
                        <resume-pulang v-if="visitedMain['7']" :datapasien="details_pasien"></resume-pulang>
                    </TabPanel>
                    <TabPanel value="operasi">
                        <Tabs v-if="visitedMain['operasi']" v-model:value="activeOperasiTab">
                            <TabList>
                                <Tab value="0">PERMINTAAN OPERASI</Tab>
                                <Tab value="1">PERSIAPAN OPERASI</Tab>
                                <Tab value="2">INFORM CONSENT OPERASI</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel value="0">
                                    <permintaan-operasi v-if="visitedOperasi['0']" :datapasien="details_pasien"></permintaan-operasi>
                                </TabPanel>
                                <TabPanel value="1">
                                    <persiapan-operasi v-if="visitedOperasi['1']" :datapasien="details_pasien"></persiapan-operasi>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div class="text-center text-muted py-4">
                                        <i class="pi pi-inbox" style="font-size:2rem;opacity:.4"></i>
                                        <div class="mt-2">Fitur Inform Consent Operasi belum tersedia.</div>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                    <TabPanel v-if="details_pasien.JENISKELAMIN=='P'" value="persalinan">
                        <catatan-persalinan
                            v-if="visitedMain['persalinan']"
                            :noregister="details_pasien.NOPENDAFTARAN"
                            :embedded="true">
                        </catatan-persalinan>
                    </TabPanel>
                    <TabPanel value="8">
                        <listupload v-if="visitedMain['8']" :datapasien="details_pasien"></listupload>
                    </TabPanel>
                    <TabPanel value="9">
                        <selesai-rawat v-if="visitedMain['9']" :datapasien="details_pasien"></selesai-rawat>
                    </TabPanel>
                    <TabPanel value="10">
                        <pasien-view v-if="visitedMain['10'] && details_pasien.NOMR" :norm="details_pasien.NOMR"
                            :noregister="details_pasien.NOPENDAFTARAN"></pasien-view>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="closeBasic2" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: DAFTAR PASIEN TIDAK DIRAWAT ===== -->
        <Dialog v-model:visible="tampilkanDialogLPT" header="Daftar Pasien Tidak Ada Perawat" :modal="true"
            :closable="true" :draggable="true" :resizable="true"
            :containerStyle="{ width: '95vw', maxWidth: '1200px' }">
            <DataTable :value="filteredDataPasien" :paginator="true" :rows="20" :rowsPerPageOptions="[10,20,50,100]"
                :rowHover="true" :exportFilename="'Laporan Tarik Pasien'" class="p-datatable-sm" stripedRows
                showGridlines responsiveLayout="scroll">
                <template #header>
                    <div class="table-header-bar">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <InputText v-model="globalFilter" placeholder="Cari RM, Nama, NOSEP" style="width:280px" />
                        </span>
                    </div>
                </template>
                <Column header="INFO PASIEN" :sortable="true" style="min-width:240px">
                    <template #body="slotProps">
                        <div class="col-pasien-info">
                            <div class="pasien-nama">{{ slotProps.data.NAMAPASIEN }}</div>
                            <div class="pasien-meta">
                                <span>{{ slotProps.data.JENISKELAMIN }} | {{ slotProps.data.USIA_PASIEN.tahun }}
                                    Thn</span>
                            </div>
                            <div class="pasien-meta">No.RM: <strong>{{ slotProps.data.NOMR }}</strong></div>
                            <div class="pasien-meta">DPJP: {{ slotProps.data.NAMADOKTER }}</div>
                        </div>
                    </template>
                </Column>
                <Column header="DATA MASUK" :sortable="true" style="min-width:220px">
                    <template #body="slotProps">
                        <div class="col-pasien-info">
                            <div class="pasien-sep">{{ slotProps.data.NOSEP }}</div>
                            <div class="pasien-meta">Masuk: {{ slotProps.data.MASUKPOLY_DISPLAY }}</div>
                            <div class="pasien-meta">LOS: <strong>{{ slotProps.data.LOS }} hari</strong></div>
                        </div>
                    </template>
                </Column>
                <Column header="DILAKUKAN OLEH" :sortable="true" style="min-width:180px">
                    <template #body="slotProps">
                        <div class="col-pasien-info">
                            <div class="pasien-nama">{{ slotProps.data.DILAKUKAN_OLEH }}</div>
                            <div class="pasien-meta">{{ slotProps.data.TANGGAL_DOIT }}</div>
                        </div>
                    </template>
                </Column>
                <Column header="AKSI" style="min-width:180px">
                    <template #body="slotProps">
                        <Button label="Tarik ke Ruangan Saya" icon="pi pi-arrow-right-arrow-left"
                            class="p-button-success p-button-sm" @click="func_tarik_pasien(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </Dialog>

        <!-- ===== DIALOG: FORM PENARIKAN PASIEN ===== -->
        <Dialog v-model:visible="tariPasienDariIniBukanPasienKami"
            :header="`Penarikan Pasien: ${dataPasien ? dataPasien.NAMAPASIEN : ''}`" :modal="true" :closable="true"
            :draggable="false" :resizable="false" :containerStyle="{ width: '45vw' }">
            <div class="tarik-pasien-body">
                <div class="tarik-info-box">
                    <i class="pi pi-info-circle"></i>
                    <div>
                        <div class="tarik-no-rm">{{ dataPasien ? dataPasien.NOMR : '' }}</div>
                        <div class="tarik-los">Pasien telah dirawat selama
                            <strong>{{ dataPasien ? dataPasien.JLM_HARI_RAWAT : '' }} Hari</strong>
                        </div>
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:200px;border-radius:4px" />
                    </div>

                </div>

                <div class="tarik-ruangan-label">Pilih Ruangan Tujuan:</div>
                <div class="tarik-ruangan-grid">

                    <span v-for="ruang in dataruangan_realtime" :key="ruang.KD_RUANGAN">
                        <button v-if="ruang.MYROOM == 1" type="button" class="btn btn-success text-white ml-1"
                            @click="excute_pindah_ruangan(ruang)">
                            {{ ruang.NAMA }}
                        </button>
                    </span>
                </div>
            </div>
        </Dialog>

        <!-- ===== DIALOG: TRANSFER RUANGAN ===== -->
        <Dialog header="Transfer Ruangan Pasien" v-model:visible="form_pindahruang" :containerStyle="{width: '80vw'}"
            :modal="true">
            <div class="transfer-layout">
                <div class="transfer-asal">
                    <div class="transfer-label"><i class="pi pi-map-marker"></i> Ruangan Asal</div>
                    <div class="transfer-ruang-name">{{ namaruagan_asal }}</div>
                </div>
                <div class="transfer-arrow"><i class="pi pi-arrow-right"></i></div>
                <div class="transfer-tujuan" style="flex:1">
                    <div class="transfer-label"><i class="pi pi-flag"></i> Pilih Ruangan Tujuan</div>
                    <DataTable :value="dataruangan_realtime" stripedRows class="p-datatable-sm"
                        responsiveLayout="scroll">
                        <Column field="NAMA" header="Nama Ruangan"></Column>
                        <Column field="TERSEDIA" header="Bed Tersedia"></Column>
                        <Column header="Aksi">
                            <template #body="slotProps">
                                <Button v-if="slotProps.data.MYROOM===1" label="Pilih" icon="pi pi-check"
                                    class="p-button-info p-button-sm" @click="excute_pindah_ruangan(slotProps.data)" />
                                <Button v-else label="Pilih" icon="pi pi-check" class="p-button-secondary p-button-sm"
                                    disabled />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="form_pindahruang=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== MAIN CONTENT ===== -->
        <div class="container-fluid px-0">

            <!-- FILTER CARD -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header">
                    <h3 class="card-title font-weight-bold">
                        <i class="pi pi-filter mr-2" style="color:#1976d2"></i>
                        Parameter Pencarian Pasien
                    </h3>
                </div>
                <div class="card-body pb-2">
                    <Message v-show="showmessage" severity="warn">
                        <strong>Terdapat pasien dengan cara bayar "WAITING LIST" — mohon diperhatikan!</strong>
                    </Message>

                    <!-- ROW 1: Search utama -->
                    <div class="row align-items-end mb-3">
                        <div class="col-md-2">
                            <!-- Ikon dan Label -->
                            <label class="filter-label">Cari Nama pasien</label>
                            <!-- Komponen Input -->
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
                                <InputText v-model="form.nama_pasien" placeholder="Nama Pasien" @input="() => {}" />
                            </div>

                        </div>
                        <div class="col-md-2">
                            <label class="filter-label">Cari No. RM</label>
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon"><i class="pi pi-id-card"></i></span>
                                <InputText v-model="form.norm" placeholder="No. Rekam Medis"
                                    @keyup.enter="getdata_pasien(7)" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label class="filter-label">Pilih Ruangan</label>
                            <Select v-model="form.ruanganselected" :options="ruangan" optionLabel="NAMA"
                                @change="change_ruangan" :filter="true" placeholder="Pilih Ruangan Rawat"
                                style="width:100%" :showClear="false">
                                <template #option="slotProps">
                                    <span>{{ slotProps.option.NAMA }}</span>
                                </template>
                            </Select>
                        </div>
                        <div class="col-md-2">
                            <label class="filter-label">Filter DPJP / Dokter</label>
                            <Select v-model="form.dokterselected" :options="listDokter" optionLabel="NAMADOKTER"
                                :filter="true" placeholder="Semua Dokter" style="width:100%" :showClear="true"
                                @change="applyDokterFilter">
                                <template #option="slotProps">
                                    <div class="dropdown-dokter-option">
                                        <i class="pi pi-user mr-2" style="color:#1976d2"></i>
                                        <span>{{ slotProps.option.NAMADOKTER }}</span>
                                    </div>
                                </template>
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="dropdown-dokter-option">
                                        <i class="pi pi-user mr-2" style="color:#1976d2"></i>
                                        {{ slotProps.value.NAMADOKTER }}
                                    </div>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                            </Select>
                        </div>
                        <div class="col-md-2">
                            <label class="filter-label">Jenis Rawat</label>
                            <Select v-model="filterJenisRawat" :options="opsiJenisRawat" style="width:100%" />
                        </div>
                        <div class="col-md-2">
                            <label class="filter-label">&nbsp;</label>
                            <div class="d-flex flex-wrap" style="gap:6px">
                                <Button label="Cari" icon="pi pi-search" class="p-button-primary p-button-sm"
                                    @click="getdata_pasien(7)" />
                                <Button label="Refresh" icon="pi pi-refresh" class="p-button-sm"
                                    @click="refresh_form(4)" />
                                <Button label="Pasien tidak ada yang merawat" icon="pi pi-exclamation-triangle"
                                    class="p-button-danger p-button-outlined p-button-sm" @click="getdata_pasien(9)" />
                            </div>
                        </div>
                    </div>

                    <!-- ROW 2: Pencarian lanjutan (collapsed) -->
                    <div class="advanced-search-toggle" @click="showAdvanced = !showAdvanced">
                        <i :class="showAdvanced ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                        <span>Pencarian Lanjutan</span>
                    </div>
                    <div v-show="showAdvanced" class="advanced-search-body mt-2">
                        <div class="row align-items-end">
                            <div class="col-md-4">
                                <label class="filter-label">Nama / NIK / No BPJS / NOSEP</label>
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
                                    <InputText v-model="form.parametersearch"
                                        placeholder="Cari Nama / NIK / No BPJS / NOSEP"
                                        @keyup.enter="getdata_pasien(12)" />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <label class="filter-label">Tanggal Pulang (Awal)</label>
                                <Calendar v-model="form.startdate" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                                    :yearNavigator="true" yearRange="2000:2030" style="width:100%" />
                            </div>
                            <div class="col-md-2">
                                <label class="filter-label">Tanggal Pulang (Akhir)</label>
                                <Calendar v-model="form.enddate" :showIcon="true" view="date" dateFormat="dd/mm/yy"
                                    :yearNavigator="true" yearRange="2000:2030" style="width:100%" />
                            </div>
                            <div class="col-md-2" v-if="adaPasienTniPolri">
                                <label class="filter-label">Kategori TNI/POLRI</label>
                                <SelectButton v-model="filterTniPolri" :options="opsiTniPolri" :allowEmpty="false"
                                    class="d-flex" />
                            </div>
                            <div class="col-md-2">
                                <Button label="Cari Data" icon="pi pi-search" class="p-button-primary mt-4"
                                    @click="getdata_pasien(12)" />
                            </div>
                        </div>

                        <div class="rekap-title mt-3">
                            <i class="pi pi-chart-bar mr-1"></i> Rekapan Pasien
                        </div>
                        <div class="rekap-chip-list mt-1">
                            <span class="rekap-chip rekap-chip-blue" v-for="item in rekapCaraBayar" :key="item.nama">
                                <i class="pi pi-wallet"></i> {{ item.nama }} <strong>{{ item.jumlah }}</strong>
                            </span>
                            <span class="rekap-chip rekap-chip-green" v-if="jumlahTNI > 0">
                                <i class="pi pi-shield"></i> TNI <strong>{{ jumlahTNI }}</strong>
                            </span>
                            <span class="rekap-chip rekap-chip-orange" v-if="jumlahPOLRI > 0">
                                <i class="pi pi-shield"></i> POLRI <strong>{{ jumlahPOLRI }}</strong>
                            </span>
                        </div>

                        <div class="rekap-title mt-3">
                            <i class="pi pi-users mr-1"></i> Filter Berdasarkan Usia
                        </div>
                        <div class="d-flex flex-wrap mt-1" style="gap:6px">
                            <Button label="Semua" class="p-button-sm"
                                :class="filterUsia === 'SEMUA' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'SEMUA'" />
                            <Button :label="'Bayi (' + jumlahBayi + ')'" class="p-button-sm"
                                :class="filterUsia === 'BAYI' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'BAYI'" />
                            <Button :label="'Balita (' + jumlahBalita + ')'" class="p-button-sm"
                                :class="filterUsia === 'BALITA' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'BALITA'" />
                            <Button :label="'Remaja (' + jumlahRemaja + ')'" class="p-button-sm"
                                :class="filterUsia === 'REMAJA' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'REMAJA'" />
                            <Button :label="'Dewasa (' + jumlahDewasa + ')'" class="p-button-sm"
                                :class="filterUsia === 'DEWASA' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'DEWASA'" />
                            <Button :label="'Lansia (' + jumlahLansia + ')'" class="p-button-sm"
                                :class="filterUsia === 'LANSIA' ? 'p-button-primary' : 'p-button-outlined'"
                                @click="filterUsia = 'LANSIA'" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- TABLE CARD -->
            <div class="card card-outline card-primary shadow-sm">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="pi pi-list mr-2" style="color:#1976d2"></i>
                        Daftar Pasien
                        <span v-if="form.dokterselected" class="badge badge-primary ml-2">
                            DPJP: {{ form.dokterselected.NAMADOKTER }}
                        </span>
                    </h3>
                    <ProgressBar mode="indeterminate" v-show="isLoading"
                        style="height:.25em;width:200px;border-radius:4px" />
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-striped mb-0 pasien-table">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width:40px">No</th>
                                    <th class="text-center" style="width:36px"></th>
                                    <th>PASIEN</th>
                                    <th>Alamat</th>
                                    <th>STTS PERAWATAN</th>
                                    <th>Tgl Masuk / Keluar</th>
                                    <th class="text-center" style="width:70px">LOS</th>
                                    <th>PENUNJANG</th>
                                    <th>Cara Bayar</th>
                                    <th class="text-center">Aksi</th>
                                    <th class="text-center" style="width:90px">Pindah Ruang</th>
                                    <th class="text-center" style="width:90px">Jenis Rawat</th>
                                    <th class="text-center">Aksi Lain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="factFiltered.length === 0">
                                    <td colspan="12" class="text-center text-muted py-4">
                                        <i class="pi pi-inbox" style="font-size:2rem;opacity:.4"></i>
                                        <div class="mt-2">Tidak ada data pasien</div>
                                    </td>
                                </tr>
                                <tr v-for="(row, k) in factFiltered" :key="row.NOPENDAFTARAN"
                                    :class="{'row-waiting': row.KODECARABAYAR==27 || row.KODECARABAYAR==28}">
                                    <td class="text-center align-middle">
                                        <span class="row-number">{{ k + 1 }}</span>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span v-if="row.JENISKELAMIN=='P'">
                                            <ion-icon size="large" style="color: pink;" name="woman-sharp"></ion-icon>
                                        </span>
                                        <span v-if="row.JENISKELAMIN=='L'">
                                            <ion-icon size="large" style="color: navy;" name="man-sharp"> </ion-icon>
                                        </span>
                                    </td>
                                    <td class="align-middle">
                                        <h5>
                                            # {{row.NOMR}} - {{row.DATA_SINGKAT}}</h5>
                                        <small>{{ row.USIA_PASIEN.tahun }} Thn, {{ row.USIA_PASIEN.bulan }} Bln,
                                            {{ row.USIA_PASIEN.hari }} Hr</small>
                                        <p style="color: cadetblue;">{{row.NAMADOKTER}}</p>

                                        <div v-if="row.PEKERJAAN == 7" class="mb-1">
                                            <span class="badge badge-success">
                                                <i class="pi pi-shield mr-1"></i>
                                                {{ row.HUBUNGAN_TNI_POLRI == 1 ? 'Dinas' : 'Keluarga' }}
                                                <span v-if="row.PANGKAT"> — {{ row.PANGKAT }}</span>
                                                <span v-if="row.SATUAN"> — {{ row.SATUAN }}</span>
                                            </span>
                                        </div>

                                        <div v-if="row.SIRIRAJ?.SKOR_AKIR"
                                            class="d-inline-block text-center border rounded p-1 bg-light">
                                            <div class="badge badge-danger d-block mb-1">
                                                Siriraj Score: {{ row.SIRIRAJ.SKOR_AKIR }}
                                            </div>
                                            <small class="text-uppercase font-weight-bold d-block text-truncate"
                                                style="max-width: 150px;">
                                                {{ row.SIRIRAJ.INTERPRETASI }}
                                            </small>
                                        </div>
                                        <div v-if="row.LAST_UPDATED" class="mt-2 text-muted"
                                            style="font-size: 0.75rem;">
                                            <i class="far fa-clock mr-1"></i>
                                            <span>Update terakhir: </span>
                                            <span class="font-weight-bold">{{ row.LAST_UPDATED }}</span>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        {{ row.ALAMAT }}
                                    </td>
                                    <td class="align-middle">
                                        <span v-if="row.STATUS==0" class="badge badge-danger">Sedang
                                            Rawat</span>
                                        <span v-else class="badge badge-success">{{ row.KETERANGAN }}</span>
                                        <div class="mt-1"><small class="text-muted">{{ row.POLI }}</small></div>
                                    </td>
                                    <td class="align-middle">
                                        <div> <strong>M:</strong> {{ row.MASUKPOLY_DISPLAY }}</div>
                                        <div> <strong>K:</strong> {{ row.KELUARPOLY || '-' }} </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <h5> <strong> {{row.JLM_HARI_RAWAT}}</strong> hari</h5>
                                    </td>
                                    <td class="text-center align-middle">
                                        <!-- <span class="los-value">{{ row.JLM_HARI_RAWAT }}</span>
                                        <div><small class="text-muted">hari</small></div> -->
                                        <!-- Notif Penunjang -->
                                        <div v-if="row.PENUNJANG && row.PENUNJANG.length" class="penunjang-list mt-1">
                                            <div v-for="(notif, ni) in row.PENUNJANG" :key="ni">
                                                <div v-for="(layanan, li) in notif.NAMA_LAYANAN.split(',')"
                                                    :key="ni+'-'+li" class="penunjang-item"
                                                    :class="notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C' ? 'penunjang-selesai' : 'penunjang-menunggu'">
                                                    <span class="penunjang-dot"
                                                        :class="notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C' ? 'dot-selesai' : 'dot-menunggu'">
                                                    </span>
                                                    <span class="penunjang-nama">{{ layanan.trim() }}</span>
                                                    <span class="penunjang-status">
                                                        —
                                                        {{ notif.STATUS_PROGRESS === 'P' ||  notif.STATUS_PROGRESS === 'C' ? 'selesai' : 'menunggu' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <span v-if="row.KODECARABAYAR==27 || row.KODECARABAYAR==28"
                                            class="cara-bayar-badge cara-bayar-warning">
                                            <i class="pi pi-wallet mr-1"></i>{{ row.CARABAYAR }}
                                        </span>
                                        <span v-else class="cara-bayar-badge cara-bayar-normal">
                                            <i class="pi pi-wallet mr-1"></i>{{ row.CARABAYAR }}
                                        </span>


                                    </td>
                                    <td class="align-middle">
                                        <div class="aksi-cepat">
                                            <button class="btn-menu-aksi btn-rm-cepat" @click="showdetails(row)" title="Lihat Rekam Medis">
                                                <i class="pi pi-folder-open"></i>
                                            </button>
                                            <button class="btn-menu-aksi" @click="bukaMenuAksi(row)" title="Menu aksi">
                                                <i class="pi pi-ellipsis-v"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <button class="btn-icon-pindah" @click="pasiwn_pindah_ruang(row)"
                                            title="Pindah Ruangan">
                                            <i class="pi pi-arrow-right-arrow-left"></i>
                                        </button>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span :class="row.JENISRAWAT === 'INAP' ? 'jenis-badge jenis-inap' : 'jenis-badge jenis-jalan'">
                                            {{ row.JENISRAWAT }}
                                        </span>
                                        <br/>
                                        <div v-if="row.JENISRAWAT === 'INAP' && row.HAKKELAS"
                                             :class="['hakkelas-badge', 'mt-1', row.HAKKELAS === 'SESUAI KELAS' ? 'hakkelas-sesuai' : 'hakkelas-naik']">
                                            {{ row.HAKKELAS }}
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div class="aksi-group">
                                            <button class="btn-aksi btn-aksi-danger" @click="confirm_tidak_merawat(row)"
                                                v-if="row.JENISRAWAT=='INAP'" title="Tidak Merawat">
                                                <i class="pi pi-times"></i> Tidak Merawat
                                            </button>
                                            <span v-if="row.status_checklist" class="checklist-status-badge"
                                                :class="{
                                                    'checklist-diterima': row.status_checklist === 'Diterima',
                                                    'checklist-ditolak':  row.status_checklist === 'Ditolak',
                                                    'checklist-dirujuk':  row.status_checklist === 'Dirujuk',
                                                }">
                                                <i :class="{
                                                    'pi pi-check-circle': row.status_checklist === 'Diterima',
                                                    'pi pi-times-circle': row.status_checklist === 'Ditolak',
                                                    'pi pi-arrow-right':  row.status_checklist === 'Dirujuk',
                                                }"></i>
                                                {{ row.status_checklist }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Drawer from 'primevue/drawer';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import Message from 'primevue/message';
    import ConfirmDialog from 'primevue/confirmdialog';
    import AdministrasiBillingDialog from './AdministrasiBillingDialog.vue';
    import {
        FilterMatchMode
    } from 'primevue/api';

    export default {
        components: {
            Loading,
            Sidebar,
            Dialog,
            Drawer,
            Tabs,
            TabList,
            Tab,
            TabPanels,
            TabPanel,
            Message,
            ProgressBar,
            ConfirmDialog,
            AdministrasiBillingDialog
        },
        props: {
            msg: String
        },
        data() {
            return {
                showMenuAksi: false,
                cariMenu: '',
                rowMenu: null,
                showAdministrasi: false,
                pasienAdministrasi: null,
                globalFilter: '',
                sortMode: 'multiple',
                showAdvanced: false,
                filterJenisRawat: 'SEMUA',
                opsiJenisRawat: ['SEMUA', 'INAP', 'JALAN'],
                filterTniPolri: 'SEMUA',
                opsiTniPolri: ['SEMUA', 'TNI', 'POLRI'],
                filterUsia: 'SEMUA',
                filters: {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                },
                formData: {
                    patientName: '',
                    patientId: '',
                    withdrawalReason: null
                },
                fact: [],
                errors: {},
                antrian_pasien: 0,
                class_button: 'p-button',
                temp_mode: '',
                form: {
                    startdate: '',
                    enddate: '',
                    parametersearch: '',
                    alasan_tarikpasien: '',
                    mode: 'history15',
                    kodeunit: '',
                    norm: '',
                    alasan: '',
                    nama_pasien: '',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
                    dokterselected: null,
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
                details_pasien: [],
                details_pasien_reff: { POLI: 'IGD' },
                ruangan: [],
                dataruangan_realtime: [],
                kode_unit_login: null,
                splitParts_kode_unit: [],
                characterFound: false,
                showmessage: false,
                showPindahruang: false,
                listPasienTidakDirawat: [],
                tampilkanDialogLPT: false,
                tariPasienDariIniBukanPasienKami: false,
                dataPasien: null,
                activeMainTab: '0',
                visitedMain: { '0': true },
                activeObatTab: '0',
                visitedObat: { '0': true },
                activePenunjangTab: '0',
                visitedPenunjang: { '0': true },
                activeObsTab: '0',
                visitedObs: { '0': true },
                activeGiziTab: '0',
                visitedGizi: { '0': true },
                activeOperasiTab: '0',
                visitedOperasi: { '0': true },

            };
        },
        watch: {
            activeMainTab(val) { this.visitedMain[val] = true; },
            activeObatTab(val) { this.visitedObat[val] = true; },
            activePenunjangTab(val) { this.visitedPenunjang[val] = true; },
            activeObsTab(val) { this.visitedObs[val] = true; },
            activeGiziTab(val) { this.visitedGizi[val] = true; },
            activeOperasiTab(val) { this.visitedOperasi[val] = true; },
            adaPasienTniPolri(val) {
                if (!val) this.filterTniPolri = 'SEMUA';
            },
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
        },
        created() {
            this.getdata_pasien(4);
            this.getnamaruangan_poli();
            this.getkode_unit();
            this.getnotif_pindahruangan();

        },
        computed: {
            menuAksi() {
                const r = this.rowMenu;
                if (!r) return [];
                const menu = [
                    { key: 'rm', label: 'Rekam Medis', icon: 'pi pi-folder-open', aksi: () => this.showdetails(r) }
                ];
                if (r.JENISRAWAT == 'INAP') {
                    menu.push(
                        { key: 'cppt', label: 'CPPT', icon: 'pi pi-print', aksi: () => this.print_soap(r.NOPENDAFTARAN) },
                        { key: 'resume', label: 'Resume', icon: 'pi pi-file-pdf', aksi: () => this.print_resume(r.NOPENDAFTARAN) },
                        { key: 'siriraj', label: 'Siriraj Skor', icon: 'pi pi-file-pdf', aksi: () => this.siriraj_score(r.NOPENDAFTARAN) },
                        { key: 'icu', label: 'Checklist ICU/HCU', icon: 'pi pi-clipboard', aksi: () => this.bukaChecklist(r) },
                        { key: 'adm', label: 'Administrasi', icon: 'pi pi-wallet', aksi: () => this.bukaAdministrasi(r) }
                    );
                }
                return menu;
            },
            menuAksiTampil() {
                const q = this.cariMenu.trim().toLowerCase();
                return q ? this.menuAksi.filter(m => m.label.toLowerCase().includes(q)) : this.menuAksi;
            },
            listDokter() {
                const map = {};
                (this.fact || []).forEach(row => {
                    if (row.NAMADOKTER && !map[row.NAMADOKTER]) {
                        map[row.NAMADOKTER] = {
                            NAMADOKTER: row.NAMADOKTER
                        };
                    }
                });
                return Object.values(map).sort((a, b) => a.NAMADOKTER.localeCompare(b.NAMADOKTER));
            },
            factFilteredNamaPasien() {
                if (!this.form.dokterselected) return this.fact || [];
                return (this.fact || []).filter(
                    row => row.NAMAPASIEN === this.form.nama_pasien
                );
            },
            factFilteredDasar() {
                let result = this.fact || [];
                if (this.form.nama_pasien && this.form.nama_pasien.trim() !== '') {
                    const keyword = this.form.nama_pasien.trim().toLowerCase();
                    result = result.filter(row =>
                        String(row.NAMAPASIEN || '').toLowerCase().includes(keyword)
                    );
                }
                if (this.form.dokterselected) {
                    result = result.filter(row =>
                        row.NAMADOKTER === this.form.dokterselected.NAMADOKTER
                    );
                }
                if (this.filterTniPolri === 'TNI') {
                    result = result.filter(row => row.PEKERJAAN == 7);
                } else if (this.filterTniPolri === 'POLRI') {
                    result = result.filter(row => row.PEKERJAAN == 2);
                }
                if (this.filterJenisRawat && this.filterJenisRawat !== 'SEMUA') {
                    result = result.filter(row => row.JENISRAWAT === this.filterJenisRawat);
                }
                return result;
            },
            factFiltered() {
                let result = this.factFilteredDasar || [];
                if (this.filterUsia && this.filterUsia !== 'SEMUA') {
                    result = result.filter(row => this.kategoriUsia(row) === this.filterUsia);
                }
                return result;
            },
            adaPasienTniPolri() {
                return (this.fact || []).some(row => row.PEKERJAAN == 7 || row.PEKERJAAN == 2);
            },
            filteredDataPasien() {
                if (!this.globalFilter || this.globalFilter.trim() === '') {
                    return this.listPasienTidakDirawat || [];
                }
                const searchTerm = this.globalFilter.toLowerCase().trim();
                return (this.listPasienTidakDirawat || []).filter(item =>
                    String(item.NOSEP || '').toLowerCase().includes(searchTerm) ||
                    String(item.NAMAPASIEN || '').toLowerCase().includes(searchTerm) ||
                    String(item.NOMR || '').toLowerCase().includes(searchTerm)
                );
            },
            jumlahRawatInap() {
                return (this.factFiltered || []).filter(r => r.JENISRAWAT === 'INAP').length;
            },
            jumlahRawatJalan() {
                return (this.factFiltered || []).filter(r => r.JENISRAWAT !== 'INAP').length;
            },
            jumlahWaitingList() {
                return (this.factFiltered || []).filter(r => r.KODECARABAYAR == 27 || r.KODECARABAYAR == 28).length;
            },
            rekapCaraBayar() {
                const map = {};
                (this.factFiltered || []).forEach(row => {
                    const key = row.CARABAYAR || 'Lainnya';
                    map[key] = (map[key] || 0) + 1;
                });
                return Object.keys(map).map(nama => ({ nama, jumlah: map[nama] }));
            },
            jumlahTNI() {
                return (this.factFiltered || []).filter(r => r.PEKERJAAN == 7).length;
            },
            jumlahPOLRI() {
                return (this.factFiltered || []).filter(r => r.PEKERJAAN == 2).length;
            },
            jumlahBayi() {
                return (this.factFilteredDasar || []).filter(r => this.kategoriUsia(r) === 'BAYI').length;
            },
            jumlahBalita() {
                return (this.factFilteredDasar || []).filter(r => this.kategoriUsia(r) === 'BALITA').length;
            },
            jumlahRemaja() {
                return (this.factFilteredDasar || []).filter(r => this.kategoriUsia(r) === 'REMAJA').length;
            },
            jumlahDewasa() {
                return (this.factFilteredDasar || []).filter(r => this.kategoriUsia(r) === 'DEWASA').length;
            },
            jumlahLansia() {
                return (this.factFilteredDasar || []).filter(r => this.kategoriUsia(r) === 'LANSIA').length;
            }
        },
        methods: {
            applyDokterFilter() {
                // filter reaktif via computed, tidak perlu reload data
            },
            kategoriUsia(row) {
                const usia = row?.USIA_PASIEN?.tahun;
                if (usia === undefined || usia === null || usia === '') return null;
                const n = Number(usia);
                if (isNaN(n)) return null;
                if (n < 2) return 'BAYI';
                if (n < 6) return 'BALITA';
                if (n < 18) return 'REMAJA';
                if (n < 60) return 'DEWASA';
                return 'LANSIA';
            },
            async getdata_pasien_by_noregister(noregister) {
                if (!noregister) return;

                this.isLoading = true;
                try {
                    const today = new Date().toISOString();
                    const response = await axios.post('/getpasien_api', {
                        noregister: noregister,
                        mode: 1,
                        startdate: today,
                        enddate: today,
                        kodeunit: '',
                        norm: '',
                        parametersearch: '',
                    });

                    const list = response.data?.response || [];
                    if (list.length > 0) {
                        this.details_pasien_reff = list[0];
                    }
                } catch (e) {
                    console.error('getdata_pasien_by_noregister:', e);
                } finally {
                    this.isLoading = false;
                }
            },

            bukaMenuAksi(row) {
                this.rowMenu = row;
                this.cariMenu = '';
                this.showMenuAksi = true;
            },
            fokusCariMenu() {
                this.$nextTick(() => {
                    if (this.$refs.cariMenuInput) this.$refs.cariMenuInput.focus();
                });
            },
            // Enter di kolom cari: langsung jalankan menu bila hasil saringan tinggal satu.
            pilihMenuTunggal() {
                if (this.menuAksiTampil.length === 1) {
                    this.aksiMenu(this.menuAksiTampil[0].aksi);
                }
            },
            aksiMenu(fn) {
                this.showMenuAksi = false;
                fn();
            },
            bukaAdministrasi(row) {
                this.pasienAdministrasi = row;
                this.showAdministrasi = true;
            },
            bukaChecklist(row) {
                window.open('/checklist-masuk-icu-hcu/' + row.NOPENDAFTARAN, '_blank');
            },
            print_soap(noregister) {
                window.open('/print-soap/' + noregister, '_blank');
            },
            print_resume(noregister) {
                window.open('/print-resume-pulang/' + noregister, '_blank');
            },
            konsultasi_dokter(noregister) {
                window.open('/konsultasi-dokter/' + noregister, '_blank');
            },
            siriraj_score(noregister) {
                window.open('/siriraj-score/' + noregister, '_blank');
            },
            validateForm() {
                if (!this.formData.patientName.trim()) {
                    this.errors.patientName = 'Nama pasien harus diisi';
                }
            },
            func_tarik_pasien(data) {
                this.tariPasienDariIniBukanPasienKami = true;
                this.dataPasien = data;
                this.pasien_sedang_rawat_inap();
                this.form.old_ruangan = data.KODERUANGAN;
                this.form.noregister = data.NOPENDAFTARAN;
                this.details_pasien = data;
            },
            show_list_pasien_pindah_ruang() {
                this.showPindahruang = true;
            },
            checkCharacter(param) {
                if (typeof param === 'string') {
                    return param.includes(',');
                }
                return false;
            },
            getkode_unit() {
                axios.post('/getruangan_user_login').then(response => {
                    this.kode_unit_login = response.data;
                    this.splitParts_kode_unit = [];
                    this.characterFound = this.checkCharacter(this.kode_unit_login);
                    if (this.characterFound) {
                        this.splitParts_kode_unit = this.kode_unit_login.split(',').map(i => i.trim());
                    } else {
                        this.splitParts_kode_unit.push(this.kode_unit_login);
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => this.isLoading = false);
            },
            showdetails(pasien) {
                this.details_pasien_reff = { POLI: 'IGD' };
                this.openBasic2();
                this.details_pasien = pasien;
                if (pasien.REFF_INTERNAL) {
                    this.getdata_pasien_by_noregister(pasien.REFF_INTERNAL);
                }
            },
            async change_ruangan(e) {
                this.form.kodeunit = e.value.KODE;
                this.getdata_pasien(4);
            },
            async refresh_form() {
                this.form.kodeunit = this.temp_mode;
                this.getdata_pasien(4);
            },
            confirm_tidak_merawat(data) {
                this.$confirm.require({
                    message: 'Konfirmasi bahwa Anda tidak merawat pasien: ' + data.NAMAPASIEN + '?',
                    header: 'Konfirmasi',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        this.tidak_merawat_pasien_ini(data);
                    },
                    reject: () => {
                        console.log('batal');
                    }
                });
            },
            async tidak_merawat_pasien_ini(data) {
                this.isLoading = true;
                await axios.post('/tidak_merawat_pasien_ini', {
                        noregister: data.NOPENDAFTARAN,
                        los: data.JLM_HARI_RAWAT
                    })
                    .then(response => {
                        if (response.data.metadata.code == 200) {
                            this.open("success", "Berhasil diproses");
                            const index = this.fact.findIndex(i => i.NOPENDAFTARAN === data.NOPENDAFTARAN);
                            if (index > -1) this.fact.splice(index, 1);
                        } else {
                            this.open("warning", response.data.metadata.message);
                        }
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async pasiwn_pindah_ruang(data) {
                this.pasien_sedang_rawat_inap();
                this.form.old_ruangan = data.KODERUANGAN;
                this.namaruagan_asal = data.POLI;
                this.form_pindahruang = true;
                this.form.noregister = data.NOPENDAFTARAN;
                this.details_pasien = data;
            },
            open(type, message) {
                this.$toast.open({
                    message,
                    position: 'top-right',
                    type,
                    duration: 4000,
                    dismissible: true
                });
            },
            async excute_pindah_ruangan(data) {
                this.form.id_ruangan = data.KD_RUANGAN;
                this.isLoading = true;
                await axios.post('/pasien_pindah_ruangan', this.form)
                    .then(response => {
                        if (response.data == 200) {
                            this.open("success", "Berhasil pindah ruangan");
                        } else {
                            this.open("warning", "Gagal proses — apakah bed masih tersedia?");
                            return;
                        }
                        this.tariPasienDariIniBukanPasienKami = false;
                        this.form_pindahruang = false;
                        this.getdata_pasien(4);
                        this.getdata_pasien(9);
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getdata_pasien(mode) {
                this.form.mode = mode;
                this.isLoading = true;
                await axios.post('/getpasien_api', this.form)
                    .then(response => {
                        if (mode != 9) {
                            this.fact = response.data.response || [];
                            this.showmessage = this.fact.some(r => r.KODECARABAYAR == 27 || r.KODECARABAYAR ==
                                28);
                            this.form.dokterselected = null;
                        } else {
                            this.listPasienTidakDirawat = response.data.response || [];
                            this.tampilkanDialogLPT = true;
                        }
                        this.get_notif_penunjang_json(mode);
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },

            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            async pasien_sedang_rawat_inap() {
                await axios.post('/pasien_sedang_rawat_inap')
                    .then(response => {
                        this.isLoading = true;
                        this.dataruangan_realtime = response.data.response;

                        for (let i = 0; i < this.dataruangan_realtime.length; i++) {
                            this.dataruangan_realtime[i].MYROOM = 0;
                            for (let j = 0; j < this.splitParts_kode_unit.length; j++) {
                                if (this.dataruangan_realtime[i].KD_RUANGAN == this.splitParts_kode_unit[j]) {
                                    this.dataruangan_realtime[i].MYROOM = 1;
                                }
                            }
                        }

                        this.isLoading = false;
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getnamaruangan_poli() {
                this.form.mode = 1;
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        this.ruangan = response.data;
                    })
                    .catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async getnotif_pindahruangan() {
                await axios.post('/getnotif_pindahruangan')
                    .then(response => {
                        this.antrian_pasien = response.data.response.antrian;
                        this.class_button = this.antrian_pasien > 0 ? 'p-button p-button-danger' : 'p-button';
                    }).catch(e => console.log(e)).finally(() => this.isLoading = false);
            },
            async get_notif_penunjang_json(mode) {
                try {
                    const tglawal = this.form.startdate;
                    this.form.mode = mode;

                    if (mode == 4) {
                        this.form.kodeunit = "";
                    }

                    const response = await axios.post('/get_notif_penunjang_json', this.form);

                    const results = response.data.results || [];
                    this.fact.forEach((row, index) => {
                        const noReg = String(row.NOPENDAFTARAN).trim();
                        const matched = results.filter(n => {
                            const noPenunjang = String(n.NOREGISTER).trim();
                            return noPenunjang === noReg ||
                                noPenunjang.includes(noReg) ||
                                noReg.includes(noPenunjang);
                        });
                        this.fact[index] = {
                            ...row,
                            PENUNJANG: matched
                        };
                    });

                } catch (error) {
                    console.error('get_notif_penunjang_json:', error);
                }
            }
        }
    }

</script>

<style scoped>
    .filter-label {
        display: block;
        font-size: .75rem;
        font-weight: 600;
        color: #555;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: .04em;
    }

    /* ===== ADVANCED SEARCH ===== */
    .advanced-search-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #1976d2;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        padding: 4px 0;
        border-bottom: 1px dashed #1976d2;
        width: fit-content;
        user-select: none;
    }

    .advanced-search-body {
        background: #f5f8ff;
        border: 1px solid #d0e3ff;
        border-radius: 6px;
        padding: 16px;
    }

    .rekap-title {
        font-size: .8rem;
        font-weight: 700;
        color: #555;
        text-transform: uppercase;
        letter-spacing: .04em;
        border-top: 1px dashed #d0e3ff;
        padding-top: 12px;
    }

    .rekap-chip-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .rekap-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 1rem;
        font-weight: 600;
        white-space: nowrap;
        background: #fff;
    }

    .rekap-chip strong {
        font-weight: 700;
        font-size: 1.1rem;
    }

    .rekap-chip-blue {
        color: #1565c0;
        border: 1px solid #90caf9;
    }

    .rekap-chip-green {
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }

    .rekap-chip-orange {
        color: #e65100;
        border: 1px solid #ffcc80;
    }

    /* ===== STAT CARDS ===== */
    .stat-card {
        display: flex;
        align-items: center;
        gap: 16px;
        border-radius: 10px;
        padding: 16px 20px;
        color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .10);
        margin-bottom: 0;
    }

    .stat-blue {
        background: linear-gradient(135deg, #1976d2, #42a5f5);
    }

    .stat-green {
        background: linear-gradient(135deg, #2e7d32, #66bb6a);
    }

    .stat-orange {
        background: linear-gradient(135deg, #e65100, #ffa726);
    }

    .stat-red {
        background: linear-gradient(135deg, #b71c1c, #ef5350);
    }

    .stat-icon {
        font-size: 2rem;
        opacity: .85;
    }

    .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1;
    }

    .stat-label {
        font-size: 0.82rem;
        opacity: .9;
        margin-top: 2px;
    }

    /* ===== TABLE ===== */
    .pasien-table thead th {
        background: #ffffff;
        text-transform: uppercase;
        letter-spacing: .05em;
        white-space: nowrap;
        vertical-align: middle;
        border-color: #bababa !important;
    }

    .pasien-table tbody tr:hover {
        background: #e3f2fd !important;
    }

    .row-waiting {
        background: #fff8e1 !important;
    }

    .row-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #e3f2fd;
        color: #1565c0;
        font-weight: 700;
        font-size: 1rem;
    }

    .pasien-nama-table {
        font-weight: 700;
        font-size: .92rem;
        color: #1a1a2e;
    }

    .pasien-nomr {
        font-size: .78rem;
        color: #555;
        margin-top: 2px;
    }

    .pasien-dokter {
        font-size: .78rem;
        color: #1976d2;
        margin-top: 1px;
    }

    .badge-status {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: .72rem;
        font-weight: 600;
    }

    .badge-status-rawat {
        background: #ffebee;
        color: #c62828;
    }

    .badge-status-selesai {
        background: #e8f5e9;
        color: #2e7d32;
    }

    .los-badge {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: 700;
        color: #1565c0;
    }

    .cara-bayar-badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: .78rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .cara-bayar-warning {
        background: #ffebee;
        color: #b71c1c;
        border: 1px solid #ef9a9a;
    }

    .cara-bayar-normal {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }

    .jenis-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: .04em;
    }

    .jenis-inap {
        background: #1565c0;
        color: #fff;
    }

    .jenis-jalan {
        background: #00695c;
        color: #fff;
    }

    .hakkelas-badge {
        display: inline-block;
        padding: 1px 8px;
        border-radius: 4px;
        font-size: .72rem;
        font-weight: 600;
        white-space: nowrap;
    }
    .hakkelas-sesuai {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }
    .hakkelas-naik {
        background: #fff3e0;
        color: #e65100;
        border: 1px solid #ffcc80;
    }

    /* ===== AKSI BUTTONS ===== */
    .aksi-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .btn-menu-aksi {
        width: 34px;
        height: 34px;
        border: 1px solid #cbd5e1;
        border-radius: 50%;
        background: #fff;
        color: #475569;
        cursor: pointer;
    }
    .aksi-cepat {
        display: flex;
        justify-content: center;
        gap: 6px;
    }
    .btn-rm-cepat {
        color: #0d6efd;
    }
    .btn-menu-aksi:hover {
        background: #f1f5f9;
        color: #0d6efd;
    }
    .menu-aksi-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .menu-aksi-search {
        position: relative;
    }
    .menu-aksi-search i {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
    }
    .menu-aksi-search .form-control {
        padding-left: 32px;
    }
    .menu-aksi-items {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .menu-aksi-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: .9rem;
        color: #334155;
    }
    .menu-aksi-item:hover,
    .menu-aksi-item:focus {
        background: #eff6ff;
        color: #0d6efd;
        outline: none;
    }
    .menu-aksi-item > i:first-child {
        width: 18px;
        text-align: center;
    }
    .menu-aksi-item span {
        flex: 1;
    }
    .menu-aksi-arrow {
        color: #94a3b8;
        font-size: .8rem;
    }
    .menu-aksi-kosong {
        padding: 16px 0;
        text-align: center;
        color: #94a3b8;
        font-size: .875rem;
    }
    .menu-aksi-pasien {
        display: flex;
        flex-direction: column;
        padding-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
    }
    .btn-aksi {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 10px;
        border-radius: 5px;
        font-size: .76rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: opacity .15s, transform .1s;
        white-space: nowrap;
    }

    .btn-aksi:hover {
        opacity: .85;
        transform: translateX(1px);
    }

    .btn-aksi-info {
        background: #1976d2;
        color: #fff;
    }

    .btn-aksi-default {
        background: #546e7a;
        color: #fff;
    }

    .btn-aksi-purple {
        background: #6a1b9a;
        color: #fff;
    }

    .btn-aksi-danger {
        background: #c62828;
        color: #fff;
    }

    .btn-icon-pindah {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #00acc1;
        background: #e0f7fa;
        color: #00acc1;
        cursor: pointer;
        font-size: 1rem;
        transition: background .15s, color .15s;
    }

    .btn-icon-pindah:hover {
        background: #00acc1;
        color: #fff;
    }

    /* ===== REKAM MEDIS HEADER ===== */
    .rm-header-card {
        background: linear-gradient(135deg, #1565c0 0%, #0288d1 100%);
        border-radius: 10px;
        padding: 20px 24px;
        margin-bottom: 16px;
        color: #fff;
    }

    .rm-header-inner {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        flex-wrap: wrap;
    }

    .rm-patient-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .18);
        font-size: 2rem;
        flex-shrink: 0;
    }

    /* ===== TARIK PASIEN DIALOG ===== */
    .tarik-pasien-body {
        padding: 8px 0;
    }

    .tarik-info-box {
        display: flex;
        align-items: center;
        gap: 14px;
        background: #e3f2fd;
        border: 1px solid #90caf9;
        border-radius: 8px;
        padding: 14px 18px;
        margin-bottom: 20px;
    }

    .tarik-info-box .pi {
        font-size: 1.8rem;
        color: #1976d2;
    }

    .tarik-no-rm {
        font-size: 1rem;
        font-weight: 700;
        color: #1a1a2e;
    }

    .tarik-los {
        font-size: .87rem;
        color: #444;
        margin-top: 2px;
    }

    .tarik-ruangan-label {
        font-weight: 600;
        font-size: .85rem;
        color: #555;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: .04em;
    }

    .tarik-ruangan-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    /* ===== TRANSFER LAYOUT ===== */
    .transfer-layout {
        display: flex;
        align-items: flex-start;
        gap: 20px;
    }

    .transfer-asal {
        background: #fce4ec;
        border: 1px solid #f48fb1;
        border-radius: 8px;
        padding: 16px 24px;
        min-width: 160px;
        text-align: center;
    }

    .transfer-label {
        font-size: .78rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #555;
        margin-bottom: 6px;
    }

    .transfer-ruang-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: #1a1a2e;
    }

    .transfer-arrow {
        font-size: 2rem;
        color: #1976d2;
        margin-top: 24px;
    }

    /* ===== DROPDOWN DOKTER ===== */
    .dropdown-dokter-option {
        display: flex;
        align-items: center;
    }

    /* ===== MISC ===== */
    .table-header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .col-pasien-info {
        line-height: 1.5;
    }

    .pasien-nama {
        font-weight: 700;
        font-size: .9rem;
    }

    .pasien-sep {
        font-weight: 600;
        font-size: .85rem;
        color: #1565c0;
    }

    .pasien-meta {
        font-size: .78rem;
        color: #666;
    }

    /* ===== NOTIF PENUNJANG ===== */
    .penunjang-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .penunjang-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #dee2e6;
        background: #f8f9fa;
        color: #495057;
        max-width: 200px;
        overflow: hidden;
    }

    .penunjang-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dot-menunggu {
        background: #adb5bd;
    }

    .dot-selesai {
        background: #28a745;
        animation: blink-dot 2s ease-in-out infinite;
    }

    @keyframes blink-dot {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.2;
        }
    }

    .penunjang-nama {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    .penunjang-status {
        color: #adb5bd;
        flex-shrink: 0;
    }

    .penunjang-selesai {
        border-color: #c3e6cb;
        background: #f0fff4;
    }

    .penunjang-selesai .penunjang-status {
        color: #28a745;
    }

    .penunjang-menunggu {
        border-color: #dee2e6;
        background: #f8f9fa;
    }

    .penunjang-menunggu .penunjang-status {
        color: #adb5bd;
    }

    /* ===== CHECKLIST ICU/HCU ===== */
    .btn-aksi-icu {
        background: #006064;
        color: #fff;
    }

    .checklist-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: .72rem;
        font-weight: 600;
    }

    .checklist-diterima {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
    }

    .checklist-ditolak {
        background: #ffebee;
        color: #b71c1c;
        border: 1px solid #ef9a9a;
    }

    .checklist-dirujuk {
        background: #fff8e1;
        color: #e65100;
        border: 1px solid #ffcc02;
    }

</style>
