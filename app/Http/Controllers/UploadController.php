<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
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
    public function validations(Request $request)
    {
        $data = json_decode($request->input('data'),true);


        //return phpinfo();

        //dd($request->all());

        if(!$request->hasFile("pdf_file"))
        {
            $json = ["message"=>"Tidak terdapat lampiran file",
            "code"=>201];
             return $json;
        }

        if($data['caption_file']=="")
        {
            $json = ["message"=>"Nama dokument wajib di isi",
            "code"=>201];
            return $json;
        }

        $fileSize = $request->file('pdf_file')->getSize();

        $fileSize = $fileSize/1000;

        if($fileSize>700)
        {
            $json = ["message"=>"Gagal upload, Maksimal ukuran file 700 kb",
            "code"=>201];
            return $json;
            exit();
        }
        $json = ["message"=>"Success validation", "code"=>200];
            return $json;
    }


    public function uploadlampiran(Request $request)
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



            $timestamp = now()->timestamp; // Get the current timestamp
            $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
            $hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm

            $extension = $file->extension();

            // $file_name =time().''.$file->getClientOriginalName();

            $file_name =$hashCode.".".$extension;

            $currentYear = date('Y', strtotime($data['startdate']));


            $file->move(public_path('storage/'.$data['directori'].'/'.Session::get('id_client')), $file_name);

            $body =$this->input_todb($request,$file_name);


            $json = json_decode($body,true);

            if($json['metadata']['code']==200)
            {
                $json = ["message"=>"Suksess",  "code"=>200];
                return $json;
            }
            else
            {
                    $json = ["message"=>"Upload gagal proses",  "code"=>201];
                return $json;
            }

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

    public function uploadlampiran_for_api(Request $request)
    {
        try{


              // ======================
            // Ambil JSON dari FormData
            // ======================
            $data = json_decode($request->input('data'), true);

            if (!$data) {
                return response()->json([
                    'code' => 201,
                    'message' => 'Data JSON tidak valid'
                ]);
            }

            // ======================
            // Validasi file
            // ======================
            if (!$request->hasFile('file')) {
                return response()->json([
                    'code' => 201,
                    'message' => 'File tidak ditemukan'
                ]);
            }

            $file = $request->file('file');

            if (!$file->isValid()) {
                return response()->json([
                    'code' => 201,
                    'message' => 'File tidak valid'
                ]);
            }


            $timestamp = now()->timestamp; // Get the current timestamp
            $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
            $hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm

            $extension = $file->extension();

            // $file_name =time().''.$file->getClientOriginalName();


            $file_name =$hashCode.".".$extension;

            $currentYear = now()->year;


            $file->move(public_path('storage/'.$data['directori'].'/'.$data['id_client']), $file_name);


            $body =$this->input_todb_for_api($data,$file_name);

            return $body;
            $json = json_decode($body,true);

            if($json['metadata']['code']==200)
            {
                $json = ["message"=>"Suksess",  "code"=>200];
                return $json;
            }
            else
            {
                    $json = ["message"=>"Upload gagal proses",  "code"=>201];
                return $json;
            }

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

    public function hapus_datalampiran_for_api(Request $request)
    {

        $data = json_decode($request->input('data'), true);

        return $data;

        $json=[
            "id_client"=>$data['id_client'],
            "id"=>$data->id,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/hapus_lampiran", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        //dd($response);
        $body = $response->getBody()->getContents();

        return $body;
    }

    public function input_todb_for_api($data, $file_name)
    {

        // ======================
        // Ambil JSON metadata
        // ======================
        //$data = json_decode($request->input('data'), true);



        if (!$data) {
            return json_encode([
                'metadata' => [
                    'code' => 201,
                    'message' => 'Data JSON tidak valid'
                ]
            ]);
        }

        // ======================
        // Default value aman
        // ======================
        $data['noreceipt']  = $data['noreceipt']  ?? '';
        $data['noreff']     = $data['noreff']     ?? '';
        $data['noregister'] = $data['noregister'] ?? '';

        // ======================
        // Payload ke SIMRS API
        // ======================
        $payload = [
            "noregister"    => $data['noregister'],
            "noreceipt"     => $data['noreceipt'],
            "itemseqno"     => 1,
            "caption_file"  => $data['caption_file'],
            "noreff"        => $data['noreff'],
            "module_upload" => $data['module_upload'],
            "file_lampiran" => $file_name,
            "id_client"     => $data['id_client']
        ];


        // ======================
        // Kirim ke Web Service SIMRS
        // ======================
        try {
            $client = new Client([
                'timeout' => 15
            ]);

            $response = $client->post(
                $this->ws_simrs . "index.php/api/data_referensi/uploadlampiran_file",
                [
                    'json' => $payload,
                    'headers' => [
                        'Accept'        => 'application/json',
                        'Content-Type'  => 'application/json',
                        'Authorization' => '' // isi kalau pakai token
                    ]
                ]
            );

            return $response->getBody()->getContents();

        } catch (\Exception $e) {
            return json_encode([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Gagal kirim ke SIMRS',
                    'error' => $e->getMessage()
                ]
            ]);
        }
    }


    public function input_todb(Request $request,$file_name)
    {

        $file= $request->file('pdf_file');
        $data = json_decode($request->input('data'),true);
        $timestamp = now()->timestamp; // Get the current timestamp
        $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
        //$hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm
        $user_attch=[];

        if(!isset($data['noreceipt']))
        {
            $data['noreceipt'] ="";
        }

        if(!isset($data['noreff']))
        {
            $data['noreff'] ="";
        }
        if(!isset($data['noregister']))
        {
            $data['noregister'] ="";
        }

        $json = [
            "noregister"=> $data['noregister'],
            "noreceipt"=>$data['noreceipt'],
            "itemseqno"=>1,
            "caption_file"=>$data['caption_file'],
            "noreff"=>$data['noreff'],
            "module_upload"=>$data['module_upload'],
            "file_lampiran"=>$file_name,
            "id_client"=>Session::get('id_client'),
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/uploadlampiran_file", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdata_lampiran(Request $request)
    {

        $json=[
            "id_client"=>Session::get('id_client'),
            "noregister"=>$request->noregister,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/getlampiran_upload", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        //dd($response);
        $body = $response->getBody()->getContents();

        return $body;
    }


    public function get_filelampiran_pasien(Request $request)
    {

        $json=[
            "id_client"=>Session::get('id_client'),
            "nomr"=>$request->nomr,
            "jenisrawat"=>$request->jenisrawat,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_filelampiran_pasien", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        //dd($response);
        $body = $response->getBody()->getContents();

        return $body;
    }


    public function hapus_datalampiran(Request $request)
    {
        $json=[
            "id_client"=>Session::get('id_client'),
            "id"=>$request->id,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/hapus_lampiran", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        //dd($response);
        $body = $response->getBody()->getContents();

        return $body;
    }


    public function proxy_image(Request $request)
    {
        $url = $request->get('url');

        if (!$url || !str_contains($url, '/storage/')) {
            return response('URL tidak valid', 400)
                ->header('Access-Control-Allow-Origin', '*');
        }

        // Baca file langsung dari disk, hindari HTTP loopback ke server sendiri
        $storagePath = substr($url, strpos($url, '/storage/'));
        $localPath = public_path($storagePath);

        if (!file_exists($localPath)) {
            return response('File tidak ditemukan | path: ' . $localPath . ' | storagePath: ' . $storagePath, 404)
                ->header('Access-Control-Allow-Origin', '*');
        }

        $mimeType = mime_content_type($localPath) ?: 'image/jpeg';

        return response(file_get_contents($localPath), 200)
            ->header('Content-Type', $mimeType)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    public function upload_canvas(Request $request)
    {
        try
        {

            $file= $request->file('image');

            $file_kel_pasien = $request->file('pic_kel_pasien');

            $timestamp = now()->timestamp; // Get the current timestamp
            $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
            $hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm

            $extension = $file->extension();
            $extension_pic = $file_kel_pasien->extension();

            $file_name ="tt".$hashCode.".".$extension;

            $file_name_pic="pic".$hashCode.".".$extension_pic;

            $file->move(public_path('storage/consent/'.Session::get('id_client')), $file_name);
            $file_kel_pasien->move(public_path('storage/consent/'.Session::get('id_client')), $file_name_pic);

            /////upload to database

            $data = json_decode($request->input('data'),true);

            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$data['noregister'],
                "id_consent"=>$data['id_consent'],
                "id"=>$data['id'],
                "filename"=>$file_name,
                "pic"=>$file_name_pic
            ];


            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Resumepulang/update_tdd_row", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);
            //dd($response);
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
