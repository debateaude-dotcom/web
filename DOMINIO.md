# Pasar el dominio de Wix a Cloudflare

El dominio `debateaude.com` sigue **registrado en Wix**. Lo único que cambia
es quién gestiona el DNS, es decir, quién decide a qué servidor apunta el
dominio. Eso se hace cambiando los *servidores de nombres* (nameservers).

No hace falta transferir el dominio ni esperar ningún plazo.

---

## Qué implica en dinero

Hay que separar dos cosas que en Wix se pagan por separado:

| Qué | Qué pasa | Coste |
|---|---|---|
| **El registro del dominio** | Se queda en Wix. Hay que seguir renovándolo ahí. | Lo que ya pagáis, ~15-20 €/año |
| **El plan Premium de Wix** (la web en sí) | Se puede cancelar cuando la nueva esté funcionando | Deja de pagarse |

Es decir: **seguís pagando el dominio a Wix, pero dejáis de pagar el
alojamiento**. Cloudflare Pages es gratuito para un sitio como este.

### Ojo con el dominio "gratis del primer año"

Si el dominio os vino **incluido con el plan Premium**, al cancelar el plan
Wix puede dejar de renovarlo. Compruébalo antes en Wix, en la sección de
facturación: mira si el dominio aparece como una suscripción propia con su
propia fecha de renovación. Si no la tiene, contacta con soporte de Wix y
pregunta expresamente qué pasa con el dominio si cancelas el plan.

### Si más adelante queréis dejar Wix del todo

Podéis transferir el registro a Cloudflare, que lo cobra a precio de coste
(unos 10 €/año, sin margen). Requisitos: que hayan pasado más de 60 días
desde que lo comprasteis o desde la última transferencia. No corre prisa:
podéis hacer el cambio de servidores de nombres ahora y transferir cuando
os venga bien.

---

## Antes de tocar nada

**1. Apunta lo que hay ahora.** En Wix, entra en la configuración DNS del
dominio y haz una captura de pantalla de **todos** los registros. La vas a
necesitar si algo sale mal, y para no perder nada por el camino.

**2. Mira si tenéis correo en el dominio.** Si existe algún buzón del tipo
`algo@debateaude.com`, en esa lista habrá registros **MX**. Esos hay que
copiarlos a Cloudflare o el correo dejará de llegar. Si usáis Gmail normal
(`debateaude@gmail.com`), no hay nada que hacer: ese correo no depende del
dominio.

**3. No canceles el plan de Wix todavía.** Primero que funcione lo nuevo.

---

## Los pasos

### 1. Crear la cuenta de Cloudflare

Entra en <https://dash.cloudflare.com/sign-up> y regístrate con el correo de
la asociación. Es gratis.

### 2. Añadir el dominio

En el panel, **Add a site** → escribe `debateaude.com` → elige el plan
**Free** → continuar.

Cloudflare rastrea los registros que hay ahora y te los muestra. **Revísalos
uno por uno** contra la captura que hiciste en Wix: si falta alguno, añádelo
a mano. Presta atención sobre todo a los MX (correo) y a los TXT (suelen ser
verificaciones de servicios).

### 3. Copiar los dos servidores de nombres

Al terminar, Cloudflare te enseña dos direcciones parecidas a estas:

```
adam.ns.cloudflare.com
lola.ns.cloudflare.com
```

Los nombres cambian en cada cuenta. Cópialos tal cual.

### 4. Ponerlos en Wix

En Wix, ve a la gestión de dominios, entra en `debateaude.com` y busca la
opción de servidores de nombres. Suele estar en un apartado de configuración
avanzada, con un nombre parecido a **"Cambiar servidores de nombres"** o
**"Conectar a un sitio externo"**. Elige la opción de **usar servidores de
nombres externos** y pega los dos de Cloudflare, sustituyendo a los de Wix.

Guarda.

> Los menús de Wix cambian de sitio cada cierto tiempo, así que puede que los
> textos no sean exactamente estos. Lo que buscas siempre es lo mismo: dejar
> de usar los servidores de nombres de Wix y poner los de Cloudflare.

### 5. Esperar

Cloudflare te manda un correo cuando el dominio está activo. Suele tardar
menos de una hora, aunque oficialmente puede llegar a 48. Mientras tanto la
web de Wix sigue funcionando.

### 6. Conectar el dominio a la web nueva

Cuando Cloudflare confirme, entra en tu proyecto de **Workers & Pages** →
pestaña **Custom domains** → **Set up a custom domain** → escribe
`debateaude.com`. Repite con `www.debateaude.com`.

Como el DNS ya lo lleva Cloudflare, los registros se crean solos y el
certificado de seguridad (el candado del navegador) también. En unos minutos
`debateaude.com` muestra la web nueva.

### 7. Ahora sí, cancelar el plan de Wix

Comprueba primero, con calma:

- La web nueva se ve en `debateaude.com` y en `www.debateaude.com`.
- Sale el candado de seguridad en la barra del navegador.
- El formulario de contacto envía y el correo llega.
- Si teníais correo en el dominio, que sigue funcionando.

Con eso comprobado, cancela **el plan Premium** de Wix, no el dominio.

---

## Si algo sale mal

Vuelve a poner en Wix sus servidores de nombres originales (los de la
captura del paso 1). En una hora todo vuelve a estar como estaba. No se
pierde nada: la web de Wix sigue existiendo mientras el plan esté activo.
