<template>
    <section class="content">
        <div class="container-fluid">

            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <div class="card">
                <div class="card-body">
                    <Toolbar class="mb-4">
                        <template #start>
                            <SelectButton v-model="SelectButton" :options="kategories" optionLabel="brand">
                                <template #option="slotProps">
                                    <div class="car-option" @click="handleClick(slotProps.option.NAMA_KATEGORI)">
                                        <div>{{slotProps.option.NAMA_KATEGORI}}</div>
                                    </div>
                                </template>
                            </SelectButton>
                        </template>
                        <template #end>
                            <!-- <Button label="Reload"  @click="getdata_master()" style="height: 2.5em;" icon="pi pi-refresh" class="p-button-help" /> -->
                        </template>
                    </Toolbar>

                </div>
                <div class="card-footer">
                    <Button type="button" icon="pi pi-plus" @click="showaddtomyloc"
                        label="Tambahkan barang ke lokasi saya" class="p-button-success p-button-link"></Button />
                </div>
            </div>
            <ConfirmDialog></ConfirmDialog>

            <span v-if="show_detil==false">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Persediaan</h3>
                    </div>
                    <div class="card-body p-10">
                        <DataTable fixTableHead :value="fact.response" :rowHover="true" columnResizeMode="fit"
                            selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm"
                            responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                            v-model:filters="filters1" :rowsPerPageOptions="[10,20,50,100,200]">
                            <template #header>
                                <div class="table-header">
                                    <div class="row">
                                        <div class="col-md-7 col-sm-7 col-4 mt-0">
                                            <span class="p-input-icon-left">
                                                <i class="pi pi-search" />
                                                <InputText v-model="filters1['global'].value" placeholder="Pencarian" />
                                                <!--
                                                <Select v-model="lokasi_selected" :options="pilih_lokasi"
                                                    optionLabel="name" keys="name" @change="chagelocation"
                                                    placeholder="Hanya pada Lokasi Saya" /> -->
                                                <a class="btn btn-primary" href="/add-new-item">
                                                    <i class="fas fa-plus">
                                                    </i>
                                                    Item Baru
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loading>
                                Loading customers data. Please wait.
                            </template>
                            <Column bodyStyle="text-align: center" header="Detils">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-search"
                                        @click="get_detil_information(slotProps.data)" class="p-button-success"
                                        style="margin-right: .5em"></Button />
                                </template>
                            </Column>
                            <Column bodyStyle="text-align: center" header="BREAKDOWN">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-list"
                                        @click="call_break_down_data(13,1,slotProps.data)" class="p-button-danger"
                                        style="margin-right: .5em"></Button />
                                </template>
                            </Column>
                            <Column field="BARCODE" header="BARCODE"></Column>
                            <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->
                            <Column field="NAMA" :sortable="true" header="NAMA" :styles="{'width':'10em'}">
                                <template #body="slotProps">
                                    {{(slotProps.data.NAMA)}} <Tag v-if="slotProps.data.ARSIPKAN == 1"
                                        value="Tidak aktiv" severity="warning" icon="pi pi-times-circle">
                                    </Tag>
                                </template>
                            </Column>
                            <Column field="KATEGORI" :sortable="true" header="KATEGORI"></Column>
                            <Column field="QUNATITY" :sortable="true" header="STOCK" :styles="{'text-align':'right'}">
                                <template #body="slotProps">
                                    {{formatCurrency(slotProps.data.QUNATITY)}}
                                </template>
                            </Column>
                            <Column field="SATUAN" :sortable="true" header="SATUAN"></Column>
                            <!-- <Column field="HARGABELI" :sortable="true" header="HARGA BELI" :styles="{'text-align':'right'}">
                                <template #body="slotProps">
                                {{formatCurrency(slotProps.data.HARGABELI)}}
                                </template>
                            </Column> -->
                            <Column field="PERSEDIAAN" :sortable="true" header="PERSEDIAAN"
                                :styles="{'text-align':'right'}">
                                <template #body="slotProps">
                                    {{formatCurrency(slotProps.data.TOTAL_ASET)}}
                                </template>
                            </Column>
                            <!-- <Column field="HARGAJUAL" :sortable="true" header="HARGA JUAL"
                                :styles="{'text-align':'right'}">
                                <template #body="slotProps">
                                {{formatCurrency(slotProps.data.HARGAJUAL)}}
                                </template>

                            </Column> -->
                            <!-- <Column field="LOKASI" :sortable="true" header="LOKASI"></Column> -->
                            <!-- <Column headerStyle="width: 8em" bodyStyle="text-align: center" header="ASIPKAN">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-bookmark-fill"
                                        @click="arsipkan_item(slotProps.data,2,1)"
                                        class="p-button-warning p-button-text"></Button />
                                </template>
                            </Column> -->
                            <Column headerStyle="width: 8em" bodyStyle="text-align: center" header="RIWAYAT">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-paperclip" @click="openBasic(slotProps.data)"
                                        class="p-button-primary p-button-text"></Button />
                                </template>
                            </Column>
                            <Column field="STOCKMINIMUM" :sortable="true" header="STOCKMINIMUM"
                                :styles="{'text-align':'right'}">
                            </Column>
                            <Column header="SATU SEHAT">
                                <template #body='slotProps'>
                                    <Button type="button" icon="pi pi-list" @click="getTextParam(slotProps.data,1)"
                                        label="KFA" class="p-button-danger"
                                        style="margin-right: .5em; background-color: darkcyan;"></Button />
                                </template>
                            </Column>
                            <Column field="KFA_CODE_MASTER" header="KODE KFA">
                            </Column>
                            <ColumnGroup type="footer">
                                <Row>
                                    <Column footer="TOTAL PERSEDIAAN:" :colspan="7"
                                        :footerStyle="{'text-align':'right'}" />
                                    <Column :footer="formatCurrency(fact.summary)"
                                        :footerStyle="{'text-align':'right'}" />
                                </Row>
                            </ColumnGroup>
                        </DataTable>
                    </div>
                </div>
            </span>

            <div class="card detail-card" v-show="show_detil">
                <!-- Header -->
                <div class="card-header detail-header">
                    <div class="detail-header-left">
                        <Button icon="pi pi-arrow-left" text rounded @click="show_detil=false"
                            v-tooltip.right="'Kembali ke daftar'" />
                        <div class="detail-title-block">
                            <span class="detail-title">Detail Persediaan</span>
                            <span class="detail-subtitle" v-if="data_detils.NAMA">{{ data_detils.NAMA }}</span>
                        </div>
                    </div>
                    <div class="detail-header-right">
                        <Chip :label="data_detils.IDBARANG || '-'" icon="pi pi-barcode" class="chip-barcode" />
                        <Tag v-if="data_detils.ARSIPKAN == 1" value="Non Aktif" severity="warning" icon="pi pi-ban" />
                        <Tag v-else value="Aktif" severity="success" icon="pi pi-check-circle" />
                    </div>
                </div>

                <div class="card-body">
                    <!-- Seksi: Informasi Dasar -->
                    <div class="detail-section-title">
                        <i class="pi pi-info-circle"></i> Informasi Dasar
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-6 col-12">
                            <label class="form-label fw-semibold">Nama Persediaan</label>
                            <InputText class="w-100" v-model="data_detils.NAMA" placeholder="Nama persediaan" />
                        </div>
                        <div class="col-md-3 col-6">
                            <label class="form-label fw-semibold">Kategori</label>
                            <Select class="w-100" v-model="form.kategori_selected" :options="kategories"
                                @change="dropdonwOnchange" optionLabel="NAMA_KATEGORI" placeholder="Pilih kategori" />
                        </div>
                        <div class="col-md-3 col-6">
                            <label class="form-label fw-semibold">Satuan</label>
                            <Select class="w-100" v-model="form.satuan_selected" :filter="true"
                                @change="changesatuandata" :options="satuan_data" optionLabel="SATUAN"
                                placeholder="Pilih satuan" />
                        </div>
                        <div class="col-md-6 col-12"
                            v-if="!['OBAT-OBATAN','BMHP','BHP NON MEDIS'].includes(form.kategori_selected?.NAMA_KATEGORI)">
                            <label class="form-label fw-semibold">Kandungan</label>
                            <InputText class="w-100" v-model="data_detils.KANDUNGAN" placeholder="Kandungan" />
                        </div>
                        <div class="col-md-6 col-12"
                            v-if="!['OBAT-OBATAN','BMHP','BHP NON MEDIS'].includes(form.kategori_selected?.NAMA_KATEGORI)">
                            <label class="form-label fw-semibold">Grouping</label>
                            <Select class="w-100" v-model="form.data_grouping" :filter="true"
                                @change="changegrouping" :options="data_grouping" optionLabel="GROUPING"
                                placeholder="Pilih grouping" />
                        </div>
                    </div>

                    <!-- Seksi: Pengaturan -->
                    <div class="detail-section-title">
                        <i class="pi pi-cog"></i> Pengaturan
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-4 col-6">
                            <label class="form-label fw-semibold">Potong Stock</label>
                            <Select class="w-100" v-model="form.potong_stock" :options="potong_stock"
                                @change="potong_stock_func" optionLabel="name" placeholder="Pilih" />
                        </div>
                        <div class="col-md-4 col-6">
                            <label class="form-label fw-semibold">Untuk Dijual</label>
                            <Select class="w-100" v-model="form.untuk_dijual" :filter="true" :options="untuk_dijual"
                                optionLabel="name" placeholder="Pilih" />
                        </div>
                    </div>

                    <!-- Seksi: Harga (non-obat) -->
                    <template v-if="!['OBAT-OBATAN','BMHP','BHP NON MEDIS'].includes(form.kategori_selected?.NAMA_KATEGORI)">
                        <div class="detail-section-title">
                            <i class="pi pi-dollar"></i> Harga
                        </div>
                        <div class="row g-3 mb-3">
                            <div class="col-md-4 col-6">
                                <label class="form-label fw-semibold">Harga Beli</label>
                                <InputNumber class="w-100" v-model="form.harga_beli_jasa" prefix="Rp "
                                    :minFractionDigits="2" :maxFractionDigits="2"
                                    :inputStyle="{ textAlign: 'right' }" />
                            </div>
                            <div class="col-md-4 col-6">
                                <label class="form-label fw-semibold">Harga Jual</label>
                                <InputNumber class="w-100" v-model="form.harga_jual_jasa" prefix="Rp "
                                    :minFractionDigits="2" :maxFractionDigits="2"
                                    :inputStyle="{ textAlign: 'right' }" />
                            </div>
                        </div>
                    </template>

                    <!-- Seksi: Sub Item (obat/bmhp) -->
                    <template v-if="['OBAT-OBATAN','BMHP','BHP NON MEDIS'].includes(form.kategori_selected?.NAMA_KATEGORI)">
                        <div class="detail-section-title">
                            <i class="pi pi-list"></i> Sub Item Persediaan
                            <Badge :value="String(details_items.length)" class="ml-2" />
                        </div>
                        <Accordion>
                            <AccordionTab header="Lihat / Edit Sub Item">
                                <div class="sub-item-card" v-for="(row, index) in details_items" :key="row.ID">
                                    <div class="sub-item-header">
                                        <div class="sub-item-title">
                                            <span class="sub-item-num">{{ index + 1 }}</span>
                                            <span>ID #{{ row.ID }} — {{ data_detils.NAMA }}</span>
                                        </div>
                                        <Tag :value="row.ARSIPKAN == 1 ? 'Non Aktif' : 'Aktif'"
                                            :severity="row.ARSIPKAN == 1 ? 'warning' : 'success'" />
                                    </div>
                                    <div class="sub-item-body">
                                        <div class="row g-2">
                                            <div class="col-md-3 col-6">
                                                <label class="form-label fw-semibold small">Persediaan (QTY)</label>
                                                <InputNumber class="w-100" v-model="row.QTY"
                                                    :minFractionDigits="2" :maxFractionDigits="2"
                                                    :inputStyle="{ textAlign: 'right' }" />
                                            </div>
                                            <div class="col-md-3 col-6">
                                                <label class="form-label fw-semibold small">Harga Beli</label>
                                                <InputNumber class="w-100" v-model="row.HARGA" prefix="Rp "
                                                    :minFractionDigits="2" :maxFractionDigits="2"
                                                    :inputStyle="{ textAlign: 'right' }" />
                                            </div>
                                            <div class="col-md-3 col-6">
                                                <label class="form-label fw-semibold small">Harga Jual</label>
                                                <InputNumber class="w-100" v-model="row.HARGAJUAL" prefix="Rp "
                                                    :minFractionDigits="2" :maxFractionDigits="2"
                                                    :inputStyle="{ textAlign: 'right' }" />
                                            </div>
                                            <div class="col-md-3 col-6">
                                                <label class="form-label fw-semibold small">Tgl. Expired</label>
                                                <Calendar class="w-100" v-model="row.TGL_EXPIRED" :showIcon="true"
                                                    view="date" dateFormat="dd/mm/yy" />
                                            </div>
                                            <div class="col-md-4 col-12">
                                                <label class="form-label fw-semibold small">Batch Number</label>
                                                <InputText class="w-100" v-model="row.BATCH_NUMBER" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sub-item-footer">
                                        <Button icon="pi pi-check" label="Update" size="small"
                                            @click="update_sub_item(row)" />
                                        <Button :label="arsipkanOrAktifkan(row)" icon="pi pi-bookmark-fill"
                                            size="small" text :severity="row.ARSIPKAN == 1 ? 'success' : 'warning'"
                                            @click="arsipkan_item(row, 1, index)" />
                                    </div>
                                </div>
                                <ScrollTop :threshold="500" icon="pi pi-arrow-up" />
                            </AccordionTab>
                        </Accordion>
                    </template>
                </div>

                <!-- Footer Actions -->
                <div class="card-footer detail-footer">
                    <Button label="Simpan Perubahan" icon="pi pi-save" @click="update_item_barang(data_detils)" />
                    <Button label="Non Aktifkan Semua" icon="pi pi-ban" severity="warning" outlined
                        @click="arsipkan_item(data_detils, 2, 0)" />
                </div>
            </div>
        </div>

        <Dialog header="Satu Sehat Browse" v-model:visible="show_kfa_form" :containerStyle="{width: '80vw'}"
            :modal="true">
            <div class="card">
                <div class="card-header">
                    <browse_kfa :msg=selectedText.NAMA :mode="mode_kfa" :param=selectedText>  </browse_kfa>
                </div>
                <div class="card-body">
                    <p>Testing Data</p>
                </div>
            </div>
        </Dialog>

        <Dialog :header=param_send.item_header v-model:visible="show_break_down" :containerStyle="{width: '80vw'}"
            :modal="true">

            <div class="card">
                <div class="card-body table-sm table-responsive p-0">
                    <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />
                    <DataTable fixTableHead :value="item_brekdown.response" :rowHover="true" columnResizeMode="fit"
                        selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm mt-4"
                        responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                        v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100,200]">
                        <template #header>

                            <div class="row">
                                <div class="col-md-6">
                                     <div class="table-header">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                        </span>
                                    </div>
                                </div>
                                 <div class="col-md-6 d-flex justify-content-end">
                                    <Select v-model="form.lokasi_param" style="width: 17em;" class="mr-2" :options="lokasi_arr"
                                        optionLabel="CAPION" @change="call_data_base_lokasi()" :filter="true" placeholder="FILTER BERDASARKAN LOKASI"
                                        :showClear="false" />
                                </div>
                            </div>

                            <!-- @change="getdata()" -->

                        </template>
                        <template #loading>
                            Loading customers data. Please wait.
                        </template>
                        <Column field="ID" header="ID">
                            <template #body='slotProps'>

                                <span class="p-input-icon-left">
                                    <i class="pi pi-tag" />
                                </span>


                            </template>
                        </Column>
                        <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->
                        <Column field="BARCODE" :sortable="true" header="BARCODE"></Column>
                        <Column field="SUB_BARCODE" :sortable="true" header="S BARCODE">
                            <template #body="slotProps">
                                <Button type="button" icon="pi pi-list" @click="getTextParam(slotProps.data,2)"
                                    :label="slotProps.data.SUB_BARCODE" class="p-button-danger"
                                    style="margin-right: .5em; background-color: darkcyan;" />
                                <Tag v-if="slotProps.data.ARSIPKAN == 1"
                                    value="Tidak aktiv" severity="warning" icon="pi pi-times-circle" />
                            </template>
                        </Column>
                        <!-- <Column field="NAMA" :sortable="true" header="NAMA"></Column> -->

                        <Column field="LOKASI" :sortable="true" header="LOKASI"></Column>
                        <Column field="QUNATITY" :sortable="true" style="background-color: azure;" header="QTY"
                            :styles="{'text-align':'right','background-color': 'beige'}"> </Column>
                        <Column field="SATUAN" :sortable="true" header="SATUAN"
                            :styles="{'text-align':'right','background-color': 'azure'}"> </Column>
                        <Column field="HARGABELI" :sortable="true" header="HARGABELI"
                            :styles="{'text-align':'right','background-color': 'beige'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.HARGABELI)}}
                            </template>
                        </Column>
                        <Column field="PERSEDIAAN" :sortable="true" header="PERSEDIAAN"
                            :styles="{'text-align':'right'}">
                            <template #body="slotProps">
                                {{formatCurrency(slotProps.data.PERSEDIAAN)}}
                            </template>
                        </Column>
                        <Column field="TGL_EXPIRED_DT" :sortable="true" header="EXP"></Column>
                        <Column field="BATCH_NUMBER" :sortable="true" header="BATCH_NUMBER"></Column>
                        <Column field="" :sortable="true" header="PABRIKAN">
                            <template #body="slotProps">
                                <!-- <p> {{ slotProps.data.PERSEDIAAN }}</p> -->

                                    <!-- <span v-if="pabrikan.SUB_BARCODE===slotProps.data.SUB_BARCODE">
                                        <p v-if="pabrikan?.NAMASUPLIER">{{ pabrikan.NAMASUPLIER }}</p>
                                        <p v-else>Loading supplier data...</p>
                                    </span> -->
                                {{ slotProps.data.NAMASUPLIER }}

                            </template>
                        </Column>
                        <Column field="KFA_CODE_SUB" header="KODE KFA">
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column footer="TOTAL PERSEDIAAN:" :colspan="7" :footerStyle="{'text-align':'right'}" />
                                <Column :footer="formatCurrency(item_brekdown.summary)"
                                    :footerStyle="{'text-align':'right'}" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </div>
            <template #footer>
                <!-- <Button label="No" icon="pi pi-times" @click="show_break_down=false" class="p-button-text" /> -->
                <Button label="Tutup" icon="pi pi-check" @click="show_break_down=false" autofocus />
            </template>
        </Dialog>

        <Dialog :header=param_send.item_header v-model:visible="displayBasic" :containerStyle="{width: '80vw'}"
            :modal="true">
            <div class="card" >
                <download-excel :data="card_stock" :fields="json_fields" name="kartu stock.xls">
                    <Button label="Download Excel" icon="pi pi-file-excel"
                        class="p-button-success p-button-sm" />
                </download-excel>
                <div class="card-body table-sm table-responsive p-0"  style="height: 700px;">
                    <Calendar v-model="param_send.startdate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal awal" style="width: 15em; z-index: 9999 " />
                    <Calendar v-model="param_send.enddate" class="text-sm" :showIcon="true" view="date"
                        dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                        aria-placeholder="Tanggal Akhir" style="width: 15em; z-index: 9999" />
                    <Button type="button" label="Cari" icon="pi pi-search" @click="getriwayat_card_stock()"
                        class="p-button" />
                    <ProgressBar v-show="isLoading" mode="indeterminate" style="height: .1em" />

                    <DataTable fixTableHead :value="card_stock" :rowHover="true" columnResizeMode="fit"
                        selectionMode="single" stripedRows sortMode="multiple" class="p-datatable-sm mt-4"
                        responsiveLayout="scroll" :resizableColumns="true" :paginator="true" :rows="10"
                        v-model:filters="filters2" :rowsPerPageOptions="[10,20,50,100,200]">
                        <template #header>

                            <div class="row">
                                <div class="col-md-6">
                                      <div class="table-header">
                                        <span class="p-input-icon-left">
                                            <i class="pi pi-search" />
                                            <InputText v-model="filters2['global'].value" placeholder="Pencarian" />
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6" style="text-align: right;">
                                       <div class="p-d-flex p-ai-center p-mb-2">
                                        <RadioButton v-model="selectedView" inputId="all" value="1" />
                                        <label for="all" class="p-ml-2 p-mr-3">PER BARCODE</label>

                                        <RadioButton v-model="selectedView" inputId="noHarga" value="2" />
                                        <label for="noHarga" class="p-ml-2 p-mr-3">PER SUBBARCODE</label>

                                    </div>

                                </div>
                            </div>
                        </template>
                        <template #loading>
                            Loading customers data. Please wait.
                        </template>
                        <Column field="ID" header="ID">
                            <template #body='slotProps'>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-tag" />
                                </span>
                            </template>
                        </Column>
                        <!-- <Column field="SUB_BARCODE" header="SUB_BARCODE"></Column> -->
                        <Column field="JENIS_TRANS"  header="TYPE" ></Column>
                        <Column field="CAPTION"  header="CAPTION"  ></Column>
                        <Column field="BARCODE"  header="BARCODE"></Column>
                        <Column field="SUB_BARCODE"  header="S BARCODE"></Column>
                        <Column field="LOKASI"  header="LOKASI"></Column>
                        <Column field="TANGGAL_TRANS"  header="TGL" :styles="{'text-align':'right'}">
                        </Column>
                        <Column field="REFF_NUMBER"  header="REFF_NUMBER"></Column>
                        <Column field="QTY"  header="QTY" :styles="{'text-align':'right'}"> </Column>
                        <Column v-if="selectedView == '1'" field="SALDO"   header="SALDO" :styles="{'text-align':'right'}"></Column>
                        <Column v-if="selectedView == '2'"  field="SALDO_SUB"  header="SALDO SUB" :styles="{'text-align':'right'}"></Column>
                        <Column v-if="selectedView == '3'"  field="SALDO_PERHARGA"  header="SALDO PERHARGA"
                            :styles="{'text-align':'right'}">
                        </Column>
                        <Column field="OP"  header="OP" :styles="{'text-align':'right'}" />
                        <Column field="TGL_PERMINTAAN"  header="TGL PERMINTAAN"></Column>
                    </DataTable>
                </div>
            </div>

            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="closeBasic" autofocus />
            </template>
        </Dialog>
        <Dialog header="Tambahkan item kelokasi saya" v-model:visible="showaddtomylocation"
            :containerStyle="{width: '80vw'}" :modal="true">

            <sub-add-itemkeloasi></sub-add-itemkeloasi>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="showaddtomylocation=false" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="showaddtomylocation=false" autofocus />
            </template>
        </Dialog>

    </section>
