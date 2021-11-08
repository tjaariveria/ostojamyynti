const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const exp = require("constants");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.login = async (req, res) => {
  try {
    const { kayttaja_sahkoposti, kayttaja_salasana } = req.body;

    if (!kayttaja_sahkoposti || !kayttaja_salasana) {
      return res.status(400).render("login", {
        message: "Please provide an email and/or password",
      });
    }
    db.query(
      "SELECT * FROM kayttajat WHERE kayttaja_sahkoposti = ?",
      [kayttaja_sahkoposti],
      async (error, results) => {
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(
            kayttaja_salasana,
            results[0].kayttaja_salasana
          ))
        ) {
          res.status(401).render("login", {
            message: "email or password is incorrect",
          });
        } else {
          const id = results[0].kayttaja_id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("the token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.register = (req, res) => {
  console.log(req.body);
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirmed = req.body.passwordConfirmed;

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
          kayttaja_salasana: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log("Error in query: " + error);
          } else {
            console.log("Result from register: " + results);
            return res.render("register", {
              message: "User registered!",
            });
          }
        }
      );
    }
  );
};

// exports.editAdvert = async (req, res) => {
//   try {
//     db.query("SELECT * FROM ilmoitukset WHERE ilmoitus_id = ?", [ilmoitus_id],  async (error, results) => {
//       req.list = results;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};

//Middlewares
exports.listItems = async (req, res, next) => {
  try {
    db.query("SELECT * FROM ilmoitukset", async (error, results) => {
      req.list = results;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

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

exports.listUserItems = async (req, res, next) => {
  try {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    db.query(
      "SELECT * FROM ilmoitukset WHERE ilmoittaja_id = ?",
      [decoded.id],
      async (error, results) => {
        req.list = results;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

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
      console.log("Error in lofin query: " + error);
      return next();
    }
  } else {
    next();
  }
};
