import express from'express';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/login', (req, res) => {
    res.render('login');
});

export default  routes;
