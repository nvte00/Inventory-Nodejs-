const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const db = require("./app/index.js");
const Product = db.product;
const Export = db.export;
const ExportProduct = db.export_product;

const app = express();
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});
/////////////////////////////////
require("./router/router.product")(app);
require('./router/router.export')(app);
require('./router/router.import')(app);




// set port, listen for requestst
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
