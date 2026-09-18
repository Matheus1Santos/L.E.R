/* Validação local. Não confirma titularidade ou existência de uma linha. */
(function () {
  'use strict';
  const ddds = new Set(('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99').split(' '));
  function validPhone(value) {
    const raw = value.trim();
    if (!/^(?:\+55\s*)?[\d\s().-]+$/.test(raw)) return false;
    let digits = raw.replace(/\D/g, '');
    if (raw.startsWith('+55') || ((digits.length === 12 || digits.length === 13) && digits.startsWith('55'))) digits = digits.slice(2);
    if (!ddds.has(digits.slice(0, 2))) return false;
    const number = digits.slice(2);
    if (!/^(?:[2-5]\d{7}|9\d{8})$/.test(number)) return false;
    if (/^(\d)\1+$/.test(number) || /^(\d)\1{7}$/.test(number.slice(-8))) return false;
    return true;
  }
  document.querySelectorAll('.php-email-form').forEach(function (form) {
    const en = document.documentElement.lang.startsWith('en');
    const phone = form.querySelector('[name="phone"]');
    const error = form.querySelector('.error-message');
    error.setAttribute('role', 'alert');
    phone.addEventListener('input', function () {
      phone.setCustomValidity('');
      phone.removeAttribute('aria-invalid');
      error.classList.remove('d-block');
    });
    phone.addEventListener('blur', function () {
      const invalid = phone.value.trim() !== '' && !validPhone(phone.value);
      const message = en ? 'Enter a valid Brazilian phone number with area code.' : 'Informe um telefone brasileiro com DDD válido.';
      phone.setCustomValidity(invalid ? message : '');
      phone.setAttribute('aria-invalid', String(invalid));
      error.textContent = invalid ? message : '';
      error.classList.toggle('d-block', invalid);
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = form.querySelector('[name="name"]');
      name.setCustomValidity(name.value.trim().length < 2 ? (en ? 'Enter your name.' : 'Informe seu nome.') : '');
      phone.setCustomValidity(validPhone(phone.value) ? '' : (en ? 'Enter a valid Brazilian phone number with area code.' : 'Informe um telefone brasileiro com DDD válido.'));
      if (!form.reportValidity()) return;
      error.textContent = en ? 'Sending is not available yet. No data was sent.' : 'O envio ainda não está disponível. Nenhum dado foi enviado.';
      error.classList.add('d-block');
    });
  });
})();
