/* Validação local. Não confirma titularidade ou existência de uma linha. */
(function () {
  'use strict';
  function validPhone(value) {
    const raw = value.trim();
    if (!/^[\d\s-]+$/.test(raw)) return false;
    const number = raw.replace(/\D/g, '');
    return /^\d{8,9}$/.test(number) &&
      !/^(\d)\1+$/.test(number) && !/^(\d)\1{7}$/.test(number.slice(-8));
  }
  document.querySelectorAll('.php-email-form').forEach(function (form) {
    const en = document.documentElement.lang.startsWith('en');
    const phone = form.querySelector('[name="phone"]');
    const error = form.querySelector('.error-message');
    error.setAttribute('role', 'alert');
    const success = document.createElement('div');
    success.className = 'sent-message';
    success.setAttribute('role', 'status');
    error.after(success);
    form.addEventListener('input', function (event) {
      success.classList.remove('d-block');
      if (event.target.name === 'name') event.target.setCustomValidity('');
    });
    phone.addEventListener('input', function () {
      phone.setCustomValidity('');
      phone.removeAttribute('aria-invalid');
      error.classList.remove('d-block');
    });
    phone.addEventListener('blur', function () {
      const invalid = phone.value.trim() !== '' && !validPhone(phone.value);
      const message = en ? 'Enter an 8- or 9-digit phone number, without an area code.' : 'Informe um telefone de 8 ou 9 dígitos, sem DDD.';
      phone.setCustomValidity(invalid ? message : '');
      phone.setAttribute('aria-invalid', String(invalid));
      error.textContent = invalid ? message : '';
      error.classList.toggle('d-block', invalid);
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      success.classList.remove('d-block');
      error.classList.remove('d-block');
      const name = form.querySelector('[name="name"]');
      name.setCustomValidity(name.value.trim().length < 2 ? (en ? 'Enter your name.' : 'Informe seu nome.') : '');
      phone.setCustomValidity(validPhone(phone.value) ? '' : (en ? 'Enter an 8- or 9-digit phone number, without an area code.' : 'Informe um telefone de 8 ou 9 dígitos, sem DDD.'));
      if (!form.reportValidity()) return;
      success.textContent = en ? 'Message sent successfully! (Simulation)' : 'Mensagem enviada com sucesso! (Simulação)';
      success.classList.add('d-block');
      form.reset();
      phone.setCustomValidity('');
      phone.removeAttribute('aria-invalid');
    });
  });
})();
