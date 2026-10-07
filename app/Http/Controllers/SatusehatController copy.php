<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Http; 
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SatusehatController extends Controller
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

    public function datapasiensatusehat(Request $request)
    {   
       
        date_default_timezone_set("Asia/Jakarta");
        $startdate = $request->startdate; 
        $enddate = $request->enddate; 
        $selectedJenisRawat = $request->selectedJenisRawat['code']; 
        $startdate = date('Y-m-d', strtotime($startdate)); 
        $enddate = date('Y-m-d', strtotime($enddate));  
         
        $client = new Client();  
        $json = [
            "id_client"=>Session::get('id_client'),    
            "tglawal"=>$startdate,
            "tglakhir"=>$enddate,
            "jenisrawat"=>$selectedJenisRawat,
            "mod"=>"history20",  
        ];   
        
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/history3", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        
        return $body; 
    }
    public function datapasienpertransaksi(Request $request)
    {   
       
        date_default_timezone_set("Asia/Jakarta"); 
         
        $client = new Client();  
        $json = [
            "id_client"=>Session::get('id_client'),     
            "noregister"=>$request->noregister,  
            "mod"=> $request->mode,  
            "jenisrawat"=>""

        ];   
        
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/history3", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        
        return $body; 
    }

    public function get_user()
    {
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL 
        $client = new Client();
        $json = [];
        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/get_user/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        
        return $body; 
    }

    public function validations(Request $request)
    {
        $data = json_decode($request->input('data'),true); 
        if(!$request->hasFile("pdf_file"))
        {
            $json = ["message"=>"Tidak terdapat lampiran file",
            "code"=>201];
             return $json;      
        }

        if($data['nama_dokumen']=="")
        {
            $json = ["message"=>"Nama dokument wajib di isi",
            "code"=>201];
            return $json;        
        } 

        if($data['nomor_surat']=="")
        {
            $json = ["message"=>"Nomor surat wajib di isi",
            "code"=>201];
            return $json;    
        }  
        if($data['passphrase']=="")
        {
            $json = ["message"=>"Passpharase wajib di isi",
            "code"=>201];
            return $json;    
        }  
    
        if(count($data['user_dipilih'])==0)
        {
            $json = ["message"=>"Pilih user untuk pengajuan tanda tangan",
            "code"=>201];
            return $json;    
        }
       

        if(count($data['user_dipilih'])>1)
        {
            $json = ["message"=>"Tidak dapat memilih lebih dari satu penanda tangan",
            "code"=>201];
            return $json;     
        } 
        $fileSize = $request->file('pdf_file')->getSize();
               
        $fileSize = $fileSize/1000;

        if($fileSize>2000)
        {
            $json = ["message"=>"Gagal upload, Maksimal ukuran file 2000 kb",
            "code"=>201];
            return $json;     
            exit();
        }
        $json = ["message"=>"Success validation",
            "code"=>200];
            return $json;    
    }  

    public function sign_directly(Request $request)
    {
        $res = $this->ttd_file($request);  
        if($res['code']==200)
        {
            
        }
        return response()->json( 
            $res                     
        );  
    }

    public function input_todb(Request $request, $sudah_tte=0)
    {


        $file= $request->file('pdf_file');

        $file_name =time().''.$file->getClientOriginalName();    
        $data = json_decode($request->input('data'),true); 
        $timestamp = now()->timestamp; // Get the current timestamp
        $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
        //$hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm
        $user_attch=[]; 

        $json = [ 
            "noreff"=>$hashCode, 
            "trans_id"=>$hashCode, 
            "nama_dokument"=>$data['nama_dokumen'], 
            "user_ttd"=>$data['user_dipilih'],
            "sudah_ttd"=>$sudah_tte,
            "jlm_halaman"=>$data['halaman'],
            "lampiran_file"=>$file_name, 
            "signature"=>$data['signature'],
            "nomor_surat"=>$data['nomor_surat'], 
            "id_client"=>Session::get('id_client'),    
        ];     
                
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL 
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/simpan_pengajuan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]); 
        $body = $response->getBody()->getContents();
        
        return $body; 
    }

    public function uploaddata(Request $request)
    { 
        try{   
      
                $data = json_decode($request->input('data'),true); 
                $res =$this->validations($request);  
               
                if($res['code']==201)
                {
                    return response()->json( 
                        $res                     
                    ); 
                    exit();
                } 

                $file= $request->file('pdf_file');
                
                // $res = $this->ttd_file($request);
                // return response()->json( 
                //     $res                     
                // ); 
                // exit();
                $file_name =time().''.$file->getClientOriginalName();    

                //$file->move(public_path('storage/TTD'), $file_name);   
                $path = storage_path('app/public/TTD/'.$file_name); //LOCAL (DEBUG)

                $timestamp = now()->timestamp; // Get the current timestamp
                $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
                //$hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm
                $user_attch=[];  
                
                $body =$this->input_todb($request);
                return $body; 

                // return response()->json([
                //     "message"=> $data['startdate']//json_encode($data['user_dipilih'],true)
                // ]);
            
        }catch(\Exception $e){
            $json = ['code'=>201,'message' => $e->getMessage(),'perihal'=>$data['nama_dokumen']]; 
            return response()->json([
                $json
            ]);
            
        }  
    }

    public function get_count_pages($path)
    { 
             
        $pdf = file_get_contents('pdf/'.$path); 

        var_dump($pdf);
        exit();

        $number = preg_match_all("/\/Page\W/", $pdf, ""); 
        return $number; 
      
    }

    public function ttd_file(Request $request)
    {
        try
        {    
            $json = [ 
                "mode"=>1,  
                "id_client"=>Session::get('id_client'),    
            ];    
            
            $res =$this->validations($request);   
            if($res['code']==201)
            {
                return response()->json( 
                    $res                     
                ); 
                exit();
            }  


            foreach ($request->file('pdf_file') as $file) { 

                
                //$file= $request->file('pdf_file');    
                $data = json_decode($request->input('data'),true); 
                //$data = json_decode($request->input('data'),true); 
                $url_tte = 'http://10.0.8.200/api/sign/pdf'; // Replace this with the API endpoint URL 
                $client = new Client();
                $response = $client->post('http://10.0.8.200/api/sign/pdf',[
                    'auth'=>[
                        'esign', 'qwerty'
                    ],
                    
                    'multipart' => [
                        // [
                        //     'name'     =>'file',
                        //     'contents' => $file,
                        //     'filename' => $file_name
                        // ],
                        [
                            'name' => 'file',
                            'contents' => fopen($request->file('pdf_file')->getPathname(), 'r'),
                            'filename' => $request->file('pdf_file')->getClientOriginalName()
                        ], 
                        [
                            'name'     => 'linkQR',
                            'contents' => 'https://google.com',
                        ],
                        [
                            'name'     => 'image',
                            'contents' => true,
                        ], 
                        [
                            'name' => 'imageTTD', 
                            'contents'=>fopen("https://ws-simrs.net/logo/bsre1.png",'r')
                        ],
                        [
                            'name'     => 'nik',
                            'contents' => Session::get('nik') //'1105012709950003',
                        ],
                        [
                            'name'     =>'passphrase',
                            'contents' =>$data['passphrase'] //'Hantek1234.!', Rahmad27*
                        ], 
                        [
                            'name'     => 'tampilan',
                            'contents' => 'visible',
                        ], 
                        [
                            'name'     => 'page',
                            'contents' => $data['halaman'],
                        ],
                        [
                            'name'     => 'xAxis',
                            'contents' => 300,
                        ],
                        [
                            'name'     => 'yAxis',
                            'contents' => 100,
                        ],
                        [
                            'name'     => 'width',
                            'contents' => 20,
                        ],
                        [
                            'name'     => 'height',
                            'contents' => 20,
                        ],
                        // [
                        //     'name'     => 'tag_koordinat',
                        //     'contents' => '#',
                        // ],
                        ]
                    ]
                ); 

                $body = $response->getBody()->getContents();
                
                
                $file_name = time(). $request->file('pdf_file')->getClientOriginalName();  

                $path = storage_path('app/public/TTD/'.$file_name); //LOCAL (DEBUG)
            
                file_put_contents($path, $body);  
    
                $json = ['code'=>200,'message'=>'Tanda tangan elektronik berhasil','perihal'=>$data['nama_dokumen']]; 

                $this->input_todb($request,1);

                $this->logging_tte($json);  
                

                return $json;
        }


            //return $body; 
        }
        catch(\Exception $e)
        {
            $json = ['code'=>201,'message' => $e->getMessage(),'perihal'=>$data['nama_dokumen']];
            $this->logging_tte($json); 
            return response()->json(
                $json
            );
        }    
    }

    public function getlist_ttd(Request $request)
    {
        try
        {   
            $json = [ 
                "mode"=>1,  
                "id_client"=>Session::get('id_client'),    
            ];       
            $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_list_ttd", [
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }

    public function ttd_api(Request $request)
    {
        try
        { 
            $url_simrs = 'http://10.0.8.80/api/user/status/0803202100007062'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url_simrs, [ 
                'auth'=>[
                    'esign', 'qwerty'
                ],
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }

    public function logging_tte($data)
    {
        try
        { 
            $json=[ 
                'user_id'=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),  
                "stts"=>$data['code'],
                'perihal'=>$data['perihal'],
                "message"=>$data['message']
            ];

            $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs."/index.php/api/data_referensi/simpan_log", [ 
            'json' => $json,
            'headers' => [ 
                'Content-Type' => 'application/json',
                'Authorization' => '',  
            ]
        ]);  
       
        }
        catch(\Exception $e)
        {
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }

    public function get_triase_form(Request $request)
    {
        try
        { 
            $json=[ 
                'user_id'=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),   
                'noregister'=>$request->noregister,
            ];  
            $url_simrs = $this->ws_simrs.'index.php/api/Triaseigd/getitem_triase'; // Replace this with the API endpoint URL 
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }
    public function simpan_triase(Request $request)
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");  
            $json=[ 
                'user_id'=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),  
                "check_triase"=>$request->check_triase,
                'noregister'=>$request->noregister, 
            ];  
          
            $url_simrs = $this->ws_simrs.'index.php/api/Triaseigd/simpan_triase'; // Replace this with the API endpoint URL 
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    } 

    public function simpan_soap(Request $request)
    {
        try
        {       
            date_default_timezone_set("Asia/Jakarta");   
 
 
            $isoDate = $request->startdate;
            $tglsoap = date('Y-m-d H:i:s', strtotime($request->tglsoap));

            $json=[ 
                'mode'=>$request->mode,
                'user_id'=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),  
                "subject"=>$request->subject,
                "object"=>$request->object,
                "asessment"=>$request->asessment,
                "plan"=>$request->plan,
                "id"=>$request->id,
                "lokasi"=>$request->lokasi,
                "noregister"=>$request->noregister, 
                "suhu"=>$request->suhu, 
                "sistole"=>$request->sistole, 
                "diastole"=>$request->diastole, 
                "nadi"=>$request->nadi, 
                "gcs"=>$request->gcs, 
                "spo2"=>$request->spo2, 
                "pernafasan"=>$request->pernafasan,
                "jenis_dok"=>$request->jenis_dok,
                "tglsoap"=>$tglsoap,
                "alatbantu_nafasSelected"=>$request->alatbantu_nafasSelected,
            ]; 
            

            // var_dump($json);
            // exit();

            $url_simrs =$this->ws_simrs.'index.php/api/Triaseigd/inputsoap'; // Replace this with the API endpoint URL 
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }

    public function get_soap(Request $request)
    {
        try
        {  

            date_default_timezone_set("Asia/Jakarta");   
            $json=[ 
                'mode'=>$request->mode, 
                'noregister'=>$request->noregister, 
                'id'=>$request->id, 
                'lokasi'=>$request->lokasi, 
                "id_client"=>Session::get('id_client'),  
            ]; 

            $url_simrs =$this->ws_simrs.'index.php/api/Triaseigd/get_soap'; // Replace this with the API endpoint URL 
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
            return response()->json([
                "message"=> $e->getMessage()
            ]);
        }    
    }
    public function hapus_soap(Request $request)
    {
        try
        {  

            date_default_timezone_set("Asia/Jakarta");   
            $json=[ 
                'mode'=>$request->mode, 
                'noregister'=>$request->noregister,  
                'user_id'=>Session::get('user_id'),
                'id'=>$request->id, 
                "id_client"=>Session::get('id_client'),  
            ]; 

            $url_simrs = $this->ws_simrs.'index.php/api/Triaseigd/hapus_soap'; // Replace this with the API endpoint URL 
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

    public function input_header_triase(Request $request)
    {
        try
        {  

            date_default_timezone_set("Asia/Jakarta");   
            $waktu_masuk = $request->waktu_masuk;  
            $waktu_masuk = date('Y-m-d H:i:s', strtotime($waktu_masuk));   
            $json=[  
                'noregister'=>$request->noregister,  
                'nomr'=>$request->norm,  
                'user_id'=>Session::get('user_id'),
                'diantar_oleh'=>$request->diantar_oleh['code'],  
                'transportasi'=>$request->transportasi['id'],  
                'waktu'=>$waktu_masuk,  
                'dpjp'=>$request->dpjp,  
                'keluhan_utama'=>$request->keluhan_utama,    
                'riwayat_penyakit_dahulu'=>$request->riwayat_penyakit_dahulu,  
                'status_psikologi'=>$request->status_psikologi,   
                'resiko_jatuh'=>$request->resiko_jatuh,   
                'kesadaran'=>$request->kesadaran,   
                'suhu'=>$request->suhu,  
                'tensi_sistol'=>$request->tensi_sistol,  
                'tensi_distol'=>$request->tensi_distol,  
                'bb'=>$request->bb,  
                'tb'=>$request->tb,  
                'nyeri'=>$request->nyeri,  
                'nadipermenit'=>$request->nadipermenit,  
                'saturasi'=>$request->saturasi,  
                'respirasi'=>$request->respirasi,   
                'rencana_tindak_lanjut'=>$request->rencana_tindak_lanjut['KETERANGAN'],   
                'rencana_tindak_lanjut_code'=>$request->rencana_tindak_lanjut['STATUS'],   
                'dokter_sp'=>$request->dpjpSelected['KDDOKTER'],  
                'namadokter_sp'=>$request->dpjpSelected['NAMADOKTER'],  
                'lokasinyeri'=>$request->lokasinyeri,  
                'survey'=>$request->survey,   
                "id_client"=>Session::get('id_client'), 
                'data_gizi'=>$request->data_gizi 
            ];  

         

            $url_simrs = $this->ws_simrs.'index.php/api/Triaseigd/input_header_triase'; // Replace this with the API endpoint URL 
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
            $json['metadata']=['code'=>201, "message"=> $e->getMessage(),'function'=>'input_header_triase']; 
            return response()->json([
                $json
            ]);
        }    
    }

    public function get_referensi_triase()
    {
        try
        {  

            date_default_timezone_set("Asia/Jakarta");    
            $json=[                   
                "id_client"=>Session::get('id_client'),  
            ];   
            $url = $this->ws_simrs.'index.php/api/Triaseigd/getref_triase'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url, [  
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

    public function get_carapakai_obat()
    {
        try
        {    
            date_default_timezone_set("Asia/Jakarta");    
            $json=[                   
                "id_client"=>Session::get('id_client'),  
            ];   
            $url_simrs =  $this->ws_inv.'index.php/api/barang/get_remarkv2/3'; // Replace this with the API endpoint URL 
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

    public function check_ruangan_rawat($ruang_rawat)
    {

        $allow = 0;
        $data = Session::get('kodeunit_login').",";  

        $ruang_rawat_array = explode(",", $data);

        foreach($ruang_rawat_array as $ruang)
        {
            if($ruang==$ruang_rawat)
            {
                $allow = 1;
                break;
            }
        } 

        return $allow;
    }

    public function getdatasetting()
    {
        try
        {  

            $url = $this->ws_simrs.'/index.php/api/data_referensi/get_setting_system/'.Session::get('id_client'); // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url,[  
                'json' => "",
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


    public function kirimpermintaan(Request $request)
    {
        try
        {   
            date_default_timezone_set("Asia/Jakarta");    
  
           if($request->obatselected==null)
            {
                $json['metadata'] = [
                    'code'=>201,
                    'message'=>'Tidak ada data yang disimpan'
                ];
                
                return response()->json(
                    $json    
                );
            } 
           
            
            if($request->id_ruangan==Session::get('kodeunit_login'))
            {

            }    

            if($request->OBAT_OBATAN==1)
            { 
                $setting = json_decode($this->getdatasetting(),true); 

                if($setting['response']["IZINKAN_SEMUA_USER_INPUT_KCO"]=="0")
                { 
                    $ruang_rawat = $this->check_ruangan_rawat($request->id_ruangan);  
    
                    if($ruang_rawat==0)
                    {
                        $json['metadata'] = [
                            'code'=>201,
                            'message'=>'Permintaan obat tidak dapat dilakukan, Ruang rawatan pasien tidak sesuai'
                        ];
                        
                        return response()->json(
                            $json    
                        );
                    } 
    
                }

                if($request->lokasiSelected==null)
                {
                    $json['metadata'] = [
                        'code'=>201,
                        'message'=>'Silahkan pilih lokasi permintaan'
                    ];
                    
                    return response()->json(
                        $json    
                    );
                } 
    
                if($request->lokasiSelected["START_TIME"]!="00:00:00")
                {
                    $current_time = time();
                    $start_time = strtotime($request->lokasiSelected["START_TIME"]);    
                    
                    $end_time  = strtotime($request->lokasiSelected["END_TIME"]);     

                    // var_dump("current time :".$current_time);
                    
                    // var_dump("current time: " . date('H:i:s', $current_time));
                  
                    // Check if the end time is earlier in the day than the start time, indicating it crosses midnight
                    if ($end_time < $start_time) {
                        // Add one day to the end time
                        $end_time = strtotime('+1 day', $end_time); 
                        // var_dump("terjadi penambahan");
                    }

                    // var_dump("start_time :".$start_time);
                    // var_dump("end_time :".$end_time); 
                    
                    if ($current_time < $start_time || $current_time > $end_time) {
    
                        $json['metadata'] = [
                            'code'=>201,
                            'message'=>$request->lokasiSelected["DISPLAY"] ." hanya melayani pada jam ".$request->lokasiSelected["START_TIME"]." - ".$request->lokasiSelected["END_TIME"]
                        ];
                        
                        return response()->json(
                            $json    
                        ); 
                    } 
                }  
            } 


            $dataitem = $request->obatselected;

            if(isset($dataitem[0]["JENIS_R"]))
            {
                for($i=0; $i < count($dataitem); $i++)
                {
                    if($dataitem[$i]["JENIS_R"]==null)
                    {
                        $dataitem[$i]["JENIS_R"]="";
                    } 
                    if($dataitem[$i]["MEREK"]==null)
                    {
                        $dataitem[$i]["MEREK"]="";
                    }  
                }
            }
            else
            {
                $dataitem[0]["JENIS_R"]="";
            }
           
            //exit();
          
            $waktu_masuk = $request->waktu_masuk; 

            $lokasi_id =Session::get('lokasi_inv');
            
            if(isset($request->lokasiSelected['ID']))
            {
                $lokasi_id =$request->lokasiSelected['ID'];
            } 

            $waktu_masuk = date('Y-m-d H:i:s', strtotime($waktu_masuk));      

            $data['header']=[
                "RECEIPT_NO"=> '',
                "MEMBERSHIP_ID"=> $request->NOMR,   
                "SALESNO"=> 0,
                "IDUSER"=> Session::get('user_id'),
                "TANGGAL"=>$waktu_masuk,
                "IDPAYEMENT"=> 0,
                "NOTE"=>$request->DATA_SINGKAT,
                "SUBTOTAL"=> 0.0,
                "TAXPERCENT"=> 0,
                "TAXAMOUNT"=>0.0,
                "TOTALBAYAR"=> 0.0,
                "POTONGAN"=> 0.0,
                "MODE"=>$request->modesales,
                "IDCLIENT"=> Session::get('id_client'),  
                "GRANDTOTAL"=> 0.0,
                "KEMBALIAN"=> 0.0,
                "ID_LOKASI"=>$lokasi_id,
                "ROOM_TABLE_NUMBER"=> 0,
                "RESV_ID"=> 0,
                "NO_REGISTER"=>$request->NOPENDAFTARAN,
                "SERVER_ID"=> 0,
                "POLI_RUANG"=>$request->POLI_RUANG,
                "DPJP"=> $request->DPJP,
                "SERVER_NAME"=> '',
                "STATUS_PROGRESS"=> '',
                "OBAT_OBATAN"=>$request->OBAT_OBATAN,
                "TGL_SELESAI"=> '',
                "JENIS_RESEP"=> $request->selectedjns_resep,
                "CARAPAKAI_RACIK"=> $request->dosis_racik,
                "JML_RACIK"=> $request->jml_kemasan,
                "BENTUK_RACIK"=> $request->bentuk_racik_selected,
                "OBAT_PULANG"=>$request->isObatPulang,
                "details"=>$dataitem
            ];  


            // var_dump(json_encode($data,true));
            // exit();
          
            $url_simrs =  $this->ws_inv.'index.php/api/sales/insert_sales_v2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $data,
                'headers' => [ 
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]); 
            $body = $response->getBody()->getContents(); 
            return $body;  
            // return response()->json([
            //     $data    
            // ]);

        }
        catch(\Exception $e)
        {
            
            $json['metadata'] = ['code' => 202, 'message' => $e->getMessage()];
            return response()->json($json);
        }  
    }

    public function getheader_sales(Request $request)
    { 
        try
        { 
            $json=[                   
                "IDCLIENT"=>Session::get('id_client'),   
                "TGLMIN"=>"",
                "TGLMAX"=>"",
                "NOREGIRTER_KLINIK"=>$request->NOPENDAFTARAN,
                "RECEIPT_NO"=>$request->RECEIPT_NO,
                "MODE"=>"RESEP_HISTORY", 
            ];  

            $url_simrs =  $this->ws_inv.'index.php/api/sales/get_header_sales'; // Replace this with the API endpoint URL 
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

    public function update_stts_obat_pulang(Request $request)
    { 
        try
        { 
            $json=[                   
                "IDCLIENT"=>Session::get('id_client'),    
                "RECEIPT_NO"=>$request->RECEIPT_NO,
                "OBAT_PULANG"=>$request->UpdateisObatPulang, 
            ];  

            $url_simrs =  $this->ws_inv.'index.php/api/sales/update_stts_obatpulang'; // Replace this with the API endpoint URL 
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


    public function getheader_penunjang(Request $request)
    { 
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),    
                "noregister"=>$request->noregister,
                "jenisdata"=>$request->jenisdata, 
            ];  

            $url_simrs =  $this->ws_inv.'index.php/api/sales/riwayatpenunjang'; // Replace this with the API endpoint URL 
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


    public function getdetils_sales(Request $request)
    { 
        try
        { 
            $json=[                   
                "IDCLIENT"=>Session::get('id_client'),   
                "TGLMIN"=>"",
                "TGLMAX"=>"",
                "NOREGIRTER_KLINIK"=>$request->NOPENDAFTARAN,
                "RECEIPT_NO"=>$request->RECEIPT_NO,
                "MODE"=>$request->MODE,//"RCPT", 
                "MEMBERSHIP"=>""
            ];  

            $url_simrs = $this->ws_inv.'index.php/api/sales/billv2'; // Replace this with the API endpoint URL 
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

    public function get_data_kco(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),    
                "NOPENDAFTARAN"=>$request->NOREGISTER,  
                "MODE"=>$request->MODE,  
            ];   
         
            $url = $this->ws_inv.'index.php/api/sales/get_data_kco'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url, [  
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
    public function data_obat_pulang(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),    
                "NOPENDAFTARAN"=>$request->NOPENDAFTARAN,   
            ];   
         
            $url = $this->ws_inv.'index.php/api/sales/data_obat_pulang'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url, [  
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

    public function void_sales(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),    
                "NOPENDAFTARAN"=>$request->NOREGISTER,  
            ];    
            $param =$request->RECEIPT_NO."/".Session::get('id_client')."/".Session::get('id_lokasi');

            $url = $this->ws_inv.'index.php/api/sales/void_sales/'.$param; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url, [  
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

    public function kirim_resep(Request $request)
    {
        try
        { 
            $json[]=(              
                $request->RECEIPT_NO 
            );    
            $param =Session::get('id_client');

            $url = $this->ws_inv.'index.php/api/sales/kirim_resep/'.$param; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url, [  
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

    public function getdatahasil_lab(Request $request)
    {
        try
        {  
         
            $url = $this->ws_inv.'index.php/api/sales/get_item_lab_master_detail/'.$request->receipt.'/'.Session::get('id_client'); // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->get($url,[  
                'json' => '',
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

    public function hapus_tte(Request $request)
    {
        try
        {  
         
            $json=[                   
                "id_client"=>Session::get('id_client'),    
                "id"=>$request->id,  
            ];  
            $url = $this->ws_simrs.'index.php/api/data_referensi/hapus_tte'; // Replace this with the API endpoint URL 
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

    public function simpan_resume_pulang(Request $request)
    {
        try
        {   

           $res = $this->updatepulang_tgl_pulang($request); 
        
           $res_bpjs = json_decode($res,true);
          
           if($res_bpjs['code']!=200)
           { 
                $json['metadata']=['code'=>$res_bpjs['code'], "message"=>$res_bpjs['message']]; 
                return response()->json(
                    $json
                ); 
           }
           else
           {
                $json['metadata']=['code'=>$res_bpjs['code'], "message"=>$res_bpjs['message']]; 
                return response()->json(
                    $json
                );
           } 
          
            $json = [
                "no_register" => $request->noregister, 
                "suhu" => $request->suhu, 
                "tensi" => $request->tensi, 
                "keluhan_utana" =>"",// $request->anamnesis, 
                "sp2o" => $request->saturasi,
                "tinggi_badan" =>0, 
                "respirasi_perm" => $request->respirasi,
                "cgs" => '',
                "skala_nyeri"=>$request->skala_nyeri,
                "berat_badan" => 0, 
                "nadi_permenit" =>$request->nadipermenit,
                "subjek" =>$request->anamnesis, 
                "objek" => "",
                "asesmen" => $request->dxutama,
                "plan" =>$request->kondisiSaatpulangSelected['name'],
                "catatan_dokter" =>"",
                "jenis_dok" => 1,
                "id_client"=>Session::get('id_client'),    
            ];  
 
            $url = $this->ws_simrs.'index.php/api/transaksi_pasien/save_asesmenkeperawatan'; // Replace this with the API endpoint URL 
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

    public function simpan_soap_rawatjalan(Request $request)
    {
       
        try
        {   
 
        


           $res_bpjs = json_decode($res,true);

           
          
          
           if($res_bpjs['code']!=200)
           { 
                $json['metadata']=['code'=>$res_bpjs['code'], "message"=>$res_bpjs['message']]; 
                return response()->json(
                    $json
                );
                
           }
           else
           {
                $json['metadata']=['code'=>$res_bpjs['code'], "message"=>$res_bpjs['message']]; 
                return response()->json(
                    $json
                );
           } 

          
            $json = [
                "no_register" => $request->noregister, 
                "suhu" => $request->suhu, 
                "tensi" => $request->tensi, 
                "keluhan_utana" =>"",// $request->anamnesis, 
                "sp2o" => $request->saturasi,
                "tinggi_badan" =>0, 
                "respirasi_perm" => $request->respirasi,
                "cgs" => '',
                "skala_nyeri"=>$request->skala_nyeri,
                "berat_badan" => 0, 
                "nadi_permenit" =>$request->nadipermenit,
                "subjek" =>$request->anamnesis, 
                "objek" => "",
                "asesmen" => $request->dxutama,
                "plan" =>$request->kondisiSaatpulangSelected['name'],
                "catatan_dokter" =>"",
                "jenis_dok" => 1,
                "id_client"=>Session::get('id_client'),    
            ];  
 
            $url = $this->ws_simrs.'index.php/api/transaksi_pasien/save_asesmenkeperawatan'; // Replace this with the API endpoint URL 
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
 

    
    // public function getdata_resume_pulang_pasien(Request $request)
    // {
    //     try
    //     { 

    //         $param=$request->noregister."/".Session::get('id_client'); 

    //         $url = $this->ws_simrs.'index.php/api/transaksi_pasien/getdata_asesmen/'.$param; // Replace this with the API endpoint URL 
    //         $client = new Client();
    //         $response = $client->get($url,[  
    //             'json' => "",
    //             'headers' => [ 
    //                 'Content-Type' => 'application/json',
    //                 'Authorization' => '', // If the API requires an access token
    //             ]
    //         ]); 
    //         $body = $response->getBody()->getContents(); 
    //         return $body;   
    //     }
    //     catch(\Exception $e)
    //     {
    //         $json['metadata']=['code'=>201, "message"=> $e->getMessage()]; 
    //         return response()->json([
    //             $json
    //         ]);
    //     }  
    // }

    public function getdata_resume_pulang_pasien(Request $request)
    {
        try
        {  
            $json = [
                "noregister" => $request->noregister, 
                "id_client"=>Session::get('id_client'),    
            ];

            $url = $this->ws_simrs.'index.php/api/Resumepulang/getdata_resume'; // Replace this with the API endpoint URL 
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
    
    public function updatepulang_tgl_pulang(Request $request)
    { 
        date_default_timezone_set("Asia/Jakarta");
 
        $fixed = date('Y-m-d H:i:s', strtotime($request->tanggal_pulang));

        $tgl_meninggal = date('Y-m-d H:i:s', strtotime($request->tgl_meninggal));
        $json = [
            "KELUARPOLY"=>$fixed,
            "NOPENDAFTARAN"=>$request->noregister,
            "NORM"=>$request->nomr,
            "STATUS"=>$request->kondisiSaatpulangSelected['code'],
            "KONDISISAATPULANG"=>$request->kondisiSaatpulangSelected['code'],
            "KETERANGAN_STATUS"=>$request->kondisiSaatpulangSelected['name'],
            "KDCARABAYAR"=>$request->kdcarabayar,
            "NOSEP"=>$request->nosep,
            "NOREF"=>$request->nomor_ref,
            "TGL_MENINGGAL"=>$tgl_meninggal,
            "NOLP"=>$request->NOLP,
            "KLL"=>$request->kll,
            "USER_ID"=>Session::get('user_id'),
            "ID_CLIENT"=>Session::get('id_client'),    
        ]; 
        
        $url = $this->ws_simrs.'index.php/api/transaksi_pasien/pemulangan_pasienv2'; // Replace this with the API endpoint URL 
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
    
    public function otorisasi_v3(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta"); 
 
        $json = [ 
            "noregister"=>$request->noregister, 
            "user_id"=>$request->username,
            "pwd"=>$request->pwd,
            "mode"=>$request->mode,
            "id_client"=>Session::get('id_client'),    
        ];

        //var_dump($json);

        $url = $this->ws_simrs.'index.php/api/Triaseigd/otorisasi_v3'; // Replace this with the API endpoint URL 
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

    public function rincian_tindakan(Request $request)
    { 
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),   
                "NOPENDAFTARAN"=>$request->NOPENDAFTARAN, 
                "mode"=>$request->mode, 
            ];  

            $url_simrs =  $this->ws_inv.'index.php/api/sales/rincian_tindakan'; // Replace this with the API endpoint URL 
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

    public function voidtindakan(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),   
                "no_receipt"=>$request->RECEIPT_NO  
            ];  

            $url_simrs =  $this->ws_inv.'index.php/api/sales/voidtindakan'; // Replace this with the API endpoint URL 
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

    public function simpanTemplate(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'), 
                "item"=>$request->obatselected,
                "caption_template"=>$request->caption_template,
                "user_id"=>Session::get('user_id')
            ];   

            $url_simrs =  $this->ws_inv.'index.php/api/data_referensi/saveTemplate'; // Replace this with the API endpoint URL 
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

    public function get_template(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),  
                "user_id"=>Session::get('user_id')
            ];   

            $url_simrs =  $this->ws_inv.'index.php/api/data_referensi/get_template'; // Replace this with the API endpoint URL 
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

    public function hapustemplate(Request $request)
    {
        try
        { 
            $json=[                   
                "id_client"=>Session::get('id_client'),  
                "no_template"=>$request->no_template,
                "user_id"=>Session::get('user_id')
            ];   

            $url_simrs =  $this->ws_inv.'index.php/api/data_referensi/hapusTemplate'; // Replace this with the API endpoint URL 
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

    public function kajian_awal_dokter(Request $request)
    {
        try
        {   
            $json=[           
                "noregister"=>$request->noregister,           
                "nomr"=>$request->nomr,    
                "keluhan_utama"=>$request->keluhan_utama, 
                "riwayat_peny_skrg"=>$request->riwayat_peny_skrg,
                "penunjang_lab"=>$request->lab,
                "penunjang_radiologi"=>$request->radiologi,
                "riwayat_peny_skrg_arr"=>$request->riwayat_peny_skrg_arr,
                "riwayat_peny_skrg_lainnya"=>$request->riwayat_peny_skrg_lainnya,
                "penunjang_lainnya"=>$request->penunjang_lainnya,
                "dx_awal"=>$request->diagnosautama,
                "dx_sekunder"=>$request->diagnosasekunder, 
                "elergi_arr"=>$request->elergi_arr, 
                "elergi_deskripsi"=>$request->elergi_deskripsi, 
                "riwayat_panyakit_kel"=>$request->riwayat_panyakit_kel, 
                "riwayat_panyakit_kel_lainnya"=>$request->riwayat_panyakit_kel_lainnya,
                "data_survey_fisik"=>$request->data_survey_fisik, 
                "id_client"=>Session::get('id_client'),   
                "user_id"=>Session::get('user_id')
            ];   
  
            // var_dump(json_encode($json,true));
            // exit();
            
            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/kajian_awal_dokter'; // Replace this with the API endpoint URL 
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

    public function kajian_awal_perawat(Request $request)
    {
        try
        {   
            $json=[           
                "noregister"=>$request->noregister,           
                "nomr"=>$request->nomr,    
                "status_psikologi"=>$request->status_psikologi,    
                "status_hubungan_keluarga"=>$request->status_hubungan_keluarga,    
                "status_spiritual"=>$request->status_spiritual,    
                "status_ekonomi"=>$request->status_ekonomi,    
                "gastrointestinal"=>$request->gastrointestinal,    
                "resiko_jatuh"=>$request->resiko_jatuh,    
                "resiko_jatuh_alat_bantu"=>$request->resiko_jatuh_alat_bantu,    
                "slide_skala_nyeri"=>$request->slide_skala_nyeri,    
                "lokasi_nyeri"=>$request->lokasi_nyeri,    
                "topik_edukasi"=>$request->topik_edukasi,  
                "dx_keperawatanSelected"=>$request->dx_keperawatanSelected,
                'data_gizi'=>$request->data_gizi,
                "id_client"=>Session::get('id_client'),   
                "user_id"=>Session::get('user_id')
            ];   
  
            // var_dump(json_encode($json,true));
            // exit();

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/kajian_awal_perawat'; // Replace this with the API endpoint URL 
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

    public function get_kajian_awal_perawat(Request $request)
    {
        try
        {   
            $json=[           
                "noregister"=>$request->noregister,           
                "nomr"=>$request->nomr,  
                "id_client"=>Session::get('id_client'),   
                "user_id"=>Session::get('user_id')
            ];   
  
            // var_dump(json_encode($json,true));
            // exit();

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_datakajian_awal_perawat'; // Replace this with the API endpoint URL 
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

    public function get_kajian_awal_dokter(Request $request)
    {
        try
        {   
            $json=[           
                "noregister"=>$request->noregister,           
                "nomr"=>$request->nomr,  
                "id_client"=>Session::get('id_client'),   
                "user_id"=>Session::get('user_id')
            ];   
  
            // var_dump(json_encode($json,true));
            // exit();

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_kajian_awal_dokter'; // Replace this with the API endpoint URL 
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

    public function datagrafik_cppt(Request $request)
    {
        try
        {   
            $json=[           
                "noregister"=>$request->noregister,      
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/datagrafik_cppt'; // Replace this with the API endpoint URL 
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

    public function simpan_selesai_pelayanan(Request $request)
    {
        try
        {   
            $tanggal_kematian = date('Y-m-d H:i:s', strtotime($request->tanggal_kematian));  
            $tanggal_pulang = date('Y-m-d H:i:s', strtotime($request->tanggal_pulang));  
            $json=[           
                "noregister"=>$request->noregister,      
                "keadaan_saat_pulang"=>$request->keadaan_saat_pulang,    
                "rs_tujuan_rujuk"=>$request->rs_tujuan_rujuk,    
                "cara_keluar"=>$request->cara_keluar,     
                "kondisi_meniggal"=>$request->kondisi_meniggal,    
                "sebab_meninggal"=>$request->sebab_meninggal,    
                "tanggal_kematian"=>$tanggal_kematian,    
                "dpjpSelected"=>$request->dpjpSelected,  
                "data_pindah_ruangan"=>$request->data_pemindahan,  //jika pasien mendapat ranap
                "tanggal_pulang"=>$tanggal_pulang, 
                "cara_bayar"=>$request->cara_bayar, 
                "id_client"=>Session::get('id_client'),    
                "nosep"=>$request->nosep,  //jika pasien mendapat ranap
                "user_id"=>Session::get('user_id')
            ];    

            
            // var_dump(json_encode($json,true));
            // exit();

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/simpan_selesai_pelayanan'; // Replace this with the API endpoint URL 
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

    public function pindah_pasien_antar_ruangan(Request $request)
    {
        try
        {    
            $json=[           
                "data"=>$request->data_pemindahan,    
                "id_client"=>Session::get('id_client'),    
            ];       
         
            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/pindah_pasien_antar_ruangan'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($url_simrs, [  
                'json' => $json['data'],
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

    public function getnotif_pindahruangan(Request $request)
    {
        try
        {    
            $json=[           
                    "user_id"=>Session::get('user_id'),
                    "id_client"=>Session::get('id_client'),    
            ];      
            
            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/getnotif_pindahruangan'; // Replace this with the API endpoint URL 
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

    public function get_data_assesment_gizi(Request $request)
    {
        try
        {    
            $json=[           
                "noregister"=>$request->noregister,    
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_data_assesment_gizi'; // Replace this with the API endpoint URL 
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

    public function simpan_diagnosan_dokter(Request $request)
    {
        try
        {    
            $json=[           
                "noregister"=>$request->noregister,    
                "nomr"=>$request->nomr,    
                "dx_utama"=>$request->dx_utama,    
                "dx_sekunder"=>$request->dx_sekunder,    
                "jenis_kasus"=>$request->jenis_kasus,    
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/simpan_diagnosan_dokter'; // Replace this with the API endpoint URL 
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

    public function get_diagnosa_dokter(Request $request)
    {
        try
        {    
            $json=[           
                "noregister"=>$request->noregister,     
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_diagnosa_dokter'; // Replace this with the API endpoint URL 
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

    public function getdata_pemindahan_pasien(Request $request)
    {
        try
        {    
            $json=[           
                "noregister"=>$request->noregister,     
                "mode"=>$request->mode,
                "user_id"=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),    
            ];    

           

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/getdata_pemindahan_pasien'; // Replace this with the API endpoint URL 
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

    public function batalkan_transfer(Request $request)
    {
        try
        {    
            $json=[           
                "id"=>$request->id,     
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/batalkan_transfer'; // Replace this with the API endpoint URL 
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

    public function sync_ews_from_soap(Request $request)
    {
        try
        {    
            $json=[           
                "mode"=>$request->mode,   
                "noregister"=>$request->noregister,     
                "id_client"=>Session::get('id_client'),    
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/sync_ews_from_soap'; // Replace this with the API endpoint URL 
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

    public function getdata_tempat_tidur()
    {
        try
        {    
            $json=[           
               
            ];    

            $url_simrs =  $this->ws_simrs.'index.php/api/laporan/pasien_sedang_rawat_inap/'.Session::get('id_client'); // Replace this with the API endpoint URL 
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
