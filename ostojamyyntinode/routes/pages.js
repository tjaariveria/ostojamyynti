const express = require('express');
const authController = require('../controllers/auth');
const advertController = require('../controllers/advert');
const userController = require('../controllers/user');

const router = express.Router();

router.get(
  "",
  [
    authController.isLoggedIn,
    advertController.listAdverts,
    userController.listUsers,
  ],
  (req, res) => {
    const list = req.list;
    const user = req.user;
    const users = req.users;
    const searchAdvert = req.searchAdvert;
    res.render('index', {
      user,
      list,
      users,
      searchAdvert
    });
  }
);

router.post(
  '',
  [
    authController.isLoggedIn,
    advertController.listAdverts,
    userController.listUsers,
  ],
  (req, res) => {
    const list = req.list;
    const user = req.user;
    const users = req.users;
    const searchAdvert = req.searchAdvert;
    res.render('index', {
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
    advertController.editAdvert
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
    advertController.updateAdvert
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



router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/list", advertController.listAdverts, (req, res) => {
  res.render("list", {
    list: req.list,
  });
});

router.get(
  "/profile",
  [authController.isLoggedIn, advertController.listUserAdverts],
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
  [authController.isLoggedIn, userController.listUsers],
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

router.post('/newAdvert', [authController.isLoggedIn, advertController.newAdvert], (req, res) => {
  // const user = req.user;
  res.render('new-advert', {
    user: req.user
  });
});


router.get('/deleteAdvert/:id', advertController.deleteAdvert);

router.get('/deleteUser/:id', userController.deleteUser);

router.get('/editUser/:id', [authController.isLoggedIn, userController.editUser], (req, res) => {
  res.render('edit-user', {
    user: req.user,
    editUser: req.editUser
  })
});

module.exports = router;
