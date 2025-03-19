---
title: "Plugins > Tokyodark"
description: En esta sección se profundiza en el esquema de colores Tokyodark y cómo configurarlo a nuestro gusto
---

# :tokyodark

Todos sabemos que el esquema de colores que trae por defecto Neovim es más feo que
pegarle a un padre el día de Nochebuena. Por eso vamos a cambiarlo a uno de terceros.

Para este caso he decidido instalar "**tokyodark**".

<img src="https://user-images.githubusercontent.com/30515389/115807570-42385080-a3bf-11eb-8286-c981b5093ffa.png" alt="Tokyo Dark" />

## Instalación de Tokyodark

¡Vamos al turrón! Vamos a crear el archivo `tokyodark-cfg.lua` dentro de `/plugins/` y añadimos lo siguiente:

``` lua
return {
    -- Esquema de colores Tokyodark
    {"tiagovla/tokyodark.nvim"},
}
```

Cerramos Neovim y lo volvemos a abrir.

<img src="/images/tokyodark/lazy-tokyodark.webp" alt="Tokyodark instalado" />

## Activar Tokyodark

Abrimos de nuevo el archivo `tokyodark-cfg.lua` y vamos a añadir esto:

``` lua
return {
    -- Esquema de colores Tokyodark
    {"tiagovla/tokyodark.nvim",
    config = function()
        vim.cmd("colorscheme tokyodark")
    end,
    },
}
```

Guardamos el archivo, cerramos Neovim y volvemos a cargarlo.

<img src="/images/tokyodark/tokyodark-activado.webp" alt="Tokyodark activado" />

A ver, vale que no sea el mejor tema del mundo, pero es mucho mejor que el que nos
ofrecía Neovim por defecto.

> Date cuenta de que no ha sido necesario utilizar la función `setup()` con el "require" para activar el esquema de colores.
