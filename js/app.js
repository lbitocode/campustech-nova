// CampusTech UTP 2026 — app.js
// Header con estado de scroll, menú hamburguesa (drawer), halo de las tarjetas de track,
// filtros por track (expositores, talleres) y pestañas por día (cronograma).

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('main-nav');
  const hamburger = document.querySelector('.hamburger-btn');

  // ---------- Header: sombra al hacer scroll ----------
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Menú hamburguesa ----------
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  };

  hamburger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));

  // Cerrar con Escape, al elegir un enlace o al tocar el velo detrás del drawer
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  // (el velo es un ::before del <nav>, así que su clic llega al nav pero fuera de su caja)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.clientX < nav.getBoundingClientRect().left) setMenu(false);
  });

  // ---------- Tarjetas de track: halo que sigue al cursor ----------
  document.querySelectorAll('.track-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---------- Filtros por track ----------
  // <div class="filters" data-filter-target="#grid" data-count="#titulo" data-singular="…" data-plural="…">
  //   <button class="btn-filter" data-filter="todos|software|redes|seguridad|sistemas">
  // Cada hijo de la grilla lleva data-track.
  document.querySelectorAll('[data-filter-target]').forEach((bar) => {
    const grid = document.querySelector(bar.dataset.filterTarget);
    const count = document.querySelector(bar.dataset.count);
    const buttons = bar.querySelectorAll('.btn-filter');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        let visible = 0;
        [...grid.children].forEach((item) => {
          const show = filter === 'todos' || item.dataset.track === filter;
          item.hidden = !show;
          if (show) {
            visible++;
            // Reinicia la animación de entrada
            item.style.animation = 'none';
            void item.offsetWidth;
            item.style.animation = '';
          }
        });

        if (count) count.textContent = visible + ' ' + (visible === 1 ? bar.dataset.singular : bar.dataset.plural);
      });
    });
  });

  // ---------- Pestañas (cronograma por día) ----------
  // Cada botón role="tab" apunta a su panel con aria-controls.
  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = list.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          const selected = t === tab;
          t.classList.toggle('active', selected);
          t.setAttribute('aria-selected', String(selected));
          document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
        });
      });
    });
  });
});
