const Discussion = require('../models/Discussion');

const createDiscussion = async (req, res) => {
    const { text, hashtags } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const discussion = new Discussion({
            user: req.user.userId,
            text,
            image,
            hashtags: hashtags ? hashtags.split(',') : []
        });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getByHashtag = async (req, res) => {
    const { tags, text } = req.query;
    try {
        let query = {};
        if (tags) {
            query.hashtags = { $in: tags.split(',') };
        }
        if (text) {
            query.text = new RegExp(text, 'i');
        }
        const discussions = await Discussion.find(query).populate('user', 'name');
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const likeDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        if (discussion.likes.includes(req.user.userId)) {
            return res.status(400).json({ msg: 'Already liked this discussion' });
        }
        discussion.likes.push(req.user.userId);
        await discussion.save();
        res.json({ msg: 'Discussion liked successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createDiscussion,
    getByHashtag,
    likeDiscussion
}