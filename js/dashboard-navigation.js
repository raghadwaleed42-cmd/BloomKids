(function () {
  const sidebar = document.querySelector('.sidebar, .admin-sidebar');
  if (!sidebar) return;

  const storageKey = 'bloomKidsSidebarCollapsed';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'sidebar-toggle-button';
  toggle.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3"></rect>
      <path d="M9 4v16"></path>
    </svg>`;
  sidebar.insertBefore(toggle, sidebar.firstChild);

  function isDesktop() {
    return window.innerWidth > 1024;
  }

  function applyState(collapsed) {
    const shouldCollapse = isDesktop() && collapsed;
    document.body.classList.toggle('sidebar-is-collapsed', shouldCollapse);
    toggle.setAttribute('aria-expanded', String(!shouldCollapse));
    toggle.setAttribute('aria-label', shouldCollapse ? 'فتح القائمة الجانبية' : 'إغلاق القائمة الجانبية');
    toggle.title = shouldCollapse ? 'فتح القائمة الجانبية' : 'إغلاق القائمة الجانبية';
  }

  let collapsed = localStorage.getItem(storageKey) === 'true';
  applyState(collapsed);

  toggle.addEventListener('click', function () {
    if (!isDesktop()) return;
    collapsed = !document.body.classList.contains('sidebar-is-collapsed');
    localStorage.setItem(storageKey, String(collapsed));
    applyState(collapsed);
  });

  // In the collapsed state the close button is intentionally hidden.
  // Clicking the compact Bloom Kids logo reopens the sidebar without adding another control.
  const sidebarBrand = sidebar.querySelector('.logo-container, .sidebar-logo, .brand, .admin-brand, .logo-image, .brand-logo');
  if (sidebarBrand) {
    sidebarBrand.addEventListener('click', function (event) {
      if (!isDesktop() || !document.body.classList.contains('sidebar-is-collapsed')) return;
      event.preventDefault();
      collapsed = false;
      localStorage.setItem(storageKey, 'false');
      applyState(false);
    });

    sidebarBrand.addEventListener('keydown', function (event) {
      if (!isDesktop() || !document.body.classList.contains('sidebar-is-collapsed')) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      collapsed = false;
      localStorage.setItem(storageKey, 'false');
      applyState(false);
    });
  }

  window.addEventListener('resize', function () {
    applyState(collapsed);
  });

  // Put the Home control inside the dashboard top bar as a compact icon.
  const homeLink = document.querySelector('.global-home-link');
  const topbar = document.querySelector('.top-header, .admin-topbar, .topbar');
  if (homeLink && topbar) {
    homeLink.classList.add('global-home-link--topbar');
    const children = Array.from(topbar.children);
    if (children.length >= 2) {
      topbar.insertBefore(homeLink, children[children.length - 1]);
    } else {
      topbar.appendChild(homeLink);
    }
  }
})();
