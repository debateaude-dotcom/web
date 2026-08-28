/*
 * Cronómetro de debate para torneos de Debate Aude.
 *
 * Cuenta atrás por turnos (introducción, refutaciones y conclusión), con
 * aviso en naranja en los últimos segundos y cuenta ascendente en rojo
 * cuando se pasa del tiempo.
 *
 * El tiempo NO se lleva restando de un intervalo: los temporizadores del
 * navegador se retrasan cuando la pestaña pierde el foco y en un torneo eso
 * significaría regalar segundos. Se guarda el instante de arranque y se
 * calcula la diferencia contra el reloj, así el cronómetro es exacto aunque
 * el navegador se duerma.
 */
(function () {
  'use strict';

  var ALMACEN = 'aude-crono-v1';

  var TURNOS = [
    { id: 'introduccion', nombre: 'Introducción', porDefecto: 240 },
    { id: 'refutacion1',  nombre: 'Refutación 1', porDefecto: 300 },
    { id: 'refutacion2',  nombre: 'Refutación 2', porDefecto: 300 },
    { id: 'conclusion',   nombre: 'Conclusión',   porDefecto: 210 }
  ];

  var AVISO = 10;   // segundos a partir de los cuales se avisa en naranja

  /* ---------- estado ---------- */
  var estado = {
    turno: TURNOS[0].id,
    lado: 'favor',          // 'favor' | 'contra'
    duraciones: {},
    equipos: { favor: 'Equipo a favor', contra: 'Equipo en contra' },
    arrancadoEn: null,      // marca de tiempo del último play
    acumulado: 0            // milisegundos ya consumidos antes del último play
  };
  TURNOS.forEach(function (t) { estado.duraciones[t.id] = t.porDefecto; });

  /* ---------- utilidades ---------- */
  function reloj() {
    return (window.performance && performance.now)
      ? performance.now()
      : Date.now();
  }

  function transcurrido() {
    return estado.acumulado +
      (estado.arrancadoEn === null ? 0 : reloj() - estado.arrancadoEn);
  }

  function enMarcha() { return estado.arrancadoEn !== null; }

  function duracion() { return estado.duraciones[estado.turno]; }

  /** Formatea segundos como m:ss, con signo menos si se ha pasado. */
  function formatear(segundos) {
    var signo = segundos < 0 ? '−' : '';
    var s = Math.abs(segundos);
    var m = Math.floor(s / 60);
    var r = Math.floor(s % 60);
    return signo + m + ':' + (r < 10 ? '0' : '') + r;
  }

  /** Convierte "4:30" o "270" a segundos. Devuelve null si no se entiende. */
  function aSegundos(texto) {
    texto = String(texto).trim();
    if (!texto) return null;
    var m = texto.match(/^(\d+)\s*:\s*([0-5]?\d)$/);
    if (m) return (+m[1]) * 60 + (+m[2]);
    if (/^\d+$/.test(texto)) return +texto;
    return null;
  }

  function guardar() {
    try {
      localStorage.setItem(ALMACEN, JSON.stringify({
        duraciones: estado.duraciones,
        equipos: estado.equipos
      }));
    } catch (e) { /* modo privado o almacenamiento lleno: da igual */ }
  }

  function recuperar() {
    try {
      var d = JSON.parse(localStorage.getItem(ALMACEN) || '{}');
      if (d.duraciones) {
        TURNOS.forEach(function (t) {
          var v = d.duraciones[t.id];
          if (typeof v === 'number' && v > 0 && v <= 5999) estado.duraciones[t.id] = v;
        });
      }
      if (d.equipos) {
        ['favor', 'contra'].forEach(function (k) {
          if (typeof d.equipos[k] === 'string' && d.equipos[k].trim()) {
            estado.equipos[k] = d.equipos[k].slice(0, 40);
          }
        });
      }
    } catch (e) { /* nada guardado o ilegible */ }
  }

  /* ---------- elementos ---------- */
  var $ = function (s) { return document.querySelector(s); };
  var pantalla   = $('#crono-pantalla');
  var etiqueta   = $('#crono-turno-activo');
  var btnPlay    = $('#crono-play');
  var btnReset   = $('#crono-reset');
  var btnPantalla= $('#crono-pantalla-completa');
  var aviso      = $('#crono-aviso');
  var tablero    = $('#crono-tablero');
  var ladoFavor  = $('#lado-favor');
  var ladoContra = $('#lado-contra');
  var nomFavor   = $('#nombre-favor');
  var nomContra  = $('#nombre-contra');

  if (!pantalla) return;   // no estamos en la página del cronómetro

  /* ---------- pintado ---------- */
  var ultimoTexto = null, ultimoEstado = null;

  function pintar() {
    var restante = Math.ceil((duracion() * 1000 - transcurrido()) / 1000);
    var texto = formatear(restante);

    var clase = 'normal';
    if (restante < 0) clase = 'pasado';
    else if (restante <= AVISO) clase = 'aviso';

    if (texto !== ultimoTexto) {
      pantalla.textContent = texto;
      ultimoTexto = texto;
    }
    if (clase !== ultimoEstado) {
      tablero.dataset.estado = clase;
      ultimoEstado = clase;
      if (clase === 'pasado') {
        anunciar('Tiempo agotado. El cronómetro cuenta en negativo.');
      } else if (clase === 'aviso') {
        anunciar('Quedan diez segundos.');
      }
    }
  }

  function anunciar(txt) {
    if (aviso) aviso.textContent = txt;
  }

  var animacion = null;

  function bucle() {
    pintar();
    if (enMarcha()) animacion = requestAnimationFrame(bucle);
  }

  /* ---------- acciones ---------- */
  function arrancar() {
    if (enMarcha()) return;
    estado.arrancadoEn = reloj();
    btnPlay.dataset.accion = 'pausa';
    btnPlay.querySelector('.crono-boton__txt').textContent = 'Pausa';
    btnPlay.setAttribute('aria-label', 'Pausar el cronómetro');
    tablero.dataset.marcha = 'si';
    anunciar('Cronómetro en marcha.');
    bucle();
  }

  function pausar() {
    if (!enMarcha()) return;
    estado.acumulado = transcurrido();
    estado.arrancadoEn = null;
    if (animacion) cancelAnimationFrame(animacion);
    btnPlay.dataset.accion = 'play';
    btnPlay.querySelector('.crono-boton__txt').textContent = 'Continuar';
    btnPlay.setAttribute('aria-label', 'Continuar el cronómetro');
    tablero.dataset.marcha = 'no';
    anunciar('Cronómetro en pausa.');
    pintar();
  }

  function alternar() { enMarcha() ? pausar() : arrancar(); }

  function reiniciar() {
    if (animacion) cancelAnimationFrame(animacion);
    estado.arrancadoEn = null;
    estado.acumulado = 0;
    btnPlay.dataset.accion = 'play';
    btnPlay.querySelector('.crono-boton__txt').textContent = 'Empezar';
    btnPlay.setAttribute('aria-label', 'Empezar el cronómetro');
    tablero.dataset.marcha = 'no';
    ultimoEstado = null;
    anunciar('Cronómetro reiniciado.');
    pintar();
  }

  function elegirTurno(id) {
    estado.turno = id;
    document.querySelectorAll('[data-turno]').forEach(function (b) {
      var activo = b.dataset.turno === id;
      b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });
    var t = TURNOS.filter(function (x) { return x.id === id; })[0];
    etiqueta.textContent = t ? t.nombre : '';
    reiniciar();
  }

  function elegirLado(lado) {
    estado.lado = lado;
    tablero.dataset.lado = lado;
    ladoFavor.setAttribute('aria-pressed', lado === 'favor' ? 'true' : 'false');
    ladoContra.setAttribute('aria-pressed', lado === 'contra' ? 'true' : 'false');
    anunciar('Turno de ' + (lado === 'favor' ? nomFavor.value : nomContra.value) + '.');
  }

  /* ---------- enlaces ---------- */
  btnPlay.addEventListener('click', alternar);
  btnReset.addEventListener('click', reiniciar);

  document.querySelectorAll('[data-turno]').forEach(function (b) {
    b.addEventListener('click', function () { elegirTurno(b.dataset.turno); });
  });

  ladoFavor.addEventListener('click', function () { elegirLado('favor'); });
  ladoContra.addEventListener('click', function () { elegirLado('contra'); });

  [['favor', nomFavor], ['contra', nomContra]].forEach(function (par) {
    par[1].addEventListener('input', function () {
      estado.equipos[par[0]] = par[1].value;
      guardar();
    });
  });

  /* Campos de duración: se aceptan "4:30" o "270". */
  document.querySelectorAll('[data-duracion]').forEach(function (campo) {
    campo.addEventListener('change', function () {
      var seg = aSegundos(campo.value);
      var id = campo.dataset.duracion;
      if (seg === null || seg < 5 || seg > 5999) {
        campo.value = formatear(estado.duraciones[id]).replace('−', '');
        anunciar('Ese tiempo no vale. Escribe minutos:segundos, por ejemplo 4:30.');
        return;
      }
      estado.duraciones[id] = seg;
      campo.value = formatear(seg);
      guardar();
      if (estado.turno === id) reiniciar();
    });
  });

  /* Pantalla completa, que es como se usa proyectado en un aula. */
  if (btnPantalla) {
    if (!document.documentElement.requestFullscreen) {
      btnPantalla.hidden = true;
    } else {
      btnPantalla.addEventListener('click', function () {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen().catch(function () {});
      });
      document.addEventListener('fullscreenchange', function () {
        document.body.classList.toggle('en-pantalla-completa', !!document.fullscreenElement);
        btnPantalla.setAttribute('aria-pressed', document.fullscreenElement ? 'true' : 'false');
      });
    }
  }

  /* Atajos de teclado, siempre que no se esté escribiendo en un campo. */
  document.addEventListener('keydown', function (ev) {
    var enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
    if (enCampo) return;
    if (ev.code === 'Space') { ev.preventDefault(); alternar(); }
    else if (ev.key === 'r' || ev.key === 'R') { ev.preventDefault(); reiniciar(); }
    else if (ev.key === 'ArrowLeft') { ev.preventDefault(); elegirLado('favor'); }
    else if (ev.key === 'ArrowRight') { ev.preventDefault(); elegirLado('contra'); }
  });

  /* Si la pestaña vuelve a primer plano, repintamos: mientras estaba oculta
     el navegador congela requestAnimationFrame, pero el reloj ha seguido. */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      pintar();
      if (enMarcha() && !animacion) bucle();
    }
  });

  /* ---------- arranque ---------- */
  recuperar();
  nomFavor.value = estado.equipos.favor;
  nomContra.value = estado.equipos.contra;
  document.querySelectorAll('[data-duracion]').forEach(function (campo) {
    campo.value = formatear(estado.duraciones[campo.dataset.duracion]);
  });
  elegirLado('favor');
  elegirTurno(estado.turno);
})();
