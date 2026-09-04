# El dominio: cómo quedó y qué falta

`debateaude.com` ya apunta a la web nueva. Este documento deja constancia de
cómo está montado, porque dentro de dos años nadie se va a acordar, y explica
las dos cosas que conviene rematar.

---

## Cómo está montado ahora  ✅

```
GoDaddy (registro)  →  Cloudflare (DNS)  →  Cloudflare (la web)
```

| Pieza | Dónde vive | Qué hace |
|---|---|---|
| El registro del dominio | **GoDaddy** | Es la propiedad: quién es dueño de `debateaude.com`. Se renueva ahí, una vez al año. |
| El DNS | **Cloudflare** | Decide a qué servidor lleva el dominio. Se cambió poniendo en GoDaddy los servidores de nombres de Cloudflare. |
| La web | **Cloudflare** | Sirve los archivos de este repositorio. |
| Wix | — | Ya no pinta nada. |

Los tres registros `A` de Wix (`185.230.63.x`) y el `CNAME` de `www` a
`cdn1.wixdns.net` se quitaron al migrar. No hay registros `MX` ni `TXT`: no
existe ningún correo `@debateaude.com`, la asociación usa
`debateaude@gmail.com`.

### Qué se paga y qué no

| Concepto | Estado |
|---|---|
| Renovación del dominio en GoDaddy | Se sigue pagando, una vez al año |
| Cloudflare (DNS + web) | Gratis en este plan |
| Plan Premium de Wix | **Se puede cancelar** |

> **Cancela el plan de Wix, no el dominio.** Son cosas distintas y están en
> sitios distintos: el plan estaba en Wix, el dominio está en GoDaddy. Si
> alguna vez dejas expirar el dominio en GoDaddy, la web desaparece.

---

## Lo que falta · 1 · Tapar la dirección técnica

La web también responde en `web.debateaude.workers.dev`. Es la dirección
interna que Cloudflare le da a cualquier proyecto, y es normal que exista.

El problema es de posicionamiento: si Google la encuentra, ve dos webs
idénticas y reparte entre las dos el crédito que debería ir entero a
`debateaude.com`.

Ya hay dos defensas puestas en el código:

- Cada página lleva su `<link rel="canonical">` apuntando a `debateaude.com`.
  Es la señal que le dice a Google cuál es la buena.
- El archivo `_headers` manda un `X-Robots-Tag: noindex` cuando la visita
  entra por `workers.dev`.

**Lo definitivo, que sí conviene hacer, es un redirección en el panel** para
que esa dirección lleve al dominio bueno en vez de mostrar una copia:

1. Cloudflare → tu cuenta → **Rules** → **Redirect Rules** → **Create rule**.
2. Nombre: `workers.dev al dominio`.
3. En **If**, elige *Custom filter expression* y pon:
   - Field: **Hostname** · Operator: **equals** · Value: `web.debateaude.workers.dev`
4. En **Then**:
   - Type: **Dynamic**
   - Expression: `concat("https://debateaude.com", http.request.uri.path)`
   - Status code: **301**
   - Marca **Preserve query string**.
5. **Deploy**.

Comprueba que funciona abriendo `https://web.debateaude.workers.dev` en el
navegador: debería saltar solo a `debateaude.com`.

---

## Lo que falta · 2 · Darse de alta en Google

Google acaba encontrando la web sola, pero tarda semanas. Esto lo acelera y,
sobre todo, te deja ver qué está pasando.

1. Entra en <https://search.google.com/search-console> con el Google de la
   asociación.
2. **Añadir propiedad** → elige **Prefijo de URL** → `https://debateaude.com`.
3. Verifica. Como el DNS lo lleva Cloudflare, la opción del registro `TXT`
   es la más cómoda: Google te da un valor, tú lo pegas en
   Cloudflare → `debateaude.com` → **DNS** → **Add record** → tipo `TXT`.
4. Ya dentro, ve a **Sitemaps** y envía `sitemap.xml`.
5. En **Inspección de URL**, pega `https://debateaude.com` y pulsa
   **Solicitar indexación**. Repítelo con las otras cuatro páginas.

Si `debateaude.com` ya salía en Google con la web de Wix, tardará unos días
en cambiar los textos por los nuevos. Es normal y no hay que tocar nada.

---

## Si alguna vez hay que volver atrás

En GoDaddy, en la configuración del dominio, se vuelven a poner los
servidores de nombres del proveedor que se quiera. El cambio tarda entre una
hora y un día en notarse. Nada de esto borra el dominio: sólo cambia a dónde
apunta.

Y si algún día se quiere unificar todo en un sitio, el registro se puede
transferir de GoDaddy a Cloudflare, que lo cobra a precio de coste (unos
10 €/año). No corre ninguna prisa y la web no se entera.
