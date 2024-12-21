---
title: Plugins - Lualine
---
# :Lualine

**Lualine** es una barra de estado muy personalizable y muy rápida, escrita en
**Lua**.

En el apartado de [plugins](/guia-neovim/plugins) habiamos instalado este plugin y lo
habíamos activado, pero no habíamos profundizado bastante en cómo configurarlo.

Pero antes de eso, veamos qué información nos muestra por defecto.

<img src="/guia-neovim/images/lualine/lualine-por-defecto.webp" alt="Aspecto por defecto
de Lualine" />

Vamos por partes, como diría **Jack el Destripador**. En este caso de izquierda
a derecha:

- Modo de edición actual
- Rama actual del repositorio | Diferencias | Diagnóstico
- Nombre del archivo
- Codificación del archivo
- Logo del S.O. o la distribución de Linux
- Tipo de archivo
- Posición actual del cursor en porcentaje
- Línea y carácter actual del cursor

Como diría cierta señora del **APM?!**:

> ¡Muy bonito! ¡Me gusta!

Antes de realizar la configuración, me gustaría comentar que para poder visualizar
bien los símbolos de **Lualine**, hay que utilizar una [**nerd font**](https://www.nerdfonts.com/font-downloads) de esas que
tienen ligaduras y un montón de símbolos que están muy guapas para los
desarrolladores.

## Vamo a configurar Lualine

Vamos al archivo `lualine-cfg.lua` del directorio `plugins` y vamos a añadir la
configuración por defecto dentro de la parte de `setup()`:

```lua
require("lualine").setup{
  options = {
    icons_enabled = true,
    theme = 'auto',

    component_separators = { left = '', right = ''},
    section_separators = { left = '', right = ''},
    disabled_filetypes = {
      statusline = {},
      winbar = {},
    },
    ignore_focus = {},
    always_divide_middle = true,
    globalstatus = false,
    refresh = {
      statusline = 1000,
      tabline = 1000,
      winbar = 1000,
    }
  },
  sections = {
    lualine_a = {'mode'},
    lualine_b = {'branch', 'diff', 'diagnostics'},
    lualine_c = {'filename'},
    lualine_x = {'encoding', 'fileformat', 'filetype'},
    lualine_y = {'progress'},
    lualine_z = {'location'}
  },
  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = {'filename'},
    lualine_x = {'location'},
    lualine_y = {},
    lualine_z = {}
  },
  tabline = {},
  winbar = {},
  inactive_winbar = {},
  extensions = {}
}
```

### Añadir barra superior de pestañas y búferes

Hay una parte muy interesante, que es la del **tabline**, que nos permite añadir una
barra arriba con el nombre del archivo del búfer o la pestaña. Vamos a modificar esa
parte del archivo escribiendo esto:

``` lua
tabline = {
    lualine_a = {"buffers"}
}
```

Cerramos Neovim, y lo volvemos a abrir.

<img src="/guia-neovim/images/lualine/tabline.webp" alt="Tabline activado" />

En la imagen de arriba se muestran las pestañas o búferes que están abiertos, lo cuál
está muy bien.

### Cambiar el esquema de colores

Vamos ahora a cambiar el esquema de colores, que el que tiene está mu feo. Se lo
vamos a cambiar a **"powerline_dark"**.

``` lua
theme = "powerline_dark"
```

Cerramos Neovim, y lo volvemos a abrir.

<img src="/guia-neovim/images/lualine/powerline-dark.webp" alt="Cambiado al tema Powerline Dark" />

¡Este tema es mucho mejor! **¡Claro que sí, guapi!**

¿Quieres ver más temas para Lualine? Pues en este [enlace](https://github.com/nvim-lualine/lualine.nvim/blob/master/THEMES.md) podrás ver la cantidad de temas que soporta, e incluso puedes crear el tuyo propio.

## Cambiar los separadores

Habrás visto que los elementos separadores de sección y componentes usan un triángulo. Vamos a cambiarlo por
un círculo. Abrimos `lualine-cfg.lua` y editamos la parte de los separadores:

``` lua
section_separators = { left = '', right = '' },
component_separators = { left = '', right = '' },
```

<img src="/guia-neovim/images/lualine/bordes-cambiados.webp" alt="Bordes cambiados" />

¡No está mal, Manolo!

## Cambiar elementos de la barra de estado

Vamos a suponer ahora que queremos quitar la codificación, el icono del S.O. y el progreso del cursor.

Abrimos el archivo `lualine-cfg.lua` y vamos a efectuar el siguiente cambio:

``` lua
    lualine_x = {},
    lualine_y = {'filetype'},
    lualine_z = {'location'}
```

Lo de siempre: cerramos Neovim y lo volvemos a abrir.

<img src="/guia-neovim/images/lualine/estado-cambiado.webp" alt="Estado cambiado" />

Ahora en la derecha solo sale el formato del archivo y la posición del cursor (número de línea y columna)

## Que Lualine no aparezca en el NeoTree

Queda bastante feo que la barra de estado aparezca en el **NeoTree**. Para eso vamos
a editar otra vez el archivo `lualine-cfg.lua`, y modificamos esto:

``` lua
disabled_filetypes = {
    statusline = {"neo-tree"},
    winbar = {},
},
```

Cerramos Neovim y lo volvemos a abrir. Abrimos el NeoTree y...

<img src="/guia-neovim/images/lualine/neotree-sin-lualine.webp" alt="NeoTree sin Lualine" />

¡Ya no se ve la barra de estado en NeoTree!

## Extensiones de terceros soportadas

A Lualine se le pueden añadir extensiones de otros plugins, siempre y cuando estén
instaladas. Aquí hay un listado de las mismas:

+ aerial
+ chadtree
+ fern
+ fugitive
+ fzf
+ lazy
+ man
+ mason
+ mundo
+ neo-tree
+ nerdtree
+ nvim-dap-ui
+ nvim-tree
+ overseer
+ quickfix
+ symbols-outline
+ toggleterm
+ trouble

El usuario también puede crear sus propias extensiones si es muy duch@ con Lua.
