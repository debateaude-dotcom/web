# Cómo editar la web

Guía para cualquiera de la asociación. **No hace falta saber programar ni
instalar nada**: se hace todo desde el navegador.

---

## Cómo funciona esto

La web vive en GitHub, que es como un Drive con historial. Cuando alguien
guarda un cambio ahí, Cloudflare lo publica solo en `debateaude.com` en
menos de un minuto.

```
Editas en GitHub  →  guardas  →  al minuto está en la web
```

Todo queda registrado: quién cambió qué y cuándo. **Cualquier cosa se puede
deshacer**, así que no tengas miedo de tocar. Al final de esta guía está
cómo.

---

## Antes de empezar: entrar

1. Crea una cuenta en <https://github.com> si no la tienes.
2. Pídele a quien administre el repositorio que te dé acceso.
3. Entra en el repositorio `debateaude-dotcom/web`.

---

## Cambiar un texto

Ejemplo: corregir una frase de la portada.

1. En el repositorio, pulsa sobre el archivo de la página que quieras
   cambiar:

   | Página de la web | Archivo |
   |---|---|
   | Inicio | `index.html` |
   | Quiénes somos | `quienes-somos.html` |
   | Qué hacemos | `que-hacemos.html` |
   | Cronómetro | `crono.html` |
   | Contacto | `contacto.html` |

2. Arriba a la derecha del archivo hay un **lápiz** ✏️. Púlsalo.

3. Busca el texto con `Ctrl+F` (o `Cmd+F` en Mac) y cámbialo.

4. Baja del todo y pulsa **Commit changes**. Escribe en una línea qué has
   cambiado, por ejemplo *"Corrijo el nombre del instituto de Leganés"*, y
   confirma.

5. Espera un minuto y recarga `debateaude.com`.

### La única regla al editar texto

El archivo está lleno de etiquetas entre `<` y `>`. **Cambia solo lo que hay
entre una etiqueta y la siguiente.** Por ejemplo, en esta línea:

```html
<h3>Formamos al alumnado</h3>
```

puedes cambiar `Formamos al alumnado`, pero no toques `<h3>` ni `</h3>`.

Si por lo que sea borras una etiqueta sin querer, no pasa nada: se deshace
(ver el final).

### Caracteres a evitar

Dentro del texto, no escribas los símbolos `<`, `>` ni `&` sueltos. Si
necesitas un "&", escribe `&amp;`. Todo lo demás (tildes, eñes, comillas,
signos de interrogación) se puede escribir con normalidad.

---

## Cambiar una foto

Es lo más fácil, porque no se toca ningún código.

1. Prepara la foto: entra en <https://squoosh.app>, arrastra la imagen,
   elige **JPEG** a la derecha, baja la calidad hasta que ponga menos de
   **150 KB** abajo, y descárgala.
2. Renómbrala **exactamente igual** que la que quieres sustituir (mira la
   tabla de `FOTOS.md`), por ejemplo `portada.jpg`.
3. En GitHub, entra en la carpeta `assets` → `img`.
4. Pulsa **Add file** → **Upload files** y arrastra tu foto.
5. Pulsa **Commit changes**.

Como el nombre es el mismo, sustituye a la anterior y la web se actualiza
sola. Procura que la foto nueva sea **igual de apaisada o de cuadrada** que
la vieja, o se recortará por el centro.

### Poner las fotos de la junta directiva

Igual, pero en la carpeta `assets/img/junta`, con fotos **cuadradas** y con
el nombre de cada persona (están listados en `FOTOS.md`). Mientras no haya
foto se ven las iniciales sobre un color, que queda bien.

---

## Ver cómo queda antes de publicarlo

Recomendable si el cambio es grande o si no las tienes todas contigo.

Al guardar (paso 4 de más arriba), en vez de dejar marcada la primera
opción, elige **Create a new branch for this commit** y ponle un nombre
como `prueba-textos`. Se guarda en un borrador, sin tocar la web pública.

Cloudflare publica ese borrador en una dirección temporal. La encuentras
entrando en Cloudflare → tu proyecto de Pages → **Deployments**: el de
arriba del todo es el tuyo, con su propio enlace. Ábrelo, míralo, y si te
convence entra en la pestaña **Pull requests** de GitHub y pulsa
**Merge pull request** para que pase a la web de verdad.

---

## Qué NO tocar

Estos archivos hacen que la web funcione. Si hay que cambiarlos, mejor
pedirlo a alguien técnico:

| Archivo | Qué es |
|---|---|
| `styles.css` | Todos los colores, tipografías y la maquetación |
| `js/` (la carpeta entera) | El menú, el formulario y el cronómetro |
| `_headers` | La seguridad del sitio |
| `sitemap.xml`, `robots.txt` | Lo que ve Google |

Y dentro de las páginas, no toques lo que está **antes** de la línea que
pone `<body>`: ahí van el título que sale en Google y los datos que usan
Instagram y WhatsApp para la vista previa.

---

## Deshacer algo

Todo cambio se puede revertir, aunque ya esté publicado.

1. En el repositorio, pestaña **Commits** (o el icono del reloj con la
   flecha).
2. Busca el cambio que quieres deshacer y púlsalo.
3. Arriba a la derecha, botón **Revert**.
4. Confirma.

En un minuto la web vuelve a estar como antes. Nada se pierde: queda tanto
el cambio como la marcha atrás.

Si la web se ve rota y no sabes por qué, esto lo arregla casi siempre:
deshaz el último cambio y avisa.

---

## Cosas que esta guía no cubre

Para estas hace falta alguien que sepa tocar código. Merece la pena pedirlo
antes que improvisar:

- Añadir una página nueva o quitar una.
- Cambiar el menú de navegación.
- Cambiar los colores o las tipografías.
- Mover secciones de sitio o cambiar cómo se distribuyen.
- Tocar el formulario de contacto.

---

## Resumen para pegar en el grupo

> **Cambiar un texto:** github.com → repositorio `web` → el archivo de la
> página → lápiz ✏️ → editas → *Commit changes*. Al minuto está online.
>
> **Cambiar una foto:** squoosh.app para dejarla en menos de 150 KB →
> renómbrala igual que la vieja → `assets/img` → *Add file* → *Upload files*.
>
> **Metí la pata:** pestaña *Commits* → tu cambio → botón *Revert*.
