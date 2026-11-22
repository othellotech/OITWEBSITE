/* Floating "Chat with an OIT Adviser on WhatsApp" widget.
   - The message bubble stays visible on every page while scrolling (like GoMyCode).
   - It only tucks into the round icon while the admission form (#register) is on screen,
     so it never covers the form, and returns as soon as the visitor scrolls on.
   The widget's WhatsApp link is separate from every other WhatsApp link on the site. */
(function () {
  function init() {
    var el = document.getElementById('oitAdviser');
    if (!el) return;

    var link = el.querySelector('a');
    if (link) {
      link.addEventListener('click', function () {
        // Only reports if the site owner has analytics installed; does nothing otherwise.
        try { if (typeof window.gtag === 'function') window.gtag('event', 'adviser_whatsapp_click', { page_path: location.pathname }); } catch (e) {}
      });
    }

    var reg = document.getElementById('register');
    if (reg && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) el.classList.add('is-collapsed'); else el.classList.remove('is-collapsed');
        });
      }, { threshold: 0.15 }).observe(reg);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
