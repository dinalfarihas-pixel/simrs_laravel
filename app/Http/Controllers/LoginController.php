<?php

namespace App\Http\Controllers;
// use Illuminate\Foundation\Auth\AuthenticatesUsers;
// use Illuminate\Http\Request; 
// use Illuminate\Support\Facades\Auth;
// use Session;
// use GuzzleHttp\Client;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str; 


class LoginController extends Controller
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

    public function index()
    { 
        return view('loginform'); 
    }

    public function authentication(Request $request)
    {    
       
        $datalogin = $this->getdatalogin($request); 
       
        $user = json_decode($datalogin,true);

        //VAR_DUMP($user);
       
        if((int)$user['metadata']['code']==200)
        {     
            //dd($user['response']); 
            Session::flush();
            Session::regenerate();
            Session::put('success',1);  
            Session::put('password_sess',$request->password);  
            Session::put('user_id',$request->username);  
            Session::put('id_client',$user['response']['ID_CLIENT']);  
            Session::put('username',$user['response']['NAMA_USER']);  
            Session::put('groupuser',$user['response']['GROUP_USER']);  
            Session::put('kodedokter',$user['response']['KD_DOKTER']);  
            Session::put('nik',$user['response']['NIK']);  
            Session::put('kodedokter_bpjs',$user['response']['KD_DOKTER_BPJS']);  
            Session::put('id_lokasi',$user['response']['ID_LOKASI']);  
            Session::put('lokasi_inv',$user['response']['ID_LOKASI_INV']);  
            Session::put('lokasi_caption',$user['response']['LOK_CAPTION']);  

            Session::put('JENIS_NOINDUK',$user['response']['JENIS_NOINDUK']);   
            Session::put('NOINDUK',$user['response']['NOINDUK']);  
            Session::put('JABATAN',$user['response']['JABATAN']);   
            Session::put('USER_IGD',$user['response']['IS_USER_IGD']);  

            Session::put('kodeunit_login',$user['response']['KDUNIT']);  
  
             
            // Session::put('inv',"https://ws-simrs.link/ws_posindo_v2.1"); 
            // Session::put('simrs',"https://ws-simrs.link/ws_sim_v2"); 

            $profile_rs = $this->getprofile_rs($user['response']['ID_CLIENT']);
            $profile_rs = json_decode($profile_rs,true); 

            Session::put('nama_rs',$profile_rs['NAMA_RS']);  
            Session::put('LINK_LOGO',$profile_rs['LINK_LOGO']);  
            Session::put('alamat',$profile_rs['ALAMAT']);   
            Session::put('banner_rs',$profile_rs['banner_rs']);   
            Session::put('satu_sehat_idclient',$profile_rs['satu_sehat_idclient']);  
            Session::put('satu_sehat_client_secret',$profile_rs['satu_sehat_client_secret']);  

            //return redirect()->intended('/dashboard-umum');
            return redirect()->intended('/dashboard-umum');
        }  

        $request->session()->put('success',0);
       
        return back()->with('loginError','Login failed');  
    }

    public function get_banner()
    {
        return Session::get('banner_rs');
    }

    public function get_lokasi_tovue()
    {
        $json = [
            'data'=>(int)Session::get('lokasi_inv')
        ];
        return $json;
    }

    public function datajabatan_user()
    {
        $json = [
            'JENIS_NOINDUK'=>Session::get('JENIS_NOINDUK'),
            'NOINDUK'=>Session::get('NOINDUK'),
            'JABATAN'=>Session::get('JABATAN')
        ];
        return $json;
    }

    public function data_rumahsakit()
    {
        $json = [
            "logo"=>Session::get('LINK_LOGO'),
            "nama_rs"=>Session::get('nama_rs'), 
            "alamat"=>Session::get('alamat'), 
            "kop_surat"=>Session::get('kop_surat'), 
        ];

        return response()->json( 
            $json
         ); 
    }

    public function get_kode_unit_user()
    {
        return Session::get('kodeunit_login').","; //MENAMBAHKAN KOMA AGAR BISA DI SPLIT
    } 
    public function getusername()
    {
        return Session::get('username'); //MENAMBAHKAN KOMA AGAR BISA DI SPLIT
    } 

    public function logout()
    {
        Session::flush(); 
        return redirect()->intended('/login');
    }

    public function getdatalogin(Request $request)
    {
        
        $client = new Client(['verify' => false]);

        $url =$this->ws_simrs."index.php/api/data_referensi/userloginv3";  
        //$url =$url."index.php/api/data_referensi/userlogin_v2?pass=".$request->password."&UserName=".$request->username;  
        // $client = new Client(['verify' => false]);
        //$publicPath = public_path();
        //$filePath = $publicPath . '/assets/cacert.pem';
        $client = new Client(['verify' =>false]);
        $json = [
            'pass'=>$request->password,
            'username'=>$request->username, 
        ];
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

    public function get_menu()
    {
        
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $url = "/index.php/api/data_referensi/get_menu";  
        

        $client = new Client(); 
        $json =[
            'id_client'=>Session::get('id_client'),
            'user_id'=>Session::get('user_id')
        ];
        $response = $client->get($url_simrs.$url , [
            'json' =>  $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);  

       
        $body = $response->getBody()->getContents();
        Session::put('menu',$body);  

        return $body; 
    }

    public function getprofile_rs($id_client)
    {
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $url = $url_simrs."/index.php/api/Data_referensi/get_profile_rs/".$id_client;  
        $client = new Client();
        $response = $client->get($url , [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        return $body; 
    }  

    public function chagepassword(Request $request)
    {  

        $passlama = Session::get('password_sess'); 
     
        if($passlama!=$request->passwordlama)
        {
            $arr = ["code"=>201,"message"=>"Password lama tidak cocok"];
            return json_encode($arr,true);
            exit();
        } 
        
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $url = $url_simrs."/index.php/api/data_referensi/update_password/".Session::get('user_id')."/".$request->ulangipasswordbaru."/".Session::get('id_client');  
        $client = new Client();
        $response = $client->post($url , [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        return $body; 
    }
}
