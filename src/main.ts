import './styles.css';

const year = document.querySelector<HTMLSpanElement>('[data-year]');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const themeToggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
if (themeToggle) {
  const root = document.documentElement;
  let preference = root.dataset.theme;
  function updateTheme(): void {
    if (!themeToggle) return;
    const dark = preference !== 'light';
    themeToggle.textContent = dark ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  }
  themeToggle.hidden = false;
  updateTheme();
  themeToggle.addEventListener('click', () => {
    const dark = preference !== 'light';
    preference = dark ? 'light' : 'dark';
    root.dataset.theme = preference;
    try { localStorage.setItem('portfolio-theme', preference); }
    catch { /* Theme switching still works when storage is blocked. */ }
    updateTheme();
  });
}
