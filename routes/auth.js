const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware for authentication
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};

// Register User
router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, role });

    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Export routes and auth middleware
module.exports = {
    auth,
    routes: router
};
