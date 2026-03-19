// ============================================
//   CarEstima — B2B Landing Page
//   app.js
// ============================================

// ── SCROLL PROGRESS ──
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progress.style.width = pct + '%';
});

// ── NAVBAR ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── ACTIVE NAV LINK ──
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id], div[id]').forEach(s => sectionObserver.observe(s));

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.problem-point, .feature-card, .step-card, .pricing-card, .testimonial-card, .reveal'
).forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTER ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = prefix + Math.floor(current).toLocaleString('fr-MA') + suffix;
    if (current >= target) clearInterval(timer);
  }, 20);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── MOCKUP FACTOR BAR ANIMATION ──
const mockupObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.mockup-factor-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, i * 200 + 400);
      });
      mockupObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.mockup-card').forEach(el => mockupObserver.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const success = document.getElementById('formSuccess');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = '✓ Message envoyé !';
      success.classList.add('show');
      setTimeout(() => {
        btn.textContent = 'Demander une démo';
        btn.disabled = false;
        success.classList.remove('show');
      }, 4000);
    }, 1200);
  });
}

// ── PRICING TOGGLE (Annual / Monthly) ──
const toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const isAnnual = btn.dataset.period === 'annual';
    document.querySelectorAll('.pricing-amount').forEach(el => {
      const monthly = parseInt(el.dataset.monthly);
      const annual = parseInt(el.dataset.annual);
      if (!isNaN(monthly) && !isNaN(annual)) {
        el.textContent = (isAnnual ? annual : monthly).toLocaleString('fr-MA') + ' DH';
      }
    });
    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = isAnnual ? '/mois · facturé annuellement' : '/mois';
    });
  });
});
