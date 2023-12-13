var form = document.getElementById("contacto");
var botonEnviar = document.getElementById("enviar");
var nombre = document.getElementById("nombre");
var email = document.getElementById("email");
var mensaje = document.getElementById("mensaje");
var errorNombre = document.getElementById("errorNombre");
var errorEmail = document.getElementById("errorEmail");
var errorMensaje = document.getElementById("errorMensaje");

botonEnviar.addEventListener("click", function(event) {
    event.preventDefault();
    enviarEmail();
    }
);

function validarFormulario() {
    if(nombre.value == ""){
        errorNombre.innerHTML = "Debe ingresar un nombre";
        errorNombre.style.color = "red";
        nombre.classList.add("invalid");
        return false;
    }else if(email.value == "" || email.value.indexOf("@") == -1){
        errorEmail.innerHTML = "Debe ingresar un email";
        errorEmail.style.color = "red";
        email.classList.add("invalid");
        return false;
    }else if(mensaje.value == ""){
        errorMensaje.innerHTML = "Debe ingresar un mensaje";
        errorMensaje.style.color = "red";
        mensaje.classList.add("invalid");
        return false;
    }else{
            
        return true;
    }
}

function reiniciarValidaciones() {
    errorNombre.innerHTML = "";
    errorEmail.innerHTML = "";
    errorMensaje.innerHTML = "";
    nombre.classList.remove("invalid");
    email.classList.remove("invalid");
    mensaje.classList.remove("invalid");
}


function enviarEmail() {
   reiniciarValidaciones();
    if(!validarFormulario()){
        return;
    }
    var mensajeFinal = "Nombre: " + nombre.value + "%0D%0A" + "Email: " + email.value + "%0D%0A" + "Mensaje: " + mensaje.value;
    window.location.href = 'mailto:ignaciocolussi@outlook.com' + '?subject=Contacto desde el sitio web&body=' + mensajeFinal;
    form.reset();
}

