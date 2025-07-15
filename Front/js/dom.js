function getEmail() {
  const loginMail = document.getElementById("loginEmail");
  const registroMail = document.getElementById("ingresoCorreo");
  return loginMail?.offsetParent !== null ? loginMail.value : registroMail.value;
}

function getPassword() {
  const loginPass = document.getElementById("loginPassword");
  const registroPass = document.getElementById("registroPassword");
  return loginPass?.offsetParent !== null ? loginPass.value : registroPass.value;
}

function getIdUsuario() {
  return document.getElementById("ingresoUsuario").value;
}

function getNombreUsuario() {
  return document.getElementById("ingresoNombre").value;
}

function getCorreo() {
  return document.getElementById("ingresoCorreo").value;
}

function getIdPartida() {
  return document.getElementById("ingresoPartida").value;
}

function getIdDificultad() {
  return document.getElementById("elegirDificultad").value;
}

function getNombreDificultad() {
  return document.getElementById("nombreDificultad").value;
}

function getIdJugador() {
  return document.getElementById("ingresoJugador").value;
}

function getDescripcion() {
  return document.getElementById("ingresoDescripcion").value;
}

function getIntentos() {
  return document.getElementById("ingresoIntentos").value;
}

function getAcertado() {
  return document.getElementById("ingresoAcierto").value;
}

function getFecha() {
  return document.getElementById("ingresoFecha").value;
}

function getIdImagen() {
  return document.getElementById("ingresoImagen").value;
}

function moverARegistro() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("registro-form").style.display = "block";
}

function moverALogin() {
  document.getElementById("registro-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function setDivDificultad(dificultad) {
  let texto = "Fácil"
  switch(dificultad) {
    case 1:
      texto = "Fácil"
      break;
    case 2:
      texto = "Medio"
      break;
    case 3:
      texto = "Difícil"
      break;
    case 4:
      texto = "Extremo"
      break;
    default:
      texto = "Fácil"
      break;
  }

  document.getElementById("dificultad").innerHTML = '<h1>Nivel ' + dificultad + " : " + texto + '</h1>'
}

  const pantallaCorrecta = document.getElementById('pantalla-correcta');
  const pantallaIncorrecta = document.getElementById('pantalla-incorrecta');
  const respuestaGuardada = localStorage.getItem('respuestaCorrecta');

  if (pantallaCorrecta && pantallaIncorrecta) {
    if (respuestaGuardada === 'true') {
      pantallaCorrecta.style.display = 'flex';
      pantallaIncorrecta.style.display = 'none';
    } else {
      pantallaCorrecta.style.display = 'none';
      pantallaIncorrecta.style.display = 'flex';
    }
  }
;
