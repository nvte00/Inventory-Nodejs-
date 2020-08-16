var { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Export = sequelize.define("export", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        date: DataTypes.DATEONLY,
        price: DataTypes.DOUBLE,
        status: DataTypes.STRING

    });

    return Export;
};