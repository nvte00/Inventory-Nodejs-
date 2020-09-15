const ImportController = require('./controller/controller.import')
const db = require("./app");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    run();
  });

  const run = async ()=>{
     await  ImportController.createApi("1","1",10000);
     console.log()
  }