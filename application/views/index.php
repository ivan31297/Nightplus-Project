<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
<head>
    <meta charset="UTF-8">
    <title>Night Plus</title>
    <link rel="shortcut icon" type="image/png" href="public/recursos/img/ico.ico"/>
    <script src="public/recursos/js/jquery-1.9.1.js" type="text/javascript"></script>

    <script src="public/recursos/jquery-ui/jquery-ui.js"></script>

    <link href="public/recursos/vendors/bootstrap.min.css" rel="stylesheet">
    <script src="public/recursos/vendors/bootstrap.min.js"></script>
    <script type="text/javascript" src="public/recursos/js/angular.min.js"></script>
    <script type="text/javascript" src="public/recursos/js/route.js"></script>

    <script type="text/javascript" src="public/recursos/js/gestionLogin.js"></script>
    <link rel="stylesheet" type="text/css" href="public/recursos/css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,500,700,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <script src="public/recursos/vendors/Chart.min.js"></script>
    <script src="public/recursos/js/custom.min.js"></script>
</head>
<body>
<?php
session_start();
//validacion de sesiones
if (isset($_SESSION['user'])) {//verificamos si existe o no una variable llamada user
    include 'vistas/masterPage.php';
} else {
        include 'vistas/login.php';
}
?>
</body>
</html>