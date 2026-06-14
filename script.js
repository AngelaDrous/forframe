// ===== NAV SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== FADE IN ON SCROLL =====
const fadeTargets = document.querySelectorAll('.experience-item, .service-item, .about-img, .about-text, .gallery-section');
fadeTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeTargets.forEach(el => observer.observe(el));

// ===== SCROLL TO SECTION FROM URL PARAM =====
// e.g. gallery.html?section=weddings scrolls to #section-weddings
const urlParams = new URLSearchParams(window.location.search);
const urlSection = urlParams.get('filter') || urlParams.get('section');
if (urlSection) {
  window.addEventListener('load', () => {
    const target = document.getElementById('section-' + urlSection);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  });
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxCategory.textContent = item.dataset.category.replace('-', ' & ');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].dataset.src;
  lightboxCategory.textContent = galleryItems[currentIndex].dataset.category.replace('-', ' & ');
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].dataset.src;
  lightboxCategory.textContent = galleryItems[currentIndex].dataset.category.replace('-', ' & ');
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
if (lightboxNext) lightboxNext.addEventListener('click', showNext);

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});
