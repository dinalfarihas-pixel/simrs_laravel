<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http; 
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PurchasingController extends Controller
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

    public function getbarang(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    { 
        try
        {  
           
            $client = new Client();
            //$url=Session::get('inv');  
            $jsonParams = [
                'mode' =>14, //$request->mode,
                'id_client'=>Session::get('id_client'),
                'lokasi'=>Session::get('id_lokasi'), 
                'nama'=>$request->itembarang,
                'barcode'=>$request->barcode,
                'kategori'=>$request->kategori,
                'breakdown'=>0
            ]; 

            $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
                'json' => $jsonParams,
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
    public function save_pr(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    { 
        try
        {  
            

            date_default_timezone_set("Asia/Jakarta");
            $tglpermintaan = $request->tglpermintaan; 
            $tglpermintaan = date('Y-m-d H:m:s', strtotime($tglpermintaan)); 
        
            $client = new Client(); 
            $json = [
                'EDIT_MODE'=>$request->mode,
                'no_permintaan'=>$request->no_permintaan,
                'mode' => $request->mode,
                'id_client'=>Session::get('id_client'),
                'asal_permintaan'=>Session::get('lokasi_inv'), 
                'kategori'=>$request->kategoriselected['id'],
                'catatan'=>$request->catatan,
                'deskripsi'=>$request->deskripsi_telaah,
                'kepada'=>$request->lokasiSelected,
                'stts'=>0,
                'user_id'=>Session::get('user_id'),
                'tanggal'=>$tglpermintaan, 
                'details'=>$request->itemselected, 
            ];  
 

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/simpan_permintaan_barang", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function getlist_pr(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    { 
        try
        {   
            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  

            $bulan_tahun ="";
            if($request->mode==5)
            {
                $bulan_tahun = date('mY', strtotime($request->bulantahun)); 
            }

         
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d', strtotime($startdate)); 

            $enddate = $request->enddate; 
            $enddate = date('Y-m-d', strtotime($enddate)); 
            //$url=Session::get('inv');  
            $json = [
                'mode' => $request->mode,
                'id_client'=>Session::get('id_client'),
                'lokasi'=>Session::get('lokasi_inv'),   
                'no_permintaan'=>$request->no_permintaan,
                'startdate'=> $startdate,
                'bulantahun'=>$bulan_tahun,
                'enddate'=>$enddate
            ];  
 

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/get_data_permintaan", [
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

    public function getkategori_pr()
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();   
            //$url=Session::get('inv');  
            $json = [
                 
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/getkategori_pr", [
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
            return response()->json(
                $json
            );
        }  
    }
    
    public function push_disposisi(Request $request)
    {
        try
        {  
           

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client(); 
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d H:m:s', strtotime($startdate)); 
 
            //$url=Session::get('inv');  
            $json = [
                'user_id'=>Session::get('user_id'),
                'no_permintaan'=>$request->no_permintaan,
                'disposisi'=>$request->content_disposisi,
                'tanggal_dispp'=>$startdate,
                'id_client'=>Session::get('id_client') 
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/push_disposisi", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function get_disposisi(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client(); 
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d H:m:s', strtotime($startdate)); 
 
            //$url=Session::get('inv');  
            $json = [ 
                'no_permintaan'=>$request->no_permintaan, 
                'id_client'=>Session::get('id_client') 
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/get_disposisi", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function forward_pr(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    { 
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client(); 
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d', strtotime($startdate)); 

            $enddate = $request->enddate; 
            $enddate = date('Y-m-d', strtotime($enddate)); 
            //$url=Session::get('inv');  
            $json = [
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client'), 
                'no_permintaan'=>$request->no_permintaan, 
                'disposisi'=>$request->disposisi, 
                'kepada'=>$request->lokasiSelected,
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/forward_pr", [
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

    public function update_sudah_baca(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client(); 
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d H:m:s', strtotime($startdate)); 
 
            //$url=Session::get('inv');  
            $json = [ 
                'no_pr'=>$request->no_pr, 
                'id'=>$request->id, 
                'id_client'=>Session::get('id_client') 
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/update_sudah_baca", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function do_approval(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client(); 
            $startdate = $request->startdate; 
            $startdate = date('Y-m-d H:m:s', strtotime($startdate));  
            //$url=Session::get('inv');  
            $json = [ 
                'no_pr'=>$request->no_permintaan, 
                'id'=>$request->id, 
                'id_lokasi'=>Session::get('lokasi_inv'),     
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];  

            $response = $client->post($this->ws_inv."index.php/api/purchase_order/do_approval", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function proses_telaah(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  
            
            //$url=Session::get('inv');  
            $json = [ 
                'no_pr'=>$request->no_permintaan,
                'barcode'=>$request->barcode,  
                'qty_acc'=>$request->qty_acc,  
                'harga'=>$request->harga,  
                'catatan'=>$request->catatan,   
                'sub_total'=>$request->qty_acc * $request->harga,  
                'id_lokasi'=>Session::get('lokasi_inv'), 
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];   

            
            $response = $client->post($this->ws_inv."index.php/api/purchase_order/proses_telaah", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function deleted_telaah(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  
            
            //$url=Session::get('inv');  
            $json = [ 
                'no_pr'=>$request->no_permintaan, 
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];    
           
            $response = $client->post($this->ws_inv."index.php/api/purchase_order/deleted_telaah", [
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
            return response()->json(
                $json
            );
        }  
    }
    
    
    public function counting_notif(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  
            
            //$url=Session::get('inv');  
            $json = [ 
                'lokasi'=>Session::get('lokasi_inv'),  
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];    
           
      
            $response = $client->post($this->ws_inv."index.php/api/purchase_order/counting_notif", [
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
            return response()->json(
                $json
            );
        }  
    }
    public function list_timeline(Request $request)
    {
        try
        {   

            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  
            
            
            $json = [ 
                'no_permintaan'=>$request->no_permintaan, 
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];     
      
            $response = $client->post($this->ws_inv."index.php/api/purchase_order/timeline_pr", [
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
            return response()->json(
                $json
            );
        }  
    }

    public function simpan_po(Request $request)
    {
        try
        {   
           
            date_default_timezone_set("Asia/Jakarta");
            $client = new Client();  
            $tanggal_po = date('Y-m-d', strtotime($request->tanggal_po));  
            
            $json = [ 
                'kd_supplier'=>$request->supplier_selected['IDSUPLIER'], 
                'tgl_po'=>$tanggal_po, 
                'no_pr'=>$request->no_permintaan, 
                'details'=>$request->details_po,
                'user_id'=>Session::get('user_id'),
                'id_client'=>Session::get('id_client') 
            ];      
          
            $response = $client->post($this->ws_inv."index.php/api/purchase_order/simpan_po", [
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
            return response()->json(
                $json
            );
        }  
    }




}
