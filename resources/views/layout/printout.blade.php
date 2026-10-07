<!DOCTYPE html>
<html lang="en">


<style>
    html {
        font-size: 13px;
    }

</style>

<head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Printout</title>
    @include('layout.style')

</head>

<body>

    <div class="wrapper" id="app"> 
            <!-- Content Header (Page header) -->
            <!-- Main content -->
            @yield('content')
            <!-- /.content -->
      
    </div>



    <script src="{{asset('js/app.js?id=09074bdf5c70cfd5555d65e019c8d9f7')}}"></script>
    <script src="{{asset('template/plugins/jquery/jquery.min.js')}}"></script>
    <!-- Bootstrap -->
    <script src="{{asset('template/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <!-- overlayScrollbars -->
    <script src="{{asset('template/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
    <!-- AdminLTE App -->
    <script src="{{asset('template/dist/js/adminlte.js')}}"></script>

    <!-- PAGE PLUGINS -->
    <!-- jQuery Mapael -->
    <script src="{{asset('template/plugins/jquery-mousewheel/jquery.mousewheel.js')}}"></script>
    <script src="{{asset('template/plugins/raphael/raphael.min.js')}}"></script>
    <script src="{{asset('template/plugins/jquery-mapael/jquery.mapael.min.js')}}"></script>
    <script src="{{asset('template/plugins/jquery-mapael/maps/usa_states.min.js')}}"></script>
    <!-- ChartJS -->
    <script src="https://cdn.jsdelivr.net/npm/vue-numeral-filter/dist/vue-numeral-filter.min.js"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script src="{{asset('template/dist/js/pages/dashboard2.js')}}"></script>

</body>

</html>
