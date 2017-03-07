$(document).ready(function () {
    $("#btnCrear").click(function () {
        crearSubasta();
    });
    $("#btnEditar").click(function () {
        generarEdicion();
    });
    $("#btnEliminar").click(function () {
        eliminarSubasta();
    });
    cargarCategorias();
    listarSubastasPendientes();
    listarOfertas();
});

function listarSubastasPendientes() {
    $.ajax({
        type: 'post',
        url: "./ctl_empresa/listarSubastasPendientes",
        beforeSend: function () {
        },
        data: {id: $("#txtID").text()},
        success: function (data) {
            var info = JSON.parse(data);
            var div = $("#div-subasta");

            var cadena = "<table id='subastas' class='display' cellspacing='0' width='100%'><thead>";
            cadena += "<tr><td style = 'width:540px;'>Categoria</td><td style = 'width:270px;'>Producto</td>" +
                "<td class = 'align-center' style = 'width:175px;'>Cantidad</td>" +
                "<td class = 'align-center' style = 'width:230px;'>Fecha Limite</td>" +
                "<td></td style = 'width:35px;'></tr></thead><tbody>";

            if (data.length > 2) {
                for (var i = 0; i < info.length; i++) {
                    cadena += "<tr><td>" + info[i].nombreCategoria + "</td><td>" + info[i].nombreProducto + "</td><td class = 'align-center'>" + info[i].cantidad + "</td><td class = 'align-center'>" + info[i].fecha_limite + "</td>";
                    //cadena += "<td><input type='button' id='"+info[i].id+"' value='Editar' onclick='editarSubasta("+info[i].id+");'/></td></tr>"
                    cadena += "<td class = 'align-center' style = 'width:35px;'><i id='" + info[i].id + "' class='fa fa-pencil' aria-hidden='true' onclick='editarSubasta(" + info[i].id + ");'></i></td>"
                }
            }
            cadena += "</tbody></table>";
            div.html(cadena);
            $("#subastas").dataTable({
                oLanguage: {
                    sSearch: "<span>Buscar:</span> " +
                    "", sInfo: "Mostrando <span>_START_</span> a" +
                    " <span>_END_</span> de <span>_TOTAL_</span>" +
                    "Registros", sLengthMenu: "_MENU_ <span>Registros " +
                    "por página</span>", sInfoEmpty: "Mostrando 0 a 0 de 0 " +
                    "Registros", sInfoFiltered: "(Filtrado de _MAX_ total)",
                    sZeroRecords: "No hay Registros", oPaginate: {
                        "sFirst": "<i class='fa fa-angle-double-left'>" +
                        "</i>", "sPrevious": "<i class='fa fa-angle-left'>" +
                        "</i>", "sNext": "<i class='fa fa-angle-right'></i>",
                        "sLast": "<i class='fa fa-angle-double-right'></i>"
                    }
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            alert("Verifique la ruta del archivo");
        }
    });
}

function listarOfertas() {
    $.ajax({
        type: 'post',
        url: "./ctl_empresa/listarOfertas",
        beforeSend: function () {
        },
        data: {id: $("#txtID").text()},
        success: function (data) {
            var info = JSON.parse(data);
            var div = $("#div-ofertas");

            var cadena = "<table id='ofertas' class='display' cellspacing='0' width='100%'><thead>";
            cadena += "<tr><td style = 'width:350px;'>Categoria</td><td style = 'width:240px;'>Producto</td>" +
                "<td class = 'align-center' style = 'width:120px;'>Cantidad</td>" +
                "<td class = 'align-center' style = 'width:170px;'>Fecha Limite</td>" +
                "<td class = 'align-center' style = 'width:170px;'>Valor cobrado</td>" +
                "<td style = 'width:130px;'>Empresa</td><td>" +
                "</td style = 'width:35px;'></tr></thead><tbody>";

            if (data.length > 2) {
                for (var i = 0; i < info.length; i++) {
                    cadena += "<tr><td>" + info[i].nombrecategoria + "</td><td>" + info[i].nombreproducto + "</td><td class = 'align-center'>" + info[i].cantidad + "</td><td class = 'align-center'>" + info[i].fecha_limite + "</td>";
                    cadena += "<td class = 'align-center'>$ " + info[i].valor + "</td><td>" + info[i].empresa + "</td>";
                    //cadena += "<td><input type='button' id='"+info[i].id+"' value='Ganador' onclick='crearGanador("+info[i].id+","+info[i].idsubasta+");'/></td></tr>"
                    cadena += "<td style= 'width:35px;' class = 'align-center'><i id='" + info[i].id + "' onclick='crearGanador(" + info[i].id + "," + info[i].idsubasta + ");' class='fa fa-trophy' aria-hidden='true'></i></td>";
                }
            }
            cadena += "</tbody></table>";
            div.html(cadena);
            $("#ofertas").dataTable({
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
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            alert("Verifique la ruta del archivo");
        }
    });
}

function crearSubasta() {
    var categoria = $("#selCategoria").val();
    var producto = $("#SelProductos").val();
    var cantidad = $("#txtCantidad").val();
    var fecha = $("#txtFecha").val();
    //cambio de formato de la fecha para que esta concida con la bd
    var formato_fecha = fecha.split("/");
    fecha = formato_fecha[2] + "-" + formato_fecha[0] + "-" + formato_fecha[1];

    if (categoria !== "-1" && categoria !== "" && producto !== "-1" && producto !== "" && cantidad > 0 && cantidad !== "" && fecha !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_empresa/insertSubasta",
            beforeSend: function () {
            },
            data: {
                categoria: categoria,
                producto: producto,
                cantidad: cantidad,
                fecha: fecha,
                usuario: $("#txtID").text()
            },
            success: function (data) {
                if (data === "1") {
                    $("#selCategoria").val(-1);
                    $("#SelProductos").val(-1);
                    $("#txtCantidad").val("");
                    $("#txtFecha").val("");
                    listarSubastasPendientes();
                    $('#alerta-subasta').html('Subasta creada');
                    $('#alerta-subasta').css('display', 'block');
                } else if (data === "-4") {
                    $("#selCategoria").val(-1);
                    $("#SelProductos").val(-1);
                    $("#txtCantidad").val("");
                    $("#txtFecha").val("");
                    $('#alerta-subasta').html('Error inesperado');
                    $('#alerta-subasta').css('display', 'block');
                } else if (data === "-1") {
                    $('#alerta-subasta').html('Por favor llene todos los campos');
                    $('#alerta-subasta').css('display', 'block');
                } else if (data === "-3") {
                    $("#txtFecha").val("");
                    $('#alerta-subasta').html('La fecha debe ser igual o superior a la actual');
                    $('#alerta-subasta').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    } else {
        $('#alerta-subasta').html('Por favor llene todos los campos');
        $('#alerta-subasta').css('display', 'block');
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
            var selectEd = document.getElementById("selCategoria");
            var select = document.getElementById("selCategoriaEditar");
            //Limpiar select
            while (selectEd.length > 1) {
                selectEd.remove(selectEd.length - 1);
                select.remove(select.length - 1);
            }
            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    selectEd.options[selectEd.length] = opt;
                }
            }
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].nombre, info[i].id);
                    select.options[select.length] = opt;
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
    var id = $("#selCategoria").val();
    $.ajax({
        type: 'post',
        url: "./ctl_admin/listProducts",
        beforeSend: function () {
        },
        data: {idCategory: id},
        success: function (data) {
            var info = JSON.parse(data);
            var selectEd = document.getElementById("SelProductos");
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

function cargarProductosEditar() {
    var id = $("#selCategoriaEditar").val();
    $.ajax({
        async: false,
        type: 'post',
        url: "./ctl_admin/listProducts",
        beforeSend: function () {
        },
        data: {idCategory: id},
        success: function (data) {
            var info = JSON.parse(data);
            var selectEd = document.getElementById("SelProductosEditar");
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

function editarSubasta(iden) {
    $.ajax({
        type: 'post',
        url: "./ctl_empresa/buscarSubasta",
        beforeSend: function () {
        },
        data: {id: iden},
        success: function (data) {
            if (data !== "-2" && data !== "-1") {
                var info = JSON.parse(data);
                $("#menuSubasta").fadeIn(30);
                $("#selCategoriaEditar").val(info[0].categoria);
                cargarProductosEditar();
                $("#SelProductosEditar").val(info[0].producto);
                $("#txtCantidadEditar").val(info[0].cantidad);
                var formato_fecha = info[0].fecha_limite.split("-");
                var fecha_t = formato_fecha[1] + "/" + formato_fecha[2] + "/" + formato_fecha[0];
                $("#txtFechaEditar").val(fecha_t);
                $("#identificacion_subasta").text(iden);
            } else if (data !== "-2") {
                $('#alerta-editar').html('No hay subasta');
                $('#alerta-editar').css('display', 'block');
            } else if (data !== "-1") {
                $('#alerta-editar').html('datos vacios');
                $('#alerta-editar').css('display', 'block');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            alert("Verifique la ruta del archivo");
        }
    });
}

function crearGanador(oferta, subasta) {
    if (oferta !== "" && subasta !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_empresa/crearGanador",
            beforeSend: function () {
            },
            data: {id_oferta: oferta, id_subasta: subasta},
            success: function (data) {
                if (data === "1") {
                    alert("Ha selecionado una oferta ganadora");
                    window.location.reload();
                } else if (data === "-1") {
                    $('#msm_oferta').html('Error inesperado');
                    $('#msm_oferta').css('display', 'block');
                } else if (data === "-2") {
                    $('#msm_oferta').html('Oferta invalida');
                    $('#msm_oferta').css('display', 'block');
                } else if (data === "-3") {
                    $('#msm_oferta').html('Edicion oferta uno invalida');
                    $('#msm_oferta').css('display', 'block');
                } else if (data === "-4") {
                    $('#msm_oferta').html('Edicion ofertas invalidas');
                    $('#msm_oferta').css('display', 'block');
                } else if (data === "-5") {
                    $('#msm_oferta').html('Edicion subasta invalida');
                    $('#msm_oferta').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    }
}

function ocultarVentana() {
    $("#menuSubasta").fadeOut(30);
}

function generarEdicion() {
    var categoria = $("#selCategoriaEditar").val();
    var producto = $("#SelProductosEditar").val();
    var cantidad = $("#txtCantidadEditar").val();
    var fecha = $("#txtFechaEditar").val();
    var formato_fecha = fecha.split("/");
    fecha = formato_fecha[2] + "-" + formato_fecha[0] + "-" + formato_fecha[1];

    if (categoria !== "-1" && categoria !== "" && producto !== "-1" && producto !== "" && cantidad > 0 && cantidad !== "" && fecha !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_empresa/editSubasta",
            beforeSend: function () {
            },
            data: {
                id: $("#identificacion_subasta").text(),
                categoria: categoria,
                producto: producto,
                cantidad: cantidad,
                fecha: fecha,
                usuario: $("#txtID").text()
            },
            success: function (data) {
                if (data === "1") {
                    $("#selCategoriaEditar").val(-1);
                    $("#SelProductosEditar").val(-1);
                    $("#txtCantidadEditar").val("");
                    $("#txtFechaEditar").val("");
                    $("#alerta-editar").css('display', 'none');
                    listarSubastasPendientes();
                    listarOfertas();
                    alert("Subasta editada");
                    window.location.reload();
                } else if (data === "-4") {
                    $("#selCategoriaEditar").val(-1);
                    $("#SelProductosEditar").val(-1);
                    $("#txtCantidadEditar").val("");
                    $("#txtFechaEditar").val("");
                    $('#alerta-editar').html('Error inesperado');
                    $('#alerta-editar').css('display', 'block');
                } else if (data === "-1") {
                    $('#alerta-editar').html('Por favor llene todos los campos');
                    $('#alerta-editar').css('display', 'block');
                } else if (data === "-3") {
                    $("#txtFecha").val("");
                    $('#alerta-editar').html('La fecha debe ser igual o superior a la actual');
                    $('#alerta-editar').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    } else {
        $('#alerta-editar').html('Por favor llene todos los campos');
        $('#alerta-editar').css('display', 'block');
    }
}

function eliminarSubasta() {
    if ($("#identificacion_subasta").text() !== "") {
        $.ajax({
            type: 'post',
            url: "./ctl_empresa/eliminarSubasta",
            beforeSend: function () {
            },
            data: {id: $("#identificacion_subasta").text()},
            success: function (data) {
                if (data === "1") {
                    $("#selCategoriaEditar").val(-1);
                    $("#SelProductosEditar").val(-1);
                    $("#txtCantidadEditar").val("");
                    $("#txtFechaEditar").val("");
                    $("#alerta-editar").css('display', 'none');
                    listarSubastasPendientes();
                    alert("Subasta eliminada");
                    ocultarVentana();
                    window.location.reload();
                } else if (data === "-4") {
                    $("#selCategoriaEditar").val(-1);
                    $("#SelProductosEditar").val(-1);
                    $("#txtCantidadEditar").val("");
                    $("#txtFechaEditar").val("");
                    $("#alerta-editar").css('display', 'none');
                    ocultarVentana();
                    $('#alerta-editar').html('Error inesperado');
                    $('#alerta-editar').css('display', 'block');
                } else if (data === "-1") {
                    $('#alerta-editar').html('Por favor llene todos los campos');
                    $('#alerta-editar').css('display', 'block');
                } else if (data === "2") {
                    $('#alerta-editar').html('La subasta no se puede eliminar, ya hay ofertas pendientes');
                    $('#alerta-editar').css('display', 'block');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
                alert("Verifique la ruta del archivo");
            }
        });
    } else {
        $('#alerta-editar').html('Por favor llene todos los campos');
        $('#alerta-editar').css('display', 'block');
    }
}