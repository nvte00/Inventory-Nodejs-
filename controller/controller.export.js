const db = require("../app");
const Product = db.product;
const Export = db.export;
const ExportProduct = db.export_product;
const Sequelize = db.Sequelize;

const Op = db.Sequelize.Op;

function addproduct(export_id, product_id, amount) {
    return Export.findByPk(export_id)
        .then((exports) => {
            if (!exports) {
                console.log("export not found!");
                return null;
            }
            return Product.findByPk(product_id).then((product) => {
                if (!product) {
                    console.log("product not found!");
                    return null;
                }

                exports.addProduct(product);

                console.log(`>> added product id=${product.id} to export id=${exports.name}`);
                return exports;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding: ", err);
        });
}

//add2
function addproduct2(export_id, product_id, amount) {
    return new Promise((resolve, reject) => {
        ExportProduct.create({
            exportId: export_id,
            productId: product_id,
            export_amount: amount
        }).then(e => {
            resolve(e);
        })

    })
}


// each export update amount of product
exports.createApi = (req, res) => {
    const product_id = req.body.product_id;
    const amount = req.body.export_amount;
    const exports = {
        id: req.body.id,
        date: req.body.date,
        price: req.body.price,
        status: req.body.status,

    };
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Save  in the database
    Export.create(exports)
        .then(data => {
            // addproduct(data.id, product_id).then(()=>{console.log(123123123);})
            addproduct2(data.id, req.body.product_id, req.body.export_amount).then((e) => {
                console.log(JSON.stringify(e));
            })

        })
        .then(() => {
            Product.findByPk(req.body.product_id).then(pro => {
                const amountUpdate = pro.amount - amount;
                pro.update({ amount: amountUpdate });
            })
        })
    res.send(exports)

};


//////////////////////////////////
// Retrieve all product from the database.
exports.findAllApi = (req, res) => {
    const id = req.query.id;
    var condition = id ? { Id: { [Op.like]: `%${id}%` } } : null;

    Export.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred!!!!!! lizzzzzzzz"
            });
        });

};
/////////////////////

exports.findOneApi = (req, res) => {
    const id = req.params.id;

    Export.findByPk(id)
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

    Export.update(req.body, {
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

    Export.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot deletewith id= ${id}. Maybe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete with id = " + id
            });
        });
};



//////////report api ///////
///all/////
exports.reportExport = (req, res) => {
    Export.findAll({
        where: {
            date: {
                [Op.lte]: Sequelize.literal('NOW()'),///get date less and equal than date now
            }
        },
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
exports.reportOnDayExport = (req, res) => {
    Export.findAll({
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