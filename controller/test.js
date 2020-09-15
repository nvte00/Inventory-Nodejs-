// exports.createApi = (req, res) => {
//     const product_id = req.body.product_id;
//     const amount = req.body.import_amount;
//     const imports = {
//         id: req.body.id,
//         date: req.body.date,
//         price: req.body.price,
//         suplierId: req.body.suplierId

//     };
  
//     if (!req.body.id) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
//     // Save  in the database
//    try{
//     Import.create(imports)
//         .then(data => {
//             addproduct2(data.id, req.body.product_id, req.body.import_amount)
//                 .then((e) => {
//                     console.log(JSON.stringify(e));
//                 })
//                 .then(() => {
//                     Product.findByPk(req.body.product_id)
//                         .then((p) => {
//                             var modelAmount = p.amount + req.body.import_amount;
//                             p.update(
//                                 { amount: modelAmount }
//                             )
//                         })
//                 })

//         })
    
//     res.send(imports)

// };