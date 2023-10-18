---
layout: ../layouts/MDLayout.astro
title: "Neovim - Configuración"
---
# :configuracion

Tanto **Vim** como **Neovim** permiten a los usuarios guardar sus configuraciones en un archivo. Se pueden crear archivos de configuración en formato **.vim** (VIMScript) o en formato **.lua** (Lua). En esos archivos se guardan los **atajos de teclado personalizados**, [complementos](/guia-neovim/plugins), y las diferentes opciones que modifican el comportamiento del editor. En función del S.O. se guardan en:

- `$HOME/.config/nvim` en Linux / MacOS
- `~/AppData/Local/nvim` en Windows

<figure>
        <img src="/guia-neovim/images/Inicio-Neovim.webp" alt="Inicio de Neovim" />
        <figcaption>Neovim totalmente "pelado", sin plugins, ni configuración ni ná</figcaption>
</figure>

## Formatos de configuración

A continuación vamos a ver diferentes formatos de configuración.

### Formato VIMScript

Este formato se podría denominar "de legado", ya que pertenece a la época de **Vim**.
El formato de este archivo es **.vim** y cuya sintaxis es muy sencilla. En la
parte de [comandos](/guia-neovim/comandos) hemos visto el comando `:set` que permite activar y
asignar opciones, y que al guardarlo en un archivo permanecen al salir y arrancar
**Neovim**.

```vim
" Opciones
set encoding="utf-8"
set conceallevel=2

" Atajos de teclado
nnoremap <silent> <C-s> :w<CR>
```

En el ejemplo anterior ha aparecido un comando nuevo llamado `:nnoremap` que nos
permite crear un nuevo atajo de teclado para el modo Normal. Para los atajos del modo
visual se usa el `:vnoremap`.

La sintáxis de dichos comandos es esta:

- `nnoremap [¿<silent>?] [tecla] [accion]`

Al poner el `<CR>` al final le estamos indicando que ejecute esa acción y que pulse al
**Enter** (también se denomina "retorno de carro"). El modificador opcional `<silent>` permite ejecutar la acción sin mostrar nada al usuario.

### Formato Lua

**Neovim** reune lo bueno de Vi y Vim, pero le añade también la capacidad de ejecutar
órdenes del lenguaje **Lua**. El formato del archivo es **.lua**, y si eres duch@
en este lenguaje, no tendrás problema en escribir una configuración en este
formato.

```lua
-- Se declara la variable opt para "mapear" vim.opt
local opt = vim.opt
opt.conceallevel=2
opt.encoding='utf-8'

-- Atajos de teclado
vim.keymap.set("n", '<C-s>', ':w<cr>', {silent = true, desc = "Guardar cambios en el archivo"})
```

En la última línea hemos visto la forma de crear atajos de teclado usando
**vim.keymap.set()**, que es una **función**, y dicha función cuenta con los
siguientes argumentos (o parámetros):

- **Modo:** "n" para el modo **Normal**, "v" para el modo **Visual**, "i" para el
  modo **Insertar** y "r" para el modo **Reemplazar**. Se pueden combinar varios modos al mismo tiempo.
- **Tecla:** la tecla o combinación de teclas que se va a usar
- **Comando**: el comando que se va a ejecutar
- **Opcionales**: se pueden especificar valores opcionales entre corchetes. Entre ellos están:
  - **silent=true**: realiza la acción sin mostrarle nada al usuario.
  - **desc=[descripcion]**: descripción de lo que hace ese atajo de teclado

## Configuración monoarchivo / multiarchivo

La configuración de **Neovim** se puede guardar en uno o varios archivos. Guardar
toda la configuración en un sólo archivo puede ser muy engorroso y muy poco intuitivo para los demás usuarios, y hay que saber organizar las secciones del mismo.

En cambio, guardar las configuraciones en varios archivos se podría denominar como modular, ya que cada
archivo tiene un propósito diferente. Por ejemplo: podríamos tener un archivo con
los atajos de teclado, otro con las opciones, otra con los plugins, etc...

