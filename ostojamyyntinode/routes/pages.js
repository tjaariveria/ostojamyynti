const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get(
  "",
  [
    authController.isLoggedIn,
    authController.listItems,
    authController.listUsers,
  ],
  (req, res) => {
    const list = req.list;
    const user = req.user;
    const users = req.users;
    res.render("index", {
      user,
      list,
      users,
    });
  }
);

router.get(
  "/editAdvert/:id",
  [
    authController.isLoggedIn,
    authController.editAdvert    
  ],
  (req, res) => {
    const user = req.user;
    const advert = req.advert
    if (advert) {
      res.render('edit-advert', {
        user,
        advert        
      });
    } else {
      res.redirect('/login');
    }
  }
);

router.post(
  "/editAdvert/:id",
  [
    authController.isLoggedIn,
    authController.updateAdvert    
  ],
  (req, res) => {
    const user = req.user;
    const advert = req.advert
    if (advert) {
      res.render('edit-advert', {
        user,
        advert        
      });
    } else {
      res.redirect('/login');
    }
  }
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/list", authController.listItems, (req, res) => {
  res.render("list", {
    list: req.list,
  });
});

router.get(
  "/profile",
  [authController.isLoggedIn, authController.listUserItems],
  (req, res) => {
    const list = req.list;
    const user = req.user;
    if (req.list) {
      res.render("profile", {
        list,
        user
      });
    } else {
      res.redirect("/login");
    }
  }
);

module.exports = router;
