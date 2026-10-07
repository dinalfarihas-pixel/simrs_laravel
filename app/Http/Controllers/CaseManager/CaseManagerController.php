<?php

namespace App\Http\Controllers\CaseManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use GuzzleHttp\Client;

class CaseManagerController extends Controller
{
    protected $ws_simrs;

    public function __construct()
    {
        if (config('app.APP_DEBUG') == True) {
            $this->ws_simrs = config('app.ws_sim_dev');
        } else {
            $this->ws_simrs = config('app.ws_sim_prod');
        }
    }

    public function get_case_manager(Request $request)
    {
        try {
            $json = [
                "id_client" => Session::get('id_client'),
                "noregister" => $request->noregister,
            ];

            $url_simrs = $this->ws_simrs.'index.php/api/Case_manager/get_case_manager';
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function simpan_case_manager(Request $request)
    {
        try {
            $json = [
                "id_client" => Session::get('id_client'),
                "noregister" => $request->noregister,
                "nomr" => $request->nomr,
                "tanggal_jam" => $request->tanggal_jam,
                "item" => $request->item,
                "kegiatan" => $request->kegiatan,
                "nama_petugas" => $request->nama_petugas,
            ];

            $url_simrs = $this->ws_simrs.'index.php/api/Case_manager/simpan_case_manager';
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function update_case_manager(Request $request)
    {
        try {
            $json = [
                "id_client" => Session::get('id_client'),
                "id" => $request->id,
                "noregister" => $request->noregister,
                "tanggal_jam" => $request->tanggal_jam,
                "item" => $request->item,
                "kegiatan" => $request->kegiatan,
                "nama_petugas" => $request->nama_petugas,
            ];

            $url_simrs = $this->ws_simrs.'index.php/api/Case_manager/update_case_manager';
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }

    public function hapus_case_manager(Request $request)
    {
        try {
            $json = [
                "id_client" => Session::get('id_client'),
                "id" => $request->id,
            ];

            $url_simrs = $this->ws_simrs.'index.php/api/Case_manager/hapus_case_manager';
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
            $json['metadata'] = ['code' => 201, "message" => $e->getMessage()];
            return response()->json([
                $json
            ]);
        }
    }
}
