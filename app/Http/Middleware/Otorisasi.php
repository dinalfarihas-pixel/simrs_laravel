<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Session;
use App\Http\Controllers\LoginController; 
class Otorisasi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        // $controller = app(LoginController::class);
    
        // $data = $controller->get_menu(); 

      
        // $is_allow = false;
        // //$menu = json_decode(Session::get('menu'),true);
        // $menu = json_decode($data,true);
       
        // //  dd($menu['response']);
        // foreach($menu['response'] as $row)
        // { 
        //     foreach($row['menu'] as $menus)
        //     {
        //         $url ="/".$request->route()->uri;
        //         if($url==$menus['url_path'])
        //         { 
        //             $is_allow = true;
        //             break;
        //         }  
        //     } 
        // } 
   
        // //dd($request->route()->uri);
        // if ($is_allow==true) {
        //     return $next($request); 
        // }
        // else
        // {
        //     return redirect('login');
        // } 
        // return redirect('unautorized'); 


        // dd($request->session()->exists('success'));
        if ($request->session()->exists('success')==false) {
            return redirect('login');
        }
        return $next($request);
    }
}