Esta es la **opción más recomendable** para facilitar la depuración a la hora de
crear una configuración para **Neovim**. Y de hecho, la gente que comparte sus
configuraciones de **Neovim** (aka "dotfiles") en GitHub/GitLab lo hace de esta manera.

### Configuración multiarchivo con Lua

Si hemos decidido crear la configuración en formato **.lua**, podemos desarrollar una
estructura de directorios muy interesante.

```
/lua/
  └─ plugins.lua
  └─ keys.lua
init.lua
```

En el archivo **init.lua** se guardarían las opciones. Pero además realiza una
llamada a un archivo externo (o módulo) usando la función **require()**. Dentro de
esa función se pone el archivo sin extensión.

Ejemplo:

```lua
-- Carga los archivos keys.lua y plugins.lua
require("keys")
require("plugins")
```

Vamos ahora a suponer que la estructura de directorios es tal que así:

```
/lua/
  └─ /plugins/
  │    └─ lazy.lua
  └─ keys.lua
init.lua
```

El único cambio que hay en el anterior ejemplo es que ahora hay un directorio, que es
**plugins** y dentro hay un archivo, **lazy.lua**. Para llamar a ese archivo
dentro del archivo de configuración hay que utilizar el **require()**, metiendo el
nombre del directorio, un punto, seguido del nombre del archivo.

```lua
require("plugins.lazy")
```

Si se quitase el punto y el nombre del archivo, cargará todos los archivos que hay
dentro de la carpeta **plugins**.

En definitiva, esta es la mejor manera de administrar la configuración de Neovim, ya
que facilita su mantenimiento y diagnóstico.

## Tecla líder

Una característica de Vim/Neovim es que podemos asignarle una **tecla líder**, que
viene a ser lo mismo que la tecla Windows, o Comando de Mac. No se puede usar simultáneamente con
otras teclas, sino que hay que tocar dicha tecla y luego una combinación.

A continuación veremos cómo se configura la **tecla líder** tanto en VIMScript como
en Lua.

```code
-- VIMScript
set g:mapleader = ","

-- Lua
vim.g.mapleader = ","
```

Una vez definida, ahora solo falta asignar unas cuantas combinaciones en ambos formatos.

```code
-- VIMScript
nnoremap <silent> <leader>bd ":bdelete<CR>"

-- Lua
vim.keymap.set("n", "<leader>bd", ":bdelete<cr>", {silent=true})
```

En el ejemplo anterior hemos definido la **tecla líder**, seguida de "bd" para cerrar el búfer/archivo actual.

## Opciones

Ahora que hemos visto todo lo esencial en cuanto a la configuración se refiere, vamos
a pasar de lleno a la acción.

En la siguiente tabla se recogerán las diferentes opciones que permitirán al usuario
modificar la apariencia y el comportamiento de **Neovim**. El listado completo de
opciones se puede consultar con el comando `:options`.

| Opción           | Descripción                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `number`         | Muestra el número de cada línea                                        |
| `relativenumber` | Muestra el número relativo de cada línea                               |
| `textwidth`      | Configura la longitud de letras en una línea                           |
| `wrap`           | Permite activar/desactivar el salto de línea                           |
| `ignorecase`     | Se ignora si la ocurriencia está en mayúsculas o en minúsculas         |
| `hlsearch`       | Se resaltan todas las ocurrencias de la búsqueda                       |
| `confirm`        | Muestra una confirmación antes de guardar los cambios                  |
| `mouse`          | Configura el modo del ratón                                            |
| `tabstop`        | Número de tabulaciones en la indentación                               |
| `encoding`       | Codificación del archivo                                               |
| `conceallevel`   | Oculta los asteríscos en la negrita y cursiva en los archivos Markdown |
| `smartindent`    | Realiza una indentación automática                                     |
| `expandtab`      | Usa espaciado en vez de tabulaciones                                   |
| `termguicolors`  | Activa el soporte de color verdadero                                   |
| `colorscheme [esquema]` | Establece el esquema de colores para el editor |
| `spell` | Muestra los errores ortográficos |
| `spelllang` | Establece el idioma de la ortografía |
