(function() {
  const root = document.documentElement;
  const themeSelect = document.getElementById('theme-select');
  const savedTheme = localStorage.getItem('theme') || 'system';

  // Set the selected option
  themeSelect.value = savedTheme;

  // Listen for changes
  themeSelect.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      root.classList.remove('light-mode');
      root.classList.remove('dark-mode');
    } else {
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        root.classList.remove('light-mode')
        root.classList.add('dark-mode')
      } else {
        root.classList.remove('dark-mode')
        root.classList.add('light-mode')
      }
    }
  });
})();