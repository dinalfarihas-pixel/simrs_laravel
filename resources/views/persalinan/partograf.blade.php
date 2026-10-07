@extends('layout.master')

@section('content')
<banner-component msg="Partograf Kebidanan"></banner-component>

<partograf-compnent
    noregister="{{ $noregister ?? '' }}"
></partograf-compnent>

<Toast />
@endsection
