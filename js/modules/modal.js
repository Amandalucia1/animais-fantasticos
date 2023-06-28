//Aparece quando clicamos em login
export default class Modal {
  constructor(botaoAbrir, containerModal, botaoFechar) {
    this.botaoAbrir = document.querySelector(botaoAbrir); //'[data-modal="abrir"]'
    this.containerModal = document.querySelector(containerModal); //'[data-modal="container"]'
    this.botaoFechar = document.querySelector(botaoFechar); //'[data-modal="fechar"]'

    /**Bind This callback para fazer referencia ao objeto da classe */
    //BIND para o ADDEVENTLISTENER
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  //Abre ou fecha o modal
  toggleModal() {
    this.containerModal.classList.toggle("ativo");
  }

  //Adiciona o evento de toggle ao modal
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  //Fecha o modal ao clicar do lado de fora
  cliqueForaModal(ev) {
    console.log(this); //This é o containerModal o pai dessa funçao addEventListerner
    if (ev.target === this.containerModal) {
      this.toggleModal();
    }
  }

  //Adiciona os eventos aos elementos do modal
  addEventModal() {
    /**Quando adiciona evento a função de callback (this.eventToggle) o this faz referencia ao elemento HTML*/
    this.botaoAbrir.addEventListener("click", this.eventToggleModal);
    this.botaoFechar.addEventListener("click", this.eventToggleModal);
    this.containerModal.addEventListener("click", this.cliqueForaModal); /** */
  }

  //Verificação faz no init
  init() {
    if (this.botaoAbrir && this.containerModal && this.botaoFechar) {
      this.addEventModal();
    }
    return this;
  }
}
