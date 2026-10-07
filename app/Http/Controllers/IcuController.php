<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;

class IcuController extends Controller
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

    // =========================================================================
    // CHECKLIST KRITERIA MASUK ICU / HCU
    // =========================================================================

    public function simpan_checklist_masuk(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                'id_client'            => Session::get('id_client'),
                'noregister'           => $request->noregister,
                'no_rm'                => $request->no_rm,
                'nama_pasien'          => $request->nama_pasien,
                'ruangan_asal'         => $request->ruangan_asal,
                'dokter_perujuk'       => $request->dokter_perujuk ?? '',
                'diagnosa'             => $request->diagnosa,
                'tgl_pengajuan'        => $request->tgl_pengajuan,
                'unit_tujuan'          => $request->unit_tujuan,
                'checklist_masuk'      => $request->checklist_masuk,
                'checklist_eksklusi'   => $request->checklist_eksklusi ?? [],
                'catatan_eksklusi'     => $request->catatan_eksklusi ?? '',
                'fisiologis'           => $request->fisiologis ?? [],
                'is_eligible'          => $request->is_eligible ?? true,
                'hasil_keputusan'      => $request->hasil_keputusan,
                'unit_alternatif'      => $request->unit_alternatif ?? null,
                'alasan_penolakan'     => $request->alasan_penolakan ?? '',
                'nama_dokter_approver' => $request->nama_dokter_approver,
                'ttd_digital'          => $request->ttd_digital ?? '',
                'tgl_keputusan'        => $request->tgl_keputusan,
                'username'             => Session::get('user_id'),
            ];

            $url    = $this->ws_simrs . 'index.php/api/icu/save_checklist_masuk';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_all_checklist_masuk(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $tgl_awal  = $request->tgl_awal  ? date('Y-m-d', strtotime($request->tgl_awal))  . ' 00:00:00' : null;
            $tgl_akhir = $request->tgl_akhir ? date('Y-m-d', strtotime($request->tgl_akhir)) . ' 23:59:59' : null;

            $json = [
                'id_client' => Session::get('id_client'),
                'tgl_awal'  => $tgl_awal,
                'tgl_akhir' => $tgl_akhir,
            ];

            $url    = $this->ws_simrs . 'index.php/api/icu/get_all_checklist_masuk';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_checklist_masuk(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $url    = $this->ws_simrs . 'index.php/api/icu/get_checklist_masuk/'
                      . $request->noregister . '/' . Session::get('id_client');
            $client = new Client();
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

    public function update_checklist_masuk(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                'id_client'            => Session::get('id_client'),
                'id_checklist'         => $request->id_checklist,
                'noregister'           => $request->noregister,
                'no_rm'                => $request->no_rm,
                'nama_pasien'          => $request->nama_pasien,
                'ruangan_asal'         => $request->ruangan_asal,
                'dokter_perujuk'       => $request->dokter_perujuk ?? '',
                'diagnosa'             => $request->diagnosa,
                'tgl_pengajuan'        => $request->tgl_pengajuan,
                'unit_tujuan'          => $request->unit_tujuan,
                'checklist_masuk'      => $request->checklist_masuk,
                'checklist_eksklusi'   => $request->checklist_eksklusi ?? [],
                'catatan_eksklusi'     => $request->catatan_eksklusi ?? '',
                'fisiologis'           => $request->fisiologis ?? [],
                'is_eligible'          => $request->is_eligible ?? true,
                'hasil_keputusan'      => $request->hasil_keputusan,
                'unit_alternatif'      => $request->unit_alternatif ?? null,
                'alasan_penolakan'     => $request->alasan_penolakan ?? '',
                'nama_dokter_approver' => $request->nama_dokter_approver,
                'ttd_digital'          => $request->ttd_digital ?? '',
                'tgl_keputusan'        => $request->tgl_keputusan,
                'username'             => Session::get('user_id'),
            ];

            $url    = $this->ws_simrs . 'index.php/api/icu/update_checklist_masuk';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function hapus_checklist_masuk(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                'id_client'    => Session::get('id_client'),
                'noregister'   => $request->noregister,
                'id_checklist' => $request->id_checklist,
                'username'     => Session::get('user_id'),
            ];

            $url    = $this->ws_simrs . 'index.php/api/icu/hapus_checklist_masuk';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
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
    // PEMANTAUAN INTENSIF ICU
    // =========================================================================

    public function simpan_pemantauan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = array_merge($request->all(), [
                'id_client' => Session::get('id_client'),
                'username'  => Session::get('user_id'),
            ]);

            $url    = $this->ws_simrs . 'index.php/api/icu/save_pemantauan';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }

    public function get_pemantauan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $noregister     = $request->noregister;
            $tgl_monitoring = $request->tgl_monitoring;
            $id_client      = Session::get('id_client');

            $url    = $this->ws_simrs . 'index.php/api/icu/get_pemantauan/'
                      . $noregister . '/' . $tgl_monitoring . '/' . $id_client;
            $client = new Client();
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

    public function get_tanggal_pemantauan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $noregister = $request->noregister;
            $id_client  = Session::get('id_client');

            $url    = $this->ws_simrs . 'index.php/api/icu/get_tanggal_pemantauan/'
                      . $noregister . '/' . $id_client;
            $client = new Client();
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

    public function hapus_pemantauan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $json = [
                'id_client'      => Session::get('id_client'),
                'id_pemantauan'  => $request->id_pemantauan,
                'username'       => Session::get('user_id'),
            ];

            $url    = $this->ws_simrs . 'index.php/api/icu/hapus_pemantauan';
            $client = new Client();
            $response = $client->post($url, [
                'json'            => $json,
                'headers'         => ['Content-Type' => 'application/json', 'Authorization' => ''],
                'timeout'         => 30,
                'connect_timeout' => 10,
            ]);
            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            return response()->json(['code' => 500, 'message' => $e->getMessage()]);
        }
    }
}
