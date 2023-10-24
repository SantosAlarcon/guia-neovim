---
layout: "../../layouts/MDLayout.astro"
title: "Plugins - Lazy"
---

# :Lazy

![Captura de Lazy](https://user-images.githubusercontent.com/292349/208301737-68fb279c-ba70-43ef-a369-8c3e8367d6b1.png)

En la sección de [plugins](/guia-neovim/plugins) hemos instalado un gestor de paquetes llamado **Lazy**, que cuenta con una interfaz de usuario muy intuitiva y
permite cargar según qué plugins de manera pasiva. De ahí el nombre de "lazy" (vago en *inglés*).

En este artículo toca profundizar bastante sobre este plugin.

## Atajos de teclado

| Tecla | Descripción |
| ----- | ----------- |
| <kbd>c</kbd> | Comprueba si el plugin tiene una actualización disponible |
| <kbd>i</kbd> | Instala el plugin seleccionado |
| <kbd>r</kbd> | Restaura la versión del plugin a la que hay en el archivo "lock" |
| <kbd>u</kbd> | Actualiza el plugin seleccionado |
| <kbd>x</kbd> | Borra un plugin, incluso estando instalado. |
| <kbd>C</kbd> | Comprueba si hay actualizaciones y muestra los últimos cambios de versión |
| <kbd>D</kbd> | Muestra los registros de depuración |
| <kbd>H</kbd> | Vuelve a la pantalla principal, en la que se muestra la lista de plugins |
| <kbd>I</kbd> | Instala los plugins que todavía no están instalados |
| <kbd>L</kbd> | Muestra los últimos commits de todos los plugins |
| <kbd>P</kbd> | Ofrece un informe sobre la carga de todos los plugins y el tiempo de arranque de Neovim |
| <kbd>R</kbd> | Actualiza todos los plugins a la versión indicada en el archivo "lock". |
| <kbd>S</kbd> | Ejecuta la instalación, construcción y actualización del plugin |
| <kbd>U</kbd> | Actualiza los plugins que tiene una actualización nueva |
| <kbd>X</kbd> | Borra los directorios de los plugins que ya no están instalados |
| <kbd>?</kbd> | Muestra la ayuda de Lazy |

## Pestaña Profile (Perfil)

[Pestaña Perfil de Lazy](/guia-neovim/images/plugins/lazy/lazy-profile.webp)

Esta pestaña la vamos a visitar muy a menudo para comprobar el tiempo que tarda en arrancar Neovim tras instalar un buen puñado de plugins. No es lo mismo el tiempo de carga de Neovim en un búfer vacío sin nada, que un archivo de Python o de cualquier otro lenguaje, en el que ya tiene cargado el servidor de lenguaje, el linter y el formateador.

> El tiempo de arranque se mide en ms (milisegundos), y lo más obvio es que contra menos milisegundos, menos tiempo carga Neovim.

En esta pestaña nos muestra un listado de los plugins y del tiempo que han tardado en cargar, del primero al último. Y en este punto hay que decidir cuáles hay que hacer que se carguen más tarde. En la siguiente sección vamos a ver cómo hacemos eso.

## Carga diferida de los plugins (Lazy load)

Esta es una de las características clave de Lazy, el poder **cargar plugins de manera diferida**, de modo que el tiempo de carga sea mucho menor. Para eso hay que mirar el listado de plugins dentro de la pestaña **Profile** y averiguar cuál es el que tarda más tiempo en cargar.

Una vez identificado el plugin, hay que ir al archivo `plugins.lua` y dentro de las
llaves podemos introducir `lazy = true` o `event = "VeryLazy"`.

Con la opción `lazy` le estamos diciendo que solo cargue ese plugin en cuanto se necesite.

Los casos en los que se cargarán los plugins de manera diferida son estos:

+ El plugin sólo existe como dependencia en el archivo de especificaciones (o sea, el `plugins.lua`).
+ Si tiene una clave `event`, `cmd`, `ft` o `keys`.
+ Si está configurado por defecto para cargar de manera diferida.

También hay una opción `priority`, en la que podemos especificar la prioridad de ese
plugin. El plugin que tenga más prioridad, será el primero en cargarse.

> Por defecto, el número de prioridad es de 50.

>>> Ten en cuenta que hay algunos plugins pesados que pueden hacer que Neovim tarde mucho en cargar. Comprueba si hay algún otro plugin que tenga la misma funcionalidad, pero que sea ligero en cuanto a velocidad de carga.

Si quieres, puedes echarle un vistazo a cómo está estructurado el [directorio de plugins de LazyVim](https://github.com/LazyVim/LazyVim/tree/main/lua/lazyvim/plugins), una configuración lista para usarse y que hace uso de Lazy para cargar los plugins y mejorar el rendimiento de Neovim. Además está creada por [Folke](https://github.com/Folke), el mismo autor de Lazy.

En un futuro próximo hablaré sobre las configuraciones de Neovim más conocidas.
