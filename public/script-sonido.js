const SonidoTecla = async () => {
  const sonido = new Audio("/guia-neovim/Tecla.mp3")
  const teclas = document.querySelectorAll("kbd")
  teclas.forEach((tecla) => {
    tecla.addEventListener("click", () => {
      sonido.play()
    })
  })
}

document.addEventListener(
  "astro:page-load",
  () => {
    SonidoTecla()
  },
  { once: true },
)

document.addEventListener(
  "astro:after-swap",
  () => {
    SonidoTecla()
  }
)
