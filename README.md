# debateaude.com

Sitio estático de la Asociación Debate Aude. HTML, CSS y JavaScript puros:
sin frameworks, sin dependencias que instalar y sin paso de compilación.
La carpeta se sube tal cual.

## Estructura

```
index.html            Portada
quienes-somos.html    Historia, junta directiva y logros
que-hacemos.html      El programa paso a paso
crono.html            Cronómetro de debate para torneos
contacto.html         Único punto de contacto: vías directas + formulario
gracias.html          Confirmación para quien navega sin JavaScript
404.html              Página de error (Cloudflare Pages la usa sola)

styles.css            Hoja de estilos única de todo el sitio
js/main.js            Menú móvil y año del pie
js/forms.js           Validación y envío del formulario
js/crono.js           Lógica del cronómetro de debate

assets/
  logo-aude.svg       Lockup completo, colores oficiales
  logo-negativo.svg   El mismo, para fondo morado (se usa en el pie)
  logo-negro.svg      Versión en negro, para impresión o fondos planos
  isotipo-aude.svg    Sólo el monograma DA (se usa en la cabecera)
  favicon.svg         Monograma sobre cuadrado morado, icono de pestaña
  zigzag.svg          Motivo gráfico del manual
  og-debate-aude.png  Imagen para redes sociales, 1200×630
  img/                Fotografías del sitio (ver FOTOS.md)
  img/logo-color.svg  Original que entregó la asociación, sin tocar
  img/logo-negro.svg  Ídem, versión negra

robots.txt  sitemap.xml  llms.txt  _headers

EDITAR.md             Cómo cambiar textos y fotos sin saber programar
DOMINIO.md            Cómo quedó montado el dominio y qué falta rematar
FORMSPREE.md          Alta en Formspree y dónde pegar el endpoint
FOTOS.md              Qué foto va en cada hueco y con qué medidas
```

> Si no eres una persona técnica y solo quieres corregir un texto o cambiar
> una foto, ve directamente a **[EDITAR.md](EDITAR.md)**. No necesitas nada
> de lo que viene a continuación.

## Desplegar en Cloudflare Pages

1. Entra en el panel de Cloudflare → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**, y elige este repositorio.
2. En la configuración de compilación:
   - **Framework preset**: `None`
   - **Build command**: déjalo **vacío**
   - **Build output directory**: `/`
3. **Save and Deploy**.
4. En **Custom domains**, añade `debateaude.com` y `www.debateaude.com`.
   El dominio está registrado en GoDaddy y el DNS lo lleva Cloudflare:
   el montaje completo está en [DOMINIO.md](DOMINIO.md).

Si prefieres no conectar Git, en **Upload assets** puedes arrastrar la
carpeta entera: no hay nada que compilar.

El archivo `_headers` lo aplica Cloudflare Pages automáticamente. Define
la política de seguridad de contenidos (sólo se permiten Google Fonts y
Formspree) y los plazos de caché.

## Antes de publicar

Queda esto por cerrar. Está marcado en el código para que sea imposible
desplegarlo por descuido:

| Qué                | Dónde                                   | Estado |
|--------------------|------------------------------------------|--------|
| Endpoint Formspree | `contacto.html`, `XXXXXXXX` en el `action` | **pendiente** — ver `FORMSPREE.md`. Es lo único que separa al formulario de funcionar: se sustituye una palabra. Mientras tanto el formulario no falla en silencio: valida, avisa y ofrece un enlace que abre el correo con lo escrito. |
| Retratos de la junta | `assets/img/junta/` | pendiente, se ven las iniciales — ver `FOTOS.md` |

Para encontrarlos:

```sh
grep -rn "XXXXXXXX" *.html
```

## Cambiar la paleta

Las cinco primeras líneas de `styles.css` contienen todos los colores de
marca. El resto de la hoja deriva de ellas:

```css
:root {
  --marca-fondo:  #FEF6F6;  /* fondo de la página */
  --marca-texto:  #1C1226;  /* texto principal */
  --marca-accion: #6C2BE0;  /* morado de interfaz: botones, enlaces, acentos */
  --marca-apoyo:  #FFDE57;  /* amarillo de marca: subrayados y bandas */
  --marca-oscuro: #2E1065;  /* morado profundo de las bandas destacadas */
}
```

El morado de interfaz es el morado de marca (`#8751F4`) oscurecido: el
original da 4,37:1 sobre el fondo claro y no llega al mínimo de
accesibilidad. En el logo se conserva el de marca.

El amarillo da 1,25:1 sobre fondo claro, así que **nunca se usa como texto**:
sólo como fondo de banda o como subrayado.

## Trabajar en local

No hace falta ninguna herramienta, pero abrir los archivos con `file://`
rompe las rutas absolutas (`/styles.css`). Levanta un servidor cualquiera:

```sh
python3 -m http.server 8080
# o
npx http-server -p 8080
```

## Accesibilidad

El sitio se ha revisado contra WCAG 2.1 AA: contraste de todos los textos,
orden de encabezados, foco visible, objetivos táctiles de 44 px, formularios
con etiquetas y errores asociados por `aria-describedby`, y navegación
completa por teclado. Los formularios y el menú funcionan sin JavaScript.

Si tocas los colores, comprueba el contraste antes de publicar. En especial
el amarillo y el morado claro del manual: sobre fondo claro no llegan ni de
lejos al mínimo, y por eso aquí sólo aparecen como fondo de banda o dentro
del logo, nunca como texto.

## El cronómetro

`crono.html` es una herramienta para usar durante los torneos, pensada para
proyectarse en el aula. Nombres de los equipos y duración de cada turno se
escriben en la propia página y **se guardan en el navegador**, así que quedan
puestos para la siguiente vez (cada dispositivo guarda los suyos).

El reloj no va restando de un intervalo, que se retrasa cuando la pestaña
pierde el foco: guarda el instante de arranque y calcula la diferencia contra
el reloj del sistema. Así no regala segundos aunque el navegador se duerma.

Los turnos por defecto son cuatro: introducción, refutación 1, refutación 2 y
conclusión. El interruptor **Refutación cruzada** añade un quinto turno entre
la introducción y la refutación 1, para los torneos que lo usan; se comporta
como cualquier otro turno y su estado también se guarda en el navegador. Si
está apagado, la página es exactamente la de antes.

Colores del reloj: amarillo mientras hay tiempo, naranja en los últimos diez
segundos, y rojo con cuenta ascendente en negativo al pasarse.

Atajos: **espacio** empieza o pausa, **R** reinicia, **←** y **→** pasan el
turno de un equipo al otro. El botón de pantalla completa deja sólo el
tablero, que es como conviene proyectarlo.

## Posicionamiento

Cada página lleva título, descripción, Open Graph y una etiqueta
`<link rel="canonical">` apuntando a `debateaude.com`, para que la dirección
técnica de Cloudflare (`web.debateaude.workers.dev`) no compita con el dominio
bueno. `gracias.html` y `404.html` van con `noindex` y por eso no llevan
canonical.

Hay datos estructurados (JSON-LD) en todas las páginas: `NGO` en la portada,
`BreadcrumbList` en las interiores, `ContactPage` en contacto, `FAQPage` en
qué hacemos y `WebApplication` en el cronómetro. Si tocas uno, comprueba que
sigue siendo JSON válido y pásalo por <https://validator.schema.org>.

`llms.txt` es un resumen en texto plano de la asociación con los datos que
más se citan mal (nombre, correo, coste, ámbito). Lo leen los buscadores con
IA. Si cambia algún dato de la web, cámbialo también ahí.
