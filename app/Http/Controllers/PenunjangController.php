<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class PenunjangController extends Controller
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

    public function listorderPenunjang(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $startdate = date('Y-m-d', strtotime($request->startdate));

            $enddate = date('Y-m-d', strtotime($request->enddate));

            $json=[
                "id_client"=>Session::get('id_client'),
                "jenispermintaan"=>$request->jenispermintaan,
                "kategori"=>$request->kategori,
                "mode"=>$request->mode,
                "tanggal"=>$startdate,
                "tanggal_end"=>$enddate,
                "status"=>$request->status,
                "nomr"=>$request->nomr,
                "receipt_no"=>$request->no_receipt,
            ];

            // var_dump(json_encode($json,true));
            // exit();
            $url = $this->ws_inv.'index.php/api/sales/get_list_labor_dan_radiologiv2'; // Replace this with the API endpoint URL
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


    public function get_detail_radiologi(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $json=[
                "id_client"=>Session::get('id_client'),
                "no_receipt"=>$request->no_receipt,
                "barcode"=>$request->barcode,
                "mode"=>$request->mode,
            ];

            $url = $this->ws_inv.'index.php/api/sales/get_detail_radiologi_v2'; // Replace this with the API endpoint URL
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

    public function hapus_lampiran_foto_rad(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");
            $json=[
                "id_client"=>Session::get('id_client'),
                "id"=>$request->id,
            ];
            //var_dump($json);

            $url = $this->ws_inv.'index.php/api/sales/hapus_lampiran_foto_rad'; // Replace this with the API endpoint URL
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

    public function simpanhasil_bacaradiologi(Request $request)  ///UNTUK MEMANGGIL DATA LIST ORDER PENUNJANG (LAB DAN RADIOLOGI)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");
            $json=[
                "id_client"=>Session::get('id_client'),
                "no_receipt"=>$request->no_receipt,
                "barcode"=>$request->barcode,
                "hasil_baca"=>$request->hasilbaca,
                "status"=>"C"
            ];

            //var_dump($json);

            $url = $this->ws_inv.'index.php/api/sales/simpan_hasil_baca_radiologi_v2'; // Replace this with the API endpoint URL
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

    public function getmaster_gizi(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");
            $json=[
                "id_client"=>Session::get('id_client'),
            ];

            //var_dump($json);

            $url = $this->ws_simrs.'index.php/api/data_referensi/getmaster_gizi'; // Replace this with the API endpoint URL
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


    public function history_obat_penunjang(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");
            $json=[
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->NOPENDAFTARAN,
            ];

            //var_dump($json);

            $url = $this->ws_simrs.'index.php/api/laporan/history_obat_penunjang'; // Replace this with the API endpoint URL
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

    public function masterpasien(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $json=[
                "id_client"=>Session::get('id_client'),
                "mode"=>$request->mode,
                "nomr"=>$request->nomr,
            ];


            $url = $this->ws_simrs.'index.php/api/data_referensi/GetDataPasien_v3'; // Replace this with the API endpoint URL
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

    public function get_yonif(Request $request)
    {
        try
        {
            $client = new Client();
            $response = $client->post($this->ws_simrs.'index.php/api/data_referensi/get_yonif',[
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
                'metadata' => ['code' => 201, 'message' => $e->getMessage()]
            ]);
        }
    }

    public function update_pekerjaan_pasien(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $id_client = Session::get('id_client');

            $json = [
                "nomr"                => $request->nomr,
                "noregister"          => $request->noregister,
                "pekerjaan"           => $request->pekerjaan,
                "no_nrp"              => $request->no_nrp,
                "hubungan_tni_polri"  => $request->hubungan_tni_polri,
                "pangkat"             => $request->pangkat,
                "satuan"              => $request->satuan,
            ];

            $url = $this->ws_simrs.'index.php/api/data_referensi/update_pekerjaan_pasien/'.$id_client;
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

    public function input_permintaan_fisio(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $isoDate = $request->startdate;
            $fixed = date('Y-m-d H:i:s', strtotime($isoDate));

            $json=[

                "tanggal"=>$fixed,
                "klinis"=>$request->dataklinis,
                "keterangan"=>$request->keterangan,
                "noregister"=>$request->noregister,
                "asal_permintaan"=>$request->asal_permintaan,
                "user_id"=>Session::get('user_id'),
                "id_client"=>Session::get('id_client'),
            ];

            $url = $this->ws_simrs.'index.php/api/Triaseigd/input_permintaan_fisio'; // Replace this with the API endpoint URL
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

    public function get_data_permintaan_fisio(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[
                "mode"=>$request->mode,
                "noregister"=>$request->noregister,
            ];

            $url = $this->ws_simrs.'index.php/api/Triaseigd/get_data_permintaan_fisio'; // Replace this with the API endpoint URL
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

    public function hapus_permintaan_fisio(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[
                "id"=>$request->id,
            ];

            $url = $this->ws_simrs.'index.php/api/Triaseigd/hapus_permintaan_fisio'; // Replace this with the API endpoint URL
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

    public function listpermintaan_fisio(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $isoDate = $request->startdate;
            $fixed = date('Y-m-d', strtotime($isoDate));

            $json=[
                "tanggal"=>$fixed,
                "id_client"=>Session::get('id_client'),
                "mode"=>$request->mode,
            ];

            $url = $this->ws_simrs.'index.php/api/Triaseigd/listpermintaan_fisio'; // Replace this with the API endpoint URL
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

    public function get_template_lab()
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[

            ];

            $url = $this->ws_inv.'index.php/api/data_referensi/get_template_lab/'.Session::get('id_client'); // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->get($url,[
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

    public function get_kategori_lab()
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");
            $json=[

            ];

            $url = $this->ws_inv.'index.php/api/data_referensi/get_kategori_lab/'.Session::get('id_client');; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->get($url,[
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

    public function update_template_lab(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[
                "data"=>$request->all(),
                "id_client"=>Session::get('id_client')
            ];

            $url = $this->ws_inv.'index.php/api/data_referensi/update_template_lab/'; // Replace this with the API endpoint URL
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

    public function add_template_lab(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[
                "data"=>$request->all(),
                "id_client"=>Session::get('id_client')
            ];

            $url = $this->ws_inv.'index.php/api/data_referensi/add_template_lab/'; // Replace this with the API endpoint URL
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

    public function deleted_item_template(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json=[
                "data"=>$request->all(),
                "id_client"=>Session::get('id_client')
            ];

            $url = $this->ws_inv.'index.php/api/data_referensi/deleted_item_template/'; // Replace this with the API endpoint URL
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

    public function get_list_resep(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $isoDate = $request->startdate;

            $fixed = date('Y-m-d', strtotime($isoDate));

            $param =Session::get('id_client')."/".$fixed;

            $url = $this->ws_inv.'index.php/api/sales/get_list_resep/'.$param ; // Replace this with the API endpoint URL
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

    public function get_resume_pulang(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");


            $json = [
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "mode"=>0,
                "lokasi"=>''
            ];

            $url = $this->ws_simrs.'index.php/api/Resumepulang/getdata_resume_v2/'; // Replace this with the API endpoint URL
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

    public function getTransferSummary(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                "id_client"=>Session::get('id_client'),
                "id_lokasi"=>isset($request->lokasi) ? $request->lokasi : Session::get('lokasi_inv'),
            ];

            $url = $this->ws_inv.'index.php/api/penerimaan/getTransferSummary'; // Replace this with the API endpoint URL
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

    public function insert_konsultasi_dokter(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                "id_client"=>Session::get('id_client'),
                "noregister"=>$request->noregister,
                "no_rm"=>$request->no_rm,
                "nama_pasien"=>$request->nama_pasien,
                "diagnosa"=>$request->diagnosa,
                "keluhan"=>$request->keluhan,
                "dokter_tujuan"=>$request->dokter_tujuan,
                "dokter_pengirim"=>$request->dokter_pengirim,
            ];

            $url = $this->ws_simrs.'index.php/api/Resumepulang/insert_konsul_json'; // Replace this with the API endpoint URL
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

    public function get_konsultasi_dokter(Request $request)
    {
        try
        {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                "id_client"=>Session::get('id_client'),
                "noregister"=>isset($request->noregister) ? $request->noregister : null,
                "kd_dokter"=>Session::get('kodedokter'),//isset($request->kd_dokter) ? $request->kd_dokter : null,
                "id_konsul"=>isset($request->id_konsul) ? $request->id_konsul : null,
                "mode"=>$request->mode,
            ];

            $url = $this->ws_simrs.'index.php/api/Resumepulang/get_data_konsul'; // Replace this with the API endpoint URL
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

    public function insert_balasan_konsul(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

           $json = [
                'id_konsul'=> $request->id_konsul,
                'noregister'=> $request->noregister,
                'kode_dokter'=> $request->kode_dokter,
                'nama_dokter'=> $request->nama_dokter,
                'is_me'=>isset($request->is_me) ? $request->is_me : 0,
                'balasan'=> $request->balasan,
                'id_client'=> Session::get('id_client')
            ];

            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Resumepulang/insert_balasan_konsul", [
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

    public function delete_balasan_konsul(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

           $json = [
                'detail_id'=> $request->detail_id,
                'id_client'=> Session::get('id_client')
            ];
            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Resumepulang/delete_balasan_konsul", [
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

    public function konsultasi_read(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

           $json = [
                'id_konsul'=> $request->id_konsul,
                'id_client'=> Session::get('id_client')
            ];
            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Resumepulang/konsultasi_read", [
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

    public function konsultasi_selesai(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

           $json = [
                'id_konsul'=> $request->id_konsul,
                'id_client'=> Session::get('id_client')
            ];
            // Validate required data
            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Resumepulang/konsultasi_selesai", [
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

    public function simpan_siriraj(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                'id_client' => Session::get('id_client'),
                'noregister' => $request->noregister,
                'kesadaran' => $request->kesadaran,
                'kesadaran_caption' => $request->kesadaran_caption,
                'muntah' => $request->muntah,
                'muntah_caption' => $request->muntah_caption,
                'sakit_kepala' => $request->sakit_kepala,
                'sakit_kepala_caption' => $request->sakit_kepala_caption,
                'tekanan_darah_diastolik' => $request->tekanan_darah_diastolik,
                'ateroma' => $request->ateroma,
                'ateroma_caption' => $request->ateroma_caption,
                'skor_akhir' => $request->skor_akhir,
                'interpretasi' => $request->interpretasi,
                'username' => Session::get('user_id'),
                'id_client' => Session::get('id_client'),
            ];


            $url = $this->ws_simrs . 'index.php/api/penunjang/save_siriraj';
            $client = new Client();
            $response = $client->post($url, [
                'json' => $json,
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function get_siriraj(Request $request)
    {
          try {
            date_default_timezone_set("Asia/Jakarta");


            $url = $this->ws_simrs . 'index.php/api/penunjang/get_siriraj/'.$request->noregister."/".Session::get('id_client');
            $client = new Client();
            $response = $client->post($url, [
                'json' => '',
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function hapus_siriraj(Request $request)
    {
         try {
            date_default_timezone_set("Asia/Jakarta");

            $url = $this->ws_simrs . 'index.php/api/penunjang/deleted_siriraj/'.$request->noregister."/".Session::get('id_client');
            $client = new Client();
            $response = $client->post($url, [
                'json' => '',
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    // =====================================================
    // KAJIAN RISIKO JATUH
    // =====================================================

    public function simpan_resiko_jatuh(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'      => Session::get('id_client'),
                'noregister'     => $request->noregister,
                'skala'          => $request->skala,
                'skor_total'     => $request->skor_total,
                'interpretasi'   => $request->interpretasi,
                'catatan'        => $request->catatan ?? '',
                'parameter_json' => $request->parameter_json,
                'detail_items'   => $request->detail_items,
                'username'       => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_resiko_jatuh';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_resiko_jatuh(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_resiko_jatuh/'
                   . $request->noregister . '/' . Session::get('id_client');
            $client = new Client();
            $response = $client->post($url, [
                'json'    => '',
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function hapus_resiko_jatuh(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'  => Session::get('id_client'),
                'noregister' => $request->noregister,
                'id_kajian'  => $request->id_kajian,
                'username'   => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/hapus_resiko_jatuh';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_recent_obat_poly(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                "id_client" => Session::get('id_client'),
                "kode_poli" => $request->kode_poli,
                "limit"     => $request->limit ?? '20',
            ];

            $url = $this->ws_inv . 'index.php/api/data_referensi/get_recent_obat_poly';
            $client = new Client();
            $response = $client->post($url, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ],
            ]);

            $body = $response->getBody()->getContents();
            return $body;

        } catch (\Exception $e) {
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([$json]);
        }
    }

    public function reset_otorisasi_radiologi(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                "id_client" => Session::get('id_client'),
                "receipt_no"        => $request->RECEIPT_NO,
            ];

            $url = $this->ws_inv . 'index.php/api/data_referensi/reset_otorisasi';
            $client = new Client();
            $response = $client->post($url, [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '',
                ],
            ]);

            $body = $response->getBody()->getContents();
            return $body;

        } catch (\Exception $e) {
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([$json]);
        }
    }

}
