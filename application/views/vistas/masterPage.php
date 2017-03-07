<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script type="text/javascript">
      $( document ).ready(function() {
          var hoy=new Date();
          var mes=hoy.getMonth()+1;
          var anio=hoy.getFullYear();
          var fecha='1-'+mes+'-'+anio;
          $.ajax({
            type: 'post',
            url: "Ctl_Ventas/resumenVentasBodega",
            data: { bodega_principal: 3,
                fecha_inicio: fecha},
            success: function (response) {
                var bodegas = $.parseJSON(response);
                var datos="";
                for (var i = 0; i < bodegas.length; i++) {
                  datos+='<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">';
                  datos+='<span class="count_top"><i class="fa fa-building"></i> '+bodegas[i].nombre+'</span>';
                  datos+='<div class="count">$'+bodegas[i].vendido+'</div>';
                  datos+='<span class="count_bottom"><i class="fa fa-clock-o"></i> '+fecha+'</span>';
                  datos+='</div>'
                };
                $("#tile_count").html(datos);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });

        //gráfica
        $.ajax({
            type: 'post',
            url: "Ctl_Ventas/resumenVentasBodegaMes",
            data: { bodega_principal: 3,
                anio: anio},
            success: function (response) {
              var respuesta=$.parseJSON(response);
              var labels=respuesta.labels;
              var datos=respuesta.datos;
              var totales=respuesta.totales;
              var dataSets=Array();
              for (var i = 0; i < datos.length; i++) {

                var r=getRandomColor();
                var g=getRandomColor();
                var b=getRandomColor();
                var datosMes={
                  label: datos[i].bodega,
                  backgroundColor: "rgba("+r+", "+g+", "+b+", 0.31)",
                  borderColor: "rgba("+r+", "+g+", "+b+", 0.7)",
                  pointBorderColor: "rgba("+r+", "+g+", "+b+", 0.7)",
                  pointBackgroundColor: "rgba("+r+", "+g+", "+b+", 0.7)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba("+r+", "+g+", "+b+",1)",
                  pointBorderWidth: 1,
                  data: datos[i].datos
                };
                dataSets.push(datosMes);
              }
              var ctx = document.getElementById("canvas_dahs");
              var lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: dataSets
                }
              });
              var htmlBodegas='';
              for (var i = 0; i < totales.length; i++) {
                htmlBodegas+='<div style="padding: 5px; border-bottom: 1px solid #ccc;">';
                htmlBodegas+='<p> <i class="fa fa-building"></i> '+totales[i].nombre+'</p>';
                htmlBodegas+='<div class=""><strong> Total vendido: $ '+totales[i].vendido+'</strong></div></div>';
              };
              $('#bodegas').html(htmlBodegas);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
      });
      
      function getRandomColor() {
          color = Math.floor(Math.random() * 255);
          return color;
      }
    </script>
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <?php
          include 'templates/header.php';
          include 'templates/menu.php';
        ?>
        <!-- page content -->
        <div class="right_col" role="main" ng-view>
          <div id="tile_count" class="row tile_count">
            
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="dashboard_graph">

                <div class="row x_title">
                  <div class="col-md-6">
                    <h3>Ventas mensuales <small>por bodega</small></h3>
                  </div>
                </div>

                <div class="col-md-9 col-sm-9 col-xs-9">
                  <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div>
                  <div>
                    <canvas id="canvas_dahs"></canvas>
                  </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-12 bg-white">
                  <div class="x_title">
                    <h2>Bodegas</h2>
                    <div class="clearfix"></div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-6" id="bodegas">

                  </div>

                </div>
                <div class="clearfix"></div>
              </div>
            </div>

          </div>
        </div>

        <?php
          include 'templates/footer.php';
        ?>
      </div>
    </div>
  </body>
</html>
