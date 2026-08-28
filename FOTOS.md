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

| Archivo | Medidas | Dónde sale | Qué tiene que verse |
|---|---|---|---|
| `portada.jpg` | 1600 × 900 | Portada, a todo el ancho, justo bajo el titular | **La más importante.** Foto de grupo amplia y horizontal. La del torneo en el campo del Leganés encaja perfectamente. |
| `programa.jpg` | 1200 × 900 | Portada, sección final | **La que más falta hace y no tenéis.** Alumnado de un instituto público durante una sesión, dentro del aula. Es la prueba de lo que hacéis. |
| `equipo.jpg` | 1600 × 900 | Quiénes somos, a todo el ancho | El equipo de AUDE junto. La foto de los doce con el cartel de "Equipo campeón" vale. |
| `torneo.jpg` | 1500 × 1000 | Quiénes somos, junto a los logros | Entrega de premios, con el cartel del torneo visible. |
| `formadores.jpg` | 1200 × 900 | Qué hacemos, a todo el ancho | Alguien del equipo de pie delante del alumnado, explicando. Vale una foto de una masterclass. |
| `inclusion.jpg` | 1200 × 900 | *(sin usar todavía)* | Actividad con Down Madrid, Down Navarra, Down Almería o A Toda Vela. Cuando la tengas, dímelo y le hago sitio en Qué hacemos. |

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

## Dos cosas que hay que mirar antes de publicar

**Menores de edad.** Varias fotos son de alumnado de instituto. Antes de
publicarlas necesitáis la autorización de imagen firmada por las familias, o
usar encuadres donde no se reconozca a nadie (planos de espaldas, generales
muy abiertos, primeros planos de manos o del atril). Es el motivo más común
por el que a una asociación le llega una reclamación.

**Marcas de agua y autoría.** Algunas fotos llevan la marca de HOLE STUDIO.
Si las hizo un fotógrafo contratado, confirma que podéis usarlas en la web y
si hay que acreditarle. Si hay que hacerlo, dímelo y añado el crédito en el
pie de foto.

## Textos alternativos

Cada foto lleva su `alt` escrito en el HTML, describiendo lo que se ve para
quien usa lector de pantalla. Si cambias mucho el contenido de una foto,
avísame y lo reescribo: un `alt` que no se corresponde con la imagen es peor
que no tenerlo.
