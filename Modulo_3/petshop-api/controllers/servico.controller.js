import ServicoService from "../services/servico.service.js";

async function createServico(req, res, next) {
    try {
        let servico = req.body;
        if (!servico.descricao || !servico.valor) {
            throw new Error("Descrição e valor são obrigatórios")
        }
        await ServicoService.createServico(servico);
        res.send(servico);
        logger.info(`POST /servico - ${JSON.stringify(servico)}`)
    } catch (error) {
        next(error);
    }
}

async function updateServico(req, res, next) {
    try {
        let servico = req.body;
        if (!servico.servicoId || !servico.descricao || !servico.valor) {
            throw new Error("Servico ID, descrição e valor são obrigatórios")
        }
        servico = await ServicoService.updateServico(servico);
        res.send(servico);
        logger.info(`PUT /servico - ${JSON.stringify(servico)}`);
    } catch (error) {
        next(error);
    }
}

async function deleteServico(req, res, next) {
    try {
        await ServicoService.deleteServico(req.params.id);
        res.end();
        logger.info(`DELETE /servico Id: ${req.params.id}`)
    } catch (error) {
        next(error);
    }
}

async function getServicos(req, res, next) {
    try {
        res.send(await ServicoService.getServicos());
        logger.info(`GET /servico`);
    } catch (error) {
        next(error);
    }
}

async function getServicoById(req, res, next) {
    try {
        res.send(await ServicoService.getServicoById(req.params.id));
        logger.info(`GET /servico Id: ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}


export default {
    createServico,
    updateServico,
    deleteServico,
    getServicos,
    getServicoById
}