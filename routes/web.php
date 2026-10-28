<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PersediaanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DatareferensiController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\AdministrasiBillingController;
use App\Http\Controllers\DatakunjunganpasienController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\PerencanaanController;
use App\Http\Controllers\SatusehatController;

use App\Http\Controllers\PenunjangController;
use App\Http\Controllers\PengkajianNyeriController;
use App\Http\Controllers\EdukasiPasienController;
use App\Http\Controllers\IcuController;
use App\Http\Controllers\PersalinanController;
use App\Http\Controllers\UploadController;

use App\Http\Controllers\PurchasingController;

use App\Http\Controllers\BpjsApiController;
use App\Http\Controllers\RekamMedisElektronik;

use App\Http\Controllers\KlaimManajemenController;

use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\CaseManager\CaseManagerController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require_once __DIR__.'/employe.php';

Route::get('/proxy-image', [UploadController::class, 'proxy_image']);

Route::get('/login', function () {
    return view('loginform'); })->name('login');



Route::get('/', function () {
    return view('loginform'); })->name('guest');


Route::get('/logout', [LoginController::class, 'logout']);

Route::post('/dologin', [LoginController::class, 'authentication']);

Route::get('/logout', [LoginController::class, 'logout']);

Route::group(['middleware'=>['oto']], function(){

    // Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii

    Route::get('/homepage', function () {
        return view('homepage'); });

    Route::get('/dokter', function () {
        return view('referensi.dokter.master'); });

    Route::get('/rubahpassword', function () {
        return view('rubahpassword'); });

    Route::post('/changepassword-api', [LoginController::class, 'chagepassword']);

    Route::get('/add-new-item', function () {
        return view('persediaan.add_newitem'); });


    Route::get('/stock-opname', function () {
            return view('persediaan.stockopname.stock_opname'); });

    Route::get('/laporanpengeluaran', function () {
            return view('persediaan.pengeluaran.laporanpengeluaran'); });



    Route::get('/laporan-opname', function () {
        return view('persediaan.stockopname.laporan_so'); });

    Route::get('/cetak-format-opname', function () {
        return view('persediaan.stockopname.cetaklaporan_opnema'); });

    Route::get('/penerimaan-barang', function () {
        return view('persediaan.penerimaan_barang'); });

    Route::get('/laporan-rekap-penerimaan', function () {
            return view('persediaan.penerimaan_rekap'); });

    Route::get('/unautorized', function () {
        return view('unautorized'); })->name('unautorized');

    Route::get('/resume-pulang', function () {
        return view('datakunjungan.resumepulang'); });

    Route::get('/resume-rawat-jalan/{noregister}', function ($noregister) {
        return view('rawatjalan.resume_rawat_jalan'); });

    Route::get('/getdata_asesmen/{noregister}', [DatareferensiController::class, 'getdata_asesmen']);


    Route::get('/peresepan-monitoring', function () {
        return view('monitoring.peresepanmonitoring'); });


    Route::get('/poliklinik', function () {
        return view('rawatjalan.poliklinik'); });


    Route::post('/datakunjungan', [DatakunjunganpasienController::class, 'datarawatpasien_api']); //api

    //Dokter ROLe
    // Route::group(['middleware'=>['groupaccess']], function(){
        // Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii

        Route::get('/obatdpjp', function () {

        return view('roledokter.obatdpjp');});

        Route::post('/obatdppjdata', [PersediaanController::class, 'getdataobat_dpjp']); //api
        Route::post('/icare-api', [DatakunjunganpasienController::class, 'call_icare']); //api
        Route::post('/riwayat_kunjungan', [DatakunjunganpasienController::class, 'riwayat_kunjungan']); //api

        Route::get('/datarawatpasien', function () {
        return view('datakunjungan.datarawatpasien');});



        Route::get('/pasienranap', function () {
            return view('roledokter.pasienranap');});

        Route::post('/datarawatpasien_ranap_api', [DatakunjunganpasienController::class, 'datarawatpasien_ranap_api']); //api

    // });


        // Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii
        // Route::get('/homepage', function () {
        //     return view('homepage'); });
        Route::post('/datakunjunganpasien', [DashboardController::class, 'datakunjunganpasien']);

        Route::get('/data_rumahsakit', [LoginController::class, 'data_rumahsakit']); //progile RS

        Route::get('/persediaan', [PersediaanController::class, 'laporan_persediaan_transaksi']);
        Route::get('/persediaan-formatdua', [PersediaanController::class, 'laporan_persediaan_transaksi_formatdua']);



        Route::post('/getdatabarang_foropname', [PersediaanController::class, 'getdatabarang_foropname']);

        Route::post('/updateItemTindakan', [PersediaanController::class, 'updateItemTindakan']);

        Route::get('/itembarang', [PersediaanController::class, 'persediaan_master']);


        Route::post('/simpan_stock_opaname', [PersediaanController::class, 'simpan_stock_opaname']);
        Route::post('/laporan_stock_opname', [PersediaanController::class, 'laporan_stock_opname']);

        Route::post('/rekap_stock_in_out', [PersediaanController::class, 'rekap_stock_in_out']); //api



        Route::post('/get_jenis', [PersediaanController::class, 'get_jenis']);

        Route::post('/insert_itembarang', [PersediaanController::class, 'insert_itembarang']);

        Route::get('/laporanpenerimaan', [PersediaanController::class, 'laporan_penerimaan']);

        Route::post('/datalaporan_penerimaan', [PersediaanController::class, 'datalaporan_penerimaan']); //api

        Route::post('/get_data_pemakaian_obat', [PersediaanController::class, 'get_data_pemakaian_obat']); //api

        Route::post('/get_data_pemakaian_obat_summary', [PersediaanController::class, 'get_data_pemakaian_obat_summary']); //api

        Route::post('/get_data_pasien_penerima_obat', [PersediaanController::class, 'get_data_pasien_penerima_obat']); //api



        Route::post('/datalaporan_penerimaan_rekap', [PersediaanController::class, 'datalaporan_penerimaan_rekap']); //api

        Route::post('/batalkan_penerimaan', [PersediaanController::class, 'batalkan_penerimaan']); //api

        Route::get('/pemakaianobat', [PersediaanController::class, 'pemakaianobat_page']);

        Route::post('/getdatapemakaianobat', [PersediaanController::class, 'getdatapemakaianobat']); //api

        Route::post('/get_masterbarang', [PersediaanController::class, 'get_masterbarang']); //api

        Route::post('/get_data_supplier', [PersediaanController::class, 'get_data_supplier']); //api

        Route::post('/get_masterbarang_untukperencanaan', [PersediaanController::class, 'get_masterbarang_untukperencanaan']); //api

        Route::post('/save_permintaan', [PersediaanController::class, 'save_permintaan']); //api

        Route::post('/save_permintaan_obatv3', [PersediaanController::class, 'save_permintaan_obatv3']); //api

        Route::post('/getlaporan_tf_v3', [PersediaanController::class, 'getlaporan_tf_v3']); //api



        Route::post('/get_kebutuhan_perminggu', [PersediaanController::class, 'get_kebutuhan_perminggu']); //api

        // Route::post('/sep/get_data_sep', [DatareferensiController::class, 'get_data_sep']); //api

        Route::post('/persediaan_data', [PersediaanController::class, 'data_laporan_persediaan_transaksi']); //api

        Route::post('/rekap_transfer_bulanan', [PersediaanController::class, 'rekap_transfer_bulanan']); //api

        Route::post('/distribusi-api', [PersediaanController::class, 'distribusi_data']); //api

        Route::get('/kunjunganpasien', [DashboardController::class, 'datakunjnganHarian']);  ///kunjungan pasien harian

        Route::post('/okupasi_bed', [DashboardController::class, 'okupasi_bed']);


        Route::get('/gettahun', [PersediaanController::class, 'getdatatahun']);
        ///DASHBOARD

        Route::get('/dashboard-umum', function () {
            return view('dashboard.rajal'); });


        Route::get('/retur-barang-kedepo', function () {
            return view('persediaan.retur.retur_ke_depo'); });

        Route::post('/get_datakunjungan_poli', [DashboardController::class, 'get_datakunjungan_poli']);

        //END DASHBOARD

        Route::get('/dashboard2', [DashboardController::class, 'dashboard_kunjungan']);

        Route::post('/getdatapersediaan', [PersediaanController::class, 'getdata']);

        Route::post('/save_penerimaan', [PersediaanController::class, 'save_penerimaan']);


        Route::post('/getdata_kategori', [PersediaanController::class, 'getdata_kategori']);

        Route::post('/getdata_satuan', [PersediaanController::class, 'getdata_satuan']);

        Route::post('/getdata_satuan_v2', [PersediaanController::class, 'getdata_satuan_v2']);

        Route::post('/getdata_grouping', [PersediaanController::class, 'getdata_grouping']);

        Route::post('/getdetails_barang', [PersediaanController::class, 'getdetails_barang']);

        Route::post('/update_itembarang', [PersediaanController::class, 'update_itembarang']);

        Route::post('/add_itembarang_to_mylocation', [PersediaanController::class, 'add_itembarang_to_mylocation']);



        Route::post('/getdata_obat_baseparam', [PersediaanController::class, 'getdata_obat_baseparam']);

        Route::post('/getdata_obat_baseparam_v1', [PersediaanController::class, 'getdata_obat_baseparam_v1']);

        Route::post('/get_data_pabrikan_persediaan', [PersediaanController::class, 'get_data_pabrikan_persediaan']);


        Route::post('/additembarang_frommaster', [PersediaanController::class, 'additembarang_frommaster']);

        Route::post('/getriwayat_card_stock', [PersediaanController::class, 'getriwayat_card_stock']);



        Route::post('/update_sub_item_barangstock', [PersediaanController::class, 'update_sub_item_barangstock']);

        Route::post('/finishing_opname', [PersediaanController::class, 'finishing_opname']);

        Route::post('/arsipkan_item_barang', [PersediaanController::class, 'arsipkan_item_barang']);
        // Route::get('/getdatapersidiaan', [PersediaanController::class, 'getdata']);
        //monitoring
        Route::post('/getdatapasien_rme', [MonitoringController::class, 'getdatapasien_rme']); //api

        Route::post('/monitoring_klaim', [MonitoringController::class, 'monitoring_klaim']); //api

        Route::post('/peresepan_monitoring_api', [MonitoringController::class, 'peresepan_monitoring_api']); //api

        Route::post('/datadetails_pasien', [MonitoringController::class, 'datadetails_pasien']); //api

        Route::post('/loguser_login', [MonitoringController::class, 'loguser_login']); //api

        Route::post('/lospasien-api', [MonitoringController::class, 'lospasien']); //api

        Route::post('/const_monitoring', [MonitoringController::class, 'const_monitoring']); //api
        Route::post('/details_cost_monitoring', [MonitoringController::class, 'details_cost_monitoring']); //api

        Route::post('/administrasi_billing_kunjungan', [AdministrasiBillingController::class, 'billing_kunjungan']); //api
        Route::post('/administrasi_daftar_jasa', [AdministrasiBillingController::class, 'daftar_jasa']); //api
        Route::post('/administrasi_tambah_jasa', [AdministrasiBillingController::class, 'tambah_jasa']); //api
        Route::post('/administrasi_hapus_jasa', [AdministrasiBillingController::class, 'hapus_jasa']); //api

        Route::post('/get_details_item', [MonitoringController::class, 'get_details_item']); //api


        Route::post('/stts_monitorin-api', [MonitoringController::class, 'stts_monitorin']); //api

        Route::post('/getpasien_perdokter', [MonitoringController::class, 'getpasien_perdokter']); //api

        Route::post('/masterdokter', [MasterController::class, 'masterdokter']); //api

        Route::get('/getlokasi-api', [PersediaanController::class, 'getlokasi']); //api  get lokasi
        Route::post('/getlist_permintaan_baselokasi', [PersediaanController::class, 'getlist_permintaan_baselokasi']); //getlist permintaan

        Route::post('/getdetail_permintaan', [PersediaanController::class, 'getdata_detailbarang_permintaan']); //api  get lokasi

        Route::post('/hapus_permintaan', [PersediaanController::class, 'hapus_permintaan']); //api  get lokasi
//perencanaan
        Route::post('/save_header_perencanaan', [PerencanaanController::class, 'save_header_perencanaan']);

        Route::post('/hapus_header', [PerencanaanController::class, 'hapus_header_perencanaan']);

        Route::post('/getdata_perencanaan', [PerencanaanController::class, 'getdata_perencanaan']);

        Route::post('/simpan_detail_perencanaan', [PerencanaanController::class, 'simpan_detail_perencanaan']);
        Route::post('/get_masterbarang_perencanaan', [PerencanaanController::class, 'get_masterbarang_perencanaan']);

        Route::post('/hapus_item_perencanaan', [PerencanaanController::class, 'hapus_item_perencanaan']);

        Route::post('/monitoring_perencanaan', [PerencanaanController::class, 'monitoring_perencanaan']);

        Route::post('/get_list_item', [PerencanaanController::class, 'get_list_item']);

        Route::post('/do_verif', [PerencanaanController::class, 'do_verif']);


        Route::get('/detailperencanaan', function () {
            return view('perencanaan.detailsperencanaan'); });

        Route::get('/varifdetails', function () {
                return view('perencanaan.varifdetails'); });

        Route::get('/verifperencanaan', function () {
            return view('perencanaan.verifperencanaan'); });
//Perencannan

        Route::get('/permintaanlogistik', function () {
            return view('persediaan.permintaanfarmasilogistik'); });

        Route::get('/permintaanlist', function () {
            return view('persediaan.permintaanlist'); });



        Route::get('/statustracking', function () {
            return view('monitoring.sttstracking'); });

        Route::get('/klaim-manajemen', function () {
                return view('monitoring.klaimnanajement'); });


        Route::get('/itembarang', function () {
            return view('persediaan.persediaan'); });   //item barang

        Route::get('/monitoringrme', function () {
            return view('monitoring.monitoringrme'); });

        Route::get('/costmonitoring', function () {
                return view('monitoring.costmonitoring'); });

        Route::get('/distribusi', function () {
            return view('persediaan.distribusi'); });

        Route::get('/lospasien', function () {
            return view('monitoring.lospasien'); });

        Route::get('/donwload', function () {
            return view('utilitas.donwload'); });

        Route::get('/loguser', function () {
            return view('monitoring.loguser'); });

        Route::get('/perencanaan', function () {
            return view('perencanaan.rencanakebutuhan'); });

        Route::get('/ruang-master', function () {
        return view('admin.ruangmaster'); });

        Route::get('/mappingradiologi', function () {
            return view('admin.mappingradiologi'); });


        Route::get('/terbitsep', function () {
            return view('admin.terbitsep'); });

        Route::get('/sync-sep', function () {
            return view('admin.syncsep'); });

        Route::get('/riwayat-pelayanan', function () {
            return view('admin.historibpjs'); });
        ///IGD
        Route::get('/datarawatpasien_v2', function () {
            return view('igd.triase_igd'); });

        Route::get('/list-pasien-igd', function () {
            return view('igd.menuigd'); });

        //SATU SEHAT
        Route::post('/datapasiensatusehat', [SatusehatController::class, 'datapasiensatusehat']); //api

        Route::post('/data_kfa', [SatusehatController::class, 'data_kfa']); //api


        Route::post('/update_kode_kfa', [SatusehatController::class, 'update_kode_kfa']); //api


        Route::post('/generat_token_ss', [SatusehatController::class, 'generat_token_ss']); //api

        Route::post('/get_KFA', [SatusehatController::class, 'get_KFA']); //api

        Route::post('/datapasienpertransaksi', [SatusehatController::class, 'datapasienpertransaksi']); //api

        Route::post('/kajian_awal_dokter', [SatusehatController::class, 'kajian_awal_dokter']); //api

        Route::post('/get_kajian_awal_dokter', [SatusehatController::class, 'get_kajian_awal_dokter']); //api

        Route::post('/get_kajian_awal_dokter_v2', [SatusehatController::class, 'get_kajian_awal_dokter_v2']); //api


        Route::post('/simpan_selesai_pelayanan', [SatusehatController::class, 'simpan_selesai_pelayanan']); //api

        Route::post('/getdata_pemindahan_pasien', [SatusehatController::class, 'getdata_pemindahan_pasien']); //api

        Route::post('/get_dokter_pindahruangan', [SatusehatController::class, 'get_dokter_pindahruangan']); //api


        Route::post('/batalkan_transfer', [SatusehatController::class, 'batalkan_transfer']); //api

        Route::post('/kajian_awal_perawat', [SatusehatController::class, 'kajian_awal_perawat']); //api

        Route::post('/get_kajian_awal_perawat', [SatusehatController::class, 'get_kajian_awal_perawat']); //api

        Route::post('/get_riwayat_kajian_awal_perawat', [SatusehatController::class, 'get_riwayat_kajian_awal_perawat']); //api

        Route::post('/get_persiapan_operasi', [SatusehatController::class, 'get_persiapan_operasi']); //api

        Route::post('/persiapan_operasi', [SatusehatController::class, 'persiapan_operasi']); //api

        Route::post('/get_data_assesment_gizi', [SatusehatController::class, 'get_data_assesment_gizi']); //api

        Route::post('/pindah_pasien_antar_ruangan', [SatusehatController::class, 'pindah_pasien_antar_ruangan']); //api

        Route::post('/getnotif_pindahruangan', [SatusehatController::class, 'getnotif_pindahruangan']); //api

        Route::post('/simpanTemplate', [SatusehatController::class, 'simpanTemplate']); //api

        Route::post('/get_template', [SatusehatController::class, 'get_template']); //api

        Route::post('/hapustemplate', [SatusehatController::class, 'hapustemplate']); //api

        Route::get('/satusehatmonitoring', function () {
            return view('satusehat.satusehat'); });

        Route::get('/signup', function () {
            return view('karyawan.signup'); });

        //TTE
        Route::get('/dosign', function () {
            return view('tte.dosign'); });

        Route::get('/list_tte', function () {
                return view('tte.listttd'); });

        Route::get('/ketersediaan-tempattidur', function () {
            return view('dashboard.tempattidur'); });

        //RADIOLOGI
        Route::get('/radiologi', function () {
            return view('radiologi.listorderradiologi'); });

        Route::get('/print-radiologi', function () {
                return view('radiologi.printradiologi'); });

        Route::get('/print-hasil-lab', function () {
                return view('laboratorium.printhasil_lab'); });

        Route::get('/batal-antrean', function () {
            return view('antrean.batalantrean'); });

        ///Purchasing
        Route::get('/purchase-request', function () {
            return view('purchasing.purchasereq'); });
        Route::get('/purchasingtrans', function () {
            return view('purchasing.purchasingtrans'); });

        //purchase order
        Route::get('/purchase-order', function () {
            return view('purchasing.purchaseorder.purchaseorder'); });
        // Medical Recorder

        Route::get('/pasien-meninggal', function () {
            return view('medicalrecord.pasienmeninggal'); });

        Route::get('/jadwal-kontrol', function () {
            return view('medicalrecord.jadwalkontrol'); });

        Route::get('/jadwal-kontrol/form/{noregister}', function () {
            return view('medicalrecord.formjadwalkontrol'); });

        Route::get('/print-kontrol-ulang', function () {
            return view('medicalrecord.printkontrolulang'); });

        Route::get('/medical-record', function () {
            return view('medicalrecord.rme'); });

        Route::get('persetujuan-anastesi',function() {
             return view('anastesi.persetujuan_anastesi'); });
        //

          Route::get('laboratorium-template',function() {
             return view('laboratorium.labtemplate'); });



        Route::get('/print-soap/{noregister}', function () {
            return view('soap.print_soap'); });

        Route::get('/print-resume-pulang/{noregister}', function () {
            return view('resumemedis.PrintResumeranap'); });


        Route::get('/permintaan-fisioterapy', function () {
            return view('fisioterapy.fisioterapy'); });


        Route::get('/master-pasien', function () {
            return view('pasien.masterpasien'); });

        Route::get('/register-user', function () {
            return view('register.register_user'); });

        Route::get('/ticketingsistem', function () {
            return view('admin.ticketingsistem'); });

        Route::get('/konfirmasi-terima-diet', function () {
            return view('gizi.konfirmasi_terimadiet'); });

        Route::get('/monitoring-penyerahan-resep', function () {
            return view('monitoring.monitoringpenyerahaanresep'); });

        Route::post('/get_user', [SatusehatController::class, ' ']); //api

        Route::post('/uploaddata', [SatusehatController::class, 'uploaddata']); //api

        Route::post('/getlist_ttd', [SatusehatController::class, 'getlist_ttd']); //api
        Route::post('/ttd-api-checkuser', [SatusehatController::class, 'ttd_api']); //api

        Route::post('/hapus_tte', [SatusehatController::class, 'hapus_tte']); //api

        Route::post('/ttd_file', [SatusehatController::class, 'ttd_file']); //api
        Route::post('/ttd_file_v2', [SatusehatController::class, 'ttd_file_v2']); //api

        //getdata pasien
        Route::post('/getpasien_api', [DatakunjunganpasienController::class, 'getpasien_api']); //api




        Route::post('/update_sep_pasien', [DatakunjunganpasienController::class, 'update_sep_pasien']); //api


        Route::post('/data_pasien_meninggal', [DatakunjunganpasienController::class, 'data_pasien_meninggal']); //api

        Route::get('/print-surat-meninggal', function () {
            return view('medicalrecord.printsurat_meninggal'); });


        Route::get('/siriraj-score/{noregister}', function () {
            return view('siriraj.siriraj'); });

        Route::get('/kajian-resiko-jatuh/{noregister}', function () {
            return view('kajian_resiko_jatuh.index'); });

        Route::get('/list-pasien-icu', function () {
            return view('icu.list_pasien'); });

        Route::get('/checklist-masuk-icu-hcu/{noregister}', function () {
            return view('checklist_icu_hcu.index'); });

        Route::get('/pemantauan-intensif-icu/{noregister}', function ($noregister) {
            return view('icu.pemantauan_intensif', compact('noregister')); });

        Route::post('/icu/get_all_checklist_masuk',  [IcuController::class, 'get_all_checklist_masuk']);
        Route::post('/icu/simpan_checklist_masuk',  [IcuController::class, 'simpan_checklist_masuk']);
        Route::post('/icu/update_checklist_masuk',  [IcuController::class, 'update_checklist_masuk']);
        Route::post('/icu/get_checklist_masuk',     [IcuController::class, 'get_checklist_masuk']);
        Route::post('/icu/hapus_checklist_masuk',   [IcuController::class, 'hapus_checklist_masuk']);

        Route::post('/icu/simpan_pemantauan',  [IcuController::class, 'simpan_pemantauan']);
        Route::post('/icu/get_pemantauan',     [IcuController::class, 'get_pemantauan']);
        Route::post('/icu/hapus_pemantauan',         [IcuController::class, 'hapus_pemantauan']);
        Route::post('/icu/get_tanggal_pemantauan',   [IcuController::class, 'get_tanggal_pemantauan']);

        // ── Catatan Persalinan ─────────────────────────────────────────────
        Route::get('/catatan-persalinan/{noregister}', function ($noregister) {
            return view('persalinan.catatan_persalinan', compact('noregister')); });
        Route::get('/partograf/{noregister}', function ($noregister) {
            return view('persalinan.partograf', compact('noregister')); });
        Route::post('/persalinan/get',      [PersalinanController::class, 'get']);
        Route::post('/persalinan/save',     [PersalinanController::class, 'save']);
        Route::post('/persalinan/finalize', [PersalinanController::class, 'finalize']);

        Route::post('/datarawatpasien_baseparam_api', [DatakunjunganpasienController::class, 'datarawatpasien_baseparam_api']); //api
        Route::post('/getnamaruangan_poli', [DatakunjunganpasienController::class, 'getnamaruangan_poli']); //api


        Route::post('/pasien_sedang_rawat_inap', [DatakunjunganpasienController::class, 'pasien_sedang_rawat_inap']); //api

        Route::post('/getruangan_user_login', [DatakunjunganpasienController::class, 'getruangan_user_login']); //api

        Route::post('/pasien_pindah_ruangan', [DatakunjunganpasienController::class, 'pasien_pindah_ruangan']); //api

        Route::post('/insert_jadwal_operasi_v2', [DatakunjunganpasienController::class, 'insert_jadwal_operasi_v2']); //api

        Route::post('/get_jadwal_operasi', [DatakunjunganpasienController::class, 'get_jadwal_operasi']); //api

        Route::post('/batal_jadwal_operasi', [DatakunjunganpasienController::class, 'batal_jadwal_operasi']); //api



        //triase
        Route::post('/get_triase_form', [SatusehatController::class, 'get_triase_form']); //api
        Route::post('/simpan_triase', [SatusehatController::class, 'simpan_triase']); //api
        Route::post('/otorisasi_v3', [SatusehatController::class, 'otorisasi_v3']); //api

        Route::post('/datagrafik_cppt', [SatusehatController::class, 'datagrafik_cppt']); //api


        Route::post('/update_loinc_radiologi', [SatusehatController::class, 'update_loinc_radiologi']); //api




        //soap
        Route::post('/simpan_soap', [SatusehatController::class, 'simpan_soap']); //api
        Route::post('/get_soap', [SatusehatController::class, 'get_soap']); //api
        Route::post('/hapus_soap', [SatusehatController::class, 'hapus_soap']); //api
        Route::post('/sync_ews_from_soap', [SatusehatController::class, 'sync_ews_from_soap']); //api


        Route::post('/getdata_tempat_tidur', [SatusehatController::class, 'getdata_tempat_tidur']); //api


        Route::post('/get_referensi_triase', [SatusehatController::class, 'get_referensi_triase']); //api
        //header
        Route::post('/input_header_triase', [SatusehatController::class, 'input_header_triase']); //api
        Route::post('/update_dokter_pendaftaran', [SatusehatController::class, 'update_dokter_pendaftaran']); //api
        Route::post('/get_triase_by_tanggal', [SatusehatController::class, 'get_triase_by_tanggal']); //laporan dokter IGD

        Route::post('/get_carapakai_obat', [SatusehatController::class, 'get_carapakai_obat']);


        Route::post('/get_notif_penunjang_json', [SatusehatController::class, 'get_notif_penunjang_json']);



        Route::post('/kirimpermintaan_obat', [SatusehatController::class, 'kirimpermintaan']);

        Route::post('/simpan_diagnosan_dokter', [SatusehatController::class, 'simpan_diagnosan_dokter']);

        Route::post('/get_diagnosa_dokter', [SatusehatController::class, 'get_diagnosa_dokter']);


        Route::post('/update_stts_obat_pulang', [SatusehatController::class, 'update_stts_obat_pulang']);

        Route::post('/voidtindakan', [SatusehatController::class, 'voidtindakan']);

        Route::post('/getheader_sales', [SatusehatController::class, 'getheader_sales']);

        Route::post('/getheader_sales_v2', [SatusehatController::class, 'getheader_sales_v2']);

        Route::post('/konfirmasiTerimaObat', [SatusehatController::class, 'konfirmasiTerimaObat']);

        Route::post('/rincian_tindakan', [SatusehatController::class, 'rincian_tindakan']);

        Route::post('/getdetils_sales', [SatusehatController::class, 'getdetils_sales']);

        Route::post('/getdetils_sales_radiologi', [SatusehatController::class, 'getdetils_sales_radiologi']);

        Route::post('/simpan_konsul', [SatusehatController::class, 'simpan_konsul']);

        Route::post('/get_riwayat_konsul', [SatusehatController::class, 'get_riwayat_konsul']);

        Route::post('/get_data_kco', [SatusehatController::class, 'get_data_kco']);//apiii

        Route::post('/data_obat_pulang', [SatusehatController::class, 'data_obat_pulang']);//apiii

        Route::post('/simpan_resume_pulang', [SatusehatController::class, 'simpan_resume_pulang']);//apiii

        Route::post('/updatepulang_tgl_pulang', [SatusehatController::class, 'updatepulang_tgl_pulang']);//apiii

        Route::post('/getdata_resume_pulang_pasien', [SatusehatController::class, 'getdata_resume_pulang_pasien']);//apiii

        Route::post('/void_sales', [SatusehatController::class, 'void_sales']);//apiii
        Route::post('/kirim_resep', [SatusehatController::class, 'kirim_resep']);//apiii
        Route::post('/getheader_penunjang', [SatusehatController::class, 'getheader_penunjang']);//apiii

        Route::post('/getheader_penunjang_v2', [SatusehatController::class, 'getheader_penunjang_v2']);//apiii



        Route::post('/getdatahasil_lab', [SatusehatController::class, 'getdatahasil_lab']);//apiii

        ///penunjang
        Route::post('/listorderPenunjang', [PenunjangController::class, 'listorderPenunjang']);//apiii

        Route::post('/reset_otorisasi_radiologi', [PenunjangController::class, 'reset_otorisasi_radiologi']);


        Route::post('/get_resume_pulang', [PenunjangController::class, 'get_resume_pulang']);//apiii //Untuk cetak resume pulang


        Route::post('/insert_konsultasi_dokter', [PenunjangController::class, 'insert_konsultasi_dokter']);//apiii

        Route::post('/get_konsultasi_dokter', [PenunjangController::class, 'get_konsultasi_dokter']);//apiii

        Route::post('/konsultasi_read', [PenunjangController::class, 'konsultasi_read']);//apiii

        Route::post('/konsultasi_selesai', [PenunjangController::class, 'konsultasi_selesai']);//apiii

        Route::post('/insert_balasan_konsul', [PenunjangController::class, 'insert_balasan_konsul']);


        Route::post('/get_list_resep', [PenunjangController::class, 'get_list_resep']);//apiii


        Route::get('/get_template_lab', [PenunjangController::class, 'get_template_lab']);//apiii


        Route::get('/get_kategori_lab', [PenunjangController::class, 'get_kategori_lab']);//apiii

        Route::post('/delete_balasan_konsul', [PenunjangController::class, 'delete_balasan_konsul']);//apiii


        Route::post('/update_template_lab', [PenunjangController::class, 'update_template_lab']);//apiii

        Route::post('/add_template_lab', [PenunjangController::class, 'add_template_lab']);//apiii


        Route::post('/deleted_item_template', [PenunjangController::class, 'deleted_item_template']);//apiii


        Route::post('/getTransferSummary', [PenunjangController::class, 'getTransferSummary']); //api

        Route::post('/assesment/simpan_siriraj', [PenunjangController::class, 'simpan_siriraj']);//apiii simpan siriraj score

        Route::post('/assesment/get_siriraj', [PenunjangController::class, 'get_siriraj']);//apiii simpan siriraj score

        Route::post('/assesment/hapus_siriraj', [PenunjangController::class, 'hapus_siriraj']);//apiii simpan siriraj score

        // Kajian Risiko Jatuh
        Route::post('/assesment/simpan_resiko_jatuh', [PenunjangController::class, 'simpan_resiko_jatuh']);
        Route::post('/assesment/get_resiko_jatuh', [PenunjangController::class, 'get_resiko_jatuh']);
        Route::post('/assesment/hapus_resiko_jatuh', [PenunjangController::class, 'hapus_resiko_jatuh']);

        // Pengkajian Nyeri
        Route::post('/assesment/simpan_nyeri', [PengkajianNyeriController::class, 'simpan']);
        Route::post('/assesment/get_nyeri', [PengkajianNyeriController::class, 'get_riwayat']);
        Route::post('/assesment/hapus_nyeri', [PengkajianNyeriController::class, 'hapus']);

        // Skrining Penyakit Menular/Infeksius
        Route::post('/assesment/simpan_infeksius', [PengkajianNyeriController::class, 'simpan_infeksius']);
        Route::post('/assesment/get_infeksius', [PengkajianNyeriController::class, 'get_riwayat_infeksius']);
        Route::post('/assesment/hapus_infeksius', [PengkajianNyeriController::class, 'hapus_infeksius']);

        // Formulir Informasi dan Edukasi Pasien Terintegrasi
        Route::post('/assesment/simpan_hambatan_edukasi', [EdukasiPasienController::class, 'simpan_hambatan']);
        Route::post('/assesment/get_hambatan_edukasi', [EdukasiPasienController::class, 'get_hambatan']);
        Route::post('/assesment/simpan_sesi_edukasi', [EdukasiPasienController::class, 'simpan_sesi']);
        Route::post('/assesment/get_edukasi_pasien', [EdukasiPasienController::class, 'get_riwayat']);
        Route::post('/assesment/hapus_sesi_edukasi', [EdukasiPasienController::class, 'hapus_sesi']);
        Route::post('/assesment/upload_ttd_edukasi', [EdukasiPasienController::class, 'upload_ttd_edukasi']);

        // Pengkajian Pasien Tahap Terminal
        Route::post('/assesment/simpan_terminal', [PengkajianNyeriController::class, 'simpan_terminal']);
        Route::post('/assesment/get_terminal', [PengkajianNyeriController::class, 'get_riwayat_terminal']);
        Route::post('/assesment/hapus_terminal', [PengkajianNyeriController::class, 'hapus_terminal']);

        Route::post('/input_permintaan_fisio', [PenunjangController::class, 'input_permintaan_fisio']);//apiii

        Route::post('/get_data_permintaan_fisio', [PenunjangController::class, 'get_data_permintaan_fisio']);//apiii
        Route::post('/hapus_permintaan_fisio', [PenunjangController::class, 'hapus_permintaan_fisio']);//apiii

        Route::post('/listpermintaan_fisio', [PenunjangController::class, 'listpermintaan_fisio']);//apiii


        Route::post('/get_detail_radiologi', [PenunjangController::class, 'get_detail_radiologi']);//apiii


        Route::post('/history_obat_penunjang', [PenunjangController::class, 'history_obat_penunjang']);//apiii

        Route::post('/hapus_lampiran_foto_rad', [PenunjangController::class, 'hapus_lampiran_foto_rad']);//apiii



        Route::post('/masterpasien', [PenunjangController::class, 'masterpasien']);//apiii

        Route::post('/update_pekerjaan_pasien', [PenunjangController::class, 'update_pekerjaan_pasien']);//apiii

        Route::post('/get_yonif', [PenunjangController::class, 'get_yonif']);//apiii


        Route::post('/getmaster_gizi', [PenunjangController::class, 'getmaster_gizi']);//apiii


        //Gizi

        Route::post('/getlist_penunjang_order_jasa_penunjang', [PersediaanController::class, 'getlist_penunjang_order_jasa_penunjang']);//apiii



        Route::post('/simpanhasil_bacaradiologi', [PenunjangController::class, 'simpanhasil_bacaradiologi']);//apiii
        Route::post('/get_recent_obat_poly', [PenunjangController::class, 'get_recent_obat_poly']);//apiii
        ///upload file
        Route::post('/uploadlampiran', [UploadController::class, 'uploadlampiran']);//apiii

        Route::post('/upload_canvas', [UploadController::class, 'upload_canvas']);//apiii

        Route::post('/getdata_lampiran', [UploadController::class, 'getdata_lampiran']);//apiii

        Route::post('/get_filelampiran_pasien', [UploadController::class, 'get_filelampiran_pasien']);//apiii

        Route::post('/hapus_datalampiran', [UploadController::class, 'hapus_datalampiran']);//apiii

        //Route::post('/purchaserequest', [PurchasingController::class, 'uploadlampiran']);//apiii
        ///Get data barang
        Route::post('/getbarang', [PurchasingController::class, 'getbarang']);//apiii
        Route::post('/save_pr', [PurchasingController::class, 'save_pr']);//apiii

        Route::post('/do_approval', [PurchasingController::class, 'do_approval']);//apiii

        Route::post('/list_timeline', [PurchasingController::class, 'list_timeline']);//apiii

        Route::post('/deleted_telaah', [PurchasingController::class, 'deleted_telaah']);//apiii

        Route::post('/counting_notif', [PurchasingController::class, 'counting_notif']);//apiii


        Route::post('/proses_telaah', [PurchasingController::class, 'proses_telaah']);//apiii

        Route::post('/getlist_pr', [PurchasingController::class, 'getlist_pr']);//apiii

        Route::post('/getkategori_pr', [PurchasingController::class, 'getkategori_pr']);//apiii

        Route::post('/push_disposisi', [PurchasingController::class, 'push_disposisi']);//apiii

        Route::post('/get_disposisi', [PurchasingController::class, 'get_disposisi']);//apiii

        Route::post('/forward_pr', [PurchasingController::class, 'forward_pr']);//apiii

        Route::post('/simpan_po', [PurchasingController::class, 'simpan_po']);//apiii




        // Antrean

        Route::post('/update_sudah_baca', [PurchasingController::class, 'update_sudah_baca']);//apiii

        Route::get('/printout-pr', function () {
            return view('purchasing.printout-pr'); });
        ////




    Route::post('/timeservice-api', [MonitoringController::class, 'waktu_layan_monitoring']); //api

    Route::post('/getdata_antrean', [MonitoringController::class, 'getdata_antrean']);//apiii

    Route::post('/batalkan_antrean_bpjs', [MonitoringController::class, 'batalkan_antrean_bpjs']);//apiii

    //Route::post('/batalkan_antrean_bpjs', [MonitoringController::class, 'batalkan_antrean_bpjs']);//apiii






    Route::post('/timeservice_breakdown-api', [MonitoringController::class, 'waktu_layan_monitoring_breakdown']); //api
    Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii


    Route::get('/getusername', [LoginController::class, 'getusername']);//apiii
    Route::get('/datajabatan_user', [LoginController::class, 'datajabatan_user']);//apiii


    Route::get('/get_lokasi_tovue', [LoginController::class, 'get_lokasi_tovue']);

    Route::post('/get_kode_unit_user', [LoginController::class, 'get_kode_unit_user']);//apiii
    Route::post('/get_banner', [LoginController::class, 'get_banner']);//apiii

    ///get api BPJS
    Route::post('/datadokter-bpjs-api', [BpjsApiController::class, 'get_url_antrol']); //api
    Route::post('/datapoli-bpjs-api', [BpjsApiController::class, 'getdata_poli_bpjs']); //api


    //

    Route::post('/simpan_edit_dokter', [DatareferensiController::class, 'simpan_edit_dokter']); //api

    Route::post('/sprigetdata', [DatareferensiController::class, 'sprigetdata']); //api

    Route::post('/cetakSPRI', [DatareferensiController::class, 'generateSPRI']); //api

    Route::post('/getdatakec', [DatareferensiController::class, 'getdatakec']); //api





    Route::post('/tidak_merawat_pasien_ini', [DatareferensiController::class, 'tidak_merawat_pasien_ini']); //api


    Route::post('/datapoly', [DatareferensiController::class, 'datapoly']); //api

    Route::post('/get_jadwal_kontrolulang', [DatareferensiController::class, 'get_jadwal_kontrolulang']); //api
    Route::post('/terbitkan_kontrolulang', [DatareferensiController::class, 'terbitkan_kontrolulang']); //api
    Route::post('/get_dokter_live', [DatareferensiController::class, 'getDokterLive']); //api
    Route::get('/get_riwayat_kontrolulang/{norm}', [DatareferensiController::class, 'getRiwayatKontrolUlang']); //api
    Route::post('/hapus_surat_kontrol', [DatareferensiController::class, 'hapusSuratKontrol']); //api


    Route::get('/addcaraBayar', [DatareferensiController::class, 'addcaraBayar']); //api


    Route::post('/get_data_ruangan', [DatareferensiController::class, 'get_data_ruangan']); //api

    Route::post('/getnamadokter', [DatareferensiController::class, 'getnamadokter']); //api

    Route::post('/get_icd_v2', [DatareferensiController::class, 'get_icd_v2']); //api

    Route::post('/input_bed', [DatareferensiController::class, 'input_bed']); //api

    Route::post('/hapus_ruangan', [DatareferensiController::class, 'hapus_ruangan']); //api


    Route::post('/carapulang', [DatareferensiController::class, 'carapulang']); //api

    Route::post('/survey_fisik_ranap', [DatareferensiController::class, 'survey_fisik_ranap']); //api
    Route::post('/diagnosa_keperawatan', [DatareferensiController::class, 'diagnosa_keperawatan']); //api


    Route::post('/simpan_input_cairan', [RekamMedisElektronik::class, 'simpan_input_cairan']); //api

    Route::post('/get_profesi', [RekamMedisElektronik::class, 'get_profesi']); //api



    Route::post('/get_data_cairan', [RekamMedisElektronik::class, 'get_data_cairan']); //api
    Route::post('/hapus_inputan_cairan', [RekamMedisElektronik::class, 'hapus_inputan_cairan']); //api

    Route::post('/get_consent_pasien', [RekamMedisElektronik::class, 'get_consent_pasien']); //api

    Route::post('/simpantanda_list_penanggung_jawab', [RekamMedisElektronik::class, 'simpantanda_list_penanggung_jawab']); //api
    Route::post('/hapus_ttd', [RekamMedisElektronik::class, 'hapus_ttd']); //api

    Route::post('/simpan_discharge_planning', [RekamMedisElektronik::class, 'simpan_discharge_planning']); //api
    Route::post('/get_discharge_planning', [RekamMedisElektronik::class, 'get_discharge_planning']); //api
    Route::post('/simpan_catatan_discharge_planning', [RekamMedisElektronik::class, 'simpan_catatan_discharge_planning']); //api
    Route::post('/get_catatan_discharge_planning', [RekamMedisElektronik::class, 'get_catatan_discharge_planning']); //api
    Route::post('/update_catatan_discharge_planning', [RekamMedisElektronik::class, 'update_catatan_discharge_planning']); //api
    Route::post('/hapus_catatan_discharge_planning', [RekamMedisElektronik::class, 'hapus_catatan_discharge_planning']); //api

    Route::post('/get_case_manager', [CaseManagerController::class, 'get_case_manager']); //api
    Route::post('/simpan_case_manager', [CaseManagerController::class, 'simpan_case_manager']); //api
    Route::post('/update_case_manager', [CaseManagerController::class, 'update_case_manager']); //api
    Route::post('/hapus_case_manager', [CaseManagerController::class, 'hapus_case_manager']); //api

    Route::get('/edit-sep', function () {
        return view('BPJS.editsep'); });

    //BPJS
    Route::get('/laporan-verif', function () {
        return view('medicalrecord.laporanverif.laporanverif'); });


    Route::post('/laporan_verif_api', [RekamMedisElektronik::class, 'laporan_verif_api']); //api
    Route::post('/simpan_pemberian_obat', [RekamMedisElektronik::class, 'simpan_pemberian_obat']); //api

    Route::post('/getpemberian_obat', [RekamMedisElektronik::class, 'getpemberian_obat']); //api

    Route::post('/hapus_pemberian_obat', [RekamMedisElektronik::class, 'hapus_pemberian_obat']); //api

    Route::post('/simpan_rekonsiliasi_obat', [RekamMedisElektronik::class, 'simpan_rekonsiliasi_obat']); //api
    Route::post('/update_rekonsiliasi_obat', [RekamMedisElektronik::class, 'update_rekonsiliasi_obat']); //api
    Route::post('/getrekonsiliasi_obat', [RekamMedisElektronik::class, 'getrekonsiliasi_obat']); //api
    Route::post('/hapus_rekonsiliasi_obat', [RekamMedisElektronik::class, 'hapus_rekonsiliasi_obat']); //api
    Route::post('/sinkron_obat_rs_rekonsiliasi', [RekamMedisElektronik::class, 'sinkron_obat_rs_rekonsiliasi']); //api
    Route::post('/get_riwayat_rekonsiliasi_obat', [RekamMedisElektronik::class, 'get_riwayat_rekonsiliasi_obat']); //api


    Route::post('/set_sudah_dilenkapi_klaim', [RekamMedisElektronik::class, 'set_sudah_dilenkapi_klaim']); //api

    //getdata_SEP
    Route::post('/getdata_SEP', [BpjsApiController::class, 'getdata_SEP']); //api
    Route::post('/updateSEP', [DatakunjunganpasienController::class, 'updateSEP']); //api


    Route::post('/get_data_peserta', [BpjsApiController::class, 'get_data_peserta']); //api

    Route::post('/get_historis_pelayanan_bpjs', [BpjsApiController::class, 'get_historis_pelayanan_bpjs']); //api
    Route::post('/hapus_sep', [BpjsApiController::class, 'hapus_sep']); //api




    Route::post('/createSEP', [BpjsApiController::class, 'createSEP']); //api

    Route::post('/syncSEP', [BpjsApiController::class, 'syncSEP']); //api


    Route::post('/getdata_propinsi_bpjs', [BpjsApiController::class, 'getdata_propinsi_bpjs']); //api
    Route::post('/getdata_kabupaten_bpjs', [BpjsApiController::class, 'getdata_kabupaten_bpjs']); //api
    Route::post('/getdata_kecamatan_bpjs', [BpjsApiController::class, 'getdata_kecamatan_bpjs']); //api

    //EDIT SEP


    Route::post('/dashboard_data_klaim', [KlaimManajemenController::class, 'dashboard_data_klaim']); //api

    Route::post('/dashboard_data_klaim_get_dx', [KlaimManajemenController::class, 'dashboard_data_klaim_get_dx']); //api

    Route::post('/getdatabiliing', [KlaimManajemenController::class, 'getdatabiliing']); //api




    ///RAWAT BEDAH
    Route::get('/list-pasien-bedah', function () {
        return view('rawatbedah.listpasien'); });

    /// END RAWAT BEDAH


    Route::get('/timeservice', function () {
        return view('monitoring.timeservice'); });

    Route::get('/dashboard-klaim', function () {
        return view('klaimmanajemen.dashboardklaim'); });


    Route::get('/list-emp', function () {
    return view('employe.listemploye'); });


    Route::get('/report', function () {
    return view('employe.presensitrans'); });

    Route::get('/laporan-perbidang', function () {
        return view('employe.laporan_perbidang_group'); });


    Route::get('/konsultasi-dokter/{noregister}', function ($noregister) {
        return view('konsulasiDokter.konsultasidokter', compact('noregister'));
    });

      Route::get('/konsultasi-dokter/{noregister}', function ($noregister) {
        return view('konsulasiDokter.konsultasidokter', compact('noregister'));
    });

    Route::get('/terima-konsul-dokter', function () {
        return view('konsulasiDokter.terimakonsul');
    });

    Route::post('/getMasterKaryawan', [KaryawanController::class, 'getMasterKaryawan']); //api
    Route::post('/reset_password', [KaryawanController::class, 'reset_password']); //api


    Route::post('/get_ruangan', [KaryawanController::class, 'get_ruangan']); //api

    Route::post('/getlaporan_personal', [KaryawanController::class, 'getlaporan_personal']); //api
    Route::post('/getlaporan_personal_perhari', [KaryawanController::class, 'getlaporan_personal_perhari']); //api


    Route::post('/laporan_perbidang_grouping', [KaryawanController::class, 'laporan_perbidang_grouping']); //api
    Route::post('/laporan_perruang_grouping', [KaryawanController::class, 'laporan_perruang_grouping']); //api

    Route::post('/post_tobackend', [KaryawanController::class, 'post_tobackend']); //api




});
