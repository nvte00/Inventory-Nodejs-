var {  DataTypes } = require('sequelize');
 
 module.exports = (sequelize, Sequelize) => {
     const ImportProduct = sequelize.define("import_product", {
      import_amount: {
            type: DataTypes.INTEGER
        }
     }); 
     return ImportProduct;
 };