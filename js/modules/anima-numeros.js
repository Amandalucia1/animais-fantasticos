export default class AnimaNumero {
  constructor(numeros, observerTrget, observerClass) {
    this.numeros = document.querySelectorAll(numeros); //'[data-numero]'
    this.observerClass = observerClass;
    this.observerTrget = document.querySelector(observerTrget); //.numeros

    //Adicionando bind  para o ADDEVENTLISTENER
    this.handleMutation = this.handleMutation.bind(this);
  }

  /**Recebe elemento do dom com número em seu texto incrementa a partir de 0 até o númer o final */
  static incrementarNumero(numero) {
    const total = +numero.innerHTML;
    /**Para pararem ao mesmo tempo */
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start = start + incremento;
      numero.innerHTML = start;
      if (start > total) {
        numero.innerHTML = total;
        clearInterval(timer);
      }
    }, 35 * Math.random());
  }

  /**Ativa a função incrementar para cada número selecionado no dom */
  animaNumeros() {
    this.numeros.forEach((numero) => {
      this.constructor.incrementarNumero(numero);
    });
  }

  /**Funçao que ocorre quando a mutação ocrrer */
  /**Mutation tem um array (MUTATIONRECORD) q da acesso A mutaçao de ATRIBUTO E O UNICO QUE MUDA E O CLASS E DA ACESSO AO TARGET  q possui classe ativo  RELACIONADO COM SCROLL SUAVE*/
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      /**DA PROBLEMA NO SCROLL RETIRA ELE (FAAZ ANIMAÇÃO 1 VEZ) */
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  /*Adiciona o objeto mutationObserver para verificar quando a classe ativa é a dicionada ao elemento traget*/
  addMutationObserver() {
    //Pega um objeto precisa de 1 parametro callback(funcao q vai ser ativada)
    this.observer = new MutationObserver(this.handleMutation); //Essa callback precisa de bind

    //POSSUI METODO OBSERVE() que observa o elemento .numeros
    this.observer.observe(this.observerTrget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTrget) {
      this.addMutationObserver();
    }

    return this;
  }
}
