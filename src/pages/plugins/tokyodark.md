---
layout: "../../layouts/MDLayout.astro"
title: "Plugins - Tokyodark"
---

# :tokyodark

Todos sabemos que el esquema de colores que trae por defecto Neovim es más feo que
pegarle a un padre el día de Nochebuena. Por eso vamos a cambiarlo a uno de terceros.

Para este caso he decidido instalar "**tokyodark**".

<img src="https://user-images.githubusercontent.com/30515389/115807570-42385080-a3bf-11eb-8286-c981b5093ffa.png" alt="Tokyo Dark" />

## Instalación de Tokyodark

¡Vamos al turrón! Nos vamos al archivo `plugins.lua` y añadimos lo siguiente:

``` lua
-- Esquema de colores Tokyodark
{"tiagovla/tokyodark.nvim"},
```

Cerramos Neovim y lo volvemos a abrir.

<img src="/guia-neovim/images/tokyodark/lazy-tokyodark.webp" alt="Tokyodark instalado" />

## Activar Tokyodark

Ahora vamos a crear el archivo `tokyodark-cfg.lua` y vamos a añadir esto:

``` lua
require("tokyodark").setup()

vim.cmd("colorscheme tokyodark")
```

<img src="/guia-neovim/images/tokyodark/activar-tokyodark.webp" alt="Activar Tokyodark" />

Como curiosidad, en la última línea le estamos diciendo que una vez que esté activado
este esquema de colores, que lo cambie automáticamente.

Abrimos el archivo `init.lua` de la configuración de la raíz y añadimos
`require("plugins.tokyodark")`.

<img src="/guia-neovim/images/tokyodark/activar-tokyodark2.webp" alt="Activar Tokyodark 2" />

Guardamos, cerramos Neovim y volvemos a cargarlo.

<img src="/guia-neovim/images/tokyodark/tokyodark-activado.webp" alt="Tokyodark activado" />

A ver, vale que no sea el mejor tema del mundo, pero es mucho mejor que el que nos
ofrecía Neovim por defecto.
