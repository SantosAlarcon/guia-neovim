---
layout: ../../layouts/MDLayout.astro
title: Plugins - LSP
---

# :LSP

Hemos llegado a una parte muy importante, pero muy complicada, porque ha llegado el
momento de convertir nuestro NeoVim en un IDE con todas las de la Ley. Para eso vamos
necesitar de los siguientes plugins:

- [LspConfig](https://github.com/neovim/nvim-lspconfig) - Para cargar los LSP
- [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) - Para mostrar el
  autocompletado, los snippets y los diagnosticos
- [cmp-nvim-lsp](https://github.com/hrsh7th/cmp-nvim-lsp) - Autocompletado para el
  motor LSP integrado de Neovim
- [Lspkind](https://github.com/onsails/lspkind.nvim) - Para tener pictogramas al estilo **Visual Studio Code** en Neovim
- [LuaSnip](https://github.com/L3MON4D3/LuaSnip) - Motor para cargar fragmento de código (snippets)
- [Mason](https://github.com/williamboman/mason.nvim) - Gestor portable de lenguajes de servidor, linters y formateadores
- [None-LS](https://github.com/nvimtools/none-ls.nvim) - Inyecta al LSP de Neovim acciones de código, formateo y diagnósticos.

## Instalación de los plugins

¡Vamos al meollo del asunto! Abrimos el archivo `plugins.lua` y metemos dentro los
plugins mencionados:

```lua
-- LSP
{"neovim/nvim-lspconfig"},
{"hrsh7th/nvim-cmp"},
{"hrsh7th/cmp-nvim-lsp"},
{"onsails/lspkind.nvim"},
{"nvimtools/none-ls.nvim"},

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
        ["<Down>"] = function(fallback)
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
preguntando _¿Qué es eso de un linter? ¿O un formateador?_. Vamos a comentar cada
cosa:

- **Servidor de lenguaje (LSP):** es una característica de los IDE que provee
  autocompletado, definición y referencias de un lenguaje de programación.
- **Linter:** es una herramienta que se encarga de mejorar la calidad del código,
  analiza el mismo y busca fallos.
- **Formateador**: es una herramienta que se encarga de realizar un formato al
  documento, de modo que mejora su legibilidad. Aplica indentación, ajuste de línea, etc... Por ejemplo: si has indentado de más un corchete, el formateador te lo pone en tu sitio.
- **Protocolo adaptador de depuración (DAP)**: proporciona la funcionalidad de
  depuración.

Después de los tecnicismos, vamos a cargar el **Mason** con el comando `:Mason`.

<img src="/guia-neovim/images/lsp/mason-primera-vez.webp" alt="Primer arranque de Mason" />

La primera que cargamos el Mason no hay instalado nada. Pero eso lo vamos a cambiar.

Pero antes de instalar cosas, conviene tener instalado tanto `nodejs` y `npm`
previamente en el equipo.

Pulsamos <kbd>2</kbd> para irnos a los **LSP** y vamos a instalar los siguientes
LSPs pulsando <kbd>i</kbd> sobre ellos:

- `html-lsp` - LSP de HTML
- `css-lsp` - LSP de CSS
- `typescript-language-server` - LSP de JavaScript y TypeScript
- `pyright` - LSP de Python
- `lua-language-server` - LSP de Lua
- `json-lsp` - LSP de JSON

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

## Configuración y activación de None-LS

Antes este plugin se denominaba **"Null-LS"**, pero su autor decidió dejar de lado su desarrollo y ahora la comunidad se encarga de su mantenimiento.

Ahora mismo, a pesar de tener instalados los linters y formateadores, todavía no están activados. Para eso vamos a activarlos creando el archivo `nls-cfg.lua` dentro de `/plugins/`. Acto seguido, escribimos esto dentro:

```lua
-- Asignamos la variable nls para que cargue la función
local nls = require("null-ls")

nls.setup({

    sources = {
        -- Aquí se irán añadiendo los formateadores, linters y acciones de código
        nls.builtins.formatting.stylua, -- Formateador para Lua
        nls.builtins.formatting.prettierd, -- Formateador para JS/TS
        nls.builtins.formatting.black, -- Formateador para Python

        nls.builtins.diagnostics.eslint_d, -- Linter para JavaScript/TypeScript
        nls.builtins.diagnostics.pylint, -- Linter para Python

        nls.builtins.completion.spell, -- Autocompletado de ortografía
        nls.builtins.code_actions.refactoring, -- Refactorización
    }
})
```

Guardamos el archivo y ahora vamos a añadir el archivo de configuración a nuestro
`init.lua`.

```lua
require("plugins.nls-cfg")
```

Guardamos el archivo. Cerramos Neovim y lo volvemos a abrir. Ahora ya debería estar
activado el plugin. Para comprobarlo escribimos el comando `:NullLsInfo`.

<img src="/guia-neovim/images/lsp/nls-funcionando.webp" alt="NullLS funcionando" />

¡Um, vaya! **NullLS** está activo pero no hay ningún linter ni formateador en este
búfer, ya que estamos en un archivo vacío. Pero vamos a crear un archivo en formato
JavaScript. Veamos qué pasa.

<img src="/guia-neovim/images/lsp/nls-js-origenes.webp" alt="NullLS - Orígenes para
JavaScript" />

Aquí ya va habiendo más cosas, porque nos dice cuales son los plugins que hay que
instalar para tener formateado, linter y acciones de código. Como estamos usando un
archivo escrito en JavaScript, vamos a instalarle `eslint_d` y `prettier` con Mason.

<img src="/guia-neovim/images/lsp/mason-eslint-prettier-instalados.webp" alt="Eslint y Prettier instalados" />

Cerramos Neovim y volvemos a abrir el archivo de JavaScript con Neovim.

<img src="/guia-neovim/images/lsp/nls-origenes-javascript.webp" alt="NullLS - Origenes de JS cargados" />

**¡Esto ya tiene mejor pinta!** Nos está mostrando los origenes que están asociados
al tipo de archivo.

<img src="/guia-neovim/images/lsp/nls-linter-funcionando.webp" alt="NullLS - Eslint funcionando" />

Además, en la barra de estado nos muestra la cantidad de avisos y
errores que hay en el código, lo cuál está genial. Pero... ¿y qué pasa con el
formateado? Pues resulta que no lo hace automáticamente, sino que tenemos que hacerlo
manualmente con el comando `:lua vim.lsp.buf.format()`. Vamos a hacer una indentación
mala:

<img src="/guia-neovim/images/lsp/mala-indentacion.webp" alt="Mala indentación" />

Ahora escribimos el comando anterior y ...

<img src="/guia-neovim/images/lsp/prettier-funcionando.webp" alt="Prettier haciendo su
trabajo" />

¡Listo! Como ves, el amigo **Prettier** ha hecho un buen trabajo corrigiendo la
indentación, haciendola mucho más legible. ¡Un aplauso!

Vamos a repetir lo mismo con un archivo en formato Lua

<img src="/guia-neovim/images/lsp/mala-indentacion-lua.webp" alt="Mala indentación en Lua" />

Repetimos el comando anterior.

<img src="/guia-neovim/images/lsp/lua-buen-formato.webp" alt="Archivo Lua bien
formateado" />

Sin comentarios. Un trabajo estupendo.

> Por defecto, Stylua aplica una indentación muy bestial de 8 espacios.

Para facilitarnos más la vida nos vamos al archivo `keys.lua` del directorio `lua` y
añadimos un atajo para el formateado. Yo he elegido <kbd>Ctrl</kbd> + <kbd>f</kbd>.

```lua
vim.keymap.set("n", "<c-f>", ":lua vim.lsp.buf.format()<cr>", {silent = true, desc="Formatear documento"})
```

## LSPs, linters y formateadores para cada lenguaje de programación

Ahora te estarás preguntando _"Si yo programo en
JavaScript/TypeScript/React/Angular/Vue, ¿qué necesito instalar para tener una
experiencia en este lenguaje?"_. Pues de esto va esta sección. Vamos a ver qué
necesitamos instalar para cada lenguaje de programación. **HERE WE GO!!**.

### JavaScript/TypeScript

- **LSP:** `typescript_language_server`
- **Linter:** `eslint_d`
- **Formateador**: `prettierd`

### Python

- **LSP:** `pyright`
- **Linter:** `pylint`
- **Formateador**: `black`
- **Depurador**: `debugpy`

### Java

- **LSP:** `java_language_server`

En desarrollo ...

## Final

Ya tenemos el autocompletado funcionando, los snippets funcionando y los diagnósticos
de código rulando. ¡Muy bien!
