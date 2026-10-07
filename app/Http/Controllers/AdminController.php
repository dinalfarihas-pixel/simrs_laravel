<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;    

class AdminController extends Controller
{
    //

    protected $ws_inv;
    protected $ws_simrs;

    public function __construct()
    {
        date_default_timezone_set("Asia/Jakarta");   

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

    public function get_user(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
            
            $json = [
                "id_client" => (int)Session::get('id_client'), 
            ];  
            // Validate required data
           
            $response = $client->post($this->ws_simrs."index.php/api/admin/get_user", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                
            ]); 
    
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    }

    public function get_data_all_ruangan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
            
            $json = [
                "id_client" => (int)Session::get('id_client'), 
            ];  
            // Validate required data
           
            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_data_all_ruangan", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                
            ]);
 
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    }



    public function simpan_update_user(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
            
            $json = [
                "id_client" => (int)Session::get('id_client'), 
                "id_lokasi"=>$request->ID_LOKASI,
                "ruangan"=>$request->ruangan_selected,
                "lokasi_selected"=>$request->lokasi_selected, 
                "kode_dokter"=>$request->KD_DOKTER,
                "kode_dokter_bpjs"=>$request->KD_DOKTER_BPJS,
                "nip"=>$request->NIP,
            ];  
            // Validate required data

            // var_dump(json_encode($json,true));
            // exit();
           
            $response = $client->post($this->ws_simrs."index.php/api/admin/simpan_update_user", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ], 
            ]);
 
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    } 

    public function get_all_menu(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
            
            $json = [
                "id_client" => (int)Session::get('id_client'),  
            ];  
            // Validate required data
           
            $response = $client->post($this->ws_simrs."index.php/api/admin/get_all_menu", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                
            ]);
 
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    }

    public function get_menu_assigned(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
            
            $json = [
                "id_client" => (int)Session::get('id_client'),  
                "nip" => $request->NIP
            ];  
            // Validate required data
           
            $response = $client->post($this->ws_simrs."index.php/api/admin/get_menu_assigned", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                
            ]);
 
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    }

    public function do_update_menu(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client();
 
 
            $json = [
                "id_client" => (int)Session::get('id_client'),  
                "data" =>$request->data, 
            ];   
          
            // Validate required data
           
            $response = $client->post($this->ws_simrs."index.php/api/admin/update_menu_user", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                
            ]);
 
            $body = $response->getBody()->getContents(); 
            return $body;   
        
        } catch (Throwable $e) {
            // Handle any other errors
            $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
            return response()->json([
                $json
            ]);
        }
    }


}
