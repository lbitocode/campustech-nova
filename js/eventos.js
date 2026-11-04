// CampusTech UTP 2026 — Sesión 12: Arreglos y Control de Flujo
const ponencias = [
  { id: 1, titulo: 'Arquitecturas Cloud-Native en el Perú', ponente: 'Lucía Paredes', track: 'sistemas', cupos: 45 },
  { id: 2, titulo: 'Zero Trust en Redes Universitarias', ponente: 'Camila Rojas', track: 'seguridad', cupos: 30 },
  { id: 3, titulo: 'SD-WAN y Automatización con Python', ponente: 'Valeria Chávez', track: 'redes', cupos: 25 },
  { id: 4, titulo: 'Taller: APIs con TypeScript y Testing', ponente: 'Martín Torres', track: 'software', cupos: 30 }
];

console.table(ponencias);

function simularReserva(id) {
  const sesion = ponencias.find(p => p.id === id);
  if (!sesion) return;
  if (sesion.cupos > 0) {
    const desea = confirm(`¿Deseas reservar tu plaza para "${sesion.titulo}"?\nExpositor: ${sesion.ponente}\nCupos: ${sesion.cupos}`);
    if (desea) {
      sesion.cupos--;
      alert(`¡Reserva confirmada! Quedan ${sesion.cupos} cupos.`);
    }
  } else {
    alert('Lo sentimos, este taller no tiene cupos disponibles.');
  }
}
