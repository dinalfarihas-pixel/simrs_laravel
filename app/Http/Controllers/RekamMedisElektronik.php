<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http; 
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class RekamMedisElektronik extends Controller
{
    protected $ws_inv;
    protected $ws_simrs;

    public function __construct()
    {

        if(config('app.APP_DEBUG')==True)
        {
            $this->ws_inv = config('app.ws_inv_dev');
            $this->ws_simrs = config('app.ws_sim_dev');
        } 
        else
        {
            $this->ws_inv = config('app.ws_inv_prod');
            $this->ws_simrs = config('app.ws_sim_prod');
        }    
    } 

    public function simpan_input_cairan(Request $request)
    {
        try
        {    

            date_default_timezone_set("Asia/Jakarta"); 

            $json=[            
                "id_client"=>Session::get('id_client'),   
                "noregister"=>$request->noregister, 
                "nomr"=>$request->nomr, 
                "kd_ruangan"=>$request->kd_ruangan, 
                "nama_ruangan"=>$request->nama_ruangan, 
                "data"=>$request->data_balance, 
            ];      
            
            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/simpan_input_cairan'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 

    public function get_data_cairan(Request $request)
    {
        try
        {    
            $json=[            
                "id_client"=>Session::get('id_client'),   
                "noregister"=>$request->noregister, 
                "mode"=>$request->mode, 
                "tanggal"=>$request->tanggal, 
                "nomr"=>$request->nomr   
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_data_cairan'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 

    public function hapus_inputan_cairan(Request $request)
    {
        try
        {    
            $json=[            
                "id_client"=>Session::get('id_client'),   
                "noregister"=>$request->noregister, 
                "id"=>$request->id, 
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/hapus_inputan_cairan'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    }

    public function get_consent_pasien(Request $request)
    {
        try
        {    
            $json=[            
                "id_client"=>Session::get('id_client'),  
                "noregister"=>$request->noregister,  
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/get_consent_pasien'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    }

    public function simpantanda_list_penanggung_jawab(Request $request)
    {
        try
        {    
            $json=[            
                "id_client"=>Session::get('id_client'),  
                "noregister"=>$request->noregister, 
                "id_consent"=>$request->id_consent, 
                "data"=>$request->data['datasign']
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/simpantanda_list_penanggung_jawab'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    }

    public function simpan_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "nomr"=>$request->nomr,
                "estimasi_pulang"=>$request->estimasi_pulang,
                "pengaruh_pasien_keluarga"=>$request->pengaruh_pasien_keluarga,
                "pengaruh_pekerjaan"=>$request->pengaruh_pekerjaan,
                "pengaruh_keuangan"=>$request->pengaruh_keuangan,
                "antisipasi_masalah"=>$request->antisipasi_masalah,
                "antisipasi_masalah_penjelasan"=>$request->antisipasi_masalah_penjelasan,
                "bantuan_diperlukan"=>$request->bantuan_diperlukan,
                "ada_yang_membantu"=>$request->ada_yang_membantu,
                "ada_yang_membantu_ket"=>$request->ada_yang_membantu_ket,
                "hidup_sendiri"=>$request->hidup_sendiri,
                "hidup_sendiri_ket"=>$request->hidup_sendiri_ket,
                "pakai_alat_medis"=>$request->pakai_alat_medis,
                "pakai_alat_medis_ket"=>$request->pakai_alat_medis_ket,
                "perlu_alat_bantu"=>$request->perlu_alat_bantu,
                "perlu_alat_bantu_ket"=>$request->perlu_alat_bantu_ket,
                "perlu_perawatan_khusus"=>$request->perlu_perawatan_khusus,
                "perlu_perawatan_khusus_ket"=>$request->perlu_perawatan_khusus_ket,
                "masalah_kebutuhan_pribadi"=>$request->masalah_kebutuhan_pribadi,
                "masalah_kebutuhan_pribadi_ket"=>$request->masalah_kebutuhan_pribadi_ket,
                "nyeri_kronis"=>$request->nyeri_kronis,
                "nyeri_kronis_ket"=>$request->nyeri_kronis_ket,
                "perlu_edukasi"=>$request->perlu_edukasi,
                "perlu_edukasi_ket"=>$request->perlu_edukasi_ket,
                "perlu_keterampilan_khusus"=>$request->perlu_keterampilan_khusus,
                "perlu_keterampilan_khusus_ket"=>$request->perlu_keterampilan_khusus_ket,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/simpan_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function get_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/get_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function simpan_catatan_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "catatan"=>$request->catatan,
                "waktu"=>$request->waktu,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/simpan_catatan_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function get_catatan_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/get_catatan_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function update_catatan_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "id"=>$request->id,
                "noregister"=>$request->noregister,
                "catatan"=>$request->catatan,
                "waktu"=>$request->waktu,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/update_catatan_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function hapus_catatan_discharge_planning(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "id"=>$request->id,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/hapus_catatan_discharge_planning'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function hapus_ttd(Request $request)
    {
        try
        {
            $json= [
                "id_client"=>Session::get('id_client'),  
                "id"=>$request->id,  
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/hapus_ttd'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 

    public function laporan_verif_api(Request $request)
    {
        try
        {  
            
            date_default_timezone_set("Asia/Jakarta");
            $tglawal = $request->tglawal; 
            $tglakhir = $request->tglakhir; 
            $tglawal = date('Y-m-d', strtotime($tglawal)); 
            $tglakhir = date('Y-m-d', strtotime($tglakhir)); 

            $json= [            
                "id_client"=>Session::get('id_client'),   
                "mod"=>$request->mode,  
                "cara_bayar"=>5,  
                "tglawal"=>$tglawal, 
                "tglakhir"=>$tglakhir,  
                "kodeunit"=>$request->kodeunit,  
                "status_pulang"=>"SUDAH PULANG",
                "jenisrawat"=>"JALAN"
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/transaksi_pasien/get_rincian_klaimv2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 


    public function simpan_pemberian_obat(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),  
                "nama_obat"=>$request->nama_obat,  
                "dosis"=>$request->dosis,  
                "frekwensi"=>$request->frekwensi,  
                "rute"=>$request->ruteselected,  
                "waktu"=>$startdate,  
                "keterangan"=>$request->keterangan,  
                "nama_ruangan"=>$request->nama_ruangan, 
                "obat_dc"=>$request->obat_dc_selected,
                "noregister"=>$request->noregister   
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/simpan_pemberian_obat'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 

    public function getpemberian_obat(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),   
                "noregister"=>$request->noregister   
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/getpemberian_obat'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 

    public function hapus_pemberian_obat(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),    
                "id"=>$request->id,      
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/hapus_pemberian_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function simpan_rekonsiliasi_obat(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "nama_obat"=>$request->nama_obat,
                "kode_kfa"=>$request->kode_kfa,
                "dosis"=>$request->dosis,
                "frekwensi"=>$request->frekwensi,
                "rute"=>$request->rute,
                "obat_sebelumnya"=>$request->obat_sebelumnya,
                "sumber_informasi"=>$request->sumber_informasi,
                "status_rekonsiliasi"=>$request->status_rekonsiliasi,
                "obat_pengganti"=>$request->obat_pengganti,
                "alergi"=>$request->alergi,
                "keterangan_alergi"=>$request->keterangan_alergi,
                "keterangan"=>$request->keterangan,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/simpan_rekonsiliasi_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function update_rekonsiliasi_obat(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "id"=>$request->id,
                "nama_obat"=>$request->nama_obat,
                "kode_kfa"=>$request->kode_kfa,
                "dosis"=>$request->dosis,
                "frekwensi"=>$request->frekwensi,
                "rute"=>$request->rute,
                "obat_sebelumnya"=>$request->obat_sebelumnya,
                "sumber_informasi"=>$request->sumber_informasi,
                "status_rekonsiliasi"=>$request->status_rekonsiliasi,
                "obat_pengganti"=>$request->obat_pengganti,
                "alergi"=>$request->alergi,
                "keterangan_alergi"=>$request->keterangan_alergi,
                "keterangan"=>$request->keterangan,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/update_rekonsiliasi_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function getrekonsiliasi_obat(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/getrekonsiliasi_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function hapus_rekonsiliasi_obat(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "id"=>$request->id,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/hapus_rekonsiliasi_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function sinkron_obat_rs_rekonsiliasi(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/sinkron_obat_rs_rekonsiliasi'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function get_riwayat_rekonsiliasi_obat(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "nomr"=>$request->nomr,
                "exclude_noregister"=>$request->exclude_noregister,
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Resumepulang/get_riwayat_rekonsiliasi_obat'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            $body = $response->getBody()->getContents();
            return $body;
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function set_sudah_dilenkapi_klaim(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),    
                "noregister"=>$request->noregister,      
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/set_sudah_dilenkapi_klaim'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    }

    public function get_profesi()
    {
        try
        {    
            $json= [            
                "id_client"=>Session::get('id_client'),    
            ];     

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/get_profesi/19'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url_simrs, [  
                'json' => $json,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;   
        }
        catch(\Exception $e)
        {
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }  
    } 
    

}
