import ProprietarioService from "../services/proprietario.service.js";

async function createProprietario(req, res, next) {
    try {
        let proprietario = req.body;
        if (!proprietario.nome || !proprietario.telefone) {
            throw new Error("Nome e telefone são obrigatórios")
        }
        await ProprietarioService.createProprietario(proprietario);
        res.send(proprietario);
        logger.info(`POST /proprietario - ${JSON.stringify(proprietario)}`)
    } catch (error) {
        next(error);
    }
}

async function updateProprietario(req, res, next) {
    try {
        let proprietario = req.body;
        if (!proprietario.proprietarioId || !proprietario.nome || !proprietario.telefone) {
            throw new Error("Proprietario ID, Nome e telefone são obrigatórios")
        }
        proprietario = await ProprietarioService.updateProprietario(proprietario);
        res.send(proprietario);
        logger.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
    } catch (error) {
        next(error);
    }
}

async function deleteProprietario(req, res, next) {
    try {
        await ProprietarioService.deleteProprietario(req.params.id);
        res.end();
        logger.info(`DELETE /proprietario Id: ${req.params.id}`)
    } catch (error) {
        next(error);
    }
}

async function getProprietarios(req, res, next) {
    try {
        res.send(await ProprietarioService.getProprietarios());
        logger.info(`GET /proprietario`);
    } catch (error) {
        next(error);
    }
}

async function getProprietarioById(req, res, next) {
    try {
        res.send(await ProprietarioService.getProprietarioById(req.params.id));
        logger.info(`GET /proprietario Id: ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}


export default {
    createProprietario,
    updateProprietario,
    deleteProprietario,
    getProprietarios,
    getProprietarioById
}