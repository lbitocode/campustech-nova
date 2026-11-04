// CampusTech UTP 2026 — Sesión 11: Fundamentos de JS
const NOMBRE_CONGRESO = 'CampusTech UTP 2026';
const FECHA_EVENTO = '14–16 Octubre 2026';
const PRECIO_ESTUDIANTE = 40;
const PRECIO_COMPLETO = 90;

console.log(`[Configuración cargada] Bienvenido a ${NOMBRE_CONGRESO} (${FECHA_EVENTO})`);
console.log(`Tarifas base: Estudiante S/ ${PRECIO_ESTUDIANTE} | Completo S/ ${PRECIO_COMPLETO}`);

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
