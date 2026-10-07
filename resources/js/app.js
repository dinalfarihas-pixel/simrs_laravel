require('./bootstrap');

import { createApp, defineAsyncComponent } from 'vue';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/nora';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css';

// PrimeVue Components
import Card from 'primevue/card';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Toast from 'primevue/toast';
import RadioButton from 'primevue/radiobutton';
import Message from 'primevue/message';
import Tooltip from 'primevue/tooltip';
import AutoComplete from 'primevue/autocomplete';
import InputOtp from 'primevue/inputotp';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import Chip from 'primevue/chip';
import ConfirmDialog from 'primevue/confirmdialog';
import Badge from 'primevue/badge';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

// Third-party
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import numeral from 'numeral';
import * as XLSX from 'xlsx';

const app = createApp({});

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-');

// Fix PrimeVue 4 InputNumber focusin infinite loop
function stopFocusinPropagation(event) { event.stopPropagation(); }

// ===== PLUGINS =====
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' }
    },
    pt: {
        inputnumber: {
            root: { onFocusin: stopFocusinPropagation }
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(VueToast);

// ===== GLOBAL COMPONENTS - PrimeVue =====
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('Toolbar', Toolbar);
app.component('InputNumber', InputNumber);
app.component('RadioButton', RadioButton);
app.component('Toast', Toast);
app.component('Dialog', Dialog);
app.component('Message', Message);
app.component('Card', Card);
app.component('Button', Button);
app.component('MultiSelect', MultiSelect);
app.component('DataTable', DataTable);
app.component('AutoComplete', AutoComplete);
app.component('InputOtp', InputOtp);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('SelectButton', SelectButton);
app.component('Textarea', Textarea);
app.component('Checkbox', Checkbox);
app.component('Tag', Tag);
app.component('ProgressBar', ProgressBar);
app.component('Chip', Chip);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Badge', Badge);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);

// PrimeVue 4 renamed components + backward-compat aliases
app.component('DatePicker', DatePicker);
app.component('Calendar', DatePicker);        // alias: Calendar → DatePicker
app.component('Select', Select);
app.component('Dropdown', Select);            // alias: Dropdown → Select
app.component('ToggleSwitch', ToggleSwitch);
app.component('InputSwitch', ToggleSwitch);   // alias: InputSwitch → ToggleSwitch

// vue-loading-overlay (registered both cases for compat)
app.component('Loading', Loading);
app.component('loading', Loading);

// ===== DIRECTIVES =====
app.directive('tooltip', Tooltip);

// ===== GLOBAL PROPERTIES =====
app.config.globalProperties.$globshowingModal = false;

// $numeral: replaces Vue 2 | numeral('fmt') pipe filter
// Usage in template: {{ $numeral(value, '0,0.00') }}
app.config.globalProperties.$numeral = (value, format) => {
    const n = numeral(value);
    return format ? n.format(format) : n.value();
};

// $exportExcel: replaces vue-json-to-excel's downloadExcel component
// Usage: this.$exportExcel(data, columns, filename)
app.config.globalProperties.$exportExcel = (data, filename = 'export') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
};

// ===== SYNCHRONOUS COMPONENTS (load immediately) =====
app.component('itemTemplate', require('./components/controls/itemtemplateComponent.vue').default);
app.component('downloadExcel', require('./components/controls/DownloadExcelComponent.vue').default);
app.component('sidebar-component', require('./components/SidebarComponent.vue').default);
app.component('banner-component', require('./components/BannerComponent.vue').default);
app.component('global-alert', require('./components/TheGlobalAlert.vue').default);

// ===== LAZY LOAD COMPONENTS =====

// Dashboard
app.component('homepage', defineAsyncComponent(() => import(/* webpackChunkName: "home" */ './components/HomeComponent.vue')));
app.component('dashboard1', defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './components/DashboardComponent.vue')));
app.component('Dashboard2', defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './components/Dashboard2Component.vue')));
app.component('dahsboard-rajal', defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './components/dashboard/KunjunganrawatJalanComponent.vue')));
app.component('CardComponent', defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './components/dashboard/CardComponent.vue')));
app.component('ketersediaan-tempattidur', defineAsyncComponent(() => import(/* webpackChunkName: "dashboard" */ './components/dashboard/TempattidurComponent.vue')));

