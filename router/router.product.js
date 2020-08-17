module.exports = app => {
    const product = require("../controller/controller.product.js");
  
    var router = require("express").Router();
  
    router.post("/", product.createApi);
  

    router.get("/", product.findAllApi);
   
    router.get("/:id", product.findOneApi);

    router.put("/:id", product.updateApi);
  
    router.delete("/:id", product.deleteApi);

    
  

  
    app.use('/api/products', router);
  };