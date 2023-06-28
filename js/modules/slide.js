/**FUNÇAO HELPER EM OUTRA PASTA  */
import debouce from "./debounce.js";

export class Slide {
  constructor(slide, slideWrapper) {
    this.slide = document.querySelector(slide);
    this.slideWrapper = document.querySelector(slideWrapper);

    this.activeClass = "active";
    /**Criando Evento novo */
    this.changeEvents = new Event("changeEvent");

    //OBJETO
    this.dist = {
      finalPosition: 0,
      startX: 0, //  VALOR INICIAL DO CLIQUE
      movement: 0, // total q se moveu no momento de clique
    };
  }

  //Index Valor BOOLEANO
  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : " ";
  }

  moveSlide(distX) {
    //Salvando a posiçao distX
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px,0,0)`;
  }

  //dist.startX é do mousedown (valor inicial do clique)
  //clientX PARAMETRO QUE ANDA MOUSEMOVE (VALOR MUDA CONSTANTEMENTE)
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.4;
    return this.dist.finalPosition - this.dist.movement;
  }

  /*EVENTO MOUSEDOWN é um evento de quando vc mantem o mouse pressionado*/
  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    // event.preventDefault()
    // this.dist.startX = event.changedTouches[0].clientX
    // console.log(event)

    /**Funciona no movimento do mouse  ou do dedo no celular*/
    this.slideWrapper.addEventListener(moveType, this.onMove);

    this.transition(false);
  }

  /**Funçao dentro de onStart do movimento do mouse */
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    //Calculo do movimento do slide
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.slideWrapper.removeEventListener(moveType, this.onMove);
    //Salvando valor final
    this.dist.finalPosition = this.dist.movePosition;

    //ATIVA TRANSTITION
    this.transition(true);
    this.changeSlideOnEnd();
  }

  //Mude slide no final
  changeSlideOnEnd() {
    /*Valor final this.dist.movement*/
    /*this.index.next !== undefined nao passar do fim do slide*/
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  //Adiciona eventos
  addSlideEvents() {
    /**MouseDown é um evento de quando vc mantem o mouse pressionado */
    this.slideWrapper.addEventListener("mousedown", this.onStart);
    this.slideWrapper.addEventListener("touchstart", this.onStart);

    //Evento quando tira o dedo mouse
    this.slideWrapper.addEventListener("mouseup", this.onEnd);
    this.slideWrapper.addEventListener("touchend", this.onEnd);
  }

  /**Calcula o posicionamento para colocar LI no centro da tela */
  slidePosition(slide) {
    //LI PARAMETRO
    /*Total da tela (slideWrapper) menos o total do item (slide.offsetWidth) sobre a margin e divide por 2*/
    const margin = (this.slideWrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  //this.slide é UL NAO é ITERAVEL
  //Children é iteravel ou seja pode usar o rest operator
  slideConfig() {
    //Cria array de LI
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      //Retorna um objeto
      return {
        position, //Tem mesmo nome
        element, //Tem mesmo nome
      };
    });
  }

  /*Retorna o index dos li Criado em slideArray*/
  slideIndexNav(index) {
    //Tamanho total da Array this.slideArray
    const totalDaArray = this.slideArray.length - 1; //Last Origamid

    //Objeto
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === totalDaArray ? undefined : index + 1,
    };
  }

  //Recebe o index e coloca o elemento no meio da tela
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position); //This slideArray OBJETO

    this.slideIndexNav(index);

    this.dist.finalPosition = activeSlide.position;

    this.changeActiveClass();

    /**Evento criado no construtor */
    this.slideWrapper.dispatchEvent(this.changeEvents);
  }

  /**ADICIONANDO ACTIVECLASS */
  changeActiveClass() {
    /**REMOVENDO O ACTIVECLASS EM LOOP */
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
    });
    /** this.slideArray[this.index.active].element LI ATIVO*/
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  /**FUNÇAO DE MUDANÇA DE TAMANHO DE TELA */
  onResize() {
    setTimeout(() => {
      this.slideConfig();
      this.changeSlide(this.index.active);
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  //Fazendo bind nos addeventlistener
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    /**Usa debounce para fazer um evento ser disparado poucs vezes */
    /**Aceita dois parametro a função e o tempo DELAY */
    this.onResize = debouce(this.onResize.bind(this), 100);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.slideConfig();
    this.addSlideEvents();
    this.addResizeEvent();
    this.changeSlide(0);
    return this;
  }
}

export class SlideNav extends Slide {
  constructor(slide, slideWrapper) {
    super(slide, slideWrapper);
    this.bindControlEvents();
  }

  addArrow(prev, next) {
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prev.addEventListener("click", this.activePrevSlide);
    this.next.addEventListener("click", this.activeNextSlide);
  }

  //Bolinha do slide
  createControl() {
    const control = document.createElement("ul");
    /**Criando DATA-CONTROL="slide" */
    control.dataset.control = "slide";

    /**Acessando SLIDEARRAY CLASS MAE */
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.slideWrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.slideWrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  //Adiciona o control
  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    //Control é a ul do createControl()
    this.controlArray = [...this.control.children]; //Me da as li em array

    this.activeControlItem();
    this.controlArray.forEach((item, index) => {
      this.eventControl(item, index);
    });
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
