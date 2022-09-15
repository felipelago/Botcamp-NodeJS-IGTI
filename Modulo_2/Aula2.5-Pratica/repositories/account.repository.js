import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function getAccounts() {
    const data = JSON.parse(await readFile("accounts.json"));

    return data.accounts
}

async function getAccountId(id) {
    const accounts = await getAccounts();
    const account = accounts.find(account => account.id === parseInt(id)) //parseInt é necessario para converter o texto para numero para fazer a comparação com o account.id
    if (account) {
        return account;
    } else {
        throw new Error("Registro não encontrado");
    }
}

async function insertAccount(account) {
    const data = JSON.parse(await readFile("accounts.json"));
    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    }//Refez o objeto account para colocar id no topo e evitar que outros campos desnecessários ou errados sejam salvos. ++ vai incremetar a cada requisição
    data.accounts.push(account); //Vai pegar o body que você preencheu na requisição e dar um push na array accounts em accounts.json
    await writeFile("accounts.json", JSON.stringify(data, null, 2));//Para gravar no arquivo accounts.json, utilizando o json stringfy para converter de objeto para JSON. Os parametros null e 2 é para organizar o arquivo json (quebrar linha)

    return account;
}

async function deleteAccount(id) {
    const data = JSON.parse(await readFile("accounts.json"));
    data.accounts = data.accounts.filter(account => account.id !== parseInt(id));
    await writeFile("accounts.json", JSON.stringify(data, null, 2));
}

async function updateAccount(account) {
    const data = JSON.parse(await readFile("accounts.json"));
    const index = data.accounts.findIndex(act => act.id === account.id); //Quando o findIndex não encontra retorna -1
    if (index === -1) {
        throw new Error("Registro não encontrado")
    }
    data.accounts[index].name = account.name; //Dessa forma só irá salvar esses 2 campos, sem risco de salvar um campo errado ou desnecessário
    data.accounts[index].balance = account.balance;
    await writeFile("accounts.json", JSON.stringify(data, null, 2));//Para gravar no arquivo accounts.json, utilizando o json stringfy para converter de objeto para JSON. Os parametros null e 2 é para organizar o arquivo json (quebrar linha)

    return data.accounts[index];
}


export default {
    getAccounts,
    insertAccount,
    getAccountId,
    deleteAccount,
    updateAccount
}