document.documentElement.classList.remove('no-js');

(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SCROLL_THRESHOLD = 400; // px past the top before header/nav swap fires

    /* ---------- Hero refs ---------- */
    const heroWordmark = document.getElementById('heroWordmark');
    const heroImage = document.querySelector('.hero__image');
    const siteHeader = document.getElementById('siteHeader');
    const siteNav = document.getElementById('siteNav');

    /* ---------- Header/Nav scroll transition ---------- */
    // Hero opacity is now handled by the scrub ScrollTrigger below, not here.
    // This function only controls header/nav visibility (snap, not scrub).
    let isScrolled = false;

    function applyScrolledState(scrolled) {
        if (scrolled === isScrolled) return;
        isScrolled = scrolled;

        if (scrolled) {
            siteHeader.classList.add('is-visible');
            siteNav.classList.add('is-visible');
            siteHeader.setAttribute('aria-hidden', 'false');
            siteNav.setAttribute('aria-hidden', 'false');
            menuTrigger.classList.add('is-visible');
        } else {
            siteHeader.classList.remove('is-visible');
            siteNav.classList.remove('is-visible');
            siteHeader.setAttribute('aria-hidden', 'true');
            siteNav.setAttribute('aria-hidden', 'true');
            menuTrigger.classList.remove('is-visible');
        }
    }

    let scrollTicking = false;
    function onScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(() => {
            applyScrolledState(window.scrollY > SCROLL_THRESHOLD);
            scrollTicking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

/* ---------- Mobile menu ---------- */
const menuTrigger = document.getElementById('menuTrigger');
const menuOverlay = document.getElementById('menuOverlay');
const menuOverlayClose = document.getElementById('menuOverlayClose');

function openMenu() {
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuTrigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuTrigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

menuTrigger.addEventListener('click', openMenu);
menuOverlayClose.addEventListener('click', closeMenu);

menuOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
        closeMenu();
    }
});



    /* ---------- Lightbox ---------- */
const SHOOTS = {
    'moritz-rax': {
        title: 'Moritz at Rax Alpe',
        date: '2025',
        folder: 'portrait/moritz-rax',
        cover: 'christianneitzel_moritz_rax-1.jpg',
        images: [
            'christianneitzel_moritz_rax-1.jpg',
            'christianneitzel_moritz_rax-2.jpg',
            'christianneitzel_moritz_rax-3.jpg',
            'christianneitzel_moritz_rax-4.jpg',
            'christianneitzel_moritz_rax-5.jpg',
            'christianneitzel_moritz_rax-6.jpg',
            'christianneitzel_moritz_rax-7.jpg',
            'christianneitzel_moritz_rax-8.jpg',
            'christianneitzel_moritz_rax-9.jpg',
            'christianneitzel_moritz_rax-10.jpg',
            'christianneitzel_moritz_rax-11.jpg',
            'christianneitzel_moritz_rax-12.jpg',
            'christianneitzel_moritz_rax-13.jpg',
            'christianneitzel_moritz_rax-14.jpg',
            'christianneitzel_moritz_rax-15.jpg',
            'christianneitzel_moritz_rax-16.jpg',
            'christianneitzel_moritz_rax-17.jpg',
            'christianneitzel_moritz_rax-18.jpg',
            'christianneitzel_moritz_rax-19.jpg',
        ],
    },
    'anna-albertina': {
        title: 'Anna at Albertina Vienna',
        date: '2025',
        folder: 'portrait/anna/anna-albertina',
        cover: 'christianneitzel_anna-albertina-1.jpg',
        images: [
            'christianneitzel_anna-albertina-1.jpg',
            'christianneitzel_anna-albertina-2.jpg',
            'christianneitzel_anna-albertina-3.jpg',
            'christianneitzel_anna-albertina-4.jpg',
            'christianneitzel_anna-albertina-5.jpg',
        ],
    },
    'hirohato-bridge': {
        title: 'Hiro Hato "Done hibernating"',
        date: '2026',
        folder: 'portrait/hiro-hato/hiro-bridge',
        cover: 'christianneitzel_hirohato-bridge-8.jpg',
        images: [
            'christianneitzel_hirohato-bridge-8.jpg',
            'christianneitzel_hirohato-bridge-3.jpg',
            'christianneitzel_hirohato-bridge-4.jpg',
            'christianneitzel_hirohato-bridge-5.jpg',
            'christianneitzel_hirohato-bridge-6.jpg',
            'christianneitzel_hirohato-bridge-7.jpg',
            'christianneitzel_hirohato-bridge-9.jpg',
            'christianneitzel_hirohato-bridge-10.jpg',
            'christianneitzel_hirohato-bridge-11.jpg',
            'christianneitzel_hirohato-bridge-1.jpg',
            'christianneitzel_hirohato-bridge-2.jpg',
        ],
    },
    'anna-chair': {
        title: 'Anna',
        date: '2026',
        folder: 'portrait/anna/anna-chair',
        cover: 'christianneitzel_anna-chair-1.jpg',
        images: [
            'christianneitzel_anna-chair-1.jpg',
            'christianneitzel_anna-chair-2.jpg',
            'christianneitzel_anna-chair-3.jpg',
            'christianneitzel_anna-chair-4.jpg',
            'christianneitzel_anna-chair-5.jpg',
            'christianneitzel_anna-chair-6.jpg',
            'christianneitzel_anna-chair-7.jpg',
        ],
    },
    'selina-reaktor': {
        title: 'Selina at Reaktor Wien',
        date: '2026',
        folder: 'portrait/selina-reaktor',
        cover: 'christianneitzel_selina-reaktor-1.jpg',
        images: [
            'christianneitzel_selina-reaktor-1.jpg',
            'christianneitzel_selina-reaktor-2.jpg',
            'christianneitzel_selina-reaktor-3.jpg',
            'christianneitzel_selina-reaktor-4.jpg',
            'christianneitzel_selina-reaktor-5.jpg',
            'christianneitzel_selina-reaktor-6.jpg',
            'christianneitzel_selina-reaktor-7.jpg',
            'christianneitzel_selina-reaktor-8.jpg',
            'christianneitzel_selina-reaktor-9.jpg',
            'christianneitzel_selina-reaktor-10.jpg',
            'christianneitzel_selina-reaktor-11.jpg',
            'christianneitzel_selina-reaktor-12.jpg',
            'christianneitzel_selina-reaktor-13.jpg',
            'christianneitzel_selina-reaktor-14.jpg',
        ],
    },
    'hiro-inside': {
        title: 'Hiro Hato "Unfolding',
        date: '2026',
        folder: 'portrait/hiro-hato/hiro-inside',
        cover: 'christianneitzel_hiro-inside-1.jpg',
        images: [
            'christianneitzel_hiro-inside-1.jpg',
            'christianneitzel_hiro-inside-2.jpg',
            'christianneitzel_hiro-inside-3.jpg',
        ],
    },
     'fanny-volksgarten': {
        title: 'Fanny Altenburger — Softness',
        date: '2026',
        folder: 'portrait/fanny-altenburger/fanny-volksgarten',
        cover: 'christianneitzel_fanny_may26-9.jpg',
        images: [
            'christianneitzel_fanny_may26-5.jpg',
            'christianneitzel_fanny_may26-3.jpg',
            'christianneitzel_fanny_may26-4.jpg',
            'christianneitzel_fanny_may26-6.jpg',
            'christianneitzel_fanny_may26-7.jpg',
            'christianneitzel_fanny_may26-8.jpg',
            'christianneitzel_fanny_may26-9.jpg',
            'christianneitzel_fanny_may26-10.jpg',
            'christianneitzel_fanny_may26-11.jpg',
        ],
    },
    'anna-sunglasses': {
        title: 'Anna Transformation',
        date: '2025',
        folder: 'portrait/anna/anna-sunglasses',
        cover: 'christianneitzel_anna-sunglasses-2.jpg',
        images: [
            'christianneitzel_anna-sunglasses-2.jpg',
            'christianneitzel_anna-sunglasses-1.jpg',
            'christianneitzel_anna-sunglasses-3.jpg',
            'christianneitzel_anna-sunglasses-4.jpg',
            'christianneitzel_anna-sunglasses-5.jpg',
            'christianneitzel_anna-sunglasses-6.jpg',
        ],
    },
    'paul': {
        title: 'Paul Kitzmüller',
        date: '2025 / 2026',
        folder: 'portrait/paul-kitzmueller',
        cover: 'christianneitzel_paul-portrait-1.jpg',
        images: [
            'christianneitzel_paul-portrait-1.jpg',
            'christianneitzel_paul-portrait-2.jpg',
            'christianneitzel_paul-portrait-3.jpg',
        ],
    },
    'theresa-tights': {
        title: 'Theresa',
        date: '2026',
        folder: 'portrait/theresa-muehlegger/theresa-tights',
        cover: 'christianneitzel_theresa-tights-8.jpg',
        images: [
            'christianneitzel_theresa-tights-8.jpg',
            'christianneitzel_theresa-tights-9.jpg',
            'christianneitzel_theresa-tights-1.jpg',
            'christianneitzel_theresa-tights-2.jpg',
            'christianneitzel_theresa-tights-3.jpg',
            'christianneitzel_theresa-tights-4.jpg',
            'christianneitzel_theresa-tights-5.jpg',
            'christianneitzel_theresa-tights-6.jpg',
            'christianneitzel_theresa-tights-7.jpg',
        ],
    },
    'theresa-floor': {
        title: 'Theresa',
        date: '2026',
        folder: 'portrait/theresa-muehlegger/theresa-floor',
        cover: 'christianneitzel_theresa-floor-1.jpg',
        images: [
            'christianneitzel_theresa-floor-1.jpg',
            'christianneitzel_theresa-floor-2.jpg',
            'christianneitzel_theresa-floor-3.jpg',
            'christianneitzel_theresa-floor-4.jpg',
            'christianneitzel_theresa-floor-5.jpg',
            'christianneitzel_theresa-floor-6.jpg',
            'christianneitzel_theresa-floor-7.jpg',
            'christianneitzel_theresa-floor-8.jpg',
        ],
    },
    'liam': {
        title: 'Liam XY',
        date: '2026',
        folder: 'portrait/liam-xy',
        cover: 'christianneitzel_liam-1.jpg',
        images: [
            'christianneitzel_liam-1.jpg',
            'christianneitzel_liam-2.jpg',
            'christianneitzel_liam-3.jpg',
            'christianneitzel_liam-4.jpg',
            'christianneitzel_liam-5.jpg',
            'christianneitzel_liam-9.jpg',
        ],
    },
    'tanja': {
        title: 'Tanja',
        date: '2025',
        folder: 'portrait/tanja-rentenberger',
        cover: 'christianneitzel_tanja-rentenberger-12.jpg',
        images: [
            'christianneitzel_tanja-rentenberger-13.jpg',
            'christianneitzel_tanja-rentenberger-2.jpg',
            'christianneitzel_tanja-rentenberger-3.jpg',
            'christianneitzel_tanja-rentenberger-4.jpg',
            'christianneitzel_tanja-rentenberger-5.jpg',
            'christianneitzel_tanja-rentenberger-6.jpg',
            'christianneitzel_tanja-rentenberger-1.jpg',
            'christianneitzel_tanja-rentenberger-8.jpg',
            'christianneitzel_tanja-rentenberger-9.jpg',
            'christianneitzel_tanja-rentenberger-10.jpg',
            'christianneitzel_tanja-rentenberger-7.jpg',
            'christianneitzel_tanja-rentenberger-11.jpg',
            'christianneitzel_tanja-rentenberger-12.jpg',
        ],
    },
    /* ---------- Events ---------- */
    'mochi': {
        title: 'Mochi',
        date: '2026',
        folder: 'events/mochi',
        cover: 'christianneitzel_mochi-1.jpg',
        images: [
            'christianneitzel_mochi-1.jpg',
            'christianneitzel_mochi-2.jpg',
            'christianneitzel_mochi-3.jpg',
            'christianneitzel_mochi-4.jpg',
            'christianneitzel_mochi-5.jpg',
            'christianneitzel_mochi-6.jpg',
            'christianneitzel_mochi-7.jpg',
        ],
    },
    'barbasso': {
        title: 'Bar Basso',
        date: '2026',
        folder: 'events/barbasso',
        cover: 'christianneitzel_barbasso-1.jpg',
        images: [
            'christianneitzel_barbasso-1.jpg',
            'christianneitzel_barbasso-2.jpg',
            'christianneitzel_barbasso-3.jpg',
            'christianneitzel_barbasso-4.jpg',
            'christianneitzel_barbasso-5.jpg',
            'christianneitzel_barbasso-6.jpg',
            'christianneitzel_barbasso-7.jpg',
            'christianneitzel_barbasso-8.jpg',
            'christianneitzel_barbasso-9.jpg',
            'christianneitzel_barbasso-10.jpg',
            'christianneitzel_barbasso-11.jpg',
            'christianneitzel_barbasso-12.jpg',
            'christianneitzel_barbasso-13.jpg',
            'christianneitzel_barbasso-14.jpg',
            'christianneitzel_barbasso-15.jpg',
            'christianneitzel_barbasso-16.jpg',
            'christianneitzel_barbasso-17.jpg',
        ],
    },
    'magika-1stofmay': {
        title: 'Magika — 1st of May',
        date: '2026',
        folder: 'events/magika-1stofmay',
        cover: 'christianneitzel_magika-drahthaus-1stofmay-1.jpg',
        images: [
            'christianneitzel_magika-drahthaus-1stofmay-16.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-1.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-2.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-3.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-4.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-5.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-6.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-7.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-8.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-9.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-10.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-11.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-12.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-13.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-14.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-15.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-17.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-18.jpg',
            'christianneitzel_magika-drahthaus-1stofmay-19.jpg',
        ],
    },
    'vernissage-bisspuren': {
        title: 'Vernissage — Bissspuren des Menschseins',
        date: '2026',
        folder: 'events/bisspurendesmenschseins',
        cover: 'christianneitzel_vernissage-bisspurendesmenschseins-2.jpg',
        images: [
            'christianneitzel_vernissage-bisspurendesmenschseins-1.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-2.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-3.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-4.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-5.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-6.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-7.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-8.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-9.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-10.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-11.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-12.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-13.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-14.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-15.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-16.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-17.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-18.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-19.jpg',
            'christianneitzel_vernissage-bisspurendesmenschseins-20.jpg',
        ],
    },
    'rosispezial-chelsea': {
        title: 'Rosi Spezial — Chelsea',
        date: '2023',
        folder: 'events/rosispezial/rosispezial-chelsea',
        cover: 'christianneitzel_rosispezial_chelsea-1.jpg',
        images: [
            'christianneitzel_rosispezial_chelsea-1.jpg',
            'christianneitzel_rosispezial_chelsea-2.jpg',
            'christianneitzel_rosispezial_chelsea-3.jpg',
            'christianneitzel_rosispezial_chelsea-4.jpg',
            'christianneitzel_rosispezial_chelsea-5.jpg',
            'christianneitzel_rosispezial_chelsea-6.jpg',
            'christianneitzel_rosispezial_chelsea-7.jpg',
            'christianneitzel_rosispezial_chelsea-8.jpg',
            'christianneitzel_rosispezial_chelsea-9.jpg',
            'christianneitzel_rosispezial_chelsea-10.jpg',
            'christianneitzel_rosispezial_chelsea-11.jpg',
            'christianneitzel_rosispezial_chelsea-12.jpg',
            'christianneitzel_rosispezial_chelsea-13.jpg',
            'christianneitzel_rosispezial_chelsea-14.jpg',
            'christianneitzel_rosispezial_chelsea-15.jpg',
        ],
    },
    'rosispezial-schmauswaberl': {
        title: 'Rosi Spezial — Schmauswaberl',
        date: '2025',
        folder: 'events/rosispezial/rosispezial-schmauswaberl',
        cover: 'christianneitzel_rosispezial_schmauswaberl-1.jpg',
        images: [
            'christianneitzel_rosispezial_schmauswaberl-1.jpg',
            'christianneitzel_rosispezial_schmauswaberl-2.jpg',
            'christianneitzel_rosispezial_schmauswaberl-3.jpg',
            'christianneitzel_rosispezial_schmauswaberl-4.jpg',
            'christianneitzel_rosispezial_schmauswaberl-5.jpg',
            'christianneitzel_rosispezial_schmauswaberl-6.jpg',
            'christianneitzel_rosispezial_schmauswaberl-7.jpg',
            'christianneitzel_rosispezial_schmauswaberl-8.jpg',
            'christianneitzel_rosispezial_schmauswaberl-9.jpg',
            'christianneitzel_rosispezial_schmauswaberl-10.jpg',
            'christianneitzel_rosispezial_schmauswaberl-11.jpg',
            'christianneitzel_rosispezial_schmauswaberl-12.jpg',
            'christianneitzel_rosispezial_schmauswaberl-13.jpg',
        ],
    },
};
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxMeta = document.getElementById('lightboxMeta');

    let activeShoot = null;
    let activeIndex = 0;
    let lastFocusedFrame = null;
function openLightbox(shootSlug, frameEl) {
    const shoot = SHOOTS[shootSlug];
    if (!shoot || !shoot.images || !shoot.images.length) return;

    activeShoot = shoot;
    activeIndex = 0;
    lastFocusedFrame = frameEl;

    renderLightbox();
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
}

function renderLightbox() {
    if (!activeShoot) return;
    const filename = activeShoot.images[activeIndex];
    const folderPath = activeShoot.folder ? `${activeShoot.folder}/` : '';
    lightboxImg.src = `../images/${folderPath}${filename}`;
    lightboxImg.alt = filename.replace(/\.[a-z]+$/i, '').replace(/[_-]+/g, ' ');

    const titleDate = [activeShoot.title, activeShoot.date].filter(Boolean).join(' — ');
    const counter = `${activeIndex + 1} / ${activeShoot.images.length}`;
    lightboxMeta.innerHTML = titleDate
        ? `${titleDate}<span class="lightbox__meta-sep">·</span>${counter}`
        : counter;

    if (activeShoot.images.length > 1) {
        const nextIdx = (activeIndex + 1) % activeShoot.images.length;
        const preload = new Image();
        preload.src = `../images/${folderPath}${activeShoot.images[nextIdx]}`;
    }
}

  function nextImage() {
    if (!activeShoot) return;
    activeIndex = (activeIndex + 1) % activeShoot.images.length;
    renderLightbox();
}
function closeLightbox() {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeShoot = null;
    if (lastFocusedFrame) lastFocusedFrame.focus();
}

function prevImage() {
    if (!activeShoot) return;
    activeIndex = (activeIndex - 1 + activeShoot.images.length) % activeShoot.images.length;
    renderLightbox();
}

document.querySelectorAll('.frame[data-shoot]').forEach((frame) => {
    const imgs = frame.querySelectorAll('.frame__image img');
    imgs.forEach((img) => {
        img.addEventListener('click', () => openLightbox(frame.dataset.shoot, frame));
    });
    
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('role', 'button');
    frame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(frame.dataset.shoot, frame);
        }
    });
    
    // Mobile indicator — image count in top-right of each frame
    const shoot = SHOOTS[frame.dataset.shoot];
  if (shoot) {
    const indicator = document.createElement('div');
    indicator.className = 'frame__indicator';
    
    const label = document.createElement('span');
    label.className = 'frame__indicator-label';
    label.textContent = `1 / ${shoot.images.length}`;
    
    indicator.appendChild(label);
    frame.appendChild(indicator);
}
});
    if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightboxClose) return;
        if (e.target.closest('.lightbox__meta')) return;
        nextImage();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    /* ---------- Touch swipe in lightbox ---------- */
    let touchStartX = 0;
    let touchStartY = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (!lightbox.classList.contains('is-active')) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) nextImage();
            else prevImage();
        }
    }, { passive: true });
}
window.addEventListener('load', () => {
    if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        /* ---------- Hero scroll-bound fade ---------- */
        // Hero wordmark + image fade out as the user scrolls through the hero.
        // Tied to scroll position (scrub), not a threshold.
        if (heroWordmark && heroImage) {
         gsap.fromTo([heroWordmark, heroImage],
    { opacity: 1 },
    {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 40%',
            scrub: true,
        }
    }
);
        }

        /* ---------- Frame reveal on scroll ---------- */
gsap.utils.toArray('.frame').forEach((frameEl) => {
    const imageWraps = frameEl.querySelectorAll('.frame__image');
    const indicator = frameEl.querySelector('.frame__indicator');
    if (!imageWraps.length) return;

    // Combine images + indicator into one targets list
    const targets = indicator 
        ? [...imageWraps, indicator]
        : [...imageWraps];

    gsap.timeline({
        scrollTrigger: {
            trigger: frameEl,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
        },
    })
    .fromTo(targets,
        { opacity: 0 },
        { opacity: 1, ease: 'none' }
    );
});

        ScrollTrigger.refresh();
    }
});

