<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;

/**
 * Konfirmasi depo atas retur sisa obat pasien dari ruangan.
 * Proxy ke ws_inv (ws_posindo_v2.1) index.php/api/ReturRuangan/{list|detail|terima|tolak}.
 * Terima = stok depo kembali ke batch asal; tagihan pasien tidak diubah (NILAI_RETUR dicatat).
 */
class ReturObatRuanganController extends Controller
{
    protected $ws_inv;
    protected $ws_simrs;

    public function __construct()
    {
        if(config('app.APP_DEBUG')==True) {
            $this->ws_inv = config('app.ws_inv_dev');
            $this->ws_simrs = config('app.ws_sim_dev');
        } else {
            $this->ws_inv = config('app.ws_inv_prod');
            $this->ws_simrs = config('app.ws_sim_prod');
        }
    }

    private function post_retur($method, array $json)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json['id_client'] = Session::get('id_client');

            $url = $this->ws_inv . 'index.php/api/ReturRuangan/' . $method;
            $client = new Client();
            $response = $client->post($url, [
                'json'    => $json,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout' => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['metadata' => ['code' => 500, 'message' => $e->getMessage()]]);
        }
    }

    // Monitoring sisa obat pasien yang belum diberikan / diretur (ws_sim_v2 Resumepulang)
    public function monitoring_obat_tidak_diberikan(Request $request)
    {
        try {
            $url = $this->ws_simrs . 'index.php/api/Resumepulang/monitoring_obat_tidak_diberikan';
            $client = new Client();
            $response = $client->post($url, [
                'json'    => [
                    'id_client'     => Session::get('id_client'),
                    'status_pasien' => $request->status_pasien,
                    'id_depo'       => $request->id_depo,
                ],
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
                // Harus di bawah max_execution_time PHP (60 detik) agar timeout tertangkap di catch
                'timeout' => 45,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['metadata' => ['code' => 500,
                'message' => 'Gagal memuat monitoring dari ws_sim_v2: '.$e->getMessage()]]);
        }
    }

    public function list(Request $request)
    {
        return $this->post_retur('list', [
            'status'     => $request->status,
            'noregister' => $request->noregister,
            'tgl_min'    => $request->tgl_min,
            'tgl_max'    => $request->tgl_max,
        ]);
    }

    public function detail(Request $request)
    {
        return $this->post_retur('detail', [
            'id_retur' => $request->id_retur,
        ]);
    }

    public function terima(Request $request)
    {
        return $this->post_retur('terima', [
            'id_retur'  => $request->id_retur,
            'username'  => Session::get('user_id'),
            'id_lokasi' => Session::get('lokasi_inv'),
        ]);
    }

    public function tolak(Request $request)
    {
        return $this->post_retur('tolak', [
            'id_retur'      => $request->id_retur,
            'username'      => Session::get('user_id'),
            'alasan'        => $request->alasan,
            'tindak_lanjut' => $request->tindak_lanjut,
        ]);
    }
}
