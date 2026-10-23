const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menu.focus();
  }
});
const search = document.querySelector('#paper-search');
if (search) {
  const type = document.querySelector('#paper-type');
  const year = document.querySelector('#paper-year');
  const papers = [...document.querySelectorAll('[data-paper]')];
  const update = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    papers.forEach(paper => {
      const match = (!query || paper.dataset.search.includes(query)) &&
        (!type.value || paper.dataset.type === type.value) &&
        (!year.value || paper.dataset.year === year.value);
      paper.hidden = !match;
      if (match) visible++;
    });
    document.querySelector('#paper-count').textContent = `${visible} of ${papers.length} records`;
    document.querySelector('#empty-results').hidden = visible > 0;
  };
  search.addEventListener('input', update);
  type.addEventListener('change', update);
  year.addEventListener('change', update);
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const content = document.getElementById(button.dataset.copy).textContent;
    try {
      await navigator.clipboard.writeText(content);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select the citation text to copy';
    }
  });
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
