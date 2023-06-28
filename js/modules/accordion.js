//Perguntas e respostas
export default class Accordion {
  constructor(list) {
    this.todosDt = document.querySelectorAll(list); //AcordionList   '.js-accordion dt'
    this.activeClass = "ativo";
  }

  toggleAccordion(item) {
    item.classList.toggle(this.activeClass);
    item.nextElementSibling.classList.toggle(this.activeClass);
  }

  //Adiciona os eventos ao accordion
  addAcordionEvent() {
    this.todosDt.forEach((item) => {
      item.addEventListener("click", () => this.toggleAccordion(item)); //Passando oitem como parametro
    });
  }
  //Iniciar Função
  //Verificação faz no init
  init() {
    if (this.todosDt.length) {
      //Usa length pq é um nodeList SELECTORALL
      //Ativa o primeiro item
      this.toggleAccordion(this.todosDt[0]);
      this.addAcordionEvent();
    }
    return this;
  }
}
