import supplierService from "../services/supplier.service.js"

async function createSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.adress) {
            throw new Error("Name, CNPJ, Phone, Email e Adress são obrigatórios");
        }
        supplier = await supplierService.createSupplier(supplier)
        res.send(supplier);
        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`)
    } catch (err) {
        next(err)
    }
}

async function getSuppliers(req, res, next) {
    try {
        res.send(await supplierService.getSuppliers());
        logger.info(`GET /suppliers`);
    } catch (err) {
        next(err)
    }
}

async function getSupplier(req, res, next) {
    try {
        res.send(await supplierService.getSupplier(req.params.id));
        logger.info(`GET /supplier Id: ${req.params.id}`);
    } catch (err) {
        next(err)
    }
}

async function deleteSupplier(req, res, next) {
    try {
        await supplierService.deleteSupplier(req.params.id);
        res.end();
        logger.info(`DELETE /supplier Id: ${req.params.id}`);
    } catch (err) {
        next(err)
    }
}

async function updateSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (!supplier.supplier_id || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.adress) {
            throw new Error("Supplier ID, Name, CNPJ, Phone, Email e Adress são obrigatórios");
        }
        supplier = await supplierService.updateSupplier(supplier)
        res.send(supplier);
        logger.info(`UPDATE /supplier - ${JSON.stringify(supplier)}`)
    } catch (err) {
        next(err)
    }
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier,
}