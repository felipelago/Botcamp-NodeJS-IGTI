import Client from '../models/client.model.js';

async function createClient(client) {
    try {
        return await Client.create(client);// somente está linha utilizando o sequelize faz exatamente tudo que as linhas abaixo faz(inclusive os values para evitar sql inject)
    } catch (err) {
        throw err
    }
    // const conn = await connect();
    // try {
    //     const sql = "INSERT INTO clients (name, cpf, phone, email, adress) VALUES ($1, $2, $3, $4, $5) RETURNING *" //Não pode concatenar as variáveis diretamente pois é inseguro, é possível fazer sql injection
    //     const values = [client.name, client.cpf, client.phone, client.email, client.adress];
    //     const res = await conn.query(sql, values); //dessa forma vai garantir que execute como unico comando, para previnir que haja um SQL Injection (inserir querys falsas)
    //     return res.rows[0];
    // } catch (err) {
    //     throw err
    // } finally {
    //     conn.release();//Para liberar a conexão, sempre vai liberar, mesmo que aconteça erro no try
    // }
}

async function getClients() {
    try {
        return await Client.findAll();
    } catch (err) {
        throw err;
    }
}

async function getClient(id) {
    try {
        return await Client.findByPk(id); //procurar pela primary key
    } catch (err) {
        throw err
    }
}

async function updateClient(client) {
    try {
        await Client.update(client, {
            where:{
                clientId: client.clientId
            }
        });
        return await getClient(client.clientId)
    } catch (err) {
        throw err;
    }
}

async function deleteClient(id) {
    try {
        await Client.destroy({
            where:{
                clientId: id
            }
        })
    } catch (err) {
        throw err;
    }
}

export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}