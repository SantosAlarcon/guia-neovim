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

Dependiendo de si estás en Windows, Linux o MacOS, el método de instalación de los LSPs puede variar. En el caso de Linux, hay distribuciones que cuentan con algunos LSPs en sus repositorios. En caso contrario, había que instalar **Node** y **NPM** para instalar el LSP que necesites.

Para esta sección vamos a instalar los LSPs de **Lua** ([lua-language-server](https://github.com/luals/lua-language-server)) y de **JavaScript/TypeScript** ([typescript-language-server](https://github.com/typescript-language-server/typescript-language-server)).

Partimos en el supuesto de que ya están instalados los LSPs en el equipo. Ahora sólo hay que configurarlos para que Neovim los cargue.

### Configurando los LSPs

Lo primero es crear el directorio **"lsp"** en el directorio raíz de la configuración de Neovim. Dentro de ese directorio se guardarán los archivos de configuración de cada LSP.

Vamos a empezar primero con el LSP de Lua. Creamos el archivo **"lua_ls.lua"** dentro de ese directorio y escribimos esto:

```lua
vim.lsp.config["lua_ls"] = {
    cmd = {"lua-language-server", "--stdio"},
    filetypes = {"lua"},
    root_markers = { {".luarc.json", ".luarc.jsonc"}, { ".git" }, { ".stylua.toml", "stylua.toml", "selene.toml" } },
    settings = {
        runtime = {
            version = "LuaJIT",
            path = {
                "lua/?.lua",
                "lua/?/init.lua",
            },
        },
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
```

Vamos a desmenuzar el contenido de este archivo. 

Lo primero que hemos definido una nueva clave para la tabla de Lua de la configuración de LSP (**vim.lsp.config**). Y dentro de dicha tabla se encuentran los siguientes campos:

+ **cmd:** - el comando que se ejecutará cuando Neovim cargue el LSP
+ **filetypes:** - los tipos de archivo con los que el cliente LSP funcionará
+ **root_markers:** - archivos que se usan para decidir la raíz del espacio de trabajo
+ **settings:** - la configuración especifica del LSP para alterar su comportamiento

Ahora vamos a repetir la operación pero con el LSP de JavaScript/TypeScript. Para ello creamos el archivo **"ts_ls.lua"** dentro del directorio **lsp** e introducimos esto:

```lua
vim.lsp.config["ts_ls"] = {
    cmd = {"typescript-language-server", "--stdio"},
    filetypes = {"javascript", "javascriptreact", "typescript", "typescriptreact" },
    root_markers = {{".git"}, {"package.json", "tsconfig.json", "jsconfig.json"}}
}
```

Pero aún no hemos acabado porque toca lo más importante, que es activar los LSPs e inyectar las capacidades del cliente LSP.

Vamos a crear el archivo "**lsp.lua**" dentro del directorio "**lua**" y vamos a meter este contenido:

```lua
-- Obtener las capacidades del cliente LSP
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

-- Habilita los LSPs
vim.lsp.enable({"lua_ls", "ts_ls"})

-- Inyecta las capacidades del cliente a todos los LSPs
vim.lsp.config('*', {
    capabilities = capabilities,
    root_markers = { '.git' },
})
```

Y ya por último añadimos esta línea al archivo **"init.lua"** para que cargue el archivo que hemos creado antes:

```lua
require("lsp")
```

Ahora vamos a cerrar Neovim. La próxima vez que abramos un archivo **.lua** o de JavaScript/TypeScript, el LSP ya debería estar funcionando.

Vamos a abrir un archivo de TypeScript para ver lo que pasa...

![LSP funcionando](/images/lsp-funcionando.webp)

**¡Bravo!** **¡El LSP está funcionando muy bien!** 👏👏👏

Y para comprobar que ha cargado muy bien el LSP, utilizarémos el comando <code>:checkhealth vim.lsp</code>.

![Comprobación del funcionamiento de los LSP con :checkhealth](/images/lsp-checkhealth.webp)

En la captura anterior se muestran los LSPs que están activados en el búfer actual, y qué configuraciones de LSP están activadas.

## Funciones de LSP a nivel de búfer

A continuación vamos a hacer un repaso de los métodos/funciones para interactuar con el LSP a nivel de búfer. Dichas funciones pertenecen a la clase **vim.lsp.buf.***

| Función | Descripción |
|---------|-------------|
| format() | Formatea el documento/búfer actual | 
| rename() | Cambia el nombre de una variable o palabra clave | 
| code_actions() | Nos da a elegir diversas acciones que modifican el código |
| hover() | Muestra la información referente al elemento en el que está situado el cursor |

Algunos de los descritos son los más utilizados, pero hay más que se pueden consultar con el comando <code>:h vim.lsp.buf</code>. Además hay algunos LSPs que no disponen de esas funcionalidades avanzadas.

## Nota sobre el autocompletado (u "omnicompletado")

Neovim trae incluido un sistema de autocompletado, que nos permite elegir entre diferentes palabras clave, términos, entre otros. 

Para el propósito del manejo de los LSPs para ver los métodos y definiciones, vamos a usar el "omnicompletado" nativo, que se consigue con las combinaciones <kbd>CTRL + X</kbd> y <kbd>CTRL + O</kbd> en el **modo de inserción**.

![Autocompletado LSP nativo de Neovim](/images/lsp-autocompletado.webp)

En el caso de la captura anterior se muestran los métodos de **manejo de cadenas** de **JavaScript/TypeScript**.

Pero en mi opinión, dicho autocompletado no muestra la documentación en relación a dicho método. Por lo que tenemos que tirar de plugins como **nvim-cmp** o **blink.nvim**. El paquete **[ mini.nvim ](https://www.github.com/nvim-mini/mini.nvim)**
también tiene un módulo de autocompletado.

![Autocompletado con el médulo de Mini.nvim](/images/autocompletado-mini.webp)

En la captura anterior se ha mostrado el módulo "completion" de **mini.nvim**, y dicho autocompletado muestra a la derecha del listado la información de los métodos, funciones y variables.

## Conclusión

Ya hemos visto cómo se configura y se activan los LSPs en Neovim de forma nativa en la **versión 0.11** de Neovim. Y todo eso sin necesidad de usar plugins de terceros.

Si quieres ir más allá sobre el manejo nativo del LSP, puedes echarle un ojo a la sección de LSP de la [ documentación oficial de Neovim ](https://neovim.io/doc/user/lsp/).
