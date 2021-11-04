const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});



const app = express();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log("Connection error: " + error);
    } else {
        console.log("Connected to database");
    }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



   

app.listen(3030, () => {
    console.log("Server started on port 3030")
});
