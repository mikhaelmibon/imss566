document.addEventListener('DOMContentLoaded', ()=>{
  // populate stats based on users
  const users = getUsers();
  const statUsers = document.getElementById('stat-users');
  if(statUsers) statUsers.textContent = users.length;

  // line chart data from users length sim
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const vals = months.map((m,i)=> 50 + users.length + i*20 );
  const ctx = document.getElementById('lineChart');
  if(ctx){
    new Chart(ctx, {
      type:'line',
      data:{
        labels:months,
        datasets:[{label:'New signups', data:vals, borderColor:'#60a5fa', backgroundColor:'rgba(96,165,250,0.08)', tension:0.3}]
      },
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}
    });
  }

  const p = document.getElementById('pieChart');
  if(p){
    new Chart(p, {
      type:'pie',
      data:{
        labels:['Active','Inactive'],
        datasets:[{data:[users.filter(u=>u.status==='Active').length, users.filter(u=>u.status!=='Active').length], backgroundColor:['#34d399','#f97316']}]
      }
    });
  }

  // activity list (mock)
  const act = document.getElementById('activityList');
  if(act){
    const items = [
      {t:'John Doe created a new user', s:'1 hour ago'},
      {t:'Jane Smith completed a task', s:'4 hours ago'},
      {t:'Mark generated a report', s:'Yesterday'}
    ];
    act.innerHTML = items.map(i=>`<li class="mb-2"><strong>${i.t}</strong><br><small class="text-muted">${i.s}</small></li>`).join('');
  }

  // mini user table
  const mini = document.getElementById('mini-table');
  if(mini){
    const list = users.slice(0,5);
    mini.innerHTML = `<table class="table table-sm"><thead><tr><th>Name</th><th>Role</th></tr></thead><tbody>${list.map(u=>`<tr><td>${u.name}</td><td>${u.role}</td></tr>`).join('')}</tbody></table>`;
  }
});
