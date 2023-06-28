export default function initFetchBitcoin(url, target) {
  fetch(url)
    .then((response) => response.json())
    .then((bitcoin) => {
      const btc = document.querySelector(target); //'.btc-preco'
      const bitcoinBrasil = bitcoin.BRL.sell;
      btc.innerText = (1000 / bitcoinBrasil).toFixed(4);
    })
    .catch((erro) => {
      console.log(Error(erro));
    });
}
