import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';
import db from '../app';

const { sign } = jwt;
const { compare } = bcrypt;




// Login authentication
const login = async (req, res) => {
    try {
        const { kayttaja_sahkoposti, kayttaja_salasana } = req.body;

        if (!kayttaja_sahkoposti || !kayttaja_salasana) {
            return res.status(400).render('login', {
                message: "Anna käyttäjätunnus ja/tai salasana!",
            });
        }
        db.query(
            "SELECT * FROM kayttajat WHERE kayttaja_sahkoposti = ?",
            [kayttaja_sahkoposti],
            async (error, results) => {
                console.log(kayttaja_sahkoposti)
                console.log(results)
                if (
                    !results ||
                    !(await compare(
                        kayttaja_salasana,
                        results[0].kayttaja_salasana
                    ))
                ) {
                    res.status(401).render('login', {
                        message: "Väärä sähköposti tai salasana!",
                    });
                } else {
                    const id = results[0].kayttaja_id;
                    const token = sign({ id }, process.env.JWT_SECRET, {
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

// Check if user is logged in
const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            //Check if user exist
            db.query(
                "SELECT * FROM kayttajat WHERE kayttaja_id = ?",
                [decoded.id],
                (error, results) => {
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    return next();
                }
            );
        } catch (error) {
            console.log("Error in login query: " + error);
            return next();
        }
    } else {
        next();
    }
};

export default login;
export { isLoggedIn };