//Div de informaçoes de endereço em div Contatos
export default class Tooltip {
  constructor(tooltip) {
    this.tooltip = document.querySelectorAll(tooltip); //'[data-tooltip]'

    /**Fazendo BIND as funções de addEventListener, para referencialas ao objeto */
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onmouseOver = this.onmouseOver.bind(this);
  }

  /**Move tooltip com base em seus estilos de cacordo com a posição do mouse */
  onMouseMove(event) {
    //Criou a tootipBox na função criarTooltipBox
    this.tooltipBox.style.top = event.pageY + 20 + "px";

    if (event.pageX + 480 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 240}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`; //event.pageX + 20 + 'px'
    }
    console.log(event.pageX + 440, window.innerWidth);
  }

  //Remove a tooltip e seus eventos de mousemove e mouse leave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  //Cria tootip box e coloca no body
  criartooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox; //Criou a tootipBox para ser usada em outrafunçao
  }

  /*Cria a tooltip e adiciona os eventos de mousemove e mouseleave ao target*/
  onmouseOver({ currentTarget }) {
    //Cria a tooltipbox e coloca em uma propriedade
    this.criartooltipBox(currentTarget);
    // this.tooltipBox.style.top=event.pageY + 'px'
    // this.tooltipBox.style.left=event.pageX + 'px'

    //Função callback faz referencia ao elemento HTM precisa de BIND()
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
    currentTarget.addEventListener("mousemove", this.onMouseMove);
  }

  /**Adiciona os eventos de mouseover a cada tooltip */
  addEventTootip() {
    this.tooltip.forEach((item) => {
      item.addEventListener("mouseover", this.onmouseOver);
    });
  }

  //Inicia a classe e retorna o this
  init() {
    if (this.tooltip.length) {
      //Usa length pq é nodeList (SELECTORALL)
      this.addEventTootip();
    }
    return this;
  }
}
