
(function () {
  const form = document.getElementById('resetPasswordForm');
  const pass = document.getElementById('newPassword');
  const confirm = document.getElementById('confirmNewPassword');
  const message = document.getElementById('resetPasswordMessage');

  document.querySelectorAll('[data-password-button]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.passwordButton);
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      btn.classList.toggle('is-visible', !visible);
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const passField = document.getElementById('newPasswordField');
    const confirmField = document.getElementById('confirmNewPasswordField');
    passField.classList.toggle('has-error', pass.value.length < 6);
    confirmField.classList.toggle('has-error', !confirm.value || confirm.value !== pass.value);
    if (pass.value.length < 6 || confirm.value !== pass.value) return;
    message.classList.add('show');
    setTimeout(() => { window.location.href = 'login.html'; }, 650);
  });
})();
