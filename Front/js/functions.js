function getDificultadFromQuery() {
  const params = new URLSearchParams(window.location.search)
  return params.get('dificultad')
}
// Cambia las imágenes y el texto de nivel según el jugador recibido por query string
async function  traerJugadoresBDD(dificultad) {
  try {
    const response = await fetch(`http://localhost:4000/jugadores?dificultad=${dificultad}`);
    if (!response.ok) {
      throw new Error('Error al obtener los jugadores');
    }
    const data = await response.json();
    console.log("Jugadores cargados:", data);
    localStorage.setItem('jugadores', JSON.stringify(data)); // Guarda los jugadores en localStorage
    return data;
  } catch (error) {
    console.error("Error al cargar jugadores:", error);
    return [];
  }
}
async function setFotosYTextoNivel() {
  const dificultad = getDificultadFromQuery();
  const jugadores = await traerJugadoresBDD(dificultad);

  // Inicializar el índice del jugador actual si no está definido
  if (localStorage.getItem('jugadorActual') === null) {
    localStorage.setItem('jugadorActual', '0');
  }

  let jugadorActual = parseInt(localStorage.getItem('jugadorActual'));
  actualizarJugador(jugadorActual); // Cargar el jugador actual
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

  const respuesta = input.value.trim().toLowerCase(); // Respuesta del usuario
  const jugadores = JSON.parse(localStorage.getItem('jugadores')); // Jugadores desde localStorage
  const jugadorActual = parseInt(localStorage.getItem('jugadorActual')) || 0; // Índice del jugador actual
  const jugador = jugadores[jugadorActual]; // Jugador actual

  console.log("Respuesta ingresada:", respuesta);
  console.log("Jugador actual:", jugador.nombre.trim().toLowerCase());

  // Comparar con el nombre del jugador
  if (respuesta === jugador.nombre.trim().toLowerCase()) {
    console.log("Respuesta correcta");
    localStorage.setItem('respuestaCorrecta', 'true');
    window.location.href = 'correcto - incorrecto.html'; // Redirige a la pantalla de correcto
  } else {
    console.log("Respuesta incorrecta");
    localStorage.setItem('respuestaCorrecta', 'false');
    window.location.href = 'correcto - incorrecto.html'; // Redirige a la pantalla de incorrecto
  }
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
  const jugadores = JSON.parse(localStorage.getItem('jugadores')); // Lista de jugadores del nivel actual
  let jugadorActual = parseInt(localStorage.getItem('jugadorActual')) || 0; // Índice del jugador actual

  jugadorActual++; // Avanzar al siguiente jugador

  if (jugadorActual < jugadores.length) {
    // Si hay más jugadores, actualizar el índice y cargar el siguiente jugador
    localStorage.setItem('jugadorActual', jugadorActual);
    actualizarJugador(jugadorActual);
  } else {
    // Si no hay más jugadores, mostrar un mensaje o redirigir
    alert('¡Has completado este nivel!');
    localStorage.removeItem('jugadorActual'); // Reiniciar el índice
    window.location.href = 'dificultades.html'; // Redirigir a la selección de niveles
  }
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

function actualizarJugador(indice) {
  const jugadores = JSON.parse(localStorage.getItem('jugadores')); // Lista de jugadores del nivel actual
  const jugador = jugadores[indice]; // Jugador actual
  const dificultad = getDificultadFromQuery();

  // Actualizar las imágenes del jugador actual
  for (let i = 1; i <= 4; i++) {
    const img = document.getElementById('img' + i);
    if (img) {
      img.src = dificultad === 'facil'
        ? `jugadoresfotos/${jugador.nombre}${i}.png`
        : `jugadoresfotos/${jugador.nombre}${dificultad}${i}.png`;
    }
  }

  // Limpiar el campo de texto de respuesta
  const input = document.getElementById('respuesta');
  if (input) input.value = '';
}