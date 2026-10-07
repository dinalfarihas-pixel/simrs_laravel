<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;

class MonitoringController extends Controller
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


    public function getdatapasien_rme(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));


        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "mode"=>1,
            "tglreg"=>$fixed,
        ];
         //dd($body);
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/monitoring_rme", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function lospasien(Request $request)
    {

        $los_pasien = $request->value;

       // echo $request->los_pasien];
       $jsonString = $request->getContent();

       // Decode the JSON string into a PHP associative array
       $data = json_decode($jsonString, true);

       // Access the nested value using keys
       $nestedValue = $data['los_pasien']['value'];



        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "lenght"=>$nestedValue,
        ];
         //dd($body);
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/los_pasien", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function datadetails_pasien(Request $request)
    {

        $los_pasien = $request->value;

       // echo $request->los_pasien];
       $jsonString = $request->getContent();

       // Decode the JSON string into a PHP associative array
       $data = json_decode($jsonString, true);

       // Access the nested value using keys
       $nestedValue = $data['los_pasien']['value'];



        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "lenght"=>$nestedValue,
            "mod"=>"history17",
            "kodeunit"=>$request->kodeunit,
            "noregister"=>"",
            "norm"=>"",
            "jenisrawat"=>""
        ];
         //dd($body);
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

    public function loguser_login(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");

        $tgl_awal  = $request->startdate ? date('Y-m-d', strtotime($request->startdate)) : '';
        $tgl_akhir = $request->enddate ? date('Y-m-d', strtotime($request->enddate)) : '';

        $client = new Client();

        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/log_user_v2/".Session::get('id_client')."?tgl_awal=".$tgl_awal."&tgl_akhir=".$tgl_akhir, [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function const_monitoring(Request $request)
    {


        date_default_timezone_set("Asia/Jakarta");
       // echo $request->los_pasien];
       $startdate = $request->startdate;
       $enddate = $request->enddate;
       $startdate = date('Y-m-d', strtotime($startdate));
       $enddate = date('Y-m-d', strtotime($enddate));


        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "mode"=>1,
            "startdate"=>$startdate,
            "enddate"=>$enddate,
            "jenisrawat"=>$request->selectedJenisRawat['name'],
        ];
         //dd($body);
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/cost_pasien_monitoring", [
            "json"=>$json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function details_cost_monitoring(Request $request)
    {


        date_default_timezone_set("Asia/Jakarta");
       // echo $request->los_pasien];
       $norm = $request->norm;
       $noregister = $request->noregister;


        $client = new Client();

         //dd($body);
        $response = $client->post($this->ws_simrs."index.php/api/laporan/history_berobat_pasien/".$norm."/".Session::get('id_client')."/".$noregister, [
             'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function get_details_item(Request $request)
    {

        try
        {

            date_default_timezone_set("Asia/Jakarta");

            $noregister = $request->noregister;


            $client = new Client();
            $json = [
                "id_client"=>Session::get('id_client'),
                "noregister"=> $noregister,
            ];

            $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/get_details_item", [
                'json'=>$json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            //var_dump($response->getBody());

            $body = $response->getBody()->getContents();

            return $body;

        }
        catch(\Exception $e)
        {
            \Log::error("HTTP Error: " . $e->getMessage());
            if ($e->hasResponse()) {
                \Log::error("Response: " . $e->getResponse()->getBody()->getContents());
            }
            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Server error occurred',
                ]
            ]);
        }

    }



    public function waktu_layan_monitoring(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        // echo $request->los_pasien];

        $isoDate = $request->startdate;
        $endate = $request->enddate;
        $fixed = date('Y-m-d', strtotime($isoDate));
        $endate = date('Y-m-d', strtotime($endate));


         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "tgl"=>$fixed,
             "enddate"=>$endate
         ];
         $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/check_rekap_waktu_layan", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }
    public function waktu_layan_monitoring_breakdown(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        // echo $request->los_pasien];

        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));


         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "tgl"=>$fixed,
         ];
         $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/breakdown_waktulayan", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }

    public function stts_monitorin(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        // echo $request->los_pasien];

        $startdate = $request->startdate;
        $enddate = $request->enddate;

        $startdate = date('Y-m-d', strtotime($startdate));
        $enddate = date('Y-m-d', strtotime($enddate));


         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "jenisrawat"=>$request->selectedJenisRawat['code'],
             "mode"=>1,
             "tglawal"=> $startdate,
             "tglakhir"=>$enddate
         ];

         //var_dump($json);
         $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/data_stts_tracking", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }
    public function getpasien_perdokter(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        // echo $request->los_pasien];
        $startdate = $request->startdate;
        $enddate = $request->enddate;
        $kddokter = $request->kddokter;
        $startdate = date('Y-m-d', strtotime($startdate));
        $enddate = date('Y-m-d', strtotime($enddate));


         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "jenisrawat"=>$request->selectedJenisRawat['code'],
             "mod"=>"history21",
             "kddokter"=>$kddokter,
             "tglawal"=> $startdate,
             "tglakhir"=>$enddate
         ];
         $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/history3", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }

    public function monitoring_klaim(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        // echo $request->los_pasien];

        $startdate = $request->startdate;
        $enddate = $request->enddate;
        $startdate = date('Y-m-d', strtotime($startdate));
        $enddate = date('Y-m-d', strtotime($enddate));


         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "jenisrawat"=>$request->selectedJenisRawat['code'],
             "mod"=>"history2",
             "tglawal"=> $startdate,
             "tglakhir"=>$enddate
         ];

         $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/get_rincian_klaim", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;

    }

    public function peresepan_monitoring_api(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $startdate = $request->startdate;

        $startdate = date('m-Y', strtotime($startdate));

        if($request->jenisrawatSeleceted==null)
        {
            $data['response']=['code'=>201,'message'=>'Jenis rawat tidak di isi'];
            return $data;
            exit();
        }

         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "jenisrawat"=>$request->jenisrawatSeleceted, //"JALAN",//$request->selectedJenisRawat['code'],
             "mod"=>"history2",
             "bulan_thn"=> $startdate,
             "id_lokasi"=>$request->lokasiSelected
         ];

         $response = $client->post($this->ws_inv."index.php/api/laporan/datacopy_resep", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }

    public function getdata_antrean(Request $request)
    {
        //dataantrian_taksid
        try {
            date_default_timezone_set("Asia/Jakarta");
            $startdate = $request->startdate;

            $startdate = date('Y-m-d', strtotime($startdate));


            $client = new Client();
            $json = [

            ];

            $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/dataantrian_taksid/".$startdate."/".Session::get('id_client'), [
                "json"=>$json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            return $body;

        } catch (GuzzleHttp\Exception\RequestException $e) {
            // Handle HTTP request errors (4xx, 5xx responses)
            $error_message = "HTTP Request Error: " . $e->getMessage();
            if ($e->hasResponse()) {
                $error_message .= " Response: " . $e->getResponse()->getBody()->getContents();
            }

            return json_encode(['error' => 'Request failed', 'message' => $e->getMessage()]);

        } catch (GuzzleHttp\Exception\ConnectException $e) {
            // Handle connection errors (network issues, timeouts)
            $error_message = "Connection Error: " . $e->getMessage();
            error_log($error_message);
            return json_encode(['error' => 'Connection failed', 'message' => 'Unable to connect to the server']);

        } catch (Exception $e) {
            // Handle any other general exceptions
            $error_message = "General Error: " . $e->getMessage();
            error_log($error_message);
            return json_encode(['error' => 'An unexpected error occurred', 'message' => $e->getMessage()]);
        }
    }

    public function batalkan_antrean_bpjs(Request $request)
    {

        $kodebooking = $request->kodebooking;

         $client = new Client();
         $json = [
             "id_client"=>Session::get('id_client'),
             "kodebooking"=>$kodebooking,
         ];

         $response = $client->post($this->ws_simrs."index.php/api/data_referensi/batalkan_antrean_bpjs", [
             "json"=>$json,
             'headers' => [
                 'Content-Type' => 'application/json',
                 'Authorization' => '', // If the API requires an access token
             ]
         ]);


         $body = $response->getBody()->getContents();

         return $body;
    }

}
