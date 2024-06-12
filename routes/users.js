const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers,getUserByName,followUser } = require('../controller/usersCtrl');

router.get('/', auth, getUsers);
router.get('/search', auth, getUserByName);
router.post('/follow/:id', auth, followUser);

module.exports = router;