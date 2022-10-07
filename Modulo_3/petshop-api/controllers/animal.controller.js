import AnimalService from "../services/animal.service.js";

async function createAnimal(req, res, next) {
    try {
        let animal = req.body;
        if (!animal.nome || !animal.telefone) {
            throw new Error("Nome e telefone são obrigatórios")
        }
        await AnimalService.createAnimal(animal);
        res.send(animal);
        logger.info(`POST /animal - ${JSON.stringify(animal)}`)
    } catch (error) {
        next(error);
    }
}

async function updateAnimal(req, res, next) {
    try {
        let animal = req.body;
        if (!animal.animalId || !animal.nome || !animal.telefone) {
            throw new Error("Animal ID, Nome e telefone são obrigatórios")
        }
        animal = await AnimalService.updateAnimal(animal);
        res.send(animal);
        logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
    } catch (error) {
        next(error);
    }
}

async function deleteAnimal(req, res, next) {
    try {
        await AnimalService.deleteAnimal(req.params.id);
        res.end();
        logger.info(`DELETE /animal Id: ${req.params.id}`)
    } catch (error) {
        next(error);
    }
}

async function getAnimals(req, res, next) {
    try {
        res.send(await AnimalService.getAnimals());
        logger.info(`GET /animal`);
    } catch (error) {
        next(error);
    }
}

async function getAnimalById(req, res, next) {
    try {
        res.send(await AnimalService.getAnimalById(req.params.id));
        logger.info(`GET /animal Id: ${req.params.id}`);
    } catch (error) {
        next(error);
    }
}


export default {
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimals,
    getAnimalById
}