<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
        <ConfirmDialog :group="confirmGroup" />

        <!-- ===== TABEL PEMBERIAN OBAT ===== -->
        <div class="card card-outline card-primary shadow-sm">
            <div class="card-header d-flex align-items-center justify-content-between py-2">
                <h3 class="card-title font-weight-bold mb-0">
                    <i class="fas fa-pills mr-2 text-primary"></i>
                    Catatan Pemberian Obat
                </h3>
                <div class="d-flex align-items-center" style="gap:6px">
                    <SelectButton v-model="viewMode" :options="viewModeOptions" optionLabel="label" optionValue="value"
                        class="p-button-sm" />
                    <Button label="Tambah" icon="pi pi-plus" class="p-button-success p-button-sm" @click="call_form()" />
                    <Button icon="pi pi-refresh" class="p-button-secondary p-button-sm p-button-outlined" @click="getpemberian_obat()" v-tooltip.top="'Refresh data'" />
                </div>
            </div>
            <div class="card-body p-0" v-if="viewMode === 'list'">
                <DataTable :value="fact" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                    stripedRows sortMode="multiple" class="p-datatable-sm" responsiveLayout="scroll"
                    :resizableColumns="true" :paginator="true" :rows="10" v-model:filters="filters2"
                    :rowsPerPageOptions="[10,20,50,100,200]">
                    <template #header>
                        <div class="d-flex justify-content-end p-2">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters2['global'].value" placeholder="Cari data..." style="width:220px" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center py-4 text-muted">
                            <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                            Belum ada data pemberian obat.
                        </div>
                    </template>
                    <Column field="nama_obat" :sortable="true" header="Nama Obat" :styles="{'min-width':'140px'}"></Column>
                    <Column field="qty"       :sortable="true" header="Jumlah">
                        <template #body="slotProps">
                            <span v-if="slotProps.data.barcode && Number(slotProps.data.qty) > 0">{{ $numeral(slotProps.data.qty, '0,0.[00]') }} {{ slotProps.data.satuan }}</span>
                            <span v-else-if="slotProps.data.barcode" class="text-info" v-tooltip.top="'Obat multi-dosis, stok dipotong saat kemasan habis pakai'">Dari kemasan</span>
                            <span v-else class="text-muted">-</span>
                        </template>
                    </Column>
                    <Column field="dosis"     :sortable="true" header="Dosis"></Column>
                    <Column field="frekwensi" :sortable="true" header="Frekuensi"></Column>
                    <Column field="rute"      :sortable="true" header="Rute"></Column>
                    <Column field="waktu"     :sortable="true" header="Waktu Pemberian"></Column>
                    <Column field="keterangan" :sortable="true" header="Keterangan"></Column>
                    <Column field="obat_dc"   :sortable="true" header="High Alert">
                        <template #body="slotProps">
                            <span :class="slotProps.data.obat_dc === 'YA' ? 'badge badge-danger' : 'badge badge-secondary'">
                                {{ slotProps.data.obat_dc }}
                            </span>
                        </template>
                    </Column>
                    <Column field="ruangan"   :sortable="true" header="Ruangan"></Column>
                    <Column field="auth_by"   header="Verifikasi" :styles="{'min-width':'110px'}">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.auth == 1" class="text-center">
                                <qrcode-vue :value="slotProps.data.auth_by" :size="48" level="H"></qrcode-vue>
                                <div class="text-xs text-muted mt-1">{{ slotProps.data.auth_by }}</div>
                                <div class="text-xs text-muted">{{ slotProps.data.time_verif }}</div>
                            </div>
                            <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                v-tooltip.top="'Otorisasi'" @click="call_oto(slotProps.data.id, 7)" />
                        </template>
                    </Column>
                    <Column header="Aksi" :styles="{'width':'90px','text-align':'center'}">
                        <template #body="slotProps">
                            <Button icon="pi pi-copy"  class="p-button-text p-button-info p-button-sm"   v-tooltip.top="'Salin'"  @click="filter_data(slotProps.data.id)" />
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" v-tooltip.top="'Hapus'" @click="hapus_line(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- ===== STOK OBAT RESEP DI RUANGAN ===== -->
            <div class="card-body p-0" v-else-if="viewMode === 'stok'">
                <!-- Obat resep yang sudah dikirim farmasi, belum dikonfirmasi lewat Serah Terima Obat -->
                <div v-if="belum_diterima.length > 0" class="p-2 border-bottom terima-box">
                    <div class="mb-2">
                        <span class="font-weight-bold text-warning">
                            <i class="fas fa-truck mr-1"></i>
                            Obat dari farmasi menunggu diterima ({{ belum_diterima.length }})
                        </span>
                        <div class="text-sm text-muted">
                            Belum masuk stok pasien. Konfirmasi lewat tab <b>Permintaan Obat</b> &rarr;
                            <b>Konfirmasi Terima Obat</b> pada resep terkait.
                        </div>
                    </div>
                    <table class="table table-bordered table-sm mb-0 stok-table bg-white">
                        <thead>
                            <tr>
                                <th>No. Resep</th>
                                <th>Tanggal</th>
                                <th style="min-width:180px">Nama Obat</th>
                                <th class="text-center">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in belum_diterima" :key="item.RECEIPT_NO + '|' + item.BARCODE">
                                <td>{{ item.RECEIPT_NO }}</td>
                                <td>{{ item.TANGGAL }}</td>
                                <td>{{ item.NAMABARANG }}</td>
                                <td class="text-center">{{ $numeral(item.QTY, '0,0.[00]') }} {{ item.SATUAN }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered table-sm mb-0 stok-table">
                        <thead>
                            <tr>
                                <th style="min-width:180px">Nama Obat</th>
                                <th class="text-center">Satuan</th>
                                <th class="text-center">Diterima</th>
                                <th class="text-center">Diberikan</th>
                                <th class="text-center">Diretur</th>
                                <th class="text-center">Sisa Stok</th>
                                <th class="text-center">Status</th>
                                <th class="text-center" style="width:90px">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="stok_obat.length === 0">
                                <td colspan="8" class="text-center text-muted py-4">
                                    <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                                    Belum ada obat resep yang diterima ruangan.
                                </td>
                            </tr>
                            <tr v-for="item in stok_obat" :key="item.barcode">
                                <td class="font-weight-bold">
                                    {{ item.nama_obat }}
                                    <span v-if="item.multi_dosis" class="badge badge-info ml-1"
                                        v-tooltip.top="'Satu kemasan untuk banyak pemberian. Pemberian tidak memotong stok; tandai Habis pakai saat kemasan habis.'">Multi-dosis</span>
                                </td>
                                <td class="text-center">{{ item.satuan }}</td>
                                <td class="text-center">{{ $numeral(item.diterima, '0,0.[00]') }}</td>
                                <td class="text-center">
                                    <template v-if="item.multi_dosis">
                                        <div>{{ item.jumlah_pemberian }}&times; pemberian</div>
                                        <div v-if="item.habis_pakai > 0" class="text-xs text-muted">
                                            habis pakai {{ $numeral(item.habis_pakai, '0,0.[00]') }} {{ item.satuan }}
                                        </div>
                                    </template>
                                    <template v-else>{{ $numeral(item.diberikan, '0,0.[00]') }}</template>
                                </td>
                                <td class="text-center">{{ $numeral(item.diretur, '0,0.[00]') }}</td>
                                <td class="text-center font-weight-bold" :class="item.sisa > 0 ? 'text-primary' : 'text-muted'">
                                    {{ $numeral(item.sisa, '0,0.[00]') }}
                                </td>
                                <td class="text-center">
                                    <span v-if="item.sisa > 0 && item.multi_dosis && item.jumlah_pemberian > 0" class="badge badge-info">Sedang dipakai</span>
                                    <span v-else-if="item.sisa > 0" class="badge badge-warning">Tersedia / dapat diretur</span>
                                    <span v-else class="badge badge-success">Habis</span>
                                </td>
                                <td class="text-center">
                                    <Button v-if="item.multi_dosis" icon="pi pi-check-square" class="p-button-text p-button-success p-button-sm"
                                        v-tooltip.top="'Habis pakai (kemasan selesai dipakai)'" :disabled="item.sisa <= 0" @click="call_habis_pakai(item)" />
                                    <Button icon="pi pi-replay" class="p-button-text p-button-warning p-button-sm" v-tooltip.top="'Retur ke farmasi'"
                                        :disabled="item.sisa <= 0" @click="call_retur(item)" />
                                    <Button icon="pi pi-book" class="p-button-text p-button-info p-button-sm" v-tooltip.top="'Kartu stok'"
                                        @click="buka_kartu_stok(item)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Riwayat retur ke farmasi -->
                <div v-if="retur_list.length > 0" class="p-2 border-top">
                    <div class="font-weight-bold mb-2"><i class="fas fa-undo mr-1"></i> Retur ke Farmasi</div>
                    <table class="table table-bordered table-sm mb-0 stok-table">
                        <thead>
                            <tr>
                                <th>No. Retur</th>
                                <th>Tanggal</th>
                                <th style="min-width:180px">Nama Obat</th>
                                <th class="text-center">Jumlah</th>
                                <th>Keterangan</th>
                                <th class="text-center">Status</th>
                                <th>Diproses</th>
                                <th class="text-center" style="width:60px">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="r in retur_list" :key="r.ID">
                                <td>{{ r.NO_RETUR }}</td>
                                <td>{{ r.REQUEST_AT }}</td>
                                <td>{{ r.NAMABARANG }}</td>
                                <td class="text-center">{{ $numeral(r.QTY, '0,0.[00]') }} {{ r.SATUAN }}</td>
                                <td>{{ r.KETERANGAN }}</td>
                                <td class="text-center">
                                    <span class="badge" :class="status_retur_class(r.STATUS)">{{ status_retur_label(r) }}</span>
                                    <div v-if="r.STATUS === 'DITOLAK'" class="text-xs text-muted">{{ r.ALASAN_TOLAK }}</div>
                                </td>
                                <td class="text-xs">
                                    <span v-if="r.PROSES_AT">{{ r.PROSES_BY }}<br>{{ r.PROSES_AT }}</span>
                                </td>
                                <td class="text-center">
                                    <Button v-if="r.STATUS === 'MENUNGGU'" icon="pi pi-times" class="p-button-text p-button-danger p-button-sm"
                                        v-tooltip.top="'Batalkan retur'" @click="batal_retur(r)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ===== CROSSTAB VIEW: OBAT x TANGGAL ===== -->
            <div class="card-body p-0" v-else>
                <div class="table-responsive">
                    <table class="table table-bordered table-sm mb-0 crosstab-table">
                        <thead>
                            <tr>
                                <th style="min-width:180px">Nama Obat</th>
                                <th v-for="d in crosstabDates" :key="d" class="text-center" style="min-width:100px">
                                    {{ formatDateHeader(d) }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="crosstabRows.length === 0">
                                <td :colspan="crosstabDates.length + 1" class="text-center text-muted py-4">
                                    <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                                    Belum ada data pemberian obat.
                                </td>
                            </tr>
                            <tr v-for="row in crosstabRows" :key="row.nama_obat">
                                <td class="font-weight-bold">{{ row.nama_obat }}</td>
                                <td v-for="d in crosstabDates" :key="d" class="text-center crosstab-cell"
                                    :class="{ 'crosstab-cell-filled': row.cells[d] }"
                                    @click="row.cells[d] && buka_detail_sel(row.nama_obat, d, row.cells[d])">
                                    <template v-if="row.cells[d]">
                                        <span v-for="entry in row.cells[d]" :key="entry.id"
                                            class="crosstab-badge"
                                            :class="entry.auth == 1 ? 'crosstab-badge-verified' : 'crosstab-badge-pending'">
                                            {{ timeOnly(entry.waktu) }}
                                        </span>
                                    </template>
                                    <span v-else class="text-muted">-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ===== DIALOG: DETAIL SEL CROSSTAB ===== -->
        <Dialog :header="'Detail Pemberian: ' + selectedCellLabel" v-model:visible="showCellDetail"
            :containerStyle="{width:'60vw'}" :modal="true">
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Waktu</th>
                        <th>Dosis</th>
                        <th>Frekuensi</th>
                        <th>Rute</th>
                        <th>Keterangan</th>
                        <th>High Alert</th>
                        <th style="min-width:110px">Verifikasi</th>
                        <th style="width:90px" class="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in selectedCellEntries" :key="entry.id">
                        <td>{{ entry.waktu }}</td>
                        <td>{{ entry.dosis }}</td>
                        <td>{{ entry.frekwensi }}</td>
                        <td>{{ entry.rute }}</td>
                        <td>{{ entry.keterangan }}</td>
                        <td>
                            <span :class="entry.obat_dc === 'YA' ? 'badge badge-danger' : 'badge badge-secondary'">
                                {{ entry.obat_dc }}
                            </span>
                        </td>
                        <td>
                            <div v-if="entry.auth == 1" class="text-center">
                                <qrcode-vue :value="entry.auth_by" :size="40" level="H"></qrcode-vue>
                                <div class="text-xs text-muted mt-1">{{ entry.auth_by }}</div>
                                <div class="text-xs text-muted">{{ entry.time_verif }}</div>
                            </div>
                            <Button v-else icon="pi pi-lock-open" class="p-button-rounded p-button-warning p-button-sm"
                                v-tooltip.top="'Otorisasi'" @click="call_oto(entry.id, 7)" />
                        </td>
                        <td class="text-center">
                            <Button icon="pi pi-copy" class="p-button-text p-button-info p-button-sm" v-tooltip.top="'Salin'"
                                @click="filter_data(entry.id); showCellDetail=false" />
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" v-tooltip.top="'Hapus'"
                                @click="hapus_line(entry.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showCellDetail=false" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: OTORISASI ===== -->
        <Dialog header="Otorisasi Pemberian Obat" v-model:visible="showOtorisasi"
            :containerStyle="{width:'40vw'}" :modal="true">
            <otorisasi-form @getvalue="handleValue" :mode="mode_otto" :noregister="id_inputan"></otorisasi-form>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="showOtorisasi=false" />
                <Button label="Tutup"  icon="pi pi-check" @click="showOtorisasi=false" autofocus />
            </template>
        </Dialog>

        <!-- ===== DIALOG: OTORISASI PEMBATALAN PEMBERIAN ===== -->
        <Dialog header="Otorisasi Pembatalan Pemberian Obat" v-model:visible="showHapusOto"
            :style="{ width: '420px' }" :breakpoints="{ '576px': '100vw' }" :modal="true" :draggable="false">
            <div class="mb-3 text-sm">
                Pembatalan <b>{{ hapus_oto.label }}</b> harus diotorisasi oleh user yang melakukan penghapusan.
            </div>
            <label class="form-label-custom">Username <span class="text-danger">*</span></label>
            <InputText class="w-100 mb-3" v-model="hapus_oto.username" autocomplete="off" placeholder="Username" />
            <label class="form-label-custom">Password <span class="text-danger">*</span></label>
            <InputText class="w-100 mb-3" type="password" v-model="hapus_oto.password" autocomplete="new-password"
                placeholder="Password" @keyup.enter="simpan_hapus_oto()" />
            <label class="form-label-custom">Alasan Pembatalan <span class="text-danger">*</span></label>
            <Textarea class="w-100" v-model="hapus_oto.alasan" rows="2" autoResize placeholder="Contoh: salah input jumlah / salah pasien" />
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text" @click="showHapusOto=false" />
                <Button label="Hapus" icon="pi pi-trash" class="p-button-danger" :loading="isLoading" @click="simpan_hapus_oto()" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: RETUR OBAT KE FARMASI ===== -->
        <Dialog header="Retur Obat ke Farmasi" v-model:visible="showRetur" :style="{ width: '35vw' }"
            :breakpoints="{ '768px': '100vw' }" :modal="true">
            <div v-if="retur.item" class="p-2">
                <div class="mb-2"><b>{{ retur.item.nama_obat }}</b></div>
                <div class="mb-3 text-muted">Sisa stok: {{ $numeral(retur.item.sisa, '0,0.[00]') }} {{ retur.item.satuan }}</div>
                <label class="form-label-custom">Jumlah Retur <span class="text-danger">*</span></label>
                <InputNumber class="w-100 mb-3" inputClass="w-100" v-model="retur.qty" :min="0" :max="retur.item.sisa"
                    :minFractionDigits="0" :maxFractionDigits="2" :suffix="retur.item.satuan ? ' ' + retur.item.satuan : ''" />
                <label class="form-label-custom">Keterangan</label>
                <InputText class="w-100" v-model="retur.keterangan" placeholder="Contoh: pasien pulang / obat dihentikan" />
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text p-button-secondary" @click="showRetur=false" />
                <Button label="Simpan Retur" icon="pi pi-save" class="p-button-warning" @click="simpan_retur()" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: HABIS PAKAI OBAT MULTI-DOSIS ===== -->
        <Dialog header="Habis Pakai Obat Multi-dosis" v-model:visible="showHabisPakai" :style="{ width: '35vw' }"
            :breakpoints="{ '768px': '100vw' }" :modal="true">
            <div v-if="habis_pakai.item" class="p-2">
                <div class="mb-2"><b>{{ habis_pakai.item.nama_obat }}</b></div>
                <div class="mb-3 text-muted">
                    Sisa stok: {{ $numeral(habis_pakai.item.sisa, '0,0.[00]') }} {{ habis_pakai.item.satuan }},
                    sudah {{ habis_pakai.item.jumlah_pemberian }}&times; pemberian.
                    Kemasan yang ditandai habis pakai keluar dari stok pasien.
                </div>
                <label class="form-label-custom">Jumlah Kemasan Habis <span class="text-danger">*</span></label>
                <InputNumber class="w-100 mb-3" inputClass="w-100" v-model="habis_pakai.qty" :min="0" :max="habis_pakai.item.sisa"
                    :minFractionDigits="0" :maxFractionDigits="2" :suffix="habis_pakai.item.satuan ? ' ' + habis_pakai.item.satuan : ''" />
                <label class="form-label-custom">Keterangan</label>
                <InputText class="w-100" v-model="habis_pakai.keterangan" placeholder="Contoh: botol habis / kedaluwarsa setelah dibuka" />
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" class="p-button-text p-button-secondary" @click="showHabisPakai=false" />
                <Button label="Simpan" icon="pi pi-save" class="p-button-success" :loading="isLoading" @click="simpan_habis_pakai()" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: KARTU STOK OBAT PASIEN ===== -->
        <Dialog :header="'Kartu Stok: ' + kartu_label" v-model:visible="showKartu" :style="{ width: '70vw' }"
            :breakpoints="{ '768px': '100vw' }" :modal="true">
            <table class="table table-bordered table-sm stok-table">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Transaksi</th>
                        <th>Batch</th>
                        <th class="text-center">Masuk</th>
                        <th class="text-center">Keluar</th>
                        <th class="text-center">Saldo</th>
                        <th>Referensi</th>
                        <th>Ruangan</th>
                        <th>User</th>
                        <th>Keterangan</th>
                        <th class="text-center" style="width:60px">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in kartu_rows" :key="row.ID">
                        <td>{{ row.TANGGAL_TRANS }}</td>
                        <td>{{ row.CAPTION }}</td>
                        <td>{{ row.SUB_BARCODE }}</td>
                        <td class="text-center text-success">{{ row.JENIS_TRANS === 'IN' ? $numeral(row.QTY, '0,0.[00]') : '' }}</td>
                        <td class="text-center text-danger">{{ row.JENIS_TRANS === 'OUT' ? $numeral(row.QTY, '0,0.[00]') : '' }}</td>
                        <td class="text-center font-weight-bold">{{ $numeral(row.SALDO, '0,0.[00]') }}</td>
                        <td>{{ row.REFF_NUMBER }}</td>
                        <td>{{ row.RUANGAN }}</td>
                        <td>{{ row.USER_ID }}</td>
                        <td>{{ row.KETERANGAN }}</td>
                        <td class="text-center">
                            <!-- Satu habis pakai bisa beberapa baris (per batch): tombol di baris pertama saja -->
                            <Button v-if="bisa_batal_habis_pakai(row, i)" icon="pi pi-times" class="p-button-text p-button-danger p-button-sm"
                                v-tooltip.top="'Batalkan habis pakai'" @click="batal_habis_pakai(row)" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" class="p-button-text" @click="showKartu=false" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: INPUT PEMBERIAN OBAT ===== -->
        <Dialog header="Input Catatan Pemberian Obat" v-model:visible="showInputCairan"
            :style="{ width: '60vw' }" :breakpoints="{ '768px': '100vw' }"
            :contentStyle="{ minHeight: '420px' }" :modal="true" :draggable="false">
            <div class="p-3">
                <div class="row">
                    <!-- Waktu Pemberian -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Waktu Pemberian <span class="text-danger">*</span></label>
                        <DatePicker v-model="form.startdate" showTime hourFormat="24" style="width:100%" placeholder="Pilih tanggal & waktu" />
                    </div>

                         <!-- Dosis -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Dosis Pemakaian <span class="text-danger">*</span></label>
                        <InputText class="w-100" :placeholder="is_multi_dosis ? 'Takaran per pemberian, contoh: 5 ml / 1 tetes / 1 oles' : 'Contoh: 500 mg'"
                            v-model="form.dosis" />
                    </div>
                    <!-- Nama Obat -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Nama Obat <span class="text-danger">*</span></label>
                        <Select
                            class="w-100"
                            v-model="form.nama_obat"
                            :options="obat_options"
                            @change="onObatSelect($event)"
                            placeholder="Pilih atau ketik nama obat"
                            :editable="true"
                            :filter="true"
                        >
                            <!-- Tandai obat multi-dosis & sisa stok resep di ruangan -->
                            <template #option="slotProps">
                                <div class="d-flex align-items-center justify-content-between w-100" style="gap:8px">
                                    <span>{{ slotProps.option }}</span>
                                    <span v-if="stok_by_nama[slotProps.option]" class="text-nowrap">
                                        <span v-if="stok_by_nama[slotProps.option].multi_dosis" class="badge badge-info mr-1">Multi-dosis</span>
                                        <small class="text-muted">
                                            sisa {{ $numeral(stok_by_nama[slotProps.option].sisa, '0,0.[00]') }} {{ stok_by_nama[slotProps.option].satuan }}
                                        </small>
                                    </span>
                                </div>
                            </template>
                        </Select>
                        <small v-if="is_multi_dosis" class="d-block mt-1 text-info">
                            <i class="pi pi-info-circle mr-1"></i>Obat multi-dosis &mdash; sudah {{ selected_stok.jumlah_pemberian }}&times; diberikan dari kemasan ini.
                        </small>
                    </div>

                    <!-- Jumlah diberikan (mengurangi stok resep) -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">
                            Jumlah Diberikan <span v-if="form.barcode && !is_multi_dosis" class="text-danger">*</span>
                        </label>
                        <InputNumber v-if="!is_multi_dosis" class="w-100" inputClass="w-100" v-model="form.qty" :min="0"
                            :minFractionDigits="0" :maxFractionDigits="2" :disabled="!form.barcode"
                            :suffix="form.satuan ? ' ' + form.satuan : ''" placeholder="0" />
                        <div v-else class="multi-dosis-info">
                            <i class="pi pi-info-circle mr-1"></i>
                            Obat multi-dosis: diberikan dari kemasan yang sedang dipakai, stok tidak dipotong.
                            Tulis takaran di <b>Dosis Pemakaian</b> (mis. 5 ml). Tandai <b>Habis pakai</b> di menu Stok Obat saat kemasan habis.
                        </div>
                        <small v-if="selected_stok" :class="selected_stok.sisa > 0 ? 'text-muted' : 'text-danger'">
                            Sisa stok: {{ $numeral(selected_stok.sisa, '0,0.[00]') }} {{ selected_stok.satuan }}
                            (diterima {{ $numeral(selected_stok.diterima, '0,0.[00]') }})
                        </small>
                        <small v-else-if="form.nama_obat" class="text-muted">Obat di luar stok resep ruangan, stok tidak dihitung.</small>
                        <small v-if="belum_diterima.length > 0" class="d-block text-warning">
                            Ada {{ belum_diterima.length }} obat dari farmasi yang belum diterima (menu Stok Obat).
                        </small>
                    </div>

                    <!-- Frekuensi -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Frekuensi</label>
                        <InputText class="w-100" placeholder="Contoh: 3x sehari" v-model="form.frekwensi" />
                    </div>
                    <!-- Rute -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Rute Pemberian <span class="text-danger">*</span></label>
                        <Select class="w-100" v-model="form.ruteselected" filter :options="rute" placeholder="Pilih rute..." />
                    </div>
                    <!-- High Alert -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label-custom">Obat High Alert</label>
                        <Select class="w-100" v-model="form.obat_dc_selected" :options="obat_dc" placeholder="Pilih..." />
                    </div>
                    <!-- Keterangan -->
                    <div class="col-12 mb-1">
                        <label class="form-label-custom">Keterangan</label>
                        <InputText class="w-100" placeholder="Keterangan tambahan (opsional)" v-model="form.keterangan" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Batal"  icon="pi pi-times" class="p-button-text p-button-secondary" @click="showInputCairan=false" />
                <Button label="Simpan" icon="pi pi-save"  class="p-button-success" @click="simpan_pemberian_obat()" />
            </template>
        </Dialog>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import InputMask from 'primevue/inputmask';
    import { EventBus } from '../bus';
        import QrcodeVue from 'qrcode.vue';
        import {
        FilterMatchMode
    } from 'primevue/api';
    export default {
        components: {
            Loading,
            QrcodeVue
        },
        props: ['datapasien'],
        data() {
            return {
                confirmGroup: 'FormPemberianObatComponent-' + Math.random().toString(36).slice(2, 11),
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    ruteselected: null,
                    obat_dc_selected:null,
                    keterangan: '',
                    dosis: '',
                    nama_obat: '',
                    barcode: '',
                    qty: null,
                    satuan: '',
                    nama_ruangan: '',
                    frekwensi: ''
                },
                isLoading: false,
                fullPage: true,
                mode_otto:0,
                showInputCairan: false,
                rute: [
                    'ORAL',
                    'INJEKSI',
                    'INTRAVENA (IV)',
                    'INTRAMUSKULAR (IM)',
                    'SUBKUTAN (SC)',
                    'INTRAKUTAN (IC)',
                    'SUBLINGUAL',
                    'BUKAL',
                    'REKTAL',
                    'TOPIKAL',
                    'INHALASI',
                    'TETES MATA',
                    'TETES TELINGA',
                    'TETES HIDUNG',
                    'INTRANASAL',
                    'VAGINAL',
                    'TRANSDERMAL',
                ],
                obat_dc:['YA','TIDAK'],
                filters1: {},
                filters2: {},
                showOtorisasi:false,
                showHapusOto: false,
                hapus_oto: { id: null, label: '', username: '', password: '', alasan: '' },
                id_inputan:0,
                riwayat_obat: [],
                viewMode: 'list',
                viewModeOptions: [
                    { label: 'List', value: 'list', icon: 'pi pi-list' },
                    { label: 'Crosstab', value: 'crosstab', icon: 'pi pi-table' },
                    { label: 'Stok Obat', value: 'stok', icon: 'pi pi-box' },
                ],
                showCellDetail: false,
                selectedCellEntries: [],
                selectedCellLabel: '',
                // Stok obat resep pasien di ruangan (t_stock_card_pasien)
                stok_pasien: { stok: [], belum_diterima: [], kartu: [] },
                showRetur: false,
                retur: { item: null, qty: null, keterangan: '' },
                showHabisPakai: false,
                habis_pakai: { item: null, qty: null, keterangan: '' },
                showKartu: false,
                kartu_barcode: '',
                kartu_label: ''

            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getpemberian_obat();
            this.initFilters1()
            this.initFilters2()
            this.get_data_kco()
        },
        computed: {
            // Stok obat resep pasien di ruangan per BARCODE (dari kartu stok pasien)
            stok_obat() {
                return (this.stok_pasien.stok || []).map(x => ({
                    barcode: x.BARCODE,
                    nama_obat: x.NAMABARANG,
                    satuan: x.SATUAN,
                    diterima: parseFloat(x.DITERIMA) || 0,
                    diberikan: parseFloat(x.DIBERIKAN) || 0,
                    habis_pakai: parseFloat(x.HABIS_PAKAI) || 0,
                    diretur: parseFloat(x.DIRETUR) || 0,
                    sisa: parseFloat(x.SALDO) || 0,
                    // Multi-dosis (sirup, salep, tetes, ...): pemberian tidak memotong stok
                    multi_dosis: x.MULTI_DOSIS == 1,
                    jumlah_pemberian: parseInt(x.JUMLAH_PEMBERIAN) || 0
                }));
            },
            stok_by_nama() {
                const map = {};
                this.stok_obat.forEach(x => { map[x.nama_obat] = x; });
                return map;
            },
            is_multi_dosis() {
                return !!(this.selected_stok && this.selected_stok.multi_dosis);
            },
            // REFF habis pakai yang sudah dibatalkan
            reff_batal_habis_pakai() {
                return new Set((this.stok_pasien.kartu || [])
                    .filter(x => x.CAPTION === 'BATAL HABIS PAKAI').map(x => x.REFF_NUMBER));
            },
            belum_diterima() {
                return this.stok_pasien.belum_diterima || [];
            },
            retur_list() {
                return this.stok_pasien.retur || [];
            },
            kartu_rows() {
                return (this.stok_pasien.kartu || []).filter(x => x.BARCODE === this.kartu_barcode);
            },
            selected_stok() {
                if (!this.form.barcode) return null;
                return this.stok_obat.find(x => x.barcode === this.form.barcode) || null;
            },
            // Hanya obat resep yang masih punya sisa stok
            obat_options() {
                return this.stok_obat
                    .filter(x => x.sisa > 0 || x.nama_obat === this.form.nama_obat)
                    .map(x => x.nama_obat);
            },
            crosstabDates() {
                const set = new Set();
                (this.fact || []).forEach(r => {
                    if (r.waktu) set.add(this.dateOnly(r.waktu));
                });
                return Array.from(set).sort();
            },
            crosstabRows() {
                const map = {};
                (this.fact || []).forEach(r => {
                    const obat = r.nama_obat || '-';
                    if (!map[obat]) map[obat] = {};
                    const d = this.dateOnly(r.waktu);
                    if (!map[obat][d]) map[obat][d] = [];
                    map[obat][d].push(r);
                });
                return Object.keys(map).sort().map(obat => ({ nama_obat: obat, cells: map[obat] }));
            }
        },
        methods: {
            async get_stok_obat_pasien() {
                await axios.post('/get_stok_obat_pasien', { noregister: this.datapasien.NOPENDAFTARAN })
                    .then(response => {
                        const res = response.data && response.data.response;
                        this.stok_pasien = res ? res : { stok: [], belum_diterima: [], kartu: [] };
                    })
                    .catch(error => console.log(error));
            },
            call_retur(item) {
                this.retur = { item: item, qty: item.sisa, keterangan: '' };
                this.showRetur = true;
            },
            async simpan_retur() {
                const item = this.retur.item;
                const qty = parseFloat(this.retur.qty) || 0;
                if (qty <= 0 || qty > item.sisa) {
                    this.open('warning', `Jumlah retur harus antara 0 dan sisa stok (${item.sisa})`);
                    return;
                }
                this.isLoading = true;
                await axios.post('/retur_obat_pasien', {
                    noregister: this.datapasien.NOPENDAFTARAN,
                    nama_ruangan: this.datapasien.POLI,
                    barcode: item.barcode,
                    nama_obat: item.nama_obat,
                    satuan: item.satuan,
                    qty: qty,
                    keterangan: this.retur.keterangan
                })
                    .then(response => {
                        const meta = response.data.metadata || {};
                        this.open(meta.code == 200 ? 'success' : 'warning', meta.message);
                        if (meta.code == 200) this.showRetur = false;
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
                this.get_stok_obat_pasien();
            },
            call_habis_pakai(item) {
                this.habis_pakai = { item: item, qty: Math.min(1, item.sisa), keterangan: '' };
                this.showHabisPakai = true;
            },
            async simpan_habis_pakai() {
                const item = this.habis_pakai.item;
                const qty = parseFloat(this.habis_pakai.qty) || 0;
                if (qty <= 0 || qty > item.sisa) {
                    this.open('warning', `Jumlah kemasan habis harus antara 0 dan sisa stok (${item.sisa})`);
                    return;
                }
                this.isLoading = true;
                await axios.post('/habis_pakai_obat_pasien', {
                    noregister: this.datapasien.NOPENDAFTARAN,
                    nama_ruangan: this.datapasien.POLI,
                    barcode: item.barcode,
                    nama_obat: item.nama_obat,
                    satuan: item.satuan,
                    qty: qty,
                    keterangan: this.habis_pakai.keterangan
                })
                    .then(response => {
                        const meta = response.data.metadata || {};
                        this.open(meta.code == 200 ? 'success' : 'warning', meta.message);
                        if (meta.code == 200) this.showHabisPakai = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.open('error', 'Gagal menyimpan habis pakai');
                    })
                    .finally(() => this.isLoading = false);
                this.get_stok_obat_pasien();
            },
            bisa_batal_habis_pakai(row, i) {
                if (row.CAPTION !== 'HABIS PAKAI' || this.reff_batal_habis_pakai.has(row.REFF_NUMBER)) return false;
                const prev = this.kartu_rows[i - 1];
                return !(prev && prev.CAPTION === 'HABIS PAKAI' && prev.REFF_NUMBER === row.REFF_NUMBER);
            },
            batal_habis_pakai(row) {
                this.$confirm.require({
                    group: this.confirmGroup,
                    message: `Batalkan habis pakai ${row.NAMABARANG} (${row.TANGGAL_TRANS})? Kemasan kembali ke stok pasien di ruangan.`,
                    header: 'Batalkan Habis Pakai',
                    icon: 'pi pi-exclamation-triangle',
                    accept: async () => {
                        this.isLoading = true;
                        await axios.post('/batal_habis_pakai_obat_pasien', { reff_number: row.REFF_NUMBER })
                            .then(response => {
                                const meta = response.data.metadata || {};
                                this.open(meta.code == 200 ? 'success' : 'warning', meta.message);
                            })
                            .catch(error => {
                                console.log(error);
                                this.open('error', 'Gagal membatalkan habis pakai');
                            })
                            .finally(() => this.isLoading = false);
                        this.get_stok_obat_pasien();
                    }
                });
            },
            status_retur_label(r) {
                if (r.STATUS === 'MENUNGGU') return 'Menunggu diproses farmasi';
                if (r.STATUS === 'DITERIMA') return 'Diterima farmasi';
                if (r.STATUS === 'DITOLAK') return r.TINDAK_LANJUT === 'RUSAK' ? 'Ditolak (obat rusak)' : 'Ditolak, kembali ke ruangan';
                if (r.STATUS === 'BATAL') return 'Dibatalkan';
                return r.STATUS;
            },
            status_retur_class(status) {
                return {
                    MENUNGGU: 'badge-warning',
                    DITERIMA: 'badge-success',
                    DITOLAK: 'badge-danger',
                    BATAL: 'badge-secondary'
                }[status] || 'badge-secondary';
            },
            batal_retur(r) {
                this.$confirm.require({
                    group: this.confirmGroup,
                    message: `Batalkan retur ${r.NO_RETUR} (${r.NAMABARANG})? Obat kembali ke stok pasien di ruangan.`,
                    header: 'Batalkan Retur',
                    icon: 'pi pi-exclamation-triangle',
                    accept: async () => {
                        this.isLoading = true;
                        await axios.post('/batal_retur_obat_pasien', { id_retur: r.ID })
                            .then(response => {
                                const meta = response.data.metadata || {};
                                this.open(meta.code == 200 ? 'success' : 'warning', meta.message);
                            })
                            .catch(error => console.log(error))
                            .finally(() => this.isLoading = false);
                        this.get_stok_obat_pasien();
                    }
                });
            },
            buka_kartu_stok(item) {
                this.kartu_barcode = item.barcode;
                this.kartu_label = item.nama_obat;
                this.showKartu = true;
            },
            dateOnly(waktu) {
                return waktu ? String(waktu).substring(0, 10) : '';
            },
            timeOnly(waktu) {
                return waktu ? String(waktu).substring(11, 16) : '';
            },
            formatDateHeader(d) {
                if (!d) return '-';
                const [y, m, day] = d.split('-');
                return `${day}/${m}/${y}`;
            },
            buka_detail_sel(nama_obat, date, entries) {
                this.selectedCellEntries = entries;
                this.selectedCellLabel = `${nama_obat} - ${this.formatDateHeader(date)}`;
                this.showCellDetail = true;
            },
            fetchData() {
                var currentDate = new Date();
            },
            call_form() {
                this.showInputCairan = true;
            },
            async get_data_kco() {
                this.isLoading = true;
                this.form.NOREGISTER = this.datapasien.NOPENDAFTARAN;
                await axios.post('/get_data_kco', this.form)
                    .then(response => {
                        this.riwayat_obat = response.data.response;
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.isLoading = false);
            },
            initFilters1() {
                this.filters1 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            initFilters2() {
                this.filters2 = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    }
                }
            },
            call_oto(soapid,mode_otto)
            {
                this.id_inputan = soapid;
                this.mode_otto = mode_otto
                this.showOtorisasi = true;
            },
            // Hapus pemberian: konfirmasi dulu, lalu otorisasi user yang menghapus (username + password)
            hapus_line(id)
            {
                const item = (this.fact || []).find(x => x.id === id) || {};
                const potong_stok = item.barcode && Number(item.qty) > 0;
                const jumlah = potong_stok ? ` (${this.$numeral(item.qty, '0,0.[00]')} ${item.satuan || ''})` : '';
                this.$confirm.require({
                    group: this.confirmGroup,
                    message: `Batalkan pemberian ${item.nama_obat || 'obat'}${jumlah} pada ${item.waktu || '-'}?` +
                        (potong_stok ? ' Jumlah obat kembali ke stok pasien di ruangan.' : ''),
                    header: 'Batalkan Pemberian Obat',
                    icon: 'pi pi-exclamation-triangle',
                    acceptLabel: 'Ya',
                    rejectLabel: 'Tidak',
                    acceptClass: 'p-button-danger',
                    accept: () => {
                        this.hapus_oto = { id: id, label: `${item.nama_obat || ''}${jumlah}`, username: '', password: '', alasan: '' };
                        this.showHapusOto = true;
                    }
                });
            },
            async simpan_hapus_oto()
            {
                const o = this.hapus_oto;
                if (!o.username || !o.password) {
                    this.open('warning', 'Username dan password otorisasi wajib diisi');
                    return;
                }
                if (!o.alasan || !o.alasan.trim()) {
                    this.open('warning', 'Alasan pembatalan wajib diisi');
                    return;
                }
                this.isLoading = true
                await axios.post('/hapus_pemberian_obat', {
                    id: o.id,
                    noregister: this.datapasien.NOPENDAFTARAN,
                    username: o.username,
                    password: o.password,
                    alasan: o.alasan.trim()
                })
                    .then(response => {
                        const meta = response.data.metadata || {};
                        if (meta.code == 200) {
                            this.open('success', meta.message);
                            this.showHapusOto = false;
                            this.clear_data();
                            this.getpemberian_obat();
                        } else {
                            this.hapus_oto.password = '';
                            this.open('warning', meta.message || 'Gagal menghapus');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.open('error', error.message)
                    })
                    .finally(() => this.isLoading = false)
            },

            clear_data()
            {
                this.form.dosis ="";
                this.form.frekwensi ="";
                this.form.nama_obat ="";
                this.form.barcode ="";
                this.form.qty = null;
                this.form.satuan ="";
                this.form.keterangan ="";
            },
            handleValue(value) {
                this.responvalue = value; // Update the parent data with the value from the child
                console.log(this.responvalue);
                if(this.responvalue==200)
                {
                    this.showOtorisasi = false;
                    this.getpemberian_obat();
                }
            },
            open(type, message, title = '') {
                EventBus.$emit('show-alert', { type, title, message });
            },
            async simpan_pemberian_obat() {
                this.sync_stok_obat();
                if (this.is_multi_dosis) {
                    // Multi-dosis: stok tidak dipotong per pemberian, cukup pastikan kemasan masih ada
                    this.form.qty = 0;
                    if (this.selected_stok.sisa <= 0) {
                        this.open('warning', `Stok ${this.form.nama_obat} di ruangan sudah habis / ditandai habis pakai`);
                        return;
                    }
                } else if (this.form.barcode) {
                    const qty = parseFloat(this.form.qty) || 0;
                    if (qty <= 0) {
                        this.open('warning', 'Jumlah obat yang diberikan wajib diisi');
                        return;
                    }
                    if (this.selected_stok && qty > this.selected_stok.sisa) {
                        this.open('warning', `Jumlah melebihi sisa stok ${this.form.nama_obat} (sisa ${this.selected_stok.sisa} ${this.selected_stok.satuan || ''})`);
                        return;
                    }
                }
                this.isLoading = true
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                this.form.nama_ruangan = this.datapasien.POLI;
                await axios.post('/simpan_pemberian_obat', this.form)
                    .then(response => {
                        if (response.data.metadata.code == 200) {
                            this.showInputCairan = false;
                            this.open('success', response.data.metadata.message);
                            this.form.qty = null;
                            this.getpemberian_obat();

                        } else {
                            this.open('warning', response.data.metadata.message);
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            filter_data(id)
            {
                const data_filter = this.fact.filter(x => x.id ===id);

                this.call_form()

                if(data_filter.length>0)
                {
                    this.form.ruteselected= data_filter[0].rute;
                    this.form.obat_dc_selected= data_filter[0].obat_dc;
                    this.form.keterangan= data_filter[0].keterangan;
                    this.form.dosis= data_filter[0].dosis;
                    this.form.nama_obat= data_filter[0].nama_obat;
                    this.form.frekwensi= data_filter[0].frekwensi;
                    this.sync_stok_obat();
                    this.form.qty = this.form.barcode && !this.is_multi_dosis ? (parseFloat(data_filter[0].qty) || null) : null;
                }

            },
            // Cocokkan nama obat di form dengan item resep (barcode & satuan) untuk perhitungan stok
            sync_stok_obat(nama_obat) {
                const nama = nama_obat !== undefined ? nama_obat : this.form.nama_obat;
                const stok = this.stok_obat.find(x => x.nama_obat === nama);
                this.form.barcode = stok ? stok.barcode : '';
                this.form.satuan = stok ? stok.satuan : '';
                if (!stok) this.form.qty = null;
            },
            onObatSelect(event) {
                const items = (this.riwayat_obat && this.riwayat_obat.sub_item) ? this.riwayat_obat.sub_item : [];
                const name = event.value;
                this.sync_stok_obat(name);

                // Format tanggal dari form.startdate ke "YYYY-MM-DD"
                let selectedDate = null;
                if (this.form.startdate) {
                    const d = new Date(this.form.startdate);
                    selectedDate = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                }

                // Cari berdasarkan nama obat + tanggal yang dipilih
                let matched = selectedDate
                    ? items.find(x => x.NAMABARANG === name && x.DT_ONLY === selectedDate)
                    : null;

                // Fallback: entry pertama untuk nama obat tsb yang punya REMARK_ITEM
                if (!matched || !matched.REMARK_ITEM) {
                    matched = items.find(x => x.NAMABARANG === name && x.REMARK_ITEM);
                }

                this.form.dosis = (matched && matched.REMARK_ITEM) ? matched.REMARK_ITEM : '';
            },
            async getpemberian_obat() {
                this.isLoading = true
                this.get_stok_obat_pasien();
                this.form.noregister = this.datapasien.NOPENDAFTARAN
                await axios.post('/getpemberian_obat', this.form)
                    .then(response => {
                        this.fact = response.data.response;
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }

        },
    }

</script>

<style scoped>
.crosstab-table thead th,
.stok-table thead th {
    background: #f8f9fa;
    text-align: center;
    vertical-align: middle;
}
.terima-box {
    background: #fff8e1;
}
.multi-dosis-info {
    background: #e0f2fe;
    border: 1px solid #bae6fd;
    border-radius: 6px;
    padding: .45rem .7rem;
    font-size: .85rem;
}
.crosstab-cell {
    vertical-align: middle;
}
.crosstab-cell-filled {
    cursor: pointer;
}
.crosstab-cell-filled:hover {
    background: #e3f2fd;
}
.crosstab-badge {
    display: inline-block;
    margin: 1px 2px;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: .75rem;
    font-weight: 600;
}
.crosstab-badge-verified {
    background: #d4edda;
    color: #155724;
}
.crosstab-badge-pending {
    background: #fff3cd;
    color: #856404;
}
</style>
