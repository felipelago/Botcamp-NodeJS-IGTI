import { connect } from './db.js';

async function createSupplier(supplier) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO suppliers (name, cnpj, phone, email, adress) VALUES ($1, $2, $3, $4, $5) RETURNING *" //Não pode concatenar as variáveis diretamente pois é inseguro, é possível fazer sql injection
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.adress];
        const res = await conn.query(sql, values); //dessa forma vai garantir que execute como unico comando, para previnir que haja um SQL Injection (inserir querys falsas)
        return res.rows[0];
    } catch (err) {
        throw err
    } finally {
        conn.release();//Para liberar a conexão, sempre vai liberar, mesmo que aconteça erro no try
    }
}

async function getSuppliers() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers");
        return res.rows;
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function getSupplier(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);
        return res.rows[0]; //rows é onde é salvo os elementos puxado da DB, como está puxando somente um elemento, é posto [0] para retornar o primeiro elemento da lista
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function updateSupplier(supplier) {
    const conn = await connect();
    try {
        const sql = "UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, adress = $5 WHERE supplier_id = $6 RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.adress, supplier.supplier_id];
        const res = await conn.query(sql, values);
        return res.rows[0] //sempre que for retornar um elemento só, coloca rows[0], se for vários deixa rows
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function deleteSupplier(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}