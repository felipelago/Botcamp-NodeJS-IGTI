import ServicoRepository from "../repository/servico.repository.js";

async function createServico(servico) {
    return await ServicoRepository.createServico(servico);
}

async function updateServico(servico) {
    return await ServicoRepository.updateServico(servico);
}

async function deleteServico(id) {
    await ServicoRepository.deleteServico(id);
}

async function getServicos() {
    return await ServicoRepository.getServicos();
}

async function getServicoById(id) {
    return await ServicoRepository.getServicoById(id);
}


export default {
    createServico,
    updateServico,
    deleteServico,
    getServicos,
    getServicoById
}