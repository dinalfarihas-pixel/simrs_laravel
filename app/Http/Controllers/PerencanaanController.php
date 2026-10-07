<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;

class PerencanaanController extends Controller
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
    public function save_header_perencanaan(Request $request)
    {
 
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL  
        $year = $request->year; 
        $year = date('Y', strtotime($year));    
        $client = new Client(); 
        $json = [   
            "caption"=>"",
            "tahun"=>$year,
            "user_id"=>Session::get('user_id'),
            "id_client"=>Session::get('id_client'),    
            "id_lokasi" =>Session::get('lokasi_inv'),// Session::get('lokasi_inv'),    
        ];  

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/save_header_perencanaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  
        
        $body = $response->getBody()->getContents();
       
        return $body; 
    }

    public function hapus_header_perencanaan(Request $request)
    {
 
      
        $plan_id = $request->plan_id;  
        $client = new Client(); 
        $json = [   
            "plan_id"=>$plan_id, 
            "user_id"=>Session::get('user_id'),
            "id_client"=>Session::get('id_client'),    
            "lokasi_inv" =>Session::get('lokasi_inv'),// Session::get('lokasi_inv'),    
        ];  

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/hapus_header_perencanaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  
        
        $body = $response->getBody()->getContents();
       
        return $body; 
    }


    public function getdata_perencanaan()
    {

        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL  
  
        $client = new Client(); 
        $json = [    
            "mode"=>1, 
            "id_client"=>Session::get('id_client'),    
            "id_lokasi" =>Session::get('lokasi_inv'),// Session::get('lokasi_inv'),    
        ];  

        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/get_data_perencanaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  
        
        $body = $response->getBody()->getContents();
       
        return $body; 
    }

    public function simpan_detail_perencanaan(Request $request)
    {
      
        $client = new Client(); 
        $json = [    
            "plan_id"=>$request->plan_id, 
            "barcode"=>$request->barcode,
            "qty"=>$request->qty,
            "harga"=>$request->harga,
            "id_client"=>Session::get('id_client'),    
            "lokasi_inv" =>Session::get('lokasi_inv'),// Session::get('lokasi_inv'),    
        ];  

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/simpan_detail_perencanaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  
        
        $body = $response->getBody()->getContents();
       
        return $body; 
    }

    public function get_masterbarang_perencanaan(Request $request)
    { 
 
        //$kategori = $request->kategori_barang['name'];  
   
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL  
        $client = new Client(); 
        $json = [   
            "id_client"=>Session::get('id_client'), 
            "lokasi_inv" =>Session::get('lokasi_inv'),
            "kategori"=>"",
            "mode"=>1, 
            "lokasi" =>"",// Session::get('lokasi_inv'),  
            "breakdown"=>"2",   
        ];  

        $response = $client->get($this->ws_simrs."index.php/api/barang/get_itembarang_perencanaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  
        
        $body = $response->getBody()->getContents();
       
        return $body; 
        
    }

    public function hapus_item_perencanaan(Request $request)
    {
         //$kategori = $request->kategori_barang['name'];  
   
       
         $client = new Client(); 
         $json = [    
             "plan_id"=>$request->plan_id, 
             "barcode"=>$request->barcode, 
             "id_client"=>Session::get('id_client'),    
             "lokasi_inv" =>Session::get('lokasi_inv'),// Session::get('lokasi_inv'),    
         ];  
 
         $response = $client->post($this->ws_simrs."index.php/api/data_referensi/hapus_item_perencanaan", [
             'json' => $json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);  
         
         $body = $response->getBody()->getContents();
        
         return $body; 
    }
    public function monitoring_perencanaan(Request $request)
    {
         //$kategori = $request->kategori_barang['name'];  
         $year = $request->year; 
         $year = date('Y', strtotime($year));    
       
         $client = new Client(); 
         $json = [     
             "id_client"=>Session::get('id_client'),    
             "mode"=>$request->mode,
             "tahun"=>$year

         ];  
 
         $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_report_perecenaan", [
             'json' => $json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);  
         
         $body = $response->getBody()->getContents();
        
         return $body; 
    }

    public function get_list_item(Request $request)
    {
         //$kategori = $request->kategori_barang['name'];  
         $year = $request->year; 
         $lokasi_inv = $request->lokasi_inv; 
         $year = date('Y', strtotime($year));    
       
         $client = new Client(); 
         $json = [     
             "id_client"=>Session::get('id_client'),     
             "tahun"=>$year,
             "mode"=>$request->mode,
             "barcode"=>$request->barcode,
             "lokasi_inv" =>$lokasi_inv,// Session::get('lokasi_inv'),     
         ];  
 
         $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_list_item", [
             'json' => $json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);  
         
         $body = $response->getBody()->getContents();
        
         return $body; 
    } 

    public function do_verif(Request $request)
    {
          //$kategori = $request->kategori_barang['name'];  
          $year = $request->year; 
          $lokasi = $request->lokasi; 
          $year = date('Y', strtotime($year));    
        
          $client = new Client(); 
          $json = [     
              "id_client"=>Session::get('id_client'),     
              "qty_approve"=>$request->approval_qty,
              "plan_id"=>$request->plan_id,
              "barcode"=>$request->barcode,
              "approval_id"=>Session::get('user_id'),   
              "lokasi_inv" =>$lokasi,// Session::get('lokasi_inv'),     
          ];  
  
          $response = $client->post($this->ws_simrs."index.php/api/data_referensi/do_verif", [
              'json' => $json,
              'headers' => [
                  'Content-Type' => 'application/json',
                  'Authorization' => '', // If the API requires an access token
              ]
          ]);  
          
          $body = $response->getBody()->getContents();
         
          return $body; 
    }

    
}
