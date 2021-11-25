import db from '../app.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { kayttaja_sahkoposti, kayttaja_salasana } = req.body;

        if (!kayttaja_sahkoposti || !kayttaja_salasana) {
            return res.status(400).render('login', {
                message: "Please provide an email and/or password",
            });
        }
        db.query(
            "SELECT * FROM kayttajat WHERE kayttaja_sahkoposti = ?",
            [kayttaja_sahkoposti],
            async (error, results) => {
                if (
                    !results ||
                    !(await bcrypt.compare(
                        kayttaja_salasana,
                        results[0].kayttaja_salasana
                    ))
                ) {
                    res.status(401).render('login', {
                        message: "email or password is incorrect",
                    });
                } else {
                    const id = results[0].kayttaja_id;
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    };

                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect('/');
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export default login;