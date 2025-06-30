let idLogged = 0;
let users = [];

// ✅ Cargar usuarios guardados 
window.onload = () => {
  const guardados = localStorage.getItem("usuarios");
  if (guardados) {
    users = JSON.parse(guardados);
  }
};

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

function login() {
  let result = existUser(getPassword(), getEmail());
  if (result > 0) {
    idLogged = result;
    return true;
  } else if (result === 0) {
    alert("Contraseña incorrecta.");
    return false;
  } else {
    alert("Usuario no existe.");
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
        id_partida: getIdPartida()
    };

    const success = await usuarios(nuevoUsuario);

    if (success) {
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


function handleRegister() {
  let result = newUser(getPassword(), getCorreo(), getNombreUsuario());
  if (result !== -1) {
    alert("¡Usuario creado exitosamente!");
    window.location.href = "dificultades.html";
  } else {
    alert("Correo ya registrado.");
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