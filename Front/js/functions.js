let idLogged = 0;
let users = [];

//  Cargar usuarios guardados 
window.onload = async () => {
  await fetchUsuariosDesdeDB();
};

async function fetchUsuariosDesdeDB() {
  try {
    const response = await fetch('http://localhost:4000/Usuarios_partidas');
    const data = await response.json();
    
    // (no están en la base)
    users = data.map(u => ({
      id: u.id_usuario,
      username: u.nombre,
      email: u.correo,
      es_admin: u.es_admin,
      password: "1234" 
    }));

    console.log("Usuarios cargados desde la base:", users);
  } catch (error) {
    console.error("Error al cargar usuarios desde la base:", error);
  }
}


// ==== LÓGICA DE LOGIN ====
function existUser(password, email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (users[i].password === password) {
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
  const password = getPassword();

  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, password }),
    });

    const result = await response.json();

    if (result.ok) {
      localStorage.setItem("usuarioActivo", result.usuario.nombre);
      return true;
    } else {
      alert("Usuario o contraseña incorrectos");
      return false;
    }

  } catch (error) {
    console.error("Error al loguear:", error);
    return false;
  }
}


async function newUser(password, email, username) {
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
    password: password,
  };

  const success = await usuarios(nuevoUsuario);

  if (success) {
    // Simulamos contraseña guardada
    users.push({
      id: id,
      username: username,
      email: email,
      password: password,
      es_admin: false
    });

    localStorage.setItem("user", JSON.stringify(nuevoUsuario));
    return id;
  } else {
    return -1;
  }
}


function handleLogin() {
  if (login()) {
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
    password: getPassword()
  };

  const success = await usuarios(datos);

  if (success) {
    alert("¡Usuario registrado correctamente!");
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


function mostrarNivel(nivel) {
  const titulo = document.getElementById('titulo-nivel');
  let texto = '';

  switch (nivel) {
    case 1:
      texto = 'NIVEL 1: FÁCIL 🏀';
      break;
    case 2:
      texto = 'NIVEL 2: MEDIO 🧠';
      break;
    case 3:
      texto = 'NIVEL 3: DIFÍCIL 🔥';
      break;
    case 4:
      texto = 'NIVEL 4: EXTREMO 🏆';
      break;
    default:
      texto = 'Selecciona un nivel';
  }

  titulo.textContent = texto;
}
