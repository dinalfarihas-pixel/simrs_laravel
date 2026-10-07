<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController; 
use App\Http\Controllers\PersediaanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DatareferensiController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\DatakunjunganpasienController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\PerencanaanController;
use App\Http\Controllers\SatusehatController;

use App\Http\Controllers\PenunjangController;
use App\Http\Controllers\UploadController;

use App\Http\Controllers\PurchasingController;

use App\Http\Controllers\BpjsApiController;


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

    Route::get('/laporan-opname', function () {
        return view('persediaan.stockopname.laporan_so'); });
    

            

    Route::get('/penerimaan-barang', function () {
        return view('persediaan.penerimaan_barang'); });

    Route::get('/laporan-rekap-penerimaan', function () {
            return view('persediaan.penerimaan_rekap'); });

    Route::get('/unautorized', function () {
        return view('unautorized'); })->name('unautorized'); 

    Route::get('/resume-pulang', function () {
        return view('datakunjungan.resumepulang'); }); 

        
    Route::get('/peresepan-monitoring', function () {
        return view('monitoring.peresepanmonitoring'); }); 


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

    Route::group(['middleware'=>['penunjang']], function(){   
        
        // Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii
        // Route::get('/homepage', function () {
        //     return view('homepage'); }); 
        Route::post('/datakunjunganpasien', [DashboardController::class, 'datakunjunganpasien']); 
        
        Route::get('/data_rumahsakit', [LoginController::class, 'data_rumahsakit']); //progile RS
        
        Route::get('/persediaan', [PersediaanController::class, 'laporan_persediaan_transaksi']);    


        Route::post('/getdatabarang_foropname', [PersediaanController::class, 'getdatabarang_foropname']);  
        
    
        Route::get('/itembarang', [PersediaanController::class, 'persediaan_master']);

      
        

        Route::post('/simpan_stock_opaname', [PersediaanController::class, 'simpan_stock_opaname']);
        Route::post('/laporan_stock_opname', [PersediaanController::class, 'laporan_stock_opname']);

       
        

        Route::post('/get_jenis', [PersediaanController::class, 'get_jenis']);

        Route::post('/insert_itembarang', [PersediaanController::class, 'insert_itembarang']);
    
        Route::get('/laporanpenerimaan', [PersediaanController::class, 'laporan_penerimaan']);
    
        Route::post('/datalaporan_penerimaan', [PersediaanController::class, 'datalaporan_penerimaan']); //api 

        Route::post('/datalaporan_penerimaan_rekap', [PersediaanController::class, 'datalaporan_penerimaan_rekap']); //api  

        Route::post('/batalkan_penerimaan', [PersediaanController::class, 'batalkan_penerimaan']); //api   
     
        Route::get('/pemakaianobat', [PersediaanController::class, 'pemakaianobat_page']);   
    
        Route::post('/getdatapemakaianobat', [PersediaanController::class, 'getdatapemakaianobat']); //api 

        Route::post('/get_masterbarang', [PersediaanController::class, 'get_masterbarang']); //api  
        

        Route::post('/get_data_supplier', [PersediaanController::class, 'get_data_supplier']); //api 

        Route::post('/get_masterbarang_untukperencanaan', [PersediaanController::class, 'get_masterbarang_untukperencanaan']); //api 

        Route::post('/save_permintaan', [PersediaanController::class, 'save_permintaan']); //api  
    
        Route::post('/persediaan_data', [PersediaanController::class, 'data_laporan_persediaan_transaksi']); //api 
    
        Route::post('/rekap_transfer_bulanan', [PersediaanController::class, 'rekap_transfer_bulanan']); //api  

        Route::post('/distribusi-api', [PersediaanController::class, 'distribusi_data']); //api  
    
        Route::get('/kunjunganpasien', [DashboardController::class, 'datakunjnganHarian']);  ///kunjungan pasien harian 

        Route::post('/okupasi_bed', [DashboardController::class, 'okupasi_bed']);
    
        Route::post('/datakunjunganharian', [DashboardController::class, 'datakunjunganharian']); //api 
    
        Route::get('/gettahun', [PersediaanController::class, 'getdatatahun']);
    
        Route::get('/dashboard2', [DashboardController::class, 'dashboard_kunjungan']);
    
        Route::post('/getdatapersediaan', [PersediaanController::class, 'getdata']); 
        
        Route::post('/save_penerimaan', [PersediaanController::class, 'save_penerimaan']); 
        

        Route::post('/getdata_kategori', [PersediaanController::class, 'getdata_kategori']);  
       
        Route::post('/getdata_satuan', [PersediaanController::class, 'getdata_satuan']); 

        Route::post('/getdata_grouping', [PersediaanController::class, 'getdata_grouping']); 

        Route::post('/getdetails_barang', [PersediaanController::class, 'getdetails_barang']);  
        
        Route::post('/update_itembarang', [PersediaanController::class, 'update_itembarang']); 

        Route::post('/add_itembarang_to_mylocation', [PersediaanController::class, 'add_itembarang_to_mylocation']); 
        
        
        Route::post('/getdata_obat_baseparam', [PersediaanController::class, 'getdata_obat_baseparam']); 

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

        ///IGD
        Route::get('/datarawatpasien_v2', function () {
            return view('igd.triase_igd'); });   

        //SATU SEHAT
        Route::post('/datapasiensatusehat', [SatusehatController::class, 'datapasiensatusehat']); //api  
        Route::post('/datapasienpertransaksi', [SatusehatController::class, 'datapasienpertransaksi']); //api  
        
        
        Route::get('/satusehatmonitoring', function () {
            return view('satusehat.satusehat'); });    

        Route::get('/signup', function () {
            return view('karyawan.signup'); });   

        //TTE
        Route::get('/dosign', function () {
            return view('tte.dosign'); });  
            
        Route::get('/list_tte', function () {
                return view('tte.listttd'); });  
        
        //RADIOLOGI
        Route::get('/radiologi', function () {
            return view('radiologi.listorderradiologi'); });  

        Route::get('/print-radiologi', function () {
                return view('radiologi.printradiologi'); });  
    
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
        /// 

        Route::post('/get_user', [SatusehatController::class, 'get_user']); //api  
        Route::post('/uploaddata', [SatusehatController::class, 'uploaddata']); //api  

        Route::post('/getlist_ttd', [SatusehatController::class, 'getlist_ttd']); //api  
        Route::post('/ttd-api-checkuser', [SatusehatController::class, 'ttd_api']); //api  
 
        Route::post('/hapus_tte', [SatusehatController::class, 'hapus_tte']); //api  
        
        Route::post('/ttd_file', [SatusehatController::class, 'ttd_file']); //api   

        //getdata pasien 
        Route::post('/getpasien_api', [DatakunjunganpasienController::class, 'getpasien_api']); //api  
        Route::post('/datarawatpasien_baseparam_api', [DatakunjunganpasienController::class, 'datarawatpasien_baseparam_api']); //api  
        Route::post('/getnamaruangan_poli', [DatakunjunganpasienController::class, 'getnamaruangan_poli']); //api  

        

        Route::post('/pasien_sedang_rawat_inap', [DatakunjunganpasienController::class, 'pasien_sedang_rawat_inap']); //api  

        Route::post('/getruangan_user_login', [DatakunjunganpasienController::class, 'getruangan_user_login']); //api  

        Route::post('/pasien_pindah_ruangan', [DatakunjunganpasienController::class, 'pasien_pindah_ruangan']); //api  
        
        //triase  
        Route::post('/get_triase_form', [SatusehatController::class, 'get_triase_form']); //api 
        Route::post('/simpan_triase', [SatusehatController::class, 'simpan_triase']); //api 

        //soap
        Route::post('/simpan_soap', [SatusehatController::class, 'simpan_soap']); //api 
        Route::post('/get_soap', [SatusehatController::class, 'get_soap']); //api 
        Route::post('/hapus_soap', [SatusehatController::class, 'hapus_soap']); //api 

        Route::post('/get_referensi_triase', [SatusehatController::class, 'get_referensi_triase']); //api

        //header
        Route::post('/input_header_triase', [SatusehatController::class, 'input_header_triase']); //api 
        Route::post('/get_carapakai_obat', [SatusehatController::class, 'get_carapakai_obat']); 
        Route::post('/kirimpermintaan_obat', [SatusehatController::class, 'kirimpermintaan']); 

        Route::post('/update_stts_obat_pulang', [SatusehatController::class, 'update_stts_obat_pulang']);  


        Route::post('/getheader_sales', [SatusehatController::class, 'getheader_sales']); 
        Route::post('/getdetils_sales', [SatusehatController::class, 'getdetils_sales']); 
        Route::post('/get_data_kco', [SatusehatController::class, 'get_data_kco']);//apiii

        Route::post('/data_obat_pulang', [SatusehatController::class, 'data_obat_pulang']);//apiii

        Route::post('/simpan_resume_pulang', [SatusehatController::class, 'simpan_resume_pulang']);//apiii

        Route::post('/updatepulang_tgl_pulang', [SatusehatController::class, 'updatepulang_tgl_pulang']);//apiii
        

        Route::post('/getdata_resume_pulang_pasien', [SatusehatController::class, 'getdata_resume_pulang_pasien']);//apiii

        Route::post('/void_sales', [SatusehatController::class, 'void_sales']);//apiii
        Route::post('/kirim_resep', [SatusehatController::class, 'kirim_resep']);//apiii   
        Route::post('/getheader_penunjang', [SatusehatController::class, 'getheader_penunjang']);//apiii 
        Route::post('/getdatahasil_lab', [SatusehatController::class, 'getdatahasil_lab']);//apiii  

        ///penunjang
        Route::post('/listorderPenunjang', [PenunjangController::class, 'listorderPenunjang']);//apiii 
        Route::post('/get_detail_radiologi', [PenunjangController::class, 'get_detail_radiologi']);//apiii 


        
        Route::post('/simpanhasil_bacaradiologi', [PenunjangController::class, 'simpanhasil_bacaradiologi']);//apiii 
        ///upload file
        Route::post('/uploadlampiran', [UploadController::class, 'uploadlampiran']);//apiii   
        

        Route::post('/getdata_lampiran', [UploadController::class, 'getdata_lampiran']);//apiii  
        
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
    }); 

    Route::post('/timeservice-api', [MonitoringController::class, 'waktu_layan_monitoring']); //api  

    Route::post('/getdata_antrean', [MonitoringController::class, 'getdata_antrean']);//apiii


    Route::post('/timeservice_breakdown-api', [MonitoringController::class, 'waktu_layan_monitoring_breakdown']); //api  
    Route::post('/get_menu', [LoginController::class, 'get_menu']);//apiii 
    
    
    Route::get('/getusername', [LoginController::class, 'getusername']);//apiii


    Route::get('/get_lokasi_tovue', [LoginController::class, 'get_lokasi_tovue']);

    Route::post('/get_kode_unit_user', [LoginController::class, 'get_kode_unit_user']);//apiii
    Route::post('/get_banner', [LoginController::class, 'get_banner']);//apiii 

    ///get api BPJS 
    Route::post('/datadokter-bpjs-api', [BpjsApiController::class, 'get_url_antrol']); //api  
    Route::post('/datapoli-bpjs-api', [BpjsApiController::class, 'getdata_poli_bpjs']); //api  
    // 
     
    Route::post('/simpan_edit_dokter', [DatareferensiController::class, 'simpan_edit_dokter']); //api  
 
    Route::get('/timeservice', function () {
        return view('monitoring.timeservice'); });  
    
});
