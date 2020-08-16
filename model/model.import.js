var { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Import = sequelize.define("import", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        date: DataTypes.DATEONLY,
        price: DataTypes.DOUBLE

    });
    return Import;
};