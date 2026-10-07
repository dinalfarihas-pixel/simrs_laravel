<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatakunjunganpasienController;
use App\Http\Controllers\PersediaanController;
use App\Http\Controllers\BpjsApiController;
use App\Http\Controllers\SatusehatController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\DatareferensiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/ping', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/datakunjungan-api', [DatakunjunganpasienController::class, 'call_icare']); //api

Route::post('/datadokter-bpjs-api', [BpjsApiController::class, 'get_url_antrol']); //api
Route::post('/datapoli-bpjs-api', [BpjsApiController::class, 'getdata_poli_bpjs']); //api
Route::post('/getdata_kategori', [PersediaanController::class, 'getdata_kategori']);


// In routes/api.php or routes/web.php
Route::post('/generate_token_ss', [SatusehatController::class, 'generate_token_ss']);


Route::post('/uploadlampiran', [UploadController::class, 'uploadlampiran']);//apiii


Route::post('/uploadlampiran_for_api', [UploadController::class, 'uploadlampiran_for_api']);//apiii

Route::post('/hapus_datalampiran_for_api', [UploadController::class, 'hapus_datalampiran_for_api']);//apiii

// Proxy gambar storage untuk PDF export (CORS-safe)
Route::get('/proxy-image', [UploadController::class, 'proxy_image']);


Route::get('/data_kfa', [SatusehatController::class, 'data_kfa']); //api

// Versi stateless dari /data_kfa: menerima id_client sebagai parameter alih-alih
// bergantung pada sesi browser (Session::get('satu_sehat_idclient'/'satu_sehat_client_secret')).
Route::get('/data_kfa_api', [SatusehatController::class, 'data_kfa_api']); //api

Route::post('/get_user', [AdminController::class, 'get_user']); //api
Route::post('/get_user2', [SatusehatController::class, 'get_user2']); //api

Route::post('/datapoli-bpjs-api', [BpjsApiController::class, 'getdata_poli_bpjs']); //api
Route::post('/decript_dekompresi', [BpjsApiController::class, 'decript_dekompresi']); //api

Route::get('/addcaraBayar', [DatareferensiController::class, 'addcaraBayar']); //api



Route::get('/cetak_diet_pasien', [DatareferensiController::class, 'cetak_1']); //api


Route::post('/getdata_print_out_list_diet', [DatareferensiController::class, 'getdata_print_out_list_diet']); //api


Route::post('/cetak_list_diet', [DatareferensiController::class, 'cetak_list_diet']); //api



Route::post('/get_data_sep_api', [DatareferensiController::class, 'get_data_sep_api']); //api
Route::post('/get_data_sep_nonjkn', [DatareferensiController::class, 'get_data_sep_nonjkn']); //api
// Route::post('/get_data_sep_nonjkn', [DatareferensiController::class, 'get_data_sep_nonjkn']); //api
// Route::post('/get_data_sep_nonjkn', [DatareferensiController::class, 'get_data_sep_nonjkn']);



Route::post('/setRujukan', [DatareferensiController::class, 'setRujukan']); //api



Route::post('/printResume_medis', [SatusehatController::class, 'printResume_medis']); //api



Route::post('/ttd_file_v3', [SatusehatController::class, 'ttd_file_v3']); //api

Route::post('/generateSPRI', [DatareferensiController::class, 'generateSPRI']); //api

Route::post('/simpan_konsul', [SatusehatController::class, 'simpan_konsul']);

Route::post('/get_riwayat_konsul', [SatusehatController::class, 'get_riwayat_konsul']);


    //

