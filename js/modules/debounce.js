//Função que ajuda animaçao scrool a ser executada poucas vezes, usada em evento de scroll
export default function debouce(callback, delay) {
    let timer 
    return(...args)=>{
        if (timer) {
            clearTimeout(timer)
        }
        timer= setTimeout(() => {
            callback(...args)
            timer = null
        }, delay);
    }
}