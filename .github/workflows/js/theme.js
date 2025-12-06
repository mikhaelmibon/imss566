document.addEventListener('DOMContentLoaded', ()=>{
  const t = localStorage.getItem('ims_theme')||'dark';
  document.body.setAttribute('data-theme', t==='dark' ? 'dark' : 'light');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.addEventListener('click', ()=>{
    const cur = document.body.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('ims_theme', next);
    btn.textContent = next === 'dark' ? '🌙' : '☀️';
  });
});
