export default class Funcionamento {
    
    constructor(dataSemana, activeClass){
        this.dataSemana = document.querySelector(dataSemana)//'[data-semana]'
        this.activeClass = activeClass
    }

    dadosFuncionamento(){
          //Pegando a informação dentro dos dataset na secção CONTATO 
        this.diasSemana= this.dataSemana.dataset.semana.split(',').map(Number) //Retorna string 1,2,3,4,5 tornando array de numeros
        this.horarioSemana= this.dataSemana.dataset.horario.split(',').map(Number) //Retorna string 8,18 tornando array de numeros
        
    }
    
    // const dataHorario = document.querySelector('[data-horario]') horarosemana

  
    dadosAgora(){
        this.agora =new Date()
        this.diaAgora = this.agora.getDay()
        this.horarioAgora =this.agora.getHours() //HORARIO ATUAL
       

    }

    
    estaAberto(){
        //Verificando se horario e dia esta funcionando
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    
    const horarioAberto = (this.horarioAgora >= this.horarioSemana[0]
        && this.horarioAgora < this.horarioSemana[1])

    return semanaAberto && horarioAberto
    }

    ativaAberto(){
        if(this.estaAberto()){
            this.dataSemana.classList.add(this.activeClass)
        }
        

    }

    init(){
        if(this.dataSemana){
            this.dadosFuncionamento()
            this.dadosAgora()
            this.ativaAberto()
        }

        return this
    }
    
    
}