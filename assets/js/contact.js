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
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const rating = form.querySelector('[name="rating"]');
    const error = form.querySelector('.error-message');
    const success = form.querySelector('.sent-message');
    error.setAttribute('role', 'alert');
    success.setAttribute('role', 'status');
    const phoneError = en ? 'Enter a Brazilian phone number with a valid area code: 8 digits for a landline (starting with 2–5), or 9 digits for a mobile (starting with 9).' : 'Informe um telefone brasileiro com DDD válido: fixo com 8 dígitos (iniciando de 2 a 5) ou celular com 9 dígitos (iniciando com 9).';
    phone.addEventListener('input', function () { phone.setCustomValidity(''); });
    form.addEventListener('input', function () {
      error.classList.remove('d-block');
      success.classList.remove('d-block');
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      error.classList.remove('d-block');
      success.classList.remove('d-block');
      function reject(field, message) {
        error.textContent = message;
        error.classList.add('d-block');
        field.focus();
      }
      if (name.value.trim().length < 2) return reject(name, en ? 'Please enter your full name.' : 'Por favor, informe seu nome completo.');
      if (!email.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return reject(email, en ? 'Please enter a valid email address.' : 'Por favor, informe um e-mail válido.');
      phone.setCustomValidity(validPhone(phone.value) ? '' : phoneError);
      if (!phone.validity.valid) return reject(phone, phoneError);
      if (!/^[0-5]$/.test(rating.value)) return reject(rating, en ? 'Please select a rating from 0 to 5.' : 'Por favor, selecione uma nota de 0 a 5.');
      success.textContent = en ? 'Validation complete. This demonstration does not send or save your data.' : 'Validação concluída. Esta demonstração não envia nem armazena seus dados.';
      success.classList.add('d-block');
    });
  });
})();
