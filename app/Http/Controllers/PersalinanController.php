<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;

/**
 * PersalinanController
 * Proxy ke SIMRS CI3 API — pattern identik dengan IcuController.
 * Endpoint CI3: index.php/api/persalinan/{method}
 */
class PersalinanController extends Controller
{
    protected $ws_simrs;

    public function __construct()
    {
        $this->ws_simrs = config('app.APP_DEBUG') == true
            ? config('app.ws_sim_dev')
            : config('app.ws_sim_prod');
    }

    // ── Helper POST ke SIMRS ───────────────────────────────────────────────────
    private function proxyPost(string $endpoint, $json = '')
    {
        $client = new Client();
        return $client->post($this->ws_simrs . $endpoint, [
            'json'            => $json,
            'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
            'timeout'         => 30,
            'connect_timeout' => 10,
        ])->getBody()->getContents();
    }

    // =========================================================================
    // GET — Ambil data persalinan
    // CI3: POST /index.php/api/persalinan/get_persalinan/{noregister}/{id_client}
    // =========================================================================
    public function get(Request $request)
    {
        try {
            $noregister = $request->noregister;
            $id_client  = Session::get('id_client');

            $url      = $this->ws_simrs
                        . 'index.php/api/persalinan/get_persalinan/'
                        . $noregister . '/' . $id_client;

            $client   = new Client();
            $response = $client->post($url, [
                'json'            => '',
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    // =========================================================================
    // POST — Simpan draft
    // CI3: POST /index.php/api/persalinan/save_persalinan
    // =========================================================================
    public function save(Request $request)
    {
        try {
            $json = array_merge($request->all(), [
                'id_client' => Session::get('id_client'),
                'username'  => Session::get('user_id'),
            ]);
            return $this->proxyPost('index.php/api/persalinan/save_persalinan', $json);
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    // =========================================================================
    // POST — Finalisasi & kunci RM
    // CI3: POST /index.php/api/persalinan/finalize_persalinan
    // =========================================================================
    public function finalize(Request $request)
    {
        try {
            $json = array_merge($request->all(), [
                'id_client' => Session::get('id_client'),
                'username'  => Session::get('user_id'),
            ]);
            return $this->proxyPost('index.php/api/persalinan/finalize_persalinan', $json);
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }
}
