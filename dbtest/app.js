const express = require("express");
const mysq = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

const db = mysq.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected to database");
    }
})

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
});

app.listen(5050, () => {
    console.log("Server runing in port 5050");
});