</template>
<script>
    import Button from 'primevue/button';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Badge from 'primevue/badge';
    import SelectButton from 'primevue/selectbutton';
    import InputText from 'primevue/inputtext';
    import Loading from 'vue-loading-overlay';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Dropdown from 'primevue/dropdown';
    import InputNumber from 'primevue/inputnumber';
    import InputMask from 'primevue/inputmask';
    import Accordion from 'primevue/accordion';
    import AccordionTab from 'primevue/accordiontab';
    import ScrollTop from 'primevue/scrolltop';
    import ScrollPanel from 'primevue/scrollpanel';
    import Dialog from 'primevue/dialog';
    import ProgressBar from 'primevue/progressbar';
    import Tag from 'primevue/tag';
    import RadioButton from 'primevue/radiobutton';
    import {
        FilterMatchMode
    } from 'primevue/api';
    import {
        find
    } from 'lodash';
    import {
        componentsToColor
    } from 'pdf-lib';
    export default {
        components: {
            'Button': Button,
            'DataTable': DataTable,
            'Column': Column,
            'Badge': Badge,
            'SelectButton': SelectButton,
            'InputText': InputText,
            Loading,
            ConfirmDialog,
            Dropdown,
            InputNumber,
            InputMask,
            Accordion,
            AccordionTab,
            ScrollTop,
            ScrollPanel,
            ProgressBar,
            Tag,
            RadioButton
        },
        props: {
            msg: String,
        },
        data() {
            return {
                json_fields: {
                    'CAPTION': 'CAPTION',
                    'BARCODE': 'BARCODE',
                    'SUB_BARCODE': 'SUB_BARCODE',
                    'TANGGAL_TRANS': 'TANGGAL_TRANS',
                    'REFF_NUMBER': 'REFF_NUMBER',
                    'QTY': 'QTY',
                    'SALDO': 'SALDO',
                    'HARGA_SATUAN': 'HARGA_SATUAN',
                },
                selectedView: '1', // default
                isLoading: false,
                fact: [],
                card_stock: [],
                displayBasic: false,
                showaddtomylocation: false,
                item_brekdown: [],
                SelectButton: 'OBAT-OBATAN',
                selectedCustomers: null,
                pilih_lokasi: [{
                        name: 'HANYA LOKASI SAYA',
                        code: 1,
                    },
                    {
                        name: 'SEMUA LOKASI',
                        code: 2,
                    }
                ],
                lokasi_selected: {
                    name: 'HANYA LOKASI SAYA',
                    code: 1,
                },
                potong_stock: [{
                        name: 'YA',
                        code: 1
                    },
                    {
                        name: 'TIDAK',
                        code: 0
                    },
                ],
                untuk_dijual: [{
                        name: 'YA',
                        code: 1
                    },
                    {
                        name: 'TIDAK',
                        code: 0
                    },
                ],
                data_detils: '',
                fullPage: true,
                show_detil: false,
                show_break_down: false,
                show_kfa_form: false,
                lokasi_arr: [],
                header: {

                },
                form: {
                    barcode: '',
                    kddokter: '',
                    namadokter: '',
                    kategori: '',
                    kategori_selected: '',
                    lokasi_selected:0,
                    lokasi_param:null,
                    satuan_selected: '',
                    potong_stock: '',
                    untuk_dijual: '',
                    data_grouping: '',
                    itembarang: '',
                    mode: 6,
                    sub_barcode: '',
                    harga_beli_jasa: 0,
                    harga_jual_jasa: 0

                },
                param_send: {
                    startdate: '',
                    enddate: '',
                    lokasi: '',
                    barcode: '',
                    data: '',
                    item_header: ''
                },
                data_item: {
                    data: '',
                    mode: ''
                },
                kategories: [],
                satuan_data: [],
                data_grouping: [],
                details_items: [],
                filters: {
                    'NAMA': {
                        value: null,
                    }
                },
                filters1: {},
                filters2: {},
                selectedText: '',
                mode_kfa: 0, //put the code on the master or on details
                pabrikan: {
                    NAMASUPLIER: ''
                }
            };
        },
        beforeCreate() {

        },
        beforeMount() {

        },
        created() {
            //this.fetchData();
            this.get_grouping();
            this.get_kategori();
            this.get_satuan();

            this.getdata_master(6, 0);
            this.initFilters1();
            this.initFilters2();
            this.get_lokasi();
            var currentDate = new Date();
            this.param_send.startdate = currentDate;
            this.param_send.enddate = currentDate;

        },
        mounted() {

        },
        methods: {
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
            arsipkanOrAktifkan(flg) {
                return flg.ARSIPKAN == '1' ? 'Aktifkan ?' : 'Non Aktifkan ?';
            },
            testing() {
                console.log('testing')
            },
            getTextParam(param, mode) {
                console.log(param)
                this.mode_kfa = mode;
                this.show_kfa_form = true;
                this.selectedText = param;
            },
            showaddtomyloc() {
                console.log('testing')
                this.showaddtomylocation = true;
                console.log(this.showaddtomylocation)
            },
            formatCurrency(value) {
                //return value;
                if (value !== undefined && value !== null) {
                    return value.toLocaleString('id-ID', {

                    });
                } else {
                    return 0;
                }

            },
            openBasic(data) {
                this.displayBasic = true;
                this.param_send.item_header = data.NAMA
                this.param_send.data = data
                this.card_stock = [];
            },
            closeBasic() {
                this.displayBasic = false;
            },
            async data_riwayat_card_stock(lokasi, barcode) {
                this.isLoading = true;
                await axios.post('/getdata_kategori', "")
                    .then(response => {
                        this.kategories = response.data.response
                        this.kategories = this.kategories.filter(x => x.NAMA_KATEGORI != '');
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_kategori() {
                this.isLoading = true;
                await axios.post('/getdata_kategori', "")
                    .then(response => {
                        this.kategories = response.data.response
                        this.kategories = this.kategories.filter(x => x.NAMA_KATEGORI != '');
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_satuan() {
                this.isLoading = true;
                await axios.post('/getdata_satuan', "")
                    .then(response => {
                        this.satuan_data = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_grouping() {
                this.isLoading = true;
                await axios.post('/getdata_grouping', "")
                    .then(response => {
                        this.data_grouping = response.data.response
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            arsipkan_item(data, mode, index) {
                let msg = ""
                if(mode==1)
                {
                    msg =data?.ARSIPKAN == '1' && mode==1 ? 'Aktifkan ?' : 'Non Aktifkan ?';
                }
                else
                {
                    msg ='Non Aktifkan ?';
                }
                this.$confirm.require({
                    message: msg,
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.arsipkan_item_barang(data, mode, index);
                    },
                    reject: () => {
                        //callback to execute when user rejects the action
                    }
                });
            },
            call_break_down_data(mode, breakdown, item) {
                this.item_brekdown = [];
                this.form.barcode = item.BARCODE;
                this.show_break_down = true;
                this.param_send.item_header = item.NAMA
                this.getdata_master(mode, breakdown)
                this.get_data_pabrikan_persediaan(item.BARCODE)
            },
            async call_data_base_lokasi()
            {
                // console.log('lokasi param', this.form.lokasi_param.ID)

                this.form.lokasi_selected = this.form.lokasi_param.ID
                this.getdata_master(13, 1)
                this.get_data_pabrikan_persediaan(this.form.barcode)
            },
             async get_data_pabrikan_persediaan(barcode) {
                this.isLoading = true;
                this.form.barcode = barcode;
                console.log(this.form)
                await axios.post('/get_data_pabrikan_persediaan', this.form)
                    .then(response => {
                        // console.log(response.data)
                        this.pabrikan = response.data.response
                        // console.log('pabrikan', this.pabrikan)
                        this.pabrikan.forEach(item => {
                            this.item_brekdown.response.forEach(x => {
                                if (x.SUB_BARCODE === item.SUB_BARCODE) {
                                    x.NAMASUPLIER = item.NAMASUPLIER;
                                }
                            })
                        })

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_lokasi(){
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response
                        this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ == "1")
                        this.isLoading = false

                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_master(mode, breakdown) {
                const dataform = new FormData();
                this.isLoading = true;
                //this.fact = [];
                this.form.kategori = this.SelectButton;
                this.form.mode = mode
                this.form.breakdown = breakdown;
                //this.form.mode = this.lokasi_selected['code']
                // console.log('parameter', this.form);
                await axios.post('/getdata_obat_baseparam_v1', this.form)
                    .then(response => {
                        if (mode == 6) {
                            this.fact = response.data
                        }
                        if (mode == 13) {
                            this.item_brekdown = response.data
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async get_sub_item(data) {
                const dataform = new FormData();

                this.form.barcode = data.IDBARANG;
                await axios.post('/getdetails_barang', this.form)
                    .then(response => {
                        this.details_items = response.data
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)

            },
            async chagelocation() {
                if (this.lokasi_selected['code'] == 1) {
                    this.form.mode = 6;
                }
                if (this.lokasi_selected['code'] == 2) {
                    this.form.mode = 13;
                }
                //console.log(this.form.mode);

                this.getdata_master(0, this.form.mode);
            },
            dropdonwOnchange() {
                // Logic to handle the selected option on @change
                console.log(this.form.kategori_selected);
            },
            changegrouping() {
                console.log(this.form.data_grouping)

            },
            changesatuandata() {
                console.log(this.form.satuan_selected)

            },
            change_kategori() {
                console.log(this.form.satuan_selected)
            },
            change_untukdijual() {
                console.log(this.form.satuan_selected)
            },
            potong_stock_func() {
                console.log(this.form.potong_stock)
            },

            get_detil_information(data) {

                //console.log('data test', data)
                this.show_detil = this.show_detil ? false : true
                this.data_detils = data;

                this.form.harga_jual_jasa = data.HARGA_BELI_JASA
                this.form.harga_beli_jasa = data.HARGA_JUAL_JASA

                var temp_kategori = this.kategories.find(x => x.NAMA_KATEGORI == data.KATEGORI)
                this.form.kategori_selected = temp_kategori;

                var ptng_stock = this.potong_stock.find(x => x.code == data.POTONGSTOCK)
                this.form.potong_stock = ptng_stock;

                var ptng_stock = this.potong_stock.find(x => x.code == data.POTONGSTOCK)
                this.form.potong_stock = ptng_stock;

                var untuk_dijual = this.potong_stock.find(x => x.code == data.UNTUK_DIJUAL)
                this.form.untuk_dijual = untuk_dijual;

                var satuan = this.satuan_data.find(x => x.SATUAN == data.SATUAN)
                this.form.satuan_selected = satuan;

                var grp = this.data_grouping.find(x => x.GROUPING == data.GROUPING)

                if (grp == "") {
                    grp = {
                        GROUPING: ''
                    }
                }
                this.form.data_grouping = {
                    GROUPING: data.GROUPING
                }

                this.get_sub_item(data);

            },
            handleClick(param) {
                this.show_detil = false
                this.SelectButton = param;

                this.getdata_master(6, 0)
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
            async update_sub_item(data) {
                const dataform = new FormData();
                this.isLoading = true
                await axios.post('/update_sub_item_barangstock', data)
                    .then(response => {

                        // console.log(response.data)

                        if(response.data?.metadata?.code==200){
                               this.open("success", response.data?.metadata?.message);
                        }
                        else
                        {
                               this.open("warning", response.data?.metadata?.message);
                        }
                        //console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            async arsipkan_item_barang(data, mode, index) {
                const dataform = new FormData();
                this.data_item.data = data;
                this.data_item.mode = mode;

                // console.log('item',this.data_item)

                await axios.post('/arsipkan_item_barang', this.data_item)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.metadata.code == 200) {
                            this.open("success", response.data.metadata.message);
                            data.ARSIPKAN = data.ARSIPKAN == 0 ? 1 : 0;
                            //this.getdata_master(6, 0);



                            //   if (!Array.isArray(this.data_detils)) {
                            //         this.data_detils.ARSIPKAN = this.data_detils.ARSIPKAN = 0 ? 1 : 0 ;
                            //     }
                        } else {
                            this.open("error", response.data.metadata.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            add_newitem() {
                this.show_detil = true;
                this.details_items = {
                    NAMA: '',
                    JENIS: '',
                    KATEGORI: '',
                    SATUAN: '',
                    HARGABELI: 0,
                    HARGAJUAL: 0,
                    POTONGSTOCK: 1,
                    STOCKMINIMUM: 0,
                    KANDUNGAN: '',
                    GUNAKAN_STOCK_MIN: '0',
                    GROUPING: '',
                    GROUPING_1: '',
                    CATATAN: '',
                    UNTUK_DIJUAL: 1
                }

            },

            async update_item_barang(data) {
                data.GROUPING = this.form.data_grouping
                data.SATUAN = this.form.satuan_selected['SATUAN'];
                data.KATEGORI = this.form.kategori_selected['NAMA_KATEGORI'];
                data.UNTUK_DIJUAL = this.form.untuk_dijual['code'];
                data.POTONGSTOCK = this.form.potong_stock['code'];
                data.HARGA_BELI_JASA = this.form.harga_beli_jasa;
                data.HARGA_JUAL_JASA = this.form.harga_jual_jasa;
                data.MODE = 1;

                // console.log('data untuk update', data)

                const dataform = new FormData();
                await axios.post('/update_itembarang', data)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.metadata.code == 200) {
                            this.open("success", response.data.metadata.message);
                        } else {
                            this.open("warning", response.data.metadata.message);
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getriwayat_card_stock() {
                this.displayBasic = true;
                this.param_send.barcode = this.param_send.data.IDBARANG
                this.param_send.lokasi = this.param_send.data.ID_LOKASI

                this.isLoading = true
                await axios.post('/getriwayat_card_stock', this.param_send)
                    .then(response => {
                        this.card_stock = response.data.response

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

        },
    }

</script>

<style scoped>
/* ── Detail Card Header ─────────────────────────────── */
.detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.detail-header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.detail-title-block {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
}

.detail-title {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.detail-subtitle {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
}

.detail-header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.chip-barcode :deep(.p-chip-label) {
    font-family: monospace;
    font-size: 0.85rem;
}

/* ── Section Titles ─────────────────────────────────── */
.detail-section-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #4b5563;
    border-left: 3px solid #6366f1;
    padding-left: 0.6rem;
    margin-bottom: 0.75rem;
    margin-top: 0.25rem;
}

/* ── Sub Item Cards ─────────────────────────────────── */
.sub-item-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    overflow: hidden;
}

.sub-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f1f5f9;
    padding: 0.5rem 0.85rem;
    border-bottom: 1px solid #e2e8f0;
}

.sub-item-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.85rem;
    color: #374151;
}

.sub-item-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: #6366f1;
    color: #fff;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
}

.sub-item-body {
    padding: 0.75rem 0.85rem;
}

.sub-item-footer {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 0.85rem;
    background: #fafafa;
    border-top: 1px solid #e2e8f0;
}

/* ── Detail Footer ──────────────────────────────────── */
.detail-footer {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 576px) {
    .detail-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .detail-header-right {
        width: 100%;
    }

    .detail-footer {
        flex-direction: column;
    }

    .detail-footer :deep(.p-button) {
        width: 100%;
        justify-content: center;
    }
}
</style>
