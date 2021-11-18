const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');

require('dotenv').config();

const app = express();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.use(express.static('public'));

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3030, () => {
    console.log("Server listening port 3030");
    db.connect( (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Connected to database");
        }
    });
});
