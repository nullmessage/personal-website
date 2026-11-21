const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const root = document.documentElement;

function applyTheme(theme?: string) {
  if (theme) root.dataset.theme = theme;
  else delete root.dataset.theme;

  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )) {
    const color = meta.dataset.theme;
    meta.media = theme
      ? theme === color
        ? 'all'
        : 'not all'
      : `(prefers-color-scheme: ${color})`;
  }
}

systemDark.addEventListener('change', () => applyTheme());
window.addEventListener('keydown', (event) => {
  if (
    event.key.toLowerCase() !== 't' ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.shiftKey ||
    event.repeat ||
    event.isComposing ||
    event.defaultPrevented
  )
    return;

  const target = event.target;
  if (
    target instanceof HTMLElement &&
    (target.isContentEditable || target.closest('input, textarea, select'))
  )
    return;

  const systemTheme = systemDark.matches ? 'dark' : 'light';
  const current = root.dataset.theme ?? systemTheme;
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next === systemTheme ? undefined : next);
});
