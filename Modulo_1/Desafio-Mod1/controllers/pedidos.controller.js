import pedidosService from "../services/pedidos.service.js"

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body;
        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Os campos de cliente, produto e valor são obrigatórios")
        }
        pedido = await pedidosService.criarPedido(pedido);
        res.send(pedido);
        logger.info(`POST /pedidos - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error);
    }
}

async function updatePedido(req, res, next) {
    try {
        const pedido = req.body;
        if (pedido.id == null || !pedido.cliente || !pedido.produto || pedido.valor == null || pedido.entregue == null) {
            throw new Error("Os campos de ID, Cliente, produto, valor e entregue são obrigatórios")
        }
        res.send(await pedidosService.updatePedido(pedido));
        logger.info(`PATCH /pedido/updatePedido - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error)
    }
}

async function updateStatus(req, res, next) {
    try {
        const pedido = req.body;
        if (!pedido.id || !pedido.entregue) {
            throw new Error("Campos ID e Status são obrigatórios")
        }
        if (pedido.entregue == true || pedido.entregue == false) {
            res.send(await pedidosService.updateStatus(pedido))
        } else {
            throw new Error("Status só pode ser preenchido true ou false")
        }
        logger.info(`PATCH /pedido/updateStatus - ${JSON.stringify(pedido)}`);
    } catch (error) {
        next(error)
    }
}

async function deletarPedido(req, res, next) { //Corrigir
    try {
        await pedidosService.deletarPedido(req.params.id);
        res.end();
        logger.info(`DELETE /pedidos/:id - ${req.params.id}`)
    } catch (error) {
        next(error)
    }
}

async function getPedidoId(req, res, next) {
    try {
        res.send(await pedidosService.getPedidoId(req.params.id))
        logger.info(`GET /pedidos/:id`);
    } catch (error) {
        next(error)
    }
}

async function totalCliente(req, res, next) {
    try {
        const nomeCliente = req.body.cliente;
        if(!nomeCliente){
            throw new Error("Cliente não informado")
        }
        res.send({totalCliente: await pedidosService.getTotalCliente(nomeCliente)})
        logger.info(`GET /pedidos/totalPedido`);
    } catch (error) {
        next(error)
    }
}

async function getValorTotalPedidos(req, res, next) {
    try {

        logger.info(`GET /pedidos`);
    } catch (error) {
        next(error)
    }
}

async function getMaisVendidos(req, res, next) {
    try {

        logger.info(`GET /pedidos`);
    } catch (error) {
        next(error)
    }
}

async function getPedidos(req, res, next) { //Funciona mas não retorna nada
    try {
        res.send(await pedidosService.getPedidos())
        logger.info(`GET /pedidos`);
    } catch (error) {
        next(error)
    }
}



export default {
    getPedidos,
    criarPedido,
    updatePedido,
    updateStatus,
    deletarPedido,
    getPedidoId,
    getValorTotalPedidos,
    totalCliente,
    getMaisVendidos
}