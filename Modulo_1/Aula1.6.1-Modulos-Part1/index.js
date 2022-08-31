const operacoes = require("./common-module.js");
const operacoes2 = require("./operacoes2.js")

console.log(`Soma: ${operacoes.soma(2,3)}`)
operacoes.subtracao(5,1)

console.log(operacoes2(3,4)) //como foi exportado a função multiplicacao direta, não precisa passar chamar a função, só colocar a variável