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

**Ya están puestas.** Recortadas al encuadre de cada hueco y comprimidas a
menos de 155 KB cada una; los originales venían a 14-16 MB, que habrían
hundido la velocidad del sitio.

| Archivo del sitio | Original | Dónde sale |
|---|---|---|
| `portada.jpg` | JTG_3035 | Portada, a todo el ancho. Grupo en el césped de Butarque. |
| `aula.jpg` | WhatsApp 2023-06-03 | Portada, sección final. Sesión dentro del aula. |
| `historia.jpg` | JTG_2931 | Quiénes somos, junto al relato de los orígenes. |
| `equipo.jpg` | JTG_3049 | Quiénes somos, a todo el ancho. El equipo junto al roll-up. |
| `torneo.jpg` | JTG_3064 | Quiénes somos, junto a los logros. Equipo campeón. |
| `cunef.jpg` | JTG_1520 | Qué hacemos, a todo el ancho. La global en CUNEF. |
| `inclusion.jpg` | WhatsApp 2024-02-19 | Qué hacemos, tras las tres tarjetas. Down Madrid. |

### Sin colocar todavía

Están procesadas y listas en `assets/img/`, esperando sitio:

| Archivo | Qué es |
|---|---|
| `extra-grada.jpg` | El público en la grada, reaccionando. Muy expresiva. |
| `extra-celebracion.jpg` | Celebración y abrazos en la grada. |

Dime dónde las quieres y las coloco.

### Sigue faltando

Una foto de **alumnado de un instituto público debatiendo en clase**, con más
gente que la de `aula.jpg`. Es la que mejor demostraría el programa a un
equipo directivo que entre en la web por primera vez.

### Si quieres cambiar alguna

Sustituye el archivo en `assets/img/` conservando el nombre y la proporción.
Antes, pásala por [Squoosh](https://squoosh.app) a JPEG calidad 70-80 para
dejarla por debajo de 150 KB.

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
