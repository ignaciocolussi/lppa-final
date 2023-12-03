// Obtengo el boton de abrir la tabla
let botonTabla = document.getElementById("verTabla");
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
    tabla.sort((a, b) => b.puntaje - a.puntaje);
    // relleno la tabla
    rellenarTabla();

}

function ordenarFechaYRellenar() {
   
    tabla.sort((a, b) => b.fecha - a.fecha);
    console.debug(tabla);
    rellenarTabla();
}

function rellenarTabla() {
    tablaPuntajes.innerHTML = "";
    tabla.forEach((puntaje) => {
        tablaPuntajes.innerHTML += `
        <tr>
          <td>${puntaje.jugador}</td>
          <td>${puntaje.puntaje}</td>
          <td>${puntaje.nivel}</td>
          <td>${new Date(puntaje.fecha).toLocaleDateString()}</td>
          <td>${new Date(puntaje.fecha).toLocaleTimeString()}</td>
        </tr>
      `;
    });
}
