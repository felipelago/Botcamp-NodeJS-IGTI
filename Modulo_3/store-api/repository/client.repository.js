import { connect } from './db.js';

async function createClient(client) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO clients (name, cpf, phone, email, adress) VALUES ($1, $2, $3, $4, $5) RETURNING *" //Não pode concatenar as variáveis diretamente pois é inseguro, é possível fazer sql injection
        const values = [client.name, client.cpf, client.phone, client.email, client.adress];
        const res = await conn.query(sql, values); //dessa forma vai garantir que execute como unico comando, para previnir que haja um SQL Injection (inserir querys falsas)
        return res.rows[0];
    } catch (err) {
        throw err
    } finally {
        conn.release();//Para liberar a conexão, sempre vai liberar, mesmo que aconteça erro no try
    }
}

async function getClients() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients");
        return res.rows;
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function getClient(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients WHERE client_id = $1", [id]);
        return res.rows[0]; //rows é onde é salvo os elementos puxado da DB, como está puxando somente um elemento, é posto [0] para retornar o primeiro elemento da lista
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function updateClient(client) {
    const conn = await connect();
    try {
        const sql = "UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, adress = $5 WHERE client_id = $6 RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.adress, client.client_id];
        const res = await conn.query(sql, values);
        return res.rows[0] //sempre que for retornar um elemento só, coloca rows[0], se for vários deixa rows
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function deleteClient(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM clients WHERE client_id = $1", [id]);
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}