---
layout: "../../layouts/MDLayout.astro"
title: "Plugins - Neotree"
---

# :NeoTree

**NeoTree** es un plugin que nos permitirá navegar por la estructura de árbol de
archivos y directorios, y gestionar los mismos. Vamos, que podemos gestionar archivos
y directorios, y navegar entre ellos.

## Instalación

Nos vamos al directorio `$HOME/.config/nvim/plugins/` y abrimos el archivo
`plugins.lua`. A continuación escribimos esto debajo de la especificación anterior:

``` lua
-- NeoTree
{
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

Dentro del mismo directorio vamos a crear un archivo llamado `neotree-cfg.lua` y
dentro escribimos:

``` lua
require("neo-tree").setup()
```

Ahora nos vamos al archivo `init.lua` de la configuración raíz (recuerda:
`$HOME/.config/nvim`) y añadimos esto:

``` lua
require("plugins.neotree-cfg.lua")
```

Guardamos el archivo, salimos de Neovim y lo volvemos a cargar. De momento no sucede
nada, pero si escribimos el comando `:Neotree`...

<img src="/guia-neovim/images/neotree/neotree-activado.webp" alt="NeoTree activado" />

Nos aparece una barra lateral con la estructura del directorio actual. Esto viene bien cuando se trabaje con proyectos de
programación organizados por directorios. Si volvemos a usar el comando no se cierra.
Tenemos que escribir `:Neotree close` para cerrarlo. Lo que queremos más adelante es
pulsar una tecla para abrir y cerrar **NeoTree**.

## Configurar Neotree

En desarrollo...
