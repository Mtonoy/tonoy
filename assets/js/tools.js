/* ═══════════════════════════════════════════════════════════
   Tool pages — shared behaviour
   • theme toggle (shares localStorage key "tonoy-theme" with the site)
   • modal helpers — modals close ONLY via their ✕ button.
     Clicking the backdrop, pressing Escape, or clicking inside
     the panel never closes a modal.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Progressive enhancement: content is visible without JS.
  document.documentElement.classList.remove('no-js');

  /* ---------- THEME ---------- */
  var root = document.documentElement;
  var saved = localStorage.getItem('tonoy-theme');
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  function syncThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', root.dataset.theme === 'light' ? '#f4f6fd' : '#070a18');
  }
  syncThemeColor();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('tonoy-theme', next);
    syncThemeColor();
  });

  /* ---------- MODALS ---------- */
  // Open: any [data-modal-open="<id>"] button.
  // Close: ONLY the element with [data-modal-close] inside that modal.
  function openModal(id) {
    var ov = document.getElementById(id);
    if (!ov) return;
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
    var first = ov.querySelector('input,textarea,select,button:not([data-modal-close])');
    if (first) { try { first.focus(); } catch (err) {} }
  }
  function closeModal(ov) {
    if (!ov) return;
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute('data-modal-open'));
      return;
    }
    // Explicit close button only.
    var closer = e.target.closest('[data-modal-close]');
    if (closer) {
      e.preventDefault();
      closeModal(closer.closest('.overlay'));
    }
    // NOTE: intentionally no backdrop-click and no Escape-key handling.
  });

  // Expose for inline scripts.
  window.ToolsUI = {
    openModal: openModal,
    closeModal: function (id) { closeModal(document.getElementById(id)); },
    closeEl: closeModal
  };
})();
