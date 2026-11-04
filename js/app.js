// CampusTech UTP 2026 — Sesión 13: Manipulación del DOM y Filtros
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Filtros por track (DOM Manipulation)
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
          if (show) visible++;
        });

        if (count) count.textContent = visible + ' ' + (visible === 1 ? bar.dataset.singular : bar.dataset.plural);
      });
    });
  });

  // Pestañas por día (cronograma)
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
