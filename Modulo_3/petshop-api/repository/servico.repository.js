import Servico from "../models/servico.model.js";

async function createServico(servico) {
    try {
        return await Servico.create(servico);
    } catch (error) {
        throw error;
    }
}

async function updateServico(servico) {
    try {
        await Servico.update(servico, {
            where: {
                servicoId: servico.servicoId
            }
        });
        return await getServicoById(servico.servicoId)
    } catch (error) {
        throw error;
    }
}

async function deleteServico(id) {
    try {
        await Servico.destroy({
            where: {
                servicoId: id
            }
        })
    } catch (error) {
        throw error;
    }
}

async function getServicos() {
    try {
        return await Servico.findAll({
            include: [
                { model: Animal }
            ]
        });
    } catch (error) {
        throw error;
    }
}

async function getServicoById(id) {
    try {
        return await Servico.findByPk(id);
    } catch (error) {
        throw error;
    }
}


export default {
    createServico,
    updateServico,
    deleteServico,
    getServicos,
    getServicoById,
}