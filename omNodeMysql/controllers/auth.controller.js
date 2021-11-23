const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirmed = req.body.passwordConfirmed;

    const { name, email, password, passwordConfirmed } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results => {
        if(error) {
            console.log(error);
        }
        if(results.lenght > 0) {
            return res.render('register', {
                message: 'Email is already in use!'
            })
        } else if (password !== passwordConfirmed) {
            return res.render('register', {
                message: 'Passwords do not match!'
            })
        }
    }))    
}
