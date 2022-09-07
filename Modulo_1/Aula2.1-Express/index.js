import express from "express";

const app = express() //cria uma instância do express, metodo nativo do express

app.get("/", (req, res) => {
    res.send("Hello world")
});

app.post("/", (req, res) => {
    const a = 3;
    const b = 5;
    const resultado = a + b;
    res.send("Resultado: " + resultado)
})

app.listen(3000, () => {
    console.log("API Started")
})