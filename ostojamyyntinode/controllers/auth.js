const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// Database connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Login authentication
exports.login = async (req, res) => {
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

// Logout and setting jwt to expire in 2 seconds after logout
exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};

// Check if user is logged in
exports.isLoggedIn = async (req, res, next) => {
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
