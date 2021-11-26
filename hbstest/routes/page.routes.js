import express from 'express';
import { isLoggedIn } from '../controllers/auth.controller.js';
import listAdverts, { listUserAdverts } from '../controllers/advert.controller.js';
import { listUsers } from '../controllers/user.controller.js';

const routes = express.Router();

routes.get('/', [isLoggedIn, listAdverts, listUsers], (req, res) => {
    res.render('index', {
        user: req.user,
        users: req.users,
        list: req.list
    });
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get(
    "/profile",
    [ isLoggedIn, listUserAdverts ],
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

export default routes;