--Tabla dificultades
CREATE TABLE dificultades (
    id_dificultad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla usuarios_partidas (con campo password y es_admin)
CREATE TABLE usuarios_partidas (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    es_admin BOOLEAN DEFAULT FALSE
);

-- Tabla partidas (referencia a usuarios_partidas)
CREATE TABLE partidas (
    id_partida INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    intentos INT DEFAULT 0,
    acertado BOOLEAN DEFAULT FALSE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios_partidas(id_usuario)
);

-- Tabla jugadores (referencia a dificultades)
CREATE TABLE jugadores (
    id_jugador INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    id_partida INT NOT NULL,
    id_imagen INT NOT NULL,
    id_dificultad INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_dificultad) REFERENCES dificultades(id_dificultad)
);

-- Tabla imagenes (referencia a jugadores)
CREATE TABLE imagenes (
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    id_jugador INT NOT NULL,
    img_jugador TEXT NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id_jugador)
);

INSERT INTO usuarios_partidas

