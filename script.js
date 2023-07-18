// Establezo las variables del juego
var secuencia = [];
var secuenciaJugador = [];
var nivel = 0;
var timer;
var juegoPausado = false;
var juegoFinalizado = false;
var mostrandoSecuencia = false;
var puntaje = 0;
var tiempoRestante = 20;

// Capturo elementos del DOM para manipular mas tarde
var botones = document.getElementsByClassName('boton');
var puntajeValor = document.getElementById('puntajeValor');
var botonInicio = document.getElementById('inicio');
var botonPausa = document.getElementById('pausa');
var botonReinicio = document.getElementById('reinicio');
var mensaje = document.getElementById('info');
var tiempoValor = document.getElementById('tiempo');

// Agrego los eventos a los botones
for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener('click', handleButtonClick);
}

botonInicio.addEventListener('click', iniciarJuego);
botonPausa.addEventListener('click', togglePausa);
botonReinicio.addEventListener('click', reiniciarJuego);

// Handler para los clicks de los botones
function handleButtonClick(event) {
  if (mostrandoSecuencia || juegoPausado || juegoFinalizado) return;

  var boton = event.target;
  var indiceBoton = Array.from(botones).indexOf(boton) + 1;
  feedbackBoton(boton);

  secuenciaJugador.push(indiceBoton);
  var esCorrecto = checkearSecuencia();

  if (!esCorrecto) {
    terminarJuego();
    return;
  }

  puntaje++;
  puntajeValor.textContent = puntaje;

  if (secuenciaJugador.length === secuencia.length) {
    nivel++;
    secuenciaJugador = [];
    mensaje.textContent = 'Felicitaciones!. Siguiente nivel ==> ' + nivel;
    pararTemporizador();
    generarSiguienteBoton();
    reiniciarTemporizador();
    setTimeout(MostrarSecuencia, 1000);
  }
}

// Mostrar feedback cuando se hace click en un boton
function feedbackBoton(boton) {
  boton.style.opacity = 1;
  setTimeout(function() {
    boton.style.opacity = 0.3;
  }, 300);
}

// Funcion para checkear que la sucuencia que introdujo el jugador es correcta
function checkearSecuencia() {
  for (var i = 0; i < secuenciaJugador.length; i++) {
    if (secuenciaJugador[i] !== secuencia[i]) {
      return false;
    }
  }
  return true;
}

// Mostrar la sucuencia generada al jugador para que la repita
function MostrarSecuencia() {
  mostrandoSecuencia = true;
  mensaje.textContent = 'Debes memorizar la secuncia y repetirla.';

  var indice = 0;
  var intervalo = setInterval(function() {
    var indiceBoton = secuencia[indice];
    feedbackBoton(botones[indiceBoton - 1]);

    indice++;
    if (indice >= secuencia.length) {
      clearInterval(intervalo);
      mostrandoSecuencia = false;
      mensaje.textContent = 'Repite la secuencia!';
      iniciarTemporizador();
    }
  }, 1000);
}

// Generar el siguiente boton de la secuencia
function generarSiguienteBoton() {
  var indiceBoton = Math.floor(Math.random() * 4) + 1;
  secuencia.push(indiceBoton);
}

// Reiniciar el temporizador
function reiniciarTemporizador() {
  tiempoRestante = 20;
  tiempoValor.textContent = tiempoRestante;
  pararTemporizador();
}

// Iniciar el juego
function iniciarJuego() {
  if (juegoFinalizado) {
    reiniciarJuego();
  }

  nivel = 1;
  puntaje = 0;
  secuencia = [];
  secuenciaJugador = [];
  puntajeValor.textContent = puntaje;
  mensaje.textContent = 'Debes memorizar la secuencia y repetirla';
  botonInicio.disabled = true;
  botonPausa.disabled = false;
  botonReinicio.disabled = false;
  timer = null;

  generarSiguienteBoton();
  MostrarSecuencia();
}

// Funcion para finalizar el juego
function terminarJuego() {
  juegoFinalizado = true;
  mensaje.textContent = 'Fin del juego! Tu puntaje: ' + puntaje;
  botonInicio.disabled = false;
  botonPausa.disabled = true;
  botonReinicio.disabled = false;
  pararTemporizador();
  juegoPausado = true;
}

// Funciones del temporizador
function iniciarTemporizador() {
 timer = setInterval(function() {
    tiempoRestante--;
    tiempoValor.textContent = tiempoRestante;

    if (tiempoRestante === 0) {
      pararTemporizador();
      terminarJuego();
    }
  }, 1000);
}

function pararTemporizador() {
  clearInterval(timer);
}

// Pausa el juego
function togglePausa() {
  if (juegoPausado) {
    juegoPausado = false;
    botonPausa.textContent = 'Pausa';
    mensaje.textContent = 'Debes memorizar la secuencia y repetirla';
    iniciarTemporizador();
  } else {
    juegoPausado = true;
    botonPausa.textContent = 'Continuar';
    mensaje.textContent = 'Juego en pausa';
    pararTemporizador();
  }
}

// Restart the game
function reiniciarJuego() {
  juegoFinalizado = false;
  juegoPausado = false;
  iniciarJuego();
}
