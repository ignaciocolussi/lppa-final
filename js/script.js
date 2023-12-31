"use-strict";
console.debug("Juego Simon Dice");

// Establezo las variables del juego
var secuencia = [];
var secuenciaJugador = [];
var nivel = 0;
var timer;
var juegoPausado = false;
var juegoFinalizado = false;
var mostrandoSecuencia = false;
var puntaje = 0;
var penalizacion = 0;
var tiempoRestante = 20;

// Capturo elementos del DOM para manipular mas tarde
var modal = document.getElementsByClassName("modal")[0];
var botonModal = document.getElementsByClassName("btn-inicial")[0];
var inputInfoJugador = document.getElementById("nombreJugador");
var seccionJuego = document.getElementById("juego");
var botones = document.getElementsByClassName("boton");
var puntajeValor = document.getElementById("puntajeValor");
var nivelValor = document.getElementById("nivelValor");
var botonInicio = document.getElementById("inicio");
var botonPausa = document.getElementById("pausa");
var botonReanudarModal = document.getElementById("reanudar");
var modalEventos = document.getElementById("eventos");
var mensaje = document.getElementById("info");
var tiempoValor = document.getElementById("tiempo");
var nivelMaximoValor = document.getElementById("nivelMaximoValor");
var puntajeMaximoValor = document.getElementById("puntajeMaximoValor");
var infoTiempo = document.getElementById("infoTiempo");

// Agrego los eventos
inputInfoJugador.addEventListener("keyup", handlerInputJugador);
botonModal.addEventListener("click", handlerModalClick);

for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", handlerBotonClick);
}

botonInicio.addEventListener("click", iniciarJuego);
botonPausa.addEventListener("click", togglePausa);
botonReanudarModal.addEventListener("click", togglePausa);

function handlerInputJugador(event) {
  var nombreJugador = event.target.value;
  botonModal.disabled = nombreJugador.length < 3;
}

function handlerModalClick() {
  var nombreJugador = inputInfoJugador.value;
  localStorage.setItem("nombreJugador", nombreJugador);
  botonInicio.disabled = false;
  botonPausa.disabled = true;
  modal.classList.add("fade-out");
}

function handlerBotonClick(event) {
  var boton;
  var indiceBoton;
  var esCorrecto;
  if (mostrandoSecuencia || juegoPausado || juegoFinalizado || !timer) return;

  boton = event.target;
  indiceBoton = Array.from(botones).indexOf(boton) + 1;
  feedbackBoton(boton);

  secuenciaJugador.push(indiceBoton);
  esCorrecto = checkearSecuencia();

  if (!esCorrecto) {
    terminarJuego();
    return;
  }

  puntaje = puntaje + secuenciaJugador.length;
  puntajeValor.textContent = puntaje;

  if (secuenciaJugador.length === secuencia.length) {
    nivel++;
    secuenciaJugador = [];
    mensaje.textContent = "Felicitaciones!. Siguiente nivel: " + nivel;
    nivelValor.textContent = nivel;
    pararTemporizador();
    generarSiguienteBoton();
    reiniciarTemporizador();
    setTimeout(mostrarSecuencia, 2000);
  }
}

