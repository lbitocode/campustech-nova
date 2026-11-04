/**
 * RENDERIZADO DINÁMICO DEL DOM Y LISTENERS - CAMPUSTECH UTP
 * Sesión 13: Manipulación del DOM en tiempo real
 */

const listaConferencias = [
    { id: 1, titulo: "Microservicios Resilientes e IA", ponente: "Dra. Elena Ruiz", track: "software", sala: "Auditorio 1", cupos: 45, precio: 50.00 },
    { id: 2, titulo: "Arquitecturas Cloud y Redes SDN", ponente: "Ing. Carlos Vega", track: "redes", sala: "Lab Cómputo 4", cupos: 20, precio: 60.00 },
    { id: 3, titulo: "Defensa Activa ante Ransomware", ponente: "Mag. Andrés Soto", track: "seguridad", sala: "Lab Seguridad 2", cupos: 15, precio: 75.00 },
    { id: 4, titulo: "Data Governance y Big Data", ponente: "Ing. Sofía Mendoza", track: "sistemas", sala: "Auditorio Central", cupos: 60, precio: 45.00 },
    { id: 5, titulo: "DevSecOps en Pipelines CI/CD", ponente: "Ing. Marcos Díaz", track: "seguridad", sala: "Lab Redes 1", cupos: 0, precio: 65.00 },
    { id: 6, titulo: "Frontend Moderno con JS Puro", ponente: "Lic. Pamela Castro", track: "software", sala: "Lab Cómputo 2", cupos: 30, precio: 40.00 }
];

const contenedorEventos = document.querySelector("#contenedor-eventos");
const contadorEventos = document.querySelector("#contador-eventos");
const botonesFiltro = document.querySelectorAll(".btn-filter");

function renderizarTarjetas(lista) {
    if (!contenedorEventos) return;

    if (lista.length === 0) {
        contenedorEventos.innerHTML = '<p class="no-results">No hay conferencias para este filtro.</p>';
        if (contadorEventos) contadorEventos.textContent = "Mostrando 0 conferencias.";
        return;
    }

    const htmlCards = lista.map(c => `
        <article class="speaker-card" data-id="${c.id}">
            <div class="speaker-body">
                <span class="badge ${c.track}">${c.track.toUpperCase()}</span>
                <h3 style="margin-top: 10px;">${c.titulo}</h3>
                <p class="speaker-role">Expositor: <strong>${c.ponente}</strong></p>
                <p class="speaker-topic">Sala: ${c.sala} | Cupos: <strong>${c.cupos}</strong></p>
                <button class="btn-card" onclick="reservar(${c.id})">
                    ${c.cupos > 0 ? `Inscribirme (S/ ${c.precio.toFixed(2)})` : "Agotado"}
                </button>
            </div>
        </article>
    `).join("");

    contenedorEventos.innerHTML = htmlCards;
    if (contadorEventos) contadorEventos.textContent = `Mostrando ${lista.length} conferencia(s) disponible(s).`;
}

function reservar(id) {
    const item = listaConferencias.find(c => c.id === id);
    if (item && item.cupos > 0) {
        item.cupos--;
        alert(`¡Inscripción confirmada para "${item.titulo}"! Quedan ${item.cupos} cupos.`);
        renderizarTarjetas(listaConferencias);
    } else {
        alert("Cupos agotados.");
    }
}

// Configurar listeners en botones de filtro
if (botonesFiltro.length > 0) {
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const track = boton.getAttribute("data-track");
            if (track === "todos") {
                renderizarTarjetas(listaConferencias);
            } else {
                renderizarTarjetas(listaConferencias.filter(c => c.track === track));
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarTarjetas(listaConferencias);
});
