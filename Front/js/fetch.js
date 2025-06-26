async function usuarios(datos){
    try {
        response = await fetch(`http://localhost:4000/Usuarios_partidas`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datos) //JSON.stringify me convierte de objeto a JSON
        })
        //El response me imprime el JSON no tiene utilidad real
        console.log(response)
        //Desarmo el JSON y pasa a ser un objeto
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo agregar el usuario")
        console.log(error)
    }
}

function crear() {
    let datos={
        id_usuario: getIdUsuario(),
        nombre: getNombreUsuario(),
        correo: getCorreo(),
        id_partida: getIdPartida()
    }
    usuarios(datos)
}


async function tablaUsuarios() {
    let response = await fetch('http://localhost:4000/Usuarios_partidas', {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Desarmo el JSON y pasa a ser un objeto
    let usuarios = await response.json()
    console.log("Usuarios_partidas:",usuarios);
}

//---------------------------------------------------------------------------------------------------//

async function dificultades(datosD){
    try {
        response = await fetch(`http://localhost:4000/Dificultades`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datosD) //JSON.stringify me convierte de objeto a JSON
        })
        //El response me imprime el JSON no tiene utilidad real
        console.log(response)
        //Desarmo el JSON y pasa a ser un objeto
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo seleccionar la dificultad")
        console.log(error)
    }
}

function crearDificultad() {
    let datosD={
        id_dificultad: getIdDificultad(),
        nombre: getNombreDificultad(),
    }
    dificultades(datosD)
}

async function tabladificultades() {
    let response = await fetch('http://localhost:4000/Dificultades', {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Desarmo el JSON y pasa a ser un objeto
    let dificultades = await response.json()
    console.log("Dificultades:",dificultades);
}

//---------------------------------------------------------------------------------------------------//

async function jugadores(datosJ){
    try {
        response = await fetch(`http://localhost:4000/Jugadores`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datosJ) //JSON.stringify me convierte de objeto a JSON
        })
        //El response me imprime el JSON no tiene utilidad real
        console.log(response)
        //Desarmo el JSON y pasa a ser un objeto
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo seleccionar el jugador")
        console.log(error)
    }
}

function crearJugadores() {
    let datosJ={
        id_jugador: getIdJugador(),
        descripcion: getDescripcion(),
        id_dificultad: getIdDificultad(),
    }
    jugadores(datosJ)
}

async function tablajugadores() {
    let response = await fetch('http://localhost:4000/Jugadores', {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Desarmo el JSON y pasa a ser un objeto
    let jugadores = await response.json()
    console.log("Jugadores:", jugadores);
}

//---------------------------------------------------------------------------------------------------//

async function partidas(datosP){
    try {
        response = await fetch(`http://localhost:4000/Partidas`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datosP) //JSON.stringify me convierte de objeto a JSON
        })
        //El response me imprime el JSON no tiene utilidad real
        console.log(response)
        //Desarmo el JSON y pasa a ser un objeto
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo seleccionar la partida")
        console.log(error)
    }
}

function crearPartidas() {
    let datosP={
        id_partida: getIdPartida(),
        id_jugador: getIdJugador(),
        intentos: getIntentos(),
        acertado: getAcertado(),
        fecha: getFecha(),
    }
    partidas(datosP)
}

async function tablapartidas() {
    let response = await fetch('http://localhost:4000/Partidas', {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Desarmo el JSON y pasa a ser un objeto
    let partidas = await response.json()
    console.log("Partidas:", partidas);
}



async function imagenes(datosI){
    try {
        response = await fetch(`http://localhost:4000/Imagenes`,{
            method:"POST", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(datosI) //JSON.stringify me convierte de objeto a JSON
        })
        //El response me imprime el JSON no tiene utilidad real
        console.log(response)
        //Desarmo el JSON y pasa a ser un objeto
        let result = await response.json()
        console.log(result)
    } catch (error) {
        alert("No se pudo seleccionar la imagen")
        console.log(error)
    }
}

function crearImagenes() {
    let datosI={
        id_jugador: getIdJugador(),
        id_imagen: getIdImagen(),
        imgJugador: getImgJugador(),
    }
    partidas(datosI)
}

async function tablaimagenes() {
    let response = await fetch('http://localhost:4000/Imagenes', {
        method: "GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Desarmo el JSON y pasa a ser un objeto
    let imagenes = await response.json()
    console.log("Imagenes:", imagenes);
}