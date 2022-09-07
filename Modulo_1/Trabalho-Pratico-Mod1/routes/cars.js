import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = JSON.parse(await readFile("car-list.json"));
        res.send(data)
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

router.get("/moreModels", async (req, res) => {
    try {
        let resultado;
        const data = JSON.parse(await readFile("car-list.json"));
        data.forEach((cars) => {
           let car = cars.models.length;
           if(cars.models.length > car){
            resultado = cars.models.brand
           }
        })
        res.send(resultado)
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const data = JSON.parse(await readFile("car-list.json"));
        const accountId = data.accounts.find((account) => { account.id === parseInt(req.params.id) }) //parseInt é necessario para converter o texto para numero para fazer a comparação com o account.id
        res.send(accountId)
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;