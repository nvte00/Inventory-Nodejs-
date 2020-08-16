module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "inventory",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  };