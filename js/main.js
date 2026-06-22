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

})();
