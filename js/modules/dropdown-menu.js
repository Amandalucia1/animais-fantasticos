import outsideClick from "./outsideclick.js"

export default class DropdownMenu {

    constructor(menuDropdown, events){
        this.menuDropdown =document.querySelectorAll(menuDropdown)//'[data-dropdown]'

        this.activeClass= 'active'

    // define touchstart e click como argumento padrão
    // de events caso o usuário não define
        if (events === undefined) {
            this.events =['click','touchstart']
        }else{
            this.events = events
        }
        //Fazendo bind para o ADDEVENTLISTENER
        this.activeDropDownMenu=this.activeDropDownMenu.bind(this)

        
    }
    
    
   /**Ativa dropDownmenu e adiciona a funçao que observa o clique fora dele */
    activeDropDownMenu(event) {
        event.preventDefault()
        const element = event.currentTarget;
        element.classList.add(this.activeClass);
        outsideClick(element, this.events, () => {
        element.classList.remove('active');
    });
  }

    /**const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove('active');
    });
  } */

    /*Adiciona os eventos ao dropDownMenu*/
    addDropDownEvent(){
        this.menuDropdown.forEach((menu)=>{
            this.events.forEach((item)=>{/**Array de eventos click','touchstart' */
                
                menu.addEventListener(item, this.activeDropDownMenu)
            })
    
        })
    }
    
   init(){
    if (this.menuDropdown.length) {
        this.addDropDownEvent()
    }
    return this
   }
   
}