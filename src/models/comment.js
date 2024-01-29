const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({

    content: { type: String, required: true, trim: true, min: 3 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    deleted: { type: Boolean, default: false }



}, {
    timestamps: true
})



const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;   