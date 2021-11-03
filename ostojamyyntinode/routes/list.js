const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



exports.list = async (req, res) => {
    try {
        db.query('SELECT * FROM ilmoitukset', async (error,results) => {
            console.log("list.js: " + results);
        })
    } catch (error) {
        console.log(error)
    }
}
