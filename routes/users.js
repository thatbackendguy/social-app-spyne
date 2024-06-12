const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers,getUserByName,followUser, updateUser, deleteUser} = require('../controller/usersCtrl');

router.get('/', auth, getUsers);
router.get('/search', auth, getUserByName);
router.put('/:id', auth, updateUser);
router.post('/follow/:id', auth, followUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;