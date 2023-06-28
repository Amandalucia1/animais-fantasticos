/**Seleciona os LINKS INTERNOS PARA UM SCROLL SUAVE  */
export default class ScrollSuave {
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links); //'[data-menu="suave"] a[href^="#"]'
    if (options === undefined) {
      this.options = {
        behavior: "smooth",
        block: "start",
      };
    } else {
      this.options = options;
    }

    //Fazendo referencia ao objeto BIND para o ADDEVENTLISTENER
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(ev) {
    ev.preventDefault();
    /* selecionando o linkInterno e a seçao com seu ID*/
    const href =
      ev.target.getAttribute("href"); /* selecionando href de cada linkInterno*/
    const section =
      document.querySelector(
        href
      ); /* retorna com se fosse ID e pega cada sessao do site*/

    /**Esse pega o elemento direto e faz o scroll */
    section.scrollIntoView(this.options);

    //Antes
    // section.scrollIntoView({
    //     behavior:'smooth',
    //     block:'start' /**Alinha ao meio da seçao no scroll */
    // })

    // Forma alternativa precisa da altura dele considerando o topo
    // const topo=section.offsetTop //Pega altura do elemento
    // window.scrollTo({
    //     top:topo,
    //     behavior:"smooth"
    // })
  }

  addEventLinks() {
    this.linksInternos.forEach((el) => {
      el.addEventListener("click", this.scrollToSection);
    });
  }

  //Verificação faz no init
  init() {
    if (this.linksInternos.length) {
      //Usa length pq é um nodeList SELECTORALL
      this.addEventLinks();
    }
    return this; //So retorne o this
  }
}
