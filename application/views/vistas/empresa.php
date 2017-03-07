 <script type="text/javascript" src="public/recursos/js/gestionEmpresa.js"></script>

    
    <div id = "main-company" class = "main-content">
        <h2 class="main-title">Reportes</h2>
        <div class="content-forms">
            <div class="section-item-form-report">
                <form method="post" action="ctl_pdf/pdfAuctionUser" target="_blank">
                    <div>
                        <input class="btn-item" type="submit" id="btnPdfAuctionUser" value="Subastas Usuario"/>
                    </div>
                </form>
                <form method="post" action="ctl_pdf/pdfGetAuction" target="_blank">
                    <div>
                        <input class="btn-item" type="submit" id="btnPdfGetAuction" value="Informe Subastas"/>
                    </div>
                </form>
                <form method="post" action="ctl_pdf/pdfGetAuctionOferts" target="_blank">
                    <div>
                        <input class="btn-item" type="submit" id="btnPdfGetAuctionOferts" value="Subastas Ofertas"/>
                    </div>
                </form>
            </div>
        </div>
        <h2 class = "main-title">Gestion Subastas</h2>
        <div class = "content-forms">
            <div class = "section-item-form">
                <form>
                    <select id="selCategoria" onchange="cargarProductos();">
                        <option value="-1">Elija una categoria</option>
                    </select>
                    <select id="SelProductos">
                        <option value="-1">Elija un producto</option>
                    </select>
                    <input type="number" id="txtCantidad" name="cantidad" placeholder = "Cantidad"/>
                    <input type="txt" readonly="readonly" id="txtFecha" name="fecha" placeholder = "Fecha limite"/>
                    <p class = "alert"  id="alerta-subasta"></p>
                    <input class = "btn-item" type="button" id="btnCrear" value="Crear Subasta"/>
                </form>            
            </div>
        </div>
        
    
        <!-- zona de susbatas-->
    <h2 class = "main-title">Listas</h2>
    <section id = "info-bottom" class = "bottom-table">
            <div class = "column-2">
                <h4 class = "title-colum-2">Subastas</h4>
                <form>
                    <div id="div-subasta"></div>
                </form>
            </div>
        <!-- de ofertas -->
            <div class = "column-2">
                <h4 class = "title-colum-2">Ofertas</h4>
                <form>
                    <p id="msm_oferta"></p>
                    <div id="div-ofertas">
                    </div>
                </form>
            </div>
    </div>
    <div class='menu_subasta main-popup'  id="menuSubasta">
        <div class = "content-popup">
            <h4 class = "title-colum-2">Opciones de subasta</h4>
            <form>
                <label id="identificacion_subasta" style="display:none;"></label>
                <select class = "item-popup" id="selCategoriaEditar" onchange="cargarProductosEditar();">
                    <option value="-1">Elija una categoria</option>
                </select>
                <select class = "item-popup" id="SelProductosEditar">
                    <option value="-1">Elija un producto</option>
                </select>
                <input class = "item-popup" type="number" id="txtCantidadEditar" name="cantidadEditar" placeholder= "Cantidad"/>
                <input class = "item-popup" type="txt" id="txtFechaEditar" name="fechaEditar" placeholder = "Fecha limite"/>
                <p id="alerta-editar"></p>
                <input class = "btn-item btn-popup" type="button" id="btnEditar" value="Editar Subasta"/>
                <input class = "btn-item btn-popup" type="button" id="btnEliminar" value="Eliminar Subasta"/>
                <input class = "btn-item btn-popup" type="button" id="btnCancelar" value="Cancelar" onclick="ocultarVentana();"/>
            </form>
        </div>
    </div>
</secction>
</div>
 </body>
</html>
<script>
  $(function() {
    $( "#txtFecha" ).datepicker();
    $( "#txtFechaEditar" ).datepicker();
  });
</script>

