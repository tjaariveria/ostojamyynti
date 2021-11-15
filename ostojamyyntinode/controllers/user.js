const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

// Register User
exports.register = (req, res) => {
    const {
        kayttaja_tunnus,
        kayttaja_sahkoposti,
        kayttaja_salasana,
        kayttaja_salasana_varmistus,
    } = req.body;

    // Query to check if provided email is already in use 
    db.query(
        "SELECT kayttaja_sahkoposti FROM kayttajat WHERE kayttaja_sahkoposti = ?",
        [kayttaja_sahkoposti],
        async (error, results) => {
            if (error) {
                console.log("Error in query: " + error);
            }
            if (results.length > 0) {
                return res.render("register", {
                    message: "Email is already in use!",
                });
            } else if (kayttaja_salasana !== kayttaja_salasana_varmistus) {
                return res.render("register", {
                    message: "Passwords do not match!",
                });
            }
            // Crypting password with bcrypt
            let hashedPassword = await bcrypt.hash(kayttaja_salasana, 8);

            // Query to set new user in to database
            db.query(
                "INSERT INTO kayttajat SET ?",
                {
                    kayttaja_tunnus: kayttaja_tunnus,
                    kayttaja_sahkoposti: kayttaja_sahkoposti,
                    kayttaja_salasana: hashedPassword,
                },
                (error, results) => {
                    if (error) {
                        console.log("Error in query: " + error);
                    } else {
                        console.log("Result from register: " + results);
                        return res.status(200).render("register", {
                            message: "User registered!",
                        });
                    }
                }
            );
        }
    );
};

// Edit User
exports.editUser = async (req, res, next) => {
    const { kayttaja_id } = req.body;
    try {
        db.query(
            "SELECT * FROM kayttajat WHERE kayttaja_id = ?",
            [kayttaja_id],
            async (error, results) => {
                req.editUser = results;
                next();
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// Update User
exports.updateUser = async (req, res, next) => {
    const { kayttaja_tunnus, kayttaja_sahkoposti } = req.body;
    try {
        db.query(
            "UPDATE kayttajat SET kayttaja_tunnus = ?, kayttaja_sahkoposti = ? WHERE kayttaja_id = ?",
            [kayttaja_tunnus, kayttaja_sahkoposti, req.params.id],
            async (error, results) => {
                res.status(200).redirect('/profile');
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// List Users
exports.listUsers = async (req, res, next) => {
    try {
        db.query("SELECT * FROM kayttajat", async (error, results) => {
            req.users = results;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
    try {
        db.query(
            "DELETE FROM kayttajat WHERE kayttaja_id = ?",
            [req.params.id],
            async (error, results) => {
                console.log(results)
                res.redirect("/admin");
                next();
            }
        );
    } catch (error) {
        console.log(error);
    }
};