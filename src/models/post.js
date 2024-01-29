// import mongoose, { Schema } from 'mongoose';
// import Category from './category';
// import Tag from './tag';
// import Image from './image';
// import Comment from './comment';
// import User from './user';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');
const Tag = require('./tag');
const Image = require('./image');
const Comment = require('./comment');
const User = require('./user');


const PostSchema = new Schema({

    title: { type: String, required: true, trim: true, index: true, min: 3, match: /[a-zA-Z0-9]/ },
    content: { type: String, required: true, trim: true, min: 3 },

    // author: {
    //     type: Schema.Types.ObjectId, ref: 'User', required: true,
    //     validate: {
    //         validator: async function (value) {
    //             return await User.exists({ _id: value });  // return await User.exists({ _id: value, role: 'artist' });  
    //         }, message: 'Invalid User'
    //     }
    // },

    images: [
        {
            type: Schema.Types.ObjectId, ref: 'Image', validate: {
                validator: async function (value) {
                    return await Image.findById(value) != null;
                }, message: 'Invalid Image'
            }
        }
    ],

    comments: [
        {
            type: Schema.Types.ObjectId, ref: 'Comment',
            validate: {
                validator: async function (value) {
                    return await Comment.findById(value) != null;
                }, message: 'Invalid Comment'
            }
        }
    ],



    slug: { type: String, required: true, trim: true, unique: true, index: true, min: 3, },

    category: {
        type: Schema.Types.ObjectId, ref: 'Category', required: true,
        validate: {
            validator: async function (value) {
                return await Category.findById(value) != null;
            }, message: 'Invalid Category'
        }
    },

    tags: [{
        type: Schema.Types.ObjectId, ref: 'Tag',
        validate: {
            validator: async function (value) {
                return await Tag.findById(value) != null;
            }, message: 'Invalid Tag'
        }
    }],



    meta: {
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        shares: {
            by: { type: Schema.Types.ObjectId, ref: 'User' },
            to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
        reports: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },

    dates: {
        initiated: { type: Date, default: Date.now },
        published: { type: Date },
        updated: { type: Date },
    },






}, { timestamps: true });


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;








