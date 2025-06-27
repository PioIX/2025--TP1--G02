let users = [];
let idLogged = 0;

// ==== OBTENER DATOS DEL FORMULARIO ====
function getPassword() {
    const loginPass = document.getElementById("loginPassword");
    const registroPass = document.getElementById("registroPassword");
    return loginPass?.offsetParent !== null ? loginPass.value : registroPass.value;
  }
  

// ==== LÓGICA DE LOGIN ====
function existUser(password, email) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        if (users[i].password === password) {
          idLogged = users[i].id;
          return idLogged;
        } else {
          return 0; // Contraseña incorrecta
        }
      }
    }
    return -1; // Usuario no existe
  }

  function login() {
    let result = existUser(getPassword(), getEmail());
    if (result > 0) {
      idLogged = result;
      return true;
    } else if (result === 0) {
      alert("Contraseña Incorrecta. Ingrese nuevamente.");
      return false;
    } else {
      alert("Usuario no existe. Ingrese nuevamente.");
      return false;
    }
  }

  function newUser(password, email, username) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return -1; // Ya existe
      }
    }
    let id = getIdUsuario();
    users.push({ id: id, email: email, password: password, username: username });
    return id;
  }

function Register() {
    let result = newUser(getPassword(), getCorreo(), getNombreUsuario());
    if (result === -1) {
      alert("Error: el correo ya está registrado.");
    } else {
      alert("¡Usuario creado exitosamente!");
      window.location.href = "../dificultades.html"; // ✅ Redirección
    }
  }
  
  function handleLogin() {
    if (login()) {
      // ✅ REDIRECCIÓN FUNCIONANDO DESDE LOGIN
      window.location.href = "dificultades.html";
    }
  }
  
  function handleRegister() {
    let result = newUser(getPassword(), getCorreo(), getNombreUsuario());
    if (result === -1) {
      alert("Error: el correo ya está registrado.");
    } else {
      idLogged = result;
      // ✅ REDIRECCIÓN FUNCIONANDO DESDE REGISTRO
      window.location.href = "dificultades.html";
    }
  }