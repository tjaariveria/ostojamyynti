const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

// Database connection configuration
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Settings for fileupload
app.use(fileUpload());

// const publicDirectory = path.join(__dirname, './public');
// app.use(express.static(publicDirectory));

// Parsing middleware
// Parse application/x-www-fomr-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// CookieParser
app.use(cookieParser());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: require('./helpers/handlebars-helpers')
}));

// View Engine
app.set('view engine', 'hbs');

// Connect to Database
db.connect( (error) => {
    if(error) {
        console.log("Connection error: " + error);
    } else {
        console.log("Connected to database");
    }
});

// Require routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register')); 

// Listening port 3030
app.listen(3030, () => {
    console.log("Server started on port 3030")
});
