const express = require('express');
const router = express.Router();
const { signUpUser, loginUser, getAllUsers } = require('../controllers/userController');

// Register user
router.post('/signup', signUpUser);

// Login user
router.post('/login', loginUser);

// Get all users
router.get('/allUsers', getAllUsers);

module.exports = router;
