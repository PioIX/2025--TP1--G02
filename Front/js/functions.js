let idLogged = 0;

function existUser(password, email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            if (users[i].password == password) {
                idLogged = users[i].id
                return idLogged
            } else {
                return 0
            }
        }
    }
    return -1
}

function login() {
    let result = existUser(getPassword(), getEmail())
    if (result > 0) {
        idLogged = result;
        return true;
    } else if (result == 0) {
        alert("Contraseña Incorrecta", "Ingrese nuevamente");
        return false
    } else {
        alert("Usuario no existe", "Ingrese nuevamente")
        return false;
    }

}

function Register() {
    let result = newUser(getPassword(), getEmail(), getUser()) 
    if (result == -1) {
        alert("Error", "No se pudo crear el usuario")
    } else {
        login();
    }
}
