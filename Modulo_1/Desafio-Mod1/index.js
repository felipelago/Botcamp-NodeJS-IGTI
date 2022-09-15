import express from "express";
import pedidosRouter from "./routes/pedidos.routes.js";
import { promises as fs } from "fs";
import winston from "winston";

const { readFile, writeFile } = fs;
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label} ${level}: ${message}]`
});
global.logger = winston.createLogger({ //definindo a variável logger como global e aplicando as configurações de log do winston
    level: "silly", //Level do log
    transports: [   //config default
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "api-delivery.log" })
    ],
    format: combine(
        label({ label: "api-delivery" }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use("/pedidos", pedidosRouter);

app.listen(3000, async () => {
    try {
        await readFile("pedidos.json")
        logger.info("API Running")
    } catch (error) {
        logger.error(error)
    }
});