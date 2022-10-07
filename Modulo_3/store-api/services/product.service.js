import productRepository from "../repository/product.repository.js"
import supplierRepository from "../repository/supplier.repository.js"
import saleRepository from "../repository/sale.repository.js"
import productInfoRepository from "../repository/productInfo.repository.js"

async function createProduct(product) {
    if (await supplierRepository.getSupplier(product.supplierId)) {
        return await productRepository.createProduct(product)
    }
    throw new Error("O supplier_id não existe")

}

async function getProducts() {
    return await productRepository.getProducts();
}

async function getProduct(id) {
    const product = await productRepository.getProduct(id);
    product.info = await productInfoRepository.getProductInfo(parseInt(id))
    return product;
}

async function deleteProduct(id) {
    const sales = saleRepository.getSale(id)
    if (sales.length > 0) {
        throw new Error("Não é possível excluir o produto pois existem vendas")
    }
    await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (await supplierRepository.getSupplier(product.supplierId)) {
        await productRepository.updateProduct(product);
    }
    throw new Error("O supplier_id não existe");
}

async function createProductInfo(productInfo) {
    await productInfoRepository.createProductInfo(productInfo)
}

async function updateProductInfo(productInfo) {
    await productInfoRepository.updateProductInfo(productInfo)
}

async function getProductInfo(id) {
    const product = await productRepository.getProduct(id)
    product.info = await productInfoRepository.getProductInfo(parseInt(id))
    return product;
}

async function createReview(review, productId){
    await productInfoRepository.createReview(review, productId)
}

async function deleteReview(productId, index){
    await productInfoRepository.deleteReview(parseInt(productId), index)
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    getProductInfo,
    createReview,
    deleteReview

}