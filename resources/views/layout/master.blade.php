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
    <title>Sistem Informasi Manajemen Rumah Sakit</title>
    @include('layout.style')
</head>

<body class="light-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed sidebar-collapse">
    <div id="loader">
        <div class="spinner"></div>
    </div>

    <div class="wrapper" id="app">
        <global-alert></global-alert>

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-dark navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a class="nav-link"> {{Session::get('nama_rs')}} </a>
                </li>
            </ul>
            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Navbar Search -->
                <li class="nav-item">
                    <div class="navbar-search-block">
                        <form class="form-inline">
                            <div class="input-group input-group-sm">
                                <input class="form-control form-control-navbar" type="search" placeholder="Search"
                                    aria-label="Search">
                                <div class="input-group-append">
                                    <button class="btn btn-navbar" type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li class="nav-item">
                    <!-- <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-danger navbar-badge">15</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="left: inherit; right: 0px;">
                        <span class="dropdown-item dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-users mr-2"></i> 8 friend requests
                            <span class="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-file mr-2"></i> 3 new reports
                            <span class="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li> -->
                <li class="nav-item dropdown">
                    <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        class="nav-link dropdown-toggle">{{Session::get('username')}}
                        @if(Session::get('lokasi_inv')!=0)
                        [{{Session::get('lokasi_inv')}}-{{Session::get('lokasi_caption')}}]
                        @endif

                    </a>
                    <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow"
                        style="left: 0px; right: inherit;">
                        <li class="dropdown-divider"></li>

                        <li class="dropdown-submenu dropdown-hover">
                        <li> <a href="/logout" class="dropdown-item">
                                <i class="fas fa-arrow mr-2"></i> Logout</a></li>
                        <li class="dropdown-divider"></li>
                        <li> <a href="/rubahpassword" class="dropdown-item">
                                <i class="fas fa-arrow mr-2"></i> Ganti Password</a></li>
                </li>
            </ul>
            </li>
            </li>
            </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-1">
            <!-- Brand Logo -->
            <a href="#" class="brand-link">
                <img src="{{Session::get('LINK_LOGO')}}" alt="{{Session::get('nama_rs')}}"
                    class="brand-image img-circle elevation-3" style="opacity: .8">
                <span class="brand-text font-weight-light">Dashboard</span>
            </a>
            <!-- Sidebar -->
            <div class="sidebar">
                @include('layout.sidebar')
            </div>
            <!-- /.sidebar -->
        </aside>

        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <!-- Main content -->
            @yield('content')
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        <footer class="main-footer">
            <div class="float-right d-none d-sm-block">
                @if(config('app.APP_DEBUG')=="1")
                <strong style="color:red">Development </strong> <b>Version</b> 3.2.0
                @endif
                @if(config('app.APP_DEBUG')=="0")
                <strong style="color:red">Production </strong> <b>Version</b> 3.2.2
                @endif
            </div>
            <strong>Copyright  &copy; <a href="#">ws-simrs</a> </strong> All rights reserved.
        </footer>
        <!-- mix('js/app.js') -->
        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->
    <!-- jQuery -->
    <script src="{{asset('js/app.js')}}?v=03ef829effaf32740778f0e79455e44b"></script>
    <!-- <script src="{{asset('js/app.js?=e8af4864a4425e93501187da4b0f11b2')}}"></script> -->
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
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@0.5.7/chartjs-plugin-annotation.min.js">
    </script>


    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script> -->
    <!-- Bootstrap JS and dependencies -->

</body>




</html>
