function mostrarDificultad() {
    let nivel = parseInt(localStorage.getItem("nivel"));
    console.log(nivel);
    setDivDificultad(nivel)
}

mostrarDificultad()

// Redirigir según nivel al hacer click en CONTINUAR
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('continuarBtn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      let nivel = parseInt(localStorage.getItem('nivel'));
      if (!nivel || nivel === 1) {
        window.location.href = 'jugadores.html?jugador=messi';
      } else if (nivel === 2) {
        window.location.href = 'jugadores.html?jugador=bellingham';
      }
      // Puedes agregar más niveles aquí si lo necesitas
    });
  }
});