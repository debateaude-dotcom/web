# debateaude.com

Sitio estático de la Asociación Debate Aude. HTML, CSS y JavaScript puros:
sin frameworks, sin dependencias que instalar y sin paso de compilación.
La carpeta se sube tal cual.

## Estructura

```
index.html            Portada
quienes-somos.html    Historia, misión, junta directiva y logros
que-hacemos.html      El programa en cuatro fases
unete.html            Vías de participación + formulario de inscripción
contacto.html         Datos de contacto + formulario de contacto
gracias.html          Confirmación para quien navega sin JavaScript
404.html              Página de error (Cloudflare Pages la usa sola)

styles.css            Hoja de estilos única de todo el sitio
js/main.js            Menú móvil y año del pie
js/forms.js           Validación y envío de los formularios

assets/
  logo-aude.svg       Lockup completo, colores fijos (para <img> y redes)
  logo-inline.svg     Lockup que hereda el color del texto (para incrustar)
  isotipo-aude.svg    Sólo el monograma DA, colores fijos
  isotipo-inline.svg  Monograma que hereda el color (se usa en la cabecera)
  favicon.svg         Monograma negro sobre el amarillo de marca
  zigzag.svg          Motivo gráfico del manual de identidad
  og-debate-aude.png  Imagen para redes sociales, 1200×630

robots.txt  sitemap.xml  _headers
FORMSPREE.md          Alta en Formspree y dónde pegar cada endpoint
```

## Desplegar en Cloudflare Pages

1. Entra en el panel de Cloudflare → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**, y elige este repositorio.
2. En la configuración de compilación:
   - **Framework preset**: `None`
   - **Build command**: déjalo **vacío**
   - **Build output directory**: `/`
3. **Save and Deploy**.
4. En **Custom domains**, añade `debateaude.com` y `www.debateaude.com`.

Si prefieres no conectar Git, en **Upload assets** puedes arrastrar la
carpeta entera: no hay nada que compilar.

El archivo `_headers` lo aplica Cloudflare Pages automáticamente. Define
la política de seguridad de contenidos (sólo se permiten Google Fonts y
Formspree) y los plazos de caché.

## Antes de publicar

Hay tres cosas pendientes de datos reales. Están marcadas en el código
para que sea imposible desplegarlas por descuido:

| Qué                | Dónde                                   | Estado |
|--------------------|------------------------------------------|--------|
| Endpoints Formspree| `unete.html` y `contacto.html`, `XXXXXXXX` en el `action` | pendiente — ver `FORMSPREE.md` |
| Correo de contacto | `hola@debateaude.com` en todas las páginas | confirmar que existe |
| Perfiles sociales  | Instagram en el pie y en el JSON-LD      | confirmar la URL |

Para encontrarlos:

```sh
grep -rn "XXXXXXXX\|hola@debateaude.com" *.html
```

## Cambiar la paleta

Las cinco primeras líneas de `styles.css` contienen todos los colores de
marca. El resto de la hoja deriva de ellas:

```css
:root {
  --marca-fondo:   #000000;  /* fondo dominante */
  --marca-texto:   #FEF6F6;  /* texto sobre el fondo */
  --marca-accion:  #FFDE57;  /* botones y acentos */
  --marca-apoyo:   #C09DFA;  /* segundo acento */
  --marca-acento:  #8751F4;  /* marcas del logo, detalles */
}
```

Justo debajo hay dos derivados, `--acento-oscuro` y `--acento-claro`, que
existen porque el morado de marca no llega a 4,5:1 sobre negro ni sobre
los fondos claros. Si cambias `--marca-acento`, recalcula también
`--acento-claro`.

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

Si tocas los colores, comprueba el contraste antes de publicar: la paleta
de marca es muy luminosa y sólo funciona sobre fondo oscuro.
