(() => {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SCROLL_THRESHOLD = 80; // px past the top before the swap fires

    /* ---------- Wordmark scroll transition ---------- */
    const heroWordmark = document.getElementById('heroWordmark');
    const siteHeader = document.getElementById('siteHeader');
    const siteNav = document.getElementById('siteNav');

    let isScrolled = false;

    function applyScrolledState(scrolled) {
        if (scrolled === isScrolled) return;
        isScrolled = scrolled;

        if (scrolled) {
            siteHeader.classList.add('is-visible');
            siteNav.classList.add('is-visible');
            siteHeader.setAttribute('aria-hidden', 'false');
            siteNav.setAttribute('aria-hidden', 'false');

            if (prefersReducedMotion || typeof gsap === 'undefined') {
                heroWordmark.style.opacity = '0';
            } else {
                gsap.to(heroWordmark, { opacity: 0, duration: 0.25, ease: 'power2.out' });
            }
        } else {
            siteHeader.classList.remove('is-visible');
            siteNav.classList.remove('is-visible');
            siteHeader.setAttribute('aria-hidden', 'true');
            siteNav.setAttribute('aria-hidden', 'true');

            if (prefersReducedMotion || typeof gsap === 'undefined') {
                heroWordmark.style.opacity = '1';
            } else {
                gsap.to(heroWordmark, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            }
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

    /* ---------- Lightbox ---------- */
    // Stub shoot data — will be replaced by shoots.json + manifest.json later.
    const SHOOTS = {
        'tanja': [
            'ChristianNeitzel_Tanja_Sep25_revised02-38.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-27.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-25.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-24.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-23.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-22.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-17.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-12.jpg',
            'ChristianNeitzel_Tanja_Sep25_revised02-6.jpg',
        ],
        'anna-corridor': [
            'ChristianNeitzel__Anna_Corridor-1.jpg',
            'ChristianNeitzel__Anna_Corridor-3.jpg',
            'ChristianNeitzel__Anna_Corridor-4.jpg',
        ],
        'erroe': [
            'Erroe_25-28.jpg',
            'Erroe_25-16.jpg',
        ],
        'anna-wu': [
            'ANNA_WU-37.jpg',
            'ANNA_WU-1.jpg',
        ],
        'pauli': [
            'Pauli_Tongue_revision_color.jpg',
        ],
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let activeShoot = null;
    let activeIndex = 0;
    let lastFocusedFrame = null;

    function openLightbox(shootSlug, frameEl) {
        const list = SHOOTS[shootSlug];
        if (!list || !list.length) return;

        activeShoot = list;
        activeIndex = 0;
        lastFocusedFrame = frameEl;

        renderLightbox();
        lightbox.classList.add('is-active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('is-active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        activeShoot = null;
        if (lastFocusedFrame) lastFocusedFrame.focus();
    }

    function renderLightbox() {
        if (!activeShoot) return;
        const filename = activeShoot[activeIndex];
        lightboxImg.src = `../images/${filename}`;
        lightboxImg.alt = filename.replace(/\.[a-z]+$/i, '').replace(/[_-]+/g, ' ');
        lightboxCounter.textContent = `${activeIndex + 1} / ${activeShoot.length}`;

        // preload next
        if (activeShoot.length > 1) {
            const nextIdx = (activeIndex + 1) % activeShoot.length;
            const preload = new Image();
            preload.src = `../images/${activeShoot[nextIdx]}`;
        }
    }

    function nextImage() {
        if (!activeShoot) return;
        activeIndex = (activeIndex + 1) % activeShoot.length;
        renderLightbox();
    }

    function prevImage() {
        if (!activeShoot) return;
        activeIndex = (activeIndex - 1 + activeShoot.length) % activeShoot.length;
        renderLightbox();
    }

    document.querySelectorAll('.frame[data-shoot]').forEach((frame) => {
        frame.setAttribute('tabindex', '0');
        frame.setAttribute('role', 'button');
        frame.addEventListener('click', () => openLightbox(frame.dataset.shoot, frame));
        frame.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(frame.dataset.shoot, frame);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
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

/* ---------- Touch swipe in lightbox ---------- */
    // ... your existing touch code ...

window.addEventListener('load', () => {
    if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.frame').forEach((frameEl) => {
            const imageWrap = frameEl.querySelector('.frame__image');
            const img = frameEl.querySelector('img');
            if (!imageWrap || !img) return;

            gsap.timeline({
                scrollTrigger: {
                    trigger: frameEl,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: .75,
                    markers: false,
                    invalidateOnRefresh: true,
                },
            })
            .fromTo(imageWrap,
                { clipPath: 'inset(0% 0% 100% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', immediateRender: false }
            )
            .from(img,
                { scale: 1, ease: 'none', immediateRender: false },
                0
            );
        });

        ScrollTrigger.refresh();

        // Debug — log AFTER triggers are created
        console.log('GSAP:', typeof gsap);
        console.log('ScrollTrigger:', typeof ScrollTrigger);
        console.log('Triggers:', ScrollTrigger.getAll().length);
        ScrollTrigger.getAll().forEach((st, i) => {
            console.log(`Trigger ${i}:`, {
                start: st.start,
                end: st.end,
                progress: st.progress,
                triggerHeight: st.trigger?.getBoundingClientRect().height,
            });
        });
    }
});
})();