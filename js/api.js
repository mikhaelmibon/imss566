// simple client-side "API" using localStorage for users
function getUsers(){
  return JSON.parse(localStorage.getItem('ims_users')||'[]');
}
function saveUsers(list){
  localStorage.setItem('ims_users', JSON.stringify(list));
}
function addUser(u){
  const users = getUsers();
  const id = users.length ? Math.max(...users.map(x=>x.id))+1 : 1;
  u.id = id;
  users.push(u);
  saveUsers(users);
  return u;
}
function updateUser(id, data){
  const users = getUsers();
  const idx = users.findIndex(x=>x.id==id);
  if(idx>-1){ users[idx] = {...users[idx], ...data}; saveUsers(users); return users[idx]; }
  return null;
}
function deleteUser(id){
  const users = getUsers();
  const filtered = users.filter(x=>x.id!=id);
  saveUsers(filtered);
  return true;
}