/* ---------- Intro choreography ---------- */
function runIntro() {
    // If hero doesn't exist (info.html), reveal the chrome without choreography.
    if (!heroWordmark || !heroImage) {
        // Hard-set opacity via style attribute. No GSAP, no animation, no failure modes.
        if (siteHeader) siteHeader.style.opacity = '1';
        if (siteNav) siteNav.style.opacity = '1';
        if (menuTrigger) menuTrigger.style.opacity = '1';
        if (siteNav) {
            siteNav.querySelectorAll('a').forEach(a => a.style.opacity = '1');
        }
        return;
    }


    if (prefersReducedMotion || typeof gsap === 'undefined') {
        gsap.set([heroWordmark, heroImage, siteHeader, siteNav, menuTrigger], { opacity: 1 });
        startSlideshow();
        return;
    }
    
    const tl = gsap.timeline({ onComplete: startSlideshow });
    
    tl.fromTo(heroWordmark, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.1);
    
    tl.fromTo(heroImage, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
        0.4
    );
    
    tl.fromTo(siteHeader,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        0.9
    );
    
    tl.to(siteNav, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.2);
    tl.to(menuTrigger, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.2);
    
    if (siteNav) {
        const navLinks = siteNav.querySelectorAll('a');
        tl.fromTo(navLinks,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
            1.2
        );
    }
}