// Persediaan - Main
app.component('persediaan-component', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-main" */ './components/PersediaanComponent.vue')));
app.component('Transaksi', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-transaksi" */ './components/persediaan/TransaksiComponent.vue')));

// Persediaan - Master Item
app.component('additem_newitem', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-master-item" */ './components/persediaan/AddnewitemBarangComponent.vue')));
app.component('sub-add-itemkeloasi', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-master-item" */ './components/persediaan/subpersediaan/AddnewItemkeloasisayaComponent.vue')));

// Persediaan - Penerimaan
app.component('penerimaan-barang', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-penerimaan" */ './components/persediaan/PenerimaanBarangComponent.vue')));
app.component('sub-list-penerimaan', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-penerimaan" */ './components/persediaan/SubListPenerimaanComponent.vue')));
app.component('laporan-penerimaan', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-penerimaan" */ './components/persediaan/LaporanpenerimaanComponent.vue')));
app.component('laporan-rekap-penerimaan', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-penerimaan" */ './components/persediaan/PenerimaanRekapComponents.vue')));

// Persediaan - Distribusi & Permintaan
app.component('permintaanlogistik', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-distribusi" */ './components/persediaan/PermintaanobatbmhpComponent.vue')));
app.component('permintaanlist', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-distribusi" */ './components/persediaan/PermintaanListComponent.vue')));
app.component('laporan-distribusi', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-distribusi" */ './components/persediaan/LaporandistribusiComponent.vue')));

// Persediaan - Laporan
app.component('persediaan-format2', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-laporan" */ './components/persediaan/LaporanpersediaanFormatduaComponent.vue')));
app.component('laporanpemakaianobat-laporanpemakaianobat', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-laporan-pemakaianobat" */ './components/persediaan/LaporanpemakaianobatComponent.vue')));
app.component('kartu_stock', defineAsyncComponent(() => import(/* webpackChunkName: "persediaan-laporan-kartustock" */ './components/persediaan/KartuStockComponent.vue')));

// Persediaan - Retur & Opname & Transfer
app.component('retur-kedepo', defineAsyncComponent(() => import(/* webpackChunkName: "returbarang" */ './components/persediaan/retur/ReturdariUnitKedepo.vue')));
app.component('stock-opname', defineAsyncComponent(() => import(/* webpackChunkName: "stock-opname" */ './components/persediaan/stockopname/StockOpnameComponent.vue')));
app.component('laporan-opname', defineAsyncComponent(() => import(/* webpackChunkName: "stock-opname" */ './components/persediaan/stockopname/LaporanStockOpnameComponent.vue')));
app.component('print-format-opname', defineAsyncComponent(() => import(/* webpackChunkName: "stock-opname" */ './components/persediaan/stockopname/CetakformatOpnameComponent.vue')));
app.component('transfer-barang', defineAsyncComponent(() => import(/* webpackChunkName: "transfer" */ './components/persediaan/transfer_barang/TransferBarangComponent.vue')));
app.component('list-transfer-barang', defineAsyncComponent(() => import(/* webpackChunkName: "transfer" */ './components/persediaan/transfer_barang/ListTransferComponent.vue')));
app.component('transfer-barang-keruangan', defineAsyncComponent(() => import(/* webpackChunkName: "transfer" */ './components/persediaan/transfer_barang/TransferBarangComponent.vue')));
app.component('laporanpengeluaran', defineAsyncComponent(() => import(/* webpackChunkName: "transfer" */ './components/persediaan/pengeluaran/LaporanPengeluaran.vue')));

// Monitoring
app.component('monitoring-component', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/MonitoringrmeComponent.vue')));
app.component('lospasien-component', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/LospasienComponent.vue')));
app.component('cost-monitoring', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/CostmonitoringComponent.vue')));
app.component('time-service', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/WaktulayanComponent.vue')));
app.component('monitoring-sttstracking', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/StatustrackingComponent.vue')));
app.component('monitoring-klaim', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/KlaimManajemenComponent.vue')));
app.component('peresepan-monitoring', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/PeresepanMonitorComponent.vue')));
app.component('loguser-component', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/UserloginComponent.vue')));
app.component('monitoring-penyerahan-resep', defineAsyncComponent(() => import(/* webpackChunkName: "monitoring" */ './components/monitoring/MonitoringPenyerahanResep.vue')));

// Kunjungan
app.component('datakunjungan', defineAsyncComponent(() => import(/* webpackChunkName: "kunjungan" */ './components/DatakunjunganComponent.vue')));
app.component('resume-pulang', defineAsyncComponent(() => import(/* webpackChunkName: "kunjungan" */ './components/kunjungan/ResumePulangComponent.vue')));
app.component('soap-rawatjalan', defineAsyncComponent(() => import(/* webpackChunkName: "kunjungan" */ './components/kunjungan/SoapRawatJalanComponent.vue')));
app.component('data-rawatpasien', defineAsyncComponent(() => import(/* webpackChunkName: "kunjungan" */ './components/kunjungan/DatarawatpasienComponent.vue')));

// Dokter
app.component('dokter-component', defineAsyncComponent(() => import(/* webpackChunkName: "dokter" */ './components/dokter/MasterdokterComponent.vue')));
app.component('obatdpjp-component', defineAsyncComponent(() => import(/* webpackChunkName: "dokter" */ './components/roledokter/ObatperdpjpComponent.vue')));
app.component('pasienranap-component', defineAsyncComponent(() => import(/* webpackChunkName: "dokter" */ './components/roledokter/KunjunganranapComponent.vue')));

// Perencanaan
app.component('perencanaan', defineAsyncComponent(() => import(/* webpackChunkName: "perencanaan" */ './components/perencanaan/RencanaKebutuhanComponent.vue')));
app.component('details-perencanaan', defineAsyncComponent(() => import(/* webpackChunkName: "perencanaan" */ './components/perencanaan/InputDetailPerencanaanComponent.vue')));
app.component('verifperencanaan', defineAsyncComponent(() => import(/* webpackChunkName: "perencanaan" */ './components/perencanaan/VerifPerencanaanComponenent.vue')));
app.component('varifdetails', defineAsyncComponent(() => import(/* webpackChunkName: "perencanaan" */ './components/perencanaan/Detailverifcomponent.vue')));

// IGD
app.component('triase', defineAsyncComponent(() => import(/* webpackChunkName: "igd" */ './components/igd/TriaseIgdComponent.vue')));
app.component('listpasien-igd', defineAsyncComponent(() => import(/* webpackChunkName: "igd" */ './components/igd/ListPasienIgdComponent.vue')));
app.component('subtriaseigd', defineAsyncComponent(() => import(/* webpackChunkName: "igd" */ './components/igd/SubtriaseIgdComponent.vue')));

// SOAP
app.component('soap-form', defineAsyncComponent(() => import(/* webpackChunkName: "soap" */ './components/soap/SoapComponent.vue')));
app.component('print-soap', defineAsyncComponent(() => import(/* webpackChunkName: "soap" */ './components/soap/PrintSoapCompinent.vue')));
app.component('print-resume-pulang', defineAsyncComponent(() => import(/* webpackChunkName: "soap" */ './components/soap/PrintResumePulang.vue')));
app.component('otorisasi-form', defineAsyncComponent(() => import(/* webpackChunkName: "soap" */ './components/sign/OtorisasiComponent.vue')));
app.component('otorisasi-form-v2', defineAsyncComponent(() => import(/* webpackChunkName: "soap" */ './components/sign/OtorisasiComponentV2.vue')));

// Operasi
app.component('permintaan-operasi', defineAsyncComponent(() => import(/* webpackChunkName: "operasi" */ './components/operasi/PermintaanOperasiComponent.vue')));
app.component('persiapan-operasi', defineAsyncComponent(() => import(/* webpackChunkName: "operasi" */ './components/operasi/PersiapanOperasiComponent.vue')));

// Upload File
app.component('listupload', defineAsyncComponent(() => import(/* webpackChunkName: "upload" */ './components/uploadfile/ListLampiranComponent.vue')));
app.component('listupload-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "upload" */ './components/uploadfile/ListLampiranPasienComponent.vue')));
app.component('upload-file', defineAsyncComponent(() => import(/* webpackChunkName: "upload" */ './components/uploadfile/ModuleUploadComponent.vue')));

// Gizi
app.component('diet-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/PemberianDietPasienComponent.vue')));
app.component('screening-gizi-dewasa', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/ScreeningGiziDewasaComponent.vue')));
app.component('screening-gizi-anak', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/ScreeningGiziAnakComponent.vue')));
app.component('permintaanKonsulGizi', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/PermintaanKonsuleGiziComponent.vue')));
app.component('RiwayatKonsulComponent', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/RiwayatKonsulComponent.vue')));
app.component('konfirmasiterimadietcomponent', defineAsyncComponent(() => import(/* webpackChunkName: "gizi" */ './components/gizi/KonfirmasiTerimaDietComponent.vue')));

// Pasien
app.component('master-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "pasien" */ './components/pasien/MasterPasienComponent.vue')));
app.component('Detailpasien', defineAsyncComponent(() => import(/* webpackChunkName: "pasien" */ './components/pasien/DetailspasienComponent.vue')));
app.component('pasien-view', defineAsyncComponent(() => import(/* webpackChunkName: "pasien" */ './components/pasien/PasienViewComponent.vue')));

// Admin
app.component('ruang-master', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/RuangMaster.vue')));
app.component('mapping-radiologi', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/MappingRadiologiCompany.vue')));
app.component('user-manajement', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/UserManajementCompnent.vue')));
app.component('terbitkan_sep', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/TerbitkanSEPComponent.vue')));
app.component('sync-sep', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/SyncSEPComponent.vue')));
app.component('historisbpjs', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/HistorisBpjs.vue')));
app.component('ticket_system', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/TicketingSystem.vue')));
app.component('pendaftaranPasien', defineAsyncComponent(() => import(/* webpackChunkName: "admin" */ './components/admin/pendaftaranPasien.vue')));

// Rawat Jalan
app.component('poli-klinik', defineAsyncComponent(() => import(/* webpackChunkName: "rawat-jalan" */ './components/rawatjalan/PoliklinikComponent.vue')));
app.component('resume-rawat-jalan', defineAsyncComponent(() => import(/* webpackChunkName: "rawat-jalan" */ './components/rawatjalan/ResumeRawatJalanComponent.vue')));

// Satu Sehat
app.component('satusehatmonitor', defineAsyncComponent(() => import(/* webpackChunkName: "satusehat" */ './components/satusehat/satusehatmonitorComponent.vue')));

// TTE
app.component('dosign', defineAsyncComponent(() => import(/* webpackChunkName: "tte" */ './components/tte/dosignComponent.vue')));
app.component('list_tte', defineAsyncComponent(() => import(/* webpackChunkName: "tte" */ './components/tte/listdokumenComponent.vue')));

// Tindakan
app.component('tindakan', defineAsyncComponent(() => import(/* webpackChunkName: "tindakan" */ './components/Tindakan/FormTindakanComponent.vue')));

// Karyawan
app.component('list-employe', defineAsyncComponent(() => import(/* webpackChunkName: "karyawan" */ './components/karyawan/listEmpComponent.vue')));
app.component('laporan-perbidang', defineAsyncComponent(() => import(/* webpackChunkName: "karyawan" */ './components/karyawan/laporanperbidangComponent.vue')));
app.component('presensi-report', defineAsyncComponent(() => import(/* webpackChunkName: "karyawan" */ './components/karyawan/presensireportComponent.vue')));
app.component('signup', defineAsyncComponent(() => import(/* webpackChunkName: "karyawan" */ './components/karyawan/SignUpComponent.vue')));

// Klaim Manajemen
app.component('klaim-dashoboard', defineAsyncComponent(() => import(/* webpackChunkName: "klaim" */ './components/Klaimmanajemen/DashboardKlaimComponent.vue')));

// Obat dan Penunjang
app.component('permintaanobat', defineAsyncComponent(() => import(/* webpackChunkName: "obat" */ './components/obatdanpenunjang/ObatComponent.vue')));
app.component('obat-pulvis', defineAsyncComponent(() => import(/* webpackChunkName: "obat" */ './components/obatdanpenunjang/ObatPulvisComponent.vue')));
app.component('templateObat', defineAsyncComponent(() => import(/* webpackChunkName: "obat" */ './components/obatdanpenunjang/TemplateObatComponent.vue')));
app.component('history_obat', defineAsyncComponent(() => import(/* webpackChunkName: "obat" */ './components/obatdanpenunjang/HistorisObatComponent.vue')));
app.component('permintaan-lab', defineAsyncComponent(() => import(/* webpackChunkName: "penunjang" */ './components/obatdanpenunjang/PermintaanLabComponent.vue')));
app.component('print-hasil-lab', defineAsyncComponent(() => import(/* webpackChunkName: "print-hasil-lab" */ './components/obatdanpenunjang/PrintHasilLabComponent.vue')));
app.component('permintaan-radiologi', defineAsyncComponent(() => import(/* webpackChunkName: "penunjang" */ './components/obatdanpenunjang/PermintaanRadiologiComponent.vue')));

// Radiologi
app.component('list-order-radiologi', defineAsyncComponent(() => import(/* webpackChunkName: "radiologi" */ './components/radiologi/ListorderRadiologiComponent.vue')));
app.component('hasilbaca-radiologi', defineAsyncComponent(() => import(/* webpackChunkName: "radiologi" */ './components/radiologi/HasilbacaRadiologiComponent.vue')));
app.component('print-radiologi', defineAsyncComponent(() => import(/* webpackChunkName: "radiologi" */ './components/radiologi/CetakHasilRadiologiComponent.vue')));

// Purchasing
app.component('purchase-request', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/PurchaseRequestComponent.vue')));
app.component('purchase-items', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/ItemPurchasingComponent.vue')));
app.component('timeline-purchasing', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/TimelineComponent.vue')));
app.component('disposisi-compenent', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/DisposisiComponent.vue')));
app.component('printout-compenent', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/PrintoutPRComponent.vue')));
app.component('purchase-order', defineAsyncComponent(() => import(/* webpackChunkName: "purchasing" */ './components/purchasing/purchaseOrder/PurchaseOrderForm.vue')));

// Antrean
app.component('batal-antrean', defineAsyncComponent(() => import(/* webpackChunkName: "antrean" */ './components/antrean/BatalAntreanComponent.vue')));

// Anastesi
app.component('persetujuan-anastesi', defineAsyncComponent(() => import(/* webpackChunkName: "anastesi" */ './components/anastesi/PersetujuanAnasstesiView.vue')));

// Laboratorium
app.component('laboratorium-template', defineAsyncComponent(() => import(/* webpackChunkName: "lab" */ './components/laboratorium/labTemplate.vue')));

// Medical Record - Kajian Awal
app.component('kajianawalpasien', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-kajian" */ './components/Medicalrecord/KajianAwalConponent.vue')));
app.component('kajianawalpasienPerawat', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-kajian" */ './components/Medicalrecord/KajianAwalOlehPerawatComponent.vue')));
app.component('discharge-planning', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-kajian" */ './components/Medicalrecord/DischargePlanningComponent.vue')));
app.component('assement-dokter', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-kajian" */ './components/Medicalrecord/AssesmentDokterComponent.vue')));
app.component('case-manager', defineAsyncComponent(() => import(/* webpackChunkName: "case-manager" */ './components/case_manager/CaseManagerComponent.vue')));

// Medical Record - Pemindahan Pasien
app.component('catatan-pemindahan-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-transfer" */ './components/Medicalrecord/CatatanPemindahanPasienComponent.vue')));
app.component('catatan-pemindahan-list', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-transfer" */ './components/Medicalrecord/CatatanPemindahanListComponent.vue')));

// Medical Record - Consent & Tanda Tangan
app.component('media-marking', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-consent" */ './components/Medicalrecord/MediaMarkingComponent.vue')));
app.component('tanda-tangan', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-consent" */ './components/Medicalrecord/TandatanganConsentPasienComponent.vue')));
app.component('tambah-tanda-tangan', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-consent" */ './components/Medicalrecord/TandatanganAddComponent.vue')));
app.component('take-picture-consent', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-consent" */ './components/Medicalrecord/TandatanganTakePicComponent.vue')));
app.component('consent-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-consent" */ './components/Medicalrecord/GeneralConsentCompnent.vue')));

// Medical Record - Monitoring & Grafik
app.component('grafik-cppt', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-monitoring" */ './components/Medicalrecord/GrafikCpptComponent.vue')));
app.component('early-warning-score', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-monitoring-ews" */ './components/Medicalrecord/EWS/EwsMonitoringComponent.vue')));
app.component('form-input-cairan', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-monitoring-cairan" */ './components/Medicalrecord/PemantauanCairan/PemantauanCairanComponentInput.vue')));
app.component('input-pemantauan-cairan', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-monitoring-cairan" */ './components/Medicalrecord/PemantauanCairan/InputCairanComponent.vue')));

// Medical Record - Status Pasien
app.component('selesai-rawat', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-status" */ './components/Medicalrecord/SelesaiDirawatComponent.vue')));
app.component('pasien-meninggal', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-status" */ './components/Medicalrecord/PasienMeninggalComponent.vue')));

// Medical Record - Obat & Tindakan
app.component('pemberian-obat', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-treatment" */ './components/Medicalrecord/FormPemberianObatComponent.vue')));
app.component('rekonsiliasi-obat', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-treatment" */ './components/Medicalrecord/RekonsiliasiObatComponent.vue')));

// Medical Record - Core
app.component('rmecomponent', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-core" */ './components/Medicalrecord/RMEComponent.vue')));
app.component('laporan-verif', defineAsyncComponent(() => import(/* webpackChunkName: "medrecord-core" */ './components/Medicalrecord/LaporanVerif/LaporanComponent.vue')));

// BPJS
app.component('edit-sep', defineAsyncComponent(() => import(/* webpackChunkName: "bpjs" */ './components/BPJS/editSEPComponent.vue')));

// Penunjang
app.component('fisioteraphy', defineAsyncComponent(() => import(/* webpackChunkName: "penunjang-fisio" */ './components/penunjang/FisioteraphyComponent.vue')));
app.component('fisioteraphy-list-permintaan', defineAsyncComponent(() => import(/* webpackChunkName: "penunjang-fisio" */ './components/penunjang/Fisioteraphy/ListPermintaanComponent.vue')));

// Rawat Intensif (ICU / HCU)
app.component('checklist-masuk-icu-hcu', defineAsyncComponent(() => import(/* webpackChunkName: "icu" */ './components/icu/DialogChecklistMasukICUHCU.vue')));
app.component('checklist-masuk-icu-hcu-page', defineAsyncComponent(() => import(/* webpackChunkName: "icu" */ './components/icu/ChecklistMasukICUHCUPage.vue')));
app.component('listpasien-icu', defineAsyncComponent(() => import(/* webpackChunkName: "icu" */ './components/icu/ListPasienIcuComponent.vue')));
app.component('form-pemantauan-icu', defineAsyncComponent(() => import(/* webpackChunkName: "icu-monitoring" */ './components/icu-monitoring/FormPemantauanICU.vue')));

// Rawat Bedah
app.component('list-pasien-bedah', defineAsyncComponent(() => import(/* webpackChunkName: "bedah" */ './components/rawatbedah/ListpasienOperasiComponent.vue')));

// Persalinan
app.component('partograf-compnent', defineAsyncComponent(() => import(/* webpackChunkName: "persalinan" */ './components/persalinan/partografComponent.vue')));
app.component('catatan-persalinan', defineAsyncComponent(() => import(/* webpackChunkName: "persalinan" */ './components/persalinan/CatatanPersalinan.vue')));

// Register
app.component('register-user', defineAsyncComponent(() => import(/* webpackChunkName: "register" */ './components/Register/RegisterUsercomponent.vue')));

// KFA
app.component('browse_kfa', defineAsyncComponent(() => import(/* webpackChunkName: "kfa" */ './components/KFA/browse_kfaComponent.vue')));
app.component('browse_kfa_bycode', defineAsyncComponent(() => import(/* webpackChunkName: "kfa" */ './components/KFA/KFA_bycodeComponent.vue')));

// Printout
app.component('print-surat-meninggal', defineAsyncComponent(() => import(/* webpackChunkName: "print" */ './components/printout/PrintSuratMeninggalComponent.vue')));
app.component('kop-surat-component', defineAsyncComponent(() => import(/* webpackChunkName: "print" */ './components/printout/KopsuratComponent.vue')));

// Utilitas
app.component('donwload-component', defineAsyncComponent(() => import(/* webpackChunkName: "utilitas" */ './components/utilitas/DownloadComponent.vue')));
app.component('rubah-pass', defineAsyncComponent(() => import(/* webpackChunkName: "utilitas" */ './components/RubahpasswordComponent.vue')));

// Konsultasi Dokter
app.component('konsultasi-dokter', defineAsyncComponent(() => import(/* webpackChunkName: "konsultasi-dokter" */ './components/konsultasiDokter/KonsultasiDokterComponent.vue')));
app.component('terima-konsul-dokter', defineAsyncComponent(() => import(/* webpackChunkName: "konsultasi-dokter" */ './components/konsultasiDokter/TerimaKonsulComponent.vue')));

// Siriraj
app.component('siriraj-component', defineAsyncComponent(() => import(/* webpackChunkName: "siriraj" */ './components/siriraj/sirirajComponent.vue')));

// Kajian Risiko Jatuh
app.component('kajian-resiko-jatuh', defineAsyncComponent(() => import(/* webpackChunkName: "kajian-resiko-jatuh" */ './components/kajian_resiko_jatuh/KajianResikoJatuhComponent.vue')));
app.component('pengkajian-nyeri', defineAsyncComponent(() => import(/* webpackChunkName: "pengkajian-nyeri" */ './components/Medicalrecord/PengkajianNyeriComponent.vue')));
app.component('pengkajian-infeksius', defineAsyncComponent(() => import(/* webpackChunkName: "pengkajian-infeksius" */ './components/Medicalrecord/PengkajianInfeksiusComponent.vue')));
app.component('pengkajian-terminal', defineAsyncComponent(() => import(/* webpackChunkName: "pengkajian-terminal" */ './components/Medicalrecord/PengkajianTerminalComponent.vue')));
app.component('edukasi-pasien', defineAsyncComponent(() => import(/* webpackChunkName: "edukasi-pasien" */ './components/Medicalrecord/EdukasiPasienComponent.vue')));

// Jadwal Kontrol
app.component('jadwal-kontrol', defineAsyncComponent(() => import(/* webpackChunkName: "jadwal-kontrol" */ './components/Medicalrecord/Kontrol/JadwalKontrolUlangComponent.vue')));
app.component('form-jadwal-kontrol', defineAsyncComponent(() => import(/* webpackChunkName: "form-jadwal-kontrol" */ './components/Medicalrecord/Kontrol/FormJadwalKontrolComponent.vue')));
app.component('print-kontrol-ulang', defineAsyncComponent(() => import(/* webpackChunkName: "print-kontrol-ulang" */ './components/Medicalrecord/Kontrol/PrintKontrolUlangComponent.vue')));

// Example
app.component('example-component', require('./components/ExampleComponent.vue').default);

// ===== CLEANUP OLD DRAFTS =====
(function cleanupOldDrafts() {
    try {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 3);
        const cutoffStr = `${cutoff.getFullYear()}${String(cutoff.getMonth()+1).padStart(2,'0')}${String(cutoff.getDate()).padStart(2,'0')}`;
        const toDelete = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const datePart = key.slice(-8);
                if (/^\d{8}$/.test(datePart) && datePart <= cutoffStr) {
                    toDelete.push(key);
                }
            }
        }
        toDelete.forEach(k => localStorage.removeItem(k));
    } catch (e) { /* silent */ }
})();

app.mount('#app');
