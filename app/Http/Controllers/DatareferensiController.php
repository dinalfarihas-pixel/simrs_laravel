<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use PDF;
use DateTime;

class DatareferensiController extends Controller
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

    public function pagemasterdokter()
    {
        return view('referensi.dokter.master');
    }

    public function getmasterdokter()
    {
        //$url = 'https://ws-simrs.link/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();

        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/datadokter/".Session::get('id_client')."/2", [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        //dd($response);
        $body = $response->getBody()->getContents();

        return $body;

    }



    public function simpan_edit_dokter(Request $request)
    {

        $json = ["KDDOKTER"=>$request->kddokter,
            "KDPOLY"=>$request->polibpjs_selected['kdpoli'],
            "KDPOLY_BPJS"=>$request->polibpjs_selected['kdpoli'],
            "NAMAPROFESI"=>$request->polibpjs_selected['namapoli_display'],
            "NAMADOKTER"=>$request->namadokter,
            "KDPROFESI"=>$request->polibpjs_selected['kdpoli'],
            "st_aktif"=>1,
            "KODE_DOKTER_BPJS"=>$request->kddokter,
            "NIK"=>$request->nik,
            "ID_CLIENT"=>Session::get('id_client')
        ];

        //$url = 'https://ws-simrs.link/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/simpan_edit_dokter", [
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

    public function getnamadokter(Request $request)
    {
        $json = [
            "id_client"=>Session::get('id_client'),
            "mode"=>$request->mode,
            "nama"=>$request->nama,
        ];

        //$url = 'https://ws-simrs.link/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/datadokterv3/", [
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

    public function carapulang()
    {
        $client = new Client();

        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/get_satatus_pasien/", [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;

    }

    public function survey_fisik_ranap(Request $request)
    {
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "noregister"=>$request->noregister
        ];

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/survey_fisik_ranap", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;

    }

    public function diagnosa_keperawatan(Request $request)
    {
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "noregister"=>$request->noregister
        ];

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/diagnosa_keperawatan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function get_data_alergi()
    {
        $client = new Client();

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_data_alergi", [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function get_data_ruangan(Request $request)
    {
        $client = new Client();

        $response = $client->get($this->ws_simrs."index.php/api/laporan/pasien_sedang_rawat_inap/".Session::get('id_client'), [
            'json' => '',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function input_bed(Request $request)
    {
        try {
            $client = new Client();

            $json = [
                "nama" => $request->nama,
                "id" => $request->id,
                "kelasSelected" => $request->kelasSelected,
                "jumlah_tt" => $request->jumlah_tt,
                "bed_rusak" => $request->bed_rusak,
                "mode"=> $request->mode,
                "id_client" => Session::get('id_client')
            ];

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/input_bed", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;
        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }

    }

    public function hapus_ruangan(Request $request)
    {
         try {
            $client = new Client();

            $json = [
                "id" => $request->id,
                "id_client" => Session::get('id_client')
            ];

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/hapus_ruangan", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;
        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function get_icd_v2(Request $request)
    {
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "mode"=>$request->mode,
            "param"=>$request->param
        ];

        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_icd_v2", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function generate_sep_older($json,$id_client)
    {
        $data = json_decode($json, true);
        $data = $data[0];

        //dd($data);

        //require_once app_path('Libraries/FPDF/fpdf.php');
        require_once app_path('Libraries/FPDF/fpdf.php');


        // First check if the library exists
        $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');

        if (!file_exists($libraryPath)) {
            throw new Exception("QR Code library not found. Please install it first.");
        }


        // Create instance of FPDF
   // Correct new FPDF object from the package
        // $pdf = new \Codedge\Fpdf\Fpdf\Fpdf('P', 'mm', 'A4');

                // Inisialisasi FPDF
        $pdf = new \FPDF('P', 'mm', [110, 210]); // [width, height] in mm
        // $pdf->AddPage();
       // $pdf = new \FPDF('P', 'mm', 'A5');

        // SETTING DASAR WAJIB SEBELUM AddPage
        $pdf->SetMargins(5,5,5);
       //$pdf->AddPage();
        $pdf->SetAutoPageBreak(true, 10);

        $pdf->AddPage();

        // Font default
        $pdf->SetFont('Arial', '', 9);
        //$pdf->SetAutoPageBreak(true, 10);  // Bottom margin (height)

        require_once $libraryPath;

        //Storage::disk('public')->makeDirectory('temp');

        // Then use it in your code
       // $tempDir = storage_path('public/temp/');
       $tempDir = storage_path('app/public/temp/');
       //$tempDir = asset("storage/sep/{$fileName}");


        //$pdf->Output(Storage::disk('public')->path('invoices/' . $fileName), 'F');

        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        $profile_rs = $this->getprofile_rs($id_client);
        $profil = json_decode($profile_rs,true);

       //return  $profil['LINK_LOGO'];

        // BPJS Logo
        $pdf->Image("https://ws-simrs.net/assets/bpjs_icon.png", 10, 12, 45);

        // Header text
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(50);  // Move to the right of logo
        $pdf->Cell(0, 5, 'SURAT ELEGIBILITAS PESERTA', 0, 1, 'L');
        $pdf->Cell(50);
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(0, 5, $profil['NAMA_RS'], 0, 1, 'L');
        $pdf->Ln(2);



        $pdf->SetFont('Arial', '', 8);

        // Left column
        $pdf->Cell(25, 4, 'No.SEP', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['NOSEP'], 0);

        // Right column
        $pdf->Cell(25, 4, 'Peserta', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['JENISPESERTA'], 0, 1);

        // Tgl SEP
        $pdf->Cell(25, 4, 'Tgl SEP', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['TGLSEP'], 0);

        // Jns.Rawat
        $pdf->Cell(25, 4, 'Jns.Rawat', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['JENISPELAYANAN'], 0, 1);

        // No. Kartu
        $pdf->Cell(25, 4, 'No. Kartu', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['NOKARTU'], 0);

        // Right side
        $pdf->Cell(25, 4, 'Jns.Kunjungan', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->MultiCell(0, 4, $data['TUJUAN_KUNJUNGAN']);





        $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        \QRcode::png($data['NOSEP'], $qrFile);

        // Use in PDF
        $pdf->Image($qrFile, 90, 30, 15, 15);

        unlink($qrFile);

        // Continue with other fields...
        $pdf->Cell(25, 4, 'Nama Peserta', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['NAMA'], 0, 0);

        // Right side
        $pdf->Cell(25, 4, 'Poli Perujuk', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['POLI'], 0, 1);
        //

        $pdf->Cell(25, 4, 'NORM', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['NORM'], 0, 0);
         // Right side
         $pdf->Cell(25, 4, 'Kelas Rawat', 0);
         $pdf->Cell(2, 4, ':', 0);
         $pdf->Cell(0, 4, $data['HAKKELAS'], 0, 1);
         //

        $pdf->Cell(25, 4, 'Tgl Lahir', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['TGLLAHIR'], 0, 0);


         // Right side
         $pdf->Cell(25, 4, 'Hak Kelas', 0);
         $pdf->Cell(2, 4, ':', 0);
         $pdf->Cell(0, 4, $data['HAKKELAS'], 0, 1);
         //


        $pdf->Cell(25, 4, 'Jenis Kelamin', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['JENISKELAMIN'], 0, 0);

         // Right side
         $pdf->Cell(25, 4, 'Penjamin', 0);
         $pdf->Cell(2, 4, ':', 0);
         $pdf->Cell(0, 4, $data['PENJAMIN'], 0, 1);
         //


        $pdf->Cell(25, 4, 'No.Telepon', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(70, 4, $data['NOTLP'], 0, 0);

        // Right side
        $pdf->Cell(25, 4, 'Petugas', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['USER_NAME'], 0, 1);
        //

        $pdf->Cell(25, 4, 'Sub/Spesialis', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['POLI'], 0, 1);

        $pdf->Cell(25, 4, 'Nama DPJP', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['NAMADOKTER'], 0, 1);

        $pdf->Cell(25, 4, 'Faskes Perujuk', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->Cell(0, 4, $data['PPKPERUJUK'], 0, 1);

        // Add diagnosa
        $pdf->Cell(25, 4, 'Diagnosa Awal', 0);
        $pdf->Cell(2, 4, ':', 0);
        $pdf->MultiCell(0, 4, $data['NAMADIAGNOSA'],0);

        // Generate QR Code
        // $qrData = "0020R0010125V002010"; // Data for the QR Code (e.g., No. SEP)
        // $qrFile = "qrcode.png"; // Temporary file to store the QR code
        //QRcode::png($qrData, $qrFile, QR_ECLEVEL_L, 5, 2); // Generate QR code

        // Add QR Code to PDF
        //$pdf->Image($qrFile, 150, 40, 30, 30); // X, Y, Width, Height

         // Add diagnosa
         $pdf->Cell(25, 4, 'Catatan', 0);
         $pdf->Cell(2, 3, ':', 0);
         $pdf->MultiCell(70, 4, $data['CATATAN'],0,'L');

        // Footer note
        // $pdf->Ln(2);


        $pdf->SetFont('Arial', 'I', 6);

        $pdf->Cell(100, 3, '*Saya menyetujui BPJS Kesehatan menggunakan informasi medis pasien jika diperlukan.', 0, 0, 'L');
        $pdf->Cell(90, 3, 'Dengan tampilnya SEP ini merupakan validasi terhadap', 0, 1, 'R');


        $pdf->Cell(100, 3, 'SEP bukan sebagai bukti penjamin peserta', 0, 0, 'L');
        $pdf->Cell(90, 3, 'eligibilitas Peserta secara elektronik dan peserta dapat', 0, 1, 'R');

        // $pdf->MultiCell(0, 4, 'Dengan tampilnya SEP ini merupakan validasi terhadap
        // eligibiitas Peserta secara elektronik dan peserta dapat
        // engakses pelayanan kesehatan rujukan sesuai ketentuan berlaku',0,0);


        // $pdf->SetFont('Arial', 'I', 6);
        // $pdf->MultiCell(0, 4, '*Saya menyetujui BPJS Kesehatan menggunakan informasi medis pasien jika diperlukan.
        // SEP bukan sebagai bukti penjamin peserta');

        $date = new DateTime();
        $pdf->Cell(0, 3, 'Cetakan Ke: 1 ' . $date->format('d/m/Y H:i') . ' WIB', 0, 1);

        // Make sure the directory exists before saving
        //Storage::disk('storage')->makeDirectory('sep');

        $timestamp = $date->format('Ymd_His');

        //$filePath = storage_path("app/public/sep/{$fileName}");
        // Save the file
        $fileName = $data['NOSEP'] . '_' . $timestamp . '.pdf';


        $storagePath = storage_path("app/public/sep/{$fileName}");
       // return $storagePath;
        // Save PDF file to storage
        //$storagePath = storage_path("backend_dashbord/storage/app/public/sep/{$fileName}");
        $pdf->Output($storagePath, 'F'); // Save file

        $fileUrl = url("backend_dashbord/storage/app/public/sep/{$fileName}");  //prod

        return $fileUrl;

    }

    public function generate_sep($json, $id_client)
    {
        $data = json_decode($json, true);
        $data = $data[0];

        require_once app_path('Libraries/FPDF/fpdf.php');

        $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');

        if (!file_exists($libraryPath)) {
            throw new Exception("QR Code library not found. Please install it first.");
        }

        // Initialize FPDF with proper page size for vertical layout
        $pdf = new \FPDF('P', 'mm', 'A4');
       // $pdf->SetMargins(8, 8, 8);
        $pdf->SetAutoPageBreak(true, 10);
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 9);

        require_once $libraryPath;

        $tempDir = storage_path('app/public/temp/');
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        $profile_rs = $this->getprofile_rs($id_client);
        $profil = json_decode($profile_rs, true);

        // HEADER SECTION
        $pdf->SetY(12);
        //$pdf->Image("https://ws-simrs.link/assets/bpjs_icon.png", 10, 8, 25);
        $pdf->Image("https://ws-simrs.net/assets/bpjs_icon.png", 10, 12, 45);
           // HEADER SECTION


        // Title and Hospital Name
        // $pdf->SetX(40);
        // $pdf->SetFont('Arial', 'B', 11);
        // $pdf->Cell(0, 6, 'SURAT ELEGIBILITAS PESERTA', 0, 1, 'L');
        // $pdf->SetX(40);
        // $pdf->SetFont('Arial', '', 9);
        // $pdf->Cell(0, 5, $profil['NAMA_RS'], 0, 1, 'L');

        // $pdf->Ln(2);


         // Header text
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(50);  // Move to the right of logo
        $pdf->Cell(0, 5, 'SURAT ELEGIBILITAS PESERTA', 0, 1, 'L');
        $pdf->Cell(50);
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(0, 5, $profil['NAMA_RS'], 0, 1, 'L');
        $pdf->Ln(2);

        // TWO-COLUMN LAYOUT FOR MAIN DATA
        $pdf->SetFont('Arial', '', 8);
        $col1_x = 10;
        $col2_x = 110;
        $y_start = $pdf->GetY();

        // Left Column Data
        $leftData = [
            ['No. SEP', $data['NOSEP']],
            ['Tgl SEP', $data['TGLSEP']],
            ['No. Kartu', $data['NOKARTU']],
            ['Nama Peserta', $data['NAMA']],
            ['NORM', $data['NORM']],
            ['Tgl Lahir', $data['TGLLAHIR']],
            ['Jenis Kelamin', $data['JENISKELAMIN']],
            ['No. Telepon', $data['NOTLP']],
            ['Sub/Spesialis', $data['POLI']],
            ['Nama DPJP', $data['NAMADOKTER']],
            ['Faskes Perujuk', $data['PPKPERUJUK']]
        ];

        // Right Column Data
        $rightData = [
            ['Peserta', $data['JENISPESERTA']],
            ['Jns. Rawat', $data['JENISPELAYANAN']],
            ['Jns. Kunjungan', $data['TUJUAN_KUNJUNGAN']],
            ['Poli Perujuk', $data['POLI']],
            ['Kelas Rawat', $data['HAKKELAS']],
            ['Hak Kelas', $data['HAKKELAS']],
            ['Penjamin', $data['PENJAMIN']],
            ['Petugas', $data['USER_NAME']],
        ];

        // Render two columns side by side
        $maxRows = max(count($leftData), count($rightData));
        $lineHeight = 4;

        for ($i = 0; $i < $maxRows; $i++) {
            $y = $y_start + ($i * $lineHeight);
            $pdf->SetXY($col1_x, $y);

            // Left column
            if (isset($leftData[$i])) {
                $pdf->SetFont('Arial', '', 8);
                $pdf->Cell(25, $lineHeight, $leftData[$i][0], 0, 0, 'L');
                $pdf->Cell(3, $lineHeight, ':', 0, 0, 'L');
                $pdf->Cell(70, $lineHeight, $leftData[$i][1], 0, 0, 'L');
            }

            // Right column
            $pdf->SetXY($col2_x, $y);
            if (isset($rightData[$i])) {
                $pdf->SetFont('Arial', '', 8);
                $pdf->Cell(25, $lineHeight, $rightData[$i][0], 0, 0, 'L');
                $pdf->Cell(3, $lineHeight, ':', 0, 0, 'L');
                $pdf->Cell(0, $lineHeight, $rightData[$i][1], 0, 0, 'L');
            }
        }

        // Move Y position after data section
        $pdf->SetY($y_start + ($maxRows * $lineHeight));

        // QR CODE
        // $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        // \QRcode::png($data['NOSEP'], $qrFile, QR_ECLEVEL_L, 4, 2);
        // $pdf->Image($qrFile, 160, 15, 35, 35);
        // unlink($qrFile);


        $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        \QRcode::png($data['NOSEP'], $qrFile);

        // Use in PDF
        $pdf->Image($qrFile, 90, 30, 15, 15);

        unlink($qrFile);

        // DIAGNOSA SECTION
        $pdf->Ln(3);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(25, 5, 'Diagnosa Awal', 0, 0, 'L');
        $pdf->Cell(3, 5, ' : ', 0, 0, 'L');
        $pdf->SetX(33);
        $pdf->MultiCell(0, 4, $data['NAMADIAGNOSA'], 0, 'L');

        // CATATAN SECTION
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(25, 5, 'Catatan', 0, 0, 'L');
        $pdf->Cell(3, 5, ' :', 0, 0, 'L');
        $pdf->SetX(33);
        $pdf->MultiCell(0, 4, $data['CATATAN'], 0, 'L');

        // FOOTER SECTION
        $pdf->Ln(3);
        $pdf->SetFont('Arial', 'I', 7);
        $pdf->MultiCell(0, 3.5,
            '*Saya menyetujui BPJS Kesehatan menggunakan informasi medis pasien jika diperlukan. ' .
            'SEP bukan sebagai bukti penjamin peserta. ' .
            'Dengan tampilnya SEP ini merupakan validasi terhadap eligibilitas Peserta secara elektronik ' .
            'dan peserta dapat mengakses pelayanan kesehatan rujukan sesuai ketentuan berlaku.',
            0, 'L'
        );

        // Timestamp
        $date = new DateTime();
        $pdf->SetFont('Arial', 'I', 7);
        $pdf->Cell(0, 3, 'Cetakan Ke: 1 ' . $date->format('d/m/Y H:i') . ' WIB', 0, 1);


        // Make sure the directory exists before saving
        //Storage::disk('storage')->makeDirectory('sep');

        $timestamp = $date->format('Ymd_His');

        //$filePath = storage_path("app/public/sep/{$fileName}");
        // Save the file
        $fileName = $data['NOSEP'] . '_' . $timestamp . '.pdf';


        $storagePath = storage_path("app/public/sep/{$fileName}");
       // return $storagePath;
        // Save PDF file to storage
        //$storagePath = storage_path("backend_dashbord/storage/app/public/sep/{$fileName}");
        $pdf->Output($storagePath, 'F'); // Save file

        $fileUrl = url("backend_dashbord/storage/app/public/sep/{$fileName}");  //prod

        return $fileUrl;

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


    public function get_data_sep(Request $request)
    {

        $client = new Client();

        $no_pendaftaran = $request['data']['NOPENDAFTARAN'];

        $nosep =$request['data']['NOSEP'];

        $param =Session::get('id_client')."/".$nosep."/".$no_pendaftaran;

        $response = $client->get($this->ws_simrs."index.php/api/transaksi_pasien/getdatasep/".$param , [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        $filename = $this->generate_sep($body);
        return $filename;
    }

    // ── Private helper: logika inti fetch + generate SEP non-JKN ──
    private function _fetch_sep_nonjkn(string $norm, string $no_pendaftaran, $id_client): string
    {
        $param = $norm . '/' . $id_client . '/' . $no_pendaftaran;
        $url   = $this->ws_simrs . 'index.php/api/laporan/history_berobat_pasien/' . $param;

        $client   = new Client();
        $response = $client->post($url, [
            'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
            'timeout'         => 30,
            'connect_timeout' => 10,
        ]);

        $body = $response->getBody()->getContents();
        return $this->generate_sep_non_jkn($body, $id_client);
    }

    // ── Route handler: POST /get_data_sep_nonjkn ──
    public function get_data_sep_nonjkn(Request $request)
    {
        try {
            $data = $request->input('data');

            $norm           = isset($data['NORM']) ? $data['NORM'] : '0';
            $no_pendaftaran = isset($data['NOPENDAFTARAN']) ? $data['NOPENDAFTARAN'] : '';
            $id_client      = isset($data['id_client']) ? $data['id_client'] : Session::get('id_client');

            if (!$norm || !$no_pendaftaran) {
                return response()->json(['error' => 'Parameter NORM atau NOPENDAFTARAN tidak boleh kosong'], 422);
            }

            $filename = $this->_fetch_sep_nonjkn($norm, $no_pendaftaran, $id_client);
            return response()->json(['url' => $filename]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function generate_sep_non_jkn($json, $id_client)
    {
        $data = json_decode($json, true);
        $data = $data[0];



        // Mengambil data pasien dari array nested
        $pasien = isset($data['PASIEN'][0]) ? $data['PASIEN'][0] : [];

        require_once app_path('Libraries/FPDF/fpdf.php');
        $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');

        if (!file_exists($libraryPath)) {
            throw new Exception("QR Code library not found. Please install it first.");
        }

        // Initialize FPDF with proper page size for vertical layout
        $pdf = new \FPDF('P', 'mm', 'A4');
        $pdf->SetAutoPageBreak(true, 10);
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 9);

        require_once $libraryPath;

        $tempDir = storage_path('app/public/temp/');
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        $profile_rs = $this->getprofile_rs($id_client);
        $profil = json_decode($profile_rs, true);

        // HEADER SECTION
        $pdf->SetY(12);
       // $pdf->Image("https://ws-simrs.net/logo/lambang_nr.png", 14, 6, 16);
        $pdf->Image($profil['LINK_LOGO'], 14, 10, 11);

        // Header text
        $pdf->SetFont('Arial', 'B', 9);
        $pdf->Cell(50);  // Move to the right of logo
        $pdf->Cell(0, 5, 'SURAT ELEGIBILITAS PESERTA NON JKN', 0, 1, 'L');
        $pdf->Cell(50);
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(0, 5, isset($profil['NAMA_RS']) ? $profil['NAMA_RS'] : 'NAMA RUMAH SAKIT', 0, 1, 'L');
        $pdf->Ln(2);

        // TWO-COLUMN LAYOUT FOR MAIN DATA
        $pdf->SetFont('Arial', '', 8);
        $col1_x = 10;
        $col2_x = 110;
        $y_start = $pdf->GetY();

        // Left Column Data (Disesuaikan dengan Key JSON baru)
        $leftData = [
            ['No. Nogister', isset($data['NOREGISTER']) ? $data['NOREGISTER'] : '-'], // Tidak ada di JSON baru
            ['Tgl', isset($data['TGLREG']) ? $data['TGLREG'] : '-'],
            ['No. Kartu', isset($pasien['NO_KARTU']) ? $pasien['NO_KARTU'] : '-'],
            ['Nama Peserta', isset($pasien['NAMAPASIEN']) ? $pasien['NAMAPASIEN'] : '-'],
            ['NORM', isset($pasien['NOMR']) ? $pasien['NOMR'] : '-'],
            ['Tgl Lahir', isset($pasien['TGLLAHIR']) ? $pasien['TGLLAHIR'] : '-'],
            ['Jenis Kelamin', isset($pasien['JENISKELAMIN']) ? $pasien['JENISKELAMIN'] : '-'],
            ['No. Telepon', isset($pasien['NOTELP']) ? $pasien['NOTELP'] : '-'],
            ['Sub/Spesialis', isset($data['RUANGPOLI']) ? $data['RUANGPOLI'] : '-'],
            ['Nama DPJP', isset($data['NAMADOKTER']) ? $data['NAMADOKTER'] : '-'],
            ['Faskes Perujuk', isset($data['PPKPERUJUK']) ? $data['PPKPERUJUK'] : '-'] // Tidak ada di JSON baru
        ];

        // Right Column Data (Disesuaikan dengan Key JSON baru)
        $rightData = [
            ['Peserta', isset($data['CARABAYAR']) ? $data['CARABAYAR'] : '-'],
            ['Jns. Rawat', isset($data['JENISRAWAT']) ? $data['JENISRAWAT'] : '-'],
            ['Jns. Kunjungan', isset($data['TUJUAN_KUNJUNGAN']) ? $data['TUJUAN_KUNJUNGAN'] : '-'], // Tidak ada di JSON baru
            ['Poli Perujuk', isset($data['RUANGPOLI']) ? $data['RUANGPOLI'] : '-'],
            ['Kelas Rawat', isset($pasien['Kelas']) ? 'Kelas ' . $pasien['Kelas'] : '-'],
            ['Hak Kelas', isset($data['HAKKELAS']) ? $data['HAKKELAS'] : '-'],
            ['Penjamin', isset($data['CARABAYAR']) ? $data['CARABAYAR'] : '-'],
            ['Petugas', isset($data['USER_NAME']) ? $data['USER_NAME'] : '-'], // Tidak ada di JSON baru
        ];

        // Render two columns side by side
        $maxRows = max(count($leftData), count($rightData));
        $lineHeight = 4;

        for ($i = 0; $i < $maxRows; $i++) {
            $y = $y_start + ($i * $lineHeight);
            $pdf->SetXY($col1_x, $y);

            // Left column
            if (isset($leftData[$i])) {
                $pdf->SetFont('Arial', '', 8);
                $pdf->Cell(25, $lineHeight, $leftData[$i][0], 0, 0, 'L');
                $pdf->Cell(3, $lineHeight, ':', 0, 0, 'L');
                $pdf->Cell(70, $lineHeight, $leftData[$i][1], 0, 0, 'L');
            }

            // Right column
            $pdf->SetXY($col2_x, $y);
            if (isset($rightData[$i])) {
                $pdf->SetFont('Arial', '', 8);
                $pdf->Cell(25, $lineHeight, $rightData[$i][0], 0, 0, 'L');
                $pdf->Cell(3, $lineHeight, ':', 0, 0, 'L');
                $pdf->Cell(0, $lineHeight, $rightData[$i][1], 0, 0, 'L');
            }
        }

        // Move Y position after data section
        $pdf->SetY($y_start + ($maxRows * $lineHeight));

        // QR CODE (Menggunakan No. Register sebagai fallback jika No. SEP kosong)
        $qrContent = !empty($data['NOREGISTER']) ? $data['NOREGISTER'] : $data['NOREGISTER'];
        $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        \QRcode::png($qrContent, $qrFile);

        // Use in PDF
        $pdf->Image($qrFile, 90, 30, 15, 15);
        unlink($qrFile);

        // DIAGNOSA SECTION
        $pdf->Ln(3);
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(25, 5, 'Diagnosa Awal', 0, 0, 'L');
        $pdf->Cell(3, 5, ' : ', 0, 0, 'L');
        $pdf->SetX(33);

        $diagnosaAwal = isset($data['DIAGNOSA_AWAL']) ? $data['DIAGNOSA_AWAL'] : '-';
        $pdf->MultiCell(0, 4, $diagnosaAwal, 0, 'L');

        // CATATAN SECTION
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(25, 5, 'Catatan', 0, 0, 'L');
        $pdf->Cell(3, 5, ' :', 0, 0, 'L');
        $pdf->SetX(33);

        $catatan = isset($data['KETERANGAN']) ? $data['KETERANGAN'] : (isset($data['CATATAN']) ? $data['CATATAN'] : '-');
        $pdf->MultiCell(0, 4, $catatan, 0, 'L');

        // FOOTER SECTION
        $pdf->Ln(3);
        $pdf->SetFont('Arial', 'I', 7);
        $pdf->MultiCell(0, 3.5,
            '*Ini adalah Surat Elegibilitas Peserta untuk pasien non-JKN. ' .
            'Informasi yang tercantum di dalamnya berdasarkan data yang tersedia dan dapat digunakan untuk keperluan internal rumah sakit.',
            0, 'L'
        );

        // Timestamp
        $date = new DateTime();
        $pdf->SetFont('Arial', 'I', 7);
        $pdf->Cell(0, 3, 'Cetakan Ke: 1 ' . $date->format('d/m/Y H:i') . ' WIB', 0, 1);

        $timestamp = $date->format('Ymd_His');

        // Filename logic fallback jika NOSEP kosong menggunakan NOREGISTER
        $fileId = !empty($data['NOSEP']) ? $data['NOSEP'] : $data['NOREGISTER'];
        $fileName = $fileId . '_' . $timestamp . '.pdf';

        $storagePath = storage_path("app/public/sep/{$fileName}");

        // Buat direktori tujuan jika belum ada
        if (!file_exists(storage_path("app/public/sep"))) {
            mkdir(storage_path("app/public/sep"), 0777, true);
        }

        $pdf->Output($storagePath, 'F'); // Save file

        $fileUrl = url("backend_dashbord/storage/app/public/sep/{$fileName}");  //prod

        return $fileUrl;
    }


    public function get_data_sep_api(Request $request)
    {

        $data = $request->all();
        $jsonKey = array_keys($data)[0]; // Get the JSON string key
        $parsedData = json_decode($jsonKey, true);

        $data = $request->json()->all();
        // or
        $data = json_decode($request->getContent(), true);

        $no_pendaftaran = $data['data']['NOPENDAFTARAN'];

        $nosep =$data['data']['NOSEP'];

        $param =$data['data']['id_client']."/".$nosep."/".$no_pendaftaran;

        if ($nosep == '' || $nosep == null) {
            $filename = $this->_fetch_sep_nonjkn(
                $data['data']['NORM']          ?? '-',
                $no_pendaftaran ?? '',
                $data['data']['id_client']     ?? Session::get('id_client')
            );
            return $filename;
        }

        $client = new Client();

        $response = $client->get($this->ws_simrs."index.php/api/transaksi_pasien/getdatasep/".$param , [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        $filename = $this->generate_sep($body,$data['data']['id_client']);
        return $filename;
    }


    public function cetak_surat_transfer($json)
    {

        try {

            $data = json_decode($json,true);

            $header = $data['header'];

            // Include the FPDF library
            require_once app_path('Libraries/FPDF/fpdf.php');


            // Check if QR Code library exists
            $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');
            if (!file_exists($libraryPath)) {
                throw new Exception("QR Code library not found. Please install it first.");
            }
            require_once $libraryPath;

            // Create PDF
            $pdf = new \FPDF('P', 'mm', 'A4'); // Landscape, millimeters, A4 size
            $pdf->AddPage();
            $pdf->SetMargins(4, 1, 1);
            $pdf->SetFont('Arial', 'B', 9);

        // Set page size (A4 = 210mm x 297mm)

            $pdf->Rect(3, 3, 200, 287);


        // Create instance of FPDF

            // Data

            $pdf->Image(Session::get('LINK_LOGO'), 7, 10, 20);

            // Hospital Header
            $pdf->Cell(190, 7, Session::get('nama_rs'), 0, 1, 'C');
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(200, 4, Session::get('alamat'), 0, 1, 'C');
            $pdf->Ln(2);
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(190, 7, 'TRANSFER BARANG OBAT-OBATAN/BMHP/MEDIS/NON MEDIS', 0, 1, 'C');

            $pdf->Line(4, $pdf->GetY(), 200, $pdf->GetY()); // (X1, Y1, X2, Y2)
            $pdf->Ln(1);


            $pdf->Ln(5);

            $pdf->SetFont('Arial', '', 8);
            $transfer_dari = $header['TUJUAN'];
            $tujuan_transfer = $header['LOKASI'];
            $no_transfer =  $header['NO_PERMINTAAN'];
            $tanggal = $header['TANGGAL'];

            // Posisi
            $pdf->Cell(40, 5, "Transfer Dari", 0, 0);
            $pdf->Cell(80, 5, ": " . $transfer_dari, 0, 0, 'L');

            $pdf->Cell(40, 5, "No Transfer", 0, 0);
            $pdf->Cell(50, 5, ": " . $no_transfer, 0, 1, 'L');

            $pdf->Cell(40, 5, "Tujuan Transfer", 0, 0);
            $pdf->Cell(80, 5, ": " . $tujuan_transfer, 0, 0, 'L');

            $pdf->Cell(40, 5, "Tanggal", 0, 0);
            $pdf->Cell(50, 5, ": " . $tanggal, 0, 1, 'L');

            $pdf->Ln(2);

            // Table Header
                    // Table headers
            $pdf->SetFont('Arial', 'B', 8);
            $pdf->SetFillColor(200, 200, 200);
            $pdf->Cell(15, 7, 'BRCD', 1, 0, 'C');
            $pdf->Cell(18, 7, 'Exp', 1, 0, 'C');
            $pdf->Cell(55, 7, 'DESC', 1, 0, 'C');
            $pdf->Cell(15, 7, 'REQ', 1, 0, 'C');
            $pdf->Cell(15, 7, 'APP', 1, 0, 'C');
            $pdf->Cell(15, 7, 'Satuan', 1, 0, 'C');
            $pdf->Cell(18, 7, 'Harga', 1, 0, 'C');
            $pdf->Cell(25, 7, 'Sub Total', 1, 0, 'C');
            $pdf->Cell(15, 7, 'Validasi', 1, 1, 'C');


            $total =0;

            foreach($data['details'] as $row)
            {

                $nama = substr($row['nama'], 0, 30) . (strlen($row['nama']) > 30 ? "..." : "");


                $harga = (float)$row['harga'];

                $sub_total = (float)$row['sub_total'];

                $arr[]=[$row['barcode'],$row['exp'],
                $nama,$row['qty_order'],
                $row['qty_approved'],$row['satuan'],number_format($harga, 2, ',', '.'),number_format($sub_total, 2, ',', '.') ];

                $total += $row['sub_total'];

            }

            // var_dump($arr);
            // exit();

            $pdf->SetFont('Arial', '', 8);
            foreach ($arr as $row) {
                $pdf->Cell(15, 6, $row[0], 1);
                $pdf->Cell(18, 6, $row[1], 1);
                $pdf->Cell(55, 6, $row[2], 1);
                $pdf->Cell(15, 6, $row[3], 1, 0, 'C');
                $pdf->Cell(15, 6, $row[4], 1, 0, 'C');
                $pdf->Cell(15, 6, $row[5], 1, 0, 'C');
                $pdf->Cell(18, 6, $row[6], 1, 0, 'R');
                $pdf->Cell(25, 6, $row[7], 1, 0, 'R');
                $pdf->Cell(15, 6, '', 1, 1, 'C'); // Empty box for validation
            }


             $total = (float)$total;
            // Total transfer amount
            $pdf->SetFont('Arial', 'B', 8);
            $pdf->Cell(150, 6, 'Total Persediaan yang Transfer:', 0, 0, 'R');
            $pdf->Cell(26, 6, number_format($total, 2, ',', '.'), 0, 1, 'R');


            $pdf->SetY(-70); // Adjust as needed
            $pdf->Ln(15); // Space before signatures
            $pdf->SetFont('Arial', 'B', 9);

            // Header row
            $pdf->Cell(63, 6, 'Disetujui Oleh :', 0, 0, 'C');
            $pdf->Cell(63, 6, '', 0, 0, 'C');
            $pdf->Cell(63, 6, $header['LOKASI'], 0, 1, 'C');

            $pdf->SetFont('Arial', '', 9);
            $pdf->Cell(63, 6, 'Direktur / yang mewakili', 0, 0, 'C');
            $pdf->Cell(63, 6, $header['TUJUAN'], 0, 0, 'C');
            $pdf->Cell(63, 6, '', 0, 1, 'C');

            $pdf->SetY(0); // Position at 1.5 cm from bottom
            $pdf->SetFont('Arial', 'I', 8);
            $pdf->Cell(10, 10, 'Print Date: ' . date('Y-m-d H:i:s'), 0, 0, 'L'); // Align Left

            $pdf->SetY(-50); // Adjust as needed
            $pdf->Ln(20); // Space for signatures

            // Signature lines
            $pdf->SetFont('Arial', '', 9);
            $pdf->Cell(63, 6, '(....................................)', 0, 0, 'C');
            $pdf->Cell(63, 6, '(....................................)', 0, 0, 'C');
            $pdf->Cell(63, 6, '(....................................)', 0, 1, 'C');

            // Optional: Add a bottom border line

            // $pdf->Line(0, $pdf->GetY(), 200, $pdf->GetY()); // X1, Y1, X2, Y2


            // Ensure directory exists
            if (!Storage::disk('public')->exists('surat_transfer')) {
                Storage::disk('public')->makeDirectory('surat_transfer');
            }

            // Generate filename
            $fileName = 'Transfer_' . date('Ymd_His') . '.pdf';

            // Save PDF file to storage
            $storagePath = storage_path("app/public/surat_transfer/{$fileName}");
            $pdf->Output($storagePath, 'F'); // Save file

            // Generate URL for access
            //https://simrs-link.info/backend_dashbord/storage/app/public/surat_transfer/Transfer_20250220_171151.pdf
            $fileUrl = asset("backend_dashbord/storage/app/public/surat_transfer/{$fileName}");

            return response()->json(['success' => true, 'file_url' => $fileUrl]);

        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }

    }

    public function getdetails_transfer_data_v2(Request $request)
    {
        $client = new Client();


        $response = $client->post($this->ws_inv."index.php/api/barang/getdetails_transfer_data_v2/".$request->no_permintaan."/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        $url = $this->cetak_surat_transfer($body);


        return $url;
    }

    public function datapoly()
    {

        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [

        ];

        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/datapoly/".Session::get('id_client'), [
            "json"=>$json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function get_jadwal_kontrolulang(Request $request)
    {
        try {
            $client = new Client();

            $json = [
                "data" => $request->all(),
                "id_client" => Session::get('id_client'),
                "user_id" => Session::get('user_id')
            ];

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_jadwal_kontrolulang", [
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
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function terbitkan_kontrolulang(Request $request)
    {
         try {

            $client = new Client();

            $json = [
                "data" => $request->all(),
                "id_client" => Session::get('id_client'),
                "user_id"=>Session::get('user_id')
            ];

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/terbitkan_kontrolulang", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;

        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDokterLive(Request $request)
    {
        try {
            $client = new Client();

            $json = [
                "kode_poli" => $request->kode_poli,
                "tanggal"   => $request->tanggal,
                "id_client" => Session::get('id_client'),
            ];

            $response = $client->post($this->ws_simrs . "index.php/api/transaksi_pasien/get_dokter_live_bpjs", [
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
                'code'    => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getRiwayatKontrolUlang(Request $request, $norm)
    {
        try {
            $client   = new Client();
            $id_client = Session::get('id_client');

            // var_dump($this->ws_simrs . "index.php/api/transaksi_pasien/getdatakontrolulang/{$id_client}/{$norm}/3");

            $response = $client->get($this->ws_simrs . "index.php/api/transaksi_pasien/getdatakontrolulang/{$id_client}/{$norm}/3", [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ]
            ]);

            $body = $response->getBody()->getContents();
            return $body;

        } catch (\Exception $e) {
            return response()->json([
                'code'    => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function hapusSuratKontrol(Request $request)
    {
        try {
            $client = new Client();

            $json = [
                "no_kontrol" => $request->no_kontrol,
                "id_client"  => Session::get('id_client'),
                "user_id"    => Session::get('user_id'),
            ];

            $response = $client->post($this->ws_simrs . "index.php/api/data_referensi/hapusSuratKontrol", [
                'json'    => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ]
            ]);

            $body = $response->getBody()->getContents();
            return $body;

        } catch (\Exception $e) {
            return response()->json([
                'code'    => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function tidak_merawat_pasien_ini(Request $request)
    {
        try {

            $client = new Client();

            $json = [
                "noregister" => $request->noregister,
                "id_client" => Session::get('id_client'),
                "los"=> $request->los,
                "user_id"=>Session::get('user_id')
            ];

            $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/tidak_merawat_pasien_ini", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;

        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function addcaraBayar()
    {
         try {
            $client = new Client();
            //data = webservice.GetData(GLobalVariable.URL_WS + "index.php/api/data_referensi/datacarabayar2/"+Class.GlobalClass.ID_CLIENT, "");
            $response = $client->get($this->ws_simrs."index.php/api/data_referensi/datacarabayar2/".Session::get('id_client'), [
                'json' => [],
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;


        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function sprigetdata(Request $request)
     {
        try {

            $client = new Client();

            $json = [
                "mode"=> $request->mode,
                "SPRI"=> $request->norm,
                "id_client" => Session::get('id_client'),
                "tgl"=>null,
                "norm"=>$request->norm
            ];

            $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/sprigetdata", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;

        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function cetak()
    {

        require_once app_path('Libraries/FPDF/fpdf.php');

        // Inisialisasi FPDF
        $pdf = new \FPDF('P', 'mm', 'A4');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);

        // Ukuran etiket
        $labelWidth  = 95;
        $labelHeight = 65;
        $cols = 2;
        $rows = 4;

        $pdf->SetFont('Arial', '', 9);

        for ($row = 0; $row < $rows; $row++) {
            for ($col = 0; $col < $cols; $col++) {
                $x = 10 + ($col * $labelWidth);
                $y = 10 + ($row * $labelHeight);

                $pdf->Rect($x, $y, $labelWidth, $labelHeight);

                $pdf->SetFont('Arial', 'B', 8);
                $pdf->SetXY($x, $y + 3);
                $pdf->MultiCell($labelWidth, 4,
                    "KEPOLISIAN DAERAH JAWA BARAT\n" .
                    "Jalan Suroso No. 21 Cianjur", 0, 'C');

                $pdf->SetFont('Arial', 'B', 9);
                $pdf->SetXY($x, $y + 13);
                $pdf->Cell($labelWidth, 6, "ETIKET DIET PASIEN", 0, 1, 'C');

                $pdf->SetFont('Arial', '', 9);
                $startY = $y + 20;
                $lineHeight = 5;

                $fields = [
                    "Nama"           => ".......................................",
                    "Ruang/Bed/Kelas"=> ".......................................",
                    "Diet"           => ".......................................",
                    "Waktu Makan"    => "PAGI / SIANG / SORE",
                    "Tanggal"        => ".......................................",
                    "Keterangan"     => ".......................................",
                    "Kadaluarsa"     => "1 jam setelah penyajian",
                ];

                foreach ($fields as $label => $value) {
                    $pdf->SetXY($x + 3, $startY);
                    $pdf->Cell(32, $lineHeight, $label, 0, 0);
                    $pdf->Cell(2, $lineHeight, ":", 0, 0);
                    $pdf->Cell(55, $lineHeight, $value, 0, 1);
                    $startY += $lineHeight;
                }

                $pdf->SetFont('Arial', 'I', 8);
                $pdf->SetXY($x, $y + $labelHeight - 8);
                // $pdf->Cell($labelWidth, 5, "“Semoga lekas sembuh”", 0, 1, 'C');
            }
        }

        // Simpan ke storage
        $fileName = 'etiket-diet-pasien-' . time() . '.pdf';
        $filePath = storage_path('app/public/' . $fileName);

        // Pastikan folder storage/public sudah ada & link ke public/storage
        $pdf->Output('F', $filePath);

        // Return link download
        $url = asset('storage/' . $fileName);

        return response()->json([
            'success' => true,
            'message' => 'PDF berhasil dibuat',
            'url' => $url
        ]);
    }


    public function getdata_print_out_list_diet(Request $request)
    {
         try {

            $client = new Client();
            $rawJson = $request->getContent();
            $jsonData = json_decode($rawJson, true);

            $json = [
                "mode"=>$jsonData['mode'],
                "id_client"=>$jsonData['id_client'],
                "shif"=>$jsonData['shif'],
                "tanggal"=>$jsonData['tanggal'],
                "jenis_penunjang"=>$jsonData['jenis_penunjang'],
                "kd_unit"=>$jsonData['kd_unit'],
                "jenis_dokumen"=>$jsonData['jenis_dokumen']
            ];

            $response = $client->post($this->ws_inv."index.php/api/data_referensi/getlist_penunjang_order_jasa_penunjang", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = json_decode($response->getBody()->getContents(),true);


            $pasienList=[];

            if($jsonData['jenis_dokumen']=="etiket")
            {
                 foreach($body['response'] as $row)
                {
                    $pasienList[]=["NORM"=>$row['NOMR'],
                                    "Nama"=>$row['NAMA'],
                                    "Ruang/Bed/Kelas"=>$row['POLI_RUANG'],
                                    "Diet/Jadwal"=>$row['DIET'],
                                    "Nama"=>$row['NAMA']." (".$row['JENISKELAMIN'].")",
                                    "Tanggal"=>$jsonData['tanggal'],
                                    "Keterangan"=>"" ];
                }

                $pdf_file = $this->cetak_1($pasienList,$jsonData['id_client']);

                return $pdf_file;
            }

            if($jsonData['jenis_dokumen']=="list_diet")
            {
                $no =1;

                foreach($body['response'] as $row)
                {
                    $dataPasien[]=["no"=>$no++,
                                    "nama"=>$row['NAMA']." (".$row['JENISKELAMIN'].")"." - ".$row['NOMR'],
                                    "status"=>"",
                                    "ruangan"=>$row['POLI_RUANG'],
                                    "diet"=>$row['DIET'],
                                    "bb"=>$row['BB'] ?? '',
                                    "tb"=>$row['TB'] ?? '',
                                    "dx_awal"=>$row['DX_AWAL'] ?? '',
                                    "dpjp"=>$row['DPJP'],
                                    "tanggal"=>$jsonData['tanggal'],
                                    "Ket"=>"" ];
                }

                $pdf_file = $this->cetak_list_diet($dataPasien);

                return $pdf_file;
            }

        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    private function fitPdfText($pdf, $text, $maxWidth)
    {
        $text = (string) $text;
        $padding = 2;
        if ($pdf->GetStringWidth($text) <= $maxWidth - $padding) {
            return $text;
        }
        while (mb_strlen($text) > 0 && $pdf->GetStringWidth($text . '...') > $maxWidth - $padding) {
            $text = mb_substr($text, 0, -1);
        }
        return $text . '...';
    }

    public function cetak_list_diet($dataPasien)
    {


        require_once app_path('Libraries/FPDF/fpdf.php');

        // Inisialisasi FPDF
        $pdf = new \FPDF('L', 'mm', 'A4');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);

        $pdf->AliasNbPages();
        // Judul
        $pdf->SetFont('Arial', 'B', 14);
        $pdf->Cell(0, 10, 'Diet Pasien', 0, 1, 'C');
        $pdf->Ln(5);

        // Tambahkan tanggal cetak di kanan atas
        $pdf->SetFont('Arial', '', 9);
        $pdf->Cell(0, 6, 'Tanggal Cetak: ' . date('d-m-Y'), 0, 1, 'R');
        $pdf->Ln(2);

        $pageWidth = 297 - 20;

        // Atur proporsi lebar kolom (dalam mm) - total 277mm mengisi penuh halaman landscape
        $colWidths = [
            'no'        => 8,
            'nama'      => 60,
            'diet'      => 28,
            'bb'        => 14,
            'tb'        => 14,
            'dx_awal'   => 45,
            'dpjp'      => 42,
            'ruangan'   => 28,
            'tanggal'   => 20,
            'Ket'       => 18
        ];
        $rowHeight = 9;

        // Header tabel
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->SetFillColor(230, 230, 230);
        $pdf->Cell($colWidths['no'], 10, '#', 1, 0, 'C', true);
        $pdf->Cell($colWidths['nama'], 10, 'Nama Pasien', 1, 0, 'C', true);
        $pdf->Cell($colWidths['diet'], 10, 'Diet', 1, 0, 'C', true);
        $pdf->Cell($colWidths['bb'], 10, 'BB (kg)', 1, 0, 'C', true);
        $pdf->Cell($colWidths['tb'], 10, 'TB (cm)', 1, 0, 'C', true);
        $pdf->Cell($colWidths['dx_awal'], 10, 'Diagnosa Awal', 1, 0, 'C', true);
        $pdf->Cell($colWidths['dpjp'], 10, 'DPJP', 1, 0, 'C', true);
        $pdf->Cell($colWidths['ruangan'], 10, 'Ruangan', 1, 0, 'C', true);
        $pdf->Cell($colWidths['tanggal'], 10, 'Tanggal', 1, 0, 'C', true);
        $pdf->Cell($colWidths['Ket'], 10, 'Ket', 1, 1, 'C', true);

        // Isi tabel

        $pdf->SetFont('Arial', '', 7);
        $pdf->SetFillColor(248, 248, 248);
        $y_position = $pdf->GetY(); // simpan posisi awal tabel
        $zebra = false;
        foreach ($dataPasien as $row) {
            $fill = $zebra;
            $pdf->Cell($colWidths['no'], $rowHeight, $row['no'], 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['nama'], $rowHeight, $this->fitPdfText($pdf, $row['nama'], $colWidths['nama']), 1, 0, 'L', $fill);
            $pdf->Cell($colWidths['diet'], $rowHeight, $this->fitPdfText($pdf, $row['diet'], $colWidths['diet']), 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['bb'], $rowHeight, $row['bb'], 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['tb'], $rowHeight, $row['tb'], 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['dx_awal'], $rowHeight, $this->fitPdfText($pdf, $row['dx_awal'], $colWidths['dx_awal']), 1, 0, 'L', $fill);
            $pdf->Cell($colWidths['dpjp'], $rowHeight, $this->fitPdfText($pdf, $row['dpjp'], $colWidths['dpjp']), 1, 0, 'L', $fill);
            $pdf->Cell($colWidths['ruangan'], $rowHeight, $this->fitPdfText($pdf, $row['ruangan'], $colWidths['ruangan']), 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['tanggal'], $rowHeight, $row['tanggal'], 1, 0, 'C', $fill);
            $pdf->Cell($colWidths['Ket'], $rowHeight, $row['Ket'], 1, 1, 'C', $fill);
            $zebra = !$zebra;
        }

        $y_position = $pdf->GetY(); // simpan posisi akhir tabel

        // Tambahkan bagian tanda tangan
        $pdf->Ln(15);
        $pdf->SetX(210);
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(0, 6, 'Mengetahui,', 0, 1, 'L');
        $pdf->Ln(20); // spasi untuk tanda tangan
        $pdf->SetX(210);
        $pdf->Cell(0, 6, '(___________________)', 0, 1, 'L');



         // Posisi 1.5 cm dari bawah
        $pdf->SetY(0);
        $pdf->SetFont('Arial', 'I', 7);
        // Page number
        $pdf->Cell(0, 10, 'Halaman ' . $pdf->PageNo() . '/{nb}', 0, 0, 'C');

           // Simpan ke storage
        $fileName = 'list-diet' . time() . '.pdf';


         // Simpan ke storage
        $fileName = 'etiket-diet-pasien-' . time() . '.pdf';
        $filePath = storage_path("app/public/surat_transfer/{$fileName}");
        $pdf->Output($filePath, 'F');

        // Generate URL dengan prefix backend_dashbord
        $url = url("backend_dashbord/storage/app/public/surat_transfer/{$fileName}");


        return response()->json([
            'success' => true,
            'message' => 'PDF berhasil dibuat',
            'url' => $url
        ]);
    }

    public function cetak_1($pasienList,$id_client)
    {
        require_once app_path('Libraries/FPDF/fpdf.php');

        // Inisialisasi FPDF
        $pdf = new \FPDF('P', 'mm', 'A4');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetAutoPageBreak(false);

        $profile_rs = $this->getprofile_rs($id_client);
        $profil = json_decode($profile_rs,true);

        // Ukuran etiket
        $labelWidth  = 95;
        $labelHeight = 65;
        $cols = 2;
        $rows = 4;

        // Layout kolom isi (label : value) di dalam etiket
        $innerPad      = 3;   // padding kiri/kanan di dalam kotak
        $labelColWidth = 30;  // lebar kolom nama field
        $colonWidth    = 3;   // lebar kolom titik dua
        $valueColWidth = $labelWidth - (2 * $innerPad) - $labelColWidth - $colonWidth;
        $lineHeight    = 4.5;

        $i = 0;
        foreach ($pasienList as $pasien) {
            $row = floor($i / $cols) % $rows; // reset row after each page
            $col = $i % $cols;

            // If it's the first label on a new page
            if ($i > 0 && $i % ($cols * $rows) == 0) {
                $pdf->AddPage();
            }

            $x = 10 + ($col * $labelWidth);
            $y = 10 + ($row * $labelHeight);

            $pdf->Rect($x, $y, $labelWidth, $labelHeight);

            // Kop rumah sakit
            $pdf->SetFont('Arial', 'B', 8);
            $pdf->SetXY($x + $innerPad, $y + 2);
            $pdf->Cell($labelWidth - (2 * $innerPad), 4, $profil['NAMA_RS'] ?? '', 0, 1, 'C');

            $pdf->SetFont('Arial', '', 7);
            $pdf->SetX($x + $innerPad);
            $pdf->Cell($labelWidth - (2 * $innerPad), 3.5, $profil['ALAMAT'] ?? '', 0, 1, 'C');

            // Judul etiket
            $pdf->SetFont('Arial', 'B', 9);
            $pdf->SetX($x + $innerPad);
            $pdf->Cell($labelWidth - (2 * $innerPad), 6, 'ETIKET DIET PASIEN', 0, 1, 'C');

            // Garis pemisah antara kop dan detail pasien
            $lineY = $pdf->GetY() + 0.5;
            $pdf->Line($x + $innerPad, $lineY, $x + $labelWidth - $innerPad, $lineY);

            // Detail pasien (label : value), value dibungkus otomatis agar tidak tumpang tindih
            $startY = $lineY + 2;
            foreach ($pasien as $label => $value) {
                $pdf->SetXY($x + $innerPad, $startY);
                $pdf->SetFont('Arial', 'B', 8);
                $pdf->Cell($labelColWidth, $lineHeight, $label, 0, 0);
                $pdf->Cell($colonWidth, $lineHeight, ':', 0, 0);

                $pdf->SetFont('Arial', '', 8);
                $pdf->SetXY($x + $innerPad + $labelColWidth + $colonWidth, $startY);
                $pdf->MultiCell($valueColWidth, $lineHeight, ($value !== null && $value !== '') ? $value : '-', 0, 'L');

                $startY = $pdf->GetY();
            }

            $i++;
        }

        // Simpan ke storage
        $fileName = 'etiket-diet-pasien-' . time() . '.pdf';
        $filePath = storage_path("app/public/surat_transfer/{$fileName}");
        $pdf->Output($filePath, 'F');

        // Generate URL dengan prefix backend_dashbord
        $url = url("backend_dashbord/storage/app/public/surat_transfer/{$fileName}");


        return response()->json([
            'success' => true,
            'message' => 'PDF berhasil dibuat',
            'url' => $url
        ]);
    }

    public function generateSPRI(Request $request)
    {
        // Sample data - replace with actual data from your request or database
        $data = [
            'no_kartu' => $request->NO_KARTU,
            'nama_peserta' => $request->NAMA,
            'tgl_lahir' => $request->TGLLAHIR,
            'umur' => $request->USIA,
            'jenis_kelamin' => $request->JENISKELAMIN,
            'diagnosa' =>"", //$request->diagnosa,
            'rencana_inap' => $request->TANGGAL,
            'rm_number' => $request->NORM,
            'barcode_number' => $request->SPRI,
            'doctor_name' => $request->NAMADOKTER,
            'hospital_name' =>$request->NAMA_RS,//Session::get('nama_rs')
        ];
        # Download from sourceforge and place in app/Libraries/ a
        require_once app_path('Libraries/FPDF/fpdf.php');

        // $pdf = new \FPDF('L', 'mm', [210, 120]);
        // $pdf->AddPage();

        // // Set margins
        //  $pdf->SetMargins(0, 0, 5);

        $pdf = new \FPDF('P', 'mm', 'A4');
        // $pdf->SetMargins(8, 8, 8);
        $pdf->SetAutoPageBreak(true, 10);
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 9);

        // Add BPJS Logo (if you have the logo file)
        // $pdf->Image('path/to/bpjs-logo.png', 20, 20, 25, 25);
       // $pdf->Image('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/BPJS_Kesehatan_logo.svg/2560px-BPJS_Kesehatan_logo.svg.png', 6, 6, 50);
        $pdf->Image("https://ws-simrs.net/assets/bpjs_icon.png", 6, 6, 50);

        // Header - BPJS Kesehatan
        // $pdf->SetFont('Arial', 'B', 12);
        // $pdf->SetXY(50, 25);
        // $pdf->Cell(0, 8, 'BPJS Kesehatan', 0, 1);

        // Title
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->SetXY(15, 6);
        $pdf->Cell(180, 6, 'SURAT RENCANA RAWAT INAP', 0, 1, 'C');

        ///////////// QR
        // First check if the library exists

        // First check if the library exists
        $libraryPath = app_path('Libraries/phpqrcode/qrlib.php');

        if (!file_exists($libraryPath)) {
            throw new Exception("QR Code library not found. Please install it first.");
        }

	    require_once $libraryPath;

	    $tempDir = storage_path('app/public/qr/');

        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        // $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        // \QRcode::png($data['barcode_number'], $qrFile);

        // // Use in PDF
        // $pdf->Image($qrFile, 150, 30, 18, 18);

        // unlink($qrFile);
        ///////////

        $pdf->SetFont('Arial', '', 10);
        $pdf->SetXY(15, 12);
        $pdf->Cell(180, 5, $data['hospital_name'], 0, 1, 'C');

        // Barcode number (top right)
        $pdf->SetFont('Arial', '', 10);
        $pdf->SetXY(150, 12);
        $pdf->Cell(0, 4, "No SPRI : ".$data['barcode_number'], 0, 1);

        // Add barcode representation (simple bars)

        $pdf->SetFont('Arial', '', 11);
        $y_position = 18;

        // Request message
        $pdf->SetXY(10, $y_position);
        $pdf->Cell(0, 6, 'Mohon Pemeriksaan dan Penanganan Lebih Lanjut', 0, 1);

        $y_position += 10;

        // Patient details - single column as per sample
        $details = [
            'No Kartu' => $data['no_kartu'],
            'Nama Peserta' => $data['nama_peserta'],
            'Tgl Lahir' => $data['tgl_lahir'] . ' ( ' .$data['jenis_kelamin']. $data['umur'] . ' )',
            'Dianosa' => $data['diagnosa'],
            'Rencana Inap' => $data['rencana_inap'],
            'RM'=>$data['rm_number']
        ];

        foreach ($details as $label => $value) {
            $pdf->SetXY(10, $y_position);
            $pdf->Cell(40, 8, $label, 0, 0);
            $pdf->Cell(5, 8, ':', 0, 0);
            $pdf->Cell(0, 8, $value, 0, 1);
            $y_position += 5;
        }
        // $tempDir = storage_path('app/public/temp/');
        // $qrFile = $tempDir . 'sep_qr_' . time() . '.png';
        // QRcode::png($data['barcode_number'], $qrFile);

        // // Use in PDF
        // $pdf->Image($qrFile, 90, 30, 15, 15);

        // unlink($qrFile);

        // RM number (right side, aligned with Jenis Kelamin row)

        // Thank you message
        $pdf->SetFont('Arial', '', 11);
        $pdf->SetXY(10, $y_position + 5);
        $pdf->Cell(0, 8, 'Demikian Atas bantuannya, diucapkan banyak terima kasih', 0, 1);

        // Doctor signature section
        $pdf->SetXY(120, $y_position + 15);
        $pdf->Cell(0, 8, 'Mengetahui DPJP', 0, 1);

        // Doctor name
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->SetXY(120, $y_position + 32);
        $pdf->Cell(0, 8, $data['doctor_name'], 0, 1);

        // Generate unique filename
        $filename = 'surat_rencana_rawat_inap_' . time() . '_' . rand(1000, 9999) . '.pdf';
        //$filepath = public_path('storage/pdfs/' . $filename);

        // Create directory if it doesn't exist
        // if (!file_exists(dirname($filepath))) {
        //     mkdir(dirname($filepath), 0755, true);
        // }

        // Save PDF to file

        // Return download link

        $storagePath = storage_path("app/public/sep/{$filename}");
       // return $storagePath;
        // Save PDF file to storage
        //$storagePath = storage_path("backend_dashbord/storage/app/public/sep/{$fileName}");
        $pdf->Output($storagePath, 'F'); // Save file

        $fileUrl = url("backend_dashbord/storage/app/public/sep/{$filename}");  //prod
        return  $fileUrl;
        // return response()->json([
        //     'success' => true,
        //     'message' => 'PDF generated successfully',
        //     'download_url' => asset('storage/pdfs/' . $filename),
        //     'filename' => $filename
        // ]);

    }

    private function drawSimpleBarcode($pdf, $x, $y, $code)
    {
        // Simple barcode representation using vertical lines
        $pdf->SetLineWidth(0.5);
        $bar_width = 1;
        $bar_height = 15;

        for ($i = 0; $i < strlen($code); $i++) {
            if ($i % 2 == 0) {
                $pdf->Line($x + ($i * $bar_width), $y, $x + ($i * $bar_width), $y + $bar_height);
            }
        }
    }

    public function get_pasien()
    {

    }
    public function getdatakec(Request $request)
    {
        try {

            $client = new Client();

            $json = [
                "mode"=> $request->mode,
                "nama_desa"=>$request->nama_desa
            ];

            $response = $client->post($this->ws_simrs."index.php/api/data_referensi/get_desa_v3", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;

        } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }


    public function setRujukan(Request $request)
    {
            try {

            $client = new Client();

            $rawJson = $request->getContent();
            $jsonData = json_decode($rawJson, true);

            $json = [
                "mod"=>$jsonData['mod'],
                "id_client"=>$jsonData['id_client'],
                "no_rujukan"=>$jsonData['no_rujukan'],
                "noka"=>$jsonData['noka']
            ];

            $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/getdatarujukanv2", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);


            $body = json_decode($response->getBody()->getContents(),true);

            $pdf_file = $this->generateRujukan($body['response'][0],$jsonData['id_client']);

            return $pdf_file;

            } catch (\Exception $e) {
            // Log the error
            // Return error response
            return response()->json([
                'code' => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

    public function generateRujukan($dataPasien,$id_client)
    {
        // Contoh data dummy (bisa kamu ganti dengan data dari DB atau request)


        $profile_rs = $this->getprofile_rs($id_client);
        $profil = json_decode($profile_rs,true);
        $data = [
            'tujuan_rs' => $dataPasien['NAMATUJUANRUJUKAN'],
            'no_rujukan' => $dataPasien['NORUJUKAN'],
            'nama' => $dataPasien['NAMAPESERTA'],
            'no_kartu' => $dataPasien['NOKARTU'],
            'diagnosa' =>  $dataPasien['NAMADIAGNOSA'],
            'umur' =>  $dataPasien['TGLLAHIR'],
            'jenis_kelamin' => $dataPasien['JENISKELAMIN'],
            'jenis_rawat' => $dataPasien['JENISRAWAT'],
            'tanggal' =>$dataPasien['TGLRUJUKAN'],
            'berlaku_sampai' => $dataPasien['JENISRAWAT'],
            'poli_tujuan' => $dataPasien['POLITUJUAN'],
            'asal_rs' => $profil['NAMA_RS'],
            'catatan' => $dataPasien['CATATAN']
        ];


        require_once app_path('Libraries/FPDF/fpdf.php');

        // Inisialisasi FPDF (L = Landscape, ukuran custom)
        // $pdf = new \FPDF('L', 'mm', [210, 130]);
        // $pdf->AddPage();

        $pdf = new \FPDF('P', 'mm', 'A4');
        // $pdf->SetMargins(8, 8, 8);
        $pdf->SetAutoPageBreak(true, 10);
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 9);



        $pdf->Image("https://ws-simrs.net/assets/bpjs_icon.png", 10, 12, 45);
        // Font
        $pdf->Cell(15);  // Move to the right of logo


        // Judul Surat
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->Cell(0, 10, 'SURAT RUJUKAN RUMAH SAKIT', 0, 1, 'C');
         $pdf->Ln(3);
        // Baris 1
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(35, 6, 'Kepada Yth', 0, 0);

        $pdf->Cell(80, 6, ': ' . $data['tujuan_rs'], 0, 0);

        $pdf->Cell(35, 6, 'No. Rujukan', 0, 0);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(35, 6, ': ' . $data['no_rujukan'], 0, 1);

        $pdf->SetFont('Arial', '', 10);

        // Baris 2
        $pdf->Ln(2);
        $pdf->Cell(35, 6, 'Mohon pemeriksaan dan penanganan lebih lanjut penderita :', 0, 1);

        $pdf->Ln(3);
        $pdf->SetFont('Arial', '', 8);
        // Nama
        $pdf->Cell(35, 6, 'Nama', 0, 0);
        $pdf->Cell(80, 6, ': ' . $data['nama'], 0, 0);
        $pdf->Cell(35, 6, 'Umur', 0, 0);
        $pdf->Cell(40, 6, ': ' . $data['umur'], 0, 1);

        // No Kartu
        $pdf->Cell(35, 6, 'No Kartu', 0, 0);
        $pdf->Cell(80, 6, ': ' . $data['no_kartu'], 0, 0);
        $pdf->Cell(35, 6, 'L/P', 0, 0);
        $pdf->Cell(40, 6, ': ' . $data['jenis_kelamin'], 0, 1);


        // Diagnosa
        $pdf->Cell(35, 6, 'Diagnosa', 0, 0);
        $pdf->Cell(80, 6, ': ' . $data['diagnosa'], 0, 0);
        $pdf->Cell(35, 6, 'Jenis Rawat', 0, 0);
        $pdf->Cell(40, 6, ': ' . $data['jenis_rawat'], 0, 1);


        $pdf->Cell(35, 6, 'Asal Rumah Sakit', 0, 0);
        $pdf->Cell(80, 6, ': ' . $data['asal_rs'], 0, 0);
        $pdf->Cell(35, 6, 'Poli Tujuan', 0, 0);
        $pdf->Cell(40, 6, ': ' . $data['poli_tujuan'], 0, 1);


        // Keterangan
        $pdf->Cell(35, 6, 'Keterangan', 0, 0);
        $pdf->Cell(80, 6, ': '. $data['catatan'], 0, 1);



        //$dataPasien['TGLRUJUKAN'] = '2025-10-07';

        // Ambil tanggal rujukan
        $tglRujukan = $dataPasien['TGLRUJUKAN'];

        // Tambah 90 hari
        $tglBaru = date('Y-m-d', strtotime($tglRujukan . ' +90 days'));

        // Tanda tangan & tanggal
        $pdf->Ln(5);
        $pdf->Cell(140, 6, '', 0, 0);
        $pdf->Cell(50, 6, $data['tanggal'], 0, 1, 'C');
        $pdf->Cell(140, 6, '', 0, 0);
        $pdf->Cell(50, 6, 'Mengetahui', 0, 1, 'C');
        $pdf->Ln(15);
        $pdf->Cell(140, 6, '', 0, 0);
        $pdf->Cell(50, 6, '________________________', 0, 1, 'C');

        // Catatan masa berlaku
        $pdf->SetY(-30);
        $pdf->SetFont('Arial', 'I', 9);
        $pdf->Cell(0, 5, 'Masa rujukan berlaku 90 hari sampai dengan ' . $tglBaru, 0, 1, 'L');

        // Output


           // Save the file
        // $fileName = $data['no_rujukan']. '.pdf';
        $fileName = $data['no_rujukan'] . '_' . date('Ymd_His') . '_' . uniqid() . '.pdf';

        // Save PDF file to storage
        $storagePath = storage_path("app/public/sep/{$fileName}");
        $pdf->Output($storagePath, 'F'); // Save file

       // $fileUrl = asset("backend_dashbord/storage/app/public/sep/{$fileName}");  //prod

        //$fileUrl = asset("storage/sep/{$fileName}");

        $fileUrl = url("backend_dashbord/storage/app/public/sep/{$fileName}");  //prod


        return $fileUrl;
    }

    public function getdata_asesmen(Request $request, $noregister)
    {
        try {
            $client = new Client();
            $id_client = Session::get('id_client');

            $response = $client->get(
                $this->ws_simrs . "index.php/api/transaksi_pasien/getdata_asesmen/{$noregister}/{$id_client}",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => '',
                    ]
                ]
            );

            $body = $response->getBody()->getContents();
            return $body;

        } catch (\Exception $e) {
            return response()->json([
                'code'    => 201,
                'message' => 'Failed to connect to API: ' . $e->getMessage()
            ], 500);
        }
    }

}
