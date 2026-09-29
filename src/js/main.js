// Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.05) + 's';
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // Stagger action cards
  document.querySelectorAll('.action-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + 's';
  });

  // Mobile menu (hamburger)
  const navEl = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (navEl && hamburger) {

    function isMobileMode() {
      return getComputedStyle(hamburger).display !== 'none';
    }

    hamburger.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('menu-open');
      document.body.classList.toggle('menu-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    function closeMobileMenu() {
      navEl.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.has-dropdown').forEach(li => {
        li.classList.remove('open');
        const dd = li.querySelector('.dropdown');
        if (dd) dd.style.maxHeight = '';
      });
    }

    // Tap anywhere on a dropdown parent tab to expand/collapse its submenu on mobile
    document.querySelectorAll('.has-dropdown').forEach(li => {
      const link = li.querySelector(':scope > a');
      const dropdown = li.querySelector(':scope > .dropdown');
      if (!link || !dropdown) return;

      link.addEventListener('click', (e) => {
        if (!isMobileMode()) return; // desktop: let normal navigation + hover dropdown behave
        e.preventDefault();
        e.stopPropagation();

        const isOpen = li.classList.contains('open');
        // close any other open submenu first
        document.querySelectorAll('.has-dropdown.open').forEach(other => {
          if (other !== li) {
            other.classList.remove('open');
            const otherDd = other.querySelector('.dropdown');
            if (otherDd) otherDd.style.maxHeight = '';
          }
        });

        if (isOpen) {
          li.classList.remove('open');
          dropdown.style.maxHeight = '';
        } else {
          li.classList.add('open');
          dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        }
      });
    });

    // Close the mobile menu once a real (non-toggle) link is followed
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.parentElement.classList.contains('has-dropdown')) return;
      link.addEventListener('click', () => {
        if (isMobileMode()) closeMobileMenu();
      });
    });

    // Close when clicking the dark backdrop (outside the panel)
    document.addEventListener('click', (e) => {
      if (navEl.classList.contains('menu-open') && !navEl.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }
