@extends('layout.master')
@section('content')
<banner-component msg="Obat Per DPJP"></banner-component> 
<obatdpjp-component namadokter="Session::get('username')"></obatdpjp-component>
@endsection