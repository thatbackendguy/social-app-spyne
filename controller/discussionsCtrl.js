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

const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .populate('user', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            })
            .populate('likes', 'name');

        if (discussions) {
            discussions.forEach(async (discussion) => {
                discussion.views += 1;
                await discussion.save();
            });
        }

        res.json(discussions);
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
        if (discussions) {
            discussions.forEach(async (discussion) => {
                discussion.views += 1;
                await discussion.save();
            });
        }
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

const updateDiscussion = async (req, res) => {
    const { text, hashtags } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        if (discussion.user.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to update this discussion' });
        }

        discussion.text = text || discussion.text;
        discussion.hashtags = hashtags ? hashtags.split(',') : discussion.hashtags;
        if (image) {
            discussion.image = image;
        }

        await discussion.save();
        res.json({ msg: 'Discussion updated successfully', discussion });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }

        if (discussion.user.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to delete this discussion' });
        }

        await discussion.remove();
        res.json({ msg: 'Discussion deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createDiscussion,
    getDiscussions,
    getByHashtag,
    likeDiscussion,
    updateDiscussion,
    deleteDiscussion
}