// Mostrar feedback cuando se hace click en un boton
function feedbackBoton(boton) {
  boton.style.opacity = 1;
  setTimeout(function () {
    boton.style.opacity = 0.3;
  }, 800);
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
function mostrarSecuencia() {
  var indice = 0;
  var intervalo;
  mostrandoSecuencia = true;

  // recorro todos los botones para sacar la propiedad focus de cada uno
  for (const boton of botones) {
    boton.blur();
  }
  intervalo = setInterval(function () {
    var indiceBoton = secuencia[indice];
    feedbackBoton(botones[indiceBoton - 1]);

    indice++;
    if (indice >= secuencia.length) {
      clearInterval(intervalo);
      mostrandoSecuencia = false;
      mensaje.textContent = "Repite la secuencia!";
      iniciarTemporizador();
    }
  }, 1500);
}

// Generar el siguiente boton de la secuencia
function generarSiguienteBoton() {
  var indiceBoton = Math.floor(Math.random() * 4) + 1;
  secuencia.push(indiceBoton);
}

// Reiniciar el temporizador
function reiniciarTemporizador() {
  tiempoValor.style.color = "#ccc";
  tiempoRestante = 20;
  tiempoValor.textContent = tiempoRestante;
  pararTemporizador();
}

// Funciones del temporizador
function pararTemporizador() {
  clearInterval(timer);
}

function iniciarTemporizador() {
  timer = setInterval(function () {
    tiempoRestante--;
    tiempoValor.textContent = tiempoRestante;
    if (tiempoRestante <= 10) {
      tiempoValor.style.color = "red";
    }

    if (tiempoRestante === 0) {
      pararTemporizador();
      terminarJuego();
    }
  }, 1000);
}

// Guardar el mayor puntaje en el local storage
function guardarMayorPuntaje(puntaje) {
  var puntajes = localStorage.getItem("puntajes");
  var resultados = JSON.parse(puntajes);
  // Encontrar el mayor puntaje dentro del array resultados
  var res = resultados.reduce(function (prev, current) {
    return prev.puntaje > current.puntaje ? prev : current;
  });

  if (!localStorage.getItem("puntajes") || puntaje.puntaje > res.puntaje) {
    var jugador = localStorage.getItem("nombreJugador");
    puntaje.jugador = jugador;
    resultados.push(puntaje);
    localStorage.setItem("puntajes", JSON.stringify(resultados));
    obtenerMayorPuntaje();
  }
}

// Obtener el mayor puntaje del local storage y mostrarlo
function obtenerMayorPuntaje() {
  var puntajes = localStorage.getItem("puntajes");
  var resultados;
  var res;
  if (!puntajes) {
    nivelMaximoValor.textContent = 0;
    puntajeMaximoValor.textContent = 0;

    localStorage.setItem(
      "puntajes",
      JSON.stringify([
        { puntaje: 0, nivel: 0, jugador: "nadie", fecha: Date.now() },
      ])
    );
  } else {
    resultados = JSON.parse(puntajes);
    res = resultados.reduce(function (prev, current) {
      return prev.puntaje > current.puntaje ? prev : current;
    });
    console.debug(res);
    nivelMaximoValor.textContent = res.nivel;
    puntajeMaximoValor.textContent = res.puntaje;
  }
}

function calcularPenalizacion() {
  if (tiempoRestante <= 9) {
    penalizacion = penalizacion + 10 - tiempoRestante;
  }
}

// Pausa el juego
function togglePausa() {
  if (juegoFinalizado) {
    modalEventos.classList.remove("fade-in-flex");
    modalEventos.classList.add("fade-out");
    reiniciarJuego();
    return;
  }

  if (juegoPausado) {
    juegoPausado = false;
    modalEventos.classList.remove("fade-in-flex");
    modalEventos.classList.add("fade-out");
    botonPausa.textContent = "Pausa";
    iniciarTemporizador();
  } else {
    juegoPausado = true;
    botonPausa.textContent = "Continuar";

    mensaje.textContent = "Juego en pausa";
    modalEventos.classList.remove("none");
    modalEventos.classList.remove("fade-out");
    modalEventos.classList.add("fade-in-flex");
    pararTemporizador();
  }
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
  nivelValor.textContent = nivel;
  botonInicio.disabled = true;
  botonPausa.disabled = false;
  timer = null;
  infoTiempo.classList.remove("none");
  obtenerMayorPuntaje();
  calcularPenalizacion();
  generarSiguienteBoton();
  mostrarSecuencia();
}

function terminarJuego() {
  juegoFinalizado = true;
  mensaje.innerHTML = "Fin del juego! <p> Tu puntaje: " + puntaje;
  botonInicio.disabled = false;
  botonPausa.disabled = true;
  pararTemporizador();
  calcularPenalizacion();
  puntaje = puntaje - penalizacion;
  guardarMayorPuntaje({ puntaje: puntaje, nivel: nivel, fecha: Date.now() });
  juegoPausado = true;
  modalEventos.classList.remove("none");
  modalEventos.classList.add("fade-in");
  modalEventos.classList.remove("fade-out");
}

// Reiniciar el juego
function reiniciarJuego() {
  juegoFinalizado = false;
  juegoPausado = false;
  reiniciarTemporizador();
  iniciarJuego();
}
