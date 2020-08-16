var { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const User  = sequelize.define("user", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
       
    });

    return User;
};