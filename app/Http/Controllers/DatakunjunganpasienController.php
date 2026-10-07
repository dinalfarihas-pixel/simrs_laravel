<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use LZCompressor\LZString as LZString;

class DatakunjunganpasienController extends Controller
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


    public function datarawatpasien_api(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));


        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "tglawal"=>$fixed,
            "mod"=>"history1.1",
            "kodeunit"=>Session::get('kodeunit_login'),
            "kd_dokter"=>Session::get('kodedokter'),
            "noregister"=>"",
            "norm"=>"",
            "jenisrawat"=>""
        ];


        $client = new Client();
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

    public function datarawatpasien_baseparam_api(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));


        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "tglawal"=>$fixed,
            "mod"=>$request->mode,
            "kodeunit"=>Session::get('kodeunit_login'),
            "kd_dokter"=>Session::get('kodedokter'),
            "noregister"=>"",
            "norm"=>$request->norm,
            "jenisrawat"=>$request->jenisrawat,
        ];

        $client = new Client();
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

    public function getpasien_api(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));

        $enddate = $request->enddate;
        $enddate = date('Y-m-d', strtotime($enddate));

        $kodenuit="";
        if($request->kodeunit=="")
        {
            $kodenuit=Session::get('kodeunit_login');
        }
        else
        {
            $kodenuit=$request->kodeunit;
        }

        $nosep="";
        if(isset($request->nosep))
        {
            $nosep=$request->nosep;
        }

        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "mod" => (Session::get('kodedokter') == "" || null) ? $request->mode : 15,
            "kodeunit"=>$kodenuit,//$request->kodeunit,
            "kd_dokter"=> (Session::get('kodedokter') == "" || null) ? $request->kodedokter : Session::get('kodedokter'),
            "noregister"=>$request->noregister,
            "nosep"=>$nosep,
            "tglawal"=>$fixed,
            "tglakhir"=>$enddate,
            "norm"=>$request->norm,
            "jenisrawat"=>isset($request->jenis_rawat) ? $request->jenis_rawat : ""  ,
            "parametersearch"=>isset($request->parametersearch) ? $request->parametersearch : ""
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/history_versi4", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;
    }


    public function data_pasien_meninggal(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Ym', strtotime($isoDate));

        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "mod"=>$request->mode,
            "kd_dokter"=>$request->kodedokter,
            "tanggal_meninggal"=>$fixed,
            "norm"=>$request->norm,
            "jenisrawat"=>""
        ];


        $client = new Client();
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


    public function call_icare(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [
            "kodedokter"=>(int)Session::get('kodedokter'),
            "param"=>$request->noka];


        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/geturl_icare/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $res=LZString::decompressFromEncodedURIComponent($body['response']);
        $body['response']= $res;

        return  $body;
    }

    public function riwayat_kunjungan(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");

        $norm = $request->norm;


        $client = new Client();
        $json = [
            "kodedokter"=>(int)Session::get('kodedokter'),
            "param"=>$request->noka];

            $response = $client->get($this->ws_simrs."index.php/api/transaksi_pasien/get_riwayat_lengkap_pasien/".Session::get('id_client')."/".$norm, [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return  $body;
    }

    public function datarawatpasien_ranap_api(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Ym', strtotime($isoDate));

        $client = new Client();
        $json = [
            "kodeunit"=>"",
            "id_client"=>Session::get('id_client'),
            "tglawal"=>$fixed,
            "mod"=>"history18",
            "kd_dokter"=>Session::get('kodedokter'),
            "noregister"=>"",
            "norm"=>"",
            "jenisrawat"=>""
        ];



        $client = new Client();
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

    public function getnamaruangan_poli(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");


        $client = new Client();
        $json = [

        ];

        $client = new Client();
        $response = $client->get($this->ws_simrs."index.php/api/transaksi_pasien/getdataruangterpakai_v2/".$request->mode."/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;
    }

    public function pasien_sedang_rawat_inap()
    {
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [

        ];

        $client = new Client();
        $response = $client->get($this->ws_simrs."index.php/api/laporan/pasien_sedang_rawat_inap/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;
    }

    public function pasien_pindah_ruangan(Request $request)
    {
        //var data = webservice.POSTData(GLobalVariable.URL_WS + "index.php/api/transaksi_pasien
        ///transfer_pasien_ranap/"+ ID_RUANGAN+"/" + OLD_RUANGAN + "/" + NOREGISTER + "/" + TRANS_DATE + "/" + Class.GlobalClass.ID_CLIENT +"/" + Class.GlobalClass.USER, "");
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [
          "id_ruangan"=>$request->id_ruangan,
          "no_register"=>$request->noregister,
          "old_ruangan"=>$request->old_ruangan,
          "user_id"=>Session::get('user_id'),
          "id_client"=>Session::get('id_client'),
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/transfer_pasien_ranap_v2/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;



    }

    public function getruangan_user_login()
    {
        return session::get('kodeunit_login');
    }

    public function updateSEP(Request $request)
    {
        //var data = webservice.POSTData(GLobalVariable.URL_WS + "index.php/api/transaksi_pasien
        ///transfer_pasien_ranap/"+ ID_RUANGAN+"/" + OLD_RUANGAN + "/" + NOREGISTER + "/" + TRANS_DATE + "/" + Class.GlobalClass.ID_CLIENT +"/" + Class.GlobalClass.USER, "");
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();


        $data['poli']=['tujuan'=>$request->dataSEP['response']['poli'],"eksekutif"=>0];
        $data['cob']=['cob'=>0];
        $data['katarak']=['katarak'=>(int)$request->dataSEP['response']['katarak']];



       // $data['tglKejadian']=['lakaLantas'=>$request->dataSEP['response']['tglKejadian']];
        //$data['lokasiKejadian']=['tglKejadian'=>$request->dataSEP['response']['tglKejadian']];


        $data['lokasiLaka']=['kdPropinsi'=>$request->dataSEP['response']['lokasiKejadian']['kdProp'],
        'kdKabupaten'=>$request->dataSEP['response']['lokasiKejadian']['kdKab'],
        'kdKecamatan'=>$request->dataSEP['response']['lokasiKejadian']['kdKec']];

        $data['suplesi']=['suplesi'=>0,'noSepSuplesi'=>0,'lokasiLaka'=>$data['lokasiLaka']];

        $data['penjamin']=['tglKejadian'=>$request->dataSEP['response']['lokasiKejadian']['tglKejadian'],
        "keterangan"=>$request->dataSEP['response']['lokasiKejadian']['ketKejadian'],
        'suplesi'=>$data['suplesi']];


        $sep['t_sep']=['noSep'=>$request->dataSEP['response']['noSep'],
            "klsRawat"=>$request->dataSEP['response']['klsRawat'],
            "noMR"=>$request->dataSEP['response']['peserta']['noMr'],
            "catatan"=>$request->dataSEP['response']['catatan'],
            "diagAwal"=>$request->dataSEP['response']['diagnosa'],
            "poli"=>$data['poli'],
            "cob"=>$data['cob'],
            "katarak"=>$data['katarak'],
            "jaminan"=>array('lakaLantas'=>$request->dataSEP['response']['kdStatusKecelakaan'],"penjamin"=>$data['penjamin']),
            //"dpjpLayan"=>$request->dataSEP['response']['kontrol']['kdDokter'],
            "dpjpLayan"=>$request->dataSEP['response']['dpjp']['kdDPJP'],
            "noTelp"=>"0812374322312",
            "user"=>Session::get('user_id'),
        ];

        $json = [
          "request"=>$sep,
        ];

        // var_dump(json_encode($json,true));
        // exit();
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/updateSEP/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;
    }


    public function update_sep_pasien(Request $request)
    {
        //var data = webservice.POSTData(GLobalVariable.URL_WS + "index.php/api/transaksi_pasien
        ///transfer_pasien_ranap/"+ ID_RUANGAN+"/" + OLD_RUANGAN + "/" + NOREGISTER + "/" + TRANS_DATE + "/" + Class.GlobalClass.ID_CLIENT +"/" + Class.GlobalClass.USER, "");
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json =   $request['data'];
        //   "no_register"=>$request->noregister,
        //   "old_ruangan"=>$request->old_ruangan,
        //   "user_id"=>Session::get('user_id'),
        //   "id_client"=>Session::get('id_client'),



        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/update_sep_pasien/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();

        return $body;

    }

    public function insert_jadwal_operasi_v2(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = $request->all();
        $json['id_client']=Session::get('id_client');

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/insert_jadwal_operasi_v2/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }

    public function get_jadwal_operasi(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "nopeserta"=>$request->nokartu,
            "mode"=>$request->mode,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/getjadwaloperasi_v4/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;

    }

    public function batal_jadwal_operasi(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "noregister"=>$request->noregister,
            "kodebooking"=>$request->kodebooking,
        ];

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/mobil_jkn/deletedjadwaloperasi/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;

    }

}
