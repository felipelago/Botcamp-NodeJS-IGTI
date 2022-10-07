//import pg from "pg";//Biblioteca responsável por fazer a conexão com o postgres (sem utilizar o sequelize (uma ORM do JS))
import Sequelize from "sequelize";


//Forma de conexão sem utilizar sequelize, utilizando a biblioteca pg e conectando direto (com as querys diretamente no repository)

// async function connect (){
//     if(global.connection){ //Vai verificar se já foi criado uma pool de conexão, se sim já retorna ela, isso existe para não criar várias poools de conexão toda vez que chamasse a função
//         return global.connection.connect();
//     }

//     const pool = new pg.Pool({ //ele gerencia as conexões, para não ter várias conexões abertas no Banco de dados
//         connectionString: "postgres://lauthwwe:HmSY5HFj9HyfyuZDzjnb8gpWj_kOhoKi@jelani.db.elephantsql.com/lauthwwe"
//     });
//     global.connection = pool;

//     return pool.connect();
// }

const sequelize = new Sequelize(
    "postgres://lauthwwe:HmSY5HFj9HyfyuZDzjnb8gpWj_kOhoKi@jelani.db.elephantsql.com/lauthwwe",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;