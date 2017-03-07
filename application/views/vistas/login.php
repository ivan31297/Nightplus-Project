<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        
            <!-- Bootstrap -->
        <link href="public/recursos/vendors/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="public/recursos/vendors/font-awesome.min.css" rel="stylesheet">
        <!-- NProgress -->
        <link href="public/recursos/vendors/nprogress.css" rel="stylesheet">
        <!-- Animate.css -->
        <link href="public/recursos/vendors/animate.min.css" rel="stylesheet">

        <!-- Custom Theme Style -->
        <link href="public/recursos/vendors/custom.min.css" rel="stylesheet">

        <script type="text/javascript" src="public/recursos/js/gestionLogin.js"></script>
    </head>
    <body>
        <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>
      <?php
        if (isset($_SESSION['usuario']) && $_SESSION['usuario']!=null) {
            include 'masterPage.php';
        }else{
      ?>
      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <div>
                  <img width="300" src="public/recursos/img/logo.png">
                </div>
            <form>
              <h1>Iniciar Sesión</h1>
              <div>
                <input id="cedula" type="text" class="form-control" placeholder="Cedula" required="" />
              </div>
              <div>
                <input id="password" type="password" class="form-control" placeholder="Clave" required="" />
              </div>
              <div class="btn-login">
                <a class="btn btn-default submit" id="btnLogin">Entrar</a>
              </div>

              <div class="clearfix msj">
                <label id="msj"></label>
              </div>

              
            </form>
          </section>
        </div>
      </div>
      <?php
      }
      ?>
    </div>
    </body>
</html>
<style type="text/css">
    html, body{
        background-color: rgb(247,247,247) !important;
    }
    .btn-login{
        display: flex;
        align-items:center;
        justify-content:flex-start;
    }
    .btn-login a{
        width: 130px;
    }
    .msj{
      text-align: left;
      margin-top: 2%;
    }
</style>