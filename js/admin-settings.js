(function(){
  const toast=document.getElementById('settingsToast');
  let timer;
  const showToast=(message='تم حفظ التغييرات')=>{
    if(!toast)return;
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer=setTimeout(()=>toast.classList.remove('show'),1800);
  };
  document.querySelectorAll('.save-btn').forEach(btn=>btn.addEventListener('click',()=>showToast()));

  const input=document.getElementById('adminLogoInput');
  const preview=document.getElementById('adminLogoPreview');
  const remove=document.getElementById('removeAdminLogo');
  if(input&&preview){
    input.addEventListener('change',()=>{
      const file=input.files&&input.files[0];
      if(!file)return;
      const url=URL.createObjectURL(file);
      preview.src=url;
      preview.style.display='block';
      showToast('تم تحديث معاينة الشعار');
    });
  }
  if(remove&&preview){
    remove.addEventListener('click',()=>{
      preview.style.display='none';
      showToast('تم إخفاء الشعار من المعاينة');
    });
  }
})();
