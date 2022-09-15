import express from 'express';
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import accountService from './services/account.service.js';
import newSchema from "./schema/index.js"

const { readFile, writeFile } = fs;
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

//é necessário colocar o tipo do objeto que está sendo utilizado(nome da propriedade e tipo)
//Um dos modos de criar e configurar os schemas do graphql
/*const schema = buildSchema(`
    type Account {
        id: Int
        name: String
        balance: Float
    }
    input AccountInput {
        id: Int
        name: String
        balance: Float
    }
    type Query {
        getAccounts: [Account]
        getAccountId(id: Int): Account
    }
    type Mutation {
        createAccount(account: AccountInput): Account
        deleteAccount(id: Int): Boolean
        updateAccount(account: AccountInput): Account
    }
`);

const root = {
    getAccounts: () => accountService.getAccounts(),
    getAccountId(args) { //Não pode colocar o ID diretamente e sim args que vai estar os nossos parametros
        return accountService.getAccountId(args.id);
    },
    createAccount({account}){
        return accountService.createAccount(account)
    },
    deleteAccount({args}){
        accountService.deleteAccount(args.id)
    },
    updateAccount({account}){
        return accountService.updateAccount(account)
    }
}*/

const app = express();
app.use(cors()) //Dessa forma vai liberar de forma global, outros dominios vão ter acesso as requisições http
app.use(express.json());
app.use("/account", accountsRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //configuração da documentação pelo swagger
app.use("/graphql", graphqlHTTP({ //Recebe um objeto JSON
    schema: newSchema,
    //rootValue: root,
    graphiql: true //é opcional, ativa a interface para fazer alguns testes
}))

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