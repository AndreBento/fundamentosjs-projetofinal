class JogoDaMemoria {
  // se manda um obj = ( tela: 1, idade:2, etc: 3)
  // vai ignorar o resto das propriedades e pagar somente a prodiedade
  // tela
  constructor({ tela }) {
    this.tela = tela;

    // caminho do arquivo, sempre relativo
    // ao index.html!
    this.heroisInicias = [
      { img: './arquivos/batman_dc.png', nome: 'Batman' },
      { img: './arquivos/deadpool_marvel.png', nome: 'DeadPool' },
      { img: './arquivos/wonder_woman_dc.png', nome: 'Mulher Maravilha' },
      { img: './arquivos/the_flash_dc.png', nome: 'Flash' }
    ]
    this.iconePadrao = './arquivos/ninja.png';
    this.heroisEscondidos = [];
    this.heroisSelecionados = [];
  }
  // para usar o this, não podemos usar static!
  inicializar() {
    // vai pegar todas as funcoes da classe tela!
    // coloca todos os herois na tela
    this.tela.atualizarImagens(this.heroisInicias);
    // forca
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
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
    // é o mesmo do valor. Ex. id:Hell Boy id, vira id,
    const heroisOcultos = herois.map(({ nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao
    }));
    //atualizamos a tela com os herois ocultos
    this.tela.atualizarImagens(heroisOcultos);
    // guardando os herois para trabalhar com eles depois
    this.heroisOcultos = heroisOcultos;
  }
  exibirHerois(nomeDoHeroi) {
    // vamos procurar esse heroi pelo nome em nosso heroisIniciais
    // vamos obter somente a imagem dele
    const { img } = this.heroisInicias.find(({ nome }) => nomeDoHeroi === nome);
    // vamos criar a funcao na tela, para exibir somente o heroi selecionado
    this.tela.exibirHerois(nomeDoHeroi, img);
  }
  verificarSelecao(id, nome) {
    const item = { id, nome };
    //vamos verificar a quantiade de herois selecionados
    // e tomar acao se escolhe certo ou errado
    const heroisSelecionados = this.heroisSelecionados.length;
    switch (heroisSelecionados) {
      case 0:
        // adiciona a escolha na lista, esperando pela proxima clicada
        this.heroisSelecionados.push(item);
        break;
      case 1:
        // se a quantidade de escolhidos for 1, significa
        // que o usuario só pode escolher mais um
        // vamos obter o primeiro item da lista
        const [opcao1] = this.heroisSelecionados;
        // zerar itens para nao selecionar mais de dois
        this.heroisSelecionados = [];
        // conferir se os nomes e ids batem conforme o esperado
        if (opcao1.nome === item.nome &&
          // aqui verificamos se sao ids diferentes para o usuario não clicar duas vezes no mesmo
          opcao1.id !== item.id) {
          this.exibirHerois(item.nome);
          // como o padrao e true, nao precisa passar nada
          this.tela.exibirMensagem();
          // para a execucao
          return;
        }
        this.tela.exibirMensagem(false);
        // fim do case!
        break;
    };
  }
  jogar() {
    this.embaralhar()
  }
}