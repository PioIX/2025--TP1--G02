var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
});
app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

//----------------------------------------------------------------------------------------------------

app.get('/Dificultades', async function (req, res) {
    let respuesta;
    if (req.query.id_dificultad != undefined){
        respuesta = await realizarQuery(`SELECT * FROM dificultades WHERE id_dificultad=${req.query.id_dificultad}`)
    } else {
        respuesta = await realizarQuery(`SELECT * FROM dificultades`)
    }
    res.send(respuesta);

});

app.post('/Jugadores', async (req, res) => {
    const existe = await realizarQuery(`SELECT * FROM jugadores WHERE id_jugador=${req.body.id_jugador}`);
    if (existe.length > 0) {
        return res.send("Ya existe un jugador con ese id");
    
    } else{
        await realizarQuery(`
        INSERT INTO partidas (id_jugador, nombre, id_partida, id_imagen, id_dificultad, descripcion)
        VALUES (${req.body.id_jugador}, "${req.body.nombre}", ${req.body.id_partida}, ${req.body.id_imagen}, ${req.body.id_dificultad}, "${req.body.descripcion}"  )
    `);
    res.send("Jugador agregada");
}
});

app.get('/Jugadores', async function (req, res) {
    let respuesta;
    if (req.query.id_jugador != undefined){
        respuesta = await realizarQuery(`SELECT * FROM jugadores WHERE id_jugador=${req.query.id_jugador}`)
    } else {
        respuesta = await realizarQuery(`SELECT * FROM jugadores`)
    }
    res.send(respuesta);

});


app.post('/Partidas', async (req, res) => {
    const existe = await realizarQuery(`SELECT * FROM partidas WHERE id_partida=${req.body.id_partida}`);
    if (existe.length > 0) {
        return res.send("Ya existe una partida con ese id");
    
    } else{
        await realizarQuery(`
        INSERT INTO partidas (id_partida, id_jugador, intentos, acertado, fecha)
        VALUES (${req.body.id_partida}, ${req.body.id_jugador}, ${req.body.intentos}, ${req.body.acertado}, "${req.body.fecha}" )
    `);
    res.send("Partida agregada");
}
});

app.get('/Partidas', async function (req, res) {
    let respuesta;
    if (req.query.id_partida != undefined){
        respuesta = await realizarQuery(`SELECT * FROM partidas WHERE id_partida=${req.query.id_partida}`)
    } else {
        respuesta = await realizarQuery(`SELECT * FROM partidas`)
    }
    res.send(respuesta);

});


app.post('/Usuarios_partidas', async (req, res) => {
    const existe = await realizarQuery(`SELECT * FROM usuarios_partidas WHERE id_usuario=${req.body.id_usuario}`);
    if (existe.length > 0) {
        return res.send({res:"Ya existe un usuario con ese id", ok:false});
    
    } else{
        await realizarQuery(`
        INSERT INTO usuarios_partidas (id_usuario,nombre, correo)
        VALUES (${req.body.id_usuario}, "${req.body.nombre}", "${req.body.correo}")
    `);
    res.send({res:"Usuario agregado", ok:true});
}
});

app.get('/Usuarios_partidas', async function (req, res) {
    let respuesta;
    if (req.query.id_usuario != undefined){
        respuesta = await realizarQuery(`SELECT * FROM usuarios_partidas WHERE id_usuario=${req.query.id_usuario}`)
    } else {
        respuesta = await realizarQuery(`SELECT * FROM usuarios_partidas`)
    }
    res.send(respuesta);

});


app.post('/Imagenes', async (req, res) => {
    const existe = await realizarQuery(`SELECT * FROM imagenes WHERE id_imagen=${req.body.id_imagen}`);
    if (existe.length > 0) {
        return res.send("Ya existe una imagen con ese id");
    
    } else{
        await realizarQuery(`
        INSERT INTO imagenes (id_imagen , id_jugador, img_jugador)
        VALUES (${req.body.id_imagen }, ${req.body.id_jugador}, "${req.body.img_jugador}" )
    `);
    res.send("Imagen agregada");
}
});

app.get('/Imagenes', async function (req, res) {
    let respuesta;
    if (req.query.id_imagen != undefined){
        respuesta = await realizarQuery(`SELECT * FROM imagenes WHERE id_imagen=${req.query.id_imagen}`)
    } else {
        respuesta = await realizarQuery(`SELECT * FROM imagenes`)
    }
    res.send(respuesta);

});


/*
app.put('/Mundiales', async (req, res) => {

    await realizarQuery(`
        UPDATE mundiales SET 
        sede="${req.body.sede}", 
        estadio_final="${req.body.estadio_final}",
        resultado_final="${req.body.resultado_final}"
        WHERE año=${req.body.año}
    `);
    res.send("Mundial actualizado");
});

app.put('/Selecciones', async (req, res) => {
    await realizarQuery(`
        UPDATE selecciones SET 
        presidente="${req.body.presidente}", 
        continente="${req.body.continente}", 
        tecnico="${req.body.tecnico}" 
        WHERE nombre="${req.body.nombre}"
    `);
    res.send("Selección actualizada");
});

app.put('/Goleadores', async (req, res) => {
    console.log(req.body)
    await realizarQuery(`
        UPDATE goleadores SET 
        año=${req.body.año}
        WHERE id_jugador="${req.body.id_jugador}"
    `);
    res.send({mensaje: "Goleador actualizado"});
});

app.put('/SeleccionesXmundiales', async (req, res) => {
    await realizarQuery(`
        UPDATE seleccionesXmundiales SET 
        nombre="${req.body.nombre}" 
        WHERE nombre="${req.body.nombre}" AND año=${req.body.año}
    `);
    res.send("Participación actualizada");
});


app.delete('/Mundiales', async (req, res) => {
    await realizarQuery(`DELETE FROM mundiales WHERE año=${req.body.año}`);
    res.send("Mundial eliminado");
});

app.delete('/Selecciones', async (req, res) => {
    await realizarQuery(`DELETE FROM selecciones WHERE nombre="${req.body.nombre}"`);
    res.send("Selección eliminada");
});

app.delete('/Goleadores', async (req, res) => {
    await realizarQuery(`DELETE FROM goleadores WHERE id_jugador=${req.body.id_jugador}`);
    res.send("Goleador eliminado");
});

app.delete('/SeleccionesXmundiales', async (req, res) => {
    await realizarQuery(`
        DELETE FROM seleccionesXmundiales WHERE nombre="${req.body.nombre}" AND año=${req.body.año}
    `);
    res.send("Participación eliminada");
});


app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
});
*/