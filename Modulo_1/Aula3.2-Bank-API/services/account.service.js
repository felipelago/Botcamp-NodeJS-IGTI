import accountRepository from "../repositories/account.repository.js"


async function createAccount(account) { //account está como parametro pois vai receber do controller pois ele que recebe a requisição do body e salva em account
    return await accountRepository.insertAccount(account);

}

async function getAccounts() {
    return await accountRepository.getAccounts()
}

async function getAccountId(id) {
    return await accountRepository.getAccountId(id);
}

async function deleteAccount(id) {
    return await accountRepository.deleteAccount(id);
}

async function updateAccount(account) {
    return await accountRepository.updateAccount(account);
}

async function updateBalance(account) {
    const acc = await accountRepository.getAccountId(account.id);
    acc.balance = account.balance;

    return await accountRepository.updateAccount(acc);
}

export default {
    createAccount,
    getAccounts,
    getAccountId,
    deleteAccount,
    updateAccount,
    updateBalance
}