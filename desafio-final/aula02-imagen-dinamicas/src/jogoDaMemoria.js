class JogoDaMemoria {
  // se manda um obj = ( tela: 1, idade:2, etc: 3)
  // vai ignorar o resto das propriedades e pagar somente a prodiedade
  // tela
  constructor({ tela }) {
    this.tela = tela;

    // caminho do arquivo, sempre relativo
    // ao index.html!
    this.heroisInicias = [
      { img: './arquivos/batman_dc.png', name: 'Batman' },
      { img: './arquivos/deadpool_marvel.png', name: 'DeadPool' },
      { img: './arquivos/wonder_woman_dc.png', name: 'Hell Boy' },
      { img: './arquivos/the_flash_dc.png', name: 'Flash' }
    ]
  }
  // para usar o this, não podemos usar static!
  inicializar() {
    // vai pegar todas as funcoes da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisInicias)
  }
}