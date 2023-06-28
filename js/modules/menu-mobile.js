import outsideClick from "./outsideclick.js";

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    this.menuButton = document.querySelector(menuButton); //'[data-menu="button"]'
    this.menuList = document.querySelector(menuList); //'[data-menu="list"]'

    this.activeClass = "active";

    // define touchstart e click como argumento padrão
    // de events caso o usuário não define
    if (events === undefined) {
      this.events = ["click", "touchstart"];
    } else {
      this.events = events;
    }

    //BIND PRO ADDEVENTLISTENER PRO OBJETO
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(ev) {
    ev.preventDefault();
    this.menuList.classList.toggle(this.activeClass);
    this.menuButton.classList.toggle(this.activeClass);
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove(this.activeClass);
      this.menuButton.classList.remove(this.activeClass);
    });
  }

  addMenuMobileEvents() {
    this.events.forEach((item) => {
      this.menuButton.addEventListener(item, this.openMenu);
    });
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
