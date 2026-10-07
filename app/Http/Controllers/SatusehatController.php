<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Services\ttdService;
use PDF;

class SatusehatController extends Controller
{

    protected $ws_inv;
    protected $ws_simrs;

    protected $ws_satu_sehat;


    protected ttdService $service;

    public function __construct(ttdService $service)
    {

        $this->service = $service;

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

        $this->ws_satu_sehat = config('app.ws_satu_sehat');
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

        try{

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

            }catch(\Exception $e){
            $json = ['code'=>201,'message' => $e->getMessage()];
            return response()->json([
                $json
            ]);

        }
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

        // if(count($data['user_dipilih'])==0)
        // {
        //     $json = ["message"=>"Pilih user untuk pengajuan tanda tangan",
        //     "code"=>201];
        //     return $json;
        // }


        // if(count($data['user_dipilih'])>1)
        // {
        //     $json = ["message"=>"Tidak dapat memilih lebih dari satu penanda tangan",
        //     "code"=>201];
        //     return $json;
        // }

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
            "user_ttd"=>Session::get('user_id'),//$data['user_dipilih'],
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

    public function generatePdf($json)
    {


        $data = json_decode($json,true);
        // Include the FPDF library
        require_once app_path('Libraries/FPDF/fpdf.php');

        // Create instance of FPDF
        $pdf = new \FPDF();

        // Add a page
        $pdf->AddPage();
        // Set font for the document (Font family, style, size)
        $pdf->SetFont('Arial', 'B', 16);

        // Add a title
        $pdf->Cell(0, 10, $data['judul'], 0, 1, 'C');

        // Add a line break
        $pdf->Ln(10);

        // Set a smaller font
        $pdf->SetFont('Arial', '', 12);

        // Add some text
        $pdf->MultiCell(0, 10, $data['content']);

        // Add another line break
        $pdf->Ln(10);

        // Add another piece of text
        $pdf->Cell(0, 10, $data['sign_by'], 0, 1, 'C');

        $fileName = time() . '_document.pdf';

        $pdf->Output(storage_path('app/public/TTD/'.$fileName), 'F');  // Save to a file

        return $fileName;

        //$path = storage_path('app/public/TTD/'.$file_name); //LOCAL (DEBUG)

      //  file_put_contents($pdf->Output(), $body);
    }


    public function get_data_soap_tosign($data)
    {

        try
        {

            $json =["id"=>$data['noregister'],
                    "user_id"=>$data['user_id'],
                    "id_client"=>Session::get('id_client')
            ];

            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/triaseigd/get_tte_content", [
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


    public function ttd_file($json)
    {
        try
        {

            $respons = $this->get_data_soap_tosign($json);

            $data = json_decode($respons,true);

            if($data['metadata']['code']!=200)
            {
                $json = ['code'=>201,'message'=>'Tanda tangan elektronik gagal','perihal'=>"gagal Reload CPPT"];
                $this->logging_tte($json);

                return;
            }

            $data_tte = $data['response'][0];

            if($data_tte['PASS_TTE']=="")
            {
                $json = ['code'=>201,'message'=>'User belum memiliki akun','perihal'=>"User belum memiliki akun"];
                $this->logging_tte($json);

                return;
            }

            $data_soap = $data['soap'][0];

            $data = [
                "passphrase"=>$data_tte['PASS_TTE'],
                "halaman"=>"1",
                "nama_dokumen"=>"CPPT",
                "nik"=>$data_tte['NIK']
            ];

            $isi=["judul"=>"CPPT",
                "content"=>$data_soap['object_display'],
                "sign_by"=>$data_tte['NIP']
            ];

            $fileContent = $this->generatePdf(json_encode($isi,true));

            $filePath = storage_path('app/public/TTD/'.$fileContent); // Path to the file

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
                        'contents' => fopen($filePath,'r'),
                        'filename' => "myfile.pdf"
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
                        'contents' => $data['nik'],//'1105012709950003',//
                    ],
                    [
                        'name'     =>'passphrase',
                        'contents' => $data['passphrase'], //'Rahmad27*' //'Hantek1234.!',
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

            //var_dump($body);


            if($this->isPdf($body))
            {

                $file_name = time() . '_document.pdf';

                $path = storage_path('app/public/TTD/'.$file_name); //LOCAL (DEBUG)

                file_put_contents($path, $body);

                $json = ['code'=>200,'message'=>'Tanda tangan elektronik berhasil '.$data_tte['NIK'],'perihal'=>$data['nama_dokumen']];


                $this->logging_tte($json);
            }
            else
            {

                $res = json_decode($body,true);

                $json = ['code'=>201,'message'=>$res['error']." ".$data_tte['NIK'],'perihal'=>''];

                $this->logging_tte($json);
            }

            return $json;



            //$this->input_todb($request,1);
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


    public function ttd_file_v2(Request $request)
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

            $file= $request->file('pdf_file');
            $data = json_decode($request->input('data'),true);


            //var_dump($file);


            //$filePath = storage_path('app/public/TTD/'.$fileContent); // Path to the file

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
                        'contents' =>$data['passphrase'] //'Rahmad27*' //'Hantek1234.!',
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

            if($this->isPdf($body))
            {
                $file_name = time(). $request->file('pdf_file')->getClientOriginalName();

                $path = storage_path('app/public/TTD/'.$file_name); //LOCAL (DEBUG)

                file_put_contents($path, $body);

                $json = ['code'=>200,'message'=>'Tanda tangan elektronik berhasil','perihal'=>$data['nama_dokumen']];

                $this->input_todb($request,1);

                $this->logging_tte($json);
            }
            else
            {

                $res = json_decode($body,true);

                $json = ['code'=>201,'message'=>$res['error'],'perihal'=>''];

                $this->input_todb($request,1);

                $this->logging_tte($json);
            }

            return $json;
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

    function isPdf($filepdf) {
        // Open the file in binary mode
        if (substr($filepdf, 0, 5) !== "%PDF-") {
            return false;
        }
        else
        {
            return true;
        }

    }


    public function getlist_ttd(Request $request)
    {
        try
        {
            $json = [
                "mode"=>2,
                "id_client"=>Session::get('id_client'),
                "user_id"=>Session::get('user_id'),
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
            $response = $client->post($this->ws_simrs."/index.php/api/data_referensi/simpan_log", [
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
                'riwayat_penyakit_sekarang'=>$request->riwayat_penyakit_sekarang ?? '',
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
                'dokter_sp' => isset($request->dpjpSelected['KDDOKTER']) ? $request->dpjpSelected['KDDOKTER'] : "",
                'namadokter_sp' => isset($request->dpjpSelected['NAMADOKTER']) ? $request->dpjpSelected['NAMADOKTER'] : "",
                'lokasinyeri'=>$request->lokasinyeri,
                'survey'=>$request->survey,
                'id_client'=>Session::get('id_client'),
                'data_gizi'=>$request->data_gizi,
                'hasil_triase_kategori'  => $request->hasil_triase_kategori  ?? '',
                'hasil_triase_emergensi' => $request->hasil_triase_emergensi ?? 0,
                'hasil_triase_urgent'    => $request->hasil_triase_urgent    ?? 0,
                'hasil_triase_nonurgent' => $request->hasil_triase_nonurgent ?? 0,
                'hasil_triase_doa'       => $request->hasil_triase_doa       ?? 0,
                'hasil_triase_total'     => $request->hasil_triase_total     ?? 0,
                // Kehamilan
                'status_hamil'           => $request->status_hamil           ? 1 : 0,
                'gravida'                => $request->gravida                ?? null,
                'para'                   => $request->para                   ?? null,
                'abortus'                => $request->abortus                ?? null,
                'usia_kehamilan_minggu'  => $request->usia_kehamilan_minggu  ?? null,
                'hpl'                    => $request->hpl                    ?? null,
                // Leopold
                'leopold_tfu'            => $request->leopold_tfu            ?? null,
                'leopold_i'              => $request->leopold_i              ?? null,
                'leopold_ii_punggung'    => $request->leopold_ii_punggung    ?? null,
                'leopold_ii_posisi'      => $request->leopold_ii_posisi      ?? null,
                'leopold_iii'            => $request->leopold_iii            ?? null,
                'leopold_iii_masuk'      => $request->leopold_iii_masuk      ?? null,
                'leopold_iv_metode'      => $request->leopold_iv_metode      ?? null,
                'leopold_iv_konvergensi' => $request->leopold_iv_konvergensi ?? null,
                'leopold_iv_perlimaan'   => $request->leopold_iv_perlimaan   ?? null,
                'djj'                    => $request->djj                    ?? null,
                'djj_reguler'            => $request->djj_reguler            ?? null,
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

    public function update_dokter_pendaftaran(Request $request)
    {
        try {
            $json = [
                'noregister' => $request->noregister,
                'kddokter'   => $request->kddokter,
                'id_client'  => Session::get('id_client'),
            ];

            $url_simrs = $this->ws_simrs . 'index.php/api/Triaseigd/update_dokter_dpjp';
            $client = new Client();
            $response = $client->post($url_simrs, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ]
            ]);
            $body = $response->getBody()->getContents();

            return $body;
        } catch (\Exception $e) {
            return response()->json([
                'metadata' => ['code' => 500, 'message' => $e->getMessage(), 'function' => 'update_dokter_pendaftaran']
            ]);
        }
    }

    public function get_notif_penunjang_json(Request $request)
    {
        try {

      if (empty($request->kodeunit)) {
            // Ambil data session
            $session_units = Session::get('kodeunit_login');
            // Gunakan array_filter untuk menghapus elemen kosong jika ada koma di akhir
            $ruang_rawat_array = array_filter(explode(",", $session_units));
        }

        date_default_timezone_set("Asia/Jakarta");
        $startdate = $request->startdate;
        $startdate = date('Y-m-d', strtotime($startdate));
            $json = [
                'mode'      => $request->mode,
                'kodeunit'  => !empty($request->kodeunit) ? $request->kodeunit : $ruang_rawat_array,
                'id_client' => Session::get('id_client'),
                'tglawal'   => $startdate   ?? date('Y-m-d'),
            ];

           // var_dump(json_encode($json,true));

            $url = $this->ws_simrs . 'index.php/api/transaksi_pasien/get_notif_penunjang_json';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => '',
                ],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);

            return $response->getBody()->getContents();

        } catch (Throwable $e) {
            return response()->json([
                ['metadata' => ['code' => 201, 'message' => $e->getMessage(), 'function' => 'get_notif_penunjang_json']]
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


            $is_user_igd = (int)Session::get('USER_IGD');

            if($is_user_igd==0)
            {
                if($request->lokasiSelected["START_TIME"] != "00:00:00") {
                        $current_time = date('H:i:s');
                        $start_time   = $request->lokasiSelected["START_TIME"]; // 17:00:00
                        $end_time     = $request->lokasiSelected["END_TIME"];   // 07:59:59

                        if ($start_time < $end_time) {
                            // jadwal dalam hari yang sama (mis. 08:00 - 15:30)
                            $allowed = ($current_time >= $start_time) && ($current_time <= $end_time);
                        } else {
                            // jadwal lintas hari (mis. 17:00 - 07:59)
                            $allowed = ($current_time >= $start_time) || ($current_time <= $end_time);
                        }

                        if (!$allowed) {
                            return response()->json([
                                'metadata' => [
                                    'code' => 201,
                                    'message' => $request->lokasiSelected["DISPLAY"] .
                                        " hanya melayani pada jam {$start_time} - {$end_time}"
                                ]
                            ]);
                        }
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


            $klinis ="";
            if(isset($request->klinis))
            {
                $klinis =$request->klinis;
            }

            $catatan ="";
            if(isset($request->catatan))
            {
                $catatan =$request->catatan;
            }
            else
            {
                $catatan =$request->DATA_SINGKAT;
            }

            $data['header']=[
                "RECEIPT_NO"=> '',
                "MEMBERSHIP_ID"=> $request->NOMR,
                "SALESNO"=> 0,
                "IDUSER"=> Session::get('user_id'),
                "TANGGAL"=>$waktu_masuk,
                "IDPAYEMENT"=>0,
                "NOTE"=>$catatan,
                "SUBTOTAL"=> 0.0,
                "TAXPERCENT"=> 0,
                "TAXAMOUNT"=>0.0,
                "TOTALBAYAR"=> 0.0,
                "POTONGAN"=> 0.0,
                "MODE"=>$request->modesales,
                "IDCLIENT"=> Session::get('id_client'),
                "GRANDTOTAL"=> 0.0,
                "KEMBALIAN"=> 0.0,5,
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
                "KLINIS"=>$klinis,
                "JENIS_RESEP"=> $request->selectedjns_resep,
                "CARAPAKAI_RACIK"=> $request->dosis_racik,
                "JML_RACIK"=> $request->jml_kemasan,
                "BENTUK_RACIK"=> $request->bentuk_racik_selected,
                "OBAT_PULANG"=>$request->isObatPulang,
                "details"=>$dataitem
            ];

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

    public function getheader_sales_v2(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "tglmin"=>$request->tglmin,
                "tglmax"=>$request->tglmax,
                "noregister"=>$request->NOPENDAFTARAN,
                "receipt_no"=>$request->RECEIPT_NO,
                "mode"=>$request->mode,
            ];

            $url_simrs =  $this->ws_inv.'index.php/api/sales/header_sales_v2'; // Replace this with the API endpoint URL
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

    public function konfirmasi_terimaObat(Request $request)
    {
        try
        {
            $json=[
                "IDCLIENT"=>Session::get('id_client'),
                "RECEIPT_NO"=>$request->RECEIPT_NO,
                "USER_ID"=>Session::get('user_id'),
            ];

            $url_simrs =  $this->ws_inv.'index.php/api/data_referensi/konfirmasi_terimaObat'; // Replace this with the API endpoint URL
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

    public function getheader_penunjang_v2(Request $request)
    {
        try
        {
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "jenisdata"=>$request->jenisdata,
            ];

            $url_simrs =  $this->ws_inv.'index.php/api/sales/riwayat_penunjang_v2'; // Replace this with the API endpoint URL
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

            $url_simrs = $this->ws_inv.'index.php/api/sales/billv2'; //billv2 Replace this with the API endpoint URL
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

      public function getdetils_sales_radiologi(Request $request)
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

            $url_simrs = $this->ws_inv.'index.php/api/sales/billv4'; //billv2 Replace this with the API endpoint URL
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
            "kodeboking"=>$request->kodeboking,
            "user_id"=>$request->username,
            "pwd"=>$request->pwd,
            "mode"=>$request->mode,
            "paramArray"=>$request->paramArray || [],
            "id_client"=>Session::get('id_client'),
        ];

        //return;
        //var_dump($json);
        if(Session::get('id_client')==0) //RUMKIT MENGGUNAKAN TTE
        {
            $this->ttd_file($json);
        }

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
                "prosedur"=>$request->prosedur,
                "elergi_arr"=>$request->elergi_arr,
                "elergi_deskripsi"=>$request->elergi_deskripsi,
                "riwayat_panyakit_kel"=>$request->riwayat_panyakit_kel,
                "riwayat_panyakit_kel_lainnya"=>$request->riwayat_panyakit_kel_lainnya,
                "data_survey_fisik"=>$request->data_survey_fisik,
                "id_client"=>Session::get('id_client'),
                "user_id"=>Session::get('user_id')
            ];


            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/kajian_awal_dokter_v2'; // Replace this with the API endpoint URL
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

    public function get_persiapan_operasi(Request $request)
    {
        try
        {
            $json=[
                "kodeboking"=>$request->kodeboking,
                "id_client"=>Session::get('id_client'),
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_persiapan_operasi';
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

    public function persiapan_operasi(Request $request)
    {
        try
        {
            $json = $request->all();
            $json['id_client'] = Session::get('id_client');

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/persiapan_operasi';
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

    public function get_riwayat_kajian_awal_perawat(Request $request)
    {
        try
        {
            $json=[
                "nomr"=>$request->nomr,
                "id_client"=>Session::get('id_client'),
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_riwayat_kajian_awal_perawat'; // Replace this with the API endpoint URL
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

    public function get_kajian_awal_dokter_v2(Request $request)
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

            $url_simrs =  $this->ws_simrs.'index.php/api/Triaseigd/get_kajian_awal_dokter_v2'; // Replace this with the API endpoint URL
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
            $tanggal_kematian = $request->tanggal_kematian ? date('Y-m-d H:i:s', strtotime($request->tanggal_kematian)) : null;
            $tanggal_pulang   = $request->tanggal_pulang   ? date('Y-m-d H:i:s', strtotime($request->tanggal_pulang))   : null;
            $json=[
                "noregister"=>$request->noregister,
                "keadaan_saat_pulang"=>$request->keadaan_saat_pulang,
                "rs_tujuan_rujuk"=>$request->rs_tujuan_rujuk,
                "cara_keluar"=>$request->cara_keluar,
                "asal_ruangan"=>$request->asal_ruangan,
                "kondisi_meniggal"=>$request->kondisi_meniggal,
                "norm"=>$request->norm,
                "sebab_meninggal"=>$request->sebab_meninggal,
                "alasan_batal"=>$request->alasan_tidak_jadi_berobat,
                "tanggal_kematian"=>$tanggal_kematian,
                "dpjpSelected"=>$request->dpjpSelected,
                "data_pindah_ruangan"=>$request->data_pemindahan,  //jika pasien mendapat ranap
                "tanggal_pulang"=>$tanggal_pulang,
                "cara_bayar"=>$request->cara_bayar,
                "id_client"=>Session::get('id_client'),
                "nosep"=>$request->nosep,  //jika pasien mendapat ranap
                "user_id"=>isset($request->username) ? $request->username : Session::get('user_id'),
                "username"=>$request->username ?? null,  //otorisasi, nullable jika cara_keluar bukan 5
                "pwd"=>$request->pwd ?? null,  //otorisasi, nullable jika cara_keluar bukan 5
            ];

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

    public function generate_token_ss()
    {
        try {
            $formData = [
                'client_id' => Session::get('satu_sehat_idclient'),
                'client_secret' => Session::get('satu_sehat_client_secret'),
                'grant_type' => 'client_credentials',
            ];

            $url = $this->ws_satu_sehat.'oauth2/v1/accesstoken?grant_type=client_credentials';
            $client = new Client();
            $response = $client->post($url, [
                'form_params' => $formData,
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded'
                ]
            ]);

            if ($response->getStatusCode() == 200) {
                $RESPONSE_SATUSEHAT = 200;
                $responseData = $response->getBody()->getContents();
                $responseData = json_decode($responseData,true);
            } else {
                $responseData = (string) $response->getStatusCode();
                $RESPONSE_SATUSEHAT = 201;
            }

            $body = $response->getBody()->getContents();

            $metadata['response'] = $responseData;
            $metadata['metadata'] = ['status'=>$RESPONSE_SATUSEHAT];

            return json_encode($metadata,true);
        } catch (\Exception $e) {
            return response()->json([
                'metadata' => [
                    'code' => 201,
                    'message' => $e->getMessage()
                ]
            ], 500);
        }
    }

    public function data_kfa(Request $request)
    {
        $data = $this->generate_token_ss();
       // var_dump($data);
        $res = json_decode($data, true);

        if (!isset($res['response']['access_token'])) {
            return response()->json([
                'metadata' => [
                    'code' => 401,
                    'message' => 'Invalid access token'
                ]
            ], 401);
        }

        try {

            //https://api-satusehat.kemkes.go.id/kfa-v2/products/all?page=2&size=10&product_type=farmasi&keyword=ibu
            switch ($request->mode) {
                case 1:
                    $url = $this->ws_satu_sehat . 'kfa-v2/products/all?page=1&size=30&product_type=all&keyword=' . urlencode($request->param);
                    break;

                case 2:
                    $url = $this->ws_satu_sehat . 'kfa-v2/products?identifier=kfa&code=' . urlencode($request->kfacode);
                    break;

                default:
                    $url = null; // Handle unexpected mode values
                    break;
            }


            $client = new Client();
            $response = $client->get($url, [
                //'json' => $formData,
                'headers' => [
                    'Authorization' => 'Bearer ' . $res['response']['access_token'],
                    'client_id' => Session::get('satu_sehat_idclient'),
                    'client_secret' => Session::get('satu_sehat_client_secret'),
                    'Content-Type' => 'application/json'
                ]
            ]);

            if ($response->getStatusCode() == 200) {
                $RESPONSE_SATUSEHAT = 200;
                $responseData = json_decode($response->getBody()->getContents(), true);
            } else {
                $RESPONSE_SATUSEHAT = $response->getStatusCode();
                $responseData = ['error' => $response->getStatusCode()];
            }

            return response()->json([
                'response' => ($request->mode == 1) ? $responseData['items'] : $responseData,
                'metadata' => [
                    'status' => $RESPONSE_SATUSEHAT
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => $e->getMessage()
                ]
            ], 500);
        }

    }

    // Sama seperti getprofile_rs() di LoginController/DatareferensiController,
    // diduplikasi di sini agar data_kfa_api() tidak bergantung pada controller lain.
    public function getprofile_rs($id_client)
    {
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $url = $url_simrs."/index.php/api/Data_referensi/get_profile_rs/".$id_client;
        $client = new Client();
        $response = $client->get($url, [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }

    // Versi generate_token_ss() yang menerima kredensial sebagai parameter,
    // bukan dari Session::get() — dipakai oleh data_kfa_api() yang stateless.
    private function generate_token_ss_by_client($satu_sehat_idclient, $satu_sehat_client_secret)
    {
        try {
            $formData = [
                'client_id' => $satu_sehat_idclient,
                'client_secret' => $satu_sehat_client_secret,
                'grant_type' => 'client_credentials',
            ];

            $url = $this->ws_satu_sehat.'oauth2/v1/accesstoken?grant_type=client_credentials';
            $client = new Client();
            $response = $client->post($url, [
                'form_params' => $formData,
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded'
                ]
            ]);

            if ($response->getStatusCode() == 200) {
                $RESPONSE_SATUSEHAT = 200;
                $responseData = json_decode($response->getBody()->getContents(), true);
            } else {
                $responseData = (string) $response->getStatusCode();
                $RESPONSE_SATUSEHAT = 201;
            }

            $metadata['response'] = $responseData;
            $metadata['metadata'] = ['status'=>$RESPONSE_SATUSEHAT];

            return json_encode($metadata,true);
        } catch (\Exception $e) {
            return response()->json([
                'metadata' => [
                    'code' => 201,
                    'message' => $e->getMessage()
                ]
            ], 500);
        }
    }

    // Ambil SEMUA halaman produk KFA untuk satu product_type (loop page 1..N
    // sampai halaman terakhir), dipakai oleh mode 3 (load all) di data_kfa_api().
    private function sync_all_kfa_data($access_token, $client_id, $client_secret, $product_type = 'farmasi', $size = 1400)
    {
        $allItems = [];
        $page = 1;
        $maxPages = 200; // batas pengaman agar tidak looping tanpa henti

        while ($page <= $maxPages) {
            $url = $this->ws_satu_sehat . "kfa-v2/products/all?page={$page}&size={$size}&product_type=" . urlencode($product_type);

            $client = new Client();
            $response = $client->get($url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $access_token,
                    'client_id' => $client_id,
                    'client_secret' => $client_secret,
                    'Content-Type' => 'application/json'
                ]
            ]);

            if ($response->getStatusCode() != 200) {
                break;
            }

            $responseData = json_decode($response->getBody()->getContents(), true);
            $items = $responseData['items'] ?? [];

            if (empty($items)) {
                break;
            }

            $allItems = array_merge($allItems, $items);

            if (count($items) < $size) {
                break; // halaman terakhir
            }

            $page++;
        }

        return $allItems;
    }

    // Versi API dari data_kfa() — dipanggil tanpa sesi browser, sehingga
    // kredensial SATU SEHAT diambil dari id_client yang dikirim di request,
    // bukan dari Session::get('satu_sehat_idclient'/'satu_sehat_client_secret').
    public function data_kfa_api(Request $request)
    {
        if (!$request->id_client) {
            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Parameter id_client wajib diisi'
                ]
            ], 400);
        }

        $profile_rs = json_decode($this->getprofile_rs($request->id_client), true);

        if (empty($profile_rs['satu_sehat_idclient']) || empty($profile_rs['satu_sehat_client_secret'])) {
            return response()->json([
                'metadata' => [
                    'code' => 404,
                    'message' => 'Kredensial SATU SEHAT untuk id_client ini tidak ditemukan'
                ]
            ], 404);
        }

        $data = $this->generate_token_ss_by_client(
            $profile_rs['satu_sehat_idclient'],
            $profile_rs['satu_sehat_client_secret']
        );
        $res = json_decode($data, true);

        if (!isset($res['response']['access_token'])) {
            return response()->json([
                'metadata' => [
                    'code' => 401,
                    'message' => 'Invalid access token'
                ]
            ], 401);
        }

        try {

            switch ($request->mode) {
                case 1:
                    $url = $this->ws_satu_sehat . 'kfa-v2/products/all?page=1&size=30&product_type=all&keyword=' . urlencode($request->param);
                    break;

                case 2:
                    $url = $this->ws_satu_sehat . 'kfa-v2/products?identifier=kfa&code=' . urlencode($request->kfacode);
                    break;

                case 3:
                    // Load all: loop seluruh halaman KFA untuk product_type tertentu dan
                    // kembalikan gabungan semuanya, bukan hanya satu halaman seperti mode 1.
                    $productType = $request->product_type ?: 'farmasi';
                    $allItems = $this->sync_all_kfa_data(
                        $res['response']['access_token'],
                        $profile_rs['satu_sehat_idclient'],
                        $profile_rs['satu_sehat_client_secret'],
                        $productType
                    );

                    return response()->json([
                        'response' => $allItems,
                        'metadata' => [
                            'status' => 200,
                            'total' => count($allItems)
                        ]
                    ]);

                default:
                    $url = null; // Handle unexpected mode values
                    break;
            }

            $client = new Client();
            $response = $client->get($url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $res['response']['access_token'],
                    'client_id' => $profile_rs['satu_sehat_idclient'],
                    'client_secret' => $profile_rs['satu_sehat_client_secret'],
                    'Content-Type' => 'application/json'
                ]
            ]);

            if ($response->getStatusCode() == 200) {
                $RESPONSE_SATUSEHAT = 200;
                $responseData = json_decode($response->getBody()->getContents(), true);
            } else {
                $RESPONSE_SATUSEHAT = $response->getStatusCode();
                $responseData = ['error' => $response->getStatusCode()];
            }

            return response()->json([
                'response' => ($request->mode == 1) ? $responseData['items'] : $responseData,
                'metadata' => [
                    'status' => $RESPONSE_SATUSEHAT
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => $e->getMessage()
                ]
            ], 500);
        }
    }

    public function GetDataPasien_v3(Request $request)
    {

      try {
            date_default_timezone_set("Asia/Jakarta");

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "mode"=>$request->mode,
                "nomr" => $request->nomr,
            ];

            // Validate required data

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/GetDataPasien_v3", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                'timeout' => 30, // Add timeout setting
                'connect_timeout' => 10
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

    public function update_kode_kfa(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "mode"=>$request->mode,
                "kfa_code" => $request->kfa_code,
                "user_id" => Session::get('user_id'),
                "barcode" => $request->barcode,
                "kategori" => $request->kategori,
                "sub_barcode" => $request->sub_barcode,
                "active_ingredients"=>$request->active_ingredients,
                "volume_uom_name"=>$request->volume_uom_name,
                "dosage_form"=>$request->dosage_form
            ];

            // Validate required data

            $response = $client->post($this->ws_inv."index.php/api/barang/update_kode_kfa", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                'timeout' => 30, // Add timeout setting
                'connect_timeout' => 10
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

    public function update_loinc_radiologi(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "loinc"=>$request->loinc,
                "snomad_ct"=>$request->snomad_ct,
                "user_id" => Session::get('user_id'),
                "barcode" => $request->barcode
            ];

            // Validate required data

            $response = $client->post($this->ws_inv."index.php/api/barang/update_loinc_radiologi", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                'timeout' => 30, // Add timeout setting
                'connect_timeout' => 10
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

    public function printResume_medis(Request $request)
    {
        //return $request->all();
        //$payload = $request->json()->all(); // or $request->input()
        $payload =$request->json()->all();

        return $this->service->printResume_medis($payload);
    }

    public function simpan_konsul(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

            $client = new Client();
            $tanggal = date('Y-m-d H:i:s', strtotime($request->tanggal));

           $json = [
                'jenis_konsul'          => $request->mohonDilakukan,
                'berat_badan'           => $request->beratBadan,
                'tinggi_badan'          => $request->tinggiBadan,
                'dx_medis'              => $request->diagnosaMedis,
                'pemeriksaan_lab'       => $request->pemeriksaanLab,
                'pengobatan_penting'    => $request->pengobatanPenting,
                'diet_yang_dianjurkan'  => $request->diet,
                'tanggal'               => $tanggal,
                'noregister'            => $request->noregister,
                'nomr'                  => $request->nomr,
                'id_client'             => (int)Session::get('id_client'),
                'user_id'               => Session::get('user_id'),
            ];
            // Validate required data


            $response = $client->post($this->ws_simrs."index.php/api/triaseigd/insert_konsul_gizi", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                'timeout' => 30, // Add timeout setting
                'connect_timeout' => 10
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

    public function get_riwayat_konsul(Request $request)
    {

         try {
            date_default_timezone_set("Asia/Jakarta");

           $json = [
                'noregister'=> $request->noregister,
                'mode'=> $request->mode,
            ];
            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/triaseigd/get_data_assesment_gizi_lanjut", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ],
                'timeout' => 30, // Add timeout setting
                'connect_timeout' => 10
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

    public function get_dokter_pindahruangan(Request $request)
    {

         try {
            date_default_timezone_set("Asia/Jakarta");
            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/triaseigd/get_dokter_pindahruangan/".$request->noregister, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ],
                'timeout' => 30,
                'connect_timeout' => 10
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



    public function insert_data_tim_operasi()
    {

        // Mapping: ambil nama dokter/perawat saja
        $insert = [
            'noregister'      => $data['noregister'],
            'kodeboking'      => isset($data['kodeboking']) ? $data['kodeboking'] : null,
            'dr_bedah'        => isset($data['dr_bedah']['KDDOKTER']) ? $data['dr_bedah']['KDDOKTER'] : null,
            'dr_anestesi'     => isset($data['dr_anestesi']['KDDOKTER']) ? $data['dr_anestesi']['KDDOKTER'] : null,
            'prw_bedah_1'     => isset($data['prw_bedah_1']['NAMA_USER']) ? $data['prw_bedah_1']['NAMA_USER'] : null,
            'ast_dr_bedah_1'  => isset($data['ast_dr_bedah_1']['KDDOKTER']) ? $data['ast_dr_bedah_1']['KDDOKTER'] : null,
            'ast_dr_anestesi' => isset($data['ast_dr_anestesi']['KDDOKTER']) ? $data['ast_dr_anestesi']['KDDOKTER'] : null,
            'prw_bedah_2'     => isset($data['prw_bedah_2']['NAMA_USER']) ? $data['prw_bedah_2']['NAMA_USER'] : null,
            'ast_dr_bedah_2'  => isset($data['ast_dr_bedah_2']['KDDOKTER']) ? $data['ast_dr_bedah_2']['KDDOKTER'] : null,
            'dr_anak'         => isset($data['dr_anak']['KDDOKTER']) ? $data['dr_anak']['KDDOKTER'] : null,
            'prw_sirkuler'    => isset($data['prw_sirkuler']['NAMA_USER']) ? $data['prw_sirkuler']['NAMA_USER'] : null,
            'ast_dr_bedah_3'  => isset($data['ast_dr_bedah_3']['KDDOKTER']) ? $data['ast_dr_bedah_3']['KDDOKTER'] : null,
            'prw_anak'        => isset($data['prw_anak']['NAMA_USER']) ? $data['prw_anak']['NAMA_USER'] : null,
            'prw_instrumen'   => isset($data['prw_instrumen']['NAMA_USER']) ? $data['prw_instrumen']['NAMA_USER'] : null,
            'id_client'       => $data['id_client'],
            'created_at'      => date('Y-m-d H:i:s'),
            'updated_at'      => date('Y-m-d H:i:s')
        ];

        $this->db->insert('tim_operasi', $insert);


    }





}
