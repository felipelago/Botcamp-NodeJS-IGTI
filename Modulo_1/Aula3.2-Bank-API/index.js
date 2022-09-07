import express from 'express';
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {swaggerDocument} from "./doc.js"

const { readFile, writeFile } = fs;
const app = express();
const { combine, timestamp, label, printf } = winston.format; //desestruturando o format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label} ${level}: ${message}]`
})
global.logger = winston.createLogger({ //definindo a variável logger como global e aplicando as configurações de log do winston
    level: "silly", //Level do log
    transports: [   //Esse é um padrão, a configuração será semelhante a isso a depender do projeto
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-bank-api.log" })
    ],
    format: combine(
        label({ label: "my-bank-api" }),
        timestamp(),
        myFormat
    )
})

app.use(cors()) //Dessa forma vai liberar de forma global, outros dominios vão ter acesso as requisições http
app.use(express.json());
app.use("/account", accountsRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //configuração da documentação pelo swagger

app.listen(3000, async () => {
    try { //Vai tentar ler o arquivo accounts.js caso não encontre vai criar um novo pelo writeFile
        await readFile("accounts.json")
        logger.info("API Running")
    } catch (error) {
        const initialJson = { //estrutura do JSON que será criado
            nextId: 1,
            accounts: []
        }
        writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Created")
        }).catch(err => {
            logger.error(err)
        })
    }

});