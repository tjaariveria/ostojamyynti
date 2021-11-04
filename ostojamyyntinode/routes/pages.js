const express = require("express");
const authController = require("../controllers/auth");

var hbs = require('hbs');
hbs.registerHelper('toInt', function(str) {
  return parseInt(str,10);
});



const router = express.Router();

router.get("/", [authController.isLoggedIn, authController.listItems, authController.listUsers], (req, res) => {
    const list = req.list;
      const user = req.user;
      const users = req.users;
  res.render("index", {
    user,
    list,
    users
  });
});

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
  console.log(req.list);
});

router.get(
  "/profile",
  [authController.isLoggedIn, authController.listUserItems],
  (req, res) => {
      const list = req.list;
      const user = req.user
    if (req.list) {
      res.render("profile", {
        list,
        user
      });
    // } else if (req.user) {
    //   console.log("pages user");
    //   res.render("profile", {
    //     user: req.user
    //   });
    // 
    } else {
      res.redirect("/login");
    }
  }
);

module.exports = router;
