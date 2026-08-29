# Pasar el dominio de Wix a Cloudflare

`debateaude.com` está **registrado en Wix** y ahí se queda. Lo único que
cambia es quién gestiona el DNS, es decir, quién decide a qué servidor
apunta el dominio. Eso se hace cambiando los *servidores de nombres*
(nameservers).

No hay que transferir el dominio ni esperar ningún plazo.

---

## Qué implica en dinero

En Wix el dominio y el plan de la web se pagan por separado, y en el caso
de AUDE **el dominio está comprado aparte: no depende del plan Premium**.

| Qué | Qué pasa | Coste |
|---|---|---|
| Registro del dominio | Se queda en Wix, con su propia renovación | Lo que ya se paga |
| Plan Premium de Wix | Se cancela cuando la web nueva funcione | Deja de pagarse |

Cloudflare Pages es gratuito para un sitio como este. Así que al terminar
sólo se paga la renovación anual del dominio.

Si algún día queréis dejar Wix del todo, se puede transferir el registro a
Cloudflare, que lo cobra a precio de coste (unos 10 €/año). Hace falta que
hayan pasado más de 60 días desde la compra o desde la última transferencia.
No corre prisa: esto se puede hacer mucho después.

---

## Situación de partida

Estos son los registros que había en Wix antes de empezar. Se apuntan aquí
por si hubiera que volver atrás:

| Tipo | Nombre | Valor |
|---|---|---|
| A | debateaude.com | 185.230.63.171 |
| A | debateaude.com | 185.230.63.186 |
| A | debateaude.com | 185.230.63.107 |
| CNAME | www.debateaude.com | cdn1.wixdns.net |
| NS | debateaude.com | ns4.wixdns.net |
| NS | debateaude.com | ns5.wixdns.net |

**No hay registros MX ni TXT.** Es decir, no hay ningún correo del tipo
`algo@debateaude.com`: la asociación usa `debateaude@gmail.com`, que no
depende del dominio. Eso simplifica mucho las cosas, porque no hay nada de
correo que preservar.

Las tres direcciones IP y el CNAME son de Wix. Cuando Cloudflare tome el
control del DNS habrá que quitarlos, o el dominio seguiría apuntando a la
web vieja.

---

## Paso 1 · Añadir el dominio en Cloudflare  ✅ hecho

Cuenta gratuita, **Add a site**, `debateaude.com`, plan **Free**.

Al terminar, Cloudflare enseña este mensaje y se queda esperando:

> *Waiting for your registrar to propagate your new nameservers.*

**Ese mensaje no significa que esté en marcha: significa que Cloudflare
está esperando a que hagas el paso 2.** Puede esperar indefinidamente. Hasta
que no se cambien los servidores de nombres en Wix, no pasa nada.

---

## Paso 2 · Copiar los servidores de nombres de Cloudflare

En el panel de Cloudflare, entra en `debateaude.com` → pestaña **DNS** →
**Records**. Arriba, o en la pantalla de resumen (**Overview**), aparecen
dos direcciones con esta pinta:

```
adam.ns.cloudflare.com
lola.ns.cloudflare.com
```

Los nombres propios cambian en cada cuenta. Cópialos tal cual.

---

## Paso 3 · Ponerlos en Wix

**Aviso importante:** esto **no** se hace en la pantalla de *Administra los
registros DNS*. Ahí los registros NS aparecen con la nota «Los registros NS
no son editables», y es normal: desde ahí no se tocan.

La opción está un nivel más arriba:

1. En Wix, ve a **Ajustes → Dominios**.
2. Pulsa sobre `debateaude.com` (sobre el nombre, no sobre «Registros DNS»).
3. Busca la opción de **conectar el dominio a un sitio externo** o de
   **cambiar los servidores de nombres**. Suele estar en un apartado
   *Avanzado* o detrás del menú de tres puntos del dominio.
4. Si te ofrece elegir entre dos métodos, elige el de **servidores de
   nombres** (*nameservers*), no el de «apuntar» con registros A.
5. Sustituye `ns4.wixdns.net` y `ns5.wixdns.net` por los dos de Cloudflare.
6. Guarda.

> Los menús de Wix se mueven de sitio cada pocos meses. Lo que buscas
> siempre es lo mismo: dejar de usar los servidores de nombres de Wix y
> poner los de Cloudflare. Si no aparece por ningún lado, escribe al soporte
> de Wix pidiendo exactamente eso: *"quiero cambiar los servidores de nombres
> de mi dominio a unos externos"*.

Cloudflare manda un correo cuando detecta el cambio. Suele tardar menos de
una hora, aunque oficialmente puede llegar a 24. **Mientras tanto la web de
Wix sigue funcionando con normalidad**, así que no hay prisa ni riesgo.

---

## Paso 4 · Limpiar los registros heredados

Cuando Cloudflare confirme que el dominio está activo:

1. Entra en `debateaude.com` → **DNS** → **Records**.
2. Verás que Cloudflare copió los registros que tenía Wix. **Borra**:
   - los tres registros **A** de `debateaude.com` (las IP `185.230.63.x`),
   - el **CNAME** de `www` que apunta a `cdn1.wixdns.net`.

Son los que llevan a la web vieja. Si se quedan, el dominio seguiría
mostrando Wix.

Durante un ratito el dominio no llevará a ninguna parte. Dura lo que tardes
en hacer el paso 5, que es un minuto.

---

## Paso 5 · Conectar el dominio a la web nueva

En Cloudflare, **Workers & Pages** → tu proyecto → pestaña
**Custom domains** → **Set up a custom domain**:

1. Escribe `debateaude.com` y confirma.
2. Repite con `www.debateaude.com`.

Como el DNS ya lo lleva Cloudflare, los registros correctos y el certificado
de seguridad se crean solos. En pocos minutos `debateaude.com` muestra la
web nueva con su candado.

---

## Paso 6 · Comprobar, y sólo entonces cancelar Wix

Antes de cancelar nada, con calma:

- [ ] `debateaude.com` muestra la web nueva.
- [ ] `www.debateaude.com` también.
- [ ] Sale el candado de seguridad en la barra del navegador.
- [ ] El formulario de contacto envía y el correo llega a
      `debateaude@gmail.com`.
- [ ] Se ve bien desde el móvil, con datos y no por wifi de casa.

Con todo eso marcado, cancela **el plan Premium** de Wix. **No canceles ni
dejes expirar el dominio**, que es lo que sigue haciendo que `debateaude.com`
exista.

---

## Si algo sale mal

Vuelve a poner en Wix sus servidores de nombres originales:

```
ns4.wixdns.net
ns5.wixdns.net
```

En una hora todo está como estaba. No se pierde nada: la web de Wix sigue
existiendo mientras el plan siga activo, y por eso conviene no cancelarlo
hasta haber comprobado que lo nuevo funciona.
