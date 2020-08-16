const db = require("./app");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    run();
  });

  const run = async ()=>{
      ////
  }