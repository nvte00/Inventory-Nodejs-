module.exports = app => {
    const product = require("../controller/controller.product.js");
  
    var router = require("express").Router();
  
    router.post("/", product.createApi);
  

    router.get("/find", product.findAllApi);
   
    router.get("/find/:id", product.findOneApi);

    router.put("/find/:id", product.updateApi);
  
    router.delete("/delete/:id", product.deleteApi);

    
  

  
    app.use('/api/products', router);
  };