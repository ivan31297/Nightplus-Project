$(document).ready(function () {

    $("#btnAgregar").click(function () {
        agregarCategoria();
    });
    $("#btnAgregarProducto").click(function () {
        agregarProductos();
    });
    $("#btnOfertar").click(function () {
        crearOferta();
    });
    $("#btnEditar").click(function () {
        editarOferta();
    });
    $("#btnEliminar").click(function () {
        eliminarOferta();
    });
    cargarCategorias();
    cargarCategoriasUsuario();
    listarSubastas();
    listarWin();
});

function eliminarOferta() {
    var id = $("#idOferta").text();

    if (id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/deleteOfert",
            beforeSend: function () {
            },
            data: {id: id},
            success: function (data) {
                if (data === "1") {
                    alert("Oferta eliminada exitosamente");
                    $("#txtValor").val("");
                    $("#idOferta").text("");
                    ocultarVentana();
                } else if (data === "-4") {
                    $('#alert-oferta').html('Se presento un error inesperado');
                    $('#alert-oferta').css('display', 'block');
                } else if (data === "-1") {
                    $('#alert-oferta').html('datos vacios');
                    $('#alert-oferta').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            }
        });
    } else {
        $('#alert-oferta').html('No se selecciono una oferta');
        $('#alert-oferta').css('display', 'block');
    }
}

function editarOferta() {
    var valor = $("#txtValor").val();
    var id = $("#idOferta").text();

    if (valor > 0 && valor !== "" && id !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/updateOfert",
            beforeSend: function () {
            },
            data: {id: id, cantidad: valor},
            success: function (data) {
                if (data === "1") {
                    alert("Oferta editada con exito");
                    $("#txtValor").val("");
                    $("#idOferta").text("");
                    ocultarVentana();
                } else if (data === "-4") {
                    $('#alert-oferta').html('Se presento un error inesperado');
                    $('#alert-oferta').css('display', 'block');
                } else if (data === "-1") {
                    $('#alert-oferta').html('datos vacios');
                    $('#alert-oferta').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            }
        });
    } else {
        $('#alert-oferta').html('Ingrese una cantidad valida');
        $('#alert-oferta').css('display', 'block');
    }
}

function crearOferta() {
    var valor = $("#txtValor").val();
    var subasta = $("#idSubasta").text();
    var usuario = $("#txtID").text();

    if (valor > 0 && valor !== "" && subasta !== "" && usuario !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/insertOfert",
            beforeSend: function () {
            },
            data: {idUser: usuario, subasta: subasta, cantidad: valor},
            success: function (data) {
                if (data === "1") {
                    alert("Oferta exitosa");
                    $("#txtValor").val("");
                    $("#idSubasta").text("");
                    ocultarVentana();
                } else if (data === "-4") {
                    $('#alert-oferta').html('Se presento un error inesperado');
                    $('#alert-oferta').css('display', 'block');
                } else if (data === "-2") {
                    $('#alert-oferta').html('Ud ya oferto en esta subasta');
                    $('#alert-oferta').css('display', 'block');
                } else if (data === "-1") {
                    $('#alert-oferta').html('datos vacios');
                    $('#alert-oferta').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            }
        });
    } else {
        $('#alert-oferta').html('Ingrese una cantidad valida');
        $('#alert-oferta').css('display', 'block');
    }

}

