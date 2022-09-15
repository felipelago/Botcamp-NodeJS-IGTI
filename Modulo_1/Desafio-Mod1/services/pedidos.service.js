import pedidosRepository from "../repositories/pedidos.repository.js"

async function criarPedido(pedido) {
    return await pedidosRepository.criarPedido(pedido);
}

async function updatePedido(pedido) {
    return await pedidosRepository.updatePedido(pedido);
}

async function updateStatus(pedido) {
    return await pedidosRepository.updateStatus(pedido)
}

async function deletarPedido(id) {
    return await pedidosRepository.deletarPedido(id);
}

async function getPedidoId(id) {
    return await pedidosRepository.getPedidoId(id);
}

async function getTotalCliente(nomeCliente) {
    const pedidos = await pedidosRepository.getPedidos();
    const total = pedidos
    .filter((p) => p.cliente === nomeCliente && p.entregue)
    .map((p) => p.valor)
    .reduce((prev, curr) => prev + curr, 0)
    
    return total;
}



async function getPedidos() {
    return await pedidosRepository.getPedidos();
}

export default {
    getPedidos,
    criarPedido,
    updatePedido,
    updateStatus,
    deletarPedido,
    getPedidoId,
    getTotalCliente,


}