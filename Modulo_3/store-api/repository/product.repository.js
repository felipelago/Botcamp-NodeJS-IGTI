import { connect } from './db.js';

async function createProduct(product) {
    const conn = await connect();
    try {
        const sql = "INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *" //Não pode concatenar as variáveis diretamente pois é inseguro, é possível fazer sql injection
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id];
        const res = await conn.query(sql, values); //dessa forma vai garantir que execute como unico comando, para previnir que haja um SQL Injection (inserir querys falsas)
        return res.rows[0];
    } catch (err) {
        throw err
    } finally {
        conn.release();//Para liberar a conexão, sempre vai liberar, mesmo que aconteça erro no try
    }
}

async function getProducts() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products");
        return res.rows;
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function getProduct(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products WHERE product_id = $1", [id]);
        return res.rows[0]; //rows é onde é salvo os elementos puxado da DB, como está puxando somente um elemento, é posto [0] para retornar o primeiro elemento da lista
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function updateProduct(product) {
    const conn = await connect();
    try {
        const sql = "UPDATE products SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 WHERE product_id = $6 RETURNING *";
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id, product.product_id];
        const res = await conn.query(sql, values);
        return res.rows[0] //sempre que for retornar um elemento só, coloca rows[0], se for vários deixa rows
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

async function deleteProduct(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM products WHERE product_id = $1", [id]);
    } catch (err) {
        throw (err)
    } finally {
        conn.release()
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}