---
title: Comandos
---

# :comandos

NeoVim, además de contar con diferentes **modos de edición**, también dispone de un modo para introducir **comandos**, y que le otorga al usuario todo un mundo de posibilidades a su alcance. Para acceder a este modo hay que pulsar la tecla de <kbd>:</kbd> seguido del comando.

En las siguientes tablas hay una variedad de comandos agrupados por tipo.

## General

| Comando                               | Descripción                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `:quitall`                            | Sale de **Neovim** (aún con pestañas o búferes abiertos). 😃😃😃                  |
| `:registers`                          | Muestra el contenido que hay en los registros (equivalente al **portapapeles**.)  |
| `:! [comando de Windows/Linux/MacOS]` | Ejecuta un comando de la terminal dentro de **Neovim**                            |
| `:checkhealth`                        | Realiza un diágnostico para comprobar que **Neovim** funcione bien                |
| `:set [opcion]`                       | Activa una opción. Útil para las configuraciones                                  |
| `:set [opcion = variable]`            | Asigna una variable a una opción. Útil para las configuraciones                   |
| `:set no[opcion]`                     | Desactiva la opción X                                                             |
| `:lua [script]`                       | Ejecuta un script en **Lua**, que puede ser función, variable, etc...             |
| `:help [página]`                      | Carga la ayuda de X página. Útil para revisar la documentación                    |
| `:tutor`                              | Carga el tutorial de **Neovim**, por si eres un **n00b** y no sabes dónde empezar |
| `:options`                            | Muestra una lista de opciones que se pueden configurar en **Neovim**              |
| `:echo [mensaje]`                     | Muestra un mensaje en la línea de comandos                                        |
| `:call [función]`                     | Llama a una función y sus argumentos                                              |
| `:let [variable]`                     | Declara una variable interna                                                      |

> P.D.: Los [plugins](/plugins) de terceros que se cargan en **Neovim** cuentan con su propia documentación y comandos.

## Archivo / búfer

| Comando        | Descripción                                                      |
| -------------- | ---------------------------------------------------------------- |
| `:w`           | Guarda los cambios del archivo                                   |
| `:wq`          | Guarda los cambios del archivo y lo cierra                       |
| `:q!`          | Fuerza el cierre del archivo pero no guarda los cambios          |
| `:w!`          | Fuerza la escritura del archivo aunque esté en modo sólo lectura |
| `:r [archivo]` | Lee los contenidos de X archivo y los añade al archivo actual    |
| `:source %`    | Recarga el archivo actual                                        |

## Edición

| Comando | Descripción              |
| ------- | ------------------------ |
| `:undo` | Deshace la última acción |
| `:redo` | Rehace la última acción  |

## Gestión de pestañas / búfers

| Comando                       | Descripción                                          |
| ----------------------------- | ---------------------------------------------------- |
| `:tabedit [archivo]`          | Abre el archivo X en una nueva pestaña               |
| `:tabnew [archivo]`           | Crea un nuevo archivo y lo abre en una nueva pestaña |
| `:tabclose`                   | Cierra la pestaña actual                             |
| `:tabprevious` o `:tprevious` | Cambia a la pestaña anterior                         |
| `:tabnext` o `:tnext`         | Cambia a la pestaña siguiente                        |
| `:tabs`                       | Muestra una lista de las pestañas                    |
| `:bdelete` o `:bd`            | Cierra el búfer y lo quita de la lista de búfers     |
| `:bclose` o `:bc`             | Cierra el búfer                                      |
| `:bprevious` o `:bp`          | Cambia al búfer anterior                             |
| `:bnext` o `:bn`              | Cambia al búfer siguiente                            |
| `:buffers`                    | Muestra una lista de los búferes                     |

## Búsqueda y reemplazo

| Comando        | Descripción                                              |
| -------------- | -------------------------------------------------------- |
| `:s/[x]/[y]/g` | Reemplaza todas las ocurriencias de x y las cambia por y |
| `:?[palabra]`  | Busca las ocurrencias que coincidan con la palabra       |
| `:/[palabra]`  | Busca las ocurrencias que coincidan con la palabra       |

> P.D.: Se pueden usar también las **expresiones regulares**, aunque eso queda fuera de
> este sitio. No obstante, puedes echarle un ojo con el comando `:help pattern.txt`.
