/*
 * Formularios AUDE — envío a Formspree sin recargar la página.
 *
 * Mejora progresiva: sin JS el formulario se envía de forma normal a
 * Formspree, que redirige al valor de _next (gracias.html). Con JS
 * interceptamos, validamos y enviamos por fetch.
 *
 * Marcado esperado:
 *   <form class="js-form" action="https://formspree.io/f/XXXX" method="post"
 *         data-min-seconds="3">
 *     <div class="campo">
 *       <label for="nombre">Nombre</label>
 *       <input id="nombre" name="nombre" required
 *              aria-describedby="nombre-error">
 *       <p class="campo__error" id="nombre-error" hidden></p>
 *     </div>
 *     <div class="trampa" aria-hidden="true">           <!-- honeypot -->
 *       <label for="c-web">No rellenes este campo</label>
 *       <input id="c-web" name="_gotcha" type="text" tabindex="-1"
 *              autocomplete="off">
 *     </div>
 *     <div class="form__estado" role="status" aria-live="polite" tabindex="-1"></div>
 *     <button type="submit">Enviar</button>
 *   </form>
 */
(function () {
  'use strict';

  var ENDPOINT_SIN_CONFIGURAR = /XXXXXXXX/;

  /* Mensajes en español; el navegador los da en el idioma del sistema. */
  function mensajeDeError(campo) {
    var v = campo.validity;
    var tipo = (campo.getAttribute('type') || '').toLowerCase();

    if (v.valueMissing) {
      if (tipo === 'checkbox') return 'Debes marcar esta casilla para continuar.';
      if (campo.tagName === 'SELECT') return 'Elige una opción de la lista.';
      return 'Este campo es obligatorio.';
    }
    if (v.typeMismatch && tipo === 'email') {
      return 'Escribe un correo válido, por ejemplo nombre@centro.es';
    }
    if (v.typeMismatch && tipo === 'url') {
      return 'Escribe una dirección web completa, empezando por https://';
    }
    if (v.tooShort) {
      return 'Escribe al menos ' + campo.minLength + ' caracteres (llevas ' +
        campo.value.trim().length + ').';
    }
    if (v.tooLong) {
      return 'Como máximo ' + campo.maxLength + ' caracteres.';
    }
    if (v.patternMismatch) {
      return campo.dataset.errorPatron || 'El formato no es válido.';
    }
    if (v.rangeUnderflow) return 'El valor mínimo es ' + campo.min + '.';
    if (v.rangeOverflow) return 'El valor máximo es ' + campo.max + '.';
    return 'Revisa este campo.';
  }

  function cajaError(campo) {
    var id = campo.getAttribute('aria-describedby');
    if (!id) return null;
    /* aria-describedby puede listar varios ids; el del error acaba en -error */
    var ids = id.split(/\s+/);
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.classList.contains('campo__error')) return el;
    }
    return null;
  }

  function marcarError(campo, texto) {
    var caja = cajaError(campo);
    campo.setAttribute('aria-invalid', 'true');
    if (caja) {
      caja.textContent = texto;
      caja.hidden = false;
    }
  }

  function limpiarError(campo) {
    var caja = cajaError(campo);
    campo.removeAttribute('aria-invalid');
    if (caja) {
      caja.textContent = '';
      caja.hidden = true;
    }
  }

  function camposDe(form) {
    return Array.prototype.filter.call(
      form.querySelectorAll('input, select, textarea'),
      function (c) {
        return c.name !== '_gotcha' &&
               c.name !== '_next' &&
               c.name !== '_subject' &&
               c.type !== 'submit' &&
               c.type !== 'hidden' &&
               !c.disabled;
      }
    );
  }

  function validarCampo(campo) {
    if (campo.checkValidity()) {
      limpiarError(campo);
      return true;
    }
    marcarError(campo, mensajeDeError(campo));
    return false;
  }

  function estado(form) {
    return form.querySelector('.form__estado');
  }

  function anunciar(form, texto, tono) {
    var caja = estado(form);
    if (!caja) return;
    caja.textContent = texto;
    caja.hidden = false;
    caja.className = 'form__estado' + (tono ? ' form__estado--' + tono : '');
    /* role="alert" para errores, role="status" para el resto: cambiarlo
       en caliente hace que los lectores de pantalla reanuncien. */
    caja.setAttribute('role', tono === 'error' ? 'alert' : 'status');
  }

  function iniciar(form) {
    var boton = form.querySelector('[type="submit"]');
    var textoBoton = boton ? boton.textContent : '';
    var nacido = Date.now();
    var minSegundos = parseFloat(form.dataset.minSeconds || '3');
    var enviando = false;

    /* Validación al salir del campo, y en vivo solo si ya estaba en error:
       así no gritamos mientras la persona escribe por primera vez. */
    camposDe(form).forEach(function (campo) {
      var evento = (campo.type === 'checkbox' || campo.type === 'radio' ||
                    campo.tagName === 'SELECT') ? 'change' : 'blur';
      campo.addEventListener(evento, function () { validarCampo(campo); });
      campo.addEventListener('input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (enviando) return;

      /* 1. Honeypot: si el bot lo ha rellenado, fingimos éxito y no enviamos. */
      var trampa = form.querySelector('[name="_gotcha"]');
      if (trampa && trampa.value !== '') {
        form.hidden = true;
        anunciar(form, 'Mensaje enviado. Gracias.', 'ok');
        return;
      }

      /* 2. Trampa de tiempo: un humano no rellena esto en 3 segundos. */
      if ((Date.now() - nacido) / 1000 < minSegundos) {
        anunciar(form, 'Espera un momento antes de enviar el formulario.', 'error');
        return;
      }

      /* 3. Validación de todos los campos. */
      var campos = camposDe(form);
      var invalidos = campos.filter(function (c) { return !validarCampo(c); });

      if (invalidos.length) {
        anunciar(form, invalidos.length === 1
          ? 'Hay 1 campo que revisar antes de enviar.'
          : 'Hay ' + invalidos.length + ' campos que revisar antes de enviar.', 'error');
        invalidos[0].focus();
        return;
      }

      /* 4. Endpoint sin configurar: aviso claro en vez de un 404 mudo. */
      if (ENDPOINT_SIN_CONFIGURAR.test(form.action)) {
        anunciar(form, 'Este formulario todavía no está conectado. ' +
          'Escríbenos a hola@debateaude.com mientras lo configuramos.', 'error');
        return;
      }

      /* 5. Envío. */
      enviando = true;
      if (boton) {
        boton.disabled = true;
        boton.textContent = 'Enviando…';
      }
      anunciar(form, 'Enviando el formulario…', 'espera');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; })
            .then(function (datos) { return { ok: res.ok, datos: datos }; });
        })
        .then(function (r) {
          if (!r.ok) throw r.datos;

          var exito = form.parentNode.querySelector('.form__exito');
          if (exito) {
            form.hidden = true;
            exito.hidden = false;
            exito.focus();
          } else {
            form.reset();
            anunciar(form, '¡Recibido! Te respondemos en un par de días.', 'ok');
            estado(form).focus();
          }
        })
        .catch(function (err) {
          var detalle = '';
          if (err && err.errors && err.errors.length) {
            detalle = ' ' + err.errors.map(function (e) { return e.message; }).join('. ');
          }
          anunciar(form, 'No hemos podido enviar el formulario.' + detalle +
            ' Inténtalo de nuevo o escríbenos a hola@debateaude.com.', 'error');
          estado(form).focus();
        })
        .then(function () {
          enviando = false;
          if (boton) {
            boton.disabled = false;
            boton.textContent = textoBoton;
          }
        });
    });

    /* Con JS activo desactivamos la validación nativa: usamos la nuestra,
       que da mensajes en español y persistentes. Se hace aquí, no en el
       HTML, para que sin JS siga funcionando la del navegador. */
    form.setAttribute('novalidate', '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.js-form'), iniciar);
  });
})();
