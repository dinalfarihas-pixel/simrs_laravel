<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use LZCompressor\LZString as LZString;

class BpjsApiController extends Controller
{

    protected $ws_inv;
    protected $ws_simrs;

    public function __construct()
    {
        date_default_timezone_set("Asia/Jakarta");

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

    public function get_url_antrol(Request $request)
    {

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/bpjs_dokter/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']=json_decode($res,true);

        return $body;
    }

    public function getdata_poli_bpjs(Request $request)
    {

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/getdata_poli_bpjs/11", [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        $arr = array();
        foreach($body['response'] as $row)
        {
            $sub_sp =" (".$row['nmsubspesialis'].")-".$row['kdsubspesialis'];
            $arr[] = array("nmpoli"=>$row['nmpoli'].$sub_sp,
            "kdpoli"=>$row['kdsubspesialis'],
            "namapoli_display"=>$row['nmpoli']);
        }

        $body['response'] =$arr;
        return $body;
    }

    public function getdata_SEP(Request $request)
    {
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/data_referensi/getdata_SEP/".$request->nosep."/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        // $arr = array();

        // $body['response'] =$arr;
        return $body;
    }


    public function get_data_peserta(Request $request)
    {
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/get_data_peserta/".$request->nik."/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        return $body;
    }

    public function getdata_propinsi_bpjs()
    {
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/getdata_propinsi_bpjs/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        return $body['response']['list'];
    }




    public function getdata_kabupaten_bpjs(Request $request)
    {
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/getdata_kabupaten/".Session::get('id_client')."/".$request->kdProv, [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        return $body['response']['list'];
    }

    public function getdata_kecamatan_bpjs(Request $request)
    {
        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/getdata_kecamatan/".Session::get('id_client')."/".$request->kdKab, [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        $body =json_decode($body,true);

        $x_data = $body['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        $body['response']= json_decode($res,true);

        return $body['response']['list'];
    }

    public function createSEP(Request $request)
    {

        try
        {
            $client = new Client();
            $json =['param'=>$request->all(),"id_client"=>Session::get('id_client'),"user_id"=>Session::get('user_id')];

           // dd(json_encode($json,true));



            $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/createSEP/", [
                'json' => $json,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();

            $body = json_decode($body,true);

            //$x_data = $body['response'];

            // $res=LZString::decompressFromEncodedURIComponent($x_data);

            // $body['response'] = json_decode($res,true);
            // //$body['metadata'] =["code"=>200,"message"=>"Sukses"];
            // return $body;


            $x_data = $body['response'];

            $res=LZString::decompressFromEncodedURIComponent($x_data);

            $body['response'] = json_decode($res,true);
            //$body['metaData']['code']=200;
            //$body['metaData']['message']="Sukess";

            return json_encode($body,true);

        }
        catch(\Exception $e)
        {
            $json['metaData']=['code'=>201, "message"=> $e->getMessage()];
            return response()->json([
                $json
            ]);
        }

    }

    public function decript_dekompresi(Request $request)
    {


        $x_data = $request['response'];

        $res=LZString::decompressFromEncodedURIComponent($x_data);

        //$body['metaData']= ["code"=>200,"message"=>"OK"];
        $body = json_decode($res,true);

        return $body;
    }

    public function syncSEP(Request $request)
    {

        $client = new Client();
        $response = $client->post($this->ws_simrs."index.php/api/transaksi_pasien/syncSEP/".Session::get('id_client'), [
            'json' => $request->all(),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }


    public function get_historis_pelayanan_bpjs(Request $request)
    {

        try{
            date_default_timezone_set("Asia/Jakarta");
            $startdate = $request->startdate;
            $enddate = $request->enddate;

            $startdate = date('Y-m-d', strtotime($startdate));
            $enddate = date('Y-m-d', strtotime($enddate));

            $noka = $request->noka;

            $date_range = $startdate."/".$enddate;

            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/Bpjs_api/get_historis_pelayanan/".$noka."/".Session::get('id_client')."/".$date_range, [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();
            $body =json_decode($body,true);

            $x_data = $body['response'];

            $res=LZString::decompressFromEncodedURIComponent($x_data);

            $body['response']= json_decode($res,true);

            $body['metaData']=[
                "code"=>200,
                "message"=>"Sukses"
            ];


            return $body;

        }catch(\Exception $e){
            $json = ['code'=>201,'message' => $e->getMessage()];
            return response()->json([
                $json
            ]);

        }
    }

    public function hapus_sep(Request $request)
    {

        try{

            $nosep = $request->nosep;

            $client = new Client();
            $response = $client->post($this->ws_simrs."index.php/api/bpjs_api/hapus_sep/".$nosep."/".Session::get('id_client')."/".Session::get('user_id'), [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
                ]
            ]);

            $body = $response->getBody()->getContents();
            $body =json_decode($body,true);

            return $body;

        }catch(\Exception $e){
            $json = ['code'=>201,'message' => $e->getMessage()];
            return response()->json([
                $json
            ]);

        }
    }


}
