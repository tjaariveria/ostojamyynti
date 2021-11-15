const mysql = require("mysql");
const jwt = require("jsonwebtoken");


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });




// Add Advert
exports.newAdvert = async (req, res, next) => {
  const { ilmoitus_laji, ilmoitus_nimi, ilmoitus_kuvaus } = req.body;
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );
  db.query(
    "INSERT INTO ilmoitukset SET ?",
    {
      ilmoitus_laji,
      ilmoitus_nimi,
      ilmoitus_kuvaus,
      ilmoitus_paivays: new Date(Date.now()),
      ilmoittaja_id: decoded.id,
    },
    (error, results) => {
      if (error) {
        console.log("Error in query: " + error);
      } else {
        res.redirect("/profile");
      }
    }
  );
};

// Edit Advert
exports.editAdvert = async (req, res, next) => {
  try {
    db.query(
      "SELECT * FROM ilmoitukset WHERE ilmoitus_id = ?",
      [req.params.id],
      async (error, results) => {
        req.advert = results[0];
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Update Advert
exports.updateAdvert = async (req, res, next) => {
  const { ilmoitus_kuvaus, ilmoitus_nimi } = req.body;
  try {
    db.query(
      "UPDATE ilmoitukset SET ilmoitus_kuvaus = ?, ilmoitus_nimi = ? WHERE ilmoitus_id = ?",
      [ilmoitus_kuvaus, ilmoitus_nimi, req.params.id],
      async (error, results) => {
        db.query(
          "SELECT * FROM ilmoitukset WHERE ilmoitus_id = ?",
          [req.params.id],
          async (error, results) => {
            req.advert = results[0];
            next();
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    next();
  }
};

// Delete Advert
exports.deleteAdvert = async (req, res, next) => {
  try {
    db.query(
      "DELETE FROM ilmoitukset WHERE ilmoitus_id = ?",
      [req.params.id],
      async (error, results) => {
        res.redirect("/profile");
        next();
      }
    );
  } catch (error) {
    console.log(error);
    next();
  }
};

//List Adverts
exports.listAdverts = async (req, res, next) => {
    let { searchAdvert } = req.body;
    if (searchAdvert === "") {
      searchAdvert = undefined;
    }
    try {
      if (searchAdvert != undefined) {
        db.query(
          "SELECT * FROM ilmoitukset WHERE MATCH(ilmoitus_nimi, ilmoitus_kuvaus) AGAINST (? IN BOOLEAN MODE)",
          [searchAdvert + "*"],
          async (error, results) => {
            req.list = results;
            req.searchAdvert = searchAdvert;
            next();
          }
        );
      } else {
        db.query("SELECT * FROM ilmoitukset", async (error, results) => {
          req.list = results;
          next();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // List User Adverts
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