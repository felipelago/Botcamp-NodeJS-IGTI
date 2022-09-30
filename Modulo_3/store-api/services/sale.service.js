import saleRepository from "../repository/sale.repository.js"
import clientRepository from "../repository/client.repository.js"
import productRepository from "../repository/product.repository.js"

async function createSale(sale) {
    let error = "";
    if (!await clientRepository.getClient(sale.client_id)) {
        error = ("O Client ID não existe\n")
    }
    const product = await productRepository.getProduct(sale.product_id)
    if (!product) {
        error += ("O Product ID não existe")
    }
    if (error) {
        throw new Error(error);
    }
    if (product.stock > 0) {
        sale = await saleRepository.saleCreate(sale)
        product.stock--;
        await productRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error("Não tem estoque deste produto")
    }
}

async function getSales() {
    return await saleRepository.getSales();
}

async function getSale(id) {
    return await saleRepository.getSale(id);
}

async function deleteSale(id) {
    await saleRepository.deleteSale(id);
}

async function updateSale(sale) {
    let error = "";
    if (!await clientRepository.getClient(sale.client_id)) {
        error = ("O Client ID não existe\n")
    }
    const product = await productRepository.getProduct(sale.product_id)
    if (!product) {
        error += ("O Product ID não existe")
    }
    if (error) {
        throw new Error(error);
    }
    await saleRepository.updateSale(sale);
}


export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale,
}