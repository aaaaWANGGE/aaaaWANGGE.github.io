(() => {
  'use strict';
  const p = window.PROFILE || {};
  const name = typeof p.name === 'string' && p.name.trim() ? p.name.trim() : 'magicma';
  document.querySelectorAll('[data-name]').forEach(el => { el.textContent = name; });
  document.title = `${name} · Curious about intelligence`;
  document.getElementById('year').textContent = new Date().getFullYear();
  function link(id, href, label) {
    const a = document.createElement('a');
    a.href = href; a.textContent = label;
    if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    document.getElementById(id).replaceChildren(a);
  }
  let count = 0;
  if (typeof p.email === 'string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(p.email)) {
    link('email-contact', 'mailto:' + p.email, p.email); count++;
  }
  for (const key of ['github', 'social']) {
    try {
      const url = new URL(p[key]);
      if (url.protocol !== 'https:' || url.username || url.password) continue;
      link(key + '-contact', url.href, key === 'github' ? 'GitHub' : (p.socialLabel || 'Personal profile')); count++;
    } catch { /* 未填写的链接保持占位状态。 */ }
  }
  if (count) document.querySelector('.contact-note').textContent = 'Say hello through any of the public links above.';
})();


