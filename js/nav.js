/* Dropdown menus for the main navigation (desktop hover/keyboard, mobile accordions).
   Shared by the homepage and the About / course pages. */
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.has-dropdown'));
  if (!items.length) return;
  const desktop = () => window.matchMedia('(min-width: 1180px)').matches;

  const closeAll = (except) => {
    items.forEach(li => {
      if (li === except) return;
      li.classList.remove('open');
      const b = li.querySelector('.dropdown-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  };

  items.forEach(li => {
    const btn = li.querySelector('.dropdown-toggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !li.classList.contains('open');
      closeAll(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    li.addEventListener('mouseenter', () => { if (desktop()) btn.setAttribute('aria-expanded', 'true'); });
    li.addEventListener('mouseleave', () => { if (desktop() && !li.classList.contains('open')) btn.setAttribute('aria-expanded', 'false'); });
    li.querySelectorAll('.dropdown a').forEach(a => a.addEventListener('click', () => closeAll()));
  });

  document.addEventListener('click', (e) => { if (!e.target.closest('.has-dropdown')) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = items.find(li => li.classList.contains('open'));
    closeAll();
    if (open) { const b = open.querySelector('.dropdown-toggle'); if (b) b.focus(); }
  });
});
