const express = require('express');
const router = express.Router();
const {
  signUpUser,
  loginUser,
  getAllUsers,
  authenticateToken,
  getCurrentUser,
  deleteUserById,
  updateUserById,
  getUserById
} = require('../controllers/userController');

// Register user
router.post('/signup', signUpUser);

// Login user
router.post('/login', loginUser);

// Get all users
router.get('/allUsers', authenticateToken, getAllUsers); // Added authentication middleware

// Get current user
router.get('/me', authenticateToken, getCurrentUser);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user by ID
router.put('/:id', authenticateToken, updateUserById);

// Delete user by ID
router.delete('/:id', authenticateToken, deleteUserById);

module.exports = router;
