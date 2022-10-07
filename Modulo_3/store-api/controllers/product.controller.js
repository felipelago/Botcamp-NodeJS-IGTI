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
        if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("ProductId, Name, description, value, stock e supplier id são obrigatórios");
        }
        product = await productService.updateProduct(product)
        res.send(product);
        logger.info(`UPDATE /product - ${JSON.stringify(product)}`)
    } catch (err) {
        next(err)
    }
}

async function createProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId){
            throw new Error("Product ID é obrigatório.")
        }
        await productService.createProductInfo(productInfo);
        res.end();
        logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`)
    } catch (err) {
     throw err;   
    }
}

async function updateProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId){
            throw new Error("Product ID é obrigatório.")
        }
        await productService.updateProductInfo(productInfo);
        res.end();
        logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`)
    } catch (err) {
     throw err;   
    }
}

async function createReview(req, res, next) {
    try {
        let params = req.body;
        if(!params.productId || !params.review){
            throw new Error("Product Id e Review são obrigatórios");
        }
        await productService.createReview(params.review, params.productId);
        res.end();
        logger.info(`POST /product/review - ${JSON.stringify(productInfo)}`)
    } catch (err) {
        throw err;
    }
}

async function deleteReview(req, res, next) {
    try {
        await productService.deleteReview(req.params.id, req.params.index);
        res.end();
        logger.info(`DELETE /product/${req.params.id}/review/${req.params.index}`)
    } catch (err) {
        throw err;
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview
}