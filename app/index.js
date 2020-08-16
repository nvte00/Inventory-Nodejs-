const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("../model/model.product")(sequelize, Sequelize);
db.export = require('../model/model.export')(sequelize, Sequelize);
db.export_product = require('../model/model.export_product')(sequelize, Sequelize);
db.import = require('../model/model.import')(sequelize, Sequelize);
db.import_product = require('../model/model.import_product')(sequelize, Sequelize);
db.customer = require('../model/model.customer')(sequelize, Sequelize);
db.suplier = require('../model/model.suplier')(sequelize, Sequelize);
db.user = require('../model/model.user')(sequelize, Sequelize);


//////association n:m product & export
db.product.belongsToMany(db.export, {
    through: db.export_product
});
db.export.belongsToMany(db.product, {
    through: db.export_product
});

///////assocation n:m product & import
db.product.belongsToMany(db.import, {
    through: db.import_product
});
db.import.belongsToMany(db.product, {
    through: db.import_product
});

///////assocition customer & export
db.customer.hasMany(db.export);
db.export.belongTo(db.customer);

//association suplier & import
db.suplier.hasMany(db.import);
db.import.belongTo(db.suplier);

module.exports = db;
