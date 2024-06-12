const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment,likeComment } = require('../controller/commentCtrl');


router.post('/:discussionId', auth, addComment);
router.post('/:id/like', auth, likeComment);


module.exports = router;