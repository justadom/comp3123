const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../middleware/validators');

router.post('/signup', signupValidation, userController.signup); // 201
router.post('/login', loginValidation, userController.login); // 200

module.exports = router;