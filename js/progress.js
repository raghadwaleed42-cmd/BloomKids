lucide.createIcons();

  document.querySelectorAll('.nav-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
      item.classList.add('active');
    });
  });

  document.getElementById('pathBtn').addEventListener('click', ()=>{
    window.location.href = 'child-profile.html';
  });

  const profileTrigger = document.getElementById('profileTrigger');
  const profileDropdown = document.getElementById('profileDropdown');

  function closeProfileDropdown(){
    profileDropdown.classList.remove('open');
    profileTrigger.setAttribute('aria-expanded', 'false');
  }

  profileTrigger.addEventListener('click', (event)=>{
    event.stopPropagation();
    const willOpen = !profileDropdown.classList.contains('open');
    profileDropdown.classList.toggle('open', willOpen);
    profileTrigger.setAttribute('aria-expanded', String(willOpen));
  });

  profileDropdown.addEventListener('click', (event)=> event.stopPropagation());

  document.addEventListener('click', closeProfileDropdown);
  document.addEventListener('keydown', (event)=>{
    if(event.key === 'Escape'){
      closeProfileDropdown();
      profileTrigger.focus();
    }
  });
