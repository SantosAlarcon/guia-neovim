---
title: Configuraciones de Neovim
---

# Configuraciones de Neovim

<details>
<summary>Tabla de contenidos</summary>

- [LazyVim](configuraciones-neovim/#lazyvim)
    - [Características de LazyVim](configuraciones-neovim/#características-de-lazyvim)
- [NvChad](configuraciones-neovim/#nvchad)
    - [Características de NvChad](configuraciones-neovim/#características-de-nvchad)
- [AstroNvim](configuraciones-neovim/#astronvim)
    - [Características de AstroNvim](configuraciones-neovim/#características-de-astronvim)
- [LunarVim](configuraciones-neovim/#lunarvim)
    - [Características de LunarVim](configuraciones-neovim/#características-de-lunarvim)
- [Conclusión](configuraciones-neovim/#conclusión)

</details>

Todos sabemos que configurar Neovim a gusto del usuario es una tarea que puede durar
horas. En GitHub hay muchos usuarios que comparten sus **dotfiles**, en los que
también se encuentra su configuración de Neovim.

Antes mencioné que los gustos de los usuarios son diferentes. No es lo mismo alguien
que lo utiliza para programar, que alguien que escribe texto o escribe artículos.

En estos últimos años han surgido **configuraciones listas para funcionar**, hechas
por "güenos samaritanos", para que el usuario ejecute el script de turno y a rular.

A continuación vamos a ver un breve listado de estas configuraciones.

## LazyVim

![LazyVim](https://user-images.githubusercontent.com/292349/213447056-92290767-ea16-430c-8727-ce994c93e9cc.png)

Se trata de una configuración que hace uso de **Lazy** como gestor de paquetes, y que
permite al usuario configurarlo como quiera. Además, uno de sus contribuyentes es [Folke](https://github.com/Folke), el creador
de **Lazy** y de otros plugins.

### Características de LazyVim

- 🔥 Convierte Neovim en un IDE con esteróides (más o menos)
- 💤 Permite al usuario personalizar y añadir configuraciones
- 🚀 Más rápido que Ussain Bolt
- 🧹 Configuración limpia de opciones, comandos automáticos y atajos de teclado
- 📦 Viene con un buen puñado de plugins y listo para usar

De hecho, su [página oficial](https://www.lazyvim.org) tiene una muy buena
documentación, y dice además cuáles son los plugins que están instalados.

## NvChad

![NvChad](https://nvchad.com/banner.webp)

El nombre tiene bastante tela, y además puede sonar que es Neovim pero "mamadísimo".
Y **efectiviwonder**, es que está **MAMADÍSIMO**. En cuanto mencione sus
características vas a flipar.

### Características de NvChad

- 🚀 Carga rapídisimo, ya que los plugin solo cargan cuando se le pidan
- 🪶 Configuración limpia
- 🎨 Gestor de temas, con más de 50 temas incluídos
- ⚙️ Mecanismo de actualización sin provocar cambios en la configuración del usuario
- ⚙️ Altamente configurable por el usuario, incluso se pueden desactivar algunos plugins
- 🦋 Interfaz de usuario **"¡Muy bonito, me gusta!"**
- Toda la configuración está escrita con Lua
- 📦 Plugins exclusivos de NvChad
- 🙂 Muy fácil de usar

En la [página oficial](https://nvchad.com) puedes echar un vistazo a la documentación de NvChad para ver si
te convence.

## AstroNvim

![AstroNvim](https://astronvim.com/_astro/astrodark.CdHFd1a7_eiWC4.webp)

Esta configuración incorpora un montón de características interesantes, aunque la
estética no es mejor que las dos anteriores. Vamos a ver qué nos ofrece.

### Características de AstroNvim

- Especificaciones de los plugins más utilizados por AstroCommunity
- Hace uso de Neo-Tree como explorador de archivos
- Utiliza el autocompletado de **nvim-cmp**
- Integración con Git mediamente **Gitsigns**
- Utiliza **Heirline** como barra de estado, de ventana y de búfer
- Permite cargar terminales con **Toggleterm**
- Utiliza **Telescope** para el "Fuzzy finding"
- Utiliza **Treesitter** para resaltar la sintaxis
- Utiliza **Null-ls** para el formateado y el linting
- Utiliza **LSPConfig** para configurar el LSP
- Utiliza **nvim-dap** para permitir la depuración (_debugging_)
- Utiliza **Lazy** como gestor de plugins
- También se puede actualizar **AstroNvim** como si fuese un plugin más.

En su [página oficial](https://astronvim.com) te dice que esta configuración está hecha para **configurar menos
y darle más a las teclas**.

## LunarVim

![LunarVim](https://user-images.githubusercontent.com/29136904/191624942-3d75ef87-35cf-434d-850e-3e7cd5ce2ad0.png)

Esta creo que es la más floja de todas, al menos a nivel visual. Pero en cuanto a
características no tiene desperdicio.

### Características de LunarVim

- 🔭 Cuenta con plugins de autocompletado, explorador de archivos, LSP, linting,
  formateado y depuración.
- 🧑‍🚀 El usuario puede desactivar plugins, añadir otros, y crear sus propias
  configuraciones.
- 🚀 Es muy rápido de narices

Tienes en la [página oficial](https://www.lunarvim.org) una buena documentación para que le metas caña a esta configuración "espacial".

## Conclusión

Estas han sido las configuraciones más famosas que existen para Neovim. El usuario es
el que decide al final si quiere una configuración con buena interfaz de usuario y características.
