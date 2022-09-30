import productRepository from "../repository/product.repository.js"
import supplierRepository from "../repository/supplier.repository.js"

async function createProduct(product) {
    if (await supplierRepository.getSupplier(product.supplier_id)) {
        return await productRepository.createProduct(product)
    }
    throw new Error("O supplier_id não existe")

}

async function getProducts() {
    return await productRepository.getProducts();
}

async function getProduct(id) {
    return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
    await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (await supplierRepository.getSupplier(product.supplier_id)) {
        await productRepository.updateProduct(product);
    }
    throw new Error("O supplier_id não existe");
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}