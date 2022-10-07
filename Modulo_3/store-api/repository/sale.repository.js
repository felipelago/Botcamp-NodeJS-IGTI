import connect from './db.js';
import Sale from "../models/sale.model.js"
import Product from "../models/product.model.js"
import Client from "../models/client.model.js"

async function createSale(sale) {
    try {
        return await Sale.create(sale);
    } catch (err) {
        throw err
    }
}

async function getSales() {
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Product //Assim quando for puxar as vendas, o product relacionado ao productId vai vim junto listado(ele vai incluir a relação de product, isso só funciona se a tabela tiver relação)
                },
                {
                    model: Client
                }
            ]
        });
    } catch (err) {
        throw err
    }

}

async function getSalesByProductId(productId) {
    try {
        return await Sale.findAll({
            where: {
                productId: productId //onde productId(no banco de dados) é igual ao productId(recebendo como parametro)
            },
            include: [
                {
                    model: Client
                }
            ]
        })
    } catch (err) {
        throw err;
    }
}

async function getSalesBySupplierId(supplierId){
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Product,
                    where: {
                        supplierId: supplierId
                    }
                }
            ]
        })
    } catch (err) {
        throw err;
    }
}

async function getSale(id) {
    try {
        return await Sale.findByPk(id);
    } catch (err) {
        throw (err)
    }
}

async function updateSale(sale) {
    try {
        await Sale.update(
            {
                value: sale.value, //Caso queira selecionar quais campos quer fazer update, caso queira atualizar tudo é só passar o sale como primeiro parametro e não um objeto como esse
                date: sale.date,
                clientId: sale.clientId
            },
            {
                where: {
                    saleId: sale.saleId
                }
            }
        )
        return await getSale(sale.saleId)
    } catch (err) {
        throw (err)
    }
}

async function deleteSale(id) {
    try {
        await Sale.destroy({
            where: {
                saleId: id
            }
        });
    } catch (err) {
        throw (err)
    }

}

export default {
    createSale,
    getSales,
    getSale,
    updateSale,
    deleteSale,
    getSalesByProductId,
    getSalesBySupplierId
}