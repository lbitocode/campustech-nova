// CampusTech UTP 2026 — modal.js
// Ventana modal con la biografía de cada expositor (expositores.html).
// Los datos se leen de la propia tarjeta: badge, nombre, cargo, tema y data-bio.

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('bio-modal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close-btn');
  const badge = overlay.querySelector('[data-modal="badge"]');
  const name = overlay.querySelector('[data-modal="name"]');
  const role = overlay.querySelector('[data-modal="role"]');
  const bio = overlay.querySelector('[data-modal="bio"]');
  const topic = overlay.querySelector('[data-modal="topic"]');
  let lastFocus = null;

  const open = (card) => {
    const cardBadge = card.querySelector('.badge');
    badge.className = cardBadge.className;
    badge.textContent = cardBadge.textContent;
    name.textContent = card.querySelector('h3').textContent;
    role.textContent = card.querySelector('.speaker-role').textContent;
    topic.textContent = card.querySelector('.speaker-topic').textContent;
    bio.textContent = card.dataset.bio;

    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('[data-open-bio]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.closest('.speaker-card')));
  });

  closeBtn.addEventListener('click', close);
  // Clic fuera de la ventana (sobre el fondo oscuro)
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
});
