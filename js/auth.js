// simple auth using localStorage user list (seeded)
function seedUsers(){
  if(!localStorage.getItem('ims_users')){
    const initial = [
      {id:1,name:'John Doe',username:'admin',password:'123',email:'john@demo.com',role:'Admin',status:'Active'}
    ];
    localStorage.setItem('ims_users', JSON.stringify(initial));
  }
}
seedUsers();

document.addEventListener('DOMContentLoaded', ()=>{
  const current = JSON.parse(localStorage.getItem('ims_user')||'null');
  if(current){
    const dname = document.getElementById('display-name');
    if(dname) dname.textContent = current.name;
    // if on index or register, redirect to dashboard
    if(window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')){
      if(location.pathname.endsWith('index.html')) window.location.href = 'dashboard.html';
    }
  }

  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      const users = JSON.parse(localStorage.getItem('ims_users')||'[]');
      const found = users.find(x=>x.username === u && x.password === p);
      if(found){
        localStorage.setItem('ims_user', JSON.stringify(found));
        window.location.href = 'dashboard.html';
      } else {
        const err = document.getElementById('login-error');
        err.textContent = 'Invalid username or password (try admin / 123)';
        err.classList.remove('d-none');
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  if(registerForm){
    registerForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('fullName').value;
      const username = document.getElementById('regUsername').value;
      const password = document.getElementById('regPassword').value;
      const users = JSON.parse(localStorage.getItem('ims_users')||'[]');
      if(users.find(u=>u.username===username)){
        const err = document.getElementById('register-error');
        err.textContent = 'Username already exists';
        err.classList.remove('d-none');
        return;
      }
      const id = users.length ? Math.max(...users.map(u=>u.id))+1 : 1;
      const newUser = {id, name, username, password, email: username+'@demo.com', role:'Student', status:'Active'};
      users.push(newUser);
      localStorage.setItem('ims_users', JSON.stringify(users));
      localStorage.setItem('ims_user', JSON.stringify(newUser));
      window.location.href = 'dashboard.html';
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('ims_user'); window.location.href='index.html'; });
  }
});
