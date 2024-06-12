const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createDiscussion,getByHashtag,likeDiscussion } = require('../controller/discussionsCtrl');
const { upload } = require('../middleware/multer');


router.post('/', auth, upload.single('image'), createDiscussion);
router.get('/search', auth, getByHashtag);
router.post('/:id/like', auth, likeDiscussion);


module.exports = router;