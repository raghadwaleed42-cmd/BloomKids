
(function () {
  const save = document.getElementById('saveTeacherSettings');
  const toast = document.getElementById('teacherSettingsToast');
  if (!save || !toast) return;
  save.addEventListener('click', () => {
    toast.classList.add('show');
    clearTimeout(window.__teacherSettingsToastTimer);
    window.__teacherSettingsToastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  });
})();
