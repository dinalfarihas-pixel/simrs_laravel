<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;

class PengkajianNyeriController extends Controller
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

    public function simpan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'      => Session::get('id_client'),
                'noregister'     => $request->noregister,
                'skala'          => $request->skala,
                'skor_total'     => $request->skor_total,
                'interpretasi'   => $request->interpretasi,
                'lokasi_nyeri'   => $request->lokasi_nyeri ?? '',
                'catatan'        => $request->catatan ?? '',
                'parameter_json' => $request->parameter_json,
                'detail_items'   => $request->detail_items,
                'username'       => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_pengkajian_nyeri';
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
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_pengkajian_nyeri/'
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

    public function hapus(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'  => Session::get('id_client'),
                'noregister' => $request->noregister,
                'id_kajian'  => $request->id_kajian,
                'username'   => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/hapus_pengkajian_nyeri';
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

    public function simpan_infeksius(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'           => Session::get('id_client'),
                'noregister'          => $request->noregister,
                'skor_total'          => $request->skor_total,
                'interpretasi'        => $request->interpretasi,
                'kewaspadaan_isolasi' => $request->kewaspadaan_isolasi ?? '',
                'catatan'             => $request->catatan ?? '',
                'parameter_json'      => $request->parameter_json,
                'detail_items'        => $request->detail_items,
                'username'            => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_skrining_infeksius';
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

    public function get_riwayat_infeksius(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_skrining_infeksius/'
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

    public function hapus_infeksius(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'  => Session::get('id_client'),
                'noregister' => $request->noregister,
                'id_kajian'  => $request->id_kajian,
                'username'   => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/hapus_skrining_infeksius';
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

    public function simpan_terminal(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'                     => Session::get('id_client'),
                'noregister'                    => $request->noregister,
                'nomr'                          => $request->nomr,
                'jenis_pengkajian'               => $request->jenis_pengkajian,
                'tanggal_jam'                   => $request->tanggal_jam,

                'pernafasan_items'              => $request->pernafasan_items,
                'spo2'                          => $request->spo2,
                'tonus_otot_items'               => $request->tonus_otot_items,
                'nyeri_status'                  => $request->nyeri_status,
                'nyeri_lokasi'                  => $request->nyeri_lokasi,
                'nyeri_skala'                   => $request->nyeri_skala,
                'sirkulasi_items'                => $request->sirkulasi_items,

                'faktor_items'                  => $request->faktor_items,
                'faktor_lainnya'                => $request->faktor_lainnya,

                'masalah_keperawatan_items'     => $request->masalah_keperawatan_items,
                'masalah_keperawatan_lainnya'   => $request->masalah_keperawatan_lainnya,

                'perlu_pelayanan_spiritual'     => $request->perlu_pelayanan_spiritual,

                'perlu_didoakan'                => $request->perlu_didoakan,
                'perlu_bimbingan_rohani'        => $request->perlu_bimbingan_rohani,

                'status_psikologi'              => $request->status_psikologi,

                'kontak_ada'                    => $request->kontak_ada,
                'kontak_siapa'                  => $request->kontak_siapa,
                'kontak_hubungan'               => $request->kontak_hubungan,
                'kontak_dimana'                 => $request->kontak_dimana,
                'kontak_telpon'                 => $request->kontak_telpon,

                'rencana_perawatan'             => $request->rencana_perawatan,
                'lingkungan_disiapkan'          => $request->lingkungan_disiapkan,
                'mampu_merawat_dirumah'         => $request->mampu_merawat_dirumah,
                'mampu_merawat_oleh'            => $request->mampu_merawat_oleh,
                'perlu_difasilitasi_rs'         => $request->perlu_difasilitasi_rs,

                'reaksi_pasien_items'           => $request->reaksi_pasien_items,
                'reaksi_pasien_masalah_items'   => $request->reaksi_pasien_masalah_items,
                'reaksi_pasien_lainnya'         => $request->reaksi_pasien_lainnya,

                'reaksi_keluarga_items'         => $request->reaksi_keluarga_items,
                'reaksi_keluarga_masalah_items' => $request->reaksi_keluarga_masalah_items,

                'dukungan_items'                => $request->dukungan_items,
                'dukungan_lainnya'              => $request->dukungan_lainnya,

                'alternatif_items'              => $request->alternatif_items,
                'alternatif_lainnya'            => $request->alternatif_lainnya,

                'resiko_keluarga_items'         => $request->resiko_keluarga_items,
                'resiko_keluarga_masalah_items' => $request->resiko_keluarga_masalah_items,

                'selesai_tanggal_jam'           => $request->selesai_tanggal_jam,

                'username'                      => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/save_pengkajian_terminal';
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

    public function get_riwayat_terminal(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $url = $this->ws_simrs . 'index.php/api/penunjang/get_pengkajian_terminal/'
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

    public function hapus_terminal(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");
            $json = [
                'id_client'     => Session::get('id_client'),
                'noregister'    => $request->noregister,
                'id_pengkajian' => $request->id_pengkajian,
                'username'      => Session::get('user_id'),
            ];
            $url = $this->ws_simrs . 'index.php/api/penunjang/hapus_pengkajian_terminal';
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
}
