<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;



class PersediaanController extends Controller
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

    public function persediaan_master()
    {
        return view('persediaan.total');
    }

    public function pemakaianobat_page()
    {
        return view('persediaan.pemakaianobat');
    }

    public function getdata(Request $request)
    {

        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'mode' => isset($request->mode) ? $request->mode : 6,
            'id_client'=>Session::get('id_client'),
            'lokasi'=>Session::get('lokasi_inv'),
            'kategori'=>$request->kategori,
            'breakdown'=>isset($request->breakdown) ?  $request->breakdown : 1,
        ];
        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }

    public function getdata_kategori()
    {
        $client = new Client();
        $response = $client->get($this->ws_inv."index.php/api/referensi/get_kategori/".Session::get('id_client'),
            [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdata_satuan()
    {
        $client = new Client();
        $response = $client->get($this->ws_inv."index.php/api/barang/datasatuan?CLIENTID=".Session::get('id_client'),
            [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdata_satuan_v2()
    {
        $client = new Client();
        $response = $client->get($this->ws_inv."index.php/api/barang/getsatuan_v2",
            [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }


    public function getdata_grouping()
    {
        $client = new Client();
        $response = $client->get($this->ws_inv."index.php/api/referensi/getGrouping/".Session::get('id_client'),
            [
                'json' => "",
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdetails_barang(Request $request)
    {
        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'mode' => 3,
            'id_client'=>Session::get('id_client'),
            'lokasi'=>Session::get('lokasi_inv'),
            'barcode'=>$request->barcode,
            'breakdown'=>0
        ];
        $response = $client->post($this->ws_inv."index.php/api/barang/get_subdetails_item", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }

    public function update_itembarang(Request $request)
    {

        $grouping_edit="";
        if(isset($request->GROUPING['GROUPING']))
        {
            $grouping_edit=$request->GROUPING['GROUPING'];
        }

        $client = new Client();
        $json = [
            'MODE'=>$request->MODE,
            'NAMA' => $request->NAMA,
            'JENIS' => $request->JENIS,
            'KATEGORI' => $request->KATEGORI,
            'SATUAN' => $request->SATUAN,
            'HARGA_BELI_JASA' => $request->HARGA_BELI_JASA,
            'HARGA_JUAL_JASA' => $request->HARGA_JUAL_JASA,
            'POTONGSTOCK' => $request->POTONGSTOCK,
            'STOCKMINIMUM' => $request->STOCKMINIMUM,
            'KANDUNGAN' => $request->KANDUNGAN,
            'GUNAKAN_STOCK_MIN' => $request->GUNAKAN_STOCK_MIN,
            'GROUPING' => $grouping_edit,
            'CATATAN' => $request->CATATAN,
            'UNTUK_DIJUAL' => $request->UNTUK_DIJUAL,
            'IDCLIENT'=>Session::get('id_client'),
            'BARCODE'=>$request->BARCODE
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/updatedatabarang_v2", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        return $body;
    }

    public function insert_itembarang(Request $request)
    {

        try {
                // Determine if minimum stock threshold should be used
                $GUNAKAN_STOCK_MIN = ($request->stock_min > 0) ? 1 : 0;

                // Handle grouping logic
                $grouping = "";
                if ($request->grouping2 == "") {
                    if (isset($request->data_grouping['GROUPING'])) {
                        $grouping = $request->data_grouping['GROUPING'];
                    }
                } else {
                    $grouping = $request->grouping2;
                }

                // Input validation to prevent errors
                if (empty($request->NAMA)) {
                    return json_encode([
                        'code' => 201,
                        'message' => 'Product name is required'
                    ]);
                }

                if($request->kategori_selected['NAMA_KATEGORI']=="")
                {
                     return json_encode([
                         'code' => 201,
                        'message' => ' NAMA_KATEGORI is required'
                    ]);
                }

                // Create HTTP client with timeout settings
                $client = new Client([
                    'timeout' => 30,
                    'connect_timeout' => 5
                ]);

                $json = [
                    'BARCODE' => "",
                    'MODE' => $request->MODE,
                    'NAMA' => trim($request->NAMA),
                    'JENIS' => $request->jenis['JENIS'] ?? '',
                    'KATEGORI' => $request->kategori_selected['NAMA_KATEGORI'] ?? '',
                    'SATUAN' => $request->satuan_selected['SATUAN'] ?? '',
                    'MEREK' => '',
                    'ID_LOKASI' => (int)Session::get('lokasi_inv'),
                    'HARGABELI' => 0,
                    'HARGAJUAL' => 0,
                    'POTONGSTOCK' => $request->potong_stock['code'] ?? 0,
                    'STOCKMINIMUM' => $request->stock_min,
                    'KANDUNGAN' => $request->KANDUNGAN ?? '',
                    'GUNAKAN_STOCK_MIN' => $GUNAKAN_STOCK_MIN,
                    'GROUPING' => $grouping,
                    'CATATAN' => $request->CATATAN ?? '',
                    'BENTUK_SEDIAAN'=> $request->bentuk_obat['code'] ?? '',
                    'UNTUK_DIJUAL' => $request->untuk_dijual['code'] ?? 0,
                    'IDCLIENT' => (int)Session::get('id_client')
                ];

                $response = $client->post($this->ws_inv . "index.php/api/barang/insertbarang_v2", [
                    'json' => $json,
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => '', // If the API requires an access token
                    ]
                ]);

                $body = $response->getBody()->getContents();


                return $body;

            } catch (RequestException $e) {
                // Handle Guzzle request exceptions (network errors, API errors)

                if ($e->hasResponse()) {
                    $statusCode = $e->getResponse()->getStatusCode();
                    $errorBody = $e->getResponse()->getBody()->getContents();


                    return json_encode([
                        'code' => 200, // Note: This seems inconsistent; typically error codes are 4xx or 5xx
                        'message' => "API error (Code: $statusCode)",
                        'details' => json_decode($errorBody, true)
                    ]);
                }

                return json_encode([
                    'code' => 201, // Note: This seems inconsistent; typically error codes are 4xx or 5xx
                    'status' => 'error',
                    'message' => 'Failed to connect to inventory service. Please try again later.'
                ]);

            } catch (\Exception $e) {
                // Handle general exceptions

                return json_encode([
                    'code' => 201, // Note: This seems inconsistent; typically error codes are 4xx or 5xx
                    'message' => 'An unexpected error occurred while creating the product.',
                    'error' => $e->getMessage()
                ]);
            }
    }

    public function get_data_supplier()
    {
        $client = new Client();
        //$url=Session::get('inv');
        $response = $client->get($this->ws_inv."/index.php/api/data_referensi/data_referensi/".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();
        return $body;
    }

    public function get_jenis()
    {
        $client = new Client();
        //$url=Session::get('inv');
        $response = $client->get($this->ws_inv."/index.php/api/barang/datajenis?CLIENTID=".Session::get('id_client'), [
            'json' => "",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;

    }

    public function update_sub_item_barangstock(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $client = new Client();
        $TGL_EXPIRED = $request->TGL_EXPIRED;
        $TGL_EXPIRED = date('Y-m-d', strtotime($TGL_EXPIRED));
        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'IDCLIENT'=>Session::get('id_client'),
            'ID_LOKASI'=>Session::get('lokasi_inv'),
            'ID'=>$request->ID,
            'BARCODE'=>$request->BARCODE,
            'SUB_BARCODE'=>$request->SUB_BARCODE,
            'HARGAJUAL'=>$request->HARGAJUAL,
            'KATEGORI'=>$request->HARGAJUAL,
            'HARGA'=>$request->HARGA,
            'QTY'=>$request->QTY,
            'BATCH_NUMBER'=>$request->BATCH_NUMBER,
            'TGL_EXPIRED'=>$TGL_EXPIRED,
            'USE_EXP'=>1
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/update_sub_item_barangstock", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
        $body = $response->getBody()->getContents();
        return $body;
    }

    public function getdata_obat_baseparam(Request $request)
    {

        if(!isset($request->breakdown))
        {
            $request->breakdown = 1;
        }
        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'mode' =>(int)$request->mode,
            'id_client'=>Session::get('id_client'),
            'lokasi'=>isset($request->lokasiSelected["ID"]) ? $request->lokasiSelected["ID"] : Session::get('id_lokasi'),
            'nama'=>$request->itembarang,
            'barcode'=>$request->barcode,
            'kategori'=>$request->kategori,
            'breakdown'=>$request->breakdown
        ];
    //  var_dump(json_encode($jsonParams,true));
    // exit();
        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdata_obat_baseparam_v1(Request $request) //to transfer
    {

        if(!isset($request->breakdown))
        {
            $request->breakdown = 1;
        }
        $client = new Client();

        if(!isset($request->lokasi_selected))
        {
            $request->lokasi_selected = "0";
        }
        //$url=Session::get('inv');
        $jsonParams = [
            'mode' =>(int)$request->mode,
            'id_client'=>Session::get('id_client'),
            'lokasi'=>$request->lokasi_selected ==0 ? Session::get('lokasi_inv') : $request->lokasi_selected,
            'nama'=>$request->itembarang,
            'barcode'=>$request->barcode,
            'kategori'=>$request->kategori,
            'breakdown'=>$request->breakdown
        ];
        // var_dump(json_encode($jsonParams,true));
        // exit();
        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function additembarang_frommaster(Request $request)
    {
        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'id_client'=>Session::get('id_client'),
            'kategori'=>$request->kategori,
        ];
        // var_dump(json_encode($jsonParams,true));
        // exit();
        $response = $client->post($this->ws_inv."index.php/api/barang/additembarang_frommaster", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function add_itembarang_to_mylocation(Request $request)
    {
        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'id_client'=>Session::get('id_client'),
            'lokasi'=>Session::get('id_lokasi'),
            'barcode'=>$request->barcode,
        ];
        // var_dump(json_encode($jsonParams,true));
        // exit();
        $response = $client->post($this->ws_inv."index.php/api/barang/add_itembarang_to_mylocation", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdatabarang_foropname(Request $request)
    {

        $client = new Client();
        //$url=Session::get('inv');
        $jsonParams = [
            'mode' =>(int)$request->mode,
            'id_client'=>Session::get('id_client'),
            'lokasi'=>Session::get('id_lokasi'),
            'nama'=>$request->itembarang,
            'barcode'=>$request->barcode,
            'kategori'=>"'".$request->kategori."'",

        ];
        // var_dump(json_encode($jsonParams,true));
        // exit();
        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_foropname", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function arsipkan_item_barang(Request $request)
    {
        $client = new Client();
        //$url=Session::get('inv');
        // $jsonParams = [
        //     'mode' => $request->mode,
        //     'id_client'=>Session::get('id_client'),
        //     'id'=>$request->data['ID'],
        //     'BARCODE'=>$request->data['BARCODE'],
        //     'SUB_BARCODE'=>$request->data['SUB_BARCODE'],
        //     'id_lokasi'=>$request->lokasiSelected['ID'],
        //     'USER'=>Session::get('user_id'),
        // ];

        $jsonParams = [
            'mode' =>$request->mode,
            'id_client'=>Session::get('id_client'),
            'id'=>$request->data['ID'],
            'BARCODE'=>$request->data['BARCODE'],
            'SUB_BARCODE'=>$request->data['SUB_BARCODE'],
            'id_lokasi'=>$request->data['ID_LOKASI'],
            'USER'=>Session::get('user_id'),
        ];

       // return $jsonParams;

        $response = $client->post($this->ws_inv."index.php/api/barang/arsipkan_item_barang", [
            'json' => $jsonParams,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdatatahun()
    {
        $url_simrs = 'https://ws-simrs.net/ws_sim_v2'; // Replace this with the API endpoint URL
        $client = new Client();
        $response = $client->get($this->ws_simrs."index.php/api/laporan/gettahunlaporan/".Session::get('id_client'), [
            'json' => [],
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function laporan_persediaan_barang()
    {

        $client = new Client();
        $response = $client->get($this->ws_simrs."index.php/api/laporan/gettahunlaporan/".Session::get('id_client'), [
            'json' => [],
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function laporan_persediaan_transaksi()
    {
        return view('persediaan.transaksi');
    }


    public function laporan_persediaan_transaksi_formatdua()
    {
        return view('persediaan.laporanpersediaanformardua');
    }



    public function laporan_penerimaan()
    {
        return view('persediaan.penerimaan');
    }

    public function data_laporan_persediaan_transaksi(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->valuedate;
        $fixed = date('Ym', strtotime($isoDate));

        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "lokasi"=>$request->lokasiSelected['id'],
            "tahun_bulan"=>$fixed,
            "kategori"=>$request->kategori_selected['name']
        ];

        // var_dump(json_encode($json,true));
        // exit();

        $response = $client->post($this->ws_inv."index.php/api/barang/laporan_persediaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);




        $body = $response->getBody()->getContents();
        //dd($body);
        return $body;
    }

    public function data_laporan_persediaan_format_opname(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->valuedate;
        //$fixed = date('Ym', strtotime($isoDate));

        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "lokasi"=>$request->lokasiSelected,
            "tahun_bulan"=>$fixed,
            "kategori"=>$request->kategori_selected
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/laporan_persediaan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();
        //dd($body);
        return $body;
    }

    public function datalaporan_penerimaan(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        if($request->mode==1)
        {
            $fixed = date('Ym', strtotime($isoDate));
            $client = new Client();
            $json = [
                "id_client"=>Session::get('id_client'),
                "tahun_bulan"=>$fixed,
                "mode"=>$request->mode,
            ];
        }
        if($request->mode==2)
        {
            $fixed = date('Y', strtotime($isoDate));
            $client = new Client();
            $json = [
                "id_client"=>Session::get('id_client'),
                "tahun_bulan"=>$fixed,
                "bulan"=>$fixed,
                "mode"=>$request->mode,
            ];
        }

        $response = $client->post($this->ws_inv."index.php/api/penerimaan/penerimaan_laporanv2", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();
        //dd($body);
        return $body;
    }

    public function datalaporan_penerimaan_rekap(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $lokasi="";


        foreach($request->lokasi_selected as $row)
        {
            $lokasi =$lokasi.$row['ID'].",";
        }

        $length = strlen($lokasi);
        $data_lokasi = substr($lokasi,0, $length-1); //  menghapus koma

        $isoDate = $request->startdate;
        $fixed = date('Y', strtotime($isoDate));
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "tahun_bulan"=>$fixed,
            "bulan"=>$request->bulan_selected['code'],
            "mode"=>$request->mode,
            "lokasi"=>$data_lokasi,
            "supplier"=>$request->supplier,
            "ID_PENERIMAAN"=>$request->ID_PENERIMAAN,
        ];

        $response = $client->post($this->ws_inv."index.php/api/penerimaan/penerimaan_laporanv2", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();
        //dd($body);
        return $body;
    }


    public function getlokasi()
    {
        date_default_timezone_set("Asia/Jakarta");


        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [

        ];
        //.
         //dd($body);
        $response = $client->get($this->ws_inv."index.php/api/data_referensi/get_list_stock_lokasi/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdatapemakaianobat(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y', strtotime($isoDate));
        $lokasi = $request->lokasi['ID'];
        $kategori = $request->kategori_barang['name'];
        $filter_qty =  $request->filter_qty['code'];
        if($request->limitation=="")
        {
            $limitation = 0;
        }
        else
        {
            $limitation =$request->limitation;
        }

        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL

        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "kategori"=>$kategori,
            "mode"=>7,
            "tahun"=>$fixed,
            "lokasi" =>$lokasi,//Session::get('lokasi_inv'),
            "breakdown"=>"2",
            "filter_qty"=>$filter_qty,
            "limit"=>$limitation,
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/laporan_penggunaan_barangtahunan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function get_masterbarang(Request $request)
    {

        $lokasi = $request->lokasi['ID'];
        //$kategori = $request->kategori_barang['name'];
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "kategori"=>"",
            "mode"=>8,
            "lokasi" =>$lokasi,// Session::get('lokasi_inv'),
            "breakdown"=>"2",
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;

    }
    public function get_masterbarang_untukperencanaan(Request $request)
    {

        $lokasi = $request->lokasi['ID'];
        //$kategori = $request->kategori_barang['name'];
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "kategori"=>"",
            "mode"=>9,
            "lokasi" =>$lokasi,// Session::get('lokasi_inv'),
            "breakdown"=>"2",
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/getdatabarang_v31", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;

    }

    public function getlist_permintaan_baselokasi(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $startdate = $request->startdate;
        $enddate = $request->enddate;
        $startdate = date('Y-m-d', strtotime($startdate));
        $enddate = date('Y-m-d', strtotime($enddate));

        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL

        $client = new Client();

        $param =$startdate."/".$enddate."/".Session::get('id_client')."/".Session::get('lokasi_inv');
        $response = $client->get($this->ws_inv."index.php/api/barang/get_data_permintaan_barang_baselocation/".$param, [
            'json' =>"",
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;
    }

    public function save_permintaan(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->TANGGAL;
        $fixed = date('Y-m-d H:i:s', strtotime($isoDate));
        //$url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "ID_CLIENT"=>Session::get('id_client'),
            "CATATAN"=>$request->CATATAN,
            "ID_LOKASI"=>Session::get('lokasi_inv'), //$request->LOKASI,
            "TANGGAL"=>$fixed,
            "TUJUAN" =>$request->TUJUAN, //Session::get('lokasi_inv'),
            "USERNAME"=>Session::get('user_id'),
            "ItemPermintaan"=>$request->ItemPermintaan
        ];

        if(Session::get('lokasi_inv')=="")
        {
            $json['metadata']=['code'=>201,"message"=>"Lokasi asal pemintaan belum di tentukan, silahkan hubungin admin"];
            return json_encode($json,true);
            exit();
        }

        $response = $client->post($this->ws_inv."index.php/api/barang/save_permintaan_obatv2/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function save_permintaan_obatv3(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->TANGGAL;
        $fixed = date('Y-m-d H:i:s', strtotime($isoDate));
        //$url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "ID_CLIENT"=>Session::get('id_client'),
            "CATATAN"=>$request->CATATAN,
            "ID_LOKASI"=>Session::get('lokasi_inv'), //$request->LOKASI,
            "TANGGAL"=>$fixed,
            "TUJUAN" =>$request->TUJUAN, //Session::get('lokasi_inv'),
            "USERNAME"=>Session::get('user_id'),
            "ItemPermintaan"=>$request->ItemPermintaan
        ];


        if(Session::get('lokasi_inv')=="")
        {
            $json['metadata']=['code'=>201,"message"=>"Lokasi asal pemintaan belum di tentukan, silahkan hubungin admin"];
            return json_encode($json,true);
            exit();
        }

        // var_dump(json_encode($json,true));
        // exit();

        $response = $client->post($this->ws_inv."index.php/api/barang/save_permintaan_obatv3/".Session::get('id_client'), [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function get_kebutuhan_perminggu(Request $request)
    {

        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->TANGGAL;
        $fixed = date('Y-m-d H:i:s', strtotime($isoDate));
        $client = new Client();
        $json = [
            "ID_CLIENT"=>Session::get('id_client'),
            "BARCODE"=>$request->BARCODE,
            "ID_LOKASI"=>$request->id_lokasi,  // asal permintaan
            "USERNAME"=>Session::get('user_id'),
        ];

        if(Session::get('lokasi_inv')=="")
        {
            $json['metadata']=['code'=>201,"message"=>"Lokasi asal pemintaan belum di tentukan, silahkan hubungin admin"];
            return json_encode($json,true);
            exit();
        }

        $response = $client->post($this->ws_inv."index.php/api/barang/get_kebutuhan_perminggu", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function laporan_distribusi_obat(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $isoDate = $request->startdate;
        $fixed = date('Y', strtotime($isoDate));
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "kategori"=>"OBAT-OBATAN",
            "mode"=>6,
            "tahun"=>$fixed,
            "lokasi" => 19,
            "breakdown"=>"2",
        ];
         //dd($body);
        $response = $client->post($this->ws_inv."index.php/api/barang/laporan_penggunaan_barangtahunan", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function distribusi_data(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $isoDate = $request->startdate;
        $fixed = date('Ym', strtotime($isoDate));

        //$url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json = [
            "id_client"=>Session::get('id_client'),
            "tahun_bulan"=>$fixed,
            "lokasi" => $request->lokasi['ID'],
        ];
         //dd($body);
        $response = $client->post($this->ws_inv."index.php/api/barang/laporantransfer_detail", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;

    }

    public function getdataobat_dpjp(Request $request)
    {

        $mode = $request->mode;
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();

        $json = [
            "id_client"=>Session::get('id_client'),
            "mode"=>$mode,
            "id_dokter"=>Session::get('kodedokter'),
            "lokasi" =>Session::get('lokasi_inv'),
        ];
        $response = $client->post($this->ws_inv."index.php/api/barang/getdataobat_berdasarkan_dpjp", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getdata_detailbarang_permintaan(Request $request)
    {
        $no_permintaan =$request->no_permintaan;
        $url_simrs = 'https://ws-simrs.net/ws_posindo_v2.1'; // Replace this with the API endpoint URL
        $client = new Client();
        $json="";
        $param =$no_permintaan."/".Session::get('id_client');
        $response = $client->post($this->ws_inv."index.php/api/barang/get_data_permintaan_barang_detail_v2/".$param, [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }


    public function rekap_transfer_bulanan(Request $request)
    {
        $tahun =$request->startdate;
        $lokasi =$request->lokasi;
        $tahun = date('Y', strtotime($tahun));
        $client = new Client();

        $json = [
            "mode"=>1,
            "id_client"=>Session::get('id_client'),
            "tahun"=>$tahun,
            "kategori"=>$request->kategoriSelected['name'],
            "asal" =>Session::get('lokasi_inv'),   //asal
        ];
        $response = $client->post($this->ws_inv."index.php/api/barang/laporanrekaptrans/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function getriwayat_card_stock(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $startdate = $request->startdate;
        $enddate = $request->enddate;

        $startdate = date('Y-m-d', strtotime($startdate));
        $enddate = date('Y-m-d', strtotime($enddate));

        $client = new Client();

        $json = [
            "DATE_MIN"=>$startdate,
            "DATE_MAX"=>$enddate,
            "IDCLIENT"=>(int)Session::get('id_client'),
            "BARCODE" =>$request->barcode,
            "LOKASI"=>(int)$request->lokasi,
        ];
        // var_dump(json_encode($json,true));
        // exit();

        $response = $client->post($this->ws_inv."index.php/api/barang/get_data_kartustock_v2/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function save_penerimaan(Request $request)
    {

        $data = json_decode($request->input('data'),true);

        $tgl_penerimaan = date('Y-m-d H:i:s', strtotime($data['tgl_penerimaan']));
        $tgl_jatuh_tempo = date('Y-m-d', strtotime($data['tgl_jatuh_tempo']));

        if($data['supplier_selected']==null)
        {
            $metadata=["code"=>201,"message"=>"Suplier belum dipilh"];
            return $metadata;
        }

        $res = $this->global_upload($request);

        if($res['code']==201)
        {
            return $res;
        }

        $details = [];
        $x = 1;
        foreach ($data['item_selected'] as $item) {
            $details[] = [
                "Barcode" => $item['BARCODE'],
                "ID_BARANG" => $item['ID_BARANG'],
                "QTY"=> $item['QTY'],
                "HargaPokok"=> $item['HARGA'],
                "HargaJual"=> $item['HARGAJUAL'],
                "Total"=> $item['TOTALAMOUNT'],
                "ITEMSEQNO"=>$x,
                "bacth_number"=>$item['BATCH'],
                "tgl_exp"=> date('Y-m-d', strtotime($item['EXP'])),
            ];
            $x++;
        }

        $header['header']=[
            "UserID"=>Session::get('user_id'),
            "ClientID"=>(int)Session::get('id_client'),
            "SupplierID"=>$data['supplier_selected']['IDSUPLIER'],
            "PaymentID"=>25,
            "Pajak"=>0,
            "TanggalPenerimaan"=>$tgl_penerimaan,
            "tgl_faktur"=>date('Y-m-d', strtotime($data['tgl_faktur'])),
            "JATUH_TEMPO"=>$tgl_jatuh_tempo,
            "SUB_TOTAL"=>$data['totalamount'],
            "Grand_Total"=>$data['totalamount'],
            "NO_REFF"=>$data['no_faktur'],
            "ID_LOKASI"=>Session::get('lokasi_inv'),
            "LAMPIRAN"=>$res['filename'],
            "details"=>$details
        ];
        $client = new Client();
        $response = $client->post($this->ws_inv."index.php/api/penerimaan/save_penerimaanv2/", [
            'json' => $header,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        $temp = json_decode($body,true);

        return json_encode($temp['metadata'],true);


    }

    public function global_upload(Request $request)
    {
        try{

            $data = json_decode($request->input('data'),true);

            $res =$this->validations($request);


            if($res['code']==201)
            {
                return $res;
                exit();
            }

            $file= $request->file('file_attch');

            $timestamp = now()->timestamp; // Get the current timestamp
            $hashCode = Str::random(10). $timestamp; // Concatenate a random string with the timestamp
            $hashCode = hash('sha256', $hashCode); // Generate a hash code using SHA256 algorithm

            $extension = $file->extension();

            $file_name =$hashCode.".".$extension;

            $currentYear = date('Y', strtotime($data['tgl_penerimaan']));

            $file->move(public_path('storage/penerimaan/'.$currentYear."/".Session::get('id_client')), $file_name);

            $json = ["message"=>"Suksess",  "code"=>200,"filename"=>$file_name];
            return $json;

        }catch(\Exception $e){
            $json = ['code'=>201,'message' => $e->getMessage(),'filename'=>"Lampiran Faktur"];
            //return json_encode($json,true);
        }

    }
    public function validations(Request $request)
    {
        $data = json_decode($request->input('data'),true);


        if(!$request->hasFile("file_attch"))
        {

            $json = ["message"=>"Tidak terdapat lampiran file","code"=>201];
             return $json;
             exit();
        }

        $fileSize = $request->file('file_attch')->getSize();

        $fileSize = $fileSize/1000;

        if($fileSize>700)
        {
            $json = ["message"=>"Gagal upload, Maksimal ukuran file 700 kb",
            "code"=>201];
            return $json;
            exit();
        }

        $json = ["message"=>"Success validation", "code"=>200];
        return $json;
    }

    public function simpan_stock_opaname(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $startdate = $request->startdate;

        $tgl_penerimaan = date('Y-m-d H:i:s', strtotime($request->startdate));
        $bulanthn = date('Y-m-d', strtotime($request->bulanthn));

        $client = new Client();

        $json = [
            "BARCODE"=>$request->BARCODE,
            "TANGGAL_OPNAME"=>date("Y-m-d H:i:s"),
            "BULAN_TAHUN"=>$bulanthn,
            "ID_CLIENT"=>(int)Session::get('id_client'),
            "ID_LOKASI"=>(int)Session::get('id_lokasi'),
            "USER_ID"=>Session::get('user_id'),
            "details"=>$request->details
        ];

        $response = $client->post($this->ws_inv."index.php/api/opname/saveHeaderOpnamev3/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);



        $body = $response->getBody()->getContents();

        return $body;
    }

    public function laporan_stock_opname(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $bulanthn = date('m-Y', strtotime($request->startdate));

        $client = new Client();

        $json = [
            "kategori"=>$request->kategoriSelected,
            "bulan_tahun"=>$bulanthn,
            "id_client"=>(int)Session::get('id_client'),
            "id_lokasi"=>isset($request->lokasiSelected['ID']) ? (int)$request->lokasiSelected['ID'] : Session::get('lokasi_inv'),
            "USER_ID"=>Session::get('user_id'),
        ];

        $response = $client->post($this->ws_inv."index.php/api/opname/laporan_stock_opname/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function rekap_stock_in_out(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $bulanthn = date('Y-m-d', strtotime($request->bulanthn));

        $client = new Client();

        $json = [
            "kategori"=>$request->kategoriSelected,
            "tanggal"=>$bulanthn,
            "id_client"=>(int)Session::get('id_client'),
            "id_lokasi"=>isset($request->lokasiSelected['ID']) ? (int)$request->lokasiSelected['ID'] : Session::get('lokasi_inv'),
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/rekap_stock_in_out", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }

    public function finishing_opname(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $bulanthn = date('Y-m', strtotime($request->startdate));

        $client = new Client();

        $json = [
            'data'=>$request->data,
            "id_client"=>(int)Session::get('id_client'),
            "id_lokasi"=>$request->lokasiSelected['ID'],
            "bulanthn"=>$bulanthn,
            "kategori"=>$request->kategoriSelected,
            "USER_ID"=>Session::get('user_id'),
        ];

        $response = $client->post($this->ws_inv."index.php/api/opname/finishing_opname/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);


        $body = $response->getBody()->getContents();

        return $body;
    }

    public function hapus_permintaan(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");

        $bulanthn = date('Y-m', strtotime($request->startdate));

        $client = new Client();

        $json = [
            "id_client"=>(int)Session::get('id_client'),
            "no_permintaan"=>$request->no_permintaan,
            "user_id"=>Session::get('user_id'),
        ];

        $response = $client->post($this->ws_inv."index.php/api/barang/hapus_permintaan/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }


    public function batalkan_penerimaan(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $client = new Client();

        $json = [
            "id_client"=>(int)Session::get('id_client'),
            "id_penerimaan"=>$request->ID_PENERIMAAN,
            'id_lokasi'=>Session::get('lokasi_inv'),
            "user_id"=>Session::get('user_id'),
        ];

        $response = $client->post($this->ws_inv."index.php/api/penerimaan/batalkan_penerimaan/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);

        $body = $response->getBody()->getContents();

        return $body;
    }


    public function updateItemTindakan(Request $request)
    {
        date_default_timezone_set("Asia/Jakarta");
        $client = new Client();

        $json = [
            "id_client"=>(int)Session::get('id_client'),
            "noregister"=>$request->noregister,
            "no_receipt"=>$request->RECEIPT_NO,
            "remark_item"=>$request->REMARK_ITEM,
        ];
        $response = $client->post($this->ws_inv."index.php/api/sales/updateItemTindakan/", [
            'json' => $json,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => '', // If the API requires an access token
            ]
        ]);
    }

    public function get_data_pabrikan_persediaan(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "sub_barcode" => $request->barcode,
            ];

            // Validate required data
            if (empty($json['id_client']) || empty($json['sub_barcode'])) {
                throw new Exception('Missing required parameters: id_client or sub_barcode');
            }

            $response = $client->post($this->ws_inv."index.php/api/barang/get_data_pabrikan_persediaan/", [
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

    public function get_data_list_transfer_v3(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");


            $startdate = date('Y-m-d', strtotime($request->startdate));
            $enddate = date('Y-m-d', strtotime($request->enddate));

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                'lokasi'=>Session::get('lokasi_inv'),
                "date_min"=>$startdate,
                "date_max"=>$enddate,
                "mode"=>1
            ];

            $response = $client->post($this->ws_inv."index.php/api/barang/get_data_list_transfer_v3/", [
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

    public function get_data_permintaan_barang_detail_v3(Request $request)
    {
        try {

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "no_permintaan"=>$request->noPermintaan,
                "mode"=>2
            ];
            $response = $client->post($this->ws_inv."index.php/api/barang/get_data_permintaan_barang_detail_v3/", [
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

    public function proses_transferv2(Request $request)
    {
        try {

            $client = new Client();

            //$json = $request->data['details'];
            $json['header'] =$request->data['header'];
            $json['header']['DIPROSES_OLEH']= Session::get('user_id');
            $json['details'] = $request->data['details'];

            $IDtujuan = $json['header']["ID_LOKASI"];
            $IDasal =$json['header']["ID_TUJUAN"];

            $tujuan= $json['header']["LOKASI"];
            $lokasi= $json['header']["TUJUAN"];

            $json['header']["TUJUAN"]=$tujuan;
            $json['header']["LOKASI"]=$lokasi;

            $json['header']["ID_LOKASI"]=$IDasal;

            $json['header']["ID_TUJUAN"]=$IDtujuan;


            $response = $client->post($this->ws_inv."index.php/api/barang/proses_transfer_v3/".(int)Session::get('id_client'), [
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

    public function getlaporan_tf_v3(Request $request)
    {
        try {

            $client = new Client();

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "asal"=>Session::get('lokasi_inv'),
                "mode"=>$request->mode,
                "lokasi"=>$request->lokasi, //TUJUAN TRANSFER
                "barcode"=>$request->barcode,
            ];

            $response = $client->post($this->ws_inv."index.php/api/barang/getlaporan_tf_v3", [
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

    public function get_data_pemakaian_obat(Request $request)
    {
        try {

            $client = new Client();

            $startdate = $request->startdate;
            $startdate = date('Y-m-d', strtotime($startdate));

            $enddate = $request->enddate;
            $enddate = date('Y-m-d', strtotime($enddate));

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "tanggal_awal"=>$startdate,
                "tanggal_akhir"=>$enddate,
                "kategori"=>$request->kategori,
                "lokasi"=>$request->lokasi
            ];

            $response = $client->post($this->ws_inv."index.php/api/laporan/get_data_pemakaian_obat", [
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

    public function get_data_pemakaian_obat_summary(Request $request)
    {
        try {

            $client = new Client();

            $startdate = $request->tanggal_awal;
            $startdate = date('Y-m-d', strtotime($startdate));

            $enddate = $request->tanggal_akhir;
            $enddate = date('Y-m-d', strtotime($enddate));

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "tanggal_awal"=>$startdate,
                "tanggal_akhir"=>$enddate,
                "kategori"=>$request->kategori,
            ];

            $response = $client->post($this->ws_inv."index.php/api/laporan/get_data_pemakaian_obat_summary", [
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

    public function get_data_pasien_penerima_obat(Request $request)
    {
        try {

            $client = new Client();

            $startdate = $request->startdate;
            $startdate = date('Y-m-d', strtotime($startdate));

            $enddate = $request->enddate;
            $enddate = date('Y-m-d', strtotime($enddate));

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "tanggal_awal"=>$startdate,
                "tanggal_akhir"=>$enddate,
                "kategori"=>$request->kategori,
                "lokasi"=>$request->lokasi,
                "barcode"=>$request->barcode,
            ];
            //var_dump($json);

            $response = $client->post($this->ws_inv."index.php/api/laporan/get_data_pasien_penerima_obat", [
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

    public function getlist_penunjang_order_jasa_penunjang(Request $request)
    {
        try {

            $client = new Client();

            $startdate = $request->startdate;
            $startdate = date('Y-m-d', strtotime($startdate));

            $json = [
                "id_client" => (int)Session::get('id_client'),
                "tanggal"=>$startdate,
                "kd_unit"=>Session::get('kodeunit_login'),
                "mode"=>$request->mode,
                "jenis_penunjang"=>5,
                "shif"=>$request->shift,
            ];
            //var_dump($json);

            $response = $client->post($this->ws_inv."index.php/api/Data_referensi/getlist_penunjang_order_jasa_penunjang", [
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

}
