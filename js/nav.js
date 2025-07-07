// (function() {
//   const root = document.documentElement;
//   const themeSelect = document.getElementById('theme-select');
//   const savedTheme = localStorage.getItem('theme') || 'system';

//   // Set the selected option
//   themeSelect.value = savedTheme;

//   // Listen for changes
//   themeSelect.addEventListener('change', (e) => {
//     const newTheme = e.target.value;
//     if (newTheme === 'system') {
//       localStorage.removeItem('theme');
//       root.classList.remove('light-mode');
//       root.classList.remove('dark-mode');
//     } else {
//       localStorage.setItem('theme', newTheme);
//       if (newTheme === 'dark') {
//         root.classList.remove('light-mode')
//         root.classList.add('dark-mode')
//       } else {
//         root.classList.remove('dark-mode')
//         root.classList.add('light-mode')
//       }
//     }
//   });
// })();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('#theme-dropdown button');
  const savedTheme = localStorage.getItem('theme') || 'system';
  const themeBtn = document.getElementById("theme-toggle");
  const dropdown = document.getElementById("theme-dropdown");

  function applyTheme(theme) {
    // Remove existing theme classes
    root.classList.remove('light-mode', 'dark-mode');

    // Apply selected theme
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
      root.classList.add(theme + '-mode');
    }

    // Update active button
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  // Set the selected theme
  themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === savedTheme);
  });

  // Listen to button clicks
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      applyTheme(theme);
      dropdown.classList.add("hidden");
    });
  });

  // Theme dropdown toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.getElementById("theme-dropdown").classList.toggle("hidden");
  });

  // Mobile menu toggle
  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
    document.getElementById("menu-toggle").classList.toggle("open");
  });

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    if (!themeBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});