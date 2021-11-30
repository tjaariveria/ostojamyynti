import express from'express';

import login from'../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);

//router.get('/logout', authController.logout);

export default router;