requestAnimationFrame(runIntro);

/* ---------- Hero slideshow ---------- */
/* ---------- Hero slideshow ---------- */
function startSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    
    let currentIndex = 0;
    const HOLD_MS = 2500;
    let intervalId = null;
    
    function next() {
        const nextIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.remove('is-active');
        slides[nextIndex].classList.add('is-active');
        currentIndex = nextIndex;
    }
    
    function startInterval() {
        intervalId = setInterval(next, HOLD_MS);
    }
    
    function resetInterval() {
        if (intervalId) clearInterval(intervalId);
        startInterval();
    }
    
    startInterval();
    
    // Tap/click to advance
    const heroImg = document.querySelector('.hero__image');
    if (heroImg) {
        heroImg.addEventListener('click', () => {
            next();
            resetInterval();
        });
    }
}
/* ---------- Hover cursor (small black dot) ---------- */
const discoCursor = document.getElementById('discoCursor');

if (discoCursor && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(updateCursor);
    });
    
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.5;
        cursorY += dy * 0.5;
        discoCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            rafId = requestAnimationFrame(updateCursor);
        } else {
            rafId = null;
        }
    }
    
const cursorTargets = document.querySelectorAll(
    '.hero__image, .frame__image img, .site-nav a, .site-header__wordmark, .info-section a, .site-footer a, .menu-trigger, .lightbox__close'
);
cursorTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        discoCursor.classList.add('is-active');
    });
    el.addEventListener('mouseleave', () => {
        discoCursor.classList.remove('is-active');
    });
});
}

})();