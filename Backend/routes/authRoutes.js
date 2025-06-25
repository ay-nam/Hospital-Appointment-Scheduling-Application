const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateUser = require('../middlewares/authMiddleware');
const UserModel = require('../models/UserSchema');

// ----------------------------
// Auth Routes
// ----------------------------

// Register User (and create corresponding Patient)
router.post('/signup', authController.signup);

// Login User
router.post('/login', authController.login);

// Logout User (protected route)
router.post('/logout', authenticateUser, authController.logout);

// Get Authenticated User Info
router.get('/me', authenticateUser, authController.getUser);

// Test Protected Route
router.get('/protected-route', authenticateUser, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});

// Get Patient ID using logged-in user's email (used in appointments)
router.get('/user-id', authenticateUser, async (req, res) => {
    try {
      return res.json({ id: req.user._id }); // ✅ req.user is a full Mongoose doc
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

// Get User by ID (e.g., /api/auth/684ed7564db0a41335d4e815)
router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/me', authenticateUser, (req, res) => {
    res.json({
      message: 'Authenticated user',
      user: req.user
    });
  });

module.exports = router;
