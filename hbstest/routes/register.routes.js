import express from 'express';
import register from '../controllers/user.controller.js';

const routes = express.Router();

routes.post('/', register);

export default routes;