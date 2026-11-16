/* ========================================
   AMINO CLUB - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQ();
  initCountdown();
  initStickyHeader();
  initBulkOptions();
  initQualityPills();
  initSmoothScroll();
});

/* Mobile Menu */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* FAQ Accordion */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* Countdown Timer */
function initCountdown() {
  const timerEl = document.getElementById('countdown-timer');
  if (!timerEl) return;

  // Set end date to 10 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 10);
  endDate.setHours(0, 0, 0, 0);

  function update() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      timerEl.textContent = 'ENDED';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

/* Sticky Header */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* Bulk Option Buttons */
function initBulkOptions() {
  const btns = document.querySelectorAll('.bulk-option-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* Quality Pills */
function initQualityPills() {
  const pills = document.querySelectorAll('.quality-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

/* Smooth Scroll for anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* Filter buttons (store page) */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Search functionality */
function initSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const title = card.querySelector('.product-card-title');
      if (title && title.textContent.toLowerCase().includes(query)) {
        card.style.display = '';
      } else if (query === '') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* Initialize page-specific features */
function initPageFeatures() {
  initFilters();
  initSearch();
}

// Auto-init on pages that need it
if (document.querySelector('.filter-btn')) {
  initPageFeatures();
}
