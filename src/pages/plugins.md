---
layout: ../layouts/MDLayout.astro
title: Neovim - Plugins
---
# :plugins

Uno de los puntos fuertes de Neovim, aparte de la **configuración y personalización**, es la capacidad de instalar "plugins" que permiten **dotarles de muchas funcionalidades**, hasta el punto de convertirlo en un IDE (Entorno de desarrollo integrado). La cantidad de "plugins" que hay es tan inmensa, y además cuentan con su **documentación**, que es un plus adicional.

Para poder instalar plugins en Neovim tenemos que hacer uso de un gestor de plugins
como [Packer](https://github.com/wbthomason/packer.nvim), [Vim-Plug](https://github.com/junegunn/vim-plug) o [Lazy](https://github.com/folke/Lazy.nvim).

Para este sitio vamos a utilizar este último, ya que nos permite cargar plugins de manera "pasiva", haciendo que el tiempo de carga de Neovim sea más rápido.

## Instalación de Lazy

**ADVERTENCIA:** Antes de proceder a instalar **Lazy**, conviene tener instalado **git** en nuestro sistema operativo, ya que este gestor necesita clonar los repositorios para instalarse.

Una vez instalado **git**, nos vamos al directorio `$HOME/.config/nvim/lua/plugins` (no es obligatorio, pero es mejor así para poder organizar la configuración) y creamos el archivo **lazy-cfg.lua**.

Dentro del archivo pegamos esto:

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })

