<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Carbon\Carbon;

class MasterController extends Controller
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

    public function masterdokter()
    {
        date_default_timezone_set("Asia/Jakarta");  
        $client = new Client();  
         //dd($body);
        $response = $client->get($this->ws_simrs."index.php/api/data_referensi/datadokter/".Session::get('id_client'), 
        [
            
        ]); 
       
        
        $body = $response->getBody()->getContents();
       
        return $body; 
        
    }

   
}
