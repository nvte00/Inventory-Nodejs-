const db = require("../app/index");
// const e = require("express");
const Product = db.product;
const Export = db.export;
const Op = db.Sequelize.Op;

// Create and Save 
exports.createApi = (req, res) => {
    const product = {
      id: req.body.id,
      name: req.body.name,
      amount: req.body.amount,
      mfg: req.body.mfg,
      exp: req.body.exp
  
    };
    // Validate request
    if (!product.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Save  in the database
    Product.create(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating ."
        });
      });
  };
  
  //////////////////////////////////
  // Retrieve all product from the database.
  exports.findAllApi = (req, res) => {
    const id = req.query.id;
    var condition = id ? { Id: { [Op.like]: `%${id}%` } } : null;
  
    Product.findAll({ where: condition })
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
  
    Product.findByPk(id)
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
  
    Product.update(req.body, {
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
  
    Product.destroy({
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
  //////
  exports.reportWarningAmount = (req,res)=>{
    var resultSet = [];
    var result = [];
    Product.findAll().then((e)=>{
      for(var i = 0 ; i< e.length;i++){
        resultSet.push(e[i]);
      }
    })
    .then(()=>{
      for(var i=0;i<resultSet.length;i++){
        if(resultSet[i].amount<70){
          result.push(resultSet[i]);
        }
      }
      res.send(result);
    })
  }
  
  