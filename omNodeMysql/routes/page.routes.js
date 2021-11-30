import express from'express';
import { isLoggedIn } from'../controllers/auth.controller';

const routes = express.Router();

routes.get('', isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/login', (req, res) => {
    res.render('login');
});

export default  routes;
