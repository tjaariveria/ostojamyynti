const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  res.render("index", {
    user: req.user,
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
  [authController.isLoggedIn, authController.listItems],
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
