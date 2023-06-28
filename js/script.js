import ScrollSuave from "./modules/scroll-suave.js";

import AnimaScroll from "./modules/animacao-scroll.js";
import Accordion from "./modules/accordion.js";
import Tabnav from "./modules/tabnav.js";
import Modal from "./modules/modal.js";
import MenuMobile from "./modules/menu-mobile.js";
import Tooltip from "./modules/tooltip.js";

import DropdownMenu from "./modules/dropdown-menu.js";

import Funcionamento from "./modules/date.js";
import initFetchAnimais from "./modules/fetchanimais.js";

import initFetchBitcoin from "./modules/fetchbitcoin.js";

//Slide
import { Slide, SlideNav } from "./modules/slide.js";

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const accordion = new Accordion(".js-accordion dt");
accordion.init();

const tabNav = new Tabnav(".js-tabmenu li", '[data-tab="content"] section');
tabNav.init();

const animaScroll = new AnimaScroll('[data-anime="scroll"]');
animaScroll.init();

const modal = new Modal(
  '[data-modal="abrir"]',
  '[data-modal="container"]',
  '[data-modal="fechar"]'
);
modal.init();

const tooltip = new Tooltip("[data-tooltip]");
tooltip.init();

const dropDownMenu = new DropdownMenu("[data-dropdown]");
dropDownMenu.init();

const menu = new MenuMobile('[data-menu="button"]', '[data-menu="list"]');
menu.init();

const funcionamento = new Funcionamento("[data-semana]", "aberto");
funcionamento.init();

initFetchAnimais("../animaisapi.json", ".numero-grid");

initFetchBitcoin("https://blockchain.info/ticker", ".btc-preco");

//Slide
const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
// slide.addArrow('.prev','.next')
slide.addControl(".custom-controls");
