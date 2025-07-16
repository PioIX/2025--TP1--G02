// Cambia las imágenes y el texto de nivel según el jugador recibido por query string
function setFotosYTextoNivel() {
  function getJugadorFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('jugador') || 'messi';
  }
  const jugador = getJugadorFromQuery();
  let nivelTexto = '';
  let ruta = '';
  if (jugador === 'bellingham') {
    ruta = 'jugadoresfotos/bellinghammedio';
    nivelTexto = 'NIVEL MEDIO';
  } else if (jugador === 'gyokeres') {
    ruta = 'jugadoresfotos/gyokeresdificil';
    nivelTexto = 'NIVEL DIFÍCIL';
  } else if (jugador === 'maravilla') {
    ruta = 'jugadoresfotos/maravillaextremo';
    nivelTexto = 'NIVEL EXTREMO';
  } else {
    ruta = 'jugadoresfotos/messi';
    nivelTexto = 'NIVEL FÁCIL';
  }
  for (let i = 1; i <= 4; i++) {
    const img = document.getElementById('img' + i);
    if (img) img.src = `${ruta}${i}.png`;
  }
  const nivelElem = document.querySelector('.nivel');
  if (nivelElem) nivelElem.textContent = nivelTexto;
}
let idLogged = 0;
let users = [];

//  Cargar usuarios guardados 
window.onload = async () => {
  await fetchUsuariosDesdeDB();
};

async function fetchUsuariosDesdeDB() {
  try {
    const response = await fetch(`http://localhost:4000/Usuarios_partidas`);
    const data = await response.json();
    
    // (no están en la base)
    users = data.map(u => ({
      id: u.id_usuario,
      username: u.nombre,
      email: u.correo,
      contraseña: u.contraseña,
      es_admin: u.es_admin
    }));

    console.log("Usuarios cargados desde la base:", users);
  } catch (error) {
    console.error("Error al cargar usuarios desde la base:", error);
  }
}


// ==== LÓGICA DE LOGIN ====
function existUser(contraseña, email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (users[i].contraseña === contraseña) {
        idLogged = users[i].id;
        return idLogged;
      } else {
        return 0; // contraseña incorrecta
      }
    }
  }
  return -1; // usuario no existe
}

async function login() {
  const correo = getEmail();
  const contraseña = getPassword();

  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contraseña }),
    });

    const result = await response.json();

    if (result.ok) {
      localStorage.setItem("usuarioActivo", result.usuario.nombre);
      window.location.href = "dificultades.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error("Error al loguear: " + error.message);
  }
}

async function newUser(contraseña, email, username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return -1;
    }
  }

  let id = getIdUsuario(); 
  const nuevoUsuario = {
    id_usuario: id,
    nombre: username,
    correo: email,
    contraseña: contraseña,
  };

  const success = await usuarios(nuevoUsuario);

  if (success) {
    // Simulamos contraseña guardada
    users.push({
      id: id,
      username: username,
      email: email,
      contraseña: contraseña,
      es_admin: false
    });

    localStorage.setItem("user", JSON.stringify(nuevoUsuario));
    return id;
  } else {
    return -1;
  }
}


async function handleLogin() {
  if (await login()) {
    const usuario = users.find(u => u.email === getEmail());
    if (usuario) {
      localStorage.setItem("usuarioActivo", usuario.username);
    }
    window.location.href = "dificultades.html";
  }
}


async function handleRegister() {

  let datos = {
    nombre: getNombreUsuario(),
    correo: getCorreo(),
    contraseña: getPassword()

  };

  const success = await usuarios(datos);

  if (success) {
    alert("¡Usuario registrado correctamente!");
    window.location.href = "dificultades.html";
    localStorage.setItem("usuarioActivo", nombre);
  } else {
    alert("Hubo un error al registrar.");
  }
}

