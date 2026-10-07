<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon; 

class KlaimManajemenController extends Controller
{    

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


    public function dashboard_data_klaim(Request $request)
    {
        try
        {  
            date_default_timezone_set("Asia/Jakarta");    
 
            $isoDate = $request->startdate;
            
            $fixed = date('Y-m-d', strtotime($isoDate)); 
         

            $enddate = $request->enddate;

            $enddate = date('Y-m-d', strtotime($enddate)); 
            $json=[     
                "tanggal"=>$fixed,
                "tglawal"=>$fixed,
                "tglakhir"=>$enddate,
                "jenisrawat"=>$request->jenisrawatSelected,
                "mod"=>"history2",
                "cara_bayar"=>$request->carabayarSelecated,
                "status_pulang"=>$request->statuspulangSelected, 
                "bulan_tahun"=>"",
                "user_id"=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),    
            ];       
           

            $url = $this->ws_simrs.'index.php/api/transaksi_pasien/get_rincian_klaimv2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url,[  
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

    public function dashboard_data_klaim_get_dx(Request $request)
    {
        try
        {  
            date_default_timezone_set("Asia/Jakarta");    
 
            $isoDate = $request->startdate;
            $fixed = date('Y-m-d', strtotime($isoDate)); 

            $json=[                    
                "user_id"=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),    
            ];       

            $url = $this->ws_simrs.'index.php/api/transaksi_pasien/get_data_klaim/'.$request->NOSEP."/".Session::get('id_client'); // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url,[  
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

    public function getdatabiliing(Request $request)
    {
        try
        {  
            date_default_timezone_set("Asia/Jakarta");    
 
            $isoDate = $request->startdate;
            $fixed = date('Y-m-d', strtotime($isoDate)); 

            $json=[                    
                "user_id"=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),    
            ];       

            $url = $this->ws_simrs.'index.php/api/laporan/get_data_lpk_pasien/'.$request->NOSEP."/".$request->NOMR."/".Session::get('id_client'); // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url,[  
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
