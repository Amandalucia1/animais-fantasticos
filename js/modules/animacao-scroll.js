import debouce from "./debounce.js";

/**CRIA ANIMAÇAO DE ENTRADA AO PASSAR O SCROLL DO MOUSE  */
export default class AnimaScroll {

    constructor(sections){
        this.sections=document.querySelectorAll(sections)//'[data-anime="scroll"]'

        //Metade da tela para passar a animaçao com acessibilidade
        //window.INNERHEIGHT retorna o tamanho da tela do usuario
        this.windowMetade= window.innerHeight*0.7


        this.checkDistance = debouce(this.checkDistance.bind(this),100)//callback e delay
    }



    /**Pega a distancia de cada item em relação ao topo do site */
    getDistance(){
        this.distance = [...this.sections].map((section) =>{
            const offset = section.offsetTop
            return{
                element:section,
                offset: Math.floor(offset - this.windowMetade),
            };
        });
    }


    // Verifica a distância em cada objeto
    // em relação ao scroll do site
    checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
    }

   
    
    //Ativada quando faz  scroll no mouse
        animaScrool() {
            this.sections.forEach((section)=>{
                
                const sectionTop=section.getBoundingClientRect().top
                const acessibilidadeTela = sectionTop-this.windowMetade
        
               if (acessibilidadeTela<0) {
                section.classList.add('ativo')
               } else if( section.classList.contains('ativo')){
                section.classList.remove('ativo')
        
               }
        })
        
       
             
    }

    init(){

        
        if (this.sections.length) {
            this.getDistance();
            this.checkDistance();
            window.addEventListener('scroll',this.checkDistance)
            //ERROS
        }
      return this
    }
    //Remove evento de scrooll
    stop(){
        window.removeEventListener('scroll',this.checkDistance)
    }

   
}