$(document).ready(function () {
    $("#btnRegistrar").click(function () {
        registrar();
    });
    $("#btnEdiatar").click(function () {
        editar();
    });
    $("#btnEliminar").click(function () {
        eliminar();
    });
    $("#btnRegistrar-pro").click(function () {
        registrarProducto();
    });
    $("#btnEditar-pro").click(function () {
        editarProducto();
    });
    $("#btnEliminar-pro").click(function () {
        elimarProducto();
    });
    cargarCategorias();
});


/*
    Metodo para registrar una categoria en el sistema
*/
function registrar(){
    var nombre = $("#txtNombreR").val();
    var descripcion = $("#txtDescripcionR").val();

    if (nombre !== "" && descripcion !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/insertCategory",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { nombre: nombre, descripcion: descripcion},

            success: function (data) {
                if(data === "1"){
                    cargarCategorias();
                    $("#txtNombreR").val("");
                    $("#txtDescripcionR").val("");
                    $('#alert-error-registro').html('Categoria registrada');
                    $('#alert-error-registro').css('display', 'block'); 
                }else if(data === "-4"){
                    $("#txtNombreR").val("");
                    $("#txtDescripcionR").val("");
                    $('#alert-error-registro').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-registro').css('display', 'block'); 
                }else if(data === "-3"){
                    $("#txtDescripcionR").val("");
                    $('#alert-error-registro').html('Ya hay una Categoria con la misma descripcion');
                    $('#alert-error-registro').css('display', 'block');
                }else if(data === "-2"){
                    $("#txtNombreR").val("");
                    $('#alert-error-registro').html('Ya una Categoria con ese nombre');
                    $('#alert-error-registro').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-registro').html('Por favor llene todos los campos');
                    $('#alert-error-registro').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-registro').html('Por favor llene todos los campos');
        $('#alert-error-registro').css('display', 'block');
    }
}
    
/*
    Metodo el cual edita una categoria
*/
function editar(){
    var nombre = $("#txtNombreEd").val();
    var descripcion = $("#txtDescripcionEd").val();
    var id = $("#selCategoriaEditar").val();

    if (nombre !== "" && descripcion !== "" && id !== "-1" && id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/updateCategory",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { id:id, nombre: nombre, descripcion: descripcion},

            success: function (data) {
                if(data === "1"){
                    cargarCategorias();
                    $("#txtNombreEd").val("");
                    $("#txtDescripcionEd").val("");
                    $("#selCategoriaEditar").val(-1);
                    $('#alert-error-edicion').html('Categoria editada con exito');
                    $('#alert-error-edicion').css('display', 'block'); 
                }else if(data === "-4"){
                    $("#txtNombreEd").val("");
                    $("#txtDescripcionEd").val("");
                    $("#selCategoriaEditar").val(-1);
                    $('#alert-error-edicion').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-edicion').css('display', 'block'); 
                }else if(data === "-3"){
                    $("#txtDescripcionEd").val("");
                    $('#alert-error-edicion').html('Ya hay una Categoria con la misma descripcion');
                    $('#alert-error-edicion').css('display', 'block');
                }else if(data === "-2"){
                    $("#txtNombreEd").val("");
                    $('#alert-error-edicion').html('Ya una Categoria con ese nombre');
                    $('#alert-error-edicion').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-edicion').html('Por favor llene todos los campos');
                    $('#alert-error-edicion').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-edicion').html('Seleccione una categoria');
        $('#alert-error-edicion').css('display', 'block');
    }  
}
 
/*
    Metodo el cual elimina una categoria
*/   
function eliminar(){
    var id = $("#selCategoriaEliminar").val();

    if (id !== "-1" && id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/deleteCategory",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { id:id},

            success: function (data) {
                if(data === "1"){
                    cargarCategorias();
                    $("#txtNombreEl").text("");
                    $("#txtDescripcionEl").text("");
                    $("#selCategoriaEliminar").val(-1);
                    $('#alert-error-eliminacion').html('Categoria eliminada con exito');
                    $('#alert-error-eliminacion').css('display', 'block'); 
                }else if(data === "-4"){
                    $('#alert-error-eliminacion').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-eliminacion').css('display', 'block'); 
                }else if(data === "-3"){
                    $('#alert-error-eliminacion').html('Hay provedores que utilizan esa categoria');
                    $('#alert-error-eliminacion').css('display', 'block');
                }else if(data === "-2"){
                    $('#alert-error-eliminacion').html('Hay productos relacionados a esa categoria');
                    $('#alert-error-eliminacion').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-eliminacion').html('Por favor llene todos los campos');
                    $('#alert-error-eliminacion').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-eliminacion').html('Seleccione una categoria');
        $('#alert-error-eliminacion').css('display', 'block');
    }  
}

/*
    Metodo que carga en los combos las categorias del sistema
*/
function cargarCategorias(){
    $.ajax({
        type: 'post',
        url: "./ctl_admin/listCategories",
        beforeSend: function () {

        },
        data: {},
        success: function (data) {

            var info = JSON.parse(data);

            //var select = $("#selDepartamento");
            var selectEd = document.getElementById("selCategoriaEditar");
            var selectEl = document.getElementById("selCategoriaEliminar");
            var selectCrearProducto = document.getElementById("selectCrearProducto");
            var selectCategoriaProductoEditar = document.getElementById("selectCategoriaProductoEditar");
            var seleCateEliminarPro = document.getElementById("seleCateEliminarPro");

            //Limpiar select
            while (selectEd.length > 1) {
                selectEd.remove(selectEd.length - 1);
                selectEl.remove(selectEl.length - 1);
                selectCrearProducto.remove(selectCrearProducto.length - 1);
                selectCategoriaProductoEditar.remove(selectCategoriaProductoEditar.length - 1);
                seleCateEliminarPro.remove(seleCateEliminarPro.length - 1);
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    selectEd.options[selectEd.length] = opt;
                }
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    selectEl.options[selectEl.length] = opt;
                }
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    selectCrearProducto.options[selectCrearProducto.length] = opt;
                }
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    selectCategoriaProductoEditar.options[selectCategoriaProductoEditar.length] = opt;
                }
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    seleCateEliminarPro.options[seleCateEliminarPro.length] = opt;
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            alert("Verifique la ruta del archivo");
        }
    });
}

/*
    Metodo el cual muestra datos de la categoria
*/
function mostrarCategoria(cadena){
    if (cadena === "update"){

        var id = $("#selCategoriaEditar").val();

        $.ajax({
            type: 'post',
            url: "./ctl_admin/searchCategory",
            beforeSend: function () {

            },
            data: {id : id},
            success: function (data) {

                var info = JSON.parse(data);

                if(data.length > 2){
                    $("#txtNombreEd").val(info[0].nombre);
                    $("#txtDescripcionEd").val(info[0].descripcion);
                }else{
                    $("#txtNombreEd").val("");
                    $("#txtDescripcionEd").val("");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }else if(cadena === "delete"){
        var id = $("#selCategoriaEliminar").val();

        $.ajax({
            type: 'post',
            url: "./ctl_admin/searchCategory",
            beforeSend: function () {

            },
            data: {id : id},
            success: function (data) {

                var info = JSON.parse(data);
                
                if(data.length > 2){
                    $("#txtNombreEl").text(info[0].nombre);
                    $("#txtDescripcionEl").text(info[0].descripcion);
                }else{
                    $("#txtNombreEl").text("");
                    $("#txtDescripcionEl").text("");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }
}

/*
    Metodo el cual registra un producto
*/
function registrarProducto(){
    var nombre = $("#txtNombreR-pro").val();
    var descripcion = $("#txtDescripcionR-pro").val();
    var categoria = $("#selectCrearProducto").val();

    if (nombre !== "" && descripcion !== "" && categoria !== "-1" && categoria !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/insertProduct",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { nombre: nombre, descripcion: descripcion, categoria:categoria},

            success: function (data) {
                if(data === "1"){
                    //cargarCategorias();
                    $("#txtNombreR-pro").val("");
                    $("#txtDescripcionR-pro").val("");
                    $("#selectCrearProducto").val(-1);
                    $('#alert-error-registro-pro').html('Producto registrada');
                    $('#alert-error-registro-pro').css('display', 'block'); 
                }else if(data === "-4"){
                    $("#txtNombreR-pro").val("");
                    $("#txtDescripcionR-pro").val("");
                    $("#selectCrearProducto").val(-1);
                    $('#alert-error-registro-pro').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-registro-pro').css('display', 'block'); 
                }else if(data === "-2"){
                    $("#txtNombreR-pro").val("");
                    $('#alert-error-registro-pro').html('Ya hay un producto con ese mismo nombre');
                    $('#alert-error-registro-pro').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-registro-pro').html('Por favor llene todos los campos');
                    $('#alert-error-registro-pro').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-registro-pro').html('Por favor llene todos los campos');
        $('#alert-error-registro-pro').css('display', 'block');
    }
}

/*
    Metodo el cual edita un producto
*/
function editarProducto(){
    var nombre = $("#txtNombreEd-pro").val();
    var descripcion = $("#txtDescripcionEd-pro").val();
    var categoria = $("#selCategoriaEd-pro").val();
    var id = $("#selProductoEd").val();

    if (nombre !== "" && descripcion !== "" && categoria !== "-1" && categoria !== ""
             && id !== "-1" && id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/updateProduct",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { id:id, categoria:categoria, nombre: nombre, descripcion: descripcion},

            success: function (data) {
                if(data === "1"){
                    //cargarCategorias();
                    $("#txtNombreEd-pro").val("");
                    $("#txtDescripcionEd-pro").val("");
                    $("#selectCategoriaProductoEditar").val(-1);
                    $("#selProductoEd").val(-1);
                    $("#selCategoriaEd-pro").val(-1);
                    cargarCategoriasDependientes("vacio");
                    $('#alert-error-edicion-pro').html('Producto editado con exito');
                    $('#alert-error-edicion-pro').css('display', 'block'); 
                }else if(data === "-4"){
                    $("#txtNombreEd-pro").val("");
                    $("#txtDescripcionEd-pro").val("");
                    $("#selectCategoriaProductoEditar").val(-1);
                    $("#selProductoEd").val(-1);
                    $("#selCategoriaEd-pro").val(-1);
                    cargarCategoriasDependientes("vacio");
                    $('#alert-error-edicion-pro').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-edicion-pro').css('display', 'block'); 
                }else if(data === "-2"){
                    $("#txtNombreEd-pro").val("");
                    $('#alert-error-edicion-pro').html('Ya una Categoria con ese nombre');
                    $('#alert-error-edicion-pro').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-edicion-pro').html('Por favor llene todos los campos');
                    $('#alert-error-edicion-pro').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-edicion-pro').html('Recuerde seleccionar categoria y producto');
        $('#alert-error-edicion-pro').css('display', 'block');
    }
}

/*
    metodo el cual realiza la eliminacion de un producto
*/
function elimarProducto(){
    var id = $("#selProductoEl").val();

    if (id !== "-1" && id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_admin/deleteProduct",
            beforeSend: function () {
               //alert("Accion enviar");
            },
            data: { id:id},

            success: function (data) {
                if(data === "1"){
                    $("#txtNombreEl-pro").text("");
                    $("#txtDescripcionEl-pro").text("");
                    $("#seleCateEliminarPro").val(-1);
                    $("#selProductoEl").val(-1);
                    $('#alert-error-eliminacion-pro').html('Producto eliminado con exito');
                    $('#alert-error-eliminacion-pro').css('display', 'block'); 
                }else if(data === "-4"){
                    $("#txtNombreEl-pro").text("");
                    $("#txtDescripcionEl-pro").text("");
                    $("#seleCateEliminarPro").val(-1);
                    $("#selProductoEl").val(-1);
                    $('#alert-error-eliminacion-pro').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-eliminacion-pro').css('display', 'block'); 
                }else if(data === "-3"){
                    $('#alert-error-eliminacion-pro').html('Hay provedores que utilizan este producto');
                    $('#alert-error-eliminacion-pro').css('display', 'block');
                }else if(data === "-2"){
                    $('#alert-error-eliminacion-pro').html('Hay productos relacionados a subasta');
                    $('#alert-error-eliminacion-pro').css('display', 'block');
                }else if(data === "-1"){
                    $('#alert-error-eliminacion-pro').html('Por favor llene todos los campos');
                    $('#alert-error-eliminacion-pro').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error-eliminacion-pro').html('Recuerde seleccionar categoria y producto');
        $('#alert-error-eliminacion-pro').css('display', 'block');
    }
}

/*
    metodo el cual carga la lista de productos
*/
function cargarProductos(cadena){
    if(cadena === "update"){
        $("#txtNombreEd-pro").val("");
        $("#txtDescripcionEd-pro").val("");
        $("#selCategoriaEd-pro").val(-1);
        var id = $("#selectCategoriaProductoEditar").val();
        $.ajax({
            type: 'post',
            url: "./ctl_admin/listProducts",
            beforeSend: function () {

            },
            data: { idCategory:id},
            success: function (data) {

                var info = JSON.parse(data);

                //var select = $("#selDepartamento");
                var selectEd = document.getElementById("selProductoEd");

                //Limpiar select
                while (selectEd.length > 1) {
                    selectEd.remove(selectEd.length - 1);
                }

                //Se llena el select
                if (data.length > 0) {
                    var opt = null;
                    for (var i = 0; i < info.length; i++) {
                        opt = new Option(info[i].nombre, info[i].id);
                        selectEd.options[selectEd.length] = opt;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }else if(cadena === "delete"){
        $("#txtNombreEl-pro").text("");
        $("#txtDescripcionEl-pro").text("");
        $("#selProductoEl").val(-1);
        var id = $("#seleCateEliminarPro").val();
        $.ajax({
            type: 'post',
            url: "./ctl_admin/listProducts",
            beforeSend: function () {

            },
            data: { idCategory:id},
            success: function (data) {

                var info = JSON.parse(data);

                //var select = $("#selDepartamento");
                var selectEd = document.getElementById("selProductoEl");

                //Limpiar select
                while (selectEd.length > 1) {
                    selectEd.remove(selectEd.length - 1);
                }

                //Se llena el select
                if (data.length > 0) {
                    var opt = null;
                    for (var i = 0; i < info.length; i++) {
                        opt = new Option(info[i].nombre, info[i].id);
                        selectEd.options[selectEd.length] = opt;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }
}

/*
    metodo el cual carga la informacion de los productos
*/
function mostrarProducto(cadena){
    
    if (cadena === "update"){

        var id = $("#selProductoEd").val();

        if(id !== "-1"){
            cargarCategoriasDependientes(cadena);
        }else{
            cargarCategoriasDependientes("vacio");
        }

        $.ajax({
            type: 'post',
            url: "./ctl_admin/searchProduct",
            beforeSend: function () {

            },
            data: {id : id},
            success: function (data) {

                var info = JSON.parse(data);

                if(data.length > 2){
                    $("#txtNombreEd-pro").val(info[0].nombre);
                    $("#txtDescripcionEd-pro").val(info[0].descripcion);
                    $("#selCategoriaEd-pro").val(info[0].categoria);
                }else{
                    $("#txtNombreEd-pro").val("");
                    $("#txtDescripcionEd-pro").val("");
                    $("#selCategoriaEd-pro").val(-1);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }else if (cadena === "delete"){

        var id = $("#selProductoEl").val();

        $.ajax({
            type: 'post',
            url: "./ctl_admin/searchProduct",
            beforeSend: function () {

            },
            data: {id : id},
            success: function (data) {

                var info = JSON.parse(data);

                if(data.length > 2){
                    $("#txtNombreEl-pro").text(info[0].nombre);
                    $("#txtDescripcionEl-pro").text(info[0].descripcion);
                }else{
                    $("#txtNombreEl-pro").text("");
                    $("#txtDescripcionEl-pro").text("");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }
}

/*
    metodo que permite carga un combo con las categorias que puede tener un producto a la
    hora de su edicion
*/
function cargarCategoriasDependientes(cadena){
    if(cadena === "update"){
        $.ajax({
            type: 'post',
            url: "./ctl_admin/listCategories",
            beforeSend: function () {

            },
            data: {},
            success: function (data) {

                var info = JSON.parse(data);

                //var select = $("#selDepartamento");
                var selectEd = document.getElementById("selCategoriaEd-pro");

                //Limpiar select
                while (selectEd.length > 1) {
                    selectEd.remove(selectEd.length - 1);
                }

                //Se llena el select
                if (data.length > 0) {
                    var opt = null;
                    for (var i = 0; i < info.length; i++) {
                        opt = new Option(info[i].nombre, info[i].id);
                        selectEd.options[selectEd.length] = opt;
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }else if(cadena === "vacio"){

            var selectEd = document.getElementById("selCategoriaEd-pro");

            //Limpiar select
            while (selectEd.length > 1) {
                selectEd.remove(selectEd.length - 1);
            }
        
    }
}