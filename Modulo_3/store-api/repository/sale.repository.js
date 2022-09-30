import { connect } from './db.js';

async function createSale(sale) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *" //Não pode concatenar as variáveis diretamente pois é inseguro, é possível fazer sql injection
        const values = [sale.value, sale.date, sale.client_id, sale.product_id];
        const res = await conn.query(sql, values); //dessa forma vai garantir que execute como unico comando, para previnir que haja um SQL Injection (inserir querys falsas)
        return res.rows[0];
    } catch (err) {
        throw err
    } finally {
        conn.release();//Para liberar a conexão, sempre vai liberar, mesmo que aconteça erro no try
    }
}

async function getSales() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales");
        return res.rows;
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function getSale(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales WHERE sale_id = $1", [id]);
        return res.rows[0]; //rows é onde é salvo os elementos puxado da DB, como está puxando somente um elemento, é posto [0] para retornar o primeiro elemento da lista
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function updateSale(sale) {
    const conn = await connect();
    try {
        const sql = "UPDATE sales SET value = $1, date = $2, client_id = $3, product_id = $4, sale_id= $5 RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.product_id, sale.sale_id];
        const res = await conn.query(sql, values);
        return res.rows[0] //sempre que for retornar um elemento só, coloca rows[0], se for vários deixa rows
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function deleteSale(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM sales WHERE sale_id = $1", [id]);
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

export default {
    createSale,
    getSales,
    getSale,
    updateSale,
    deleteSale
}