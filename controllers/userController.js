const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find the user by either username or email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select('-password');
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
