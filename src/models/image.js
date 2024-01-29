const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const ImageSchema = new Schema({

    title: { type: String, required: true, trim: true, index: true, min: 3, match: /[a-zA-Z0-9]/ },
    description: { type: String, required: true, trim: true, min: 3 },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    category: {
        type: String,
        enum: ['avatar', 'post', 'other'], default: 'other',
        required: true, trim: true, min: 3
    },

    url: {
        type: String, required: true, trim: true, min: 3,
        validate: {
            validator: value => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value),
            message: 'Invalid URL'
        }
    },

    // artist: {
    //     type: Schema.Types.ObjectId, ref: 'User',
    //     validate: {
    //         validator: async function (value) {
    //             return await User.exists({ _id: value });  // return await User.exists({ _id: value, role: 'artist' });  
    //         }, message: 'Invalid User'
    //     }
    // },
    primary: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    slug: { type: String, required: true, trim: true, unique: true, index: true, min: 3, },

    meta: {
        numLikes: { type: Number, default: 0 },
        numDislikes: { type: Number, default: 0 },
        numViews: { type: Number, default: 0 },
        numBookmarks: { type: Number, default: 0 },
        numShares: { type: Number, default: 0 },
        numReports: { type: Number, default: 0 },
    },

}, { timestamps: true });






const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;