function listarWin() {
    var idUsuario = $("#txtID").text();

    if (idUsuario !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/listWin",
            beforeSend: function () {
            },
            data: {idUser: idUsuario},
            success: function (data) {
                var div = $('#div-win');
                var cadena = "<table id='contenedorEstados' class='display' cellspacing='0' width='100%'>";
                cadena += "<thead><tr><td style='width: 400px;'>Producto</td><td style='width: 470px;'>Categoria</td>";
                cadena += "<td class='align-center' style='width: 135px;'>Cantidad</td><td class='align-center' style='width: 130px;'>";
                cadena += "Estado</td></tr></thead><tbody>";

                var info = JSON.parse(data);

                if (data.length > 2) {

                    for (var i = 0; i < info.length; i++) {
                        if (info[i] !== null) {
                            cadena += "<tr><td>" + info[i].productonombre + "</td><td>" + info[i].categorianombre + "</td><td class = 'align-center'>" + info[i].cantidad + "</td>";
                            cadena += "<td class = 'align-center'>" + info[i].win + "</td></tr>";
                        }
                    }
                    cadena += "</tbody></table>";
                    div.html(cadena);
                    $("#contenedorEstados").dataTable({
                        oLanguage: {
                            sSearch: "<span>Buscar:</span> " +
                            "", sInfo: "Mostrando <span>_START_</span> a" +
                            " <span>_END_</span> de <span>_TOTAL_</span>" +
                            "Registros", sLengthMenu: "_MENU_ <span>Registros " +
                            "por página</span>", sInfoEmpty: "Mostrando 0 a 0 de 0 Registros",
                            sInfoFiltered: "(Filtrado de _MAX_ total)",
                            sZeroRecords: "No hay Registros", oPaginate: {
                                "sFirst": "<i class='fa fa-angle-double-left'>" +
                                "</i>", "sPrevious": "<i class='fa fa-angle-left'>" +
                                "</i>", "sNext": "<i class='fa fa-angle-right'></i>",
                                "sLast": "<i class='fa fa-angle-double-right'></i>"
                            }
                        }
                    });
                }
                /*else{
                 alert(data);
                 }*/
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            }
        });
    }
}

