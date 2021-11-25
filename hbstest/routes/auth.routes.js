import express from 'express';
import login from '../controllers/auth.controller.js';

const routes = express.Router();

routes.post('/login', login);

export default routes;