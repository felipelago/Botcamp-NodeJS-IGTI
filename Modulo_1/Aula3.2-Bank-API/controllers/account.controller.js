import accountService from "../services/account.service.js"

//Criação da conta
async function createAccount(req, res, next) {
    try {
        let account = req.body;
        if (!account.name || account.balance == null) { //Antes do código salvar ele vai verificar se os campos foram preenchidos, caso não, estoura erro
            throw new Error("Name e Balance são obrigatórios")
        }
        account = await accountService.createAccount(account);

        res.send(account)
        logger.info(`POST /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
}

//Listar todas as contas
async function getAccount(req, res, next) {
    try {
        res.send(await accountService.getAccounts(req.params.id))//ele vai consultar o id da requisição e passar somente o id como parametro para o service
        logger.info(`GET /account`)
    } catch (err) {
        next(err)
    }
}

//Lista conta por ID
async function getAccountId(req, res, next) {
    try {
        res.send(await accountService.getAccountId(req.params.id))
        logger.info(`GET /account/:id`)
    } catch (err) {
        next(err)
    }
}

//Deletar conta com ID
async function deleteAccount(req, res, next) {
    try {
        await accountService.deleteAccount(req.params.id);
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
}

//Atualiza a conta inteira
async function updateAccount(req, res, next) {
    try {
        let account = req.body;
        if (!account.id || !account.name || account.balance == null) {
            throw new Error("ID, Name e Balance são obrigatórios")
        }
        await accountService.updateAccount(account)

        res.send(account);
        logger.info(`PUT /account - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
}

//Atualiza o balance da conta pelo ID
async function updateBalance(req, res, next) {
    try {
        let account = req.body;
        if (!account.id || account.balance == null) {
            throw new Error("Id e Balance são obrigatórios")
        }
        await accountService.updateBalance(account)
        res.send(account);
        logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
}

export default {
    createAccount,
    getAccount,
    getAccountId,
    deleteAccount,
    updateAccount,
    updateBalance
}