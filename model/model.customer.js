

const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING

    });

    return Customer;
}