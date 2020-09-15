const db = require("../app/index");
const Product = db.product;
const Import = db.import;
const ImportProduct = db.import_product;
const Suplier = db.suplier;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;


function addproduct(import_id, product_id, amount) {
    return Import.findByPk(export_id)
        .then((imports) => {
            if (!imports) {
                console.log("export not found!");
                return null;
            }
            return Product.findByPk(product_id).then((product) => {
                if (!product) {
                    console.log("product not found!");
                    return null;
                }

                exports.addProduct(product, { through: { import_amount: amount } });

                console.log(`>> added product id=${product.id} to export id=${imports.name}`);
                return imports;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding: ", err);
        });
}




function addproduct2(import_id, product_id, amount) {
    return new Promise((resolve, reject) => {
        ImportProduct.create({
            importId: import_id,
            productId: product_id,
            import_amount: amount
        })
    }).then(e => {
        resolve(e);
    }
    )
};


// each import update amount of product
exports.createApi = (req, res) => {
    const product_id = req.body.product_id;
    const amount = req.body.import_amount;
    const imports = {
        id: req.body.id,
        date: req.body.date,
        price: req.body.price,
        suplierId: req.body.suplierId

    };
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Save  in the database
    setTimeout(() => {
        Import.create(imports)
            .then(data => {
                addproduct2(data.id, req.body.product_id, req.body.import_amount)
                    .then((e) => {
                        console.log(JSON.stringify(e));
                    })
                    .then(() => {
                        Product.findByPk(req.body.product_id)
                            .then((p) => {
                                var modelAmount = p.amount + req.body.import_amount;
                                p.update(
                                    { amount: modelAmount }
                                );
                                res.send(imports)
                            })

                    });

            })
    }, 500);





};

//////////////////////////////////
// Retrieve all product from the database.
exports.findAllApi = (req, res) => {
    const id = req.query.id;
    var condition = id ? { Id: { [Op.like]: `%${id}%` } } : null;

    Import.findAll({
        where: condition,
        include: [
            {
                model: Product
            },
            {
                model: Suplier
            }
        ],

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred!!!!!! "
            });
        });

};
/////////////////////

exports.findOneApi = (req, res) => {
    const id = req.params.id;

    Import.findByPk(id, {
        include: [
            {
                model: Product
            },
            {
                model: Suplier
            }
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
};
////////////////////////////////////

exports.updateApi = (req, res) => {
    const id = req.params.id;

    Import.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update  with id= ${id}. Maybe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating with id=" + id
            });
        });
};


exports.deleteApi = (req, res) => {
    const id = req.params.id;

    Import.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete with id= ${id}. Maybe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete with id = " + id
            });
        });
};
////////report APi//////////////////
///get All import sort date desc
exports.reportImport = (req, res) => {
    Import.findAll({
        // where: {
        //   date: {
        //     [Op.lte]: Sequelize.literal('NOW()'),///get date less and equal than date now
        //   }
        // },
        order: [
            ['date', 'DESC'],
            // ['id', 'DESC']  
        ],
        include: [
            {
                model: Product,
                through: {
                    attributes: [],
                }
            },
        ],

    }).then(data => {
        res.send(data);
        return data;
    }).catch(err => {
        res.status(500).send({
            message: "Have error: " + err
        });
    })
}

//////on current day//////
exports.reportOnDayImport = (req, res) => {
    Import.findAll({
        where: {
            date: {
                [Op.eq]: Sequelize.literal('NOW()'),///get date less and equal than date now
            }
        },
        order: [
            ['date', 'ASC'],
            // ['id', 'DESC']  
        ],
        include: [
            {
                model: Product,
                through: {
                    attributes: [],
                }
            },
        ],

    }).then(data => {
        res.send(data);
        return data;
    }).catch(err => {
        res.status(500).send({
            message: "Have error: " + err
        });
    })
}
