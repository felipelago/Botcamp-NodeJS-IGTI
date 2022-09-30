import productService from "../services/product.service.js"

async function createProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplier_id) {
            throw new Error("Name, description, value, stock e supplier_id são obrigatórios");
        }
        product = await productService.createProduct(product)
        res.send(product);
        logger.info(`POST /product - ${JSON.stringify(product)}`)
    } catch (err) {
        next(err)
    }
}

async function getProducts(req, res, next) {
    try {
        res.send(await productService.getProducts());
        logger.info(`GET /products`);
    } catch (err) {
        next(err)
    }
}

async function getProduct(req, res, next) {
    try {
        res.send(await productService.getProduct(req.params.id));
        logger.info(`GET /product Id: ${req.params.id}`);
    } catch (err) {
        next(err)
    }
}

async function deleteProduct(req, res, next) {
    try {
        await productService.deleteProduct(req.params.id);
        res.end();
        logger.info(`DELETE /product Id: ${req.params.id}`);
    } catch (err) {
        next(err)
    }
}

async function updateProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplier_id) {
            throw new Error("Name, description, value, stock e supplier_id são obrigatórios");
        }
        product = await productService.updateProduct(product)
        res.send(product);
        logger.info(`UPDATE /product - ${JSON.stringify(product)}`)
    } catch (err) {
        next(err)
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}