---
layout: "../../layouts/MDLayout.astro"
title: "Plugins - LSP"
---

# :LSP

Hemos llegado a una parte muy importante, pero muy complicada, porque ha llegado el
momento de convertir nuestro NeoVim en un IDE con todas las de la Ley. Para eso vamos
necesitar de los siguientes plugins:

+ [LspConfig](https://github.com/neovim/nvim-lspconfig) - Para cargar los LSP
+ [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) - Para mostrar el
autocompletado, los snippets y los diagnosticos
+ [cmp-nvim-lsp](https://github.com/hrsh7th/cmp-nvim-lsp) - Autocompletado para el
motor LSP integrado de Neovim
+ [Lspkind](https://github.com/onsails/lspkind.nvim) - Para tener pictogramas al estilo **Visual Studio Code** en Neovim
+ [LuaSnip](https://github.com/L3MON4D3/LuaSnip) - Motor para cargar fragmento de código (snippets)
+ [Mason](https://github.com/williamboman/mason.nvim) - Gestor portable de lenguajes de servidor, linters y formateadores

## Instalación de los plugins

¡Vamos al meollo del asunto! Abrimos el archivo `plugins.lua` y metemos dentro los
plugins mencionados:

```lua
-- LSP
{"neovim/nvim-lspconfig"},
{"hrsh7th/nvim-cmp"},
{"hrsh7th/cmp-nvim-lsp"},
{"onsails/lspkind.nvim"},

-- Snippets
{"L3MON4D3/LuaSnip"},
{"saadparwaiz1/cmp_luasnip"},
{"rafamadriz/friendly-snippets"},

-- Mason
{"williamboman/mason.nvim"}
{"williamboman/mason-lspconfig.nvim"}
```

Salimos de Neovim y lo volvemos a arrancar para que se instalen

<img src="/guia-neovim/images/lsp/plugins-instalados.webp" alt="Plugins instalados" />

## Configurar Lspconfig

Primero vamos a configurar el archivo `lsp-cfg.lua` dentro de `lua/plugins/`. Lo
creamos y le añadimos esto:

```lua
local lspconfig = require("lspconfig")
local capabilities = require("cmp_nvim_lsp").default_capabilities()

-- Listado de servidores de lenguaje
local servers = {"html", "cssls","tsserver","pyright","lua_ls","jsonls"}

for _, lsp in ipairs(servers) do
    lspconfig[lsp].setup {
        capabilities = capabilities,
    }
end
```

En la configuración le hemos pedido que cargue los **servidores de lenguaje** de HTML,
CSS, JavaScript, TypeScript, Lua, Python y JSON.

## Configurar LuaSnip

Creamos el archivo `luasnip-cfg.lua` y le metemos esto:

```lua
require("luasnip.loaders.from_vscode").lazy_load()
```

## Configurar el autocompletado
Este es el plugin con la configuración más tocha, pero con los comentarios se
entenderá lo que hace cada cosa.
Creamos el archivo `cmp-cfg.lua` y metemos todo esto:

```lua
local cmp = require("cmp")
local lspkind = require("lspkind")

cmp.setup({
    -- Ventana para mostrar el autocompletado y su documentación
    window = {
        completion = cmp.config.window,
        documentation = cmp.config.window,
    },

    -- Origenes
    sources = cmp.config.sources({
        {name = "nvim_lsp"},
        {name = "luasnip", option = {show_autosnippets = true}}
    }),

    -- Atajos de teclado
    mapping = {
        -- Enter acepta la sugerencia
        ["<CR>"] = function(fallback)
            if cmp.visible() then
                cmp.confirm()
            else
                fallback()
            end
        end,

        -- La tecla arriba selecciona la anterior sugerencia
        ["<Up>"] = function(fallback)
            if cmp.visible() then
                cmp.select_prev_item()
            else
                fallback()
            end
        end,

        -- La tecla abajo selecciona la siguiente sugerencia
        ["<Dowm>"] = function(fallback)
            if cmp.visible() then
                cmp.select_next_item()
            else
                fallback()
            end
        end,
    },

    -- Formato de la ventana
    formatting = {
        format = lspkind.cmp_format({
            width_text = false,
            mode = "symbol", -- Muestra solo los símbolos
            maxwidth = 50
        })
    }

    -- Snippets
    snippet = {
        expand = function(args)
            require("luasnip").lsp_expand(args.body)
        end,
    }
})
```

## Activar Mason

Creamos el archivo `mason-cfg.lua` en `/plugins/` y escribimos esto:

```lua
require("mason").setup()
```

## Cargar los plugins

Ahora vamos a cargar los plugins a través del `ìnit.lua`, por lo que añadiremos esto:

```lua
require("plugins.lsp-cfg")
require("plugins.cmp-cfg")
require("plugins.luasnip-cfg")
require("plugins.mason-cfg")
```

## Mason

Antes he comentado que este gestor de paquete nos permite gestionar los servidores de
lenguaje, adaptadores de depuración, linters y formateadores. Vale, y tú te estarás
preguntando *¿Qué es eso de un linter? ¿O un formateador?*. Vamos a comentar cada
cosa:

+ **Servidor de lenguaje (LSP):** es una característica de los IDE que provee
autocompletado, definición y referencias de un lenguaje de programación.
+ **Linter:** es una herramienta que se encarga de mejorar la calidad del código,
analiza el mismo y busca fallos.
+ **Formateador**: es una herramienta que se encarga de realizar un formato al
documento, de modo que mejora su legibilidad. Aplica indentación, ajuste de línea, etc... Por ejemplo: si has indentado de más un corche, el formateador te lo pone en tu sitio.
+ **Protocolo adaptador de depuración (DAP)**: proporciona la funcionalidad de
depuración.

Después de los tecnicismos, vamos a cargar el **Mason** con el comando `:Mason`.

<img src="/guia-neovim/images/lsp/mason-primera-vez.webp" alt="Primer arranque de Mason" />

La primera que cargamos el Mason no hay instalado nada. Pero eso lo vamos a cambiar.

Pero antes de instalar cosas, conviene tener instalado tanto `nodejs` y `npm`
previamente en el equipo.

Pulsamos <kbd>2</kbd> para irnos a los **LSP** y vamos a instalar los siguientes
LSPs pulsando <kbd>i</kbd> sobre ellos:

+ `html-lsp` - LSP de HTML
+ `css-lsp` - LSP de CSS
+ `typescript-language-server` - LSP de JavaScript y TypeScript
+ `pyright` - LSP de Python
+ `lua-language-server` - LSP de Lua
+ `json-lsp` - LSP de Python


<img src="/guia-neovim/images/lsp/mason-lsps-instalados.webp" alt="LSPs instalados" />

Cerramos Neovim y lo volvemos a abrirlo. Vamos a crear un archivo en formato
JavaScript `.js`.

<img src="/guia-neovim/images/lsp/autocompletado-funcionando.webp" alt="Autocompletado
funcionando" />

**¡POR FIN!** ¡El autocompletado ya está funcionando! ¿Pero y qué hay de los
snippets? 🤔

<img src="/guia-neovim/images/lsp/snippets-funcionando.webp" alt="Snippets funcionando" />

Para ver más información sobre el LSP que se está ejecutando en el archivo,
ejecutamos el comando `:LspInfo`.

<img src="/guia-neovim/images/lsp/Lspinfo.webp" alt="LspInfo" />

Este comando nos viene de perlas para diagnosticar los posibles fallos del LSP.

## Final

Ya tenemos el autocompletado funcionando, los snippets funcionando y los diagnósticos
de código rulando. ¡Muy bien!
