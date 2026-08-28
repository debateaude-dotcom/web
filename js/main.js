/* Navegación móvil y utilidades menores.
   El menú funciona sin JavaScript: la lista es visible por defecto y el
   botón sólo aparece cuando este script confirma que puede controlarlo. */
(function () {
  'use strict';

  var boton = document.getElementById('nav-boton');
  var lista = document.getElementById('nav-lista');

  if (boton && lista) {
    boton.hidden = false;

    var esMovil = window.matchMedia('(max-width: 860px)');

    function cerrar() {
      boton.setAttribute('aria-expanded', 'false');
      if (esMovil.matches) lista.hidden = true;
    }
    function abrir() {
      boton.setAttribute('aria-expanded', 'true');
      lista.hidden = false;
    }

    function sincronizar() {
      if (esMovil.matches) {
        cerrar();
      } else {
        /* En escritorio la lista siempre se ve; el atributo hidden se ignora
           por CSS, pero lo quitamos para no confundir a los lectores. */
        lista.hidden = false;
        boton.setAttribute('aria-expanded', 'false');
      }
    }

    boton.addEventListener('click', function () {
      if (boton.getAttribute('aria-expanded') === 'true') cerrar(); else abrir();
    });

    /* Escape cierra y devuelve el foco al botón. */
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
        cerrar();
        boton.focus();
      }
    });

    /* Un clic fuera cierra el menú desplegado. */
    document.addEventListener('click', function (ev) {
      if (boton.getAttribute('aria-expanded') !== 'true') return;
      if (!lista.contains(ev.target) && !boton.contains(ev.target)) cerrar();
    });

    if (esMovil.addEventListener) esMovil.addEventListener('change', sincronizar);
    sincronizar();
  }

  var anyo = document.getElementById('anyo');
  if (anyo) anyo.textContent = new Date().getFullYear();
})();
