const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const signup = async (req, res) => {
    const { name, mobile, email, password } = req.body;
    try {
        let user = await User.findOne({ $or: [{ mobile }, { email }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, mobile, email, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    signup,
    login
}