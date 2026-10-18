import './styles.css';

const year = document.querySelector<HTMLSpanElement>('[data-year]');

if (year) {
  year.textContent = String(new Date().getFullYear());
}
