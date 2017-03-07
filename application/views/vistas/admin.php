<script type="text/javascript" src="public/recursos/js/gestionAdmin.js"></script>

<!--<form name="form-reportes" method="post" action="ctl_pdf/pdf" target="_blank">
    <input type="submit" value="reporte" id="btnReporte">
</form>-->
<!-- zona de categorias -->

<div id="main-admin" class="main-content">
    <h2 class="main-title">Reportes</h2>
    <div class="content-forms">
        <div class="section-item-form-report form-report-admin">
            <form method="post" action="ctl_pdf/pdfAuctionUser" target="_blank">
                <div>
                    <input class="btn-item" type="submit" id="btnPdfAuctionUser" value="Subastas Usuario"/>
                </div>
            </form>
            <form method="post" action="ctl_pdf/pdfGetProducts" target="_blank">
                <div>
                    <input class="btn-item" type="submit" id="btnPdfGetProducts" value="Lista Productos"/>
                </div>
            </form>
            <form method="post" action="ctl_pdf/pdfGetCategories" target="_blank">
                <div>
                    <input class="btn-item" type="submit" id="btnPdfGetCategories" value="Lista Categorias"/>
                </div>
            </form>
            <form method="post" action="ctl_pdf/pdfGetUsers" target="_blank">
                <input class="btn-item" type="submit" id="btnPdfGetUsers" value="Lista Usuarios"/>
                <div>
                    <input class="radio-item" type="radio" name="type" value="1" checked> Todos<br>
                    <input class="radio-item" type="radio" name="type" value="2"> Provedores<br>
                    <input class="radio-item" type="radio" name="type" value="3"> Empresarios
                </div>
            </form>
            <form method="post" action="ctl_pdf/getCategoriesUser" target="_blank">
                <div>
                    <input class="btn-item" type="submit" id="btnGetCategoriesUser" value="Categorias-Usuario"/>
                </div>
            </form>
        </div>
    </div>
    <h2 class="main-title">Categorias</h2>
    <div class="content-forms">
        <div class="section-item-form">
            <h4 class="section-title">Crear</h4>
            <form>
                <div>
                    <input type="text" id="txtNombreR" name="nombreR" placeholder="Nombre"/>
                </div>
                <div>
                    <input type="text" id="txtDescripcionR" name="descripcionR" placeholder="Descripcion"/>
                </div>
                <p class="alert" id="alert-error-registro"></p>
                <div>
                    <input class="btn-item" type="button" id="btnRegistrar" value="Registrar"/>
                </div>
            </form>
        </div>
        <div class="section-item-form">
            <h4 class="section-title">Modificar</h4>
            <form>
                <select id="selCategoriaEditar" onchange="mostrarCategoria('update');">
                    <option value="-1">Elija una categoria</option>
                </select>
                <div>
                    <input type="text" id="txtNombreEd" name="nombreEd" placeholder="Nombre"/>
                </div>
                <div>
                    <input type="text" id="txtDescripcionEd" name="descripcionEd" placeholder="Descripcion"/>
                </div>
                <p class="alert" id="alert-error-edicion"></p>
                <div>
                    <input class="btn-item" type="button" id="btnEdiatar" value="Editar"/>
                </div>
            </form>
        </div>
        <div class="section-item-form">
            <h4 class="section-title">Eliminar</h4>
            <form>
                <select id="selCategoriaEliminar" onchange="mostrarCategoria('delete');">
                    <option value="-1">Elija una categoria</option>
                </select>
                <div>

                    <label id="txtNombreEl" placeholder="Nombre"></label>
                </div>
                <div>
                    <label id="txtDescripcionEl" placeholder="Descripcion"></label>
                </div>
                <p class="alert" id="alert-error-eliminacion"></p>
                <div>
                    <input class="btn-item" type="button" id="btnEliminar" value="Eliminar"/>
                </div>
            </form>
        </div>
    </div>

    <!-- Zona de productos -->

    <h2 class="main-title">Productos</h2>
    <div class="content-forms">
        <div class="section-item-form">
            <h4 class="section-title">Crear</h4>
            <form>
                <div>
                    <input type="text" id="txtNombreR-pro" name="nombreR-pro" placeholder="Nombre"/>
                </div>
                <div>
                    <input type="text" id="txtDescripcionR-pro" name="descripcionR-pro" placeholder="Descripcion"/>
                </div>
                <select id="selectCrearProducto">
                    <option value="-1">Elija una categoria</option>
                </select>
                <p class="alert" id="alert-error-registro-pro"></p>
                <div>
                    <input class="btn-item" type="button" id="btnRegistrar-pro" value="Registrar"/>
                </div>
            </form>
        </div>
        <div class="section-item-form">
            <h4 class="section-title">Modificar</h4>
            <form>
                <select id="selectCategoriaProductoEditar" onchange="cargarProductos('update');">
                    <option value="-1">Elija una categoria</option>
                </select>
                <select id="selProductoEd" onchange="mostrarProducto('update');">
                    <option value="-1">Elija un pproducto</option>
                </select>
                <div>
                    <input type="text" id="txtNombreEd-pro" name="nombreEd-pro" placeholder="Nombre"/>
                </div>
                <div>
                    <input type="text" id="txtDescripcionEd-pro" name="descripcionEd-pro" placeholder="Descripcion"/>
                </div>
                <select id="selCategoriaEd-pro">
                    <option value="-1">Elija nueva categoria</option>
                </select>
                <p class="alert" id="alert-error-edicion-pro"></p>
                <div>
                    <input class="btn-item" type="button" id="btnEditar-pro" value="Editar"/>
                </div>
            </form>
        </div>
        <div class="section-item-form">
            <h4 class="section-title">Eliminar</h4>
            <form>
                <select id="seleCateEliminarPro" onchange="cargarProductos('delete');">
                    <option value="-1">Elija una categoria</option>
                </select>
                <select id="selProductoEl" onchange="mostrarProducto('delete');">
                    <option value="-1">Elija un producto</option>
                </select>
                <div>
                    <label id="txtNombreEl-pro">Nombre</label>
                </div>
                <div>
                    <label id="txtDescripcionEl-pro">Descripcion</label>
                </div>
                <p class="alert" id="alert-error-eliminacion-pro"></p>
                <div>
                    <input class="btn-item" type="button" id="btnEliminar-pro" value="Eliminar"/>
                </div>
            </form>
        </div>
    </div>
    <div>
        </body>
        </html>

