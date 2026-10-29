document.addEventListener('DOMContentLoaded', () => {
  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 800,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
  });

  // Success Stories section animations
  sr.reveal('[data-sr="stories"]', { delay: 100 });
  sr.reveal('[data-sr="stories-title"]', { delay: 200 });
  sr.reveal('[data-sr="stories-subtitle"]', { delay: 300 });
  sr.reveal('[data-sr="stories-swiper"]', { delay: 400 });

  // Initialize Swiper for Success Stories
  const swiper = new Swiper('.stories__swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000, // Auto-scroll every 5 seconds
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });

  // Handle video play button clicks
  document.querySelectorAll('.card__play').forEach(button => {
    button.addEventListener('click', () => {
      const videoUrl = button.getAttribute('data-video');
      if (videoUrl) {
        window.open(videoUrl, '_blank');
      } else {
        console.error('No video URL found for button:', button);
      }
    });
  });
});