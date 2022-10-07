import Sequelize from 'sequelize';
import db from '../repository/db.js';
import Supplier from './supplier.model.js';

const Product = db.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},
    { underscored: true }); //nas querys foi utilizado "_" mas o sequelize só utiliza o camelcase (minusculo e maisculo), o underscored vai fazer o mapeamento do novo padrão no antigo("_")

Product.belongsTo(Supplier, { foreignKey: "supplierId" });  //belongsTo é a função do sequelize para definir a chave estrangeira

export default Product;