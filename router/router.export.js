
module.exports = app => {
    const exports = require("../controller/controller.export.js");

    var router = require("express").Router();

    router.post("/", exports.createApi);


    router.get("/find", exports.findAllApi);

    router.get("/find/:id", exports.findOneApi);

    router.put("/find/:id", exports.updateApi);

    router.delete("/delete/:id", exports.deleteApi);

    router.get("/get", exports.getExportedProductByMonth);




    // router.delete("/", tutorials.deleteAll);

    app.use('/api/exports', router);
};