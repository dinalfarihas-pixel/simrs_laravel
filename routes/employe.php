<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DatareferensiController;
use App\Http\Controllers\PersediaanController;

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


Route::group(['middleware'=>['oto']], function(){    


    Route::get('/admin/user-management', function () {
    return view('admin.user'); });  

    Route::post('/admin/get_user', [AdminController::class, 'get_user']); //api 
    Route::post('/admin/get_data_all_ruangan', [AdminController::class, 'get_data_all_ruangan']); //api 

    Route::post('/admin/simpan_update_user', [AdminController::class, 'simpan_update_user']); //api  

    Route::post('/admin/get_all_menu', [AdminController::class, 'get_all_menu']); //api  

    Route::post('/admin/get_menu_assigned', [AdminController::class, 'get_menu_assigned']); //api  


    Route::post('/admin/get_menu_assigned', [AdminController::class, 'get_menu_assigned']); //api  

    Route::post('/admin/do_update_menu', [AdminController::class, 'do_update_menu']); //api   
     

        
    Route::post('/sep/get_data_sep', [DatareferensiController::class, 'get_data_sep']); //api     

    Route::post('/transfer/cetak_surat_transfer', [DatareferensiController::class, 'getdetails_transfer_data_v2']); //api  
        
        

    Route::post('/persediaan/get_data_list_transfer_v3', [PersediaanController::class, 'get_data_list_transfer_v3']); //api     


    Route::post('/persediaan/proses_transferv2', [PersediaanController::class, 'proses_transferv2']); //api     

    

    Route::post('/persediaan/get_data_permintaan_barang_detail_v3', [PersediaanController::class, 'get_data_permintaan_barang_detail_v3']); //api     

    


    Route::get('/employe/list-emp', function () {
    return view('employe.listemploye'); });  

    
    Route::get('/persediaan/list-transfer', function () {
        return view('persediaan.transfer_barang.list_transfer'); });  


        
    Route::get('/persediaan/do-transfer', function () {
        return view('persediaan.transfer_barang.transfer_barang'); });  


    Route::get('/employe/report', function () {
    return view('employe.presensitrans'); });  



    Route::post('/getMasterKaryawan', [KaryawanController::class, 'getMasterKaryawan']); //api 
    Route::post('/reset_password', [KaryawanController::class, 'reset_password']); //api 


    Route::post('/admin/get_ruangan', [KaryawanController::class, 'get_ruangan']); //api 


    
    Route::post('/getlaporan_personal', [KaryawanController::class, 'getlaporan_personal']); //api 
    Route::post('/getlaporan_personal_perhari', [KaryawanController::class, 'getlaporan_personal_perhari']); //api 

 
    
    

});
