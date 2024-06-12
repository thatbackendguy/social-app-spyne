const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserByName = async (req, res) => {
    const { name } = req.query;
    try {
        const users = await User.find({ name: new RegExp(name, 'i') }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const followUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const userToFollow = await User.findById(req.params.id);
        if (!userToFollow) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.following.includes(userToFollow._id)) {
            return res.status(400).json({ msg: 'Already following this user' });
        }
        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);
        await user.save();
        await userToFollow.save();
        res.json({ msg: 'User followed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getUsers,
    getUserByName,
    followUser
}