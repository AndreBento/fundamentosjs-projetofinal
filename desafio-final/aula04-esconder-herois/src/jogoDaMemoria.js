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
    this.iconePadrao = './arquivos/ninja.png';
    this.heroisEscondidos = [];
  }
  // para usar o this, não podemos usar static!
  inicializar() {
    // vai pegar todas as funcoes da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisInicias);
    // forca
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
  }
  embaralhar() {
    const copias = this.heroisInicias
    // duplica os itens
    .concat(this.heroisInicias) 
    // entra em cada iten e criar um id aleatorio
    .map(item => {
      return Object.assign({}, item, { id: Math.random() / 0.5 })
    })
    // ordenar aleatoriamente
    .sort(() => Math.random() - 0.5)
    this.tela.atualizarImagens(copias);
    setTimeout(() => {
      this.esconderHerois(copias)
    }, 1000);
  }
  esconderHerois(herois) {
    // vamos trocar a imagem de todos os herois existentes
    // pelo icone padrao
    // como fizemos no construtor, vamos extrair somente o necessario
    // o que tiver dentro dos parenteses
    // quando nao usamos : (exemplo do id), o JS entende que o nome
    // é o mesmo do valor. Ex. id: id, vira id,
    const heroisOcultos = herois.map(( { nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao
    }));
    //atualizamos a tela com os herois ocultos
    this.tela.atualizarImagens(heroisOcultos);
    // guardando os herois para trabalhar com eles depois
    this.heroisOcultos = heroisOcultos;
  }
  jogar() {
    this.embaralhar()
  }
}