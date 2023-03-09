const express = require('express');
const authRouter = express.Router();
const {register, login, validate} = require('../controllers/authControllers')

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/validate').post(validate);

module.exports = authRouter;