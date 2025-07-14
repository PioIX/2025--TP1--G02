function mostrarDificultad() {
    let nivel = parseInt(localStorage.getItem("nivel"));
    console.log(nivel);
    setDivDificultad(nivel)
}

mostrarDificultad()