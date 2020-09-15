
module.exports = app => {
    const imports = require("../controller/controller.import.js");

    var router = require("express").Router();

    router.post("/", imports.createApi);


    router.get("/find", imports.findAllApi);

    router.get("/find/:id", imports.findOneApi);

    router.put("/update/:id", imports.updateApi);

    router.delete("/delete/:id", imports.deleteApi);
    

    app.use('/api/imports', router);
};