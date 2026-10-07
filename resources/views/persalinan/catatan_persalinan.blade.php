@extends('layout.master')

@section('content')
<banner-component msg="Catatan Persalinan"></banner-component>

<catatan-persalinan
    noregister="{{ $noregister ?? '' }}"
    username="{{ Session::get('user_id') ?? '' }}"
></catatan-persalinan>

<Toast />
@endsection
