// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
const protect = require('../middleware/authentication')

router.post('/register', userController.userCreate);
router.post('/login',userController.userLogin);
router.get('/all', protect, userController.allUser);

module.exports = router;
