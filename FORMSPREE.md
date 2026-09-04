# Formspree: cómo está montado el formulario

El formulario de la web envía a Formspree. No hace falta backend ni claves
secretas: el endpoint es público por diseño, y la protección antispam va por
honeypot, trampa de tiempo y el filtro del propio Formspree.

> **Estado: configurado.** El endpoint es `https://formspree.io/f/xaeyboeo`
> y está puesto en `contacto.html`. Lo de abajo queda como referencia por si
> algún día hay que rehacerlo o cambiar el correo de destino.

## 1. Crear la cuenta

1. Entra en <https://formspree.io> y pulsa **Sign up**.
2. Regístrate con **debateaude@gmail.com**, no con un correo personal: quien
   reciba los avisos debe seguir siendo la asociación aunque cambie la junta.
3. Confirma el correo desde el enlace que te llega.

El plan gratuito da **50 envíos al mes** y guarda los últimos 100 mensajes.

## 2. Crear el formulario

1. En el panel, **+ New Form**.
2. Nombre: `Contacto web`. Correo de destino: debateaude@gmail.com.
3. **Create Form**.

Formspree te da una URL así:

```
https://formspree.io/f/mzbqwxyz
                      ^^^^^^^^
                      este es el ID
```

## 3. Dónde va pegado

Sólo hay **un** sitio, en `contacto.html`:

```html
<form class="js-form" action="https://formspree.io/f/xaeyboeo" ...>
```

Para encontrarlo:

```sh
grep -n "formspree.io/f/" contacto.html
```

Si alguna vez se despliega con el marcador `XXXXXXXX` en vez de un ID de
verdad, el formulario lo detecta y avisa en pantalla en vez de fallar en
silencio, y ofrece un enlace que abre el correo con lo que la persona había
escrito.

## 4. Primer envío y dominio

- El **primer** mensaje llega con un botón de confirmación en el correo. Hasta
  que no lo pulses, Formspree no acepta más envíos. **Si aún no se ha hecho,
  esto es lo primero:** manda una prueba desde `debateaude.com/contacto.html`,
  abre el correo que llega a `debateaude@gmail.com` y pulsa el botón.
- En **Form Settings → Allowed domains**, añade `debateaude.com` y
  `www.debateaude.com`. Así nadie puede usar vuestro endpoint desde otra web
  para gastaros la cuota.
- Activa **reCAPTCHA** sólo si llega spam de verdad: rompe la accesibilidad y
  de momento el honeypot basta.

## 5. Campos especiales que ya vienen puestos

| Campo      | Para qué sirve                                                        |
|------------|-----------------------------------------------------------------------|
| `_gotcha`  | Honeypot. Oculto para las personas; si un bot lo rellena, se descarta. |
| `_next`    | Página de gracias a la que redirige Formspree **si el visitante no tiene JavaScript**. Con JS la confirmación sale sin recargar. |
| `_subject` | Asunto del correo que os llega.                                        |

## 6. Comprobar que funciona

1. Rellena el formulario y envíalo: la confirmación debe salir **sin recargar**.
2. Comprueba que el correo llega a debateaude@gmail.com.
3. Desactiva JavaScript y vuelve a enviarlo: debe llevarte a `gracias.html`.
