document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeButtons = document.querySelectorAll('#theme-dropdown button');
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const savedTheme = localStorage.getItem('theme') || 'system';

  document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  function setActiveTheme(theme) {
    themeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.theme === theme);
    });
  }

  function applyTheme(theme) {
    root.classList.remove('light-mode', 'dark-mode');

    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
      root.classList.add(`${theme}-mode`);
    }

    setActiveTheme(theme);
  }

  setActiveTheme(savedTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.theme);
      themeDropdown.classList.add('hidden');
      themeButton.setAttribute('aria-expanded', 'false');
    });
  });

  themeButton.addEventListener('click', () => {
    const isOpen = themeDropdown.classList.toggle('hidden') === false;
    themeButton.setAttribute('aria-expanded', String(isOpen));
  });

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!themeButton.contains(event.target) && !themeDropdown.contains(event.target)) {
      themeDropdown.classList.add('hidden');
      themeButton.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      themeDropdown.classList.add('hidden');
      themeButton.setAttribute('aria-expanded', 'false');
    }
  });
});
