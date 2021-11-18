const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'ec2-13-48-195-46.eu-north-1.compute.amazonaws.com',
    user: 'root',
    password: 'my-new-password',
    database: 'ostojamyynti'
});

app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>")
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
