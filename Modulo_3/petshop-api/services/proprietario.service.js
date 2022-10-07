import ProprietarioRepository from "../repository/proprietario.repository.js";
import AnimalRepository from "../repository/animal.repository.js";

async function createProprietario(proprietario) {
    return await ProprietarioRepository.createProprietario(proprietario);
}

async function updateProprietario(proprietario) {
    return await ProprietarioRepository.updateProprietario(proprietario);
}

async function deleteProprietario(id) {
    const animal = await AnimalRepository.getAnimalByProprietarioId(id);
    if (animal.length > 0) {
        throw new Error("Não é possível excluir o proprietario pois existem animais vinculados")
    }
    await ProprietarioRepository.deleteProprietario(id);
}

async function getProprietarios() {
    return await ProprietarioRepository.getProprietarios();
}

async function getProprietarioById(id) {
    return await ProprietarioRepository.getProprietarioById(id);
}


export default {
    createProprietario,
    updateProprietario,
    deleteProprietario,
    getProprietarios,
    getProprietarioById
}