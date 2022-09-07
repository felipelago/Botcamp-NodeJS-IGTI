import express from "express";

const app = express();
app.use(express.json()); //toda vez que for trabalhar com JSON é necessário fazer isso para o express reconhecer

app.all("/testeAll", (req, res) => { //vai capturar todas as requisições http nesse endpoint
    res.send(req.method)
});

app.get("/teste?", (req, res) => { //? faz com que o ultimo carectere seja opcional
    res.send("/teste?")
});

app.get("/teste+", (req, res) => { //+ faz com que o ultimo carectere possa ser repetido quantas vezes quiser e vai dar na mesma requisição
    res.send("/teste+")
});

app.get("/one*Blue", (req, res) => { //Qualquer coisa escrita no lugar do * dara na mesma requisição
    res.send(req.path)
});

app.post("/test(ing)?", (req, res) => { //Tudo dentro do parentese fica opcional
    res.send("test(ing)")
})

app.post("/TesteBody", (req, res) => {
    console.log(req.body)
    res.send("Teste Post com Body JSON")
})

//Parametros na rota
app.get("/testeParam/:id", (req, res) => { //Fazendo requisição passando o ID
    res.send("Retornando o ID passado na URL: " + req.params.id)
})

//parametros via query
app.get("/testeQuery", (req, res) => {//vai retornar em JSON a querystring da url, ex: http://localhost:3000/testeQuery?nome=felipe&idade=28 vai retornar um json nome: felipe e idade: 28
    res.send(req.query) //na url após o endpoint coloca uma virgula e os parametros, & separa os parametros
})

//utilizando o next para rodar mais de 1 função de callback
app.get("/testeMultipleHandlers", (req, res, next) => {
    console.log("Callback 1")
    next() //chamando o terceiro parametro ele faz com que ele va para a segunda função
}, (req, res) => {
    console.log("Callback 2")
    res.end();
})

//next com arrays
const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
}

function callback2(req, res, next) {
    console.log("Callback 2");
    next();
}

const callback3 = (req, res) => {
    console.log("Callback 3")
    res.end()
}

app.get("/testComArrays", [callback1, callback2, callback3])

app.listen(3000, () => {
    console.log("API Started!")
});