function listarSubastas() {
    var idUsuario = $("#txtID").text();

    if (idUsuario !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/listSubasta",
            beforeSend: function () {
            },
            data: {idUser: idUsuario},
            success: function (data) {
                var div = $("#div-subasta");
                var cadena = "<table id='contenedorSubastas' class='display' cellspacing='0' width='100%'>";
                cadena += "<thead><tr><td style='width: 400px;'>Producto</td>";
                cadena += "<td style='width: 470px;'> Categoria</td><td class='align-center' style='width: 135px;'>";
                cadena += "Cantidad</td><td class='align-center' style='width: 130px;'>Fecha Limite</td><td></td>";
                cadena += "</tr></thead><tbody>";

                var info = JSON.parse(data);

                if (data.length > 2) {

                    for (var i = 0; i < info.length; i++) {
                        if (info[i] !== null) {
                            cadena += "<tr><td>" + info[i].productonombre + "</td><td>" + info[i].categorianombre + "</td><td class = 'align-center'>" + info[i].cantidad + "</td><td class = 'align-center'>" + info[i].fecha_limite + "</td>";
                            //cadena += "<td><input type='button' id='"+info[i].id+"' value='Ofertar' onclick='mostrarVentana("+info[i].id+");'/></td></tr>"; 
                            cadena += "<td><i id='" + info[i].id + "' class= 'fa fa-gavel' aria-hidden= 'true' onclick='mostrarVentana(" + info[i].id + ");'></i></td>";
                        }
                    }
                    cadena += "</tbody></table>";
                    div.html(cadena);
                    $("#contenedorSubastas").dataTable({
                        oLanguage: {
                            sSearch: "<span>Buscar:</span> " +
                            "", sInfo: "Mostrando <span>_START_</span> a" +
                            " <span>_END_</span> de <span>_TOTAL_</span>" +
                            "Registros", sLengthMenu: "_MENU_ <span>Registros " +
                            "por página</span>", sInfoEmpty: "Mostrando 0 a 0 de 0 Registros",
                            sInfoFiltered: "(Filtrado de _MAX_ total)",
                            sZeroRecords: "No hay Registros", oPaginate: {
                                "sFirst": "<i class='fa fa-angle-double-left'>" +
                                "</i>", "sPrevious": "<i class='fa fa-angle-left'>" +
                                "</i>", "sNext": "<i class='fa fa-angle-right'></i>",
                                "sLast": "<i class='fa fa-angle-double-right'></i>"
                            }
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            }
        });
    }
}

function agregarCategoria() {
    var categoria = $("#selCategorias").val();
    var idUsuario = $("#txtID").text();
    if (categoria !== "" && categoria !== "-1" && idUsuario !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/insertCategoria",
            beforeSend: function () {
                //alert("Accion enviar");
            },
            data: {idUser: idUsuario, categoria: categoria},
            success: function (data) {
                if (data === "1") {
                    cargarCategoriasUsuario();
                    listarSubastas();
                    $("#selCategorias").val(-1);
                    $('#alert-error-categoria').html('Categoria registrada');
                    $('#alert-error-categoria').css('display', 'block');
                } else if (data === "-4") {
                    $('#alert-error-categoria').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-categoria').css('display', 'block');
                } else if (data === "-1") {
                    $('#alert-error-categoria').html('Por favor llene todos los campos');
                    $('#alert-error-categoria').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#alert-error-categoria').html('Ud ya posee esa categoria');
                $('#alert-error-categoria').css('display', 'block');
            }
        });
    } else {
        $('#alert-error-categoria').html('Seleccione un acategoria');
        $('#alert-error-categoria').css('display', 'block');
    }
}

function agregarProductos() {
    var categoria_pro = $("#selCategoriasUsuario").val();
    var producto = $("#selProductos").val();
    if (categoria_pro !== "" && categoria_pro !== "-1" && producto !== "" && producto !== "-1") {
        $.ajax({
            type: 'post',
            url: "./ctl_provedor/insertProducto",
            beforeSend: function () {
            },
            data: {categoria_pro: categoria_pro, producto: producto},
            success: function (data) {
                if (data === "1") {
                    listarSubastas();
                    $("#selCategoriasUsuario").val(-1);
                    $("#selProductos").val(-1);
                    $('#alert-error-productos').html('Producto registrado');
                    $('#alert-error-productos').css('display', 'block');
                } else if (data === "-4") {
                    $('#alert-error-productos').html('Error inesperado, Intente de nuevo mas tarde');
                    $('#alert-error-productos').css('display', 'block');
                } else if (data === "-1") {
                    $('#alert-error-productos').html('Por favor llene todos los campos');
                    $('#alert-error-productos').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#alert-error-productos').html('Ud ya posee este producto');
                $('#alert-error-productos').css('display', 'block');
            }
        });
    } else {
        $('#alert-error-productos').html('Seleccione una tanto categoria como producto');
        $('#alert-error-productos').css('display', 'block');
    }
}

function cargarCategorias() {
    $.ajax({
        type: 'post',
        url: "./ctl_admin/listCategories",
        beforeSend: function () {
        },
        data: {},
        success: function (data) {
            var info = JSON.parse(data);
            var selectEd = document.getElementById("selCategorias");
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

function cargarCategoriasUsuario() {
    $.ajax({
        type: 'post',
        url: "./ctl_provedor/listCategories",
        beforeSend: function () {
        },
        data: {id: $("#txtID").text()},
        success: function (data) {
            var info = JSON.parse(data);
            var selectEd = document.getElementById("selCategoriasUsuario");
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

function cargarProductos() {
    var id = $("#selCategoriasUsuario").val();
    $.ajax({
        type: 'post',
        url: "./ctl_provedor/listProducts",
        beforeSend: function () {
        },
        data: {idCategory: id},
        success: function (data) {
            var info = JSON.parse(data);
            var selectEd = document.getElementById("selProductos");
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

function mostrarVentana(iden) {
    $.ajax({
        type: 'post',
        url: "./ctl_provedor/buscarOferta",
        beforeSend: function () {
        },
        data: {subasta: iden, usuario: $("#txtID").text()},
        success: function (data) {
            if (data === "2") {
                $('#btnOfertar').css('display', 'block');
                $('#btnEditar').css('display', 'none');
                $('#btnEliminar').css('display', 'none');
                $("#modalOferta").fadeIn(30);
                $("#idSubasta").text(iden);
            } else if (data.length > 4) {
                var info = JSON.parse(data);
                $('#btnEditar').css('display', 'block');
                $('#btnEliminar').css('display', 'block');
                $('#btnOfertar').css('display', 'none');
                $('#txtValor').val(info[0].valor);
                $("#modalOferta").fadeIn(30);
                $("#idSubasta").text(iden);
                $("#idOferta").text(info[0].id);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        }
    });
}

function ocultarVentana() {
    $("#modalOferta").fadeOut(30);
}