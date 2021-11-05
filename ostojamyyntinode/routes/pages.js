const express = require("express");
const authController = require("../controllers/auth");

var hbs = require('hbs');
hbs.registerHelper('toInt', function(str) {
  return parseInt(str,10);
});

hbs.registerHelper('findUser', function(list, users) {
  let found = list.find(e => e == 2);
  console.log(found);
  return found;
  // let userName = "";
  // let kierroksia = 0;
  // list.forEach(e => {
  //   if(e.kayttaja_id != -1) {
  //     users.forEach(user => {
  //       if(user.kayttaja_id != -1) {
  //         console.log(e.ilmoittaja_id + " : " + user.kayttaja_id);
        
  //       if (e.ilmoittaja_id === user.kayttaja_id) {
  //         console.log("samat");
  //         kierroksia++;
  //         return user;

  //       }
  //       }
        
  //     }); 
  //   }
  //      console.log("Kierroksia " + kierroksia);
  // });  
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
