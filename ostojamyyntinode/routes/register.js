const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', userController.register);

module.exports = router;