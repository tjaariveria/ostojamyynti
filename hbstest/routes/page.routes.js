import express from 'express';
import { isLoggedIn } from '../controllers/auth.controller.js';
<<<<<<< HEAD
import listAdverts, {
    listUserAdverts,
    newAdvert,
    getAdvert,
    updateAdvert,
    deleteAdvert
} from '../controllers/advert.controller.js';
=======
import listAdverts, { listUserAdverts } from '../controllers/advert.controller.js';
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
import { listUsers } from '../controllers/user.controller.js';

const routes = express.Router();

routes.get('/', [isLoggedIn, listAdverts, listUsers], (req, res) => {
    res.render('index', {
        user: req.user,
        users: req.users,
<<<<<<< HEAD
        list: req.list,
        searchAdvert: req.searchAdvert
    });
});

routes.post('/', [isLoggedIn, listAdverts, listUsers], (req, res) => {
    res.render('index', {
        user: req.user,
        users: req.users,
        list: req.list,
        searchAdvert: req.searchAdvert
=======
        list: req.list
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
    });
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get(
<<<<<<< HEAD
    '/profile',
    [isLoggedIn, listUserAdverts],
    (req, res) => {
        if (req.list) {
            res.render('profile', {
=======
    "/profile",
    [ isLoggedIn, listUserAdverts ],
    (req, res) => {
        if (req.list) {
            res.render("profile", {
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
                list: req.list,
                user: req.user
            });
        } else {
<<<<<<< HEAD
            res.redirect('/login');
=======
            res.redirect("/login");
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
        }
    }
);

<<<<<<< HEAD
routes.get('/newAdvert', isLoggedIn, (req, res) => {
    res.render('new-advert', {
        user: req.user
    });
});

routes.post('/newAdvert', [isLoggedIn, newAdvert], (req, res) => {
    res.render('new-advert', {
        user: req.user
    });
});

routes.get('/editAdvert/:id', [isLoggedIn, getAdvert], (req, res) => {
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
});

routes.post('/editAdvert/:id', [isLoggedIn, updateAdvert], (req, res) => {
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
});

routes.get('/deleteAdvert/:id', deleteAdvert);

=======
>>>>>>> ab3ca40823a3aeb0e307beeac213304a9c49560d
export default routes;