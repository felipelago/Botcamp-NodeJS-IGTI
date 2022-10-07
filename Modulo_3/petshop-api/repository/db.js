import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgres://dtdnqhpx:bUsc9gDkftSQWTmxBPXBhObYPPJrD9HV@jelani.db.elephantsql.com/dtdnqhpx",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;