function mostrarUsuarioActivo() {
  const usuario = localStorage.getItem("usuarioActivo");
  const contenedor = document.getElementById("usuarioActivo");
  if (usuario && contenedor) {
    contenedor.innerText = `Bienvenido, ${usuario}`;
  }
}

function salirSinEliminar() {
  window.location.href = "login.html";
}



function adminUser(contraseña, email) {
  try {
    let id = existUser(contraseña,email)
    let usuario = users[usuarios.id - 1];
    if (usuario.es_admin) {
      // Redirigir al panel administrador
      window.location.href = 'admin_panel.html';
    } else {
      // Redirigir al juego
      window.location.href = "dificultades.html";
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}

function elegirNivel(nivel) {
  localStorage.setItem("nivel", nivel);
  location.href = "Niveles.html"
}

function mostrarCorrecta() {
  document.getElementById('pantalla-correcta').style.display = 'flex';
  document.getElementById('pantalla-incorrecta').style.display = 'none';
}

function mostrarIncorrecta() {
  document.getElementById('pantalla-correcta').style.display = 'none';
  document.getElementById('pantalla-incorrecta').style.display = 'flex';
}

function verificarRespuesta() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const respuesta = input.value.trim().toLowerCase();
  // Detectar el jugador actual por query string
  function getJugadorFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('jugador') || 'messi';
  }
  const jugador = getJugadorFromQuery();
  let correctas = [];
  if (jugador === 'bellingham') {
    correctas = [
      'bellingham',
      'jude bellingham',
      'jude victor william bellingham',
      'jude victor bellingham',
      'jude william bellingham'
    ];
  } else if (jugador === 'gyokeres') {
    correctas = [
      'gyokeres',
      'victor gyokeres',
      'viktor gyokeres',
      'gyökeres'
    ];
  } else if (jugador === 'maravilla') {
    correctas = [
      'maravilla martinez',
      'adrian maravilla martinez',
      'adrian emmanuel martinez',
      'adrian emmanuel maravilla martinez'
    ];
  } else {
    correctas = [
      'lionel messi',
      'messi',
      'lionel andres messi',
      'lionel andres messi cuccittini'
    ];
  }

  // Normalizar respuesta y comparar con todas las variantes correctas
  const normalizada = respuesta.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  let esCorrecto = false;
  for (let variante of correctas) {
    let varianteNorm = variante.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    if (normalizada === varianteNorm) {
      esCorrecto = true;
      break;
    }
  }
  if (esCorrecto) {
    localStorage.setItem('respuestaCorrecta', 'true');
  } else {
    localStorage.setItem('respuestaCorrecta', 'false');
  }
  window.location.href = 'correcto - incorrecto.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('respuesta');
  if (input) {
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        verificarRespuesta();
      }
    });
  }

  const pantallaCorrecta = document.getElementById('pantalla-correcta');
  const pantallaIncorrecta = document.getElementById('pantalla-incorrecta');
  const respuesta = localStorage.getItem('respuestaCorrecta');

  if (pantallaCorrecta && pantallaIncorrecta && respuesta !== null) {
    if (respuesta === 'true') {
      pantallaCorrecta.style.display = 'flex';
      pantallaIncorrecta.style.display = 'none';
    } else {
      pantallaCorrecta.style.display = 'none';
      pantallaIncorrecta.style.display = 'flex';
    }

    localStorage.removeItem('respuestaCorrecta');
  }
});

function proximoJugador() {
  let indice = parseInt(localStorage.getItem('jugadorActual') || '0');
  indice++;
  if (indice >= jugadores.length) indice = 0; // o mostrar "fin"
  localStorage.setItem('jugadorActual', indice);
  window.location.href = 'jugadores.html';
}

function cargarJugador(indice) {
  const jugador = jugadores[indice];
  const imagenes = document.querySelectorAll('.imagenes img');
  for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].src = jugador.imagenes[i];
    imagenes[i].alt = `imagen ${i + 1}`;
  }
  // Limpiar input
  const input = document.getElementById('respuesta');
  if (input) input.value = '';
}