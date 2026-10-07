@extends('layout.master')
@section('content')
<banner-component msg=""></banner-component> 
<div class="error-page">
    <h3 class="headline text-info">401</h3>
    <div class="error-content">
      
        <p>
            <!-- Silahkan lanjut ke menu sebelumnya untuk melanjutakn -->
            <h3><i class="fas fa-exclamation-triangle text-info"></i>Akses ditolak</h3>
        </p>
       
    </div>
</div>
@endsection
