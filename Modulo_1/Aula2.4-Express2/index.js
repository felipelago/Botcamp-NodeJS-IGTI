import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    throw new Error("Error message test")
});

app.post("/", async (req, res, next) => { //Quando a função é async é sempre usar o try catch pois se der erro a aplicação vai travar sem poder tratar o erro
    try {
        throw new Error("Erro message async")
    } catch (err) {
        next(err)
    }

});

app.use((err, req, res, next) => {//para tratamento de erros de toda aplicação
    console.log("Error 1")
    //res.status(500).send("Ocorreu um erro -> primeira requisição.")
    next(err)//passando o erro para ser tratado na próxima requisição que tiver o parametro err
});

app.use((err, req, res, next) => { //Desta forma irá imprimir Error 1 e Error 2 quando  chegar nessa requisição
    console.log("Error 2");
    res.status(500).send("Ocorreu um erro numero 2.")
});

app.listen(3000, () => {
    console.log("API Started")
});