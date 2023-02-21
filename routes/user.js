const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/login', UserController.login);
router.post('/login-user', UserController.login_post);
router.get('/register', UserController.register);
router.post('/save-user', UserController.save_user);
router.get('/logout', UserController.logout);


module.exports = router;