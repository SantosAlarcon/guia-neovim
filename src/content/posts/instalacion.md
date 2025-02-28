---
title: Instalación de Neovim
---

# Instalación

Neovim es un editor **multiplataforma**, por lo que se puede instalar en cualquier sistema operativo, sea Linux, MacOS o Windows. Y en esta sección vamos a ver cómo se instala este editor.

## Versiones "stable" y "nightly"

En el [repositorio oficial de GitHub de Neovim](https://github.com/neovim/neovim/releases) podemos ver que hay dos versiones principales de Neovim, la versión **"stable"** y la versión **"nightly"**.

La versión **"stable"** es la versión estable de Neovim, es decir, la versión que se lanza con la mayor frecuencia y con el menor número de fallos.
La versión **nighly**, sin embargo, es la versión con los cambios más recientes, pero puede contener errores.

> La versión **"stable"** es la más recomendable para la mayoría de los usuarios por su estabilidad, mientras que la versión **"nightly"** está destinada a usuari@s más curios@s que quieren probar las últimas características.

Para el caso de este sección, vamos a instalar la versión **"stable"** de Neovim.

## Arquitectura de procesadores

A su vez, Neovim es compatible con arquitecturas de procesadores **x86-64** (ordenadores de sobremesa y portátiles) y **ARM** (dispositivos portátiles/móviles/tablets), por lo que podemos instalar la versión de Neovim dependiendo del tipo de dispositivo.

## Instalación de Neovim en Windows

La versión de Windows se puede instalar de varias formas:

+ Con el instalador de [Chocolatey](https://chocolatey.org/packages/neovim)
+ Con Winget usando el comando `winget install neovim`
+ Con el instalador con extensión **.msi**
+ Con el archivo comprimido en formato **.zip**. Esta es una versión **portable**, que te la puedes llevar en cualquier dispositivo, sea un pendrive, disco duro o SSD.

## Instalación de Neovim en Linux

Neovim está disponible en la mayoría de distribuciones de Linux, pero su instalación varía en función de la distribución. Sin embargo hay algunas distribuciones cuyo repositorio no cuenta con la última versión estable, como es el caso de **Debian**.

En esta sección no se mencionarán todas las distribuciones, pero en [este enlace](https://github.com/neovim/neovim/blob/master/INSTALL.md#install-from-package) se puede ver la información de instalación de Neovim en las diferentes distribuciones.

No obstante, hay que mencionar que tiene varias versiones:

+ **AppImage**: Es una versión portable, que es tan sólo ejecutar y pá'lante.
+ **Tarball**: Es un archivo comprimido en formato **.tar.gz**, que puede ser descomprimido y ejecutado en un directorio, sin que afecte a la versión que tiene instalada en el sistema operativo. Que también es **portable**, vamos.

## Instalación de Neovim en MacOS

En MacOS, Neovim se puede instalar de varias formas:

+ Usando la línea de comandos con el comando `brew install neovim`
+ Descomprimiendo el archivo en formato **tar.gz** en un directorio y ejecutar Neovim desde ese ahí, del mismo modo que Linux.

## Conclusión

Ya hemos completado el primer paso para adentrarnos en el maravilloso mundo de Neovim. En las siguientes secciones vamos a ir directos al turrón, como diría el general Tani de **Humor Amarillo/El castillo de Takeshi**.
