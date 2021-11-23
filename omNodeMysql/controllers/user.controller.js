const mysql = require('mysql');
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    // const kayttaja_tunnus = req.body.kayttaja_tunnus;
    // const kayttaja_sahkoposti = req.body.kayttaja_sahkoposti;
    // const kayttaja_salasana = req.body.kayttaja_salasana;
    // const kayttaja_salasana_varmistus = req.body.kayttaja_salasana_varmistus;

    const {
        kayttaja_tunnus,
        kayttaja_sahkoposti,
        kayttaja_salasana,
        kayttaja_salasana_varmistus,
    } = req.body;

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

            let hashedPassword = await bcrypt.hash(kayttaja_salasana, 8);

            db.query(
                "INSERT INTO kayttajat SET ?",
                {
                    kayttaja_tunnus: kayttaja_tunnus,
                    kayttaja_sahkoposti: kayttaja_sahkoposti,
                    kayttaja_salasana: hashedPassword
                },
                (error, results) => {
                    if (error) {
                        console.log("Error in query: " + error);
                    } else {
                        return res.status(200).render('register', {
                            message: "User registered!",
                        });
                    }
                }
            );
        }
    );
}
