<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Str;
use GuzzleHttp\Client;

class ttdService
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

    public function printResume_medis($json)
    {    
            

        $profile_rs = $this->getprofile_rs($json['id_client']);
 

        $profile_rs = json_decode($profile_rs,true); 

        //return $profile_rs;  
        require_once app_path('Libraries/FPDF/fpdf.php'); 


        Storage::disk('public')->makeDirectory('resume'); 
        // Load FPDF  
        $data_trans_ps = $this->get_transaksi_pasien($json['noregister'],$json['id_client'],$mode=1);
        $data_trans_ps = json_decode($data_trans_ps,true);

     
        $data_trans_ps = $data_trans_ps['response'][0]; 


        $data_assesment = $this->get_data_assesment($json['noregister'],$json['id_client']);
        $data_assesment = json_decode($data_assesment,true);
        $data_assesment = $data_assesment['response'];
 
    
        $pdf = new \FPDF('P', 'mm', 'A4');  
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 14);
 

        // Judul
        // $pdf->Image($profile_rs['LINK_LOGO'], 10, 12, 45);

         // $pdf->Image("https://ws-simrs.link/assets/bpjs_icon.png", 10, 12, 45);
        $pdf->Cell(0, 10, $profile_rs['NAMA_RS'], 0, 1, 'L');
        $pdf->SetFont('Arial', '', 10);

        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(0, 10, 'RESUME MEDIS ('.$data_trans_ps['NOPENDAFTARAN'].")", 0, 1, 'L');
        $pdf->SetFont('Arial', '', 10);

        // ================== DATA PASIEN ==================
        $pdf->Cell(30, 6, 'No RM', 0, 0);
        $pdf->Cell(60, 6, ': '.$data_trans_ps['NOMR'], 0, 0);
        $pdf->Cell(30, 6, 'Alamat', 0, 0);
        $pdf->Cell(60, 6, ': '.$data_trans_ps['NOMR'], 0, 1);

        $pdf->Cell(30, 6, 'Nama', 0, 0);
        $pdf->Cell(60, 6, ': '.$data_trans_ps['DATA_SINGKAT'], 0, 0);  
        $pdf->Cell(30, 6, 'Umur', 0, 0);

        $usia = $data_trans_ps['USIA_PASIEN']['tahun']."T,".$data_trans_ps['USIA_PASIEN']['bulan']."B,".$data_trans_ps['USIA_PASIEN']['hari']."H";
        $pdf->Cell(60, 6, ': '.$usia, 0, 0); 
       
        $pdf->Cell(30, 6, '', 0, 0);
        $pdf->Cell(60, 6, '', 0, 1);

        $pdf->Cell(30, 6, 'Tgl Lahir', 0, 0);
        $pdf->Cell(60, 6, ': 1956-12-31', 0, 0);
        $pdf->Cell(30, 6, 'Jenis Rawat', 0, 0);
        $pdf->Cell(60, 6, ':'.$data_trans_ps['JENISRAWAT'], 0, 1);

        // $pdf->Cell(30, 6, '', 0, 0);
        // $pdf->Cell(60, 6, '', 0, 0);
        $pdf->Cell(30, 6, 'Poli/Ruang', 0, 0);
        $pdf->Cell(60, 6, ':'.$data_trans_ps['POLI'], 0, 0);
        
        $pdf->Cell(30, 6, 'Tgl Reg', 0, 0);
        $pdf->Cell(60, 6, ': '.$data_trans_ps['TGLREG'], 0, 1);

        $pdf->Ln(7);

        // ================== ANAMNESIS ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'ANAMNESIS', 0, 1, 'L', true);
        $pdf->Ln(3);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->MultiCell(0, 6, $data_assesment['subjek']);
        $pdf->Ln(3);
        // ================== PEMERIKSAAN FISIK ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'PEMERIKSAAN FISIK', 0, 1, 'L', true);

        $pdf->SetTextColor(0, 0, 0);
        $pdf->MultiCell(0, 6, "Tensi : ".$data_assesment['tensi']."   SpO2 : ".$data_assesment['sp2o']."      Respirasi/Menit :  ".$data_assesment['respirasi_perm']."   BB : ".$data_assesment['berat_badan']."  Kg\nSuhu : ".$data_assesment['suhu']." C   GCS(E,V,M) : ".$data_assesment['cgs']."   Nadi/Menit : ".$data_assesment['nadi_permenit']."   TB : ".$data_assesment['tinggi_badan']." Cm");

        $pdf->Ln(3);

        // ================== PEMERIKSAAN PENUNJANG ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'PEMERIKSAAN PENUNJANG', 0, 1, 'L', true);
        $pdf->MultiCell(0, 6,$data_assesment['penunjang'] );


        $pdf->SetTextColor(0, 0, 0);
        $pdf->Ln(5);

        // ================== DIAGNOSA ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'DIAGNOSA', 0, 1, 'L', true);

        $pdf->SetTextColor(0, 0, 0);
        $pdf->MultiCell(0, 6, $data_assesment['asesmen'] );
        $pdf->Ln(2);
        $pdf->MultiCell(0, 6, "Diagnosa :".$data_assesment['diagnosa']."\nProcedure : ".$data_assesment['procedure']);

        // ================== TERAPI ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'TERAPHY/ OBAT YANG DIBERIKAN', 0, 1, 'L', true);

        $pdf->SetTextColor(0, 0, 0);
        $terapi =  $data_assesment['obat'];
        $pdf->MultiCell(0, 6, $terapi);

        $pdf->Ln(3);

        // ================== RENCANA TINDAK LANJUT ==================
        $pdf->SetFillColor(0, 128, 128);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(0, 6, 'RENCANA TINDAK LANJUT (PLAN)', 0, 1, 'L', true);

        $pdf->SetTextColor(0, 0, 0);
        $pdf->MultiCell(0, 6, $data_assesment['plan']);

        $pdf->Cell(0, 1, '', 0, 1, 'L', true);
        $pdf->Ln(15);

        // ================== FOOTER DOKTER ==================
        $pdf->Cell(0, 6, 'Dokter Penanggung Jawab Pasien', 0, 1, 'R');
        $pdf->Ln(5);

        // Tambah QR Code (contoh file PNG lokal)
            ///////////// QR
        // First check if the library exists
        $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');
        if (!file_exists($libraryPath)) {
            throw new Exception("QR Code library not found. Please install it first.");
        }

        require_once $libraryPath;	 

        $uuID = Str::uuid();

        $fileName = $uuID . '.pdf';

        // Pastikan folder ada
        $tempDir = storage_path('app/public/resume'); 
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        } 

        // File sementara QR
        $qrFile = $tempDir . $uuID  . '.png';

        // Generate QR Code
        \QRcode::png($data_trans_ps['NAMADOKTER'], $qrFile);

        // Pakai di PDF (posisi: x=180, y=30, lebar=18, tinggi=18 mm)
        //$pdf->Image($qrFile, 150, 30, 18, 18);
        $pdf->Image($qrFile, 155, $pdf->GetY()-5, 20, 20);

        // Hapus file QR setelah dipakai
        unlink($qrFile);
        ///////////// 
      

        $pdf->Ln(15);
        $pdf->Cell(0, 6, $data_trans_ps['NAMADOKTER'], 0, 1, 'R');

        // ================== SIMPAN FILE ================== 
 
       
        $storagePath = storage_path("app/public/resume/{$fileName}");  

        $pdf->Output($storagePath, 'F'); 

        //$fileUrl = asset("backend_dashbord/storage/app/public/resume/{$fileName}");
 

        $param =[
            'path_url'=>$storagePath,
            'file_name'=>$fileName,
            'nik'=>$json['nik'],
            'passphrase'=>$json['passphrase'],
            'nama_dokumen'=>'Resume',
            'id_client'=>$json['id_client'],
            'halaman'=>isset($json['halaman']) ? $json['halaman'] : 1
        ];    
 
 
        if($profile_rs['use_tte_bsre']==1)
        { 
            //return $param;
            $ttd = $this->ttd_file_v3($param); 

            return $ttd;
        }
        else
        {
            return $storagePath;
        }  
    } 

    public function get_transaksi_pasien($noregister,$id_client,$mode)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client(); 

           $json = [
                'noregister'=> $noregister,
                'id_client'=> $id_client, 
                'mod'=> $mode
            ];
            // Validate required data 
            $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/history_versi4", [
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

    public function get_data_assesment($noregister,$id_client)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");
            
            $client = new Client(); 
 
            // Validate required data 
            $response = $client->get($this->ws_simrs."index.php/api/transaksi_pasien/getdata_asesmen/".$noregister."/".$id_client, [
                'json' => "",
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

    public function getprofile_rs($id_client)
    {
        $url_simrs = 'https://ws-simrs.link/ws_sim_v2'; // Replace this with the API endpoint URL
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


    public function ttd_file_v3($data)
    {
        try
        {        

             
                
            //var_dump($data);
               // echo "path_url found: " . $data['path_url'] . "\n";
           
            // $rawJson = $request->getContent();
               
           // $filePath = $data;
            //$filePath = storage_path('app/public/'.$data['path_url']);
            
            $client = new Client();
            $response = $client->post('http://10.0.8.200/api/sign/pdf',[
                'auth'=>[
                    'esign', 'qwerty'
                ], 
                'multipart' => [ 
                    [
                        'name' => 'file',
                        'contents' => fopen($data['path_url'],'r'),
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
                        'contents'=>fopen("https://ws-simrs.link/logo/bsre1.png",'r')
                    ],
                    [
                        'name'     => 'nik',
                        'contents' => $data['nik'] //'1105012709950003',
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
                    ]
                ]
            ); 

            $body = $response->getBody()->getContents();  
           
            if($this->isPdf($body))  
            {  
                // $file_name = Str::uuid() . '.pdf';
                //$file_name = time() . '_document.pdf';

                $path = storage_path('app/public/TTD/'.$data['file_name']); //LOCAL (DEBUG) 

                file_put_contents($path, $body);  


                $path = asset("backend_dashbord/storage/app/public/TTD/{$data['file_name']}"); 


                $json = ['code'=>200,'message'=>'Tanda tangan elektronik berhasil '.$data['nik'],
                'perihal'=>$data['nama_dokumen'],"no_ref"=>$data['nik'],'id_client'=>$data['id_client']];  
                // 

                $this->logging_tte($json);   

                $response = [
                    "path"=>$path,
                    "code"=>200,
                    "message"=>"suksess" 
                ]; 

                return $response;
            }
            else
            { 

                $res = json_decode($body,true); 

                $json = ['code'=>201,'message'=>$res['error']." ".$data['nik'],'perihal'=>'','id_client'=>$data['id_client']]; 
     
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


    public function logging_tte($data)
    {
        try
        { 
            $json=[ 
                'user_id'=>isset($data['nik']) ? $data['nik'] : "",
                "id_client"=>isset($data['id_client']) ? $data['id_client'] :"",  
                "stts"=>isset($data['code']) ? $data['code'] : "",
                'perihal'=>isset($data['perihal']) ? $data['perihal'] : "",
                "message"=>isset($data['message']) ?  $data['message']: "",
                "no_ref"=>isset($data['nik']) ? $data['nik']: ""
            ];

            $url_simrs = 'https://ws-simrs.link/ws_sim_v2'; // Replace this with the API endpoint URL 
            $client = new Client();
            $response = $client->post($this->ws_simrs."/index.php/api/data_referensi/simpan_log", [ 
            'json' => $json,
            'headers' => [ 
                'Content-Type' => 'application/json',
                'Authorization' => '',  
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
}
