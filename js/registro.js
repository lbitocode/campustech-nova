// CampusTech UTP 2026 — registro.js
// Validación del formulario de inscripción (registro.html).

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');
  if (!form) return;

  const fields = {
    nombre: form.querySelector('#nombre'),
    dni: form.querySelector('#dni'),
    correo: form.querySelector('#correo'),
    terminos: form.querySelector('#terminos')
  };
  const msg = form.querySelector('#msg');
  const counter = form.querySelector('.char-counter');
  const total = form.querySelector('#total');
  const feedback = form.querySelector('#form-feedback');
  const precios = { est: 'S/ 40', comp: 'S/ 90', pro: 'S/ 180' };
  let intentoEnvio = false;

  // Reglas: devuelven el mensaje de error o '' si el campo es válido
  const reglas = {
    nombre: (v) => v.trim().split(/\s+/).length < 2 ? 'Ingresa nombre y apellido.' : '',
    dni: (v) => !/^\d{8}$/.test(v) ? 'El DNI debe tener 8 dígitos.' : '',
    correo: (v) => !/^\S+@\S+\.\S+$/.test(v) ? 'Ingresa un correo válido.' : '',
    terminos: (_, el) => !el.checked ? 'Debes aceptar la política de privacidad.' : ''
  };

  const validar = (key) => {
    const el = fields[key];
    const valor = el.type === 'checkbox' ? el.checked : el.value;
    const error = reglas[key](el.value, el);
    // Se muestra el error si ya se intentó enviar o si el campo tiene contenido
    const mostrar = intentoEnvio || (key !== 'terminos' && valor) ? error : '';
    const group = el.closest('.form-group, .checkbox-group');

    group.querySelector('.error-message').textContent = mostrar;
    if (group.classList.contains('form-group')) {
      group.classList.toggle('is-invalid', !!mostrar);
      group.classList.toggle('is-valid', !mostrar && !!valor && !error);
    }
    el.setAttribute('aria-invalid', String(!!mostrar));
    return !error;
  };

  const validarTodo = () => Object.keys(fields).map(validar).every(Boolean);

  // DNI: solo dígitos
  fields.dni.addEventListener('input', () => {
    fields.dni.value = fields.dni.value.replace(/\D/g, '');
  });

  Object.keys(fields).forEach((key) => {
    const evento = fields[key].type === 'checkbox' ? 'change' : 'input';
    fields[key].addEventListener(evento, () => {
      validar(key);
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    });
  });

  // Contador de caracteres
  msg.addEventListener('input', () => { counter.textContent = msg.value.length + '/240'; });

  // Total según el pase elegido
  form.querySelectorAll('input[name="pase"]').forEach((radio) => {
    radio.addEventListener('change', () => { total.textContent = precios[radio.value]; });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    intentoEnvio = true;
    const ok = validarTodo();
    feedback.className = 'form-feedback ' + (ok ? 'is-success' : 'is-error');
    feedback.textContent = ok
      ? '¡Inscripción registrada! Enviamos tu código de acceso a ' + fields.correo.value + '.'
      : 'Revisa los campos marcados en rojo.';
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
  });

  form.addEventListener('reset', () => {
    intentoEnvio = false;
    // Espera a que el navegador restablezca los valores
    setTimeout(() => {
      form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('is-invalid', 'is-valid'));
      form.querySelectorAll('.error-message').forEach((m) => { m.textContent = ''; });
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
      feedback.textContent = '';
      feedback.className = 'form-feedback';
      counter.textContent = '0/240';
      total.textContent = precios.comp;
    });
  });
});
