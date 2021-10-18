function onLoad() {
  const dependencias = {
    tela: Tela, // a classe Tela é global
    util: Util // a classe Util é global
  }
  // inicializamos o jogo da memoria
  const jogoDaMemoria = new JogoDaMemoria(dependencias);
  jogoDaMemoria.inicializar();
}
window.onload = onLoad;