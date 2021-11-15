const express = require('express');
const authController = require('../controllers/auth');
const advertController = require('../controllers/advert');
const userController = require('../controllers/user');





const router = express.Router();


// Get index page with list of all Adverts in database
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

// Index page with list of found Adverts if any
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

// Get Advert information for edit
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

// Update Advert information
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


// Get to Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Get to Profile page
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

// Get to Admin page
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



// Get to new Advert page
router.get('/newAdvert', [authController.isLoggedIn], (req, res) => {
  res.render('new-advert', {
    user: req.user
  });
});

// Creates new Advert
router.post('/newAdvert', [authController.isLoggedIn, advertController.newAdvert], (req, res) => {
  res.render('new-advert', {
    user: req.user
  });
});

// Delete Advert from database
router.get('/deleteAdvert/:id', advertController.deleteAdvert);

// Delete User from database. This also deletes all Adverts related to this user
router.get('/deleteUser/:id', userController.deleteUser);

// Get information to edit User
router.get('/editUser/:id', [authController.isLoggedIn, userController.editUser], (req, res) => {
  res.render('edit-user', {
    user: req.user,
    editUser: req.editUser
  })
});

// Updates User information
router.post('/editUser/:id', [authController.isLoggedIn, userController.updateUser], (req, res) => {
  res.render('edit-user', {
    user: req.user,
    editUser: req.editUser
  })
});



module.exports = router; 
