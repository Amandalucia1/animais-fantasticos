export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const dataOutside = "data-outside";

  /**Verificando se existe  hasAttribute dataOutside*/
  if (!element.hasAttribute(dataOutside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        //Depois de sair da fase de bubble que ele sera executado setTimeOut Assync
        html.addEventListener(userEvent, haddleOutsideClick);
      });
    });

    element.setAttribute(dataOutside, "");
  }

  function haddleOutsideClick(event) {
    if (!element.contains(event.target)) {
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, haddleOutsideClick);
      });

      element.removeAttribute(dataOutside, "");

      callback();
    }
  }
}
