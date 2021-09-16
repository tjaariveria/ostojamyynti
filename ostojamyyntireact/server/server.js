const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const mariadb = require("mariadb/callback");
// const conn = mariadb.createConnection({
//   host: "ec2-13-51-197-128.eu-north-1.compute.amazonaws.com",
//   user: "root",
//   password: "my-new-password",
//   database: "ostojamyynti",
// });
// conn.connect((err) => {
//   if (err) {
//     console.log("not connected due to error: " + err);
//   } else {
//     console.log("connected ! connection id is " + conn.threadId);
//   }
// });
