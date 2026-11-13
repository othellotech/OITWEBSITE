/* Shared behaviour for About + course pages (kept separate from script.js,
   whose homepage-only code expects elements that do not exist here). */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile / tablet menu
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('active', open);
      const icon = toggle.querySelector('i');
      if (icon) { icon.classList.toggle('fa-bars', !open); icon.classList.toggle('fa-times', open); }
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('active')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  }

  // Footer year
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Floating ENROL NOW links to the homepage form; hide it while the page's own CTA is visible
  const floatBtn = document.getElementById('enrolFloat');
  const cta = document.querySelector('.page-cta');
  if (floatBtn && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => floatBtn.classList.toggle('is-hidden', e.isIntersecting));
    }, { threshold: 0.25 }).observe(cta);
  }
});
