import Sequelize from 'sequelize';
import db from '../repository/db.js';
import Client from './client.model.js';
import Product from './product.model.js';

const Sale = db.define('sales', {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
},
    { underscored: true }); //nas querys foi utilizado "_" mas o sequelize só utiliza o camelcase (minusculo e maisculo), o underscored vai fazer o mapeamento do novo padrão no antigo("_")

Sale.belongsTo(Client, { foreignKey: "clientId" });  //belongsTo é a função do sequelize para definir a chave estrangeira
Sale.belongsTo(Product, { foreignKey: "productId" });

export default Sale;