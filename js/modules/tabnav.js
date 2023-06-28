/**ABRE SECTIONS DA .ANIMAIS-DESCRICAO AO CLICAR NA IMAGENS DA CLASSE .ANIMAIS E TIPO GALERIA COM TEXTO */

export default class TabNav {
  constructor(menu, content) {
    //Selecao de elementos ARRAY-LIKE
    this.tabMenu = document.querySelectorAll(menu); //'.js-tabmenu li'
    this.tabContent = document.querySelectorAll(content); //'[data-tab="content"] section'
    this.activeClass = "ativo";
  }

  //Adiciona eventos nas tabs
  addTabNavEvent() {
    this.tabMenu.forEach((el, index) => {
      el.addEventListener("click", () => {
        this.activeTab(index);
      });
    });
  }

  //Ativa o item de texto descriçao dos animais
  activeTab(index) {
    //Remove a classe ativo do item quando se clica em outro
    this.tabContent.forEach((el) => {
      el.classList.remove(this.activeClass);
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add(this.activeClass, direcao);
  }

  //Verificação faz no init
  init() {
    //VERIFICA EXISTENCIA DOS ARRAY-LIKE
    if (this.tabMenu.length && this.tabContent.length) {
      //Usa length pq é um nodeList SELECTORALL
      //Ativa primeiro item
      this.activeTab(0);
      this.addTabNavEvent();
    }
    return this;
  }
}
