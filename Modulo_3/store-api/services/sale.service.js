import saleRepository from "../repository/sale.repository.js"
import clientRepository from "../repository/client.repository.js"
import productRepository from "../repository/product.repository.js"

async function createSale(sale) {
    let error = "";
    if (!await clientRepository.getClient(sale.clientId)) {
        error = ("O Client ID não existe\n")
    }
    const product = await productRepository.getProduct(sale.productId)
    if (!product) {
        error += ("O Product ID não existe")
    }
    if (error) {
        throw new Error(error);
    }
    if (product.stock > 0) {
         sale = await saleRepository.createSale(sale)
        product.stock--;
        await productRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error("Não tem estoque deste produto")
    }
}

async function getSales(productId, supplierId) {
    if (productId){ //Se passar algo como parametro ele vai procurar pelo productId, se não puxa tudo
        return await saleRepository.getSalesByProductId(productId)
    }
    if(supplierId){
        return await saleRepository.getSalesBySupplierId(supplierId) //Caso o usuario passe como parametro o supplierid para retornar as vendas desse supplier
    }
    return await saleRepository.getSales();
}

async function getSale(id) {
    return await saleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await saleRepository.getSale(id);
    if(sale){
        const product = await productRepository.getProduct(sale.productId);
        await saleRepository.deleteSale(id);
        product.stock ++;
        await productRepository.updateProduct(product);
    }else{
        throw new Error("O id da venda informado não existe !")
    }
    
}

async function updateSale(sale) {
    let error = "";
    if (!await clientRepository.getClient(sale.clientId)) {
        error = ("O Client ID não existe. ")
    }
    const product = await productRepository.getProduct(sale.productId)
    if (!product) {
        error += ("O Product ID não existe. ")
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