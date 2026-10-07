<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;
use Session;

use Illuminate\Http\Request;

class DashboardController extends Controller
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

    public function dashboard_kunjungan()
    {
        return view('dashboard.dashboard2');
    }

    public function datakunjunganpasien(Request $request)
    {

        //$data_js= (response()->json([$request->all()]));
        $test = json_decode($request->getContent(), true);

        $tahun =array();
        $jenisrawat = array();
        foreach($request->selectedYear as $year)
        {
             $tahun[] =$year['value'];
        }

        foreach($request->jenisrawatSelected as $jns)
        {
             $jenisrawat[] =$jns['value'];
        }

        $jsonParams = ["id_client"=>Session::get('id_client'),"tahun"=>$tahun,"jenisrawat"=> $jenisrawat];

        //exit();
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $client = new Client();
        $response = $client->get($url_simrs."/index.php/api/laporan/getdatakunjungan_tahunan", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }





    public function datakunjunganharian(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y-m-d', strtotime($isoDate));

        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $client = new Client();
        $response = $client->get($url_simrs."/index.php/api/laporan/kunjungan_per_poli_bydate/".$fixed."/".$fixed."/".Session::get('id_client'), [

        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function okupasi_bed(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $client = new Client();

        date_default_timezone_set("Asia/Jakarta");
        $startdate = $request->startdate;
        $startdate = date('Y-m-d', strtotime($startdate));

        $enddate = $request->enddate;
        $enddate = date('Y-m-d', strtotime($enddate));

        $json = [

        ];

        $response = $client->get($this->ws_simrs."index.php/api/laporan/okupasi_bed/".Session::get('id_client')."/".$startdate."/".$enddate."/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        return $body;

    }


    public function datakunjnganHarian(Request $request)
    {
        return view('dashboard.datakunjungan');
    }


    public function get_datakunjungan_poli(Request $request)
    {
        try
        {

            $tanggalawal = date('Y-m-d', strtotime($request->tanggalawal));
            $tanggalakhir = date('Y-m-d', strtotime($request->tanggalakhir));
            $json=[
                "mode"=>$request->mode,
                "tanggalawal"=> $tanggalawal,
                "tanggalakhir"=>$tanggalakhir,
                "id_client"=>Session::get('id_client'),
                "dokter"=>$request->dokterSelected['KDDOKTER'] ?? null ,
                "carabayar"=>collect($request->carabayarSelected ?? [])->pluck('KODE')->values()->all(),
            ];

            $url_simrs =  $this->ws_simrs.'index.php/api/laporan/get_datakunjungan_poli'; // Replace this with the API endpoint URL
            $client = new Client();
            $response = $client->post($url_simrs, [
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




}
