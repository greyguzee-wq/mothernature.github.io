/**
 * ============================================================
 * Mother Nature Coffee — Główny plik aplikacji JavaScript
 * ============================================================
 * Funkcje:
 * - Ekran ładowania z eleganckim przejściem
 * - Płynne animacje podczas przewijania (IntersectionObserver)
 * - Efekt paralaksy w sekcji hero
 * - Katalog produktów z wyszukiwaniem i filtrami kategorii
 * - Modal ze szczegółami produktu
 * - Responsywna nawigacja mobilna
 * - Animowana nawigacja przy przewijaniu
 * ============================================================
 */

(function () {
  'use strict';

  /* ===================== EKRAN ŁADOWANIA ===================== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.classList.add('hidden');
    }, 2000);
  });

  /* ===================== NAWIGACJA ===================== */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  // Styl nawigacji zależny od przewijania
  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Przełączanie menu mobilnego
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav || e.target.tagName === 'A') {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Płynne przewijanie do sekcji (anchor links)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===================== PARALAKSA HERO ===================== */
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.1)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ===================== ANIMACJE PRZY PRZEWIJANIU ===================== */
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .scale-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  /* ===================== KATALOG PRODUKTÓW ===================== */
  const productGrid = document.getElementById('product-grid');
  const searchInput = document.getElementById('product-search');
  const filterContainer = document.getElementById('filter-tabs');
  let activeCategory = 'all';

  function renderProducts(filter, search) {
    if (!productGrid) return;
    let filtered = PRODUCTS;

    if (filter && filter !== 'all') {
      filtered = filtered.filter(p => p.category === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      productGrid.innerHTML = '<div class="no-results">Nie znaleziono ekspresów pasujących do wyszukiwania.</div>';
      return;
    }

    productGrid.innerHTML = filtered.map((p, i) => `
      <article class="product-card fade-up" style="transition-delay: ${i * 0.08}s" data-product-id="${p.id}" role="button" tabindex="0" aria-label="Zobacz szczegóły ${p.name}">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="400">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name">${p.name}</h3>
          <p class="product-card-desc">${p.description}</p>
          <div class="product-card-footer">
            <span class="product-card-price">${p.price.toLocaleString()} zł</span>
            <span class="product-card-action">Szczegóły <span aria-hidden="true">→</span></span>
          </div>
        </div>
      </article>
    `).join('');

    // Ponowne obserwowanie nowych kart dla animacji
    const newCards = productGrid.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      newCards.forEach(el => obs.observe(el));
    } else {
      newCards.forEach(el => el.classList.add('visible'));
    }

    // Obsługa kliknięcia (modal)
    productGrid.querySelectorAll('.product-card').forEach(card => {
      const handler = () => {
        const product = PRODUCTS.find(p => p.id === card.dataset.productId);
        if (product) openModal(product);
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter') handler(); });
    });
  }

  // Filtry kategorii
  if (filterContainer) {
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-tab' + (cat.id === 'all' ? ' active' : '');
      btn.textContent = cat.label;
      btn.addEventListener('click', () => {
        activeCategory = cat.id;
        filterContainer.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(activeCategory, searchInput ? searchInput.value : '');
      });
      filterContainer.appendChild(btn);
    });
  }

  // Wyszukiwanie
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        renderProducts(activeCategory, searchInput.value);
      }, 250);
    });
  }

  // Początkowe renderowanie
  renderProducts('all', '');

  /* ===================== MODAL PRODUKTU ===================== */
  const modalOverlay = document.getElementById('product-modal');
  const modalContent = document.getElementById('modal-content');

  function openModal(product) {
    if (!modalOverlay || !modalContent) return;

    const specsHTML = Object.entries(product.specs).map(([k, v]) =>
      `<div class="modal-spec"><span class="modal-spec-label">${k}</span><span class="modal-spec-value">${v}</span></div>`
    ).join('');

    modalContent.innerHTML = `
      <div class="modal-inner">
        <button class="modal-close" aria-label="Zamknij">&times;</button>
        <div class="modal-grid">
          <div class="modal-image">
            <img src="${product.image}" alt="${product.name}" width="450" height="450">
          </div>
          <div class="modal-body">
            ${product.badge ? `<span class="modal-badge">${product.badge}</span>` : ''}
            <h2 class="modal-name">${product.name}</h2>
            <div class="modal-price">${product.price.toLocaleString()} zł</div>
            <p class="modal-desc">${product.description}</p>
            <div class="modal-specs">
              <h3>Specyfikacja</h3>
              <div class="modal-specs-grid">${specsHTML}</div>
            </div>
            <div class="modal-cta">
              <button class="btn btn-primary" onclick="alert('Skontaktuj się z nami w sprawie zamówienia: info@mothernaturecoffee.com')">Poproś o wycenę</button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

})();
