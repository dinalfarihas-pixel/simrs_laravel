@extends('layout.master')

@section('content')
<banner-component msg="Rawat Intensif — Pemantauan Berkala (Per Jam)"></banner-component>

<form-pemantauan-icu
    noregister="{{ $noregister ?? '' }}"
    username="{{ Session::get('user_id') ?? '' }}"
></form-pemantauan-icu>

<Toast />
@endsection
