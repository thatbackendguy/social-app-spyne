const Comment = require('../models/Comment');
const Discussion = require('../models/Discussion');

const addComment = async (req, res) => {
    const { text } = req.body;
    try {
        const discussion = await Discussion.findById(req.params.discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        const comment = new Comment({
            user: req.user.userId,
            discussion: req.params.discussionId,
            text
        });
        await comment.save();
        discussion.comments.push(comment._id);
        await discussion.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        if (comment.likes.includes(req.user.userId)) {
            return res.status(400).json({ msg: 'Already liked this comment' });
        }
        comment.likes.push(req.user.userId);
        await comment.save();
        res.json({ msg: 'Comment liked successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateComment = async (req, res) => {
    const { text } = req.body;
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to update this comment' });
        }

        comment.text = text || comment.text;
        await comment.save();
        res.json({ msg: 'Comment updated successfully', comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to delete this comment' });
        }

        const discussion = await Discussion.findById(comment.discussion);
        if (discussion) {
            discussion.comments = discussion.comments.filter(
                commentId => commentId.toString() !== comment._id.toString()
            );
            await discussion.save();
        }

        await comment.remove();
        res.json({ msg: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const replyToComment = async (req, res) => {
    const { text } = req.body;
    try {
        const parentComment = await Comment.findById(req.params.commentId);
        if (!parentComment) {
            return res.status(404).json({ msg: 'Parent comment not found' });
        }

        const reply = new Comment({
            user: req.user.userId,
            discussion: parentComment.discussion,
            text,
        });
        await reply.save();

        parentComment.replies.push(reply._id);

        await parentComment.save();

        res.status(201).json(reply);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    addComment,
    likeComment,
    updateComment,
    deleteComment,
    replyToComment
}
