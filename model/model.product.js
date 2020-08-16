var { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        name: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        mfg: DataTypes.DATEONLY,
        exp: DataTypes.DATEONLY
    });

    return Product;
};