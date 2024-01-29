// import { commentsValidator } from "../validators/comment.validate";
// import Post from "../models/post";
// import Comment from "../models/comment";

const { commentsValidator } = require('../validators/comment.validate');
const Post = require("../models/post");
const Comment = require("../models/comment");


class CommentController {
    // const CommentSchema = new Schema({

    //     content: { type: String, required: true, trim: true, min: 3 },
    //     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //     post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    //     parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    //     replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],



    // }, {
    //     timestamps: true
    // })

    async getAll(req, res) {
        try {
            const comments = await Comment.find({ postId: req.params.postId });
            return res.json(comments);
        }
        catch (error) {
            return (res.json(error))
        }
    }

    async getById(req, res) {
        try {
            let commentId = req.params.id;
            const comment = await Comment.findById(commentId);
            return res.json(comment);
        }
        catch (error) {
            return (res.json(error))
        }
    }


    async create(req, res) {
        try {
            const commentData = req.body;
            const postId = req.params.postId;
            const post = await Post.findById(postId);
            if (!post)
                return res.status(404).json({ msg: "Post not found" });

            const errors = commentsValidator({ commentData, method: 'create' });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const comment = await Comment.create(commentData);

            if (!post.comments.includes(comment._id)) {
                post.comments.push(comment._id);
                await post.save();
            }

            return res.status(201).json({ comment, all: post.comments });
        }
        catch (error) {
            return (res.json(error))
        }

    }


    async update(req, res) {
        try {
            const { id } = req.params;
            const commentId = id;

            const updatedCommentData = req.body;

            const post = await Post.findOne({ "comments": commentId });
            if (!post) {
                return res.status(404).json({ error: 'Comment not found or associated post not found' });
            }

            const errors = commentsValidator({ commentData: updatedCommentData, method: 'update' });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const existingComment = await Comment.findById(commentId);
            if (!existingComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            // Check if the user making the request is the author of the comment
            if (existingComment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized: You are not the author of this comment' });
            }

            // Update comment content
            existingComment.content = updatedCommentData.content;
            const updatedComment = await existingComment.save();
            return res.json(updatedComment);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


    async delete(req, res) {
        try {
            const { commentId } = req.params;

            const post = await Post.findOne({ "comments": commentId });
            if (!post) {
                return res.status(404).json({ error: 'Comment not found or associated post not found' });
            }

            const existingComment = await Comment.findById(commentId);
            if (!existingComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            // Check if the user making the request is the author of the comment
            if (existingComment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized: You are not the author of this comment' });
            }

            // Remove the comment from the post's comments array
            post.comments = post.comments.filter(comment => comment.toString() !== commentId);
            await post.save();

            // Remove the comment itself
            await existingComment.remove();

            return res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = CommentController;