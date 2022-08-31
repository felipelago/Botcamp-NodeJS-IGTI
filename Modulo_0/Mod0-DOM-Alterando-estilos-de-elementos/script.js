
let caixa = document.getElementById("caixa");
let xe, ye

function setPos(x, y) {
    //caixa.style = "top: " + y + "px; left: " + x + "px" //Uma das formas de mudar o style pegando parametro da função
    caixa.style.top = y + "px" //Segunda forma de mudar o style pegando parametro da função (fazendo o mesmo que acima)
    caixa.style.left = x + "px"
}

caixa.addEventListener("mousedown", iniciaArraste)
document.addEventListener("mouseup", terminaArraste)//ele vai identificar quando soltar o mouse em todo o documento para evitar alguns problemas

function iniciaArraste(evn) {
    xe = evn.clientX - pxParaNum(caixa.style.top)
    ye = evn.clientY - pxParaNum(caixa.style.left)
    //Para corrigir a diferença na hora de arrastar é preciso fazer o cálculo da diferença de posição do client e do css

    caixa.classList.add("arrastando")//adicionando uma classe a div sem ter problemas caso a div já tivesse uma classe definida no html
    document.addEventListener("mousemove", arrasta)
}

function terminaArraste(evn) {
    caixa.classList.remove("arrastando")//vai remover a classe adicionada acima (para identificar quando o usuario começou a arrastar e parou de arrastar)
    document.removeEventListener("mousemove", arrasta)
}

function arrasta(evn) {
    let x = evn.clientX;
    let y = evn.clientY;
    setPos(x - xe, y - ye)
}

function pxParaNum(s) { //Essa função vai receber o valor em px como parametro e retornar o valor em número sem o px por causa do replace e a conversão por causa do + na frente
    return +(s.replace("px", ""))
}