/* ============================================================
   main.js — Tropic Greenery
   Vanilla JS only. No jQuery, no libraries.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Auto-update copyright year
     ---------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     Sticky header shadow on scroll
     ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     Mobile hamburger menu
     ---------------------------------------------------------- */
  const hamburger  = document.querySelector('.hamburger');
  const navMobile  = document.querySelector('.nav-mobile');
  const body       = document.body;

  if (hamburger && navMobile) {
    const open = () => {
      hamburger.classList.add('open');
      navMobile.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    };
    const close = () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    };
    const toggle = () => hamburger.classList.contains('open') ? close() : open();

    hamburger.addEventListener('click', toggle);

    /* Close drawer when a nav link is clicked */
    navMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    /* Close on Escape */
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ----------------------------------------------------------
     Scroll-triggered fade-in (IntersectionObserver)
     ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    /* Fallback: show all immediately if IO not supported */
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     Active nav link highlight
     ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === 'index.html' && href === './') || href.endsWith(currentPath)) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     SERVICE AREAS — Pause marquee on city link click
     ---------------------------------------------------------- */
  const marqueeInner = document.querySelector('.areas-jump-nav-inner');
  if (marqueeInner) {
    document.querySelectorAll('.areas-jump-nav a').forEach(link => {
      link.addEventListener('click', () => {
        marqueeInner.style.animationPlayState = 'paused';
      });
    });
  }

  /* ----------------------------------------------------------
     GALLERY — Category filter
     ---------------------------------------------------------- */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-full-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        /* Update active button state */
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const category = btn.dataset.filter;

        galleryItems.forEach(item => {
          const match = category === 'all' || item.dataset.category === category;
          item.style.display = match ? '' : 'none';
          item.setAttribute('aria-hidden', match ? 'false' : 'true');
        });
      });
    });
  }

  /* ----------------------------------------------------------
     GALLERY — Lightbox
     ---------------------------------------------------------- */
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');

  if (lightbox && galleryItems.length) {
    let currentIdx = 0;

    /* Returns only currently visible items */
    const visible = () => [...galleryItems].filter(item => item.style.display !== 'none');

    const showImage = (idx) => {
      const items = visible();
      if (!items.length) return;
      currentIdx = (idx + items.length) % items.length;
      const item  = items[currentIdx];
      const img   = item.querySelector('img');
      const cap   = item.querySelector('.gallery-full-caption');
      lightboxImg.src         = img.src;
      lightboxImg.alt         = img.alt;
      lightboxCaption.textContent = cap ? cap.textContent : '';
      /* Prev/next visibility */
      lightboxPrev.style.display = items.length > 1 ? '' : 'none';
      lightboxNext.style.display = items.length > 1 ? '' : 'none';
    };

    const openLightbox = (idx) => {
      showImage(idx);
      lightbox.classList.add('open');
      lightbox.removeAttribute('hidden');
      body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('hidden', '');
      body.style.overflow = '';
    };

    /* Attach click to each gallery image */
    galleryItems.forEach((item, i) => {
      const trigger = item.querySelector('.gallery-full-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => openLightbox(i));
        trigger.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
        });
      }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showImage(currentIdx - 1));
    lightboxNext.addEventListener('click', () => showImage(currentIdx + 1));

    /* Click backdrop to close */
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    /* Keyboard navigation */
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showImage(currentIdx - 1);
      if (e.key === 'ArrowRight') showImage(currentIdx + 1);
    });
  }

})();
