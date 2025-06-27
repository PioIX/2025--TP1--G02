function getPassword() {
    return document.getElementById("password").value
}

function getEmail() {
    return document.getElementById("email").value
}

function getIdUsuario() {
    return document.getElementById("ingresoUsuario").value
}

function getNombreUsuario() {
    return document.getElementById("ingresoNombre").value
}

function getCorreo() {
    return document.getElementById("ingresoCorreo").value
}

function getIdPartida() {
    return document.getElementById("ingresoPartida").value
}

function getIdDificultad() {
    return document.getElementById("elegirDificultad").value
}

function getNombreDificultad() {
    return document.getElementById("nombreDificultad").value
}

function getIdJugador() {
    return document.getElementById("ingresoJugador").value
}

function getDescripcion() {
    return document.getElementById("ingresoDescripcion").value
}

function getIntentos() {
    return document.getElementById("ingresoIntentos").value
}

function getAcertado() {
    return document.getElementById("ingresoAcierto").value
}

function getFecha() {
    return document.getElementById("ingresoFecha").value
}

function getIdImagen() {
    return document.getElementById("ingresoImagen").value
}

function moverARegistro() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("registro-form").style.display = "block";
}

function moverALogin() {
  document.getElementById("registro-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

  