import Sequelize from 'sequelize';
import db from '../repository/db.js';

const Supplier = db.define('suppliers', {
    supplierId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,   
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    { underscored: true }); //nas querys foi utilizado "_" mas o sequelize só utiliza o camelcase (minusculo e maisculo), o underscored vai fazer o mapeamento do novo padrão no antigo("_")


export default Supplier;