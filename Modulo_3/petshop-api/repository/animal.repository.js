import Animal from "../models/animal.model.js";
import Proprietario from "../models/proprietario.model.js";

async function createAnimal(animal) {
    try {
        return await Animal.create(animal);
    } catch (error) {
        throw error;
    }
}

async function updateAnimal(animal) {
    try {
        await Animal.update(animal, {
            where: {
                animalId: animal.animalId
            }
        });
        return await getAnimalById(animal.animalId)
    } catch (error) {
        throw error;
    }
}

async function deleteAnimal(id) {
    try {
        await Animal.destroy({
            where:{
                animalId: id
            }
        })
    } catch (error) {
        throw error;
    }
}

async function getAnimals() {
    try {
        return await Animal.findAll({
            include: [
                {model: Proprietario}
            ]
        });
    } catch (error) {
        throw error;
    }
}

async function getAnimalById(id) {
    try {
        return await Animal.findByPk(id);
    } catch (error) {
        throw error;
    }
}

async function getAnimalByProprietarioId(id){
    try {
        return await Animal.findAll({
            where:{
                proprietarioId: id
            }
        })
    } catch (error) {
        throw error;
    }
}

export default {
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimals,
    getAnimalById,
    getAnimalByProprietarioId
}