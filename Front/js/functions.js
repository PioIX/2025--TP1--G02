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
    localStorage.setItem("usuarioActivo", nombre);
    window.location.href = "dificultades.html";
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

