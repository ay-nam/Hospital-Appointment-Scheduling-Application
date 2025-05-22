const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateUser = require('../middlewares/authMiddleware');

// Register Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

// Logout Route - Now Protected with authMiddleware
router.post('/logout', authenticateUser, authController.logout);

router.get('/protected-route', authenticateUser, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});


router.get('/me', authenticateUser, authController.getUser);

module.exports = router;
