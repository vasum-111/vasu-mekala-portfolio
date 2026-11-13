'use strict';
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(light) {
  document.body.classList.toggle('light', light);
  themeButton.setAttribute('aria-pressed', String(light));
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  themeButton.firstElementChild.textContent = light ? '☀' : '☾';
}
try { applyTheme(localStorage.getItem('vasu-portfolio-theme') === 'light'); } catch { /* Storage is optional. */ }
themeButton.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  applyTheme(light);
  try { localStorage.setItem('vasu-portfolio-theme', light ? 'light' : 'dark'); } catch { /* Storage is optional. */ }
});
const skillButtons = [...document.querySelectorAll('[data-filter]')];
const skills = [...document.querySelectorAll('[data-category]')];
skillButtons.forEach(button => button.addEventListener('click', () => {
  skillButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  skills.forEach(skill => { skill.hidden = button.dataset.filter !== 'all' && skill.dataset.category !== button.dataset.filter; });
  document.querySelector('#skill-count').textContent = `Showing ${skills.filter(skill => !skill.hidden).length} of ${skills.length} technologies`;
}));
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); selectTab(tabs[next]); tabs[next].focus();
  });
});
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  document.getElementById(button.dataset.dialog).showModal();
  document.body.classList.add('modal-open');
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
});
const navLinks = [...document.querySelectorAll('.sidebar nav a')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollQueued = false;
function updateNavigation() {
  let active = navSections[0];
  for (const section of navSections) if (section.getBoundingClientRect().top <= window.innerHeight * .4) active = section;
  navLinks.forEach(link => {
    const current = link.hash === `#${active.id}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); } }, {passive:true});
window.addEventListener('resize', updateNavigation);
updateNavigation();
document.querySelector('#year').textContent = String(new Date().getFullYear());
