// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Crosshair coordinate tracker (hero section only, desktop only)
const hero = document.querySelector('.hero');
const crosshair = document.getElementById('crosshair');
const coordLabel = document.getElementById('crosshairCoord');

if (hero && crosshair && coordLabel && window.matchMedia('(min-width: 781px)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    crosshair.style.transform = `translate(${x}px, ${y}px)`;
    crosshair.classList.add('crosshair--active');
    coordLabel.textContent = `X${String(x).padStart(3, '0')} Y${String(y).padStart(3, '0')}`;
  });

  hero.addEventListener('mouseleave', () => {
    crosshair.classList.remove('crosshair--active');
  });
}
