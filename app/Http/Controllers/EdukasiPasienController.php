<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Session;

class EdukasiPasienController extends Controller
{

    protected $ws_simrs;

    public function __construct()
    {
        if(config('app.APP_DEBUG')==True)
        {
            $this->ws_simrs = config('app.ws_sim_dev');
        }
        else
        {
            $this->ws_simrs = config('app.ws_sim_prod');
        }
    }

    public function simpan_hambatan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'        => Session::get('id_client'),
                'noregister'       => $request->noregister,
                'hambatan'         => $request->hambatan,
                'bahasa_digunakan' => $request->bahasa_digunakan ?? '',
                'nama_penerjemah'  => $request->nama_penerjemah ?? '',
                'hambatan_lainnya' => $request->hambatan_lainnya ?? '',
                'username'         => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_hambatan_edukasi';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_hambatan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_hambatan_edukasi/'
                   . $request->noregister . '/' . Session::get('id_client');
            $client = new Client();
            $response = $client->post($url, [
                'json'    => '',
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function simpan_sesi(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'             => Session::get('id_client'),
                'noregister'            => $request->noregister,
                'materi_kode'           => $request->materi_kode,
                'materi_label'          => $request->materi_label,
                'sub_items'             => $request->sub_items,
                'waktu_edukasi'         => $request->waktu_edukasi,
                'metoda'                => $request->metoda,
                'metoda_lainnya'        => $request->metoda_lainnya ?? '',
                'durasi_menit'          => $request->durasi_menit,
                'profesi_edukator'      => $request->profesi_edukator ?? '',
                'nama_edukator'         => $request->nama_edukator ?? '',
                'evaluasi_pemahaman'    => $request->evaluasi_pemahaman,
                'evaluasi_lainnya'      => $request->evaluasi_lainnya ?? '',
                'sasaran_edukasi'       => $request->sasaran_edukasi,
                'sasaran_lainnya'       => $request->sasaran_lainnya ?? '',
                'paraf_edukator'        => $request->paraf_edukator ?? '',
                'paraf_pasien_keluarga' => $request->paraf_pasien_keluarga ?? '',
                'username'              => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_edukasi_pasien';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_riwayat(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_edukasi_pasien/'
                   . $request->noregister . '/' . Session::get('id_client');
            $client = new Client();
            $response = $client->post($url, [
                'json'    => '',
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function hapus_sesi(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'  => Session::get('id_client'),
                'noregister' => $request->noregister,
                'id_detail'  => $request->id_detail,
                'username'   => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/hapus_edukasi_pasien';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function upload_ttd_edukasi(Request $request)
    {
        try {
            $file = $request->file('image');

            $timestamp = now()->timestamp;
            $hashCode  = hash('sha256', Str::random(10) . $timestamp);
            $extension = $file->extension();
            $fileName  = 'ttd-edukasi-' . $hashCode . '.' . $extension;

            $file->move(public_path('storage/edukasi/' . Session::get('id_client')), $fileName);

            $url = url('storage/edukasi/' . Session::get('id_client') . '/' . $fileName);

            $json = [
                'id_client'  => Session::get('id_client'),
                'noregister' => $request->noregister,
                'id_detail'  => $request->id_detail,
                'filename'   => $url,
            ];

            $client = new Client();
            $response = $client->post($this->ws_simrs . 'index.php/api/penunjang/save_ttd_edukasi', [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }
}
