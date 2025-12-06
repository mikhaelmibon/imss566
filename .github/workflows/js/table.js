let userModal;
document.addEventListener('DOMContentLoaded', ()=>{
  userModal = new bootstrap.Modal(document.getElementById('userModal'));
  renderUsers();

  document.getElementById('addUserBtn').addEventListener('click', ()=>{
    clearUserForm();
    userModal.show();
  });

  document.getElementById('userForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const payload = {
      name: document.getElementById('uName').value,
      email: document.getElementById('uEmail').value,
      role: document.getElementById('uRole').value,
      status: document.getElementById('uStatus').value
    };
    if(id){
      updateUser(Number(id), payload);
    } else {
      addUser(payload);
    }
    userModal.hide();
    renderUsers();
  });
});

function renderUsers(){
  const q = document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '';
  const list = getUsers().filter(u=> (u.name||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q) );
  const container = document.getElementById('usersTable');
  if(!container) return;
  if(list.length===0) container.innerHTML = '<div class="text-muted">No users found.</div>';
  else {
    container.innerHTML = `<table class="table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>${list.map(u=>`
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary" onclick="editUser(${u.id})">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="removeUser(${u.id})">Delete</button>
        </td>
      </tr>`).join('')}</tbody></table>`;
  }
}

function editUser(id){
  const u = getUsers().find(x=>x.id==id);
  if(!u) return;
  document.getElementById('userId').value = u.id;
  document.getElementById('uName').value = u.name;
  document.getElementById('uEmail').value = u.email;
  document.getElementById('uRole').value = u.role || 'Student';
  document.getElementById('uStatus').value = u.status || 'Active';
  userModal.show();
}

function removeUser(id){
  if(!confirm('Delete this user?')) return;
  deleteUser(id);
  renderUsers();
}

function clearUserForm(){
  document.getElementById('userId').value='';
  document.getElementById('uName').value='';
  document.getElementById('uEmail').value='';
  document.getElementById('uRole').value='Student';
  document.getElementById('uStatus').value='Active';
}
