const {mustBeAuthenticated} = require('../middleware');
const sanitizer = require('../middleware/sanitizer');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', sanitizer.register, userController.register);

router.post('/login', sanitizer.login, userController.login);

router.get('/me', mustBeAuthenticated, userController.getMyInfo);

router.post('/logout', mustBeAuthenticated, userController.logout);

module.exports = router;
