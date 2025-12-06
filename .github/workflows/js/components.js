document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('nav-placeholder');
  if(el){
    fetch('components/navbar.html').then(r=>r.text()).then(html=>el.innerHTML=html).then(()=>{
      const logout = document.getElementById('navLogout');
      if(logout) logout.addEventListener('click', e=>{ e.preventDefault(); logoutUser(); });
    });
  }
});

function logoutUser(){
  localStorage.removeItem('ims_user');
  window.location.href = 'index.html';
}
