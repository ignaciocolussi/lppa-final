'use-strict'

// Obtengo el boton de abrir la tabla
var botonTabla = document.getElementById("verTabla");
var modalTabla = document.getElementById("modalTabla");
var botonCerrarTabla = document.getElementById("cerrarTabla");
var botonOrdenarPuntaje = document.getElementById("ordenarPuntaje");
var botonOrdenarFecha = document.getElementById("ordenarFecha");
var tablaPuntajes = document.getElementById("tablaPosiciones").getElementsByTagName("tbody")[0];
var tabla = [];
//Suscribo a los eventos
botonTabla.addEventListener("click", abrirTabla);
botonCerrarTabla.addEventListener("click", cerrarTabla);
botonOrdenarPuntaje.addEventListener("click", ordenarPuntajeYRellenar);
botonOrdenarFecha.addEventListener("click", ordenarFechaYRellenar);

document.onload = iniciar();

// Funcion para abrir la tabla
function abrirTabla() {
    modalTabla.classList.remove("none")
    modalTabla.classList.add("fade-in-flex");
}

// Funcion para cerrar la tablaº
function cerrarTabla() {
  modalTabla.classList.remove("fade-in-flex");
  modalTabla.classList.add("fade-out");

}

function iniciar() {
    tabla = JSON.parse(localStorage.getItem("puntajes"));
    ordenarPuntajeYRellenar();
}

function ordenarPuntajeYRellenar() {
    tabla.sort(function(a, b) {
      return b.puntaje - a.puntaje;
  });
    // relleno la tabla
    rellenarTabla();

}

function ordenarFechaYRellenar() {
   
    tabla.sort(function(a, b) {
      return b.fecha - a.fecha;
  });
    console.debug(tabla);
    rellenarTabla();
}

function rellenarTabla() {
    tablaPuntajes.innerHTML = "";
    tabla.forEach(function(puntaje) {
      var row = document.createElement('tr');
  
      var tdJugador = document.createElement('td');
      tdJugador.textContent = puntaje.jugador;
      row.appendChild(tdJugador);
  
      var tdPuntaje = document.createElement('td');
      tdPuntaje.textContent = puntaje.puntaje;
      row.appendChild(tdPuntaje);
  
      var tdNivel = document.createElement('td');
      tdNivel.textContent = puntaje.nivel;
      row.appendChild(tdNivel);
  
      var tdFecha = document.createElement('td');
      tdFecha.textContent = new Date(puntaje.fecha).toLocaleDateString();
      row.appendChild(tdFecha);
  
      var tdHora = document.createElement('td');
      tdHora.textContent = new Date(puntaje.fecha).toLocaleTimeString();
      row.appendChild(tdHora);
  
      tablaPuntajes.appendChild(row);
  });
  
}
