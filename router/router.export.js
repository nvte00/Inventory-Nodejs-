
module.exports = app => {
    const exports = require("../controller/controller.export.js");

    var router = require("express").Router();

    router.post("/", exports.createApi);


    router.get("/", exports.findAllApi);

    router.get("/:id", exports.findOneApi);

    router.put("/:id", exports.updateApi);

    router.delete("/:id", exports.deleteApi);




    // router.delete("/", tutorials.deleteAll);

    app.use('/api/exports', router);
};