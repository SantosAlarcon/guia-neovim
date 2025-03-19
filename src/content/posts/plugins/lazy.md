---
title: Plugins > Lazy
description: En esta sección se profundiza en el gestor de plugins de Lazy y cómo sacarle el mayor partido
---
# :Lazy

<details>
<summary>Tabla de contenidos</summary>

- [Atajos de teclado](/plugins/lazy/#atajos-de-teclado)
- [Pestaña Profile (Perfil)](/plugins/lazy/#pestana-profile-perfil)
- [Carga diferida de los plugins (Lazy load)](/plugins/lazy/#carga-diferida-de-los-plugins-lazy-load)
- [Eventos](/plugins/lazy/#eventos)
- [Aplicando los eventos a los plugins](/plugins/lazy/#aplicando-los-eventos-a-los-plugins)

</details>

![Captura de Lazy](https://user-images.githubusercontent.com/292349/208301737-68fb279c-ba70-43ef-a369-8c3e8367d6b1.png)

En la sección de [plugins](/plugins) hemos instalado un gestor de paquetes llamado **Lazy**, que cuenta con una interfaz de usuario muy intuitiva y
permite cargar según qué plugins de manera pasiva. De ahí el nombre de "lazy" (vago en _inglés_).

En este artículo toca profundizar bastante sobre este plugin.

## Atajos de teclado

| Tecla        | Descripción                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| <kbd>c</kbd> | Comprueba si el plugin tiene una actualización disponible                               |
| <kbd>i</kbd> | Instala el plugin seleccionado                                                          |
| <kbd>r</kbd> | Restaura la versión del plugin a la que hay en el archivo "lock"                        |
| <kbd>u</kbd> | Actualiza el plugin seleccionado                                                        |
| <kbd>x</kbd> | Borra un plugin, incluso estando instalado.                                             |
| <kbd>C</kbd> | Comprueba si hay actualizaciones y muestra los últimos cambios de versión               |
| <kbd>D</kbd> | Muestra los registros de depuración                                                     |
| <kbd>H</kbd> | Vuelve a la pantalla principal, en la que se muestra la lista de plugins                |
| <kbd>I</kbd> | Instala los plugins que todavía no están instalados                                     |
| <kbd>L</kbd> | Muestra los últimos commits de todos los plugins                                        |
| <kbd>P</kbd> | Ofrece un informe sobre la carga de todos los plugins y el tiempo de arranque de Neovim |
| <kbd>R</kbd> | Actualiza todos los plugins a la versión indicada en el archivo "lock".                 |
| <kbd>S</kbd> | Ejecuta la instalación, construcción y actualización del plugin                         |
| <kbd>U</kbd> | Actualiza los plugins que tiene una actualización nueva                                 |
| <kbd>X</kbd> | Borra los directorios de los plugins que ya no están instalados                         |
| <kbd>?</kbd> | Muestra la ayuda de Lazy                                                                |

## <a name="pestana-profile-perfil"></a> Pestaña Profile (Perfil)

![Pestaña Perfil de Lazy](/images/lazy/lazy-profile.webp)

Esta pestaña la vamos a visitar muy a menudo para comprobar el tiempo que tarda en arrancar Neovim tras instalar un buen puñado de plugins. No es lo mismo el tiempo de carga de Neovim en un búfer vacío sin nada, que un archivo de Python o de cualquier otro lenguaje, en el que ya tiene cargado el servidor de lenguaje, el linter y el formateador.

> El tiempo de arranque se mide en ms (milisegundos), y lo más obvio es que contra menos milisegundos, menos tiempo carga Neovim.

En esta pestaña nos muestra un **listado de los plugins** y del \*\*tiempo que han tardado en cargar, del primero al último. Y en este punto hay que decidir cuáles hay que hacer que se carguen más tarde. En la siguiente sección vamos a ver cómo hacemos eso.

## Carga diferida de los plugins (Lazy load)

Esta es una de las características clave de Lazy, el poder **cargar plugins de manera diferida**, de modo que el tiempo de carga sea mucho menor. Para eso hay que mirar el listado de plugins dentro de la pestaña **Profile** y averiguar cuál es el que tarda más tiempo en cargar.

Una vez identificado el plugin, hay que ir al archivo `plugins.lua` y dentro de las
llaves podemos introducir `lazy = true` o `event = "VeryLazy"`.

Con la opción `lazy` le estamos diciendo que solo cargue ese plugin en cuanto se necesite.

Los casos en los que se cargarán los plugins de manera diferida son estos:

- El plugin sólo existe como dependencia en el archivo de especificaciones (o sea, el `plugins.lua`).
- Si tiene una clave `event`, `cmd`, `ft` o `keys`.
- Si está configurado por defecto para cargar de manera diferida.

También hay una opción `priority`, en la que podemos especificar la prioridad de ese
plugin. El plugin que tenga más prioridad, será el primero en cargarse.

> Por defecto, el número de prioridad es de 50.
>
> > > Ten en cuenta que hay algunos plugins pesados que pueden hacer que Neovim tarde mucho en cargar. Comprueba si hay algún otro plugin que tenga la misma funcionalidad, pero que sea ligero en cuanto a velocidad de carga.

Si quieres, puedes echarle un vistazo a cómo está estructurado el [directorio de plugins de LazyVim](https://github.com/LazyVim/LazyVim/tree/main/lua/lazyvim/plugins), una configuración lista para usarse y que hace uso de Lazy para cargar los plugins y mejorar el rendimiento de Neovim. Además está creada por [Folke](https://github.com/Folke), el mismo autor de Lazy.

En un futuro próximo hablaré sobre las configuraciones de Neovim más conocidas.

## Eventos

Dentro de las especificaciones de plugins hay una propiedad llamada `event`, la cual
define el evento que se tiene que producir para cargar un plugin.

Partimos de la base de que ningún plugin tiene configurado algún evento, por lo que se
cargarán todos al iniciar Neovim, lo que hará que el tiempo de carga sea mayor.

Por ello es aconsejable pensar cuáles son los plugins que se van a cargar cuando se
produzca X evento.

Antes habíamos visto el evento `'VeryLazy'`, que es exclusivo de Lazy. Pero Neovim ya trae varios eventos, los cuales se recogen en `:help events`. En la siguiente tabla se recogen los principales eventos que se aplican a los plugins.

| Evento                     | Descripción                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `BufAdd`                   | Cuando se crea un nuevo búfer y se añade a la lista de búfers o se renombra el mismo   |
| `BufDelete`                | Cuando se borra un búfer de la lista de búfers                                         |
| `BufEnter`                 | Después de entrar dentro de un búfer                                                   |
| `BufFilePost`              | Después de cambiar el nombre del búfer                                                 |
| `BufFilePre`               | Antes de cambiar el nombre del búfer                                                   |
| `BufHidden`                | Antes de que el búfer se quede oculto                                                  |
| `BufLeave`                 | Antes de irse a otro búfer, o a otra ventana                                           |
| `BufNew`                   | Después de crear un nuevo búfer, o renombrado                                          |
| `BufNewFile`               | Cuando se crea un archivo que todavía no existe                                        |
| `BufRead`                  | Cuando se empieza a editar un nuevo búfer                                              |
| `BufReadPost`              | Después de leer el archivo en el búfer                                                 |
| `BufReadPre`               | Cuando se comienza a editar un nuevo búfer, antes de leer el archivo en el búfer       |
| `BufUnload`                | Cuando está a punto de liberar el búfer de la lista                                    |
| `BufWinEnter`              | Después de que un búfer se muestre en una ventana                                      |
| `BufWinLeave`              | Antes de que un búfer se borre de una ventana                                          |
| `BufWipeout`               | Antes de que borrar un búfer                                                           |
| `BufWrite` o `BufWritePre` | Antes de escribir el búfer entero a un archivo                                        |
| `BufWritePost`             | Después de escribir el búfer entero a un archivo                                      |
| `InsertChange`             | Cuando se intercambia entre el modo **Insertar** o **Reemplazo**                       |
| `InsertCharPre`            | Cuando se escribe un carácter en el modo **Insertar**, antes de insertarlo en el búfer |
| `InsertEnter`              | Antes de entrar en el modo **Insertar**, **Reemplazo** o **Reemplazo Virtual**         |
| `InsertLeavePre`           | Antes de abandonar el modo **Insertar**                                                |
| `InsertLeave`              | Después de abandonar el modo **Insertar**                                              |
| `VimEnter`                 | Cuando ya está cargado Neovim                                                          |

## Aplicando los eventos a los plugins

![Antes de los eventos](/images/lazy/lazy-antes-eventos.webp)

Nuestra instalación de Neovim tiene 20 plugins, y ha tardado en iniciarse unos 120ms, lo cuál no está mal, pero se podría mejorar mucho más.

Vamos a ir por cada archivo de configuración (o de especificación) y vamos a cambiar a estos eventos:

- **Lualine**: `VeryLazy`
- **Neotree**: `VeryLazy`
- **Lspconfig**: `BufRead`
- **nvim-cmp**: `InsertEnter`
- **LuaSnip**: `InsertEnter`
- **Treesitter**: `VeryLazy`
- **mini.pairs**: `InsertEnter`
- **nvim-ts-autotag**: `BufRead`
- **Null-LS**: `BufRead`

Tras aplicarle los eventos, vamos a ver cuál es el tiempo de carga.

![Tras los eventos aplicados](/images/lazy/lazy-profile2.webp)

**¡¡19.82 ms!!** ¡Ni tan mal, oye!

> Es importante jugar con los eventos, ya que algunos pueden hacer que el plugin no cargue correctamente.

> Ten en cuenta que los plugins que dependen de uno, al configurar X evento, también se verán afectados.
