<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login form</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('template/plugins/fontawesome-free/css/all.min.css')}}">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{asset('template/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('template/dist/css/adminlte.min.css')}}">
</head>

<body class="hold-transition login-page">

    <div class="login-box"> 
        @if(session()->has('loginError'))
        <div class="toast bg-info fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header"><strong class="mr-auto">Status login</strong>
                <small>Info</small><button data-dismiss="toast" type="button" class="ml-2 mb-1 close"
                    aria-label="Close"><span aria-hidden="true">×
                    </span></button></div>
            <div class="toast-body">Login gagal</div>
        </div>
        @endif
        <!-- /.login-logo -->
        <div class="card card-outline card-primary">

            <div class="card-header text-center">
                <a href="#" class="h1"><b>SIMRS</b>LOGIN</a>
            </div>

            <div class="card-body">
                <div class="text-center">
                    <img class="profile-user-img img-fluid img-circle" src="https://ws-simrs.net/logo/sehat.png"
                        alt="User profile picture">
                </div>
                <br />

                <p class="login-box-msg">SISTEM INFORMASI MANAJEMEN RUMAH SAKIT</p>

                <form action="dologin" method="POST">

                    @csrf
                    <div class="input-group mb-3">
                        <input class="form-control" name="username" id="username" placeholder="Username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>

                    </div>

                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="password" id="password"
                            placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    <!-- /.col -->
            </div>
            </form>

            <!-- /.social-auth-links -->

        </div>
        <!-- /.card-body -->
    </div>
    <!-- /.card -->
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="{{asset('template/plugins/jquery/jquery.min.js')}}"></script>

    <script src="{{asset('template/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>

    <script src="{{asset('template/dist/js/adminlte.min.js')}}"></script>

</body>

</html>
