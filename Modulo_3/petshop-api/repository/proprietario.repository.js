import Proprietario from "../models/proprietario.model.js"
import Animal from "../models/animal.model.js"

async function createProprietario(proprietario) {
    try {
        return await Proprietario.create(proprietario);
    } catch (error) {
        throw error;
    }
}

async function updateProprietario(proprietario) {
    try {
        await Proprietario.update(proprietario, {
            where: {
                proprietarioId: proprietario.proprietarioId
            }
        });
        return await getProprietarioById(proprietario.proprietarioId)
    } catch (error) {
        throw error;
    }
}

async function deleteProprietario(id) {
    try {
        await Proprietario.destroy({
            where: {
                proprietarioId: id
            }
        })
    } catch (error) {
        throw error;
    }
}

async function getProprietarios() {
    try {
        return await Proprietario.findAll();
    } catch (error) {
        throw error;
    }
}

async function getProprietarioById(id) {
    try {
        return await Proprietario.findByPk(id);
    } catch (error) {
        throw error;
    }
}

export default {
    createProprietario,
    updateProprietario,
    deleteProprietario,
    getProprietarios,
    getProprietarioById
}