const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment,likeComment,updateComment,deleteComment,replyToComment } = require('../controller/commentCtrl');


router.put('/:id', auth, updateComment);
router.post('/:discussionId', auth, addComment);
router.post('/:id/like', auth, likeComment);
router.post('/reply/:commentId', auth, replyToComment);
router.delete('/:id', auth, deleteComment);


module.exports = router;
