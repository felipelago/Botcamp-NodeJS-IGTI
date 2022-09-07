import express from "express";
import winston from "winston";

const app = express();
app.use(express.json());

const {combine, printf, label, timestamp } = winston.format;

const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
    level: "silly",
    transports: [ //Essa propriedade serve para você direcionar para onde seu log vai
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "my-log.log"})
    ],
    format: combine(
        label({ label: "my-app"}),
        timestamp()
    )
});

logger.error("Error Log")
logger.warn("Warn log")
logger.info("Info Error")
logger.verbose("Verbose Log");
logger.debug("Debug log");
logger.silent("Silly log");

logger.log("info", "Hello with parameter !")

app.listen(3000, ()=> {
    console.log("Api running")
})