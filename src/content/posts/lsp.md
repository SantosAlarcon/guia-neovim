---
title: LSP
description: Aquí se aborda cómo funciona los LSPs en Neovim a partir de la versión 0.11
---

# LSP

Una de las características más notables que tiene Neovim es la posibilidad de utilizar LSPs **(Protocólo de servidor de lenguaje)**, lo que permite que el editor pueda comunicarse con el servidor de lenguaje para ofrecerle:

+ Autocompletado
+ Definición del lenguaje
+ Refactorización de código
+ Diagnósticos del lenguaje

Esto traducido en el lenguaje humano y natural es que el editor se comunica con el servidor LSP y proporciona al usuario las herramientas para que, cuando está picando código en X lenguaje, reciba la información de dicho lenguaje, como los **errores** y las **advertencias** que hay en el código. Dicha información se muestra en pantalla cuando hay un error de sintáxis, así rollo "texto en rojo comunicando el error".

Neovim ya contaba con esta funcionalidad de serie hace tiempo. Pero con la llegada de la **versión 0.11** de Neovim, ahora el usuario puede definir qué LSPs quiere cargar en Neovim sin tener que recurrir a plugins externos como el famoso [ **nvim-lspconfig** ](https://www.github.com/neovim/nvim-lspconfig).

>> A partir de la versión 0.11 de Neovim, el uso de <code>require("lspconfig")</code> del plugin mencionado se considera **deprecado**.

## Instalación y configuración de LSPs

Lo primero que tenemos que hacer es tener bien claro con qué lenguajes de programación vamos a trabajar. 

En [este enlace](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md) se recoge la configuración de los diferentes LSPs que puede manejar Neovim.

Una vez que ya tengamos claro los lenguajes, lo siguiente es instalar dichos LSPs en el sistema. 

Dependendiendo de si estás en Windows, Linux o MacOS, el método de instalación de los LSPs puede variar. En el caso de Linux, hay distribuciones que cuentan con algunos LSPs en sus repositorios. En caso contrario, había que instalar **Node** y **NPM** para instalar el LSP que necesites.

Para esta sección vamos a instalar los LSPs de **Lua** ([ lua-language-server ](https://github.com/luals/lua-language-server)) y de **JavaScript/TypeScript** ([ typescript-language-server ](https://github.com/typescript-language-server/typescript-language-server)).

Partimos en el supuesto de que ya están instalados los LSPs en el equipo. Ahora sólo hay que configurarlos para que Neovim los cargue.

### Configurando los LSPs

Lo primero es crear el directorio **"lsp"** en el directorio raíz de la configuración de Neovim. Dentro de ese directorio se guardarán los archivos de configuración de cada LSP.

Vamos a empezar primero con el LSP de Lua. Creamos el archivo **lua_ls.lua** dentro de ese directorio y escribimos esto:

```lua
vim.lsp.config["lua_ls"] = {
    cmd = {"lua-language-server", "--stdio"},
    filetypes = {"lua"},
    root_markers = { {".luarc.json", ".luarc.jsonc"}, { ".git" }, { ".stylua.toml", "stylua.toml", "selene.toml" } },
    settings = {
      Lua = {
        codeLens = {
          enable = true
        },
        hint = {
          enable = true,
          semicolon = "Disable"
        }
      }
    }
}

vim.lsp.enable("lua_ls")
```

Vamos a desmenuzar el contenido de este archivo. 

Lo primero que hemos definido una nueva clave para la tabla de Lua de la configuración de LSP (**vim.lsp.config**). Y dentro de dicha tabla se encuentran los siguientes campos:

+ **cmd:** - el comando que se ejecutará cuando Neovim cargue el LSP
+ **filetypes:** - los tipos de archivo con los que el cliente LSP funcionará
+ **root_markers:** - archivos que se usan para decidir la raíz del espacio de trabajo
+ **settings:** - la configuración especifica del LSP para alterar su comportamiento

Y por último hemos utilizado el comando **vim.lsp.enable()** para activar el LSP tras cargar la configuración.
