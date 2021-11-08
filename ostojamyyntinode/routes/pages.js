const express = require("express");
const authController = require("../controllers/auth");

var hbs = require('hbs');

hbs.registerHelper('findUser', function(users, kayttaja) {
  let user = "";
  users.forEach(u => {
    if (u.kayttaja_id === kayttaja) {
      user = u.kayttaja_tunnus;      
    }
  })
  return user; 
});



hbs.registerHelper('editAdvert', function(editAdvertBoolean) {
  
    if (editAdvertBoolean === null) {
      console.log("if")
      editAdvertBoolean = "tru";
      
    }  
      return editAdvertBoolean;    
})

var editButtonClick = function(editAdvertBoolean) {
  editAdvertBoolean = true;
}

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

// router.get('/editAdvert', authController.editAdvert, (req, res) => {
//   const advert = req.advert;
//   res.render('editAdvert', {
//     advert
//   });
// })

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
      const editAdvertBoolean = null;
    if (req.list) {
      res.render("profile", {
        list,
        user,
        editAdvertBoolean
      });
      console.log(editAdvertBoolean);
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
