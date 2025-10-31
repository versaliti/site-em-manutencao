(function () {
  'use strict';

  // Helpers
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ====================
     Preloader (opcional)
  ======================= */
  window.addEventListener('load', function () {
    setTimeout(() => {
      const pre = $('.preloader');
      if (pre) {
        pre.style.opacity = '0';
        pre.style.display = 'none';
      }
    }, 300);
  });

  /* =========== Sticky menu + scroll-top =========== */
  function onScrollCommon() {
    const headerNavbar = $('.hero-section-wrapper-5 .header');
    if (headerNavbar) {
      const sticky = headerNavbar.offsetTop || 0;
      if (window.pageYOffset > sticky) headerNavbar.classList.add('sticky');
      else headerNavbar.classList.remove('sticky');
    }

    const backToTop = $('.scroll-top');
    if (backToTop) {
      const show = (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50);
      backToTop.style.display = show ? 'flex' : 'none';
    }
  }
  // usa passive listener p/ desempenho
  window.addEventListener('scroll', onScrollCommon, { passive: true });

  /* =========== header-6 toggler-icon (só se existir) =========== */
  (function initHeaderToggler() {
    const toggler = $('.header-6 .navbar-toggler');
    const collapse = $('.header-6 .navbar-collapse');

    if (toggler) {
      toggler.addEventListener('click', () => {
        toggler.classList.toggle('active');
      });
    }

    // Fechar ao clicar em links .page-scroll (se existirem)
    const links = $$('.header-6 .page-scroll');
    if (links.length && toggler && collapse) {
      links.forEach(a => a.addEventListener('click', () => {
        toggler.classList.remove('active');
        collapse.classList.remove('show');
      }));
    }
  })();

  /* =========== Section menu active (robusto) =========== */
  function onScrollActiveLink() {
    const links = $$('.page-scroll');
    if (!links.length) return;
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollTopMinus = scrollPos + 73;

    // remove 'active' de todos antes
    links.forEach(l => l.classList.remove('active'));

    links.forEach(link => {
      const target = link.getAttribute('href');
      if (!target || !target.startsWith('#')) return;
      const section = $(target);
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (top <= scrollTopMinus && bottom > scrollTopMinus) {
        link.classList.add('active');
      }
    });
  }
  document.addEventListener('scroll', onScrollActiveLink, { passive: true });
  // rodada inicial
  onScrollCommon(); onScrollActiveLink();

  /* =========== Tiny Slider (somente se existir container + lib) =========== */
  (function initTinySlider() {
    const pricing = $('.pricing-active');
    const hasTns = (typeof window.tns === 'function');
    if (!pricing || !hasTns) return;

    try {
      window.tns({
        container: '.pricing-active',
        autoplay: false,
        mouseDrag: true,
        gutter: 0,
        nav: false,
        controls: true,
        // Se você NÃO usa LineIcons, troque por Bootstrap Icons:
        controlsText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>',
        ],
        responsive: {
          0:   { items: 1 },
          768: { items: 2 },
          992: { items: 1 }, // items deve ser inteiro; evite 1.2
          1200:{ items: 2 }
        }
      });
    } catch (e) {
      console.warn('Tiny Slider não inicializado:', e);
    }
  })();

  /* =========== WOW.js (só se a lib existir) =========== */
  (function initWOW() {
    try {
      if (typeof window.WOW !== 'undefined') {
        new WOW().init();
      }
    } catch (e) {
      console.warn('WOW init falhou:', e);
    }
  })();

})();