const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createDiscussion,getByHashtag,likeDiscussion, getDiscussions,updateDiscussion,deleteDiscussion } = require('../controller/discussionsCtrl');
const { upload } = require('../middleware/multer');


router.get('/', auth, getDiscussions);
router.get('/search', auth, getByHashtag);
router.put('/', auth, upload.single('image'),updateDiscussion);
router.post('/like/:id', auth, likeDiscussion);
router.post('/', auth, upload.single('image'), createDiscussion);
router.delete('/:id', auth, deleteDiscussion);


module.exports = router;