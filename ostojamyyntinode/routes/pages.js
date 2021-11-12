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
    const searchAdvert = req.searchAdvert;
    res.render("index", {
      user,
      list,
      users,
      searchAdvert
    });
  }
);

router.post(
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
    const searchAdvert = req.searchAdvert;
    res.render("index", {
      user,
      list,
      users,
      searchAdvert
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
    if (req.list) {
      res.render("profile", {
        list: req.list,
        user: req.user
      });
    } else {
      res.redirect("/login");
    }
  }
);

router.get(
  '/admin',
  [authController.isLoggedIn, authController.listUsers],
  (req, res) => {
    if (req.user) {
      res.render('admin', {
        users: req.users,
        user: req.user
      });
    } else {
      res.redirect("/login");
    }
  }
);




router.get('/newAdvert', [authController.isLoggedIn], (req, res) => {
  // const user = req.user;
  res.render('new-advert', {
    user: req.user
  });
});

router.post('/newAdvert', [authController.isLoggedIn, authController.newAdvert], (req, res) => {
  // const user = req.user;
  res.render('new-advert', {
    user: req.user
  });
});


router.get('/deleteAdvert/:id', authController.deleteAdvert);

router.get('/deleteUser/:id', authController.deleteUser);

router.get('/editUser/:id', [authController.isLoggedIn, authController.editUser], (req, res) => {
  res.render('edit-user', {
    user: req.user,
    editUser: req.editUser
  })
});

module.exports = router;
