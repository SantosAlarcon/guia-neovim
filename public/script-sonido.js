const sonido = new Audio("/guia-neovim/tecla.mp3");
const teclas = document.querySelectorAll("kbd");
teclas.forEach((tecla) => {
	tecla.addEventListener("click", () => {
		sonido.play();
	});
});