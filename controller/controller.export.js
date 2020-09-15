const db = require("../app");

const Product = db.product;
const Export = db.export;
const ExportProduct = db.export_product;
const Customer = db.customer;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

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
        customerId: req.body.customerId

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
            addproduct2(data.id, req.body.product_id, req.body.export_amount)
                .then((e) => {
                    console.log(JSON.stringify(e));
                })
                .then(() => {
                    Product.findByPk(req.body.product_id)
                        .then((p) => {
                            var modedAmount = p.amount - req.body.export_amount;
                            p.update(
                                { amount: modedAmount }
                            );
                            
                        })
                })

        })

        res.send(exports)

};


//////////////////////////////////
// Retrieve all product from the database.
exports.findAllApi = (req, res) => {
    const id = req.query.id;
    var condition = id ? { Id: { [Op.like]: `%${id}%` } } : null;

    Export.findAll({
        where: condition,
        include: [
            {
                model: Product,
                attributes: []
            },
            {
                model: Customer,
                attributes: []
            }
        ],
    })
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

    Export.findByPk(id, {
        include: [
            {
                model: Product
            },
            {
                model: Customer
            }
        ]
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
            console.log(num);
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



exports.getExportedProductByMonth = (req, res) => {
    var Month = req.body.month;
    var ps = new Set();
    var pid = [];
    sequelize.query(("select * from exports e join export_products ep on e.id=ep.exportId where Month(date) = " + Month + " and Year(date)= Year(CURDATE()) group by productId"), {
        model: Export,
        mapToModel: false
    }).then((e) => {

        e.forEach(element => {
            var p = JSON.parse(JSON.stringify(element));
            Export.findByPk(p.id).then(e => {
                ps.add(e);
            })
        });


    })
    setTimeout(() => {
        var p = [];
        for (var i of ps) {
            if (p.includes(i)) {

            } else {
                p.push(i);
            }

        }
        res.send(p);
    }, 200);
}

// exports.getProductResidue = (req, res) => {
//     sequelize.query(("SELECT * WHERE "))

// }