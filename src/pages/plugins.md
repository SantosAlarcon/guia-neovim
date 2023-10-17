---
layout: "../layouts/MDLayout.astro"
title: "Neovim - Plugins"
---

# :plugins

Uno de los puntos fuertes de Neovim, aparte de la **configuración y personalización**, es la capacidad de instalar "plugins" que permiten **dotarles de muchas funcionalidades**, hasta el punto de convertirlo en un IDE (Entorno de desarrollo integrado). La cantidad de "plugins" que hay es tan inmensa, y además cuentan con su **documentación**, que es un plus adicional.

### ¡AVISO! Instalar muchos plugins puede hacer que Neovim tarde mucho en cargar o puede hacer incluso que vaya más lento.

Para poder instalar plugins en Neovim tenemos que hacer uso de un gestor de plugins
como [Packer](https://github.com/wbthomason/packer.nvim), [Vim-Plug](https://github.com/junegunn/vim-plug) o [Lazy](https://github.com/folke/Lazy.nvim). Para este sitio vamos a utilizar este último, ya que nos permite cargar plugins de manera "pasiva", haciendo que el tiempo de carga de Neovim sea más rápido.

## Instalación de Lazy

Para ellos nos vamos al directorio `$HOME/.config/nvim/lua/plugins` (no es obligatorio, pero es mejor así para poder organizar la configuración) y creamos el archivo **lazy.lua**. 

Dentro del archivo pegamos esto:

``` lua
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
Vamos, el que tenemos la configuración. Añadimos `require("plugins.lazy")` y
guardamos.

<img src="/guia-neovim/images/carga-lazy-init-lua.webp" alt="Carga de Lazy en el
init.lua" />

Salimos de Neovim y volvemos a ejecutarlo. Tardará un poco en arrancar dado que
necesita descargar el repositorio. En un principio veremos la pantalla inicial de
Neovim como si nada, pero ahora **Lazy** ya está instalado.

Para entrar a **Lazy** usaremos el comando `:Lazy` y aparecerá el susodicho gestor de
plugins. Ahora mismo solo hay un plugin, que es el propio **Lazy**.

<img src="/guia-neovim/images/lazy.webp" alt="Lazy pelao" />
