# Fotografías: qué hace falta y dónde va cada una

Ahora mismo todos los huecos tienen un **marcador** provisional: una imagen
lila con el nombre del archivo y la descripción de lo que debe ir ahí. Así la
web nunca se ve rota, y sustituir una foto es **copiar el archivo encima, sin
tocar nada de código**.

## Cómo sustituirlas

1. Prepara la foto con las medidas de la tabla (o algo mayor, con la misma
   proporción).
2. Guárdala en **JPEG** con el nombre exacto del archivo.
3. Sobrescribe el archivo dentro de `assets/img/`.

Si subes los cambios por GitHub, puedes arrastrar los archivos directamente
sobre la carpeta `assets/img/` desde la web de GitHub y sustituirán a los
marcadores.

### Peso de los archivos

El objetivo es que ninguna página pase de 500 KB. Antes de subirlas,
comprímelas: con [Squoosh](https://squoosh.app) (arrastras la foto, eliges
JPEG, calidad 75-80) cada una debería quedar **por debajo de 200 KB**. Una
foto recién salida del móvil pesa 4-6 MB y hundiría la velocidad del sitio.

## Fotos de escena

Estas cinco ya las tenéis. La columna «Tu archivo» es la foto que me indicaste;
solo hay que **renombrarla** al nombre de la primera columna y subirla.

| Archivo del sitio | Tu archivo | Medidas | Dónde sale |
|---|---|---|---|
| `portada.jpg` | `JTG_3035` | 1600 × 900 | Portada, a todo el ancho. Grupo en el césped de Butarque. |
| `torneo.jpg` | `JTG_1520` | 1500 × 1000 | Quiénes somos, junto a los logros. La global en CUNEF. |
| `equipo.jpg` | `JTG_3049` | 1600 × 900 | Quiénes somos, a todo el ancho. El equipo junto al roll-up. |
| `inclusion.jpg` | `WhatsApp Image 2024-02-19 at 20.51.16` | 1200 × 900 | Qué hacemos, tras las tres tarjetas. Colaboración con Down Madrid. |
| `formadores.jpg` | `WhatsApp Image 2023-06-03 at 12.33.48 (1).jpeg` | 1200 × 900 | Qué hacemos, a todo el ancho. Formador en clase. |
| `programa.jpg` | **falta** | 1200 × 900 | Portada, sección final. Alumnado de un instituto público en plena sesión, dentro del aula. Es la única que sigue pendiente, y es la que mejor demuestra lo que hacéis. |

Las medidas son orientativas: lo que importa es **la proporción**. Si la foto
es más grande, mejor; el navegador la ajusta. Si es bastante más apaisada o
más cuadrada que lo indicado, se recortará por el centro.

## Retratos de la junta

Van en `assets/img/junta/`, **cuadrados, 600 × 600 px**, con la cara centrada
y espacio por encima de la cabeza. Mientras no las haya, se ven las iniciales
sobre un fondo de marca, que queda digno.

| Archivo | Persona |
|---|---|
| `junta/miguel-matellanes.jpg` | Miguel Matellanes |
| `junta/irene-bailon.jpg` | Irene Bailón |
| `junta/alejandro-hernandez.jpg` | Alejandro Hernández |
| `junta/laura-bacariza.jpg` | Laura Bacariza |
| `junta/irene-sancho.jpg` | Irene Sancho |
| `junta/guillermo-fernandez.jpg` | Guillermo Fernández |
| `junta/violeta-de-santiago.jpg` | Violeta De Santiago |
| `junta/paula-lacave.jpg` | Paula Lacave |
| `junta/andrea-machuca.jpg` | Andrea Machuca |

No hace falta que sean fotos de estudio: sirven recortes de fotos de torneos,
siempre que la cara se vea con claridad y todas tengan un aire parecido.

## Permisos

Confirmado por la asociación: hay autorización de imagen para el alumnado que
aparece en las fotos, y las de HOLE STUDIO son de un encargo propio, así que se
pueden usar. Si en algún momento el estudio pide crédito, dímelo y añado la
línea en el pie de foto.

## Textos alternativos

Cada foto lleva su `alt` escrito en el HTML, describiendo lo que se ve para
quien usa lector de pantalla. Si cambias mucho el contenido de una foto,
avísame y lo reescribo: un `alt` que no se corresponde con la imagen es peor
que no tenerlo.
