import AnimaNumero from "./anima-numeros.js";


export default function initFetchAnimais(url, target) {
    

    /**Cria a div contendo informaçoes com o total de animais */
    function createAnimal(animal) {
        const div = document.createElement('div')
        div.classList.add('numero-animal')
        div.innerHTML=`<h3>${animal.especie}</h3> <span data-numero>${animal.total}</span>`
        return div
    }

    const numeroGrid = document.querySelector(target)//'.numero-grid'

    //Preenche cada animal no dom
    function preencherAnimais(animal) {
        const divAnimal=createAnimal(animal) 
        numeroGrid.appendChild(divAnimal)  
    }

    //Anima o número de cada animal
    function animaAnimaisNumero() {
        const animaNumeros = new  AnimaNumero('[data-numero]', '.numeros','ativo')
        animaNumeros.init()
    }

    /**Puxa os animais através de um arquivo json e cria animais usando createAnmimal() */
    async function criarAnimais() {
        try {
            //Fetch e espera resposta
            const animaisResponse =await fetch(url) 
            //Transforma em json
            const animaisJSON = await animaisResponse.json()
            
            animaisJSON.forEach((animal) => preencherAnimais(animal))
            animaAnimaisNumero()    
        } catch (error) {
            console.log(error)
        }
      
     }
     return criarAnimais()
    //  fetchAnimais('./animaisapi.json')
    
   
}

