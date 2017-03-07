$(document).ready(function () {
    $("#btnLogin").click(function () {
        login();
    });
    $("#btnDesconectar").click(function () {
        logout();
    });
});


/*
funcion en ajax para realizar un login del usuario
*/
function login() {
    if (document.getElementById("cedula").value !== "" &&
            document.getElementById("password").value !== "") {
        $.ajax({
            type: 'post',
            url: "Ctl_login/login",
            data: { cedula: document.getElementById("cedula").value,
                password: document.getElementById("password").value},
            success: function (response) {
                if (response==0) {
                    $('#msj').html("Datos incorrectos");    
                }else if(response==-2){
                    $('#msj').html("Ya se te acabaron los dias de uso.");    
                }else if(response==1){
                    location.reload();
                }else{
                    alert("Bienvenido, "+response);
                    location.reload();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error destacado " + textStatus + "\nExcetion");
                alert("Verifique ruta del archivo " + errorThrown);
            }
        });
    } else {
        $('#alert-error').html('Por favor llene todos los campos');
        $('#alert-error').css('display', 'block');
    }
}

/*
Funion en ajax para realizar un desconectar del sistema
*/
function logout(){
    $.ajax({
        type: 'post',
        url: "ctl_usuario/logout",
        beforeSend: function () {
            //alert("Accion enviar");
        },
        data: {},
        success: function (data) {                
            window.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error destacado " + textStatus + "\nExcetion");
            alert("Verifique ruta del archivo " + errorThrown);
        }
    });
}
