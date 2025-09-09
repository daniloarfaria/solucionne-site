// Lightweight HTML includes + header wiring
(function () {
  const INCLUDE_ATTR = 'data-include';

  function isHomePage() {
    const path = (window.location.pathname || '').toLowerCase();
    return path.endsWith('/') || path.endsWith('/index.html') || path === '';
  }

  function rewriteAnchorLinks(root) {
    const anchors = root.querySelectorAll('a[data-anchor]');
    anchors.forEach(a => {
      const hash = '#' + a.getAttribute('data-anchor');
      if (isHomePage()) {
        a.setAttribute('href', hash);
      } else {
        a.setAttribute('href', 'index.html' + hash);
      }
    });
  }

  function setupHeaderInteractions() {
    // Icons
    try { if (window.lucide && lucide.createIcons) lucide.createIcons(); } catch (_) {}

    // Mobile menu
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => link.addEventListener('click', () => {
        if (!link.closest('#mobile-products-submenu')) {
          mobileMenu.classList.add('hidden');
        }
      }));
    }

    // Mobile products submenu
    const mobileProductsButton = document.getElementById('mobile-products-button');
    const mobileProductsSubmenu = document.getElementById('mobile-products-submenu');
    const mobileProductsIcon = document.getElementById('mobile-products-icon');
    if (mobileProductsButton && mobileProductsSubmenu && mobileProductsIcon) {
      mobileProductsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileProductsSubmenu.classList.toggle('hidden');
        mobileProductsIcon.classList.toggle('rotate-180');
      });
    }
  }

  async function includePartials() {
    const nodes = Array.from(document.querySelectorAll('[' + INCLUDE_ATTR + ']'));
    await Promise.all(nodes.map(async (el) => {
      const url = el.getAttribute(INCLUDE_ATTR);
      if (!url) return;
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        const html = await res.text();
        el.innerHTML = html;
      } catch (e) {
        console.error('Falha ao carregar include:', url, e);
      }
    }));

    // After injection, rewrite anchor links to work on both home and inner pages
    rewriteAnchorLinks(document);
    setupHeaderInteractions();

    // Notify listeners
    document.dispatchEvent(new CustomEvent('includes:loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includePartials);
  } else {
    includePartials();
  }
})();