end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({})
```

Guardamos el archivo y luego abrimos el archivo **init.lua** del directorio "nvim".
Vamos, el que tenemos la configuración. Añadimos `require("plugins.lazy-cfg")` y
guardamos.

<img src="/guia-neovim/images/carga-lazy-init-lua.webp" alt="Carga de Lazy en el
init.lua" />

Salimos de Neovim y volvemos a ejecutarlo. Tardará un poco más en arrancar dado que
necesita clonar el repositorio. En un principio veremos la pantalla inicial de
Neovim como si nada, pero ahora **Lazy** ya está instalado.

Para entrar a **Lazy** usaremos el comando `:Lazy` y aparecerá el susodicho gestor de
plugins. Ahora mismo solo hay un plugin, que es el propio **Lazy**.

<figure>
  <img src="/guia-neovim/images/lazy.webp" alt="Lazy pelao" />
  <figcaption>El gestor Lazy sin plugins</figcaption>
</figure>

## Breve listado de plugins

Una vez tenemos instalado nuestro gestor de plugins favorito, ha llegado el momento de liarse la manta a la cabeza. Antes comenté que la cantidad de plugins que hay es tan inmensa, que el más novato se sentirá más perdido que una cabra en un garaje.

Para hacer más amena la lectura, nos vamos a basar en la lista de los plugins más populares de [Dotfyle](https://dotfyle.com/neovim/plugins/top). En la siguiente tabla se recogen dichos plugins y qué es lo que hace cada uno.

| Plugin                                                                     | Descripción                                                                                     |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Treesitter](https://github.com/nvim-treesitter/nvim-treesitter)           | Resaltado, indentación y auto-emparejamiento de código                                          |
| [Lspconfig](https://github.com/neovim/nvim-lspconfig)                      | Configuraciones rápidas del LSP (Protocolo de servicio del lenguaje) de Neovim                  |
| [Mason](https://github.com/williamboman/mason.nvim)                        | Gestor portable para LSPs, Linter, depuradores y formateadores                                  |
| [None-LS](https://github.com/nvimtools/none-ls.nvim)                       | Usa Neovim como servidor de lenguaje para inyectar diagnósticos LSP, acciones de código, etc... |
| [nvim-cmp](https://github.com/hrsh7th/nvim-cmp)                            | Autocompletado                                                                                  |
| [Plenary](https://github.com/nvim-lua/plenary.nvim)                        | Contiene bastantes funciones de Lua. Requerido por algunos plugins                              |
| [Telescope](https://github.com/nvim-telescope/telescope.nvim)              | Buscador tipo "fuzzy-finder"                                                                    |
| [Lualine](https://github.com/nvim-lualine/lualine.nvim)                    | Barra de estado rápida, escrita en Lua                                                          |
| [LuaSnip](https://github.com/L3MON4D3/LuaSnip)                             | Motor para cargar fragmentos de código (snippets) escrito en Lua                                |
| [LspKind](https://github.com/onsails/lspkind.nvim)                         | Pictogramas al estilo **Visual Studio Code** para el LSP de Neovim                              |
| [nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons)        | Paquete de iconos para desarrolladores para Neovim                                              |
| [vim-devicons](https://github.com/ryanoasis/vim-devicons)                  | Paquete de iconos para desarrolladores para Vim                                                 |
| [indent-blankline](https://github.com/lukas-reineke/indent-blankline.nvim) | Guías para resaltar la indentación/sangría                                                      |
| [nvim-autopairs](https://github.com/windwp/nvim-autopairs)                 | Autoemparejamiento                                                                              |
| [Nui](https://github.com/MunifTanjim/nui.nvim)                             | Librería de componentes para la IU de Neovim                                                    |
| [nvim-notify](https://github.com/rcarriga/nvim-notify)                     | Gestor de notificaciones                                                                        |
| [Noice](https://github.com/folke/noice.nvim)                               | Reemplaza la IU de Neovim por otra                                                              |
| [WhichKey](https://github.com/folke/which-key.nvim)                        | Muestra un listado de los atajos de Neovim, y permite añadir otros nuevos                       |
| [nvim-dap-ui](https://github.com/rcarriga/nvim-dap-ui)                     | IU para el modo de depuración                                                                   |
| [NeoTree](https://github.com/nvim-neo-tree/neo-tree.nvim)                  | Gestor de archivos y directorios                                                                |
| [Trouble](https://github.com/folke/trouble.nvim)                           | Lista de diagnósticos de código y corrección de errores                                         |
| [move.nvim](https://github.com/fedepujol/move.nvim)                        | Mover líneas y bloques de texto como en el **Visual Studio Code**                               |

También hay mogollón de esquemas de colores que no han entrado en la tabla, pero que en esta [lista](https://dotfyle.com/neovim/colorscheme/top) se recogen los más utilizados por la comunidad. Pero esto ya queda a gusto del consumidor.

## Y ahora... ¡a instalar los plugins!

Esta vez sí que sí... ¡vamos al turrón!

Vamos a crear el archivo `plugins.lua` dentro de nuestro directorio `lua/plugins` de la configuración de Neovim. Antes de editar dicho archivo, conviene saber el creador y el nombre del repositorio de ese plugin. Vamos a instalar **Lualine** para ver cómo se instala un plugin.

Dentro del archivo `plugins.lua` escribimos esto:

```lua
return {
  -- Lualine
  {"nvim-lualine/lualine.nvim", dependencies = {"nvim-tree/nvim-web-icons"}},
}
```

Vamos a desmenuzar el ejemplo anterior:

- La palabra clave `return` significa que devuelve un valor. Esto lo necesitaremos para más adelante.
- Lo que hay entre corchetes es el nombre del repositorio del plugin (formado por el nombre del autor y el repositorio).
- Lo de `dependencies` es opcional, ya que le estamos indicando que instale además la dependencia de ese plugin.

¿Te acuerdas del archivo **lazy-cfg.lua**? Pues toca modificarlo para que instale los plugins. Dentro de la misma hay que cambiar las siguientes cosas:

```lua
-- Carga Lazy con la lista de plugins
require("lazy").setup({
    spec = {
        {import = "plugins.plugins"},
    }
})
```

Guardamos los cambios. Salimos de Neovim y cuando volvamos a arrancarlo, detectará los nuevos plugins y los instalará.

<img src="/guia-neovim/images/instalacion-plugins.webp" alt="Instalando nuevos plugins con Lazy" />

Pero... **¡¡OJO!!** Que se instalen los plugins no significa que estén activados por
defecto. Para eso vamos a crear un nuevo archivo llamado `lualine-cfg.lua` dentro de este
directorio. A continuación lo abrimos y escribimos esto:

```lua
-- Activamos el Lualine
require("lualine").setup()
```

<img src="/guia-neovim/images/activando-lualine.webp" alt="Activando Lualine 1" />

Ahora tenemos que llamarlo desde el archivo **init.lua** del directorio raíz de la
configuración (sí, ese que está en `$HOME/.config/nvim`). Dentro metemos esto:

```lua
require("plugins.lualine-cfg")
```

<img src="/guia-neovim/images/activando-lualine2.webp" alt="Activando Lualine 2" />

Salimos de Neovim, volvemos a ejecutarlo y ...

<figure>
    <img src="/guia-neovim/images/lualine-activado.webp" alt="Lualine activado" />
    <figcaption>
        <b>Voilá!!</b> Ya tenemos activado el <b>Lualine</b>.
    </figcaption>
</figure>

## Consideraciones especiales

- Encontrar el plugin que más se ajuste a nuestras necesidades es una tarea que puede llevarnos horas. Por eso hay que escoger tal plugin para X propósito.
- También hay que recordar que instalar demasiados plugins puede **afectar al tiempo de inicio** de Neovim y también puede perjudicar el funcionamiento del editor. En **Lazy** podemos configurar X plugin para que cargue después o cuando se haya abierto un archivo.
- A la hora de crear un archivo de configuración para un plugin en especifico, no hay
  que poner el nombre del plugin porque luego a la hora de cargarlo, Lua se quejará
  porque ya no sabe si está llamando al módulo o al archivo de configuración. Por lo
  tanto es aconsejable añadir el `-cfg` en el nombre del archivo para que "no se haga
  la picha un lío".
- Hay algunos plugins que cuando se activan, cargan su configuración por defecto. En
  otros hay que añadirle la configuración dentro de la función `setup()`.

## Cómo instalar, activar y configurar X plugins

Pues ya que sabemos instalar y activar plugins, ahora es el momento de ponernos con
otros plugins. Pero no va a ser en esta sección, sino que escribiré una sección por
cada plugin, con sus capturas y explicación.

### Enlaces

- [NeoTree](/guia-neovim/plugins/neotree)
- [Lualine](/guia-neovim/plugins/lualine)
- [Esquema de colores Tokyodark](/guia-neovim/plugins/tokyodark)
- [LSPs, autocompletado y snippets](/guia-neovim/plugins/lsp)
