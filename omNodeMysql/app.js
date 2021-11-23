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

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API client)
app.use(express.json());

// Require routes
app.use('/', require('./routes/page.routes'));
app.use('/register', require('./routes/register.routes')); 

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
