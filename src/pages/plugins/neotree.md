---
layout: "../../layouts/MDLayout.astro"
title: "Plugins - Neotree"
---

# :NeoTree

**NeoTree** es un plugin que nos permitirá navegar por la estructura de árbol de
archivos y directorios, y gestionar los mismos. Vamos, que podemos gestionar archivos
y directorios, y navegar entre ellos.

## Instalación

Nos vamos al directorio `$HOME/.config/nvim/plugins/` y vamos a crear el archivo
`neotree-cfg.lua`. Una vez abierto escribimos esto dentro:

``` lua
return {
    -- NeoTree
    "nvim-neo-tree/neo-tree.nvim", 
    dependencies = {"nvim-lua/plenary.nvim", "MunifTanjim/nui.nvim"}
},
```

Tras guardar el archivo, la barra de comandos nos avisa de que se han producido
cambios en el archivo de las especificaciones. Salimos de Neovim y lo volvemos a
ejecutar.

<img src="/guia-neovim/images/neotree/instalacion-neotree2.webp" alt="NeoTree instalado" />

Se carga el gestor de Lazy y acto seguido instalará NeoTree y sus dependencias. Ahora
solo hay que activar **NeoTree**.

## Activar NeoTree

Dentro del archivo `neotree-cfg.lua`, vamos a modificar lo que hay después de las
dependencias:

``` lua
return {
    -- NeoTree
    "nvim-neo-tree/neo-tree.nvim", 
    dependencies = {"nvim-lua/plenary.nvim", "MunifTanjim/nui.nvim"},
    config = function()
        require("neo-tree").setup() -- Se activa el plugin
    end,
},
```

Guardamos el archivo, salimos de Neovim y lo volvemos a cargar. De momento no sucede
nada, pero si escribimos el comando `:Neotree`...

<img src="/guia-neovim/images/neotree/neotree-activado.webp" alt="NeoTree activado" />

Nos aparece una barra lateral con la estructura del directorio actual. Esto viene bien cuando se trabaje con proyectos de
programación organizados por directorios. Si volvemos a usar el comando no se cierra.
Tenemos que escribir `:Neotree close` para cerrarlo. Lo que queremos más adelante es
pulsar una tecla para abrir y cerrar **NeoTree**.

## Configurar Neotree

Ahora vamos a liarnos con el archivo de configuración de NeoTree para alterar su
funcionamiento. Lo primero será usar la tecla de **tabulación** para abrir/cerrar
NeoTree.

Para eso abrimos de nuevo `neotree-cfg.lua` y debajo de la línea de `setup()`
añadimos el atajo:

``` lua
require("neo-tree").setup()

vim.keymap.set("n", "<tab>", ":Neotree toggle<cr>", {silent = true})
```

Ahora sucede que cuando abrimos un archivo, lo abre en un búfer, en vez de una
pestaña. Vamos a hacer que cuando pulsemos **Enter**, se abra en una pestaña nueva. Pues dentro de `setup()` añadimos:

``` lua
require("neo-tree").setup({
    window = {
        mappings = {
            ["<cr>"] = { "open_tabnew" }
        }
    }
})
```

Cerramos Neovim, volvemos a ejecutarlo, abrimos Neotree y seleccionamos un archivo.
Al abrirlo, ahora se carga en una pestaña nueva.

<img src="/guia-neovim/images/neotree/configuracion-neotree.webp" alt="Se abren nuevas pestañas al abrir archivos con Neotree" />

Para más información sobre cómo configurar **NeoTree** a tu gusto, puedes dirigirte a
la [documentación oficial de Github](https://github.com/nvim-neo-tree/neo-tree.nvim) o bien escribiendo el comando `:help neo-tree`. A mí personalmente me gusta que se abra como una ventana lateral, como si estuvieses trabajando en **Visual Studio Code** u otro IDE.

## Atajos de teclado de NeoTree

Este plugin dispone de atajos de teclado por defecto para que el usuario pueda hacer
un montón de cosas con él. Vamos con ellos.

| Tecla | Descripción |
| ----- | ----------- |
| <kbd>A</kbd> | Crea un directorio |
| <kbd>a</kbd> | Crea un archivo, o un directorio si acaba con una "/" |
| <kbd>c</kbd> | Copia un archivo/directorio |
| <kbd>d</kbd> | Borra un archivo/directorio |
| <kbd>i</kbd> | Muestra la información del archivo/directorio |
| <kbd>H</kbd> | Muestra los archivos ocultos, los que comienzan por el **.** |
| <kbd>m</kbd> | Mueve un archivo/directorio a otro |
| <kbd>oc</kbd> | Permite ordenar los archivos por fecha de creación |
| <kbd>od</kbd> | Permite ordenar los archivos por la cantidad de diagnósticos |
| <kbd>og</kbd> | Permite ordenar los archivos por el estado de Git |
| <kbd>om</kbd> | Permite ordenar los archivos por fecha de modificación |
| <kbd>on</kbd> | Permite ordenar los archivos por nombre |
| <kbd>os</kbd> | Permite ordenar los archivos por tamaño |
| <kbd>ot</kbd> | Permite ordenar los archivos por tipo |
| <kbd>p</kbd> | Pegar del Portapapeles |
| <kbd>r</kbd> | Cambia el nombre de un archivo/directorio |
| <kbd>x</kbd> | Cortar del Portapapeles |
| <kbd>y</kbd> | Copiar del Portapapeles |
| <kbd>Retroceso</kbd> | Subir a un directorio superior |
| <kbd>?</kbd> | Muestra los atajos de NeoTree |
