const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const ExportProduct = sequelize.define("export_product", {
        export_amount: {
            type: DataTypes.INTEGER
        }
    });
    return ExportProduct;
};