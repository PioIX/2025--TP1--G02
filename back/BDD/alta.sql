-- Tabla dificultades (no depende de ninguna)
CREATE TABLE dificultades (
    id_dificultad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla usuarios_partidas (independiente, ahora no tiene FK a partidas)
CREATE TABLE usuarios_partidas (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(100), 
    es_admin BOOLEAN DEFAULT FALSE
);

-- Tabla partidas (depende de usuarios_partidas)
CREATE TABLE partidas (
    id_partida INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    intentos INT DEFAULT 0,
    acertado BOOLEAN DEFAULT FALSE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios_partidas(id_usuario)
);

-- Tabla jugadores (depende de dificultades)
CREATE TABLE jugadores (
    id_jugador INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    id_partida INT NOT NULL,
    id_imagen INT NOT NULL,
    id_dificultad INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_dificultad) REFERENCES dificultades(id_dificultad)
);

-- Tabla imagenes (depende de jugadores)
CREATE TABLE imagenes (
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    id_jugador INT NOT NULL,
    img_jugador TEXT NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id_jugador)
);

INSERT INTO usuarios_partidas (nombre, correo, contraseña, es_admin)
VALUES ('admin', 'admin@ejemplo.com', "123", TRUE),
('Lautaro Amadey', 'lautaro@ejemplo.com', 'lautaro123', FALSE),
('Bautista Rizzo', 'bautista@ejemplo.com', 'bautista123', FALSE),
('Tomás Bourguet', 'tomas@ejemplo.com', 'tomas123', FALSE),
('Francisco Pérez', 'francisco@ejemplo.com', 'francisco123', FALSE),
('Nicolás Facón', 'nicolas@ejemplo.com', 'nicolas123', FALSE);

