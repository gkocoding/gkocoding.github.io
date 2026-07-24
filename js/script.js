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

// Hero load-in animation
const hero = document.querySelector('.hero');
requestAnimationFrame(() => {
  setTimeout(() => hero && hero.classList.add('is-loaded'), 100);
});

// Crosshair coordinate tracker (hero only, desktop only)
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

// Scroll reveal via IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Scrollspy: highlight active nav link
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('.nav__links a');

if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('data-section') === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  sections.forEach((s) => spyObserver.observe(s));
}

// Project card tilt-on-hover (desktop only)
if (window.matchMedia('(min-width: 981px)').matches) {
  document.querySelectorAll('.sheet').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-py * 6).toFixed(2);
      const rotateY = (px * 6).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
