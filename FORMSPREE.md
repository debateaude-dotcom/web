# Alta en Formspree y dónde pegar el endpoint

Los dos formularios del sitio (contacto e inscripción) son HTML plano que
envía a Formspree. No hace falta backend ni claves secretas: el endpoint es
público por diseño y la protección antispam va por honeypot, trampa de
tiempo y el filtro del propio Formspree.

## 1. Crear la cuenta

1. Entra en <https://formspree.io> y pulsa **Sign up**.
2. Regístrate con el correo de la asociación (por ejemplo
   `hola@debateaude.com`), no con uno personal: quien reciba los avisos
   debe seguir siendo la asociación aunque cambie la junta directiva.
3. Confirma el correo desde el enlace que te llega.

El plan gratuito da **50 envíos al mes** y guarda los últimos 100 mensajes.
Si os quedáis cortos en periodo de matrícula, el plan de pago más barato
sube a 1.000 envíos/mes.

## 2. Crear los dos formularios

Hay que crear **dos** formularios distintos, para que las respuestas no se
mezclen en la misma bandeja:

1. En el panel, **+ New Form**.
2. Nombre: `Contacto web`. Correo de destino: el de la asociación.
   **Create Form**.
3. Repite con nombre `Inscripciones`.

Formspree te da para cada uno una URL así:

```
https://formspree.io/f/mzbqwxyz
                      ^^^^^^^^
                      esto es el ID del formulario
```

## 3. Dónde pegar cada endpoint

Los dos endpoints están en el atributo `action` de cada formulario, y en el
código llevan un marcador `XXXXXXXX` para que sea imposible desplegarlos sin
darse cuenta (si te dejas uno, el formulario avisa en pantalla en vez de
fallar en silencio).

| Archivo         | Línea del `<form>`                                | Qué formulario de Formspree |
|-----------------|---------------------------------------------------|-----------------------------|
| `contacto.html` | `<form action="https://formspree.io/f/XXXXXXXX">` | Contacto web                |
| `unete.html`    | `<form action="https://formspree.io/f/XXXXXXXX">` | Inscripciones               |

Sustituye `XXXXXXXX` por el ID que te haya dado Formspree. Es lo único que
hay que tocar.

Para encontrarlos rápido:

```sh
grep -rn "formspree.io/f/" *.html
```

## 4. Primer envío y verificación del dominio

- El **primer** mensaje que reciba cada formulario llega con un botón de
  confirmación en el correo. Hasta que no lo pulses, Formspree no acepta más
  envíos de ese formulario. Manda una prueba tú mismo nada más desplegar.
- En **Form Settings → Allowed domains**, añade `debateaude.com` y
  `www.debateaude.com`. Así nadie puede usar vuestro endpoint desde otra web
  para gastaros la cuota.
- En **Form Settings**, activa **reCAPTCHA** solo si os llega spam de
  verdad: rompe la accesibilidad y de momento el honeypot basta.

## 5. Campos especiales que ya vienen puestos

| Campo      | Para qué sirve                                                              |
|------------|-----------------------------------------------------------------------------|
| `_gotcha`  | Honeypot. Está oculto para las personas; si un bot lo rellena, se descarta. |
| `_next`    | Página de gracias a la que redirige Formspree **si el visitante no tiene JavaScript**. Con JS la confirmación sale sin recargar. |
| `_subject` | Asunto del correo que os llega, para distinguir contacto de inscripción.    |

No hace falta tocar ninguno.

## 6. Comprobar que funciona

Después de desplegar, con el sitio ya en Cloudflare Pages:

1. Rellena el formulario de contacto y envíalo. Debe aparecer la
   confirmación **sin que la página se recargue**.
2. Comprueba que el correo llega a la bandeja de la asociación.
3. Desactiva JavaScript en el navegador y vuelve a enviarlo: debe llevarte a
   `gracias.html`. Esto es lo que verá quien navegue con JS bloqueado.
