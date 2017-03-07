$(document).ready(function () {
    $("#btnInsert").click(function () {
        insertUser();
    });
   cargarDepartamento();
   cargarTipos();
});

function cargarTipos() {
    $.ajax({
        type: 'post',
        url: "ctl_usuario/listTypes",
        beforeSend: function () {

        },
        data: {},
        success: function (data) {

            var info = JSON.parse(data);

            //var select = $("#selDepartamento");
            var select = document.getElementById("selTipo");

            //Limpiar select
            while (select.length > 1) {
                select.remove(select.length - 1);
            }

            //Se llena el select
            if (data.length > 0) {
                var opt = null;
                for (var i = 0; i < info.length; i++) {
                    opt = new Option(info[i].descripcion, info[i].id);
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

function cargarDepartamento() {
    $.ajax({
        type: 'post',
        url: "ctl_location/listDeparments",
        beforeSend: function () {

        },
        data: {},
        success: function (data) {

            var info = JSON.parse(data);

            //var select = $("#selDepartamento");
            var select = document.getElementById("selDepartamento");

            //Limpiar select
            while (select.length > 1) {
                select.remove(select.length - 1);
            }

            //Se llena el select
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



function cargarMunicipio() {

    var idDepartamento = $("#selDepartamento").val();
    

    $.ajax({
        type: 'post',
        url: "ctl_location/listCities",
        beforeSend: function () {

        },
        data: {id_depto: idDepartamento},
        success: function (data) {

            if(data !== "-1"){
                var info = JSON.parse(data);

                //var select = $("#selDepartamento");
                var select = document.getElementById("selMunicipio");

                //Limpiar select
                while (select.length > 1) {
                    select.remove(select.length - 1);
                }

                //Se llena el select
                if (data.length > 0) {
                    var opt = null;
                    for (var i = 0; i < info.length; i++) {
                        opt = new Option(info[i].nombre, info[i].id);
                        select.options[select.length] = opt;
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
            alert("Verifique la ruta del archivo");
        }
    });
}

function insertUser(){
    var identificacion = $("#txtIdentificacion").val();
    var nombre = $("#txtNombre").val();
    var nickname = $("#txtNickname").val();
    var direccion = $("#txtDireccion").val();
    var departamento = $("#selDepartamento").val();
    var ciudad = $("#selMunicipio").val();
    var tipo = $("#selTipo").val();
    var entidad = $("#txtEntidad").val();
    var contrasenhia = $("#txtContrasenhia").val();
    var verificarContrasenhia = $("#txtVerificarContrasenhia").val();

    if(identificacion !== "" && nombre !== "" && nickname !== "" && direccion !== "" &&
        departamento !== "-1" && ciudad !== "-1" && tipo !== "-1" && entidad !== "" 
        && contrasenhia !== "" && verificarContrasenhia !== ""){

        if(contrasenhia === verificarContrasenhia){

            $.ajax({
                type: 'post',
                url: "ctl_usuario/insertUser",
                beforeSend: function () {
                    //alert("Accion enviar");
                },
                data: {identificacion: identificacion,nombre: nombre,
                    nickname: nickname,direccion: direccion,ciudad: ciudad,
                    tipo: tipo, entidad: entidad, contrasenhia:contrasenhia},
                success: function (data) {
                    if (data !== "-1" && data !== "-2" && data !== "-3" && data !== "-4") {
                        window.location.reload();
                    } else if(data === "-4"){
                        $('#alert-error-register').html("Error inesperado");
                        $('#alert-error-register').css('display', 'block');
                    } else if(data === "-3"){
                        $('#alert-error-register').html('El nickname ya esta en uso');
                        $('#alert-error-register').css('display', 'block');
                        $("#txtNickname").val("");
                    } else if(data === "-2"){
                        $('#alert-error-register').html("Ya hay un registro con esta identificacion "+identificacion);
                        $('#alert-error-register').css('display', 'block');
                        $("#txtIdentificacion").val("");
                    } else if(data === "-1"){
                        $('#alert-error-register').html("Datos vacios");
                        $('#alert-error-register').css('display', 'block');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error destacado " + textStatus + "\nExcetion");
                    alert("Verifique ruta del archivo " + errorThrown);
                }
            });

        }else{
            $('#alert-error-register').html("Las contraseñas no coinciden");
            $('#alert-error-register').css('display', 'block');
        }

    }else{
        $('#alert-error-register').html("Diligencie la informacion pertinente");
        $('#alert-error-register').css('display', 'block');
    }
}


function limpiarFormulario(){
    $("#txtIdentificacion").val("");
    $("#txtNombre").val("");
    $("#txtNickname").val("");
    $("#txtDireccion").val("");
    $("#selDepartamento").val("-1");
    $("#selMunicipio").val("-1");
    $("#selTipo").val("-1");
    $("#txtEntidad").val("");
    $("#txtContrasenhia").val("");
    $("#txtVerificarContrasenhia").val("");
}