import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function criarPedido(pedido) {
    const data = JSON.parse(await readFile("pedidos.json"));
    pedido = {
        id: data.nextId++,
        cliente: pedido.cliente,
        produto: pedido.produto,
        valor: pedido.valor,
        entregue: false,
        timestamp: new Date()
    }
    data.pedidos.push(pedido);
    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return pedido;
}

async function updatePedido(pedido) {
    const data = JSON.parse(await readFile("pedidos.json"));
    const index = data.pedidos.findIndex((a) => a.id === pedido.id);//finxIndex retorna -1 se não encontrar
    if (index === -1) {
        throw new Error("Registro não encontrado");
    }

    data.pedidos[index].cliente = pedido.cliente;
    data.pedidos[index].produto = pedido.produto;
    data.pedidos[index].valor = pedido.valor;
    data.pedidos[index].entregue = pedido.entregue;

    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

async function updateStatus(pedido) {
    const data = JSON.parse(await readFile("pedidos.json"));
    const index = data.pedidos.findIndex((a) => a.id === pedido.id);
    if (index === -1) {
        throw new Error("Registro não encontrado");
    }
    data.pedidos[index].entregue = pedido.entregue;
    await writeFile("pedidos.json", JSON.stringify(data, null, 2));

    return data.pedidos[index];

}

async function deletarPedido(id) {
    const data = JSON.parse(await readFile("pedidos.json"));
    data.pedidos = data.pedidos.filter((pedido) => pedido.id !== parseInt(id));
    await writeFile("pedidos.json", JSON.stringify(data, null, 2));
}

async function getPedidoId(id) {
    const data = JSON.parse(await readFile("pedidos.json"));
    const pedido = data.pedidos.find(pedido => pedido.id == parseInt(id));
    if (pedido) {
        return pedido;
    } else {
        throw new Error("Registro não encontrado")
    }
}


async function getPedidos() {
    const data = JSON.parse(await readFile("pedidos.json"));
    return data.pedidos;
}


export default {
    getPedidos,
    criarPedido,
    updatePedido,
    updateStatus,
    deletarPedido,
    getPedidoId,
    
}