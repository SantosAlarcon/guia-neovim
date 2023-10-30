---
layout: ../../layouts/MDLayout.astro
title: Plugins - LSP
---
# :LSP

<details>
<summary>Tabla de contenidos</summary>

- [Introducción](/guia-neovim/plugins/lsp#introducción)
- [Instalar y configurar Lspconfig](/guia-neovim/plugins/lsp#instalar-y-configurar-lspconfig)
- [Instalar y configurar LuaSnip](/guia-neovim/plugins/lsp#instalar-y-configurar-luasnip)
- [Instalar y configurar el autocompletado](/guia-neovim/plugins/lsp#instalar-y-configurar-el-autocompletado)
- [Instalar y activar Mason](/guia-neovim/plugins/lsp#instalar-y-activar-mason)
- [Un apunte sobre Mason](/guia-neovim/plugins/lsp#un-apunte-sobre-mason)
- [Instalación, activación y configuración None-LS (Null-LS)](/guia-neovim/plugins/lsp#instalación-activación-y-configuración-none-ls-null-ls)
- [LSPs, linters y formateadores para cada lenguaje de programación](/guia-neovim/plugins/lsp#lsps-linters-y-formateadores-para-cada-lenguaje-de-programación)
  * [JavaScript/TypeScript](/guia-neovim/plugins/lsp#javascripttypescript)
  * [Python](/guia-neovim/plugins/lsp#python)
  * [Java](/guia-neovim/plugins/lsp#java)
  * [C / C++](/guia-neovim/plugins/lsp#c--c)
  * [PHP](/guia-neovim/plugins/lsp#php)
  * [Kotlin](/guia-neovim/plugins/lsp#kotlin)
  * [Rust](/guia-neovim/plugins/lsp#rust)
  * [Ruby](/guia-neovim/plugins/lsp#ruby)
  * [Go](/guia-neovim/plugins/lsp#go)
- [Instalación, activación y configuración de TreeSitter](/guia-neovim/plugins/lsp#instalación-activación-y-configuración-de-treesitter)
- [Autoemparejamiento y autoencerramiento](/guia-neovim/plugins/lsp#autoemparejamiento-y-autoencerramiento)
- [Final](/guia-neovim/plugins/lsp#final)

</details>

## Introducción

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
- [TreeSitter](https://github.com/nvim-treesitter/nvim-treesitter) - Proporciona resaltado de sintaxis
- [mini.pairs](https://github.com/echasnovski/mini.pairs) - Autoencerramiento
- [nvim-ts-autotag](https://github.com/windwp/nvim-ts-autotag) - Autoetiquetado

## Instalar y configurar Lspconfig

Primero vamos a instalar y a configurar el archivo `lsp-cfg.lua` dentro de `lua/plugins/`. Lo
creamos y le añadimos esto:

```lua
return {
    {"neovim/nvim-lspconfig", dependencies = {"hrsh7th/cmp-nvim-lsp"},
    config = function()
        local lspconfig = require("lspconfig")
        local capabilities = require("cmp_nvim_lsp").default_capabilities()

        -- Listado de servidores de lenguaje
        local servers = {"html", "cssls","tsserver","pyright","lua_ls","jsonls"}

        for _, lsp in ipairs(servers) do
            lspconfig[lsp].setup {
                capabilities = capabilities,
            }
        end
    end,
    }
}
```

En la configuración le hemos pedido que cargue los **servidores de lenguaje** de HTML,
CSS, JavaScript, TypeScript, Lua, Python y JSON.

## Instalar y configurar LuaSnip

Creamos el archivo `luasnip-cfg.lua` y le metemos esto:

```lua
return {
    {"L3MON4DE/LuaSnip",
        dependencies = {"rafamadriz/friendly-snippets"},
        config = function()
            require("luasnip.loaders.from_vscode").lazy_load()
        end,
    }
}
```

## Instalar y configurar el autocompletado

Este es el plugin con la configuración más tocha, pero con los comentarios se
entenderá lo que hace cada cosa.
Creamos el archivo `cmp-cfg.lua` y metemos todo esto:

```lua
return {
        {"hrsh7th/nvim-cmp",
        dependencies = {"onsails/lspkind.nvim", "saadparwaiz1/cmp_luasnip"},
        config = function()
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
        end,
        },
}
```

## Instalar y activar Mason

Creamos el archivo `mason-cfg.lua` en `/plugins/` y escribimos esto:

```lua
return {
    {"williamboman/mason.nvim",
    dependencies = {"williamboman/mason-lspconfig.nvim"},
        config = function()
            require("mason").setup()
        end,
    }
}
```

## Un apunte sobre Mason

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
  depuración para X lenguaje de programación.

Después de los tecnicismos, vamos a cargar el **Mason** con el comando `:Mason`.

<img src="/guia-neovim/images/lsp/mason-primera-vez.webp" alt="Primer arranque de Mason" />

La primera vez que cargamos el Mason no hay instalado nada. Pero eso lo vamos a cambiar.

> La configuración por defecto de Mason no carga los diferentes iconos. En `:help
mason-settings` tienes la configuración que carga los iconos.

Pero antes de instalar cosas, conviene tener instalado tanto `nodejs` y `npm`
previamente en el equipo, que carga e instala librerías de JavaScript y TypeScript. También `pip` es necesario para instalar librerías y
utilidades para **Python**. Y `luarocks` para librerías y utilizades de **Lua**. Todos esos paquetes son denominados **gestores de paquetes** de cada lenguaje.

Y ahora sí: dejamos la turra y volvemos con Mason.

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

**¡Hombre, también funcionan los snippets!** 

Podemos consultar la información del LSP cargado en el en el archivo/búfer usando el comando `:LspInfo`.

<img src="/guia-neovim/images/lsp/Lspinfo.webp" alt="LspInfo" />

Este comando nos viene de perlas para diagnosticar los posibles fallos del LSP,
además de mostrarnos cuál es el LSP que se está usando y qué tipo de archivo está
abierto.

## Instalación, activación y configuración None-LS (Null-LS)

Antes este plugin se denominaba **"Null-LS"**, pero su autor decidió dejar de lado su desarrollo y ahora la comunidad se encarga de su mantenimiento.

Ahora mismo, a pesar de tener instalados los linters y formateadores, todavía no están activados. Para eso vamos a activarlos creando el archivo `nls-cfg.lua` dentro de `/plugins/`. Acto seguido, escribimos esto dentro:

```lua
return {
    "nvimtools/none-ls.nvim",
    config = function()
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
    end,
}
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
errores que hay en el código, lo cuál está genial.

Pero... ¿y qué pasa con el formateado? Pues resulta que no lo hace automáticamente, sino que tenemos que hacerlo
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

Pero resulta que por defecto, **Stylua** le aplica una
indentación brutal de 8 espacios. Para configurar la indentación vamos a crear el
archivo `.stylua.toml` dentro de `/nvim/lua/` y dentro del mismo escribimos esto:

```toml
indent_type = "Spaces"
indent_width = 4
```

Con esto, cada vez que usemos el formateador Stylua, éste le aplicará 4 espacios en la indentación.

Para facilitarnos más la vida nos vamos al archivo `keys.lua` del directorio `lua` y
añadimos un atajo para el formateado. Yo he elegido <kbd>Líder</kbd> + <kbd>f</kbd>.

```lua
vim.keymap.set("n", "<leader>f", ":lua vim.lsp.buf.format()<cr>", {silent = true, desc="Formatear documento"})
```

## LSPs, linters y formateadores para cada lenguaje de programación

Ahora te estarás preguntando _"Si yo programo en
JavaScript/TypeScript/React/Angular/Vue, ¿qué necesito instalar para tener una
experiencia en este lenguaje?"_. Pues de esto va esta sección. Vamos a ver qué
necesitamos instalar para cada lenguaje de programación. **HERE WE GO!!**.

### JavaScript/TypeScript

- **LSP:** `typescript-language-server`
- **Linter:** `eslint_d`
- **Formateador**: `prettierd`

### Python

- **LSP:** `pyright`
- **Linter:** `pylint`
- **Formateador**: `black`
- **Depurador**: `debugpy`

### Java

- **LSP:** `java-language-server`
- **Formateador:** `google-java-format`
- **Linter:** `checkstyle`

### C / C++

- **LSP:** `clangd`
- **Formateador:** `clang-format`
- **Linter:** `cpplint`
- **Depurador**: `cpptools`

### PHP

- **LSP:** `phpactor`
- **Formateador:** `phpcbf`
- **Linter:** `phpcs`
- **Depurador**: `php-debug-adapter`

### Kotlin

- **LSP:** `kotlin-language-server`
- **Formateador:** `clang-format`
- **Linter:** `ktlint`
- **Depurador**: `kotlin-debug-adapter`

### Rust

- **LSP:** `rust-analyzer`
- **Formateador:** `clang-format`
- **Linter:** `rustfmt`

### Ruby

- **LSP:** `ruby-language-server`
- **Formateador:** `rubyfmt`
- **Linter:** `rubocop`

### Go

- **LSP:** `gopls`
- **Formateador:** `gofumpt`
- **Linter:** `glint`
- **Depurador**: `go-debug-adapter`

> **NOTA:** Si estás usando un lenguaje de programación que no está aquí, busca por Internet el LSP, linter, formateador y el adaptador de la depuración.

## Instalación, activación y configuración de TreeSitter

Ahora ha llegado el momento de activar y configurar el plugin de **TreeSitter**.
Vamos a crear el archivo `ts-cfg.lua` dentro de `/plugins/` y le vamos a meter esto:

```lua
return {
    "nvim-treesitter/nvim-treesitter",
    config = function()
        require("nvim-treesitter.configs").setup({

            -- Listado de parsers a instalar
            ensure_installed = {"html","css","javascript","typescript","lua", "python", "markdown"},

            -- Permite la instalación automática de parsers
            auto_install = true,

            -- Resaltado de código
            highlight = {
                enable = true,
            },

            -- Indentación
            indent = {
                enable = true,
            },
        })
    end,
}
```

Cerramos Neovim y lo volvemos a abrir. Ahora se van a instalar los "parsers" que
hemos mencionado en el archivo de configuración. Podemos mirar que está dicho plugin
en funcionamiento con el comando `:checkhealth`.

<img src="/guia-neovim/images/lsp/ts-checkhealth.webp" alt="TreeSitter - Parsers instalados"  />

Vamos a ver un ejemplo de un archivo básico de HTML para ver cómo es antes y después.

<figure>
    <img src="/guia-neovim/images/lsp/ts-antes.webp" alt="Resaltado de TS desactivado"  />
    <figcaption>Resaltado de Treesitter desactivado</figcaption>
</figure>

<figure>
    <img src="/guia-neovim/images/lsp/ts-despues.webp" alt="Resaltado de TS activado"  />
    <figcaption>Resaltado de Treesitter activado</figcaption>
</figure>

La diferencia es evidente: se han resaltado las etiquetas y los enlaces.

Puedes profundizar más sobre este plugin en la documentación oficial.

## Autoemparejamiento y autoencerramiento

Nuestra suerte de IDE no está completo sin algún plugin que nos permita cerrar
automáticamente etiquetas (que pueden ser HTML o componentes), corchetes, paréntesis, llaves, comillas y demás movidas. Vamos a
activar `mini.pairs` y `nvim-ts-autotag`.

Creamos el archivo `pairs-cfg.lua` dentro de `/plugins/` y escribimos esto:

```lua
return {
    {"echasnovski/mini.pairs",
        config = function()
            require("mini.pairs").setup()
        end,
    },

    {"windwp/nvim-ts-autotag",
        config = function()
            require("nvim-ts-autotag").setup()
        end,
    }
}

```

Salimos de Neovim y vamos a crear un archivo HTML dentro de Neovim. Vamos a probar
que los corchetes, paréntesis y etiquetas se cierran correctamente.

<img src="/guia-neovim/images/lsp/autopairing-funcionando.webp" alt="Autotag funcionando"  />

Pues sí que funciona, sí.

## Final

Ya tenemos el autocompletado funcionando, los snippets funcionando y los diagnósticos
de código rulando. Podríamos decir que ya tenemos una suerte de IDE en nuestro
Neovim. Desde luego que en este artículo no se va a tocar lo del tema de la
depuración (o "debug") porque todavía no he llegado a ese punto.

Espero que le puedas meter caña a Neovim con tu lenguaje de programación favorito.
