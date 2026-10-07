<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;  


class KaryawanController extends Controller
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

    public function getMasterKaryawan(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),   
                "mode"=>$request->mode   
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/get_empoloye_master'; // Replace this with the API endpoint URL 
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
    public function GetTransaksiPresensi(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),   
                "mode"=>$request->mode   
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/get_empoloye_master'; // Replace this with the API endpoint URL 
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

    public function reset_password(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Y-m-d H:i:s', strtotime($request->startdate)); 
            
            $json= [            
                "id_client"=>Session::get('id_client'),   
                "NIK"=>$request->NIK   
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/reset_password'; // Replace this with the API endpoint URL 
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

    public function get_ruangan(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
           
            $json= [            
                
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/getruangan/'.Session::get('id_client'); // Replace this with the API endpoint URL 
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

    public function getlaporan_personal(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Ym', strtotime($request->startdate)); 

            $ruangan = $request->id_ruangan;

            $json= [            
                
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/getlaporan_personal/'.$startdate."/".$ruangan."/".Session::get('id_client')."/"; // Replace this with the API endpoint URL 
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

    public function getlaporan_personal_perhari(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Ym', strtotime($request->startdate));  

            $json= [            
                "id_client"=>Session::get('id_client'),
                "id_karyawan"=>$request->id_karyawan,
                "bulan_tahun"=>$startdate, 
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/getdateils_harian'; // Replace this with the API endpoint URL 
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

    public function laporan_perbidang_grouping(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Ym', strtotime($request->startdate));  

            $json= [            
                "id_client"=>Session::get('id_client'),
                "jenis_peg"=>"NON ASN",//$request->jenis_peg,
                "tahunbulan"=>$startdate, 
                "mode"=>""
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/laporan_perbidang_grouping'; // Replace this with the API endpoint URL 
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

    
    public function laporan_perruang_grouping(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Ym', strtotime($request->startdate));  

            $json= [            
                "id_client"=>Session::get('id_client'),
                "jenis_peg"=>"NON ASN",//$request->jenis_peg,
                "tahunbulan"=>$startdate, 
                "mode"=>"",
                "id_bidang"=>$request->id_bidang,
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/presensi/presensi/laporan_perruang_grouping'; // Replace this with the API endpoint URL 
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

    public function post_tobackend(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");
            $startdate = date('Ym', strtotime($request->startdate));  

            $json= [            
                "id_client"=>Session::get('id_client'),
                "nik"=>$request->nik,
                "nama"=>$request->nama, 
                "profesi"=>$request->profesi['profesi'],
                "password"=>$request->password, 
            ];      

            $url_simrs =  $this->ws_simrs.'index.php/api/data_referensi/post_tobackend'; // Replace this with the API endpoint URL 
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


}
