import AnimalRepository from "../repository/animal.repository.js";

async function createAnimal(animal) {
    return await AnimalRepository.createAnimal(animal);
}

async function updateAnimal(animal) {
    return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(id) {
    await AnimalRepository.deleteAnimal(id);
}

async function getAnimals() {
    return await AnimalRepository.getAnimals();
}

async function getAnimalById(id) {
    return await AnimalRepository.getAnimalById(id);
}


export default {
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimals,
    getAnimalById
}