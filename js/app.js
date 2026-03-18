// ============================================
//   AUTOMAROC — Main JavaScript
// ============================================

const WA_NUMBER = '33646064391';
const CITY = 'Casablanca, Maroc';

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Burger menu ----
function initBurger() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burger || !mobileMenu) return;
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
}

// ---- Language switcher ----
const translations = {
  fr: {
    nav_home: 'Accueil', nav_cars: 'Voitures', nav_contact: 'Contact',
    hero_badge: 'N°1 à Casablanca',
    hero_title_1: 'Trouvez votre', hero_title_2: 'voiture idéale',
    hero_sub: 'Plus de 50 voitures d\'occasion sélectionnées, vérifiées et garanties à Casablanca, Maroc.',
    hero_btn1: 'Voir nos voitures', hero_btn2: 'Nous contacter',
    stat1: 'Voitures', stat2: 'Clients satisfaits', stat3: 'Années d\'exp.',
    search_brand: 'Marque', search_model: 'Modèle', search_budget: 'Budget max', search_fuel: 'Carburant', search_btn: 'Rechercher',
    latest_tag: 'Annonces récentes', latest_title: 'Nos dernières voitures',
    why_tag: 'Pourquoi nous', why_title: 'La différence AutoMaroc',
    cta_title: 'Vous avez une question ?', cta_sub: 'Notre équipe répond en moins d\'une heure sur WhatsApp.',
    cta_btn1: 'Contacter sur WhatsApp', cta_btn2: 'Appeler maintenant',
    footer_desc: 'Votre spécialiste de la voiture d\'occasion à Casablanca. Qualité, transparence et confiance depuis 2015.',
    footer_links: 'Liens rapides', footer_contact: 'Contact',
    km: 'km', dh: 'DH', see_more: 'Voir toutes les voitures',
  },
  ar: {
    nav_home: 'الرئيسية', nav_cars: 'السيارات', nav_contact: 'اتصل بنا',
    hero_badge: 'الأول في الدار البيضاء',
    hero_title_1: 'اعثر على سيارتك', hero_title_2: 'المثالية',
    hero_sub: 'أكثر من 50 سيارة مستعملة مختارة وموثوقة في الدار البيضاء، المغرب.',
    hero_btn1: 'عرض سياراتنا', hero_btn2: 'تواصل معنا',
    stat1: 'سيارة', stat2: 'عميل راضٍ', stat3: 'سنوات خبرة',
    search_brand: 'الماركة', search_model: 'الموديل', search_budget: 'الميزانية', search_fuel: 'الوقود', search_btn: 'بحث',
    latest_tag: 'أحدث الإعلانات', latest_title: 'آخر سياراتنا',
    why_tag: 'لماذا نحن', why_title: 'مزايا أوتو ماروك',
    cta_title: 'هل لديك سؤال؟', cta_sub: 'فريقنا يجيبك خلال أقل من ساعة على واتساب.',
    cta_btn1: 'تواصل عبر واتساب', cta_btn2: 'اتصل الآن',
    footer_desc: 'متخصصون في السيارات المستعملة بالدار البيضاء. جودة وشفافية وثقة منذ 2015.',
    footer_links: 'روابط سريعة', footer_contact: 'اتصل بنا',
    km: 'كم', dh: 'درهم', see_more: 'عرض جميع السيارات',
  },
  en: {
    nav_home: 'Home', nav_cars: 'Cars', nav_contact: 'Contact',
    hero_badge: '#1 in Casablanca',
    hero_title_1: 'Find your', hero_title_2: 'perfect car',
    hero_sub: 'Over 50 selected, verified and guaranteed used cars in Casablanca, Morocco.',
    hero_btn1: 'View our cars', hero_btn2: 'Contact us',
    stat1: 'Cars', stat2: 'Happy clients', stat3: 'Years exp.',
    search_brand: 'Brand', search_model: 'Model', search_budget: 'Max budget', search_fuel: 'Fuel', search_btn: 'Search',
    latest_tag: 'Latest listings', latest_title: 'Our latest cars',
    why_tag: 'Why us', why_title: 'The AutoMaroc difference',
    cta_title: 'Have a question?', cta_sub: 'Our team replies in less than an hour on WhatsApp.',
    cta_btn1: 'Contact on WhatsApp', cta_btn2: 'Call now',
    footer_desc: 'Your used car specialist in Casablanca. Quality, transparency and trust since 2015.',
    footer_links: 'Quick links', footer_contact: 'Contact',
    km: 'km', dh: 'DH', see_more: 'View all cars',
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  if (typeof renderCars === 'function') renderCars();
}

// ---- Format number ----
function formatPrice(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
function formatKm(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

// ---- WhatsApp link ----
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ---- Render car card ----
function renderCarCard(car) {
  const t = translations[currentLang];
  const waMsg = currentLang === 'ar'
    ? `مرحباً، أنا مهتم بـ ${car.marque} ${car.modele} ${car.annee} بسعر ${formatPrice(car.prix)} ${t.dh}`
    : currentLang === 'en'
    ? `Hello, I'm interested in the ${car.marque} ${car.modele} ${car.annee} at ${formatPrice(car.prix)} ${t.dh}`
    : `Bonjour, je suis intéressé par la ${car.marque} ${car.modele} ${car.annee} à ${formatPrice(car.prix)} ${t.dh}`;

  return `
    <div class="car-card" onclick="window.location='voiture.html?id=${car.id}'">
      <div class="car-card-img">
        <img src="${car.images[0]}" alt="${car.marque} ${car.modele}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'">
        <span class="car-badge">${car.annee}</span>
        <span class="car-badge-fuel">${car.carburant}</span>
      </div>
      <div class="car-card-body">
        <div class="car-card-brand">${car.marque}</div>
        <div class="car-card-name">${car.modele}</div>
        <div class="car-card-specs">
          <div class="spec-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l3 3"/></svg>
            ${formatKm(car.km)} ${t.km}
          </div>
          <div class="spec-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            ${car.boite}
          </div>
          <div class="spec-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${car.ville}
          </div>
        </div>
        <div class="car-card-footer">
          <div class="car-price">${formatPrice(car.prix)} <span>${t.dh}</span></div>
          <div class="card-actions">
            <a href="${waLink(waMsg)}" target="_blank" class="btn-icon btn-icon-wa" onclick="event.stopPropagation()" title="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </a>
            <a href="tel:+${WA_NUMBER}" class="btn-icon btn-icon-call" onclick="event.stopPropagation()" title="Appeler">
              <svg width="18" height="18" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- Load cars from JSON ----
async function loadCars() {
  try {
    const res = await fetch('cars.json');
    return await res.json();
  } catch (e) {
    console.error('Error loading cars:', e);
    return [];
  }
}

// ---- Animate on scroll ----
function initScrollAnim() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.car-card, .why-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  setLang(currentLang);
  setTimeout(initScrollAnim, 300);
});
