const UserModel = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                role: role || 'user'
            });

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            
            const token = jwt.sign(
                { 
                    id: user._id,
                    role: user.role 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 
            });

            res.json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    logout: (req, res) => {
        try {
            // Check if user is authenticated (req.user is set by authMiddleware)
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized: No active session" });
            }
    
            // Clear the authentication cookie
            res.cookie('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(0),
                sameSite: 'strict'
            });
    
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed', error: error.message });
        }
    },
    getUser: (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role } });
    }
    
};

module.exports = authController;